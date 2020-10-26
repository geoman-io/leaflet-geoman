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
  enable(options = { draggable: true }) {
    L.Util.setOptions(this, options);

    this._map = this._layer._map;

    if (this.enabled()) {
      return;
    }
    this.applyOptions();

    this._enabled = true;

    this._layer.fire('pm:enable', { layer: this._layer, shape: this.getShape() });
  },
  disable() {
    this._enabled = false;

    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    this._layer.off('contextmenu', this._removeMarker, this);

    this._layer.fire('pm:disable', { layer: this._layer, shape: this.getShape() });

    if (this._layerEdited) {
      this._layer.fire('pm:update', { layer: this._layer, shape: this.getShape() });
    }
    this._layerEdited = false;
  },
  enabled() {
    return this._enabled;
  },
  toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }

    if (this.options.draggable) {
      this.enableLayerDrag();
    } else {
      this.disableLayerDrag();
    }
    // enable removal for the marker
    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }
  },
  _removeMarker(e) {
    const marker = e.target;
    marker.remove();
    // TODO: find out why this is fired manually, shouldn't it be catched by L.PM.Map 'layerremove'?
    marker.fire('pm:remove', { layer: marker, shape: this.getShape() });
    this._map.fire('pm:remove', { layer: marker, shape: this.getShape() });
  },
  _onDragEnd(e) {
    const marker = e.target;

    // fire the pm:edit event and pass shape and marker
    marker.fire('pm:edit', { layer: this._layer, shape: this.getShape() });
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
