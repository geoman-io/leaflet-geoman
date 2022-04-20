import Edit from './L.PM.Edit';
import { destinationOnLine } from '../helpers';

Edit.CircleMarker = Edit.extend({
  _shape: 'CircleMarker',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  },
  // TODO: remove default option in next major Release
  enable(options = { draggable: true, snappable: true }) {
    L.Util.setOptions(this, options);

    // layer is not allowed to edit
    // cancel when map isn't available, this happens when it is removed before this fires
    if (!this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }

    this._map = this._layer._map;

    if (this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }
    this.applyOptions();

    // if shape gets removed from map, disable edit mode
    this._layer.on('remove', this.disable, this);

    // change state
    this._enabled = true;

    this._layer.on('pm:dragstart', this._onDragStart, this);
    this._layer.on('pm:drag', this._onMarkerDrag, this);
    this._layer.on('pm:dragend', this._onMarkerDragEnd, this);

    // create polygon around the circle border
    this._updateHiddenPolyCircle();

    this._fireEnable();
  },
  disable() {
    // prevent disabling if layer is being dragged
    if (this._dragging) {
      return;
    }

    if (this._helperLayers) {
      this._helperLayers.clearLayers();
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map;
    }

    if (!this._map) {
      if (this.options.editable) {
        this._map.off('move', this._syncMarkers, this);
        if (this._outerMarker) {
          // update marker latlng when snapped latlng radius is out of min/max
          this._outerMarker.on('drag', this._handleOuterMarkerSnapping, this);
        }
      } else {
        this._map.off('move', this._updateHiddenPolyCircle, this);
      }
    }
    // disable dragging, as this could have been active even without being enabled
    this.disableLayerDrag();

    this._layer.off('contextmenu', this._removeMarker, this);
    this._layer.off('remove', this.disable, this);

    // only fire events if it was enabled before
    if (this.enabled()) {
      if (this._layerEdited) {
        this._fireUpdate();
      }
      this._layerEdited = false;
      this._fireDisable();
    }

    this._enabled = false;
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
  applyOptions() {
    // Use the not editable and only draggable version
    if (!this.options.editable && this.options.draggable) {
      this.enableLayerDrag();
    } else {
      this.disableLayerDrag();
    }

    // Make it editable like a Circle
    if (this.options.editable) {
      this._initMarkers();
      this._map.on('move', this._syncMarkers, this);
    } else {
      // only update the circle border poly
      this._map.on('move', this._updateHiddenPolyCircle, this);
    }

    // init snapping in different ways
    if (this.options.snappable) {
      if (this.options.editable) {
        this._initSnappableMarkers();

        // TODO: switch back to move event once this leaflet issue is solved:
        // https://github.com/Leaflet/Leaflet/issues/6492
        this._centerMarker.on('drag', this._moveCircle, this);

        if (this.options.editable) {
          // update marker latlng when snapped latlng radius is out of min/max
          this._outerMarker.on('drag', this._handleOuterMarkerSnapping, this);
        }
        // sync the hintline with hint marker
        this._outerMarker.on('move', this._syncHintLine, this);
        this._outerMarker.on('move', this._syncCircleRadius, this);
      } else {
        this._initSnappableMarkersDrag();
      }
    } else if (this.options.editable) {
      this._disableSnapping();
    } else {
      this._disableSnappingDrag();
    }

    // enable removal for the marker
    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
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
  _getLatLngOnCircle(center, radius) {
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);
    return this._map.unproject(pointB);
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
    if (this.options.draggable) {
      L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');
    } else {
      marker.dragging.disable();
    }
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
  _moveCircle() {
    const center = this._centerMarker.getLatLng();
    this._layer.setLatLng(center);

    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);
    // don't call .setLatLng() because it fires the `move` event and then the radius is changed because of _syncCircleRadius #892
    this._outerMarker._latlng = outer;
    this._outerMarker.update();
    this._syncHintLine();

    this._updateHiddenPolyCircle();

    this._fireCenterPlaced('Edit');
    this._fireChange(this._layer.getLatLng(), 'Edit');
  },
  _syncMarkers() {
    const center = this._layer.getLatLng();
    const radius = this._layer._radius;
    const outer = this._getLatLngOnCircle(center, radius);
    this._outerMarker.setLatLng(outer);
    this._centerMarker.setLatLng(center);
    this._syncHintLine();
    this._updateHiddenPolyCircle();
  },
  _resizeCircle() {
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
    this._syncHintLine();
    this._syncCircleRadius();
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    const distance = this._map.project(A).distanceTo(this._map.project(B));
    if (
      this.options.minRadiusCircleMarker &&
      distance < this.options.minRadiusCircleMarker
    ) {
      this._layer.setRadius(this.options.minRadiusCircleMarker);
    } else if (
      this.options.maxRadiusCircleMarker &&
      distance > this.options.maxRadiusCircleMarker
    ) {
      this._layer.setRadius(this.options.maxRadiusCircleMarker);
    } else {
      this._layer.setRadius(distance);
    }

    this._updateHiddenPolyCircle();
    this._fireChange(this._layer.getLatLng(), 'Edit');
  },
  _syncHintLine() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();
    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([A, B]);
  },
  _removeMarker() {
    if (this.options.editable) {
      this.disable();
    }
    this._layer.remove();
    this._fireRemove(this._layer);
    this._fireRemove(this._map, this._layer);
  },
  _onDragStart() {
    this._map.pm.Draw.CircleMarker._layerIsDragging = true;
    // if (!this._vertexValidation('move', e)) {
    // }
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
    if (
      draggedMarker instanceof L.Marker &&
      !this._vertexValidationDrag(draggedMarker)
    ) {
      return;
    }

    this._fireMarkerDrag(e);
  },
  _onMarkerDragEnd(e) {
    this._map.pm.Draw.CircleMarker._layerIsDragging = false;

    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDragEnd(draggedMarker)) {
      return;
    }
    if (this.options.editable) {
      this._fireEdit();
      this._layerEdited = true;
    }
    this._fireMarkerDragEnd(e);
  },
  // _initSnappableMarkers when option editable is not true
  _initSnappableMarkersDrag() {
    const marker = this._layer;

    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.on('pm:drag', this._handleSnapping, this);

    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.on('pm:dragend', this._cleanupSnapping, this);

    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  },
  // _disableSnapping when option editable is not true
  _disableSnappingDrag() {
    const marker = this._layer;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  },
  _updateHiddenPolyCircle() {
    const map = this._layer._map || this._map;
    if (map) {
      const radius = L.PM.Utils.pxRadiusToMeterRadius(
        this._layer.getRadius(),
        map,
        this._layer.getLatLng()
      );
      const _layer = L.circle(this._layer.getLatLng(), this._layer.options);
      _layer.setRadius(radius);

      const crsSimple = map && map.pm._isCRSSimple();
      if (this._hiddenPolyCircle) {
        this._hiddenPolyCircle.setLatLngs(
          L.PM.Utils.circleToPolygon(_layer, 200, !crsSimple).getLatLngs()
        );
      } else {
        this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(
          _layer,
          200,
          !crsSimple
        );
      }

      if (!this._hiddenPolyCircle._parentCopy) {
        this._hiddenPolyCircle._parentCopy = this._layer;
      }
    }
  },
  _getNewDestinationOfOuterMarker() {
    const latlng = this._centerMarker.getLatLng();
    let secondLatLng = this._outerMarker.getLatLng();
    const distance = this._map
      .project(latlng)
      .distanceTo(this._map.project(secondLatLng));
    if (
      this.options.minRadiusCircleMarker &&
      distance < this.options.minRadiusCircleMarker
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        L.PM.Utils.pxRadiusToMeterRadius(
          this.options.minRadiusCircleMarker,
          this._map,
          latlng
        )
      );
    } else if (
      this.options.maxRadiusCircleMarker &&
      distance > this.options.maxRadiusCircleMarker
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        L.PM.Utils.pxRadiusToMeterRadius(
          this.options.maxRadiusCircleMarker,
          this._map,
          latlng
        )
      );
    }
    return secondLatLng;
  },
  _handleOuterMarkerSnapping() {
    if (this._outerMarker._snapped) {
      const latlng = this._centerMarker.getLatLng();
      const secondLatLng = this._outerMarker.getLatLng();
      const distance = this._map
        .project(latlng)
        .distanceTo(this._map.project(secondLatLng));
      if (
        this.options.minRadiusCircleMarker &&
        distance < this.options.minRadiusCircleMarker
      ) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      } else if (
        this.options.maxRadiusCircleMarker &&
        distance > this.options.maxRadiusCircleMarker
      ) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      }
    }
    // calculate the new latlng of marker if radius is out of min/max
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  },
});
