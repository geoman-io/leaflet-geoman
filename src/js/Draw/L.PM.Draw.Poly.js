L.PM.Draw.Poly = L.PM.Draw.Line.extend({

    initialize(map) {
        this._map = map;
        this._shape = 'Poly';
        this.toolbarButtonName = 'drawPolygon';
    },
    _createMarker(latlng, first) {
        const marker = L.PM.Draw.Line.prototype._createMarker.call(this, latlng);

        if(first) {
            marker.on('click', this._finishPolygon, this);
        }
    },
});

// MyClass.prototype.greet.call(this, 'bro ' + name + '!');
