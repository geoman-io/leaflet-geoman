export {};
declare global {
  var DevPanel: Window['DevPanel'];
  var EventLogger: Window['EventLogger'];
  var GeoJSONTools: Window['GeoJSONTools'];
  var StateInspector: Window['StateInspector'];
  var LayerInspector: Window['LayerInspector'];
  interface Window {
    map: L.Map;
    devPanel: InstanceType<Window['DevPanel']>;
  }
}

export interface PanelModule {
  name: string;
  title: string;
  init(
    map: L.Map,
    container: HTMLElement,
    panel: InstanceType<Window['DevPanel']>
  ): void;
  destroy?(): void;
}
export interface PanelOptions {
  position: string;
  width: number;
  collapsed: boolean;
  persistState: boolean;
  storageKey: string;
}
export type InspectableLayer = L.Layer & {
  pm?: L.Marker['pm'];
  toGeoJSON?: () =>
    | GeoJSON.Feature
    | GeoJSON.FeatureCollection
    | GeoJSON.Geometry;
  getBounds?: () => L.LatLngBounds;
  getLatLng?: () => L.LatLng;
  getLatLngs?: () => L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  setStyle?: (style: L.PathOptions) => L.Layer;
  options: L.PathOptions;
};
export interface LogEvent {
  type: string;
  time: number;
  timeStr: string;
  data: Record<string, unknown>;
}

declare module 'leaflet' {
  namespace PM {
    interface Draw {
      PolygonCopy: DrawShape;
      RectangleCopy: DrawShape;
    }
    interface DrawModeOptions {
      finishOnDoubleClick?: boolean;
    }
    interface PMMap {
      globalOptions: import('../src/js/L.PM.Map').GlobalOptions;
      _getContainingLayer(): LayerGroup | Map;
    }
  }
}
