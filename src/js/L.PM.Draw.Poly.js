L.PM.Draw.Poly = L.PM.Draw.extend({

    initialize: function(map) {
        this._map = map;
        this._shape = 'Poly';
    },
    enable: function(options) {
        // enable draw mode

        this._enabled = true;

        // create a new layergroup
        this._layerGroup = new L.LayerGroup();
        this._layerGroup.addTo(this._map);

        // this is the polyLine that'll make up the polygon
        this._polyline = L.polyline([], {color: 'red'});
        this._layerGroup.addLayer(this._polyline);

        // this is the hintline from the mouse cursor to the last marker
        this._hintline = L.polyline([], {
            color: 'red',
            dashArray: [5, 5]
        });
        this._layerGroup.addLayer(this._hintline);


        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._createPolygonPoint, this);

        // sync the hintline on mousemove
        this._map.on('mousemove', this._syncHintLine, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', {shape: this._shape});

    },
    disable: function() {
        // disable draw mode

        // cancel, if drawing mode isn't even enabled
        if(!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._createPolygonPoint);
        this._map.off('mousemove', this._syncHintLine);

        // remove layer
        this._map.removeLayer(this._layerGroup);

        // fire drawend event
        this._map.fire('pm:drawend', {shape: this._shape});

    },
    enabled: function() {
        return this._enabled;
    },
    toggle: function() {

        if(this.enabled()) {
            this.disable();
        } else {
            this.enable();
        }

    },
    addButton: function(map) {

        var self = this;

        var drawPolyButton = {
              'iconUrl': 'assets/icons/polygon.png',
              'onClick': function() {

              },
              'afterClick': function(e) {
                  self.toggle();
              },
              'doToggle': true,
              'toggleStatus': false
        };

        this._drawButton = new L.Control.PMButton(drawPolyButton).addTo(this._map);

        this._map.on('pm:drawstart', function(e) {
            if(e.shape === self._shape && !self._drawButton.toggled()) {
                self._drawButton._clicked();
            }
        });

        this._map.on('pm:drawend', function(e) {
            if(e.shape === self._shape && self._drawButton.toggled()) {
                self._drawButton._clicked();
            }
        });

        return this._drawButton;

    },
    _syncHintLine: function(e) {

        var polyPoints = this._polyline.getLatLngs();

        if(polyPoints.length > 0) {
            var lastPolygonPoint = polyPoints[polyPoints.length - 1];
            this._hintline.setLatLngs([lastPolygonPoint, e.latlng]);
        }



    },
    _createPolygonPoint: function(e) {

        // is this the first point?
        var first = this._polyline.getLatLngs().length === 0 ? true : false;

        this._polyline.addLatLng(e.latlng);
        this._createMarker(e.latlng, first);


        this._hintline.setLatLngs([e.latlng, e.latlng]);

    },
    _finishPolygon: function() {

        var coords = this._polyline.getLatLngs();
        var polygonLayer = L.polygon(coords).addTo(this._map);

        polygonLayer.pm.toggleEdit();

        this.disable();

        this._map.fire('pm:create', {
            shape: this._shape,
            layer: polygonLayer
        });
    },
    _createMarker: function(latlng, first) {

        var marker = new L.Marker(latlng, {
            draggable: false,
            icon: L.divIcon({className: 'marker-icon'})
        });

        this._layerGroup.addLayer(marker);

        if(first) {
            marker.on('click', this._finishPolygon, this);
        }

        return marker;

    },
});
