# OLLayerOptions

Configuration for a 2D raster (image) layer visualization in OpenLayers.

## Extends

- `ZarrTileOptions`

## Properties

### colormap?

```ts
optional colormap: string;
```

#### Inherited from

```ts
ZarrTileOptions.colormap
```

***

### crs?

```ts
optional crs: CRS | null;
```

#### Inherited from

```ts
ZarrTileOptions.crs
```

***

### dimensionNames?

```ts
optional dimensionNames: DimensionNamesProps;
```

#### Inherited from

```ts
ZarrTileOptions.dimensionNames
```

***

### id

```ts
id: string;
```

***

### latIsAscending?

```ts
optional latIsAscending: boolean;
```

#### Inherited from

```ts
ZarrTileOptions.latIsAscending
```

***

### maxZoom?

```ts
optional maxZoom: number;
```

#### Inherited from

```ts
ZarrTileOptions.maxZoom
```

***

### multiscaleFormat?

```ts
optional multiscaleFormat: MultiscaleFormat;
```

#### Inherited from

```ts
ZarrTileOptions.multiscaleFormat
```

***

### noDataMax?

```ts
optional noDataMax: number;
```

#### Inherited from

```ts
ZarrTileOptions.noDataMax
```

***

### noDataMin?

```ts
optional noDataMin: number;
```

#### Inherited from

```ts
ZarrTileOptions.noDataMin
```

***

### onAuthError?

```ts
optional onAuthError: OnAuthError;
```

Called once when a transformed request returns an expired-credential status.

#### Inherited from

```ts
ZarrTileOptions.onAuthError
```

***

### opacity?

```ts
optional opacity: number;
```

***

### renderTarget?

```ts
optional renderTarget: "web-map" | "cesium";
```

Rendering convention used by the consuming map framework.

#### Inherited from

```ts
ZarrTileOptions.renderTarget
```

***

### requestOverrides?

```ts
optional requestOverrides: RequestOverrides;
```

#### Inherited from

```ts
ZarrTileOptions.requestOverrides
```

***

### scale?

```ts
optional scale: [number, number];
```

#### Inherited from

```ts
ZarrTileOptions.scale
```

***

### selectors?

```ts
optional selectors: ZarrSelectors;
```

#### Inherited from

```ts
ZarrTileOptions.selectors
```

***

### store?

```ts
optional store: Readable;
```

Custom Zarrita-compatible store, such as an IcechunkStore.

#### Inherited from

```ts
ZarrTileOptions.store
```

***

### tileSize?

```ts
optional tileSize: number;
```

#### Inherited from

```ts
ZarrTileOptions.tileSize
```

***

### transformRequest?

```ts
optional transformRequest: TransformRequest;
```

Dynamically transform each FetchStore request (for auth, proxies, or signed URLs).

#### Inherited from

```ts
ZarrTileOptions.transformRequest
```

***

### url?

```ts
optional url: string;
```

URL to a Zarr store. Required unless `store` is provided.

#### Inherited from

```ts
ZarrTileOptions.url
```

***

### variable

```ts
variable: string;
```

#### Inherited from

```ts
ZarrTileOptions.variable
```

***

### zarrVersion?

```ts
optional zarrVersion: 2 | 3;
```

#### Inherited from

```ts
ZarrTileOptions.zarrVersion
```
