# ZarrLayer

OpenLayers Zarr tile layer using the shared ZarrLayerProvider.

## Remarks

This class extends `TileLayer<XYZ>` to create a custom tile layer that fetches
and renders tiles from a Zarr data source using the `ZarrLayerProvider`.

## Param

Configuration options for the Zarr layer. Instance of [OLLayerOptions](../interfaces/OLLayerOptions.md).

## Extends

- `TileLayer`\<`XYZ`\>

## Constructors

### Constructor

```ts
new ZarrLayer(options): ZarrLayer;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`OLLayerOptions`](../interfaces/OLLayerOptions.md) |

#### Returns

`ZarrLayer`

#### Overrides

```ts
TileLayer<XYZ>.constructor
```

## Methods

### addChangeListener()

```ts
addChangeListener(key, listener): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |
| `listener` | `Listener` | Listener. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.addChangeListener
```

***

### addEventListener()

```ts
addEventListener(type, listener): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` | Type. |
| `listener` | `Listener` | Listener. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.addEventListener
```

***

### applyProperties()

```ts
protected applyProperties(source): void;
```

Apply any properties from another object without triggering events.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `BaseObject` | The source object. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.applyProperties
```

***

### changed()

```ts
changed(): void;
```

Increases the revision counter and dispatches a 'change' event.

#### Returns

`void`

#### Api

#### Inherited from

```ts
TileLayer.changed
```

***

### clearRenderer()

```ts
clearRenderer(): void;
```

This will clear the renderer so that a new one can be created next time it is needed

#### Returns

`void`

#### Inherited from

```ts
TileLayer.clearRenderer
```

***

### createRenderer()

```ts
createRenderer(): CanvasTileLayerRenderer<ZarrLayer>;
```

#### Returns

`CanvasTileLayerRenderer`\<`ZarrLayer`\>

#### Inherited from

```ts
TileLayer.createRenderer
```

***

### dispatchEvent()

```ts
dispatchEvent(event): boolean | undefined;
```

Dispatches an event and calls all listeners listening for events
of this type. The event parameter can either be a string or an
Object with a `type` property.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `string` \| `BaseEvent` | Event object. |

#### Returns

`boolean` \| `undefined`

`false` if anyone called preventDefault on the
    event object or if any of the listeners returned false.

#### Api

#### Inherited from

```ts
TileLayer.dispatchEvent
```

***

### dispose()

```ts
dispose(): void;
```

Clean up.

#### Returns

`void`

#### Inherited from

```ts
TileLayer.dispose
```

***

### disposeInternal()

```ts
protected disposeInternal(): void;
```

Extension point for disposable objects.

#### Returns

`void`

#### Overrides

```ts
TileLayer.disposeInternal
```

***

### get()

```ts
get(key): any;
```

Gets a value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |

#### Returns

`any`

Value.

#### Api

#### Inherited from

```ts
TileLayer.get
```

***

### getAttributions()

```ts
getAttributions(view?): string[];
```

Get the attributions of the source of this layer for the given view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `view?` | `View` \| `ViewStateLayerStateExtent` | View or import("../Map.js").FrameState. Only required when the layer is not added to a map. |

#### Returns

`string`[]

Attributions for this layer at the given view.

#### Api

#### Inherited from

```ts
TileLayer.getAttributions
```

***

### getBackground()

```ts
getBackground(): false | BackgroundColor;
```

Get the background for this layer.

#### Returns

`false` \| `BackgroundColor`

Layer background.

#### Inherited from

```ts
TileLayer.getBackground
```

***

### getCacheSize()

```ts
protected getCacheSize(): number | undefined;
```

#### Returns

`number` \| `undefined`

The suggested cache size

#### Inherited from

```ts
TileLayer.getCacheSize
```

***

### getClassName()

```ts
getClassName(): string;
```

#### Returns

`string`

CSS class name.

#### Inherited from

```ts
TileLayer.getClassName
```

***

### getData()

```ts
getData(pixel): 
  | Uint8Array<ArrayBufferLike>
  | Float32Array<ArrayBufferLike>
  | Uint8ClampedArray<ArrayBufferLike>
  | DataView<ArrayBufferLike>
  | null;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixel` | `Pixel` | Pixel. |

#### Returns

  \| `Uint8Array`\<`ArrayBufferLike`\>
  \| `Float32Array`\<`ArrayBufferLike`\>
  \| `Uint8ClampedArray`\<`ArrayBufferLike`\>
  \| `DataView`\<`ArrayBufferLike`\>
  \| `null`

Pixel data.

#### Inherited from

```ts
TileLayer.getData
```

***

### getDeclutter()

```ts
getDeclutter(): string;
```

#### Returns

`string`

Declutter

#### Inherited from

```ts
TileLayer.getDeclutter
```

***

### getExtent()

```ts
getExtent(): Extent | undefined;
```

Return the module:ol/extent~Extent extent of the layer or `undefined` if it
will be visible regardless of extent.

#### Returns

`Extent` \| `undefined`

The layer extent.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getExtent
```

