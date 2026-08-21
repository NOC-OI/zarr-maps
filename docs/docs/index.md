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

## Package overview

| Package | Purpose |
| --- | --- |
| **zarr-maps-colormap** | Shared colormap names and color-ramp utilities. |
| **zarr-maps-tiling** | Framework-independent Zarr access, querying, and WebGL tile rendering. |
| **zarr-maps-leaflet** | Leaflet `GridLayer` adapter. |
| **zarr-maps-ol** | OpenLayers tile-layer adapter. |

---

## Architecture Diagram (High-level)

```

Zarr or Icechunk Store (public or authenticated)
↓
Zarrita-compatible store
↓
zarr-maps-tiling
↓
Leaflet / OpenLayers
↓
2D Interactive Visualization

```

---

## Acknowledgements

This tool is built with:

- [Leaflet](https://leafletjs.com/)
- [OpenLayers](https://openlayers.org/)
- [Zarrita](https://zarrita.dev/)
- [jscolormaps](https://github.com/timothygebhard/js-colormaps)

This work is part of the [Atlantis project](https://atlantis.ac.uk/), a UK initiative supporting long-term ocean observations and marine science in the Atlantic. The project is led by the [National Oceanography Centre (NOC)](https://noc.ac.uk/).
