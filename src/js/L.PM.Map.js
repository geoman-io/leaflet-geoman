const Map = L.Class.extend({
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);

    this._globalRemovalMode = false;
  },
  addControls(options) {
    this.Toolbar.addControls(options);
  },
  removeControls() {
    this.Toolbar.removeControls();
  },
  toggleControls() {
    this.Toolbar.toggleControls();
  },
  controlsVisible() {
    return this.Toolbar.isVisible;
  },
  enableDraw(shape = 'Poly', options) {
    this.Draw.enable(shape, options);
  },
  disableDraw(shape = 'Poly') {
    this.Draw.disable(shape);
  },
  setPathOptions(options) {
    this.Draw.setPathOptions(options);
  },
  findLayers() {
    let layers = [];
    this.map.eachLayer(layer => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle
      ) {
        layers.push(layer);
      }
    });

    // filter out layers that don't have the leaflet.pm instance
    layers = layers.filter(layer => !!layer.pm);

    // filter out everything that's leaflet.pm specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);

    return layers;
  },
  removeLayer(e) {
    const layer = e.target;
    // only remove layer, if it's handled by leaflet.pm,
    // not a tempLayer and not currently being dragged
    const removeable =
      !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging());

    if (removeable) {
      layer.remove();
      this.map.fire('pm:remove', { layer });
    }
  },
  globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  toggleGlobalDragMode() {
    const layers = this.findLayers();

    if (this.globalDragModeEnabled()) {
      this._globalDragMode = false;

      layers.forEach(layer => {
        layer.pm.disableLayerDrag();
      });
    } else {
      this._globalDragMode = true;

      layers.forEach(layer => {
        layer.pm.enableLayerDrag();
      });
    }

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this._globalDragMode);
  },
  layerAddHandler({ layer }) {
    // is this layer handled by leaflet.pm?
    const isRelevant = !!layer.pm && !layer._pmTempLayer;

    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    if (!isRelevant) {
      return;
    }

    // re-enable global removal mode if it's enabled already
    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
      this.enableGlobalRemovalMode();
    }

    // re-enable global edit mode if it's enabled already
    if (this.globalEditEnabled()) {
      this.disableGlobalEditMode();
      this.enableGlobalEditMode();
    }
  },
  disableGlobalRemovalMode() {
    this._globalRemovalMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.removeLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this.layerAddHandler, this);
  },
  enableGlobalRemovalMode() {
    const isRelevant = layer =>
      layer.pm && !(layer.pm.options && layer.pm.options.preventMarkerRemoval);

    this._globalRemovalMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (isRelevant(layer)) {
        layer.on('click', this.removeLayer, this);
      }
    });

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.layerAddHandler, this);
  },
  toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);
  },
  globalRemovalEnabled() {
    return !!this._globalRemovalMode;
  },
  globalEditEnabled() {
    return this._globalEditMode;
  },
  enableGlobalEditMode(options) {
    // find all layers handled by leaflet.pm
    const layers = this.findLayers();

    this._globalEditMode = true;

    layers.forEach(layer => {
      // console.log(layer);
      layer.pm.enable(options);
    });

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.layerAddHandler, this);

    // toggle the button in the toolbar
    this.Toolbar.toggleButton('editPolygon', this._globalEditMode);

    // fire event
    this._fireEditModeEvent(true);
  },
  disableGlobalEditMode() {
    // find all layers handles by leaflet.pm
    const layers = this.findLayers();

    this._globalEditMode = false;

    layers.forEach(layer => {
      layer.pm.disable();
    });

    // handle layers that are added while in removal  xmode
    this.map.on('layeroff', this.layerAddHandler, this);

    // toggle the button in the toolbar
    this.Toolbar.toggleButton('editPolygon', this._globalEditMode);

    // fire event
    this._fireEditModeEvent(false);
  },
  _fireEditModeEvent(enabled) {
    this.map.fire('pm:globaleditmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  toggleGlobalEditMode(options) {
    // console.log('toggle global edit mode', options);
    if (this.globalEditEnabled()) {
      // disable
      this.disableGlobalEditMode();
    } else {
      // enable
      this.enableGlobalEditMode(options);
    }
  },
});

export default Map;
