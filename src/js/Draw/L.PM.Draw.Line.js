import kinks from '@turf/kinks';
import Draw from './L.PM.Draw';

Draw.Line = Draw.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Line';
    this.toolbarButtonName = 'drawPolyline';
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

    // this is the polyLine that'll make up the polygon
    this._layer = L.polyline([], this.options.templineStyle);
    this._setPane(this._layer, 'layerPane');
    this._layer._pmTempLayer = true;
    this._layerGroup.addLayer(this._layer);

    // this is the hintline from the mouse cursor to the last marker
    this._hintline = L.polyline([], this.options.hintlineStyle);
    this._setPane(this._hintline, 'layerPane');
    this._hintline._pmTempLayer = true;
    this._layerGroup.addLayer(this._hintline);

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
        .bindTooltip(L.PM.Translation.getTranslation('tooltips.firstVertex'), {
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

    // sync the hintline with hint marker
    this._hintMarker.on('move', this._syncHintLine, this);

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

    this._enabled = false;

    // reset cursor
    this._map._container.style.cursor = '';

    // unbind listeners
    this._map.off('click', this._createVertex, this);
    this._map.off('mousemove', this._syncHintMarker, this);
    if (this.options.finishOn && this.options.finishOn !== 'snap') {
      this._map.off(this.options.finishOn, this._finishShape, this);
    }

    if (this.tempMapDoubleClickZoomState) {
      this._map.doubleClickZoom.enable();
    }

    // remove layer
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
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);

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
  hasSelfIntersection() {
    // check for self intersection of the layer and return true/false
    const selfIntersection = kinks(this._layer.toGeoJSON(15));
    return selfIntersection.features.length > 0;
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
        color: '#f00000ff',
      });
    } else if (!this._hintline.isEmpty()) {
      this._hintline.setStyle(this.options.hintlineStyle);
    }
  },
  _createVertex(e) {
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

    this._layer._latlngInfo = this._layer._latlngInfo || [];
    this._layer._latlngInfo.push({
      latlng,
      snapInfo: this._hintMarker._snapInfo,
    });

    this._layer.addLatLng(latlng);
    const newMarker = this._createMarker(latlng);
    this._setTooltipText();

    this._hintline.setLatLngs([latlng, latlng]);

    this._fireVertexAdded(newMarker, undefined, latlng, 'Draw');

    // check if we should finish on snap
    if (this.options.finishOn === 'snap' && this._hintMarker._snapped) {
      this._finishShape(e);
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
      .filter((l) => l instanceof L.Marker)
      .filter((l) => !L.DomUtil.hasClass(l._icon, 'cursor-marker'))
      .find((l) => l.getLatLng() === removedCoord);

    const markers = this._layerGroup
      .getLayers()
      .filter((l) => l instanceof L.Marker);
    // the index path to the marker inside the multidimensional marker array
    const { indexPath } = L.PM.Utils.findDeepMarkerIndex(markers, marker);

    // remove that marker
    this._layerGroup.removeLayer(marker);
    // update layer with new coords
    this._layer.setLatLngs(coords);

    // sync the hintline again
    this._syncHintLine();
    this._setTooltipText();

    this._fireVertexRemoved(marker, indexPath, 'Draw');
  },
  _finishShape() {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // get coordinates
    const coords = this._layer.getLatLngs();

    // if there is only one coords, don't finish the shape!
    if (coords.length <= 1) {
      return;
    }

    // create the leaflet shape and add it to the map
    const polylineLayer = L.polyline(coords, this.options.pathOptions);
    this._setPane(polylineLayer, 'layerPane');
    this._finishLayer(polylineLayer);
    polylineLayer.addTo(this._map.pm._getContainingLayer());

    // fire the pm:create event and pass shape and layer
    this._fireCreate(polylineLayer);

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

    // add it to the map
    this._layerGroup.addLayer(marker);

    // a click on any marker finishes this shape
    marker.on('click', this._finishShape, this);

    return marker;
  },
  _setTooltipText() {
    const { length } = this._layer.getLatLngs().flat();
    let text = '';

    // handle tooltip text
    if (length <= 1) {
      text = L.PM.Translation.getTranslation('tooltips.continueLine');
    } else {
      text = L.PM.Translation.getTranslation('tooltips.finishLine');
    }
    this._hintMarker.setTooltipContent(text);
  },
});
