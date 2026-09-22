import { useEffect, useMemo, useRef, useState } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import { colormapBuilder } from 'zarr-maps-colormap';
import { Button } from './button';
import { CustomSwitch } from './custom-switch';

export type QueryPosition = [number, number];
export type PointQueryMode = 'point' | 'profile' | 'time';

export interface PointQueryResult {
  variable: string;
  values: number[];
  coordinates: Record<string, (number | string)[]>;
  components?: { u: number[]; v: number[] };
}

export interface TransectQueryResult {
  variable: string;
  values: (number | null)[];
  distancesKm: number[];
  positions: QueryPosition[];
}

export interface FullTransectQueryResult {
  variable: string;
  values: (number | null)[][];
  distancesKm: number[];
  positions: QueryPosition[];
  elevations: (number | string)[];
}

function queryCoordinates(result: PointQueryResult, mode: PointQueryMode) {
  const key = Object.keys(result.coordinates).find(name =>
    mode === 'time'
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

function SeriesChart({
  result,
  mode
}: {
  result: PointQueryResult;
  mode: Exclude<PointQueryMode, 'point'>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !result.values.length) return;
    const axis = { stroke: '#e5e7eb', grid: { stroke: '#4b5563' } };
    const coordinates = queryCoordinates(result, mode);
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
            [[], [result.values, coordinates]] as unknown as uPlot.AlignedData,
            ref.current
          )
        : new uPlot(
            {
              width: 380,
              height: 220,
              scales: { x: { time: true } },
              series: [
                { label: 'Time' },
                {
                  label: result.variable,
                  stroke: '#facc15',
                  width: 2,
                  points: { show: true, size: 4 }
                }
              ],
              axes: [axis, axis]
            },
            [coordinates, result.values],
            ref.current
          );
    return () => chart.destroy();
  }, [mode, result]);
  return <div className="clickable mt-3 overflow-x-auto" ref={ref} />;
}

interface PointQueryInfoProps {
  layerName: string;
  position: QueryPosition;
  hasProfile: boolean;
  hasTimeSeries: boolean;
  query: (mode: PointQueryMode, signal: AbortSignal) => Promise<PointQueryResult>;
}

