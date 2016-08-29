L.PM.Draw = L.Class.extend({

    initialize: function(map) {

        // save the map
        this._map = map;

        // define all possible shapes that can be drawn
        this.shapes = ['Poly'];

        // initiate drawing class for our shapes
        this.shapes.forEach((shape) => {
            this[shape] = new L.PM.Draw[shape](this._map);
        });

    },
    getShapes: function() {
        // if somebody wants to know what shapes are available
        return this.shapes;
    },
    enableDraw: function(shape) {

        if(!shape) {
            throw 'Error: Please pass a shape as a parameter. Possible shapes are: ' + this.getShapes().join(',');
        }

        // disable drawing for all shapes
        this.disableDraw();

        // enable draw for a shape
        this[shape].enable();

    },
    disableDraw: function() {

        // there can only be one drawing mode active at a time on a map
        // so it doesn't matter which one should be disabled.
        // just disable all of them
        this.shapes.forEach((shape) => {
            this[shape].disable();
        });

    },
    addControls: function() {
        // add control buttons for our shapes
        this.shapes.forEach((shape) => {
            this[shape].addButton();
        });
    }
});
