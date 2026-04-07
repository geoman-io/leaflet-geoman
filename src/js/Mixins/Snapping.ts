import { hasValues, prioritiseSort } from '../helpers';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    optIn: boolean;
    Utils: {
      calcMiddleLatLng: (map: L.Map, a: L.LatLng, b: L.LatLng) => L.LatLng;
    };
  };
  Util: {
    throttle: <T extends (...args: unknown[]) => unknown>(
      fn: T,
      time: number,
      context: unknown
    ) => T;
    isArray: (obj: unknown) => boolean;
  };
  LineUtil: {
    closestPointOnSegment: (p: L.Point, a: L.Point, b: L.Point) => L.Point;
    pointToSegmentDistance: (p: L.Point, a: L.Point, b: L.Point) => number;
  };
};

/**
 * Extended marker with snapping properties
 */
interface SnappableMarker extends L.Marker {
  _snapped?: boolean;
  _snapInfo?: SnapEventInfo;
  _orgLatLng?: L.LatLng;
}

/**
 * Extended layer with PM properties
 */
interface PMLayer extends L.Layer {
  _leaflet_id?: number;
  _latlng?: L.LatLng;
  _latlngs?: L.LatLng[] | L.LatLng[][];
  _pmTempLayer?: boolean;
  _parentCopy?: L.Layer;
  pm?: {
    _hiddenPolyCircle?: L.Layer;
  };
  options: L.LayerOptions & {
    snapIgnore?: boolean;
    pmIgnore?: boolean;
  };
  getLatLng?: () => L.LatLng;
  getLatLngs?: () => L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  getBounds?: () => L.LatLngBounds;
}

/**
 * Snap event info
 */
interface SnapEventInfo {
  marker: SnappableMarker;
  shape: string;
  snapLatLng: L.LatLng;
  segment?: [L.LatLng, L.LatLng];
  layer: L.Layer;
  workingLayer: L.Layer;
  layerInteractedWith: PMLayer;
  distance: number;
}

/**
 * Closest layer result
 */
interface ClosestLayerResult {
  latlng?: L.LatLng;
  segment?: [L.LatLng, L.LatLng];
  distance?: number;
  layer?: PMLayer;
}

/**
 * Snap mixin context
 */
export interface SnapMixinContext {
  _map: L.Map & {
    pm: {
      Keyboard: { isAltKeyPressed: () => boolean };
      globalOptions: { snappingOrder?: string[] };
    };
  };
  _layer: L.Layer & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (
      event: string,
      handler: (...args: any[]) => void,
      context: unknown
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off: (
      event: string,
      handler: (...args: any[]) => void,
      context: unknown
    ) => void;
  };
  _markers: (L.Marker | L.Marker[])[];
  _shape: string;
  options: {
    snapDistance?: number;
    snapSegment?: boolean;
    snapMiddle?: boolean;
    snapVertex?: boolean;
  };
  _fireSnapDrag: (layer: L.Layer | L.Marker, eventInfo: SnapEventInfo) => void;
  _fireSnap: (layer: L.Layer | L.Marker, eventInfo: SnapEventInfo) => void;
  _fireUnsnap: (layer: L.Layer | L.Marker, eventInfo: SnapEventInfo) => void;
}

/**
 * Snap mixin interface
 */
/**
 * Sortable item interface for prioritiseSort compatibility
 */
interface SortableClosestLayerResult extends ClosestLayerResult {
  [key: string]: unknown;
}

export interface ISnapMixin {
  _snapList?: PMLayer[];
  _otherSnapLayers?: PMLayer[];
  _snapLatLng?: L.LatLng;
  throttledList?: () => void;
  debugIndicatorLines?: L.Polyline[];

