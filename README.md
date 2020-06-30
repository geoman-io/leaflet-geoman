<p align="center">
  <a href="https://geoman.io/leaflet-geoman">
    <img width="130" alt="Geoman Logo" src="https://file-jxzyjgqwut.now.sh/" />
  </a>
</p>
<h1 align="center">
  Leaflet-Geoman
</h1>
<p align="center">
  <strong>Leaflet Plugin For Creating And Editing Geometry Layers</strong><br>
  Draw, Edit, Drag, Cut, Snap and Pin Layers<br>
  Supports Markers, CircleMarkers, Polylines, Polygons, Circles, Rectangles, LayerGroups, GeoJSON and MultiPolygons
</p>
<p align="center">
  <a href="https://badge.fury.io/js/%40geoman-io%2Fleaflet-geoman-free">
    <img src="https://badge.fury.io/js/%40geoman-io%2Fleaflet-geoman-free.svg" alt="npm version" height="18">
  </a>
  <a href="#">
    <img src="https://github.com/geoman-io/leaflet-geoman/workflows/Tests/badge.svg" alt="" />
  </a>
  <a href="https://github.com/geoman-io/leaflet-geoman">
    <img src="http://githubbadges.com/star.svg?user=geoman-io&repo=leaflet-geoman&style=default" alt="star this repo" />
  </a>
  <a href="https://www.npmjs.com/package/leaflet.pm">
    <img src="https://img.shields.io/npm/dt/leaflet.pm.svg" alt="NPM Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@geoman-io/leaflet-geoman-free">
    <img src="https://img.shields.io/npm/dt/@geoman-io/leaflet-geoman-free.svg" alt="NPM Downloads" />
  </a>
</p>

## [👉 Live Demo 👈](https://geoman.io/leaflet-geoman)

