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

import booleanContains from '@turf/boolean-contains';
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

const positionIsFinite = (position: unknown): boolean =>
  Array.isArray(position) &&
  position.length >= 2 &&
  Number.isFinite(position[0]) &&
  Number.isFinite(position[1]);

const ringIsUsable = (ring: unknown): ring is Position[] =>
  Array.isArray(ring) && ring.length >= 4 && ring.every(positionIsFinite);

/**
 * Leaflet keeps an empty hole (`[]`) on a polygon. `@turf/boolean-contains`
 * and polyclip then throw, which aborts cut and a containment drag.
 */
export function withoutDegenerateRings<T extends PolygonInput>(input: T): T {
  const geometry = getGeometry(input);
  let next: Polygon | MultiPolygon = geometry;
  if (geometry.type === 'Polygon') {
    const coordinates = geometry.coordinates.filter(ringIsUsable);
    if (coordinates.length === 0) return input;
    next = { type: 'Polygon', coordinates };
  } else if (geometry.type === 'MultiPolygon') {
    const coordinates = geometry.coordinates
      .map((part) => part.filter(ringIsUsable))
      .filter((part) => part.length > 0);
    if (coordinates.length === 0) return input;
    next = { type: 'MultiPolygon', coordinates };
  } else {
    return input;
  }
  if ((input as { type?: string }).type === 'Feature') {
    return { ...(input as object), geometry: next } as T;
  }
  return next as T;
}

export function intersect(poly1: PolygonInput, poly2: PolygonInput) {
  const geom1 = getGeometry(withoutDegenerateRings(poly1));
  const geom2 = getGeometry(withoutDegenerateRings(poly2));

  let intersection: ReturnType<typeof polygonClipping.intersection>;
  try {
    intersection = polygonClipping.intersection(
      geom1.coordinates as polygonClipping.Geom,
      geom2.coordinates as polygonClipping.Geom
    );
  } catch {
    return null;
  }
  if (intersection.length === 0) return null;
  if (intersection.length === 1) return turfPolygon(intersection[0]);
  return turfMultiPolygon(intersection);
}

export function difference(polygon1: PolygonInput, polygon2: PolygonInput) {
  const geom1 = getGeometry(withoutDegenerateRings(polygon1));
  const geom2 = getGeometry(withoutDegenerateRings(polygon2));

  let differenced: ReturnType<typeof polygonClipping.difference>;
  try {
    differenced = polygonClipping.difference(
      geom1.coordinates as polygonClipping.Geom,
      geom2.coordinates as polygonClipping.Geom
    );
  } catch {
    return null;
  }
  if (differenced.length === 0) return null;
  if (differenced.length === 1) return turfPolygon(differenced[0]);
  return turfMultiPolygon(differenced);
}

/** Containment that does not throw when a ring is empty. */
export function contains(
  outer: PolygonInput,
  inner: Feature | PolygonInput
): boolean {
  try {
    return booleanContains(
      withoutDegenerateRings(outer) as Feature,
      withoutDegenerateRings(inner as PolygonInput) as Feature
    );
  } catch {
    return false;
  }
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

  const geometry = getGeometry(polyline);
  // Depth looks at the first part. An empty part is `[]`, so a MultiLineString
  // is mistaken for a LineString and `@turf/line-split` throws.
  if (geometry.type === 'MultiLineString') {
    return geometry.coordinates
      .filter((coord) => coord.length >= 2)
      .map((coord) => turfLineString(coord));
  }
  if (geometry.type === 'LineString' && geometry.coordinates.length < 2) {
    return [];
  }
  return [polyline as GeometryFeature<LineString>];
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
