import Utils from "../../L.PM.Utils";

const GlobalRemovalMode = {
  enableGlobalRemovalMode() {
    this._globalRemovalMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      this._activateRemovalOnLayer(layer);
    });
    this._clearRemovedLayersToRevert();
    this._clearGlobalChanges();

    if (!this.throttledReInitRemoval) {
      this.throttledReInitRemoval = L.Util.throttle(this.reinitGlobalRemovalMode, 100, this)
    }

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(true);
  },
  disableGlobalRemovalMode(revert = false) {

    this._globalRemovalMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.removeLayer, this);
    });

    if(revert) {
      const layers = this._getRemovedLayersToRevert();
      layers.forEach((layer) => {
        layer.pm.revert('removal');
      });
    }
    this._clearRemovedLayersToRevert();
    this._clearGlobalChanges();

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
  cancelGlobalRemovalMode(){
    this.disableGlobalRemovalMode(true);
  },
  reinitGlobalRemovalMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    const isRelevant = !!layer.pm && !layer._pmTempLayer;
    if (!isRelevant) {
      return;
    }

    // re-enable global removal mode if it's enabled already
    if (this.globalRemovalModeEnabled()) {
      this._activateRemovalOnLayer(layer);
    }
  },
  _activateRemovalOnLayer(layer){
    if (layer.pm && !layer._pmTempLayer && !(layer instanceof L.LayerGroup)) {
      layer.pm.disable();
      layer.pm.setMap();
      layer.on('click', this.removeLayer, this);
      layer.pm._clearChangesOnLayer();
      layer.pm.createChangeOnLayer({mode: 'init'});
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
    const removeable =
      !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging());

    if (removeable) {
      layer.removeFrom(this.map.pm._getContainingLayer());
      layer.remove();
      if(layer instanceof L.LayerGroup){
        Utils._fireEvent(layer,'pm:remove', { layer, shape: undefined });
        Utils._fireEvent(this.map,'pm:remove', { layer, shape: undefined });
      }else{
        Utils._fireEvent(layer,'pm:remove', { layer, shape: layer.pm.getShape() });
        Utils._fireEvent(this.map,'pm:remove', { layer, shape: layer.pm.getShape() });
        layer.pm.createChangeOnLayer({mode: 'removeLayer'});
      }

    }
  },
};

export default GlobalRemovalMode
