# zarr-maps-explorer

Shared, map-engine-independent React components and styles for the `zarr-maps` and
`zarr-cesium` demo explorers.

The package deliberately exports TypeScript source and is consumed as a local workspace/file
dependency. It is private and does not need to be published to npm while the repositories are
checked out next to each other. Map implementations, provider lifecycle code, and application
state adapters stay in their respective demos.
