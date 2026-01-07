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
├── src/ # Main TypeScript source code
├── docs/ # Documentation website (Docusaurus)
├── demo/ # Demo web application (Vite)
├── dist/ # Build output (gitignored)
├── package.json # Library root package
└── tsconfig.json

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

Outputs will go to `dist/`.

## Watch for changes

```bash
npm run dev
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
