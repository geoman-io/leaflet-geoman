
L.PM.Edit.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {
        var self = this;
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        // listen to the edit event of the layers in this group
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].on('pm:edit', this._fireEdit, this);
        }

        // if a new layer is added to the group, reinitialize
        this._layerGroup.on('layeradd', function(e) {
            self.initialize(layerGroup);

            // if editing was already enabled for this group, enable it again
            // so the new layers are enabled
            if(e.target.pm.enabled()) {
                self.enable();
            }
        });
    },
    _fireEdit: function() {
        this._layerGroup.fireEvent('pm:edit');
    },
    toggleEdit: function(options) {

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.toggleEdit(options);
        }
    },
    enable: function(options) {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.enable(options);
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
