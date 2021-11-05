import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';
import CurveCommon from '../Mixins/CurveCommon';

Draw.Curve = Draw.extend({
  includes: CurveCommon,
  initialize(map) {
    this._map = map;
    this._shape = 'Curve';
    this.toolbarButtonName = 'drawCurve';
    this._doesSelfIntersect = false;
  },
  enable(options) {
    L.Util.setOptions(this, options);
    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker(this._map.getCenter(), {
      interactive: false, // always vertex marker below will be triggered from the click event -> _finishShape #911
      zIndexOffset: 100,
      icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
    });
    this._setPane(this._hintMarker, 'vertexPane');
    this._hintMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintMarker);
    // show the hintmarker if the option is set
    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    }

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.firstVertex'), {
          permanent: true,
          offset: L.point(0, 10),
          direction: 'bottom',

          opacity: 0.8,
        })
        .openTooltip();
    }

    // change map cursor
    this._map._container.style.cursor = 'crosshair';

    // this is the final curve
    this._layer = L.curve([], this.options.templineStyle);
    this._setPane(this._layer, 'layerPane');
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);
    
    this._futurePath = L.curve([], this.options.hintlineStyle).addTo(this._map);
    this._setPane(this._futurePath, 'layerPane');
    this._futurePath._pmTempLayer = true;
    this._layerGroup.addLayer(this._futurePath);
    this._futurePathDef = [];
    this._futureDest = null;
    this.initVars();
    this.previousInteractions = {};

    // init listeners 
    L.DomEvent.on(this._map.getContainer(), 'touchstart mousedown', this._simDownEvent, this);
    this.supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    
    if(this.supportsTouch) {
      document.addEventListener('contextmenu', this.preventAndStopPropagation); // allow for taking your time on touch screens
    }
    else {
      this._map.on('mousemove', this._mouseMoveDragging, this);
    }

    // finish on layer event
    // #http://leafletjs.com/reference-1.2.0.html#interactive-layer-click
    if (this.options.finishOn && this.options.finishOn !== 'snap') {
      this._map.on(this.options.finishOn, this._finishShape, this);
    }

    // prevent zoom on double click if finishOn is === dblclick
    if (this.options.finishOn === 'dblclick') {
      this.tempMapDoubleClickZoomState = this._map.doubleClickZoom._enabled;

      if (this.tempMapDoubleClickZoomState) {
        this._map.doubleClickZoom.disable();
      }
    }

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];
    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  disable() {
    // disable draw mode
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }
    if(this.supportsTouch) {
      document.removeEventListener('contextmenu', this.preventAndStopPropagation); // allow for taking your time on touch screens
    }
    this._enabled = false;

    // reset cursor
    this._map._container.style.cursor = '';

    // unbind listeners
    L.DomEvent.off(this._map.getContainer(), 'touchstart mousedown', this._simDownEvent, this);
		this._map.off('mousemove', this._mouseMoveDragging, this);
    this._map.off('mousemove', this._syncHintMarker, this);
    if (this.options.finishOn && this.options.finishOn !== 'snap') {
      this._map.off(this.options.finishOn, this._finishShape, this);
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    }

    // remove layer
    this._map.removeLayer(this._layerGroup);
    // cleanup curve variables
    this.delete();
    delete this._futurePathDef;
    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  },
  enabled() {
    return this._enabled;
  },
  toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  preventAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  },
  _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

    // if snapping is enabled, do it, only if not dragging, because it can be inconvenient
    if (this.options.snappable && !this.draggingControl) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }
  },
  _simulateEvent(e) {
    const evt = {
      originalEvent: e,
      target: this._layer,
    };
    // we expect in the function to get the clicked latlng / point
    evt.containerPoint = this._map.mouseEventToContainerPoint(e);
    evt.latlng = this._map.containerPointToLatLng(evt.containerPoint);
    // check if similar event has already been fired, to avoid duplicate handling
    if (this._alreadyFired(evt) || e.type === 'pointercancel') return false;
    return evt;
  },
  _simDownEvent(e) {
    const evt = this._simulateEvent(e);
    if (evt) {
      this._onTouch(evt);
    }
  },
  _simMoveEvent(e) {
    const evt = this._simulateEvent(e);
    if (evt) this._mouseMoveDragging(evt);
  },
  _simUpEvent(e) {
    const evt = this._simulateEvent(e);
    if (evt) {
      this._drawConfirm(evt);
    }
  },
  _alreadyFired(e) {
    const eventType = e.originalEvent.type;
    // two last chars are discriminant to identify wanted event types
    const lastCharsEvent = eventType.substring(eventType.length - 2);
    // const eventTypes = this.eventTypes[lastCharsEvent];
    if (lastCharsEvent in this.previousInteractions && this.previousInteractions[lastCharsEvent].equals(e.latlng)) {
      delete this.previousInteractions[lastCharsEvent];
      return true;
    }
    this.previousInteractions[lastCharsEvent] = e.latlng;
    return false;
  },
  // called on click / touch on the map
  _onTouch(e) {
    // check if we touched a marker, in which case the touch event is handled by the marker handler
    if (e.originalEvent.target.classList.contains('leaflet-marker-icon')) { return; } 
    this._futureDest = [e.latlng.lat, e.latlng.lng];
    L.DomEvent.on(this._map.getContainer(), 'touchend mouseup', this._simUpEvent, this);
    L.DomUtil.disableImageDrag();
    L.DomUtil.disableTextSelection();
    if (!this._instructions.length) return;

    if (this.supportsTouch) {
      L.DomEvent.on(this._map.getContainer(), 'touchmove mousemove', this._simMoveEvent, this);
      document.addEventListener('selectstart', this.preventAndStopPropagation);
    }
    this._updateFuturePath(e); // for touch screens, where future path is not updated since there is no hover
    this._setTooltipText(true);
    this._map.dragging.disable();
  },
  
  // called continuously while the mouse is pressed after adding a new point
	_mouseMoveDragging(e) {
    // long touch seem to trigger mousemove on touch devices
    if (this.supportsTouch && e.originalEvent.type === 'mousemove') return;
		if (!this._instructions.length) return;
		if (this._futureDest != null) {
      this.draggingControl = true;
		}
		else {
      this.draggingControl = false;
		}
		this._updateFuturePath(e);
	},

  // called when the mouse is release (mouseup)
	_drawConfirm(e) {
		this._map.dragging.enable();
		this.draggingControl = false;
    L.DomUtil.enableImageDrag();
    L.DomUtil.enableTextSelection();
		this._futureDest = null;
    L.DomEvent.off(this._map.getContainer(), 'touchend mouseup', this._simUpEvent, this);

    if (this.supportsTouch) {
      L.DomEvent.off(this._map.getContainer(), 'touchmove mousemove', this._simMoveEvent, this);
      document.removeEventListener('selectstart', this.preventAndStopPropagation);
    }

    // if it is the first point, create the marker
		if (!this._instructions.length) { 
			const firstMarker = this._createGoTo([e.latlng.lat, e.latlng.lng], 'M');
			firstMarker.on('click', this._finishClose, this);
		}
		else this._appendFuturePoint(e);
    const lastMarker = this._markers[this._markers.length - 1];
    this._fireVertexAdded(lastMarker, undefined, lastMarker.getLatLng(), 'Draw');
    this._setTooltipText();
	},

  // called when the shape is finished by clicking the first marker
  _finishClose(e) {
		// set last point to exact marker location
		let latlng = e.target.getLatLng();
		latlng = [latlng.lat, latlng.lng];
		this._futurePathDef[this._futurePathDef.length - 1] = latlng;
		// set last control point as well
		if (this._futurePathDef.length > 3) {
			this._futurePathDef[this._futurePathDef.length - 2] = latlng;
		}
		this._appendFuturePoint(e);
		this._finishShape(e);
	},
  
  // compute the new path based on the futurePath create by the hovering on the map
  _appendFuturePoint(e) {
		if (!this._futurePathDef.length) { return; }
		this._instructions.push(this._futurePathDef[0]);
		this._latlngs.push(this._futurePathDef.slice(1));
		this._updateFinishMarker();
		this._futurePathDef = [];
		this._futurePath.setPath([]);
		this._updatePath();
    this._updateFuturePath(e);
	},

  // main part of the computation: depending on previous and if we are dragging, add different control point
  _updateFuturePath(e) {
		const lastCoords = this._getLastPoint();
		const lastLatlngs = this._getLastLatLngs();
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped && e) {
      this._hintMarker.setLatLng(e.latlng);
    }
    let latlng = this._hintMarker.getLatLng();
		latlng = [latlng.lat, latlng.lng];
		const lastInstruction = this._instructions[this._instructions.length - 1];
		const startPoint = ['M', lastCoords];
		if (lastInstruction === 'M' || lastInstruction === 'L') {
			if (this.draggingControl) {
				this._futurePathDef = ['C', lastCoords, latlng, this._futureDest];
			}
			else {
				this._futurePathDef = ['L', latlng];
			}
		}
		else if (lastInstruction === 'C') {
			const previousControl = lastLatlngs[1];
			const symetric = L.PM.Utils.getPointSymetric(lastCoords, previousControl);
			if (this.draggingControl) {
				this._futurePathDef = ['C', symetric, latlng, this._futureDest];
			} else if (previousControl === lastLatlngs[2]) {
				this._futurePathDef = ['L', latlng];
			} else {
				this._futurePathDef = ['C', symetric, latlng, latlng];
			}
		}
		this._futurePath.setPath(startPoint.concat(this._futurePathDef));
	},

  // updates the last marker to be the actual last control point
  _updateFinishMarker() {
		const markerCount = this._markers.length;
		const lastCoord = this._getLastPoint();
    let marker;
		if (markerCount > 1) {
			marker = this._markers[markerCount - 1];
      this._markerJustCreated(marker);
			marker.setLatLng(lastCoord);
		}
		else {
      marker = this._createMarker(lastCoord);
			marker.on('click', this._finishShape, this);
		}
	},


  _createGoTo(latlng, instruction) {
		const marker = this._createMarker(latlng)
		this._instructions.push(instruction);
		this._latlngs.push([latlng]);
		return marker;
	},

  _removeLastVertex() {
    // if all coords are gone, cancel drawing
    if (this._markers.length < 2) {
      this.disable();  
      return; 
    }
    // remove last instructions
    this._instructions.pop();
    this._latlngs.pop();
    if (this._instructions.length > 1) {
      // update last marker position
      this._updateFinishMarker();
    } else {
      // remove second marker only if one instruction left
      const marker = this._markers.pop();
      this._layerGroup.removeLayer(marker);
    }
    // sync the hintline and tooltip again
    this._setTooltipText();
    // re-render path, and future path
		this._updatePath();
		this._updateFuturePath();
  },

  _finishShape(e) {
    // if marker was just created, do not finish
    // hack for mobile devices where the click event is triggered directly after the marker is placed
    if (e && e.target._justMoved === true) return;

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // if there is only one marker (so, one point), don't finish the shape!
    if (this._markers.length < 2) {
			return;
		}

    // create the leaflet shape and add it to the map
    const path = L.curve(this._layer.getPath(), this.options.pathOptions);
    this._setPane(path, 'layerPane');
    this._finishLayer(path);
    path.addTo(this._map.pm._getContainingLayer());
    // fire the pm:create event and pass shape and layer
    this._fireCreate(path);

    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
    }
  },
  _createMarker(latlng) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    this._setPane(marker, 'vertexPane');
    marker._pmTempLayer = true;
    this._markerJustCreated(marker);
    // add it to the map
    this._layerGroup.addLayer(marker);
    this._markers.push(marker);
    return marker;
  },

  _markerJustCreated(marker){
    if (!this.supportsTouch) return;
    marker._justMoved = true
    setTimeout(() => {
      marker._justMoved = false;
    }, 500);
  },

  _setTooltipText(isPressed) {
    let text = '';
    if (isPressed) text = getTranslation('tooltips.dragCurve');
    else if (this._markers.length === 1) {
      text = getTranslation('tooltips.continueLine');
    } else {
      text = getTranslation('tooltips.finishLine');
    }
		this._hintMarker.setTooltipContent(text);
  },
});
