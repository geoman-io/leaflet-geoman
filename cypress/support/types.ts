import type { DrawInstances } from '../../src/js/Draw/L.PM.Draw';
import type { IToolbar } from '../../src/js/Toolbar/L.PM.Toolbar';
import type * as Leaflet from 'leaflet';

declare global {
  interface Finger {
    wait(ms: number): this;
    moveTo(x: number, y: number, duration?: number): this;
    down(): this;
    up(): this;
  }
  interface Document {
    _leaflet_events: Record<string, unknown>;
  }
  interface Window {
    L: typeof Leaflet;
    _leaflet_events: Record<string, unknown>;
    Hand: new (options: { timing: string; onStop(): void }) => {
      growFinger(type: string): Finger;
    };
    map: Leaflet.Map;
    ONE_BLOCK_CONTROL_COUNT: number;
    TOP_RIGHT_BLOCK_CONTROL_COUNT: number;
    TOP_LEFT_BLOCK_CONTROL_COUNT: number;
  }
  namespace Cypress {
    interface Chainable {
      get<E extends Element>(element: E | JQuery<E>): Chainable<JQuery<E>>;
      timeout(milliseconds: number): Chainable<void>;
      hasCircleLayers(count: number): Chainable<void>;
      hasLayers(count: number): Chainable<void>;
      hasDrawnLayers(count: number): Chainable<void>;
      testLayerAdditionPerformance(): Chainable<void>;
      hasMiddleMarkers(count: number): Chainable<void>;
      hasVertexMarkers(count: number): Chainable<void>;
      hasTotalVertexMarkers(count: number): Chainable<void>;
      toolbarButton(name: string): Chainable<JQuery<HTMLElement>>;
      toolbarButtonContainer(
        name: string,
        map: Leaflet.Map
      ): Chainable<JQuery<HTMLElement>>;
      drawShape(
        shape: 'MultiPolygon',
        ignore?: boolean
      ): Chainable<Leaflet.GeoJSON>;
      drawShape(shape: string, ignore?: boolean): Chainable<void>;
    }
  }
}

declare module 'leaflet' {
  interface Map {
    _layers: Record<string, Layer>;
    _panes: Record<string, HTMLElement>;
  }
  interface Marker {
    _icon: HTMLElement;
  }
  interface Path {
    _path: SVGPathElement;
  }
  namespace DomUtil {
    function hasClass(element: Element, name: string): boolean;
  }
  interface ImageOverlay {
    _image: HTMLImageElement;
  }
  interface PathOptions {
    borderColor?: string;
  }
  interface Layer {
    _valid?: boolean;
  }
  namespace PM {
    interface Draw {
      PolygonCopy: DrawShape & DrawInstances['Polygon'];
      Circle: DrawShape & DrawInstances['Circle'] & { _snapList?: Layer[] };
      CircleMarker: DrawShape &
        DrawInstances['CircleMarker'] & { _snapList?: Layer[] };
      Rectangle: DrawShape &
        DrawInstances['Rectangle'] & { _snapList?: Layer[] };
      Marker: DrawShape & DrawInstances['Marker'] & { _snapList?: Layer[] };
      Line: DrawShape & DrawInstances['Line'] & { _snapList?: Layer[] };
      Polygon: DrawShape & DrawInstances['Polygon'] & { _snapList?: Layer[] };
      Cut: DrawShape & DrawInstances['Cut'] & { _snapList?: Layer[] };
      Text: DrawShape & DrawInstances['Text'] & { _snapList?: Layer[] };
    }
    interface PMMap {
      setLang(lang: string, override?: object, fallback?: string): void;
    }
    interface PMMapToolbar {
      buttons: IToolbar['buttons'];
    }
    interface PMLayerGroup {
      _layers: Layer[];
    }
    interface PMLayer {
      _rotatePoly: Polygon;
      _safeToCacheDragState?: boolean;
      _layerEdited: boolean;
      _resizeCircle(): void;
      _shape: string;
      _dragMixinOnMouseDown(event: SyntheticDragEvent): void;
      _dragMixinOnMouseMove(event: SyntheticDragEvent): void;
      _dragMixinOnMouseUp(event: SyntheticDragEvent): void;
      _map: Map;
      _markers: Marker[][] | Marker[];
      _simulateMouseDownEvent(event: {
        target: Layer;
        originalEvent: { clientX: number; clientY: number; button?: number };
      }): void;
      getElement(): HTMLTextAreaElement;
    }
  }
}

interface SyntheticDragEvent {
  originalEvent: { button: number };
  target: Leaflet.Layer;
  latlng: Leaflet.LatLng;
}
