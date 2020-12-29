import merge from 'lodash/merge';
import translations from '../assets/translations';
import Utils from './L.PM.Utils'
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRevertingMode from "./Mixins/Modes/Mode.Reverting";

const Map = L.Class.extend({
  includes: [GlobalEditMode, GlobalDragMode, GlobalRemovalMode,GlobalRevertingMode],
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);

    this._globalRemovalMode = false;

    this.globalOptions = {
      snappable: true,
      layerGroup: undefined,
      snappingOrder: ['Marker','CircleMarker','Circle','Line','Polygon','Rectangle']
    };
  },
  setLang(lang = 'en', t, fallback = 'en') {
    const oldLang = L.PM.activeLang;
    if (t) {
      translations[lang] = merge(translations[fallback], t);
    }

    L.PM.activeLang = lang;
    this.map.pm.Toolbar.reinit();
    Utils._fireEvent(this.map,"pm:langchange", {
      oldLang,
      activeLang: lang,
      fallback,
      translations: translations[lang]
    });
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
  // optionsModifier for spezial options like ignoreShapes
  setPathOptions(options, optionsModifier = {}) {
    const ignore = optionsModifier.ignoreShapes || [];

    this.map.pm.Draw.shapes.forEach(shape => {
      if (ignore.indexOf(shape) === -1) {
        this.map.pm.Draw[shape].setPathOptions(options)
      }
    })
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

    // check if switched the editable mode for CircleMarker while drawing
    let reenableCircleMarker = false;
    if(this.map.pm.Draw.CircleMarker.enabled() && this.map.pm.Draw.CircleMarker.options.editable !== options.editable){
      this.map.pm.Draw.CircleMarker.disable();
      reenableCircleMarker = true;
    }

    // enable options for Drawing Shapes
    this.map.pm.Draw.shapes.forEach(shape => {
      this.map.pm.Draw[shape].setOptions(options)
    });

    if(reenableCircleMarker){
      this.map.pm.Draw.CircleMarker.enable();
    }

    // enable options for Editing
    const layers = Utils.findLayers(this.map);
    layers.forEach(layer => {
      layer.pm.setOptions(options);
    });

    // apply the options (actually trigger the functionality)
    this.applyGlobalOptions();

    // store options
    this.globalOptions = options;
  },
  applyGlobalOptions() {
    const layers = Utils.findLayers(this.map);
    layers.forEach(layer => {
      if (layer.pm.enabled()) {
        layer.pm.applyOptions();
      }
    });
  },
  globalDrawModeEnabled() {
    return !!this.Draw.getActiveShape();
  },
  globalCutModeEnabled() {
    return !!this.Draw.Cut.enabled();
  },
  enableGlobalCutMode(options) {
    return this.Draw.Cut.enable(options);
  },
  toggleGlobalCutMode(options) {
    return this.Draw.Cut.toggle(options);
  },
  disableGlobalCutMode() {
    return this.Draw.Cut.disable();
  },
  getGeomanLayers(asGroup = false){
    const layers = Utils.findLayers(this.map);
    if(!asGroup) {
      return layers;
    }
    const group = L.featureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  },
  getGeomanDrawLayers(asGroup = false){
    const layers = Utils.findLayers(this.map).filter(l => l._drawnByGeoman === true);
    if(!asGroup) {
      return layers;
    }
    const group = L.featureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  },
  // returns the map instance by default or a layergroup is set through global options
  _getContainingLayer(){
    return this.globalOptions.layerGroup && this.globalOptions.layerGroup instanceof L.LayerGroup ? this.globalOptions.layerGroup : this.map;
  },
});

export default Map;
