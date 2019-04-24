import Edit from './L.PM.Edit';

Edit.CircleMarker = Edit.extend({
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
  enable(options) {
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

    // enable removal for the marker
    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }

    // // init markers
    this._createHintMarker();
  },
  disable(layer = this._layer) {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    }

    // prevent disabling if layer is being dragged
    if (layer.pm._dragging) {
      return false;
    }
    layer.pm._enabled = false;

    this._deleteHintMarker();

    // remove draggable class
    if (layer._path) {
      const el = layer._path;
      L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
    }

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }
    this._layerEdited = false;

    return true;
  },
  _moveMarker(e) {
    const center = e.latlng;
    this._layer.setLatLng(center).redraw();
  },
  _createHintMarker() {
    const map = this._map;
    const center = this._layer.getLatLng();

    if (this._hintMarker == null) {
      this._hintMarker = new L.Marker(center, {
        draggable: true,
        icon: L.divIcon({className: 'marker-icon'}),
      });

      this._hintMarker._pmTempLayer = true;
      this._hintMarker._origLatLng = center;

      this._hintMarker.on('move', this._moveMarker, this);
      this._hintMarker.on('dragend', this._onMarkerDragEnd, this);
      this._hintMarker.on('contextmenu', this._removeMarker, this);
    }

    this._hintMarker.addTo(map);
  },
  _deleteHintMarker() {
    // clean up events
    if (this._hintMarker != null) {
      this._hintMarker.off('move', this._moveMarker, this);
      this._hintMarker.off('dragend', this._onMarkerDragEnd, this);
      this._hintMarker.off('contextmenu', this._removeMarker, this);
      this._map.removeLayer(this._hintMarker);
      this._hintMarker = null;
    }
  },
  _removeMarker() {
    this._layer.fire('pm:remove');
    this._layer.remove();

    if (this._hintMarker) {
      this._deleteHintMarker();
    }
  },
  _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit');
    this._layerEdited = true;
  },
  _onMarkerDragStart(e) {
    this._layer.fire('pm:markerdragstart', {
      markerEvent: e,
    });
  },
  _onMarkerDragEnd(e) {
    this._layer.fire('pm:markerdragend', {
      markerEvent: e,
    });

    this._fireEdit();
  },
});
