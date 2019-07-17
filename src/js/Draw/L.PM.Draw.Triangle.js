import Draw from './L.PM.Draw';
import { getTranslation } from '../helpers';

Draw.Triangle = Draw.Line.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Triangle';
    this.toolbarButtonName = 'drawTriangle';
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
    // this is the hinttrianlge
    this._hintline_triangle = L.polyline([], this.options.hintlineStyle);
    this._hintline_triangle._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline_triangle);

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
    this._hintMarker.off('move', this._syncHintTriangle, this);

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
  _createVertex(e) {
    var latlng_mouse = e.latlng;
    const polyPoints = this._layer.getLatLngs();
    if (polyPoints.length > 0 && window.pm._shiftpressed && this.options.allowShift) {
      const lastPolygonPoint = polyPoints[polyPoints.length - 1];
      e.latlng = this._getPointofAngle(lastPolygonPoint,e.latlng); //Because of Intersection
    }

    // is this the first point?
    const _first = this._layer.getLatLngs().length === 0;
    if(_first) {
      this._middlePoint = e.latlng;
      this._hintMarker.on('move', this._syncHintTriangle, this);
    }else{
        this._finishShape(e);
        return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      // move the cursor marker
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // is this the first point?
    const first = this._layer.getLatLngs().length === 0;

    this._layer.addLatLng(latlng);
    const newMarker = this._createMarker(latlng, first);


    //Draw new Line to mouse after creating
    var pt2 = this._getPointofAngle(latlng,latlng_mouse);
    this._hintline.setLatLngs([latlng, pt2]);
    this._hintMarker.setLatLng(pt2);

    //this._hintline.setLatLngs([latlng, latlng]);

    this._layer.fire('pm:vertexadded', {
      shape: this._shape,
      workingLayer: this._layer,
      marker: newMarker,
      latlng,
    });
  },
  _syncHintTriangle(e) {
    var p_mouse = this._map.latLngToContainerPoint(this._hintMarker.getLatLng());
    var p_middle = this._map.latLngToContainerPoint(this._middlePoint);
    var x = p_mouse.x - p_middle.x;
    var y = p_mouse.y - p_middle.y;
    var dis = Math.sqrt( x*x + y*y );
    var l = ((dis * 1.5)/Math.sqrt(3))*2;

    var _angle = ((Math.atan2(y, x) * 180 / Math.PI) * (-1) - 90)* (-1);
    var bearing = _angle > 180 ? _angle - 360 : _angle;

    var b_r = bearing + (-150);
    var angle_r = b_r > 180 ? b_r - 360 : b_r;
    var b_l = bearing + 150;
    var angle_l = b_l < -180 ? b_l + 360 : b_l;

    var des_l2 = this._findDestinationPoint(p_mouse,l,angle_l);
    var des_r2 = this._findDestinationPoint(p_mouse,l,angle_r);

    this._lpt2 = this._map.containerPointToLatLng(des_l2);
    this._rpt2 = this._map.containerPointToLatLng(des_r2);

    this._hintline_triangle.setLatLngs([
        e.latlng,
        this._lpt2,
        this._rpt2,
        e.latlng
    ]);
  },
  _findDestinationPoint(point, distance, angle) {
    var result = {};

    angle = angle < 0 ? angle + 360 : angle;

    angle = angle - 90;

    result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);
    result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);

    return result;
  },

  _finishShape(e) {
    const toppoint = e.latlng;
    const coords = [ toppoint,
      this._lpt2,
      this._rpt2];

    const triangleLayer = L.triangle(coords, this.options.pathOptions).addTo(
        this._map
    );
    triangleLayer.setCenter(this._middlePoint);
    triangleLayer.setTop(toppoint);

    // disable drawing
    this.disable();

    // fire the pm:create event and pass shape and layer
    this._map.fire('pm:create', {
      shape: this._shape,
      layer: triangleLayer,
    });

    // clean up snapping states
    this._cleanupSnapping();

    // remove the first vertex from "other snapping layers"
    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
    delete this._tempSnapLayerIndex;
  },
  _createMarker(latlng, first) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });

    // mark this marker as temporary
    marker._pmTempLayer = true;

    // add it to the map
    this._layerGroup.addLayer(marker);

    // if the first marker gets clicked again, finish this shape
    if (first) {
      marker.on('click', this._finishShape, this);

      // add the first vertex to "other snapping layers" so the polygon is easier to finish
      this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;

      if (this.options.snappable) {
        this._cleanupSnapping();
      }
    }

    // handle tooltip text
    if (first) {
      this._hintMarker.setTooltipContent(
          getTranslation('tooltips.finishRect')
      );
    }

    return marker;
  },
});

L.Triangle = L.Polygon.extend({
  setCenter(latlng){
    this.options.center = latlng;
  },
  getCenter(){
    return this.options.center;
  },
  setTop(latlng){
    this.options.top = latlng;
  },
  getTop(){
    return this.options.top;
  }
});

L.triangle = function (latlng, options) {
  return new L.Triangle(latlng, options);
};


