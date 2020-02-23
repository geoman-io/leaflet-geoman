import { getTranslation } from '../helpers';

const PMButton = L.Control.extend({
  options: {
    position: 'topleft',
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize(options) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = Object.assign({}, this.options, options);
  },
  onAdd(map) {
    this._map = map;

    if (this._button.tool === 'edit') {
      this._container = this._map.pm.Toolbar.editContainer;
    } else if (this._button.tool === 'options') {
      this._container = this._map.pm.Toolbar.optionsContainer;
    } else {
      this._container = this._map.pm.Toolbar.drawContainer;
    }
    this.buttonsDomNode = this._makeButton(this._button);
    this._container.appendChild(this.buttonsDomNode);

    return this._container;
  },
  onRemove() {
    this.buttonsDomNode.remove();

    return this._container;
  },
  getText() {
    return this._button.text;
  },
  getIconUrl() {
    return this._button.iconUrl;
  },
  destroy() {
    this._button = {};
    this._update();
  },
  toggle(e) {
    if (typeof e === 'boolean') {
      this._button.toggleStatus = e;
    } else {
      this._button.toggleStatus = !this._button.toggleStatus;
    }
    this._applyStyleClasses();

    return this._button.toggleStatus;
  },
  toggled() {
    return this._button.toggleStatus;
  },
  onCreate() {
    this.toggle(false);
  },
  _triggerClick(e) {
    this._button.onClick(e);
    this._clicked(e);
    this._button.afterClick(e);
  },
  _makeButton(button) {
    // button container
    const buttonContainer = L.DomUtil.create(
      'div',
      'button-container',
      this._container
    );

    // the button itself
    const newButton = L.DomUtil.create(
      'a',
      'leaflet-buttons-control-button',
      buttonContainer
    );

    // the buttons actions
    const actionContainer = L.DomUtil.create(
      'div',
      'leaflet-pm-actions-container',
      buttonContainer
    );

    const activeActions = button.actions;

    const actions = {
      cancel: {
        text: getTranslation('actions.cancel'),
        onClick() {
          this._triggerClick();
        },
      },
      finishMode: {
        text: getTranslation('actions.finish'),
        onClick() {
          this._triggerClick();
        },
      },
      removeLastVertex: {
        text: getTranslation('actions.removeLastVertex'),
        onClick() {
          this._map.pm.Draw[button.jsClass]._removeLastVertex();
        },
      },
      finish: {
        text: getTranslation('actions.finish'),
        onClick(e) {
          this._map.pm.Draw[button.jsClass]._finishShape(e);
        },
      },
    };

    activeActions.forEach(name => {
      const action = actions[name];
      const actionNode = L.DomUtil.create(
        'a',
        `leaflet-pm-action action-${name}`,
        actionContainer
      );

      actionNode.innerHTML = action.text;

      L.DomEvent.addListener(actionNode, 'click', action.onClick, this);
      L.DomEvent.disableClickPropagation(actionNode);
    });

    if (button.toggleStatus) {
      L.DomUtil.addClass(buttonContainer, 'active');
    }

    const image = L.DomUtil.create('div', 'control-icon', newButton);

    if (button.title) {
      image.setAttribute('title', button.title);
    }

    if (button.iconUrl) {
      image.setAttribute('src', button.iconUrl);
    }
    if (button.className) {
      L.DomUtil.addClass(image, button.className);
    }
    // before the actual click, trigger a click on currently toggled buttons to
    // untoggle them and their functionality
    L.DomEvent.addListener(newButton, 'click', () => {
      if (this._button.disableOtherButtons) {
        this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
      }
    });
    L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);

    L.DomEvent.disableClickPropagation(newButton);
    return buttonContainer;
  },

  _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus) {
      L.DomUtil.removeClass(this.buttonsDomNode, 'active');
    } else {
      L.DomUtil.addClass(this.buttonsDomNode, 'active');
    }
  },

  _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  },
});

export default PMButton;
