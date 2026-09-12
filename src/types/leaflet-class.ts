/**
 * Types for Leaflet 1.x's runtime class factory. Keeping the factory preserves
 * extend/include, init hooks, option inheritance and enumerable prototypes.
 */
export type ClassDefinition<T, Args extends unknown[]> = Partial<T> &
  ThisType<T> & {
    includes?: object[];
    initialize?: (this: T, ...args: Args) => void;
  };

export type Inherit<Parent, Child> = Child & Omit<Parent, keyof Child>;

export interface LeafletClass<T, Args extends unknown[] = unknown[]> {
  new (...args: Args): T;
  prototype: T;
  extend<Child, ChildArgs extends unknown[] = Args>(
    definition: ClassDefinition<Child, ChildArgs>
  ): LeafletClass<Inherit<T, Child>, ChildArgs>;
  include(properties: Partial<T> & ThisType<T>): this;
  mergeOptions(options: object): this;
  addInitHook(hook: (this: T) => void): this;
  addInitHook(method: keyof T, ...args: unknown[]): this;
}

export interface LeafletClassFactory {
  extend<T, Args extends unknown[]>(
    definition: ClassDefinition<T, Args>
  ): LeafletClass<T, Args>;
}
