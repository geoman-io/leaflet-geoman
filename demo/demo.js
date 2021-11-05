const tiles1 = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

const tiles2 = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

const tiles3 = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

const map2 = L.map('example2', {preferCanvas: false}).setView([51.505, -0.09], 13).addLayer(tiles1);
map2.on('touchstart', () => {
  console.log('alo')
})
// const map3 = L.map('example3').setView([51.505, -0.09], 13).addLayer(tiles2);
// const map4 = L.map('example4').setView([51.505, -0.09], 13).addLayer(tiles3);
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

// const mGroup = L.layerGroup([m1, m2, m3]).addTo(map2);
// mGroup.pm.enable();

// map2.pm.addControls({
//   drawMarker: false,
//   drawPolygon: true,
//   editMode: false,
//   drawPolyline: false,
//   removalMode: true,
// });
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
  // oneBlock: true,
});

// map2.pm.disableDraw('Polygon');
// map2.pm.enableDraw('Circle', {
//     snappable: true,
//     cursorMarker: true
// });

// map2.pm.enableDraw('Line', { allowSelfIntersection: false });
// map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });

map2.on('pm:globaleditmodetoggled', function (e) {
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

// const theCollection = L.geoJson(geoJsonData, {
//   pointToLayer: (feature, latlng) => {
//     if (feature.properties.customGeometry) {
//       return new L.Circle(latlng, feature.properties.customGeometry.radius);
//     } else {
//       return new L.Marker(latlng);
//     }
//   },
//   // onEachFeature: (feature, layer) => {
//   //     layer.addTo(map2);
//   // },
// });

// theCollection.addTo(map2);

// const b = theCollection.getBounds();
// map2.fitBounds(b);


// theCollection.on('pm:edit', function (e) {
//   console.log(e);
// });

// theCollection.on('pm:dragstart', function (e) {
//   console.log(e);
// });

// const geoJsonButton = document.getElementById('test-geojson');
// const geoJsonLayer = L.geoJson(null, { pmIgnore: false });
// geoJsonLayer.addTo(map2);
// geoJsonLayer.addData(geoJsonData);

// geoJsonLayer.pm.toggleEdit({
//     draggable: true,
//     snappable: true,
// });

// map3.pm.addControls({
//   drawMarker: true,
//   drawPolygon: true,
//   editMode: true,
//   removalMode: true,
//   drawPolyline: true,
// });

// const markerStyle = {
//   opacity: 0.5,
//   draggable: false,
// };

// map3.pm.enableDraw('Polygon', {
//   snappable: true,
//   templineStyle: {
//     color: 'blue',
//   },
//   hintlineStyle: {
//     color: 'blue',
//     dashArray: [5, 5],
//   },
//   pathOptions: {
//     color: 'red',
//     fillColor: 'orange',
//     fillOpacity: 0.7,
//   },
//   markerStyle: markerStyle,
//   cursorMarker: false,
//   // finishOn: 'contextmenu',
//   finishOnDoubleClick: true,
// });

// var scotland = L.polygon([
//   [
//     [60, -13],
//     [60, 0],
//     [50, 4],
//     [50, -13],
//   ],
//   [
//     [55.7, -4.5],
//     [56, -4.5],
//     [56, -4],
//     [55.7, -4],
//   ],
// ]);
// scotland.addTo(map3);

// const bounds = scotland.getBounds();

// map3.fitBounds(bounds);

// geoJsonLayer.addEventListener('click', function(e) {
//     geoJsonLayer.pm.toggleEdit();
// });

// geoJsonLayer.on('pm:drag', function(e) {
//     console.log(e);
// });
// const curve = L.curve([ "M", [ 51.518382078677675, -0.08222579956054689 ], "L", [ 51.50171532651141, -0.08977890014648438 ], "C", [ 51.50171532651141, -0.08977890014648438 ], [ 51.51645930305757, -0.06351470947265626 ], [ 51.502677035642726, -0.06265640258789064 ], "C", [ 51.48889476822788, -0.061798095703125014 ], [ 51.49359341785831, -0.06986618041992189 ], [ 51.49359341785831, -0.06986618041992189 ] ])
// .addTo(map2);
// map2.on('pm:drawstart', function (e) {
//   console.log('drawstart', e);
// });
// map2.on('pm:drawend', function (e) {
//   console.log('drawend', e);
// });
// map2.on('pm:create', function (e) {
//   console.log('create', e);
// });
// curve.on('pm:vertexadded', function (e) {
//   console.log('vertexadded', e);
// });

// map2.on('touchstart', () => {
//   console.log('touchstart');
// });
// map2.on('mousedown', () => {
//   console.log('mousedown');
// });
// map2.on('click', () => {
//   console.log('click');
// });
// curve.on('pm:snapdrag', function (e) {
//   console.log('snapdrag', e);
// });
// curve.on('pm:snap', function (e) {
//   console.log('snap', e);
// });
// curve.on('pm:unsnap', function (e) {
//   console.log('unsnap', e);
// });
// map2.on('layeradd', function (e) {
//   console.log('add', e);
// });
// map2.on('layerremove', function (e) {
//   console.log('remove', e);
// });




// Polygon Example

const polygonLayer = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])
  // .addTo(map3)
  // .addTo(map2);

