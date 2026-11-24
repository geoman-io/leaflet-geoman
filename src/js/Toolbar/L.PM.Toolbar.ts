import * as L from 'leaflet';
import { defineOptions } from '../helpers/classes';
import { PM } from '../PM';
import type { PM as PMTypes } from '../../../leaflet-geoman';
import type { IPMButton } from './L.Controls';

/**
 * Button action definition
 */
interface ButtonAction {
  name?: string;
  text: string;
  title?: string;
  onClick?: (e: Event) => void;
  isActive?: () => boolean;
}

/**
 * Button click context - forward declared
 */
interface ButtonClickContext {
  button: IPMButton;
  event: Event | undefined;
}

/**
 * Button options for toolbar buttons
 */
interface ToolbarButtonOptions {
  className: string;
  title: string;
  jsClass?: string;
  onClick: (e: Event | undefined, ctx: ButtonClickContext) => void;
  afterClick: (e: Event | undefined, ctx: ButtonClickContext) => void;
  doToggle: boolean;
  toggleStatus: boolean;
  disableOtherButtons: boolean;
  disableByOtherButtons?: boolean;
  position: L.ControlPosition;
  tool?: string;
  actions: (string | ButtonAction)[];
  disabled?: boolean;
  cssToggle?: boolean;
  name?: string;
  block?: string;
  toggle?: boolean;
  iconUrl?: string;
}

/**
 * PMButton interface
 */

/**
 * PMButton constructor interface
 */
interface PMButtonConstructor {
  new (options: ToolbarButtonOptions): IPMButton;
}

/**
 * Toolbar options
 */
interface ToolbarOptions {
  drawMarker: boolean;
  drawRectangle: boolean;
  drawPolyline: boolean;
  drawPolygon: boolean;
  drawCircle: boolean;
  drawCircleMarker: boolean;
  drawText: boolean;
  editMode: boolean;
  dragMode: boolean;
  cutPolygon: boolean;
  removalMode: boolean;
  rotateMode: boolean;
  snappingOption: boolean;
  drawControls: boolean;
  editControls: boolean;
  optionsControls: boolean;
  customControls: boolean;
  oneBlock: boolean;
  position: L.ControlPosition;
  positions: {
    [block: string]: L.ControlPosition | '' | undefined;
    draw?: L.ControlPosition | '';
    edit?: L.ControlPosition | '';
    options?: L.ControlPosition | '';
    custom?: L.ControlPosition | '';
  };
  // Backwards compatibility
  editPolygon?: boolean;
  deleteLayer?: boolean;
  // Dynamic button options
  [key: string]: boolean | string | object | undefined;
}

type ToolbarOptionsInput =
  | Partial<ToolbarOptions>
  | (PMTypes.ToolbarOptions & { editPolygon?: boolean; deleteLayer?: boolean });

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Draw: {
      createNewDrawInstance: (name: string, copyInstance: string) => unknown;
      [key: string]:
        | {
            toggle: (options?: object) => void;
          }
        | ((name: string, copyInstance: string) => unknown);
    };
    Toolbar: Toolbar;
    toggleGlobalEditMode: () => void;
    toggleGlobalDragMode: () => void;
    toggleGlobalRemovalMode: () => void;
    toggleGlobalRotateMode: () => void;
  };
};

/**
 * Custom control options
 */
interface CustomControlOptions {
  name: string;
  /** For @geoman-io packages: the draw tool the button's actions call. */
  unstable_jsClass?: string;
  className?: string;
  title?: string;
  onClick?: (e: Event | undefined, ctx: ButtonClickContext) => void;
  afterClick?: (e: Event | undefined, ctx: ButtonClickContext) => void;
  toggle?: boolean;
  block?: string;
  actions?: (string | ButtonAction)[];
  disabled?: boolean;
  disableOtherButtons?: boolean;
  disableByOtherButtons?: boolean;
}

// Container type for dynamic access
type ToolbarWithContainers = Toolbar & {
  [key: string]: HTMLElement | unknown;
};
import PMButton, { controlPosition } from './L.Controls';

