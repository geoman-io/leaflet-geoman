import get from 'lodash/get';
import translations from '../../assets/translations';

// Type for the translations object
type TranslationsMap = Record<string, Record<string, unknown>>;

// Type for sorting order
type SortingOrder = Record<string, number>;

// Leaflet global type declaration (accessed at runtime)
// We use the global L, not an import, since this is a plugin that attaches to Leaflet
declare const L: typeof import('leaflet') & {
  PM: {
    activeLang: string;
  };
  CRS: {
    Earth: {
      R: number;
    };
  };
};

export function getTranslation(path: string): string {
  const lang = L.PM.activeLang;
  // if translation is not found, fallback to english
  const result =
    get((translations as TranslationsMap)[lang], path) ||
    get((translations as TranslationsMap).en, path) ||
    path;
  return typeof result === 'string' ? result : path;
}

export function hasFinePointer(): boolean {
  // If matchMedia is unavailable (older browsers), assume desktop
  if (!window.matchMedia) {
    return true;
  }
  // Only treat as touch device if coarse pointer is explicitly detected.
  // This handles headless browsers (like Cypress) where neither fine nor coarse may match.
  const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (hasCoarse) {
    return false;
  }
  // Default to desktop behavior
  return true;
}

export function hasValues(list: unknown[]): boolean {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];

    if (Array.isArray(item)) {
      if (hasValues(item)) {
        return true;
      }
    } else if (item !== null && item !== undefined && item !== '') {
      return true;
    }
  }

  return false;
}

export function removeEmptyCoordRings<T>(arr: (T | T[])[]): (T | T[])[] {
  return arr.reduce<(T | T[])[]>((result, item) => {
    if (Array.isArray(item) && item.length !== 0) {
      const newItem = removeEmptyCoordRings(item);
      if (newItem.length !== 0) {
        result.push(newItem as T | T[]);
      }
    } else if (!Array.isArray(item)) {
      result.push(item);
    }
    return result;
  }, []);
}

