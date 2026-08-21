import * as zarr from 'zarrita';
import { colormapBuilder, type ColorMapName } from 'zarr-maps-colormap';
import { DEFAULT_COLORMAP } from './constants';
import {
  calculateNearestIndex,
  calculateSliceArgsRequestImage,
  detectCRS,
  extractNoDataMetadata,
  getXYLimits,
  initZarrDataset,
  loadDimensionValues,
  openLevelArray,
  resolveNoDataRange
} from './zarr-utils';

function createTransformedFetch(
  transformRequest: NonNullable<ZarrTileOptions['transformRequest']>,
  onAuthError?: ZarrTileOptions['onAuthError']
): typeof fetch {
  let authErrorReported = false;
  return async (input, init) => {
    const originalUrl = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const transformed = await transformRequest(originalUrl, {
      method: (init?.method as 'GET' | 'HEAD' | undefined) ?? 'GET'
    });
    const headers = new Headers(input instanceof Request ? input.headers : undefined);
    new Headers(init?.headers).forEach((value, key) => headers.set(key, value));
    new Headers(transformed.headers).forEach((value, key) => headers.set(key, value));
    const response = await fetch(transformed.url, { ...init, ...transformed, headers });
    if (!authErrorReported && onAuthError && (response.status === 400 || response.status === 401)) {
      authErrorReported = true;
      onAuthError(response.status);
    }
    return response;
  };
}
import { createColorRampTexture, createProgram, createShader } from './webgl-utils';
import { vertexShaderSource, fragmentShaderSource } from './shaders';
import { latDegToMercY, lonDegToMercX } from './mercator-utils';
import {
  getFullTransect as queryFullTransect,
  getTimeSeries as queryTimeSeries,
  getTransect as queryTransect,
  getVerticalProfile as queryVerticalProfile
} from './query-api';
import type {
  CRS,
  DimensionNamesProps,
  DimIndicesProps,
  XYLimits,
  ZarrLevelMetadata,
  DimensionValues,
  BoundsProps,
  ZarrSelectors,
  QueryGeometry,
  QueryOptions,
  QueryResult,
  QueryPosition,
  TransectQueryOptions,
  TransectResult,
  FullTransectResult,
  MultiscaleFormat,
  ZarrTileOptions
} from './types';

/**
 * Provides Zarr dataset access and rendering capabilities for web-map layers.
 */
export class ZarrTileProvider {
  /** Coordinate values keyed by canonical dimension name. Available after {@link readyPromise} resolves. */
  public dimensionValues: DimensionValues = {};
  /** Selectors currently used to slice non-spatial dimensions. */
  public selectors: ZarrSelectors = {};
  /** Detected or configured coordinate reference system. */
  public crs: CRS | null = null;

  /**
   * Queries every time coordinate at a WGS84 position.
   *
   * @param position - `[longitude, latitude]` in degrees.
   * @param selectors - Optional selectors for dimensions other than time.
   * @param options - Query level, coordinate, and cancellation options.
   * @returns Values and their time coordinates.
   */
  getTimeSeries(position: QueryPosition, selectors?: ZarrSelectors, options?: QueryOptions) {
    return queryTimeSeries(this, position, selectors, options);
  }

  /**
   * Queries every vertical coordinate at a WGS84 position.
   *
   * @param position - `[longitude, latitude]` in degrees.
   * @param selectors - Optional selectors for dimensions other than elevation.
   * @param options - Query level, coordinate, and cancellation options.
   * @returns Values and their vertical coordinates.
   */
  getVerticalProfile(position: QueryPosition, selectors?: ZarrSelectors, options?: QueryOptions) {
    return queryVerticalProfile(this, position, selectors, options);
  }

  /**
   * Samples one selected level along a line between two WGS84 positions.
   *
   * @param start - Start `[longitude, latitude]` in degrees.
   * @param end - End `[longitude, latitude]` in degrees.
   * @param selectors - Selectors used for non-spatial dimensions.
   * @param options - Sampling, concurrency, and cancellation options.
   */
  getTransect(
    start: QueryPosition,
    end: QueryPosition,
    selectors?: ZarrSelectors,
    options?: TransectQueryOptions
  ): Promise<TransectResult> {
    return queryTransect(this, start, end, selectors, options);
  }

  /**
   * Samples every vertical level along a line between two WGS84 positions.
   *
   * @param start - Start `[longitude, latitude]` in degrees.
   * @param end - End `[longitude, latitude]` in degrees.
   * @param selectors - Selectors used for dimensions other than elevation.
   * @param options - Sampling, concurrency, and cancellation options.
   */
  getFullTransect(
    start: QueryPosition,
    end: QueryPosition,
    selectors?: ZarrSelectors,
    options?: TransectQueryOptions
  ): Promise<FullTransectResult> {
    return queryFullTransect(this, start, end, selectors, options);
  }

  private url: string;
  private variable: string;
  private zarrVersion: 2 | 3 | null;
  private dimensionNames: DimensionNamesProps;
  private multiscaleFormat: MultiscaleFormat;
  private requestOverrides?: ZarrTileOptions['requestOverrides'];
  private transformRequest?: ZarrTileOptions['transformRequest'];
  private onAuthError?: ZarrTileOptions['onAuthError'];
  private customStore?: zarr.Readable;
  private latIsAscendingOverride?: boolean;
  private latAscending = false;
  private renderTarget: 'web-map' | 'cesium';

  private noDataMin: number | undefined;
  private noDataMax: number | undefined;
  private fillValue: number | undefined;
  private useFillValue = false;

  private scaleFactor = 1;
  private offset = 0;

  private tileSize: number;
  public coverageBoundsMerc: { xMin: number; yMin: number; xMax: number; yMax: number } | null =
    null;

  private colorScale: { min: number; max: number; colors: number[][] };
  private colormap: ColorMapName;

  private store!: zarr.Readable;
  private root!: zarr.Location<zarr.Readable>;
  private zarrArray: zarr.Array<any> | null = null;

  private dimIndices: DimIndicesProps = {};
  private levelInfos: string[] = [];
  private levelCache = new Map();
  private levelMetadata: Map<number, ZarrLevelMetadata> = new Map();
  private xyLimits: XYLimits | null = null;
  private geographicLonOffset360: { west: number; span: number } | null = null;

  public coverageBoundsDeg: { west: number; south: number; east: number; north: number } | null =
    null;

  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private colorTexture: WebGLTexture | null = null;
  private uniforms: { [key: string]: WebGLUniformLocation | null } = {};
  private attribs: { a_position: number; a_texCoord: number } | null = null;
  private selectorHash: string = '';
  private vao: WebGLVertexArrayObject | null = null;
  private quadVbo: WebGLBuffer | null = null;
  private dataTexture: WebGLTexture | null = null;

  private _ready = false;
  private _readyPromise!: Promise<boolean>;

  private abortControllers = new Map<string, AbortController>();
  private destroyed = false;

