const Maximum = {
  handleMaximumLimit() {
    this.markerCache = [];
    this.refreshMarkerCache();

    this.markerCache.forEach((l) => {
      this._markerGroup.removeLayer(l)
    })

    this._layer.on('pm:edit', () => {
      this.refreshMarkerCache();
    })

  },
  refreshMarkerCache() {
    const allMarkers = [...this._markerGroup.getLayers(), ...this.markerCache];
    this.markerCache = allMarkers.filter((v, i, s) => s.indexOf(v) === i);

    this._map.off('mousemove', this._filterClosestMarkers, this);
    this._map.on('mousemove', this._filterClosestMarkers, this);
  },
  _filterClosestMarkers({ latlng }) {

    this.markerCache.sort((l, t) => {
      const distanceA = l._latlng.distanceTo(latlng);
      const distanceB = t._latlng.distanceTo(latlng);
      // console.log(distanceA);
      return distanceA - distanceB;
    })

    this.markerCache.forEach((l, i) => {
      if (i > 50) {
        this._markerGroup.removeLayer(l)
      } else {
        this._markerGroup.addLayer(l)
      }
    })


  }
}

export default Maximum