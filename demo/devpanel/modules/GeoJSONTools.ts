/**
 * GeoJSON Tools Module for DevPanel
 *
 * Features:
 * - Export all layers as GeoJSON (to console, clipboard, or file download)
 * - Import from text paste, file upload
 * - Clear all layers
 */

class GeoJSONTools {
  declare map: L.Map;
  declare name: string;
  declare title: string;
  declare container: HTMLElement;
  declare panel: InstanceType<Window['DevPanel']>;

  constructor() {
    this.name = 'geojson';
    this.title = 'GeoJSON Tools';
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
    this._setupKeyboardShortcuts();
  }

  _render() {
    this.container.innerHTML = `
      <div class="devpanel-section">
        <div class="devpanel-label">Export</div>
        <div class="devpanel-btn-group">
          <button class="devpanel-btn" data-action="export-console" title="Ctrl+Shift+G">
            To Console
          </button>
          <button class="devpanel-btn" data-action="export-clipboard">
            Copy to Clipboard
          </button>
          <button class="devpanel-btn secondary" data-action="export-download">
            Download File
          </button>
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">Import</div>
        <div class="devpanel-field">
          <textarea
            class="devpanel-textarea"
            id="geojson-input"
            placeholder="Paste GeoJSON here..."
          ></textarea>
        </div>
        <div class="devpanel-btn-group">
          <button class="devpanel-btn success" data-action="import-text">
            Load from Text
          </button>
          <label class="devpanel-file-label">
            Load from File
            <input type="file" class="devpanel-file-input" id="geojson-file" accept=".json,.geojson">
          </label>
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">Actions</div>
        <div class="devpanel-btn-group">
          <button class="devpanel-btn danger" data-action="clear-all" title="Ctrl+Shift+C">
            Clear All Layers
          </button>
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">Preview</div>
        <div class="devpanel-json" id="geojson-preview">
          Click "To Console" or "Copy to Clipboard" to generate GeoJSON preview
        </div>
        <div class="devpanel-field" style="margin-top: 8px;">
          <span class="devpanel-label">Layer count: </span>
          <span id="layer-count">0</span>
        </div>
      </div>
    `;

    this._bindEvents();
    this._updateLayerCount();
  }