***

### getFeatures()

```ts
getFeatures(pixel): Promise<FeatureLike[]>;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pixel` | `Pixel` | Pixel. |

#### Returns

`Promise`\<`FeatureLike`[]\>

Promise that resolves with
an array of features.

#### Inherited from

```ts
TileLayer.getFeatures
```

***

### getKeys()

```ts
getKeys(): string[];
```

Get a list of object property names.

#### Returns

`string`[]

List of property names.

#### Api

#### Inherited from

```ts
TileLayer.getKeys
```

***

### getLayersArray()

```ts
abstract getLayersArray(array?): Layer<Source, LayerRenderer<any>>[];
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array?` | `Layer`\<`Source`, `LayerRenderer`\<`any`\>\>[] | Array of layers (to be modified in place). |

#### Returns

`Layer`\<`Source`, `LayerRenderer`\<`any`\>\>[]

Array of layers.

#### Inherited from

```ts
TileLayer.getLayersArray
```

***

### getLayerState()

```ts
getLayerState(managed?): State;
```

This method is not meant to be called by layers or layer renderers because the state
is incorrect if the layer is included in a layer group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `managed?` | `boolean` | Layer is managed. |

#### Returns

`State`

Layer state.

#### Inherited from

```ts
TileLayer.getLayerState
```

***

### getLayerStatesArray()

```ts
abstract getLayerStatesArray(states?): State[];
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `states?` | `State`[] | Optional list of layer states (to be modified in place). |

#### Returns

`State`[]

List of layer states.

#### Inherited from

```ts
TileLayer.getLayerStatesArray
```

***

### getListeners()

```ts
getListeners(type): Listener[] | undefined;
```

Get the listeners for a specified event type. Listeners are returned in the
order that they will be called in.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` | Type. |

#### Returns

`Listener`[] \| `undefined`

Listeners.

#### Inherited from

```ts
TileLayer.getListeners
```

***

### getMapInternal()

```ts
getMapInternal(): Map | null;
```

For use inside the library only.

#### Returns

`Map` \| `null`

Map.

#### Inherited from

```ts
TileLayer.getMapInternal
```

***

### getMaxResolution()

```ts
getMaxResolution(): number;
```

Return the maximum resolution of the layer. Returns Infinity if
the layer has no maximum resolution set.

#### Returns

`number`

The maximum resolution of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getMaxResolution
```

***

### getMaxZoom()

```ts
getMaxZoom(): number;
```

Return the maximum zoom level of the layer. Returns Infinity if
the layer has no maximum zoom set.

#### Returns

`number`

The maximum zoom level of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getMaxZoom
```

***

### getMinResolution()

```ts
getMinResolution(): number;
```

Return the minimum resolution of the layer. Returns 0 if
the layer has no minimum resolution set.

#### Returns

`number`

The minimum resolution of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getMinResolution
```

***

### getMinZoom()

```ts
getMinZoom(): number;
```

Return the minimum zoom level of the layer. Returns -Infinity if
the layer has no minimum zoom set.

#### Returns

`number`

The minimum zoom level of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getMinZoom
```

