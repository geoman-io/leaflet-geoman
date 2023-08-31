import { createGeodesicPolygon, getTranslation } from './helpers';
import { _toLatLng, _toPoint } from './helpers/ModeHelper';

const Utils = {
  calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers

    const p1 = map.project(latlng1);
    const p2 = map.project(latlng2);

    return map.unproject(p1._add(p2)._divideBy(2));
  },
  findLayers(map) {
    let layers = [];
    map.eachLayer((layer) => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker ||
        layer instanceof L.ImageOverlay
      ) {
        layers.push(layer);
      }
    });

    // filter out layers that don't have the leaflet-geoman instance
    layers = layers.filter((layer) => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter((layer) => !layer._pmTempLayer);

    // filter out everything that ignore leaflet-geoman
    layers = layers.filter(
      (layer) =>
        (!L.PM.optIn && !layer.options.pmIgnore) || // if optIn is not set / true and pmIgnore is not set / true (default)
        (L.PM.optIn && layer.options.pmIgnore === false) // if optIn is true and pmIgnore is false);
    );

    return layers;
  },
  circleToPolygon(circle, sides = 60, withBearing = true) {
    const origin = circle.getLatLng();
    const radius = circle.getRadius();
    const polys = createGeodesicPolygon(origin, radius, sides, 0, withBearing); // these are the points that make up the circle
    const polygon = [];
    for (let i = 0; i < polys.length; i += 1) {
      const geometry = [polys[i].lat, polys[i].lng];
      polygon.push(geometry);
    }
    return L.polygon(polygon, circle.options);
  },
  disablePopup(layer) {
    if (layer.getPopup()) {
      layer._tempPopupCopy = layer.getPopup();
      layer.unbindPopup();
    }
  },
  enablePopup(layer) {
    if (layer._tempPopupCopy) {
      layer.bindPopup(layer._tempPopupCopy);
      delete layer._tempPopupCopy;
    }
  },
  _fireEvent(layer, type, data, propagate = false) {
    layer.fire(type, data, propagate);

    // fire event to all parent layers
    const { groups } = this.getAllParentGroups(layer);
    groups.forEach((group) => {
      group.fire(type, data, propagate);
    });
  },
  getAllParentGroups(layer) {
    const groupIds = [];
    const groups = [];

    // get every group layer once
    const loopThroughParents = (_layer) => {
      for (const _id in _layer._eventParents) {
        if (groupIds.indexOf(_id) === -1) {
          groupIds.push(_id);
          const group = _layer._eventParents[_id];
          groups.push(group);
          loopThroughParents(group);
        }
      }
    };

    // check if the last group fetch is under 1 sec, then we use the groups from before
    if (
      !layer._pmLastGroupFetch ||
      !layer._pmLastGroupFetch.time ||
      new Date().getTime() - layer._pmLastGroupFetch.time > 1000
    ) {
      loopThroughParents(layer);
      layer._pmLastGroupFetch = {
        time: new Date().getTime(),
        groups,
        groupIds,
      };
      return {
        groupIds,
        groups,
      };
    }
    return {
      groups: layer._pmLastGroupFetch.groups,
      groupIds: layer._pmLastGroupFetch.groupIds,
    };
  },
  createGeodesicPolygon,
  getTranslation,
  findDeepCoordIndex(arr, latlng, exact = true) {
    // find latlng in arr and return its location as path
    // thanks for the function, Felix Heck
    let result;

    const run = (path) => (v, i) => {
      const iRes = path.concat(i);

      if (exact) {
        if (v.lat && v.lat === latlng.lat && v.lng === latlng.lng) {
          result = iRes;
          return true;
        }
      } else if (v.lat && L.latLng(v).equals(latlng)) {
        result = iRes;
        return true;
      }

      return Array.isArray(v) && v.some(run(iRes));
    };
    arr.some(run([]));

    let returnVal = {};

    if (result) {
      returnVal = {
        indexPath: result,
        index: result[result.length - 1],
        parentPath: result.slice(0, result.length - 1),
      };
    }

    return returnVal;
  },
  findDeepMarkerIndex(arr, marker) {
    // thanks for the function, Felix Heck
    let result;

    const run = (path) => (v, i) => {
      const iRes = path.concat(i);

      if (v._leaflet_id === marker._leaflet_id) {
        result = iRes;
        return true;
      }

      return Array.isArray(v) && v.some(run(iRes));
    };
    arr.some(run([]));

    let returnVal = {};

    if (result) {
      returnVal = {
        indexPath: result,
        index: result[result.length - 1],
        parentPath: result.slice(0, result.length - 1),
      };
    }

    return returnVal;
  },
  _getIndexFromSegment(coords, segment) {
    if (segment && segment.length === 2) {
      const indexA = this.findDeepCoordIndex(coords, segment[0]);
      const indexB = this.findDeepCoordIndex(coords, segment[1]);
      let newIndex = Math.max(indexA.index, indexB.index);
      if ((indexA.index === 0 || indexB.index === 0) && newIndex !== 1) {
        newIndex += 1;
      }
      return {
        indexA,
        indexB,
        newIndex,
        indexPath: indexA.indexPath,
        parentPath: indexA.parentPath,
      };
    }
    return null;
  },
  // Returns the corners of the rectangle with a given rotation
  // degrees: Between marker A and the marker counterclockwise before. Same for marker B
  _getRotatedRectangle(A, B, rotation, map) {
    const startPoint = _toPoint(map, A);
    const endPoint = _toPoint(map, B);
    const theta = (rotation * Math.PI) / 180;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    const width =
      (endPoint.x - startPoint.x) * cos + (endPoint.y - startPoint.y) * sin;
    const height =
      (endPoint.y - startPoint.y) * cos - (endPoint.x - startPoint.x) * sin;
    const x0 = width * cos + startPoint.x;
    const y0 = width * sin + startPoint.y;
    const x1 = -height * sin + startPoint.x;
    const y1 = height * cos + startPoint.y;

    const p0 = _toLatLng(map, startPoint);
    const p1 = _toLatLng(map, { x: x0, y: y0 });
    const p2 = _toLatLng(map, endPoint);
    const p3 = _toLatLng(map, { x: x1, y: y1 });
    return [p0, p1, p2, p3];
  },
  pxRadiusToMeterRadius(radiusInPx, map, center) {
    const pointA = map.project(center);
    const pointB = L.point(pointA.x + radiusInPx, pointA.y);
    return map.distance(map.unproject(pointB), center);
  },
};

export default Utils;
