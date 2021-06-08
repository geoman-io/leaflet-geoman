import * as L from 'leaflet';

// redeclare module, maintains compatibility with @types/leaflet
declare module 'leaflet' {
  /**
   * Extends built in leaflet Layer Options.
   */
  interface LayerOptions {
    pmIgnore?: boolean;
    snapIgnore?: boolean;
  }

  /**
   * Extends built in leaflet Map Options.
   */
  interface MapOptions {
    pmIgnore?: boolean;
  }

  /**
   * Extends built in leaflet Map.
   */
  interface Map {
    pm: PM.PMMap;
  }

  /**
   * Extends built in leaflet Path.
   */
  interface Path {
    pm: PM.PMLayer;
  }
  /**
   * Extends built in leaflet ImageOverlay.
   */
  interface ImageOverlay {
    pm: PM.PMLayer;
  }

  /**
   * Extends built in leaflet LayerGroup.
   */
  interface LayerGroup {
    pm: PM.PMLayerGroup;
  }

  /**
   * Extends built in leaflet Polyline.
   */
  interface Polyline {
    /** Returns true if Line or Polygon has a self intersection. */
    hasSelfIntersection(): boolean;
  }

  /**
   * Extends @types/leaflet events...
   *
   * todo: This is kind of a mess, and it makes all these event handlers show
   * up on Layers and Map. Leaflet itself is based around Evented, and @types/leaflet
   * makes this very hard to work around.
   *
   */
  interface Evented {
    /******************************************
     *
     * AVAILABLE ON MAP + LAYER, THESE ARE OK ON EVENTED.
     *
     ********************************************/

    /** Fired when a layer is removed via Removal Mode. */
    on(type: 'pm:remove', fn: PM.RemoveEventHandler): this;
    once(type: 'pm:remove', fn: PM.RemoveEventHandler): this;
    off(type: 'pm:remove', fn?: PM.RemoveEventHandler): this;

    /** Fired when the layer being cut. Draw+Edit Mode*/
    on(type: 'pm:cut', fn: PM.CutEventHandler): this;
    once(type: 'pm:cut', fn: PM.CutEventHandler): this;
    off(type: 'pm:cut', fn?: PM.CutEventHandler): this;

    /** Fired when rotation is enabled for a layer. */
    on(type: 'pm:rotateenable', fn: PM.RotateEnableEventHandler): this;
    once(type: 'pm:rotateenable', fn: PM.RotateEnableEventHandler): this;
    off(type: 'pm:rotateenable', fn?: PM.RotateEnableEventHandler): this;

    /** Fired when rotation is disabled for a layer. */
    on(type: 'pm:rotatedisable', fn: PM.RotateDisableEventHandler): this;
    once(type: 'pm:rotatedisable', fn: PM.RotateDisableEventHandler): this;
    off(type: 'pm:rotatedisable', fn?: PM.RotateDisableEventHandler): this;

    /** Fired when rotation starts on a layer. */
    on(type: 'pm:rotatestart', fn: PM.RotateStartEventHandler): this;
    once(type: 'pm:rotatestart', fn: PM.RotateStartEventHandler): this;
    off(type: 'pm:rotatestart', fn?: PM.RotateStartEventHandler): this;

    /** Fired when a layer is rotated. */
    on(type: 'pm:rotate', fn: PM.RotateEventHandler): this;
    once(type: 'pm:rotate', fn: PM.RotateEventHandler): this;
    off(type: 'pm:rotate', fn?: PM.RotateEventHandler): this;

    /** Fired when rotation ends on a layer. */
    on(type: 'pm:rotateend', fn: PM.RotateEndEventHandler): this;
    once(type: 'pm:rotateend', fn: PM.RotateEndEventHandler): this;
    off(type: 'pm:rotateend', fn?: PM.RotateEndEventHandler): this;

    /******************************************
     *
     * TODO: DRAW/EDIT MODE EVENTS LAYER ONLY
     *
     ********************************************/

    /** Fired during a marker move/drag. */
    on(type: 'pm:snapdrag', fn: PM.SnapEventHandler): this;
    once(type: 'pm:snapdrag', fn: PM.SnapEventHandler): this;
    off(type: 'pm:snapdrag', fn?: PM.SnapEventHandler): this;

    /** Fired when a vertex is snapped. */
    on(type: 'pm:snap', fn: PM.SnapEventHandler): this;
    once(type: 'pm:snap', fn: PM.SnapEventHandler): this;
    off(type: 'pm:snap', fn?: PM.SnapEventHandler): this;

    /** Fired when a vertex is unsnapped. */
    on(type: 'pm:unsnap', fn: PM.SnapEventHandler): this;
    once(type: 'pm:unsnap', fn: PM.SnapEventHandler): this;
    off(type: 'pm:unsnap', fn?: PM.SnapEventHandler): this;

    /** Called when the center of a circle is placed/moved. */
    on(type: 'pm:centerplaced', fn: PM.CenterPlacedEventHandler): this;
    once(type: 'pm:centerplaced', fn: PM.CenterPlacedEventHandler): this;
    off(type: 'pm:centerplaced', fn?: PM.CenterPlacedEventHandler): this;

    /******************************************
     *
     * TODO: CUT/EDIT MODE EVENTS LAYER ONLY
     *
     ********************************************/

