import {_convertLatLngs, _toPoint} from "../helpers/ModeHelper";

/**
 * We create a temporary polygon with the same latlngs as the layer that we want to rotate.
 * Why polygon? Because then we have the correct center also for polylines.
 * We reference the origin layer as `_rotationLayer`. The rotate listeners (`_onRotate...()`) are only applied to the temp polygon and from there we need to rotate the `_rotationLayer` too.
 *
 */

const RotateMixin = {
  _onRotateStart(e){
    this._rotationOriginLatLng = this._getRotationCenter().clone();
    this._rotationOriginPoint = _toPoint(this._map,this._rotationOriginLatLng);
    this._rotationStartPoint = _toPoint(this._map,e.target.getLatLng());
    // we need to store the initial latlngs so we can always re-calc from the origin latlngs
    this._initialRotateLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs();
    this._startAngle = this.getAngle();

    const originLatLngs = L.polygon(this._rotationLayer.pm._rotateOrgLatLng).getLatLngs();

    const data = {
      layer: this._rotationLayer,
      helpLayer: this._layer,
      startAngle: this._startAngle,
      originLatLngs
    };
    L.PM.Utils._fireEvent(this._rotationLayer,'pm:rotatestart',data);
    L.PM.Utils._fireEvent(this._map,'pm:rotatestart',data);

  },
  _onRotate(e) {
    const position = _toPoint(this._map, e.target.getLatLng());
    const previous = this._rotationStartPoint;
    const origin = this._rotationOriginPoint;

    // rotation diff angle (radiant)
    const angleDiffRadiant = Math.atan2(position.y - origin.y, position.x - origin.x) -
      Math.atan2(previous.y - origin.y, previous.x - origin.x);

    // rotate the temp polygon
    this._layer.setLatLngs(this._rotateLayer(angleDiffRadiant, this._initialRotateLatLng, this._rotationOriginLatLng, L.Matrix.init(), this._map));
    // move the helper markers
    this._layer.getLatLngs()[0].forEach((latlng, index) => {
      this._markers[0][index].setLatLng(latlng);
    });

    const oldLatLngs = L.polygon(this._rotationLayer.getLatLngs()).getLatLngs();
    // rotate the origin layer
    this._rotationLayer.setLatLngs(this._rotateLayer(angleDiffRadiant, this._rotationLayer.pm._rotateOrgLatLng, this._rotationOriginLatLng, L.Matrix.init(), this._map));

    // convert the difference radiant to degrees and add it to the angle before rotation starts
    let angleDiff = (angleDiffRadiant * 180 / Math.PI);
    angleDiff = angleDiff < 0 ? angleDiff + 360 : angleDiff;
    const angle = angleDiff + this._startAngle;
    this._setAngle(angle);
    this._rotationLayer.pm._setAngle(angle);

    const data = {
      layer: this._rotationLayer,
      helpLayer: this._layer,
      startAngle: this._startAngle,
      angle: this._rotationLayer.pm.getAngle(),
      angleDiff,
      oldLatLngs,
      newLatLngs: this._rotationLayer.getLatLngs()
    };
    L.PM.Utils._fireEvent(this._rotationLayer,'pm:rotate',data);
    L.PM.Utils._fireEvent(this._map,'pm:rotate',data);
  },
  _onRotateEnd(){
    const startAngle = this._startAngle;
    delete this._rotationOriginLatLng;
    delete this._rotationOriginPoint;
    delete this._rotationStartPoint;
    delete this._initialRotateLatLng;
    delete this._startAngle;

    const originLatLngs = L.polygon(this._rotationLayer.pm._rotateOrgLatLng).getLatLngs();
    // store the new latlngs
    this._rotationLayer.pm._rotateOrgLatLng = L.polygon(this._rotationLayer.getLatLngs()).getLatLngs();

    const data = {
      layer: this._rotationLayer,
      helpLayer: this._layer,
      startAngle,
      angle: this._rotationLayer.pm.getAngle(),
      originLatLngs,
      newLatLngs: this._rotationLayer.getLatLngs()
    };
    L.PM.Utils._fireEvent(this._rotationLayer,'pm:rotateend',data);
    L.PM.Utils._fireEvent(this._map,'pm:rotateend',data);

  },
  _rotateLayer(radiant, latlngs, origin, _matrix, map){
   const originPoint =_toPoint(map,origin);
    this._matrix = _matrix
      .clone()
      .rotate(radiant, originPoint)
      .flip();
    return _convertLatLngs(latlngs, this._matrix, map);
  },
  _setAngle(angle){
    angle = angle < 0 ? angle + 360 : angle;
    this._angle = angle % 360;
  },
  _getRotationCenter(){
    return this._layer.getCenter();
  },

  /*
  *
  * Public functions f.ex. to disable and enable rotation on the layer directly
  *
  */
  enableRotate(){
    // we set pmIgnore to false, so the `pm` property will be always create. Also if OptIn == true
    const options = {color: this._layer.options.color, fill: false, stroke: false, pmIgnore: false, snapIgnore: true};

    // we create a temp polygon for rotation
    this._rotatePoly = L.polygon(this._layer.getLatLngs(), options).addTo(this._layer._map);
    this._rotatePoly.pm._setAngle(this.getAngle());
    this._rotatePoly.pm.setOptions({rotate: true, snappable: false, hideMiddleMarkers: true});
    // we connect the temp polygon (that will be enabled for rotation) with the current layer, so that we can rotate the current layer too
    this._rotatePoly.pm._rotationLayer = this._layer;
    this._rotatePoly.pm.enable();

    // store the original latlngs
    this._rotateOrgLatLng = L.polygon(this._layer.getLatLngs()).getLatLngs();

    this._rotateEnabled = true;

    const data = {
      layer: this._layer,
      helpLayer: this._rotatePoly
    };
    L.PM.Utils._fireEvent(this._layer, 'pm:rotateenable', data);
    // we need to use this._layer._map because this._map can be undefined if layer was never enabled for editing before
    L.PM.Utils._fireEvent(this._layer._map, 'pm:rotateenable', data);
  },
  disableRotate(){
    if(this.rotateEnabled()){
      // delete the temp polygon
      this._rotatePoly.pm.disable();
      this._rotatePoly.remove();
      this._rotatePoly.pm.setOptions({rotate: false});
      this._rotatePoly = undefined;
      this._rotateOrgLatLng = undefined;

      this._rotateEnabled = false;

      const data = {
        layer: this._layer,
      };
      L.PM.Utils._fireEvent(this._layer, 'pm:rotatedisable', data);
      // we need to use this._layer._map because this._map can be undefined if layer was never enabled for editing before
      L.PM.Utils._fireEvent(this._layer._map, 'pm:rotatedisable', data);
    }
  },
  rotateEnabled(){
    return this._rotateEnabled;
  },
  // angle is clockwise (0-360)
  rotateLayer(angle){
    const rads = angle * (Math.PI / 180);
    this._layer.setLatLngs(this._rotateLayer(rads,this._layer.getLatLngs(), this._getRotationCenter(), L.Matrix.init(), this._layer._map));
    this._setAngle(this.getAngle() + angle)
  },
  rotateLayerToAngle(angle){
    const newAnlge = angle - this.getAngle();
    this.rotateLayer(newAnlge);
  },
  // angle is clockwise (0-360)
  getAngle(){
    return this._angle || 0;
  }
};

export default RotateMixin;
