
L.PM.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {
        var self = this;
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].on('edit', function() {
                self._layerGroup.fireEvent('edit');
            });
        }
    },
    toggleEdit: function() {

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.toggleEdit();
        }
    },
    enable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.enable();
        }
    },
    disable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.disable();
        }
    },
    enabled: function() {

        var enabled = false;

        for(var i=0; i<this._layers.length; i++) {
            enabled = this._layers[i].pm.enabled();
            if(enabled) {
                break;
            }
        }

        return enabled;
    }
});
