// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditModeEnabled: false,
  enableGlobalEditMode(options) {
    // set status
    this._globalEditModeEnabled = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // find all layers handled by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // enable all layers
    layers.forEach((layer) => {
      layer.pm.enable(options);
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(
        this.handleLayerAdditionInGlobalEditMode,
        100,
        this
      );
    }

    // save the added layers into the _addedLayers array, to read it later out
    this._addedLayers = [];
    this.map.on('layeradd', this._layerAdded, this);
    // handle layers that are added while in removal mode
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
    const layers = this._addedLayers;
    this._addedLayers = [];
    layers.forEach((layer) => {
      // when global edit mode is enabled and a layer is added to the map,
      // enable edit for that layer if it's relevant

      // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
      const isRelevant = !!layer.pm && !layer._pmTempLayer;
      if (!isRelevant) {
        return;
      }

      if (this.globalEditModeEnabled()) {
        layer.pm.enable({ ...this.globalOptions });
      }
    });
  },
  _layerAdded({ layer }) {
    this._addedLayers.push(layer);
  },
};

export default GlobalEditMode;
