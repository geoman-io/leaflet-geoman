// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    optIn: boolean;
  };
  stamp: (obj: object) => number;
  Util: {
    throttle: <T>(fn: T, time: number, context?: unknown) => T;
  };
};

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    _getContainingLayer: () => L.LayerGroup | L.Map;
  };
};

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  _pmTempLayer?: boolean;
  pm?: {
    enable: (options?: object) => void;
    disable: () => void;
    enabled: () => boolean;
    dragging: () => boolean;
    _fireRemove: (layerOrMap: L.Layer | L.Map, layer?: L.Layer) => void;
    options: {
      allowRemoval?: boolean;
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
 * Click event with target
 */
interface ClickEvent {
  target: PMLayer;
}

/**
 * Global Removal Mode mixin interface
 */
export interface IGlobalRemovalMode {
  map: ExtendedMap;
  _globalRemovalModeEnabled: boolean;
  _addedLayersRemoval: Record<number, PMLayer>;
  throttledReInitRemoval?: (e: LayerAddEvent) => void;
  Toolbar: {
    toggleButton: (name: string, enabled: boolean) => void;
  };

  enableGlobalRemovalMode(): void;
  disableGlobalRemovalMode(): void;
  globalRemovalEnabled(): boolean;
  globalRemovalModeEnabled(): boolean;
  toggleGlobalRemovalMode(): void;
  removeLayer(e: ClickEvent): void;
  _isRelevantForRemoval(layer: PMLayer): boolean;
  handleLayerAdditionInGlobalRemovalMode(): void;
  _layerAddedRemoval(e: LayerAddEvent): void;
  _fireGlobalRemovalModeToggled(enabled: boolean): void;
  _fireRemoveLayerGroup(layerOrMap: L.Layer | L.Map, layer?: L.Layer): void;
}

const GlobalRemovalMode = {
  _globalRemovalModeEnabled: false,
  enableGlobalRemovalMode(this: IGlobalRemovalMode) {
    this._globalRemovalModeEnabled = true;
    // handle existing layers
    this.map.eachLayer((layer) => {
      if (this._isRelevantForRemoval(layer as PMLayer)) {
        if ((layer as PMLayer).pm!.enabled()) {
          (layer as PMLayer).pm!.disable();
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
  disableGlobalRemovalMode(this: IGlobalRemovalMode) {
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
  globalRemovalEnabled(this: IGlobalRemovalMode) {
    return this.globalRemovalModeEnabled();
  },
  globalRemovalModeEnabled(this: IGlobalRemovalMode) {
    return !!this._globalRemovalModeEnabled;
  },
  toggleGlobalRemovalMode(this: IGlobalRemovalMode) {
    // toggle global edit mode
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  removeLayer(this: IGlobalRemovalMode, e: ClickEvent) {
    const layer = e.target;
    // only remove layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged
    const removeable =
      this._isRelevantForRemoval(layer) && !layer.pm!.dragging();

    if (removeable) {
      layer.removeFrom(this.map.pm._getContainingLayer() as L.Map);
      layer.remove();
      if (layer instanceof L.LayerGroup) {
        this._fireRemoveLayerGroup(layer);
        this._fireRemoveLayerGroup(this.map, layer);
      } else {
        layer.pm!._fireRemove(layer);
        layer.pm!._fireRemove(this.map, layer);
      }
    }
  },
  _isRelevantForRemoval(layer: PMLayer) {
    return (
      layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      layer.pm.options.allowRemoval
    );
  },
  handleLayerAdditionInGlobalRemovalMode(this: IGlobalRemovalMode) {
    const layers = this._addedLayersRemoval;
    this._addedLayersRemoval = {};
    if (this.globalRemovalModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        if (this._isRelevantForRemoval(layer)) {
          if (layer.pm!.enabled()) {
            layer.pm!.disable();
          }
          layer.on('click', this.removeLayer, this);
        }
      }
    }
  },
  _layerAddedRemoval(this: IGlobalRemovalMode, { layer }: LayerAddEvent) {
    this._addedLayersRemoval[L.stamp(layer)] = layer;
  },
};

export default GlobalRemovalMode;
