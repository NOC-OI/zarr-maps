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

Caching defaults to `true`. Set `cache: false` (or `cache: { enabled: false }`) to disable it.
The budget is per layer, so five layers configured
with 16 MiB can retain at most 80 MiB of decoded tile data in total.

From the `zarr-maps` repository root, build all packages with:

```sh
npm run build
```
