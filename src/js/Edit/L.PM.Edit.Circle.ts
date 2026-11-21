import * as L from 'leaflet';
import { PM } from '../PM';
import type { EditOptions } from './L.PM.Edit';

/**
 * Extended map with PM
 */
type ExtendedMap = EditCircleMarker['_map'] & {
  pm: {
    _isCRSSimple: () => boolean;
  };
  distance: (latlng1: L.LatLng, latlng2: L.LatLng) => number;
};

/**
 * Extended circle layer
 */
type ExtendedCircle = EditCircleMarker['_layer'] &
  L.Circle & {
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
 * Circle edit options
 */
interface CircleEditOptions extends EditOptions {
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  resizeableCircle?: boolean;
}

import Edit from './L.PM.Edit';
import EditCircleMarker from './L.PM.Edit.CircleMarker';
import { defineOptions } from '../helpers/classes';

class EditCircle extends EditCircleMarker {
  declare _layer: ExtendedCircle;
  declare _map: ExtendedMap;
  declare _enabled: boolean;
  declare _minRadiusOption: 'minRadiusCircle' | 'minRadiusCircleMarker';
  declare _maxRadiusOption: 'maxRadiusCircle' | 'maxRadiusCircleMarker';
  declare _editableOption: 'resizeableCircle' | 'resizeableCircleMarker';
  declare options: CircleEditOptions;

  enable(options?: Partial<CircleEditOptions>) {
    super.enable(options);
  }
  _extendingEnable() {}
  _extendingDisable() {
    this._layer.off('remove', this.disable, this);

    // remove draggable class
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;
    el.classList.remove('leaflet-pm-draggable');
  }
  _extendingApplyOptions() {}
  _syncMarkers() {}
  _removeMarker() {}
  _onDragStart() {}
  _extedingMarkerDragEnd() {}
  _updateHiddenPolyCircle() {
    const crsSimple = this._map && this._map.pm._isCRSSimple();
    if (this._hiddenPolyCircle) {
      this._hiddenPolyCircle.setLatLngs(
        PM.Utils.circleToPolygon(this._layer, 200, !crsSimple).getLatLngs()
      );
    } else {
      this._hiddenPolyCircle = PM.Utils.circleToPolygon(
        this._layer,
        200,
        !crsSimple
      );
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer;
    }
  }
  _distanceCalculation(A: L.LatLng, B: L.LatLng) {
    return this._map.distance(A, B);
  }
  _getMinDistanceInMeter() {
    return this.options[this._minRadiusOption]!;
  }
  _getMaxDistanceInMeter() {
    return this.options[this._maxRadiusOption]!;
  }
  _onVertexClick(e: L.LeafletEvent & { target: ExtendedMarker }) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }

    this._fireVertexClick(e, undefined);
  }
}

defineOptions(EditCircle, {});
EditCircle.prototype._shape = 'Circle';
EditCircle.prototype._minRadiusOption = 'minRadiusCircle';
EditCircle.prototype._maxRadiusOption = 'maxRadiusCircle';
EditCircle.prototype._editableOption = 'resizeableCircle';
Edit.Circle = EditCircle;

export { EditCircle };
export default EditCircle;
