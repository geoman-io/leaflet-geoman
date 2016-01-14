var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.PM.initialize(map);


var t;
var highlight = function(el) {

    window.clearTimeout(t);

    el.classList.add('highlight');

    t = window.setTimeout(function () {
        el.classList.remove('highlight');
    }, 70);
};


// GEOSJON EXAMPLE

var geoJsonData = {
    "type": "FeatureCollection",
    "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -0.15483856201171872,
              51.527329038465936
            ],
            [
              -0.16977310180664062,
              51.51643437722083
            ],
            [
              -0.15964508056640625,
              51.50094238217541
            ],
            [
              -0.13149261474609375,
              51.5042549065934
            ],
            [
              -0.11758804321289061,
              51.518463972439385
            ],
            [
              -0.13303756713867188,
              51.53106680201548
            ],
            [
              -0.15483856201171872,
              51.527329038465936
            ]
          ]
        ]
      }
    }
    ]
};
var geoJsonButton = document.getElementById('test-geojson');
var geoJsonLayer = L.geoJson(geoJsonData).addTo(map);
geoJsonLayer.on('edit', function() {
    highlight(geoJsonButton);
});
geoJsonButton.addEventListener('click', function() {

    var bounds = geoJsonLayer.getBounds();
    map.fitBounds(bounds);

    geoJsonLayer.pm.toggleEdit();

});


// Polygon Example

var polygonLayer = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

var polygonButton = document.getElementById('test-polygon');
polygonButton.addEventListener('click', function() {

    var bounds = polygonLayer.getBounds();
    map.fitBounds(bounds);

    polygonLayer.pm.toggleEdit();

});
polygonLayer.on('edit', function() {
    highlight(polygonButton);
});


// Layer Group Example

var layerGroupItem1 = L.polygon([
    [51.51, -0.09],
    [51.513, -0.08],
    [51.514, -0.11]
]);
var layerGroupItem2 = L.polygon([
    [51.52, -0.06],
    [51.51, -0.07],
    [51.52, -0.05]
]);

var layerGroup = L.layerGroup([layerGroupItem1, layerGroupItem2]).addTo(map);
var layerGroupButton = document.getElementById('test-layergroup');
layerGroupButton.addEventListener('click', function() {

    var bounds = [];
    var layers = layerGroup.getLayers();

    for(var i=0; i<layers.length; i++) {
        bounds.push(layers[i].getBounds());
    }
    map.fitBounds(bounds);

    layerGroup.pm.toggleEdit();

});
layerGroup.on('edit', function() {
    highlight(layerGroupButton);
});
