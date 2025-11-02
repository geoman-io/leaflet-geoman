import { LayerGroup, Util } from 'leaflet';
import Geoman from '../../Geoman';
import Utils from '../../GeomanUtils';

const GlobalDragMode = {
  _globalDragModeEnabled: false,
  enableGlobalDragMode() {
    const layers = Utils.findLayers(this._map);

    this._globalDragModeEnabled = true;
    this._addedLayersDrag = {};

    layers.forEach((layer) => {
      if (this._isRelevantForDrag(layer)) {
        layer.geoman.enableLayerDrag();
      }
    });

    if (!this.throttledReInitDrag) {
      this.throttledReInitDrag = Util.throttle(
        this._reinitGlobalDragMode,
        100,
        this
      );
    }

    // add map handler
    this._map.on('layeradd', this._layerAddedDrag, this);
    this._map.on('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(true);
  },
  disableGlobalDragMode() {
    const layers = Utils.findLayers(this._map);

    this._globalDragModeEnabled = false;

    layers.forEach((layer) => {
      layer.geoman.disableLayerDrag();
    });

    // remove map handler
    this._map.off('layeradd', this._layerAddedDrag, this);
    this._map.off('layeradd', this.throttledReInitDrag, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled());

    this._fireGlobalDragModeToggled(false);
  },
  globalDragModeEnabled() {
    return !!this._globalDragModeEnabled;
  },
  toggleGlobalDragMode() {
    if (this.globalDragModeEnabled()) {
      this.disableGlobalDragMode();
    } else {
      this.enableGlobalDragMode();
    }
  },
  _reinitGlobalDragMode() {
    const layers = this._addedLayersDrag;
    this._addedLayersDrag = {};
    if (this.globalDragModeEnabled()) {
      for (const id in layers) {
        const layer = layers[id];

        if (this._isRelevantForDrag(layer)) {
          layer.geoman.enableLayerDrag();
        }
      }
    }
  },
  _layerAddedDrag({ layer }) {
    this._addedLayersDrag[Util.stamp(layer)] = layer;
  },
  _isRelevantForDrag(layer) {
    return (
      layer.geoman &&
      !(layer instanceof LayerGroup) &&
      ((!Geoman.optIn && !layer.options.geomanIgnore) || // if optIn is not set / true and geomanIgnore is not set / true (default)
        (Geoman.optIn && layer.options.geomanIgnore === false)) && // if optIn is true and geomanIgnore is false
      !layer._geomanTempLayer &&
      layer.geoman.options.allowDragging
    );
  },
};

export default GlobalDragMode;
