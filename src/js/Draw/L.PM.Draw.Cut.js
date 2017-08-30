import intersect from '@turf/intersect';
import difference from '@turf/difference';
import Draw from './L.PM.Draw';

Draw.Cut = Draw.Poly.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Cut';
        this.toolbarButtonName = 'cutPolygon';
    },
    _cut(layer) {
        const all = this._map._layers;

        const layers = Object.keys(all)

        // convert object to array
        .map(l => all[l])

        // only layers handled by leaflet.pm
        .filter(l => l.pm)

        // only polygons
        .filter(l => l instanceof L.Polygon)

        // exclude the drawn one
        .filter(l => l !== layer)

        // only layers with intersections
        .filter(l => !!intersect(layer.toGeoJSON(), l.toGeoJSON()));

        // TODO:
        // check if we can alter the current layer instead of replacing it to keep references
        layers.forEach((l) => {
            // find layer difference
            const diff = difference(l.toGeoJSON(), layer.toGeoJSON());

            // if result is a multipolygon, split it into regular polygons
            // TODO: remove as soon as multipolygons are supported
            if(diff.geometry.type === 'MultiPolygon') {
                const geoJSONs = diff.geometry.coordinates.reduce((arr, coords) => {
                    arr.push({ type: 'Polygon', coordinates: coords });
                    return arr;
                }, []);

                // add new layers to map
                geoJSONs.forEach((g) => {
                    L.geoJSON(g, this.options.pathOptions).addTo(this._map);
                });
            } else {
                // add new layer to map
                L.geoJSON(diff, this.options.pathOptions).addTo(this._map);
            }

            // add templayer prop so pm:remove isn't fired
            l._pmTempLayer = true;
            layer._pmTempLayer = true;

            // remove old layer and cutting layer
            l.remove();
            layer.remove();
        });
    },
    _finishShape() {
        const coords = this._layer.getLatLngs();
        const polygonLayer = L.polygon(coords, this.options.pathOptions);
        this._cut(polygonLayer);

        // disable drawing
        this.disable();

        // clean up snapping states
        this._cleanupSnapping();

        // remove the first vertex from "other snapping layers"
        this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
        delete this._tempSnapLayerIndex;
    },
});
