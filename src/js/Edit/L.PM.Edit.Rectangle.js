// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js

import Edit from './L.PM.Edit';

Edit.Rectangle = Edit.Poly.extend({

    // initializes Rectangle Markers
    _initMarkers() {
        const map = this._map;
        const corners = this._findCorners()

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        this._markerGroup._pmTempLayer = true;
        map.addLayer(this._markerGroup);

        // create markers for four corners of rectangle
        this._markers = []
        // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed
        this._markers[0] = corners.map(this._createMarker, this);
        // convenience alias, for better readability
        this._cornerMarkers = this._markers[0]

        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },


    // creates initial markers for coordinates
    _createMarker(latlng, index) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' })
        });

        marker._origLatLng = latlng;
        marker._index = index;
        marker._pmTempLayer = true;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);
        marker.on('pm:snap', this._adjustRectangleForMarkerSnap, this);
        this._markerGroup.addLayer(marker);

        return marker;
    },

    // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
    // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
    _removeMarker(e) {
        // The method, it does nothing!!!
        return null
    },

    _onMarkerDragStart(e){
        // dragged marker
        const draggedMarker = e.target

        // Store/update a reference to marker in opposite corner
        const corners = this._findCorners()
        draggedMarker._oppositeCornerLatLng = corners[(draggedMarker._index + 2) % 4];

        // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
        // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)
        draggedMarker._snapped = false
    },

    _onMarkerDrag(e) {
        // dragged marker
        const draggedMarker = e.target;

        // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)
        if(draggedMarker._index === undefined) {
            return;
        }

        // If marker is currently snapped to an object, then ignore all drag events (as this resets rectangle shape)
        if(!draggedMarker._snapped){
            this._adjustRectangleForMarkerMove(draggedMarker)
        }
    },

    _onMarkerDragEnd(e){
        const corners = this._findCorners()

        // Reposition ALL markers (so that indices are correctly correlated with corner order (NW, NE, SE, SW))
        this._adjustAllMarkers(corners)

        // Clean-up data attributes
        this._cornerMarkers.forEach((marker) =>{
            delete marker._oppositeCornerLatLng
        })


        // Update bounding box
        this._layer.setLatLngs(corners)

        // Redraw the shape a final time
        this._layer.redraw()
    },

    // adjusts the rectangle's size and bounds whenever a marker is moved
    // params: movedMarker -- the Marker object
    _adjustRectangleForMarkerMove(movedMarker){
        // update moved marker coordinates
        L.extend(movedMarker._origLatLng, movedMarker._latlng);

        // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng
        const movedLatLng = movedMarker.getLatLng();
        this._layer.setBounds(L.latLngBounds(movedLatLng, movedMarker._oppositeCornerLatLng));

        // Reposition the markers at each corner
        this._adjustAdjacentMarkers(movedMarker)

        // Redraw the shape (to update altered rectangle)
        this._layer.redraw()
    },

    // adjusts the rectangle's size and bounds whenever a marker snaps to another polygon
    // params: e -- the snap event
    _adjustRectangleForMarkerSnap(e){
        if(!this.options.snappable){
            return
        }

        const snappedMarker = e.target        
        this._adjustRectangleForMarkerMove(snappedMarker)
    },

    // adjusts the position of all Markers
    // params: markerLatLngs -- an array of exactly LatLng objects 
    _adjustAllMarkers(markerLatLngs){
        if(!markerLatLngs.length || markerLatLngs.length != 4){
            console.error("_adjustAllMarkers() requires an array of EXACTLY 4 LatLng coordinates")
            return
        }

        this._cornerMarkers.forEach((marker, index)=>{
            marker.setLatLng(markerLatLngs[index])
        })
    },

    // adjusts the position of the two Markers adjacent to the Marker specified
    // params: anchorMarker -- the Marker object used to determine adjacent Markers
    _adjustAdjacentMarkers(anchorMarker){
        if(!anchorMarker || !anchorMarker.getLatLng || !anchorMarker._oppositeCornerLatLng){
            console.error("_adjustAdjacentMarkers() requires a valid Marker object")
            return
        }

        const anchorLatLng = anchorMarker.getLatLng()
        const oppositeLatLng = anchorMarker._oppositeCornerLatLng

        // Find two corners not currently occupied by dragged marker and its opposite corner
        let unmarkedCorners = []  
        const corners = this._findCorners()

        corners.forEach((corner) => {
            if(!corner.equals(anchorLatLng) && !corner.equals(oppositeLatLng)){
                unmarkedCorners.push(corner)
            }
        })

        // reposition markers for those corners
        let unmarkedCornerIndex = 0
        if(unmarkedCorners.length == 2){
            this._cornerMarkers.forEach((marker) =>{
                let markerLatLng = marker.getLatLng()
                if(!markerLatLng.equals(anchorLatLng) && !markerLatLng.equals(oppositeLatLng)){
                    marker.setLatLng(unmarkedCorners[unmarkedCornerIndex])
                    unmarkedCornerIndex++
                }
            })
        }
    },

    // finds the 4 corners of the current bounding box
    // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
    _findCorners(){
        var corners = this._layer.getBounds();
        
        var northwest = corners.getNorthWest();
        var northeast = corners.getNorthEast();
        var southeast = corners.getSouthEast();
        var southwest = corners.getSouthWest();

        return [northwest, northeast, southeast, southwest];        
    },    
});
