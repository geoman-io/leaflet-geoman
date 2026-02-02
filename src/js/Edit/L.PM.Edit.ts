import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';
import RotateMixin from '../Mixins/Rotating';
import EventMixin from '../Mixins/Events';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Class: {
    extend: <T>(props: T) => new (...args: unknown[]) => T;
  };
  Util: {
    setOptions: <T extends { options: object }>(obj: T, options: object) => void;
  };
};

/**
 * Vertex validation arguments
 */
interface VertexValidationArgs {
  layer: L.Layer;
  marker: ExtendedMarker;
  event: L.LeafletEvent;
}

/**
 * Vertex validation function type
 */
type VertexValidationFn = (args: VertexValidationArgs) => boolean;

/**
 * Edit options interface
 */
export interface EditOptions {
  snappable?: boolean;
  snapDistance?: number;
  allowSelfIntersection?: boolean;
  allowSelfIntersectionEdit?: boolean;
  preventMarkerRemoval?: boolean;
  removeLayerBelowMinVertexCount?: boolean;
  limitMarkersToCount?: number;
  hideMiddleMarkers?: boolean;
  snapSegment?: boolean;
  syncLayersOnDrag?: boolean | L.Layer[];
  draggable?: boolean;
  allowEditing?: boolean;
  allowRemoval?: boolean;
  allowCutting?: boolean;
  allowRotation?: boolean;
  addVertexOn?: string;
  removeVertexOn?: string;
  removeVertexValidation?: VertexValidationFn;
  addVertexValidation?: VertexValidationFn;
  moveVertexValidation?: VertexValidationFn;
  resizeableCircleMarker?: boolean;
  resizeableCircle?: boolean;
  snapMiddle?: boolean;
  snapVertex?: boolean;
  [key: string]: unknown;
}

/**
 * Extended marker with validation chain
 */
interface ExtendedMarker extends L.Marker {
  _cancelDragEventChain?: L.LatLng | null;
  _latlng?: L.LatLng;
  update?: () => void;
}

/**
 * Extended layer with PM and map - using type intersection to avoid protected property issues
 */
type PMLayer = L.Layer & {
  _map?: ExtendedMap;
  options: L.LayerOptions & {
    pane?: string;
  };
};

/**
 * Extended map with PM
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
    removeLayer: (e: { target: L.Layer }) => void;
  };
};

/**
 * Edit class interface
 */
export interface IEdit {
  options: EditOptions;
  _map?: ExtendedMap;
  _layer: L.Layer & { _map?: L.Map };
  _shape?: string;

  setOptions(options: EditOptions): void;
  getOptions(): EditOptions;
  applyOptions(): void;
  isPolygon(): boolean;
  getShape(): string | undefined;
  _setPane(layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane'): void;
  remove(): void;
  _vertexValidation(type: 'move' | 'add' | 'remove', e: L.LeafletEvent & { target: ExtendedMarker }): boolean;
  _vertexValidationDrag(marker: ExtendedMarker): boolean;
  _vertexValidationDragEnd(marker: ExtendedMarker): boolean;
}

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin, RotateMixin, EventMixin],
  options: {
    snappable: true, // TODO: next major Release, rename it to allowSnapping
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    preventMarkerRemoval: false,
    removeLayerBelowMinVertexCount: true,
    limitMarkersToCount: -1,
    hideMiddleMarkers: false,
    snapSegment: true,
    syncLayersOnDrag: false,
    draggable: true, // TODO: next major Release, rename it to allowDragging
    allowEditing: true, // disable all interactions on a layer which are activated with `enable()`. For example a Circle can't be dragged in Edit-Mode
    allowRemoval: true,
    allowCutting: true,
    allowRotation: true,
    addVertexOn: 'click',
    removeVertexOn: 'contextmenu',
    removeVertexValidation: undefined,
    addVertexValidation: undefined,
    moveVertexValidation: undefined,
    resizeableCircleMarker: false,
    resizeableCircle: true,
    snapMiddle: false,
    snapVertex: true,
  } as EditOptions,
  setOptions(this: IEdit, options: EditOptions) {
    L.Util.setOptions(this, options);
  },
  getOptions(this: IEdit) {
    return this.options;
  },
  applyOptions(this: IEdit) {
    // Override in subclasses
  },
  isPolygon(this: IEdit) {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  },
  getShape(this: IEdit) {
    return this._shape;
  },
  _setPane(this: IEdit, layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane') {
    const map = this._map as ExtendedMap;
    if (type === 'layerPane') {
      layer.options.pane =
        (map.pm.globalOptions.panes &&
          map.pm.globalOptions.panes.layerPane) ||
        'overlayPane';
    } else if (type === 'vertexPane') {
      layer.options.pane =
        (map.pm.globalOptions.panes &&
          map.pm.globalOptions.panes.vertexPane) ||
        'markerPane';
    } else if (type === 'markerPane') {
      layer.options.pane =
        (map.pm.globalOptions.panes &&
          map.pm.globalOptions.panes.markerPane) ||
        'markerPane';
    }
  },
  remove(this: IEdit) {
    const map = (this._map || this._layer._map) as ExtendedMap;
    map.pm.removeLayer({ target: this._layer });
  },
  _vertexValidation(this: IEdit, type: 'move' | 'add' | 'remove', e: L.LeafletEvent & { target: ExtendedMarker }) {
    const marker = e.target;
    const args: VertexValidationArgs = { layer: this._layer, marker, event: e };

    let validationFnc: keyof EditOptions = 'moveVertexValidation';
    if (type === 'move') {
      validationFnc = 'moveVertexValidation';
    } else if (type === 'add') {
      validationFnc = 'addVertexValidation';
    } else if (type === 'remove') {
      validationFnc = 'removeVertexValidation';
    }

    // if validation goes wrong, we return false
    const validationFunc = this.options[validationFnc] as VertexValidationFn | undefined;
    if (
      validationFunc &&
      typeof validationFunc === 'function' &&
      !validationFunc(args)
    ) {
      if (type === 'move') {
        marker._cancelDragEventChain = marker.getLatLng();
      }
      return false;
    }

    marker._cancelDragEventChain = null;
    return true;
  },
  _vertexValidationDrag(this: IEdit, marker: ExtendedMarker) {
    // we reset the marker to the place before it was dragged. We need this, because we can't stop the drag process in a `dragstart` | `movestart` listener
    if (marker._cancelDragEventChain) {
      marker._latlng = marker._cancelDragEventChain;
      marker.update?.();
      return false;
    }
    return true;
  },
  _vertexValidationDragEnd(this: IEdit, marker: ExtendedMarker) {
    if (marker._cancelDragEventChain) {
      marker._cancelDragEventChain = null;
      return false;
    }
    return true;
  },
});

export default Edit;
