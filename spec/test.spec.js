/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const test = require('tape');
const L = require('leaflet');
require('../dist/leaflet.pm.min.js');


test('is L defined', (t) => {
    t.notEquals(L, undefined, 'leaflet is defined');
    t.notEquals(L.PM, undefined, 'leaflet.pm is defined');
    t.end();
});

test('are initHooks working', (t) => {
    const featureGroup = L.featureGroup();
    t.notEquals(featureGroup.pm, undefined, 'pm instance on featureGroup is defined');

    const marker = L.marker();
    t.notEquals(marker.pm, undefined, 'pm instance on marker is defined');

    const polyLatlngs = [[-111.03, 41], [-111.04, 45], [-104.05, 45], [-104.05, 41]];
    const polygon = L.polygon(polyLatlngs);
    t.notEquals(polygon.pm, undefined, 'pm instance on polygon is defined');

    const lineLatlngs = [
        [-122.68, 45.51],
        [-122.43, 37.77],
        [-118.2, 34.04],
    ];
    const polyline = L.polyline(lineLatlngs);
    t.notEquals(polyline.pm, undefined, 'pm instance on polyline is defined');

    const mapContainer = document.createElement('DIV');
    const map = L.map(mapContainer);
    t.notEquals(map.pm, undefined, 'pm instance on map is defined');

    t.end();
});
