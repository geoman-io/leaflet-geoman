// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    optIn: boolean;
    Utils: {
      findLayers: (map: L.Map) => PMLayer[];
    };
  };
  Util: {
    stamp: (obj: object) => number;
    throttle: <T>(fn: T, time: number, context?: unknown) => T;
  };
};

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  _pmTempLayer?: boolean;
  pm?: {
    enableLayerDrag: () => void;
    disableLayerDrag: () => void;
    options: {
      draggable?: boolean;
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
 * Global Drag Mode mixin interface
 */
export interface IGlobalDragMode {
  map: L.Map;
  _globalDragModeEnabled: boolean;
  _addedLayersDrag: Record<number, PMLayer>;
  throttledReInitDrag?: (e: LayerAddEvent) => void;
  Toolbar: {
    toggleButton: (name: string, enabled: boolean) => void;
  };

  enableGlobalDragMode(): void;
  disableGlobalDragMode(): void;
  globalDragModeEnabled(): boolean;
  toggleGlobalDragMode(): void;
  reinitGlobalDragMode(): void;
  _layerAddedDrag(e: LayerAddEvent): void;
  _isRelevantForDrag(layer: PMLayer): boolean;
  _fireGlobalDragModeToggled(enabled: boolean): void;
}

const GlobalDragMode = {
  _globalDragModeEnabled: false,
  enableGlobalDragMode(this: IGlobalDragMode) {
    const layers = L.PM.Utils.findLayers(this.map);

    this._globalDragModeEnabled = true;
    this._addedLayersDrag = {};

    layers.forEach((layer: PMLayer) => {
      if (this._isRelevantForDrag(layer)) {
        layer.pm?.enableLayerDrag();
      }
    });

    if (!this.throttledReInitDrag) {
      this.throttledReInitDrag = L.Util.throttle(
        this.reinitGlobalDragMode,
        100,
        this
      );
    }

    // add map handler
    this.map.on(
      'layeradd',
      this._layerAddedDrag as L.LeafletEventHandlerFn,
      this
    );
    this.map.on(
      'layeradd',
      this.throttledReInitDrag as L.LeafletEventHandlerFn,
      this
    );

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(true);
  },
  disableGlobalDragMode(this: IGlobalDragMode) {
    const layers = L.PM.Utils.findLayers(this.map);

    this._globalDragModeEnabled = false;

    layers.forEach((layer: PMLayer) => {
      layer.pm?.disableLayerDrag();
    });

    // remove map handler
    this.map.off(
      'layeradd',
      this._layerAddedDrag as L.LeafletEventHandlerFn,
      this
    );
    this.map.off(
      'layeradd',
      this.throttledReInitDrag as L.LeafletEventHandlerFn,
      this
    );

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(false);
  },
  globalDragModeEnabled(this: IGlobalDragMode) {
    return !!this._globalDragModeEnabled;
  },
  toggleGlobalDragMode(this: IGlobalDragMode) {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  reinitGlobalDragMode(this: IGlobalDragMode) {
    const layers = this._addedLayersDrag;
    this._addedLayersDrag = {};
    if (this.globalDragModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];

        if (this._isRelevantForDrag(layer)) {
          layer.pm?.enableLayerDrag();
        }
      }
    }
  },
  _layerAddedDrag(this: IGlobalDragMode, { layer }: LayerAddEvent) {
    this._addedLayersDrag[L.Util.stamp(layer)] = layer;
  },
  _isRelevantForDrag(layer: PMLayer) {
    return (
      !!layer.pm &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      !!layer.pm.options.draggable
    );
  },
};

export default GlobalDragMode;
