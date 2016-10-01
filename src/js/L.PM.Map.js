L.PM.Map = L.Class.extend({
    initialize(map) {
        this.map = map;
        this.Draw = new L.PM.Draw(map);
        this.Toolbar = new L.PM.Toolbar(map);
    },
    addControls(options) {
        this.Toolbar.addControls(options);
    },
    enableDraw(shape = 'Poly', options) {
        this.Draw.enable(shape, options);
    },
    disableDraw(shape = 'Poly') {
        this.Draw.disable(shape);
    },
    removeLayer(e) {
        const layer = e.target;
        if(!layer._layers && !layer.pm.dragging()) {
            e.target.remove();
        }
    },
    toggleRemoval(enabled) {
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
    globalEditEnabled() {
        return this._globalEditMode;
    },
    toggleGlobalEditMode(options) {
        // find all layers that are or inherit from Polylines...
        const layers = [];
        this.map.eachLayer((layer) => {
            if(layer instanceof L.Polyline) {
                layers.push(layer);
            }
        });

        if(this.globalEditEnabled()) {
            // disable

            this._globalEditMode = false;

            layers.forEach((layer) => {
                layer.pm.disable();
            });
        } else {
            // enable

            this._globalEditMode = true;

            layers.forEach((layer) => {
                layer.pm.enable(options);
            });
        }
    },
});
