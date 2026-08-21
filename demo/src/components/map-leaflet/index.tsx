import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useContextHandle } from '../../application/use-context';
import type { keyable } from '../../types';
import { useLayersManagementHandle } from '../../application/use-layers';

import { generateSelectedLayer } from './_actions/get-layers';
import {
  changeMapColors,
  changeMapDimensions,
  changeMapOpacity,
  findLayerById,
  removeLayerFromMap
} from './_actions/layers-handle';

import { LEAFLET_VIEW, LEAFLET_ZOOM } from '../../lib/map-layers/utils';
import { ZarrLayer } from 'zarr-maps-leaflet';
import type { QueryPosition } from 'zarr-maps-tiling';
import { PointQueryPanel, TransectQueryPanel } from '../query-panels';

export function MapLeaflet() {
  const {
    selectedLayers,
    setSelectedLayers,
    actualLayer,
    layerAction,
    setLayerAction,
    listLayers
  } = useLayersManagementHandle();

  const mapRef = useRef<L.Map | null>(null);
  const sharedLayersRef = useRef(selectedLayers);
  const sharedLayersRestoredRef = useRef(false);
  const captureRef = useRef<((position: QueryPosition) => void) | null>(null);
  const transectGroupRef = useRef<L.LayerGroup | null>(null);
  const transectPointsRef = useRef<QueryPosition[]>([]);
  const pointMarkerRef = useRef<L.CircleMarker | null>(null);

  const { setFlashMessage, setLoading, setInfoButtonBox, transectLayerName, setTransectLayerName } =
    useContextHandle();

  const clearTransect = useCallback(() => {
    captureRef.current = null;
    transectPointsRef.current = [];
    if (mapRef.current && transectGroupRef.current)
      mapRef.current.removeLayer(transectGroupRef.current);
    transectGroupRef.current = null;
  }, []);
  const clearPoint = useCallback(() => {
    if (mapRef.current && pointMarkerRef.current)
      mapRef.current.removeLayer(pointMarkerRef.current);
    pointMarkerRef.current = null;
  }, []);

  const registerCapture = useCallback(
    (handler: ((position: QueryPosition) => void) | null) => {
      captureRef.current = handler;
      if (handler) {
        clearTransect();
        captureRef.current = handler;
        if (mapRef.current) transectGroupRef.current = L.layerGroup().addTo(mapRef.current);
      }
    },
    [clearTransect]
  );

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (mapRef.current) return;
      const map = L.map(node, {
        zoomControl: true,
        attributionControl: false
      });
      map.zoomControl.setPosition('topright');

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles © Esri'
        }
      ).addTo(map);

      map.setView(LEAFLET_VIEW, LEAFLET_ZOOM);

      mapRef.current = map;
      map.on('click', event => {
        const position: QueryPosition = [event.latlng.lng, event.latlng.lat];
        if (captureRef.current) {
          transectPointsRef.current.push(position);
          L.circleMarker(event.latlng, {
            radius: 6,
            color: '#000',
            weight: 2,
            fillColor: '#00ffff',
            fillOpacity: 1
          }).addTo(transectGroupRef.current!);
          if (transectPointsRef.current.length === 2)
            L.polyline(
              transectPointsRef.current.map(([lng, lat]) => [lat, lng]),
              { color: '#00ffff', weight: 3 }
            ).addTo(transectGroupRef.current!);
          captureRef.current(position);
          return;
        }
        let layer: ZarrLayer | undefined;
        map.eachLayer(candidate => {
          if (candidate instanceof ZarrLayer) layer = candidate;
        });
        if (!layer) return;
        clearTransect();
        if (pointMarkerRef.current) map.removeLayer(pointMarkerRef.current);
        pointMarkerRef.current = L.circleMarker(event.latlng, {
          radius: 6,
          color: '#000',
          weight: 2,
          fillColor: '#ffff00',
          fillOpacity: 1
        }).addTo(map);
        const layerName = String((layer.options as { id?: string }).id ?? 'Zarr layer');
        setInfoButtonBox({
          title: 'Zarr point query',
          layerName,
          onClose: clearPoint,
          content: (
            <PointQueryPanel provider={layer.provider} layerName={layerName} position={position} />
          )
        });
      });
      if (!sharedLayersRestoredRef.current) {
        sharedLayersRestoredRef.current = true;
        const sharedLayers = sharedLayersRef.current;
        void (async () => {
          for (const layerName of Object.keys(sharedLayers).reverse()) {
            await generateSelectedLayer(
              layerName,
              sharedLayers,
              mapRef as React.RefObject<L.Map>,
              setSelectedLayers
            );
          }
        })().finally(() => setLoading(false));
      }
      setLoading(false);
    },
    [clearPoint, clearTransect, setInfoButtonBox, setLoading, setSelectedLayers]
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !transectLayerName) return;
    const layer = findLayerById(map, transectLayerName);
    if (layer instanceof ZarrLayer) {
      const display = selectedLayers[transectLayerName].params;
      clearPoint();
      clearTransect();
      setInfoButtonBox({
        title: 'Transect query',
        layerName: transectLayerName,
        onClose: clearTransect,
        content: (
          <TransectQueryPanel
            provider={layer.provider}
            layerName={transectLayerName}
            registerCapture={registerCapture}
            clearCapture={clearTransect}
            colormap={display.colormap}
            scale={display.scale}
          />
        )
      });
    }
    setTransectLayerName('');
  }, [
    clearTransect,
    clearPoint,
    registerCapture,
    selectedLayers,
    setInfoButtonBox,
    setTransectLayerName,
    transectLayerName
  ]);

  async function addLayerIntoMap() {
    if (!mapRef.current) return;

    const error = await generateSelectedLayer(
      actualLayer,
      selectedLayers,
      mapRef as React.RefObject<L.Map>,
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
    // Consume the action before it causes dimension/state updates. Otherwise
    // those updates rerun this effect while `add` is still active.
    setLayerAction('');
    await actionMap[action].function(...actionMap[action].args);
    setLoading(false);
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
        clearTransect();
        clearPoint();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [clearPoint, clearTransect]);

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
