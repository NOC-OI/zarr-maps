import { DimensionNamesProps } from './types';

/**
 * Default colormap for data visualization.
 */
export const DEFAULT_COLORMAP = 'viridis';

/**
 * Default data scale range for visualization.
 */
export const DEFAULT_SCALE: [number, number] = [0, 1];

/**
 * Default opacity for layer visualization.
 */
export const DEFAULT_OPACITY = 1;

export const DIMENSION_ALIASES_DEFAULT: { [key in keyof DimensionNamesProps]: string[] } = {
  lat: ['lat', 'latitude', 'y', 'Latitude', 'Y'],
  lon: ['lon', 'longitude', 'x', 'Longitude', 'X', 'lng'],
  time: ['time', 't', 'Time', 'time_counter'],
  elevation: ['depth', 'z', 'Depth', 'level', 'lev', 'deptht', 'elevation', 'depthu', 'depthv']
};

export const CF_MAPPINGS: { [key in keyof DimensionNamesProps]: string[] } = {
  lat: ['latitude'],
  lon: ['longitude'],
  time: ['time'],
  elevation: ['height', 'depth', 'altitude', 'air_pressure', 'pressure', 'geopotential_height']
};
