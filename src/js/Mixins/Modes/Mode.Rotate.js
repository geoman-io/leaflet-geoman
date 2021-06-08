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
        this._reinitGlobalRotateMode,
        100,
        this
      );
    }
    // handle layers that are added while in rotate mode
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
  _reinitGlobalRotateMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    if (!this._isRelevantForRotate(layer)) {
      return;
    }

    // re-enable global rotation mode if it's enabled already
    if (this.globalRotateModeEnabled()) {
      this.disableGlobalRotateMode();
      this.enableGlobalRotateMode();
    }
  },
  _isRelevantForRotate(layer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowRotation
    );
  },
};
export default GlobalRotateMode;
