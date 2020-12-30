import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';
import RevertMixin from "../Mixins/Reverting";

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin, RevertMixin],
  options: {
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    draggable: true,
    limitMarkersToCount: -1,
    preventMarkerRemoval: false,
    hideMiddleMarkers: false,
    removeLayerBelowMinVertexCount: true
  },
  setOptions(options) {
    L.Util.setOptions(this, options);
  },
  applyOptions() { },
  isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  },
  getShape(){
    return this._shape;
  },
  setMap(map){
    this._map = map || this._layer._map;
  },
  removeLayer(){
    this._layer.removeFrom(this._map.pm._getContainingLayer());
  },
  addLayer(){
    this._layer.addTo(this._map.pm._getContainingLayer());
  }
});

export default Edit;
