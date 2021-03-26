import * as L from 'leaflet';

declare module 'leaflet' {

    export interface GeomanLayerOptions {
        pmIgnore?: boolean;
    }

    namespace PM {

        export type SUPPORTED_SHAPES =
            | 'Marker'
            | 'Circle'
            | 'Line'
            | 'Rectangle'
            | 'Polygon'
            | 'Cut'
            | 'CircleMarker';

        export type GEOMAN_MAP_DRAW_MODE_EVENTS =
            | 'pm:drawstart'
            | 'pm:drawend'
            | 'pm:create';

        export type GEOMAN_MAP_EDIT_MODE_EVENTS = 'pm:globaleditmodetoggled';

        export type GEOMAN_MAP_DRAG_MODE_EVENTS = 'pm:globaldragmodetoggled';

        export type GEOMAN_MAP_REMOVAL_MODE_EVENTS = 'pm:globalremovalmodetoggled' | 'pm:remove' | 'layerremove';

        export type GEOMAN_MAP_CUT_MODE_EVENTS = 'pm:cut' | 'pm:globalcutmodetoggled';

        export type GEOMAN_LAYER_DRAW_MODE_EVENTS =
            | 'pm:vertexadded'
            | 'pm:snapdrag'
            | 'pm:snap'
            | 'pm:unsnap'
            | 'pm:centerplaced';

        export type GEOMAN_LAYER_EDIT_MODE_EVENTS =
            | 'pm:edit'
            | 'pm:update'
            | 'pm:enable'
            | 'pm:disable'
            | 'pm:vertexadded'
            | 'pm:vertexremoved'
            | 'pm:vertexclick'
            | 'pm:markerdragstart'
            | 'pm:markerdrag'
            | 'pm:markerdragend'
            | 'pm:layerrest'
            | 'pm:snapdrag'
            | 'pm:snap'
            | 'pm:unsnap'
            | 'pm:intersect'
            | 'pm:centerplaced';

        export type GEOMAN_LAYER_DRAG_MODE_EVENTS =
            | 'pm:dragstart'
            | 'pm:drag'
            | 'pm:dragend';

        export type GEOMAN_LAYER_CUT_MODE_EVENTS = 'pm:cut' | 'pm:edit';

        export interface GeomanHelpers {
            getShapes(): string[];
            getActiveShape(): string;
        }

        export class MapDrawOptions {
            snappable?: boolean;
            snapDistance?: number;
            snapMiddle?: boolean;
            tooltips?: boolean;
            allowSelfIntersection?: true;
            templineStyle?: L.PathOptions;
            hintlineStyle?: L.PathOptions;
            cursorMarker?: boolean;
            finishOn?:
                | null
                | 'click'
                | 'dblclick'
                | 'mousedown'
                | 'mouseover'
                | 'mouseout'
                | 'contextmenu';
            hideMiddleMarkers?: boolean;
            minRadiusCircle?: number;
            maxRadiusCircle?: number;
            minRadiusCircleMarker?: number;
            maxRadiusCircleMarker?: number;
            editable?: boolean;
            markerEditable?: boolean;
            continueDrawing?: boolean;
            layerGroup?: L.Map | L.LayerGroup
        }

        export class LayerDrawOptions {
            snappable?: boolean;
            snapDistance?: number;
            allowSelfIntersection?: boolean;
            allowSelfIntersectionEdit?: boolean;
            preventMarkerRemoval?: boolean;
            removeLayerBelowMinVertexCount?: boolean;
            limitMarkersToCount?: number;
            limitMarkersToZoom?: number;
            limitMarkersToViewport?: boolean;
            limitMarkersToClick?: boolean;
            pinning?: boolean;
        }

        export interface BlockPositions {
            draw?: ControlPosition;
            edit?: ControlPosition;
            custom?: ControlPosition;
            options?: ControlPosition;
        }

        export class DrawControlOptions {
            position?: ControlPosition;
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
            /** shows all options buttons / buttons in the option block ⭐ (default:true) */
            optionsControls?: boolean;
            /** adds a button to toggle the Pinning Option ⭐ (default:true) */
            pinningOption?: boolean;
            /** adds a button to toggle the Snapping Option ⭐ (default:true) */
            snappingOption?: boolean;
        }

