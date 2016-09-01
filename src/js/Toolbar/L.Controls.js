L.Control.PMButton = L.Control.extend({
    options: {
        position: 'topleft'
    },
    initialize: function (options) {
        this._button = {};
        this.setButton(options);
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
            'toggleStatus': options.toggleStatus
        };

        this._button = button;
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
    },
    toggled: function () {
        return this._button.toggleStatus;
    },
    onCreate: function() {
        this.toggle(false);
    },
    _makeButton: function(button) {

        var newButton = L.DomUtil.create('div', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus)
            L.DomUtil.addClass(newButton,'active');

        var image = L.DomUtil.create('img', 'control-icon', newButton);
        if (button.iconUrl) {
            image.setAttribute('src', button.iconUrl);
        }
        if (button.className) {
            L.DomUtil.addClass(image, button.className);
        }

        L.DomEvent
            .addListener(newButton, 'click', button.onClick, this)
            .addListener(newButton, 'click', this._clicked, this)
            .addListener(newButton, 'click', button.afterClick, this);

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
