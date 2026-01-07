# ZarrImageElement

## Extends

- `HTMLImageElement`

## Accessors

### classList

#### Get Signature

```ts
get classList(): DOMTokenList;
```

The **`Element.classList`** is a read-only property that returns a live DOMTokenList collection of the `class` attributes of the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/classList)

##### Returns

`DOMTokenList`

#### Set Signature

```ts
set classList(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

##### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.classList
```

***

### part

#### Get Signature

```ts
get part(): DOMTokenList;
```

The **`part`** property of the Element interface represents the part identifier(s) of the element (i.e., set using the `part` attribute), returned as a DOMTokenList.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/part)

##### Returns

`DOMTokenList`

#### Set Signature

```ts
set part(value): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` |

##### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.part
```

***

### style

#### Get Signature

```ts
get style(): CSSStyleDeclaration;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/style)

##### Returns

`CSSStyleDeclaration`

#### Set Signature

```ts
set style(cssText): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `cssText` | `string` |

##### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.style
```

***

### textContent

#### Get Signature

```ts
get textContent(): string;
```

[MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

##### Returns

`string`

#### Set Signature

```ts
set textContent(value): void;
```

The **`textContent`** property of the Node interface represents the text content of the node and its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/textContent)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `null` |

##### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.textContent
```

## Methods

### addEventListener()

#### Call Signature

```ts
addEventListener<K>(
   type, 
   listener, 
   options?): void;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementEventMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `K` |
| `listener` | (`this`, `ev`) => `any` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.addEventListener
```

#### Call Signature

```ts
addEventListener(
   type, 
   listener, 
   options?): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `AddEventListenerOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.addEventListener
```

***

### after()

```ts
after(...nodes): void;
```

Inserts nodes just after node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/after)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.after
```

***

### animate()

```ts
animate(keyframes, options?): Animation;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animate)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `keyframes` | `Keyframe`[] \| `PropertyIndexedKeyframes` \| `null` |
| `options?` | `number` \| `KeyframeAnimationOptions` |

#### Returns

`Animation`

#### Inherited from

```ts
HTMLImageElement.animate
```

***

### append()

```ts
append(...nodes): void;
```

Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/append)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.append
```

***

### appendChild()

```ts
appendChild<T>(node): T;
```

The **`appendChild()`** method of the Node interface adds a node to the end of the list of children of a specified parent node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/appendChild)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `T` |

#### Returns

`T`

#### Inherited from

```ts
HTMLImageElement.appendChild
```

***

### attachInternals()

```ts
attachInternals(): ElementInternals;
```

The **`HTMLElement.attachInternals()`** method returns an ElementInternals object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attachInternals)

#### Returns

`ElementInternals`

#### Inherited from

```ts
HTMLImageElement.attachInternals
```

***

### attachShadow()

```ts
attachShadow(init): ShadowRoot;
```

The **`Element.attachShadow()`** method attaches a shadow DOM tree to the specified element and returns a reference to its ShadowRoot.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attachShadow)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `init` | `ShadowRootInit` |

#### Returns

`ShadowRoot`

#### Inherited from

```ts
HTMLImageElement.attachShadow
```

***

### before()

```ts
before(...nodes): void;
```

Inserts nodes just before node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/before)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.before
```

***

### blur()

```ts
blur(): void;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/blur)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.blur
```

***

### checkVisibility()

```ts
checkVisibility(options?): boolean;
```

The **`checkVisibility()`** method of the Element interface checks whether the element is visible.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/checkVisibility)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `CheckVisibilityOptions` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.checkVisibility
```

***

### click()

```ts
click(): void;
```

The **`HTMLElement.click()`** method simulates a mouse click on an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/click)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.click
```

***

### cloneNode()

```ts
cloneNode(subtree?): Node;
```

The **`cloneNode()`** method of the Node interface returns a duplicate of the node on which this method was called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/cloneNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `subtree?` | `boolean` |

#### Returns

`Node`

#### Inherited from

```ts
HTMLImageElement.cloneNode
```

***

### closest()

#### Call Signature

```ts
closest<K>(selector): HTMLElementTagNameMap[K] | null;
```

The **`closest()`** method of the Element interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/closest)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.closest
```

#### Call Signature

```ts
closest<K>(selector): SVGElementTagNameMap[K] | null;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `SVGElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`SVGElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.closest
```

#### Call Signature

```ts
closest<K>(selector): MathMLElementTagNameMap[K] | null;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `MathMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selector` | `K` |

##### Returns

`MathMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.closest
```

#### Call Signature

```ts
closest<E>(selectors): E | null;
```

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `Element` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `string` |

##### Returns

`E` \| `null`

##### Inherited from

```ts
HTMLImageElement.closest
```

***

### compareDocumentPosition()

```ts
compareDocumentPosition(other): number;
```

The **`compareDocumentPosition()`** method of the Node interface reports the position of its argument node relative to the node on which it is called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/compareDocumentPosition)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `Node` |

#### Returns

`number`

#### Inherited from

```ts
HTMLImageElement.compareDocumentPosition
```

***

### computedStyleMap()

```ts
computedStyleMap(): StylePropertyMapReadOnly;
```

The **`computedStyleMap()`** method of the Element interface returns a StylePropertyMapReadOnly interface which provides a read-only representation of a CSS declaration block that is an alternative to CSSStyleDeclaration.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/computedStyleMap)

#### Returns

`StylePropertyMapReadOnly`

#### Inherited from

```ts
HTMLImageElement.computedStyleMap
```

***

### contains()

```ts
contains(other): boolean;
```

The **`contains()`** method of the Node interface returns a boolean value indicating whether a node is a descendant of a given node, that is the node itself, one of its direct children (Node.childNodes), one of the children's direct children, and so on.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/contains)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `other` | `Node` \| `null` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.contains
```

***

### decode()

```ts
decode(): Promise<void>;
```

The **`decode()`** method of the HTMLImageElement interface returns a it to the DOM.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/decode)

#### Returns

`Promise`\<`void`\>

#### Inherited from

```ts
HTMLImageElement.decode
```

***

### dispatchEvent()

```ts
dispatchEvent(event): boolean;
```

The **`dispatchEvent()`** method of the EventTarget sends an Event to the object, (synchronously) invoking the affected event listeners in the appropriate order.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.dispatchEvent
```

***

### focus()

```ts
focus(options?): void;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/focus)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `FocusOptions` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.focus
```

***

### getAnimations()

```ts
getAnimations(options?): Animation[];
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAnimations)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `GetAnimationsOptions` |

#### Returns

`Animation`[]

#### Inherited from

```ts
HTMLImageElement.getAnimations
```

***

### getAttribute()

```ts
getAttribute(qualifiedName): string | null;
```

The **`getAttribute()`** method of the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttribute)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |

#### Returns

`string` \| `null`

#### Inherited from

```ts
HTMLImageElement.getAttribute
```

***

### getAttributeNames()

```ts
getAttributeNames(): string[];
```

The **`getAttributeNames()`** method of the array.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNames)

#### Returns

`string`[]

#### Inherited from

```ts
HTMLImageElement.getAttributeNames
```

***

### getAttributeNode()

```ts
getAttributeNode(qualifiedName): Attr | null;
```

Returns the specified attribute of the specified element, as an Attr node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |

#### Returns

`Attr` \| `null`

#### Inherited from

```ts
HTMLImageElement.getAttributeNode
```

***

### getAttributeNodeNS()

```ts
getAttributeNodeNS(namespace, localName): Attr | null;
```

The **`getAttributeNodeNS()`** method of the Element interface returns the namespaced Attr node of an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNodeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `localName` | `string` |

#### Returns

`Attr` \| `null`

#### Inherited from

```ts
HTMLImageElement.getAttributeNodeNS
```

***

### getAttributeNS()

```ts
getAttributeNS(namespace, localName): string | null;
```

The **`getAttributeNS()`** method of the Element interface returns the string value of the attribute with the specified namespace and name.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getAttributeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `localName` | `string` |

#### Returns

`string` \| `null`

#### Inherited from

```ts
HTMLImageElement.getAttributeNS
```

***

### getBoundingClientRect()

```ts
getBoundingClientRect(): DOMRect;
```

The **`Element.getBoundingClientRect()`** method returns a position relative to the viewport.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getBoundingClientRect)

#### Returns

`DOMRect`

#### Inherited from

```ts
HTMLImageElement.getBoundingClientRect
```

***

### getClientRects()

```ts
getClientRects(): DOMRectList;
```

The **`getClientRects()`** method of the Element interface returns a collection of DOMRect objects that indicate the bounding rectangles for each CSS border box in a client.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getClientRects)

#### Returns

`DOMRectList`

#### Inherited from

```ts
HTMLImageElement.getClientRects
```

***

### getElementsByClassName()

```ts
getElementsByClassName(classNames): HTMLCollectionOf<Element>;
```

The Element method **`getElementsByClassName()`** returns a live specified class name or names.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByClassName)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `classNames` | `string` |

#### Returns

`HTMLCollectionOf`\<`Element`\>

#### Inherited from

```ts
HTMLImageElement.getElementsByClassName
```

***

### getElementsByTagName()

#### Call Signature

```ts
getElementsByTagName<K>(qualifiedName): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
```

The **`Element.getElementsByTagName()`** method returns a live All descendants of the specified element are searched, but not the element itself.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByTagName)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `K` |

##### Returns

`HTMLCollectionOf`\<`HTMLElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagName
```

#### Call Signature

```ts
getElementsByTagName<K>(qualifiedName): HTMLCollectionOf<SVGElementTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `SVGElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `K` |

##### Returns

`HTMLCollectionOf`\<`SVGElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagName
```

#### Call Signature

```ts
getElementsByTagName<K>(qualifiedName): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `MathMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `K` |

##### Returns

`HTMLCollectionOf`\<`MathMLElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagName
```

#### Call Signature

```ts
getElementsByTagName<K>(qualifiedName): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementDeprecatedTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `K` |

