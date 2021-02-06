import Utils from "../../L.PM.Utils";

const GlobalRemovalMode = {
  enableGlobalRemovalMode() {
    this._globalRemovalMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (this._isRelevant(layer)) {
        layer.pm.disable();
        layer.on('click', this.removeLayer, this);
      }
    });

    if (!this.throttledReInitRemoval) {
      this.throttledReInitRemoval = L.Util.throttle(this.reinitGlobalRemovalMode, 100, this)
    }

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(true);
  },
  disableGlobalRemovalMode() {
    this._globalRemovalMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.removeLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(false);
  },
  // TODO: Remove in the next major release
  globalRemovalEnabled() {
    return this.globalRemovalModeEnabled();
  },
  globalRemovalModeEnabled() {
    return !!this._globalRemovalMode;
  },
  toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  reinitGlobalRemovalMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    if (!this._isRelevant(layer)) {
      return;
    }

    // re-enable global removal mode if it's enabled already
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
      this.enableGlobalRemovalMode();
    }
  },
  _fireRemovalModeEvent(enabled) {
    Utils._fireEvent(this.map,'pm:globalremovalmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  removeLayer(e) {
    const layer = e.target;
    // only remove layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged
    const removeable = this._isRelevant(layer) && !layer.pm.dragging();

    if (removeable) {
      layer.removeFrom(this.map.pm._getContainingLayer());
      layer.remove();
      if(layer instanceof L.LayerGroup){
        Utils._fireEvent(layer,'pm:remove', { layer, shape: undefined });
        Utils._fireEvent(this.map,'pm:remove', { layer, shape: undefined });
      }else{
        Utils._fireEvent(layer,'pm:remove', { layer, shape: layer.pm.getShape() });
        Utils._fireEvent(this.map,'pm:remove', { layer, shape: layer.pm.getShape() });
      }

    }
  },
  _isRelevant(layer){
    return layer.pm
      && !(layer instanceof L.LayerGroup)
      && (
        (!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false) // if optIn is true and pmIgnore is false
      )
      && !layer._pmTempLayer
  }
};

export default GlobalRemovalMode
