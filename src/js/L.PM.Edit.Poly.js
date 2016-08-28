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

    enable: function(options = {}) {

        this.options = options;

        if(!this.enabled()) {
            // change state
            this._enabled = true;

            // init markers
            this._initMarkers();

            // if polygon gets removed from map, disable edit mode
            this._poly.on('remove', (e) => {
                this.disable(e.target);
            });

            console.log(this._poly);

            // preventOverlap needs the turf library. If it's not included, deactivate it again
            if(window.turf === undefined && this.options.preventOverlap) {
                console.warn('TurfJS not found, preventOverlap is deactivated');
                this.options.preventOverlap = false;
            }

            if(this.options.draggable) {
                this._initDraggableLayer();
            }
        }

    },

    enabled: function() {
        return this._enabled;
    },

    disable: function(poly = this._poly) {

        // prevent disabling if polygon is being dragged
        if(poly.pm._dragging) {
            return false;
        }
        poly.pm._enabled = false;
        poly.pm._markerGroup.clearLayers();

        // clean up draggable
        poly.off('mousedown');
        poly.off('mouseup');

        // remove draggable class
        var el = poly._path;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
    },

    dragging: function() {
        return this._dragging;
    },

    _initDraggableLayer: function() {

        // temporary coord variable for delta calculation
        this._tempDragCoord;

        // add CSS class
        var el = this._poly._path;
        L.DomUtil.addClass(el, 'leaflet-pm-draggable');


        var onMouseUp = (e) => {

            // re-enable map drag
            this._poly._map.dragging.enable();

            // clear up mousemove event
            this._poly._map.off('mousemove');

            // clear up mouseup event
            this._poly.off('mouseup');

            // show markers again
            this._initMarkers();

            // set new coordinates, more details inside the function
            this._applyPossibleCoordsChanges();

            // timeout to prevent click event after drag :-/
            // TODO: do it better as soon as leaflet has a way to do it better :-)
            window.setTimeout(() => {
                // set state
                this._dragging = false;
                L.DomUtil.removeClass(el, 'leaflet-pm-dragging');

                // fire pm:dragend event
                this._poly.fire('pm:dragend');

                // fire edit
                this._fireEdit();
            }, 10);

        }


        var onMouseMove = (e) => {

            if(!this._dragging) {

                // set state
                this._dragging = true;
                L.DomUtil.addClass(el, 'leaflet-pm-dragging');

                // bring it to front to prevent drag interception
                this._poly.bringToFront();

                // disbale map drag
                this._poly._map.dragging.disable();

                // hide markers
                this._markerGroup.clearLayers();

                // fire pm:dragstart event
                this._poly.fire('pm:dragstart');


            }

            this._onLayerDrag(e);

        }

        this._poly.on('mousedown', (e) => {

            // save for delta calculation
            this._tempDragCoord = e.latlng;

            this._poly.on('mouseup', onMouseUp);

            // listen to mousemove on map (instead of polygon),
            // otherwise fast mouse movements stop the drag
            this._poly._map.on('mousemove', onMouseMove);

        });



    },

    _onLayerDrag: function(e) {

        // latLng of mouse event
        let latlng = e.latlng;

        // delta coords (how far was dragged)
        let deltaLatLng = {
            lat: latlng.lat - this._tempDragCoord.lat,
            lng: latlng.lng - this._tempDragCoord.lng
        };

        // create the new coordinates array
        let coords = this._poly._latlngs[0];
        let newLatLngs = coords.map((currentLatLng) => {
            return {
                lat: currentLatLng.lat + deltaLatLng.lat,
                lng: currentLatLng.lng + deltaLatLng.lng
            }
        });

        // set new coordinates and redraw
        this._poly.setLatLngs(newLatLngs).redraw();

        // save current latlng for next delta calculation
        this._tempDragCoord = latlng;

        // if the dragged polygon should be cutted when overlapping another polygon, go ahead
        if(this.options.preventOverlap) {
            this._handleOverlap();
        }

        // fire pm:dragstart event
        this._poly.fire('pm:drag');

    },

    _initMarkers: function() {
        let map = this._poly._map;

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        map.addLayer(this._markerGroup);

        // create marker for each coordinate
        let coords = this._poly._latlngs[0];

        // the marker array, it includes only the markers that're associated with the coordinates
        this._markers = coords.map(this._createMarker, this);

        // create small markers in the middle of the regular markers
        for(var k = 0; k < coords.length; k++) {

            var nextIndex = k+1 >= coords.length ? 0 : k+1;
            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

    },

    // creates initial markers for coordinates
    _createMarker: function(latlng, index) {

        let marker = new L.Marker(latlng, {
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

        let latlng = this._calcMiddleLatLng(leftM.getLatLng(), rightM.getLatLng());

        let middleMarker = this._createMarker(latlng);
        let icon = L.divIcon({className: 'marker-icon marker-icon-middle'})
        middleMarker.setIcon(icon);

        // save reference to this middle markers on the neighboor regular markers
        leftM._middleMarkerNext = middleMarker;
        rightM._middleMarkerPrev = middleMarker;

        middleMarker.on('click', () => {

            // TODO: move the next two lines inside _addMarker() as soon as
            // https://github.com/Leaflet/Leaflet/issues/4484
            // is fixed
            var icon = L.divIcon({className: 'marker-icon'});
            middleMarker.setIcon(icon);

            this._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('movestart', () => {

            // TODO: This is a workaround. Remove the moveend listener and callback as soon as this is fixed:
            // https://github.com/Leaflet/Leaflet/issues/4484
            middleMarker.on('moveend', function() {
                var icon = L.divIcon({className: 'marker-icon'});
                middleMarker.setIcon(icon);

                middleMarker.off('moveend');
            });

            this._addMarker(middleMarker, leftM, rightM);
        });


    },

    // adds a new marker from a middlemarker
    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        newM.off('movestart');
        newM.off('click');

        // now, create the polygon coordinate point for that marker
        let latlng = newM.getLatLng();
        let coords = this._poly._latlngs[0];
        let index = leftM._index + 1;

        coords.splice(index, 0, latlng);

        // associate polygon coordinate with marker coordinate
        newM._origLatLng = coords[index];

        // push into marker array & update the indexes for every marker
        this._markers.splice(index, 0, newM);
        this._markers.map((marker, i) => marker._index = i);

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);

        // fire edit event
        this._fireEdit();


    },

    _removeMarker: function(e) {
        let marker = e.target;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(marker._index === undefined) {
            return;
        }

        // remove polygon coordinate from this marker
        let coords = this._poly._latlngs[0];
        let index = marker._index;

        coords.splice(index, 1);
        this._poly.redraw();

        // remove the marker and the middlemarkers next to it from the map
        this._markerGroup.removeLayer(marker._middleMarkerPrev);
        this._markerGroup.removeLayer(marker._middleMarkerNext);
        this._markerGroup.removeLayer(marker);


        // create the new middlemarker
        let leftMarkerIndex = index - 1 < 0 ? this._markers.length - 1 : index - 1;
        let rightMarkerIndex = index + 1 >= this._markers.length ? 0 : index + 1;

        let leftM = this._markers[leftMarkerIndex];
        let rightM = this._markers[rightMarkerIndex];
        this._createMiddleMarker(leftM, rightM);


        // remove the marker from the markers array & update indexes
        this._markers.splice(index, 1);
        this._markers.map((marker, i) => marker._index = i);

        // if the polygon should be cutted when overlapping another polygon, do it now
        if(this.options.preventOverlap) {
            this._handleOverlap();
            this._applyPossibleCoordsChanges();
        }

        // fire edit event
        this._fireEdit();


    },

    _applyPossibleCoordsChanges: function() {

        // after the polygon was dragged and changed it's shape because of unallowed intersecting
        // with another polygon, this function takes the temporarily drawn polygon (during drag) and applies
        // it's coordinates to our main polygon

        if(this._tempPolygon) {

            // get the new coordinates
            var latlngs = this._tempPolygon.getLayers()[0].getLatLngs();

            // reshape our main polygon
            this._poly.setLatLngs(latlngs).redraw();

            // initialize the markers again
            this._initMarkers();
        }

    },

    _drawTemporaryPolygon: function(geoJson) {

        // hide our polygon
        this._poly.setStyle({opacity: 0, fillOpacity: 0});

        // draw a temporary polygon (happens during drag)
        this._tempPolygon = L.geoJson(geoJson).addTo(this._poly._map).bringToBack();

    },
    _handleOverlap: function() {

        let mainPoly = this._poly;
        let layers = this._layerGroup.getLayers();
        let changed = false;
        let resultingGeoJson = this._poly.toGeoJSON();

        layers.filter(layer => !Object.is(layer, mainPoly)).map((layer) => {

            let intersect;

            // this needs to be in a try catch block because turf isn't reliable
            // it throws self-intersection errors even if there are none
            try {
                intersect = turf.intersect(resultingGeoJson, layer.toGeoJSON());
            } catch(e) {
                console.warn('Turf Error.');
            }

            if(intersect) {
                resultingGeoJson = turf.difference(resultingGeoJson, layer.toGeoJSON());

                // if the resulting polygon is a MultiPolygon, don't handle it.
                if(resultingGeoJson.geometry.type !== 'MultiPolygon') {
                    changed = true;
                }
            }

        });

        if(this._tempPolygon) {
            this._tempPolygon.remove();
            delete this._tempPolygon;
        }

        if(changed) {
            this._drawTemporaryPolygon(resultingGeoJson);
        } else {
            this._poly.setStyle({opacity: 1, fillOpacity: 0.2});
        }



    },

    _onMarkerDrag: function(e) {

        // dragged marker
        let marker = e.target;

        // the dragged markers neighbors
        let nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        let prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

        // update marker coordinates which will update polygon coordinates
        L.extend(marker._origLatLng, marker._latlng);
        this._poly.redraw();

        // update middle markers on the left and right
        // be aware that "next" and "prev" might be interchanged, depending on the geojson array
        let markerLatLng = marker.getLatLng();
        let prevMarkerLatLng = this._markers[prevMarkerIndex].getLatLng();
        let nextMarkerLatLng = this._markers[nextMarkerIndex].getLatLng();

        let middleMarkerNextLatLng = this._calcMiddleLatLng(markerLatLng, nextMarkerLatLng);
        marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);

        let middleMarkerPrevLatLng = this._calcMiddleLatLng(markerLatLng, prevMarkerLatLng);
        marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);


        // if the dragged polygon should be cutted when overlapping another polygon, go ahead
        if(this.options.preventOverlap) {
            this._handleOverlap();
        }

    },

    _onMarkerDragEnd: function(e) {

        this._applyPossibleCoordsChanges();

        // fire edit event
        this._fireEdit();

    },

    _fireEdit: function () {
        // fire edit event
        this._poly.edited = true;
        this._poly.fire('pm:edit');
    },

    _calcMiddleLatLng: function(latlng1, latlng2) {
        // calculate the middle coordinates between two markers
        // TODO: put this into a utils.js or something

        var map = this._poly._map,
            p1 = map.project(latlng1),
            p2 = map.project(latlng2);

        var latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    }

});
