var map = L.map('example2').setView([40.0269319,32.83604819], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 180,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light'
}).addTo(map);


map.pm.addControls({
    position: 'topleft',
    drawControls: false,
    editControls: true,
    optionsControls: true,
    customControls: true,
    oneBlock: false
});

// Click button -> toggle disabled
map.pm.Toolbar.createCustomControl({name:"alertBox",block: "custom",className: "leaflet-pm-icon-marker",title: "Count layers",onClick: ()=>{alert("There are "+L.PM.Utils.findLayers(map).length+" layers on the map")},toggle: false});


// Copy Geoman Draw Control
const _actions = [{text: "Custom message, with click event",onClick(e){alert('click');}}];
map.pm.Toolbar.copyDrawControl("Rectangle", {name:"RectangleCopy",block: "custom",title: "Display text on hover button",actions: _actions});
map.pm.Draw.RectangleCopy.setPathOptions({color :'green'});

map.pm.Toolbar.changeControlOrder(["RectangleCopy"])


