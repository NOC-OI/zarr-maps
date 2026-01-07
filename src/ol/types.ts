/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import { ColorMapName, CRS, DimensionNamesProps, ZarrSelectors } from '../core';

/**
 * Configuration for a 2D raster (image) layer visualization in OpenLayers.
 */
export interface OLLayerOptions {
  id: string;
  url: string;
  variable: string;
  crs?: CRS | null;
  tileSize?: number;
  maxZoom?: number;
  scale?: [number, number];
  opacity?: number;
  colormap?: ColorMapName;
  selectors?: ZarrSelectors;
  zarrVersion?: 2 | 3;
  dimensionNames?: DimensionNamesProps;
  noDataMin?: number;
  noDataMax?: number;
}

export interface ZarrImageElement extends HTMLImageElement {
  _zarrKey?: string;
  _zarrObjectUrl?: string;
}
