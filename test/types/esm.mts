import * as L from 'leaflet';
import { PM, PMButton } from '@geoman-io/leaflet-geoman-free';

const map = new L.Map('map');
map.pm.addControls({ position: 'topleft', drawMarker: true });
map.pm.setGlobalOptions({ snappable: true, snapDistance: 20, draggable: true });
map.pm.enableDraw('Polygon', {
  allowSelfIntersection: false,
  continueDrawing: true,
});
map.pm.disableDraw();
const drawFinished: boolean = map.pm.finishDraw();
const marker = new L.Marker([51.5, -0.09]).addTo(map);
marker.pm.enable({ draggable: true });
marker.pm.disable();
const polygon = new L.Polygon([
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
void drawFinished;

// the namespace is the module's PM export
PM.setOptIn(false);
const version: string = PM.version;
void version;
map.on('pm:drawstart', (event) => {
  const shape: string = event.shape;
  void shape;
});
polygon.on('pm:edit', (event) => event.layer);

const drawModeMap: L.Map = map.on('pm:globaldrawmodetoggled', (event) => {
  const enabled: boolean = event.enabled;
  const shape: string = event.shape;
  return enabled && !!shape;
});
const createdMap: L.Map = map.on('pm:create', (event) => event.layer);
const startedMap: L.Map = map.on('pm:drawstart', (event) => event.workingLayer);
const editedPolygon: L.Polygon = polygon.on('pm:edit', (event) => event.shape);
const draggedMarker: L.Marker = marker.on(
  'pm:dragstart',
  (event) => event.layer
);
const snapGroup: L.LayerGroup = new L.LayerGroup().on(
  'pm:snap',
  (event) => event.layer
);
const editedGroup: L.FeatureGroup = new L.FeatureGroup().on(
  'pm:edit',
  (event) => event.shape
);
map.on('pm:remove', (event) => event.layer);
polygon.on('pm:remove', (event) => event.layer);
map.on('pm:cut', (event) => event.originalLayer);
polygon.on('pm:cut', (event) => event.layer);
map.on('pm:intersect', (event) => event.intersection);
polygon.on('pm:intersect', (event) => event.layer);
map.on('pm:rotate', (event) => event.angle);
polygon.on('pm:rotate', (event) => event.angle);
map.once('pm:drawend', (event) => event.shape);
polygon.once('pm:update', (event) => event.shape);
map.off('pm:langchange', (event) => event.activeLang);
polygon.off('pm:dragend', (event) => event.layer);
map.on({ 'pm:create': (event) => event.layer });
polygon.on({ 'pm:edit': (event) => event.shape });
map.on('click', (event) => event.latlng);
polygon.on('click', (event) => event.latlng);
map.on('pm:create', (event) => event.layer, map);
// A space-separated list still accepts the payload fields.
map.on('pm:create layeradd', (event) => event.layer);

const plainLayer = new L.Layer();
// @ts-expect-error pm:globaldrawmodetoggled is fired on the map
plainLayer.on('pm:globaldrawmodetoggled', (event) => event.enabled);
// @ts-expect-error pm:edit is fired on the layer
map.on('pm:edit', (event) => event.shape);
// @ts-expect-error once follows the same map/layer split
plainLayer.once('pm:create', (event) => event.shape);
// @ts-expect-error off follows the same map/layer split
map.off('pm:update', (event) => event.shape);

void drawModeMap;
void createdMap;
void startedMap;
void editedPolygon;
void draggedMarker;
void snapGroup;
void editedGroup;

// the toolbar button control keeps its own API, not just L.Control's
const button = new PMButton({ name: 'probe', position: 'topleft' });
const toggled: boolean = button.toggle(true);
button.disable();
void toggled;
