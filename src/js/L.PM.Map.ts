import * as L from 'leaflet';
import { applyMixins } from './helpers/classes';
import type { MixinMembers } from './helpers/classes';
import { PM } from './PM';
import type Draw from './Draw/L.PM.Draw';
import type Toolbar from './Toolbar/L.PM.Toolbar';
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

/**
 * A change validators check. `draw:vertex` places a point of the working
 * `layer`; `draw:finish` is the final layer before it's added; the edit
 * actions come after the change, which a veto resets; `drag` and `rotate`
 * come before each frame is applied, which a veto skips.
 */
export type UnstableChange = { shape: string; layer: L.Layer } & (
  | { action: 'draw:vertex'; latlng: L.LatLng }
  | { action: 'draw:finish' }
  | { action: 'edit:vertexmove' | 'edit:vertexremove' }
  | { action: 'drag'; delta: L.LatLngLiteral }
  | { action: 'rotate'; latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][] }
);
export type UnstableValidator = (change: UnstableChange) => boolean | void;

class Map {
  declare map: L.Map & { pm: Map };
  declare Draw: Draw;
  declare Toolbar: Toolbar;
  declare Keyboard: IKeyboardMixin;
  declare globalOptions: GlobalOptions;
  declare _modes: ModeManager;
  /**
   * Checks a change before it is applied, or right after for vertex edits,
   * which are then reset. A validator returning `false` vetoes it. Drag and
   * rotate run it on every frame. For @geoman-io packages, without a semver
   * guarantee.
   */
  declare unstable_validators: UnstableValidator[];

  declare options: object;

  constructor(map: L.Map) {
    // an empty own options object, as the Leaflet 1 style class factory made
    L.Util.setOptions(this, undefined as never);
    this.map = map as typeof this.map;
    this.Draw = new PM.Draw(map);
    this.Toolbar = new PM.Toolbar(map);
    this.Keyboard = createKeyboardMixins();

    // Draw tools first, then the global modes: the order Escape used to
    // check them in.
    this._modes = new ModeManager(() => !!this.globalOptions.combineModes);
    this.unstable_validators = [];
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
  }

  // Unstable: for @geoman-io packages, without a semver guarantee. Returns
  // the function the mode calls when it turns on. A mode with a `button` and
  // no `yieldTo` yields through its button, like the built-in modes.
  unstable_registerMode(name: string, mode: ModeDefinition) {
    const { button } = mode;
    // Delegate rather than spread, so a class-instance mode keeps its
    // prototype methods and `this`
    this._modes.register(
      name,
      mode.yieldTo || !button
        ? mode
        : {
            targets: mode.targets,
            button,
            enabled: () => mode.enabled(),
            disable: () => mode.disable(),
            yieldTo: this._yieldThroughButton(
              () => button,
              () => mode.disable()
            ),
          }
    );
    return () => this._modes._exclusive(name);
  }
  /** False when a validator vetoes the change. */
  _isValidChange(change: UnstableChange) {
    const validators = this.unstable_validators;
    for (let i = 0; i < validators.length; i += 1) {
      if (validators[i](change) === false) {
        return false;
      }
    }
    return true;
  }
  unstable_activeModes() {
    return this._modes.active();
  }
  _registerDrawMode(shape: string) {
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
  }
  _registerGlobalMode(
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
  }
  // While the mode's button is toggled and clickable, another mode turns it
  // off the way the toolbar always did: by clicking it. A button that other
  // buttons may not turn off keeps its mode on. Otherwise, such as when the
  // button is gone, disabled, or was rebuilt untoggled by setLang, the mode
  // is disabled directly.
  _yieldThroughButton(
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
  }
  setLang(lang = 'en', override?: object, fallback = 'en') {
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
  }
  addControls(options?: PMTypes.ToolbarOptions) {
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

  enableDraw(shape = 'Polygon', options?: DrawOptions) {
    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

    this.Draw.enable(shape, options);
  }
  disableDraw(shape = 'Polygon') {
    // backwards compatible, remove after 3.0
    if (shape === 'Poly') {
      shape = 'Polygon';
    }

    this.Draw.disable(shape);
  }
  finishDraw() {
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
  }
  // optionsModifier for special options like ignoreShapes or merge
  setPathOptions(
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
  }

  getGlobalOptions() {
    return this.globalOptions;
  }
  setGlobalOptions(o: Partial<GlobalOptions>) {
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
  }
  applyGlobalOptions() {
    const layers = PM.Utils.findLayers(this.map);
    (layers as PMLayer[]).forEach((layer) => {
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
  enableGlobalCutMode(options?: DrawOptions) {
    return this.Draw.Cut.enable(options);
  }
  toggleGlobalCutMode(options?: DrawOptions) {
    return this.Draw.Cut.toggle(options);
  }
  disableGlobalCutMode() {
    return this.Draw.Cut.disable();
  }
  getGeomanLayers(asGroup = false) {
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
  }
  getGeomanDrawLayers(asGroup = false) {
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
  }
  // returns the map instance by default or a layergroup is set through global options
  _getContainingLayer() {
    return this.globalOptions.layerGroup &&
      this.globalOptions.layerGroup instanceof L.LayerGroup
      ? this.globalOptions.layerGroup
      : this.map;
  }
  _isCRSSimple() {
    return this.map.options.crs === L.SimpleCRS;
  }
}

// The mixins' members, merged into the class's type.
type MapMixins = MixinMembers<
  [
    typeof GlobalEditMode,
    typeof GlobalDragMode,
    typeof GlobalRemovalMode,
    typeof GlobalRotateMode,
    typeof EventMixin,
  ]
>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Map extends MapMixins {}
applyMixins(
  Map,
  GlobalEditMode,
  GlobalDragMode,
  GlobalRemovalMode,
  GlobalRotateMode,
  EventMixin
);

export { Map };
export default Map;
