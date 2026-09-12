/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Draw: {
      Marker: {
        _layerIsDragging: boolean;
      };
    };
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * Extended marker layer
 */
type ExtendedMarker = L.Marker & {
  _map: L.Map;
};

/**
 * Marker edit options
 */
interface MarkerEditOptions {
  allowEditing?: boolean;
  snappable?: boolean;
  snapDistance?: number;
  snapSegment?: boolean;
  draggable?: boolean;
  preventMarkerRemoval?: boolean;
  [key: string]: unknown;
}

/**
 * Edit Marker interface
 */
export interface IEditMarker {
  _shape: string;
  _layer: ExtendedMarker;
  _map: ExtendedMap;
  _enabled: boolean;
  _layerEdited?: boolean;
  options: MarkerEditOptions;

  enable(options?: Partial<MarkerEditOptions>): void;
  disable(): void;
  enabled(): boolean;
  toggleEdit(options?: Partial<MarkerEditOptions>): void;
  applyOptions(): void;
  _removeMarker(e: L.LeafletMouseEvent): void;
  _onDragStart(): void;
  _onMarkerDragEnd(): void;
  _onDragEnd(): void;
  _initSnappableMarkers(): void;
  _disableSnapping(): void;

  // From mixins
  _fireEnable(): void;
  _fireDisable(): void;
  _fireUpdate(): void;
  _fireEdit(): void;
  _fireRemove(target: L.Layer | ExtendedMap, layer?: L.Layer): void;
  enableLayerDrag(): void;
  disableLayerDrag(): void;
  _handleSnapping(e: L.LeafletEvent): void;
  _cleanupSnapping(): void;
  _unsnap(e: L.LeafletEvent): void;
}
import Edit from './L.PM.Edit';

Edit.Marker = Edit.extend<IEditMarker, [L.Marker]>({
  _shape: 'Marker',
  initialize(this: IEditMarker, layer: L.Marker) {
    // layer is a marker in this case :-)
    this._layer = layer as typeof this._layer;
    this._enabled = false;

    // register dragend event e.g. to fire pm:edit
    this._layer.on('dragend', this._onDragEnd, this);
  },
  // TODO: remove default option in next major Release
  enable(
    this: IEditMarker,
    options: Partial<MarkerEditOptions> = { draggable: true }
  ) {
    L.Util.setOptions(this, options);

    // layer is not allowed to edit
    if (!this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }

    this._map = this._layer._map as typeof this._map;

    if (this.enabled()) {
      this.disable();
    }
    this.applyOptions();

    // if shape gets removed from map, disable edit mode
    this._layer.on('remove', this.disable, this);

    this._enabled = true;

    this._layer.on('pm:dragstart', this._onDragStart, this);
    this._layer.on('pm:dragend', this._onMarkerDragEnd, this);

    this._fireEnable();
  },
  disable(this: IEditMarker) {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return;
    }

    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    // remove listener
    this._layer.off('remove', this.disable, this);
    this._layer.off('contextmenu', this._removeMarker, this);

    if (this._layerEdited) {
      this._fireUpdate();
    }
    this._layerEdited = false;
    this._fireDisable();

    this._enabled = false;
  },
  enabled(this: IEditMarker) {
    return this._enabled;
  },
  toggleEdit(this: IEditMarker, options?: Partial<MarkerEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  applyOptions(this: IEditMarker) {
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
  _removeMarker(this: IEditMarker, e: L.LeafletMouseEvent) {
    const marker = e.target;
    marker.remove();
    // TODO: find out why this is fired manually, shouldn't it be catched by L.PM.Map 'layerremove'?
    this._fireRemove(marker);
    this._fireRemove(this._map, marker);
  },
  _onDragStart(this: IEditMarker) {
    this._map.pm.Draw.Marker._layerIsDragging = true;
  },
  _onMarkerDragEnd(this: IEditMarker) {
    this._map.pm.Draw.Marker._layerIsDragging = false;
  },
  _onDragEnd(this: IEditMarker) {
    this._fireEdit();
    this._layerEdited = true;
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers(this: IEditMarker) {
    const marker = this._layer;

    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.on('pm:drag', this._handleSnapping, this);

    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.on('pm:dragend', this._cleanupSnapping, this);

    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  },
  _disableSnapping(this: IEditMarker) {
    const marker = this._layer;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  },
});
