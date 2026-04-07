import Edit, { EditOptions } from './L.PM.Edit';
import EditCircleMarker from './L.PM.Edit.CircleMarker';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    Utils: {
      circleToPolygon: (
        circle: L.Circle,
        sides: number,
        withBearing: boolean
      ) => L.Polygon;
    };
    Edit: {
      CircleMarker: {
        prototype: {
          enable: (options?: object) => void;
        };
      };
    };
  };
  DomUtil: {
    removeClass: (el: HTMLElement, name: string) => void;
  };
};

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    _isCRSSimple: () => boolean;
  };
  distance: (latlng1: L.LatLng, latlng2: L.LatLng) => number;
};

/**
 * Extended circle layer
 */
type ExtendedCircle = L.Circle & {
  _map: ExtendedMap;
  _path?: HTMLElement;
  _renderer?: {
    _container: HTMLElement;
  };
};

/**
 * Extended marker for editing
 */
type ExtendedMarker = L.Marker & {
  _dragging?: boolean;
};

/**
 * Extended polygon for hidden circle
 */
type ExtendedPolygon = L.Polygon & {
  _parentCopy?: ExtendedCircle;
};

/**
 * Circle edit options
 */
interface CircleEditOptions extends EditOptions {
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  resizeableCircle?: boolean;
}

/**
 * Edit Circle interface
 */
interface IEditCircle {
  _shape: string;
  _layer: ExtendedCircle;
  _map: ExtendedMap;
  _enabled: boolean;
  _hiddenPolyCircle?: ExtendedPolygon;
  _minRadiusOption: string;
  _maxRadiusOption: string;
  _editableOption: string;
  options: CircleEditOptions;

  enable(options?: Partial<CircleEditOptions>): void;
  _extendingEnable(): void;
  _extendingDisable(): void;
  _extendingApplyOptions(): void;
  _syncMarkers(): void;
  _removeMarker(): void;
  _onDragStart(): void;
  _extedingMarkerDragEnd(): void;
  _updateHiddenPolyCircle(): void;
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number;
  _getMinDistanceInMeter(): number | null | undefined;
  _getMaxDistanceInMeter(): number | null | undefined;
  _onVertexClick(e: L.LeafletEvent & { target: ExtendedMarker }): void;

  // From parent
  disable(): void;
  _fireVertexClick(e: L.LeafletEvent, indexPath: number[] | undefined): void;
}

const EditCircle = (
  EditCircleMarker as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'Circle',
  initialize(this: IEditCircle, layer: L.Circle) {
    this._layer = layer as ExtendedCircle;
    this._enabled = false;

    this._minRadiusOption = 'minRadiusCircle';
    this._maxRadiusOption = 'maxRadiusCircle';
    this._editableOption = 'resizeableCircle';
    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  },
  enable(this: IEditCircle, options?: Partial<CircleEditOptions>) {
    // TODO: this can be removed after the default options of CircleMarker.enable are removed
    L.PM.Edit.CircleMarker.prototype.enable.call(this, options || {});
  },
  _extendingEnable() {},
  _extendingDisable(this: IEditCircle) {
    this._layer.off('remove', this.disable, this);

    // remove draggable class
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer?._container;
    if (el) {
      L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
    }
  },
  _extendingApplyOptions() {},
  _syncMarkers() {},
  _removeMarker() {},
  _onDragStart() {},
  _extedingMarkerDragEnd() {},
  _updateHiddenPolyCircle(this: IEditCircle) {
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
      ) as ExtendedPolygon;
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer;
    }
  },
  _distanceCalculation(this: IEditCircle, A: L.LatLng, B: L.LatLng) {
    return this._map.distance(A, B);
  },
  _getMinDistanceInMeter(this: IEditCircle) {
    return this.options[this._minRadiusOption as keyof CircleEditOptions] as
      | number
      | null
      | undefined;
  },
  _getMaxDistanceInMeter(this: IEditCircle) {
    return this.options[this._maxRadiusOption as keyof CircleEditOptions] as
      | number
      | null
      | undefined;
  },
  _onVertexClick(
    this: IEditCircle,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }

    this._fireVertexClick(e, undefined);
  },
});

// Assign to Edit class
(Edit as unknown as { Circle: unknown }).Circle = EditCircle;

export default EditCircle;
