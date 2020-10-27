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
      const _initLayers = this._layers.filter((layer) => !layer._layerGroup || layer._layerGroup.indexOf(this._layerGroup) === -1);
      // init the newly added layers
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
      const id = L.Util.stamp(this._layerGroup);
      delete e.target.pm._layerGroup[id];
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
  enable(options) {
    this._options = options;
    if (this._layers) {
      this._layers.forEach(layer => {
        layer.pm.enable(options);
      });
    }
  },
  disable() {
    if (this._layers) {
      this._layers.forEach(layer => {
        layer.pm.disable();
      });
    }
  },
  enabled() {
    if (this._layers) {
      const enabled = this._layers.find(layer => layer.pm.enabled());
      return !!enabled;
    }
    return false;

  },
  toggleEdit(options) {
    this._options = options;
    if (this._layers) {
      this._layers.forEach(layer => {
        layer.pm.toggleEdit(options);
      });
    }
  },
  _initLayer(layer) {
    // available events
    const availableEvents = [
      'pm:edit',
      'pm:update',
      'pm:enable',
      'pm:disable',
      'pm:remove',
      'pm:dragstart',
      'pm:drag',
      'pm:dragend',
      'pm:snap',
      'pm:unsnap',
      'pm:cut',
      'pm:intersect',
      'pm:markerdragstart',
      'pm:markerdrag',
      'pm:markerdragend',
      'pm:vertexadded',
      'pm:vertexremoved',
      'pm:centerplaced',
    ];

    // listen to the events of the layers in this group
    availableEvents.forEach(event => {
      layer.on(event, this._fireEvent, this);
    });

    // add reference for the group to each layer inside said group by id
    const id = L.Util.stamp(this._layerGroup);
    if(!layer.pm._layerGroup){
      layer.pm._layerGroup = {};
    }
    layer.pm._layerGroup[id] = this._layerGroup;
  },
  findLayers() {
    // get all layers of the layer group
    let layers = this._layerGroup.getLayers();

    // filter out layers that are no layerGroup
    //   layers = layers.filter(layer => !(layer instanceof L.LayerGroup));

    // filter out layers that don't have leaflet-geoman
    layers = layers.filter(layer => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);

    // return them
    return layers;
  },
  _fireEvent(e) {
    this._layerGroup.fireEvent(e.type, e);
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
});
