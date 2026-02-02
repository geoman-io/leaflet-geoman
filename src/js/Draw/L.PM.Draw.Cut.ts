import lineIntersect from '@turf/line-intersect';
import lineSplit from '@turf/line-split';
import booleanContains from '@turf/boolean-contains';
import get from 'lodash/get';
import Draw from './L.PM.Draw';
import DrawPolygon from './L.PM.Draw.Polygon';
import {
  difference,
  flattenPolyline,
  groupToMultiLineString,
  intersect,
} from '../helpers/turfHelper';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    optIn: boolean;
    Utils: {
      _getIndexFromSegment: (
        coords: L.LatLng[] | L.LatLng[][],
        segment: L.LatLng[]
      ) => { indexPath: number[]; parentPath: number[]; newIndex: number };
    };
  };
  Util: {
    isArray: (obj: unknown) => boolean;
    falseFn: () => boolean;
  };
};

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  _layers: Record<string, L.Layer>;
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
    removeLayer: (e: { target: L.Layer }) => void;
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * Extended layer with PM properties
 */
type PMLayer = L.Layer & {
  _pmTempLayer?: boolean;
  pm?: {
    enable: (options?: object) => void;
    disable: () => void;
    options: { allowCutting?: boolean };
    _fireEdit: () => void;
    _shape?: string;
  };
  options: L.LayerOptions & {
    pmIgnore?: boolean;
  };
};

/**
 * Extended polygon with latlng info
 */
type ExtendedPolygon = L.Polygon & {
  _latlngInfos?: Array<{ latlng: L.LatLng; snapInfo?: unknown }>;
};

/**
 * Extended polyline with PM properties
 */
type ExtendedPolyline = L.Polyline & {
  _pmTempLayer?: boolean;
  _latlngInfo?: Array<{ latlng: L.LatLng; snapInfo?: unknown }>;
  pm?: {
    _shape?: string;
  };
};

/**
 * Extended marker with PM properties
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
};

/**
 * Extended feature group
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * Edited layer info
 */
interface EditedLayerInfo {
  layer: L.Layer;
  originalLayer: PMLayer;
}

/**
 * Closest layer result
 */
interface ClosestLayerResult {
  segment?: L.LatLng[];
  distance: number;
}

/**
 * Cut draw options
 */
interface CutDrawOptions {
  templineStyle?: L.PolylineOptions;
  hintlineStyle?: L.PolylineOptions;
  pathOptions?: L.PathOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  allowSelfIntersection?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  snapDistance?: number;
  layersToCut?: L.Layer[];
  [key: string]: unknown;
}

/**
 * Draw Cut interface
 */
interface IDrawCut {
  options: CutDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  _enabled: boolean;
  toolbarButtonName: string;
  _layerGroup: ExtendedFeatureGroup;
  _layer: ExtendedPolyline;
  _hintMarker: ExtendedMarker;
  _otherSnapLayers: L.Layer[];
  _doesSelfIntersect: boolean;
  _tempSnapLayerIndex?: number;
  _editedLayers: EditedLayerInfo[];

  _finishShape(): void;
  cut(layer: ExtendedPolygon): void;
  _cutLayer(layer: L.Polygon, l: L.Polyline | L.Polygon): GeoJSON.GeoJsonObject;
  _change(): void;

  // From parent class / mixins
  _setPane(layer: PMLayer, type: 'layerPane' | 'vertexPane' | 'markerPane'): void;
  _fireCut(target: L.Map | PMLayer, layer: L.Layer, originalLayer: PMLayer): void;
  _handleSelfIntersection(addVertex: boolean, latlng?: L.LatLng): void;
  _cleanupSnapping(): void;
  _calcClosestLayer(latlng: L.LatLng, layers: L.Layer[]): ClosestLayerResult | null;
  _addDrawnLayerProp(layer: L.Layer): void;
  _isFirstLayer(): boolean;
  disable(): void;
  enable(): void;
}

