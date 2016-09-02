# Leaflet Polygon Management
A Leaflet Plugin For Creating And Editing Geometry Layers in Leaflet 1.0.  
Draw, Edit, Drag, Cut, Adapt, and soon: Snap Features.

### Why *another* geometry editing plugin?
As leaflet.draw development seemed to came to a halt and I needed support for leaflet 1.0 I created this plugin myself due to a lack of alternatives.  
As we are always using the latest leaflet version in a big production app, I will (have to) keep this plugin constantly developed.

#### [Demo](http://codeofsumit.github.io/leaflet.pm/)

### Getting Started

#### Install via npm
`npm install leaflet.pm --save`

#### Install via Bower
`bower install leaflet.pm --save`

#### Install Manually
Download the latest release [here](https://github.com/codeofsumit/leaflet.pm/releases). Include `leaflet.pm.min.js` and `leaflet.pm.css` in your project.


#### Init Leaflet.PM
Just include `leaflet.pm.min.js` right after Leaflet.


##### Drawing Mode
Use Drawing Mode on a map like this


```

// enable drawing mode for shape - e.g. Poly
map.pm.enableDraw('Poly');

// get array of all available shapes (currently only Poly)
map.pm.getShapes();

// listen to when drawing mode gets enabled
map.on('pm:drawstart', function(e) {//...});


// disable drawing mode
map.pm.disableDraw('Poly');

// listen to when drawing mode gets disabled
map.on('pm:drawend', function(e) {//...});


// add a control button to the map which can toggle drawing mode for shapes
map.pm.addControls();

// listen to when a new layer is created
map.on('pm:create', function(e) {//...});

```


##### Edit Mode
Use Edit Mode for a layer like this:

```
var polygonLayer = L.geoJson(data).addTo(map);

// optional options
var options = {

    // makes the polygon draggable
    draggable: true,

    // EXPERIMENTAL: if a polygon gets dragged over another polygon of the same layergroup,
    // the polygon will get cut - this feature still may have some bugs and will be further developed.
    // This feature needs the turfJS dependency
    preventOverlap: true

};

// enable edit mode
polygonLayer.pm.enable(options);

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

```


### Credit
As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be surprised to see some familiar code.

The icons used for the toolbar are CC-BY [Glyphicons](http://glyphicons.com/).


### License
Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
