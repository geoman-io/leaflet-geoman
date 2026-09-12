/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
  doubleClickZoom: {
    _enabled: boolean;
    disable: () => void;
    enable: () => void;
  };
};

/**
 * Extended layer with PM temp flag
 */
type PMTempLayer = L.Layer & {
  _pmTempLayer?: boolean;
};

/**
 * Extended marker with snapped flag and icon
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
  _snapInfo?: unknown;
  _icon?: HTMLElement;
};

/**
 * Extended polyline layer
 */
type ExtendedPolyline = L.Polyline & {
  getLatLngs(): L.LatLng[];
  _pmTempLayer?: boolean;
  _latlngInfo?: Array<{ latlng: L.LatLng; snapInfo?: unknown }>;
  _defaultShape: () => L.LatLng[];
};

/**
 * Extended feature group
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * Self intersection result from turf/kinks
 */
interface SelfIntersectionResult {
  features: unknown[];
}

/**
 * Line draw options
 */
interface LineDrawOptions {
  templineStyle: L.PolylineOptions;
  hintlineStyle: L.PolylineOptions;
  pathOptions?: L.PathOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  allowSelfIntersection?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  finishOn?: string | null;
  [key: string]: unknown;
}

/**
 * Draw Line interface
 */
export interface IDrawLine {
  options: LineDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  _enabled: boolean;
  toolbarButtonName: string;
  _layerGroup: ExtendedFeatureGroup;
  _layer: ExtendedPolyline;
  _hintline: L.Polyline & { _pmTempLayer?: boolean };
  _hintMarker: ExtendedMarker;
  _markers: (L.Marker & { _pmTempLayer?: boolean })[];
  _otherSnapLayers: L.Layer[];
  _doesSelfIntersect: boolean;
  isRed: boolean;
  tempMapDoubleClickZoomState?: boolean;

  enable(options?: Partial<LineDrawOptions>): void;
  disable(): void;
  enabled(): boolean;
  toggle(options?: Partial<LineDrawOptions>): void;
  _syncHintLine(): void;
  _syncHintMarker(e: L.LeafletMouseEvent): void;
  hasSelfIntersection(): boolean;
  _handleSelfIntersection(addVertex: boolean, latlng?: L.LatLng): void;
  _createVertex(e: L.LeafletMouseEvent): void;
  _setHintLineAfterNewVertex(hintMarkerLatLng: L.LatLng): void;
  _removeLastVertex(): void;
  _finishShape(e?: L.LeafletMouseEvent): void;
  _createMarker(latlng: L.LatLng): L.Marker;
  _setTooltipText(): void;
  _change(latlngs: L.LatLng[]): void;
  setStyle(): void;

