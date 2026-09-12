/**
 * Event Logger Module for DevPanel
 *
 * Features:
 * - Real-time event stream
 * - Filter by event type (draw, edit, vertex, snap, etc.)
 * - Click event to expand full payload
 * - Clear/pause functionality
 * - Export event log
 */

class EventLogger {
  declare map: L.Map;
  declare name: string;
  declare title: string;
  declare container: HTMLElement;
  declare panel: InstanceType<Window['DevPanel']>;
  declare events: import('../../globals').LogEvent[];
  declare maxEvents: number;
  declare isPaused: boolean;
  declare activeFilters: Set<string>;
  declare _boundHandlers: { event: string; handler: L.LeafletEventHandlerFn }[];

  constructor() {
    this.name = 'events';
    this.title = 'Event Logger';
    this.events = [];
    this.maxEvents = 100;
    this.isPaused = false;
    this.activeFilters = new Set(['all']);
    this._boundHandlers = [];
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
    this.container.innerHTML = `
      <div class="devpanel-section">
        <div class="devpanel-btn-group">
          <button class="devpanel-btn ${this.isPaused ? 'secondary' : ''}" data-action="toggle-pause">
            ${this.isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button class="devpanel-btn secondary" data-action="clear">
            Clear
          </button>
          <button class="devpanel-btn secondary" data-action="export">
            Export
          </button>
        </div>
      </div>

      <div class="devpanel-section">
        <div class="devpanel-label">Filter Events</div>
        <div class="devpanel-filters" id="event-filters">
          ${this._renderFilters()}
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">
          Event Log
          <span class="devpanel-counter" id="event-count">${this.events.length}</span>
        </div>
        <div class="devpanel-event-log" id="event-log">
          ${this._renderEvents()}
        </div>
      </div>
    `;

    this._bindEvents();
  }

