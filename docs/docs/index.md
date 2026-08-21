---
id: index
title: Introduction
sidebar_position: 0
slug: /
---

# Zarr-maps

**Leaflet and OpenLayers layers for interactive 2D visualization of geospatial data stored in Zarr format.**

- **Demo:** https://noc-oi.github.io/zarr-maps/
- **GitHub:** https://github.com/NOC-OI/zarr-maps

Zarr-maps enables **direct, client-side visualization of scientific datasets** stored in the [Zarr](https://zarr.dev) format. No preprocessing. No tile servers. No backend.

It provides **Leaflet and OpenLayers layers** that stream and render multidimensional geospatial datasets directly from HTTP/S3/GCS object storage.

![Zarr-maps Demo Screenshot](../assets/demo-interaction.gif)

> Example of visualizing a Zarr dataset in a Leaflet map using zarr-maps. You can dynamically change time slices, colormaps, and scale ranges.

---

## Features

- **Zarr v2 and v3 support**
- **Single-scale and multiscale datasets** using legacy/ndpyramid or GeoZarr layouts
- **Icechunk and custom Zarrita-compatible stores**
- **Private datasets** using headers, credentials, signed URLs, or request transforms
- **Automatic resolution selection** for multiscale datasets
- **CRS-aware** (EPSG:4326 & EPSG:3857)
- **WebGL-accelerated rendering**
- **Dynamic styling** (colormap, opacity, scaling, slices, animation)
- **Point, time-series, vertical-profile, and transect queries**

---

## Packages

Zarr-maps is a collection of four packages. Most applications install one of the map-library adapters; npm installs the shared tiling and colormap packages with it.

### `zarr-maps-tiling`

The framework-independent core of Zarr-maps. It opens Zarr v2 and v3 datasets through [Zarrita](https://zarrita.dev/), selects multidimensional slices, chooses an appropriate resolution from multiscale datasets, and renders map tiles with WebGL. It also provides point, time-series, vertical-profile, and transect queries through `ZarrTileProvider`.

Use this package directly when building an integration for another mapping framework or when you need Zarr querying and tile rendering without Leaflet or OpenLayers. See the [`zarr-maps-tiling` API](api/zarr-maps-tiling/index.md).

### `zarr-maps-colormap`

Shared Matplotlib-inspired colormap definitions and color-ramp utilities. The map adapters use it to turn numeric Zarr values into colors, and applications can use it independently to build legends, previews, or custom styling controls. See the [`zarr-maps-colormap` API](api/zarr-maps-colormap/index.md).

### `zarr-maps-leaflet`

A Leaflet `GridLayer` adapter backed by `ZarrTileProvider`. Leaflet manages the tile lifecycle and map interaction while the shared tiling package loads and renders the Zarr data. The layer exposes runtime styling, dimension selection, and query methods.

[Get started with Leaflet](getting-started-leaflet.md) or browse the [`zarr-maps-leaflet` API](api/zarr-maps-leaflet/index.md).

### `zarr-maps-ol`

An OpenLayers tile-layer adapter backed by `ZarrTileProvider`. It provides the same Zarr loading, styling, dimension-selection, and query capabilities through an OpenLayers-native layer.

[Get started with OpenLayers](getting-started-openlayers.md) or browse the [`zarr-maps-ol` API](api/zarr-maps-ol/index.md).

---

## How the packages fit together

```text
Zarr or Icechunk store
          |
          v
 zarr-maps-tiling <--- zarr-maps-colormap
       /     \
      v       v
  Leaflet  OpenLayers
```

Both adapters accept either a Zarr URL or a custom Zarrita-compatible store. They share the same rendering, authentication, multiscale, selector, no-data, CRS, styling, and query behavior.

---

## Acknowledgements

This tool is built with:

- [Leaflet](https://leafletjs.com/)
- [OpenLayers](https://openlayers.org/)
- [Zarrita](https://zarrita.dev/)
- [jscolormaps](https://github.com/timothygebhard/js-colormaps)

This work is part of the [Atlantis project](https://atlantis.ac.uk/), a UK initiative supporting long-term ocean observations and marine science in the Atlantic. The project is led by the [National Oceanography Centre (NOC)](https://noc.ac.uk/).
