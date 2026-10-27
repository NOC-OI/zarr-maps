---
sidebar_position: 1
title: Leaflet
---

# Get started with Leaflet

Use `zarr-maps-leaflet` to display a multidimensional Zarr dataset as a Leaflet `GridLayer`.

## Installation

```bash
npm install zarr-maps-leaflet leaflet
```

## Create a layer

Your page needs a map container with a defined height. After creating the Leaflet map, construct the Zarr layer, wait for its metadata to load, and add it to the map.

```ts
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZarrLayer } from 'zarr-maps-leaflet';

const map = L.map('map', {
  center: [36.1, -5.4],
  zoom: 6
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const layer = new ZarrLayer({
  id: 'salinity',
  url: 'https://example.com/data.zarr',
  variable: 'salinity',
  colormap: 'viridis',
  scale: [30, 40]
});

await layer.load();
layer.addTo(map);
```

Calling `load()` opens the dataset, reads its metadata and dimensions, detects its coordinate reference system, and prepares it for tile requests. Leaflet then requests visible tiles as the map moves or zooms.

## Projected source grids

`crs` describes the Zarr source grid, not the Leaflet map. Regular rectilinear
grids can use any CRS understood by proj4. EPSG:4326 and EPSG:3857 work without
additional definitions. Provide `proj4` for an identifier that proj4 does not
already know:

```ts
const polarLayer = new ZarrLayer({
  id: 'sea-ice-age',
  url: 'https://example.com/sea-ice-age.zarr',
  variable: 'age_of_sea_ice',
  crs: 'EPSG:3408',
  proj4: '+proj=laea +lat_0=90 +lon_0=0 +x_0=0 +y_0=0 +a=6371228 +b=6371228 +units=m +no_defs',
  dimensionNames: { lon: 'x', lat: 'y', time: 'time' },
  selectors: { time: { selected: 0, type: 'index' } }
});
```

The definition may alternatively be published as proj4, WKT2, PROJJSON,
`spatial_ref`, or `crs_wkt` metadata. Spatial X and Y coordinates must be
separate one-dimensional monotonic axes. Two-dimensional curvilinear grids are
not currently supported.

## Select a multidimensional slice

Use `selectors` to choose values for non-spatial dimensions such as time or elevation. A selector may refer to an array index or to the nearest coordinate value.

```ts
const layer = new ZarrLayer({
  id: 'temperature',
  url: 'https://example.com/temperature.zarr',
  variable: 'temperature',
  selectors: {
    time: { type: 'index', selected: 0 },
    elevation: { type: 'value', selected: 50 }
  }
});
```

Update the visible slice or styling after the layer has loaded:

```ts
layer.updateSelectors({
  time: { type: 'index', selected: 5 }
});

layer.updateStyle({
  colormap: 'plasma',
  scale: [20, 35],
  opacity: 0.7
});
```

## Custom stores and private data

Instead of `url`, pass a store implementing Zarrita's `Readable` interface. This supports Icechunk and other storage backends without bundling their clients with Zarr-maps.

The Icechunk and private Zarr integrations were directly inspired by CarbonPlan's [`zarr-layer`](https://github.com/carbonplan/zarr-layer) implementation.

For private HTTP datasets, use `requestOverrides` for static fetch options or `transformRequest` for credentials that must be calculated for each object:

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

## Query the data

The Leaflet layer exposes the query methods of its `ZarrTileProvider`:

```ts
const position: [number, number] = [-5.4, 36.1];

const point = await layer.queryData({ type: 'Point', coordinates: position });
const timeSeries = await layer.getTimeSeries(position);
const profile = await layer.getVerticalProfile(position);
const transect = await layer.getTransect([-6, 36], [-4, 37], {}, { samples: 100 });
```

Queries do not change the slice displayed on the map. See the [`LeafletLayerOptions` API](api/zarr-maps-leaflet/interfaces/LeafletLayerOptions.md) for all configuration options.
