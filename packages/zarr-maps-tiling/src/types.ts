/**
 * @module types
 *
 * Type and interface definitions for Zarr-based Leaflet visualization components.
 *
 * @remarks
 * This module defines the core data structures used throughout the package,
 * including dataset selectors, cube and layer configuration options,
 * CRS types, and color scale specifications.
 *
 * These types are shared between:
 * - WebGL colormap utilities
 * - Leaflet integration layers
 */

import type { ColorMapName } from 'zarr-maps-colormap';
import * as zarr from 'zarrita';

/* -------------------------------------------------------------------------- */
/*                             BASIC DATA STRUCTURES                          */
/* -------------------------------------------------------------------------- */

/**
 * Describes a selector for a Zarr dataset dimension.
 *
 * @example
 * ```ts
 * { selected: 0, type: 'index' }
 * { selected: 1000, type: 'value' }
 * { selected: [0, 10], type: 'index' }
 * ```
 */

export interface ZarrSelectors {
  [key: string]: ZarrSelectorsProps;
}

export interface ZarrSelectorsProps {
  /** Selected index, value, or range. */
  selected: number | string | [number, number];
  /** Selection mode: by index or by physical value. */
  type?: 'index' | 'value';
}

/**
 * Describes the XY coordinate boundaries of a dataset.
 */
export interface XYLimits {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * Metadata for a single multiscale level in a Zarr dataset.
 */
export interface ZarrLevelMetadata {
  width: number;
  height: number;
}

/* -------------------------------------------------------------------------- */
/*                            DIMENSION DEFINITIONS                           */
/* -------------------------------------------------------------------------- */

/**
 * Mapping of dimension names to their corresponding coordinate arrays.
 */
export interface DimensionValues {
  [key: string]: Float64Array | number[] | string[];
}

/** GeoJSON point geometry expressed as WGS84 longitude and latitude. */
export interface QueryPointGeometry {
  type: 'Point';
  coordinates: [longitude: number, latitude: number];
}

/** GeoJSON polygon geometry, reserved for region-query support. */
export interface QueryPolygonGeometry {
  type: 'Polygon';
  coordinates: number[][][];
}

/** GeoJSON multipolygon geometry, reserved for region-query support. */
export interface QueryMultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: number[][][][];
}

/** Geometry accepted by the shared query API. Only points are implemented currently. */
export type QueryGeometry = QueryPointGeometry | QueryPolygonGeometry | QueryMultiPolygonGeometry;

/** Controls a shared Zarr data query. */
export interface QueryOptions {
  /** Cancels both the remote Zarr read and result processing. */
  signal?: AbortSignal;
  /** Map zoom to query. The finest available resolution is used by default. */
  level?: number | 'finest';
  /** Include the queried WGS84 position in the result. Defaults to true. */
  includeSpatialCoordinates?: boolean;
}

/** Values and coordinates returned from a shared Zarr query. */
export interface QueryResult {
  /**
   * Variable values. Scalar point queries contain at most one value; profile and
   * time-series values align with the ranged coordinate after no-data filtering.
   */
  values: number[];
  /** Dataset dimension names represented by the result. */
  dimensions: string[];
  /** Coordinate values keyed by the dataset's dimension names. */
  coordinates: Record<string, (number | string)[]>;
  /** Name of the queried Zarr variable. */
  variable: string;
}

/** WGS84 longitude/latitude coordinate used by convenience query APIs. */
export type QueryPosition = [longitude: number, latitude: number];

/** Minimal interface required by the framework-neutral convenience queries. */
export interface QueryBackend {
  dimensionValues: DimensionValues;
  selectors: ZarrSelectors;
  /** Global index represented by local coordinate index zero, for subset-backed providers. */
  readonly queryIndexOffsets?: Record<string, number>;
  queryData(
    geometry: QueryPointGeometry,
    selectors?: ZarrSelectors,
    options?: QueryOptions
  ): Promise<QueryResult>;
  /** Optional chunk-aware batch lookup used by transects. */
  queryPoints?(
    positions: QueryPosition[],
    selectors?: ZarrSelectors,
    options?: TransectQueryOptions
  ): Promise<QueryResult[]>;
}

