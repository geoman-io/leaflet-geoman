import type { LeafletClassFactory } from '../types/leaflet-class';
import type { IKeyboardMixin } from './Mixins/Keyboard';

/**
 * Extended FeatureGroup with PM temp layer flag
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * PM Draw interface
 */
interface PMDraw {
  enable: (shape: string, options?: object) => void;
  disable: (shape?: string) => void;
  getActiveShape: () => string | undefined;
  shapes: string[];
  Cut: {
    enabled: () => boolean;
    enable: (options?: object) => void;
    disable: () => void;
    toggle: (options?: object) => void;
  };
  Circle: DrawShape;
  CircleMarker: DrawShape;
  [key: string]: unknown;
}

/**
 * Draw shape interface
 */
interface DrawShape {
  enabled: () => boolean;
  enable: (options?: object) => void;
  disable: () => void;
  setOptions: (options: object) => void;
  setPathOptions: (options: object, merge?: boolean) => void;
  options: {
    resizeableCircleMarker?: boolean;
    resizeableCircle?: boolean;
  };
}

/**
 * PM Toolbar interface
 */
interface PMToolbar {
  addControls: (options?: object) => void;
  removeControls: () => void;
  toggleControls: () => void;
  reinit: () => void;
  isVisible: boolean;
}

/**
 * PM Layer interface
 */
interface PMLayer extends L.Layer {
  pm: {
    enabled: () => boolean;
    setOptions: (options: object) => void;
    applyOptions: () => void;
  };
  _drawnByGeoman?: boolean;
}

/**
 * Extended Canvas renderer
 */
interface ExtendedRenderer extends L.Renderer {
  _onMouseMove: (e: MouseEvent) => void;
  _onClick: (e: MouseEvent) => void;
}

/**
 * Global options interface
 */
export interface GlobalOptions {
  snappable?: boolean;
  layerGroup?: L.LayerGroup;
  snappingOrder?: string[];
  panes?: {
    vertexPane?: string;
    layerPane?: string;
    markerPane?: string;
  };
  draggable?: boolean;
  editable?: boolean;
  resizeableCircleMarker?: boolean;
  resizeableCircle?: boolean;
  exitModeOnEscape?: boolean;
  finishOnEnter?: boolean;
  [key: string]: unknown;
}

/**
 * Path options modifier
 */
interface PathOptionsModifier {
  ignoreShapes?: string[];
  merge?: boolean;
}

/**
 * Translation record type
 */
type TranslationsRecord = Record<string, Record<string, unknown>>;

/**
 * Map PM instance interface
 */
export interface IMapPM {
  map: L.Map & { pm: IMapPM };
  Draw: PMDraw;
  Toolbar: PMToolbar;
  Keyboard: IKeyboardMixin;
  globalOptions: GlobalOptions;
  _touchEventCounter: number;

  initialize(map: L.Map): void;
  setLang(lang?: string, override?: object, fallback?: string): void;
  addControls(options?: object): void;
  removeControls(): void;
  toggleControls(): void;
  controlsVisible(): boolean;
  enableDraw(shape?: string, options?: object): void;
  disableDraw(shape?: string): void;
  setPathOptions(options: object, optionsModifier?: PathOptionsModifier): void;
  getGlobalOptions(): GlobalOptions;
  setGlobalOptions(options: Partial<GlobalOptions>): void;
  applyGlobalOptions(): void;
  globalDrawModeEnabled(): boolean;
  globalCutModeEnabled(): boolean;
  enableGlobalCutMode(options?: object): void;
  toggleGlobalCutMode(options?: object): void;
  disableGlobalCutMode(): void;
  getGeomanLayers(asGroup?: boolean): L.Layer[] | L.FeatureGroup;
  getGeomanDrawLayers(asGroup?: boolean): L.Layer[] | L.FeatureGroup;
  _getContainingLayer(): L.LayerGroup | L.Map;
  _isCRSSimple(): boolean;
  _addTouchEvents(elm: HTMLElement): void;
  _removeTouchEvents(elm: HTMLElement): void;
  _canvasTouchMove(
    e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
  ): void;
  _canvasTouchClick(
    e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
  ): void;
  _createMouseEvent(
    type: string,
    e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
  ): MouseEvent;
  // From EventMixin
  _fireLangChange: (
    oldLang: string,
    newLang: string,
    fallback: string,
    translation: unknown
  ) => void;
}
import merge from 'lodash/merge';
import translations from '../assets/translations';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import EventMixin from './Mixins/Events';
import createKeyboardMixins from './Mixins/Keyboard';
import { getRenderer } from './helpers';
import { resolveLanguageCode } from './helpers/language';

