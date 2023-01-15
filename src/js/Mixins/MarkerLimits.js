const MarkerLimits = {
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

    // add markers closest to the mouse
    if (this.options.limitMarkersToCount > -1) {
      // re-init markers when a vertex is removed.
      // The reason is that syncing this cache with a removed marker was impossible to do
      this._layer.on('pm:vertexremoved', this._initMarkers, this);

      this._map.on('mousemove', this.throttledApplyLimitFilters, this);
    }
  },
  _removeMarkerLimitEvents() {
    this._map.off('mousemove', this.throttledApplyLimitFilters, this);
    this._layer.off('pm:edit', this.createCache, this);
    this._layer.off('pm:disable', this._removeMarkerLimitEvents, this);
    this._layer.off('pm:vertexremoved', this._initMarkers, this);
  },
  createCache() {
    const allMarkers = [...this._markerGroup.getLayers(), ...this.markerCache];
    this.markerCache = allMarkers.filter((v, i, s) => s.indexOf(v) === i);
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
  applyLimitFilters({ latlng = { lat: 0, lng: 0 } }) {
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
    const closest = markers.filter((l, i) => (limit > -1 ? i < limit : true));

    return closest;
  },
  _preventRenderMarkers: false,
  _preventRenderingMarkers(value) {
    this._preventRenderMarkers = !!value;
  },
};

export default MarkerLimits;
