/**
 * A map mode, such as global edit mode or drawing one shape. Only one mode is
 * active on a map at a time.
 */
export interface ModeDefinition {
  enabled(): boolean;
  disable(): void;
  /**
   * Called when another mode turns on while this one is on. Defaults to
   * `disable()`. A mode may stay on by doing nothing.
   */
  yieldTo?(): void;
}

/**
 * Keeps the map's modes exclusive without depending on the toolbar. A mode
 * calls `_exclusive(name)` when it turns on, which turns off every other
 * active mode first. Escape exits whatever `active()` returns.
 */
export default class ModeManager {
  private modes = new Map<string, ModeDefinition>();

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

  /** Turns off every active mode except `name`. */
  _exclusive(name: string) {
    this.activating.add(name);
    try {
      for (const [other, mode] of [...this.modes]) {
        if (other !== name && !this.activating.has(other) && mode.enabled()) {
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
