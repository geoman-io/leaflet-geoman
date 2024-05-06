const ColorChangeMixin = {
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
  colorChangeInit(options) {
    // eslint-disable-next-line no-undef
    return Coloris({
      parent: '#color-change', // The parent property must be first
      theme: 'polaroid',
      themeMode: 'light',
      alpha: false,
      closeButton: false,
      inline: true,
      defaultColor: '#3388ff',
      onChange: (e) => {
        this.activeColor = e;
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
