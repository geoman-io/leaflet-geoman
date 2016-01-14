/**
*
* A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0
* by Sumit Kumar (@TweetsOfSumit)
* Github Repo: https://github.com/codeofsumit/leaflet.pm
*/

L.PM = L.PM || {
    initialize: function(map) {

        var initLayerGroup = function() {
            this.pm = new L.PM.LayerGroup(this);
        };
        L.LayerGroup.addInitHook(initLayerGroup);


        var initPolygon = function() {
            this.pm = new L.PM.Poly(this);
        };
        L.Polygon.addInitHook(initPolygon);


        var myButtonOptions = {
              'text': '',  // string
              'iconUrl': 'images/myButton.png',  // string
              'onClick': function() {

              },  // callback function
              'hideText': true,  // bool
              'maxWidth': 30,  // number
              'doToggle': true,  // bool
              'toggleStatus': false  // bool
        };

        var myButton = new L.Control.PMButton(myButtonOptions).addTo(map);
    }
};

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

        this._update();
        return this._container;
    },

    onRemove: function (map) {
    },

    setButton: function (options) {
        var button = {
            'text': options.text,
            'iconUrl': options.iconUrl,
            'onClick': options.onClick,
            'hideText': !!options.hideText,
            'maxWidth': options.maxWidth || 70,
            'doToggle': options.doToggle,
            'toggleStatus': false
        };

        this._button = button;
        this._update();
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
        this._update();
    },

    _update: function () {
        if (!this._map) {
            return;
        }

        this._container.innerHTML = '';
        this._makeButton(this._button);

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
            .addListener(newButton, 'click', button.onClick,this)
            .addListener(newButton, 'click', this._clicked,this);
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


L.PM.Poly = L.Class.extend({

    initialize: function(poly) {
        this._poly = poly;
        this._enabled = false;
    },

    toggleEdit: function() {
        if(!this.enabled()) {
            this.enable();
        } else {
            this.disable();
        }
    },

    enable: function() {

        if(!this.enabled()) {
            this._enabled = true;

            if(!this._markerGroup) {
                this._markerGroup = new L.LayerGroup();

                // init dragable markers
                this._initMarkers();
            }

            this._poly._map.addLayer(this._markerGroup);
        }

    },

    enabled: function() {
        return this._enabled;
    },

    disable: function() {
        this._enabled = false;
        this._poly._map.removeLayer(this._markerGroup);
    },

    _initMarkers: function() {

        this._markers = [];

        var coords = this._poly._latlngs[0];

        for(var i = 0; i < coords.length; i++) {
            var marker = this._createMarker(coords[i], i);
            this._markers.push(marker);
        }

        for(var k = 0; k < coords.length; k++) {

            var nextIndex = k+1 >= coords.length ? 0 : k+1;

            this._createMiddleMarker(
                this._markers[k], this._markers[nextIndex]
            );
        }

    },

    _createMarker: function(latlng, index) {

        var marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({className: 'marker-icon'})
        });

        marker._origLatLng = latlng;
        marker._index = index;

        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;

    },

    _createMiddleMarker: function(leftM, rightM) {
        var self = this;
        var latlng = this._calcMiddleLatLng(leftM, rightM);

        var middleMarker = this._createMarker(latlng);
        middleMarker.setOpacity(0.7);

        // save middle markers to the other markers
        leftM._middleMarkerRight = middleMarker;
        rightM._middleMarkerLeft = middleMarker;


        middleMarker.on('dragstart', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });
        middleMarker.on('click', function() {
            self._addMarker(middleMarker, leftM, rightM);
        });


    },

    _addMarker: function(newM, leftM, rightM) {

        // first, make this middlemarker a regular marker
        newM.setOpacity(1);
        newM.off('dragstart');
        newM.off('click');

        // now, create the polygon coordinate point for that marker
        var latlng = newM.getLatLng();
        var coords = this._poly._latlngs[0];
        var index = leftM._index + 1;

        coords.splice(index, 0, latlng);

        // associate polygon coordinate with marker coordinate
        newM._origLatLng = coords[index];

        // push into marker array update the indexes for every marker
        this._markers.splice(index, 0, newM);
        for(var i=0;i<this._markers.length;i++) {
            this._markers[i]._index = i;
        }

        // create the new middlemarkers
        this._createMiddleMarker(leftM, newM);
        this._createMiddleMarker(newM, rightM);


    },

    _removeMarker: function(e) {
        var marker = e.target;

        // only continue if this is NOT a middle marker (those can't be deleted)
        if(marker._index !== undefined) {

            // remove polygon coordinate from this marker
            var coords = this._poly._latlngs[0];
            var index = marker._index;

            coords.splice(index, 1);
            this._poly.redraw();

            // remove the marker and the middlemarkers next to it from the map
            this._markerGroup.removeLayer(marker._middleMarkerLeft);
            this._markerGroup.removeLayer(marker._middleMarkerRight);
            this._markerGroup.removeLayer(marker);


            // create the new middlemarker
            var leftMarkerIndex = index - 1 < 0 ? this._markers.length - 1 : index - 1;
            var rightMarkerIndex = index + 1 >= this._markers.length ? 0 : index + 1;

            var leftM = this._markers[leftMarkerIndex];
            var rightM = this._markers[rightMarkerIndex];
            this._createMiddleMarker(leftM, rightM);


            // remove the marker from the markers array
            this._markers.splice(index, 1);

            // update the remaining markers indexes
            for(var i=0;i<this._markers.length;i++) {
                this._markers[i]._index = i;
            }


            this._fireEdit();

        }


    },

    _onMarkerDrag: function(e) {

        // dragged marker
        var marker = e.target;

        // the dragged markers neighbors
        var nextMarkerIndex = marker._index + 1 >= this._markers.length ? 0 : marker._index + 1;
        var prevMarkerIndex = marker._index - 1 < 0 ? this._markers.length - 1 : marker._index - 1;

        // update marker coordinates which will update polygon coordinates
        L.extend(marker._origLatLng, marker._latlng);
        this._poly.redraw();

        // update middle markers on the left and right
        // be aware that "left" and "right" might be interchanged, depending on the geojson array
        // TODO rename "left" and "right" to "prev" and "next"
        var middleMarkerRightLatLng = this._calcMiddleLatLng(marker, this._markers[nextMarkerIndex]);
        marker._middleMarkerRight.setLatLng(middleMarkerRightLatLng);

        var middleMarkerLeftLatLng = this._calcMiddleLatLng(marker, this._markers[prevMarkerIndex]);
        marker._middleMarkerLeft.setLatLng(middleMarkerLeftLatLng);

    },

    _onMarkerDragEnd: function(e) {

        var marker = e.target;

        this._fireEdit();

    },

    _fireEdit: function () {
        this._poly.edited = true;
        this._poly.fireEvent('edit');
    },

    _calcMiddleLatLng: function(leftM, rightM) {
        var map = this._poly._map,
            p1 = map.project(leftM.getLatLng()),
            p2 = map.project(rightM.getLatLng());

        var latlng = map.unproject(p1._add(p2)._divideBy(2));

        return latlng;
    }

});


L.PM.LayerGroup = L.Class.extend({
    initialize: function(layerGroup) {
        var self = this;
        this._layerGroup = layerGroup;
        this._layers = layerGroup.getLayers();

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].on('edit', function() {
                self._layerGroup.fireEvent('edit');
            });
        }
    },
    toggleEdit: function() {

        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.toggleEdit();
        }
    },
    enable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.enable();
        }
    },
    disable: function() {
        for(var i=0; i<this._layers.length; i++) {
            this._layers[i].pm.disable();
        }
    },
    enabled: function() {

        var enabled = false;

        for(var i=0; i<this._layers.length; i++) {
            enabled = this._layers[i].pm.enabled();
            if(enabled) {
                break;
            }
        }

        return enabled;
    }
});
