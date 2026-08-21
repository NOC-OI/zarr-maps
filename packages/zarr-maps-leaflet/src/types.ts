/* -------------------------------------------------------------------------- */
/*                            VISUALIZATION OPTIONS                           */
/* -------------------------------------------------------------------------- */

import type { ZarrTileOptions } from 'zarr-maps-tiling';

/**
 * Configuration for a 2D raster (image) layer visualization in Leaflet.
 */
export interface LeafletLayerOptions extends ZarrTileOptions {
  id: string;
  opacity?: number;
}
