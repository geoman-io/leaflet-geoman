import { createGeodesicPolygon, getTranslation } from "./helpers";

const Utils = {
  calcMiddleLatLng(map, latlng1, latlng2) {
    // calculate the middle coordinates between two markers

    const p1 = map.project(latlng1);
    const p2 = map.project(latlng2);

    return map.unproject(p1._add(p2)._divideBy(2));
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
};

export default Utils;
