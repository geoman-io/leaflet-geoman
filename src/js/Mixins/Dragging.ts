import * as L from 'leaflet';
/**
 * Extended PM map interface
 */
interface PMMap {}

/**
 * Extended dragging interface
 */
interface ExtendedDragging {
  _enabled: boolean;
  enable: () => void;
  disable: () => void;
}

/**
 * Extended layer with internal properties - using type intersection to avoid protected property issues
 */
type DraggableLayer = L.Layer & {
  _map: L.Map & {
    dragging: ExtendedDragging;
    pm: PMMap;
  };
  _path?: HTMLElement;
  _renderer?: { _container?: HTMLElement };
  _image?: HTMLElement;
  _icon?: HTMLElement | null;
  _radius?: number;
  _pxRadius?: number;
  _snapped?: boolean;
  _orgLatLng?: L.LatLng;
  dragging?: { disable: () => void };
  pm: LayerPM;
  getLatLng?: () => L.LatLng;
  options: L.LayerOptions & {
    resizeableCircle?: boolean;
    resizeableCircleMarker?: boolean;
    draggable?: boolean;
  };
};

/**
 * Layer PM properties
 */
interface LayerPM extends IDragMixin {
  options: {
    resizeableCircle?: boolean;
    resizeableCircleMarker?: boolean;
    draggable?: boolean;
    snappable?: boolean;
    syncLayersOnDrag?: boolean | L.Layer[];
  };
  _updateHiddenPolyCircle?: () => void;
  _disableSnapping?: () => void;
  _disableSnappingDrag?: () => void;
  getLayers?: (deep: boolean) => L.Layer[];
}

/**
 * Simulated event interface
 */
interface SimulatedEvent {
  originalEvent: PointerEvent;
  target: DraggableLayer;
  containerPoint?: L.Point;
  latlng?: L.LatLng;
  layer?: L.Layer;
}

/**
 * LatLng with optional altitude
 */
type CoordinateTree = LatLngWithAlt | CoordinateTree[];

interface LatLngWithAlt {
  lat: number;
  lng: number;
  alt?: number;
}

/**
 * Parent layer group record
 */
type ParentGroup = L.LayerGroup & { pm?: LayerPM };

type SyncLayer = L.Layer & { pm?: LayerPM; _snapped?: boolean };

/**
 * The groups that directly contain a layer, read from Leaflet each time:
 * FeatureGroups register themselves as event parents, and plain LayerGroups on
 * the map are checked with hasLayer.
 */
function getParentGroups(layer: L.Layer, map?: L.Map): ParentGroup[] {
  const parents = new Set<ParentGroup>(
    Object.values(
      (layer as { _eventParents?: Record<string, L.Evented> })._eventParents ||
        {}
    ).filter((p): p is ParentGroup => p instanceof L.LayerGroup)
  );
  map?.eachLayer((candidate) => {
    if (candidate instanceof L.LayerGroup && candidate.hasLayer(layer)) {
      parents.add(candidate as ParentGroup);
    }
  });
  return [...parents];
}

/**
 * Drag mixin context
 */
export interface DragMixinContext {
  _layer: DraggableLayer;
  _map: L.Map & {
    dragging: ExtendedDragging;
    pm: PMMap;
    getContainer: () => HTMLElement;

    containerPointToLatLng: (point: L.Point) => L.LatLng;
  };
  _layerDragEnabled: boolean;
  _layerDragged: boolean;
  _layerEdited: boolean;
  _discardAfterDrag?: boolean;
  unstable_discardChanges(): void;
  _dragging: boolean;
  _disableAfterDrag?: boolean;
  _tempDragCoord: L.LatLng | null | undefined;
  _shape: string;
  options: {
    draggable?: boolean;
    snappable?: boolean;
    syncLayersOnDrag?: boolean | L.Layer[];
  };
  disable: () => void;
  enabled: () => boolean;
  _fireDragEnable: () => void;
  _fireDragDisable: () => void;
  _fireDragStart: () => void;
  _fireDragEnd: () => void;
  _fireDrag: (e: SimulatedEvent) => void;
  _fireEdit: () => void;
  _editDrags: () => boolean;
  _suspendInteractions: (changedBy: 'drag') => void;
  _syncInteractions: (changedBy: 'drag') => void;
  _fireUpdate: () => void;
  _fireChange: (
    coords:
      | L.LatLng
      | L.LatLngBounds
      | L.LatLng[]
      | L.LatLng[][]
      | L.LatLng[][][],
    source: string
  ) => void;
  _initSnappableMarkers?: () => void;
  _disableSnapping?: () => void;
  _initSnappableMarkersDrag?: () => void;
}

