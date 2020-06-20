import union from "@turf/union";

const GlobalMergeMode = {
  disableGlobalMergeMode() {
    this._globalMergeMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.mergeLayer, this);
    });

    // merge map handler
    this.map.off('layeradd', this.throttledReInitMerge, this);

    this._firstUnionLayer = undefined;

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('mergeMode', this._globalMergeMode);

    this._fireMergeModeEvent(false);
  },
  enableGlobalMergeMode() {
    const isRelevant = layer =>
      layer.pm &&
      !(layer.pm.options && layer.pm.options.preventMarkerMerge) &&
      !(layer instanceof L.LayerGroup) &&
      !(layer instanceof L.Circle) &&
      !(layer instanceof L.CircleMarker);

    this._globalMergeMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (isRelevant(layer)) {
        layer.on('click', this.mergeLayer, this);
      }
    });

    if (!this.throttledReInitMerge) {
      this.throttledReInitMerge = L.Util.throttle(this.reinitGlobalMergeMode, 100, this)
    }

    // handle layers that are added while in merge  xmode
    this.map.on('layeradd', this.throttledReInitMerge, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('mergeMode', this._globalMergeMode);

    this._fireMergeModeEvent(true);
  },
  _fireMergeModeEvent(enabled) {
    this.map.fire('pm:globalmergemodetoggled', {
      enabled,
      map: this.map,
    });
  },
  toggleGlobalMergeMode() {
    // toggle global edit mode
    if (this.globalMergeEnabled()) {
      this.disableGlobalMergeMode();
    } else {
      this.enableGlobalMergeMode();
    }
  },
  globalMergeEnabled() {
    return !!this._globalMergeMode;
  },
  mergeLayer(e) {

    const currentLayer = e.target;
    // only merge layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged
    const mergeable =
      !currentLayer._pmTempLayer && (!currentLayer.pm || !currentLayer.pm.dragging());

    if (!mergeable)
      return;

    if (!this._firstUnionLayer) {
      this._firstUnionLayer = currentLayer;
      return;
    } else {
      var firstLayer = this._firstUnionLayer;
      var result = union(firstLayer.toGeoJSON(15), currentLayer.toGeoJSON(15));
      if (result.geometry.type == 'MultiPolygon')
        return; //input was non-contiguous
      var newLayer = L.geoJson(result)
        .addTo(this.map);

      this.map.fire('pm:merge', { firstLayer: firstLayer, secondLayer: currentLayer, resultingLayer: newLayer });

      firstLayer.remove();
      currentLayer.remove();
      this._firstUnionLayer = newLayer;
    }
  },
  reinitGlobalMergeMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily	
    const isRelevant = !!layer.pm && !layer._pmTempLayer;
    if (!isRelevant) {
      return;
    }

    // re-enable global Merge mode if it's enabled already
    if (this.globalMergeEnabled()) {
      this.disableGlobalMergeMode();
      this.enableGlobalMergeMode();
    }
  },
}

export default GlobalMergeMode