  private static readonly concurrencyLimit = 15;
  private static activeRequests = 0;
  private static readonly queue: (() => void)[] = [];

  /**
   * Creates the framework-independent Zarr tile renderer.
   *
   * @param options - Dataset, rendering, request, and selector configuration.
   * @throws If neither `options.url` nor `options.store` is provided.
   * @remarks Initialization starts immediately. Await {@link readyPromise} before rendering or querying.
   */
  constructor(options: ZarrTileOptions) {
    if (!options.url && !options.store) {
      throw new Error('ZarrTileProvider requires either url or store');
    }
    this.url = options.url ?? 'custom-store';
    this.variable = options.variable;
    this.zarrVersion = options.zarrVersion ?? null;
    this.dimensionNames = options.dimensionNames ?? {};
    this.multiscaleFormat = options.multiscaleFormat ?? 'auto';
    this.requestOverrides = options.requestOverrides;
    this.transformRequest = options.transformRequest;
    this.onAuthError = options.onAuthError;
    this.customStore = options.store;
    this.latIsAscendingOverride = options.latIsAscending;
    this.renderTarget = options.renderTarget ?? 'web-map';

    this.crs = options.crs || null;
    this.tileSize = options.tileSize ?? 256;

    this.selectors = options.selectors || {};
    this.noDataMin = options.noDataMin;
    this.noDataMax = options.noDataMax;

    const [min, max] = options.scale ?? [-3, 3];
    this.colormap = options.colormap ?? DEFAULT_COLORMAP;
    const colors = colormapBuilder(this.colormap) as number[][];
    this.colorScale = { min, max, colors };

    this.initWebGL();
    this._readyPromise = this.initialize().then(ok => ((this._ready = ok), ok));
  }

  /** Aborts outstanding tile requests and prevents further rendering work. */
  destroy(): void {
    this.destroyed = true;
    for (const c of this.abortControllers.values()) c.abort();
    this.abortControllers.clear();
  }

  /**
   * Updates the data scale or colormap without reopening the dataset.
   *
   * @param opts - Partial style update.
   * @returns `true` when the effective style changed and consumers should redraw.
   */
  updateStyle(opts: { scale?: [number, number]; colormap?: ColorMapName }): boolean {
    const { scale, colormap } = opts;
    if (!scale && !colormap) return false;

    const nextMin = scale?.[0] ?? this.colorScale.min;
    const nextMax = scale?.[1] ?? this.colorScale.max;
    const nextCmap = colormap ?? this.colormap;

    if (
      nextMin === this.colorScale.min &&
      nextMax === this.colorScale.max &&
      nextCmap === this.colormap
    )
      return false;

    if (scale) {
      this.colorScale.min = scale[0];
      this.colorScale.max = scale[1];
    }
    if (colormap) {
      this.colormap = colormap;
      this.colorScale.colors = colormapBuilder(colormap) as number[][];
      this.updateColormapTexture();
    }
    return true;
  }

  /**
   * Merges new dimension selectors into the current selection.
   *
   * @param selectors - Selectors expressed as indices, values, or ranges.
   * @returns `true` when the effective selection changed and consumers should redraw.
   */
  updateSelectors(selectors: ZarrSelectors): boolean {
    let changed = false;
    for (const k of Object.keys(selectors ?? {})) {
      if (
        !this.selectors[k] ||
        JSON.stringify(this.selectors[k]) !== JSON.stringify(selectors[k])
      ) {
        this.selectors[k] = selectors[k];
        changed = true;
      }
    }

    if (changed) {
      this.selectorHash = this.computeSelectorHash(this.selectors);
    }
    return changed;
  }

