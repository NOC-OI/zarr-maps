# Zarr-maps Visualization Toolkit

[![NPM Version](https://img.shields.io/npm/v/zarr-maps-tiling)](https://www.npmjs.com/package/zarr-maps-tiling)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://noc-oi.github.io/zarr-maps/docs)

**Leaflet and OpenLayers layers for interactive 2D visualization of geospatial data stored in Zarr format.**

- Documentation: [https://noc-oi.github.io/zarr-maps/docs](https://noc-oi.github.io/zarr-maps/docs)
- Demo: [https://noc-oi.github.io/zarr-maps/](https://noc-oi.github.io/zarr-maps/)

<br/>

![Zarr-maps Demo Screenshot](docs/assets/demo-interaction.gif)

> Example of visualizing a Zarr dataset in a Leaflet map using zarr-maps. You can dynamically change time slices, colormaps, and scale ranges.

## Overview

The **Zarr-maps Visualization Toolkit** provides **Leaflet GridLayer-based rendering** and **OpenLayers layer rendering** for n-dimensional datasets stored in the [Zarr](https://zarr.dev) format. It is streamed directly from cloud object stores (HTTP/S3/GCS) without preprocessing, conversion, or a backend server.

It is designed for fast, on-demand raster visualization in Leaflet and OpenLayers using **GPU-accelerated WebGL color-mapping**.

### Features

- **Zarr v2 and v3 compatibility**
  Read datasets from public or private cloud object storage.

- **Icechunk and custom stores**
  Pass any Zarrita-compatible `Readable` store instead of an HTTP URL.

- **Authenticated requests**
  Supply static request options or transform individual requests for tokens, signed URLs, and proxies.

- **Multiscale or single-scale datasets**
  Handles legacy/ndpyramid and GeoZarr multiscale layouts as well as standard arrays.

- **Leaflet-native tiling**
  Uses `L.GridLayer` to request tiles based on current map view.

- **OpenLayers-native tiling**
  Uses `ol/layer/Tile` to request tiles based on current map view.

- **CRS-aware**
  Supports EPSG:4326 (Geographic) and EPSG:3857 (Web Mercator) with automatic detection.

- **On-demand streaming**
  Only the required slices are fetched and decoded dynamically.

- **GPU-accelerated rendering**
  Uses WebGL2 shaders to apply colormaps and masks.

- **Selectors for extra dimensions**
  Slice time/elevation/other dimensions by index or by nearest value.

- **Style controls**
  Update colormap and scale range programmatically (with redraw).

- **Scientific queries**
  Query points, time series, vertical profiles, scalar transects, and full-depth transects.

---

## Installation

```bash
npm install zarr-maps-leaflet zarr-maps-ol
```

Install only the adapter for the map library you use. Each adapter installs the shared tiling and colormap packages automatically.

Colormap utilities are published separately for applications that build custom legends or
color ramps:

```bash
npm install zarr-maps-colormap
```

```ts
import { allColorScales, colormapBuilder, type ColorMapName } from 'zarr-maps-colormap';
import { DEFAULT_COLORMAP, DEFAULT_OPACITY, DEFAULT_SCALE } from 'zarr-maps-tiling';
```

---

## Quick start

### Leaflet Example

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

const zarrLayer = new ZarrLayer({
  url: 'https://example.com/my.zarr',
  variable: 'salinity',
  colormap: 'viridis',
  scale: [30, 40],
  selectors: {
    time: { type: 'index', selected: 0 },
    elevation: { type: 'index', selected: 0 }
  }
});

// Await readiness before adding to map
await zarrLayer.load();
zarrLayer.addTo(map);
```

### OpenLayers Example

```ts
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source/OSM';
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
    zoom: 2
  })
});

const zarrLayer = new ZarrLayer({
  url: 'https://example.com/my.zarr',
  variable: 'temperature',
  colormap: 'plasma',
  scale: [270, 310],
  selectors: {
    time: { type: 'index', selected: 0 }
  }
});

// Await readiness before adding to map
await zarrLayer.load();
map.addLayer(zarrLayer);
```

---

## Architecture

The toolkit provides two key layers components for Leaflet and OpenLayers, backed by a shared data provider that handles Zarr access and WebGL rendering:

| Component                  | Purpose                 | Description                                                                     |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `ZarrLayer` for Leaflet    | Leaflet layer           | A `L.GridLayer` that Leaflet controls (tile lifecycle, zoom, redraw).           |
| `ZarrLayer` for OpenLayers | OpenLayers layer        | An `ol/layer/Tile` that OpenLayers controls (tile lifecycle, zoom, redraw).     |
| `ZarrTileProvider`         | Data + rendering engine | Opens Zarr, loads metadata/dimensions, fetches slices, renders tiles via WebGL. |
| `zarr-maps-colormap`       | Colormap utilities      | Framework-independent colormap names, interpolators, and color-ramp builders.  |

The packages are published independently in dependency order:

```text
zarr-maps-colormap → zarr-maps-tiling → zarr-maps-leaflet
                                      ↳ zarr-maps-ol
```

## Icechunk and custom stores

Use a Zarrita-compatible store when a dataset is not exposed as a normal HTTP Zarr hierarchy:

```ts
import { IcechunkStore } from '@icechunk/zarrita';
import { ZarrLayer } from 'zarr-maps-leaflet';

const store = await IcechunkStore.open(repositoryUrl, {
  branch: 'main',
  formatVersion: 'v1'
});

const layer = new ZarrLayer({ id: 'icechunk', store, variable: 'temperature' });
await layer.load();
```

The Icechunk client remains an application dependency; zarr-maps only requires that `store` implements Zarrita's `Readable` interface.

## Private datasets

Static request configuration can be supplied with `requestOverrides`. Use `transformRequest` when credentials must be refreshed or URLs signed per object:

```ts
const layer = new ZarrLayer({
  id: 'private-temperature',
  url: 'https://data.example.com/temperature.zarr',
  variable: 'temperature',
  transformRequest: async url => ({
    url,
    headers: { Authorization: `Bearer ${await getAccessToken()}` }
  }),
  onAuthError: status => refreshSession(status)
});
```

## Query data

Queries are available from both map adapters and directly from `ZarrTileProvider`:

```ts
const point = await layer.queryData({ type: 'Point', coordinates: [-5.4, 36.1] });
const series = await layer.getTimeSeries([-5.4, 36.1]);
const profile = await layer.getVerticalProfile([-5.4, 36.1]);
const transect = await layer.getTransect([-6, 36], [-4, 37], {}, { samples: 100 });
const fullTransect = await layer.getFullTransect([-6, 36], [-4, 37]);
```

---

## Run the demo locally

```bash
git clone https://github.com/noc-oi/zarr-maps.git
cd zarr-maps/demo
npm install
npm run dev
```

Demo site: `http://localhost:5173/`

To use your own Zarr datasets, modify the demo layer config (example path may vary by branch):

- `demo/src/application/data/layers-json.tsx`

---

## DEVELOPMENT

For more details on how to contribute to the development of this toolkit, please refer to the [DEV-README.md](DEV-README.md) file.

---

## Acknowledgements

This tool is built with:

- [Leaflet](https://leafletjs.com/)
- [OpenLayers](https://openlayers.org/)
- [Zarrita](https://zarrita.dev/)
- [jscolormaps](https://github.com/timothygebhard/js-colormaps)

This work is part of the [Atlantis project](https://atlantis.ac.uk/), a UK initiative supporting long-term ocean observations and marine science in the Atlantic. The project is led by the [National Oceanography Centre (NOC)](https://noc.ac.uk/).
