import { DEFAULT_COLORMAP, DEFAULT_SCALE } from 'zarr-maps-tiling';
import { useLayersManagementHandle } from '../../application/use-layers';
import type { LayersLegendType } from '../../types';
import { EditColors as SharedEditColors } from 'zarr-maps-explorer';

export function EditColors({ layerLegendName }: { layerLegendName: string }) {
  const { setLayerLegend, setSelectedLayers, setActualLayer, setLayerAction, layerLegend } =
    useLayersManagementHandle();

  const handleSubmit = ({ colormap, scale }: { colormap: string; scale: [number, number] }) => {
    setLayerAction('update-colors');
    setActualLayer(layerLegendName);
    setLayerLegend((layerLegend: LayersLegendType) => {
      const newLayerLegend = { ...layerLegend };
      newLayerLegend[layerLegendName] = {
        ...newLayerLegend[layerLegendName],
        scale,
        colormap
      };
      return newLayerLegend;
    });
    setSelectedLayers(prev => {
      const updatedLayer = {
        ...prev[layerLegendName],
        params: {
          ...prev[layerLegendName].params,
          colormap,
          scale
        }
      };
      return { ...prev, [layerLegendName]: updatedLayer };
    });
  };

  return (
    <SharedEditColors
      id={layerLegendName}
      initialColormap={(layerLegend[layerLegendName]?.colormap || DEFAULT_COLORMAP) as never}
      initialScale={layerLegend[layerLegendName]?.scale || DEFAULT_SCALE}
      onApply={handleSubmit}
    />
  );
}
