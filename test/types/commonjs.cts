import L = require('leaflet');
import '@geoman-io/leaflet-geoman-free';

const map = L.map('map');
map.pm.addControls({ position: 'topleft', drawMarker: true });
map.pm.setGlobalOptions({ snappable: true, snapDistance: 20, draggable: true });
map.pm.enableDraw('Polygon', {
  allowSelfIntersection: false,
  continueDrawing: true,
});
map.pm.disableDraw();
const marker = L.marker([51.5, -0.09]).addTo(map);
marker.pm.enable({ draggable: true });
marker.pm.disable();
const polygon = L.polygon([
  [0, 0],
  [0, 1],
  [1, 1],
]).addTo(map);
polygon.pm.enableRotate();
polygon.pm.rotateLayer(30);
polygon.pm.disableRotate();
map.pm.Toolbar.createCustomControl({
  name: 'custom',
  title: 'Custom',
  onClick() {},
});
map.pm.Toolbar.copyDrawControl('Polygon', { name: 'CustomPolygon' });
map.on('pm:create', (event) => event.layer.addTo(map));
map.on('pm:globaleditmodetoggled', (event) => {
  const enabled: boolean = event.enabled;
  void enabled;
});
const group: L.FeatureGroup = map.pm.getGeomanLayers(true);
const layers: L.Layer[] = map.pm.getGeomanLayers();
void group;
void layers;
