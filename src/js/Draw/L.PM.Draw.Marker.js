import Draw from './L.PM.Draw';
import { getTranslation } from '../helpers';

Draw.Marker = Draw.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'Marker';
    this.toolbarButtonName = 'drawMarker';
  },
  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // change enabled state
    this._enabled = true;

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // create a marker on click on the map
    this._map.on('click', this._createMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.marker(
      this._map.getCenter(),
      this.options.markerStyle
    );
    this._setPane(this._hintMarker, 'markerPane');
    this._hintMarker._pmTempLayer = true;
    this._hintMarker.addTo(this._map);

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.placeMarker'), {
          permanent: true,
          offset: L.point(0, 10),
          direction: 'bottom',

          opacity: 0.8,
        })
        .openTooltip();
    }

    // this is just to keep the snappable mixin happy
    this._layer = this._hintMarker;

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    // enable edit mode for existing markers
    if (this.options.markerEditable) {
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          layer.pm.enable();
        }
      });
    }

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  disable() {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }

    // change enabled state
    this._enabled = false;

    // reset cursor
    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // undbind click event, don't create a marker on click anymore
    this._map.off('click', this._createMarker, this);

    // remove hint marker
    this._hintMarker.remove();

    // remove event listener to sync hint marker
    this._map.off('mousemove', this._syncHintMarker, this);

    // disable dragging and removing for all markers
    this._map.eachLayer((layer) => {
      if (this.isRelevantMarker(layer)) {
        layer.pm.disable();
      }
    });

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
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
  isRelevantMarker(layer) {
    return (
      layer instanceof L.Marker &&
      layer.pm &&
      !layer._pmTempLayer &&
      !layer.pm._initTextMarker
    );
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

    this._fireChange(this._hintMarker.getLatLng(), 'Draw');
  },
  _createMarker(e) {
    if (!e.latlng) {
      return;
    }

    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    // create marker
    const marker = new L.Marker(latlng, this.options.markerStyle);
    this._setPane(marker, 'markerPane');
    this._finishLayer(marker);

    if (!marker.pm) {
      // if pm is not create we don't apply dragging to the marker (draggable is applied to the marker, when it is added to the map )
      marker.options.draggable = false;
    }
    // add marker to the map
    marker.addTo(this._map.pm._getContainingLayer());

    if (marker.pm && this.options.markerEditable) {
      // enable editing for the marker
      marker.pm.enable();
    } else if (marker.dragging) {
      marker.dragging.disable();
    }

    // fire the pm:create event and pass shape and marker
    this._fireCreate(marker);

    this._cleanupSnapping();

    if (!this.options.continueDrawing) {
      this.disable();
    }
  },
  setStyle() {
    if (this.options.markerStyle?.icon) {
      this._hintMarker?.setIcon(this.options.markerStyle.icon);
    }
  },
});
