L.AdvancedPolygon = L.AdvancedPolyline.extend({
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
  },
  options: {
    fill: true
  },

  isEmpty () {
    return !this._latlngs.length || !this._latlngs[0].length;
  },

  getCenter () {
    // throws error when not yet added to map as this center calculation requires projected coordinates
    if (!this._map) {
      throw new Error('Must add layer to map before using getCenter()');
    }

    let i; let j; let p1; let p2; let f; let area; let x; let y; let center;
      const points = this._rings[0];
      const len = points.length;

    if (!len) { return null; }

    // polygon centroid algorithm; only uses the first ring if there are multiple

    area = x = y = 0;

    for (i = 0, j = len - 1; i < len; j = i++) {
      p1 = points[i];
      p2 = points[j];

      f = p1.y * p2.x - p2.y * p1.x;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
      area += f * 3;
    }

    if (area === 0) {
      // Polygon is so small that all points are on same pixel.
      center = points[0];
    } else {
      center = [x / area, y / area];
    }
    return this._map.layerPointToLatLng(center);
  },

  _convertLatLngs (latlngs) {
    const result = L.Polyline.prototype._convertLatLngs.call(this, latlngs);
      const len = result.length;

    // remove last point if it equals first one
    if (len >= 2 && result[0] instanceof L.LatLng && result[0].equals(result[len - 1])) {
      result.pop();
    }
    return result;
  },

  _setLatLngs (latlngs) {
    L.Polyline.prototype._setLatLngs.call(this, latlngs);
    if (L.LineUtil.isFlat(this._latlngs)) {
      this._latlngs = [this._latlngs];
    }
  },

  _defaultShape () {
    return L.LineUtil.isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  },

  _clipPoints () {
    // polygons need a different clipping algorithm so we redefine that

    let bounds = this._renderer._bounds;
      const w = this.options.weight;
      const p = new L.Point(w, w);

    // increase clip padding by stroke width to avoid stroke on clip edges
    bounds = new L.Bounds(bounds.min.subtract(p), bounds.max.add(p));

    this._parts = [];
    if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
      return;
    }

    if (this.options.noClip) {
      this._parts = this._rings;
      return;
    }

    for (let i = 0, len = this._rings.length, clipped; i < len; i++) {
      clipped = L.PolyUtil.clipPolygon(this._rings[i], bounds, true);
      if (clipped.length) {
        this._parts.push(clipped);
      }
    }
  },

  _updatePath () {
    this._renderer._updatePoly(this, true);
  },

  // Needed by the `Canvas` renderer for interactivity
  _containsPoint (p) {
    let inside = false;
      let part; let p1; let p2; let i; let j; let k; let len; let len2;

    if (!this._pxBounds || !this._pxBounds.contains(p)) { return false; }

    // ray casting algorithm for detecting if point is in polygon
    for (i = 0, len = this._parts.length; i < len; i++) {
      part = this._parts[i];

      for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
        p1 = part[j];
        p2 = part[k];

        if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
          inside = !inside;
        }
      }
    }

    // also check if it's on polygon stroke
    return inside || L.Polyline.prototype._containsPoint.call(this, p, true);
  }

});


// @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
L.advancedPolygon = function (latlngs, options) {
  return new L.AdvancedPolygon(latlngs, options || { width: 20, color: 'black' });
}
