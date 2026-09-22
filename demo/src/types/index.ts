import type { BoundsProps, ZarrTileOptions } from 'zarr-maps-tiling';
import type { ExplorerInfoBox, ExplorerLayerLegend, FlashMessageValue } from 'zarr-maps-explorer';

export interface keyable {
  [key: string]: any;
}

export interface LayerLegendBoxProps {
  layerLegendName: string;
}

export type InfoButtonBoxType = ExplorerInfoBox;

export type FlashMessageType = FlashMessageValue;

export interface DimensionLegendProps {
  values: (string | number)[];
  selected: number | [number, number];
  indices?: number[];
}

export interface LayersJsonType {
  [key: string]: {
    layerNames: LayerNamesType;
  };
}

export interface LayerNamesType {
  [key: string]: DataInfoType;
}

export interface DataInfoType {
  dataType: 'zarr-maps';
  dataDescription: [string, string];
  bbox?: BoundsProps;
  content?: string;
  tags?: string[];
  params: ZarrTileOptions & { opacity?: number };
}

export interface LayersLegendType {
  [key: string]: LayerLegendType;
}

export type LayerLegendType = ExplorerLayerLegend;

export interface SelectedLayersType {
  [key: string]: SelectedLayer;
}

export interface SelectedLayer extends DataInfoType {
  dimensions?: { [key: string]: DimensionLegendProps };
  slices?: { latIndex: number; lonIndex: number; elevationIndex: number };
  pyramidLevels?: string[];
}

export interface DimensionSelectorProps {
  dimension: string;
  values: (string | number)[];
  selectedIndex: number | [number, number];
  totalShape?: number[];
  layerLegendName: string;
}

export interface DataExplorationSelectionProps {
  display: boolean;
  setInfoButtonBox: React.Dispatch<React.SetStateAction<InfoButtonBoxType>>;
}
