import lineIntersect from '@turf/line-intersect';
import Edit from './L.PM.Edit';

Edit.Polygon = Edit.Line.extend({
  _shape: 'Polygon',
  _checkMarkerAllowedToDrag(marker) {
    const { prevMarker, nextMarker } = this._getNeighborMarkers(marker);

    const prevLine = L.polyline([prevMarker.getLatLng(), marker.getLatLng()]);
    const nextLine = L.polyline([marker.getLatLng(), nextMarker.getLatLng()]);

    const prevLineIntersectionLen = lineIntersect(
      this._layer.toGeoJSON(15),
      prevLine.toGeoJSON(15)
    ).features.length;
    const nextLineIntersectionLen = lineIntersect(
      this._layer.toGeoJSON(15),
      nextLine.toGeoJSON(15)
    ).features.length;

    // <= 2 the start and end point of the line always intersecting because they have the same coords.
    if (prevLineIntersectionLen <= 2 && nextLineIntersectionLen <= 2) {
      return false;
    }
    return true;
  },
});
