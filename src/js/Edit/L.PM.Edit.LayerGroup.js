// LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Poly
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class
L.PM.Edit.LayerGroup = L.Class.extend({
    initialize(layerGroup) {
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        // filter out layers that don't have leaflet.pm (like markers and stuff)
        this._layers = this._layers.filter(layer => !!layer.pm);

        const availableEvents = [
            'pm:edit',
            'pm:dragstart',
            'pm:drag',
            'pm:dragend',
            'pm:snap',
            'pm:unsnap',
            'pm:raiseMarkers',
            'pm:markerdragend',
            'pm:markerdragstart',
        ];

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
    _fireEvent(e) {
        this._layerGroup.fireEvent(e.type, e);
    },
    toggleEdit(options) {
        this._options = options;
        this._layers.forEach((layer) => {
            layer.pm.toggleEdit(options);
        });
    },
    enable(options) {
        this._options = options;
        this._layers.forEach((layer) => {
            layer.pm.enable(options);
        });
    },
    disable() {
        this._layers.forEach((layer) => {
            layer.pm.disable();
        });
    },
    enabled() {
        const enabled = this._layers.find(layer => layer.pm.enabled());
        return !!enabled;
    },
    dragging() {
        const dragging = this._layers.find(layer => layer.pm.dragging());
        return !!dragging;
    },
    getOptions() {
        return this._options;
    },
});
