import lineIntersect from "@turf/line-intersect";
import Edit from './L.PM.Edit';
import Utils from "../L.PM.Utils";

Edit.Polygon = Edit.Line.extend({
    _shape: 'Polygon',
    _checkMarkerAllowedToDrag(marker) {
        const { prevMarker, nextMarker } = this._getNeighborMarkers(marker);

        const prevLine = L.polyline([prevMarker.getLatLng(), marker.getLatLng()]);
        const nextLine = L.polyline([marker.getLatLng(), nextMarker.getLatLng()]);

        const prevLineIntersectionLen = lineIntersect(this._layer.toGeoJSON(15), prevLine.toGeoJSON(15)).features.length;
        const nextLineIntersectionLen = lineIntersect(this._layer.toGeoJSON(15), nextLine.toGeoJSON(15)).features.length;

        // <= 2 the start and end point of the line always intersecting because they have the same coords.
        if (prevLineIntersectionLen <= 2 && nextLineIntersectionLen <= 2) {
            return false;
        }
        return true;

    },
    _calculateFigureParams() {
      this._recalculatePerimeter();
      this.area = Utils.calculatePolygonArea(this._layer.getLatLngs());
    },
    _recalculatePerimeter() {
      this._perimeter = 0;
      this._layer.getLatLngs()[0].forEach((value, index, array) => {
        if (index !== array.length - 1)
          this._perimeter += value.distanceTo(array[index + 1]);
        else
          this._perimeter += value.distanceTo(array[0]); // edge between first and last vertices
      });
   },
   _getConnectedNeighborMarkers(marker) {
     const result = [];
     const { prevMarker, nextMarker } = this._getNeighborMarkers(marker);
     // in case of polygon all neighbor vertices are connected so add both
     result.push(nextMarker);
     result.push(prevMarker)
     return result;
   },
});
