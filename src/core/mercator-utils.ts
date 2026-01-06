import { MAX_LAT, EARTH_RADIUS } from './constants';

export function lonDegToMercX(lonDeg: number) {
  return (EARTH_RADIUS * lonDeg * Math.PI) / 180;
}

export function latDegToMercY(latDeg: number) {
  const clamped = Math.max(-MAX_LAT, Math.min(MAX_LAT, latDeg));
  const rad = (clamped * Math.PI) / 180;
  return EARTH_RADIUS * Math.log(Math.tan(Math.PI / 4 + rad / 2));
}
