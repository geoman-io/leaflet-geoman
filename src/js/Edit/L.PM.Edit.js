import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Drag';

const Edit = L.Class.extend({
    includes: [DragMixin, SnapMixin],
    isPolygon() {
        // if it's a polygon, it means the coordinates array is multi dimensional
        return this._layer instanceof L.Polygon;
    },
});

export default Edit;
