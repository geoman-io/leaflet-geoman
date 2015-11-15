/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

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
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;

    },

    _createMiddleMarker: function(leftM, rightM) {
        var self = this;
        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        middleMarker.setOpacity(0.7);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;


        middleMarker.on('dragstart', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('click', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });


    },

    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        newM.setOpacity(1);
        newM.off('dragstart');
        newM.off('click');

        // now, create the polygon coordinate point for that marker
        var latlng = newM.getLatLng();
        var coords = this._poly._latlngs[0];
        var index = leftM._index + 1;

        coords.splice(index, 0, latlng);

        // associate polygon coordinate with marker coordinate
        newM._origLatLng = coords[index];

        // push into marker array update the indexes for every marker
        this._markers.splice(index, 0, newM);
        for(i=0;i<this._markers.length;i++) {
            this._markers[i]._index = i;
        }

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);


    },

    _removeMarker: function(e) {
        var marker = e.target;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(marker._index !== undefined) {

            // remove polygon coordinate from this marker
            var coords = this._poly._latlngs[0];
            var index = marker._index;

            coords.splice(index, 1);
            this._poly.redraw();

            // remove the marker and the middlemarkers next to it from the map
            this._markerGroup.removeLayer(marker._middleMarkerLeft);
            this._markerGroup.removeLayer(marker._middleMarkerRight);
            this._markerGroup.removeLayer(marker);


            // create the new middlemarker
            var leftMarkerIndex = index - 1 < 0 ? this._markers.length - 1 : index - 1;
            var rightMarkerIndex = index + 1 >= this._markers.length ? 0 : index + 1;

            var leftM = this._markers[leftMarkerIndex];
            var rightM = this._markers[rightMarkerIndex];
            this._createMiddleMarker(leftM, rightM);


            // remove the marker from the markers array
            this._markers.splice(index, 1);

            // update the remaining markers indexes
            for(i=0;i<this._markers.length;i++) {
                this._markers[i]._index = i;
            }

        }


    },

    _onMarkerDrag: function(e) {
        // dragged marker
		var marker = e.target;

        // the dragged markers neighbors
        var nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        var prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

        // update marker coordinates which will update polygon coordinates
		L.extend(marker._origLatLng, marker._latlng);
		this._poly.redraw();

        // update middle markers on the left and right
        // be aware that "left" and "right" might be interchanged, depending on the geojson array
        // TODO rename "left" and "right" to "prev" and "next"
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
