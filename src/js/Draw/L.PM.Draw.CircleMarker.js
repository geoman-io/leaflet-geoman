import Draw from './L.PM.Draw';

import { getTranslation } from '../helpers';

Draw.CircleMarker = Draw.Marker.extend({
  initialize(map) {
    this._map = map;
    this._shape = 'CircleMarker';
    this.toolbarButtonName = 'drawCircleMarker';
  },
  enable(options) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);

    // change enabled state
    this._enabled = true;

    // create a marker on click on the map
    this._map.on('click', this._createMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // this is the hintmarker on the mouse cursor
    this._hintMarker = L.circleMarker([0, 0], this.options.templineStyle);
    this._hintMarker._pmTempLayer = true;
    this._hintMarker.addTo(this._map);

    // add tooltip to hintmarker
    if (this.options.tooltips) {
      this._hintMarker
        .bindTooltip(getTranslation('tooltips.placeCircleMarker'), {
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

    // fire drawstart event
    this._map.fire('pm:drawstart', {
      shape: this._shape,
      workingLayer: this._layer,
    });

    // enable edit mode for existing markers
    this._map.eachLayer(layer => {
      if (this.isRelevantMarker(layer)) {
        layer.pm.enable();
      }
    });
  },
  isRelevantMarker(layer) {
    return (
      layer instanceof L.CircleMarker &&
      !(layer instanceof L.Circle) &&
      layer.pm &&
      !layer._pmTempLayer
    );
  },
  _createMarker(e) {
    if (!e.latlng) {
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
    const marker = L.circleMarker(latlng, this.options.pathOptions);

    // add marker to the map
    marker.addTo(this._map);

    // enable editing for the marker
    marker.pm = marker.pm || new L.PM.Edit.CircleMarker(marker);
    marker.pm.enable();

    // fire the pm:create event and pass shape and marker
    this._map.fire('pm:create', {
      shape: this._shape,
      marker, // DEPRECATED
      layer: marker,
    });

    this._cleanupSnapping();
  },
});
