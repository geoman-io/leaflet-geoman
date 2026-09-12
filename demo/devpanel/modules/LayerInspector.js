class LayerInspector {
  constructor() {
    this.name = "layers";
    this.title = "Layer Inspector";
    this._highlightedLayer = null;
    this._originalStyle = null;
  }
  init(map, container, panel) {
    this.map = map;
    this.container = container;
    this.panel = panel;
    this._render();
    this._bindMapEvents();
  }
  _render() {
    const layers = this._getLayers();
    this.container.innerHTML = `
      <div class="devpanel-section">
        <div class="devpanel-btn-group">
          <button class="devpanel-btn secondary" data-action="refresh">
            Refresh
          </button>
          <button class="devpanel-btn secondary" data-action="enable-all-edit">
            Edit All
          </button>
          <button class="devpanel-btn secondary" data-action="disable-all-edit">
            Disable Edit
          </button>
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">
          Geoman Layers
          <span class="devpanel-counter" id="layer-count">${layers.length}</span>
        </div>
        <div class="devpanel-layer-list" id="layer-list">
          ${this._renderLayers(layers)}
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-section-title" data-collapse="layer-details">
          <span class="devpanel-section-icon">\u25BC</span>
          Layer Details
        </div>
        <div id="layer-details-content">
          <div class="devpanel-empty" id="layer-details">
            Click a layer to view details
          </div>
        </div>
      </div>
    `;
    this._bindEvents();
  }
  _getLayers() {
    return this.map.pm.getGeomanDrawLayers();
  }
  _renderLayers(layers) {
    if (layers.length === 0) {
      return '<div class="devpanel-empty">No Geoman layers on map</div>';
    }
    return layers.map((layer, index) => {
      const shape = this._getLayerShape(layer);
      const isEditing = layer.pm && layer.pm.enabled();
      const vertexCount = this._getVertexCount(layer);
      return `
          <div class="devpanel-layer-item" data-layer-index="${index}">
            <div class="devpanel-layer-info">
              <div class="devpanel-layer-type">${shape}</div>
              <div class="devpanel-layer-meta">
                ${vertexCount !== null ? `${vertexCount} vertices` : ""}
                ${isEditing ? '<span class="devpanel-badge active">editing</span>' : ""}
              </div>
            </div>
            <div class="devpanel-layer-actions">
              <button class="devpanel-btn secondary" data-layer-action="highlight" data-layer-index="${index}" title="Highlight on map">
                \u{1F441}
              </button>
              <button class="devpanel-btn ${isEditing ? "active" : "secondary"}" data-layer-action="toggle-edit" data-layer-index="${index}" title="Toggle edit mode">
                \u270F
              </button>
              <button class="devpanel-btn danger" data-layer-action="remove" data-layer-index="${index}" title="Remove layer">
                \u2715
              </button>
            </div>
          </div>
        `;
    }).join("");
  }
  _getLayerShape(layer) {
    if (layer.pm && layer.pm.getShape) {
      return layer.pm.getShape();
    }
    if (layer instanceof L.Marker) return "Marker";
    if (layer instanceof L.CircleMarker) return "CircleMarker";
    if (layer instanceof L.Circle) return "Circle";
    if (layer instanceof L.Rectangle) return "Rectangle";
    if (layer instanceof L.Polygon) return "Polygon";
    if (layer instanceof L.Polyline) return "Line";
    return "Layer";
  }
  _getVertexCount(layer) {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      return null;
    }
    if (layer.getLatLngs) {
      const latlngs = layer.getLatLngs();
      return this._countVertices(latlngs);
    }
    return null;
  }
  _countVertices(latlngs) {
    if (!latlngs) return 0;
    if (Array.isArray(latlngs)) {
      if (latlngs.length > 0 && latlngs[0].lat !== void 0) {
        return latlngs.length;
      }
      let count = 0;
      latlngs.forEach((item) => {
        count += this._countVertices(item);
      });
      return count;
    }
    return 0;
  }
  _bindEvents() {
    this.container.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this._handleAction(action);
      });
    });
    this.container.querySelectorAll(".devpanel-layer-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target.closest("[data-layer-action]")) return;
        const index = parseInt(item.dataset.layerIndex, 10);
        this._showLayerDetails(index);
      });
    });
    this.container.querySelectorAll("[data-layer-action]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const action = e.currentTarget.dataset.layerAction;
        const index = parseInt(
          e.currentTarget.dataset.layerIndex,
          10
        );
        this._handleLayerAction(action, index);
      });
    });
    this.container.querySelectorAll("[data-collapse]").forEach((title) => {
      title.addEventListener("click", (e) => {
        const targetId = e.currentTarget.dataset.collapse;
        const content = this.container.querySelector(
          `#${targetId}-content`
        );
        const icon = e.currentTarget.querySelector(".devpanel-section-icon");
        if (content) {
          const isHidden = content.style.display === "none";
          content.style.display = isHidden ? "block" : "none";
          icon.textContent = isHidden ? "\u25BC" : "\u25B6";
        }
      });
    });
  }
  _handleAction(action) {
    const layers = this._getLayers();
    switch (action) {
      case "refresh":
        this._render();
        this._showToast("Layer list refreshed");
        break;
      case "enable-all-edit":
        layers.forEach((layer) => {
          if (layer.pm && !layer.pm.enabled()) {
            layer.pm.enable();
          }
        });
        this._render();
        this._showToast(`Enabled editing on ${layers.length} layers`);
        break;
      case "disable-all-edit":
        layers.forEach((layer) => {
          if (layer.pm && layer.pm.enabled()) {
            layer.pm.disable();
          }
        });
        this._render();
        this._showToast("Disabled editing on all layers");
        break;
    }
  }
  _handleLayerAction(action, index) {
    const layers = this._getLayers();
    const layer = layers[index];
    if (!layer) {
      this._showToast("Layer not found", "error");
      return;
    }
    switch (action) {
      case "highlight":
        this._highlightLayer(layer);
        break;
      case "toggle-edit":
        if (layer.pm) {
          if (layer.pm.enabled()) {
            layer.pm.disable();
          } else {
            layer.pm.enable();
          }
          this._render();
        }
        break;
      case "remove":
        this.map.removeLayer(layer);
        this._render();
        this._showToast("Layer removed");
        break;
    }
  }
  _highlightLayer(layer) {
    this._removeHighlight();
    this._highlightedLayer = layer;
    if (layer.setStyle) {
      this._originalStyle = {
        weight: layer.options.weight,
        color: layer.options.color,
        fillColor: layer.options.fillColor,
        fillOpacity: layer.options.fillOpacity
      };
      layer.setStyle({
        weight: 4,
        color: "#ff6600",
        fillColor: "#ff6600",
        fillOpacity: 0.3
      });
    }
    if (layer.getBounds) {
      this.map.fitBounds(layer.getBounds(), { padding: [50, 50] });
    } else if (layer.getLatLng) {
      this.map.setView(layer.getLatLng(), this.map.getZoom());
    }
    setTimeout(() => {
      this._removeHighlight();
    }, 2e3);
  }
  _removeHighlight() {
    if (this._highlightedLayer && this._originalStyle) {
      if (this._highlightedLayer.setStyle) {
        this._highlightedLayer.setStyle(this._originalStyle);
      }
    }
    this._highlightedLayer = null;
    this._originalStyle = null;
  }
  _showLayerDetails(index) {
    const layers = this._getLayers();
    const layer = layers[index];
    if (!layer) {
      return;
    }
    const detailsEl = this.container.querySelector("#layer-details");
    if (!detailsEl) return;
    const shape = this._getLayerShape(layer);
    const vertexCount = this._getVertexCount(layer);
    const isEditing = layer.pm && layer.pm.enabled();
    const hasSelfIntersection = layer.pm && layer.pm.hasSelfIntersection ? layer.pm.hasSelfIntersection() : null;
    let optionsHtml = "";
    if (layer.pm && layer.pm.options) {
      const pmOptions = layer.pm.options;
      optionsHtml = `
        <div class="devpanel-field">
          <div class="devpanel-label">PM Options</div>
          <div class="devpanel-json" style="max-height: 100px;">
            ${JSON.stringify(pmOptions, null, 2)}
          </div>
        </div>
      `;
    }
    let geometryHtml = "";
    if (layer.toGeoJSON) {
      try {
        const geojson = layer.toGeoJSON();
        geometryHtml = `
          <div class="devpanel-field">
            <div class="devpanel-label">GeoJSON</div>
            <div class="devpanel-json" style="max-height: 150px;">
              ${JSON.stringify(geojson, null, 2)}
            </div>
          </div>
        `;
      } catch (e) {
      }
    }
    detailsEl.innerHTML = `
      <div class="devpanel-options-table">
        <table>
          <tr>
            <td>Shape</td>
            <td><span class="devpanel-badge active">${shape}</span></td>
          </tr>
          ${vertexCount !== null ? `<tr><td>Vertices</td><td>${vertexCount}</td></tr>` : ""}
          <tr>
            <td>Edit Mode</td>
            <td><span class="devpanel-badge ${isEditing ? "active" : "inactive"}">${isEditing ? "enabled" : "disabled"}</span></td>
          </tr>
          ${hasSelfIntersection !== null ? `
            <tr>
              <td>Self-Intersection</td>
              <td><span class="devpanel-badge ${hasSelfIntersection ? "error" : "active"}">${hasSelfIntersection ? "yes" : "no"}</span></td>
            </tr>
          ` : ""}
        </table>
      </div>
      ${optionsHtml}
      ${geometryHtml}
    `;
    this.container.querySelectorAll(".devpanel-layer-item").forEach((item, i) => {
      item.classList.toggle("highlighted", i === index);
    });
    this._highlightLayer(layer);
  }
  _bindMapEvents() {
    let updateTimeout = null;
    const debouncedUpdate = () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(() => {
        this._updateLayerList();
      }, 100);
    };
    this.map.on("pm:create", debouncedUpdate);
    this.map.on("pm:remove", debouncedUpdate);
    this.map.on("layeradd", debouncedUpdate);
    this.map.on("layerremove", debouncedUpdate);
  }
  _updateLayerList() {
    const layers = this._getLayers();
    const countEl = this.container.querySelector("#layer-count");
    if (countEl) {
      countEl.textContent = String(layers.length);
    }
    const listEl = this.container.querySelector("#layer-list");
    if (listEl) {
      listEl.innerHTML = this._renderLayers(layers);
      listEl.querySelectorAll(".devpanel-layer-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          if (e.target.closest("[data-layer-action]")) return;
          const index = parseInt(item.dataset.layerIndex, 10);
          this._showLayerDetails(index);
        });
      });
      listEl.querySelectorAll("[data-layer-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = e.currentTarget.dataset.layerAction;
          const index = parseInt(
            e.currentTarget.dataset.layerIndex,
            10
          );
          this._handleLayerAction(action, index);
        });
      });
    }
  }
  _showToast(message, type = "info") {
    const toast = document.createElement("div");
    toast.className = `devpanel-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2e3);
  }
  destroy() {
    this._removeHighlight();
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = LayerInspector;
} else {
  window.LayerInspector = LayerInspector;
}
//# sourceMappingURL=LayerInspector.js.map
