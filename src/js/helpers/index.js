import get from 'lodash/get';
import has from 'lodash/has';
import translations from '../../assets/translations';

export function getTranslation(path) {
  let lang = L.PM.activeLang;

  if (!has(translations, lang)) {
    lang = 'en';
  }

  return get(translations[lang], path);
}

export function hasValues(list) {
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

export function removeEmptyCoordRings(arr) {
  return arr.reduce((result, item) => {
    if (item.length !== 0) {
      const newItem = Array.isArray(item) ? removeEmptyCoordRings(item) : item;
      if (Array.isArray(newItem)) {
        if (newItem.length !== 0) {
          result.push(newItem);
        }
      } else {
        result.push(newItem);
      }
    }
    return result;
  }, []);
}

// Code from https://stackoverflow.com/a/24153998/8283938
function destinationVincenty(lonlat, brng, dist) {
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

  let cos2SigmaM;
  let sinSigma;
  let cosSigma;
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
  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  const lat2 = Math.atan2(
    sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
  );
  const lambda = Math.atan2(
    sinSigma * sinAlpha1,
    cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
  );
  const C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  const lam =
    lambda -
    (1 - C) *
      f *
      sinAlpha *
      (sigma +
        C *
          sinSigma *
          (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  // const revAz = Math.atan2(sinAlpha, -tmp);  // final bearing
  const lamFunc = lon1 + (lam * 180) / pi; // converts lam radius to degrees
  const lat2a = (lat2 * 180) / pi; // converts lat2a radius to degrees

  return L.latLng(lamFunc, lat2a);
}

export function createGeodesicPolygon(
  origin,
  radius,
  sides,
  rotation,
  withBearing = true
) {
  let trueAngle;
  let newLonlat;
  let geomPoint;
  const points = [];

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
function destination(latlng, heading, distance) {
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
export function calcAngle(map, latlngA, latlngB) {
  const pointA = map.latLngToContainerPoint(latlngA);
  const pointB = map.latLngToContainerPoint(latlngB);
  let angleDeg =
    (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) / Math.PI + 90;
  angleDeg += angleDeg < 0 ? 360 : 0;
  return angleDeg;
}

export function destinationOnLine(map, latlngA, latlngB, distance) {
  const angleDeg = calcAngle(map, latlngA, latlngB);
  return destination(latlngA, angleDeg, distance);
}

// this function is used with the .sort(prioritiseSort(key, sortingOrder)) function of arrays
export function prioritiseSort(key, _sortingOrder, order = 'asc') {
  /* the sorting order has all possible keys (lowercase) with the index and then it is sorted by the key on the object */

  if (!_sortingOrder || Object.keys(_sortingOrder).length === 0) {
    return (a, b) => a - b; // default sort method
  }

  // change the keys to lowercase
  const keys = Object.keys(_sortingOrder);
  let objKey;
  let n = keys.length - 1;
  const sortingOrder = {};
  while (n >= 0) {
    objKey = keys[n];
    sortingOrder[objKey.toLowerCase()] = _sortingOrder[objKey];
    n -= 1;
  }

  function getShape(layer) {
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

  return (a, b) => {
    let keyA;
    let keyB;
    if (key === 'instanceofShape') {
      keyA = getShape(a.layer).toLowerCase();
      keyB = getShape(b.layer).toLowerCase();
      if (!keyA || !keyB) return 0;
    } else {
      /* eslint-disable-next-line no-prototype-builtins */
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
      keyA = a[key].toLowerCase();
      keyB = b[key].toLowerCase();
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

export function copyLatLngs(layer, latlngs = layer.getLatLngs()) {
  if (layer instanceof L.Polygon) {
    return L.polygon(latlngs).getLatLngs();
  }
  return L.polyline(latlngs).getLatLngs();
}

// Replaces the lat value with the MAX_LATITUDE of CRS if it is lower / higher
export function fixLatOffset(latlng, map) {
  if (map.options.crs?.projection?.MAX_LATITUDE) {
    const max = map.options.crs?.projection?.MAX_LATITUDE;
    latlng.lat = Math.max(Math.min(max, latlng.lat), -max);
  }
  return latlng;
}

export function getRenderer(layer) {
  return (
    layer.options.renderer ||
    (layer._map &&
      (layer._map._getPaneRenderer(layer.options.pane) ||
        layer._map.options.renderer ||
        layer._map._renderer)) ||
    layer._renderer
  );
}
