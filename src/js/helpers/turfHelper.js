import polygonClipping from 'polygon-clipping';

export function feature(geom) {
  const feat = { type: 'Feature' };
  feat.geometry = geom;
  return feat;
}

export function getGeometry(geojson) {
  if (geojson.type === 'Feature') return geojson.geometry;
  return geojson;
}

export function getCoords(geojson) {
  if (geojson && geojson.geometry && geojson.geometry.coordinates)
    return geojson.geometry.coordinates;
  return geojson;
}

export function turfPoint(coords, precision = -1) {
  if (precision > -1) {
    coords[0] = L.Util.formatNum(coords[0], precision);
    coords[1] = L.Util.formatNum(coords[1], precision);
  }

  return feature({ type: 'Point', coordinates: coords });
}

export function turfLineString(coords) {
  return feature({ type: 'LineString', coordinates: coords });
}

export function turfMultiLineString(coords) {
  return feature({ type: 'MultiLineString', coordinates: coords });
}

export function turfPolygon(coords) {
  return feature({ type: 'Polygon', coordinates: coords });
}

export function turfMultiPolygon(coords) {
  return feature({ type: 'MultiPolygon', coordinates: coords });
}

export function turfFeatureCollection(features) {
  return { type: 'FeatureCollection', features };
}

export function intersect(poly1, poly2) {
  const geom1 = getGeometry(poly1);
  const geom2 = getGeometry(poly2);

  const intersection = polygonClipping.intersection(
    geom1.coordinates,
    geom2.coordinates
  );
  if (intersection.length === 0) return null;
  if (intersection.length === 1) return turfPolygon(intersection[0]);
  return turfMultiPolygon(intersection);
}

export function difference(polygon1, polygon2) {
  const geom1 = getGeometry(polygon1);
  const geom2 = getGeometry(polygon2);

  const differenced = polygonClipping.difference(
    geom1.coordinates,
    geom2.coordinates
  );
  if (differenced.length === 0) return null;
  if (differenced.length === 1) return turfPolygon(differenced[0]);
  return turfMultiPolygon(differenced);
}

// LineString coords returns 1
// MultiLineString coords returns 2
export function getDepthOfCoords(coords) {
  if (Array.isArray(coords)) {
    return 1 + getDepthOfCoords(coords[0]);
  }
  return -1; // return -1 because this is already the lng of the lnglat (geojson) array
}

export function flattenPolyline(polyline) {
  if (polyline instanceof L.Polyline) {
    polyline = polyline.toGeoJSON(15);
  }

  const coords = getCoords(polyline);
  const depth = getDepthOfCoords(coords);
  const features = [];
  if (depth > 1) {
    coords.forEach((coord) => {
      features.push(turfLineString(coord));
    });
  } else {
    features.push(polyline);
  }

  return features;
}

export function groupToMultiLineString(group) {
  const coords = [];
  group.eachLayer((layer) => {
    coords.push(getCoords(layer.toGeoJSON(15)));
  });
  return turfMultiLineString(coords);
}

export function convertToLatLng(coords) {
  const lnglat = getCoords(coords);
  return L.latLng(lnglat[1], lnglat[0]);
}

export function convertArrayToLatLngs(arr) {
  const latlngs = [];
  if (arr.features) {
    arr.features.forEach((geojson) => {
      latlngs.push(convertToLatLng(geojson));
    });
  }
  return latlngs;
}
