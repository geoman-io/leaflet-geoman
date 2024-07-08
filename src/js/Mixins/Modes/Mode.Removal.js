const GlobalRemovalMode = {
  _globalRemovalModeEnabled: false,
  enableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = true;
    // handle existing layers
    this.map.eachLayer((layer) => {
      if (this._isRelevantForRemoval(layer)) {
        if (layer.pm.enabled()) {
          layer.pm.disable();
        }
        layer.on('click', this.removeLayer, this);
      }
    });

    if (!this.throttledReInitRemoval) {
      this.throttledReInitRemoval = L.Util.throttle(
        this.handleLayerAdditionInGlobalRemovalMode,
        100,
        this
      );
    }
    // save the added layers into the _addedLayersRemoval array, to read it later out
    this._addedLayersRemoval = {};
    // handle layers that are added while in removal mode
    this.map.on('layeradd', this._layerAddedRemoval, this);
    this.map.on('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('removalMode', this.globalRemovalModeEnabled());

    this._fireGlobalRemovalModeToggled(true);
  },
  disableGlobalRemovalMode() {
    this._globalRemovalModeEnabled = false;
    this.map.eachLayer((layer) => {
      layer.off('click', this.removeLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this._layerAddedRemoval, this);
    this.map.off('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('removalMode', this.globalRemovalModeEnabled());

    this._fireGlobalRemovalModeToggled(false);
  },
  // TODO: Remove in the next major release
  globalRemovalEnabled() {
    return this.globalRemovalModeEnabled();
  },
  globalRemovalModeEnabled() {
    return !!this._globalRemovalModeEnabled;
  },
  toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  removeLayer(e) {
    const layer = e.target;
    // only remove layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged
    const removeable =
      this._isRelevantForRemoval(layer) && !layer.pm.dragging();

    if (removeable) {
      layer.removeFrom(this.map.pm._getContainingLayer());
      layer.remove();
      if (layer instanceof L.LayerGroup) {
        this._fireRemoveLayerGroup(layer);
        this._fireRemoveLayerGroup(this.map, layer);
      } else {
        layer.pm._fireRemove(layer);
        layer.pm._fireRemove(this.map, layer);
      }
    }
  },
  _isRelevantForRemoval(layer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowRemoval
    );
  },
  handleLayerAdditionInGlobalRemovalMode() {
    const layers = this._addedLayersRemoval;
    this._addedLayersRemoval = {};
    if (this.globalRemovalModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        if (this._isRelevantForRemoval(layer)) {
          if (layer.pm.enabled()) {
            layer.pm.disable();
          }
          layer.on('click', this.removeLayer, this);
        }
      }
    }
  },
  _layerAddedRemoval({ layer }) {
    this._addedLayersRemoval[L.stamp(layer)] = layer;
  },
};

export default GlobalRemovalMode;
