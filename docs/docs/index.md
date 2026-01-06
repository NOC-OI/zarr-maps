---
id: index
title: Introduction
sidebar_position: 0
slug: /
---

# Zarr-leaflet

**Leaflet providers for interactive 2D and 3D visualization of environmental and atmospheric data stored in Zarr.**

- **Demo:** https://noc-oi.github.io/zarr-maps/
- **GitHub:** https://github.com/NOC-OI/zarr-maps

Zarr-leaflet enables **direct, client-side visualization of scientific datasets** stored in the [Zarr](https://zarr.dev) format. No preprocessing. No tile servers. No backend.

It provides a set of **Leaflet data providers** that stream and render multidimensional geospatial datasets directly from HTTP/S3/GCS object storage.

## Screenshots

<div style={{ maxWidth: "800px", margin: "0 auto" }}>
  <video
    src="https://github.com/NOC-OI/zarr-maps/releases/download/0.1.0/cube_velocitycube.mp4"
    loop
    controls
    muted
    style={{ width: "100%", borderRadius: "8px" }}
  />
</div>
<div style={{ maxWidth: "800px", margin: "0 auto" }}>
  <video
    src="https://github.com/NOC-OI/zarr-maps/releases/download/0.1.0/layer_provider.mp4"
    loop
    controls
    muted
    style={{ width: "100%", borderRadius: "8px" }}
  />
</div>
<div style={{ maxWidth: "800px", margin: "0 auto" }}>
  <video
    src="https://github.com/NOC-OI/zarr-maps/releases/download/0.1.0/cube_globe.mp4"
    loop
    controls
    muted
    style={{ width: "100%", borderRadius: "8px" }}
  />
</div>

---

## Features

- **Zarr v2 and v3 support**
- **Single-scale and multiscale datasets** (following the format generated using [ndpyramid](https://github.com/carbonplan/ndpyramid))
- **Automatic resolution selection** for multiscale datasets
- **CRS-aware** (EPSG:4326 & EPSG:3857)
- **WebGL-accelerated rendering**
- **Dynamic styling** (colormap, opacity, scaling, slices, animation)

---

## Provider Overview

| Provider                     | Purpose             | Description                                                |
| ---------------------------- | ------------------- | ---------------------------------------------------------- |
| **ZarrLayerProvider**        | 2D scalar fields    | Renders imagery layers from single/multiscale Zarr arrays. |
| **ZarrCubeProvider**         | 3D volumetric cubes | Renders 3D slices (horizontal & vertical).                 |
| **ZarrCubeVelocityProvider** | 3D vector fields    | Animated particle advection from U/V components.           |

---

## Architecture Diagram (High-level)

```

Zarr Store (HTTP / S3 / GCS)
↓
zarrita.js (Zarr client)
↓
zarr-maps Providers
↓
Leaflet (WebGL)
↓
2D/3D Interactive Visualization

```

---

## Acknowledgements

Built with:

- [Leaflet](https://leafletjs.com/)
- [zarrita.js](https://zarrita.dev/)
- [ndpyramid](https://github.com/carbonplan/ndpyramid)

**Developed at the `National Oceanography Centre (NOC)` as part of the `Atlantis` project.**
