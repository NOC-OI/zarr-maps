import { useLayersManagementHandle } from '../../application/use-layers';
import { EditColors } from './edit-colors';
import type { EditSelectorsProps } from './edit-selectors';

export function EditStyle({ layerLegendName }: EditSelectorsProps) {
  const { selectedLayers } = useLayersManagementHandle();

  return (
    <div className="">
      <div className="text-sm text-center pt-2 pb-0 font-bold">Edit Style</div>
      {['zarr-titiler', 'zarr-maps'].includes(selectedLayers[layerLegendName].dataType) && (
        <EditColors layerLegendName={layerLegendName} />
      )}
    </div>
  );
}
