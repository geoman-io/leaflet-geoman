// Geoman's own classes (Map, Toolbar, Draw, Edit and their subclasses) use the
// Leaflet 1 style class factory: Draw.extend({...}), include(), mergeOptions()
// and addInitHook(). Leaflet 2 dropped Class.extend(), so Geoman keeps its own.
import { Util } from 'leaflet';
import type { LeafletClassFactory } from '../../types/leaflet-class';

type Definition = {
  initialize?: (...args: unknown[]) => void;
  includes?: object | object[];
  statics?: object;
  options?: object;
  [key: string]: unknown;
};

type ClassLike = Function & {
  prototype: Definition & {
    _initHooks?: Array<() => void>;
    callInitHooks?: () => void;
  };
};

/**
 * Leaflet 1's `Class.extend()` for Geoman's own classes, so they keep the same
 * `extend`/`include`/`mergeOptions`/`addInitHook` API on both versions.
 */
function extendClass(this: ClassLike, props: Definition) {
  const NewClass = function (this: Definition, ...args: unknown[]) {
    Util.setOptions(this, undefined as never);
    this.initialize?.apply(this, args);
    (this as { callInitHooks: () => void }).callInitHooks();
  } as unknown as ClassLike;

  const parentProto = this.prototype;
  const proto = Object.create(parentProto);
  proto.constructor = NewClass;
  NewClass.prototype = proto;

  for (const key of Object.keys(this)) {
    if (key !== 'prototype' && key !== '__super__') {
      (NewClass as unknown as Record<string, unknown>)[key] = (
        this as unknown as Record<string, unknown>
      )[key];
    }
  }

  if (props.statics) {
    Object.assign(NewClass, props.statics);
  }
  if (props.includes) {
    Object.assign(proto, ...[props.includes].flat());
  }
  Object.assign(proto, props);
  delete proto.statics;
  delete proto.includes;

  if (proto.options) {
    proto.options = parentProto.options
      ? Object.create(parentProto.options)
      : {};
    Object.assign(proto.options, props.options);
  }

  proto._initHooks = [];
  proto.callInitHooks = function (this: { _initHooksCalled?: boolean }) {
    if (this._initHooksCalled) {
      return;
    }
    parentProto.callInitHooks?.call(this);
    this._initHooksCalled = true;
    for (const hook of proto._initHooks) {
      hook.call(this);
    }
  };

  return NewClass;
}

function PMClass() {}
Object.assign(PMClass, {
  extend: extendClass,
  include(this: ClassLike, props: Definition) {
    const parentOptions = this.prototype.options;
    Object.assign(this.prototype, props);
    if (props.options) {
      this.prototype.options = parentOptions;
      Object.assign(this.prototype.options!, props.options);
    }
    return this;
  },
  mergeOptions(this: ClassLike, options: object) {
    Object.assign(this.prototype.options!, options);
    return this;
  },
  addInitHook(this: ClassLike, fn: string | (() => void), ...args: unknown[]) {
    const init =
      typeof fn === 'function'
        ? fn
        : function (this: Record<string, (...a: unknown[]) => void>) {
            this[fn](...args);
          };
    this.prototype._initHooks = this.prototype._initHooks || [];
    this.prototype._initHooks.push(init as () => void);
    return this;
  },
});

/** Base of Geoman's own classes (Map, Toolbar, Draw and Edit). */
export default PMClass as unknown as LeafletClassFactory;
