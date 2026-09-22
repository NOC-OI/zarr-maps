import { useCallback } from 'react';
import {
  DEFAULT_COLORMAP,
  DEFAULT_SCALE,
  type QueryPosition,
  type ZarrTileProvider
} from 'zarr-maps-tiling';
import { PointQueryInfo, TransectQueryInfo, type PointQueryMode } from 'zarr-maps-explorer';

export function PointQueryPanel({
  provider,
  layerName,
  position
}: {
  provider: ZarrTileProvider;
  layerName: string;
  position: QueryPosition;
}) {
  const query = useCallback(
    (mode: PointQueryMode, signal: AbortSignal) => {
      const options = { level: 'finest' as const, signal };
      if (mode === 'profile') return provider.getVerticalProfile(position, undefined, options);
      if (mode === 'time') return provider.getTimeSeries(position, undefined, options);
      return provider.queryData({ type: 'Point', coordinates: position }, undefined, options);
    },
    [position, provider]
  );

  return (
    <PointQueryInfo
      layerName={layerName}
      position={position}
      hasProfile={(provider.dimensionValues.elevation?.length ?? 0) > 1}
      hasTimeSeries={(provider.dimensionValues.time?.length ?? 0) > 1}
      query={query}
    />
  );
}

export function TransectQueryPanel({
  provider,
  layerName,
  registerCapture,
  clearCapture,
  colormap = DEFAULT_COLORMAP,
  scale = DEFAULT_SCALE
}: {
  provider: ZarrTileProvider;
  layerName: string;
  registerCapture: (handler: ((position: QueryPosition) => void) | null) => void;
  clearCapture: () => void;
  colormap?: string;
  scale?: [number, number];
}) {
  const query = useCallback(
    (
      start: QueryPosition,
      end: QueryPosition,
      full: boolean,
      samples: number,
      signal: AbortSignal
    ) => {
      const options = { samples, concurrency: 6, signal };
      return full
        ? provider.getFullTransect(start, end, undefined, options)
        : provider.getTransect(start, end, undefined, options);
    },
    [provider]
  );

  return (
    <TransectQueryInfo
      layerName={layerName}
      hasElevation={(provider.dimensionValues.elevation?.length ?? 0) > 1}
      registerCapture={registerCapture}
      clearCapture={clearCapture}
      query={query}
      colormap={colormap}
      scale={scale}
    />
  );
}
