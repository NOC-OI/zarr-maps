import { ColorBar } from 'zarr-maps-explorer';
import { useLayersManagementHandle } from '../../application/use-layers';
import type { LayerLegendBoxProps, LayersLegendType } from '../../types';
import { EditSelectors } from './edit-selectors';
import { EditStyle } from './edit-style';
import { LegendPanel } from 'zarr-maps-explorer';

export function LayerLegendBox({ layerLegendName }: LayerLegendBoxProps) {
  const { layerLegend, setLayerLegend } = useLayersManagementHandle();

  function handleClose() {
    setLayerLegend((layerLegend: LayersLegendType) => {
      const newLayerLegend = { ...layerLegend };
      delete newLayerLegend[layerLegendName];
      return newLayerLegend;
    });
  }

  return (
    <LegendPanel
      title={layerLegendName}
      legend={<ColorBar layerLegend={layerLegend[layerLegendName]} />}
      onClose={handleClose}
    >
      <EditSelectors layerLegendName={layerLegendName} />
      <EditStyle layerLegendName={layerLegendName} />
    </LegendPanel>
  );
}
