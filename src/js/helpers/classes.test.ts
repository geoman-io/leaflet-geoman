import { describe, expect, it } from 'vitest';
import { applyMixins } from './classes';

// Pins how applyMixins resolves a member that more than one source defines.
// The Leaflet 1 style class factory let the class body win over its
// includes; applyMixins runs after the class body, so a mixin now wins.
// Neither free nor Pro has such a collision today. Change this test together
// with that decision.
describe('applyMixins', () => {
  it('lets a later mixin win over an earlier one', () => {
    class Host {}
    applyMixins(Host, { name: () => 'first' }, { name: () => 'second' });
    expect((new Host() as unknown as { name(): string }).name()).toBe('second');
  });

  it('lets a mixin win over a class member', () => {
    class Host {
      name() {
        return 'class';
      }
    }
    applyMixins(Host, { name: () => 'mixin' });
    expect(new Host().name()).toBe('mixin');
  });

  it('leaves a subclass member over a parent mixin', () => {
    class Parent {}
    applyMixins(Parent, { name: () => 'mixin' });
    class Child extends Parent {
      name() {
        return 'child';
      }
    }
    expect(new Child().name()).toBe('child');
  });
});
