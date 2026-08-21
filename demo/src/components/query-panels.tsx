import { useEffect, useMemo, useRef, useState } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import {
  type FullTransectResult,
  type QueryPosition,
  type QueryResult,
  type TransectResult,
  type ZarrTileProvider
} from 'zarr-maps-tiling';
import { colormapBuilder } from 'zarr-maps-colormap';
import { DEFAULT_COLORMAP, DEFAULT_SCALE } from 'zarr-maps-tiling';
import { CustomSwitch } from './ui/custom-switch';
import { Button } from './ui/button';

type Mode = 'point' | 'profile' | 'time';

function coordinates(result: QueryResult, mode: Mode): number[] {
  const needle = mode === 'time' ? 'time' : 'elevation';
  const key = Object.keys(result.coordinates).find(name =>
    needle === 'time'
      ? name.toLowerCase().includes('time')
      : ['elevation', 'depth', 'level', 'lev', 'z'].includes(name.toLowerCase())
  );
  return result.values.map((_, index) => {
    const value = key ? result.coordinates[key]?.[index] : index;
    if (typeof value === 'number') return value;
    const timestamp = Date.parse(String(value));
    return Number.isFinite(timestamp) ? timestamp / 1000 : Number(value) || index;
  });
}

function SeriesChart({ result, mode }: { result: QueryResult; mode: Exclude<Mode, 'point'> }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !result.values.length) return;
    const axis = { stroke: '#e5e7eb', grid: { stroke: '#4b5563' } };
    const x = coordinates(result, mode);
    const chart =
      mode === 'profile'
        ? new uPlot(
            {
              mode: 2,
              width: 380,
              height: 220,
              scales: { x: { time: false }, y: { time: false, dir: -1 } },
              series: [
                {},
                {
                  label: result.variable,
                  stroke: '#facc15',
                  width: 2,
                  points: { show: true, size: 4 },
                  facets: [
                    { scale: 'x', sorted: 0 },
                    { scale: 'y', sorted: 1 }
                  ]
                }
              ],
              axes: [
                { ...axis, scale: 'x', label: result.variable },
                { ...axis, scale: 'y', label: 'Elevation / depth' }
              ]
            },
            [[], [result.values, x]] as unknown as uPlot.AlignedData,
            ref.current
          )
        : new uPlot(
            {
              width: 380,
              height: 220,
              scales: { x: { time: true } },
              series: [{ label: 'Time' }, { label: result.variable, stroke: '#facc15', width: 2 }],
              axes: [axis, axis]
            },
            [x, result.values],
            ref.current
          );
    return () => chart.destroy();
  }, [mode, result]);
  return <div className="clickable mt-3 overflow-x-auto" ref={ref} />;
}

