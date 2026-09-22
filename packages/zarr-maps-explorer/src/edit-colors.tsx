import Slider from '@mui/material/Slider';
import { useState } from 'react';
import type { ColorMapName } from 'zarr-maps-colormap';
import { Button } from './button';
import { ColormapSelect } from './colormap-select';

interface EditColorsProps {
  id: string;
  initialColormap: ColorMapName;
  initialScale: [number, number];
  onApply: (appearance: { colormap: ColorMapName; scale: [number, number] }) => void;
}

export function EditColors({ id, initialColormap, initialScale, onApply }: EditColorsProps) {
  const [scale, setScale] = useState<[number, number]>(initialScale);
  const [colormap, setColormap] = useState<ColorMapName>(initialColormap);
  const colormapId = `layer-colormap-${id.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/12 bg-white/[.035] p-4 text-white">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-[#dedede]" htmlFor={colormapId}>
          Color map
        </label>
        <ColormapSelect id={colormapId} value={colormap} onChange={setColormap} />
      </div>
      <div className="flex flex-col gap-1.5 border-t border-white/10 pt-4">
        <p className="text-[11px] font-bold text-[#dedede]">Value range</p>
        <div className="flex items-center gap-3">
          <span className="min-w-10 text-right font-mono text-[10px] text-[#aaa]">{scale[0]}</span>
          <Slider
            getAriaLabel={() => 'Scale range'}
            value={scale}
            min={scale[0] - 10}
            max={scale[1] + 10}
            disableSwap
            step={0.1}
            onChange={(_, value) => {
              if (Array.isArray(value)) setScale([value[0], value[1]]);
            }}
            className="clickable"
            color="success"
          />
          <span className="min-w-10 font-mono text-[10px] text-[#aaa]">{scale[1]}</span>
        </div>
      </div>
      <Button
        onClick={() => onApply({ colormap, scale })}
        className="w-full justify-center border border-[#d49511]/55 bg-[#d49511]! py-2! text-[11px] font-extrabold tracking-[.06em] text-[#181818] hover:bg-[#e0a82f]!"
      >
        APPLY APPEARANCE
      </Button>
    </div>
  );
}
