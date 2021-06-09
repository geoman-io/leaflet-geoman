import Edit from './L.PM.Edit';

// LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Polygon
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class
Edit.LayerGroup = L.Class.extend({
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
      if (e.layer._pmTempLayer) {
        return;
      }
      this._layers = this.getLayers();
      const _initLayers = this._layers.filter(
        (layer) =>
          !layer.pm._parentLayerGroup ||
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
        this._getMap().pm.globalEditModeEnabled()
      ) {
        if (this.enabled()) {
          this.enable(this.getOptions());
        }
      }
    };
    this._layerGroup.on(
      'layeradd',
      L.Util.throttle(addThrottle, 100, this),
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
      if (e.target._pmTempLayer) {
        return;
      }
      this._layers = this.getLayers();
    };
    // if a layer is removed from the group, calc the layers list again.
    // we run this as throttle because the findLayers() is a larger function
    this._layerGroup.on(
      'layerremove',
      L.Util.throttle(removeThrottle, 100, this),
      this
    );
  },
  enable(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.pm.enable(options, _layerIds);
        }
      } else {
        layer.pm.enable(options);
      }
    });
  },
  disable(_layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.pm.disable(_layerIds);
        }
      } else {
        layer.pm.disable();
      }
    });
  },
  enabled(_layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    const enabled = this._layers.find((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          return layer.pm.enabled(_layerIds);
        }
        return false; // enabled is already returned because this is not the first time, so we can return always false
      }
      return layer.pm.enabled();
    });
    return !!enabled;
  },
  toggleEdit(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this._options = options;
    this._layers.forEach((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          layer.pm.toggleEdit(options, _layerIds);
        }
      } else {
        layer.pm.toggleEdit(options);
      }
    });
  },
  _initLayer(layer) {
    // add reference for the group to each layer inside said group by id, a layer can have multiple groups
    const id = L.Util.stamp(this._layerGroup);
    if (!layer.pm._parentLayerGroup) {
      layer.pm._parentLayerGroup = {};
    }
    layer.pm._parentLayerGroup[id] = this._layerGroup;
  },
  _removeLayerFromGroup(layer) {
    if (layer.pm && layer.pm._layerGroup) {
      const id = L.Util.stamp(this._layerGroup);
      delete layer.pm._layerGroup[id];
    }
  },
  dragging() {
    this._layers = this.getLayers();
    if (this._layers) {
      const dragging = this._layers.find((layer) => layer.pm.dragging());
      return !!dragging;
    }
    return false;
  },
  getOptions() {
    return this.options;
  },
  _getMap() {
    return this._map || this._layers.find((l) => !!l._map)?._map || null;
  },
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
        if (layer instanceof L.LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id) === -1) {
            _layerIds.push(layer._leaflet_id);
            layers = layers.concat(
              layer.pm.getLayers(true, true, true, _layerIds)
            );
          }
        }
      });
    } else {
      // get all layers of the layer group
      layers = this._layerGroup.getLayers();
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
  setOptions(options, _layerIds = []) {
    if (_layerIds.length === 0) {
      this._layers = this.getLayers();
    }
    this.options = options;
    this._layers.forEach((layer) => {
      if (layer.pm) {
        if (layer instanceof L.LayerGroup) {
          if (_layerIds.indexOf(layer._leaflet_id) === -1) {
            _layerIds.push(layer._leaflet_id);
            layer.pm.setOptions(options, _layerIds);
          }
        } else {
          layer.pm.setOptions(options);
        }
      }
    });
  },
});
