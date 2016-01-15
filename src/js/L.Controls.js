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
            'text': options.text,
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'afterClick': options.afterClick,
            'hideText': !!options.hideText,
            'maxWidth': options.maxWidth || 70,
            'doToggle': options.doToggle,
            'toggleStatus': false
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
    _makeButton: function (button) {

        var newButton = L.DomUtil.create('div', 'leaflet-buttons-control-button', this._container);
        if(button.toggleStatus)
            L.DomUtil.addClass(newButton,'active');

        var image = L.DomUtil.create('span', 'fa fa-stop', newButton);

        if(button.text !== ''){

            L.DomUtil.create('br','',newButton);    //there must be a better way

            var span = L.DomUtil.create('span', 'leaflet-buttons-control-text', newButton);
            var text = document.createTextNode(button.text);    //is there an L.DomUtil for this?
            span.appendChild(text);
            if(button.hideText)
                L.DomUtil.addClass(span,'leaflet-buttons-control-text-hide');
        }

        L.DomEvent
            .addListener(newButton, 'click', L.DomEvent.stop)
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
