import { GetZarrLayer } from '../../../lib/map-layers/addZarrLayer';
import type { DataInfoType, SelectedLayersType } from '../../../types';
import { ZarrLayer, type LeafletLayerOptions } from 'zarr-maps-leaflet';
import { IcechunkStore } from 'icechunk-js';
import type React from 'react';
import { findLayerById } from './layers-handle';
import { store } from '../../../application/store';

export async function generateSelectedLayer(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  mapRef: any,
  setSelectedLayers?: React.Dispatch<React.SetStateAction<SelectedLayersType>>
) {
  const layerName = selectedLayers[actualLayer];
  const map = mapRef.current;
  const layer = findLayerById(map, actualLayer);
  if (layer) map.removeLayer(layer);
  try {
    if (layerName.dataType === 'zarr-maps') {
      const layer = await getZarrLeafletLayer(layerName, actualLayer);
      await updateSelectedLayersWithDimensions(
        layer.provider,
        actualLayer,
        selectedLayers,
        setSelectedLayers
      );
      if (!store.getState().layers.selectedLayers[actualLayer]) {
        layer.provider.destroy();
        return;
      }
      map.addLayer(layer);
    } else if (layerName.dataType === 'zarr-titiler') {
      const layer = await getZarrLayer(layerName, actualLayer);
      if (!store.getState().layers.selectedLayers[actualLayer]) return;
      map.addLayer(layer);
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Error adding layer' };
  }
}

export async function updateSelectedLayersWithDimensions(
  layer: any,
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  setSelectedLayers?: React.Dispatch<React.SetStateAction<SelectedLayersType>>
) {
  if (!setSelectedLayers) return;
  const selected = selectedLayers[actualLayer];
  const dimensions: Record<string, { values: any; selected: any; indices?: number[] }> = {};
  console.log('layer.dimensionValues:', layer.dimensionValues);
  Object.keys(layer.dimensionValues).forEach((dimKey: string) => {
    if (dimKey !== 'lat' && dimKey !== 'lon') {
      dimensions[dimKey] = {
        values: layer.dimensionValues[dimKey],
        selected: layer.selectors[dimKey].selected
      };
    }
  });
  selected.dimensions = dimensions;
  setSelectedLayers(prev => prev[actualLayer] ? { ...prev, [actualLayer]: selected } : prev);
}

export async function getZarrLeafletLayer(layerName: DataInfoType, actualLayer: string) {
  const options = { ...layerName.params } as LeafletLayerOptions;
  if (options.url?.endsWith('.icechunk')) {
    options.store = await IcechunkStore.open(options.url, { branch: 'main', formatVersion: 'v1' });
  }
  options.id = actualLayer;
  const zarrLayer = new ZarrLayer({
    ...options
  });
  await zarrLayer.load();

  return zarrLayer;
}

export async function getZarrLayer(layerName: DataInfoType, actualLayer: string) {
  const zarrLayerClass = new GetZarrLayer(layerName, actualLayer);
  const layer = await zarrLayerClass.getTile();
  return layer;
}
