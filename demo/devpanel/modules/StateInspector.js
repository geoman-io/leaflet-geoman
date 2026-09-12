class StateInspector {
  constructor() {
    this.name = "state";
    this.title = "State Inspector";
    this._updateInterval = null;
  }
  init(map, container, panel) {
    this.map = map;
    this.container = container;
    this.panel = panel;
    this._render();
    this._bindEvents();
    this._startAutoUpdate();
  }
  _render() {
    this.container.innerHTML = `
      <div class="devpanel-section">
        <div class="devpanel-label">Active Modes</div>
        <div class="devpanel-mode-indicator" id="mode-indicator">
          ${this._renderModes()}
        </div>
      </div>

      <div class="devpanel-section">
        <div class="devpanel-label">Active Shape</div>
        <div id="active-shape">
          <span class="devpanel-badge inactive">None</span>
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-section-title" data-collapse="global-options">
          <span class="devpanel-section-icon">\u25BC</span>
          Global Options
        </div>
        <div id="global-options-content">
          ${this._renderGlobalOptions()}
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-section-title" data-collapse="toolbar-state">
          <span class="devpanel-section-icon">\u25BC</span>
          Toolbar State
        </div>
        <div id="toolbar-state-content">
          ${this._renderToolbarState()}
        </div>
      </div>

      <div class="devpanel-divider"></div>

      <div class="devpanel-section">
        <div class="devpanel-label">Quick Actions</div>
        <div class="devpanel-btn-group">
          <button class="devpanel-btn secondary" data-action="disable-all">
            Disable All Modes
          </button>
          <button class="devpanel-btn secondary" data-action="refresh">
            Refresh State
          </button>
        </div>
      </div>
    `;
    this._bindCollapseHandlers();
  }
  _renderModes() {
    const pm = this.map.pm;
    const modes = [
      { name: "Draw", active: pm.globalDrawModeEnabled() },
      { name: "Edit", active: pm.globalEditModeEnabled() },
      { name: "Drag", active: pm.globalDragModeEnabled() },
      { name: "Remove", active: pm.globalRemovalModeEnabled() },
      { name: "Rotate", active: pm.globalRotateModeEnabled() },
      { name: "Cut", active: pm.globalCutModeEnabled() }
    ];
    return modes.map(
      (mode) => `<div class="devpanel-mode ${mode.active ? "active" : ""}">${mode.name}</div>`
    ).join("");
  }
  _renderGlobalOptions() {
    const options = this.map.pm.getGlobalOptions();
    const defaultOptions = {
      snappable: true,
      snapDistance: 20,
      snapMiddle: false,
      snapSegment: true,
      snapVertex: true,
      draggable: true,
      exitModeOnEscape: false,
      finishOnEnter: false
    };
    const toggleOptions = [
      "snappable",
      "snapMiddle",
      "snapSegment",
      "snapVertex",
      "draggable",
      "exitModeOnEscape",
      "finishOnEnter"
    ];
    let html = '<div class="devpanel-options-list">';
    toggleOptions.forEach((key) => {
      if (key in options) {
        const value = options[key];
        const isDefault = value === defaultOptions[key];
        html += `
          <div class="devpanel-toggle-switch">
            <label for="opt-${key}">
              ${key}
              ${!isDefault ? '<span class="devpanel-badge warning">modified</span>' : ""}
            </label>
            <div class="devpanel-switch">
              <input type="checkbox" id="opt-${key}" data-option="${key}" ${value ? "checked" : ""}>
              <span class="devpanel-switch-slider"></span>
            </div>
          </div>
        `;
      }
    });
    if ("snapDistance" in options) {
      html += `
        <div class="devpanel-field" style="margin-top: 8px;">
          <label class="devpanel-label" for="opt-snapDistance">snapDistance</label>
          <input type="number" class="devpanel-input" id="opt-snapDistance"
            data-option="snapDistance" value="${options.snapDistance}" min="1" max="100">
        </div>
      `;
    }
    if (options.snappingOrder) {
      html += `
        <div class="devpanel-field" style="margin-top: 8px;">
          <label class="devpanel-label">snappingOrder</label>
          <div class="devpanel-json" style="font-size: 10px; max-height: 60px;">
            ${JSON.stringify(options.snappingOrder)}
          </div>
        </div>
      `;
    }
    html += "</div>";
    return html;
  }
  _renderToolbarState() {
    const toolbar = this.map.pm.Toolbar;
    const isVisible = toolbar._toolbarContainer ? true : false;
    let html = `
      <div class="devpanel-field">
        <span class="devpanel-label">Toolbar visible: </span>
        <span class="devpanel-badge ${isVisible ? "active" : "inactive"}">${isVisible ? "Yes" : "No"}</span>
      </div>
    `;
    if (isVisible && toolbar._toolbarContainer) {
      const buttons = toolbar._toolbarContainer.querySelectorAll(
        ".button-container"
      );
      const activeButtons = Array.from(buttons).filter((btn) => btn.classList.contains("active")).map((btn) => {
        const buttonEl = btn.querySelector(
          ".leaflet-buttons-control-button"
        );
        return buttonEl?.className.match(/control-icon-(\w+)/)?.[1] || "unknown";
      });
      if (activeButtons.length > 0) {
        html += `
          <div class="devpanel-field">
            <span class="devpanel-label">Active buttons: </span>
            <span>${activeButtons.join(", ")}</span>
          </div>
        `;
      }
    }
    return html;
  }
  _bindEvents() {
    this.container.querySelectorAll("[data-option]").forEach((input) => {
      input.addEventListener("change", (e) => {
        const option = e.target.dataset.option;
        let value;
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        } else if (e.target.type === "number") {
          value = parseInt(e.target.value, 10);
        }
        this.map.pm.setGlobalOptions({ [option]: value });
        this._showToast(`Set ${option} = ${value}`);
      });
    });
    this.container.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.action;
        this._handleAction(action);
      });
    });
    const updateEvents = [
      "pm:globaldrawmodetoggled",
      "pm:globaleditmodetoggled",
      "pm:globaldragmodetoggled",
      "pm:globalremovalmodetoggled",
      "pm:globalrotatemodetoggled",
      "pm:globalcutmodetoggled",
      "pm:drawstart",
      "pm:drawend"
    ];
    updateEvents.forEach((event) => {
      this.map.on(event, () => {
        this._updateState();
      });
    });
  }
  _bindCollapseHandlers() {
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
    switch (action) {
      case "disable-all":
        this._disableAllModes();
        break;
      case "refresh":
        this._updateState();
        this._showToast("State refreshed");
        break;
    }
  }
  _disableAllModes() {
    const pm = this.map.pm;
    if (pm.globalDrawModeEnabled()) {
      pm.disableDraw();
    }
    if (pm.globalEditModeEnabled()) {
      pm.disableGlobalEditMode();
    }
    if (pm.globalDragModeEnabled()) {
      pm.disableGlobalDragMode();
    }
    if (pm.globalRemovalModeEnabled()) {
      pm.disableGlobalRemovalMode();
    }
    if (pm.globalRotateModeEnabled()) {
      pm.disableGlobalRotateMode();
    }
    if (pm.globalCutModeEnabled()) {
      pm.disableGlobalCutMode();
    }
    this._updateState();
    this._showToast("All modes disabled");
  }
  _updateState() {
    const modeIndicator = this.container.querySelector("#mode-indicator");
    if (modeIndicator) {
      modeIndicator.innerHTML = this._renderModes();
    }
    const activeShapeEl = this.container.querySelector("#active-shape");
    if (activeShapeEl) {
      const activeShape = this.map.pm.Draw.getActiveShape();
      if (activeShape) {
        activeShapeEl.innerHTML = `<span class="devpanel-badge active">${activeShape}</span>`;
      } else {
        activeShapeEl.innerHTML = `<span class="devpanel-badge inactive">None</span>`;
      }
    }
    const toolbarContent = this.container.querySelector(
      "#toolbar-state-content"
    );
    if (toolbarContent) {
      toolbarContent.innerHTML = this._renderToolbarState();
    }
    this._syncGlobalOptionsUI();
  }
  _syncGlobalOptionsUI() {
    const options = this.map.pm.getGlobalOptions();
    this.container.querySelectorAll("[data-option]").forEach((input) => {
      const optionName = input.dataset.option;
      if (optionName in options) {
        if (input.type === "checkbox") {
          input.checked = !!options[optionName];
        } else if (input.type === "number") {
          input.value = String(options[optionName]);
        }
      }
    });
    const defaultOptions = {
      snappable: true,
      snapDistance: 20,
      snapMiddle: false,
      snapSegment: true,
      snapVertex: true,
      draggable: true,
      exitModeOnEscape: false,
      finishOnEnter: false
    };
    this.container.querySelectorAll(".devpanel-toggle-switch").forEach((row) => {
      const input = row.querySelector("[data-option]");
      if (!input) return;
      const optionName = input.dataset.option;
      const currentValue = input.type === "checkbox" ? input.checked : parseInt(input.value, 10);
      const isDefault = currentValue === defaultOptions[optionName];
      let badge = row.querySelector(".devpanel-badge.warning");
      if (!isDefault && !badge) {
        const label = row.querySelector("label");
        if (label) {
          badge = document.createElement("span");
          badge.className = "devpanel-badge warning";
          badge.textContent = "modified";
          label.appendChild(badge);
        }
      } else if (isDefault && badge) {
        badge.remove();
      }
    });
  }
  _startAutoUpdate() {
    this._updateInterval = setInterval(() => {
      this._updateState();
    }, 500);
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
    if (this._updateInterval) {
      clearInterval(this._updateInterval);
    }
  }
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = StateInspector;
} else {
  window.StateInspector = StateInspector;
}
//# sourceMappingURL=StateInspector.js.map
