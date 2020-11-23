import { createGeodesicPolygon, getTranslation } from "./helpers";

const Utils = {
  calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers

    const p1 = map.project(latlng1);
    const p2 = map.project(latlng2);

    return map.unproject(p1._add(p2)._divideBy(2));
  },
  calculatePolygonArea(coords) {
    // Algorithm based on https://mathworld.wolfram.com/PolygonArea.html
    const diameter = 6371000 * 2;
    const circumference = diameter * Math.PI;
    const arrayY = [];
    const arrayX = [];
    const arrayArea = [];
    let area = 0;
    const latRef = coords[0].lat;
    const lngRef = coords[0].lng;
    coords.forEach(latlng => {
      arrayY.push(this.calculateYSegment(latRef, latlng.lat, circumference));
      arrayX.push(this.calculateXSegment(lngRef, latlng.lng, latlng.lat, circumference));
    })
    arrayY.forEach((value, index) => {
      if (index > 0) {
        arrayArea.push(this.calculateAreaInSquareMeters(arrayX[index - 1], arrayX[index], arrayY[index - 1], arrayY[index]));
      }
    });
    arrayArea.forEach(value => {
      area += value;
    })
    return Math.abs(area);
  },
  calculateYSegment(latitudeRef, latitude, circumference) {
    return (latitude - latitudeRef) * circumference / 360.0;
  },
  calculateXSegment(longitudeRef, longitude, latitude, circumference) {
    return (longitude - longitudeRef) * circumference * Math.cos(latitude * (Math.PI / 180)) / 360.0;
  },
  calculateAreaInSquareMeters(x1, x2, y1, y2) {
    return (y1 * x2 - x1 * y2) / 2;
  },
  findLayers(map) {
    let layers = [];
    map.eachLayer(layer => {
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
    layers = layers.filter(layer => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);

    return layers;
  },
  circleToPolygon(circle, sides = 60) {
    const origin = circle.getLatLng();
    const radius = circle.getRadius();
    const polys = createGeodesicPolygon(origin, radius, sides, 0); // these are the points that make up the circle
    const polygon = [];
    for (let i = 0; i < polys.length; i += 1) {
      const geometry = [polys[i].lat, polys[i].lng];
      polygon.push(geometry);
    }
    return L.polygon(polygon, circle.options);
  },
  disablePopup(layer){
    if(layer.getPopup()){
      layer._tempPopupCopy = layer.getPopup();
      layer.unbindPopup();
    }
  },
  enablePopup(layer){
    if(layer._tempPopupCopy){
      layer.bindPopup(layer._tempPopupCopy);
      delete layer._tempPopupCopy;
    }
  },
  _fireEvent(layer,type,data,propagate = false) {
    layer.fire(type, data, propagate);

    // fire event to all parent layers
    const {groups} = this.getAllParentGroups(layer);
    groups.forEach((group) => {
      group.fire(type, data, propagate);
    });
  },
  getAllParentGroups(layer){
    const groupIds = [];
    const groups = [];

    // get every group layer once
    const loopThroughParents = (_layer) => {
      for (const _id in _layer._eventParents) {
        if(groupIds.indexOf(_id) === -1){
          groupIds.push(_id);
          const group = _layer._eventParents[_id];
          groups.push(group);
          loopThroughParents(group)
        }
      }
    };

    // check if the last group fetch is under 1 sec, then we use the groups from before
    if(!layer._pmLastGroupFetch || !layer._pmLastGroupFetch.time || (new Date().getTime() - layer._pmLastGroupFetch.time)> 1000){
      loopThroughParents(layer);
      layer._pmLastGroupFetch = {
        time: new Date().getTime(),
        groups,
        groupIds
      } ;
      return {
        groupIds,
        groups
      }
    }else{
     return {
       groups: layer._pmLastGroupFetch.groups,
       groupIds: layer._pmLastGroupFetch.groupIds
     }
    }
  },
  createGeodesicPolygon,
  getTranslation,
  findDeepCoordIndex(arr, latlng) {
    // find latlng in arr and return its location as path
    // thanks for the function, Felix Heck
    let result;

    const run = path => (v, i) => {
      const iRes = path.concat(i);

      if (v.lat && v.lat === latlng.lat && v.lng === latlng.lng) {
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
        newIndex+=1;
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
};

export default Utils;
