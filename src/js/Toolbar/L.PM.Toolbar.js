L.PM.Toolbar = L.Class.extend({
    initialize(map) {
        this.map = map;
    },
    addButton: function(btn) {
        return new L.Control.PMButton(btn).addTo(this.map);
    }
});
