# zarr-maps-tiling

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

From the `zarr-maps` repository root, build all packages with:

```sh
npm run build
```

## Classes

| Class | Description |
| ------ | ------ |
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
| [CRS](type-aliases/CRS.md) | Supported Coordinate Reference Systems. |
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
| [calculateXYFromBounds](functions/calculateXYFromBounds.md) | Converts geographic bounds (lat/lon) to pixel-space indices for slicing Zarr arrays. Supports both EPSG:4326 and EPSG:3857 projections. |
| [createColorRampTexture](functions/createColorRampTexture.md) | Creates a flexible 1D color-ramp texture supporting either normalized (0–1) or integer (0–255) color definitions. |
| [createProgram](functions/createProgram.md) | Creates and links a WebGL program using the specified vertex and fragment shaders. |
| [createShader](functions/createShader.md) | Creates and compiles a WebGL shader from source code. |
| [decodeCFTime](functions/decodeCFTime.md) | Decodes CF-compliant time coordinate values into ISO date strings. |
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
| [loadDimensionValues](functions/loadDimensionValues.md) | Loads the coordinate values for a specific dimension. |
| [lonDegToMercX](functions/lonDegToMercX.md) | - |
| [openLevelArray](functions/openLevelArray.md) | Opens and caches a specific multiscale level array. Keeps a small LRU-style cache of up to three levels. |
| [parseCFUnits](functions/parseCFUnits.md) | Parses a CF-compliant units string into its components. |
| [resolveNoDataRange](functions/resolveNoDataRange.md) | Resolves the no-data value range for masking dataset values. |
| [sampleTransectPositions](functions/sampleTransectPositions.md) | Builds evenly spaced WGS84 samples along the shortest longitude path. |
| [updateImgData](functions/updateImgData.md) | Updates an [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object with a new pixel color derived from a numeric value and a ColorScaleProps colormap. |
