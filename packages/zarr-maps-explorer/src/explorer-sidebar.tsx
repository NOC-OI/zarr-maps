import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import GitHubIcon from '@mui/icons-material/GitHub';
import MapIcon from '@mui/icons-material/Map';
import { useState, type ReactNode } from 'react';
import { ExplorerShell } from './explorer-shell';
import { SideBarLink } from './side-bar-link';

interface ExplorerSidebarProps {
  brand: string;
  sourceUrl: string;
  documentationUrl: string;
  onRemoveAll: () => void;
  renderCatalog: (visible: boolean) => ReactNode;
  adjacentControl?: ReactNode;
  children?: ReactNode;
}

export function ExplorerSidebar({
  brand,
  sourceUrl,
  documentationUrl,
  onRemoveAll,
  renderCatalog,
  adjacentControl,
  children
}: ExplorerSidebarProps) {
  const [catalogVisible, setCatalogVisible] = useState(true);

  return (
    <ExplorerShell
      brand={brand}
      toolbar={
        <>
          <SideBarLink
            title="Data Exploration"
            id="data_exploration"
            onClick={() => setCatalogVisible(visible => !visible)}
            active={catalogVisible}
            icon={MapIcon}
            iconOnly
          />
          <SideBarLink
            title="Remove all layers"
            id="remove_all_layers"
            onClick={onRemoveAll}
            icon={DeleteOutlineIcon}
            iconOnly
          />
          <SideBarLink
            title="Source Code"
            id="source_code"
            href={sourceUrl}
            icon={GitHubIcon}
            iconOnly
          />
          <SideBarLink
            title="Documentation"
            id="documentation"
            href={documentationUrl}
            icon={DescriptionIcon}
            iconOnly
          />
        </>
      }
      panel={renderCatalog(catalogVisible)}
      adjacentControl={adjacentControl}
    >
      {children}
    </ExplorerShell>
  );
}
