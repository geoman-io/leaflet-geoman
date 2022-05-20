const KeyboardMixins = {
  _lastEvents: { keydown: undefined, keyup: undefined, current: undefined },
  _initKeyListener(map) {
    this.map = map;
    L.DomEvent.on(document, 'keydown keyup', this._onKeyListener, this);
    L.DomEvent.on(window, 'blur', this._onBlur, this);
  },
  _onKeyListener(e) {
    let focusOn = 'document';

    // .contains only supported since IE9, if you want to use Geoman with IE8 or lower you need to implement a polyfill for .contains
    // with focusOn the user can add a check if the key was pressed while the user interacts with the map
    if (this.map.getContainer().contains(e.target)) {
      focusOn = 'map';
    }

    const data = { event: e, eventType: e.type, focusOn };
    this._lastEvents[e.type] = data;
    this._lastEvents.current = data;

    this.map.pm._fireKeyeventEvent(e, e.type, focusOn);
  },
  _onBlur(e) {
    e.altKey = false;
    const data = { event: e, eventType: e.type, focusOn: 'document' };
    this._lastEvents[e.type] = data;
    this._lastEvents.current = data;
  },
  getLastKeyEvent(type = 'current') {
    return this._lastEvents[type];
  },
  isShiftKeyPressed() {
    return this._lastEvents.current?.event.shiftKey;
  },
  isAltKeyPressed() {
    return this._lastEvents.current?.event.altKey;
  },
  isCtrlKeyPressed() {
    return this._lastEvents.current?.event.ctrlKey;
  },
  isMetaKeyPressed() {
    return this._lastEvents.current?.event.metaKey;
  },
  getPressedKey() {
    return this._lastEvents.current?.event.key;
  },
};

export default KeyboardMixins;
