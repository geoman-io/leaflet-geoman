import * as L from 'leaflet';
import { PM } from '../PM';
/**
 * Extended map with PM and dragging
 */
type ExtendedMap = L.Map & {
  dragging: {
    _enabled: boolean;
    disable: () => void;
    enable: () => void;
  };
  pm: {
    globalOptions: {
      panes?: {
        layerPane?: string;
        vertexPane?: string;
        markerPane?: string;
      };
    };
    getGeomanLayers: () => L.Layer[];
  };
};

/**
 * Extended marker layer for text
 */
type ExtendedTextMarker = L.Marker & {
  _map: L.Map;
  options: L.MarkerOptions & {
    text?: string;
  };
  getElement: () => HTMLElement;
};

/**
 * Text edit options
 */
interface TextEditOptions {
  allowEditing?: boolean;
  snappable?: boolean;
  snapDistance?: number;
  snapSegment?: boolean;
  removeIfEmpty?: boolean;
  className?: string;
  [key: string]: unknown;
}

import Edit from './L.PM.Edit';
import { defineOptions } from '../helpers/classes';

const cssClassNames = (className: unknown): string[] => {
  const values = Array.isArray(className) ? className : [className];
  return values
    .filter((name): name is string => typeof name === 'string')
    .flatMap((name) => name.split(' '))
    .filter(Boolean);
};

class EditText extends Edit {
  declare _layer: ExtendedTextMarker;
  declare _documentClickThis?: (e: MouseEvent) => void;
  declare _map: ExtendedMap;
  declare _enabled: boolean;
  declare _layerEdited?: boolean;
  declare _hasFocus?: boolean;
  declare _focusText?: string;
  declare _safeToCacheDragState?: boolean;
  declare _originalMapDragState?: boolean;
  declare _disableOnBlurActive?: boolean;
  declare textArea: HTMLTextAreaElement;
  declare options: TextEditOptions;

  constructor(layer: L.Marker) {
    super(layer);
    this._layer = layer as typeof this._layer;
    this._enabled = false;
  }
  enable(options?: Partial<TextEditOptions>) {
    if (options) {
      this.setOptions(options);
    }

    if (!this.textArea) {
      return;
    }

    // layer is not allowed to edit
    if (!this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }

    this._map = this._layer._map as typeof this._map;

    if (this.enabled()) {
      this.disable();
    }
    this.applyOptions();

    this._safeToCacheDragState = true;

    this._focusChange();
    this.textArea.readOnly = false;
    this.textArea.classList.remove('pm-disabled');

    // if shape gets removed from map, disable edit mode
    this._layer.on('remove', this.disable, this);
    L.DomEvent.on(this.textArea, 'input', this._autoResize, this);
    L.DomEvent.on(this.textArea, 'focus', this._focusChange, this);
    L.DomEvent.on(this.textArea, 'blur', this._focusChange, this);
    this._layer.on('dblclick', L.DomEvent.stop);

    L.DomEvent.off(this.textArea, 'pointerdown', this._preventTextSelection);

    this._enabled = true;

    this._fireEnable();
  }
  disable() {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return;
    }

    // remove listener
    this._layer.off('remove', this.disable, this);
    L.DomEvent.off(this.textArea, 'input', this._autoResize, this);
    L.DomEvent.off(this.textArea, 'focus', this._focusChange, this);
    L.DomEvent.off(this.textArea, 'blur', this._focusChange, this);
    document.removeEventListener('click', this._documentClickThis!, {
      capture: true,
    });

    this._focusChange();
    this.textArea.readOnly = true;
    this.textArea.classList.add('pm-disabled');

    // remove selection
    const focusedElement = document.activeElement;
    // Chrome needs the focus on the element to change the selection
    this.textArea.focus();
    this.textArea.selectionStart = 0;
    this.textArea.selectionEnd = 0;
    L.DomEvent.on(this.textArea, 'pointerdown', this._preventTextSelection);
    (focusedElement as HTMLElement).focus();

    this._disableOnBlurActive = false;

    if (this._layerEdited) {
      this._fireUpdate();
    }
    this._layerEdited = false;
    this._fireDisable();

