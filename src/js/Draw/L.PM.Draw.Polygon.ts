/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
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
    _shape?: string;
  };
};

/**
 * Extended polyline with PM properties
 */
type ExtendedPolyline = L.Polyline & {
  getLatLngs(): L.LatLng[];
  _pmTempLayer?: boolean;
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
 * Polygon draw options
 */
interface PolygonDrawOptions {
  templineStyle: L.PolylineOptions;
  hintlineStyle: L.PolylineOptions;
  pathOptions?: L.PathOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  allowSelfIntersection?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  finishOn?: string | null;
  [key: string]: unknown;
}

/**
 * Draw Polygon interface
 */
export interface IDrawPolygon {
  options: PolygonDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  _enabled: boolean;
  toolbarButtonName: string;
  _layerGroup: ExtendedFeatureGroup;
  _layer: ExtendedPolyline;
  _hintline: L.Polyline & { _pmTempLayer?: boolean };
  _hintMarker: ExtendedMarker;
  _markers: (L.Marker & { _pmTempLayer?: boolean })[];
  _otherSnapLayers: L.Layer[];
  _doesSelfIntersect: boolean;
  _tempSnapLayerIndex?: number;

  enable(options?: Partial<PolygonDrawOptions>): void;
  _createMarker(latlng: L.LatLng): L.Marker;
  _setTooltipText(): void;
  _finishShape(): void;

  // From parent class / mixins
  _setPane(
    layer: L.Layer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ): void;
  _fireCreate(layer: L.Layer): void;
  _handleSelfIntersection(addVertex: boolean, latlng?: L.LatLng): void;
  _cleanupSnapping(): void;
  _finishLayer(layer: L.Layer): void;
  _isFirstLayer(): boolean;
  disable(): void;
  enable(): void;
}
import Draw from './L.PM.Draw';
import { getTranslation } from '../helpers';

Draw.Polygon = Draw.Line.extend<IDrawPolygon, [L.Map]>({
  initialize(this: IDrawPolygon, map: L.Map) {
    this._map = map as typeof this._map;
    this._shape = 'Polygon';
    this.toolbarButtonName = 'drawPolygon';
  },
  enable(this: IDrawPolygon, options?: Partial<PolygonDrawOptions>) {
    L.PM.Draw.Line.prototype.enable.call(this, options);
    // Overwrite the shape "Line" of this._layer
    this._layer.pm._shape = 'Polygon';
  },
  _createMarker(this: IDrawPolygon, latlng: L.LatLng) {
    // create the new marker
    const marker = new L.Marker(latlng, {
      draggable: false,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    this._setPane(marker, 'vertexPane');

    // mark this marker as temporary
    marker._pmTempLayer = true;

    // add it to the map
    this._layerGroup.addLayer(marker);
    this._markers.push(marker);

    // if the first marker gets clicked again, finish this shape
    if ((this._layer.getLatLngs() as L.LatLng[]).flat().length === 1) {
      marker.on('click', this._finishShape, this);

      // add the first vertex to "other snapping layers" so the polygon is easier to finish
      this._tempSnapLayerIndex = this._otherSnapLayers.push(marker) - 1;

      if (this.options.snappable) {
        this._cleanupSnapping();
      }
    } else {
      // add a click event w/ no handler to the marker
      // event won't bubble so prevents creation of identical markers in same polygon
      // fixes issue where double click during poly creation when allowSelfIntersection: false caused it to break
      marker.on('click', () => 1);
    }

    return marker;
  },
  _setTooltipText(this: IDrawPolygon) {
    const { length } = (this._layer.getLatLngs() as L.LatLng[]).flat();
    let text = '';

    // handle tooltip text
    if (length <= 2) {
      text = getTranslation('tooltips.continueLine');
    } else {
      text = getTranslation('tooltips.finishPoly');
    }
    this._hintMarker.setTooltipContent(text);
  },
  _finishShape(this: IDrawPolygon) {
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

    const polygonLayer = L.polygon(coords, this.options.pathOptions);
    this._setPane(polygonLayer, 'layerPane');
    this._finishLayer(polygonLayer);
    polygonLayer.addTo(this._map.pm._getContainingLayer());

    // fire the pm:create event and pass shape and layer
    this._fireCreate(polygonLayer);

    // clean up snapping states
    this._cleanupSnapping();

    // remove the first vertex from "other snapping layers"
    this._otherSnapLayers.splice(this._tempSnapLayerIndex!, 1);
    delete this._tempSnapLayerIndex;

    const hintMarkerLatLng = this._hintMarker.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      this._hintMarker.setLatLng(hintMarkerLatLng);
    }
  },
});