***

### getOpacity()

```ts
getOpacity(): number;
```

Return the opacity of the layer (between 0 and 1).

#### Returns

`number`

The opacity of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getOpacity
```

***

### getPreload()

```ts
getPreload(): number;
```

Return the level as number to which we will preload tiles up to.

#### Returns

`number`

The level to preload tiles up to.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getPreload
```

***

### getProperties()

```ts
getProperties(): object;
```

Get an object of all property names and values.

#### Returns

`object`

Object.

#### Api

#### Inherited from

```ts
TileLayer.getProperties
```

***

### getPropertiesInternal()

```ts
getPropertiesInternal(): 
  | {
[x: string]: any;
}
  | null;
```

Get an object of all property names and values.

#### Returns

  \| \&#123;
\[`x`: `string`\]: `any`;
\&#125;
  \| `null`

Object.

#### Inherited from

```ts
TileLayer.getPropertiesInternal
```

***

### getRenderer()

```ts
getRenderer(): 
  | CanvasTileLayerRenderer<
  | TileLayer<TileSource<Tile>>
  | VectorTileLayer<VectorTile<any>, any>>
  | null;
```

Get the renderer for this layer.

#### Returns

  \| `CanvasTileLayerRenderer`\<
  \| `TileLayer`\<`TileSource`\<`Tile`\>\>
  \| `VectorTileLayer`\<`VectorTile`\<`any`\>, `any`\>\>
  \| `null`

The layer renderer.

#### Inherited from

```ts
TileLayer.getRenderer
```

***

### getRenderSource()

```ts
getRenderSource(): XYZ | null;
```

#### Returns

`XYZ` \| `null`

The source being rendered.

#### Inherited from

```ts
TileLayer.getRenderSource
```

***

### getRevision()

```ts
getRevision(): number;
```

Get the version number for this object.  Each time the object is modified,
its version number will be incremented.

#### Returns

`number`

Revision.

#### Api

#### Inherited from

```ts
TileLayer.getRevision
```

***

### getSource()

```ts
getSource(): XYZ | null;
```

Get the layer source.

#### Returns

`XYZ` \| `null`

The layer source (or `null` if not yet set).

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getSource
```

***

### getSourceState()

```ts
abstract getSourceState(): State;
```

#### Returns

`State`

Source state.

#### Inherited from

```ts
TileLayer.getSourceState
```

***

### getUseInterimTilesOnError()

```ts
getUseInterimTilesOnError(): boolean;
```

Deprecated.  Whether we use interim tiles on error.

#### Returns

`boolean`

Use interim tiles on error.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getUseInterimTilesOnError
```

***

### getVisible()

```ts
getVisible(): boolean;
```

Return the value of this layer's `visible` property. To find out whether the layer
is visible on a map, use `isVisible()` instead.

#### Returns

`boolean`

The value of the `visible` property of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getVisible
```

***

### getZIndex()

```ts
getZIndex(): number | undefined;
```

Return the Z-index of the layer, which is used to order layers before
rendering. Returns undefined if the layer is unmanaged.

#### Returns

`number` \| `undefined`

The Z-index of the layer.

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.getZIndex
```

***

### hasListener()

```ts
hasListener(type?): boolean;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type?` | `string` | Type. If not provided, `true` will be returned if this event target has any listeners. |

#### Returns

`boolean`

Has listeners.

#### Inherited from

```ts
TileLayer.hasListener
```

***

### hasProperties()

```ts
hasProperties(): boolean;
```

#### Returns

`boolean`

The object has properties.

#### Inherited from

```ts
TileLayer.hasProperties
```

***

### hasRenderer()

```ts
hasRenderer(): boolean;
```

#### Returns

`boolean`

The layer has a renderer.

#### Inherited from

```ts
TileLayer.hasRenderer
```

***

### isVisible()

```ts
isVisible(view?): boolean;
```

