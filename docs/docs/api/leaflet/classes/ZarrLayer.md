# ZarrLayer

Leaflet Zarr tile layer using the shared ZarrLayerProvider.

## Remarks

This class extends `L.GridLayer` to create a custom tile layer that fetches
and renders tiles from a Zarr data source using the `ZarrLayerProvider`.

## Param

Configuration options for the Zarr layer. Instance of [LeafletLayerOptions](../interfaces/LeafletLayerOptions.md).

## Extends

- `GridLayer`

## Constructors

### Constructor

```ts
new ZarrLayer(options): ZarrLayer;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`LeafletLayerOptions`](../interfaces/LeafletLayerOptions.md) & `GridLayerOptions` |

#### Returns

`ZarrLayer`

#### Overrides

```ts
L.GridLayer.constructor
```

## Methods

### \_removeTile()

```ts
_removeTile(key): any;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`any`

***

### \_tileCoordsToKey()

```ts
protected _tileCoordsToKey(coords): string;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `coords` | `Coords` |

#### Returns

`string`

#### Inherited from

```ts
L.GridLayer._tileCoordsToKey
```

***

### \_wrapCoords()

```ts
protected _wrapCoords(parameter): Coords;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `parameter` | `Coords` |

#### Returns

`Coords`

#### Inherited from

```ts
L.GridLayer._wrapCoords
```

***

### addEventListener()

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn` | `TileErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for on(...)

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

#### Call Signature

```ts
addEventListener(eventMap): this;
```

Alias for on(...)

Adds a set of type/listener pairs, e.g. &#123;click: onClick, mousemove: onMouseMove&#125;

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addEventListener
```

***

### addEventParent()

```ts
addEventParent(obj): this;
```

Adds an event parent - an Evented that will receive propagated events

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `Evented` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.addEventParent
```

***

### addInteractiveTarget()

```ts
addInteractiveTarget(targetEl): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetEl` | `HTMLElement` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.addInteractiveTarget
```

***

### addOneTimeEventListener()

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn` | `TileErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(
   type, 
   fn, 
   context?): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

#### Call Signature

```ts
addOneTimeEventListener(eventMap): this;
```

Alias for once(...)

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.addOneTimeEventListener
```

***

### addTo()

```ts
addTo(map): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | `Map` \| `LayerGroup`\<`any`\> |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.addTo
```

***

### beforeAdd()?

```ts
optional beforeAdd(map): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | `Map` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.beforeAdd
```

***

### bindPopup()

```ts
bindPopup(content, options?): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `content` | (`layer`) => `Content` \| `Content` \| `Popup` |
| `options?` | `PopupOptions` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.bindPopup
```

***

### bindTooltip()

```ts
bindTooltip(content, options?): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `content` | `Content` \| (`layer`) => `Content` \| `Tooltip` |
| `options?` | `TooltipOptions` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.bindTooltip
```

***

### bringToBack()

```ts
bringToBack(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.bringToBack
```

***

### bringToFront()

```ts
bringToFront(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.bringToFront
```

***

### clearAllEventListeners()

```ts
clearAllEventListeners(): this;
```

Alias for off()

