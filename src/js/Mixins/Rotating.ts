import type { LatLngTree } from '../helpers/ModeHelper';
import type { Matrix } from '../helpers/Matrix';

/**
 * Extended layer with PM properties for rotation - using type intersection to avoid protected property issues
 */
type RotatableLayer = L.Polyline<GeoJSON.Geometry> & {
  _map: L.Map;
  _pmTempLayer?: boolean;
  pm: RotationLayerPM;
  getLatLngs: () => L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  setLatLngs: (latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]) => void;
  getCenter?: () => L.LatLng;
  addTo: (map: L.Map) => RotatableLayer;
  removeFrom: (map: L.Map) => RotatableLayer;
};

/**
 * Rotation layer PM interface
 */
interface RotationLayerPM {
  _rotateOrgLatLng?: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  _layerRotated?: boolean;
  _setAngle: (angle: number) => void;
  _fireEdit: (layer: L.Layer, source: string) => void;
  _fireChange: (
    coords: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
    source: string
  ) => void;
  setRotationCenter: (center: L.LatLng) => void;
  setOptions: (options: object) => void;
  enable: () => void;
  disable: () => void;
  enabled: () => boolean;
  _initMarkers: () => void;
  _rotationLayer: RotatableLayer;
  getAngle: () => number;
}

/**
 * Extended map with PM
 */
interface PMMap {
  getGlobalOptions: () => object;
}

/**
 * Extended marker for drag events
 */
interface DragMarker extends L.Marker {
  getLatLng: () => L.LatLng;
}

/**
 * Drag event with marker target
 */
interface RotateDragEvent {
  target: DragMarker;
}

/**
 * Rotate mixin context
 */
export interface RotateMixinContext {
  _map: L.Map & { pm: PMMap };
  _layer: RotatableLayer;
  _markers: L.Marker[] | L.Marker[][];
  _matrix: Matrix;
  _angle?: number;
  _rotatePoly?: RotatableLayer;
  _rotateEnabled?: boolean;
  _rotateOrgLatLng?: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  _rotationLayer: RotatableLayer;
  _rotationCenter?: L.LatLng;
  _rotationOriginLatLng?: L.LatLng;
  _rotationOriginPoint?: L.Point;
  _rotationStartPoint?: L.Point;
  _initialRotateLatLng?: L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  _startAngle?: number;
  _layerRotated?: boolean;
  options: {
    allowRotation?: boolean;
  };
  _preventRenderingMarkers: (value: boolean) => void;
  _fireUpdate: () => void;
  _fireRotationStart: (
    layer: L.Layer | L.Map,
    originLatLngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]
  ) => void;
  _fireRotation: (
    layer: L.Layer | L.Map,
    angleDiff: number,
    oldLatLngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
    sourceLayer?: L.Layer
  ) => void;
  _fireRotationEnd: (
    layer: L.Layer | L.Map,
    startAngle: number,
    originLatLngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]
  ) => void;
  _fireRotationEnable: (layer: L.Layer | L.Map) => void;
  _fireRotationDisable: (layer: L.Layer | L.Map) => void;
  _fireChange: (
    coords: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
    source: string
  ) => void;
  _fireEdit: (layer: L.Layer, source: string) => void;
}

/**
 * Rotate mixin interface
 */
export interface IRotateMixin {
  _onRotateStart(e: RotateDragEvent): void;
  _onRotate(e: RotateDragEvent): void;
  _onRotateEnd(): void;
  _rotateLayer(
    radiant: number,
    latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
    origin: L.LatLng,
    _matrix: Matrix,
    map: L.Map
  ): L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  _setAngle(angle: number): void;
  _getRotationCenter(): L.LatLng;
  enableRotate(): void;
  disableRotate(): void;
  rotateEnabled(): boolean;
  rotateLayer(degrees: number): void;
  rotateLayerToAngle(degrees: number): void;
  getAngle(): number;
  setInitAngle(degrees: number): void;
  getRotationCenter(): L.LatLng;
  setRotationCenter(center: L.LatLng): void;
}
import get from 'lodash/get';
import { _convertLatLngs, _toPoint } from '../helpers/ModeHelper';
import { calcAngle, copyLatLngs } from '../helpers';

/**
 * We create a temporary polygon with the same latlngs as the layer that we want to rotate.
 * Why polygon? Because then we have the correct center also for polylines with `layer.getCenter()`.
 * We reference the origin layer as `_rotationLayer`. The rotate listeners (`_onRotate...()`) are only applied to the temp polygon and from there we need to rotate the `_rotationLayer` too.
 *
 */

