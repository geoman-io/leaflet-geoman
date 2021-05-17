import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';
import RotateMixin from "../Mixins/Rotating";
import EventMixin from "../Mixins/Events";

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin, RotateMixin, EventMixin],
  options: {
    snappable: true, //TODO: next major Release, rename it to allowSnapping
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    preventMarkerRemoval: false,
    removeLayerBelowMinVertexCount: true,
    limitMarkersToCount: -1,
    hideMiddleMarkers: false,
    snapSegment: true,
    syncLayersOnDrag: false,
    draggable: true,  //TODO: next major Release, rename it to allowDragging
    allowEditing: true, // disable all interactions on a layer which are activated with `enable()`. For example a Circle can't be dragged in Edit-Mode
    allowRemoval: true,
    allowCutting: true,
    allowRotation: true,
  },
  setOptions(options) {
    L.Util.setOptions(this, options);
  },
  getOptions() {
    return this.options;
  },
  applyOptions() { },
  isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  },
  getShape(){
    return this._shape;
  },
  _setPane(layer,type){
    if(type === "layerPane"){
      layer.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.layerPane || 'overlayPane';
    }else if(type === "vertexPane"){
      layer.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.vertexPane || 'markerPane';
    }else if(type === "markerPane"){
      layer.options.pane = this._map.pm.globalOptions.panes && this._map.pm.globalOptions.panes.markerPane || 'markerPane';
    }
  },
  remove(){
    const map = this._map || this._layer._map;
    map.pm.removeLayer({target: this._layer});
  }
});

export default Edit;
