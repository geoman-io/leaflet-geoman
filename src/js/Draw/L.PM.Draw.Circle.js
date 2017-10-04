import Draw from './L.PM.Draw';

Draw.Circle = Draw.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Circle';
        this.toolbarButtonName = 'drawCircle';
    },
    enable(options) {
        // TODO: Think about if these options could be passed globally for all
        // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
        L.Util.setOptions(this, options);

        this.options.radius = 0;

        // enable draw mode
        this._enabled = true;

        // create a new layergroup
        this._layerGroup = new L.LayerGroup();
        this._layerGroup._pmTempLayer = true;
        this._layerGroup.addTo(this._map);

        // this is the circle we want to draw
        this._layer = L.circle([0, 0], this.options.templineStyle);
        this._layer._pmTempLayer = true;
        this._layerGroup.addLayer(this._layer);

        // this is the marker in the center of the circle
        this._centerMarker = L.marker([0, 0], {
            icon: L.divIcon({ className: 'marker-icon' }),
            draggable: false,
            zIndexOffset: 100,
        });
        this._centerMarker._pmTempLayer = true;
        this._layerGroup.addLayer(this._centerMarker);

        // this is the hintmarker on the mouse cursor
        this._hintMarker = L.marker([0, 0], {
            icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        });
        this._hintMarker._pmTempLayer = true;
        this._layerGroup.addLayer(this._hintMarker);

        // show the hintmarker if the option is set
        if(this.options.cursorMarker) {
            L.DomUtil.addClass(this._hintMarker._icon, 'visible');
        }

        // this is the hintline from the hint marker to the center marker
        this._hintline = L.polyline([], this.options.hintlineStyle);
        this._hintline._pmTempLayer = true;
        this._layerGroup.addLayer(this._hintline);

        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._placeCenterMarker, this);

        // sync hint marker with mouse cursor
        this._map.on('mousemove', this._syncHintMarker, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape, workingLayer: this._layer });

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

        // an array used in the snapping mixin.
        // TODO: think about moving this somewhere else?
        this._otherSnapLayers = [];
    },
    disable() {
        // disable drawing mode

        // cancel, if drawing mode isn't event enabled
        if(!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._finishShape, this);
        this._map.off('click', this._placeCenterMarker, this);
        this._map.off('mousemove', this._syncHintMarker, this);

        // remove helping layers
        this._map.removeLayer(this._layerGroup);

        // fire drawend event
        this._map.fire('pm:drawend', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

        // cleanup snapping
        if(this.options.snappable) {
            this._cleanupSnapping();
        }
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
    _syncHintLine() {
        const latlng = this._centerMarker.getLatLng();

        // set coords for hintline from marker to last vertex of drawin polyline
        this._hintline.setLatLngs([latlng, this._hintMarker.getLatLng()]);
    },
    _syncCircleRadius() {
        const A = this._centerMarker.getLatLng();
        const B = this._hintMarker.getLatLng();

        const distance = A.distanceTo(B);

        this._layer.setRadius(distance);
    },
    _syncHintMarker(e) {
        // move the cursor marker
        this._hintMarker.setLatLng(e.latlng);

        // if snapping is enabled, do it
        if(this.options.snappable) {
            const fakeDragEvent = e;
            fakeDragEvent.target = this._hintMarker;
            this._handleSnapping(fakeDragEvent);
        }
    },
    _placeCenterMarker(e) {
        // assign the coordinate of the click to the hintMarker, that's necessary for
        // mobile where the marker can't follow a cursor
        if(!this._hintMarker._snapped) {
            this._hintMarker.setLatLng(e.latlng);
        }

        // get coordinate for new vertex by hintMarker (cursor marker)
        const latlng = this._hintMarker.getLatLng();

        this._centerMarker.setLatLng(latlng);

        this._map.off('click', this._placeCenterMarker, this);
        this._map.on('click', this._finishShape, this);

        this._placeCircleCenter();
    },
    _placeCircleCenter() {
        const latlng = this._centerMarker.getLatLng();

        if(latlng) {
            this._layer.setLatLng(latlng);

            // sync the hintline with hint marker
            this._hintMarker.on('move', this._syncHintLine, this);
            this._hintMarker.on('move', this._syncCircleRadius, this);
        }
    },
    _finishShape() {
        // calc the radius
        const center = this._centerMarker.getLatLng();
        const cursor = this._hintMarker.getLatLng();
        const radius = center.distanceTo(cursor);

        // create the final circle layer
        const circleLayer = L.circle(center, { radius }).addTo(this._map);

        // disable drawing
        this.disable();

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: circleLayer,
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

        return marker;
    },
});
