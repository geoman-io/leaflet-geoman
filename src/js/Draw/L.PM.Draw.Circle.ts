import * as L from 'leaflet';
import { PM } from '../PM';
/**
 * Circle draw options
 */
interface CircleDrawOptions {
  templineStyle: L.CircleMarkerOptions & { radius?: number };
  hintlineStyle: L.PolylineOptions;
  pathOptions?: L.CircleMarkerOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  resizeableCircle?: boolean;
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  minRadiusCircleMarker?: number | null;
  maxRadiusCircleMarker?: number | null;
  [key: string]: unknown;
}

import Draw from './L.PM.Draw';
import DrawCircleMarker from './L.PM.Draw.CircleMarker';
import { defineOptions } from '../helpers/classes';

class DrawCircle extends DrawCircleMarker {
  declare options: CircleDrawOptions;
  declare _shape: string;
  declare toolbarButtonName: string;
  declare _BaseCircleClass: typeof L.Circle;
  declare _minRadiusOption: 'minRadiusCircle' | 'minRadiusCircleMarker';
  declare _maxRadiusOption: 'maxRadiusCircle' | 'maxRadiusCircleMarker';
  declare _editableOption: 'resizeableCircle' | 'resizeableCircleMarker';
  declare _defaultRadius: number;

  constructor(map: L.Map) {
    super(map);
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
    this._BaseCircleClass = L.Circle;
    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    this._defaultRadius = 100;
  }
  _extendingEnable() {}
  _extendingDisable() {}
  _extendingCreateMarker() {}
  isRelevantMarker(_layer: object): _layer is L.CircleMarker {
    return false;
  }
  _getMinDistanceInMeter(): number {
    return this.options[this._minRadiusOption]!;
  }
  _getMaxDistanceInMeter(): number {
    return this.options[this._maxRadiusOption]!;
  }
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number {
    return this._map.distance(A, B);
  }
}

defineOptions(DrawCircle, {});
Draw.Circle = DrawCircle;

export { DrawCircle };
export default DrawCircle;
