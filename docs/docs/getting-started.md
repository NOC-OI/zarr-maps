---
sidebar_position: 2
title: Getting Started
---

# Getting Started

## Installation

```bash
npm install zarr-maps-leaflet zarr-maps-ol
# or
yarn add zarr-maps-leaflet zarr-maps-ol
```

---

## Basic Example

### 1. Leaflet

```ts
import L from 'leaflet';
import { ZarrLayer } from 'zarr-maps-leaflet';

const map = L.map('map', {
  center: [36.1, -5.4],
  zoom: 6
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const options = {
  url: 'https://example.com/data.zarr',
  variable: 'salinity',
  colormap: 'viridis',
  scale: [30, 40]
};
const zarrLayer = new ZarrLayer(options);

// Load Zarr metadata before adding to map
await zarrLayer.load();
zarrLayer.addTo(map);
```

This:

1. Creates the Leaflet map
2. Creates the ZarrLayer with options
3. Loads Zarr metadata
4. Detects CRS
5. Loads dimension values (time/depth/etc.)
6. Starts rendering tiles on demand as Leaflet requests them

<div style={{ maxWidth: "800px", margin: "0 auto" }}>
  <video
    src="https://github.com/user-attachments/assets/33fc6dd2-38fa-4b20-a346-0a175f90eba1"
    loop
    controls
    muted
    style={{ width: "100%", borderRadius: "8px" }}
  />
</div>

> Example of visualizing a Zarr dataset in a Leaflet map using zarr-maps.
> You can dynamically change time slices, colormaps, and scale ranges.

### 2. OpenLayers

```ts
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { ZarrLayer } from 'zarr-maps-ol';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
    projection: 'EPSG:3857'
  })
});

const options = {
  url: 'https://example.com/data.zarr',
  variable: 'salinity',
  colormap: 'viridis',
  scale: [30, 40]
};
const zarrLayer = new ZarrLayer(options);

// Load Zarr metadata before adding to map
await zarrLayer.load();
map.addLayer(zarrLayer);
```

This:

1. Creates the OpenLayers map
2. Creates the ZarrLayer with options
3. Loads Zarr metadata
4. Detects CRS
5. Loads dimension values (time/depth/etc.)
6. Starts rendering tiles on demand as OpenLayers requests them

<div style={{ maxWidth: "800px", margin: "0 auto" }}>
  <video
    src="https://github.com/user-attachments/assets/33fc6dd2-38fa-4b20-a346-0a175f90eba1"
    loop
    controls
    muted
    style={{ width: "100%", borderRadius: "8px" }}
  />
</div>

> Example of visualizing a Zarr dataset in a OpenLayers map using zarr-maps.
> You can dynamically change time slices, colormaps, and scale ranges.

---

## Icechunk and custom stores

Instead of `url`, pass any store implementing Zarrita's `Readable` interface. For example, using the Icechunk Zarrita client:

```ts
import { IcechunkStore } from '@icechunk/zarrita';
import { ZarrLayer } from 'zarr-maps-leaflet';

const store = await IcechunkStore.open(repositoryUrl, {
  branch: 'main',
  formatVersion: 'v1'
});

const layer = new ZarrLayer({
  id: 'icechunk-temperature',
  store,
  variable: 'temperature'
});

await layer.load();
layer.addTo(map);
```

Install and configure the Icechunk client in your application. It is intentionally not bundled with zarr-maps.

## Private datasets

Use `requestOverrides` for static fetch settings or `transformRequest` when authentication must be calculated for each Zarr object:

```ts
const layer = new ZarrLayer({
  id: 'private-temperature',
  url: 'https://data.example.com/temperature.zarr',
  variable: 'temperature',
  transformRequest: async url => ({
    url,
    credentials: 'include',
    headers: { Authorization: `Bearer ${await getAccessToken()}` }
  }),
  onAuthError: status => refreshSession(status)
});
```

`onAuthError` is called once when a transformed request returns HTTP 400 or 401, allowing the application to start its credential-refresh flow.

## Querying data

Leaflet and OpenLayers layers expose the same query methods as their `ZarrTileProvider`:

```ts
const position: [number, number] = [-5.4, 36.1];

const point = await zarrLayer.queryData({ type: 'Point', coordinates: position });
const timeSeries = await zarrLayer.getTimeSeries(position);
const profile = await zarrLayer.getVerticalProfile(position);
const transect = await zarrLayer.getTransect([-6, 36], [-4, 37], {}, { samples: 100 });
const fullTransect = await zarrLayer.getFullTransect([-6, 36], [-4, 37]);
```

Query selectors do not change the slice displayed by the map. Pass an `AbortSignal` in the query options when the operation should be cancellable.

---

## Options

Both adapters accept either `url` or a custom Zarrita-compatible `store`. They also share request authentication, multiscale format, selector, no-data, CRS, and styling options through `ZarrTileOptions`.

### 1. Leaflet

```ts
export interface LeafletLayerOptions {
  id: string; // Unique layer ID
  url?: string; // Zarr URL; required unless store is supplied
  store?: Readable; // Custom store, including IcechunkStore
  variable: string; // Zarr array name
  scale?: [number, number]; // Min/max for color scaling
  colormap?: ColorMapName; // Name from jsColormaps, based on matplotlib colormaps
  opacity?: number; // Imagery opacity (0–1)
  tileSize?: number; // Leaflet tile size (default 256)
  maxZoom?: number; // Max zoom level
  dimensionNames?: DimensionNamesProps; // Custom dimension names. If not provided, defaults will be used or identified automatically based on CF conventions.
  selectors?: ZarrSelectors; // Initial dimension slices
  zarrVersion?: 2 | 3; // Zarr version (auto-detected if not set)
  crs?: 'EPSG:4326' | 'EPSG:3857'; // Force CRS (auto-detected if not set)
  noDataMin?: number; // Custom no-data minimum value. Overrides _FillValue/missing_value.
  noDataMax?: number; // Custom no-data maximum value. Overrides _FillValue/missing_value.
  requestOverrides?: RequestOverrides; // Static fetch headers and options
  transformRequest?: TransformRequest; // Per-request auth, proxy, or signed URL transform
  onAuthError?: OnAuthError; // Called once for HTTP 400/401 responses
  multiscaleFormat?: 'auto' | 'legacy' | 'geozarr';
}
```

