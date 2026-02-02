/**
 * Options type definitions for Leaflet-Geoman
 * Extracted from leaflet-geoman.d.ts for TypeScript migration
 */

import type * as L from 'leaflet';

/** Supported shape names. 'ImageOverlay' is in Edit Mode only. Also accepts custom shape name. */
export type SUPPORTED_SHAPES =
  | 'Marker'
  | 'Circle'
  | 'Line'
  | 'Rectangle'
  | 'Polygon'
  | 'Cut'
  | 'CircleMarker'
  | 'ImageOverlay'
  | 'Text'
  | 'Freehand'
  | 'Lasso'
  | 'CustomShape'
  | string;

export type PANE =
  | 'mapPane'
  | 'tilePane'
  | 'overlayPane'
  | 'shadowPane'
  | 'markerPane'
  | 'tooltipPane'
  | 'popupPane'
  | string;

export type DISPLAY_FORMAT = 'metric' | 'imperial';

export type LASSO_MODES = 'APPEND' | 'SUBTRACT' | 'RESET';

export type LASSO_SELECT_MODES = 'CONTAIN' | 'INTERSECT';

export type VertexValidationHandler = (e: {
  layer: L.Layer;
  marker: L.Marker;
  event: unknown;
}) => boolean;

export interface SnappingOptions {
  /** Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
  snappable?: boolean;

  /** The distance to another vertex when a snap should happen (default:20). */
  snapDistance?: number;

  /** Allow snapping in the middle of two vertices (middleMarker)(default:false). */
  snapMiddle?: boolean;

  /** Allow snapping between two vertices. (default: true)*/
  snapSegment?: boolean;

  /** Allow snapping to vertices. (default: true)*/
  snapVertex?: boolean;
}

export interface TextOptions {
  /** Predefined text for Text-Layer. */
  text?: string;

  /** Directly after placing the Text-Layer text editing is activated. */
  focusAfterDraw?: boolean;

  /** The text layer is removed if no text is written. */
  removeIfEmpty?: boolean;

  /** Custom CSS Classes for Text-Layer. Separated by a space. */
  className?: string;

  /** Centers the text on the positions. */
  textMarkerCentered?: boolean;
}

export interface DrawModeOptions extends SnappingOptions {
  /** Require the last point of a shape to be snapped. (default: false). */
  requireSnapToFinish?: boolean;

  /** Enable finishing drawing shapes by pressing the Enter key when enough vertices are placed. (default: false) */
  finishOnEnter?: boolean;

  /** Show helpful tooltips for your user (default:true). */
  tooltips?: boolean;

  /** Allow self intersections (default:true). */
  allowSelfIntersection?: boolean;

  /** Leaflet path options for the lines between drawn vertices/markers. (default:{color:'red'}). */
  templineStyle?: L.PathOptions | L.CircleMarkerOptions;

  /** Leaflet path options for the helper line between last drawn vertex and the cursor. */
  hintlineStyle?: L.PathOptions | L.CircleMarkerOptions;

  /** Leaflet path options for the drawn layer (Only for L.Path layers). (default:null). */
  pathOptions?: L.PathOptions | L.CircleMarkerOptions | null;

  /** Leaflet marker options (only for drawing markers). (default:{draggable:true}). */
  markerStyle?: L.MarkerOptions;

  /** Show a marker at the cursor (default:true). */
  cursorMarker?: boolean;

  /** Leaflet layer event to finish the drawn shape (default:null). */
  finishOn?:
    | null
    | 'click'
    | 'dblclick'
    | 'mousedown'
    | 'mouseover'
    | 'mouseout'
    | 'contextmenu'
    | 'snap';

  /** Hide the middle Markers in edit mode from Polyline and Polygon. (default:false). */
  hideMiddleMarkers?: boolean;

  /** Set the min radius of a Circle. (default:null). */
  minRadiusCircle?: number | null;

  /** Set the max radius of a Circle. (default:null). */
  maxRadiusCircle?: number | null;

