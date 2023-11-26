import Draw from './L.PM.Draw';

Draw.Circle = Draw.CircleMarker.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
    this._BaseCircleClass = L.Circle;
    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizableCircle';
    this._defaultRadius = 100;
  },
  _extendingEnable() {},
  _extendingDisable() {},
  _extendingCreateMarker() {},
  isRelevantMarker() {},
  _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  },
  _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  },
  _distanceCalculation(A, B) {
    return this._map.distance(A, B);
  },
});
