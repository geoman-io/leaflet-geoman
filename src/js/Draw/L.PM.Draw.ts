import merge from 'lodash/merge';
import SnapMixin from '../Mixins/Snapping';
import EventMixin from '../Mixins/Events';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    Draw: {
      [key: string]: new (map: L.Map) => DrawInstance;
    };
    Utils: {
      disablePopup: (layer: L.Layer) => void;
      enablePopup: (layer: L.Layer) => void;
    };
  };
  Class: {
    extend: <T>(props: T) => new (...args: unknown[]) => T;
  };
  Util: {
    setOptions: <T extends { options: object }>(obj: T, options: object) => void;
  };
  Icon: {
    Default: new () => L.Icon & {
      options: L.IconOptions & {
        tooltipAnchor?: [number, number];
      };
    };
  };
  icon: () => L.Icon;
};

/**
 * Draw options interface
 */
export interface DrawOptions {
  snappable?: boolean;
  snapDistance?: number;
  snapMiddle?: boolean;
  allowSelfIntersection?: boolean;
  tooltips?: boolean;
  templineStyle?: L.PolylineOptions;
  hintlineStyle?: L.PolylineOptions;
  pathOptions?: L.PathOptions | null;
  cursorMarker?: boolean;
  finishOn?: string | null;
  markerStyle?: {
    draggable?: boolean;
    icon?: L.Icon;
  };
  hideMiddleMarkers?: boolean;
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  minRadiusCircleMarker?: number | null;
  maxRadiusCircleMarker?: number | null;
  resizeableCircleMarker?: boolean;
  resizeableCircle?: boolean;
  markerEditable?: boolean;
  continueDrawing?: boolean;
  snapSegment?: boolean;
  requireSnapToFinish?: boolean;
  rectangleAngle?: number;
  textOptions?: {
    text?: string | null;
    focusAfterDraw?: boolean | null;
    removeIfEmpty?: boolean | null;
    className?: string | null;
  };
  snapVertex?: boolean;
  [key: string]: unknown;
}

/**
 * Draw instance interface
 */
interface DrawInstance {
  _map: L.Map;
  _shape?: string;
  _enabled?: boolean;
  toolbarButtonName?: string;
  options: DrawOptions;
  enable: (options?: object) => void;
  disable: () => void;
  setOptions: (options: object) => void;
  addButton?: () => void;
}

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  pm?: {
    setOptions: (options: object) => void;
    _shape?: string;
    _map?: L.Map;
  };
  _pmTempLayer?: boolean;
  _drawnByGeoman?: boolean;
  options: L.LayerOptions & {
    pane?: string;
  };
}

/**
 * Extended map with PM - using type intersection to avoid property conflicts
 */
