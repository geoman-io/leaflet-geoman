/**
 * Copyright (c) https://github.com/w8r/Leaflet.Path.Transform
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

/**
 * @class  L.PM.Matrix
 *
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} e
 * @param {Number} f
 */
export interface Matrix {
  _matrix: [number, number, number, number, number, number];
  transform(point: L.Point): L.Point;
  _transform(point: L.Point): L.Point;
  untransform(point: L.Point): L.Point;
  clone(): Matrix;
  translate(): L.Point;
  translate(translate: number | L.Point): Matrix;
  scale(): L.Point;
  scale(scale: number | L.Point, origin?: L.Point): Matrix;
  rotate(angle: number, origin?: L.Point): Matrix;
  flip(): Matrix;
  _add(a: Matrix): Matrix;
  _add(
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): Matrix;
}

export interface MatrixConstructor {
  new (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): Matrix;
  init(): Matrix;
  prototype: Matrix;
}

// Preserve the public function constructor and enumerable prototype methods.
const Matrix = function Matrix(
  this: Matrix,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
) {
  /**
   * @type {Array.<Number>}
   */
  this._matrix = [a, b, c, d, e, f];
} as unknown as MatrixConstructor;

Matrix.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0);

Matrix.prototype = {
  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  transform(this: Matrix, point: L.Point): L.Point {
    return this._transform(point.clone());
  },

  /**
   * Destructive
   *
   * [ x ] = [ a  b  tx ] [ x ] = [ a * x + b * y + tx ]
   * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
   *
   * @param  {L.Point} point
   * @return {L.Point}
   */
  _transform(this: Matrix, point: L.Point): L.Point {
    const matrix = this._matrix;
    const { x, y } = point;
    point.x = matrix[0] * x + matrix[1] * y + matrix[4];
    point.y = matrix[2] * x + matrix[3] * y + matrix[5];
    return point;
  },

  /**
   * @param  {L.Point} point
   * @return {L.Point}
   */
  untransform(this: Matrix, point: L.Point): L.Point {
    const matrix = this._matrix;
    return new L.Point(
      (point.x / matrix[0] - matrix[4]) / matrix[0],
      (point.y / matrix[2] - matrix[5]) / matrix[2]
    );
  },

  /**
   * @return {L.PM.Matrix}
   */
  clone(this: Matrix): Matrix {
    const matrix = this._matrix;
    return new L.PM.Matrix(
      matrix[0],
      matrix[1],
      matrix[2],
      matrix[3],
      matrix[4],
      matrix[5]
    );
  },

  /**
   * @param {L.Point|Number} translate
   * @return {L.PM.Matrix|L.Point}
   */
  translate(this: Matrix, translate?: number | L.Point): L.Point | Matrix {
    if (translate === undefined) {
      return new L.Point(this._matrix[4], this._matrix[5]);
    }

    let translateX;
    let translateY;
    if (typeof translate === 'number') {
      translateX = translate;
      translateY = translate;
    } else {
      translateX = translate.x;
      translateY = translate.y;
    }

    return this._add(1, 0, 0, 1, translateX, translateY);
  },

  /**
   * @param {L.Point|Number} scale
   * @param {L.Point|Number} origin
   * @return {L.PM.Matrix|L.Point}
   */
  scale(
    this: Matrix,
    scale?: number | L.Point,
    origin?: L.Point
  ): L.Point | Matrix {
    if (scale === undefined) {
      return new L.Point(this._matrix[0], this._matrix[3]);
    }

    let scaleX;
    let scaleY;
    origin = origin || L.point(0, 0);
    if (typeof scale === 'number') {
      scaleX = scale;
      scaleY = scale;
    } else {
      scaleX = scale.x;
      scaleY = scale.y;
    }

    return this._add(scaleX, 0, 0, scaleY, origin.x, origin.y)._add(
      1,
      0,
      0,
      1,
      -origin.x,
      -origin.y
    );
  },

  /**
   * m00  m01  x - m00 * x - m01 * y
   * m10  m11  y - m10 * x - m11 * y
   * @param {Number}   angle
   * @param {L.Point=} origin
   * @return {L.PM.Matrix}
   */
  rotate(this: Matrix, angle: number, origin?: L.Point): Matrix {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    origin = origin || new L.Point(0, 0);

    return this._add(cos, sin, -sin, cos, origin.x, origin.y)._add(
      1,
      0,
      0,
      1,
      -origin.x,
      -origin.y
    );
  },

  /**
   * Invert rotation
   * @return {L.PM.Matrix}
   */
  flip(this: Matrix): Matrix {
    this._matrix[1] *= -1;
    this._matrix[2] *= -1;
    return this;
  },

  /**
   * @param {Number|L.PM.Matrix} a
   * @param {Number} b
   * @param {Number} c
   * @param {Number} d
   * @param {Number} e
   * @param {Number} f
   */
  _add(
    this: Matrix,
    a: number | Matrix,
    b?: number,
    c?: number,
    d?: number,
    e?: number,
    f?: number
  ): Matrix {
    const result: number[][] = [[], [], []];
    let src = this._matrix;
    const m = [
      [src[0], src[2], src[4]],
      [src[1], src[3], src[5]],
      [0, 0, 1],
    ];
    let other = [
      [a as number, c!, e!],
      [b!, d!, f!],
      [0, 0, 1],
    ];
    let val;

    if (a && a instanceof L.PM.Matrix) {
      src = a._matrix;
      other = [
        [src[0], src[2], src[4]],
        [src[1], src[3], src[5]],
        [0, 0, 1],
      ];
    }

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        val = 0;
        for (let k = 0; k < 3; k += 1) {
          val += m[i][k] * other[k][j];
        }
        result[i][j] = val;
      }
    }

    this._matrix = [
      result[0][0],
      result[1][0],
      result[0][1],
      result[1][1],
      result[0][2],
      result[1][2],
    ];
    return this;
  },
} as Matrix;

export default Matrix;
