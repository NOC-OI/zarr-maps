# Developer Guide – zarr-maps

This document explains how to set up a local development environment for:

- The **documentation website** (Docusaurus)
- The **demo application** (Vite)
- Contributing to the **zarr-maps** library itself

Whether you want to fix bugs, add features, or update the docs, this guide will help you get started quickly.

---

# 1. Repository Structure

```

zarr-maps/
├── packages/
│   ├── zarr-maps-colormap/ # Shared palette registry and color-ramp utilities
│   ├── zarr-maps-leaflet/ # Leaflet adapter
│   ├── zarr-maps-ol/ # OpenLayers adapter
│   └── zarr-maps-tiling/ # Framework-independent Zarr tiling pipeline and defaults
├── docs/ # Documentation website (Docusaurus)
├── demo/ # Demo web application (Vite)
├── package.json # Private workspace coordinator
└── tsconfig.base.json

```

---

# 2. Running the Documentation Website (Docusaurus)

The documentation site lives under `docs/`.

## Start the Docs Website

```bash
cd docs
npm install
npm run start
```

This launches Docusaurus in development mode:

- [http://localhost:3000](http://localhost:3000)

Any changes to Markdown or config files will auto-reload.

## Build the Docs Site

```bash
npm run build
```

Output is generated in `docs/build/`.

## Serve the Production Build

```bash
npm run serve
```

This is helpful for testing before deploying.

---

# 3. Running & Editing the Demo Website (Vite)

The demo uses **Vite** and displays interactive Leaflet + Zarr examples.

## Clone the repository

```bash
git clone https://github.com/noc-oi/zarr-maps.git
cd zarr-maps/demo
```

## Install dependencies

```bash
npm install
```

## Start the development server

```bash
npm run dev
```

The demo will be available at:

- [http://localhost:5173](http://localhost:5173)

## Customize the Demo (Use Your Own Zarr Data)

Edit: [`demo/src/application/data/layers-json.tsx`](https://github.com/NOC-OI/zarr-maps/blob/dev/demo/src/application/data/layers-json.tsx).

You can change:

- Dataset URLs
- Variable names (`temperature`, `uo`, `vo`, etc.)
- Colormaps
- Other layer options

This file is intentionally simple to help you experiment quickly.

---

# 4. Local Development of the Library

To build and develop the core library:

```bash
git clone https://github.com/noc-oi/zarr-maps.git
cd zarr-maps
npm install
```

## Build the library

```bash
npm run build
```

Outputs are written to each package's `dist/` directory.

## Watch for changes

Run either package in watch mode:

```bash
npm run dev:tiling
npm run dev:maps
```

This will compile TypeScript in watch mode.

You can then use the demo app to test changes **live** by running it simultaneously.

---

# 5. Contributing Guidelines

We welcome contributions! Please follow the workflow below.

## 5.1. Branching Model

Use feature branches:

```
feature/my-new-feature
fix/bug-description
docs/update-provider-docs
```

## 5.2. Before pushing

Run:

```bash
npm run build
```

This will check all TypeScript types, eslint rules, and prettier formatting. And then build the library.

## 5.3. Pull Request Guidelines

- Describe clearly **what the PR adds or fixes**
- Link related **issues**
- Update documentation when necessary
- Keep PRs focused instead of large multi-purpose changes

## 5.4. Updating Documentation

Docs live under: `docs/`

To test docs locally:

```bash
cd docs
npm run start
```

---

# 6. Deployment (Docs Only)

If you have Docusaurus deployment configured:

```bash
cd docs
npm run deploy
```

This depends on your project’s hosting setup (GitHub Pages, Vercel, etc.).

---

# 7. Releasing All Packages to npm

The repository publishes four npm packages:

- `zarr-maps-colormap`
- `zarr-maps-tiling`
- `zarr-maps-leaflet`
- `zarr-maps-ol`

The release workflow publishes all four packages whenever a tag beginning with `v` is pushed. Every package must therefore receive a new version, even if a release changes only one of them; npm will reject an attempt to publish a version that already exists.

The following example prepares release `0.2.0`. Run all commands from the repository root.

## 7.1. Update the release branch

Make sure the local branch contains the workspace-based package structure and is up to date:

```bash
git status
git pull --ff-only origin dev
npm pkg get name version --workspaces
```

If npm reports `No workspaces found`, do not continue with the release. Check that the root `package.json` contains the `packages/*` workspace and that the workspace-organization changes have been merged into the current branch.

If `git pull --ff-only` reports local changes or diverging history, resolve that branch state before creating the release tag.

## 7.2. Update package versions

Set the new version on all four packages:

```bash
npm pkg set version=0.2.0 --workspace=zarr-maps-colormap
npm pkg set version=0.2.0 --workspace=zarr-maps-tiling
npm pkg set version=0.2.0 --workspace=zarr-maps-leaflet
npm pkg set version=0.2.0 --workspace=zarr-maps-ol
```

Update the dependencies between the packages so consumers install compatible versions:

```bash
npm pkg set dependencies.zarr-maps-colormap="^0.2.0" \
  --workspace=zarr-maps-tiling

npm pkg set dependencies.zarr-maps-colormap="^0.2.0" \
  dependencies.zarr-maps-tiling="^0.2.0" \
  --workspace=zarr-maps-leaflet

npm pkg set dependencies.zarr-maps-colormap="^0.2.0" \
  dependencies.zarr-maps-tiling="^0.2.0" \
  --workspace=zarr-maps-ol
```

Regenerate the root lockfile after changing the manifests:

```bash
npm install
```

For later releases, replace `0.2.0` with the intended version in every command.

## 7.3. Validate the release

Build the packages, demo, and documentation:

```bash
npm run build
npm --prefix demo run build
npm --prefix docs run build
```

Optionally inspect the files that each npm package will contain:

```bash
npm pack --workspace=zarr-maps-colormap --dry-run
npm pack --workspace=zarr-maps-tiling --dry-run
npm pack --workspace=zarr-maps-leaflet --dry-run
npm pack --workspace=zarr-maps-ol --dry-run
```

## 7.4. Commit and tag the release

Review the changes before committing. The package manifests and root lockfile should all contain the new versions.

```bash
git diff -- packages/*/package.json package-lock.json
git add package.json package-lock.json packages/*/package.json
git commit -m "Release v0.2.0"
git tag -a v0.2.0 -m "Release v0.2.0"
git push origin dev
git push origin v0.2.0
```

Pushing the tag triggers `.github/workflows/publish-npm.yml`, which builds and publishes packages in dependency order:

```text
zarr-maps-colormap -> zarr-maps-tiling -> zarr-maps-leaflet
                                        -> zarr-maps-ol
```

Before tagging, confirm that the repository has an `NPM_TOKEN` GitHub Actions secret with permission to publish all four packages. The workflow installation step should include development dependencies required by TypeScript and `tsup`, for example:

```yaml
- name: Install dependencies
  run: npm ci --include=dev
```
