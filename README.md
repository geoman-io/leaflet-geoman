<p align="center">
  <a href="https://leaflet.pm.now.sh">
    <img alt="Geoman Logo" src="https://file-yydxsjcsnd.now.sh" />
  </a>
</p>
<h1 align="center">
  Leaflet.PM
</h1>
<p align="center">
  <strong>Leaflet Plugin For Creating And Editing Geometry Layers</strong><br>
  Draw, Edit, Drag, Cut and Snap Layers<br>
  Supports Markers, Polylines, Polygons, Circles, Rectangles, LayerGroups, GeoJSON and MultiPolygons
</p>
<p align="center">
  <a href="https://badge.fury.io/js/leaflet.pm">
    <img src="https://badge.fury.io/js/leaflet.pm.svg" alt="npm version" />
  </a>
  <a href="#">
    <img src="https://travis-ci.com/codeofsumit/leaflet.pm.svg?branch=develop" alt="" />
  </a>
  <a href="https://github.com/codeofsumit/leaflet.pm">
    <img src="http://githubbadges.com/star.svg?user=codeofsumit&repo=leaflet.pm&style=default" alt="star this repo" />
  </a>
  <a href="https://www.npmjs.com/package/leaflet.pm">
    <img src="https://img.shields.io/npm/dt/leaflet.pm.svg" alt="NPM Downloads" />
  </a>
</p>

## [Demo (click here)](https://leafletpm.now.sh)

