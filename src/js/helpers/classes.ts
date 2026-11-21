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

/**
 * Copies mixin objects onto a class's prototype. A later mixin wins over an
 * earlier one of the same call. A mixin may not replace a member the
 * prototype already has, from the class body or from an earlier call: that
 * throws, because nothing else would show that a method was replaced. To
 * replace one on purpose, override it in a subclass or assign it to the
 * prototype.
 */
export function applyMixins(
  cls: { name?: string; prototype: object },
  ...mixins: object[]
) {
  const own = new Set(Object.getOwnPropertyNames(cls.prototype));
  const taken = [
    ...new Set(mixins.flatMap((mixin) => Object.keys(mixin))),
  ].filter((key) => own.has(key));
  if (taken.length) {
    throw new TypeError(
      `applyMixins: ${cls.name || 'the class'} already defines ${taken.join(', ')}`
    );
  }
  Object.assign(cls.prototype, ...mixins);
}
