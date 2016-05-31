var map2 = L.map('example2').setView([51.505, -0.09], 13);

map2.on('pm:create', function(e) {
    alert('pm:create event fired. See console for details');
    console.log(e);
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

var map3 = L.map('example3').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map3);

var map4 = L.map('example4').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map4);

map2.pm.addControls();
map2.pm.enableDraw('Poly');

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
var geoJsonLayer = L.geoJson().addTo(map3);
geoJsonLayer.addData(geoJsonData);
geoJsonLayer.pm.toggleEdit();
var bounds = geoJsonLayer.getBounds();
map3.fitBounds(bounds);
geoJsonLayer.addEventListener('click', function() {
    geoJsonLayer.pm.toggleEdit();
});

geoJsonLayer.on('pm:edit', function(e) {
    console.log(e);
});


// Polygon Example

var polygonLayer = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map3);
polygonLayer.pm.toggleEdit();


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

var layerGroup = L.layerGroup([layerGroupItem1, layerGroupItem2]).addTo(map4);
layerGroup.pm.toggleEdit();
