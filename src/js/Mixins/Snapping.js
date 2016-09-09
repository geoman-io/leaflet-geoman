var SnapMixin = {
    _initSnappableMarkers: function() {

        this.options.snapDistance = this.options.snapDistance || 30;

        this._markers.forEach((marker) => {

            marker.off('drag', this._handleSnapping, this);
            marker.on('drag', this._handleSnapping, this);

            marker.off('dragend', this._cleanupSnapping, this);
            marker.on('dragend', this._cleanupSnapping, this);
        });


        this._poly.off('pm:dragstart', this._unsnap, this);
        this._poly.on('pm:dragstart', this._unsnap, this);

    },
    _unsnap: function(e) {
        // delete the last snap
        delete this._snapLatLng;
    },
    _cleanupSnapping: function(e) {

        // delete it, we need to refresh this with each start of a drag because
        // meanwhile, new layers could've been added to the map
        delete this._snapList;

        this.debugIndicatorLines.forEach((line) => {
            line.remove();
        });
    },
    _handleSnapping: function(e) {

        // create a list of polygons that the marker could snap to
        // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
        // after dragstart/movestart so it wouldn't fire for them
        if(this._snapList === undefined) {
            this._createSnapList(e);
        }

        // if there are no layers to snap to, stop here
        if(this._snapList.length <= 0) {
            return false;
        }

        let marker = e.target;

        // get the closest layer, it's closest latlng, segment and the distance
        let closestLayer = this._calcClosestLayer(marker.getLatLng(), this._snapList);

        // find the final latlng that we want to snap to
        let snapLatLng = this._checkPrioritiySnapping(closestLayer);

        // minimal distance before marker snaps (in pixels)
        let minDistance = this.options.snapDistance;

        // event info for pm:snap and pm:unsnap
        let eventInfo = {
            marker,
            snapLatLng,
            segment: closestLayer.segment,
            layer: this._poly,
            layerInteractedWith: closestLayer.layer // for lack of a better property name
        };

        if(closestLayer.distance < minDistance) {

            // snap the marker
            marker.setLatLng(snapLatLng);
            this._onMarkerDrag(e);

            // check if the snapping position differs from the last snap
            if(this._snapLatLng !== snapLatLng) {

                // if yes, save it and fire the pm:snap event
                this._snapLatLng = snapLatLng;
                marker.fire('pm:snap', eventInfo);
                this._poly.fire('pm:snap', eventInfo);
            }

        } else {
            // no more snapping

            // if it was previously snapped...
            if(this._snapLatLng) {

                // ...unsnap
                this._unsnap(eventInfo);

                // and fire unsnap event
                eventInfo.marker.fire('pm:unsnap', eventInfo);
                this._poly.fire('pm:unsnap', eventInfo);
            }
        }
    },

    // we got the point we want to snap to (C), but we need to check if a coord of the polygon
    // receives priority over C as the snapping point. Let's check this here
    _checkPrioritiySnapping: function(closestLayer) {

        let map = this._poly._map;

        // A and B are the points of the closest segment to P (the marker position we want to snap)
        let A = closestLayer.segment[0];
        let B = closestLayer.segment[1];

        // C is the point we would snap to on the segment.
        // The closest point on the closest segment of the closest polygon to P. That's right.
        let C = closestLayer.latlng;

        // distances from A to C and B to C to check which one is closer to C
        let distanceAC = this._getDistance(map, A, C);
        let distanceBC = this._getDistance(map, B, C);

        // closest latlng of A and B to C
        let closestVertexLatLng = distanceAC < distanceBC ? A : B;

        // distance between closestVertexLatLng and C
        let shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC;

        // the distance that needs to be undercut to trigger priority
        let priorityDistance = this.options.snapDistance;

        // the latlng we ultemately want to snap to
        let snapLatlng;

        // if C is closer to the closestVertexLatLng (A or B) than the snapDistance,
        // the closestVertexLatLng has priority over C as the snapping point.
        if(shortestDistance < priorityDistance) {
            snapLatlng = closestVertexLatLng;
        } else {
            snapLatlng = closestLayer.latlng;
        }

        // return the snapping point
        return snapLatlng;

    },
    _createSnapList: function() {

        let layers = [];
        let debugIndicatorLines = [];

        // find all layers that are or inherit from Polylines...
        this._poly._map.eachLayer((layer) => {
            if(layer instanceof L.Polyline) {
                layers.push(layer);

                // this is for debugging
                let debugLine = L.polyline([], {color: 'red'});
                debugIndicatorLines.push(debugLine);

                // uncomment 👇 this in to show debugging lines
                // debugLine.addTo(this._poly._map);
            }
        });

        // ...except myself
        layers = layers.filter((layer) => this._poly !== layer);

        this._snapList = layers;
        this.debugIndicatorLines = debugIndicatorLines;
    },
    _calcClosestLayer: function(latlng, layers) {
        let map = this._poly._map;

        // the closest polygon to our dragged marker latlng
        let closestLayer = {};

        // loop through the layers
        layers.forEach((layer, index) => {

            // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
            let results = this._calcLayerDistances(latlng, layer);

            // show indicator lines, it's for debugging
            this.debugIndicatorLines[index].setLatLngs([latlng, results.latlng]);

            // save the info if it doesn't exist or if the distance is smaller than the previous one
            if(closestLayer.distance === undefined || results.distance < closestLayer.distance) {
                closestLayer = results;
                closestLayer.layer = layer;
            }

        });

        // return the closest layer and it's data
        // if there is no closest layer, return undefined
        return closestLayer;


    },
    _calcLayerDistances: function(latlng, layer) {
        let map = this._poly._map;

        // the point P which we want to snap (probpably the marker that is dragged)
        let P = latlng;

        // the coords of the layer
        let coords = layer.getLatLngs()[0];

        // the closest segment (line between two points) of the layer
        let closestSegment;

        // the shortest distance from P to closestSegment
        let shortestDistance;

        // loop through the coords of the layer
        coords.forEach((coord, index) => {
            // take this coord (A)...
            let A = coord;

            // and the next coord (B) as points
            let nextIndex = index + 1 === coords.length ? 0 : index + 1;
            let B = coords[nextIndex];

            // calc the distance between P and AB-segment
            let distance = this._getDistanceToSegment(map, P, A, B);

            // is the distance shorter than the previous one? Save it and the segment
            if(shortestDistance === undefined || distance < shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];
            }

        });

        // now, take the closest segment (closestSegment) and calc the closest point to P on it.
        let C = this._getClosestPointOnSegment(map, latlng, closestSegment[0], closestSegment[1]);

        // return the latlng of that sucker
        return {
            latlng: C,
            segment: closestSegment,
            distance: shortestDistance
        };

    },
    _getClosestPointOnSegment: function(map, latlng, latlngA, latlngB) {
        let maxzoom = map.getMaxZoom();
        if (maxzoom === Infinity) {
            maxzoom = map.getZoom();
        }
        let P = map.project(latlng, maxzoom);
        let A = map.project(latlngA, maxzoom);
        let B = map.project(latlngB, maxzoom);
        let closest = L.LineUtil.closestPointOnSegment(P, A, B);
        return map.unproject(closest, maxzoom);
    },
    _getDistanceToSegment: function (map, latlng, latlngA, latlngB) {
        let P = map.latLngToLayerPoint(latlng);
        let A = map.latLngToLayerPoint(latlngA);
        let B = map.latLngToLayerPoint(latlngB);
        return L.LineUtil.pointToSegmentDistance(P, A, B);
    },
    _getDistance: function (map, latlngA, latlngB) {
        return map.latLngToLayerPoint(latlngA).distanceTo(map.latLngToLayerPoint(latlngB));
    }
}
