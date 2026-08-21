import { DEFAULT_OPACITY } from 'zarr-maps-tiling';
import type { keyable, SelectedLayer, TitilerOptions } from '../../types';
import { ZARR_TILE_SERVER_URL } from './utils';
import L from 'leaflet';
import Tile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

export class GetZarrLayer {
  layerName: SelectedLayer;
  actualLayer: string;
  layer: any;
  url: string;
  params: TitilerOptions;
  mapType: 'leaflet' | 'ol';
  constructor(
    layerName: SelectedLayer,
    actualLayer: string,
    mapType: 'leaflet' | 'ol' = 'leaflet'
  ) {
    this.layerName = layerName;
    this.params = layerName.params as TitilerOptions;
    this.actualLayer = actualLayer;
    this.layer = null;
    this.url = this.params.url;
    this.mapType = mapType;
  }

  async getTile() {
    const params: keyable = {
      url: this.params.url,
      variable: this.params.variable,
      reference: false,
      decode_times: true,
      return_mask: true
    };
    if (this.layerName.params?.colormap) {
      params.colormap_name = this.layerName.params.colormap;
    }
    params.rescale = this.layerName.params?.scale
      ? `${this.layerName.params.scale[0]},${this.layerName.params.scale[1]}`
      : '0,1';
    let dropDims = '';
    const dimensionsInfo = this.layerName.dimensions || {};
    Object.keys(dimensionsInfo).forEach(dimension => {
      if (dimension === 'time') {
        const value = dimensionsInfo.time.values[
          dimensionsInfo['time'].selected as number
        ] as string;
        params.date_time = value.split('T')[0];
      } else {
        const dimensionValue =
          dimensionsInfo[dimension].values[dimensionsInfo[dimension].selected as number];
        dropDims += `${dimension}=${dimensionValue},`;
      }
    });
    if (dropDims) {
      dropDims = dropDims.slice(0, -1);
      params.drop_dim = dropDims;
    }

    const encodedParams: keyable = {};
    for (const key in params) {
      encodedParams[key] = encodeURIComponent(params[key]);
    }
    const queryString = Object.keys(encodedParams)
      .map(key => `${encodeURIComponent(key)}=${encodedParams[key]}`)
      .join('&');

    const tileServerEnpoint = 'tiles/WebMercatorQuad/{z}/{x}/{y}@1x';
    const newUrl = `${ZARR_TILE_SERVER_URL}${tileServerEnpoint}?${queryString}`;

    let layer;
    if (this.mapType === 'ol') {
      layer = this.getOLTileLayer(newUrl);
    } else {
      layer = this.getLeafletTileLayer(newUrl);
    }
    this.layer = layer;
    return layer;
  }

  getOLTileLayer(newUrl: string) {
    const layer = new Tile({
      source: new XYZ({
        url: newUrl,
        maxZoom: 20
      }),
      opacity: this.params.opacity ?? DEFAULT_OPACITY
    });
    layer.set('id', this.actualLayer);
    return layer;
  }

  getLeafletTileLayer(newUrl: string) {
    const layer = L.tileLayer(newUrl, {
      opacity: this.params.opacity ?? DEFAULT_OPACITY,
      maxZoom: 20,
      id: this.actualLayer
    });
    return layer;
  }
}
