L.PM.Draw.Line = L.PM.Draw.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Line';
        this.toolbarButtonName = 'drawPolyline';
    },
    enable(options) {
        // TODO: Think about if these options could be passed globally for all
        // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
        L.Util.setOptions(this, options);

        // enable draw mode
        this._enabled = true;

        // create a new layergroup
        this._layerGroup = new L.LayerGroup();
        this._layerGroup.addTo(this._map);

        // this is the polyLine that'll make up the polygon
        this._polyline = L.polyline([], this.options.templineStyle);
        this._polyline._pmTempLayer = true;
        this._layerGroup.addLayer(this._polyline);

        // this is the hintline from the mouse cursor to the last marker
        this._hintline = L.polyline([], this.options.hintlineStyle);
        this._hintline._pmTempLayer = true;
        this._layerGroup.addLayer(this._hintline);


        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._createPolygonPoint, this);

        // sync the hintline on mousemove
        this._map.on('mousemove', this._syncHintLine, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);
    },
    disable() {
        // disable draw mode

        // cancel, if drawing mode isn't even enabled
        if(!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._createPolygonPoint, this);
        this._map.off('mousemove', this._syncHintLine, this);

        // remove layer
        this._map.removeLayer(this._layerGroup);

        // fire drawend event
        this._map.fire('pm:drawend', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);
    },
    enabled() {
        return this._enabled;
    },
    toggle(options) {
        if(this.enabled()) {
            this.disable();
        } else {
            this.enable(options);
        }
    },
    _syncHintLine(e) {
        const polyPoints = this._polyline.getLatLngs();

        if(polyPoints.length > 0) {
            const lastPolygonPoint = polyPoints[polyPoints.length - 1];
            this._hintline.setLatLngs([lastPolygonPoint, e.latlng]);
        }
    },
    _createPolygonPoint(e) {
        // is this the first point?
        const first = this._polyline.getLatLngs().length === 0;

        this._polyline.addLatLng(e.latlng);
        this._createMarker(e.latlng, first);


        this._hintline.setLatLngs([e.latlng, e.latlng]);
    },
    _finishShape() {
        // get coordinates, create the leaflet shape and add it to the map
        const coords = this._polyline.getLatLngs();
        const polylineLayer = L.polyline(coords, this.options.pathOptions).addTo(this._map);

        // disable drawing
        this.disable();

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polylineLayer,
        });
    },
    _createMarker(latlng) {
        // create the new marker
        const marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({ className: 'marker-icon' }),
        });
        marker._pmTempLayer = true;

        // add it to the map
        this._layerGroup.addLayer(marker);

        // a click on any marker finishes this shape
        marker.on('click', this._finishShape, this);

        return marker;
    },
});