The layer is visible on the map view, i.e. within its min/max resolution or zoom and
extent, not set to `visible: false`, and not inside a layer group that is set
to `visible: false`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `view?` | `View` \| `ViewStateLayerStateExtent` | View or import("../Map.js").FrameState. Only required when the layer is not added to a map. |

#### Returns

`boolean`

The layer is visible in the map view.

#### Api

#### Inherited from

```ts
TileLayer.isVisible
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

### notify()

```ts
notify(key, oldValue): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |
| `oldValue` | `any` | Old value. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.notify
```

***

### onceInternal()

```ts
protected onceInternal(type, listener): EventsKey | EventsKey[];
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` \| `string`[] | Type. |
| `listener` | (`arg0`) => `unknown` | Listener. |

#### Returns

`EventsKey` \| `EventsKey`[]

Event key.

#### Inherited from

```ts
TileLayer.onceInternal
```

***

### onInternal()

```ts
protected onInternal(type, listener): EventsKey | EventsKey[];
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` \| `string`[] | Type. |
| `listener` | (`arg0`) => `unknown` | Listener. |

#### Returns

`EventsKey` \| `EventsKey`[]

Event key.

#### Inherited from

```ts
TileLayer.onInternal
```

***

### removeChangeListener()

```ts
removeChangeListener(key, listener): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |
| `listener` | `Listener` | Listener. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.removeChangeListener
```

***

### removeEventListener()

```ts
removeEventListener(type, listener): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` | Type. |
| `listener` | `Listener` | Listener. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.removeEventListener
```

***

### render()

```ts
render(frameState, target): HTMLElement | null;
```

In charge to manage the rendering of the layer. One layer type is
bounded with one layer renderer.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `frameState` | `FrameState` \| `null` | Frame state. |
| `target` | `HTMLElement` | Target which the renderer may (but need not) use for rendering its content. |

#### Returns

`HTMLElement` \| `null`

The rendered element.

#### Inherited from

```ts
TileLayer.render
```

***

### renderDeclutter()

```ts
renderDeclutter(frameState, layerState): void;
```

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `frameState` | `FrameState` | Frame state. |
| `layerState` | `State` | Layer state. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.renderDeclutter
```

***

### renderDeferred()

```ts
renderDeferred(frameState): void;
```

When the renderer follows a layout -> render approach, do the final rendering here.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `frameState` | `FrameState` | Frame state |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.renderDeferred
```

***

### set()

```ts
set(
   key, 
   value, 
   silent?): void;
```

Sets a value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |
| `value` | `any` | Value. |
| `silent?` | `boolean` | Update without triggering an event. |

#### Returns

`void`

#### Api

#### Inherited from

```ts
TileLayer.set
```

***

### setBackground()

```ts
setBackground(background?): void;
```

Sets the background color.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `background?` | `BackgroundColor` | Background color. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.setBackground
```

***

### setExtent()

```ts
setExtent(extent): void;
```

Set the extent at which the layer is visible.  If `undefined`, the layer
will be visible at all extents.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `extent` | `Extent` \| `undefined` | The extent of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setExtent
```

***

### setMap()

```ts
setMap(map): void;
```

Sets the layer to be rendered on top of other layers on a map. The map will
not manage this layer in its layers collection. This
is useful for temporary layers. To remove an unmanaged layer from the map,
use `#setMap(null)`.

To add the layer to a map and have it managed by the map, use
module:ol/Map~Map#addLayer instead.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `map` | `Map` \| `null` | Map. |

#### Returns

`void`

#### Api

#### Inherited from

```ts
TileLayer.setMap
```

***

### setMapInternal()

```ts
setMapInternal(map): void;
```

For use inside the library only.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `map` | `Map` \| `null` | Map. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.setMapInternal
```

***

### setMaxResolution()

```ts
setMaxResolution(maxResolution): void;
```

Set the maximum resolution at which the layer is visible.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `maxResolution` | `number` | The maximum resolution of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setMaxResolution
```

***

### setMaxZoom()

```ts
setMaxZoom(maxZoom): void;
```