##### Returns

`HTMLCollectionOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

##### Deprecated

##### Inherited from

```ts
HTMLImageElement.getElementsByTagName
```

#### Call Signature

```ts
getElementsByTagName(qualifiedName): HTMLCollectionOf<Element>;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |

##### Returns

`HTMLCollectionOf`\<`Element`\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagName
```

***

### getElementsByTagNameNS()

#### Call Signature

```ts
getElementsByTagNameNS(namespaceURI, localName): HTMLCollectionOf<HTMLElement>;
```

The **`Element.getElementsByTagNameNS()`** method returns a live HTMLCollection of elements with the given tag name belonging to the given namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getElementsByTagNameNS)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespaceURI` | `"http://www.w3.org/1999/xhtml"` |
| `localName` | `string` |

##### Returns

`HTMLCollectionOf`\<`HTMLElement`\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagNameNS
```

#### Call Signature

```ts
getElementsByTagNameNS(namespaceURI, localName): HTMLCollectionOf<SVGElement>;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespaceURI` | `"http://www.w3.org/2000/svg"` |
| `localName` | `string` |

##### Returns

`HTMLCollectionOf`\<`SVGElement`\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagNameNS
```

#### Call Signature

```ts
getElementsByTagNameNS(namespaceURI, localName): HTMLCollectionOf<MathMLElement>;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespaceURI` | `"http://www.w3.org/1998/Math/MathML"` |
| `localName` | `string` |

##### Returns

`HTMLCollectionOf`\<`MathMLElement`\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagNameNS
```

#### Call Signature

```ts
getElementsByTagNameNS(namespace, localName): HTMLCollectionOf<Element>;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `localName` | `string` |

##### Returns

`HTMLCollectionOf`\<`Element`\>

##### Inherited from

```ts
HTMLImageElement.getElementsByTagNameNS
```

***

### getHTML()

```ts
getHTML(options?): string;
```

The **`getHTML()`** method of the Element interface is used to serialize an element's DOM to an HTML string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/getHTML)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `GetHTMLOptions` |

#### Returns

`string`

#### Inherited from

```ts
HTMLImageElement.getHTML
```

***

### getRootNode()

```ts
getRootNode(options?): Node;
```

The **`getRootNode()`** method of the Node interface returns the context object's root, which optionally includes the shadow root if it is available.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/getRootNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `GetRootNodeOptions` |

#### Returns

`Node`

#### Inherited from

```ts
HTMLImageElement.getRootNode
```

***

### hasAttribute()

```ts
hasAttribute(qualifiedName): boolean;
```

The **`Element.hasAttribute()`** method returns a **Boolean** value indicating whether the specified element has the specified attribute or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttribute)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.hasAttribute
```

***

### hasAttributeNS()

```ts
hasAttributeNS(namespace, localName): boolean;
```

The **`hasAttributeNS()`** method of the Element interface returns a boolean value indicating whether the current element has the specified attribute with the specified namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttributeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `localName` | `string` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.hasAttributeNS
```

***

### hasAttributes()

```ts
hasAttributes(): boolean;
```

The **`hasAttributes()`** method of the Element interface returns a boolean value indicating whether the current element has any attributes or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasAttributes)

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.hasAttributes
```

***

### hasChildNodes()

```ts
hasChildNodes(): boolean;
```

The **`hasChildNodes()`** method of the Node interface returns a boolean value indicating whether the given Node has child nodes or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/hasChildNodes)

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.hasChildNodes
```

***

### hasPointerCapture()

```ts
hasPointerCapture(pointerId): boolean;
```

The **`hasPointerCapture()`** method of the pointer capture for the pointer identified by the given pointer ID.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/hasPointerCapture)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pointerId` | `number` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.hasPointerCapture
```

***

### hidePopover()

```ts
hidePopover(): void;
```

The **`hidePopover()`** method of the HTMLElement interface hides a popover element (i.e., one that has a valid `popover` attribute) by removing it from the top layer and styling it with `display: none`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/hidePopover)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.hidePopover
```

***

### insertAdjacentElement()

```ts
insertAdjacentElement(where, element): Element | null;
```

The **`insertAdjacentElement()`** method of the relative to the element it is invoked upon.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentElement)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `where` | `InsertPosition` |
| `element` | `Element` |

#### Returns

`Element` \| `null`

#### Inherited from

```ts
HTMLImageElement.insertAdjacentElement
```

***

### insertAdjacentHTML()

```ts
insertAdjacentHTML(position, string): void;
```

The **`insertAdjacentHTML()`** method of the the resulting nodes into the DOM tree at a specified position.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentHTML)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `position` | `InsertPosition` |
| `string` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.insertAdjacentHTML
```

***

### insertAdjacentText()

```ts
insertAdjacentText(where, data): void;
```

The **`insertAdjacentText()`** method of the Element interface, given a relative position and a string, inserts a new text node at the given position relative to the element it is called from.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/insertAdjacentText)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `where` | `InsertPosition` |
| `data` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.insertAdjacentText
```

***

### insertBefore()

```ts
insertBefore<T>(node, child): T;
```

The **`insertBefore()`** method of the Node interface inserts a node before a _reference node_ as a child of a specified _parent node_.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/insertBefore)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `T` |
| `child` | `Node` \| `null` |

#### Returns

`T`

#### Inherited from

```ts
HTMLImageElement.insertBefore
```

***

### isDefaultNamespace()

```ts
isDefaultNamespace(namespace): boolean;
```

The **`isDefaultNamespace()`** method of the Node interface accepts a namespace URI as an argument.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isDefaultNamespace)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.isDefaultNamespace
```

***

### isEqualNode()

```ts
isEqualNode(otherNode): boolean;
```

The **`isEqualNode()`** method of the Node interface tests whether two nodes are equal.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isEqualNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `otherNode` | `Node` \| `null` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.isEqualNode
```

***

### isSameNode()

```ts
isSameNode(otherNode): boolean;
```

The **`isSameNode()`** method of the Node interface is a legacy alias the for the `===` strict equality operator.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isSameNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `otherNode` | `Node` \| `null` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.isSameNode
```

***

### lookupNamespaceURI()

```ts
lookupNamespaceURI(prefix): string | null;
```

The **`lookupNamespaceURI()`** method of the Node interface takes a prefix as parameter and returns the namespace URI associated with it on the given node if found (and `null` if not).

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lookupNamespaceURI)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `prefix` | `string` \| `null` |

#### Returns

`string` \| `null`

#### Inherited from

```ts
HTMLImageElement.lookupNamespaceURI
```

***

### lookupPrefix()

```ts
lookupPrefix(namespace): string | null;
```

The **`lookupPrefix()`** method of the Node interface returns a string containing the prefix for a given namespace URI, if present, and `null` if not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lookupPrefix)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |

#### Returns

`string` \| `null`

#### Inherited from

```ts
HTMLImageElement.lookupPrefix
```

***

### matches()

```ts
matches(selectors): boolean;
```

The **`matches()`** method of the Element interface tests whether the element would be selected by the specified CSS selector.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/matches)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `string` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.matches
```

***

### normalize()

```ts
normalize(): void;
```

The **`normalize()`** method of the Node interface puts the specified node and all of its sub-tree into a _normalized_ form.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/normalize)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.normalize
```

***

### prepend()

```ts
prepend(...nodes): void;
```

Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/prepend)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.prepend
```

***

### querySelector()

#### Call Signature

```ts
querySelector<K>(selectors): HTMLElementTagNameMap[K] | null;
```

Returns the first element that is a descendant of node that matches selectors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`HTMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.querySelector
```

#### Call Signature

```ts
querySelector<K>(selectors): SVGElementTagNameMap[K] | null;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `SVGElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`SVGElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.querySelector
```

#### Call Signature

```ts
querySelector<K>(selectors): MathMLElementTagNameMap[K] | null;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `MathMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`MathMLElementTagNameMap`\[`K`\] \| `null`

##### Inherited from

```ts
HTMLImageElement.querySelector
```

#### Call Signature

```ts
querySelector<K>(selectors): HTMLElementDeprecatedTagNameMap[K] | null;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementDeprecatedTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`HTMLElementDeprecatedTagNameMap`\[`K`\] \| `null`

##### Deprecated

##### Inherited from

```ts
HTMLImageElement.querySelector
```

#### Call Signature

```ts
querySelector<E>(selectors): E | null;
```

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `Element` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `string` |

##### Returns

`E` \| `null`

##### Inherited from

```ts
HTMLImageElement.querySelector
```

***

### querySelectorAll()

#### Call Signature

```ts
querySelectorAll<K>(selectors): NodeListOf<HTMLElementTagNameMap[K]>;
```

Returns all element descendants of node that match selectors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`NodeListOf`\<`HTMLElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.querySelectorAll
```

#### Call Signature

```ts
querySelectorAll<K>(selectors): NodeListOf<SVGElementTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `SVGElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`NodeListOf`\<`SVGElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.querySelectorAll
```

#### Call Signature

```ts
querySelectorAll<K>(selectors): NodeListOf<MathMLElementTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `MathMLElementTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`NodeListOf`\<`MathMLElementTagNameMap`\[`K`\]\>

##### Inherited from

```ts
HTMLImageElement.querySelectorAll
```

#### Call Signature

