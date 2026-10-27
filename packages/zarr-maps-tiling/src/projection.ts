import proj4 from 'proj4';
import type { BoundsProps, CRS, CRSDefinition, ResolvedCRS, XYLimitsProps } from './types';

const WGS84 = 'EPSG:4326';

function normalizeCode(code: string): string {
  const value = code.trim();
  if (/^urn:ogc:def:crs:EPSG::\d+$/i.test(value)) return `EPSG:${value.split('::').pop()}`;
  if (/^epsg:\d+$/i.test(value)) return value.toUpperCase();
  if (value.toUpperCase() === 'OGC:CRS84' || value.toUpperCase() === 'CRS:84') return WGS84;
  return value;
}

function metadataDefinition(attrs: Record<string, any>, arrAttrs: Record<string, any>): CRSDefinition | undefined {
  const multiscale = Array.isArray(attrs.multiscales) ? attrs.multiscales[0] : attrs.multiscales;
  return attrs['proj:wkt2'] ?? attrs['proj:projjson'] ?? attrs.proj?.wkt2 ?? attrs.proj?.projjson ?? attrs.proj4 ??
    multiscale?.['proj:wkt2'] ?? multiscale?.['proj:projjson'] ?? arrAttrs.crs_wkt ?? arrAttrs.spatial_ref;
}

/** Resolve an explicit or metadata-declared rectilinear source CRS. */
export function resolveCRS(
  crs: CRS,
  definition?: CRSDefinition,
  attrs: Record<string, any> = {},
  arrAttrs: Record<string, any> = {}
): ResolvedCRS {
  const code = normalizeCode(crs);
  const resolvedDefinition = definition ?? metadataDefinition(attrs, arrAttrs);
  if (resolvedDefinition !== undefined) proj4.defs(code, resolvedDefinition as any);
  if (!proj4.defs(code)) {
    throw new Error(`No proj4 definition is registered for ${code}. Pass options.proj4 or register it with proj4.defs().`);
  }
  const geographic = code === WGS84 || Boolean((proj4.defs(code) as any)?.projName === 'longlat');
  const transformer = proj4(WGS84, code);
  return {
    code,
    definition: resolvedDefinition,
    geographic,
    forward(position) {
      const value = transformer.forward(position);
      return [Number(value[0]), Number(value[1])];
    },
    inverse(position) {
      const value = transformer.inverse(position);
      return [Number(value[0]), Number(value[1])];
    }
  };
}

/** Transform a source rectangle to WGS84 by sampling a regular interior grid. */
export function sourceBoundsToGeographic(
  bounds: XYLimitsProps,
  projection: ResolvedCRS,
  segments = 64
): BoundsProps {
  const longitudes: number[] = [];
  const latitudes: number[] = [];
  const add = (x: number, y: number) => {
    const [lon, lat] = projection.inverse([x, y]);
    if (Number.isFinite(lon) && Number.isFinite(lat) && Math.abs(lat) <= 90) {
      longitudes.push(lon);
      latitudes.push(lat);
    }
  };
  for (let row = 0; row <= segments; row++) {
    const y = bounds.yMin + row / segments * (bounds.yMax - bounds.yMin);
    for (let column = 0; column <= segments; column++) {
      const x = bounds.xMin + column / segments * (bounds.xMax - bounds.xMin);
      add(x, y);
    }
  }
  if (!longitudes.length) throw new Error(`The bounds of ${projection.code} cannot be transformed to WGS84`);
  const south = Math.max(-90, Math.min(...latitudes));
  const north = Math.min(90, Math.max(...latitudes));
  const includesPole = north >= 89.999999 || south <= -89.999999;
  return {
    west: includesPole ? -180 : Math.max(-180, Math.min(...longitudes)),
    south,
    east: includesPole ? 180 : Math.min(180, Math.max(...longitudes)),
    north
  };
}
