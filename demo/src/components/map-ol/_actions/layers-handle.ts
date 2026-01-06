import type React from 'react';
import { DEFAULT_BOUNDS } from '../../../lib/map-layers/utils';
import type { LayersJsonType, SelectedLayersType } from '../../../types';
import { generateSelectedLayer, updateSelectedLayersWithDimensions } from './get-layers';
import { DEFAULT_OPACITY } from '../../../dist';

export function getBoundsFromBBox(bbox: number[] | null): [[number, number], [number, number]] {
  if (!bbox || bbox.length !== 4) return DEFAULT_BOUNDS;
  const sumValue = 0.1;
  bbox[0] = bbox[0] - sumValue < -180 ? -180 : bbox[0] - sumValue;
  bbox[1] = bbox[1] - sumValue < -90 ? -90 : bbox[1] - sumValue;
  bbox[2] = bbox[2] + sumValue > 180 ? 180 : bbox[2] + sumValue;
  bbox[3] = bbox[3] + sumValue > 90 ? 90 : bbox[3] + sumValue;
  return [
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]]
  ];
}

export function findLayerById(map: L.Map, id: string): any | null {
  let found: any | null = null;
  map.eachLayer((layer: any) => {
    if (layer?.options?.id === id) found = layer;
  });
  return found;
}

export function removeLayerFromMap(
  actualLayer: string,
  listLayers: LayersJsonType,
  mapRef: React.RefObject<L.Map>
): void {
  const map = mapRef.current;
  if (!map) return;

  const splitActual = actualLayer.split('_');
  if (splitActual.length > 2) {
    splitActual[1] = splitActual.slice(1).join('_');
  }
  const layerInfo = listLayers?.[splitActual[0]]?.layerNames?.[splitActual[1]];
  if (!layerInfo) return;

  const layer = findLayerById(map, actualLayer);
  if (!layer) return;

  map.removeLayer(layer);

  if (layerInfo.dataType === 'zarr-maps') {
    layer.provider?.destroy?.();
  }
}

export async function changeMapOpacity(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  mapRef: React.RefObject<L.Map>
) {
  const map = mapRef.current;
  if (!map) return;

  const layerInfo = selectedLayers[actualLayer];
  if (!layerInfo) return;

  if (typeof layerInfo.params.opacity !== 'number') {
    layerInfo.params.opacity = layerInfo.params.opacity
      ? parseFloat(layerInfo.params.opacity as any)
      : DEFAULT_OPACITY;
  }
  const opacity = layerInfo.params.opacity as number;

  const layer: any = findLayerById(map, actualLayer);
  if (!layer) return;

  if (layerInfo.dataType === 'zarr-maps') {
    if (typeof layer.updateStyle === 'function') {
      layer.updateStyle({ opacity });
    } else if (typeof layer.setOpacity === 'function') {
      layer.setOpacity(opacity);
    }
  } else {
    if (typeof layer.setOpacity === 'function') {
      layer.setOpacity(opacity);
    }
  }
}

export async function changeMapColors(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  mapRef: React.RefObject<L.Map>
) {
  const map = mapRef.current;
  if (!map) return;

  const existing: any = findLayerById(map, actualLayer);
  if (existing) map.removeLayer(existing);

  await generateSelectedLayer(actualLayer, selectedLayers, mapRef, undefined);
}

export async function changeMapDimensions(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>,
  mapRef: React.RefObject<L.Map>
) {
  const map = mapRef.current;
  if (!map) return;

  const layerInfo = selectedLayers[actualLayer];
  if (!layerInfo) return;

  const layer: any = findLayerById(map, actualLayer);

  if (layerInfo.dataType === 'zarr-maps' && layer) {
    if (typeof layer.updateSelectors === 'function') {
      layer.updateSelectors(layerInfo.params.selectors);
    } else if (layer.provider?.updateSelectors) {
      layer.provider.updateSelectors(layerInfo.params.selectors);
      layer.redraw?.();
    }

    const provider = layer.provider;
    if (provider) {
      updateSelectedLayersWithDimensions(provider, actualLayer, selectedLayers, setSelectedLayers);
    }
    return;
  }
  if (layer) map.removeLayer(layer);
  await generateSelectedLayer(actualLayer, selectedLayers, mapRef, setSelectedLayers);
}