Set the maximum zoom (exclusive) at which the layer is visible.
Note that the zoom levels for layer visibility are based on the
view zoom level, which may be different from a tile source zoom level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `maxZoom` | `number` | The maximum zoom of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setMaxZoom
```

***

### setMinResolution()

```ts
setMinResolution(minResolution): void;
```

Set the minimum resolution at which the layer is visible.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `minResolution` | `number` | The minimum resolution of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setMinResolution
```

***

### setMinZoom()

```ts
setMinZoom(minZoom): void;
```

Set the minimum zoom (inclusive) at which the layer is visible.
Note that the zoom levels for layer visibility are based on the
view zoom level, which may be different from a tile source zoom level.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `minZoom` | `number` | The minimum zoom of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setMinZoom
```

***

### setOpacity()

```ts
setOpacity(opacity): void;
```

Set the opacity of the layer, allowed values range from 0 to 1.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `opacity` | `number` | The opacity of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setOpacity
```

***

### setPreload()

```ts
setPreload(preload): void;
```

Set the level as number to which we will preload tiles up to.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `preload` | `number` | The level to preload tiles up to. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setPreload
```

***

### setProperties()

```ts
setProperties(values, silent?): void;
```

Sets a collection of key-value pairs.  Note that this changes any existing
properties and adds new ones (it does not remove any existing properties).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `values` | \&#123; \[`x`: `string`\]: `any`; \&#125; | Values. |
| `silent?` | `boolean` | Update without triggering an event. |

#### Returns

`void`

#### Api

#### Inherited from

```ts
TileLayer.setProperties
```

***

### setSource()

```ts
setSource(source): void;
```

Set the layer source.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | `XYZ` \| `null` | The layer source. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setSource
```

***

### setUseInterimTilesOnError()

```ts
setUseInterimTilesOnError(useInterimTilesOnError): void;
```

Deprecated.  Set whether we use interim tiles on error.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `useInterimTilesOnError` | `boolean` | Use interim tiles on error. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setUseInterimTilesOnError
```

***

### setVisible()

```ts
setVisible(visible): void;
```

Set the visibility of the layer (`true` or `false`).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `visible` | `boolean` | The visibility of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setVisible
```

***

### setZIndex()

```ts
setZIndex(zindex): void;
```

Set Z-index of the layer, which is used to order layers before rendering.
The default Z-index is 0.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `zindex` | `number` | The z-index of the layer. |

#### Returns

`void`

#### Observable

#### Api

#### Inherited from

```ts
TileLayer.setZIndex
```

***

### unInternal()

```ts
protected unInternal(type, listener): void;
```

Unlisten for a certain type of event.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `type` | `string` \| `string`[] | Type. |
| `listener` | (`arg0`) => `unknown` | Listener. |

#### Returns

`void`

#### Inherited from

```ts
TileLayer.unInternal
```

***

### unrender()

```ts
unrender(): void;
```

Called when a layer is not visible during a map render.

#### Returns

`void`

#### Inherited from

```ts
TileLayer.unrender
```

***

### unset()

```ts
unset(key, silent?): void;
```

Unsets a property.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Key name. |
| `silent?` | `boolean` | Unset without triggering an event. |

#### Returns

`void`

#### Api

#### Inherited from

```ts
TileLayer.unset
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

## Properties

### disposed

```ts
protected disposed: boolean;
```

The object has already been disposed.

#### Inherited from

```ts
TileLayer.disposed
```

***

### on

```ts
on: BaseTileLayerOnSignature<EventsKey>;
```

#### Inherited from

```ts
TileLayer.on
```

***

### once

```ts
once: BaseTileLayerOnSignature<EventsKey>;
```

#### Inherited from

```ts
TileLayer.once
```

***

### provider

```ts
provider: ZarrLayerProvider;
```

***

### rendered

```ts
protected rendered: boolean;
```

#### Inherited from

```ts
TileLayer.rendered
```

***

### un

```ts
un: BaseTileLayerOnSignature<void>;
```

#### Inherited from

```ts
TileLayer.un
```
