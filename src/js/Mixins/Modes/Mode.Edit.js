// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditMode: false,
  enableGlobalEditMode(o) {
    const options = {
      snappable: this._globalSnappingEnabled,
      ...o
    };

    const status = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', status);

    // find all layers handled by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // enable all layers
    layers.forEach(layer => {
      layer.pm.enable(options);
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(this.handleLayerAdditionInGlobalEditMode, 100, this)
    }

    // save the added layers into the _addedLayers array, to read it later out
    this._addedLayers = [];
    this.map.on('layeradd', this._layerAdded, this);
    // handle layers that are added while in removal mode
    this.map.on('layeradd', this.throttledReInitEdit, this);

    this.setGlobalEditStatus(status);
  },
  disableGlobalEditMode() {
    const status = false;

    // find all layers handles by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // disable all layers
    layers.forEach(layer => {
      layer.pm.disable();
    });

    // cleanup layer off event
    this.map.off('layeradd', this.throttledReInitEdit, this);

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', status);

    this.setGlobalEditStatus(status);
  },
  // TODO: Remove in the next major release
  globalEditEnabled() {
    return this.globalEditModeEnabled();
  },
  globalEditModeEnabled() {
    return this._globalEditMode;
  },
  setGlobalEditStatus(status) {
    // set status
    this._globalEditMode = status;
    // fire event
    this._fireGlobalEditModeToggled(this._globalEditMode);
  },
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
    layers.forEach((layer)=> {
      // when global edit mode is enabled and a layer is added to the map,
      // enable edit for that layer if it's relevant

      // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
      const isRelevant = !!layer.pm && !layer._pmTempLayer;
      if (!isRelevant) {
        return;
      }

      if (this.globalEditModeEnabled()) {
        layer.pm.enable({...this.globalOptions});
      }
    });
  },
  _layerAdded({layer}){
    this._addedLayers.push(layer);
  },
};

export default GlobalEditMode