type ExtendedMap = L.Map & {
  pm: {
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * Shape mapping type
 */
type ShapeMapping = Record<string, string>;

/**
 * Draw class interface
 */
export interface IDraw {
  options: DrawOptions;
  _map: ExtendedMap;
  _shape?: string;
  _enabled?: boolean;
  _layer?: L.Layer & { _map?: L.Map };
  shapes: string[];
  Marker: DrawInstance;
  CircleMarker: DrawInstance;
  Line: DrawInstance;
  Polygon: DrawInstance;
  Rectangle: DrawInstance;
  Circle: DrawInstance;
  Cut: DrawInstance;
  Text: DrawInstance;
  [key: string]: unknown;

  setOptions(options: DrawOptions): void;
  setStyle(options?: DrawOptions): void;
  getOptions(): DrawOptions;
  initialize(map: L.Map): void;
  setPathOptions(options: L.PathOptions, mergeOptions?: boolean): void;
  getShapes(): string[];
  getShape(): string | undefined;
  enable(shape: string, options?: object): void;
  disable(): void;
  addControls(): void;
  getActiveShape(): string | undefined;
  _setGlobalDrawMode(): void;
  createNewDrawInstance(name: string, jsClass: string): DrawInstance;
  _getShapeFromBtnName(name: string): string;
  _finishLayer(layer: PMLayer): void;
  _addDrawnLayerProp(layer: PMLayer): void;
  _setPane(layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane'): void;
  _isFirstLayer(): boolean;
  // From EventMixin
  _fireGlobalCutModeToggled?: () => void;
  _fireGlobalDrawModeToggled?: () => void;
}

const Draw = L.Class.extend({
  includes: [SnapMixin, EventMixin],
  options: {
    snappable: true, // TODO: next major Release, rename it to allowSnapping
    snapDistance: 20,
    snapMiddle: false,
    allowSelfIntersection: true,
    tooltips: true,
    templineStyle: {},
    hintlineStyle: {
      color: '#3388ff',
      dashArray: '5,5',
    },
    pathOptions: null,
    cursorMarker: true,
    finishOn: null,
    markerStyle: {
      draggable: true,
      icon: L.icon(),
    },
    hideMiddleMarkers: false,
    minRadiusCircle: null,
    maxRadiusCircle: null,
    minRadiusCircleMarker: null,
    maxRadiusCircleMarker: null,
    resizeableCircleMarker: false,
    resizeableCircle: true,
    markerEditable: true,
    continueDrawing: false,
    snapSegment: true,
    requireSnapToFinish: false,
    rectangleAngle: 0,
    textOptions: {
      text: null,
      focusAfterDraw: null,
      removeIfEmpty: null,
      className: null,
    },
    snapVertex: true,
  } as DrawOptions,
  setOptions(this: IDraw, options: DrawOptions) {
    L.Util.setOptions(this, options);
    this.setStyle(this.options);
  },
  setStyle(this: IDraw) {
    // Override in subclasses
  },
  getOptions(this: IDraw) {
    return this.options;
  },
  initialize(this: IDraw, map: L.Map) {
    // Overwriting the default tooltipAnchor of the default Marker Icon, because the tooltip functionality was updated but not the anchor in the Icon
    // Issue https://github.com/Leaflet/Leaflet/issues/7302 - Leaflet v1.7.1
    const defaultIcon = new L.Icon.Default();
    defaultIcon.options.tooltipAnchor = [0, 0];
    this.options.markerStyle!.icon = defaultIcon as L.Icon;

    // save the map
    this._map = map as unknown as ExtendedMap;

    // define all possible shapes that can be drawn
    this.shapes = [
      'Marker',
      'CircleMarker',
      'Line',
      'Polygon',
      'Rectangle',
      'Circle',
      'Cut',
      'Text',
    ];

    // initiate drawing class for our shapes
    this.shapes.forEach((shape) => {
      this[shape] = new L.PM.Draw[shape](this._map);
    });

    // TODO: Remove this with the next major release
    this.Marker.setOptions({ continueDrawing: true });
    this.CircleMarker.setOptions({ continueDrawing: true });
  },
  setPathOptions(this: IDraw, options: L.PathOptions, mergeOptions = false) {
    if (!mergeOptions) {
      this.options.pathOptions = options;
    } else {
      this.options.pathOptions = merge(this.options.pathOptions, options);
    }
  },
  getShapes(this: IDraw) {
    // if somebody wants to know what shapes are available
    return this.shapes;
  },
  getShape(this: IDraw) {
    // return the shape of the current drawing layer
    return this._shape;
  },
  enable(this: IDraw, shape: string, options?: object) {
    if (!shape) {
      throw new Error(
        `Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(
          ','
        )}`
      );
    }

    // disable drawing for all shapes
    this.disable();

    // enable draw for a shape
    (this[shape] as DrawInstance).enable(options);
  },
  disable(this: IDraw) {
    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach((shape) => {
      (this[shape] as DrawInstance).disable();
    });
  },
  addControls(this: IDraw) {
    // add control buttons for our shapes
    this.shapes.forEach((shape) => {
      (this[shape] as DrawInstance).addButton?.();
    });
  },
  getActiveShape(this: IDraw) {
    // returns the active shape
    let enabledShape: string | undefined;
    this.shapes.forEach((shape) => {
      if ((this[shape] as DrawInstance)._enabled) {
        enabledShape = shape;
      }
    });
    return enabledShape;
  },
  _setGlobalDrawMode(this: IDraw) {
    // extended to all PM.Draw shapes
    if (this._shape === 'Cut') {
      this._fireGlobalCutModeToggled?.();
    } else {
      this._fireGlobalDrawModeToggled?.();
    }

    const layers: PMLayer[] = [];
    this._map.eachLayer((layer) => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker ||
        layer instanceof L.ImageOverlay
      ) {
        // filter out everything that's leaflet-geoman specific temporary stuff
        const pmLayer = layer as PMLayer;
        if (!pmLayer._pmTempLayer) {
          layers.push(pmLayer);
        }
      }
    });

    if (this._enabled) {
      layers.forEach((layer) => {
        L.PM.Utils.disablePopup(layer);
      });
    } else {
      layers.forEach((layer) => {
        L.PM.Utils.enablePopup(layer);
      });
    }
  },

  createNewDrawInstance(this: IDraw, name: string, jsClass: string) {
    const instance = this._getShapeFromBtnName(jsClass);
    if (this[name]) {
      throw new TypeError('Draw Type already exists');
    }
    if (!L.PM.Draw[instance]) {
      throw new TypeError(`There is no class L.PM.Draw.${instance}`);
    }

    this[name] = new L.PM.Draw[instance](this._map);
    (this[name] as DrawInstance).toolbarButtonName = name;
    (this[name] as DrawInstance)._shape = name;
    this.shapes.push(name);

    // needed when extended / copied from a custom instance
    if (this[jsClass]) {
      (this[name] as DrawInstance).setOptions((this[jsClass] as DrawInstance).options);
    }
    // Re-init the options, so it is not referenced with the default Draw class
    (this[name] as DrawInstance).setOptions((this[name] as DrawInstance).options);

    return this[name] as DrawInstance;
  },
  _getShapeFromBtnName(this: IDraw, name: string) {
    const shapeMapping: ShapeMapping = {
      drawMarker: 'Marker',
      drawCircle: 'Circle',
      drawPolygon: 'Polygon',
      drawPolyline: 'Line',
      drawRectangle: 'Rectangle',
      drawCircleMarker: 'CircleMarker',
      editMode: 'Edit',
      dragMode: 'Drag',
      cutPolygon: 'Cut',
      removalMode: 'Removal',
      rotateMode: 'Rotate',
      drawText: 'Text',
    };

    if (shapeMapping[name]) {
      return shapeMapping[name];
    }
    return this[name] ? (this[name] as DrawInstance)._shape! : name;
  },
  _finishLayer(this: IDraw, layer: PMLayer) {
    if (layer.pm) {
      // add the pm options from drawing to the new layer (edit)
      layer.pm.setOptions(this.options);
      // set the shape (can be a custom shape)
      layer.pm._shape = this._shape;
      // apply the map to the new created layer in the pm object
      layer.pm._map = this._map;
    }
    this._addDrawnLayerProp(layer);
  },
  _addDrawnLayerProp(this: IDraw, layer: PMLayer) {
    layer._drawnByGeoman = true;
  },
  _setPane(this: IDraw, layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane') {
    if (type === 'layerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.layerPane) ||
        'overlayPane';
    } else if (type === 'vertexPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.vertexPane) ||
        'markerPane';
    } else if (type === 'markerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.markerPane) ||
        'markerPane';
    }
  },
  _isFirstLayer(this: IDraw) {
    const map = this._map || (this._layer?._map as ExtendedMap);
    return map.pm.getGeomanLayers().length === 0;
  },
});

export default Draw;
