L.MarkerClusterGroup.include({
    originalInit: L.MarkerClusterGroup.prototype.initialize,
    initialize(options) {
        this.options.spiderLegPolylineOptions.pmIgnore = true;
        // this.options.polygonOptions.pmIgnore = true;
        // this.options.pmIgnore = true;

        L.setOptions(this, {
            bla: true,
        });
        this.originalInit(options);
    },
});
L.MarkerCluster.include({
    originalInit: L.MarkerCluster.prototype.initialize,
    initialize(...args) {
        this.options.pmIgnore = true;

        this.originalInit(...args);
    },
});