const RotateMixin: IRotateMixin & ThisType<RotateMixinContext & IRotateMixin> =
  {
    _onRotateStart(e) {
      // prevent that the limit Markers are calculated new
      this._preventRenderingMarkers(true);
      this._rotationOriginLatLng = this._getRotationCenter().clone();
      this._rotationOriginPoint = _toPoint(
        this._map,
        this._rotationOriginLatLng!
      );
      this._rotationStartPoint = _toPoint(this._map, e.target.getLatLng());
      // we need to store the initial latlngs so we can always re-calc from the origin latlngs
      this._initialRotateLatLng = copyLatLngs(this._layer);
      this._startAngle = this.getAngle();

      const originLatLngs = copyLatLngs(
        this._rotationLayer,
        this._rotationLayer.pm._rotateOrgLatLng!
      );

      this._fireRotationStart(this._rotationLayer, originLatLngs);
      this._fireRotationStart(this._map, originLatLngs);
    },
    _onRotate(e) {
      const position = _toPoint(this._map, e.target.getLatLng());
      const previous = this._rotationStartPoint!;
      const origin = this._rotationOriginPoint!;

      // rotation diff angle (radiant)
      const angleDiffRadiant =
        Math.atan2(position.y - origin.y, position.x - origin.x) -
        Math.atan2(previous.y - origin.y, previous.x - origin.x);

      // rotate the temp polygon
      this._layer.setLatLngs(
        this._rotateLayer(
          angleDiffRadiant,
          this._initialRotateLatLng!,
          this._rotationOriginLatLng!,
          L.PM.Matrix.init(),
          this._map
        )
      );
      // move the helper markers
      const that = this;
      function forEachLatLng(
        latlng: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
        path: number[] = [],
        _i = -1
      ) {
        if (_i > -1) {
          path.push(_i);
        }
        if (L.Util.isArray(latlng[0])) {
          latlng.forEach((x, i) =>
            forEachLatLng(x as L.LatLng[] | L.LatLng[][], path.slice(), i)
          );
        } else {
          const markers =
            path.length > 0 ? get(that._markers, path) : that._markers[0];
          latlng.forEach((_latlng, j) => {
            const marker = markers[j];
            marker.setLatLng(_latlng);
          });
        }
      }
      forEachLatLng(this._layer.getLatLngs());

      const oldLatLngs = copyLatLngs(this._rotationLayer);
      // rotate the origin layer
      this._rotationLayer.setLatLngs(
        this._rotateLayer(
          angleDiffRadiant,
          this._rotationLayer.pm._rotateOrgLatLng!,
          this._rotationOriginLatLng!,
          L.PM.Matrix.init(),
          this._map
        )
      );

      // convert the difference radiant to degrees and add it to the angle before rotation starts
      let angleDiff = (angleDiffRadiant * 180) / Math.PI;
      angleDiff = angleDiff < 0 ? angleDiff + 360 : angleDiff;
      const angle = angleDiff + this._startAngle!;
      this._setAngle(angle);
      this._rotationLayer.pm._setAngle(angle);

      this._fireRotation(this._rotationLayer, angleDiff, oldLatLngs);
      this._fireRotation(this._map, angleDiff, oldLatLngs);
      this._rotationLayer.pm._fireChange(
        this._rotationLayer.getLatLngs(),
        'Rotation'
      );
    },
    _onRotateEnd() {
      const startAngle = this._startAngle!;
      delete this._rotationOriginLatLng;
      delete this._rotationOriginPoint;
      delete this._rotationStartPoint;
      delete this._initialRotateLatLng;
      delete this._startAngle;

      const originLatLngs = copyLatLngs(
        this._rotationLayer,
        this._rotationLayer.pm._rotateOrgLatLng!
      );
      // store the new latlngs
      this._rotationLayer.pm._rotateOrgLatLng = copyLatLngs(
        this._rotationLayer
      );

      this._fireRotationEnd(this._rotationLayer, startAngle, originLatLngs);
      this._fireRotationEnd(this._map, startAngle, originLatLngs);
      this._rotationLayer.pm._fireEdit(this._rotationLayer, 'Rotation');

      this._preventRenderingMarkers(false);

      this._layerRotated = true;
    },
    _rotateLayer(radiant, latlngs, origin, _matrix, map) {
      const originPoint = _toPoint(map, origin);
      this._matrix = _matrix.clone().rotate(radiant, originPoint).flip();
      return _convertLatLngs(latlngs, this._matrix, map);
    },
    _setAngle(angle) {
      angle = angle < 0 ? angle + 360 : angle;
      this._angle = angle % 360;
    },
    _getRotationCenter() {
      if (this._rotationCenter) {
        return this._rotationCenter;
      }

      const polygon = L.polygon(this._layer.getLatLngs(), {
        stroke: false,
        fill: false,
        pmIgnore: true,
      }).addTo(this._layer._map);
      const center = polygon.getCenter();
      polygon.removeFrom(this._layer._map);
      return center;
    },

    /*
     *
     * Public functions f.ex. to disable and enable rotation on the layer directly
     *
     */
    enableRotate() {
      if (!this.options.allowRotation) {
        this.disableRotate();
        return;
      }

      if (this.rotateEnabled()) {
        this.disableRotate();
      }

      if (this._layer instanceof L.Rectangle && this._angle === undefined) {
        this.setInitAngle(
          calcAngle(
            this._layer._map,
            (this._layer.getLatLngs()[0] as L.LatLng[])[0],
            (this._layer.getLatLngs()[0] as L.LatLng[])[1]
          ) || 0
        );
      }

      // We create an hidden polygon. We set pmIgnore to false, so that the `pm` property will be always create, also if OptIn == true
      const options = {
        fill: false,
        stroke: false,
        pmIgnore: false,
        snapIgnore: true,
      };

      // we create a temp polygon for rotation
      this._rotatePoly = L.polygon(
        this._layer.getLatLngs(),
        options
      ) as RotatableLayer;
      this._rotatePoly!._pmTempLayer = true;
      this._rotatePoly!.addTo(this._layer._map);
      this._rotatePoly!.pm._setAngle(this.getAngle());
      this._rotatePoly!.pm.setRotationCenter(this.getRotationCenter());
      this._rotatePoly!.pm.setOptions(this._layer._map.pm.getGlobalOptions());
      this._rotatePoly!.pm.setOptions({
        rotate: true,
        snappable: false,
        hideMiddleMarkers: true,
      });
      // we connect the temp polygon (that will be enabled for rotation) with the current layer, so that we can rotate the current layer too
      this._rotatePoly!.pm._rotationLayer = this._layer;
      this._rotatePoly!.pm.enable();

      // store the original latlngs
      this._rotateOrgLatLng = copyLatLngs(this._layer);

      this._rotateEnabled = true;

      this._layer.on('remove', this.disableRotate, this);

      this._fireRotationEnable(this._layer);
      // we need to use this._layer._map because this._map can be undefined if layer was never enabled for editing before
      this._fireRotationEnable(this._layer._map);
    },
    disableRotate() {
      if (this.rotateEnabled()) {
        if (this._rotatePoly!.pm._layerRotated) {
          this._fireUpdate();
        }
        this._rotatePoly!.pm._layerRotated = false;
        // delete the temp polygon
        this._rotatePoly!.pm.disable();
        this._rotatePoly!.remove();
        this._rotatePoly!.pm.setOptions({ rotate: false });
        this._rotatePoly = undefined;
        this._rotateOrgLatLng = undefined;

        this._layer.off('remove', this.disableRotate, this);

        this._rotateEnabled = false;

        this._fireRotationDisable(this._layer);
        // we need to use this._layer._map because this._map can be undefined if layer was never enabled for editing before
        this._fireRotationDisable(this._layer._map);
      }
    },
    rotateEnabled() {
      return !!this._rotateEnabled;
    },
    // angle is clockwise (0-360)
    rotateLayer(degrees) {
      const oldAngle = this.getAngle();
      const oldLatLngs = this._layer.getLatLngs();
      const rads = degrees * (Math.PI / 180);
      this._layer.setLatLngs(
        this._rotateLayer(
          rads,
          this._layer.getLatLngs(),
          this._getRotationCenter(),
          L.PM.Matrix.init(),
          this._layer._map
        )
      );
      // store the new latlngs
      this._rotateOrgLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs();
      this._setAngle(this.getAngle() + degrees);
      if (
        this.rotateEnabled() &&
        this._rotatePoly &&
        this._rotatePoly!.pm.enabled()
      ) {
        this._rotatePoly!.setLatLngs(
          this._rotateLayer(
            rads,
            this._rotatePoly!.getLatLngs(),
            this._getRotationCenter(),
            L.PM.Matrix.init(),
            this._rotatePoly!._map
          )
        );
        this._rotatePoly!.pm._initMarkers();
      }

      // TODO: for negative angle change the difference is always (360 - angle), do we want this?
      let angleDiff = this.getAngle() - oldAngle;
      angleDiff = angleDiff < 0 ? angleDiff + 360 : angleDiff;

      this._startAngle = oldAngle;
      this._fireRotation(this._layer, angleDiff, oldLatLngs, this._layer);
      this._fireRotation(
        this._map || this._layer._map,
        angleDiff,
        oldLatLngs,
        this._layer
      );
      delete this._startAngle;
      this._fireChange(this._layer.getLatLngs(), 'Rotation');
    },
    rotateLayerToAngle(degrees) {
      const newAnlge = degrees - this.getAngle();
      this.rotateLayer(newAnlge);
    },
    // angle is clockwise (0-360)
    getAngle() {
      return this._angle || 0;
    },
    // angle is clockwise (0-360)
    setInitAngle(degrees) {
      this._setAngle(degrees);
    },
    getRotationCenter() {
      return this._getRotationCenter();
    },
    setRotationCenter(center) {
      this._rotationCenter = center;

      if (this._rotatePoly) {
        this._rotatePoly!.pm.setRotationCenter(center);
      }
    },
  };

export default RotateMixin;
