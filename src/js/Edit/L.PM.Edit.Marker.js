import Edit from './L.PM.Edit';

Edit.Marker = Edit.extend({
  _shape: 'Marker',
  initialize(layer) {
    // layer is a marker in this case :-)
    this._layer = layer;
    this._enabled = false;

    // register dragend event e.g. to fire pm:edit
    this._layer.on('dragend', this._onDragEnd, this);
  },

  applyOptions() {
    // console.log('apply options', this.options)

    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }

    if (this.options.draggable) {
      this._layer.dragging.enable();
    }

    // enable removal for the marker
    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }
  },

  toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },

  enable(options = { draggable: true }) {
    L.Util.setOptions(this, options);

    this._map = this._layer._map;

    if (this.enabled()) {
      return;
    }
    this._enabled = true;

    this._layer.fire('pm:enable');

    this.applyOptions();
  },

  enabled() {
    return this._enabled;
  },

  disable() {
    this._enabled = false;

    // disable dragging and removal for the marker
    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    this._layer.off('contextmenu', this._removeMarker, this);

    this._layer.off('dragstart', this._onPinnedMarkerDragStart, this);

    this._layer.fire('pm:disable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }
    this._layerEdited = false;
  },
  _removeMarker(e) {
    const marker = e.target;
    marker.remove();
    // TODO: find out why this is fired manually, shouldn't it be catched by L.PM.Map 'layerremove'?
    marker.fire('pm:remove',{layer: marker});
    this._map.fire('pm:remove', { layer: marker });
  },
  _onDragEnd(e) {
    const marker = e.target;

    // fire the pm:edit event and pass shape and marker
    marker.fire('pm:edit');
    this._layerEdited = true;
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
  _disableSnapping() {
    const marker = this._layer;
    marker.off('drag', this._handleSnapping, this);
    marker.off('dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  }
});