import { getTranslation, shapeButtonNames } from '../helpers';

const optionText = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .join(' ');
  }
  return '';
};

type ButtonDefiner = (
  toolbar: Toolbar,
  add: (name: string, button: IPMButton) => void
) => void;
type ButtonFilter = (
  name: string,
  button: IPMButton,
  options: ToolbarOptions
) => boolean;
const buttonDefiners: ButtonDefiner[] = [];
const buttonFilters: ButtonFilter[] = [];

class Toolbar {
  /**
   * Adds buttons after the built-in ones each time a toolbar defines its
   * buttons: on creation and on every `reinit`, such as from `setLang`. Like
   * built-in buttons they are opt-in and keep their `changeControlOrder`
   * position. `add` throws for a name that is already taken. Toolbars created
   * before the call get the buttons on their next `reinit`. For @geoman-io
   * packages, through ./unstable.
   */
  static unstable_addButtonDefiner(definer: ButtonDefiner) {
    buttonDefiners.push(definer);
  }
  /**
   * Asked for each opted-in button each time the toolbar renders; returning
   * false leaves the button out without changing its option. For @geoman-io
   * packages, through ./unstable.
   */
  static unstable_addButtonFilter(filter: ButtonFilter) {
    buttonFilters.push(filter);
  }
  declare _definedButtons: Set<string>;
  declare options: ToolbarOptions;
  declare customButtons: IPMButton[];
  declare map: ExtendedMap;
  declare buttons: Record<string, IPMButton>;
  declare isVisible: boolean;
  declare drawContainer: HTMLElement;
  declare editContainer: HTMLElement;
  declare optionsContainer: HTMLElement;
  declare customContainer: HTMLElement;

  constructor(map: L.Map) {
    L.Util.setOptions(this, undefined as never);
    // For some reason there is an reference between multiple maps instances
    this.customButtons = [];
    this.options.positions = {
      draw: '',
      edit: '',
      options: '',
      custom: '',
    };

    this.init(map);
  }

  reinit() {
    const addControls = this.isVisible;

    this.removeControls();
    this._defineButtons();

    if (addControls) {
      this.addControls();
    }
  }
  init(map: L.Map) {
    this.map = map as typeof this.map;

    this.buttons = {};
    this._definedButtons = new Set();
    this.isVisible = false;
    this.drawContainer = L.DomUtil.create(
      'div',
      'leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control'
    );
    this.editContainer = L.DomUtil.create(
      'div',
      'leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control'
    );
    this.optionsContainer = L.DomUtil.create(
      'div',
      'leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control'
    );
    this.customContainer = L.DomUtil.create(
      'div',
      'leaflet-pm-toolbar leaflet-pm-custom leaflet-bar leaflet-control'
    );

    this._defineButtons();
  }
  _createContainer(this: ToolbarWithContainers, name: string) {
    const container = `${name}Container`;
    if (!this[container]) {
      this[container] = L.DomUtil.create(
        'div',
        `leaflet-pm-toolbar leaflet-pm-${name} leaflet-bar leaflet-control`
      );
    }
    return this[container] as HTMLElement;
  }
  getButtons() {
    return this.buttons;
  }

