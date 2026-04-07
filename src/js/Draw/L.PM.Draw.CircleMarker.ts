import Draw from './L.PM.Draw';
import { destinationOnLine, getTranslation } from '../helpers';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    setOptions: <T extends { options: object }>(
      obj: T,
      options: object
    ) => void;
  };
  DomUtil: {
    addClass: (el: HTMLElement, name: string) => void;
  };
  extend: (dest: object, ...sources: object[]) => object;
  PM: {
    Utils: {
      pxRadiusToMeterRadius: (
        radius: number,
        map: L.Map,
        center: L.LatLng
      ) => number;
    };
  };
};

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
  _icon?: HTMLElement;
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
  _icon?: HTMLElement;
};

/**
 * CircleMarker draw options
 */
interface CircleMarkerDrawOptions {
  templineStyle?: L.CircleMarkerOptions & { radius?: number };
  hintlineStyle?: L.PolylineOptions;
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
  [key: string]: unknown;
}

/**
 * Draw CircleMarker interface
 */
interface IDrawCircleMarker {
  options: CircleMarkerDrawOptions;
  _map: ExtendedMap;
  _shape: string;
  _enabled: boolean;
  toolbarButtonName: string;
  _layerGroup?: ExtendedFeatureGroup;
  _layer?: ExtendedCircleMarker;
  _hintMarker?: HintMarkerType;
  _centerMarker?: ExtendedMarker;
  _hintline?: ExtendedPolyline;
  _otherSnapLayers: L.Layer[];
  _layerIsDragging: boolean;
  _BaseCircleClass: typeof L.CircleMarker;
  _minRadiusOption: string;
  _maxRadiusOption: string;
  _editableOption: string;
  _defaultRadius: number;

  enable(options?: Partial<CircleMarkerDrawOptions>): void;
  _extendingEnable(): void;
  disable(): void;
  _extendingDisable(): void;
  enabled(): boolean;
  toggle(options?: Partial<CircleMarkerDrawOptions>): void;
  _placeCenterMarker(e: L.LeafletMouseEvent): void;
  _placeCircleCenter(): void;
  _syncHintLine(): void;
  _syncCircleRadius(): void;
  _syncHintMarker(e: L.LeafletMouseEvent): void;
  isRelevantMarker(layer: L.Layer): boolean;
  _createMarker(e: L.LeafletMouseEvent): void;
  _extendingCreateMarker(marker: ExtendedCircleMarker): void;
  _finishShape(e?: L.LeafletMouseEvent): void;
  _getNewDestinationOfHintMarker(): L.LatLng;
  _getMinDistanceInMeter(): number;
  _getMaxDistanceInMeter(): number;
  _handleHintMarkerSnapping(): void;
  setStyle(): void;
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number;

  // From mixins
  _setPane(
    layer: PMTempLayer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ): void;
  _fireDrawStart(): void;
  _fireDrawEnd(): void;
  _fireCreate(layer: L.Layer): void;
  _fireChange(latlng: L.LatLng, source: string): void;
  _fireCenterPlaced(): void;
  _setGlobalDrawMode(): void;
  _cleanupSnapping(): void;
  _handleSnapping(e: L.LeafletEvent): void;
  _finishLayer(layer: L.Layer): void;
  _isFirstLayer(): boolean;
}

