import cloneDeep from "lodash/cloneDeep";
import {isArrayEqual} from "../helpers";
import Utils from "../L.PM.Utils";

const RevertMixin = {
  revert(mode = 'edit') {
    let reverted = false;
    let lastLatLng = null;
    let revertedLatLng = null;

    if (this._layer._latlng) {
      lastLatLng = cloneDeep(this._layer.getLatLng());
      if (this._revertLatLng && (!isArrayEqual([this._layer.getLatLng()], [this._revertLatLng]) || (this._layer instanceof L.CircleMarker && this._layer.getRadius() !== this._revertRadius))) {
        this._layer.setLatLng(this._revertLatLng);
        revertedLatLng = this._layer.getLatLng();

        if (this._layer instanceof L.Circle) {
          if (this._revertRadius) {
            this._layer.setRadius(this._revertRadius);
          }
          if(this.enabled()){
            this._initMarkers();
          }
        } else if (this._layer instanceof L.CircleMarker) {
          if (this._revertRadius) {
            this._layer.setRadius(this._revertRadius);
          }
          if (this._layer.pm.options.editable && this.enabled()) {
            this.applyOptions();
          }
        }
        reverted = true;
      }
    } else if (this._layer._latlngs) {
      lastLatLng = cloneDeep(this._layer.getLatLngs());
      if (this._revertLatLng && !isArrayEqual(this._layer.getLatLngs(), this._revertLatLng)) {
        this._layer.setLatLngs(this._revertLatLng);
        revertedLatLng = this._layer.getLatLngs();

        if (this.enabled()) {
          this._initMarkers();
        }
        reverted = true;
      }
    } else if (this._layer instanceof L.ImageOverlay) {
      lastLatLng = cloneDeep(this._findCorners());
      if (this._revertLatLng && !isArrayEqual(this._findCorners(), this._revertLatLng)) {
        this._layer.setBounds([this._revertLatLng[1], this._revertLatLng[3]]);
        revertedLatLng = this._findCorners();
        reverted = true;
      }
    }

    if (this._layer._map !== this._map && this._map) {
      this._layer.addTo(this._map);
      if (!this.enabled() && this._map.pm.globalEditModeEnabled()) {
        this.enable();
      }
      reverted = true;
    }

    if (reverted) {
      if (!revertedLatLng) {
        revertedLatLng = lastLatLng;
      }
      Utils._fireEvent(this._layer, 'pm:revert', {
        layer: this._layer,
        shape: this.getShape(),
        lastLatLng,
        revertedLatLng,
        mode
      });
      Utils._fireEvent(this._map, 'pm:revert', {
        layer: this._layer,
        shape: this.getShape(),
        lastLatLng,
        revertedLatLng,
        mode
      });
    }
  },
  _setRevertLatLng(latlng){
    if(!latlng){
      if(this._layer._latlngs) {
        latlng = this._layer.getLatLngs();
      } else if(this._layer._latlng) {
        latlng = this._layer.getLatLng();
      } else if (this._layer instanceof L.ImageOverlay) {
        latlng = this._findCorners();
      }
    }
    this._revertLatLng = cloneDeep(latlng);
  },
  _removeRevertLatLng(){
    delete this._revertLatLng
  }
};

export default RevertMixin;
