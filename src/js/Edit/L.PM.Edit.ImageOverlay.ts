import Edit, { EditOptions } from './L.PM.Edit';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    setOptions: <T extends { options: object }>(
      obj: T,
      options: object
    ) => void;
  };
};

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

/**
 * Edit ImageOverlay interface
 */
interface IEditImageOverlay {
  _shape: string;
  _layer: ExtendedImageOverlay;
  _map: ExtendedMap;
  _enabled: boolean;
  _layerEdited?: boolean;
  _dragging?: boolean;
  _otherSnapLayers?: L.LatLng[];
  options: ImageOverlayEditOptions;

  toggleEdit(options?: Partial<ImageOverlayEditOptions>): void;
  enabled(): boolean;
  enable(options?: Partial<ImageOverlayEditOptions>): void;
  disable(): void;
  _findCorners(): L.LatLng[];

  // From parent / mixins
  enableLayerDrag(): void;
  disableLayerDrag(): void;
  _fireEnable(): void;
  _fireDisable(): void;
  _fireUpdate(): void;
}

const EditImageOverlay = (
  Edit as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'ImageOverlay',
  initialize(this: IEditImageOverlay, layer: L.ImageOverlay) {
    this._layer = layer as ExtendedImageOverlay;
    this._enabled = false;
  },
  toggleEdit(this: IEditImageOverlay, options?: Partial<ImageOverlayEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled(this: IEditImageOverlay) {
    return this._enabled;
  },
  // TODO: remove default option in next major Release
  enable(
    this: IEditImageOverlay,
    options: Partial<ImageOverlayEditOptions> = { draggable: true, snappable: true }
  ) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map as unknown as ExtendedMap;
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
  disable(this: IEditImageOverlay) {
    // prevent disabling if layer is being dragged
    if (this._dragging) {
      return;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map as unknown as ExtendedMap;
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
  _findCorners(this: IEditImageOverlay) {
    const corners = this._layer.getBounds();

    const northwest = corners.getNorthWest();
    const northeast = corners.getNorthEast();
    const southeast = corners.getSouthEast();
    const southwest = corners.getSouthWest();

    return [northwest, northeast, southeast, southwest];
  },
});

// Assign to Edit class
(Edit as unknown as { ImageOverlay: unknown }).ImageOverlay = EditImageOverlay;

export default EditImageOverlay;
