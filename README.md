# Zarr-Leaflet Visualization Toolkit

[![NPM Version](https://img.shields.io/npm/v/zarr-leaflet)](https://www.npmjs.com/package/zarr-leaflet)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-online-blue)](https://noc-oi.github.io/zarr-leaflet/docs)

**Leaflet layers for interactive 2D visualization of environmental geospatial data stored in Zarr.**

- Documentation: [https://noc-oi.github.io/zarr-leaflet/docs](https://noc-oi.github.io/zarr-leaflet/docs)
- Demo: [https://noc-oi.github.io/zarr-leaflet/](https://noc-oi.github.io/zarr-leaflet/)

---

## Overview

The **zarr-leaflet Visualization Toolkit** provides **Leaflet GridLayer-based rendering** for n-dimensional datasets stored in the [Zarr](https://zarr.dev) format — streamed directly from cloud object stores (HTTP/S3/GCS) without preprocessing, conversion, or a backend server.

It is designed for fast, on-demand raster visualization in Leaflet using **GPU-accelerated WebGL color-mapping**.

---

## Features

- **Zarr v2 and v3 compatibility**
  Read datasets from any Zarr store, including public cloud object storage.

- **Multiscale or single-scale datasets**
  Automatically handles multi-resolution datasets (e.g., ndpyramid-style multiscales) or standard Zarr arrays.

- **Leaflet-native tiling**
  Uses `L.GridLayer` to request tiles based on current map view.

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

---

## Installation

```bash
npm install zarr-leaflet
```

---

## Quick start (Leaflet)

```ts
import L from 'leaflet';
import { ZarrLayer } from 'zarr-leaflet';

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

---

## Architecture

The toolkit provides two key Leaflet-facing components:

| Component           | Purpose                 | Description                                                                     |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------- |
| `ZarrLayer`         | Leaflet layer           | A `L.GridLayer` that Leaflet controls (tile lifecycle, zoom, redraw).           |
| `ZarrLayerProvider` | Data + rendering engine | Opens Zarr, loads metadata/dimensions, fetches slices, renders tiles via WebGL. |

---

## Run the demo locally

```bash
git clone https://github.com/noc-oi/zarr-leaflet.git
cd zarr-leaflet/demo
npm install
npm run dev
```

Demo site: `http://localhost:5173/`

To use your own Zarr datasets, modify the demo layer config (example path may vary by branch):

- `demo/src/application/data/layers-json.tsx`

---

## DEVELOPMENT

For more details on how to contribute to the development of this toolkit, please refer to the [DEV-README.md](DEV-README.md) file.

## Acknowledgements

This tool is built with:

- [Leaflet](https://leafletjs.com/)
- [Zarrita](https://zarrita.dev/)
- [jscolormaps](https://github.com/timothygebhard/js-colormaps)

This work is part of the [Atlantis project](https://atlantis.ac.uk/), a UK initiative supporting long-term ocean observations and marine science in the Atlantic. The project is led by the [National Oceanography Centre (NOC)](https://noc.ac.uk/).
