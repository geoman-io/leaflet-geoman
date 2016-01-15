L.PM.Draw.Poly = L.Class.extend({

    initialize: function(map) {
        this._map = map;
    },

    enable: function() {

        this._map._container.style.cursor = 'crosshair';

        this._map.on('click', this._createPolygonPoint, this);
    },
    disable: function() {

        this._map._container.style.cursor = 'default';

        this._map.off('click', this._createPolygonPoint);
    },
    _createPolygonPoint: function(e) {
        console.log(e.latlng);
        this._createMarker(e.latlng);
    },
    _createMarker: function(latlng, index) {

        var marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({className: 'marker-icon'})
        });

        return marker;

    },
});
