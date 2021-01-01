import Edit from './L.PM.Edit';

// LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Polygon
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class
Edit.LayerGroup = L.Class.extend({
  initialize(layerGroup) {
    this._layerGroup = layerGroup;
    this._layers = this.findLayers();

    // init all layers of the group
    this._layers.forEach(layer => this._initLayer(layer));

    // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861

    const addThrottle = (e) => {
      if (e.target._pmTempLayer) {
        return;
      }
      this._layers = this.findLayers();
      const _initLayers = this._layers.filter((layer) => !layer.pm._parentLayerGroup || !(this._layerGroup._leaflet_id in layer.pm._parentLayerGroup));
      // init the newly added layers (can be multiple because of the throttle)
      _initLayers.forEach((layer) => {
        this._initLayer(layer);
      });
      // if editing was already enabled for this group, enable it again
      // so the new layers are enabled
      if (_initLayers.length > 0) {
        if (this.enabled()) {
          this.enable(this.getOptions());
        }
      }
    };
    this._layerGroup.on('layeradd', L.Util.throttle(addThrottle, 100, this), this);

    // Remove the layergroup from the layer
    this._layerGroup.on('layerremove', (e) => {
      this._removeLayerFromGroup(e.target);
    }, this);

    const removeThrottle = (e) => {
      if (e.target._pmTempLayer) {
        return;
      }
      this._layers = this.findLayers();
    };
    // if a layer is removed from the group, calc the layers list again.
    // we run this as throttle because the findLayers() is a larger function
    this._layerGroup.on('layerremove', L.Util.throttle(removeThrottle, 100, this), this);
  },
  enable(options, _layerIds = []) {
    this._options = options;
    this._layers.forEach(layer => {
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
    this._layers.forEach(layer => {
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

    const enabled = this._layers.find((layer) => {
      if (layer instanceof L.LayerGroup) {
        if (_layerIds.indexOf(layer._leaflet_id) === -1) {
          _layerIds.push(layer._leaflet_id);
          return layer.pm.enabled(_layerIds);
        }
        return false; // enabled is already returned because this is not the first time, so we can return always false
      } else {
        return layer.pm.enabled();
      }
    });

    return !!enabled;
  },
  toggleEdit(options, _layerIds = []) {
    this._options = options;
    this._layers.forEach(layer => {
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
    if(layer.pm && layer.pm._layerGroup) {
      const id = L.Util.stamp(this._layerGroup);
      delete layer.pm._layerGroup[id];
    }
  },
  findLayers() {
    // get all layers of the layer group
    let layers = this._layerGroup.getLayers();
    // filter out layers that don't have leaflet-geoman
    layers = layers.filter(layer => !!layer.pm);
    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);
    // return them
    return layers;
  },
  dragging() {
    if (this._layers) {
      const dragging = this._layers.find(layer => layer.pm.dragging());
      return !!dragging;
    }
    return false;
  },
  getOptions() {
    return this._options;
  },
  removeLayer(){
    this._groups = [this._layerGroup._map];
    if(this._layerGroup._map.pm._getContainingLayer().hasLayer(this._layerGroup)){
      this._groups.push(this._layerGroup._map.pm._getContainingLayer());
    }
    this._groups.forEach((group)=>{
      this._layerGroup.removeFrom(group);
    });
  },
  addLayer(){
    if(this._groups && this._groups.length > 0) {
      this._groups.forEach((group)=>{
        this._layerGroup.addTo(group);
      });
    }else{
      this._layerGroup.addTo(this._layerGroup._map.pm._getContainingLayer());
    }
  }
});