  addControls(options: ToolbarOptionsInput = this.options) {
    // adds all buttons to the map specified inside options

    // make button renaming backwards compatible
    if (typeof options.editPolygon !== 'undefined') {
      options.editMode = options.editPolygon;
    }
    if (typeof options.deleteLayer !== 'undefined') {
      options.removalMode = options.deleteLayer;
    }

    // first set the options
    L.Util.setOptions(this as { options?: object }, options);

    this.applyIconStyle();

    this.isVisible = true;
    // now show the specified buttons
    this._showHideButtons();
  }
  applyIconStyle() {
    const buttons = this.getButtons();

    const iconClasses: Record<string, Record<string, string>> = {
      geomanIcons: {
        drawMarker: 'control-icon leaflet-pm-icon-marker',
        drawPolyline: 'control-icon leaflet-pm-icon-polyline',
        drawRectangle: 'control-icon leaflet-pm-icon-rectangle',
        drawPolygon: 'control-icon leaflet-pm-icon-polygon',
        drawCircle: 'control-icon leaflet-pm-icon-circle',
        drawCircleMarker: 'control-icon leaflet-pm-icon-circle-marker',
        editMode: 'control-icon leaflet-pm-icon-edit',
        dragMode: 'control-icon leaflet-pm-icon-drag',
        cutPolygon: 'control-icon leaflet-pm-icon-cut',
        removalMode: 'control-icon leaflet-pm-icon-delete',
        drawText: 'control-icon leaflet-pm-icon-text',
      },
    };

    for (const name in buttons) {
      const button = buttons[name];

      L.Util.setOptions(button as { options?: object }, {
        className: iconClasses.geomanIcons[name],
      });
    }
  }
  removeControls() {
    // grab all buttons to loop through
    const buttons = this.getButtons();

    // remove all buttons
    for (const btn in buttons) {
      buttons[btn].remove();
    }

    this.isVisible = false;
  }
  deleteControl(name: string) {
    const btnName = this._btnNameMapping(name);
    if (this.buttons[btnName]) {
      this.buttons[btnName].remove();
      delete this.buttons[btnName];
    }
  }
  toggleControls(options: ToolbarOptionsInput = this.options) {
    if (this.isVisible) {
      this.removeControls();
    } else {
      this.addControls(options);
    }
  }
  _addButton(name: string, button: IPMButton) {
    this.buttons[name] = button;
    this.options[name] = !!this.options[name] || false;

    return this.buttons[name];
  }
  triggerClickOnToggledButtons(exceptThisButton?: IPMButton) {
    // this function is used when - e.g. drawing mode is enabled and a possible
    // other active mode (like removal tool) is already active.
    // we can't have two active modes because of possible event conflicts
    // so, we trigger a click on all currently active (toggled) buttons

    const exceptName = Object.keys(this.buttons).find(
      (name) => this.buttons[name] === exceptThisButton
    );
    for (const name in this.buttons) {
      const button = this.buttons[name];
      if (
        button._button.disableByOtherButtons &&
        button !== exceptThisButton &&
        button.toggled() &&
        !(exceptName && this.map.pm._modes.buttonsCombine(exceptName, name))
      ) {
        button._triggerClick();
      }
    }
  }
  toggleButton(name: string, status: boolean, disableOthers = true) {
    // does not fire the events/functionality of the button
    // this just changes the state and is used if a functionality (like Draw)
    // is enabled manually via script

    // backwards compatibility with button rename
    if (name === 'editPolygon') {
      name = 'editMode';
    }
    if (name === 'deleteLayer') {
      name = 'removalMode';
    }

    const toggleBtnName = name;

    // as some mode got enabled, we still have to trigger the click on the other buttons
    // to disable their mode
    if (disableOthers) {
      this.triggerClickOnToggledButtons(this.buttons[toggleBtnName]);
    }

    if (!this.buttons[toggleBtnName]) {
      return false;
    }
    // now toggle the state of the button
    return this.buttons[toggleBtnName].toggle(status);
  }
  _defineButtons() {
    // some buttons are still in their respective classes, like PM.Draw.Polygon
    const drawMarkerButton: ToolbarButtonOptions = {
      className: 'control-icon leaflet-pm-icon-marker',
      title: getTranslation('buttonTitles.drawMarkerButton'),
      jsClass: 'Marker',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawPolyButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.drawPolyButton'),
      className: 'control-icon leaflet-pm-icon-polygon',
      jsClass: 'Polygon',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
    };

    const drawLineButton: ToolbarButtonOptions = {
      className: 'control-icon leaflet-pm-icon-polyline',
      title: getTranslation('buttonTitles.drawLineButton'),
      jsClass: 'Line',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
    };

    const drawCircleButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.drawCircleButton'),
      className: 'control-icon leaflet-pm-icon-circle',
      jsClass: 'Circle',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawCircleMarkerButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.drawCircleMarkerButton'),
      className: 'control-icon leaflet-pm-icon-circle-marker',
      jsClass: 'CircleMarker',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawRectButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.drawRectButton'),
      className: 'control-icon leaflet-pm-icon-rectangle',
      jsClass: 'Rectangle',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const editButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.editButton'),
      className: 'control-icon leaflet-pm-icon-edit',
      onClick: () => {},
      afterClick: () => {
        this.map.pm.toggleGlobalEditMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode'],
    };

    const dragButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.dragButton'),
      className: 'control-icon leaflet-pm-icon-drag',
      onClick: () => {},
      afterClick: () => {
        this.map.pm.toggleGlobalDragMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode'],
    };

    const cutButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.cutButton'),
      className: 'control-icon leaflet-pm-icon-cut',
      jsClass: 'Cut',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // enable polygon drawing mode without snap
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle({
          snappable: true,
          cursorMarker: true,
          allowSelfIntersection: false,
        });
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finish', 'removeLastVertex', 'cancel'],
    };

