import Edit from './L.PM.Edit';

Edit.Poly = Edit.Line.extend({

    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        map.addLayer(this._markerGroup);

        // create marker for each coordinate
        const coords = this._layer._latlngs[0];

        // the marker array, it includes only the markers that're associated with the coordinates
        this._markers = coords.map(this._createMarker, this);

        // create small markers in the middle of the regular markers
        for(let k = 0; k < coords.length; k += 1) {
            const nextIndex = k + 1 >= coords.length ? 0 : k + 1;
            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    // adds a new marker from a middlemarker
    _addMarker(newM, leftM, rightM) {
        // first, make this middlemarker a regular marker
        newM.off('movestart');
        newM.off('click');

        // now, create the polygon coordinate point for that marker
        const latlng = newM.getLatLng();
        const coords = this._layer._latlngs[0];
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
        const coords = this._layer._latlngs[0];
        const index = marker._index;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(index === undefined) {
            return;
        }

        // don't remove a marker if a polygon has only 3 coordinates.
        if(coords.length <= 3) {
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
        this._markerGroup.removeLayer(marker._middleMarkerPrev);
        this._markerGroup.removeLayer(marker._middleMarkerNext);
        this._markerGroup.removeLayer(marker);

        // find neighbor marker-indexes
        const leftMarkerIndex = index - 1 < 0 ? this._markers.length - 1 : index - 1;
        const rightMarkerIndex = index + 1 >= this._markers.length ? 0 : index + 1;

        // don't create middlemarkers if there is only one marker left
        if(rightMarkerIndex !== leftMarkerIndex) {
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
});