  _bindEvents() {
    // Button clicks
    this.container
      .querySelectorAll<HTMLElement>('[data-action]')
      .forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const action = (e.currentTarget as HTMLElement).dataset.action!;
          this._handleAction(action);
        });
      });

    // File input
    const fileInput =
      this.container.querySelector<HTMLInputElement>('#geojson-file')!;
    fileInput.addEventListener('change', (e) => {
      this._handleFileUpload((e.target as HTMLInputElement).files![0]);
    });

    // Listen for layer changes
    this.map.on('layeradd layerremove', () => {
      this._updateLayerCount();
    });
  }

  _handleAction(action: string | undefined) {
    switch (action) {
      case 'export-console':
        this._exportToConsole();
        break;
      case 'export-clipboard':
        this._exportToClipboard();
        break;
      case 'export-download':
        this._exportToDownload();
        break;
      case 'import-text':
        this._importFromText();
        break;
      case 'clear-all':
        this._clearAllLayers();
        break;
    }
  }

  _getGeoJSON() {
    const layers =
      this.map.pm.getGeomanDrawLayers() as import('../../globals').InspectableLayer[];
    const features: GeoJSON.Feature[] = [];

    layers.forEach((layer) => {
      if (layer.toGeoJSON) {
        const geojson = layer.toGeoJSON() as GeoJSON.Feature;
        // Add PM-specific properties
        if ((layer as L.Marker).pm) {
          geojson.properties = geojson.properties || {};
          geojson.properties._pmShape = (layer as L.Marker).pm.getShape();
        }
        features.push(geojson);
      }
    });

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }

  _exportToConsole() {
    const geojson = this._getGeoJSON();
    const formatted = JSON.stringify(geojson, null, 2);

    console.group(
      '%c[Geoman DevPanel] GeoJSON Export',
      'color: #569cd6; font-weight: bold;'
    );
    console.log(`Exported ${geojson.features.length} features`);
    console.log(geojson);
    console.groupEnd();

    this._updatePreview(geojson);
    this._showToast(
      `Exported ${geojson.features.length} features to console`,
      'success'
    );
  }

  _exportToClipboard() {
    const geojson = this._getGeoJSON();
    const formatted = JSON.stringify(geojson, null, 2);

    navigator.clipboard
      .writeText(formatted)
      .then(() => {
        this._updatePreview(geojson);
        this._showToast(
          `Copied ${geojson.features.length} features to clipboard`,
          'success'
        );
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard:', err);
        this._showToast('Failed to copy to clipboard', 'error');
      });
  }

  _exportToDownload() {
    const geojson = this._getGeoJSON();
    const formatted = JSON.stringify(geojson, null, 2);
    const blob = new Blob([formatted], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `geoman-export-${Date.now()}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this._updatePreview(geojson);
    this._showToast(
      `Downloaded ${geojson.features.length} features`,
      'success'
    );
  }

  _importFromText() {
    const textarea =
      this.container.querySelector<HTMLTextAreaElement>('#geojson-input')!;
    const text = textarea.value.trim();

    if (!text) {
      this._showToast('Please paste GeoJSON in the textarea', 'error');
      return;
    }

    try {
      const geojson = JSON.parse(text);
      this._loadGeoJSON(geojson);
      textarea.value = '';
    } catch (e) {
      console.error('Invalid GeoJSON:', e);
      this._showToast('Invalid GeoJSON format', 'error');
    }
  }

  _handleFileUpload(file: File) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geojson = JSON.parse(e.target!.result as string);
        this._loadGeoJSON(geojson);
      } catch (err) {
        console.error('Invalid GeoJSON file:', err);
        this._showToast('Invalid GeoJSON file', 'error');
      }
    };
    reader.readAsText(file);
  }

  _loadGeoJSON(
    geojson: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.Geometry
  ) {
    try {
      let count = 0;

      // Handle both FeatureCollection and single Feature
      const features =
        geojson.type === 'FeatureCollection' ? geojson.features : [geojson];

      features.forEach((feature) => {
        const layer = L.geoJSON(feature, {
          pointToLayer: (geoJsonPoint, latlng) => {
            // Check for circle/circleMarker
            if (geoJsonPoint.properties && geoJsonPoint.properties.radius) {
              return L.circle(latlng, {
                radius: geoJsonPoint.properties.radius,
              });
            }
            return L.marker(latlng);
          },
          onEachFeature: (feature, layer) => {
            // Add PM if not already present
            if (!(layer as L.Marker).pm) {
              layer.addTo(this.map);
            }
          },
        });

        layer.addTo(this.map);
        count++;
      });

      this._updateLayerCount();
      this._showToast(`Imported ${count} features`, 'success');
    } catch (e) {
      console.error('Error loading GeoJSON:', e);
      this._showToast('Error loading GeoJSON', 'error');
    }
  }

  _clearAllLayers() {
    const layers =
      this.map.pm.getGeomanDrawLayers() as import('../../globals').InspectableLayer[];
    const count = layers.length;

    if (count === 0) {
      this._showToast('No layers to clear', 'error');
      return;
    }

    if (confirm(`Are you sure you want to remove ${count} layer(s)?`)) {
      layers.forEach((layer) => {
        this.map.removeLayer(layer);
      });

      this._updateLayerCount();
      this._showToast(`Cleared ${count} layers`, 'success');
    }
  }

  _updatePreview(geojson: unknown) {
    const preview =
      this.container.querySelector<HTMLElement>('#geojson-preview')!;
    const formatted = JSON.stringify(geojson, null, 2);

    // Syntax highlight the JSON
    preview.innerHTML = this._syntaxHighlight(formatted);
  }

  _syntaxHighlight(json: string) {
    // Simple JSON syntax highlighting
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
            match = match.slice(0, -1); // Remove trailing colon for styling
            return `<span class="${cls}">${match}</span>:`;
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  }

  _updateLayerCount() {
    const countEl = this.container.querySelector<HTMLElement>('#layer-count')!;
    if (countEl) {
      const layers =
        this.map.pm.getGeomanDrawLayers() as import('../../globals').InspectableLayer[];
      countEl.textContent = String(layers.length);
    }
  }

  _showToast(message: string, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `devpanel-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  _setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+G - Export to console
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault();
        this._exportToConsole();
      }
      // Ctrl+Shift+C - Clear all (only if not in input)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key === 'C' &&
        (e.target as HTMLElement).tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        this._clearAllLayers();
      }
    });
  }

  destroy() {
    // Cleanup if needed
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GeoJSONTools;
} else {
  window.GeoJSONTools = GeoJSONTools;
}

declare global {
  interface Window {
    GeoJSONTools: typeof GeoJSONTools;
  }
}
