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
  // TODO: remove default option in next major Release
  enable(options = { draggable: true }) {
    L.Util.setOptions(this, options);

    this._map = this._layer._map;

    // layer is not allowed to edit
    if (!this.options.allowEditing) {
      this.disable();
      return;
    }

    if (this.enabled()) {
      return;
    }
    this.applyOptions();
    this._enabled = true;

    this._fireEnable();
  },
  disable() {
    this._enabled = false;

    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    this._layer.off('contextmenu', this._removeMarker, this);

    if (this.enabled()) {
      if (this._layerEdited) {
        this._fireUpdate();
      }
      this._layerEdited = false;
      this._fireDisable();
    }
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
    this._fireRemove(marker);
    this._fireRemove(this._map, marker);
  },
  _onDragEnd() {
    this._fireEdit();
    this._layerEdited = true;
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers() {
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
  _disableSnapping() {
    const marker = this._layer;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  },
});
