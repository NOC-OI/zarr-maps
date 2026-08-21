# zarr-maps-colormap

Shared Matplotlib-inspired colormaps and color-ramp utilities for the Zarr Maps packages.

```ts
import {
  allColorScales,
  colormapBuilder,
  type ColorMapName
} from 'zarr-maps-colormap';
```

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ColorMapInfo](interfaces/ColorMapInfo.md) | Structure of the global color map registry. |
| [ColorScaleProps](interfaces/ColorScaleProps.md) | Numerical range and colors used to render a scalar field. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ColorMapName](type-aliases/ColorMapName.md) | Name of a bundled Matplotlib-inspired colormap. |

## Functions

| Function | Description |
| ------ | ------ |
| [colormapBuilder](functions/colormapBuilder.md) | Builds a color ramp (discrete or continuous) from a specified colormap. |
| [colorScaleByName](functions/colorScaleByName.md) | Returns a color scale function for a given colormap name. |
