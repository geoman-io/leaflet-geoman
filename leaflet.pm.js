L.PM = L.PM || {};

L.PM.Poly = L.Handler.extend({

    initialize: function(poly) {

        this._poly = poly;

    },

    enable: function() {

        console.log(this);

        // add dragable markers
        this._addMarkers();
    },

    disable: function() {

        this._cancelEdit();

    },

    _addMarkers: function() {

        this._markerGroup = new L.LayerGroup();
        this._poly._map.addLayer(this._markerGroup);

        this._markers = [];

        var coords = this._poly._latlngs[0];

        for(i = 0; i < coords.length; i++) {

            var marker = this._createMarker(coords[i]);
            this._markers.push(marker);

        }



    },

    _createMarker: function(latlng) {
        var marker = new L.Marker(latlng, {
            draggable: true
        });

        marker._origLatLng = latlng;

        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);

        this._markerGroup.addLayer(marker);

        return marker;
    },

    _removeMarkers: function() {

        this._poly._map.removeLayer(this._markerGroup);

    },

    _onMarkerDrag: function(e) {
		var marker = e.target;

		L.extend(marker._origLatLng, marker._latlng);

		this._poly.redraw();
	},

    _onMarkerDragEnd: function(e) {

        var marker = e.target;

    },

    _cancelEdit: function() {

        console.log('cancel edit');

        // TODO reset coordinates

        this._removeMarkers();
        this._poly.redraw();

    }

});

var initHook = function() {

    this.pm = new L.PM.Poly(this);

    this.on('add', function() {

        this.pm.enable();

	});

}

L.Polygon.addInitHook(initHook);
