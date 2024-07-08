import merge from 'lodash/merge';
import translations from '../assets/translations';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalArrowEditMode from './Mixins/Modes/Mode.EditArrows';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import GlobalColorChangeMode from './Mixins/Modes/Mode.Color';
import EventMixin from './Mixins/Events';
import ArrowDialogMixin from './Mixins/DrawArrowDialog';
import EditArrowDialogMixin from './Mixins/EditArrowDialog';
import ColorChangeDialogMixin from './Mixins/ColorChangeDialog';
import createKeyboardMixins from './Mixins/Keyboard';
import { getRenderer } from './helpers';

const Map = L.Class.extend({
  includes: [
    GlobalEditMode,
    GlobalArrowEditMode,
    GlobalDragMode,
    GlobalRemovalMode,
    GlobalRotateMode,
    GlobalColorChangeMode,
    EventMixin,
    ColorChangeDialogMixin,
    ArrowDialogMixin,
    EditArrowDialogMixin,
  ],
  initialize(map) {
    this.map = map;
    this.Draw = new L.PM.Draw(map);
    this.Toolbar = new L.PM.Toolbar(map);
    this.Keyboard = createKeyboardMixins();
    this.Dialog = {
      ...ArrowDialogMixin,
      ...ColorChangeDialogMixin,
      ...EditArrowDialogMixin,
    };

    this.globalOptions = {
      defaultColor: '#3388ff',
      activeColor: '#3388ff',
      snappable: true,
      layerGroup: undefined,
      snappingOrder: [
        'Marker',
        'CircleMarker',
        'Circle',
        'Line',
        'ArrowLine',
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

    // Set Up Dialogs
    // Color Change Dialog
    this.Dialog.colorChangeDialog = this.colorChangeDialogInit({
      close: false,
    }).addTo(this.map);
    this.Dialog.colorChangeInit(this.map, {});

    // Draw Arrow Line Dialog
    this.Dialog.drawArrowLineDialog = this.drawArrowLineDialogInit({
      close: false,
      showArrowToggle: false,
    }).addTo(this.map);

    // Edit Arrow Line Dialog
    this.Dialog.editArrowLineDialog = this.editArrowLineDialogInit().addTo(
      this.map
    );

    // Dialog Events
    this._addDialogEvents();
  },
  // eslint-disable-next-line default-param-last
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

    const oldLang = L.PM.activeLang;
    if (override) {
      translations[lang] = merge(translations[fallback], override);
    }

    L.PM.activeLang = lang;
    this.map.pm.Toolbar.reinit();
    this._fireLangChange(oldLang, lang, fallback, translations[lang]);
  },
  addControls(options) {
    this.Toolbar.addControls(options);
  },
  removeControls() {
    this.Toolbar.removeControls();
  },
  disableAllModes() {
    this.disableGlobalCutMode();
    this.disableGlobalEditMode();
    this.disableGlobalDragMode();
    this.disableGlobalRotateMode();
    this.disableGlobalRemovalMode();
    this.disableGlobalArrowEditMode();
    this.disableGlobalColorChangeMode();
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
  getActiveColor() {
    return this.globalOptions.activeColor;
  },
  getGlobalOptions() {
    return this.globalOptions;
  },
  setGlobalStyle(options) {
    this.setGlobalOptions(options);
    this.setPathOptions(options.pathOptions, {
      ignoreShapes: ['Text'],
      merge: true,
    });
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
      !!this.map.pm.Draw.Circle.options.resizableCircle !==
        !!options.resizableCircle
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
  getActiveGeomanLayers(shapeType) {
    return this.getGeomanLayers().filter((l) => {
      if (shapeType) {
        return l.getShape() === shapeType && l.pm._active;
      }
      return l.pm._active;
    });
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
  _addDialogEvents() {
    this.map.on('pm:drawend', () => {
      this.Dialog.closeColorChangeDialog();
      this.Dialog.closeDrawArrowLineDialog();
      this.Dialog.closeEditArrowLineDialog();
    });

    this.map.on('dialog:moveend', this.updateColorisPosition);

    this.map.on('dialog:closed', () => {
      const currentlyActive = this.getActiveGeomanLayers();
      currentlyActive.forEach((l) => {
        l.pm._markerGroup.eachLayer((mg) => {
          const activeIcon = mg.getIcon();
          activeIcon.options.className = 'marker-icon';
          mg.setIcon(activeIcon);
        });
      });
    });
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