  /**
   * Queries the nearest raster cell for a WGS84 GeoJSON point.
   *
   * @param geometry - Query geometry. Point queries are currently supported.
   * @param selectors - Optional per-query selectors merged over the provider selectors.
   * @param options - Resolution, coordinate output, and cancellation options.
   * @returns Sampled values, dimension names, and coordinate arrays.
   * @throws If the geometry is unsupported, a selector is invalid, or initialization failed.
   * @remarks One ranged non-spatial selector produces a profile or time series.
   */
  async queryData(
    geometry: QueryGeometry,
    selectors?: ZarrSelectors,
    options: QueryOptions = {}
  ): Promise<QueryResult> {
    if (geometry.type !== 'Point') {
      throw new Error(
        `Query geometry ${geometry.type} is not implemented; only Point is supported`
      );
    }
    if (!this.ready) {
      const initialized = await this.readyPromise;
      if (!initialized || !this.ready) throw new Error('ZarrTileProvider is not available');
    }
    this.throwIfQueryAborted(options.signal);
    if (!this.coverageBoundsDeg) throw new Error('Zarr coverage bounds are unavailable');

    const [longitude, latitude] = geometry.coordinates;
    const emptyResult = (): QueryResult => ({
      variable: this.variable,
      values: [],
      dimensions: [],
      coordinates: {}
    });
    const bounds = this.coverageBoundsDeg;
    if (
      !Number.isFinite(longitude) ||
      !Number.isFinite(latitude) ||
      latitude < bounds.south ||
      latitude > bounds.north
    ) {
      return emptyResult();
    }

    const { dataWidth, dataHeight, currentArray } =
      options.level === 'finest' || options.level === undefined
        ? await this.getFinestArray()
        : await this.getArrayForZoom(Math.max(0, Math.floor(options.level)));
    this.throwIfQueryAborted(options.signal);

    let xFraction: number;
    if (this.crs === 'EPSG:4326' && this.geographicLonOffset360) {
      const normalize = (value: number) => ((value % 360) + 360) % 360;
      const { west, span } = this.geographicLonOffset360;
      let normalizedLongitude = normalize(longitude);
      if (normalizedLongitude < west) normalizedLongitude += 360;
      xFraction = (normalizedLongitude - west) / span;
    } else {
      if (longitude < bounds.west || longitude > bounds.east) return emptyResult();
      xFraction = (longitude - bounds.west) / (bounds.east - bounds.west);
    }

    const sourceLatitude = this.crs === 'EPSG:3857' ? latDegToMercY(latitude) : latitude;
    const sourceSouth = this.crs === 'EPSG:3857' ? this.coverageBoundsMerc!.yMin : bounds.south;
    const sourceNorth = this.crs === 'EPSG:3857' ? this.coverageBoundsMerc!.yMax : bounds.north;
    const yFraction = this.latAscending
      ? (sourceLatitude - sourceSouth) / (sourceNorth - sourceSouth)
      : (sourceNorth - sourceLatitude) / (sourceNorth - sourceSouth);
    const x = Math.max(0, Math.min(dataWidth - 1, Math.floor(xFraction * dataWidth)));
    const y = Math.max(0, Math.min(dataHeight - 1, Math.floor(yFraction * dataHeight)));

    const resolvedSelectors = { ...this.selectors };
    for (const [requestedDimension, selector] of Object.entries(selectors ?? {})) {
      const dimension = this.dimIndices[requestedDimension]
        ? requestedDimension
        : Object.keys(this.dimIndices).find(
            key => this.dimIndices[key].name === requestedDimension
          );
      if (!dimension || dimension === 'lon' || dimension === 'lat') {
        throw new Error(`Unknown or spatial selector dimension: ${requestedDimension}`);
      }
      const dimensionCoordinates = this.dimensionValues[dimension];
      if (selector.type === 'value' && !dimensionCoordinates) {
        throw new Error(`Coordinate values are unavailable for selector ${requestedDimension}`);
      }
      const selected = Array.isArray(selector.selected)
        ? selector.type === 'value'
          ? ([
              Math.min(
                calculateNearestIndex(dimensionCoordinates, selector.selected[0]),
                calculateNearestIndex(dimensionCoordinates, selector.selected[1])
              ),
              Math.max(
                calculateNearestIndex(dimensionCoordinates, selector.selected[0]),
                calculateNearestIndex(dimensionCoordinates, selector.selected[1])
              ) + 1
            ] as [number, number])
          : (selector.selected.map(Number) as [number, number])
        : selector.type === 'value'
          ? calculateNearestIndex(dimensionCoordinates, selector.selected)
          : Number(selector.selected);
      resolvedSelectors[dimension] = { selected, type: 'index' };
    }

    let profile: { dimension: string; start: number; end: number } | undefined;
    for (const [dimension, selector] of Object.entries(resolvedSelectors)) {
      if (dimension === 'lon' || dimension === 'lat') continue;
      const size = currentArray.shape[this.dimIndices[dimension]?.index];
      if (Array.isArray(selector.selected)) {
        const [start, end] = selector.selected.map(Number);
        if (profile) throw new Error('Point profiles support only one ranged selector');
        if (
          !Number.isInteger(start) ||
          !Number.isInteger(end) ||
          start < 0 ||
          end <= start ||
          (size !== undefined && end > size)
        ) {
          throw new RangeError(`Selector ${dimension} is outside the array bounds`);
        }
        profile = { dimension, start, end };
        continue;
      }
      const selected = Number(selector.selected);
      if (!Number.isInteger(selected) || selected < 0 || (size !== undefined && selected >= size)) {
        throw new RangeError(`Selector ${dimension} is outside the array bounds`);
      }
    }

    const scalarSelectors = { ...resolvedSelectors };
    if (profile) {
      scalarSelectors[profile.dimension] = { selected: profile.start, type: 'index' };
    }
    const sliceArgs = calculateSliceArgsRequestImage(
      currentArray.shape,
      { startX: x, endX: x + 1, startY: y, endY: y + 1 },
      this.dimIndices,
      scalarSelectors
    );
    if (profile) {
      sliceArgs[this.dimIndices[profile.dimension].index] = zarr.slice(profile.start, profile.end);
    }
    const data = await zarr.get(
      currentArray,
      sliceArgs,
      options.signal ? { opts: { signal: options.signal } } : undefined
    );
    this.throwIfQueryAborted(options.signal);

    const rawValues = data.data as unknown as ArrayLike<number>;
    const values: number[] = [];
    const validProfileIndices: number[] = [];
    for (let index = 0; index < rawValues.length; index++) {
      const rawValue = Number(rawValues[index]);
      const transformedValue = rawValue * this.scaleFactor + this.offset;
      const isNoData =
        !Number.isFinite(transformedValue) ||
        (this.useFillValue && rawValue === this.fillValue) ||
        (this.noDataMin !== undefined && transformedValue < this.noDataMin) ||
        (this.noDataMax !== undefined && transformedValue > this.noDataMax);
      if (!isNoData) {
        values.push(transformedValue);
        validProfileIndices.push(index);
      }
    }

    const lonName = this.dimIndices.lon?.name ?? 'lon';
    const latName = this.dimIndices.lat?.name ?? 'lat';
    const coordinates: QueryResult['coordinates'] = {};
    if (options.includeSpatialCoordinates !== false && values.length > 0) {
      coordinates[lonName] = [longitude];
      coordinates[latName] = [latitude];
    }
    for (const [dimension, selector] of Object.entries(resolvedSelectors)) {
      if (dimension === 'lon' || dimension === 'lat') continue;
      const dimensionName = this.dimIndices[dimension]?.name ?? dimension;
      if (Array.isArray(selector.selected)) {
        const dimensionCoordinates = this.dimensionValues[dimension];
        const profileStart = selector.selected[0];
        if (dimensionCoordinates) {
          coordinates[dimensionName] = validProfileIndices.map(
            index => dimensionCoordinates[profileStart + index]
          );
        }
      } else {
        const coordinate = this.dimensionValues[dimension]?.[Number(selector.selected)];
        if (coordinate !== undefined) coordinates[dimensionName] = [coordinate];
      }
    }

    return {
      variable: this.variable,
      values,
      dimensions: values.length === 0 ? [] : Object.keys(coordinates),
      coordinates
    };
  }

