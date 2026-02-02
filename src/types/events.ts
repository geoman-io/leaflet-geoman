/**
 * Event type definitions for Leaflet-Geoman
 * All pm:* event handler type definitions
 */

import type * as L from 'leaflet';
import type { SUPPORTED_SHAPES } from './options';

/**
 * DRAW MODE MAP EVENT HANDLERS
 */

export type GlobalDrawModeToggledEventHandler = (event: {
  enabled: boolean;
  shape: SUPPORTED_SHAPES;
  map: L.Map;
}) => void;

export type DrawStartEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  workingLayer: L.Layer;
}) => void;

export type DrawEndEventHandler = (e: { shape: SUPPORTED_SHAPES }) => void;

export type CreateEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

/**
 * DRAW MODE LAYER EVENT HANDLERS
 */

export type VertexAddedEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  workingLayer: L.Layer;
  marker: L.Marker;
  latlng: L.LatLng;
}) => void;

export type SnapEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  distance: number;
  layer: L.Layer;
  workingLayer: L.Layer;
  marker: L.Marker;
  layerInteractedWith: L.Layer;
  segment: unknown;
  snapLatLng: L.LatLng;
}) => void;

export type CenterPlacedEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  workingLayer?: L.Layer;
  layer?: L.Layer;
  latlng: L.LatLng;
}) => void;

/**
 * EDIT MODE LAYER EVENT HANDLERS
 */

export type EditEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type UpdateEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type EnableEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type DisableEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type VertexAddedEventHandler2 = (e: {
  layer: L.Layer;
  indexPath: number;
  latlng: L.LatLng;
  marker: L.Marker;
  shape: SUPPORTED_SHAPES;
}) => void;

export type VertexRemovedEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  marker: L.Marker;
  shape: SUPPORTED_SHAPES;
}) => void;

export type VertexClickEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  markerEvent: unknown;
  shape: SUPPORTED_SHAPES;
}) => void;

export type MarkerDragStartEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  markerEvent: unknown;
  shape: SUPPORTED_SHAPES;
}) => void;

export type MarkerDragEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  markerEvent: unknown;
  shape: SUPPORTED_SHAPES;
}) => void;

export type MarkerDragEndEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  markerEvent: unknown;
  shape: SUPPORTED_SHAPES;
  intersectionReset: boolean;
}) => void;

export type LayerResetEventHandler = (e: {
  layer: L.Layer;
  indexPath: number;
  markerEvent: unknown;
  shape: SUPPORTED_SHAPES;
}) => void;

export type IntersectEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
  intersection: L.LatLng;
}) => void;

export type ChangeEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
  latlngs: L.LatLng | L.LatLng[];
}) => void;

export type TextChangeEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
  text: string;
}) => void;

export type TextFocusEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type TextBlurEventHandler = (e: {
  shape: SUPPORTED_SHAPES;
  layer: L.Layer;
}) => void;

export type ContainmentViolationEventHandler = (e: { layer: L.Layer }) => void;

export type IntersectionViolationEventHandler = (e: { layer: L.Layer }) => void;

export type CancelEventHandler = (e: { layer: L.Layer }) => void;

export type UndoRemoveEventHandler = (e: { layer: L.Layer }) => void;

/**
 * EDIT MODE MAP EVENT HANDLERS
 */

export type GlobalEditModeToggledEventHandler = (event: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * DRAG MODE MAP EVENT HANDLERS
 */

export type GlobalDragModeToggledEventHandler = (event: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * DRAG MODE LAYER EVENT HANDLERS
 */

export type DragStartEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type DragEventHandler = (e: {
  layer: L.Layer;
  containerPoint: unknown;
  latlng: L.LatLng;
  layerPoint: L.Point;
  originalEvent: unknown;
  shape: SUPPORTED_SHAPES;
}) => void;

export type DragEndEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type DragEnableEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type DragDisableEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

/**
 * REMOVE MODE EVENT HANDLERS
 */

export type RemoveEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type GlobalRemovalModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * CUT MODE EVENT HANDLERS
 */

export type GlobalCutModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type CutEventHandler = (e: {
  layer: L.Layer;
  originalLayer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

/**
 * ROTATE MODE EVENT HANDLERS
 */

export type RotateEnableEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type RotateDisableEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type RotateStartEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  startAngle: number;
  originLatLngs: L.LatLng[];
}) => void;

export type RotateEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  startAngle: number;
  angle: number;
  angleDiff: number;
  oldLatLngs: L.LatLng[];
  newLatLngs: L.LatLng[];
}) => void;