  /** Set the min radius of a CircleMarker. (default:null). */
  minRadiusCircleMarker?: number | null;

  /** Set the max radius of a CircleMarker. (default:null). */
  maxRadiusCircleMarker?: number | null;

  /** Enables radius editing while drawing a Circle (default:true). */
  resizeableCircle?: boolean;

  /** Enables radius editing while drawing a CircleMarker (default:false). */
  resizeableCircleMarker?: boolean;

  /** Markers and CircleMarkers are editable during the draw-session (default:true). */
  markerEditable?: boolean;

  /** Draw-Mode stays enabled after finishing a layer to immediately draw the next layer. */
  continueDrawing?: boolean;

  /** Angle of rectangle. */
  rectangleAngle?: number;

  /** Cut-Mode: Only the passed layers can be cut. */
  layersToCut?: L.Layer[];

  textOptions?: TextOptions;

  /** Leaflet path options for the freehand polygon while drawing. */
  freehandOptions?: L.PathOptions;

  /** Leaflet path options for the lasso polygon while drawing. */
  lassoDrawOptions?: L.PathOptions;

  /** Style / GeoJSON options for custom shape. */
  customShapeGeoJSONOptions?: L.GeoJSONOptions;

  /** While drawing one of the layers in the Array need to contain the new layer. */
  requireContainment?: (L.Polygon | L.Circle | L.ImageOverlay)[];

  /** While drawing the new layer can't intersect with one of the layers in the Array. */
  preventIntersection?: L.Layer[];

  /** Closes the Polygon while drawing. */
  closedPolygonEdge?: boolean;

  /** Shows the Polygon fill while drawing. */
  closedPolygonFill?: boolean;

  /** Enables auto-tracing. Default: false */
  autoTracing?: boolean;
}

export interface EditModeOptions extends SnappingOptions {
  /** Allow self intersections (default:true). */
  allowSelfIntersection?: boolean;

  /** Allow self intersections during edit (default:true). */
  allowSelfIntersectionEdit?: boolean;

  /** Disable the removal of markers via right click / vertices via removeVertexOn. (default:false). */
  preventMarkerRemoval?: boolean;

  /** If true, vertex removal that causes a layer to fall below minimum required vertices will remove the entire layer. (default:true). */
  removeLayerBelowMinVertexCount?: boolean;

  /** Defines which layers should be dragged with this layer together. (default:false). */
  syncLayersOnDrag?: L.Layer[] | boolean;

  /** Edit-Mode for the layer can be disabled. (default:true). */
  allowEditing?: boolean;

  /** Removing can be disabled for the layer. (default:true). */
  allowRemoval?: boolean;

  /** Layer can be prevented from cutting. (default:true). */
  allowCutting?: boolean;

  /** Layer can be prevented from rotation. (default:true). */
  allowRotation?: boolean;

  /** Dragging can be disabled for the layer. (default:true). */
  draggable?: boolean;

  /** Leaflet layer event to add a vertex to a Line or Polygon. (default:click). */
  addVertexOn?:
    | 'click'
    | 'dblclick'
    | 'mousedown'
    | 'mouseover'
    | 'mouseout'
    | 'contextmenu';

  /** A function for validation if a vertex is allowed to add. */
  addVertexValidation?: VertexValidationHandler;

  /** Leaflet layer event to remove a vertex from a Line or Polygon. (default:contextmenu). */
  removeVertexOn?:
    | 'click'
    | 'dblclick'
    | 'mousedown'
    | 'mouseover'
    | 'mouseout'
    | 'contextmenu';

  /** A function for validation if a vertex is allowed to remove. */
  removeVertexValidation?: VertexValidationHandler;

  /** A function for validation if a vertex / helper-marker is allowed to move / drag. */
  moveVertexValidation?: VertexValidationHandler;

  /** Shows only n markers closest to the cursor. Use -1 for no limit (default:-1). */
  limitMarkersToCount?: number;

  /** Shows markers when under the given zoom level. */
  limitMarkersToZoom?: number;

