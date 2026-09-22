# Developing zarr-maps

This repository is an npm monorepo containing the shared rendering packages, the Leaflet and
OpenLayers adapters, a demo application, and the documentation site.

## Repository layout

```text
zarr-maps/
├── packages/
│   ├── zarr-maps-colormap/  # Colormaps and color-ramp utilities
│   ├── zarr-maps-tiling/    # Framework-independent Zarr tiling engine
│   ├── zarr-maps-leaflet/   # Leaflet adapter
│   ├── zarr-maps-ol/        # OpenLayers adapter
│   └── zarr-maps-explorer/  # Shared React explorer components
├── demo/                    # Leaflet and OpenLayers demo (Vite)
├── docs/                    # Documentation site (Docusaurus)
└── package.json             # Workspace scripts
```

## Set up the repository

```bash
git clone https://github.com/noc-oi/zarr-maps.git
cd zarr-maps
npm install
npm run build
```

The root build compiles the colormap, tiling, Leaflet, and OpenLayers packages in dependency
order. Build an individual package with one of these commands:

```bash
npm run build:colormap
npm run build:tiling
npm run build:leaflet
npm run build:ol
```

Equivalent `dev:*` commands run the package build in watch mode.

## Run the demo

```bash
npm --prefix demo install
npm --prefix demo run dev
```

The demo runs at <http://localhost:5173>. Edit
`demo/src/application/data/layers-json.tsx` to add datasets or change their display options.

Before submitting demo changes, run:

```bash
npm --prefix demo run lint
npm --prefix demo run build
```

## Run the documentation site

```bash
npm --prefix docs install
npm --prefix docs run start
```

The documentation runs at <http://localhost:3000>. Validate documentation changes with:

```bash
npm --prefix docs run build
```

## Contributing

Keep changes focused, document public API changes, and link related issues in the pull request.
Before pushing, build the affected packages and any application that consumes them. For changes
to the shared tiling engine, verify both map adapters.

## Releases

Tags beginning with `v` trigger `.github/workflows/publish-npm.yml`. Before creating a release:

1. Update the versions of every package included in the release:

```bash
export VERSION=0.2.0
npm pkg set version=$VERSION --workspace=zarr-maps-colormap
npm pkg set version=$VERSION --workspace=zarr-maps-tiling
npm pkg set version=$VERSION --workspace=zarr-maps-leaflet
npm pkg set version=$VERSION --workspace=zarr-maps-ol
npm pkg set version=$VERSION --workspace=zarr-maps-explorer
```

2. Update internal dependency ranges and regenerate `package-lock.json` with `npm install`.

```bash
npm pkg set dependencies.zarr-maps-colormap="^$VERSION" \
  --workspace=zarr-maps-tiling

npm pkg set dependencies.zarr-maps-colormap="^$VERSION" \
  dependencies.zarr-maps-tiling="^$VERSION" \
  --workspace=zarr-maps-leaflet

npm pkg set dependencies.zarr-maps-colormap="^$VERSION" \
  dependencies.zarr-maps-tiling="^$VERSION" \
  --workspace=zarr-maps-ol

npm pkg set dependencies.zarr-maps-colormap="^$VERSION" \
  dependencies.zarr-maps-tiling="^$VERSION" \
  --workspace=zarr-maps-explorer
```

3. Build the packages, demo, and documentation.
4. Optionally inspect package contents with `npm pack --workspace=<package> --dry-run`.
5. Commit the version changes, create an annotated `v<version>` tag, and push it.

Packages must be built and published in dependency order: colormap, tiling, then the Leaflet and
OpenLayers adapters. When `zarr-maps-explorer` is added to the npm workflow, publish it after its
`zarr-maps-colormap` dependency. Publishing requires the `NPM_TOKEN` repository secret.
