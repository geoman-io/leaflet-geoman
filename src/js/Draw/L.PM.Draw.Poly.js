L.PM.Draw.Poly = L.PM.Draw.Line.extend({

    initialize(map) {
        this._map = map;
        this._shape = 'Poly';
        this.toolbarButtonName = 'drawPolygon';
    },
    _finishShape() {
        const coords = this._polyline.getLatLngs();
        const polygonLayer = L.polygon(coords).addTo(this._map);

        this.disable();

        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polygonLayer,
        });
    },
    _createMarker(latlng, first) {
        const marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        this._layerGroup.addLayer(marker);

        if(first) {
            marker.on('click', this._finishShape, this);
        }
    },
});

// MyClass.prototype.greet.call(this, 'bro ' + name + '!');
