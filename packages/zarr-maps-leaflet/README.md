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

The layer supports custom Zarrita stores such as Icechunk, authenticated requests, dimension selectors, runtime styling, and point/profile/transect queries. See the [zarr-maps documentation](https://noc-oi.github.io/zarr-maps/docs/) for complete configuration and API details.
