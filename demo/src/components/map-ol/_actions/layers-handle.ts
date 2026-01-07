import type React from 'react';
import { DEFAULT_BOUNDS } from '../../../lib/map-layers/utils';
import type { LayersJsonType, SelectedLayersType } from '../../../types';
import { generateSelectedLayer, updateSelectedLayersWithDimensions } from './get-layers';
import { DEFAULT_OPACITY } from 'zarr-maps';

import type Map from 'ol/Map';
import type BaseLayer from 'ol/layer/Base';
import { transformExtent } from 'ol/proj';
import type { ZarrLayer } from 'zarr-maps/ol';

type OLMapRef = React.RefObject<Map>;

export function getExtentFromBBox(
  bbox: number[] | null,
  paddingDegrees = 0.1,
  from = 'EPSG:4326',
  to = 'EPSG:3857'
): [number, number, number, number] {
  if (!bbox || bbox.length !== 4) {
    const [[minLon, minLat], [maxLon, maxLat]] = DEFAULT_BOUNDS;
    return transformExtent([minLon, minLat, maxLon, maxLat], from, to) as [
      number,
      number,
      number,
      number
    ];
  }

  const b = [...bbox];

  b[0] = b[0] - paddingDegrees < -180 ? -180 : b[0] - paddingDegrees;
  b[1] = b[1] - paddingDegrees < -90 ? -90 : b[1] - paddingDegrees;
  b[2] = b[2] + paddingDegrees > 180 ? 180 : b[2] + paddingDegrees;
  b[3] = b[3] + paddingDegrees > 90 ? 90 : b[3] + paddingDegrees;

  return transformExtent([b[0], b[1], b[2], b[3]], from, to) as [number, number, number, number];
}

export function findLayerById(map: Map, id: string): BaseLayer | ZarrLayer | null {
  const layers = map.getLayers().getArray() as BaseLayer[];
  return layers.find(l => (l as any).get?.('id') === id) ?? null;
}

export function removeLayerFromMap(
  actualLayer: string,
  listLayers: LayersJsonType,
  mapRef: OLMapRef
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
    (layer as ZarrLayer).provider?.destroy?.();
  }
}

export async function changeMapOpacity(
  actualLayer: string,
  selectedLayers: SelectedLayersType,
  mapRef: OLMapRef
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
  mapRef: OLMapRef
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
  mapRef: OLMapRef
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
      layer.changed?.();
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
