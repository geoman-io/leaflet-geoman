import Draw from './L.PM.Draw';

Draw.Rectangle = Draw.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'Rectangle';
        this.toolbarButtonName = 'drawRectangle';
    },
    enable(options) {
        // TODO: Think about if these options could be passed globally for all
        // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
        L.Util.setOptions(this, options);

        // enable draw mode
        this._enabled = true;

        // create a new layergroup
        this._layerGroup = new L.LayerGroup();
        this._layerGroup._pmTempLayer = true;
        this._layerGroup.addTo(this._map);

        // the rectangle we want to draw
        this._layer = L.rectangle([[0,0],[0,0]]).addTo(this._map);
        this._layer._pmTempLayer = true;
        this._layerGroup.addLayer(this._layer);

        // this is the marker at the origin of the rectangle
        // this needs to be present, for tracking purposes, but we'll make it invisible if a user doesn't want to see it!
        this._startMarker = L.marker([0, 0], {
            icon: L.divIcon({ className: 'marker-icon' }),
            draggable: true,
            zIndexOffset: 100,
            opacity: this.options.cursorMarker ? 1 : 0
        });
        this._startMarker._pmTempLayer = true;
        this._layerGroup.addLayer(this._startMarker);

        // this is the hintmarker on the mouse cursor
        this._hintMarker = L.marker([0, 0], {
            icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        });
        this._hintMarker._pmTempLayer = true;
        this._layerGroup.addLayer(this._hintMarker);

        // show the hintmarker if the option is set
        if(this.options.cursorMarker) {
            L.DomUtil.addClass(this._hintMarker._icon, 'visible');

            // Add two more matching style markers, if cursor marker is rendered
            this._styleMarkers = []
            for(let i = 0; i < 2; i++){
                let styleMarker = L.marker([0, 0], {
                    icon: L.divIcon({ className: 'marker-icon' }),
                    draggable: true,
                    zIndexOffset: 100
                });
                styleMarker._pmTempLayer = true;
                this._layerGroup.addLayer(styleMarker);

                this._styleMarkers.push(styleMarker)
            } 
        }

        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._placeStartingMarkers, this);

        // sync hint marker with mouse cursor
        this._map.on('mousemove', this._syncHintMarker, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape, workingLayer: this._layer });

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

        // an array used in the snapping mixin.
        // TODO: think about moving this somewhere else?
        this._otherSnapLayers = [];
    },
    disable() {
        // disable drawing mode

        // cancel, if drawing mode isn't event enabled
        if(!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._finishShape, this);
        this._map.off('click', this._placeStartingMarkers, this);
        this._map.off('mousemove', this._syncHintMarker, this);

        // remove helping layers
        this._map.removeLayer(this._layerGroup);

        // fire drawend event
        this._map.fire('pm:drawend', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

        // cleanup snapping
        if(this.options.snappable) {
            this._cleanupSnapping();
        }
    },
    enabled() {
        return this._enabled;
    },
    toggle(options) {
        if(this.enabled()) {
            this.disable();
        } else {
            this.enable(options);
        }
    },
    _placeStartingMarkers(e) {
        // assign the coordinate of the click to the hintMarker, that's necessary for
        // mobile where the marker can't follow a cursor
        if(!this._hintMarker._snapped) {
            this._hintMarker.setLatLng(e.latlng);
        }

        // get coordinate for new vertex by hintMarker (cursor marker)
        const latlng = this._hintMarker.getLatLng();

        this._startMarker.setLatLng(latlng);

        // if we have the other two visibilty markers, place them now
        if(this.options.cursorMarker && this._styleMarkers){
            this._styleMarkers.forEach((styleMarker) => {
                styleMarker.setLatLng(latlng)
            })
        }

        this._map.off('click', this._placeStartingMarkers, this);
        this._map.on('click', this._finishShape, this);

        this._setRectangleOrigin();
    },
    _setRectangleOrigin() {
        const latlng = this._startMarker.getLatLng();

        if(latlng) {
            this._layer.setLatLngs([latlng, latlng]);

            this._hintMarker.on('move', this._syncRectangleSize, this);
        }
    },
    _syncHintMarker(e) {
        // move the cursor marker
        this._hintMarker.setLatLng(e.latlng);

        // if snapping is enabled, do it
        if(this.options.snappable) {
            const fakeDragEvent = e;
            fakeDragEvent.target = this._hintMarker;
            this._handleSnapping(fakeDragEvent);
        }
    },
    _syncRectangleSize() {
        // Create a box using corners A & B (A = Starting Position, B = Current Mouse Position)
        const A = this._startMarker.getLatLng();
        const B = this._hintMarker.getLatLng();

        this._layer.setBounds([A, B]);

        // Add matching style markers, if cursor marker is shown
        if(this.options.cursorMarker && this._styleMarkers){
            const corners = this._findCorners()
            let unmarkedCorners = []

            // Find two corners not currently occupied by starting marker and hint marker
            corners.forEach((corner) => {
                if(!corner.equals(this._startMarker.getLatLng()) && !corner.equals(this._hintMarker.getLatLng())){
                    unmarkedCorners.push(corner)
                }
            })

            // Reposition style markers
            unmarkedCorners.forEach((unmarkedCorner, index) =>{
                this._styleMarkers[index].setLatLng(unmarkedCorner)
            })
        }
    },
    _finishShape() {
        // create the final rectangle layer, based on opposite corners A & B
        const A = this._startMarker.getLatLng();
        const B = this._hintMarker.getLatLng();
        const rectangleLayer = L.rectangle([A, B]).addTo(this._map);

        // disable drawing
        this.disable();

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: rectangleLayer,
        });
    },
    _findCorners(){
        var corners = this._layer.getBounds();
        
        var northwest = corners.getNorthWest();
        var northeast = corners.getNorthEast();
        var southeast = corners.getSouthEast();
        var southwest = corners.getSouthWest();

        return [northwest, northeast, southeast, southwest];        
    },    
});
