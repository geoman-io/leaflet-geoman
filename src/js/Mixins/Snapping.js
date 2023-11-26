import { hasValues, prioritiseSort } from '../helpers';

const SnapMixin = {
  _initSnappableMarkers() {
    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    this._assignEvents(this._markers);

    this._layer.off('pm:dragstart', this._unsnap, this);
    this._layer.on('pm:dragstart', this._unsnap, this);
  },
  _disableSnapping() {
    this._layer.off('pm:dragstart', this._unsnap, this);
  },
  _assignEvents(markerArr) {
    // loop through marker array and assign events to the markers
    markerArr.forEach((marker) => {
      // if the marker is another array (Multipolygon stuff), recursively do this again
      if (Array.isArray(marker)) {
        this._assignEvents(marker);
        return;
      }

      // add handleSnapping event on drag
      marker.off('drag', this._handleSnapping, this);
      marker.on('drag', this._handleSnapping, this);

      // cleanup event on dragend
      marker.off('dragend', this._cleanupSnapping, this);
      marker.on('dragend', this._cleanupSnapping, this);
    });
  },
  _cleanupSnapping(e) {
    if (e) {
      // reset snap flag of the dragged helper-marker
      const marker = e.target;
      marker._snapped = false;
    }
    // delete it, we need to refresh this with each start of a drag because
    // meanwhile, new layers could've been added to the map
    delete this._snapList;

    if (this.throttledList) {
      this._map.off('layeradd', this.throttledList, this);
      this.throttledList = undefined;
    }

    // remove map event
    this._map.off('layerremove', this._handleSnapLayerRemoval, this);

    if (this.debugIndicatorLines) {
      this.debugIndicatorLines.forEach((line) => {
        line.remove();
      });
    }
  },
  _handleThrottleSnapping() {
    // we check if the throttledList is existing, else the function is deleted but the `layeradd` event calls it.
    // this made problems when layer was removed and added to the map in the `pm:create` event
    if (this.throttledList) {
      this._createSnapList();
    }
  },
  _handleSnapping(e) {
    const marker = e.target;
    marker._snapped = false;

    if (!this.throttledList) {
      this.throttledList = L.Util.throttle(
        this._handleThrottleSnapping,
        100,
        this
      );
    }

    // if snapping is disabled via holding ALT during drag, stop right here
    // we need to check for the altKey on the move event, because keydown event is to slow ...
    if (e?.originalEvent?.altKey || this._map?.pm?.Keyboard.isAltKeyPressed()) {
      return false;
    }

    // create a list of layers that the marker could snap to
    // this isn't inside a movestart/dragstart callback because middlemarkers are initialized
    // after dragstart/movestart so it wouldn't fire for them
    if (this._snapList === undefined) {
      this._createSnapList();

      // re-create the snaplist again when a layer is added during draw
      this._map.off('layeradd', this.throttledList, this);
      this._map.on('layeradd', this.throttledList, this);
    }

    // if there are no layers to snap to, stop here
    if (this._snapList.length <= 0) {
      return false;
    }

    // get the closest layer, it's closest latlng, segment and the distance
    const closestLayer = this._calcClosestLayer(
      marker.getLatLng(),
      this._snapList
    );

    // if no layers found. Can happen when circle is the only visible layer on the map and the hidden snapping-border circle layer is also on the map
    if (Object.keys(closestLayer).length === 0) {
      return false;
    }

    const isMarker =
      closestLayer.layer instanceof L.Marker ||
      closestLayer.layer instanceof L.CircleMarker ||
      !this.options.snapSegment;

    // find the final latlng that we want to snap to
    let snapLatLng;
    if (!isMarker) {
      snapLatLng = this._checkPrioritiySnapping(closestLayer);
    } else {
      snapLatLng = closestLayer.latlng;
    }

    // minimal distance before marker snaps (in pixels)
    const minDistance = this.options.snapDistance;

    // event info for pm:snap and pm:unsnap
    const eventInfo = {
      marker,
      shape: this._shape,
      snapLatLng,
      segment: closestLayer.segment,
      layer: this._layer,
      workingLayer: this._layer,
      layerInteractedWith: closestLayer.layer, // for lack of a better property name
      distance: closestLayer.distance,
    };

    this._fireSnapDrag(eventInfo.marker, eventInfo);
    this._fireSnapDrag(this._layer, eventInfo);

    if (closestLayer.distance < minDistance) {
      // snap the marker
      marker._orgLatLng = marker.getLatLng();
      // TODO: if the origin marker has a altitude is applied to the snapped layer too, do we want this?
      marker.setLatLng(snapLatLng);

      marker._snapped = true;
      marker._snapInfo = eventInfo;

      const triggerSnap = () => {
        this._snapLatLng = snapLatLng;
        this._fireSnap(marker, eventInfo);
        this._fireSnap(this._layer, eventInfo);
      };

      // check if the snapping position differs from the last snap
      // Thanks Max & car2go Team
      const a = this._snapLatLng || {};
      const b = snapLatLng || {};

      if (a.lat !== b.lat || a.lng !== b.lng) {
        triggerSnap();
      }
    } else if (this._snapLatLng) {
      // no more snapping

      // if it was previously snapped...
      // ...unsnap
      this._unsnap(eventInfo);

      marker._snapped = false;
      marker._snapInfo = undefined;

      // and fire unsnap event
      this._fireUnsnap(eventInfo.marker, eventInfo);
      this._fireUnsnap(this._layer, eventInfo);
    }

    return true;
  },
  _createSnapList() {
    let layers = [];
    const debugIndicatorLines = [];
    const map = this._map;

    map.off('layerremove', this._handleSnapLayerRemoval, this);
    map.on('layerremove', this._handleSnapLayerRemoval, this);

    // find all layers that are or inherit from Polylines... and markers that are not
    // temporary markers of polygon-edits
    map.eachLayer((layer) => {
      if (
        (layer instanceof L.Polyline ||
          layer instanceof L.Marker ||
          layer instanceof L.CircleMarker ||
          layer instanceof L.ImageOverlay) &&
        layer.options.snapIgnore !== true
      ) {
        // if snapIgnore === false the layer will be always snappable
        if (
          layer.options.snapIgnore === undefined &&
          ((!L.PM.optIn && layer.options.pmIgnore === true) || // if optIn is not set and pmIgnore is true, the layer will be ignored
            (L.PM.optIn && layer.options.pmIgnore !== false)) // if optIn is true and pmIgnore is not false, the layer will be ignored
        ) {
          return;
        }

        // adds a hidden polygon which matches the border of the circle
        if (
          (layer instanceof L.Circle || layer instanceof L.CircleMarker) &&
          layer.pm &&
          layer.pm._hiddenPolyCircle
        ) {
          layers.push(layer.pm._hiddenPolyCircle);
        } else if (layer instanceof L.ImageOverlay) {
          layer = L.rectangle(layer.getBounds());
        }
        layers.push(layer);

        // this is for debugging
        const debugLine = L.polyline([], { color: 'red', pmIgnore: true });
        debugLine._pmTempLayer = true;
        debugIndicatorLines.push(debugLine);
        if (layer instanceof L.Circle || layer instanceof L.CircleMarker) {
          debugIndicatorLines.push(debugLine);
        }

        // uncomment 👇 this line to show helper lines for debugging
        // debugLine.addTo(map);
      }
    });

    // ...except myself
    layers = layers.filter((layer) => this._layer !== layer);

    // also remove everything that has no coordinates yet
    layers = layers.filter(
      (layer) => layer._latlng || (layer._latlngs && hasValues(layer._latlngs))
    );

    // finally remove everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter((layer) => !layer._pmTempLayer);

    // save snaplist from layers and the other snap layers added from other classes/scripts
    if (this._otherSnapLayers) {
      this._otherSnapLayers.forEach(() => {
        // this is for debugging
        const debugLine = L.polyline([], { color: 'red', pmIgnore: true });
        debugLine._pmTempLayer = true;
        debugIndicatorLines.push(debugLine);
      });
      this._snapList = layers.concat(this._otherSnapLayers);
    } else {
      this._snapList = layers;
    }

    this.debugIndicatorLines = debugIndicatorLines;
  },
  _handleSnapLayerRemoval({ layer }) {
    if (!layer._leaflet_id) {
      return;
    }
    // find the layers index in snaplist
    const index = this._snapList.findIndex(
      (e) => e._leaflet_id === layer._leaflet_id
    );
    if (index > -1) {
      // remove it from the snaplist
      this._snapList.splice(index, 1);
    }
  },
  _calcClosestLayer(latlng, layers) {
    return this._calcClosestLayers(latlng, layers, 1)[0];
  },
  _calcClosestLayers(latlng, layers, amount = 1) {
    // the closest polygon to our dragged marker latlng
    let closestLayers = [];
    let closestLayer = {};

    // loop through the layers
    layers.forEach((layer, index) => {
      // For Circles and CircleMarkers to prevent that they snap to the own borders.
      if (layer._parentCopy && layer._parentCopy === this._layer) {
        return;
      }
      // find the closest latlng, segment and the distance of this layer to the dragged marker latlng
      const results = this._calcLayerDistances(latlng, layer);
      results.distance = Math.floor(results.distance);

      if (this.debugIndicatorLines) {
        if (!this.debugIndicatorLines[index]) {
          const debugLine = L.polyline([], { color: 'red', pmIgnore: true });
          debugLine._pmTempLayer = true;
          this.debugIndicatorLines[index] = debugLine;
        }

        // show indicator lines, it's for debugging
        this.debugIndicatorLines[index].setLatLngs([latlng, results.latlng]);
      }

      // save the info if it doesn't exist or if the distance is smaller than the previous one
      if (
        amount === 1 &&
        (closestLayer.distance === undefined ||
          results.distance <= closestLayer.distance)
      ) {
        if (results.distance < closestLayer.distance) {
          closestLayers = [];
        }
        closestLayer = results;
        closestLayer.layer = layer;
        closestLayers.push(closestLayer);
      } else if (amount !== 1) {
        closestLayer = {};
        closestLayer = results;
        closestLayer.layer = layer;
        closestLayers.push(closestLayer);
      }
    });
    if (amount !== 1) {
      // sort the layers by distance
      closestLayers = closestLayers.sort((a, b) => a.distance - b.distance);
    }

    if (amount === -1) {
      amount = closestLayers.length;
    }

    // return the closest layer and it's data
    // if there is no closest layer, return an empty object
    const result = this._getClosestLayerByPriority(closestLayers, amount);
    if (L.Util.isArray(result)) {
      return result;
    }
    return [result];
  },
  _calcLayerDistances(latlng, layer) {
    const map = this._map;

    // is this a marker?
    const isMarker =
      layer instanceof L.Marker || layer instanceof L.CircleMarker;

    // is it a polygon?
    const isPolygon = layer instanceof L.Polygon;

    // the point P which we want to snap (probpably the marker that is dragged)
    const P = latlng;

    // the coords of the layer

    if (isMarker) {
      // return the info for the marker, no more calculations needed
      const latlngs = layer.getLatLng();
      return {
        latlng: { ...latlngs },
        distance: this._getDistance(map, latlngs, P),
      };
    }

    return this._calcLatLngDistances(P, layer.getLatLngs(), map, isPolygon);
  },
  _calcLatLngDistances(latlng, latlngs, map, closedShape = false) {
    // the closest coord of the layer
    let closestCoord;

    // the shortest distance from latlng to closestCoord
    let shortestDistance;

    // the closest segment (line between two points) of the layer
    let closestSegment;

    const loopThroughCoords = (coords) => {
      coords.forEach((coord, index) => {
        if (Array.isArray(coord)) {
          loopThroughCoords(coord);
          return;
        }

        if (this.options.snapSegment) {
          // take this coord (A)...
          const A = coord;
          let nextIndex;

          // and the next coord (B) as points
          if (closedShape) {
            nextIndex = index + 1 === coords.length ? 0 : index + 1;
          } else {
            nextIndex = index + 1 === coords.length ? undefined : index + 1;
          }

          const B = coords[nextIndex];
          if (B) {
            // calc the distance between latlng and AB-segment
            const distance = this._getDistanceToSegment(map, latlng, A, B);

            // is the distance shorter than the previous one? Save it and the segment
            if (shortestDistance === undefined || distance < shortestDistance) {
              shortestDistance = distance;
              closestSegment = [A, B];
            }
          }
        } else {
          // Only snap on the coords
          const distancePoint = this._getDistance(map, latlng, coord);

          if (
            shortestDistance === undefined ||
            distancePoint < shortestDistance
          ) {
            shortestDistance = distancePoint;
            closestCoord = coord;
          }
        }
      });
    };

    loopThroughCoords(latlngs);

    if (this.options.snapSegment) {
      // now, take the closest segment (closestSegment) and calc the closest point to latlng on it.
      const C = this._getClosestPointOnSegment(
        map,
        latlng,
        closestSegment[0],
        closestSegment[1]
      );

      // return the latlng of that sucker
      return {
        latlng: { ...C },
        segment: closestSegment,
        distance: shortestDistance,
      };
    }
    // Only snap on the coords
    // return the closest coord
    return {
      latlng: closestCoord,
      distance: shortestDistance,
    };
  },
  _getClosestLayerByPriority(layers, amount = 1) {
    // sort the layers by creation, so it is snapping to the oldest layer from the same shape
    layers = layers.sort((a, b) => a._leaflet_id - b._leaflet_id);

    const shapes = [
      'Marker',
      'CircleMarker',
      'Circle',
      'Line',
      'Polygon',
      'Rectangle',
    ];
    const order = this._map.pm.globalOptions.snappingOrder || [];

    let lastIndex = 0;
    const prioOrder = {};
    // merge user-preferred priority with default priority
    order.concat(shapes).forEach((shape) => {
      if (!prioOrder[shape]) {
        lastIndex += 1;
        prioOrder[shape] = lastIndex;
      }
    });

    // sort layers by priority
    layers.sort(prioritiseSort('instanceofShape', prioOrder));
    if (amount === 1) {
      return layers[0] || {};
    }
    return layers.slice(0, amount);
  },
  // we got the point we want to snap to (C), but we need to check if a coord of the polygon
  // receives priority over C as the snapping point. Let's check this here
  _checkPrioritiySnapping(closestLayer) {
    const map = this._map;

    // A and B are the points of the closest segment to P (the marker position we want to snap)
    const A = closestLayer.segment[0];
    const B = closestLayer.segment[1];

    // C is the point we would snap to on the segment.
    // The closest point on the closest segment of the closest polygon to P. That's right.
    const C = closestLayer.latlng;

    // distances from A to C and B to C to check which one is closer to C
    const distanceAC = this._getDistance(map, A, C);
    const distanceBC = this._getDistance(map, B, C);

    // closest latlng of A and B to C
    let closestVertexLatLng = distanceAC < distanceBC ? A : B;

    // distance between closestVertexLatLng and C
    let shortestDistance = distanceAC < distanceBC ? distanceAC : distanceBC;

    // snap to middle (M) of segment if option is enabled
    if (this.options.snapMiddle) {
      const M = L.PM.Utils.calcMiddleLatLng(map, A, B);
      const distanceMC = this._getDistance(map, M, C);

      if (distanceMC < distanceAC && distanceMC < distanceBC) {
        // M is the nearest vertex
        closestVertexLatLng = M;
        shortestDistance = distanceMC;
      }
    }

    // the distance that needs to be undercut to trigger priority
    const priorityDistance = this.options.snapDistance;

    // the latlng we ultemately want to snap to
    let snapLatlng;

    // if C is closer to the closestVertexLatLng (A, B or M) than the snapDistance,
    // the closestVertexLatLng has priority over C as the snapping point.
    if (shortestDistance < priorityDistance) {
      snapLatlng = closestVertexLatLng;
    } else {
      snapLatlng = C;
    }

    // return the copy of snapping point
    return { ...snapLatlng };
  },
  _unsnap() {
    // delete the last snap
    delete this._snapLatLng;
  },
  _getClosestPointOnSegment(map, latlng, latlngA, latlngB) {
    let maxzoom = map.getMaxZoom();
    if (maxzoom === Infinity) {
      maxzoom = map.getZoom();
    }
    const P = map.project(latlng, maxzoom);
    const A = map.project(latlngA, maxzoom);
    const B = map.project(latlngB, maxzoom);
    const closest = L.LineUtil.closestPointOnSegment(P, A, B);
    return map.unproject(closest, maxzoom);
  },
  _getDistanceToSegment(map, latlng, latlngA, latlngB) {
    const P = map.latLngToLayerPoint(latlng);
    const A = map.latLngToLayerPoint(latlngA);
    const B = map.latLngToLayerPoint(latlngB);
    return L.LineUtil.pointToSegmentDistance(P, A, B);
  },
  _getDistance(map, latlngA, latlngB) {
    return map
      .latLngToLayerPoint(latlngA)
      .distanceTo(map.latLngToLayerPoint(latlngB));
  },
};

export default SnapMixin;
