import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.Circle = Draw.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Circle';
    this.toolbarButtonName = 'drawCircle';
  },
  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    this.options.radius = 0;

    if(!this.options.circleType || (this.options.circleType !== '2point' && this.options.circleType !== '3point')){
      this.options.circleType = "circle"
    }

    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // this is the circle we want to draw
    this._layer = L.circle([0, 0], this.options.templineStyle);
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);

    // this is the marker in the center of the circle
    this._centerMarker = L.marker([0, 0], {
      icon: L.divIcon({ className: 'marker-icon' }),
      draggable: false,
      zIndexOffset: 100,
    });
    this._centerMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._centerMarker);
    // this is the marker in the center of the circle
    this._circleMarker = L.marker([0, 0], {
      icon: L.divIcon({ className: 'marker-icon' }),
      draggable: false,
      zIndexOffset: 100,
    });
    this._circleMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._circleMarker);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker([0, 0], {
      icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
    });
    this._hintMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintMarker);

    // show the hintmarker if the option is set
    if (this.options.cursorMarker) {
      L.DomUtil.addClass(this._hintMarker._icon, 'visible');
    }

    // add tooltip to hintmarker
    if (this.options.tooltips) {

      var tooltip_text = this.options.circleType === 'circle' ? getTranslation('tooltips.startCircle') : getTranslation('tooltips.firstVertex');

      this._hintMarker
          .bindTooltip(tooltip_text, {
            permanent: true,
            offset: L.point(0, 10),
            direction: 'bottom',

            opacity: 0.8,
          })
          .openTooltip();
    }

    // this is the hintline from the hint marker to the center marker
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);

    // change map cursor
    this._map._container.style.cursor = 'crosshair';

    // create a polygon-point on click
    this._map.on('click', this._placeCenterMarker, this);

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    // fire drawstart event
    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer,
    });

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];
  },
  disable() {
    // disable drawing mode

    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false;

    // reset cursor
    this._map._container.style.cursor = '';

    // unbind listeners
    this._map.off('click', this._finishShape, this);
    this._map.off('click', this._placeCenterMarker, this);
    this._map.off('mousemove', this._syncHintMarker, this);

    // remove helping layers
    this._map.removeLayer(this._layerGroup);

    // fire drawend event
    this._map.fire('pm:drawend', { shape: this._shape });

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }
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
  _syncHintLine() {
    const latlng = this._centerMarker.getLatLng();

    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([latlng, this._hintMarker.getLatLng()]);
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._hintMarker.getLatLng();

    const distance = A.distanceTo(B);

    this._layer.setRadius(distance);
  },
  _syncCircleRadiusMulti() {
    const A = this._centerMarker.getLatLng();
    const B = this._circleMarker.getLatLng();
    const C = this._hintMarker.getLatLng();

    const pt_A = this._map.latLngToContainerPoint(A);
    const pt_B = this._map.latLngToContainerPoint(B);
    const pt_C = this._map.latLngToContainerPoint(C);

    var pt_M = this._calculateCircleCenter(pt_A, pt_B, pt_C);

    //If containerpoints on the same point, because of zooming
    if(isNaN(pt_M.x) || isNaN(pt_M.y) || this.options.circleType === '2point'){
      pt_M = this._calculateCircleCenter2P(pt_A,pt_C);
    }

    const M = this._map.containerPointToLatLng(pt_M);

    const distance = A.distanceTo(M);

    this._layer.setLatLng(M);
    this._layer.setRadius(distance);
  },
  _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }
  },
  _placeCenterMarker(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    this._centerMarker.setLatLng(latlng);

    this._map.off('click', this._placeCenterMarker, this);
    if(this.options.circleType === '3point'){
      this._map.on('click', this._placeCircleMarker, this);
      this._hintMarker.on('move', this._syncHintLine, this);
      this._hintMarker.setTooltipContent(
          getTranslation('tooltips.continueLine')
      );
    }else if(this.options.circleType === '2point'){
      this._map.on('click', this._finishShape, this);
      this._hintMarker.on('move', this._syncHintLine, this);
      this._placeCircleCenter();
    }else{
      this._map.on('click', this._finishShape, this);
      this._placeCircleCenter();
    }

  },
  _placeCircleMarker(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    this._circleMarker.setLatLng(latlng);

    this._map.off('click', this._placeCenterMarker2, this);
    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  },
  _placeCircleCenter() {
    const latlng = this._centerMarker.getLatLng();

    if (latlng) {
      // sync the hintline with hint marker
      if(this.options.circleType === "circle"){
        this._layer.setLatLng(latlng);
        this._hintMarker.on('move', this._syncHintLine, this);
        this._hintMarker.on('move', this._syncCircleRadius, this);

        this._layer.fire('pm:centerplaced', {
          shape: this._shape,
          workingLayer: this._layer,
          latlng,
        });
      }else{
        if(this.options.circleType === "3point"){
          //Disable Hintline
          this._hintMarker.off('move', this._syncHintLine, this);
          this._hintline.setLatLngs([]);
        }

        this._hintMarker.on('move', this._syncCircleRadiusMulti, this);
      }

      this._hintMarker.setTooltipContent(
          getTranslation('tooltips.finishCircle')
      );

    }
  },
  _finishShape(e) {
    var center,radius;
    if(this.options.circleType === 'circle'){
      const cursor = e.latlng;
      center = this._centerMarker.getLatLng();
      radius = center.distanceTo(cursor);
    }else{
      // calc the radius
      center = this._layer.getLatLng();
      radius = this._layer.getRadius();
    }

    const options = Object.assign({}, this.options.pathOptions, { radius });

    // create the final circle layer
    const circleLayer = L.circle(center, options).addTo(this._map);

    // disable drawing
    this.disable();

    // fire the pm:create event and pass shape and layer
    this._map.fire('pm:create', {
      shape: this._shape,
      layer: circleLayer,
    });
  },
  _createMarker(latlng) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    marker._pmTempLayer = true;

    // add it to the map
    this._layerGroup.addLayer(marker);

    return marker;
  },
  _calculateCircleCenter(A,B,C) {
    var yDelta_a = B.y - A.y;
    var xDelta_a = B.x - A.x;
    var yDelta_b = C.y - B.y;
    var xDelta_b = C.x - B.x;

    var center = {};

    var aSlope = yDelta_a / xDelta_a;
    var bSlope = yDelta_b / xDelta_b;

    center.x = (aSlope*bSlope*(A.y - C.y) + bSlope*(A.x + B.x) - aSlope*(B.x+C.x) )/(2* (bSlope-aSlope) );
    center.y = -1*(center.x - (A.x+B.x)/2)/aSlope +  (A.y+B.y)/2;
    return center;

  },
  _calculateCircleCenter2P(A,C){
    var dis = this._distance(A,C);
    var r = dis / 2;
    var bearing = this._bearing(A,C);
    return this._findDestinationPoint(A,r,bearing);
  },

  _findDestinationPoint(point, distance, angle) {
    var result = {};

    angle = angle - 90;

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);

    return result;
  },
  _distance(p1,p2){
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    return Math.sqrt( x*x + y*y );
  },
  _bearing(p1,p2){
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    var _angle = ((Math.atan2(y, x) * 180 / Math.PI) * (-1) - 90)* (-1);
    return _angle < 0 ? _angle + 180 : _angle - 180;
  }
});
