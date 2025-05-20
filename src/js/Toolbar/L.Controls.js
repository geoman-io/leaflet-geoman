import { Control, DomEvent, DomUtil, Util } from 'leaflet';
import { getTranslation } from '../helpers';
import EventMixin from '../Mixins/Events';

const PMButton = Control.extend({
  includes: [EventMixin],
  options: {
    position: 'topleft',
    disableByOtherButtons: true,
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize(options) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = Object.assign({}, this.options, options);
  },
  onAdd(map) {
    this._map = map;
    if (!this._map.pm.Toolbar.options.oneBlock) {
      if (this._button.tool === 'edit') {
        this._container = this._map.pm.Toolbar.editContainer;
      } else if (this._button.tool === 'options') {
        this._container = this._map.pm.Toolbar.optionsContainer;
      } else if (this._button.tool === 'custom') {
        this._container = this._map.pm.Toolbar.customContainer;
      } else {
        this._container = this._map.pm.Toolbar.drawContainer;
      }
    } else {
      this._container = this._map.pm.Toolbar._createContainer(
        this.options.position
      );
    }
    this._renderButton();

    return this._container;
  },
  _renderButton() {
    const oldDomNode = this.buttonsDomNode;
    this.buttonsDomNode = this._makeButton(this._button);
    if (oldDomNode) {
      oldDomNode.replaceWith(this.buttonsDomNode);
    } else {
      this._container.appendChild(this.buttonsDomNode);
    }
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
    this._updateActiveAction(this._button);

    return this._button.toggleStatus;
  },
  toggled() {
    return this._button.toggleStatus;
  },
  onCreate() {
    this.toggle(false);
  },
  disable() {
    this.toggle(false); // is needed to prevent active button disabled
    this._button.disabled = true;
    this._updateDisabled();
  },
  enable() {
    this._button.disabled = false;
    this._updateDisabled();
    this._updateActiveAction(this._button);
  },
  _triggerClick(e) {
    if (e) {
      // is needed to prevent scrolling when clicking on a-element with href="a"
      e.preventDefault();
    }
    if (this._button.disabled) {
      return;
    }
    // TODO is this a big change when we change from e to a object with the event and the button? Now it's the second argument
    this._button.onClick(e, { button: this, event: e });
    this._clicked(e);
    this._button.afterClick(e, { button: this, event: e });
  },
  _makeButton(button) {
    const pos = this.options.position.indexOf('right') > -1 ? 'pos-right' : '';

    // button container
    const buttonContainer = DomUtil.create(
      'div',
      `button-container  ${pos}`,
      this._container
    );

    if (button.title) {
      buttonContainer.setAttribute('title', button.title);
    }

    // the button itself
    const newButton = DomUtil.create(
      'a',
      'leaflet-buttons-control-button',
      buttonContainer
    );
    newButton.setAttribute('role', 'button');
    newButton.setAttribute('tabindex', '0');
    newButton.href = '#';

    // the buttons actions
    const actionContainer = DomUtil.create(
      'div',
      `leaflet-pm-actions-container ${pos}`,
      buttonContainer
    );

    const activeActions = button.actions;

    const actions = {
      cancel: {
        text: getTranslation('actions.cancel'),
        title: getTranslation('actions.cancel'),
        onClick() {
          this._triggerClick();
        },
      },
      finishMode: {
        text: getTranslation('actions.finish'),
        title: getTranslation('actions.finish'),
        onClick() {
          this._triggerClick();
        },
      },
      removeLastVertex: {
        text: getTranslation('actions.removeLastVertex'),
        title: getTranslation('actions.removeLastVertex'),
        onClick() {
          this._map.pm.Draw[button.jsClass]._removeLastVertex();
        },
      },
      finish: {
        text: getTranslation('actions.finish'),
        title: getTranslation('actions.finish'),
        onClick(e) {
          this._map.pm.Draw[button.jsClass]._finishShape(e);
        },
      },
    };

    button._preparedActions = activeActions.map((_action) => {
      const name = typeof _action === 'string' ? _action : _action.name;
      let action;
      if (actions[name]) {
        action = actions[name];
      } else if (_action.text) {
        action = _action;
      } else {
        return action;
      }
      const actionNode = DomUtil.create(
        'a',
        `leaflet-pm-action ${pos} action-${name}`,
        actionContainer
      );
      actionNode.setAttribute('role', 'button');
      actionNode.setAttribute('tabindex', '0');
      actionNode.href = '#';

      if (action.title) {
        actionNode.title = action.title;
      }

      actionNode.innerHTML = action.text;

      DomEvent.disableClickPropagation(actionNode);
      DomEvent.on(actionNode, 'click', DomEvent.stop);

      action._node = actionNode;

      if (!button.disabled) {
        if (action.onClick) {
          const actionClick = (e) => {
            // is needed to prevent scrolling when clicking on a-element with href="a"
            e.preventDefault();
            let btnName = '';
            const { buttons } = this._map.pm.Toolbar;
            for (const btn in buttons) {
              if (buttons[btn]._button === button) {
                btnName = btn;
                break;
              }
            }
            this._fireActionClick(action, btnName, button);
          };

          DomEvent.addListener(actionNode, 'click', actionClick, this);
          DomEvent.addListener(actionNode, 'click', action.onClick, this);
          DomEvent.addListener(actionNode, 'click', () =>
            this._updateActiveAction(button)
          );
        }
      }
      return action;
    });
    this._updateActiveAction(button);

    if (button.toggleStatus) {
      buttonContainer.classList.add('active');
    }

    const image = DomUtil.create('div', 'control-icon', newButton);

    if (button.iconUrl) {
      image.setAttribute('src', button.iconUrl);
    }
    if (button.className) {
      image.classList.add(button.className);
    }

    DomEvent.disableClickPropagation(newButton);
    DomEvent.on(newButton, 'click', DomEvent.stop);

    if (!button.disabled) {
      // before the actual click, trigger a click on currently toggled buttons to
      // untoggle them and their functionality
      DomEvent.addListener(newButton, 'click', this._onBtnClick, this);
      DomEvent.addListener(newButton, 'click', this._triggerClick, this);
    }

    if (button.disabled) {
      newButton.classList.add('pm-disabled');
      newButton.setAttribute('aria-disabled', 'true');
    }

    return buttonContainer;
  },

  _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus || this._button.cssToggle === false) {
      this.buttonsDomNode.classList.remove('active');
      this.buttonsDomNode.classList.remove('activeChild');
    } else {
      this.buttonsDomNode.classList.add('active');
      this.buttonsDomNode.classList.add('activeChild');
    }
  },

  _onBtnClick() {
    if (this._button.disabled) {
      return;
    }
    if (this._button.disableOtherButtons) {
      this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
    }
    let btnName = '';
    const { buttons } = this._map.pm.Toolbar;
    for (const btn in buttons) {
      if (buttons[btn]._button === this._button) {
        btnName = btn;
        break;
      }
    }
    this._fireButtonClick(btnName, this._button);
  },

  _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  },

  _updateDisabled() {
    if (!this._container) {
      return;
    }

    const className = 'pm-disabled';
    const button = this.buttonsDomNode.children[0];

    if (this._button.disabled) {
      button.classList.add(className);
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.classList.remove(className);
      button.setAttribute('aria-disabled', 'false');
    }
  },
  _updateActiveAction(button) {
    button._preparedActions?.forEach((action) => {
      if (action?._node) {
        if (action.isActive && action.isActive.call(this)) {
          action._node.classList.add('active-action');
        } else {
          action._node.classList.remove('active-action');
        }
      }
    });
  },
});

export default PMButton;
