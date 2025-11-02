import * as L from 'leaflet';

// redeclare module, maintains compatibility with @types/leaflet
declare module 'leaflet' {
  /**
   * Extends built in leaflet Layer Options.
   */
  interface LayerOptions {
    geomanIgnore?: boolean;
    snapIgnore?: boolean;
    /** Layers can be excluded from splitting with splitMark: false and splitOnlyMarkedLayers: false. Or included with splitMark: true and splitOnlyMarkedLayers: true. ⭐ */
    splitMark?: boolean;
  }

  /**
   * Extends built in leaflet Map Options.
   */
  interface MapOptions {
    geomanIgnore?: boolean;
  }

  /**
   * Extends built in leaflet Map.
   */
  interface Map {
    geoman: Geoman.GeomanMap;
  }

  /**
   * Extends built in leaflet Path.
   */
  interface Path {
    geoman: Geoman.GeomanLayer;
  }
  /**
   * Extends built in leaflet ImageOverlay.
   */
  interface ImageOverlay {
    geoman: Geoman.GeomanLayer;
  }

  /**
   * Extends built in leaflet LayerGroup.
   */
  interface LayerGroup {
    geoman: Geoman.GeomanLayerGroup;
  }

  /**
   * Extends built in leaflet MarkerOptions with options for Text-Layer
   */
  interface MarkerOptions {
    textMarker?: boolean;
    text?: string;

    /** Centers the text around the marker. ⭐ */
    textMarkerCentered?: boolean;
  }

  /**
   * Extends built in leaflet Marker.
   */
  interface Marker {
    geoman: Geoman.GeomanLayer;
  }

  /**
   * Extends @types/leaflet events...
   *
   * Todo: This is kind of a mess, and it makes all these event handlers show
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
    on(type: 'geoman:remove', fn: Geoman.RemoveEventHandler): this;
    once(type: 'geoman:remove', fn: Geoman.RemoveEventHandler): this;
    off(type: 'geoman:remove', fn?: Geoman.RemoveEventHandler): this;

    /** Fired when the layer being cut. Draw+Edit Mode*/
    on(type: 'geoman:cut', fn: Geoman.CutEventHandler): this;
    once(type: 'geoman:cut', fn: Geoman.CutEventHandler): this;
    off(type: 'geoman:cut', fn?: Geoman.CutEventHandler): this;

    /** Fired when the layer being split. Draw+Edit Mode ⭐*/
    on(type: 'geoman:split', fn: Geoman.SplitEventHandler): this;
    once(type: 'geoman:split', fn: Geoman.SplitEventHandler): this;
    off(type: 'geoman:split', fn?: Geoman.SplitEventHandler): this;

    /** Fired when rotation is enabled for a layer. */
    on(type: 'geoman:rotateenable', fn: Geoman.RotateEnableEventHandler): this;
    once(type: 'geoman:rotateenable', fn: Geoman.RotateEnableEventHandler): this;
    off(type: 'geoman:rotateenable', fn?: Geoman.RotateEnableEventHandler): this;

    /** Fired when rotation is disabled for a layer. */
    on(type: 'geoman:rotatedisable', fn: Geoman.RotateDisableEventHandler): this;
    once(type: 'geoman:rotatedisable', fn: Geoman.RotateDisableEventHandler): this;
    off(type: 'geoman:rotatedisable', fn?: Geoman.RotateDisableEventHandler): this;

    /** Fired when rotation starts on a layer. */
    on(type: 'geoman:rotatestart', fn: Geoman.RotateStartEventHandler): this;
    once(type: 'geoman:rotatestart', fn: Geoman.RotateStartEventHandler): this;
    off(type: 'geoman:rotatestart', fn?: Geoman.RotateStartEventHandler): this;

    /** Fired when a layer is rotated. */
    on(type: 'geoman:rotate', fn: Geoman.RotateEventHandler): this;
    once(type: 'geoman:rotate', fn: Geoman.RotateEventHandler): this;
    off(type: 'geoman:rotate', fn?: Geoman.RotateEventHandler): this;

    /** Fired when rotation ends on a layer. */
    on(type: 'geoman:rotateend', fn: Geoman.RotateEndEventHandler): this;
    once(type: 'geoman:rotateend', fn: Geoman.RotateEndEventHandler): this;
    off(type: 'geoman:rotateend', fn?: Geoman.RotateEndEventHandler): this;

    /** Fired when scaling is enabled for a layer. */
    on(type: 'geoman:scaleenable', fn: Geoman.ScaleEnableEventHandler): this;
    once(type: 'geoman:scaleenable', fn: Geoman.ScaleEnableEventHandler): this;
    off(type: 'geoman:scaleenable', fn?: Geoman.ScaleEnableEventHandler): this;

    /** Fired when scaling is disabled for a layer. */
    on(type: 'geoman:scaledisable', fn: Geoman.ScaleDisableEventHandler): this;
    once(type: 'geoman:scaledisable', fn: Geoman.ScaleDisableEventHandler): this;
    off(type: 'geoman:scaledisable', fn?: Geoman.ScaleDisableEventHandler): this;

    /** Fired when scaling starts on a layer. */
    on(type: 'geoman:scalestart', fn: Geoman.ScaleStartEventHandler): this;
    once(type: 'geoman:scalestart', fn: Geoman.ScaleStartEventHandler): this;
    off(type: 'geoman:scalestart', fn?: Geoman.ScaleStartEventHandler): this;

    /** Fired when a layer is scaled. */
    on(type: 'geoman:scale', fn: Geoman.ScaleEventHandler): this;
    once(type: 'geoman:scale', fn: Geoman.ScaleEventHandler): this;
    off(type: 'geoman:scale', fn?: Geoman.ScaleEventHandler): this;

    /** Fired when scaling ends on a layer. */
    on(type: 'geoman:scaleend', fn: Geoman.ScaleEndEventHandler): this;
    once(type: 'geoman:scaleend', fn: Geoman.ScaleEndEventHandler): this;
    off(type: 'geoman:scaleend', fn?: Geoman.ScaleEndEventHandler): this;

    /******************************************
     *
     * TODO: DRAW/EDIT MODE EVENTS LAYER ONLY
     *
     ********************************************/

    /** Fired during a marker move/drag. */
    on(type: 'geoman:snapdrag', fn: Geoman.SnapEventHandler): this;
    once(type: 'geoman:snapdrag', fn: Geoman.SnapEventHandler): this;
    off(type: 'geoman:snapdrag', fn?: Geoman.SnapEventHandler): this;

    /** Fired when a vertex is snapped. */
    on(type: 'geoman:snap', fn: Geoman.SnapEventHandler): this;
    once(type: 'geoman:snap', fn: Geoman.SnapEventHandler): this;
    off(type: 'geoman:snap', fn?: Geoman.SnapEventHandler): this;

    /** Fired when a vertex is unsnapped. */
    on(type: 'geoman:unsnap', fn: Geoman.SnapEventHandler): this;
    once(type: 'geoman:unsnap', fn: Geoman.SnapEventHandler): this;
    off(type: 'geoman:unsnap', fn?: Geoman.SnapEventHandler): this;

    /** Called when the center of a circle is placed/moved. */
    on(type: 'geoman:centerplaced', fn: Geoman.CenterPlacedEventHandler): this;
    once(type: 'geoman:centerplaced', fn: Geoman.CenterPlacedEventHandler): this;
    off(type: 'geoman:centerplaced', fn?: Geoman.CenterPlacedEventHandler): this;

    /******************************************
     *
     * TODO: CUT/EDIT MODE EVENTS LAYER ONLY
     *
     ********************************************/

    /** Fired when a layer is edited. */
    on(type: 'geoman:edit', fn: Geoman.EditEventHandler): this;
    once(type: 'geoman:edit', fn: Geoman.EditEventHandler): this;
    off(type: 'geoman:edit', fn?: Geoman.EditEventHandler): this;

