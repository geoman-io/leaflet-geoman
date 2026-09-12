class DevPanel {
  constructor(map, options = {}) {
    this.map = map;
    this.options = {
      position: "right",
      width: 360,
      collapsed: false,
      persistState: true,
      storageKey: "geoman-devpanel",
      ...options
    };
    this.modules = /* @__PURE__ */ new Map();
    this.isCollapsed = this.options.collapsed;
    this._loadState();
    this._createContainer();
    this._setupKeyboardShortcuts();
  }
  /**
   * Create the main panel container
   */
  _createContainer() {
    this.container = document.createElement("div");
    this.container.className = "devpanel";
    this.container.style.width = this.isCollapsed ? "40px" : `${this.options.width}px`;
    if (this.isCollapsed) {
      this.container.classList.add("collapsed");
      document.body.classList.add("devpanel-collapsed");
    }
    this.header = document.createElement("div");
    this.header.className = "devpanel-header";
    this.header.innerHTML = `
      <button class="devpanel-toggle" title="Toggle DevPanel (Ctrl+Shift+D)">
        <span class="devpanel-toggle-icon">${this.isCollapsed ? "\u25C0" : "\u25B6"}</span>
      </button>
      <span class="devpanel-title">Geoman DevPanel</span>
    `;
    this.container.appendChild(this.header);
    this.header.querySelector(".devpanel-toggle").addEventListener("click", () => {
      this.toggle();
    });
    this.content = document.createElement("div");
    this.content.className = "devpanel-content";
    this.container.appendChild(this.content);
    document.body.appendChild(this.container);
  }
  /**
   * Register a module with the panel
   */
  registerModule(module2) {
    if (!module2.name) {
      throw new Error("Module must have a name property");
    }
    this.modules.set(module2.name, module2);
    const section = document.createElement("div");
    section.className = "devpanel-module";
    section.dataset.module = module2.name;
    const wasExpanded = this._getModuleState(module2.name);
    const header = document.createElement("div");
    header.className = "devpanel-module-header";
    header.innerHTML = `
      <span class="devpanel-module-icon">${wasExpanded ? "\u25BC" : "\u25B6"}</span>
      <span class="devpanel-module-title">${module2.title || module2.name}</span>
    `;
    header.addEventListener("click", () => {
      this._toggleModule(module2.name);
    });
    section.appendChild(header);
    const content = document.createElement("div");
    content.className = "devpanel-module-content";
    if (!wasExpanded) {
      content.style.display = "none";
    }
    section.appendChild(content);
    this.content.appendChild(section);
    module2.init(this.map, content, this);
    return this;
  }
  /**
   * Toggle a module's expanded state
   */
  _toggleModule(moduleName) {
    const section = this.content.querySelector(
      `[data-module="${moduleName}"]`
    );
    if (!section) return;
    const content = section.querySelector(
      ".devpanel-module-content"
    );
    const icon = section.querySelector(".devpanel-module-icon");
    const isExpanded = content.style.display !== "none";
    content.style.display = isExpanded ? "none" : "block";
    icon.textContent = isExpanded ? "\u25B6" : "\u25BC";
    this._setModuleState(moduleName, !isExpanded);
    this._saveState();
  }
  /**
   * Expand a specific module
   */
  expandModule(moduleName) {
    const section = this.content.querySelector(
      `[data-module="${moduleName}"]`
    );
    if (!section) return;
    const content = section.querySelector(
      ".devpanel-module-content"
    );
    const icon = section.querySelector(".devpanel-module-icon");
    content.style.display = "block";
    icon.textContent = "\u25BC";
    this._setModuleState(moduleName, true);
    this._saveState();
  }
  /**
   * Collapse a specific module
   */
  collapseModule(moduleName) {
    const section = this.content.querySelector(
      `[data-module="${moduleName}"]`
    );
    if (!section) return;
    const content = section.querySelector(
      ".devpanel-module-content"
    );
    const icon = section.querySelector(".devpanel-module-icon");
    content.style.display = "none";
    icon.textContent = "\u25B6";
    this._setModuleState(moduleName, false);
    this._saveState();
  }
  /**
   * Toggle the panel collapsed state
   */
  toggle() {
    this.isCollapsed = !this.isCollapsed;
    this.container.style.width = this.isCollapsed ? "40px" : `${this.options.width}px`;
    this.container.classList.toggle("collapsed", this.isCollapsed);
    document.body.classList.toggle("devpanel-collapsed", this.isCollapsed);
    const toggleIcon = this.header.querySelector(
      ".devpanel-toggle-icon"
    );
    toggleIcon.textContent = this.isCollapsed ? "\u25C0" : "\u25B6";
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
  getModule(name) {
    return this.modules.get(name);
  }
  /**
   * Setup keyboard shortcuts
   */
  _setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
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
    }
  }
  /**
   * Get a module's expanded state
   */
  _getModuleState(moduleName) {
    return this._state?.modules?.[moduleName] ?? true;
  }
  /**
   * Set a module's expanded state
   */
  _setModuleState(moduleName, expanded) {
    if (!this._state) this._state = { modules: {} };
    if (!this._state.modules) this._state.modules = {};
    this._state.modules[moduleName] = expanded;
  }
  /**
   * Destroy the panel and clean up
   */
  destroy() {
    this.modules.forEach((module2) => {
      if (module2.destroy) {
        module2.destroy();
      }
    });
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = DevPanel;
} else {
  window.DevPanel = DevPanel;
}
//# sourceMappingURL=DevPanel.js.map
