import Utils from '../GeomanUtils';
import GeomanEditCircleMarker from './Edit.CircleMarker';

export default class GeomanEditCircle extends GeomanEditCircleMarker {
  _shape = 'Circle';

  initialize(layer) {
    this._layer = layer;
    this._enabled = false;

    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  }

  enable(options) {
    // TODO: this can be removed after the default options of CircleMarker.enable are removed
    GeomanEditCircleMarker.prototype.enable.call(this, options || {});
  }

  _extendingEnable() {}

  _extendingDisable() {
    this._layer.off('remove', this.disable, this);

    // remove draggable class
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;
    el.classList.remove('leaflet-geoman-draggable');
  }

  _extendingApplyOptions() {}

  _syncMarkers() {}

  _removeMarker() {}

  _onDragStart() {}

  _onDragEnd() {}

  _updateHiddenPolyCircle() {
    const crsSimple = this._map && this._map.geoman._isCRSSimple();
    if (this._hiddenPolyCircle) {
      this._hiddenPolyCircle.setLatLngs(
        Utils.circleToPolygon(this._layer, 200, !crsSimple).getLatLngs()
      );
    } else {
      this._hiddenPolyCircle = Utils.circleToPolygon(
        this._layer,
        200,
        !crsSimple
      );
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer;
    }
  }

  _distanceCalculation(A, B) {
    return this._map.distance(A, B);
  }

  _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }

  _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }

  _onVertexClick(e) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }

    this._fireVertexClick(e, undefined);
  }
}
