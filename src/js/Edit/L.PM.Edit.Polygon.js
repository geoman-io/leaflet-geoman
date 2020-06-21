import Edit from './L.PM.Edit';
import lineIntersect from "@turf/line-intersect";

Edit.Polygon = Edit.Line.extend({
  _shape : 'Polygon',
  _checkMarkerAllowedToDrag(marker){
        var {prevMarker,nextMarker } = this._getNeighborMarkers(marker);

        var prevLine = L.polyline([prevMarker.getLatLng(), marker.getLatLng()]);
        var nextLine = L.polyline([marker.getLatLng(), nextMarker.getLatLng()]);

        var prevLineIntersectionLen = lineIntersect(this._layer.toGeoJSON(15), prevLine.toGeoJSON(15)).features.length;
        var nextLineIntersectionLen = lineIntersect(this._layer.toGeoJSON(15), nextLine.toGeoJSON(15)).features.length;

        // <= 2 the start and end point of the line always intersecting because they have the same coords.
        if (prevLineIntersectionLen <= 2 && nextLineIntersectionLen <= 2) {
            return false;
        } else {
            return true;
        }
    },
});
