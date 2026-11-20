import * as L from 'leaflet';
import { PM } from '../PM';
import type { EditOptions } from './L.PM.Edit';

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
    getLayers?: (
      deep?: boolean,
      filterGeoman?: boolean,
      filterGroupsOut?: boolean,
      layerIds?: number[]
    ) => PMLayer[];
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
import Edit from './L.PM.Edit';

// LayerGroup doesn't inherit from PM.Edit because it's just calling PM.Edit.Polygon
// (which inherits from PM.Edit) for each layer,
// so it's not really a parent class
class EditLayerGroup {
  declare _layerGroup: ExtendedLayerGroup;
  declare _map?: ExtendedMap;
  declare _options?: EditOptions;
  declare options?: EditOptions;

  constructor(layerGroup: L.LayerGroup) {
    // an empty own options object, as the Leaflet 1 style class factory made
    L.Util.setOptions(this, undefined as never);
    this._layerGroup = layerGroup as typeof this._layerGroup;

    // A layer added to a group that is being edited in global edit mode is
    // enabled with the group's options. Membership itself is not stored: it is
    // read from the group when needed. layeradd is a FeatureGroup event
    // (https://github.com/Leaflet/Leaflet/issues/4861).
    (this._layerGroup as unknown as L.FeatureGroup).on(
      'layeradd',
      (e: L.LayerEvent) => {
        const layer = e.layer as PMLayer;
        // Cheap checks first: this runs for every layer added to the group,
        // so bulk adds outside edit mode must not scan the group.
        if (
          layer._pmTempLayer ||
          layer instanceof L.LayerGroup ||
          !layer.pm ||
          !layer._map?.pm?.globalEditModeEnabled() ||
          !this.getLayers().includes(layer) ||
          !this.enabled()
        ) {
          return;
        }
        layer.pm!.enable(this.getOptions());
      },
      this
    );
  }
  enable(options?: EditOptions, _layerIds: number[] = []) {
    this._options = options;
    this.getLayers().forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
          _layerIds.push(layer._leaflet_id!);
          layer.pm!.enable(options, _layerIds);
        }
      } else {
        layer.pm!.enable(options);
      }
    });
  }
  disable(_layerIds: number[] = []) {
    this.getLayers().forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
          _layerIds.push(layer._leaflet_id!);
          layer.pm!.disable(_layerIds);
        }
      } else {
        layer.pm!.disable();
      }
    });
  }
  enabled(_layerIds: number[] = []) {
    const enabled = this.getLayers().find((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
          _layerIds.push(layer._leaflet_id!);
          return layer.pm!.enabled(_layerIds);
        }
        return false; // enabled is already returned because this is not the first time, so we can return always false
      }
      return layer.pm!.enabled();
    });
    return !!enabled;
  }
  toggleEdit(options?: EditOptions, _layerIds: number[] = []) {
    this._options = options;
    this.getLayers().forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
          _layerIds.push(layer._leaflet_id!);
          layer.pm!.toggleEdit(options, _layerIds);
        }
      } else {
        layer.pm!.toggleEdit(options);
      }
    });
  }
  dragging() {
    return this.getLayers().some((layer) => layer.pm!.dragging());
  }
  getOptions() {
    return this.options;
  }
  _getMap(): ExtendedMap | null {
    return this._map || this.getLayers().find((l) => !!l._map)?._map || null;
  }
  getLayers(
    deep = false,
    filterGeoman = true,
    filterGroupsOut = true,
    _layerIds: number[] = []
  ): PMLayer[] {
    let layers: PMLayer[] = [];
    if (deep) {
      // get the layers of LayerGroup children
      (this._layerGroup.getLayers() as PMLayer[]).forEach((layer) => {
        layers.push(layer);
        if (layer instanceof L.LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
            _layerIds.push(layer._leaflet_id!);
            layers = layers.concat(
              (layer.pm as NonNullable<PMLayer['pm']>).getLayers!(
                true,
                true,
                true,
                _layerIds
              )
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
      layers = layers.filter((layer) => PM.Utils.isGeomanLayer(layer));
    }
    return layers;
  }
  setOptions(options?: EditOptions, _layerIds: number[] = []) {
    this.options = options;
    this.getLayers().forEach((layer) => {
      if (layer.pm) {
        if (layer instanceof L.LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id!) === -1) {
            _layerIds.push(layer._leaflet_id!);
            layer.pm!.setOptions(options, _layerIds);
          }
        } else {
          layer.pm!.setOptions(options);
        }
      }
    });
  }
}

Edit.LayerGroup = EditLayerGroup;

export default EditLayerGroup;