  // From mixins
  _setPane(
    layer: PMTempLayer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ): void;
  _fireDrawStart(): void;
  _fireDrawEnd(): void;
  _fireCreate(layer: L.Layer): void;
  _fireChange(latlngs: L.LatLng[], source: string): void;
  _fireVertexAdded(
    marker: L.Marker,
    indexPath: number[] | undefined,
    latlng: L.LatLng,
    source: string
  ): void;
  _fireVertexRemoved(
    marker: L.Marker,
    indexPath: number[],
    source: string
  ): void;
  _fireIntersect(
    intersection: SelfIntersectionResult,
    map: ExtendedMap,
    source: string
  ): void;
  _setGlobalDrawMode(): void;
  _cleanupSnapping(): void;
  _handleSnapping(e: L.LeafletEvent, selfSnapOnly?: boolean): void;
  _finishLayer(layer: L.Layer): void;
  _isFirstLayer(): boolean;
}
import kinks from '@turf/kinks';
import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.Line = Draw.extend<IDrawLine, [L.Map]>({
  initialize(this: IDrawLine, map: L.Map) {
    this._map = map as typeof this._map;
    this._shape = 'Line';
    this.toolbarButtonName = 'drawPolyline';
    this._doesSelfIntersect = false;
  },
  enable(this: IDrawLine, options?: Partial<LineDrawOptions>) {
    L.Util.setOptions(this, options);

    // enable draw mode
    this._enabled = true;

    this._markers = [];

    // create a new layergroup
    this._layerGroup = new L.FeatureGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // this is the polyLine that'll make up the polygon
    this._layer = L.polyline([], {
      ...this.options.templineStyle,
      pmIgnore: false,
    }) as ExtendedPolyline;
    this._setPane(this._layer, 'layerPane');
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);

    // this is the hintline from the mouse cursor to the last marker
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._setPane(this._hintline, 'layerPane');
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker(this._map.getCenter(), {
      interactive: false, // always vertex marker below will be triggered from the click event -> _finishShape #911
      zIndexOffset: 100,
      icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
    });
    this._setPane(this._hintMarker, 'vertexPane');
    this._hintMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintMarker);

    // show the hintmarker if the option is set
    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon!, 'visible');
    }

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.firstVertex'), {
          permanent: true,
          offset: L.point(0, 10),
          direction: 'bottom',

          opacity: 0.8,
        })
        .openTooltip();
    }

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // create a polygon-point on click
    this._map.on('click', this._createVertex, this);

    // finish on layer event
    // #http://leafletjs.com/reference.html#interactive-layer-click
    if (this.options.finishOn && this.options.finishOn !== 'snap') {
      this._map.on(
        this.options.finishOn,
        this._finishShape as L.LeafletEventHandlerFn,
        this
      );
    }

    // prevent zoom on double click if finishOn is === dblclick
    if (this.options.finishOn === 'dblclick') {
      this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled;

      if (this.tempMapDoubleClickZoomState) {
        this._map.doubleClickZoom.disable();
      }
    }

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    // sync the hintline with hint marker
    this._hintMarker.on('move', this._syncHintLine, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];

    // make sure intersection is not set while start drawing
    this.isRed = false;

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  disable(this: IDrawLine) {
    // disable draw mode

    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false;

    // reset cursor
    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // unbind listeners
    this._map.off('click', this._createVertex, this);
    this._map.off('mousemove', this._syncHintMarker, this);
    if (this.options.finishOn && this.options.finishOn !== 'snap') {
      this._map.off(
        this.options.finishOn,
        this._finishShape as L.LeafletEventHandlerFn,
        this
      );
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    }

    // remove layer
    this._map.removeLayer(this._layerGroup);

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  },
  enabled(this: IDrawLine) {
    return this._enabled;
  },
  toggle(this: IDrawLine, options?: Partial<LineDrawOptions>) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _syncHintLine(this: IDrawLine) {
    const polyPoints = this._layer.getLatLngs() as L.LatLng[];

    if (polyPoints.length > 0) {
      const lastPolygonPoint = polyPoints[polyPoints.length - 1];

      // set coords for hintline from marker to last vertex of drawin polyline
      this._hintline.setLatLngs([
        lastPolygonPoint,
        this._hintMarker.getLatLng(),
      ]);
    }
  },
  _syncHintMarker(this: IDrawLine, e: L.LeafletMouseEvent) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    } else if (this._otherSnapLayers && this._otherSnapLayers.length > 0) {
      // Even when global snapping is disabled, allow self-snapping to the
      // first point of the current polygon to enable shape completion
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent, true);
    }

    // if self-intersection is forbidden, handle it
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, this._hintMarker.getLatLng());
    }
    const latlngs = this._layer._defaultShape().slice();
    latlngs.push(this._hintMarker.getLatLng());
    this._change(latlngs);
  },
  hasSelfIntersection(this: IDrawLine) {
    // check for self intersection of the layer and return true/false
    const selfIntersection = kinks(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _handleSelfIntersection(
    this: IDrawLine,
    addVertex: boolean,
    latlng?: L.LatLng
  ) {
    // ok we need to check the self intersection here
    // problem: during draw, the marker on the cursor is not yet part
    // of the layer. So we need to clone the layer, add the
    // potential new vertex (cursor markers latlngs) and check the self
    // intersection on the clone. Phew... - let's do it 💪

    // clone layer (polyline is enough, even when it's a polygon)
    const clone = L.polyline(this._layer.getLatLngs() as L.LatLng[]);

    if (addVertex) {
      // get vertex from param or from hintmarker
      if (!latlng) {
        latlng = this._hintMarker.getLatLng();
      }

      // add the vertex
      clone.addLatLng(latlng);
    }

    // check the self intersection
    const selfIntersection = kinks(clone.toGeoJSON(15));
    this._doesSelfIntersect = selfIntersection.features.length > 0;

    // change the style based on self intersection
    if (this._doesSelfIntersect) {
      if (!this.isRed) {
        this.isRed = true;
        this._hintline.setStyle({
          color: '#f00000ff',
        });
        // fire intersect event
        this._fireIntersect(selfIntersection, this._map, 'Draw');
      }
    } else if (!this._hintline.isEmpty()) {
      this.isRed = false;
      this._hintline.setStyle(this.options.hintlineStyle);
    }
  },
  _createVertex(this: IDrawLine, e: L.LeafletMouseEvent) {
    // don't create a vertex if we have a selfIntersection and it is not allowed
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // check if the first and this vertex have the same latlng
    // or the last vertex and the hintMarker have the same latlng (dbl-click)
    const latlngs = this._layer.getLatLngs() as L.LatLng[];

    const lastLatLng = latlngs[latlngs.length - 1];
    if (
      latlng.equals(latlngs[0]) ||
      (latlngs.length > 0 && latlng.equals(lastLatLng))
    ) {
      // yes? finish the polygon
      this._finishShape();

      // "why?", you ask? Because this happens when we snap the last vertex to the first one
      // and then click without hitting the last marker. Click happens on the map
      // in 99% of cases it's because the user wants to finish the polygon. So...
      return;
    }

    this._layer._latlngInfo = this._layer._latlngInfo || [];
    this._layer._latlngInfo.push({
      latlng,
      snapInfo: this._hintMarker._snapInfo,
    });

    this._layer.addLatLng(latlng);
    const newMarker = this._createMarker(latlng);
    this._setTooltipText();

    this._setHintLineAfterNewVertex(latlng);

    this._fireVertexAdded(newMarker, undefined, latlng, 'Draw');
    this._change(this._layer.getLatLngs() as L.LatLng[]);
    // check if we should finish on snap
    if (this.options.finishOn === 'snap' && this._hintMarker._snapped) {
      this._finishShape(e);
    }
  },
  _setHintLineAfterNewVertex(this: IDrawLine, hintMarkerLatLng: L.LatLng) {
    // make the new drawn line (with another style) visible
    this._hintline.setLatLngs([hintMarkerLatLng, hintMarkerLatLng]);
  },
  _removeLastVertex(this: IDrawLine) {
    const markers = this._markers;

    // if all markers are gone, cancel drawing
    if (markers.length <= 1) {
      this.disable();
      return;
    }

    // remove last coords
    let coords = this._layer.getLatLngs() as L.LatLng[];

    const removedMarker = markers[markers.length - 1];

    // the index path to the marker inside the multidimensional marker array
    const { indexPath } = L.PM.Utils.findDeepMarkerIndex(
      markers,
      removedMarker
    );

    // remove last marker from array
    markers.pop();

    // remove that marker
    this._layerGroup.removeLayer(removedMarker);

    const markerPrevious = markers[markers.length - 1];

    // no need for findDeepMarkerIndex because the coords are always flat (Polyline) no matter if Line or Polygon
    const indexMarkerPrev = coords.indexOf(markerPrevious.getLatLng());

    // +1 don't cut out the previous marker
    coords = coords.slice(0, indexMarkerPrev + 1);

    // update layer with new coords
    this._layer.setLatLngs(coords);
    this._layer._latlngInfo!.pop();

    // sync the hintline again
    this._syncHintLine();
    this._setTooltipText();

    this._fireVertexRemoved(removedMarker, indexPath!, 'Draw');
    this._change(this._layer.getLatLngs() as L.LatLng[]);
  },
  _finishShape(this: IDrawLine) {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // get coordinates
    const coords = this._layer.getLatLngs() as L.LatLng[];

    // if there is only one coords, don't finish the shape!
    if (coords.length <= 1) {
      return;
    }

    // create the leaflet shape and add it to the map
    const polylineLayer = L.polyline(coords, this.options.pathOptions);
    this._setPane(polylineLayer, 'layerPane');
    this._finishLayer(polylineLayer);
    polylineLayer.addTo(this._map.pm._getContainingLayer());

    // fire the pm:create event and pass shape and layer
    this._fireCreate(polylineLayer);

    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    const hintMarkerLatLng = this._hintMarker.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      this._hintMarker.setLatLng(hintMarkerLatLng);
    }
  },
  _createMarker(this: IDrawLine, latlng: L.LatLng) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    this._setPane(marker, 'vertexPane');
    marker._pmTempLayer = true;

    // add it to the map
    this._layerGroup.addLayer(marker);
    this._markers.push(marker);

    // a click on any marker finishes this shape
    marker.on('click', this._finishShape, this);

    return marker;
  },
  _setTooltipText(this: IDrawLine) {
    const { length } = (this._layer.getLatLngs() as L.LatLng[]).flat();
    let text = '';

    // handle tooltip text
    if (length <= 1) {
      text = getTranslation('tooltips.continueLine');
    } else {
      text = getTranslation('tooltips.finishLine');
    }
    this._hintMarker.setTooltipContent(text);
  },
  _change(this: IDrawLine, latlngs: L.LatLng[]) {
    this._fireChange(latlngs, 'Draw');
  },
  setStyle(this: IDrawLine) {
    this._layer?.setStyle(this.options.templineStyle);
    this._hintline?.setStyle(this.options.hintlineStyle);
  },
});
