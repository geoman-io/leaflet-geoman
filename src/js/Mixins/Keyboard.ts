// Declare the global L
declare const L: typeof import('leaflet') & {
  DomEvent: {
    on: (
      el: Document | Window,
      types: string,
      fn: (e: Event) => void,
      context: unknown
    ) => void;
    off: (
      el: Document | Window,
      types: string,
      fn: (e: Event) => void,
      context: unknown
    ) => void;
  };
};

/**
 * Key event data structure
 */
interface KeyEventData {
  event: KeyboardEvent | FocusEvent;
  eventType: string;
  focusOn: string;
}

/**
 * Last events storage
 */
interface LastEventsStore {
  keydown?: KeyEventData;
  keyup?: KeyEventData;
  current?: KeyEventData;
  [key: string]: KeyEventData | undefined;
}

/**
 * PM Map interface for keyboard operations
 */
interface PMMap {
  getGlobalOptions: () => {
    exitModeOnEscape?: boolean;
    finishOnEnter?: boolean;
  };
  globalDrawModeEnabled: () => boolean;
  globalEditModeEnabled: () => boolean;
  globalDragModeEnabled: () => boolean;
  globalRemovalModeEnabled: () => boolean;
  globalRotateModeEnabled: () => boolean;
  globalCutModeEnabled: () => boolean;
  disableDraw: () => void;
  disableGlobalEditMode: () => void;
  disableGlobalDragMode: () => void;
  disableGlobalRemovalMode: () => void;
  disableGlobalRotateMode: () => void;
  disableGlobalCutMode: () => void;
  _fireKeyeventEvent: (
    event: KeyboardEvent,
    eventType: string,
    focusOn: string
  ) => void;
  Draw: {
    getActiveShape: () => string | null;
    [key: string]: unknown;
  };
}

/**
 * Draw instance interface
 */
interface DrawInstance {
  _finishShape?: () => void;
  _startMarker?: L.Marker;
  _centerMarker?: L.Marker;
  _layerGroup?: L.LayerGroup;
  _layer?: L.Polyline | L.Polygon;
}

/**
 * Extended Map type with PM
 * Using type intersection to avoid extending L.Map interface directly
 */
type PMEnabledMap = L.Map & {
  pm: PMMap;
};

/**
 * Keyboard mixin context
 */
export interface KeyboardMixinContext {
  map: PMEnabledMap;
  _lastEvents: LastEventsStore;
}

/**
 * Keyboard mixin interface
 */
export interface IKeyboardMixin {
  _lastEvents: LastEventsStore;
  _initKeyListener(map: L.Map): void;
  _handleEscapeKey(e: KeyboardEvent): boolean;
  _handleEnterKey(e: KeyboardEvent): boolean;
  _canFinishShape(drawInstance: DrawInstance, activeShape: string): boolean;
  _unbindKeyListenerEvents(): void;
  _onKeyListener(e: KeyboardEvent): void;
  _onBlur(e: FocusEvent): void;
  getLastKeyEvent(type?: string): KeyEventData | undefined;
  isShiftKeyPressed(): boolean | undefined;
  isAltKeyPressed(): boolean | undefined;
  isCtrlKeyPressed(): boolean | undefined;
  isMetaKeyPressed(): boolean | undefined;
  getPressedKey(): string | undefined;
}

/**
 * Factory function to create a new keyboard mixin object for keeping isolation
 * to make it work for multiple map instances
 */
