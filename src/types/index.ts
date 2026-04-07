/**
 * Leaflet-Geoman TypeScript Type Definitions
 * Central export for all types
 */

// Options types
export type {
  SUPPORTED_SHAPES,
  PANE,
  DISPLAY_FORMAT,
  LASSO_MODES,
  LASSO_SELECT_MODES,
  VertexValidationHandler,
  SnappingOptions,
  TextOptions,
  DrawModeOptions,
  EditModeOptions,
  GlobalOptions,
  CutModeOptions,
  SplitModeOptions,
  LassoModeOptions,
  TOOLBAR_CONTROL_ORDER,
  ACTION_NAMES,
  Action,
  BlockPositions,
  ToolbarOptions,
  CustomControlOptions,
} from './options';

// Event handler types
export type {
  // Draw mode
  GlobalDrawModeToggledEventHandler,
  DrawStartEventHandler,
  DrawEndEventHandler,
  CreateEventHandler,
  VertexAddedEventHandler,
  SnapEventHandler,
  CenterPlacedEventHandler,
  // Edit mode
  EditEventHandler,
  UpdateEventHandler,
  EnableEventHandler,
  DisableEventHandler,
  VertexAddedEventHandler2,
  VertexRemovedEventHandler,
  VertexClickEventHandler,
  MarkerDragStartEventHandler,
  MarkerDragEventHandler,
  MarkerDragEndEventHandler,
  LayerResetEventHandler,
  IntersectEventHandler,
  ChangeEventHandler,
  TextChangeEventHandler,
  TextFocusEventHandler,
  TextBlurEventHandler,
  ContainmentViolationEventHandler,
  IntersectionViolationEventHandler,
  CancelEventHandler,
  UndoRemoveEventHandler,
  GlobalEditModeToggledEventHandler,
  // Drag mode
  GlobalDragModeToggledEventHandler,
  DragStartEventHandler,
  DragEventHandler,
  DragEndEventHandler,
  DragEnableEventHandler,
  DragDisableEventHandler,
  // Remove mode
  RemoveEventHandler,
  GlobalRemovalModeToggledEventHandler,
  // Cut mode
  GlobalCutModeToggledEventHandler,
  CutEventHandler,
  // Rotate mode
  RotateEnableEventHandler,
  RotateDisableEventHandler,
  RotateStartEventHandler,
  RotateEventHandler,
  RotateEndEventHandler,
  GlobalRotateModeToggledEventHandler,
  // Scale mode
  ScaleEnableEventHandler,
  ScaleDisableEventHandler,
  ScaleStartEventHandler,
  ScaleEventHandler,
  ScaleEndEventHandler,
  GlobalScaleModeToggledEventHandler,
  // Union mode
  GlobalUnionModeToggledEventHandler,
  UnionEventHandler,
  // Difference mode
  GlobalDifferenceModeToggledEventHandler,
  DifferenceEventHandler,
  // Selection
  SelectionEventHandler,
  // Layer order modes
  GlobalSendToBackModeToggledEventHandler,
  GlobalBringToFrontModeToggledEventHandler,
  // Copy layer mode
  GlobalCopyLayerModeToggledEventHandler,
  CopyLayerEventHandler,
  // Line simplification mode
  GlobalLineSimplificationModeToggledEventHandler,
  // Lasso mode
  GlobalLassoModeToggledEventHandler,
  LassoSelectEventHandler,
  // Split mode
  GlobalSplitModeToggledEventHandler,
  SplitEventHandler,
  // Translation
  LangChangeEventHandler,
  // Controls
  ButtonClickEventHandler,
  ActionClickEventHandler,
  // Keyboard
  KeyboardKeyEventHandler,
  // Global options
  GlobalOptionsChangedEventHandler,
  // Auto trace
  AutoTraceEventHandler,
  AutoTraceLineChangeEventHandler,
  // Global cancel
  GlobalCancelEventHandler,
  // Error
  ErrorEventHandler,
} from './events';
