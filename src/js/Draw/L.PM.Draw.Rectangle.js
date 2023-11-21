import Draw from './L.PM.Draw';
import { fixLatOffset, getTranslation } from '../helpers';

Draw.Rectangle = Draw.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Rectangle';
    this.toolbarButtonName = 'drawRectangle';
  },
  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new L.FeatureGroup();
    this._layerGroup._pmTempLayer = true;
    this._layerGroup.addTo(this._map);

    // the rectangle we want to draw
    this._layer = L.rectangle(
      [
        [0, 0],
        [0, 0],
      ],
      this.options.pathOptions
    );
    this._setPane(this._layer, 'layerPane');
    this._layer._pmTempLayer = true;

    // this is the marker at the origin of the rectangle
    // this needs to be present, for tracking purposes, but we'll make it invisible if a user doesn't want to see it!
    this._startMarker = L.marker(this._map.getCenter(), {
      icon: L.divIcon({ className: 'marker-icon rect-start-marker' }),
      draggable: false,
      zIndexOffset: -100,
      opacity: this.options.cursorMarker ? 1 : 0,
    });
    this._setPane(this._startMarker, 'vertexPane');
    this._startMarker._pmTempLayer = true;
    this._layerGroup.addLayer(this._startMarker);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker(this._map.getCenter(), {
      zIndexOffset: 150,
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

    if (this.options.cursorMarker) {
      // Add two more matching style markers, if cursor marker is rendered
      this._styleMarkers = [];
      for (let i = 0; i < 2; i += 1) {
        const styleMarker = L.marker(this._map.getCenter(), {
          icon: L.divIcon({
            className: 'marker-icon rect-style-marker',
          }),
          draggable: false,
          zIndexOffset: 100,
        });
        this._setPane(styleMarker, 'vertexPane');
        styleMarker._pmTempLayer = true;
        this._layerGroup.addLayer(styleMarker);

        this._styleMarkers.push(styleMarker);
      }
    }

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // create a polygon-point on click
    this._map.on('click', this._placeStartingMarkers, this);

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
    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // unbind listeners
    this._map.off('click', this._finishShape, this);
    this._map.off('click', this._placeStartingMarkers, this);
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
  _placeStartingMarkers(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // show and place start marker
    L.DomUtil.addClass(this._startMarker._icon, 'visible');
    this._startMarker.setLatLng(latlng);

    // if we have the other two visibilty markers, show and place them now
    if (this.options.cursorMarker && this._styleMarkers) {
      this._styleMarkers.forEach((styleMarker) => {
        L.DomUtil.addClass(styleMarker._icon, 'visible');
        styleMarker.setLatLng(latlng);
      });
    }

    this._map.off('click', this._placeStartingMarkers, this);
    this._map.on('click', this._finishShape, this);

    // change tooltip text
    this._hintMarker.setTooltipContent(getTranslation('tooltips.finishRect'));

    this._setRectangleOrigin();
  },
  _setRectangleOrigin() {
    const latlng = this._startMarker.getLatLng();

    if (latlng) {
      // show it first
      this._layerGroup.addLayer(this._layer);

      this._layer.setLatLngs([latlng, latlng]);

      this._hintMarker.on('move', this._syncRectangleSize, this);
    }
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

    const latlngs =
      this._layerGroup && this._layerGroup.hasLayer(this._layer)
        ? this._layer.getLatLngs()
        : [this._hintMarker.getLatLng()];
    this._fireChange(latlngs, 'Draw');
  },
  _syncRectangleSize() {
    const A = fixLatOffset(this._startMarker.getLatLng(), this._map);
    const B = fixLatOffset(this._hintMarker.getLatLng(), this._map);

    // Create a (maybe rotated) box using corners A & B (A = Starting Position, B = Current Mouse Position)
    const corners = L.PM.Utils._getRotatedRectangle(
      A,
      B,
      this.options.rectangleAngle || 0,
      this._map
    );
    this._layer.setLatLngs(corners);

    // Add matching style markers, if cursor marker is shown
    if (this.options.cursorMarker && this._styleMarkers) {
      const unmarkedCorners = [];

      // Find two corners not currently occupied by starting marker and hint marker
      corners.forEach((corner) => {
        // the default equals margin is 1.0e-9 but in other crs projections the latlng equality can be slightly different after `_getRotatedRectangle`, so we make the precession a little bit lower
        if (!corner.equals(A, 1.0e-8) && !corner.equals(B, 1.0e-8)) {
          unmarkedCorners.push(corner);
        }
      });

      // Reposition style markers
      unmarkedCorners.forEach((unmarkedCorner, index) => {
        try {
          this._styleMarkers[index].setLatLng(unmarkedCorner);
        } catch (e) {
          // ignore error - should be fixed with the next mousemove
        }
      });
    }
  },
  _findCorners() {
    const latlngs = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(
      latlngs[0],
      latlngs[2],
      this.options.rectangleAngle || 0,
      this._map
    );
  },
  _finishShape(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const B = this._hintMarker.getLatLng();
    // get already placed corner from the startmarker
    const A = this._startMarker.getLatLng();

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // create the final rectangle layer, based on opposite corners A & B
    const rectangleLayer = L.rectangle([A, B], this.options.pathOptions);

    // rectangle can only initialized with bounds (not working with rotation) so we update the latlngs
    if (this.options.rectangleAngle) {
      const corners = L.PM.Utils._getRotatedRectangle(
        A,
        B,
        this.options.rectangleAngle || 0,
        this._map
      );
      rectangleLayer.setLatLngs(corners);
      if (rectangleLayer.pm) {
        rectangleLayer.pm._setAngle(this.options.rectangleAngle || 0);
      }
    }

    this._setPane(rectangleLayer, 'layerPane');
    this._finishLayer(rectangleLayer);
    rectangleLayer.addTo(this._map.pm._getContainingLayer());

    // fire the pm:create event and pass shape and layer
    this._fireCreate(rectangleLayer);

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
    }
  },
  setStyle() {
    this._layer?.setStyle(this.options.pathOptions);
  },
});
