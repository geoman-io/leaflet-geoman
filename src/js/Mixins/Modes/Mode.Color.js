const GlobalColorChangeMode = {
  _globalChangeColorModeEnabled: false,
  enableGlobalChangeColorMode() {
    this._globalChangeColorModeEnabled = true;
    const layers = L.PM.Utils.findLayers(this.map);
    layers.forEach((layer) => {
      if (this._isRelevantForColorChange(layer)) {
        layer.pm.enableColorChange();
      }
    });

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton(
      'colorChangeMode',
      this.globalColorChangeModeEnabled()
    );
    this._fireGlobalColorChangeModeToggled();
  },
  disableGlobalColorChangeMode() {
    this._globalChangeColorModeEnabled = false;
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l) => l instanceof L.Polyline
    );
    layers.forEach((layer) => {
      layer.pm.disableColorChange();
    });

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton(
      'colorChangeMode',
      this.globalColorChangeModeEnabled()
    );
    this._fireGlobalColorChangeModeToggled();
  },
  globalColorChangeModeEnabled() {
    return !!this._globalChangeColorModeEnabled;
  },
  toggleGlobalColorChangeMode() {
    if (this.globalColorChangeModeEnabled()) {
      this.disableGlobalColorChangeMode();
    } else {
      this.enableGlobalChangeColorMode();
    }
  },
  _isRelevantForColorChange(layer) {
    return (
      layer.pm &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowColorChange
    );
  },
};
export default GlobalColorChangeMode;
