import get from 'lodash/get';
import { _convertLatLngs, _toPoint } from '../helpers/ModeHelper';
import { calcAngle, copyLatLngs } from '../helpers';

/**
 * We create a temporary polygon with the same latlngs as the layer that we want to rotate.
 * Why polygon? Because then we have the correct center also for polylines with `layer.getCenter()`.
 * We reference the origin layer as `_rotationLayer`. The rotate listeners (`_onRotate...()`) are only applied to the temp polygon and from there we need to rotate the `_rotationLayer` too.
 *
 */

const RotateMixin = {
  _onRotateStart(e) {
    // prevent that the limit Markers are calculated new
    this._preventRenderingMarkers(true);
    this._rotationOriginLatLng = this._getRotationCenter().clone();
    this._rotationOriginPoint = _toPoint(this._map, this._rotationOriginLatLng);
    this._rotationStartPoint = _toPoint(this._map, e.target.getLatLng());
    // we need to store the initial latlngs so we can always re-calc from the origin latlngs
    this._initialRotateLatLng = copyLatLngs(this._layer);
    this._startAngle = this.getAngle();

    const originLatLngs = copyLatLngs(
      this._rotationLayer,
      this._rotationLayer.pm._rotateOrgLatLng
    );

    this._fireRotationStart(this._rotationLayer, originLatLngs);
    this._fireRotationStart(this._map, originLatLngs);
  },
  _onRotate(e) {
    const position = _toPoint(this._map, e.target.getLatLng());
    const previous = this._rotationStartPoint;
    const origin = this._rotationOriginPoint;

    // rotation diff angle (radiant)
    const angleDiffRadiant =
      Math.atan2(position.y - origin.y, position.x - origin.x) -
      Math.atan2(previous.y - origin.y, previous.x - origin.x);

    // rotate the temp polygon
    this._layer.setLatLngs(
      this._rotateLayer(
        angleDiffRadiant,
        this._initialRotateLatLng,
        this._rotationOriginLatLng,
        L.PM.Matrix.init(),
        this._map
      )
    );
    // move the helper markers
    const that = this;
    function forEachLatLng(latlng, path = [], _i = -1) {
      if (_i > -1) {
        path.push(_i);
      }
      if (L.Util.isArray(latlng[0])) {
        latlng.forEach((x, i) => forEachLatLng(x, path.slice(), i));
      } else {
        const markers = get(that._markers, path);
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
        this._rotationLayer.pm._rotateOrgLatLng,
        this._rotationOriginLatLng,
        L.PM.Matrix.init(),
        this._map
      )
    );

    // convert the difference radiant to degrees and add it to the angle before rotation starts
    let angleDiff = (angleDiffRadiant * 180) / Math.PI;
    angleDiff = angleDiff < 0 ? angleDiff + 360 : angleDiff;
    const angle = angleDiff + this._startAngle;
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
    const startAngle = this._startAngle;
    delete this._rotationOriginLatLng;
    delete this._rotationOriginPoint;
    delete this._rotationStartPoint;
    delete this._initialRotateLatLng;
    delete this._startAngle;

    const originLatLngs = copyLatLngs(
      this._rotationLayer,
      this._rotationLayer.pm._rotateOrgLatLng
    );
    // store the new latlngs
    this._rotationLayer.pm._rotateOrgLatLng = copyLatLngs(this._rotationLayer);

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
          this._layer.getLatLngs()[0][0],
          this._layer.getLatLngs()[0][1]
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
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), options);
    this._rotatePoly._pmTempLayer = true;
    this._rotatePoly.addTo(this._layer._map);
    this._rotatePoly.pm._setAngle(this.getAngle());
    this._rotatePoly.pm.setRotationCenter(this.getRotationCenter());
    this._rotatePoly.pm.setOptions(this._layer._map.pm.getGlobalOptions());
    this._rotatePoly.pm.setOptions({
      rotate: true,
      snappable: false,
      hideMiddleMarkers: true,
    });
    // we connect the temp polygon (that will be enabled for rotation) with the current layer, so that we can rotate the current layer too
    this._rotatePoly.pm._rotationLayer = this._layer;
    this._rotatePoly.pm.enable();

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
      if (this._rotatePoly.pm._layerRotated) {
        this._fireUpdate();
      }
      this._rotatePoly.pm._layerRotated = false;
      // delete the temp polygon
      this._rotatePoly.pm.disable();
      this._rotatePoly.remove();
      this._rotatePoly.pm.setOptions({ rotate: false });
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
    return this._rotateEnabled;
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
      this._rotatePoly.pm.enabled()
    ) {
      this._rotatePoly.setLatLngs(
        this._rotateLayer(
          rads,
          this._rotatePoly.getLatLngs(),
          this._getRotationCenter(),
          L.PM.Matrix.init(),
          this._rotatePoly._map
        )
      );
      this._rotatePoly.pm._initMarkers();
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
      this._rotatePoly.pm.setRotationCenter(center);
    }
  },
};

export default RotateMixin;
