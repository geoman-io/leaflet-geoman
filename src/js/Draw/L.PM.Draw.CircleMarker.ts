import * as L from 'leaflet';
import type { SnappableMarker } from '../Mixins/Snapping';
import { PM } from '../PM';
/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    Toolbar: {
      toggleButton: (name: string, state: boolean) => void;
    };
    _getContainingLayer: () => L.LayerGroup | L.Map;
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * Extended layer with PM temp flag
 */
type PMTempLayer = L.Layer & {
  _pmTempLayer?: boolean;
  pm?: {
    enable: () => void;
    disable: () => void;
    _updateHiddenPolyCircle?: () => void;
  };
};

/**
 * Extended marker with snapped flag and icon
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
  _orgLatLng?: L.LatLng;
};

/**
 * Extended CircleMarker with PM properties
 */
type ExtendedCircleMarker = L.CircleMarker & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
  _orgLatLng?: L.LatLng;
  pm?: {
    enable: () => void;
    disable: () => void;
    _updateHiddenPolyCircle: () => void;
  };
};

/**
 * Extended feature group
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * Extended polyline
 */
type ExtendedPolyline = L.Polyline & {
  _pmTempLayer?: boolean;
};

/**
 * Hint marker type (can be Marker or CircleMarker)
 */
type HintMarkerType = (L.Marker | L.CircleMarker) & {
  _pmTempLayer?: boolean;
  _snapped?: boolean;
  _orgLatLng?: L.LatLng;
};

/**
 * CircleMarker draw options
 */
interface CircleMarkerDrawOptions {
  templineStyle: L.CircleMarkerOptions & { radius?: number };
  hintlineStyle: L.PolylineOptions;
  pathOptions?: L.CircleMarkerOptions;
  tooltips?: boolean;
  cursorMarker?: boolean;
  snappable?: boolean;
  markerEditable?: boolean;
  requireSnapToFinish?: boolean;
  continueDrawing?: boolean;
  editable?: boolean;
  resizeableCircleMarker?: boolean;
  minRadiusCircleMarker?: number | null;
  maxRadiusCircleMarker?: number | null;
  minRadiusCircle?: number | null;
  maxRadiusCircle?: number | null;
  [key: string]: unknown;
}

import Draw from './L.PM.Draw';
import DrawTool from './L.PM.DrawTool';
import { defineOptions } from '../helpers/classes';
import { destinationOnLine, getTranslation } from '../helpers';

class DrawCircleMarker extends DrawTool {
  declare _map: ExtendedMap;
  declare options: CircleMarkerDrawOptions;
  declare _shape: string;
  declare _enabled: boolean;
  declare toolbarButtonName: string;
  declare _layerGroup: ExtendedFeatureGroup;
  declare _layer: ExtendedCircleMarker;
  declare _hintMarker: HintMarkerType;
  declare _centerMarker: ExtendedMarker;
  declare _hintline: ExtendedPolyline;
  declare _otherSnapLayers: L.Layer[];
  declare _layerIsDragging: boolean;
  declare _BaseCircleClass: typeof L.CircleMarker;
  declare _minRadiusOption: 'minRadiusCircle' | 'minRadiusCircleMarker';
  declare _maxRadiusOption: 'maxRadiusCircle' | 'maxRadiusCircleMarker';
  declare _editableOption: 'resizeableCircle' | 'resizeableCircleMarker';
  declare _defaultRadius: number;

