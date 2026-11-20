import { describe, expect, it } from 'vitest';
import { applyMixins } from './classes';

// Pins how applyMixins resolves a member that more than one source defines.
// The Leaflet 1 style class factory let the class body win over its
// includes. applyMixins runs after the class body, so a mixin would win; it
// refuses instead, because a mixin that silently replaces a method is a bug
// nobody sees. Change this test together with that decision.
describe('applyMixins', () => {
  it('lets a later mixin win over an earlier one in the same call', () => {
    class Host {}
    applyMixins(Host, { name: () => 'first' }, { name: () => 'second' });
    expect((new Host() as unknown as { name(): string }).name()).toBe('second');
  });

  it('refuses a mixin that would replace a class member', () => {
    class Host {
      name() {
        return 'class';
      }
      other() {
        return 'class';
      }
    }
    expect(() =>
      applyMixins(Host, { added: () => 'mixin', name: () => 'mixin' })
    ).toThrow(/Host.*name/);
    // nothing was copied, not even the member that didn't collide
    expect(new Host().name()).toBe('class');
    expect('added' in Host.prototype).toBe(false);
  });

  it('refuses a mixin that would replace a member of an earlier call', () => {
    class Host {}
    applyMixins(Host, { name: () => 'first', keep: () => 'first' });
    expect(() =>
      applyMixins(Host, { name: () => 'second' }, { keep: () => 'second' })
    ).toThrow(/Host.*name, keep/);
    expect((new Host() as unknown as { name(): string }).name()).toBe('first');
  });

  it('lets a mixin on a subclass override an inherited member', () => {
    class Parent {
      name() {
        return 'parent';
      }
      inherited() {
        return 'parent';
      }
    }
    applyMixins(Parent, { mixed: () => 'parent mixin' });
    class Child extends Parent {}
    applyMixins(Child, { name: () => 'child', mixed: () => 'child mixin' });
    const child = new Child() as Child & { mixed(): string };
    expect(child.name()).toBe('child');
    expect(child.mixed()).toBe('child mixin');
    expect(child.inherited()).toBe('parent');
    expect(new Parent().name()).toBe('parent');
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
