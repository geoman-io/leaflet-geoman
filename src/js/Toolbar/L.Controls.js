import { getTranslation } from '../helpers';
import EventMixin from '../Mixins/Events';

const PMButton = L.Control.extend({
  includes: [EventMixin],
  options: {
    position: 'topleft',
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize(options) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = { ...this.options, ...options };
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
    if (e) {
      // is needed to prevent scrolling when clicking on a-element with href="a"
      e.preventDefault();
    }
    // TODO is this a big change when we change from e to a object with the event and the button? Now it's the second argument
    this._button.onClick(e, { button: this, event: e });
    this._clicked(e);
    this._button.afterClick(e, { button: this, event: e });
  },
  _makeButton(button) {
    const pos = this.options.position.indexOf('right') > -1 ? 'pos-right' : '';

    // button container
    const buttonContainer = L.DomUtil.create(
      'div',
      `button-container  ${pos}`,
      this._container
    );

    // the button itself
    const newButton = L.DomUtil.create(
      'a',
      'leaflet-buttons-control-button',
      buttonContainer
    );
    newButton.setAttribute('role', 'button');
    newButton.setAttribute('tabindex', '0');
    newButton.href = '#';

    // the buttons actions
    const actionContainer = L.DomUtil.create(
      'div',
      `leaflet-pm-actions-container ${pos}`,
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

    activeActions.forEach((_action) => {
      const name = typeof _action === 'string' ? _action : _action.name;
      let action;
      if (actions[name]) {
        action = actions[name];
      } else if (_action.text) {
        action = _action;
      } else {
        return;
      }
      const actionNode = L.DomUtil.create(
        'a',
        `leaflet-pm-action ${pos} action-${name}`,
        actionContainer
      );
      actionNode.setAttribute('role', 'button');
      actionNode.setAttribute('tabindex', '0');
      actionNode.href = '#';

      actionNode.innerHTML = action.text;

      L.DomEvent.disableClickPropagation(actionNode);
      L.DomEvent.on(actionNode, 'click', L.DomEvent.stop);

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

          L.DomEvent.addListener(actionNode, 'click', actionClick, this);
          L.DomEvent.addListener(actionNode, 'click', action.onClick, this);
        }
      }
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

    L.DomEvent.disableClickPropagation(newButton);
    L.DomEvent.on(newButton, 'click', L.DomEvent.stop);

    if (!button.disabled) {
      // before the actual click, trigger a click on currently toggled buttons to
      // untoggle them and their functionality
      L.DomEvent.addListener(newButton, 'click', () => {
        if (this._button.disableOtherButtons) {
          this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
        }
        let btnName = '';
        const { buttons } = this._map.pm.Toolbar;
        for (const btn in buttons) {
          if (buttons[btn]._button === button) {
            btnName = btn;
            break;
          }
        }
        this._fireButtonClick(btnName, button);
      });
      L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);
    }

    if (button.disabled) {
      L.DomUtil.addClass(newButton, 'pm-disabled');
      L.DomUtil.addClass(image, 'pm-disabled');
    }

    return buttonContainer;
  },

  _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus || this._button.cssToggle === false) {
      L.DomUtil.removeClass(this.buttonsDomNode, 'active');
      L.DomUtil.removeClass(this._container, 'activeChild');
    } else {
      L.DomUtil.addClass(this.buttonsDomNode, 'active');
      L.DomUtil.addClass(this._container, 'activeChild');
    }
  },

  _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  },
});

export default PMButton;
