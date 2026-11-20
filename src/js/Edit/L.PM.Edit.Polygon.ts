import * as L from 'leaflet';
import { PM } from '../PM';
/**
 * Extended marker with middle marker references
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  leftM?: ExtendedMarker;
  rightM?: ExtendedMarker;
  _middleMarkerPrev?: ExtendedMarker;
  _middleMarkerNext?: ExtendedMarker;
  _dragging?: boolean;
};

import lineIntersect from '@turf/line-intersect';
import Edit from './L.PM.Edit';
import EditLine from './L.PM.Edit.Line';
import { defineOptions } from '../helpers/classes';

class EditPolygon extends EditLine {
  _checkMarkerAllowedToDrag(marker: ExtendedMarker) {
    const { prevMarker, nextMarker } = this._getNeighborMarkers(marker);

    const prevLine = new L.Polyline([
      prevMarker.getLatLng(),
      marker.getLatLng(),
    ]);
    const nextLine = new L.Polyline([
      marker.getLatLng(),
      nextMarker.getLatLng(),
    ]);

    const prevLineIntersection = lineIntersect(
      this._layer.toGeoJSON(15),
      prevLine.toGeoJSON(15)
    );

    // Filter out intersections that are the markers themselves
    const prevLineIntersectionLen = prevLineIntersection.features.filter(
      (f) => {
        const coords = f.geometry.coordinates;
        const latlng = new L.LatLng(coords[1], coords[0]);
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
        const coords = f.geometry.coordinates;
        const latlng = new L.LatLng(coords[1], coords[0]);
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
  }
}

defineOptions(EditPolygon, {});
EditPolygon.prototype._shape = 'Polygon';
Edit.Polygon = EditPolygon;

export { EditPolygon };
export default EditPolygon;