    /** Fired when a layer is edited. */
    on(type: 'pm:edit', fn: PM.EditEventHandler): this;
    once(type: 'pm:edit', fn: PM.EditEventHandler): this;
    off(type: 'pm:edit', fn?: PM.EditEventHandler): this;

    /******************************************
     *
     * TODO: DRAW MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Drawing Mode is toggled. */
    on(
      type: 'pm:globaldrawmodetoggled',
      fn: PM.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'pm:globaldrawmodetoggled',
      fn: PM.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'pm:globaldrawmodetoggled',
      fn?: PM.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is enabled. Payload includes the shape type and working layer. */
    on(
      type: 'pm:drawstart',
      fn: PM.DrawStartEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'pm:drawstart',
      fn: PM.DrawStartEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'pm:drawstart',
      fn?: PM.DrawStartEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is disabled. Payload includes the shape type. */
    on(
      type: 'pm:drawend',
      fn: PM.DrawEndEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'pm:drawend',
      fn: PM.DrawEndEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'pm:drawend',
      fn?: PM.DrawEndEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is disabled. Payload includes the shape type. */
    on(type: 'pm:create', fn: PM.CreateEventHandler, context?: any): L.Evented;
    once(
      type: 'pm:create',
      fn: PM.CreateEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'pm:create',
      fn?: PM.CreateEventHandler,
      context?: any
    ): L.Evented;

    /******************************************
     *
     * TODO: DRAW MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Called when a new vertex is added. */
    on(type: 'pm:vertexadded', fn: PM.VertexAddedEventHandler): this;
    once(type: 'pm:vertexadded', fn: PM.VertexAddedEventHandler): this;
    off(type: 'pm:vertexadded', fn?: PM.VertexAddedEventHandler): this;

    /******************************************
     *
     * TODO: EDIT MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Fired when edit mode is disabled and a layer is edited and its coordinates have changed. */
    on(type: 'pm:update', fn: PM.UpdateEventHandler): this;
    once(type: 'pm:update', fn: PM.UpdateEventHandler): this;
    off(type: 'pm:update', fn?: PM.UpdateEventHandler): this;

    /** Fired when edit mode on a layer is enabled. */
    on(type: 'pm:enable', fn: PM.EnableEventHandler): this;
    once(type: 'pm:enable', fn: PM.EnableEventHandler): this;
    off(type: 'pm:enable', fn?: PM.EnableEventHandler): this;

    /** Fired when edit mode on a layer is disabled. */
    on(type: 'pm:disable', fn: PM.DisableEventHandler): this;
    once(type: 'pm:disable', fn: PM.DisableEventHandler): this;
    off(type: 'pm:disable', fn?: PM.DisableEventHandler): this;

    /** Fired when a vertex is added. */
    on(type: 'pm:vertexadded', fn: PM.VertexAddedEventHandler2): this;
    once(type: 'pm:vertexadded', fn: PM.VertexAddedEventHandler2): this;
    off(type: 'pm:vertexadded', fn?: PM.VertexAddedEventHandler2): this;

    /** Fired when a vertex is removed. */
    on(type: 'pm:vertexremoved', fn: PM.VertexRemovedEventHandler): this;
    once(type: 'pm:vertexremoved', fn: PM.VertexRemovedEventHandler): this;
    off(type: 'pm:vertexremoved', fn?: PM.VertexRemovedEventHandler): this;

    /** Fired when a vertex is clicked. */
    on(type: 'pm:vertexclick', fn: PM.VertexClickEventHandler): this;
    once(type: 'pm:vertexclick', fn: PM.VertexClickEventHandler): this;
    off(type: 'pm:vertexclick', fn?: PM.VertexClickEventHandler): this;

    /** Fired when dragging of a marker which corresponds to a vertex starts. */
    on(type: 'pm:markerdragstart', fn: PM.MarkerDragStartEventHandler): this;
    once(type: 'pm:markerdragstart', fn: PM.MarkerDragStartEventHandler): this;
    off(type: 'pm:markerdragstart', fn?: PM.MarkerDragStartEventHandler): this;

    /** Fired when dragging a vertex-marker. */
    on(type: 'pm:markerdrag', fn: PM.MarkerDragEventHandler): this;
    once(type: 'pm:markerdrag', fn: PM.MarkerDragEventHandler): this;
    off(type: 'pm:markerdrag', fn?: PM.MarkerDragEventHandler): this;

    /** Fired when dragging of a vertex-marker ends. */
    on(type: 'pm:markerdragend', fn: PM.MarkerDragEndEventHandler): this;
    once(type: 'pm:markerdragend', fn: PM.MarkerDragEndEventHandler): this;
    off(type: 'pm:markerdragend', fn?: PM.MarkerDragEndEventHandler): this;

    /** Fired when coords of a layer are reset. E.g. by self-intersection.. */
    on(type: 'pm:layerreset', fn: PM.LayerResetEventHandler): this;
    once(type: 'pm:layerreset', fn: PM.LayerResetEventHandler): this;
    off(type: 'pm:layerreset', fn?: PM.LayerResetEventHandler): this;

    /** When allowSelfIntersection: false, this event is fired as soon as a self-intersection is detected. */
    on(type: 'pm:intersect', fn: PM.IntersectEventHandler): this;
    once(type: 'pm:intersect', fn: PM.IntersectEventHandler): this;
    off(type: 'pm:intersect', fn?: PM.IntersectEventHandler): this;

    /******************************************
     *
     * TODO: EDIT MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Edit Mode is toggled. */
    on(
      type: 'pm:globaleditmodetoggled',
      fn: PM.GlobalEditModeToggledEventHandler
    ): this;
    once(
      type: 'pm:globaleditmodetoggled',
      fn: PM.GlobalEditModeToggledEventHandler
    ): this;
    off(
      type: 'pm:globaleditmodetoggled',
      fn?: PM.GlobalEditModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: DRAG MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Drag Mode is toggled. */
    on(
      type: 'pm:globaldragmodetoggled',
      fn: PM.GlobalDragModeToggledEventHandler
    ): this;
    once(
      type: 'pm:globaldragmodetoggled',
      fn: PM.GlobalDragModeToggledEventHandler
    ): this;
    off(
      type: 'pm:globaldragmodetoggled',
      fn?: PM.GlobalDragModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: DRAG MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Fired when a layer starts being dragged. */
    on(type: 'pm:dragstart', fn: PM.DragStartEventHandler): this;
    once(type: 'pm:dragstart', fn: PM.DragStartEventHandler): this;
    off(type: 'pm:dragstart', fn?: PM.DragStartEventHandler): this;

    /** Fired when a layer is dragged. */
    on(type: 'pm:drag', fn: PM.DragEventHandler): this;
    once(type: 'pm:drag', fn: PM.DragEventHandler): this;
    off(type: 'pm:drag', fn?: PM.DragEventHandler): this;

    /** Fired when a layer stops being dragged. */
    on(type: 'pm:dragend', fn: PM.DragEndEventHandler): this;
    once(type: 'pm:dragend', fn: PM.DragEndEventHandler): this;
    off(type: 'pm:dragend', fn?: PM.DragEndEventHandler): this;

    /******************************************
     *
     * TODO: REMOVE MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Removal Mode is toggled. */
    on(
      type: 'pm:globalremovalmodetoggled',
      fn: PM.GlobalRemovalModeToggledEventHandler
    ): this;
    once(
      type: 'pm:globalremovalmodetoggled',
      fn: PM.GlobalRemovalModeToggledEventHandler
    ): this;
    off(
      type: 'pm:globalremovalmodetoggled',
      fn?: PM.GlobalRemovalModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: CUT MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a layer is removed via Removal Mode. */
    on(
      type: 'pm:globalcutmodetoggled',
      fn: PM.GlobalCutModeToggledEventHandler
    ): this;
    once(
      type: 'pm:globalcutmodetoggled',
      fn: PM.GlobalCutModeToggledEventHandler
    ): this;
    off(
      type: 'pm:globalcutmodetoggled',
      fn?: PM.GlobalCutModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: ROTATE MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Rotate Mode is toggled. */
    on(
      type: 'pm:globalrotatemodetoggled',
      fn: PM.GlobalRotateModeToggledEventHandler
    ): this;
    once(
      type: 'pm:globalrotatemodetoggled',
      fn: PM.GlobalRotateModeToggledEventHandler
    ): this;
    off(
      type: 'pm:globalrotatemodetoggled',
      fn?: PM.GlobalRotateModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: TRANSLATION EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Standard Leaflet event. Fired when any layer is removed. */
    on(type: 'pm:langchange', fn: PM.LangChangeEventHandler): this;
    once(type: 'pm:langchange', fn: PM.LangChangeEventHandler): this;
    off(type: 'pm:langchange', fn?: PM.LangChangeEventHandler): this;

    /******************************************
     *
     * TODO: CONTROL EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a Toolbar button is clicked. */
    on(type: 'pm:buttonclick', fn: PM.ButtonClickEventHandler): this;
    once(type: 'pm:buttonclick', fn: PM.ButtonClickEventHandler): this;
    off(type: 'pm:buttonclick', fn?: PM.ButtonClickEventHandler): this;

    /** Fired when a Toolbar action is clicked. */
    on(type: 'pm:actionclick', fn: PM.ActionClickEventHandler): this;
    once(type: 'pm:actionclick', fn: PM.ActionClickEventHandler): this;
    off(type: 'pm:actionclick', fn?: PM.ActionClickEventHandler): this;

    /******************************************
     *
     * TODO: Keyboard EVENT ON MAP ONLY
     *
     ********************************************/

    /** Fired when `keydown` or `keyup` on the document is fired. */
    on(type: 'pm:keyevent', fn: PM.KeyboardKeyEventHandler): this;
    once(type: 'pm:keyevent', fn: PM.KeyboardKeyEventHandler): this;
    off(type: 'pm:keyevent', fn?: PM.KeyboardKeyEventHandler): this;
  }

  namespace PM {
    /** supported shape names. 'ImageOverlay' is in Edit Mode only. Also accepts custom shape name. */
    type SUPPORTED_SHAPES =
      | 'Marker'
      | 'Circle'
      | 'Line'
      | 'Rectangle'
      | 'Polygon'
      | 'Cut'
      | 'CircleMarker'
      | 'ImageOverlay'
      | string;

    /**
     * Changes default registration of leaflet-geoman on leaflet layers.
     *
     * @param optIn - if true, a layers pmIgnore property has to be set to false to get initiated.
     */
    function setOptIn(optIn: boolean): void;

    /**
     * Enable leaflet-geoman on an ignored layer.
     *
     * @param layer - re-reads layer.options.pmIgnore to initialize leaflet-geoman.
     */
    function reInitLayer(layer: L.Layer): void;

    /**
     * PM map interface.
     */
    interface PMMap
      extends PMDrawMap,
        PMEditMap,
        PMDragMap,
        PMRemoveMap,
        PMCutMap,
        PMRotateMap {
      Toolbar: PMMapToolbar;

      Keyboard: PMMapKeyboard;

      /** Adds the Toolbar to the map. */
      addControls(options?: ToolbarOptions): void;

      /** Toggle the visiblity of the Toolbar. */
      removeControls(): void;

      /** Returns true if the Toolbar is visible on the map. */
      controlsVisible(): boolean;

      /** Toggle the visiblity of the Toolbar. */
      toggleControls(): void;

      setLang(
        lang:
          | 'cz'
          | 'da'
          | 'de'
          | 'el'
          | 'en'
          | 'es'
          | 'fa'
          | 'fr'
          | 'hu'
          | 'id'
          | 'it'
          | 'nl'
          | 'no'
          | 'pl'
          | 'pt_br'
          | 'ro'
          | 'ru'
          | 'sv'
          | 'tr'
          | 'ua'
          | 'zh'
          | 'zh_tw',
        customTranslations?: Translations,
        fallbackLanguage?: string
      ): void;

      /** Set globalOptions and apply them. */
      setGlobalOptions(options: GlobalOptions): void;

      /** Apply the current globalOptions to all existing layers. */
      applyGlobalOptions(): void;

      /** Returns the globalOptions. */
      getGlobalOptions(): GlobalOptions;
    }

    class Translations {
      tooltips?: {
        placeMarker?: string;
        firstVertex?: string;
        continueLine?: string;
        finishLine?: string;
        finishPoly?: string;
        finishRect?: string;
        startCircle?: string;
        finishCircle?: string;
        placeCircleMarker?: string;
      };

      actions?: {
        finish?: string;
        cancel?: string;
        removeLastVertex?: string;
      };

      buttonTitles?: {
        drawMarkerButton?: string;
        drawPolyButton?: string;
        drawLineButton?: string;
        drawCircleButton?: string;
        drawRectButton?: string;
        editButton?: string;
        dragButton?: string;
        cutButton?: string;
        deleteButton?: string;
        drawCircleMarkerButton?: string;
      };
    }

    type ACTION_NAMES = 'cancel' | 'removeLastVertex' | 'finish' | 'finishMode';

    class Action {
      text: string;
      onClick?: (e: any) => void;
    }

    type TOOLBAR_CONTROL_ORDER =
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
      | string;

    interface PMMapToolbar {
      /** Pass an array of button names to reorder the buttons in the Toolbar. */
      changeControlOrder(order?: TOOLBAR_CONTROL_ORDER[]): void;

      /** Receive the current order with. */
      getControlOrder(): TOOLBAR_CONTROL_ORDER[];

      /** The position of a block (draw, edit, custom, options⭐) in the Toolbar can be changed. If not set, the value from position of the Toolbar is taken. */
      setBlockPosition(
        block: 'draw' | 'edit' | 'custom' | 'options',
        position: L.ControlPosition
      ): void;

      /** Returns a Object with the positions for all blocks */
      getBlockPositions(): BlockPositions;

      /** To add a custom Control to the Toolbar */
      createCustomControl(options: CustomControlOptions): void;

      /** Creates a copy of a draw Control. Returns the drawInstance and the control. */
      copyDrawControl(
        copyInstance: string,
        options?: CustomControlOptions
      ): void;

      /** Change the actions of an existing button. */
      changeActionsOfControl(
        name: string,
        actions: (ACTION_NAMES | Action)[]
      ): void;

      /** disable button by control name */
      setButtonDisabled(name: TOOLBAR_CONTROL_ORDER, state: boolean): void;
    }

    type KEYBOARD_EVENT_TYPE = 'current' | 'keydown' | 'keyup';

    interface PMMapKeyboard {
      /** Pass an array of button names to reorder the buttons in the Toolbar. */
      getLastKeyEvent(type: KEYBOARD_EVENT_TYPE[]): KeyboardKeyEventHandler;

      /** Returns the current pressed key. [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key). */
      getPressedKey(): string;

      /** Returns true if the `Shift` key is currently pressed. */
      isShiftKeyPressed(): boolean;

      /** Returns true if the `Alt` key is currently pressed. */
      isAltKeyPressed(): boolean;

      /** Returns true if the `Ctrl` key is currently pressed. */
      isCtrlKeyPressed(): boolean;

      /** Returns true if the `Meta` key is currently pressed. */
      isMetaKeyPressed(): boolean;
    }

    interface Button {
      /** actions */
      actions: (ACTION_NAMES | Action)[];

      /** Function fired after clicking the control. */
      afterClick: () => void;

      /** CSS class with the Icon. */
      className: string;

      /** if true, other buttons will be disabled on click (default: true) */
      disableOtherButtons: boolean;

      /** Control can be toggled. */
      doToggle: boolean;

      /** Extending Class f. ex. Line, Polygon, ... L.PM.Draw.EXTENDINGCLASS */
      jsClass: string;

      /** Function fired when clicking the control. */
      onClick: () => void;

      position: L.ControlPosition;

      /** Text showing when you hover the control. */
      title: string;

      /** toggle state true -> enabled, false -> disabled (default: false) */
      toggleStatus: boolean;

      /** block of the control. 'options' is ⭐ only. */
      tool?: 'draw' | 'edit' | 'custom' | 'options';
    }

    interface CustomControlOptions {
      /** Name of the control */
      name: string;

      /** block of the control. 'options' is ⭐ only. */
      block?: 'draw' | 'edit' | 'custom' | 'options';

      /** Text showing when you hover the control. */
      title?: string;

      /** CSS class with the Icon. */
      className?: string;

      /** Function fired when clicking the control. */
      onClick?: () => void;

      /** Function fired after clicking the control. */
      afterClick?: () => void;

      /** actions */
      actions?: (ACTION_NAMES | Action)[];

      /** Control can be toggled. */
      toggle?: boolean;

      /** Control is disabled. */
      disabled?: boolean;
    }

    type PANE =
      | 'mapPane'
      | 'tilePane'
      | 'overlayPane'
      | 'shadowPane'
      | 'markerPane'
      | 'tooltipPane'
      | 'popupPane'
      | string;

    interface GlobalOptions extends DrawModeOptions, EditModeOptions {
      /** add the created layers to a layergroup instead to the map. */
      layerGroup?: L.Map | L.LayerGroup;

      /** Prioritize the order of snapping. Default: ['Marker','CircleMarker','Circle','Line','Polygon','Rectangle']. */
      snappingOrder: SUPPORTED_SHAPES[];

      /** Defines in which panes the layers and helper vertices are created. Default: { vertexPane: 'markerPane', layerPane: 'overlayPane', markerPane: 'markerPane' } */
      panes: { vertexPane: PANE; layerPane: PANE; markerPane: PANE };
    }

    interface PMDrawMap {
      /** Enable Draw Mode with the passed shape. */
      enableDraw(shape: SUPPORTED_SHAPES, options?: DrawModeOptions): void;

      /** disable all drawing */
      disableDraw(shape?: SUPPORTED_SHAPES): void;

      /** Draw */
      Draw: Draw;

      /** Returns true if global Draw Mode is enabled. false when disabled. */
      globalDrawModeEnabled(): boolean;

      /** Customize the style of the drawn layer. Only for L.Path layers. Shapes can be excluded with a ignoreShapes array or merged with the current style with merge: true in  optionsModifier. */
      setPathOptions(
        options: L.PathOptions,
        optionsModifier?: { ignoreShapes?: SUPPORTED_SHAPES[]; merge?: boolean }
      ): void;

      /** Returns all Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
      getGeomanLayers(asFeatureGroup?: boolean): L.FeatureGroup | L.Layer[];

      /** Returns all Geoman draw layers on the map as array. Pass true to get a L.FeatureGroup. */
      getGeomanDrawLayers(asFeatureGroup?: boolean): L.FeatureGroup | L.Layer[];
    }

    interface PMEditMap {
      /** Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar */
      enableGlobalEditMode(options?: EditModeOptions): void;

      /** Disables global edit mode. */
      disableGlobalEditMode(): void;

      /** Toggles global edit mode. */
      toggleGlobalEditMode(options?: EditModeOptions): void;

      /** Returns true if global edit mode is enabled. false when disabled. */
      globalEditModeEnabled(): boolean;
    }

    interface PMDragMap {
      /** Enables global drag mode. */
      enableGlobalDragMode(): void;

      /** Disables global drag mode. */
      disableGlobalDragMode(): void;

      /** Toggles global drag mode. */
      toggleGlobalDragMode(): void;

      /** Returns true if global drag mode is enabled. false when disabled. */
      globalDragEnabled(): boolean;
    }

    interface PMRemoveMap {
      /** Enables global removal mode. */
      enableGlobalRemovalMode(): void;

      /** Disables global removal mode. */
      disableGlobalRemovalMode(): void;

      /** Toggles global removal mode. */
      toggleGlobalRemovalMode(): void;

      /** Returns true if global removal mode is enabled. false when disabled. */
      globalRemovalModeEnabled(): boolean;
    }

    interface PMCutMap {
      /** Enables global cut mode. */
      enableGlobalCutMode(options?: CutModeOptions): void;

      /** Disables global cut mode. */
      disableGlobalCutMode(): void;

      /** Toggles global cut mode. */
      toggleGlobalCutMode(options?: CutModeOptions): void;

      /** Returns true if global cut mode is enabled. false when disabled. */
      globalCutModeEnabled(): boolean;
    }

    interface PMRotateMap {
      /** Enables global rotate mode. */
      enableGlobalRotateMode(): void;

      /** Disables global rotate mode. */
      disableGlobalRotateMode(): void;

      /** Toggles global rotate mode. */
      toggleGlobalRotateMode(): void;

      /** Returns true if global rotate mode is enabled. false when disabled. */
      globalRotateModeEnabled(): boolean;
    }

    interface PMRotateLayer {
      /** Enables rotate mode on the layer. */
      enableRotate(): void;

      /** Disables rotate mode on the layer. */
      disableRotate(): void;

      /** Toggles rotate mode on the layer. */
      rotateEnabled(): void;

      /** Rotates the layer by x degrees. */
      rotateLayer(degrees: number): void;

      /** Rotates the layer to x degrees. */
      rotateLayerToAngle(degrees: number): void;

      /** Returns the angle of the layer in degrees. */
      getAngle(): number;
    }

    interface Draw {
      /** Array of available shapes. */
      getShapes(): SUPPORTED_SHAPES[];

      /** Returns the active shape. */
      getActiveShape(): SUPPORTED_SHAPES;

      /** Set path options */
      setPathOptions(options: L.PathOptions): void;

      /** Set options */
      setOptions(options: DrawModeOptions): void;

      /** Get options */
      getOptions(): DrawModeOptions;
    }

    interface CutModeOptions {
      allowSelfIntersection?: boolean;
    }

    type VertexValidationHandler = (e: {
      layer: L.Layer;
      marker: L.Marker;
      event: any;
    }) => boolean;

    interface EditModeOptions {
      /** Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
      snappable?: boolean;

      /** the distance to another vertex when a snap should happen (default:20). */
      snapDistance?: number;

      /** allow self intersections (default:true). */
      allowSelfIntersection?: boolean;

      /** allow self intersections (default:true). */
      allowSelfIntersectionEdit?: boolean;

      /** Disable the removal of markers via right click / vertices via removeVertexOn. (default:false). */
      preventMarkerRemoval?: boolean;

      /** If true, vertex removal that cause a layer to fall below their minimum required vertices will remove the entire layer. If false, these vertices can't be removed. Minimum vertices are 2 for Lines and 3 for Polygons (default:true). */
      removeLayerBelowMinVertexCount?: boolean;

      /** Defines which layers should dragged with this layer together. true syncs all layers in the same LayerGroup(s) or you pass an `Array` of layers to sync. (default:false). */
      syncLayersOnDrag?: L.Layer[] | boolean;

      /** Edit-Mode for the layer can disabled (`pm.enable()`). (default:true). */
      allowEditing?: boolean;

      /** Removing can be disabled for the layer. (default:true). */
      allowRemoval?: boolean;

      /** Layer can be prevented from cutting. (default:true). */
      allowCutting?: boolean;

      /** Layer can be prevented from rotation. (default:true). */
      allowRotation?: boolean;

      /** Dragging can be disabled for the layer. (default:true). */
      draggable?: boolean;

      /** Leaflet layer event to add a vertex to a Line or Polygon, like dblclick. (default:click). */
      addVertexOn?:
        | 'click'
        | 'dblclick'
        | 'mousedown'
        | 'mouseover'
        | 'mouseout'
        | 'contextmenu';

      /** A function for validation if a vertex (of a Line / Polygon) is allowed to add. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. (default:undefined). */
      addVertexValidation?: undefined | VertexValidationHandler;

      /** Leaflet layer event to remove a vertex from a Line or Polygon, like dblclick. (default:contextmenu). */
      removeVertexOn?:
        | 'click'
        | 'dblclick'
        | 'mousedown'
        | 'mouseover'
        | 'mouseout'
        | 'contextmenu';

      /** A function for validation if a vertex (of a Line / Polygon) is allowed to remove. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. */
      removeVertexValidation?: undefined | VertexValidationHandler;

      /** A function for validation if a vertex / helper-marker is allowed to move / drag. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. */
      moveVertexValidation?: undefined | VertexValidationHandler;

      /** Shows only n markers closest to the cursor. Use -1 for no limit (default:-1). */
      limitMarkersToCount?: number;

      /** Shows markers when under the given zoom level ⭐ */
      limitMarkersToZoom?: number;

      /** Shows only markers in the viewport ⭐ */
      limitMarkersToViewport?: boolean;

      /** Shows markers only after the layer was clicked ⭐ */
      limitMarkersToClick?: boolean;

      /** Pin shared vertices/markers together during edit ⭐ */
      pinning?: boolean;

      /** hide the middle Markers in edit mode from Polyline and Polygon. */
      hideMiddleMarkers?: boolean;
    }

    interface DrawModeOptions {
      /** enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
      snappable?: boolean;

      /** the distance to another vertex when a snap should happen (default:20). */
      snapDistance?: number;

      /** allow snapping in the middle of two vertices (middleMarker)(default:false). */
      snapMiddle?: boolean;

      /** allow snapping between two vertices. (default: true)*/
      snapSegment?: boolean;

      /** require the last point of a shape to be snapped. (default: false). */
      requireSnapToFinish?: boolean;

      /** show helpful tooltips for your user (default:true). */
      tooltips?: boolean;

      /** allow self intersections (default:true). */
      allowSelfIntersection?: boolean;

      /** leaflet path options for the lines between drawn vertices/markers. (default:{color:'red'}). */
      templineStyle?: L.PathOptions;

      /** leaflet path options for the helper line between last drawn vertex and the cursor. (default:{color:'red',dashArray:[5,5]}). */
      hintlineStyle?: L.PathOptions;

      /** leaflet path options for the drawn layer (Only for L.Path layers). (default:null). */
      pathOptions?: L.PathOptions;

      /** leaflet marker options (only for drawing markers). (default:{draggable:true}). */
      markerStyle?: L.MarkerOptions;

      /** show a marker at the cursor (default:true). */
      cursorMarker?: boolean;

      /** leaflet layer event to finish the drawn shape (default:null). */
      finishOn?:
        | null
        | 'click'
        | 'dblclick'
        | 'mousedown'
        | 'mouseover'
        | 'mouseout'
        | 'contextmenu'
        | 'snap';

      /** hide the middle Markers in edit mode from Polyline and Polygon. (default:false). */
      hideMiddleMarkers?: boolean;

      /** set the min radius of a Circle. (default:null). */
      minRadiusCircle?: number;

      /** set the max radius of a Circle. (default:null). */
      maxRadiusCircle?: number;

      /** set the min radius of a CircleMarker when editable is active. (default:null). */
      minRadiusCircleMarker?: number;

      /** set the max radius of a CircleMarker when editable is active. (default:null). */
      maxRadiusCircleMarker?: number;

      /** makes a CircleMarker editable like a Circle (default:false). */
      editable?: boolean;

      /** Markers and CircleMarkers are editable during the draw-session (you can drag them around immediately after drawing them) (default:true). */
      markerEditable?: boolean;

      /** Draw-Mode stays enabled after finishing a layer to immediately draw the next layer. Defaults to true for Markers and CircleMarkers and false for all other layers. */
      continueDrawing?: boolean;

      /** angel of rectangle. */
      rectangleAngle?: number;

      /** Cut-Mode: Only the passed layers can be cut. Cutted layers are removed from the Array until no layers are left anymore and cutting is working on all layers again. (Default: []) */
      layersToCut?: L.Layer[];
    }

    /**
     * PM toolbar options.
     */
    interface ToolbarOptions {
      /** toolbar position. */
      position?: L.ControlPosition;

      /** the position of each block can be customized. If not set, the value from position is taken. */
      positions?: BlockPositions;

      /** adds button to draw Markers (default:true) */
      drawMarker?: boolean;

      /** adds button to draw CircleMarkers (default:true) */
      drawCircleMarker?: boolean;

      /** adds button to draw Line (default:true) */
      drawPolyline?: boolean;

      /** adds button to draw Rectangle (default:true) */
      drawRectangle?: boolean;

      /** adds button to draw Polygon (default:true) */
      drawPolygon?: boolean;

      /** adds button to draw Circle (default:true) */
      drawCircle?: boolean;

      /** adds button to toggle edit mode for all layers (default:true) */
      editMode?: boolean;

      /** adds button to toggle drag mode for all layers (default:true) */
      dragMode?: boolean;

      /** adds button to cut a hole in a polygon or line (default:true) */
      cutPolygon?: boolean;

      /** adds a button to remove layers (default:true) */
      removalMode?: boolean;

      /** adds a button to rotate layers (default:true) */
      rotateMode?: boolean;

      /** all buttons will be displayed as one block Customize Controls (default:false) */
      oneBlock?: boolean;

      /** shows all draw buttons / buttons in the draw block (default:true) */
      drawControls?: boolean;

      /** shows all edit buttons / buttons in the edit block (default:true) */
      editControls?: boolean;

      /** shows all buttons in the custom block (default:true) */
      customControls?: boolean;

      /** shows all options buttons / buttons in the option block ⭐ */
      optionsControls?: boolean;

      /** adds a button to toggle the Pinning Option ⭐ */
      pinningOption?: boolean;

      /** adds a button to toggle the Snapping Option ⭐ */
      snappingOption?: boolean;
    }

    /** the position of each block. */
    interface BlockPositions {
      /** draw control position (default:''). '' also refers to this position. */
      draw?: L.ControlPosition;

      /** edit control position (default:''). */
      edit?: L.ControlPosition;

      /** custom control position (default:''). */
      custom?: L.ControlPosition;

      /** options control position (default:'') ⭐ */
      options?: L.ControlPosition;
    }

    interface PMEditLayer {
      /** Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar */
      enable(options?: EditModeOptions): void;

      /** sets layer options */
      setOptions(options?: EditModeOptions): void;

      /** gets layer options */
      getOptions(): EditModeOptions;

      /** Disables edit mode. */
      disable(): void;

      /** Toggles edit mode. Passed options are preserved. */
      toggleEdit(options?: EditModeOptions): void;

      /** Returns true if edit mode is enabled. false when disabled. */
      enabled(): boolean;

      /** Returns true if Line or Polygon has a self intersection. */
      hasSelfIntersection(): boolean;

      /** Removes the layer with the same checks as GlobalRemovalMode. */
      remove(): void;
    }

    interface PMDragLayer {
      /** enables dragging for the layer. */
      enableLayerDrag(): void;

      /** disables dragging for the layer. */
      disableLayerDrag(): void;

      /** returns if the layer is currently dragging. */
      dragging(): boolean;

      /** returns if drag mode is enabled for the layer. */
      layerDragEnabled(): boolean;
    }

    interface PMLayer extends PMRotateLayer, PMEditLayer, PMDragLayer {
      /** get shape of the layer. */
      getShape(): SUPPORTED_SHAPES;
    }

    interface PMLayerGroup {
      /** Enables edit mode for all child layers. The passed options are preserved, even when the mode is enabled via the Toolbar */
      enable(options?: EditModeOptions): void;

      /** Disable edit mode for all child layers.*/
      disable(): void;

      /** Returns if minimum one layer is enabled. */
      enabled(): boolean;

      /** Toggle enable / disable on all layers. */
      toggleEdit(options?: EditModeOptions): void;

      /** Returns the layers of the LayerGroup. `deep=true` return also the children of LayerGroup children. `filterGeoman=true` filter out layers that don't have Leaflet-Geoman or temporary stuff. `filterGroupsOut=true` does not return the LayerGroup layers self. (Default: `deep=false`,`filterGeoman=true`, `filterGroupsOut=true` ) */
      getLayers(
        deep?: boolean,
        filterGeoman?: boolean,
        filterGroupsOut?: boolean
      ): L.Layer[];

      /** Apply Leaflet-Geoman options to all children. The passed options are preserved, even when the mode is enabled via the Toolbar */
      setOptions(options?: EditModeOptions): void;

      /** Returns the options of the LayerGroup. */
      getOptions(): EditModeOptions;

      /** Returns if currently a layer in the LayerGroup is dragging. */
      dragging(): boolean;
    }

    namespace Utils {
      /**  Returns the translation of the passed path. path = json-string f.ex. tooltips.placeMarker */
      function getTranslation(path: string): string;

      /** returns the middle LatLng between two LatLngs */
      function calcMiddleLatLng(
        map: L.Map,
        latlng1: L.LatLng,
        latlng2: L.LatLng
      ): L.LatLng;

      /** returns all layers that are available for Geoman */
      function findLayers(map: L.Map): L.Layer[];

      /** converts a circle into a polygon with default 60 sides */
      function circleToPolygon(circle: L.Circle, sides?: number): L.Polygon;
    }

    /**
     * DRAW MODE MAP EVENT HANDLERS
     */

    export type GlobalDrawModeToggledEventHandler = (event: {
      enabled: boolean;
      shape: PM.SUPPORTED_SHAPES;
      map: L.Map;
    }) => void;
    export type DrawStartEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
    }) => void;
    export type DrawEndEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type CreateEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;

    /**
     * DRAW MODE LAYER EVENT HANDLERS
     */

    export type VertexAddedEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
      marker: L.Marker;
      latLng: L.LatLng;
    }) => void;
    export type SnapEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      distance: number;
      layer: L.Layer;
      workingLayer: L.Layer;
      marker: L.Marker;
      layerInteractedWith: L.Layer;
      segement: any;
      snapLatLng: L.LatLng;
    }) => void;
    export type CenterPlacedEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
      latLng: L.LatLng;
    }) => void;

