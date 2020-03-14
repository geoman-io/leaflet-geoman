import Utils from '../../L.PM.Utils'

const { findLayers } = Utils

const GlobalDragMode = {
  globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  enableGlobalDragMode() {
    const layers = findLayers(this.map);

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
    const layers = findLayers(this.map);

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
  _fireDragModeEvent(enabled) {
    this.map.fire('pm:globaldragmodetoggled', {
      enabled,
      map: this.map,
    });
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
}

export default GlobalDragMode