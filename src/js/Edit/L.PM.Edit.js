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
    hideMiddleMarkers: false
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
  // check if the popup is open
  _isPopupOpen(){
    const layerpopup = this._layer.isPopupOpen();
    if(layerpopup){
      return true;
    }

    if(this._layerGroup && Object.keys(this._layerGroup).length > 0){
      for (const id in this._layerGroup){
        if(this._layerGroup[id].isPopupOpen()){
          return true;
        }
      }
    }

    return false;

  }
});

export default Edit;
