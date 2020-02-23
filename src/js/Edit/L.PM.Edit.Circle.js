import Edit from './L.PM.Edit';

Edit.Circle = Edit.extend({
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
      // sync the hintline with hint marker
      this._outerMarker.on('move', this._syncHintLine, this);
      this._outerMarker.on('move', this._syncCircleRadius, this);
      this._centerMarker.on('move', this._moveCircle, this);
    } else {
      this._disableSnapping();
    }
  },
  _disableSnapping() {
    this._markers.forEach(marker => {
      marker.off('move', this._syncHintLine, this);
      marker.off('move', this._syncCircleRadius, this);
      marker.off('drag', this._handleSnapping, this);
      marker.off('dragend', this._cleanupSnapping, this);
    });

    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  enabled() {
    return this._enabled;
  },
  enable(options) {
    L.Util.setOptions(this, options);

    this._map = this._layer._map;

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    // change state
    this._enabled = true;

    // init markers
    this._initMarkers();

    this.applyOptions();

    // if polygon gets removed from map, disable edit mode
    this._layer.on('remove', e => {
      this.disable(e.target);
    });
  },
  disable(layer = this._layer) {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    }

    // prevent disabling if layer is being dragged
    if (layer.pm._dragging) {
      return false;
    }
    layer.pm._enabled = false;
    layer.pm._helperLayers.clearLayers();

    // clean up draggable
    layer.off('mousedown');
    layer.off('mouseup');

    // remove draggable class
    const el = layer._path ? layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

    if (this._layerEdited) {
      this._layer.fire('pm:update', {});
    }
    this._layerEdited = false;

    return true;
  },
  _initMarkers() {
    const map = this._map;

    // cleanup old ones first
    if (this._helperLayers) {
      this._helperLayers.clearLayers();
    }

    // add markerGroup to map, markerGroup includes regular and middle markers
    this._helperLayers = new L.LayerGroup();
    this._helperLayers._pmTempLayer = true;
    this._helperLayers.addTo(map);

    // create marker for each coordinate
    const center = this._layer.getLatLng();
    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);

    this._centerMarker = this._createCenterMarker(center);
    this._outerMarker = this._createOuterMarker(outer);
    this._markers = [this._centerMarker, this._outerMarker];
    this._createHintLine(this._centerMarker, this._outerMarker);


  },
  _getLatLngOnCircle(center, radius) {
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);

    return this._map.unproject(pointB);
  },
  _resizeCircle() {
    this._syncHintLine();
    this._syncCircleRadius();
  },
  _moveCircle(e) {
    const center = e.latlng;
    this._layer.setLatLng(center);

    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);
    this._outerMarker.setLatLng(outer);
    this._syncHintLine();

    this._layer.fire('pm:centerplaced', {
      layer: this._layer,
      latlng: center,
    });
  },
  _onMarkerDragStart(e) {
    this._layer.fire('pm:markerdragstart', {
      markerEvent: e,
    });
  },
  _onMarkerDragEnd(e) {
    // fire edit event
    this._fireEdit();

    // fire markerdragend event
    this._layer.fire('pm:markerdragend', {
      markerEvent: e,
    });
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    const distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncHintLine() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([A, B]);
  },
  _createHintLine(markerA, markerB) {
    const A = markerA.getLatLng();
    const B = markerB.getLatLng();
    this._hintline = L.polyline([A, B], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;
    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker(latlng) {
    const marker = this._createMarker(latlng);

    L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');
    // TODO: switch back to move event once this leaflet issue is solved:
    // https://github.com/Leaflet/Leaflet/issues/6492
    marker.on('drag', this._moveCircle, this);
    // marker.on('contextmenu', this._removeMarker, this);

    return marker;
  },
  _createOuterMarker(latlng) {
    const marker = this._createMarker(latlng);

    marker.on('drag', this._resizeCircle, this);

    return marker;
  },
  _createMarker(latlng) {
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: 'marker-icon' }),
    });

    marker._origLatLng = latlng;
    marker._pmTempLayer = true;

    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    this._helperLayers.addLayer(marker);

    return marker;
  },
  _fireEdit() {
    // fire edit event
    this._layer.fire('pm:edit');
    this._layerEdited = true;
  },
});
