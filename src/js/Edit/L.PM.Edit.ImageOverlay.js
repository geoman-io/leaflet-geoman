import Edit from './L.PM.Edit';

Edit.ImageOverlay = Edit.extend({
  _shape: 'ImageOverlay',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled() {
    return this._enabled;
  },
  enable(options = { draggable: true, snappable: true }) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map;
    // cancel when map isn't available, this happens when the polygon is removed before this fires
    if (!this._map) {
      return;
    }
    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }
    // change state
    this._enabled = true;

    this.enableLayerDrag();


    // create markers for four corners of ImageOverlay
    this._otherSnapLayers = L.PM.Edit.Rectangle.prototype._findCorners.apply(this);

    this._layer.fire('pm:enable', { layer: this._layer, shape: this.getShape() });
  },
  disable(layer = this._layer) {
    // prevent disabling if layer is being dragged
    if (layer.pm._dragging) {
      return false;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map;
    }
    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    // only fire events if it was enabled before
    if (!this.enabled()) {
      if (this._layerEdited) {
        layer.fire('pm:update', { layer, shape: this.getShape() });
      }
      this._layerEdited = false;
      layer.fire('pm:disable', { layer, shape: this.getShape() });
    }

    this._layer.off('contextmenu', this._removeMarker, this);
    layer.pm._enabled = false;
    return true;
  },
  _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit', { layer: this._layer, shape: this.getShape() });
    this._layerEdited = true;
  },
});
