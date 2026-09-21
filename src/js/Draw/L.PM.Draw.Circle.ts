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

/**
 * Draw Circle interface
 */
export interface IDrawCircle {
  options: CircleDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  toolbarButtonName: string;
  _BaseCircleClass: typeof L.Circle;
  _minRadiusOption: 'minRadiusCircle' | 'minRadiusCircleMarker';
  _maxRadiusOption: 'maxRadiusCircle' | 'maxRadiusCircleMarker';
  _editableOption: 'resizeableCircle' | 'resizeableCircleMarker';
  _defaultRadius: number;

  _extendingEnable(): void;
  _extendingDisable(): void;
  _extendingCreateMarker(): void;
  isRelevantMarker(): void;
  _getMinDistanceInMeter(): number;
  _getMaxDistanceInMeter(): number;
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number;
}
import Draw from './L.PM.Draw';

Draw.Circle = Draw.CircleMarker.extend<IDrawCircle, [L.Map]>({
  initialize(this: IDrawCircle, map: L.Map) {
    this._map = map as typeof this._map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
    this._BaseCircleClass = L.Circle;
    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    this._defaultRadius = 100;
  },
  _extendingEnable(this: IDrawCircle) {},
  _extendingDisable(this: IDrawCircle) {},
  _extendingCreateMarker(this: IDrawCircle) {},
  isRelevantMarker(this: IDrawCircle) {},
  _getMinDistanceInMeter(this: IDrawCircle): number {
    return this.options[this._minRadiusOption]!;
  },
  _getMaxDistanceInMeter(this: IDrawCircle): number {
    return this.options[this._maxRadiusOption]!;
  },
  _distanceCalculation(this: IDrawCircle, A: L.LatLng, B: L.LatLng): number {
    return this._map.distance(A, B);
  },
});
