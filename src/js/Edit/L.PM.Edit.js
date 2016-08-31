L.PM.Edit = L.Class.extend({
    includes: [DragMixin, OverlapMixin],
    removeLayer: function(layer) {
        layer.remove();
    }
});
