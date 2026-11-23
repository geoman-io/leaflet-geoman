import type * as L from 'leaflet';

// Internal Leaflet fields used by the plugin. Only consumers of ./unstable,
// which loads this file, see them.
declare module 'leaflet' {
  interface Polyline {
    _defaultShape(): L.LatLng[];
  }
  interface MarkerOptions {
    _textMarkerOverPM?: boolean;
  }
  interface Marker {
    _origLatLng?: L.LatLng;
    _index?: number;
    _latlng: L.LatLng;
    update(): this;
  }
  interface Path {
    _renderer: L.Renderer;
  }
  interface ImageOverlay {
    setBounds(bounds: L.LatLngBoundsExpression | L.LatLngExpression[]): this;
  }
  interface Layer {
    _drawnByGeoman?: boolean;
    _leaflet_id?: number;
    _pmTempLayer?: boolean;
  }
  interface Point {
    _add(point: L.Point): this;
    _divideBy(value: number): this;
  }
}

// Internal members of the published Leaflet-Geoman types
declare module '../../leaflet-geoman' {
  namespace PM {
    interface PMMap {
      removeLayer(event: { target: L.Layer }): void;
      _modes: import('../js/helpers/ModeManager').default;
      _registerDrawMode(shape: string): void;
    }
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
    // nested groups pass the ids of the groups already visited
    interface PMLayerGroup {
      enable(
        options: PM.EditModeOptions | undefined,
        _layerIds: number[]
      ): void;
      disable(_layerIds: number[]): void;
      enabled(_layerIds: number[]): boolean;
      toggleEdit(
        options: PM.EditModeOptions | undefined,
        _layerIds: number[]
      ): void;
      setOptions(
        options: PM.EditModeOptions | undefined,
        _layerIds: number[]
      ): void;
    }
  }
}
