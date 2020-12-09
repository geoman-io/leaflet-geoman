import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin],
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
});

export default Edit;