    /**
     * EDIT MODE LAYER EVENT HANDLERS
     */

    export type EditEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type UpdateEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type EnableEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type DisableEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type VertexAddedEventHandler2 = (e: {
      layer: L.Layer;
      indexPath: number;
      latLng: L.LatLng;
      marker: L.Marker;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type VertexRemovedEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      marker: L.Marker;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type VertexClickEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type MarkerDragStartEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type MarkerDragEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type MarkerDragEndEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: PM.SUPPORTED_SHAPES;
      intersectionRest: boolean;
    }) => void;
    export type LayerResetEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type IntersectEventHandler = (e: {
      shape: PM.SUPPORTED_SHAPES;
      layer: L.Layer;
      intersection: L.LatLng;
    }) => void;

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
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type DragEventHandler = (e: {
      layer: L.Layer;
      containerPoint: any;
      latLng: L.LatLng;
      layerPoint: L.Point;
      originalEvent: any;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type DragEndEventHandler = (e: {
      layer: L.Layer;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;

    /**
     * REMOVE MODE LAYER EVENT HANDLERS
     */

    export type RemoveEventHandler = (e: {
      layer: L.Layer;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;

    /**
     * REMOVE MODE MAP EVENT HANDLERS
     */
    export type GlobalRemovalModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * CUT MODE MAP EVENT HANDLERS
     */
    export type GlobalCutModeToggledEventHandler = (e: {
      layer: L.Layer;
      originalLayer: L.Layer;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;
    export type CutEventHandler = (e: {
      layer: L.Layer;
      originalLayer: L.Layer;
      shape: PM.SUPPORTED_SHAPES;
    }) => void;

    /**
     * ROTATE MODE LAYER EVENT HANDLERS
     */
    export type RotateEnableEventHandler = (e: {
      layer: L.Layer;
      helpLayer: L.Layer;
    }) => void;
    export type RotateDisableEventHandler = (e: { layer: L.Layer }) => void;
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

    /**
     * ROTATE MODE MAP EVENT HANDLERS
     */
    export type GlobalRotateModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * TRANSLATION EVENT HANDLERS
     */
    export type LangChangeEventHandler = (e: {
      activeLang: string;
      oldLang: string;
      fallback: string;
      translations: PM.Translations;
    }) => void;

    /**
     * CONTROL MAP EVENT HANDLERS
     */
    export type ButtonClickEventHandler = (e: {
      btnName: string;
      button: PM.Button;
    }) => void;
    export type ActionClickEventHandler = (e: {
      text: string;
      action: string;
      btnName: string;
      button: PM.Button;
    }) => void;

    /**
     * KEYBOARD EVENT HANDLERS
     */
    export type KeyboardKeyEventHandler = (e: {
      focusOn: 'document' | 'map';
      eventType: 'keydown' | 'keyup';
      event: any;
    }) => void;
  }
}
