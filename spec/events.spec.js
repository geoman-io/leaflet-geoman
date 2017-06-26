/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const test = require('tape');
const L = require('leaflet');
require('../dist/leaflet.pm.min.js');


test('EVENTS', (t) => {
    t.plan(1);
    const mapContainer = document.createElement('DIV');
    document.body.appendChild(mapContainer);
    const map = L.map(mapContainer);

    const polyLatlngs = [[-111.03, 41], [-111.04, 45], [-104.05, 45], [-104.05, 41]];
    const polygon = L.polygon(polyLatlngs).addTo(map);

    polygon.on('remove', (e) => {
        t.equal(e.layer, polygon, 'layerremove event fired');
    });

    map.on('layerremove', (e) => {
        t.equal(e.layer, polygon, 'layerremove event fired');
    });

    map.removeLayer(polygon);
    polygon.remove();

    // map.fire('layerremove', { layer: polygon });
});
