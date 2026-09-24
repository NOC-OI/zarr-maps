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

To investigate device-specific WebGL masking, set `webglDiagnostics: true` on the provider.
The browser console will report the GPU renderer, shader precision, texture-upload errors,
and a one-time count of NaN, infinite, fill, and out-of-range samples. It also reports the
Zarr-native `fillValue` separately because Zarr fill values are not always missing-data markers.
Disable the option after diagnosis to avoid scanning the first rendered tile.

Caching defaults to `true`. Set `cache: false` (or `cache: { enabled: false }`) to disable it.
The budget is per layer, so five layers configured
with 16 MiB can retain at most 80 MiB of decoded tile data in total.

From the `zarr-maps` repository root, build all packages with:

```sh
npm run build
```
