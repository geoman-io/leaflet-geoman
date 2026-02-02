import Edit, { EditOptions } from './L.PM.Edit';
import { destinationOnLine } from '../helpers';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    Utils: {
      pxRadiusToMeterRadius: (
        radius: number,
        map: L.Map,
        center: L.LatLng
      ) => number;
      circleToPolygon: (
        circle: L.Circle,
        sides: number,
        withBearing: boolean
      ) => L.Polygon;
    };
    Draw: {
      CircleMarker: {
        _layerIsDragging?: boolean;
      };
    };
  };
  Util: {
    setOptions: <T extends { options: object }>(
      obj: T,
      options: object
    ) => void;
  };
  DomUtil: {
    addClass: (el: HTMLElement, name: string) => void;
  };
};

/**
 * Extended map with PM
 */
type ExtendedMap = L.Map & {
  pm: {
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    Draw: {
      CircleMarker: {
        _layerIsDragging?: boolean;
      };
    };
    _isCRSSimple: () => boolean;
  };
};

/**
 * Extended circle marker layer
 */
type ExtendedCircleMarker = L.CircleMarker & {
  _map: ExtendedMap;
  _radius: number;
};

/**
 * Extended marker for editing
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _origLatLng?: L.LatLng;
  _icon?: HTMLElement;
  _snapped?: boolean;
  _orgLatLng?: L.LatLng;
  _latlng?: L.LatLng;
  _cancelDragEventChain?: L.LatLng | null;
  _dragging?: boolean;
  update?: () => void;
  dragging: {
    disable: () => void;
    enable: () => void;
  };
};

/**
 * Extended feature group
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
};

/**
 * Extended polyline for hintline
 */
type ExtendedPolyline = L.Polyline & {
  _pmTempLayer?: boolean;
};

/**
 * Extended polygon for hidden circle
 */
type ExtendedPolygon = L.Polygon & {
  _parentCopy?: ExtendedCircleMarker;
};

/**
 * PM layer with temp flag
 */
type PMTempLayer = L.Layer & {
  _pmTempLayer?: boolean;
  options: L.LayerOptions & {
    pane?: string;
  };
};

/**
 * Circle marker edit options
 */
interface CircleMarkerEditOptions extends EditOptions {
  draggable?: boolean;
  hintlineStyle?: L.PolylineOptions;
  editable?: boolean;
  resizeableCircleMarker?: boolean;
  minRadiusCircleMarker?: number | null;
  maxRadiusCircleMarker?: number | null;
}

/**
 * Edit CircleMarker interface
 */
interface IEditCircleMarker {
  _shape: string;
  _layer: ExtendedCircleMarker;
  _map: ExtendedMap;
  _enabled: boolean;
  _layerEdited?: boolean;
  _helperLayers: ExtendedFeatureGroup;
  _markers: ExtendedMarker[];
  _centerMarker: ExtendedMarker;
  _outerMarker: ExtendedMarker;
  _hintline: ExtendedPolyline;
  _hiddenPolyCircle?: ExtendedPolygon;
  _minRadiusOption: string;
  _maxRadiusOption: string;
  _editableOption: string;
  options: CircleMarkerEditOptions;

