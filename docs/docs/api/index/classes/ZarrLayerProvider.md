# ZarrLayerProvider

Provides Zarr dataset access and rendering capabilities for map layers.

## Accessors

### cacheKey

#### Get Signature

```ts
get cacheKey(): string;
```

##### Returns

`string`

***

### ready

#### Get Signature

```ts
get ready(): boolean;
```

##### Returns

`boolean`

***

### readyPromise

#### Get Signature

```ts
get readyPromise(): Promise<boolean>;
```

##### Returns

`Promise`\<`boolean`\>

## Constructors

### Constructor

```ts
new ZarrLayerProvider(options): ZarrLayerProvider;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | \| [`LeafletLayerOptions`](../../leaflet/interfaces/LeafletLayerOptions.md) \| [`OLLayerOptions`](../../ol/interfaces/OLLayerOptions.md) |

#### Returns

`ZarrLayerProvider`

## Methods

### abortTile()

```ts
abortTile(key): void;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`void`

***

### destroy()

```ts
destroy(): void;
```

#### Returns

`void`

***

### renderTile()

```ts
renderTile(
   boundsDeg, 
   z, 
key): Promise<HTMLCanvasElement | ImageBitmap>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `boundsDeg` | [`BoundsProps`](../interfaces/BoundsProps.md) |
| `z` | `number` |
| `key` | `string` |

#### Returns

`Promise`\<`HTMLCanvasElement` \| `ImageBitmap`\>

***

### updateSelectors()

```ts
updateSelectors(selectors): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | [`ZarrSelectors`](../interfaces/ZarrSelectors.md) |

#### Returns

`boolean`

***

### updateStyle()

```ts
updateStyle(opts): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | \&#123; `colormap?`: `string`; `scale?`: \[`number`, `number`\]; \&#125; |
| `opts.colormap?` | `string` |
| `opts.scale?` | \[`number`, `number`\] |

#### Returns

`boolean`

## Properties

### coverageBoundsDeg

```ts
coverageBoundsDeg: 
  | {
  east: number;
  north: number;
  south: number;
  west: number;
}
  | null = null;
```

***

### coverageBoundsMerc

```ts
coverageBoundsMerc: 
  | {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
}
  | null = null;
```

***

### crs

```ts
crs: CRS | null = null;
```

***

### dimensionValues

```ts
dimensionValues: DimensionValues = {};
```

***

### selectors

```ts
selectors: ZarrSelectors = {};
```
