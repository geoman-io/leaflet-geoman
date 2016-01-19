L.PM.Draw.Poly = L.Class.extend({

    initialize: function(map) {
        this._map = map;


    },

    enable: function() {

        this._layerGroup = new L.LayerGroup();
        this._layerGroup.addTo(this._map);

        this._polyline = L.polyline([], {color: 'red'});
        this._layerGroup.addLayer(this._polyline);

        this._map._container.style.cursor = 'crosshair';

        this._map.on('click', this._createPolygonPoint, this);

    },
    disable: function() {

        this._map._container.style.cursor = 'default';

        this._map.off('click', this._createPolygonPoint);

        this._map.removeLayer(this._layerGroup);

    },
    _createPolygonPoint: function(e) {

        // is this the first point?
        var first = this._polyline.getLatLngs().length === 0 ? true : false;

        this._polyline.addLatLng(e.latlng);
        this._createMarker(e.latlng, first);

    },
    _finishPolygon: function() {

        var coords = this._polyline.getLatLngs();
        var polygonLayer = L.polygon(coords).addTo(this._map);

        polygonLayer.pm.toggleEdit();

        this.disable();

        this._map.fireEvent('pm:create', polygonLayer);
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
