// Corner detection based on Leaflet Draw's Edit.Rectangle.js Class:
// https://github.com/Leaflet/Leaflet.draw/blob/master/src/edit/handler/Edit.Rectangle.js
import Edit from './L.PM.Edit';
import { calcAngle } from '../helpers';

Edit.Rectangle = Edit.Polygon.extend({
  _shape: 'Rectangle',
  // initializes Rectangle Markers
  _initMarkers() {
    const map = this._map;
    const corners = this._findCorners();

    // cleanup old ones first
    if (this._markerGroup) {
      this._markerGroup.clearLayers();
    }

    // add markerGroup to map, markerGroup includes regular and middle markers
    this._markerGroup = new L.FeatureGroup();
    this._markerGroup._pmTempLayer = true;
    map.addLayer(this._markerGroup);

    // create markers for four corners of rectangle
    this._markers = [];

    // nest set of corner markers in a 2D array so that we can Cut this Rectangle, if needed
    this._markers[0] = corners.map(this._createMarker, this);

    // convenience alias, for better readability
    [this._cornerMarkers] = this._markers;

    // Update the marker latlngs if the rectangle is rotated
    this._layer.getLatLngs()[0].forEach((latlng, index) => {
      const marker = this._cornerMarkers.find((m) => m._index === index);
      if (marker) {
        marker.setLatLng(latlng);
      }
    });
  },
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
    this._addMarkerEvents();
  },

  // creates initial markers for coordinates
  _createMarker(latlng, index) {
    const marker = new L.Marker(latlng, {
      draggable: true,
      icon: L.divIcon({ className: 'marker-icon' }),
    });
    this._setPane(marker, 'vertexPane');

    marker._origLatLng = latlng;
    marker._index = index;
    marker._pmTempLayer = true;

    marker.on('click', this._onVertexClick, this);

    this._markerGroup.addLayer(marker);

    return marker;
  },
  // Add marker events after adding the snapping events to the markers, beacause of the execution order
  _addMarkerEvents() {
    this._markers[0].forEach((marker) => {
      marker.on('dragstart', this._onMarkerDragStart, this);
      marker.on('drag', this._onMarkerDrag, this);
      marker.on('dragend', this._onMarkerDragEnd, this);

      // TODO: Can we remove this? The _removeMarker Event is a empty function
      if (!this.options.preventMarkerRemoval) {
        marker.on('contextmenu', this._removeMarker, this);
      }
    });
  },
  // Empty callback for 'contextmenu' binding set in L.PM.Edit.Line.js's _createMarker method (AKA, right-click on marker event)
  // (A Rectangle is designed to always remain a "true" rectangle -- if you want it editable, use Polygon Tool instead!!!)
  _removeMarker() {
    // The method, it does nothing!!!
    return null;
  },

  _onMarkerDragStart(e) {
    if (!this._vertexValidation('move', e)) {
      return;
    }

    // dragged marker
    const draggedMarker = e.target;
    // Store/update a reference to marker in opposite corner
    const corners = this._cornerMarkers;
    draggedMarker._oppositeCornerLatLng = corners
      .find((m) => m._index === (draggedMarker._index + 2) % 4)
      .getLatLng();

    // Automatically unsnap all markers on drag start (they'll snap back if close enough to another snappable object)
    // (Without this, it's occasionally possible for a marker to get stuck as 'snapped,' which prevents Rectangle resizing)
    draggedMarker._snapped = false;

    this._fireMarkerDragStart(e);
  },

  _onMarkerDrag(e) {
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

    this._fireMarkerDrag(e);
    this._fireChange(this._layer.getLatLngs(), 'Edit');
  },

  _onMarkerDragEnd(e) {
    // dragged marker
    const draggedMarker = e.target;
    if (!this._vertexValidationDragEnd(draggedMarker)) {
      return;
    }

    // Clean-up data attributes
    this._cornerMarkers.forEach((m) => {
      delete m._oppositeCornerLatLng;
    });

    this._fireMarkerDragEnd(e);

    // fire edit event
    this._fireEdit();
    this._layerEdited = true;
    this._fireChange(this._layer.getLatLngs(), 'Edit');
  },

  // adjusts the rectangle's size and bounds whenever a marker is moved
  // params: movedMarker -- the Marker object
  _adjustRectangleForMarkerMove(movedMarker) {
    // update moved marker coordinates
    L.extend(movedMarker._origLatLng, movedMarker._latlng);

    // update rectangle boundaries, based on moved marker's new LatLng and cached opposite corner's LatLng
    const corners = L.PM.Utils._getRotatedRectangle(
      movedMarker.getLatLng(),
      movedMarker._oppositeCornerLatLng,
      this.getAngle(),
      this._map
    );
    this._layer.setLatLngs(corners);

    // Reposition the markers at each corner
    this._adjustAllMarkers();

    // Redraw the shape (to update altered rectangle)
    this._layer.redraw();
  },

  // adjusts the position of all Markers
  // params: markerLatLngs -- an array of exactly LatLng objects
  _adjustAllMarkers() {
    const markerLatLngs = this._layer.getLatLngs()[0];

    if (
      markerLatLngs &&
      markerLatLngs.length !== 4 &&
      markerLatLngs.length > 0
    ) {
      // The layers is currently to small and has not enough latlngs.
      // Leaflet destroys the valid Rectangle by removing the last latlng if the last and first latlng are equal. See: Leaflet#7464 V1.7.1

      // update all possible markers
      markerLatLngs.forEach((latlng, index) => {
        this._cornerMarkers[index].setLatLng(latlng);
      });

      // apply to all markers with no latlng on the layer, the first latlng
      const restMarkers = this._cornerMarkers.slice(markerLatLngs.length);
      restMarkers.forEach((marker) => {
        marker.setLatLng(markerLatLngs[0]);
      });
    } else if (!markerLatLngs || !markerLatLngs.length) {
      // eslint-disable-next-line
      console.error('The layer has no LatLngs');
    } else {
      this._cornerMarkers.forEach((marker) => {
        marker.setLatLng(markerLatLngs[marker._index]);
      });
    }
  },
  // finds the 4 corners of the current bounding box
  // returns array of 4 LatLng objects in this order: Northwest corner, Northeast corner, Southeast corner, Southwest corner
  _findCorners() {
    if (this._angle === undefined) {
      this.setInitAngle(
        calcAngle(
          this._map,
          this._layer.getLatLngs()[0][0],
          this._layer.getLatLngs()[0][1]
        ) || 0
      );
    }

    const latlngs = this._layer.getLatLngs()[0];
    return L.PM.Utils._getRotatedRectangle(
      latlngs[0],
      latlngs[2],
      this.getAngle(),
      this._map || this
    );
  },
});
