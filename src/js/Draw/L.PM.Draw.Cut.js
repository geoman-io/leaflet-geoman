import intersect from '@turf/intersect';
import difference from '@turf/difference';
import Draw from './L.PM.Draw';

Draw.Cut = Draw.Polygon.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Cut';
    this.toolbarButtonName = 'cutPolygon';
  },
  _cut(layer) {
    const all = this._map._layers;

    // find all layers that intersect with `layer`, the just drawn cutting layer
    const layers = Object.keys(all)
      // convert object to array
      .map(l => all[l])
      // only layers handled by leaflet-geoman
      .filter(l => l.pm)
      // only polygons
      .filter(l => l instanceof L.Polygon)
      // exclude the drawn one
      .filter(l => l !== layer)
      // only layers with intersections
      .filter(l => {
        try {
          return !!intersect(layer.toGeoJSON(15), l.toGeoJSON(15));
        } catch (e) {
          /* eslint-disable-next-line no-console */
          console.error('You cant cut polygons with self-intersections');
          return false;
        }
      });

    // loop through all layers that intersect with the drawn (cutting) layer
    layers.forEach(l => {
      // find layer difference
      const diff = difference(l.toGeoJSON(15), layer.toGeoJSON(15));

      // the resulting layer after the cut
      const resultingLayer = L.geoJSON(diff, l.options).addTo(this._map);
      resultingLayer.addTo(this._map);

      // give the new layer the original options
      resultingLayer.pm.enable(this.options);
      resultingLayer.pm.disable();

      // fire pm:cut on the cutted layer
      l.fire('pm:cut', {
        shape: this._shape,
        layer: resultingLayer,
        originalLayer: l,
      });

      // fire pm:cut on the map
      this._map.fire('pm:cut', {
        shape: this._shape,
        layer: resultingLayer,
        originalLayer: l,
      });

      // add templayer prop so pm:remove isn't fired
      l._pmTempLayer = true;
      layer._pmTempLayer = true;

      // remove old layer and cutting layer
      l.remove();
      layer.remove();

      if (resultingLayer.getLayers().length === 0) {
        this._map.pm.removeLayer({ target: resultingLayer });
      }
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

    const coords = this._layer.getLatLngs();
    const polygonLayer = L.polygon(coords, this.options.pathOptions);
    this._cut(polygonLayer);

    // disable drawing
    this.disable();

    // clean up snapping states
    this._cleanupSnapping();

    // remove the first vertex from "other snapping layers"
    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
    delete this._tempSnapLayerIndex;
  },
});
