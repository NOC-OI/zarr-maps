# zarr-maps-tiling

Regular rectilinear Zarr grids can use any source CRS understood by proj4. Pass a
registered identifier through `crs`, provide an unregistered proj4/WKT2/PROJJSON
definition through `proj4`, or publish `proj:code`, `proj:wkt2`, or `proj:projjson`
metadata. Coverage, point queries, and tile rendering use the same resolved
WGS84-to-source transform. Curvilinear two-dimensional spatial coordinates are
not supported and are rejected during initialization.

```ts
const provider = new ZarrTileProvider({
  url: 'https://example.com/polar.zarr',
  variable: 'temperature',
  crs: 'EPSG:3408',
  proj4: '+proj=laea +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +a=6371228 +b=6371228 +units=m +no_defs',
  dimensionNames: { lon: 'x', lat: 'y' },
  renderTarget: 'web-map'
});
```

`renderTarget` is set by framework adapters. It determines the internal output
tiling convention: Web Mercator for web-map adapters and geographic tiles for
Cesium. The output projection is deliberately not part of the public API.

Framework-independent utilities for loading, slicing, styling, and rendering tiled Zarr data.

The package contains the shared data pipeline used by `zarr-maps-leaflet`, `zarr-maps-ol`, and `zarr-cesium`. It does not
depend on Cesium, Leaflet, or OpenLayers.

```ts
import { initZarrDataset, calculateSliceArgs } from 'zarr-maps-tiling';
import { colormapBuilder } from 'zarr-maps-colormap';
```

`ZarrTileProvider` accepts either a URL or a custom Zarrita `Readable` store. This supports
Icechunk and other storage backends without coupling the tiling package to a specific client:

```ts
const store = await IcechunkStore.open(url, { branch: 'main', formatVersion: 'v1' });
const provider = new ZarrTileProvider({ store, variable: 'temperature' });
```

Private HTTP stores can use `requestOverrides` for static fetch options or `transformRequest`
for per-object headers, credentials, proxies, and signed URLs. `onAuthError` is called once for
HTTP 400/401 responses so applications can refresh expired credentials.

Decoded numeric tiles are cached per provider so changing the colormap or scale can redraw
without reading the same Zarr slice again. The default per-layer budget assumes no more than
five active layers: 8 MiB on devices with up to 2 GiB, 16 MiB up to 4 GiB, 32 MiB up to 8 GiB,
and 64 MiB above that. Browsers that do not expose a device-memory hint use 32 MiB.

```ts
const provider = new ZarrTileProvider({
  url: 'https://example.com/data.zarr',
  variable: 'temperature',
  cache: { maxBytes: 16 * 1024 * 1024 }
});

console.log(provider.tileCacheStats);
provider.clearTileCache();
```

Caching defaults to `true`. Set `cache: false` (or `cache: &#123; enabled: false &#125;`) to disable it.
The budget is per layer, so five layers configured
with 16 MiB can retain at most 80 MiB of decoded tile data in total.

From the `zarr-maps` repository root, build all packages with:

```sh
npm run build
```

## Classes

