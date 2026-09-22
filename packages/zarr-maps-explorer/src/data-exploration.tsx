import AreaChartIcon from '@mui/icons-material/AreaChart';
import InfoIcon from '@mui/icons-material/Info';
import OpacityIcon from '@mui/icons-material/Opacity';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import { CatalogGroup, CatalogPanel } from './catalog';
import { LayerCard } from './layer-card';

export interface DataExplorationLayer {
  id: string;
  label: string;
  tags?: string[];
  active: boolean;
  opacity?: number;
  queryable?: boolean;
  onToggle: (checked: boolean) => void;
  onInfo: () => void;
  onStyle: () => void;
  onQuery?: () => void;
  onOpacityChange: (opacity: number) => void;
}

export interface DataExplorationGroup {
  id: string;
  title: string;
  layers: DataExplorationLayer[];
}

function DataExplorationOption({ layer }: { layer: DataExplorationLayer }) {
  const [showOpacity, setShowOpacity] = useState(false);
  return (
    <LayerCard
      id={layer.id}
      label={layer.label}
      active={layer.active}
      tags={layer.tags}
      onToggle={checked => {
        if (!checked) setShowOpacity(false);
        layer.onToggle(checked);
      }}
      actions={
        <>
          <button
            type="button"
            title="View layer details"
            aria-label={`View details for ${layer.label}`}
            onClick={layer.onInfo}
          >
            <InfoIcon fontSize="small" />
          </button>
          {layer.active && (
            <>
              {layer.queryable && layer.onQuery ? (
                <button type="button" title="Query a transect" onClick={layer.onQuery}>
                  <AreaChartIcon titleAccess="Query transect" fontSize="small" />
                </button>
              ) : null}
              <button type="button" title="Style layer" onClick={layer.onStyle}>
                <TuneIcon fontSize="small" />
              </button>
              <button
                type="button"
                title="Change opacity"
                onClick={() => setShowOpacity(value => !value)}
              >
                <OpacityIcon fontSize="small" />
              </button>
            </>
          )}
        </>
      }
    >
      {showOpacity && layer.active ? (
        <input
          className="w-full accent-yellow-700 outline-none focus:shadow-none"
          type="range"
          step={0.1}
          min={0}
          max={1}
          value={layer.opacity ?? 1}
          onChange={event => layer.onOpacityChange(Number(event.target.value))}
        />
      ) : null}
    </LayerCard>
  );
}

export function DataExploration({
  visible,
  groups
}: {
  visible: boolean;
  groups: DataExplorationGroup[];
}) {
  return (
    <CatalogPanel visible={visible}>
      {groups.map(group => (
        <CatalogGroup key={group.id} title={group.title}>
          {group.layers.map(layer => (
            <DataExplorationOption key={layer.id} layer={layer} />
          ))}
        </CatalogGroup>
      ))}
    </CatalogPanel>
  );
}
