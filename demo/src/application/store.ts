import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type {
  DataInfoType,
  LayersJsonType,
  LayersLegendType,
  SelectedLayer,
  SelectedLayersType
} from '../types';
import { layersJson } from './data/layers-json';

const URL_LAYERS_PARAM = 'layers';
const URL_STATE_VERSION = 1;
type JsonObject = Record<string, unknown>;

interface ShareableLayer { r: string; o?: JsonObject; c?: SelectedLayer }
interface ShareableState { v: typeof URL_STATE_VERSION; l: ShareableLayer[] }

export interface LayersState {
  selectedLayers: SelectedLayersType;
  actualLayer: string;
  layerAction: string;
  layerLegend: LayersLegendType;
  listLayers: LayersJsonType;
}

function isPlainObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function findCatalogLayer(reference: string): SelectedLayer | undefined {
  for (const [group, entry] of Object.entries(layersJson)) {
    for (const [name, layer] of Object.entries(entry.layerNames)) {
      if (`${group}_${name}` === reference) return structuredClone(layer);
    }
  }
}

function getOverrides(value: unknown, base: unknown): unknown {
  if (Array.isArray(value)) return JSON.stringify(value) === JSON.stringify(base) ? undefined : value;
  if (isPlainObject(value) && isPlainObject(base)) {
    const overrides = Object.fromEntries(
      Object.entries(value)
        .map(([key, child]) => [key, getOverrides(child, base[key])])
        .filter(([, child]) => child !== undefined)
    );
    return Object.keys(overrides).length ? overrides : undefined;
  }
  return Object.is(value, base) ? undefined : value;
}

function mergeOverrides<T>(base: T, overrides: unknown): T {
  if (overrides === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(overrides)) return overrides as T;
  const merged: JsonObject = { ...base };
  Object.entries(overrides).forEach(([key, value]) => {
    merged[key] = isPlainObject(value) && isPlainObject(merged[key])
      ? mergeOverrides(merged[key], value)
      : value;
  });
  return merged as T;
}

function removeRuntimeMetadata(layer: SelectedLayer): SelectedLayer {
  const result = structuredClone(layer);
  delete result.dimensions;
  delete result.pyramidLevels;
  return result;
}

function createShareableState(selectedLayers: SelectedLayersType): ShareableState {
  return {
    v: URL_STATE_VERSION,
    l: Object.entries(selectedLayers).map(([reference, selected]) => {
      const layer = removeRuntimeMetadata(selected);
      const catalog = findCatalogLayer(reference);
      if (!catalog) return { r: reference, c: layer };
      const overrides = getOverrides(layer, catalog);
      return overrides ? { r: reference, o: overrides as JsonObject } : { r: reference };
    })
  };
}

function restoreShareableState(value: unknown): SelectedLayersType {
  if (!isPlainObject(value) || value.v !== URL_STATE_VERSION || !Array.isArray(value.l)) return {};
  return Object.fromEntries(value.l.flatMap(item => {
    if (!isPlainObject(item) || typeof item.r !== 'string') return [];
    const catalog = findCatalogLayer(item.r);
    const layer = catalog
      ? mergeOverrides(catalog, item.o)
      : isPlainObject(item.c) ? item.c as unknown as SelectedLayer : undefined;
    return layer ? [[item.r, layer] as const] : [];
  }));
}

function readLayersFromUrl(): SelectedLayersType {
  if (typeof window === 'undefined') return {};
  const value = new URL(window.location.href).searchParams.get(URL_LAYERS_PARAM);
  if (!value) return {};
  try {
    if (value.startsWith('{')) {
      const legacy = JSON.parse(value);
      return isPlainObject(legacy) ? legacy as SelectedLayersType : {};
    }
    const decoded = decompressFromEncodedURIComponent(value);
    return decoded ? restoreShareableState(JSON.parse(decoded)) : {};
  } catch {
    return {};
  }
}

function createLayerList(selectedLayers: SelectedLayersType): LayersJsonType {
  const list = structuredClone(layersJson);
  Object.entries(selectedLayers).forEach(([reference, layer]) => {
    const separator = reference.indexOf('_');
    if (separator < 0) return;
    const group = reference.slice(0, separator);
    const name = reference.slice(separator + 1);
    if (!list[group]) list[group] = { layerNames: {} };
    if (!list[group].layerNames[name]) list[group].layerNames[name] = layer;
  });
  return list;
}

const initialSelectedLayers = readLayersFromUrl();
const initialState: LayersState = {
  selectedLayers: initialSelectedLayers,
  actualLayer: '',
  layerAction: '',
  layerLegend: {},
  listLayers: createLayerList(initialSelectedLayers)
};

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    setSelectedLayers(state, action: PayloadAction<SelectedLayersType>) { state.selectedLayers = action.payload; },
    setActualLayer(state, action: PayloadAction<string>) { state.actualLayer = action.payload; },
    setLayerAction(state, action: PayloadAction<string>) { state.layerAction = action.payload; },
    setLayerLegend(state, action: PayloadAction<LayersLegendType>) { state.layerLegend = action.payload; },
    setListLayers(state, action: PayloadAction<LayersJsonType>) { state.listLayers = action.payload; },
    addListLayer(state, action: PayloadAction<{ group: string; name: string; layer: DataInfoType }>) {
      if (!state.listLayers[action.payload.group]) state.listLayers[action.payload.group] = { layerNames: {} };
      state.listLayers[action.payload.group].layerNames[action.payload.name] = action.payload.layer;
    }
  }
});

export const layersActions = layersSlice.actions;
export const store = configureStore({ reducer: { layers: layersSlice.reducer } });

let previousLayers = store.getState().layers.selectedLayers;
store.subscribe(() => {
  const selectedLayers = store.getState().layers.selectedLayers;
  if (selectedLayers === previousLayers || typeof window === 'undefined') return;
  previousLayers = selectedLayers;
  const url = new URL(window.location.href);
  if (Object.keys(selectedLayers).length) {
    url.searchParams.set(
      URL_LAYERS_PARAM,
      compressToEncodedURIComponent(JSON.stringify(createShareableState(selectedLayers)))
    );
  } else {
    url.searchParams.delete(URL_LAYERS_PARAM);
  }
  window.history.replaceState(window.history.state, '', url);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
