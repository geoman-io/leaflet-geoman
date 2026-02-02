import Edit, { EditOptions } from './L.PM.Edit';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    optIn: boolean;
  };
  Class: {
    extend: <T>(props: T) => new (...args: unknown[]) => T;
  };
  Util: {
    stamp: (obj: object) => number;
    throttle: <T>(
      fn: T,
      time: number,
      context?: unknown
    ) => T;
  };
};

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    globalEditModeEnabled: () => boolean;
  };
};

/**
 * Extended layer with PM properties
 */
type PMLayer = L.Layer & {
  _map?: ExtendedMap;
  _pmTempLayer?: boolean;
  _leaflet_id?: number;
  pm?: {
    enable: (options?: object, layerIds?: number[]) => void;
    disable: (layerIds?: number[]) => void;
    enabled: (layerIds?: number[]) => boolean;
    toggleEdit: (options?: object, layerIds?: number[]) => void;
    setOptions: (options?: object, layerIds?: number[]) => void;
    dragging: () => boolean;
    _parentLayerGroup?: Record<number, L.LayerGroup>;
    _layerGroup?: Record<number, L.LayerGroup>;
    getLayers?: (
      deep?: boolean,
      filterGeoman?: boolean,
      filterGroupsOut?: boolean,
      layerIds?: number[]
    ) => PMLayer[];
  };
  options: L.LayerOptions & {
    pmIgnore?: boolean;
  };
};

/**
 * Extended layer group
 */
type ExtendedLayerGroup = L.LayerGroup & {
  _leaflet_id: number;
  pm: {
    enable: (options?: object, layerIds?: number[]) => void;
    disable: (layerIds?: number[]) => void;
    enabled: (layerIds?: number[]) => boolean;
    toggleEdit: (options?: object, layerIds?: number[]) => void;
    setOptions: (options?: object, layerIds?: number[]) => void;
    getLayers: (
      deep?: boolean,
      filterGeoman?: boolean,
      filterGroupsOut?: boolean,
      layerIds?: number[]
    ) => PMLayer[];
  };
};

/**
 * Layer event with layer
 */
interface LayerEvent {
  layer: PMLayer;
  target: PMLayer;
}

/**
 * Edit LayerGroup interface
 */
interface IEditLayerGroup {
  _layerGroup: ExtendedLayerGroup;
  _layers: PMLayer[];
  _map?: ExtendedMap;
  _options?: EditOptions;
  options?: EditOptions;

  enable(options?: EditOptions, _layerIds?: number[]): void;
  disable(_layerIds?: number[]): void;
  enabled(_layerIds?: number[]): boolean;
  toggleEdit(options?: EditOptions, _layerIds?: number[]): void;
  _initLayer(layer: PMLayer): void;
  _removeLayerFromGroup(layer: PMLayer): void;
  dragging(): boolean;
  getOptions(): EditOptions | undefined;
  _getMap(): ExtendedMap | null;
  getLayers(
    deep?: boolean,
    filterGeoman?: boolean,
    filterGroupsOut?: boolean,
    _layerIds?: number[]
  ): PMLayer[];
  setOptions(options?: EditOptions, _layerIds?: number[]): void;
}

// LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Polygon
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class
const EditLayerGroup = L.Class.extend({
  initialize(this: IEditLayerGroup, layerGroup: L.LayerGroup) {
    this._layerGroup = layerGroup as ExtendedLayerGroup;
    this._layers = this.getLayers();
    this._getMap();

    // init all layers of the group
    this._layers.forEach((layer) => this._initLayer(layer));

    // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861

    const addThrottle = (e: LayerEvent) => {
      if (e.layer._pmTempLayer) {
        return;
      }
      this._layers = this.getLayers();
      const _initLayers = this._layers.filter(
        (layer) =>
          !layer.pm?._parentLayerGroup ||
          !(this._layerGroup._leaflet_id in layer.pm._parentLayerGroup)
      );
      // init the newly added layers (can be multiple because of the throttle)
      _initLayers.forEach((layer) => {
        this._initLayer(layer);
      });
      // if editing was already enabled for this group, enable it again
      // so the new layers are enabled
      if (
        _initLayers.length > 0 &&
        this._getMap() &&
        this._getMap()!.pm.globalEditModeEnabled()
      ) {
        if (this.enabled()) {
          this.enable(this.getOptions());
        }
      }
    };
    this._layerGroup.on(
      'layeradd',
      L.Util.throttle(addThrottle, 100, this) as L.LeafletEventHandlerFn,
      this
    );

    // Remove the layergroup from the layer
    this._layerGroup.on(
      'layerremove',
      (e: LayerEvent) => {
        this._removeLayerFromGroup(e.target);
      },
      this
    );

    const removeThrottle = (e: LayerEvent) => {
      if (e.target._pmTempLayer) {
        return;
      }
      this._layers = this.getLayers();
    };
    // if a layer is removed from the group, calc the layers list again.
    // we run this as throttle because the findLayers() is a larger function
    this._layerGroup.on(
      'layerremove',
      L.Util.throttle(removeThrottle, 100, this) as L.LeafletEventHandlerFn,
      this
    );
  },
  enable(this: IEditLayerGroup, options?: EditOptions, _layerIds: number[] = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        const layerGroup = layer as unknown as ExtendedLayerGroup;
        if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
          _layerIds.push(layerGroup._leaflet_id);
          layerGroup.pm.enable(options, _layerIds);
        }
      } else {
        layer.pm?.enable(options);
      }
    });
  },
  disable(this: IEditLayerGroup, _layerIds: number[] = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        const layerGroup = layer as unknown as ExtendedLayerGroup;
        if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
          _layerIds.push(layerGroup._leaflet_id);
          layerGroup.pm.disable(_layerIds);
        }
      } else {
        layer.pm?.disable();
      }
    });
  },
  enabled(this: IEditLayerGroup, _layerIds: number[] = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    const enabled = this._layers.find((layer) => {
      if (layer instanceof L.LayerGroup) {
        const layerGroup = layer as unknown as ExtendedLayerGroup;
        if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
          _layerIds.push(layerGroup._leaflet_id);
          return layerGroup.pm.enabled(_layerIds);
        }
        return false; // enabled is already returned because this is not the first time, so we can return always false
      }
      return layer.pm?.enabled();
    });
    return !!enabled;
  },
  toggleEdit(this: IEditLayerGroup, options?: EditOptions, _layerIds: number[] = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        const layerGroup = layer as unknown as ExtendedLayerGroup;
        if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
          _layerIds.push(layerGroup._leaflet_id);
          layerGroup.pm.toggleEdit(options, _layerIds);
        }
      } else {
        layer.pm?.toggleEdit(options);
      }
    });
  },
  _initLayer(this: IEditLayerGroup, layer: PMLayer) {
    // add reference for the group to each layer inside said group by id, a layer can have multiple groups
    const id = L.Util.stamp(this._layerGroup);
    if (!layer.pm?._parentLayerGroup) {
      if (layer.pm) {
        layer.pm._parentLayerGroup = {};
      }
    }
    if (layer.pm?._parentLayerGroup) {
      layer.pm._parentLayerGroup[id] = this._layerGroup;
    }
  },
  _removeLayerFromGroup(this: IEditLayerGroup, layer: PMLayer) {
    if (layer.pm && layer.pm._layerGroup) {
      const id = L.Util.stamp(this._layerGroup);
      delete layer.pm._layerGroup[id];
    }
  },
  dragging(this: IEditLayerGroup) {
    this._layers = this.getLayers();
    if (this._layers) {
      const dragging = this._layers.find((layer) => layer.pm?.dragging());
      return !!dragging;
    }
    return false;
  },
  getOptions(this: IEditLayerGroup) {
    return this.options;
  },
  _getMap(this: IEditLayerGroup): ExtendedMap | null {
    return (
      this._map ||
      (this._layers.find((l) => !!l._map)?._map as ExtendedMap | undefined) ||
      null
    );
  },
  getLayers(
    this: IEditLayerGroup,
    deep = false,
    filterGeoman = true,
    filterGroupsOut = true,
    _layerIds: number[] = []
  ): PMLayer[] {
    let layers: PMLayer[] = [];
    if (deep) {
      // get the layers of LayerGroup children
      this._layerGroup.getLayers().forEach((layer) => {
        layers.push(layer as PMLayer);
        if (layer instanceof L.LayerGroup) {
          const layerGroup = layer as unknown as ExtendedLayerGroup;
          if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
            _layerIds.push(layerGroup._leaflet_id);
            layers = layers.concat(
              layerGroup.pm.getLayers(true, true, true, _layerIds)
            );
          }
        }
      });
    } else {
      // get all layers of the layer group
      layers = this._layerGroup.getLayers() as PMLayer[];
    }

    if (filterGroupsOut) {
      layers = layers.filter((layer) => !(layer instanceof L.LayerGroup));
    }
    if (filterGeoman) {
      // filter out layers that don't have leaflet-geoman
      layers = layers.filter((layer) => !!layer.pm);
      // filter out everything that's leaflet-geoman specific temporary stuff
      layers = layers.filter((layer) => !layer._pmTempLayer);
      // filter out everything that ignore leaflet-geoman
      layers = layers.filter(
        (layer) =>
          (!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
          (L.PM.optIn && layer.options.pmIgnore === false) // if optIn is true and pmIgnore is false);
      );
    }
    return layers;
  },
  setOptions(
    this: IEditLayerGroup,
    options?: EditOptions,
    _layerIds: number[] = []
  ) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this.options = options;
    this._layers.forEach((layer) => {
      if (layer.pm) {
        if (layer instanceof L.LayerGroup) {
          const layerGroup = layer as unknown as ExtendedLayerGroup;
          if (_layerIds.indexOf(layerGroup._leaflet_id) === -1) {
            _layerIds.push(layerGroup._leaflet_id);
            layerGroup.pm.setOptions(options, _layerIds);
          }
        } else {
          layer.pm.setOptions(options);
        }
      }
    });
  },
});

// Assign to Edit class
(Edit as unknown as { LayerGroup: unknown }).LayerGroup = EditLayerGroup;

export default EditLayerGroup;
