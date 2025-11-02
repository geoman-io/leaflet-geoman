import { LayerGroup, Polyline, Util } from 'leaflet';
import Geoman from '../../Geoman';
import Utils from '../../GeomanUtils';

const GlobalRotateMode = {
  _globalRotateModeEnabled: false,
  enableGlobalRotateMode() {
    this._globalRotateModeEnabled = true;
    const layers = Utils.findLayers(this.map).filter(
      (l) => l instanceof Polyline
    );
    layers.forEach((layer) => {
      if (this._isRelevantForRotate(layer)) {
        layer.geoman.enableRotate();
      }
    });

    if (!this.throttledReInitRotate) {
      this.throttledReInitRotate = Util.throttle(
        this._handleLayerAdditionInGlobalRotateMode,
        100,
        this
      );
    }

    this._addedLayersRotate = {};
    // handle layers that are added while in rotate mode
    this.map.on('layeradd', this._layerAddedRotate, this);
    this.map.on('layeradd', this.throttledReInitRotate, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('rotateMode', this.globalRotateModeEnabled());
    this._fireGlobalRotateModeToggled();
  },
  disableGlobalRotateMode() {
    this._globalRotateModeEnabled = false;
    const layers = Utils.findLayers(this.map).filter(
      (l) => l instanceof Polyline
    );
    layers.forEach((layer) => {
      layer.geoman.disableRotate();
    });

    // remove map handler
    this.map.off('layeradd', this._layerAddedRotate, this);
    this.map.off('layeradd', this.throttledReInitRotate, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('rotateMode', this.globalRotateModeEnabled());
    this._fireGlobalRotateModeToggled();
  },
  globalRotateModeEnabled() {
    return !!this._globalRotateModeEnabled;
  },
  toggleGlobalRotateMode() {
    if (this.globalRotateModeEnabled()) {
      this.disableGlobalRotateMode();
    } else {
      this.enableGlobalRotateMode();
    }
  },
  _isRelevantForRotate(layer) {
    return (
      layer.geoman &&
      layer instanceof Polyline &&
      !(layer instanceof LayerGroup) &&
      ((!Geoman.optIn && !layer.options.geomanIgnore) || // if optIn is not set / true and geomanIgnore is not set / true (default)
        (Geoman.optIn && layer.options.geomanIgnore === false)) && // if optIn is true and geomanIgnore is false
      !layer._geomanTempLayer &&
      layer.geoman.options.allowRotation
    );
  },
  _handleLayerAdditionInGlobalRotateMode() {
    const layers = this._addedLayersRotate;
    this._addedLayersRotate = {};
    if (this.globalRotateModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        if (this._isRelevantForRemoval(layer)) {
          layer.geoman.enableRotate();
        }
      }
    }
  },
  _layerAddedRotate({ layer }) {
    this._addedLayersRotate[Util.stamp(layer)] = layer;
  },
};
export default GlobalRotateMode;
