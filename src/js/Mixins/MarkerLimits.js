import { Util } from 'leaflet';

const MarkerLimits = {
  _filterMarkerGroup() {
    // define cache of markers
    this.markerCache = [];
    this._createCache();

    // refresh cache when layer was edited (e.g. when a vertex was added or removed)
    this._layer.on('geoman:edit', this._createCache, this);

    // apply filter for the first time
    this._applyLimitFilters({});

    if (!this.throttledApplyLimitFilters) {
      this.throttledApplyLimitFilters = Util.throttle(
        this._applyLimitFilters,
        100,
        this
      );
    }

    // remove events when edit mode is disabled
    this._layer.on('geoman:disable', this._removeMarkerLimitEvents, this);
    this._layer.on('remove', this._removeMarkerLimitEvents, this);

    // add markers closest to the pointer
    if (this.options.limitMarkersToCount > -1) {
      // re-init markers when a vertex is removed.
      // The reason is that syncing this cache with a removed marker was impossible to do
      this._layer.on('geoman:vertexremoved', this._initMarkers, this);

      this._map.on('pointermove', this.throttledApplyLimitFilters, this);
    }
  },
  _removeMarkerLimitEvents() {
    this._map.off('pointermove', this.throttledApplyLimitFilters, this);
    this._layer.off('geoman:edit', this._createCache, this);
    this._layer.off('geoman:disable', this._removeMarkerLimitEvents, this);
    this._layer.off('geoman:vertexremoved', this._initMarkers, this);
  },
  _createCache() {
    const allMarkers = [...this._markerGroup.getLayers(), ...this.markerCache];
    this.markerCache = allMarkers.filter((v, i, s) => s.indexOf(v) === i);
  },
  _removeFromCache(marker) {
    const markerCacheIndex = this.markerCache.indexOf(marker);
    if (markerCacheIndex > -1) {
      this.markerCache.splice(markerCacheIndex, 1);
    }
  },
  _renderLimits(markers) {
    this.markerCache.forEach((l) => {
      if (markers.includes(l)) {
        this._markerGroup.addLayer(l);
      } else {
        this._markerGroup.removeLayer(l);
      }
    });
  },
  _applyLimitFilters({ latlng = { lat: 0, lng: 0 } }) {
    if (this._preventRenderMarkers) {
      return;
    }
    // find markers near the cursor
    const makersNearCursor = this._filterClosestMarkers(latlng);

    // all markers that we want to show
    const markersToAdd = [...makersNearCursor];

    this._renderLimits(markersToAdd);
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
    const closest = markers.filter((l, i) => (limit > -1 ? i < limit : true));

    return closest;
  },
  _preventRenderMarkers: false,
  _preventRenderingMarkers(value) {
    this._preventRenderMarkers = !!value;
  },
};

export default MarkerLimits;