![Demo](https://file-hmgrhlmwxy.now.sh/leafletPM.gif)

Need advanced features like GeoJSON Export, storing meta data and more?\
Check out **[Geoman](https://geoman.io)**.

## Documentation

-   [Installation](#installation)
-   [Getting Started](#getting-started)
-   [Drawing](#drawing-mode)
-   [Editing](#edit-mode)
-   [Style Customization](#customize-style)
-   [Need a feature?](#feature-request) | [Existing Feature Requests](https://github.com/codeofsumit/leaflet.pm/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc)

### Installation

#### Install via npm

```
npm install leaflet.pm --save
```

#### Install Manually

Download
[`leaflet.pm.css`](https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css) and
[`leaflet.pm.min.js`](https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js)
and include them in your project.

#### Include via CDN

CSS

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.css" />
```

JS

```html
<script src="https://unpkg.com/leaflet.pm@latest/dist/leaflet.pm.min.js"></script>
```

#### Include as ES6 Module

```js
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';
```

### Getting Started

#### Init Leaflet.PM

Just include `leaflet.pm.min.js` right after Leaflet. It initializes itself. If
you want certain layers to be ignored by leaflet.pm, pass `pmIgnore: true` to
their options when creating them. Example:

```js
L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(map);
```

#### Leaflet.PM Toolbar

<img align="left" height="200" src="https://file-ffrjxxowri.now.sh/" alt="Leaflet.PM Toolbar">

You can add a toolbar to the map to use leaflet.pm features via a user interface.

```js
// add leaflet.pm controls with some options to the map
map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
});
```

See the available options in the table below.

| Option        | Default     | Description                                                                                      |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| position      | `'topleft'` | toolbar position, possible values are `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'` |
| drawMarker    | `true`      | adds button to draw markers                                                                      |
| drawPolyline  | `true`      | adds button to draw rectangle                                                                    |
| drawRectangle | `true`      | adds button to draw rectangle                                                                    |
| drawPolygon   | `true`      | adds button to draw polygon                                                                      |
| drawCircle    | `true`      | adds button to draw cricle                                                                       |
| editMode      | `true`      | adds button to toggle edit mode for all layers                                                   |
| dragMode      | `true`      | adds button to toggle drag mode for all layers                                                   |
| cutPolygon    | `true`      | adds button to cut a hole in a polygon                                                           |
| removalMode   | `true`      | adds a button to remove layers                                                                   |

If you are wondering how e.g. the `drawPolygon` button will enable drawing mode
with specific options, here it is: Simply enable drawing mode programatically,
pass it your options and disable it again. The options will persist, even when
the mode is enabled/disabled via the toolbar.

Example:

```js
// make markers not snappable during marker draw
map.pm.enableDraw('Marker', { snappable: false });
map.pm.disableDraw('Marker');

// let polygons finish their shape on double click
map.pm.enableDraw('Poly', { finishOn: 'dblclick' });
map.pm.disableDraw('Poly');
```

All available options are specified in the Drawing Mode Section below.

#### Drawing Mode

Use Drawing Mode on a map like this

```js
// enable polygon drawing mode
map.pm.enableDraw('Poly', {
    snappable: true,
    snapDistance: 20,
});

// disable drawing mode
map.pm.disableDraw('Poly');
```

Currently available shapes are `Line`, `Rectangle`, `Poly`, `Marker`, `Circle`.
You can get an array of all available shapes with:

```js
map.pm.Draw.getShapes();
```

See the available options in the table below.

| Option                | Default                               | Description                                                                                                                                           |
| --------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| snappable             | `true`                                | enable snapping to other layers vertices for precision draing                                                                                         |
| snapDistance          | `20`                                  | the distance to another vertex when a snap should happen                                                                                              |
| snapMiddle            | `false`                               | allow snapping to the middle of a layers segments (between two vertexes)                                                                              |
| tooltips              | `true`                                | show helpful tooltips for your user                                                                                                                   |
| allowSelfIntersection | `true`                                | allow self intersections                                                                                                                              |
| templineStyle         | `{ color: 'red' },`                   | [leaflet path options](https://leafletjs.com/reference-1.4.0.html#path) for the lines between drawn vertices/markers.                                 |
| hintlineStyle         | `{ color: 'red', dashArray: [5, 5] }` | [leaflet path options](https://leafletjs.com/reference-1.4.0.html#path) for the helper line between last drawn vertex and the cursor.                 |
| cursorMarker          | `true`                                | show a marker at the cursor                                                                                                                           |
| finishOn              | `null`                                | leaflet layer event to finish the drawn shape, like `'dblclick'`. [Here's a list](http://leafletjs.com/reference-1.2.0.html#interactive-layer-click). |
| markerStyle           | `{ draggable: true }`                 | [leaflet marker options](https://leafletjs.com/reference-1.4.0.html#marker-icon) (only for drawing markers).                                          |

You can listen to map events to hook into the drawing procedure like this:

```js
map.on('pm:drawstart', (e) => {
    console.log(e);
});
```

Here's a list of map events you can listen to:

| Event        | Params | Description                                                                            |
| ------------ | ------ | -------------------------------------------------------------------------------------- |
| pm:drawstart | `e`    | Called when drawing mode is enabled. Payload includes the shape type and working layer |
| pm:drawend   | `e`    | Called when drawing mode is disabled. Payload includes the shape type.                 |
| pm:create    | `e`    | Called when a shape is drawn/finished. Payload includes shape type and the drawn layer |

There are also several events for layers during draw. Register an event like this:

```js
// listen to vertexes being added to currently drawn layer (called workingLayer)
map.on('pm:drawstart', ({ workingLayer }) => {
    workingLayer.on('pm:vertexadded', (e) => {
        console.log(e);
    });
});
```

Here's a list of layer events you can listen to:

| Event           | Params | Description                                                                                                          |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| pm:vertexadded  | `e`    | Called when a new vertex is added. Payload includes the new vertex, it's marker, index, working layer and shape type |
| pm:snapdrag     | `e`    | Fired during a marker move/drag. Payload includes information about the snapping calculation                         |
| pm:centerplaced | `e`    | Called when the center of a circle is placed/moved.                                                                  |

##### Creating Holes and Cutting a Polygon

![cut polygon](https://file-klmbwnzaor.now.sh/cutting.gif)

Enable drawing for the shape "Cut" to draw a polygon that gets subtracted from
all underlying polygons. This way you can create holes, cut polygons in half or
remove parts of it.

Important: the cutted layer will be replaced, not updated. Listen to the
`pm:cut` event to update your layer references in your code. The `pm:cut` event
will provide you with the original layer and returns the resulting
layer(s) that is/are added to the map as a Polygon or MultiPolygon.

```js
// recommended options (used when enabled via toolbar)
var options = { snappable: false, cursorMarker: false };

// enable cutting
map.pm.Draw.Cut.enable(options);

// disable cutting
map.pm.Draw.Cut.disable(options);

// toggle cutting
map.pm.Draw.Cut.toggle(options);

// listen to when a specific layer gets cut
layer.on('pm:cut', function(e) {});

// listen to when any layer on the map gets cut
map.on('pm:cut', function(e) {});
```

##### Edit Mode

Let's you edit vertices of layers. Use it like this:

```js
var polygonLayer = L.geoJson(data).addTo(map);

// available options
var options = {
    // makes the vertices snappable to other layers
    // temporarily disable snapping during drag by pressing ALT
    snappable: true,

    // distance in pixels that needs to be undercut to trigger snapping
    // default: 30
    snapDistance: 30,

    // self intersection allowed?
    allowSelfIntersection: true,

    // disable the removal of markers/vertexes via right click
    preventMarkerRemoval: false,
};

// enable edit mode
polygonLayer.pm.enable(options);
marker.pm.enable(options);

// disable edit mode
polygonLayer.pm.disable();

// toggle edit mode
polygonLayer.pm.toggleEdit(options);

// check if edit mode is enabled
polygonLayer.pm.enabled(); // returns true/false

// listen to changes
polygonLayer.on('pm:edit', function(e) {});
polygonLayer.on('pm:dragstart', function(e) {});
polygonLayer.on('pm:drag', function(e) {});
polygonLayer.on('pm:dragend', function(e) {});

// listen to when vertexes are being added or removed from the layer
polygonLayer.on('pm:vertexadded', function(e) {});
polygonLayer.on('pm:vertexremoved', function(e) {});

// listen to when a marker of a polygon-vertex is being dragged
polygonLayer.on('pm:markerdragstart', function(e) {
    // the property e.ringIndex refers to the coordinate ring inside the polygon the marker belongs to
    // if it's undefined, there are no rings
    // e.index is the index of the marker inside the coordinate ring / array it belongs to
});
polygonLayer.on('pm:markerdragend', function(e) {});

// listen to when snapping occurs
// pm:snap and pm:unsnap are, in addition to the layer, also fired on the markers of the polygon
// if you'd need it for some advanced behaviour
polygonLayer.on('pm:snap', function(e) {});
polygonLayer.on('pm:unsnap', function(e) {});

// if allowSelfIntersection is false: listen to when a self-intersection is detected
// e.intersection includes a geoJSON of the intersection
polygonLayer.on('pm:intersect', function(e) {});

circleLayer.on('pm:centerplaced', function(e) {});

// toggle global edit mode (edit mode for all layers on the map)
map.pm.toggleGlobalEditMode(options);

// listen to when global edit mode is toggled
map.on('pm:globaleditmodetoggled', function(e) {});

// check self intersection
polygonLayer.pm.hasSelfIntersection(); // true/false
```

##### Drag Mode

```js
// toggle global removal mode
map.pm.toggleGlobalDragMode();

// related events
map.on('pm:dragstart', function(e) {});
map.on('pm:drag', function(e) {});
map.on('pm:dragend', function(e) {});
```

##### Removal Mode

```js
// toggle global removal mode
map.pm.toggleGlobalRemovalMode();

// listen to removal of layers
map.on('layerremove', function(e) {});

// listen to removal of layers by leaflet.pm
map.on('pm:remove', function(e) {});
```

### Customize Style

In order to change the style of the lines during draw, pass these options to the
`enableDraw()` function.

```js
// optional options for line style during draw. These are the defaults
var options = {
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
map.pm.enableDraw('Poly', options);
```

To customize the style of the drawn layer with leaflet options, you can either
pass the options to `enableDraw`:

```js
// optional options for line style during draw. These are the defaults
var options = {
    templineStyle: {},
    hintlineStyle: {},
    pathOptions: {
        // add leaflet options for polylines/polygons
        color: 'orange',
        fillColor: 'green',
    },
};

// enable drawing mode for shape - e.g. Poly or Line
map.pm.enableDraw('Poly', options);
```

or set the options generally:

```js
map.pm.setPathOptions({
    color: 'orange',
    fillColor: 'green',
    fillOpacity: 0.4,
});
```

### Feature Request

I'm adopting the Issue Management of lodash which means, feature requests get the "Feature Request" Label and then get closed.
You can upvote existing feature requests (or create new ones). Upvotes make me see how much a feature is requested and prioritize their implementation.
Please see the existing [Feature Requests here](https://github.com/codeofsumit/leaflet.pm/issues?q=is%3Aissue+is%3Aclosed+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc) and upvote if you want them to be implemented.

### Credit

As I never built a leaflet plugin before, I looked heavily into the code of
leaflet.draw to find out how to do stuff. So don't be surprised to see some
familiar code.

I also took a hard look at the great
[L.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) for some
of my helper functions.

If you want to support the development of leaflet.pm, consider subscribing to the services of [Geoman](https://geoman.io).
