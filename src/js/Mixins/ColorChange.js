import { copyLatLngs } from '../helpers';

const ColorChangeMixin = {
  enableColorChange() {
    if (!this.options.allowColorChange) {
      this.disableColorChange();
      return;
    }

    if (this.colorChangeEnabled()) {
      this.disableColorChange();
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
  disableColorChange() {},
  colorChangeEnabled() {},
};

export default ColorChangeMixin;
