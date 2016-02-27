L.PM.Draw = L.Class.extend({

    initialize: function(map) {

        var self = this;

        this._map = map;

        this.shapes = ['Poly'];

        for(var i=0; i<this.shapes.length; i++) {

            var shape = self.shapes[i];
            self[shape] = new L.PM.Draw[shape](self._map);

        }

    },
    enableDraw: function(shape) {

        this[shape].enable();

    },
    disableDraw: function(shape) {

        this[shape].disable();

    },
    addControls: function() {

        var self = this;

        for(var i=0; i<this.shapes.length; i++) {

            var shape = self.shapes[i];
            self[shape].addButton();

        }

    }
});
