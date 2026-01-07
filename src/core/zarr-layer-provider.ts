import * as zarr from 'zarrita';
import { colormapBuilder } from './jsColormaps';
import {
  calculateNearestIndex,
  calculateSliceArgs,
  detectCRS,
  extractNoDataMetadata,
  getXYLimits,
  initZarrDataset,
  loadDimensionValues,
  openLevelArray,
  resolveNoDataRange
} from './zarr-utils';
import { createColorRampTexture, createProgram, createShader } from './webgl-utils';
import { vertexShaderSource, fragmentShaderSource } from './shaders';
import { latDegToMercY, lonDegToMercX } from './mercator-utils';
import type {
  ColorMapName,
  CRS,
  DimensionNamesProps,
  DimIndicesProps,
  XYLimits,
  ZarrLevelMetadata,
  ZarrSelectorsProps,
  DimensionValues,
  BoundsProps
} from './types';
import type { LeafletLayerOptions } from '../leaflet/types';
import type { OLLayerOptions } from '../ol/types';

/**
 * Provides Zarr dataset access and rendering capabilities for map layers.
 */
export class ZarrLayerProvider {
  public dimensionValues: DimensionValues = {};
  public selectors: { [key: string]: ZarrSelectorsProps } = {};
  public crs: CRS | null = null;

  private url: string;
  private variable: string;
  private zarrVersion: 2 | 3 | null;

  private noDataMin: number | undefined;
  private noDataMax: number | undefined;
  private fillValue: number | undefined;
  private useFillValue = false;

  private scaleFactor = 1;
  private offset = 0;

  private tileSize: number;
  private maxZoom: number;
  public coverageBoundsMerc: { xMin: number; yMin: number; xMax: number; yMax: number } | null =
    null;

  private colorScale: { min: number; max: number; colors: number[][] };
  private colormap: ColorMapName;

  private store!: zarr.FetchStore;
  private root!: zarr.Location<zarr.FetchStore>;
  private zarrArray: zarr.Array<any> | null = null;

  private dimIndices: DimIndicesProps = {};
  private levelInfos: string[] = [];
  private levelCache = new Map();
  private levelMetadata: Map<number, ZarrLevelMetadata> = new Map();
  private xyLimits: XYLimits | null = null;

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

  constructor(options: LeafletLayerOptions | OLLayerOptions) {
    this.url = options.url;
    this.variable = options.variable;
    this.zarrVersion = options.zarrVersion ?? null;

    this.crs = options.crs || null;
    this.tileSize = options.tileSize ?? 256;
    this.maxZoom = options.maxZoom ?? options.maxZoom ?? 12;

    this.selectors = options.selectors || {};
    this.noDataMin = options.noDataMin;
    this.noDataMax = options.noDataMax;

    const [min, max] = options.scale ?? [-3, 3];
    this.colormap = options.colormap ?? 'viridis';
    const colors = colormapBuilder(this.colormap) as number[][];
    this.colorScale = { min, max, colors };

    this.initWebGL();
    this._readyPromise = this.initialize().then(ok => ((this._ready = ok), ok));
  }

  destroy() {
    this.destroyed = true;
    for (const c of this.abortControllers.values()) c.abort();
    this.abortControllers.clear();
  }

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

