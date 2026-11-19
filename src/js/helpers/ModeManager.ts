/**
 * A map mode, such as global edit mode or drawing one shape. Only one mode is
 * active on a map at a time, unless `combineModes` lets two of them share it.
 */
export interface ModeDefinition {
  enabled(): boolean;
  disable(): void;
  /**
   * Called when another mode turns on while this one is on. Defaults to
   * `disable()`. A mode may stay on by doing nothing.
   */
  yieldTo?(): void;
  /**
   * What the mode responds to on a layer, such as `vertex`, `body` or
   * `rotate-handle`. With the `combineModes` global option, two modes whose
   * targets don't overlap stay on together. A mode without targets is
   * always exclusive.
   */
  targets?: string[];
  /** The mode's toolbar button, so the toolbar keeps combined modes on too. */
  button?: string;
}

/**
 * Keeps the map's modes exclusive without depending on the toolbar. A mode
 * calls `_exclusive(name)` when it turns on, which turns off every other
 * active mode first. Escape exits whatever `active()` returns.
 */
export default class ModeManager {
  private modes = new Map<string, ModeDefinition>();

  private canCombine: () => boolean;

  constructor(canCombine: () => boolean = () => false) {
    this.canCombine = canCombine;
  }

  // Modes in the middle of turning on. A listener can turn on another mode
  // while one is turning on; that must not turn the first one off again.
  private activating = new Set<string>();

  register(name: string, mode: ModeDefinition) {
    if (this.modes.has(name)) {
      throw new TypeError(`Mode "${name}" is already registered`);
    }
    this.modes.set(name, mode);
  }

  unregister(name: string) {
    this.modes.delete(name);
  }

  /** Names of the modes that are on, in registration order. */
  active(): string[] {
    return [...this.modes]
      .filter(([, mode]) => mode.enabled())
      .map(([name]) => name);
  }

  /** Whether modes `a` and `b` may be on together. */
  combines(a: string, b: string): boolean {
    const targetsA = this.modes.get(a)?.targets;
    const targetsB = this.modes.get(b)?.targets;
    return (
      this.canCombine() &&
      !!targetsA?.length &&
      !!targetsB?.length &&
      !targetsA.some((target) => targetsB.includes(target))
    );
  }

  /** Like `combines`, for the modes behind two toolbar buttons. */
  buttonsCombine(a: string, b: string): boolean {
    const byButton = (button: string) =>
      [...this.modes].find(([, mode]) => mode.button === button)?.[0];
    const modeA = byButton(a);
    const modeB = byButton(b);
    return !!modeA && !!modeB && this.combines(modeA, modeB);
  }

  /**
   * Turns off every active mode except `name` and, with `combineModes`, the
   * modes it combines with.
   */
  _exclusive(name: string) {
    this.activating.add(name);
    try {
      for (const [other, mode] of [...this.modes]) {
        if (
          other !== name &&
          !this.activating.has(other) &&
          mode.enabled() &&
          !this.combines(name, other)
        ) {
          if (mode.yieldTo) {
            mode.yieldTo();
          } else {
            mode.disable();
          }
        }
      }
    } finally {
      this.activating.delete(name);
    }
  }

  /**
   * Turns off every active mode. Each mode is checked again right before it
   * is turned off, in registration order, so a disable that already turned
   * another mode off does not run twice. Returns whether any mode was on.
   */
  disableAll(): boolean {
    let any = false;
    for (const [, mode] of [...this.modes]) {
      if (mode.enabled()) {
        any = true;
        mode.disable();
      }
    }
    return any;
  }
}
