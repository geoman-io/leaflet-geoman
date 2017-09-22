import Edit from './L.PM.Edit';

Edit.Circle = Edit.extend({
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
    enable(options = {}) {
        this.options = options;

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
        layer.pm._layerGroup.clearLayers();

        // clean up draggable
        layer.off('mousedown');
        layer.off('mouseup');

        // remove draggable class
        const el = layer._path;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

        return true;
    },
    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if (this._layerGroup) {
            this._layerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._layerGroup = new L.LayerGroup();
        map.addLayer(this._layerGroup);

        // create marker for each coordinate
        const center = this._layer.getLatLng();
        const radius = this._layer._radius;

        const outer = this._getLatLngOnCircle(center, radius);

        this._centerMarker = this._createCenterMarker(center);
        this._outerMarker = this._createOuterMarker(outer);
        this._markers = [this._centerMarker, this._outerMarker];
        this._createHintLine(this._centerMarker, this._outerMarker);

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },
    _getLatLngOnCircle(center, radius) {
        const pointA = this._map.project(center);
        const pointB = L.point(pointA.x + radius, pointA.y);

        return this._map.unproject(pointB);
    },
    _resizeCircle() {
        this._syncHintLine();
        this._syncCircleRadius();
        this._fireEdit();
    },
    _moveCircle(e) {
        const center = e.latlng;
        this._layer.setLatLng(center);

        const radius = this._layer._radius;

        const outer = this._getLatLngOnCircle(center, radius);
        this._outerMarker.setLatLng(outer);
        this._syncHintLine();
        this._fireEdit();
    },
    _syncCircleRadius() {
        const A = this._centerMarker.getLatLng();
        const B = this._outerMarker.getLatLng();

        const distance = A.distanceTo(B);

        this._layer.setRadius(distance);
    },
    _syncHintLine() {
        const A = this._centerMarker.getLatLng();
        const B = this._outerMarker.getLatLng();

        // set coords for hintline from marker to last vertex of drawin polyline
        this._hintline.setLatLngs([A, B]);
    },
    _createHintLine(markerA, markerB) {
        const A = markerA.getLatLng();
        const B = markerB.getLatLng();
        this._hintline = L.polyline([A, B], this.options.hintlineStyle);
        this._hintline._pmTempLayer = true;
        this._layerGroup.addLayer(this._hintline);
    },
    _createCenterMarker(latlng) {
        const marker = this._createMarker(latlng);

        // marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('move', this._moveCircle, this);
        // marker.on('dragend', this._onMarkerDragEnd, this);
        // marker.on('contextmenu', this._removeMarker, this);

        return marker;
    },
    _createOuterMarker(latlng) {
        const marker = this._createMarker(latlng);

        // marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('move', this._resizeCircle, this);
        // marker.on('dragend', this._onMarkerDragEnd, this);
        // marker.on('contextmenu', this._removeMarker, this);

        return marker;
    },
    _createMarker(latlng) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._pmTempLayer = true;

        this._layerGroup.addLayer(marker);

        return marker;
    },
    _fireEdit() {
        // fire edit event
        this._layer.fire('pm:edit');
    },
});
