import lineIntersect from '@turf/line-intersect';
import lineSplit from '@turf/line-split';
import booleanContains from '@turf/boolean-contains';
import get from 'lodash/get';
import Draw from './L.PM.Draw';
import {
  difference,
  flattenPolyline,
  groupToMultiLineString,
  intersect,
} from '../helpers/turfHelper';

Draw.Cut = Draw.Polygon.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Cut';
    this.toolbarButtonName = 'cutPolygon';
  },
  _finishShape() {
    this._editedLayers = [];
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      // Check if polygon intersects when is completed and the line between the last and the first point is drawn
      this._handleSelfIntersection(true, this._layer.getLatLngs()[0]);

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

    // only finish the shape if there are 3 or more vertices
    if (coords.length <= 2) {
      return;
    }

    const polygonLayer = L.polygon(coords, this.options.pathOptions);
    // readout information about the latlngs like snapping points
    polygonLayer._latlngInfos = this._layer._latlngInfo;
    this.cut(polygonLayer);

    // clean up snapping states
    this._cleanupSnapping();

    // remove the first vertex from "other snapping layers"
    this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
    delete this._tempSnapLayerIndex;

    this._editedLayers.forEach(({ layer, originalLayer }) => {
      // fire pm:cut on the cutted layer
      this._fireCut(originalLayer, layer, originalLayer);

      // fire pm:cut on the map
      this._fireCut(this._map, layer, originalLayer);

      // fire edit event after cut
      originalLayer.pm._fireEdit();
    });
    this._editedLayers = [];

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
    }
  },
  cut(layer) {
    const all = this._map._layers;
    // contains information about snapping points
    const _latlngInfos = layer._latlngInfos || [];

    // find all layers that intersect with `layer`, the just drawn cutting layer
    const layers = Object.keys(all)
      // convert object to array
      .map((l) => all[l])
      // only layers handled by leaflet-geoman
      .filter((l) => l.pm)
      .filter((l) => !l._pmTempLayer)
      // filter out everything that ignore leaflet-geoman
      .filter(
        (l) =>
          (!L.PM.optIn && !l.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
          (L.PM.optIn && l.options.pmIgnore === false) // if optIn is true and pmIgnore is false);
      )
      // only polyline instances
      .filter((l) => l instanceof L.Polyline)
      // exclude the drawn one
      .filter((l) => l !== layer)
      // layer is allowed to cut
      .filter((l) => l.pm.options.allowCutting)
      // filter out everything that ignore leaflet-geoman
      .filter((l) => {
        // TODO: after cutting nothing else can be cutted anymore until a new list is passed, because the layers don't exists anymore. Should we remove the cutted layers from the list?
        if (
          this.options.layersToCut &&
          L.Util.isArray(this.options.layersToCut) &&
          this.options.layersToCut.length > 0
        ) {
          return this.options.layersToCut.indexOf(l) > -1;
        }
        return true;
      })
      // filter out everything that ignore leaflet-geoman
      .filter((l) => !this._layerGroup.hasLayer(l))
      // only layers with intersections
      .filter((l) => {
        try {
          const lineInter =
            !!lineIntersect(layer.toGeoJSON(15), l.toGeoJSON(15)).features
              .length > 0;

          if (
            lineInter ||
            (l instanceof L.Polyline && !(l instanceof L.Polygon))
          ) {
            return lineInter;
          }
          return !!intersect(layer.toGeoJSON(15), l.toGeoJSON(15));
        } catch (e) {
          if (l instanceof L.Polygon) {
            /* eslint-disable-next-line no-console */
            console.error("You can't cut polygons with self-intersections");
          }
          return false;
        }
      });

    // loop through all layers that intersect with the drawn (cutting) layer
    layers.forEach((l) => {
      let newLayer;
      if (l instanceof L.Polygon) {
        // Also for L.Rectangle
        // easiest way to clone the complete latlngs without reference
        newLayer = L.polygon(l.getLatLngs());
        const coords = newLayer.getLatLngs();

        // snapping points added to the layer, so borders are cutted correct
        _latlngInfos.forEach((info) => {
          if (info && info.snapInfo) {
            const { latlng } = info;
            // get closest layer ( == input layer) with the closest segment to the intersection point
            const closest = this._calcClosestLayer(latlng, [newLayer]);
            if (
              closest &&
              closest.segment &&
              closest.distance < this.options.snapDistance
            ) {
              const { segment } = closest;
              if (segment && segment.length === 2) {
                const {
                  indexPath,
                  parentPath,
                  newIndex,
                } = L.PM.Utils._getIndexFromSegment(coords, segment);
                // define the coordsRing that is edited
                const coordsRing =
                  indexPath.length > 1 ? get(coords, parentPath) : coords;
                coordsRing.splice(newIndex, 0, latlng);
              }
            }
          }
        });
      } else {
        // L.Polyline
        newLayer = l;
      }

      // find layer difference
      const diff = this._cutLayer(layer, newLayer);

      // the resulting layer after the cut
      let resultLayer = L.geoJSON(diff, l.options);
      if (resultLayer.getLayers().length === 1) {
        [resultLayer] = resultLayer.getLayers(); // prevent that a unnecessary layergroup is created
      }
      this._setPane(resultLayer, 'layerPane');
      const resultingLayer = resultLayer.addTo(
        this._map.pm._getContainingLayer()
      );
      // give the new layer the original options
      resultingLayer.pm.enable(l.pm.options);
      resultingLayer.pm.disable();

      // add templayer prop so pm:remove isn't fired
      l._pmTempLayer = true;
      layer._pmTempLayer = true;

      // remove old layer and cutting layer
      l.remove();
      l.removeFrom(this._map.pm._getContainingLayer());
      layer.remove();
      layer.removeFrom(this._map.pm._getContainingLayer());

      // Remove it only if it is a layergroup. It can be only not a layergroup if a layer exists
      if (resultingLayer.getLayers && resultingLayer.getLayers().length === 0) {
        this._map.pm.removeLayer({ target: resultingLayer });
      }

      if (resultingLayer instanceof L.LayerGroup) {
        resultingLayer.eachLayer((_layer) => {
          this._addDrawnLayerProp(_layer);
        });
        this._addDrawnLayerProp(resultingLayer);
      } else {
        this._addDrawnLayerProp(resultingLayer);
      }

      if (
        this.options.layersToCut &&
        L.Util.isArray(this.options.layersToCut) &&
        this.options.layersToCut.length > 0
      ) {
        const idx = this.options.layersToCut.indexOf(l);
        if (idx > -1) {
          this.options.layersToCut.splice(idx, 1);
        }
      }

      this._editedLayers.push({
        layer: resultingLayer,
        originalLayer: l,
      });
    });
  },
  _cutLayer(layer, l) {
    const fg = L.geoJSON();
    let diff;
    // cut
    if (l instanceof L.Polygon) {
      // find layer difference
      diff = difference(l.toGeoJSON(15), layer.toGeoJSON(15));
    } else {
      const features = flattenPolyline(l);

      features.forEach((feature) => {
        // get splitted line to look which line part is coverd by the cut polygon
        const lineDiff = lineSplit(feature, layer.toGeoJSON(15));

        let group;
        if (lineDiff && lineDiff.features.length > 0) {
          group = L.geoJSON(lineDiff);
        } else {
          group = L.geoJSON(feature);
        }

        group.getLayers().forEach((lay) => {
          // add only parts to the map, they are not covered by the cut polygon
          if (!booleanContains(layer.toGeoJSON(15), lay.toGeoJSON(15))) {
            lay.addTo(fg);
          }
        });
      });

      if (features.length > 1) {
        diff = groupToMultiLineString(fg);
      } else {
        diff = fg.toGeoJSON(15);
      }
    }
    return diff;
  },
  _change: L.Util.falseFn,
});
