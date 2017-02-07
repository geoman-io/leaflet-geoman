L.PM.Draw.Marker = L.PM.Draw.extend({
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
        this._hintMarker = L.marker([0, 0]);
        this._hintMarker._pmTempLayer = true;
        this._hintMarker.addTo(this._map);

        // sync hint marker with mouse cursor
        this._map.on('mousemove', this._syncHintMarker, this);

        // enable edit mode for existing markers
        this._map.eachLayer((layer) => {
            if(layer instanceof L.Marker) {
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
            if(layer instanceof L.Marker && !layer._pmTempLayer) {
                layer.pm.disable();
            }
        });

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
        // save coords of click
        const latlng = e.latlng;

        if(!latlng) {
            return;
        }

        // create marker
        const marker = new L.Marker(latlng, {
            draggable: true,
        });

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
