L.Control.PMButton = L.Control.extend({
    options: {
        position: 'topleft'
    },
    // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
    initialize: function (options) {
        this._button = {};
        this._button = this.setButton(options);
    },

    onAdd: function (map) {

        this._map = map;

        this._container = this._map.pm.Toolbar.container;
        this.buttonsDomNode = this._makeButton(this._button);
        this._container.appendChild(this.buttonsDomNode)

        return this._container;
    },

    onRemove: function (map) {
    },

    setButton: function (options) {
        var button = {
            'className': options.className,
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'afterClick': options.afterClick,
            'doToggle': options.doToggle,
            'toggleStatus': options.toggleStatus,
            'disableOtherButtons': options.disableOtherButtons
        };

        return button;
    },

    getText: function () {
        return this._button.text;
    },

    getIconUrl: function () {
        return this._button.iconUrl;
    },

    destroy: function () {
        this._button = {};
        this._update();
    },

    toggle: function (e) {
        if(typeof e === 'boolean'){
            this._button.toggleStatus = e;
        }
        else{
            this._button.toggleStatus = !this._button.toggleStatus;
        }
        this._applyStyleClasses();

        return this._button.toggleStatus;
    },
    toggled: function () {
        return this._button.toggleStatus;
    },
    onCreate: function() {
        this.toggle(false);
    },
    _triggerClick: function(e) {
        this._button.onClick(e);
        this._clicked(e);
        this._button.afterClick(e);
    },
    _makeButton: function(button) {

        var newButton = L.DomUtil.create('a', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus) {
            L.DomUtil.addClass(newButton,'active');
        }

        var image = L.DomUtil.create('div', 'control-icon', newButton);
        if (button.iconUrl) {
            image.setAttribute('src', button.iconUrl);
        }
        if (button.className) {
            L.DomUtil.addClass(image, button.className);
        }
        // before the actual click, trigger a click on currently toggled buttons to
        // untoggle them and their functionality
        L.DomEvent.addListener(newButton, 'click', (e) => {
            if(this._button.disableOtherButtons) {
                this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
            }
        });
        L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);

        L.DomEvent.disableClickPropagation(newButton);
        return newButton;

    },

    _applyStyleClasses: function() {

        if(!this._container) {
            return;
        }

        if(!this._button.toggleStatus) {
            L.DomUtil.removeClass(this.buttonsDomNode,'active');
        } else {
            L.DomUtil.addClass(this.buttonsDomNode,'active');
        }
    },

    _clicked: function () {

        if(this._button.doToggle){
            this.toggle();
        }
        return;
    }

});
