import type { LeafletClassFactory } from '../../types/leaflet-class';

/**
 * Button action definition
 */
export interface ButtonAction {
  name?: string;
  text: string;
  title?: string;
  onClick?: (this: IPMButton, e: Event) => void;
  isActive?: () => boolean;
  _node?: HTMLElement;
}

/**
 * Prepared action with node element
 */
interface PreparedAction extends ButtonAction {
  _node?: HTMLElement;
}

/**
 * Button options
 */
export interface ButtonOptions {
  position: string;
  disableByOtherButtons: boolean;
  tool?: string;
  toggleStatus?: boolean;
  cssToggle?: boolean;
  disabled?: boolean;
  doToggle?: boolean;
  disableOtherButtons?: boolean;
  title?: string;
  iconUrl?: string;
  className?: string;
  text?: string;
  jsClass?: string;
  actions: (string | ButtonAction)[];
  _preparedActions?: (PreparedAction | undefined)[];
  onClick: (
    e: Event | undefined,
    context: { button: IPMButton; event: Event | undefined }
  ) => void;
  afterClick: (
    e: Event | undefined,
    context: { button: IPMButton; event: Event | undefined }
  ) => void;
}

/**
 * Extended map with PM Toolbar
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      options: { oneBlock: boolean };
      editContainer: HTMLElement;
      optionsContainer: HTMLElement;
      customContainer: HTMLElement;
      drawContainer: HTMLElement;
      buttons: Record<string, IPMButton>;
      _createContainer: (position: string) => HTMLElement;
      triggerClickOnToggledButtons: (excludeButton: IPMButton) => void;
    };
    Draw: Record<
      string,
      {
        _removeLastVertex: () => void;
        _finishShape: (e?: Event) => void;
      }
    >;
  };
};

/**
 * PMButton interface
 */
export interface IPMButton {
  options: { position: string; disableByOtherButtons: boolean };
  _button: ButtonOptions;
  _map: ExtendedMap;
  _container: HTMLElement;
  buttonsDomNode: HTMLElement;

  onAdd(map: L.Map): HTMLElement;
  onRemove(): HTMLElement;
  _renderButton(): void;
  getText(): string | undefined;
  getIconUrl(): string | undefined;
  destroy(): void;
  toggle(e?: boolean | Event): boolean;
  toggled(): boolean | undefined;
  onCreate(): void;
  disable(): void;
  enable(): void;
  _triggerClick(e?: Event): void;
  _makeButton(button: ButtonOptions): HTMLElement;
  _applyStyleClasses(): void;
  _onBtnClick(): void;
  _clicked(e?: Event): void;
  remove: L.Control['remove'];
  addTo: L.Control['addTo'];
  setPosition: L.Control['setPosition'];
  _updateDisabled(): void;
  _updateActiveAction(button: ButtonOptions): void;

  // From EventMixin
  _fireButtonClick: (btnName: string, button: ButtonOptions) => void;
  _fireActionClick: (
    action: ButtonAction,
    btnName: string,
    button: ButtonOptions
  ) => void;
}
import { getTranslation } from '../helpers';
import EventMixin from '../Mixins/Events';

