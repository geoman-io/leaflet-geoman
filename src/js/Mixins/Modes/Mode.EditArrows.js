// this mixin adds a global edit mode to the map
const GlobalArrowEditMode = {
  _globalArrowEditModeEnabled: false,
  enableGlobalArrowEditMode(o) {
    this._arrowheadOptions = {
      fill: false,
      frequency: 'endonly',
      yawn: 30,
      size: '25px',
      weight: 3,
      showArrowToggle: true,
    };
    // set status
    this._globalArrowEditModeEnabled = true;

    // Set layer options
    const options = {
      hideMiddleMarkers: true,
      editArrows: this.globalArrowEditModeEnabled(),
      defaultArrowheadOptions: this._arrowheadOptions,
      ...o,
    };

    // Set toolbar button to correct status
    this.Toolbar.toggleButton(
      'arrowEditMode',
      this.globalArrowEditModeEnabled()
    );

    // find all layers handled by leaflet-geoman
    const layers = L.PM.Utils.findLines(this.map);

    // enable all layers
    layers.forEach((layer) => {
      if (this._isRelevantForEdit(layer)) {
        layer.pm.enable(options);
      }
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(
        this.handleLayerAdditionInGlobalArrowEditMode,
        100,
        this
      );
    }

    // save the added layers into the _addedLayersEdit array, to read it later out
    this._addedLayersEdit = {};
    this.map.on('layeradd', this._layerAddedEdit, this);
    // handle layers that are added while in edit mode
    this.map.on('layeradd', this.throttledReInitEdit, this);

    // fire event
    this._fireGlobalArrowEditModeToggled(true);
  },
  disableGlobalArrowEditMode() {
    // set status
    this._globalArrowEditModeEnabled = false;

    // find all layers handles by leaflet-geoman
    const layers = L.PM.Utils.findLines(this.map);

    // disable all layers
    layers.forEach((layer) => {
      layer.pm.disable();
    });

    // cleanup layer off event
    this.map.off('layeradd', this._layerAddedEdit, this);
    this.map.off('layeradd', this.throttledReInitEdit, this);

    // Set toolbar button to correct status
    this.Toolbar.toggleButton(
      'arrowEditMode',
      this.globalArrowEditModeEnabled()
    );

    // fire event
    this._fireGlobalArrowEditModeToggled(false);
  },
  globalArrowEditModeEnabled() {
    return this._globalArrowEditModeEnabled;
  },
  // TODO: this should maybe removed, it will overwrite explicit options on the layers
  toggleGlobalArrowEditMode(options = this.globalOptions) {
    if (this.globalArrowEditModeEnabled()) {
      // disable
      this.disableGlobalArrowEditMode();
    } else {
      // enable
      this.enableGlobalArrowEditMode(options);
    }
  },
  handleLayerAdditionInGlobalArrowEditMode() {
    const layers = this._addedLayersEdit;
    this._addedLayersEdit = {};
    if (this.globalArrowEditModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        // when global edit mode is enabled and a layer is added to the map, enable edit for that layer if it's relevant

        if (this._isRelevantForEdit(layer)) {
          layer.pm.enable({ ...this.globalOptions });
        }
      }
    }
  },
  _layerAddedEdit({ layer }) {
    this._addedLayersEdit[L.stamp(layer)] = layer;
  },
  _isRelevantForEdit(layer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowEditing
    );
  },
};

export default GlobalArrowEditMode;
