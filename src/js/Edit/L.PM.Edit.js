import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Dragging';
import RotateMixin from '../Mixins/Rotating';
import EventMixin from '../Mixins/Events';

const Edit = L.Class.extend({
  includes: [DragMixin, SnapMixin, RotateMixin, EventMixin],
  options: {
    snappable: true, // TODO: next major Release, rename it to allowSnapping
    snapDistance: 20,
    allowSelfIntersection: true,
    allowSelfIntersectionEdit: false,
    preventMarkerRemoval: false,
    removeLayerBelowMinVertexCount: true,
    limitMarkersToCount: -1,
    hideMiddleMarkers: false,
    snapSegment: true,
    syncLayersOnDrag: false,
    draggable: true, // TODO: next major Release, rename it to allowDragging
    allowEditing: true, // disable all interactions on a layer which are activated with `enable()`. For example a Circle can't be dragged in Edit-Mode
    allowRemoval: true,
    allowCutting: true,
    allowRotation: true,
    addVertexOn: 'click',
    removeVertexOn: 'contextmenu',
    removeVertexValidation: undefined,
    addVertexValidation: undefined,
    moveVertexValidation: undefined,
    resizeableCircleMarker: false,
    resizableCircle: true,
  },
  setOptions(options) {
    L.Util.setOptions(this, options);
  },
  getOptions() {
    return this.options;
  },
  applyOptions() {},
  isPolygon() {
    // if it's a polygon, it means the coordinates array is multi dimensional
    return this._layer instanceof L.Polygon;
  },
  getShape() {
    return this._shape;
  },
  _setPane(layer, type) {
    if (type === 'layerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.layerPane) ||
        'overlayPane';
    } else if (type === 'vertexPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.vertexPane) ||
        'markerPane';
    } else if (type === 'markerPane') {
      layer.options.pane =
        (this._map.pm.globalOptions.panes &&
          this._map.pm.globalOptions.panes.markerPane) ||
        'markerPane';
    }
  },
  remove() {
    const map = this._map || this._layer._map;
    map.pm.removeLayer({ target: this._layer });
  },
  _vertexValidation(type, e) {
    const marker = e.target;
    const args = { layer: this._layer, marker, event: e };

    let validationFnc = '';
    if (type === 'move') {
      validationFnc = 'moveVertexValidation';
    } else if (type === 'add') {
      validationFnc = 'addVertexValidation';
    } else if (type === 'remove') {
      validationFnc = 'removeVertexValidation';
    }

    // if validation goes wrong, we return false
    if (
      this.options[validationFnc] &&
      typeof this.options[validationFnc] === 'function' &&
      !this.options[validationFnc](args)
    ) {
      if (type === 'move') {
        marker._cancelDragEventChain = marker.getLatLng();
      }
      return false;
    }

    marker._cancelDragEventChain = null;
    return true;
  },
  _vertexValidationDrag(marker) {
    // we reset the marker to the place before it was dragged. We need this, because we can't stop the drag process in a `dragstart` | `movestart` listener
    if (marker._cancelDragEventChain) {
      marker._latlng = marker._cancelDragEventChain;
      marker.update();
      return false;
    }
    return true;
  },
  _vertexValidationDragEnd(marker) {
    if (marker._cancelDragEventChain) {
      marker._cancelDragEventChain = null;
      return false;
    }
    return true;
  },
});

export default Edit;
