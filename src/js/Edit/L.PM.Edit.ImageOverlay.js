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
  // TODO: remove default option in next major Release
  enable(options = { draggable: true, snappable: true }) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map;
    // cancel when map isn't available, this happens when the polygon is removed before this fires
    if (!this._map) {
      return;
    }

    // layer is not allowed to edit
    if (!this.options.allowEditing) {
      this.disable();
      return;
    }

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    this.enableLayerDrag();

    // if shape gets removed from map, disable edit mode
    this._layer.on('remove', this.disable, this);

    // change state
    this._enabled = true;

    // create markers for four corners of ImageOverlay
    this._otherSnapLayers = this._findCorners();

    this._fireEnable();
  },
  disable() {
    // prevent disabling if layer is being dragged
    if (this._dragging) {
      return;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map;
    }
    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    // remove listener
    this._layer.off('remove', this.disable, this);

    // only fire events if it was enabled before
    if (!this.enabled()) {
      if (this._layerEdited) {
        this._fireUpdate();
      }
      this._layerEdited = false;
      this._fireDisable();
    }

    this._enabled = false;
  },
  _findCorners() {
    const corners = this._layer.getBounds();

    const northwest = corners.getNorthWest();
    const northeast = corners.getNorthEast();
    const southeast = corners.getSouthEast();
    const southwest = corners.getSouthWest();

    return [northwest, northeast, southeast, southwest];
  },
});
