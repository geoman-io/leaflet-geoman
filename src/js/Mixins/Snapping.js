const SnapMixin = {
    _initSnappableMarkers() {
        this.options.snapDistance = this.options.snapDistance || 30;

        this._markers.forEach((marker) => {
            marker.off('drag', this._handleSnapping, this);
            marker.on('drag', this._handleSnapping, this);

            marker.off('dragend', this._cleanupSnapping, this);
            marker.on('dragend', this._cleanupSnapping, this);
        });


        this._layer.off('pm:dragstart', this._unsnap, this);
        this._layer.on('pm:dragstart', this._unsnap, this);
    },

    _unsnap() {
        // delete the last snap
        delete this._snapLatLng;
    },
    _cleanupSnapping() {
        // delete it, we need to refresh this with each start of a drag because
        // meanwhile, new layers could've been added to the map
        delete this._snapList;

        this.debugIndicatorLines.forEach((line) => {
            line.remove();
        });
    },
    _handleSnapping(e) {
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

        const marker = e.target;

        // get the closest layer, it's closest latlng, segment and the distance
        const closestLayer = this._calcClosestLayer(marker.getLatLng(), this._snapList);

        // find the final latlng that we want to snap to
        const snapLatLng = this._checkPrioritiySnapping(closestLayer);

        // minimal distance before marker snaps (in pixels)
        const minDistance = this.options.snapDistance;

        // event info for pm:snap and pm:unsnap
        const eventInfo = {
            marker,
            snapLatLng,
            segment: closestLayer.segment,
            layer: this._layer,
            layerInteractedWith: closestLayer.layer, // for lack of a better property name
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
                this._layer.fire('pm:snap', eventInfo);
            }
        } else if(this._snapLatLng) {
            // no more snapping

            // if it was previously snapped...
            // ...unsnap
            this._unsnap(eventInfo);

            // and fire unsnap event
            eventInfo.marker.fire('pm:unsnap', eventInfo);
            this._layer.fire('pm:unsnap', eventInfo);
        }

        return true;
    },

    // we got the point we want to snap to (C), but we need to check if a coord of the polygon
    // receives priority over C as the snapping point. Let's check this here
    _checkPrioritiySnapping(closestLayer) {
        const map = this._layer._map;

        // A and B are the points of the closest segment to P (the marker position we want to snap)
        const A = closestLayer.segment[0];
        const B = closestLayer.segment[1];

        // C is the point we would snap to on the segment.
        // The closest point on the closest segment of the closest polygon to P. That's right.
        const C = closestLayer.latlng;

        // distances from A to C and B to C to check which one is closer to C
        const distanceAC = this._getDistance(map, A, C);
        const distanceBC = this._getDistance(map, B, C);

        // closest latlng of A and B to C
        const closestVertexLatLng = distanceAC < distanceBC ? A : B;

        // distance between closestVertexLatLng and C
        const shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC;

        // the distance that needs to be undercut to trigger priority
        const priorityDistance = this.options.snapDistance;

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

    _createSnapList() {
        let layers = [];
        const debugIndicatorLines = [];

        // find all layers that are or inherit from Polylines...
        this._layer._map.eachLayer((layer) => {
            if(layer instanceof L.Polyline) {
                layers.push(layer);

                // this is for debugging
                const debugLine = L.polyline([], { color: 'red' });
                debugIndicatorLines.push(debugLine);

                // uncomment 👇 this in to show debugging lines
                // debugLine.addTo(this._layer._map);
            }
        });

        // ...except myself
        layers = layers.filter(layer => this._layer !== layer);

        this._snapList = layers;
        this.debugIndicatorLines = debugIndicatorLines;
    },
    _calcClosestLayer(latlng, layers) {
        // the closest polygon to our dragged marker latlng
        let closestLayer = {};

        // loop through the layers
        layers.forEach((layer, index) => {
            // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
            const results = this._calcLayerDistances(latlng, layer);

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

    _calcLayerDistances(latlng, layer) {
        const map = this._layer._map;

        // the point P which we want to snap (probpably the marker that is dragged)
        const P = latlng;

        // the coords of the layer
        const coords = layer.getLatLngs()[0];

        // the closest segment (line between two points) of the layer
        let closestSegment;

        // the shortest distance from P to closestSegment
        let shortestDistance;

        // loop through the coords of the layer
        coords.forEach((coord, index) => {
            // take this coord (A)...
            const A = coord;

            // and the next coord (B) as points
            const nextIndex = index + 1 === coords.length ? 0 : index + 1;
            const B = coords[nextIndex];

            // calc the distance between P and AB-segment
            const distance = this._getDistanceToSegment(map, P, A, B);

            // is the distance shorter than the previous one? Save it and the segment
            if(shortestDistance === undefined || distance < shortestDistance) {
                shortestDistance = distance;
                closestSegment = [A, B];
            }
        });

        // now, take the closest segment (closestSegment) and calc the closest point to P on it.
        const C = this._getClosestPointOnSegment(map, latlng, closestSegment[0], closestSegment[1]);

        // return the latlng of that sucker
        return {
            latlng: C,
            segment: closestSegment,
            distance: shortestDistance,
        };
    },

    _getClosestPointOnSegment(map, latlng, latlngA, latlngB) {
        let maxzoom = map.getMaxZoom();
        if (maxzoom === Infinity) {
            maxzoom = map.getZoom();
        }
        const P = map.project(latlng, maxzoom);
        const A = map.project(latlngA, maxzoom);
        const B = map.project(latlngB, maxzoom);
        const closest = L.LineUtil.closestPointOnSegment(P, A, B);
        return map.unproject(closest, maxzoom);
    },
    _getDistanceToSegment(map, latlng, latlngA, latlngB) {
        const P = map.latLngToLayerPoint(latlng);
        const A = map.latLngToLayerPoint(latlngA);
        const B = map.latLngToLayerPoint(latlngB);
        return L.LineUtil.pointToSegmentDistance(P, A, B);
    },
    _getDistance(map, latlngA, latlngB) {
        return map.latLngToLayerPoint(latlngA).distanceTo(map.latLngToLayerPoint(latlngB));
    },
};
