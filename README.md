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
  Draw, Edit, Drag, Cut, Split⭐, Measure⭐, Snap and Pin⭐ Layers<br>  
  Supports Markers, CircleMarkers, Polylines, Polygons, Circles, Rectangles, ImageOverlays, LayerGroups, GeoJSON, MultiLineStrings and MultiPolygons  
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
  
### Using Leaflet-Geoman in production?  
[Please consider sponsoring its development](https://github.com/sponsors/codeofsumit)  
  
#### Leaflet-Geoman Pro ⭐  
Features marked with ⭐ in this documentation are available in Leaflet-Geoman Pro. [Purchase Pro](https://geoman.io/leaflet-geoman#pro) or [get in touch](mailto:sumit@geoman.io)  
  
## Documentation  
  
- [Installation](#installation)  
- [Getting Started](#getting-started)  
- [Draw Mode](#draw-mode)  
- [Edit Mode](#edit-mode)  
- [Drag Mode](#drag-mode)  
- [Removal Mode](#removal-mode)  
- [Cut Mode](#cut-mode)  
- [Options](#options)  
- [Customization](#customize)  
- [Toolbar](#toolbar)  
- [Need a feature? | Existing Feature Requests](https://github.com/geoman-io/leaflet-geoman/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc)  
  
  
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
  
Enable leaflet-geoman on an ignored layer:  
```js  
layer.options.pmIgnore = false;
L.PM.reInitLayer(layer);  
```  
If `Opt-In` (look below) is `true`, a layers `pmIgnore` property has to be set to `false` to get initiated.  
  
  
#### Opt-In  
  
If you want to use leaflet-geoman as opt-in, call the following function right after importing:  
  
```js  
L.PM.setOptIn(true);  
```  
  
And to disable it:  
```js  
L.PM.setOptIn(false);  
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
The following methods are available on `map.pm`:  
  
| Method                        | Returns   | Description                                                                                     |  
| :---------------------------- | :-------- | :---------------------------------------------------------------------------------------------- |  
| addControls(`options`)        | -         | Adds the Toolbar to the map. The `options` are optional.                                                      |  
| removeControls()              | -         | Removes the Toolbar from the map.                                            |  
| toggleControls()              | -         | Toggle the visiblity of the Toolbar.                                            |  
| controlsVisible()             | `Boolean` | Returns `true` if the Toolbar is visible on the map. |
  
  
See the available options in the table below.  
  
| Option             | Default     | Description                                                                                      |  
| :----------------- | :---------- | :----------------------------------------------------------------------------------------------- |  
| position           | `'topleft'` | toolbar position, possible values are `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'` |  
| positions           | `Object` | the position of each block (`draw`, `edit`, `custom`, `options`⭐)  can be customized. If not set, the value from `position` is taken. Default: `{draw: '', edit: '', options: '', custom: ''}` [Block Position](#toolbar-block-position) | 
| drawMarker         | `true`      | adds button to draw Markers                                                                      |  
| drawCircleMarker   | `true`      | adds button to draw CircleMarkers                                                               |  
| drawPolyline       | `true`      | adds button to draw Line                                                                    |  
| drawRectangle      | `true`      | adds button to draw Rectangle                                                                    |  
| drawPolygon        | `true`      | adds button to draw Polygon                                                                      |  
| drawCircle         | `true`      | adds button to draw Circle                                                                       |  
| editMode           | `true`      | adds button to toggle edit mode for all layers                                                   |  
| dragMode           | `true`      | adds button to toggle drag mode for all layers                                                   |  
| cutPolygon         | `true`      | adds button to cut a hole in a polygon or line                                                          |  
| removalMode        | `true`      | adds a button to remove layers                                                                   | 
| oneBlock           | `false`     | all buttons will be displayed as one block [Customize Controls](#customize-controls)                                                                   |
| drawControls       | `true`      | shows all draw buttons / buttons in the `draw` block                                                                   |
| editControls       | `true`      | shows all edit buttons / buttons in the `edit` block                                                                   |
| customControls     | `true`      | shows all buttons in the `custom` block                                                                   |
| optionsControls    | `true`      | shows all options buttons / buttons in the `option` block ⭐ |
| pinningOption      | `true`      | adds a button to toggle the Pinning Option ⭐                                                     |  
| snappingOption     | `true`      | adds a button to toggle the Snapping Option ⭐                                                    |  
 
To pass options to the buttons you have two ways:
```js
// make polygon not snappable during draw  
map.pm.enableDraw('Polygon',{ snappable: false }); 
map.pm.disableDraw();
```
```js
// make all layers not snappable during draw  
map.pm.setGlobalOptions({ snappable: false }); 
```
The options will persist, even when the mode is enabled/disabled via the toolbar.  
  
All available options for drawing and editing are specified in the sections below.  


### Draw Mode  
  
Use Draw Mode on a map like this  
  
```js  
// enable polygon draw mode  
map.pm.enableDraw('Polygon', {  
  snappable: true,  
  snapDistance: 20,  
});  
  
// disable draw mode  
map.pm.disableDraw();  
```  
  
Currently available shapes are `Marker`, `CircleMarker`, `Circle`, `Line`, `Rectangle`, `Polygon` and `Cut`.  

  
The following methods are available on `map.pm`:  
  
| Method                        | Returns   | Description                                                                                     |  
| :---------------------------- | :-------- | :---------------------------------------------------------------------------------------------- |  
| enableDraw(`shape`,`options`) | -         | Enable Draw Mode with the passed shape. The `options` are optional.                                                      |  
| disableDraw()                 | -         | Disable Draw Mode.                                             |  
| Draw.getShapes()              | `Array`   | Array of available shapes.                                                                      |  
| Draw.getActiveShape()         | `String`  | Returns the active shape.                                                                       |  
| globalDrawModeEnabled()       | `Boolean` | Returns `true` if global Draw Mode is enabled. `false` when disabled.                           |  
| setPathOptions(`options`, `optionsModifier`)     | -         | Customize the style of the drawn layer. Only for L.Path layers. Shapes can be excluded with a `ignoreShapes` array in `optionsModifier` [Details](#customize-style)                                                         |  
| setGlobalOptions(`options`)   | -         | Set `globalOptions` and apply them.                                                                            |
| applyGlobalOptions()          | -         | Apply the current `globalOptions` to all existing layers. |  
| getGlobalOptions()            | `Object`  | Returns the `globalOptions`.                                                                     |  
| getGeomanLayers(`Boolean`)    | `Array`   | Returns all Geoman layers on the map as array. Pass `true` to get a L.FeatureGroup.             |  
| getGeomanDrawLayers(`Boolean`)| `Array`   | Returns all drawn Geoman layers on the map as array. Pass `true` to get a L.FeatureGroup.       |  
  
See the available options in the table below.  
  
| Option                | Default                               | Description                                                                                                                                           |  
| :-------------------- | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |  
| snappable             | `true`                                | enable snapping to other layers vertices for precision drawing. Can be disabled by holding the `ALT` key.                                             |  
| snapDistance          | `20`                                  | the distance to another vertex when a snap should happen                                                                                              |  
| snapMiddle            | `false`                               | allow snapping in the middle of two vertices (middleMarker)                                                                                           |  
| snapSegment           | `true`                                | allow snapping between two vertices                                                                                                                   |  
| requireSnapToFinish   | `false`                               | require the last point of a shape to be snapped                                                                                                       |  
| tooltips              | `true`                                | show helpful tooltips for your user                                                                                                                   |  
| allowSelfIntersection | `true`                                | allow self intersections                                                                                                                              |  
| templineStyle         | `{ color: 'red' },`                   | [leaflet path options](https://leafletjs.com/reference-1.7.1.html#path) for the lines between drawn vertices/markers.                                 |  
| hintlineStyle         | `{ color: 'red', dashArray: [5, 5] }` | [leaflet path options](https://leafletjs.com/reference-1.7.1.html#path) for the helper line between last drawn vertex and the cursor.                 |
| pathOptions           | `null`                                | [leaflet path options](https://leafletjs.com/reference-1.7.1.html#path) for the drawn layer (Only for L.Path layers).                                 |  
| markerStyle           | `{ draggable: true }`                 | [leaflet marker options](https://leafletjs.com/reference-1.7.1.html#marker-icon) (only for drawing markers).                                          |
| cursorMarker          | `true`                                | show a marker at the cursor                                                                                                                           |  
| finishOn              | `null`                                | leaflet layer event to finish the drawn shape, like `'dblclick'`. [Here's a list](http://leafletjs.com/reference-1.7.1.html#interactive-layer-click). `snap` is also an option for Line, Polygon and Rectangle |    
| hideMiddleMarkers     | `false`                               | hide the middle Markers in edit mode from Polyline and Polygon.                                                                                       |  
| minRadiusCircle       | `null`                                | set the min radius of a `Circle`.                                                                                                                     |  
| maxRadiusCircle       | `null`                                | set the max radius of a `Circle`.                                                                                                                     |  
| minRadiusCircleMarker | `null`                                | set the min radius of a `CircleMarker` when editable is active.                                                                                       |  
| maxRadiusCircleMarker | `null`                                | set the max radius of a `CircleMarker` when editable is active.                                                                                       |  
| editable              | `false`                               | makes a `CircleMarker` editable like a `Circle`                                                                                                       |  
| markerEditable        | `true`                                | Markers and CircleMarkers are editable during the draw-session (you can drag them around immediately after drawing them)                              |
| continueDrawing       | `false` / `true`                      | Draw-Mode stays enabled after finishing a layer to immediately draw the next layer. Defaults to `true` for Markers and CircleMarkers and `false` for all other layers.       |             
| rectangleAngle        | `0`                                   | Rectangle can drawn with a rotation angle 0-360 degrees                                                                                               |
  
  
  
This options can only set over `map.pm.setGlobalOptions({})`:  
  
| Option                | Default                               | Description                                                                                                                                           |  
| :-------------------- | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |  
| layerGroup            | `map`                                 | add the created layers to a layergroup instead to the map.                                                                                            |  

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
//This layer will be ignored by the snapping engine during drawing  
L.geoJSON(data,{  
  snapIgnore: true
});
```  
  
  
### Edit Mode    
You can enable Edit Mode for all layers on a map like this:  
  
```js  
// enable global edit mode  
map.pm.enableGlobalEditMode(options);  
```    

The following methods are available on `map.pm`:  
  
| Method                          | Returns   | Description                                                           |  
| :------------------------------ | :-------- | :-------------------------------------------------------------------- |  
| enableGlobalEditMode(`options`) | -         | Enables global edit mode.                                             |  
| disableGlobalEditMode()         | -         | Disables global edit mode.                                            |  
| toggleGlobalEditMode(`options`) | -         | Toggles global edit mode.                                             |  
| globalEditModeEnabled()         | `Boolean` | Returns `true` if global edit mode is enabled. `false` when disabled. |  
  
Enable Edit Mode only for one layer:  
```js  
// enable edit mode  
layer.pm.enable({  
  allowSelfIntersection: false,  
});  
``` 

The following methods are available for layers under `layer.pm`:  
  
| Method                | Returns   | Description                                                                                         |  
| :-------------------- | :-------- | :-------------------------------------------------------------------------------------------------- |  
| enable(`options`)     | -         | Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar. `options` is optional |  
| disable()             | -         | Disables edit mode.                                                                                 |  
| toggleEdit(`options`) | -         | Toggles edit mode. Passed options are preserved. `options` is optional                                                    |  
| enabled()             | `Boolean` | Returns `true` if edit mode is enabled. `false` when disabled.                                      |  
| hasSelfIntersection() | `Boolean` | Returns `true` if `Line` or `Polygon` has a self intersection.                                                |  
   
  
See the available options in the table below.  
  
| Option                               | Default       | Description                                                                                                                                                                                        |  
| :----------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
| snappable                            | `true`        | Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the `ALT` key.                                                                                          |  
| snapDistance                         | `20`          | The distance to another vertex when a snap should happen.                                                                                                                                          |
| allowSelfIntersection                | `true`        | Allow/Disallow self-intersections on polygons and polylines.                                                                                                                                       |  
| allowSelfIntersectionEdit            | `false`       | Allow/Disallow to change vertices they are connected to a intersecting line. Only working if allowSelfIntersection is `true` and the layer is already self-intersecting while enabling edit mode.  |  
| preventMarkerRemoval                 | `false`       | Disable the removal of markers/vertexes via right click.                                                                                                                                           |
| removeLayerBelowMinVertexCount       | `true`        | If `true`, vertex removal that cause a layer to fall below their minimum required vertices will remove the entire layer. If `false`, these vertices can't be removed. Minimum vertices are 2 for Lines and 3 for Polygons. |    
| addVertexOn                          | `click`       | Leaflet layer event to add a vertex to a Line or Polygon, like `'dblclick'`. [Here's a list](http://leafletjs.com/reference-1.7.1.html#interactive-layer-click).                                   | 
| addVertexValidation                  | `undefined`   | A function for validation if a vertex (of a Line / Polygon) is allowed to add. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed.     | 
| removeVertexOn                       | `contextmenu` | Leaflet layer event to remove a vertex from a Line or Polygon, like `'dblclick'`. [Here's a list](http://leafletjs.com/reference-1.7.1.html#interactive-layer-click).                              | 
| removeVertexValidation               | `undefined`   | A function for validation if a vertex (of a Line / Polygon) is allowed to remove. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed.  | 
| moveVertexValidation                 | `undefined`   | A function for validation if a vertex / helper-marker is allowed to move / drag. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed.  | 
| limitMarkersToCount                  | `-1`          | Shows only `n` markers closest to the cursor. Use `-1` for no limit                                                                                                                                |  
| limitMarkersToZoom                   | `-1`          | Shows markers when under the given zoom level ⭐                                                                                                                                                    |  
| limitMarkersToViewport               | `false`       | Shows only markers in the viewport ⭐                                                                                                                                                               |  
| limitMarkersToClick                  | `false`       | Shows markers only after the layer was clicked ⭐                                                                                                                                                   |  
| pinning                              | `false`       | Pin shared vertices/markers together during edit ⭐. [Details](#pinning-⭐)                                                                                                                          | 
  

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
| pm:edit            | `e`    | Fired when a layer is edited.                                                                        | `layer`, `shape`                                                                                                 |  
| pm:update          | `e`    | Fired when edit mode is disabled and a layer is edited and its coordinates have changed.             | `layer`, `shape`                                                                                                 |  
| pm:enable          | `e`    | Fired when edit mode on a layer is enabled                                                           | `layer`, `shape`                                                                                                 |  
| pm:disable         | `e`    | Fired when edit mode on a layer is disabled                                                          | `layer`, `shape`                                                                                                 |  
| pm:vertexadded     | `e`    | Fired when a vertex is added                                                                         | `layer`, `indexPath`, `latlng`, `marker`, `shape`                                                                |  
| pm:vertexremoved   | `e`    | Fired when a vertex is removed                                                                       | `layer`, `indexPath`, `marker`, `shape`                                                                          |  
| pm:vertexclick     | `e`    | Fired when a vertex is clicked                                                                       | `layer`, `indexPath`, `markerEvent`, `shape`                                                                     |  
| pm:markerdragstart | `e`    | Fired when dragging of a marker which corresponds to a vertex starts                                 | `layer`, `indexPath`, `markerEvent`, `shape`                                                                     |  
| pm:markerdrag      | `e`    | Fired when dragging a vertex-marker                                                                  | `layer`, `indexPath`, `markerEvent`, `shape`                                                                     |  
| pm:markerdragend   | `e`    | Fired when dragging of a vertex-marker ends                                                          | `layer`, `indexPath`, `markerEvent`, `shape`, `intersectionReset`                                                |
| pm:layerreset      | `e`    | Fired when coords of a layer are reset. E.g. by self-intersection.                                   | `layer`, `indexPath`, `markerEvent`, `shape`                                                                     |  
| pm:snapdrag        | `e`    | Fired during a marker move/drag. Payload includes info about involved layers and snapping calculation| `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |  
| pm:snap            | `e`    | Fired when a vertex-marker is snapped to another vertex. Also fired on the marker itself.            | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |  
| pm:unsnap          | `e`    | Fired when a vertex-marker is unsnapped from a vertex. Also fired on the marker itself.              | `shape`, `distance`, `layer` = `workingLayer`, `marker`, `layerInteractedWith`, `segment`, `snapLatLng` |  
| pm:intersect       | `e`    | When `allowSelfIntersection: false`, this event is fired as soon as a self-intersection is detected. | `layer`, `intersection`, `shape`                                                                                 |  
| pm:centerplaced    | `e`    | Fired when the center of a circle is moved                                                           | `layer`, `latlng`, `shape`                                                                                       |  

  
  
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
  
### Drag Mode  
You can enable Drag Mode for all layers on a map like this:
```js  
// enable drag mode like this:  
map.pm.enableGlobalDragMode();  
```  
  
The following methods are available on `map.pm`:  
  
| Method                  | Returns   | Description                                                           |  
| :---------------------- | :-------- | :-------------------------------------------------------------------- |  
| enableGlobalDragMode()  | -         | Enables global drag mode.                                             |  
| disableGlobalDragMode() | -         | Disables global drag mode.                                            |  
| toggleGlobalDragMode()  | -         | Toggles global drag mode.                                             |  
| globalDragModeEnabled() | `Boolean` | Returns `true` if global drag mode is enabled. `false` when disabled. |  
  
The following events are available on a layer instance:  
  
| Event        | Params | Description                              | Output                                                                    |  
| :----------- | :----- | :--------------------------------------- | :------------------------------------------------------------------------ |  
| pm:dragstart | `e`    | Fired when a layer starts being dragged. | `layer`, `shape`                                                          |  
| pm:drag      | `e`    | Fired when a layer is dragged.           | `layer`, `containerPoint`,`latlng`, `layerPoint`,`originalEvent`, `shape` |  
| pm:dragend   | `e`    | Fired when a layer stops being dragged.  | `layer`, `shape`                                                          |  
  
  
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
  
### Removal Mode  
You can enable Removal Mode for all layers on a map like this:
```js  
// enable removal mode like this:  
map.pm.enableGlobalRemovalMode();  
```  
  
The following methods are available on `map.pm`:  
  
| Method                     | Returns   | Description                                                              |  
| :------------------------- | :-------- | :----------------------------------------------------------------------- |  
| enableGlobalRemovalMode()  | -         | Enables global removal mode.                                             |  
| disableGlobalRemovalMode() | -         | Disables global removal mode.                                            |  
| toggleGlobalRemovalMode()  | -         | Toggles global removal mode.                                             |  
| globalRemovalModeEnabled() | `Boolean` | Returns `true` if global removal mode is enabled. `false` when disabled. |  
  
The following events are available on a layer instance:  
  
| Event       | Params | Description                                              | Output           |  
| :---------- | :----- | :------------------------------------------------------- | :--------------- |  
| pm:remove   | `e`    | Fired when a layer is removed via Removal Mode           | `layer`, `shape` |  
  
The following events are available on a map instance:  
  
| Event                         | Params | Description                                              | Output            |  
| :---------------------------- | :----- | :------------------------------------------------------- | :---------------- |  
| pm:globalremovalmodetoggled   | `e`    | Fired when Removal Mode is toggled                       | `enabled`, `map`  |  
| pm:remove                     | `e`    | Fired when a layer is removed via Removal Mode           | `layer`, `shape`  |  
| layerremove                   | `e`    | Standard Leaflet event. Fired when any layer is removed. | `layer`           |  
  
You can also listen to specific removal mode events on the map instance like this:  
  
```js  
map.on('pm:globalremovalmodetoggled', e => {  
  console.log(e);  
});  
```  
  
### Cut Mode  
  
![cut polygon](https://file-xdeoyklwhw.now.sh/)  
  
Enables drawing for the shape "Cut" to draw a polygon that gets subtracted from  
all underlying polygons. This way you can create holes, cut polygons or polylines in half or  
remove parts of it.  
  
Important: the cutted layer will be replaced, not updated. Listen to the  
`pm:cut` event to update your layer references in your code. The `pm:cut` event  
will provide you with the original layer and returns the resulting  
layer(s) that is/are added to the map as a Polygon / MultiPolygon or Polyline / MultiPolyline.  
  
```js  
// enable cutting mode  
map.pm.enableGlobalCutMode({  
  allowSelfIntersection: false,  
});  
```  
  
Available options are the same as in [Draw Mode](#draw-mode).  
  
The following methods are available on `map.pm`:  
  
| Method                         | Returns | Description          |  
| :----------------------------- | :------ | :------------------- |  
| enableGlobalCutMode(`options`) | -       | Enable Cut Mode. |  
| disableGlobalCutMode()         | -       | Disable Cut Mode |  
| toggleGlobalCutMode(`options`) | -       | Toggle Cut Mode  |  
| globalCutModeEnabled()         | `Boolean` | Returns `true` if global cut mode is enabled. `false` when disabled.    |  
  
The following events are available on a layer instance:  
  
| Event   | Params | Description                        | Output                              |  
| :------ | :----- | :--------------------------------- | :---------------------------------- |  
| pm:cut  | `e`    | Fired when the layer being cut     | `shape`, `layer`, `originalLayer`   |  
| pm:edit | `e`    | Fired when a layer is edited / cut | `layer`, `shape`                    |  
  
The following events are available on a map instance:  
  
| Event                    | Params | Description                        | Output                            |  
| :----------------------- | :----- | :--------------------------------- | :-------------------------------- |  
| pm:globalcutmodetoggled  | `e`    | Fired when Cut Mode is toggled | `enabled`, `map`                  |
| pm:cut                   | `e`    | Fired when any layer is being cut  | `shape`, `layer`, `originalLayer` |  

### Rotate Mode
The rotation is clockwise. It starts in the North with 0° and goes over East (90°) and South (180°) to West (270°).
The rotation center is the center (`layer.getCenter()`) of a polygon with the LatLngs of the layer.

You can enable Rotate Mode for all layers on a map like this:
```js  
// enable rotate mode like this:  
map.pm.enableGlobalRotateMode();  
```  

The following methods are available on `map.pm`:  
  
| Method                     | Returns   | Description                                                              |  
| :------------------------- | :-------- | :----------------------------------------------------------------------- |  
| enableGlobalRotateMode()   | -         | Enables global rotate mode.                                              |  
| disableGlobalRotateMode()  | -         | Disables global rotate mode.                                             |  
| toggleGlobalRotateMode()   | -         | Toggles global rotate mode.                                              |  
| globalRotateModeEnabled()  | `Boolean` | Returns `true` if global rotate mode is enabled. `false` when disabled.  |  

The following methods are available for layers under `layer.pm`:
  
| Method                        | Returns   | Description                                                              |  
| :---------------------------- | :-------- | :----------------------------------------------------------------------- |  
| enableRotate()                | -         | Enables rotate mode on the layer.                                        |  
| disableRotate()               | -         | Disables rotate mode on the layer.                                       |  
| rotateEnabled()               | -         | Toggles rotate mode on the layer.                                        |  
| rotateLayer(`degrees`)        | -         | Rotates the layer by `x` degrees.                                        | 
| rotateLayerToAngle(`degrees`) | -         | Rotates the layer to `x` degrees.                                        | 
| getAngle()                    | `Degrees` | Returns the angle of the layer in degrees.                               | 
  
The following events are available on a layer instance:  
  
| Event             | Params | Description                                              | Output                                                                                 |  
| :---------------- | :----- | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |  
| pm:rotateenable   | `e`    | Fired when rotation is enabled for a layer.              | `layer`, `helpLayer`                                                                   |  
| pm:rotatedisable  | `e`    | Fired when rotation is disabled for a layer.             | `layer`                                                                                |  
| pm:rotatestart    | `e`    | Fired when rotation starts on a layer.                   | `layer`, `helpLayer`, `startAngle`, `originLatLngs`                                    |  
| pm:rotate         | `e`    | Fired when a layer is rotated.                           | `layer`, `helpLayer`, `startAngle`, `angle`, `angleDiff`, `oldLatLngs`, `newLatLngs`   |  
| pm:rotateend      | `e`    | Fired when rotation ends on a layer.                     | `layer`, `helpLayer`, `startAngle`, `angle`, `originLatLngs`, `newLatLngs`             |  
  
The following events are available on a map instance:  
  
| Event                         | Params | Description                                              | Output                                                                                 |  
| :---------------------------- | :----- | :------------------------------------------------------- | :------------------------------------------------------------------------------------- |   
| pm:globalrotatemodetoggled    | `e`    | Fired when Rotate Mode is toggled                        | `enabled`, `map`                                                                       |  
| pm:rotateenable               | `e`    | Fired when rotation is enabled for a layer.              | `layer`, `helpLayer`                                                                   |  
| pm:rotatedisable              | `e`    | Fired when rotation is disabled for a layer.             | `layer`                                                                                |  
| pm:rotatestart                | `e`    | Fired when rotation starts on a layer.                   | `layer`, `helpLayer`, `startAngle`, `originLatLngs`                                    |  
| pm:rotate                     | `e`    | Fired when a layer is rotated.                           | `layer`, `helpLayer`, `startAngle`, `angle`, `angleDiff`, `oldLatLngs`, `newLatLngs`   |  
| pm:rotateend                  | `e`    | Fired when rotation ends on a layer.                     | `layer`, `helpLayer`, `startAngle`, `angle`, `originLatLngs`, `newLatLngs`             |  

### Split Mode ⭐

Enable drawing for the shape "Split" to draw a line that splits all underlying polygons and polylines. 

Important: the splitted layer will be replaced, not updated. Listen to the
`pm:split` event to update your layer references in your code. The `pm:split` event
will provide you with the original layer and returns the resulting
layer(s) that is/are added to the map as a Polygon / MultiPolygon or Polyline / MultiPolyline.
  

```js
// enable cutting mode
map.pm.enableGlobalSplitMode({
  allowSelfIntersection: false,
});
```

Available options are the same as in [Draw Mode](#draw-mode) and in table below:  

| Option                | Default | Description                                                                                                                                                                     |
| :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| splitOnlyMarkedLayers | `false` | If it is set to `false` layers can be excluded with the option `splitMark: false`. Set it to `true` to enable splitting only for the layers with the option `splitMark: true`.  |

The following methods are available on `map.pm`:

| Method                           | Returns | Description          |
| :------------------------------- | :------ | :------------------- |
| enableGlobalSplitMode(`options`) | -       | Enable Split Mode. |
| disableGlobalSplitMode()         | -       | Disable Split Mode |
| toggleGlobalSplitMode(`options`) | -       | Toggle Split Mode  |
| globalSplitModeEnabled()         | `Boolean` | Returns `true` if global Split Mode is enabled. `false` when disabled.    |

The following events are available on a layer instance:

| Event  | Params | Description                    | Output                                               |
| :----- | :----- | :----------------------------- | :--------------------------------------------------- |
| pm:split | `e`    | Fired when the layer being split | `shape`, `splitLayer`, `layers`, `originalLayer` |

The following events are available on a map instance:

| Event                     | Params | Description                        | Output                                           |
| :------------------------ | :----- | :--------------------------------- | :----------------------------------------------- |
| pm:globalsplitmodetoggled | `e`    | Fired when Split Mode is toggled   | `enabled`, `map`                                 | 
| pm:split                  | `e`    | Fired when any layer is being split| `shape`, `splitLayer`, `layers`, `originalLayer` |


### Options  
  
You have many options available when drawing and editing your layers (described above).  
You can set the options per layer as described above, or you can set them globally for all layers. This is especially useful when you use the toolbar and can't change the options programatically.  
  
Examples:  
  
```js  
layer.pm.enable({ pinning: true, snappable: false })  
```  
```js  
map.pm.setGlobalOptions({ pinning: true, snappable: false })  
```  
  
The following options are additionally to the [Draw](#draw-mode) and [Edit Mode](#edit-mode) options.  

  
| Option                    | Default | Description                                                                                                                 |  
| :------------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------- |    
| snappingOrder             | `Array` | Prioritize the order of snapping. Default: `['Marker','CircleMarker','Circle','Line','Polygon','Rectangle']`                |  
| layerGroup                | `map`   | add the created layers to a layergroup instead to the map.                                                                  |
| panes                     | `Object`| Defines in which [panes](https://leafletjs.com/reference-1.7.1.html#map-pane) the layers and helper vertices are created. Default: `{ vertexPane: 'markerPane', layerPane: 'overlayPane', markerPane: 'markerPane' }` |

Some details about a few more powerful options:  

##### Snapping  
  
Snap the dragged marker/vertex to other layers for precision drawing.  
Snapping can be disabled for layers with the layer option `snapIgnore: true`. With `snapIgnore: false` it will be always snappable, also if `pmIgnore` is set.
  
![Snapping Options](https://files-r7ezk18qq.now.sh/snapping.gif)  
  
  
##### Pinning ⭐  
  
When dragging a vertex/marker, you can pin all other Markers/Vertices that have the same latlng to the dragged marker. Exclusive for Leaflet-Geoman Pro ⭐  
  
![Pinning Option](https://user-images.githubusercontent.com/2399810/65375984-288ece80-dc9b-11e9-930e-bca03ad7cb56.gif)  
  

##### Measurement ⭐

Calculates the measurement of a layer while drawing and editing. Exclusive for Leaflet-Geoman Pro ⭐

```js
map.pm.setGlobalOptions({ measurements: { measurement: true, displayFormat: 'metric', ... } })
```

See the available options in the table below.

| Option                | Default  | Description                                                                                                           |
| :-------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------- |
| measurement           | `true`   | Enable measurement calculation                                                                                        |
| showTooltip           | `true`   | Shows the tooltip during draw and edit                                                                                |
| showTooltipOnHover    | `true`   | Shows the tooltip when hovering a finished layer                                                                      |
| displayFormat         | `metric` | Displayed format in the tooltip `metric` or `imperial`                                                                |
| totalLength           | `true`   | Shows the total length in the tooltip `Line`                                                                          |
| segmentLength         | `true`   | Shows the segment length in the tooltip `Line`, `Polygon`                                                             |
| area                  | `true`   | Shows the area in the tooltip `Polygon`, `Rectangle`, `Circle`, `CircleMarker`                                        |
| radius                | `true`   | Shows the radius in the tooltip `Circle`, `CircleMarker`                                                              |
| perimeter             | `true`   | Shows the perimeter in the tooltip `Polygon`, `Rectangle`, `Circle`, `CircleMarker`                                   |
| height                | `true`   | Shows the height in the tooltip `Rectangle`                                                                           |
| width                 | `true`   | Shows the width in the tooltip `Rectangle`                                                                            |
| coordinates           | `true`   | Shows the coordinates in the tooltip `Marker`, `CircleMarker` and the current dragged marker while drawing / editing  |


### Customize
  
#### Customize Language  
Change the language of user-facing copy in leaflet-geoman  
  
```js  
map.pm.setLang('de');  
```  
  
Currently available languages are `da`, `de`, `el`, `en`, `es`, `fa`, `fr`, `hu`, `id`, `it`, `nl`, `no`, `pl`, `pt_br`, `ro`, `ru`, `sv`, `tr`, `ua`, `zh` and `zh_tw`.  
To add translations to the plugin, you can add [a translation file](src/assets/translations) via Pull Request.  
  
You can also provide your own custom translations.  
```js  
const customTranslation = {  
  tooltips: {  
    placeMarker: 'Custom Marker Translation',  
  }
};  
  
map.pm.setLang('customName', customTranslation, 'en');  
```  
  
The 3rd parameter is the fallback language in case you only want to override a few Strings.  
See the [english translation file](src/assets/translations/en.json) for all available strings.  
  
  
The following events are available on a map instance:  
  
| Event          | Params | Description                       | Output                                               |  
| :------------- | :----- | :-------------------------------- | :--------------------------------------------------- |  
| pm:langchange | `e`    | Fired when language is changed    | `activeLang`, `oldLang`, `fallback`, `translations`  |  
  
  
#### Customize Style  
To customize the style of the drawn layer with leaflet options, you can either  
pass the options to `enableDraw` or set the options generally:  
```js  
map.pm.setPathOptions({  
  color: 'orange',  
  fillColor: 'green',  
  fillOpacity: 0.4,  
});  
```  
  
If you want to exclude shapes from receiving these path options, use the second parameter like this:  
```javascript  
map.pm.setPathOptions({color: 'orange'}, {
  ignoreShapes: ['Circle', 'Rectangle']  
});  
```  
  
### Toolbar

The following methods are available on `map.pm.Toolbar`:  
  
| Method                         | Returns | Description          |  
| :----------------------------- | :------ | :------------------- |  
| changeControlOrder(`order`)    | -       | Pass an array of button names to reorder the buttons in the Toolbar |  
| getControlOrder()              | `Array` | Current order of the buttons in the Toolbar |  
| setBlockPosition(`block`,`position`) | -       | The position of a block (`draw`, `edit`, `custom`, `options`⭐) in the Toolbar can be changed. If not set, the value from `position` of the Toolbar is taken. [Details](#toolbar-block-position)  |  
| getBlockPositions()         | `Object` | Returns a Object with the positions for all blocks    | setButtonDisabled(`name`, `Boolean`)        | -         | Enable / disable a button. |
| createCustomControl(`options`)              | -         | To add a custom Control to the Toolbar. [Details](#adding-newcustom-controls)                                            |  
| copyDrawControl(`instance`, `options`)      | `Object`  | Creates a copy of a draw Control. Returns the `drawInstance` and the `control`.                               |  
| changeActionsOfControl(`name`, `actions`)   | -         | Change the actions of an existing button.


#### Customize Controls 
  
There are 4 control blocks in the Toolbar: `draw`, `edit`, `custom` and `options`⭐   
You can disable / enable entire blocks. To display the Toolbar as one block instead of 4, use `oneBlock: true`.  
  
```js  
map.pm.addControls({  
 drawControls: true, 
 editControls: false, 
 optionsControls: true, 
 customControls: true, 
 oneBlock: false 
})
```  
  
Reorder the buttons with  
```js  
map.pm.Toolbar.changeControlOrder(['drawCircle', 'drawRectangle', 'removalMode', 'editMode']);  
```  
  
Receive the current order with  
```js  
map.pm.Toolbar.getControlOrder();  
```  
  
#### Toolbar Block Position  
  
You can set different positions per block `draw`, `edit`, `options`⭐, `custom`:   
  
Possible values are `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'`  
  
```javascript  
map.pm.addControls({  
  positions: {  
    draw: 'topright',  
    edit: 'topleft',  
  }
});  
```  
  
```javascript  
map.pm.Toolbar.setBlockPosition('draw','topright');  
```    
```javascript  
map.pm.Toolbar.getBlockPositions();  
```  
  
  
#### Adding New/Custom Controls
  
```js  
// add a new custom control  
map.pm.Toolbar.createCustomControl(options)  
```  
  
| Option        | Default     | Description                                                                                      |  
| :------------ | :---------- | :----------------------------------------------------------------------------------------------- |  
| name          | Required    | Name of the control                                                                              |  
| block         | ''          | block of the control. `draw`, `edit`, `custom`, `options`⭐                                       |  
| title         | ''          | Text showing when you hover the control                                                          |  
| className     | ''          | CSS class with the Icon                                                                          |  
| onClick       | -           | Function fired when clicking the control                                                         |  
| afterClick    | -           | Function fired after clicking the control                                                        |  
| actions       | [ ]         | Action that appears as tooltip. Look under [Actions](#actions) for more information              |  
| toggle        | true        | Control can be toggled                                                                           |  
| disabled      | false       | Control is disabled                                                                              |  
  
  
#### Inherit from an Existing Control  
  
This effectively copies an existing control that you can customize.  
  
```js  
// copy a rectangle and customize its name, block, title and actions  
map.pm.Toolbar.copyDrawControl('Rectangle',{  
  name:'RectangleCopy',  
  block: 'custom',  
  title: 'Display text on hover button',  
  actions: actions  
});  
```  
  
  
#### Actions  
  
You can add your own actions to existing or custom buttons.  
  
Here, we configure 3 separate actions in an array.  
```js  
// creates new actions  
const actions = [ 
  // uses the default 'cancel' action 
  'cancel',    
  // creates a new action that has text, no click event  
  { text: 'Custom text, no click' },  
  // creates a new action with text and a click event 
  { text: 'click me', onClick: () => { alert('🙋‍♂️') }  
}]  
```  
Default actions available are: `cancel`, `removeLastVertex`, `finish`, `finishMode`.  
  
  
Change actions of an existing button:  
```js  
map.pm.Toolbar.changeActionsOfControl('Rectangle', actions)  
```  
  
Pass actions to your custom buttons through the `actions` property mentioned under [Inherit from an Existing Control](#inherit-from-an-existing-control)  
  

The following events are available on a map instance:  
  
| Event          | Params | Description                               | Output                                               |  
| :------------- | :----- | :---------------------------------------- | :--------------------------------------------------- |  
| pm:buttonclick | `e`    | Fired when a Toolbar button is clicked    | `btnName`, `button`                                  |  
| pm:actionclick | `e`    | Fired when a Toolbar action is clicked    | `text`, `action`, `btnName`, `button`                |  


### Keyboard
We implemented a built-in keyboard listener to make one central place where keyboard events can be accessed (without adding self a listener).

The following methods are available on `map.pm.Keyboard`:  
  
| Method                                 | Returns   | Description                                                                                                                          |  
| :------------------------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------- |  
| getLastKeyEvent(`type = 'current'`)    | `Object`  | Returns the last event. Also `keydown` and `keyup` can be passed, to get the specific one.                                           | 
| getPressedKey()                        | `String`  | Returns the current pressed key. [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)             |    
| isShiftKeyPressed()                    | `Boolean` | Returns true if the `Shift` key is currently pressed.                                                                                |  
| isAltKeyPressed()                      | `Boolean` | Returns true if the `Alt` key is currently pressed.                                                                                  |  
| isCtrlKeyPressed()                     | `Boolean` | Returns true if the `Ctrl` key is currently pressed.                                                                                 |  
| isMetaKeyPressed()                     | `Boolean` | Returns true if the `Meta` key is currently pressed.                                                                                 | 

The following events are available on a map instance:  
  
| Event          | Params | Description                                                                                                                 | Output                            |  
| :------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |  
| pm:keyevent    | `e`    | Fired when `keydown` or `keyup` on the document is fired. `eventType` = `keydown / keyup`, `focusOn` = `document / map`     | `event`, `eventType`, `focusOn`   |  

  
### Feature Requests  
  
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
  
As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be surprised to see some familiar code.  
  
I also took a hard look at the great [L.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) for some of my helper functions.

The Rotate Mode are only working because of the great calculation code of [L.Path.Transform](https://github.com/w8r/Leaflet.Path.Transform)