/**
 * Drag mixin interface
 */
export interface IDragMixin {
  enableLayerDrag(): void;
  disableLayerDrag(): void;
  dragging(): boolean;
  layerDragEnabled(): boolean;
  _toDragEvent(e: PointerEvent): SimulatedEvent;
  _simulateMouseDownEvent(e: PointerEvent): boolean;
  _dragMixinOnMouseDown(e: SimulatedEvent): void;
  _dragMixinOnMouseMove(e: SimulatedEvent): void;
  _dragMixinOnMouseUp(e: SimulatedEvent): boolean;
  _dragSessionStart(e: SimulatedEvent, snap: boolean): void;
  _dragSessionMove(e: SimulatedEvent): void;
  _dragSessionEnd(e: SimulatedEvent): boolean;
  _activeDragSession?: DragSession<SimulatedEvent>;
  _onLayerDrag(e: SimulatedEvent): void;
  addDraggingClass(): void;
  removeDraggingClass(): void;
  _getDOMElem(): HTMLElement | null;
  _overwriteEventIfItComesFromMarker(e: SimulatedEvent): void;
  _layersToSync(): { found: boolean; synced: SyncLayer[] };
  _stopDOMImageDrag(e: Event): boolean;
}
import { getRenderer } from '../helpers';
import DragSession from '../helpers/DragSession';

