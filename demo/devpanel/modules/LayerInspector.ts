/**
 * Layer Inspector Module for DevPanel
 *
 * Features:
 * - List all Geoman layers on map
 * - Click layer to highlight on map
 * - Show per-layer PM state (edit mode, drag, rotation, vertex count)
 * - Quick actions: enable edit, enable drag, remove
 */

class LayerInspector {
  declare map: L.Map;
  declare name: string;
  declare title: string;
  declare container: HTMLElement;
  declare panel: InstanceType<Window['DevPanel']>;
  declare _highlightedLayer: import('../../globals').InspectableLayer | null;
  declare _originalStyle: L.PathOptions | null;

  constructor() {
    this.name = 'layers';
    this.title = 'Layer Inspector';
    this._highlightedLayer = null;
    this._originalStyle = null;
  }

  init(
    map: L.Map,
    container: HTMLElement,
    panel: InstanceType<Window['DevPanel']>
  ) {
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
          <span class="devpanel-section-icon">▼</span>
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
    return this.map.pm.getGeomanDrawLayers() as import('../../globals').InspectableLayer[];
  }

  _renderLayers(layers: import('../../globals').InspectableLayer[]) {
    if (layers.length === 0) {
      return '<div class="devpanel-empty">No Geoman layers on map</div>';
    }

    return layers
      .map((layer, index) => {
        const shape = this._getLayerShape(layer);
        const isEditing = layer.pm && layer.pm.enabled();
        const vertexCount = this._getVertexCount(layer);

        return `
          <div class="devpanel-layer-item" data-layer-index="${index}">
            <div class="devpanel-layer-info">
              <div class="devpanel-layer-type">${shape}</div>
              <div class="devpanel-layer-meta">
                ${vertexCount !== null ? `${vertexCount} vertices` : ''}
                ${isEditing ? '<span class="devpanel-badge active">editing</span>' : ''}
              </div>
            </div>
            <div class="devpanel-layer-actions">
              <button class="devpanel-btn secondary" data-layer-action="highlight" data-layer-index="${index}" title="Highlight on map">
                👁
              </button>
              <button class="devpanel-btn ${isEditing ? 'active' : 'secondary'}" data-layer-action="toggle-edit" data-layer-index="${index}" title="Toggle edit mode">
                ✏
              </button>
              <button class="devpanel-btn danger" data-layer-action="remove" data-layer-index="${index}" title="Remove layer">
                ✕
              </button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  _getLayerShape(layer: import('../../globals').InspectableLayer) {
    if (layer.pm && layer.pm.getShape) {
      return layer.pm.getShape();
    }
    if (layer instanceof L.Marker) return 'Marker';
    if (layer instanceof L.CircleMarker) return 'CircleMarker';
    if (layer instanceof L.Circle) return 'Circle';
    if (layer instanceof L.Rectangle) return 'Rectangle';
    if (layer instanceof L.Polygon) return 'Polygon';
    if (layer instanceof L.Polyline) return 'Line';
    return 'Layer';
  }

  _getVertexCount(layer: import('../../globals').InspectableLayer) {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      return null;
    }

    if (layer.getLatLngs) {
      const latlngs = layer.getLatLngs();
      return this._countVertices(latlngs);
    }

    return null;
  }

  _countVertices(latlngs: unknown): number {
    if (!latlngs) return 0;

    if (Array.isArray(latlngs)) {
      if (latlngs.length > 0 && latlngs[0].lat !== undefined) {
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
    // Action buttons
    this.container
      .querySelectorAll<HTMLElement>('[data-action]')
      .forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const action = (e.currentTarget as HTMLElement).dataset.action!;
          this._handleAction(action);
        });
      });

    // Layer item clicks (for details)
    this.container
      .querySelectorAll<HTMLElement>('.devpanel-layer-item')
      .forEach((item) => {
        item.addEventListener('click', (e) => {
          // Don't trigger if clicking on action buttons
          if ((e.target as Element).closest('[data-layer-action]')) return;

          const index = parseInt(item.dataset.layerIndex!, 10);
          this._showLayerDetails(index);
        });
      });

    // Layer action buttons
    this.container
      .querySelectorAll<HTMLElement>('[data-layer-action]')
      .forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = (e.currentTarget as HTMLElement).dataset.layerAction!;
          const index = parseInt(
            (e.currentTarget as HTMLElement).dataset.layerIndex!,
            10
          );
          this._handleLayerAction(action, index);
        });
      });

    // Collapse handlers
    this.container
      .querySelectorAll<HTMLElement>('[data-collapse]')
      .forEach((title) => {
        title.addEventListener('click', (e) => {
          const targetId = (e.currentTarget as HTMLElement).dataset.collapse!;
          const content = this.container.querySelector<HTMLElement>(
            `#${targetId}-content`
          )!;
          const icon = (
            e.currentTarget as HTMLElement
          ).querySelector<HTMLElement>('.devpanel-section-icon')!;

          if (content) {
            const isHidden = content.style.display === 'none';
            content.style.display = isHidden ? 'block' : 'none';
            icon.textContent = isHidden ? '▼' : '▶';
          }
        });
      });
  }

  _handleAction(action: string | undefined) {
    const layers = this._getLayers();

    switch (action) {
      case 'refresh':
        this._render();
        this._showToast('Layer list refreshed');
        break;
      case 'enable-all-edit':
        layers.forEach((layer) => {
          if (layer.pm && !layer.pm.enabled()) {
            layer.pm.enable();
          }
        });
        this._render();
        this._showToast(`Enabled editing on ${layers.length} layers`);
        break;
      case 'disable-all-edit':
        layers.forEach((layer) => {
          if (layer.pm && layer.pm.enabled()) {
            layer.pm.disable();
          }
        });
        this._render();
        this._showToast('Disabled editing on all layers');
        break;
    }
  }

  _handleLayerAction(action: string | undefined, index: number) {
    const layers = this._getLayers();
    const layer = layers[index];

    if (!layer) {
      this._showToast('Layer not found', 'error');
      return;
    }

    switch (action) {
      case 'highlight':
        this._highlightLayer(layer);
        break;
      case 'toggle-edit':
        if (layer.pm) {
          if (layer.pm.enabled()) {
            layer.pm.disable();
          } else {
            layer.pm.enable();
          }
          this._render();
        }
        break;
      case 'remove':
        this.map.removeLayer(layer);
        this._render();
        this._showToast('Layer removed');
        break;
    }
  }

  _highlightLayer(layer: import('../../globals').InspectableLayer) {
    // Remove previous highlight
    this._removeHighlight();

    // Store reference and original style
    this._highlightedLayer = layer;

    if (layer.setStyle) {
      this._originalStyle = {
        weight: layer.options.weight,
        color: layer.options.color,
        fillColor: layer.options.fillColor,
        fillOpacity: layer.options.fillOpacity,
      };

      layer.setStyle({
        weight: 4,
        color: '#ff6600',
        fillColor: '#ff6600',
        fillOpacity: 0.3,
      });
    }

    // Fit map to layer bounds
    if (layer.getBounds) {
      this.map.fitBounds(layer.getBounds(), { padding: [50, 50] });
    } else if (layer.getLatLng) {
      this.map.setView(layer.getLatLng(), this.map.getZoom());
    }

    // Remove highlight after 2 seconds
    setTimeout(() => {
      this._removeHighlight();
    }, 2000);
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

  _showLayerDetails(index: number) {
    const layers = this._getLayers();
    const layer = layers[index];

    if (!layer) {
      return;
    }

    const detailsEl =
      this.container.querySelector<HTMLElement>('#layer-details')!;
    if (!detailsEl) return;

    const shape = this._getLayerShape(layer);
    const vertexCount = this._getVertexCount(layer);
    const isEditing = layer.pm && layer.pm.enabled();
    const hasSelfIntersection =
      layer.pm && layer.pm.hasSelfIntersection
        ? layer.pm.hasSelfIntersection()
        : null;

    let optionsHtml = '';
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

    let geometryHtml = '';
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
        // Ignore GeoJSON errors
      }
    }

    detailsEl.innerHTML = `
      <div class="devpanel-options-table">
        <table>
          <tr>
            <td>Shape</td>
            <td><span class="devpanel-badge active">${shape}</span></td>
          </tr>
          ${vertexCount !== null ? `<tr><td>Vertices</td><td>${vertexCount}</td></tr>` : ''}
          <tr>
            <td>Edit Mode</td>
            <td><span class="devpanel-badge ${isEditing ? 'active' : 'inactive'}">${isEditing ? 'enabled' : 'disabled'}</span></td>
          </tr>
          ${
            hasSelfIntersection !== null
              ? `
            <tr>
              <td>Self-Intersection</td>
              <td><span class="devpanel-badge ${hasSelfIntersection ? 'error' : 'active'}">${hasSelfIntersection ? 'yes' : 'no'}</span></td>
            </tr>
          `
              : ''
          }
        </table>
      </div>
      ${optionsHtml}
      ${geometryHtml}
    `;

    // Update highlighted state in list
    this.container
      .querySelectorAll<HTMLElement>('.devpanel-layer-item')
      .forEach((item, i) => {
        item.classList.toggle('highlighted', i === index);
      });

    // Highlight on map too
    this._highlightLayer(layer);
  }

  _bindMapEvents() {
    // Listen for layer changes - debounce to avoid excessive updates
    let updateTimeout: ReturnType<typeof setTimeout> | null = null;
    const debouncedUpdate = () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      updateTimeout = setTimeout(() => {
        this._updateLayerList();
      }, 100);
    };

    this.map.on('pm:create', debouncedUpdate);
    this.map.on('pm:remove', debouncedUpdate);
    this.map.on('layeradd', debouncedUpdate);
    this.map.on('layerremove', debouncedUpdate);
  }

  _updateLayerList() {
    const layers = this._getLayers();

    // Update count
    const countEl = this.container.querySelector<HTMLElement>('#layer-count')!;
    if (countEl) {
      countEl.textContent = String(layers.length);
    }

    // Update the layer list
    const listEl = this.container.querySelector<HTMLElement>('#layer-list')!;
    if (listEl) {
      listEl.innerHTML = this._renderLayers(layers);

      // Rebind click handlers for layer items
      listEl
        .querySelectorAll<HTMLElement>('.devpanel-layer-item')
        .forEach((item) => {
          item.addEventListener('click', (e) => {
            if ((e.target as Element).closest('[data-layer-action]')) return;
            const index = parseInt(item.dataset.layerIndex!, 10);
            this._showLayerDetails(index);
          });
        });

      // Rebind action button handlers
      listEl
        .querySelectorAll<HTMLElement>('[data-layer-action]')
        .forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = (e.currentTarget as HTMLElement).dataset
              .layerAction!;
            const index = parseInt(
              (e.currentTarget as HTMLElement).dataset.layerIndex!,
              10
            );
            this._handleLayerAction(action, index);
          });
        });
    }
  }

  _showToast(message: string, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `devpanel-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  destroy() {
    this._removeHighlight();
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LayerInspector;
} else {
  window.LayerInspector = LayerInspector;
}

declare global {
  interface Window {
    LayerInspector: typeof LayerInspector;
  }
}
