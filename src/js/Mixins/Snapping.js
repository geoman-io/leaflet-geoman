var SnapMixin = {
    _initSnappableMarkers: function() {

        console.log('init');

        this._markers.forEach((marker) => {
            marker.on('movestart', this._createSnapList, this);
            marker.on('move', this._handleSnapping, this);
            marker.on('moveend', () => {
                this.debugIndicatorLines.forEach((line) => {
                    line.remove();
                });
            });
        });

    },
    _handleSnapping: function(e) {
        this._getClosestLayer(e.target.getLatLng(), this._snapList);
    },
    _createSnapList: function() {

        let layers = [];
        let debugIndicatorLines = [];

        // find all layers that are or inherit from Polylines
        this._poly._map.eachLayer((layer) => {
            if(layer instanceof L.Polyline) {
                layers.push(layer);
                debugIndicatorLines.push(L.polyline([], {color: 'red'}).addTo(this._poly._map));
            }
        });

        // except myself
        layers = layers.filter((layer) => {
            return this._poly !== layer
        });

        this._snapList = layers;
        this.debugIndicatorLines = debugIndicatorLines;
    },
    _getClosestLayer: function(latlng, layers) {

        let closestPolygonCoords = [];

        layers.forEach((layer, index) => {
            var closestLatLng = this._getClosestLayerLatlng(latlng, layer);
            closestPolygonCoords.push(closestLatLng);
            this.debugIndicatorLines[index].setLatLngs([latlng, closestLatLng]);
        });

    },
    _getClosestLayerLatlng: function(latlng, layer) {
        let map = this._poly._map;

        // the point which we want to snap (probpably the marker that is dragged)
        let P = map.latLngToLayerPoint(latlng);

        // the coords of the layer
        let coords = layer.getLatLngs()[0];

        // temp var for the shortest distance
        let shortestDistance;

        // temp var for the shortest segment (line between two points) of the layer (polygon)
        let closestSegment;

        // loop through the coords of the layer
        coords.forEach((point, index) => {
            // take this (A) and the next (B) coord
            let nextIndex = index + 1 === coords.length ? 0 : index + 1;
            let A = map.latLngToLayerPoint(point);
            let B = map.latLngToLayerPoint(coords[nextIndex]);

            // calc the distance between P and AB-segment
            let distance = L.LineUtil.pointToSegmentDistance(P, A, B);

            // was shortestDistance set? if no, set it now
            if(!shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];
            }

            // is the distance shorter than the previous one? Save it and the segment
            if(distance < shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];

            }

        });

        // now, take the closest segment (closestSegment) and calc the closest point to P on it.
        let closestPoint = L.LineUtil.closestPointOnSegment(P, closestSegment[0], closestSegment[1]);

        // return the latlng of that sucker
        return map.layerPointToLatLng(closestPoint);

    }
}
