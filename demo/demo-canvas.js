import {
  TileLayer,
  LeafletMap,
  CircleMarker,
  Marker,
  FeatureGroup,
  Polygon,
  Polyline,
  LayerGroup,
  GeoJSON,
} from 'leaflet';
import Geoman from 'leaflet-geoman';

Geoman.initialize();

const tiles1 = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const tiles2 = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const tiles3 = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const map2 = new LeafletMap('example2', { preferCanvas: true })
  .setView([51.505, -0.09], 13)
  .addLayer(tiles1);
const map3 = new LeafletMap('example3', { preferCanvas: true })
  .setView([51.505, -0.09], 13)
  .addLayer(tiles2);
const map4 = new LeafletMap('example4', { preferCanvas: true })
  .setView([51.505, -0.09], 13)
  .addLayer(tiles3);
// map2.dragging.disable();

// map2.on('geoman:create', function(e) {
//     // alert('geoman:create event fired. See console for details');
//     console.log(e);

//     const layer = e.layer;
//     layer.on('geoman:cut', function(ev) {
//         console.log('cut event on layer');
//         console.log(ev);
//     });
// });
// map2.on('geoman:cut', function(e) {
//     console.log('cut event on map');
//     console.log(e);
// });
// map2.on('geoman:remove', function(e) {
//     console.log('geoman:remove event fired. See console for details');
//     // alert('geoman:remove event fired. See console for details');
//     console.log(e);
// });
// map2.on('geoman:drawstart', function(e) {
//     console.log(e);
//     console.log(e.workingLayer);
// });

const m1 = new CircleMarker([51.50313, -0.091223], { radius: 10 });
const m2 = new Marker([51.50614, -0.0989]);
const m3 = new Marker([51.50915, -0.096112], { geomanIgnore: true });

const mGroup = new LayerGroup([m1, m2, m3]).addTo(map2);
mGroup.geoman.enable();

map2.geoman.addControls({
  drawMarker: false,
  drawPolygon: true,
  editMode: false,
  drawPolyline: false,
  removalMode: true,
});
// map2.geoman.addControls({
//     drawMarker: false,
//     drawPolygon: true,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: false,
// });
// map2.geoman.addControls({
//     drawMarker: true,
//     drawPolygon: false,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: true,
// });
map2.geoman.addControls({
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  drawPolyline: true,
  removalMode: true,
});

map2.geoman.disableDraw();
// map2.geoman.enableDraw('Circle', {
//     allowSnapping: true,
//     cursorMarker: true
// });

map2.geoman.enableDraw('Polyline', { allowSelfIntersection: false });
map2.geoman.enableDraw('Polygon', { allowSelfIntersection: false });

map2.on('geoman:globaleditmodetoggled', (e) => {
  console.log(e);
});

// GEOSJON EXAMPLE

const geoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15483856201171872, 51.527329038465936],
            [-0.1697731018066406, 51.51643437722083],
            [-0.15964508056640625, 51.50094238217541],
            [-0.13149261474609375, 51.5042549065934],
            [-0.11758804321289061, 51.518463972439385],
            [-0.13303756713867188, 51.53106680201548],
            [-0.15483856201171872, 51.527329038465936],
          ],
        ],
      },
    },
  ],
};

// const geoJsonButton = document.getElementById('test-geojson');
const geoJsonLayer = new GeoJSON(null, { geomanIgnore: false });
geoJsonLayer.addTo(map2);
geoJsonLayer.addData(geoJsonData);
// geoJsonLayer.geoman.toggleEdit({
//     draggable: true,
//     allowSnapping: true,
// });

map3.geoman.addControls({
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  removalMode: true,
  drawPolyline: true,
});

const markerStyle = {
  opacity: 0.5,
  draggable: false,
};

map3.geoman.enableDraw('Polygon', {
  allowSnapping: true,
  templineStyle: {
    color: 'blue',
  },
  hintlineStyle: {
    color: 'blue',
    dashArray: '5,5',
  },
  pathOptions: {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.7,
  },
  markerStyle,
  cursorMarker: false,
  finishOn: 'dblclick',
});

const scotland = new Polygon([
  [
    [60, -13],
    [60, 0],
    [50, 4],
    [50, -13],
  ],
  [
    [55.7, -4.5],
    [56, -4.5],
    [56, -4],
    [55.7, -4],
  ],
]);
scotland.addTo(map3);

const bounds = scotland.getBounds();

map3.fitBounds(bounds);

