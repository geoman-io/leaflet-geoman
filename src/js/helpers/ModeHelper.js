export function _convertLatLng(latlng, matrix, map, zoom) {
  return map.unproject(matrix.transform(map.project(latlng, zoom)), zoom);
}

export function _convertLatLngs(latlng, matrix, map) {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  if (L.Util.isArray(latlng)) {
    const latlngs = [];
    latlng.forEach((x) => {
      latlngs.push(_convertLatLngs(x, matrix, map));
    });
    return latlngs;
  }
  if (latlng instanceof L.LatLng) {
    return _convertLatLng(latlng, matrix, map, zoom);
  }
  return null;
}

export function _toPoint(map, latlng) {
  if (latlng instanceof L.Layer) {
    latlng = latlng.getLatLng();
  }
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.project(latlng, zoom);
}

export function _toLatLng(map, point) {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.unproject(point, zoom);
}
