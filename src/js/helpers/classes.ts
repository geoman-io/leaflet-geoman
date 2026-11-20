// Helpers for Geoman's ES classes, replacing what PMClass.extend did.

type WithOptions = { prototype: { options?: object } };

/**
 * Sets a class's default options on its prototype, chained to the parent
 * class's defaults. `L.Util.setOptions` and the unknown-option check read
 * them from there.
 */
export function defineOptions(cls: WithOptions, options: object) {
  const parent = (Object.getPrototypeOf(cls.prototype) as { options?: object })
    ?.options;
  cls.prototype.options = Object.assign(
    parent ? Object.create(parent) : {},
    options
  );
}

/** Copies mixin objects onto a class's prototype; later ones win. */
export function applyMixins(cls: { prototype: object }, ...mixins: object[]) {
  Object.assign(cls.prototype, ...mixins);
}
