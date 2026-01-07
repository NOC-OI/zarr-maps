import type { LayerFormType } from '../../../application/data/schemas';

export function getDefaultLayerValues(): LayerFormType {
  return {
    dataType: 'zarr-maps',
    dataDescription: ['', ''],
    content: '',
    params: {
      url: '',
      variable: '',
      scale: [0, 1],
      colormap: 'viridis',
      opacity: 1,
      crs: undefined
    }
  };
}
