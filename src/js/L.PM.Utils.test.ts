import { describe, expect, it } from 'vitest';
import Utils from './L.PM.Utils';

describe('findDeepCoordIndex', () => {
  it('finds a vertex on the equator', () => {
    const equator = { lat: 0, lng: 10 };
    const coords = [[{ lat: 0, lng: 0 }, equator, { lat: 1, lng: 1 }]];

    expect(Utils.findDeepCoordIndex(coords as never, equator as never)).toEqual(
      {
        indexPath: [0, 1],
        index: 1,
        parentPath: [0],
      }
    );
  });

  it('finds a vertex at latitude 0 and longitude 0', () => {
    const origin = { lat: 0, lng: 0 };
    const coords = [origin, { lat: 1, lng: 1 }];

    expect(
      Utils.findDeepCoordIndex(coords as never, origin as never).index
    ).toBe(0);
  });
});
