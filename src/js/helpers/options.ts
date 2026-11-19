import type { GlobalOptions } from '../../types/options';

const objectCtorString = Function.prototype.toString.call(Object);

// Also true for objects from another frame, whose Object differs from ours.
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (
    value === null ||
    typeof value !== 'object' ||
    Object.prototype.toString.call(value) !== '[object Object]'
  ) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor')
    ? proto.constructor
    : undefined;
  return (
    typeof Ctor === 'function' &&
    Function.prototype.toString.call(Ctor) === objectCtorString
  );
}

/**
 * Merges `source` into `target` and returns `target`.
 *
 * - Plain objects merge key by key, so `{ panes: { layerPane } }` keeps the
 *   other panes.
 * - Arrays replace the old array instead of merging index by index.
 * - Plain objects and arrays from `source` are copied, so later changes to the
 *   caller's objects don't reach the options.
 * - Other values, such as layers, icons and functions, are stored as they are.
 * - A key set to `undefined` keeps the old value.
 */
export function mergeOptions<T extends object>(
  target: T,
  source: object | null | undefined
): T {
  if (!source) {
    return target;
  }
  const out = target as Record<string, unknown>;
  // `for...in` also reads inherited keys, as options objects are often
  // prototype-chained copies of a class's defaults.
  // eslint-disable-next-line guard-for-in
  for (const key in source) {
    if (key === '__proto__') {
      continue;
    }
    const value = (source as Record<string, unknown>)[key];
    if (value === undefined && key in out) {
      continue;
    }
    if (Array.isArray(value)) {
      out[key] = [...value];
    } else if (isPlainObject(value)) {
      out[key] = mergeOptions(
        isPlainObject(out[key]) ? (out[key] as object) : {},
        value
      );
    } else {
      out[key] = value;
    }
  }
  return target;
}

// Every documented option. Typed against GlobalOptions, so a key added to the
// public types has to be added here too.
type DocumentedKey = keyof {
  [K in keyof GlobalOptions as string extends K ? never : K]: true;
};
const DOCUMENTED: Record<DocumentedKey, true> = {
  addVertexOn: true,
  addVertexOnClick: true,
  addVertexValidation: true,
  allowAutoTracing: true,
  allowCutting: true,
  allowDifference: true,
  allowEditing: true,
  allowPinning: true,
  allowRemoval: true,
  allowRotation: true,
  allowScale: true,
  allowSelfIntersection: true,
  allowSelfIntersectionEdit: true,
  allowUnion: true,
  autoTraceMaxDistance: true,
  autoTraceMaxZoom: true,
  autoTracing: true,
  centerScaling: true,
  closedPolygonEdge: true,
  closedPolygonFill: true,
  continueDrawing: true,
  cursorMarker: true,
  customShapeGeoJSONOptions: true,
  cutAsCircle: true,
  draggable: true,
  editable: true,
  exitModeOnEscape: true,
  finishOn: true,
  finishOnEnter: true,
  freehandOptions: true,
  hideMiddleMarkers: true,
  hintlineStyle: true,
  lassoDrawOptions: true,
  lassoSelectable: true,
  layerGroup: true,
  layersToCut: true,
  limitMarkersToClick: true,
  limitMarkersToCount: true,
  limitMarkersToViewport: true,
  limitMarkersToZoom: true,
  markerEditable: true,
  markerStyle: true,
  maxRadiusCircle: true,
  maxRadiusCircleMarker: true,
  measurements: true,
  minRadiusCircle: true,
  minRadiusCircleMarker: true,
  moveVertexValidation: true,
  panes: true,
  pathOptions: true,
  pinning: true,
  preventIntersection: true,
  preventMarkerRemoval: true,
  rectangleAngle: true,
  removeLayerBelowMinVertexCount: true,
  removeVertexOn: true,
  removeVertexValidation: true,
  requireContainment: true,
  requireSnapToFinish: true,
  resizeableCircle: true,
  resizeableCircleMarker: true,
  scaleBorderStyle: true,
  selectionLayerStyle: true,
  showSnapGuides: true,
  snapDistance: true,
  snapGuidesAngles: true,
  snapGuidesStyle: true,
  snapMiddle: true,
  snapSegment: true,
  snapVertex: true,
  snappable: true,
  snappingOrder: true,
  syncLayersOnDrag: true,
  templineStyle: true,
  textOptions: true,
  tooltips: true,
  uniformScaling: true,
};

const known = new Set<string>(Object.keys(DOCUMENTED));
const warned = new Set<string>();

/** Adds option keys that don't warn. */
export function addKnownOptions(keys: Iterable<string>) {
  for (const key of keys) {
    known.add(key);
  }
}

// Returns the draw tool and editor classes, set by `PM.initialize()`. Read on
// each unknown key, so tools added later (Pro's, or subclasses) count too.
let optionClasses: () => unknown[] = () => [];
export function setOptionClasses(fn: () => unknown[]) {
  optionClasses = fn;
}

// Whether `key` is a default option of a draw tool or editor.
function isDefaultOption(key: string): boolean {
  return optionClasses().some((cls) => {
    const defaults = (cls as { prototype?: { options?: object } } | undefined)
      ?.prototype?.options;
    return !!defaults && key in defaults;
  });
}

// Warnings are for development builds only. App bundlers replace
// process.env.NODE_ENV in the ES module; the script build's .min.js is built
// as production and its .js as development. Without a bundler `process` is
// undefined, which counts as development.
declare const process: { env: { NODE_ENV?: string } };

function isDevelopment(): boolean {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return true;
  }
}

/**
 * Checks options passed to a public function. Returns the options to use: a
 * value that isn't an options object counts as no options. An unknown key is
 * still stored, so app-specific keys and keys from another Geoman edition keep
 * working. In development builds both warn, an unknown key once per page.
 */
export function checkOptions<T extends object>(
  options: T | null | undefined,
  where: string
): T | undefined {
  if (options === null || options === undefined) {
    return undefined;
  }
  if (typeof options !== 'object' || Array.isArray(options)) {
    if (!isDevelopment()) {
      return undefined;
    }
    console.warn(
      `Leaflet-Geoman: ${where} expects an options object, got ${Array.isArray(options) ? 'an array' : typeof options}. It was ignored.`
    );
    return undefined;
  }
  if (!isDevelopment()) {
    return options;
  }
  for (const key of Object.keys(options)) {
    if (!known.has(key) && !warned.has(key) && !isDefaultOption(key)) {
      warned.add(key);
      console.warn(
        `Leaflet-Geoman: unknown option "${key}" passed to ${where}. It is stored but Leaflet-Geoman doesn't use it.`
      );
    }
  }
  return options;
}
