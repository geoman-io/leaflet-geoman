import * as polygonClipping from 'polyclip-ts';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    formatNum: (num: number, precision: number) => number;
  };
};

/**
 * Coordinate types for GeoJSON
 */
type Position = [number, number];
type LineStringCoords = Position[];
type PolygonCoords = Position[][];
type MultiLineStringCoords = Position[][];
type MultiPolygonCoords = Position[][][];
type Coordinates = Position | LineStringCoords | PolygonCoords | MultiLineStringCoords | MultiPolygonCoords;

/**
 * GeoJSON geometry types
 */
interface PointGeometry {
  type: 'Point';
  coordinates: Position;
}

interface LineStringGeometry {
  type: 'LineString';
  coordinates: LineStringCoords;
}

interface MultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: MultiLineStringCoords;
}

interface PolygonGeometry {
  type: 'Polygon';
  coordinates: PolygonCoords;
}

interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: MultiPolygonCoords;
}

type Geometry = PointGeometry | LineStringGeometry | MultiLineStringGeometry | PolygonGeometry | MultiPolygonGeometry;

/**
 * GeoJSON feature
 */
interface Feature<G extends Geometry = Geometry> {
  type: 'Feature';
  geometry: G;
  properties?: Record<string, unknown>;
}

/**
 * GeoJSON feature collection
 */
interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

/**
 * Input GeoJSON that might be a feature or geometry
 */
type GeoJSONInput = Feature | Geometry;

/**
 * Create a GeoJSON feature from a geometry
 */
export function feature<G extends Geometry>(geom: G): Feature<G> {
  const feat: Feature<G> = { type: 'Feature', geometry: geom };
  return feat;
}

/**
 * Get geometry from a GeoJSON feature or return the geometry directly
 */
export function getGeometry(geojson: GeoJSONInput): Geometry {
  if ((geojson as Feature).type === 'Feature') return (geojson as Feature).geometry;
  return geojson as Geometry;
}

/**
 * Get coordinates from a GeoJSON feature or geometry
 */
export function getCoords(geojson: GeoJSONInput | Coordinates): Coordinates {
  if (geojson && (geojson as Feature).geometry && (geojson as Feature).geometry.coordinates) {
    return (geojson as Feature).geometry.coordinates;
  }
  return geojson as Coordinates;
}

/**
 * Create a GeoJSON Point feature
 */
export function turfPoint(coords: Position, precision = -1): Feature<PointGeometry> {
  if (precision > -1) {
    coords[0] = L.Util.formatNum(coords[0], precision);
    coords[1] = L.Util.formatNum(coords[1], precision);
  }

  return feature({ type: 'Point', coordinates: coords });
}

/**
 * Create a GeoJSON LineString feature
 */
export function turfLineString(coords: LineStringCoords): Feature<LineStringGeometry> {
  return feature({ type: 'LineString', coordinates: coords });
}

/**
 * Create a GeoJSON MultiLineString feature
 */
export function turfMultiLineString(coords: MultiLineStringCoords): Feature<MultiLineStringGeometry> {
  return feature({ type: 'MultiLineString', coordinates: coords });
}

/**
 * Create a GeoJSON Polygon feature
 */
export function turfPolygon(coords: PolygonCoords): Feature<PolygonGeometry> {
  return feature({ type: 'Polygon', coordinates: coords });
}

/**
 * Create a GeoJSON MultiPolygon feature
 */
export function turfMultiPolygon(coords: MultiPolygonCoords): Feature<MultiPolygonGeometry> {
  return feature({ type: 'MultiPolygon', coordinates: coords });
}

/**
 * Create a GeoJSON FeatureCollection
 */
export function turfFeatureCollection(features: Feature[]): FeatureCollection {
  return { type: 'FeatureCollection', features };
}

/**
 * Calculate the intersection of two polygons
 */
