import { getRenderer } from '../helpers';

const DragMixin = {
  enableLayerDrag() {
    // layer is not allowed to dragged or is not on the map
    if (!this.options.draggable || !this._layer._map) {
      return;
    }

    // before enabling layer drag, disable layer editing
    this.disable();

    this._layerDragEnabled = true;

    // if layer never enabled and _map is not set (for snapping)
    if (!this._map) {
      this._map = this._layer._map;
    }

    if (
      this._layer instanceof L.Marker ||
      this._layer instanceof L.ImageOverlay
    ) {
      // prevents dragging the DOM image instead of the marker
      L.DomEvent.on(this._getDOMElem(), 'dragstart', this._stopDOMImageDrag);
    }

    // Disable Leaflet Dragging of Markers
    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    // temporary coord variable for delta calculation
    this._tempDragCoord = null;

    // add CSS class
    if (getRenderer(this._layer) instanceof L.Canvas) {
      this._layer.on('mouseout', this.removeDraggingClass, this);
      this._layer.on('mouseover', this.addDraggingClass, this);
    } else {
      this.addDraggingClass();
    }

    this._originalMapDragState = this._layer._map.dragging._enabled;

    // can we reliably save the map's draggable state?
    // (if the mouse up event happens outside the container, then the map can become undraggable)
    this._safeToCacheDragState = true;

    const container = this._getDOMElem();

    // check if DOM element exists
    if (container) {
      // add mousedown event to trigger drag
      if (getRenderer(this._layer) instanceof L.Canvas) {
        this._layer.on(
          'touchstart mousedown',
          this._dragMixinOnMouseDown,
          this
        );
        this._map.pm._addTouchEvents(container);
      } else {
        // We can't just use layer.on('mousedown') because on touch devices the event is not fired if user presses on the layer and then drag it.
        // With checking on touchstart and mousedown on the DOM element we can listen on the needed events
        L.DomEvent.on(
          container,
          'touchstart mousedown',
          this._simulateMouseDownEvent,
          this
        );
      }
    }

    this._fireDragEnable();
  },
  disableLayerDrag() {
    this._layerDragEnabled = false;

    // remove CSS class
    if (getRenderer(this._layer) instanceof L.Canvas) {
      this._layer.off('mouseout', this.removeDraggingClass, this);
      this._layer.off('mouseover', this.addDraggingClass, this);
    } else {
      this.removeDraggingClass();
    }

    // if the layer is dragged but now disabled
    if (this._originalMapDragState && this._dragging) {
      this._map.dragging.enable();
    }

    // no longer save the drag state
    this._safeToCacheDragState = false;

    // Disable Leaflet Dragging of Markers
    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    const container = this._getDOMElem();
    // check if DOM element exists
    if (container) {
      if (getRenderer(this._layer) instanceof L.Canvas) {
        this._layer.off(
          'touchstart mousedown',
          this._dragMixinOnMouseDown,
          this
        );
        this._map.pm._removeTouchEvents(container);
      } else {
        // disable mousedown event
        L.DomEvent.off(
          container,
          'touchstart mousedown',
          this._simulateMouseDownEvent,
          this
        );
      }
    }

    if (this._layerDragged) {
      this._fireUpdate();
    }
    this._layerDragged = false;

    this._fireDragDisable();
  },
  // TODO: make this private in the next major release
  dragging() {
    return this._dragging;
  },
  layerDragEnabled() {
    return !!this._layerDragEnabled;
  },
  // We need to simulate a mousedown event on the layer object. We can't just use layer.on('mousedown') because on touch devices the event is not fired if user presses on the layer and then drag it.
  // With checking on touchstart and mousedown on the DOM element we can listen on the needed events
  _simulateMouseDownEvent(e) {
    const first = e.touches ? e.touches[0] : e;
    const evt = {
      originalEvent: first,
      target: this._layer,
    };
    // we expect in the function to get the clicked latlng / point
    evt.containerPoint = this._map.mouseEventToContainerPoint(first);
    evt.latlng = this._map.containerPointToLatLng(evt.containerPoint);

    this._dragMixinOnMouseDown(evt);
    return false;
  },
  _simulateMouseMoveEvent(e) {
    const first = e.touches ? e.touches[0] : e;
    const evt = {
      originalEvent: first,
      target: this._layer,
    };
    // we expect in the function to get the clicked latlng / point
    evt.containerPoint = this._map.mouseEventToContainerPoint(first);
    evt.latlng = this._map.containerPointToLatLng(evt.containerPoint);

    this._dragMixinOnMouseMove(evt);
    return false;
  },
  _simulateMouseUpEvent(e) {
    const first = e.touches ? e.touches[0] : e;
    const evt = {
      originalEvent: first,
      target: this._layer,
    };
    if (e.type.indexOf('touch') === -1) {
      // we expect in the function to get the clicked latlng / point
      evt.containerPoint = this._map.mouseEventToContainerPoint(e);
      evt.latlng = this._map.containerPointToLatLng(evt.containerPoint);
    }
    this._dragMixinOnMouseUp(evt);
    return false;
  },
  _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button > 0) {
      return;
    }
    this._overwriteEventIfItComesFromMarker(e);

    const fromLayerSync = e._fromLayerSync;

    // if other layers found, snapping will be disabled
    const layersToSyncFound = this._syncLayers('_dragMixinOnMouseDown', e);

    if (this._layer instanceof L.Marker) {
      if (this.options.snappable && !fromLayerSync && !layersToSyncFound) {
        this._initSnappableMarkers();
      } else {
        this._disableSnapping();
      }
    }

    // we need to disable snapping for CircleMarker because they are snapping because of the check in onLayerDrag -> if(_snapped)
    if (this._layer instanceof L.CircleMarker) {
      let _editableOption = 'resizeableCircleMarker';
      if (this._layer instanceof L.Circle) {
        _editableOption = 'resizableCircle';
      }

      if (this.options.snappable && !fromLayerSync && !layersToSyncFound) {
        if (!this._layer.pm.options[_editableOption]) {
          this._initSnappableMarkersDrag();
        }
      } else if (this._layer.pm.options[_editableOption]) {
        this._layer.pm._disableSnapping();
      } else {
        this._layer.pm._disableSnappingDrag();
      }
    }

    // save current map dragging state
    if (this._safeToCacheDragState) {
      this._originalMapDragState = this._layer._map.dragging._enabled;

      // don't cache the state again until another mouse up is registered
      this._safeToCacheDragState = false;
    }

    // save for delta calculation
    this._tempDragCoord = e.latlng;

    L.DomEvent.on(
      this._map.getContainer(),
      'touchend mouseup',
      this._simulateMouseUpEvent,
      this
    );

    // listen to mousemove on map (instead of polygon),
    // otherwise fast mouse movements stop the drag
    L.DomEvent.on(
      this._map.getContainer(),
      'touchmove mousemove',
      this._simulateMouseMoveEvent,
      this
    );
  },
  _dragMixinOnMouseMove(e) {
    this._overwriteEventIfItComesFromMarker(e);
    const el = this._getDOMElem();

    this._syncLayers('_dragMixinOnMouseMove', e);

    if (!this._dragging) {
      // set state
      this._dragging = true;
      L.DomUtil.addClass(el, 'leaflet-pm-dragging');

      if (!(this._layer instanceof L.Marker)) {
        // bring it to front to prevent drag interception
        this._layer.bringToFront();
      }

      // disbale map drag
      if (this._originalMapDragState) {
        this._map.dragging.disable();
      }

      // fire pm:dragstart event
      this._fireDragStart();
    }

    // if _tempDragCoord is null add the current latlng to prevent throwing a error. This can happen when for example the layer is removed and added to the map while dragging (MarkerCluster)
    if (!this._tempDragCoord) {
      this._tempDragCoord = e.latlng;
    }

    this._onLayerDrag(e);

    // update the hidden circle border after dragging
    if (this._layer instanceof L.CircleMarker) {
      this._layer.pm._updateHiddenPolyCircle();
    }
  },
  _dragMixinOnMouseUp(e) {
    const el = this._getDOMElem();

    this._syncLayers('_dragMixinOnMouseUp', e);

    // re-enable map drag
    if (this._originalMapDragState) {
      this._map.dragging.enable();
    }

    // if mouseup event fired, it's safe to cache the map draggable state on the next mouse down
    this._safeToCacheDragState = true;
    // clear up mousemove event
    L.DomEvent.off(
      this._map.getContainer(),
      'touchmove mousemove',
      this._simulateMouseMoveEvent,
      this
    );

    // clear up mouseup event
    L.DomEvent.off(
      this._map.getContainer(),
      'touchend mouseup',
      this._simulateMouseUpEvent,
      this
    );

    // if no drag happened, don't do anything
    if (!this._dragging) {
      return false;
    }

    // update the hidden circle border after dragging
    if (this._layer instanceof L.CircleMarker) {
      this._layer.pm._updateHiddenPolyCircle();
    }

    this._layerDragged = true;

    // timeout to prevent click event after drag :-/
    // TODO: do it better as soon as leaflet has a way to do it better :-)
    window.setTimeout(() => {
      // set state
      this._dragging = false;
      // if the layer is not on the map, we have no DOM element
      if (el) {
        L.DomUtil.removeClass(el, 'leaflet-pm-dragging');
      }

      // fire pm:dragend event
      this._fireDragEnd();

      // fire edit
      this._fireEdit();
      this._layerEdited = true;
    }, 10);

    return true;
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
    const moveCoords = (coords) =>
      // alter the coordinates
      coords.map((currentLatLng) => {
        if (Array.isArray(currentLatLng)) {
          // do this recursively as coords might be nested
          return moveCoords(currentLatLng);
        }

        // move the coord and return it
        const newLatlng = {
          lat: currentLatLng.lat + deltaLatLng.lat,
          lng: currentLatLng.lng + deltaLatLng.lng,
        };

        if (currentLatLng.alt || currentLatLng.alt === 0) {
          newLatlng.alt = currentLatLng.alt;
        }
        return newLatlng;
      });

    if (
      (this._layer instanceof L.Circle &&
        this._layer.options.resizableCircle) ||
      (this._layer instanceof L.CircleMarker &&
        this._layer.options.resizeableCircleMarker)
    ) {
      // create the new coordinates array
      const newCoords = moveCoords([this._layer.getLatLng()]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0]);
      this._fireChange(this._layer.getLatLng(), 'Edit');
    } else if (
      this._layer instanceof L.CircleMarker ||
      this._layer instanceof L.Marker
    ) {
      let coordsRefernce = this._layer.getLatLng();
      if (this._layer._snapped) {
        // if layer is snapped we use the original latlng for re-calculation, else the layer will not be "unsnappable" anymore
        coordsRefernce = this._layer._orgLatLng;
      }
      // create the new coordinates array
      const newCoords = moveCoords([coordsRefernce]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0]);
      this._fireChange(this._layer.getLatLng(), 'Edit');
    } else if (this._layer instanceof L.ImageOverlay) {
      // create the new coordinates array
      const newCoords = moveCoords([
        this._layer.getBounds().getNorthWest(),
        this._layer.getBounds().getSouthEast(),
      ]);
      // set new coordinates and redraw
      this._layer.setBounds(newCoords);
      this._fireChange(this._layer.getBounds(), 'Edit');
    } else {
      // create the new coordinates array
      const newCoords = moveCoords(this._layer.getLatLngs());

      // set new coordinates and redraw
      this._layer.setLatLngs(newCoords);
      this._fireChange(this._layer.getLatLngs(), 'Edit');
    }

    // save current latlng for next delta calculation
    this._tempDragCoord = latlng;

    e.layer = this._layer;
    // fire pm:dragstart event
    this._fireDrag(e);
  },
  addDraggingClass() {
    const el = this._getDOMElem();
    if (el) {
      L.DomUtil.addClass(el, 'leaflet-pm-draggable');
    }
  },
  removeDraggingClass() {
    const el = this._getDOMElem();
    if (el) {
      L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
    }
  },
  _getDOMElem() {
    let el = null;
    if (this._layer._path) {
      el = this._layer._path;
    } else if (this._layer._renderer && this._layer._renderer._container) {
      el = this._layer._renderer._container;
    } else if (this._layer._image) {
      el = this._layer._image;
    } else if (this._layer._icon) {
      el = this._layer._icon;
    }
    return el;
  },
  _overwriteEventIfItComesFromMarker(e) {
    // e.latlng is not the clicked latlng if the layer is a Marker (or the radius below 10) -> Leaflet definition
    // https://github.com/Leaflet/Leaflet/blob/0f904a515879fcd08f69b7f51799ee7f18f23fd8/src/map/Map.js#L1416
    const isMarker =
      e.target.getLatLng && (!e.target._radius || e.target._radius <= 10);
    if (isMarker) {
      // we want the clicked latlng / point, so we overwrite the property e.latlng
      e.containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
      e.latlng = this._map.containerPointToLatLng(e.containerPoint);
    }
  },
  _syncLayers(fnc, e) {
    // if layer is in Edit-Mode it should not be possible to drag other layers too. (Marker & CircleMarker & ImageOverlay)
    if (this.enabled()) {
      return false;
    }

    if (
      !e._fromLayerSync &&
      this._layer === e.target &&
      this.options.syncLayersOnDrag
    ) {
      e._fromLayerSync = true;
      let layersToSync = [];
      if (L.Util.isArray(this.options.syncLayersOnDrag)) {
        // layers
        layersToSync = this.options.syncLayersOnDrag;

        this.options.syncLayersOnDrag.forEach((layer) => {
          if (layer instanceof L.LayerGroup) {
            layersToSync = layersToSync.concat(layer.pm.getLayers(true));
          }
        });
      } else if (this.options.syncLayersOnDrag === true) {
        // LayerGroup
        if (this._parentLayerGroup) {
          for (const key in this._parentLayerGroup) {
            const lg = this._parentLayerGroup[key];
            if (lg.pm) {
              layersToSync = lg.pm.getLayers(true);
            }
          }
        }
      }

      if (L.Util.isArray(layersToSync) && layersToSync.length > 0) {
        // filter out layers that don't have leaflet-geoman and not allowed to drag
        layersToSync = layersToSync
          .filter((layer) => !!layer.pm)
          .filter((layer) => !!layer.pm.options.draggable);
        layersToSync.forEach((layer) => {
          if (layer !== this._layer && layer.pm[fnc]) {
            layer._snapped = false;
            layer.pm[fnc](e);
          }
        });
      }
      return layersToSync.length > 0;
    }
    return false;
  },
  _stopDOMImageDrag(e) {
    e.preventDefault();
    return false;
  },
};

export default DragMixin;
