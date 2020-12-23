import Edit from './L.PM.Edit';
import Utils from "../L.PM.Utils";
import {destinationOnLine, isArrayEqual} from "../helpers";
import cloneDeep from "lodash/cloneDeep";

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

    this.setMap();

    if (!this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    // change state
    this._enabled = true;
    this._setRevertLatLng();
    this._revertRadius = this._layer.getRadius();

    // init markers
    this._initMarkers();

    this.applyOptions();

    // if polygon gets removed from map, disable edit mode
    this._layer.on('remove', e => {
      this.disable(e.target);
    });
    // create polygon around the circle border
    this._updateHiddenPolyCircle();

    Utils._fireEvent(this._layer,'pm:enable', { layer: this._layer, shape: this.getShape() });
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

    this._centerMarker.off('dragstart', this._fireDragStart, this);
    this._centerMarker.off('drag', this._fireDrag, this);
    this._centerMarker.off('dragend', this._fireDragEnd, this);
    this._outerMarker.off('drag',this._handleOuterMarkerSnapping, this);

    layer.pm._enabled = false;
    this._removeRevertLatLng();
    delete this._revertRadius;
    layer.pm._helperLayers.clearLayers();
    // clean up draggable
    layer.off('mousedown');
    layer.off('mouseup');

    // remove draggable class
    const el = layer._path ? layer._path : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');


    if (this._layerEdited) {
      Utils._fireEvent(this._layer,'pm:update', { layer: this._layer, shape: this.getShape() });
    }
    this._layerEdited = false;

    Utils._fireEvent(this._layer,'pm:disable', { layer: this._layer, shape: this.getShape() });
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
      this._outerMarker.on('drag',this._handleOuterMarkerSnapping, this);
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
    this._hintline._pmTempLayer = true;
    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker(latlng) {
    const marker = this._createMarker(latlng);

    L.DomUtil.addClass(marker._icon, 'leaflet-pm-draggable');
    // TODO: switch back to move event once this leaflet issue is solved:
    // https://github.com/Leaflet/Leaflet/issues/6492
    marker.on('drag', this._moveCircle, this);

    marker.on('dragstart', this._fireDragStart, this);
    marker.on('drag', this._fireDrag, this);
    marker.on('dragend', this._fireDragEnd, this);
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
    const center = e.latlng;
    this._layer.setLatLng(center);

    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);
    this._outerMarker.setLatLng(outer);
    this._syncHintLine();

    this._updateHiddenPolyCircle();

    Utils._fireEvent(this._layer,'pm:centerplaced', {
      layer: this._layer,
      latlng: center,
      shape: this.getShape()
    });
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    const distance = A.distanceTo(B);

    if(this.options.minRadiusCircle && distance < this.options.minRadiusCircle) {
      this._layer.setRadius(this.options.minRadiusCircle);
    }else if(this.options.maxRadiusCircle && distance > this.options.maxRadiusCircle) {
      this._layer.setRadius(this.options.maxRadiusCircle);
    }else{
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
    this._markers.forEach(marker => {
      marker.off('move', this._syncHintLine, this);
      marker.off('move', this._syncCircleRadius, this);
      marker.off('drag', this._handleSnapping, this);
      marker.off('dragend', this._cleanupSnapping, this);
    });

    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  _onMarkerDragStart(e) {
    Utils._fireEvent(this._layer,'pm:markerdragstart', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath: undefined
    });
  },
  _onMarkerDrag(e) {
    Utils._fireEvent(this._layer,'pm:markerdrag', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath: undefined
    });
  },
  _onMarkerDragEnd(e) {
    // fire edit event
    this._fireEdit();

    // fire markerdragend event
    Utils._fireEvent(this._layer,'pm:markerdragend', {
      layer: this._layer,
      markerEvent: e,
      shape: this.getShape(),
      indexPath: undefined
    });
  },
  _fireEdit() {
    // fire edit event
    Utils._fireEvent(this._layer,'pm:edit', { layer: this._layer, shape: this.getShape() });
    Utils._fireEvent(this._map,'pm:edit', { layer: this._layer, shape: this.getShape() });
    this._layerEdited = true;
  },
  _fireDragStart() {
    Utils._fireEvent(this._layer,'pm:dragstart', { layer: this._layer, shape: this.getShape() });
  },
  _fireDrag(e) {
    Utils._fireEvent(this._layer,'pm:drag', Object.assign({},e, {shape:this.getShape()}));
  },
  _fireDragEnd() {
    Utils._fireEvent(this._layer,'pm:dragend', { layer: this._layer, shape: this.getShape() });
  },
  _updateHiddenPolyCircle() {
    if (this._hiddenPolyCircle) {
      this._hiddenPolyCircle.setLatLngs(Utils.circleToPolygon(this._layer, 200).getLatLngs());
    } else {
      this._hiddenPolyCircle = Utils.circleToPolygon(this._layer, 200);
    }

    if (!this._hiddenPolyCircle._parentCopy) {
      this._hiddenPolyCircle._parentCopy = this._layer
    }
  },
  _getLatLngOnCircle(center, radius) {
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);

    return this._map.unproject(pointB);
  },
  _getNewDestinationOfOuterMarker(){
    const latlng = this._centerMarker.getLatLng();
    let secondLatLng = this._outerMarker.getLatLng();
    const distance = latlng.distanceTo(secondLatLng);
    if(this.options.minRadiusCircle && distance < this.options.minRadiusCircle) {
      secondLatLng = destinationOnLine(this._map,latlng,secondLatLng,this.options.minRadiusCircle);
    }else if(this.options.maxRadiusCircle && distance > this.options.maxRadiusCircle) {
      secondLatLng = destinationOnLine(this._map,latlng,secondLatLng,this.options.maxRadiusCircle);
    }
    return secondLatLng;
  },
  _handleOuterMarkerSnapping(){
    if(this._outerMarker._snapped) {
      const latlng = this._centerMarker.getLatLng();
      const secondLatLng = this._outerMarker.getLatLng();
      const distance = latlng.distanceTo(secondLatLng);
      if(this.options.minRadiusCircle && distance < this.options.minRadiusCircle) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      } else if(this.options.maxRadiusCircle && distance > this.options.maxRadiusCircle) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      }
    }
    // calculate the new latlng of marker if radius is out of min/max
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  }
});
