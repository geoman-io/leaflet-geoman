const SnapMixin = {
    _initSnappableMarkers() {
        this.options.snapDistance = this.options.snapDistance || 30;

        if (this.isPolygon()) {
            // coords is a multidimansional array, handle all rings
            this._markers.map(this._assignEvents, this);
        } else {
            // coords is one dimensional, handle the ring
            this._assignEvents(this._markers);
        }

        this._layer.off('pm:dragstart', this._unsnap, this);
        this._layer.on('pm:dragstart', this._unsnap, this);
    },
    _assignEvents(markerArr) {
        // loop through marker array and assign events to the markers
        markerArr.forEach((marker) => {
            marker.off('drag', this._handleSnapping, this);
            marker.on('drag', this._handleSnapping, this);

            marker.off('dragend', this._cleanupSnapping, this);
            marker.on('dragend', this._cleanupSnapping, this);
        });
    },
    _unsnap() {
        // delete the last snap
        delete this._snapLatLng;
    },
    _cleanupSnapping() {
        // delete it, we need to refresh this with each start of a drag because
        // meanwhile, new layers could've been added to the map
        delete this._snapList;

        // remove map event
        this._map.off('pm:remove', this._handleSnapLayerRemoval, this);

        if (this.debugIndicatorLines) {
            this.debugIndicatorLines.forEach((line) => {
                line.remove();
            });
        }
    },
    _handleSnapLayerRemoval({ layer }) {
        // find the layers index in snaplist
        const index = this._snapList.findIndex(e => e._leaflet_id === layer._leaflet_id);
        // remove it from the snaplist
        this._snapList.splice(index, 1);
    },
    _handleSnapping(e) {
        // if snapping is disabled via holding ALT during drag, stop right here
        if (e.originalEvent.altKey) {
            return false;
        }

        // create a list of polygons that the marker could snap to
        // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
        // after dragstart/movestart so it wouldn't fire for them
        if (this._snapList === undefined) {
            this._createSnapList(e);
        }

        // if there are no layers to snap to, stop here
        if (this._snapList.length <= 0) {
            return false;
        }

        const marker = e.target;

        // get the closest layer, it's closest latlng, segment and the distance
        const closestLayer = this._calcClosestLayer(marker.getLatLng(), this._snapList);

        const isMarker = closestLayer.layer instanceof L.Marker || closestLayer.layer instanceof L.CircleMarker;

        // find the final latlng that we want to snap to
        let snapLatLng;
        if (!isMarker) {
            snapLatLng = this._checkPrioritiySnapping(closestLayer);
        } else {
            snapLatLng = closestLayer.latlng;
        }

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

        if (closestLayer.distance < minDistance) {
            // snap the marker
            marker.setLatLng(snapLatLng);

            marker._snapped = true;

            const triggerSnap = () => {
                this._snapLatLng = snapLatLng;
                marker.fire('pm:snap', eventInfo);
                this._layer.fire('pm:snap', eventInfo);
            };

            // check if the snapping position differs from the last snap
            // Thanks Max & car2go Team
            const a = this._snapLatLng || {};
            const b = snapLatLng || {};

            if (a.lat !== b.lat || a.lng !== b.lng) {
                triggerSnap();
            }
        } else if (this._snapLatLng) {
            // no more snapping

            // if it was previously snapped...
            // ...unsnap
            this._unsnap(eventInfo);

            marker._snapped = false;

            // and fire unsnap event
            eventInfo.marker.fire('pm:unsnap', eventInfo);
            this._layer.fire('pm:unsnap', eventInfo);
        }

        return true;
    },

    // we got the point we want to snap to (C), but we need to check if a coord of the polygon
    // receives priority over C as the snapping point. Let's check this here
    _checkPrioritiySnapping(closestLayer) {
        const map = this._map;

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
        if (shortestDistance < priorityDistance) {
            snapLatlng = closestVertexLatLng;
        } else {
            snapLatlng = C;
        }

        // return the copy of snapping point
        return Object.assign({}, snapLatlng);
    },

    _createSnapList() {
        let layers = [];
        const debugIndicatorLines = [];
        const map = this._map;

        // find all layers that are or inherit from Polylines... and markers that are not
        // temporary markers of polygon-edits
        map.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.CircleMarker) {
                layers.push(layer);

                map.off('pm:remove', this._handleSnapLayerRemoval, this);
                map.on('pm:remove', this._handleSnapLayerRemoval, this);

                // this is for debugging
                const debugLine = L.polyline([], { color: 'red', pmIgnore: true });
                debugIndicatorLines.push(debugLine);

                // uncomment 👇 this line to show helper lines for debugging
                // debugLine.addTo(map);
            }
        });

        // ...except myself
        layers = layers.filter(layer => this._layer !== layer);

        // also remove everything that has no coordinates yet
        layers = layers.filter(layer => layer._latlng || (layer._latlngs && layer._latlngs.length > 0));

        // finally remove everything that's leaflet.pm specific temporary stuff
        layers = layers.filter(layer => !layer._pmTempLayer);

        // save snaplist from layers and the other snap layers added from other classes/scripts
        if (this._otherSnapLayers) {
            this._snapList = layers.concat(this._otherSnapLayers);
        } else {
            this._snapList = layers;
        }

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
            if (closestLayer.distance === undefined || results.distance < closestLayer.distance) {
                closestLayer = results;
                closestLayer.layer = layer;
            }
        });

        // return the closest layer and it's data
        // if there is no closest layer, return undefined
        return closestLayer;
    },

    _calcLayerDistances(latlng, layer) {
        const map = this._map;

        // is this a polyline, marker or polygon?
        const isPolygon = layer instanceof L.Polygon;
        const isPolyline = !(layer instanceof L.Polygon) && layer instanceof L.Polyline;
        const isMarker = layer instanceof L.Marker || layer instanceof L.CircleMarker;

        // the point P which we want to snap (probpably the marker that is dragged)
        const P = latlng;

        let coords;

        // the coords of the layer
        if (isPolygon) {
            // polygon
            coords = layer.getLatLngs()[0];
        } else if (isPolyline) {
            // polyline
            coords = layer.getLatLngs();
        } else if (isMarker) {
            // marker
            coords = layer.getLatLng();

            // return the info for the marker, no more calculations needed
            return {
                latlng: Object.assign({}, coords),
                distance: this._getDistance(map, coords, P),
            };
        }

        // the closest segment (line between two points) of the layer
        let closestSegment;

        // the shortest distance from P to closestSegment
        let shortestDistance;

        // loop through the coords of the layer
        coords.forEach((coord, index) => {
            // take this coord (A)...
            const A = coord;
            let nextIndex;

            // and the next coord (B) as points
            if (isPolygon) {
                nextIndex = index + 1 === coords.length ? 0 : index + 1;
            } else {
                nextIndex = index + 1 === coords.length ? undefined : index + 1;
            }

            const B = coords[nextIndex];

            if (B) {
                // calc the distance between P and AB-segment
                const distance = this._getDistanceToSegment(map, P, A, B);

                // is the distance shorter than the previous one? Save it and the segment
                if (shortestDistance === undefined || distance < shortestDistance) {
                    shortestDistance = distance;
                    closestSegment = [A, B];
                }
            }

            return true;
        });

        // now, take the closest segment (closestSegment) and calc the closest point to P on it.
        const C = this._getClosestPointOnSegment(map, latlng, closestSegment[0], closestSegment[1]);

        // return the latlng of that sucker
        return {
            latlng: Object.assign({}, C),
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

export default SnapMixin;
