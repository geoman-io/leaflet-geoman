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

export function isEmptyDeep(l) {
  // thanks for the function, Felix Heck
  const flatten = list =>
    list
      .filter(x => ![null, '', undefined].includes(x))
      .reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  return !flatten(l).length;
}

export function removeEmptyCoordRings(arr) {
  return arr.reduce((result, item)=>{
    if(item.length !== 0){
      result.push( Array.isArray(item) ? removeEmptyCoordRings(item) : item );
    }
    return result;
  }, []);
}

// Code from https://stackoverflow.com/a/24153998/8283938
function destinationVincenty(lonlat, brng, dist) { // rewritten to work with leaflet
  const VincentyConstants = {
    a: 6378137,
    b: 6356752.3142,
    f: 1 / 298.257223563
  };

  const { a, b, f } = VincentyConstants;
  const lon1 = lonlat.lng;
  const lat1 = lonlat.lat;
  const s = dist;
  const pi = Math.PI;
  const alpha1 = brng * pi / 180; // converts brng degrees to radius
  const sinAlpha1 = Math.sin(alpha1);
  const cosAlpha1 = Math.cos(alpha1);
  const tanU1 = (1 - f) * Math.tan(lat1 * pi / 180 /* converts lat1 degrees to radius */);
  const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1));
  const sinU1 = tanU1 * cosU1;
  const sigma1 = Math.atan2(tanU1, cosAlpha1);
  const sinAlpha = cosU1 * sinAlpha1;
  const cosSqAlpha = 1 - sinAlpha * sinAlpha;
  const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  let sigma = s / (b * A);
  let sigmaP = 2 * Math.PI;

  let cos2SigmaM;
  let sinSigma;
  let cosSigma;
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b * A) + deltaSigma;
  }
  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
  const lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1);
  const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
  const lam = lambda - (1 - C) * f * sinAlpha *
    (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  // const revAz = Math.atan2(sinAlpha, -tmp);  // final bearing
  const lamFunc = lon1 + (lam * 180 / pi); // converts lam radius to degrees
  const lat2a = lat2 * 180 / pi; // converts lat2a radius to degrees

  return L.latLng(lamFunc, lat2a);
}
export function createGeodesicPolygon(origin, radius, sides, rotation) {
  let angle;
  let newLonlat;
  let geomPoint;
  const points = [];

  for (let i = 0; i < sides; i += 1) {
    angle = (i * 360 / sides) + rotation;
    newLonlat = destinationVincenty(origin, angle, radius);
    geomPoint = L.latLng(newLonlat.lng, newLonlat.lat);
    points.push(geomPoint);
  }

  return points;
}
