
const GlobalDragMode = {
  _layerGroupDrag: false,
  enableGlobalDragMode() {
    const layers = this._findLayers();

    this._globalDragMode = true;

    layers.forEach(layer => {
      layer.pm.enableLayerDrag();
    });

    if (!this.throttledReInitDrag) {
      this.throttledReInitDrag = L.Util.throttle(this.reinitGlobalDragMode, 100, this)
    }

    // add map handler
    this.map.on('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this._globalDragMode);

    this._fireDragModeEvent(true);
  },
  disableGlobalDragMode() {
    const layers = this._findLayers();

    this._globalDragMode = false;

    layers.forEach(layer => {
      layer.pm.disableLayerDrag();
    });

    // remove map handler
    this.map.off('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this._globalDragMode);

    this._fireDragModeEvent(false);
  },
  globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  reinitGlobalDragMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    const isRelevant = !!layer.pm && !layer._pmTempLayer;
    if (!isRelevant) {
      return;
    }

    // re-enable global drag mode if it's enabled already
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
      this.enableGlobalDragMode();
    }
  },
  _fireDragModeEvent(enabled) {
    L.PM.Utils._fireEvent(this.map,'pm:globaldragmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  _findLayers(){
    if(this._layerGroupDrag){
      return L.PM.Utils.findLayerGroups(this.map);
    }else{
      return L.PM.Utils.findLayers(this.map);
    }
  },
  enableLayerGroupDrag(){
    const dragModeEnabled = this.globalDragModeEnabled();
    if (dragModeEnabled) {
      this.disableGlobalDragMode();
    }
    this._layerGroupDrag = true;
    if (dragModeEnabled) {
      this.enableGlobalDragMode();
    }
  },
  disableLayerGroupDrag(){
    const dragModeEnabled = this.globalDragModeEnabled();
    if (dragModeEnabled) {
      this.disableGlobalDragMode();
    }
    this._layerGroupDrag = false;
    if (dragModeEnabled) {
      this.enableGlobalDragMode();
    }
  },
  layerGroupDragEnabled(){
    return this._layerGroupDrag;
  }
}

export default GlobalDragMode
