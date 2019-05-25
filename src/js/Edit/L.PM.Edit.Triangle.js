import Edit from './L.PM.Edit';

Edit.Triangle = Edit.Line.extend({
    enable(options) {
        L.Util.setOptions(this, options);

        this._map = this._layer._map;

        if (!this.enabled()) {
            // if it was already enabled, disable first
            // we don't block enabling again because new options might be passed
            this.disable();
        }

        if(this.options.allowShift) {
            //Because "this" not working in the listener
            window.pm = {
                _map:  this._map,
                _shiftpressed: false,
                _defaultBox: this._map.boxZoom.enabled(),
            };
            //Not working in IE, problem?
            document.addEventListener('keydown', this._keyDownFunction);
            document.addEventListener('keyup', this._keyDownFunction);
        }

        // change state
        this._enabled = true;

        // // init markers
        this._initMarkers();

        // if polygon gets removed from map, disable edit mode
        this._layer.on('remove', e => {
            this.disable(e.target);
        });
    },
    _keyDownFunction(e) {
        // this._shiftpressed = e.shiftKey; //not working
        window.pm._shiftpressed = e.shiftKey;

        //Reset to default boxZoom
        if(window.pm._defaultBox) {
            e.shiftKey === true ? window.pm._map.boxZoom.disable() : window.pm._map.boxZoom.enable();
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
        layer.pm._helperLayers.clearLayers();

        // clean up draggable
        layer.off('mousedown');
        layer.off('mouseup');


        document.removeEventListener('keydown', this._keyDownFunction);
        document.removeEventListener('keyup', this._keyDownFunction);
        //Reset to default boxZoom
        if(this.options.allowShift && window.pm._defaultBox) {
            window.pm._defaultBox === true ? window.pm._map.boxZoom.enable() : window.pm._map.boxZoom.disable();
        }

        // remove draggable class
        const el = layer._path ? layer._path : this._layer._renderer._container;
        L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

        if (this._layerEdited) {
            this._layer.fire('pm:update', {});
        }
        this._layerEdited = false;

        return true;
    },
    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if (this._helperLayers) {
            this._helperLayers.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._helperLayers = new L.LayerGroup();
        this._helperLayers._pmTempLayer = true;
        this._helperLayers.addTo(map);

        // create marker for each coordinate
        const center = this._layer.getCenter();
        const outer = this._layer.getTop();

        this._centerMarker = this._createCenterMarker(center);
        this._outerMarker = this._createOuterMarker(outer);
        this._markers = [this._centerMarker, this._outerMarker];
        this._createHintLine(this._centerMarker, this._outerMarker);

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },
    _createHintLine(markerA, markerB) {
        const A = markerA.getLatLng();
        const B = markerB.getLatLng();
        this._hintline = L.polyline([A, B], this.options.hintlineStyle);
        this._hintline._pmTempLayer = true;
        this._helperLayers.addLayer(this._hintline);
    },
    _createCenterMarker(latlng) {
        const marker = this._createMarker(latlng);

        L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');
        // TODO: switch back to move event once this leaflet issue is solved:
        // https://github.com/Leaflet/Leaflet/issues/6492
        marker.on('drag', this._moveCircle, this);
        // marker.on('contextmenu', this._removeMarker, this);

        return marker;
    },
    _createOuterMarker(latlng) {
        const marker = this._createMarker(latlng);

        marker.on('drag', this._resizeTriangle, this);

        return marker;
    },_createMarker(latlng) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._pmTempLayer = true;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('dragend', this._onMarkerDragEnd, this);

        this._helperLayers.addLayer(marker);

        return marker;
    },
    _resizeTriangle() {
        this._syncHintLine();
        this._syncHintTriangle();
    },
    _syncHintLine() {
        const A = this._centerMarker.getLatLng();
        const B = this._outerMarker.getLatLng();

        // set coords for hintline from marker to last vertex of drawin polyline
        this._hintline.setLatLngs([A, B]);
    },
    _syncHintTriangle() {
        const top = this._outerMarker.getLatLng();
        this._layer.setTop(top);

        var p_mouse = this._map.latLngToContainerPoint(top);
        var p_middle = this._map.latLngToContainerPoint(this._centerMarker.getLatLng());
        var x = p_mouse.x - p_middle.x;
        var y = p_mouse.y - p_middle.y;
        var dis = Math.sqrt( x*x + y*y );
        var l = ((dis * 1.5)/Math.sqrt(3))*2;

        var _angle = ((Math.atan2(y, x) * 180 / Math.PI) * (-1) - 90)* (-1);
        var bearing = _angle > 180 ? _angle - 360 : _angle;

        var b_r = bearing + (-150);
        var angle_r = b_r > 180 ? b_r - 360 : b_r;
        var b_l = bearing + 150;
        var angle_l = b_l < -180 ? b_l + 360 : b_l;

        var des_l2 = this._findDestinationPoint(p_mouse,l,angle_l);
        var des_r2 = this._findDestinationPoint(p_mouse,l,angle_r);

        this._lpt2 = this._map.containerPointToLatLng(des_l2);
        this._rpt2 = this._map.containerPointToLatLng(des_r2);


        this._layer.setLatLngs([
            top,
            this._lpt2,
            this._rpt2,
        ]);
    },
    _findDestinationPoint(point, distance, angle) {
        var result = {};

        angle = angle < 0 ? angle + 360 : angle;

        angle = angle - 90;

        result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);
        result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);

        return result;
    },

});
