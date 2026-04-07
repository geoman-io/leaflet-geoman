// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js
import Edit, { EditOptions } from './L.PM.Edit';
import EditPolygon from './L.PM.Edit.Polygon';
import { calcAngle } from '../helpers';

// Declare the global L
declare const L: typeof import('leaflet') & {
  PM: {
    Utils: {
      findDeepMarkerIndex: (
        markers: ExtendedMarker[][],
        marker: ExtendedMarker
      ) => { indexPath: number[]; index: number; parentPath: number[] };
      _getRotatedRectangle: (
        A: L.LatLng,
        B: L.LatLng,
        rotation: number,
        map: L.Map
      ) => L.LatLng[];
    };
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
  };
};

/**
 * Extended marker for rectangle corners
 */
type ExtendedMarker = L.Marker & {
  _pmTempLayer?: boolean;
  _origLatLng?: L.LatLng;
  _index?: number;
  _oppositeCornerLatLng?: L.LatLng;
  _snapped?: boolean;
  _latlng?: L.LatLng;
  _cancelDragEventChain?: L.LatLng | null;
  update?: () => void;
};

/**
 * Extended rectangle layer
 */
type ExtendedRectangle = L.Rectangle & {
  _map: ExtendedMap;
  redraw: () => void;
};

/**
 * Extended feature group
 */
