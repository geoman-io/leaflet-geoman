L.DomUtil = L.extend(L.DomUtil, {
  initTranslation(obj) {
    this.translation = obj;
  },

  getMatrixString(m) {
    const is3d = L.Browser.webkit3d || L.Browser.gecko3d || L.Browser.ie3d;

    /*
     * Since matrix3d takes a 4*4 matrix, we add in an empty row and column,
     * which act as the identity on the z-axis.
     * See:
     *     http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/
     *     https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#M.C3.B6bius'_homogeneous_coordinates_in_projective_geometry
     */
    const matrix = [
      m[0], m[3], 0, m[6],
      m[1], m[4], 0, m[7],
      0, 0, 1, 0,
      m[2], m[5], 0, m[8],
    ];

    const str = is3d ? `matrix3d(${  matrix.join(',')  })` : '';

    if (!is3d) {
      console
          .log('Your browser must support 3D CSS transforms' +
          'in order to use DistortableImageOverlay.');
    }

    return str;
  },

  toggleClass(el, className) {
    const c = className;
    return this.hasClass(el, c) ?
      this.removeClass(el, c) : this.addClass(el, c);
  },

  confirmDelete() {
    return window.confirm(this.translation.confirmImageDelete);
  },

  confirmDeletes(n) {
    if (n === 1) { return this.confirmDelete(); }

    const translation = this.translation.confirmImagesDeletes;
    let warningMsg = '';

    if (typeof translation === 'function') {
      warningMsg = translation(n);
    } else {
      warningMsg = translation;
    }

    return window.confirm(warningMsg);
  },
});
