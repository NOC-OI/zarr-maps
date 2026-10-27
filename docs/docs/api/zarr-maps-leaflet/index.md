# zarr-maps-leaflet

Leaflet `GridLayer` integration for rendering multidimensional Zarr and Icechunk datasets directly in the browser.

```sh
npm install zarr-maps-leaflet leaflet
```

```ts
import L from 'leaflet';
import { ZarrLayer } from 'zarr-maps-leaflet';

const layer = new ZarrLayer({
  id: 'temperature',
  url: 'https://example.com/temperature.zarr',
  variable: 'temperature',
  colormap: 'viridis',
  scale: [270, 310]
});

await layer.load();
layer.addTo(map);
```

Regular rectilinear grids may use any source CRS understood by proj4. The
source CRS is independent of Leaflet's map CRS:

```ts
const polarLayer = new ZarrLayer({
  id: 'sea-ice-age',
  url: 'https://example.com/sea-ice-age.zarr',
  variable: 'age_of_sea_ice',
  crs: 'EPSG:3408',
  proj4: '+proj=laea +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +a=6371228 +b=6371228 +units=m +no_defs',
  dimensionNames: { lon: 'x', lat: 'y', time: 'time' },
  selectors: { time: { selected: 0, type: 'index' } },
  scale: [0, 5]
});
```

Curvilinear grids with two-dimensional latitude or longitude coordinate arrays
are not currently supported.

The layer supports custom Zarrita stores such as Icechunk, authenticated requests, dimension selectors, runtime styling, and point/profile/transect queries. See the [zarr-maps documentation](https://noc-oi.github.io/zarr-maps/docs/) for complete configuration and API details.

## Classes

| Class | Description |
| ------ | ------ |
| [ZarrLayer](classes/ZarrLayer.md) | Leaflet Zarr tile layer using the shared ZarrTileProvider. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [LeafletLayerOptions](interfaces/LeafletLayerOptions.md) | Configuration for a 2D raster (image) layer visualization in Leaflet. The inherited `crs` and `proj4` options describe the rectilinear Zarr source grid; Leaflet continues to request tiles using geographic map bounds. |