  constructor(map: L.Map) {
    super(map);
    this._shape = 'CircleMarker';
    this.toolbarButtonName = 'drawCircleMarker';
    // with _layerIsDragging we check if a circlemarker is currently dragged and disable marker creation
    this._layerIsDragging = false;
    this._BaseCircleClass = L.CircleMarker;
    this._minRadiusOption = 'minRadiusCircleMarker';
    this._maxRadiusOption = 'maxRadiusCircleMarker';
    this._editableOption = 'resizeableCircleMarker';
    this._defaultRadius = 10;
  }
  enable(options?: Partial<CircleMarkerDrawOptions>) {
    // TODO: Think about if these options could be passed globally for all
    // instances of PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    // TODO: remove with next major release
    if (this.options.editable) {
      this.options.resizeableCircleMarker = this.options.editable;
      delete this.options.editable;
    }

    // change enabled state
    this._enabled = true;

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm._modes._exclusive(`draw:${this._shape}`);
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // Draw the CircleMarker like a Circle
    if (this.options[this._editableOption]) {
      // we need to set the radius to 0 without overwriting the CircleMarker style
      const templineStyle: L.CircleMarkerOptions & { radius?: number } = {};
      Object.assign(templineStyle, this.options.templineStyle);
      templineStyle.radius = 0;

      // create a new layergroup
      this._layerGroup = new L.FeatureGroup();
      this._layerGroup._pmTempLayer = true;
      this._layerGroup.addTo(this._map);

      // this is the circle we want to draw
      this._layer = new this._BaseCircleClass(
        this._map.getCenter(),
        templineStyle
      );
      this._setPane(this._layer, 'layerPane');
      this._layer._pmTempLayer = true;

      // this is the marker in the center of the circle
      this._centerMarker = new L.Marker(this._map.getCenter(), {
        icon: new L.DivIcon({ className: 'marker-icon' }),
        draggable: false,
        zIndexOffset: 100,
      });
      this._setPane(this._centerMarker, 'vertexPane');
      this._centerMarker._pmTempLayer = true;

      // this is the hintmarker on the mouse cursor
      this._hintMarker = new L.Marker(this._map.getCenter(), {
        zIndexOffset: 110,
        keyboard: false,
        icon: new L.DivIcon({ className: 'marker-icon cursor-marker' }),
      });
      this._setPane(this._hintMarker, 'vertexPane');
      this._hintMarker._pmTempLayer = true;
      this._layerGroup.addLayer(this._hintMarker);

      // show the hintmarker if the option is set
      if (this.options.cursorMarker) {
        this._hintMarker._icon!.classList.add('visible');
      }

      // add tooltip to hintmarker
      if (this.options.tooltips) {
        this._hintMarker
          .bindTooltip(getTranslation('tooltips.startCircle'), {
            permanent: true,
            offset: new L.Point(0, 10),
            direction: 'bottom',

            opacity: 0.8,
          })
          .openTooltip();
      }

      // this is the hintline from the hint marker to the center marker
      this._hintline = new L.Polyline([], this.options.hintlineStyle);
      this._setPane(this._hintline, 'layerPane');
      this._hintline._pmTempLayer = true;
      this._layerGroup.addLayer(this._hintline);
      // create a polygon-point on click
      this._map.on('click', this._placeCenterMarker, this);
    } else {
      // create a marker on click on the map
      this._map.on('click', this._createMarker, this);

      // this is the hintmarker on the mouse cursor
      this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), {
        radius: this._defaultRadius,
        ...this.options.templineStyle,
      });
      this._setPane(this._hintMarker, 'layerPane');
      this._hintMarker._pmTempLayer = true;
      this._hintMarker.addTo(this._map);
      // this is just to keep the snappable mixin happy
      this._layer = this._hintMarker;