/** Sampling controls for one-level and full-depth transects. */
export interface TransectQueryOptions extends QueryOptions {
  /** Number of evenly spaced points, including both endpoints. Defaults to 64. */
  samples?: number;
  /** Maximum point queries in flight. Defaults to 6. */
  concurrency?: number;
}

/** A one-level transect. Values preserve no-data gaps as null. */
export interface TransectResult {
  variable: string;
  positions: QueryPosition[];
  distancesKm: number[];
  values: (number | null)[];
}

/** A distance-by-elevation transect. Values are indexed [elevation][position]. */
export interface FullTransectResult {
  variable: string;
  positions: QueryPosition[];
  distancesKm: number[];
  elevations: (number | string)[];
  values: (number | null)[][];
}

/**
 * Describes the mapping between dataset dimensions and their standardized names.
 */
export interface DimensionNamesProps {
  time?: string;
  elevation?: string;
  lat?: string;
  lon?: string;
  others?: string[];
}

/**
 * Maps dimension keys to their indices and associated coordinate arrays.
 */
export interface DimIndicesProps {
  [key: string]: { name: string; index: number; array: zarr.Array<any> | null };
}

/**
 * Geographic bounding box definition (degrees).
 */
export interface BoundsProps {
  west: number;
  south: number;
  east: number;
  north: number;
}

/** Framework-neutral options for the shared 2D Zarr tile renderer. */
export interface ZarrTileOptions {
  /** URL to a Zarr store. Required unless `store` is provided. */
  url?: string;
  /** Custom Zarrita-compatible store, such as an IcechunkStore. */
  store?: zarr.Readable;
  variable: string;
  crs?: CRS | null;
  tileSize?: number;
  maxZoom?: number;
  scale?: [number, number];
  colormap?: ColorMapName;
  selectors?: ZarrSelectors;
  zarrVersion?: 2 | 3;
  dimensionNames?: DimensionNamesProps;
  noDataMin?: number;
  noDataMax?: number;
  requestOverrides?: RequestOverrides;
  /** Dynamically transform each FetchStore request (for auth, proxies, or signed URLs). */
  transformRequest?: TransformRequest;
  /** Called once when a transformed request returns an expired-credential status. */
  onAuthError?: OnAuthError;
  multiscaleFormat?: MultiscaleFormat;
  latIsAscending?: boolean;
  /** Rendering convention used by the consuming map framework. */
  renderTarget?: 'web-map' | 'cesium';
}

/** Serializable static fetch options suitable for application state and FetchStore. */
export interface RequestOverrides extends Omit<RequestInit, 'body' | 'headers' | 'signal'> {
  headers?: Record<string, string>;
}

export interface RequestParameters extends Omit<RequestInit, 'headers'> {
  url: string;
  headers?: Record<string, string>;
}

export type TransformRequest = (
  url: string,
  options?: { method?: 'GET' | 'HEAD' }
) => RequestParameters | Promise<RequestParameters>;

export type OnAuthError = (status: number) => void;

/**
 * Alias of {@link XYLimits} with explicit type name for Zarr coordinate bounds.
 */
export interface XYLimitsProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * Supported Coordinate Reference Systems.
 */
export type CRS = 'EPSG:4326' | 'EPSG:3857';

/** Supported conventions for discovering multiscale Zarr levels. */
export type MultiscaleFormat = 'auto' | 'legacy' | 'geozarr';

/** Browser names used for WebGL compatibility handling. */
export type BrowserName = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'unknown';

/**
 * Describes a slice of a multidimensional array.
 */
export interface DataSliceProps {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  startElevation?: number;
  endElevation?: number;
}

/**
 * Represents a multidimensional slice argument for Zarr array indexing.
 */
export type SliceArgs = (number | zarr.Slice)[];

/**
 * Represents a date in a calendar system.
 */
export type CalendarDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  microsecond: number;
};

/**
 * Supported CF calendar types.
 */
export type CFCalendar =
  | 'standard'
  | 'gregorian'
  | 'proleptic_gregorian'
  | 'julian'
  | 'noleap'
  | '365_day'
  | 'all_leap'
  | '366_day'
  | '360_day';
