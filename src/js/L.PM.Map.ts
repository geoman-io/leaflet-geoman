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
    _applyOptions: (options: EditOptions) => void;
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

  initialize(map: L.Map): void;
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
  // From EventMixin
  _fireLangChange: (
    oldLang: string,
    newLang: string,
    fallback: string,
    translation: unknown
  ) => void;
}
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import translations from '../assets/translations';
import GlobalEditMode from './Mixins/Modes/Mode.Edit';
import GlobalDragMode from './Mixins/Modes/Mode.Drag';
import GlobalRemovalMode from './Mixins/Modes/Mode.Removal';
import GlobalRotateMode from './Mixins/Modes/Mode.Rotate';
import EventMixin from './Mixins/Events';
import createKeyboardMixins from './Mixins/Keyboard';
import { getRenderer } from './helpers';
import { resolveLanguageCode } from './helpers/language';

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

    const oldLang = PM.activeLang;
    if (override) {
      // Merge into a new object; merging into translations[fallback] would
      // overwrite the built-in fallback language with the override.
      translations[lang] = merge({}, translations[fallback], override);
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
    // merge passed and existing options. Arrays such as snappingOrder replace
    // the old value; lodash merge would combine them index by index.
    const options = mergeWith(this.globalOptions, o, (_old, value) =>
      Array.isArray(value) ? [...value] : undefined
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
      // Apply to layers on the map now. Do not record this as the layer's own
      // choice, or a later global change is ignored when the layer is re-added.
      layer.pm._applyOptions(options);
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