### 2. OpenLayers

```ts
export interface OLLayerOptions {
  id: string; // Unique layer ID
  url?: string; // Zarr URL; required unless store is supplied
  store?: Readable; // Custom store, including IcechunkStore
  variable: string; // Zarr array name
  scale?: [number, number]; // Min/max for color scaling
  colormap?: ColorMapName; // Name from jsColormaps, based on matplotlib colormaps
  opacity?: number; // Imagery opacity (0–1)
  tileSize?: number; // Leaflet tile size (default 256)
  maxZoom?: number; // Max zoom level
  dimensionNames?: DimensionNamesProps; // Custom dimension names. If not provided, defaults will be used or identified automatically based on CF conventions.
  selectors?: ZarrSelectors; // Initial dimension slices
  zarrVersion?: 2 | 3; // Zarr version (auto-detected if not set)
  crs?: 'EPSG:4326' | 'EPSG:3857'; // Force CRS (auto-detected if not set)
  noDataMin?: number; // Custom no-data minimum value. Overrides _FillValue/missing_value.
  noDataMax?: number; // Custom no-data maximum value. Overrides _FillValue/missing_value.
  requestOverrides?: RequestOverrides; // Static fetch headers and options
  transformRequest?: TransformRequest; // Per-request auth, proxy, or signed URL transform
  onAuthError?: OnAuthError; // Called once for HTTP 400/401 responses
  multiscaleFormat?: 'auto' | 'legacy' | 'geozarr';
}
```

---

## Dimension Selectors

If your Zarr dataset has dimensions like: `time`, `level` related (e.g. `depth`, `elevation`), and others, you can slice them using the `selectors` option.

You can set an initial slice using:

```ts
// LayerOptions
selectors: {
  time: { type: 'index', selected: 0 },
  elevation: { type: 'index', selected: 10 }
}
```

Or slice by **value** instead of index:

```ts
// LayerOptions
selectors: {
  time: { type: 'value', selected: '2020-01-01T00:00Z' },
  elevation: { type: 'value', selected: 50 } // meters
}
```

The provider automatically converts value→index using nearest-neighbor lookup. The default behavior (if no selectors are provided) is to select the first index (`0`) for each dimension.

---

## Supported CRS

Zarr datasets may store coordinate values in:

- `EPSG:4326` (lat, lon degrees)
- `EPSG:3857` (Web Mercator meters)

The provider detects the CRS automatically using:

- Zarr metadata
- consolidated metadata
- coordinate ranges (West/East > 360 → Web Mercator)

For example, you can set the CRS explicitly:

```ts
// set CRS to Web Mercator in LayerOptions
crs: 'EPSG:3857';
```

---

## Multiscale Support

If the dataset contains Zarr multiscale metadata (generated by [ndpyramid](https://github.com/carbonplan/ndpyramid)):

```json
"multiscales": [
  {
    "datasets": [
      {"path": "0"}, {"path": "1"}, {"path": "2"}
    ]
  }
]
```

The provider automatically:

- chooses the best level based on Leaflet zoom
- caches levels (LRU = 3)
- correctly slices each level
- uses metadata-supported shapes for accurate scaling

No extra configuration is required.

---

## No-data Handling

Automatically applies:

- `_FillValue`
- `missing_value`
- `valid_min` / `valid_max`
- or custom range

Example of custom range:

```ts
// LayerOptions
noDataMin: -9999, // defaults is to Zarr attributes and then -9999
noDataMax: 9999 // defaults is to Zarr attributes and then 9999
```

---

## Runtime API

When added to Leaflet, the layer behaves like a normal `L.Layer`, **plus extra Zarr-specific features**.

```ts
const zarrLayer = new ZarrLayer(options);
map.addLayer(zarrLayer);
```

### Update Style (colormap, scale and opacity)

- colormap

```ts
zarrLayer.updateStyle({ colormap: 'plasma' });
```

The full list of supported colormaps is available in the [Colormaps API](api/zarr-maps-colormap/type-aliases/ColorMapName.md).

- scale range

```ts
zarrLayer.updateStyle({ scale: [20, 35] });
```

- opacity

```ts
zarrLayer.updateStyle({ opacity: 0.5 });
```

After updating style, the layer performs a **soft refresh** so Leaflet re-renders the tiles in the viewport with the new style.

### Update dimension slicing

```ts
zarrLayer.updateSelectors({
  time: { type: 'index', selected: 5 }
});
```

You can get the list of current dimension and current selectors values using:

```ts
const dimValues = zarrLayer.provider.dimensionValues;
const selectors = zarrLayer.provider.selectors;
```

This returns a mapping of dimension names to their list of values, e.g.:

```ts
dimNames = {
  time: ['2020-01-01T00:00Z', '2020-01-02T00:00Z', ...],
  elevation: [0, 10, 20, 30, ...]
}
```

And the current selectors:

```ts
selectors = {
  time: { type: 'index', selected: 5 },
  elevation: { type: 'index', selected: 2 }
};
```

And with that, you can build UI controls (sliders, dropdowns) to update the layer dynamically.

### Remove Layer

To remove the layer and free resources:

```ts
map.removeLayer(layer);
```
