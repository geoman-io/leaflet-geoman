import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.Polygon = Draw.Line.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Polygon';
    this.toolbarButtonName = 'drawPolygon';
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
    } else {
      // add a click event w/ no handler to the marker
      // event won't bubble so prevents creation of identical markers in same polygon
      // fixes issue where double click during poly creation when allowSelfIntersection: false caused it to break
      marker.on('click', () => (1));
      this._otherSnapLayers.push(marker);
    }

    const second = this._layer.getLatLngs().length === 2;
    if (second) {
      // adding layer to the snapping list after a segment is created (two markers needed)
      this._otherSnapLayers.push(this._layer);
    }

    if (this.options.snappable) {
      this._cleanupSnapping();
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
  _finishShape(e) {
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      // Check if polygon intersects when is completed and the line between the last and the first point is drawn
      this._handleSelfIntersection(true, this._layer.getLatLngs()[0]);

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

    const polygonLayer = L.polygon(coords, this.options.pathOptions).addTo(
      this._map
    );
    this._setShapeForFinishLayer(polygonLayer);
    this._addDrawnLayerProp(polygonLayer);

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
});
