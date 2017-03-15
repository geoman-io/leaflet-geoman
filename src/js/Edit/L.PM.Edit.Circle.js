L.PM.Edit.Circle = L.PM.Edit.extend({
    initialize(layer) {
        this._layer = layer;
        this._enabled = false;
    },
    toggleEdit(options) {
        if(!this.enabled()) {
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

        if(!this.enabled()) {
            // if it was already enabled, disable first
            // we don't block enabling again because new options might be passed
            this.disable();
        }

        // change state
        this._enabled = true;

        // // init markers
        // this._initMarkers();

        // if polygon gets removed from map, disable edit mode
        this._layer.on('remove', (e) => {
            this.disable(e.target);
        });

        // if(this.options.draggable) {
        //     this._initDraggableLayer();
        // }
    },
    disable(layer = this._layer) {
        // if it's not enabled, it doesn't need to be disabled
        if(!this.enabled()) {
            return false;
        }

        // prevent disabling if layer is being dragged
        if(layer.pm._dragging) {
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

        return true;
    },
});
