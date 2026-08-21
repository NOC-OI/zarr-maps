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
  findLayerById,
  removeLayerFromMap
} from './_actions/layers-handle';

import { LEAFLET_VIEW, LEAFLET_ZOOM } from '../../lib/map-layers/utils';
import { fromLonLat } from 'ol/proj';
import { toLonLat } from 'ol/proj';
import Zoom from 'ol/control/Zoom';
import { defaults as defaultControls } from 'ol/control';
import { ZarrLayer } from 'zarr-maps-ol';
import type { QueryPosition } from 'zarr-maps-tiling';
import { PointQueryPanel, TransectQueryPanel } from '../query-panels';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

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
  const sharedLayersRef = useRef(selectedLayers);
  const sharedLayersRestoredRef = useRef(false);
  const captureRef = useRef<((position: QueryPosition) => void) | null>(null);
  const transectPositionsRef = useRef<QueryPosition[]>([]);
  const transectLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const pointLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

  const { setFlashMessage, setLoading, setInfoButtonBox, transectLayerName, setTransectLayerName } =
    useContextHandle();

  const clearTransect = useCallback(() => {
    captureRef.current = null;
    transectPositionsRef.current = [];
    if (mapRef.current && transectLayerRef.current)
      mapRef.current.removeLayer(transectLayerRef.current);
    transectLayerRef.current = null;
  }, []);
  const clearPoint = useCallback(() => {
    if (mapRef.current && pointLayerRef.current) mapRef.current.removeLayer(pointLayerRef.current);
    pointLayerRef.current = null;
  }, []);

  const registerCapture = useCallback(
    (handler: ((position: QueryPosition) => void) | null) => {
      captureRef.current = handler;
      if (handler && mapRef.current) {
        clearTransect();
        captureRef.current = handler;
        transectLayerRef.current = new VectorLayer({ source: new VectorSource() });
        mapRef.current.addLayer(transectLayerRef.current);
      }
    },
    [clearTransect]
  );

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
      map.on('singleclick', event => {
        const coordinate = toLonLat(event.coordinate) as QueryPosition;
        if (captureRef.current) {
          transectPositionsRef.current.push(coordinate);
          const source = transectLayerRef.current!.getSource()!;
          source.addFeature(new Feature({ geometry: new Point(event.coordinate) }));
          if (transectPositionsRef.current.length === 2)
            source.addFeature(
              new Feature({
                geometry: new LineString(
                  transectPositionsRef.current.map(position => fromLonLat(position))
                )
              })
            );
          transectLayerRef.current!.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 6,
                fill: new Fill({ color: '#00ffff' }),
                stroke: new Stroke({ color: '#000', width: 2 })
              }),
              stroke: new Stroke({ color: '#00ffff', width: 3 })
            })
          );
          captureRef.current(coordinate);
          return;
        }
        const layer = [...map.getLayers().getArray()]
          .reverse()
          .find(candidate => candidate instanceof ZarrLayer) as ZarrLayer | undefined;
        if (!layer) return;
        clearTransect();
        if (pointLayerRef.current) map.removeLayer(pointLayerRef.current);
        pointLayerRef.current = new VectorLayer({
          source: new VectorSource({
            features: [new Feature({ geometry: new Point(event.coordinate) })]
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 6,
              fill: new Fill({ color: '#ffff00' }),
              stroke: new Stroke({ color: '#000', width: 2 })
            })
          })
        });
        map.addLayer(pointLayerRef.current);
        const layerName = String(layer.get('id') ?? 'Zarr layer');
        setInfoButtonBox({
          title: 'Zarr point query',
          layerName,
          onClose: clearPoint,
          content: (
            <PointQueryPanel
              provider={layer.provider}
              layerName={layerName}
              position={coordinate}
            />
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
              mapRef as React.RefObject<Map>,
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
        mapRef.current.setTarget(undefined);
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
