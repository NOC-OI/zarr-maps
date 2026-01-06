import { GetZarrLayer } from '../../../lib/map-layers/addZarrLayer';
import type { DataInfoType, SelectedLayersType } from '../../../types';
import { ZarrLayer } from '../../../../../dist/leaflet';
import { type LeafletLayerOptions } from '../../../../../dist/leaflet/';
import type React from 'react';
import { findLayerById } from './layers-handle';

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
      map.addLayer(layer);
    } else if (layerName.dataType === 'zarr-titiler') {
      const layer = await getZarrLayer(layerName, actualLayer);
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
  setSelectedLayers(prev => ({
    ...prev,
    [actualLayer]: selected
  }));
}

export async function getZarrLeafletLayer(layerName: DataInfoType, actualLayer: string) {
  const options = layerName.params as LeafletLayerOptions;
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
