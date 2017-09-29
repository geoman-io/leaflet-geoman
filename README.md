# Leaflet Geometry Management
A Leaflet Plugin For Creating And Editing Geometry Layers in Leaflet 1.0.  
Draw, Edit, Drag, and Snap Features.

In the name "leaflet.pm" the "pm" stands for Polygon Management. At the time, this plugin only supported polygons. Now you can edit Markers, Polylines, Polygons, LayerGroups, GeoJSON and more are coming.

## [Demo (click here)](https://leafletpm.now.sh)

![snap at drag](https://github.com/codeofsumit/leaflet.pm-demo/blob/master/static/gifs/github-demo.gif)

### Why *another* geometry editing plugin?
As leaflet.draw development seemed to came to a halt and I needed support for leaflet 1.0 I created this plugin myself due to a lack of alternatives.  
As we are always using the latest leaflet version in a big production app, I will (have to) keep this plugin constantly developed.

### Getting Started

#### Install via npm
`npm install leaflet.pm --save`

#### Install via Bower (DEPRECATED - leaflet.pm is no longer supporting bower since 0.17.0)
`bower install leaflet.pm --save`

#### Install Manually
Download [`leaflet.pm.css`](https://unpkg.com/leaflet.pm@0.20.0/dist/leaflet.pm.css) and [`leaflet.pm.min.js`](https://unpkg.com/leaflet.pm@0.20.0/dist/leaflet.pm.min.js) and include them in your project.


#### Include via CDN
CSS
`<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@0.20.0/dist/leaflet.pm.css" />`

JS
`<script src="https://unpkg.com/leaflet.pm@0.20.0/dist/leaflet.pm.min.js"></script>`

#### Include as ES6 Module
`import 'leaflet.pm';`  
`import 'leaflet.pm/dist/leaflet.pm.css';`

#### Include as CommonJS Module
`require('leaflet.pm');`  
`require('leaflet.pm/dist/leaflet.pm.css');`


#### Init Leaflet.PM
Just include `leaflet.pm.min.js` right after Leaflet. It initializes itself.
If you want certain layers to be ignored by leaflet.pm, pass `pmIgnore: true` to their options when creating them. Example:
``` js
L.marker([51.50915, -0.096112], {pmIgnore: true}).addTo(map);
```

##### Leaflet.PM Toolbar
This plugin comes with an optional toolbar to give you buttons to use the various features.

``` js
// define toolbar options
var options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true,  // adds button to draw markers
    drawPolyline: true,  // adds button to draw a polyline
    drawRectangle: true,  // adds button to draw a rectangle
    drawPolygon: true,  // adds button to draw a polygon
    drawCircle: true,  // adds button to draw a cricle
    cutPolygon: true,  // adds button to cut a hole in a polygon
    editMode: true,  // adds button to toggle edit mode for all layers
    removalMode: true   // adds a button to remove layers
};

// add leaflet.pm controls to the map
map.pm.addControls(options);
```
If no options are passed, all buttons will be shown.


##### Drawing Mode
Use Drawing Mode on a map like this


``` js

// optional options for line style during draw. These are the defaults
var options = {
    // snapping
    snappable: true,
    snapDistance: 20,

    // the lines between coordinates/markers
    templineStyle: {
        color: 'red',
    },

    // the line from the last marker to the mouse cursor
    hintlineStyle: {
        color: 'red',
        dashArray: [5, 5],
    },

    // show a marker at the cursor
    cursorMarker: false,

    // finish drawing on double click
    // this works, but if you enable it, there is a problem that's not fixed yet:
    // https://github.com/codeofsumit/leaflet.pm/issues/147
    finishOnDoubleClick: false,

    // custom marker style (only for Marker draw)
    markerStyle: {
        opacity: 0.5,
        draggable: true,
    }
};

// enable drawing mode for shape - e.g. Poly, Line, etc
map.pm.enableDraw('Poly', options);
map.pm.enableDraw('Rectangle', options);
map.pm.enableDraw('Line', options);
map.pm.enableDraw('Marker', options);
map.pm.enableDraw('Circle', options);

// get array of all available shapes
map.pm.Draw.getShapes();

// listen to when drawing mode gets enabled
map.on('pm:drawstart', function(e) {
    e.shape; // the name of the shape being drawn (i.e. 'Circle')
    e.workingLayer; // the leaflet layer displayed while drawing
});

// disable drawing mode
map.pm.disableDraw('Poly');

// listen to when drawing mode gets disabled
map.on('pm:drawend', function(e) {
    e.shape; // the name of the shape being drawn (i.e. 'Circle')
});

// listen to when a new layer is created
map.on('pm:create', function(e) {
    e.shape; // the name of the shape being drawn (i.e. 'Circle')
    e.layer; // the leaflet layer created
});

// listen to vertexes being added to the workingLayer
map.on('pm:drawstart', function(e) {
    var layer = e.workingLayer;
    layer.on('pm:vertexadded', function(e) {
        // e includes the new vertex, it's marker
        // the index in the coordinates array
        // the working layer and shape
    });
});

```

##### Creating Holes or Cutting a Polygon
![cut polygon](https://user-images.githubusercontent.com/2399810/29863151-15929280-8d6f-11e7-90e8-1935695175aa.gif)
Enable drawing for the shape "Cut" to draw a polygon that gets subtracted from all underlying polygons.
This way you can create holes, cut polygons in half or remove parts of it.

Important: the cutted layer will be replaced, not updated. Listen to the `pm:cut` event to update your layer references in your code.
The `pm:cut` event will provide you with the old/removed/cut layer and returns the resulting layer(s) that is/are added to the map.
``` js
// recommended options (used when enabled via toolbar)
var options = { snappable: false, cursorMarker: false };

// enable cutting
map.pm.Draw.Cut.enable(options);

// disable cutting
map.pm.Draw.Cut.disable(options);

// toggle cutting
map.pm.Draw.Cut.toggle(options);

// listen to when a specific layer gets cut
layer.on('pm:cut', function(e) {//...});

// listen to when any layer on the map gets cut
map.on('pm:cut', function(e) {//...});
```

##### Edit Mode
Use Edit Mode for a layer like this:

``` js
var polygonLayer = L.geoJson(data).addTo(map);

// optional options
var options = {

    // makes the layer draggable
    draggable: true,

    // makes the vertices snappable to other layers
    // temporarily disable snapping during drag by pressing ALT
    snappable: true,

    // distance in pixels that needs to be undercut to trigger snapping
    // default: 30
    snapDistance: 30

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
polygonLayer.on('pm:edit', function(e) {//...});
polygonLayer.on('pm:dragstart', function(e) {//...});
polygonLayer.on('pm:drag', function(e) {//...});
polygonLayer.on('pm:dragend', function(e) {//...});

// listen to when vertexes are being added or removed from the layer
polygonLayer.on('pm:vertexadded', function(e) {//...);
polygonLayer.on('pm:vertexremoved', function(e) {//...);

// listen to when a marker of a polygon-vertex is being dragged
polygonLayer.on('pm:markerdragstart', function(e) {
    // the property e.ringIndex refers to the coordinate ring inside the polygon the marker belongs to
    // if it's undefined, there are no rings
    // e.index is the index of the marker inside the coordinate ring / array it belongs to
});
polygonLayer.on('pm:markerdragend', function(e) {//...});

// listen to when snapping occurs
// pm:snap and pm:unsnap are, in addition to the layer, also fired on the markers of the polygon
// if you'd need it for some advanced behaviour
polygonLayer.on('pm:snap', function(e) {//...});
polygonLayer.on('pm:unsnap', function(e) {//...});

// toggle global edit mode (edit mode for all layers on the map)
map.pm.toggleGlobalEditMode();

```

##### Removal Mode

``` js
// toggle global removal mode
map.pm.toggleGlobalRemovalMode();

// listen to removal of layers that are NOT ignored and NOT helpers by leaflet.pm
map.on('pm:remove', function(e) {//...})
```

### Customize Style

In order to change the style of the lines during draw, pass these options to the `enableDraw()` function.

``` js
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

To customize the style of the drawn layer with leaflet options, you can either pass the options to `enableDraw`:

``` js
// optional options for line style during draw. These are the defaults
var options = {
    templineStyle: {},
    hintlineStyle: {},
    pathOptions: {
        // add leaflet options for polylines/polygons
        color: 'orange',
        fillColor: 'green',
    }
};

// enable drawing mode for shape - e.g. Poly or Line
map.pm.enableDraw('Poly', options);
```

or set the options generally:

``` js
map.pm.setPathOptions({
    color: 'orange',
    fillColor: 'green',
    fillOpacity: 0.4,
});
```


### Credit
As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be surprised to see some familiar code.

The icons used for the toolbar are CC-BY [Glyphicons](http://glyphicons.com/).

I also took a hard look at the great [L.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) for some of my helper functions.



### License
Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
