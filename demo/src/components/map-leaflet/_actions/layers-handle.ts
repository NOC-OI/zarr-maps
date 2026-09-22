import type React from 'react';
import { DEFAULT_BOUNDS } from '../../../lib/map-layers/utils';
import type { LayersJsonType, SelectedLayersType } from '../../../types';
import { generateSelectedLayer, updateSelectedLayersWithDimensions } from './get-layers';
import { DEFAULT_OPACITY } from 'zarr-maps-tiling';
import { ZarrLayer } from 'zarr-maps-leaflet';

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

function findLayersById(map: L.Map, id: string): any[] {
  const found: any[] = [];
  map.eachLayer((layer: any) => {
    if (layer?.options?.id === id) found.push(layer);
  });
  return found;
}

export function removeLayerFromMap(
  actualLayer: string,
  _listLayers: LayersJsonType,
  mapRef: React.RefObject<L.Map>
): void {
  const map = mapRef.current;
  if (!map) return;

  for (const layer of findLayersById(map, actualLayer)) {
    map.removeLayer(layer);
    layer.provider?.destroy?.();
  }
}

export function removeAllLayersFromMap(mapRef: React.RefObject<L.Map>): void {
  const map = mapRef.current;
  if (!map) return;
  const layers: ZarrLayer[] = [];
  map.eachLayer(layer => {
    if (layer instanceof ZarrLayer) layers.push(layer);
  });
  layers.forEach(layer => {
    map.removeLayer(layer);
    layer.provider.destroy();
  });
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

  layer.updateStyle({ opacity });
}

export async function changeMapColors(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  mapRef: React.RefObject<L.Map>
) {
  const map = mapRef.current;
  if (!map) return;

  const layerInfo = selectedLayers[actualLayer];
  const existing: any = findLayerById(map, actualLayer);
  if (existing) {
    existing.updateStyle({
      colormap: layerInfo.params.colormap,
      scale: layerInfo.params.scale
    });
    return;
  }

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

  if (layer) {
    layer.updateSelectors(layerInfo.params.selectors);

    const provider = layer.provider;
    if (provider) {
      updateSelectedLayersWithDimensions(provider, actualLayer, selectedLayers, setSelectedLayers);
    }
    return;
  }
  await generateSelectedLayer(actualLayer, selectedLayers, mapRef, setSelectedLayers);
}
