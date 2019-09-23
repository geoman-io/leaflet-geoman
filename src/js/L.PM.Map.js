import merge from 'lodash/merge';
import translations from '../assets/translations';
import union from '@turf/union';
const Map = L.Class.extend({
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);

    this._globalRemovalMode = false;
    this._globalUnionMode = false;
  },
  setLang(lang = 'en', t, fallback = 'en') {
    if (t) {
      translations[lang] = merge(translations[fallback], t);
    }

    L.PM.activeLang = lang;
    this.map.pm.Toolbar.reinit();
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
  enableDraw(shape = 'Polygon', options) {
    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

    this.Draw.enable(shape, options);
  },
  disableDraw(shape = 'Polygon') {
    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

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
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker
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
  uniteLayer(e) {
    const layer = e.target;
    // only remove layer, if it's handled by leaflet.pm,
    // not a tempLayer and not currently being dragged
    const unitable =
      !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging()) && layer instanceof L.Polygon;
    if (unitable) {
			let l = this._unionLayer;
			if(this._unionLayer) {
				this._unionLayer = union(layer.toGeoJSON(), l.toGeoJSON());

	      // the resulting layer after the cut
	      let resultingLayer = L.geoJSON(this._unionLayer, l.options).addTo(this.map);
	      resultingLayer.addTo(this.map);

	      // give the new layer the original options
	      resultingLayer.pm.enable(this.options);
	      resultingLayer.pm.disable();

				l.remove();
				layer.remove();
				this.map.fire('pm:union', { resultingLayer });
			} else {
				this._unionLayer = layer;
			}
    }
  },
  globalDragModeEnabled() {
    return !!this._globalDragMode;
  },
  enableGlobalDragMode() {
    const layers = this.findLayers();

    this._globalDragMode = true;

    layers.forEach(layer => {
      layer.pm.enableLayerDrag();
    });

    // remove map handler
    this.map.on('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this._globalDragMode);
    
    this._fireDragModeEvent(true);
  },
  disableGlobalDragMode() {
    const layers = this.findLayers();

    this._globalDragMode = false;

    layers.forEach(layer => {
      layer.pm.disableLayerDrag();
    });

    // remove map handler
    this.map.off('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this._globalDragMode);

    this._fireDragModeEvent(false);
  },
  _fireDragModeEvent(enabled) {
    this.map.fire('pm:globaldragmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
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

    // re-enable global drag mode if it's enabled already
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
      this.enableGlobalDragMode();
    }

    // re-enable global union mode if it's enabled already
    if (this.globalUnionEnabled()) {
      this.disableGlobalUnionMode();
      this.enableGlobalUnionMode();
    }
  },
  disableGlobalRemovalMode() {
    this._globalRemovalMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.removeLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(false);
  },
  enableGlobalRemovalMode() {
    const isRelevant = layer =>
      layer.pm &&
      !(layer.pm.options && layer.pm.options.preventMarkerRemoval) &&
      !(layer instanceof L.LayerGroup);

    this._globalRemovalMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (isRelevant(layer)) {
        layer.on('click', this.removeLayer, this);
      }
    });

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(true);
  },
  _fireRemovalModeEvent(enabled) {
    this.map.fire('pm:globalremovalmodetoggled', {
        enabled,
        map: this.map,
      });
  },
  toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  globalRemovalEnabled() {
    return !!this._globalRemovalMode;
  },
	disableGlobalUnionMode() {
    this._globalUnionMode = false;
		this._unionLayer = undefined;
    this.map.eachLayer(layer => {
      layer.off('click', this.uniteLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('unionMode', this._globalUnionMode);
  },
	enableGlobalUnionMode() {
    const isRelevant = layer =>
      layer.pm;
    this._globalUnionMode = true;
		this._unionLayer = undefined;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (isRelevant(layer)) {
        layer.on('click', this.uniteLayer, this);
      }
    });

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.layerAddHandler, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('unionMode', this._globalUnionMode);
  },
  toggleGlobalUnionMode() {
    // toggle global edit mode
    if (this.globalUnionEnabled()) {
      this.disableGlobalUnionMode();
    } else {
      this.enableGlobalUnionMode();
    }
  },
  globalUnionEnabled() {
    return !!this._globalUnionMode;
  },
  globalEditEnabled() {
    return this._globalEditMode;
  },
  enableGlobalEditMode(options) {
    // find all layers handled by leaflet.pm
    const layers = this.findLayers();

    this._globalEditMode = true;

    layers.forEach(layer => {
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