  /** Shows only markers in the viewport. */
  limitMarkersToViewport?: boolean;

  /** Shows markers only after the layer was clicked. */
  limitMarkersToClick?: boolean;

  /** Pin shared vertices/markers together during edit. */
  pinning?: boolean;

  /** Hide the middle Markers in edit mode from Polyline and Polygon. */
  hideMiddleMarkers?: boolean;

  /** The angles at which the snap guides are created. (default: [90]). */
  snapGuidesAngles?: number[];

  /** Styles the border helpline. */
  scaleBorderStyle?: L.PathOptions;

  /** Scale origin is the center, else it is the opposite corner. (default:true). */
  centerScaling?: boolean;

  /** Width and height are scaled with the same ratio. (default:true). */
  uniformScaling?: boolean;

  /** Layer can be prevented from auto tracing. (default:true). */
  allowAutoTracing?: boolean;

  /** Add Vertices while clicking on the line of Polyline or Polygon. (default:true). */
  addVertexOnClick?: boolean;

  /** Layer can be prevented from pinning. (default:true). */
  allowPinning?: boolean;

  /** Styles the Snap Guides. */
  snapGuidesStyle?: L.PathOptions;

  /** Enables the Snap guides. (default:false). */
  showSnapGuides?: boolean;

  /** Layer can be prevented from used in Union Mode. (default:true). */
  allowUnion?: boolean;

  /** Layer can be prevented from used in Difference Mode. (default:true). */
  allowDifference?: boolean;

  /** Selecting via Lasso can be disabled for the layer. (default:true). */
  lassoSelectable?: boolean;

  /** While editing the layer needs to be contained in one of the layers in the Array. */
  requireContainment?: (L.Polygon | L.Circle | L.ImageOverlay)[];

  /** While editing the layer can't intersect with the layers in the Array. */
  preventIntersection?: L.Layer[];

  /** Layer can be prevented from scaling. (default:true). */
  allowScale?: boolean;
}

export interface GlobalOptions extends DrawModeOptions, EditModeOptions {
  /** Add the created layers to a layergroup instead to the map. */
  layerGroup?: L.Map | L.LayerGroup;

  /** Prioritize the order of snapping. */
  snappingOrder?: SUPPORTED_SHAPES[];

  /** Defines in which panes the layers and helper vertices are created. */
  panes?: { vertexPane?: PANE; layerPane?: PANE; markerPane?: PANE };

  /** Measurement options. */
  measurements?: {
    measurement?: boolean;
    showTooltip?: boolean;
    showTooltipOnHover?: boolean;
    totalLength?: boolean;
    segmentLength?: boolean;
    area?: boolean;
    radius?: boolean;
    perimeter?: boolean;
    height?: boolean;
    width?: boolean;
    coordinates?: boolean;
    displayFormat?: DISPLAY_FORMAT;
  };

  /** Until which zoom level the coordinates of the layers in the viewport will be used. Default: 10 */
  autoTraceMaxZoom?: number;

  /** The distance to the layer when a snap for auto tracing should happen. Default: 20 */
  autoTraceMaxDistance?: number;

  /** Style options for selected layers. */
  selectionLayerStyle?: L.PathOptions;

  /** Changing the cut behavior to use a circle instead of a polygon. Default: false */
  cutAsCircle?: boolean;

  /** Enable exiting active modes by pressing the Escape key. Default: false */
  exitModeOnEscape?: boolean;

  /** Enable finishing drawing shapes by pressing the Enter key. Default: false */
  finishOnEnter?: boolean;
}

export interface CutModeOptions {
  allowSelfIntersection?: boolean;

  /** Allows cutting of circles. Default: true */
  allowCircleCut?: boolean;
}

export interface SplitModeOptions {
  allowSelfIntersection?: boolean;

  /** If set to false, layers can be excluded with splitMark: false. */
  splitOnlyMarkedLayers?: boolean;
}

export interface LassoModeOptions {
  /** Style of the lasso layer. */
  lassoDrawOptions?: L.PathOptions;
  /** Mode for lasso. */
  mode?: LASSO_MODES;
  /** Select mode for lasso. */
  selectMode?: LASSO_SELECT_MODES;
}

