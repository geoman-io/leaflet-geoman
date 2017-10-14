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

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape, workingLayer: this._layer });

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
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._createVertex, this);
        this._map.off('mousemove', this._syncHintMarker, this);
        if (this.options.finishOn) {
            this._map.off(this.options.finishOn, this._finishShape, this);
        }

        if (this.tempMapDoubleClickZoomState) {
            this._map.doubleClickZoom.enable();
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
        const selfIntersection = kinks(this._layer.toGeoJSON());
        return selfIntersection.features.length > 0;
    },
    _syncHintLine() {
        const polyPoints = this._layer.getLatLngs();

        if (polyPoints.length > 0) {
            const lastPolygonPoint = polyPoints[polyPoints.length - 1];

            // set coords for hintline from marker to last vertex of drawin polyline
            this._hintline.setLatLngs([lastPolygonPoint, this._hintMarker.getLatLng()]);
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
            this._handleSelfIntersection();
        }
    },
    _handleSelfIntersection() {
        // ok we need to check the self intersection here
        // problem: during draw, the marker on the cursor is not yet part
        // of the layer. So we need to clone the layer, add the
        // potential new vertex (cursor markers latlngs) and check the self
        // intersection on the clone. Phew... - let's do it 💪

        // clone layer (polyline is enough, even when it's a polygon)
        const clone = L.polyline(this._layer.getLatLngs());

        // add the vertex
        clone.addLatLng(this._hintMarker.getLatLng());

        // check the self intersection
        const selfIntersection = kinks(clone.toGeoJSON());
        this._doesSelfIntersect = selfIntersection.features.length > 0;

        // change the style based on self intersection
        if (this._doesSelfIntersect) {
            this._hintline.setStyle({
                color: 'red',
            });
        } else {
            this._hintline.setStyle({
                color: '#3388ff',
            });
        }
    },
    _createVertex(e) {
        if (!this.options.allowSelfIntersection && this._doesSelfIntersect) {
            return;
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

        // is this the first point?
        const first = this._layer.getLatLngs().length === 0;

        this._layer.addLatLng(latlng);
        const newMarker = this._createMarker(latlng, first);

        this._hintline.setLatLngs([latlng, latlng]);

        this._layer.fire('pm:vertexadded', {
            shape: this._shape,
            workingLayer: this._layer,
            marker: newMarker,
            latlng,
        });
    },
    _finishShape() {
        // if self intersection is not allowed, do not finish the shape!
        if (!this.options.allowSelfIntersection && this._doesSelfIntersect) {
            return;
        }

        // get coordinates, create the leaflet shape and add it to the map
        const coords = this._layer.getLatLngs();
        const polylineLayer = L.polyline(coords, this.options.pathOptions).addTo(this._map);

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
    _createMarker(latlng) {
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

        return marker;
    },
});
