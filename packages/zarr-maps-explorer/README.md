# zarr-maps-explorer

Shared, map-engine-independent React components and styles for the `zarr-maps` and
`zarr-cesium` demo explorers.

```bash
npm install zarr-maps-explorer
```

Import components from the package entry point and include the shared styles once in the
application:

```ts
import { DataExploration, ExplorerSidebar, LegendPanel } from 'zarr-maps-explorer';
import 'zarr-maps-explorer/styles.css';
```

Map implementations, provider lifecycle code, and application state adapters remain in their
respective applications.
