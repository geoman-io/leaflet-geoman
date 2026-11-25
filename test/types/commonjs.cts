import L = require('leaflet');

const map = new L.Map('map');
const polygon = new L.Polygon([
  [0, 0],
  [0, 1],
  [1, 1],
]);
const marker = new L.Marker([51.5, -0.09]);

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
map.on('pm:remove', (event) => event.layer);
polygon.on('pm:cut', (event) => event.layer);
map.on('pm:intersect', (event) => event.intersection);
polygon.on('pm:rotate', (event) => event.angle);
map.on({ 'pm:create': (event) => event.layer });
polygon.on({ 'pm:edit': (event) => event.shape });
map.on('click', (event) => event.latlng);
polygon.on('click', (event) => event.latlng);

const plainLayer = new L.Layer();
// @ts-expect-error pm:globaldrawmodetoggled is fired on the map
plainLayer.on('pm:globaldrawmodetoggled', (event) => event.enabled);
// @ts-expect-error pm:edit is fired on the layer
map.on('pm:edit', (event) => event.shape);

void drawModeMap;
void createdMap;
void startedMap;
void editedPolygon;
void draggedMarker;
void snapGroup;
