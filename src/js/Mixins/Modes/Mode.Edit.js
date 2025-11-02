import { LayerGroup, Util } from 'leaflet';
import Geoman from '../../Geoman';
import Utils from '../../GeomanUtils';

// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditModeEnabled: false,
  enableGlobalEditMode(o) {
    const options = {
      ...o,
    };
    // set status
    this._globalEditModeEnabled = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // find all layers handled by leaflet-geoman
    const layers = Utils.findLayers(this.map);

    // enable all layers
    layers.forEach((layer) => {
      if (this._isRelevantForEdit(layer)) {
        layer.geoman.enable(options);
      }
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = Util.throttle(
        this.handleLayerAdditionInGlobalEditMode,
        100,
        this
      );
    }

    // save the added layers into the _addedLayersEdit array, to read it later out
    this._addedLayersEdit = {};
    this.map.on('layeradd', this._layerAddedEdit, this);
    // handle layers that are added while in edit mode
    this.map.on('layeradd', this.throttledReInitEdit, this);

    // fire event
    this._fireGlobalEditModeToggled(true);
  },
  disableGlobalEditMode() {
    // set status
    this._globalEditModeEnabled = false;

    // find all layers handles by leaflet-geoman
    const layers = Utils.findLayers(this.map);

    // disable all layers
    layers.forEach((layer) => {
      layer.geoman.disable();
    });

    // cleanup layer off event
    this.map.off('layeradd', this._layerAddedEdit, this);
    this.map.off('layeradd', this.throttledReInitEdit, this);

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // fire event
    this._fireGlobalEditModeToggled(false);
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
    const layers = this._addedLayersEdit;
    this._addedLayersEdit = {};
    if (this.globalEditModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        // when global edit mode is enabled and a layer is added to the map,
        // enable edit for that layer if it's relevant

        if (this._isRelevantForEdit(layer)) {
          layer.geoman.enable({ ...this.globalOptions });
        }
      }
    }
  },
  _layerAddedEdit({ layer }) {
    this._addedLayersEdit[Util.stamp(layer)] = layer;
  },
  _isRelevantForEdit(layer) {
    return (
      layer.geoman &&
      !(layer instanceof LayerGroup) &&
      ((!Geoman.optIn && !layer.options.geomanIgnore) || // if optIn is not set / true and geomanIgnore is not set / true (default)
        (Geoman.optIn && layer.options.geomanIgnore === false)) && // if optIn is true and geomanIgnore is false
      !layer._geomanTempLayer &&
      layer.geoman.options.allowEditing
    );
  },
};

export default GlobalEditMode;