  _renderFilters() {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'draw', label: 'Draw' },
      { id: 'edit', label: 'Edit' },
      { id: 'drag', label: 'Drag' },
      { id: 'remove', label: 'Remove' },
      { id: 'cut', label: 'Cut' },
      { id: 'rotate', label: 'Rotate' },
      { id: 'snap', label: 'Snap' },
      { id: 'vertex', label: 'Vertex' },
      { id: 'layer', label: 'Layer' },
    ];

    return filters
      .map(
        (f) =>
          `<span class="devpanel-filter ${this.activeFilters.has(f.id) ? 'active' : ''}" data-filter="${f.id}">${f.label}</span>`
      )
      .join('');
  }

  _renderEvents() {
    if (this.events.length === 0) {
      return '<div class="devpanel-empty">No events logged yet</div>';
    }

    const filteredEvents = this._getFilteredEvents();

    if (filteredEvents.length === 0) {
      return '<div class="devpanel-empty">No events match current filter</div>';
    }

    return filteredEvents
      .slice()
      .reverse()
      .map(
        (event, index) => `
        <div class="devpanel-event-item" data-event-index="${filteredEvents.length - 1 - index}">
          <div class="devpanel-event-header">
            <span class="devpanel-event-name">${event.type}</span>
            <span class="devpanel-event-time">${event.timeStr}</span>
          </div>
          <div class="devpanel-event-details">
            <pre class="devpanel-json">${this._formatEventData(event)}</pre>
          </div>
        </div>
      `
      )
      .join('');
  }

  _getFilteredEvents() {
    if (this.activeFilters.has('all')) {
      return this.events;
    }

    return this.events.filter((event) => {
      const type = event.type.toLowerCase();

      for (const filter of this.activeFilters) {
        if (type.includes(filter)) {
          return true;
        }
      }
      return false;
    });
  }

  _formatEventData(event: import('../../globals').LogEvent) {
    const data = { ...event.data };

    // Remove circular references and simplify
    if (data.layer) {
      data.layer = `[Layer: ${this._getLayerType(data.layer as import('../../globals').InspectableLayer)}]`;
    }
    if (data.workingLayer) {
      data.workingLayer = `[WorkingLayer: ${this._getLayerType(data.workingLayer as import('../../globals').InspectableLayer)}]`;
    }
    if (data.marker) {
      data.marker = '[Marker]';
    }
    if (data.target) {
      delete data.target; // Remove target as it's usually the map
    }
    if (data.sourceTarget) {
      delete data.sourceTarget;
    }

    return JSON.stringify(data, null, 2);
  }

  _getLayerType(
    layer: import('../../globals').InspectableLayer | null | undefined
  ) {
    if (!layer) return 'unknown';
    if (layer.pm && layer.pm.getShape) {
      return layer.pm.getShape();
    }
    if (layer instanceof L.Marker) return 'Marker';
    if (layer instanceof L.CircleMarker) return 'CircleMarker';
    if (layer instanceof L.Circle) return 'Circle';
    if (layer instanceof L.Polygon) return 'Polygon';
    if (layer instanceof L.Polyline) return 'Line';
    if (layer instanceof L.Rectangle) return 'Rectangle';
    return 'Layer';
  }

  _bindEvents() {
    // Button handlers
    this.container
      .querySelectorAll<HTMLElement>('[data-action]')
      .forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const action = (e.currentTarget as HTMLElement).dataset.action!;
          this._handleAction(action);
        });
      });

    // Filter handlers
    this.container
      .querySelectorAll<HTMLElement>('[data-filter]')
      .forEach((filter) => {
        filter.addEventListener('click', (e) => {
          const filterId = (e.currentTarget as HTMLElement).dataset.filter!;
          this._toggleFilter(filterId);
        });
      });

    // Event item expand/collapse
    this.container
      .querySelectorAll<HTMLElement>('.devpanel-event-item')
      .forEach((item) => {
        item.addEventListener('click', () => {
          item.classList.toggle('expanded');
        });
      });
  }

  _handleAction(action: string | undefined) {
    switch (action) {
      case 'toggle-pause':
        this.isPaused = !this.isPaused;
        this._updatePauseButton();
        this._showToast(
          this.isPaused ? 'Event logging paused' : 'Event logging resumed'
        );
        break;
      case 'clear':
        this.events = [];
        this._updateEventLog();
        this._showToast('Event log cleared');
        break;
      case 'export':
        this._exportEvents();
        break;
    }
  }

  _toggleFilter(filterId: string) {
    if (filterId === 'all') {
      this.activeFilters.clear();
      this.activeFilters.add('all');
    } else {
      this.activeFilters.delete('all');

      if (this.activeFilters.has(filterId)) {
        this.activeFilters.delete(filterId);
        if (this.activeFilters.size === 0) {
          this.activeFilters.add('all');
        }
      } else {
        this.activeFilters.add(filterId);
      }
    }

    this._updateFilters();
    this._updateEventLog();
  }

  _updatePauseButton() {
    const btn = this.container.querySelector<HTMLElement>(
      '[data-action="toggle-pause"]'
    )!;
    if (btn) {
      btn.textContent = this.isPaused ? '▶ Resume' : '⏸ Pause';
      btn.classList.toggle('secondary', this.isPaused);
    }
  }

  _updateFilters() {
    const filtersContainer =
      this.container.querySelector<HTMLElement>('#event-filters')!;
    if (filtersContainer) {
      filtersContainer.innerHTML = this._renderFilters();
      // Rebind filter click handlers
      filtersContainer
        .querySelectorAll<HTMLElement>('[data-filter]')
        .forEach((filter) => {
          filter.addEventListener('click', (e) => {
            const filterId = (e.currentTarget as HTMLElement).dataset.filter!;
            this._toggleFilter(filterId);
          });
        });
    }
  }

  _updateEventLog() {
    const logContainer =
      this.container.querySelector<HTMLElement>('#event-log')!;
    const countEl = this.container.querySelector<HTMLElement>('#event-count')!;

    if (logContainer) {
      logContainer.innerHTML = this._renderEvents();
      // Rebind click handlers for new items
      logContainer
        .querySelectorAll<HTMLElement>('.devpanel-event-item')
        .forEach((item) => {
          item.addEventListener('click', () => {
            item.classList.toggle('expanded');
          });
        });
    }

    if (countEl) {
      countEl.textContent = String(this.events.length);
    }
  }

  _exportEvents() {
    const filteredEvents = this._getFilteredEvents();
    const exportData = filteredEvents.map((e) => ({
      type: e.type,
      time: e.time,
      data: e.data,
    }));

    const formatted = JSON.stringify(exportData, null, 2);

    navigator.clipboard
      .writeText(formatted)
      .then(() => {
        this._showToast(
          `Exported ${filteredEvents.length} events to clipboard`,
          'success'
        );
      })
      .catch(() => {
        // Fallback: log to console
        console.log('[DevPanel] Event Log Export:', exportData);
        this._showToast(
          `Exported ${filteredEvents.length} events to console`,
          'success'
        );
      });
  }

  _bindMapEvents() {
    // List of all PM events to listen for
    const pmEvents = [
      // Global mode events
      'pm:globaldrawmodetoggled',
      'pm:globaleditmodetoggled',
      'pm:globaldragmodetoggled',
      'pm:globalremovalmodetoggled',
      'pm:globalrotatemodetoggled',
      'pm:globalcutmodetoggled',

      // Draw events
      'pm:drawstart',
      'pm:drawend',
      'pm:create',

      // Edit events
      'pm:edit',
      'pm:update',
      'pm:enable',
      'pm:disable',

      // Vertex events
      'pm:vertexadded',
      'pm:vertexremoved',
      'pm:markerdragstart',
      'pm:markerdrag',
      'pm:markerdragend',

      // Snap events
      'pm:snap',
      'pm:unsnap',
      'pm:snapdrag',

      // Drag events
      'pm:dragstart',
      'pm:drag',
      'pm:dragend',

      // Remove events
      'pm:remove',

      // Cut events
      'pm:cut',

      // Rotate events
      'pm:rotatestart',
      'pm:rotate',
      'pm:rotateend',

      // Layer events
      'pm:layerremove',
      'layeradd',
      'layerremove',

      // Center placed (for circles)
      'pm:centerplaced',

      // Intersection
      'pm:intersect',
    ];

    pmEvents.forEach((eventName) => {
      const handler = (e: L.LeafletEvent) => this._logEvent(eventName, e);
      this.map.on(eventName, handler);
      this._boundHandlers.push({ event: eventName, handler });
    });
  }

  _logEvent(type: string, data: object) {
    if (this.isPaused) return;

    const now = new Date();
    const event = {
      type,
      time: now.getTime(),
      timeStr: now.toLocaleTimeString(),
      data: this._sanitizeEventData(data),
    };

    this.events.push(event);

    // Keep max events limit
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    this._updateEventLog();
  }

  _sanitizeEventData(data: object) {
    // Create a shallow copy with safe values
    const safe: Record<string, unknown> = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as Record<string, unknown>)[key];

        // Skip functions and DOM elements
        if (typeof value === 'function') continue;
        if (value instanceof HTMLElement) continue;

        // Handle specific known properties
        if (key === 'layer' || key === 'workingLayer') {
          safe[key] = {
            type: this._getLayerType(
              value as import('../../globals').InspectableLayer
            ),
            hasGeoman: !!(value && (value as { pm?: unknown }).pm),
          };
        } else if (key === 'shape') {
          safe[key] = value;
        } else if (key === 'enabled' || key === 'type') {
          safe[key] = value;
        } else if (key === 'latlng' || key === 'latlngs') {
          safe[key] = value;
        } else if (key === 'marker') {
          safe[key] = { present: true };
        } else if (key === 'target' || key === 'sourceTarget') {
          // Skip these
        } else if (typeof value === 'object' && value !== null) {
          // For other objects, try to get a simple representation
          try {
            if (
              (value as L.LatLng).lat !== undefined &&
              (value as L.LatLng).lng !== undefined
            ) {
              safe[key] = {
                lat: (value as L.LatLng).lat,
                lng: (value as L.LatLng).lng,
              };
            } else {
              safe[key] = '[Object]';
            }
          } catch (e) {
            safe[key] = '[Object]';
          }
        } else {
          safe[key] = value;
        }
      }
    }

    return safe;
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
    // Remove all event listeners from map
    this._boundHandlers.forEach(({ event, handler }) => {
      this.map.off(event, handler);
    });
    this._boundHandlers = [];
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventLogger;
} else {
  window.EventLogger = EventLogger;
}

declare global {
  interface Window {
    EventLogger: typeof EventLogger;
  }
}
