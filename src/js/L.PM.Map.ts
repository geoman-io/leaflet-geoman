import * as L from 'leaflet';
import PMClass from './helpers/PMClass';
import { PM } from './PM';
import type { DrawBase } from './Draw/L.PM.Draw';
import type { IToolbar } from './Toolbar/L.PM.Toolbar';
import type { PM as PMTypes } from '../../leaflet-geoman';
import type { DrawOptions, EditOptions, GlobalOptions } from '../types/options';
export type { GlobalOptions } from '../types/options';
import type { IKeyboardMixin } from './Mixins/Keyboard';

/**
 * Extended FeatureGroup with PM temp layer flag
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * Draw shape interface
 */
interface DrawShape {
  toolbarButtonName?: string;
  enabled: () => boolean;
  enable: (options?: DrawOptions) => void;
  disable: () => void;
  setOptions: (options: DrawOptions) => void;
  setPathOptions: (options: L.PathOptions, merge?: boolean) => void;
  options: {
    resizeableCircleMarker?: boolean;
    resizeableCircle?: boolean;
  };
}

/**
 * PM Layer interface
 */
interface PMLayer extends L.Layer {
  pm: {
    enabled: () => boolean;
    setOptions: (options: EditOptions) => void;
    _applyInheritedOptions: (options: EditOptions) => void;
    applyOptions: () => void;
  };
  _drawnByGeoman?: boolean;
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
  Draw: DrawBase;
  Toolbar: IToolbar;
  Keyboard: IKeyboardMixin;
  globalOptions: GlobalOptions;
  _modes: ModeManager;

  initialize(map: L.Map): void;
  unstable_registerMode(name: string, mode: ModeDefinition): () => void;
  unstable_activeModes(): string[];
  _registerDrawMode(shape: string): void;
  _registerGlobalMode(
    name: string,
    buttonName: string,
    get: () => { enabled: boolean; disable: () => void },
    targets?: string[]
  ): void;
  _yieldThroughButton(
    buttonName: () => string | undefined,
    disable: () => void
  ): () => void;
  setLang(lang?: string, override?: object, fallback?: string): void;
  addControls(options?: PMTypes.ToolbarOptions): void;
  removeControls(): void;
  toggleControls(): void;
  controlsVisible(): boolean;
  enableDraw(shape?: string, options?: DrawOptions): void;
  disableDraw(shape?: string): void;
  finishDraw(): boolean;
  setPathOptions(
    options: L.PathOptions,
    optionsModifier?: PathOptionsModifier
  ): void;
  getGlobalOptions(): GlobalOptions;
  setGlobalOptions(options: Partial<GlobalOptions>): void;
  applyGlobalOptions(): void;
  globalDrawModeEnabled(): boolean;
  globalCutModeEnabled(): boolean;
  enableGlobalCutMode(options?: DrawOptions): void;
  toggleGlobalCutMode(options?: DrawOptions): void;
  disableGlobalCutMode(): void;
  getGeomanLayers(asGroup?: boolean): L.Layer[] | L.FeatureGroup;
  getGeomanDrawLayers(asGroup?: boolean): L.Layer[] | L.FeatureGroup;
  _getContainingLayer(): L.LayerGroup | L.Map;
  _isCRSSimple(): boolean;
  // From the global mode mixins
  globalEditModeEnabled(): boolean;
  disableGlobalEditMode(): void;
  globalDragModeEnabled(): boolean;
  disableGlobalDragMode(): void;
  globalRemovalModeEnabled(): boolean;
  disableGlobalRemovalMode(): void;
  globalRotateModeEnabled(): boolean;
  disableGlobalRotateMode(): void;
  // From EventMixin
  _fireLangChange: (
    oldLang: string,
    newLang: string,
    fallback: string,
    translation: unknown
  ) => void;
}
import { checkOptions, mergeOptions } from './helpers/options';
import translations from '../assets/translations';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import EventMixin from './Mixins/Events';
import createKeyboardMixins from './Mixins/Keyboard';
import { getRenderer } from './helpers';
import { resolveLanguageCode } from './helpers/language';
import ModeManager from './helpers/ModeManager';
import type { ModeDefinition } from './helpers/ModeManager';

