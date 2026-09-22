import { colormapBuilder } from 'zarr-maps-colormap';
import type { ExplorerLayerLegend } from './types';

interface ColorBarProps {
  layerLegend: ExplorerLayerLegend;
  steps?: number;
}

export function ColorBar({ layerLegend, steps = 30 }: ColorBarProps) {
  const [label, units] = layerLegend.dataDescription ?? ['', ''];
  const colors = colormapBuilder(layerLegend.colormap, '', steps) as number[][];
  const [minimum, maximum] = layerLegend.scale;

  return (
    <div className="z-40 block w-full">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="truncate text-[11px] font-bold text-[#e8e8e8]">{label}</p>
        <p className="shrink-0 text-[9px] font-semibold text-[#888]">{units}</p>
      </div>
      <div className="mb-1.5 flex justify-between">
        <p className="text-[9px] font-semibold tabular-nums text-[#aaa]">{minimum.toFixed(1)}</p>
        <p className="text-[9px] font-semibold tabular-nums text-[#aaa]">{maximum.toFixed(1)}</p>
      </div>
      <div className="flex h-3.5 overflow-hidden rounded-full ring-1 ring-white/10">
        {colors.map((color, index) => (
          <div
            className="min-w-0 flex-1"
            key={index}
            style={{ backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})` }}
          />
        ))}
      </div>
    </div>
  );
}