const PMButton = (
  L.Control as unknown as LeafletClassFactory<L.Control>
).extend<IPMButton, [Partial<ButtonOptions>], [typeof EventMixin]>({
  includes: [EventMixin],
  options: {
    position: 'topleft',
    disableByOtherButtons: true,
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize(this: IPMButton, options: Partial<ButtonOptions>) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = L.Util.extend({}, this.options, options) as ButtonOptions;
  },
  onAdd(this: IPMButton, map: L.Map) {
    this._map = map as typeof this._map;
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
  _renderButton(this: IPMButton) {
    const oldDomNode = this.buttonsDomNode;
    this.buttonsDomNode = this._makeButton(this._button);
    if (oldDomNode) {
      oldDomNode.replaceWith(this.buttonsDomNode);
    } else {
      this._container.appendChild(this.buttonsDomNode);
    }
  },
  onRemove(this: IPMButton) {
    this.buttonsDomNode.remove();

    return this._container;
  },
  getText(this: IPMButton) {
    return this._button.text;
  },
  getIconUrl(this: IPMButton) {
    return this._button.iconUrl;
  },
  destroy(this: IPMButton) {
    this._button = {} as ButtonOptions;
    this.buttonsDomNode?.remove();
  },
  toggle(this: IPMButton, e?: boolean | Event) {
    if (typeof e === 'boolean') {
      this._button.toggleStatus = e;
    } else {
      this._button.toggleStatus = !this._button.toggleStatus;
    }
    this._applyStyleClasses();
    this._updateActiveAction(this._button);

    return this._button.toggleStatus;
  },
  toggled(this: IPMButton) {
    return this._button.toggleStatus;
  },
  onCreate(this: IPMButton) {
    this.toggle(false);
  },
  disable(this: IPMButton) {
    this.toggle(false); // is needed to prevent active button disabled
    this._button.disabled = true;
    this._updateDisabled();
  },
  enable(this: IPMButton) {
    this._button.disabled = false;
    this._updateDisabled();
    this._updateActiveAction(this._button);
  },
  _triggerClick(this: IPMButton, e?: Event) {
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
  _makeButton(this: IPMButton, button: ButtonOptions) {
    const pos = this.options.position.indexOf('right') > -1 ? 'pos-right' : '';

    // button container
    const buttonContainer = L.DomUtil.create(
      'div',
      `button-container  ${pos}`,
      this._container
    );

    if (button.title) {
      buttonContainer.setAttribute('title', button.title);
    }

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

    const actions: Record<string, ButtonAction> = {
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
          this._map.pm.Draw[button.jsClass!]._removeLastVertex();
        },
      },
      finish: {
        text: getTranslation('actions.finish'),
        title: getTranslation('actions.finish'),
        onClick(e) {
          this._map.pm.Draw[button.jsClass!]._finishShape(e);
        },
      },
    };

    button._preparedActions = activeActions.map((_action) => {
      const name = typeof _action === 'string' ? _action : _action.name;
      let action: ButtonAction | undefined;
      if (actions[name!]) {
        action = actions[name!];
      } else if ((_action as Partial<ButtonAction>).text) {
        action = _action as ButtonAction;
      } else {
        return action;
      }
      const actionNode = L.DomUtil.create(
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

      L.DomEvent.disableClickPropagation(actionNode);
      L.DomEvent.on(actionNode, 'click', L.DomEvent.stop);

      action._node = actionNode;

      if (!button.disabled) {
        if (action.onClick) {
          const actionClick = (e: Event) => {
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
          L.DomEvent.addListener(actionNode, 'click', () =>
            this._updateActiveAction(button)
          );
        }
      }
      return action;
    });
    this._updateActiveAction(button);

    if (button.toggleStatus) {
      L.DomUtil.addClass(buttonContainer, 'active');
    }

    const image = L.DomUtil.create('div', 'control-icon', newButton);

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
      L.DomEvent.addListener(newButton, 'click', this._onBtnClick, this);
      L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);
    }

    if (button.disabled) {
      L.DomUtil.addClass(newButton, 'pm-disabled');
      newButton.setAttribute('aria-disabled', 'true');
    }

    return buttonContainer;
  },

  _applyStyleClasses(this: IPMButton) {
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

  _onBtnClick(this: IPMButton) {
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

  _clicked(this: IPMButton) {
    if (this._button.doToggle) {
      this.toggle();
    }
  },

  _updateDisabled(this: IPMButton) {
    if (!this._container) {
      return;
    }

    const className = 'pm-disabled';
    const button = this.buttonsDomNode.children[0] as HTMLElement;

    if (this._button.disabled) {
      L.DomUtil.addClass(button, className);
      button.setAttribute('aria-disabled', 'true');
    } else {
      L.DomUtil.removeClass(button, className);
      button.setAttribute('aria-disabled', 'false');
    }
  },
  _updateActiveAction(this: IPMButton, button: ButtonOptions) {
    button._preparedActions?.forEach((action) => {
      if (action?._node) {
        if (action.isActive && action.isActive.call(this)) {
          L.DomUtil.addClass(action._node, 'active-action');
        } else {
          L.DomUtil.removeClass(action._node, 'active-action');
        }
      }
    });
  },
});

export default PMButton;
