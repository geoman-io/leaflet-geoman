const dialogMixins = {
  dialogInit(options) {
    return L.control.dialog({
      size: [200, 268],
      anchor: [0, -210],
      position: 'topright',
      ...options,
    });
  },
  getDefaultArrowDialogBody(arrowheadOptions) {
    const arrowSize = arrowheadOptions.size?.split('px')?.[0] || 25;
    const checked = arrowheadOptions.fill ? 'checked' : '';
    return `
      <div style='padding: 0.5rem 1rem;'>
        <h3 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h3>
        <hr>
        <div class='form-switch form-check cursor-pointer'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='arrow-filled' ${checked}>
          <label class='form-check-label cursor-pointer' for='arrow-filled'>Line / Filled</label>
        </div>
        <div style='margin-bottom: 0.5rem;'>
          <label for='arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='arrow-frequency' min='50' max='200' value='${this._getArrowFrequency(arrowheadOptions)}' style='direction: rtl;'>
        </div>
        <div style='margin-bottom: 0.5rem;'>
          <label for='arrow-angle' class='form-label'>Arrow Angle</label>
          <input type='range' class='form-range' id='arrow-angle' min='10' max='100' value='${arrowheadOptions.yawn}'>
        </div>
        <div style='margin-bottom: 0.5rem;'>
          <label for='arrow-size' class='form-label'>Arrow Size</label>
          <input type='range' class='form-range' id='arrow-size' min='10' max='50' value='${arrowSize}'>
        </div>
      </div>`;
  },
  _getArrowFrequency(arrowheadOptions) {
    let arrowFrequency;
    if (arrowheadOptions.frequency === 'endonly') {
      arrowFrequency = '200';
    } else if (
      arrowheadOptions.frequency >= '120' &&
      arrowheadOptions.frequency <= '130'
    ) {
      arrowFrequency = 'allvertices';
    } else {
      arrowFrequency = `${arrowheadOptions.frequency}px`;
    }

    return arrowFrequency;
  },
  initArrowFilledChangedListener(listener, context) {
    this._dialogElements.arrowFilled = L.DomUtil.get('arrow-filled');
    L.DomEvent.on(
      this._dialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  initArrowFrequencyChangedListener(listener, context) {
    this._dialogElements.arrowFrequency = L.DomUtil.get('arrow-frequency');
    L.DomEvent.on(
      this._dialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  initArrowAngleChangedListener(listener, context) {
    this._dialogElements.arrowAngle = L.DomUtil.get('arrow-angle');
    L.DomEvent.on(this._dialogElements.arrowAngle, 'change', listener, context);
  },
  initArrowSizeChangedListener(listener, context) {
    this._dialogElements.arrowSize = L.DomUtil.get('arrow-size');
    L.DomEvent.on(this._dialogElements.arrowSize, 'change', listener, context);
  },
  disableArrowFilledChangedListener(listener, context) {
    L.DomEvent.off(
      this._dialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  disableArrowFrequencyChangedListener(listener, context) {
    L.DomEvent.off(
      this._dialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  disableArrowAngleChangedListener(listener, context) {
    L.DomEvent.off(
      this._dialogElements.arrowAngle,
      'change',
      listener,
      context
    );
  },
  disableArrowSizeChangedListener(listener, context) {
    L.DomEvent.off(this._dialogElements.arrowSize, 'change', listener, context);
  },
  disableAllDialogEvents() {
    L.DomEvent.off(this._dialogElements.arrowFilled, 'change');
    L.DomEvent.off(this._dialogElements.arrowFrequency, 'change');
    L.DomEvent.off(this._dialogElements.arrowAngle, 'change');
    L.DomEvent.off(this._dialogElements.arrowSize, 'change');
  },
  _dialogElements: {
    arrowFilled: undefined,
    arrowFrequency: undefined,
    arrowAngle: undefined,
    arrowSize: undefined,
  },
};

export default dialogMixins;