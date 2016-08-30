L.PM.Map = L.Class.extend({
    initialize(map) {
        this.map = map;
        this.Draw = new L.PM.Draw(this.map);
        this.Toolbar = new L.PM.Toolbar(this.map);
    },
    addControls: function() {
        this.Draw.addControls();
    },
    enableDraw: function(shape = 'Poly') {
        this.Draw.enable(shape);
    }
});
