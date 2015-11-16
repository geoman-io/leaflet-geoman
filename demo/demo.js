var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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
}

var geoJsonLayer = L.geoJson(geoJsonData).addTo(map);
var featureGroupLayer = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

map.fitBounds(geoJsonLayer.getBounds());

var editButton = document.getElementById('toggleEdit');
editButton.addEventListener('click', function() {
    geoJsonLayer.pm.toggleEdit();
    featureGroupLayer.pm.toggleEdit();
});

geoJsonLayer.on('edit', function() {
    console.log('layergroup edited');
});

var coordButton = document.getElementById('getCoords');
coordButton.addEventListener('click', function() {
    console.log(geoJsonLayer.toGeoJSON());
});
