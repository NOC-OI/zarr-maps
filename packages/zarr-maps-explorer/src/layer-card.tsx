import type { ReactNode } from 'react';
import { CustomSwitch } from './custom-switch';

interface LayerCardProps {
  id: string;
  label: string;
  active: boolean;
  tags?: string[];
  onToggle: (checked: boolean) => void;
  actions: ReactNode;
  children?: ReactNode;
}

export function LayerCard({
  id,
  label,
  active,
  tags,
  onToggle,
  actions,
  children
}: LayerCardProps) {
  return (
    <div className={`layer-card relative ${active ? 'layer-card--active' : ''}`}>
      <div id="type-option" className="text-white">
        <div className={`min-w-0 ${active ? 'pr-29' : 'pr-8'}`}>
          <CustomSwitch checked={active} onChange={onToggle} id={id} label={label} />
          <div className="layer-card__meta">
            {tags?.map(tag => (
              <span key={tag} className="tag">
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div
          id="layer-edit"
          className="layer-card__actions layer-option-actions absolute right-2.5 top-1/2 -translate-y-1/2"
        >
          {actions}
        </div>
      </div>
      {children}
    </div>
  );
}
