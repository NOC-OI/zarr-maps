// ol/zarr-layer.ts
import TileLayer from 'ol/layer/Tile';
import DataTileSource from 'ol/source/DataTile';
import { createXYZ } from 'ol/tilegrid';
import { transformExtent } from 'ol/proj';
import type { Extent } from 'ol/extent';

import type { OLLayerOptions } from './types';
import type { ColorMapName, ZarrSelectorsProps } from '../core/types';
import { ZarrLayerProvider } from '../core/zarr-layer-provider';

type BoundsDeg = { west: number; south: number; east: number; north: number };

export class ZarrLayer extends TileLayer<DataTileSource> {
  public provider: ZarrLayerProvider;

  private tileGrid = createXYZ({ tileSize: 256, maxZoom: 22 });

  constructor(options: OLLayerOptions) {
    const tileSize = options.tileSize ?? 256;
    const maxZoom = options.maxZoom ?? 8;

    const tileGrid = createXYZ({ tileSize, maxZoom });

    const provider = new ZarrLayerProvider({
      ...options,
      tileSize,
      maxZoom
    });

    const source = new DataTileSource({
      tileGrid,
      // If your data crosses the antimeridian and you want wrapping, set true.
      // (If not, keep false to avoid duplicate requests.)
      wrapX: false,

      // DataTile expects a loader that returns ImageData (or typed arrays).
      loader: async (z: number, x: number, y: number) => {
        // IMPORTANT: DataTile gives y in XYZ space already (not OL's "negative y" scheme),
        // because the loader signature is (z, x, y).
        // So no "y = -tileCoord[2]-1" needed here.

        const key = `${z}/${x}/${y}`;

        const ok = await provider.readyPromise;
        if (!ok) return emptyImageData(tileSize, tileSize);

        // Choose nativeZ the same way you did in Leaflet.
        const nativeZ = Math.min(z, maxZoom);

        // Compute extent in map projection (EPSG:3857 by default for XYZ grid)
        const extent3857 = tileGrid.getTileCoordExtent([z, x, y]) as Extent;

        // Convert to lon/lat degrees (EPSG:4326)
        const extent4326 = transformExtent(extent3857, 'EPSG:3857', 'EPSG:4326');
        const boundsDeg: BoundsDeg = {
          west: extent4326[0],
          south: extent4326[1],
          east: extent4326[2],
          north: extent4326[3]
        };

        // Render using your provider
        const rendered = await provider.renderTile(boundsDeg, nativeZ, key);

        // Convert rendered canvas -> ImageData for OL
        // (Your provider returns HTMLCanvasElement)
        const canvas = rendered as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return emptyImageData(tileSize, tileSize);

        return ctx.getImageData(0, 0, tileSize, tileSize) as any;
      }
    });

    super({
      source,
      opacity: options.opacity ?? 1
    });

    this.provider = provider;
    this.tileGrid = tileGrid;
  }

  async load(): Promise<boolean> {
    return await this.provider.readyPromise;
  }

  destroy() {
    this.provider.destroy();
    this.setSource(null as any);
  }

  updateStyle(opts: { opacity?: number; scale?: [number, number]; colormap?: ColorMapName }) {
    const changed = this.provider.updateStyle({ scale: opts.scale, colormap: opts.colormap });
    if (opts.opacity !== undefined) this.setOpacity(opts.opacity);

    if (changed) {
      this.getSource()?.refresh();
    }
  }

  updateSelectors(selectors: { [key: string]: ZarrSelectorsProps }) {
    const changed = this.provider.updateSelectors(selectors);
    if (changed) {
      this.getSource()?.refresh();
    }
  }
}

function emptyImageData(w: number, h: number): ImageData {
  return new ImageData(new Uint8ClampedArray(w * h * 4), w, h);
}