const DragMixin: IDragMixin & ThisType<DragMixinContext & IDragMixin> = {
  enableLayerDrag() {
    // layer is not allowed to dragged or is not on the map
    if (!this.options.draggable || !this._layer._map) {
      return;
    }

    // before enabling layer drag, disable layer editing, unless the modes combine
    if (!this._layer._map.pm.getGlobalOptions().combineModes) {
      this.disable();
    }

    this._layerDragEnabled = true;

    // if layer never enabled and _map is not set (for snapping)
    if (!this._map) {
      this._map = this._layer._map;
    }

    if (
      this._layer instanceof L.Marker ||
      this._layer instanceof L.ImageOverlay
    ) {
      // prevents dragging the DOM image instead of the marker
      L.DomEvent.on(this._getDOMElem()!, 'dragstart', this._stopDOMImageDrag);
    }

    // Disable Leaflet Dragging of Markers
    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    // temporary coord variable for delta calculation
    this._tempDragCoord = null;

    // add CSS class
    if (getRenderer(this._layer) instanceof L.Canvas) {
      this._layer.on('pointerout', this.removeDraggingClass, this);
      this._layer.on('pointerover', this.addDraggingClass, this);
    } else {
      this.addDraggingClass();
    }

    const container = this._getDOMElem();

    // check if DOM element exists
    if (container) {
      // add mousedown event to trigger drag
      if (getRenderer(this._layer) instanceof L.Canvas) {
        this._layer.on(
          'pointerdown',
          this._dragMixinOnMouseDown as unknown as L.LeafletEventHandlerFn,
          this
        );
      } else {
        // listen on the layer's DOM element
        L.DomEvent.on(
          container,
          'pointerdown',
          this._simulateMouseDownEvent,
          this
        );
      }
    }

    this._fireDragEnable();
  },
  disableLayerDrag() {
    this._layerDragEnabled = false;

    // remove CSS class
    if (getRenderer(this._layer) instanceof L.Canvas) {
      this._layer.off('pointerout', this.removeDraggingClass, this);
      this._layer.off('pointerover', this.addDraggingClass, this);
    } else {
      this.removeDraggingClass();
    }

    // if the layer is dragged but now disabled, give the map its panning
    // back. The drag itself goes on until the pointer is released.
    if (this._dragging) {
      this._activeDragSession?.restoreMapPanning();
    }

    // Disable Leaflet Dragging of Markers
    if (this._layer.dragging) {
      this._layer.dragging.disable();
    }

    const container = this._getDOMElem();
    // check if DOM element exists
    if (container) {
      if (getRenderer(this._layer) instanceof L.Canvas) {
        this._layer.off(
          'pointerdown',
          this._dragMixinOnMouseDown as unknown as L.LeafletEventHandlerFn,
          this
        );
      } else {
        // disable mousedown event
        L.DomEvent.off(
          container,
          'pointerdown',
          this._simulateMouseDownEvent,
          this
        );
      }
    }

    if (this._layerDragged) {
      this._fireUpdate();
    }
    this._layerDragged = false;

    this._fireDragDisable();
  },
  // TODO: make this private in the next major release
  dragging() {
    return this._dragging;
  },
  layerDragEnabled() {
    return !!this._layerDragEnabled;
  },
  // Wraps a DOM pointer event in a Leaflet-style event with the pointer's
  // latlng, as the drag steps expect.
  _toDragEvent(e) {
    const map = this._map || this._layer._map;
    const containerPoint = map.pointerEventToContainerPoint(e);
    return {
      originalEvent: e,
      target: this._layer,
      containerPoint,
      latlng: map.containerPointToLatLng(containerPoint),
    };
  },
  _simulateMouseDownEvent(e) {
    this._dragMixinOnMouseDown(this._toDragEvent(e));
    return false;
  },
  // Starts one drag session for this layer and the layers synced with it.
  _dragMixinOnMouseDown(e) {
    // cancel if mouse button is NOT the left button
    if (e.originalEvent.button! > 0) {
      return;
    }
    this._overwriteEventIfItComesFromMarker(e);

    const { found, synced } = this._layersToSync();
    const participants = [this, ...synced.map((layer) => layer.pm!)];
    // A new press while a layer is still dragging restarts its drag from here.
    participants.forEach((pm) => pm._activeDragSession?.abandon(participants));

    // Snapping only for a layer dragged on its own.
    participants.forEach((pm) => pm._dragSessionStart(e, !found));

    DragSession.start(
      this._map || this._layer._map,
      participants,
      e.originalEvent.pointerId,
      (pointerEvent: PointerEvent) => this._toDragEvent(pointerEvent)
    );
  },
  _dragMixinOnMouseMove(e) {
    this._overwriteEventIfItComesFromMarker(e);
    const session = this._activeDragSession;
    if (session) {
      session.move(e);
    } else {
      // Called without a press first: move this layer only.
      this._dragSessionMove(e);
    }
  },
  _dragMixinOnMouseUp(e) {
    const session = this._activeDragSession;
    return session ? session.end(e) : this._dragSessionEnd(e);
  },
  _dragSessionStart(e, snap) {
    if (this._layer instanceof L.Marker) {
      if (this.options.snappable && snap) {
        this._initSnappableMarkers!();
      } else {
        this._disableSnapping!();
      }
    }

    // we need to disable snapping for CircleMarker because they are snapping because of the check in onLayerDrag -> if(_snapped)
    if (this._layer instanceof L.CircleMarker) {
      let _editableOption: 'resizeableCircleMarker' | 'resizeableCircle' =
        'resizeableCircleMarker';
      if (this._layer instanceof L.Circle) {
        _editableOption = 'resizeableCircle';
      }

      if (this.options.snappable && snap) {
        if (!this._layer.pm.options[_editableOption]) {
          this._initSnappableMarkersDrag!();
        }
      } else if (this._layer.pm.options[_editableOption]) {
        this._layer.pm._disableSnapping!();
      } else {
        this._layer.pm._disableSnappingDrag!();
      }
    }

    // save for delta calculation
    this._tempDragCoord = e.latlng;
  },
  _dragSessionMove(e) {
    if (!this._dragging) {
      // set state
      this._dragging = true;
      this._getDOMElem()?.classList.add('leaflet-pm-dragging');

      if (
        this._layer instanceof L.Path ||
        this._layer instanceof L.ImageOverlay
      ) {
        // bring it to front to prevent drag interception
        this._layer.bringToFront();
      }

      // fire pm:dragstart event
      this._fireDragStart();
      this._suspendInteractions('drag');
    }

    // if _tempDragCoord is null add the current latlng to prevent throwing a error. This can happen when for example the layer is removed and added to the map while dragging (MarkerCluster)
    if (!this._tempDragCoord) {
      this._tempDragCoord = e.latlng;
    }

    this._onLayerDrag(e);

    // update the hidden circle border after dragging
    if (this._layer instanceof L.CircleMarker) {
      this._layer.pm._updateHiddenPolyCircle!();
    }
  },
  _dragSessionEnd() {
    const el = this._getDOMElem();

    // if no drag happened, don't do anything
    if (!this._dragging) {
      return false;
    }

    // update the hidden circle border after dragging
    if (this._layer instanceof L.CircleMarker) {
      this._layer.pm._updateHiddenPolyCircle!();
    }

    this._layerDragged = true;

    // timeout to prevent click event after drag :-/
    // TODO: do it better as soon as leaflet has a way to do it better :-)
    window.setTimeout(() => {
      // set state
      this._dragging = false;
      // if the layer is not on the map, we have no DOM element
      if (el) {
        el.classList.remove('leaflet-pm-dragging');
      }

      // fire pm:dragend event
      this._fireDragEnd();

      // fire edit
      this._fireEdit();
      this._layerEdited = true;
      // the changes were discarded before this drag finished ending
      if (this._discardAfterDrag) {
        this._discardAfterDrag = false;
        this.unstable_discardChanges();
      }
      // edit was turned off during the drag, such as by Escape
      if (this._disableAfterDrag) {
        this._disableAfterDrag = false;
        this.disable();
      }
      this._syncInteractions('drag');
    }, 10);

    return true;
  },
  _onLayerDrag(e) {
    // latLng of mouse event
    const { latlng } = e;

    // delta coords (how far was dragged)
    const deltaLatLng = {
      lat: latlng!.lat - this._tempDragCoord!.lat,
      lng: latlng!.lng - this._tempDragCoord!.lng,
    };

    // A vetoed frame keeps _tempDragCoord, so the next one catches up
    if (
      this._map.pm.unstable_validators.length &&
      !this._map.pm._isValidChange({
        action: 'drag',
        shape: this._shape,
        layer: this._layer,
        delta: deltaLatLng,
      })
    ) {
      return;
    }

    // move the coordinates by the delta
    const moveCoords = (coords: CoordinateTree[]): CoordinateTree[] =>
      // alter the coordinates
      coords.map((currentLatLng) => {
        if (Array.isArray(currentLatLng)) {
          // do this recursively as coords might be nested
          return moveCoords(currentLatLng);
        }

        // move the coord and return it
        const newLatlng: LatLngWithAlt = {
          lat: currentLatLng.lat + deltaLatLng.lat,
          lng: currentLatLng.lng + deltaLatLng.lng,
        };

        if (currentLatLng.alt || currentLatLng.alt === 0) {
          newLatlng.alt = currentLatLng.alt;
        }
        return newLatlng;
      });

    if (
      (this._layer instanceof L.Circle &&
        this._layer.options.resizeableCircle) ||
      (this._layer instanceof L.CircleMarker &&
        this._layer.options.resizeableCircleMarker)
    ) {
      // create the new coordinates array
      const newCoords = moveCoords([this._layer.getLatLng()]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0] as L.LatLngLiteral);
      this._fireChange(this._layer.getLatLng(), 'Edit');
    } else if (
      this._layer instanceof L.CircleMarker ||
      this._layer instanceof L.Marker
    ) {
      let coordsRefernce = this._layer.getLatLng();
      if (this._layer._snapped) {
        // if layer is snapped we use the original latlng for re-calculation, else the layer will not be "unsnappable" anymore
        coordsRefernce = this._layer._orgLatLng!;
      }
      // create the new coordinates array
      const newCoords = moveCoords([coordsRefernce]);
      // set new coordinates and redraw
      this._layer.setLatLng(newCoords[0] as L.LatLngLiteral);
      this._fireChange(this._layer.getLatLng(), 'Edit');
    } else if (this._layer instanceof L.ImageOverlay) {
      // create the new coordinates array
      const newCoords = moveCoords([
        this._layer.getBounds().getNorthWest(),
        this._layer.getBounds().getSouthEast(),
      ]);
      // set new coordinates and redraw
      this._layer.setBounds(newCoords as L.LatLngLiteral[]);
      this._fireChange(this._layer.getBounds(), 'Edit');
    } else if (this._layer instanceof L.Polyline) {
      // create the new coordinates array
      const newCoords = moveCoords(this._layer.getLatLngs());

      // set new coordinates and redraw
      this._layer.setLatLngs(newCoords as L.LatLngLiteral[]);
      this._fireChange(this._layer.getLatLngs(), 'Edit');
    }

    // save current latlng for next delta calculation
    this._tempDragCoord = latlng;

    e.layer = this._layer;
    // fire pm:dragstart event
    this._fireDrag(e);
  },
  addDraggingClass() {
    const el = this._getDOMElem();
    if (el) {
      el!.classList.add('leaflet-pm-draggable');
    }
  },
  removeDraggingClass() {
    const el = this._getDOMElem();
    if (el) {
      el.classList.remove('leaflet-pm-draggable');
    }
  },
  _getDOMElem() {
    let el: HTMLElement | null = null;
    if (this._layer._path) {
      el = this._layer._path;
    } else if (this._layer._renderer && this._layer._renderer._container) {
      el = this._layer._renderer._container;
    } else if (this._layer._image) {
      el = this._layer._image;
    } else if (this._layer._icon) {
      el = this._layer._icon;
    }
    return el;
  },
  _overwriteEventIfItComesFromMarker(e) {
    // e.latlng is not the clicked latlng if the layer is a Marker (or the radius below 10) -> Leaflet definition
    // https://github.com/Leaflet/Leaflet/blob/0f904a515879fcd08f69b7f51799ee7f18f23fd8/src/map/Map.js#L1416
    const isMarker =
      e.target.getLatLng && (!e.target._pxRadius || e.target._pxRadius <= 10);
    if (isMarker) {
      // we want the clicked latlng / point, so we overwrite the property e.latlng
      e.containerPoint = this._map.pointerEventToContainerPoint(
        e.originalEvent
      );
      e.latlng = this._map.containerPointToLatLng(e.containerPoint);
    }
  },
  // The layers that move with this one. `found` also counts this layer and
  // groups, as it decides whether snapping runs, like before.
  _layersToSync() {
    // if layer is in Edit-Mode it should not be possible to drag other layers too. (Marker & CircleMarker & ImageOverlay)
    // With combineModes, a shape in edit mode keeps dragging its group.
    const editing =
      this.enabled() &&
      (!this._layer._map?.pm.getGlobalOptions().combineModes ||
        this._editDrags());
    if (editing || !this.options.syncLayersOnDrag) {
      return { found: false, synced: [] };
    }
    let layersToSync: SyncLayer[] = [];
    if (Array.isArray(this.options.syncLayersOnDrag)) {
      layersToSync = this.options.syncLayersOnDrag;
      this.options.syncLayersOnDrag.forEach((layer) => {
        if (layer instanceof L.LayerGroup) {
          layersToSync = layersToSync.concat(layer.pm.getLayers(true));
        }
      });
    } else if (this.options.syncLayersOnDrag === true) {
      // A layer can belong to several groups. Drag the layers of all of them.
      getParentGroups(this._layer, this._map).forEach((lg) => {
        if (lg.pm) {
          layersToSync = layersToSync.concat(lg.pm.getLayers!(true));
        }
      });
    }
    // filter out layers that don't have leaflet-geoman and not allowed to drag.
    // A layer shared by two groups must move once, not once per group.
    const found = Array.from(new Set(layersToSync)).filter(
      (layer) => !!layer.pm && !!layer.pm.options?.draggable
    );
    const synced = found.filter(
      (layer) =>
        layer !== this._layer &&
        typeof layer.pm!._dragSessionStart === 'function'
    );
    synced.forEach((layer) => {
      layer._snapped = false;
    });
    return { found: found.length > 0, synced };
  },
  _stopDOMImageDrag(e) {
    e.preventDefault();
    return false;
  },
};

export default DragMixin;
