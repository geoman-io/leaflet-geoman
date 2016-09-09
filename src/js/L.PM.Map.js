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

        var layer = e.target;
        if(!layer._layers && !layer.pm.dragging()) {
            e.target.remove();
        }
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
    globalEditEnabled: function() {
        return this._globalEditMode;
    },
    toggleGlobalEditMode: function(options) {

        // find all layers that are or inherit from Polylines...
        let layers = [];
        this.map.eachLayer((layer) => {
            if(layer instanceof L.Polyline) {
                layers.push(layer);
            }
        });

        if(this.globalEditEnabled()) {
            // disable

            this._globalEditMode = false;

            layers.forEach(function(layer, index) {
                layer.pm.disable();
            });

        } else {
            // enable

            this._globalEditMode = true;

            layers.forEach(function(layer, index) {
                layer.pm.enable(options);
            });


        }

    },
});
