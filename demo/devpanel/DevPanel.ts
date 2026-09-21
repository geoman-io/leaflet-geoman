/**
 * DevPanel - A developer debugging panel for Leaflet-Geoman
 *
 * Provides a collapsible right sidebar with modules for:
 * - GeoJSON import/export
 * - State inspection
 * - Event logging
 * - Layer inspection
 */

class DevPanel {
  declare map: L.Map;
  declare options: import('../globals').PanelOptions;
  declare modules: Map<string, import('../globals').PanelModule>;
  declare isCollapsed: boolean;
  declare container: HTMLDivElement;
  declare header: HTMLDivElement;
  declare content: HTMLDivElement;
  declare _state: { collapsed?: boolean; modules: Record<string, boolean> };

  constructor(
    map: L.Map,
    options: Partial<import('../globals').PanelOptions> = {}
  ) {
    this.map = map;
    this.options = {
      position: 'right',
      width: 360,
      collapsed: false,
      persistState: true,
      storageKey: 'geoman-devpanel',
      ...options,
    };

    this.modules = new Map();
    this.isCollapsed = this.options.collapsed;

    this._loadState();
    this._createContainer();
    this._setupKeyboardShortcuts();
  }

  /**
   * Create the main panel container
   */
  _createContainer() {
    // Main panel container
    this.container = document.createElement('div');
    this.container.className = 'devpanel';
    this.container.style.width = this.isCollapsed
      ? '40px'
      : `${this.options.width}px`;

    if (this.isCollapsed) {
      this.container.classList.add('collapsed');
      document.body.classList.add('devpanel-collapsed');
    }

    // Header with toggle button
    this.header = document.createElement('div');
    this.header.className = 'devpanel-header';
    this.header.innerHTML = `
      <button class="devpanel-toggle" title="Toggle DevPanel (Ctrl+Shift+D)">
        <span class="devpanel-toggle-icon">${this.isCollapsed ? '◀' : '▶'}</span>
      </button>
      <span class="devpanel-title">Geoman DevPanel</span>
    `;
    this.container.appendChild(this.header);

    // Toggle button handler
    this.header
      .querySelector<HTMLElement>('.devpanel-toggle')!
      .addEventListener('click', () => {
        this.toggle();
      });

    // Content area for modules
    this.content = document.createElement('div');
    this.content.className = 'devpanel-content';
    this.container.appendChild(this.content);

    // Add to document
    document.body.appendChild(this.container);
  }

  /**
   * Register a module with the panel
   */
  registerModule(module: import('../globals').PanelModule) {
    if (!module.name) {
      throw new Error('Module must have a name property');
    }

    this.modules.set(module.name, module);

    // Create module section
    const section = document.createElement('div');
    section.className = 'devpanel-module';
    section.dataset.module = module.name;

    // Check if this module was expanded before
    const wasExpanded = this._getModuleState(module.name);

    // Module header (collapsible)
    const header = document.createElement('div');
    header.className = 'devpanel-module-header';
    header.innerHTML = `
      <span class="devpanel-module-icon">${wasExpanded ? '▼' : '▶'}</span>
      <span class="devpanel-module-title">${module.title || module.name}</span>
    `;
    header.addEventListener('click', () => {
      this._toggleModule(module.name);
    });
    section.appendChild(header);

    // Module content
    const content = document.createElement('div');
    content.className = 'devpanel-module-content';
    if (!wasExpanded) {
      content.style.display = 'none';
    }
    section.appendChild(content);

    this.content.appendChild(section);

    // Initialize the module
    module.init(this.map, content, this);

    return this;
  }

  /**
   * Toggle a module's expanded state
   */
  _toggleModule(moduleName: string) {
    const section = this.content.querySelector<HTMLElement>(
      `[data-module="${moduleName}"]`
    )!;
    if (!section) return;

    const content = section.querySelector<HTMLElement>(
      '.devpanel-module-content'
    )!;
    const icon = section.querySelector<HTMLElement>('.devpanel-module-icon')!;
    const isExpanded = content.style.display !== 'none';

    content.style.display = isExpanded ? 'none' : 'block';
    icon.textContent = isExpanded ? '▶' : '▼';

    this._setModuleState(moduleName, !isExpanded);
    this._saveState();
  }

