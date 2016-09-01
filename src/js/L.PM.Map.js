L.PM.Map = L.Class.extend({
    initialize(map) {
        this.map = map;
        this.Draw = new L.PM.Draw(map);
        this.Toolbar = new L.PM.Toolbar(map);
    },
    addControls: function(options) {
        this.Toolbar.addControls(options);
    },
    enableDraw: function(shape = 'Poly') {
        this.Draw.enable(shape);
    },
    disableDraw: function(shape = 'Poly') {
        this.Draw.disable(shape);
    },
    removeLayer: function(e) {
        e.target.remove();
    },
    toggleRemoval: function(enabled) {
        if(enabled) {
            this.map.eachLayer((layer) => {
                layer.on('click', this.removeLayer);
            });
        } else {
            this.map.eachLayer((layer) => {
                layer.off('click', this.removeLayer);
            });
        }



    },
});
