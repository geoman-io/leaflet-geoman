import Edit from './L.PM.Edit';
import Utils from "../L.PM.Utils";
import cloneDeep from "lodash/cloneDeep";

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
    this.setMap();
    // cancel when map isn't available, this happens when the polygon is removed before this fires
    if (!this._map) {
      return;
    }
    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    this.enableLayerDrag();

    // change state
    this._enabled = true;
    this._setRevertLatLng()


    // create markers for four corners of ImageOverlay
    this._otherSnapLayers = this._findCorners();

    Utils._fireEvent(this._layer,'pm:enable', { layer: this._layer, shape: this.getShape() });
  },
  disable(layer = this._layer) {
    // prevent disabling if layer is being dragged
    if (layer.pm._dragging) {
      return false;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this.setMap();
    }
    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    this._removeRevertLatLng();

    // only fire events if it was enabled before
    if (!this.enabled()) {
      if (this._layerEdited) {
        Utils._fireEvent(layer,'pm:update', { layer, shape: this.getShape() });
      }
      this._layerEdited = false;
      Utils._fireEvent(layer,'pm:disable', { layer, shape: this.getShape() });
    }

    this._layer.off('contextmenu', this._removeMarker, this);
    layer.pm._enabled = false;
    return true;
  },
  _fireEdit() {
    // fire edit event
    Utils._fireEvent(this._layer,'pm:edit', { layer: this._layer, shape: this.getShape() });
    Utils._fireEvent(this._map,'pm:edit', { layer: this._layer, shape: this.getShape() });
    this._layerEdited = true;
  },
  // finds the 4 corners of the current bounding box
  // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
  _findCorners() {
    const corners = this._layer.getBounds();

    const northwest = corners.getNorthWest();
    const northeast = corners.getNorthEast();
    const southeast = corners.getSouthEast();
    const southwest = corners.getSouthWest();

    return [northwest, northeast, southeast, southwest];
  },
});