const createKeyboardMixins = (): IKeyboardMixin &
  ThisType<KeyboardMixinContext & IKeyboardMixin> => ({
  _lastEvents: { keydown: undefined, keyup: undefined, current: undefined },

  _initKeyListener(map) {
    this.map = map as unknown as PMEnabledMap;
    L.DomEvent.on(
      document,
      'keydown keyup',
      this._onKeyListener as (e: Event) => void,
      this
    );
    L.DomEvent.on(window, 'blur', this._onBlur as (e: Event) => void, this);
    // clean up global listeners when current map instance is destroyed
    map.once('unload', this._unbindKeyListenerEvents, this);
  },

  _handleEscapeKey(e) {
    const pm = this.map.pm;
    const globalOptions = pm.getGlobalOptions();

    // Only handle Escape if the option is enabled
    if (!globalOptions.exitModeOnEscape) {
      return false;
    }

    // Check if any mode is active
    const hasActiveMode =
      pm.globalDrawModeEnabled() ||
      pm.globalEditModeEnabled() ||
      pm.globalDragModeEnabled() ||
      pm.globalRemovalModeEnabled() ||
      pm.globalRotateModeEnabled() ||
      pm.globalCutModeEnabled();

    if (!hasActiveMode) {
      return false;
    }

    // Prevent default browser behavior (focus ring, etc.)
    e.preventDefault();

    // Disable all active modes
    // 1. Disable draw mode if active
    if (pm.globalDrawModeEnabled()) {
      pm.disableDraw();
    }

    // 2. Disable global edit mode if active
    if (pm.globalEditModeEnabled()) {
      pm.disableGlobalEditMode();
    }

    // 3. Disable global drag mode if active
    if (pm.globalDragModeEnabled()) {
      pm.disableGlobalDragMode();
    }

    // 4. Disable global removal mode if active
    if (pm.globalRemovalModeEnabled()) {
      pm.disableGlobalRemovalMode();
    }

    // 5. Disable global rotate mode if active
    if (pm.globalRotateModeEnabled()) {
      pm.disableGlobalRotateMode();
    }

    // 6. Disable global cut mode if active
    if (pm.globalCutModeEnabled()) {
      pm.disableGlobalCutMode();
    }

    return true;
  },

  _handleEnterKey(e) {
    const pm = this.map.pm;
    const globalOptions = pm.getGlobalOptions();

    // Only handle Enter if the option is enabled
    if (!globalOptions.finishOnEnter) {
      return false;
    }

    // Only handle Enter for draw mode
    const activeShape = pm.Draw.getActiveShape();
    if (!activeShape) {
      return false;
    }

    // Get the active draw instance
    const drawInstance = pm.Draw[activeShape] as DrawInstance | undefined;
    if (!drawInstance || !drawInstance._finishShape) {
      return false;
    }

    // Check if the shape can be finished (has enough vertices)
    // For shapes that support _finishShape, try to finish
    // The _finishShape method itself checks if there are enough vertices
    const canFinish = this._canFinishShape(drawInstance, activeShape);
    if (!canFinish) {
      return false;
    }

    // Prevent default behavior
    e.preventDefault();

    // Finish the shape
    drawInstance._finishShape();

    return true;
  },

  _canFinishShape(drawInstance, activeShape) {
    // Check if we can finish the current shape based on vertex count
    // Different shapes have different minimum vertex requirements

    // Shapes that don't support multi-vertex drawing
    if (['Marker', 'CircleMarker', 'Text'].includes(activeShape)) {
      return false;
    }

    // For Rectangle, check if drawing is in progress (has start point)
    if (activeShape === 'Rectangle') {
      return drawInstance._startMarker !== undefined;
    }

    // For Circle, check if center has been placed (added to layer group)
    if (activeShape === 'Circle') {
      return !!(
        drawInstance._centerMarker !== undefined &&
        drawInstance._layerGroup?.hasLayer(drawInstance._centerMarker)
      );
    }

    // For Line, Polygon, Cut - need to check vertex count
    if (drawInstance._layer && 'getLatLngs' in drawInstance._layer) {
      const coords = drawInstance._layer.getLatLngs() as
        | L.LatLng[]
        | L.LatLng[][];

      // Line needs at least 2 points (uses flat coords)
      if (activeShape === 'Line') {
        const flatCoords = Array.isArray(coords[0])
          ? (coords as L.LatLng[][]).flat()
          : coords;
        return flatCoords.length >= 2;
      }

      // Polygon and Cut need at least 3 points
      // Polygon's _finishShape checks coords.length directly (not flattened)
      if (activeShape === 'Polygon' || activeShape === 'Cut') {
        return coords.length >= 3;
      }
    }

    return false;
  },

  _unbindKeyListenerEvents() {
    L.DomEvent.off(
      document,
      'keydown keyup',
      this._onKeyListener as (e: Event) => void,
      this
    );
    L.DomEvent.off(window, 'blur', this._onBlur as (e: Event) => void, this);
  },

  _onKeyListener(e) {
    let focusOn = 'document';

    // .contains only supported since IE9, if you want to use Geoman with IE8 or lower you need to implement a polyfill for .contains
    // with focusOn the user can add a check if the key was pressed while the user interacts with the map
    if (this.map.getContainer().contains(e.target as Node)) {
      focusOn = 'map';
    }

    const data: KeyEventData = { event: e, eventType: e.type, focusOn };
    this._lastEvents[e.type] = data;
    this._lastEvents.current = data;

    this.map.pm._fireKeyeventEvent(e, e.type, focusOn);

    // Handle special keys on keydown
    if (e.type === 'keydown') {
      // Handle Escape key to exit active modes
      if (e.key === 'Escape') {
        this._handleEscapeKey(e);
      }
      // Handle Enter key to finish drawing
      if (e.key === 'Enter') {
        this._handleEnterKey(e);
      }
    }
  },

  _onBlur(e) {
    const modifiedEvent = e as FocusEvent & { altKey: boolean };
    modifiedEvent.altKey = false;
    const data: KeyEventData = {
      event: e,
      eventType: e.type,
      focusOn: 'document',
    };
    this._lastEvents[e.type] = data;
    this._lastEvents.current = data;
  },

  getLastKeyEvent(type = 'current') {
    return this._lastEvents[type];
  },

  isShiftKeyPressed() {
    return (this._lastEvents.current?.event as KeyboardEvent)?.shiftKey;
  },

  isAltKeyPressed() {
    return (this._lastEvents.current?.event as KeyboardEvent)?.altKey;
  },

  isCtrlKeyPressed() {
    return (this._lastEvents.current?.event as KeyboardEvent)?.ctrlKey;
  },

  isMetaKeyPressed() {
    return (this._lastEvents.current?.event as KeyboardEvent)?.metaKey;
  },

  getPressedKey() {
    return (this._lastEvents.current?.event as KeyboardEvent)?.key;
  },
});

export default createKeyboardMixins;
