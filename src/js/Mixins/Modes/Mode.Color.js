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

    // Display the color picker dialog but hide the close button
    // The dialog should be closed by pressing the "Finish" button
    this.Dialog.colorChangeDialog.hideClose();
    this.Dialog.openColorChangeDialog();

    this._fireGlobalColorChangeModeToggled();
  },
  disableGlobalColorChangeMode() {
    this._globalChangeColorModeEnabled = false;
    const layers = L.PM.Utils.findLayers(this.map);
    layers.forEach((layer) => {
      layer.pm.disableColorChange();
    });

    // toggle the button in the toolbar if this is called programmatically
    this.Toolbar.toggleButton(
      'colorChangeMode',
      this.globalColorChangeModeEnabled()
    );

    this.map.off('dialog:moveend', this.updateColorisPosition);
    this.Dialog.closeColorChangeDialog();
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
      layer.pm.options.allowColorChange &&
      layer.pm.getShape() !== 'Text' &&
      layer.pm.getShape() !== 'Marker'
    );
  },
};

export default GlobalColorChangeMode;
