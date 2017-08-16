import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Drag';

const Edit = L.Class.extend({
    includes: [DragMixin, SnapMixin],
    isPolygon() {
        return this._layer instanceof L.Polygon;
    },
});

export default Edit;
