import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.Polygon = Draw.Line.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Polygon';
    this.toolbarButtonName = 'drawPolygon';
  },
  _finishShape(e) {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      this._handleSelfIntersection(false);

      if (this._doesSelfIntersect) {
        return;
      }
    }

    // get coordinates
    const coords = this._layer.getLatLngs();

    // only finish the shape if there are 3 or more vertices
    if (coords.length <= 2) {
      return;
    }

    // create the leaflet shape and add it to the map
    if (e && e.type === 'dblclick') {
      // Leaflet creates an extra node with double click
      coords.splice(coords.length - 1, 1);
    }
    const polygonLayer = L.polygon(coords, this.options.pathOptions).addTo(
      this._map
    );

    // disable drawing
    this.disable();

    // fire the pm:create event and pass shape and layer
    this._map.fire('pm:create', {
      shape: this._shape,
      layer: polygonLayer,
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
        getTranslation('tooltips.continueLine')
      );
    }
    const third = this._layer.getLatLngs().length === 3;

    if (third) {
      this._hintMarker.setTooltipContent(getTranslation('tooltips.finishPoly'));
    }

    return marker;
  },
});
