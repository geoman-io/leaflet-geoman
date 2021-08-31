L.AdvancedImageOverlay = L.ImageOverlay.extend({
  initialize(url, bounds, options) { // (String, LatLngBounds, Object)
    this._url = url;

    const corners = this._boundsToCorners(bounds);
    this._corners = corners;
    this._bounds = L.latLngBounds(corners);

    L.Util.setOptions(this, options);
  },
  _boundsToCorners(bounds) {
    const northwest = bounds.getNorthWest();
    const northeast = bounds.getNorthEast();
    const southeast = bounds.getSouthEast();
    const southwest = bounds.getSouthWest();

    return [northwest, northeast, southwest, southeast]; // NW, NE, SW, SE order
  },
  onAdd() {
    if (!this._image) {
      this._initImage();

      if (this.options.opacity < 1) {
        this._updateOpacity();
      }
    }

    if (this.options.interactive) {
      L.DomUtil.addClass(this._image, 'leaflet-interactive');
      this.addInteractiveTarget(this._image);
    }

    L.DomEvent.on(this.getElement(), 'load', () => {
      this.getPane().appendChild(this.getElement());
      this._reset(); // to set css3 rotation or smth like...
      if (this.options.rotation) {
        const units = this.options.rotation.deg ? 'deg' : 'rad';
        const value = isNaN(this.options.rotation[units]) ? 0 :this.options.rotation[units];
        this.setAngle(value, units);
      }
    });

    this._map.on('zoomanim', this._animateZoom, this);
  },
  _reset() {
    // console.log('_reset');
    const map = this._map;
    const image = this.getElement();
    // console.log(this.getElement().style.cssText)
    const latLngToLayerPoint = L.bind(map.latLngToLayerPoint, map);
    // console.log('latLngToLayerPoint: ' + latLngToLayerPoint);
    const transformMatrix = this
      ._calculateProjectiveTransform();
    // console.log('transformMatrix: ' + transformMatrix)
    const topLeft = latLngToLayerPoint(this.getCorner(0));
    const warp = L.DomUtil.getMatrixString(transformMatrix);
    // console.log('Warp: ' + warp);
    const translation = this._getTranslateString(topLeft);
    // console.log('Translation: ' + translation)
    /* See L.DomUtil.setPosition. Mainly for the purposes of L.Draggable. */
    image._leaflet_pos = topLeft;

    image.style[L.DomUtil.TRANSFORM] = [translation, warp].join(' ');
    // console.log('Image style: ' + image.style.cssText)
    /* Set origin to the upper-left corner rather than
     * the center of the image, which is the default.
     */
    image.style[`${L.DomUtil.TRANSFORM  }-origin`] = '0 0 0';
    // console.log(this.getElement().style.cssText)
  },
  getCorners() {
    return this._corners;
  },
  getCorner(i) {
    return this._corners[i];
  },
  setCorner(corner, latlng) {

    this._corners[corner] = latlng;

    this.setBounds(L.latLngBounds(this.getCorners()));

    return this;
  },
  setCorners(latlngObj) {
    // const map = this._map;
    // const zoom = map.getZoom();
    let i = 0;

    // this is to fix https://github.com/publiclab/Leaflet.DistortableImage/issues/402
    // for (let k in latlngObj) {
    //   if (this._cornerExceedsMapLats(zoom, latlngObj[k], map)) {
    //     // calling reset / update w/ the same corners bc it prevents a marker flicker for rotate
    //     this.setBounds(L.latLngBounds(this.getCorners()));
    //     this.fire('update');
    //     return;
    //   }
    // }

    for (const k in latlngObj) {
      this._corners[i] = latlngObj[k];
      i += 1;
    }

    this.setBounds(L.latLngBounds(this.getCorners()));

    return this;
  },
  getAngle(unit = 'deg') {
    console.log('getAngle');
    console.log(this.getElement().style.cssText)
    const matrixBeforesplice = this.getElement().style[L.DomUtil.TRANSFORM]
      .split('matrix3d')[1];
    // if (matrixBeforesplice === undefined)
    //   return 0;
    const matrix = matrixBeforesplice.slice(1, -1)
      .split(',');
    const row0x = matrix[0];
    const row0y = matrix[1];
    const row1x = matrix[4];
    const row1y = matrix[5];
    const determinant = row0x * row1y - row0y * row1x;
    let angle = L.TrigUtil.calcAngle(row0x, row0y, 'rad');
    if (determinant < 0) {
      angle += angle < 0 ? Math.PI : -Math.PI;
    }
    if (angle < 0) {
      angle = 2 * Math.PI + angle;
    }

    return unit === 'deg' ?
      Math.round(L.TrigUtil.radiansToDegrees(angle)) :
      L.Util.formatNum(angle, 2);
  },
  setAngle(angle, unit = 'deg') {
    // console.log('setAngle: ' + angle);
    const currentAngle = this.getAngle(unit);
    const angleToRotateBy = angle - currentAngle;
    this.rotateBy(angleToRotateBy, unit);

    return this;
  },
  // image (vertex) centroid calculation
  getCenter() {
    const map = this._map;
    const reduce = this.getCorners().reduce((agg, corner) => agg.add(map.project(corner)), L.point(0, 0));
    return map.unproject(reduce.divideBy(4));
  },
  rotateBy(angle, unit = 'deg') {
    const map = this._map;
    const center = map.project(this.getCenter());
    const corners = {};
    let i;
    let p;
    let q;

    if (unit === 'deg') {
      angle = L.TrigUtil.degreesToRadians(angle);
    }

    for (i = 0; i < 4; i+=1) {
      p = map.project(this.getCorner(i)).subtract(center);
      q = L.point(
        Math.cos(angle) * p.x - Math.sin(angle) * p.y,
        Math.sin(angle) * p.x + Math.cos(angle) * p.y
      );
      corners[i] = map.unproject(q.add(center));
    }

    this.setCorners(corners);

    return this;
  },
  /* Copied from Leaflet v0.7 https://github.com/Leaflet/Leaflet/blob/66282f14bcb180ec87d9818d9f3c9f75afd01b30/src/dom/DomUtil.js#L189-L199 */
  /* since L.DomUtil.getTranslateString() is deprecated in Leaflet v1.0 */
  _getTranslateString(point) {
    // on WebKit browsers (Chrome/Safari/iOS Safari/Android)
    // using translate3d instead of translate
    // makes animation smoother as it ensures HW accel is used.
    // Firefox 13 doesn't care
    // (same speed either way), Opera 12 doesn't support translate3d

    const is3d = L.Browser.webkit3d;
    const open = `translate${  is3d ? '3d' : ''  }(`;
    const close = `${is3d ? ',0' : ''  })`;

    return `${open + point.x  }px,${  point.y  }px${  close}`;
  },
  _animateZoom(event) {
    const map = this._map;
    const image = this.getElement();
    const latLngToNewLayerPoint = (latlng) => map._latLngToNewLayerPoint(latlng, event.zoom, event.center);
    const transformMatrix = this._calculateProjectiveTransform(
      latLngToNewLayerPoint
    );
    const topLeft = latLngToNewLayerPoint(this.getCorner(0));
    const warp = L.DomUtil.getMatrixString(transformMatrix);
    const translation = this._getTranslateString(topLeft);

    /* See L.DomUtil.setPosition. Mainly for the purposes of L.Draggable. */
    image._leaflet_pos = topLeft;

    image.style[L.DomUtil.TRANSFORM] = [translation, warp].join(' ');
  },
  preciseLatLngToCartesian(latLng) {
    const map = this._map;
    return map.project(latLng)._subtract(map.getPixelOrigin())
  },
  _calculateProjectiveTransform(latLngToCartesian) {
    /* Setting reasonable but made-up image defaults
     * allow us to place images on the map before
     * they've finished downloading. */
    // console.log('_calculateProjectiveTransform');
    // console.log('latLngToCartesian: ' + latLngToCartesian)
    let latLngToCartesianImplementation = latLng =>  this.preciseLatLngToCartesian(latLng);
    // console.log(latLngToCartesianImplementation)
    if (latLngToCartesian !== undefined)
      latLngToCartesianImplementation = latLngToCartesian;
    const offset = latLngToCartesianImplementation(this.getCorner(0));
    // console.log('_calculateProjectiveTransform offset: ' + offset);
    const w = this.getElement().offsetWidth || 500;
    const h = this.getElement().offsetHeight || 375;
    // console.log('w: ' + w);
    // console.log('h: ' + h);
    const c = [];
    let j;
    /* Convert corners to container points (i.e. cartesian coordinates). */
    for (j = 0; j < 4; j+=1) {
      // console.log('Corner #' + j + ': ' + latLngToCartesianImplementation(this.getCorner(j)));
      // console.log('Corner substract #' + j + ': ' + this.getCorner(j));
      c.push(latLngToCartesianImplementation(this.getCorner(j))._subtract(offset));
    }
    // console.log('C: ' +c);

    /*
     * This matrix describes the action of
     * the CSS transform on each corner of the image.
     * It maps from the coordinate system centered
     * at the upper left corner of the image
     * to the region bounded by the latlngs in this._corners.
     * For example:
     * 0, 0, c[0].x, c[0].y
     * says that the upper-left corner of the image
     * maps to the first latlng in this._corners.
     */
    return L.MatrixUtil.general2DProjection(
      0, 0, c[0].x, c[0].y,
      w, 0, c[1].x, c[1].y,
      0, h, c[2].x, c[2].y,
      w, h, c[3].x, c[3].y
    );
  },
});

L.advancedImageOverlay = (url, bounds, options) => new L.AdvancedImageOverlay(url, bounds, options);
