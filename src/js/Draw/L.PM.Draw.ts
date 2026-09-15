import type { Inherit, MixinMembers } from '../../types/leaflet-class';
import type {
  LeafletClass,
  LeafletClassFactory,
} from '../../types/leaflet-class';
import type { IDrawMarker } from './L.PM.Draw.Marker';
import type { IDrawCircleMarker } from './L.PM.Draw.CircleMarker';
import type { IDrawLine } from './L.PM.Draw.Line';
import type { IDrawPolygon } from './L.PM.Draw.Polygon';
import type { IDrawRectangle } from './L.PM.Draw.Rectangle';
import type { IDrawCircle } from './L.PM.Draw.Circle';
import type { IDrawCut } from './L.PM.Draw.Cut';
import type { IDrawText } from './L.PM.Draw.Text';

import type { DrawOptions } from '../../types/options';
export type { DrawOptions } from '../../types/options';

/**
 * Draw instance interface
 */
export interface DrawInstance {
  _map: L.Map;
  _shape?: string;
  _enabled?: boolean;
  toolbarButtonName?: string;
  options: DrawOptions;
  enable: (options?: DrawOptions) => void;
  disable: () => void;
  setOptions: (options: DrawOptions) => void;
  enabled(): boolean;
  toggle(options?: DrawOptions): void;
  setPathOptions(options: L.PathOptions, merge?: boolean): void;
}

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  pm?: {
    setOptions: (options: DrawOptions) => void;
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
  options: DrawOptions & {
    markerStyle: NonNullable<DrawOptions['markerStyle']>;
  };
  _map: ExtendedMap;
  _shape?: string;
  _enabled?: boolean;
  _layer?: L.Layer & { _map?: L.Map };
  shapes: string[];
  Marker: DrawInstances['Marker'];
  CircleMarker: DrawInstances['CircleMarker'];
  Line: DrawInstances['Line'];
  Polygon: DrawInstances['Polygon'];
  Rectangle: DrawInstances['Rectangle'];
  Circle: DrawInstances['Circle'];
  Cut: DrawInstances['Cut'];
  Text: DrawInstances['Text'];

  setOptions(options: DrawOptions): void;
  setStyle(options?: DrawOptions): void;
  getOptions(): DrawOptions;
  initialize(map: L.Map): void;
  setPathOptions(options: L.PathOptions, mergeOptions?: boolean): void;
  getShapes(): string[];
  getShape(): string | undefined;
  enable(shape: string, options?: DrawOptions): void;
  disable(shape?: string): void;
  addControls(): void;
  getActiveShape(): string | undefined;
  _setGlobalDrawMode(): void;
  createNewDrawInstance(name: string, jsClass: string): DrawInstance;
  _getShapeFromBtnName(name: string): string;
  _finishLayer(layer: PMLayer): void;
  _addDrawnLayerProp(layer: PMLayer): void;
  _setPane(
    layer: PMLayer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ): void;
  _isFirstLayer(): boolean;
  // From EventMixin
  _fireGlobalCutModeToggled: () => void;
  _fireGlobalDrawModeToggled: () => void;
}
import merge from 'lodash/merge';
import SnapMixin from '../Mixins/Snapping';
import EventMixin from '../Mixins/Events';

const Draw = (L.Class as unknown as LeafletClassFactory).extend<
  IDraw,
  [L.Map],
  [typeof SnapMixin, typeof EventMixin]
