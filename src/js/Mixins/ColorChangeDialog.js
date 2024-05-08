const ColorChangeMixin = {
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
    window.cdialog = this.colorChangeDialog;
    if (this.colorChangeDialog) {
      if (this.colorChangeDialog.isOpen()) {
        this.colorChangeDialog?.close();
      } else {
        this.colorChangeDialog?.open();
        if (this.drawArrowLineDialog?.isOpen()) {
          this.colorChangeDialog.setLocation([275, -210]);
        } else {
          this.colorChangeDialog.setLocation([0, -210]);
        }
      }
    }
  },
  enableColorChange() {
    if (!this.options.allowColorChange) {
      this.disableColorChange();
      return;
    }

    if (this.getShape() === 'Text' || this.getShape() === 'Marker') {
      return;
    }

    this._colorChangeEnabled = true;

    L.DomUtil.addClass(this._layer.getElement(), 'leaflet-pm-changecolor');
    this._layer.on('remove', this.disableColorChange, this);
    this._layer.on('click', this.updateShapeStyle, this);

    this._fireColorChangeEnable(this._layer);
  },
  disableColorChange() {
    this._colorChangeEnabled = true;

    L.DomUtil.removeClass(this._layer.getElement(), 'leaflet-pm-changecolor');
    this._layer.off('remove', this.disableColorChange, this);
    this._layer.off('click', this.updateShapeStyle, this);

    this._fireColorChangeDisable(this._layer);
  },
  colorChangeEnabled() {
    return this._colorChangeEnabled;
  },
  updateColorisPosition() {
    window.Coloris?.updatePosition();
  },
  updateShapeStyle(e) {
    e.target.setStyle({ color: this.options.activeColor });
    e.target._map.fire('viewreset', e);
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
        map.pm.setGlobalStyle({
          activeColor: e,
          templineStyle: style,
          hintlineStyle: { ...style, dashArray: '5,5' },
          pathOptions: style,
        });
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
