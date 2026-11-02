/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import type { ZarrTileOptions } from 'zarr-maps-tiling';

/**
 * Configuration for a 2D raster (image) layer visualization in OpenLayers.
 * The inherited `crs` and `proj4` options describe the rectilinear Zarr source
 * grid, independently of the OpenLayers view projection.
 */
export interface OLLayerOptions extends ZarrTileOptions {
  id: string;
  opacity?: number;
}

export interface ZarrImageElement extends HTMLImageElement {
  _zarrKey?: string;
  _zarrObjectUrl?: string;
}
