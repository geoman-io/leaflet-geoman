L.PM.Toolbar = L.Class.extend({
    options: {
        drawPolygon: true,
        editPolygon: false,
        dragPolygon: false,
        deleteLayer: true
    },
    initialize(map) {
        this.map = map;

        this.buttons = {};
        this.container = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-bar leaflet-control');
        this._defineButtons();
    },
    getButtons: function() {
        return this.buttons;
    },

    addControls: function(options = this.options) {
        // adds all buttons to the map specified inside options

        // first set the options
        L.Util.setOptions(this, options)

        // now show the specified buttons
        this._showHideButtons();
    },
    _addButton: function(name, button) {
        this.buttons[name] = button;
        this.options[name] = this.options[name] || false;

        return this.buttons[name];
    },
    triggerClickOnToggledButtons: function(exceptThisButton) {
        // this function is used when - e.g. drawing mode is enabled and a possible
        // other active mode (like removal tool) is already active.
        // we can't have two active modes because of possible event conflicts
        // so, we trigger a click on all currently active (toggled) buttons
        for (var name in this.buttons) {
            if(this.buttons[name] !== exceptThisButton && this.buttons[name].toggled()) {
                this.buttons[name]._triggerClick();
            }
        }
    },
    toggleButton: function(name, status) {
        // does not fire the events/functionality of the button
        // this just changes the state and is used if a functionality (like Draw)
        // is enabled manually via script

        // as some mode got enabled, we still have to trigger the click on the other buttons
        // to disable their mode
        this.triggerClickOnToggledButtons(this.buttons[name]);

        // now toggle the state of the button
        return this.buttons[name].toggle(status);


    },
    _defineButtons: function() {

        // some buttons are still in their respective classes, like L.PM.Draw.Poly
        var deleteButton = {
            'className': 'icon-delete',
            'onClick': (e) => {

            },
            'afterClick': (e) => {
                this.map.pm.toggleRemoval(this.buttons.deleteLayer.toggled());
            },
            'doToggle': true,
            'toggleStatus': false,
            'disableOtherButtons': true
        };

        var drawPolyButton = {
             'className': 'icon-polygon',
             'onClick': (e) => {

             },
             'afterClick': (e) => {
                 // toggle drawing mode
                 this.map.pm.Draw.Poly.toggle();
             },
             'doToggle': true,
             'toggleStatus': false,
             'disableOtherButtons': true
        };

        var editButton = {
             'className': 'icon-edit',
             'onClick': (e) => {
             },
             'afterClick': (e) => {

             },
             'doToggle': true,
             'toggleStatus': false,
             'disableOtherButtons': true
        };

        var dragButton = {
             'className': 'icon-drag',
             'onClick': (e) => {
             },
             'afterClick': (e) => {

             },
             'doToggle': true,
             'toggleStatus': false,
             'disableOtherButtons': true
        };

        this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));
        this._addButton('editPolygon', new L.Control.PMButton(editButton));
        this._addButton('dragPolygon', new L.Control.PMButton(dragButton));
        this._addButton('deleteLayer', new L.Control.PMButton(deleteButton));

    },
    _showHideButtons: function() {
        // loop through all buttons
        var buttons = this.getButtons();

        for (var btn in buttons) {
            if(this.options[btn]) {
                // if options say the button should be visible, add it to the map
                buttons[btn].addTo(this.map);
            } else {
                // if not, remove it
                buttons[btn].remove();
            }
        }
    }
});