![Demo](https://file-gmeileqfmg.now.sh/)

#### Leaflet-Geoman Pro ⭐
Companies need more advanced features, reliability and support. In our Pro version, we offer everything from the open source version and add many advanced features for big scale projects.
Features marked with ⭐ in this documentation are only available in the Pro version.
[Purchase Pro](https://geoman.io/leaflet-geoman#pro) or [contact me](mailto:sumit@geoman.io)

## Documentation

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Drawing Mode](#drawing-mode)
- [Editing Mode](#edit-mode)
- [Drag Mode](#drag-mode)
- [Removal Mode](#removal-mode)
- [Cutting Mode](#cutting-mode)
- [Options](#options)
- [Customization](#customize)
- [Need a feature?](#feature-request) | [Existing Feature Requests](https://github.com/geoman-io/leaflet-geoman/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc)


### Installation

#### Migrate from Leaflet.PM

```
npm uninstall leaflet.pm
npm i @geoman-io/leaflet-geoman-free
```
That's it.

#### Install via npm

```
npm i @geoman-io/leaflet-geoman-free
```

#### Install Manually

Download
[`leaflet-geoman.css`](https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css) and
[`leaflet-geoman.min.js`](https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js)
and include them in your project.

#### Include via CDN

CSS

<!-- prettier-ignore -->
```html

<link rel="stylesheet" href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css" />
```

JS

```html
<script src="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.min.js"></script>
```

#### Include as ES6 Module

```js
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
```

### Getting Started

#### Init leaflet-geoman

Just include `leaflet-geoman.min.js` right after Leaflet. It initializes itself. If
you want certain layers to be ignored by leaflet-geoman, pass `pmIgnore: true` to
their options when creating them. Example:

```js
L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(map);
```

##### Opt-In

If you want to use leaflet-geoman as opt-in, call the following function right after importing:

```js
L.PM.initialize({ optIn: true });
```

All layers will be ignored by leaflet-geoman, unless you specify `pmIgnore: false` on a layer:

```js
L.marker([51.50915, -0.096112], { pmIgnore: false }).addTo(map);
```


#### leaflet-geoman Toolbar

<img align="left" height="200" src="https://file-ffrjxxowri.now.sh/" alt="leaflet-geoman Toolbar">

You can add a toolbar to the map to use leaflet-geoman features via a user interface.

```js
// add leaflet-geoman controls with some options to the map
map.pm.addControls({
  position: 'topleft',
  drawCircle: false,
});
```

See the available options in the table below.

| Option             | Default     | Description                                                                                      |
| :----------------- | :---------- | :----------------------------------------------------------------------------------------------- |
| position           | `'topleft'` | toolbar position, possible values are `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'` |
| drawMarker         | `true`      | adds button to draw markers                                                                      |
| drawCircleMarker   | `true`      | adds button to draw circle markers                                                               |
| drawPolyline       | `true`      | adds button to draw rectangle                                                                    |
| drawRectangle      | `true`      | adds button to draw rectangle                                                                    |
| drawPolygon        | `true`      | adds button to draw polygon                                                                      |
| drawCircle         | `true`      | adds button to draw circle                                                                       |
| editMode           | `true`      | adds button to toggle edit mode for all layers                                                   |
| dragMode           | `true`      | adds button to toggle drag mode for all layers                                                   |
| cutPolygon         | `true`      | adds button to cut a hole in a polygon                                                           |
| removalMode        | `true`      | adds a button to remove layers                                                                   |
| pinningOption      | `true`      | adds a button to toggle the Pinning Option ⭐                                                     |
| snappingOption     | `true`      | adds a button to toggle the Snapping Option ⭐                                                    |

If you are wondering how e.g. the `drawPolygon` button will enable drawing mode
with specific options, here it is: Simply set the options for the layer. The options will persist, even when
the mode is enabled/disabled via the toolbar.

Example:

```js
// make markers not snappable during marker draw
map.pm.setGlobalOptions({ snappable: false });
```

All available options are specified in the Drawing Mode Section below.

### Drawing Mode

Use Drawing Mode on a map like this

```js
// enable polygon drawing mode
map.pm.enableDraw('Polygon', {
  snappable: true,
  snapDistance: 20,
});

// disable drawing mode
map.pm.disableDraw('Polygon');
```

Currently available shapes are `Marker`, `CircleMarker`, `Circle`, `Line`, `Rectangle`, `Polygon` and `Cut`.
You can get an array of all available shapes with:

```js
map.pm.Draw.getShapes();
```

The following methods are available on `map.pm`:

| Method                        | Returns   | Description                                                              |
| :---------------------------- | :-------- | :----------------------------------------------------------------------- |
| enableDraw(`shape`,`options`) | -         | Enable Drawing Mode with the passed shape.                               |
| disableDraw(`shape`)          | -         | Disable Drawing Mode. The passed shape is optional.                      |
| Draw.getShapes()              | `Array`   | Array of available shapes.                                               |
| Draw.getActiveShape()         | `String`  | Returns the active shape.                                                |
| globalDrawModeEnabled()       | `Boolean` | Returns `true` if global draw mode is enabled. `false` when disabled.    |
| setPathOptions(`options`)     | -         | Customize the style of the drawn layer.                                  |
| setGlobalOptions(`options`)   | -         | Set drawing options.                                                     |
| getGlobalOptions()            | `Object`  | Returns the global options.                                              |

See the available options in the table below.

| Option                | Default                               | Description                                                                                                                                           |
| :-------------------- | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| snappable             | `true`                                | enable snapping to other layers vertices for precision drawing. Can be disabled by holding the `ALT` key.                                             |
| snapDistance          | `20`                                  | the distance to another vertex when a snap should happen                                                                                              |
| snapMiddle            | `false`                               | allow snapping to the middle of a layers segments (between two vertexes)                                                                              |
| tooltips              | `true`                                | show helpful tooltips for your user                                                                                                                   |
| allowSelfIntersection | `true`                                | allow self intersections                                                                                                                              |
| templineStyle         | `{ color: 'red' },`                   | [leaflet path options](https://leafletjs.com/reference-1.4.0.html#path) for the lines between drawn vertices/markers.                                 |
| hintlineStyle         | `{ color: 'red', dashArray: [5, 5] }` | [leaflet path options](https://leafletjs.com/reference-1.4.0.html#path) for the helper line between last drawn vertex and the cursor.                 |
| cursorMarker          | `true`                                | show a marker at the cursor                                                                                                                           |
| finishOn              | `null`                                | leaflet layer event to finish the drawn shape, like `'dblclick'`. [Here's a list](http://leafletjs.com/reference-1.2.0.html#interactive-layer-click). |
| markerStyle           | `{ draggable: true }`                 | [leaflet marker options](https://leafletjs.com/reference-1.4.0.html#marker-icon) (only for drawing markers).                                          |
| editable              | `false`                               | makes a `CircleMarker` editable like a `Circle`                                                                                                       |
| hideMiddleMarkers   | `false`                               | hide the middle Markers in edit mode from Polyline and Polygon.                                                                                     |

You can listen to map events to hook into the drawing procedure like this:

```js
map.on('pm:drawstart', e => {
  console.log(e);
});
```

Here's a list of map events you can listen to:

| Event                    | Params | Description                                                                            | Output                      |
| :----------------------- | :----- | :------------------------------------------------------------------------------------- | :-------------------------- |
| pm:globaldrawmodetoggled | `e`    | Fired when Drawing Mode is toggled                                                     | `enabled`, `shape`, `map`   | 
| pm:drawstart             | `e`    | Called when drawing mode is enabled. Payload includes the shape type and working layer | `shape`, `workingLayer`     | 
| pm:drawend               | `e`    | Called when drawing mode is disabled. Payload includes the shape type.                 | `shape`                     |
| pm:create                | `e`    | Called when a shape is drawn/finished. Payload includes shape type and the drawn layer | `shape`, `layer`            |

There are also several events for layers during draw. Register an event like this:

```js
// listen to vertexes being added to currently drawn layer (called workingLayer)
map.on('pm:drawstart', ({ workingLayer }) => {
  workingLayer.on('pm:vertexadded', e => {
    console.log(e);
  });
});
```

Here's a list of layer events you can listen to:

| Event           | Params | Description                                                                                                          | Output                                                                                                  |
| :-------------- | :----- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| pm:vertexadded  | `e`    | Called when a new vertex is added. Payload includes the new vertex, it's marker, index, working layer and shape type | `shape`, `workingLayer`, `marker`, `latlng`                                                             |
| pm:snapdrag     | `e`    | Fired during a marker move/drag. Payload includes info about involved layers and snapping calculation.               | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:snap         | `e`    | Fired when a vertex is snapped. Payload is the same as in `snapdrag`                                                 | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:unsnap       | `e`    | Fired when a vertex is unsnapped. Payload is the same as in `snapdrag`                                               | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:centerplaced | `e`    | Called when the center of a circle is placed/moved.                                                                  | `shape`, `workingLayer`, `latlng`                                                                       |

For making the snapping to other layers selective, you can add the "snapIgnore" option to your layers to disable the snapping to them during drawing.
```js
L.geoJSON(data,{
  snapIgnore : true
})
//This layer will be ignored by the snapping engine during drawing
```


### Edit Mode

Let's you edit vertices of layers. Use it like this:

```js
// enable edit mode
layer.pm.enable({
  allowSelfIntersection: false,
});
```

See the available options in the table below.

| Option                | Default | Description                                                                                               |
| :-------------------- | :------ | :-------------------------------------------------------------------------------------------------------- |
| snappable             | `true`  | Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the `ALT` key. |
| snapDistance          | `20`    | The distance to another vertex when a snap should happen.                                                 |
| pinning               | `false` | Pin shared vertices/markers together during edit ⭐. [Details](#pinning)                                   |
| allowSelfIntersection | `true`  | Allow/Disallow self-intersections on polygons and polylines.                                              |
| allowSelfIntersectionEdit | `false`  | Allow/Disallow to change vertices they are connected to a intersecting line. Only working if allowSelfIntersection is `true` and the layer is already self-intersecting while enabling edit mode.                                         |
| preventMarkerRemoval  | `false` | Disable the removal of markers/vertexes via right click.                                                  |
| limitMarkersToCount   | `-1`    | Shows only `n` markers closest to the cursor. Use `-1` for no limit                                       |
| limitMarkersToZoom    | `-1`    | Shows markers when under the given zoom level ⭐                                                           |
| limitMarkersToViewport| `false` | Shows only markers in the viewport ⭐                                                                      |
| limitMarkersToClick   | `false` | Shows markers only after the layer was clicked ⭐                                                          |

The following methods are available for layers under `layer.pm`:

| Method                | Returns   | Description                                                                                         |
| :-------------------- | :-------- | :-------------------------------------------------------------------------------------------------- |
| enable(`options`)     | -         | Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar. |
| disable()             | -         | Disables edit mode.                                                                                 |
| toggleEdit(`options`) | -         | Toggles edit mode. Passed options are preserved.                                                    |
| enabled()             | `Boolean` | Returns `true` if edit mode is enabled. `false` when disabled.                                      |
| hasSelfIntersection() | `Boolean` | Returns `true` is the layer has a self intersection.                                                |

You can listen to events related to editing on events like this:

```js
// listen to when a layer is changed in edit mode
layer.on('pm:edit', e => {
  console.log(e);
});
```

The following events are available on a layer instance:

| Event              | Params | Description                                                                                          | Output                                                                                                  |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| pm:edit            | `e`    | Fired when a layer is edited.                                                                        | `layer`                                                                                                 |
| pm:update          | `e`    | Fired when edit mode is disabled and a layer is edited and its coordinates have changed.             | `layer`                                                                                                 |
| pm:enable          | `e`    | Fired when edit mode on a layer is enabled                                                           | `layer`                                                                                                 |
| pm:disable         | `e`    | Fired when edit mode on a layer is disabled                                                          | `layer`                                                                                                 |
| pm:vertexadded     | `e`    | Fired when a vertex is added                                                                         | `layer`, `indexPath`, `latlng`, `marker`                                                                |
| pm:vertexremoved   | `e`    | Fired when a vertex is removed                                                                       | `layer`, `indexPath`, `marker`                                                                          |
| pm:markerdragstart | `e`    | Fired when dragging of a marker which corresponds to a vertex starts                                 | `layer`, `indexPath`, `markerEvent`                                                                     |
| pm:markerdragend   | `e`    | Fired when dragging of a vertex-marker ends                                                          | `layer`, `indexPath`, `markerEvent`                                                                     |
| pm:snapdrag        | `e`    | Fired during a marker move/drag. Payload includes info about involved layers and snapping calculation| `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:snap            | `e`    | Fired when a vertex-marker is snapped to another vertex. Also fired on the marker itself.            | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:unsnap          | `e`    | Fired when a vertex-marker is unsnapped from a vertex. Also fired on the marker itself.              | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |
| pm:intersect       | `e`    | When `allowSelfIntersection: false`, this event is fired as soon as a self-intersection is detected. | `layer`, `intersection`                                                                                 |
| pm:centerplaced    | `e`    | Fired when the center of a circle is moved                                                           | `layer`, `latlng`                                                                                       |

You can enable Edit Mode for all layers on a map like this:

```js
// enable global edit mode
map.pm.toggleGlobalEditMode(options);
```

The following methods are available on `map.pm`:

| Method                          | Returns   | Description                                                           |
| :------------------------------ | :-------- | :-------------------------------------------------------------------- |
| enableGlobalEditMode(`options`) | -         | Enables global edit mode.                                             |
| disableGlobalEditMode()         | -         | Disables global edit mode.                                            |
| toggleGlobalEditMode(`options`) | -         | Toggles global edit mode.                                             |
| globalEditModeEnabled()             | `Boolean` | Returns `true` if global edit mode is enabled. `false` when disabled. |


The following events are available on a map instance:

| Event                    | Params | Description                                              | Output           |
| :----------------------- | :----- | :------------------------------------------------------- | :--------------- |
| pm:globaleditmodetoggled | `e`    | Fired when Edit Mode is toggled.                         | `enabled`, `map` |


You can also listen to specific edit mode events on the map instance like this:

```js
map.on('pm:globaleditmodetoggled', e => {
  console.log(e);
});
```
The event has an object with an enabled boolean and a reference to the map.

### Drag Mode

```js
// toggle drag mode like this:
map.pm.toggleGlobalDragMode();
```

The following methods are available on `map.pm`:

| Method                  | Returns   | Description                                                           |
| :---------------------- | :-------- | :-------------------------------------------------------------------- |
| enableGlobalDragMode()  | -         | Enables global drag mode.                                             |
| disableGlobalDragMode() | -         | Disables global drag mode.                                            |
| toggleGlobalDragMode()  | -         | Toggles global drag mode.                                             |
| globalDragModeEnabled() | `Boolean` | Returns `true` if global drag mode is enabled. `false` when disabled. |

The following events are available on a layer instance:

| Event        | Params | Description                              | Output                                                           |
| :----------- | :----- | :--------------------------------------- | :--------------------------------------------------------------- |
| pm:dragstart | `e`    | Fired when a layer starts being dragged. | `layer`                                                          |
| pm:drag      | `e`    | Fired when a layer is dragged.           | `layer`, `containerPoint`,`latlng`, `layerPoint`,`originalEvent` |
| pm:dragend   | `e`    | Fired when a layer stops being dragged.  | `layer`                                                          |


The following events are available on a map instance:

| Event                    | Params | Description                                              | Output            |
| :----------------------- | :----- | :------------------------------------------------------- | :---------------- |
| pm:globaldragmodetoggled | `e`    | Fired when Drag Mode is toggled.                         | `enabled`, `map`  |

You can also listen to specific drag mode events on the map instance like this:

```js
map.on('pm:globaldragmodetoggled', e => {
  console.log(e);
});
```
The event has an object with an enabled boolean and a reference to the map.

### Removal Mode

```js
// toggle drag mode like this:
map.pm.toggleGlobalRemovalMode();
```

The following methods are available on `map.pm`:

| Method                     | Returns   | Description                                                              |
| :------------------------- | :-------- | :----------------------------------------------------------------------- |
| enableGlobalRemovalMode()  | -         | Enables global drag mode.                                                |
| disableGlobalRemovalMode() | -         | Disables global drag mode.                                               |
| toggleGlobalRemovalMode()  | -         | Toggles global removal mode.                                             |
| globalRemovalModeEnabled()     | `Boolean` | Returns `true` if global removal mode is enabled. `false` when disabled. |

The following events are available on a layer instance:

| Event       | Params | Description                                              | Output  |
| :---------- | :----- | :------------------------------------------------------- | :------ |
| pm:remove   | `e`    | Fired when a layer is removed via Removal Mode           | `layer` |

The following events are available on a map instance:

| Event                         | Params | Description                                              | Output            |
| :---------------------------- | :----- | :------------------------------------------------------- | :---------------- |
| pm:globalremovalmodetoggled   | `e`    | Fired when Removal Mode is toggled                       | `enabled`, `map`  |
| pm:remove                     | `e`    | Fired when a layer is removed via Removal Mode           | `layer`           |
| layerremove                   | `e`    | Standard Leaflet event. Fired when any layer is removed. | `layer`           |

You can also listen to specific removal mode events on the map instance like this:

```js
map.on('pm:globalremovalmodetoggled', e => {
  console.log(e);
});
```
The event has an object with an enabled boolean and a reference to the map.

### Cutting Mode

![cut polygon](https://file-xdeoyklwhw.now.sh/)

Enable drawing for the shape "Cut" to draw a polygon that gets subtracted from
all underlying polygons. This way you can create holes, cut polygons in half or
remove parts of it.

Important: the cutted layer will be replaced, not updated. Listen to the
`pm:cut` event to update your layer references in your code. The `pm:cut` event
will provide you with the original layer and returns the resulting
layer(s) that is/are added to the map as a Polygon or MultiPolygon.

```js
// enable cutting mode
map.pm.Draw.Cut.enable({
  allowSelfIntersection: false,
});
```

Available options are the [same as in drawing mode](https://github.com/geoman-io/leaflet-geoman/tree/new-docs#drawing-mode).

The following methods are available on `map.pm`:

| Method                         | Returns | Description          |
| :----------------------------- | :------ | :------------------- |
| enableGlobalCutMode(`options`) | -       | Enable Cutting Mode. |
| disableGlobalCutMode()         | -       | Disable Cutting Mode |
| toggleGlobalCutMode(`options`) | -       | Toggle Cutting Mode  |
| globalCutModeEnabled()         | `Boolean` | Returns `true` if global draw mode is enabled. `false` when disabled.    |

The following events are available on a layer instance:

| Event  | Params | Description                    | Output                              |
| :----- | :----- | :----------------------------- | :---------------------------------- |
| pm:cut | `e`    | Fired when the layer being cut | `shape`, `layer`, `originalLayer`   |

The following events are available on a map instance:

| Event                    | Params | Description                        | Output                            |
| :----------------------- | :----- | :--------------------------------- | :-------------------------------- |
| pm:globaldrawmodetoggled | `e`    | Fired when Drawing Mode is toggled | `enabled`, `map`                  | 
| pm:cut                   | `e`    | Fired when any layer is being cut  | `shape`, `layer`, `originalLayer` |

### Options

You have many options available when drawing and editing your layers (described above).
You can set the options per layer as described above, or you can set them globally for all layers. This is especially useful when you use the toolbar and can't change the options programatically.

Examples:

```js
layer.pm.enable({ pinning: true, snappable: false })
```
```js
map.pm.setGlobalOptions({ pinning: true, limitMarkersToCount: 15, limitMarkersCountGlobally: true })
```

The following options are available globally and apply when going into global edit mode.

| Option                    | Default | Description                                                                                               |
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------- |
| snappable                 | `true`  | Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the `ALT` key. |
| snapDistance              | `20`    | The distance to another vertex when a snap should happen.                                                 |
| pinning                   | `false` | Pin shared vertices/markers together during edit ⭐. [Details](#pinning)                                   |
| allowSelfIntersection     | `true`  | Allow/Disallow self-intersections on polygons and polylines.                                              |
| preventMarkerRemoval      | `false` | Disable the removal of markers/vertexes via right click.                                                  |
| limitMarkersToCount       | `-1`    | Shows only `n` markers per layer closest to the cursor. Use `-1` for no limit                             |
| limitMarkersCountGlobally | `false` | Activates `limitMarkersToCount` across layers on the entire map, not just per layer ⭐                     |
| limitMarkersToZoom        | `-1`    | Shows markers when under the given zoom level ⭐                                                           |
| limitMarkersToViewport    | `false` | Shows only markers in the viewport ⭐                                                                      |
| limitMarkersToClick       | `false` | Shows markers only after the layer was clicked ⭐                                                          |
| editable                  | `false` | Makes a `CircleMarker` editable like a `Circle`                                                           |


Some details about a few more powerful options:


##### Snapping

Snap the dragged marker/vertex to other layers for precision drawing.

![Snapping Options](https://files-r7ezk18qq.now.sh/snapping.gif)


##### Pinning ⭐

When dragging a vertex/marker, you can pin all other Markers/Vertices that have the same latlng to the dragged marker. Exclusive for Leaflet-Geoman Pro ⭐

![Pinning Option](https://user-images.githubusercontent.com/2399810/65375984-288ece80-dc9b-11e9-930e-bca03ad7cb56.gif)


### Customize

##### Customize Language

Change the language of user-facing copy in leaflet-geoman

```js
map.pm.setLang('de');
```

Currently available languages are `en`, `de`, `it`, `ru`, `ro`, `es`, `fr`, `pt_br`, `id`, `zh`, `nl`, `el`, `pl` and `sv`.
To add translations to the plugin, you can add [a translation file](src/assets/translations) via Pull Request.

You can also provide your own custom translations.

```js
const customTranslation = {
  tooltips: {
    placeMarker: 'Custom Marker Translation',
  },
};

map.pm.setLang('customName', customTranslation, 'en');
```

The 3rd parameter is the fallback language in case you only want to override a few Strings.
See the [english translation file](src/assets/translations/en.json) for all available strings.


The following events are available on a map instance:

| Event          | Params | Description                       | Output                                               |
| :------------- | :----- | :-------------------------------- | :--------------------------------------------------- |
| pm:langchange | `e`    | Fired when language is changed    | `activeLang`, `oldLang`, `fallback`, `translations`  |


##### Customize Style

In order to change the style of the lines during draw, pass these options to the
`enableDraw()` function.

```js
// optional options for line style during draw. These are the defaults
const options = {
  // the lines between coordinates/markers
  templineStyle: {
    color: 'red',
  },

  // the line from the last marker to the mouse cursor
  hintlineStyle: {
    color: 'red',
    dashArray: [5, 5],
  },
};

// enable drawing mode for shape - e.g. Poly, Line, Circle, etc
map.pm.enableDraw('Polygon', options);
```

To customize the style of the drawn layer with leaflet options, you can either
pass the options to `enableDraw`:

```js
// optional options for line style during draw. These are the defaults
const options = {
  templineStyle: {},
  hintlineStyle: {},
  pathOptions: {
    // add leaflet options for polylines/polygons
    color: 'orange',
    fillColor: 'green',
  },
};

// enable drawing mode for shape - e.g. Poly or Line
map.pm.enableDraw('Polygon', options);
```

or set the options generally:

```js
map.pm.setPathOptions({
  color: 'orange',
  fillColor: 'green',
  fillOpacity: 0.4,
});
```

You can ignore shapes when you add an array with the shape names to the second object with `ignoreShapes`:
```javascript
map.pm.setPathOptions({
      color: 'orange',
      fillColor: 'green',
      fillOpacity: 0.4,
    },
    {
      ignoreShapes: ["Circle", "Rectangle"]
    }
);
```


##### Customize Controls

There are 4 control sections / containers. `draw`, `edit`, `options`⭐, `custom`

You can disable / enable each section with:
```
map.pm.addControls({
     drawControls: true,
     editControls: false,
     optionsControls: true,
     customControls: true,
     oneBlock: false
 })
```

To display the Toolbar as one block you can pass in to the `addControls(options)` function `oneBlock: true`. 

If you want to change the order in a section you can use `map.pm.Toolbar.changeControlOrder(['drawCircle','drawRectangle','removalMode','editMode'])` to sort from Top to Bottom.

With `map.pm.Toolbar.getControlOrder()` you get the current order of the controls.

**New Control**

With `map.pm.Toolbar.createCustomControl(options)` you can create a new control.

| Option        | Default     | Description                                                                                      |
| :------------ | :---------- | :----------------------------------------------------------------------------------------------- |
| name          | Required    | Name of the control |
| block         | ''          | Section / container of the control. ` ` == `draw`, `edit`, `options`⭐, `custom` |
| title         | ''          | Text showing when you hover the control |
| className     | ''          | CSS class with the Icon |
| onClick       | -           | Function fired when clicking the control |
| afterClick    | -           | Function fired after clicking the control |
| actions       | [ ]          | Action that appears as tooltip. Look under [actions](#actions) for more information |
| toggle        | true        | Control can be toggled |

**Copy of Control**

You can copy an available control and add new options to it with `copyDrawControl(instance,options)`:

```javascript
map.pm.Toolbar.copyDrawControl("Rectangle", {name:"RectangleCopy",block: "custom",title: "Display text on hover button",actions: actions});
```


**Actions**

You can use the default actions: `cancel`, `removeLastVertex`, `finish`, `finishMode` (Only for modes `Edit`, `Drag`, `Removal`).

Or you can create own actions:

```javascript
const actions = ['cancel', {text: 'Custom text, no click'}, {text: 'Click event', onClick: ()=>{alert('click')}}]
```

You can change actions of existing buttons with `changeActionsOfControl(name, actions)`:
```javascript
map.pm.Toolbar.changeActionsOfControl('Rectangle',["cancel"])
```

The following methods are available on `map.pm.Toolbar`:

| Method                                      | Returns   | Description                                                                                                   |
| :------------------------------------------ | :-------- | :------------------------------------------------------------------------------------------------------------ |
| createCustomControl(`options`)              | -         | To add a custom Control to the Toolbar.                                                                       |
| copyDrawControl(`instance`,`options`)       | `Object`  | Creates a copy of a draw Control. Returns the `drawInstance` and the `control`.                               |
| changeActionsOfControl(`name`,`actions`)    | -         | Change the actions of an existing button.                                                                     |
| changeControlOrder(`shapes`)                | -         | Change the order of the controls in the Toolbar. You can pass all shapes and `Edit`, `Drag`, `Removal`, `Cut` |
| getControlOrder()                           | `Array`   | Get the current order of the controls.                                                                        |

### Feature Request

I'm adopting the Issue Management of lodash which means, feature requests get the "Feature Request" Label and then get closed.
You can upvote existing feature requests (or create new ones). Upvotes make me see how much a feature is requested and prioritize their implementation.
Please see the existing [Feature Requests here](https://github.com/geoman-io/leaflet-geoman/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc) and upvote if you want them to be implemented.

### Developing

Clone the repository and then install all npm packages:

```
npm install
```


Compile and run `dev` watch version:
```
npm run start
```

Compile and run `build` version:

```
npm run prepare
```

Run cypress test:

```
npm run test
```

Open cypress window:

```
npm run cypress
```

Open eslint check:

```
npm run lint
```

Take a look into [CONTRIBUTING](./CONTRIBUTING.md)

### Credit

As I never built a leaflet plugin before, I looked heavily into the code of
leaflet.draw to find out how to do stuff. So don't be surprised to see some
familiar code.

I also took a hard look at the great
[L.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) for some
of my helper functions.
