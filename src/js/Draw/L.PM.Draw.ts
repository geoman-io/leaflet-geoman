import * as L from 'leaflet';
import { PM } from '../PM';
import { applyMixins, defineOptions } from '../helpers/classes';
import type { MixinMembers } from '../../types/leaflet-class';
import type DrawMarker from './L.PM.Draw.Marker';
import type DrawCircleMarker from './L.PM.Draw.CircleMarker';
import type DrawLine from './L.PM.Draw.Line';
import type DrawPolygon from './L.PM.Draw.Polygon';
import type DrawRectangle from './L.PM.Draw.Rectangle';
import type DrawCircle from './L.PM.Draw.Circle';
import type DrawCut from './L.PM.Draw.Cut';
import type DrawText from './L.PM.Draw.Text';

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
    _applyOptions?: (options: DrawOptions) => void;
    _shape?: string;
    _map?: L.Map;
  };
  _pmTempLayer?: boolean;
  _drawnByGeoman?: boolean;
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

import { checkOptions, mergeOptions as mergeInto } from '../helpers/options';
import SnapMixin from '../Mixins/Snapping';
import EventMixin from '../Mixins/Events';

class Draw {
  declare options: DrawOptions & {
    markerStyle: NonNullable<DrawOptions['markerStyle']>;
  };
  declare _map: ExtendedMap;
  declare _shape?: string;
  declare _enabled?: boolean;
  declare _layer?: L.Layer & { _map?: L.Map };
  declare shapes: string[];
  declare Marker: DrawMarker;
  declare CircleMarker: DrawCircleMarker;
  declare Line: DrawLine;
  declare Polygon: DrawPolygon;
  declare Rectangle: DrawRectangle;
  declare Circle: DrawCircle;
  declare Cut: DrawCut;
  declare Text: DrawText;

  // The tool classes, registered by their modules.
  declare static Marker: typeof DrawMarker;
  declare static CircleMarker: typeof DrawCircleMarker;
  declare static Line: typeof DrawLine;
  declare static Polygon: typeof DrawPolygon;
  declare static Rectangle: typeof DrawRectangle;
  declare static Circle: typeof DrawCircle;
  declare static Cut: typeof DrawCut;
  declare static Text: typeof DrawText;

  constructor(map: L.Map) {
    // an own options object, as the Leaflet 1 style class factory made
    L.Util.setOptions(this, undefined as never);
    this._map = map as typeof this._map;

    // The tools extend Draw through DrawTool; every other Draw, including a
    // subclass, creates its own tools.
    if (this instanceof DrawTool) {
      return;
    }

    // Leaflet's DefaultIcon puts tooltips at [16, -28], above the icon and off
    // the cursor; Geoman's draw hints sit under the marker instead.
    this.options.markerStyle.icon = new L.DefaultIcon({
      tooltipAnchor: [0, 0],
    });

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
      (this as unknown as ShapeRegistry)[shape] = new (
        PM.Draw as unknown as ToolClasses
      )[shape](this._map);
    });

    // TODO: Remove this with the next major release
    this.Marker.setOptions({ continueDrawing: true });
    this.CircleMarker.setOptions({ continueDrawing: true });
  }
  setOptions(options: DrawOptions) {
    L.Util.setOptions(this, options);
    this.setStyle(this.options);
  }
  setStyle(_options?: DrawOptions) {}
  getOptions() {
    return this.options;
  }
  setPathOptions(options: L.PathOptions, mergeOptions = false) {
    if (!mergeOptions) {
      this.options.pathOptions = options;
    } else {
      // A new object: merging into the current one would also change the
      // object passed to an earlier setPathOptions.
      this.options.pathOptions = mergeInto(
        mergeInto({}, this.options.pathOptions),
        options
      );
    }
  }
  getShapes() {
    // if somebody wants to know what shapes are available
    return this.shapes;
  }
  getShape() {
    // return the shape of the current drawing layer
    return this._shape;
  }
  enable(shape: string, options?: DrawOptions) {
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
    (this as unknown as ShapeRegistry)[shape].enable(
      checkOptions(options, 'enableDraw()')
    );
  }
  disable(_shape?: string) {
    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach((shape) => {
      (this as unknown as ShapeRegistry)[shape].disable();
    });
  }
  addControls() {
    // add control buttons for our shapes
    this.shapes.forEach((shape) => {
      (
        (this as unknown as ShapeRegistry)[shape] as DrawInstance & {
          addButton(): void;
        }
      ).addButton();
    });
  }
  getActiveShape() {
    // returns the active shape
    let enabledShape: string | undefined;
    this.shapes.forEach((shape) => {
      if ((this as unknown as ShapeRegistry)[shape]._enabled) {
        enabledShape = shape;
      }
    });
    return enabledShape;
  }
  _setGlobalDrawMode() {
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
        PM.Utils.disablePopup(layer);
      });
    } else {
      layers.forEach((layer) => {
        PM.Utils.enablePopup(layer);
      });
    }
  }

  createNewDrawInstance(name: string, jsClass: string) {
    const instance = this._getShapeFromBtnName(jsClass);
    if ((this as unknown as ShapeRegistry)[name]) {
      throw new TypeError('Draw Type already exists');
    }
    if (!(PM.Draw as unknown as ToolClasses)[instance]) {
      throw new TypeError(`There is no class PM.Draw.${instance}`);
    }

    (this as unknown as ShapeRegistry)[name] = new (
      PM.Draw as unknown as ToolClasses
    )[instance](this._map);
    (this as unknown as ShapeRegistry)[name].toolbarButtonName = name;
    (this as unknown as ShapeRegistry)[name]._shape = name;
    this.shapes.push(name);
    this._map.pm._registerDrawMode(name);

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
  }
  _getShapeFromBtnName(name: string) {
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
  }
  _finishLayer(layer: PMLayer) {
    if (layer.pm) {
      // Copy draw options onto the new layer without treating them as a lock.
      if (layer.pm._applyOptions) {
        layer.pm._applyOptions(this.options);
      } else {
        layer.pm.setOptions(this.options);
      }
      // set the shape (can be a custom shape)
      layer.pm._shape = this._shape;
      // apply the map to the new created layer in the pm object
      layer.pm._map = this._map;
    }
    this._addDrawnLayerProp(layer);
  }
  _addDrawnLayerProp(layer: PMLayer) {
    layer._drawnByGeoman = true;
  }
  _setPane(layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane') {
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
  }
  _isFirstLayer() {
    const map = this._map || this._layer!._map!;
    return map.pm.getGeomanLayers().length === 0;
  }
}

defineOptions(Draw, {
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
    icon: new L.Icon({} as L.IconOptions),
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
});

// The mixins' members, as the old class factory typed them.
type DrawMixins = MixinMembers<[typeof SnapMixin, typeof EventMixin]>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Draw extends DrawMixins {}
applyMixins(Draw, SnapMixin, EventMixin);

/**
 * The base of the draw tools. A tool's enable() takes options, not a shape,
 * and each tool has its own options type.
 */
interface DrawToolBase extends Omit<
  Draw,
  'enable' | 'disable' | 'setStyle' | 'options' | '_map'
> {
  disable(): void;
  setStyle(): void;
}
export const DrawTool = class extends Draw {} as unknown as new (
  map: L.Map
) => DrawToolBase;

export default Draw;

type ShapeRegistry = Record<string, DrawInstance>;
type ToolClasses = Record<string, new (map: L.Map) => DrawInstance>;
