L.AdvancedPolyline = L.Polyline.extend({
  initialize (latlngs, options) {
    const self = this;
    L.Polyline.prototype.initialize.call(this, latlngs, options);

    this.width = options.width;
    // eslint-disable-next-line no-unused-vars
    this.updateCallback = (function (e) {
      self._updateWeight(this);
    });
  },

  onAdd(map) {
    L.Polyline.prototype.onAdd.call(this, map);
    map.on('zoomend', this.updateCallback);
    this._updateWeight(map);
  },

  onRemove(map) {
    map.off('zoomend', this.updateCallback);
    L.Polyline.prototype.onRemove.call(this, map);
  },

  _updateWeight(map) {
    if(Object.keys(this._bounds).length !== 0)
      this.setStyle({ 'weight': this._getWeight(map, this.width) });
  },

  _getWeight (map, corridor) {
    return corridor * 2 / this._getMetersPerPixel(map);
  },

  _getMetersPerPixel(map) {
    const centerLatLng = map.getCenter(); // get map center
    const pointC = map.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
    const pointX = L.point(pointC.x + 10, pointC.y); // add 10 pixels to x

    // convert containerpoints to latlng's
    const latLngX = map.containerPointToLatLng(pointX);
    return centerLatLng.distanceTo(latLngX) / 10; // calculate distance between c and x (latitude)
  }
});

L.advancedPolyline = function (latlngs, options) {
  return new L.AdvancedPolyline(latlngs, options || { width: 2, color: 'black' });
}
