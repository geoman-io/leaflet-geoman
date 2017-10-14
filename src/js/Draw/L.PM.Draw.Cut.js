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

        // find all layers that intersect with `layer`, the just drawn cutting layer
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
            .filter((l) => {
                try {
                    return !!intersect(layer.toGeoJSON(), l.toGeoJSON());
                } catch (e) {
                    console.error('You cant cut polygons with self-intersections');
                    return false;
                }
            });

        // the resulting layers after the cut
        const resultingLayers = [];

        // loop through all layers that intersect with the drawn (cutting) layer
        layers.forEach((l) => {
            // find layer difference
            const diff = difference(l.toGeoJSON(), layer.toGeoJSON());

            // if result is a multipolygon, split it into regular polygons
            // TODO: remove as soon as multipolygons are supported
            if (diff.geometry.type === 'MultiPolygon') {
                const geoJSONs = diff.geometry.coordinates.reduce((arr, coords) => {
                    arr.push({ type: 'Polygon', coordinates: coords });
                    return arr;
                }, []);

                // add new layers to map
                geoJSONs.forEach((g) => {
                    const newL = L.geoJSON(g, l.options);
                    resultingLayers.push(newL);
                    newL.addTo(this._map);

                    // give the new layer the original options
                    newL.pm.enable(this.options);
                    newL.pm.disable();
                });
            } else {
                // add new layer to map
                const newL = L.geoJSON(diff, l.options).addTo(this._map);
                resultingLayers.push(newL);
                newL.addTo(this._map);

                // give the new layer the original options
                newL.pm.enable(this.options);
                newL.pm.disable();
            }

            // fire pm:cut on the cutted layer
            l.fire('pm:cut', {
                shape: this._shape,
                layer: l,
                resultingLayers,
            });

            // fire pm:cut on the map for each cutted layer
            this._map.fire('pm:cut', {
                shape: this._shape,
                cuttedLayer: l,
                resultingLayers,
            });

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
