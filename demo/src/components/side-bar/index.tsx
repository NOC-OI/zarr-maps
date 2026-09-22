import { useEffect } from 'react';
import { DataExplorationSelection } from '../data-exploration';
import { LayerLegendBox } from '../layer-legend-box';
import { ExplorerSidebar, InfoButtonBox } from 'zarr-maps-explorer';
import { useLayersManagementHandle } from '../../application/use-layers';
import type { LayersLegendType } from '../../types';
import { MapToggle } from '../map-toggle';
import { useContextHandle } from '../../application/use-context';

export function SideBar() {
  const { infoButtonBox, setInfoButtonBox } = useContextHandle();

  const {
    selectedLayers,
    layerLegend,
    setLayerLegend,
    setSelectedLayers,
    setActualLayer,
    setLayerAction
  } = useLayersManagementHandle();

  useEffect(() => {
    Object.keys(layerLegend).forEach((legend: string) => {
      if (!Object.keys(selectedLayers).includes(legend)) {
        setLayerLegend((layerLegend: LayersLegendType) => {
          const newLayerLegend = { ...layerLegend };
          delete newLayerLegend[legend];
          return newLayerLegend;
        });
      }
    });
  }, [layerLegend, selectedLayers, setLayerLegend]);

  useEffect(() => {
    if (infoButtonBox.layerName && !selectedLayers[infoButtonBox.layerName]) {
      infoButtonBox.onClose?.();
      setInfoButtonBox({});
    }
  }, [infoButtonBox, selectedLayers, setInfoButtonBox]);

  function handleRemoveAllLayers() {
    if (!Object.keys(selectedLayers).length) return;
    setInfoButtonBox({});
    setLayerLegend({});
    setActualLayer('');
    setLayerAction('remove-all');
    setSelectedLayers({});
  }

  return (
    <ExplorerSidebar
      brand="Zarr Maps"
      sourceUrl="https://github.com/noc-oi/zarr-maps"
      documentationUrl="https://noc-oi.github.io/zarr-maps/docs/"
      onRemoveAll={handleRemoveAllLayers}
      renderCatalog={visible => (
        <DataExplorationSelection display={visible} setInfoButtonBox={setInfoButtonBox} />
      )}
      adjacentControl={<MapToggle />}
    >
      {Object.keys(layerLegend).map(legend => (
        <LayerLegendBox key={legend} layerLegendName={legend} />
      ))}
      {Object.keys(infoButtonBox).length !== 0 ? (
        <InfoButtonBox
          infoButtonBox={infoButtonBox}
          setInfoButtonBox={setInfoButtonBox}
          emptyValue={{}}
        />
      ) : null}
    </ExplorerSidebar>
  );
}
