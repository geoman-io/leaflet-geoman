import { TileLayer, LeafletMap } from 'leaflet';
import Geoman from 'leaflet-geoman';

Geoman.initialize();

const map = new LeafletMap('map').setView([40.0269319, 32.83604819], 13);

new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.geoman.addControls({
  position: 'topleft',
  drawControls: false,
  editControls: true,
  optionsControls: true,
  customControls: true,
  oneBlock: false,
});

// Click button -> toggle disabled
map.geoman.Toolbar.createCustomControl({
  name: 'alertBox',
  block: 'custom',
  className: 'leaflet-geoman-icon-marker xyz-class',
  title: 'Count layers',
  onClick: () => {
    alert(`There are ${Geoman.Utils.findLayers(map).length} layers on the map`);
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
map.geoman.Toolbar.copyDrawControl('Rectangle', {
  name: 'RectangleCopy',
  block: 'custom',
  title: 'Display text on hover button',
  actions: _actions,
});
map.geoman.Draw.RectangleCopy.setPathOptions({ color: 'green' });

map.geoman.Toolbar.changeControlOrder(['RectangleCopy']);

map.on('geoman:actionclick', (e) => {
  console.log(e);
});
map.on('geoman:buttonclick', (e) => {
  console.log(e);
});