```ts
querySelectorAll<K>(selectors): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementDeprecatedTagNameMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `K` |

##### Returns

`NodeListOf`\<`HTMLElementDeprecatedTagNameMap`\[`K`\]\>

##### Deprecated

##### Inherited from

```ts
HTMLImageElement.querySelectorAll
```

#### Call Signature

```ts
querySelectorAll<E>(selectors): NodeListOf<E>;
```

##### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` *extends* `Element` | `Element` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `string` |

##### Returns

`NodeListOf`\<`E`\>

##### Inherited from

```ts
HTMLImageElement.querySelectorAll
```

***

### releasePointerCapture()

```ts
releasePointerCapture(pointerId): void;
```

The **`releasePointerCapture()`** method of the previously set for a specific (PointerEvent) _pointer_.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/releasePointerCapture)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pointerId` | `number` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.releasePointerCapture
```

***

### remove()

```ts
remove(): void;
```

Removes node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/remove)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.remove
```

***

### removeAttribute()

```ts
removeAttribute(qualifiedName): void;
```

The Element method **`removeAttribute()`** removes the attribute with the specified name from the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttribute)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.removeAttribute
```

***

### removeAttributeNode()

```ts
removeAttributeNode(attr): Attr;
```

The **`removeAttributeNode()`** method of the Element interface removes the specified Attr node from the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttributeNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attr` | `Attr` |

#### Returns

`Attr`

#### Inherited from

```ts
HTMLImageElement.removeAttributeNode
```

***

### removeAttributeNS()

```ts
removeAttributeNS(namespace, localName): void;
```

The **`removeAttributeNS()`** method of the If you are working with HTML and you don't need to specify the requested attribute as being part of a specific namespace, use the Element.removeAttribute() method instead.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/removeAttributeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `localName` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.removeAttributeNS
```

***

### removeChild()

```ts
removeChild<T>(child): T;
```

The **`removeChild()`** method of the Node interface removes a child node from the DOM and returns the removed node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/removeChild)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `child` | `T` |

#### Returns

`T`

#### Inherited from

```ts
HTMLImageElement.removeChild
```

***

### removeEventListener()

#### Call Signature

```ts
removeEventListener<K>(
   type, 
   listener, 
   options?): void;
```

##### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* keyof `HTMLElementEventMap` |

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `K` |
| `listener` | (`this`, `ev`) => `any` |
| `options?` | `boolean` \| `EventListenerOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.removeEventListener
```

#### Call Signature

```ts
removeEventListener(
   type, 
   listener, 
   options?): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `string` |
| `listener` | `EventListenerOrEventListenerObject` |
| `options?` | `boolean` \| `EventListenerOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.removeEventListener
```

***

### replaceChild()

```ts
replaceChild<T>(node, child): T;
```

The **`replaceChild()`** method of the Node interface replaces a child node within the given (parent) node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/replaceChild)

#### Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |
| `child` | `T` |

#### Returns

`T`

#### Inherited from

```ts
HTMLImageElement.replaceChild
```

***

### replaceChildren()

```ts
replaceChildren(...nodes): void;
```

Replace all children of node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/replaceChildren)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.replaceChildren
```

***

### replaceWith()

```ts
replaceWith(...nodes): void;
```

Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes.

Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/replaceWith)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`nodes` | (`string` \| `Node`)[] |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.replaceWith
```

***

### requestFullscreen()

```ts
requestFullscreen(options?): Promise<void>;
```

The **`Element.requestFullscreen()`** method issues an asynchronous request to make the element be displayed in fullscreen mode.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/requestFullscreen)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `FullscreenOptions` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

```ts
HTMLImageElement.requestFullscreen
```

***

### requestPointerLock()

```ts
requestPointerLock(options?): Promise<void>;
```

The **`requestPointerLock()`** method of the Element interface lets you asynchronously ask for the pointer to be locked on the given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/requestPointerLock)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `PointerLockOptions` |

#### Returns

`Promise`\<`void`\>

#### Inherited from

```ts
HTMLImageElement.requestPointerLock
```

***

### scroll()

#### Call Signature

```ts
scroll(options?): void;
```

The **`scroll()`** method of the Element interface scrolls the element to a particular set of coordinates inside a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scroll)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `ScrollToOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scroll
```

#### Call Signature

```ts
scroll(x, y): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `x` | `number` |
| `y` | `number` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scroll
```

***

### scrollBy()

#### Call Signature

```ts
scrollBy(options?): void;
```

The **`scrollBy()`** method of the Element interface scrolls an element by the given amount.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollBy)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `ScrollToOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scrollBy
```

#### Call Signature

```ts
scrollBy(x, y): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `x` | `number` |
| `y` | `number` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scrollBy
```

***

### scrollIntoView()

```ts
scrollIntoView(arg?): void;
```

The Element interface's **`scrollIntoView()`** method scrolls the element's ancestor containers such that the element on which `scrollIntoView()` is called is visible to the user.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollIntoView)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `arg?` | `boolean` \| `ScrollIntoViewOptions` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.scrollIntoView
```

***

### scrollTo()

#### Call Signature

```ts
scrollTo(options?): void;
```

The **`scrollTo()`** method of the Element interface scrolls to a particular set of coordinates inside a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollTo)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `ScrollToOptions` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scrollTo
```

#### Call Signature

```ts
scrollTo(x, y): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `x` | `number` |
| `y` | `number` |

##### Returns

`void`

##### Inherited from

```ts
HTMLImageElement.scrollTo
```

***

### setAttribute()

```ts
setAttribute(qualifiedName, value): void;
```

The **`setAttribute()`** method of the Element interface sets the value of an attribute on the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttribute)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.setAttribute
```

***

### setAttributeNode()

```ts
setAttributeNode(attr): Attr | null;
```

The **`setAttributeNode()`** method of the Element interface adds a new Attr node to the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNode)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attr` | `Attr` |

#### Returns

`Attr` \| `null`

#### Inherited from

```ts
HTMLImageElement.setAttributeNode
```

***

### setAttributeNodeNS()

```ts
setAttributeNodeNS(attr): Attr | null;
```

The **`setAttributeNodeNS()`** method of the Element interface adds a new namespaced Attr node to an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNodeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `attr` | `Attr` |

#### Returns

`Attr` \| `null`

#### Inherited from

```ts
HTMLImageElement.setAttributeNodeNS
```

***

### setAttributeNS()

```ts
setAttributeNS(
   namespace, 
   qualifiedName, 
   value): void;
```

`setAttributeNS` adds a new attribute or changes the value of an attribute with the given namespace and name.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setAttributeNS)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `namespace` | `string` \| `null` |
| `qualifiedName` | `string` |
| `value` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.setAttributeNS
```

***

### setHTMLUnsafe()

```ts
setHTMLUnsafe(html): void;
```

The **`setHTMLUnsafe()`** method of the Element interface is used to parse a string of HTML into a DocumentFragment, optionally filtering out unwanted elements and attributes, and those that don't belong in the context, and then using it to replace the element's subtree in the DOM.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setHTMLUnsafe)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `html` | `string` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.setHTMLUnsafe
```

***

### setPointerCapture()

```ts
setPointerCapture(pointerId): void;
```

The **`setPointerCapture()`** method of the _capture target_ of future pointer events.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/setPointerCapture)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `pointerId` | `number` |

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.setPointerCapture
```

***

### showPopover()

```ts
showPopover(): void;
```

The **`showPopover()`** method of the HTMLElement interface shows a Popover_API element (i.e., one that has a valid `popover` attribute) by adding it to the top layer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/showPopover)

#### Returns

`void`

#### Inherited from

```ts
HTMLImageElement.showPopover
```

***

### toggleAttribute()

```ts
toggleAttribute(qualifiedName, force?): boolean;
```

The **`toggleAttribute()`** method of the present and adding it if it is not present) on the given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/toggleAttribute)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `qualifiedName` | `string` |
| `force?` | `boolean` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.toggleAttribute
```

***

### togglePopover()

```ts
togglePopover(options?): boolean;
```

The **`togglePopover()`** method of the HTMLElement interface toggles a Popover_API element (i.e., one that has a valid `popover` attribute) between the hidden and showing states.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/togglePopover)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `boolean` |

#### Returns

`boolean`

#### Inherited from

```ts
HTMLImageElement.togglePopover
```

***

### ~~webkitMatchesSelector()~~

```ts
webkitMatchesSelector(selectors): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `selectors` | `string` |

#### Returns

`boolean`

#### Deprecated

This is a legacy alias of `matches`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/matches)

#### Inherited from

```ts
HTMLImageElement.webkitMatchesSelector
```

## Properties

### \_zarrKey?

```ts
optional _zarrKey: string;
```

***

### \_zarrObjectUrl?

```ts
optional _zarrObjectUrl: string;
```

***

### accessKey

```ts
accessKey: string;
```

The **`HTMLElement.accessKey`** property sets the keystroke which a user can press to jump to a given element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/accessKey)

#### Inherited from

```ts
HTMLImageElement.accessKey
```

***

### accessKeyLabel

```ts
readonly accessKeyLabel: string;
```

The **`HTMLElement.accessKeyLabel`** read-only property returns a string containing the element's browser-assigned access key (if any); otherwise it returns an empty string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/accessKeyLabel)

#### Inherited from

```ts
HTMLImageElement.accessKeyLabel
```

***

### ~~align~~

```ts
align: string;
```

The _obsolete_ **`align`** property of the HTMLImageElement interface is a string which indicates how to position the image relative to its container.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/align)

#### Inherited from

```ts
HTMLImageElement.align
```

***

### alt

```ts
alt: string;
```

The HTMLImageElement property **`alt`** provides fallback (alternate) text to display when the image specified by the img element is not loaded.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/alt)

#### Inherited from

```ts
HTMLImageElement.alt
```

***

### ariaActiveDescendantElement

```ts
ariaActiveDescendantElement: Element | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaActiveDescendantElement)