  enable(options?: Partial<CircleMarkerEditOptions>): void;
  disable(): void;
  enabled(): boolean;
  toggleEdit(options?: Partial<CircleMarkerEditOptions>): void;
  applyOptions(): void;
  _extendingEnable(): void;
  _extendingDisable(): void;
  _extendingApplyOptions(): void;
  _initMarkers(): void;
  _getLatLngOnCircle(center: L.LatLng, radius: number): L.LatLng;
  _createHintLine(markerA: ExtendedMarker, markerB: ExtendedMarker): void;
  _createCenterMarker(latlng: L.LatLng): ExtendedMarker;
  _createOuterMarker(latlng: L.LatLng): ExtendedMarker;
  _createMarker(latlng: L.LatLng): ExtendedMarker;
  _moveCircle(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _syncMarkers(): void;
  _resizeCircle(): void;
  _syncCircleRadius(): void;
  _syncHintLine(): void;
  _removeMarker(): void;
  _onDragStart(): void;
  _onMarkerDragStart(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _onMarkerDrag(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _onMarkerDragEnd(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _extedingMarkerDragEnd(): void;
  _initSnappableMarkersDrag(): void;
  _disableSnappingDrag(): void;
  _updateHiddenPolyCircle(): void;
  _getNewDestinationOfOuterMarker(): L.LatLng;
  _handleOuterMarkerSnapping(): void;
  _distanceCalculation(A: L.LatLng, B: L.LatLng): number;
  _getMinDistanceInMeter(latlng: L.LatLng): number;
  _getMaxDistanceInMeter(latlng: L.LatLng): number;
  _onVertexClick(e: L.LeafletEvent & { target: ExtendedMarker }): void;

  // From parent / mixins
  _setPane(layer: PMTempLayer, type: 'layerPane' | 'vertexPane' | 'markerPane'): void;
  _fireEnable(): void;
  _fireDisable(): void;
  _fireUpdate(): void;
  _fireEdit(): void;
  _fireChange(latlng: L.LatLng, source: string): void;
  _fireCenterPlaced(source: string): void;
  _fireRemove(layerOrMap: L.Layer | L.Map, layer?: L.Layer): void;
  _fireMarkerDragStart(e: L.LeafletEvent): void;
  _fireMarkerDrag(e: L.LeafletEvent): void;
  _fireMarkerDragEnd(e: L.LeafletEvent): void;
  _fireVertexClick(e: L.LeafletEvent, indexPath: number[] | undefined): void;
  _initSnappableMarkers(): void;
  _disableSnapping(): void;
  _handleSnapping(e: L.LeafletEvent): void;
  _cleanupSnapping(): void;
  _unsnap(e: L.LeafletEvent): void;
  _vertexValidation(
    type: 'move' | 'add' | 'remove',
    e: L.LeafletEvent & { target: ExtendedMarker }
  ): boolean;
  _vertexValidationDrag(marker: ExtendedMarker): boolean;
  _vertexValidationDragEnd(marker: ExtendedMarker): boolean;
  dragging(): boolean;
  layerDragEnabled(): boolean;
  disableLayerDrag(): void;
  enableLayerDrag(): void;
}

const EditCircleMarker = (
  Edit as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'CircleMarker',
  initialize(this: IEditCircleMarker, layer: L.CircleMarker) {
    this._layer = layer as ExtendedCircleMarker;
    this._enabled = false;

    this._minRadiusOption = 'minRadiusCircleMarker';
    this._maxRadiusOption = 'maxRadiusCircleMarker';
    this._editableOption = 'resizeableCircleMarker';

    // create polygon around the circle border
    this._updateHiddenPolyCircle();
  },
  // TODO: remove default option in next major Release
  enable(
    this: IEditCircleMarker,
    options: Partial<CircleMarkerEditOptions> = { draggable: true, snappable: true }
  ) {
    L.Util.setOptions(this, options);
    // TODO: remove with next major release
    if (this.options.editable) {
      this.options.resizeableCircleMarker = this.options.editable;
      delete this.options.editable;
    }

    // layer is not allowed to edit
    // cancel when map isn't available, this happens when it is removed before this fires
    if (!this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }

    this._map = this._layer._map as unknown as ExtendedMap;

    if (this.enabled()) {
      // if it was already enabled, disable first
      // we don't block enabling again because new options might be passed
      this.disable();
    }
    this.applyOptions();

    // if shape gets removed from map, disable edit mode
    this._layer.on('remove', this.disable, this);

    // change state
    this._enabled = true;

    this._extendingEnable();

    // create polygon around the circle border
    this._updateHiddenPolyCircle();

    this._fireEnable();
  },
  _extendingEnable(this: IEditCircleMarker) {
    // if CircleMarker is dragged while draw mode
    this._layer.on('pm:dragstart', this._onDragStart, this);
    this._layer.on(
      'pm:drag',
      this._onMarkerDrag as L.LeafletEventHandlerFn,
      this
    );
    this._layer.on(
      'pm:dragend',
      this._onMarkerDragEnd as L.LeafletEventHandlerFn,
      this
    );
  },
  disable(this: IEditCircleMarker) {
    // prevent disabling if layer is being dragged
    if (this.dragging()) {
      return;
    }

    // Add map if it is not already set. This happens when disable() is called before enable()
    if (!this._map) {
      this._map = this._layer._map as unknown as ExtendedMap;
    }

    if (!this._map) {
      return;
    }

    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return;
    }

    // disable dragging of non-editable circle
    if (this.layerDragEnabled()) {
      this.disableLayerDrag();
    }
    if (this._helperLayers) {
      this._helperLayers.clearLayers();
      this._helperLayers.removeFrom(this._map);
    }
    if (this.options[this._editableOption as keyof CircleMarkerEditOptions]) {
      this._map.off('move', this._syncMarkers, this);
      this._outerMarker.off('drag', this._handleOuterMarkerSnapping, this);
    } else {
      this._map.off('move', this._updateHiddenPolyCircle, this);
    }

    this._extendingDisable();

    this._layer.off('remove', this.disable, this);

    if (this._layerEdited) {
      this._fireUpdate();
    }
    this._layerEdited = false;
    this._fireDisable();

    this._enabled = false;
  },
  _extendingDisable(this: IEditCircleMarker) {
    this._layer.off('contextmenu', this._removeMarker, this);
  },
  enabled(this: IEditCircleMarker) {
    return this._enabled;
  },
  toggleEdit(this: IEditCircleMarker, options?: Partial<CircleMarkerEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  applyOptions(this: IEditCircleMarker) {
    if (this.options[this._editableOption as keyof CircleMarkerEditOptions]) {
      this._initMarkers();
      this._map.on('move', this._syncMarkers, this);

      // init snapping in different ways
      if (this.options.snappable) {
        this._initSnappableMarkers();
        // update marker latlng when snapped latlng radius is out of min/max
        this._outerMarker.on('drag', this._handleOuterMarkerSnapping, this);
        // sync the hintline with hint marker
        this._outerMarker.on('move', this._syncHintLine, this);
        this._outerMarker.on('move', this._syncCircleRadius, this);
      } else {
        this._disableSnapping();
      }
    } else {
      if (this.options.draggable) {
        this.enableLayerDrag();
      }
      // only update the circle border poly
      this._map.on('move', this._updateHiddenPolyCircle, this);

      if (this.options.snappable) {
        this._initSnappableMarkersDrag();
      } else {
        this._disableSnappingDrag();
      }
    }

    this._extendingApplyOptions();
  },
  _extendingApplyOptions(this: IEditCircleMarker) {
    // enable removal for the marker
    if (!this.options.preventMarkerRemoval) {
      this._layer.on('contextmenu', this._removeMarker, this);
    }
  },
  _initMarkers(this: IEditCircleMarker) {
    const map = this._map;

    // cleanup old ones first
    if (this._helperLayers) {
      this._helperLayers.removeFrom(map);
      this._helperLayers.clearLayers();
    }

    // add markerGroup to map, markerGroup includes regular and middle markers
    this._helperLayers = new L.FeatureGroup() as ExtendedFeatureGroup;
    this._helperLayers._pmTempLayer = true;
    this._helperLayers.addTo(map);

    // create marker for each coordinate
    const center = this._layer.getLatLng();
    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);

    this._centerMarker = this._createCenterMarker(center);
    this._outerMarker = this._createOuterMarker(outer);
    this._markers = [this._centerMarker, this._outerMarker];
    this._createHintLine(this._centerMarker, this._outerMarker);
  },
  _getLatLngOnCircle(this: IEditCircleMarker, center: L.LatLng, radius: number) {
    const pointA = this._map.project(center);
    const pointB = L.point(pointA.x + radius, pointA.y);
    return this._map.unproject(pointB);
  },
  _createHintLine(
    this: IEditCircleMarker,
    markerA: ExtendedMarker,
    markerB: ExtendedMarker
  ) {
    const A = markerA.getLatLng();
    const B = markerB.getLatLng();
    this._hintline = L.polyline(
      [A, B],
      this.options.hintlineStyle
    ) as ExtendedPolyline;
    this._setPane(this._hintline as PMTempLayer, 'layerPane');
    this._hintline._pmTempLayer = true;
    this._helperLayers.addLayer(this._hintline);
  },
  _createCenterMarker(this: IEditCircleMarker, latlng: L.LatLng): ExtendedMarker {
    const marker = this._createMarker(latlng);
    if (this.options.draggable) {
      L.DomUtil.addClass(marker._icon!, 'leaflet-pm-draggable');
      marker.on('move', this._moveCircle as L.LeafletEventHandlerFn, this);
    } else {
      marker.dragging.disable();
    }
    return marker;
  },
  _createOuterMarker(this: IEditCircleMarker, latlng: L.LatLng): ExtendedMarker {
    const marker = this._createMarker(latlng);
    marker.on('drag', this._resizeCircle, this);
    return marker;
  },
  _createMarker(this: IEditCircleMarker, latlng: L.LatLng): ExtendedMarker {
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: 'marker-icon' }),
    }) as ExtendedMarker;
    this._setPane(marker as PMTempLayer, 'vertexPane');