Removes all listeners to all events on the object.

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.clearAllEventListeners
```

***

### closePopup()

```ts
closePopup(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.closePopup
```

***

### closeTooltip()

```ts
closeTooltip(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.closeTooltip
```

***

### createTile()

```ts
createTile(coords, done): HTMLCanvasElement;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `coords` | `Coords` |
| `done` | `DoneCallback` |

#### Returns

`HTMLCanvasElement`

#### Overrides

```ts
L.GridLayer.createTile
```

***

### fire()

```ts
fire(
   type, 
   data?, 
   propagate?): this;
```

Fires an event of the specified type. You can optionally provide a data
object — the first argument of the listener function will contain its properties.
The event might can optionally be propagated to event parents.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `data?` | `any` |
| `propagate?` | `boolean` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.fire
```

***

### fireEvent()

```ts
fireEvent(
   type, 
   data?, 
   propagate?): this;
```

Alias for fire(...)

Fires an event of the specified type. You can optionally provide a data
object — the first argument of the listener function will contain its properties.
The event might can optionally be propagated to event parents.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `data?` | `any` |
| `propagate?` | `boolean` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.fireEvent
```

***

### getAttribution()?

```ts
optional getAttribution(): string | null;
```

#### Returns

`string` \| `null`

#### Inherited from

```ts
L.GridLayer.getAttribution
```

***

### getContainer()

```ts
getContainer(): HTMLElement | null;
```

#### Returns

`HTMLElement` \| `null`

#### Inherited from

```ts
L.GridLayer.getContainer
```

***

### getEvents()?

```ts
optional getEvents(): object;
```

#### Returns

`object`

#### Inherited from

```ts
L.GridLayer.getEvents
```

***

### getPane()

```ts
getPane(name?): HTMLElement | undefined;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name?` | `string` |

#### Returns

`HTMLElement` \| `undefined`

#### Inherited from

```ts
L.GridLayer.getPane
```

***

### getPopup()

```ts
getPopup(): Popup | undefined;
```

#### Returns

`Popup` \| `undefined`

#### Inherited from

```ts
L.GridLayer.getPopup
```

***

### getTileSize()

```ts
getTileSize(): Point;
```

#### Returns

`Point`

#### Inherited from

```ts
L.GridLayer.getTileSize
```

***

### getTooltip()

```ts
getTooltip(): Tooltip | undefined;
```

#### Returns

`Tooltip` \| `undefined`

#### Inherited from

```ts
L.GridLayer.getTooltip
```

***

### hasEventListeners()

```ts
hasEventListeners(type): boolean;
```

Alias for listens(...)

Returns true if a particular event type has any listeners attached to it.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |

#### Returns

`boolean`

#### Inherited from

```ts
L.GridLayer.hasEventListeners
```

***

### isLoading()

```ts
isLoading(): boolean;
```

#### Returns

`boolean`

#### Inherited from

```ts
L.GridLayer.isLoading
```

***

### isPopupOpen()

```ts
isPopupOpen(): boolean;
```

#### Returns

`boolean`

#### Inherited from

```ts
L.GridLayer.isPopupOpen
```

***

### isTooltipOpen()

```ts
isTooltipOpen(): boolean;
```

#### Returns

`boolean`

#### Inherited from

```ts
L.GridLayer.isTooltipOpen
```

***

### listens()

#### Call Signature

```ts
listens(type, propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"tileloadstart"` \| `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` \| `"layeradd"` \| `"layerremove"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` \| `"resize"` \| `"popupopen"` \| `"tooltipopen"` \| `"tooltipclose"` \| `"locationerror"` \| `"locationfound"` \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` \| `"keypress"` \| `"keydown"` \| `"keyup"` \| `"zoomanim"` \| `"dragend"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` \| `"tileerror"` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn` | `LayersControlEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn` | `LayerEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn` | `ResizeEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn` | `PopupEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn` | `TooltipEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn` | `ErrorEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn` | `LocationEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn` | `DragEndEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

#### Call Signature

```ts
listens(
   type, 
   fn, 
   context?, 
   propagate?): boolean;
```

Returns true if a particular event type has any listeners attached to it.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |
| `propagate?` | `boolean` |

##### Returns

`boolean`

##### Inherited from

```ts
L.GridLayer.listens
```

***

### load()

```ts
load(): Promise<boolean>;
```

Loads the Zarr layer and returns a promise that resolves when the layer is ready.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` when the layer is ready.

***

### off()

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn?` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn?` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn?` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn?` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn?` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn?` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn?` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn?` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn?` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn?` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn?` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn?` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn?` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn?` | `TileErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(
   type, 
   fn?, 
   context?): this;
```

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn?` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(eventMap): this;
```

Removes a set of type/listener pairs.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

#### Call Signature

```ts
off(): this;
```

Removes all listeners to all events on the object.

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.off
```

***

### on()

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn` | `TileErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(
   type, 
   fn, 
   context?): this;
```

Adds a listener function (fn) to a particular event type of the object.
You can optionally specify the context of the listener (object the this
keyword will point to). You can also pass several space-separated types
(e.g. 'click dblclick').

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

#### Call Signature

```ts
on(eventMap): this;
```

Adds a set of type/listener pairs, e.g. &#123;click: onClick, mousemove: onMouseMove&#125;

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.on
```

***

### onAdd()

```ts
onAdd(map): ZarrLayer;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | `Map` |

#### Returns

`ZarrLayer`

#### Overrides

```ts
L.GridLayer.onAdd
```

***

### once()

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(
   type, 
   fn, 
   context?): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

#### Call Signature

```ts
once(eventMap): this;
```

Behaves as on(...), except the listener will only get fired once and then removed.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.once
```

***

### onRemove()

```ts
onRemove(map): ZarrLayer;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | `Map` |

#### Returns

`ZarrLayer`

#### Overrides

```ts
L.GridLayer.onRemove
```

***

### openPopup()

```ts
openPopup(latlng?): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `latlng?` | `LatLngExpression` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.openPopup
```

***

### openTooltip()

```ts
openTooltip(latlng?): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `latlng?` | `LatLngExpression` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.openTooltip
```

***

### redraw()

```ts
redraw(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.redraw
```

***

### remove()

```ts
remove(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.remove
```

***

### removeEventListener()

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"baselayerchange"` \| `"overlayadd"` \| `"overlayremove"` |
| `fn?` | `LayersControlEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"layeradd"` \| `"layerremove"` |
| `fn?` | `LayerEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"error"` \| `"zoomlevelschange"` \| `"unload"` \| `"viewreset"` \| `"load"` \| `"zoomstart"` \| `"movestart"` \| `"zoom"` \| `"move"` \| `"zoomend"` \| `"moveend"` \| `"autopanstart"` \| `"dragstart"` \| `"drag"` \| `"add"` \| `"remove"` \| `"loading"` \| `"update"` \| `"down"` \| `"predrag"` |
| `fn?` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"resize"` |
| `fn?` | `ResizeEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"popupopen"` \| `"popupclose"` |
| `fn?` | `PopupEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tooltipopen"` \| `"tooltipclose"` |
| `fn?` | `TooltipEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationerror"` |
| `fn?` | `ErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"locationfound"` |
| `fn?` | `LocationEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | \| `"click"` \| `"dblclick"` \| `"mousedown"` \| `"mouseup"` \| `"mouseover"` \| `"mouseout"` \| `"mousemove"` \| `"contextmenu"` \| `"preclick"` |
| `fn?` | `LeafletMouseEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"keypress"` \| `"keydown"` \| `"keyup"` |
| `fn?` | `LeafletKeyboardEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"zoomanim"` |
| `fn?` | `ZoomAnimEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"dragend"` |
| `fn?` | `DragEndEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileloadstart"` \| `"tileunload"` \| `"tileload"` \| `"tileabort"` |
| `fn?` | `TileEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `"tileerror"` |
| `fn?` | `TileErrorEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   fn?, 
   context?): this;
```

Alias for off(...)

Removes a previously added listener function. If no function is specified,
it will remove all the listeners of that particular event from the object.
Note that if you passed a custom context to on, you must pass the same context
to off in order to remove the listener.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `fn?` | `LeafletEventHandlerFn` |
| `context?` | `any` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

#### Call Signature

```ts
removeEventListener(eventMap): this;
```

Alias for off(...)

Removes a set of type/listener pairs.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `eventMap` | `LeafletEventHandlerFnMap` |

##### Returns

`this`

##### Inherited from

```ts
L.GridLayer.removeEventListener
```

***

### removeEventParent()

```ts
removeEventParent(obj): this;
```

Removes an event parent, so it will stop receiving propagated events

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `obj` | `Evented` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.removeEventParent
```

***

### removeFrom()

```ts
removeFrom(map): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `map` | `Map` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.removeFrom
```

***

### removeInteractiveTarget()

```ts
removeInteractiveTarget(targetEl): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `targetEl` | `HTMLElement` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.removeInteractiveTarget
```

***

### setOpacity()

```ts
setOpacity(opacity): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `opacity` | `number` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.setOpacity
```

***

### setPopupContent()

```ts
setPopupContent(content): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `content` | `Content` \| `Popup` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.setPopupContent
```

***

### setTooltipContent()

```ts
setTooltipContent(content): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `content` | `Content` \| `Tooltip` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.setTooltipContent
```

***

### setZIndex()

```ts
setZIndex(zIndex): this;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `zIndex` | `number` |

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.setZIndex
```

***

### togglePopup()

```ts
togglePopup(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.togglePopup
```

***

### toggleTooltip()

```ts
toggleTooltip(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.toggleTooltip
```

***

### unbindPopup()

```ts
unbindPopup(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.unbindPopup
```

***

### unbindTooltip()

```ts
unbindTooltip(): this;
```

#### Returns

`this`

#### Inherited from

```ts
L.GridLayer.unbindTooltip
```

***

### updateSelectors()

```ts
updateSelectors(selectors): void;
```

Update the selectors used for slicing the Zarr dataset.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `selectors` | [`ZarrSelectors`](../../index/interfaces/ZarrSelectors.md) | New selectors to apply. |

#### Returns

`void`

***

### updateStyle()

```ts
updateStyle(opts): void;
```

Update the visual style of the layer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opts` | \&#123; `colormap?`: `string`; `opacity?`: `number`; `scale?`: \[`number`, `number`\]; \&#125; | Style options to update. |
| `opts.colormap?` | `string` | Colormap name. |
| `opts.opacity?` | `number` | Layer opacity. |
| `opts.scale?` | \[`number`, `number`\] | [min, max] range for data scaling. |

#### Returns

`void`

***

### addInitHook()

#### Call Signature

```ts
static addInitHook(initHookFn): any;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `initHookFn` | () => `void` |

##### Returns

`any`

##### Inherited from

```ts
L.GridLayer.addInitHook
```

#### Call Signature

```ts
static addInitHook(methodName, ...args): any;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `methodName` | `string` |
| ...`args` | `any`[] |

##### Returns

`any`

##### Inherited from

```ts
L.GridLayer.addInitHook
```

***

### callInitHooks()

```ts
static callInitHooks(): void;
```

#### Returns

`void`

#### Inherited from

```ts
L.GridLayer.callInitHooks
```

***

### extend()

```ts
static extend(props): (...args) => any & typeof Class;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `any` |

#### Returns

(...`args`) => `any` & *typeof* `Class`

#### Inherited from

```ts
L.GridLayer.extend
```

***

### include()

```ts
static include(props): any;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `any` |

#### Returns

`any`

#### Inherited from

```ts
L.GridLayer.include
```

***

### mergeOptions()

```ts
static mergeOptions(props): any;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `any` |

#### Returns

`any`

#### Inherited from

```ts
L.GridLayer.mergeOptions
```

## Properties

### \_map

```ts
protected _map: Map;
```

#### Inherited from

```ts
L.GridLayer._map
```

***

### \_tiles

```ts
protected _tiles: InternalTiles;
```

#### Inherited from

```ts
L.GridLayer._tiles
```

***

### \_tileZoom?

```ts
protected optional _tileZoom: number;
```

#### Inherited from

```ts
L.GridLayer._tileZoom
```

***

### options

```ts
options: LayerOptions;
```

#### Inherited from

```ts
L.GridLayer.options
```

***

### provider

```ts
provider: ZarrLayerProvider;
```
