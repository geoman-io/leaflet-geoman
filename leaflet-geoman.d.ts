import * as L from 'leaflet';

// redeclare module, maintains compatibility with @types/leaflet
declare module 'leaflet' {

    /** Extends built in leaflet layer options. */
    interface LayerOptions {
        pmIgnore?: boolean;
        snapIgnore?: boolean;
    }

    interface MapOptions {
        pmIgnore?: boolean;
    }

    /**
     * Extends built in leaflet map.
     */
    interface Map {
        pm: PM.PMMap;
    }

    /**
     * Extends built in leaflet layer.
     */
    interface Layer {
        pm: PM.PMLayer;
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
        * TODO: DRAW MODE EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Fired when Drawing Mode is toggled. */
        on(type: 'pm:globaldrawmodetoggled', fn: (event: { enabled: boolean, shape: PM.SUPPORTED_SHAPE_TYPES, map: L.Map }) => void, context?: any): L.Evented;

        /** Called when drawing mode is enabled. Payload includes the shape type and working layer. */
        on(type: 'pm:drawstart', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, workingLayer: L.Layer }) => void, context?: any): L.Evented;

        /** Called when drawing mode is disabled. Payload includes the shape type. */
        on(type: 'pm:drawend', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES }) => void, context?: any): L.Evented;

        /** Called when drawing mode is disabled. Payload includes the shape type. */
        on(type: 'pm:create', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, layer: L.Layer }) => void, context?: any): L.Evented;


        /****************************************** 
         * 
         * TODO: DRAW MODE EVENTS ON LAYER ONLY
         *
         ********************************************/

        /** Called when a new vertex is added. */
        on(type: 'pm:vertexadded', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, workingLayer: L.Layer, marker: L.Marker, latLng: L.LatLng }) => void): this;

        /** Fired during a marker move/drag. */
        on(type: 'pm:snapdrag', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Fired when a vertex is snapped. */
        on(type: 'pm:snap', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Fired when a vertex is unsnapped. */
        on(type: 'pm:unsnap', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Called when the center of a circle is placed/moved. */
        on(type: 'pm:centerplaced', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, workingLayer: L.Layer, marker: L.Marker, latLng: L.LatLng }) => void): this;

        /****************************************** 
        * 
        * TODO: EDIT MODE EVENTS ON LAYER ONLY
        *
        ********************************************/

        /** Fired when a layer is edited. */
        on(type: 'pm:edit', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, layer: L.Layer }) => void): this;

        /** Fired when edit mode is disabled and a layer is edited and its coordinates have changed. */
        on(type: 'pm:update', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, layer: L.Layer }) => void): this;

        /** Fired when edit mode on a layer is enabled. */
        on(type: 'pm:enable', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, layer: L.Layer }) => void): this;

        /** Fired when edit mode on a layer is disabled. */
        on(type: 'pm:disable', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, layer: L.Layer }) => void): this;

        /** Fired when a vertex is added. */
        on(type: 'pm:vertexadded', fn: (e: { layer: L.Layer, indexPath: number, latLng: L.LatLng, marker: L.Marker, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /** Fired when a vertex is removed. */
        on(type: 'pm:vertexremoved', fn: (e: { layer: L.Layer, indexPath: number, marker: L.Marker, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /** Fired when a vertex is clicked. */
        on(type: 'pm:vertexclick', fn: (e: { layer: L.Layer, indexPath: number, markerEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this; // todo: no any

        /** Fired when dragging of a marker which corresponds to a vertex starts. */
        on(type: 'pm:markerdragstart', fn: (e: { layer: L.Layer, indexPath: number, markerEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this; // todo: no any

        /** Fired when dragging a vertex-marker. */
        on(type: 'pm:markerdrag', fn: (e: { layer: L.Layer, indexPath: number, markerEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this; // todo: no any

        /** Fired when dragging of a vertex-marker ends. */
        on(type: 'pm:markerdragend', fn: (e: { layer: L.Layer, indexPath: number, markerEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES, intersectionRest: any }) => void): this; // todo: no any

        /** Fired when coords of a layer are reset. E.g. by self-intersection.. */
        on(type: 'pm:layerreset	', fn: (e: { layer: L.Layer, indexPath: number, markerEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this; // todo: no any

        /** Fired during a marker move/drag. */
        on(type: 'pm:snapdrag', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Fired when a vertex is snapped. */
        on(type: 'pm:snap', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Fired when a vertex is unsnapped. */
        on(type: 'pm:unsnap', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, distance: number, layer: L.Layer, workingLayer: L.Layer, marker: L.Marker, layerInteractedWith: L.Layer, segement: any, snapLatLng: L.LatLng }) => void): this;

        /** Called when the center of a circle is placed/moved. */
        on(type: 'pm:centerplaced', fn: (e: { shape: PM.SUPPORTED_SHAPE_TYPES, workingLayer: L.Layer, marker: L.Marker, latLng: L.LatLng }) => void): this;

        /****************************************** 
        * 
        * TODO: EDIT MODE EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Fired when Edit Mode is toggled. */
        on(type: 'pm:globaleditmodetoggled', fn: (e: { enabled: boolean, map: L.Map }) => void): this;

        /****************************************** 
        * 
        * TODO: DRAG MODE EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Fired when Drag Mode is toggled. */
        on(type: 'pm:globaldragmodetoggled', fn: (e: { enabled: boolean, map: L.Map }) => void): this;

        /****************************************** 
        * 
        * TODO: DRAG MODE EVENTS ON LAYER ONLY
        *
        ********************************************/

        /** Fired when a layer starts being dragged. */
        on(type: 'pm:dragstart', fn: (e: { layer: L.Layer, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /** Fired when a layer is dragged. */
        on(type: 'pm:drag', fn: (e: { layer: L.Layer, containerPoint: any, latLng: L.LatLng, layerPoint: L.Point, originalEvent: any, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this; // todo: any

        /** Fired when a layer stops being dragged. */
        on(type: 'pm:dragend', fn: (e: { layer: L.Layer, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /****************************************** 
        * 
        * TODO: REMOVE MODE EVENTS ON LAYER ONLY
        *
        ********************************************/

        /** Fired when a layer is removed via Removal Mode. */
        on(type: 'pm:remove', fn: (e: { layer: L.Layer, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /****************************************** 
        * 
        * TODO: REMOVE MODE EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Fired when Removal Mode is toggled. */
        on(type: 'pm:globalremovalmodetoggled', fn: (e: { enabled: boolean, map: L.Map }) => void): this;

        /** Fired when a layer is removed via Removal Mode. */
        on(type: 'pm:remove', fn: (e: { layer: L.Layer, shape: PM.SUPPORTED_SHAPE_TYPES }) => void): this;

        /** Standard Leaflet event. Fired when any layer is removed. */
        on(type: 'layerremove', fn: (e: { layer: L.Layer }) => void): this;

        /****************************************** 
        * 
        * TODO: TRANSLATION EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Standard Leaflet event. Fired when any layer is removed. */
        on(type: 'pm:langchange', fn: (e: { activeLang: string, oldLang: string, fallback: string, translations: PM.Translations }) => void): this;

        /****************************************** 
        * 
        * TODO: CONTROL EVENTS ON MAP ONLY
        *
        ********************************************/

        /** Fired when a Toolbar button is clicked. */
        on(type: 'pm:buttonclick', fn: (e: { btnName: string, button: HTMLElement }) => void): this; // todo: is this an HTMLElement

        /** Fired when a Toolbar action is clicked. */
        on(type: 'pm:actionclick', fn: (e: { text: string; action: string; btnName: string; button: HTMLElement }) => void): this; // todo: is this an HTMLElement
    }

    namespace PM {
        /** supported shape types. */
        type SUPPORTED_SHAPES =
            | 'Marker'
            | 'Circle'
            | 'Line'
            | 'Rectangle'
            | 'Polygon'
            | 'Cut'
            | 'CircleMarker';

        type SUPPORTED_SHAPE_TYPES =
            | L.Marker
            | L.Circle
            | L.Polyline
            | L.Rectangle
            | L.Polygon
            | L.CircleMarker;


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
        interface PMMap extends PMDrawMap, PMEditMap, PMDrawMap, PMRemoveMap, PMCutMap {

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
            onClick: (e: any) => void;
        }

        interface PMMapToolbar {
            /** Pass an array of button names to reorder the buttons in the Toolbar. */
            changeControlOrder(order: 'drawCircle' | 'drawRectangle' | 'removalMode' | 'editMode'[]): void;

            /** Receive the current order with. */
            getControlOrder(): 'drawCircle' | 'drawRectangle' | 'removalMode' | 'editMode'[];

            /** The position of a block (draw, edit, custom, options⭐) in the Toolbar can be changed. If not set, the value from position of the Toolbar is taken. */
            setBlockPosition(block: 'draw' | 'edit' | 'custom' | 'options', position: ControlPosition): void;

            /** Returns a Object with the positions for all blocks */
            getBlockPositions(): BlockPositions;

            /** To add a custom Control to the Toolbar */
            createCustomControl(options: CustomControlOptions): void;

            /** Creates a copy of a draw Control. Returns the drawInstance and the control. */
            copyDrawControl(instance: object, options?: CustomControlOptions): void;

            /** Change the actions of an existing button. */
            changeActionsOfControl(name: string, actions: (ACTION_NAMES | Action)[]): void;
        }

        interface CustomControlOptions {
            /** Name of the control */
            name: string;

            /** block of the control. */
            block?: 'draw' | 'edit' | 'custom';

            /** Text showing when you hover the control. */
            title?: string;

            /** CSS class with the Icon. */
            className?: string;

            /** Function fired when clicking the control. */
            onClick?: () => void;

            /** Function fired after clicking the control. */
            afterClick?: () => void;

            actions?: (ACTION_NAMES | Action)[];

            /** Control can be toggled. */
            toggle?: boolean;

            /** Control is disabled. */
            disabled?: boolean;
        }

        interface PMDrawMap {
            /** Enable Draw Mode with the passed shape. */
            enableDraw(shape: SUPPORTED_SHAPES, options?: DrawModeOptions): void;

            /** disable all drawing */
            disableDraw(): void;

            /** Draw */
            Draw: Draw;

            /** Returns true if global Draw Mode is enabled. false when disabled. */
            globalDrawModeEnabled(): boolean;

            /** Customize the style of the drawn layer. Only for L.Path layers. Shapes can be excluded with a ignoreShapes array in optionsModifier. */
            setPathOptions(options: L.PathOptions, optionsModifier: { ignoreShapes: SUPPORTED_SHAPES[] }): void; // todo: remove any

            /** Set globalOptions and apply them. */
            setGlobalOptions(options: DrawModeOptions): void;

            /** Apply the current globalOptions to all existing layers. */
            applyGlobalOptions(): void;

            /** Returns the globalOptions. */
            getGlobalOptions(): DrawModeOptions;

            /** Returns all Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
            getGeomanLayers(asFeatureGroup: boolean): L.FeatureGroup | L.Layer[];

            /** Returns all drawn Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
            getGeomanDrawLayers(): L.FeatureGroup | L.Layer[];
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
            enableGlobalDragMode(options?: EditModeOptions): void;

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

        interface Draw {
            /** Array of available shapes. */
            getShapes(): SUPPORTED_SHAPES[];

            /** Returns the active shape. */
            getActiveShape(): SUPPORTED_SHAPES;
        }

        interface CutModeOptions {
            allowSelfIntersection?: boolean;
        }

        interface EditModeOptions {
            /** Enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
            snappable?: boolean;

            /** the distance to another vertex when a snap should happen (default:20). */
            snapDistance?: number;

            /** allow self intersections (default:true). */
            allowSelfIntersection?: boolean;

            /** allow self intersections (default:true). */
            allowSelfIntersectionEdit?: boolean;

            /** Disable the removal of markers/vertexes via right click. (default:false). */
            preventMarkerRemoval?: boolean;

            /** If true, vertex removal that cause a layer to fall below their minimum required vertices will remove the entire layer. If false, these vertices can't be removed. Minimum vertices are 2 for Lines and 3 for Polygons (default:true). */
            removeLayerBelowMinVertexCount?: boolean;

            /** Shows only n markers closest to the cursor. Use -1 for no limit (default:-1). */
            limitMarkersToCount?: number;

            limitMarkersToZoom?: number;
            limitMarkersToViewport?: boolean;
            limitMarkersToClick?: boolean;
            pinning?: boolean;
        }

        interface DrawModeOptions {
            /** enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key (default:true). */
            snappable?: boolean;

            /** the distance to another vertex when a snap should happen (default:20). */
            snapDistance?: number;

            /** allow snapping in the middle of two vertices (middleMarker)(default:false). */
            snapMiddle?: boolean;

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
            | 'contextmenu';

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

            /** add the created layers to a layergroup instead to the map. */
            layerGroup?: L.Map | L.LayerGroup;
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

            /** all buttons will be displayed as one block Customize Controls (default:false) */
            oneBlock?: boolean;

            /** shows all draw buttons / buttons in the draw block (default:true) */
            drawControls?: boolean;

            /** shows all edit buttons / buttons in the edit block (default:true) */
            editControls?: boolean;

            /** shows all buttons in the custom block (default:true) */
            customControls?: boolean;
        }

        /** the position of each block. */
        interface BlockPositions {
            /** draw control position (default:''). */
            draw?: ControlPosition;

            /** edit control position (default:''). */
            edit?: ControlPosition;

            /** custom control position (default:''). */
            custom?: ControlPosition; // todo: i dont think this is right. custom are named
        }


        interface PMLayer {
            /** Enables edit mode. The passed options are preserved, even when the mode is enabled via the Toolbar */
            enable(options?: EditModeOptions): void;

            /** Disables edit mode. */
            disable(): void;

            /** Toggles edit mode. Passed options are preserved. */
            toggleEdit(options?: EditModeOptions): void;

            /** Returns true if edit mode is enabled. false when disabled. */
            enabled(): boolean;

            /** Returns true if Line or Polygon has a self intersection. */
            hasSelfIntersection(): boolean; // todo: only on line or Polygon?
        }

    }
}

