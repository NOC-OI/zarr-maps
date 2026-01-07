import { useEffect, useRef, useCallback } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import 'ol/ol.css';

import { useContextHandle } from '../../application/use-context';
import type { keyable } from '../../types';
import { useLayersManagementHandle } from '../../application/use-layers';

import { generateSelectedLayer } from './_actions/get-layers';
import {
  changeMapColors,
  changeMapDimensions,
  changeMapOpacity,
  removeLayerFromMap
} from './_actions/layers-handle';

import { LEAFLET_VIEW, LEAFLET_ZOOM } from '../../lib/map-layers/utils';
import { fromLonLat } from 'ol/proj';
import Zoom from 'ol/control/Zoom';
import { defaults as defaultControls } from 'ol/control';

export function MapOL() {
  const {
    selectedLayers,
    setSelectedLayers,
    actualLayer,
    layerAction,
    setLayerAction,
    listLayers
  } = useLayersManagementHandle();

  const mapRef = useRef<Map | null>(null);

  const { setFlashMessage, setLoading } = useContextHandle();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (mapRef.current) return;

      const imagery = new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attributions: 'Tiles © Esri',
          maxZoom: 19
        })
      });

      const map = new Map({
        target: node,
        layers: [imagery],
        view: new View({
          center: fromLonLat([LEAFLET_VIEW[1], LEAFLET_VIEW[0]]) as any,
          zoom: LEAFLET_ZOOM
        }),
        controls: defaultControls({ zoom: false, attribution: false }).extend([
          new Zoom({
            className: 'ol-zoom ol-zoom-top-right'
          })
        ])
      });

      mapRef.current = map;
      setLoading(false);
    },
    [setLoading]
  );

  async function addLayerIntoMap() {
    if (!mapRef.current) return;

    const error = await generateSelectedLayer(
      actualLayer,
      selectedLayers,
      mapRef as React.RefObject<Map>,
      setSelectedLayers
    );

    if (error) {
      setFlashMessage({
        messageType: 'error',
        content: error.error
      });
    }

    setLayerAction('');
    setLoading(false);
  }

  async function handleLayerAction(actionMap: keyable, action: string) {
    setLoading(true);
    await actionMap[action].function(...actionMap[action].args);
    setLoading(false);
    setLayerAction('');
  }

  useEffect(() => {
    if (!mapRef.current) return;

    const actionMap: Record<string, { function: any; args: any[] }> = {
      remove: {
        function: removeLayerFromMap,
        args: [actualLayer, listLayers, mapRef]
      },
      add: { function: addLayerIntoMap, args: [] },
      opacity: {
        function: changeMapOpacity,
        args: [actualLayer, selectedLayers, mapRef]
      },
      'update-colors': {
        function: changeMapColors,
        args: [actualLayer, selectedLayers, mapRef]
      },
      'update-dimensions': {
        function: changeMapDimensions,
        args: [actualLayer, selectedLayers, setSelectedLayers, mapRef]
      }
    };

    if (actionMap[layerAction]) {
      handleLayerAction(actionMap, layerAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLayers]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        top: '0px',
        bottom: '0px',
        position: 'absolute',
        width: '100%',
        zIndex: 0
      }}
      ref={ref}
    />
  );
}
