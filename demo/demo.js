/* eslint-disable no-console */
const tiles1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const tiles2 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const tiles3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const map2 = L.map('example2').setView([51.505, -0.09], 13).addLayer(tiles1);
const map3 = L.map('example3').setView([51.505, -0.09], 13).addLayer(tiles2);
const map4 = L.map('example4').setView([51.505, -0.09], 13).addLayer(tiles3);
// map2.dragging.disable();

// map2.on('pm:create', function(e) {
//     // alert('pm:create event fired. See console for details');
//     console.log(e);

//     const layer = e.layer;
//     layer.on('pm:cut', function(ev) {
//         console.log('cut event on layer');
//         console.log(ev);
//     });
// });
// map2.on('pm:cut', function(e) {
//     console.log('cut event on map');
//     console.log(e);
// });
// map2.on('pm:remove', function(e) {
//     console.log('pm:remove event fired. See console for details');
//     // alert('pm:remove event fired. See console for details');
//     console.log(e);
// });
// map2.on('pm:drawstart', function(e) {
//     console.log(e);
//     console.log(e.workingLayer);
// });

const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 });
const m2 = L.marker([51.50614, -0.0989]);
const m3 = L.marker([51.50915, -0.096112], { pmIgnore: true });

// eslint-disable-next-line no-unused-vars
const mGroup = L.layerGroup([m1, m2, m3]).addTo(map2);
// mGroup.pm.enable();

map2.pm.addControls({
  drawMarker: false,
  drawPolygon: true,
  editMode: false,
  drawPolyline: false,
  removalMode: true,
});
// map2.pm.addControls({
//     drawMarker: false,
//     drawPolygon: true,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: false,
// });
// map2.pm.addControls({
//     drawMarker: true,
//     drawPolygon: false,
//     editMode: false,
//     drawPolyline: false,
//     removalMode: true,
// });
map2.pm.addControls({
  drawMarker: true,
  drawPolygon: true,
  editMode: true,
  drawPolyline: true,
  removalMode: true,
});

// map2.pm.disableDraw('Polygon');
// map2.pm.enableDraw('Circle', {
//     snappable: true,
//     cursorMarker: true
// });

// map2.pm.enableDraw('Line', { allowSelfIntersection: false });
// map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });

map2.on('pm:globaleditmodetoggled', (e) => {
  console.log(e);
});

// GEOSJON EXAMPLE
const geoJsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 50 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.152843, 51.486742, 77],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 20 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.151727, 51.487472, 77],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 80 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.153636, 51.486562, 77],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15369, 51.486973, 77],
            [-0.153853, 51.48686, 77],
            [-0.154183, 51.486968, 77],
            [-0.154001, 51.487087, 77],
            [-0.15369, 51.486973, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.15252, 51.487201, 77],
            [-0.152789, 51.487281, 77],
            [-0.153025, 51.487097, 77],
            [-0.152633, 51.487002, 77],
            [-0.152448, 51.487088, 77],
            [-0.15252, 51.487201, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.154241, 51.487382, 77],
            [-0.1545, 51.487608, 77],
            [-0.154905, 51.487384, 77],
            [-0.154343, 51.487322, 77],
            [-0.154241, 51.487382, 77],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { customGeometry: { radius: 50 } },
      geometry: {
        type: 'Point',
        coordinates: [-0.153366, 51.487348, 77],
      },
    },
  ],
};

const theCollection = L.geoJson(geoJsonData, {
  pointToLayer: (feature, latlng) => {
    if (feature.properties.customGeometry) {
      return new L.Circle(latlng, feature.properties.customGeometry.radius);
    }
    return new L.Marker(latlng);
  },
  // onEachFeature: (feature, layer) => {
  //     layer.addTo(map2);
  // },
});

theCollection.addTo(map2);

const b = theCollection.getBounds();
map2.fitBounds(b);

console.log(theCollection);

theCollection.on('pm:edit', (e) => {
  console.log(e);
});

theCollection.on('pm:dragstart', (e) => {
  console.log(e);
});

// const geoJsonButton = document.getElementById('test-geojson');
// const geoJsonLayer = L.geoJson(null, { pmIgnore: false });
// geoJsonLayer.addTo(map2);
// geoJsonLayer.addData(geoJsonData);

// geoJsonLayer.pm.toggleEdit({
//     draggable: true,
//     snappable: true,
// });

