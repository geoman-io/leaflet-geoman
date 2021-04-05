const DragMixin = {
  enableLayerDrag(calledFromLayerGroup = false) {
    // before enabling layer drag, disable layer editing
    this.disable();

    this._draggingEnabled = true;

    if (this._layers ) { //Check if Layergroup
      if(this._layers.length > 0){
        this._layerGroup.on('mousedown', this._dragMixinOnMouseDownLayerGroup, this);
        this._layers.forEach((layer)=>{
          if(layer.pm) {
            // we need to disable snapping for CircleMarker because they are snapping because of the check in onLayerDrag -> if(_snapped)
            if (layer.pm.options.snappable && layer instanceof L.CircleMarker && !(layer instanceof L.Circle)) {
              if (layer.pm.options.editable) {
                layer.pm._disableSnapping();
              } else {
                layer.pm._disableSnappingDrag();
              }
            }
            layer.pm.enableLayerDrag(true);
          }
        })
      }
    } else {
      // if layer never enabled and _map is not set (for snapping)
      if (!this._map) {
        this._map = this._layer._map;
      }

      // if LayerGroup is dragged, we want to act Markers like a normal layer
      if(!calledFromLayerGroup) {
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
        } else if (this._layer instanceof L.ImageOverlay) {
          this._getDOMElem().ondragstart = () => false;
        }
      }else{
        if (this._layer instanceof L.Marker) {
          L.DomEvent.on(this._getDOMElem(),'dragstart',(e)=>{e.preventDefault(); return false});
        }

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
    }
  },
  disableLayerDrag(calledFromLayerGroup = false) {

    this._draggingEnabled = false;

    if (this._layers ) { //Check if Layergroup
      if(this._layers.length > 0){
        this._layerGroup.off('mousedown', this._dragMixinOnMouseDownLayerGroup, this);
        this._layers.forEach((layer)=>{
          if(layer.pm) {
            layer.pm.disableLayerDrag(true);

            // To re-enable snapping
            if (layer instanceof L.CircleMarker && !(layer instanceof L.Circle)) {
              layer.pm.enable();
              layer.pm.disable();
            }
          }
        })
      }
    } else {
      if(!calledFromLayerGroup) {
        if (this._layer instanceof L.Marker) {
          this._layer.off('dragstart', this._fireDragStart, this);
          this._layer.off('drag', this._fireDrag, this);
          this._layer.off('dragend', this._fireDragEnd, this);
          if (this._layer.dragging) {
            this._layer.dragging.disable();
          }
          return;
        }
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
    }
  },
  dragging() {
    return this._dragging;
  },
  draggingEnabled(){
    return !!this._draggingEnabled;
  },
  _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button > 0) {
      return;
    }
    this._overwriteEventIfItComesFromMarker(e);

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
  _dragMixinOnMouseMove(e) {
    this._overwriteEventIfItComesFromMarker(e);
    const el = this._getDOMElem();

    if (!this._dragging) {
      // set state
      this._dragging = true;
      L.DomUtil.addClass(el, 'leaflet-pm-dragging');

      if(!(this._layer instanceof L.Marker)) {
        // bring it to front to prevent drag interception
        this._layer.bringToFront();
      }

      // disbale map drag
      if (this._originalMapDragState) {
        this._layer._map.dragging.disable();
      }

      // fire pm:dragstart event
      this._fireDragStart();
    }

    this._onLayerDrag(e);

    // update the hidden circle border after dragging
    if(this._layer instanceof L.CircleMarker){
      this._layer.pm._updateHiddenPolyCircle();
    }
  },
  _dragMixinOnMouseUp() {
    const el = this._getDOMElem();

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

    // update the hidden circle border after dragging
    if(this._layer instanceof L.CircleMarker){
      this._layer.pm._updateHiddenPolyCircle();
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

    if (this._layer instanceof L.Circle || (this._layer instanceof L.CircleMarker && this._layer.options.editable) || this._layer instanceof L.Marker) {
      // create the new coordinates array
      const newCoords = moveCoords([this._layer.getLatLng()]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0]);
    } else if (this._layer instanceof L.CircleMarker) {
      let coordsRefernce = this._layer.getLatLng();
      if(this._layer._snapped) {
        coordsRefernce = this._layer._orgLatLng;
      }
      // create the new coordinates array
      const newCoords = moveCoords([coordsRefernce]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0]);
    } else if( this._layer instanceof L.ImageOverlay){
      // create the new coordinates array
      const newCoords = moveCoords([this._layer.getBounds().getNorthWest(),this._layer.getBounds().getSouthEast()]);
      // set new coordinates and redraw
      this._layer.setBounds(newCoords);
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
  _dragMixinOnMouseDownLayerGroup(e) {
    this._overwriteEventIfItComesFromMarker(e);
    this._layers.forEach((layer) => {
      layer.fire('mousedown', e);
    });
    this._getMap().on('mouseup', this._dragMixinOnMouseUpLayerGroup, this);
  },
  _dragMixinOnMouseUpLayerGroup(e) {
    this._layers.forEach((layer) => {
      layer.fire('mouseup',e);
    });
    this._getMap().off('mouseup', this._dragMixinOnMouseUpLayerGroup, this);
  },
  _fireDragStart() {
    L.PM.Utils._fireEvent(this._layer,'pm:dragstart', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  _fireDrag(e) {
    L.PM.Utils._fireEvent(this._layer,'pm:drag', Object.assign({},e, {shape:this.getShape()}));
  },
  _fireDragEnd() {
    L.PM.Utils._fireEvent(this._layer,'pm:dragend', {
      layer: this._layer,
      shape: this.getShape()
    });
  },
  addDraggingClass() {
    const el = this._getDOMElem();
    if(el) {
      L.DomUtil.addClass(el, 'leaflet-pm-draggable');
    }
  },
  removeDraggingClass() {
    const el = this._getDOMElem();
    if(el) {
      L.DomUtil.removeClass(el, 'leaflet-pm-draggable');
    }
  },
  _getDOMElem(){
    let el = null;
    if(this._layer._path){
      el = this._layer._path;
    }else if(this._layer._renderer && this._layer._renderer._container){
      el = this._layer._renderer._container;
    }else if(this._layer._image){
      el = this._layer._image;
    }else if(this._layer._icon){
      el = this._layer._icon;
    }
    return el;
  },
  _overwriteEventIfItComesFromMarker(e){
    // e.latlng is not the clicked latlng if the layer is a Marker (or the radius below 10) -> Leaflet definition
    // https://github.com/Leaflet/Leaflet/blob/0f904a515879fcd08f69b7f51799ee7f18f23fd8/src/map/Map.js#L1416
    const isMarker = e.target.getLatLng && (!e.target._radius || e.target._radius <= 10);
    if(isMarker){
      // we want the clicked latlng / point, so we overwrite the property e.latlng
      e.containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
      e.latlng = this._map.containerPointToLatLng(e.containerPoint);
    }
  }
};

export default DragMixin;
