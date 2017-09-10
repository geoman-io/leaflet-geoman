import Edit from './L.PM.Edit';

Edit.Marker = Edit.extend({
    initialize(layer) {
        // layer is a marker in this case :-)
        this._layer = layer;
        this._enabled = false;

        // register dragend event e.g. to fire pm:edit
        this._layer.on('dragend', this._onDragEnd, this);
    },

    toggleEdit(options) {
        if(!this.enabled()) {
            this.enable(options);
        } else {
            this.disable();
        }
    },

    enable(options = {
        draggable: true,
        snappable: true,
    }) {
        this.options = options;

        this._map = this._layer._map;

        if(this.enabled()) {
            return;
        }
        this._enabled = true;


        // enable removal for the marker
        this._layer.on('contextmenu', this._removeMarker, this);

        // enable dragging and removal for the marker
        if(this.options.draggable) {
            this._layer.dragging.enable();
        }

        // enable snapping
        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    enabled() {
        return this._enabled;
    },

    disable() {
        this._enabled = false;

        // disable dragging and removal for the marker
        this._layer.dragging.disable();
        this._layer.off('contextmenu', this._removeMarker, this);
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

    // overwrite initSnappableMarkers from Snapping.js Mixin
    _initSnappableMarkers() {
        const marker = this._layer;

        this.options.snapDistance = this.options.snapDistance || 30;

        marker.off('drag', this._handleSnapping, this);
        marker.on('drag', this._handleSnapping, this);

        marker.off('dragend', this._cleanupSnapping, this);
        marker.on('dragend', this._cleanupSnapping, this);

        marker.off('pm:dragstart', this._unsnap, this);
        marker.on('pm:dragstart', this._unsnap, this);
    },
});
