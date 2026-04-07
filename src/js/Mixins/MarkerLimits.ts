// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throttle: <T extends (...args: any[]) => any>(
      fn: T,
      time: number,
      context: unknown
    ) => T;
  };
};

/**
 * Extended marker with _latlng property
 */
interface MarkerWithLatLng extends L.Marker {
  _latlng: L.LatLng;
}

/**
 * Marker Limits mixin context
 */
export interface MarkerLimitsMixinContext {
  _layer: L.Layer & {
    on: (
      event: string,
      handler: (...args: unknown[]) => void,
      context: unknown
    ) => void;
    off: (
      event: string,
      handler: (...args: unknown[]) => void,
      context: unknown
    ) => void;
  };
  _map: L.Map;
  _markerGroup: L.LayerGroup;
  options: {
    limitMarkersToCount: number;
  };
  _initMarkers: () => void;
}

/**
 * Marker Limits mixin interface
 */
export interface IMarkerLimitsMixin {
  markerCache: MarkerWithLatLng[];
  throttledApplyLimitFilters?: (e: { latlng?: L.LatLng }) => void;
  _preventRenderMarkers: boolean;

  filterMarkerGroup(): void;
  _removeMarkerLimitEvents(): void;
  createCache(): void;
  _removeFromCache(marker: L.Marker): void;
  renderLimits(markers: L.Marker[]): void;
  applyLimitFilters(e: { latlng?: L.LatLng }): void;
  _filterClosestMarkers(latlng: L.LatLng): MarkerWithLatLng[];
  _preventRenderingMarkers(value: boolean): void;
}

/**
 * MarkerLimits mixin - handles limiting visible markers during editing
 */
const MarkerLimits: IMarkerLimitsMixin &
  ThisType<MarkerLimitsMixinContext & IMarkerLimitsMixin> = {
  markerCache: [],
  _preventRenderMarkers: false,

  filterMarkerGroup() {
    // define cache of markers
    this.markerCache = [];
    this.createCache();

    // refresh cache when layer was edited (e.g. when a vertex was added or removed)
    this._layer.on('pm:edit', this.createCache, this);

    // apply filter for the first time
    this.applyLimitFilters({});

    if (!this.throttledApplyLimitFilters) {
      this.throttledApplyLimitFilters = L.Util.throttle(
        this.applyLimitFilters,
        100,
        this
      );
    }

    // remove events when edit mode is disabled
    this._layer.on('pm:disable', this._removeMarkerLimitEvents, this);
    this._layer.on('remove', this._removeMarkerLimitEvents, this);

    // add markers closest to the mouse
    if (this.options.limitMarkersToCount > -1) {
      // re-init markers when a vertex is removed.
      // The reason is that syncing this cache with a removed marker was impossible to do
      this._layer.on('pm:vertexremoved', this._initMarkers, this);

      this._map.on('mousemove', this.throttledApplyLimitFilters!, this);
    }
  },

  _removeMarkerLimitEvents() {
    this._map.off('mousemove', this.throttledApplyLimitFilters!, this);
    this._layer.off('pm:edit', this.createCache, this);
    this._layer.off('pm:disable', this._removeMarkerLimitEvents, this);
    this._layer.off('pm:vertexremoved', this._initMarkers, this);
  },

  createCache() {
    const allMarkers = [
      ...(this._markerGroup.getLayers() as MarkerWithLatLng[]),
      ...this.markerCache,
    ];
    this.markerCache = allMarkers.filter((v, i, s) => s.indexOf(v) === i);
  },

  _removeFromCache(marker) {
    const markerCacheIndex = this.markerCache.indexOf(
      marker as MarkerWithLatLng
    );
    if (markerCacheIndex > -1) {
      this.markerCache.splice(markerCacheIndex, 1);
    }
  },

  renderLimits(markers) {
    this.markerCache.forEach((l) => {
      if (markers.includes(l)) {
        this._markerGroup.addLayer(l);
      } else {
        this._markerGroup.removeLayer(l);
      }
    });
  },

  applyLimitFilters({ latlng = { lat: 0, lng: 0 } as L.LatLng }) {
    if (this._preventRenderMarkers) {
      return;
    }
    // find markers near the cursor
    const makersNearCursor = this._filterClosestMarkers(latlng);

    // all markers that we want to show
    const markersToAdd = [...makersNearCursor];

    this.renderLimits(markersToAdd);
  },

  _filterClosestMarkers(latlng) {
    const markers = [...this.markerCache];
    const limit = this.options.limitMarkersToCount;

    if (limit === -1) {
      return markers;
    }

    // sort markers by distance to cursor
    markers.sort((l, t) => {
      const distanceA = l._latlng.distanceTo(latlng);
      const distanceB = t._latlng.distanceTo(latlng);

      return distanceA - distanceB;
    });

    // reduce markers to number of limit
    const closest = markers.filter((_, i) => (limit > -1 ? i < limit : true));

    return closest;
  },

  _preventRenderingMarkers(value) {
    this._preventRenderMarkers = !!value;
  },
};

export default MarkerLimits;
