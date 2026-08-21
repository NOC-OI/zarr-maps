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