geoJsonLayer.on('click', () => {
  geoJsonLayer.geoman.toggleEdit();
});

geoJsonLayer.on('geoman:edit', (e) => {
  console.log(e);
});

geoJsonLayer.on('geoman:dragstart', (e) => {
  console.log(e);
});
// geoJsonLayer.on('geoman:drag', function(e) {
//     console.log(e);
// });
geoJsonLayer.on('geoman:dragend', (e) => {
  console.log(e);
});

map2.on('geoman:drawstart', (e) => {
  const layer = e.workingLayer;
  // console.log(layer);
  layer.on('geoman:centerplaced', (x) => {
    console.log(x);
  });
});
map2.on('geoman:create', (e) => {
  const { layer } = e;
  // console.log(layer);
  layer.on('geoman:centerplaced', (x) => {
    console.log(x);
  });
});

// Polygon Example

const polygonLayer = new Polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])
  .addTo(map3)
  .addTo(map2);
polygonLayer.geoman.toggleEdit({
  allowSelfIntersection: false,
});

polygonLayer.on('geoman:update', (e) => {
  console.log(e);
});

polygonLayer.on('geoman:intersect', (e) => {
  console.log(e);
});

map2.geoman.toggleGlobalEditMode({
  allowSelfIntersection: false,
});
map2.geoman.disableGlobalEditMode();

map2.on('geoman:create', (e) => {
  e.layer.geoman.enable({ allowSelfIntersection: false });
  // e.layer.geoman.disable();
  // console.log(e.layer.geoman.hasSelfIntersection());

  e.layer.on('geoman:vertexdragend', (x) => {
    console.log(x);
  });

  e.layer.on('geoman:update', (x) => {
    console.log(x);
  });

  e.layer.on('geoman:cut', (x) => {
    console.log(x);
  });
});

map2.on('geoman:drawstart', (e) => {
  const layer = e.workingLayer;
  layer.on('geoman:vertexadded', (x) => {
    console.log(x);
    console.log(x.workingLayer.geoman.hasSelfIntersection());
  });
});

polygonLayer.on('geoman:vertexadded', (x) => {
  console.log(x);
});
polygonLayer.on('geoman:vertexremoved', (x) => {
  console.log(x);
});

polygonLayer.on('geoman:vertexdragstart', (x) => {
  console.log(x);
});

// Layer Group Example

const layerGroupItem1 = new Polyline([
  [51.51, -0.09],
  [51.513, -0.08],
  [51.514, -0.11],
]);
const layerGroupItem2 = new Polygon([
  [51.52, -0.06],
  [51.51, -0.07],
  [51.52, -0.05],
]);

const layerGroupItem3 = new Polygon([
  [51.51549835365031, -0.06450164634969281],
  [51.51944818307178, -0.08425079345703125],
  [51.51868369995795, -0.06131630004205801],
  [51.51549835365031, -0.06450164634969281],
]);

const feature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [72.839012, 19.058873],
        [72.92038, 19.066985],
        [72.856178, 19.019928],
        [72.839012, 19.058873],
      ],
    ],
  },
};

const layerGroup = new FeatureGroup([layerGroupItem1]).addTo(map4);
layerGroup.geoman.toggleEdit({
  draggable: true,
  allowSnapping: true,
  snapDistance: 30,
});
const someLayer = new GeoJSON(feature);

layerGroup.addLayer(someLayer);

someLayer.addData(feature);
console.log(layerGroup);

layerGroup.on('geoman:snap', (e) => {
  console.log('snap');
  console.log(e);
});
layerGroup.on('geoman:unsnap', (e) => {
  console.log('unsnap');
  console.log(e);
});

map4.geoman.addControls({
  position: 'topright',
});

map4.geoman.enableDraw('Polygon', {
  finishOn: 'pointerout',
});
map4.geoman.disableDraw();

map4.geoman.enableDraw('Marker', {
  allowSnapping: false,
});
map4.geoman.disableDraw();

// map4.geoman.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

layerGroup.addLayer(layerGroupItem2);
layerGroup.addLayer(layerGroupItem3);
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

layerGroup.on('geoman:dragstart', (e) => {
  console.log(e);
});
layerGroup.on('geoman:drag', (e) => {
  console.log(e);
});
layerGroup.on('geoman:dragend', (e) => {
  console.log(e);
});
layerGroup.on('geoman:vertexdragstart', (e) => {
  console.log(e);
});
layerGroup.on('geoman:vertexdragend', (e) => {
  console.log(e);
});

// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);
