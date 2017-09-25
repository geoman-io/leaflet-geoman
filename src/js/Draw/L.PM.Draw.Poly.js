import Draw from './L.PM.Draw';

Draw.Poly = Draw.Line.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Poly';
        this.toolbarButtonName = 'drawPolygon';
    },
    _finishShape() {
        // get coordinates, create the leaflet shape and add it to the map
        const coords = this._layer.getLatLngs();
        const polygonLayer = L.polygon(coords, this.options.pathOptions).addTo(this._map);

        // disable drawing
        this.disable();

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polygonLayer,
        });

        // clean up snapping states
        this._cleanupSnapping();

        // remove the first vertex from "other snapping layers"
        this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
        delete this._tempSnapLayerIndex;
    },
    _createMarker(latlng, first) {
        // create the new marker
        const marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        // mark this marker as temporary
        marker._pmTempLayer = true;

        // add it to the map
        this._layerGroup.addLayer(marker);

        // if the first marker gets clicked again, finish this shape
        if (first) {
            marker.on('click', this._finishShape, this);

            // add the first vertex to "other snapping layers" so the polygon is easier to finish
            this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;

            if (this.options.snappable) {
                this._cleanupSnapping();
            }
        }

        return marker;
    },
});
