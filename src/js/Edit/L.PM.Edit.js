import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin],
  options: {
    snappable: true,
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    preventMarkerRemoval: false,
    removeLayerBelowMinVertexCount: true,
    limitMarkersToCount: -1,
    hideMiddleMarkers: false,
    draggable: true,
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
