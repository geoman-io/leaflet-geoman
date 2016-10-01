const DragMixin = {
    _initDraggableLayer() {
        // temporary coord variable for delta calculation
        this._tempDragCoord = null;

        // add CSS class
        const el = this._layer._path;
        L.DomUtil.addClass(el, 'leaflet-pm-draggable');


        const onMouseUp = () => {
            // re-enable map drag
            this._layer._map.dragging.enable();

            // clear up mousemove event
            this._layer._map.off('mousemove');

            // clear up mouseup event
            this._layer.off('mouseup');

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
                this._layer.fire('pm:dragend');

                // fire edit
                this._fireEdit();
            }, 10);

            return true;
        };

        const onMouseMove = (e) => {
            if(!this._dragging) {
                // set state
                this._dragging = true;
                L.DomUtil.addClass(el, 'leaflet-pm-dragging');

                // bring it to front to prevent drag interception
                this._layer.bringToFront();

                // disbale map drag
                this._layer._map.dragging.disable();

                // hide markers
                this._markerGroup.clearLayers();

                // fire pm:dragstart event
                this._layer.fire('pm:dragstart');
            }

            this._onLayerDrag(e);
        };

        this._layer.on('mousedown', (e) => {
            // save for delta calculation
            this._tempDragCoord = e.latlng;

            this._layer.on('mouseup', onMouseUp);

            // listen to mousemove on map (instead of polygon),
            // otherwise fast mouse movements stop the drag
            this._layer._map.on('mousemove', onMouseMove);
        });
    },
    dragging() {
        return this._dragging;
    },

    _onLayerDrag(e) {
        // latLng of mouse event
        const latlng = e.latlng;

        // delta coords (how far was dragged)
        const deltaLatLng = {
            lat: latlng.lat - this._tempDragCoord.lat,
            lng: latlng.lng - this._tempDragCoord.lng,
        };

        // create the new coordinates array
        const coords = this._layer._latlngs[0];
        const newLatLngs = coords.map((currentLatLng) => {
            return {
                lat: currentLatLng.lat + deltaLatLng.lat,
                lng: currentLatLng.lng + deltaLatLng.lng,
            };
        });

        // set new coordinates and redraw
        this._layer.setLatLngs(newLatLngs).redraw();

        // save current latlng for next delta calculation
        this._tempDragCoord = latlng;

        // fire pm:dragstart event
        this._layer.fire('pm:drag');
    },
};
