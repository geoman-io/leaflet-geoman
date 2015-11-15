L.PM = L.PM || {};

L.PM.Poly = L.Handler.extend({

    initialize: function(poly) {

        this._poly = poly;

    },

    toggleEdit: function() {
        if(!this.enabled()) {
            this.enable();
        } else {
            this.disable();
        }
    },

    enable: function() {

        console.log(this);

        if(!this.enabled()) {

            this._enabled = true;

            if(!this._markerGroup) {

                this._markerGroup = new L.LayerGroup();

                // init dragable markers
                this._initMarkers();
            }

            this._poly._map.addLayer(this._markerGroup);



        }


    },

    enabled: function() {
        return this._enabled;
    },

    disable: function() {

        this._enabled = false;

        this._poly._map.removeLayer(this._markerGroup);

    },

    _initMarkers: function() {

        this._markers = [];

        var coords = this._poly._latlngs[0];

        for(i = 0; i < coords.length; i++) {
            var marker = this._createMarker(coords[i], i);
            this._markers.push(marker);
        }

        for(i = 0; i < coords.length; i++) {

            var nextIndex = i+1 >= coords.length ? 0 : i+1;

            this._createMiddleMarker(
                this._markers[i], this._markers[nextIndex]
            );
        }

    },



    _createMarker: function(latlng, index) {

        var marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({className: 'marker-icon'})
        });

        marker._origLatLng = latlng;
        marker._index = index;

        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);

        this._markerGroup.addLayer(marker);

        return marker;

    },

    _createMiddleMarker: function(leftM, rightM) {

        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        middleMarker.setOpacity(0.7);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;


    },

    _onMarkerDrag: function(e) {

		var marker = e.target;
        var nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        var prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

		L.extend(marker._origLatLng, marker._latlng);
		this._poly.redraw();

        var middleMarkerRightLatLng = this._calcMiddleLatLng(marker, this._markers[nextMarkerIndex]);
        marker._middleMarkerRight.setLatLng(middleMarkerRightLatLng);

        var middleMarkerLeftLatLng = this._calcMiddleLatLng(marker, this._markers[prevMarkerIndex]);
        marker._middleMarkerLeft.setLatLng(middleMarkerLeftLatLng);

	},

    _onMarkerDragEnd: function(e) {

        var marker = e.target;

    },

    _calcMiddleLatLng: function(leftM, rightM) {
        var map = this._poly._map,
		    p1 = map.project(leftM.getLatLng()),
		    p2 = map.project(rightM.getLatLng());

		var latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    }

});

var initHook = function() {

    this.pm = new L.PM.Poly(this);

    this.on('add', function() {



	});



}

L.Polygon.addInitHook(initHook);
L.LayerGroup.addInitHook(function() {

    var layerGroup = this;

    this.pm = {
        toggleEdit: function() {

            var layers = layerGroup.getLayers();

            for( i=0; i<layers.length; i++) {

                layers[i].pm.toggleEdit();

            }

        }
    };

});
