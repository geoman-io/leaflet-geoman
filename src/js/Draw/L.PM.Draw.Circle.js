import Draw from './L.PM.Draw';

import { destinationOnLine, getTranslation } from '../helpers';

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

    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new L.LayerGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // this is the circle we want to draw
    this._layer = L.circle([0, 0], this.options.templineStyle);
    this._setPane(this._layer, 'layerPane');
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);

    // this is the marker in the center of the circle
    this._centerMarker = L.marker([0, 0], {
      icon: L.divIcon({ className: 'marker-icon' }),
      draggable: false,
      zIndexOffset: 100,
    });
    this._setPane(this._centerMarker, 'vertexPane');
    this._centerMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._centerMarker);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker([0, 0], {
      zIndexOffset: 110,
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
        .bindTooltip(getTranslation('tooltips.startCircle'), {
          permanent: true,
          offset: L.point(0, 10),
          direction: 'bottom',
          opacity: 0.8,
        })
        .openTooltip();
    }

    // this is the hintline from the hint marker to the center marker
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._setPane(this._hintline, 'layerPane');
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);

    // change map cursor
    this._map._container.style.cursor = 'crosshair';

    // create a polygon-point on click
    this._map.on('click', this._placeCenterMarker, this);

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
  _syncHintLine() {
    const latlng = this._centerMarker.getLatLng();
    const secondLatLng = this._getNewDestinationOfHintMarker();
    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([latlng, secondLatLng]);
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._hintMarker.getLatLng();

    let distance;

    if (this._map.options.crs === L.CRS.Simple) {
      distance = this._map.distance(A, B);
    } else {
      distance = A.distanceTo(B);
    }

    if (
      this.options.minRadiusCircle &&
      distance < this.options.minRadiusCircle
    ) {
      this._layer.setRadius(this.options.minRadiusCircle);
    } else if (
      this.options.maxRadiusCircle &&
      distance > this.options.maxRadiusCircle
    ) {
      this._layer.setRadius(this.options.maxRadiusCircle);
    } else {
      this._layer.setRadius(distance);
    }
  },
  _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);
    // calculate the new latlng of marker if radius is out of min/max
    this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }

    this._handleHintMarkerSnapping();
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
    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  },
  _placeCircleCenter() {
    const latlng = this._centerMarker.getLatLng();

    if (latlng) {
      this._layer.setLatLng(latlng);

      // sync the hintline with hint marker
      this._hintMarker.on('move', this._syncHintLine, this);
      this._hintMarker.on('move', this._syncCircleRadius, this);

      this._hintMarker.setTooltipContent(
        getTranslation('tooltips.finishCircle')
      );

      this._fireCenterPlaced();
    }
  },
  _finishShape(e) {
    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // calc the radius
    const center = this._centerMarker.getLatLng();
    const latlng = this._hintMarker.getLatLng();

    let radius;

    if (this._map.options.crs === L.CRS.Simple) {
      radius = this._map.distance(center, latlng);
    } else {
      radius = center.distanceTo(latlng);
    }

    if (this.options.minRadiusCircle && radius < this.options.minRadiusCircle) {
      radius = this.options.minRadiusCircle;
    } else if (
      this.options.maxRadiusCircle &&
      radius > this.options.maxRadiusCircle
    ) {
      radius = this.options.maxRadiusCircle;
    }

    const options = { ...this.options.pathOptions, radius };

    // create the final circle layer
    const circleLayer = L.circle(center, options);
    this._setPane(circleLayer, 'layerPane');
    this._finishLayer(circleLayer);
    circleLayer.addTo(this._map.pm._getContainingLayer());

    if (circleLayer.pm) {
      // create polygon around the circle border
      circleLayer.pm._updateHiddenPolyCircle();
    }

    // fire the pm:create event and pass shape and layer
    this._fireCreate(circleLayer);

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
    }
  },
  _getNewDestinationOfHintMarker() {
    const latlng = this._centerMarker.getLatLng();
    let secondLatLng = this._hintMarker.getLatLng();
    const distance = latlng.distanceTo(secondLatLng);

    if (
      this.options.minRadiusCircle &&
      distance < this.options.minRadiusCircle
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this.options.minRadiusCircle
      );
    } else if (
      this.options.maxRadiusCircle &&
      distance > this.options.maxRadiusCircle
    ) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this.options.maxRadiusCircle
      );
    }
    return secondLatLng;
  },
  _handleHintMarkerSnapping() {
    if (this._hintMarker._snapped) {
      const latlng = this._centerMarker.getLatLng();
      const secondLatLng = this._hintMarker.getLatLng();
      const distance = latlng.distanceTo(secondLatLng);
      if (
        this.options.minRadiusCircle &&
        distance < this.options.minRadiusCircle
      ) {
        this._hintMarker.setLatLng(this._hintMarker._orgLatLng);
      } else if (
        this.options.maxRadiusCircle &&
        distance > this.options.maxRadiusCircle
      ) {
        this._hintMarker.setLatLng(this._hintMarker._orgLatLng);
      }
    }
    // calculate the new latlng of marker if the snapped latlng radius is out of min/max
    this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
  },
});