    marker._origLatLng = latlng;
    marker._pmTempLayer = true;

    marker.on(
      'dragstart',
      this._onMarkerDragStart as L.LeafletEventHandlerFn,
      this
    );
    marker.on('drag', this._onMarkerDrag as L.LeafletEventHandlerFn, this);
    marker.on('dragend', this._onMarkerDragEnd as L.LeafletEventHandlerFn, this);
    marker.on('click', this._onVertexClick as L.LeafletEventHandlerFn, this);

    this._helperLayers.addLayer(marker);

    return marker;
  },

  _moveCircle(
    this: IEditCircleMarker,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    const draggedMarker = e.target;
    if (draggedMarker._cancelDragEventChain) {
      return;
    }

    const center = this._centerMarker.getLatLng();
    this._layer.setLatLng(center);

    const radius = this._layer._radius;

    const outer = this._getLatLngOnCircle(center, radius);
    // don't call .setLatLng() because it fires the `move` event and then the radius is changed because of _syncCircleRadius #892
    this._outerMarker._latlng = outer;
    this._outerMarker.update?.();
    this._syncHintLine();

    this._updateHiddenPolyCircle();

    this._fireCenterPlaced('Edit');
    this._fireChange(this._layer.getLatLng(), 'Edit');
  },
  _syncMarkers(this: IEditCircleMarker) {
    const center = this._layer.getLatLng();
    const radius = this._layer._radius;
    const outer = this._getLatLngOnCircle(center, radius);
    this._outerMarker.setLatLng(outer);
    this._centerMarker.setLatLng(center);
    this._syncHintLine();
    this._updateHiddenPolyCircle();
  },
  _resizeCircle(this: IEditCircleMarker) {
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
    this._syncHintLine();
    this._syncCircleRadius();
  },
  _syncCircleRadius(this: IEditCircleMarker) {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();

    const distance = this._distanceCalculation(A, B);

    const minRadius = this.options[
      this._minRadiusOption as keyof CircleMarkerEditOptions
    ] as number | null | undefined;
    const maxRadius = this.options[
      this._maxRadiusOption as keyof CircleMarkerEditOptions
    ] as number | null | undefined;

    if (minRadius && distance < minRadius) {
      this._layer.setRadius(minRadius);
    } else if (maxRadius && distance > maxRadius) {
      this._layer.setRadius(maxRadius);
    } else {
      this._layer.setRadius(distance);
    }

    this._updateHiddenPolyCircle();
    this._fireChange(this._layer.getLatLng(), 'Edit');
  },
  _syncHintLine(this: IEditCircleMarker) {
    const A = this._centerMarker.getLatLng();
    const B = this._outerMarker.getLatLng();
    // set coords for hintline from marker to last vertex of drawin polyline
    this._hintline.setLatLngs([A, B]);
  },
  _removeMarker(this: IEditCircleMarker) {
    if (this.options[this._editableOption as keyof CircleMarkerEditOptions]) {
      this.disable();
    }
    this._layer.remove();
    this._fireRemove(this._layer);
    this._fireRemove(this._map, this._layer);
  },
  _onDragStart(this: IEditCircleMarker) {
    this._map.pm.Draw.CircleMarker._layerIsDragging = true;
  },
  _onMarkerDragStart(
    this: IEditCircleMarker,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    if (!this._vertexValidation('move', e)) {
      return;
    }

    this._fireMarkerDragStart(e);
  },
  _onMarkerDrag(
    this: IEditCircleMarker,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    // dragged marker
    const draggedMarker = e.target;
    if (
      draggedMarker instanceof L.Marker &&
      !this._vertexValidationDrag(draggedMarker as ExtendedMarker)
    ) {
      return;
    }

    this._fireMarkerDrag(e);
  },
  _onMarkerDragEnd(
    this: IEditCircleMarker,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    this._extedingMarkerDragEnd();

    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDragEnd(draggedMarker)) {
      return;
    }
    if (this.options[this._editableOption as keyof CircleMarkerEditOptions]) {
      this._fireEdit();
      this._layerEdited = true;
    }
    this._fireMarkerDragEnd(e);
  },
  _extedingMarkerDragEnd(this: IEditCircleMarker) {
    this._map.pm.Draw.CircleMarker._layerIsDragging = false;
  },
  // _initSnappableMarkers when option editable is not true
  _initSnappableMarkersDrag(this: IEditCircleMarker) {
    const marker = this._layer;

    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.on('pm:drag', this._handleSnapping, this);

    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.on('pm:dragend', this._cleanupSnapping, this);

    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  },
  // _disableSnapping when option editable is not true
  _disableSnappingDrag(this: IEditCircleMarker) {
    const marker = this._layer;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  },
  _updateHiddenPolyCircle(this: IEditCircleMarker) {
    const map = this._layer._map || this._map;
    if (map) {
      const radius = L.PM.Utils.pxRadiusToMeterRadius(
        this._layer.getRadius(),
        map,
        this._layer.getLatLng()
      );
      const _layer = L.circle(this._layer.getLatLng(), this._layer.options);
      _layer.setRadius(radius);

      const crsSimple = map && map.pm._isCRSSimple();
      if (this._hiddenPolyCircle) {
        this._hiddenPolyCircle.setLatLngs(
          L.PM.Utils.circleToPolygon(_layer, 200, !crsSimple).getLatLngs()
        );
      } else {
        this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(
          _layer,
          200,
          !crsSimple
        ) as ExtendedPolygon;
      }

      if (!this._hiddenPolyCircle._parentCopy) {
        this._hiddenPolyCircle._parentCopy = this._layer;
      }
    }
  },
  _getNewDestinationOfOuterMarker(this: IEditCircleMarker) {
    const latlng = this._centerMarker.getLatLng();
    let secondLatLng = this._outerMarker.getLatLng();

    const distance = this._distanceCalculation(latlng, secondLatLng);

    const minRadius = this.options[
      this._minRadiusOption as keyof CircleMarkerEditOptions
    ] as number | null | undefined;
    const maxRadius = this.options[
      this._maxRadiusOption as keyof CircleMarkerEditOptions
    ] as number | null | undefined;

    if (minRadius && distance < minRadius) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this._getMinDistanceInMeter(latlng)
      );
    } else if (maxRadius && distance > maxRadius) {
      secondLatLng = destinationOnLine(
        this._map,
        latlng,
        secondLatLng,
        this._getMaxDistanceInMeter(latlng)
      );
    }
    return secondLatLng;
  },
  _handleOuterMarkerSnapping(this: IEditCircleMarker) {
    if (this._outerMarker._snapped) {
      const latlng = this._centerMarker.getLatLng();
      const secondLatLng = this._outerMarker.getLatLng();
      const distance = this._distanceCalculation(latlng, secondLatLng);

      const minRadius = this.options[
        this._minRadiusOption as keyof CircleMarkerEditOptions
      ] as number | null | undefined;
      const maxRadius = this.options[
        this._maxRadiusOption as keyof CircleMarkerEditOptions
      ] as number | null | undefined;

      if (minRadius && distance < minRadius) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng!);
      } else if (maxRadius && distance > maxRadius) {
        this._outerMarker.setLatLng(this._outerMarker._orgLatLng!);
      }
    }
    // calculate the new latlng of marker if radius is out of min/max
    this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
  },
  _distanceCalculation(this: IEditCircleMarker, A: L.LatLng, B: L.LatLng) {
    return this._map.project(A).distanceTo(this._map.project(B));
  },
  _getMinDistanceInMeter(this: IEditCircleMarker, latlng: L.LatLng) {
    return L.PM.Utils.pxRadiusToMeterRadius(
      this.options[this._minRadiusOption as keyof CircleMarkerEditOptions] as number,
      this._map,
      latlng
    );
  },
  _getMaxDistanceInMeter(this: IEditCircleMarker, latlng: L.LatLng) {
    return L.PM.Utils.pxRadiusToMeterRadius(
      this.options[this._maxRadiusOption as keyof CircleMarkerEditOptions] as number,
      this._map,
      latlng
    );
  },
  _onVertexClick(
    this: IEditCircleMarker,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    const vertex = e.target;
    if (vertex._dragging) {
      return;
    }

    this._fireVertexClick(e, undefined);
  },
});

// Assign to Edit class
(Edit as unknown as { CircleMarker: unknown }).CircleMarker = EditCircleMarker;

export default EditCircleMarker;
