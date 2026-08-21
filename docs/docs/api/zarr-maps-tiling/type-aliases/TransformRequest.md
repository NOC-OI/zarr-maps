# TransformRequest()

```ts
type TransformRequest = (url, options?) => 
  | RequestParameters
| Promise<RequestParameters>;
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `options?` | \&#123; `method?`: `"GET"` \| `"HEAD"`; \&#125; |
| `options.method?` | `"GET"` \| `"HEAD"` |

## Returns

  \| [`RequestParameters`](../interfaces/RequestParameters.md)
  \| `Promise`\<[`RequestParameters`](../interfaces/RequestParameters.md)\>
