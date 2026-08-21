import type {
  FullTransectResult,
  QueryBackend,
  QueryOptions,
  QueryPosition,
  QueryResult,
  TransectQueryOptions,
  TransectResult,
  ZarrSelectors,
  ZarrSelectorsProps
} from './types';

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
}

function requireDimension(backend: QueryBackend, dimension: 'time' | 'elevation') {
  const values = backend.dimensionValues[dimension];
  if (!values?.length) throw new Error(`The dataset has no queryable ${dimension} dimension`);
  return values;
}

function scalarizeSelectors(backend: QueryBackend, overrides: ZarrSelectors = {}): ZarrSelectors {
  const selectors = { ...backend.selectors, ...overrides };
  for (const [dimension, selector] of Object.entries(selectors)) {
    if (Array.isArray(selector.selected)) {
      selectors[dimension] = { selected: selector.selected[0], type: selector.type };
    }
  }
  return selectors;
}

function rangeSelector(
  backend: QueryBackend,
  dimension: string,
  length: number
): ZarrSelectorsProps {
  const offset = backend.queryIndexOffsets?.[dimension] ?? 0;
  return { selected: [offset, offset + length], type: 'index' };
}

/**
 * Queries every time coordinate at one point and the selected elevation.
 *
 * @param backend - Provider implementing the query backend contract.
 * @param position - WGS84 `[longitude, latitude]` position.
 * @param selectors - Optional selections for dimensions other than time.
 * @param options - Resolution, coordinate output, and cancellation options.
 * @returns Values and coordinates returned by the backend.
 * @throws If the dataset has no queryable time dimension.
 */
export function getTimeSeries(
  backend: QueryBackend,
  position: QueryPosition,
  selectors: ZarrSelectors = {},
  options: QueryOptions = {}
): Promise<QueryResult> {
  const time = requireDimension(backend, 'time');
  return backend.queryData(
    { type: 'Point', coordinates: position },
    {
      ...scalarizeSelectors(backend, selectors),
      time: rangeSelector(backend, 'time', time.length)
    },
    options
  );
}

/**
 * Queries every elevation coordinate at one point and the selected time.
 *
 * @param backend - Provider implementing the query backend contract.
 * @param position - WGS84 `[longitude, latitude]` position.
 * @param selectors - Optional selections for dimensions other than elevation.
 * @param options - Resolution, coordinate output, and cancellation options.
 * @returns Values and coordinates returned by the backend.
 * @throws If the dataset has no queryable elevation dimension.
 */
export function getVerticalProfile(
  backend: QueryBackend,
  position: QueryPosition,
  selectors: ZarrSelectors = {},
  options: QueryOptions = {}
): Promise<QueryResult> {
  const elevation = requireDimension(backend, 'elevation');
  return backend.queryData(
    { type: 'Point', coordinates: position },
    {
      ...scalarizeSelectors(backend, selectors),
      elevation: rangeSelector(backend, 'elevation', elevation.length)
    },
    options
  );
}

/**
 * Builds evenly spaced WGS84 samples along the shortest longitude path.
 *
 * @param start - Start `[longitude, latitude]` in degrees.
 * @param end - End `[longitude, latitude]` in degrees.
 * @param samples - Number of positions to return; values below two are clamped to two.
 */
export function sampleTransectPositions(
  start: QueryPosition,
  end: QueryPosition,
  samples: number = 64
): QueryPosition[] {
  const count = Math.max(2, Math.floor(samples));
  const longitudeDelta = ((end[0] - start[0] + 540) % 360) - 180;
  return Array.from({ length: count }, (_, index) => {
    const fraction = index / (count - 1);
    const longitude = ((start[0] + longitudeDelta * fraction + 540) % 360) - 180;
    return [longitude, start[1] + (end[1] - start[1]) * fraction];
  });
}

function distanceKm(a: QueryPosition, b: QueryPosition): number {
  const radians = Math.PI / 180;
  const lat1 = a[1] * radians;
  const lat2 = b[1] * radians;
  const deltaLat = (b[1] - a[1]) * radians;
  const deltaLon = (((b[0] - a[0] + 540) % 360) - 180) * radians;
  const h =
    Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return 6371.0088 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function cumulativeDistances(positions: QueryPosition[]): number[] {
  const distances = [0];
  for (let index = 1; index < positions.length; index++) {
    distances.push(distances[index - 1] + distanceKm(positions[index - 1], positions[index]));
  }
  return distances;
}

async function mapConcurrent<T, R>(
  values: T[],
  concurrency: number,
  signal: AbortSignal | undefined,
  mapper: (value: T, index: number) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;
  const worker = async () => {
    while (nextIndex < values.length) {
      throwIfAborted(signal);
      const index = nextIndex++;
      results[index] = await mapper(values[index], index);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(values.length, Math.max(1, Math.floor(concurrency))) }, worker)
  );
  return results;
}

