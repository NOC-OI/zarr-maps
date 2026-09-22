import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, type ReactNode } from 'react';
import Draggable from 'react-draggable';

interface LegendPanelProps {
  title: string;
  legend: ReactNode;
  children?: ReactNode;
  onClose: () => void;
}

export function LegendPanel({ title, legend, children, onClose }: LegendPanelProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".legend-drag-handle" cancel=".clickable">
      <div
        className="absolute left-full top-0 z-30 ml-4 flex max-h-[calc(100vh-32px)] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-[18px] border border-white/18 bg-[rgba(17,17,17,0.92)] text-white shadow-[0_18px_55px_rgba(0,0,0,0.45)] backdrop-blur-[18px] backdrop-saturate-125"
        ref={nodeRef}
        id="legend-box"
      >
        <div className="legend-drag-handle flex cursor-move items-center gap-3 border-b border-white/12 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#888]">
              Layer controls
            </div>
            <div className="truncate text-[13px] font-bold text-[#f1f1f1]">{title}</div>
          </div>
          <button
            type="button"
            title="Close layer controls"
            aria-label="Close layer controls"
            onClick={onClose}
            className="clickable flex h-8 w-8 items-center justify-center rounded-lg border-0 bg-transparent p-0 text-[#999] hover:bg-white/8 hover:text-[#d49511]"
          >
            <CancelIcon fontSize="small" />
          </button>
        </div>
        <div className="overflow-y-auto p-3 [scrollbar-color:#555_transparent] [scrollbar-width:thin]">
          <section className="rounded-xl border border-white/12 bg-white/[.035] p-3">
            <div className="mb-2 text-[9px] font-extrabold uppercase tracking-[.1em] text-[#888]">
              Legend
            </div>
            <div className="flex flex-col items-center justify-center gap-2">{legend}</div>
          </section>
          {children}
        </div>
      </div>
    </Draggable>
  );
}