map3.pm.addControls({
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

map3.pm.enableDraw('Polygon', {
  snappable: true,
  templineStyle: {
    color: 'blue',
  },
  hintlineStyle: {
    color: 'blue',
    dashArray: [5, 5],
  },
  pathOptions: {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.7,
  },
  markerStyle,
  cursorMarker: false,
  // finishOn: 'contextmenu',
  finishOnDoubleClick: true,
});

const scotland = L.polygon([
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

// geoJsonLayer.addEventListener('click', function(e) {
//     geoJsonLayer.pm.toggleEdit();
// });

// geoJsonLayer.on('pm:drag', function(e) {
//     console.log(e);
// });

map2.on('pm:drawstart', (e) => {
  const layer = e.workingLayer;
  // console.log(layer);
  layer.on('pm:centerplaced', (x) => {
    console.log(x);
  });
});
map2.on('pm:create', (e) => {
  const { layer } = e;
  // console.log(layer);
  layer.on('pm:centerplaced', (x) => {
    console.log(x);
  });
});

// Polygon Example

const polygonLayer = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])
  .addTo(map3)
  .addTo(map2);

// polygonLayer.pm.toggleEdit({
//     allowSelfIntersection: false,
//     preventVertexEdit: true,
//     preventMarkerRemoval: false,
// });

polygonLayer.on('pm:update', (e) => {
  console.log(e);
});

polygonLayer.on('pm:intersect', (e) => {
  console.log(e);
});

// map2.pm.toggleGlobalEditMode({
//     allowSelfIntersection: false,
//     preventMarkerRemoval: false,
//     preventVertexEdit: false,
// });
// map2.pm.disableGlobalEditMode();

map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });
map2.pm.disableDraw('Polygon');
map2.pm.enableDraw('Line', { allowSelfIntersection: false });
map2.pm.disableDraw('Line');

map2.on('pm:create', (e) => {
  // e.layer.pm.enable({ allowSelfIntersection: false });
  // e.layer.pm.disable();
  // console.log(e.layer.pm.hasSelfIntersection());

  e.layer.on('pm:markerdragend', (x) => {
    console.log(x);
  });

  e.layer.on('pm:update', (x) => {
    console.log(x);
  });

  e.layer.on('pm:cut', (x) => {
    console.log(x);
  });
});

map2.on('pm:drawstart', (e) => {
  const layer = e.workingLayer;
  layer.on('pm:vertexadded', (x) => {
    console.log(x);
    console.log(x.workingLayer.pm.hasSelfIntersection());
  });
});

polygonLayer.on('pm:vertexadded', (e) => {
  console.log(e);
});
polygonLayer.on('pm:vertexremoved', (e) => {
  console.log(e);
});

polygonLayer.on('pm:markerdragstart', (e) => {
  console.log(e);
});

// Layer Group Example

const layerGroupItem1 = L.polyline(
  [
    [51.51, -0.09],
    [51.513, -0.08],
    [51.514, -0.11],
  ],
  { pmIgnore: true }
);
const layerGroupItem2 = L.polygon([
  [51.52, -0.06],
  [51.51, -0.07],
  [51.52, -0.05],
]);

const layerGroupItem3 = L.polygon([
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

const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4);
layerGroup.pm.toggleEdit({
  draggable: true,
  snappable: true,
  snapDistance: 30,
});
const someLayer = L.geoJSON(feature);

layerGroup.addLayer(someLayer);

someLayer.addData(feature);

layerGroup.on('pm:snap', (e) => {
  console.log('snap');
  console.log(e);
});
layerGroup.on('pm:unsnap', (e) => {
  console.log('unsnap');
  console.log(e);
});

map4.pm.addControls({
  position: 'topright',
});

map4.pm.enableDraw('Polygon', {
  finishOn: 'mouseout',
});
map4.pm.disableDraw('Polygon');

map4.pm.enableDraw('Marker', {
  snappable: false,
});
map4.pm.disableDraw('Marker');

// map4.pm.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

layerGroup.addLayer(layerGroupItem2);
layerGroup.addLayer(layerGroupItem3);
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

layerGroup.on('pm:dragstart', (e) => {
  console.log(e);
});
layerGroup.on('pm:drag', (e) => {
  console.log(e);
});
layerGroup.on('pm:dragend', (e) => {
  console.log(e);
});
layerGroup.on('pm:markerdragstart', (e) => {
  console.log(e);
});
layerGroup.on('pm:markerdragend', (e) => {
  console.log(e);
});

// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);
