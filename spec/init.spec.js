/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const test = require('tape');
const L = require('leaflet');

test('INITIALIZATION', (t) => {
    t.plan(2);
    t.notEqual(L, undefined, 'leaflet is defined');
    t.notEqual(L.PM, undefined, 'leaflet.pm is defined');
});

test('INIT HOOKS', (t) => {
    t.plan(7);
    const featureGroup = L.featureGroup();
    t.notEqual(featureGroup.pm, undefined, 'pm instance on featureGroup is defined');

    const marker = L.marker();
    t.notEqual(marker.pm, undefined, 'pm instance on marker is defined');

    const circle = L.circle();
    t.notEqual(circle.pm, undefined, 'pm instance on circle is defined');

    const ignoredLayer = L.marker([], { pmIgnore: true });
    t.equal(ignoredLayer.pm, undefined, 'ignored layer doesnt have pm instance');

    const polyLatlngs = [[-111.03, 41], [-111.04, 45], [-104.05, 45], [-104.05, 41]];
    const polygon = L.polygon(polyLatlngs);
    t.notEqual(polygon.pm, undefined, 'pm instance on polygon is defined');

    const lineLatlngs = [
        [-122.68, 45.51],
        [-122.43, 37.77],
        [-118.2, 34.04],
    ];
    const polyline = L.polyline(lineLatlngs);
    t.notEqual(polyline.pm, undefined, 'pm instance on polyline is defined');

    const mapContainer = document.createElement('DIV');
    const map = L.map(mapContainer);
    t.notEqual(map.pm, undefined, 'pm instance on map is defined');
});
