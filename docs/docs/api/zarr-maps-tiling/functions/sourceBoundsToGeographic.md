# sourceBoundsToGeographic()

```ts
function sourceBoundsToGeographic(
   bounds, 
   projection, 
   segments): BoundsProps;
```

Transform a source rectangle to WGS84 by sampling a regular interior grid.

## Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `bounds` | [`XYLimitsProps`](../interfaces/XYLimitsProps.md) | `undefined` |
| `projection` | [`ResolvedCRS`](../interfaces/ResolvedCRS.md) | `undefined` |
| `segments` | `number` | `64` |

## Returns

[`BoundsProps`](../interfaces/BoundsProps.md)
