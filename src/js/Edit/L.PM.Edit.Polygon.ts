import lineIntersect from '@turf/line-intersect';
import Edit from './L.PM.Edit';
import EditLine from './L.PM.Edit.Line';

// Declare the global L
declare const L: typeof import('leaflet');

/**
 * Extended marker with middle marker references
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _icon?: HTMLElement;
  leftM?: ExtendedMarker;
  rightM?: ExtendedMarker;
  _middleMarkerPrev?: ExtendedMarker;
  _middleMarkerNext?: ExtendedMarker;
  _dragging?: boolean;
};

/**
 * Extended polyline layer with PM properties
 */
type ExtendedPolyline = L.Polyline & {
  _map: L.Map;
};

/**
 * Edit Polygon interface
 */
interface IEditPolygon {
  _shape: string;
  _layer: ExtendedPolyline;

  _checkMarkerAllowedToDrag(marker: ExtendedMarker): boolean;
  _getNeighborMarkers(marker: ExtendedMarker): {
    prevMarker: ExtendedMarker;
    nextMarker: ExtendedMarker;
  };
}

const EditPolygon = (
  EditLine as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'Polygon',
  _checkMarkerAllowedToDrag(this: IEditPolygon, marker: ExtendedMarker) {
    const { prevMarker, nextMarker } = this._getNeighborMarkers(marker);

    const prevLine = L.polyline([prevMarker.getLatLng(), marker.getLatLng()]);
    const nextLine = L.polyline([marker.getLatLng(), nextMarker.getLatLng()]);

    const prevLineIntersection = lineIntersect(
      this._layer.toGeoJSON(15),
      prevLine.toGeoJSON(15)
    );

    // Filter out intersections that are the markers themselves
    const prevLineIntersectionLen = prevLineIntersection.features.filter(
      (f) => {
        const coords = f.geometry.coordinates as [number, number];
        const latlng = L.latLng(coords[1], coords[0]);
        return (
          !latlng.equals(prevMarker.getLatLng()) &&
          !latlng.equals(marker.getLatLng())
        );
      }
    ).length;

    const nextLineIntersection = lineIntersect(
      this._layer.toGeoJSON(15),
      nextLine.toGeoJSON(15)
    );

    // Filter out intersections that are the markers themselves
    const nextLineIntersectionLen = nextLineIntersection.features.filter(
      (f) => {
        const coords = f.geometry.coordinates as [number, number];
        const latlng = L.latLng(coords[1], coords[0]);
        return (
          !latlng.equals(nextMarker.getLatLng()) &&
          !latlng.equals(marker.getLatLng())
        );
      }
    ).length;

    if (prevLineIntersectionLen < 1 && nextLineIntersectionLen < 1) {
      return false;
    }
    return true;
  },
});

// Assign to Edit class
(Edit as unknown as { Polygon: unknown }).Polygon = EditPolygon;

export default EditPolygon;
