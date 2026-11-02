/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import type { ZarrTileOptions } from 'zarr-maps-tiling';

/**
 * Configuration for a 2D raster (image) layer visualization in Leaflet.
 * The inherited `crs` and `proj4` options describe the rectilinear Zarr source
 * grid; Leaflet continues to request tiles using geographic map bounds.
 */
export interface LeafletLayerOptions extends ZarrTileOptions {
  id: string;
  opacity?: number;
}
