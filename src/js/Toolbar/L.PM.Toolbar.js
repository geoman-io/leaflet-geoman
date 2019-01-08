import PMButton from './L.Controls';

L.Control.PMButton = PMButton;

const Toolbar = L.Class.extend({
    options: {
        drawMarker: true,
        drawPolygon: true,
        drawPolyline: true,
        drawCircle: true,
        drawRectangle: true,
        editMode: true,
        cutPolygon: true,
        dragPolygon: false,
        removalMode: true,
        position: 'topleft',
    },
    initialize(map) {
        this.map = map;

        this.buttons = {};
        this.isVisible = false;
        this.container = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-bar leaflet-control',
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

        this.applyIconStyle(this.options.useFontAwesome);

        // now show the specified buttons
        this._showHideButtons();
        this.isVisible = true;
    },
    applyIconStyle(fa) {
        const buttons = this.getButtons();

        const iconClasses = {
            fontawesome: {
                drawMarker: 'control-fa-icon fas fa-map-marker-alt',
                drawPolyline: 'control-fa-icon far fa-ellipsis-v',
                drawRectangle: 'control-fa-icon far fa-draw-square',
                drawPolygon: 'control-fa-icon far fa-draw-polygon',
                drawCircle: 'control-fa-icon far fa-draw-circle',
                cutPolygon: 'control-fa-icon far fa-cut',
                editMode: 'control-fa-icon fas fa-pencil-alt',
                removalMode: 'control-fa-icon far fa-trash-alt',
            },
            geomanIcons: {
                drawMarker: 'control-icon leaflet-pm-icon-marker',
                drawPolyline: 'control-icon leaflet-pm-icon-polyline',
                drawRectangle: 'control-icon leaflet-pm-icon-rectangle',
                drawPolygon: 'control-icon leaflet-pm-icon-polygon',
                drawCircle: 'control-icon leaflet-pm-icon-circle',
                cutPolygon: 'control-icon leaflet-pm-icon-cut',
                editMode: 'control-icon leaflet-pm-icon-edit',
                removalMode: 'control-icon leaflet-pm-icon-delete',
            },
        };

        for (const name in buttons) {
            const button = buttons[name];

            L.Util.setOptions(button, {
                className: fa
                    ? iconClasses.fontawesome[name]
                    : iconClasses.geomanIcons[name],
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

        for (const name in this.buttons) {
            if (
                this.buttons[name] !== exceptThisButton &&
                this.buttons[name].toggled()
            ) {
                this.buttons[name]._triggerClick();
            }
        }
    },
    toggleButton(name, status) {
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
        this.triggerClickOnToggledButtons(this.buttons[name]);

        // now toggle the state of the button
        return this.buttons[name].toggle(status);
    },
    _defineButtons() {
        // some buttons are still in their respective classes, like L.PM.Draw.Poly
        const drawMarkerButton = {
            className: 'control-icon leaflet-pm-icon-marker',
            title: 'Draw Marker',
            jsClass: 'Marker',
            onClick: () => {},
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

        const deleteButton = {
            title: 'Removal Mode',
            className: 'control-icon leaflet-pm-icon-delete',
            onClick: () => {},
            afterClick: () => {
                this.map.pm.toggleGlobalRemovalMode();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: ['cancel'],
        };

        const drawPolyButton = {
            title: 'Draw Polygon',
            className: 'control-icon leaflet-pm-icon-polygon',
            jsClass: 'Poly',
            onClick: () => {},
            afterClick: () => {
                // toggle drawing mode
                this.map.pm.Draw.Poly.toggle();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel'],
        };

        const cutButton = {
            title: 'Cut Layers',
            className: 'control-icon leaflet-pm-icon-cut',
            jsClass: 'Cut',
            onClick: () => {},
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
            actions: ['finish', 'removeLastVertex', 'cancel'],
        };

        const drawLineButton = {
            className: 'control-icon leaflet-pm-icon-polyline',
            title: 'Draw Polyline',
            jsClass: 'Line',
            onClick: () => {},
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
            title: 'Draw Circle',
            className: 'control-icon leaflet-pm-icon-circle',
            jsClass: 'Circle',
            onClick: () => {},
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

        const drawRectButton = {
            title: 'Draw Rectangle',
            className: 'control-icon leaflet-pm-icon-rectangle',
            jsClass: 'Rectangle',
            onClick: () => {},
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
            title: 'Edit Layers',
            className: 'control-icon leaflet-pm-icon-edit',
            onClick: () => {},
            afterClick: () => {
                this.map.pm.toggleGlobalEditMode();
            },
            doToggle: true,
            toggleStatus: false,
            disableOtherButtons: true,
            position: this.options.position,
            actions: ['cancel'],
        };

        this._addButton('drawMarker', new L.Control.PMButton(drawMarkerButton));
        this._addButton('drawPolyline', new L.Control.PMButton(drawLineButton));
        this._addButton(
            'drawRectangle',
            new L.Control.PMButton(drawRectButton),
        );
        this._addButton('drawPolygon', new L.Control.PMButton(drawPolyButton));
        this._addButton('drawCircle', new L.Control.PMButton(drawCircleButton));
        this._addButton('cutPolygon', new L.Control.PMButton(cutButton));
        this._addButton('editMode', new L.Control.PMButton(editButton));
        this._addButton('removalMode', new L.Control.PMButton(deleteButton));
    },

    _showHideButtons() {
        // remove all buttons, that's because the Toolbar can be added again with
        // different options so it's basically a reset and add again
        this.removeControls();

        const buttons = this.getButtons();
        for (const btn in buttons) {
            if (this.options[btn]) {
                // if options say the button should be visible, add it to the map
                buttons[btn].setPosition(this.options.position);
                buttons[btn].addTo(this.map);
            }
        }
    },
});

export default Toolbar;
