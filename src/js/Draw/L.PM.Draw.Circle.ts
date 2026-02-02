import Draw from './L.PM.Draw';
import DrawCircleMarker from './L.PM.Draw.CircleMarker';

// Declare the global L
declare const L: typeof import('leaflet');

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
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
 * Circle draw options
 */
interface CircleDrawOptions {
  templineStyle?: L.CircleMarkerOptions & { radius?: number };
  hintlineStyle?: L.PolylineOptions;
  pathOptions?: L.CircleMarkerOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  resizeableCircle?: boolean;
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  [key: string]: unknown;
}

/**
 * Draw Circle interface
 */
interface IDrawCircle {
  options: CircleDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  toolbarButtonName: string;
  _BaseCircleClass: typeof L.Circle;
  _minRadiusOption: string;
  _maxRadiusOption: string;
  _editableOption: string;
  _defaultRadius: number;

  _extendingEnable(): void;
  _extendingDisable(): void;
  _extendingCreateMarker(): void;
  isRelevantMarker(): boolean;
  _getMinDistanceInMeter(): number;
  _getMaxDistanceInMeter(): number;
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number;
}

const DrawCircle = (
  DrawCircleMarker as unknown as { extend: (props: object) => unknown }
).extend({
  initialize(this: IDrawCircle, map: L.Map) {
    this._map = map as unknown as ExtendedMap;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
    this._BaseCircleClass = L.Circle;
    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    this._defaultRadius = 100;
  },
  _extendingEnable(this: IDrawCircle) {
    // No-op for Circle
  },
  _extendingDisable(this: IDrawCircle) {
    // No-op for Circle
  },
  _extendingCreateMarker(this: IDrawCircle) {
    // No-op for Circle
  },
  isRelevantMarker(this: IDrawCircle) {
    // No-op for Circle, always return false
    return false;
  },
  _getMinDistanceInMeter(this: IDrawCircle): number {
    return this.options[this._minRadiusOption] as number;
  },
  _getMaxDistanceInMeter(this: IDrawCircle): number {
    return this.options[this._maxRadiusOption] as number;
  },
  _distanceCalculation(this: IDrawCircle, A: L.LatLng, B: L.LatLng): number {
    return this._map.distance(A, B);
  },
});

// Assign to Draw class
(Draw as unknown as { Circle: unknown }).Circle = DrawCircle;

export default DrawCircle;
