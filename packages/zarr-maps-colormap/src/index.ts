export * from './types';
export * from './jsColormaps';

import { allColorScales } from './jsColormaps';

/** Name of a bundled Matplotlib-inspired colormap. */
export type ColorMapName = (typeof allColorScales)[number];
