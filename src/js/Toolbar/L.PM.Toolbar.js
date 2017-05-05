/**
* The Icons used in this Toolbar are CC-BY Glyphicons - http://glyphicons.com/
*/

L.PM.Toolbar = L.Class.extend({
    options: {
        drawMarker: true,
        drawPolygon: true,
        drawPolyline: true,
        drawCircle: true,
        editPolygon: true,
        dragPolygon: false,
        deleteLayer: true,
        position: 'topleft',
    },
    initialize(map) {
        this.map = map;

        this.buttons = {};
        this.isVisible = false;
        this.container = L.DomUtil.create('div', 'leaflet-pm-toolbar leaflet-bar leaflet-control');
        this._defineButtons();
    },
    getButtons() {
        return this.buttons;
    },

    addControls(options = this.options) {
        // adds all buttons to the map specified inside options

        // first set the options
        L.Util.setOptions(this, options);

        // now show the specified buttons
        this._showHideButtons();
        this.isVisible = true;
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
    toggleControls() {
        if (this.isVisible) {
            this.removeControls();
        } else {
            this.addControls();
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

        for (const name in this.buttons) {
            if(this.buttons[name] !== exceptThisButton && this.buttons[name].toggled()) {
                this.buttons[name]._triggerClick();
            }
        }
    },
    toggleButton(name, status) {
        // does not fire the events/functionality of the button
        // this just changes the state and is used if a functionality (like Draw)
        // is enabled manually via script

        // as some mode got enabled, we still have to trigger the click on the other buttons
        // to disable their mode
        this.triggerClickOnToggledButtons(this.buttons[name]);

        // now toggle the state of the button
        return this.buttons[name].toggle(status);
    },
    _defineButtons() {
        // some buttons are still in their respective classes, like L.PM.Draw.Poly
        const deleteButton = {
            className: ' leaflet-pm-icon-delete',
            onClick: () => {

            },
            afterClick: () => {
                this.map.pm.toggleGlobalRemovalMode();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const drawPolyButton = {
            className: 'leaflet-pm-icon-polygon',
            onClick: () => {

            },
            afterClick: () => {
                // toggle drawing mode
                this.map.pm.Draw.Poly.toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const drawMarkerButton = {
            className: 'leaflet-pm-icon-marker',
            onClick: () => {

            },
            afterClick: () => {
                // toggle drawing mode
                this.map.pm.Draw.Marker.toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const drawLineButton = {
            className: 'leaflet-pm-icon-polyline',
            onClick: () => {

            },
            afterClick: () => {
                // toggle drawing mode
                this.map.pm.Draw.Line.toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const drawCircleButton = {
            className: 'leaflet-pm-icon-circle',
            onClick: () => {

            },
            afterClick: () => {
                // toggle drawing mode
                this.map.pm.Draw.Circle.toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const editButton = {
            className: 'leaflet-pm-icon-edit',
            onClick: () => {
            },
            afterClick: () => {
                this.map.pm.toggleGlobalEditMode({
                    snappable: true,
                    draggable: true,
                });
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        const dragButton = {
            className: 'leaflet-pm-icon-drag',
            onClick: () => {
            },
            afterClick: () => {

            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
        };

        this._addButton('drawMarker', new L.Control.PMButton(drawMarkerButton));
        this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));
        this._addButton('drawPolyline', new L.Control.PMButton(drawLineButton));
        this._addButton('drawCircle', new L.Control.PMButton(drawCircleButton));
        // TODO: rename editPolygon to editMode
        this._addButton('editPolygon', new L.Control.PMButton(editButton));
        this._addButton('dragPolygon', new L.Control.PMButton(dragButton));
        // TODO: rename deleteLayer to removalMode
        this._addButton('deleteLayer', new L.Control.PMButton(deleteButton));
    },

    _showHideButtons() {
        // remove all buttons, that's because the Toolbar can be added again with
        // different options so it's basically a reset and add again
        this.removeControls();

        const buttons = this.getButtons();
        for (const btn in buttons) {
            if(this.options[btn]) {
                // if options say the button should be visible, add it to the map
                buttons[btn].setPosition(this.options.position);
                buttons[btn].addTo(this.map);
            }
        }
    },
});