type ExtendedFeatureGroup = L.FeatureGroup & {
  _pmTempLayer?: boolean;
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
 * Edit Rectangle interface
 */
interface IEditRectangle {
  _shape: string;
  _layer: ExtendedRectangle;
  _map: ExtendedMap;
  _markerGroup: ExtendedFeatureGroup;
  _markers: ExtendedMarker[][];
  _cornerMarkers: ExtendedMarker[];
  _layerEdited?: boolean;
  _angle?: number;
  options: EditOptions;

  _initMarkers(): void;
  applyOptions(): void;
  _createMarker(latlng: L.LatLng, index: number): ExtendedMarker;
  _addMarkerEvents(): void;
  _removeMarker(): null;
  _onMarkerDragStart(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _onMarkerDrag(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _onMarkerDragEnd(e: L.LeafletEvent & { target: ExtendedMarker }): void;
  _adjustRectangleForMarkerMove(movedMarker: ExtendedMarker): void;
  _adjustAllMarkers(movedMarker: ExtendedMarker): void;
  _findCorners(): L.LatLng[];

  // From parent / mixins
  _setPane(
    layer: PMTempLayer,
    type: 'layerPane' | 'vertexPane' | 'markerPane'
  ): void;
  _initSnappableMarkers(): void;
  _disableSnapping(): void;
  _onVertexClick(e: L.LeafletEvent): void;
  _fireMarkerDragStart(e: L.LeafletEvent, indexPath: number[]): void;
  _fireMarkerDrag(e: L.LeafletEvent, indexPath: number[]): void;
  _fireMarkerDragEnd(
    e: L.LeafletEvent,
    indexPath: number[],
    intersectionReset?: boolean
  ): void;
  _fireEdit(): void;
  _fireChange(latlngs: L.LatLng[] | L.LatLng[][], source: string): void;
  _vertexValidation(
    type: 'move' | 'add' | 'remove',
    e: L.LeafletEvent & { target: ExtendedMarker }
  ): boolean;
  _vertexValidationDrag(marker: ExtendedMarker): boolean;
  _vertexValidationDragEnd(marker: ExtendedMarker): boolean;
  getAngle(): number;
  setInitAngle(angle: number): void;
}

const EditRectangle = (
  EditPolygon as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'Rectangle',
  // initializes Rectangle Markers
  _initMarkers(this: IEditRectangle) {
    const map = this._map;
    const corners = this._findCorners();

    // cleanup old ones first
    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    }

    // add markerGroup to map, markerGroup includes regular and middle markers
    this._markerGroup = new L.FeatureGroup() as ExtendedFeatureGroup;
    this._markerGroup._pmTempLayer = true;
    map.addLayer(this._markerGroup);

    // create markers for four corners of rectangle
    this._markers = [];

    // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed
    this._markers[0] = corners.map(this._createMarker, this);

    // convenience alias, for better readability
    [this._cornerMarkers] = this._markers;

    // Update the marker latlngs if the rectangle is rotated
    (this._layer.getLatLngs()[0] as L.LatLng[]).forEach(
      (latlng: L.LatLng, index: number) => {
        const marker = this._cornerMarkers.find((m) => m._index === index);
        if (marker) {
          marker.setLatLng(latlng);
        }
      }
    );
  },
  applyOptions(this: IEditRectangle) {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
    this._addMarkerEvents();
  },

  // creates initial markers for coordinates
  _createMarker(
    this: IEditRectangle,
    latlng: L.LatLng,
    index: number
  ): ExtendedMarker {
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: 'marker-icon' }),
    }) as ExtendedMarker;
    this._setPane(marker as PMTempLayer, 'vertexPane');

    marker._origLatLng = latlng;
    marker._index = index;
    marker._pmTempLayer = true;

    marker.on('click', this._onVertexClick, this);

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // Add marker events after adding the snapping events to the markers, beacause of the execution order
  _addMarkerEvents(this: IEditRectangle) {
    this._markers[0].forEach((marker) => {
      marker.on(
        'dragstart',
        this._onMarkerDragStart as L.LeafletEventHandlerFn,
        this
      );
      marker.on('drag', this._onMarkerDrag as L.LeafletEventHandlerFn, this);
      marker.on(
        'dragend',
        this._onMarkerDragEnd as L.LeafletEventHandlerFn,
        this
      );

      // TODO: Can we remove this? The _removeMarker Event is a empty function
      if (!this.options.preventMarkerRemoval) {
        marker.on('contextmenu', this._removeMarker, this);
      }
    });
  },
  // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
  // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
  _removeMarker(): null {
    // The method, it does nothing!!!
    return null;
  },

  _onMarkerDragStart(
    this: IEditRectangle,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    if (!this._vertexValidation('move', e)) {
      return;
    }

    // dragged marker
    const draggedMarker = e.target;
    // Store/update a reference to marker in opposite corner
    const corners = this._cornerMarkers;
    draggedMarker._oppositeCornerLatLng = corners
      .find((m) => m._index === (draggedMarker._index! + 2) % 4)!
      .getLatLng();

    // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
    // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)
    draggedMarker._snapped = false;

    const { indexPath } = L.PM.Utils.findDeepMarkerIndex(
      this._markers,
      draggedMarker
    );

    this._fireMarkerDragStart(e, indexPath);
  },

  _onMarkerDrag(
    this: IEditRectangle,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    // dragged marker
    const draggedMarker = e.target;

    if (!this._vertexValidationDrag(draggedMarker)) {
      return;
    }

    // only continue if this is NOT a middle marker (should NEVER be one, but this is just a safety check)
    if (draggedMarker._index === undefined) {
      return;
    }

    this._adjustRectangleForMarkerMove(draggedMarker);

    const { indexPath } = L.PM.Utils.findDeepMarkerIndex(
      this._markers,
      draggedMarker
    );
    this._fireMarkerDrag(e, indexPath);
    this._fireChange(this._layer.getLatLngs() as L.LatLng[][], 'Edit');
  },

  _onMarkerDragEnd(
    this: IEditRectangle,
    e: L.LeafletEvent & { target: ExtendedMarker }
  ) {
    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDragEnd(draggedMarker)) {
      return;
    }

    // Clean-up data attributes
    this._cornerMarkers.forEach((m) => {
      delete m._oppositeCornerLatLng;
    });

    const { indexPath } = L.PM.Utils.findDeepMarkerIndex(
      this._markers,
      draggedMarker
    );
    this._fireMarkerDragEnd(e, indexPath);

    // fire edit event
    this._fireEdit();
    this._layerEdited = true;
    this._fireChange(this._layer.getLatLngs() as L.LatLng[][], 'Edit');
  },

  // adjusts the rectangle's size and bounds whenever a marker is moved
  // params: movedMarker -- the Marker object
  _adjustRectangleForMarkerMove(
    this: IEditRectangle,
    movedMarker: ExtendedMarker
  ) {
    // update moved marker coordinates
    L.extend(movedMarker._origLatLng!, movedMarker._latlng!);

    // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng
    const corners = L.PM.Utils._getRotatedRectangle(
      movedMarker.getLatLng(),
      movedMarker._oppositeCornerLatLng!,
      this.getAngle(),
      this._map
    );
    this._layer.setLatLngs(corners);

    // Reposition the markers at each corner
    this._adjustAllMarkers(movedMarker);

    // Redraw the shape (to update altered rectangle)
    this._layer.redraw();
  },

  // adjusts the position of all Markers
  // params: markerLatLngs -- an array of exactly LatLng objects
  _adjustAllMarkers(this: IEditRectangle, movedMarker: ExtendedMarker) {
    const markerLatLngs = this._layer.getLatLngs()[0] as L.LatLng[];

    if (
      markerLatLngs &&
      markerLatLngs.length !== 4 &&
      markerLatLngs.length > 0
    ) {
      // The layers is currently to small and has not enough latlngs.
      // Leaflet destroys the valid Rectangle by removing the last latlng if the last and first latlng are equal. See: Leaflet#7464 V1.7.1

      // update all possible markers
      markerLatLngs.forEach((latlng: L.LatLng, index: number) => {
        this._cornerMarkers[index].setLatLng(latlng);
      });

      // apply to all markers with no latlng on the layer, the first latlng
      const restMarkers = this._cornerMarkers.slice(markerLatLngs.length);
      restMarkers.forEach((marker) => {
        marker.setLatLng(markerLatLngs[0]);
      });
    } else if (!markerLatLngs || !markerLatLngs.length) {
      console.error('The layer has no LatLngs');
    } else {
      const correctIndex = markerLatLngs.findIndex((latlng: L.LatLng) =>
        movedMarker.getLatLng().equals(latlng)
      );

      if (correctIndex > -1) {
        // keep the correct index order of the markers. LatLngs index order can be changed
        // after using setLatLngs but the markers are still on the same place
        this._cornerMarkers[(movedMarker._index! + 1) % 4].setLatLng(
          markerLatLngs[(correctIndex + 1) % 4]
        );
        this._cornerMarkers[(movedMarker._index! + 2) % 4].setLatLng(
          markerLatLngs[(correctIndex + 2) % 4]
        );
        this._cornerMarkers[(movedMarker._index! + 3) % 4].setLatLng(
          markerLatLngs[(correctIndex + 3) % 4]
        );
      } else {
        this._cornerMarkers.forEach((marker) => {
          marker.setLatLng(markerLatLngs[marker._index!]);
        });
      }
    }
  },
  // finds the 4 corners of the current bounding box
  // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
  _findCorners(this: IEditRectangle) {
    if (this._angle === undefined) {
      this.setInitAngle(
        calcAngle(
          this._map,
          (this._layer.getLatLngs()[0] as L.LatLng[])[0],
          (this._layer.getLatLngs()[0] as L.LatLng[])[1]
        ) || 0
      );
    }

    const latlngs = this._layer.getLatLngs()[0] as L.LatLng[];
    return L.PM.Utils._getRotatedRectangle(
      latlngs[0],
      latlngs[2],
      this.getAngle(),
      this._map || this
    );
  },
});

// Assign to Edit class
(Edit as unknown as { Rectangle: unknown }).Rectangle = EditRectangle;

export default EditRectangle;