export function intersect(
  poly1: Feature<PolygonGeometry | MultiPolygonGeometry>,
  poly2: Feature<PolygonGeometry | MultiPolygonGeometry>
): Feature<PolygonGeometry> | Feature<MultiPolygonGeometry> | null {
  const geom1 = getGeometry(poly1) as PolygonGeometry | MultiPolygonGeometry;
  const geom2 = getGeometry(poly2) as PolygonGeometry | MultiPolygonGeometry;

  const intersection = polygonClipping.intersection(
    geom1.coordinates as unknown as polygonClipping.Geom,
    geom2.coordinates as unknown as polygonClipping.Geom
  );
  if (intersection.length === 0) return null;
  if (intersection.length === 1) return turfPolygon(intersection[0]);
  return turfMultiPolygon(intersection);
}

/**
 * Calculate the difference of two polygons
 */
export function difference(
  polygon1: Feature<PolygonGeometry | MultiPolygonGeometry>,
  polygon2: Feature<PolygonGeometry | MultiPolygonGeometry>
): Feature<PolygonGeometry> | Feature<MultiPolygonGeometry> | null {
  const geom1 = getGeometry(polygon1) as PolygonGeometry | MultiPolygonGeometry;
  const geom2 = getGeometry(polygon2) as PolygonGeometry | MultiPolygonGeometry;

  const differenced = polygonClipping.difference(
    geom1.coordinates as unknown as polygonClipping.Geom,
    geom2.coordinates as unknown as polygonClipping.Geom
  );
  if (differenced.length === 0) return null;
  if (differenced.length === 1) return turfPolygon(differenced[0]);
  return turfMultiPolygon(differenced);
}

/**
 * Get depth of coordinates array
 * LineString coords returns 1
 * MultiLineString coords returns 2
 */
export function getDepthOfCoords(coords: unknown): number {
  if (Array.isArray(coords)) {
    return 1 + getDepthOfCoords(coords[0]);
  }
  return -1; // return -1 because this is already the lng of the lnglat (geojson) array
}

/**
 * Flatten a polyline to an array of LineString features
 */
export function flattenPolyline(
  polyline: L.Polyline | Feature<LineStringGeometry | MultiLineStringGeometry> | GeoJSON.Feature
): Feature<LineStringGeometry>[] {
  let geojson: Feature<LineStringGeometry | MultiLineStringGeometry> | GeoJSON.Feature = polyline as Feature<LineStringGeometry | MultiLineStringGeometry>;
  if (polyline instanceof L.Polyline) {
    geojson = polyline.toGeoJSON(15);
  }

  const geojsonInput = geojson as unknown as GeoJSONInput;
  const coords = getCoords(geojsonInput) as LineStringCoords | MultiLineStringCoords;
  const depth = getDepthOfCoords(coords);
  const features: Feature<LineStringGeometry>[] = [];
  if (depth > 1) {
    (coords as MultiLineStringCoords).forEach((coord: LineStringCoords) => {
      features.push(turfLineString(coord));
    });
  } else {
    features.push(geojson as Feature<LineStringGeometry>);
  }

  return features;
}

/**
 * Convert a LayerGroup to a MultiLineString feature
 */
export function groupToMultiLineString(group: L.LayerGroup): Feature<MultiLineStringGeometry> {
  const coords: MultiLineStringCoords = [];
  group.eachLayer((layer) => {
    coords.push(getCoords((layer as L.Polyline).toGeoJSON(15) as unknown as GeoJSONInput) as LineStringCoords);
  });
  return turfMultiLineString(coords);
}

/**
 * Convert GeoJSON coordinates to Leaflet LatLng
 */
export function convertToLatLng(coords: Feature<PointGeometry> | Position): L.LatLng {
  const lnglat = getCoords(coords) as Position;
  return L.latLng(lnglat[1], lnglat[0]);
}

/**
 * Convert a FeatureCollection to an array of LatLngs
 */
export function convertArrayToLatLngs(arr: FeatureCollection): L.LatLng[] {
  const latlngs: L.LatLng[] = [];
  if (arr.features) {
    arr.features.forEach((geojson: Feature) => {
      latlngs.push(convertToLatLng(geojson as Feature<PointGeometry>));
    });
  }
  return latlngs;
}
