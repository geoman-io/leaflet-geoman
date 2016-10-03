L.PM.Edit.Line = L.PM.Edit.extend({
    initialize(layer) {
        this._layer = layer;
        this._enabled = false;
    },

    toggleEdit(options) {
        if(!this.enabled()) {
            this.enable(options);
        } else {
            this.disable();
        }
    },

    enable(options = {}) {
        this.options = options;

        if(!this.enabled()) {
            // if it was already enabled, disable first
            // we don't block enabling again because new options might be passed
            this.disable();
        }

        // change state
        this._enabled = true;

        // init markers
        this._initMarkers();

        // if polygon gets removed from map, disable edit mode
        this._layer.on('remove', (e) => {
            this.disable(e.target);
        });


        // preventOverlap needs the turf library. If it's not included, deactivate it again
        // if(window.turf === undefined && this.options.preventOverlap) {
        //     console.warn('TurfJS not found, preventOverlap is deactivated');
        //     this.options.preventOverlap = false;
        // }

        if(this.options.draggable) {
            this._initDraggableLayer();
        }

        // if(this.options.preventOverlap) {
        //
        //     // if the dragged polygon should be cutted when overlapping another polygon, go ahead
        //     this._layer.on('pm:drag', this._handleOverlap, this);
        //
        //     // set new coordinates, more details inside the function
        //     this._layer.on('pm:dragend', this._applyPossibleCoordsChanges, this);
        // }
    },

    enabled() {
        return this._enabled;
    },

    disable(poly = this._layer) {
        // if it's not enabled, it doesn't need to be disabled
        if(!this.enabled()) {
            return false;
        }

        // prevent disabling if polygon is being dragged
        if(poly.pm && poly.pm._dragging) {
            return false;
        }
        if (poly.pm) {
            poly.pm._enabled = false;
            poly.pm._markerGroup.clearLayers();
        }

        // clean up draggable
        poly.off('mousedown');
        poly.off('mouseup');

        // remove draggable class
        const el = poly._path;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

        return true;
    },

    _initMarkers() {
        const map = this._layer._map;

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        map.addLayer(this._markerGroup);

        // create marker for each coordinate
        const coords = this._layer._latlngs;

        // the marker array, it includes only the markers that're associated with the coordinates
        this._markers = coords.map(this._createMarker, this);

        // create small markers in the middle of the regular markers
        for(let k = 0; k < coords.length - 1; k += 1) {
            const nextIndex = k + 1;
            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    // creates initial markers for coordinates
    _createMarker(latlng, index) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._index = index;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;
    },

    // creates the middle markes between coordinates
    _createMiddleMarker(leftM, rightM) {
        const latlng = this._calcMiddleLatLng(leftM.getLatLng(), rightM.getLatLng());

        const middleMarker = this._createMarker(latlng);
        const middleIcon = L.divIcon({ className: 'marker-icon marker-icon-middle' });
        middleMarker.setIcon(middleIcon);

        // save reference to this middle markers on the neighboor regular markers
        leftM._middleMarkerNext = middleMarker;
        rightM._middleMarkerPrev = middleMarker;

        middleMarker.on('click', () => {
            // TODO: move the next two lines inside _addMarker() as soon as
            // https://github.com/Leaflet/Leaflet/issues/4484
            // is fixed
            const icon = L.divIcon({ className: 'marker-icon' });
            middleMarker.setIcon(icon);

            this._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('movestart', () => {
            // TODO: This is a workaround. Remove the moveend listener and
            // callback as soon as this is fixed:
            // https://github.com/Leaflet/Leaflet/issues/4484
            middleMarker.on('moveend', () => {
                const icon = L.divIcon({ className: 'marker-icon' });
                middleMarker.setIcon(icon);

                middleMarker.off('moveend');
            });

            this._addMarker(middleMarker, leftM, rightM);
        });
    },

    // adds a new marker from a middlemarker
    _addMarker(newM, leftM, rightM) {
        // first, make this middlemarker a regular marker
        newM.off('movestart');
        newM.off('click');

        // now, create the polygon coordinate point for that marker
        const latlng = newM.getLatLng();
        const coords = this._layer._latlngs;
        const index = leftM._index + 1;

        coords.splice(index, 0, latlng);

        // associate polygon coordinate with marker coordinate
        newM._origLatLng = coords[index];

        // push into marker array & update the indexes for every marker
        this._markers.splice(index, 0, newM);
        this._markers.map((marker, i) => {
            marker._index = i;
            return true;
        });

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);

        // fire edit event
        this._fireEdit();

        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    _removeMarker(e) {
        const marker = e.target;
        const coords = this._layer._latlngs;
        const index = marker._index;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(index === undefined) {
            return;
        }

        // remove polygon coordinate from this marker
        coords.splice(index, 1);

        // if the poly has no coordinates left, remove the layer
        // else, redraw it
        if(coords.length < 1) {
            this._layer.remove();
        } else {
            this._layer.redraw();
        }

        // remove the marker and the middlemarkers next to it from the map
        if(marker._middleMarkerPrev) {
            this._markerGroup.removeLayer(marker._middleMarkerPrev);
        }
        if(marker._middleMarkerNext) {
            this._markerGroup.removeLayer(marker._middleMarkerNext);
        }

        this._markerGroup.removeLayer(marker);

        // find neighbor marker-indexes
        const leftMarkerIndex = index - 1 < 0 ? undefined : index - 1;
        const rightMarkerIndex = index + 1 >= this._markers.length ? undefined : index + 1;

        // don't create middlemarkers if there is only one marker left
        // or if the middlemarker would be between the first and last coordinate of a polyline
        if(rightMarkerIndex && leftMarkerIndex && rightMarkerIndex !== leftMarkerIndex) {
            const leftM = this._markers[leftMarkerIndex];
            const rightM = this._markers[rightMarkerIndex];
            this._createMiddleMarker(leftM, rightM);
        }

        // remove the marker from the markers array & update indexes
        this._markers.splice(index, 1);
        this._markers.map((m, i) => {
            m._index = i;
            return true;
        });

        // if the polygon should be cutted when overlapping another polygon, do it now
        // if(this.options.preventOverlap) {
        //     this._handleOverlap();
        //     this._applyPossibleCoordsChanges();
        // }

        // fire edit event
        this._fireEdit();
    },

    _onMarkerDrag(e) {
        // dragged marker
        const marker = e.target;

        // the dragged markers neighbors
        const nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        const prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

        // update marker coordinates which will update polygon coordinates
        L.extend(marker._origLatLng, marker._latlng);
        this._layer.redraw();

        // update middle markers on the left and right
        // be aware that "next" and "prev" might be interchanged, depending on the geojson array
        const markerLatLng = marker.getLatLng();
        const prevMarkerLatLng = this._markers[prevMarkerIndex].getLatLng();
        const nextMarkerLatLng = this._markers[nextMarkerIndex].getLatLng();

        if(marker._middleMarkerNext) {
            const middleMarkerNextLatLng = this._calcMiddleLatLng(markerLatLng, nextMarkerLatLng);
            marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);
        }

        if(marker._middleMarkerPrev) {
            const middleMarkerPrevLatLng = this._calcMiddleLatLng(markerLatLng, prevMarkerLatLng);
            marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);
        }

        // if the dragged polygon should be cutted when overlapping another polygon, go ahead
        // if(this.options.preventOverlap) {
        //     this._handleOverlap();
        // }
    },

    _onMarkerDragEnd(e) {
        // if(this.options.preventOverlap) {
        //     this._applyPossibleCoordsChanges();
        // }

        this._layer.fire('pm:markerdragend', {
            markerEvent: e,
        });

        // fire edit event
        this._fireEdit();
    },
    _onMarkerDragStart(e) {
        this._layer.fire('pm:markerdragstart', {
            markerEvent: e,
        });
    },

    _fireEdit() {
        // fire edit event
        this._layer.edited = true;
        this._layer.fire('pm:edit');
    },

    _calcMiddleLatLng(latlng1, latlng2) {
        // calculate the middle coordinates between two markers
        // TODO: put this into a utils.js or something

        const map = this._layer._map;
        const p1 = map.project(latlng1);
        const p2 = map.project(latlng2);

        const latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    },
});