      // add tooltip to hintmarker
      if (this.options.tooltips) {
        this._hintMarker
          .bindTooltip(getTranslation('tooltips.placeCircleMarker'), {
            permanent: true,
            offset: new L.Point(0, 10),
            direction: 'bottom',

            opacity: 0.8,
          })
          .openTooltip();
      }
    }

    // sync hint marker with mouse cursor
    this._map.on('pointermove', this._syncHintMarker, this);

    this._extendingEnable();

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  }
  _extendingEnable() {
    if (!this.options[this._editableOption] && this.options.markerEditable) {
      // enable edit mode for existing markers
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          layer.pm.enable();
        }
      });
    }

    // Must be named bringToBack to work with Leaflet functions.
    this._layer.bringToBack();
  }
  disable() {
    // cancel, if drawing mode isn't even enabled
    if (!this._enabled) {
      return;
    }
    // change enabled state
    this._enabled = false;

    // reset cursor
    this._map.getContainer().classList.remove('geoman-draw-cursor');

    // disable when drawing like a Circle
    if (this.options[this._editableOption]) {
      // unbind listeners
      this._map.off('click', this._finishShape, this);
      this._map.off('click', this._placeCenterMarker, this);

      // remove helping layers
      this._map.removeLayer(this._layerGroup);
    } else {
      // undbind click event, don't create a marker on click anymore
      this._map.off('click', this._createMarker, this);

      this._extendingDisable();

      // remove hint marker
      this._hintMarker.remove();
    }

    // remove event listener to sync hint marker
    this._map.off('pointermove', this._syncHintMarker, this);

    // toggle the draw button of the Toolbar in case drawing mode got disabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, false);

    // cleanup snapping
    if (this.options.snappable) {
      this._cleanupSnapping();
    }

    // fire drawend event
    this._fireDrawEnd();
    this._setGlobalDrawMode();
  }
  _extendingDisable() {
    // disable dragging and removing for all markers
    this._map.eachLayer((layer) => {
      if (this.isRelevantMarker(layer)) {
        layer.pm.disable();
      }
    });
  }
  enabled() {
    return this._enabled;
  }
  toggle(options?: Partial<CircleMarkerDrawOptions>) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  }
  _placeCenterMarker(e: L.LeafletPointerEvent) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    this._layerGroup.addLayer(this._layer);
    this._layerGroup.addLayer(this._centerMarker);

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker.getLatLng();

    this._centerMarker.setLatLng(latlng);

    this._map.off('click', this._placeCenterMarker, this);
    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  }
  _placeCircleCenter() {
    const latlng = this._centerMarker.getLatLng();

    if (latlng) {
      this._layer.setLatLng(latlng);

      // sync the hintline with hint marker (a Marker in this editable mode)
      const hintMarker = this._hintMarker as L.Marker;
      hintMarker.on('move', this._syncHintLine, this);
      hintMarker.on('move', this._syncCircleRadius, this);

      this._hintMarker.setTooltipContent(
        getTranslation('tooltips.finishCircle')
      );

      this._fireCenterPlaced();
      this._fireChange(this._layer.getLatLng(), 'Draw');
    }
  }
  _syncHintLine() {
    const latlng = this._centerMarker.getLatLng();
    const secondLatLng = this._getNewDestinationOfHintMarker();
    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([latlng, secondLatLng]);
  }
  _syncCircleRadius() {
    const A = this._centerMarker.getLatLng();
    const B = this._hintMarker.getLatLng();

    const distance = this._distanceCalculation(A, B);

    if (
      this.options[this._minRadiusOption]! &&
      distance < this.options[this._minRadiusOption]!
    ) {
      this._layer.setRadius(this.options[this._minRadiusOption]!);
    } else if (
      this.options[this._maxRadiusOption]! &&
      distance > this.options[this._maxRadiusOption]!
    ) {
      this._layer.setRadius(this.options[this._maxRadiusOption]!);
    } else {
      this._layer.setRadius(distance);
    }
  }
  _syncHintMarker(e: L.LeafletPointerEvent) {
    // move the cursor marker
    this._hintMarker.setLatLng(e.latlng);
    // calculate the new latlng of marker if radius is out of min/max
    this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());

    // if snapping is enabled, do it
    if (this.options.snappable) {
      this._handleSnapping(
        Object.assign(e, { target: this._hintMarker as SnappableMarker })
      );
    }

    this._handleHintMarkerSnapping();

    const latlng =
      this._layerGroup && this._layerGroup.hasLayer(this._centerMarker)
        ? this._centerMarker.getLatLng()
        : this._hintMarker.getLatLng();
    this._fireChange(latlng, 'Draw');
  }
  isRelevantMarker(layer: object): layer is L.CircleMarker {
    return (
      layer instanceof L.CircleMarker &&
      !(layer instanceof L.Circle) &&
      !!layer.pm &&
      !layer._pmTempLayer
    );
  }
  _createMarker(e: L.LeafletPointerEvent) {
    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // with _layerIsDragging we check if a circlemarker is currently dragged
    if (!e.latlng || this._layerIsDragging) {
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
    const marker = new this._BaseCircleClass(latlng, {
      radius: this._defaultRadius,
      ...this.options.pathOptions,
    });
    this._setPane(marker, 'layerPane');
    this._finishLayer(marker);
    // add marker to the map
    marker.addTo(this._map.pm._getContainingLayer());

    this._extendingCreateMarker(marker);

    // fire the pm:create event and pass shape and marker
    this._fireCreate(marker);

    this._cleanupSnapping();

    if (!this.options.continueDrawing) {
      this.disable();
    }
  }
  _extendingCreateMarker(marker: ExtendedCircleMarker) {
    if (marker.pm && this.options.markerEditable) {
      // enable editing for the marker
      marker.pm.enable();
    }
  }
  _finishShape(e?: L.LeafletPointerEvent) {
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
    if (e?.latlng && !this._hintMarker._snapped) {
      this._hintMarker.setLatLng(e.latlng);
    }

    const center = this._centerMarker.getLatLng();
    let radius = this._defaultRadius;
    if (this.options[this._editableOption]) {
      // calc the radius
      const latlng = this._hintMarker.getLatLng();
      radius = this._distanceCalculation(center, latlng);
      if (
        this.options[this._minRadiusOption]! &&
        radius < this.options[this._minRadiusOption]!
      ) {
        radius = this.options[this._minRadiusOption]!;
      } else if (
        this.options[this._maxRadiusOption]! &&
        radius > this.options[this._maxRadiusOption]!
      ) {
        radius = this.options[this._maxRadiusOption]!;
      }
    }

    const options = { ...this.options.pathOptions, radius };

    // create the final circle layer
    const circleLayer = new this._BaseCircleClass(center, options);
    this._setPane(circleLayer, 'layerPane');
    this._finishLayer(circleLayer);
    circleLayer.addTo(this._map.pm._getContainingLayer());

    if (circleLayer.pm) {
      // create polygon around the circle border
      circleLayer.pm._updateHiddenPolyCircle();
    }

    // fire the pm:create event and pass shape and layer
    this._fireCreate(circleLayer);

    const hintMarkerLatLng = this._hintMarker.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      this._hintMarker.setLatLng(hintMarkerLatLng);
    }
  }
  _getNewDestinationOfHintMarker(): L.LatLng {
    let secondLatLng = this._hintMarker.getLatLng();
    if (this.options[this._editableOption]) {
      if (!this._layerGroup.hasLayer(this._centerMarker)) {
        return secondLatLng;
      }

      const latlng = this._centerMarker.getLatLng();

      const distance = this._distanceCalculation(latlng, secondLatLng);

      if (
        this.options[this._minRadiusOption]! &&
        distance < this.options[this._minRadiusOption]!
      ) {
        secondLatLng = destinationOnLine(
          this._map,
          latlng,
          secondLatLng,
          this._getMinDistanceInMeter()
        );
      } else if (
        this.options[this._maxRadiusOption]! &&
        distance > this.options[this._maxRadiusOption]!
      ) {
        secondLatLng = destinationOnLine(
          this._map,
          latlng,
          secondLatLng,
          this._getMaxDistanceInMeter()
        );
      }
    }
    return secondLatLng;
  }
  _getMinDistanceInMeter(): number {
    return PM.Utils.pxRadiusToMeterRadius(
      this.options[this._minRadiusOption]!,
      this._map,
      this._centerMarker.getLatLng()
    );
  }
  _getMaxDistanceInMeter(): number {
    return PM.Utils.pxRadiusToMeterRadius(
      this.options[this._maxRadiusOption]!,
      this._map,
      this._centerMarker.getLatLng()
    );
  }
  _handleHintMarkerSnapping() {
    if (this.options[this._editableOption]) {
      if (this._hintMarker._snapped) {
        const latlng = this._centerMarker.getLatLng();
        const secondLatLng = this._hintMarker.getLatLng();
        const distance = this._distanceCalculation(latlng, secondLatLng);

        if (!this._layerGroup.hasLayer(this._centerMarker)) {
          // do nothing
        } else if (
          this.options[this._minRadiusOption]! &&
          distance < this.options[this._minRadiusOption]!
        ) {
          this._hintMarker.setLatLng(this._hintMarker._orgLatLng!);
        } else if (
          this.options[this._maxRadiusOption]! &&
          distance > this.options[this._maxRadiusOption]!
        ) {
          this._hintMarker.setLatLng(this._hintMarker._orgLatLng!);
        }
      }
      // calculate the new latlng of marker if the snapped latlng radius is out of min/max
      this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
    }
  }
  setStyle() {
    const templineStyle: L.CircleMarkerOptions & { radius?: number } = {};
    Object.assign(templineStyle, this.options.templineStyle);
    if (this.options[this._editableOption]) {
      templineStyle.radius = 0;
    }
    this._layer?.setStyle(templineStyle);
    this._hintline?.setStyle(this.options.hintlineStyle);
  }
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number {
    return this._map.project(A).distanceTo(this._map.project(B));
  }
}

defineOptions(DrawCircleMarker, {});
Draw.CircleMarker = DrawCircleMarker;

export { DrawCircleMarker };
export default DrawCircleMarker;