export function PointQueryPanel({
  provider,
  layerName,
  position
}: {
  provider: ZarrTileProvider;
  layerName: string;
  position: QueryPosition;
}) {
  const [mode, setMode] = useState<Mode>('point');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    const options = { level: 'finest' as const, signal: controller.signal };
    const query =
      mode === 'profile'
        ? provider.getVerticalProfile(position, undefined, options)
        : mode === 'time'
          ? provider.getTimeSeries(position, undefined, options)
          : provider.queryData({ type: 'Point', coordinates: position }, undefined, options);
    void query
      .then(setResult)
      .catch(reason => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Query failed');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [mode, position, provider]);
  const profile = (provider.dimensionValues.elevation?.length ?? 0) > 1;
  const time = (provider.dimensionValues.time?.length ?? 0) > 1;
  return (
    <div className="text-sm">
      <div>Layer: {layerName}</div>
      <div>
        Position: {position[0].toFixed(5)}, {position[1].toFixed(5)}
      </div>
      <div className="clickable mt-3 flex gap-2">
        {(['point', ...(profile ? ['profile'] : []), ...(time ? ['time'] : [])] as Mode[]).map(
          item => (
          <Button
              key={item}
            className={`w-full text-white bg-black rounded-lg opacity-50 hover:opacity-80 flex justify-center items-center py-2! gap-2 clickable ${mode === item ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
            onClick={() => setMode(item)}
          >
              {item === 'time' ? 'Time series' : item[0].toUpperCase() + item.slice(1)}
          </Button>
          )
        )}
      </div>
      {loading ? <div className="mt-3 text-yellow-300">Querying…</div> : null}
      {error ? <div className="mt-3 text-red-300">{error}</div> : null}
      {!loading && result ? (
        result.values.length ? (
          <>
            <div className="mt-3">
              {mode === 'point'
                ? `${result.variable}: ${result.values[0]}`
                : `${result.values.length} samples`}
            </div>
            {mode !== 'point' ? <SeriesChart result={result} mode={mode} /> : null}
          </>
        ) : (
          <div className="mt-3">No data at this position.</div>
        )
      ) : null}
    </div>
  );
}

function LineChart({ result }: { result: TransectResult }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const chart = new uPlot(
      {
        width: 420,
        height: 240,
        scales: { x: { time: false }, y: { time: false } },
        series: [
          { label: 'Distance (km)' },
          { label: result.variable, stroke: '#facc15', width: 2, points: { show: true } }
        ],
        axes: [{ label: 'Distance (km)' }, { label: result.variable }]
      },
      [result.distancesKm, result.values],
      ref.current
    );
    return () => chart.destroy();
  }, [result]);
  return <div className="clickable mt-3 overflow-x-auto" ref={ref} />;
}

function FullChart({
  result,
  colormap,
  scale
}: {
  result: FullTransectResult;
  colormap: string;
  scale: [number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colors = useMemo(() => colormapBuilder(colormap, 'css', 256) as string[], [colormap]);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !result.values.length) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const rows = result.values.length;
    const columns = result.positions.length;
    for (let y = 0; y < canvas.height; y++) {
      const rowPosition = (1 - y / (canvas.height - 1)) * (rows - 1);
      const row0 = Math.floor(rowPosition);
      const row1 = Math.min(rows - 1, row0 + 1);
      const rowFraction = rowPosition - row0;
      for (let x = 0; x < canvas.width; x++) {
        const columnPosition = (x / (canvas.width - 1)) * (columns - 1);
        const column0 = Math.floor(columnPosition);
        const column1 = Math.min(columns - 1, column0 + 1);
        const columnFraction = columnPosition - column0;
        const neighbours = [
          [result.values[row0][column0], (1 - rowFraction) * (1 - columnFraction)],
          [result.values[row0][column1], (1 - rowFraction) * columnFraction],
          [result.values[row1][column0], rowFraction * (1 - columnFraction)],
          [result.values[row1][column1], rowFraction * columnFraction]
        ] as const;
        let weightedValue = 0;
        let weight = 0;
        for (const [neighbour, neighbourWeight] of neighbours) {
          if (neighbour !== null) {
            weightedValue += neighbour * neighbourWeight;
            weight += neighbourWeight;
          }
        }
        if (!weight) continue;
        const value = weightedValue / weight;
        const ratio =
          scale[1] === scale[0]
            ? 0.5
            : Math.max(0, Math.min(1, (value - scale[0]) / (scale[1] - scale[0])));
        context.fillStyle = colors[Math.round(ratio * 255)];
        context.fillRect(x, y, 1, 1);
      }
    }
  }, [colors, result, scale]);
  const gradient = `linear-gradient(to top, ${colors.join(',')})`;
  return (
    <div className="clickable mt-3">
      <div className="flex h-60 items-stretch gap-2 text-xs">
        <span className="[writing-mode:vertical-rl] rotate-180">Elevation / depth</span>
        <div className="flex flex-col justify-between">
          <span>{Number(result.elevations.at(-1)).toFixed(2)}</span>
          <span>{Number(result.elevations[0]).toFixed(2)}</span>
        </div>
        <canvas ref={ref} width={420} height={240} className="max-w-full border border-gray-500" />
        <div className="w-3 border" style={{ background: gradient }} />
        <div className="flex flex-col justify-between">
          <span>{scale[1]}</span>
          <span>{scale[0]}</span>
        </div>
      </div>
      <div className="text-center text-xs">
        Distance (km): 0 – {result.distancesKm.at(-1)?.toFixed(1)}
      </div>
    </div>
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
  const [full, setFull] = useState(false);
  const [samples, setSamples] = useState(10);
  const [points, setPoints] = useState<QueryPosition[]>([]);
  const [result, setResult] = useState<TransectResult | FullTransectResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const hasElevation = (provider.dimensionValues.elevation?.length ?? 0) > 1;
  useEffect(() => () => clearCapture(), [clearCapture]);
  useEffect(() => {
    if (points.length !== 2) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setResult(null);
    const options = { samples, concurrency: 6, signal: controller.signal };
    const query = full
      ? provider.getFullTransect(points[0], points[1], undefined, options)
      : provider.getTransect(points[0], points[1], undefined, options);
    void query
      .then(setResult)
      .catch(reason => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Query failed');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [full, points, provider, samples]);
  const begin = () => {
    setPoints([]);
    setResult(null);
    setError('');
    const captured: QueryPosition[] = [];
    registerCapture(position => {
      captured.push(position);
      setPoints([...captured]);
      if (captured.length === 2) registerCapture(null);
    });
  };
  return (
    <div className="text-sm">
      <div>Layer: {layerName}</div>
      <div className="flex justify-between">
        <div className="clickable mt-3 flex items-center gap-0">
          <span>Single-level</span>
          <CustomSwitch
            checked={full}
            disabled={!hasElevation}
            onChange={(checked: boolean) => setFull(checked)}
            id="full-transect-switch"
          />
          <span>Full vertical</span>
        </div>
        <label className="clickable mt-3 flex items-center gap-3">
          Num. Samples
          <input
            className="w-20 rounded bg-gray-800 px-2"
            type="number"
            min={2}
            max={500}
            value={samples}
            onChange={event =>
              setSamples(Math.max(2, Math.min(500, Number(event.target.value) || 2)))
            }
          />
        </label>
      </div>

      <Button
        onClick={begin}
        className="w-full text-white bg-black rounded-lg opacity-50 hover:opacity-80 flex justify-center items-center py-2! gap-2 clickable"
      >
        Select two map points
      </Button>
      {points.map((point, index) => (
        <div key={index} className="mt-1 font-mono text-xs">
          {index ? 'End' : 'Start'}: lon {point[0].toFixed(5)}, lat {point[1].toFixed(5)}
        </div>
      ))}
      {loading ? <div className="mt-3 text-yellow-300">Querying transect…</div> : null}
      {error ? <div className="mt-3 text-red-300">{error}</div> : null}
      {!loading && result ? (
        'elevations' in result ? (
          <FullChart result={result} colormap={colormap} scale={scale} />
        ) : (
          <LineChart result={result} />
        )
      ) : null}
    </div>
  );
}
