/* eslint-disable no-console */
/* eslint-disable no-alert */
const map = L.map('map').setView([40.0269319, 32.83604819], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

window.L = L;
window.map = map;

map.pm.addControls({
  position: 'topleft',
  drawControls: true,
  editControls: true,
  optionsControls: true,
  customControls: true,
  oneBlock: false,
});

// Click button -> toggle disabled
map.pm.Toolbar.createCustomControl({
  name: 'alertBox',
  block: 'custom',
  className: 'leaflet-pm-icon-marker xyz-class',
  title: 'Count layers',
  onClick: () => {
    alert(`There are ${L.PM.Utils.findLayers(map).length} layers on the map`);
  },
  toggle: false,
});

// Copy Geoman Draw Control
const _actions = [
  {
    text: 'Custom message, with click event',
    onClick() {
      alert('click');
    },
    name: 'actionName',
  },
];
// map.pm.enableDraw('ArrowLine', { dialogContent: `<h3>Hello World</h3>` });
map.pm.Toolbar.copyDrawControl('Rectangle', {
  name: 'RectangleCopy',
  block: 'custom',
  title: 'Display text on hover button',
  actions: _actions,
});
map.pm.Draw.RectangleCopy.setPathOptions({ color: 'green' });

map.pm.Toolbar.changeControlOrder(['RectangleCopy']);

map.on('pm:actionclick', (e) => {
  console.log(e);
});
map.on('pm:buttonclick', (e) => {
  console.log(e);
});
map.on('pm:arrowheaddrawchange', (e) => {
  console.log('draw change', e);
});
