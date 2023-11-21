import Edit from './L.PM.Edit';

Edit.Circle = Edit.CircleMarker.extend({
  _shape: 'Circle',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;

    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizableCircle';
    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  },
  enable(options) {
    // TODO: this can be removed after the default options of CircleMarker.enable are removed
    L.PM.Edit.CircleMarker.prototype.enable.call(this, options || {});
  },
  _extendingEnable() {},
  _extendingDisable() {
    this._layer.off('remove', this.disable, this);

    // remove draggable class
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
  },
  _extendingApplyOptions() {},
  _syncMarkers() {},
  _removeMarker() {},
  _onDragStart() {},
  _extedingMarkerDragEnd() {},
  _updateHiddenPolyCircle() {
    const crsSimple = this._map && this._map.pm._isCRSSimple();
    if (this._hiddenPolyCircle) {
      this._hiddenPolyCircle.setLatLngs(
        L.PM.Utils.circleToPolygon(this._layer, 200, !crsSimple).getLatLngs()
      );
    } else {
      this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(
        this._layer,
        200,
        !crsSimple
      );
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer;
    }
  },
  _distanceCalculation(A, B) {
    return this._map.distance(A, B);
  },
  _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  },
  _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  },
  _onVertexClick(e) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }

    this._fireVertexClick(e, undefined);
  },
});
