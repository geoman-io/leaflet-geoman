// Helpers for Geoman's ES classes: option defaults on the prototype, and
// plain-object mixins copied onto it.

type BoundMembers<T> = {
  [K in keyof T]: OmitThisParameter<T[K]>;
};

/**
 * The members of plain-object mixins, without their `this` parameters, for
 * typing a class through interface merging. Later mixins override earlier
 * ones, as `applyMixins` copies them.
 */
export type MixinMembers<Mixins extends readonly object[]> =
  Mixins extends readonly [
    infer First extends object,
    ...infer Rest extends object[],
  ]
    ? MixinMembers<Rest> & Omit<BoundMembers<First>, keyof MixinMembers<Rest>>
    : {};

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
