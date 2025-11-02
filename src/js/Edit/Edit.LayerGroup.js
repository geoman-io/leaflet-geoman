import { Class, LayerGroup, Util } from 'leaflet';
import Geoman from '../Geoman';

// LayerGroup doesn't inherit from Geoman.Edit because it's just calling Geoman.Edit.Polygon
// (which inherits from Geoman.Edit) for each layer,
// so it's not really a parent class
export default class GeomanEditLayerGroup extends Class {
  initialize(layerGroup) {
    this._layerGroup = layerGroup;
    this._layers = this.getLayers();
    this._getMap();

    // init all layers of the group
    this._layers.forEach((layer) => this._initLayer(layer));

    // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861

    const addThrottle = (e) => {
      if (e.layer._geomanTempLayer) {
        return;
      }
      this._layers = this.getLayers();
      const _initLayers = this._layers.filter(
        (layer) =>
          !layer.geoman._parentLayerGroup ||
          !(this._layerGroup._leaflet_id in layer.geoman._parentLayerGroup)
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
        this._getMap().geoman.globalEditModeEnabled()
      ) {
        if (this.enabled()) {
          this.enable(this.getOptions());
        }
      }
    };
    this._layerGroup.on(
      'layeradd',
      Util.throttle(addThrottle, 100, this),
      this
    );

    // Remove the layergroup from the layer
    this._layerGroup.on(
      'layerremove',
      (e) => {
        this._removeLayerFromGroup(e.target);
      },
      this
    );

    const removeThrottle = (e) => {
      if (e.target._geomanTempLayer) {
        return;
      }
      this._layers = this.getLayers();
    };
    // if a layer is removed from the group, calc the layers list again.
    // we run this as throttle because the findLayers() is a larger function
    this._layerGroup.on(
      'layerremove',
      Util.throttle(removeThrottle, 100, this),
      this
    );
  }

  enable(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.geoman.enable(options, _layerIds);
        }
      } else {
        layer.geoman.enable(options);
      }
    });
  }

  disable(_layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._layers.forEach((layer) => {
      if (layer instanceof LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.geoman.disable(_layerIds);
        }
      } else {
        layer.geoman.disable();
      }
    });
  }

  enabled(_layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    const enabled = this._layers.find((layer) => {
      if (layer instanceof LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          return layer.geoman.enabled(_layerIds);
        }
        return false; // enabled is already returned because this is not the first time, so we can return always false
      }
      return layer.geoman.enabled();
    });
    return !!enabled;
  }

  toggleEdit(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.geoman.toggleEdit(options, _layerIds);
        }
      } else {
        layer.geoman.toggleEdit(options);
      }
    });
  }

  _initLayer(layer) {
    // add reference for the group to each layer inside said group by id, a layer can have multiple groups
    const id = Util.stamp(this._layerGroup);
    if (!layer.geoman._parentLayerGroup) {
      layer.geoman._parentLayerGroup = {};
    }
    layer.geoman._parentLayerGroup[id] = this._layerGroup;
  }

  _removeLayerFromGroup(layer) {
    if (layer.geoman && layer.geoman._layerGroup) {
      const id = Util.stamp(this._layerGroup);
      delete layer.geoman._layerGroup[id];
    }
  }

  dragging() {
    this._layers = this.getLayers();
    if (this._layers) {
      const dragging = this._layers.find((layer) => layer.geoman.dragging());
      return !!dragging;
    }
    return false;
  }

  getOptions() {
    return this.options;
  }

  _getMap() {
    return this._map || this._layers.find((l) => !!l._map)?._map || null;
  }

  getLayers(
    deep = false,
    filterGeoman = true,
    filterGroupsOut = true,
    _layerIds = []
  ) {
    let layers = [];
    if (deep) {
      // get the layers of LayerGroup children
      this._layerGroup.getLayers().forEach((layer) => {
        layers.push(layer);
        if (layer instanceof LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id) === -1) {
            _layerIds.push(layer._leaflet_id);
            layers = layers.concat(
              layer.geoman.getLayers(true, true, true, _layerIds)
            );
          }
        }
      });
    } else {
      // get all layers of the layer group
      layers = this._layerGroup.getLayers();
    }

    if (filterGroupsOut) {
      layers = layers.filter((layer) => !(layer instanceof LayerGroup));
    }
    if (filterGeoman) {
      // filter out layers that don't have leaflet-geoman
      layers = layers.filter((layer) => !!layer.geoman);
      // filter out everything that's leaflet-geoman specific temporary stuff
      layers = layers.filter((layer) => !layer._geomanTempLayer);
      // filter out everything that ignore leaflet-geoman
      layers = layers.filter(
        (layer) =>
          (!Geoman.optIn && !layer.options.geomanIgnore) || // if optIn is not set / true and geomanIgnore is not set / true (default)
          (Geoman.optIn && layer.options.geomanIgnore === false) // if optIn is true and geomanIgnore is false);
      );
    }
    return layers;
  }

  setOptions(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this.options = options;
    this._layers.forEach((layer) => {
      if (layer.geoman) {
        if (layer instanceof LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id) === -1) {
            _layerIds.push(layer._leaflet_id);
            layer.geoman.setOptions(options, _layerIds);
          }
        } else {
          layer.geoman.setOptions(options);
        }
      }
    });
  }
}
