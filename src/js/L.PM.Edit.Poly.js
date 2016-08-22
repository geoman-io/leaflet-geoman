L.PM.Edit.Poly = L.Class.extend({

    initialize: function(poly) {
        this._poly = poly;
        this._enabled = false;
    },

    toggleEdit: function(options) {
        if(!this.enabled()) {
            this.enable(options);
        } else {
            this.disable();
        }
    },

    enable: function(options) {

        var self = this;

        if(!this.enabled()) {
            // change state
            this._enabled = true;

            // create markers
            if(!this._markerGroup) {
                this._markerGroup = new L.LayerGroup();

                // init dragable markers
                this._initMarkers();
            }

            // add markerGroup to map
            this._poly._map.addLayer(this._markerGroup);

            // if polygon gets removed from map, disable edit mode
            this._poly.on('remove', function() {
                self.disable();
            });

            // apply options
            if(!options) {
                return;
            }

            if(options.draggable) {
                this._initDraggableLayer();
            }
        }

    },

    enabled: function() {
        return this._enabled;
    },

    disable: function() {
        // prevent disabling if polygon is being dragged
        if(this.dragging()) {
            return false;
        }
        this._enabled = false;
        this._poly._map.removeLayer(this._markerGroup);

        // clean up draggable
        this._poly.off('mousedown');
        this._poly.off('mouseup');
    },

    dragging: function() {
        return this._poly._dragging;
    },

    _initDraggableLayer: function() {

        var that = this;

        // temporary coord variable for delta calculation
        this._tempDragCoord;

        this._poly.on('mousedown', function(event) {

            that._tempDragCoord = event.latlng;

            that._poly.on('mousemove', function(e) {

                // set state
                that._poly._dragging = true;

                // disbale map drag
                that._poly._map.dragging.disable();

                var latlng = e.latlng;

                that._onLayerDrag(e);
            });

        });

        this._poly.on('mouseup', function(e) {

            // re-enable map drag
            that._poly._map.dragging.enable();

            // clear up mousemove event
            that._poly.off('mousemove');

            // fire edit
            that._fireEdit();

            // timeout to prevent click event after drag :-/
            // TODO: do it better as soon as leaflet has a way to do it better :-)
            window.setTimeout(function() {
                // set state
                that._poly._dragging = false;
            }, 10)


        });

    },

    _onLayerDrag: function(e) {

        var that = this;

        // latLng of mouse event
        var latlng = e.latlng;

        // delta coords (how far was dragged)
        var deltaLatLng = {
            lat: latlng.lat - that._tempDragCoord.lat,
            lng: latlng.lng - that._tempDragCoord.lng
        };

        for(var i = 0; i < this._markers.length; i++) {

            // a marker reference
            var marker = this._markers[i];

            // current coords
            var currentLatLng = marker.getLatLng();

            // new coords
            var newLatLng = {
                lat: currentLatLng.lat + deltaLatLng.lat,
                lng: currentLatLng.lng + deltaLatLng.lng
            }

            // set latLng of marker
            marker.setLatLng(newLatLng);

            // act like the marker was dragged (this will move the polygon etc)
            this._onMarkerDrag({target: marker});

        }

        // save current latlng for next delta calculation
        this._tempDragCoord = latlng;


    },

    _initMarkers: function() {

        this._markers = [];

        var coords = this._poly._latlngs[0];

        for(var i = 0; i < coords.length; i++) {
            var marker = this._createMarker(coords[i], i);
            this._markers.push(marker);
        }

        for(var k = 0; k < coords.length; k++) {

            var nextIndex = k+1 >= coords.length ? 0 : k+1;

            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

    },

    // creates initial markers for coordinates
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

    // creates the middle markes between coordinates
    _createMiddleMarker: function(leftM, rightM) {
        var self = this;
        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        var icon = L.divIcon({className: 'marker-icon marker-icon-middle'})
        middleMarker.setIcon(icon);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;

        middleMarker.on('click', function() {

            // TODO: move the next two lines inside _addMarker() as soon as
            // https://github.com/Leaflet/Leaflet/issues/4484
            // is fixed
            var icon = L.divIcon({className: 'marker-icon'});
            middleMarker.setIcon(icon);

            self._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('movestart', function() {

            // TODO: This is a workaround. Remove the moveend listener and callback as soon as this is fixed:
            // https://github.com/Leaflet/Leaflet/issues/4484
            middleMarker.on('moveend', function() {
                var icon = L.divIcon({className: 'marker-icon'});
                middleMarker.setIcon(icon);

                middleMarker.off('moveend');
            });

            self._addMarker(middleMarker, leftM, rightM);
        });


    },

    // adds a new marker from a middlemarker
    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        newM.off('movestart');
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
        for(var i=0;i<this._markers.length;i++) {
            this._markers[i]._index = i;
        }

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);

        // fire edit event
        this._fireEdit();


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
            for(var i=0;i<this._markers.length;i++) {
                this._markers[i]._index = i;
            }

            // fire edit event
            this._fireEdit();

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

        this._fireEdit();

    },

    _fireEdit: function () {
        this._poly.edited = true;
        this._poly.fire('pm:edit');
    },

    _calcMiddleLatLng: function(leftM, rightM) {
        var map = this._poly._map,
            p1 = map.project(leftM.getLatLng()),
            p2 = map.project(rightM.getLatLng());

        var latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    }

});