#### Inherited from

```ts
HTMLImageElement.ariaActiveDescendantElement
```

***

### ariaAtomic

```ts
ariaAtomic: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAtomic)

#### Inherited from

```ts
HTMLImageElement.ariaAtomic
```

***

### ariaAutoComplete

```ts
ariaAutoComplete: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaAutoComplete)

#### Inherited from

```ts
HTMLImageElement.ariaAutoComplete
```

***

### ariaBrailleLabel

```ts
ariaBrailleLabel: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleLabel)

#### Inherited from

```ts
HTMLImageElement.ariaBrailleLabel
```

***

### ariaBrailleRoleDescription

```ts
ariaBrailleRoleDescription: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBrailleRoleDescription)

#### Inherited from

```ts
HTMLImageElement.ariaBrailleRoleDescription
```

***

### ariaBusy

```ts
ariaBusy: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaBusy)

#### Inherited from

```ts
HTMLImageElement.ariaBusy
```

***

### ariaChecked

```ts
ariaChecked: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaChecked)

#### Inherited from

```ts
HTMLImageElement.ariaChecked
```

***

### ariaColCount

```ts
ariaColCount: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColCount)

#### Inherited from

```ts
HTMLImageElement.ariaColCount
```

***

### ariaColIndex

```ts
ariaColIndex: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndex)

#### Inherited from

```ts
HTMLImageElement.ariaColIndex
```

***

### ariaColIndexText

```ts
ariaColIndexText: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColIndexText)

#### Inherited from

```ts
HTMLImageElement.ariaColIndexText
```

***

### ariaColSpan

```ts
ariaColSpan: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaColSpan)

#### Inherited from

```ts
HTMLImageElement.ariaColSpan
```

***

### ariaControlsElements

```ts
ariaControlsElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaControlsElements)

#### Inherited from

```ts
HTMLImageElement.ariaControlsElements
```

***

### ariaCurrent

```ts
ariaCurrent: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaCurrent)

#### Inherited from

```ts
HTMLImageElement.ariaCurrent
```

***

### ariaDescribedByElements

```ts
ariaDescribedByElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDescribedByElements)

#### Inherited from

```ts
HTMLImageElement.ariaDescribedByElements
```

***

### ariaDescription

```ts
ariaDescription: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDescription)

#### Inherited from

```ts
HTMLImageElement.ariaDescription
```

***

### ariaDetailsElements

```ts
ariaDetailsElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDetailsElements)

#### Inherited from

```ts
HTMLImageElement.ariaDetailsElements
```

***

### ariaDisabled

```ts
ariaDisabled: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaDisabled)

#### Inherited from

```ts
HTMLImageElement.ariaDisabled
```

***

### ariaErrorMessageElements

```ts
ariaErrorMessageElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaErrorMessageElements)

#### Inherited from

```ts
HTMLImageElement.ariaErrorMessageElements
```

***

### ariaExpanded

```ts
ariaExpanded: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaExpanded)

#### Inherited from

```ts
HTMLImageElement.ariaExpanded
```

***

### ariaFlowToElements

```ts
ariaFlowToElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaFlowToElements)

#### Inherited from

```ts
HTMLImageElement.ariaFlowToElements
```

***

### ariaHasPopup

```ts
ariaHasPopup: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHasPopup)

#### Inherited from

```ts
HTMLImageElement.ariaHasPopup
```

***

### ariaHidden

```ts
ariaHidden: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaHidden)

#### Inherited from

```ts
HTMLImageElement.ariaHidden
```

***

### ariaInvalid

```ts
ariaInvalid: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaInvalid)

#### Inherited from

```ts
HTMLImageElement.ariaInvalid
```

***

### ariaKeyShortcuts

```ts
ariaKeyShortcuts: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaKeyShortcuts)

#### Inherited from

```ts
HTMLImageElement.ariaKeyShortcuts
```

***

### ariaLabel

```ts
ariaLabel: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLabel)

#### Inherited from

```ts
HTMLImageElement.ariaLabel
```

***

### ariaLabelledByElements

```ts
ariaLabelledByElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLabelledByElements)

#### Inherited from

```ts
HTMLImageElement.ariaLabelledByElements
```

***

### ariaLevel

```ts
ariaLevel: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLevel)

#### Inherited from

```ts
HTMLImageElement.ariaLevel
```

***

### ariaLive

```ts
ariaLive: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaLive)

#### Inherited from

```ts
HTMLImageElement.ariaLive
```

***

### ariaModal

```ts
ariaModal: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaModal)

#### Inherited from

```ts
HTMLImageElement.ariaModal
```

***

### ariaMultiLine

```ts
ariaMultiLine: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiLine)

#### Inherited from

```ts
HTMLImageElement.ariaMultiLine
```

***

### ariaMultiSelectable

```ts
ariaMultiSelectable: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaMultiSelectable)

#### Inherited from

```ts
HTMLImageElement.ariaMultiSelectable
```

***

### ariaOrientation

```ts
ariaOrientation: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaOrientation)

#### Inherited from

```ts
HTMLImageElement.ariaOrientation
```

***

### ariaOwnsElements

```ts
ariaOwnsElements: readonly Element[] | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaOwnsElements)

#### Inherited from

```ts
HTMLImageElement.ariaOwnsElements
```

***

### ariaPlaceholder

```ts
ariaPlaceholder: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPlaceholder)

#### Inherited from

```ts
HTMLImageElement.ariaPlaceholder
```

***

### ariaPosInSet

```ts
ariaPosInSet: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPosInSet)

#### Inherited from

```ts
HTMLImageElement.ariaPosInSet
```

***

### ariaPressed

```ts
ariaPressed: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaPressed)

#### Inherited from

```ts
HTMLImageElement.ariaPressed
```

***

### ariaReadOnly

```ts
ariaReadOnly: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaReadOnly)

#### Inherited from

```ts
HTMLImageElement.ariaReadOnly
```

***

### ariaRelevant

```ts
ariaRelevant: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRelevant)

#### Inherited from

```ts
HTMLImageElement.ariaRelevant
```

***

### ariaRequired

```ts
ariaRequired: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRequired)

#### Inherited from

```ts
HTMLImageElement.ariaRequired
```

***

### ariaRoleDescription

```ts
ariaRoleDescription: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRoleDescription)

#### Inherited from

```ts
HTMLImageElement.ariaRoleDescription
```

***

### ariaRowCount

```ts
ariaRowCount: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowCount)

#### Inherited from

```ts
HTMLImageElement.ariaRowCount
```

***

### ariaRowIndex

```ts
ariaRowIndex: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndex)

#### Inherited from

```ts
HTMLImageElement.ariaRowIndex
```

***

### ariaRowIndexText

```ts
ariaRowIndexText: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowIndexText)

#### Inherited from

```ts
HTMLImageElement.ariaRowIndexText
```

***

### ariaRowSpan

```ts
ariaRowSpan: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaRowSpan)

#### Inherited from

```ts
HTMLImageElement.ariaRowSpan
```

***

### ariaSelected

```ts
ariaSelected: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSelected)

#### Inherited from

```ts
HTMLImageElement.ariaSelected
```

***

### ariaSetSize

```ts
ariaSetSize: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSetSize)

#### Inherited from

```ts
HTMLImageElement.ariaSetSize
```

***

### ariaSort

```ts
ariaSort: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaSort)

#### Inherited from

```ts
HTMLImageElement.ariaSort
```

***

### ariaValueMax

```ts
ariaValueMax: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMax)

#### Inherited from

```ts
HTMLImageElement.ariaValueMax
```

***

### ariaValueMin

```ts
ariaValueMin: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueMin)

#### Inherited from

```ts
HTMLImageElement.ariaValueMin
```

***

### ariaValueNow

```ts
ariaValueNow: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueNow)

#### Inherited from

```ts
HTMLImageElement.ariaValueNow
```

***

### ariaValueText

```ts
ariaValueText: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/ariaValueText)

#### Inherited from

```ts
HTMLImageElement.ariaValueText
```

***

### assignedSlot

```ts
readonly assignedSlot: HTMLSlotElement | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/assignedSlot)

#### Inherited from

```ts
HTMLImageElement.assignedSlot
```

***

### ATTRIBUTE\_NODE

```ts
readonly ATTRIBUTE_NODE: 2;
```

#### Inherited from

```ts
HTMLImageElement.ATTRIBUTE_NODE
```

***

### attributes

```ts
readonly attributes: NamedNodeMap;
```

The **`Element.attributes`** property returns a live collection of all attribute nodes registered to the specified node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/attributes)

#### Inherited from

```ts
HTMLImageElement.attributes
```

***

### attributeStyleMap

```ts
readonly attributeStyleMap: StylePropertyMap;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/attributeStyleMap)

#### Inherited from

```ts
HTMLImageElement.attributeStyleMap
```

***

### autocapitalize

```ts
autocapitalize: string;
```

The **`autocapitalize`** property of the HTMLElement interface represents the element's capitalization behavior for user input.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocapitalize)

#### Inherited from

```ts
HTMLImageElement.autocapitalize
```

***

### autocorrect

```ts
autocorrect: boolean;
```

The **`autocorrect`** property of the HTMLElement interface controls whether or not autocorrection of editable text is enabled for spelling and/or punctuation errors.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autocorrect)

#### Inherited from

```ts
HTMLImageElement.autocorrect
```

***

### autofocus

