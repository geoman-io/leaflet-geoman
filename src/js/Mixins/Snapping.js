var SnapMixin = {
    _initSnappableMarkers: function() {



        this._markers.forEach((marker) => {
            marker.on('movestart', this._createSnapList, this);
            marker.on('move', this._handleSnapping, this);
        });

    },
    _handleSnapping: function(e) {
        this._getClosestLayer(e.target.getLatLng(), this._snapList);
    },
    _createSnapList: function() {

        let layers = [];

        // find all layers that are or inherit from Polylines
        this._poly._map.eachLayer(function(layer) {
            if(layer instanceof L.Polyline) {
                layers.push(layer);
            }
        });

        // except myself
        layers = layers.filter((layer) => {
            return this._poly !== layer
        });

        this._snapList = layers;
    },
    _getClosestLayer: function(latlng, layers) {

        layers.forEach((layer) => {
            this._getClosestLayerPoint(latlng, layer);
        })

    },
    _getClosestLayerPoint: function(latlng, layer) {

        let P = this._poly._map.latLngToLayerPoint(latlng);
        let coords = layer.getLatLngs()[0];

        let shortestDistance;

        let closestSegment;

        coords.forEach((point, index) => {
            let nextIndex = index + 1 === coords.length ? 0 : index + 1;
            let A = this._poly._map.latLngToLayerPoint(point);
            let B = this._poly._map.latLngToLayerPoint(coords[nextIndex]);

            let distance = L.LineUtil.pointToSegmentDistance(P, A, B);

            if(!shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];
            }

            if(distance < shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];
            }

        });

        let closestPoint = L.LineUtil.closestPointOnSegment(latlng, closestSegment[0], closestSegment[1]);

        console.log(closestPoint);

    }
}
