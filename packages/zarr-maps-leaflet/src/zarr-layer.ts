import L from 'leaflet';
import type { LeafletLayerOptions } from './types';
import {
  ZarrTileProvider,
  type QueryGeometry,
  type QueryOptions,
  type QueryPosition,
  type TransectQueryOptions,
  type ZarrSelectors
} from 'zarr-maps-tiling';
import type { ColorMapName } from 'zarr-maps-colormap';

/**
 * Leaflet Zarr tile layer using the shared ZarrTileProvider.
 *
 * @remarks
 * This class extends `L.GridLayer` to create a custom tile layer that fetches
 * and renders tiles from a Zarr data source using the `ZarrTileProvider`.
 */
export class ZarrLayer extends L.GridLayer {
  /** Shared dataset and tile-rendering provider backing this Leaflet layer. */
  public provider: ZarrTileProvider;

  /**
   * Creates a Leaflet grid layer for a Zarr dataset or custom store.
   *
   * @param options - Zarr dataset options combined with Leaflet grid-layer options.
   */
  constructor(options: LeafletLayerOptions & L.GridLayerOptions) {
    super(options);
    const sizePoint = L.point((options.tileSize as any) ?? 256);
    const { tileSize, ...providerOpts } = options as any;

    this.provider = new ZarrTileProvider({
      ...providerOpts,
      tileSize: sizePoint.x,
      renderTarget: 'web-map'
    });
  }

  /** Adds the layer to a Leaflet map. Dataset loading can continue asynchronously. */
  onAdd(map: L.Map): this {
    super.onAdd(map);
    return this;
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

  /** Removes the layer and releases its provider resources. */
  onRemove(map: L.Map): this {
    this.provider.destroy();
    super.onRemove(map);
    return this;
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

    if (changed) this.redraw();
  }

  /**
   * Update the selectors used for slicing the Zarr dataset.
   * @param selectors - New selectors to apply.
   */
  updateSelectors(selectors: ZarrSelectors): void {
    const changed = this.provider.updateSelectors(selectors);
    if (changed) this.redraw();
  }

  /** Creates and asynchronously renders the canvas for a Leaflet tile coordinate. */
  createTile(coords: L.Coords, done: L.DoneCallback): HTMLCanvasElement {
    const tile = document.createElement('canvas');
    const size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;

    const key = `${coords.z}/${coords.x}/${coords.y}`;

    (tile as any)._zarrKey = key;

    const map = this._map!;

    const nwPoint = coords.scaleBy(size);
    const sePoint = nwPoint.add(size);

    const nw = map.unproject(nwPoint, coords.z);
    const se = map.unproject(sePoint, coords.z);

    const boundsDeg = { west: nw.lng, south: se.lat, east: se.lng, north: nw.lat };

    (async () => {
      const ok = await this.provider.readyPromise;
      if (!ok) return done(undefined, tile);

      const nativeZ = Math.min(coords.z, (this.options as any).maxZoom ?? coords.z);

      const rendered = await this.provider.renderTile(boundsDeg, nativeZ, key);

      const ctx = tile.getContext('2d')!;
      ctx.clearRect(0, 0, tile.width, tile.height);
      ctx.drawImage(rendered as HTMLCanvasElement, 0, 0);

      done(undefined, tile);
    })().catch(() => done(undefined, tile));

    return tile;
  }

  /** @internal */
  _removeTile(key: string) {
    const tile = (this as any)._tiles?.[key]?.el as any;
    if (tile?._zarrKey) this.provider.abortTile(tile._zarrKey);
    return (L.GridLayer.prototype as any)._removeTile.call(this, key);
  }
}
