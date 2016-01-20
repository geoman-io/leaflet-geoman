# Leaflet Polygon Management
A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0

### Why *another* geometry editing plugin?
As leaflet.draw development seemed to came to a halt and I needed support for leaflet 1.0 beta (v2) I created this plugin myself due to a lack of alternatives.
As we are always using the latest leaflet version in a big production app, I will (have to) keep this plugin constantly developed.

#### [Demo](http://codeofsumit.github.io/leaflet.pm/)

### Getting Started
Include `leaflet.pm.min.js` in your project. Download the latest release [here](https://github.com/codeofsumit/leaflet.pm/releases).
Then, you can simply start editing on your layers.
```
var polygonLayer = L.geoJson(data).addTo(map);
polygonLayer.pm.toggleEdit();
```

##### Listen To Changes
`polygonLayer.on('pm:edit', function() {//...});`

##### Listen To New Drawings
`map.on('pm:create', function() {//...});`

For more advanced usage, examples and detailed code snippets, check out the [Demo Page](http://codeofsumit.github.io/leaflet.pm/)

### Credit
As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be suprised to see some familiar code.

### License
Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
