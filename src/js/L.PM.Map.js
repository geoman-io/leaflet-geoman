import merge from 'lodash/merge';
import translations from '../assets/translations';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import EventMixin from './Mixins/Events';
import createKeyboardMixins from './Mixins/Keyboard';
import { getRenderer } from './helpers';

const Map = L.Class.extend({
  includes: [
    GlobalEditMode,
    GlobalDragMode,
    GlobalRemovalMode,
    GlobalRotateMode,
    EventMixin,
  ],
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);
    this.Keyboard = createKeyboardMixins();

    this.globalOptions = {
      snappable: true,
      layerGroup: undefined,
      snappingOrder: [
        'Marker',
        'CircleMarker',
        'Circle',
        'Line',
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
  },
  // eslint-disable-next-line default-param-last
  setLang(langInput = 'en', override, fallback = 'en') {
    // 1. Normalize input and determine the intended language code
    const normalizedInput = langInput?.trim().toLowerCase() || '';
    const originalFallbackLang = fallback?.trim().toLowerCase() || 'en';
    let intendedLang = originalFallbackLang; // Default intention is the fallback

    const match = normalizedInput.match(/^([a-z]{2,3})(?:[-_]([a-z]{2}))?.*$/);
    let baseLang = null;
    if (match) {
      [, baseLang] = match;
    } else if (/^[a-z]{2,3}$/.test(normalizedInput)) {
      baseLang = normalizedInput;
    }

    if (baseLang) {
      intendedLang = baseLang; // If input gives a valid base code, that's the intention
    } else if (!normalizedInput) {
      intendedLang = 'en'; // If input is empty/invalid, intention defaults to 'en'
    }
    // Now, intendedLang is the primary code derived from input, or the fallback, or 'en'.

    const oldLang = L.PM.activeLang || 'en'; // Store the previous language, default to 'en' if undefined

    // 2. Calculate merged translations for the event *if* override is provided
    let translationsForEvent = null; // Initialize
    if (override && typeof override === 'object') {
      // Find the best base for merging: intended lang -> fallback -> 'en' -> empty
      const baseForMerge =
        translations[intendedLang] ||
        translations[originalFallbackLang] ||
        translations.en ||
        {};
      // Calculate the merged result, but DO NOT assign back to global translations[intendedLang]
      translationsForEvent = merge({}, baseForMerge, override);
    }

    // 3. Determine the final active language BASED ON ORIGINAL translations
    let finalLang = 'en'; // Default final language to 'en'
    // Check the *original* translations, ignoring any temporary override merge
    if (translations[intendedLang]) {
      finalLang = intendedLang; // Use intended if it now exists (due to override or initially)
    } else if (translations[originalFallbackLang]) {
      finalLang = originalFallbackLang; // Otherwise, use fallback if it exists
    }
    // If neither intended nor fallback exists, finalLang remains 'en'

    // 4. Set active language
    L.PM.activeLang = finalLang;
    // 5. Reinitialize toolbar and fire event if the language actually changed
    if (oldLang !== L.PM.activeLang) {
      this.map.pm.Toolbar.reinit();
      // Use the potentially merged translations *only* for the event payload
      // Fallback to the standard active translations if no override was performed
      const activeTranslations =
        translationsForEvent ||
        translations[L.PM.activeLang] ||
        translations.en ||
        {};
      this._fireLangChange(
        oldLang,
        L.PM.activeLang,
        originalFallbackLang,
        activeTranslations
      );
    }
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
  // eslint-disable-next-line default-param-last
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
  // optionsModifier for special options like ignoreShapes or merge
  setPathOptions(options, optionsModifier = {}) {
    const ignore = optionsModifier.ignoreShapes || [];
    const mergeOptions = optionsModifier.merge || false;

    this.map.pm.Draw.shapes.forEach((shape) => {
      if (ignore.indexOf(shape) === -1) {
        this.map.pm.Draw[shape].setPathOptions(options, mergeOptions);
      }
    });
  },

  getGlobalOptions() {
    return this.globalOptions;
  },
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
    const layers = L.PM.Utils.findLayers(this.map);
    layers.forEach((layer) => {
      layer.pm.setOptions(options);
    });

    this.map.fire('pm:globaloptionschanged');

    // store options
    this.globalOptions = options;

    // apply the options (actually trigger the functionality)
    this.applyGlobalOptions();
  },
  applyGlobalOptions() {
    const layers = L.PM.Utils.findLayers(this.map);
    layers.forEach((layer) => {
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
  getGeomanLayers(asGroup = false) {
    const layers = L.PM.Utils.findLayers(this.map);
    if (!asGroup) {
      return layers;
    }
    const group = L.featureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  },
  getGeomanDrawLayers(asGroup = false) {
    const layers = L.PM.Utils.findLayers(this.map).filter(
      (l) => l._drawnByGeoman === true
    );
    if (!asGroup) {
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
  _getContainingLayer() {
    return this.globalOptions.layerGroup &&
      this.globalOptions.layerGroup instanceof L.LayerGroup
      ? this.globalOptions.layerGroup
      : this.map;
  },
  _isCRSSimple() {
    return this.map.options.crs === L.CRS.Simple;
  },
  // in Canvas mode we need to convert touch- and pointerevents (IE) to mouseevents, because Leaflet don't support them.
  _touchEventCounter: 0,
  _addTouchEvents(elm) {
    if (this._touchEventCounter === 0) {
      L.DomEvent.on(elm, 'touchmove', this._canvasTouchMove, this);
      L.DomEvent.on(
        elm,
        'touchstart touchend touchcancel',
        this._canvasTouchClick,
        this
      );
    }
    this._touchEventCounter += 1;
  },
  _removeTouchEvents(elm) {
    if (this._touchEventCounter === 1) {
      L.DomEvent.off(elm, 'touchmove', this._canvasTouchMove, this);
      L.DomEvent.off(
        elm,
        'touchstart touchend touchcancel',
        this._canvasTouchClick,
        this
      );
    }
    this._touchEventCounter =
      this._touchEventCounter <= 1 ? 0 : this._touchEventCounter - 1;
  },
  _canvasTouchMove(e) {
    getRenderer(this.map)._onMouseMove(this._createMouseEvent('mousemove', e));
  },
  _canvasTouchClick(e) {
    let type = '';
    if (e.type === 'touchstart' || e.type === 'pointerdown') {
      type = 'mousedown';
    } else if (e.type === 'touchend' || e.type === 'pointerup') {
      type = 'mouseup';
    } else if (e.type === 'touchcancel' || e.type === 'pointercancel') {
      type = 'mouseup';
    }
    if (!type) {
      return;
    }
    getRenderer(this.map)._onClick(this._createMouseEvent(type, e));
  },
  _createMouseEvent(type, e) {
    let mouseEvent;
    const touchEvt = e.touches[0] || e.changedTouches[0];
    try {
      mouseEvent = new MouseEvent(type, {
        bubbles: e.bubbles,
        cancelable: e.cancelable,
        view: e.view,
        detail: touchEvt.detail,
        screenX: touchEvt.screenX,
        screenY: touchEvt.screenY,
        clientX: touchEvt.clientX,
        clientY: touchEvt.clientY,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        button: e.button,
        relatedTarget: e.relatedTarget,
      });
    } catch (ex) {
      mouseEvent = document.createEvent('MouseEvents');
      mouseEvent.initMouseEvent(
        type,
        e.bubbles,
        e.cancelable,
        e.view,
        touchEvt.detail,
        touchEvt.screenX,
        touchEvt.screenY,
        touchEvt.clientX,
        touchEvt.clientY,
        e.ctrlKey,
        e.altKey,
        e.shiftKey,
        e.metaKey,
        e.button,
        e.relatedTarget
      );
    }
    return mouseEvent;
  },
});

export default Map;