```ts
autofocus: boolean;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/autofocus)

#### Inherited from

```ts
HTMLImageElement.autofocus
```

***

### baseURI

```ts
readonly baseURI: string;
```

The read-only **`baseURI`** property of the Node interface returns the absolute base URL of the document containing the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/baseURI)

#### Inherited from

```ts
HTMLImageElement.baseURI
```

***

### ~~border~~

```ts
border: string;
```

The obsolete HTMLImageElement property **`border`** specifies the number of pixels thick the border surrounding the image should be.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/border)

#### Inherited from

```ts
HTMLImageElement.border
```

***

### CDATA\_SECTION\_NODE

```ts
readonly CDATA_SECTION_NODE: 4;
```

node is a CDATASection node.

#### Inherited from

```ts
HTMLImageElement.CDATA_SECTION_NODE
```

***

### childElementCount

```ts
readonly childElementCount: number;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/childElementCount)

#### Inherited from

```ts
HTMLImageElement.childElementCount
```

***

### childNodes

```ts
readonly childNodes: NodeListOf<ChildNode>;
```

The read-only **`childNodes`** property of the Node interface returns a live the first child node is assigned index `0`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/childNodes)

#### Inherited from

```ts
HTMLImageElement.childNodes
```

***

### children

```ts
readonly children: HTMLCollection;
```

Returns the child elements.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/children)

#### Inherited from

```ts
HTMLImageElement.children
```

***

### className

```ts
className: string;
```

The **`className`** property of the of the specified element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/className)

#### Inherited from

```ts
HTMLImageElement.className
```

***

### clientHeight

```ts
readonly clientHeight: number;
```

The **`clientHeight`** read-only property of the Element interface is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientHeight)

#### Inherited from

```ts
HTMLImageElement.clientHeight
```

***

### clientLeft

```ts
readonly clientLeft: number;
```

The **`clientLeft`** read-only property of the Element interface returns the width of the left border of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientLeft)

#### Inherited from

```ts
HTMLImageElement.clientLeft
```

***

### clientTop

```ts
readonly clientTop: number;
```

The **`clientTop`** read-only property of the Element interface returns the width of the top border of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientTop)

#### Inherited from

```ts
HTMLImageElement.clientTop
```

***

### clientWidth

```ts
readonly clientWidth: number;
```

The **`clientWidth`** read-only property of the Element interface is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/clientWidth)

#### Inherited from

```ts
HTMLImageElement.clientWidth
```

***

### COMMENT\_NODE

```ts
readonly COMMENT_NODE: 8;
```

node is a Comment node.

#### Inherited from

```ts
HTMLImageElement.COMMENT_NODE
```

***

### complete

```ts
readonly complete: boolean;
```

The read-only HTMLImageElement interface's **`complete`** attribute is a Boolean value which indicates whether or not the image has completely loaded.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/complete)

#### Inherited from

```ts
HTMLImageElement.complete
```

***

### contentEditable

```ts
contentEditable: string;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/contentEditable)

#### Inherited from

```ts
HTMLImageElement.contentEditable
```

***

### crossOrigin

```ts
crossOrigin: string | null;
```

The HTMLImageElement interface's **`crossOrigin`** attribute is a string which specifies the Cross-Origin Resource Sharing (CORS) setting to use when retrieving the image.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/crossOrigin)

#### Inherited from

```ts
HTMLImageElement.crossOrigin
```

***

### currentCSSZoom

```ts
readonly currentCSSZoom: number;
```

The **`currentCSSZoom`** read-only property of the Element interface provides the 'effective' CSS `zoom` of an element, taking into account the zoom applied to the element and all its parent elements.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/currentCSSZoom)

#### Inherited from

```ts
HTMLImageElement.currentCSSZoom
```

***

### currentSrc

```ts
readonly currentSrc: string;
```

The read-only HTMLImageElement property **`currentSrc`** indicates the URL of the image which is currently presented in the img element it represents.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/currentSrc)

#### Inherited from

```ts
HTMLImageElement.currentSrc
```

***

### dataset

```ts
readonly dataset: DOMStringMap;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset)

#### Inherited from

```ts
HTMLImageElement.dataset
```

***

### decoding

```ts
decoding: "async" | "sync" | "auto";
```

The **`decoding`** property of the HTMLImageElement interface provides a hint to the browser as to how it should decode the image.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/decoding)

#### Inherited from

```ts
HTMLImageElement.decoding
```

***

### dir

```ts
dir: string;
```

The **`HTMLElement.dir`** property indicates the text writing directionality of the content of the current element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dir)

#### Inherited from

```ts
HTMLImageElement.dir
```

***

### DOCUMENT\_FRAGMENT\_NODE

```ts
readonly DOCUMENT_FRAGMENT_NODE: 11;
```

node is a DocumentFragment node.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_FRAGMENT_NODE
```

***

### DOCUMENT\_NODE

```ts
readonly DOCUMENT_NODE: 9;
```

node is a document.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_NODE
```

***

### DOCUMENT\_POSITION\_CONTAINED\_BY

```ts
readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
```

Set when other is a descendant of node.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_CONTAINED_BY
```

***

### DOCUMENT\_POSITION\_CONTAINS

```ts
readonly DOCUMENT_POSITION_CONTAINS: 8;
```

Set when other is an ancestor of node.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_CONTAINS
```

***

### DOCUMENT\_POSITION\_DISCONNECTED

```ts
readonly DOCUMENT_POSITION_DISCONNECTED: 1;
```

Set when node and other are not in the same tree.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_DISCONNECTED
```

***

### DOCUMENT\_POSITION\_FOLLOWING

```ts
readonly DOCUMENT_POSITION_FOLLOWING: 4;
```

Set when other is following node.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_FOLLOWING
```

***

### DOCUMENT\_POSITION\_IMPLEMENTATION\_SPECIFIC

```ts
readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
```

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
```

***

### DOCUMENT\_POSITION\_PRECEDING

```ts
readonly DOCUMENT_POSITION_PRECEDING: 2;
```

Set when other is preceding node.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_POSITION_PRECEDING
```

***

### DOCUMENT\_TYPE\_NODE

```ts
readonly DOCUMENT_TYPE_NODE: 10;
```

node is a doctype.

#### Inherited from

```ts
HTMLImageElement.DOCUMENT_TYPE_NODE
```

***

### draggable

```ts
draggable: boolean;
```

The **`draggable`** property of the HTMLElement interface gets and sets a Boolean primitive indicating if the element is draggable.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/draggable)

#### Inherited from

```ts
HTMLImageElement.draggable
```

***

### ELEMENT\_NODE

```ts
readonly ELEMENT_NODE: 1;
```

node is an element.

#### Inherited from

```ts
HTMLImageElement.ELEMENT_NODE
```

***

### enterKeyHint

```ts
enterKeyHint: string;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/enterKeyHint)

#### Inherited from

```ts
HTMLImageElement.enterKeyHint
```

***

### ENTITY\_NODE

```ts
readonly ENTITY_NODE: 6;
```

#### Inherited from

```ts
HTMLImageElement.ENTITY_NODE
```

***

### ENTITY\_REFERENCE\_NODE

```ts
readonly ENTITY_REFERENCE_NODE: 5;
```

#### Inherited from

```ts
HTMLImageElement.ENTITY_REFERENCE_NODE
```

***

### fetchPriority

```ts
fetchPriority: "auto" | "high" | "low";
```

The **`fetchPriority`** property of the HTMLImageElement interface represents a hint to the browser indicating how it should prioritize fetching a particular image relative to other images.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority)

#### Inherited from

```ts
HTMLImageElement.fetchPriority
```

***

### firstChild

```ts
readonly firstChild: ChildNode | null;
```

The read-only **`firstChild`** property of the Node interface returns the node's first child in the tree, or `null` if the node has no children.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/firstChild)

#### Inherited from

```ts
HTMLImageElement.firstChild
```

***

### firstElementChild

```ts
readonly firstElementChild: Element | null;
```

Returns the first child that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/firstElementChild)

#### Inherited from

```ts
HTMLImageElement.firstElementChild
```

***

### height

```ts
height: number;
```

The **`height`** property of the drawn, in CSS pixel if the image is being drawn or rendered to any visual medium such as the screen or a printer; otherwise, it's the natural, pixel density corrected height of the image.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/height)

#### Inherited from

```ts
HTMLImageElement.height
```

***

### hidden

```ts
hidden: boolean;
```

The HTMLElement property **`hidden`** reflects the value of the element's `hidden` attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/hidden)

#### Inherited from

```ts
HTMLImageElement.hidden
```

***

### ~~hspace~~

```ts
hspace: number;
```

The _obsolete_ **`hspace`** property of the space to leave empty on the left and right sides of the img element when laying out the page.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/hspace)

#### Inherited from

```ts
HTMLImageElement.hspace
```

***

### id

```ts
id: string;
```

The **`id`** property of the Element interface represents the element's identifier, reflecting the **`id`** global attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/id)

#### Inherited from

```ts
HTMLImageElement.id
```

***

### inert

```ts
inert: boolean;
```

The HTMLElement property **`inert`** reflects the value of the element's `inert` attribute.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inert)

#### Inherited from

```ts
HTMLImageElement.inert
```

***

### innerHTML

```ts
innerHTML: string;
```

The **`innerHTML`** property of the Element interface gets or sets the HTML or XML markup contained within the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/innerHTML)

#### Inherited from

```ts
HTMLImageElement.innerHTML
```

***

### innerText

```ts
innerText: string;
```

The **`innerText`** property of the HTMLElement interface represents the rendered text content of a node and its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/innerText)

#### Inherited from

```ts
HTMLImageElement.innerText
```

***

### inputMode

```ts
inputMode: string;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/inputMode)

#### Inherited from

```ts
HTMLImageElement.inputMode
```