const Map = PMClass.extend<
  IMapPM,
  [L.Map],
  [
    typeof GlobalEditMode,
    typeof GlobalDragMode,
    typeof GlobalRemovalMode,
    typeof GlobalRotateMode,
    typeof EventMixin,
  ]
>({
  includes: [
    GlobalEditMode,
    GlobalDragMode,
    GlobalRemovalMode,
    GlobalRotateMode,
    EventMixin,
  ],
  initialize(this: IMapPM, map: L.Map) {
    this.map = map as typeof this.map;
    this.Draw = new PM.Draw(map);
    this.Toolbar = new PM.Toolbar(map);
    this.Keyboard = createKeyboardMixins();

    // Draw tools first, then the global modes: the order Escape used to
    // check them in.
    this._modes = new ModeManager(() => !!this.globalOptions.combineModes);
    this.Draw.shapes.forEach((shape) => this._registerDrawMode(shape));
    this._registerGlobalMode(
      'edit',
      'editMode',
      () => ({
        enabled: this.globalEditModeEnabled(),
        disable: () => this.disableGlobalEditMode(),
      }),
      ['vertex']
    );
    this._registerGlobalMode(
      'drag',
      'dragMode',
      () => ({
        enabled: this.globalDragModeEnabled(),
        disable: () => this.disableGlobalDragMode(),
      }),
      ['body']
    );
    this._registerGlobalMode('removal', 'removalMode', () => ({
      enabled: this.globalRemovalModeEnabled(),
      disable: () => this.disableGlobalRemovalMode(),
    }));
    this._registerGlobalMode(
      'rotate',
      'rotateMode',
      () => ({
        enabled: this.globalRotateModeEnabled(),
        disable: () => this.disableGlobalRotateMode(),
      }),
      ['rotate-handle']
    );

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

  // Unstable: for @geoman-io packages, without a semver guarantee. Returns
  // the function the mode calls when it turns on.
  unstable_registerMode(this: IMapPM, name: string, mode: ModeDefinition) {
    this._modes.register(name, mode);
    return () => this._modes._exclusive(name);
  },
  unstable_activeModes(this: IMapPM) {
    return this._modes.active();
  },
  _registerDrawMode(this: IMapPM, shape: string) {
    const tool = () =>
      (this.Draw as unknown as Record<string, DrawShape>)[shape];
    this._modes.register(`draw:${shape}`, {
      enabled: () => tool().enabled(),
      disable: () => tool().disable(),
      yieldTo: this._yieldThroughButton(
        () => tool().toolbarButtonName,
        () => tool().disable()
      ),
    });
  },
  _registerGlobalMode(
    this: IMapPM,
    name: string,
    buttonName: string,
    get: () => { enabled: boolean; disable: () => void },
    targets?: string[]
  ) {
    this._modes.register(name, {
      targets,
      button: buttonName,
      enabled: () => get().enabled,
      disable: () => get().disable(),
      yieldTo: this._yieldThroughButton(
        () => buttonName,
        () => get().disable()
      ),
    });
  },
  // While the mode's button is toggled and clickable, another mode turns it
  // off the way the toolbar always did: by clicking it. A button that other
  // buttons may not turn off keeps its mode on. Otherwise, such as when the
  // button is gone, disabled, or was rebuilt untoggled by setLang, the mode
  // is disabled directly.
  _yieldThroughButton(
    this: IMapPM,
    buttonName: () => string | undefined,
    disable: () => void
  ) {
    return () => {
      const name = buttonName();
      const button = name ? this.Toolbar.buttons[name] : undefined;
      if (button && !button._button.disableByOtherButtons) {
        return;
      }
      if (button && button.toggled() && !button._button.disabled) {
        button._triggerClick();
      } else {
        disable();
      }
    };
  },
  setLang(this: IMapPM, lang = 'en', override?: object, fallback = 'en') {
    // Resolve the language code to a translation key
    lang = resolveLanguageCode(lang, translations);

    const oldLang = PM.activeLang;
    if (override) {
      // Merge into a new object; merging into translations[fallback] would
      // overwrite the built-in fallback language with the override.
      translations[lang] = mergeOptions(
        mergeOptions({}, translations[fallback]),
        override
      );
    }

    PM.activeLang = lang;
    this.map.pm.Toolbar.reinit();
    this._fireLangChange(oldLang, lang, fallback, translations[lang]);
  },
  addControls(this: IMapPM, options?: PMTypes.ToolbarOptions) {
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

  enableDraw(this: IMapPM, shape = 'Polygon', options?: DrawOptions) {
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
  finishDraw(this: IMapPM) {
    const activeShape = this.Draw.getActiveShape();
    if (!activeShape) {
      return false;
    }

    type FinishableDrawInstance = Parameters<
      IKeyboardMixin['_canFinishShape']
    >[0] & {
      _finishShape?: () => void;
    };
    const drawInstance = (
      this.Draw as unknown as Record<string, FinishableDrawInstance | undefined>
    )[activeShape];

    if (
      !drawInstance?._finishShape ||
      !this.Keyboard._canFinishShape(drawInstance, activeShape)
    ) {
      return false;
    }

    drawInstance._finishShape();
    return true;
  },
  // optionsModifier for special options like ignoreShapes or merge
  setPathOptions(
    this: IMapPM,
    options: L.PathOptions,
    optionsModifier: PathOptionsModifier = {}
  ) {
    // A number or object is truthy. `.indexOf` then throws, and no shape is styled.
    const ignore = Array.isArray(optionsModifier.ignoreShapes)
      ? optionsModifier.ignoreShapes
      : [];
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
    // Merge into the stored options. Arrays such as snappingOrder replace the
    // old value, and the caller's nested objects are copied.
    const options = mergeOptions(
      this.globalOptions,
      checkOptions(o, 'setGlobalOptions()')
    );

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
    const layers = PM.Utils.findLayers(this.map);
    (layers as PMLayer[]).forEach((layer) => {
      // Fill only the keys the layer has not set itself (#1113), and do not
      // record them as its own choice.
      layer.pm._applyInheritedOptions(options);
    });

    this.map.fire('pm:globaloptionschanged');

    // store options
    this.globalOptions = options;

    // apply the options (actually trigger the functionality)
    this.applyGlobalOptions();
  },
  applyGlobalOptions(this: IMapPM) {
    const layers = PM.Utils.findLayers(this.map);
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
  enableGlobalCutMode(this: IMapPM, options?: DrawOptions) {
    return this.Draw.Cut.enable(options);
  },
  toggleGlobalCutMode(this: IMapPM, options?: DrawOptions) {
    return this.Draw.Cut.toggle(options);
  },
  disableGlobalCutMode(this: IMapPM) {
    return this.Draw.Cut.disable();
  },
  getGeomanLayers(this: IMapPM, asGroup = false) {
    const layers = PM.Utils.findLayers(this.map);
    if (!asGroup) {
      return layers;
    }
    const group = new L.FeatureGroup();
    group._pmTempLayer = true;
    layers.forEach((layer) => {
      group.addLayer(layer);
    });
    return group;
  },
  getGeomanDrawLayers(this: IMapPM, asGroup = false) {
    const layers = PM.Utils.findLayers(this.map).filter(
      (l) => l._drawnByGeoman === true
    );
    if (!asGroup) {
      return layers;
    }
    const group = new L.FeatureGroup();
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
    return this.map.options.crs === L.SimpleCRS;
  },
});

export default Map;
