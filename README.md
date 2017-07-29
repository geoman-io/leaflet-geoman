# Leaflet Geometry Management
[![CDNJS](https://img.shields.io/cdnjs/v/leaflet.pm.svg)](https://cdnjs.com/libraries/leaflet.pm)

A Leaflet Plugin For Creating And Editing Geometry Layers in Leaflet 1.0.  
Draw, Edit, Drag, and Snap Features.

In the name "leaflet.pm" the "pm" stands for Polygon Management. At the time, this plugin only supported polygons. Now you can edit Markers, Polylines, Polygons, LayerGroups, GeoJSON and more are coming.

## [Demo (click here)](https://leafletpm.now.sh)

![snap at drag](https://cloud.githubusercontent.com/assets/2399810/22544799/8f4478b0-e936-11e6-9cb0-907394c5e51f.gif)

### Why *another* geometry editing plugin?
As leaflet.draw development seemed to came to a halt and I needed support for leaflet 1.0 I created this plugin myself due to a lack of alternatives.  
As we are always using the latest leaflet version in a big production app, I will (have to) keep this plugin constantly developed.

### Getting Started

#### Install via npm
`npm install leaflet.pm --save`

#### Install via Bower (DEPRECATED - leaflet.pm is no longer supporting bower since 0.17.0)
`bower install leaflet.pm --save`

#### Install Manually
Download [`leaflet.pm.css`](https://unpkg.com/leaflet.pm@0.17.2/dist/leaflet.pm.css) and [`leaflet.pm.min.js`](https://unpkg.com/leaflet.pm@0.17.2/dist/leaflet.pm.min.js) and include them in your project.


#### Include via CDN
CSS
`<link rel="stylesheet" href="https://unpkg.com/leaflet.pm@0.17.2/dist/leaflet.pm.css" />`

JS
`<script src="https://unpkg.com/leaflet.pm@0.17.2/dist/leaflet.pm.min.js"></script>`

#### Include as ES6 Module
`import 'leaflet.pm';`  
`import 'leaflet.pm/dist/leaflet.pm.css';`

#### Include as CommonJS Module
`require('leaflet.pm');`  
`require('leaflet.pm/dist/leaflet.pm.css');`


#### Init Leaflet.PM
Just include `leaflet.pm.min.js` right after Leaflet. It initializes itself.
If you want certain layers to be ignored by leaflet.pm, pass `pmIgnore: true` to their options when creating them. Example:
```
L.marker([51.50915, -0.096112], {pmIgnore: true}).addTo(map);
```

##### Leaflet.PM Toolbar
This plugin comes with an optional toolbar to give you buttons to use the various features.

```
// define toolbar options
var options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    drawMarker: true,  // adds button to draw markers
    drawPolygon: true,  // adds button to draw a polygon
    drawPolyline: true,  // adds button to draw a polyline
    drawCircle: true,  // adds button to draw a cricle
    editPolygon: true,  // adds button to toggle global edit mode
    deleteLayer: true   // adds a button to delete layers
};

// add leaflet.pm controls to the map
map.pm.addControls(options);
```
If no options are passed, all buttons will be shown.


##### Drawing Mode
Use Drawing Mode on a map like this


```

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

// enable drawing mode for shape - e.g. Poly or Line
map.pm.enableDraw('Poly', options);
map.pm.enableDraw('Line', options);
map.pm.enableDraw('Marker', options);
map.pm.enableDraw('Circle', options);

// get array of all available shapes
map.pm.Draw.getShapes()

// listen to when drawing mode gets enabled
map.on('pm:drawstart', function(e) {//...});


// disable drawing mode
map.pm.disableDraw('Poly');

// listen to when drawing mode gets disabled
map.on('pm:drawend', function(e) {//...});

// listen to when a new layer is created
map.on('pm:create', function(e) {//...});

```


##### Edit Mode
Use Edit Mode for a layer like this:

```
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

// listen to when a marker of a polygon-vertex is being dragged
polygonLayer.on('pm:markerdragstart', function(e) {//...});
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

```
// toggle global removal mode
map.pm.toggleGlobalRemovalMode();

// listen to removal of layers that are NOT ignored and NOT helpers by leaflet.pm
map.on('pm:remove', function(e) {//...})
```

### Customize Style

In order to change the style of the lines during draw, pass these options to the `enableDraw()` function.

```
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

// enable drawing mode for shape - e.g. Poly or Line
map.pm.enableDraw('Poly', options);
```

To customize the style of the drawn layer (polygon, polyline) with leaflets options, you can either pass the options to `enableDraw` as well:

```
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

```
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
