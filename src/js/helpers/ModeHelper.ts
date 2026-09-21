import type { Matrix } from './Matrix';

export type LatLngTree = L.LatLng | LatLngTree[];

export function _convertLatLng(
  latlng: L.LatLng,
  matrix: Matrix,
  map: L.Map,
  zoom: number
): L.LatLng {
  return map.unproject(matrix.transform(map.project(latlng, zoom)), zoom);
}

export function _convertLatLngs<T extends LatLngTree>(
  latlng: T,
  matrix: Matrix,
  map: L.Map
): T;
export function _convertLatLngs(
  latlng: LatLngTree,
  matrix: Matrix,
  map: L.Map
): LatLngTree | null {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  if (L.Util.isArray(latlng)) {
    const latlngs: LatLngTree[] = [];
    (latlng as LatLngTree[]).forEach((x) => {
      latlngs.push(_convertLatLngs(x, matrix, map));
    });
    return latlngs;
  }
  if (latlng instanceof L.LatLng) {
    return _convertLatLng(latlng, matrix, map, zoom);
  }
  return null;
}

export function _toPoint(
  map: L.Map,
  latlng: L.LatLngExpression | (L.Layer & { getLatLng(): L.LatLng })
): L.Point {
  if (latlng instanceof L.Layer) {
    latlng = latlng.getLatLng();
  }
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.project(latlng, zoom);
}

export function _toLatLng(
  map: L.Map,
  point: Pick<L.Point, 'x' | 'y'>
): L.LatLng {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.unproject(point as L.Point, zoom);
}
