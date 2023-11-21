/* eslint-disable no-console */
const map = L.map('map').setView([39.74739, -105], 13);

map.pm.addControls();
map.pm.setLang('de');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function logEvent(e) {
  console.log(e);
}

map.on('pm:drawstart', (e) => {
  logEvent(e);
  const layer = e.workingLayer;

  layer.on('pm:vertexadded', logEvent);
  layer.on('pm:snapdrag', logEvent);
  layer.on('pm:snap', logEvent);
  layer.on('pm:unsnap', logEvent);
  layer.on('pm:centerplaced', logEvent);
});
map.on('pm:drawend', logEvent);
map.on('pm:create', (e) => {
  logEvent(e);
  const { layer } = e;

  map.pm.disableDraw();

  layer.pm.enable({
    allowSelfIntersection: false,
  });

  // Edit Event
  layer.on('pm:edit', logEvent);
  layer.on('pm:update', logEvent);
  layer.on('pm:enable', logEvent);
  layer.on('pm:disable', logEvent);
  layer.on('pm:vertexadded', logEvent);
  layer.on('pm:vertexremoved', logEvent);
  layer.on('pm:markerdragstart', logEvent);
  layer.on('pm:markerdrag', logEvent);
  layer.on('pm:markerdragend', logEvent);
  layer.on('pm:snap', logEvent);
  layer.on('pm:snapdrag', logEvent);
  layer.on('pm:unsnap', logEvent);
  layer.on('pm:intersect', logEvent);
  layer.on('pm:centerplaced', logEvent);

  // Drag event
  layer.on('pm:dragstart', logEvent);
  layer.on('pm:drag', logEvent);
  layer.on('pm:dragend', logEvent);

  // Cut event
  layer.on('pm:cut', logEvent);

  // Remove event
  layer.on('pm:remove', logEvent);
});

// Toggle mode events
map.on('pm:globaleditmodetoggled', logEvent);
map.on('pm:globaldragmodetoggled', logEvent);
map.on('pm:globalremovalmodetoggled', logEvent);
map.on('pm:globaldrawmodetoggled', logEvent);
map.on('pm:globalcutmodetoggled', logEvent);

// Remove event
map.on('pm:remove', logEvent);
map.on('layerremove', logEvent);

// Cut event
map.on('pm:cut', logEvent);

// Language changed
map.on('pm:langchange', logEvent);

map.pm.setLang('en');
