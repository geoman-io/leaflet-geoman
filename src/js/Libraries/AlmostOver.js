L.Map.mergeOptions({
  // @option almostOver: Boolean = true
  // Set it to false to disable this plugin
  almostOver: true,
  // @option almostDistance: Number = 25
  // Tolerance in pixels
  almostDistance: 25, // pixels
  // @option almostSamplingPeriod: Number = 50
  // To reduce the 'mousemove' event frequency. In milliseconds
  almostSamplingPeriod: 50, // ms
  // @option almostOnMouseMove Boolean = true
  // Set it to false to disable track 'mousemove' events and improve performance
  // if AlmostOver is only need for 'click' events.
  almostOnMouseMove: true,
});

L.Handler.AlmostOver = L.Handler.extend({
  includes: L.Evented || L.Mixin.Events,

  initialize(map) {
    this._map = map;
    this._layers = [];
    this._previous = null;
    this._marker = null;
    this._buffer = 0;

    // Reduce 'mousemove' event frequency
    this.__mouseMoveSampling = (function () {
      let timer = new Date();
      return function (e) {
        const date = new Date();
        const filtered = date - timer < this._map.options.almostSamplingPeriod;
        if (filtered || this._layers.length === 0) {
          return; // Ignore movement
        }
        timer = date;
        this._map.fire('mousemovesample', { latlng: e.latlng });
      };
    })();
  },

  addHooks() {
    if (this._map.options.almostOnMouseMove) {
      this._map.on('mousemove', this.__mouseMoveSampling, this);
      this._map.on('mousemovesample', this._onMouseMove, this);
    }
    this._map.on('click dblclick', this._onMouseClick, this);

    function computeBuffer() {
      this._buffer =
        this._map.layerPointToLatLng([0, 0]).lat -
        this._map.layerPointToLatLng([
          this._map.options.almostDistance,
          this._map.options.almostDistance,
        ]).lat;
    }
    this._map.on('viewreset zoomend', computeBuffer, this);
    this._map.whenReady(computeBuffer, this);
  },

  removeHooks() {
    this._map.off('mousemovesample');
    this._map.off('mousemove', this.__mouseMoveSampling, this);
    this._map.off('click dblclick', this._onMouseClick, this);
  },

  addLayer(layer) {
    if (typeof layer.eachLayer === 'function') {
      layer.eachLayer(function (l) {
        this.addLayer(l);
      }, this);
    } else {
      if (typeof this.indexLayer === 'function') {
        this.indexLayer(layer);
      }
      this._layers.push(layer);
    }
  },

  removeLayer(layer) {
    if (typeof layer.eachLayer === 'function') {
      layer.eachLayer(function (l) {
        this.removeLayer(l);
      }, this);
    } else {
      if (typeof this.unindexLayer === 'function') {
        this.unindexLayer(layer);
      }
      const index = this._layers.indexOf(layer);
      if (index >= 0) {
        this._layers.splice(index, 1);
      }
    }
    this._previous = null;
  },

  getClosest(latlng) {
    const snapfunc = L.GeometryUtil.closestLayerSnap;
    const distance = this._map.options.almostDistance;

    let snaplist = [];
    if (typeof this.searchBuffer === 'function') {
      snaplist = this.searchBuffer(latlng, this._buffer);
    } else {
      snaplist = this._layers;
    }
    return snapfunc(this._map, snaplist, latlng, distance, false);
  },

  _onMouseMove(e) {
    const closest = this.getClosest(e.latlng);
    if (closest) {
      if (!this._previous) {
        this._map.fire('almost:over', {
          layer: closest.layer,
          latlng: closest.latlng,
        });
      } else if (L.stamp(this._previous.layer) !== L.stamp(closest.layer)) {
        this._map.fire('almost:out', { layer: this._previous.layer });
        this._map.fire('almost:over', {
          layer: closest.layer,
          latlng: closest.latlng,
        });
      }

      this._map.fire('almost:move', {
        layer: closest.layer,
        latlng: closest.latlng,
      });
    } else if (this._previous) {
      this._map.fire('almost:out', { layer: this._previous.layer });
    }
    this._previous = closest;
  },

  _onMouseClick(e) {
    const closest = this.getClosest(e.latlng);
    if (closest) {
      this._map.fire(`almost:${e.type}`, {
        layer: closest.layer,
        latlng: closest.latlng,
      });
    }
  },
});

if (L.LayerIndexMixin !== undefined) {
  L.Handler.AlmostOver.include(L.LayerIndexMixin);
}

L.Map.addInitHook('addHandler', 'almostOver', L.Handler.AlmostOver);
