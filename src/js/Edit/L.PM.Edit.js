import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin],
  options: {
    snappable: true, //TODO: should we create also an option allowSnapping
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    preventMarkerRemoval: false,
    removeLayerBelowMinVertexCount: true,
    limitMarkersToCount: -1,
    hideMiddleMarkers: false,
    draggable: true,
    allowEditing: true, //TODO: should it disable all interactions on a layer if `enable()` is called? For example a Circle can also be dragged -> But it is in Edit-Mode
    allowDragging: true, //Todo: same as draggable? -> Not direct but can confuse the user. Draggable are only options for Marker to make it draggable (Leaflet Core)
    allowRemoval: true, //TODO: or should we name it "allowDeleting"
    allowCutting: true,
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
