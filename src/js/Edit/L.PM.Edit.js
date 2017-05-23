import SnapMixin from '../Mixins/Snapping';
import DragMixin from '../Mixins/Drag';

const Edit = L.Class.extend({
    includes: [DragMixin, SnapMixin],
});

export default Edit;
