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
        var container = L.DomUtil.create('div', 'leaflet-control-button');

        this._container = container;

        this._makeButton(this._button);
        return this._container;
    },

    onRemove: function (map) {
    },

    setButton: function (options) {
        var button = {
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'afterClick': options.afterClick,
            'doToggle': options.doToggle,
            'toggleStatus': options.toggleStatus,
            'tooltip': options.tooltip
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

        newButton.setAttribute('tooltip-enabled', this._button.tooltip.enabled);
        newButton.setAttribute('tooltip-disabled', this._button.tooltip.disabled);

        var image = L.DomUtil.create('img', 'control-icon', newButton);
        image.setAttribute('src', button.iconUrl);

        L.DomEvent
            .addListener(newButton, 'click', button.onClick, this)
            .addListener(newButton, 'click', this._clicked, this)
            .addListener(newButton, 'click', button.afterClick, this);

        L.DomEvent.disableClickPropagation(newButton);
        return newButton;

    },

    _clicked: function () {

        if(this._button.doToggle){

            if(this._button.toggleStatus) {
                L.DomUtil.removeClass(this._container.childNodes[0],'active');
            }
            else {
                L.DomUtil.addClass(this._container.childNodes[0],'active');
            }
            this.toggle();
        }
        return;
    }

});