const Map = (L.Class as unknown as LeafletClassFactory).extend<IMapPM, [L.Map]>(
  {
    includes: [
      GlobalEditMode,
      GlobalDragMode,
      GlobalRemovalMode,
      GlobalRotateMode,
      EventMixin,
    ],
    initialize(this: IMapPM, map: L.Map) {
      this.map = map as typeof this.map;
      this.Draw = new L.PM.Draw(map) as unknown as PMDraw;
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
        exitModeOnEscape: false,
        finishOnEnter: false,
      };

      this.Keyboard._initKeyListener(map);
    },

    setLang(this: IMapPM, lang = 'en', override?: object, fallback = 'en') {
      // Resolve the language code to a translation key
      lang = resolveLanguageCode(lang, translations);

      const oldLang = L.PM.activeLang;
      if (override) {
        translations[lang] = merge(translations[fallback], override);
      }

      L.PM.activeLang = lang;
      this.map.pm.Toolbar.reinit();
      this._fireLangChange(oldLang, lang, fallback, translations[lang]);
    },
    addControls(this: IMapPM, options?: object) {
      this.Toolbar.addControls(options);
    },
    removeControls(this: IMapPM) {
      this.Toolbar.removeControls();
    },
    toggleControls(this: IMapPM) {
      this.Toolbar.toggleControls();
    },
    controlsVisible(this: IMapPM) {
      return this.Toolbar.isVisible;
    },

    enableDraw(this: IMapPM, shape = 'Polygon', options?: object) {
      // backwards compatible, remove after 3.0
      if (shape === 'Poly') {
        shape = 'Polygon';
      }

      this.Draw.enable(shape, options);
    },
    disableDraw(this: IMapPM, shape = 'Polygon') {
      // backwards compatible, remove after 3.0
      if (shape === 'Poly') {
        shape = 'Polygon';
      }

      this.Draw.disable(shape);
    },
    // optionsModifier for special options like ignoreShapes or merge
    setPathOptions(
      this: IMapPM,
      options: object,
      optionsModifier: PathOptionsModifier = {}
    ) {
      const ignore = optionsModifier.ignoreShapes || [];
      const mergeOptions = optionsModifier.merge || false;

      this.map.pm.Draw.shapes.forEach((shape) => {
        if (ignore.indexOf(shape) === -1) {
          (this.map.pm.Draw[shape] as unknown as DrawShape).setPathOptions(
            options,
            mergeOptions
          );
        }
      });
    },

    getGlobalOptions(this: IMapPM) {
      return this.globalOptions;
    },
    setGlobalOptions(this: IMapPM, o: Partial<GlobalOptions>) {
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
        (this.map.pm.Draw[shape] as unknown as DrawShape).setOptions(options);
      });

      if (reenableCircleMarker) {
        this.map.pm.Draw.CircleMarker.enable();
      }

      if (reenableCircle) {
        this.map.pm.Draw.Circle.enable();
      }

      // enable options for Editing
      const layers = L.PM.Utils.findLayers(this.map);
      (layers as PMLayer[]).forEach((layer) => {
        layer.pm.setOptions(options);
      });

      this.map.fire('pm:globaloptionschanged');

      // store options
      this.globalOptions = options;

      // apply the options (actually trigger the functionality)
      this.applyGlobalOptions();
    },
    applyGlobalOptions(this: IMapPM) {
      const layers = L.PM.Utils.findLayers(this.map);
      (layers as PMLayer[]).forEach((layer) => {
        if (layer.pm.enabled()) {
          layer.pm.applyOptions();
        }
      });
    },
    globalDrawModeEnabled(this: IMapPM) {
      return !!this.Draw.getActiveShape();
    },
    globalCutModeEnabled(this: IMapPM) {
      return !!this.Draw.Cut.enabled();
    },
    enableGlobalCutMode(this: IMapPM, options?: object) {
      return this.Draw.Cut.enable(options);
    },
    toggleGlobalCutMode(this: IMapPM, options?: object) {
      return this.Draw.Cut.toggle(options);
    },
    disableGlobalCutMode(this: IMapPM) {
      return this.Draw.Cut.disable();
    },
    getGeomanLayers(this: IMapPM, asGroup = false) {
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
    getGeomanDrawLayers(this: IMapPM, asGroup = false) {
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
    _getContainingLayer(this: IMapPM) {
      return this.globalOptions.layerGroup &&
        this.globalOptions.layerGroup instanceof L.LayerGroup
        ? this.globalOptions.layerGroup
        : this.map;
    },
    _isCRSSimple(this: IMapPM) {
      return this.map.options.crs === L.CRS.Simple;
    },
    // in Canvas mode we need to convert touch- and pointerevents (IE) to mouseevents, because Leaflet don't support them.
    _touchEventCounter: 0,
    _addTouchEvents(this: IMapPM, elm: HTMLElement) {
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
    _removeTouchEvents(this: IMapPM, elm: HTMLElement) {
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
    _canvasTouchMove(
      this: IMapPM,
      e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
    ) {
      (getRenderer(this.map) as ExtendedRenderer)._onMouseMove(
        this._createMouseEvent('mousemove', e)
      );
    },
    _canvasTouchClick(
      this: IMapPM,
      e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
    ) {
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
      (getRenderer(this.map) as ExtendedRenderer)._onClick(
        this._createMouseEvent(type, e)
      );
    },
    _createMouseEvent(
      this: IMapPM,
      type: string,
      e: TouchEvent & Partial<Pick<MouseEvent, 'button' | 'relatedTarget'>>
    ): MouseEvent {
      let mouseEvent: MouseEvent;
      const touchEvt = (e.touches[0] || e.changedTouches[0]) as Touch &
        Partial<Pick<UIEvent, 'detail'>>;
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
          e.view!,
          touchEvt.detail!,
          touchEvt.screenX,
          touchEvt.screenY,
          touchEvt.clientX,
          touchEvt.clientY,
          e.ctrlKey,
          e.altKey,
          e.shiftKey,
          e.metaKey,
          e.button!,
          e.relatedTarget!
        );
      }
      return mouseEvent;
    },
  }
);

export default Map;
