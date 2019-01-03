import Edit from './L.PM.Edit';
import Utils from '../L.PM.Utils';

Edit.RotatableRectangularPolygon = Edit.Poly.extend({
    // initializes Markers
    _initMarkers() {
        const map = this._map;
        const corners = this._layer.getLatLngs()[0];

        // cleanup old ones first
        if (this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        this._markerGroup._pmTempLayer = true;
        map.addLayer(this._markerGroup);

        // create markers for four corners of rectangle
        this._markers = [];
        // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed
        this._markers[0] = corners.map(this._createMarker, this);
        // convenience alias, for better readability
        this._cornerMarkers = this._markers[0];

        if (this.options.snappable) {
            this._initSnappableMarkers();
        }
    },

    // creates initial markers for coordinates
    _createMarker(latlng, index) {
        const marker = new L.Marker(latlng, {
            draggable: !this.options.preventVertexEdit,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._index = index;
        marker._pmTempLayer = true;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('pm:snap', this._adjustRectangleForMarkerSnap, this);
        if (!this.options.preventMarkerRemoval) {
            marker.on('contextmenu', this._removeMarker, this);
        }
        this._markerGroup.addLayer(marker);

        return marker;
    },

    // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
    // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
    _removeMarker() {
        // The method, it does nothing!!!
        return null;
    },

    _onMarkerDragStart(e) {
        // dragged marker
        const draggedMarker = e.target;

        // Store/update a reference to marker in opposite corner
        const corners = this._layer.getLatLngs()[0];
        draggedMarker._oppositeCornerLatLng = corners[(draggedMarker._index + 2) % 4];

        // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
        // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)
        draggedMarker._snapped = false;

        this._layer.fire('pm:markerdragstart', {
            markerEvent: e,
        });
    },

    _onMarkerDrag(e) {
        // dragged marker
        const draggedMarker = e.target;

        // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)
        if (draggedMarker._index === undefined) {
            return;
        }

        // If marker is currently snapped to an object, then ignore all drag events (as this resets rectangle shape)
        if (!draggedMarker._snapped) {
            this._adjustRectangleForMarkerMove(draggedMarker);
        }
    },

    _onMarkerDragEnd(e) {
        const corners = this._layer.getLatLngs();

        // Reposition ALL markers (so that indices are correctly correlated with corner order (NW, NE, SE, SW))
        this._adjustAllMarkers(corners[0]);

        // Clean-up data attributes
        this._cornerMarkers.forEach((m) => {
            delete m._oppositeCornerLatLng;
        });

        // Update bounding box
        this._layer.setLatLngs(corners);

        // Redraw the shape a final time
        this._layer.redraw();

        this._layer.fire('pm:markerdragend', {
            markerEvent: e,
        });

        // fire edit event
        this._fireEdit();
    },

    // adjusts the rectangle's size and bounds whenever a marker is moved
    // params: movedMarker -- the Marker object
    _adjustRectangleForMarkerMove(movedMarker) {
        // update moved marker coordinates
        L.extend(movedMarker._origLatLng, movedMarker._latlng);

        // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng
        const movedLatLng = movedMarker.getLatLng();
        const corners = this._getRotatedRectangle(movedMarker._oppositeCornerLatLng, movedLatLng, this._layer.options.angle);
        this._layer.setLatLngs(corners);

        // Reposition the markers at each corner
        this._adjustAdjacentMarkers(movedMarker);

        // Redraw the shape (to update altered rectangle)
        this._layer.redraw();
    },

    // adjusts the rectangle's size and bounds whenever a marker snaps to another polygon
    // params: e -- the snap event
    _adjustRectangleForMarkerSnap(e) {
        if (!this.options.snappable) {
            return;
        }

        const snappedMarker = e.target;
        this._adjustRectangleForMarkerMove(snappedMarker);
    },

    // adjusts the position of all Markers
    // params: markerLatLngs -- an array of exactly LatLng objects
    _adjustAllMarkers(markerLatLngs) {
        if (!markerLatLngs.length || markerLatLngs.length != 4) {
            console.error('_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates');
            return;
        }

        this._cornerMarkers.forEach((marker, index) => {
            marker.setLatLng(markerLatLngs[index]);
        });
    },

    // adjusts the position of the two Markers adjacent to the Marker specified
    // params: anchorMarker -- the Marker object used to determine adjacent Markers
    _adjustAdjacentMarkers(anchorMarker) {
        if (!anchorMarker || !anchorMarker.getLatLng || !anchorMarker._oppositeCornerLatLng) {
            console.error('_adjustAdjacentMarkers() requires a valid Marker object');
            return;
        }

        const anchorLatLng = anchorMarker.getLatLng();
        const oppositeLatLng = anchorMarker._oppositeCornerLatLng;

        // Find two corners not currently occupied by dragged marker and its opposite corner
        const corners = this._getRotatedRectangle(anchorLatLng, oppositeLatLng, this._layer.options.angle);
        const unmarkedCorners = [corners[1], corners[3]];

        // reposition markers for those corners
        let unmarkedCornerIndex = 0;
        if (unmarkedCorners.length == 2) {
            this._cornerMarkers.forEach((marker) => {
                const markerLatLng = marker.getLatLng();
                if (!markerLatLng.equals(anchorLatLng) && !markerLatLng.equals(oppositeLatLng)) {
                    marker.setLatLng(unmarkedCorners[unmarkedCornerIndex]);
                    unmarkedCornerIndex += 1;
                }
            });
        }
    },
    _getRotatedRectangle(A, B, rotation) {
        const startPoint = Utils.latLngToPoint(this._map, A);
        const endPoint = Utils.latLngToPoint(this._map, B);
        const theta = Utils.degToRad(rotation);
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const width = ((endPoint.x - startPoint.x) * cos) + ((endPoint.y - startPoint.y) * sin);
        const height = ((endPoint.y - startPoint.y) * cos) - ((endPoint.x - startPoint.x) * sin);
        const x0 = (width * cos) + startPoint.x;
        const y0 = (width * sin) + startPoint.y;
        const x1 = (-height * sin) + startPoint.x;
        const y1 = (height * cos) + startPoint.y;

        const p0 = Utils.pointToLatLng(this._map, startPoint);
        const p1 = Utils.pointToLatLng(this._map, { x: x0, y: y0 });
        const p2 = Utils.pointToLatLng(this._map, endPoint);
        const p3 = Utils.pointToLatLng(this._map, { x: x1, y: y1 });
        return [p0, p1, p2, p3];
    },
});
