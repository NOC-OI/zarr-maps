/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import type { ZarrTileOptions } from 'zarr-maps-tiling';

/**
 * Configuration for a 2D raster (image) layer visualization in OpenLayers.
 */
export interface OLLayerOptions extends ZarrTileOptions {
  id: string;
  opacity?: number;
}

export interface ZarrImageElement extends HTMLImageElement {
  _zarrKey?: string;
  _zarrObjectUrl?: string;
}
