const DragMixin = {
  enableLayerDrag() {
    // before enabling layer drag, disable layer editing
    this.disable();

    // if layer never enabled and _map is not set (for snapping)
    if (!this._map) {
      this._map = this._layer._map;
    }

    if (this._layer instanceof L.Marker) {
      this._layer.on('dragstart', this._fireDragStart, this);
      this._layer.on('drag', this._fireDrag, this);
      this._layer.on('dragend', this._fireDragEnd, this);

      if (this.options.snappable) {
        this._initSnappableMarkers();
      } else {
        this._disableSnapping();
      }
      if (this._layer.dragging) {
        this._layer.dragging.enable();
      }
      return;
    }

    // temporary coord variable for delta calculation
    this._tempDragCoord = null;

    // add CSS class
    if (this._layer._map.options.preferCanvas) {
      this._layer.on('mouseout', this.removeDraggingClass, this);
      this._layer.on('mouseover', this.addDraggingClass, this);
    } else {
      this.addDraggingClass();
    }

    this._originalMapDragState = this._layer._map.dragging._enabled;

    // can we reliably save the map's draggable state?
    // (if the mouse up event happens outside the container, then the map can become undraggable)
    this._safeToCacheDragState = true;

    // add mousedown event to trigger drag
    this._layer.on('mousedown', this._dragMixinOnMouseDown, this);
  },
  disableLayerDrag() {
    if (this._layer instanceof L.Marker) {
      this._layer.off('dragstart', this._fireDragStart, this);
      this._layer.off('drag', this._fireDrag, this);
      this._layer.off('dragend', this._fireDragEnd, this);
      if (this._layer.dragging) {
        this._layer.dragging.disable();
      }
      return;
    }

    // remove CSS class
    if (this._layer._map.options.preferCanvas) {
      this._layer.off('mouseout', this.removeDraggingClass, this);
      this._layer.off('mouseover', this.addDraggingClass, this);
    } else {
      this.removeDraggingClass();
    }
    // no longer save the drag state
    this._safeToCacheDragState = false;

    // disable mousedown event
    this._layer.off('mousedown', this._dragMixinOnMouseDown, this);
  },
  _dragMixinOnMouseUp() {
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;

    // re-enable map drag
    if (this._originalMapDragState) {
      this._layer._map.dragging.enable();
    }

    // if mouseup event fired, it's safe to cache the map draggable state on the next mouse down
    this._safeToCacheDragState = true;

    // clear up mousemove event
    this._layer._map.off('mousemove', this._dragMixinOnMouseMove, this);

    // clear up mouseup event
    this._layer._map.off('mouseup', this._dragMixinOnMouseUp, this);

    // if no drag happened, don't do anything
    if (!this._dragging) {
      return false;
    }

    if(this._layer instanceof L.CircleMarker) {
      this._updateHiddenPolyCircle();
    }

    // timeout to prevent click event after drag :-/
    // TODO: do it better as soon as leaflet has a way to do it better :-)
    window.setTimeout(() => {
      // set state
      this._dragging = false;
      L.DomUtil.removeClass(el, 'leaflet-pm-dragging');

      // fire pm:dragend event
      this._fireDragEnd();

      // fire edit
      this._fireEdit();
    }, 10);

    return true;
  },
  _dragMixinOnMouseMove(e) {
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;

    if (!this._dragging) {
      // set state
      this._dragging = true;
      L.DomUtil.addClass(el, 'leaflet-pm-dragging');

      // bring it to front to prevent drag interception
      this._layer.bringToFront();

      // disbale map drag
      if (this._originalMapDragState) {
        this._layer._map.dragging.disable();
      }


      // fire pm:dragstart event
      this._fireDragStart();
    }

    this._onLayerDrag(e);
  },
  _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button > 0) {
      return;
    }
    // save current map dragging state
    if (this._safeToCacheDragState) {
      this._originalMapDragState = this._layer._map.dragging._enabled;

      // don't cache the state again until another mouse up is registered
      this._safeToCacheDragState = false;
    }

    // save for delta calculation
    this._tempDragCoord = e.latlng;

    this._layer._map.on('mouseup', this._dragMixinOnMouseUp, this);

    // listen to mousemove on map (instead of polygon),
    // otherwise fast mouse movements stop the drag
    this._layer._map.on('mousemove', this._dragMixinOnMouseMove, this);
  },
  dragging() {
    return this._dragging;
  },
  _onLayerDrag(e) {
    // latLng of mouse event
    const { latlng } = e;

    // delta coords (how far was dragged)
    const deltaLatLng = {
      lat: latlng.lat - this._tempDragCoord.lat,
      lng: latlng.lng - this._tempDragCoord.lng,
    };

    // move the coordinates by the delta
    const moveCoords = coords =>
      // alter the coordinates
      coords.map(currentLatLng => {
        if (Array.isArray(currentLatLng)) {
          // do this recursively as coords might be nested
          return moveCoords(currentLatLng);
        }

        // move the coord and return it
        return {
          lat: currentLatLng.lat + deltaLatLng.lat,
          lng: currentLatLng.lng + deltaLatLng.lng,
        };
      });

    if (this._layer instanceof L.CircleMarker) {
      // create the new coordinates array
      const newCoords = moveCoords([this._layer.getLatLng()]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0]);
    } else {
      // create the new coordinates array
      const newCoords = moveCoords(this._layer.getLatLngs());

      // set new coordinates and redraw
      this._layer.setLatLngs(newCoords);
    }

    // save current latlng for next delta calculation
    this._tempDragCoord = latlng;

    e.layer = this._layer;
    // fire pm:dragstart event
    this._fireDrag(e);
  },
  _fireDragStart() {
    this._layer.fire('pm:dragstart', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  _fireDrag(e) {
    this._layer.fire('pm:drag', Object.assign({},e, {shape:this.getShape()}));
  },
  _fireDragEnd() {
    this._layer.fire('pm:dragend', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  addDraggingClass() {
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;
    L.DomUtil.addClass(el, 'leaflet-pm-draggable');
  },
  removeDraggingClass() {
    const el = this._layer._path
      ? this._layer._path
      : this._layer._renderer._container;
    L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
  }
};

export default DragMixin;
