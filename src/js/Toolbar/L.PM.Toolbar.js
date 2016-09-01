L.PM.Toolbar = L.Class.extend({
    options: {
        drawPolygon: true,
        editPolygon: true,
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
    toggleButton: function(name, status) {
        this.buttons[name].toggle(status);
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
            'toggleStatus': false
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
             'toggleStatus': false
        };

        var editButton = {
             'className': 'icon-edit',
             'onClick': (e) => {
             },
             'afterClick': (e) => {

             },
             'doToggle': true,
             'toggleStatus': false
        };

        this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));
        this._addButton('editPolygon', new L.Control.PMButton(editButton));
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
