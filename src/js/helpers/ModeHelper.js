export function _convertLatLng(latlng, matrix, map, zoom) {
  return map.unproject(matrix.transform(map.project(latlng, zoom)), zoom);
}

export function _convertLatLngs(latlng, matrix, map) {
  const zoom = map.getMaxZoom();
  if (L.Util.isArray(latlng)) {
    const latlngs = [];
    latlng.forEach((x) => {
      latlngs.push(_convertLatLngs(x, matrix, map));
    });
    return latlngs;
  } else if (latlng instanceof L.LatLng) {
    return _convertLatLng(latlng, matrix, map, zoom);
  }
  return null;
}

export function _toPoint(map, latlng) {
  if (latlng instanceof L.Layer) {
    latlng = latlng.getLatLng();
  }
  return map.project(latlng, map.getMaxZoom());
}

export function _toLatLng(map, point) {
  return map.unproject(point, map.getMaxZoom());
}

