// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js

import Edit from './L.PM.Edit';

Edit.Rectangle = Edit.Poly.extend({

    _initMarkers() {
        const map = this._map;

        // cleanup old ones first
        if(this._markerGroup) {
            this._markerGroup.clearLayers();
        }

        // add markerGroup to map, markerGroup includes regular and middle markers
        this._markerGroup = new L.LayerGroup();
        map.addLayer(this._markerGroup);

        // create markers for four corners of rectangle
        const corners = this._findCorners()
        this._markers = corners.map(this._createMarker, this);

        if(this.options.snappable) {
            this._initSnappableMarkers();
        }
    },


    // creates initial markers for coordinates
    _createMarker(latlng, index) {
        const marker = new L.Marker(latlng, {
            draggable: true,
            icon: L.divIcon({ className: 'marker-icon' }),
        });

        marker._origLatLng = latlng;
        marker._index = index;
        marker._pmTempLayer = true;

        marker.on('dragstart', this._onMarkerDragStart, this);
        marker.on('drag', this._onMarkerDrag, this);
        marker.on('dragend', this._onMarkerDragEnd, this);
        marker.on('contextmenu', this._removeMarker, this);

        this._markerGroup.addLayer(marker);

        return marker;
    },

    _onMarkerDragStart(e){
        // dragged marker
        const draggedMarker = e.target        

        // Store a reference to marker in opposite corner
        const corners = this._findCorners()
        draggedMarker._oppositeCornerLatLng = corners[(draggedMarker._index + 2) % 4];
    },

    _onMarkerDrag(e) {
        // dragged marker
        const draggedMarker = e.target;

        // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)
        if(draggedMarker._index === undefined) {
            return;
        }

        // update dragged marker coordinates
        L.extend(draggedMarker._origLatLng, draggedMarker._latlng);

        // update rectangle boundaries, based on dragged marker's new LatLng and cached opposite corner's LatLng
        const draggedLatLng = draggedMarker.getLatLng();
        this._layer.setBounds(L.latLngBounds(draggedLatLng, draggedMarker._oppositeCornerLatLng));

        // Reposition the markers at each corner
        this._placeCornerMarkers(draggedMarker)

        // Redraw the shape (to update dragging rectangle)
        this._layer.redraw()
    },

    _onMarkerDragEnd(e){
        // Reposition the markers at each corner
        this._placeCornerMarkers()

        // Update bounding box
        this._layer.setLatLngs(this._findCorners())

        // Redraw the shape a final time
        this._layer.redraw()
    },

    // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
    // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
    _removeMarker(e) {
        // The method, it does nothing!!!
        return null
    },

    _findCorners(){
        var corners = this._layer.getBounds();
        
        var northwest = corners.getNorthWest();
        var northeast = corners.getNorthEast();
        var southeast = corners.getSouthEast();
        var southwest = corners.getSouthWest();

        return [northwest, northeast, southeast, southwest];        
    },

    _placeCornerMarkers(){
        const corners = this._findCorners()

        // update place of ALL markers
        // All must be updated, in case rectangle has "crossed over" itself, changing marker indices (i.e. NW marker is now NE or SW marker)
        this._markers.forEach((marker, index) => {
            marker.setLatLng(corners[index])
        })                
    }
});
