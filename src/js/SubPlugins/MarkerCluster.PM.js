L.MarkerClusterGroup.include({
    originalInit: L.MarkerClusterGroup.prototype.initialize,
    initialize(options) {
        this.options.spiderLegPolylineOptions.pmIgnore = true;
        this.options.polygonOptions.pmIgnore = true;

        this.originalInit(options);
    },

    _originalAddLayer: L.MarkerClusterGroup.prototype.addLayer,
    addLayer(layer) {
        this._originalAddLayer(layer);

        return this.fire('layeradd', { layer });
    },
});
L.MarkerCluster.include({
    originalInit: L.MarkerCluster.prototype.initialize,
    initialize(...args) {
        this.options.pmIgnore = true;

        this.originalInit(...args);
    },
});
