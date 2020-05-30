import PMButton from './L.Controls';

import { getTranslation } from '../helpers';

L.Control.PMButton = PMButton;

const Toolbar = L.Class.extend({
  options: {
    drawMarker: true,
    drawRectangle: true,
    drawPolyline: true,
    drawPolygon: true,
    drawCircle: true,
    drawCircleMarker: true,
    editMode: true,
    dragMode: true,
    cutPolygon: true,
    removalMode: true,
    snappingOption: true,
    drawControls: true,
    editControls: true,
    optionsControls: true,
    customControls: true,
    oneBlock: false,
    position: 'topleft',
  },
  customButtons: [],
  initialize(map) {
    this.init(map);
  },
  reinit() {
    const addControls = this.isVisible;

    this.removeControls();
    this._defineButtons();

    if (addControls) {
      this.addControls();
    }
  },
  init(map) {
    this.map = map;

    this.buttons = {};
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
  },
  getButtons() {
    return this.buttons;
  },

  addControls(options = this.options) {
    // adds all buttons to the map specified inside options

    // make button renaming backwards compatible
    if (typeof options.editPolygon !== 'undefined') {
      options.editMode = options.editPolygon;
    }
    if (typeof options.deleteLayer !== 'undefined') {
      options.removalMode = options.deleteLayer;
    }

    // first set the options
    L.Util.setOptions(this, options);

    this.applyIconStyle();

    // now show the specified buttons
    this._showHideButtons();
    this.isVisible = true;
  },
  applyIconStyle() {
    const buttons = this.getButtons();

    const iconClasses = {
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
      },
    };

    for (const name in buttons) {
      const button = buttons[name];

      L.Util.setOptions(button, {
        className: iconClasses.geomanIcons[name],
      });
    }
  },
  removeControls() {
    // grab all buttons to loop through
    const buttons = this.getButtons();

    // remove all buttons
    for (const btn in buttons) {
      buttons[btn].remove();
    }

    this.isVisible = false;
  },
  toggleControls(options = this.options) {
    if (this.isVisible) {
      this.removeControls();
    } else {
      this.addControls(options);
    }
  },
  _addButton(name, button) {
    this.buttons[name] = button;
    this.options[name] = this.options[name] || false;

    return this.buttons[name];
  },
  triggerClickOnToggledButtons(exceptThisButton) {
    // this function is used when - e.g. drawing mode is enabled and a possible
    // other active mode (like removal tool) is already active.
    // we can't have two active modes because of possible event conflicts
    // so, we trigger a click on all currently active (toggled) buttons

    // the options toolbar should not be disabled during the different modes
    // TODO: probably need to abstract this a bit so different options are automatically
    // disabled for different modes, like pinning for circles
    const exceptOptionButtons = ['snappingOption']

    for (const name in this.buttons) {
      if (
        !exceptOptionButtons.includes(name) &&
        this.buttons[name] !== exceptThisButton &&
        this.buttons[name].toggled()
      ) {
        this.buttons[name]._triggerClick();
      }
    }
  },
  toggleButton(name, status, disableOthers = true) {
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

    // as some mode got enabled, we still have to trigger the click on the other buttons
    // to disable their mode
    if (disableOthers) {
      this.triggerClickOnToggledButtons(this.buttons[name]);
    }

    if(!this.buttons[name]){
      return false;
    }
    // now toggle the state of the button
    return this.buttons[name].toggle(status);
  },
  _defineButtons() {
    // some buttons are still in their respective classes, like L.PM.Draw.Polygon
    const drawMarkerButton = {
      className: 'control-icon leaflet-pm-icon-marker',
      title: getTranslation('buttonTitles.drawMarkerButton'),
      jsClass: 'Marker',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.Marker.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawPolyButton = {
      title: getTranslation('buttonTitles.drawPolyButton'),
      className: 'control-icon leaflet-pm-icon-polygon',
      jsClass: 'Polygon',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.Polygon.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
    };

    const drawLineButton = {
      className: 'control-icon leaflet-pm-icon-polyline',
      title: getTranslation('buttonTitles.drawLineButton'),
      jsClass: 'Line',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.Line.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['finish', 'removeLastVertex', 'cancel'],
    };

    const drawCircleButton = {
      title: getTranslation('buttonTitles.drawCircleButton'),
      className: 'control-icon leaflet-pm-icon-circle',
      jsClass: 'Circle',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.Circle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawCircleMarkerButton = {
      title: getTranslation('buttonTitles.drawCircleMarkerButton'),
      className: 'control-icon leaflet-pm-icon-circle-marker',
      jsClass: 'CircleMarker',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.CircleMarker.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const drawRectButton = {
      title: getTranslation('buttonTitles.drawRectButton'),
      className: 'control-icon leaflet-pm-icon-rectangle',
      jsClass: 'Rectangle',
      onClick: () => { },
      afterClick: () => {
        // toggle drawing mode
        this.map.pm.Draw.Rectangle.toggle();
      },
      doToggle: true,
      toggleStatus: false,
      disableOtherButtons: true,
      position: this.options.position,
      actions: ['cancel'],
    };

    const editButton = {
      title: getTranslation('buttonTitles.editButton'),
      className: 'control-icon leaflet-pm-icon-edit',
      onClick: () => { },
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

    const dragButton = {
      title: getTranslation('buttonTitles.dragButton'),
      className: 'control-icon leaflet-pm-icon-drag',
      onClick: () => { },
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

    const cutButton = {
      title: getTranslation('buttonTitles.cutButton'),
      className: 'control-icon leaflet-pm-icon-cut',
      jsClass: 'Cut',
      onClick: () => { },
      afterClick: () => {
        // enable polygon drawing mode without snap
        this.map.pm.Draw.Cut.toggle({
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

    const deleteButton = {
      title: getTranslation('buttonTitles.deleteButton'),
      className: 'control-icon leaflet-pm-icon-delete',
      onClick: () => { },
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

    this._addButton('drawMarker', new L.Control.PMButton(drawMarkerButton));
    this._addButton('drawPolyline', new L.Control.PMButton(drawLineButton));
    this._addButton('drawRectangle', new L.Control.PMButton(drawRectButton));
    this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));
    this._addButton('drawCircle', new L.Control.PMButton(drawCircleButton));
    this._addButton('drawCircleMarker', new L.Control.PMButton(drawCircleMarkerButton));
    this._addButton('editMode', new L.Control.PMButton(editButton));
    this._addButton('dragMode', new L.Control.PMButton(dragButton));
    this._addButton('cutPolygon', new L.Control.PMButton(cutButton));
    this._addButton('removalMode', new L.Control.PMButton(deleteButton));
  },

  _showHideButtons() {
    // remove all buttons, that's because the Toolbar can be added again with
    // different options so it's basically a reset and add again
    this.removeControls();

    const buttons = this.getButtons();
    let ignoreBtns = [];

    if(this.options.drawControls === false){
      ignoreBtns = ignoreBtns.concat(Object.keys(buttons).filter(btn => !buttons[btn]._button.tool));
    }
    if(this.options.editControls === false){
      ignoreBtns = ignoreBtns.concat(Object.keys(buttons).filter(btn => buttons[btn]._button.tool == 'edit'));
    }
    if(this.options.optionsControls === false){
      ignoreBtns = ignoreBtns.concat(Object.keys(buttons).filter(btn => buttons[btn]._button.tool == 'options'));
    }
    if(this.options.customControls === false){
      ignoreBtns = ignoreBtns.concat(Object.keys(buttons).filter(btn => buttons[btn]._button.tool == 'custom'));
    }
    for (const btn in buttons) {
      if (this.options[btn] && ignoreBtns.indexOf(btn) === -1) {
        // if options say the button should be visible, add it to the map
        buttons[btn].setPosition(this.options.position);
        buttons[btn].addTo(this.map);
      }
    }
  },

  // createCustomControl(name,tool,className,title, onClick, afterClick, actions, toggle){
  createCustomControl(options){

    if(!options.name){
      throw "Button has no name";
    }

    if(this.buttons[options.name]){
      throw "Button with this name already exists";
    }
    if(!options.onClick){
      options.onClick = () => {};
    }
    if(!options.afterClick){
      options.afterClick = () => {};
    }
    if(options.toggle !== false){
      options.toggle = true;
    }

    if(options.tool) {
      options.tool = options.tool.toLowerCase();
    }
    if (!options.tool || options.tool === "draw") {
      options.tool = "";
    }

    const _options = {
      tool: options.tool,
      className: `control-icon ${options.className}`,
      title: options.title || '',
      jsClass: options.name,
      onClick: options.onClick,
      afterClick: options.afterClick,
      doToggle: options.toggle,
      toggleStatus: false,
      disableOtherButtons: true,
      cssToggle: options.toggle,
      position: this.options.position,
      actions: options.actions || [],
    };

    if(this.options[options.name] !== false){
      this.options[options.name] = true;
    }

    this._addButton(options.name, new L.Control.PMButton(_options));
    this.changeControlOrder();
  },

  changeControlOrder(_order = []){

    const shapeMapping = {
      "Marker": "drawMarker",
      "Circle": "drawCircle",
      "Polygon": "drawPolygon",
      "Polyline": "drawPolyline",
      "Line": "drawPolyline",
      "CircleMarker": "drawCircleMarker",
      "Edit": "editMode",
      "Drag": "dragMode",
      "Cut": "cutPoylgon",
      "Removal": "removalMode"
    };

    const order = [];
    _order.forEach((shape)=>{
      if(shapeMapping[shape]){
        order.push(shapeMapping[shape]);
      }else{
        order.push(shape);
      }
    });



    const buttons = this.getButtons();

    // This steps are needed to create a new Object which contains the buttons in the correct sorted order.
    const newbtnorder = {};
    order.forEach((control)=>{
      if(buttons[control]) {
        newbtnorder[control] = buttons[control];
      }
    });

    const drawBtns = Object.keys(buttons).filter(btn => !buttons[btn]._button.tool);
    drawBtns.forEach((btn)=>{
      if(order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const editBtns = Object.keys(buttons).filter(btn => buttons[btn]._button.tool == "edit");
    editBtns.forEach((btn)=>{
      if(order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const optionsBtns = Object.keys(buttons).filter(btn => buttons[btn]._button.tool == "options");
    optionsBtns.forEach((btn)=>{
      if(order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    const customBtns = Object.keys(buttons).filter(btn => buttons[btn]._button.tool == "custom");
    customBtns.forEach((btn)=>{
      if(order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });
    // To add all other buttons they are not in a container from above (maybe added manually by a developer)
    Object.keys(buttons).forEach((btn)=>{
      if(order.indexOf(btn) === -1) {
        newbtnorder[btn] = buttons[btn];
      }
    });

    this.map.pm.Toolbar.buttons = newbtnorder;
    this._showHideButtons();
  },
  getControlOrder(){
    const buttons = this.getButtons();

    const shapeMapping = {
      "drawMarker": "Marker",
      "drawCircle": "Circle",
      "drawPolygon": "Polygon",
      "drawPolyline": "Line",
      "drawCircleMarker": "CircleMarker",
      "editMode": "Edit",
      "dragMode": "Drag",
      "cutPoylgon": "Cut",
      "removalMode": "Removal"
    };

    const order = [];
    for(const btn in buttons){
      if(shapeMapping[btn]){
        order.push(shapeMapping[btn])
      }else{
        order.push(btn);
      }
    }
    return order;
  }
});

export default Toolbar;
