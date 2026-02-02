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
    enableRotate: () => void;
    disableRotate: () => void;
    options: {
      allowRotation?: boolean;
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
 * Global Rotate Mode mixin interface
 */
export interface IGlobalRotateMode {
  map: L.Map;
  _globalRotateModeEnabled: boolean;
  _addedLayersRotate: Record<number, PMLayer>;
  throttledReInitRotate?: (e: LayerAddEvent) => void;
  Toolbar: {
    toggleButton: (name: string, enabled: boolean) => void;
  };

  enableGlobalRotateMode(): void;
  disableGlobalRotateMode(): void;
  globalRotateModeEnabled(): boolean;
  toggleGlobalRotateMode(): void;
  _isRelevantForRotate(layer: PMLayer): boolean;
  _isRelevantForRemoval(layer: PMLayer): boolean;
  handleLayerAdditionInGlobalRotateMode(): void;
  _layerAddedRotate(e: LayerAddEvent): void;
  _fireGlobalRotateModeToggled(): void;
}

const GlobalRotateMode: IGlobalRotateMode = {
  _globalRotateModeEnabled: false,
  _addedLayersRotate: {},
  map: null as unknown as L.Map,
  Toolbar: null as unknown as IGlobalRotateMode['Toolbar'],
  enableGlobalRotateMode(this: IGlobalRotateMode) {
    this._globalRotateModeEnabled = true;
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l: PMLayer) => l instanceof L.Polyline
    );
    layers.forEach((layer: PMLayer) => {
      if (this._isRelevantForRotate(layer)) {
        layer.pm?.enableRotate();
      }
    });

    if (!this.throttledReInitRotate) {
      this.throttledReInitRotate = L.Util.throttle(
        this.handleLayerAdditionInGlobalRotateMode,
        100,
        this
      );
    }

    this._addedLayersRotate = {};
    // handle layers that are added while in rotate mode
    this.map.on('layeradd', this._layerAddedRotate as L.LeafletEventHandlerFn, this);
    this.map.on('layeradd', this.throttledReInitRotate as L.LeafletEventHandlerFn, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('rotateMode', this.globalRotateModeEnabled());
    this._fireGlobalRotateModeToggled();
  },
  disableGlobalRotateMode(this: IGlobalRotateMode) {
    this._globalRotateModeEnabled = false;
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l: PMLayer) => l instanceof L.Polyline
    );
    layers.forEach((layer: PMLayer) => {
      layer.pm?.disableRotate();
    });

    // remove map handler
    this.map.off('layeradd', this._layerAddedRotate as L.LeafletEventHandlerFn, this);
    this.map.off('layeradd', this.throttledReInitRotate as L.LeafletEventHandlerFn, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('rotateMode', this.globalRotateModeEnabled());
    this._fireGlobalRotateModeToggled();
  },
  globalRotateModeEnabled(this: IGlobalRotateMode) {
    return !!this._globalRotateModeEnabled;
  },
  toggleGlobalRotateMode(this: IGlobalRotateMode) {
    if (this.globalRotateModeEnabled()) {
      this.disableGlobalRotateMode();
    } else {
      this.enableGlobalRotateMode();
    }
  },
  _isRelevantForRotate(layer: PMLayer) {
    return (
      !!layer.pm &&
      layer instanceof L.Polyline &&
      !(layer instanceof L.LayerGroup) &&
      ((!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false)) && // if optIn is true and pmIgnore is false
      !layer._pmTempLayer &&
      !!layer.pm.options.allowRotation
    );
  },
  _isRelevantForRemoval() {
    // This method is called but should be _isRelevantForRotate - appears to be a bug in original code
    return false;
  },
  handleLayerAdditionInGlobalRotateMode(this: IGlobalRotateMode) {
    const layers = this._addedLayersRotate;
    this._addedLayersRotate = {};
    if (this.globalRotateModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];
        // Note: Original code calls _isRelevantForRemoval but should be _isRelevantForRotate
        if (this._isRelevantForRotate(layer)) {
          layer.pm?.enableRotate();
        }
      }
    }
  },
  _layerAddedRotate(this: IGlobalRotateMode, { layer }: LayerAddEvent) {
    this._addedLayersRotate[L.Util.stamp(layer)] = layer;
  },
  _fireGlobalRotateModeToggled() {
    // Implemented in Events mixin
  },
};

export default GlobalRotateMode;
