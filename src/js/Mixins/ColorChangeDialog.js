const ColorChangeMixin = {
  colorChangeDialog: undefined,
  colorChangeDialogInit(options = {}) {
    this.colorChangeDialog = L.control.dialog({
      size: [200, 300],
      anchor: [0, -210],
      position: 'topright',
      contentId: 'color-change',
      ...options,
    });
    return this.colorChangeDialog;
  },
  openColorChangeDialog() {
    this.colorChangeInit();
    this.colorChangeDialog?.open();
  },
  closeColorChangeDialog() {
    this.colorChangeDialog?.close();
  },
  toggleColorChangeDialog() {
    if (this.colorChangeDialog) {
      if (this.colorChangeDialog.isOpen()) {
        this.colorChangeDialog?.close();
      } else {
        this.colorChangeDialog?.open();
      }
    }
  },
  enableColorChange() {
    if (!this.options.allowColorChange) {
      this.disableColorChange();
      return;
    }

    if (this.colorChangeEnabled()) {
      this.disableColorChange();
    }

    this._colorChangeEnabled = true;

    this._layer.on('remove', this.disableColorChange, this);

    this._fireColorChangeEnable(this._layer);
  },
  disableColorChange() {},
  colorChangeEnabled() {},
  updateColorisPosition() {
    window.Coloris?.updatePosition();
  },
  colorChangeInit(map, options = {}) {
    // eslint-disable-next-line no-undef
    Coloris({
      parent: '#color-change', // The parent property must be first
      theme: 'polaroid',
      themeMode: 'light',
      alpha: false,
      closeButton: false,
      inline: true,
      defaultColor: options.activeColor || '#3388ff',
      onChange: (e) => {
        const style = {
          color: e,
        };
        map.pm.setGlobalOptions({
          activeColor: e,
          templineStyle: style,
          hintlineStyle: style,
        });
        map.pm.setPathOptions(style, {
          ignoreShapes: ['Text'],
          merge: true,
        });
        console.log('this (color change)', map);
      },
      swatches: [
        '#0020A0',
        '#2E6C12',
        '#E9C46A',
        '#CB3325',
        '#C1235C',
        '#BBC5CE',
        '#0F92B3',
        '#595858',
        '#FFFFFF',
        '#262223',
      ],
      ...options,
    });
  },
};

export default ColorChangeMixin;