export type RotateEndEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  startAngle: number;
  angle: number;
  originLatLngs: L.LatLng[];
  newLatLngs: L.LatLng[];
}) => void;

export type GlobalRotateModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * SCALE MODE EVENT HANDLERS
 */

export type ScaleEnableEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type ScaleDisableEventHandler = (e: {
  layer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

export type ScaleStartEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  originLatLngs: L.LatLng[];
}) => void;

export type ScaleEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  oldLatLngs: L.LatLng[];
  newLatLngs: L.LatLng[];
}) => void;

export type ScaleEndEventHandler = (e: {
  layer: L.Layer;
  helpLayer: L.Layer;
  originLatLngs: L.LatLng[];
  newLatLngs: L.LatLng[];
}) => void;

export type GlobalScaleModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * UNION MODE EVENT HANDLERS
 */

export type GlobalUnionModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type UnionEventHandler = (e: {
  resultLayer: L.Layer;
  mergedLayers: L.Layer[];
}) => void;

/**
 * DIFFERENCE MODE EVENT HANDLERS
 */

export type GlobalDifferenceModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type DifferenceEventHandler = (e: {
  resultLayer: L.Layer;
  subtractedLayers: L.Layer[];
}) => void;

/**
 * SELECTION EVENT HANDLERS
 */

export type SelectionEventHandler = (e: { layer: L.Layer }) => void;

/**
 * LAYER ORDER MODE EVENT HANDLERS
 */

export type GlobalSendToBackModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type GlobalBringToFrontModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * COPY LAYER MODE EVENT HANDLERS
 */

export type GlobalCopyLayerModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type CopyLayerEventHandler = (e: {
  sourceLayer: L.Layer;
  newLayer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

/**
 * LINE SIMPLIFICATION MODE EVENT HANDLERS
 */

export type GlobalLineSimplificationModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

/**
 * LASSO MODE EVENT HANDLERS
 */

export type GlobalLassoModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type LassoSelectEventHandler = (e: {
  lassoCoords: L.LatLng[];
  selectionChangedLayers: L.Layer[];
  selectedLayers: L.Layer[];
}) => void;

/**
 * SPLIT MODE EVENT HANDLERS
 */

export type GlobalSplitModeToggledEventHandler = (e: {
  enabled: boolean;
  map: L.Map;
}) => void;

export type SplitEventHandler = (e: {
  layers: L.Layer[];
  originalLayer: L.Layer;
  splitLayer: L.Layer;
  shape: SUPPORTED_SHAPES;
}) => void;

/**
 * TRANSLATION EVENT HANDLERS
 */

export type LangChangeEventHandler = (e: {
  activeLang: string;
  oldLang: string;
  fallback: string;
  translations: unknown;
}) => void;

/**
 * CONTROL EVENT HANDLERS
 */

export type ButtonClickEventHandler = (e: {
  btnName: string;
  button: unknown;
}) => void;

export type ActionClickEventHandler = (e: {
  text: string;
  action: string;
  btnName: string;
  button: unknown;
}) => void;

/**
 * KEYBOARD EVENT HANDLERS
 */

export type KeyboardKeyEventHandler = (e: {
  focusOn: 'document' | 'map';
  eventType: 'keydown' | 'keyup';
  event: KeyboardEvent;
}) => void;

/**
 * GLOBAL OPTIONS EVENT HANDLERS
 */

export type GlobalOptionsChangedEventHandler = (e: { event: unknown }) => void;

/**
 * AUTO TRACE EVENT HANDLERS
 */

export type AutoTraceEventHandler = (e: { event: unknown }) => void;

export type AutoTraceLineChangeEventHandler = (e: {
  hintLatLngs: L.LatLng[];
}) => void;

/**
 * GLOBAL CANCEL EVENT HANDLERS
 */

export type GlobalCancelEventHandler = (e: {
  mode: string;
  map: L.Map;
}) => void;

/**
 * ERROR EVENT HANDLERS
 */

export type ErrorEventHandler = (e: { message: string; error: Error }) => void;
