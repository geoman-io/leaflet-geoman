import Edit from './L.PM.Edit';

Edit.Line = Edit.extend({
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

        this._map = this._layer._map;

        // cancel when map isn't available, this happens when the polygon is removed before this fires
        if(!this._map) {
            return;
        }

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
        this._layer.on('remove', this._onLayerRemove, this);

        if(this.options.draggable) {
            this._initDraggableLayer();
        }
    },

    _onLayerRemove(e) {
        this.disable(e.target);
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
        if(poly.pm._dragging) {
            return false;
        }
        poly.pm._enabled = false;
        poly.pm._markerGroup.clearLayers();

        // clean up draggable
        poly.off('mousedown');
        poly.off('mouseup');

        // remove onRemove listener
        this._layer.off('remove', this._onLayerRemove);

        // remove draggable class
        const el = poly._path;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

        return true;
    },

    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        this._markerGroup._pmTempLayer = true;
        map.addLayer(this._markerGroup);

        console.log('LatLngs', this._layer);

        // handle coord-rings (outer, inner, etc)
        const handleRing = (coords) => {
            // the marker array, it includes only the markers that're associated with the coordinates
            const ringArr = coords.map(this._createMarker, this);

            // create small markers in the middle of the regular markers
            coords.map((v, k) => {
                let prevIndex;

                if(this._layer instanceof L.Polygon) {
                    prevIndex = k - 1 < 0 ? coords.length - 1 : k - 1;
                } else {
                    prevIndex = k - 1;
                }
                return this._createMiddleMarker(ringArr[k], ringArr[prevIndex]);
            });

            return ringArr;
        };

        this._markers = [];

        if(this._layer instanceof L.Polygon) {
            // coords is a multidimansional array, handle all rings
            this._markers = this._layer._latlngs.map(handleRing, this);
        } else {
            // coords is one dimensional, handle the ring
            this._markers = handleRing(this._layer._latlngs);
        }


        // if(this.options.snappable) {
        //     this._initSnappableMarkers();
        // }

        console.log('Markers', this._markers);
    },

    // creates initial markers for coordinates
    _createMarker(latlng, index) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._index = index;
        marker._pmTempLayer = true;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('move', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;
    },

    // creates the middle markes between coordinates
    _createMiddleMarker(leftM, rightM) {
        // cancel if there are no two markers
        if(!leftM || !rightM) {
            return false;
        }

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

        return middleMarker;
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

        // set new latlngs to trigger bounds update
        this._layer.setLatLngs(coords);

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

        // set new latlngs to trigger bounds update
        this._layer.setLatLngs(coords);

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

        // fire edit event
        this._fireEdit();
    },

    findMarkerIndex(markers, marker) {
        let index;
        let ringIndex;

        if(!(this._layer instanceof L.Polygon)) {
            index = markers.findIndex(m => marker._leaflet_id === m._leaflet_id);
        } else {
            ringIndex = markers.findIndex((inner) => {
                index = inner.findIndex(m => marker._leaflet_id === m._leaflet_id);
                return index > -1;
            });
        }

        return {
            index,
            ringIndex,
        };
    },

    updatePolygonCoordsFromMarkerDrag(marker) {
        // update polygon coords
        const coords = this._layer.getLatLngs();
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);

        if(ringIndex > -1) {
            coords[ringIndex].splice(index, 1, marker.getLatLng());
        } else {
            coords.splice(index, 1, marker.getLatLng());
        }

        // set new coords on layer
        this._layer.setLatLngs(coords).redraw();
    },

    _onMarkerDrag(e) {
        // dragged marker
        const marker = e.target;

        // only continue if this is NOT a middle marker
        if(marker._index === undefined) {
            return;
        }

        // update marker coordinates
        L.extend(marker._origLatLng, marker._latlng);

        this.updatePolygonCoordsFromMarkerDrag(marker);


        // the dragged markers neighbors
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);
        let nextMarkerIndex;
        let prevMarkerIndex;
        if(ringIndex > -1) {
            nextMarkerIndex = index + 1 >= this._markers[ringIndex][index].length ? 0 : index + 1;
            prevMarkerIndex = index - 1 < 0 ? this._markers[ringIndex][index].length - 1 : index - 1;
        } else {
            nextMarkerIndex = index + 1 >= this._markers[index].length ? 0 : index + 1;
            prevMarkerIndex = index - 1 < 0 ? this._markers[index].length - 1 : index - 1;
        }

        // update middle markers on the left and right
        // be aware that "next" and "prev" might be interchanged, depending on the geojson array
        const markerLatLng = marker.getLatLng();

        let prevMarkerLatLng;
        let nextMarkerLatLng;

        if(ringIndex > -1) {
            console.log(ringIndex, index, this._markers);
            prevMarkerLatLng = this._markers[ringIndex][prevMarkerIndex].getLatLng();
            nextMarkerLatLng = this._markers[ringIndex][nextMarkerIndex].getLatLng();
        } else {
            prevMarkerLatLng = this._markers[prevMarkerIndex].getLatLng();
            nextMarkerLatLng = this._markers[nextMarkerIndex].getLatLng();
        }

        if(marker._middleMarkerNext) {
            const middleMarkerNextLatLng = this._calcMiddleLatLng(markerLatLng, nextMarkerLatLng);
            marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);
        }

        if(marker._middleMarkerPrev) {
            const middleMarkerPrevLatLng = this._calcMiddleLatLng(markerLatLng, prevMarkerLatLng);
            marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);
        }
    },

    _onMarkerDragEnd(e) {
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

        const map = this._map;
        const p1 = map.project(latlng1);
        const p2 = map.project(latlng2);

        const latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    },
});
