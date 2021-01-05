import * as L from 'leaflet';

declare module 'leaflet' {

    export interface GeomanLayerOptions {
        pmIgnore?: boolean;
    }

    namespace PM {
        export type SUPPORTED_SHAPES = (
            'Marker' | 'Circle' | 'Line' |
            'Rectangle' | 'Polygon' | 'Cut'
        );

        export type GEOMAN_MAP_DRAW_MODE_EVENTS = (
            'pm:drawstart' | 'pm:drawend' | 'pm:create'
        );

        export type GEOMAN_MAP_EDIT_MODE_EVENTS = (
            'pm:globaleditmodetoggled'
        );

        export type GEOMAN_MAP_DRAG_MODE_EVENTS = (
            'pm:globaldrawmodetoggled'
        );

        export type GEOMAN_MAP_REMOVAL_MODE_EVENTS = (
            'pm:globalremovalmodetoggled'
        );

        export type GEOMAN_MAP_CUT_MODE_EVENTS = (
            'pm:cut'
        );

        export type GEOMAN_LAYER_DRAW_MODE_EVENTS = (
            'pm:vertexadded' | 'pm:snapdrag' |
            'pm:snap' | 'pm:unsnap' |
            'pm:centerplaced'
        );

        export type GEOMAN_LAYER_EDIT_MODE_EVENTS = (
            'pm:edit' | 'pm:vertexadded' | 'pm:vertexremoved' |
            'pm:markerdragstart' | 'pm:markerdragend' | 'pm:snap' |
            'pm:unsnap' | 'pm:intersect' | 'pm:centerplaced'
        );

        export type GEOMAN_LAYER_DRAG_MODE_EVENTS = (
            'pm:dragstart' | 'pm:drag' | 'pm:dragend'
        );

        export type GEOMAN_LAYER_CUT_MODE_EVENTS = (
            'pm:cut'
        );

        export interface GeomanHelpers {
            getShapes(): string[];
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
            finishOn?: null | 'click' | 'dblclick' | 'mousedown' | 'mouseover' | 'mouseout' | 'contextmenu';
        }

        export class LayerDrawOptions {
            snappable?: boolean;
            snapDistance?: number;
            allowSelfIntersection?: boolean;
            preventMarkerRemoval?: boolean;
        }

        export class DrawControlOptions {
            position?: ControlPosition;
            drawMarker?: boolean;
            drawCircleMarker?: boolean;
            drawPolyline?: boolean;
            drawRectangle?: boolean;
            drawPolygon?: boolean;
            drawCircle?: boolean;
            editMode?: boolean;
            dragMode?: boolean;
            cutPolygon?: boolean;
            removalMode?: boolean;
        }

        export function initialize(options?: { optIn: boolean }): void;

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
            removeControls(): void;
            toggleControls(): void;
            controlsVisible(): boolean;
            enableDraw(shape: SUPPORTED_SHAPES, options?: MapDrawOptions): void;
            disableDraw(shape: SUPPORTED_SHAPES): void;
            enableGlobalEditMode(options : any): void;
            disableGlobalEditMode(): void;
            toggleGlobalEditMode(options : any): void;
            globalEditEnabled(): boolean;
            setLang(lang: 'en' | 'de' | 'it' | 'ru' | 'ro' | 'es' | 'fr' | 'pt_br' | 'zh' | 'nl', customTranslations?: Translations, fallbackLanguage?: string): void;
            setPathOptions(options: PathOptions): void;
            Draw: GeomanHelpers;
        }

        interface Layer {
            enable(options?: LayerDrawOptions): void;
            disable(): void;
            toggleEdit(options?: LayerDrawOptions): void;
            enabled(): boolean;
            hasSelfIntersection(): boolean;
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