  updateSelectors(selectors: { [key: string]: ZarrSelectorsProps }): boolean {
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

  public get cacheKey(): string {
    return this.selectorHash;
  }

  get ready() {
    return this._ready && !this.destroyed;
  }
  get readyPromise() {
    return this._readyPromise;
  }

  private async initialize(): Promise<boolean> {
    try {
      this.store = new zarr.FetchStore(this.url);
      this.root = zarr.root(this.store);

      const dimensionNames: DimensionNamesProps = {};
      const { zarrArray, levelInfos, dimIndices, attrs } = await initZarrDataset(
        this.store,
        this.root,
        this.variable,
        dimensionNames,
        this.levelMetadata,
        this.levelCache,
        this.zarrVersion
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
      if (this.crs === 'EPSG:3857') {
        this.coverageBoundsMerc = { xMin, xMax, yMin, yMax };
        const west = (xMin / 6378137) * (180 / Math.PI);
        const east = (xMax / 6378137) * (180 / Math.PI);
        const south = (2 * Math.atan(Math.exp(yMin / 6378137)) - Math.PI / 2) * (180 / Math.PI);
        const north = (2 * Math.atan(Math.exp(yMax / 6378137)) - Math.PI / 2) * (180 / Math.PI);
        this.coverageBoundsDeg = { west, south, east, north };
      } else {
        if (xMin > 180 || xMax > 180) {
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

      return true;
    } catch (e) {
      console.error('Failed to init ZarrLayerProvider:', e);
      return false;
    }
  }

  private computeSelectorHash(selector: { [key: string]: ZarrSelectorsProps }): string {
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
      if (dimName !== 'lon' && dimName !== 'lat') {
        try {
          this.dimensionValues[dimName] = await loadDimensionValues(
            this.dimensionValues,
            multiscaleLevel,
            this.dimIndices[dimName],
            this.root,
            this.zarrVersion
          );

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
    const normalized = z / this.maxZoom;
    const idx = Math.floor(normalized * (this.levelInfos.length - 1));
    return this.levelInfos[idx];
  }

  private prepareAbortController(key: string): AbortController {
    const prev = this.abortControllers.get(key);
    if (prev) prev.abort();
    const c = new AbortController();
    this.abortControllers.set(key, c);
    return c;
  }

  abortTile(key: string) {
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

  async renderTile(boundsDeg: BoundsProps, z: number, key: string) {
    if (this.destroyed) return this.emptyCanvas();

    if (!this.ready || !this.zarrArray || !this.gl || !this.program) {
      await this.readyPromise;
      if (!this.gl || !this.program || !this.coverageBoundsDeg) return this.emptyCanvas();
    }
    key = `${this.selectorHash}/${key}`;
    const controller = this.prepareAbortController(key);

    try {
      const cov = this.coverageBoundsMerc!;
      const { dataWidth, dataHeight, currentArray } = await this.getArrayForZoom(z);

      const tileMerc = {
        xMin: lonDegToMercX(boundsDeg.west),
        xMax: lonDegToMercX(boundsDeg.east),
        yMin: latDegToMercY(boundsDeg.south),
        yMax: latDegToMercY(boundsDeg.north)
      };

      const ixMin = Math.max(tileMerc.xMin, cov.xMin);
      const ixMax = Math.min(tileMerc.xMax, cov.xMax);
      const iyMin = Math.max(tileMerc.yMin, cov.yMin);
      const iyMax = Math.min(tileMerc.yMax, cov.yMax);

      if (!(ixMin < ixMax && iyMin < iyMax)) return this.emptyCanvas();

      const fracWest = (ixMin - tileMerc.xMin) / (tileMerc.xMax - tileMerc.xMin);
      const fracEast = (ixMax - tileMerc.xMin) / (tileMerc.xMax - tileMerc.xMin);
      const fracSouth = (iyMin - tileMerc.yMin) / (tileMerc.yMax - tileMerc.yMin);
      const fracNorth = (iyMax - tileMerc.yMin) / (tileMerc.yMax - tileMerc.yMin);

      const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

      const u0 = clamp01((ixMin - cov.xMin) / (cov.xMax - cov.xMin));
      const u1 = clamp01((ixMax - cov.xMin) / (cov.xMax - cov.xMin));

      const v0 = clamp01((cov.yMax - iyMax) / (cov.yMax - cov.yMin));
      const v1 = clamp01((cov.yMax - iyMin) / (cov.yMax - cov.yMin));

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

      const sliceArgs = calculateSliceArgs(
        currentArray.shape,
        { startX: sX, endX: eX, startY: sY, endY: eY },
        this.dimIndices,
        this.selectors
      );

      const data = await ZarrLayerProvider.throttle(() =>
        zarr.get(currentArray, sliceArgs, { opts: { signal: controller.signal } })
      );

      const src = data.data as Float32Array;
      const view = new Float32Array(src.buffer, src.byteOffset, src.length);
      const flatData = new Float32Array(view);

      return await this.renderWithWebGL(flatData, w, h, {
        fracWest,
        fracEast,
        fracSouth,
        fracNorth
      });
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
    frac: { fracWest: number; fracEast: number; fracSouth: number; fracNorth: number }
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

    const positions = new Float32Array([
      x0,
      y0,
      0,
      0,
      x1,
      y0,
      1,
      0,
      x0,
      y1,
      0,
      1,
      x0,
      y1,
      0,
      1,
      x1,
      y0,
      1,
      0,
      x1,
      y1,
      1,
      1
    ]);

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
    gl.uniform1f(this.uniforms.u_scaleFactor, this.scaleFactor);
    gl.uniform1f(this.uniforms.u_addOffset, this.offset);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.deleteTexture(dataTexture);
    gl.deleteBuffer(buffer);

    const out = document.createElement('canvas');
    out.width = this.tileSize;
    out.height = this.tileSize;
    out.getContext('2d')!.drawImage(gl.canvas as HTMLCanvasElement, 0, 0);
    return out;
  }
}