    const deleteButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.deleteButton'),
      className: 'control-icon leaflet-pm-icon-delete',
      onClick: () => {},
      afterClick: () => {
        this.map.pm.toggleGlobalRemovalMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode'],
    };

    const rotateButton: ToolbarButtonOptions = {
      title: getTranslation('buttonTitles.rotateButton'),
      className: 'control-icon leaflet-pm-icon-rotate',
      onClick: () => {},
      afterClick: () => {
        this.map.pm.toggleGlobalRotateMode();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      tool: 'edit',
      actions: ['finishMode'],
    };

    const drawTextButton: ToolbarButtonOptions = {
      className: 'control-icon leaflet-pm-icon-text',
      title: getTranslation('buttonTitles.drawTextButton'),
      jsClass: 'Text',
      onClick: () => {},
      afterClick: (e, ctx) => {
        // toggle drawing mode
        (
          this.map.pm.Draw[ctx.button._button.jsClass!] as {
            toggle(options?: object): void;
          }
        ).toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    this._addButton('drawMarker', new PMButton(drawMarkerButton));
    this._addButton('drawPolyline', new PMButton(drawLineButton));
    this._addButton('drawRectangle', new PMButton(drawRectButton));
    this._addButton('drawPolygon', new PMButton(drawPolyButton));
    this._addButton('drawCircle', new PMButton(drawCircleButton));
    this._addButton('drawCircleMarker', new PMButton(drawCircleMarkerButton));
    this._addButton('drawText', new PMButton(drawTextButton));
    this._addButton('editMode', new PMButton(editButton));
    this._addButton('dragMode', new PMButton(dragButton));
    this._addButton('cutPolygon', new PMButton(cutButton));
    this._addButton('removalMode', new PMButton(deleteButton));
    this._addButton('rotateMode', new PMButton(rotateButton));

    // Names a definer added last time may be replaced; any other taken name
    // would silently drop a built-in or custom button
    const previous = this._definedButtons;
    const current = new Set<string>();
    const add = (name: string, button: IPMButton) => {
      if (current.has(name) || (this.buttons[name] && !previous.has(name))) {
        throw new TypeError(`Button ${name} already exists`);
      }
      current.add(name);
      this._addButton(name, button);
    };
    this._definedButtons = current;
    buttonDefiners.forEach((definer) => definer(this, add));
  }

  _showHideButtons() {
    // if Toolbar is not visible, we don't need to update button positions
    if (!this.isVisible) {
      return;
    }

    // remove all buttons, that's because the Toolbar can be added again with
    // different options so it's basically a reset and add again
    this.removeControls();
    // we need to set isVisible = true again, because removeControls() set it to false
    this.isVisible = true;

    const buttons = this.getButtons();
    let ignoreBtns: string[] = [];

    if (this.options.drawControls === false) {
      ignoreBtns = ignoreBtns.concat(
        Object.keys(buttons).filter((btn) => !buttons[btn]._button.tool)
      );
    }
    if (this.options.editControls === false) {
      ignoreBtns = ignoreBtns.concat(
        Object.keys(buttons).filter(
          (btn) => buttons[btn]._button.tool === 'edit'
        )
      );
    }
    if (this.options.optionsControls === false) {
      ignoreBtns = ignoreBtns.concat(
        Object.keys(buttons).filter(
          (btn) => buttons[btn]._button.tool === 'options'
        )
      );
    }
    if (this.options.customControls === false) {
      ignoreBtns = ignoreBtns.concat(
        Object.keys(buttons).filter(
          (btn) => buttons[btn]._button.tool === 'custom'
        )
      );
    }

    for (const btn in buttons) {
      if (
        this.options[btn] &&
        ignoreBtns.indexOf(btn) === -1 &&
        buttonFilters.every((filter) => filter(btn, buttons[btn], this.options))
      ) {
        // if options say the button should be visible, add it to the map
        let block = buttons[btn]._button.tool;
        if (!block) {
          // undefined is the draw block
          block = 'draw';
        }
        buttons[btn].setPosition(this._getBtnPosition(block));
        buttons[btn].addTo(this.map);
      }
    }
  }
  _getBtnPosition(block: string) {
    const configured =
      this.options.positions && this.options.positions[block]
        ? this.options.positions[block]
        : this.options.position;
    // A number or unknown corner is truthy. Leaflet then throws in `indexOf` / `appendChild`.
    return controlPosition(configured);
  }
  setBlockPosition(block: string, position: L.ControlPosition | '') {
    this.options.positions[block] = position;
    this._showHideButtons();
    this.changeControlOrder();
  }
  getBlockPositions() {
    return this.options.positions;
  }
  copyDrawControl(
    copyInstance: string,
    options: string | CustomControlOptions
  ) {
    if (!options) {
      throw new TypeError('Button has no name');
    } else if (typeof options !== 'object') {
      // if only the name is passed and no options object
      options = { name: options };
    }

    const instance = this._btnNameMapping(copyInstance);

    if (!options.name) {
      throw new TypeError('Button has no name');
    }

    if (this.buttons[options.name]) {
      throw new TypeError('Button with this name already exists');
    }
    const drawInstance = this.map.pm.Draw.createNewDrawInstance(
      options.name,
      instance
    );

    const btn = this.buttons[instance]._button;
    options = { ...btn, ...options };
    const control = this.createCustomControl(options);
    return { drawInstance, control };
  }
  createCustomControl(options: CustomControlOptions) {
    if (!options.name) {
      throw new TypeError('Button has no name');
    }

    if (this.buttons[options.name]) {
      throw new TypeError('Button with this name already exists');
    }
    if (!options.onClick) {
      options.onClick = () => {};
    }
    if (!options.afterClick) {
      options.afterClick = () => {};
    }
    if (options.toggle !== false) {
      options.toggle = true;
    }

    // A number or array is truthy. `.toLowerCase()` / `.indexOf()` then throw
    // and the custom control is never created.
    options.block = optionText(options.block).toLowerCase();
    if (!options.block || options.block === 'draw') {
      options.block = '';
    }

    options.className = optionText(options.className);
    if (!options.className) {
      options.className = 'control-icon';
    } else if (options.className.indexOf('control-icon') === -1) {
      options.className = `control-icon ${options.className}`;
    }

    const _options: ToolbarButtonOptions = {
      tool: options.block,
      className: options.className,
      title: options.title || '',
      // The draw tool the button's finish and removeLastVertex actions call.
      // Not `jsClass`: copyDrawControl spreads the original button's jsClass.
      jsClass: options.unstable_jsClass || options.name,
      onClick: options.onClick,
      afterClick: options.afterClick,
      doToggle: options.toggle,
      toggleStatus: false,
      disableOtherButtons: options.disableOtherButtons ?? true,
      disableByOtherButtons: options.disableByOtherButtons ?? true,
      cssToggle: options.toggle,
      position: this.options.position,
      actions: options.actions || [],
      disabled: !!options.disabled,
    };

    if (this.options[options.name] !== false) {
      this.options[options.name] = true;
    }

    const control = this._addButton(options.name, new PMButton(_options));
    this.changeControlOrder();
    return control;
  }
  controlExists(name: string) {
    return Boolean(this.getButton(name));
  }
  getButton(name: string) {
    return this.getButtons()[name];
  }
  getButtonsInBlock(name: string) {
    const buttonsInBlock: Record<string, IPMButton> = {};
    if (name) {
      for (const buttonName in this.getButtons()) {
        const button = this.getButtons()[buttonName];
        // draw controls doesn't have a block
        if (
          button._button.tool === name ||
          (name === 'draw' && !button._button.tool)
        ) {
          buttonsInBlock[buttonName] = button;
        }
      }
    }
    return buttonsInBlock;
  }
  changeControlOrder(order: string[] = []) {
    if (!Array.isArray(order)) {
      order = [];
    }
    const shapeMapping = this._shapeMapping();

    const _order: string[] = [];
    order.forEach((shape) => {
      if (shapeMapping[shape]) {
        _order.push(shapeMapping[shape]);
      } else {
        _order.push(shape);
      }
    });

    const buttons = this.getButtons();

    // This steps are needed to create a new Object which contains the buttons in the correct sorted order.
    const newbtnorder: Record<string, IPMButton> = {};
    _order.forEach((control) => {
      if (buttons[control]) {
        newbtnorder[control] = buttons[control];
      }
    });

    const drawBtns = Object.keys(buttons).filter(
      (btn) =>
        !buttons[btn]._button.tool || buttons[btn]._button.tool === 'draw'
    );
    drawBtns.forEach((btn) => {
      if (_order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const editBtns = Object.keys(buttons).filter(
      (btn) => buttons[btn]._button.tool === 'edit'
    );
    editBtns.forEach((btn) => {
      if (_order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const optionsBtns = Object.keys(buttons).filter(
      (btn) => buttons[btn]._button.tool === 'options'
    );
    optionsBtns.forEach((btn) => {
      if (_order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const customBtns = Object.keys(buttons).filter(
      (btn) => buttons[btn]._button.tool === 'custom'
    );
    customBtns.forEach((btn) => {
      if (_order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    // To add all other buttons they are not in a container from above (maybe added manually by a developer)
    Object.keys(buttons).forEach((btn) => {
      if (_order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });

    this.map.pm.Toolbar.buttons = newbtnorder;
    this._showHideButtons();
  }
  getControlOrder() {
    const buttons = this.getButtons();
    const order: string[] = [];
    for (const btn in buttons) {
      order.push(btn);
    }
    return order;
  }
  changeActionsOfControl(name: string, actions: (string | ButtonAction)[]) {
    const btnName = this._btnNameMapping(name);

    if (!btnName) {
      throw new TypeError('No name passed');
    }
    if (!actions) {
      throw new TypeError('No actions passed');
    }

    if (!this.buttons[btnName]) {
      throw new TypeError('Button with this name not exists');
    }
    this.buttons[btnName]._button.actions = actions;
    this.changeControlOrder();
  }
  setButtonDisabled(name: string, state: boolean) {
    const btnName = this._btnNameMapping(name);
    if (state) {
      this.buttons[btnName].disable();
    } else {
      this.buttons[btnName].enable();
    }
  }
  _shapeMapping(): Record<string, string> {
    return shapeButtonNames();
  }
  _btnNameMapping(name: string) {
    const shapeMapping = this._shapeMapping();
    return shapeMapping[name] ? shapeMapping[name] : name;
  }
}

defineOptions(Toolbar, {
  drawMarker: true,
  drawRectangle: true,
  drawPolyline: true,
  drawPolygon: true,
  drawCircle: true,
  drawCircleMarker: true,
  drawText: true,
  editMode: true,
  dragMode: true,
  cutPolygon: true,
  removalMode: true,
  rotateMode: true,
  snappingOption: true,
  drawControls: true,
  editControls: true,
  optionsControls: true,
  customControls: true,
  oneBlock: false,
  position: 'topleft',
  positions: {
    draw: '',
    edit: '',
    options: '',
    custom: '',
  },
});

export { Toolbar };
export default Toolbar;
