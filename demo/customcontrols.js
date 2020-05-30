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
map.pm.Toolbar.createCustomControl({name:"alertBox",tool: "custom",className: "leaflet-pm-icon-marker",title: "Count layers",onClick: ()=>{alert("There are "+L.PM.Utils.findLayers(map).length+" layers on the map")},toggle: false});

// New Instance of Polygon Button
// It's very important that the name of the instance createNewDrawInstance(name, ...) is the same in createCustomControl(name, ...)
var poly = map.pm.Draw.createNewDrawInstance("Polygon2","Polygon");
poly.setPathOptions({color :'red'});
var afterClick = () => {
    poly.toggle();
};
var actions = ['finish', 'removeLastVertex', 'cancel']
actions =  ['cancel', {text: 'Custom text, no click'}, {text: 'Click event', onClick: ()=>{alert('click')}}]
map.pm.Toolbar.createCustomControl({name:"Polygon2",tool: "custom",className:"leaflet-pm-icon-polygon",title: "Display text on hover button",afterClick: afterClick, actions: actions});

//Custom action
var circle = map.pm.Draw.createNewDrawInstance("Circle2","Circle");
circle.setPathOptions({color :'green'});
var afterClick = () => {
    circle.toggle();
};
var act = {
    text: 'Custom action',
    onClick(e){
        alert('click')
    }
};
var actions2 = [act,'cancel'];
map.pm.Toolbar.createCustomControl({name:"Circle2",tool: "custom",className:"leaflet-pm-icon-circle",title: "Display text on hover button",afterClick: afterClick,actions: actions2});


//Add to edit container
var rectangle = map.pm.Draw.createNewDrawInstance("Rectangle2","Rectangle");
var afterClick = () => {
    rectangle.toggle();
};
var container = "edit";
var actions3 = ['cancel'];
map.pm.Toolbar.createCustomControl({name:"Rectangle2",tool: container,className:"leaflet-pm-icon-rectangle",title: "Display text on hover button",afterClick: afterClick,actions: actions3});

rectangle.setPathOptions({color :'orange'});

//Show message
var rectangle3 = map.pm.Draw.createNewDrawInstance("Rectangle3","Rectangle");
var afterClick = () => {
    rectangle3.toggle();
};
var actions4 = [{text: "Custom message, no click event"}];
map.pm.Toolbar.createCustomControl({name:"Rectangle3",tool: "custom",className:"leaflet-pm-icon-rectangle",title: "Display text on hover button",afterClick: afterClick,actions: actions4});

map.pm.Toolbar.changeControlOrder(["Rectangle3"])
rectangle3.setPathOptions({color :'green'});






