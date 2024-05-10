/* eslint-disable no-console */
const tiles1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

const map2 = L.map('example2').setView([51.505, -0.09], 13).addLayer(tiles1);

const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 });
const m2 = L.marker([51.50614, -0.0989]);
const m3 = L.marker([51.50915, -0.096112], { pmIgnore: true });

// eslint-disable-next-line no-unused-vars
const mGroup = L.layerGroup([m1, m2, m3]).addTo(map2);

map2.pm.addControls({
  position: 'topleft',
  drawControls: true,
  editControls: true,
  optionsControls: true,
  customControls: true,
  oneBlock: false,
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
});

theCollection.addTo(map2);

const b = theCollection.getBounds();
map2.fitBounds(b);
