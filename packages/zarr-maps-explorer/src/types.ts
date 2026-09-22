import type { ReactNode } from 'react';

export interface ExplorerInfoBox {
  title?: string;
  content?: ReactNode;
  layerName?: string;
  onClose?: () => void;
}

export interface ExplorerLayerLegend {
  dataDescription: [string, string];
  colormap: string;
  scale: [number, number];
}
