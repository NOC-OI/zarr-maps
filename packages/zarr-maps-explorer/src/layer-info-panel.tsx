interface LayerInfoPanelProps {
  content?: string;
  layerId: string;
  group: string;
}

function formatName(value: string) {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\bv([23])\b/gi, 'Zarr v$1')
    .replace(/\b\w/g, character => character.toUpperCase());
}

export function LayerInfoPanel({ content, layerId, group }: LayerInfoPanelProps) {
  return (
    <div className="layer-info">
      <div className="layer-info__intro">
        <span className="layer-info__eyebrow">{group}</span>
        <h2>{formatName(layerId)}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
