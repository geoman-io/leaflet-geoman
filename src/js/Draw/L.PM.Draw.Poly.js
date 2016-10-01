L.PM.Draw.Poly = L.PM.Draw.Line.extend({

    initialize(map) {
        this._map = map;
        this._shape = 'Poly';
        this.toolbarButtonName = 'drawPolygon';
    },
    _finishShape() {
        // get coordinates, create the leaflet shape and add it to the map
        const coords = this._polyline.getLatLngs();
        const polygonLayer = L.polygon(coords).addTo(this._map);

        // disable drawing
        this.disable();

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polygonLayer,
        });
    },
    _createMarker(latlng, first) {
        // create the new marker
        const marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        // add it to the map
        this._layerGroup.addLayer(marker);

        // if the first marker gets clicked again, finish this shape
        if(first) {
            marker.on('click', this._finishShape, this);
        }
    },
});
