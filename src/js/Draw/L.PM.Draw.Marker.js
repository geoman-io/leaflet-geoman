import Draw from './L.PM.Draw';

Draw.Marker = Draw.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Marker';
        this.toolbarButtonName = 'drawMarker';
    },
    enable(options) {
        // TODO: Think about if these options could be passed globally for all
        // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
        L.Util.setOptions(this, options);

        // change enabled state
        this._enabled = true;

        // create a marker on click on the map
        this._map.on('click', this._createMarker, this);

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

        // this is the hintmarker on the mouse cursor
        this._hintMarker = L.marker([0, 0], this.options.markerStyle);
        this._hintMarker._pmTempLayer = true;
        this._hintMarker.addTo(this._map);

        // this is just to keep the snappable mixin happy
        this._layer = this._hintMarker;

        // sync hint marker with mouse cursor
        this._map.on('mousemove', this._syncHintMarker, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape, workingLayer: this._layer });

        // enable edit mode for existing markers
        this._map.eachLayer((layer) => {
            if(layer instanceof L.Marker && layer.pm) {
                layer.pm.enable();
            }
        });
    },
    disable() {
        // cancel, if drawing mode isn't even enabled
        if(!this._enabled) {
            return;
        }

        // undbind click event, don't create a marker on click anymore
        this._map.off('click', this._createMarker, this);

        // remove hint marker
        this._hintMarker.remove();

        // remove event listener to sync hint marker
        this._map.off('mousemove', this._syncHintMarker, this);

        // disable dragging and removing for all markers
        this._map.eachLayer((layer) => {
            if(layer instanceof L.Marker && layer.pm && !layer._pmTempLayer) {
                layer.pm.disable();
            }
        });

        // fire drawend event
        this._map.fire('pm:drawend', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

        // change enabled state
        this._enabled = false;
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
    _createMarker(e) {
        if(!e.latlng) {
            return;
        }

        // assign the coordinate of the click to the hintMarker, that's necessary for
        // mobile where the marker can't follow a cursor
        if(!this._hintMarker._snapped) {
            this._hintMarker.setLatLng(e.latlng);
        }

        // get coordinate for new vertex by hintMarker (cursor marker)
        const latlng = this._hintMarker.getLatLng();

        // create marker
        const marker = new L.Marker(latlng, this.options.markerStyle);

        // add marker to the map
        marker.addTo(this._map);

        // enable editing for the marker
        marker.pm.enable();

        // fire the pm:create event and pass shape and marker
        this._map.fire('pm:create', {
            shape: this._shape,
            marker,                     // DEPRECATED
            layer: marker,
        });

        this._cleanupSnapping();
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
});
