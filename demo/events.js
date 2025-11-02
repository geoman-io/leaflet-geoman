import { TileLayer, LeafletMap } from 'leaflet';
import Geoman from 'leaflet-geoman';

Geoman.initialize();

const map = new LeafletMap('map').setView([39.74739, -105], 13);

map.geoman.addControls();
map.geoman.setLang('de');

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function logEvent(e) {
  console.log(e);
}

map.on('geoman:drawstart', (e) => {
  logEvent(e);
  const layer = e.workingLayer;

  layer.on('geoman:vertexadded', logEvent);
  layer.on('geoman:snapdrag', logEvent);
  layer.on('geoman:snap', logEvent);
  layer.on('geoman:unsnap', logEvent);
  layer.on('geoman:centerplaced', logEvent);
});
map.on('geoman:drawend', logEvent);
map.on('geoman:create', (e) => {
  logEvent(e);
  const { layer } = e;

  map.geoman.disableDraw();

  layer.geoman.enable({
    allowSelfIntersection: false,
  });

  // Edit Event
  layer.on('geoman:edit', logEvent);
  layer.on('geoman:update', logEvent);
  layer.on('geoman:enable', logEvent);
  layer.on('geoman:disable', logEvent);
  layer.on('geoman:vertexadded', logEvent);
  layer.on('geoman:vertexremoved', logEvent);
  layer.on('geoman:vertexdragstart', logEvent);
  layer.on('geoman:vertexdrag', logEvent);
  layer.on('geoman:vertexdragend', logEvent);
  layer.on('geoman:snap', logEvent);
  layer.on('geoman:snapdrag', logEvent);
  layer.on('geoman:unsnap', logEvent);
  layer.on('geoman:intersect', logEvent);
  layer.on('geoman:centerplaced', logEvent);

  // Drag event
  layer.on('geoman:dragstart', logEvent);
  layer.on('geoman:drag', logEvent);
  layer.on('geoman:dragend', logEvent);

  // Cut event
  layer.on('geoman:cut', logEvent);

  // Remove event
  layer.on('geoman:remove', logEvent);
});

// Toggle mode events
map.on('geoman:globaleditmodetoggled', logEvent);
map.on('geoman:globaldragmodetoggled', logEvent);
map.on('geoman:globalremovalmodetoggled', logEvent);
map.on('geoman:globaldrawmodetoggled', logEvent);
map.on('geoman:globalcutmodetoggled', logEvent);

// Remove event
map.on('geoman:remove', logEvent);
map.on('layerremove', logEvent);

// Cut event
map.on('geoman:cut', logEvent);

// Language changed
map.on('geoman:langchange', logEvent);

map.geoman.setLang('en');