  /**
   * Queries several WGS84 points using the same selectors and array level.
   *
   * @param positions - Positions as `[longitude, latitude]` pairs.
   * @param selectors - Selectors shared by every point.
   * @param options - Resolution, concurrency, coordinate, and cancellation options.
   * @returns One query result per input position, preserving input order.
   * @remarks Source chunks are deduplicated so transects do not fetch and decode a chunk per sample.
   */
  async queryPoints(
    positions: QueryPosition[],
    selectors: ZarrSelectors = {},
    options: TransectQueryOptions = {}
  ): Promise<QueryResult[]> {
    if (!this.ready) {
      const initialized = await this.readyPromise;
      if (!initialized || !this.ready) throw new Error('ZarrTileProvider is not available');
    }
    this.throwIfQueryAborted(options.signal);
    if (!this.coverageBoundsDeg) throw new Error('Zarr coverage bounds are unavailable');

    const { dataWidth, dataHeight, currentArray } =
      options.level === 'finest' || options.level === undefined
        ? await this.getFinestArray()
        : await this.getArrayForZoom(Math.max(0, Math.floor(options.level)));
    const resolvedSelectors = { ...this.selectors };
    for (const [requestedDimension, selector] of Object.entries(selectors)) {
      const dimension = this.dimIndices[requestedDimension]
        ? requestedDimension
        : Object.keys(this.dimIndices).find(
            key => this.dimIndices[key].name === requestedDimension
          );
      if (!dimension || dimension === 'lon' || dimension === 'lat') {
        throw new Error(`Unknown or spatial selector dimension: ${requestedDimension}`);
      }
      const dimensionCoordinates = this.dimensionValues[dimension];
      const selected = Array.isArray(selector.selected)
        ? selector.type === 'value'
          ? ([
              Math.min(
                calculateNearestIndex(dimensionCoordinates, selector.selected[0]),
                calculateNearestIndex(dimensionCoordinates, selector.selected[1])
              ),
              Math.max(
                calculateNearestIndex(dimensionCoordinates, selector.selected[0]),
                calculateNearestIndex(dimensionCoordinates, selector.selected[1])
              ) + 1
            ] as [number, number])
          : (selector.selected.map(Number) as [number, number])
        : selector.type === 'value'
          ? calculateNearestIndex(dimensionCoordinates, selector.selected)
          : Number(selector.selected);
      resolvedSelectors[dimension] = { selected, type: 'index' };
    }

    let profile: { dimension: string; start: number; end: number } | undefined;
    for (const [dimension, selector] of Object.entries(resolvedSelectors)) {
      if (dimension === 'lon' || dimension === 'lat') continue;
      const size = currentArray.shape[this.dimIndices[dimension]?.index];
      if (Array.isArray(selector.selected)) {
        const [start, end] = selector.selected.map(Number);
        if (profile) throw new Error('Point profiles support only one ranged selector');
        if (
          !Number.isInteger(start) ||
          !Number.isInteger(end) ||
          start < 0 ||
          end <= start ||
          end > size
        ) {
          throw new RangeError(`Selector ${dimension} is outside the array bounds`);
        }
        profile = { dimension, start, end };
      } else {
        const selected = Number(selector.selected);
        if (!Number.isInteger(selected) || selected < 0 || selected >= size) {
          throw new RangeError(`Selector ${dimension} is outside the array bounds`);
        }
      }
    }

    type Sample = { point: number; profileIndex: number; local: number[] };
    type ChunkGroup = { coords: number[]; samples: Sample[] };
    const groups = new Map<string, ChunkGroup>();
    const validPositions = new Array<boolean>(positions.length).fill(false);
    const bounds = this.coverageBoundsDeg;
    for (let point = 0; point < positions.length; point++) {
      const [longitude, latitude] = positions[point];
      if (
        !Number.isFinite(longitude) ||
        !Number.isFinite(latitude) ||
        latitude < bounds.south ||
        latitude > bounds.north
      )
        continue;
      let xFraction: number;
      if (this.crs === 'EPSG:4326' && this.geographicLonOffset360) {
        const normalize = (value: number) => ((value % 360) + 360) % 360;
        const { west, span } = this.geographicLonOffset360;
        let normalized = normalize(longitude);
        if (normalized < west) normalized += 360;
        xFraction = (normalized - west) / span;
      } else {
        if (longitude < bounds.west || longitude > bounds.east) continue;
        xFraction = (longitude - bounds.west) / (bounds.east - bounds.west);
      }
      const sourceLatitude = this.crs === 'EPSG:3857' ? latDegToMercY(latitude) : latitude;
      const sourceSouth = this.crs === 'EPSG:3857' ? this.coverageBoundsMerc!.yMin : bounds.south;
      const sourceNorth = this.crs === 'EPSG:3857' ? this.coverageBoundsMerc!.yMax : bounds.north;
      const yFraction = this.latAscending
        ? (sourceLatitude - sourceSouth) / (sourceNorth - sourceSouth)
        : (sourceNorth - sourceLatitude) / (sourceNorth - sourceSouth);
      const indices = new Array(currentArray.shape.length).fill(0);
      indices[this.dimIndices.lon.index] = Math.max(
        0,
        Math.min(dataWidth - 1, Math.floor(xFraction * dataWidth))
      );
      indices[this.dimIndices.lat.index] = Math.max(
        0,
        Math.min(dataHeight - 1, Math.floor(yFraction * dataHeight))
      );
      for (const [dimension, selector] of Object.entries(resolvedSelectors)) {
        if (dimension === 'lon' || dimension === 'lat' || Array.isArray(selector.selected))
          continue;
        indices[this.dimIndices[dimension].index] = Number(selector.selected);
      }
      validPositions[point] = true;
      const profileIndices = profile
        ? Array.from({ length: profile.end - profile.start }, (_, index) => profile!.start + index)
        : [0];
      for (let profileIndex = 0; profileIndex < profileIndices.length; profileIndex++) {
        if (profile)
          indices[this.dimIndices[profile.dimension].index] = profileIndices[profileIndex];
        const chunkCoords = indices.map((index, dimension) =>
          Math.floor(index / currentArray.chunks[dimension])
        );
        const local = indices.map(
          (index, dimension) => index - chunkCoords[dimension] * currentArray.chunks[dimension]
        );
        const key = chunkCoords.join(',');
        const group = groups.get(key) ?? { coords: chunkCoords, samples: [] };
        group.samples.push({ point, profileIndex, local });
        groups.set(key, group);
      }
    }

    const pointValues = positions.map(() =>
      new Array<number | null>(profile ? profile.end - profile.start : 1).fill(null)
    );
    const pending = [...groups.values()];
    let next = 0;
    const worker = async () => {
      while (next < pending.length) {
        this.throwIfQueryAborted(options.signal);
        const group = pending[next++];
        const chunk = await currentArray.getChunk(group.coords, { signal: options.signal });
        for (const sample of group.samples) {
          const flatIndex = sample.local.reduce(
            (sum, localIndex, dimension) => sum + localIndex * chunk.stride[dimension],
            0
          );
          const rawValue = Number((chunk.data as unknown as ArrayLike<number>)[flatIndex]);
          const value = rawValue * this.scaleFactor + this.offset;
          const noData =
            !Number.isFinite(value) ||
            (this.useFillValue && rawValue === this.fillValue) ||
            (this.noDataMin !== undefined && value < this.noDataMin) ||
            (this.noDataMax !== undefined && value > this.noDataMax);
          if (!noData) pointValues[sample.point][sample.profileIndex] = value;
        }
      }
    };
    await Promise.all(
      Array.from(
        { length: Math.min(pending.length, Math.max(1, Math.floor(options.concurrency ?? 6))) },
        worker
      )
    );

    const lonName = this.dimIndices.lon?.name ?? 'lon';
    const latName = this.dimIndices.lat?.name ?? 'lat';
    return positions.map((position, point) => {
      if (!validPositions[point]) {
        return { variable: this.variable, values: [], dimensions: [], coordinates: {} };
      }
      const values: number[] = [];
      const validProfileIndices: number[] = [];
      pointValues[point].forEach((value, index) => {
        if (value !== null) {
          values.push(value);
          validProfileIndices.push(index);
        }
      });
      const coordinates: QueryResult['coordinates'] = {};
      if (options.includeSpatialCoordinates !== false && values.length) {
        coordinates[lonName] = [position[0]];
        coordinates[latName] = [position[1]];
      }
      for (const [dimension, selector] of Object.entries(resolvedSelectors)) {
        if (dimension === 'lon' || dimension === 'lat') continue;
        const name = this.dimIndices[dimension]?.name ?? dimension;
        if (Array.isArray(selector.selected)) {
          const profileStart = Number(selector.selected[0]);
          coordinates[name] = validProfileIndices.map(
            index => this.dimensionValues[dimension][profileStart + index]
          );
        } else {
          const coordinate = this.dimensionValues[dimension]?.[Number(selector.selected)];
          if (coordinate !== undefined) coordinates[name] = [coordinate];
        }
      }
      return {
        variable: this.variable,
        values,
        dimensions: values.length ? Object.keys(coordinates) : [],
        coordinates
      };
    });
  }

