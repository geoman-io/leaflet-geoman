import type * as L from 'leaflet';

/** The pointer position a drag step uses, in the shape layer drag expects. */
export interface DragSessionEvent {
  originalEvent: PointerEvent;
  latlng?: L.LatLng;
}

/** A layer editor that moves with a drag. */
export interface DragParticipant<E extends DragSessionEvent> {
  _dragSessionMove(e: E): void;
  /** Returns whether the layer was actually dragged. */
  _dragSessionEnd(e: E): boolean;
  _activeDragSession?: DragSession<E>;
}

/**
 * One drag gesture: the pressed layer and the layers synced with it, moved
 * together by one pointer. The session owns everything the layers share:
 *
 * - which pointer drives the drag, so a second finger is ignored,
 * - the move and release listeners, bound once for all layers, including a
 *   release outside the map or the window losing focus,
 * - the map's own panning, turned off on the first move and restored once.
 *
 * Each step runs every layer once, in the order given: the pressed layer
 * first, then the synced ones.
 */
// Map panning shared by the drags running on one map: the state when the first
// drag started, and how many drags are running. Panning comes back only when
// the last one ends.
const mapPanning = new WeakMap<
  L.Map,
  { wasDraggable: boolean; sessions: number }
>();

export default class DragSession<E extends DragSessionEvent> {
  private ended = false;
  private mapPanningOff = false;
  private lastEvent?: E;

  private readonly map: L.Map;
  readonly participants: DragParticipant<E>[];
  // The pointer that started the drag; undefined follows any pointer.
  private readonly pointerId: number | undefined;
  // Turns a DOM pointer event into the event the layers expect.
  private readonly toEvent: (e: PointerEvent) => E;

  /** Starts following the pointer for these layers. */
  static start<E extends DragSessionEvent>(
    map: L.Map,
    participants: DragParticipant<E>[],
    pointerId: number | undefined,
    toEvent: (e: PointerEvent) => E
  ) {
    return new DragSession<E>(map, participants, pointerId, toEvent);
  }

  private constructor(
    map: L.Map,
    participants: DragParticipant<E>[],
    pointerId: number | undefined,
    toEvent: (e: PointerEvent) => E
  ) {
    this.map = map;
    this.participants = participants;
    this.pointerId = pointerId;
    this.toEvent = toEvent;
    const shared = mapPanning.get(map);
    if (shared && shared.sessions > 0) {
      shared.sessions++;
    } else {
      mapPanning.set(map, {
        wasDraggable: map.dragging.enabled(),
        sessions: 1,
      });
    }
    participants.forEach((p) => {
      p._activeDragSession = this;
    });
    const container = map.getContainer();
    container.addEventListener('pointermove', this.onPointerMove);
    container.addEventListener('pointerup', this.onRelease);
    container.addEventListener('pointercancel', this.onRelease);
    if (typeof document !== 'undefined') {
      // A release outside the map does not reach the container.
      document.addEventListener('pointerup', this.onRelease, true);
      window.addEventListener('blur', this.onRelease);
    }
  }

  move(e: E) {
    if (this.ended) {
      return;
    }
    if (!this.mapPanningOff) {
      this.mapPanningOff = true;
      if (mapPanning.get(this.map)?.wasDraggable) {
        this.map.dragging.disable();
      }
    }
    this.lastEvent = e;
    this.participants.forEach((p) => p._dragSessionMove(e));
  }

  /** Ends the drag. Returns whether the pressed layer was dragged. */
  end(e: E): boolean {
    if (this.ended) {
      return false;
    }
    this.ended = true;
    this.unbind();
    this.leaveMap();
    this.participants.forEach((p) => {
      if (p._activeDragSession === this) {
        p._activeDragSession = undefined;
      }
    });
    const dragged = this.participants.map((p) => p._dragSessionEnd(e));
    return dragged[0];
  }

  /**
   * Stops following the pointer, for a new press that restarts the drag
   * before a release. Layers in `keep` move on with the new press; the drag
   * ends for the others.
   */
  abandon(keep: DragParticipant<E>[]) {
    if (this.ended) {
      return;
    }
    this.ended = true;
    this.unbind();
    this.leaveMap();
    this.participants.forEach((p) => {
      if (p._activeDragSession === this) {
        p._activeDragSession = undefined;
      }
    });
    const last = this.lastEvent;
    if (last) {
      this.participants
        .filter((p) => !keep.includes(p))
        .forEach((p) => p._dragSessionEnd(last));
    }
  }

  /**
   * Turns the map's panning back on if it was on when the first running drag
   * started, such as when drag mode is turned off mid-drag.
   */
  restoreMapPanning() {
    if (mapPanning.get(this.map)?.wasDraggable) {
      this.map.dragging.enable();
    }
  }

  // Counts this drag out; the last drag on the map restores panning.
  private leaveMap() {
    const shared = mapPanning.get(this.map);
    if (!shared) {
      return;
    }
    shared.sessions--;
    if (shared.sessions <= 0) {
      mapPanning.delete(this.map);
      if (shared.wasDraggable) {
        this.map.dragging.enable();
      }
    }
  }

  private isDragPointer(e: PointerEvent) {
    return this.pointerId === undefined || e.pointerId === this.pointerId;
  }

  private onPointerMove = (e: PointerEvent) => {
    if (this.isDragPointer(e)) {
      this.move(this.toEvent(e));
    }
  };

  private onRelease = (e: Event) => {
    if (e.type === 'blur') {
      // No pointer position: end where the layers are.
      const last = this.lastEvent;
      this.end({
        ...(last as E),
        originalEvent: e as unknown as PointerEvent,
      });
      return;
    }
    if (this.isDragPointer(e as PointerEvent)) {
      this.end(this.toEvent(e as PointerEvent));
    }
  };

  private unbind() {
    const container = this.map.getContainer();
    container.removeEventListener('pointermove', this.onPointerMove);
    container.removeEventListener('pointerup', this.onRelease);
    container.removeEventListener('pointercancel', this.onRelease);
    if (typeof document !== 'undefined') {
      document.removeEventListener('pointerup', this.onRelease, true);
      window.removeEventListener('blur', this.onRelease);
    }
  }
}
