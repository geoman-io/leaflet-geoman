const GlobalDragMode = {
  _globalDragModeEnabled: false,
  enableGlobalDragMode() {
    const layers = L.PM.Utils.findLayers(this.map);

    this._globalDragModeEnabled = true;
    this._addedLayersDrag = {};

    layers.forEach((layer) => {
      if (this._isRelevantForDrag(layer)) {
        layer.pm.enableLayerDrag();
      }
    });

    if (!this.throttledReInitDrag) {
      this.throttledReInitDrag = L.Util.throttle(
        this.reinitGlobalDragMode,
        100,
        this
      );
    }

    // add map handler
    this.map.on('layeradd', this._layerAddedDrag, this);
    this.map.on('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(true);
  },
  disableGlobalDragMode() {
    const layers = L.PM.Utils.findLayers(this.map);

    this._globalDragModeEnabled = false;

    layers.forEach((layer) => {
      layer.pm.disableLayerDrag();
    });

    // remove map handler
    this.map.off('layeradd', this._layerAddedDrag, this);
    this.map.off('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(false);
  },
  globalDragModeEnabled() {
    return !!this._globalDragModeEnabled;
  },
  toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  reinitGlobalDragMode() {
    const layers = this._addedLayersDrag;
    this._addedLayersDrag = {};
    if (this.globalDragModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];

        if (this._isRelevantForDrag(layer)) {
          layer.pm.enableLayerDrag();
        }
      }
    }
  },
  _layerAddedDrag({ layer }) {
    this._addedLayersDrag[L.stamp(layer)] = layer;
  },
  _isRelevantForDrag(layer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.draggable
    );
  },
};

export default GlobalDragMode;