  private throwIfQueryAborted(signal?: AbortSignal): void {
    if (signal?.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
  }

  private async getFinestArray() {
    if (!this.zarrArray) throw new Error('Zarr not initialized');
    if (this.levelInfos.length === 0) {
      return {
        dataWidth: this.zarrArray.shape[this.dimIndices.lon.index],
        dataHeight: this.zarrArray.shape[this.dimIndices.lat.index],
        currentArray: this.zarrArray,
        multiscaleLevel: null
      };
    }

    let finestIndex = 0;
    let finestPixels = -1;
    for (let index = 0; index < this.levelInfos.length; index++) {
      const metadata = this.levelMetadata.get(index);
      const pixels = metadata ? metadata.width * metadata.height : -1;
      if (pixels > finestPixels) {
        finestIndex = index;
        finestPixels = pixels;
      }
    }
    const multiscaleLevel = this.levelInfos[finestIndex];
    const currentArray = await openLevelArray(
      this.root,
      multiscaleLevel,
      this.variable,
      this.levelCache,
      this.zarrVersion
    );
    const metadata = this.levelMetadata.get(finestIndex);
    return {
      dataWidth: metadata?.width ?? currentArray.shape[this.dimIndices.lon.index],
      dataHeight: metadata?.height ?? currentArray.shape[this.dimIndices.lat.index],
      currentArray,
      multiscaleLevel
    };
  }

  /** Stable selector-derived key that map adapters can use to invalidate tile caches. */
  public get cacheKey(): string {
    return this.selectorHash;
  }

  /** Whether initialization completed successfully and the provider has not been destroyed. */
  get ready(): boolean {
    return this._ready && !this.destroyed;
  }
  /** Promise that resolves with the result of asynchronous dataset initialization. */
  get readyPromise(): Promise<boolean> {
    return this._readyPromise;
  }

  private async initialize(): Promise<boolean> {
    try {
      this.store = this.customStore ?? new zarr.FetchStore(this.url, {
        ...(this.requestOverrides ? { overrides: this.requestOverrides } : {}),
        ...(this.transformRequest
          ? { fetch: createTransformedFetch(this.transformRequest, this.onAuthError) }
          : {})
      });
      this.root = zarr.root(this.store);

      const { zarrArray, levelInfos, dimIndices, attrs } = await initZarrDataset(
        this.store,
        this.root,
        this.variable,
        this.dimensionNames,
        this.levelMetadata,
        this.levelCache,
        this.zarrVersion,
        undefined,
        this.multiscaleFormat
      );
      this.zarrArray = zarrArray;
      this.levelInfos = levelInfos;
      this.dimIndices = dimIndices;

      this.xyLimits = await getXYLimits(
        this.root,
        this.dimIndices,
        this.levelInfos,
        this.levelInfos.length > 0,
        this.zarrVersion
      );

      const meta = extractNoDataMetadata(zarrArray);
      const range = resolveNoDataRange(
        this.noDataMin,
        this.noDataMax,
        meta.metadataMin,
        meta.metadataMax
      );
      this.noDataMin = range.noDataMin;
      this.noDataMax = range.noDataMax;

      this.fillValue = meta.useFillValue ? meta.fillValue : 0;
      this.useFillValue = meta.useFillValue;

      this.scaleFactor = attrs.scale_factor ?? 1;
      this.offset = attrs.add_offset ?? 0;
      this.crs = this.crs || (await detectCRS(attrs, zarrArray, this.xyLimits));

      let { xMin, xMax, yMin, yMax } = this.xyLimits!;
      const baseWidth = this.levelMetadata.get(0)?.width ?? zarrArray.shape[dimIndices.lon.index];
      const baseHeight = this.levelMetadata.get(0)?.height ?? zarrArray.shape[dimIndices.lat.index];
      const dx = baseWidth > 0 ? (xMax - xMin) / baseWidth : 0;
      const dy = baseHeight > 0 ? (yMax - yMin) / baseHeight : 0;
      let isGeographicGlobal = false;
      if (this.crs === 'EPSG:4326') {
        const lonCount = zarrArray.shape[dimIndices.lon.index];
        const lonSpan = xMax - xMin;
        const lonStep = lonCount > 1 ? lonSpan / (lonCount - 1) : 0;
        const tolerance = Math.max(lonStep * 1.5, 1e-3);
        const wrapsZeroTo360 =
          xMin >= -tolerance && xMax <= 360 + tolerance && xMax >= 180 - tolerance;
        const isGlobal = lonStep > 0 && lonSpan >= 360 - lonStep - tolerance;
        isGeographicGlobal = isGlobal;
        if (wrapsZeroTo360 && isGlobal) {
          this.geographicLonOffset360 = {
            west: xMin - lonStep / 2,
            span: lonSpan + lonStep
          };
        }
      }

      if (this.renderTarget === 'cesium') {
        yMin -= dy / 2;
        yMax += dy / 2;
        xMin -= dx / 2;
        xMax += dx / 2;
      }
      if (this.crs === 'EPSG:3857') {
        this.coverageBoundsMerc = { xMin, xMax, yMin, yMax };
        const west = (xMin / 6378137) * (180 / Math.PI);
        const east = (xMax / 6378137) * (180 / Math.PI);
        const south = (2 * Math.atan(Math.exp(yMin / 6378137)) - Math.PI / 2) * (180 / Math.PI);
        const north = (2 * Math.atan(Math.exp(yMax / 6378137)) - Math.PI / 2) * (180 / Math.PI);
        this.coverageBoundsDeg = { west, south, east, north };
      } else {
        if (this.geographicLonOffset360) {
          const edgeOffset = this.renderTarget === 'cesium' ? dx / 2 : 0;
          xMin = -180 - edgeOffset;
          xMax = 180 + edgeOffset;
        } else if (!isGeographicGlobal && (xMin > 180 || xMax > 180)) {
          xMin = ((xMin + 180) % 360) - 180;
          xMax = ((xMax + 180) % 360) - 180;
          if (xMin > xMax) {
            const temp = xMin;
            xMin = xMax;
            xMax = temp;
          }
        }
        this.coverageBoundsDeg = { west: xMin, south: yMin, east: xMax, north: yMax };
        this.coverageBoundsMerc = {
          xMin: lonDegToMercX(this.coverageBoundsDeg.west),
          xMax: lonDegToMercX(this.coverageBoundsDeg.east),
          yMin: latDegToMercY(this.coverageBoundsDeg.south),
          yMax: latDegToMercY(this.coverageBoundsDeg.north)
        };
      }
      this.selectorHash = this.computeSelectorHash(this.selectors);

      await this.loadInitialDimensionValues();
      this.resolveLatitudeOrientation();

      return true;
    } catch (e) {
      console.error('Failed to initialize ZarrTileProvider:', e);
      return false;
    }
  }

  private computeSelectorHash(selector: ZarrSelectors): string {
    const sortKeys = (value: unknown): unknown => {
      if (Array.isArray(value) || value === null) return value;
      if (typeof value !== 'object') return value;

      const obj = value as Record<string, unknown>;
      const sorted: Record<string, unknown> = {};
      Object.keys(obj)
        .sort()
        .forEach(k => {
          sorted[k] = sortKeys(obj[k]);
        });
      return sorted;
    };

    return JSON.stringify(sortKeys(selector));
  }

  private async loadInitialDimensionValues(): Promise<void> {
    const multiscaleLevel = this.levelInfos.length > 0 ? this.levelInfos[0] : null;

    for (const dimName of Object.keys(this.dimIndices)) {
      try {
        this.dimensionValues[dimName] = await loadDimensionValues(
          this.dimensionValues,
          multiscaleLevel,
          this.dimIndices[dimName],
          this.root,
          this.zarrVersion
        );

        if (dimName === 'lon' || dimName === 'lat') continue;
        if (!this.selectors[dimName]) {
          this.selectors[dimName] = { selected: 0, type: 'index' };
        } else if (this.selectors[dimName].type === 'value') {
          this.selectors[dimName].selected = calculateNearestIndex(
            this.dimensionValues[dimName],
            this.selectors[dimName].selected as number
          );
        }
      } catch (err) {
        console.warn(`Failed to load dimension values for ${dimName}:`, err);
      }
    }
  }

  private resolveLatitudeOrientation(): void {
    if (this.latIsAscendingOverride !== undefined) {
      this.latAscending = this.latIsAscendingOverride;
      return;
    }
    const latName = this.dimIndices.lat?.name;
    const values = (
      latName ? this.dimensionValues[latName] || this.dimensionValues.lat : this.dimensionValues.lat
    ) as ArrayLike<number> | undefined;
    if (values && values.length > 1) {
      this.latAscending = Number(values[0]) < Number(values[values.length - 1]);
      return;
    }
    console.warn('Failed to infer latitude ordering. Falling back to descending latitude.');
  }

  private initWebGL() {
    const canvas = document.createElement('canvas');
    canvas.width = this.tileSize;
    canvas.height = this.tileSize;

    const gl = canvas.getContext('webgl2', {
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    }) as WebGL2RenderingContext | null;

    this.gl = gl;
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
      console.error('Shader creation failed');
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    this.program = program;
    if (!this.program) return;

    this.updateColormapTexture();

    this.attribs = {
      a_position: gl.getAttribLocation(this.program, 'a_position'),
      a_texCoord: gl.getAttribLocation(this.program, 'a_texCoord')
    };

    this.vao = gl.createVertexArray();
    this.quadVbo = gl.createBuffer();
    if (!this.vao || !this.quadVbo) {
      console.error('Failed to create VAO/VBO');
      return;
    }

    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadVbo);

    gl.bufferData(gl.ARRAY_BUFFER, 24 * 4, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(this.attribs.a_position);
    gl.vertexAttribPointer(this.attribs.a_position, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(this.attribs.a_texCoord);
    gl.vertexAttribPointer(this.attribs.a_texCoord, 2, gl.FLOAT, false, 16, 8);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.dataTexture = gl.createTexture();
    if (!this.dataTexture) {
      console.error('Failed to create data texture');
      return;
    }

    gl.bindTexture(gl.TEXTURE_2D, this.dataTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);
    this.uniforms = {
      u_dataTexture: gl.getUniformLocation(this.program, 'u_dataTexture'),
      u_colorRamp: gl.getUniformLocation(this.program, 'u_colorRamp'),
      u_min: gl.getUniformLocation(this.program, 'u_min'),
      u_max: gl.getUniformLocation(this.program, 'u_max'),
      u_noDataMin: gl.getUniformLocation(this.program, 'u_noDataMin'),
      u_noDataMax: gl.getUniformLocation(this.program, 'u_noDataMax'),
      u_fillValue: gl.getUniformLocation(this.program, 'u_fillValue'),
      u_useFillValue: gl.getUniformLocation(this.program, 'u_useFillValue'),
      u_flipY: gl.getUniformLocation(this.program, 'u_flipY'),
      u_scaleFactor: gl.getUniformLocation(this.program, 'u_scaleFactor'),
      u_addOffset: gl.getUniformLocation(this.program, 'u_addOffset')
    };
  }

  private updateColormapTexture() {
    if (!this.gl) return;
    if (this.colorTexture) this.gl.deleteTexture(this.colorTexture);
    this.colorTexture = createColorRampTexture(this.gl, this.colorScale.colors, 1);
  }

  private static async throttle<T>(fn: () => Promise<T>): Promise<T> {
    if (this.activeRequests >= this.concurrencyLimit) {
      await new Promise<void>(resolve => this.queue.push(resolve));
    }
    this.activeRequests++;
    try {
      return await fn();
    } finally {
      this.activeRequests--;
      const next = this.queue.shift();
      if (next) next();
    }
  }

  private choosePyramidLevel(z: number): string | null {
    if (!this.levelInfos.length) return null;

    const worldWidth = this.crs === 'EPSG:3857' ? 2 * Math.PI * 6378137 : 360;
    const coverageWidth =
      this.crs === 'EPSG:3857'
        ? Math.abs(this.coverageBoundsMerc!.xMax - this.coverageBoundsMerc!.xMin)
        : Math.abs(this.coverageBoundsDeg!.east - this.coverageBoundsDeg!.west);
    const coverageFraction = Math.max(0, Math.min(1, coverageWidth / worldWidth));
    const rootTilesX = this.renderTarget === 'cesium' && this.crs === 'EPSG:4326' ? 2 : 1;
    const targetWidth = Math.max(
      1,
      this.tileSize * rootTilesX * 2 ** Math.max(0, z) * coverageFraction
    );

    let bestIndex = 0;
    let bestError = Number.POSITIVE_INFINITY;
    for (let index = 0; index < this.levelInfos.length; index++) {
      const width = this.levelMetadata.get(index)?.width;
      if (!width || width <= 0) continue;
      const error = Math.abs(Math.log2(width / targetWidth));
      if (error < bestError) {
        bestError = error;
        bestIndex = index;
      }
    }
    return this.levelInfos[bestIndex];
  }

  private prepareAbortController(key: string): AbortController {
    const prev = this.abortControllers.get(key);
    if (prev) prev.abort();
    const c = new AbortController();
    this.abortControllers.set(key, c);
    return c;
  }

  /**
   * Aborts an in-flight tile request.
   *
   * @param key - Tile key originally passed to {@link renderTile}.
   */
  abortTile(key: string): void {
    const c = this.abortControllers.get(key);
    if (c) c.abort();
    this.abortControllers.delete(key);
  }

  private async getArrayForZoom(z: number) {
    if (!this.zarrArray) throw new Error('Zarr not initialized');
    const lvl = this.choosePyramidLevel(z);

    if (!lvl) {
      const dataHeight = this.zarrArray.shape[this.dimIndices.lat.index];
      const dataWidth = this.zarrArray.shape[this.dimIndices.lon.index];
      return { dataWidth, dataHeight, currentArray: this.zarrArray, multiscaleLevel: null };
    }

    const currentArray = await openLevelArray(this.root, lvl, this.variable, this.levelCache);
    const idx = this.levelInfos.indexOf(lvl);
    const meta = this.levelMetadata.get(idx);

    const dataWidth = meta?.width ?? currentArray.shape[this.dimIndices.lon.index];
    const dataHeight = meta?.height ?? currentArray.shape[this.dimIndices.lat.index];
    return { dataWidth, dataHeight, currentArray, multiscaleLevel: lvl };
  }

  /**
   * Fetches and renders a geographic tile into a canvas.
   *
   * @param boundsDeg - WGS84 tile bounds in degrees.
   * @param z - Map zoom used to choose a multiscale level.
   * @param key - Unique request key used for cancellation.
   * @returns A canvas or transferable image bitmap containing the rendered tile.
   * @throws If initialization failed, the provider was destroyed, or rendering cannot complete.
   */
  async renderTile(
    boundsDeg: BoundsProps,
    z: number,
    key: string
  ): Promise<HTMLCanvasElement | ImageBitmap> {
    if (this.destroyed) return this.emptyCanvas();

    if (!this.ready || !this.zarrArray || !this.gl || !this.program) {
      await this.readyPromise;
      if (!this.gl || !this.program || !this.coverageBoundsDeg) return this.emptyCanvas();
    }

    if (
      this.renderTarget === 'web-map' &&
      this.geographicLonOffset360 &&
      boundsDeg.east - boundsDeg.west >= 360 - 1e-9
    ) {
      const middle = (boundsDeg.west + boundsDeg.east) / 2;
      const west = await this.renderTile({ ...boundsDeg, east: middle }, z, `${key}/west`);
      const east = await this.renderTile({ ...boundsDeg, west: middle }, z, `${key}/east`);
      const canvas = document.createElement('canvas');
      canvas.width = this.tileSize;
      canvas.height = this.tileSize;
      const context = canvas.getContext('2d')!;
      const half = this.tileSize / 2;
      context.drawImage(west, 0, 0, half, this.tileSize);
      context.drawImage(east, half, 0, this.tileSize - half, this.tileSize);
      return canvas;
    }

    key = `${this.selectorHash}/${key}`;
    const controller = this.prepareAbortController(key);

    try {
      const useGeographicCoordinates = this.renderTarget === 'cesium' && this.crs === 'EPSG:4326';
      const cov = useGeographicCoordinates
        ? {
            xMin: this.coverageBoundsDeg!.west,
            xMax: this.coverageBoundsDeg!.east,
            yMin: this.coverageBoundsDeg!.south,
            yMax: this.coverageBoundsDeg!.north
          }
        : this.coverageBoundsMerc!;
      const { dataWidth, dataHeight, currentArray, multiscaleLevel } =
        await this.getArrayForZoom(z);

      // Cesium's geographic tiling scheme samples EPSG:4326 arrays in degrees.
      // Leaflet and OpenLayers use Web Mercator tiles even when the source data
      // coordinates are geographic, matching the original zarr-maps provider.
      const tileCoordinates = useGeographicCoordinates
        ? {
            xMin: boundsDeg.west,
            xMax: boundsDeg.east,
            yMin: boundsDeg.south,
            yMax: boundsDeg.north
          }
        : {
            xMin: lonDegToMercX(boundsDeg.west),
            xMax: lonDegToMercX(boundsDeg.east),
            yMin: latDegToMercY(boundsDeg.south),
            yMax: latDegToMercY(boundsDeg.north)
          };

      const ixMin = Math.max(tileCoordinates.xMin, cov.xMin);
      const ixMax = Math.min(tileCoordinates.xMax, cov.xMax);
      const iyMin = Math.max(tileCoordinates.yMin, cov.yMin);
      const iyMax = Math.min(tileCoordinates.yMax, cov.yMax);

      if (!(ixMin < ixMax && iyMin < iyMax)) return this.emptyCanvas();

      const fracWest =
        (ixMin - tileCoordinates.xMin) / (tileCoordinates.xMax - tileCoordinates.xMin);
      const fracEast =
        (ixMax - tileCoordinates.xMin) / (tileCoordinates.xMax - tileCoordinates.xMin);
      const fracSouth =
        (iyMin - tileCoordinates.yMin) / (tileCoordinates.yMax - tileCoordinates.yMin);
      const fracNorth =
        (iyMax - tileCoordinates.yMin) / (tileCoordinates.yMax - tileCoordinates.yMin);

      const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

      let u0 = clamp01((ixMin - cov.xMin) / (cov.xMax - cov.xMin));
      let u1 = clamp01((ixMax - cov.xMin) / (cov.xMax - cov.xMin));
      if (this.crs === 'EPSG:4326' && this.geographicLonOffset360) {
        const normalize = (longitude: number) => ((longitude % 360) + 360) % 360;
        const { west, span } = this.geographicLonOffset360;
        let lonWest = normalize(boundsDeg.west);
        let lonEast = normalize(boundsDeg.east);
        if (lonWest < west) lonWest += 360;
        if (lonEast < west) lonEast += 360;
        if (lonEast <= lonWest) lonEast += 360;
        u0 = clamp01((lonWest - west) / span);
        u1 = clamp01((lonEast - west) / span);
      }

      // Tile intersection is performed in the map projection, but an
      // EPSG:4326 array is indexed in degrees. Using a Mercator Y fraction to
      // select geographic rows causes severe north/south stretching.
      const sourceYMin =
        this.crs === 'EPSG:4326' && !useGeographicCoordinates
          ? (2 * Math.atan(Math.exp(iyMin / 6378137)) - Math.PI / 2) * (180 / Math.PI)
          : iyMin;
      const sourceYMax =
        this.crs === 'EPSG:4326' && !useGeographicCoordinates
          ? (2 * Math.atan(Math.exp(iyMax / 6378137)) - Math.PI / 2) * (180 / Math.PI)
          : iyMax;
      const sourceCoverageYMin =
        this.crs === 'EPSG:4326' ? this.coverageBoundsDeg!.south : cov.yMin;
      const sourceCoverageYMax =
        this.crs === 'EPSG:4326' ? this.coverageBoundsDeg!.north : cov.yMax;

      const useAscendingRows = this.latAscending;
      const v0 = useAscendingRows
        ? clamp01((sourceYMin - sourceCoverageYMin) / (sourceCoverageYMax - sourceCoverageYMin))
        : clamp01((sourceCoverageYMax - sourceYMax) / (sourceCoverageYMax - sourceCoverageYMin));
      const v1 = useAscendingRows
        ? clamp01((sourceYMax - sourceCoverageYMin) / (sourceCoverageYMax - sourceCoverageYMin))
        : clamp01((sourceCoverageYMax - sourceYMin) / (sourceCoverageYMax - sourceCoverageYMin));

      const startX = Math.floor(u0 * dataWidth);
      const endX = Math.ceil(u1 * dataWidth);
      const startY = Math.floor(v0 * dataHeight);
      const endY = Math.ceil(v1 * dataHeight);

      const sX = Math.max(0, Math.min(dataWidth - 1, startX));
      const eX = Math.max(0, Math.min(dataWidth, endX));
      const sY = Math.max(0, Math.min(dataHeight - 1, startY));
      const eY = Math.max(0, Math.min(dataHeight, endY));

      const w = eX - sX;
      const h = eY - sY;

      if (w <= 0 || h <= 0) return this.emptyCanvas();

      const sliceArgs = await calculateSliceArgsRequestImage(
        currentArray.shape,
        { startX: sX, endX: eX, startY: sY, endY: eY },
        this.dimIndices,
        this.selectors
      );

      const data = await ZarrTileProvider.throttle(() =>
        zarr.get(currentArray, sliceArgs, { opts: { signal: controller.signal } })
      );

      const src = data.data as Float32Array;
      const view = new Float32Array(src.buffer, src.byteOffset, src.length);
      const flatData = new Float32Array(view);

      const ascendingSliceStart = this.latAscending ? sY : dataHeight - eY;
      return await this.renderWithWebGL(
        flatData,
        w,
        h,
        { fracWest, fracEast, fracSouth, fracNorth },
        this.crs === 'EPSG:4326' && !useGeographicCoordinates
          ? {
              mercatorSouth: iyMin,
              mercatorNorth: iyMax,
              geographicSouth: this.coverageBoundsDeg!.south,
              geographicNorth: this.coverageBoundsDeg!.north,
              dataHeight,
              ascendingSliceStart
            }
          : undefined
      );
    } catch {
      return this.emptyCanvas();
    } finally {
      this.abortControllers.delete(key);
    }
  }

  private _emptyCanvas: HTMLCanvasElement | null = null;
  private emptyCanvas() {
    if (!this._emptyCanvas) {
      this._emptyCanvas = document.createElement('canvas');
      this._emptyCanvas.width = this.tileSize;
      this._emptyCanvas.height = this.tileSize;
    }
    return this._emptyCanvas;
  }

  private async renderWithWebGL(
    data: Float32Array,
    width: number,
    height: number,
    frac: { fracWest: number; fracEast: number; fracSouth: number; fracNorth: number },
    mercatorWarp?: {
      mercatorSouth: number;
      mercatorNorth: number;
      geographicSouth: number;
      geographicNorth: number;
      dataHeight: number;
      ascendingSliceStart: number;
    }
  ): Promise<HTMLCanvasElement | ImageBitmap> {
    const gl = this.gl!;
    const program = this.program!;
    const { fracWest, fracEast, fracSouth, fracNorth } = frac;

    const dataTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, dataTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, width, height, 0, gl.RED, gl.FLOAT, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.useProgram(program);
    gl.viewport(0, 0, this.tileSize, this.tileSize);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const x0 = fracWest * 2 - 1;
    const x1 = fracEast * 2 - 1;
    const y0 = fracSouth * 2 - 1;
    const y1 = fracNorth * 2 - 1;

    const vertices: number[] = [];
    const segments = mercatorWarp ? 32 : 1;
    const textureY = (fraction: number) => {
      if (!mercatorWarp) return fraction;
      const mercatorY =
        mercatorWarp.mercatorSouth +
        fraction * (mercatorWarp.mercatorNorth - mercatorWarp.mercatorSouth);
      const latitude =
        (2 * Math.atan(Math.exp(mercatorY / 6378137)) - Math.PI / 2) * (180 / Math.PI);
      const geographicFraction =
        (latitude - mercatorWarp.geographicSouth) /
        (mercatorWarp.geographicNorth - mercatorWarp.geographicSouth);
      return Math.max(
        0,
        Math.min(
          1,
          (geographicFraction * mercatorWarp.dataHeight - mercatorWarp.ascendingSliceStart) / height
        )
      );
    };

    for (let segment = 0; segment < segments; segment++) {
      const q0 = segment / segments;
      const q1 = (segment + 1) / segments;
      const py0 = y0 + q0 * (y1 - y0);
      const py1 = y0 + q1 * (y1 - y0);
      const ty0 = textureY(q0);
      const ty1 = textureY(q1);
      vertices.push(
        x0,
        py0,
        0,
        ty0,
        x1,
        py0,
        1,
        ty0,
        x0,
        py1,
        0,
        ty1,
        x0,
        py1,
        0,
        ty1,
        x1,
        py0,
        1,
        ty0,
        x1,
        py1,
        1,
        ty1
      );
    }
    const positions = new Float32Array(vertices);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STREAM_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const uvLoc = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, dataTexture);
    gl.uniform1i(this.uniforms.u_dataTexture, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.colorTexture);
    gl.uniform1i(this.uniforms.u_colorRamp, 1);

    gl.uniform1f(this.uniforms.u_min, this.colorScale.min);
    gl.uniform1f(this.uniforms.u_max, this.colorScale.max);
    gl.uniform1f(this.uniforms.u_noDataMin, this.noDataMin as number);
    gl.uniform1f(this.uniforms.u_noDataMax, this.noDataMax as number);
    gl.uniform1f(this.uniforms.u_fillValue, this.fillValue as number);
    gl.uniform1i(this.uniforms.u_useFillValue, this.useFillValue ? 1 : 0);
    // WebGL treats the first uploaded row as the bottom of the texture. Arrays
    // ordered north-to-south therefore need a vertical texture flip; arrays
    // ordered south-to-north do not. This is independent of the map adapter.
    const flipDataY = !this.latAscending;
    gl.uniform1i(this.uniforms.u_flipY, flipDataY ? 1 : 0);
    gl.uniform1f(this.uniforms.u_scaleFactor, this.scaleFactor);
    gl.uniform1f(this.uniforms.u_addOffset, this.offset);

    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 4);

    gl.deleteTexture(dataTexture);
    gl.deleteBuffer(buffer);

    const out = document.createElement('canvas');
    out.width = this.tileSize;
    out.height = this.tileSize;
    out.getContext('2d')!.drawImage(gl.canvas as HTMLCanvasElement, 0, 0);
    return out;
  }
}