>({
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
      icon: (L.icon as (options?: L.IconOptions) => L.Icon)(),
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
  },
  setOptions(this: IDraw, options: DrawOptions) {
    L.Util.setOptions(this, options);
    this.setStyle(this.options);
  },
  setStyle(this: IDraw) {},
  getOptions(this: IDraw) {
    return this.options;
  },
  initialize(this: IDraw, map: L.Map) {
    // Overwriting the default tooltipAnchor of the default Marker Icon, because the tooltip functionality was updated but not the anchor in the Icon
    // Issue https://github.com/Leaflet/Leaflet/issues/7302 - Leaflet v1.7.1
    const defaultIcon = new L.Icon.Default();
    defaultIcon.options.tooltipAnchor = [0, 0];
    this.options.markerStyle.icon = defaultIcon;

    // save the map
    this._map = map as typeof this._map;

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
      (this as unknown as ShapeRegistry)[shape] = new (L.PM.Draw[
        shape
      ] as LeafletClass<DrawInstance, [L.Map]>)(this._map);
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
  enable(this: IDraw, shape: string, options?: DrawOptions) {
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
    (this as unknown as ShapeRegistry)[shape].enable(options);
  },
  disable(this: IDraw) {
    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach((shape) => {
      (this as unknown as ShapeRegistry)[shape].disable();
    });
  },
  addControls(this: IDraw) {
    // add control buttons for our shapes
    this.shapes.forEach((shape) => {
      (
        (this as unknown as ShapeRegistry)[shape] as DrawInstance & {
          addButton(): void;
        }
      ).addButton();
    });
  },
  getActiveShape(this: IDraw) {
    // returns the active shape
    let enabledShape: string | undefined;
    this.shapes.forEach((shape) => {
      if ((this as unknown as ShapeRegistry)[shape]._enabled) {
        enabledShape = shape;
      }
    });
    return enabledShape;
  },
  _setGlobalDrawMode(this: IDraw) {
    // extended to all PM.Draw shapes
    if (this._shape === 'Cut') {
      this._fireGlobalCutModeToggled();
    } else {
      this._fireGlobalDrawModeToggled();
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
        if (!layer._pmTempLayer) {
          layers.push(layer);
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
    if ((this as unknown as ShapeRegistry)[name]) {
      throw new TypeError('Draw Type already exists');
    }
    if (!L.PM.Draw[instance]) {
      throw new TypeError(`There is no class L.PM.Draw.${instance}`);
    }

    (this as unknown as ShapeRegistry)[name] = new (L.PM.Draw[
      instance
    ] as LeafletClass<DrawInstance, [L.Map]>)(this._map);
    (this as unknown as ShapeRegistry)[name].toolbarButtonName = name;
    (this as unknown as ShapeRegistry)[name]._shape = name;
    this.shapes.push(name);

    // needed when extended / copied from a custom instance
    if ((this as unknown as ShapeRegistry)[jsClass]) {
      (this as unknown as ShapeRegistry)[name].setOptions(
        (this as unknown as ShapeRegistry)[jsClass].options
      );
    }
    // Re-init the options, so it is not referenced with the default Draw class
    (this as unknown as ShapeRegistry)[name].setOptions(
      (this as unknown as ShapeRegistry)[name].options
    );

    return (this as unknown as ShapeRegistry)[name] as DrawInstance;
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
    return (this as unknown as ShapeRegistry)[name]
      ? (this as unknown as ShapeRegistry)[name]._shape!
      : name;
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
  _setPane(
    this: IDraw,
    layer: PMLayer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ) {
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
    const map = this._map || this._layer!._map!;
    return map.pm.getGeomanLayers().length === 0;
  },
}) as DrawClass;

export default Draw;

export type DrawBase = Inherit<
  MixinMembers<[typeof SnapMixin, typeof EventMixin]>,
  IDraw
>;

export interface DrawClass extends LeafletClass<DrawBase, [L.Map]> {
  Marker: LeafletClass<DrawInstances['Marker'], [L.Map]>;
  CircleMarker: LeafletClass<DrawInstances['CircleMarker'], [L.Map]>;
  Line: LeafletClass<DrawInstances['Line'], [L.Map]>;
  Polygon: LeafletClass<DrawInstances['Polygon'], [L.Map]>;
  Rectangle: LeafletClass<DrawInstances['Rectangle'], [L.Map]>;
  Circle: LeafletClass<DrawInstances['Circle'], [L.Map]>;
  Cut: LeafletClass<DrawInstances['Cut'], [L.Map]>;
  Text: LeafletClass<DrawInstances['Text'], [L.Map]>;
  [name: string]: unknown;
}

export interface DrawInstances {
  Marker: Inherit<Inherit<DrawBase, DrawInstance>, IDrawMarker>;
  CircleMarker: Inherit<Inherit<DrawBase, DrawInstance>, IDrawCircleMarker>;
  Circle: Inherit<DrawInstances['CircleMarker'], IDrawCircle>;
  Line: Inherit<Inherit<DrawBase, DrawInstance>, IDrawLine>;
  Polygon: Inherit<DrawInstances['Line'], IDrawPolygon>;
  Rectangle: Inherit<Inherit<DrawBase, DrawInstance>, IDrawRectangle>;
  Cut: Inherit<DrawInstances['Polygon'], IDrawCut>;
  Text: Inherit<Inherit<DrawBase, DrawInstance>, IDrawText>;
}

type ShapeRegistry = Record<string, DrawInstance>;
