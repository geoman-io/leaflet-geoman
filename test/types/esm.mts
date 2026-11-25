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
polygon.on('pm:layerreset', (event) => {
  const indexPath: number[] | undefined = event.indexPath;
  // @ts-expect-error indexPath isn't a number
  const n: number = event.indexPath;
  void indexPath;
  void n;
});
// edit always passes a vertex's indexPath; draw fires pm:vertexadded without one
const onVertexAdded: PM.VertexAddedEventHandler2 = (event) => {
  const added: number[] = event.indexPath;
  void added;
};
void onVertexAdded;
polygon.on('pm:vertexremoved', (event) => {
  const removed: number[] = event.indexPath;
  void removed;
});
// circles and circle markers pass no indexPath
polygon.on('pm:vertexclick', (event) => {
  const clicked: number[] | undefined = event.indexPath;
  void clicked;
});
polygon.on('pm:markerdragstart', (event) => {
  const started: number[] | undefined = event.indexPath;
  void started;
});
polygon.on('pm:markerdrag', (event) => {
  const dragged: number[] | undefined = event.indexPath;
  void dragged;
});
polygon.on('pm:markerdragend', (event) => {
  const ended: number[] | undefined = event.indexPath;
  void ended;
});

// the toolbar button control keeps its own API, not just L.Control's
const button = new PMButton({ name: 'probe', position: 'topleft' });
const toggled: boolean = button.toggle(true);
button.disable();
void toggled;
