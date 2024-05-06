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

    // toggle the button in the toolbar if this is called programmatically
    this.Toolbar.toggleButton(
      'colorChangeMode',
      this.globalColorChangeModeEnabled()
    );

    // display the color picker dialog
    this._changeColorDialog = this.colorChangeDialogInit({
      close: false,
    }).addTo(this.map);
    this._changeColorDialog.open();

    this.colorChangeInit();

    this.map.on('dialog:moveend', this.updateColorisPosition);

    // const dialogBody = this.getColorChangeDialogBody({ activeColor: this.activeColor });

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

    this.map.off('dialog:moveend', this.updateColorisPosition);
    this._changeColorDialog.close();
    this._changeColorDialog.destroy();
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
