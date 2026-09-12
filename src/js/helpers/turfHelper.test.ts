import { describe, it, expect } from 'vitest';
import {
  feature,
  getGeometry,
  getCoords,
  turfPoint,
  turfLineString,
  turfMultiLineString,
  turfPolygon,
  turfMultiPolygon,
  turfFeatureCollection,
  getDepthOfCoords,
} from './turfHelper';

describe('turfHelper', () => {
  describe('feature', () => {
    it('wraps geometry in a Feature', () => {
      const geom: GeoJSON.Point = { type: 'Point', coordinates: [0, 0] };
      const result = feature(geom);
      expect(result).toEqual({
        type: 'Feature',
        geometry: geom,
      });
    });

    it('handles complex geometry', () => {
      const geom: GeoJSON.Polygon = {
        type: 'Polygon',
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0],
          ],
        ],
      };
      const result = feature(geom);
      expect(result.type).toBe('Feature');
      expect(result.geometry).toBe(geom);
    });
  });

  describe('getGeometry', () => {
    it('extracts geometry from Feature', () => {
      const geom: GeoJSON.Point = { type: 'Point', coordinates: [0, 0] };
      const feat = { type: 'Feature' as const, geometry: geom };
      expect(getGeometry(feat)).toBe(geom);
    });

    it('returns geometry directly if not a Feature', () => {
      const geom: GeoJSON.Point = { type: 'Point', coordinates: [0, 0] };
      expect(getGeometry(geom)).toBe(geom);
    });
  });

  describe('getCoords', () => {
    it('extracts coordinates from Feature', () => {
      const coords = [0, 0];
      const feat = { geometry: { coordinates: coords } };
      expect(getCoords(feat)).toBe(coords);
    });

    it('returns input if no geometry.coordinates', () => {
      const coords = [0, 0];
      expect(getCoords(coords)).toBe(coords);
    });

    it('handles null/undefined', () => {
      expect(getCoords(null)).toBe(null);
      expect(getCoords(undefined)).toBe(undefined);
    });
  });

  describe('turfPoint', () => {
    it('creates a Point Feature', () => {
      const result = turfPoint([1, 2]);
      expect(result).toEqual({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2],
        },
      });
    });
  });

  describe('turfLineString', () => {
    it('creates a LineString Feature', () => {
      const coords = [
        [0, 0],
        [1, 1],
      ];
      const result = turfLineString(coords);
      expect(result).toEqual({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      });
    });
  });

  describe('turfMultiLineString', () => {
    it('creates a MultiLineString Feature', () => {
      const coords = [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [2, 2],
          [3, 3],
        ],
      ];
      const result = turfMultiLineString(coords);
      expect(result).toEqual({
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: coords,
        },
      });
    });
  });

  describe('turfPolygon', () => {
    it('creates a Polygon Feature', () => {
      const coords = [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 0],
        ],
      ];
      const result = turfPolygon(coords);
      expect(result).toEqual({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: coords,
        },
      });
    });
  });

  describe('turfMultiPolygon', () => {
    it('creates a MultiPolygon Feature', () => {
      const coords = [
        [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0],
          ],
        ],
        [
          [
            [2, 2],
            [3, 2],
            [3, 3],
            [2, 2],
          ],
        ],
      ];
      const result = turfMultiPolygon(coords);
      expect(result).toEqual({
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: coords,
        },
      });
    });
  });

  describe('turfFeatureCollection', () => {
    it('creates a FeatureCollection', () => {
      const features = [turfPoint([0, 0]), turfPoint([1, 1])];
      const result = turfFeatureCollection(features);
      expect(result).toEqual({
        type: 'FeatureCollection',
        features,
      });
    });

    it('handles empty array', () => {
      const result = turfFeatureCollection([]);
      expect(result).toEqual({
        type: 'FeatureCollection',
        features: [],
      });
    });
  });

  describe('getDepthOfCoords', () => {
    it('returns 1 for LineString coords (array of coordinates)', () => {
      const coords = [
        [0, 0],
        [1, 1],
      ];
      expect(getDepthOfCoords(coords)).toBe(1);
    });

    it('returns 2 for MultiLineString coords (array of arrays of coordinates)', () => {
      const coords = [
        [
          [0, 0],
          [1, 1],
        ],
        [
          [2, 2],
          [3, 3],
        ],
      ];
      expect(getDepthOfCoords(coords)).toBe(2);
    });

    it('returns 2 for Polygon coords', () => {
      const coords = [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 0],
        ],
      ];
      expect(getDepthOfCoords(coords)).toBe(2);
    });

    it('returns 3 for MultiPolygon coords', () => {
      const coords = [
        [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0],
          ],
        ],
      ];
      expect(getDepthOfCoords(coords)).toBe(3);
    });

    it('returns 0 for single coordinate pair', () => {
      const coords = [0, 0];
      expect(getDepthOfCoords(coords)).toBe(0);
    });

    it('returns -1 for non-array', () => {
      expect(getDepthOfCoords(0)).toBe(-1);
      expect(getDepthOfCoords(null)).toBe(-1);
    });
  });
});
