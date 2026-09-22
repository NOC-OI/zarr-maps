import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, type ReactNode } from 'react';
import Draggable from 'react-draggable';

interface InfoPanelProps {
  title?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function InfoPanel({ title, children, onClose }: InfoPanelProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable nodeRef={nodeRef} cancel=".clickable">
      <div
        className="info-panel absolute left-full top-0 z-20 ml-4 overflow-x-hidden overflow-y-auto whitespace-pre-line text-white max-sm:fixed! max-sm:bottom-2 max-sm:left-2! max-sm:top-auto! max-sm:m-0 max-sm:max-h-[52vh]"
        id="info-subsection"
        ref={nodeRef}
      >
        <div className="info-panel__topbar">
          <span>{title}</span>
          <button
            type="button"
            title="Close panel"
            aria-label="Close panel"
            onClick={onClose}
            className="clickable flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 text-[#999] hover:bg-white/8 hover:text-[#d49511]"
          >
            <CancelIcon fontSize="small" />
          </button>
        </div>
        <div className="markdown-content max-h-[82vh] overflow-y-auto overflow-x-hidden">
          <div>{children}</div>
        </div>
      </div>
    </Draggable>
  );
}
