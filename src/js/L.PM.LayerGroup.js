
L.PM.Edit.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {

        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        let availableEvents = ['pm:edit', 'pm:dragstart', 'pm:drag', 'pm:dragend'];

        this._layers.forEach((layer) => {

            // listen to the events of the layers in this group
            availableEvents.forEach((event) => {
                layer.on(event, this._fireEvent, this);
            });

            // add reference for the group to each layer inside said group
            layer.pm._layerGroup = this._layerGroup;
        });


        // if a new layer is added to the group, reinitialize
        // This only works for FeatureGroups, not LayerGroups
        // https://github.com/Leaflet/Leaflet/issues/4861
        this._layerGroup.on('layeradd', (e) => {

            this.initialize(layerGroup);

            // if editing was already enabled for this group, enable it again
            // so the new layers are enabled
            if(e.target.pm.enabled()) {
                this.enable(this.getOptions());
            }
        });
    },
    _fireEvent: function(e) {
        this._layerGroup.fireEvent(e.type, e);
    },
    toggleEdit: function(options) {
        this._options = options;
        this._layers.forEach(layer => {
            layer.pm.toggleEdit(options);
        });
    },
    enable: function(options) {
        this._options = options;
        this._layers.forEach(layer => {
            layer.pm.enable(options);
        });
    },
    disable: function() {
        this._layers.forEach(layer => {
            layer.pm.disable();
        });
    },
    enabled: function() {
        let enabled = this._layers.find((layer) => layer.pm.enabled());
        return !!enabled;
    },
    dragging: function() {
        let dragging = this._layers.find((layer) => layer.pm.dragging());
        return !!dragging;
    },
    getOptions: function() {
        return this._options;
    }
});