***

### isConnected

```ts
readonly isConnected: boolean;
```

The read-only **`isConnected`** property of the Node interface returns a boolean indicating whether the node is connected (directly or indirectly) to a Document object.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/isConnected)

#### Inherited from

```ts
HTMLImageElement.isConnected
```

***

### isContentEditable

```ts
readonly isContentEditable: boolean;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/isContentEditable)

#### Inherited from

```ts
HTMLImageElement.isContentEditable
```

***

### isMap

```ts
isMap: boolean;
```

The HTMLImageElement property **`isMap`** is a Boolean value which indicates that the image is to be used by a server-side image map.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/isMap)

#### Inherited from

```ts
HTMLImageElement.isMap
```

***

### lang

```ts
lang: string;
```

The **`lang`** property of the HTMLElement interface indicates the base language of an element's attribute values and text content, in the form of a MISSING: RFC(5646, 'BCP 47 language identifier tag')].

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/lang)

#### Inherited from

```ts
HTMLImageElement.lang
```

***

### lastChild

```ts
readonly lastChild: ChildNode | null;
```

The read-only **`lastChild`** property of the Node interface returns the last child of the node, or `null` if there are no child nodes.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/lastChild)

#### Inherited from

```ts
HTMLImageElement.lastChild
```

***

### lastElementChild

```ts
readonly lastElementChild: Element | null;
```

Returns the last child that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/lastElementChild)

#### Inherited from

```ts
HTMLImageElement.lastElementChild
```

***

### loading

```ts
loading: "eager" | "lazy";
```

The HTMLImageElement property **`loading`** is a string whose value provides a hint to the user agent on how to handle the loading of the image which is currently outside the window's visual viewport.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/loading)

#### Inherited from

```ts
HTMLImageElement.loading
```

***

### localName

```ts
readonly localName: string;
```

The **`Element.localName`** read-only property returns the local part of the qualified name of an element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/localName)

#### Inherited from

```ts
HTMLImageElement.localName
```

***

### ~~longDesc~~

```ts
longDesc: string;
```

The _deprecated_ property **`longDesc`** on the HTMLImageElement interface specifies the URL of a text or HTML file which contains a long-form description of the image.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/longDesc)

#### Inherited from

```ts
HTMLImageElement.longDesc
```

***

### ~~lowsrc~~

```ts
lowsrc: string;
```

#### Deprecated

#### Inherited from

```ts
HTMLImageElement.lowsrc
```

***

### ~~name~~

```ts
name: string;
```

The HTMLImageElement interface's _deprecated_ **`name`** property specifies a name for the element.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/name)

#### Inherited from

```ts
HTMLImageElement.name
```

***

### namespaceURI

```ts
readonly namespaceURI: string | null;
```

The **`Element.namespaceURI`** read-only property returns the namespace URI of the element, or `null` if the element is not in a namespace.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/namespaceURI)

#### Inherited from

```ts
HTMLImageElement.namespaceURI
```

***

### naturalHeight

```ts
readonly naturalHeight: number;
```

The HTMLImageElement interface's **`naturalHeight`** property is a read-only value which returns the intrinsic (natural), density-corrected height of the image in This is the height the image is if drawn with nothing constraining its height; if you don't specify a height for the image, or place the image inside a container that either limits or expressly specifies the image height, it will be rendered this tall.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/naturalHeight)

#### Inherited from

```ts
HTMLImageElement.naturalHeight
```

***

### naturalWidth

```ts
readonly naturalWidth: number;
```

The HTMLImageElement interface's read-only **`naturalWidth`** property returns the intrinsic (natural), density-corrected width of the image in CSS pixel.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/naturalWidth)

#### Inherited from

```ts
HTMLImageElement.naturalWidth
```

***

### nextElementSibling

```ts
readonly nextElementSibling: Element | null;
```

Returns the first following sibling that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/nextElementSibling)

#### Inherited from

```ts
HTMLImageElement.nextElementSibling
```

***

### nextSibling

```ts
readonly nextSibling: ChildNode | null;
```

The read-only **`nextSibling`** property of the Node interface returns the node immediately following the specified one in their parent's Node.childNodes, or returns `null` if the specified node is the last child in the parent element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nextSibling)

#### Inherited from

```ts
HTMLImageElement.nextSibling
```

***

### nodeName

```ts
readonly nodeName: string;
```

The read-only **`nodeName`** property of Node returns the name of the current node as a string.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeName)

#### Inherited from

```ts
HTMLImageElement.nodeName
```

***

### nodeType

```ts
readonly nodeType: number;
```

The read-only **`nodeType`** property of a Node interface is an integer that identifies what the node is.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeType)

#### Inherited from

```ts
HTMLImageElement.nodeType
```

***

### nodeValue

```ts
nodeValue: string | null;
```

The **`nodeValue`** property of the Node interface returns or sets the value of the current node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/nodeValue)

#### Inherited from

```ts
HTMLImageElement.nodeValue
```

***

### nonce?

```ts
optional nonce: string;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/nonce)

#### Inherited from

```ts
HTMLImageElement.nonce
```

***

### NOTATION\_NODE

```ts
readonly NOTATION_NODE: 12;
```

#### Inherited from

```ts
HTMLImageElement.NOTATION_NODE
```

***

### offsetHeight

```ts
readonly offsetHeight: number;
```

The **`offsetHeight`** read-only property of the HTMLElement interface returns the height of an element, including vertical padding and borders, as an integer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetHeight)

#### Inherited from

```ts
HTMLImageElement.offsetHeight
```

***

### offsetLeft

```ts
readonly offsetLeft: number;
```

The **`offsetLeft`** read-only property of the HTMLElement interface returns the number of pixels that the _upper left corner_ of the current element is offset to the left within the HTMLElement.offsetParent node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetLeft)

#### Inherited from

```ts
HTMLImageElement.offsetLeft
```

***

### offsetParent

```ts
readonly offsetParent: Element | null;
```

The **`HTMLElement.offsetParent`** read-only property returns a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetParent)

#### Inherited from

```ts
HTMLImageElement.offsetParent
```

***

### offsetTop

```ts
readonly offsetTop: number;
```

The **`offsetTop`** read-only property of the HTMLElement interface returns the distance from the outer border of the current element (including its margin) to the top padding edge of the HTMLelement.offsetParent, the _closest positioned_ ancestor element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetTop)

#### Inherited from

```ts
HTMLImageElement.offsetTop
```

***

### offsetWidth

```ts
readonly offsetWidth: number;
```

The **`offsetWidth`** read-only property of the HTMLElement interface returns the layout width of an element as an integer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetWidth)

#### Inherited from

```ts
HTMLImageElement.offsetWidth
```

***

### onabort

```ts
onabort: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event)

#### Inherited from

```ts
HTMLImageElement.onabort
```

***

### onanimationcancel

```ts
onanimationcancel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event)

#### Inherited from

```ts
HTMLImageElement.onanimationcancel
```

***

### onanimationend

```ts
onanimationend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

```ts
HTMLImageElement.onanimationend
```

***

### onanimationiteration

```ts
onanimationiteration: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

```ts
HTMLImageElement.onanimationiteration
```

***

### onanimationstart

```ts
onanimationstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

```ts
HTMLImageElement.onanimationstart
```

***

### onauxclick

```ts
onauxclick: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/auxclick_event)

#### Inherited from

```ts
HTMLImageElement.onauxclick
```

***

### onbeforeinput

```ts
onbeforeinput: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforeinput_event)

#### Inherited from

```ts
HTMLImageElement.onbeforeinput
```

***

### onbeforematch

```ts
onbeforematch: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/beforematch_event)

#### Inherited from

```ts
HTMLImageElement.onbeforematch
```

***

### onbeforetoggle

```ts
onbeforetoggle: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/beforetoggle_event)

#### Inherited from

```ts
HTMLImageElement.onbeforetoggle
```

***

### onblur

```ts
onblur: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/blur_event)

#### Inherited from

```ts
HTMLImageElement.onblur
```

***

### oncancel

```ts
oncancel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event)

#### Inherited from

```ts
HTMLImageElement.oncancel
```

***

### oncanplay

```ts
oncanplay: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event)

#### Inherited from

```ts
HTMLImageElement.oncanplay
```

***

### oncanplaythrough

```ts
oncanplaythrough: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event)

#### Inherited from

```ts
HTMLImageElement.oncanplaythrough
```

***

### onchange

```ts
onchange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)

#### Inherited from

```ts
HTMLImageElement.onchange
```

***

### onclick

```ts
onclick: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/click_event)

#### Inherited from

```ts
HTMLImageElement.onclick
```

***

### onclose

```ts
onclose: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event)

#### Inherited from

```ts
HTMLImageElement.onclose
```

***

### oncontextlost

```ts
oncontextlost: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextlost_event)

#### Inherited from

```ts
HTMLImageElement.oncontextlost
```

***

### oncontextmenu

```ts
oncontextmenu: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event)

#### Inherited from

```ts
HTMLImageElement.oncontextmenu
```

***

### oncontextrestored

```ts
oncontextrestored: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/contextrestored_event)

#### Inherited from

```ts
HTMLImageElement.oncontextrestored
```

***

### oncopy

```ts
oncopy: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/copy_event)

#### Inherited from

```ts
HTMLImageElement.oncopy
```

***

### oncuechange

```ts
oncuechange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event)

#### Inherited from

```ts
HTMLImageElement.oncuechange
```

***

### oncut

```ts
oncut: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/cut_event)

#### Inherited from

```ts
HTMLImageElement.oncut
```

***

### ondblclick

```ts
ondblclick: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)

#### Inherited from

```ts
HTMLImageElement.ondblclick
```

***

### ondrag

```ts
ondrag: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event)