        export class CustomControlOptions {
            /** Name of the control */
            name: string;
            /** block of the control. draw, edit, custom, options⭐  */
            block?: string;
            /** Text showing when you hover the control */
            title?: string;
            /** CSS class with the Icon */
            className?: string;
            /** Function fired when clicking the control */
            onClick?: (e: any) => void;
            /** Function fired after clicking the control */
            afterClick?: (e: any) => void;
            /** Action that appears as tooltip. Look under Actions for more information */
            actions?: (Action | string)[];
            /** Control can be toggled (default:true) */
            toggle?: boolean;
            /** Control is disabled (default:false) */
            disabled?: boolean;
        }

        export class GlobalOptions {
            /** add the created layers to a layergroup instead to the map. */
            layerGroup?: L.Layer;
        }

        export class Action {
            text: string;
            onClick: (e: any) => void;
        }

        export function initialize(options?: { optIn: boolean }): void;

        export function setOptIn(optIn: boolean): void;

        export function reInitLayer(): void;

        export class Translations {
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

        interface Map {
            addControls(options?: DrawControlOptions): void;
            enableDraw(shape: SUPPORTED_SHAPES, options?: MapDrawOptions): void;
            disableDraw(shape: SUPPORTED_SHAPES): void;
            /** Returns true if global Draw Mode is enabled. false when disabled. */
            globalDrawModeEnabled(): boolean
            /** Customize the style of the drawn layer. Only for L.Path layers. Shapes can be excluded with a ignoreShapes array in optionsModifier */
            setPathOptions(options: PathOptions): void
            /** Set globalOptions and apply them. */
            setGlobalOptions(options: GlobalOptions): void
            /** Apply the current globalOptions to all existing layers. */
            applyGlobalOptions(): void
            /** Returns the globalOptions. */
            getGlobalOptions(): Object;
            /** Returns all Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
            getGeomanLayers(featureGroup?: boolean): L.FeatureGroup | L.Layer[];
            /** Returns all drawn Geoman layers on the map as array. Pass true to get a L.FeatureGroup. */
            getGeomanDrawLayers(featureGroup?: boolean): L.FeatureGroup | L.Layer

            // Edit Mode
            enableGlobalEditMode(options): void;
            disableGlobalEditMode(): void;
            toggleGlobalEditMode(options): void;
            globalEditEnabled(): boolean;

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

            addControls(options?: DrawControlOptions): void;
            removeControls(): void;

            controlsVisible(): boolean;
            globalCutModeEnabled(): boolean;
            enableGlobalCutMode(options: DrawControlOptions): void;
            toggleGlobalCutMode(options: DrawControlOptions): void;
            disableGlobalCutMode(): void;
            globalEditModeEnabled(): boolean;
            enableGlobalDragMode(): void;
            disableGlobalDragMode(): void;
            globalDragModeEnabled(): boolean;
            toggleGlobalDragMode(): void;
            enableGlobalRemovalMode(): void;
            disableGlobalRemovalMode(): void;
            globalRemovalModeEnabled(): boolean;
            toggleGlobalRemovalMode(): void;

            Draw: GeomanHelpers;
            Toolbar: Toolbar;
        }

        interface Layer {
            enable(options?: LayerDrawOptions): void;
            disable(): void;
            toggleEdit(options?: LayerDrawOptions): void;
            enabled(): boolean;
            hasSelfIntersection(): boolean;
        }

        interface Toolbar {
            changeControlOrder(order: string[]): void;
            getControlOrder(): string[];
            setBlockPosition(block: 'draw' | 'edit' | 'custom' | 'options', position: ControlPosition): void;
            getBlockPositions(): BlockPositions;
            createCustomControl(options: CustomControlOptions): void;
        }

        export namespace Utils {
            export function findLayers(layer: L.Layer): L.Layer[];
        }
    }

    interface Map {
        pm: PM.Map;
    }

    interface Layer {
        pm: PM.Layer
    }

    interface LayerOptions {
        pmIgnore?: boolean
    }

    interface MapOptions {
        pmIgnore?: boolean;
    }
}