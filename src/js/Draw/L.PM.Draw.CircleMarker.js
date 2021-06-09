import Draw from './L.PM.Draw';
import { destinationOnLine, getTranslation } from '../helpers';

Draw.CircleMarker = Draw.Marker.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'CircleMarker';
    this.toolbarButtonName = 'drawCircleMarker';
    // with _layerIsDragging we check if a circlemarker is currently dragged and disable marker creation
    this._layerIsDragging = false;
  },
  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // change enabled state
    this._enabled = true;

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // Draw the CircleMarker like a Circle
    if (this.options.editable) {
      // create a new layergroup
      this._layerGroup = new L.LayerGroup();
      this._layerGroup._pmTempLayer = true;
      this._layerGroup.addTo(this._map);

      // this is the circle we want to draw
      this._layer = L.circleMarker([0, 0], this.options.templineStyle);
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
      // create a polygon-point on click
      this._map.on('click', this._placeCenterMarker, this);
      // change map cursor
      this._map._container.style.cursor = 'crosshair';
    } else {
      // create a marker on click on the map
      this._map.on('click', this._createMarker, this);

      // this is the hintmarker on the mouse cursor
      this._hintMarker = L.circleMarker([0, 0], this.options.templineStyle);
      this._setPane(this._hintMarker, 'layerPane');
      this._hintMarker._pmTempLayer = true;
      this._hintMarker.addTo(this._map);
      // this is just to keep the snappable mixin happy
      this._layer = this._hintMarker;

      // add tooltip to hintmarker
      if (this.options.tooltips) {
        this._hintMarker
          .bindTooltip(getTranslation('tooltips.placeCircleMarker'), {
            permanent: true,
            offset: L.point(0, 10),
            direction: 'bottom',

            opacity: 0.8,
          })
          .openTooltip();
      }
    }

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    if (!this.options.editable && this.options.markerEditable) {
      // enable edit mode for existing markers
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          layer.pm.enable();
        }
      });
    }

    this._layer.bringToBack();

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  disable() {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }
    // change enabled state
    this._enabled = false;

    // disable when drawing like a Circle
    if (this.options.editable) {
      // reset cursor
      this._map._container.style.cursor = '';

      // unbind listeners
      this._map.off('click', this._finishShape, this);
      this._map.off('click', this._placeCenterMarker, this);

      // remove helping layers
      this._map.removeLayer(this._layerGroup);
    } else {
      // undbind click event, don't create a marker on click anymore
      this._map.off('click', this._createMarker, this);

      // disable dragging and removing for all markers
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          layer.pm.disable();
        }
      });

      // remove hint marker
      this._hintMarker.remove();
    }

    // remove event listener to sync hint marker
    this._map.off('mousemove', this._syncHintMarker, this);

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
  _syncHintLine() {
    const latlng = this._centerMarker.getLatLng();
    const secondLatLng = this._getNewDestinationOfHintMarker();
    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([latlng, secondLatLng]);
  },
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._hintMarker.getLatLng();

    const distance = this._map.project(A).distanceTo(this._map.project(B));

    if (
      this.options.minRadiusCircleMarker &&
      distance < this.options.minRadiusCircleMarker
    ) {
      this._layer.setRadius(this.options.minRadiusCircleMarker);
    } else if (
      this.options.maxRadiusCircleMarker &&
      distance > this.options.maxRadiusCircleMarker
    ) {
      this._layer.setRadius(this.options.maxRadiusCircleMarker);
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
  isRelevantMarker(layer) {
    return (
      layer instanceof L.CircleMarker &&
      !(layer instanceof L.Circle) &&
      layer.pm &&
      !layer._pmTempLayer
    );
  },
  _createMarker(e) {
    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // with _layerIsDragging we check if a circlemarker is currently dragged
    if (!e.latlng || this._layerIsDragging) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // create marker
    const marker = L.circleMarker(latlng, this.options.pathOptions);
    this._setPane(marker, 'layerPane');
    this._finishLayer(marker);
    // add marker to the map
    marker.addTo(this._map.pm._getContainingLayer());

    if (marker.pm && this.options.markerEditable) {
      // enable editing for the marker
      marker.pm.enable();
    }

    // fire the pm:create event and pass shape and marker
    this._fireCreate(marker);

    this._cleanupSnapping();

    if (!this.options.continueDrawing) {
      this.disable();
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
    let radius = this._map
      .project(center)
      .distanceTo(this._map.project(latlng));

    if (this.options.editable) {
      if (
        this.options.minRadiusCircleMarker &&
        radius < this.options.minRadiusCircleMarker
      ) {
        radius = this.options.minRadiusCircleMarker;
      } else if (
        this.options.maxRadiusCircleMarker &&
        radius > this.options.maxRadiusCircleMarker
      ) {
        radius = this.options.maxRadiusCircleMarker;
      }
    }

    const options = { ...this.options.pathOptions, radius };

    // create the final circle layer
    const circleLayer = L.circleMarker(center, options);
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
    let secondLatLng = this._hintMarker.getLatLng();
    if (this.options.editable) {
      const latlng = this._centerMarker.getLatLng();
      const distance = this._map
        .project(latlng)
        .distanceTo(this._map.project(secondLatLng));
      if (
        this.options.minRadiusCircleMarker &&
        distance < this.options.minRadiusCircleMarker
      ) {
        secondLatLng = destinationOnLine(
          this._map,
          latlng,
          secondLatLng,
          this._pxRadiusToMeter(this.options.minRadiusCircleMarker)
        );
      } else if (
        this.options.maxRadiusCircleMarker &&
        distance > this.options.maxRadiusCircleMarker
      ) {
        secondLatLng = destinationOnLine(
          this._map,
          latlng,
          secondLatLng,
          this._pxRadiusToMeter(this.options.maxRadiusCircleMarker)
        );
      }
    }
    return secondLatLng;
  },
  _handleHintMarkerSnapping() {
    if (this.options.editable) {
      if (this._hintMarker._snapped) {
        const latlng = this._centerMarker.getLatLng();
        const secondLatLng = this._hintMarker.getLatLng();
        const distance = this._map
          .project(latlng)
          .distanceTo(this._map.project(secondLatLng));
        if (
          this.options.minRadiusCircleMarker &&
          distance < this.options.minRadiusCircleMarker
        ) {
          this._hintMarker.setLatLng(this._hintMarker._orgLatLng);
        } else if (
          this.options.maxRadiusCircleMarker &&
          distance > this.options.maxRadiusCircleMarker
        ) {
          this._hintMarker.setLatLng(this._hintMarker._orgLatLng);
        }
      }
      // calculate the new latlng of marker if the snapped latlng radius is out of min/max
      this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
    }
  },
  _pxRadiusToMeter(radius) {
    const center = this._centerMarker.getLatLng();
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);
    return this._map.unproject(pointB).distanceTo(center);
  },
});
