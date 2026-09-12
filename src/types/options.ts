import type { PM } from 'leaflet';
/**
 * Shared implementation options. Public declarations stay unchanged; known keys
 * retain their types while extension keys and historical null defaults remain valid.
 */
/**
 * Draw options interface
 */
interface LegacyDrawOptions {
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
  markerStyle?: L.MarkerOptions;
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
}

/**
 * Vertex validation arguments
 */
export interface VertexValidationArgs {
  layer: L.Layer;
  marker: L.Marker;
  event: L.LeafletEvent;
}

/**
 * Vertex validation function type
 */
export type VertexValidationFn = (args: VertexValidationArgs) => boolean;

/**
 * Edit options interface
 */
interface LegacyEditOptions {
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  minRadiusCircleMarker?: number | null;
  maxRadiusCircleMarker?: number | null;

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
}

/**
 * Global options interface
 */
interface LegacyGlobalOptions {
  snappable?: boolean;
  layerGroup?: L.Map | L.LayerGroup;
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
}

export interface DrawOptions
  extends Omit<PM.DrawModeOptions, keyof LegacyDrawOptions>, LegacyDrawOptions {
  [key: string]: unknown;
}
export interface EditOptions
  extends Omit<PM.EditModeOptions, keyof LegacyEditOptions>, LegacyEditOptions {
  [key: string]: unknown;
}
export interface GlobalOptions
  extends
    Omit<
      PM.GlobalOptions,
      | keyof LegacyDrawOptions
      | keyof LegacyEditOptions
      | keyof LegacyGlobalOptions
    >,
    LegacyDrawOptions,
    LegacyEditOptions,
    LegacyGlobalOptions {
  [key: string]: unknown;
}
