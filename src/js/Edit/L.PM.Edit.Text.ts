import Edit from './L.PM.Edit';

// Declare the global L
declare const L: typeof import('leaflet') & {
  Util: {
    setOptions: <T extends { options: object }>(
      obj: T,
      options: object
    ) => void;
  };
  DomUtil: {
    getStyle: (el: HTMLElement, prop: string) => string;
  };
  DomEvent: {
    on: (
      el: HTMLElement | Document,
      types: string,
      fn: (e: Event) => void,
      context?: unknown
    ) => void;
    off: (
      el: HTMLElement | Document,
      types: string,
      fn: (e: Event) => void,
      context?: unknown
    ) => void;
    stop: (e: L.LeafletEvent) => void;
  };
  PM: {
    Draw: {
      Text: {
        prototype: {
          _createTextArea: () => HTMLTextAreaElement;
          _createTextIcon: (textArea: HTMLTextAreaElement) => L.DivIcon;
        };
      };
    };
  };
};

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

/**
 * Edit Text interface
 */
interface IEditText {
  _shape: string;
  _layer: ExtendedTextMarker;
  _map: ExtendedMap;
  _enabled: boolean;
  _layerEdited?: boolean;
  _hasFocus?: boolean;
  _focusText?: string;
  _safeToCacheDragState?: boolean;
  _originalMapDragState?: boolean;
  _disableOnBlurActive?: boolean;
  _documentClickThis?: (e: MouseEvent) => void;
  textArea: HTMLTextAreaElement;
  options: TextEditOptions;

  enable(options?: Partial<TextEditOptions>): void;
  disable(): void;
  enabled(): boolean;
  toggleEdit(options?: Partial<TextEditOptions>): void;
  applyOptions(): void;
  _initSnappableMarkers(): void;
  _disableSnapping(): void;
  _autoResize(): void;
  _disableOnBlur(): void;
  _documentClick(e: MouseEvent): void;
  _focusChange(e?: FocusEvent | Record<string, unknown>): void;
  _applyFocus(): void;
  _removeFocus(): void;
  focus(): void;
  blur(): void;
  hasFocus(): boolean;
  getElement(): HTMLTextAreaElement;
  setText(text: string): void;
  getText(): string;
  _initTextMarker(): void;
  _createTextMarker(enable?: boolean): void;
  _preventTextSelection(e: Event): void;
  remove(): void;

  // From mixins
  _fireEnable(): void;
  _fireDisable(): void;
  _fireUpdate(): void;
  _fireEdit(): void;
  _fireTextChange(text: string): void;
  _fireTextFocus(): void;
  _fireTextBlur(): void;
  _handleSnapping(e: L.LeafletEvent): void;
  _cleanupSnapping(): void;
  _unsnap(e: L.LeafletEvent): void;
}