#### Inherited from

```ts
HTMLImageElement.ondrag
```

***

### ondragend

```ts
ondragend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event)

#### Inherited from

```ts
HTMLImageElement.ondragend
```

***

### ondragenter

```ts
ondragenter: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event)

#### Inherited from

```ts
HTMLImageElement.ondragenter
```

***

### ondragleave

```ts
ondragleave: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event)

#### Inherited from

```ts
HTMLImageElement.ondragleave
```

***

### ondragover

```ts
ondragover: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event)

#### Inherited from

```ts
HTMLImageElement.ondragover
```

***

### ondragstart

```ts
ondragstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event)

#### Inherited from

```ts
HTMLImageElement.ondragstart
```

***

### ondrop

```ts
ondrop: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event)

#### Inherited from

```ts
HTMLImageElement.ondrop
```

***

### ondurationchange

```ts
ondurationchange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event)

#### Inherited from

```ts
HTMLImageElement.ondurationchange
```

***

### onemptied

```ts
onemptied: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)

#### Inherited from

```ts
HTMLImageElement.onemptied
```

***

### onended

```ts
onended: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event)

#### Inherited from

```ts
HTMLImageElement.onended
```

***

### onerror

```ts
onerror: OnErrorEventHandler;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event)

#### Inherited from

```ts
HTMLImageElement.onerror
```

***

### onfocus

```ts
onfocus: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focus_event)

#### Inherited from

```ts
HTMLImageElement.onfocus
```

***

### onformdata

```ts
onformdata: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event)

#### Inherited from

```ts
HTMLImageElement.onformdata
```

***

### onfullscreenchange

```ts
onfullscreenchange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenchange_event)

#### Inherited from

```ts
HTMLImageElement.onfullscreenchange
```

***

### onfullscreenerror

```ts
onfullscreenerror: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/fullscreenerror_event)

#### Inherited from

```ts
HTMLImageElement.onfullscreenerror
```

***

### ongotpointercapture

```ts
ongotpointercapture: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event)

#### Inherited from

```ts
HTMLImageElement.ongotpointercapture
```

***

### oninput

```ts
oninput: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/input_event)

#### Inherited from

```ts
HTMLImageElement.oninput
```

***

### oninvalid

```ts
oninvalid: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/invalid_event)

#### Inherited from

```ts
HTMLImageElement.oninvalid
```

***

### onkeydown

```ts
onkeydown: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keydown_event)

#### Inherited from

```ts
HTMLImageElement.onkeydown
```

***

### ~~onkeypress~~

```ts
onkeypress: (this, ev) => any | null;
```

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keypress_event)

#### Inherited from

```ts
HTMLImageElement.onkeypress
```

***

### onkeyup

```ts
onkeyup: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keyup_event)

#### Inherited from

```ts
HTMLImageElement.onkeyup
```

***

### onload

```ts
onload: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/load_event)

#### Inherited from

```ts
HTMLImageElement.onload
```

***

### onloadeddata

```ts
onloadeddata: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event)

#### Inherited from

```ts
HTMLImageElement.onloadeddata
```

***

### onloadedmetadata

```ts
onloadedmetadata: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event)

#### Inherited from

```ts
HTMLImageElement.onloadedmetadata
```

***

### onloadstart

```ts
onloadstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadstart_event)

#### Inherited from

```ts
HTMLImageElement.onloadstart
```

***

### onlostpointercapture

```ts
onlostpointercapture: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/lostpointercapture_event)

#### Inherited from

```ts
HTMLImageElement.onlostpointercapture
```

***

### onmousedown

```ts
onmousedown: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousedown_event)

#### Inherited from

```ts
HTMLImageElement.onmousedown
```

***

### onmouseenter

```ts
onmouseenter: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event)

#### Inherited from

```ts
HTMLImageElement.onmouseenter
```

***

### onmouseleave

```ts
onmouseleave: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event)

#### Inherited from

```ts
HTMLImageElement.onmouseleave
```

***

### onmousemove

```ts
onmousemove: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousemove_event)

#### Inherited from

```ts
HTMLImageElement.onmousemove
```

***

### onmouseout

```ts
onmouseout: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseout_event)

#### Inherited from

```ts
HTMLImageElement.onmouseout
```

***

### onmouseover

```ts
onmouseover: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseover_event)

#### Inherited from

```ts
HTMLImageElement.onmouseover
```

***

### onmouseup

```ts
onmouseup: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseup_event)

#### Inherited from

```ts
HTMLImageElement.onmouseup
```

***

### onpaste

```ts
onpaste: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/paste_event)

#### Inherited from

```ts
HTMLImageElement.onpaste
```

***

### onpause

```ts
onpause: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event)

#### Inherited from

```ts
HTMLImageElement.onpause
```

***

### onplay

```ts
onplay: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event)

#### Inherited from

```ts
HTMLImageElement.onplay
```

***

### onplaying

```ts
onplaying: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event)

#### Inherited from

```ts
HTMLImageElement.onplaying
```

***

### onpointercancel

```ts
onpointercancel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event)

#### Inherited from

```ts
HTMLImageElement.onpointercancel
```

***

### onpointerdown

```ts
onpointerdown: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event)

#### Inherited from

```ts
HTMLImageElement.onpointerdown
```

***

### onpointerenter

```ts
onpointerenter: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event)

#### Inherited from

```ts
HTMLImageElement.onpointerenter
```

***

### onpointerleave

```ts
onpointerleave: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event)

#### Inherited from

```ts
HTMLImageElement.onpointerleave
```

***

### onpointermove

```ts
onpointermove: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointermove_event)

#### Inherited from

```ts
HTMLImageElement.onpointermove
```

***

### onpointerout

```ts
onpointerout: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerout_event)

#### Inherited from

```ts
HTMLImageElement.onpointerout
```

***

### onpointerover

```ts
onpointerover: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerover_event)

#### Inherited from

```ts
HTMLImageElement.onpointerover
```

***

### onpointerrawupdate

```ts
onpointerrawupdate: (this, ev) => any | null;
```

Available only in secure contexts.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerrawupdate_event)

#### Inherited from

```ts
HTMLImageElement.onpointerrawupdate
```

***

### onpointerup

```ts
onpointerup: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerup_event)

#### Inherited from

```ts
HTMLImageElement.onpointerup
```

***

### onprogress

```ts
onprogress: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/progress_event)

#### Inherited from

```ts
HTMLImageElement.onprogress
```

***

### onratechange

```ts
onratechange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event)

#### Inherited from

```ts
HTMLImageElement.onratechange
```

***

### onreset

```ts
onreset: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event)

#### Inherited from

```ts
HTMLImageElement.onreset
```

***

### onresize

```ts
onresize: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event)

#### Inherited from

```ts
HTMLImageElement.onresize
```

***

### onscroll

```ts
onscroll: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scroll_event)

#### Inherited from

```ts
HTMLImageElement.onscroll
```

***

### onscrollend

```ts
onscrollend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event)

#### Inherited from

```ts
HTMLImageElement.onscrollend
```

***

### onsecuritypolicyviolation

```ts
onsecuritypolicyviolation: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event)

#### Inherited from

```ts
HTMLImageElement.onsecuritypolicyviolation
```

***

### onseeked

```ts
onseeked: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event)

#### Inherited from

```ts
HTMLImageElement.onseeked
```

***

### onseeking

```ts
onseeking: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event)

#### Inherited from

```ts
HTMLImageElement.onseeking
```

***

### onselect

```ts
onselect: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event)

#### Inherited from

```ts
HTMLImageElement.onselect
```

***

### onselectionchange

```ts
onselectionchange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event)

#### Inherited from

```ts
HTMLImageElement.onselectionchange
```

***

### onselectstart

```ts
onselectstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/selectstart_event)

#### Inherited from

```ts
HTMLImageElement.onselectstart
```

***

### onslotchange

```ts
onslotchange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event)

#### Inherited from

```ts
HTMLImageElement.onslotchange
```

***

### onstalled

```ts
onstalled: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event)

#### Inherited from

```ts
HTMLImageElement.onstalled
```

***

### onsubmit

```ts
onsubmit: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event)

#### Inherited from

```ts
HTMLImageElement.onsubmit
```

***

### onsuspend

```ts
onsuspend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event)

#### Inherited from

```ts
HTMLImageElement.onsuspend
```

***

### ontimeupdate

```ts
ontimeupdate: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event)

#### Inherited from

```ts
HTMLImageElement.ontimeupdate
```

***

### ontoggle

```ts
ontoggle: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/toggle_event)

#### Inherited from

```ts
HTMLImageElement.ontoggle
```

***

### ontouchcancel?

```ts
optional ontouchcancel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchcancel_event)

#### Inherited from

```ts
HTMLImageElement.ontouchcancel
```

***

### ontouchend?

```ts
optional ontouchend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchend_event)

#### Inherited from

```ts
HTMLImageElement.ontouchend
```

***

### ontouchmove?

```ts
optional ontouchmove: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchmove_event)

#### Inherited from

```ts
HTMLImageElement.ontouchmove
```

***

### ontouchstart?

```ts
optional ontouchstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/touchstart_event)

#### Inherited from

```ts
HTMLImageElement.ontouchstart
```

***

### ontransitioncancel

```ts
ontransitioncancel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event)

#### Inherited from

```ts
HTMLImageElement.ontransitioncancel
```

***

### ontransitionend

```ts
ontransitionend: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

```ts
HTMLImageElement.ontransitionend
```

***

### ontransitionrun

```ts
ontransitionrun: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event)

#### Inherited from

```ts
HTMLImageElement.ontransitionrun
```

***

