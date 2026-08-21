import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { get as getProjection, transformExtent } from 'ol/proj';
import type ImageTile from 'ol/ImageTile';
import {
  ZarrTileProvider,
  type QueryGeometry,
  type QueryOptions,
  type QueryPosition,
  type TransectQueryOptions,
  type ZarrSelectors
} from 'zarr-maps-tiling';
import type { ColorMapName } from 'zarr-maps-colormap';
import type { OLLayerOptions, ZarrImageElement } from './types';
import { TileCoord } from 'ol/tilecoord';

/**
 * OpenLayers Zarr tile layer using the shared ZarrTileProvider.
 *
 * @remarks
 * This class extends `TileLayer<XYZ>` to create a custom tile layer that fetches
 * and renders tiles from a Zarr data source using the `ZarrTileProvider`.
 */
export class ZarrLayer extends TileLayer<XYZ> {
  /** Shared dataset and tile-rendering provider backing this OpenLayers layer. */
  public provider: ZarrTileProvider;

  /**
   * Creates an OpenLayers tile layer for a Zarr dataset or custom store.
   *
   * @param options - Zarr dataset and OpenLayers tile-layer options.
   */
  constructor(options: OLLayerOptions) {
    const tileSize = (options.tileSize as number | undefined) ?? 256;

    const provider = new ZarrTileProvider({
      ...options,
      tileSize,
      renderTarget: 'web-map'
    });

    const source = ZarrLayer.createSource(
      tileSize,
      options,
      tile => void this.renderOlTile(tile, tileSize, options)
    );

    super({
      ...options,
      source
    });

    this.provider = provider;
    this.set('id', options.id);
  }

  /**
   * Loads the Zarr layer and returns a promise that resolves when the layer is ready.
   *
   * @returns A promise that resolves to `true` when the layer is ready.
   */
  async load(): Promise<boolean> {
    return await this.provider.readyPromise;
  }

  /** Queries data at a WGS84 point without changing the displayed selectors. */
  queryData(geometry: QueryGeometry, selectors?: ZarrSelectors, options?: QueryOptions) {
    return this.provider.queryData(geometry, selectors, options);
  }

  /** Queries every time coordinate at a WGS84 position. */
  getTimeSeries(position: QueryPosition, selectors?: ZarrSelectors, options?: QueryOptions) {
    return this.provider.getTimeSeries(position, selectors, options);
  }

  /** Queries every vertical coordinate at a WGS84 position. */
  getVerticalProfile(position: QueryPosition, selectors?: ZarrSelectors, options?: QueryOptions) {
    return this.provider.getVerticalProfile(position, selectors, options);
  }

  /** Queries one selected level along a line between two WGS84 positions. */
  getTransect(start: QueryPosition, end: QueryPosition, selectors?: ZarrSelectors, options?: TransectQueryOptions) {
    return this.provider.getTransect(start, end, selectors, options);
  }

  /** Queries all vertical levels along a line between two WGS84 positions. */
  getFullTransect(start: QueryPosition, end: QueryPosition, selectors?: ZarrSelectors, options?: TransectQueryOptions) {
    return this.provider.getFullTransect(start, end, selectors, options);
  }

  private static createSource(
    tileSize: number,
    options: OLLayerOptions,
    loadFn: (tile: ImageTile) => void
  ): XYZ {
    return new XYZ({
      tileSize,
      maxZoom: options.maxZoom ?? 22,

      tileUrlFunction: tileCoord => {
        if (!tileCoord) return '';
        const [z, x, y] = tileCoord as TileCoord;
        const yXYZ = -y - 1;
        return `zarr://${z}/${x}/${yXYZ}`;
      },

      tileLoadFunction: (tile, _src) => {
        loadFn(tile as ImageTile);
      }
    });
  }

  /** Releases the provider when OpenLayers disposes the layer. */
  override disposeInternal(): void {
    this.provider.destroy();
    super.disposeInternal();
  }

  /**
   * Update the visual style of the layer.
   * @param opts - Style options to update.
   * @param opts.opacity - Layer opacity.
   * @param opts.scale - [min, max] range for data scaling.
   * @param opts.colormap - Colormap name.
   */
  updateStyle(opts: { opacity?: number; scale?: [number, number]; colormap?: ColorMapName }): void {
    const changed = this.provider.updateStyle({ scale: opts.scale, colormap: opts.colormap });
    if (opts.opacity !== undefined) this.setOpacity(opts.opacity);
    if (changed) this.getSource()?.refresh();
  }

  /**
   * Update the selectors used for slicing the Zarr dataset.
   * @param selectors - New selectors to apply.
   */
  updateSelectors(selectors: ZarrSelectors): void {
    const changed = this.provider.updateSelectors(selectors);

    if (changed) {
      const src = this.getSource() as any;
      if (src?.setKey) src.setKey(this.provider.cacheKey);
      src?.refresh?.();
    }
  }

  private async renderOlTile(tile: ImageTile, tileSize: number, options: OLLayerOptions) {
    const img = tile.getImage() as ZarrImageElement;

    const tileCoord = tile.getTileCoord() as [number, number, number];
    if (!tileCoord) return;

    const [z, x, y] = tileCoord;
    const yXYZ = -y - 1;

    const key = `${z}/${x}/${yXYZ}`;
    img._zarrKey = key;

    const prevUrl = img._zarrObjectUrl as string | undefined;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
      img._zarrObjectUrl = undefined;
    }

    const source = this.getSource();
    const grid = source?.getTileGrid();
    if (!source || !grid) return;

    const extent = grid.getTileCoordExtent(tileCoord);
    // `options.crs` describes the Zarr dataset, not the OpenLayers view. XYZ
    // tile-grid extents use the source/view projection (Web Mercator by
    // default), including when the underlying GeoZarr coordinates are 4326.
    const proj = source.getProjection() ?? getProjection('EPSG:3857')!;
    const extent4326 = transformExtent(extent, proj, 'EPSG:4326');

    const boundsDeg = {
      west: extent4326[0],
      south: extent4326[1],
      east: extent4326[2],
      north: extent4326[3]
    };

    try {
      const ok = await this.provider.readyPromise;
      if (!ok) return;

      const nativeZ = Math.min(z, options.maxZoom ?? z);

      const rendered = await this.provider.renderTile(boundsDeg, nativeZ, key);
      const canvas = rendered as HTMLCanvasElement;

      const blob: Blob = await new Promise(resolve => {
        canvas.toBlob(b => resolve(b ?? new Blob()), 'image/png');
      });

      const url = URL.createObjectURL(blob);
      img._zarrObjectUrl = url;

      if (img._zarrKey !== key) {
        URL.revokeObjectURL(url);
        return;
      }

      img.src = url;
    } catch {}
  }
}
