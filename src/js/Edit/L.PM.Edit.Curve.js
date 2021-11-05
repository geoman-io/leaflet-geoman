import Edit from './L.PM.Edit';

import CurveCommon from '../Mixins/CurveCommon';

import MarkerLimits from '../Mixins/MarkerLimits';

Edit.Curve = Edit.extend({
  includes: [CurveCommon, MarkerLimits],
  options: {
    lineGuideStyle: {
        color: '#ff3c3c',
        weight: 2,
        opacity: 0.7,
    },
  },
  _shape: 'Curve',
  initialize(layer) {
    this._layer = layer;
    this._enabled = false;
  },
  enable(options) {
    L.Util.setOptions(this, options);
    this._map = this._layer._map;

    // cancel when map isn't available, this happens when the polygon is removed before this fires
    if (!this._map) {
      return;
    }

    // layer is not allowed to edit
    if (!this.options.allowEditing) {
      this.disable();
      return;
    }

    if (this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }

    // change state
    this._enabled = true;

    // if polygon gets removed from map, disable edit mode
    this._layer.on('remove', this._onLayerRemove, this);

    this.init();
    this._fireEnable();
  },
  init() {
    this._markerGroup = new L.LayerGroup().addTo(this._map);
    this._markerGroup._pmTempLayer = true;
    this._editLayers = new L.LayerGroup().addTo(this._map);
    this._editLayers._pmTempLayer = true;
    this.initVars();
    this._initMarkers(this._layer._coords);
    this.applyOptions();
    this._setupControlMarkersEdit();
  },

  reInit() {
    this.cleanup();
    this.init();
  },

  cleanup(poly = this._layer) {
    poly.pm._markerGroup.clearLayers();
    poly.pm._markerGroup.removeFrom(this._map);
    poly.pm._editLayers.clearLayers();
    poly.pm._editLayers.removeFrom(this._map);
    this.delete();
  },

  disable(poly = this._layer) {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return false;
    }

    // prevent disabling if polygon is being dragged
    if (poly.pm._dragging) {
      return false;
    }
    poly.pm._enabled = false;
    this.cleanup(poly);

    // remove onRemove listener
    this._layer.off('remove', this._onLayerRemove, this);

    // remove draggable class
    const el = poly._path ? poly._path : this._layer._renderer._container;
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
    return this.enabled();
  },
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
  },
  _onLayerRemove(e) {
    this.disable(e.target);
  },

  _initMarkers(coords) {
		let lastInstruction = null;
		let i = 0;
		let coordsAccum = [];
		while (i < coords.length) {
			const current = coords[i];
			i += 1;
			if (typeof current === 'string') {
				if (coordsAccum.length) {
					this.addFromCoords(lastInstruction, coordsAccum);
					coordsAccum = [];
				}
				lastInstruction = current;
			}
      else coordsAccum.push(current);
		}
		this.addFromCoords(lastInstruction, coordsAccum);
    this._updatePath();
	},

  addFromCoords(instruction, coords) {
		switch (instruction) {
			case 'L':
			case 'M':
				this._createGoTo(coords[0], instruction);
				break;
			case 'Q':
				this._createQuadraticFromCoords(coords);
				break;
			case 'C':
				this._createCubicFromCoords(coords);
				break;
      default: break;
		}
	},

  _createGoTo(latlng, instruction) {
    const marker = this._createMarker(latlng).addTo(this._markerGroup);
    this._markers.push( marker);
		this._instructions.push(instruction);
		this._latlngs.push([latlng]);
	},

  // unused for now
  _createQuadraticFromCoords(coords) {
		const control = coords[0];
		const dest = coords[1];
		const markerDest = this._createMarker(dest).addTo(this._markerGroup);
		this._markers.push( markerDest);
		this._instructions.push('Q');
		this._latlngs.push([control, dest]);
	},

	_createCubicFromCoords(coords) {
		const firstControl = coords[0];
		const secondControl = coords[1];
		const dest = coords[2];
		const markerDest = this._createMarker(dest).addTo(this._markerGroup);
		this._markers.push(markerDest);
		this._instructions.push('C');
		this._latlngs.push([firstControl, secondControl, dest]);
	},

  _setupControlMarkersEdit() {
    for (let i = 0; i < this._markers.length; i+=1) {
      this._setupControlMarkerEdit(i);
    }
    this.markerSelected = 0;
  },
  
  _setupControlMarkerEdit(markerIndex) {
    const marker = this._markers[markerIndex];
    marker._index = markerIndex;
    const nbInstructions = this._instructions.length;
    const currentInstruction = this._instructions[markerIndex];
    const isLast = markerIndex === nbInstructions - 1;
    const nextIsCubic = markerIndex < nbInstructions - 1 && this._instructions[markerIndex + 1] === 'C';
    const currentLatlngs = this._latlngs[markerIndex];
    const destSameSecondControl = currentLatlngs[2] === currentLatlngs[1];
    if (currentInstruction === 'C') {
      if (nextIsCubic && !destSameSecondControl) {
        marker._setupDouble = true;
        marker._coordsIndex = [[markerIndex, 2]];
      }
      else {
        marker._coordsIndex = [[markerIndex, 2]];
        // move the second control point (if first defined) and the destination
        if (!isLast) { marker._coordsIndex.push([markerIndex, 1]); }
        // one handle for destination, one handle for second control point
        else if (!destSameSecondControl) {
            marker._setupSimple = true;
        }
      }
    }
    else {
      // update current position,
      marker._coordsIndex = [[markerIndex, 0]];
      // update first control point of next if cubic
      if (nextIsCubic) { marker._coordsIndex.push([markerIndex + 1, 0]); }
    }
    marker.on('drag click', this._onDragMarker, this);
    this._setupDragStartEnd(marker);
    if (!this.options.preventMarkerRemoval) {
      marker.on(this.options.removeVertexOn, this._removeVertex, this);
    }
	},

  _setupDragStartEnd(marker) {
    marker.on('dragstart', () => {
        this._layerEdited = true;
        marker._dragging = true;
    });
    marker.on('dragend', () => {
        marker._dragging = false;
    });
  },

  _setupSimpleHandle(e) {
    const marker = e.target;
    const markerIndex = marker._index;
    const currentCoords = this._latlngs[markerIndex];
    const markerControl = this._createMarker(currentCoords[1], true).addTo(this._editLayers);
    const line = L.polyline([currentCoords[1], currentCoords[2]], this.options.lineGuideStyle);
    line._pmTempLayer = true;
    line.addTo(this._editLayers);
    const lineArgs = { line, coordsIndex: [[markerIndex, 1], [markerIndex, 2]] };
    this._initMarkerArgs(markerControl, markerIndex, [[markerIndex, 1]], null, lineArgs);
    marker._translateArgs = [markerControl];
    marker._line = lineArgs;
  },

  // create 3 handles : one for the destination of current, one for the 2nd control of current, one for the 1st control of next
  // the marker for the point already exists : attach a callback
  _setupDoubleHandle(e) {
    const marker = e.target;
    const markerIndex = marker._index;
    const currentCoords = this._latlngs[markerIndex];
    const nextCoords = this._latlngs[markerIndex + 1];
    const line = L.polyline([currentCoords[1], nextCoords[0]], this.options.lineGuideStyle)
    line._pmTempLayer = true;
    line.addTo(this._editLayers);
    const lineArgs = { line, coordsIndex: [[markerIndex, 1], [markerIndex + 1, 0]] };
    const markerControl2 = this._createMarker(currentCoords[1], true).addTo(this._editLayers);
    const markerControl1 = this._createMarker(nextCoords[0], true).addTo(this._editLayers);
    this._initMarkerArgs(markerControl1, markerIndex, [[markerIndex + 1, 0]], {ref: [markerIndex, 2], marker: markerControl2}, lineArgs);
    this._initMarkerArgs(markerControl2, markerIndex, [[markerIndex, 1]], {ref: [markerIndex, 2], marker: markerControl1}, lineArgs);
    marker._line = lineArgs;
    marker._translateArgs = [markerControl1, markerControl2];
  },
    
  _initMarkerArgs(marker, index, coords, symetric, lineArgs) {
      marker._coordsIndex = coords
      marker._index = index;
      if (symetric) { marker._symetricArgs = symetric; }
      marker._line = lineArgs;
      marker.on('drag', this._onDragMarker, this);
      this._setupDragStartEnd(marker);
  },
  
  _removeVertex(e) {
    if (this._instructions.length <= 2) {
      this._layer.remove();
      return;
    }
    const marker = e.target;
    const markerIndex = marker._index;
    this._removeInstruction(markerIndex);
    this._updatePath();
    this.reInit();
    this._fireVertexRemoved(marker, markerIndex);
  },

  _updateSymetric(latlng, symetricArgs) {
      const indexRef = symetricArgs.ref;
      const indexChanged = symetricArgs.marker._coordsIndex[0];
      const pointRef = this._latlngs[indexRef[0]][indexRef[1]];
      const symetric = L.PM.Utils.getPointSymetric(pointRef, latlng);
      this._latlngs[indexChanged[0]][indexChanged[1]] = symetric;
      symetricArgs.marker.setLatLng(symetric);
  },

  _updateTranslate(e, translatedMarkers) {
    const marker = e.target;
    const latlng = marker.getLatLng();
    if (!marker.previousLatlng) {
      marker.previousLatlng = latlng;
    }
    const difLat = latlng.lat - marker.previousLatlng.lat; 
    const difLng = latlng.lng - marker.previousLatlng.lng;
    marker.previousLatlng = latlng;
    for (let i = 0; i < translatedMarkers.length; i+=1) {
      const translatedMarker = translatedMarkers[i];
      const coordsIndex = translatedMarker._coordsIndex[0];
      const coords = this._latlngs[coordsIndex[0]][coordsIndex[1]];
      const newCoords = [coords[0] + difLat, coords[1] + difLng];
      this._latlngs[coordsIndex[0]][coordsIndex[1]] = newCoords;
      translatedMarker.setLatLng(newCoords);
    }
  },

  _updateLine(lineObj) {
    const poly = lineObj.line;
    const coords =  lineObj.coordsIndex;
    const origin = this._latlngs[coords[0][0]][coords[0][1]];
    const dest = this._latlngs[coords[1][0]][coords[1][1]];
    poly.setLatLngs([origin, dest]);
  },

  _onDragMarker(e) {
    const markerCoords = e.target.getLatLng();
    const indexMarker = e.target._index;
    const coordsArray = e.target._coordsIndex;
    const latlng = [markerCoords.lat, markerCoords.lng];
    if (indexMarker !== this.markerSelected  ) {
      this._editLayers.clearLayers();
      if (e.target._setupDouble) { this._setupDoubleHandle(e); }
      if (e.target._setupSimple) { this._setupSimpleHandle(e); }
      this.markerSelected = indexMarker;
    }
    if (e.target._line) {
      this._updateLine(e.target._line);
    }
    const symetric = e.target._symetricArgs;
    if (symetric) {
      this._updateSymetric(latlng, symetric);
    }
    if (e.target._translateArgs) {
        this._updateTranslate(e, e.target._translateArgs);
    }
    for (let i = 0; i < coordsArray.length; i+=1) {
        const coords = coordsArray[i];
        this._latlngs[coords[0]][coords[1]] = latlng;
    }
    this._updatePath();
  },


  // creates initial markers for coordinates
  _createMarker(latlng, isHandle = false) {
    const cssClass = `marker-icon ${isHandle ? 'marker-edit-handle' : ''}`;
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: cssClass }),
    });
    this._setPane(marker, 'vertexPane');

    marker._pmTempLayer = true;

    if (this.options.rotate) {
      marker.on('dragstart', this._onRotateStart, this);
      marker.on('drag', this._onRotate, this);
      marker.on('dragend', this._onRotateEnd, this);
    } else {
      marker.on('click', this._onVertexClick, this);
    }
    this._markerGroup.addLayer(marker);

    return marker;
  },
  _onVertexClick(e) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }
    this._fireVertexClick(e, vertex._index);
  },

});
