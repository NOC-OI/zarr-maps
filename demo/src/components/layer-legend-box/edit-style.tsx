import { EditColors } from './edit-colors';
import type { EditSelectorsProps } from './edit-selectors';

export function EditStyle({ layerLegendName }: EditSelectorsProps) {
  return (
    <div className="">
      <div className="text-sm text-center pt-2 pb-0 font-bold">Edit Style</div>
      <EditColors layerLegendName={layerLegendName} />
    </div>
  );
}
