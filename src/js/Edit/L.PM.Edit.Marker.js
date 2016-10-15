L.PM.Edit.Marker = L.PM.Edit.extend({
    initialize(layer) {
        // layer is a marker in this case :-)
        this._marker = layer;
        this._enabled = false;

        // register dragend event e.g. to fire pm:edit
        this._marker.on('dragend', this._onDragEnd, this);
    },

    toggleEdit(options) {
        if(!this.enabled()) {
            this.enable(options);
        } else {
            this.disable();
        }
    },

    enable() {
        if(this.enabled()) {
            return;
        }
        this._enabled = true;

        // enable dragging and removal for the marker
        this._marker.dragging.enable();
        this._marker.on('contextmenu', this._removeMarker, this);
    },

    enabled() {
        return this._enabled;
    },

    disable() {
        this._enabled = false;

        // disable dragging and removal for the marker
        this._marker.dragging.disable();
        this._marker.off('contextmenu', this._removeMarker, this);
    },
    _removeMarker(e) {
        const marker = e.target;
        marker.remove();
        marker.fire('pm:remove');
    },
    _onDragEnd(e) {
        const marker = e.target;

        // fire the pm:edit event and pass shape and marker
        marker.fire('pm:edit');
    },
});