| Class | Description |
| ------ | ------ |
| [TileDataCache](classes/TileDataCache.md) | A simple LRU cache for tile data. The cache is keyed by a string, which is typically a combination of the layer ID and tile coordinates. |
| [ZarrTileProvider](classes/ZarrTileProvider.md) | Provides Zarr dataset access and rendering capabilities for web-map layers. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [BoundsProps](interfaces/BoundsProps.md) | Geographic bounding box definition (degrees). |
| [DataSliceProps](interfaces/DataSliceProps.md) | Describes a slice of a multidimensional array. |
| [DimensionNamesProps](interfaces/DimensionNamesProps.md) | Describes the mapping between dataset dimensions and their standardized names. |
| [DimensionValues](interfaces/DimensionValues.md) | Mapping of dimension names to their corresponding coordinate arrays. |
| [DimIndicesProps](interfaces/DimIndicesProps.md) | Maps dimension keys to their indices and associated coordinate arrays. |
| [FullTransectResult](interfaces/FullTransectResult.md) | A distance-by-elevation transect. Values are indexed [elevation][position]. |
| [QueryBackend](interfaces/QueryBackend.md) | Minimal interface required by the framework-neutral convenience queries. |
| [QueryMultiPolygonGeometry](interfaces/QueryMultiPolygonGeometry.md) | GeoJSON multipolygon geometry, reserved for region-query support. |
| [QueryOptions](interfaces/QueryOptions.md) | Controls a shared Zarr data query. |
| [QueryPointGeometry](interfaces/QueryPointGeometry.md) | GeoJSON point geometry expressed as WGS84 longitude and latitude. |
| [QueryPolygonGeometry](interfaces/QueryPolygonGeometry.md) | GeoJSON polygon geometry, reserved for region-query support. |
| [QueryResult](interfaces/QueryResult.md) | Values and coordinates returned from a shared Zarr query. |
| [RequestOverrides](interfaces/RequestOverrides.md) | Serializable static fetch options suitable for application state and FetchStore. |
| [RequestParameters](interfaces/RequestParameters.md) | - |
| [ResolvedCRS](interfaces/ResolvedCRS.md) | Validated transformation between WGS84 and a rectilinear source grid. |
| [TileCacheOptions](interfaces/TileCacheOptions.md) | Controls the in-memory cache used to recolor tiles without reading Zarr data again. |
| [TileCacheStats](interfaces/TileCacheStats.md) | Runtime counters for a provider's decoded tile cache. |
| [TransectQueryOptions](interfaces/TransectQueryOptions.md) | Sampling controls for one-level and full-depth transects. |
| [TransectResult](interfaces/TransectResult.md) | A one-level transect. Values preserve no-data gaps as null. |
| [XYLimits](interfaces/XYLimits.md) | Describes the XY coordinate boundaries of a dataset. |
| [XYLimitsProps](interfaces/XYLimitsProps.md) | Alias of [XYLimits](interfaces/XYLimits.md) with explicit type name for Zarr coordinate bounds. |
| [ZarrLevelMetadata](interfaces/ZarrLevelMetadata.md) | Metadata for a single multiscale level in a Zarr dataset. |
| [ZarrSelectors](interfaces/ZarrSelectors.md) | Describes a selector for a Zarr dataset dimension. |
| [ZarrSelectorsProps](interfaces/ZarrSelectorsProps.md) | - |
| [ZarrTileOptions](interfaces/ZarrTileOptions.md) | Framework-neutral options for the shared 2D Zarr tile renderer. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [BrowserName](type-aliases/BrowserName.md) | Browser names used for WebGL compatibility handling. |
| [CalendarDate](type-aliases/CalendarDate.md) | Represents a date in a calendar system. |
| [CFCalendar](type-aliases/CFCalendar.md) | Supported CF calendar types. |
| [CRS](type-aliases/CRS.md) | CRS identifier understood by proj4 (for example `EPSG:4326` or `EPSG:32630`). |
| [CRSDefinition](type-aliases/CRSDefinition.md) | Projection definition accepted by proj4. |
| [MultiscaleFormat](type-aliases/MultiscaleFormat.md) | Supported conventions for discovering multiscale Zarr levels. |
| [OnAuthError](type-aliases/OnAuthError.md) | - |
| [QueryGeometry](type-aliases/QueryGeometry.md) | Geometry accepted by the shared query API. Only points are implemented currently. |
| [QueryPosition](type-aliases/QueryPosition.md) | WGS84 longitude/latitude coordinate used by convenience query APIs. |
| [SliceArgs](type-aliases/SliceArgs.md) | Represents a multidimensional slice argument for Zarr array indexing. |
| [TransformRequest](type-aliases/TransformRequest.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [calculateElevationSlice](functions/calculateElevationSlice.md) | Determines the index range of the elevation axis to load from a Zarr cube. |
| [calculateHeightMeters](functions/calculateHeightMeters.md) | Converts elevation index to Cesium height (meters), applying vertical exaggeration and optional below-sea-level offset. |
| [calculateNearestIndex](functions/calculateNearestIndex.md) | Finds the index of the value in `values` nearest to `target`. |
| [calculateSliceArgs](functions/calculateSliceArgs.md) | Constructs Zarr slice arguments for extracting a subregion of a multidimensional array. |
| [calculateSliceArgsRequestImage](functions/calculateSliceArgsRequestImage.md) | Constructs Zarr slice arguments for extracting a subregion of a multidimensional array. |
| [createColorRampTexture](functions/createColorRampTexture.md) | Creates a flexible 1D color-ramp texture supporting either normalized (0–1) or integer (0–255) color definitions. |
| [createFetchStore](functions/createFetchStore.md) | Creates a Zarrita FetchStore with optional static and dynamic request settings. |
| [createProgram](functions/createProgram.md) | Creates and links a WebGL program using the specified vertex and fragment shaders. |
| [createShader](functions/createShader.md) | Creates and compiles a WebGL shader from source code. |
| [createTransformedFetch](functions/createTransformedFetch.md) | Creates a fetch implementation that applies dynamic request configuration. |
| [decodeCFTime](functions/decodeCFTime.md) | Decodes CF-compliant time coordinate values into ISO date strings. |
| [defaultTileCacheBytes](functions/defaultTileCacheBytes.md) | Selects a conservative per-layer budget while allowing up to five active layers. `deviceMemory` is deliberately treated as a hint, not an allowance. |
| [detectBrowser](functions/detectBrowser.md) | Detects the current browser based on the user agent string. |
| [detectCRS](functions/detectCRS.md) | Detects the coordinate reference system (CRS) of a Zarr dataset based on metadata or coordinate range. Defaults to EPSG:4326 (WGS84) if uncertain. |
| [extractNoDataMetadata](functions/extractNoDataMetadata.md) | Extracts no-data related metadata from a Zarr array's attributes. |
| [getCubeDimensions](functions/getCubeDimensions.md) | Computes cube dimension ordering and strides based on dimension indices. Useful for reshaping 3D Zarr arrays into Cesium-renderable layouts. |
| [getFullTransect](functions/getFullTransect.md) | Queries all elevation levels along a line between two WGS84 positions. |
| [getTimeSeries](functions/getTimeSeries.md) | Queries every time coordinate at one point and the selected elevation. |
| [getTransect](functions/getTransect.md) | Queries one scalar level along a line between two WGS84 positions. |
| [getVerticalProfile](functions/getVerticalProfile.md) | Queries every elevation coordinate at one point and the selected time. |
| [getXYLimits](functions/getXYLimits.md) | Retrieve the geographic coordinate limits (min/max latitude/longitude) for a Zarr array. |
| [getZarrData](functions/getZarrData.md) | Reads an array with the same Zarrita module instance that opened it. Zarrita 0.7 keeps array decoding context module-local, so consumers must not call a separately resolved copy of `zarrita.get` on arrays returned here. |
| [identifyDimensionIndices](functions/identifyDimensionIndices.md) | Identify the indices of common dimensions (lat, lon, time, elevation) in a Zarr array, optionally using CF-compliant standard names or custom dimension mappings. |
| [initZarrDataset](functions/initZarrDataset.md) | Opens a Zarr variable (single-scale or multiscale pyramid) and prepares its metadata. |
| [latDegToMercY](functions/latDegToMercY.md) | - |
| [limitStoreRequests](functions/limitStoreRequests.md) | Wrap a Zarrita store so all reads share one request-concurrency budget. |
| [loadDimensionValues](functions/loadDimensionValues.md) | Loads the coordinate values for a specific dimension. |
| [lonDegToMercX](functions/lonDegToMercX.md) | - |
| [openLevelArray](functions/openLevelArray.md) | Opens and caches a specific multiscale level array. Keeps a small LRU-style cache of up to three levels. |
| [parseCFUnits](functions/parseCFUnits.md) | Parses a CF-compliant units string into its components. |
| [resolveCRS](functions/resolveCRS.md) | Resolve an explicit or metadata-declared rectilinear source CRS. |
| [resolveNoDataRange](functions/resolveNoDataRange.md) | Resolves the no-data value range for masking dataset values. |
| [sampleTransectPositions](functions/sampleTransectPositions.md) | Builds evenly spaced WGS84 samples along the shortest longitude path. |
| [sourceBoundsToGeographic](functions/sourceBoundsToGeographic.md) | Transform a source rectangle to WGS84 by sampling a regular interior grid. |
| [updateImgData](functions/updateImgData.md) | Updates an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object with a new pixel color derived from a numeric value and a ColorScaleProps colormap. |
