import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { hasValues, removeEmptyCoordRings } from './index';

describe('hasValues', () => {
  describe('flat arrays', () => {
    it('returns true for array with values', () => {
      expect(hasValues([1, 2, 3])).toBe(true);
      expect(hasValues(['a', 'b'])).toBe(true);
      expect(hasValues([0])).toBe(true); // 0 is a value
      expect(hasValues([false])).toBe(true); // false is a value
    });

    it('returns false for empty array', () => {
      expect(hasValues([])).toBe(false);
    });

    it('returns false for array with only null/undefined/empty strings', () => {
      expect(hasValues([null])).toBe(false);
      expect(hasValues([undefined])).toBe(false);
      expect(hasValues([''])).toBe(false);
      expect(hasValues([null, undefined, ''])).toBe(false);
    });

    it('returns true if at least one value exists', () => {
      expect(hasValues([null, 1])).toBe(true);
      expect(hasValues(['', 'a'])).toBe(true);
      expect(hasValues([undefined, false])).toBe(true);
    });
  });

  describe('nested arrays', () => {
    it('returns true for nested array with values', () => {
      expect(hasValues([[1, 2], [3]])).toBe(true);
      expect(hasValues([[[['deep']]]])).toBe(true);
    });

    it('returns false for nested empty arrays', () => {
      expect(hasValues([[]])).toBe(false);
      expect(hasValues([[], []])).toBe(false);
      expect(hasValues([[[]]])).toBe(false);
    });

    it('returns false for nested arrays with only null/undefined/empty', () => {
      expect(hasValues([[null]])).toBe(false);
      expect(hasValues([[undefined, '']])).toBe(false);
      expect(hasValues([[[null]], [['']]])).toBe(false);
    });

    it('returns true if deeply nested value exists', () => {
      expect(hasValues([[null], [['value']]])).toBe(true);
      expect(hasValues([[[[]]], [[1]]])).toBe(true);
    });
  });
});

describe('removeEmptyCoordRings', () => {
  describe('flat arrays', () => {
    it('returns array with values unchanged', () => {
      expect(removeEmptyCoordRings([1, 2, 3])).toEqual([1, 2, 3]);
      expect(removeEmptyCoordRings(['a', 'b'])).toEqual(['a', 'b']);
    });

    it('returns empty array for empty input', () => {
      expect(removeEmptyCoordRings([])).toEqual([]);
    });
  });

  describe('arrays with empty sub-arrays', () => {
    it('removes empty sub-arrays', () => {
      expect(removeEmptyCoordRings([[], [1, 2]])).toEqual([[1, 2]]);
      expect(removeEmptyCoordRings([[1], [], [2]])).toEqual([[1], [2]]);
    });

    it('removes all empty sub-arrays', () => {
      expect(removeEmptyCoordRings([[], [], []])).toEqual([]);
    });

    it('handles deeply nested empty arrays', () => {
      expect(removeEmptyCoordRings([[[]]])).toEqual([]);
      expect(removeEmptyCoordRings([[[]], [[1]]])).toEqual([[[1]]]);
    });
  });

  describe('coordinate ring scenarios', () => {
    it('preserves valid coordinate rings', () => {
      const coords = [
        [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      ];
      expect(removeEmptyCoordRings(coords)).toEqual(coords);
    });

    it('removes empty rings from polygon', () => {
      const coords = [
        [
          [0, 0],
          [1, 1],
        ],
        [],
        [
          [2, 2],
          [3, 3],
        ],
      ];
      expect(removeEmptyCoordRings(coords)).toEqual([
        [
          [0, 0],
          [1, 1],
        ],
        [
          [2, 2],
          [3, 3],
        ],
      ]);
    });
  });
});
