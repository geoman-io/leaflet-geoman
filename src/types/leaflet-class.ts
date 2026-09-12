/**
 * Types for Leaflet 1.x's runtime class factory. Keeping the factory preserves
 * extend/include, init hooks, option inheritance and enumerable prototypes.
 */
export type Inherit<Parent, Child> = Child & Omit<Parent, keyof Child>;

type MethodKeys<T> = {
  [K in keyof T]-?: T[K] extends (...args: never[]) => unknown ? K : never;
}[keyof T];

type RequiredMethodKeys<T, Inherited> = {
  [K in MethodKeys<T>]: K extends keyof Inherited
    ? Inherited[K] extends T[K]
      ? never
      : K
    : K;
}[MethodKeys<T>];

type BoundMembers<T> = {
  [K in keyof T]: OmitThisParameter<T[K]>;
};

/** Leaflet copies mixins in order; later definitions override earlier ones. */
export type MixinMembers<Mixins extends readonly object[]> =
  Mixins extends readonly [
    infer First extends object,
    ...infer Rest extends object[],
  ]
    ? Inherit<BoundMembers<First>, MixinMembers<Rest>>
    : {};

export type ClassDefinition<
  T,
  Args extends unknown[],
  Parent = {},
  Mixins extends readonly object[] = [],
> = Partial<T> &
  Pick<T, RequiredMethodKeys<T, Inherit<Parent, MixinMembers<Mixins>>>> &
  ThisType<Inherit<Inherit<Parent, MixinMembers<Mixins>>, T>> & {
    initialize?: (
      this: Inherit<Inherit<Parent, MixinMembers<Mixins>>, T>,
      ...args: Args
    ) => void;
  } & (Mixins extends readonly []
    ? { includes?: never }
    : { includes: Mixins });

export interface LeafletClass<T, Args extends unknown[] = unknown[]> {
  new (...args: Args): T;
  prototype: T;
  extend<
    Child,
    ChildArgs extends unknown[] = Args,
    Mixins extends readonly object[] = [],
  >(
    definition: ClassDefinition<Child, ChildArgs, T, Mixins>
  ): LeafletClass<Inherit<Inherit<T, MixinMembers<Mixins>>, Child>, ChildArgs>;
  include(properties: Partial<T> & ThisType<T>): this;
  mergeOptions(options: object): this;
  addInitHook(hook: (this: T) => void): this;
  addInitHook(method: keyof T, ...args: unknown[]): this;
}

export interface LeafletClassFactory<Parent = {}> {
  extend<T, Args extends unknown[], Mixins extends readonly object[] = []>(
    definition: ClassDefinition<T, Args, Parent, Mixins>
  ): LeafletClass<Inherit<Inherit<Parent, MixinMembers<Mixins>>, T>, Args>;
}
