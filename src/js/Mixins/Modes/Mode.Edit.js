// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditModeEnabled: false,
  enableGlobalEditMode(o) {
    const options = {
      ...o,
    };
    // set status
    this._globalEditModeEnabled = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // find all layers handled by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // enable all layers
    layers.forEach((layer) => {
      if (this._isRelevantForEdit(layer)) {
        layer.pm.enable(options);
      }
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(
        this.handleLayerAdditionInGlobalEditMode,
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
    this._fireGlobalEditModeToggled(true);
  },
  disableGlobalEditMode() {
    // set status
    this._globalEditModeEnabled = false;

    // find all layers handles by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // disable all layers
    layers.forEach((layer) => {
      layer.pm.disable();
    });

    // cleanup layer off event
    this.map.off('layeradd', this._layerAddedEdit, this);
    this.map.off('layeradd', this.throttledReInitEdit, this);

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // fire event
    this._fireGlobalEditModeToggled(false);
  },
  // TODO: Remove in the next major release
  globalEditEnabled() {
    return this.globalEditModeEnabled();
  },
  globalEditModeEnabled() {
    return this._globalEditModeEnabled;
  },
  // TODO: this should maybe removed, it will overwrite explicit options on the layers
  toggleGlobalEditMode(options = this.globalOptions) {
    if (this.globalEditModeEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  },
  handleLayerAdditionInGlobalEditMode() {
    const layers = this._addedLayersEdit;
    this._addedLayersEdit = {};
    if (this.globalEditModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        // when global edit mode is enabled and a layer is added to the map,
        // enable edit for that layer if it's relevant

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

export default GlobalEditMode;
