import Matrix from './Matrix';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    isArray: (obj: unknown) => boolean;
  };
};

/**
 * Convert a single LatLng using a transformation matrix
 */
/**
 * Matrix type from Matrix module
 */
type MatrixType = InstanceType<typeof Matrix>;

export function _convertLatLng(
  latlng: L.LatLng,
  matrix: MatrixType,
  map: L.Map,
  zoom: number
): L.LatLng {
  return map.unproject(matrix.transform(map.project(latlng, zoom)), zoom);
}

/**
 * LatLng or nested array of LatLngs
 */
type LatLngInput = L.LatLng | LatLngInput[];
export type LatLngOutput = L.LatLng | LatLngOutput[] | null;

/**
 * Convert LatLngs (potentially nested arrays) using a transformation matrix
 */
export function _convertLatLngs(
  latlng: LatLngInput,
  matrix: MatrixType,
  map: L.Map
): LatLngOutput {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  if (L.Util.isArray(latlng)) {
    const latlngs: LatLngOutput[] = [];
    (latlng as LatLngInput[]).forEach((x: LatLngInput) => {
      latlngs.push(_convertLatLngs(x, matrix, map));
    });
    return latlngs;
  }
  if (latlng instanceof L.LatLng) {
    return _convertLatLng(latlng, matrix, map, zoom);
  }
  return null;
}

/**
 * Extended layer with getLatLng
 */
interface LayerWithLatLng extends L.Layer {
  getLatLng: () => L.LatLng;
}

/**
 * Convert a LatLng (or layer with getLatLng) to a Point
 */
export function _toPoint(
  map: L.Map,
  latlng: L.LatLng | LayerWithLatLng
): L.Point {
  let inputLatLng = latlng;
  if (latlng instanceof L.Layer) {
    inputLatLng = (latlng as LayerWithLatLng).getLatLng();
  }
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.project(inputLatLng as L.LatLng, zoom);
}

/**
 * Convert a Point to a LatLng
 */
export function _toLatLng(map: L.Map, point: L.Point): L.LatLng {
  let zoom = map.getMaxZoom();
  if (zoom === Infinity) {
    zoom = map.getZoom();
  }
  return map.unproject(point, zoom);
}
