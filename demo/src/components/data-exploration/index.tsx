import { DataExploration, type DataExplorationGroup } from 'zarr-maps-explorer';
import { useContextHandle } from '../../application/use-context';
import { useLayersManagementHandle } from '../../application/use-layers';
import type { DataExplorationSelectionProps } from '../../types';
import {
  getPreviousOpacityValue,
  handleChangeMapLayerAndAddLegend,
  handleChangeOpacity,
  handleClickLayerInfo,
  handleClickLegend
} from './_actions/actions';

export function DataExplorationSelection({
  display,
  setInfoButtonBox
}: DataExplorationSelectionProps) {
  const {
    listLayers,
    setActualLayer,
    setLayerAction,
    selectedLayers,
    setSelectedLayers,
    layerLegend,
    setLayerLegend
  } = useLayersManagementHandle();
  const { setTransectLayerName } = useContextHandle();
  const groups: DataExplorationGroup[] = Object.entries(listLayers).map(([groupName, group]) => ({
    id: groupName,
    title: groupName,
    layers: Object.entries(group.layerNames).map(([layerId, layer]) => {
      const name = `${groupName}_${layerId}`;
      const active = !!selectedLayers[name];
      return {
        id: name,
        label: layer.dataDescription[0],
        tags: layer.tags,
        active,
        opacity: active ? getPreviousOpacityValue(name, selectedLayers) : 1,
        queryable: active,
        onToggle: checked =>
          handleChangeMapLayerAndAddLegend(
            checked,
            { subLayer: name, dataInfo: structuredClone(layer) },
            setActualLayer,
            setLayerAction,
            setSelectedLayers,
            layerId,
            setLayerLegend,
            layerLegend,
            groupName
          ),
        onInfo: () => handleClickLayerInfo(groupName, layerId, setInfoButtonBox, layer),
        onQuery: () => setTransectLayerName(name),
        onStyle: () => handleClickLegend(layer, layerId, setLayerLegend, groupName, selectedLayers),
        onOpacityChange: opacity =>
          handleChangeOpacity(
            opacity,
            setLayerAction,
            setSelectedLayers,
            groupName,
            layerId,
            group.layerNames,
            setActualLayer
          )
      };
    })
  }));
  return <DataExploration visible={display} groups={groups} />;
}
