import type {
  Feature,
  Geometry,
  LineString,
  MultiLineString,
  Point,
  Polygon,
  MultiPolygon,
  Position,
} from 'geojson';

// These helpers intentionally omit properties, matching the historical runtime.
export type GeometryFeature<G extends Geometry = Geometry> = Pick<
  Feature<G>,
  'type' | 'geometry'
> &
  Partial<Pick<Feature<G>, 'properties'>>;
type PolygonInput =
  | Polygon
  | MultiPolygon
  | GeometryFeature<Polygon | MultiPolygon>;

import * as polygonClipping from 'polyclip-ts';

export function feature<G extends Geometry>(geom: G): GeometryFeature<G> {
  const feat = { type: 'Feature' } as GeometryFeature<G>;
  feat.geometry = geom;
  return feat;
}

export function getGeometry<G extends Geometry>(
  geojson: G | GeometryFeature<G>
): G {
  if (geojson.type === 'Feature') return geojson.geometry;
  return geojson;
}

type CoordinatesOf<T> = T extends { geometry: { coordinates: infer C } }
  ? C
  : T;
export function getCoords<T>(geojson: T): CoordinatesOf<T>;
export function getCoords(geojson: unknown): unknown {
  // Type assertions preserve the legacy passthrough without adding runtime guards.
  type Input = { geometry?: { coordinates?: unknown } };
  if (
    geojson &&
    (geojson as Input).geometry &&
    (geojson as Input).geometry!.coordinates
  )
    return (geojson as Input).geometry!.coordinates;
  return geojson;
}

export function turfPoint(coords: Position, precision = -1) {
  if (precision > -1) {
    coords[0] = L.Util.formatNum(coords[0], precision);
    coords[1] = L.Util.formatNum(coords[1], precision);
  }

  return feature({ type: 'Point', coordinates: coords });
}

export function turfLineString(coords: Position[]) {
  return feature({ type: 'LineString', coordinates: coords });
}

export function turfMultiLineString(coords: Position[][]) {
  return feature({ type: 'MultiLineString', coordinates: coords });
}

export function turfPolygon(coords: Position[][]) {
  return feature({ type: 'Polygon', coordinates: coords });
}

export function turfMultiPolygon(coords: Position[][][]) {
  return feature({ type: 'MultiPolygon', coordinates: coords });
}

export function turfFeatureCollection<G extends Geometry>(
  features: GeometryFeature<G>[]
): { type: 'FeatureCollection'; features: GeometryFeature<G>[] } {
  return { type: 'FeatureCollection', features };
}

export function intersect(poly1: PolygonInput, poly2: PolygonInput) {
  const geom1 = getGeometry(poly1);
  const geom2 = getGeometry(poly2);

  const intersection = polygonClipping.intersection(
    geom1.coordinates as polygonClipping.Geom,
    geom2.coordinates as polygonClipping.Geom
  );
  if (intersection.length === 0) return null;
  if (intersection.length === 1) return turfPolygon(intersection[0]);
  return turfMultiPolygon(intersection);
}

export function difference(polygon1: PolygonInput, polygon2: PolygonInput) {
  const geom1 = getGeometry(polygon1);
  const geom2 = getGeometry(polygon2);

  const differenced = polygonClipping.difference(
    geom1.coordinates as polygonClipping.Geom,
    geom2.coordinates as polygonClipping.Geom
  );
  if (differenced.length === 0) return null;
  if (differenced.length === 1) return turfPolygon(differenced[0]);
  return turfMultiPolygon(differenced);
}

// LineString coords returns 1
// MultiLineString coords returns 2
export function getDepthOfCoords(coords: unknown): number {
  if (Array.isArray(coords)) {
    return 1 + getDepthOfCoords(coords[0]);
  }
  return -1; // return -1 because this is already the lng of the lnglat (geojson) array
}

export function flattenPolyline(
  polyline: L.Polyline | GeometryFeature<LineString | MultiLineString>
): GeometryFeature<LineString>[] {
  if (polyline instanceof L.Polyline) {
    polyline = polyline.toGeoJSON(15);
  }

  const coords = getCoords(polyline);
  const depth = getDepthOfCoords(coords);
  const features: GeometryFeature<LineString>[] = [];
  if (depth > 1) {
    (coords as Position[][]).forEach((coord) => {
      features.push(turfLineString(coord));
    });
  } else {
    features.push(polyline as GeometryFeature<LineString>);
  }

  return features;
}

export function groupToMultiLineString(group: L.LayerGroup) {
  const coords: Position[][] = [];
  group.eachLayer((layer) => {
    coords.push(getCoords((layer as L.Polyline).toGeoJSON(15)) as Position[]);
  });
  return turfMultiLineString(coords);
}

export function convertToLatLng(
  coords: Position | GeometryFeature<Point>
): L.LatLng {
  const lnglat = getCoords(coords);
  return L.latLng(lnglat[1], lnglat[0]);
}

export function convertArrayToLatLngs(arr: {
  features?: GeometryFeature<Point>[];
}): L.LatLng[] {
  const latlngs: L.LatLng[] = [];
  if (arr.features) {
    arr.features.forEach((geojson) => {
      latlngs.push(convertToLatLng(geojson));
    });
  }
  return latlngs;
}