export function PointQueryInfo({
  layerName,
  position,
  hasProfile,
  hasTimeSeries,
  query
}: PointQueryInfoProps) {
  const [mode, setMode] = useState<PointQueryMode>('point');
  const [result, setResult] = useState<PointQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    void query(mode, controller.signal)
      .then(setResult)
      .catch(reason => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Query failed');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [mode, query]);
  const modes: PointQueryMode[] = [
    'point',
    ...(hasProfile ? ['profile' as const] : []),
    ...(hasTimeSeries ? ['time' as const] : [])
  ];
  return (
    <div className="space-y-4 whitespace-normal p-5 text-sm">
      <div className="rounded-xl border border-white/12 bg-white/[.035] p-4">
        <div className="mb-1 text-[9px] font-extrabold uppercase tracking-[.11em] text-[#d49511]">
          Selected location
        </div>
        <div className="truncate text-[13px] font-bold text-[#f1f1f1]" title={layerName}>
          {layerName}
        </div>
        <div className="mt-2 font-mono text-[11px] text-[#aaa]">
          {position[0].toFixed(4)}°, {position[1].toFixed(4)}°
        </div>
      </div>
      <div className="clickable flex gap-1 rounded-xl border border-white/12 bg-black/20 p-1">
        {modes.map(item => (
          <Button
            key={item}
            className={`w-full justify-center rounded-lg border-0 px-2! py-2! text-[11px] font-bold ${mode === item ? 'bg-[#d49511]! text-[#171717]' : 'bg-transparent! text-[#aaa]'}`}
            onClick={() => setMode(item)}
          >
            {item === 'time' ? 'Time series' : item[0].toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </div>
      {loading && (
        <div className="rounded-xl border border-[#d49511]/25 bg-[#d49511]/10 p-4 text-[#efc35f]">
          Querying…
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-400/25 bg-red-400/10 p-4 text-red-300">
          {error}
        </div>
      )}
      {!loading &&
        !error &&
        result &&
        (result.values.length ? (
          <div className="rounded-xl border border-white/12 bg-white/[.035] p-4">
            <div className="text-[9px] font-extrabold uppercase tracking-[.1em] text-[#888]">
              Query result
            </div>
            <div className="mt-2 text-[13px] font-semibold text-[#f1f1f1]">
              {mode === 'point'
                ? `${result.variable}: ${result.values[0]}`
                : `${result.values.length} ${mode === 'time' ? 'time samples' : 'profile samples'}`}
            </div>
            {mode === 'point' && result.components && (
              <div className="mt-1 text-gray-300">
                U: {result.components.u[0]}, V: {result.components.v[0]}
              </div>
            )}
            {mode !== 'point' && <SeriesChart result={result} mode={mode} />}
          </div>
        ) : (
          <div className="rounded-xl border border-white/12 bg-white/[.035] p-4 text-[#aaa]">
            No data at this position.
          </div>
        ))}
    </div>
  );
}

function TransectLineChart({ result }: { result: TransectQueryResult }) {
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
          { label: result.variable, stroke: '#facc15', width: 2, points: { show: true, size: 5 } }
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

function FullTransectChart({
  result,
  colormap,
  scale
}: {
  result: FullTransectQueryResult;
  colormap: string;
  scale: [number, number];
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colors = useMemo(() => colormapBuilder(colormap, 'css', 256) as string[], [colormap]);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !result.values.length || !result.positions.length) return;
    const rows = result.values.length;
    const columns = result.positions.length;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < canvas.height; y++)
      for (let x = 0; x < canvas.width; x++) {
        const row = Math.min(rows - 1, Math.round((1 - y / (canvas.height - 1)) * (rows - 1)));
        const column = Math.min(columns - 1, Math.round((x / (canvas.width - 1)) * (columns - 1)));
        const value = result.values[row][column];
        if (value === null) continue;
        const ratio =
          scale[1] === scale[0]
            ? 0.5
            : Math.max(0, Math.min(1, (value - scale[0]) / (scale[1] - scale[0])));
        context.fillStyle = colors[Math.round(ratio * 255)];
        context.fillRect(x, y, 1, 1);
      }
  }, [colors, result, scale]);
  return (
    <div className="clickable mt-3">
      <div className="flex h-60 items-stretch gap-2 text-xs">
        <span className="[writing-mode:vertical-rl] rotate-180">Elevation / depth</span>
        <div className="flex flex-col justify-between">
          <span>{Number(result.elevations.at(-1)).toFixed(2)}</span>
          <span>{Number(result.elevations[0]).toFixed(2)}</span>
        </div>
        <canvas ref={ref} width={420} height={240} className="max-w-full border border-gray-500" />
        <div
          className="w-3 border"
          style={{ background: `linear-gradient(to top, ${colors.join(',')})` }}
        />
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

interface TransectQueryInfoProps {
  layerName: string;
  hasElevation: boolean;
  registerCapture: (handler: ((position: QueryPosition) => void) | null) => void;
  clearCapture: () => void;
  query: (
    start: QueryPosition,
    end: QueryPosition,
    full: boolean,
    samples: number,
    signal: AbortSignal
  ) => Promise<TransectQueryResult | FullTransectQueryResult>;
  colormap: string;
  scale: [number, number];
}

export function TransectQueryInfo({
  layerName,
  hasElevation,
  registerCapture,
  clearCapture,
  query,
  colormap,
  scale
}: TransectQueryInfoProps) {
  const [full, setFull] = useState(false);
  const [samples, setSamples] = useState(10);
  const [points, setPoints] = useState<QueryPosition[]>([]);
  const [result, setResult] = useState<TransectQueryResult | FullTransectQueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => () => clearCapture(), [clearCapture]);
  useEffect(() => {
    if (points.length !== 2) return;
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setResult(null);
    void query(points[0], points[1], full, samples, controller.signal)
      .then(setResult)
      .catch(reason => {
        if (!controller.signal.aborted)
          setError(reason instanceof Error ? reason.message : 'Query failed');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [full, points, query, samples]);
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
    <div className="whitespace-normal p-5 text-sm">
      <div className="truncate" title={layerName}>
        Layer: {layerName}
      </div>
      <div className="flex justify-between">
        <div className="clickable mt-3 flex items-center gap-0">
          <span>Single-level</span>
          <CustomSwitch
            checked={full}
            disabled={!hasElevation}
            onChange={setFull}
            id="full-transect-switch"
          />
          <span>Full vertical</span>
        </div>
        <label className="clickable mt-3 flex items-center gap-3">
          Num. Samples
          <input
            className="w-20 rounded bg-gray-800 px-2 py-1 text-white"
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
        className="clickable flex w-full items-center justify-center gap-2 rounded-lg bg-black py-2! text-white opacity-50 hover:opacity-80"
      >
        Select two map points
      </Button>
      {points.map((point, index) => (
        <div key={index} className="mt-1 font-mono text-xs">
          {index ? 'End' : 'Start'}: lon {point[0].toFixed(5)}, lat {point[1].toFixed(5)}
        </div>
      ))}
      {loading && <div className="mt-3 text-yellow-300">Querying transect…</div>}
      {error && <div className="mt-3 text-red-300">{error}</div>}
      {!loading &&
        result &&
        ('elevations' in result ? (
          <FullTransectChart result={result} colormap={colormap} scale={scale} />
        ) : (
          <TransectLineChart result={result} />
        ))}
    </div>
  );
}
