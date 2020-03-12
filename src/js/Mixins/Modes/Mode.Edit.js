// this mixin adds a global edit mode to the map
import Utils from '../../L.PM.Utils'

const { findLayers } = Utils

const GlobalEditMode = {
  _globalEditMode: false,
  globalEditEnabled() {
    return this._globalEditMode;
  },
  setGlobalEditStatus(status) {
    // set status
    this._globalEditMode = status;

    // fire event
    this._fireEditModeEvent(this._globalEditMode);
  },
  enableGlobalEditMode(o) {
    const options = {
      snappable: this._globalSnappingEnabled,
      ...o
    }

    const status = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', status);

    // find all layers handled by leaflet-geoman
    const layers = findLayers(this.map);

    // enable all layers
    layers.forEach(layer => {
      layer.pm.enable(options);
    });

    // handle layers that are added while in removal mode
    this.map.on('layeradd', this.layerAddHandler, this);

    this.setGlobalEditStatus(status);
  },
  disableGlobalEditMode() {
    const status = false;

    // find all layers handles by leaflet-geoman
    const layers = findLayers(this.map);

    // disable all layers
    layers.forEach(layer => {
      layer.pm.disable();
    });

    // cleanup layer off event
    this.map.off('layeroff', this.layerAddHandler, this);

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', status);

    this.setGlobalEditStatus(status);
  },

  _fireEditModeEvent(enabled) {
    this.map.fire('pm:globaleditmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  toggleGlobalEditMode(options = this.globalOptions) {
    // console.log('toggle global edit mode', options);

    if (this.globalEditEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  },
}

export default GlobalEditMode