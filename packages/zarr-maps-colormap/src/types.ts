/** Structure of the global color map registry. */
export interface ColorMapInfo {
  [key: string]: { interpolate: boolean; colors: number[][] };
}

/** Numerical range and colors used to render a scalar field. */
export interface ColorScaleProps {
  min: number;
  max: number;
  colors: number[][] | string[];
}
