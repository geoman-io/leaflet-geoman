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

        // enable draw mode
        this._enabled = true;

        this._map.on('click', (e) => {
            const latlng = e.latlng;
            this._createMarker(latlng);
        }, this);

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);
    },
    disable() {
        // cancel, if drawing mode isn't even enabled
        if(!this._enabled) {
            return;
        }

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
    _createMarker(latlng) {
        const marker = new L.Marker(latlng, {
            draggable: true,
        });

        marker.on('contextmenu', this._removeMarker, this);

        marker.addTo(this._map);
    },
    _removeMarker(e) {
        const marker = e.target;
        marker.remove();
    },
});
