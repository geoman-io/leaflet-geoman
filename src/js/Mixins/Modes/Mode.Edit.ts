import * as L from 'leaflet';
import { PM } from '../../PM';
import type { GlobalOptions } from '../../../types/options';
import { checkOptions } from '../../helpers/options';
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
    _applyInheritedOptions: (options?: object) => void;
    _applyOptions: (options?: object) => void;
    enableLayerDrag: () => void;
    layerDragEnabled: () => boolean;
  };
}

/**
 * Layer event
 */
interface LayerAddEvent {
  layer: PMLayer;
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
  _modes: {
    _exclusive(name: string): void;
    combines(a: string, b: string): boolean;
  };
  globalDragModeEnabled(): boolean;
  _isRelevantForDrag(layer: PMLayer): boolean;
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
  _isRelevantForEdit(layer: PMLayer): boolean;
  _fireGlobalEditModeToggled(enabled: boolean): void;
}
// this mixin adds a global edit mode to the map
const GlobalEditMode = {
  _globalEditModeEnabled: false,
  enableGlobalEditMode(this: IGlobalEditMode, o?: GlobalOptions) {
    const checked = checkOptions(o, 'enableGlobalEditMode()');
    const callerOptions =
      checked && Object.keys(checked).length ? checked : undefined;
    // set status
    this._globalEditModeEnabled = true;

    // Set toolbar button to currect status
    this._modes._exclusive('edit');
    this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled());

    // find all layers handled by leaflet-geoman
    const layers = PM.Utils.findLayers(this.map) as PMLayer[];

    // Global options fill keys the layer has not set. Caller options win now,
    // but are not stored as the layer's own options, so later global options
    // still reach the layer.
    layers.forEach((layer: PMLayer) => {
      if (this._isRelevantForEdit(layer)) {
        layer.pm!._applyInheritedOptions(this.globalOptions);
        if (callerOptions) {
          layer.pm!._applyOptions(callerOptions);
        }
        layer.pm!.enable();
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
    const layers = PM.Utils.findLayers(this.map) as PMLayer[];

    const dragStaysOn =
      this._modes.combines('edit', 'drag') && this.globalDragModeEnabled();
    // disable all layers
    layers.forEach((layer: PMLayer) => {
      layer.pm!.disable();
      // A marker's edit mode turns its drag off; drag mode still wants it.
      if (
        dragStaysOn &&
        this._isRelevantForDrag(layer) &&
        !layer.pm!.layerDragEnabled()
      ) {
        layer.pm!.enableLayerDrag();
      }
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
  // An empty default matches enableGlobalEditMode. The old globalOptions default
  // reapplied draggable: true to every layer, including ones locked with setOptions.
  toggleGlobalEditMode(this: IGlobalEditMode, options: GlobalOptions = {}) {
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
          // Fill from the current globals. Do not pass them to enable(), which
          // would record them as an explicit lock (#1113).
          layer.pm!._applyInheritedOptions(this.globalOptions);
          layer.pm!.enable();
        }
      }
    }
  },
  _layerAddedEdit(this: IGlobalEditMode, { layer }: LayerAddEvent) {
    this._addedLayersEdit[L.Util.stamp(layer)] = layer;
  },
  _isRelevantForEdit(layer: PMLayer) {
    return (
      !(layer instanceof L.LayerGroup) &&
      PM.Utils.isGeomanLayer(layer) &&
      layer.pm!.options.allowEditing
    );
  },
};

export default GlobalEditMode;