  /**
   * Expand a specific module
   */
  expandModule(moduleName: string) {
    const section = this.content.querySelector<HTMLElement>(
      `[data-module="${moduleName}"]`
    )!;
    if (!section) return;

    const content = section.querySelector<HTMLElement>(
      '.devpanel-module-content'
    )!;
    const icon = section.querySelector<HTMLElement>('.devpanel-module-icon')!;

    content.style.display = 'block';
    icon.textContent = '▼';

    this._setModuleState(moduleName, true);
    this._saveState();
  }

  /**
   * Collapse a specific module
   */
  collapseModule(moduleName: string) {
    const section = this.content.querySelector<HTMLElement>(
      `[data-module="${moduleName}"]`
    )!;
    if (!section) return;

    const content = section.querySelector<HTMLElement>(
      '.devpanel-module-content'
    )!;
    const icon = section.querySelector<HTMLElement>('.devpanel-module-icon')!;

    content.style.display = 'none';
    icon.textContent = '▶';

    this._setModuleState(moduleName, false);
    this._saveState();
  }

  /**
   * Toggle the panel collapsed state
   */
  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.container.style.width = this.isCollapsed
      ? '40px'
      : `${this.options.width}px`;
    this.container.classList.toggle('collapsed', this.isCollapsed);

    // Toggle body class for layout adjustments
    document.body.classList.toggle('devpanel-collapsed', this.isCollapsed);

    const toggleIcon = this.header.querySelector<HTMLElement>(
      '.devpanel-toggle-icon'
    )!;
    toggleIcon.textContent = this.isCollapsed ? '◀' : '▶';

    this._saveState();
  }

  /**
   * Show the panel
   */
  show() {
    if (this.isCollapsed) {
      this.toggle();
    }
  }

  /**
   * Hide the panel
   */
  hide() {
    if (!this.isCollapsed) {
      this.toggle();
    }
  }

  /**
   * Get a registered module by name
   */
  getModule(name: string) {
    return this.modules.get(name);
  }

  /**
   * Setup keyboard shortcuts
   */
  _setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+Shift+D - Toggle panel
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  /**
   * Load state from localStorage
   */
  _loadState() {
    if (!this.options.persistState) return;

    try {
      const state = localStorage.getItem(this.options.storageKey);
      if (state) {
        this._state = JSON.parse(state);
        this.isCollapsed = this._state.collapsed ?? this.options.collapsed;
      } else {
        this._state = { collapsed: this.options.collapsed, modules: {} };
      }
    } catch (e) {
      this._state = { collapsed: this.options.collapsed, modules: {} };
    }
  }

  /**
   * Save state to localStorage
   */
  _saveState() {
    if (!this.options.persistState) return;

    try {
      this._state.collapsed = this.isCollapsed;
      localStorage.setItem(
        this.options.storageKey,
        JSON.stringify(this._state)
      );
    } catch (e) {
      // Ignore storage errors
    }
  }

  /**
   * Get a module's expanded state
   */
  _getModuleState(moduleName: string) {
    return this._state?.modules?.[moduleName] ?? true; // Default to expanded
  }

  /**
   * Set a module's expanded state
   */
  _setModuleState(moduleName: string, expanded: boolean) {
    if (!this._state) this._state = { modules: {} };
    if (!this._state.modules) this._state.modules = {};
    this._state.modules[moduleName] = expanded;
  }

  /**
   * Destroy the panel and clean up
   */
  destroy() {
    // Destroy all modules
    this.modules.forEach((module) => {
      if (module.destroy) {
        module.destroy();
      }
    });

    // Remove container
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DevPanel;
} else {
  window.DevPanel = DevPanel;
}

declare global {
  interface Window {
    DevPanel: typeof DevPanel;
  }
}
