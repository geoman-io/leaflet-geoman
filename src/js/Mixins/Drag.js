var DragMixin = {
    _initDraggableLayer: function() {
        // temporary coord variable for delta calculation
        this._tempDragCoord;

        // add CSS class
        var el = this._poly._path;
        L.DomUtil.addClass(el, 'leaflet-pm-draggable');


        var onMouseUp = (e) => {

            // re-enable map drag
            this._poly._map.dragging.enable();

            // clear up mousemove event
            this._poly._map.off('mousemove');

            // clear up mouseup event
            this._poly.off('mouseup');

            // if no drag happened, don't do anything
            if(!this._dragging) {
                return false;
            }

            // show markers again
            this._initMarkers();

            // timeout to prevent click event after drag :-/
            // TODO: do it better as soon as leaflet has a way to do it better :-)
            window.setTimeout(() => {
                // set state
                this._dragging = false;
                L.DomUtil.removeClass(el, 'leaflet-pm-dragging');

                // fire pm:dragend event
                this._poly.fire('pm:dragend');

                // fire edit
                this._fireEdit();
            }, 10);

        }


        var onMouseMove = (e) => {

            if(!this._dragging) {

                // set state
                this._dragging = true;
                L.DomUtil.addClass(el, 'leaflet-pm-dragging');

                // bring it to front to prevent drag interception
                this._poly.bringToFront();

                // disbale map drag
                this._poly._map.dragging.disable();

                // hide markers
                this._markerGroup.clearLayers();

                // fire pm:dragstart event
                this._poly.fire('pm:dragstart');


            }

            this._onLayerDrag(e);

        }

        this._poly.on('mousedown', (e) => {

            // save for delta calculation
            this._tempDragCoord = e.latlng;

            this._poly.on('mouseup', onMouseUp);

            // listen to mousemove on map (instead of polygon),
            // otherwise fast mouse movements stop the drag
            this._poly._map.on('mousemove', onMouseMove);

        });
    },
    dragging: function() {
        return this._dragging;
    },

    _onLayerDrag: function(e) {

        // latLng of mouse event
        let latlng = e.latlng;

        // delta coords (how far was dragged)
        let deltaLatLng = {
            lat: latlng.lat - this._tempDragCoord.lat,
            lng: latlng.lng - this._tempDragCoord.lng
        };

        // create the new coordinates array
        let coords = this._poly._latlngs[0];
        let newLatLngs = coords.map((currentLatLng) => {
            return {
                lat: currentLatLng.lat + deltaLatLng.lat,
                lng: currentLatLng.lng + deltaLatLng.lng
            }
        });

        // set new coordinates and redraw
        this._poly.setLatLngs(newLatLngs).redraw();

        // save current latlng for next delta calculation
        this._tempDragCoord = latlng;

        // fire pm:dragstart event
        this._poly.fire('pm:drag');

    },
}
