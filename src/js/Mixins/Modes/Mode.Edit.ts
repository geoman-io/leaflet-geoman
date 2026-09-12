/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  _pmTempLayer?: boolean;
  pm?: {
    enable: (options?: object) => void;
    disable: () => void;
    options: {
      allowEditing?: boolean;
    };
  };
  options: L.LayerOptions & {
    pmIgnore?: boolean;
  };
}

/**
 * Layer event
 */
interface LayerAddEvent {
  layer: PMLayer;
}

/**
 * Global options type
 */
interface GlobalOptions {
  [key: string]: unknown;
}

/**
 * Global Edit Mode mixin interface
 */
export interface IGlobalEditMode {
  map: L.Map;
  _globalEditModeEnabled: boolean;
  _addedLayersEdit: Record<number, PMLayer>;
  throttledReInitEdit?: (e: LayerAddEvent) => void;
  globalOptions: GlobalOptions;
  Toolbar: {
    toggleButton: (name: string, enabled: boolean) => void;
  };

  enableGlobalEditMode(options?: GlobalOptions): void;
  disableGlobalEditMode(): void;
  globalEditEnabled(): boolean;
  globalEditModeEnabled(): boolean;
  toggleGlobalEditMode(options?: GlobalOptions): void;
  handleLayerAdditionInGlobalEditMode(): void;
  _layerAddedEdit(e: LayerAddEvent): void;
  _isRelevantForEdit(layer: PMLayer): boolean | undefined;
  _fireGlobalEditModeToggled(enabled: boolean): void;
}
// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditModeEnabled: false,
  enableGlobalEditMode(this: IGlobalEditMode, o?: GlobalOptions) {
    const options = {
      ...o,
    };
    // set status
    this._globalEditModeEnabled = true;

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // find all layers handled by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // enable all layers
    layers.forEach((layer: PMLayer) => {
      if (this._isRelevantForEdit(layer)) {
        layer.pm!.enable(options);
      }
    });

    if (!this.throttledReInitEdit) {
      this.throttledReInitEdit = L.Util.throttle(
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
  disableGlobalEditMode(this: IGlobalEditMode) {
    // set status
    this._globalEditModeEnabled = false;

    // find all layers handles by leaflet-geoman
    const layers = L.PM.Utils.findLayers(this.map);

    // disable all layers
    layers.forEach((layer: PMLayer) => {
      layer.pm!.disable();
    });

    // cleanup layer off event
    this.map.off('layeradd', this._layerAddedEdit, this);
    this.map.off('layeradd', this.throttledReInitEdit, this);

    // Set toolbar button to currect status
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // fire event
    this._fireGlobalEditModeToggled(false);
  },
  // TODO: Remove in the next major release
  globalEditEnabled(this: IGlobalEditMode) {
    return this.globalEditModeEnabled();
  },
  globalEditModeEnabled(this: IGlobalEditMode) {
    return this._globalEditModeEnabled;
  },
  // TODO: this should maybe removed, it will overwrite explicit options on the layers
  toggleGlobalEditMode(
    this: IGlobalEditMode,
    options: GlobalOptions = this.globalOptions
  ) {
    if (this.globalEditModeEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  },
  handleLayerAdditionInGlobalEditMode(this: IGlobalEditMode) {
    const layers = this._addedLayersEdit;
    this._addedLayersEdit = {};
    if (this.globalEditModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        // when global edit mode is enabled and a layer is added to the map,
        // enable edit for that layer if it's relevant

        if (this._isRelevantForEdit(layer)) {
          layer.pm!.enable({ ...this.globalOptions });
        }
      }
    }
  },
  _layerAddedEdit(this: IGlobalEditMode, { layer }: LayerAddEvent) {
    this._addedLayersEdit[L.stamp(layer)] = layer;
  },
  _isRelevantForEdit(layer: PMLayer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm!.options.allowEditing
    );
  },
};

export default GlobalEditMode;
