import * as L from 'leaflet';
import { PM } from '../PM';
import type { EditOptions } from './L.PM.Edit';

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
  };
};

/**
 * Extended image overlay layer
 */
type ExtendedImageOverlay = L.ImageOverlay & {
  _map: ExtendedMap;
};

/**
 * Image overlay edit options
 */
interface ImageOverlayEditOptions extends EditOptions {
  draggable?: boolean;
}

import Edit from './L.PM.Edit';
import { defineOptions } from '../helpers/classes';

class EditImageOverlay extends Edit {
  declare _layer: ExtendedImageOverlay;
  declare _map: ExtendedMap;
  declare _enabled: boolean;
  declare _layerEdited?: boolean;
  declare _dragging?: boolean;
  declare _disableAfterDrag?: boolean;
  declare options: ImageOverlayEditOptions;

  constructor(layer: L.ImageOverlay) {
    super(layer);
    this._layer = layer as typeof this._layer;
    this._enabled = false;
  }
  toggleEdit(options?: Partial<ImageOverlayEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  }
  enabled() {
    return this._enabled;
  }
  _editDrags() {
    return true;
  }
  enable(options?: Partial<ImageOverlayEditOptions>) {
    // No argument keeps the layer's current options (#1113).
    if (options) {
      this.setOptions(options);
    }
    this._map = this._layer._map as typeof this._map;
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
    // the corners, not layers, as before the class conversion
    this._otherSnapLayers =
      this._findCorners() as unknown as typeof this._otherSnapLayers;

    this._fireEnable();
  }
  disable() {
    // prevent disabling if layer is being dragged; disable when the drag ends
    if (this._dragging) {
      this._disableAfterDrag = true;
      return;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map as typeof this._map;
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
  }
  _findCorners() {
    const corners = this._layer.getBounds();

    const northwest = corners.getNorthWest();
    const northeast = corners.getNorthEast();
    const southeast = corners.getSouthEast();
    const southwest = corners.getSouthWest();

    return [northwest, northeast, southeast, southwest];
  }
}

defineOptions(EditImageOverlay, {});
EditImageOverlay.prototype._shape = 'ImageOverlay';
Edit.ImageOverlay = EditImageOverlay;

export default EditImageOverlay;
