import L from 'leaflet';
import type { LeafletLayerOptions } from './types';
import type { ColorMapName, ZarrSelectorsProps } from '../core/types';
import { ZarrLayerProvider } from '../core/zarr-layer-provider';

/**
 * Leaflet Zarr tile layer using the shared ZarrLayerProvider.
 *
 * @remarks
 * This class extends `L.GridLayer` to create a custom tile layer that fetches
 * and renders tiles from a Zarr data source using the `ZarrLayerProvider`.
 *
 * @param options - Configuration options for the Zarr layer. Instance of {@link LeafletLayerOptions} & {@link L.GridLayerOptions}.
 */
export class ZarrLayer extends L.GridLayer {
  public provider: ZarrLayerProvider;

  constructor(options: LeafletLayerOptions & L.GridLayerOptions) {
    super(options);
    const sizePoint = L.point((options.tileSize as any) ?? 256);
    const { tileSize, ...providerOpts } = options as any;

    this.provider = new ZarrLayerProvider({
      ...providerOpts,
      tileSize: sizePoint.x
    });
  }

  onAdd(map: L.Map) {
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

  onRemove(map: L.Map) {
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
  updateStyle(opts: { opacity?: number; scale?: [number, number]; colormap?: ColorMapName }) {
    const changed = this.provider.updateStyle({ scale: opts.scale, colormap: opts.colormap });
    if (opts.opacity !== undefined) this.setOpacity(opts.opacity);

    if (changed) this.redraw();
  }

  /**
   * Update the selectors used for slicing the Zarr dataset.
   * @param selectors - New selectors to apply.
   */
  updateSelectors(selectors: { [key: string]: ZarrSelectorsProps }) {
    const changed = this.provider.updateSelectors(selectors);
    if (changed) this.redraw();
  }

  createTile(coords: L.Coords, done: L.DoneCallback) {
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

  _removeTile(key: string) {
    const tile = (this as any)._tiles?.[key]?.el as any;
    if (tile?._zarrKey) this.provider.abortTile(tile._zarrKey);
    return (L.GridLayer.prototype as any)._removeTile.call(this, key);
  }
}
