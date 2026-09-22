import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LayersIcon from '@mui/icons-material/Layers';
import { useState, type ReactNode } from 'react';

interface CatalogPanelProps {
  children: ReactNode;
  visible?: boolean;
}

export function CatalogPanel({ children, visible = true }: CatalogPanelProps) {
  if (!visible) return null;

  return (
    <div className="catalog-panel">
      <div className="catalog-panel__list">{children}</div>
    </div>
  );
}

interface CatalogGroupProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export function CatalogGroup({ title, children, defaultExpanded = false }: CatalogGroupProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="catalog-group">
      <button
        type="button"
        className="catalog-group__header w-full"
        onClick={() => setExpanded(value => !value)}
        aria-expanded={expanded}
      >
        <span className="catalog-group__icon">
          <LayersIcon fontSize="small" />
        </span>
        <span className="flex-1 text-left">{title.replace(/-/g, ' ')}</span>
        <ExpandMoreIcon
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          fontSize="small"
        />
      </button>
      {expanded && <div className="flex flex-col gap-2 pt-2 text-gray-50">{children}</div>}
    </section>
  );
}
