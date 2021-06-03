import Edit from './L.PM.Edit';
import { destinationOnLine } from '../helpers';

Edit.Circle = Edit.extend({
  _shape: 'Circle',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  },
  enable(options) {
    L.Util.setOptions(this, options);

    this._map = this._layer._map;

    // layer is not allowed to edit
    if (!this.options.allowEditing) {
      this.disable();
      return;
    }

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
    this._layer.on('remove', (e) => {
      this.disable(e.target);
    });
    // create polygon around the circle border
    this._updateHiddenPolyCircle();

    this._fireEnable();
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

    this._centerMarker.off('dragstart', this._onCircleDragStart, this);
    this._centerMarker.off('drag', this._onCircleDrag, this);
    this._centerMarker.off('dragend', this._onCircleDragEnd, this);
    this._outerMarker.off('drag', this._handleOuterMarkerSnapping, this);

    layer.pm._enabled = false;
    layer.pm._helperLayers.clearLayers();

    // remove draggable class
    const el = layer._path ? layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');

    if (this._layerEdited) {
      this._fireUpdate();
    }
    this._layerEdited = false;

    this._fireDisable();
    return true;
  },
  enabled() {
    return this._enabled;
  },
  toggleEdit(options) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
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
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
      // update marker latlng when snapped latlng radius is out of min/max
      this._outerMarker.on('drag', this._handleOuterMarkerSnapping, this);
      // sync the hintline with hint marker
      this._outerMarker.on('move', this._syncHintLine, this);
      this._outerMarker.on('move', this._syncCircleRadius, this);
      this._centerMarker.on('move', this._moveCircle, this);
    } else {
      this._disableSnapping();
    }
  },
  _createHintLine(markerA, markerB) {
    const A = markerA.getLatLng();
    const B = markerB.getLatLng();
    this._hintline = L.polyline([A, B], this.options.hintlineStyle);
    this._setPane(this._hintline, 'layerPane');
    this._hintline._pmTempLayer = true;
    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker(latlng) {
    const marker = this._createMarker(latlng);

    L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');
    // TODO: switch back to move event once this leaflet issue is solved:
    // https://github.com/Leaflet/Leaflet/issues/6492
    marker.on('drag', this._moveCircle, this);

    marker.on('dragstart', this._onCircleDragStart, this);
    marker.on('drag', this._onCircleDrag, this);
    marker.on('dragend', this._onCircleDragEnd, this);
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
    this._setPane(marker, 'vertexPane');

    marker._origLatLng = latlng;
    marker._pmTempLayer = true;

    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('drag', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    this._helperLayers.addLayer(marker);

    return marker;
  },
  _resizeCircle() {
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
    this._syncHintLine();
    this._syncCircleRadius();
  },
  _moveCircle(e) {
    const draggedMarker = e.target;
    if (draggedMarker._cancelDragEventChain) {
      return;
    }

    const center = e.latlng;
    this._layer.setLatLng(center);

    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);
    // don't call .setLatLng() because it fires the `move` event and then the radius is changed because of _syncCircleRadius #892
    this._outerMarker._latlng = outer;
    this._outerMarker.update();
    this._syncHintLine();

    this._updateHiddenPolyCircle();

    this._fireCenterPlaced('Edit');
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    const distance = A.distanceTo(B);

    if (
      this.options.minRadiusCircle &&
      distance < this.options.minRadiusCircle
    ) {
      this._layer.setRadius(this.options.minRadiusCircle);
    } else if (
      this.options.maxRadiusCircle &&
      distance > this.options.maxRadiusCircle
    ) {
      this._layer.setRadius(this.options.maxRadiusCircle);
    } else {
      this._layer.setRadius(distance);
    }

    this._updateHiddenPolyCircle();
  },
  _syncHintLine() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([A, B]);
  },
  _disableSnapping() {
    this._markers.forEach((marker) => {
      marker.off('move', this._syncHintLine, this);
      marker.off('move', this._syncCircleRadius, this);
      marker.off('drag', this._handleSnapping, this);
      marker.off('dragend', this._cleanupSnapping, this);
    });

    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  _onMarkerDragStart(e) {
    if (!this._vertexValidation('move', e)) {
      return;
    }
    this._fireMarkerDragStart(e);
  },
  _onMarkerDrag(e) {
    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDrag(draggedMarker)) {
      return;
    }
    this._fireMarkerDrag(e);
  },
  _onMarkerDragEnd(e) {
    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDragEnd(draggedMarker)) {
      return;
    }

    // fire edit event
    this._fireEdit();
    this._layerEdited = true;
    this._fireMarkerDragEnd(e);
  },
  _onCircleDragStart(e) {
    if (!this._vertexValidationDrag(e.target)) {
      // we create a new flag, because the other flag is cleared before _fireDragEnd is called
      this._vertexValidationReset = true;
      return;
    }
    delete this._vertexValidationReset;
    this._fireDragStart(e);
  },
  _onCircleDrag(e) {
    if (this._vertexValidationReset) {
      return;
    }
    this._fireDrag(e);
  },
  _onCircleDragEnd() {
    if (this._vertexValidationReset) {
      delete this._vertexValidationReset;
      return;
    }
    this._fireDragEnd();
  },
  _updateHiddenPolyCircle() {
    if (this._hiddenPolyCircle) {
      this._hiddenPolyCircle.setLatLngs(
        L.PM.Utils.circleToPolygon(this._layer, 200).getLatLngs()
      );
    } else {
      this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(this._layer, 200);
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer;
    }
  },
  _getLatLngOnCircle(center, radius) {
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);

    return this._map.unproject(pointB);
  },
  _getNewDestinationOfOuterMarker() {
    const latlng = this._centerMarker.getLatLng();
    let secondLatLng = this._outerMarker.getLatLng();
    const distance = latlng.distanceTo(secondLatLng);
    if (
      this.options.minRadiusCircle &&
      distance < this.options.minRadiusCircle
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this.options.minRadiusCircle
      );
    } else if (
      this.options.maxRadiusCircle &&
      distance > this.options.maxRadiusCircle
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this.options.maxRadiusCircle
      );
    }
    return secondLatLng;
  },
  _handleOuterMarkerSnapping() {
    if (this._outerMarker._snapped) {
      const latlng = this._centerMarker.getLatLng();
      const secondLatLng = this._outerMarker.getLatLng();
      const distance = latlng.distanceTo(secondLatLng);
      if (
        this.options.minRadiusCircle &&
        distance < this.options.minRadiusCircle
      ) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      } else if (
        this.options.maxRadiusCircle &&
        distance > this.options.maxRadiusCircle
      ) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      }
    }
    // calculate the new latlng of marker if radius is out of min/max
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  },
});
