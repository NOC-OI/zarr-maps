import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { LayersJsonType, LayersLegendType, SelectedLayersType } from '../types';
import { layersActions, store, type AppDispatch, type RootState } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useLayersManagementHandle() {
  const dispatch = useAppDispatch();
  const reduxState = useAppSelector(value => value.layers);
  const state = useMemo(() => structuredClone(reduxState), [reduxState]);

  const setSelectedLayers = useCallback<React.Dispatch<React.SetStateAction<SelectedLayersType>>>(
    value => {
      const current = structuredClone(store.getState().layers.selectedLayers);
      dispatch(layersActions.setSelectedLayers(typeof value === 'function' ? value(current) : value));
    }, [dispatch]
  );
  const setActualLayer = useCallback<React.Dispatch<React.SetStateAction<string>>>(
    value => {
      const current = store.getState().layers.actualLayer;
      dispatch(layersActions.setActualLayer(typeof value === 'function' ? value(current) : value));
    }, [dispatch]
  );
  const setLayerAction = useCallback<React.Dispatch<React.SetStateAction<string>>>(
    value => {
      const current = store.getState().layers.layerAction;
      dispatch(layersActions.setLayerAction(typeof value === 'function' ? value(current) : value));
    }, [dispatch]
  );
  const setLayerLegend = useCallback<React.Dispatch<React.SetStateAction<LayersLegendType>>>(
    value => {
      const current = structuredClone(store.getState().layers.layerLegend);
      dispatch(layersActions.setLayerLegend(typeof value === 'function' ? value(current) : value));
    }, [dispatch]
  );
  const setListLayers = useCallback<React.Dispatch<React.SetStateAction<LayersJsonType>>>(
    value => {
      const current = structuredClone(store.getState().layers.listLayers);
      dispatch(layersActions.setListLayers(typeof value === 'function' ? value(current) : value));
    }, [dispatch]
  );

  return { ...state, setSelectedLayers, setActualLayer, setLayerAction, setLayerLegend, setListLayers };
}
