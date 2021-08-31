L.MatrixUtil = {

  // Compute the adjugate of m
  adj(m) {
    return [
      m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4],
      m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5],
      m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3],
    ];
  },

  // multiply two 3*3 matrices
  multmm(a, b) {
    const c = [];
    let i;

    for (i = 0; i < 3; i+=1) {
      for (let j = 0; j < 3; j+=1) {
        let cij = 0;

        for (let k = 0; k < 3; k+=1) {
          cij += a[3*i + k]*b[3*k + j];
        }

        c[3*i + j] = cij;
      }
    }

    return c;
  },

  // multiply a 3*3 matrix and a 3-vector
  multmv(m, v) {
    return [
      m[0]*v[0] + m[1]*v[1] + m[2]*v[2],
      m[3]*v[0] + m[4]*v[1] + m[5]*v[2],
      m[6]*v[0] + m[7]*v[1] + m[8]*v[2],
    ];
  },

  // multiply a scalar and a 3*3 matrix
  multsm(s, m) {
    const matrix = [];

    for (let i = 0, l = m.length; i < l; i+=1) {
      matrix.push(s*m[i]);
    }

    return matrix;
  },

  basisToPoints(x1, y1, x2, y2, x3, y3, x4, y4) {
    const m = [
      x1, x2, x3,
      y1, y2, y3,
      1, 1, 1,
    ];
    const v = L.MatrixUtil.multmv(L.MatrixUtil.adj(m), [x4, y4, 1]);

    return L.MatrixUtil.multmm(m, [
      v[0], 0, 0,
      0, v[1], 0,
      0, 0, v[2],
    ]);
  },

  project(m, x, y) {
    const v = L.MatrixUtil.multmv(m, [x, y, 1]);

    return [v[0]/v[2], v[1]/v[2]];
  },

  general2DProjection(
      x1s, y1s, x1d, y1d,
      x2s, y2s, x2d, y2d,
      x3s, y3s, x3d, y3d,
      x4s, y4s, x4d, y4d
  ) {
    const s = L.MatrixUtil.basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
    const d = L.MatrixUtil.basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
    const m = L.MatrixUtil.multmm(d, L.MatrixUtil.adj(s));

    // Normalize to the unique matrix with m[8] == 1.
    // See: http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/

    return L.MatrixUtil.multsm(1/m[8], m);
  },
};
