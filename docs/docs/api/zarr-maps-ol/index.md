# zarr-maps-ol

OpenLayers tile-layer integration for rendering multidimensional Zarr and Icechunk datasets directly in the browser.

```sh
npm install zarr-maps-ol ol
```

```ts
import Map from 'ol/Map';
import { ZarrLayer } from 'zarr-maps-ol';

const layer = new ZarrLayer({
  id: 'temperature',
  url: 'https://example.com/temperature.zarr',
  variable: 'temperature',
  colormap: 'viridis',
  scale: [270, 310]
});

await layer.load();
map.addLayer(layer);
```

The layer supports custom Zarrita stores such as Icechunk, authenticated requests, dimension selectors, runtime styling, and point/profile/transect queries. See the [zarr-maps documentation](https://noc-oi.github.io/zarr-maps/docs/) for complete configuration and API details.

## Classes

| Class | Description |
| ------ | ------ |
| [ZarrLayer](classes/ZarrLayer.md) | OpenLayers Zarr tile layer using the shared ZarrTileProvider. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [OLLayerOptions](interfaces/OLLayerOptions.md) | Configuration for a 2D raster (image) layer visualization in OpenLayers. |
| [ZarrImageElement](interfaces/ZarrImageElement.md) | - |