### ontransitionstart

```ts
ontransitionstart: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event)

#### Inherited from

```ts
HTMLImageElement.ontransitionstart
```

***

### onvolumechange

```ts
onvolumechange: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event)

#### Inherited from

```ts
HTMLImageElement.onvolumechange
```

***

### onwaiting

```ts
onwaiting: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event)

#### Inherited from

```ts
HTMLImageElement.onwaiting
```

***

### ~~onwebkitanimationend~~

```ts
onwebkitanimationend: (this, ev) => any | null;
```

#### Deprecated

This is a legacy alias of `onanimationend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)

#### Inherited from

```ts
HTMLImageElement.onwebkitanimationend
```

***

### ~~onwebkitanimationiteration~~

```ts
onwebkitanimationiteration: (this, ev) => any | null;
```

#### Deprecated

This is a legacy alias of `onanimationiteration`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)

#### Inherited from

```ts
HTMLImageElement.onwebkitanimationiteration
```

***

### ~~onwebkitanimationstart~~

```ts
onwebkitanimationstart: (this, ev) => any | null;
```

#### Deprecated

This is a legacy alias of `onanimationstart`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)

#### Inherited from

```ts
HTMLImageElement.onwebkitanimationstart
```

***

### ~~onwebkittransitionend~~

```ts
onwebkittransitionend: (this, ev) => any | null;
```

#### Deprecated

This is a legacy alias of `ontransitionend`.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)

#### Inherited from

```ts
HTMLImageElement.onwebkittransitionend
```

***

### onwheel

```ts
onwheel: (this, ev) => any | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/wheel_event)

#### Inherited from

```ts
HTMLImageElement.onwheel
```

***

### outerHTML

```ts
outerHTML: string;
```

The **`outerHTML`** attribute of the Element DOM interface gets the serialized HTML fragment describing the element including its descendants.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/outerHTML)

#### Inherited from

```ts
HTMLImageElement.outerHTML
```

***

### outerText

```ts
outerText: string;
```

The **`outerText`** property of the HTMLElement interface returns the same value as HTMLElement.innerText.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/outerText)

#### Inherited from

```ts
HTMLImageElement.outerText
```

***

### ownerDocument

```ts
readonly ownerDocument: Document;
```

The read-only **`ownerDocument`** property of the Node interface returns the top-level document object of the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/ownerDocument)

#### Inherited from

```ts
HTMLImageElement.ownerDocument
```

***

### parentElement

```ts
readonly parentElement: HTMLElement | null;
```

The read-only **`parentElement`** property of Node interface returns the DOM node's parent Element, or `null` if the node either has no parent, or its parent isn't a DOM Element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/parentElement)

#### Inherited from

```ts
HTMLImageElement.parentElement
```

***

### parentNode

```ts
readonly parentNode: ParentNode | null;
```

The read-only **`parentNode`** property of the Node interface returns the parent of the specified node in the DOM tree.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/parentNode)

#### Inherited from

```ts
HTMLImageElement.parentNode
```

***

### popover

```ts
popover: string | null;
```

The **`popover`** property of the HTMLElement interface gets and sets an element's popover state via JavaScript (`'auto'`, `'hint'`, or `'manual'`), and can be used for feature detection.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/popover)

#### Inherited from

```ts
HTMLImageElement.popover
```

***

### prefix

```ts
readonly prefix: string | null;
```

The **`Element.prefix`** read-only property returns the namespace prefix of the specified element, or `null` if no prefix is specified.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/prefix)

#### Inherited from

```ts
HTMLImageElement.prefix
```

***

### previousElementSibling

```ts
readonly previousElementSibling: Element | null;
```

Returns the first preceding sibling that is an element, and null otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/CharacterData/previousElementSibling)

#### Inherited from

```ts
HTMLImageElement.previousElementSibling
```

***

### previousSibling

```ts
readonly previousSibling: ChildNode | null;
```

The read-only **`previousSibling`** property of the Node interface returns the node immediately preceding the specified one in its parent's or `null` if the specified node is the first in that list.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/previousSibling)

#### Inherited from

```ts
HTMLImageElement.previousSibling
```

***

### PROCESSING\_INSTRUCTION\_NODE

```ts
readonly PROCESSING_INSTRUCTION_NODE: 7;
```

node is a ProcessingInstruction node.

#### Inherited from

```ts
HTMLImageElement.PROCESSING_INSTRUCTION_NODE
```

***

### referrerPolicy

```ts
referrerPolicy: string;
```

The **`HTMLImageElement.referrerPolicy`** property reflects the HTML `referrerpolicy` attribute of the resource.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/referrerPolicy)

#### Inherited from

```ts
HTMLImageElement.referrerPolicy
```

***

### role

```ts
role: string | null;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/role)

#### Inherited from

```ts
HTMLImageElement.role
```

***

### scrollHeight

```ts
readonly scrollHeight: number;
```

The **`scrollHeight`** read-only property of the Element interface is a measurement of the height of an element's content, including content not visible on the screen due to overflow.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollHeight)

#### Inherited from

```ts
HTMLImageElement.scrollHeight
```

***

### scrollLeft

```ts
scrollLeft: number;
```

The **`scrollLeft`** property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its left edge.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollLeft)

#### Inherited from

```ts
HTMLImageElement.scrollLeft
```

***

### scrollTop

```ts
scrollTop: number;
```

The **`scrollTop`** property of the Element interface gets or sets the number of pixels by which an element's content is scrolled from its top edge.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollTop)

#### Inherited from

```ts
HTMLImageElement.scrollTop
```

***

### scrollWidth

```ts
readonly scrollWidth: number;
```

The **`scrollWidth`** read-only property of the Element interface is a measurement of the width of an element's content, including content not visible on the screen due to overflow.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/scrollWidth)

#### Inherited from

```ts
HTMLImageElement.scrollWidth
```

***

### shadowRoot

```ts
readonly shadowRoot: ShadowRoot | null;
```

The `Element.shadowRoot` read-only property represents the shadow root hosted by the element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/shadowRoot)

#### Inherited from

```ts
HTMLImageElement.shadowRoot
```

***

### sizes

```ts
sizes: string;
```

The HTMLImageElement property **`sizes`** allows you to specify the layout width of the image for each of a list of media conditions.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/sizes)

#### Inherited from

```ts
HTMLImageElement.sizes
```

***

### slot

```ts
slot: string;
```

The **`slot`** property of the Element interface returns the name of the shadow DOM slot the element is inserted in.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/slot)

#### Inherited from

```ts
HTMLImageElement.slot
```

***

### spellcheck

```ts
spellcheck: boolean;
```

The **`spellcheck`** property of the HTMLElement interface represents a boolean value that controls the spell-checking hint.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/spellcheck)

#### Inherited from

```ts
HTMLImageElement.spellcheck
```

***

### src

```ts
src: string;
```

The HTMLImageElement property **`src`**, which reflects the HTML `src` attribute, specifies the image to display in the img element.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/src)

#### Inherited from

```ts
HTMLImageElement.src
```

***

### srcset

```ts
srcset: string;
```

The HTMLImageElement property **`srcset`** is a string which identifies one or more **image candidate strings**, separated using commas (`,`) each specifying image resources to use under given circumstances.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset)

#### Inherited from

```ts
HTMLImageElement.srcset
```

***

### tabIndex

```ts
tabIndex: number;
```

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/tabIndex)

#### Inherited from

```ts
HTMLImageElement.tabIndex
```

***

### tagName

```ts
readonly tagName: string;
```

The **`tagName`** read-only property of the Element interface returns the tag name of the element on which it's called.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/tagName)

#### Inherited from

```ts
HTMLImageElement.tagName
```

***

### TEXT\_NODE

```ts
readonly TEXT_NODE: 3;
```

node is a Text node.

#### Inherited from

```ts
HTMLImageElement.TEXT_NODE
```

***

### title

```ts
title: string;
```

The **`HTMLElement.title`** property represents the title of the element: the text usually displayed in a 'tooltip' popup when the mouse is over the node.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/title)

#### Inherited from

```ts
HTMLImageElement.title
```

***

### translate

```ts
translate: boolean;
```

The **`translate`** property of the HTMLElement interface indicates whether an element's attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/translate)

#### Inherited from

```ts
HTMLImageElement.translate
```

***

### useMap

```ts
useMap: string;
```

The **`useMap`** property on the providing the name of the client-side image map to apply to the image.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/useMap)

#### Inherited from

```ts
HTMLImageElement.useMap
```

***

### ~~vspace~~

```ts
vspace: number;
```

The _obsolete_ **`vspace`** property of the to leave empty on the top and bottom of the img element when laying out the page.

#### Deprecated

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/vspace)

#### Inherited from

```ts
HTMLImageElement.vspace
```

***

### width

```ts
width: number;
```

The **`width`** property of the drawn in CSS pixel if it's being drawn or rendered to any visual medium such as a screen or printer.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/width)

#### Inherited from

```ts
HTMLImageElement.width
```

***

### writingSuggestions

```ts
writingSuggestions: string;
```

The **`writingSuggestions`** property of the HTMLElement interface is a string indicating if browser-provided writing suggestions should be enabled under the scope of the element or not.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/writingSuggestions)

#### Inherited from

```ts
HTMLImageElement.writingSuggestions
```

***

### x

```ts
readonly x: number;
```

The read-only HTMLImageElement property **`x`** indicates the x-coordinate of the origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/x)

#### Inherited from

```ts
HTMLImageElement.x
```

***

### y

```ts
readonly y: number;
```

The read-only HTMLImageElement property **`y`** indicates the y-coordinate of the origin.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/y)

#### Inherited from

```ts
HTMLImageElement.y
```
