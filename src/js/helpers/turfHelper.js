import polygonClipping from 'polygon-clipping';

export function feature(geom){
  const feat = {type: "Feature"};
  feat.geometry = geom;
  return feat;
}

export function getGeometry(geojson) {
  if(geojson.type === "Feature") return geojson.geometry;
  return geojson;
}

export function getCoords(geojson) {
  return geojson.geometry.coordinates;
}

export function turfPoint(coords) {
  return feature({"type": "Point", "coordinates": coords});
}

export function turfLineString(coords) {
  return feature({"type": "LineString", "coordinates": coords});
}

export function turfPolygon(coords) {
  return feature({"type": "Polygon", "coordinates": coords});
}

export function turfMultiPolygon(coords) {
  return feature({"type": "MultiPolygon", "coordinates": coords});
}

export function turfFeatureCollection(features) {
  return {type: "FeatureCollection", "features": features};
}

export function intersect(poly1,poly2) {
  const geom1 = getGeometry(poly1);
  const geom2 = getGeometry(poly2);

  const intersection = polygonClipping.intersection(geom1.coordinates,geom2.coordinates);
  if (intersection.length === 0) return null;
  if (intersection.length === 1) return turfPolygon(intersection[0]);
  return turfMultiPolygon(intersection);
}

export function difference(polygon1, polygon2) {
  const geom1 = getGeometry(polygon1);
  const geom2 = getGeometry(polygon2);

  const differenced = polygonClipping.difference(geom1.coordinates, geom2.coordinates);
  if (differenced.length === 0) return null;
  if (differenced.length === 1) return turfPolygon(differenced[0]);
  return turfMultiPolygon(differenced);
}