    /******************************************
     *
     * TODO: DRAW MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Drawing Mode is toggled. */
    on(
      type: 'geoman:globaldrawmodetoggled',
      fn: Geoman.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'geoman:globaldrawmodetoggled',
      fn: Geoman.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'geoman:globaldrawmodetoggled',
      fn?: Geoman.GlobalDrawModeToggledEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is enabled. Payload includes the shape type and working layer. */
    on(
      type: 'geoman:drawstart',
      fn: Geoman.DrawStartEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'geoman:drawstart',
      fn: Geoman.DrawStartEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'geoman:drawstart',
      fn?: Geoman.DrawStartEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is disabled. Payload includes the shape type. */
    on(
      type: 'geoman:drawend',
      fn: Geoman.DrawEndEventHandler,
      context?: any
    ): L.Evented;
    once(
      type: 'geoman:drawend',
      fn: Geoman.DrawEndEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'geoman:drawend',
      fn?: Geoman.DrawEndEventHandler,
      context?: any
    ): L.Evented;

    /** Called when drawing mode is disabled. Payload includes the shape type. */
    on(type: 'geoman:create', fn: Geoman.CreateEventHandler, context?: any): L.Evented;
    once(
      type: 'geoman:create',
      fn: Geoman.CreateEventHandler,
      context?: any
    ): L.Evented;
    off(
      type: 'geoman:create',
      fn?: Geoman.CreateEventHandler,
      context?: any
    ): L.Evented;

    /******************************************
     *
     * TODO: DRAW MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Called when a new vertex is added. */
    on(type: 'geoman:vertexadded', fn: Geoman.VertexAddedEventHandler): this;
    once(type: 'geoman:vertexadded', fn: Geoman.VertexAddedEventHandler): this;
    off(type: 'geoman:vertexadded', fn?: Geoman.VertexAddedEventHandler): this;

    /******************************************
     *
     * TODO: EDIT MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Fired when edit mode is disabled and a layer is edited and its coordinates have changed. */
    on(type: 'geoman:update', fn: Geoman.UpdateEventHandler): this;
    once(type: 'geoman:update', fn: Geoman.UpdateEventHandler): this;
    off(type: 'geoman:update', fn?: Geoman.UpdateEventHandler): this;

    /** Fired when edit mode on a layer is enabled. */
    on(type: 'geoman:enable', fn: Geoman.EnableEventHandler): this;
    once(type: 'geoman:enable', fn: Geoman.EnableEventHandler): this;
    off(type: 'geoman:enable', fn?: Geoman.EnableEventHandler): this;

    /** Fired when edit mode on a layer is disabled. */
    on(type: 'geoman:disable', fn: Geoman.DisableEventHandler): this;
    once(type: 'geoman:disable', fn: Geoman.DisableEventHandler): this;
    off(type: 'geoman:disable', fn?: Geoman.DisableEventHandler): this;

    /** Fired when a vertex is added. */
    on(type: 'geoman:vertexadded', fn: Geoman.VertexAddedEventHandler2): this;
    once(type: 'geoman:vertexadded', fn: Geoman.VertexAddedEventHandler2): this;
    off(type: 'geoman:vertexadded', fn?: Geoman.VertexAddedEventHandler2): this;

    /** Fired when a vertex is removed. */
    on(type: 'geoman:vertexremoved', fn: Geoman.VertexRemovedEventHandler): this;
    once(type: 'geoman:vertexremoved', fn: Geoman.VertexRemovedEventHandler): this;
    off(type: 'geoman:vertexremoved', fn?: Geoman.VertexRemovedEventHandler): this;

    /** Fired when a vertex is clicked. */
    on(type: 'geoman:vertexclick', fn: Geoman.VertexClickEventHandler): this;
    once(type: 'geoman:vertexclick', fn: Geoman.VertexClickEventHandler): this;
    off(type: 'geoman:vertexclick', fn?: Geoman.VertexClickEventHandler): this;

    /** Fired when dragging of a marker which corresponds to a vertex starts. */
    on(type: 'geoman:vertexdragstart', fn: Geoman.VertexDragStartEventHandler): this;
    once(type: 'geoman:vertexdragstart', fn: Geoman.VertexDragStartEventHandler): this;
    off(type: 'geoman:vertexdragstart', fn?: Geoman.VertexDragStartEventHandler): this;

    /** Fired when dragging a vertex-marker. */
    on(type: 'geoman:vertexdrag', fn: Geoman.VertexDragEventHandler): this;
    once(type: 'geoman:vertexdrag', fn: Geoman.VertexDragEventHandler): this;
    off(type: 'geoman:vertexdrag', fn?: Geoman.VertexDragEventHandler): this;

    /** Fired when dragging of a vertex-marker ends. */
    on(type: 'geoman:vertexdragend', fn: Geoman.VertexDragEndEventHandler): this;
    once(type: 'geoman:vertexdragend', fn: Geoman.VertexDragEndEventHandler): this;
    off(type: 'geoman:vertexdragend', fn?: Geoman.VertexDragEndEventHandler): this;

    /** Fired when coords of a layer are reset. E.g. by self-intersection. */
    on(type: 'geoman:layerreset', fn: Geoman.LayerResetEventHandler): this;
    once(type: 'geoman:layerreset', fn: Geoman.LayerResetEventHandler): this;
    off(type: 'geoman:layerreset', fn?: Geoman.LayerResetEventHandler): this;

    /** When allowSelfIntersection: false, this event is fired as soon as a self-intersection is detected. */
    on(type: 'geoman:intersect', fn: Geoman.IntersectEventHandler): this;
    once(type: 'geoman:intersect', fn: Geoman.IntersectEventHandler): this;
    off(type: 'geoman:intersect', fn?: Geoman.IntersectEventHandler): this;

    /** Fired coordinates of the layer changed. */
    on(type: 'geoman:change', fn: Geoman.ChangeEventHandler): this;
    once(type: 'geoman:change', fn: Geoman.ChangeEventHandler): this;
    off(type: 'geoman:change', fn?: Geoman.ChangeEventHandler): this;

    /** Fired when the text of a layer is changed. */
    on(type: 'geoman:textchange', fn: Geoman.TextChangeEventHandler): this;
    once(type: 'geoman:textchange', fn: Geoman.TextChangeEventHandler): this;
    off(type: 'geoman:textchange', fn?: Geoman.TextChangeEventHandler): this;

    /** Fired when the text layer is focused. */
    on(type: 'geoman:textfocus', fn: Geoman.TextFocusEventHandler): this;
    once(type: 'geoman:textfocus', fn: Geoman.TextFocusEventHandler): this;
    off(type: 'geoman:textfocus', fn?: Geoman.TextFocusEventHandler): this;

    /** Fired when the text layer is blurred.  */
    on(type: 'geoman:textblur', fn: Geoman.TextBlurEventHandler): this;
    once(type: 'geoman:textblur', fn: Geoman.TextBlurEventHandler): this;
    off(type: 'geoman:textblur', fn?: Geoman.TextBlurEventHandler): this;

    /** Fired when the layer violates requireContainment.  */
    on(
      type: 'geoman:containmentviolation',
      fn: Geoman.ContainmentViolationEventHandler
    ): this;
    once(
      type: 'geoman:containmentviolation',
      fn: Geoman.ContainmentViolationEventHandler
    ): this;
    off(
      type: 'geoman:containmentviolation',
      fn?: Geoman.ContainmentViolationEventHandler
    ): this;

    /** Fired when the layer violates preventIntersection.  */
    on(
      type: 'geoman:intersectionviolation',
      fn: Geoman.IntersectionViolationEventHandler
    ): this;
    once(
      type: 'geoman:intersectionviolation',
      fn: Geoman.IntersectionViolationEventHandler
    ): this;
    off(
      type: 'geoman:intersectionviolation',
      fn?: Geoman.IntersectionViolationEventHandler
    ): this;

    /** Fired when the layer changes are canceled. */
    on(type: 'geoman:cancel', fn: Geoman.CancelEventHandler): this;
    once(type: 'geoman:cancel', fn: Geoman.CancelEventHandler): this;
    off(type: 'geoman:cancel', fn?: Geoman.CancelEventHandler): this;

    /** Fired when the layer removing is canceled and the layer is re-added to the map. */
    on(type: 'geoman:undoremove', fn: Geoman.UndoRemoveEventHandler): this;
    once(type: 'geoman:undoremove', fn: Geoman.UndoRemoveEventHandler): this;
    off(type: 'geoman:undoremove', fn?: Geoman.UndoRemoveEventHandler): this;

    /******************************************
     *
     * TODO: EDIT MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Edit Mode is toggled. */
    on(
      type: 'geoman:globaleditmodetoggled',
      fn: Geoman.GlobalEditModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globaleditmodetoggled',
      fn: Geoman.GlobalEditModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globaleditmodetoggled',
      fn?: Geoman.GlobalEditModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: DRAG MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Drag Mode is toggled. */
    on(
      type: 'geoman:globaldragmodetoggled',
      fn: Geoman.GlobalDragModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globaldragmodetoggled',
      fn: Geoman.GlobalDragModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globaldragmodetoggled',
      fn?: Geoman.GlobalDragModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: DRAG MODE EVENTS ON LAYER ONLY
     *
     ********************************************/

    /** Fired when a layer starts being dragged. */
    on(type: 'geoman:dragstart', fn: Geoman.DragStartEventHandler): this;
    once(type: 'geoman:dragstart', fn: Geoman.DragStartEventHandler): this;
    off(type: 'geoman:dragstart', fn?: Geoman.DragStartEventHandler): this;

    /** Fired when a layer is dragged. */
    on(type: 'geoman:drag', fn: Geoman.DragEventHandler): this;
    once(type: 'geoman:drag', fn: Geoman.DragEventHandler): this;
    off(type: 'geoman:drag', fn?: Geoman.DragEventHandler): this;

    /** Fired when a layer stops being dragged. */
    on(type: 'geoman:dragend', fn: Geoman.DragEndEventHandler): this;
    once(type: 'geoman:dragend', fn: Geoman.DragEndEventHandler): this;
    off(type: 'geoman:dragend', fn?: Geoman.DragEndEventHandler): this;

    /** Fired when drag mode on a layer is enabled. */
    on(type: 'geoman:dragenable', fn: Geoman.DragEnableEventHandler): this;
    once(type: 'geoman:dragenable', fn: Geoman.DragEnableEventHandler): this;
    off(type: 'geoman:dragenable', fn?: Geoman.DragEnableEventHandler): this;

    /** Fired when drag mode on a layer is disabled. */
    on(type: 'geoman:dragdisable', fn: Geoman.DragDisableEventHandler): this;
    once(type: 'geoman:dragdisable', fn: Geoman.DragDisableEventHandler): this;
    off(type: 'geoman:dragdisable', fn?: Geoman.DragDisableEventHandler): this;

    /******************************************
     *
     * TODO: REMOVE MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Removal Mode is toggled. */
    on(
      type: 'geoman:globalremovalmodetoggled',
      fn: Geoman.GlobalRemovalModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalremovalmodetoggled',
      fn: Geoman.GlobalRemovalModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalremovalmodetoggled',
      fn?: Geoman.GlobalRemovalModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: CUT MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a layer is removed via Removal Mode. */
    on(
      type: 'geoman:globalcutmodetoggled',
      fn: Geoman.GlobalCutModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalcutmodetoggled',
      fn: Geoman.GlobalCutModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalcutmodetoggled',
      fn?: Geoman.GlobalCutModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: ROTATE MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Rotate Mode is toggled. */
    on(
      type: 'geoman:globalrotatemodetoggled',
      fn: Geoman.GlobalRotateModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalrotatemodetoggled',
      fn: Geoman.GlobalRotateModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalrotatemodetoggled',
      fn?: Geoman.GlobalRotateModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: Union MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Union Mode is toggled. */
    on(
      type: 'geoman:globalunionmodetoggled',
      fn: Geoman.GlobalUnionModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalunionmodetoggled',
      fn: Geoman.GlobalUnionModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalunionmodetoggled',
      fn?: Geoman.GlobalUnionModeToggledEventHandler
    ): this;

    /** Fired when Union is executed. */
    on(type: 'geoman:union', fn: Geoman.UnionEventHandler): this;
    once(type: 'geoman:union', fn: Geoman.UnionEventHandler): this;
    off(type: 'geoman:union', fn: Geoman.UnionEventHandler): this;

    /******************************************
     *
     * TODO: Difference MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Difference Mode is toggled. */
    on(
      type: 'geoman:globaldifferencemodetoggled',
      fn: Geoman.GlobalDifferenceModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globaldifferencemodetoggled',
      fn: Geoman.GlobalDifferenceModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globaldifferencemodetoggled',
      fn?: Geoman.GlobalDifferenceModeToggledEventHandler
    ): this;

    /** Fired when Difference is executed. */
    on(type: 'geoman:difference', fn: Geoman.DifferenceEventHandler): this;
    once(type: 'geoman:difference', fn: Geoman.DifferenceEventHandler): this;
    off(type: 'geoman:difference', fn?: Geoman.DifferenceEventHandler): this;

    /******************************************
     *
     * TODO: Selection MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a layer is added to the selection. */
    on(type: 'geoman:selectionadd', fn: Geoman.SelectionEventHandler): this;
    once(type: 'geoman:selectionadd', fn: Geoman.SelectionEventHandler): this;
    off(type: 'geoman:selectionadd', fn: Geoman.SelectionEventHandler): this;

    /** Fired when a layer is removed from the selection. */
    on(type: 'geoman:selectionremove', fn: Geoman.SelectionEventHandler): this;
    once(type: 'geoman:selectionremove', fn: Geoman.SelectionEventHandler): this;
    off(type: 'geoman:selectionremove', fn: Geoman.SelectionEventHandler): this;

    /******************************************
     *
     * TODO: BringTo MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when SendToBack Mode is toggled. */
    on(
      type: 'geoman:globalbringtobackmodetoggled',
      fn: Geoman.GlobalSendToBackModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalbringtobackmodetoggled',
      fn: Geoman.GlobalSendToBackModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalbringtobackmodetoggled',
      fn?: Geoman.GlobalSendToBackModeToggledEventHandler
    ): this;

    /** Fired when BringToFront Mode is toggled. */
    on(
      type: 'geoman:globalbringtofrontmodetoggled',
      fn: Geoman.GlobalBringToFrontModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalbringtofrontmodetoggled',
      fn: Geoman.GlobalBringToFrontModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalbringtofrontmodetoggled',
      fn?: Geoman.GlobalBringToFrontModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: CopyLayer MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when CopyLayer Mode is toggled. */
    on(
      type: 'geoman:globalcopylayermodetoggled',
      fn: Geoman.GlobalCopyLayerModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalcopylayermodetoggled',
      fn: Geoman.GlobalCopyLayerModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalcopylayermodetoggled',
      fn?: Geoman.GlobalCopyLayerModeToggledEventHandler
    ): this;

    /** Fired when CopyLayer is executed. */
    on(type: 'geoman:copylayer', fn: Geoman.CopyLayerEventHandler): this;
    once(type: 'geoman:copylayer', fn: Geoman.CopyLayerEventHandler): this;
    off(type: 'geoman:copylayer', fn?: Geoman.CopyLayerEventHandler): this;

    /******************************************
     *
     * TODO: LINE SIMPLIFICATION MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when CopyLayer Mode is toggled. */
    on(
      type: 'geoman:globallinesimplificationmodetoggled',
      fn: Geoman.GlobalLineSimplificationModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globallinesimplificationmodetoggled',
      fn: Geoman.GlobalLineSimplificationModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globallinesimplificationmodetoggled',
      fn?: Geoman.GlobalLineSimplificationModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: Lasso MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Lasso Mode is toggled. */
    on(
      type: 'geoman:globallassomodetoggled',
      fn: Geoman.GlobalLassoModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globallassomodetoggled',
      fn: Geoman.GlobalLassoModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globallassomodetoggled',
      fn?: Geoman.GlobalLassoModeToggledEventHandler
    ): this;

    /** Fired when the Lasso has been drawn. */
    on(type: 'geoman:lasso-select', fn: Geoman.LassoSelectEventHandler): this;
    once(type: 'geoman:lasso-select', fn: Geoman.LassoSelectEventHandler): this;
    off(type: 'geoman:lasso-select', fn?: Geoman.LassoSelectEventHandler): this;

    /******************************************
     *
     * TODO: TRANSLATION EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Standard Leaflet event. Fired when any layer is removed. */
    on(type: 'geoman:langchange', fn: Geoman.LangChangeEventHandler): this;
    once(type: 'geoman:langchange', fn: Geoman.LangChangeEventHandler): this;
    off(type: 'geoman:langchange', fn?: Geoman.LangChangeEventHandler): this;

    /******************************************
     *
     * TODO: CONTROL EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a Toolbar button is clicked. */
    on(type: 'geoman:buttonclick', fn: Geoman.ButtonClickEventHandler): this;
    once(type: 'geoman:buttonclick', fn: Geoman.ButtonClickEventHandler): this;
    off(type: 'geoman:buttonclick', fn?: Geoman.ButtonClickEventHandler): this;

    /** Fired when a Toolbar action is clicked. */
    on(type: 'geoman:actionclick', fn: Geoman.ActionClickEventHandler): this;
    once(type: 'geoman:actionclick', fn: Geoman.ActionClickEventHandler): this;
    off(type: 'geoman:actionclick', fn?: Geoman.ActionClickEventHandler): this;

    /******************************************
     *
     * TODO: Keyboard EVENT ON MAP ONLY
     *
     ********************************************/

    /** Fired when `keydown` or `keyup` on the document is fired. */
    on(type: 'geoman:keyevent', fn: Geoman.KeyboardKeyEventHandler): this;
    once(type: 'geoman:keyevent', fn: Geoman.KeyboardKeyEventHandler): this;
    off(type: 'geoman:keyevent', fn?: Geoman.KeyboardKeyEventHandler): this;

    /******************************************
     *
     * TODO: GLOBAL OPTIONS EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when global options are changed. */
    on(
      type: 'geoman:globaloptionschanged',
      fn: Geoman.GlobalOptionsChangedEventHandler
    ): this;
    once(
      type: 'geoman:globaloptionschanged',
      fn: Geoman.GlobalOptionsChangedEventHandler
    ): this;
    off(
      type: 'geoman:globaloptionschanged',
      fn?: Geoman.GlobalOptionsChangedEventHandler
    ): this;

    /******************************************
     *
     * TODO: AUTO TRACING EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when auto tracing is started and connected with a layer. ⭐ */
    on(type: 'geoman:autotracestart', fn: Geoman.AutoTraceEventHandler): this;
    once(type: 'geoman:autotracestart', fn: Geoman.AutoTraceEventHandler): this;
    off(type: 'geoman:autotracestart', fn?: Geoman.AutoTraceEventHandler): this;

    /** Fired when auto tracing hintline is changed. ⭐ */
    on(
      type: 'geoman:autotracelinechange',
      fn: Geoman.AutoTraceLineChangeEventHandler
    ): this;
    once(
      type: 'geoman:autotracelinechange',
      fn: Geoman.AutoTraceLineChangeEventHandler
    ): this;
    off(
      type: 'geoman:autotracelinechange',
      fn?: Geoman.AutoTraceLineChangeEventHandler
    ): this;

    /** 	Fired when auto tracing is ended. ⭐ */
    on(type: 'geoman:autotraceend', fn: Geoman.AutoTraceEventHandler): this;
    once(type: 'geoman:autotraceend', fn: Geoman.AutoTraceEventHandler): this;
    off(type: 'geoman:autotraceend', fn?: Geoman.AutoTraceEventHandler): this;

    /******************************************
     *
     * TODO: Split MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when a layer is split via Split Mode. */
    on(
      type: 'geoman:globalsplitmodetoggled',
      fn: Geoman.GlobalSplitModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalsplitmodetoggled',
      fn: Geoman.GlobalSplitModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalsplitmodetoggled',
      fn?: Geoman.GlobalSplitModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: SCALE MODE EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when Scale Mode is toggled. */
    on(
      type: 'geoman:globalscalemodetoggled',
      fn: Geoman.GlobalScaleModeToggledEventHandler
    ): this;
    once(
      type: 'geoman:globalscalemodetoggled',
      fn: Geoman.GlobalScaleModeToggledEventHandler
    ): this;
    off(
      type: 'geoman:globalscalemodetoggled',
      fn?: Geoman.GlobalScaleModeToggledEventHandler
    ): this;

    /******************************************
     *
     * TODO: GLOBAL MODE CANCEL EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when cancel of Mode is called. */
    on(type: 'geoman:globalcancel', fn: Geoman.GlobalCancelEventHandler): this;
    once(type: 'geoman:globalcancel', fn: Geoman.GlobalCancelEventHandler): this;
    off(type: 'geoman:globalcancel', fn?: Geoman.GlobalCancelEventHandler): this;

    /******************************************
     *
     * TODO: ERROR EVENTS ON MAP ONLY
     *
     ********************************************/

    /** Fired when an error is thrown. */
    on(type: 'geoman:error', fn: Geoman.ErrorEventHandler): this;
    once(type: 'geoman:error', fn: Geoman.ErrorEventHandler): this;
    off(type: 'geoman:error', fn?: Geoman.ErrorEventHandler): this;
  }

  namespace Geoman {
    export const version: string;

    /** Supported shape names. 'ImageOverlay' is in Edit Mode only. Also accepts custom shape name. */
    type SUPPORTED_SHAPES =
      | 'Marker'
      | 'Circle'
      | 'Polyline'
      | 'Rectangle'
      | 'Polygon'
      | 'Cut'
      | 'CircleMarker'
      | 'ImageOverlay'
      | 'Text'
      | 'Freehand' // ⭐
      | 'Lasso' // ⭐
      | 'CustomShape' // ⭐
      | string;

    type SupportLocales =
      | 'cz'
      | 'da'
      | 'de'
      | 'el'
      | 'en'
      | 'es'
      | 'fa'
      | 'fi'
      | 'fr'
      | 'hu'
      | 'id'
      | 'it'
      | 'ja'
      | 'ko'
      | 'ky'
      | 'nl'
      | 'no'
      | 'pl'
      | 'pt_br'
      | 'pt_pt'
      | 'ro'
      | 'ru'
      | 'sv'
      | 'tr'
      | 'ua'
      | 'zh'
      | 'zh_tw';

    /**
     * Changes default registration of leaflet-geoman on leaflet layers.
     *
     * @param optIn - if true, a layers geomanIgnore property has to be set to false to get initiated.
     */
    function setOptIn(optIn: boolean): void;

    /**
     * Enable leaflet-geoman on an ignored layer.
     *
     * @param layer - re-reads layer.options.geomanIgnore to initialize leaflet-geoman.
     */
    function reInitLayer(layer: L.Layer): void;

    /**
     * Geoman map interface.
     */
    interface GeomanMap
      extends GeomanDrawMap,
        GeomanEditMap,
        GeomanDragMap,
        GeomanRemoveMap,
        GeomanCutMap,
        GeomanRotateMap,
        GeomanScaleMap,
        GeomanSelectionMap,
        GeomanUnionMap,
        GeomanLineSimplificationMap,
        GeomanDifferenceMap,
        GeomanLassoMap {
      Toolbar: GeomanMapToolbar;

      Keyboard: GeomanMapKeyboard;

      /** Adds the Toolbar to the map. */
      addControls(options?: ToolbarOptions): void;

      /** Toggle the visiblity of the Toolbar. */
      removeControls(): void;

      /** Returns true if the Toolbar is visible on the map. */
      controlsVisible(): boolean;

      /** Toggle the visiblity of the Toolbar. */
      toggleControls(): void;

      setLang(
        lang: SupportLocales,
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
        placeText?: string;
        selectFirstLayerFor?: string;
        selectSecondLayerFor?: string;
        'freehand-start'?: string;
        'lasso-start'?: string;
        placeCustomShape?: string;
      };

      actions?: {
        finish?: string;
        cancel?: string;
        removeLastVertex?: string;
        reset?: string;
        clear?: string;
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
        snappingButton?: string;
        pinningButton?: string;
        rotateButton?: string;
        drawTextButton?: string;
        scaleButton?: string;
        autoTracingButton?: string;
        snapGuidesButton?: string;
        unionButton?: string;
        differenceButton?: string;
        sendToBackButton?: string;
        bringToFrontButton?: string;
        copyLayerButton?: string;
        splitButton?: string;
        lineSimplificationButton?: string;
        lassoButton?: string;
        freeHandButton?: string;
        customShapeButton?: string;
      };

      measurements?: {
        totalLength?: string;
        segmentLength?: string;
        area?: string;
        radius?: string;
        perimeter?: string;
        height?: string;
        width?: string;
        coordinates?: string;
        coordinatesMarker?: string;
      };
    }

    type ACTION_NAMES = 'cancel' | 'removeLastVertex' | 'finish' | 'finishMode';

    class Action {
      text: string;
      onClick?: (e: any) => void;
      title?: string;
      name?: string;
      isActive?: () => boolean;
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
      | 'drawText'
      | 'scaleMode'
      | 'pinningOption'
      | 'snappingOption'
      | 'autoTracingOption'
      | 'snapGuidesOption'
      | 'spitalMode'
      | 'unionMode'
      | 'differenceMode'
      | 'bringToMode'
      | 'drawFreehand'
      | 'lassoMode'
      | 'drawCustomShape'
      | string;

    interface GeomanMapToolbar {
      /** Pass an array of button names to reorder the buttons in the Toolbar. */
      changeControlOrder(order?: TOOLBAR_CONTROL_ORDER[]): void;

      /** Receive the current order with. */
      getControlOrder(): TOOLBAR_CONTROL_ORDER[];

      /** The position of a block (draw, edit, custom, options⭐) in the Toolbar can be changed. If not set, the value from position of the Toolbar is taken. */
      setBlockPosition(
        block: 'draw' | 'edit' | 'custom' | 'options',
        position: L.ControlPosition
      ): void;

      /** Returns all of the active buttons */
      getButtons(): Record<string, L.Control>;

      /** Returns the full button object or undefined if the name does not exist */
      getButton(name: string): L.Control | undefined;

      /** Checks whether a button has been mounted */
      controlExists(name: string): boolean;

      /** Returns all of the custom, active buttons */
      getButtonsInBlock(name: string): Record<string, L.Control>;

      /** Returns a Object with the positions for all blocks */
      getBlockPositions(): BlockPositions;

      /** To add a custom Control to the Toolbar */
      createCustomControl(options: CustomControlOptions): L.Control;

      /** Creates a copy of a draw Control. Returns the drawInstance and the control. */
      copyDrawControl(
        copyInstance: string,
        options: CustomControlOptions
      ): {
        drawInstance: Draw;
        control: L.Control;
      };

      /** Change the actions of an existing button. */
      changeActionsOfControl(
        name: string,
        actions: (ACTION_NAMES | Action)[]
      ): void;

      /** Disable button by control name */
      setButtonDisabled(name: TOOLBAR_CONTROL_ORDER, state: boolean): void;

      /** Deletes and removes a Control from the Toolbar */
      deleteControl(name: string): void;
    }

    type KEYBOARD_EVENT_TYPE = 'current' | 'keydown' | 'keyup';

    interface GeomanMapKeyboard {
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
      /** Actions */
      actions?: (ACTION_NAMES | Action)[];

      /** Function fired after clicking the control. */
      afterClick?: (ctx: { button: Button; event: MouseEvent }) => void;

      /** CSS class with the Icon. */
      className?: string;

      /** If true, other buttons will be disabled on click (default: true) */
      disableOtherButtons?: boolean;

      /** Control can be toggled. */
      doToggle?: boolean;

      /** Extending Class f. ex. Polyline, Polygon, ... L.Geoman.Draw.EXTENDINGCLASS */
      jsClass?: string;

      /** Function fired when clicking the control. */
      onClick?: (ctx: { button: Button; event: MouseEvent }) => void;

      position?: L.ControlPosition;

      /** Text showing when you hover the control. */
      title?: string;

      /** Toggle state true -> enabled, false -> disabled (default: false) */
      toggleStatus?: boolean;

      /** Block of the control. 'options' is ⭐ only. */
      tool?: 'draw' | 'edit' | 'custom' | 'options';
    }

    interface CustomControlOptions {
      /** Name of the control */
      name: string;

      /** Block of the control. 'options' is ⭐ only. */
      block?: 'draw' | 'edit' | 'custom' | 'options';

      /** Text showing when you hover the control. */
      title?: string;

      /** CSS class with the Icon. */
      className?: string;

      /** Function fired when clicking the control. */
      onClick?: (ctx: { button: Button; event: MouseEvent }) => void;

      /** Function fired after clicking the control. */
      afterClick?: (ctx: { button: Button; event: MouseEvent }) => void;

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

    type PANE =
      | 'mapPane'
      | 'tilePane'
      | 'overlayPane'
      | 'shadowPane'
      | 'markerPane'
      | 'tooltipPane'
      | 'popupPane'
      | string;

    type DISPLAY_FORMAT = 'metric' | 'imperial';

    interface GlobalOptions extends DrawModeOptions, EditModeOptions {
      /** Add the created layers to a layergroup instead to the map. */
      layerGroup?: L.Map | L.LayerGroup;

      /** Prioritize the order of snapping. Default: ['Marker','CircleMarker','Circle','Polyline','Polygon','Rectangle']. */
      snappingOrder?: SUPPORTED_SHAPES[];

      /** Defines in which panes the layers and helper vertices are created. Default: { vertexPane: 'markerPane', layerPane: 'overlayPane', markerPane: 'markerPane' } */
      panes?: { vertexPane?: PANE; layerPane?: PANE; markerPane?: PANE };

      /** Measurement options. ⭐*/
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

      /** Until which zoom level the coordinates of the layers in the viewport will be used. Default: 10 ⭐ */
      autoTraceMaxZoom?: number;

      /** The distance to the layer when a snap for auto tracing should happen. Default: 20 ⭐ */
      autoTraceMaxDistance?: number;

      /** Style options for selected layers. ⭐ */
      selectionLayerStyle?: L.PathOptions;

      /** Changing the cut behavior to use a circle instead of a polygon. Default: false ⭐ */
      cutAsCircle?: boolean;
    }

    interface GeomanDrawMap {
      /** Enable Draw Mode with the passed shape. */
      enableDraw(shape: SUPPORTED_SHAPES, options?: DrawModeOptions): void;

      /** Disable all drawing */
      disableDraw(): void;

      /** Enable Custom Shape Draw Mode with a passed shape from the storage or as GeoJSON. ⭐ */
      enableCustomShapeDraw(
        shape: string | object,
        options?: DrawModeOptions
      ): void;

      /** Disable Custom Shape drawing. ⭐ */
      disableCustomShapeDraw(): void;

      /** Draw */
      Draw: Draw;

      /** Returns true if global Draw Mode is enabled. false when disabled. */
      globalDrawModeEnabled(): boolean;

      /** Customize the style of the drawn layer. Only for L.Path layers. Shapes can be excluded with a ignoreShapes array or merged with the current style with merge: true in  optionsModifier. */
      setPathOptions(
        options: L.PathOptions | L.CircleMarkerOptions,
        optionsModifier?: { 
          ignoreShapes?: SUPPORTED_SHAPES[],
          merge?: boolean 
        }
      ): void;

      /** Returns all Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
      getGeomanLayers(asFeatureGroup: true): L.FeatureGroup;
      getGeomanLayers(asFeatureGroup?: false): L.Layer[];

      /** Returns all Geoman draw layers on the map as array. Pass true to get a L.FeatureGroup. */
      getGeomanDrawLayers(asFeatureGroup: true): L.FeatureGroup;
      getGeomanDrawLayers(asFeatureGroup?: false): L.Layer[];

      /** Returns if CustomShape Draw Mode is enabled. ⭐ */
      customShapeDrawEnabled(): boolean;

      /** Adds a CustomShape to the storage. ⭐ */
      addCustomShape(
        name: string,
        geojson: object,
        options?: DrawModeOptions
      ): void;

      /** Removes a CustomShape from the storage. ⭐ */
      removeCustomShape(name: string): void;

      /** Returns all CustomShapes in the storage. ⭐ */
      getCustomShapes(): {
        [name: string]: { geojson: string; options?: DrawModeOptions };
      };

      /** Adds a CustomShape to the Toolbar. ⭐ */
      addCustomShapeToToolbar(
        name: string,
        options:
          | { className: string; text?: string; title?: string }
          | { className?: string; text: string; title?: string }
      ): void;

      /** Removes a CustomShape from the Toolbar. ⭐ */
      removeCustomShapeFromToolbar(name: string): void;
    }

    interface GeomanEditMap {
      /** Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar */
      enableGlobalEditMode(options?: EditModeOptions): void;

      /** Disables global edit mode. */
      disableGlobalEditMode(): void;

      /** Toggles global edit mode. */
      toggleGlobalEditMode(options?: EditModeOptions): void;

      /** Returns true if global edit mode is enabled. false when disabled. */
      globalEditModeEnabled(): boolean;
    }

    interface GeomanDragMap {
      /** Enables global drag mode. */
      enableGlobalDragMode(): void;

      /** Disables global drag mode. */
      disableGlobalDragMode(): void;

      /** Toggles global drag mode. */
      toggleGlobalDragMode(): void;

      /** Returns true if global drag mode is enabled. false when disabled. */
      globalDragModeEnabled(): boolean;

      /** Reverts the layers to the state before changing. ⭐  */
      cancelGlobalDragMode(): void;
    }

    interface GeomanRemoveMap {
      /** Enables global removal mode. */
      enableGlobalRemovalMode(): void;

      /** Disables global removal mode. */
      disableGlobalRemovalMode(): void;

      /** Toggles global removal mode. */
      toggleGlobalRemovalMode(): void;

      /** Returns true if global removal mode is enabled. false when disabled. */
      globalRemovalModeEnabled(): boolean;

      /** Reverts the layers to the state before changing. ⭐  */
      cancelGlobalRemovalMode(): void;
    }

    interface GeomanCutMap {
      /** Enables global cut mode. */
      enableGlobalCutMode(options?: CutModeOptions): void;

      /** Disables global cut mode. */
      disableGlobalCutMode(): void;

      /** Toggles global cut mode. */
      toggleGlobalCutMode(options?: CutModeOptions): void;

      /** Returns true if global cut mode is enabled. false when disabled. */
      globalCutModeEnabled(): boolean;
    }

    interface GeomanRotateMap {
      /** Enables global rotate mode. */
      enableGlobalRotateMode(): void;

      /** Disables global rotate mode. */
      disableGlobalRotateMode(): void;

      /** Toggles global rotate mode. */
      toggleGlobalRotateMode(): void;

      /** Returns true if global rotate mode is enabled. false when disabled. */
      globalRotateModeEnabled(): boolean;

      /** Reverts the layers to the state before changing. ⭐  */
      cancelGlobalRotateMode(): void;
    }

    interface GeomanScaleMap {
      /** Enables global scale mode. ⭐ */
      enableGlobalScaleMode(): void;

      /** Disables global scale mode. ⭐ */
      disableGlobalScaleMode(): void;

      /** Toggles global scale mode. ⭐ */
      toggleGlobalScaleMode(): void;

      /** Returns true if global scale mode is enabled. false when disabled. ⭐ */
      globalScaleModeEnabled(): boolean;

      /** Reverts the layers to the state before changing. ⭐  */
      cancelGlobalScaleMode(): void;
    }

    interface GeomanSelectionMap {
      /** Enables global selection mode. Optional a filter can be added, which checks if the selection is allowed. ⭐ */
      enableSelectionTool(filterFnc?: () => boolean): void;

      /** Disables global selection mode. ⭐ */
      disableSelectionTool(): void;

      /** Returns true if global selection mode is enabled. false when disabled. ⭐ */
      selectionToolEnabled(): boolean;

      /** Adds a layer to the selection. ⭐ */
      addSelection(layer: L.Layer): void;

      /** Removes a layer from the selection. ⭐ */
      removeSelection(layer: L.Layer): void;

      /** Returns selected layers. ⭐ */
      getSelectedLayers(): L.Layer[];

      /** Returns if the layer is selected. ⭐ */
      isLayerSelected(layer: L.Layer): boolean;
    }

    interface GeomanUnionMap {
      /** Enables global union mode. ⭐ */
      enableGlobalUnionMode(): void;

      /** Disables global union mode. ⭐ */
      disableGlobalUnionMode(): void;

      /** Toggles global union mode. ⭐ */
      toggleGlobalUnionMode(): void;

      /** Returns true if global union mode is enabled. false when disabled. ⭐ */
      globalUnionModeEnabled(): boolean;

      /** Unifies the two layers. ⭐ */
      union(layer1: L.Layer, layer2: L.Layer): void;
    }

    interface GeomanDifferenceMap {
      /** Enables global difference mode. ⭐ */
      enableGlobalDifferenceMode(): void;

      /** Disables global difference mode. ⭐ */
      disableGlobalDifferenceMode(): void;

      /** Toggles global difference mode. ⭐ */
      toggleGlobalDifferenceMode(): void;

      /** Returns true if global difference mode is enabled. false when disabled. ⭐ */
      globalDifferenceModeEnabled(): boolean;

      /** Subtracts the second selected layer from the first selected layer. ⭐ */
      difference(layer1: L.Layer, layer2: L.Layer): void;
    }

    interface GeomanCopyLayerMap {
      /** Enables global CopyLayer mode. ⭐ */
      enableGlobalCopyLayerMode(): void;

      /** Disables global CopyLayer mode. ⭐ */
      disableGlobalCopyLayerMode(): void;

      /** Toggles global CopyLayer mode. ⭐ */
      toggleGlobalCopyLayerMode(): void;

      /** Returns true if global CopyLayer mode is enabled. false when disabled. ⭐ */
      globalCopyLayerModeEnabled(): boolean;

      /** Resets the current source layer. ⭐ */
      resetCopyLayerMode(): void;
    }

    interface GeomanLineSimplificationMap {
      /** Enables global LineSimplification mode. ⭐ */
      enableGlobalLineSimplificationMode(): void;

      /** Disables global LineSimplification mode. ⭐ */
      disableGlobalLineSimplificationMode(): void;

      /** Toggles global LineSimplification mode. ⭐ */
      toggleGlobalLineSimplificationMode(): void;

      /** Returns true if global LineSimplification mode is enabled. false when disabled. ⭐ */
      globalLineSimplificationModeEnabled(): boolean;

      /** Reverts the layers to the state before changing. ⭐  */
      cancelGlobalLineSimplificationMode(): void;
    }

    interface GeomanLassoMap {
      /** Enables global Lasso mode. ⭐ */
      enableGlobalLassoMode(options?: LassoModeOptions): void;

      /** Disables global Lasso mode. ⭐ */
      disableGlobalLassoMode(): void;

      /** Toggles global Lasso mode. ⭐ */
      toggleGlobalLassoMode(options?: LassoModeOptions): void;

      /** Returns true if global Lasso mode is enabled. false when disabled. ⭐ */
      globalLassoModeEnabled(): boolean;

      /** Sets the Lasso Mode to Append. ⭐ */
      setLassoAppendMode(): void;

      /** Sets the Lasso Mode to Subtract. ⭐ */
      setLassoSubtractMode(): void;

      /** Sets the Lasso Mode to Reset. ⭐ */
      setLassoResetMode(): void;

      /** Get current Lasso Mode. ⭐ */
      getLassoMode(): LASSO_MODES;

      /** Sets the Lasso Select Mode to Intersect. ⭐ */
      setLassoIntersectSelectMode(): void;

      /** Sets the Lasso Select Mode to Contain. ⭐ */
      setLassoContainSelectMode(): void;

      /** Get current Lasso Select Mode. ⭐ */
      getLassoSelectMode(): LASSO_SELECT_MODES;
    }

    interface GeomanRotateLayer {
      /** Enables rotate mode on the layer. */
      enableRotate(): void;

      /** Disables rotate mode on the layer. */
      disableRotate(): void;

      /** Returns if rotate mode is enabled for the layer. */
      rotateEnabled(): boolean;

      /** Rotates the layer by x degrees. */
      rotateLayer(degrees: number): void;

      /** Rotates the layer to x degrees. */
      rotateLayerToAngle(degrees: number): void;

      /** Returns the angle of the layer in degrees. */
      getAngle(): number;

      /** Set the initial angle of the layer in degrees. */
      setInitAngle(degrees: number): void;

      /** Returns the center of rotation. */
      getRotationCenter(): L.LatLng;

      /** Change the center of rotation. Pass null to use the shape's default center. */
      setRotationCenter(center: L.LatLng | null): void;
    }

    interface GeomanScaleLayer {
      /** Enables Scale  mode on the layer. ⭐ */
      enableScale(): void;

      /** Disables Scale  mode on the layer. ⭐ */
      disableScale(): void;

      /** Returns if Scale mode is enabled for the layer. ⭐ */
      scaleEnabled(): boolean;

      /** Scale the layer by x percent. Also an Object with {w: width, h: height} can be passed. Scale up > 0 , scale down < 0. ⭐ */
      scaleLayer(percent: number | { w: number; h: number }): void;
    }

    interface GeomanSplitMap {
      /** Enables global split mode. ⭐ */
      enableGlobalSplitMode(options?: SplitModeOptions): void;

      /** Disables global split mode. ⭐ */
      disableGlobalSplitMode(): void;

      /** Toggles global split mode. ⭐ */
      toggleGlobalSplitMode(options?: SplitModeOptions): void;

      /** Returns true if global split mode is enabled. false when disabled. ⭐ */
      globalSplitModeEnabled(): boolean;
    }
    interface GeomanBringToFrontMap {
      /** Enables global BringToFront mode. ⭐ */
      enableGlobalBringToFrontMode(): void;

      /** Disables global BringToFront mode. ⭐ */
      disableGlobalBringToFrontMode(): void;

      /** Toggles global BringToFront mode. ⭐ */
      toggleGlobalBringToFrontMode(): void;

      /** Returns true if global BringToFront mode is enabled. false when disabled. ⭐ */
      globalBringToFrontModeEnabled(): boolean;
    }
    interface GeomanSendToBackMap {
      /** Enables global SendToBack mode. ⭐ */
      enableGlobalSendToBackMode(): void;

      /** Disables global SendToBack mode. ⭐ */
      disableGlobalSendToBackMode(): void;

      /** Toggles global SendToBack mode. ⭐ */
      toggleGlobalSendToBackMode(): void;

      /** Returns true if global SendToBack mode is enabled. false when disabled. ⭐ */
      globalSendToBackModeEnabled(): boolean;
    }

    interface Draw extends LassoDraw {
      /** Array of available shapes. */
      getShapes(): SUPPORTED_SHAPES[];

      /** Returns the active shape. */
      getActiveShape(): SUPPORTED_SHAPES;

      [key: string]: DrawShape | ((...args: any[]) => any);
    }

    interface DrawShape {
      /** Applies the styles (templineStyle, hintlineStyle, pathOptions, markerStyle) to the drawing layer. map.geoman.Draw.Polyline.setStyle(options). */
      setStyle(options: L.PathOptions | L.CircleMarkerOptions): void;

      /** Set path options */
      setPathOptions(options: L.PathOptions | L.CircleMarkerOptions): void;

      /** Set options */
      setOptions(options: DrawModeOptions): void;

      /** Get options */
      getOptions(): DrawModeOptions;
    }

    interface LassoDraw {
      /** Sets the Lasso Mode to Append. ⭐ */
      setAppendMode(): void;

      /** Sets the Lasso Mode to Subtract. ⭐ */
      setSubtractMode(): void;

      /** Sets the Lasso Mode to Reset. ⭐ */
      setResetMode(): void;

      /** Sets the Lasso Select Mode to Intersect. ⭐ */
      setIntersectSelectMode(): void;

      /** Sets the Lasso Select Mode to Contain. ⭐ */
      setContainSelectMode(): void;

      /** Get current Lasso Mode. ⭐ */
      getMode(): LASSO_MODES;

      /** Get current Lasso Select Mode. ⭐ */
      getSelectMode(): LASSO_SELECT_MODES;

      /** Deselect all selected layers. ⭐ */
      cleanupSelection(): void;

      /** Get all selected layers. ⭐ */
      getSelectedLayers(): L.Layer[];
    }

    interface CutModeOptions {
      allowSelfIntersection?: boolean;

      /** Allows cutting of circles. Default: true ⭐ */
      allowCircleCut?: boolean;
    }

    interface SplitModeOptions {
      allowSelfIntersection?: boolean;

      /** If it is set to false, layers can be excluded with the option splitMark: false. Set it to true to enable splitting only for the layers with the option splitMark: true. ⭐ */
      splitOnlyMarkedLayers?: boolean;
    }

    interface LassoModeOptions {
      /** Style of the lasso layer. ⭐ */
      lassoDrawOptions?: L.PathOptions;
      /** Mode for lasso. ⭐ */
      mode?: LASSO_MODES;
      /** Select mode for lasso. ⭐ */
      selectMode?: LASSO_SELECT_MODES;
    }

    type LASSO_MODES = 'APPEND' | 'SUBTRACT' | 'RESET';

    type LASSO_SELECT_MODES = 'CONTAIN' | 'INTERSECT';

    type VertexValidationHandler = (e: {
      layer: L.Layer;
      marker: L.Marker;
      event: any;
    }) => boolean;

    interface EditModeOptions extends SnappingOptions {
      /** Allow self intersections (default:true). */
      allowSelfIntersection?: boolean;

      /** Allow self intersections (default:true). */
      allowSelfIntersectionEdit?: boolean;

      /** Disable the removal of markers via right click / vertices via removeVertexOn. (default:false). */
      preventMarkerRemoval?: boolean;

      /** If true, vertex removal that cause a layer to fall below their minimum required vertices will remove the entire layer. If false, these vertices can't be removed. Minimum vertices are 2 for Lines and 3 for Polygons (default:true). */
      removeLayerBelowMinVertexCount?: boolean;

      /** Defines which layers should dragged with this layer together. true syncs all layers in the same LayerGroup(s) or you pass an `Array` of layers to sync. (default:false). */
      syncLayersOnDrag?: L.Layer[] | boolean;

      /** Edit-Mode for the layer can disabled (`geoman.enable()`). (default:true). */
      allowEditing?: boolean;

      /** Removing can be disabled for the layer. (default:true). */
      allowRemoval?: boolean;

      /** Layer can be prevented from cutting. (default:true). */
      allowCutting?: boolean;

      /** Layer can be prevented from rotation. (default:true). */
      allowRotation?: boolean;

      /** Dragging can be disabled for the layer. (default:true). */
      draggable?: boolean;

      /** Leaflet layer event to add a vertex to a Polyline or Polygon, like dblclick. (default:click). */
      addVertexOn?:
        | 'click'
        | 'dblclick'
        | 'pointerdown'
        | 'pointerover'
        | 'pointerout'
        | 'contextmenu';

      /** A function for validation if a vertex (of a Polyline / Polygon) is allowed to add. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. (default:undefined). */
      addVertexValidation?: VertexValidationHandler;

      /** Leaflet layer event to remove a vertex from a Polyline or Polygon, like dblclick. (default:contextmenu). */
      removeVertexOn?:
        | 'click'
        | 'dblclick'
        | 'pointerdown'
        | 'pointerover'
        | 'pointerout'
        | 'contextmenu';

      /** A function for validation if a vertex (of a Polyline / Polygon) is allowed to remove. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. */
      removeVertexValidation?: VertexValidationHandler;

      /** A function for validation if a vertex / helper-marker is allowed to move / drag. It passes a object with `[layer, marker, event}`. For example to check if the layer has a certain property or if the `Ctrl` key is pressed. */
      moveVertexValidation?: VertexValidationHandler;

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

      /** Hide the middle Markers in edit mode from Polyline and Polygon. */
      hideMiddleMarkers?: boolean;

      /** The angles at which the snap guides are created. (default: [90]) ⭐ */
      snapGuidesAngles?: number[];

      /** Styles the border helpline. ⭐ */
      scaleBorderStyle?: L.PathOptions;

      /** Scale origin is the center, else it is the opposite corner. If false Alt-Key can be used. (default:true). ⭐ */
      centerScaling?: boolean;

      /** Width and height are scaled with the same ratio. If false Shift-Key can be used. (default:true). ⭐ */
      uniformScaling?: boolean;

      /** Layer can be prevented from auto tracing. (default:true). ⭐ */
      allowAutoTracing?: boolean;

      /** Add Vertices while clicking on the line of Polyline or Polygon. (default:true). ⭐ */
      addVertexOnClick?: boolean;

      /** Layer can be prevented from pinning. (default:true). ⭐ */
      allowPinning?: boolean;

      /** Styles the Snap Guides. ⭐ */
      snapGuidesStyle?: L.PathOptions;

      /** Enables the Snap guides. (default:false). ⭐ */
      showSnapGuides?: boolean;

      /** Layer can be prevented from used in Union Mode. (default:true). ⭐ */
      allowUnion?: boolean;

      /** Layer can be prevented from used in Difference Mode. (default:true). ⭐ */
      allowDifference?: boolean;

      /** Selecting via Lasso can be disabled for the layer. (default:true). ⭐ */
      lassoSelectable?: boolean;

      /** While editing the layer needs to be contained in one of the layers in the Array. ⭐ */
      requireContainment?: (L.Polygon | L.Circle | L.ImageOverlay)[];

      /** While editing the layer can't intersect with the layers in the Array. ⭐ */
      preventIntersection?: L.Layer[];

      /** Layer can be prevented from scaling. (default:true). ⭐ */
      allowScale?: boolean;
    }

    interface TextOptions {
      /** Predefined text for Text-Layer. */
      text?: string;

      /** Directly after placing the Text-Layer text editing is activated. */
      focusAfterDraw?: boolean;

      /** The text layer is removed if no text is written. */
      removeIfEmpty?: boolean;

      /** Custom CSS Classes for Text-Layer. Separated by a space. */
      className?: string;

      /** Centers the text on the positions. ⭐ */
      textMarkerCentered?: boolean;
    }

    interface DrawModeOptions extends SnappingOptions {
      /** Require the last point of a shape to be snapped. (default: false). */
      requireSnapToFinish?: boolean;

      /** Show helpful tooltips for your user (default:true). */
      tooltips?: boolean;

      /** Allow self intersections (default:true). */
      allowSelfIntersection?: boolean;

      /** Leaflet path options for the lines between drawn vertices/markers. (default:{color:'red'}). */
      templineStyle?: L.PathOptions | L.CircleMarkerOptions;

      /** Leaflet path options for the helper line between last drawn vertex and the cursor. (default:{color:'red',dashArray:[5,5]}). */
      hintlineStyle?: L.PathOptions | L.CircleMarkerOptions;

      /** Leaflet path options for the drawn layer (Only for L.Path layers). (default:null). */
      pathOptions?: L.PathOptions | L.CircleMarkerOptions;

      /** Leaflet marker options (only for drawing markers). (default:{draggable:true}). */
      markerStyle?: L.MarkerOptions;

      /** Show a marker at the cursor (default:true). */
      cursorMarker?: boolean;

      /** Leaflet layer event to finish the drawn shape (default:null). */
      finishOn?:
        | null
        | 'click'
        | 'dblclick'
        | 'pointerdown'
        | 'pointerover'
        | 'pointerout'
        | 'contextmenu'
        | 'snap';

      /** Hide the middle Markers in edit mode from Polyline and Polygon. (default:false). */
      hideMiddleMarkers?: boolean;

      /** Set the min radius of a Circle. (default:null). */
      minRadiusCircle?: number;

      /** Set the max radius of a Circle. (default:null). */
      maxRadiusCircle?: number;

      /** Set the min radius of a CircleMarker. (default:null). */
      minRadiusCircleMarker?: number;

      /** Set the max radius of a CircleMarker. (default:null). */
      maxRadiusCircleMarker?: number;

      /** Enables radius editing while drawing a Circle (default:true). */
      resizeableCircle?: boolean;

      /** Enables radius editing while drawing a CircleMarker (default:false). */
      resizeableCircleMarker?: boolean;

      /** Markers and CircleMarkers are editable during the draw-session (you can drag them around immediately after drawing them) (default:true). */
      markerEditable?: boolean;

      /** Draw-Mode stays enabled after finishing a layer to immediately draw the next layer. Defaults to true for Markers and CircleMarkers and false for all other layers. */
      continueDrawing?: boolean;

      /** Angel of rectangle. */
      rectangleAngle?: number;

      /** Cut-Mode: Only the passed layers can be cut. Cutted layers are removed from the Array until no layers are left anymore and cutting is working on all layers again. (Default: []) */
      layersToCut?: L.Layer[];

      textOptions?: TextOptions;

      /** Leaflet path options for the freehand polygon while drawing. To the resulting layer will be the pathOptions applied (default:null) ⭐ */
      freehandOptions?: L.PathOptions;

      /** Leaflet path options for the lasso polygon while drawing. The option `fill` will be always true. (default:null) ⭐ */
      lassoDrawOptions?: L.PathOptions;

      /** Style / Geojson ooptions for custom shape. ⭐ */
      customShapeGeoJSONOptions?: L.GeoJSONOptions;

      /** While drawing one of the layers in the Array need to contain the new layer. ⭐ */
      requireContainment?: (L.Polygon | L.Circle | L.ImageOverlay)[];

      /** While drawing the new layer can't intersect with one of the layers in the Array. ⭐ */
      preventIntersection?: L.Layer[];

      /** Closes the Polygon while drawing. ⭐ */
      closedPolygonEdge?: boolean;

      /** Shows the Polygon fill while drawing. ⭐ */
      closedPolygonFill?: boolean;

      /** Enables auto-tracing. Default: false ⭐ */
      autoTracing?: boolean;
    }

    interface SnappingOptions {
      /** Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
      allowSnapping?: boolean;

      /** The distance to another vertex when a snap should happen (default:20). */
      snapDistance?: number;

      /** Allow snapping in the middle of two vertices (middleMarker)(default:false). */
      snapMiddle?: boolean;

      /** Allow snapping between two vertices. (default: true)*/
      snapSegment?: boolean;

      /** Allow snapping to vertices. (default: true)*/
      snapVertex?: boolean;
    }

    type CancelActionModes = 'editMode' | 'dragMode' | 'removalMode' | 'rotateMode' | 'scaleMode' | 'lineSimplificationMode';

    /**
     * Geoman toolbar options.
     */
    interface ToolbarOptions {
      /** Toolbar position. */
      position?: L.ControlPosition;

      /** The position of each block can be customized. If not set, the value from position is taken. */
      positions?: BlockPositions;

      /** Adds button to draw Markers (default:true) */
      drawMarker?: boolean;

      /** Adds button to draw CircleMarkers (default:true) */
      drawCircleMarker?: boolean;

      /** Adds button to draw Polyline (default:true) */
      drawPolyline?: boolean;

      /** Adds button to draw Rectangle (default:true) */
      drawRectangle?: boolean;

      /** Adds button to draw Polygon (default:true) */
      drawPolygon?: boolean;

      /** Adds button to draw Text (default:true) */
      drawText?: boolean;

      /** Adds button to draw Circle (default:true) */
      drawCircle?: boolean;

      /** Adds button to toggle edit mode for all layers (default:true) */
      editMode?: boolean;

      /** Adds button to toggle drag mode for all layers (default:true) */
      dragMode?: boolean;

      /** Adds button to cut a hole in a polygon or polyline (default:true) */
      cutPolygon?: boolean;

      /** Adds a button to remove layers (default:true) */
      removalMode?: boolean;

      /** Adds a button to rotate layers (default:true) */
      rotateMode?: boolean;

      /** All buttons will be displayed as one block Customize Controls (default:false) */
      oneBlock?: boolean;

      /** Shows all draw buttons / buttons in the draw block (default:true) */
      drawControls?: boolean;

      /** Shows all edit buttons / buttons in the edit block (default:true) */
      editControls?: boolean;

      /** Shows all buttons in the custom block (default:true) */
      customControls?: boolean;

      /** Shows all options buttons / buttons in the option block ⭐ */
      optionsControls?: boolean;

      /** Adds a button to toggle the Pinning Option ⭐ */
      pinningOption?: boolean;

      /** Adds a button to toggle the Snapping Option ⭐ */
      snappingOption?: boolean;

      /** Adds button to toggle Split mode (default:true) ⭐ */
      splitMode?: boolean;

      /** Adds button to toggle Scale mode (default:true) ⭐ */
      scaleMode?: boolean;

      /** Adds button to toggle Auto Tracing Option (default:true) ⭐ */
      autoTracingOption?: boolean;

      /** Adds button to toggle Snap Guides Option (default:true) ⭐ */
      snapGuidesOption?: boolean;

      /** Adds button to toggle Spital mode (default:true) ⭐ */
      spitalMode?: boolean;

      /** Adds button to toggle Union mode (default:true) ⭐ */
      unionMode?: boolean;

      /** Adds button to toggle Difference mode (default:true) ⭐ */
      differenceMode?: boolean;

      /** Adds button to toggle Bring To modes (default:false) ⭐ */
      bringToMode?: boolean;

      /** Adds button to toggle Send to Back mode (default:false) ⭐ */
      sendToBackMode?: boolean;

      /** Adds button to toggle Bring To Front mode (default:false) ⭐ */
      bringToFrontMode?: boolean;

      /** Adds button to draw Freehand (default:false) ⭐ */
      drawFreehand?: boolean;

      /** Adds button to toggle Lasso mode (default:false) ⭐ */
      lassoMode?: boolean;

      /** Adds button to toggle CopyLayer mode (default:false) ⭐ */
      copyLayerMode?: boolean;

      /** Adds button to toggle LineSimplification mode (default:false) ⭐ */
      lineSimplificationMode?: boolean;

      /** Hide the cancel button for edit modes (default: []) ⭐ */
      hideCancelActionOf?: CancelActionModes[];

      /** Adds custom button (default:true) */
      // The type of custom buttons are always boolean but TS needs the other types defined too.
      [key: string]: L.ControlPosition | BlockPositions | boolean | undefined | CancelActionModes[];
    }

    /** the position of each block. */
    interface BlockPositions {
      /** Draw control position (default:''). '' also refers to this position. */
      draw?: L.ControlPosition;

      /** Edit control position (default:''). */
      edit?: L.ControlPosition;

      /** Custom control position (default:''). */
      custom?: L.ControlPosition;

      /** Options control position (default:'') ⭐ */
      options?: L.ControlPosition;
    }

    interface GeomanEditLayer extends GeomanEditTextLayer {
      /** Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar */
      enable(options?: EditModeOptions): void;

      /** Sets layer options */
      setOptions(options?: EditModeOptions): void;

      /** Gets layer options */
      getOptions(): EditModeOptions;

      /** Disables edit mode. */
      disable(): void;

      /** Toggles edit mode. Passed options are preserved. */
      toggleEdit(options?: EditModeOptions): void;

      /** Returns true if edit mode is enabled. false when disabled. */
      enabled(): boolean;

      /** Returns true if Polyline or Polygon has a self intersection. */
      hasSelfIntersection(): boolean;

      /** Removes the layer with the same checks as GlobalRemovalMode. */
      remove(): void;

      /** Reverts the layer to the state before changing. ⭐  */
      cancel(): void;
    }

    interface GeomanEditTextLayer {
      /** Activate text editing of Text-Layer. */
      focus(): void;

      /** Deactivate text editing of Text-Layer. */
      blur(): void;

      /** Is text editing active on Text-Layer. */
      hasFocus(): boolean;

      /** Returns the `<textarea>` DOM element of Text-Layer. */
      getElement(): HTMLElement;

      /** Set text on Text-Layer. */
      setText(text: string): void;

      /** Returns the text of Text-Layer. */
      getText(): string;
    }

    interface GeomanDragLayer {
      /** Enables dragging for the layer. */
      enableLayerDrag(): void;

      /** Disables dragging for the layer. */
      disableLayerDrag(): void;

      /** Returns if the layer is currently dragging. */
      dragging(): boolean;

      /** Returns if drag mode is enabled for the layer. */
      layerDragEnabled(): boolean;
    }

    interface GeomanMeasurementLayer {
      /** Contains the measurements of the last calculation. ⭐ */
      measurements: MeasurementData;
    }

    interface GeomanLayer
      extends GeomanRotateLayer,
        GeomanEditLayer,
        GeomanDragLayer,
        GeomanMeasurementLayer,
        GeomanScaleLayer {
      /** Get shape of the layer. */
      getShape(): SUPPORTED_SHAPES;
    }

    interface GeomanLayerGroup {
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

    interface Measurement {
      value: number;
      unit: string;
      baseValueMeter: number;
    }

    interface MeasurementData {
      distance?: Measurement;
      area?: Measurement;
      height?: Measurement;
      width?: Measurement;
      segmentdistance?: Measurement;
      radius?: Measurement;
    }

    namespace Utils {
      /**  Returns the translation of the passed path. path = json-string f.ex. tooltips.placeMarker */
      function getTranslation(path: string): string;

      /** Returns the middle LatLng between two LatLngs */
      function calcMiddleLatLng(
        map: L.Map,
        latlng1: L.LatLng,
        latlng2: L.LatLng
      ): L.LatLng;

      /** Returns all layers that are available for Geoman */
      function findLayers(map: L.Map): L.Layer[];

      /** Converts a circle into a polygon with default 60 sides. For CRS.Simple maps `withBearing` needs to be false */
      function circleToPolygon(
        circle: L.Circle,
        sides?: number,
        withBearing?: boolean
      ): L.Polygon;

      /** Converts a px-radius (CircleMarker) to meter-radius (Circle). The center LatLng is needed because the earth has different projections on different places. **/
      function pxRadiusToMeterRadius(
        radiusInPx: number,
        map: L.Map,
        center: L.LatLng
      ): number;

      function getMeasurements(
        layer: L.Layer,
        map: L.Map,
        displayFormat: DISPLAY_FORMAT
      ): MeasurementData;

      /** Moves the center of a layer to the coordinates. ⭐ */
      function moveLayerTo(layer: L.Layer, centerLatLng: L.LatLng): void;

      /** Moves the center of a layer by the delta. ⭐ */
      function moveLayerBy(layer: L.Layer, deltaLatLng: L.LatLng): void;

      /** Copies a layer and applies it options to the new layer. ⭐ */
      function copyLayer(layer: L.Layer): L.Layer;
    }

    /**
     * DRAW MODE MAP EVENT HANDLERS
     */

    export type GlobalDrawModeToggledEventHandler = (event: {
      enabled: boolean;
      shape: Geoman.SUPPORTED_SHAPES;
      map: L.Map;
    }) => void;
    export type DrawStartEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
    }) => void;
    export type DrawEndEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type CreateEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;

    /**
     * DRAW MODE LAYER EVENT HANDLERS
     */

    export type VertexAddedEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
      marker: L.Marker;
      latlng: L.LatLng;
    }) => void;
    export type SnapEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      distance: number;
      layer: L.Layer;
      workingLayer: L.Layer;
      marker: L.Marker;
      layerInteractedWith: L.Layer;
      segement: any;
      snapLatLng: L.LatLng;
    }) => void;
    export type CenterPlacedEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      workingLayer: L.Layer;
      latlng: L.LatLng;
    }) => void;

    /**
     * EDIT MODE LAYER EVENT HANDLERS
     */

    export type EditEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type UpdateEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type EnableEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type DisableEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type VertexAddedEventHandler2 = (e: {
      layer: L.Layer;
      indexPath: number;
      latlng: L.LatLng;
      marker: L.Marker;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type VertexRemovedEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      marker: L.Marker;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type VertexClickEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type VertexDragStartEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type VertexDragEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type VertexDragEndEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
      intersectionReset: boolean;
    }) => void;
    export type LayerResetEventHandler = (e: {
      layer: L.Layer;
      indexPath: number;
      markerEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type IntersectEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
      intersection: L.LatLng;
    }) => void;
    export type ChangeEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
      latlngs: L.LatLng | L.LatLng[];
    }) => void;
    export type TextChangeEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
      text: string;
    }) => void;
    export type TextFocusEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type TextBlurEventHandler = (e: {
      shape: Geoman.SUPPORTED_SHAPES;
      layer: L.Layer;
    }) => void;
    export type ContainmentViolationEventHandler = (e: {
      layer: L.Layer;
    }) => void;
    export type IntersectionViolationEventHandler = (e: {
      layer: L.Layer;
    }) => void;
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
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type DragEventHandler = (e: {
      layer: L.Layer;
      containerPoint: any;
      latlng: L.LatLng;
      layerPoint: L.Point;
      originalEvent: any;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type DragEndEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type DragEnableEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type DragDisableEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;

    /**
     * REMOVE MODE LAYER EVENT HANDLERS
     */

    export type RemoveEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
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
      enabled: boolean;
      map: L.Map;
    }) => void;
    export type CutEventHandler = (e: {
      layer: L.Layer;
      originalLayer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;

    /**
     * ROTATE MODE LAYER EVENT HANDLERS
     */
    export type RotateEnableEventHandler = (e: {
      layer: L.Layer;
      helpLayer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type RotateDisableEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
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

    /**
     * ROTATE MODE MAP EVENT HANDLERS
     */
    export type GlobalRotateModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * UNION MODE MAP EVENT HANDLERS
     */
    export type GlobalUnionModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * UNION EVENT HANDLERS
     */
    export type UnionEventHandler = (e: {
      resultLayer: L.Layer;
      mergedLayers: L.Layer[];
    }) => void;

    /**
     * DIFFERENCE MODE MAP EVENT HANDLERS
     */
    export type GlobalDifferenceModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * DIFFERENCE EVENT HANDLERS
     */
    export type DifferenceEventHandler = (e: {
      resultLayer: L.Layer;
      subtractedLayers: L.Layer[];
    }) => void;

    /**
     * SELECTION EVENT HANDLERS
     */
    export type SelectionEventHandler = (e: { layer: L.Layer }) => void;

    /**
     * SendToBack MODE MAP EVENT HANDLERS
     */
    export type GlobalSendToBackModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * BringToFront MODE MAP EVENT HANDLERS
     */
    export type GlobalBringToFrontModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * CopyLayer MODE MAP EVENT HANDLERS
     */
    export type GlobalCopyLayerModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;
    /**
     * CopyLayer EVENT HANDLERS
     */
    export type CopyLayerEventHandler = (e: {
      sourceLayer: L.Layer;
      newLayer: L.Layer;
      shape: SUPPORTED_SHAPES;
    }) => void;

    /**
     * CopyLayer MODE MAP EVENT HANDLERS
     */
    export type GlobalLineSimplificationModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * Lasso MODE MAP EVENT HANDLERS
     */
    export type GlobalLassoModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * DIFFERENCE EVENT HANDLERS
     */
    export type LassoSelectEventHandler = (e: {
      lassoCoords: L.LatLng[];
      selectionChangedLayers: L.Layer[];
      selectedLayers: L.Layer[];
    }) => void;

    /**
     * TRANSLATION EVENT HANDLERS
     */
    export type LangChangeEventHandler = (e: {
      activeLang: string;
      oldLang: string;
      fallback: string;
      translations: Geoman.Translations;
    }) => void;

    /**
     * CONTROL MAP EVENT HANDLERS
     */
    export type ButtonClickEventHandler = (e: {
      btnName: string;
      button: Geoman.Button;
    }) => void;
    export type ActionClickEventHandler = (e: {
      text: string;
      action: string;
      btnName: string;
      button: Geoman.Button;
    }) => void;

    /**
     * KEYBOARD EVENT HANDLERS
     */
    export type KeyboardKeyEventHandler = (e: {
      focusOn: 'document' | 'map';
      eventType: 'keydown' | 'keyup';
      event: any;
    }) => void;

    /**
     * GLOBAL OPTIONS CHANGED EVENT HANDLERS
     */
    export type GlobalOptionsChangedEventHandler = (e: { event: any }) => void;

    /**
     * AUTO TRACE EVENT HANDLERS
     */
    export type AutoTraceEventHandler = (e: { event: any }) => void;
    export type AutoTraceLineChangeEventHandler = (e: {
      hintLatLngs: L.LatLng[];
    }) => void;

    /**
     * Split MODE MAP EVENT HANDLERS
     */
    export type GlobalSplitModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;
    export type SplitEventHandler = (e: {
      layers: L.Layer[];
      originalLayer: L.Layer;
      splitLayer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;

    /**
     * SCALE MODE LAYER EVENT HANDLERS
     */
    export type ScaleEnableEventHandler = (e: {
      layer: L.Layer;
      helpLayer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
    }) => void;
    export type ScaleDisableEventHandler = (e: {
      layer: L.Layer;
      shape: Geoman.SUPPORTED_SHAPES;
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

    /**
     * SCALE MODE MAP EVENT HANDLERS
     */
    export type GlobalScaleModeToggledEventHandler = (e: {
      enabled: boolean;
      map: L.Map;
    }) => void;

    /**
     * CANCEL MODE MAP EVENT HANDLERS
     */
    export type GlobalCancelEventHandler = (e: { map: L.Map }) => void;

    /**
     * ERROR MAP EVENT HANDLERS
     */
    export type ErrorEventHandler = (e: { message: string, source: string, payload: any }) => void;
  }
}