// polygonLayer.pm.toggleEdit({
//     allowSelfIntersection: false,
//     preventVertexEdit: true,
//     preventMarkerRemoval: false,
// });

map2.on('pm:update', function (e) {
  console.log(e);
});

map2.on('pm:intersect', function (e) {
  console.log(e);
});

// map2.pm.toggleGlobalEditMode({
//     allowSelfIntersection: false,
//     preventMarkerRemoval: false,
//     preventVertexEdit: false,
// });
// map2.pm.disableGlobalEditMode();

// map2.pm.enableDraw('Polygon', { allowSelfIntersection: false });
// map2.pm.disableDraw('Polygon');
// map2.pm.enableDraw('Line', { allowSelfIntersection: false });
// map2.pm.disableDraw('Line');
// map2.pm.enableDraw('Curve', { allowSelfIntersection: true });
// map2.pm.disableDraw('Curve');

map2.on('pm:create', function (e) {
  // e.layer.pm.enable({ allowSelfIntersection: false });
  // e.layer.pm.disable();
  // console.log(e.layer.pm.hasSelfIntersection());

  e.layer.on('pm:markerdragend', function (e) {
    // console.log(e);
  });

  e.layer.on('pm:update', function (e) {
    console.log(e);
  });

  e.layer.on('pm:cut', function (e) {
    console.log(e);
  });
});

map2.on('pm:drawstart', function (e) {
  var layer = e.workingLayer;
  layer.on('pm:vertexadded', function (e) {
    // console.log(e);
    // console.log(e.workingLayer.pm.hasSelfIntersection());
  });
});

polygonLayer.on('pm:vertexadded', function (e) {
  // console.log(e);
});
polygonLayer.on('pm:vertexremoved', function (e) {
  // console.log(e);
});

polygonLayer.on('pm:markerdragstart', function (e) {
  // console.log(e);
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

// const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4);
// layerGroup.pm.toggleEdit({
//   draggable: true,
//   snappable: true,
//   snapDistance: 30,
// });
// const someLayer = L.geoJSON(feature);

// layerGroup.addLayer(someLayer);

// someLayer.addData(feature);

// layerGroup.on('pm:snap', function (e) {
//   console.log('snap');
//   console.log(e);
// });
// layerGroup.on('pm:unsnap', function (e) {
//   console.log('unsnap');
//   console.log(e);
// });

// map4.pm.addControls({
//   position: 'topright',
// });

// map4.pm.enableDraw('Polygon', {
//   finishOn: 'mouseout',
// });
// map4.pm.disableDraw('Polygon');

// map4.pm.enableDraw('Marker', {
//   snappable: false,
// });
// map4.pm.disableDraw('Marker');

// map4.pm.setPathOptions({
//     color: 'orange',
//     fillColor: 'green',
//     fillOpacity: 0.4,
// });

// layerGroup.addLayer(layerGroupItem2);
// layerGroup.addLayer(layerGroupItem3);
// layerGroup.addLayer(layerGroupItem4);
// layerGroup.addLayer(layerGroupItem5);

// layerGroup.on('pm:dragstart', function (e) {
//   console.log(e);
// });
// layerGroup.on('pm:drag', function (e) {
//   console.log(e);
// });
// layerGroup.on('pm:dragend', function (e) {
//   console.log(e);
// });
// layerGroup.on('pm:markerdragstart', function (e) {
//   console.log(e);
// });
// layerGroup.on('pm:markerdragend', function (e) {
//   console.log(e);
// });

// test with markercluster
// var markers = L.markerClusterGroup();
// markers.addLayer(L.marker([51.505, -0.07]));
// markers.addLayer(L.marker([51.505, -0.08]));
// markers.addLayer(L.marker([51.505, -0.09]));
// map4.addLayer(markers);
