L.MarkerClusterGroup.include({
    originalInit: L.MarkerClusterGroup.prototype.initialize,
    initialize(options) {
        // ignore spiderlegs
        this.options.spiderLegPolylineOptions.pmIgnore = true;

        // ignore this, not sure what it is though 🤔
        this.options.polygonOptions.pmIgnore = true;

        this.originalInit(options);
    },

    // Fire regular layeradd event when adding a layer via markercluster
    _originalAddLayer: L.MarkerClusterGroup.prototype.addLayer,
    addLayer(layer) {
        this._originalAddLayer(layer);

        return this.fire('layeradd', { layer });
    },
});

// // add pmIgnore to the cluster marker
L.MarkerCluster.include({
    originalInit: L.MarkerCluster.prototype.initialize,
    initialize(...args) {
        this.options.pmIgnore = true;

        this.originalInit(...args);
    },
});
