const DrawArrowLineDialogMixins = {
  drawArrowLineDialogInit(options = {}) {
    const dialogOptions = {
      size: [200, 288],
      anchor: [0, -210],
      position: 'topright',
      showArrowToggle: true,
      ...options,
    };
    return L.control.dialog(dialogOptions);
  },
  closeDrawArrowLineDialog() {
    this.drawArrowLineDialog?.close();
  },
  getDrawArrowLineDialogBody(arrowheadOptions) {
    const arrowSize = arrowheadOptions.size?.split('px')?.[0] || 25;
    const arrowFilled = arrowheadOptions.fill ? 'checked' : '';
    return `
      <div style='padding: 0.5rem 1rem;'>
        <h5 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h5>
        <hr>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='draw-arrow-filled' ${arrowFilled}>
          <label class='form-check-label cursor-pointer' for='draw-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='draw-arrow-frequency' min='50' max='200' value='${this._setDrawArrowLineSelectorValue(arrowheadOptions.frequency)}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-angle' class='form-label'>Arrow Angle</label>
          <input type='range' class='form-range' id='draw-arrow-angle' min='10' max='100' value='${arrowheadOptions.yawn}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-size' class='form-label'>Arrow Size</label>
          <input type='range' class='form-range' id='draw-arrow-size' min='10' max='50' value='${arrowSize}'>
        </div>
      </div>`;
  },
  _getDrawArrowLineFrequency(frequency) {
    const upperRange = 200;
    const lowerRange = 50;

    let arrowFrequency;
    if (frequency === upperRange) {
      arrowFrequency = 'endonly';
    } else if (frequency >= 120 && frequency <= 130) {
      arrowFrequency = 'allvertices';
    } else {
      arrowFrequency = `${lowerRange + upperRange - frequency}px`;
    }

    return arrowFrequency;
  },
  _setDrawArrowLineSelectorValue(frequency = '') {
    const upperRange = 200;
    const lowerRange = 50;

    const arrowFrequency = frequency.replace('px', '') || 'endonly';
    const isNumeric = !Number.isNaN(+arrowFrequency);
    if (arrowFrequency === 'endonly') {
      return lowerRange;
    }

    if (
      arrowFrequency === 'allvertices' ||
      (frequency >= 120 && frequency <= 130)
    ) {
      return 125;
    }

    if (isNumeric) {
      return upperRange + lowerRange - arrowFrequency;
    }

    return arrowFrequency;
  },
  initDrawArrowLineFilledChangedListener(listener, context) {
    this._drawArrowLineDialogElements.arrowFilled =
      L.DomUtil.get('draw-arrow-filled');
    L.DomEvent.on(
      this._drawArrowLineDialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  initDrawArrowLineFrequencyChangedListener(listener, context) {
    this._drawArrowLineDialogElements.arrowFrequency = L.DomUtil.get(
      'draw-arrow-frequency'
    );
    L.DomEvent.on(
      this._drawArrowLineDialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  initDrawArrowLineAngleChangedListener(listener, context) {
    this._drawArrowLineDialogElements.arrowAngle =
      L.DomUtil.get('draw-arrow-angle');
    L.DomEvent.on(
      this._drawArrowLineDialogElements.arrowAngle,
      'change',
      listener,
      context
    );
  },
  initDrawArrowLineSizeChangedListener(listener, context) {
    this._drawArrowLineDialogElements.arrowSize =
      L.DomUtil.get('draw-arrow-size');
    L.DomEvent.on(
      this._drawArrowLineDialogElements.arrowSize,
      'change',
      listener,
      context
    );
  },
  disableDrawArrowLineEnabledChangedListener(listener, context) {
    L.DomEvent.off(
      this._drawArrowLineDialogElements.arrowEnabled,
      'change',
      listener,
      context
    );
  },
  disableDrawArrowLineFilledChangedListener(listener, context) {
    L.DomEvent.off(
      this._drawArrowLineDialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  disableDrawArrowLineFrequencyChangedListener(listener, context) {
    L.DomEvent.off(
      this._drawArrowLineDialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  disableDrawArrowLineAngleChangedListener(listener, context) {
    L.DomEvent.off(
      this._drawArrowLineDialogElements.arrowAngle,
      'change',
      listener,
      context
    );
  },
  disableDrawArrowLineSizeChangedListener(listener, context) {
    L.DomEvent.off(
      this._drawArrowLineDialogElements.arrowSize,
      'change',
      listener,
      context
    );
  },
  disableAllDrawArrowLineDialogEvents() {
    Object.values(this._drawArrowLineDialogElements).forEach((el) => {
      if (el) {
        L.DomEvent.off(el, 'change');
      }
    });
  },
  _drawArrowLineDialogElements: {
    arrowEnabled: undefined,
    arrowFilled: undefined,
    arrowFrequency: undefined,
    arrowAngle: undefined,
    arrowSize: undefined,
  },
};

export default DrawArrowLineDialogMixins;