  _initSnappableMarkers(): void;
  _disableSnapping(): void;
  _assignEvents(markerArr: (L.Marker | L.Marker[])[]): void;
  _cleanupSnapping(e?: L.LeafletEvent): void;
  _handleThrottleSnapping(): void;
  _handleSnapping(
    e: L.LeafletMouseEvent & { target: SnappableMarker },
    selfSnapOnly?: boolean
  ): boolean;
  _createSnapList(): void;
  _handleSnapLayerRemoval(e: { layer: PMLayer }): void;
  _calcClosestLayer(latlng: L.LatLng, layers: PMLayer[]): ClosestLayerResult;
  _calcClosestLayers(
    latlng: L.LatLng,
    layers: PMLayer[],
    amount?: number
  ): ClosestLayerResult[];
  _calcLayerDistances(latlng: L.LatLng, layer: PMLayer): ClosestLayerResult;
  _calcLatLngDistances(
    latlng: L.LatLng,
    latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][],
    map: L.Map,
    closedShape?: boolean
  ): ClosestLayerResult;
  _getClosestLayerByPriority(
    layers: ClosestLayerResult[],
    amount?: number
  ): ClosestLayerResult | ClosestLayerResult[];
  _checkPrioritiySnapping(closestLayer: ClosestLayerResult): L.LatLng;
  _unsnap(): void;
  _getClosestPointOnSegment(
    map: L.Map,
    latlng: L.LatLng,
    latlngA: L.LatLng,
    latlngB: L.LatLng
  ): L.LatLng;
  _getDistanceToSegment(
    map: L.Map,
    latlng: L.LatLng,
    latlngA: L.LatLng,
    latlngB: L.LatLng
  ): number;
  _getDistance(map: L.Map, latlngA: L.LatLng, latlngB: L.LatLng): number;
}

/**
 * Snapping mixin - provides snap-to-vertex functionality during drawing and editing
 */
