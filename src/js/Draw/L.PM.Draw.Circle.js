import { Circle } from 'leaflet';
import GeomanDrawCircleMarker from './L.PM.Draw.CircleMarker';

export default class GeomanDrawCircle extends GeomanDrawCircleMarker {
  initialize(map) {
    this._map = map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
    this._BaseCircleClass = Circle;
    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    this._defaultRadius = 100;
  }

  _extendingEnable() {}

  _extendingDisable() {}

  _extendingCreateMarker() {}

  isRelevantMarker() {}

  _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption];
  }

  _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption];
  }

  _distanceCalculation(A, B) {
    return this._map.distance(A, B);
  }
}
