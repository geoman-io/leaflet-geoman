const GlobalRotateMode = {
  _globalRotateModeEnabled: false,
  enableGlobalRotateMode() {
    this._globalRotateModeEnabled = true;
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l) => l instanceof L.Polyline
    );
    layers.forEach((layer) => {
      if (this._isRelevantForRotate(layer)) {
        layer.pm.enableRotate();
      }
    });

    if (!this.throttledReInitRotate) {
      this.throttledReInitRotate = L.Util.throttle(
        this.handleLayerAdditionInGlobalRotateMode,
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
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l) => l instanceof L.Polyline
    );
    layers.forEach((layer) => {
      layer.pm.disableRotate();
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
      layer.pm &&
      layer instanceof L.Polyline &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowRotation
    );
  },
  handleLayerAdditionInGlobalRotateMode() {
    const layers = this._addedLayersRotate;
    this._addedLayersRotate = {};
    if (this.globalRotateModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        if (this._isRelevantForRemoval(layer)) {
          layer.pm.enableRotate();
        }
      }
    }
  },
  _layerAddedRotate({ layer }) {
    this._addedLayersRotate[L.stamp(layer)] = layer;
  },
};
export default GlobalRotateMode;