const DrawCircleMarker = (
  Draw as unknown as { extend: (props: object) => unknown }
).extend({
  initialize(this: IDrawCircleMarker, map: L.Map) {
    this._map = map as unknown as ExtendedMap;
    this._shape = 'CircleMarker';
    this.toolbarButtonName = 'drawCircleMarker';
    // with _layerIsDragging we check if a circlemarker is currently dragged and disable marker creation
    this._layerIsDragging = false;
    this._BaseCircleClass = L.CircleMarker;
    this._minRadiusOption = 'minRadiusCircleMarker';
    this._maxRadiusOption = 'maxRadiusCircleMarker';
    this._editableOption = 'resizeableCircleMarker';
    this._defaultRadius = 10;
  },
  enable(this: IDrawCircleMarker, options?: Partial<CircleMarkerDrawOptions>) {
    // TODO: Think about if these options could be passed globally for all
    // instances of L.PM.Draw. So a dev could set drawing style one time as some kind of config
    L.Util.setOptions(this, options);
    // TODO: remove with next major release
    if (this.options.editable) {
      this.options.resizeableCircleMarker = this.options.editable;
      delete this.options.editable;
    }

    // change enabled state
    this._enabled = true;

    // toggle the draw button of the Toolbar in case drawing mode got enabled without the button
    this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, true);

    // change map cursor
    this._map.getContainer().classList.add('geoman-draw-cursor');

    // Draw the CircleMarker like a Circle
    if (this.options[this._editableOption]) {
      // we need to set the radius to 0 without overwriting the CircleMarker style
      const templineStyle: L.CircleMarkerOptions & { radius?: number } = {};
      L.extend(templineStyle, this.options.templineStyle);
      templineStyle.radius = 0;

      // create a new layergroup
      this._layerGroup = new L.FeatureGroup() as ExtendedFeatureGroup;
      this._layerGroup._pmTempLayer = true;
      this._layerGroup.addTo(this._map);

      // this is the circle we want to draw
      this._layer = new this._BaseCircleClass(
        this._map.getCenter(),
        templineStyle
      ) as ExtendedCircleMarker;
      this._setPane(this._layer, 'layerPane');
      this._layer._pmTempLayer = true;

      // this is the marker in the center of the circle
      this._centerMarker = L.marker(this._map.getCenter(), {
        icon: L.divIcon({ className: 'marker-icon' }),
        draggable: false,
        zIndexOffset: 100,
      }) as ExtendedMarker;
      this._setPane(this._centerMarker, 'vertexPane');
      this._centerMarker._pmTempLayer = true;

      // this is the hintmarker on the mouse cursor
      this._hintMarker = L.marker(this._map.getCenter(), {
        zIndexOffset: 110,
        icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
      }) as HintMarkerType;
      this._setPane(this._hintMarker, 'vertexPane');
      this._hintMarker._pmTempLayer = true;
      this._layerGroup.addLayer(this._hintMarker);

      // show the hintmarker if the option is set
      if (this.options.cursorMarker) {
        const hintMarker = this._hintMarker as ExtendedMarker;
        if (hintMarker._icon) {
          L.DomUtil.addClass(hintMarker._icon, 'visible');
        }
      }

      // add tooltip to hintmarker
      if (this.options.tooltips) {
        this._hintMarker
          .bindTooltip(getTranslation('tooltips.startCircle'), {
            permanent: true,
            offset: L.point(0, 10),
            direction: 'bottom',

            opacity: 0.8,
          })
          .openTooltip();
      }

      // this is the hintline from the hint marker to the center marker
      this._hintline = L.polyline(
        [],
        this.options.hintlineStyle
      ) as ExtendedPolyline;
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
      }) as HintMarkerType;
      this._setPane(this._hintMarker, 'layerPane');
      this._hintMarker._pmTempLayer = true;
      (this._hintMarker as L.CircleMarker).addTo(this._map);
      // this is just to keep the snappable mixin happy
      this._layer = this._hintMarker as ExtendedCircleMarker;

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
    }

    // sync hint marker with mouse cursor
    this._map.on('mousemove', this._syncHintMarker, this);

    this._extendingEnable();

    // an array used in the snapping mixin.
    // TODO: think about moving this somewhere else?
    this._otherSnapLayers = [];

    // fire drawstart event
    this._fireDrawStart();
    this._setGlobalDrawMode();
  },
  _extendingEnable(this: IDrawCircleMarker) {
    if (!this.options[this._editableOption] && this.options.markerEditable) {
      // enable edit mode for existing markers
      this._map.eachLayer((layer) => {
        if (this.isRelevantMarker(layer)) {
          (layer as PMTempLayer).pm?.enable();
        }
      });
    }

    // Must be named bringToBack to work with Leaflet functions.
    (this._layer as L.CircleMarker)?.bringToBack?.();
  },
  disable(this: IDrawCircleMarker) {
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
      if (this._layerGroup) {
        this._map.removeLayer(this._layerGroup);
      }
    } else {
      // undbind click event, don't create a marker on click anymore
      this._map.off('click', this._createMarker, this);

      this._extendingDisable();

      // remove hint marker
      this._hintMarker?.remove();
    }

    // remove event listener to sync hint marker
    this._map.off('mousemove', this._syncHintMarker, this);

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
  _extendingDisable(this: IDrawCircleMarker) {
    // disable dragging and removing for all markers
    this._map.eachLayer((layer) => {
      if (this.isRelevantMarker(layer)) {
        (layer as PMTempLayer).pm?.disable();
      }
    });
  },
  enabled(this: IDrawCircleMarker) {
    return this._enabled;
  },
  toggle(this: IDrawCircleMarker, options?: Partial<CircleMarkerDrawOptions>) {
    if (this.enabled()) {
      this.disable();
    } else {
      this.enable(options);
    }
  },
  _placeCenterMarker(this: IDrawCircleMarker, e: L.LeafletMouseEvent) {
    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (!this._hintMarker?._snapped) {
      this._hintMarker?.setLatLng(e.latlng);
    }

    if (this._layerGroup && this._layer) {
      this._layerGroup.addLayer(this._layer);
    }
    if (this._layerGroup && this._centerMarker) {
      this._layerGroup.addLayer(this._centerMarker);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker?.getLatLng();

    if (latlng) {
      this._centerMarker?.setLatLng(latlng);
    }

    this._map.off('click', this._placeCenterMarker, this);
    this._map.on('click', this._finishShape, this);

    this._placeCircleCenter();
  },
  _placeCircleCenter(this: IDrawCircleMarker) {
    const latlng = this._centerMarker?.getLatLng();

    if (latlng) {
      this._layer?.setLatLng(latlng);

      // sync the hintline with hint marker
      this._hintMarker?.on('move', this._syncHintLine, this);
      this._hintMarker?.on('move', this._syncCircleRadius, this);

      this._hintMarker?.setTooltipContent(
        getTranslation('tooltips.finishCircle')
      );

      this._fireCenterPlaced();
      this._fireChange(this._layer!.getLatLng(), 'Draw');
    }
  },
  _syncHintLine(this: IDrawCircleMarker) {
    const latlng = this._centerMarker?.getLatLng();
    const secondLatLng = this._getNewDestinationOfHintMarker();
    // set coords for hintline from marker to last vertex of drawin polyline
    if (latlng) {
      this._hintline?.setLatLngs([latlng, secondLatLng]);
    }
  },
  _syncCircleRadius(this: IDrawCircleMarker) {
    const A = this._centerMarker?.getLatLng();
    const B = this._hintMarker?.getLatLng();

    if (!A || !B) return;

    const distance = this._distanceCalculation(A, B);

    if (
      this.options[this._minRadiusOption] &&
      distance < (this.options[this._minRadiusOption] as number)
    ) {
      this._layer?.setRadius(this.options[this._minRadiusOption] as number);
    } else if (
      this.options[this._maxRadiusOption] &&
      distance > (this.options[this._maxRadiusOption] as number)
    ) {
      this._layer?.setRadius(this.options[this._maxRadiusOption] as number);
    } else {
      this._layer?.setRadius(distance);
    }
  },
  _syncHintMarker(this: IDrawCircleMarker, e: L.LeafletMouseEvent) {
    // move the cursor marker
    this._hintMarker?.setLatLng(e.latlng);
    // calculate the new latlng of marker if radius is out of min/max
    this._hintMarker?.setLatLng(this._getNewDestinationOfHintMarker());

    // if snapping is enabled, do it
    if (this.options.snappable) {
      const fakeDragEvent = e as L.LeafletEvent & { target: L.Marker };
      fakeDragEvent.target = this._hintMarker as L.Marker;
      this._handleSnapping(fakeDragEvent);
    }

    this._handleHintMarkerSnapping();

    const latlng =
      this._layerGroup &&
      this._centerMarker &&
      this._layerGroup.hasLayer(this._centerMarker)
        ? this._centerMarker.getLatLng()
        : this._hintMarker?.getLatLng();
    if (latlng) {
      this._fireChange(latlng, 'Draw');
    }
  },
  isRelevantMarker(this: IDrawCircleMarker, layer: L.Layer) {
    const pmLayer = layer as PMTempLayer & L.CircleMarker;
    return (
      layer instanceof L.CircleMarker &&
      !(layer instanceof L.Circle) &&
      pmLayer.pm &&
      !pmLayer._pmTempLayer
    );
  },
  _createMarker(this: IDrawCircleMarker, e: L.LeafletMouseEvent) {
    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker?._snapped &&
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
    if (!this._hintMarker?._snapped) {
      this._hintMarker?.setLatLng(e.latlng);
    }

    // get coordinate for new vertex by hintMarker (cursor marker)
    const latlng = this._hintMarker!.getLatLng();

    // create marker
    const marker = new this._BaseCircleClass(latlng, {
      radius: this._defaultRadius,
      ...this.options.pathOptions,
    }) as ExtendedCircleMarker;
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
  },
  _extendingCreateMarker(
    this: IDrawCircleMarker,
    marker: ExtendedCircleMarker
  ) {
    if (marker.pm && this.options.markerEditable) {
      // enable editing for the marker
      marker.pm.enable();
    }
  },
  _finishShape(this: IDrawCircleMarker, e?: L.LeafletMouseEvent) {
    // If snap finish is required but the last marker wasn't snapped, do not finish the shape!
    if (
      this.options.requireSnapToFinish &&
      !this._hintMarker?._snapped &&
      !this._isFirstLayer()
    ) {
      return;
    }

    // assign the coordinate of the click to the hintMarker, that's necessary for
    // mobile where the marker can't follow a cursor
    if (e?.latlng && !this._hintMarker?._snapped) {
      this._hintMarker?.setLatLng(e.latlng);
    }

    const center = this._centerMarker?.getLatLng();
    if (!center) return;

    let radius = this._defaultRadius;
    if (this.options[this._editableOption]) {
      // calc the radius
      const latlng = this._hintMarker?.getLatLng();
      if (latlng) {
        radius = this._distanceCalculation(center, latlng);
        if (
          this.options[this._minRadiusOption] &&
          radius < (this.options[this._minRadiusOption] as number)
        ) {
          radius = this.options[this._minRadiusOption] as number;
        } else if (
          this.options[this._maxRadiusOption] &&
          radius > (this.options[this._maxRadiusOption] as number)
        ) {
          radius = this.options[this._maxRadiusOption] as number;
        }
      }
    }

    const circleOptions = { ...this.options.pathOptions, radius };

    // create the final circle layer
    const circleLayer = new this._BaseCircleClass(
      center,
      circleOptions
    ) as ExtendedCircleMarker;
    this._setPane(circleLayer, 'layerPane');
    this._finishLayer(circleLayer);
    circleLayer.addTo(this._map.pm._getContainingLayer());

    if (circleLayer.pm) {
      // create polygon around the circle border
      circleLayer.pm._updateHiddenPolyCircle();
    }

    // fire the pm:create event and pass shape and layer
    this._fireCreate(circleLayer);

    const hintMarkerLatLng = this._hintMarker?.getLatLng();

    // disable drawing
    this.disable();
    if (this.options.continueDrawing) {
      this.enable();
      if (hintMarkerLatLng) {
        this._hintMarker?.setLatLng(hintMarkerLatLng);
      }
    }
  },
  _getNewDestinationOfHintMarker(this: IDrawCircleMarker): L.LatLng {
    let secondLatLng = this._hintMarker?.getLatLng();
    if (!secondLatLng) {
      return this._map.getCenter();
    }

    if (this.options[this._editableOption]) {
      if (!this._layerGroup?.hasLayer(this._centerMarker!)) {
        return secondLatLng;
      }

      const latlng = this._centerMarker?.getLatLng();
      if (!latlng) return secondLatLng;

      const distance = this._distanceCalculation(latlng, secondLatLng);

      if (
        this.options[this._minRadiusOption] &&
        distance < (this.options[this._minRadiusOption] as number)
      ) {
        secondLatLng = destinationOnLine(
          this._map,
          latlng,
          secondLatLng,
          this._getMinDistanceInMeter()
        );
      } else if (
        this.options[this._maxRadiusOption] &&
        distance > (this.options[this._maxRadiusOption] as number)
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
  },
  _getMinDistanceInMeter(this: IDrawCircleMarker): number {
    const centerLatLng = this._centerMarker?.getLatLng();
    if (!centerLatLng) return 0;

    return L.PM.Utils.pxRadiusToMeterRadius(
      this.options[this._minRadiusOption] as number,
      this._map,
      centerLatLng
    );
  },
  _getMaxDistanceInMeter(this: IDrawCircleMarker): number {
    const centerLatLng = this._centerMarker?.getLatLng();
    if (!centerLatLng) return 0;

    return L.PM.Utils.pxRadiusToMeterRadius(
      this.options[this._maxRadiusOption] as number,
      this._map,
      centerLatLng
    );
  },
  _handleHintMarkerSnapping(this: IDrawCircleMarker) {
    if (this.options[this._editableOption]) {
      if (this._hintMarker?._snapped) {
        const latlng = this._centerMarker?.getLatLng();
        const secondLatLng = this._hintMarker?.getLatLng();

        if (!latlng || !secondLatLng) return;

        const distance = this._distanceCalculation(latlng, secondLatLng);

        if (!this._layerGroup?.hasLayer(this._centerMarker!)) {
          // do nothing
        } else if (
          this.options[this._minRadiusOption] &&
          distance < (this.options[this._minRadiusOption] as number)
        ) {
          if (this._hintMarker._orgLatLng) {
            this._hintMarker?.setLatLng(this._hintMarker._orgLatLng);
          }
        } else if (
          this.options[this._maxRadiusOption] &&
          distance > (this.options[this._maxRadiusOption] as number)
        ) {
          if (this._hintMarker._orgLatLng) {
            this._hintMarker?.setLatLng(this._hintMarker._orgLatLng);
          }
        }
      }
      // calculate the new latlng of marker if the snapped latlng radius is out of min/max
      this._hintMarker?.setLatLng(this._getNewDestinationOfHintMarker());
    }
  },
  setStyle(this: IDrawCircleMarker) {
    const templineStyle: L.CircleMarkerOptions & { radius?: number } = {};
    L.extend(templineStyle, this.options.templineStyle);
    if (this.options[this._editableOption]) {
      templineStyle.radius = 0;
    }
    (this._layer as L.CircleMarker)?.setStyle(templineStyle);
    this._hintline?.setStyle(this.options.hintlineStyle || {});
  },
  _distanceCalculation(
    this: IDrawCircleMarker,
    A: L.LatLng,
    B: L.LatLng
  ): number {
    return this._map.project(A).distanceTo(this._map.project(B));
  },
});

// Assign to Draw class
(Draw as unknown as { CircleMarker: unknown }).CircleMarker = DrawCircleMarker;

export default DrawCircleMarker;
