import kinks from '@turf/kinks';
import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.Line = Draw.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Line';
    this.toolbarButtonName = 'drawPolyline';
    this._doesSelfIntersect = false;
  },
  enable(options) {
    L.Util.setOptions(this, options);

    // fallback option for finishOnDoubleClick
    // TODO: remove in a later release
    if (this.options.finishOnDoubleClick && !this.options.finishOn) {
      this.options.finishOn = 'dblclick';
    }

    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // this is the polyLine that'll make up the polygon
    this._layer = L.polyline([], this.options.templineStyle);
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);

    // this is the hintline from the mouse cursor to the last marker
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker(this._map.getCenter(), {
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

    // create a polygon-point on click
    this._map.on('click', this._createVertex, this);

    // finish on layer event
    // #http://leafletjs.com/reference-1.2.0.html#interactive-layer-click
    if (this.options.finishOn) {
      console.log(this.options.finishOn);
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

    // sync the hintline with hint marker
    this._hintMarker.on('move', this._syncHintLine, this);

    if(this.options.allowShift) {
      //Because "this" not working in the listener
      window.pm = {
        _map:  this._map,
        _shiftpressed: false,
        _defaultBox: this._map.boxZoom.enabled(),
      };
      //Not working in IE, problem?
      document.addEventListener('keydown', this._keyDownFunction);
      document.addEventListener('keyup', this._keyDownFunction);
    }

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
    // disable draw mode

    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false;

    // reset cursor
    this._map._container.style.cursor = '';

    // unbind listeners
    this._map.off('click', this._createVertex, this);
    this._map.off('mousemove', this._syncHintMarker, this);
    if (this.options.finishOn) {
      this._map.off(this.options.finishOn, this._finishShape, this);
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    }

    document.removeEventListener('keydown', this._keyDownFunction);
    document.removeEventListener('keyup', this._keyDownFunction);
    //Reset to default boxZoom
    if(this.options.allowShift && window.pm._defaultBox) {
      window.pm._defaultBox === true ? window.pm._map.boxZoom.enable() : window.pm._map.boxZoom.disable();
    }
    // remove layer
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
  hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    const selfIntersection = kinks(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
  },
  _syncHintLine() {
    const polyPoints = this._layer.getLatLngs();

    if (polyPoints.length > 0) {
      const lastPolygonPoint = polyPoints[polyPoints.length - 1];

      // set coords for hintline from marker to last vertex of drawin polyline
      this._hintline.setLatLngs([
        lastPolygonPoint,
        this._hintMarker.getLatLng(),
      ]);
    }
  },
  _syncHintMarker(e) {
    const polyPoints = this._layer.getLatLngs();
    if (polyPoints.length > 0 && window.pm._shiftpressed && this.options.allowShift) {
      const lastPolygonPoint = polyPoints[polyPoints.length - 1];
      var latlng_mouse = e.latlng;

      var pt = this._getPointofAngle(lastPolygonPoint,latlng_mouse);

      this._hintMarker.setLatLng(pt);
      e.latlng = pt; //Because of intersection
    }else {
      // move the cursor marker
      this._hintMarker.setLatLng(e.latlng);
    }

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }

    // if self-intersection is forbidden, handle it
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);
    }
  },
  _handleSelfIntersection(addVertex, latlng) {
    // ok we need to check the self intersection here
    // problem: during draw, the marker on the cursor is not yet part
    // of the layer. So we need to clone the layer, add the
    // potential new vertex (cursor markers latlngs) and check the self
    // intersection on the clone. Phew... - let's do it 💪

    // clone layer (polyline is enough, even when it's a polygon)
    const clone = L.polyline(this._layer.getLatLngs());

    if (addVertex) {
      // get vertex from param or from hintmarker
      if (!latlng) {
        latlng = this._hintMarker.getLatLng();
      }

      // add the vertex
      clone.addLatLng(latlng);
    }

    // check the self intersection
    const selfIntersection = kinks(clone.toGeoJSON(15));
    this._doesSelfIntersect = selfIntersection.features.length > 0;

    // change the style based on self intersection
    if (this._doesSelfIntersect) {
      this._hintline.setStyle({
        color: 'red',
      });
    } else {
      this._hintline.setStyle(this.options.hintlineStyle);
    }
  },
  _removeLastVertex() {
    // remove last coords
    const coords = this._layer.getLatLngs();
    const removedCoord = coords.pop();

    // if all coords are gone, cancel drawing
    if (coords.length < 1) {
      this.disable();
      return;
    }

    // find corresponding marker
    const marker = this._layerGroup
      .getLayers()
      .filter(l => l instanceof L.Marker)
      .filter(l => !L.DomUtil.hasClass(l._icon, 'cursor-marker'))
      .find(l => l.getLatLng() === removedCoord);

    // remove that marker
    this._layerGroup.removeLayer(marker);

    // update layer with new coords
    this._layer.setLatLngs(coords);

    // sync the hintline again
    this._syncHintLine();
  },
  _createVertex(e) {
    //Save mouse latlng bevor overwritten
    var latlng_mouse = e.latlng;
    const polyPoints = this._layer.getLatLngs();
    if (polyPoints.length > 0 && window.pm._shiftpressed && this.options.allowShift) {
      const lastPolygonPoint = polyPoints[polyPoints.length - 1];
      e.latlng = this._getPointofAngle(lastPolygonPoint,e.latlng); //Because of Intersection
    }

    // don't create a vertex if we have a selfIntersection and it is not allowed
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(true, e.latlng);

      if (this._doesSelfIntersect) {
        return;
      }
    }


    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
        // move the cursor marker
        this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // check if the first and this vertex have the same latlng
    if (latlng.equals(this._layer.getLatLngs()[0])) {
      // yes? finish the polygon
      this._finishShape(e);

      // "why?", you ask? Because this happens when we snap the last vertex to the first one
      // and then click without hitting the last marker. Click happens on the map
      // in 99% of cases it's because the user wants to finish the polygon. So...
      return;
    }

    // is this the first point?
    const first = this._layer.getLatLngs().length === 0;

    this._layer.addLatLng(latlng);
    const newMarker = this._createMarker(latlng, first);

    //Draw new Line to mouse after creating
    var pt2 = this._getPointofAngle(latlng,latlng_mouse);
    this._hintline.setLatLngs([latlng, pt2]);
    this._hintMarker.setLatLng(pt2);

    this._layer.fire('pm:vertexadded', {
      shape: this._shape,
      workingLayer: this._layer,
      marker: newMarker,
      latlng,
    });
  },
  _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    // get coordinates
    const coords = this._layer.getLatLngs();

    // if there is only one coords, don't finish the shape!
    if (coords.length <= 1) {
      return;
    }

    // create the leaflet shape and add it to the map
    const polylineLayer = L.polyline(coords, this.options.pathOptions).addTo(
      this._map
    );

    // disable drawing
    this.disable();

    // fire the pm:create event and pass shape and layer
    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polylineLayer,
    });

    if (this.options.snappable) {
      this._cleanupSnapping();
    }
  },
  _createMarker(latlng, first) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    marker._pmTempLayer = true;

    // add it to the map
    this._layerGroup.addLayer(marker);

    // a click on any marker finishes this shape
    marker.on('click', this._finishShape, this);

    // handle tooltip text
    if (first) {
      this._hintMarker.setTooltipContent(
        getTranslation('tooltips.continueLine')
      );
    }
    const second = this._layer.getLatLngs().length === 2;

    if (second) {
      this._hintMarker.setTooltipContent(getTranslation('tooltips.finishLine'));
    }

    return marker;
  },
  _keyDownFunction(e) {
   // this._shiftpressed = e.shiftKey; //not working
    window.pm._shiftpressed = e.shiftKey;

    //Reset to default boxZoom
    if(window.pm._defaultBox) {
      e.shiftKey === true ? window.pm._map.boxZoom.disable() : window.pm._map.boxZoom.enable();
    }
  },
  _getPointofAngle(latlng_p1,latlng_p2) {
    var p1 = this._map.latLngToContainerPoint(latlng_p1);
    var p2 = this._map.latLngToContainerPoint(latlng_p2);

    var distance2 = this._distance(p1, p2);

    //Get bearing between the two points
    var bearing = this._bearing(p1, p2);

    var angle = 0;
    //45° steps
    if(bearing <= 22.5 && bearing > -22.5){
      angle = 0;
    }else if(bearing <= 67.5 && bearing > 22.5){
      angle = 45;
    }else if(bearing <= 112.5 && bearing > 67.5){
      angle = 90;
    }else if(bearing <= 157.5 && bearing > 112.5){
      angle = 135;
    }else if(bearing <= 180 && bearing > 157.5){
      angle = 180;
    }else if(bearing <= -157.5 && bearing > -180){
      angle = -180;
    }else if(bearing <= -112.5 && bearing > -157.5 ){
      angle = -135;
    }else if(bearing <= -67.5 && bearing > -112.5 ){
      angle = -90;
    }else if(bearing <= -22.5 && bearing > -67.5 ){
      angle = -45;
    }

    var point_result2 = this._findDestinationPoint(p1, distance2, angle);
    return this._map.containerPointToLatLng(point_result2);
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
