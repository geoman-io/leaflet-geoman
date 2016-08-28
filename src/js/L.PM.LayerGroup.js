
L.PM.Edit.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {
        var self = this;
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        for(var i=0; i<this._layers.length; i++) {
            // FIXME: listen and fire these events a little more... generically.
            // listen to the events of the layers in this group
            this._layers[i].on('pm:edit', this._fireEdit, this);
            this._layers[i].on('pm:dragstart', this._fireDragstart, this);
            this._layers[i].on('pm:drag', this._fireDrag, this);
            this._layers[i].on('pm:dragend', this._fireDragend, this);

            // add reference for the group to each layer inside said group
            this._layers[i].pm._layerGroup = this._layerGroup;
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
    _fireDragstart: function() {
        this._layerGroup.fireEvent('pm:dragstart');
    },
    _fireDrag: function() {
        this._layerGroup.fireEvent('pm:drag');
    },
    _fireDragend: function() {
        this._layerGroup.fireEvent('pm:dragend');
    },
    toggleEdit: function(options) {

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.toggleEdit(options);
        }
    },
    enable: function(options) {
        for(var i=0; i<this._layers.length; i++) {
            // enable edit for each layer of the group
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
