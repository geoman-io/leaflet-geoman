import Draw from './L.PM.Draw';

Draw.CircleMarker = Draw.extend({
    initialize(map) {
        this._map = map;
        this._shape = 'CircleMarker';
        this.toolbarButtonName = 'drawCircleMarker';
    },
    enable(options) {
        // TODO: Think about if these options could be passed globally for all
        // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
        L.Util.setOptions(this, options);

        // enable draw mode
        this._enabled = true;


        // this is the circle we want to draw
        this._layer = L.circleMarker([0, 0], this.options.templineStyle);
        this._layer._pmTempLayer = true;
        this._hintMarker = this._layer;
        this._hintMarker.addTo(this._map);

        // change map cursor
        this._map._container.style.cursor = 'crosshair';

        // create a polygon-point on click
        this._map.on('click', this._finishShape, this);

        // sync hint marker with mouse cursor
        this._map.on('mousemove', this._syncHintMarker, this);

        // fire drawstart event
        this._map.fire('pm:drawstart', { shape: this._shape, workingLayer: this._layer });

        // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);
    },
    disable() {
        // cancel, if drawing mode isn't event enabled
        if (!this._enabled) {
            return;
        }

        this._enabled = false;

        // reset cursor
        this._map._container.style.cursor = 'default';

        // unbind listeners
        this._map.off('click', this._finishShape, this);
        this._map.off('mousemove', this._syncHintMarker, this);

        // remove helping layers
        this._map.removeLayer(this._layer);

        // fire drawend event
        this._map.fire('pm:drawend', { shape: this._shape });

        // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

        // cleanup snapping
        if (this.options.snappable) {
            this._cleanupSnapping();
        }
    },
    enabled() {
        return this._enabled;
    },
    toggle(options) {
        if (this.enabled()) {
            this.disable();
        } else {
            this.enable(options);
        }
    },
    _syncHintMarker(e) {
        // move the cursor marker
        this._hintMarker.setLatLng(e.latlng);

        // if snapping is enabled, do it
        if (this.options.snappable) {
            const fakeDragEvent = e;
            fakeDragEvent.target = this._hintMarker;
            this._handleSnapping(fakeDragEvent);
        }
    },
    _finishShape(event) {
        if(!event.latlng) {
            return;
        }

        // The CircleMarker coordinates
        const center = event.latlng;

        // disable drawing
        this.disable();

        // create the final circle layer
        const circleLayer = L.circleMarker(center, this.options.pathOptions).addTo(this._map);

        // fire the pm:create event and pass shape and layer
        this._map.fire('pm:create', {
            shape: this._shape,
            layer: circleLayer,
        });
    },
});
