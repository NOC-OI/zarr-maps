import { createElement } from 'react';
import type React from 'react';
import { LayerInfoPanel } from 'zarr-maps-explorer';
import type {
  DataInfoType,
  LayerNamesType,
  LayersLegendType,
  SelectedLayersType
} from '../../../types';
import { DEFAULT_COLORMAP, DEFAULT_OPACITY } from 'zarr-maps-tiling';

export function handleChangeOpacity(
  opacity: number,
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>,
  content: string,
  subLayer: string,
  subLayers: LayerNamesType,
  setActualLayer: React.Dispatch<React.SetStateAction<string>>
) {
  function changeMapOpacity(
    layerInfo: { subLayer: string; dataInfo: DataInfoType },
    opacity: number
  ) {
    setLayerAction('opacity');
    setSelectedLayers((prevSelectedLayers: SelectedLayersType) => {
      const copy = { ...prevSelectedLayers };
      const newSelectedLayer = prevSelectedLayers[layerInfo.subLayer];
      if (!newSelectedLayer) return prevSelectedLayers;
      newSelectedLayer.params.opacity = opacity;

      delete copy[layerInfo.subLayer];
      const newSelectedLayers: SelectedLayersType = {
        [layerInfo.subLayer]: newSelectedLayer,
        ...copy
      };
      return newSelectedLayers;
    });
  }

  const layerInfo = JSON.parse(
    JSON.stringify({
      subLayer: `${content}_${subLayer}`,
      dataInfo: subLayers[subLayer]
    })
  );
  setActualLayer(layerInfo.subLayer);
  changeMapOpacity(layerInfo, opacity);
}

export function getPreviousOpacityValue(content: string, selectedLayers: SelectedLayersType) {
  return selectedLayers[content].params.opacity;
}

export async function handleClickLegend(
  layerInfo: DataInfoType,
  subLayer: string,
  setLayerLegend: React.Dispatch<React.SetStateAction<LayersLegendType>>,
  content: string,
  selectedLayers?: SelectedLayersType
) {
  const legendLayerName = `${content}_${subLayer}`;
  let scale: [number, number];
  if (!selectedLayers) {
    if (layerInfo.params.scale) {
      scale = layerInfo.params.scale;
    } else {
      scale = [0, 1];
    }
  } else {
    scale = selectedLayers[`${content}_${subLayer}`].params.scale || [0, 1];
  }
  const colorName = selectedLayers
    ? selectedLayers[`${content}_${subLayer}`].params.colormap || DEFAULT_COLORMAP
    : layerInfo.params.colormap || DEFAULT_COLORMAP;

  setLayerLegend((layerLegend: LayersLegendType) => {
    const newLayerLegend = { ...layerLegend };
    delete newLayerLegend[legendLayerName];
    newLayerLegend[legendLayerName] = {
      colormap: colorName,
      scale: scale,
      dataDescription: layerInfo.dataDescription || ['', '']
    };
    return newLayerLegend;
  });
}

export function verifyIfWasSelectedBefore(
  content: string,
  subLayer: string,
  selectedLayers: SelectedLayersType
) {
  return !!selectedLayers[`${content}_${subLayer}`];
}

export function handleClickSlider(
  setOpacityIsClicked: React.Dispatch<React.SetStateAction<boolean>>
) {
  setOpacityIsClicked((opacityIsClicked: boolean) => !opacityIsClicked);
}

export function handleClickLayerInfo(
  content: string,
  subLayer: string,
  setInfoButtonBox: any,
  layer: DataInfoType
) {
  setInfoButtonBox({
    title: 'Layer details',
    content: createElement(LayerInfoPanel, {
      group: content,
      layerId: subLayer,
      content: layer.content
    })
  });
}

export function changeMapZoom(
  layerInfo: { subLayer: string; dataInfo: DataInfoType },
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  selectedLayers: SelectedLayersType,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>
) {
  setLayerAction('zoom');
  const newSelectedLayer = selectedLayers[layerInfo.subLayer];
  setSelectedLayers((selectedLayers: SelectedLayersType) => {
    const copy = { ...selectedLayers };
    delete copy[layerInfo.subLayer];
    const newSelectedLayers: SelectedLayersType = {
      [layerInfo.subLayer]: newSelectedLayer,
      ...copy
    };
    return newSelectedLayers;
  });
}

export async function addMapLayer(
  layerInfo: { subLayer: string; dataInfo: DataInfoType },
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>
) {
  setLayerAction('add');
  const newSelectedLayer = layerInfo.dataInfo;
  newSelectedLayer.params.scale = newSelectedLayer.params.scale || [0, 1];
  newSelectedLayer.params.colormap = newSelectedLayer.params.colormap || 'jet';
  newSelectedLayer.params.opacity = DEFAULT_OPACITY;
  setSelectedLayers((selectedLayers: SelectedLayersType) => {
    const newSelectedLayers: SelectedLayersType = {
      [layerInfo.subLayer]: newSelectedLayer,
      ...selectedLayers
    };
    return newSelectedLayers;
  });
}

export function removeMapLayer(
  layerInfo: { subLayer: string; dataInfo: DataInfoType },
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>
) {
  setLayerAction('remove');
  setSelectedLayers((selectedLayers: SelectedLayersType) => {
    const copy = { ...selectedLayers };
    delete copy[layerInfo.subLayer];
    return copy;
  });
}

export async function handleChangeMapLayerAndAddLegend(
  checked: boolean,
  layerInfo: any,
  setActualLayer: React.Dispatch<React.SetStateAction<string>>,
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>,
  subLayer: string,
  setLayerLegend: React.Dispatch<React.SetStateAction<LayersLegendType>>,
  layerLegend: LayersLegendType,
  content: string,
  setOpacityIsClicked?: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!checked) {
    const legendLayerName = `${content}_${subLayer}`;
    if (layerLegend[legendLayerName]) {
      setLayerLegend((layerLegend: LayersLegendType) => {
        const newLayerLegend = { ...layerLegend };
        delete newLayerLegend[legendLayerName];
        return newLayerLegend;
      });
    }
  }
  await handleChangeMapLayer(
    checked,
    layerInfo,
    setActualLayer,
    setLayerAction,
    setSelectedLayers,
    setOpacityIsClicked
  );
}
export async function handleChangeMapLayer(
  checked: boolean,
  layerInfo: { subLayer: string; dataInfo: DataInfoType },
  setActualLayer: React.Dispatch<React.SetStateAction<string>>,
  setLayerAction: React.Dispatch<React.SetStateAction<string>>,
  setSelectedLayers: React.Dispatch<React.SetStateAction<SelectedLayersType>>,
  setOpacityIsClicked?: React.Dispatch<React.SetStateAction<boolean>>
) {
  setActualLayer(layerInfo.subLayer);
  if (checked) {
    await addMapLayer(layerInfo, setLayerAction, setSelectedLayers);
  } else {
    if (setOpacityIsClicked) {
      setOpacityIsClicked(false);
    }
    removeMapLayer(layerInfo, setLayerAction, setSelectedLayers);
  }
}
