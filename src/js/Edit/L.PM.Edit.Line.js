import Edit from './L.PM.Edit';

Edit.Line = Edit.extend({
    initialize(layer) {
        this._layer = layer;
        this._enabled = false;
    },

    toggleEdit(options) {
        if (!this.enabled()) {
            this.enable(options);
        } else {
            this.disable();
        }
    },

    enable(options = {}) {
        this.options = options;

        this._map = this._layer._map;

        // cancel when map isn't available, this happens when the polygon is removed before this fires
        if (!this._map) {
            return;
        }

        if (!this.enabled()) {
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

        if (this.options.draggable) {
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
        if (!this.enabled()) {
            return false;
        }

        // prevent disabling if polygon is being dragged
        if (poly.pm._dragging) {
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
        const coords = this._layer._latlngs;

        // cleanup old ones first
        if (this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        this._markerGroup._pmTempLayer = true;
        map.addLayer(this._markerGroup);

        // handle coord-rings (outer, inner, etc)
        const handleRing = (coordsArr) => {
            // the marker array, it includes only the markers of vertexes (no middle markers)
            const ringArr = coordsArr.map(this._createMarker, this);

            // create small markers in the middle of the regular markers
            coordsArr.map((v, k) => {
                let nextIndex;

                if (this.isPolygon()) {
                    nextIndex = (k + 1) % coordsArr.length;
                } else {
                    nextIndex = k + 1;
                }
                return this._createMiddleMarker(ringArr[k], ringArr[nextIndex]);
            });

            return ringArr;
        };

        this._markers = [];

        if (this.isPolygon()) {
            // coords is a multidimansional array, handle all rings
            this._markers = coords.map(handleRing, this);
        } else {
            // coords is one dimensional, handle the ring
            this._markers = handleRing(coords);
        }

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    // creates initial markers for coordinates
    _createMarker(latlng) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

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
        if (!leftM || !rightM) {
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
        // and push into marker array
        // and associate polygon coordinate with marker coordinate
        const latlng = newM.getLatLng();
        const coords = this._layer._latlngs;
        const { ringIndex, index } = this.findMarkerIndex(this._markers, rightM);

        // define the coordsRing that is edited
        const coordsRing = ringIndex > -1 ? coords[ringIndex] : coords;

        // define the markers array that is edited
        const markerArr = ringIndex > -1 ? this._markers[ringIndex] : this._markers;

        // add coordinate to coordinate array
        coordsRing.splice(index, 0, latlng);

        // add marker to marker array
        markerArr.splice(index, 0, newM);

        // set new latlngs to update polygon
        this._layer.setLatLngs(coords);

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);

        // fire edit event
        this._fireEdit();

        this._layer.fire('pm:vertexadded', {
            layer: this._layer,
            marker: newM,
            index,
            ringIndex,
            // TODO: maybe add latlng as well?
        });

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    _removeMarker(e) {
        // the marker that should be removed
        const marker = e.target;

        // coords of the layer
        const coords = this._layer._latlngs;

        // find the coord ring index and index of the marker
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);

        // define the coordsRing that is edited
        const coordsRing = ringIndex > -1 ? coords[ringIndex] : coords;

        // define the markers array that is edited
        const markerArr = ringIndex > -1 ? this._markers[ringIndex] : this._markers;

        // only continue if this is NOT a middle marker (those can't be deleted)
        const isMiddleMarker = this.findMarkerIndex(this._markers, marker).index === -1;
        if (isMiddleMarker) {
            return;
        }

        // remove coordinate
        coordsRing.splice(index, 1);

        // set new latlngs to the polygon
        this._layer.setLatLngs(coords);

        // if the ring of the poly has no coordinates left, remove the ring
        if (coordsRing.length <= 1) {
            // remove coords ring
            coords.splice(ringIndex, 1);

            // set new coords
            this._layer.setLatLngs(coords);

            // re-enable editing so unnecessary markers are removed
            // TODO: kind of an ugly workaround maybe to it better?
            this.disable();
            this.enable(this.options);
        }

        // if no coords are left, remove the layer
        if (coords.length < 1) {
            this._layer.remove();
        }

        // now handle the middle markers
        // remove the marker and the middlemarkers next to it from the map
        if (marker._middleMarkerPrev) {
            this._markerGroup.removeLayer(marker._middleMarkerPrev);
        }
        if (marker._middleMarkerNext) {
            this._markerGroup.removeLayer(marker._middleMarkerNext);
        }

        // remove the marker from the map
        this._markerGroup.removeLayer(marker);

        let rightMarkerIndex;
        let leftMarkerIndex;

        if (this.isPolygon()) {
            // find neighbor marker-indexes
            rightMarkerIndex = (index + 1) % markerArr.length;
            leftMarkerIndex = (index + markerArr.length - 1) % markerArr.length;
        } else {
            // find neighbor marker-indexes
            leftMarkerIndex = index - 1 < 0 ? undefined : index - 1;
            rightMarkerIndex = index + 1 >= markerArr.length ? undefined : index + 1;
        }

        // don't create middlemarkers if there is only one marker left
        if (rightMarkerIndex !== leftMarkerIndex) {
            const leftM = markerArr[leftMarkerIndex];
            const rightM = markerArr[rightMarkerIndex];
            this._createMiddleMarker(leftM, rightM);
        }

        // remove the marker from the markers array
        markerArr.splice(index, 1);

        // fire edit event
        this._fireEdit();

        // fire vertex removal event
        this._layer.fire('pm:vertexremoved', {
            layer: this._layer,
            marker,
            index,
            ringIndex,
            // TODO: maybe add latlng as well?
        });
    },
    findMarkerIndex(markers, marker) {
        // find the index of a marker in the markers array and returns the parent index as well in case of a multidimensional array
        // Multidimensional arrays would mean the layer has multiple coordinate rings (like holes in polygons)
        let index;
        let ringIndex;

        if (!this.isPolygon()) {
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
        const ring = ringIndex > -1 ? coords[ringIndex] : coords;

        ring.splice(index, 1, marker.getLatLng());

        // set new coords on layer
        this._layer.setLatLngs(coords).redraw();
    },

    _onMarkerDrag(e) {
        // dragged marker
        const marker = e.target;

        // only continue if this is NOT a middle marker
        const isMiddleMarker = this.findMarkerIndex(this._markers, marker).index === -1;
        if (isMiddleMarker) {
            return;
        }

        this.updatePolygonCoordsFromMarkerDrag(marker);

        // the dragged markers neighbors
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);
        const markerArr = ringIndex > -1 ? this._markers[ringIndex] : this._markers;

        // find the indizes of next and previous markers
        const nextMarkerIndex = (index + 1) % markerArr.length;
        const prevMarkerIndex = (index + markerArr.length - 1) % markerArr.length;

        // update middle markers on the left and right
        // be aware that "next" and "prev" might be interchanged, depending on the geojson array
        const markerLatLng = marker.getLatLng();

        // get latlng of prev and next marker
        const prevMarkerLatLng = markerArr[prevMarkerIndex].getLatLng();
        const nextMarkerLatLng = markerArr[nextMarkerIndex].getLatLng();

        if (marker._middleMarkerNext) {
            const middleMarkerNextLatLng = this._calcMiddleLatLng(markerLatLng, nextMarkerLatLng);
            marker._middleMarkerNext.setLatLng(middleMarkerNextLatLng);
        }

        if (marker._middleMarkerPrev) {
            const middleMarkerPrevLatLng = this._calcMiddleLatLng(markerLatLng, prevMarkerLatLng);
            marker._middleMarkerPrev.setLatLng(middleMarkerPrevLatLng);
        }
    },

    _onMarkerDragEnd(e) {
        const marker = e.target;
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);

        this._layer.fire('pm:markerdragend', {
            markerEvent: e,
            ringIndex,
            index,
        });

        // fire edit event
        this._fireEdit();
    },
    _onMarkerDragStart(e) {
        const marker = e.target;
        const { ringIndex, index } = this.findMarkerIndex(this._markers, marker);

        this._layer.fire('pm:markerdragstart', {
            markerEvent: e,
            ringIndex,
            index,
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