export type TOOLBAR_CONTROL_ORDER =
  | 'drawMarker'
  | 'drawCircleMarker'
  | 'drawPolyline'
  | 'drawRectangle'
  | 'drawPolygon'
  | 'drawCircle'
  | 'editMode'
  | 'dragMode'
  | 'cutPolygon'
  | 'removalMode'
  | 'rotateMode'
  | 'drawText'
  | 'scaleMode'
  | 'pinningOption'
  | 'snappingOption'
  | 'autoTracingOption'
  | 'snapGuidesOption'
  | 'splitMode'
  | 'unionMode'
  | 'differenceMode'
  | 'bringToMode'
  | 'drawFreehand'
  | 'lassoMode'
  | 'drawCustomShape'
  | string;

export type ACTION_NAMES = 'cancel' | 'removeLastVertex' | 'finish' | 'finishMode';

export interface Action {
  text: string;
  onClick?: (e: unknown) => void;
  title?: string;
  name?: string;
  isActive?: () => boolean;
}

export interface BlockPositions {
  draw?: L.ControlPosition;
  edit?: L.ControlPosition;
  custom?: L.ControlPosition;
  options?: L.ControlPosition;
}

export interface ToolbarOptions {
  /** Toolbar position. */
  position?: L.ControlPosition;

  /** The position of each block can be customized. */
  positions?: BlockPositions;

  /** Adds button to draw Markers (default:true) */
  drawMarker?: boolean;

  /** Adds button to draw CircleMarkers (default:true) */
  drawCircleMarker?: boolean;

  /** Adds button to draw Line (default:true) */
  drawPolyline?: boolean;

  /** Adds button to draw Rectangle (default:true) */
  drawRectangle?: boolean;

  /** Adds button to draw Polygon (default:true) */
  drawPolygon?: boolean;

  /** Adds button to draw Circle (default:true) */
  drawCircle?: boolean;

  /** Adds button to draw Text (default:true) */
  drawText?: boolean;

  /** Adds button to toggle edit mode for all layers (default:true) */
  editMode?: boolean;

  /** Adds button to toggle drag mode for all layers (default:true) */
  dragMode?: boolean;

  /** Adds button to cut a hole in a polygon or to cut a line (default:true) */
  cutPolygon?: boolean;

  /** Adds a button to remove layers (default:true) */
  removalMode?: boolean;

  /** Adds a button to rotate layers (default:true) */
  rotateMode?: boolean;

  /** Adds a button to scale layers */
  scaleMode?: boolean;

  /** Adds a button to toggle snapping option */
  snappingOption?: boolean;

  /** Adds a button to toggle pinning option */
  pinningOption?: boolean;

  /** All buttons will be displayed as one block */
  oneBlock?: boolean;

  /** Shows the Draw-Buttons (default:true) */
  drawControls?: boolean;

  /** Shows the Edit-Buttons (default:true) */
  editControls?: boolean;

  /** Shows the Custom-Buttons (default:true) */
  customControls?: boolean;

  /** Shows the Options-Buttons */
  optionsControls?: boolean;
}

export interface CustomControlOptions {
  /** Name of the control */
  name: string;

  /** Block of the control. */
  block?: 'draw' | 'edit' | 'custom' | 'options';

  /** Text showing when you hover the control. */
  title?: string;

  /** CSS class with the Icon. */
  className?: string;

  /** Function fired when clicking the control. */
  onClick?: () => void;

  /** Function fired after clicking the control. */
  afterClick?: () => void;

  /** Actions */
  actions?: (ACTION_NAMES | Action)[];

  /** Control can be toggled. */
  toggle?: boolean;

  /** Control is disabled. */
  disabled?: boolean;

  /** Control disables other buttons if enabled. */
  disableOtherButtons?: boolean;

  /** Control disabled if other buttons is enabled. */
  disableByOtherButtons?: boolean;
}
