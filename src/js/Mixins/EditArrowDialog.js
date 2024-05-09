const EditArrowLineDialogMixins = {
  editArrowLineDialogInit(options = {}) {
    const dialogOptions = {
      size: [200, 268],
      anchor: [0, -210],
      position: 'topright',
      showArrowToggle: true,
      ...options,
    };
    return L.control.dialog(dialogOptions);
  },
  closeEditArrowLineDialog() {
    this.editArrowLineDialog?.close();
  },
  getEditArrowLineDialogBody(arrowheadOptions) {
    const arrowSize = arrowheadOptions.size?.split('px')?.[0] || 25;
    const arrowFilled = arrowheadOptions.fill ? 'checked' : '';
    const showArrowToggle = arrowheadOptions.showArrowToggle ? '' : 'd-none';
    return `
      <div style='padding: 0 1rem;'>
        <h3 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h3>
        <hr>
        <div class='form-switch form-check cursor-pointer ${showArrowToggle}'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-enabled' checked>
          <label class='form-check-label cursor-pointer' for='edit-arrow-enabled'>Enable Arrows</label>
        </div>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-filled' ${arrowFilled}>
          <label class='form-check-label cursor-pointer' for='edit-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='edit-arrow-frequency' min='50' max='200' value='${this._setEditArrowLineSelectorValue(arrowheadOptions.frequency)}' style='direction: rtl;'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-angle' class='form-label'>Arrow Angle</label>
          <input type='range' class='form-range' id='edit-arrow-angle' min='10' max='100' value='${arrowheadOptions.yawn}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-size' class='form-label'>Arrow Size</label>
          <input type='range' class='form-range' id='edit-arrow-size' min='10' max='50' value='${arrowSize}'>
        </div>
      </div>`;
  },
  _getEditArrowLineFrequency(frequency) {
    let arrowFrequency;
    if (frequency === 200) {
      arrowFrequency = 'endonly';
    } else if (frequency >= 120 && frequency <= 130) {
      arrowFrequency = 'allvertices';
    } else {
      arrowFrequency = `${frequency}px`;
    }

    return arrowFrequency;
  },
  _setEditArrowLineSelectorValue(frequency = '') {
    const arrowFrequency = frequency.replace('px', '') || 'endonly';
    const isNumeric = Number.isNaN(+arrowFrequency);
    if (arrowFrequency === 'endonly') {
      return 200;
    }

    if (arrowFrequency === 'allvertices') {
      return 125;
    }

    if (isNumeric) {
      if (arrowFrequency >= 120 && arrowFrequency <= 130) {
        return 125;
      }
      return +arrowFrequency;
    }

    return arrowFrequency;
  },
  toggleEditArrowLinePropVisibility(visible) {
    Array.from(document.getElementsByClassName('arrow-visible-prop')).forEach(
      (el) => {
        el.style.display = visible ? 'revert' : 'none';
      }
    );
  },
  initEditArrowLineEnabledChangedListener(listener, context) {
    this._editArrowLineDialogElements.arrowEnabled =
      L.DomUtil.get('edit-arrow-enabled');
    L.DomEvent.on(
      this._editArrowLineDialogElements.arrowEnabled,
      'change',
      listener,
      context
    );
  },
  initEditArrowLineFilledChangedListener(listener, context) {
    this._editArrowLineDialogElements.arrowFilled =
      L.DomUtil.get('edit-arrow-filled');
    L.DomEvent.on(
      this._editArrowLineDialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  initEditArrowLineFrequencyChangedListener(listener, context) {
    this._editArrowLineDialogElements.arrowFrequency = L.DomUtil.get(
      'edit-arrow-frequency'
    );
    L.DomEvent.on(
      this._editArrowLineDialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  initEditArrowLineAngleChangedListener(listener, context) {
    this._editArrowLineDialogElements.arrowAngle =
      L.DomUtil.get('edit-arrow-angle');
    L.DomEvent.on(
      this._editArrowLineDialogElements.arrowAngle,
      'change',
      listener,
      context
    );
  },
  initEditArrowLineSizeChangedListener(listener, context) {
    this._editArrowLineDialogElements.arrowSize =
      L.DomUtil.get('edit-arrow-size');
    L.DomEvent.on(
      this._editArrowLineDialogElements.arrowSize,
      'change',
      listener,
      context
    );
  },
  disableEditArrowLineEnabledChangedListener(listener, context) {
    L.DomEvent.off(
      this._editArrowLineDialogElements.arrowEnabled,
      'change',
      listener,
      context
    );
  },
  disableEditArrowLineFilledChangedListener(listener, context) {
    L.DomEvent.off(
      this._editArrowLineDialogElements.arrowFilled,
      'change',
      listener,
      context
    );
  },
  disableEditArrowLineFrequencyChangedListener(listener, context) {
    L.DomEvent.off(
      this._editArrowLineDialogElements.arrowFrequency,
      'change',
      listener,
      context
    );
  },
  disableEditArrowLineAngleChangedListener(listener, context) {
    L.DomEvent.off(
      this._editArrowLineDialogElements.arrowAngle,
      'change',
      listener,
      context
    );
  },
  disableEditArrowLineSizeChangedListener(listener, context) {
    L.DomEvent.off(
      this._editArrowLineDialogElements.arrowSize,
      'change',
      listener,
      context
    );
  },
  disableAllEditArrowLineDialogEvents() {
    Object.values(this._editArrowLineDialogElements).forEach((el) => {
      if (el) {
        L.DomEvent.off(el, 'change');
      }
    });
  },
  _editArrowLineDialogElements: {
    arrowEnabled: undefined,
    arrowFilled: undefined,
    arrowFrequency: undefined,
    arrowAngle: undefined,
    arrowSize: undefined,
  },
};

export default EditArrowLineDialogMixins;
