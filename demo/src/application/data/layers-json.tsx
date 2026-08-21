import type { LayersJsonType } from '../../types';

export const layersJson: LayersJsonType = {
  'zarr-maps': {
    layerNames: {
      icechunk_precipitation: {
        dataType: 'zarr-maps',
        dataDescription: ['Precipitation', 'mm/hr'],
        content:
          'Virtualized NASA IMERG precipitation stored in Icechunk with native multiscales.',
        params: {
          url: 'https://carbonplan-share.s3.us-west-2.amazonaws.com/zarr-layer-examples/pipeline/multi_level_virtual_hybrid_icechunk.icechunk',
          variable: 'IMERG_PRECTOT',
          scale: [0, 10],
          colormap: 'cool',
          zarrVersion: 3,
          crs: 'EPSG:4326'
        }
      },
      salinity_pyramid_geozarr: {
        dataType: 'zarr-maps',
        dataDescription: ['Salinity', ''],
        content:
          'Salinity outputs from NEMO NPD-EORCA1 model. This dataset contains 3D data (time, latitude, longitude) stored in a Zarr v2 format and EPSG:4326 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/noc-npd-era5-demov2/prod9/eorca1_T/T1m/so_abs',
          variable: 'so_abs',
          scale: [30, 37],
          crs: 'EPSG:4326',
          zarrVersion: 3,
          colormap: 'inferno',
          multiscaleFormat: 'geozarr',
          latIsAscending: true,
        }
      },
      salinity_pyramid_v2: {
        dataType: 'zarr-maps',
        dataDescription: ['Salinity', ''],
        content:
          'Salinity outputs from NEMO NPD-EORCA1 model. This dataset contains 3D data (time, latitude, longitude) stored in a Zarr v2 format with a multiscale pyramid structure and EPSG:3857 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/nemotest101/pyramid2/T1d/sos_abs.zarr',
          variable: 'sos_abs',
          zarrVersion: 2,
          colormap: 'inferno',
          scale: [30, 37],
          crs: undefined,
          opacity: undefined,
          dimensionNames: undefined,
          tileSize: undefined,
          maxZoom: 12
        }
      },
      'temperature-pyramid_v3': {
        dataType: 'zarr-maps',
        dataDescription: ['Temperature', 'deg C'],
        content:
          'Temperature outputs from NEMO NPD-EORCA1 model. This dataset contains 3D temperature data (time, latitude, longitude) stored in a Zarr v3 format with a multiscale pyramid structure and EPSG:3857 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/noc-npd-era5-demo/npd-eorca1-era5v1/gn/T1y/tos_con',
          variable: 'tos_con',
          zarrVersion: 3,
          colormap: 'hot',
          scale: [0, 27],
          crs: undefined,
          opacity: undefined,
          dimensionNames: undefined,
          tileSize: undefined,
          maxZoom: 12
        }
      },
      'temperature-4d_pyramid_v3': {
        dataType: 'zarr-maps',
        dataDescription: ['Temperature', 'deg C'],
        content:
          'Temperature outputs from NEMO NPD-EORCA025 model. This dataset contains 4D temperature data (time, depth, latitude, longitude) stored in a Zarr v3 format with a multiscale pyramid structure and EPSG:3857 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/noc-npd-era5-demo/npd-eorca025-era5v1/gn/T1y_4d/thetao_con',
          variable: 'thetao_con',
          zarrVersion: 3,
          colormap: 'BrBG',
          scale: [0, 27],
          crs: undefined,
          opacity: undefined,
          dimensionNames: undefined,
          tileSize: undefined,
          maxZoom: 12
        }
      },
      pressure_florence_v3: {
        dataType: 'zarr-maps',
        dataDescription: ['Wind Speed', 'm/s'],
        content:
          'Surface pressure data for Hurricane Florence from ERA5 reanalysis. This dataset contains 3D surface pressure data (time, latitude, longitude) stored in a Zarr v3 format and EPSG:4326 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/hurricanes/era5/florence',
          variable: 'surface_pressure',
          zarrVersion: 3,
          colormap: 'jet',
          scale: [100000, 104000],
          noDataMin: 0,
          noDataMax: 999999,
          crs: undefined,
          opacity: undefined,
          dimensionNames: undefined,
          tileSize: undefined,
          maxZoom: undefined
        }
      }
    }
  },
  Titiler: {
    layerNames: {
      sos_abs_v2: {
        dataType: 'zarr-titiler',
        dataDescription: ['Salinity', ''],
        content:
          'Salinity outputs from NEMO NPD-EORCA1 model. This dataset contains 3D data (time, latitude, longitude) stored in a Zarr v2 format and EPSG:4326 coordinate reference system.',
        params: {
          url: 'https://atlantis-vis-o.s3-ext.jc.rl.ac.uk/nemotest101/T1d/sos_abs.zarr',
          variable: 'sos_abs',
          scale: [30, 37]
        }
      }
    }
  }
};
