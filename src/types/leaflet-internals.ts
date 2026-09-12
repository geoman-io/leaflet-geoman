import type { DrawClass } from '../js/Draw/L.PM.Draw';
import type { EditClass } from '../js/Edit/L.PM.Edit';
import type { IUtils } from '../js/L.PM.Utils';
import type { MatrixConstructor } from '../js/helpers/Matrix';

// Internal Leaflet fields used by the plugin. These are not shipped to consumers.
declare module 'leaflet' {
  interface Polyline {
    _defaultShape(): L.LatLng[];
  }
  interface MarkerOptions {
    _textMarkerOverPM?: boolean;
  }
  interface Marker {
    _origLatLng?: LatLng;
    _index?: number;
    update(): this;
  }

  interface CRS {
    projection?: Projection & { MAX_LATITUDE?: number };
  }
  interface Map {
    _getPaneRenderer(pane?: string): Renderer | undefined;
    _renderer: Renderer;
  }
  interface Path {
    _renderer: Renderer;
  }
  interface Marker {
    _latlng: LatLng;
  }
  interface Map {
    mouseEventToContainerPoint(event: MouseEvent | Touch | TouchEvent): Point;
  }
  namespace Util {
    function isArray(value: unknown): value is unknown[];
    function throttle<A extends unknown[], R>(
      fn: (...args: A) => R,
      time: number,
      context: unknown
    ): (...args: A) => R;
  }
  interface ImageOverlay {
    setBounds(bounds: LatLngBoundsExpression | LatLngExpression[]): this;
  }
  interface Layer {
    _leaflet_id?: number;
    _pmTempLayer?: boolean;
    removeFrom(map: Map | LayerGroup): this;
  }
  namespace DomEvent {
    function on<E extends Event>(
      target: HTMLElement | Document | Window,
      types: string,
      handler: (event: E) => void,
      context?: unknown
    ): typeof DomEvent;
    function off<E extends Event>(
      target: HTMLElement | Document | Window,
      types: string,
      handler: (event: E) => void,
      context?: unknown
    ): typeof DomEvent;
  }
  interface Point {
    _add(point: Point): this;
    _divideBy(value: number): this;
  }
  namespace PM {
    let optIn: boolean;
    const Edit: EditClass;
    interface PMMap {
      removeLayer(event: { target: L.Layer }): void;
    }
    const Draw: DrawClass;

    interface PMLayer {
      options: PM.EditModeOptions;
      _fireEdit(): void;
      _updateHiddenPolyCircle(): void;
      _setAngle(angle: number): void;
      _initTextMarker(): void;
      textArea: HTMLTextAreaElement;
      _createTextMarker(focus: boolean): void;
      _hiddenPolyCircle?: L.Polygon;
    }
    namespace Utils {
      function disablePopup(layer: L.Layer): void;
      function enablePopup(layer: L.Layer): void;
      function _fireEvent(
        ...args: Parameters<IUtils['_fireEvent']>
      ): ReturnType<IUtils['_fireEvent']>;
      function getAllParentGroups(
        ...args: Parameters<IUtils['getAllParentGroups']>
      ): ReturnType<IUtils['getAllParentGroups']>;
      function findDeepCoordIndex(
        ...args: Parameters<IUtils['findDeepCoordIndex']>
      ): ReturnType<IUtils['findDeepCoordIndex']>;
      function findDeepMarkerIndex(
        ...args: Parameters<IUtils['findDeepMarkerIndex']>
      ): ReturnType<IUtils['findDeepMarkerIndex']>;
      function _getIndexFromSegment(
        ...args: Parameters<IUtils['_getIndexFromSegment']>
      ): ReturnType<IUtils['_getIndexFromSegment']>;
      function _getRotatedRectangle(
        ...args: Parameters<IUtils['_getRotatedRectangle']>
      ): ReturnType<IUtils['_getRotatedRectangle']>;
      function pxRadiusToMeterRadius(
        ...args: Parameters<IUtils['pxRadiusToMeterRadius']>
      ): ReturnType<IUtils['pxRadiusToMeterRadius']>;
    }

    let activeLang: string;
    const Matrix: MatrixConstructor;
  }
}
