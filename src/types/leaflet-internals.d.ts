import type { IUtils } from '../js/L.PM.Utils';
import type { MatrixConstructor } from '../js/helpers/Matrix';

// Internal Leaflet fields used by the plugin. These are not shipped to consumers.
declare module 'leaflet' {
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
  interface Layer {
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
    namespace Utils {
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
