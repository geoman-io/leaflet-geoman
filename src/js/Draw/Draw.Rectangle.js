import { DivIcon, FeatureGroup, Marker, Point, Rectangle, Util } from 'leaflet';
import { fixLatOffset, getTranslation } from '../helpers';
import Draw from './Draw';
import Utils from '../GeomanUtils';

export default class GeomanDrawRectangle extends Draw {
  initialize(map) {
    this._map = map;
    this._shape = 'Rectangle';
    this.toolbarButtonName = 'drawRectangle';
  }

  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of Geoman.Draw. So a dev could set drawing style one time as some kind of config
    Util.setOptions(this, options);

    // enable draw mode
    this._enabled = true;

    // create a new layergroup
    this._layerGroup = new FeatureGroup();
    this._layerGroup._geomanTempLayer = true;
    this._layerGroup.addTo(this._map);

    // the rectangle we want to draw
    this._layer = new Rectangle(
      [
        [0, 0],
        [0, 0],
      ],
      this.options.templineStyle
    );
    this._setPane(this._layer, 'layerPane');
    this._layer._geomanTempLayer = true;

    // this is the marker at the origin of the rectangle
    // this needs to be present, for tracking purposes, but we'll make it invisible if a user doesn't want to see it!
    this._startMarker = new Marker(this._map.getCenter(), {
      icon: new DivIcon({
        className:
          'leaflet-geoman-vertex-icon leaflet-geoman-rect-start-marker',
      }),
      draggable: false,
      zIndexOffset: -100,
      opacity: this.options.cursorMarker ? 1 : 0,
    });
    this._setPane(this._startMarker, 'vertexPane');
    this._startMarker._geomanTempLayer = true;
    this._layerGroup.addLayer(this._startMarker);

    // this is the hintmarker on the pointer cursor
    this._hintMarker = new Marker(this._map.getCenter(), {
      zIndexOffset: 150,
      icon: new DivIcon({
        className: 'leaflet-geoman-vertex-icon leaflet-geoman-cursor-marker',
      }),
    });
    this._setPane(this._hintMarker, 'vertexPane');
    this._hintMarker._geomanTempLayer = true;
    this._layerGroup.addLayer(this._hintMarker);

    // show the hintmarker if the option is set
    if (this.options.cursorMarker) {
      this._hintMarker._icon.classList.add('leaflet-geoman-visible');
    }

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.firstVertex'), {
          permanent: true,
          offset: new Point(0, 10),
          direction: 'bottom',

          opacity: 0.8,
        })
        .openTooltip();
    }

    if (this.options.cursorMarker) {
      // Add two more matching style markers, if cursor marker is rendered
      this._styleMarkers = [];
      for (let i = 0; i < 2; i += 1) {
        const styleMarker = new Marker(this._map.getCenter(), {
          icon: new DivIcon({
            className:
              'leaflet-geoman-vertex-icon leaflet-geoman-rect-style-marker',
          }),
          draggable: false,
          zIndexOffset: 100,
        });
        this._setPane(styleMarker, 'vertexPane');
        styleMarker._geomanTempLayer = true;
        this._layerGroup.addLayer(styleMarker);

        this._styleMarkers.push(styleMarker);
      }
    }

    // change map cursor
    this._map.getContainer().classList.add('leaflet-geoman-draw-cursor');

    // create a polygon-point on click
    this._map.on('click', this._placeStartingMarkers, this);

    // sync hint marker with pointer cursor
    this._map.on('pointermove', this._syncHintMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.geoman.Toolbar.toggleButton(this.toolbarButtonName, true);

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  }

  disable() {
    // disable drawing mode

    // cancel, if drawing mode isn't event enabled
    if (!this._enabled) {
      return;
    }

    this._enabled = false;

    // reset cursor
    this._map.getContainer().classList.remove('leaflet-geoman-draw-cursor');

    // unbind listeners
    this._map.off('click', this._finishShape, this);
    this._map.off('click', this._placeStartingMarkers, this);
    this._map.off('pointermove', this._syncHintMarker, this);

    // remove helping layers
    this._map.removeLayer(this._layerGroup);

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.geoman.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.allowSnapping) {
      this._cleanupSnapping();
    }
    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  }

  enabled() {
    return this._enabled;
  }

  toggle(options) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  }

  _placeStartingMarkers(e) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // show and place start marker
    this._startMarker._icon.classList.add('leaflet-geoman-visible');
    this._startMarker.setLatLng(latlng);

    // if we have the other two visibilty markers, show and place them now
    if (this.options.cursorMarker && this._styleMarkers) {
      this._styleMarkers.forEach((styleMarker) => {
        styleMarker._icon.classList.add('leaflet-geoman-visible');
        styleMarker.setLatLng(latlng);
      });
    }

    this._map.off('click', this._placeStartingMarkers, this);
    this._map.on('click', this._finishShape, this);

    // change tooltip text
    this._hintMarker.setTooltipContent(getTranslation('tooltips.finishRect'));

    this._setRectangleOrigin();
  }

  _setRectangleOrigin() {
    const latlng = this._startMarker.getLatLng();

    if (latlng) {
      // show it first
      this._layerGroup.addLayer(this._layer);

      this._layer.setLatLngs([latlng, latlng]);

      this._hintMarker.on('move', this._syncRectangleSize, this);
    }
  }

  _syncHintMarker(e) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

    // if snapping is enabled, do it
    if (this.options.allowSnapping) {
      const fakeDragEvent = e;
      fakeDragEvent.target = this._hintMarker;
      this._handleSnapping(fakeDragEvent);
    }

    const latlngs =
      this._layerGroup && this._layerGroup.hasLayer(this._layer)
        ? this._layer.getLatLngs()
        : [this._hintMarker.getLatLng()];
    this._fireChange(latlngs, 'Draw');
  }

  _syncRectangleSize() {
    const A = fixLatOffset(this._startMarker.getLatLng(), this._map);
    const B = fixLatOffset(this._hintMarker.getLatLng(), this._map);

    // Create a (maybe rotated) box using corners A & B (A = Starting Position, B = Current Pointer Position)
    const corners = Utils._getRotatedRectangle(
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
          // ignore error - should be fixed with the next pointermove
        }
      });
    }
  }

  _findCorners() {
    const latlngs = this._layer.getLatLngs()[0];
    return Utils._getRotatedRectangle(
      latlngs[0],
      latlngs[2],
      this.options.rectangleAngle || 0,
      this._map
    );
  }

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

    if (A.equals(B)) {
      // rectangle has only one point
      return;
    }

    // create the final rectangle layer, based on opposite corners A & B
    const rectangleLayer = new Rectangle([A, B], this.options.pathOptions);

    // rectangle can only initialized with bounds (not working with rotation) so we update the latlngs
    if (this.options.rectangleAngle) {
      const corners = Utils._getRotatedRectangle(
        A,
        B,
        this.options.rectangleAngle || 0,
        this._map
      );
      rectangleLayer.setLatLngs(corners);
      if (rectangleLayer.geoman) {
        rectangleLayer.geoman._setAngle(this.options.rectangleAngle || 0);
      }
    }

    this._setPane(rectangleLayer, 'layerPane');
    this._finishLayer(rectangleLayer);
    rectangleLayer.addTo(this._map.geoman._getContainingLayer());

    // fire the geoman:create event and pass shape and layer
    this._fireCreate(rectangleLayer);

    const hintMarkerLatLng = this._hintMarker.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      this._hintMarker.setLatLng(hintMarkerLatLng);
    }
  }

  setStyle() {
    this._layer?.setStyle(this.options.templineStyle);
  }
}