const DrawCut = (
  DrawPolygon as unknown as { extend: (props: object) => unknown }
).extend({
  initialize(this: IDrawCut, map: L.Map) {
    this._map = map as unknown as ExtendedMap;
    this._shape = 'Cut';
    this.toolbarButtonName = 'cutPolygon';
  },
  _finishShape(this: IDrawCut) {
    this._editedLayers = [];
    // if self intersection is not allowed, do not finish the shape!
    if (!this.options.allowSelfIntersection) {
      // Check if polygon intersects when is completed and the line between the last and the first point is drawn
      this._handleSelfIntersection(
        true,
        (this._layer.getLatLngs() as L.LatLng[])[0]
      );

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
    const coords = this._layer.getLatLngs() as L.LatLng[];

    // only finish the shape if there are 3 or more vertices
    if (coords.length <= 2) {
      return;
    }

    const polygonLayer = L.polygon(
      coords,
      this.options.pathOptions
    ) as ExtendedPolygon;
    // readout information about the latlngs like snapping points
    polygonLayer._latlngInfos = this._layer._latlngInfo;
    this.cut(polygonLayer);

    // clean up snapping states
    this._cleanupSnapping();

    // remove the first vertex from "other snapping layers"
    if (this._tempSnapLayerIndex !== undefined) {
      this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1);
      delete this._tempSnapLayerIndex;
    }

    this._editedLayers.forEach(({ layer, originalLayer }) => {
      // fire pm:cut on the cutted layer
      this._fireCut(originalLayer, layer, originalLayer);

      // fire pm:cut on the map
      this._fireCut(this._map, layer, originalLayer);

      // fire edit event after cut
      originalLayer.pm?._fireEdit();
    });
    this._editedLayers = [];

    const hintMarkerLatLng = this._hintMarker.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      this._hintMarker.setLatLng(hintMarkerLatLng);
    }
  },
  cut(this: IDrawCut, layer: ExtendedPolygon) {
    const all = this._map._layers;
    // contains information about snapping points
    const _latlngInfos = layer._latlngInfos || [];

    // find all layers that intersect with `layer`, the just drawn cutting layer
    const layers = Object.keys(all)
      // convert object to array
      .map((l) => all[l] as PMLayer)
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
      .filter((l) => l.pm?.options.allowCutting)
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
          const polylineLayer = l as L.Polyline;
          const lineInter =
            lineIntersect(layer.toGeoJSON(15), polylineLayer.toGeoJSON(15))
              .features.length > 0;

          if (
            lineInter ||
            (l instanceof L.Polyline && !(l instanceof L.Polygon))
          ) {
            return lineInter;
          }
          return !!intersect(layer.toGeoJSON(15) as unknown as Parameters<typeof intersect>[0], polylineLayer.toGeoJSON(15) as unknown as Parameters<typeof intersect>[0]);
        } catch {
          if (l instanceof L.Polygon) {
            console.error("You can't cut polygons with self-intersections");
          }
          return false;
        }
      });

    // loop through all layers that intersect with the drawn (cutting) layer
    layers.forEach((l) => {
      let newLayer: L.Polygon | L.Polyline;
      const polylineLayer = l as L.Polyline;
      if (l instanceof L.Polygon) {
        // Also for L.Rectangle
        // easiest way to clone the complete latlngs without reference
        newLayer = L.polygon(polylineLayer.getLatLngs() as L.LatLng[][]);
        const coords = newLayer.getLatLngs() as L.LatLng[][];

        // snapping points added to the layer, so borders are cutted correct
        _latlngInfos.forEach((info) => {
          if (info && info.snapInfo) {
            const { latlng } = info;
            // get closest layer ( == input layer) with the closest segment to the intersection point
            const closest = this._calcClosestLayer(latlng, [newLayer]);
            if (
              closest &&
              closest.segment &&
              closest.distance < this.options.snapDistance!
            ) {
              const { segment } = closest;
              if (segment && segment.length === 2) {
                const { indexPath, parentPath, newIndex } =
                  L.PM.Utils._getIndexFromSegment(coords, segment);
                // define the coordsRing that is edited
                const coordsRing: L.LatLng[] =
                  indexPath.length > 1
                    ? (get(coords, parentPath) as L.LatLng[])
                    : (coords as unknown as L.LatLng[]);
                coordsRing.splice(newIndex, 0, latlng);
              }
            }
          }
        });
      } else {
        // L.Polyline
        newLayer = polylineLayer;
      }

      // find layer difference
      const diff = this._cutLayer(layer, newLayer);

      // the resulting layer after the cut
      let resultLayer: L.GeoJSON | L.Layer = L.geoJSON(
        diff as GeoJSON.GeoJsonObject,
        (l as L.Polyline).options
      );
      if ((resultLayer as L.GeoJSON).getLayers().length === 1) {
        resultLayer = (resultLayer as L.GeoJSON).getLayers()[0]; // prevent that a unnecessary layergroup is created
      }
      this._setPane(resultLayer as PMLayer, 'layerPane');
      const resultingLayer = (resultLayer as L.Layer).addTo(
        this._map.pm._getContainingLayer()
      ) as PMLayer;
      // give the new layer the original options
      resultingLayer.pm?.enable(l.pm?.options);
      resultingLayer.pm?.disable();

      // add templayer prop so pm:remove isn't fired
      l._pmTempLayer = true;
      (layer as unknown as PMLayer)._pmTempLayer = true;

      // remove old layer and cutting layer
      l.remove();
      (l as L.Layer).removeFrom(
        this._map.pm._getContainingLayer() as unknown as L.Map
      );
      layer.remove();
      layer.removeFrom(
        this._map.pm._getContainingLayer() as unknown as L.Map
      );

      // Remove it only if it is a layergroup. It can be only not a layergroup if a layer exists
      const layerGroup = resultingLayer as unknown as L.LayerGroup;
      if (
        typeof layerGroup.getLayers === 'function' &&
        layerGroup.getLayers().length === 0
      ) {
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
  _cutLayer(
    this: IDrawCut,
    layer: L.Polygon,
    l: L.Polyline | L.Polygon
  ): GeoJSON.GeoJsonObject {
    const fg = L.geoJSON();
    let diff: GeoJSON.GeoJsonObject | null = null;
    // cut
    if (l instanceof L.Polygon) {
      // find layer difference
      diff = difference(l.toGeoJSON(15) as unknown as Parameters<typeof difference>[0], layer.toGeoJSON(15) as unknown as Parameters<typeof difference>[0]) as unknown as GeoJSON.GeoJsonObject;
    } else {
      const features = flattenPolyline(l);

      features.forEach((feature) => {
        // get splitted line to look which line part is coverd by the cut polygon
        const lineDiff = lineSplit(
          feature as GeoJSON.Feature<GeoJSON.LineString>,
          layer.toGeoJSON(15)
        );

        let group: L.GeoJSON;
        if (lineDiff && lineDiff.features.length > 0) {
          group = L.geoJSON(lineDiff);
        } else {
          group = L.geoJSON(feature);
        }

        group.getLayers().forEach((lay) => {
          // add only parts to the map, they are not covered by the cut polygon
          if (
            !booleanContains(
              layer.toGeoJSON(15),
              (lay as L.Polyline).toGeoJSON(15)
            )
          ) {
            lay.addTo(fg);
          }
        });
      });

      if (features.length > 1) {
        diff = groupToMultiLineString(fg) as unknown as GeoJSON.GeoJsonObject;
      } else {
        diff = fg.toGeoJSON(15) as unknown as GeoJSON.GeoJsonObject;
      }
    }
    return diff as GeoJSON.GeoJsonObject;
  },
  _change: L.Util.falseFn,
});

// Assign to Draw class
(Draw as unknown as { Cut: unknown }).Cut = DrawCut;

export default DrawCut;
