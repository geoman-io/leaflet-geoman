import { describe, expect, it, vi } from 'vitest';
import { checkOptions, mergeOptions } from './options';

describe('mergeOptions', () => {
  it('merges plain objects, replaces arrays and copies both', () => {
    const order = ['Polygon', 'Line'];
    const panes = { layerPane: 'custom' };
    const target = {
      snappingOrder: ['Marker', 'Circle', 'Line'],
      panes: { layerPane: 'overlayPane', vertexPane: 'markerPane' },
    };
    const out = mergeOptions(target, { snappingOrder: order, panes });

    expect(out).toBe(target);
    expect(out.snappingOrder).toEqual(['Polygon', 'Line']);
    expect(out.snappingOrder).not.toBe(order);
    expect(out.panes).toEqual({
      layerPane: 'custom',
      vertexPane: 'markerPane',
    });
    expect(panes).toEqual({ layerPane: 'custom' });
  });

  it('stores class instances and functions as they are', () => {
    class Group {
      layers = [1];
    }
    const group = new Group();
    const fn = () => true;
    const out = mergeOptions<Record<string, unknown>>(
      { layerGroup: { layers: [2, 3] } },
      { layerGroup: group, moveVertexValidation: fn }
    );
    expect(out.layerGroup).toBe(group);
    expect(out.moveVertexValidation).toBe(fn);
  });

  it('keeps a value set to undefined and skips __proto__', () => {
    const out = mergeOptions<Record<string, unknown>>(
      { snappable: false },
      JSON.parse('{"snappable": null, "__proto__": {"polluted": true}}')
    );
    expect(out.snappable).toBe(null);
    expect(({} as Record<string, unknown>).polluted).toBe(undefined);
    expect(
      mergeOptions<Record<string, unknown>>({ a: 1 }, { a: undefined }).a
    ).toBe(1);
  });
});

describe('checkOptions', () => {
  it('ignores a non-object and warns once per unknown key', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(checkOptions('ab' as never, 'x()')).toBe(undefined);
    expect(checkOptions([1] as never, 'x()')).toBe(undefined);
    const options = { snappable: true, unitTestKey: 1 };
    expect(checkOptions(options, 'x()')).toBe(options);
    checkOptions({ unitTestKey: 2 }, 'x()');
    expect(warn).toHaveBeenCalledTimes(3);
    warn.mockRestore();
  });
});

describe('checkOptions in a production build', () => {
  it('stores unknown keys and ignores non-objects without warning', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const options = { prodOnlyKey: 1 };
    expect(checkOptions(options, 'x()')).toBe(options);
    expect(checkOptions('ab' as never, 'x()')).toBe(undefined);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    vi.unstubAllEnvs();
  });
});
