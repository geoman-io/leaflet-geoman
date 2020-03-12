
import merge from 'lodash/merge';
import translations from '../assets/translations';
import Utils from './L.PM.Utils'

import GlobalEditMode from './Mixins/Modes/Mode.Edit';

const { findLayers } = Utils

const Map = L.Class.extend({
  includes: [GlobalEditMode],
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);

    this._globalRemovalMode = false;

    this.globalOptions = {
      snappable: true,
      editModeLimits: {
        maximum: 200,
        // viewport: false,
        // zoom: 16,
        // hover: true
      }
    };
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
  removeLayer(e) {

    const layer = e.target;
    // only remove layer, if it's handled by leaflet-geoman,
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
  enableGlobalDragMode() {
    const layers = findLayers(this.map);

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
    const layers = findLayers(this.map);

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
    // is this layer handled by leaflet-geoman?
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
  getGlobalOptions() {
    return this.globalOptions;
  },
  setGlobalOptions(o) {
    // merge passed and existing options
    const options = {
      ...this.globalOptions,
      ...o
    };

    // enable options for Drawing Shapes
    this.map.pm.Draw.shapes.forEach(shape => {
      this.map.pm.Draw[shape].setOptions(options)
    })

    // enable options for Editing
    const layers = findLayers(this.map);
    layers.forEach(layer => {
      layer.pm.setOptions(options);
    });

    // apply the options (actually trigger the functionality)
    this.applyGlobalOptions();

    // store options
    this.globalOptions = options;
  },
  applyGlobalOptions() {
    const layers = findLayers(this.map);
    layers.forEach(layer => {
      if (layer.pm.enabled()) {
        layer.pm.applyOptions();
      }
    });
  },
});

export default Map;