/**
 * Queries one scalar level along a line between two WGS84 positions.
 *
 * @param backend - Provider implementing the query backend contract.
 * @param start - Start `[longitude, latitude]` in degrees.
 * @param end - End `[longitude, latitude]` in degrees.
 * @param selectors - Scalar selectors applied to every sampled position.
 * @param options - Sample count, concurrency, resolution, and cancellation options.
 */
export async function getTransect(
  backend: QueryBackend,
  start: QueryPosition,
  end: QueryPosition,
  selectors: ZarrSelectors = {},
  options: TransectQueryOptions = {}
): Promise<TransectResult> {
  const positions = sampleTransectPositions(start, end, options.samples);
  const scalarSelectors = scalarizeSelectors(backend, selectors);
  const results = backend.queryPoints
    ? await backend.queryPoints(positions, scalarSelectors, options)
    : await mapConcurrent(positions, options.concurrency ?? 6, options.signal, position =>
        backend.queryData({ type: 'Point', coordinates: position }, scalarSelectors, options)
      );
  return {
    variable: results[0]?.variable ?? '',
    positions,
    distancesKm: cumulativeDistances(positions),
    values: results.map(result => result.values[0] ?? null)
  };
}

/**
 * Queries all elevation levels along a line between two WGS84 positions.
 *
 * @param backend - Provider implementing the query backend contract.
 * @param start - Start `[longitude, latitude]` in degrees.
 * @param end - End `[longitude, latitude]` in degrees.
 * @param selectors - Selectors applied to dimensions other than elevation.
 * @param options - Sample count, concurrency, resolution, and cancellation options.
 * @throws If the dataset has no queryable elevation dimension.
 */
export async function getFullTransect(
  backend: QueryBackend,
  start: QueryPosition,
  end: QueryPosition,
  selectors: ZarrSelectors = {},
  options: TransectQueryOptions = {}
): Promise<FullTransectResult> {
  const elevations = Array.from<number | string>(
    requireDimension(backend, 'elevation') as ArrayLike<number | string>
  );
  const positions = sampleTransectPositions(start, end, options.samples);
  const scalarSelectors = scalarizeSelectors(backend, selectors);
  const elevationOffset = backend.queryIndexOffsets?.elevation ?? 0;
  if (backend.queryPoints) {
    const results = await backend.queryPoints(
      positions,
      {
        ...scalarSelectors,
        elevation: {
          selected: [elevationOffset, elevationOffset + elevations.length],
          type: 'index'
        }
      },
      options
    );
    const values = elevations.map(elevation =>
      results.map(result => {
        const coordinateKey =
          Object.keys(result.coordinates).find(key =>
            ['elevation', 'depth', 'level', 'lev', 'z'].includes(key.toLowerCase())
          ) ??
          Object.keys(result.coordinates).find(
            key =>
              result.coordinates[key].length === result.values.length && result.values.length > 1
          );
        const index = coordinateKey
          ? result.coordinates[coordinateKey].findIndex(value => value === elevation)
          : -1;
        return index >= 0 ? result.values[index] : null;
      })
    );
    return {
      variable: results[0]?.variable ?? '',
      positions,
      distancesKm: cumulativeDistances(positions),
      elevations,
      values
    };
  }
  let variable = '';
  const values: (number | null)[][] = [];
  for (let elevationIndex = 0; elevationIndex < elevations.length; elevationIndex++) {
    throwIfAborted(options.signal);
    const row = await mapConcurrent(positions, options.concurrency ?? 6, options.signal, position =>
      backend.queryData(
        { type: 'Point', coordinates: position },
        {
          ...scalarSelectors,
          elevation: { selected: elevationOffset + elevationIndex, type: 'index' }
        },
        options
      )
    );
    variable ||= row[0]?.variable ?? '';
    values.push(row.map(result => result.values[0] ?? null));
  }
  return {
    variable,
    positions,
    distancesKm: cumulativeDistances(positions),
    elevations,
    values
  };
}