    this._enabled = false;
  }
  enabled() {
    return this._enabled;
  }
  toggleEdit(options?: Partial<TextEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  }
  applyOptions() {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
  }
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers() {
    const marker = this._layer;

    this.options.snapDistance = this.options.snapDistance || 30;
    this.options.snapSegment =
      this.options.snapSegment === undefined ? true : this.options.snapSegment;

    marker.off('pm:drag', this._handleSnapping, this);
    marker.on('pm:drag', this._handleSnapping, this);

    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.on('pm:dragend', this._cleanupSnapping, this);

    marker.off('pm:dragstart', this._unsnap, this);
    marker.on('pm:dragstart', this._unsnap, this);
  }
  _disableSnapping() {
    const marker = this._layer;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  }
  _autoResize() {
    this.textArea.style.height = '1px';
    this.textArea.style.width = '1px';
    const height =
      this.textArea.scrollHeight > 21 ? this.textArea.scrollHeight : 21;
    const width =
      this.textArea.scrollWidth > 16 ? this.textArea.scrollWidth : 16;
    this.textArea.style.height = `${height}px`;
    this.textArea.style.width = `${width}px`;
    this._layer.options.text = this.getText();
    this._fireTextChange(this.getText());
  }

  _disableOnBlur() {
    this._disableOnBlurActive = true;
    // we need this timeout because else the place click event is triggered here too.
    setTimeout(() => {
      if (this.enabled()) {
        this._documentClickThis =
          this._documentClickThis || this._documentClick.bind(this);
        document.addEventListener('click', this._documentClickThis!, {
          capture: true,
        });
      }
    }, 100);
  }
  _documentClick(e: MouseEvent) {
    if (e.target !== this.textArea) {
      this.disable();
      if (!this.getText() && this.options.removeIfEmpty) {
        this.remove();
      }
    }
  }

  _focusChange(e: FocusEvent | Record<string, unknown> = {}) {
    const focusAlreadySet = this._hasFocus;
    this._hasFocus = e.type === 'focus';
    if (!focusAlreadySet !== !this._hasFocus) {
      if (this._hasFocus) {
        this._applyFocus();
        this._focusText = this.getText();
        this._fireTextFocus();
      } else {
        this._removeFocus();
        this._fireTextBlur();
        if (this._focusText !== this.getText()) {
          this._fireEdit();
          this._layerEdited = true;
        }
      }
    }
  }
  _applyFocus() {
    this.textArea.classList.add('pm-hasfocus');

    if (this._map.dragging) {
      // save current map dragging state
      if (this._safeToCacheDragState) {
        this._originalMapDragState = this._map.dragging._enabled;
        // don't cache the state again until another mouse up is registered
        this._safeToCacheDragState = false;
      }
      this._map.dragging.disable();
    }
  }
  _removeFocus() {
    if (this._map.dragging) {
      if (this._originalMapDragState) {
        this._map.dragging.enable();
      }
      this._safeToCacheDragState = true;
    }

    this.textArea.classList.remove('pm-hasfocus');
  }

  focus() {
    if (!this.enabled()) {
      throw new TypeError('Layer is not enabled');
    }
    this.textArea.focus();
  }

  blur() {
    if (!this.enabled()) {
      throw new TypeError('Layer is not enabled');
    }
    this.textArea.blur();
    if (this._disableOnBlurActive) {
      this.disable();
    }
  }

  hasFocus() {
    return this._hasFocus;
  }

  getElement() {
    return this.textArea;
  }

  setText(text: string) {
    if (text !== undefined) {
      this.textArea.value = text;
    }
    this._autoResize();
  }

  getText() {
    return this.textArea.value;
  }

  _initTextMarker() {
    this.textArea = PM.Draw.Text.prototype._createTextArea.call(this);
    const cssClasses = cssClassNames(this.options.className);
    if (cssClasses.length) {
      this.textArea.classList.add(...cssClasses);
    }
    const textAreaIcon = PM.Draw.Text.prototype._createTextIcon.call(
      this,
      this.textArea
    );
    this._layer.setIcon(textAreaIcon);

    this._layer.once('add', this._createTextMarker, this);
  }

  _createTextMarker(enable: boolean | L.LeafletEvent = false) {
    this._layer.off('add', this._createTextMarker, this);

    this._layer.getElement()!.tabIndex = -1;

    this.textArea.wrap = 'off';
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height =
      this.textArea.style.fontSize || getComputedStyle(this.textArea).fontSize;
    this.textArea.style.width = '1px';

    if (this._layer.options.text) {
      this.setText(this._layer.options.text);
    }

    this._autoResize();

    if (enable === true) {
      // enable editing for the marker
      this.enable();
      this.focus();
      this._disableOnBlur();
    }
  }

  // Chrome ignores `user-select: none`, so we need to disable text selection manually
  _preventTextSelection(e: Event) {
    e.preventDefault();
  }
}

defineOptions(EditText, {});
EditText.prototype._shape = 'Text';
Edit.Text = EditText;

export { EditText };
export default EditText;
