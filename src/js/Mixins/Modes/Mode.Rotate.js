const GlobalRotateMode = {

  _globalRotateModeEnabled: false,
  enableGlobalRotateMode() {
    this._globalRotateModeEnabled = true;
    const layers = L.PM.Utils.findLayers(this.map).filter(l => l instanceof L.Polyline);
    layers.forEach(layer => {
      layer.pm.enableRotate();
    });

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('rotateMode', this.globalRotateModeEnabled());
    this._fireGlobalRotateModeToggled();
  },
  disableGlobalRotateMode() {
    this._globalRotateModeEnabled = false;
    const layers = L.PM.Utils.findLayers(this.map).filter(l => l instanceof L.Polyline);
    layers.forEach(layer => {
      layer.pm.disableRotate();
    });

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

};
export default GlobalRotateMode;
