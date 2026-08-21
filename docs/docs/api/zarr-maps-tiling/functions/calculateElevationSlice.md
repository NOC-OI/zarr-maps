# calculateElevationSlice()

```ts
function calculateElevationSlice(
   shapeElevation, 
   dimInfo, 
   selectorsElevation, 
   dimensionValuesWithElevation, 
   root, 
   levelInfo, 
   zarrVersion): Promise<{
  dimensionValuesWithElevation: DimensionValues;
  elevationSlice: [number, number];
}>;
```

Determines the index range of the elevation axis to load from a Zarr cube.

Supports two kinds of selectors:
- `&#123; type: "index", selected: [i0, i1] &#125;` — direct index slicing
- `&#123; type: "value", selected: [z0, z1] &#125;` — find nearest elevation values

Behavior:
- Loads elevation coordinate values (if not already loaded).
- Converts value-based ranges into nearest-index ranges.
- If `selected` is a single scalar, slices from the lowest elevation to that value.
- Returns the index bounds as `[start, endExclusive]`.
- Mutates `dimensionValuesWithElevation.elevation` by slicing it to the returned range.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shapeElevation` | `number` | Size of the elevation dimension. |
| `dimInfo` | \&#123; `array`: `Array`\<`any`, `Readable`\> \| `null`; `index`: `number`; `name`: `string`; \&#125; | Dimension index info for elevation. See [DimIndicesProps](../interfaces/DimIndicesProps.md). |
| `dimInfo.array` | `Array`\<`any`, `Readable`\> \| `null` | - |
| `dimInfo.index` | `number` | - |
| `dimInfo.name` | `string` | - |
| `selectorsElevation` | [`ZarrSelectorsProps`](../interfaces/ZarrSelectorsProps.md) \| `undefined` | User-provided elevation selector. See [ZarrSelectorsProps](../interfaces/ZarrSelectorsProps.md). |
| `dimensionValuesWithElevation` | [`DimensionValues`](../interfaces/DimensionValues.md) | Cache of already-loaded coordinate arrays (mutated by this function). |
| `root` | `Location`\<`Readable`\> | Root Zarr group location. |
| `levelInfo` | `string` \| `null` | Optional multiscale subpath. |
| `zarrVersion` | `2` \| `3` \| `null` | Zarr version (2 or 3). |

## Returns

`Promise`\<\&#123;
  `dimensionValuesWithElevation`: [`DimensionValues`](../interfaces/DimensionValues.md);
  `elevationSlice`: \[`number`, `number`\];
\&#125;\>

An object containing:
- `dimensionValuesWithElevation`: Possibly updated elevation coordinate array.
- `elevationSlice`: Index range `[start, endExclusive]` for elevation slicing.
