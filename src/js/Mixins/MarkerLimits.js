const MarkerLimits = {
  filterMarkerGroup() {
    // don't do it if the option is disabled

    // define cache
    this.markerCache = [];
    this.refreshMarkerCache();

    // refresh cache when layer was edited (e.g. when a vertex was added or removed)
    this._layer.on('pm:edit', () => {
      this.refreshMarkerCache();
    })

    // remove events when edit mode is disabled
    this._layer.on('pm:disable', () => {
      this._map.off('mousemove', this._filterClosestMarkers, this);
    });



  },
  refreshMarkerCache() {
    // get all markers
    const allMarkers = [...this._markerGroup.getLayers(), ...this.markerCache];

    // remove duplicates
    this.markerCache = allMarkers.filter((v, i, s) => s.indexOf(v) === i);

    // When an option is set, remove all markers now
    if (this.options.limitMarkersToCount > -1) {
      this.markerCache.forEach((l) => {
        this._markerGroup.removeLayer(l)
      })
    }

    // add markers closest to the mouse
    if (this.options.limitMarkersToCount > -1) {
      this._map.off('mousemove', this._filterClosestMarkers, this);
      this._map.on('mousemove', this._filterClosestMarkers, this);
    }
  },

  _filterClosestMarkers({ latlng }) {
    this.markerCache.sort((l, t) => {
      const distanceA = l._latlng.distanceTo(latlng);
      const distanceB = t._latlng.distanceTo(latlng);

      return distanceA - distanceB;
    })

    this.markerCache.forEach((l, i) => {
      if (i >= this.options.limitMarkersToCount) {
        this._markerGroup.removeLayer(l)
      } else {
        this._markerGroup.addLayer(l)
      }
    })


  }
}

export default MarkerLimits