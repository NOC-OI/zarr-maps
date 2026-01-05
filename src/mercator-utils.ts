const R = 6378137;
const MAX_LAT = 85.05112878;

export function lonDegToMercX(lonDeg: number) {
  return (R * lonDeg * Math.PI) / 180;
}

export function latDegToMercY(latDeg: number) {
  const clamped = Math.max(-MAX_LAT, Math.min(MAX_LAT, latDeg));
  const rad = (clamped * Math.PI) / 180;
  return R * Math.log(Math.tan(Math.PI / 4 + rad / 2));
}
