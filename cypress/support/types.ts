import type DrawClass from '../../src/js/Draw/L.PM.Draw';
import type Toolbar from '../../src/js/Toolbar/L.PM.Toolbar';
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
      growFinger(type: string, options?: { pointerType?: string }): Finger;
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
      hasRotateHandles(count: number): Chainable<void>;
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
  interface PathOptions {
    borderColor?: string;
  }
  interface Layer {
    _valid?: boolean;
  }
}

declare module '../../leaflet-geoman' {
  namespace PM {
    interface Draw {
      PolygonCopy: DrawShape & DrawClass['Polygon'];
      Circle: DrawShape & DrawClass['Circle'] & { _snapList?: Leaflet.Layer[] };
      CircleMarker: DrawShape &
        DrawClass['CircleMarker'] & { _snapList?: Leaflet.Layer[] };
      Rectangle: DrawShape &
        DrawClass['Rectangle'] & { _snapList?: Leaflet.Layer[] };
      Marker: DrawShape & DrawClass['Marker'] & { _snapList?: Leaflet.Layer[] };
      Line: DrawShape & DrawClass['Line'] & { _snapList?: Leaflet.Layer[] };
      Polygon: DrawShape &
        DrawClass['Polygon'] & { _snapList?: Leaflet.Layer[] };
      Cut: DrawShape & DrawClass['Cut'] & { _snapList?: Leaflet.Layer[] };
      Text: DrawShape & DrawClass['Text'] & { _snapList?: Leaflet.Layer[] };
    }
    interface PMMap {
      setLang(lang: string, override?: object, fallback?: string): void;
    }
    interface PMMapToolbar {
      buttons: Toolbar['buttons'];
    }
    interface PMLayerGroup {
      _layers: Leaflet.Layer[];
    }
    interface PMLayer {
      _rotatePoly: Leaflet.Polygon;
      _rotateHandle: Leaflet.Marker;
      _layerEdited: boolean;
      _resizeCircle(): void;
      _shape: string;
      _dragMixinOnMouseDown(event: SyntheticDragEvent): void;
      _dragMixinOnMouseMove(event: SyntheticDragEvent): void;
      _dragMixinOnMouseUp(event: SyntheticDragEvent): void;
      _map: Leaflet.Map;
      _markers: Leaflet.Marker[][] | Leaflet.Marker[];
      _simulateMouseDownEvent(event: {
        target: Leaflet.Layer;
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
