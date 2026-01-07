# index

## Classes

| Class | Description |
| ------ | ------ |
| [ZarrLayerProvider](classes/ZarrLayerProvider.md) | Provides Zarr dataset access and rendering capabilities for map layers. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [BoundsProps](interfaces/BoundsProps.md) | Geographic bounding box definition (degrees). |
| [ColorMapInfo](interfaces/ColorMapInfo.md) | Structure of the global color map registry. |
| [ColorScaleProps](interfaces/ColorScaleProps.md) | Describes a numerical-to-color mapping for visualizing scalar fields. |
| [DataSliceProps](interfaces/DataSliceProps.md) | Describes a slice of a multidimensional array. |
| [DimensionNamesProps](interfaces/DimensionNamesProps.md) | Describes the mapping between dataset dimensions and their standardized names. |
| [DimensionValues](interfaces/DimensionValues.md) | Mapping of dimension names to their corresponding coordinate arrays. |
| [DimIndicesProps](interfaces/DimIndicesProps.md) | Maps dimension keys to their indices and associated coordinate arrays. |
| [XYLimits](interfaces/XYLimits.md) | Describes the XY coordinate boundaries of a dataset. |
| [XYLimitsProps](interfaces/XYLimitsProps.md) | Alias of [XYLimits](interfaces/XYLimits.md) with explicit type name for Zarr coordinate bounds. |
| [ZarrLevelMetadata](interfaces/ZarrLevelMetadata.md) | Metadata for a single multiscale level in a Zarr dataset. |
| [ZarrSelectors](interfaces/ZarrSelectors.md) | Describes a selector for a Zarr dataset dimension. |
| [ZarrSelectorsProps](interfaces/ZarrSelectorsProps.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [calculateNearestIndex](functions/calculateNearestIndex.md) | Finds the index of the value in `values` nearest to `target`. |
| [calculateSliceArgs](functions/calculateSliceArgs.md) | Constructs Zarr slice arguments for extracting a subregion of a multidimensional array. |
| [colormapBuilder](functions/colormapBuilder.md) | Builds a color ramp (discrete or continuous) from a specified colormap. |
| [colorScaleByName](functions/colorScaleByName.md) | Returns a color scale function for a given colormap name. |
| [createColorRampTexture](functions/createColorRampTexture.md) | Creates a flexible 1D color-ramp texture supporting either normalized (0–1) or integer (0–255) color definitions. |
| [createProgram](functions/createProgram.md) | Creates and links a WebGL program using the specified vertex and fragment shaders. |
| [createShader](functions/createShader.md) | Creates and compiles a WebGL shader from source code. |
| [decodeCFTime](functions/decodeCFTime.md) | Decodes CF-compliant time coordinate values into ISO date strings. |
| [detectCRS](functions/detectCRS.md) | Detects the coordinate reference system (CRS) of a Zarr dataset based on metadata or coordinate range. Defaults to EPSG:4326 (WGS84) if uncertain. |
| [extractNoDataMetadata](functions/extractNoDataMetadata.md) | Extracts no-data related metadata from a Zarr array's attributes. |
| [getXYLimits](functions/getXYLimits.md) | Retrieve the geographic coordinate limits (min/max latitude/longitude) for a Zarr array. |
| [identifyDimensionIndices](functions/identifyDimensionIndices.md) | Identify the indices of common dimensions (lat, lon, time, elevation) in a Zarr array, optionally using CF-compliant standard names or custom dimension mappings. |
| [initZarrDataset](functions/initZarrDataset.md) | Opens a Zarr variable (single-scale or multiscale pyramid) and prepares its metadata. |
| [latDegToMercY](functions/latDegToMercY.md) | - |
| [loadDimensionValues](functions/loadDimensionValues.md) | Loads the coordinate values for a specific dimension. |
| [lonDegToMercX](functions/lonDegToMercX.md) | - |
| [openLevelArray](functions/openLevelArray.md) | Opens and caches a specific multiscale level array. Keeps a small LRU-style cache of up to three levels. |
| [parseCFUnits](functions/parseCFUnits.md) | Parses a CF-compliant units string into its components. |
| [resolveNoDataRange](functions/resolveNoDataRange.md) | Resolves the no-data value range for masking dataset values. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [CalendarDate](type-aliases/CalendarDate.md) | Represents a date in a calendar system. |
| [CFCalendar](type-aliases/CFCalendar.md) | Supported CF calendar types. |
| [ColorMapName](type-aliases/ColorMapName.md) | Type representing valid color map names. The values are derived from the `allColorScales` array imported from the `jsColormaps` module and are based on matplotlib colormap (https://matplotlib.org/stable/users/explain/colors/colormaps.html). |
| [CRS](type-aliases/CRS.md) | Supported Coordinate Reference Systems. |
| [SliceArgs](type-aliases/SliceArgs.md) | Represents a multidimensional slice argument for Zarr array indexing. |
