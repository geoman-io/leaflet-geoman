import Edit from './L.PM.Edit';

Edit.CircleMarker = Edit.extend({
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
    enabled() {
        return this._enabled;
    },
    enable(options) {
        L.Util.setOptions(this, options);

        this._map = this._layer._map;

        if (!this.enabled()) {
            // if it was already enabled, disable first
            // we don't block enabling again because new options might be passed
            this.disable();
        }

        // change state
        this._enabled = true;

        // // init markers
        this._initMarkers();

        // if polygon gets removed from map, disable edit mode
        this._layer.on('remove', (e) => {
            this.disable(e.target);
        });
    },
    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if (this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        this._markerGroup._pmTempLayer = true;
        map.addLayer(this._markerGroup);

        // create marker for each coordinate
        const center = this._layer.getLatLng();
        this._hintMarker = this._createHintMarker(center);
        this._markers = [this._hintMarker];

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },
    disable(layer = this._layer) {
        // if it's not enabled, it doesn't need to be disabled
        if (!this.enabled()) {
            return false;
        }

        // prevent disabling if layer is being dragged
        if (layer.pm._dragging) {
            return false;
        }
        layer.pm._enabled = false;
        layer.pm._markerGroup.clearLayers();

        // clean up draggable
        layer.off('mousedown');
        layer.off('mouseup');

        // remove draggable class
        const el = layer._path;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

        // layer.addTo(this._map);

        if (this._layerEdited) {
            this._layer.fire('pm:update', {});
        }
        this._layerEdited = false;

        return true;
    },
    _moveMarker(e) {
        const center = e.latlng;
        this._layer.setLatLng(center).redraw();
    },
    _createHintMarker(latlng) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._pmTempLayer = true;
        marker._origLatLng = latlng;

        marker.on('move', this._moveMarker, this);
        marker.on('dragend', this._onMarkerDragEnd, this);

        // marker.on('move', this._moveMarker, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;
    },
    _removeMarker() {
        this._layer.remove();
        this._layer.fire('pm:remove');
    },
    _fireEdit() {
        // fire edit event
        this._layer.fire('pm:edit');
        this._layerEdited = true;
    },
    _onMarkerDragStart(e) {
        this._layer.fire('pm:markerdragstart', {
            markerEvent: e,
        });
    },
    _onMarkerDragEnd(e) {
        this._layer.fire('pm:markerdragend', {
            markerEvent: e,
        });

        this._fireEdit();
    },
});
