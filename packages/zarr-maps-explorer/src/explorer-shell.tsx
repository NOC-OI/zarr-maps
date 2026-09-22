import type { ReactNode } from 'react';

interface ExplorerShellProps {
  brand: string;
  toolbar: ReactNode;
  panel: ReactNode;
  adjacentControl?: ReactNode;
  children?: ReactNode;
}

export function ExplorerShell({
  brand,
  toolbar,
  panel,
  adjacentControl,
  children
}: ExplorerShellProps) {
  return (
    <div className="absolute left-2 top-2 z-10 flex sm:left-4 sm:top-4">
      <div className="sidebar relative z-20 w-[min(390px,calc(100vw-16px))] sm:w-[390px]">
        <div className="sidebar__brand">
          <div className="flex flex-1 uppercase">
            <strong>{brand}</strong>
          </div>
          <div className="flex flex-row! items-center gap-1">{toolbar}</div>
        </div>
        <div>{panel}</div>
      </div>
      {adjacentControl}
      {children}
    </div>
  );
}