const SnapMixin: ISnapMixin & ThisType<SnapMixinContext & ISnapMixin> = {
  _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    this._assignEvents(this._markers);

    this._layer.off('pm:dragstart', this._unsnap, this);
    this._layer.on('pm:dragstart', this._unsnap, this);
  },

  _disableSnapping() {
    this._layer.off('pm:dragstart', this._unsnap, this);
  },

  _assignEvents(markerArr) {
    // loop through marker array and assign events to the markers
    markerArr.forEach((marker) => {
      // if the marker is another array (Multipolygon stuff), recursively do this again
      if (Array.isArray(marker)) {
        this._assignEvents(marker);
        return;
      }

      // add handleSnapping event on drag
      // Cast through unknown since our handler is compatible at runtime but types don't overlap
      marker.off(
        'drag',
        this._handleSnapping as unknown as L.LeafletEventHandlerFn,
        this
      );
      marker.on(
        'drag',
        this._handleSnapping as unknown as L.LeafletEventHandlerFn,
        this
      );

      // cleanup event on dragend
      marker.off(
        'dragend',
        this._cleanupSnapping as unknown as L.LeafletEventHandlerFn,
        this
      );
      marker.on(
        'dragend',
        this._cleanupSnapping as unknown as L.LeafletEventHandlerFn,
        this
      );
    });
  },

  _cleanupSnapping(e) {
    if (e) {
      // reset snap flag of the dragged helper-marker
      const marker = e.target as SnappableMarker;
      marker._snapped = false;
    }
    // delete it, we need to refresh this with each start of a drag because
    // meanwhile, new layers could've been added to the map
    delete this._snapList;

    if (this.throttledList) {
      this._map.off('layeradd', this.throttledList, this);
      this.throttledList = undefined;
    }

    // remove map event
    this._map.off('layerremove', this._handleSnapLayerRemoval, this);

    if (this.debugIndicatorLines) {
      this.debugIndicatorLines.forEach((line) => {
        line.remove();
      });
    }
  },

  _handleThrottleSnapping() {
    // we check if the throttledList is existing, else the function is deleted but the `layeradd` event calls it.
    // this made problems when layer was removed and added to the map in the `pm:create` event
    if (this.throttledList) {
      this._createSnapList();
    }
  },

  _handleSnapping(
    e: L.LeafletMouseEvent & { target: SnappableMarker },
    selfSnapOnly = false
  ) {
    const marker = e.target;
    marker._snapped = false;

    if (!this.throttledList) {
      this.throttledList = L.Util.throttle(
        this._handleThrottleSnapping,
        100,
        this
      ) as () => void;
    }

    // if snapping is disabled via holding ALT during drag, stop right here
    // we need to check for the altKey on the move event, because keydown event is to slow ...
    if (e?.originalEvent?.altKey || this._map?.pm?.Keyboard.isAltKeyPressed()) {
      return false;
    }

    // Determine which snap list to use
    let snapList: PMLayer[];
    if (selfSnapOnly) {
      // Self-snap mode: only snap to _otherSnapLayers (first point of current polygon)
      // This allows polygon completion even when global snapping is disabled
      if (!this._otherSnapLayers || this._otherSnapLayers.length === 0) {
        return false;
      }
      snapList = this._otherSnapLayers;
    } else {
      // Normal mode: create full snap list of all snappable layers
      // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
      // after dragstart/movestart so it wouldn't fire for them
      if (this._snapList === undefined) {
        this._createSnapList();

        // re-create the snaplist again when a layer is added during draw
        this._map.off('layeradd', this.throttledList, this);
        this._map.on('layeradd', this.throttledList, this);
      }
      snapList = this._snapList!;
    }

    // if there are no layers to snap to, stop here
    if (snapList.length <= 0) {
      return false;
    }

    // get the closest layer, it's closest latlng, segment and the distance
    const closestLayer = this._calcClosestLayer(marker.getLatLng(), snapList);

    // if no layers found. Can happen when circle is the only visible layer on the map and the hidden snapping-border circle layer is also on the map
    if (Object.keys(closestLayer).length === 0) {
      return false;
    }

    const isMarker =
      closestLayer.layer instanceof L.Marker ||
      closestLayer.layer instanceof L.CircleMarker ||
      !this.options.snapSegment;

    // find the final latlng that we want to snap to
    let snapLatLng: L.LatLng;
    if (!isMarker) {
      snapLatLng = this._checkPrioritiySnapping(closestLayer);
    } else {
      snapLatLng = closestLayer.latlng!;
    }

    // minimal distance before marker snaps (in pixels)
    const minDistance = this.options.snapDistance!;

    // event info for pm:snap and pm:unsnap
    const eventInfo: SnapEventInfo = {
      marker,
      shape: this._shape,
      snapLatLng,
      segment: closestLayer.segment,
      layer: this._layer,
      workingLayer: this._layer,
      layerInteractedWith: closestLayer.layer!, // for lack of a better property name
      distance: closestLayer.distance!,
    };

    this._fireSnapDrag(eventInfo.marker, eventInfo);
    this._fireSnapDrag(this._layer, eventInfo);

    if (closestLayer.distance! < minDistance) {
      // snap the marker
      marker._orgLatLng = marker.getLatLng();
      // TODO: if the origin marker has a altitude is applied to the snapped layer too, do we want this?
      marker.setLatLng(snapLatLng);

      marker._snapped = true;
      marker._snapInfo = eventInfo;

      const triggerSnap = () => {
        this._snapLatLng = snapLatLng;
        this._fireSnap(marker, eventInfo);
        this._fireSnap(this._layer, eventInfo);
      };

      // check if the snapping position differs from the last snap
      // Thanks Max & car2go Team
      const a = this._snapLatLng || ({} as L.LatLng);
      const b = snapLatLng || ({} as L.LatLng);

      if (a.lat !== b.lat || a.lng !== b.lng) {
        triggerSnap();
      }
    } else if (this._snapLatLng) {
      // no more snapping

      // if it was previously snapped...
      // ...unsnap
      this._unsnap();

      marker._snapped = false;
      marker._snapInfo = undefined;

      // and fire unsnap event
      this._fireUnsnap(eventInfo.marker, eventInfo);
      this._fireUnsnap(this._layer, eventInfo);
    }

    return true;
  },

  _createSnapList() {
    let layers: PMLayer[] = [];
    const debugIndicatorLines: L.Polyline[] = [];
    const map = this._map;

    map.off('layerremove', this._handleSnapLayerRemoval, this);
    map.on('layerremove', this._handleSnapLayerRemoval, this);

    // find all layers that are or inherit from Polylines... and markers that are not
    // temporary markers of polygon-edits
    map.eachLayer((layer: PMLayer) => {
      if (
        (layer instanceof L.Polyline ||
          layer instanceof L.Marker ||
          layer instanceof L.CircleMarker ||
          layer instanceof L.ImageOverlay) &&
        layer.options.snapIgnore !== true
      ) {
        // if snapIgnore === false the layer will be always snappable
        if (
          layer.options.snapIgnore === undefined &&
          ((!L.PM.optIn && layer.options.pmIgnore === true) || // if optIn is not set and pmIgnore is true, the layer will be ignored
            (L.PM.optIn && layer.options.pmIgnore !== false)) // if optIn is true and pmIgnore is not false, the layer will be ignored
        ) {
          return;
        }

        // adds a hidden polygon which matches the border of the circle
        // Cast to PMLayer to preserve our extended type after instanceof narrowing
        const pmLayer = layer as PMLayer;
        if (
          (layer instanceof L.Circle || layer instanceof L.CircleMarker) &&
          pmLayer.pm &&
          pmLayer.pm._hiddenPolyCircle
        ) {
          layers.push(pmLayer.pm._hiddenPolyCircle as PMLayer);
        } else if (layer instanceof L.ImageOverlay) {
          const rect = L.rectangle(layer.getBounds!()) as PMLayer;
          layers.push(rect);
        }
        layers.push(pmLayer);

        // this is for debugging
        const debugLine = L.polyline([], {
          color: 'red',
          pmIgnore: true,
        }) as L.Polyline & { _pmTempLayer?: boolean };
        debugLine._pmTempLayer = true;
        debugIndicatorLines.push(debugLine);
        if (layer instanceof L.Circle || layer instanceof L.CircleMarker) {
          debugIndicatorLines.push(debugLine);
        }

        // uncomment 👇 this line to show helper lines for debugging
        // debugLine.addTo(map);
      }
    });

    // ...except myself
    layers = layers.filter((layer) => this._layer !== layer);

    // also remove everything that has no coordinates yet
    layers = layers.filter(
      (layer) =>
        layer._latlng ||
        (layer._latlngs && hasValues(layer._latlngs as unknown[]))
    );

    // finally remove everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter((layer) => !layer._pmTempLayer);

    // save snaplist from layers and the other snap layers added from other classes/scripts
    if (this._otherSnapLayers) {
      this._otherSnapLayers.forEach(() => {
        // this is for debugging
        const debugLine = L.polyline([], {
          color: 'red',
          pmIgnore: true,
        }) as L.Polyline & { _pmTempLayer?: boolean };
        debugLine._pmTempLayer = true;
        debugIndicatorLines.push(debugLine);
      });
      this._snapList = layers.concat(this._otherSnapLayers);
    } else {
      this._snapList = layers;
    }

    this.debugIndicatorLines = debugIndicatorLines;
  },

  _handleSnapLayerRemoval({ layer }) {
    if (!layer._leaflet_id) {
      return;
    }
    // find the layers index in snaplist
    const index = this._snapList!.findIndex(
      (e) => e._leaflet_id === layer._leaflet_id
    );
    if (index > -1) {
      // remove it from the snaplist
      this._snapList!.splice(index, 1);
    }
  },

  _calcClosestLayer(latlng, layers) {
    return this._calcClosestLayers(latlng, layers, 1)[0];
  },

  _calcClosestLayers(latlng, layers, amount = 1) {
    // the closest polygon to our dragged marker latlng
    let closestLayers: ClosestLayerResult[] = [];
    let closestLayer: ClosestLayerResult = {};

    // loop through the layers
    layers.forEach((layer, index) => {
      // For Circles and CircleMarkers to prevent that they snap to the own borders.
      if (layer._parentCopy && layer._parentCopy === this._layer) {
        return;
      }
      // if a polyline has only one coordinate
      const latlngs = layer.getLatLngs?.();
      if (latlngs && (latlngs as L.LatLng[]).flat(5).length < 2) {
        return;
      }
      // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
      const results = this._calcLayerDistances(latlng, layer);
      results.distance = Math.floor(results.distance!);

      if (this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[index]) {
          const debugLine = L.polyline([], {
            color: 'red',
            pmIgnore: true,
          }) as L.Polyline & { _pmTempLayer?: boolean };
          debugLine._pmTempLayer = true;
          this.debugIndicatorLines[index] = debugLine;
        }

        // show indicator lines, it's for debugging
        this.debugIndicatorLines[index].setLatLngs([latlng, results.latlng!]);
      }

      // save the info if it doesn't exist or if the distance is smaller than the previous one
      if (
        amount === 1 &&
        (closestLayer.distance === undefined ||
          results.distance - 5 <= closestLayer.distance)
      ) {
        // if the layer is less then 5 pixels away, we treat it as same distance and sort it based on priority
        if (results.distance + 5 < closestLayer.distance!) {
          closestLayers = [];
        }
        closestLayer = results;
        closestLayer.layer = layer;
        closestLayers.push(closestLayer);
      } else if (amount !== 1) {
        closestLayer = {};
        closestLayer = results;
        closestLayer.layer = layer;
        closestLayers.push(closestLayer);
      }
    });
    if (amount !== 1) {
      // sort the layers by distance
      closestLayers = closestLayers.sort((a, b) => a.distance! - b.distance!);
    }

    if (amount === -1) {
      amount = closestLayers.length;
    }

    // return the closest layer and it's data
    // if there is no closest layer, return an empty object
    const result = this._getClosestLayerByPriority(closestLayers, amount);
    if (L.Util.isArray(result)) {
      return result as ClosestLayerResult[];
    }
    return [result as ClosestLayerResult];
  },

  _calcLayerDistances(latlng, layer) {
    const map = this._map;

    // is this a marker?
    const isMarker =
      layer instanceof L.Marker || layer instanceof L.CircleMarker;

    // is it a polygon?
    const isPolygon = layer instanceof L.Polygon;

    // the point P which we want to snap (probably the marker that is dragged)
    const P = latlng;

    // the coords of the layer

    if (isMarker) {
      // return the info for the marker, no more calculations needed
      const latlngs = layer.getLatLng!();
      return {
        latlng: { ...latlngs } as L.LatLng,
        distance: this._getDistance(map, latlngs, P),
      };
    }

    return this._calcLatLngDistances(P, layer.getLatLngs!(), map, isPolygon);
  },

  _calcLatLngDistances(latlng, latlngs, map, closedShape = false) {
    // the closest coord of the layer
    let closestCoord: L.LatLng | undefined;

    // the shortest distance from latlng to closestCoord
    let shortestDistance: number | undefined;

    // the closest segment (line between two points) of the layer
    let closestSegment: [L.LatLng, L.LatLng] | undefined;

    const loopThroughCoords = (
      coords: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]
    ) => {
      (coords as L.LatLng[]).forEach(
        (coord: L.LatLng | L.LatLng[] | L.LatLng[][], index: number) => {
          if (Array.isArray(coord)) {
            loopThroughCoords(coord as L.LatLng[] | L.LatLng[][]);
            return;
          }

          if (this.options.snapSegment) {
            // take this coord (A)...
            const A = coord;
            let nextIndex: number | undefined;

            // and the next coord (B) as points
            if (closedShape) {
              nextIndex =
                index + 1 === (coords as L.LatLng[]).length ? 0 : index + 1;
            } else {
              nextIndex =
                index + 1 === (coords as L.LatLng[]).length
                  ? undefined
                  : index + 1;
            }

            const B =
              nextIndex !== undefined
                ? (coords as L.LatLng[])[nextIndex]
                : undefined;
            if (B) {
              // calc the distance between latlng and AB-segment
              const distance = this._getDistanceToSegment(map, latlng, A, B);

              // is the distance shorter than the previous one? Save it and the segment
              if (
                shortestDistance === undefined ||
                distance < shortestDistance
              ) {
                shortestDistance = distance;
                closestSegment = [A, B];
              }
            }
          } else {
            // Only snap on the coords
            const distancePoint = this._getDistance(map, latlng, coord);

            if (
              shortestDistance === undefined ||
              distancePoint < shortestDistance
            ) {
              shortestDistance = distancePoint;
              closestCoord = coord;
            }
          }
        }
      );
    };

    loopThroughCoords(latlngs);

    if (this.options.snapSegment) {
      // now, take the closest segment (closestSegment) and calc the closest point to latlng on it.
      const C = this._getClosestPointOnSegment(
        map,
        latlng,
        closestSegment![0],
        closestSegment![1]
      );

      // return the latlng of that sucker
      return {
        latlng: { ...C } as L.LatLng,
        segment: closestSegment,
        distance: shortestDistance,
      };
    }
    // Only snap on the coords
    // return the closest coord
    return {
      latlng: closestCoord,
      distance: shortestDistance,
    };
  },

  _getClosestLayerByPriority(layers, amount = 1) {
    // sort the layers by creation, so it is snapping to the oldest layer from the same shape
    layers = layers.sort(
      (a, b) => (a.layer?._leaflet_id || 0) - (b.layer?._leaflet_id || 0)
    );

    const shapes = [
      'Marker',
      'CircleMarker',
      'Circle',
      'Line',
      'Polygon',
      'Rectangle',
    ];
    const order = this._map.pm.globalOptions.snappingOrder || [];

    let lastIndex = 0;
    const prioOrder: Record<string, number> = {};
    // merge user-preferred priority with default priority
    order.concat(shapes).forEach((shape) => {
      if (!prioOrder[shape]) {
        lastIndex += 1;
        prioOrder[shape] = lastIndex;
      }
    });

    // sort layers by priority
    // Cast comparator since ClosestLayerResult is structurally compatible with SortableItem
    layers.sort(
      prioritiseSort('instanceofShape', prioOrder) as (
        a: ClosestLayerResult,
        b: ClosestLayerResult
      ) => number
    );
    if (amount === 1) {
      return layers[0] || {};
    }
    return layers.slice(0, amount);
  },

  // we got the point we want to snap to (C), but we need to check if a coord of the polygon
  // receives priority over C as the snapping point. Let's check this here
  _checkPrioritiySnapping(closestLayer) {
    const map = this._map;

    // A and B are the points of the closest segment to P (the marker position we want to snap)
    const A = closestLayer.segment![0];
    const B = closestLayer.segment![1];

    // C is the point we would snap to on the segment.
    // The closest point on the closest segment of the closest polygon to P. That's right.
    const C = closestLayer.latlng!;

    // the latlng we ultimately want to snap to
    let snapLatlng = C;

    if (this.options.snapVertex) {
      // distances from A to C and B to C to check which one is closer to C
      const distanceAC = this._getDistance(map, A, C);
      const distanceBC = this._getDistance(map, B, C);

      // closest latlng of A and B to C
      let closestVertexLatLng = distanceAC < distanceBC ? A : B;

      // distance between closestVertexLatLng and C
      let shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC;

      // snap to middle (M) of segment if option is enabled
      if (this.options.snapMiddle) {
        const M = L.PM.Utils.calcMiddleLatLng(map, A, B);
        const distanceMC = this._getDistance(map, M, C);

        if (distanceMC < distanceAC && distanceMC < distanceBC) {
          // M is the nearest vertex
          closestVertexLatLng = M;
          shortestDistance = distanceMC;
        }
      }

      // the distance that needs to be undercut to trigger priority
      const priorityDistance = this.options.snapDistance!;

      // if C is closer to the closestVertexLatLng (A, B or M) than the snapDistance,
      // the closestVertexLatLng has priority over C as the snapping point.
      if (shortestDistance < priorityDistance) {
        snapLatlng = closestVertexLatLng;
      }
    }

    // return the copy of snapping point
    return { ...snapLatlng } as L.LatLng;
  },

  _unsnap() {
    // delete the last snap
    delete this._snapLatLng;
  },

  _getClosestPointOnSegment(map, latlng, latlngA, latlngB) {
    let maxzoom = map.getMaxZoom();
    if (maxzoom === Infinity) {
      maxzoom = map.getZoom();
    }
    const P = map.project(latlng, maxzoom);
    const A = map.project(latlngA, maxzoom);
    const B = map.project(latlngB, maxzoom);
    const closest = L.LineUtil.closestPointOnSegment(P, A, B);
    return map.unproject(closest, maxzoom);
  },

  _getDistanceToSegment(map, latlng, latlngA, latlngB) {
    const P = map.latLngToContainerPoint(latlng);
    const A = map.latLngToContainerPoint(latlngA);
    const B = map.latLngToContainerPoint(latlngB);
    return L.LineUtil.pointToSegmentDistance(P, A, B);
  },

  _getDistance(map, latlngA, latlngB) {
    return map
      .latLngToContainerPoint(latlngA)
      .distanceTo(map.latLngToContainerPoint(latlngB));
  },
};

export default SnapMixin;
