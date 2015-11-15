# Leaflet Polygon Management
A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0

### Why *another* geometry editing plugin?
As leaflet.draw development seemed to came to a halt and I needed support for leaflet 1.0 beta (v2) I created this plugin myself due to a lack of alternatives.

### Getting Started
Include `leaflet.pm.js` in your project. Download the latest release [here](https://github.com/codeofsumit/leaflet.pm/releases).
Then, you can simply start editing on your layers.
```
var polygonLayer = L.geoJson(data).addTo(map);
polygonLayer.pm.toggleEdit();
```
You can remove markers with right click.

### Credit
As I never built a leaflet plugin before, I looked heavily into the code of leaflet.draw to find out how to do stuff. So don't be suprised to see some familiar code.