const EditText = (
  Edit as unknown as { extend: (props: object) => unknown }
).extend({
  _shape: 'Text',
  initialize(this: IEditText, layer: L.Marker) {
    this._layer = layer as ExtendedTextMarker;
    this._enabled = false;
  },
  enable(this: IEditText, options?: Partial<TextEditOptions>) {
    L.Util.setOptions(this, options);

    if (!this.textArea) {
      return;
    }

    // layer is not allowed to edit
    if (!this.options.allowEditing || !this._layer._map) {
      this.disable();
      return;
    }

    this._map = this._layer._map as unknown as ExtendedMap;

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
    L.DomEvent.on(
      this.textArea,
      'input',
      this._autoResize as (e: Event) => void,
      this
    );
    L.DomEvent.on(
      this.textArea,
      'focus',
      this._focusChange as (e: Event) => void,
      this
    );
    L.DomEvent.on(
      this.textArea,
      'blur',
      this._focusChange as (e: Event) => void,
      this
    );
    this._layer.on('dblclick', L.DomEvent.stop);

    L.DomEvent.off(this.textArea, 'mousedown', this._preventTextSelection);

    this._enabled = true;

    this._fireEnable();
  },
  disable(this: IEditText) {
    // if it's not enabled, it doesn't need to be disabled
    if (!this.enabled()) {
      return;
    }

    // remove listener
    this._layer.off('remove', this.disable, this);
    L.DomEvent.off(
      this.textArea,
      'input',
      this._autoResize as (e: Event) => void,
      this
    );
    L.DomEvent.off(
      this.textArea,
      'focus',
      this._focusChange as (e: Event) => void,
      this
    );
    L.DomEvent.off(
      this.textArea,
      'blur',
      this._focusChange as (e: Event) => void,
      this
    );
    if (this._documentClickThis) {
      document.removeEventListener('click', this._documentClickThis, {
        capture: true,
      });
    }

    this._focusChange();
    this.textArea.readOnly = true;
    this.textArea.classList.add('pm-disabled');

    // remove selection
    const focusedElement = document.activeElement as HTMLElement;
    // Chrome needs the focus on the element to change the selection
    this.textArea.focus();
    this.textArea.selectionStart = 0;
    this.textArea.selectionEnd = 0;
    L.DomEvent.on(this.textArea, 'mousedown', this._preventTextSelection);
    focusedElement?.focus();

    this._disableOnBlurActive = false;

    if (this._layerEdited) {
      this._fireUpdate();
    }
    this._layerEdited = false;
    this._fireDisable();

    this._enabled = false;
  },
  enabled(this: IEditText) {
    return this._enabled;
  },
  toggleEdit(this: IEditText, options?: Partial<TextEditOptions>) {
    if (!this.enabled()) {
      this.enable(options);
    } else {
      this.disable();
    }
  },
  applyOptions(this: IEditText) {
    if (this.options.snappable) {
      this._initSnappableMarkers();
    } else {
      this._disableSnapping();
    }
  },
  // overwrite initSnappableMarkers from Snapping.js Mixin
  _initSnappableMarkers(this: IEditText) {
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
  },
  _disableSnapping(this: IEditText) {
    const marker = this._layer;
    marker.off('pm:drag', this._handleSnapping, this);
    marker.off('pm:dragend', this._cleanupSnapping, this);
    marker.off('pm:dragstart', this._unsnap, this);
  },
  _autoResize(this: IEditText) {
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
  },

  _disableOnBlur(this: IEditText) {
    this._disableOnBlurActive = true;
    // we need this timeout because else the place click event is triggered here too.
    setTimeout(() => {
      if (this.enabled()) {
        this._documentClickThis =
          this._documentClickThis || this._documentClick.bind(this);
        document.addEventListener('click', this._documentClickThis, {
          capture: true,
        });
      }
    }, 100);
  },
  _documentClick(this: IEditText, e: MouseEvent) {
    if (e.target !== this.textArea) {
      this.disable();
      if (!this.getText() && this.options.removeIfEmpty) {
        this.remove();
      }
    }
  },

  _focusChange(this: IEditText, e: FocusEvent | Record<string, unknown> = {}) {
    const focusAlreadySet = this._hasFocus;
    this._hasFocus = (e as FocusEvent).type === 'focus';
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
  },
  _applyFocus(this: IEditText) {
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
  },
  _removeFocus(this: IEditText) {
    if (this._map.dragging) {
      if (this._originalMapDragState) {
        this._map.dragging.enable();
      }
      this._safeToCacheDragState = true;
    }

    this.textArea.classList.remove('pm-hasfocus');
  },

  focus(this: IEditText) {
    if (!this.enabled()) {
      throw new TypeError('Layer is not enabled');
    }
    this.textArea.focus();
  },

  blur(this: IEditText) {
    if (!this.enabled()) {
      throw new TypeError('Layer is not enabled');
    }
    this.textArea.blur();
    if (this._disableOnBlurActive) {
      this.disable();
    }
  },

  hasFocus(this: IEditText) {
    return this._hasFocus;
  },

  getElement(this: IEditText) {
    return this.textArea;
  },

  setText(this: IEditText, text: string) {
    if (text) {
      this.textArea.value = text;
    }
    this._autoResize();
  },

  getText(this: IEditText) {
    return this.textArea.value;
  },

  _initTextMarker(this: IEditText) {
    this.textArea = L.PM.Draw.Text.prototype._createTextArea.call(this);
    if (this.options.className) {
      const cssClasses = this.options.className.split(' ');
      this.textArea.classList.add(...cssClasses);
    }
    const textAreaIcon = L.PM.Draw.Text.prototype._createTextIcon.call(
      this,
      this.textArea
    );
    this._layer.setIcon(textAreaIcon);

    this._layer.once(
      'add',
      this._createTextMarker as unknown as L.LeafletEventHandlerFn,
      this
    );
  },

  _createTextMarker(this: IEditText, enable: boolean | L.LeafletEvent = false) {
    this._layer.off(
      'add',
      this._createTextMarker as unknown as L.LeafletEventHandlerFn,
      this
    );

    const element = this._layer.getElement();
    if (element) {
      element.tabIndex = -1;
    }

    this.textArea.wrap = 'off';
    this.textArea.style.overflow = 'hidden';
    this.textArea.style.height =
      L.DomUtil.getStyle(this.textArea, 'font-size') || '';
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
  },

  // Chrome ignores `user-select: none`, so we need to disable text selection manually
  _preventTextSelection(e: Event) {
    e.preventDefault();
  },

  remove(this: IEditText) {
    const map = (this._map ||
      (this._layer as unknown as { _map: ExtendedMap })._map) as ExtendedMap;
    // Fire remove events before removing the layer
    this._layer.fire('pm:remove', {
      layer: this._layer,
      shape: this._shape,
    });
    map.fire('pm:remove', {
      layer: this._layer,
      shape: this._shape,
    });
    // Remove the layer from the map
    this._layer.remove();
  },
});

// Assign to Edit class
(Edit as unknown as { Text: unknown }).Text = EditText;

export default EditText;
