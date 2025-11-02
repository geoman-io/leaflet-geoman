import { Class, CRS, DomEvent, FeatureGroup, LayerGroup } from 'leaflet';
import merge from 'lodash/merge';
import translations from '../assets/translations';
import EventMixin from './Mixins/Events';
import createKeyboardMixins from './Mixins/Keyboard';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import { getRenderer } from './helpers';
import Draw from './Draw/L.PM.Draw';
import Toolbar from './Toolbar/L.PM.Toolbar';
import Geoman from './L.PM';
import Utils from './L.PM.Utils';

export default class GeomanMap extends Class {
  static {
    this.include(GlobalEditMode);
    this.include(GlobalDragMode);
    this.include(GlobalRemovalMode);
    this.include(GlobalRotateMode);
    this.include(EventMixin);
  }

  initialize(map) {
    this.map = map;
    this.Draw = new Draw(map);
    this.Toolbar = new Toolbar(map);
    this.Keyboard = createKeyboardMixins();

    this.globalOptions = {
      snappable: true,
      layerGroup: undefined,
      snappingOrder: [
        'Marker',
        'CircleMarker',
        'Circle',
        'Polyline',
        'Polygon',
        'Rectangle',
      ],
      panes: {
        vertexPane: 'markerPane',
        layerPane: 'overlayPane',
        markerPane: 'markerPane',
      },
      draggable: true,
    };

    this.Keyboard._initKeyListener(map);
  }

  setLang(lang = 'en', override, fallback = 'en') {
    // Normalize the language code to lowercase and trim any whitespace
    lang = lang.trim().toLowerCase();

    // First, check if the input is already in the expected format (e.g., 'fr')
    if (/^[a-z]{2}$/.test(lang)) {
      // No further processing needed for single-letter codes
    } else {
      // Handle formats like 'fr-FR', 'FR', 'fr-fr', 'fr_FR'
      const normalizedLang = lang
        .replace(/[-_\s]/g, '-')
        .replace(/^(\w{2})$/, '$1-');
      const match = normalizedLang.match(/([a-z]{2})-?([a-z]{2})?/);

      if (match) {
        // Construct potential keys to search for in the translations object
        const potentialKeys = [
          `${match[1]}_${match[2]}`, // e.g., 'fr_BR'
          `${match[1]}`, // e.g., 'fr'
        ];

        // Search through the translations object for a matching key
        for (const key of potentialKeys) {
          if (translations[key]) {
            lang = key; // Set lang to the matching key
            break; // Exit the loop once a match is found
          }
        }
      }
    }

    const oldLang = Geoman.activeLang;
    if (override) {
      translations[lang] = merge(translations[fallback], override);
    }

    Geoman.activeLang = lang;
    this.map.pm.Toolbar.reinit();
    this._fireLangChange(oldLang, lang, fallback, translations[lang]);
  }

  addControls(options) {
    this.Toolbar.addControls(options);
  }

  removeControls() {
    this.Toolbar.removeControls();
  }

  toggleControls() {
    this.Toolbar.toggleControls();
  }

  controlsVisible() {
    return this.Toolbar.isVisible;
  }

  enableDraw(shape = 'Polygon', options) {
    this.Draw.enable(shape, options);
  }

  disableDraw(shape = 'Polygon') {
    this.Draw.disable(shape);
  }

  // optionsModifier for special options like ignoreShapes or merge
  setPathOptions(options, optionsModifier = {}) {
    const ignore = optionsModifier.ignoreShapes || [];
    const mergeOptions = optionsModifier.merge || false;

    this.map.pm.Draw.shapes.forEach((shape) => {
      if (ignore.indexOf(shape) === -1) {
        this.map.pm.Draw[shape].setPathOptions(options, mergeOptions);
      }
    });
  }

  getGlobalOptions() {
    return this.globalOptions;
  }

  setGlobalOptions(o) {
    // merge passed and existing options
    const options = merge(this.globalOptions, o);

    // TODO: remove with next major release
    if (options.editable) {
      options.resizeableCircleMarker = options.editable;
      delete options.editable;
    }

    // check if switched the editable mode for CircleMarker while drawing
    let reenableCircleMarker = false;
    if (
      this.map.pm.Draw.CircleMarker.enabled() &&
      !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker !==
        !!options.resizeableCircleMarker
    ) {
      this.map.pm.Draw.CircleMarker.disable();
      reenableCircleMarker = true;
    }
    // check if switched the editable mode for Circle while drawing
    let reenableCircle = false;
    if (
      this.map.pm.Draw.Circle.enabled() &&
      !!this.map.pm.Draw.Circle.options.resizeableCircle !==
        !!options.resizeableCircle
    ) {
      this.map.pm.Draw.Circle.disable();
      reenableCircle = true;
    }

    // enable options for Drawing Shapes
    this.map.pm.Draw.shapes.forEach((shape) => {
      this.map.pm.Draw[shape].setOptions(options);
    });

    if (reenableCircleMarker) {
      this.map.pm.Draw.CircleMarker.enable();
    }

    if (reenableCircle) {
      this.map.pm.Draw.Circle.enable();
    }

    // enable options for Editing
    const layers = Utils.findLayers(this.map);
    layers.forEach((layer) => {
      layer.pm.setOptions(options);
    });

    this.map.fire('pm:globaloptionschanged');

    // store options
    this.globalOptions = options;

    // apply the options (actually trigger the functionality)
    this.applyGlobalOptions();
  }

  applyGlobalOptions() {
    const layers = Utils.findLayers(this.map);
    layers.forEach((layer) => {
      if (layer.pm.enabled()) {
        layer.pm.applyOptions();
      }
    });
  }

  globalDrawModeEnabled() {
    return !!this.Draw.getActiveShape();
  }

  globalCutModeEnabled() {
    return !!this.Draw.Cut.enabled();
  }

  enableGlobalCutMode(options) {
    return this.Draw.Cut.enable(options);
  }

  toggleGlobalCutMode(options) {
    return this.Draw.Cut.toggle(options);
  }

  disableGlobalCutMode() {
    return this.Draw.Cut.disable();
  }

  getGeomanLayers(asGroup = false) {
    const layers = Utils.findLayers(this.map);
    if (!asGroup) {
      return layers;
    }
    const group = new FeatureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  }

  getGeomanDrawLayers(asGroup = false) {
    const layers = Utils.findLayers(this.map).filter(
      (l) => l._drawnByGeoman === true
    );
    if (!asGroup) {
      return layers;
    }
    const group = new FeatureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  }

  // returns the map instance by default or a layergroup is set through global options
  _getContainingLayer() {
    return this.globalOptions.layerGroup &&
      this.globalOptions.layerGroup instanceof LayerGroup
      ? this.globalOptions.layerGroup
      : this.map;
  }

  _isCRSSimple() {
    return this.map.options.crs === CRS.Simple;
  }
}
