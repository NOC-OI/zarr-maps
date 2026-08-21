---
sidebar_position: 2
title: OpenLayers
---

# Get started with OpenLayers

Use `zarr-maps-ol` to display a multidimensional Zarr dataset as an OpenLayers tile layer.

## Installation

```bash
npm install zarr-maps-ol ol
```

## Create a layer

Your page needs a map container with a defined height. Create the OpenLayers map, construct the Zarr layer, wait for its metadata to load, and add it to the map.

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

const layer = new ZarrLayer({
  id: 'salinity',
  url: 'https://example.com/data.zarr',
  variable: 'salinity',
  colormap: 'viridis',
  scale: [30, 40]
});

await layer.load();
map.addLayer(layer);
```

Calling `load()` opens the dataset, reads its metadata and dimensions, detects its coordinate reference system, and prepares it for tile requests. OpenLayers then requests visible tiles as the map moves or zooms.

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

The OpenLayers layer exposes the query methods of its `ZarrTileProvider`:

```ts
const position: [number, number] = [-5.4, 36.1];

const point = await layer.queryData({ type: 'Point', coordinates: position });
const timeSeries = await layer.getTimeSeries(position);
const profile = await layer.getVerticalProfile(position);
const transect = await layer.getTransect([-6, 36], [-4, 37], {}, { samples: 100 });
```

Queries do not change the slice displayed on the map. See the [`OLLayerOptions` API](api/zarr-maps-ol/interfaces/OLLayerOptions.md) for all configuration options.