// Code from https://stackoverflow.com/a/24153998/8283938
function destinationVincenty(
  lonlat: L.LatLng,
  brng: number,
  dist: number
): L.LatLng {
  // rewritten to work with leaflet
  const VincentyConstants = {
    a: L.CRS.Earth.R,
    b: 6356752.3142,
    f: 1 / 298.257223563,
  };

  const { a, b, f } = VincentyConstants;
  const lon1 = lonlat.lng;
  const lat1 = lonlat.lat;
  const s = dist;
  const pi = Math.PI;
  const alpha1 = (brng * pi) / 180; // converts brng degrees to radius
  const sinAlpha1 = Math.sin(alpha1);
  const cosAlpha1 = Math.cos(alpha1);
  const tanU1 =
    (1 - f) * Math.tan((lat1 * pi) / 180 /* converts lat1 degrees to radius */);
  const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1);
  const sinU1 = tanU1 * cosU1;
  const sigma1 = Math.atan2(tanU1, cosAlpha1);
  const sinAlpha = cosU1 * sinAlpha1;
  const cosSqAlpha = 1 - sinAlpha * sinAlpha;
  const uSq = (cosSqAlpha * (a * a - b * b)) / (b * b);
  const A = 1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = (uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  let sigma = s / (b * A);
  let sigmaP = 2 * Math.PI;

  let cos2SigmaM: number;
  let sinSigma: number;
  let cosSigma: number;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    const deltaSigma =
      B *
      sinSigma *
      (cos2SigmaM +
        (B / 4) *
          (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
            (B / 6) *
              cos2SigmaM *
              (-3 + 4 * sinSigma * sinSigma) *
              (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  const tmp = sinU1 * sinSigma! - cosU1 * cosSigma! * cosAlpha1;
  const lat2 = Math.atan2(
    sinU1 * cosSigma! + cosU1 * sinSigma! * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  const lambda = Math.atan2(
    sinSigma! * sinAlpha1,
    cosU1 * cosSigma! - sinU1 * sinSigma! * cosAlpha1
  );
  const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  const lam =
    lambda -
    (1 - C) *
      f *
      sinAlpha *
      (sigma +
        C *
          sinSigma! *
          (cos2SigmaM! + C * cosSigma! * (-1 + 2 * cos2SigmaM! * cos2SigmaM!)));
  const lamFunc = lon1 + (lam * 180) / pi; // converts lam radius to degrees
  const lat2a = (lat2 * 180) / pi; // converts lat2a radius to degrees

  return L.latLng(lamFunc, lat2a);
}

export function createGeodesicPolygon(
  origin: L.LatLng,
  radius: number,
  sides: number,
  rotation: number,
  withBearing = true
): L.LatLng[] {
  let trueAngle: number;
  let newLonlat: L.LatLng;
  let geomPoint: L.LatLng;
  const points: L.LatLng[] = [];

  for (let i = 0; i < sides; i += 1) {
    if (withBearing) {
      trueAngle = (i * 360) / sides + rotation;
      newLonlat = destinationVincenty(origin, trueAngle, radius);
      geomPoint = L.latLng(newLonlat.lng, newLonlat.lat);
    } else {
      const pLat = origin.lat + Math.cos((2 * i * Math.PI) / sides) * radius;
      const pLng = origin.lng + Math.sin((2 * i * Math.PI) / sides) * radius;
      geomPoint = L.latLng(pLat, pLng);
    }
    points.push(geomPoint);
  }

  return points;
}

/* Copied from L.GeometryUtil */
function destination(
  latlng: L.LatLng,
  heading: number,
  distance: number
): L.LatLng {
  heading = (heading + 360) % 360;
  const rad = Math.PI / 180;
  const radInv = 180 / Math.PI;
  const { R } = L.CRS.Earth; // approximation of Earth's radius
  const lon1 = latlng.lng * rad;
  const lat1 = latlng.lat * rad;
  const rheading = heading * rad;
  const sinLat1 = Math.sin(lat1);
  const cosLat1 = Math.cos(lat1);
  const cosDistR = Math.cos(distance / R);
  const sinDistR = Math.sin(distance / R);
  const lat2 = Math.asin(
    sinLat1 * cosDistR + cosLat1 * sinDistR * Math.cos(rheading)
  );
  let lon2 =
    lon1 +
    Math.atan2(
      Math.sin(rheading) * sinDistR * cosLat1,
      cosDistR - sinLat1 * Math.sin(lat2)
    );
  lon2 *= radInv;

  const optA = lon2 - 360;
  const optB = lon2 < -180 ? lon2 + 360 : lon2;

  lon2 = lon2 > 180 ? optA : optB;
  return L.latLng([lat2 * radInv, lon2]);
}

/* Copied from L.GeometryUtil */
export function calcAngle(
  map: L.Map,
  latlngA: L.LatLng,
  latlngB: L.LatLng
): number {
  const pointA = map.latLngToContainerPoint(latlngA);
  const pointB = map.latLngToContainerPoint(latlngB);
  let angleDeg =
    (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) / Math.PI + 90;
  angleDeg += angleDeg < 0 ? 360 : 0;
  return angleDeg;
}

export function destinationOnLine(
  map: L.Map,
  latlngA: L.LatLng,
  latlngB: L.LatLng,
  distance: number
): L.LatLng {
  const angleDeg = calcAngle(map, latlngA, latlngB);
  return destination(latlngA, angleDeg, distance);
}

// Type for sorting function items
interface SortableItem {
  layer?: L.Layer;
  [key: string]: unknown;
}

// this function is used with the .sort(prioritiseSort(key, sortingOrder)) function of arrays
export function prioritiseSort(
  key: string,
  _sortingOrder: SortingOrder | undefined,
  order: 'asc' | 'desc' = 'asc'
): (a: SortableItem, b: SortableItem) => number {
  /* the sorting order has all possible keys (lowercase) with the index and then it is sorted by the key on the object */

  if (!_sortingOrder || Object.keys(_sortingOrder).length === 0) {
    return (a, b) => (a as unknown as number) - (b as unknown as number); // default sort method
  }

  // change the keys to lowercase
  const keys = Object.keys(_sortingOrder);
  let objKey: string;
  let n = keys.length - 1;
  const sortingOrder: SortingOrder = {};
  while (n >= 0) {
    objKey = keys[n];
    sortingOrder[objKey.toLowerCase()] = _sortingOrder[objKey];
    n -= 1;
  }

  function getShape(layer: L.Layer): string | undefined {
    if (layer instanceof L.Marker) {
      return 'Marker';
    }
    if (layer instanceof L.Circle) {
      return 'Circle';
    }
    if (layer instanceof L.CircleMarker) {
      return 'CircleMarker';
    }
    if (layer instanceof L.Rectangle) {
      return 'Rectangle';
    }
    if (layer instanceof L.Polygon) {
      return 'Polygon';
    }
    if (layer instanceof L.Polyline) {
      return 'Line';
    }
    return undefined;
  }

  return (a: SortableItem, b: SortableItem): number => {
    let keyA: string | undefined;
    let keyB: string | undefined;
    if (key === 'instanceofShape') {
      keyA = a.layer ? getShape(a.layer)?.toLowerCase() : undefined;
      keyB = b.layer ? getShape(b.layer)?.toLowerCase() : undefined;
      if (!keyA || !keyB) return 0;
    } else {
      if (
        !Object.prototype.hasOwnProperty.call(a, key) ||
        !Object.prototype.hasOwnProperty.call(b, key)
      )
        return 0;
      keyA = String(a[key]).toLowerCase();
      keyB = String(b[key]).toLowerCase();
    }

    const first =
      keyA in sortingOrder ? sortingOrder[keyA] : Number.MAX_SAFE_INTEGER;

    const second =
      keyB in sortingOrder ? sortingOrder[keyB] : Number.MAX_SAFE_INTEGER;

    let result = 0;
    if (first < second) result = -1;
    else if (first > second) result = 1;
    return order === 'desc' ? result * -1 : result;
  };
}

export function copyLatLngs(
  layer: L.Polygon | L.Polyline,
  latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][] = layer.getLatLngs()
): L.LatLng[] | L.LatLng[][] | L.LatLng[][][] {
  if (layer instanceof L.Polygon) {
    return L.polygon(latlngs as L.LatLng[][]).getLatLngs();
  }
  return L.polyline(latlngs as L.LatLng[]).getLatLngs();
}

// Extended map options type for CRS projection
interface ExtendedMapOptions extends L.MapOptions {
  crs?: L.CRS & {
    projection?: {
      MAX_LATITUDE?: number;
    };
  };
}

// Replaces the lat value with the MAX_LATITUDE of CRS if it is lower / higher
export function fixLatOffset(latlng: L.LatLng, map: L.Map): L.LatLng {
  const options = map.options as ExtendedMapOptions;
  if (options.crs?.projection?.MAX_LATITUDE) {
    const max = options.crs.projection.MAX_LATITUDE;
    latlng.lat = Math.max(Math.min(max, latlng.lat), -max);
  }
  return latlng;
}

// Extended layer type for internal Leaflet properties
// Using a separate interface rather than extending L.Path to avoid protected property issues
interface ExtendedPathInternal {
  options: L.PathOptions;
  _map?: {
    _getPaneRenderer?: (pane: string) => L.Renderer | undefined;
    options: {
      renderer?: L.Renderer;
    };
    _renderer?: L.Renderer;
  };
  _renderer?: L.Renderer;
}

export function getRenderer(layer: L.Path): L.Renderer | undefined {
  const extLayer = layer as unknown as ExtendedPathInternal;
  return (
    layer.options.renderer ||
    (extLayer._map &&
      (extLayer._map._getPaneRenderer?.(layer.options.pane || '') ||
        extLayer._map.options.renderer ||
        extLayer._map._renderer)) ||
    extLayer._renderer
  );
}
