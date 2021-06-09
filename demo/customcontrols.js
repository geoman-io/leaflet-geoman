var map = L.map('map').setView([40.0269319, 32.83604819], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.pm.addControls({
  position: 'topleft',
  drawControls: false,
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
    alert(
      'There are ' + L.PM.Utils.findLayers(map).length + ' layers on the map'
    );
  },
  toggle: false,
});

// Copy Geoman Draw Control
const _actions = [
  {
    text: 'Custom message, with click event',
    onClick(e) {
      alert('click');
    },
    name: 'actionName',
  },
];
map.pm.Toolbar.copyDrawControl('Rectangle', {
  name: 'RectangleCopy',
  block: 'custom',
  title: 'Display text on hover button',
  actions: _actions,
});
map.pm.Draw.RectangleCopy.setPathOptions({ color: 'green' });

map.pm.Toolbar.changeControlOrder(['RectangleCopy']);

map.on('pm:actionclick', function (e) {
  console.log(e);
});
map.on('pm:buttonclick', function (e) {
  console.log(e);
});
