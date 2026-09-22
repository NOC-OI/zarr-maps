# Zarr-maps Visualization Toolkit

[![NPM Version](https://img.shields.io/npm/v/zarr-maps-tiling)](https://www.npmjs.com/package/zarr-maps-tiling)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://noc-oi.github.io/zarr-maps/docs)

**Leaflet and OpenLayers layers for interactive 2D visualization of geospatial data stored in Zarr format.**

- Documentation: [https://noc-oi.github.io/zarr-maps/docs](https://noc-oi.github.io/zarr-maps/docs)
- Demo: [https://noc-oi.github.io/zarr-maps/](https://noc-oi.github.io/zarr-maps/)

<br/>

![Zarr-maps Demo Screenshot](docs/assets/demo-interaction.gif)

> Example of visualizing a Zarr dataset in Leaflet and OpenLayers maps using zarr-maps. You can dynamically change time slices, colormaps, and scale ranges.

## Package organisation

Zarr-maps is a monorepo of small, independently published packages. The primary public APIs are
the Leaflet and OpenLayers adapters; both are deliberately thin integrations over the same
framework-independent tiling engine.

| Package | Role |
| --- | --- |
| [`zarr-maps-leaflet`](packages/zarr-maps-leaflet) | Leaflet `L.GridLayer` adapter and the recommended entry point for Leaflet applications. |
| [`zarr-maps-ol`](packages/zarr-maps-ol) | OpenLayers tile-layer adapter and the recommended entry point for OpenLayers applications. |
| [`zarr-maps-tiling`](packages/zarr-maps-tiling) | Shared Zarr data-access, querying, tile-selection, caching, and WebGL rendering engine. |
| [`zarr-maps-colormap`](packages/zarr-maps-colormap) | Framework-independent colormap definitions and color-ramp utilities. Based on [jscolormaps](https://github.com/timothygebhard/js-colormaps). |

### The shared tiling engine

`zarr-maps-tiling` contains the map-independent core of the toolkit. Its
`ZarrTileProvider` opens Zarr v2/v3 or Zarrita-compatible stores, discovers dimensions and
multiscale levels, selects the appropriate data for a geographic tile, and renders that tile with
WebGL. It also provides the point, time-series, vertical-profile, and transect query APIs.

The Leaflet and OpenLayers packages translate each library's tile lifecycle into calls to this
provider. This keeps data interpretation and rendering consistent between both map libraries and
also makes the provider usable directly when developing another integration.

```text
zarr-maps-colormap ──→ zarr-maps-tiling ──┬──→ zarr-maps-leaflet
                                          └──→ zarr-maps-ol
```

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

The published supporting packages can also be installed directly. Use the tiling package when
building a custom map integration and the colormap package for custom legends or color ramps:

```bash
npm install zarr-maps-tiling zarr-maps-colormap
```

```ts
import { allColorScales, colormapBuilder, type ColorMapName } from 'zarr-maps-colormap';
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

The two map adapters expose similar `ZarrLayer` APIs backed by `ZarrTileProvider`:

| Component                  | Purpose                 | Description                                                                     |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `ZarrLayer` for Leaflet    | Leaflet layer           | A `L.GridLayer` that Leaflet controls (tile lifecycle, zoom, redraw).           |
| `ZarrLayer` for OpenLayers | OpenLayers layer        | An `ol/layer/Tile` that OpenLayers controls (tile lifecycle, zoom, redraw).     |
| `ZarrTileProvider`         | Data + rendering engine | Opens Zarr, loads metadata/dimensions, fetches slices, renders tiles via WebGL. |

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
