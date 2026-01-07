/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import { ColorMapName, CRS, DimensionNamesProps, ZarrSelectorsProps } from '../core';

/**
 * Configuration for a 2D raster (image) layer visualization in Leaflet.
 */
export interface LeafletLayerOptions {
  id: string;
  url: string;
  variable: string;
  crs?: CRS | null;
  tileSize?: number;
  maxZoom?: number;
  scale?: [number, number];
  opacity?: number;
  colormap?: ColorMapName;
  selectors?: { [key: string]: ZarrSelectorsProps };
  zarrVersion?: 2 | 3;
  dimensionNames?: DimensionNamesProps;
  noDataMin?: number;
  noDataMax?: number;
}
