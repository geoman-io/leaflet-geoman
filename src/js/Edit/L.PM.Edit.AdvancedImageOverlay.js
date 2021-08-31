import Edit from './L.PM.Edit';

Edit.AdvancedImageOverlay = Edit.extend({
  _shape: 'ImageOverlay',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  enabled() {
    return this._enabled;
  },
  enable() {
    this._map = this._layer._map;
    if (!this._map) {
      return;
    }
    if (this.enabled()) {
      return;
    }

    this._enableDragging();


    // this._layer.on('dragstart', () => console.log('dragstart'));
    // this._layer.on('drag', () => console.log('drag'));
    // this._layer.on('dragend', () => console.log('dragend'));
    // this._layer.on('rotate', () => console.log('rotate'));
    // this._layer.on('rotateend', () => console.log('rotateend'));
    // this._layer.on('rotatestart', () => console.log('rotatestart'));


    // change state
    this._enabled = true;

    // create markers for four corners of ImageOverlay
    this._initMarkers();

    this._layer.fire('enable');
  },
  disable() {
    // only fire events if it was enabled before
    if (!this.enabled()) {
      return;
    }

    this._enabled = false;

    this._markers.forEach(marker => this._map.removeLayer(marker));

    this._disableDragging();
    this._layer.off('dragstart');
    this._layer.off('dragend');

    this._layer.fire('disable');
  },
  _enableDragging() {
    const overlay = this._layer;
    const map = overlay._map;

    this.dragging = new L.Draggable(overlay.getElement());
    this.dragging.enable();
    this.dragging.on('dragstart', () => this._layer.fire('dragstart'));
    this.dragging.on('dragend', () => this._layer.fire('dragend'));

    /*
     * Adjust default behavior of L.Draggable, which overwrites the CSS3
     * distort transformations that we set when it calls L.DomUtil.setPosition.
     */
    this.dragging._updatePosition = () => {
      const topLeft = overlay.getCorner(0);
      const delta = this.dragging._newPos.subtract(map.latLngToLayerPoint(topLeft));
      let currentPoint;
      const corners = {};
      let i;
      this.dragging.fire('predrag');
      for (i = 0; i < 4; i += 1) {
        currentPoint = map.latLngToLayerPoint(overlay.getCorner(i));
        corners[i] = map.layerPointToLatLng(currentPoint.add(delta));
      }
      overlay.setCorners(corners);
      this._adjustMarkers();
      this.dragging.fire('drag');
      overlay.fire('drag');
    };
  },

  _disableDragging() {
    if (this.dragging._enabled) {
      this.dragging.disable();
      this._layer.off('drag');
      this.dragging.off('dragstart');
      this.dragging.off('dragend');
      delete this.dragging;
    }
  },
  _initMarkers() {
    const corners = this._layer.getCorners();
    // create markers for four corners of ImageOverlay
    this._markers = [];
    this._markers = corners.map(this._createMarker, this);
  },
  // creates initial markers for coordinates
  _createMarker(latlng) {
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: 'marker-icon' }),
    }).addTo(this._map);

    marker.on('dragstart', this._onMarkerDragStart, this);
    marker.on('drag', this._onMarkerDrag, this);
    marker.on('dragend', this._onMarkerDragEnd, this);

    return marker;
  },
  _onMarkerDragStart(e) {
    const draggedMarker = e.target;
    draggedMarker._origLatLng = draggedMarker.getLatLng();
    this._layer.fire('rotatestart');
  },
  _onMarkerDrag(e) {
    const draggedMarker = e.target;
    const angle = this._calculateAngleDelta(draggedMarker._origLatLng, draggedMarker.getLatLng());
    draggedMarker._origLatLng = draggedMarker.getLatLng();
    this.rotateBy(angle);
    this._layer.fire('rotate');
  },
  _onMarkerDragEnd() {
    this._layer.fire('rotateend');
  },
  /* Takes two latlngs and calculates the angle between them. */
  _calculateAngleDelta(latlngA, latlngB) {
    const overlay = this._layer;
    const map = overlay._map;
    const centerPoint = map.latLngToLayerPoint(overlay.getBounds().getCenter());
    const formerPoint = map.latLngToLayerPoint(latlngA);
    const newPoint = map.latLngToLayerPoint(latlngB);
    const initialAngle = Math.atan2(centerPoint.y - formerPoint.y, centerPoint.x - formerPoint.x);
    const newAngle = Math.atan2(centerPoint.y - newPoint.y, centerPoint.x - newPoint.x);

    return newAngle - initialAngle;
  },
  rotateBy(angle) {
    this._layer.rotateBy(angle, 'rad');
    this._adjustMarkers();
  },
  _adjustMarkers() {
    this._layer.getCorners().forEach((coords, index) => this._markers[index].setLatLng(coords));
  }
});
