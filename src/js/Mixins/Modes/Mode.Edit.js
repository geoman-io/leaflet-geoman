// this mixin adds a global edit mode to the map
import Utils from '../../L.PM.Utils'

const { findLayers } = Utils;

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
    const layers = findLayers(this.map);

    this.clearRemovedLayersToRevert();
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
  disableGlobalEditMode(revert = false) {
    const status = false;

    // find all layers handles by leaflet-geoman
    const layers = findLayers(this.map).concat(this.getRemovedLayersToRevert());

    // disable all layers
    layers.forEach(layer => {
      if(revert){
        layer.pm.revert('edit');
      }
      layer.pm.disable();
    });
    this.clearRemovedLayersToRevert();

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
    this._fireEditModeEvent(this._globalEditMode);
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
  cancelGlobalEditMode(){
    this.disableGlobalEditMode(true);
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
  _fireEditModeEvent(enabled) {
    Utils._fireEvent(this.map,'pm:globaleditmodetoggled', {
      enabled,
      map: this.map,
    });
  },
};

export default GlobalEditMode
