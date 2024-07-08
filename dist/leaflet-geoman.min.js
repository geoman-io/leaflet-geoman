(() => {
  var ep = Object.create;
  var Vs = Object.defineProperty;
  var ip = Object.getOwnPropertyDescriptor;
  var rp = Object.getOwnPropertyNames;
  var np = Object.getPrototypeOf,
    op = Object.prototype.hasOwnProperty;
  var Z = (t, i) => () => (i || t((i = { exports: {} }).exports, i), i.exports);
  var sp = (t, i, r, o) => {
    if ((i && typeof i == 'object') || typeof i == 'function')
      for (let a of rp(i))
        !op.call(t, a) &&
          a !== r &&
          Vs(t, a, {
            get: () => i[a],
            enumerable: !(o = ip(i, a)) || o.enumerable,
          });
    return t;
  };
  var le = (t, i, r) => (
    (r = t != null ? ep(np(t)) : {}),
    sp(
      i || !t || !t.__esModule
        ? Vs(r, 'default', { value: t, enumerable: !0 })
        : r,
      t
    )
  );
  var js = Z((zr, Hs) => {
    (function (t, i) {
      typeof zr == 'object' && typeof Hs < 'u'
        ? i(zr)
        : typeof define == 'function' && define.amd
          ? define(['exports'], i)
          : ((t = typeof globalThis < 'u' ? globalThis : t || self),
            i((t.leaflet = {})));
    })(zr, function (t) {
      'use strict';
      var i = '1.9.3';
      function r(e) {
        var n, s, h, f;
        for (s = 1, h = arguments.length; s < h; s++) {
          f = arguments[s];
          for (n in f) e[n] = f[n];
        }
        return e;
      }
      var o =
        Object.create ||
        (function () {
          function e() {}
          return function (n) {
            return (e.prototype = n), new e();
          };
        })();
      function a(e, n) {
        var s = Array.prototype.slice;
        if (e.bind) return e.bind.apply(e, s.call(arguments, 1));
        var h = s.call(arguments, 2);
        return function () {
          return e.apply(n, h.length ? h.concat(s.call(arguments)) : arguments);
        };
      }
      var l = 0;
      function u(e) {
        return '_leaflet_id' in e || (e._leaflet_id = ++l), e._leaflet_id;
      }
      function c(e, n, s) {
        var h, f, m, x;
        return (
          (x = function () {
            (h = !1), f && (m.apply(s, f), (f = !1));
          }),
          (m = function () {
            h
              ? (f = arguments)
              : (e.apply(s, arguments), setTimeout(x, n), (h = !0));
          }),
          m
        );
      }
      function d(e, n, s) {
        var h = n[1],
          f = n[0],
          m = h - f;
        return e === h && s ? e : ((((e - f) % m) + m) % m) + f;
      }
      function p() {
        return !1;
      }
      function y(e, n) {
        if (n === !1) return e;
        var s = Math.pow(10, n === void 0 ? 6 : n);
        return Math.round(e * s) / s;
      }
      function b(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
      }
      function D(e) {
        return b(e).split(/\s+/);
      }
      function O(e, n) {
        Object.prototype.hasOwnProperty.call(e, 'options') ||
          (e.options = e.options ? o(e.options) : {});
        for (var s in n) e.options[s] = n[s];
        return e.options;
      }
      function q(e, n, s) {
        var h = [];
        for (var f in e)
          h.push(
            encodeURIComponent(s ? f.toUpperCase() : f) +
              '=' +
              encodeURIComponent(e[f])
          );
        return (!n || n.indexOf('?') === -1 ? '?' : '&') + h.join('&');
      }
      var $ = /\{ *([\w_ -]+) *\}/g;
      function w(e, n) {
        return e.replace($, function (s, h) {
          var f = n[h];
          if (f === void 0)
            throw new Error('No value provided for variable ' + s);
          return typeof f == 'function' && (f = f(n)), f;
        });
      }
      var B =
        Array.isArray ||
        function (e) {
          return Object.prototype.toString.call(e) === '[object Array]';
        };
      function M(e, n) {
        for (var s = 0; s < e.length; s++) if (e[s] === n) return s;
        return -1;
      }
      var K = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      function W(e) {
        return window['webkit' + e] || window['moz' + e] || window['ms' + e];
      }
      var Y = 0;
      function V(e) {
        var n = +new Date(),
          s = Math.max(0, 16 - (n - Y));
        return (Y = n + s), window.setTimeout(e, s);
      }
      var A = window.requestAnimationFrame || W('RequestAnimationFrame') || V,
        g =
          window.cancelAnimationFrame ||
          W('CancelAnimationFrame') ||
          W('CancelRequestAnimationFrame') ||
          function (e) {
            window.clearTimeout(e);
          };
      function _(e, n, s) {
        if (s && A === V) e.call(n);
        else return A.call(window, a(e, n));
      }
      function v(e) {
        e && g.call(window, e);
      }
      var T = {
        __proto__: null,
        extend: r,
        create: o,
        bind: a,
        get lastId() {
          return l;
        },
        stamp: u,
        throttle: c,
        wrapNum: d,
        falseFn: p,
        formatNum: y,
        trim: b,
        splitWords: D,
        setOptions: O,
        getParamString: q,
        template: w,
        isArray: B,
        indexOf: M,
        emptyImageUrl: K,
        requestFn: A,
        cancelFn: g,
        requestAnimFrame: _,
        cancelAnimFrame: v,
      };
      function P() {}
      (P.extend = function (e) {
        var n = function () {
            O(this),
              this.initialize && this.initialize.apply(this, arguments),
              this.callInitHooks();
          },
          s = (n.__super__ = this.prototype),
          h = o(s);
        (h.constructor = n), (n.prototype = h);
        for (var f in this)
          Object.prototype.hasOwnProperty.call(this, f) &&
            f !== 'prototype' &&
            f !== '__super__' &&
            (n[f] = this[f]);
        return (
          e.statics && r(n, e.statics),
          e.includes && (R(e.includes), r.apply(null, [h].concat(e.includes))),
          r(h, e),
          delete h.statics,
          delete h.includes,
          h.options &&
            ((h.options = s.options ? o(s.options) : {}),
            r(h.options, e.options)),
          (h._initHooks = []),
          (h.callInitHooks = function () {
            if (!this._initHooksCalled) {
              s.callInitHooks && s.callInitHooks.call(this),
                (this._initHooksCalled = !0);
              for (var m = 0, x = h._initHooks.length; m < x; m++)
                h._initHooks[m].call(this);
            }
          }),
          n
        );
      }),
        (P.include = function (e) {
          var n = this.prototype.options;
          return (
            r(this.prototype, e),
            e.options &&
              ((this.prototype.options = n), this.mergeOptions(e.options)),
            this
          );
        }),
        (P.mergeOptions = function (e) {
          return r(this.prototype.options, e), this;
        }),
        (P.addInitHook = function (e) {
          var n = Array.prototype.slice.call(arguments, 1),
            s =
              typeof e == 'function'
                ? e
                : function () {
                    this[e].apply(this, n);
                  };
          return (
            (this.prototype._initHooks = this.prototype._initHooks || []),
            this.prototype._initHooks.push(s),
            this
          );
        });
      function R(e) {
        if (!(typeof L > 'u' || !L || !L.Mixin)) {
          e = B(e) ? e : [e];
          for (var n = 0; n < e.length; n++)
            e[n] === L.Mixin.Events &&
              console.warn(
                'Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.',
                new Error().stack
              );
        }
      }
      var I = {
        on: function (e, n, s) {
          if (typeof e == 'object') for (var h in e) this._on(h, e[h], n);
          else {
            e = D(e);
            for (var f = 0, m = e.length; f < m; f++) this._on(e[f], n, s);
          }
          return this;
        },
        off: function (e, n, s) {
          if (!arguments.length) delete this._events;
          else if (typeof e == 'object') for (var h in e) this._off(h, e[h], n);
          else {
            e = D(e);
            for (
              var f = arguments.length === 1, m = 0, x = e.length;
              m < x;
              m++
            )
              f ? this._off(e[m]) : this._off(e[m], n, s);
          }
          return this;
        },
        _on: function (e, n, s, h) {
          if (typeof n != 'function') {
            console.warn('wrong listener type: ' + typeof n);
            return;
          }
          if (this._listens(e, n, s) === !1) {
            s === this && (s = void 0);
            var f = { fn: n, ctx: s };
            h && (f.once = !0),
              (this._events = this._events || {}),
              (this._events[e] = this._events[e] || []),
              this._events[e].push(f);
          }
        },
        _off: function (e, n, s) {
          var h, f, m;
          if (this._events && ((h = this._events[e]), !!h)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (f = 0, m = h.length; f < m; f++) h[f].fn = p;
              delete this._events[e];
              return;
            }
            if (typeof n != 'function') {
              console.warn('wrong listener type: ' + typeof n);
              return;
            }
            var x = this._listens(e, n, s);
            if (x !== !1) {
              var z = h[x];
              this._firingCount &&
                ((z.fn = p), (this._events[e] = h = h.slice())),
                h.splice(x, 1);
            }
          }
        },
        fire: function (e, n, s) {
          if (!this.listens(e, s)) return this;
          var h = r({}, n, {
            type: e,
            target: this,
            sourceTarget: (n && n.sourceTarget) || this,
          });
          if (this._events) {
            var f = this._events[e];
            if (f) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var m = 0, x = f.length; m < x; m++) {
                var z = f[m],
                  G = z.fn;
                z.once && this.off(e, G, z.ctx), G.call(z.ctx || this, h);
              }
              this._firingCount--;
            }
          }
          return s && this._propagateEvent(h), this;
        },
        listens: function (e, n, s, h) {
          typeof e != 'string' &&
            console.warn('"string" type argument expected');
          var f = n;
          typeof n != 'function' && ((h = !!n), (f = void 0), (s = void 0));
          var m = this._events && this._events[e];
          if (m && m.length && this._listens(e, f, s) !== !1) return !0;
          if (h) {
            for (var x in this._eventParents)
              if (this._eventParents[x].listens(e, n, s, h)) return !0;
          }
          return !1;
        },
        _listens: function (e, n, s) {
          if (!this._events) return !1;
          var h = this._events[e] || [];
          if (!n) return !!h.length;
          s === this && (s = void 0);
          for (var f = 0, m = h.length; f < m; f++)
            if (h[f].fn === n && h[f].ctx === s) return f;
          return !1;
        },
        once: function (e, n, s) {
          if (typeof e == 'object') for (var h in e) this._on(h, e[h], n, !0);
          else {
            e = D(e);
            for (var f = 0, m = e.length; f < m; f++) this._on(e[f], n, s, !0);
          }
          return this;
        },
        addEventParent: function (e) {
          return (
            (this._eventParents = this._eventParents || {}),
            (this._eventParents[u(e)] = e),
            this
          );
        },
        removeEventParent: function (e) {
          return this._eventParents && delete this._eventParents[u(e)], this;
        },
        _propagateEvent: function (e) {
          for (var n in this._eventParents)
            this._eventParents[n].fire(
              e.type,
              r({ layer: e.target, propagatedFrom: e.target }, e),
              !0
            );
        },
      };
      (I.addEventListener = I.on),
        (I.removeEventListener = I.clearAllEventListeners = I.off),
        (I.addOneTimeEventListener = I.once),
        (I.fireEvent = I.fire),
        (I.hasEventListeners = I.listens);
      var S = P.extend(I);
      function k(e, n, s) {
        (this.x = s ? Math.round(e) : e), (this.y = s ? Math.round(n) : n);
      }
      var N =
        Math.trunc ||
        function (e) {
          return e > 0 ? Math.floor(e) : Math.ceil(e);
        };
      k.prototype = {
        clone: function () {
          return new k(this.x, this.y);
        },
        add: function (e) {
          return this.clone()._add(E(e));
        },
        _add: function (e) {
          return (this.x += e.x), (this.y += e.y), this;
        },
        subtract: function (e) {
          return this.clone()._subtract(E(e));
        },
        _subtract: function (e) {
          return (this.x -= e.x), (this.y -= e.y), this;
        },
        divideBy: function (e) {
          return this.clone()._divideBy(e);
        },
        _divideBy: function (e) {
          return (this.x /= e), (this.y /= e), this;
        },
        multiplyBy: function (e) {
          return this.clone()._multiplyBy(e);
        },
        _multiplyBy: function (e) {
          return (this.x *= e), (this.y *= e), this;
        },
        scaleBy: function (e) {
          return new k(this.x * e.x, this.y * e.y);
        },
        unscaleBy: function (e) {
          return new k(this.x / e.x, this.y / e.y);
        },
        round: function () {
          return this.clone()._round();
        },
        _round: function () {
          return (
            (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
          );
        },
        floor: function () {
          return this.clone()._floor();
        },
        _floor: function () {
          return (
            (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
          );
        },
        ceil: function () {
          return this.clone()._ceil();
        },
        _ceil: function () {
          return (
            (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this
          );
        },
        trunc: function () {
          return this.clone()._trunc();
        },
        _trunc: function () {
          return (this.x = N(this.x)), (this.y = N(this.y)), this;
        },
        distanceTo: function (e) {
          e = E(e);
          var n = e.x - this.x,
            s = e.y - this.y;
          return Math.sqrt(n * n + s * s);
        },
        equals: function (e) {
          return (e = E(e)), e.x === this.x && e.y === this.y;
        },
        contains: function (e) {
          return (
            (e = E(e)),
            Math.abs(e.x) <= Math.abs(this.x) &&
              Math.abs(e.y) <= Math.abs(this.y)
          );
        },
        toString: function () {
          return 'Point(' + y(this.x) + ', ' + y(this.y) + ')';
        },
      };
      function E(e, n, s) {
        return e instanceof k
          ? e
          : B(e)
            ? new k(e[0], e[1])
            : e == null
              ? e
              : typeof e == 'object' && 'x' in e && 'y' in e
                ? new k(e.x, e.y)
                : new k(e, n, s);
      }
      function F(e, n) {
        if (e)
          for (var s = n ? [e, n] : e, h = 0, f = s.length; h < f; h++)
            this.extend(s[h]);
      }
      F.prototype = {
        extend: function (e) {
          var n, s;
          if (!e) return this;
          if (e instanceof k || typeof e[0] == 'number' || 'x' in e)
            n = s = E(e);
          else if (((e = X(e)), (n = e.min), (s = e.max), !n || !s))
            return this;
          return (
            !this.min && !this.max
              ? ((this.min = n.clone()), (this.max = s.clone()))
              : ((this.min.x = Math.min(n.x, this.min.x)),
                (this.max.x = Math.max(s.x, this.max.x)),
                (this.min.y = Math.min(n.y, this.min.y)),
                (this.max.y = Math.max(s.y, this.max.y))),
            this
          );
        },
        getCenter: function (e) {
          return E(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            e
          );
        },
        getBottomLeft: function () {
          return E(this.min.x, this.max.y);
        },
        getTopRight: function () {
          return E(this.max.x, this.min.y);
        },
        getTopLeft: function () {
          return this.min;
        },
        getBottomRight: function () {
          return this.max;
        },
        getSize: function () {
          return this.max.subtract(this.min);
        },
        contains: function (e) {
          var n, s;
          return (
            typeof e[0] == 'number' || e instanceof k ? (e = E(e)) : (e = X(e)),
            e instanceof F ? ((n = e.min), (s = e.max)) : (n = s = e),
            n.x >= this.min.x &&
              s.x <= this.max.x &&
              n.y >= this.min.y &&
              s.y <= this.max.y
          );
        },
        intersects: function (e) {
          e = X(e);
          var n = this.min,
            s = this.max,
            h = e.min,
            f = e.max,
            m = f.x >= n.x && h.x <= s.x,
            x = f.y >= n.y && h.y <= s.y;
          return m && x;
        },
        overlaps: function (e) {
          e = X(e);
          var n = this.min,
            s = this.max,
            h = e.min,
            f = e.max,
            m = f.x > n.x && h.x < s.x,
            x = f.y > n.y && h.y < s.y;
          return m && x;
        },
        isValid: function () {
          return !!(this.min && this.max);
        },
        pad: function (e) {
          var n = this.min,
            s = this.max,
            h = Math.abs(n.x - s.x) * e,
            f = Math.abs(n.y - s.y) * e;
          return X(E(n.x - h, n.y - f), E(s.x + h, s.y + f));
        },
        equals: function (e) {
          return e
            ? ((e = X(e)),
              this.min.equals(e.getTopLeft()) &&
                this.max.equals(e.getBottomRight()))
            : !1;
        },
      };
      function X(e, n) {
        return !e || e instanceof F ? e : new F(e, n);
      }
      function J(e, n) {
        if (e)
          for (var s = n ? [e, n] : e, h = 0, f = s.length; h < f; h++)
            this.extend(s[h]);
      }
      J.prototype = {
        extend: function (e) {
          var n = this._southWest,
            s = this._northEast,
            h,
            f;
          if (e instanceof et) (h = e), (f = e);
          else if (e instanceof J) {
            if (((h = e._southWest), (f = e._northEast), !h || !f)) return this;
          } else return e ? this.extend(ot(e) || it(e)) : this;
          return (
            !n && !s
              ? ((this._southWest = new et(h.lat, h.lng)),
                (this._northEast = new et(f.lat, f.lng)))
              : ((n.lat = Math.min(h.lat, n.lat)),
                (n.lng = Math.min(h.lng, n.lng)),
                (s.lat = Math.max(f.lat, s.lat)),
                (s.lng = Math.max(f.lng, s.lng))),
            this
          );
        },
        pad: function (e) {
          var n = this._southWest,
            s = this._northEast,
            h = Math.abs(n.lat - s.lat) * e,
            f = Math.abs(n.lng - s.lng) * e;
          return new J(
            new et(n.lat - h, n.lng - f),
            new et(s.lat + h, s.lng + f)
          );
        },
        getCenter: function () {
          return new et(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        getSouthWest: function () {
          return this._southWest;
        },
        getNorthEast: function () {
          return this._northEast;
        },
        getNorthWest: function () {
          return new et(this.getNorth(), this.getWest());
        },
        getSouthEast: function () {
          return new et(this.getSouth(), this.getEast());
        },
        getWest: function () {
          return this._southWest.lng;
        },
        getSouth: function () {
          return this._southWest.lat;
        },
        getEast: function () {
          return this._northEast.lng;
        },
        getNorth: function () {
          return this._northEast.lat;
        },
        contains: function (e) {
          typeof e[0] == 'number' || e instanceof et || 'lat' in e
            ? (e = ot(e))
            : (e = it(e));
          var n = this._southWest,
            s = this._northEast,
            h,
            f;
          return (
            e instanceof J
              ? ((h = e.getSouthWest()), (f = e.getNorthEast()))
              : (h = f = e),
            h.lat >= n.lat && f.lat <= s.lat && h.lng >= n.lng && f.lng <= s.lng
          );
        },
        intersects: function (e) {
          e = it(e);
          var n = this._southWest,
            s = this._northEast,
            h = e.getSouthWest(),
            f = e.getNorthEast(),
            m = f.lat >= n.lat && h.lat <= s.lat,
            x = f.lng >= n.lng && h.lng <= s.lng;
          return m && x;
        },
        overlaps: function (e) {
          e = it(e);
          var n = this._southWest,
            s = this._northEast,
            h = e.getSouthWest(),
            f = e.getNorthEast(),
            m = f.lat > n.lat && h.lat < s.lat,
            x = f.lng > n.lng && h.lng < s.lng;
          return m && x;
        },
        toBBoxString: function () {
          return [
            this.getWest(),
            this.getSouth(),
            this.getEast(),
            this.getNorth(),
          ].join(',');
        },
        equals: function (e, n) {
          return e
            ? ((e = it(e)),
              this._southWest.equals(e.getSouthWest(), n) &&
                this._northEast.equals(e.getNorthEast(), n))
            : !1;
        },
        isValid: function () {
          return !!(this._southWest && this._northEast);
        },
      };
      function it(e, n) {
        return e instanceof J ? e : new J(e, n);
      }
      function et(e, n, s) {
        if (isNaN(e) || isNaN(n))
          throw new Error('Invalid LatLng object: (' + e + ', ' + n + ')');
        (this.lat = +e), (this.lng = +n), s !== void 0 && (this.alt = +s);
      }
      et.prototype = {
        equals: function (e, n) {
          if (!e) return !1;
          e = ot(e);
          var s = Math.max(
            Math.abs(this.lat - e.lat),
            Math.abs(this.lng - e.lng)
          );
          return s <= (n === void 0 ? 1e-9 : n);
        },
        toString: function (e) {
          return 'LatLng(' + y(this.lat, e) + ', ' + y(this.lng, e) + ')';
        },
        distanceTo: function (e) {
          return ut.distance(this, ot(e));
        },
        wrap: function () {
          return ut.wrapLatLng(this);
        },
        toBounds: function (e) {
          var n = (180 * e) / 40075017,
            s = n / Math.cos((Math.PI / 180) * this.lat);
          return it([this.lat - n, this.lng - s], [this.lat + n, this.lng + s]);
        },
        clone: function () {
          return new et(this.lat, this.lng, this.alt);
        },
      };
      function ot(e, n, s) {
        return e instanceof et
          ? e
          : B(e) && typeof e[0] != 'object'
            ? e.length === 3
              ? new et(e[0], e[1], e[2])
              : e.length === 2
                ? new et(e[0], e[1])
                : null
            : e == null
              ? e
              : typeof e == 'object' && 'lat' in e
                ? new et(e.lat, 'lng' in e ? e.lng : e.lon, e.alt)
                : n === void 0
                  ? null
                  : new et(e, n, s);
      }
      var lt = {
          latLngToPoint: function (e, n) {
            var s = this.projection.project(e),
              h = this.scale(n);
            return this.transformation._transform(s, h);
          },
          pointToLatLng: function (e, n) {
            var s = this.scale(n),
              h = this.transformation.untransform(e, s);
            return this.projection.unproject(h);
          },
          project: function (e) {
            return this.projection.project(e);
          },
          unproject: function (e) {
            return this.projection.unproject(e);
          },
          scale: function (e) {
            return 256 * Math.pow(2, e);
          },
          zoom: function (e) {
            return Math.log(e / 256) / Math.LN2;
          },
          getProjectedBounds: function (e) {
            if (this.infinite) return null;
            var n = this.projection.bounds,
              s = this.scale(e),
              h = this.transformation.transform(n.min, s),
              f = this.transformation.transform(n.max, s);
            return new F(h, f);
          },
          infinite: !1,
          wrapLatLng: function (e) {
            var n = this.wrapLng ? d(e.lng, this.wrapLng, !0) : e.lng,
              s = this.wrapLat ? d(e.lat, this.wrapLat, !0) : e.lat,
              h = e.alt;
            return new et(s, n, h);
          },
          wrapLatLngBounds: function (e) {
            var n = e.getCenter(),
              s = this.wrapLatLng(n),
              h = n.lat - s.lat,
              f = n.lng - s.lng;
            if (h === 0 && f === 0) return e;
            var m = e.getSouthWest(),
              x = e.getNorthEast(),
              z = new et(m.lat - h, m.lng - f),
              G = new et(x.lat - h, x.lng - f);
            return new J(z, G);
          },
        },
        ut = r({}, lt, {
          wrapLng: [-180, 180],
          R: 6371e3,
          distance: function (e, n) {
            var s = Math.PI / 180,
              h = e.lat * s,
              f = n.lat * s,
              m = Math.sin(((n.lat - e.lat) * s) / 2),
              x = Math.sin(((n.lng - e.lng) * s) / 2),
              z = m * m + Math.cos(h) * Math.cos(f) * x * x,
              G = 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1 - z));
            return this.R * G;
          },
        }),
        Et = 6378137,
        ne = {
          R: Et,
          MAX_LATITUDE: 85.0511287798,
          project: function (e) {
            var n = Math.PI / 180,
              s = this.MAX_LATITUDE,
              h = Math.max(Math.min(s, e.lat), -s),
              f = Math.sin(h * n);
            return new k(
              this.R * e.lng * n,
              (this.R * Math.log((1 + f) / (1 - f))) / 2
            );
          },
          unproject: function (e) {
            var n = 180 / Math.PI;
            return new et(
              (2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * n,
              (e.x * n) / this.R
            );
          },
          bounds: (function () {
            var e = Et * Math.PI;
            return new F([-e, -e], [e, e]);
          })(),
        };
      function we(e, n, s, h) {
        if (B(e)) {
          (this._a = e[0]),
            (this._b = e[1]),
            (this._c = e[2]),
            (this._d = e[3]);
          return;
        }
        (this._a = e), (this._b = n), (this._c = s), (this._d = h);
      }
      we.prototype = {
        transform: function (e, n) {
          return this._transform(e.clone(), n);
        },
        _transform: function (e, n) {
          return (
            (n = n || 1),
            (e.x = n * (this._a * e.x + this._b)),
            (e.y = n * (this._c * e.y + this._d)),
            e
          );
        },
        untransform: function (e, n) {
          return (
            (n = n || 1),
            new k((e.x / n - this._b) / this._a, (e.y / n - this._d) / this._c)
          );
        },
      };
      function Nt(e, n, s, h) {
        return new we(e, n, s, h);
      }
      var qt = r({}, ut, {
          code: 'EPSG:3857',
          projection: ne,
          transformation: (function () {
            var e = 0.5 / (Math.PI * ne.R);
            return Nt(e, 0.5, -e, 0.5);
          })(),
        }),
        fe = r({}, qt, { code: 'EPSG:900913' });
      function Tt(e) {
        return document.createElementNS('http://www.w3.org/2000/svg', e);
      }
      function Bt(e, n) {
        var s = '',
          h,
          f,
          m,
          x,
          z,
          G;
        for (h = 0, m = e.length; h < m; h++) {
          for (z = e[h], f = 0, x = z.length; f < x; f++)
            (G = z[f]), (s += (f ? 'L' : 'M') + G.x + ' ' + G.y);
          s += n ? (nt.svg ? 'z' : 'x') : '';
        }
        return s || 'M0 0';
      }
      var bt = document.documentElement.style,
        ri = 'ActiveXObject' in window,
        fn = ri && !document.addEventListener,
        mr = 'msLaunchUri' in navigator && !('documentMode' in document),
        Ai = pe('webkit'),
        gr = pe('android'),
        _r = pe('android 2') || pe('android 3'),
        dn = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        pn = gr && pe('Google') && dn < 537 && !('AudioNode' in window),
        ni = !!window.opera,
        It = !mr && pe('chrome'),
        yt = pe('gecko') && !Ai && !ni && !ri,
        oi = !It && pe('safari'),
        C = pe('phantom'),
        H = 'OTransition' in bt,
        U = navigator.platform.indexOf('Win') === 0,
        tt = ri && 'transition' in bt,
        rt =
          'WebKitCSSMatrix' in window &&
          'm11' in new window.WebKitCSSMatrix() &&
          !_r,
        pt = 'MozPerspective' in bt,
        kt = !window.L_DISABLE_3D && (tt || rt || pt) && !H && !C,
        At = typeof orientation < 'u' || pe('mobile'),
        vt = At && Ai,
        Zt = At && rt,
        oe = !window.PointerEvent && window.MSPointerEvent,
        de = !!(window.PointerEvent || oe),
        Wo = 'ontouchstart' in window || !!window.TouchEvent,
        Ff = !window.L_NO_TOUCH && (Wo || de),
        qf = At && ni,
        Zf = At && yt,
        Uf =
          (window.devicePixelRatio ||
            window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
        Vf = (function () {
          var e = !1;
          try {
            var n = Object.defineProperty({}, 'passive', {
              get: function () {
                e = !0;
              },
            });
            window.addEventListener('testPassiveEventSupport', p, n),
              window.removeEventListener('testPassiveEventSupport', p, n);
          } catch {}
          return e;
        })(),
        Hf = (function () {
          return !!document.createElement('canvas').getContext;
        })(),
        mn = !!(document.createElementNS && Tt('svg').createSVGRect),
        jf =
          !!mn &&
          (function () {
            var e = document.createElement('div');
            return (
              (e.innerHTML = '<svg/>'),
              (e.firstChild && e.firstChild.namespaceURI) ===
                'http://www.w3.org/2000/svg'
            );
          })(),
        Kf =
          !mn &&
          (function () {
            try {
              var e = document.createElement('div');
              e.innerHTML = '<v:shape adj="1"/>';
              var n = e.firstChild;
              return (
                (n.style.behavior = 'url(#default#VML)'),
                n && typeof n.adj == 'object'
              );
            } catch {
              return !1;
            }
          })(),
        Wf = navigator.platform.indexOf('Mac') === 0,
        $f = navigator.platform.indexOf('Linux') === 0;
      function pe(e) {
        return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
      }
      var nt = {
          ie: ri,
          ielt9: fn,
          edge: mr,
          webkit: Ai,
          android: gr,
          android23: _r,
          androidStock: pn,
          opera: ni,
          chrome: It,
          gecko: yt,
          safari: oi,
          phantom: C,
          opera12: H,
          win: U,
          ie3d: tt,
          webkit3d: rt,
          gecko3d: pt,
          any3d: kt,
          mobile: At,
          mobileWebkit: vt,
          mobileWebkit3d: Zt,
          msPointer: oe,
          pointer: de,
          touch: Ff,
          touchNative: Wo,
          mobileOpera: qf,
          mobileGecko: Zf,
          retina: Uf,
          passiveEvents: Vf,
          canvas: Hf,
          svg: mn,
          vml: Kf,
          inlineSvg: jf,
          mac: Wf,
          linux: $f,
        },
        $o = nt.msPointer ? 'MSPointerDown' : 'pointerdown',
        Yo = nt.msPointer ? 'MSPointerMove' : 'pointermove',
        Xo = nt.msPointer ? 'MSPointerUp' : 'pointerup',
        Jo = nt.msPointer ? 'MSPointerCancel' : 'pointercancel',
        gn = { touchstart: $o, touchmove: Yo, touchend: Xo, touchcancel: Jo },
        Qo = { touchstart: ed, touchmove: yr, touchend: yr, touchcancel: yr },
        si = {},
        ts = !1;
      function Yf(e, n, s) {
        return (
          n === 'touchstart' && td(),
          Qo[n]
            ? ((s = Qo[n].bind(this, s)), e.addEventListener(gn[n], s, !1), s)
            : (console.warn('wrong event specified:', n), p)
        );
      }
      function Xf(e, n, s) {
        if (!gn[n]) {
          console.warn('wrong event specified:', n);
          return;
        }
        e.removeEventListener(gn[n], s, !1);
      }
      function Jf(e) {
        si[e.pointerId] = e;
      }
      function Qf(e) {
        si[e.pointerId] && (si[e.pointerId] = e);
      }
      function es(e) {
        delete si[e.pointerId];
      }
      function td() {
        ts ||
          (document.addEventListener($o, Jf, !0),
          document.addEventListener(Yo, Qf, !0),
          document.addEventListener(Xo, es, !0),
          document.addEventListener(Jo, es, !0),
          (ts = !0));
      }
      function yr(e, n) {
        if (n.pointerType !== (n.MSPOINTER_TYPE_MOUSE || 'mouse')) {
          n.touches = [];
          for (var s in si) n.touches.push(si[s]);
          (n.changedTouches = [n]), e(n);
        }
      }
      function ed(e, n) {
        n.MSPOINTER_TYPE_TOUCH &&
          n.pointerType === n.MSPOINTER_TYPE_TOUCH &&
          Gt(n),
          yr(e, n);
      }
      function id(e) {
        var n = {},
          s,
          h;
        for (h in e) (s = e[h]), (n[h] = s && s.bind ? s.bind(e) : s);
        return (
          (e = n),
          (n.type = 'dblclick'),
          (n.detail = 2),
          (n.isTrusted = !1),
          (n._simulated = !0),
          n
        );
      }
      var rd = 200;
      function nd(e, n) {
        e.addEventListener('dblclick', n);
        var s = 0,
          h;
        function f(m) {
          if (m.detail !== 1) {
            h = m.detail;
            return;
          }
          if (
            !(
              m.pointerType === 'mouse' ||
              (m.sourceCapabilities && !m.sourceCapabilities.firesTouchEvents)
            )
          ) {
            var x = ss(m);
            if (
              !(
                x.some(function (G) {
                  return G instanceof HTMLLabelElement && G.attributes.for;
                }) &&
                !x.some(function (G) {
                  return (
                    G instanceof HTMLInputElement ||
                    G instanceof HTMLSelectElement
                  );
                })
              )
            ) {
              var z = Date.now();
              z - s <= rd ? (h++, h === 2 && n(id(m))) : (h = 1), (s = z);
            }
          }
        }
        return e.addEventListener('click', f), { dblclick: n, simDblclick: f };
      }
      function od(e, n) {
        e.removeEventListener('dblclick', n.dblclick),
          e.removeEventListener('click', n.simDblclick);
      }
      var _n = br([
          'transform',
          'webkitTransform',
          'OTransform',
          'MozTransform',
          'msTransform',
        ]),
        Di = br([
          'webkitTransition',
          'transition',
          'OTransition',
          'MozTransition',
          'msTransition',
        ]),
        is =
          Di === 'webkitTransition' || Di === 'OTransition'
            ? Di + 'End'
            : 'transitionend';
      function rs(e) {
        return typeof e == 'string' ? document.getElementById(e) : e;
      }
      function Oi(e, n) {
        var s = e.style[n] || (e.currentStyle && e.currentStyle[n]);
        if ((!s || s === 'auto') && document.defaultView) {
          var h = document.defaultView.getComputedStyle(e, null);
          s = h ? h[n] : null;
        }
        return s === 'auto' ? null : s;
      }
      function _t(e, n, s) {
        var h = document.createElement(e);
        return (h.className = n || ''), s && s.appendChild(h), h;
      }
      function Ct(e) {
        var n = e.parentNode;
        n && n.removeChild(e);
      }
      function vr(e) {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
      }
      function ai(e) {
        var n = e.parentNode;
        n && n.lastChild !== e && n.appendChild(e);
      }
      function li(e) {
        var n = e.parentNode;
        n && n.firstChild !== e && n.insertBefore(e, n.firstChild);
      }
      function yn(e, n) {
        if (e.classList !== void 0) return e.classList.contains(n);
        var s = Lr(e);
        return s.length > 0 && new RegExp('(^|\\s)' + n + '(\\s|$)').test(s);
      }
      function dt(e, n) {
        if (e.classList !== void 0)
          for (var s = D(n), h = 0, f = s.length; h < f; h++)
            e.classList.add(s[h]);
        else if (!yn(e, n)) {
          var m = Lr(e);
          vn(e, (m ? m + ' ' : '') + n);
        }
      }
      function St(e, n) {
        e.classList !== void 0
          ? e.classList.remove(n)
          : vn(e, b((' ' + Lr(e) + ' ').replace(' ' + n + ' ', ' ')));
      }
      function vn(e, n) {
        e.className.baseVal === void 0
          ? (e.className = n)
          : (e.className.baseVal = n);
      }
      function Lr(e) {
        return (
          e.correspondingElement && (e = e.correspondingElement),
          e.className.baseVal === void 0 ? e.className : e.className.baseVal
        );
      }
      function Yt(e, n) {
        'opacity' in e.style
          ? (e.style.opacity = n)
          : 'filter' in e.style && sd(e, n);
      }
      function sd(e, n) {
        var s = !1,
          h = 'DXImageTransform.Microsoft.Alpha';
        try {
          s = e.filters.item(h);
        } catch {
          if (n === 1) return;
        }
        (n = Math.round(n * 100)),
          s
            ? ((s.Enabled = n !== 100), (s.Opacity = n))
            : (e.style.filter += ' progid:' + h + '(opacity=' + n + ')');
      }
      function br(e) {
        for (var n = document.documentElement.style, s = 0; s < e.length; s++)
          if (e[s] in n) return e[s];
        return !1;
      }
      function Ue(e, n, s) {
        var h = n || new k(0, 0);
        e.style[_n] =
          (nt.ie3d
            ? 'translate(' + h.x + 'px,' + h.y + 'px)'
            : 'translate3d(' + h.x + 'px,' + h.y + 'px,0)') +
          (s ? ' scale(' + s + ')' : '');
      }
      function Dt(e, n) {
        (e._leaflet_pos = n),
          nt.any3d
            ? Ue(e, n)
            : ((e.style.left = n.x + 'px'), (e.style.top = n.y + 'px'));
      }
      function Ve(e) {
        return e._leaflet_pos || new k(0, 0);
      }
      var Ri, Ii, Ln;
      if ('onselectstart' in document)
        (Ri = function () {
          ft(window, 'selectstart', Gt);
        }),
          (Ii = function () {
            xt(window, 'selectstart', Gt);
          });
      else {
        var zi = br([
          'userSelect',
          'WebkitUserSelect',
          'OUserSelect',
          'MozUserSelect',
          'msUserSelect',
        ]);
        (Ri = function () {
          if (zi) {
            var e = document.documentElement.style;
            (Ln = e[zi]), (e[zi] = 'none');
          }
        }),
          (Ii = function () {
            zi && ((document.documentElement.style[zi] = Ln), (Ln = void 0));
          });
      }
      function bn() {
        ft(window, 'dragstart', Gt);
      }
      function wn() {
        xt(window, 'dragstart', Gt);
      }
      var wr, xn;
      function kn(e) {
        for (; e.tabIndex === -1; ) e = e.parentNode;
        e.style &&
          (xr(),
          (wr = e),
          (xn = e.style.outline),
          (e.style.outline = 'none'),
          ft(window, 'keydown', xr));
      }
      function xr() {
        wr &&
          ((wr.style.outline = xn),
          (wr = void 0),
          (xn = void 0),
          xt(window, 'keydown', xr));
      }
      function ns(e) {
        do e = e.parentNode;
        while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
        return e;
      }
      function Mn(e) {
        var n = e.getBoundingClientRect();
        return {
          x: n.width / e.offsetWidth || 1,
          y: n.height / e.offsetHeight || 1,
          boundingClientRect: n,
        };
      }
      var ad = {
        __proto__: null,
        TRANSFORM: _n,
        TRANSITION: Di,
        TRANSITION_END: is,
        get: rs,
        getStyle: Oi,
        create: _t,
        remove: Ct,
        empty: vr,
        toFront: ai,
        toBack: li,
        hasClass: yn,
        addClass: dt,
        removeClass: St,
        setClass: vn,
        getClass: Lr,
        setOpacity: Yt,
        testProp: br,
        setTransform: Ue,
        setPosition: Dt,
        getPosition: Ve,
        get disableTextSelection() {
          return Ri;
        },
        get enableTextSelection() {
          return Ii;
        },
        disableImageDrag: bn,
        enableImageDrag: wn,
        preventOutline: kn,
        restoreOutline: xr,
        getSizedParentNode: ns,
        getScale: Mn,
      };
      function ft(e, n, s, h) {
        if (n && typeof n == 'object') for (var f in n) Pn(e, f, n[f], s);
        else {
          n = D(n);
          for (var m = 0, x = n.length; m < x; m++) Pn(e, n[m], s, h);
        }
        return this;
      }
      var me = '_leaflet_events';
      function xt(e, n, s, h) {
        if (arguments.length === 1) os(e), delete e[me];
        else if (n && typeof n == 'object') for (var f in n) En(e, f, n[f], s);
        else if (((n = D(n)), arguments.length === 2))
          os(e, function (z) {
            return M(n, z) !== -1;
          });
        else for (var m = 0, x = n.length; m < x; m++) En(e, n[m], s, h);
        return this;
      }
      function os(e, n) {
        for (var s in e[me]) {
          var h = s.split(/\d/)[0];
          (!n || n(h)) && En(e, h, null, null, s);
        }
      }
      var Cn = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        wheel: !('onwheel' in window) && 'mousewheel',
      };
      function Pn(e, n, s, h) {
        var f = n + u(s) + (h ? '_' + u(h) : '');
        if (e[me] && e[me][f]) return this;
        var m = function (z) {
            return s.call(h || e, z || window.event);
          },
          x = m;
        !nt.touchNative && nt.pointer && n.indexOf('touch') === 0
          ? (m = Yf(e, n, m))
          : nt.touch && n === 'dblclick'
            ? (m = nd(e, m))
            : 'addEventListener' in e
              ? n === 'touchstart' ||
                n === 'touchmove' ||
                n === 'wheel' ||
                n === 'mousewheel'
                ? e.addEventListener(
                    Cn[n] || n,
                    m,
                    nt.passiveEvents ? { passive: !1 } : !1
                  )
                : n === 'mouseenter' || n === 'mouseleave'
                  ? ((m = function (z) {
                      (z = z || window.event), Tn(e, z) && x(z);
                    }),
                    e.addEventListener(Cn[n], m, !1))
                  : e.addEventListener(n, x, !1)
              : e.attachEvent('on' + n, m),
          (e[me] = e[me] || {}),
          (e[me][f] = m);
      }
      function En(e, n, s, h, f) {
        f = f || n + u(s) + (h ? '_' + u(h) : '');
        var m = e[me] && e[me][f];
        if (!m) return this;
        !nt.touchNative && nt.pointer && n.indexOf('touch') === 0
          ? Xf(e, n, m)
          : nt.touch && n === 'dblclick'
            ? od(e, m)
            : 'removeEventListener' in e
              ? e.removeEventListener(Cn[n] || n, m, !1)
              : e.detachEvent('on' + n, m),
          (e[me][f] = null);
      }
      function He(e) {
        return (
          e.stopPropagation
            ? e.stopPropagation()
            : e.originalEvent
              ? (e.originalEvent._stopped = !0)
              : (e.cancelBubble = !0),
          this
        );
      }
      function Sn(e) {
        return Pn(e, 'wheel', He), this;
      }
      function Ni(e) {
        return (
          ft(e, 'mousedown touchstart dblclick contextmenu', He),
          (e._leaflet_disable_click = !0),
          this
        );
      }
      function Gt(e) {
        return (
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1), this
        );
      }
      function je(e) {
        return Gt(e), He(e), this;
      }
      function ss(e) {
        if (e.composedPath) return e.composedPath();
        for (var n = [], s = e.target; s; ) n.push(s), (s = s.parentNode);
        return n;
      }
      function as(e, n) {
        if (!n) return new k(e.clientX, e.clientY);
        var s = Mn(n),
          h = s.boundingClientRect;
        return new k(
          (e.clientX - h.left) / s.x - n.clientLeft,
          (e.clientY - h.top) / s.y - n.clientTop
        );
      }
      var ld =
        nt.linux && nt.chrome
          ? window.devicePixelRatio
          : nt.mac
            ? window.devicePixelRatio * 3
            : window.devicePixelRatio > 0
              ? 2 * window.devicePixelRatio
              : 1;
      function ls(e) {
        return nt.edge
          ? e.wheelDeltaY / 2
          : e.deltaY && e.deltaMode === 0
            ? -e.deltaY / ld
            : e.deltaY && e.deltaMode === 1
              ? -e.deltaY * 20
              : e.deltaY && e.deltaMode === 2
                ? -e.deltaY * 60
                : e.deltaX || e.deltaZ
                  ? 0
                  : e.wheelDelta
                    ? (e.wheelDeltaY || e.wheelDelta) / 2
                    : e.detail && Math.abs(e.detail) < 32765
                      ? -e.detail * 20
                      : e.detail
                        ? (e.detail / -32765) * 60
                        : 0;
      }
      function Tn(e, n) {
        var s = n.relatedTarget;
        if (!s) return !0;
        try {
          for (; s && s !== e; ) s = s.parentNode;
        } catch {
          return !1;
        }
        return s !== e;
      }
      var hd = {
          __proto__: null,
          on: ft,
          off: xt,
          stopPropagation: He,
          disableScrollPropagation: Sn,
          disableClickPropagation: Ni,
          preventDefault: Gt,
          stop: je,
          getPropagationPath: ss,
          getMousePosition: as,
          getWheelDelta: ls,
          isExternalTarget: Tn,
          addListener: ft,
          removeListener: xt,
        },
        hs = S.extend({
          run: function (e, n, s, h) {
            this.stop(),
              (this._el = e),
              (this._inProgress = !0),
              (this._duration = s || 0.25),
              (this._easeOutPower = 1 / Math.max(h || 0.5, 0.2)),
              (this._startPos = Ve(e)),
              (this._offset = n.subtract(this._startPos)),
              (this._startTime = +new Date()),
              this.fire('start'),
              this._animate();
          },
          stop: function () {
            this._inProgress && (this._step(!0), this._complete());
          },
          _animate: function () {
            (this._animId = _(this._animate, this)), this._step();
          },
          _step: function (e) {
            var n = +new Date() - this._startTime,
              s = this._duration * 1e3;
            n < s
              ? this._runFrame(this._easeOut(n / s), e)
              : (this._runFrame(1), this._complete());
          },
          _runFrame: function (e, n) {
            var s = this._startPos.add(this._offset.multiplyBy(e));
            n && s._round(), Dt(this._el, s), this.fire('step');
          },
          _complete: function () {
            v(this._animId), (this._inProgress = !1), this.fire('end');
          },
          _easeOut: function (e) {
            return 1 - Math.pow(1 - e, this._easeOutPower);
          },
        }),
        gt = S.extend({
          options: {
            crs: qt,
            center: void 0,
            zoom: void 0,
            minZoom: void 0,
            maxZoom: void 0,
            layers: [],
            maxBounds: void 0,
            renderer: void 0,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0,
          },
          initialize: function (e, n) {
            (n = O(this, n)),
              (this._handlers = []),
              (this._layers = {}),
              (this._zoomBoundLayers = {}),
              (this._sizeChanged = !0),
              this._initContainer(e),
              this._initLayout(),
              (this._onResize = a(this._onResize, this)),
              this._initEvents(),
              n.maxBounds && this.setMaxBounds(n.maxBounds),
              n.zoom !== void 0 && (this._zoom = this._limitZoom(n.zoom)),
              n.center &&
                n.zoom !== void 0 &&
                this.setView(ot(n.center), n.zoom, { reset: !0 }),
              this.callInitHooks(),
              (this._zoomAnimated =
                Di &&
                nt.any3d &&
                !nt.mobileOpera &&
                this.options.zoomAnimation),
              this._zoomAnimated &&
                (this._createAnimProxy(),
                ft(this._proxy, is, this._catchTransitionEnd, this)),
              this._addLayers(this.options.layers);
          },
          setView: function (e, n, s) {
            if (
              ((n = n === void 0 ? this._zoom : this._limitZoom(n)),
              (e = this._limitCenter(ot(e), n, this.options.maxBounds)),
              (s = s || {}),
              this._stop(),
              this._loaded && !s.reset && s !== !0)
            ) {
              s.animate !== void 0 &&
                ((s.zoom = r({ animate: s.animate }, s.zoom)),
                (s.pan = r(
                  { animate: s.animate, duration: s.duration },
                  s.pan
                )));
              var h =
                this._zoom !== n
                  ? this._tryAnimatedZoom && this._tryAnimatedZoom(e, n, s.zoom)
                  : this._tryAnimatedPan(e, s.pan);
              if (h) return clearTimeout(this._sizeTimer), this;
            }
            return this._resetView(e, n, s.pan && s.pan.noMoveStart), this;
          },
          setZoom: function (e, n) {
            return this._loaded
              ? this.setView(this.getCenter(), e, { zoom: n })
              : ((this._zoom = e), this);
          },
          zoomIn: function (e, n) {
            return (
              (e = e || (nt.any3d ? this.options.zoomDelta : 1)),
              this.setZoom(this._zoom + e, n)
            );
          },
          zoomOut: function (e, n) {
            return (
              (e = e || (nt.any3d ? this.options.zoomDelta : 1)),
              this.setZoom(this._zoom - e, n)
            );
          },
          setZoomAround: function (e, n, s) {
            var h = this.getZoomScale(n),
              f = this.getSize().divideBy(2),
              m = e instanceof k ? e : this.latLngToContainerPoint(e),
              x = m.subtract(f).multiplyBy(1 - 1 / h),
              z = this.containerPointToLatLng(f.add(x));
            return this.setView(z, n, { zoom: s });
          },
          _getBoundsCenterZoom: function (e, n) {
            (n = n || {}), (e = e.getBounds ? e.getBounds() : it(e));
            var s = E(n.paddingTopLeft || n.padding || [0, 0]),
              h = E(n.paddingBottomRight || n.padding || [0, 0]),
              f = this.getBoundsZoom(e, !1, s.add(h));
            if (
              ((f = typeof n.maxZoom == 'number' ? Math.min(n.maxZoom, f) : f),
              f === 1 / 0)
            )
              return { center: e.getCenter(), zoom: f };
            var m = h.subtract(s).divideBy(2),
              x = this.project(e.getSouthWest(), f),
              z = this.project(e.getNorthEast(), f),
              G = this.unproject(x.add(z).divideBy(2).add(m), f);
            return { center: G, zoom: f };
          },
          fitBounds: function (e, n) {
            if (((e = it(e)), !e.isValid()))
              throw new Error('Bounds are not valid.');
            var s = this._getBoundsCenterZoom(e, n);
            return this.setView(s.center, s.zoom, n);
          },
          fitWorld: function (e) {
            return this.fitBounds(
              [
                [-90, -180],
                [90, 180],
              ],
              e
            );
          },
          panTo: function (e, n) {
            return this.setView(e, this._zoom, { pan: n });
          },
          panBy: function (e, n) {
            if (((e = E(e).round()), (n = n || {}), !e.x && !e.y))
              return this.fire('moveend');
            if (n.animate !== !0 && !this.getSize().contains(e))
              return (
                this._resetView(
                  this.unproject(this.project(this.getCenter()).add(e)),
                  this.getZoom()
                ),
                this
              );
            if (
              (this._panAnim ||
                ((this._panAnim = new hs()),
                this._panAnim.on(
                  {
                    step: this._onPanTransitionStep,
                    end: this._onPanTransitionEnd,
                  },
                  this
                )),
              n.noMoveStart || this.fire('movestart'),
              n.animate !== !1)
            ) {
              dt(this._mapPane, 'leaflet-pan-anim');
              var s = this._getMapPanePos().subtract(e).round();
              this._panAnim.run(
                this._mapPane,
                s,
                n.duration || 0.25,
                n.easeLinearity
              );
            } else this._rawPanBy(e), this.fire('move').fire('moveend');
            return this;
          },
          flyTo: function (e, n, s) {
            if (((s = s || {}), s.animate === !1 || !nt.any3d))
              return this.setView(e, n, s);
            this._stop();
            var h = this.project(this.getCenter()),
              f = this.project(e),
              m = this.getSize(),
              x = this._zoom;
            (e = ot(e)), (n = n === void 0 ? x : n);
            var z = Math.max(m.x, m.y),
              G = z * this.getZoomScale(x, n),
              j = f.distanceTo(h) || 1,
              Q = 1.42,
              ht = Q * Q;
            function mt(Ot) {
              var Ir = Ot ? -1 : 1,
                Xd = Ot ? G : z,
                Jd = G * G - z * z + Ir * ht * ht * j * j,
                Qd = 2 * Xd * ht * j,
                qn = Jd / Qd,
                Us = Math.sqrt(qn * qn + 1) - qn,
                tp = Us < 1e-9 ? -18 : Math.log(Us);
              return tp;
            }
            function Jt(Ot) {
              return (Math.exp(Ot) - Math.exp(-Ot)) / 2;
            }
            function We(Ot) {
              return (Math.exp(Ot) + Math.exp(-Ot)) / 2;
            }
            function Rr(Ot) {
              return Jt(Ot) / We(Ot);
            }
            var Oe = mt(0);
            function Fn(Ot) {
              return z * (We(Oe) / We(Oe + Q * Ot));
            }
            function Kd(Ot) {
              return (z * (We(Oe) * Rr(Oe + Q * Ot) - Jt(Oe))) / ht;
            }
            function Wd(Ot) {
              return 1 - Math.pow(1 - Ot, 1.5);
            }
            var $d = Date.now(),
              qs = (mt(1) - Oe) / Q,
              Yd = s.duration ? 1e3 * s.duration : 1e3 * qs * 0.8;
            function Zs() {
              var Ot = (Date.now() - $d) / Yd,
                Ir = Wd(Ot) * qs;
              Ot <= 1
                ? ((this._flyToFrame = _(Zs, this)),
                  this._move(
                    this.unproject(
                      h.add(f.subtract(h).multiplyBy(Kd(Ir) / j)),
                      x
                    ),
                    this.getScaleZoom(z / Fn(Ir), x),
                    { flyTo: !0 }
                  ))
                : this._move(e, n)._moveEnd(!0);
            }
            return this._moveStart(!0, s.noMoveStart), Zs.call(this), this;
          },
          flyToBounds: function (e, n) {
            var s = this._getBoundsCenterZoom(e, n);
            return this.flyTo(s.center, s.zoom, n);
          },
          setMaxBounds: function (e) {
            return (
              (e = it(e)),
              this.listens('moveend', this._panInsideMaxBounds) &&
                this.off('moveend', this._panInsideMaxBounds),
              e.isValid()
                ? ((this.options.maxBounds = e),
                  this._loaded && this._panInsideMaxBounds(),
                  this.on('moveend', this._panInsideMaxBounds))
                : ((this.options.maxBounds = null), this)
            );
          },
          setMinZoom: function (e) {
            var n = this.options.minZoom;
            return (
              (this.options.minZoom = e),
              this._loaded &&
              n !== e &&
              (this.fire('zoomlevelschange'),
              this.getZoom() < this.options.minZoom)
                ? this.setZoom(e)
                : this
            );
          },
          setMaxZoom: function (e) {
            var n = this.options.maxZoom;
            return (
              (this.options.maxZoom = e),
              this._loaded &&
              n !== e &&
              (this.fire('zoomlevelschange'),
              this.getZoom() > this.options.maxZoom)
                ? this.setZoom(e)
                : this
            );
          },
          panInsideBounds: function (e, n) {
            this._enforcingBounds = !0;
            var s = this.getCenter(),
              h = this._limitCenter(s, this._zoom, it(e));
            return (
              s.equals(h) || this.panTo(h, n),
              (this._enforcingBounds = !1),
              this
            );
          },
          panInside: function (e, n) {
            n = n || {};
            var s = E(n.paddingTopLeft || n.padding || [0, 0]),
              h = E(n.paddingBottomRight || n.padding || [0, 0]),
              f = this.project(this.getCenter()),
              m = this.project(e),
              x = this.getPixelBounds(),
              z = X([x.min.add(s), x.max.subtract(h)]),
              G = z.getSize();
            if (!z.contains(m)) {
              this._enforcingBounds = !0;
              var j = m.subtract(z.getCenter()),
                Q = z.extend(m).getSize().subtract(G);
              (f.x += j.x < 0 ? -Q.x : Q.x),
                (f.y += j.y < 0 ? -Q.y : Q.y),
                this.panTo(this.unproject(f), n),
                (this._enforcingBounds = !1);
            }
            return this;
          },
          invalidateSize: function (e) {
            if (!this._loaded) return this;
            e = r({ animate: !1, pan: !0 }, e === !0 ? { animate: !0 } : e);
            var n = this.getSize();
            (this._sizeChanged = !0), (this._lastCenter = null);
            var s = this.getSize(),
              h = n.divideBy(2).round(),
              f = s.divideBy(2).round(),
              m = h.subtract(f);
            return !m.x && !m.y
              ? this
              : (e.animate && e.pan
                  ? this.panBy(m)
                  : (e.pan && this._rawPanBy(m),
                    this.fire('move'),
                    e.debounceMoveend
                      ? (clearTimeout(this._sizeTimer),
                        (this._sizeTimer = setTimeout(
                          a(this.fire, this, 'moveend'),
                          200
                        )))
                      : this.fire('moveend')),
                this.fire('resize', { oldSize: n, newSize: s }));
          },
          stop: function () {
            return (
              this.setZoom(this._limitZoom(this._zoom)),
              this.options.zoomSnap || this.fire('viewreset'),
              this._stop()
            );
          },
          locate: function (e) {
            if (
              ((e = this._locateOptions = r({ timeout: 1e4, watch: !1 }, e)),
              !('geolocation' in navigator))
            )
              return (
                this._handleGeolocationError({
                  code: 0,
                  message: 'Geolocation not supported.',
                }),
                this
              );
            var n = a(this._handleGeolocationResponse, this),
              s = a(this._handleGeolocationError, this);
            return (
              e.watch
                ? (this._locationWatchId = navigator.geolocation.watchPosition(
                    n,
                    s,
                    e
                  ))
                : navigator.geolocation.getCurrentPosition(n, s, e),
              this
            );
          },
          stopLocate: function () {
            return (
              navigator.geolocation &&
                navigator.geolocation.clearWatch &&
                navigator.geolocation.clearWatch(this._locationWatchId),
              this._locateOptions && (this._locateOptions.setView = !1),
              this
            );
          },
          _handleGeolocationError: function (e) {
            if (this._container._leaflet_id) {
              var n = e.code,
                s =
                  e.message ||
                  (n === 1
                    ? 'permission denied'
                    : n === 2
                      ? 'position unavailable'
                      : 'timeout');
              this._locateOptions.setView && !this._loaded && this.fitWorld(),
                this.fire('locationerror', {
                  code: n,
                  message: 'Geolocation error: ' + s + '.',
                });
            }
          },
          _handleGeolocationResponse: function (e) {
            if (this._container._leaflet_id) {
              var n = e.coords.latitude,
                s = e.coords.longitude,
                h = new et(n, s),
                f = h.toBounds(e.coords.accuracy * 2),
                m = this._locateOptions;
              if (m.setView) {
                var x = this.getBoundsZoom(f);
                this.setView(h, m.maxZoom ? Math.min(x, m.maxZoom) : x);
              }
              var z = { latlng: h, bounds: f, timestamp: e.timestamp };
              for (var G in e.coords)
                typeof e.coords[G] == 'number' && (z[G] = e.coords[G]);
              this.fire('locationfound', z);
            }
          },
          addHandler: function (e, n) {
            if (!n) return this;
            var s = (this[e] = new n(this));
            return this._handlers.push(s), this.options[e] && s.enable(), this;
          },
          remove: function () {
            if (
              (this._initEvents(!0),
              this.options.maxBounds &&
                this.off('moveend', this._panInsideMaxBounds),
              this._containerId !== this._container._leaflet_id)
            )
              throw new Error(
                'Map container is being reused by another instance'
              );
            try {
              delete this._container._leaflet_id, delete this._containerId;
            } catch {
              (this._container._leaflet_id = void 0),
                (this._containerId = void 0);
            }
            this._locationWatchId !== void 0 && this.stopLocate(),
              this._stop(),
              Ct(this._mapPane),
              this._clearControlPos && this._clearControlPos(),
              this._resizeRequest &&
                (v(this._resizeRequest), (this._resizeRequest = null)),
              this._clearHandlers(),
              this._loaded && this.fire('unload');
            var e;
            for (e in this._layers) this._layers[e].remove();
            for (e in this._panes) Ct(this._panes[e]);
            return (
              (this._layers = []),
              (this._panes = []),
              delete this._mapPane,
              delete this._renderer,
              this
            );
          },
          createPane: function (e, n) {
            var s =
                'leaflet-pane' +
                (e ? ' leaflet-' + e.replace('Pane', '') + '-pane' : ''),
              h = _t('div', s, n || this._mapPane);
            return e && (this._panes[e] = h), h;
          },
          getCenter: function () {
            return (
              this._checkIfLoaded(),
              this._lastCenter && !this._moved()
                ? this._lastCenter.clone()
                : this.layerPointToLatLng(this._getCenterLayerPoint())
            );
          },
          getZoom: function () {
            return this._zoom;
          },
          getBounds: function () {
            var e = this.getPixelBounds(),
              n = this.unproject(e.getBottomLeft()),
              s = this.unproject(e.getTopRight());
            return new J(n, s);
          },
          getMinZoom: function () {
            return this.options.minZoom === void 0
              ? this._layersMinZoom || 0
              : this.options.minZoom;
          },
          getMaxZoom: function () {
            return this.options.maxZoom === void 0
              ? this._layersMaxZoom === void 0
                ? 1 / 0
                : this._layersMaxZoom
              : this.options.maxZoom;
          },
          getBoundsZoom: function (e, n, s) {
            (e = it(e)), (s = E(s || [0, 0]));
            var h = this.getZoom() || 0,
              f = this.getMinZoom(),
              m = this.getMaxZoom(),
              x = e.getNorthWest(),
              z = e.getSouthEast(),
              G = this.getSize().subtract(s),
              j = X(this.project(z, h), this.project(x, h)).getSize(),
              Q = nt.any3d ? this.options.zoomSnap : 1,
              ht = G.x / j.x,
              mt = G.y / j.y,
              Jt = n ? Math.max(ht, mt) : Math.min(ht, mt);
            return (
              (h = this.getScaleZoom(Jt, h)),
              Q &&
                ((h = Math.round(h / (Q / 100)) * (Q / 100)),
                (h = n ? Math.ceil(h / Q) * Q : Math.floor(h / Q) * Q)),
              Math.max(f, Math.min(m, h))
            );
          },
          getSize: function () {
            return (
              (!this._size || this._sizeChanged) &&
                ((this._size = new k(
                  this._container.clientWidth || 0,
                  this._container.clientHeight || 0
                )),
                (this._sizeChanged = !1)),
              this._size.clone()
            );
          },
          getPixelBounds: function (e, n) {
            var s = this._getTopLeftPoint(e, n);
            return new F(s, s.add(this.getSize()));
          },
          getPixelOrigin: function () {
            return this._checkIfLoaded(), this._pixelOrigin;
          },
          getPixelWorldBounds: function (e) {
            return this.options.crs.getProjectedBounds(
              e === void 0 ? this.getZoom() : e
            );
          },
          getPane: function (e) {
            return typeof e == 'string' ? this._panes[e] : e;
          },
          getPanes: function () {
            return this._panes;
          },
          getContainer: function () {
            return this._container;
          },
          getZoomScale: function (e, n) {
            var s = this.options.crs;
            return (n = n === void 0 ? this._zoom : n), s.scale(e) / s.scale(n);
          },
          getScaleZoom: function (e, n) {
            var s = this.options.crs;
            n = n === void 0 ? this._zoom : n;
            var h = s.zoom(e * s.scale(n));
            return isNaN(h) ? 1 / 0 : h;
          },
          project: function (e, n) {
            return (
              (n = n === void 0 ? this._zoom : n),
              this.options.crs.latLngToPoint(ot(e), n)
            );
          },
          unproject: function (e, n) {
            return (
              (n = n === void 0 ? this._zoom : n),
              this.options.crs.pointToLatLng(E(e), n)
            );
          },
          layerPointToLatLng: function (e) {
            var n = E(e).add(this.getPixelOrigin());
            return this.unproject(n);
          },
          latLngToLayerPoint: function (e) {
            var n = this.project(ot(e))._round();
            return n._subtract(this.getPixelOrigin());
          },
          wrapLatLng: function (e) {
            return this.options.crs.wrapLatLng(ot(e));
          },
          wrapLatLngBounds: function (e) {
            return this.options.crs.wrapLatLngBounds(it(e));
          },
          distance: function (e, n) {
            return this.options.crs.distance(ot(e), ot(n));
          },
          containerPointToLayerPoint: function (e) {
            return E(e).subtract(this._getMapPanePos());
          },
          layerPointToContainerPoint: function (e) {
            return E(e).add(this._getMapPanePos());
          },
          containerPointToLatLng: function (e) {
            var n = this.containerPointToLayerPoint(E(e));
            return this.layerPointToLatLng(n);
          },
          latLngToContainerPoint: function (e) {
            return this.layerPointToContainerPoint(
              this.latLngToLayerPoint(ot(e))
            );
          },
          mouseEventToContainerPoint: function (e) {
            return as(e, this._container);
          },
          mouseEventToLayerPoint: function (e) {
            return this.containerPointToLayerPoint(
              this.mouseEventToContainerPoint(e)
            );
          },
          mouseEventToLatLng: function (e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
          },
          _initContainer: function (e) {
            var n = (this._container = rs(e));
            if (n) {
              if (n._leaflet_id)
                throw new Error('Map container is already initialized.');
            } else throw new Error('Map container not found.');
            ft(n, 'scroll', this._onScroll, this), (this._containerId = u(n));
          },
          _initLayout: function () {
            var e = this._container;
            (this._fadeAnimated = this.options.fadeAnimation && nt.any3d),
              dt(
                e,
                'leaflet-container' +
                  (nt.touch ? ' leaflet-touch' : '') +
                  (nt.retina ? ' leaflet-retina' : '') +
                  (nt.ielt9 ? ' leaflet-oldie' : '') +
                  (nt.safari ? ' leaflet-safari' : '') +
                  (this._fadeAnimated ? ' leaflet-fade-anim' : '')
              );
            var n = Oi(e, 'position');
            n !== 'absolute' &&
              n !== 'relative' &&
              n !== 'fixed' &&
              n !== 'sticky' &&
              (e.style.position = 'relative'),
              this._initPanes(),
              this._initControlPos && this._initControlPos();
          },
          _initPanes: function () {
            var e = (this._panes = {});
            (this._paneRenderers = {}),
              (this._mapPane = this.createPane('mapPane', this._container)),
              Dt(this._mapPane, new k(0, 0)),
              this.createPane('tilePane'),
              this.createPane('overlayPane'),
              this.createPane('shadowPane'),
              this.createPane('markerPane'),
              this.createPane('tooltipPane'),
              this.createPane('popupPane'),
              this.options.markerZoomAnimation ||
                (dt(e.markerPane, 'leaflet-zoom-hide'),
                dt(e.shadowPane, 'leaflet-zoom-hide'));
          },
          _resetView: function (e, n, s) {
            Dt(this._mapPane, new k(0, 0));
            var h = !this._loaded;
            (this._loaded = !0),
              (n = this._limitZoom(n)),
              this.fire('viewprereset');
            var f = this._zoom !== n;
            this._moveStart(f, s)._move(e, n)._moveEnd(f),
              this.fire('viewreset'),
              h && this.fire('load');
          },
          _moveStart: function (e, n) {
            return (
              e && this.fire('zoomstart'), n || this.fire('movestart'), this
            );
          },
          _move: function (e, n, s, h) {
            n === void 0 && (n = this._zoom);
            var f = this._zoom !== n;
            return (
              (this._zoom = n),
              (this._lastCenter = e),
              (this._pixelOrigin = this._getNewPixelOrigin(e)),
              h
                ? s && s.pinch && this.fire('zoom', s)
                : ((f || (s && s.pinch)) && this.fire('zoom', s),
                  this.fire('move', s)),
              this
            );
          },
          _moveEnd: function (e) {
            return e && this.fire('zoomend'), this.fire('moveend');
          },
          _stop: function () {
            return (
              v(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            );
          },
          _rawPanBy: function (e) {
            Dt(this._mapPane, this._getMapPanePos().subtract(e));
          },
          _getZoomSpan: function () {
            return this.getMaxZoom() - this.getMinZoom();
          },
          _panInsideMaxBounds: function () {
            this._enforcingBounds ||
              this.panInsideBounds(this.options.maxBounds);
          },
          _checkIfLoaded: function () {
            if (!this._loaded)
              throw new Error('Set map center and zoom first.');
          },
          _initEvents: function (e) {
            (this._targets = {}), (this._targets[u(this._container)] = this);
            var n = e ? xt : ft;
            n(
              this._container,
              'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup',
              this._handleDOMEvent,
              this
            ),
              this.options.trackResize &&
                n(window, 'resize', this._onResize, this),
              nt.any3d &&
                this.options.transform3DLimit &&
                (e ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
          },
          _onResize: function () {
            v(this._resizeRequest),
              (this._resizeRequest = _(function () {
                this.invalidateSize({ debounceMoveend: !0 });
              }, this));
          },
          _onScroll: function () {
            (this._container.scrollTop = 0), (this._container.scrollLeft = 0);
          },
          _onMoveEnd: function () {
            var e = this._getMapPanePos();
            Math.max(Math.abs(e.x), Math.abs(e.y)) >=
              this.options.transform3DLimit &&
              this._resetView(this.getCenter(), this.getZoom());
          },
          _findEventTargets: function (e, n) {
            for (
              var s = [],
                h,
                f = n === 'mouseout' || n === 'mouseover',
                m = e.target || e.srcElement,
                x = !1;
              m;

            ) {
              if (
                ((h = this._targets[u(m)]),
                h &&
                  (n === 'click' || n === 'preclick') &&
                  this._draggableMoved(h))
              ) {
                x = !0;
                break;
              }
              if (
                (h &&
                  h.listens(n, !0) &&
                  ((f && !Tn(m, e)) || (s.push(h), f))) ||
                m === this._container
              )
                break;
              m = m.parentNode;
            }
            return (
              !s.length && !x && !f && this.listens(n, !0) && (s = [this]), s
            );
          },
          _isClickDisabled: function (e) {
            for (; e && e !== this._container; ) {
              if (e._leaflet_disable_click) return !0;
              e = e.parentNode;
            }
          },
          _handleDOMEvent: function (e) {
            var n = e.target || e.srcElement;
            if (
              !(
                !this._loaded ||
                n._leaflet_disable_events ||
                (e.type === 'click' && this._isClickDisabled(n))
              )
            ) {
              var s = e.type;
              s === 'mousedown' && kn(n), this._fireDOMEvent(e, s);
            }
          },
          _mouseEvents: [
            'click',
            'dblclick',
            'mouseover',
            'mouseout',
            'contextmenu',
          ],
          _fireDOMEvent: function (e, n, s) {
            if (e.type === 'click') {
              var h = r({}, e);
              (h.type = 'preclick'), this._fireDOMEvent(h, h.type, s);
            }
            var f = this._findEventTargets(e, n);
            if (s) {
              for (var m = [], x = 0; x < s.length; x++)
                s[x].listens(n, !0) && m.push(s[x]);
              f = m.concat(f);
            }
            if (f.length) {
              n === 'contextmenu' && Gt(e);
              var z = f[0],
                G = { originalEvent: e };
              if (
                e.type !== 'keypress' &&
                e.type !== 'keydown' &&
                e.type !== 'keyup'
              ) {
                var j = z.getLatLng && (!z._radius || z._radius <= 10);
                (G.containerPoint = j
                  ? this.latLngToContainerPoint(z.getLatLng())
                  : this.mouseEventToContainerPoint(e)),
                  (G.layerPoint = this.containerPointToLayerPoint(
                    G.containerPoint
                  )),
                  (G.latlng = j
                    ? z.getLatLng()
                    : this.layerPointToLatLng(G.layerPoint));
              }
              for (x = 0; x < f.length; x++)
                if (
                  (f[x].fire(n, G, !0),
                  G.originalEvent._stopped ||
                    (f[x].options.bubblingMouseEvents === !1 &&
                      M(this._mouseEvents, n) !== -1))
                )
                  return;
            }
          },
          _draggableMoved: function (e) {
            return (
              (e = e.dragging && e.dragging.enabled() ? e : this),
              (e.dragging && e.dragging.moved()) ||
                (this.boxZoom && this.boxZoom.moved())
            );
          },
          _clearHandlers: function () {
            for (var e = 0, n = this._handlers.length; e < n; e++)
              this._handlers[e].disable();
          },
          whenReady: function (e, n) {
            return (
              this._loaded
                ? e.call(n || this, { target: this })
                : this.on('load', e, n),
              this
            );
          },
          _getMapPanePos: function () {
            return Ve(this._mapPane) || new k(0, 0);
          },
          _moved: function () {
            var e = this._getMapPanePos();
            return e && !e.equals([0, 0]);
          },
          _getTopLeftPoint: function (e, n) {
            var s =
              e && n !== void 0
                ? this._getNewPixelOrigin(e, n)
                : this.getPixelOrigin();
            return s.subtract(this._getMapPanePos());
          },
          _getNewPixelOrigin: function (e, n) {
            var s = this.getSize()._divideBy(2);
            return this.project(e, n)
              ._subtract(s)
              ._add(this._getMapPanePos())
              ._round();
          },
          _latLngToNewLayerPoint: function (e, n, s) {
            var h = this._getNewPixelOrigin(s, n);
            return this.project(e, n)._subtract(h);
          },
          _latLngBoundsToNewLayerBounds: function (e, n, s) {
            var h = this._getNewPixelOrigin(s, n);
            return X([
              this.project(e.getSouthWest(), n)._subtract(h),
              this.project(e.getNorthWest(), n)._subtract(h),
              this.project(e.getSouthEast(), n)._subtract(h),
              this.project(e.getNorthEast(), n)._subtract(h),
            ]);
          },
          _getCenterLayerPoint: function () {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
          },
          _getCenterOffset: function (e) {
            return this.latLngToLayerPoint(e).subtract(
              this._getCenterLayerPoint()
            );
          },
          _limitCenter: function (e, n, s) {
            if (!s) return e;
            var h = this.project(e, n),
              f = this.getSize().divideBy(2),
              m = new F(h.subtract(f), h.add(f)),
              x = this._getBoundsOffset(m, s, n);
            return Math.abs(x.x) <= 1 && Math.abs(x.y) <= 1
              ? e
              : this.unproject(h.add(x), n);
          },
          _limitOffset: function (e, n) {
            if (!n) return e;
            var s = this.getPixelBounds(),
              h = new F(s.min.add(e), s.max.add(e));
            return e.add(this._getBoundsOffset(h, n));
          },
          _getBoundsOffset: function (e, n, s) {
            var h = X(
                this.project(n.getNorthEast(), s),
                this.project(n.getSouthWest(), s)
              ),
              f = h.min.subtract(e.min),
              m = h.max.subtract(e.max),
              x = this._rebound(f.x, -m.x),
              z = this._rebound(f.y, -m.y);
            return new k(x, z);
          },
          _rebound: function (e, n) {
            return e + n > 0
              ? Math.round(e - n) / 2
              : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(n));
          },
          _limitZoom: function (e) {
            var n = this.getMinZoom(),
              s = this.getMaxZoom(),
              h = nt.any3d ? this.options.zoomSnap : 1;
            return (
              h && (e = Math.round(e / h) * h), Math.max(n, Math.min(s, e))
            );
          },
          _onPanTransitionStep: function () {
            this.fire('move');
          },
          _onPanTransitionEnd: function () {
            St(this._mapPane, 'leaflet-pan-anim'), this.fire('moveend');
          },
          _tryAnimatedPan: function (e, n) {
            var s = this._getCenterOffset(e)._trunc();
            return (n && n.animate) !== !0 && !this.getSize().contains(s)
              ? !1
              : (this.panBy(s, n), !0);
          },
          _createAnimProxy: function () {
            var e = (this._proxy = _t(
              'div',
              'leaflet-proxy leaflet-zoom-animated'
            ));
            this._panes.mapPane.appendChild(e),
              this.on(
                'zoomanim',
                function (n) {
                  var s = _n,
                    h = this._proxy.style[s];
                  Ue(
                    this._proxy,
                    this.project(n.center, n.zoom),
                    this.getZoomScale(n.zoom, 1)
                  ),
                    h === this._proxy.style[s] &&
                      this._animatingZoom &&
                      this._onZoomTransitionEnd();
                },
                this
              ),
              this.on('load moveend', this._animMoveEnd, this),
              this._on('unload', this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function () {
            Ct(this._proxy),
              this.off('load moveend', this._animMoveEnd, this),
              delete this._proxy;
          },
          _animMoveEnd: function () {
            var e = this.getCenter(),
              n = this.getZoom();
            Ue(this._proxy, this.project(e, n), this.getZoomScale(n, 1));
          },
          _catchTransitionEnd: function (e) {
            this._animatingZoom &&
              e.propertyName.indexOf('transform') >= 0 &&
              this._onZoomTransitionEnd();
          },
          _nothingToAnimate: function () {
            return !this._container.getElementsByClassName(
              'leaflet-zoom-animated'
            ).length;
          },
          _tryAnimatedZoom: function (e, n, s) {
            if (this._animatingZoom) return !0;
            if (
              ((s = s || {}),
              !this._zoomAnimated ||
                s.animate === !1 ||
                this._nothingToAnimate() ||
                Math.abs(n - this._zoom) > this.options.zoomAnimationThreshold)
            )
              return !1;
            var h = this.getZoomScale(n),
              f = this._getCenterOffset(e)._divideBy(1 - 1 / h);
            return s.animate !== !0 && !this.getSize().contains(f)
              ? !1
              : (_(function () {
                  this._moveStart(!0, !1)._animateZoom(e, n, !0);
                }, this),
                !0);
          },
          _animateZoom: function (e, n, s, h) {
            this._mapPane &&
              (s &&
                ((this._animatingZoom = !0),
                (this._animateToCenter = e),
                (this._animateToZoom = n),
                dt(this._mapPane, 'leaflet-zoom-anim')),
              this.fire('zoomanim', { center: e, zoom: n, noUpdate: h }),
              this._tempFireZoomEvent ||
                (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
              this._move(
                this._animateToCenter,
                this._animateToZoom,
                void 0,
                !0
              ),
              setTimeout(a(this._onZoomTransitionEnd, this), 250));
          },
          _onZoomTransitionEnd: function () {
            this._animatingZoom &&
              (this._mapPane && St(this._mapPane, 'leaflet-zoom-anim'),
              (this._animatingZoom = !1),
              this._move(
                this._animateToCenter,
                this._animateToZoom,
                void 0,
                !0
              ),
              this._tempFireZoomEvent && this.fire('zoom'),
              delete this._tempFireZoomEvent,
              this.fire('move'),
              this._moveEnd(!0));
          },
        });
      function ud(e, n) {
        return new gt(e, n);
      }
      var se = P.extend({
          options: { position: 'topright' },
          initialize: function (e) {
            O(this, e);
          },
          getPosition: function () {
            return this.options.position;
          },
          setPosition: function (e) {
            var n = this._map;
            return (
              n && n.removeControl(this),
              (this.options.position = e),
              n && n.addControl(this),
              this
            );
          },
          getContainer: function () {
            return this._container;
          },
          addTo: function (e) {
            this.remove(), (this._map = e);
            var n = (this._container = this.onAdd(e)),
              s = this.getPosition(),
              h = e._controlCorners[s];
            return (
              dt(n, 'leaflet-control'),
              s.indexOf('bottom') !== -1
                ? h.insertBefore(n, h.firstChild)
                : h.appendChild(n),
              this._map.on('unload', this.remove, this),
              this
            );
          },
          remove: function () {
            return this._map
              ? (Ct(this._container),
                this.onRemove && this.onRemove(this._map),
                this._map.off('unload', this.remove, this),
                (this._map = null),
                this)
              : this;
          },
          _refocusOnMap: function (e) {
            this._map &&
              e &&
              e.screenX > 0 &&
              e.screenY > 0 &&
              this._map.getContainer().focus();
          },
        }),
        Gi = function (e) {
          return new se(e);
        };
      gt.include({
        addControl: function (e) {
          return e.addTo(this), this;
        },
        removeControl: function (e) {
          return e.remove(), this;
        },
        _initControlPos: function () {
          var e = (this._controlCorners = {}),
            n = 'leaflet-',
            s = (this._controlContainer = _t(
              'div',
              n + 'control-container',
              this._container
            ));
          function h(f, m) {
            var x = n + f + ' ' + n + m;
            e[f + m] = _t('div', x, s);
          }
          h('top', 'left'),
            h('top', 'right'),
            h('bottom', 'left'),
            h('bottom', 'right');
        },
        _clearControlPos: function () {
          for (var e in this._controlCorners) Ct(this._controlCorners[e]);
          Ct(this._controlContainer),
            delete this._controlCorners,
            delete this._controlContainer;
        },
      });
      var us = se.extend({
          options: {
            collapsed: !0,
            position: 'topright',
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function (e, n, s, h) {
              return s < h ? -1 : h < s ? 1 : 0;
            },
          },
          initialize: function (e, n, s) {
            O(this, s),
              (this._layerControlInputs = []),
              (this._layers = []),
              (this._lastZIndex = 0),
              (this._handlingClick = !1);
            for (var h in e) this._addLayer(e[h], h);
            for (h in n) this._addLayer(n[h], h, !0);
          },
          onAdd: function (e) {
            this._initLayout(),
              this._update(),
              (this._map = e),
              e.on('zoomend', this._checkDisabledLayers, this);
            for (var n = 0; n < this._layers.length; n++)
              this._layers[n].layer.on('add remove', this._onLayerChange, this);
            return this._container;
          },
          addTo: function (e) {
            return (
              se.prototype.addTo.call(this, e), this._expandIfNotCollapsed()
            );
          },
          onRemove: function () {
            this._map.off('zoomend', this._checkDisabledLayers, this);
            for (var e = 0; e < this._layers.length; e++)
              this._layers[e].layer.off(
                'add remove',
                this._onLayerChange,
                this
              );
          },
          addBaseLayer: function (e, n) {
            return this._addLayer(e, n), this._map ? this._update() : this;
          },
          addOverlay: function (e, n) {
            return this._addLayer(e, n, !0), this._map ? this._update() : this;
          },
          removeLayer: function (e) {
            e.off('add remove', this._onLayerChange, this);
            var n = this._getLayer(u(e));
            return (
              n && this._layers.splice(this._layers.indexOf(n), 1),
              this._map ? this._update() : this
            );
          },
          expand: function () {
            dt(this._container, 'leaflet-control-layers-expanded'),
              (this._section.style.height = null);
            var e = this._map.getSize().y - (this._container.offsetTop + 50);
            return (
              e < this._section.clientHeight
                ? (dt(this._section, 'leaflet-control-layers-scrollbar'),
                  (this._section.style.height = e + 'px'))
                : St(this._section, 'leaflet-control-layers-scrollbar'),
              this._checkDisabledLayers(),
              this
            );
          },
          collapse: function () {
            return St(this._container, 'leaflet-control-layers-expanded'), this;
          },
          _initLayout: function () {
            var e = 'leaflet-control-layers',
              n = (this._container = _t('div', e)),
              s = this.options.collapsed;
            n.setAttribute('aria-haspopup', !0), Ni(n), Sn(n);
            var h = (this._section = _t('section', e + '-list'));
            s &&
              (this._map.on('click', this.collapse, this),
              ft(
                n,
                { mouseenter: this._expandSafely, mouseleave: this.collapse },
                this
              ));
            var f = (this._layersLink = _t('a', e + '-toggle', n));
            (f.href = '#'),
              (f.title = 'Layers'),
              f.setAttribute('role', 'button'),
              ft(
                f,
                {
                  keydown: function (m) {
                    m.keyCode === 13 && this._expandSafely();
                  },
                  click: function (m) {
                    Gt(m), this._expandSafely();
                  },
                },
                this
              ),
              s || this.expand(),
              (this._baseLayersList = _t('div', e + '-base', h)),
              (this._separator = _t('div', e + '-separator', h)),
              (this._overlaysList = _t('div', e + '-overlays', h)),
              n.appendChild(h);
          },
          _getLayer: function (e) {
            for (var n = 0; n < this._layers.length; n++)
              if (this._layers[n] && u(this._layers[n].layer) === e)
                return this._layers[n];
          },
          _addLayer: function (e, n, s) {
            this._map && e.on('add remove', this._onLayerChange, this),
              this._layers.push({ layer: e, name: n, overlay: s }),
              this.options.sortLayers &&
                this._layers.sort(
                  a(function (h, f) {
                    return this.options.sortFunction(
                      h.layer,
                      f.layer,
                      h.name,
                      f.name
                    );
                  }, this)
                ),
              this.options.autoZIndex &&
                e.setZIndex &&
                (this._lastZIndex++, e.setZIndex(this._lastZIndex)),
              this._expandIfNotCollapsed();
          },
          _update: function () {
            if (!this._container) return this;
            vr(this._baseLayersList),
              vr(this._overlaysList),
              (this._layerControlInputs = []);
            var e,
              n,
              s,
              h,
              f = 0;
            for (s = 0; s < this._layers.length; s++)
              (h = this._layers[s]),
                this._addItem(h),
                (n = n || h.overlay),
                (e = e || !h.overlay),
                (f += h.overlay ? 0 : 1);
            return (
              this.options.hideSingleBase &&
                ((e = e && f > 1),
                (this._baseLayersList.style.display = e ? '' : 'none')),
              (this._separator.style.display = n && e ? '' : 'none'),
              this
            );
          },
          _onLayerChange: function (e) {
            this._handlingClick || this._update();
            var n = this._getLayer(u(e.target)),
              s = n.overlay
                ? e.type === 'add'
                  ? 'overlayadd'
                  : 'overlayremove'
                : e.type === 'add'
                  ? 'baselayerchange'
                  : null;
            s && this._map.fire(s, n);
          },
          _createRadioElement: function (e, n) {
            var s =
                '<input type="radio" class="leaflet-control-layers-selector" name="' +
                e +
                '"' +
                (n ? ' checked="checked"' : '') +
                '/>',
              h = document.createElement('div');
            return (h.innerHTML = s), h.firstChild;
          },
          _addItem: function (e) {
            var n = document.createElement('label'),
              s = this._map.hasLayer(e.layer),
              h;
            e.overlay
              ? ((h = document.createElement('input')),
                (h.type = 'checkbox'),
                (h.className = 'leaflet-control-layers-selector'),
                (h.defaultChecked = s))
              : (h = this._createRadioElement(
                  'leaflet-base-layers_' + u(this),
                  s
                )),
              this._layerControlInputs.push(h),
              (h.layerId = u(e.layer)),
              ft(h, 'click', this._onInputClick, this);
            var f = document.createElement('span');
            f.innerHTML = ' ' + e.name;
            var m = document.createElement('span');
            n.appendChild(m), m.appendChild(h), m.appendChild(f);
            var x = e.overlay ? this._overlaysList : this._baseLayersList;
            return x.appendChild(n), this._checkDisabledLayers(), n;
          },
          _onInputClick: function () {
            var e = this._layerControlInputs,
              n,
              s,
              h = [],
              f = [];
            this._handlingClick = !0;
            for (var m = e.length - 1; m >= 0; m--)
              (n = e[m]),
                (s = this._getLayer(n.layerId).layer),
                n.checked ? h.push(s) : n.checked || f.push(s);
            for (m = 0; m < f.length; m++)
              this._map.hasLayer(f[m]) && this._map.removeLayer(f[m]);
            for (m = 0; m < h.length; m++)
              this._map.hasLayer(h[m]) || this._map.addLayer(h[m]);
            (this._handlingClick = !1), this._refocusOnMap();
          },
          _checkDisabledLayers: function () {
            for (
              var e = this._layerControlInputs,
                n,
                s,
                h = this._map.getZoom(),
                f = e.length - 1;
              f >= 0;
              f--
            )
              (n = e[f]),
                (s = this._getLayer(n.layerId).layer),
                (n.disabled =
                  (s.options.minZoom !== void 0 && h < s.options.minZoom) ||
                  (s.options.maxZoom !== void 0 && h > s.options.maxZoom));
          },
          _expandIfNotCollapsed: function () {
            return this._map && !this.options.collapsed && this.expand(), this;
          },
          _expandSafely: function () {
            var e = this._section;
            ft(e, 'click', Gt),
              this.expand(),
              setTimeout(function () {
                xt(e, 'click', Gt);
              });
          },
        }),
        cd = function (e, n, s) {
          return new us(e, n, s);
        },
        Bn = se.extend({
          options: {
            position: 'topleft',
            zoomInText: '<span aria-hidden="true">+</span>',
            zoomInTitle: 'Zoom in',
            zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
            zoomOutTitle: 'Zoom out',
          },
          onAdd: function (e) {
            var n = 'leaflet-control-zoom',
              s = _t('div', n + ' leaflet-bar'),
              h = this.options;
            return (
              (this._zoomInButton = this._createButton(
                h.zoomInText,
                h.zoomInTitle,
                n + '-in',
                s,
                this._zoomIn
              )),
              (this._zoomOutButton = this._createButton(
                h.zoomOutText,
                h.zoomOutTitle,
                n + '-out',
                s,
                this._zoomOut
              )),
              this._updateDisabled(),
              e.on('zoomend zoomlevelschange', this._updateDisabled, this),
              s
            );
          },
          onRemove: function (e) {
            e.off('zoomend zoomlevelschange', this._updateDisabled, this);
          },
          disable: function () {
            return (this._disabled = !0), this._updateDisabled(), this;
          },
          enable: function () {
            return (this._disabled = !1), this._updateDisabled(), this;
          },
          _zoomIn: function (e) {
            !this._disabled &&
              this._map._zoom < this._map.getMaxZoom() &&
              this._map.zoomIn(
                this._map.options.zoomDelta * (e.shiftKey ? 3 : 1)
              );
          },
          _zoomOut: function (e) {
            !this._disabled &&
              this._map._zoom > this._map.getMinZoom() &&
              this._map.zoomOut(
                this._map.options.zoomDelta * (e.shiftKey ? 3 : 1)
              );
          },
          _createButton: function (e, n, s, h, f) {
            var m = _t('a', s, h);
            return (
              (m.innerHTML = e),
              (m.href = '#'),
              (m.title = n),
              m.setAttribute('role', 'button'),
              m.setAttribute('aria-label', n),
              Ni(m),
              ft(m, 'click', je),
              ft(m, 'click', f, this),
              ft(m, 'click', this._refocusOnMap, this),
              m
            );
          },
          _updateDisabled: function () {
            var e = this._map,
              n = 'leaflet-disabled';
            St(this._zoomInButton, n),
              St(this._zoomOutButton, n),
              this._zoomInButton.setAttribute('aria-disabled', 'false'),
              this._zoomOutButton.setAttribute('aria-disabled', 'false'),
              (this._disabled || e._zoom === e.getMinZoom()) &&
                (dt(this._zoomOutButton, n),
                this._zoomOutButton.setAttribute('aria-disabled', 'true')),
              (this._disabled || e._zoom === e.getMaxZoom()) &&
                (dt(this._zoomInButton, n),
                this._zoomInButton.setAttribute('aria-disabled', 'true'));
          },
        });
      gt.mergeOptions({ zoomControl: !0 }),
        gt.addInitHook(function () {
          this.options.zoomControl &&
            ((this.zoomControl = new Bn()), this.addControl(this.zoomControl));
        });
      var fd = function (e) {
          return new Bn(e);
        },
        cs = se.extend({
          options: {
            position: 'bottomleft',
            maxWidth: 100,
            metric: !0,
            imperial: !0,
          },
          onAdd: function (e) {
            var n = 'leaflet-control-scale',
              s = _t('div', n),
              h = this.options;
            return (
              this._addScales(h, n + '-line', s),
              e.on(h.updateWhenIdle ? 'moveend' : 'move', this._update, this),
              e.whenReady(this._update, this),
              s
            );
          },
          onRemove: function (e) {
            e.off(
              this.options.updateWhenIdle ? 'moveend' : 'move',
              this._update,
              this
            );
          },
          _addScales: function (e, n, s) {
            e.metric && (this._mScale = _t('div', n, s)),
              e.imperial && (this._iScale = _t('div', n, s));
          },
          _update: function () {
            var e = this._map,
              n = e.getSize().y / 2,
              s = e.distance(
                e.containerPointToLatLng([0, n]),
                e.containerPointToLatLng([this.options.maxWidth, n])
              );
            this._updateScales(s);
          },
          _updateScales: function (e) {
            this.options.metric && e && this._updateMetric(e),
              this.options.imperial && e && this._updateImperial(e);
          },
          _updateMetric: function (e) {
            var n = this._getRoundNum(e),
              s = n < 1e3 ? n + ' m' : n / 1e3 + ' km';
            this._updateScale(this._mScale, s, n / e);
          },
          _updateImperial: function (e) {
            var n = e * 3.2808399,
              s,
              h,
              f;
            n > 5280
              ? ((s = n / 5280),
                (h = this._getRoundNum(s)),
                this._updateScale(this._iScale, h + ' mi', h / s))
              : ((f = this._getRoundNum(n)),
                this._updateScale(this._iScale, f + ' ft', f / n));
          },
          _updateScale: function (e, n, s) {
            (e.style.width = Math.round(this.options.maxWidth * s) + 'px'),
              (e.innerHTML = n);
          },
          _getRoundNum: function (e) {
            var n = Math.pow(10, (Math.floor(e) + '').length - 1),
              s = e / n;
            return (
              (s = s >= 10 ? 10 : s >= 5 ? 5 : s >= 3 ? 3 : s >= 2 ? 2 : 1),
              n * s
            );
          },
        }),
        dd = function (e) {
          return new cs(e);
        },
        pd =
          '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',
        An = se.extend({
          options: {
            position: 'bottomright',
            prefix:
              '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' +
              (nt.inlineSvg ? pd + ' ' : '') +
              'Leaflet</a>',
          },
          initialize: function (e) {
            O(this, e), (this._attributions = {});
          },
          onAdd: function (e) {
            (e.attributionControl = this),
              (this._container = _t('div', 'leaflet-control-attribution')),
              Ni(this._container);
            for (var n in e._layers)
              e._layers[n].getAttribution &&
                this.addAttribution(e._layers[n].getAttribution());
            return (
              this._update(),
              e.on('layeradd', this._addAttribution, this),
              this._container
            );
          },
          onRemove: function (e) {
            e.off('layeradd', this._addAttribution, this);
          },
          _addAttribution: function (e) {
            e.layer.getAttribution &&
              (this.addAttribution(e.layer.getAttribution()),
              e.layer.once(
                'remove',
                function () {
                  this.removeAttribution(e.layer.getAttribution());
                },
                this
              ));
          },
          setPrefix: function (e) {
            return (this.options.prefix = e), this._update(), this;
          },
          addAttribution: function (e) {
            return e
              ? (this._attributions[e] || (this._attributions[e] = 0),
                this._attributions[e]++,
                this._update(),
                this)
              : this;
          },
          removeAttribution: function (e) {
            return e
              ? (this._attributions[e] &&
                  (this._attributions[e]--, this._update()),
                this)
              : this;
          },
          _update: function () {
            if (this._map) {
              var e = [];
              for (var n in this._attributions)
                this._attributions[n] && e.push(n);
              var s = [];
              this.options.prefix && s.push(this.options.prefix),
                e.length && s.push(e.join(', ')),
                (this._container.innerHTML = s.join(
                  ' <span aria-hidden="true">|</span> '
                ));
            }
          },
        });
      gt.mergeOptions({ attributionControl: !0 }),
        gt.addInitHook(function () {
          this.options.attributionControl && new An().addTo(this);
        });
      var md = function (e) {
        return new An(e);
      };
      (se.Layers = us),
        (se.Zoom = Bn),
        (se.Scale = cs),
        (se.Attribution = An),
        (Gi.layers = cd),
        (Gi.zoom = fd),
        (Gi.scale = dd),
        (Gi.attribution = md);
      var ge = P.extend({
        initialize: function (e) {
          this._map = e;
        },
        enable: function () {
          return this._enabled
            ? this
            : ((this._enabled = !0), this.addHooks(), this);
        },
        disable: function () {
          return this._enabled
            ? ((this._enabled = !1), this.removeHooks(), this)
            : this;
        },
        enabled: function () {
          return !!this._enabled;
        },
      });
      ge.addTo = function (e, n) {
        return e.addHandler(n, this), this;
      };
      var gd = { Events: I },
        fs = nt.touch ? 'touchstart mousedown' : 'mousedown',
        Ae = S.extend({
          options: { clickTolerance: 3 },
          initialize: function (e, n, s, h) {
            O(this, h),
              (this._element = e),
              (this._dragStartTarget = n || e),
              (this._preventOutline = s);
          },
          enable: function () {
            this._enabled ||
              (ft(this._dragStartTarget, fs, this._onDown, this),
              (this._enabled = !0));
          },
          disable: function () {
            this._enabled &&
              (Ae._dragging === this && this.finishDrag(!0),
              xt(this._dragStartTarget, fs, this._onDown, this),
              (this._enabled = !1),
              (this._moved = !1));
          },
          _onDown: function (e) {
            if (
              this._enabled &&
              ((this._moved = !1), !yn(this._element, 'leaflet-zoom-anim'))
            ) {
              if (e.touches && e.touches.length !== 1) {
                Ae._dragging === this && this.finishDrag();
                return;
              }
              if (
                !(
                  Ae._dragging ||
                  e.shiftKey ||
                  (e.which !== 1 && e.button !== 1 && !e.touches)
                ) &&
                ((Ae._dragging = this),
                this._preventOutline && kn(this._element),
                bn(),
                Ri(),
                !this._moving)
              ) {
                this.fire('down');
                var n = e.touches ? e.touches[0] : e,
                  s = ns(this._element);
                (this._startPoint = new k(n.clientX, n.clientY)),
                  (this._startPos = Ve(this._element)),
                  (this._parentScale = Mn(s));
                var h = e.type === 'mousedown';
                ft(document, h ? 'mousemove' : 'touchmove', this._onMove, this),
                  ft(
                    document,
                    h ? 'mouseup' : 'touchend touchcancel',
                    this._onUp,
                    this
                  );
              }
            }
          },
          _onMove: function (e) {
            if (this._enabled) {
              if (e.touches && e.touches.length > 1) {
                this._moved = !0;
                return;
              }
              var n = e.touches && e.touches.length === 1 ? e.touches[0] : e,
                s = new k(n.clientX, n.clientY)._subtract(this._startPoint);
              (!s.x && !s.y) ||
                Math.abs(s.x) + Math.abs(s.y) < this.options.clickTolerance ||
                ((s.x /= this._parentScale.x),
                (s.y /= this._parentScale.y),
                Gt(e),
                this._moved ||
                  (this.fire('dragstart'),
                  (this._moved = !0),
                  dt(document.body, 'leaflet-dragging'),
                  (this._lastTarget = e.target || e.srcElement),
                  window.SVGElementInstance &&
                    this._lastTarget instanceof window.SVGElementInstance &&
                    (this._lastTarget =
                      this._lastTarget.correspondingUseElement),
                  dt(this._lastTarget, 'leaflet-drag-target')),
                (this._newPos = this._startPos.add(s)),
                (this._moving = !0),
                (this._lastEvent = e),
                this._updatePosition());
            }
          },
          _updatePosition: function () {
            var e = { originalEvent: this._lastEvent };
            this.fire('predrag', e),
              Dt(this._element, this._newPos),
              this.fire('drag', e);
          },
          _onUp: function () {
            this._enabled && this.finishDrag();
          },
          finishDrag: function (e) {
            St(document.body, 'leaflet-dragging'),
              this._lastTarget &&
                (St(this._lastTarget, 'leaflet-drag-target'),
                (this._lastTarget = null)),
              xt(document, 'mousemove touchmove', this._onMove, this),
              xt(document, 'mouseup touchend touchcancel', this._onUp, this),
              wn(),
              Ii(),
              this._moved &&
                this._moving &&
                this.fire('dragend', {
                  noInertia: e,
                  distance: this._newPos.distanceTo(this._startPos),
                }),
              (this._moving = !1),
              (Ae._dragging = !1);
          },
        });
      function ds(e, n) {
        if (!n || !e.length) return e.slice();
        var s = n * n;
        return (e = vd(e, s)), (e = yd(e, s)), e;
      }
      function ps(e, n, s) {
        return Math.sqrt(Fi(e, n, s, !0));
      }
      function _d(e, n, s) {
        return Fi(e, n, s);
      }
      function yd(e, n) {
        var s = e.length,
          h = typeof Uint8Array < 'u' ? Uint8Array : Array,
          f = new h(s);
        (f[0] = f[s - 1] = 1), Dn(e, f, n, 0, s - 1);
        var m,
          x = [];
        for (m = 0; m < s; m++) f[m] && x.push(e[m]);
        return x;
      }
      function Dn(e, n, s, h, f) {
        var m = 0,
          x,
          z,
          G;
        for (z = h + 1; z <= f - 1; z++)
          (G = Fi(e[z], e[h], e[f], !0)), G > m && ((x = z), (m = G));
        m > s && ((n[x] = 1), Dn(e, n, s, h, x), Dn(e, n, s, x, f));
      }
      function vd(e, n) {
        for (var s = [e[0]], h = 1, f = 0, m = e.length; h < m; h++)
          Ld(e[h], e[f]) > n && (s.push(e[h]), (f = h));
        return f < m - 1 && s.push(e[m - 1]), s;
      }
      var ms;
      function gs(e, n, s, h, f) {
        var m = h ? ms : Ke(e, s),
          x = Ke(n, s),
          z,
          G,
          j;
        for (ms = x; ; ) {
          if (!(m | x)) return [e, n];
          if (m & x) return !1;
          (z = m || x),
            (G = kr(e, n, z, s, f)),
            (j = Ke(G, s)),
            z === m ? ((e = G), (m = j)) : ((n = G), (x = j));
        }
      }
      function kr(e, n, s, h, f) {
        var m = n.x - e.x,
          x = n.y - e.y,
          z = h.min,
          G = h.max,
          j,
          Q;
        return (
          s & 8
            ? ((j = e.x + (m * (G.y - e.y)) / x), (Q = G.y))
            : s & 4
              ? ((j = e.x + (m * (z.y - e.y)) / x), (Q = z.y))
              : s & 2
                ? ((j = G.x), (Q = e.y + (x * (G.x - e.x)) / m))
                : s & 1 && ((j = z.x), (Q = e.y + (x * (z.x - e.x)) / m)),
          new k(j, Q, f)
        );
      }
      function Ke(e, n) {
        var s = 0;
        return (
          e.x < n.min.x ? (s |= 1) : e.x > n.max.x && (s |= 2),
          e.y < n.min.y ? (s |= 4) : e.y > n.max.y && (s |= 8),
          s
        );
      }
      function Ld(e, n) {
        var s = n.x - e.x,
          h = n.y - e.y;
        return s * s + h * h;
      }
      function Fi(e, n, s, h) {
        var f = n.x,
          m = n.y,
          x = s.x - f,
          z = s.y - m,
          G = x * x + z * z,
          j;
        return (
          G > 0 &&
            ((j = ((e.x - f) * x + (e.y - m) * z) / G),
            j > 1
              ? ((f = s.x), (m = s.y))
              : j > 0 && ((f += x * j), (m += z * j))),
          (x = e.x - f),
          (z = e.y - m),
          h ? x * x + z * z : new k(f, m)
        );
      }
      function Xt(e) {
        return !B(e[0]) || (typeof e[0][0] != 'object' && typeof e[0][0] < 'u');
      }
      function _s(e) {
        return (
          console.warn(
            'Deprecated use of _flat, please use L.LineUtil.isFlat instead.'
          ),
          Xt(e)
        );
      }
      function ys(e, n) {
        var s, h, f, m, x, z, G, j;
        if (!e || e.length === 0) throw new Error('latlngs not passed');
        Xt(e) ||
          (console.warn(
            'latlngs are not flat! Only the first ring will be used'
          ),
          (e = e[0]));
        var Q = [];
        for (var ht in e) Q.push(n.project(ot(e[ht])));
        var mt = Q.length;
        for (s = 0, h = 0; s < mt - 1; s++) h += Q[s].distanceTo(Q[s + 1]) / 2;
        if (h === 0) j = Q[0];
        else
          for (s = 0, m = 0; s < mt - 1; s++)
            if (
              ((x = Q[s]),
              (z = Q[s + 1]),
              (f = x.distanceTo(z)),
              (m += f),
              m > h)
            ) {
              (G = (m - h) / f),
                (j = [z.x - G * (z.x - x.x), z.y - G * (z.y - x.y)]);
              break;
            }
        return n.unproject(E(j));
      }
      var bd = {
        __proto__: null,
        simplify: ds,
        pointToSegmentDistance: ps,
        closestPointOnSegment: _d,
        clipSegment: gs,
        _getEdgeIntersection: kr,
        _getBitCode: Ke,
        _sqClosestPointOnSegment: Fi,
        isFlat: Xt,
        _flat: _s,
        polylineCenter: ys,
      };
      function vs(e, n, s) {
        var h,
          f = [1, 4, 2, 8],
          m,
          x,
          z,
          G,
          j,
          Q,
          ht,
          mt;
        for (m = 0, Q = e.length; m < Q; m++) e[m]._code = Ke(e[m], n);
        for (z = 0; z < 4; z++) {
          for (
            ht = f[z], h = [], m = 0, Q = e.length, x = Q - 1;
            m < Q;
            x = m++
          )
            (G = e[m]),
              (j = e[x]),
              G._code & ht
                ? j._code & ht ||
                  ((mt = kr(j, G, ht, n, s)),
                  (mt._code = Ke(mt, n)),
                  h.push(mt))
                : (j._code & ht &&
                    ((mt = kr(j, G, ht, n, s)),
                    (mt._code = Ke(mt, n)),
                    h.push(mt)),
                  h.push(G));
          e = h;
        }
        return e;
      }
      function Ls(e, n) {
        var s, h, f, m, x, z, G, j, Q;
        if (!e || e.length === 0) throw new Error('latlngs not passed');
        Xt(e) ||
          (console.warn(
            'latlngs are not flat! Only the first ring will be used'
          ),
          (e = e[0]));
        var ht = [];
        for (var mt in e) ht.push(n.project(ot(e[mt])));
        var Jt = ht.length;
        for (z = G = j = 0, s = 0, h = Jt - 1; s < Jt; h = s++)
          (f = ht[s]),
            (m = ht[h]),
            (x = f.y * m.x - m.y * f.x),
            (G += (f.x + m.x) * x),
            (j += (f.y + m.y) * x),
            (z += x * 3);
        return z === 0 ? (Q = ht[0]) : (Q = [G / z, j / z]), n.unproject(E(Q));
      }
      var wd = { __proto__: null, clipPolygon: vs, polygonCenter: Ls },
        On = {
          project: function (e) {
            return new k(e.lng, e.lat);
          },
          unproject: function (e) {
            return new et(e.y, e.x);
          },
          bounds: new F([-180, -90], [180, 90]),
        },
        Rn = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new F(
            [-2003750834279e-5, -1549657073972e-5],
            [2003750834279e-5, 1876465623138e-5]
          ),
          project: function (e) {
            var n = Math.PI / 180,
              s = this.R,
              h = e.lat * n,
              f = this.R_MINOR / s,
              m = Math.sqrt(1 - f * f),
              x = m * Math.sin(h),
              z =
                Math.tan(Math.PI / 4 - h / 2) /
                Math.pow((1 - x) / (1 + x), m / 2);
            return (
              (h = -s * Math.log(Math.max(z, 1e-10))), new k(e.lng * n * s, h)
            );
          },
          unproject: function (e) {
            for (
              var n = 180 / Math.PI,
                s = this.R,
                h = this.R_MINOR / s,
                f = Math.sqrt(1 - h * h),
                m = Math.exp(-e.y / s),
                x = Math.PI / 2 - 2 * Math.atan(m),
                z = 0,
                G = 0.1,
                j;
              z < 15 && Math.abs(G) > 1e-7;
              z++
            )
              (j = f * Math.sin(x)),
                (j = Math.pow((1 - j) / (1 + j), f / 2)),
                (G = Math.PI / 2 - 2 * Math.atan(m * j) - x),
                (x += G);
            return new et(x * n, (e.x * n) / s);
          },
        },
        xd = {
          __proto__: null,
          LonLat: On,
          Mercator: Rn,
          SphericalMercator: ne,
        },
        kd = r({}, ut, {
          code: 'EPSG:3395',
          projection: Rn,
          transformation: (function () {
            var e = 0.5 / (Math.PI * Rn.R);
            return Nt(e, 0.5, -e, 0.5);
          })(),
        }),
        bs = r({}, ut, {
          code: 'EPSG:4326',
          projection: On,
          transformation: Nt(1 / 180, 1, -1 / 180, 0.5),
        }),
        Md = r({}, lt, {
          projection: On,
          transformation: Nt(1, 0, -1, 0),
          scale: function (e) {
            return Math.pow(2, e);
          },
          zoom: function (e) {
            return Math.log(e) / Math.LN2;
          },
          distance: function (e, n) {
            var s = n.lng - e.lng,
              h = n.lat - e.lat;
            return Math.sqrt(s * s + h * h);
          },
          infinite: !0,
        });
      (lt.Earth = ut),
        (lt.EPSG3395 = kd),
        (lt.EPSG3857 = qt),
        (lt.EPSG900913 = fe),
        (lt.EPSG4326 = bs),
        (lt.Simple = Md);
      var ae = S.extend({
        options: {
          pane: 'overlayPane',
          attribution: null,
          bubblingMouseEvents: !0,
        },
        addTo: function (e) {
          return e.addLayer(this), this;
        },
        remove: function () {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        removeFrom: function (e) {
          return e && e.removeLayer(this), this;
        },
        getPane: function (e) {
          return this._map.getPane(
            e ? this.options[e] || e : this.options.pane
          );
        },
        addInteractiveTarget: function (e) {
          return (this._map._targets[u(e)] = this), this;
        },
        removeInteractiveTarget: function (e) {
          return delete this._map._targets[u(e)], this;
        },
        getAttribution: function () {
          return this.options.attribution;
        },
        _layerAdd: function (e) {
          var n = e.target;
          if (n.hasLayer(this)) {
            if (
              ((this._map = n),
              (this._zoomAnimated = n._zoomAnimated),
              this.getEvents)
            ) {
              var s = this.getEvents();
              n.on(s, this),
                this.once(
                  'remove',
                  function () {
                    n.off(s, this);
                  },
                  this
                );
            }
            this.onAdd(n),
              this.fire('add'),
              n.fire('layeradd', { layer: this });
          }
        },
      });
      gt.include({
        addLayer: function (e) {
          if (!e._layerAdd)
            throw new Error('The provided object is not a Layer.');
          var n = u(e);
          return this._layers[n]
            ? this
            : ((this._layers[n] = e),
              (e._mapToAdd = this),
              e.beforeAdd && e.beforeAdd(this),
              this.whenReady(e._layerAdd, e),
              this);
        },
        removeLayer: function (e) {
          var n = u(e);
          return this._layers[n]
            ? (this._loaded && e.onRemove(this),
              delete this._layers[n],
              this._loaded &&
                (this.fire('layerremove', { layer: e }), e.fire('remove')),
              (e._map = e._mapToAdd = null),
              this)
            : this;
        },
        hasLayer: function (e) {
          return u(e) in this._layers;
        },
        eachLayer: function (e, n) {
          for (var s in this._layers) e.call(n, this._layers[s]);
          return this;
        },
        _addLayers: function (e) {
          e = e ? (B(e) ? e : [e]) : [];
          for (var n = 0, s = e.length; n < s; n++) this.addLayer(e[n]);
        },
        _addZoomLimit: function (e) {
          (!isNaN(e.options.maxZoom) || !isNaN(e.options.minZoom)) &&
            ((this._zoomBoundLayers[u(e)] = e), this._updateZoomLevels());
        },
        _removeZoomLimit: function (e) {
          var n = u(e);
          this._zoomBoundLayers[n] &&
            (delete this._zoomBoundLayers[n], this._updateZoomLevels());
        },
        _updateZoomLevels: function () {
          var e = 1 / 0,
            n = -1 / 0,
            s = this._getZoomSpan();
          for (var h in this._zoomBoundLayers) {
            var f = this._zoomBoundLayers[h].options;
            (e = f.minZoom === void 0 ? e : Math.min(e, f.minZoom)),
              (n = f.maxZoom === void 0 ? n : Math.max(n, f.maxZoom));
          }
          (this._layersMaxZoom = n === -1 / 0 ? void 0 : n),
            (this._layersMinZoom = e === 1 / 0 ? void 0 : e),
            s !== this._getZoomSpan() && this.fire('zoomlevelschange'),
            this.options.maxZoom === void 0 &&
              this._layersMaxZoom &&
              this.getZoom() > this._layersMaxZoom &&
              this.setZoom(this._layersMaxZoom),
            this.options.minZoom === void 0 &&
              this._layersMinZoom &&
              this.getZoom() < this._layersMinZoom &&
              this.setZoom(this._layersMinZoom);
        },
      });
      var hi = ae.extend({
          initialize: function (e, n) {
            O(this, n), (this._layers = {});
            var s, h;
            if (e) for (s = 0, h = e.length; s < h; s++) this.addLayer(e[s]);
          },
          addLayer: function (e) {
            var n = this.getLayerId(e);
            return (
              (this._layers[n] = e), this._map && this._map.addLayer(e), this
            );
          },
          removeLayer: function (e) {
            var n = e in this._layers ? e : this.getLayerId(e);
            return (
              this._map &&
                this._layers[n] &&
                this._map.removeLayer(this._layers[n]),
              delete this._layers[n],
              this
            );
          },
          hasLayer: function (e) {
            var n = typeof e == 'number' ? e : this.getLayerId(e);
            return n in this._layers;
          },
          clearLayers: function () {
            return this.eachLayer(this.removeLayer, this);
          },
          invoke: function (e) {
            var n = Array.prototype.slice.call(arguments, 1),
              s,
              h;
            for (s in this._layers)
              (h = this._layers[s]), h[e] && h[e].apply(h, n);
            return this;
          },
          onAdd: function (e) {
            this.eachLayer(e.addLayer, e);
          },
          onRemove: function (e) {
            this.eachLayer(e.removeLayer, e);
          },
          eachLayer: function (e, n) {
            for (var s in this._layers) e.call(n, this._layers[s]);
            return this;
          },
          getLayer: function (e) {
            return this._layers[e];
          },
          getLayers: function () {
            var e = [];
            return this.eachLayer(e.push, e), e;
          },
          setZIndex: function (e) {
            return this.invoke('setZIndex', e);
          },
          getLayerId: function (e) {
            return u(e);
          },
        }),
        Cd = function (e, n) {
          return new hi(e, n);
        },
        xe = hi.extend({
          addLayer: function (e) {
            return this.hasLayer(e)
              ? this
              : (e.addEventParent(this),
                hi.prototype.addLayer.call(this, e),
                this.fire('layeradd', { layer: e }));
          },
          removeLayer: function (e) {
            return this.hasLayer(e)
              ? (e in this._layers && (e = this._layers[e]),
                e.removeEventParent(this),
                hi.prototype.removeLayer.call(this, e),
                this.fire('layerremove', { layer: e }))
              : this;
          },
          setStyle: function (e) {
            return this.invoke('setStyle', e);
          },
          bringToFront: function () {
            return this.invoke('bringToFront');
          },
          bringToBack: function () {
            return this.invoke('bringToBack');
          },
          getBounds: function () {
            var e = new J();
            for (var n in this._layers) {
              var s = this._layers[n];
              e.extend(s.getBounds ? s.getBounds() : s.getLatLng());
            }
            return e;
          },
        }),
        Pd = function (e, n) {
          return new xe(e, n);
        },
        ui = P.extend({
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0],
            crossOrigin: !1,
          },
          initialize: function (e) {
            O(this, e);
          },
          createIcon: function (e) {
            return this._createIcon('icon', e);
          },
          createShadow: function (e) {
            return this._createIcon('shadow', e);
          },
          _createIcon: function (e, n) {
            var s = this._getIconUrl(e);
            if (!s) {
              if (e === 'icon')
                throw new Error(
                  'iconUrl not set in Icon options (see the docs).'
                );
              return null;
            }
            var h = this._createImg(s, n && n.tagName === 'IMG' ? n : null);
            return (
              this._setIconStyles(h, e),
              (this.options.crossOrigin || this.options.crossOrigin === '') &&
                (h.crossOrigin =
                  this.options.crossOrigin === !0
                    ? ''
                    : this.options.crossOrigin),
              h
            );
          },
          _setIconStyles: function (e, n) {
            var s = this.options,
              h = s[n + 'Size'];
            typeof h == 'number' && (h = [h, h]);
            var f = E(h),
              m = E(
                (n === 'shadow' && s.shadowAnchor) ||
                  s.iconAnchor ||
                  (f && f.divideBy(2, !0))
              );
            (e.className = 'leaflet-marker-' + n + ' ' + (s.className || '')),
              m &&
                ((e.style.marginLeft = -m.x + 'px'),
                (e.style.marginTop = -m.y + 'px')),
              f &&
                ((e.style.width = f.x + 'px'), (e.style.height = f.y + 'px'));
          },
          _createImg: function (e, n) {
            return (n = n || document.createElement('img')), (n.src = e), n;
          },
          _getIconUrl: function (e) {
            return (
              (nt.retina && this.options[e + 'RetinaUrl']) ||
              this.options[e + 'Url']
            );
          },
        });
      function Ed(e) {
        return new ui(e);
      }
      var qi = ui.extend({
          options: {
            iconUrl: 'marker-icon.png',
            iconRetinaUrl: 'marker-icon-2x.png',
            shadowUrl: 'marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
          },
          _getIconUrl: function (e) {
            return (
              typeof qi.imagePath != 'string' &&
                (qi.imagePath = this._detectIconPath()),
              (this.options.imagePath || qi.imagePath) +
                ui.prototype._getIconUrl.call(this, e)
            );
          },
          _stripUrl: function (e) {
            var n = function (s, h, f) {
              var m = h.exec(s);
              return m && m[f];
            };
            return (
              (e = n(e, /^url\((['"])?(.+)\1\)$/, 2)),
              e && n(e, /^(.*)marker-icon\.png$/, 1)
            );
          },
          _detectIconPath: function () {
            var e = _t('div', 'leaflet-default-icon-path', document.body),
              n = Oi(e, 'background-image') || Oi(e, 'backgroundImage');
            if ((document.body.removeChild(e), (n = this._stripUrl(n)), n))
              return n;
            var s = document.querySelector('link[href$="leaflet.css"]');
            return s ? s.href.substring(0, s.href.length - 11 - 1) : '';
          },
        }),
        ws = ge.extend({
          initialize: function (e) {
            this._marker = e;
          },
          addHooks: function () {
            var e = this._marker._icon;
            this._draggable || (this._draggable = new Ae(e, e, !0)),
              this._draggable
                .on(
                  {
                    dragstart: this._onDragStart,
                    predrag: this._onPreDrag,
                    drag: this._onDrag,
                    dragend: this._onDragEnd,
                  },
                  this
                )
                .enable(),
              dt(e, 'leaflet-marker-draggable');
          },
          removeHooks: function () {
            this._draggable
              .off(
                {
                  dragstart: this._onDragStart,
                  predrag: this._onPreDrag,
                  drag: this._onDrag,
                  dragend: this._onDragEnd,
                },
                this
              )
              .disable(),
              this._marker._icon &&
                St(this._marker._icon, 'leaflet-marker-draggable');
          },
          moved: function () {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function (e) {
            var n = this._marker,
              s = n._map,
              h = this._marker.options.autoPanSpeed,
              f = this._marker.options.autoPanPadding,
              m = Ve(n._icon),
              x = s.getPixelBounds(),
              z = s.getPixelOrigin(),
              G = X(x.min._subtract(z).add(f), x.max._subtract(z).subtract(f));
            if (!G.contains(m)) {
              var j = E(
                (Math.max(G.max.x, m.x) - G.max.x) / (x.max.x - G.max.x) -
                  (Math.min(G.min.x, m.x) - G.min.x) / (x.min.x - G.min.x),
                (Math.max(G.max.y, m.y) - G.max.y) / (x.max.y - G.max.y) -
                  (Math.min(G.min.y, m.y) - G.min.y) / (x.min.y - G.min.y)
              ).multiplyBy(h);
              s.panBy(j, { animate: !1 }),
                this._draggable._newPos._add(j),
                this._draggable._startPos._add(j),
                Dt(n._icon, this._draggable._newPos),
                this._onDrag(e),
                (this._panRequest = _(this._adjustPan.bind(this, e)));
            }
          },
          _onDragStart: function () {
            (this._oldLatLng = this._marker.getLatLng()),
              this._marker.closePopup && this._marker.closePopup(),
              this._marker.fire('movestart').fire('dragstart');
          },
          _onPreDrag: function (e) {
            this._marker.options.autoPan &&
              (v(this._panRequest),
              (this._panRequest = _(this._adjustPan.bind(this, e))));
          },
          _onDrag: function (e) {
            var n = this._marker,
              s = n._shadow,
              h = Ve(n._icon),
              f = n._map.layerPointToLatLng(h);
            s && Dt(s, h),
              (n._latlng = f),
              (e.latlng = f),
              (e.oldLatLng = this._oldLatLng),
              n.fire('move', e).fire('drag', e);
          },
          _onDragEnd: function (e) {
            v(this._panRequest),
              delete this._oldLatLng,
              this._marker.fire('moveend').fire('dragend', e);
          },
        }),
        Mr = ae.extend({
          options: {
            icon: new qi(),
            interactive: !0,
            keyboard: !0,
            title: '',
            alt: 'Marker',
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: 'markerPane',
            shadowPane: 'shadowPane',
            bubblingMouseEvents: !1,
            autoPanOnFocus: !0,
            draggable: !1,
            autoPan: !1,
            autoPanPadding: [50, 50],
            autoPanSpeed: 10,
          },
          initialize: function (e, n) {
            O(this, n), (this._latlng = ot(e));
          },
          onAdd: function (e) {
            (this._zoomAnimated =
              this._zoomAnimated && e.options.markerZoomAnimation),
              this._zoomAnimated && e.on('zoomanim', this._animateZoom, this),
              this._initIcon(),
              this.update();
          },
          onRemove: function (e) {
            this.dragging &&
              this.dragging.enabled() &&
              ((this.options.draggable = !0), this.dragging.removeHooks()),
              delete this.dragging,
              this._zoomAnimated && e.off('zoomanim', this._animateZoom, this),
              this._removeIcon(),
              this._removeShadow();
          },
          getEvents: function () {
            return { zoom: this.update, viewreset: this.update };
          },
          getLatLng: function () {
            return this._latlng;
          },
          setLatLng: function (e) {
            var n = this._latlng;
            return (
              (this._latlng = ot(e)),
              this.update(),
              this.fire('move', { oldLatLng: n, latlng: this._latlng })
            );
          },
          setZIndexOffset: function (e) {
            return (this.options.zIndexOffset = e), this.update();
          },
          getIcon: function () {
            return this.options.icon;
          },
          setIcon: function (e) {
            return (
              (this.options.icon = e),
              this._map && (this._initIcon(), this.update()),
              this._popup && this.bindPopup(this._popup, this._popup.options),
              this
            );
          },
          getElement: function () {
            return this._icon;
          },
          update: function () {
            if (this._icon && this._map) {
              var e = this._map.latLngToLayerPoint(this._latlng).round();
              this._setPos(e);
            }
            return this;
          },
          _initIcon: function () {
            var e = this.options,
              n = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'),
              s = e.icon.createIcon(this._icon),
              h = !1;
            s !== this._icon &&
              (this._icon && this._removeIcon(),
              (h = !0),
              e.title && (s.title = e.title),
              s.tagName === 'IMG' && (s.alt = e.alt || '')),
              dt(s, n),
              e.keyboard &&
                ((s.tabIndex = '0'), s.setAttribute('role', 'button')),
              (this._icon = s),
              e.riseOnHover &&
                this.on({
                  mouseover: this._bringToFront,
                  mouseout: this._resetZIndex,
                }),
              this.options.autoPanOnFocus &&
                ft(s, 'focus', this._panOnFocus, this);
            var f = e.icon.createShadow(this._shadow),
              m = !1;
            f !== this._shadow && (this._removeShadow(), (m = !0)),
              f && (dt(f, n), (f.alt = '')),
              (this._shadow = f),
              e.opacity < 1 && this._updateOpacity(),
              h && this.getPane().appendChild(this._icon),
              this._initInteraction(),
              f && m && this.getPane(e.shadowPane).appendChild(this._shadow);
          },
          _removeIcon: function () {
            this.options.riseOnHover &&
              this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex,
              }),
              this.options.autoPanOnFocus &&
                xt(this._icon, 'focus', this._panOnFocus, this),
              Ct(this._icon),
              this.removeInteractiveTarget(this._icon),
              (this._icon = null);
          },
          _removeShadow: function () {
            this._shadow && Ct(this._shadow), (this._shadow = null);
          },
          _setPos: function (e) {
            this._icon && Dt(this._icon, e),
              this._shadow && Dt(this._shadow, e),
              (this._zIndex = e.y + this.options.zIndexOffset),
              this._resetZIndex();
          },
          _updateZIndex: function (e) {
            this._icon && (this._icon.style.zIndex = this._zIndex + e);
          },
          _animateZoom: function (e) {
            var n = this._map
              ._latLngToNewLayerPoint(this._latlng, e.zoom, e.center)
              .round();
            this._setPos(n);
          },
          _initInteraction: function () {
            if (
              this.options.interactive &&
              (dt(this._icon, 'leaflet-interactive'),
              this.addInteractiveTarget(this._icon),
              ws)
            ) {
              var e = this.options.draggable;
              this.dragging &&
                ((e = this.dragging.enabled()), this.dragging.disable()),
                (this.dragging = new ws(this)),
                e && this.dragging.enable();
            }
          },
          setOpacity: function (e) {
            return (
              (this.options.opacity = e),
              this._map && this._updateOpacity(),
              this
            );
          },
          _updateOpacity: function () {
            var e = this.options.opacity;
            this._icon && Yt(this._icon, e),
              this._shadow && Yt(this._shadow, e);
          },
          _bringToFront: function () {
            this._updateZIndex(this.options.riseOffset);
          },
          _resetZIndex: function () {
            this._updateZIndex(0);
          },
          _panOnFocus: function () {
            var e = this._map;
            if (e) {
              var n = this.options.icon.options,
                s = n.iconSize ? E(n.iconSize) : E(0, 0),
                h = n.iconAnchor ? E(n.iconAnchor) : E(0, 0);
              e.panInside(this._latlng, {
                paddingTopLeft: h,
                paddingBottomRight: s.subtract(h),
              });
            }
          },
          _getPopupAnchor: function () {
            return this.options.icon.options.popupAnchor;
          },
          _getTooltipAnchor: function () {
            return this.options.icon.options.tooltipAnchor;
          },
        });
      function Sd(e, n) {
        return new Mr(e, n);
      }
      var De = ae.extend({
          options: {
            stroke: !0,
            color: '#3388ff',
            weight: 3,
            opacity: 1,
            lineCap: 'round',
            lineJoin: 'round',
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: 0.2,
            fillRule: 'evenodd',
            interactive: !0,
            bubblingMouseEvents: !0,
          },
          beforeAdd: function (e) {
            this._renderer = e.getRenderer(this);
          },
          onAdd: function () {
            this._renderer._initPath(this),
              this._reset(),
              this._renderer._addPath(this);
          },
          onRemove: function () {
            this._renderer._removePath(this);
          },
          redraw: function () {
            return this._map && this._renderer._updatePath(this), this;
          },
          setStyle: function (e) {
            return (
              O(this, e),
              this._renderer &&
                (this._renderer._updateStyle(this),
                this.options.stroke &&
                  e &&
                  Object.prototype.hasOwnProperty.call(e, 'weight') &&
                  this._updateBounds()),
              this
            );
          },
          bringToFront: function () {
            return this._renderer && this._renderer._bringToFront(this), this;
          },
          bringToBack: function () {
            return this._renderer && this._renderer._bringToBack(this), this;
          },
          getElement: function () {
            return this._path;
          },
          _reset: function () {
            this._project(), this._update();
          },
          _clickTolerance: function () {
            return (
              (this.options.stroke ? this.options.weight / 2 : 0) +
              (this._renderer.options.tolerance || 0)
            );
          },
        }),
        Cr = De.extend({
          options: { fill: !0, radius: 10 },
          initialize: function (e, n) {
            O(this, n),
              (this._latlng = ot(e)),
              (this._radius = this.options.radius);
          },
          setLatLng: function (e) {
            var n = this._latlng;
            return (
              (this._latlng = ot(e)),
              this.redraw(),
              this.fire('move', { oldLatLng: n, latlng: this._latlng })
            );
          },
          getLatLng: function () {
            return this._latlng;
          },
          setRadius: function (e) {
            return (this.options.radius = this._radius = e), this.redraw();
          },
          getRadius: function () {
            return this._radius;
          },
          setStyle: function (e) {
            var n = (e && e.radius) || this._radius;
            return De.prototype.setStyle.call(this, e), this.setRadius(n), this;
          },
          _project: function () {
            (this._point = this._map.latLngToLayerPoint(this._latlng)),
              this._updateBounds();
          },
          _updateBounds: function () {
            var e = this._radius,
              n = this._radiusY || e,
              s = this._clickTolerance(),
              h = [e + s, n + s];
            this._pxBounds = new F(this._point.subtract(h), this._point.add(h));
          },
          _update: function () {
            this._map && this._updatePath();
          },
          _updatePath: function () {
            this._renderer._updateCircle(this);
          },
          _empty: function () {
            return (
              this._radius && !this._renderer._bounds.intersects(this._pxBounds)
            );
          },
          _containsPoint: function (e) {
            return (
              e.distanceTo(this._point) <= this._radius + this._clickTolerance()
            );
          },
        });
      function Td(e, n) {
        return new Cr(e, n);
      }
      var In = Cr.extend({
        initialize: function (e, n, s) {
          if (
            (typeof n == 'number' && (n = r({}, s, { radius: n })),
            O(this, n),
            (this._latlng = ot(e)),
            isNaN(this.options.radius))
          )
            throw new Error('Circle radius cannot be NaN');
          this._mRadius = this.options.radius;
        },
        setRadius: function (e) {
          return (this._mRadius = e), this.redraw();
        },
        getRadius: function () {
          return this._mRadius;
        },
        getBounds: function () {
          var e = [this._radius, this._radiusY || this._radius];
          return new J(
            this._map.layerPointToLatLng(this._point.subtract(e)),
            this._map.layerPointToLatLng(this._point.add(e))
          );
        },
        setStyle: De.prototype.setStyle,
        _project: function () {
          var e = this._latlng.lng,
            n = this._latlng.lat,
            s = this._map,
            h = s.options.crs;
          if (h.distance === ut.distance) {
            var f = Math.PI / 180,
              m = this._mRadius / ut.R / f,
              x = s.project([n + m, e]),
              z = s.project([n - m, e]),
              G = x.add(z).divideBy(2),
              j = s.unproject(G).lat,
              Q =
                Math.acos(
                  (Math.cos(m * f) - Math.sin(n * f) * Math.sin(j * f)) /
                    (Math.cos(n * f) * Math.cos(j * f))
                ) / f;
            (isNaN(Q) || Q === 0) && (Q = m / Math.cos((Math.PI / 180) * n)),
              (this._point = G.subtract(s.getPixelOrigin())),
              (this._radius = isNaN(Q) ? 0 : G.x - s.project([j, e - Q]).x),
              (this._radiusY = G.y - x.y);
          } else {
            var ht = h.unproject(
              h.project(this._latlng).subtract([this._mRadius, 0])
            );
            (this._point = s.latLngToLayerPoint(this._latlng)),
              (this._radius = this._point.x - s.latLngToLayerPoint(ht).x);
          }
          this._updateBounds();
        },
      });
      function Bd(e, n, s) {
        return new In(e, n, s);
      }
      var ke = De.extend({
        options: { smoothFactor: 1, noClip: !1 },
        initialize: function (e, n) {
          O(this, n), this._setLatLngs(e);
        },
        getLatLngs: function () {
          return this._latlngs;
        },
        setLatLngs: function (e) {
          return this._setLatLngs(e), this.redraw();
        },
        isEmpty: function () {
          return !this._latlngs.length;
        },
        closestLayerPoint: function (e) {
          for (
            var n = 1 / 0,
              s = null,
              h = Fi,
              f,
              m,
              x = 0,
              z = this._parts.length;
            x < z;
            x++
          )
            for (var G = this._parts[x], j = 1, Q = G.length; j < Q; j++) {
              (f = G[j - 1]), (m = G[j]);
              var ht = h(e, f, m, !0);
              ht < n && ((n = ht), (s = h(e, f, m)));
            }
          return s && (s.distance = Math.sqrt(n)), s;
        },
        getCenter: function () {
          if (!this._map)
            throw new Error('Must add layer to map before using getCenter()');
          return ys(this._defaultShape(), this._map.options.crs);
        },
        getBounds: function () {
          return this._bounds;
        },
        addLatLng: function (e, n) {
          return (
            (n = n || this._defaultShape()),
            (e = ot(e)),
            n.push(e),
            this._bounds.extend(e),
            this.redraw()
          );
        },
        _setLatLngs: function (e) {
          (this._bounds = new J()), (this._latlngs = this._convertLatLngs(e));
        },
        _defaultShape: function () {
          return Xt(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        _convertLatLngs: function (e) {
          for (var n = [], s = Xt(e), h = 0, f = e.length; h < f; h++)
            s
              ? ((n[h] = ot(e[h])), this._bounds.extend(n[h]))
              : (n[h] = this._convertLatLngs(e[h]));
          return n;
        },
        _project: function () {
          var e = new F();
          (this._rings = []),
            this._projectLatlngs(this._latlngs, this._rings, e),
            this._bounds.isValid() &&
              e.isValid() &&
              ((this._rawPxBounds = e), this._updateBounds());
        },
        _updateBounds: function () {
          var e = this._clickTolerance(),
            n = new k(e, e);
          this._rawPxBounds &&
            (this._pxBounds = new F([
              this._rawPxBounds.min.subtract(n),
              this._rawPxBounds.max.add(n),
            ]));
        },
        _projectLatlngs: function (e, n, s) {
          var h = e[0] instanceof et,
            f = e.length,
            m,
            x;
          if (h) {
            for (x = [], m = 0; m < f; m++)
              (x[m] = this._map.latLngToLayerPoint(e[m])), s.extend(x[m]);
            n.push(x);
          } else for (m = 0; m < f; m++) this._projectLatlngs(e[m], n, s);
        },
        _clipPoints: function () {
          var e = this._renderer._bounds;
          if (
            ((this._parts = []),
            !(!this._pxBounds || !this._pxBounds.intersects(e)))
          ) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var n = this._parts,
              s,
              h,
              f,
              m,
              x,
              z,
              G;
            for (s = 0, f = 0, m = this._rings.length; s < m; s++)
              for (G = this._rings[s], h = 0, x = G.length; h < x - 1; h++)
                (z = gs(G[h], G[h + 1], e, h, !0)),
                  z &&
                    ((n[f] = n[f] || []),
                    n[f].push(z[0]),
                    (z[1] !== G[h + 1] || h === x - 2) &&
                      (n[f].push(z[1]), f++));
          }
        },
        _simplifyPoints: function () {
          for (
            var e = this._parts,
              n = this.options.smoothFactor,
              s = 0,
              h = e.length;
            s < h;
            s++
          )
            e[s] = ds(e[s], n);
        },
        _update: function () {
          this._map &&
            (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function () {
          this._renderer._updatePoly(this);
        },
        _containsPoint: function (e, n) {
          var s,
            h,
            f,
            m,
            x,
            z,
            G = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (s = 0, m = this._parts.length; s < m; s++)
            for (
              z = this._parts[s], h = 0, x = z.length, f = x - 1;
              h < x;
              f = h++
            )
              if (!(!n && h === 0) && ps(e, z[f], z[h]) <= G) return !0;
          return !1;
        },
      });
      function Ad(e, n) {
        return new ke(e, n);
      }
      ke._flat = _s;
      var ci = ke.extend({
        options: { fill: !0 },
        isEmpty: function () {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        getCenter: function () {
          if (!this._map)
            throw new Error('Must add layer to map before using getCenter()');
          return Ls(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function (e) {
          var n = ke.prototype._convertLatLngs.call(this, e),
            s = n.length;
          return (
            s >= 2 && n[0] instanceof et && n[0].equals(n[s - 1]) && n.pop(), n
          );
        },
        _setLatLngs: function (e) {
          ke.prototype._setLatLngs.call(this, e),
            Xt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function () {
          return Xt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function () {
          var e = this._renderer._bounds,
            n = this.options.weight,
            s = new k(n, n);
          if (
            ((e = new F(e.min.subtract(s), e.max.add(s))),
            (this._parts = []),
            !(!this._pxBounds || !this._pxBounds.intersects(e)))
          ) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var h = 0, f = this._rings.length, m; h < f; h++)
              (m = vs(this._rings[h], e, !0)), m.length && this._parts.push(m);
          }
        },
        _updatePath: function () {
          this._renderer._updatePoly(this, !0);
        },
        _containsPoint: function (e) {
          var n = !1,
            s,
            h,
            f,
            m,
            x,
            z,
            G,
            j;
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (m = 0, G = this._parts.length; m < G; m++)
            for (
              s = this._parts[m], x = 0, j = s.length, z = j - 1;
              x < j;
              z = x++
            )
              (h = s[x]),
                (f = s[z]),
                h.y > e.y != f.y > e.y &&
                  e.x < ((f.x - h.x) * (e.y - h.y)) / (f.y - h.y) + h.x &&
                  (n = !n);
          return n || ke.prototype._containsPoint.call(this, e, !0);
        },
      });
      function Dd(e, n) {
        return new ci(e, n);
      }
      var Me = xe.extend({
        initialize: function (e, n) {
          O(this, n), (this._layers = {}), e && this.addData(e);
        },
        addData: function (e) {
          var n = B(e) ? e : e.features,
            s,
            h,
            f;
          if (n) {
            for (s = 0, h = n.length; s < h; s++)
              (f = n[s]),
                (f.geometries || f.geometry || f.features || f.coordinates) &&
                  this.addData(f);
            return this;
          }
          var m = this.options;
          if (m.filter && !m.filter(e)) return this;
          var x = Pr(e, m);
          return x
            ? ((x.feature = Tr(e)),
              (x.defaultOptions = x.options),
              this.resetStyle(x),
              m.onEachFeature && m.onEachFeature(e, x),
              this.addLayer(x))
            : this;
        },
        resetStyle: function (e) {
          return e === void 0
            ? this.eachLayer(this.resetStyle, this)
            : ((e.options = r({}, e.defaultOptions)),
              this._setLayerStyle(e, this.options.style),
              this);
        },
        setStyle: function (e) {
          return this.eachLayer(function (n) {
            this._setLayerStyle(n, e);
          }, this);
        },
        _setLayerStyle: function (e, n) {
          e.setStyle &&
            (typeof n == 'function' && (n = n(e.feature)), e.setStyle(n));
        },
      });
      function Pr(e, n) {
        var s = e.type === 'Feature' ? e.geometry : e,
          h = s ? s.coordinates : null,
          f = [],
          m = n && n.pointToLayer,
          x = (n && n.coordsToLatLng) || zn,
          z,
          G,
          j,
          Q;
        if (!h && !s) return null;
        switch (s.type) {
          case 'Point':
            return (z = x(h)), xs(m, e, z, n);
          case 'MultiPoint':
            for (j = 0, Q = h.length; j < Q; j++)
              (z = x(h[j])), f.push(xs(m, e, z, n));
            return new xe(f);
          case 'LineString':
          case 'MultiLineString':
            return (
              (G = Er(h, s.type === 'LineString' ? 0 : 1, x)), new ke(G, n)
            );
          case 'Polygon':
          case 'MultiPolygon':
            return (G = Er(h, s.type === 'Polygon' ? 1 : 2, x)), new ci(G, n);
          case 'GeometryCollection':
            for (j = 0, Q = s.geometries.length; j < Q; j++) {
              var ht = Pr(
                {
                  geometry: s.geometries[j],
                  type: 'Feature',
                  properties: e.properties,
                },
                n
              );
              ht && f.push(ht);
            }
            return new xe(f);
          case 'FeatureCollection':
            for (j = 0, Q = s.features.length; j < Q; j++) {
              var mt = Pr(s.features[j], n);
              mt && f.push(mt);
            }
            return new xe(f);
          default:
            throw new Error('Invalid GeoJSON object.');
        }
      }
      function xs(e, n, s, h) {
        return e ? e(n, s) : new Mr(s, h && h.markersInheritOptions && h);
      }
      function zn(e) {
        return new et(e[1], e[0], e[2]);
      }
      function Er(e, n, s) {
        for (var h = [], f = 0, m = e.length, x; f < m; f++)
          (x = n ? Er(e[f], n - 1, s) : (s || zn)(e[f])), h.push(x);
        return h;
      }
      function Nn(e, n) {
        return (
          (e = ot(e)),
          e.alt !== void 0
            ? [y(e.lng, n), y(e.lat, n), y(e.alt, n)]
            : [y(e.lng, n), y(e.lat, n)]
        );
      }
      function Sr(e, n, s, h) {
        for (var f = [], m = 0, x = e.length; m < x; m++)
          f.push(n ? Sr(e[m], Xt(e[m]) ? 0 : n - 1, s, h) : Nn(e[m], h));
        return !n && s && f.push(f[0].slice()), f;
      }
      function fi(e, n) {
        return e.feature ? r({}, e.feature, { geometry: n }) : Tr(n);
      }
      function Tr(e) {
        return e.type === 'Feature' || e.type === 'FeatureCollection'
          ? e
          : { type: 'Feature', properties: {}, geometry: e };
      }
      var Gn = {
        toGeoJSON: function (e) {
          return fi(this, {
            type: 'Point',
            coordinates: Nn(this.getLatLng(), e),
          });
        },
      };
      Mr.include(Gn),
        In.include(Gn),
        Cr.include(Gn),
        ke.include({
          toGeoJSON: function (e) {
            var n = !Xt(this._latlngs),
              s = Sr(this._latlngs, n ? 1 : 0, !1, e);
            return fi(this, {
              type: (n ? 'Multi' : '') + 'LineString',
              coordinates: s,
            });
          },
        }),
        ci.include({
          toGeoJSON: function (e) {
            var n = !Xt(this._latlngs),
              s = n && !Xt(this._latlngs[0]),
              h = Sr(this._latlngs, s ? 2 : n ? 1 : 0, !0, e);
            return (
              n || (h = [h]),
              fi(this, { type: (s ? 'Multi' : '') + 'Polygon', coordinates: h })
            );
          },
        }),
        hi.include({
          toMultiPoint: function (e) {
            var n = [];
            return (
              this.eachLayer(function (s) {
                n.push(s.toGeoJSON(e).geometry.coordinates);
              }),
              fi(this, { type: 'MultiPoint', coordinates: n })
            );
          },
          toGeoJSON: function (e) {
            var n =
              this.feature &&
              this.feature.geometry &&
              this.feature.geometry.type;
            if (n === 'MultiPoint') return this.toMultiPoint(e);
            var s = n === 'GeometryCollection',
              h = [];
            return (
              this.eachLayer(function (f) {
                if (f.toGeoJSON) {
                  var m = f.toGeoJSON(e);
                  if (s) h.push(m.geometry);
                  else {
                    var x = Tr(m);
                    x.type === 'FeatureCollection'
                      ? h.push.apply(h, x.features)
                      : h.push(x);
                  }
                }
              }),
              s
                ? fi(this, { geometries: h, type: 'GeometryCollection' })
                : { type: 'FeatureCollection', features: h }
            );
          },
        });
      function ks(e, n) {
        return new Me(e, n);
      }
      var Od = ks,
        Br = ae.extend({
          options: {
            opacity: 1,
            alt: '',
            interactive: !1,
            crossOrigin: !1,
            errorOverlayUrl: '',
            zIndex: 1,
            className: '',
          },
          initialize: function (e, n, s) {
            (this._url = e), (this._bounds = it(n)), O(this, s);
          },
          onAdd: function () {
            this._image ||
              (this._initImage(),
              this.options.opacity < 1 && this._updateOpacity()),
              this.options.interactive &&
                (dt(this._image, 'leaflet-interactive'),
                this.addInteractiveTarget(this._image)),
              this.getPane().appendChild(this._image),
              this._reset();
          },
          onRemove: function () {
            Ct(this._image),
              this.options.interactive &&
                this.removeInteractiveTarget(this._image);
          },
          setOpacity: function (e) {
            return (
              (this.options.opacity = e),
              this._image && this._updateOpacity(),
              this
            );
          },
          setStyle: function (e) {
            return e.opacity && this.setOpacity(e.opacity), this;
          },
          bringToFront: function () {
            return this._map && ai(this._image), this;
          },
          bringToBack: function () {
            return this._map && li(this._image), this;
          },
          setUrl: function (e) {
            return (this._url = e), this._image && (this._image.src = e), this;
          },
          setBounds: function (e) {
            return (this._bounds = it(e)), this._map && this._reset(), this;
          },
          getEvents: function () {
            var e = { zoom: this._reset, viewreset: this._reset };
            return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
          },
          setZIndex: function (e) {
            return (this.options.zIndex = e), this._updateZIndex(), this;
          },
          getBounds: function () {
            return this._bounds;
          },
          getElement: function () {
            return this._image;
          },
          _initImage: function () {
            var e = this._url.tagName === 'IMG',
              n = (this._image = e ? this._url : _t('img'));
            if (
              (dt(n, 'leaflet-image-layer'),
              this._zoomAnimated && dt(n, 'leaflet-zoom-animated'),
              this.options.className && dt(n, this.options.className),
              (n.onselectstart = p),
              (n.onmousemove = p),
              (n.onload = a(this.fire, this, 'load')),
              (n.onerror = a(this._overlayOnError, this, 'error')),
              (this.options.crossOrigin || this.options.crossOrigin === '') &&
                (n.crossOrigin =
                  this.options.crossOrigin === !0
                    ? ''
                    : this.options.crossOrigin),
              this.options.zIndex && this._updateZIndex(),
              e)
            ) {
              this._url = n.src;
              return;
            }
            (n.src = this._url), (n.alt = this.options.alt);
          },
          _animateZoom: function (e) {
            var n = this._map.getZoomScale(e.zoom),
              s = this._map._latLngBoundsToNewLayerBounds(
                this._bounds,
                e.zoom,
                e.center
              ).min;
            Ue(this._image, s, n);
          },
          _reset: function () {
            var e = this._image,
              n = new F(
                this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                this._map.latLngToLayerPoint(this._bounds.getSouthEast())
              ),
              s = n.getSize();
            Dt(e, n.min),
              (e.style.width = s.x + 'px'),
              (e.style.height = s.y + 'px');
          },
          _updateOpacity: function () {
            Yt(this._image, this.options.opacity);
          },
          _updateZIndex: function () {
            this._image &&
              this.options.zIndex !== void 0 &&
              this.options.zIndex !== null &&
              (this._image.style.zIndex = this.options.zIndex);
          },
          _overlayOnError: function () {
            this.fire('error');
            var e = this.options.errorOverlayUrl;
            e && this._url !== e && ((this._url = e), (this._image.src = e));
          },
          getCenter: function () {
            return this._bounds.getCenter();
          },
        }),
        Rd = function (e, n, s) {
          return new Br(e, n, s);
        },
        Ms = Br.extend({
          options: {
            autoplay: !0,
            loop: !0,
            keepAspectRatio: !0,
            muted: !1,
            playsInline: !0,
          },
          _initImage: function () {
            var e = this._url.tagName === 'VIDEO',
              n = (this._image = e ? this._url : _t('video'));
            if (
              (dt(n, 'leaflet-image-layer'),
              this._zoomAnimated && dt(n, 'leaflet-zoom-animated'),
              this.options.className && dt(n, this.options.className),
              (n.onselectstart = p),
              (n.onmousemove = p),
              (n.onloadeddata = a(this.fire, this, 'load')),
              e)
            ) {
              for (
                var s = n.getElementsByTagName('source'), h = [], f = 0;
                f < s.length;
                f++
              )
                h.push(s[f].src);
              this._url = s.length > 0 ? h : [n.src];
              return;
            }
            B(this._url) || (this._url = [this._url]),
              !this.options.keepAspectRatio &&
                Object.prototype.hasOwnProperty.call(n.style, 'objectFit') &&
                (n.style.objectFit = 'fill'),
              (n.autoplay = !!this.options.autoplay),
              (n.loop = !!this.options.loop),
              (n.muted = !!this.options.muted),
              (n.playsInline = !!this.options.playsInline);
            for (var m = 0; m < this._url.length; m++) {
              var x = _t('source');
              (x.src = this._url[m]), n.appendChild(x);
            }
          },
        });
      function Id(e, n, s) {
        return new Ms(e, n, s);
      }
      var Cs = Br.extend({
        _initImage: function () {
          var e = (this._image = this._url);
          dt(e, 'leaflet-image-layer'),
            this._zoomAnimated && dt(e, 'leaflet-zoom-animated'),
            this.options.className && dt(e, this.options.className),
            (e.onselectstart = p),
            (e.onmousemove = p);
        },
      });
      function zd(e, n, s) {
        return new Cs(e, n, s);
      }
      var _e = ae.extend({
        options: {
          interactive: !1,
          offset: [0, 0],
          className: '',
          pane: void 0,
          content: '',
        },
        initialize: function (e, n) {
          e && (e instanceof et || B(e))
            ? ((this._latlng = ot(e)), O(this, n))
            : (O(this, e), (this._source = n)),
            this.options.content && (this._content = this.options.content);
        },
        openOn: function (e) {
          return (
            (e = arguments.length ? e : this._source._map),
            e.hasLayer(this) || e.addLayer(this),
            this
          );
        },
        close: function () {
          return this._map && this._map.removeLayer(this), this;
        },
        toggle: function (e) {
          return (
            this._map
              ? this.close()
              : (arguments.length ? (this._source = e) : (e = this._source),
                this._prepareOpen(),
                this.openOn(e._map)),
            this
          );
        },
        onAdd: function (e) {
          (this._zoomAnimated = e._zoomAnimated),
            this._container || this._initLayout(),
            e._fadeAnimated && Yt(this._container, 0),
            clearTimeout(this._removeTimeout),
            this.getPane().appendChild(this._container),
            this.update(),
            e._fadeAnimated && Yt(this._container, 1),
            this.bringToFront(),
            this.options.interactive &&
              (dt(this._container, 'leaflet-interactive'),
              this.addInteractiveTarget(this._container));
        },
        onRemove: function (e) {
          e._fadeAnimated
            ? (Yt(this._container, 0),
              (this._removeTimeout = setTimeout(
                a(Ct, void 0, this._container),
                200
              )))
            : Ct(this._container),
            this.options.interactive &&
              (St(this._container, 'leaflet-interactive'),
              this.removeInteractiveTarget(this._container));
        },
        getLatLng: function () {
          return this._latlng;
        },
        setLatLng: function (e) {
          return (
            (this._latlng = ot(e)),
            this._map && (this._updatePosition(), this._adjustPan()),
            this
          );
        },
        getContent: function () {
          return this._content;
        },
        setContent: function (e) {
          return (this._content = e), this.update(), this;
        },
        getElement: function () {
          return this._container;
        },
        update: function () {
          this._map &&
            ((this._container.style.visibility = 'hidden'),
            this._updateContent(),
            this._updateLayout(),
            this._updatePosition(),
            (this._container.style.visibility = ''),
            this._adjustPan());
        },
        getEvents: function () {
          var e = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition,
          };
          return this._zoomAnimated && (e.zoomanim = this._animateZoom), e;
        },
        isOpen: function () {
          return !!this._map && this._map.hasLayer(this);
        },
        bringToFront: function () {
          return this._map && ai(this._container), this;
        },
        bringToBack: function () {
          return this._map && li(this._container), this;
        },
        _prepareOpen: function (e) {
          var n = this._source;
          if (!n._map) return !1;
          if (n instanceof xe) {
            n = null;
            var s = this._source._layers;
            for (var h in s)
              if (s[h]._map) {
                n = s[h];
                break;
              }
            if (!n) return !1;
            this._source = n;
          }
          if (!e)
            if (n.getCenter) e = n.getCenter();
            else if (n.getLatLng) e = n.getLatLng();
            else if (n.getBounds) e = n.getBounds().getCenter();
            else throw new Error('Unable to get source layer LatLng.');
          return this.setLatLng(e), this._map && this.update(), !0;
        },
        _updateContent: function () {
          if (this._content) {
            var e = this._contentNode,
              n =
                typeof this._content == 'function'
                  ? this._content(this._source || this)
                  : this._content;
            if (typeof n == 'string') e.innerHTML = n;
            else {
              for (; e.hasChildNodes(); ) e.removeChild(e.firstChild);
              e.appendChild(n);
            }
            this.fire('contentupdate');
          }
        },
        _updatePosition: function () {
          if (this._map) {
            var e = this._map.latLngToLayerPoint(this._latlng),
              n = E(this.options.offset),
              s = this._getAnchor();
            this._zoomAnimated
              ? Dt(this._container, e.add(s))
              : (n = n.add(e).add(s));
            var h = (this._containerBottom = -n.y),
              f = (this._containerLeft =
                -Math.round(this._containerWidth / 2) + n.x);
            (this._container.style.bottom = h + 'px'),
              (this._container.style.left = f + 'px');
          }
        },
        _getAnchor: function () {
          return [0, 0];
        },
      });
      gt.include({
        _initOverlay: function (e, n, s, h) {
          var f = n;
          return (
            f instanceof e || (f = new e(h).setContent(n)),
            s && f.setLatLng(s),
            f
          );
        },
      }),
        ae.include({
          _initOverlay: function (e, n, s, h) {
            var f = s;
            return (
              f instanceof e
                ? (O(f, h), (f._source = this))
                : ((f = n && !h ? n : new e(h, this)), f.setContent(s)),
              f
            );
          },
        });
      var Ar = _e.extend({
          options: {
            pane: 'popupPane',
            offset: [0, 7],
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            closeOnEscapeKey: !0,
            className: '',
          },
          openOn: function (e) {
            return (
              (e = arguments.length ? e : this._source._map),
              !e.hasLayer(this) &&
                e._popup &&
                e._popup.options.autoClose &&
                e.removeLayer(e._popup),
              (e._popup = this),
              _e.prototype.openOn.call(this, e)
            );
          },
          onAdd: function (e) {
            _e.prototype.onAdd.call(this, e),
              e.fire('popupopen', { popup: this }),
              this._source &&
                (this._source.fire('popupopen', { popup: this }, !0),
                this._source instanceof De || this._source.on('preclick', He));
          },
          onRemove: function (e) {
            _e.prototype.onRemove.call(this, e),
              e.fire('popupclose', { popup: this }),
              this._source &&
                (this._source.fire('popupclose', { popup: this }, !0),
                this._source instanceof De || this._source.off('preclick', He));
          },
          getEvents: function () {
            var e = _e.prototype.getEvents.call(this);
            return (
              (this.options.closeOnClick !== void 0
                ? this.options.closeOnClick
                : this._map.options.closePopupOnClick) &&
                (e.preclick = this.close),
              this.options.keepInView && (e.moveend = this._adjustPan),
              e
            );
          },
          _initLayout: function () {
            var e = 'leaflet-popup',
              n = (this._container = _t(
                'div',
                e +
                  ' ' +
                  (this.options.className || '') +
                  ' leaflet-zoom-animated'
              )),
              s = (this._wrapper = _t('div', e + '-content-wrapper', n));
            if (
              ((this._contentNode = _t('div', e + '-content', s)),
              Ni(n),
              Sn(this._contentNode),
              ft(n, 'contextmenu', He),
              (this._tipContainer = _t('div', e + '-tip-container', n)),
              (this._tip = _t('div', e + '-tip', this._tipContainer)),
              this.options.closeButton)
            ) {
              var h = (this._closeButton = _t('a', e + '-close-button', n));
              h.setAttribute('role', 'button'),
                h.setAttribute('aria-label', 'Close popup'),
                (h.href = '#close'),
                (h.innerHTML = '<span aria-hidden="true">&#215;</span>'),
                ft(
                  h,
                  'click',
                  function (f) {
                    Gt(f), this.close();
                  },
                  this
                );
            }
          },
          _updateLayout: function () {
            var e = this._contentNode,
              n = e.style;
            (n.width = ''), (n.whiteSpace = 'nowrap');
            var s = e.offsetWidth;
            (s = Math.min(s, this.options.maxWidth)),
              (s = Math.max(s, this.options.minWidth)),
              (n.width = s + 1 + 'px'),
              (n.whiteSpace = ''),
              (n.height = '');
            var h = e.offsetHeight,
              f = this.options.maxHeight,
              m = 'leaflet-popup-scrolled';
            f && h > f ? ((n.height = f + 'px'), dt(e, m)) : St(e, m),
              (this._containerWidth = this._container.offsetWidth);
          },
          _animateZoom: function (e) {
            var n = this._map._latLngToNewLayerPoint(
                this._latlng,
                e.zoom,
                e.center
              ),
              s = this._getAnchor();
            Dt(this._container, n.add(s));
          },
          _adjustPan: function () {
            if (this.options.autoPan) {
              if (
                (this._map._panAnim && this._map._panAnim.stop(),
                this._autopanning)
              ) {
                this._autopanning = !1;
                return;
              }
              var e = this._map,
                n = parseInt(Oi(this._container, 'marginBottom'), 10) || 0,
                s = this._container.offsetHeight + n,
                h = this._containerWidth,
                f = new k(this._containerLeft, -s - this._containerBottom);
              f._add(Ve(this._container));
              var m = e.layerPointToContainerPoint(f),
                x = E(this.options.autoPanPadding),
                z = E(this.options.autoPanPaddingTopLeft || x),
                G = E(this.options.autoPanPaddingBottomRight || x),
                j = e.getSize(),
                Q = 0,
                ht = 0;
              m.x + h + G.x > j.x && (Q = m.x + h - j.x + G.x),
                m.x - Q - z.x < 0 && (Q = m.x - z.x),
                m.y + s + G.y > j.y && (ht = m.y + s - j.y + G.y),
                m.y - ht - z.y < 0 && (ht = m.y - z.y),
                (Q || ht) &&
                  (this.options.keepInView && (this._autopanning = !0),
                  e.fire('autopanstart').panBy([Q, ht]));
            }
          },
          _getAnchor: function () {
            return E(
              this._source && this._source._getPopupAnchor
                ? this._source._getPopupAnchor()
                : [0, 0]
            );
          },
        }),
        Nd = function (e, n) {
          return new Ar(e, n);
        };
      gt.mergeOptions({ closePopupOnClick: !0 }),
        gt.include({
          openPopup: function (e, n, s) {
            return this._initOverlay(Ar, e, n, s).openOn(this), this;
          },
          closePopup: function (e) {
            return (
              (e = arguments.length ? e : this._popup), e && e.close(), this
            );
          },
        }),
        ae.include({
          bindPopup: function (e, n) {
            return (
              (this._popup = this._initOverlay(Ar, this._popup, e, n)),
              this._popupHandlersAdded ||
                (this.on({
                  click: this._openPopup,
                  keypress: this._onKeyPress,
                  remove: this.closePopup,
                  move: this._movePopup,
                }),
                (this._popupHandlersAdded = !0)),
              this
            );
          },
          unbindPopup: function () {
            return (
              this._popup &&
                (this.off({
                  click: this._openPopup,
                  keypress: this._onKeyPress,
                  remove: this.closePopup,
                  move: this._movePopup,
                }),
                (this._popupHandlersAdded = !1),
                (this._popup = null)),
              this
            );
          },
          openPopup: function (e) {
            return (
              this._popup &&
                (this instanceof xe || (this._popup._source = this),
                this._popup._prepareOpen(e || this._latlng) &&
                  this._popup.openOn(this._map)),
              this
            );
          },
          closePopup: function () {
            return this._popup && this._popup.close(), this;
          },
          togglePopup: function () {
            return this._popup && this._popup.toggle(this), this;
          },
          isPopupOpen: function () {
            return this._popup ? this._popup.isOpen() : !1;
          },
          setPopupContent: function (e) {
            return this._popup && this._popup.setContent(e), this;
          },
          getPopup: function () {
            return this._popup;
          },
          _openPopup: function (e) {
            if (!(!this._popup || !this._map)) {
              je(e);
              var n = e.layer || e.target;
              if (this._popup._source === n && !(n instanceof De)) {
                this._map.hasLayer(this._popup)
                  ? this.closePopup()
                  : this.openPopup(e.latlng);
                return;
              }
              (this._popup._source = n), this.openPopup(e.latlng);
            }
          },
          _movePopup: function (e) {
            this._popup.setLatLng(e.latlng);
          },
          _onKeyPress: function (e) {
            e.originalEvent.keyCode === 13 && this._openPopup(e);
          },
        });
      var Dr = _e.extend({
          options: {
            pane: 'tooltipPane',
            offset: [0, 0],
            direction: 'auto',
            permanent: !1,
            sticky: !1,
            opacity: 0.9,
          },
          onAdd: function (e) {
            _e.prototype.onAdd.call(this, e),
              this.setOpacity(this.options.opacity),
              e.fire('tooltipopen', { tooltip: this }),
              this._source &&
                (this.addEventParent(this._source),
                this._source.fire('tooltipopen', { tooltip: this }, !0));
          },
          onRemove: function (e) {
            _e.prototype.onRemove.call(this, e),
              e.fire('tooltipclose', { tooltip: this }),
              this._source &&
                (this.removeEventParent(this._source),
                this._source.fire('tooltipclose', { tooltip: this }, !0));
          },
          getEvents: function () {
            var e = _e.prototype.getEvents.call(this);
            return this.options.permanent || (e.preclick = this.close), e;
          },
          _initLayout: function () {
            var e = 'leaflet-tooltip',
              n =
                e +
                ' ' +
                (this.options.className || '') +
                ' leaflet-zoom-' +
                (this._zoomAnimated ? 'animated' : 'hide');
            (this._contentNode = this._container = _t('div', n)),
              this._container.setAttribute('role', 'tooltip'),
              this._container.setAttribute('id', 'leaflet-tooltip-' + u(this));
          },
          _updateLayout: function () {},
          _adjustPan: function () {},
          _setPosition: function (e) {
            var n,
              s,
              h = this._map,
              f = this._container,
              m = h.latLngToContainerPoint(h.getCenter()),
              x = h.layerPointToContainerPoint(e),
              z = this.options.direction,
              G = f.offsetWidth,
              j = f.offsetHeight,
              Q = E(this.options.offset),
              ht = this._getAnchor();
            z === 'top'
              ? ((n = G / 2), (s = j))
              : z === 'bottom'
                ? ((n = G / 2), (s = 0))
                : z === 'center'
                  ? ((n = G / 2), (s = j / 2))
                  : z === 'right'
                    ? ((n = 0), (s = j / 2))
                    : z === 'left'
                      ? ((n = G), (s = j / 2))
                      : x.x < m.x
                        ? ((z = 'right'), (n = 0), (s = j / 2))
                        : ((z = 'left'),
                          (n = G + (Q.x + ht.x) * 2),
                          (s = j / 2)),
              (e = e
                .subtract(E(n, s, !0))
                .add(Q)
                .add(ht)),
              St(f, 'leaflet-tooltip-right'),
              St(f, 'leaflet-tooltip-left'),
              St(f, 'leaflet-tooltip-top'),
              St(f, 'leaflet-tooltip-bottom'),
              dt(f, 'leaflet-tooltip-' + z),
              Dt(f, e);
          },
          _updatePosition: function () {
            var e = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(e);
          },
          setOpacity: function (e) {
            (this.options.opacity = e),
              this._container && Yt(this._container, e);
          },
          _animateZoom: function (e) {
            var n = this._map._latLngToNewLayerPoint(
              this._latlng,
              e.zoom,
              e.center
            );
            this._setPosition(n);
          },
          _getAnchor: function () {
            return E(
              this._source &&
                this._source._getTooltipAnchor &&
                !this.options.sticky
                ? this._source._getTooltipAnchor()
                : [0, 0]
            );
          },
        }),
        Gd = function (e, n) {
          return new Dr(e, n);
        };
      gt.include({
        openTooltip: function (e, n, s) {
          return this._initOverlay(Dr, e, n, s).openOn(this), this;
        },
        closeTooltip: function (e) {
          return e.close(), this;
        },
      }),
        ae.include({
          bindTooltip: function (e, n) {
            return (
              this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
              (this._tooltip = this._initOverlay(Dr, this._tooltip, e, n)),
              this._initTooltipInteractions(),
              this._tooltip.options.permanent &&
                this._map &&
                this._map.hasLayer(this) &&
                this.openTooltip(),
              this
            );
          },
          unbindTooltip: function () {
            return (
              this._tooltip &&
                (this._initTooltipInteractions(!0),
                this.closeTooltip(),
                (this._tooltip = null)),
              this
            );
          },
          _initTooltipInteractions: function (e) {
            if (!(!e && this._tooltipHandlersAdded)) {
              var n = e ? 'off' : 'on',
                s = { remove: this.closeTooltip, move: this._moveTooltip };
              this._tooltip.options.permanent
                ? (s.add = this._openTooltip)
                : ((s.mouseover = this._openTooltip),
                  (s.mouseout = this.closeTooltip),
                  (s.click = this._openTooltip),
                  this._map
                    ? this._addFocusListeners()
                    : (s.add = this._addFocusListeners)),
                this._tooltip.options.sticky &&
                  (s.mousemove = this._moveTooltip),
                this[n](s),
                (this._tooltipHandlersAdded = !e);
            }
          },
          openTooltip: function (e) {
            return (
              this._tooltip &&
                (this instanceof xe || (this._tooltip._source = this),
                this._tooltip._prepareOpen(e) &&
                  (this._tooltip.openOn(this._map),
                  this.getElement
                    ? this._setAriaDescribedByOnLayer(this)
                    : this.eachLayer &&
                      this.eachLayer(this._setAriaDescribedByOnLayer, this))),
              this
            );
          },
          closeTooltip: function () {
            if (this._tooltip) return this._tooltip.close();
          },
          toggleTooltip: function () {
            return this._tooltip && this._tooltip.toggle(this), this;
          },
          isTooltipOpen: function () {
            return this._tooltip.isOpen();
          },
          setTooltipContent: function (e) {
            return this._tooltip && this._tooltip.setContent(e), this;
          },
          getTooltip: function () {
            return this._tooltip;
          },
          _addFocusListeners: function () {
            this.getElement
              ? this._addFocusListenersOnLayer(this)
              : this.eachLayer &&
                this.eachLayer(this._addFocusListenersOnLayer, this);
          },
          _addFocusListenersOnLayer: function (e) {
            var n = e.getElement();
            n &&
              (ft(
                n,
                'focus',
                function () {
                  (this._tooltip._source = e), this.openTooltip();
                },
                this
              ),
              ft(n, 'blur', this.closeTooltip, this));
          },
          _setAriaDescribedByOnLayer: function (e) {
            var n = e.getElement();
            n &&
              n.setAttribute('aria-describedby', this._tooltip._container.id);
          },
          _openTooltip: function (e) {
            !this._tooltip ||
              !this._map ||
              (this._map.dragging && this._map.dragging.moving()) ||
              ((this._tooltip._source = e.layer || e.target),
              this.openTooltip(
                this._tooltip.options.sticky ? e.latlng : void 0
              ));
          },
          _moveTooltip: function (e) {
            var n = e.latlng,
              s,
              h;
            this._tooltip.options.sticky &&
              e.originalEvent &&
              ((s = this._map.mouseEventToContainerPoint(e.originalEvent)),
              (h = this._map.containerPointToLayerPoint(s)),
              (n = this._map.layerPointToLatLng(h))),
              this._tooltip.setLatLng(n);
          },
        });
      var Ps = ui.extend({
        options: {
          iconSize: [12, 12],
          html: !1,
          bgPos: null,
          className: 'leaflet-div-icon',
        },
        createIcon: function (e) {
          var n = e && e.tagName === 'DIV' ? e : document.createElement('div'),
            s = this.options;
          if (
            (s.html instanceof Element
              ? (vr(n), n.appendChild(s.html))
              : (n.innerHTML = s.html !== !1 ? s.html : ''),
            s.bgPos)
          ) {
            var h = E(s.bgPos);
            n.style.backgroundPosition = -h.x + 'px ' + -h.y + 'px';
          }
          return this._setIconStyles(n, 'icon'), n;
        },
        createShadow: function () {
          return null;
        },
      });
      function Fd(e) {
        return new Ps(e);
      }
      ui.Default = qi;
      var Zi = ae.extend({
        options: {
          tileSize: 256,
          opacity: 1,
          updateWhenIdle: nt.mobile,
          updateWhenZooming: !0,
          updateInterval: 200,
          zIndex: 1,
          bounds: null,
          minZoom: 0,
          maxZoom: void 0,
          maxNativeZoom: void 0,
          minNativeZoom: void 0,
          noWrap: !1,
          pane: 'tilePane',
          className: '',
          keepBuffer: 2,
        },
        initialize: function (e) {
          O(this, e);
        },
        onAdd: function () {
          this._initContainer(),
            (this._levels = {}),
            (this._tiles = {}),
            this._resetView();
        },
        beforeAdd: function (e) {
          e._addZoomLimit(this);
        },
        onRemove: function (e) {
          this._removeAllTiles(),
            Ct(this._container),
            e._removeZoomLimit(this),
            (this._container = null),
            (this._tileZoom = void 0);
        },
        bringToFront: function () {
          return (
            this._map && (ai(this._container), this._setAutoZIndex(Math.max)),
            this
          );
        },
        bringToBack: function () {
          return (
            this._map && (li(this._container), this._setAutoZIndex(Math.min)),
            this
          );
        },
        getContainer: function () {
          return this._container;
        },
        setOpacity: function (e) {
          return (this.options.opacity = e), this._updateOpacity(), this;
        },
        setZIndex: function (e) {
          return (this.options.zIndex = e), this._updateZIndex(), this;
        },
        isLoading: function () {
          return this._loading;
        },
        redraw: function () {
          if (this._map) {
            this._removeAllTiles();
            var e = this._clampZoom(this._map.getZoom());
            e !== this._tileZoom &&
              ((this._tileZoom = e), this._updateLevels()),
              this._update();
          }
          return this;
        },
        getEvents: function () {
          var e = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd,
          };
          return (
            this.options.updateWhenIdle ||
              (this._onMove ||
                (this._onMove = c(
                  this._onMoveEnd,
                  this.options.updateInterval,
                  this
                )),
              (e.move = this._onMove)),
            this._zoomAnimated && (e.zoomanim = this._animateZoom),
            e
          );
        },
        createTile: function () {
          return document.createElement('div');
        },
        getTileSize: function () {
          var e = this.options.tileSize;
          return e instanceof k ? e : new k(e, e);
        },
        _updateZIndex: function () {
          this._container &&
            this.options.zIndex !== void 0 &&
            this.options.zIndex !== null &&
            (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function (e) {
          for (
            var n = this.getPane().children,
              s = -e(-1 / 0, 1 / 0),
              h = 0,
              f = n.length,
              m;
            h < f;
            h++
          )
            (m = n[h].style.zIndex),
              n[h] !== this._container && m && (s = e(s, +m));
          isFinite(s) &&
            ((this.options.zIndex = s + e(-1, 1)), this._updateZIndex());
        },
        _updateOpacity: function () {
          if (this._map && !nt.ielt9) {
            Yt(this._container, this.options.opacity);
            var e = +new Date(),
              n = !1,
              s = !1;
            for (var h in this._tiles) {
              var f = this._tiles[h];
              if (!(!f.current || !f.loaded)) {
                var m = Math.min(1, (e - f.loaded) / 200);
                Yt(f.el, m),
                  m < 1
                    ? (n = !0)
                    : (f.active ? (s = !0) : this._onOpaqueTile(f),
                      (f.active = !0));
              }
            }
            s && !this._noPrune && this._pruneTiles(),
              n &&
                (v(this._fadeFrame),
                (this._fadeFrame = _(this._updateOpacity, this)));
          }
        },
        _onOpaqueTile: p,
        _initContainer: function () {
          this._container ||
            ((this._container = _t(
              'div',
              'leaflet-layer ' + (this.options.className || '')
            )),
            this._updateZIndex(),
            this.options.opacity < 1 && this._updateOpacity(),
            this.getPane().appendChild(this._container));
        },
        _updateLevels: function () {
          var e = this._tileZoom,
            n = this.options.maxZoom;
          if (e !== void 0) {
            for (var s in this._levels)
              (s = Number(s)),
                this._levels[s].el.children.length || s === e
                  ? ((this._levels[s].el.style.zIndex = n - Math.abs(e - s)),
                    this._onUpdateLevel(s))
                  : (Ct(this._levels[s].el),
                    this._removeTilesAtZoom(s),
                    this._onRemoveLevel(s),
                    delete this._levels[s]);
            var h = this._levels[e],
              f = this._map;
            return (
              h ||
                ((h = this._levels[e] = {}),
                (h.el = _t(
                  'div',
                  'leaflet-tile-container leaflet-zoom-animated',
                  this._container
                )),
                (h.el.style.zIndex = n),
                (h.origin = f
                  .project(f.unproject(f.getPixelOrigin()), e)
                  .round()),
                (h.zoom = e),
                this._setZoomTransform(h, f.getCenter(), f.getZoom()),
                p(h.el.offsetWidth),
                this._onCreateLevel(h)),
              (this._level = h),
              h
            );
          }
        },
        _onUpdateLevel: p,
        _onRemoveLevel: p,
        _onCreateLevel: p,
        _pruneTiles: function () {
          if (this._map) {
            var e,
              n,
              s = this._map.getZoom();
            if (s > this.options.maxZoom || s < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (e in this._tiles) (n = this._tiles[e]), (n.retain = n.current);
            for (e in this._tiles)
              if (((n = this._tiles[e]), n.current && !n.active)) {
                var h = n.coords;
                this._retainParent(h.x, h.y, h.z, h.z - 5) ||
                  this._retainChildren(h.x, h.y, h.z, h.z + 2);
              }
            for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
          }
        },
        _removeTilesAtZoom: function (e) {
          for (var n in this._tiles)
            this._tiles[n].coords.z === e && this._removeTile(n);
        },
        _removeAllTiles: function () {
          for (var e in this._tiles) this._removeTile(e);
        },
        _invalidateAll: function () {
          for (var e in this._levels)
            Ct(this._levels[e].el),
              this._onRemoveLevel(Number(e)),
              delete this._levels[e];
          this._removeAllTiles(), (this._tileZoom = void 0);
        },
        _retainParent: function (e, n, s, h) {
          var f = Math.floor(e / 2),
            m = Math.floor(n / 2),
            x = s - 1,
            z = new k(+f, +m);
          z.z = +x;
          var G = this._tileCoordsToKey(z),
            j = this._tiles[G];
          return j && j.active
            ? ((j.retain = !0), !0)
            : (j && j.loaded && (j.retain = !0),
              x > h ? this._retainParent(f, m, x, h) : !1);
        },
        _retainChildren: function (e, n, s, h) {
          for (var f = 2 * e; f < 2 * e + 2; f++)
            for (var m = 2 * n; m < 2 * n + 2; m++) {
              var x = new k(f, m);
              x.z = s + 1;
              var z = this._tileCoordsToKey(x),
                G = this._tiles[z];
              if (G && G.active) {
                G.retain = !0;
                continue;
              } else G && G.loaded && (G.retain = !0);
              s + 1 < h && this._retainChildren(f, m, s + 1, h);
            }
        },
        _resetView: function (e) {
          var n = e && (e.pinch || e.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), n, n);
        },
        _animateZoom: function (e) {
          this._setView(e.center, e.zoom, !0, e.noUpdate);
        },
        _clampZoom: function (e) {
          var n = this.options;
          return n.minNativeZoom !== void 0 && e < n.minNativeZoom
            ? n.minNativeZoom
            : n.maxNativeZoom !== void 0 && n.maxNativeZoom < e
              ? n.maxNativeZoom
              : e;
        },
        _setView: function (e, n, s, h) {
          var f = Math.round(n);
          (this.options.maxZoom !== void 0 && f > this.options.maxZoom) ||
          (this.options.minZoom !== void 0 && f < this.options.minZoom)
            ? (f = void 0)
            : (f = this._clampZoom(f));
          var m = this.options.updateWhenZooming && f !== this._tileZoom;
          (!h || m) &&
            ((this._tileZoom = f),
            this._abortLoading && this._abortLoading(),
            this._updateLevels(),
            this._resetGrid(),
            f !== void 0 && this._update(e),
            s || this._pruneTiles(),
            (this._noPrune = !!s)),
            this._setZoomTransforms(e, n);
        },
        _setZoomTransforms: function (e, n) {
          for (var s in this._levels)
            this._setZoomTransform(this._levels[s], e, n);
        },
        _setZoomTransform: function (e, n, s) {
          var h = this._map.getZoomScale(s, e.zoom),
            f = e.origin
              .multiplyBy(h)
              .subtract(this._map._getNewPixelOrigin(n, s))
              .round();
          nt.any3d ? Ue(e.el, f, h) : Dt(e.el, f);
        },
        _resetGrid: function () {
          var e = this._map,
            n = e.options.crs,
            s = (this._tileSize = this.getTileSize()),
            h = this._tileZoom,
            f = this._map.getPixelWorldBounds(this._tileZoom);
          f && (this._globalTileRange = this._pxBoundsToTileRange(f)),
            (this._wrapX = n.wrapLng &&
              !this.options.noWrap && [
                Math.floor(e.project([0, n.wrapLng[0]], h).x / s.x),
                Math.ceil(e.project([0, n.wrapLng[1]], h).x / s.y),
              ]),
            (this._wrapY = n.wrapLat &&
              !this.options.noWrap && [
                Math.floor(e.project([n.wrapLat[0], 0], h).y / s.x),
                Math.ceil(e.project([n.wrapLat[1], 0], h).y / s.y),
              ]);
        },
        _onMoveEnd: function () {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function (e) {
          var n = this._map,
            s = n._animatingZoom
              ? Math.max(n._animateToZoom, n.getZoom())
              : n.getZoom(),
            h = n.getZoomScale(s, this._tileZoom),
            f = n.project(e, this._tileZoom).floor(),
            m = n.getSize().divideBy(h * 2);
          return new F(f.subtract(m), f.add(m));
        },
        _update: function (e) {
          var n = this._map;
          if (n) {
            var s = this._clampZoom(n.getZoom());
            if (
              (e === void 0 && (e = n.getCenter()), this._tileZoom !== void 0)
            ) {
              var h = this._getTiledPixelBounds(e),
                f = this._pxBoundsToTileRange(h),
                m = f.getCenter(),
                x = [],
                z = this.options.keepBuffer,
                G = new F(
                  f.getBottomLeft().subtract([z, -z]),
                  f.getTopRight().add([z, -z])
                );
              if (
                !(
                  isFinite(f.min.x) &&
                  isFinite(f.min.y) &&
                  isFinite(f.max.x) &&
                  isFinite(f.max.y)
                )
              )
                throw new Error(
                  'Attempted to load an infinite number of tiles'
                );
              for (var j in this._tiles) {
                var Q = this._tiles[j].coords;
                (Q.z !== this._tileZoom || !G.contains(new k(Q.x, Q.y))) &&
                  (this._tiles[j].current = !1);
              }
              if (Math.abs(s - this._tileZoom) > 1) {
                this._setView(e, s);
                return;
              }
              for (var ht = f.min.y; ht <= f.max.y; ht++)
                for (var mt = f.min.x; mt <= f.max.x; mt++) {
                  var Jt = new k(mt, ht);
                  if (((Jt.z = this._tileZoom), !!this._isValidTile(Jt))) {
                    var We = this._tiles[this._tileCoordsToKey(Jt)];
                    We ? (We.current = !0) : x.push(Jt);
                  }
                }
              if (
                (x.sort(function (Oe, Fn) {
                  return Oe.distanceTo(m) - Fn.distanceTo(m);
                }),
                x.length !== 0)
              ) {
                this._loading || ((this._loading = !0), this.fire('loading'));
                var Rr = document.createDocumentFragment();
                for (mt = 0; mt < x.length; mt++) this._addTile(x[mt], Rr);
                this._level.el.appendChild(Rr);
              }
            }
          }
        },
        _isValidTile: function (e) {
          var n = this._map.options.crs;
          if (!n.infinite) {
            var s = this._globalTileRange;
            if (
              (!n.wrapLng && (e.x < s.min.x || e.x > s.max.x)) ||
              (!n.wrapLat && (e.y < s.min.y || e.y > s.max.y))
            )
              return !1;
          }
          if (!this.options.bounds) return !0;
          var h = this._tileCoordsToBounds(e);
          return it(this.options.bounds).overlaps(h);
        },
        _keyToBounds: function (e) {
          return this._tileCoordsToBounds(this._keyToTileCoords(e));
        },
        _tileCoordsToNwSe: function (e) {
          var n = this._map,
            s = this.getTileSize(),
            h = e.scaleBy(s),
            f = h.add(s),
            m = n.unproject(h, e.z),
            x = n.unproject(f, e.z);
          return [m, x];
        },
        _tileCoordsToBounds: function (e) {
          var n = this._tileCoordsToNwSe(e),
            s = new J(n[0], n[1]);
          return this.options.noWrap || (s = this._map.wrapLatLngBounds(s)), s;
        },
        _tileCoordsToKey: function (e) {
          return e.x + ':' + e.y + ':' + e.z;
        },
        _keyToTileCoords: function (e) {
          var n = e.split(':'),
            s = new k(+n[0], +n[1]);
          return (s.z = +n[2]), s;
        },
        _removeTile: function (e) {
          var n = this._tiles[e];
          n &&
            (Ct(n.el),
            delete this._tiles[e],
            this.fire('tileunload', {
              tile: n.el,
              coords: this._keyToTileCoords(e),
            }));
        },
        _initTile: function (e) {
          dt(e, 'leaflet-tile');
          var n = this.getTileSize();
          (e.style.width = n.x + 'px'),
            (e.style.height = n.y + 'px'),
            (e.onselectstart = p),
            (e.onmousemove = p),
            nt.ielt9 && this.options.opacity < 1 && Yt(e, this.options.opacity);
        },
        _addTile: function (e, n) {
          var s = this._getTilePos(e),
            h = this._tileCoordsToKey(e),
            f = this.createTile(
              this._wrapCoords(e),
              a(this._tileReady, this, e)
            );
          this._initTile(f),
            this.createTile.length < 2 &&
              _(a(this._tileReady, this, e, null, f)),
            Dt(f, s),
            (this._tiles[h] = { el: f, coords: e, current: !0 }),
            n.appendChild(f),
            this.fire('tileloadstart', { tile: f, coords: e });
        },
        _tileReady: function (e, n, s) {
          n && this.fire('tileerror', { error: n, tile: s, coords: e });
          var h = this._tileCoordsToKey(e);
          (s = this._tiles[h]),
            s &&
              ((s.loaded = +new Date()),
              this._map._fadeAnimated
                ? (Yt(s.el, 0),
                  v(this._fadeFrame),
                  (this._fadeFrame = _(this._updateOpacity, this)))
                : ((s.active = !0), this._pruneTiles()),
              n ||
                (dt(s.el, 'leaflet-tile-loaded'),
                this.fire('tileload', { tile: s.el, coords: e })),
              this._noTilesToLoad() &&
                ((this._loading = !1),
                this.fire('load'),
                nt.ielt9 || !this._map._fadeAnimated
                  ? _(this._pruneTiles, this)
                  : setTimeout(a(this._pruneTiles, this), 250)));
        },
        _getTilePos: function (e) {
          return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function (e) {
          var n = new k(
            this._wrapX ? d(e.x, this._wrapX) : e.x,
            this._wrapY ? d(e.y, this._wrapY) : e.y
          );
          return (n.z = e.z), n;
        },
        _pxBoundsToTileRange: function (e) {
          var n = this.getTileSize();
          return new F(
            e.min.unscaleBy(n).floor(),
            e.max.unscaleBy(n).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function () {
          for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
          return !0;
        },
      });
      function qd(e) {
        return new Zi(e);
      }
      var di = Zi.extend({
        options: {
          minZoom: 0,
          maxZoom: 18,
          subdomains: 'abc',
          errorTileUrl: '',
          zoomOffset: 0,
          tms: !1,
          zoomReverse: !1,
          detectRetina: !1,
          crossOrigin: !1,
          referrerPolicy: !1,
        },
        initialize: function (e, n) {
          (this._url = e),
            (n = O(this, n)),
            n.detectRetina && nt.retina && n.maxZoom > 0
              ? ((n.tileSize = Math.floor(n.tileSize / 2)),
                n.zoomReverse
                  ? (n.zoomOffset--,
                    (n.minZoom = Math.min(n.maxZoom, n.minZoom + 1)))
                  : (n.zoomOffset++,
                    (n.maxZoom = Math.max(n.minZoom, n.maxZoom - 1))),
                (n.minZoom = Math.max(0, n.minZoom)))
              : n.zoomReverse
                ? (n.minZoom = Math.min(n.maxZoom, n.minZoom))
                : (n.maxZoom = Math.max(n.minZoom, n.maxZoom)),
            typeof n.subdomains == 'string' &&
              (n.subdomains = n.subdomains.split('')),
            this.on('tileunload', this._onTileRemove);
        },
        setUrl: function (e, n) {
          return (
            this._url === e && n === void 0 && (n = !0),
            (this._url = e),
            n || this.redraw(),
            this
          );
        },
        createTile: function (e, n) {
          var s = document.createElement('img');
          return (
            ft(s, 'load', a(this._tileOnLoad, this, n, s)),
            ft(s, 'error', a(this._tileOnError, this, n, s)),
            (this.options.crossOrigin || this.options.crossOrigin === '') &&
              (s.crossOrigin =
                this.options.crossOrigin === !0
                  ? ''
                  : this.options.crossOrigin),
            typeof this.options.referrerPolicy == 'string' &&
              (s.referrerPolicy = this.options.referrerPolicy),
            (s.alt = ''),
            (s.src = this.getTileUrl(e)),
            s
          );
        },
        getTileUrl: function (e) {
          var n = {
            r: nt.retina ? '@2x' : '',
            s: this._getSubdomain(e),
            x: e.x,
            y: e.y,
            z: this._getZoomForUrl(),
          };
          if (this._map && !this._map.options.crs.infinite) {
            var s = this._globalTileRange.max.y - e.y;
            this.options.tms && (n.y = s), (n['-y'] = s);
          }
          return w(this._url, r(n, this.options));
        },
        _tileOnLoad: function (e, n) {
          nt.ielt9 ? setTimeout(a(e, this, null, n), 0) : e(null, n);
        },
        _tileOnError: function (e, n, s) {
          var h = this.options.errorTileUrl;
          h && n.getAttribute('src') !== h && (n.src = h), e(s, n);
        },
        _onTileRemove: function (e) {
          e.tile.onload = null;
        },
        _getZoomForUrl: function () {
          var e = this._tileZoom,
            n = this.options.maxZoom,
            s = this.options.zoomReverse,
            h = this.options.zoomOffset;
          return s && (e = n - e), e + h;
        },
        _getSubdomain: function (e) {
          var n = Math.abs(e.x + e.y) % this.options.subdomains.length;
          return this.options.subdomains[n];
        },
        _abortLoading: function () {
          var e, n;
          for (e in this._tiles)
            if (
              this._tiles[e].coords.z !== this._tileZoom &&
              ((n = this._tiles[e].el),
              (n.onload = p),
              (n.onerror = p),
              !n.complete)
            ) {
              n.src = K;
              var s = this._tiles[e].coords;
              Ct(n),
                delete this._tiles[e],
                this.fire('tileabort', { tile: n, coords: s });
            }
        },
        _removeTile: function (e) {
          var n = this._tiles[e];
          if (n)
            return (
              n.el.setAttribute('src', K),
              Zi.prototype._removeTile.call(this, e)
            );
        },
        _tileReady: function (e, n, s) {
          if (!(!this._map || (s && s.getAttribute('src') === K)))
            return Zi.prototype._tileReady.call(this, e, n, s);
        },
      });
      function Es(e, n) {
        return new di(e, n);
      }
      var Ss = di.extend({
        defaultWmsParams: {
          service: 'WMS',
          request: 'GetMap',
          layers: '',
          styles: '',
          format: 'image/jpeg',
          transparent: !1,
          version: '1.1.1',
        },
        options: { crs: null, uppercase: !1 },
        initialize: function (e, n) {
          this._url = e;
          var s = r({}, this.defaultWmsParams);
          for (var h in n) h in this.options || (s[h] = n[h]);
          n = O(this, n);
          var f = n.detectRetina && nt.retina ? 2 : 1,
            m = this.getTileSize();
          (s.width = m.x * f), (s.height = m.y * f), (this.wmsParams = s);
        },
        onAdd: function (e) {
          (this._crs = this.options.crs || e.options.crs),
            (this._wmsVersion = parseFloat(this.wmsParams.version));
          var n = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
          (this.wmsParams[n] = this._crs.code),
            di.prototype.onAdd.call(this, e);
        },
        getTileUrl: function (e) {
          var n = this._tileCoordsToNwSe(e),
            s = this._crs,
            h = X(s.project(n[0]), s.project(n[1])),
            f = h.min,
            m = h.max,
            x = (
              this._wmsVersion >= 1.3 && this._crs === bs
                ? [f.y, f.x, m.y, m.x]
                : [f.x, f.y, m.x, m.y]
            ).join(','),
            z = di.prototype.getTileUrl.call(this, e);
          return (
            z +
            q(this.wmsParams, z, this.options.uppercase) +
            (this.options.uppercase ? '&BBOX=' : '&bbox=') +
            x
          );
        },
        setParams: function (e, n) {
          return r(this.wmsParams, e), n || this.redraw(), this;
        },
      });
      function Zd(e, n) {
        return new Ss(e, n);
      }
      (di.WMS = Ss), (Es.wms = Zd);
      var Ce = ae.extend({
          options: { padding: 0.1 },
          initialize: function (e) {
            O(this, e), u(this), (this._layers = this._layers || {});
          },
          onAdd: function () {
            this._container ||
              (this._initContainer(),
              this._zoomAnimated &&
                dt(this._container, 'leaflet-zoom-animated')),
              this.getPane().appendChild(this._container),
              this._update(),
              this.on('update', this._updatePaths, this);
          },
          onRemove: function () {
            this.off('update', this._updatePaths, this),
              this._destroyContainer();
          },
          getEvents: function () {
            var e = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd,
            };
            return this._zoomAnimated && (e.zoomanim = this._onAnimZoom), e;
          },
          _onAnimZoom: function (e) {
            this._updateTransform(e.center, e.zoom);
          },
          _onZoom: function () {
            this._updateTransform(this._map.getCenter(), this._map.getZoom());
          },
          _updateTransform: function (e, n) {
            var s = this._map.getZoomScale(n, this._zoom),
              h = this._map.getSize().multiplyBy(0.5 + this.options.padding),
              f = this._map.project(this._center, n),
              m = h
                .multiplyBy(-s)
                .add(f)
                .subtract(this._map._getNewPixelOrigin(e, n));
            nt.any3d ? Ue(this._container, m, s) : Dt(this._container, m);
          },
          _reset: function () {
            this._update(), this._updateTransform(this._center, this._zoom);
            for (var e in this._layers) this._layers[e]._reset();
          },
          _onZoomEnd: function () {
            for (var e in this._layers) this._layers[e]._project();
          },
          _updatePaths: function () {
            for (var e in this._layers) this._layers[e]._update();
          },
          _update: function () {
            var e = this.options.padding,
              n = this._map.getSize(),
              s = this._map
                .containerPointToLayerPoint(n.multiplyBy(-e))
                .round();
            (this._bounds = new F(s, s.add(n.multiplyBy(1 + e * 2)).round())),
              (this._center = this._map.getCenter()),
              (this._zoom = this._map.getZoom());
          },
        }),
        Ts = Ce.extend({
          options: { tolerance: 0 },
          getEvents: function () {
            var e = Ce.prototype.getEvents.call(this);
            return (e.viewprereset = this._onViewPreReset), e;
          },
          _onViewPreReset: function () {
            this._postponeUpdatePaths = !0;
          },
          onAdd: function () {
            Ce.prototype.onAdd.call(this), this._draw();
          },
          _initContainer: function () {
            var e = (this._container = document.createElement('canvas'));
            ft(e, 'mousemove', this._onMouseMove, this),
              ft(
                e,
                'click dblclick mousedown mouseup contextmenu',
                this._onClick,
                this
              ),
              ft(e, 'mouseout', this._handleMouseOut, this),
              (e._leaflet_disable_events = !0),
              (this._ctx = e.getContext('2d'));
          },
          _destroyContainer: function () {
            v(this._redrawRequest),
              delete this._ctx,
              Ct(this._container),
              xt(this._container),
              delete this._container;
          },
          _updatePaths: function () {
            if (!this._postponeUpdatePaths) {
              var e;
              this._redrawBounds = null;
              for (var n in this._layers) (e = this._layers[n]), e._update();
              this._redraw();
            }
          },
          _update: function () {
            if (!(this._map._animatingZoom && this._bounds)) {
              Ce.prototype._update.call(this);
              var e = this._bounds,
                n = this._container,
                s = e.getSize(),
                h = nt.retina ? 2 : 1;
              Dt(n, e.min),
                (n.width = h * s.x),
                (n.height = h * s.y),
                (n.style.width = s.x + 'px'),
                (n.style.height = s.y + 'px'),
                nt.retina && this._ctx.scale(2, 2),
                this._ctx.translate(-e.min.x, -e.min.y),
                this.fire('update');
            }
          },
          _reset: function () {
            Ce.prototype._reset.call(this),
              this._postponeUpdatePaths &&
                ((this._postponeUpdatePaths = !1), this._updatePaths());
          },
          _initPath: function (e) {
            this._updateDashArray(e), (this._layers[u(e)] = e);
            var n = (e._order = { layer: e, prev: this._drawLast, next: null });
            this._drawLast && (this._drawLast.next = n),
              (this._drawLast = n),
              (this._drawFirst = this._drawFirst || this._drawLast);
          },
          _addPath: function (e) {
            this._requestRedraw(e);
          },
          _removePath: function (e) {
            var n = e._order,
              s = n.next,
              h = n.prev;
            s ? (s.prev = h) : (this._drawLast = h),
              h ? (h.next = s) : (this._drawFirst = s),
              delete e._order,
              delete this._layers[u(e)],
              this._requestRedraw(e);
          },
          _updatePath: function (e) {
            this._extendRedrawBounds(e),
              e._project(),
              e._update(),
              this._requestRedraw(e);
          },
          _updateStyle: function (e) {
            this._updateDashArray(e), this._requestRedraw(e);
          },
          _updateDashArray: function (e) {
            if (typeof e.options.dashArray == 'string') {
              var n = e.options.dashArray.split(/[, ]+/),
                s = [],
                h,
                f;
              for (f = 0; f < n.length; f++) {
                if (((h = Number(n[f])), isNaN(h))) return;
                s.push(h);
              }
              e.options._dashArray = s;
            } else e.options._dashArray = e.options.dashArray;
          },
          _requestRedraw: function (e) {
            this._map &&
              (this._extendRedrawBounds(e),
              (this._redrawRequest =
                this._redrawRequest || _(this._redraw, this)));
          },
          _extendRedrawBounds: function (e) {
            if (e._pxBounds) {
              var n = (e.options.weight || 0) + 1;
              (this._redrawBounds = this._redrawBounds || new F()),
                this._redrawBounds.extend(e._pxBounds.min.subtract([n, n])),
                this._redrawBounds.extend(e._pxBounds.max.add([n, n]));
            }
          },
          _redraw: function () {
            (this._redrawRequest = null),
              this._redrawBounds &&
                (this._redrawBounds.min._floor(),
                this._redrawBounds.max._ceil()),
              this._clear(),
              this._draw(),
              (this._redrawBounds = null);
          },
          _clear: function () {
            var e = this._redrawBounds;
            if (e) {
              var n = e.getSize();
              this._ctx.clearRect(e.min.x, e.min.y, n.x, n.y);
            } else
              this._ctx.save(),
                this._ctx.setTransform(1, 0, 0, 1, 0, 0),
                this._ctx.clearRect(
                  0,
                  0,
                  this._container.width,
                  this._container.height
                ),
                this._ctx.restore();
          },
          _draw: function () {
            var e,
              n = this._redrawBounds;
            if ((this._ctx.save(), n)) {
              var s = n.getSize();
              this._ctx.beginPath(),
                this._ctx.rect(n.min.x, n.min.y, s.x, s.y),
                this._ctx.clip();
            }
            this._drawing = !0;
            for (var h = this._drawFirst; h; h = h.next)
              (e = h.layer),
                (!n || (e._pxBounds && e._pxBounds.intersects(n))) &&
                  e._updatePath();
            (this._drawing = !1), this._ctx.restore();
          },
          _updatePoly: function (e, n) {
            if (this._drawing) {
              var s,
                h,
                f,
                m,
                x = e._parts,
                z = x.length,
                G = this._ctx;
              if (z) {
                for (G.beginPath(), s = 0; s < z; s++) {
                  for (h = 0, f = x[s].length; h < f; h++)
                    (m = x[s][h]), G[h ? 'lineTo' : 'moveTo'](m.x, m.y);
                  n && G.closePath();
                }
                this._fillStroke(G, e);
              }
            }
          },
          _updateCircle: function (e) {
            if (!(!this._drawing || e._empty())) {
              var n = e._point,
                s = this._ctx,
                h = Math.max(Math.round(e._radius), 1),
                f = (Math.max(Math.round(e._radiusY), 1) || h) / h;
              f !== 1 && (s.save(), s.scale(1, f)),
                s.beginPath(),
                s.arc(n.x, n.y / f, h, 0, Math.PI * 2, !1),
                f !== 1 && s.restore(),
                this._fillStroke(s, e);
            }
          },
          _fillStroke: function (e, n) {
            var s = n.options;
            s.fill &&
              ((e.globalAlpha = s.fillOpacity),
              (e.fillStyle = s.fillColor || s.color),
              e.fill(s.fillRule || 'evenodd')),
              s.stroke &&
                s.weight !== 0 &&
                (e.setLineDash &&
                  e.setLineDash((n.options && n.options._dashArray) || []),
                (e.globalAlpha = s.opacity),
                (e.lineWidth = s.weight),
                (e.strokeStyle = s.color),
                (e.lineCap = s.lineCap),
                (e.lineJoin = s.lineJoin),
                e.stroke());
          },
          _onClick: function (e) {
            for (
              var n = this._map.mouseEventToLayerPoint(e),
                s,
                h,
                f = this._drawFirst;
              f;
              f = f.next
            )
              (s = f.layer),
                s.options.interactive &&
                  s._containsPoint(n) &&
                  (!(e.type === 'click' || e.type === 'preclick') ||
                    !this._map._draggableMoved(s)) &&
                  (h = s);
            this._fireEvent(h ? [h] : !1, e);
          },
          _onMouseMove: function (e) {
            if (
              !(
                !this._map ||
                this._map.dragging.moving() ||
                this._map._animatingZoom
              )
            ) {
              var n = this._map.mouseEventToLayerPoint(e);
              this._handleMouseHover(e, n);
            }
          },
          _handleMouseOut: function (e) {
            var n = this._hoveredLayer;
            n &&
              (St(this._container, 'leaflet-interactive'),
              this._fireEvent([n], e, 'mouseout'),
              (this._hoveredLayer = null),
              (this._mouseHoverThrottled = !1));
          },
          _handleMouseHover: function (e, n) {
            if (!this._mouseHoverThrottled) {
              for (var s, h, f = this._drawFirst; f; f = f.next)
                (s = f.layer),
                  s.options.interactive && s._containsPoint(n) && (h = s);
              h !== this._hoveredLayer &&
                (this._handleMouseOut(e),
                h &&
                  (dt(this._container, 'leaflet-interactive'),
                  this._fireEvent([h], e, 'mouseover'),
                  (this._hoveredLayer = h))),
                this._fireEvent(
                  this._hoveredLayer ? [this._hoveredLayer] : !1,
                  e
                ),
                (this._mouseHoverThrottled = !0),
                setTimeout(
                  a(function () {
                    this._mouseHoverThrottled = !1;
                  }, this),
                  32
                );
            }
          },
          _fireEvent: function (e, n, s) {
            this._map._fireDOMEvent(n, s || n.type, e);
          },
          _bringToFront: function (e) {
            var n = e._order;
            if (n) {
              var s = n.next,
                h = n.prev;
              if (s) s.prev = h;
              else return;
              h ? (h.next = s) : s && (this._drawFirst = s),
                (n.prev = this._drawLast),
                (this._drawLast.next = n),
                (n.next = null),
                (this._drawLast = n),
                this._requestRedraw(e);
            }
          },
          _bringToBack: function (e) {
            var n = e._order;
            if (n) {
              var s = n.next,
                h = n.prev;
              if (h) h.next = s;
              else return;
              s ? (s.prev = h) : h && (this._drawLast = h),
                (n.prev = null),
                (n.next = this._drawFirst),
                (this._drawFirst.prev = n),
                (this._drawFirst = n),
                this._requestRedraw(e);
            }
          },
        });
      function Bs(e) {
        return nt.canvas ? new Ts(e) : null;
      }
      var Ui = (function () {
          try {
            return (
              document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml'),
              function (e) {
                return document.createElement('<lvml:' + e + ' class="lvml">');
              }
            );
          } catch {}
          return function (e) {
            return document.createElement(
              '<' + e + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">'
            );
          };
        })(),
        Ud = {
          _initContainer: function () {
            this._container = _t('div', 'leaflet-vml-container');
          },
          _update: function () {
            this._map._animatingZoom ||
              (Ce.prototype._update.call(this), this.fire('update'));
          },
          _initPath: function (e) {
            var n = (e._container = Ui('shape'));
            dt(n, 'leaflet-vml-shape ' + (this.options.className || '')),
              (n.coordsize = '1 1'),
              (e._path = Ui('path')),
              n.appendChild(e._path),
              this._updateStyle(e),
              (this._layers[u(e)] = e);
          },
          _addPath: function (e) {
            var n = e._container;
            this._container.appendChild(n),
              e.options.interactive && e.addInteractiveTarget(n);
          },
          _removePath: function (e) {
            var n = e._container;
            Ct(n), e.removeInteractiveTarget(n), delete this._layers[u(e)];
          },
          _updateStyle: function (e) {
            var n = e._stroke,
              s = e._fill,
              h = e.options,
              f = e._container;
            (f.stroked = !!h.stroke),
              (f.filled = !!h.fill),
              h.stroke
                ? (n || (n = e._stroke = Ui('stroke')),
                  f.appendChild(n),
                  (n.weight = h.weight + 'px'),
                  (n.color = h.color),
                  (n.opacity = h.opacity),
                  h.dashArray
                    ? (n.dashStyle = B(h.dashArray)
                        ? h.dashArray.join(' ')
                        : h.dashArray.replace(/( *, *)/g, ' '))
                    : (n.dashStyle = ''),
                  (n.endcap = h.lineCap.replace('butt', 'flat')),
                  (n.joinstyle = h.lineJoin))
                : n && (f.removeChild(n), (e._stroke = null)),
              h.fill
                ? (s || (s = e._fill = Ui('fill')),
                  f.appendChild(s),
                  (s.color = h.fillColor || h.color),
                  (s.opacity = h.fillOpacity))
                : s && (f.removeChild(s), (e._fill = null));
          },
          _updateCircle: function (e) {
            var n = e._point.round(),
              s = Math.round(e._radius),
              h = Math.round(e._radiusY || s);
            this._setPath(
              e,
              e._empty()
                ? 'M0 0'
                : 'AL ' +
                    n.x +
                    ',' +
                    n.y +
                    ' ' +
                    s +
                    ',' +
                    h +
                    ' 0,' +
                    65535 * 360
            );
          },
          _setPath: function (e, n) {
            e._path.v = n;
          },
          _bringToFront: function (e) {
            ai(e._container);
          },
          _bringToBack: function (e) {
            li(e._container);
          },
        },
        Or = nt.vml ? Ui : Tt,
        Vi = Ce.extend({
          _initContainer: function () {
            (this._container = Or('svg')),
              this._container.setAttribute('pointer-events', 'none'),
              (this._rootGroup = Or('g')),
              this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function () {
            Ct(this._container),
              xt(this._container),
              delete this._container,
              delete this._rootGroup,
              delete this._svgSize;
          },
          _update: function () {
            if (!(this._map._animatingZoom && this._bounds)) {
              Ce.prototype._update.call(this);
              var e = this._bounds,
                n = e.getSize(),
                s = this._container;
              (!this._svgSize || !this._svgSize.equals(n)) &&
                ((this._svgSize = n),
                s.setAttribute('width', n.x),
                s.setAttribute('height', n.y)),
                Dt(s, e.min),
                s.setAttribute(
                  'viewBox',
                  [e.min.x, e.min.y, n.x, n.y].join(' ')
                ),
                this.fire('update');
            }
          },
          _initPath: function (e) {
            var n = (e._path = Or('path'));
            e.options.className && dt(n, e.options.className),
              e.options.interactive && dt(n, 'leaflet-interactive'),
              this._updateStyle(e),
              (this._layers[u(e)] = e);
          },
          _addPath: function (e) {
            this._rootGroup || this._initContainer(),
              this._rootGroup.appendChild(e._path),
              e.addInteractiveTarget(e._path);
          },
          _removePath: function (e) {
            Ct(e._path),
              e.removeInteractiveTarget(e._path),
              delete this._layers[u(e)];
          },
          _updatePath: function (e) {
            e._project(), e._update();
          },
          _updateStyle: function (e) {
            var n = e._path,
              s = e.options;
            n &&
              (s.stroke
                ? (n.setAttribute('stroke', s.color),
                  n.setAttribute('stroke-opacity', s.opacity),
                  n.setAttribute('stroke-width', s.weight),
                  n.setAttribute('stroke-linecap', s.lineCap),
                  n.setAttribute('stroke-linejoin', s.lineJoin),
                  s.dashArray
                    ? n.setAttribute('stroke-dasharray', s.dashArray)
                    : n.removeAttribute('stroke-dasharray'),
                  s.dashOffset
                    ? n.setAttribute('stroke-dashoffset', s.dashOffset)
                    : n.removeAttribute('stroke-dashoffset'))
                : n.setAttribute('stroke', 'none'),
              s.fill
                ? (n.setAttribute('fill', s.fillColor || s.color),
                  n.setAttribute('fill-opacity', s.fillOpacity),
                  n.setAttribute('fill-rule', s.fillRule || 'evenodd'))
                : n.setAttribute('fill', 'none'));
          },
          _updatePoly: function (e, n) {
            this._setPath(e, Bt(e._parts, n));
          },
          _updateCircle: function (e) {
            var n = e._point,
              s = Math.max(Math.round(e._radius), 1),
              h = Math.max(Math.round(e._radiusY), 1) || s,
              f = 'a' + s + ',' + h + ' 0 1,0 ',
              m = e._empty()
                ? 'M0 0'
                : 'M' +
                  (n.x - s) +
                  ',' +
                  n.y +
                  f +
                  s * 2 +
                  ',0 ' +
                  f +
                  -s * 2 +
                  ',0 ';
            this._setPath(e, m);
          },
          _setPath: function (e, n) {
            e._path.setAttribute('d', n);
          },
          _bringToFront: function (e) {
            ai(e._path);
          },
          _bringToBack: function (e) {
            li(e._path);
          },
        });
      nt.vml && Vi.include(Ud);
      function As(e) {
        return nt.svg || nt.vml ? new Vi(e) : null;
      }
      gt.include({
        getRenderer: function (e) {
          var n =
            e.options.renderer ||
            this._getPaneRenderer(e.options.pane) ||
            this.options.renderer ||
            this._renderer;
          return (
            n || (n = this._renderer = this._createRenderer()),
            this.hasLayer(n) || this.addLayer(n),
            n
          );
        },
        _getPaneRenderer: function (e) {
          if (e === 'overlayPane' || e === void 0) return !1;
          var n = this._paneRenderers[e];
          return (
            n === void 0 &&
              ((n = this._createRenderer({ pane: e })),
              (this._paneRenderers[e] = n)),
            n
          );
        },
        _createRenderer: function (e) {
          return (this.options.preferCanvas && Bs(e)) || As(e);
        },
      });
      var Ds = ci.extend({
        initialize: function (e, n) {
          ci.prototype.initialize.call(this, this._boundsToLatLngs(e), n);
        },
        setBounds: function (e) {
          return this.setLatLngs(this._boundsToLatLngs(e));
        },
        _boundsToLatLngs: function (e) {
          return (
            (e = it(e)),
            [
              e.getSouthWest(),
              e.getNorthWest(),
              e.getNorthEast(),
              e.getSouthEast(),
            ]
          );
        },
      });
      function Vd(e, n) {
        return new Ds(e, n);
      }
      (Vi.create = Or),
        (Vi.pointsToPath = Bt),
        (Me.geometryToLayer = Pr),
        (Me.coordsToLatLng = zn),
        (Me.coordsToLatLngs = Er),
        (Me.latLngToCoords = Nn),
        (Me.latLngsToCoords = Sr),
        (Me.getFeature = fi),
        (Me.asFeature = Tr),
        gt.mergeOptions({ boxZoom: !0 });
      var Os = ge.extend({
        initialize: function (e) {
          (this._map = e),
            (this._container = e._container),
            (this._pane = e._panes.overlayPane),
            (this._resetStateTimeout = 0),
            e.on('unload', this._destroy, this);
        },
        addHooks: function () {
          ft(this._container, 'mousedown', this._onMouseDown, this);
        },
        removeHooks: function () {
          xt(this._container, 'mousedown', this._onMouseDown, this);
        },
        moved: function () {
          return this._moved;
        },
        _destroy: function () {
          Ct(this._pane), delete this._pane;
        },
        _resetState: function () {
          (this._resetStateTimeout = 0), (this._moved = !1);
        },
        _clearDeferredResetState: function () {
          this._resetStateTimeout !== 0 &&
            (clearTimeout(this._resetStateTimeout),
            (this._resetStateTimeout = 0));
        },
        _onMouseDown: function (e) {
          if (!e.shiftKey || (e.which !== 1 && e.button !== 1)) return !1;
          this._clearDeferredResetState(),
            this._resetState(),
            Ri(),
            bn(),
            (this._startPoint = this._map.mouseEventToContainerPoint(e)),
            ft(
              document,
              {
                contextmenu: je,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown,
              },
              this
            );
        },
        _onMouseMove: function (e) {
          this._moved ||
            ((this._moved = !0),
            (this._box = _t('div', 'leaflet-zoom-box', this._container)),
            dt(this._container, 'leaflet-crosshair'),
            this._map.fire('boxzoomstart')),
            (this._point = this._map.mouseEventToContainerPoint(e));
          var n = new F(this._point, this._startPoint),
            s = n.getSize();
          Dt(this._box, n.min),
            (this._box.style.width = s.x + 'px'),
            (this._box.style.height = s.y + 'px');
        },
        _finish: function () {
          this._moved &&
            (Ct(this._box), St(this._container, 'leaflet-crosshair')),
            Ii(),
            wn(),
            xt(
              document,
              {
                contextmenu: je,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown,
              },
              this
            );
        },
        _onMouseUp: function (e) {
          if (
            !(e.which !== 1 && e.button !== 1) &&
            (this._finish(), !!this._moved)
          ) {
            this._clearDeferredResetState(),
              (this._resetStateTimeout = setTimeout(
                a(this._resetState, this),
                0
              ));
            var n = new J(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(n).fire('boxzoomend', { boxZoomBounds: n });
          }
        },
        _onKeyDown: function (e) {
          e.keyCode === 27 &&
            (this._finish(),
            this._clearDeferredResetState(),
            this._resetState());
        },
      });
      gt.addInitHook('addHandler', 'boxZoom', Os),
        gt.mergeOptions({ doubleClickZoom: !0 });
      var Rs = ge.extend({
        addHooks: function () {
          this._map.on('dblclick', this._onDoubleClick, this);
        },
        removeHooks: function () {
          this._map.off('dblclick', this._onDoubleClick, this);
        },
        _onDoubleClick: function (e) {
          var n = this._map,
            s = n.getZoom(),
            h = n.options.zoomDelta,
            f = e.originalEvent.shiftKey ? s - h : s + h;
          n.options.doubleClickZoom === 'center'
            ? n.setZoom(f)
            : n.setZoomAround(e.containerPoint, f);
        },
      });
      gt.addInitHook('addHandler', 'doubleClickZoom', Rs),
        gt.mergeOptions({
          dragging: !0,
          inertia: !0,
          inertiaDeceleration: 3400,
          inertiaMaxSpeed: 1 / 0,
          easeLinearity: 0.2,
          worldCopyJump: !1,
          maxBoundsViscosity: 0,
        });
      var Is = ge.extend({
        addHooks: function () {
          if (!this._draggable) {
            var e = this._map;
            (this._draggable = new Ae(e._mapPane, e._container)),
              this._draggable.on(
                {
                  dragstart: this._onDragStart,
                  drag: this._onDrag,
                  dragend: this._onDragEnd,
                },
                this
              ),
              this._draggable.on('predrag', this._onPreDragLimit, this),
              e.options.worldCopyJump &&
                (this._draggable.on('predrag', this._onPreDragWrap, this),
                e.on('zoomend', this._onZoomEnd, this),
                e.whenReady(this._onZoomEnd, this));
          }
          dt(this._map._container, 'leaflet-grab leaflet-touch-drag'),
            this._draggable.enable(),
            (this._positions = []),
            (this._times = []);
        },
        removeHooks: function () {
          St(this._map._container, 'leaflet-grab'),
            St(this._map._container, 'leaflet-touch-drag'),
            this._draggable.disable();
        },
        moved: function () {
          return this._draggable && this._draggable._moved;
        },
        moving: function () {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function () {
          var e = this._map;
          if (
            (e._stop(),
            this._map.options.maxBounds && this._map.options.maxBoundsViscosity)
          ) {
            var n = it(this._map.options.maxBounds);
            (this._offsetLimit = X(
              this._map.latLngToContainerPoint(n.getNorthWest()).multiplyBy(-1),
              this._map
                .latLngToContainerPoint(n.getSouthEast())
                .multiplyBy(-1)
                .add(this._map.getSize())
            )),
              (this._viscosity = Math.min(
                1,
                Math.max(0, this._map.options.maxBoundsViscosity)
              ));
          } else this._offsetLimit = null;
          e.fire('movestart').fire('dragstart'),
            e.options.inertia && ((this._positions = []), (this._times = []));
        },
        _onDrag: function (e) {
          if (this._map.options.inertia) {
            var n = (this._lastTime = +new Date()),
              s = (this._lastPos =
                this._draggable._absPos || this._draggable._newPos);
            this._positions.push(s),
              this._times.push(n),
              this._prunePositions(n);
          }
          this._map.fire('move', e).fire('drag', e);
        },
        _prunePositions: function (e) {
          for (; this._positions.length > 1 && e - this._times[0] > 50; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function () {
          var e = this._map.getSize().divideBy(2),
            n = this._map.latLngToLayerPoint([0, 0]);
          (this._initialWorldOffset = n.subtract(e).x),
            (this._worldWidth = this._map.getPixelWorldBounds().getSize().x);
        },
        _viscousLimit: function (e, n) {
          return e - (e - n) * this._viscosity;
        },
        _onPreDragLimit: function () {
          if (!(!this._viscosity || !this._offsetLimit)) {
            var e = this._draggable._newPos.subtract(this._draggable._startPos),
              n = this._offsetLimit;
            e.x < n.min.x && (e.x = this._viscousLimit(e.x, n.min.x)),
              e.y < n.min.y && (e.y = this._viscousLimit(e.y, n.min.y)),
              e.x > n.max.x && (e.x = this._viscousLimit(e.x, n.max.x)),
              e.y > n.max.y && (e.y = this._viscousLimit(e.y, n.max.y)),
              (this._draggable._newPos = this._draggable._startPos.add(e));
          }
        },
        _onPreDragWrap: function () {
          var e = this._worldWidth,
            n = Math.round(e / 2),
            s = this._initialWorldOffset,
            h = this._draggable._newPos.x,
            f = ((h - n + s) % e) + n - s,
            m = ((h + n + s) % e) - n - s,
            x = Math.abs(f + s) < Math.abs(m + s) ? f : m;
          (this._draggable._absPos = this._draggable._newPos.clone()),
            (this._draggable._newPos.x = x);
        },
        _onDragEnd: function (e) {
          var n = this._map,
            s = n.options,
            h = !s.inertia || e.noInertia || this._times.length < 2;
          if ((n.fire('dragend', e), h)) n.fire('moveend');
          else {
            this._prunePositions(+new Date());
            var f = this._lastPos.subtract(this._positions[0]),
              m = (this._lastTime - this._times[0]) / 1e3,
              x = s.easeLinearity,
              z = f.multiplyBy(x / m),
              G = z.distanceTo([0, 0]),
              j = Math.min(s.inertiaMaxSpeed, G),
              Q = z.multiplyBy(j / G),
              ht = j / (s.inertiaDeceleration * x),
              mt = Q.multiplyBy(-ht / 2).round();
            !mt.x && !mt.y
              ? n.fire('moveend')
              : ((mt = n._limitOffset(mt, n.options.maxBounds)),
                _(function () {
                  n.panBy(mt, {
                    duration: ht,
                    easeLinearity: x,
                    noMoveStart: !0,
                    animate: !0,
                  });
                }));
          }
        },
      });
      gt.addInitHook('addHandler', 'dragging', Is),
        gt.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 });
      var zs = ge.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173],
        },
        initialize: function (e) {
          (this._map = e),
            this._setPanDelta(e.options.keyboardPanDelta),
            this._setZoomDelta(e.options.zoomDelta);
        },
        addHooks: function () {
          var e = this._map._container;
          e.tabIndex <= 0 && (e.tabIndex = '0'),
            ft(
              e,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown,
              },
              this
            ),
            this._map.on(
              { focus: this._addHooks, blur: this._removeHooks },
              this
            );
        },
        removeHooks: function () {
          this._removeHooks(),
            xt(
              this._map._container,
              {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown,
              },
              this
            ),
            this._map.off(
              { focus: this._addHooks, blur: this._removeHooks },
              this
            );
        },
        _onMouseDown: function () {
          if (!this._focused) {
            var e = document.body,
              n = document.documentElement,
              s = e.scrollTop || n.scrollTop,
              h = e.scrollLeft || n.scrollLeft;
            this._map._container.focus(), window.scrollTo(h, s);
          }
        },
        _onFocus: function () {
          (this._focused = !0), this._map.fire('focus');
        },
        _onBlur: function () {
          (this._focused = !1), this._map.fire('blur');
        },
        _setPanDelta: function (e) {
          var n = (this._panKeys = {}),
            s = this.keyCodes,
            h,
            f;
          for (h = 0, f = s.left.length; h < f; h++) n[s.left[h]] = [-1 * e, 0];
          for (h = 0, f = s.right.length; h < f; h++) n[s.right[h]] = [e, 0];
          for (h = 0, f = s.down.length; h < f; h++) n[s.down[h]] = [0, e];
          for (h = 0, f = s.up.length; h < f; h++) n[s.up[h]] = [0, -1 * e];
        },
        _setZoomDelta: function (e) {
          var n = (this._zoomKeys = {}),
            s = this.keyCodes,
            h,
            f;
          for (h = 0, f = s.zoomIn.length; h < f; h++) n[s.zoomIn[h]] = e;
          for (h = 0, f = s.zoomOut.length; h < f; h++) n[s.zoomOut[h]] = -e;
        },
        _addHooks: function () {
          ft(document, 'keydown', this._onKeyDown, this);
        },
        _removeHooks: function () {
          xt(document, 'keydown', this._onKeyDown, this);
        },
        _onKeyDown: function (e) {
          if (!(e.altKey || e.ctrlKey || e.metaKey)) {
            var n = e.keyCode,
              s = this._map,
              h;
            if (n in this._panKeys) {
              if (!s._panAnim || !s._panAnim._inProgress)
                if (
                  ((h = this._panKeys[n]),
                  e.shiftKey && (h = E(h).multiplyBy(3)),
                  s.options.maxBounds &&
                    (h = s._limitOffset(E(h), s.options.maxBounds)),
                  s.options.worldCopyJump)
                ) {
                  var f = s.wrapLatLng(
                    s.unproject(s.project(s.getCenter()).add(h))
                  );
                  s.panTo(f);
                } else s.panBy(h);
            } else if (n in this._zoomKeys)
              s.setZoom(s.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[n]);
            else if (n === 27 && s._popup && s._popup.options.closeOnEscapeKey)
              s.closePopup();
            else return;
            je(e);
          }
        },
      });
      gt.addInitHook('addHandler', 'keyboard', zs),
        gt.mergeOptions({
          scrollWheelZoom: !0,
          wheelDebounceTime: 40,
          wheelPxPerZoomLevel: 60,
        });
      var Ns = ge.extend({
        addHooks: function () {
          ft(this._map._container, 'wheel', this._onWheelScroll, this),
            (this._delta = 0);
        },
        removeHooks: function () {
          xt(this._map._container, 'wheel', this._onWheelScroll, this);
        },
        _onWheelScroll: function (e) {
          var n = ls(e),
            s = this._map.options.wheelDebounceTime;
          (this._delta += n),
            (this._lastMousePos = this._map.mouseEventToContainerPoint(e)),
            this._startTime || (this._startTime = +new Date());
          var h = Math.max(s - (+new Date() - this._startTime), 0);
          clearTimeout(this._timer),
            (this._timer = setTimeout(a(this._performZoom, this), h)),
            je(e);
        },
        _performZoom: function () {
          var e = this._map,
            n = e.getZoom(),
            s = this._map.options.zoomSnap || 0;
          e._stop();
          var h = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
            f = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(h))))) / Math.LN2,
            m = s ? Math.ceil(f / s) * s : f,
            x = e._limitZoom(n + (this._delta > 0 ? m : -m)) - n;
          (this._delta = 0),
            (this._startTime = null),
            x &&
              (e.options.scrollWheelZoom === 'center'
                ? e.setZoom(n + x)
                : e.setZoomAround(this._lastMousePos, n + x));
        },
      });
      gt.addInitHook('addHandler', 'scrollWheelZoom', Ns);
      var Hd = 600;
      gt.mergeOptions({
        tapHold: nt.touchNative && nt.safari && nt.mobile,
        tapTolerance: 15,
      });
      var Gs = ge.extend({
        addHooks: function () {
          ft(this._map._container, 'touchstart', this._onDown, this);
        },
        removeHooks: function () {
          xt(this._map._container, 'touchstart', this._onDown, this);
        },
        _onDown: function (e) {
          if ((clearTimeout(this._holdTimeout), e.touches.length === 1)) {
            var n = e.touches[0];
            (this._startPos = this._newPos = new k(n.clientX, n.clientY)),
              (this._holdTimeout = setTimeout(
                a(function () {
                  this._cancel(),
                    this._isTapValid() &&
                      (ft(document, 'touchend', Gt),
                      ft(
                        document,
                        'touchend touchcancel',
                        this._cancelClickPrevent
                      ),
                      this._simulateEvent('contextmenu', n));
                }, this),
                Hd
              )),
              ft(
                document,
                'touchend touchcancel contextmenu',
                this._cancel,
                this
              ),
              ft(document, 'touchmove', this._onMove, this);
          }
        },
        _cancelClickPrevent: function e() {
          xt(document, 'touchend', Gt), xt(document, 'touchend touchcancel', e);
        },
        _cancel: function () {
          clearTimeout(this._holdTimeout),
            xt(
              document,
              'touchend touchcancel contextmenu',
              this._cancel,
              this
            ),
            xt(document, 'touchmove', this._onMove, this);
        },
        _onMove: function (e) {
          var n = e.touches[0];
          this._newPos = new k(n.clientX, n.clientY);
        },
        _isTapValid: function () {
          return (
            this._newPos.distanceTo(this._startPos) <=
            this._map.options.tapTolerance
          );
        },
        _simulateEvent: function (e, n) {
          var s = new MouseEvent(e, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            screenX: n.screenX,
            screenY: n.screenY,
            clientX: n.clientX,
            clientY: n.clientY,
          });
          (s._simulated = !0), n.target.dispatchEvent(s);
        },
      });
      gt.addInitHook('addHandler', 'tapHold', Gs),
        gt.mergeOptions({ touchZoom: nt.touch, bounceAtZoomLimits: !0 });
      var Fs = ge.extend({
        addHooks: function () {
          dt(this._map._container, 'leaflet-touch-zoom'),
            ft(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        removeHooks: function () {
          St(this._map._container, 'leaflet-touch-zoom'),
            xt(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        _onTouchStart: function (e) {
          var n = this._map;
          if (
            !(
              !e.touches ||
              e.touches.length !== 2 ||
              n._animatingZoom ||
              this._zooming
            )
          ) {
            var s = n.mouseEventToContainerPoint(e.touches[0]),
              h = n.mouseEventToContainerPoint(e.touches[1]);
            (this._centerPoint = n.getSize()._divideBy(2)),
              (this._startLatLng = n.containerPointToLatLng(this._centerPoint)),
              n.options.touchZoom !== 'center' &&
                (this._pinchStartLatLng = n.containerPointToLatLng(
                  s.add(h)._divideBy(2)
                )),
              (this._startDist = s.distanceTo(h)),
              (this._startZoom = n.getZoom()),
              (this._moved = !1),
              (this._zooming = !0),
              n._stop(),
              ft(document, 'touchmove', this._onTouchMove, this),
              ft(document, 'touchend touchcancel', this._onTouchEnd, this),
              Gt(e);
          }
        },
        _onTouchMove: function (e) {
          if (!(!e.touches || e.touches.length !== 2 || !this._zooming)) {
            var n = this._map,
              s = n.mouseEventToContainerPoint(e.touches[0]),
              h = n.mouseEventToContainerPoint(e.touches[1]),
              f = s.distanceTo(h) / this._startDist;
            if (
              ((this._zoom = n.getScaleZoom(f, this._startZoom)),
              !n.options.bounceAtZoomLimits &&
                ((this._zoom < n.getMinZoom() && f < 1) ||
                  (this._zoom > n.getMaxZoom() && f > 1)) &&
                (this._zoom = n._limitZoom(this._zoom)),
              n.options.touchZoom === 'center')
            ) {
              if (((this._center = this._startLatLng), f === 1)) return;
            } else {
              var m = s._add(h)._divideBy(2)._subtract(this._centerPoint);
              if (f === 1 && m.x === 0 && m.y === 0) return;
              this._center = n.unproject(
                n.project(this._pinchStartLatLng, this._zoom).subtract(m),
                this._zoom
              );
            }
            this._moved || (n._moveStart(!0, !1), (this._moved = !0)),
              v(this._animRequest);
            var x = a(
              n._move,
              n,
              this._center,
              this._zoom,
              { pinch: !0, round: !1 },
              void 0
            );
            (this._animRequest = _(x, this, !0)), Gt(e);
          }
        },
        _onTouchEnd: function () {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          (this._zooming = !1),
            v(this._animRequest),
            xt(document, 'touchmove', this._onTouchMove, this),
            xt(document, 'touchend touchcancel', this._onTouchEnd, this),
            this._map.options.zoomAnimation
              ? this._map._animateZoom(
                  this._center,
                  this._map._limitZoom(this._zoom),
                  !0,
                  this._map.options.zoomSnap
                )
              : this._map._resetView(
                  this._center,
                  this._map._limitZoom(this._zoom)
                );
        },
      });
      gt.addInitHook('addHandler', 'touchZoom', Fs),
        (gt.BoxZoom = Os),
        (gt.DoubleClickZoom = Rs),
        (gt.Drag = Is),
        (gt.Keyboard = zs),
        (gt.ScrollWheelZoom = Ns),
        (gt.TapHold = Gs),
        (gt.TouchZoom = Fs),
        (t.Bounds = F),
        (t.Browser = nt),
        (t.CRS = lt),
        (t.Canvas = Ts),
        (t.Circle = In),
        (t.CircleMarker = Cr),
        (t.Class = P),
        (t.Control = se),
        (t.DivIcon = Ps),
        (t.DivOverlay = _e),
        (t.DomEvent = hd),
        (t.DomUtil = ad),
        (t.Draggable = Ae),
        (t.Evented = S),
        (t.FeatureGroup = xe),
        (t.GeoJSON = Me),
        (t.GridLayer = Zi),
        (t.Handler = ge),
        (t.Icon = ui),
        (t.ImageOverlay = Br),
        (t.LatLng = et),
        (t.LatLngBounds = J),
        (t.Layer = ae),
        (t.LayerGroup = hi),
        (t.LineUtil = bd),
        (t.Map = gt),
        (t.Marker = Mr),
        (t.Mixin = gd),
        (t.Path = De),
        (t.Point = k),
        (t.PolyUtil = wd),
        (t.Polygon = ci),
        (t.Polyline = ke),
        (t.Popup = Ar),
        (t.PosAnimation = hs),
        (t.Projection = xd),
        (t.Rectangle = Ds),
        (t.Renderer = Ce),
        (t.SVG = Vi),
        (t.SVGOverlay = Cs),
        (t.TileLayer = di),
        (t.Tooltip = Dr),
        (t.Transformation = we),
        (t.Util = T),
        (t.VideoOverlay = Ms),
        (t.bind = a),
        (t.bounds = X),
        (t.canvas = Bs),
        (t.circle = Bd),
        (t.circleMarker = Td),
        (t.control = Gi),
        (t.divIcon = Fd),
        (t.extend = r),
        (t.featureGroup = Pd),
        (t.geoJSON = ks),
        (t.geoJson = Od),
        (t.gridLayer = qd),
        (t.icon = Ed),
        (t.imageOverlay = Rd),
        (t.latLng = ot),
        (t.latLngBounds = it),
        (t.layerGroup = Cd),
        (t.map = ud),
        (t.marker = Sd),
        (t.point = E),
        (t.polygon = Dd),
        (t.polyline = Ad),
        (t.popup = Nd),
        (t.rectangle = Vd),
        (t.setOptions = O),
        (t.stamp = u),
        (t.svg = As),
        (t.svgOverlay = zd),
        (t.tileLayer = Es),
        (t.tooltip = Gd),
        (t.transformation = Nt),
        (t.version = i),
        (t.videoOverlay = Id);
      var jd = window.L;
      (t.noConflict = function () {
        return (window.L = jd), this;
      }),
        (window.L = t);
    });
  });
  var Ks = Z((R0, Zn) => {
    (function (t) {
      var i;
      if (typeof define == 'function' && define.amd) define(['leaflet'], t);
      else if (typeof Zn < 'u') (i = js()), (Zn.exports = t(i));
      else {
        if (typeof window.L > 'u') throw 'Leaflet must be loaded first';
        t(window.L);
      }
    })(function (t) {
      'use strict';
      return (
        (t.Polyline._flat =
          t.LineUtil.isFlat ||
          t.Polyline._flat ||
          function (i) {
            return (
              !t.Util.isArray(i[0]) ||
              (typeof i[0][0] != 'object' && typeof i[0][0] < 'u')
            );
          }),
        (t.GeometryUtil = t.extend(t.GeometryUtil || {}, {
          distance: function (i, r, o) {
            return i.latLngToLayerPoint(r).distanceTo(i.latLngToLayerPoint(o));
          },
          distanceSegment: function (i, r, o, a) {
            var l = i.latLngToLayerPoint(r),
              u = i.latLngToLayerPoint(o),
              c = i.latLngToLayerPoint(a);
            return t.LineUtil.pointToSegmentDistance(l, u, c);
          },
          readableDistance: function (i, r) {
            var o = r !== 'imperial',
              a;
            return (
              o
                ? i > 1e3
                  ? (a = (i / 1e3).toFixed(2) + ' km')
                  : (a = i.toFixed(1) + ' m')
                : ((i *= 1.09361),
                  i > 1760
                    ? (a = (i / 1760).toFixed(2) + ' miles')
                    : (a = i.toFixed(1) + ' yd')),
              a
            );
          },
          belongsSegment: function (i, r, o, a) {
            a = a === void 0 ? 0.2 : a;
            var l = r.distanceTo(o),
              u = r.distanceTo(i) + i.distanceTo(o) - l;
            return u / l < a;
          },
          length: function (i) {
            var r = t.GeometryUtil.accumulatedLengths(i);
            return r.length > 0 ? r[r.length - 1] : 0;
          },
          accumulatedLengths: function (i) {
            if (
              (typeof i.getLatLngs == 'function' && (i = i.getLatLngs()),
              i.length === 0)
            )
              return [];
            for (var r = 0, o = [0], a = 0, l = i.length - 1; a < l; a++)
              (r += i[a].distanceTo(i[a + 1])), o.push(r);
            return o;
          },
          closestOnSegment: function (i, r, o, a) {
            var l = i.getMaxZoom();
            l === 1 / 0 && (l = i.getZoom());
            var u = i.project(r, l),
              c = i.project(o, l),
              d = i.project(a, l),
              p = t.LineUtil.closestPointOnSegment(u, c, d);
            return i.unproject(p, l);
          },
          closestOnCircle: function (i, r) {
            let o = i.getLatLng(),
              a = i.getRadius(),
              l = typeof a == 'number' ? a : a.radius,
              u = r.lng,
              c = r.lat,
              d = o.lng,
              p = o.lat,
              y = u - d,
              b = c - p,
              D = Math.sqrt(y * y + b * b),
              O = d + (y / D) * l,
              q = p + (b / D) * l;
            return new t.LatLng(q, O);
          },
          closest: function (i, r, o, a) {
            var l,
              u = 1 / 0,
              c = null,
              d,
              p,
              y,
              b;
            if (r instanceof Array)
              if (r[0] instanceof Array && typeof r[0][0] != 'number') {
                for (d = 0; d < r.length; d++)
                  (b = t.GeometryUtil.closest(i, r[d], o, a)),
                    b && b.distance < u && ((u = b.distance), (c = b));
                return c;
              } else if (
                r[0] instanceof t.LatLng ||
                typeof r[0][0] == 'number' ||
                typeof r[0].lat == 'number'
              )
                r = t.polyline(r);
              else return c;
            if (!(r instanceof t.Polyline)) return c;
            if (
              ((l = JSON.parse(JSON.stringify(r.getLatLngs().slice(0)))),
              r instanceof t.Polygon)
            ) {
              var D = function (w) {
                if (t.Polyline._flat(w)) w.push(w[0]);
                else for (var B = 0; B < w.length; B++) D(w[B]);
              };
              D(l);
            }
            if (t.Polyline._flat(l)) {
              if (a) {
                for (d = 0, p = l.length; d < p; d++) {
                  var O = l[d];
                  (y = t.GeometryUtil.distance(i, o, O)),
                    y < u && ((u = y), (c = O), (c.distance = y));
                }
                return c;
              }
              for (d = 0, p = l.length; d < p - 1; d++) {
                var q = l[d],
                  $ = l[d + 1];
                (y = t.GeometryUtil.distanceSegment(i, o, q, $)),
                  y <= u &&
                    ((u = y),
                    (c = t.GeometryUtil.closestOnSegment(i, o, q, $)),
                    (c.distance = y));
              }
              return c;
            } else {
              for (d = 0; d < l.length; d++)
                (b = t.GeometryUtil.closest(i, l[d], o, a)),
                  b.distance < u && ((u = b.distance), (c = b));
              return c;
            }
          },
          closestLayer: function (i, r, o) {
            for (
              var a = 1 / 0, l = null, u = null, c = 1 / 0, d = 0, p = r.length;
              d < p;
              d++
            ) {
              var y = r[d];
              if (y instanceof t.LayerGroup) {
                var b = t.GeometryUtil.closestLayer(i, y.getLayers(), o);
                b.distance < a && ((a = b.distance), (l = b));
              } else
                y instanceof t.Circle
                  ? ((u = this.closestOnCircle(y, o)),
                    (c = t.GeometryUtil.distance(i, o, u)))
                  : typeof y.getLatLng == 'function'
                    ? ((u = y.getLatLng()),
                      (c = t.GeometryUtil.distance(i, o, u)))
                    : ((u = t.GeometryUtil.closest(i, y, o)),
                      u && (c = u.distance)),
                  c < a &&
                    ((a = c), (l = { layer: y, latlng: u, distance: c }));
            }
            return l;
          },
          nClosestLayers: function (i, r, o, a) {
            if (
              ((a = typeof a == 'number' ? a : r.length), a < 1 || r.length < 1)
            )
              return null;
            for (var l = [], u, c, d = 0, p = r.length; d < p; d++) {
              var y = r[d];
              if (y instanceof t.LayerGroup) {
                var b = t.GeometryUtil.closestLayer(i, y.getLayers(), o);
                l.push(b);
              } else
                y instanceof t.Circle
                  ? ((c = this.closestOnCircle(y, o)),
                    (u = t.GeometryUtil.distance(i, o, c)))
                  : typeof y.getLatLng == 'function'
                    ? ((c = y.getLatLng()),
                      (u = t.GeometryUtil.distance(i, o, c)))
                    : ((c = t.GeometryUtil.closest(i, y, o)),
                      c && (u = c.distance)),
                  l.push({ layer: y, latlng: c, distance: u });
            }
            return (
              l.sort(function (D, O) {
                return D.distance - O.distance;
              }),
              l.length > a ? l.slice(0, a) : l
            );
          },
          layersWithin: function (i, r, o, a) {
            a = typeof a == 'number' ? a : 1 / 0;
            for (var l = [], u = null, c = 0, d = 0, p = r.length; d < p; d++) {
              var y = r[d];
              typeof y.getLatLng == 'function'
                ? ((u = y.getLatLng()), (c = t.GeometryUtil.distance(i, o, u)))
                : ((u = t.GeometryUtil.closest(i, y, o)),
                  u && (c = u.distance)),
                u && c < a && l.push({ layer: y, latlng: u, distance: c });
            }
            var b = l.sort(function (D, O) {
              return D.distance - O.distance;
            });
            return b;
          },
          closestLayerSnap: function (i, r, o, a, l) {
            (a = typeof a == 'number' ? a : 1 / 0),
              (l = typeof l == 'boolean' ? l : !0);
            var u = t.GeometryUtil.closestLayer(i, r, o);
            if (!u || u.distance > a) return null;
            if (l && typeof u.layer.getLatLngs == 'function') {
              var c = t.GeometryUtil.closest(i, u.layer, u.latlng, !0);
              c.distance < a &&
                ((u.latlng = c),
                (u.distance = t.GeometryUtil.distance(i, c, o)));
            }
            return u;
          },
          interpolateOnPointSegment: function (i, r, o) {
            return t.point(i.x * (1 - o) + o * r.x, i.y * (1 - o) + o * r.y);
          },
          interpolateOnLine: function (i, r, o) {
            r = r instanceof t.Polyline ? r.getLatLngs() : r;
            var a = r.length;
            if (a < 2) return null;
            if (((o = Math.max(Math.min(o, 1), 0)), o === 0))
              return {
                latLng: r[0] instanceof t.LatLng ? r[0] : t.latLng(r[0]),
                predecessor: -1,
              };
            if (o == 1)
              return {
                latLng:
                  r[r.length - 1] instanceof t.LatLng
                    ? r[r.length - 1]
                    : t.latLng(r[r.length - 1]),
                predecessor: r.length - 2,
              };
            var l = i.getMaxZoom();
            l === 1 / 0 && (l = i.getZoom());
            for (var u = [], c = 0, d = 0; d < a; d++)
              (u[d] = i.project(r[d], l)),
                d > 0 && (c += u[d - 1].distanceTo(u[d]));
            for (var p = c * o, y = 0, b = 0, d = 0; b < p; d++) {
              var D = u[d],
                O = u[d + 1];
              (y = b), (b += D.distanceTo(O));
            }
            if (D == null && O == null)
              var D = u[0],
                O = u[1],
                d = 1;
            var q = b - y !== 0 ? (p - y) / (b - y) : 0,
              $ = t.GeometryUtil.interpolateOnPointSegment(D, O, q);
            return { latLng: i.unproject($, l), predecessor: d - 1 };
          },
          locateOnLine: function (i, r, o) {
            var a = r.getLatLngs();
            if (o.equals(a[0])) return 0;
            if (o.equals(a[a.length - 1])) return 1;
            for (
              var l = t.GeometryUtil.closest(i, r, o, !1),
                u = t.GeometryUtil.accumulatedLengths(a),
                c = u[u.length - 1],
                d = 0,
                p = !1,
                y = 0,
                b = a.length - 1;
              y < b;
              y++
            ) {
              var D = a[y],
                O = a[y + 1];
              if (((d = u[y]), t.GeometryUtil.belongsSegment(l, D, O, 0.001))) {
                (d += D.distanceTo(l)), (p = !0);
                break;
              }
            }
            if (!p)
              throw (
                'Could not interpolate ' +
                o.toString() +
                ' within ' +
                r.toString()
              );
            return d / c;
          },
          reverse: function (i) {
            return t.polyline(i.getLatLngs().slice(0).reverse());
          },
          extract: function (i, r, o, a) {
            if (o > a)
              return t.GeometryUtil.extract(
                i,
                t.GeometryUtil.reverse(r),
                1 - o,
                1 - a
              );
            (o = Math.max(Math.min(o, 1), 0)),
              (a = Math.max(Math.min(a, 1), 0));
            var l = r.getLatLngs(),
              u = t.GeometryUtil.interpolateOnLine(i, r, o),
              c = t.GeometryUtil.interpolateOnLine(i, r, a);
            if (o == a) {
              var d = t.GeometryUtil.interpolateOnLine(i, r, a);
              return [d.latLng];
            }
            u.predecessor == -1 && (u.predecessor = 0),
              c.predecessor == -1 && (c.predecessor = 0);
            var p = l.slice(u.predecessor + 1, c.predecessor + 1);
            return p.unshift(u.latLng), p.push(c.latLng), p;
          },
          isBefore: function (i, r) {
            if (!r) return !1;
            var o = i.getLatLngs(),
              a = r.getLatLngs();
            return o[o.length - 1].equals(a[0]);
          },
          isAfter: function (i, r) {
            if (!r) return !1;
            var o = i.getLatLngs(),
              a = r.getLatLngs();
            return o[0].equals(a[a.length - 1]);
          },
          startsAtExtremity: function (i, r) {
            if (!r) return !1;
            var o = i.getLatLngs(),
              a = r.getLatLngs(),
              l = o[0];
            return l.equals(a[0]) || l.equals(a[a.length - 1]);
          },
          computeAngle: function (i, r) {
            return (Math.atan2(r.y - i.y, r.x - i.x) * 180) / Math.PI;
          },
          computeSlope: function (i, r) {
            var o = (r.y - i.y) / (r.x - i.x),
              a = i.y - o * i.x;
            return { a: o, b: a };
          },
          rotatePoint: function (i, r, o, a) {
            var l = i.getMaxZoom();
            l === 1 / 0 && (l = i.getZoom());
            var u = (o * Math.PI) / 180,
              c = i.project(r, l),
              d = i.project(a, l),
              p = Math.cos(u) * (c.x - d.x) - Math.sin(u) * (c.y - d.y) + d.x,
              y = Math.sin(u) * (c.x - d.x) + Math.cos(u) * (c.y - d.y) + d.y;
            return i.unproject(new t.Point(p, y), l);
          },
          bearing: function (i, r) {
            var o = Math.PI / 180,
              a = i.lat * o,
              l = r.lat * o,
              u = i.lng * o,
              c = r.lng * o,
              d = Math.sin(c - u) * Math.cos(l),
              p =
                Math.cos(a) * Math.sin(l) -
                Math.sin(a) * Math.cos(l) * Math.cos(c - u),
              y = ((Math.atan2(d, p) * 180) / Math.PI + 360) % 360;
            return y >= 180 ? y - 360 : y;
          },
          destination: function (i, r, o) {
            r = (r + 360) % 360;
            var a = Math.PI / 180,
              l = 180 / Math.PI,
              u = t.CRS.Earth.R,
              c = i.lng * a,
              d = i.lat * a,
              p = r * a,
              y = Math.sin(d),
              b = Math.cos(d),
              D = Math.cos(o / u),
              O = Math.sin(o / u),
              q = Math.asin(y * D + b * O * Math.cos(p)),
              $ = c + Math.atan2(Math.sin(p) * O * b, D - y * Math.sin(q));
            return (
              ($ = $ * l),
              ($ = $ > 180 ? $ - 360 : $ < -180 ? $ + 360 : $),
              t.latLng([q * l, $])
            );
          },
          angle: function (i, r, o) {
            var a = i.latLngToContainerPoint(r),
              l = i.latLngToContainerPoint(o),
              u = (Math.atan2(l.y - a.y, l.x - a.x) * 180) / Math.PI + 90;
            return (u += u < 0 ? 360 : 0), u;
          },
          destinationOnSegment: function (i, r, o, a) {
            var l = t.GeometryUtil.angle(i, r, o),
              u = t.GeometryUtil.destination(r, l, a);
            return t.GeometryUtil.closestOnSegment(i, u, r, o);
          },
        })),
        t.GeometryUtil
      );
    });
  });
  var Xs = Z((N0, Ys) => {
    function up() {
      (this.__data__ = []), (this.size = 0);
    }
    Ys.exports = up;
  });
  var Hi = Z((G0, Js) => {
    function cp(t, i) {
      return t === i || (t !== t && i !== i);
    }
    Js.exports = cp;
  });
  var ji = Z((F0, Qs) => {
    var fp = Hi();
    function dp(t, i) {
      for (var r = t.length; r--; ) if (fp(t[r][0], i)) return r;
      return -1;
    }
    Qs.exports = dp;
  });
  var ea = Z((q0, ta) => {
    var pp = ji(),
      mp = Array.prototype,
      gp = mp.splice;
    function _p(t) {
      var i = this.__data__,
        r = pp(i, t);
      if (r < 0) return !1;
      var o = i.length - 1;
      return r == o ? i.pop() : gp.call(i, r, 1), --this.size, !0;
    }
    ta.exports = _p;
  });
  var ra = Z((Z0, ia) => {
    var yp = ji();
    function vp(t) {
      var i = this.__data__,
        r = yp(i, t);
      return r < 0 ? void 0 : i[r][1];
    }
    ia.exports = vp;
  });
  var oa = Z((U0, na) => {
    var Lp = ji();
    function bp(t) {
      return Lp(this.__data__, t) > -1;
    }
    na.exports = bp;
  });
  var aa = Z((V0, sa) => {
    var wp = ji();
    function xp(t, i) {
      var r = this.__data__,
        o = wp(r, t);
      return o < 0 ? (++this.size, r.push([t, i])) : (r[o][1] = i), this;
    }
    sa.exports = xp;
  });
  var Ki = Z((H0, la) => {
    var kp = Xs(),
      Mp = ea(),
      Cp = ra(),
      Pp = oa(),
      Ep = aa();
    function pi(t) {
      var i = -1,
        r = t == null ? 0 : t.length;
      for (this.clear(); ++i < r; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    pi.prototype.clear = kp;
    pi.prototype.delete = Mp;
    pi.prototype.get = Cp;
    pi.prototype.has = Pp;
    pi.prototype.set = Ep;
    la.exports = pi;
  });
  var ua = Z((j0, ha) => {
    var Sp = Ki();
    function Tp() {
      (this.__data__ = new Sp()), (this.size = 0);
    }
    ha.exports = Tp;
  });
  var fa = Z((K0, ca) => {
    function Bp(t) {
      var i = this.__data__,
        r = i.delete(t);
      return (this.size = i.size), r;
    }
    ca.exports = Bp;
  });
  var pa = Z((W0, da) => {
    function Ap(t) {
      return this.__data__.get(t);
    }
    da.exports = Ap;
  });
  var ga = Z(($0, ma) => {
    function Dp(t) {
      return this.__data__.has(t);
    }
    ma.exports = Dp;
  });
  var Vn = Z((Y0, _a) => {
    var Op =
      typeof global == 'object' && global && global.Object === Object && global;
    _a.exports = Op;
  });
  var $e = Z((X0, ya) => {
    var Rp = Vn(),
      Ip = typeof self == 'object' && self && self.Object === Object && self,
      zp = Rp || Ip || Function('return this')();
    ya.exports = zp;
  });
  var Fr = Z((J0, va) => {
    var Np = $e(),
      Gp = Np.Symbol;
    va.exports = Gp;
  });
  var xa = Z((Q0, wa) => {
    var La = Fr(),
      ba = Object.prototype,
      Fp = ba.hasOwnProperty,
      qp = ba.toString,
      Wi = La ? La.toStringTag : void 0;
    function Zp(t) {
      var i = Fp.call(t, Wi),
        r = t[Wi];
      try {
        t[Wi] = void 0;
        var o = !0;
      } catch {}
      var a = qp.call(t);
      return o && (i ? (t[Wi] = r) : delete t[Wi]), a;
    }
    wa.exports = Zp;
  });
  var Ma = Z((tw, ka) => {
    var Up = Object.prototype,
      Vp = Up.toString;
    function Hp(t) {
      return Vp.call(t);
    }
    ka.exports = Hp;
  });
  var mi = Z((ew, Ea) => {
    var Ca = Fr(),
      jp = xa(),
      Kp = Ma(),
      Wp = '[object Null]',
      $p = '[object Undefined]',
      Pa = Ca ? Ca.toStringTag : void 0;
    function Yp(t) {
      return t == null
        ? t === void 0
          ? $p
          : Wp
        : Pa && Pa in Object(t)
          ? jp(t)
          : Kp(t);
    }
    Ea.exports = Yp;
  });
  var Re = Z((iw, Sa) => {
    function Xp(t) {
      var i = typeof t;
      return t != null && (i == 'object' || i == 'function');
    }
    Sa.exports = Xp;
  });
  var qr = Z((rw, Ta) => {
    var Jp = mi(),
      Qp = Re(),
      tm = '[object AsyncFunction]',
      em = '[object Function]',
      im = '[object GeneratorFunction]',
      rm = '[object Proxy]';
    function nm(t) {
      if (!Qp(t)) return !1;
      var i = Jp(t);
      return i == em || i == im || i == tm || i == rm;
    }
    Ta.exports = nm;
  });
  var Aa = Z((nw, Ba) => {
    var om = $e(),
      sm = om['__core-js_shared__'];
    Ba.exports = sm;
  });
  var Ra = Z((ow, Oa) => {
    var Hn = Aa(),
      Da = (function () {
        var t = /[^.]+$/.exec((Hn && Hn.keys && Hn.keys.IE_PROTO) || '');
        return t ? 'Symbol(src)_1.' + t : '';
      })();
    function am(t) {
      return !!Da && Da in t;
    }
    Oa.exports = am;
  });
  var za = Z((sw, Ia) => {
    var lm = Function.prototype,
      hm = lm.toString;
    function um(t) {
      if (t != null) {
        try {
          return hm.call(t);
        } catch {}
        try {
          return t + '';
        } catch {}
      }
      return '';
    }
    Ia.exports = um;
  });
  var Ga = Z((aw, Na) => {
    var cm = qr(),
      fm = Ra(),
      dm = Re(),
      pm = za(),
      mm = /[\\^$.*+?()[\]{}|]/g,
      gm = /^\[object .+?Constructor\]$/,
      _m = Function.prototype,
      ym = Object.prototype,
      vm = _m.toString,
      Lm = ym.hasOwnProperty,
      bm = RegExp(
        '^' +
          vm
            .call(Lm)
            .replace(mm, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      );
    function wm(t) {
      if (!dm(t) || fm(t)) return !1;
      var i = cm(t) ? bm : gm;
      return i.test(pm(t));
    }
    Na.exports = wm;
  });
  var qa = Z((lw, Fa) => {
    function xm(t, i) {
      return t?.[i];
    }
    Fa.exports = xm;
  });
  var Zr = Z((hw, Za) => {
    var km = Ga(),
      Mm = qa();
    function Cm(t, i) {
      var r = Mm(t, i);
      return km(r) ? r : void 0;
    }
    Za.exports = Cm;
  });
  var jn = Z((uw, Ua) => {
    var Pm = Zr(),
      Em = $e(),
      Sm = Pm(Em, 'Map');
    Ua.exports = Sm;
  });
  var $i = Z((cw, Va) => {
    var Tm = Zr(),
      Bm = Tm(Object, 'create');
    Va.exports = Bm;
  });
  var Ka = Z((fw, ja) => {
    var Ha = $i();
    function Am() {
      (this.__data__ = Ha ? Ha(null) : {}), (this.size = 0);
    }
    ja.exports = Am;
  });
  var $a = Z((dw, Wa) => {
    function Dm(t) {
      var i = this.has(t) && delete this.__data__[t];
      return (this.size -= i ? 1 : 0), i;
    }
    Wa.exports = Dm;
  });
  var Xa = Z((pw, Ya) => {
    var Om = $i(),
      Rm = '__lodash_hash_undefined__',
      Im = Object.prototype,
      zm = Im.hasOwnProperty;
    function Nm(t) {
      var i = this.__data__;
      if (Om) {
        var r = i[t];
        return r === Rm ? void 0 : r;
      }
      return zm.call(i, t) ? i[t] : void 0;
    }
    Ya.exports = Nm;
  });
  var Qa = Z((mw, Ja) => {
    var Gm = $i(),
      Fm = Object.prototype,
      qm = Fm.hasOwnProperty;
    function Zm(t) {
      var i = this.__data__;
      return Gm ? i[t] !== void 0 : qm.call(i, t);
    }
    Ja.exports = Zm;
  });
  var el = Z((gw, tl) => {
    var Um = $i(),
      Vm = '__lodash_hash_undefined__';
    function Hm(t, i) {
      var r = this.__data__;
      return (
        (this.size += this.has(t) ? 0 : 1),
        (r[t] = Um && i === void 0 ? Vm : i),
        this
      );
    }
    tl.exports = Hm;
  });
  var rl = Z((_w, il) => {
    var jm = Ka(),
      Km = $a(),
      Wm = Xa(),
      $m = Qa(),
      Ym = el();
    function gi(t) {
      var i = -1,
        r = t == null ? 0 : t.length;
      for (this.clear(); ++i < r; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    gi.prototype.clear = jm;
    gi.prototype.delete = Km;
    gi.prototype.get = Wm;
    gi.prototype.has = $m;
    gi.prototype.set = Ym;
    il.exports = gi;
  });
  var sl = Z((yw, ol) => {
    var nl = rl(),
      Xm = Ki(),
      Jm = jn();
    function Qm() {
      (this.size = 0),
        (this.__data__ = {
          hash: new nl(),
          map: new (Jm || Xm)(),
          string: new nl(),
        });
    }
    ol.exports = Qm;
  });
  var ll = Z((vw, al) => {
    function tg(t) {
      var i = typeof t;
      return i == 'string' || i == 'number' || i == 'symbol' || i == 'boolean'
        ? t !== '__proto__'
        : t === null;
    }
    al.exports = tg;
  });
  var Yi = Z((Lw, hl) => {
    var eg = ll();
    function ig(t, i) {
      var r = t.__data__;
      return eg(i) ? r[typeof i == 'string' ? 'string' : 'hash'] : r.map;
    }
    hl.exports = ig;
  });
  var cl = Z((bw, ul) => {
    var rg = Yi();
    function ng(t) {
      var i = rg(this, t).delete(t);
      return (this.size -= i ? 1 : 0), i;
    }
    ul.exports = ng;
  });
  var dl = Z((ww, fl) => {
    var og = Yi();
    function sg(t) {
      return og(this, t).get(t);
    }
    fl.exports = sg;
  });
  var ml = Z((xw, pl) => {
    var ag = Yi();
    function lg(t) {
      return ag(this, t).has(t);
    }
    pl.exports = lg;
  });
  var _l = Z((kw, gl) => {
    var hg = Yi();
    function ug(t, i) {
      var r = hg(this, t),
        o = r.size;
      return r.set(t, i), (this.size += r.size == o ? 0 : 1), this;
    }
    gl.exports = ug;
  });
  var Kn = Z((Mw, yl) => {
    var cg = sl(),
      fg = cl(),
      dg = dl(),
      pg = ml(),
      mg = _l();
    function _i(t) {
      var i = -1,
        r = t == null ? 0 : t.length;
      for (this.clear(); ++i < r; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    _i.prototype.clear = cg;
    _i.prototype.delete = fg;
    _i.prototype.get = dg;
    _i.prototype.has = pg;
    _i.prototype.set = mg;
    yl.exports = _i;
  });
  var Ll = Z((Cw, vl) => {
    var gg = Ki(),
      _g = jn(),
      yg = Kn(),
      vg = 200;
    function Lg(t, i) {
      var r = this.__data__;
      if (r instanceof gg) {
        var o = r.__data__;
        if (!_g || o.length < vg - 1)
          return o.push([t, i]), (this.size = ++r.size), this;
        r = this.__data__ = new yg(o);
      }
      return r.set(t, i), (this.size = r.size), this;
    }
    vl.exports = Lg;
  });
  var wl = Z((Pw, bl) => {
    var bg = Ki(),
      wg = ua(),
      xg = fa(),
      kg = pa(),
      Mg = ga(),
      Cg = Ll();
    function yi(t) {
      var i = (this.__data__ = new bg(t));
      this.size = i.size;
    }
    yi.prototype.clear = wg;
    yi.prototype.delete = xg;
    yi.prototype.get = kg;
    yi.prototype.has = Mg;
    yi.prototype.set = Cg;
    bl.exports = yi;
  });
  var Wn = Z((Ew, xl) => {
    var Pg = Zr(),
      Eg = (function () {
        try {
          var t = Pg(Object, 'defineProperty');
          return t({}, '', {}), t;
        } catch {}
      })();
    xl.exports = Eg;
  });
  var Ur = Z((Sw, Ml) => {
    var kl = Wn();
    function Sg(t, i, r) {
      i == '__proto__' && kl
        ? kl(t, i, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (t[i] = r);
    }
    Ml.exports = Sg;
  });
  var $n = Z((Tw, Cl) => {
    var Tg = Ur(),
      Bg = Hi();
    function Ag(t, i, r) {
      ((r !== void 0 && !Bg(t[i], r)) || (r === void 0 && !(i in t))) &&
        Tg(t, i, r);
    }
    Cl.exports = Ag;
  });
  var El = Z((Bw, Pl) => {
    function Dg(t) {
      return function (i, r, o) {
        for (var a = -1, l = Object(i), u = o(i), c = u.length; c--; ) {
          var d = u[t ? c : ++a];
          if (r(l[d], d, l) === !1) break;
        }
        return i;
      };
    }
    Pl.exports = Dg;
  });
  var Tl = Z((Aw, Sl) => {
    var Og = El(),
      Rg = Og();
    Sl.exports = Rg;
  });
  var Rl = Z((Xi, vi) => {
    var Ig = $e(),
      Ol = typeof Xi == 'object' && Xi && !Xi.nodeType && Xi,
      Bl = Ol && typeof vi == 'object' && vi && !vi.nodeType && vi,
      zg = Bl && Bl.exports === Ol,
      Al = zg ? Ig.Buffer : void 0,
      Dl = Al ? Al.allocUnsafe : void 0;
    function Ng(t, i) {
      if (i) return t.slice();
      var r = t.length,
        o = Dl ? Dl(r) : new t.constructor(r);
      return t.copy(o), o;
    }
    vi.exports = Ng;
  });
  var zl = Z((Dw, Il) => {
    var Gg = $e(),
      Fg = Gg.Uint8Array;
    Il.exports = Fg;
  });
  var Fl = Z((Ow, Gl) => {
    var Nl = zl();
    function qg(t) {
      var i = new t.constructor(t.byteLength);
      return new Nl(i).set(new Nl(t)), i;
    }
    Gl.exports = qg;
  });
  var Zl = Z((Rw, ql) => {
    var Zg = Fl();
    function Ug(t, i) {
      var r = i ? Zg(t.buffer) : t.buffer;
      return new t.constructor(r, t.byteOffset, t.length);
    }
    ql.exports = Ug;
  });
  var Vl = Z((Iw, Ul) => {
    function Vg(t, i) {
      var r = -1,
        o = t.length;
      for (i || (i = Array(o)); ++r < o; ) i[r] = t[r];
      return i;
    }
    Ul.exports = Vg;
  });
  var Kl = Z((zw, jl) => {
    var Hg = Re(),
      Hl = Object.create,
      jg = (function () {
        function t() {}
        return function (i) {
          if (!Hg(i)) return {};
          if (Hl) return Hl(i);
          t.prototype = i;
          var r = new t();
          return (t.prototype = void 0), r;
        };
      })();
    jl.exports = jg;
  });
  var $l = Z((Nw, Wl) => {
    function Kg(t, i) {
      return function (r) {
        return t(i(r));
      };
    }
    Wl.exports = Kg;
  });
  var Yn = Z((Gw, Yl) => {
    var Wg = $l(),
      $g = Wg(Object.getPrototypeOf, Object);
    Yl.exports = $g;
  });
  var Xn = Z((Fw, Xl) => {
    var Yg = Object.prototype;
    function Xg(t) {
      var i = t && t.constructor,
        r = (typeof i == 'function' && i.prototype) || Yg;
      return t === r;
    }
    Xl.exports = Xg;
  });
  var Ql = Z((qw, Jl) => {
    var Jg = Kl(),
      Qg = Yn(),
      t_ = Xn();
    function e_(t) {
      return typeof t.constructor == 'function' && !t_(t) ? Jg(Qg(t)) : {};
    }
    Jl.exports = e_;
  });
  var Ye = Z((Zw, th) => {
    function i_(t) {
      return t != null && typeof t == 'object';
    }
    th.exports = i_;
  });
  var ih = Z((Uw, eh) => {
    var r_ = mi(),
      n_ = Ye(),
      o_ = '[object Arguments]';
    function s_(t) {
      return n_(t) && r_(t) == o_;
    }
    eh.exports = s_;
  });
  var Jn = Z((Vw, oh) => {
    var rh = ih(),
      a_ = Ye(),
      nh = Object.prototype,
      l_ = nh.hasOwnProperty,
      h_ = nh.propertyIsEnumerable,
      u_ = rh(
        (function () {
          return arguments;
        })()
      )
        ? rh
        : function (t) {
            return a_(t) && l_.call(t, 'callee') && !h_.call(t, 'callee');
          };
    oh.exports = u_;
  });
  var Li = Z((Hw, sh) => {
    var c_ = Array.isArray;
    sh.exports = c_;
  });
  var Qn = Z((jw, ah) => {
    var f_ = 9007199254740991;
    function d_(t) {
      return typeof t == 'number' && t > -1 && t % 1 == 0 && t <= f_;
    }
    ah.exports = d_;
  });
  var Vr = Z((Kw, lh) => {
    var p_ = qr(),
      m_ = Qn();
    function g_(t) {
      return t != null && m_(t.length) && !p_(t);
    }
    lh.exports = g_;
  });
  var uh = Z((Ww, hh) => {
    var __ = Vr(),
      y_ = Ye();
    function v_(t) {
      return y_(t) && __(t);
    }
    hh.exports = v_;
  });
  var fh = Z(($w, ch) => {
    function L_() {
      return !1;
    }
    ch.exports = L_;
  });
  var to = Z((Ji, bi) => {
    var b_ = $e(),
      w_ = fh(),
      mh = typeof Ji == 'object' && Ji && !Ji.nodeType && Ji,
      dh = mh && typeof bi == 'object' && bi && !bi.nodeType && bi,
      x_ = dh && dh.exports === mh,
      ph = x_ ? b_.Buffer : void 0,
      k_ = ph ? ph.isBuffer : void 0,
      M_ = k_ || w_;
    bi.exports = M_;
  });
  var yh = Z((Yw, _h) => {
    var C_ = mi(),
      P_ = Yn(),
      E_ = Ye(),
      S_ = '[object Object]',
      T_ = Function.prototype,
      B_ = Object.prototype,
      gh = T_.toString,
      A_ = B_.hasOwnProperty,
      D_ = gh.call(Object);
    function O_(t) {
      if (!E_(t) || C_(t) != S_) return !1;
      var i = P_(t);
      if (i === null) return !0;
      var r = A_.call(i, 'constructor') && i.constructor;
      return typeof r == 'function' && r instanceof r && gh.call(r) == D_;
    }
    _h.exports = O_;
  });
  var Lh = Z((Xw, vh) => {
    var R_ = mi(),
      I_ = Qn(),
      z_ = Ye(),
      N_ = '[object Arguments]',
      G_ = '[object Array]',
      F_ = '[object Boolean]',
      q_ = '[object Date]',
      Z_ = '[object Error]',
      U_ = '[object Function]',
      V_ = '[object Map]',
      H_ = '[object Number]',
      j_ = '[object Object]',
      K_ = '[object RegExp]',
      W_ = '[object Set]',
      $_ = '[object String]',
      Y_ = '[object WeakMap]',
      X_ = '[object ArrayBuffer]',
      J_ = '[object DataView]',
      Q_ = '[object Float32Array]',
      ty = '[object Float64Array]',
      ey = '[object Int8Array]',
      iy = '[object Int16Array]',
      ry = '[object Int32Array]',
      ny = '[object Uint8Array]',
      oy = '[object Uint8ClampedArray]',
      sy = '[object Uint16Array]',
      ay = '[object Uint32Array]',
      Mt = {};
    Mt[Q_] =
      Mt[ty] =
      Mt[ey] =
      Mt[iy] =
      Mt[ry] =
      Mt[ny] =
      Mt[oy] =
      Mt[sy] =
      Mt[ay] =
        !0;
    Mt[N_] =
      Mt[G_] =
      Mt[X_] =
      Mt[F_] =
      Mt[J_] =
      Mt[q_] =
      Mt[Z_] =
      Mt[U_] =
      Mt[V_] =
      Mt[H_] =
      Mt[j_] =
      Mt[K_] =
      Mt[W_] =
      Mt[$_] =
      Mt[Y_] =
        !1;
    function ly(t) {
      return z_(t) && I_(t.length) && !!Mt[R_(t)];
    }
    vh.exports = ly;
  });
  var wh = Z((Jw, bh) => {
    function hy(t) {
      return function (i) {
        return t(i);
      };
    }
    bh.exports = hy;
  });
  var kh = Z((Qi, wi) => {
    var uy = Vn(),
      xh = typeof Qi == 'object' && Qi && !Qi.nodeType && Qi,
      tr = xh && typeof wi == 'object' && wi && !wi.nodeType && wi,
      cy = tr && tr.exports === xh,
      eo = cy && uy.process,
      fy = (function () {
        try {
          var t = tr && tr.require && tr.require('util').types;
          return t || (eo && eo.binding && eo.binding('util'));
        } catch {}
      })();
    wi.exports = fy;
  });
  var io = Z((Qw, Ph) => {
    var dy = Lh(),
      py = wh(),
      Mh = kh(),
      Ch = Mh && Mh.isTypedArray,
      my = Ch ? py(Ch) : dy;
    Ph.exports = my;
  });
  var ro = Z((tx, Eh) => {
    function gy(t, i) {
      if (
        !(i === 'constructor' && typeof t[i] == 'function') &&
        i != '__proto__'
      )
        return t[i];
    }
    Eh.exports = gy;
  });
  var Th = Z((ex, Sh) => {
    var _y = Ur(),
      yy = Hi(),
      vy = Object.prototype,
      Ly = vy.hasOwnProperty;
    function by(t, i, r) {
      var o = t[i];
      (!(Ly.call(t, i) && yy(o, r)) || (r === void 0 && !(i in t))) &&
        _y(t, i, r);
    }
    Sh.exports = by;
  });
  var Ah = Z((ix, Bh) => {
    var wy = Th(),
      xy = Ur();
    function ky(t, i, r, o) {
      var a = !r;
      r || (r = {});
      for (var l = -1, u = i.length; ++l < u; ) {
        var c = i[l],
          d = o ? o(r[c], t[c], c, r, t) : void 0;
        d === void 0 && (d = t[c]), a ? xy(r, c, d) : wy(r, c, d);
      }
      return r;
    }
    Bh.exports = ky;
  });
  var Oh = Z((rx, Dh) => {
    function My(t, i) {
      for (var r = -1, o = Array(t); ++r < t; ) o[r] = i(r);
      return o;
    }
    Dh.exports = My;
  });
  var no = Z((nx, Rh) => {
    var Cy = 9007199254740991,
      Py = /^(?:0|[1-9]\d*)$/;
    function Ey(t, i) {
      var r = typeof t;
      return (
        (i = i ?? Cy),
        !!i &&
          (r == 'number' || (r != 'symbol' && Py.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < i
      );
    }
    Rh.exports = Ey;
  });
  var zh = Z((ox, Ih) => {
    var Sy = Oh(),
      Ty = Jn(),
      By = Li(),
      Ay = to(),
      Dy = no(),
      Oy = io(),
      Ry = Object.prototype,
      Iy = Ry.hasOwnProperty;
    function zy(t, i) {
      var r = By(t),
        o = !r && Ty(t),
        a = !r && !o && Ay(t),
        l = !r && !o && !a && Oy(t),
        u = r || o || a || l,
        c = u ? Sy(t.length, String) : [],
        d = c.length;
      for (var p in t)
        (i || Iy.call(t, p)) &&
          !(
            u &&
            (p == 'length' ||
              (a && (p == 'offset' || p == 'parent')) ||
              (l &&
                (p == 'buffer' || p == 'byteLength' || p == 'byteOffset')) ||
              Dy(p, d))
          ) &&
          c.push(p);
      return c;
    }
    Ih.exports = zy;
  });
  var Gh = Z((sx, Nh) => {
    function Ny(t) {
      var i = [];
      if (t != null) for (var r in Object(t)) i.push(r);
      return i;
    }
    Nh.exports = Ny;
  });
  var qh = Z((ax, Fh) => {
    var Gy = Re(),
      Fy = Xn(),
      qy = Gh(),
      Zy = Object.prototype,
      Uy = Zy.hasOwnProperty;
    function Vy(t) {
      if (!Gy(t)) return qy(t);
      var i = Fy(t),
        r = [];
      for (var o in t)
        (o == 'constructor' && (i || !Uy.call(t, o))) || r.push(o);
      return r;
    }
    Fh.exports = Vy;
  });
  var oo = Z((lx, Zh) => {
    var Hy = zh(),
      jy = qh(),
      Ky = Vr();
    function Wy(t) {
      return Ky(t) ? Hy(t, !0) : jy(t);
    }
    Zh.exports = Wy;
  });
  var Vh = Z((hx, Uh) => {
    var $y = Ah(),
      Yy = oo();
    function Xy(t) {
      return $y(t, Yy(t));
    }
    Uh.exports = Xy;
  });
  var Yh = Z((ux, $h) => {
    var Hh = $n(),
      Jy = Rl(),
      Qy = Zl(),
      tv = Vl(),
      ev = Ql(),
      jh = Jn(),
      Kh = Li(),
      iv = uh(),
      rv = to(),
      nv = qr(),
      ov = Re(),
      sv = yh(),
      av = io(),
      Wh = ro(),
      lv = Vh();
    function hv(t, i, r, o, a, l, u) {
      var c = Wh(t, r),
        d = Wh(i, r),
        p = u.get(d);
      if (p) {
        Hh(t, r, p);
        return;
      }
      var y = l ? l(c, d, r + '', t, i, u) : void 0,
        b = y === void 0;
      if (b) {
        var D = Kh(d),
          O = !D && rv(d),
          q = !D && !O && av(d);
        (y = d),
          D || O || q
            ? Kh(c)
              ? (y = c)
              : iv(c)
                ? (y = tv(c))
                : O
                  ? ((b = !1), (y = Jy(d, !0)))
                  : q
                    ? ((b = !1), (y = Qy(d, !0)))
                    : (y = [])
            : sv(d) || jh(d)
              ? ((y = c),
                jh(c) ? (y = lv(c)) : (!ov(c) || nv(c)) && (y = ev(d)))
              : (b = !1);
      }
      b && (u.set(d, y), a(y, d, o, l, u), u.delete(d)), Hh(t, r, y);
    }
    $h.exports = hv;
  });
  var Qh = Z((cx, Jh) => {
    var uv = wl(),
      cv = $n(),
      fv = Tl(),
      dv = Yh(),
      pv = Re(),
      mv = oo(),
      gv = ro();
    function Xh(t, i, r, o, a) {
      t !== i &&
        fv(
          i,
          function (l, u) {
            if ((a || (a = new uv()), pv(l))) dv(t, i, u, r, Xh, o, a);
            else {
              var c = o ? o(gv(t, u), l, u + '', t, i, a) : void 0;
              c === void 0 && (c = l), cv(t, u, c);
            }
          },
          mv
        );
    }
    Jh.exports = Xh;
  });
  var so = Z((fx, tu) => {
    function _v(t) {
      return t;
    }
    tu.exports = _v;
  });
  var iu = Z((dx, eu) => {
    function yv(t, i, r) {
      switch (r.length) {
        case 0:
          return t.call(i);
        case 1:
          return t.call(i, r[0]);
        case 2:
          return t.call(i, r[0], r[1]);
        case 3:
          return t.call(i, r[0], r[1], r[2]);
      }
      return t.apply(i, r);
    }
    eu.exports = yv;
  });
  var ou = Z((px, nu) => {
    var vv = iu(),
      ru = Math.max;
    function Lv(t, i, r) {
      return (
        (i = ru(i === void 0 ? t.length - 1 : i, 0)),
        function () {
          for (
            var o = arguments, a = -1, l = ru(o.length - i, 0), u = Array(l);
            ++a < l;

          )
            u[a] = o[i + a];
          a = -1;
          for (var c = Array(i + 1); ++a < i; ) c[a] = o[a];
          return (c[i] = r(u)), vv(t, this, c);
        }
      );
    }
    nu.exports = Lv;
  });
  var au = Z((mx, su) => {
    function bv(t) {
      return function () {
        return t;
      };
    }
    su.exports = bv;
  });
  var uu = Z((gx, hu) => {
    var wv = au(),
      lu = Wn(),
      xv = so(),
      kv = lu
        ? function (t, i) {
            return lu(t, 'toString', {
              configurable: !0,
              enumerable: !1,
              value: wv(i),
              writable: !0,
            });
          }
        : xv;
    hu.exports = kv;
  });
  var fu = Z((_x, cu) => {
    var Mv = 800,
      Cv = 16,
      Pv = Date.now;
    function Ev(t) {
      var i = 0,
        r = 0;
      return function () {
        var o = Pv(),
          a = Cv - (o - r);
        if (((r = o), a > 0)) {
          if (++i >= Mv) return arguments[0];
        } else i = 0;
        return t.apply(void 0, arguments);
      };
    }
    cu.exports = Ev;
  });
  var pu = Z((yx, du) => {
    var Sv = uu(),
      Tv = fu(),
      Bv = Tv(Sv);
    du.exports = Bv;
  });
  var gu = Z((vx, mu) => {
    var Av = so(),
      Dv = ou(),
      Ov = pu();
    function Rv(t, i) {
      return Ov(Dv(t, i, Av), t + '');
    }
    mu.exports = Rv;
  });
  var yu = Z((Lx, _u) => {
    var Iv = Hi(),
      zv = Vr(),
      Nv = no(),
      Gv = Re();
    function Fv(t, i, r) {
      if (!Gv(r)) return !1;
      var o = typeof i;
      return (
        o == 'number' ? zv(r) && Nv(i, r.length) : o == 'string' && i in r
      )
        ? Iv(r[i], t)
        : !1;
    }
    _u.exports = Fv;
  });
  var Lu = Z((bx, vu) => {
    var qv = gu(),
      Zv = yu();
    function Uv(t) {
      return qv(function (i, r) {
        var o = -1,
          a = r.length,
          l = a > 1 ? r[a - 1] : void 0,
          u = a > 2 ? r[2] : void 0;
        for (
          l = t.length > 3 && typeof l == 'function' ? (a--, l) : void 0,
            u && Zv(r[0], r[1], u) && ((l = a < 3 ? void 0 : l), (a = 1)),
            i = Object(i);
          ++o < a;

        ) {
          var c = r[o];
          c && t(i, c, o, l);
        }
        return i;
      });
    }
    vu.exports = Uv;
  });
  var Hr = Z((wx, bu) => {
    var Vv = Qh(),
      Hv = Lu(),
      jv = Hv(function (t, i, r) {
        Vv(t, i, r);
      });
    bu.exports = jv;
  });
  var jr = Z((Rk, ic) => {
    var AL = mi(),
      DL = Ye(),
      OL = '[object Symbol]';
    function RL(t) {
      return typeof t == 'symbol' || (DL(t) && AL(t) == OL);
    }
    ic.exports = RL;
  });
  var nc = Z((Ik, rc) => {
    var IL = Li(),
      zL = jr(),
      NL = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      GL = /^\w*$/;
    function FL(t, i) {
      if (IL(t)) return !1;
      var r = typeof t;
      return r == 'number' ||
        r == 'symbol' ||
        r == 'boolean' ||
        t == null ||
        zL(t)
        ? !0
        : GL.test(t) || !NL.test(t) || (i != null && t in Object(i));
    }
    rc.exports = FL;
  });
  var ac = Z((zk, sc) => {
    var oc = Kn(),
      qL = 'Expected a function';
    function ho(t, i) {
      if (typeof t != 'function' || (i != null && typeof i != 'function'))
        throw new TypeError(qL);
      var r = function () {
        var o = arguments,
          a = i ? i.apply(this, o) : o[0],
          l = r.cache;
        if (l.has(a)) return l.get(a);
        var u = t.apply(this, o);
        return (r.cache = l.set(a, u) || l), u;
      };
      return (r.cache = new (ho.Cache || oc)()), r;
    }
    ho.Cache = oc;
    sc.exports = ho;
  });
  var hc = Z((Nk, lc) => {
    var ZL = ac(),
      UL = 500;
    function VL(t) {
      var i = ZL(t, function (o) {
          return r.size === UL && r.clear(), o;
        }),
        r = i.cache;
      return i;
    }
    lc.exports = VL;
  });
  var cc = Z((Gk, uc) => {
    var HL = hc(),
      jL =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      KL = /\\(\\)?/g,
      WL = HL(function (t) {
        var i = [];
        return (
          t.charCodeAt(0) === 46 && i.push(''),
          t.replace(jL, function (r, o, a, l) {
            i.push(a ? l.replace(KL, '$1') : o || r);
          }),
          i
        );
      });
    uc.exports = WL;
  });
  var dc = Z((Fk, fc) => {
    function $L(t, i) {
      for (var r = -1, o = t == null ? 0 : t.length, a = Array(o); ++r < o; )
        a[r] = i(t[r], r, t);
      return a;
    }
    fc.exports = $L;
  });
  var vc = Z((qk, yc) => {
    var pc = Fr(),
      YL = dc(),
      XL = Li(),
      JL = jr(),
      QL = 1 / 0,
      mc = pc ? pc.prototype : void 0,
      gc = mc ? mc.toString : void 0;
    function _c(t) {
      if (typeof t == 'string') return t;
      if (XL(t)) return YL(t, _c) + '';
      if (JL(t)) return gc ? gc.call(t) : '';
      var i = t + '';
      return i == '0' && 1 / t == -QL ? '-0' : i;
    }
    yc.exports = _c;
  });
  var bc = Z((Zk, Lc) => {
    var tb = vc();
    function eb(t) {
      return t == null ? '' : tb(t);
    }
    Lc.exports = eb;
  });
  var xc = Z((Uk, wc) => {
    var ib = Li(),
      rb = nc(),
      nb = cc(),
      ob = bc();
    function sb(t, i) {
      return ib(t) ? t : rb(t, i) ? [t] : nb(ob(t));
    }
    wc.exports = sb;
  });
  var Mc = Z((Vk, kc) => {
    var ab = jr(),
      lb = 1 / 0;
    function hb(t) {
      if (typeof t == 'string' || ab(t)) return t;
      var i = t + '';
      return i == '0' && 1 / t == -lb ? '-0' : i;
    }
    kc.exports = hb;
  });
  var Pc = Z((Hk, Cc) => {
    var ub = xc(),
      cb = Mc();
    function fb(t, i) {
      i = ub(i, t);
      for (var r = 0, o = i.length; t != null && r < o; ) t = t[cb(i[r++])];
      return r && r == o ? t : void 0;
    }
    Cc.exports = fb;
  });
  var er = Z((jk, Ec) => {
    var db = Pc();
    function pb(t, i, r) {
      var o = t == null ? void 0 : db(t, i);
      return o === void 0 ? r : o;
    }
    Ec.exports = pb;
  });
  var Ac = Z((hM, Bc) => {
    function yb(t) {
      return t && t.length ? t[0] : void 0;
    }
    Bc.exports = yb;
  });
  var qc = Z((yo, vo) => {
    (function (t, i) {
      typeof yo == 'object' && typeof vo < 'u'
        ? (vo.exports = i())
        : typeof define == 'function' && define.amd
          ? define(i)
          : ((t = t || self).RBush = i());
    })(yo, function () {
      'use strict';
      function t(w, B, M, K, W) {
        (function Y(V, A, g, _, v) {
          for (; _ > g; ) {
            if (_ - g > 600) {
              var T = _ - g + 1,
                P = A - g + 1,
                R = Math.log(T),
                I = 0.5 * Math.exp((2 * R) / 3),
                S =
                  0.5 *
                  Math.sqrt((R * I * (T - I)) / T) *
                  (P - T / 2 < 0 ? -1 : 1),
                k = Math.max(g, Math.floor(A - (P * I) / T + S)),
                N = Math.min(_, Math.floor(A + ((T - P) * I) / T + S));
              Y(V, A, k, N, v);
            }
            var E = V[A],
              F = g,
              X = _;
            for (i(V, g, A), v(V[_], E) > 0 && i(V, g, _); F < X; ) {
              for (i(V, F, X), F++, X--; v(V[F], E) < 0; ) F++;
              for (; v(V[X], E) > 0; ) X--;
            }
            v(V[g], E) === 0 ? i(V, g, X) : i(V, ++X, _),
              X <= A && (g = X + 1),
              A <= X && (_ = X - 1);
          }
        })(w, B, M || 0, K || w.length - 1, W || r);
      }
      function i(w, B, M) {
        var K = w[B];
        (w[B] = w[M]), (w[M] = K);
      }
      function r(w, B) {
        return w < B ? -1 : w > B ? 1 : 0;
      }
      var o = function (w) {
        w === void 0 && (w = 9),
          (this._maxEntries = Math.max(4, w)),
          (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
          this.clear();
      };
      function a(w, B, M) {
        if (!M) return B.indexOf(w);
        for (var K = 0; K < B.length; K++) if (M(w, B[K])) return K;
        return -1;
      }
      function l(w, B) {
        u(w, 0, w.children.length, B, w);
      }
      function u(w, B, M, K, W) {
        W || (W = q(null)),
          (W.minX = 1 / 0),
          (W.minY = 1 / 0),
          (W.maxX = -1 / 0),
          (W.maxY = -1 / 0);
        for (var Y = B; Y < M; Y++) {
          var V = w.children[Y];
          c(W, w.leaf ? K(V) : V);
        }
        return W;
      }
      function c(w, B) {
        return (
          (w.minX = Math.min(w.minX, B.minX)),
          (w.minY = Math.min(w.minY, B.minY)),
          (w.maxX = Math.max(w.maxX, B.maxX)),
          (w.maxY = Math.max(w.maxY, B.maxY)),
          w
        );
      }
      function d(w, B) {
        return w.minX - B.minX;
      }
      function p(w, B) {
        return w.minY - B.minY;
      }
      function y(w) {
        return (w.maxX - w.minX) * (w.maxY - w.minY);
      }
      function b(w) {
        return w.maxX - w.minX + (w.maxY - w.minY);
      }
      function D(w, B) {
        return (
          w.minX <= B.minX &&
          w.minY <= B.minY &&
          B.maxX <= w.maxX &&
          B.maxY <= w.maxY
        );
      }
      function O(w, B) {
        return (
          B.minX <= w.maxX &&
          B.minY <= w.maxY &&
          B.maxX >= w.minX &&
          B.maxY >= w.minY
        );
      }
      function q(w) {
        return {
          children: w,
          height: 1,
          leaf: !0,
          minX: 1 / 0,
          minY: 1 / 0,
          maxX: -1 / 0,
          maxY: -1 / 0,
        };
      }
      function $(w, B, M, K, W) {
        for (var Y = [B, M]; Y.length; )
          if (!((M = Y.pop()) - (B = Y.pop()) <= K)) {
            var V = B + Math.ceil((M - B) / K / 2) * K;
            t(w, V, B, M, W), Y.push(B, V, V, M);
          }
      }
      return (
        (o.prototype.all = function () {
          return this._all(this.data, []);
        }),
        (o.prototype.search = function (w) {
          var B = this.data,
            M = [];
          if (!O(w, B)) return M;
          for (var K = this.toBBox, W = []; B; ) {
            for (var Y = 0; Y < B.children.length; Y++) {
              var V = B.children[Y],
                A = B.leaf ? K(V) : V;
              O(w, A) &&
                (B.leaf ? M.push(V) : D(w, A) ? this._all(V, M) : W.push(V));
            }
            B = W.pop();
          }
          return M;
        }),
        (o.prototype.collides = function (w) {
          var B = this.data;
          if (!O(w, B)) return !1;
          for (var M = []; B; ) {
            for (var K = 0; K < B.children.length; K++) {
              var W = B.children[K],
                Y = B.leaf ? this.toBBox(W) : W;
              if (O(w, Y)) {
                if (B.leaf || D(w, Y)) return !0;
                M.push(W);
              }
            }
            B = M.pop();
          }
          return !1;
        }),
        (o.prototype.load = function (w) {
          if (!w || !w.length) return this;
          if (w.length < this._minEntries) {
            for (var B = 0; B < w.length; B++) this.insert(w[B]);
            return this;
          }
          var M = this._build(w.slice(), 0, w.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === M.height) this._splitRoot(this.data, M);
            else {
              if (this.data.height < M.height) {
                var K = this.data;
                (this.data = M), (M = K);
              }
              this._insert(M, this.data.height - M.height - 1, !0);
            }
          else this.data = M;
          return this;
        }),
        (o.prototype.insert = function (w) {
          return w && this._insert(w, this.data.height - 1), this;
        }),
        (o.prototype.clear = function () {
          return (this.data = q([])), this;
        }),
        (o.prototype.remove = function (w, B) {
          if (!w) return this;
          for (
            var M, K, W, Y = this.data, V = this.toBBox(w), A = [], g = [];
            Y || A.length;

          ) {
            if (
              (Y ||
                ((Y = A.pop()), (K = A[A.length - 1]), (M = g.pop()), (W = !0)),
              Y.leaf)
            ) {
              var _ = a(w, Y.children, B);
              if (_ !== -1)
                return (
                  Y.children.splice(_, 1), A.push(Y), this._condense(A), this
                );
            }
            W || Y.leaf || !D(Y, V)
              ? K
                ? (M++, (Y = K.children[M]), (W = !1))
                : (Y = null)
              : (A.push(Y), g.push(M), (M = 0), (K = Y), (Y = Y.children[0]));
          }
          return this;
        }),
        (o.prototype.toBBox = function (w) {
          return w;
        }),
        (o.prototype.compareMinX = function (w, B) {
          return w.minX - B.minX;
        }),
        (o.prototype.compareMinY = function (w, B) {
          return w.minY - B.minY;
        }),
        (o.prototype.toJSON = function () {
          return this.data;
        }),
        (o.prototype.fromJSON = function (w) {
          return (this.data = w), this;
        }),
        (o.prototype._all = function (w, B) {
          for (var M = []; w; )
            w.leaf ? B.push.apply(B, w.children) : M.push.apply(M, w.children),
              (w = M.pop());
          return B;
        }),
        (o.prototype._build = function (w, B, M, K) {
          var W,
            Y = M - B + 1,
            V = this._maxEntries;
          if (Y <= V) return l((W = q(w.slice(B, M + 1))), this.toBBox), W;
          K ||
            ((K = Math.ceil(Math.log(Y) / Math.log(V))),
            (V = Math.ceil(Y / Math.pow(V, K - 1)))),
            ((W = q([])).leaf = !1),
            (W.height = K);
          var A = Math.ceil(Y / V),
            g = A * Math.ceil(Math.sqrt(V));
          $(w, B, M, g, this.compareMinX);
          for (var _ = B; _ <= M; _ += g) {
            var v = Math.min(_ + g - 1, M);
            $(w, _, v, A, this.compareMinY);
            for (var T = _; T <= v; T += A) {
              var P = Math.min(T + A - 1, v);
              W.children.push(this._build(w, T, P, K - 1));
            }
          }
          return l(W, this.toBBox), W;
        }),
        (o.prototype._chooseSubtree = function (w, B, M, K) {
          for (; K.push(B), !B.leaf && K.length - 1 !== M; ) {
            for (
              var W = 1 / 0, Y = 1 / 0, V = void 0, A = 0;
              A < B.children.length;
              A++
            ) {
              var g = B.children[A],
                _ = y(g),
                v =
                  ((T = w),
                  (P = g),
                  (Math.max(P.maxX, T.maxX) - Math.min(P.minX, T.minX)) *
                    (Math.max(P.maxY, T.maxY) - Math.min(P.minY, T.minY)) -
                    _);
              v < Y
                ? ((Y = v), (W = _ < W ? _ : W), (V = g))
                : v === Y && _ < W && ((W = _), (V = g));
            }
            B = V || B.children[0];
          }
          var T, P;
          return B;
        }),
        (o.prototype._insert = function (w, B, M) {
          var K = M ? w : this.toBBox(w),
            W = [],
            Y = this._chooseSubtree(K, this.data, B, W);
          for (
            Y.children.push(w), c(Y, K);
            B >= 0 && W[B].children.length > this._maxEntries;

          )
            this._split(W, B), B--;
          this._adjustParentBBoxes(K, W, B);
        }),
        (o.prototype._split = function (w, B) {
          var M = w[B],
            K = M.children.length,
            W = this._minEntries;
          this._chooseSplitAxis(M, W, K);
          var Y = this._chooseSplitIndex(M, W, K),
            V = q(M.children.splice(Y, M.children.length - Y));
          (V.height = M.height),
            (V.leaf = M.leaf),
            l(M, this.toBBox),
            l(V, this.toBBox),
            B ? w[B - 1].children.push(V) : this._splitRoot(M, V);
        }),
        (o.prototype._splitRoot = function (w, B) {
          (this.data = q([w, B])),
            (this.data.height = w.height + 1),
            (this.data.leaf = !1),
            l(this.data, this.toBBox);
        }),
        (o.prototype._chooseSplitIndex = function (w, B, M) {
          for (
            var K, W, Y, V, A, g, _, v = 1 / 0, T = 1 / 0, P = B;
            P <= M - B;
            P++
          ) {
            var R = u(w, 0, P, this.toBBox),
              I = u(w, P, M, this.toBBox),
              S =
                ((W = R),
                (Y = I),
                (V = void 0),
                (A = void 0),
                (g = void 0),
                (_ = void 0),
                (V = Math.max(W.minX, Y.minX)),
                (A = Math.max(W.minY, Y.minY)),
                (g = Math.min(W.maxX, Y.maxX)),
                (_ = Math.min(W.maxY, Y.maxY)),
                Math.max(0, g - V) * Math.max(0, _ - A)),
              k = y(R) + y(I);
            S < v
              ? ((v = S), (K = P), (T = k < T ? k : T))
              : S === v && k < T && ((T = k), (K = P));
          }
          return K || M - B;
        }),
        (o.prototype._chooseSplitAxis = function (w, B, M) {
          var K = w.leaf ? this.compareMinX : d,
            W = w.leaf ? this.compareMinY : p;
          this._allDistMargin(w, B, M, K) < this._allDistMargin(w, B, M, W) &&
            w.children.sort(K);
        }),
        (o.prototype._allDistMargin = function (w, B, M, K) {
          w.children.sort(K);
          for (
            var W = this.toBBox,
              Y = u(w, 0, B, W),
              V = u(w, M - B, M, W),
              A = b(Y) + b(V),
              g = B;
            g < M - B;
            g++
          ) {
            var _ = w.children[g];
            c(Y, w.leaf ? W(_) : _), (A += b(Y));
          }
          for (var v = M - B - 1; v >= B; v--) {
            var T = w.children[v];
            c(V, w.leaf ? W(T) : T), (A += b(V));
          }
          return A;
        }),
        (o.prototype._adjustParentBBoxes = function (w, B, M) {
          for (var K = M; K >= 0; K--) c(B[K], w);
        }),
        (o.prototype._condense = function (w) {
          for (var B = w.length - 1, M = void 0; B >= 0; B--)
            w[B].children.length === 0
              ? B > 0
                ? (M = w[B - 1].children).splice(M.indexOf(w[B]), 1)
                : this.clear()
              : l(w[B], this.toBBox);
        }),
        o
      );
    });
  });
  var ko = Z((st) => {
    'use strict';
    Object.defineProperty(st, '__esModule', { value: !0 });
    st.earthRadius = 63710088e-1;
    st.factors = {
      centimeters: st.earthRadius * 100,
      centimetres: st.earthRadius * 100,
      degrees: st.earthRadius / 111325,
      feet: st.earthRadius * 3.28084,
      inches: st.earthRadius * 39.37,
      kilometers: st.earthRadius / 1e3,
      kilometres: st.earthRadius / 1e3,
      meters: st.earthRadius,
      metres: st.earthRadius,
      miles: st.earthRadius / 1609.344,
      millimeters: st.earthRadius * 1e3,
      millimetres: st.earthRadius * 1e3,
      nauticalmiles: st.earthRadius / 1852,
      radians: 1,
      yards: st.earthRadius * 1.0936,
    };
    st.unitsFactors = {
      centimeters: 100,
      centimetres: 100,
      degrees: 1 / 111325,
      feet: 3.28084,
      inches: 39.37,
      kilometers: 1 / 1e3,
      kilometres: 1 / 1e3,
      meters: 1,
      metres: 1,
      miles: 1 / 1609.344,
      millimeters: 1e3,
      millimetres: 1e3,
      nauticalmiles: 1 / 1852,
      radians: 1 / st.earthRadius,
      yards: 1.0936133,
    };
    st.areaFactors = {
      acres: 247105e-9,
      centimeters: 1e4,
      centimetres: 1e4,
      feet: 10.763910417,
      hectares: 1e-4,
      inches: 1550.003100006,
      kilometers: 1e-6,
      kilometres: 1e-6,
      meters: 1,
      metres: 1,
      miles: 386e-9,
      millimeters: 1e6,
      millimetres: 1e6,
      yards: 1.195990046,
    };
    function qe(t, i, r) {
      r === void 0 && (r = {});
      var o = { type: 'Feature' };
      return (
        (r.id === 0 || r.id) && (o.id = r.id),
        r.bbox && (o.bbox = r.bbox),
        (o.properties = i || {}),
        (o.geometry = t),
        o
      );
    }
    st.feature = qe;
    function Bb(t, i, r) {
      switch ((r === void 0 && (r = {}), t)) {
        case 'Point':
          return Lo(i).geometry;
        case 'LineString':
          return wo(i).geometry;
        case 'Polygon':
          return bo(i).geometry;
        case 'MultiPoint':
          return Uc(i).geometry;
        case 'MultiLineString':
          return Zc(i).geometry;
        case 'MultiPolygon':
          return Vc(i).geometry;
        default:
          throw new Error(t + ' is invalid');
      }
    }
    st.geometry = Bb;
    function Lo(t, i, r) {
      if ((r === void 0 && (r = {}), !t))
        throw new Error('coordinates is required');
      if (!Array.isArray(t)) throw new Error('coordinates must be an Array');
      if (t.length < 2)
        throw new Error('coordinates must be at least 2 numbers long');
      if (!Wr(t[0]) || !Wr(t[1]))
        throw new Error('coordinates must contain numbers');
      var o = { type: 'Point', coordinates: t };
      return qe(o, i, r);
    }
    st.point = Lo;
    function Ab(t, i, r) {
      return (
        r === void 0 && (r = {}),
        $r(
          t.map(function (o) {
            return Lo(o, i);
          }),
          r
        )
      );
    }
    st.points = Ab;
    function bo(t, i, r) {
      r === void 0 && (r = {});
      for (var o = 0, a = t; o < a.length; o++) {
        var l = a[o];
        if (l.length < 4)
          throw new Error(
            'Each LinearRing of a Polygon must have 4 or more Positions.'
          );
        for (var u = 0; u < l[l.length - 1].length; u++)
          if (l[l.length - 1][u] !== l[0][u])
            throw new Error('First and last Position are not equivalent.');
      }
      var c = { type: 'Polygon', coordinates: t };
      return qe(c, i, r);
    }
    st.polygon = bo;
    function Db(t, i, r) {
      return (
        r === void 0 && (r = {}),
        $r(
          t.map(function (o) {
            return bo(o, i);
          }),
          r
        )
      );
    }
    st.polygons = Db;
    function wo(t, i, r) {
      if ((r === void 0 && (r = {}), t.length < 2))
        throw new Error(
          'coordinates must be an array of two or more positions'
        );
      var o = { type: 'LineString', coordinates: t };
      return qe(o, i, r);
    }
    st.lineString = wo;
    function Ob(t, i, r) {
      return (
        r === void 0 && (r = {}),
        $r(
          t.map(function (o) {
            return wo(o, i);
          }),
          r
        )
      );
    }
    st.lineStrings = Ob;
    function $r(t, i) {
      i === void 0 && (i = {});
      var r = { type: 'FeatureCollection' };
      return (
        i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), (r.features = t), r
      );
    }
    st.featureCollection = $r;
    function Zc(t, i, r) {
      r === void 0 && (r = {});
      var o = { type: 'MultiLineString', coordinates: t };
      return qe(o, i, r);
    }
    st.multiLineString = Zc;
    function Uc(t, i, r) {
      r === void 0 && (r = {});
      var o = { type: 'MultiPoint', coordinates: t };
      return qe(o, i, r);
    }
    st.multiPoint = Uc;
    function Vc(t, i, r) {
      r === void 0 && (r = {});
      var o = { type: 'MultiPolygon', coordinates: t };
      return qe(o, i, r);
    }
    st.multiPolygon = Vc;
    function Rb(t, i, r) {
      r === void 0 && (r = {});
      var o = { type: 'GeometryCollection', geometries: t };
      return qe(o, i, r);
    }
    st.geometryCollection = Rb;
    function Ib(t, i) {
      if ((i === void 0 && (i = 0), i && !(i >= 0)))
        throw new Error('precision must be a positive number');
      var r = Math.pow(10, i || 0);
      return Math.round(t * r) / r;
    }
    st.round = Ib;
    function Hc(t, i) {
      i === void 0 && (i = 'kilometers');
      var r = st.factors[i];
      if (!r) throw new Error(i + ' units is invalid');
      return t * r;
    }
    st.radiansToLength = Hc;
    function xo(t, i) {
      i === void 0 && (i = 'kilometers');
      var r = st.factors[i];
      if (!r) throw new Error(i + ' units is invalid');
      return t / r;
    }
    st.lengthToRadians = xo;
    function zb(t, i) {
      return jc(xo(t, i));
    }
    st.lengthToDegrees = zb;
    function Nb(t) {
      var i = t % 360;
      return i < 0 && (i += 360), i;
    }
    st.bearingToAzimuth = Nb;
    function jc(t) {
      var i = t % (2 * Math.PI);
      return (i * 180) / Math.PI;
    }
    st.radiansToDegrees = jc;
    function Gb(t) {
      var i = t % 360;
      return (i * Math.PI) / 180;
    }
    st.degreesToRadians = Gb;
    function Fb(t, i, r) {
      if (
        (i === void 0 && (i = 'kilometers'),
        r === void 0 && (r = 'kilometers'),
        !(t >= 0))
      )
        throw new Error('length must be a positive number');
      return Hc(xo(t, i), r);
    }
    st.convertLength = Fb;
    function qb(t, i, r) {
      if (
        (i === void 0 && (i = 'meters'),
        r === void 0 && (r = 'kilometers'),
        !(t >= 0))
      )
        throw new Error('area must be a positive number');
      var o = st.areaFactors[i];
      if (!o) throw new Error('invalid original units');
      var a = st.areaFactors[r];
      if (!a) throw new Error('invalid final units');
      return (t / o) * a;
    }
    st.convertArea = qb;
    function Wr(t) {
      return !isNaN(t) && t !== null && !Array.isArray(t);
    }
    st.isNumber = Wr;
    function Zb(t) {
      return !!t && t.constructor === Object;
    }
    st.isObject = Zb;
    function Ub(t) {
      if (!t) throw new Error('bbox is required');
      if (!Array.isArray(t)) throw new Error('bbox must be an Array');
      if (t.length !== 4 && t.length !== 6)
        throw new Error('bbox must be an Array of 4 or 6 numbers');
      t.forEach(function (i) {
        if (!Wr(i)) throw new Error('bbox must only contain numbers');
      });
    }
    st.validateBBox = Ub;
    function Vb(t) {
      if (!t) throw new Error('id is required');
      if (['string', 'number'].indexOf(typeof t) === -1)
        throw new Error('id must be a number or a string');
    }
    st.validateId = Vb;
  });
  var Co = Z((Rt) => {
    'use strict';
    Object.defineProperty(Rt, '__esModule', { value: !0 });
    var Vt = ko();
    function hr(t, i, r) {
      if (t !== null)
        for (
          var o,
            a,
            l,
            u,
            c,
            d,
            p,
            y = 0,
            b = 0,
            D,
            O = t.type,
            q = O === 'FeatureCollection',
            $ = O === 'Feature',
            w = q ? t.features.length : 1,
            B = 0;
          B < w;
          B++
        ) {
          (p = q ? t.features[B].geometry : $ ? t.geometry : t),
            (D = p ? p.type === 'GeometryCollection' : !1),
            (c = D ? p.geometries.length : 1);
          for (var M = 0; M < c; M++) {
            var K = 0,
              W = 0;
            if (((u = D ? p.geometries[M] : p), u !== null)) {
              d = u.coordinates;
              var Y = u.type;
              switch (
                ((y = r && (Y === 'Polygon' || Y === 'MultiPolygon') ? 1 : 0),
                Y)
              ) {
                case null:
                  break;
                case 'Point':
                  if (i(d, b, B, K, W) === !1) return !1;
                  b++, K++;
                  break;
                case 'LineString':
                case 'MultiPoint':
                  for (o = 0; o < d.length; o++) {
                    if (i(d[o], b, B, K, W) === !1) return !1;
                    b++, Y === 'MultiPoint' && K++;
                  }
                  Y === 'LineString' && K++;
                  break;
                case 'Polygon':
                case 'MultiLineString':
                  for (o = 0; o < d.length; o++) {
                    for (a = 0; a < d[o].length - y; a++) {
                      if (i(d[o][a], b, B, K, W) === !1) return !1;
                      b++;
                    }
                    Y === 'MultiLineString' && K++, Y === 'Polygon' && W++;
                  }
                  Y === 'Polygon' && K++;
                  break;
                case 'MultiPolygon':
                  for (o = 0; o < d.length; o++) {
                    for (W = 0, a = 0; a < d[o].length; a++) {
                      for (l = 0; l < d[o][a].length - y; l++) {
                        if (i(d[o][a][l], b, B, K, W) === !1) return !1;
                        b++;
                      }
                      W++;
                    }
                    K++;
                  }
                  break;
                case 'GeometryCollection':
                  for (o = 0; o < u.geometries.length; o++)
                    if (hr(u.geometries[o], i, r) === !1) return !1;
                  break;
                default:
                  throw new Error('Unknown Geometry Type');
              }
            }
          }
        }
    }
    function Hb(t, i, r, o) {
      var a = r;
      return (
        hr(
          t,
          function (l, u, c, d, p) {
            u === 0 && r === void 0 ? (a = l) : (a = i(a, l, u, c, d, p));
          },
          o
        ),
        a
      );
    }
    function Kc(t, i) {
      var r;
      switch (t.type) {
        case 'FeatureCollection':
          for (
            r = 0;
            r < t.features.length && i(t.features[r].properties, r) !== !1;
            r++
          );
          break;
        case 'Feature':
          i(t.properties, 0);
          break;
      }
    }
    function jb(t, i, r) {
      var o = r;
      return (
        Kc(t, function (a, l) {
          l === 0 && r === void 0 ? (o = a) : (o = i(o, a, l));
        }),
        o
      );
    }
    function Wc(t, i) {
      if (t.type === 'Feature') i(t, 0);
      else if (t.type === 'FeatureCollection')
        for (
          var r = 0;
          r < t.features.length && i(t.features[r], r) !== !1;
          r++
        );
    }
    function Kb(t, i, r) {
      var o = r;
      return (
        Wc(t, function (a, l) {
          l === 0 && r === void 0 ? (o = a) : (o = i(o, a, l));
        }),
        o
      );
    }
    function Wb(t) {
      var i = [];
      return (
        hr(t, function (r) {
          i.push(r);
        }),
        i
      );
    }
    function Mo(t, i) {
      var r,
        o,
        a,
        l,
        u,
        c,
        d,
        p,
        y,
        b,
        D = 0,
        O = t.type === 'FeatureCollection',
        q = t.type === 'Feature',
        $ = O ? t.features.length : 1;
      for (r = 0; r < $; r++) {
        for (
          c = O ? t.features[r].geometry : q ? t.geometry : t,
            p = O ? t.features[r].properties : q ? t.properties : {},
            y = O ? t.features[r].bbox : q ? t.bbox : void 0,
            b = O ? t.features[r].id : q ? t.id : void 0,
            d = c ? c.type === 'GeometryCollection' : !1,
            u = d ? c.geometries.length : 1,
            a = 0;
          a < u;
          a++
        ) {
          if (((l = d ? c.geometries[a] : c), l === null)) {
            if (i(null, D, p, y, b) === !1) return !1;
            continue;
          }
          switch (l.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
              if (i(l, D, p, y, b) === !1) return !1;
              break;
            }
            case 'GeometryCollection': {
              for (o = 0; o < l.geometries.length; o++)
                if (i(l.geometries[o], D, p, y, b) === !1) return !1;
              break;
            }
            default:
              throw new Error('Unknown Geometry Type');
          }
        }
        D++;
      }
    }
    function $b(t, i, r) {
      var o = r;
      return (
        Mo(t, function (a, l, u, c, d) {
          l === 0 && r === void 0 ? (o = a) : (o = i(o, a, l, u, c, d));
        }),
        o
      );
    }
    function Yr(t, i) {
      Mo(t, function (r, o, a, l, u) {
        var c = r === null ? null : r.type;
        switch (c) {
          case null:
          case 'Point':
          case 'LineString':
          case 'Polygon':
            return i(Vt.feature(r, a, { bbox: l, id: u }), o, 0) === !1
              ? !1
              : void 0;
        }
        var d;
        switch (c) {
          case 'MultiPoint':
            d = 'Point';
            break;
          case 'MultiLineString':
            d = 'LineString';
            break;
          case 'MultiPolygon':
            d = 'Polygon';
            break;
        }
        for (var p = 0; p < r.coordinates.length; p++) {
          var y = r.coordinates[p],
            b = { type: d, coordinates: y };
          if (i(Vt.feature(b, a), o, p) === !1) return !1;
        }
      });
    }
    function Yb(t, i, r) {
      var o = r;
      return (
        Yr(t, function (a, l, u) {
          l === 0 && u === 0 && r === void 0 ? (o = a) : (o = i(o, a, l, u));
        }),
        o
      );
    }
    function $c(t, i) {
      Yr(t, function (r, o, a) {
        var l = 0;
        if (r.geometry) {
          var u = r.geometry.type;
          if (!(u === 'Point' || u === 'MultiPoint')) {
            var c,
              d = 0,
              p = 0,
              y = 0;
            if (
              hr(r, function (b, D, O, q, $) {
                if (c === void 0 || o > d || q > p || $ > y) {
                  (c = b), (d = o), (p = q), (y = $), (l = 0);
                  return;
                }
                var w = Vt.lineString([c, b], r.properties);
                if (i(w, o, a, $, l) === !1) return !1;
                l++, (c = b);
              }) === !1
            )
              return !1;
          }
        }
      });
    }
    function Xb(t, i, r) {
      var o = r,
        a = !1;
      return (
        $c(t, function (l, u, c, d, p) {
          a === !1 && r === void 0 ? (o = l) : (o = i(o, l, u, c, d, p)),
            (a = !0);
        }),
        o
      );
    }
    function Yc(t, i) {
      if (!t) throw new Error('geojson is required');
      Yr(t, function (r, o, a) {
        if (r.geometry !== null) {
          var l = r.geometry.type,
            u = r.geometry.coordinates;
          switch (l) {
            case 'LineString':
              if (i(r, o, a, 0, 0) === !1) return !1;
              break;
            case 'Polygon':
              for (var c = 0; c < u.length; c++)
                if (i(Vt.lineString(u[c], r.properties), o, a, c) === !1)
                  return !1;
              break;
          }
        }
      });
    }
    function Jb(t, i, r) {
      var o = r;
      return (
        Yc(t, function (a, l, u, c) {
          l === 0 && r === void 0 ? (o = a) : (o = i(o, a, l, u, c));
        }),
        o
      );
    }
    function Qb(t, i) {
      if (((i = i || {}), !Vt.isObject(i)))
        throw new Error('options is invalid');
      var r = i.featureIndex || 0,
        o = i.multiFeatureIndex || 0,
        a = i.geometryIndex || 0,
        l = i.segmentIndex || 0,
        u = i.properties,
        c;
      switch (t.type) {
        case 'FeatureCollection':
          r < 0 && (r = t.features.length + r),
            (u = u || t.features[r].properties),
            (c = t.features[r].geometry);
          break;
        case 'Feature':
          (u = u || t.properties), (c = t.geometry);
          break;
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon':
          c = t;
          break;
        default:
          throw new Error('geojson is invalid');
      }
      if (c === null) return null;
      var d = c.coordinates;
      switch (c.type) {
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
          return (
            l < 0 && (l = d.length + l - 1),
            Vt.lineString([d[l], d[l + 1]], u, i)
          );
        case 'Polygon':
          return (
            a < 0 && (a = d.length + a),
            l < 0 && (l = d[a].length + l - 1),
            Vt.lineString([d[a][l], d[a][l + 1]], u, i)
          );
        case 'MultiLineString':
          return (
            o < 0 && (o = d.length + o),
            l < 0 && (l = d[o].length + l - 1),
            Vt.lineString([d[o][l], d[o][l + 1]], u, i)
          );
        case 'MultiPolygon':
          return (
            o < 0 && (o = d.length + o),
            a < 0 && (a = d[o].length + a),
            l < 0 && (l = d[o][a].length - l - 1),
            Vt.lineString([d[o][a][l], d[o][a][l + 1]], u, i)
          );
      }
      throw new Error('geojson is invalid');
    }
    function t0(t, i) {
      if (((i = i || {}), !Vt.isObject(i)))
        throw new Error('options is invalid');
      var r = i.featureIndex || 0,
        o = i.multiFeatureIndex || 0,
        a = i.geometryIndex || 0,
        l = i.coordIndex || 0,
        u = i.properties,
        c;
      switch (t.type) {
        case 'FeatureCollection':
          r < 0 && (r = t.features.length + r),
            (u = u || t.features[r].properties),
            (c = t.features[r].geometry);
          break;
        case 'Feature':
          (u = u || t.properties), (c = t.geometry);
          break;
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon':
          c = t;
          break;
        default:
          throw new Error('geojson is invalid');
      }
      if (c === null) return null;
      var d = c.coordinates;
      switch (c.type) {
        case 'Point':
          return Vt.point(d, u, i);
        case 'MultiPoint':
          return o < 0 && (o = d.length + o), Vt.point(d[o], u, i);
        case 'LineString':
          return l < 0 && (l = d.length + l), Vt.point(d[l], u, i);
        case 'Polygon':
          return (
            a < 0 && (a = d.length + a),
            l < 0 && (l = d[a].length + l),
            Vt.point(d[a][l], u, i)
          );
        case 'MultiLineString':
          return (
            o < 0 && (o = d.length + o),
            l < 0 && (l = d[o].length + l),
            Vt.point(d[o][l], u, i)
          );
        case 'MultiPolygon':
          return (
            o < 0 && (o = d.length + o),
            a < 0 && (a = d[o].length + a),
            l < 0 && (l = d[o][a].length - l),
            Vt.point(d[o][a][l], u, i)
          );
      }
      throw new Error('geojson is invalid');
    }
    Rt.coordAll = Wb;
    Rt.coordEach = hr;
    Rt.coordReduce = Hb;
    Rt.featureEach = Wc;
    Rt.featureReduce = Kb;
    Rt.findPoint = t0;
    Rt.findSegment = Qb;
    Rt.flattenEach = Yr;
    Rt.flattenReduce = Yb;
    Rt.geomEach = Mo;
    Rt.geomReduce = $b;
    Rt.lineEach = Yc;
    Rt.lineReduce = Jb;
    Rt.propEach = Kc;
    Rt.propReduce = jb;
    Rt.segmentEach = $c;
    Rt.segmentReduce = Xb;
  });
  var Xc = Z((Eo) => {
    'use strict';
    Object.defineProperty(Eo, '__esModule', { value: !0 });
    var e0 = Co();
    function Po(t) {
      var i = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
      return (
        e0.coordEach(t, function (r) {
          i[0] > r[0] && (i[0] = r[0]),
            i[1] > r[1] && (i[1] = r[1]),
            i[2] < r[0] && (i[2] = r[0]),
            i[3] < r[1] && (i[3] = r[1]);
        }),
        i
      );
    }
    Po.default = Po;
    Eo.default = Po;
  });
  var To = Z((aC, So) => {
    var Le = qc(),
      Qc = ko(),
      tf = Co(),
      Pi = Xc().default,
      i0 = tf.featureEach,
      oC = tf.coordEach,
      sC = Qc.polygon,
      Jc = Qc.featureCollection;
    function ef(t) {
      var i = new Le(t);
      return (
        (i.insert = function (r) {
          if (r.type !== 'Feature') throw new Error('invalid feature');
          return (
            (r.bbox = r.bbox ? r.bbox : Pi(r)),
            Le.prototype.insert.call(this, r)
          );
        }),
        (i.load = function (r) {
          var o = [];
          return (
            Array.isArray(r)
              ? r.forEach(function (a) {
                  if (a.type !== 'Feature') throw new Error('invalid features');
                  (a.bbox = a.bbox ? a.bbox : Pi(a)), o.push(a);
                })
              : i0(r, function (a) {
                  if (a.type !== 'Feature') throw new Error('invalid features');
                  (a.bbox = a.bbox ? a.bbox : Pi(a)), o.push(a);
                }),
            Le.prototype.load.call(this, o)
          );
        }),
        (i.remove = function (r, o) {
          if (r.type !== 'Feature') throw new Error('invalid feature');
          return (
            (r.bbox = r.bbox ? r.bbox : Pi(r)),
            Le.prototype.remove.call(this, r, o)
          );
        }),
        (i.clear = function () {
          return Le.prototype.clear.call(this);
        }),
        (i.search = function (r) {
          var o = Le.prototype.search.call(this, this.toBBox(r));
          return Jc(o);
        }),
        (i.collides = function (r) {
          return Le.prototype.collides.call(this, this.toBBox(r));
        }),
        (i.all = function () {
          var r = Le.prototype.all.call(this);
          return Jc(r);
        }),
        (i.toJSON = function () {
          return Le.prototype.toJSON.call(this);
        }),
        (i.fromJSON = function (r) {
          return Le.prototype.fromJSON.call(this, r);
        }),
        (i.toBBox = function (r) {
          var o;
          if (r.bbox) o = r.bbox;
          else if (Array.isArray(r) && r.length === 4) o = r;
          else if (Array.isArray(r) && r.length === 6)
            o = [r[0], r[1], r[3], r[4]];
          else if (r.type === 'Feature') o = Pi(r);
          else if (r.type === 'FeatureCollection') o = Pi(r);
          else throw new Error('invalid geojson');
          return { minX: o[0], minY: o[1], maxX: o[2], maxY: o[3] };
        }),
        i
      );
    }
    So.exports = ef;
    So.exports.default = ef;
  });
  var F1 = le(Ks());
  function ap(t, i) {
    return ((t % i) + i) % i;
  }
  function lp(t) {
    return Object.fromEntries(
      Object.entries(t).filter(([i, r]) => r !== void 0)
    );
  }
  function Nr(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 1, t.toString().length) === 'm'
    );
  }
  function Ws(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 1, t.toString().length) === '%'
    );
  }
  function Gr(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 2, t.toString().length) === 'px'
    );
  }
  function Un(t, i) {
    let r = i.getCenter(),
      o = i.latLngToLayerPoint(r),
      a = { x: o.x + Number(t), y: o.y },
      l = i.layerPointToLatLng(a);
    return i.distance(r, l);
  }
  L.Polyline.include({
    arrowheads: function (t = {}) {
      let i = {
        yawn: 60,
        size: '15%',
        frequency: 'allvertices',
        proportionalToTotal: !1,
      };
      this.options.noClip = !0;
      let r = Object.assign({}, i, t);
      return (this._arrowheadOptions = r), (this._hatsApplied = !0), this;
    },
    buildVectorHats: function (t) {
      this._arrowheads && this._arrowheads.remove(),
        this._ghosts && this._ghosts.remove();
      let i = Object.getPrototypeOf(Object.getPrototypeOf(this.options)),
        r = Object.assign({}, i, this.options),
        o = Object.assign({}, r, t);
      (o.smoothFactor = 1),
        (o.fillOpacity = 1),
        (o.fill = !!t.fill),
        (o.interactive = !1);
      let a = t.size.toString(),
        l = [],
        { frequency: u, offsets: c } = t;
      (c?.start || c?.end) && this._buildGhosts({ start: c.start, end: c.end }),
        (this._ghosts || this)._parts.forEach((y, b) => {
          let D = y.map((V) => this._map.layerPointToLatLng(V)),
            O = (() => {
              let V = 0;
              for (var A = 0; A < y.length - 1; A++)
                V += this._map.distance(D[A], D[A + 1]);
              return V;
            })(),
            q,
            $,
            w,
            B;
          if (
            (isNaN(u)
              ? Ws(u)
                ? console.error(
                    'Error: arrowhead frequency option cannot be given in percent.  Try another unit.'
                  )
                : Nr(u)
                  ? ((w = u.slice(0, u.length - 1) / O),
                    (B = 1 / w),
                    (B = Math.floor(B)),
                    (w = 1 / B))
                  : Gr(u) &&
                    ((w = (() => {
                      let V = u.slice(0, u.length - 2);
                      return Un(V, this._map) / O;
                    })()),
                    (B = 1 / w),
                    (B = Math.floor(B)),
                    (w = 1 / B))
              : ((w = 1 / u), (B = u)),
            t.frequency === 'allvertices')
          )
            ($ = (() => {
              let V = [];
              for (var A = 1; A < D.length; A++) {
                let g =
                  L.GeometryUtil.angle(
                    this._map,
                    D[ap(A - 1, D.length)],
                    D[A]
                  ) + 180;
                V.push(g);
              }
              return V;
            })()),
              (q = D),
              q.shift();
          else if (t.frequency === 'endonly' && D.length >= 2)
            (q = [D[D.length - 1]]),
              ($ = [
                L.GeometryUtil.angle(
                  this._map,
                  D[D.length - 2],
                  D[D.length - 1]
                ) + 180,
              ]);
          else {
            q = [];
            let V = [];
            for (var M = 0; M < B; M++) {
              let A = L.GeometryUtil.interpolateOnLine(
                this._map,
                D,
                w * (M + 1)
              );
              A && (V.push(A), q.push(A.latLng));
            }
            $ = (() => {
              let A = [];
              for (var g = 0; g < V.length; g++) {
                let _ = L.GeometryUtil.angle(
                  this._map,
                  D[V[g].predecessor + 1],
                  D[V[g].predecessor]
                );
                A.push(_);
              }
              return A;
            })();
          }
          let K = [],
            W = (V, A = {}) => {
              let g = A.yawn ?? t.yawn,
                _ = L.GeometryUtil.destination(q[M], $[M] - g / 2, V),
                v = L.GeometryUtil.destination(q[M], $[M] + g / 2, V),
                T = [
                  [_.lat, _.lng],
                  [q[M].lat, q[M].lng],
                  [v.lat, v.lng],
                ],
                P = t.fill
                  ? L.polygon(T, { ...o, ...A })
                  : L.polyline(T, { ...o, ...A });
              K.push(P);
            },
            Y = (V, A = {}) => {
              let g = V.slice(0, V.length - 2),
                _ = A.yawn ?? t.yawn,
                v = this._map.latLngToLayerPoint(q[M]),
                T = $[M],
                P = (180 - T - _ / 2) * (Math.PI / 180),
                R = (180 - T + _ / 2) * (Math.PI / 180),
                I = g * Math.sin(P),
                S = g * Math.cos(P),
                k = g * Math.sin(R),
                N = g * Math.cos(R),
                E = { x: v.x + I, y: v.y + S },
                F = { x: v.x + k, y: v.y + N },
                X = this._map.layerPointToLatLng(E),
                J = this._map.layerPointToLatLng(F),
                it = [
                  [X.lat, X.lng],
                  [q[M].lat, q[M].lng],
                  [J.lat, J.lng],
                ],
                et = t.fill
                  ? L.polygon(it, { ...o, ...A })
                  : L.polyline(it, { ...o, ...A });
              K.push(et);
            };
          for (var M = 0; M < q.length; M++) {
            let { perArrowheadOptions: A, ...g } = t;
            if (
              ((A = A ? A(M) : {}),
              (A = Object.assign(g, lp(A))),
              (a = A.size ?? a),
              Nr(a))
            ) {
              let _ = a.slice(0, a.length - 1);
              W(_, A);
            } else if (Ws(a)) {
              let _ = a.slice(0, a.length - 1),
                v =
                  t.frequency === 'endonly' && t.proportionalToTotal
                    ? (O * _) / 100
                    : ((O / (y.length - 1)) * _) / 100;
              W(v, A);
            } else
              Gr(a)
                ? Y(t.size, A)
                : console.error(
                    'Error: Arrowhead size unit not defined.  Check your arrowhead options.'
                  );
          }
          l.push(...K);
        }),
        l.forEach((y) => (y.options.pmIgnore = !0));
      let p = L.layerGroup(l);
      return (this._arrowheads = p), this;
    },
    getArrowheads: function () {
      return this._arrowheads
        ? this._arrowheads
        : console.error(
            "Error: You tried to call '.getArrowheads() on a shape that does not have a arrowhead.  Use '.arrowheads()' to add a arrowheads before trying to call '.getArrowheads()'"
          );
    },
    hasArrowheads: function () {
      return this._arrowheads !== void 0 && this._arrowheads !== null;
    },
    _buildGhosts: function ({ start: t, end: i }) {
      if (t || i) {
        let r = this.getLatLngs();
        r = Array.isArray(r[0]) ? r : [r];
        let o = r.map((a) => {
          let l = (() => {
            let u = 0;
            for (var c = 0; c < a.length - 1; c++)
              u += this._map.distance(a[c], a[c + 1]);
            return u;
          })();
          if (t) {
            let u = (() => {
                if (Nr(t)) return Number(t.slice(0, t.length - 1));
                if (Gr(t)) {
                  let d = Number(t.slice(0, t.length - 2));
                  return Un(d, this._map);
                }
              })(),
              c = L.GeometryUtil.interpolateOnLine(this._map, a, u / l);
            (a = a.slice(
              c.predecessor === -1 ? 1 : c.predecessor + 1,
              a.length
            )),
              a.unshift(c.latLng);
          }
          if (i) {
            let u = (() => {
                if (Nr(i)) return Number(i.slice(0, i.length - 1));
                if (Gr(i)) {
                  let d = Number(i.slice(0, i.length - 2));
                  return Un(d, this._map);
                }
              })(),
              c = L.GeometryUtil.interpolateOnLine(this._map, a, (l - u) / l);
            (a = a.slice(0, c.predecessor + 1)), a.push(c.latLng);
          }
          return a;
        });
        (this._ghosts = L.polyline(o, {
          ...this.options,
          color: 'rgba(0,0,0,0)',
          stroke: 0,
          smoothFactor: 0,
          interactive: !1,
        })),
          this._ghosts.addTo(this._map);
      }
    },
    deleteArrowheads: function () {
      this._arrowheads &&
        (this._arrowheads.remove(),
        delete this._arrowheads,
        delete this._arrowheadOptions,
        (this._hatsApplied = !1)),
        this._ghosts && this._ghosts.remove();
    },
    _update: function () {
      this._map &&
        (this._clipPoints(),
        this._simplifyPoints(),
        this._updatePath(),
        this._hatsApplied &&
          (this.buildVectorHats(this._arrowheadOptions),
          this._map.addLayer(this._arrowheads)));
    },
    remove: function () {
      return (
        this._arrowheads && this._arrowheads.remove(),
        this._ghosts && this._ghosts.remove(),
        this.removeFrom(this._map || this._mapToAdd)
      );
    },
    setArrowStyle: function (t) {
      this._arrowheads &&
        this._arrowheads.getLayers().forEach((i) => {
          i.setStyle(t);
        }),
        this._ghosts &&
          this._ghosts.getLayers().forEach((i) => {
            i.setStyle(t);
          });
    },
  });
  L.LayerGroup.include({
    removeLayer: function (t) {
      var i = t in this._layers ? t : this.getLayerId(t);
      return (
        this._map &&
          this._layers[i] &&
          (this._layers[i]._arrowheads && this._layers[i]._arrowheads.remove(),
          this._map.removeLayer(this._layers[i])),
        delete this._layers[i],
        this
      );
    },
    onRemove: function (t, i) {
      for (var i in this._layers) this._layers[i] && this._layers[i].remove();
      this.eachLayer(t.removeLayer, t);
    },
  });
  L.Map.include({
    removeLayer: function (t) {
      var i = L.Util.stamp(t);
      return (
        t._arrowheads && t._arrowheads.remove(),
        t._ghosts && t._ghosts.remove(),
        this._layers[i]
          ? (this._loaded && t.onRemove(this),
            t.getAttribution &&
              this.attributionControl &&
              this.attributionControl.removeAttribution(t.getAttribution()),
            delete this._layers[i],
            this._loaded &&
              (this.fire('layerremove', { layer: t }), t.fire('remove')),
            (t._map = t._mapToAdd = null),
            this)
          : this
      );
    },
  });
  L.GeoJSON.include({
    geometryToLayer: function (t, i) {
      var r = t.type === 'Feature' ? t.geometry : t,
        o = r ? r.coordinates : null,
        a = [],
        l = i && i.pointToLayer,
        u = (i && i.coordsToLatLng) || L.GeoJSON.coordsToLatLng,
        c,
        d,
        p,
        y;
      if (!o && !r) return null;
      switch (r.type) {
        case 'Point':
          return (c = u(o)), this._pointToLayer(l, t, c, i);
        case 'MultiPoint':
          for (p = 0, y = o.length; p < y; p++)
            (c = u(o[p])), a.push(this._pointToLayer(l, t, c, i));
          return new L.FeatureGroup(a);
        case 'LineString':
        case 'MultiLineString':
          d = L.GeoJSON.coordsToLatLngs(o, r.type === 'LineString' ? 0 : 1, u);
          var b = new L.Polyline(d, i);
          return i.arrowheads && b.arrowheads(i.arrowheads), b;
        case 'Polygon':
        case 'MultiPolygon':
          return (
            (d = L.GeoJSON.coordsToLatLngs(o, r.type === 'Polygon' ? 1 : 2, u)),
            new L.Polygon(d, i)
          );
        case 'GeometryCollection':
          for (p = 0, y = r.geometries.length; p < y; p++) {
            var D = this.geometryToLayer(
              {
                geometry: r.geometries[p],
                type: 'Feature',
                properties: t.properties,
              },
              i
            );
            D && a.push(D);
          }
          return new L.FeatureGroup(a);
        default:
          throw new Error('Invalid GeoJSON object.');
      }
    },
    addData: function (t) {
      var i = L.Util.isArray(t) ? t : t.features,
        r,
        o,
        a;
      if (i) {
        for (r = 0, o = i.length; r < o; r++)
          (a = i[r]),
            (a.geometries || a.geometry || a.features || a.coordinates) &&
              this.addData(a);
        return this;
      }
      var l = this.options;
      if (l.filter && !l.filter(t)) return this;
      var u = this.geometryToLayer(t, l);
      return u
        ? ((u.feature = L.GeoJSON.asFeature(t)),
          (u.defaultOptions = u.options),
          this.resetStyle(u),
          l.onEachFeature && l.onEachFeature(t, u),
          this.addLayer(u))
        : this;
    },
    _pointToLayer: function (t, i, r, o) {
      return t ? t(i, r) : new L.Marker(r, o && o.markersInheritOptions && o);
    },
  });
  L.Control.Dialog = L.Control.extend({
    optionsDefault: {
      size: [300, 300],
      minSize: [100, 100],
      maxSize: [350, 350],
      anchor: [250, 250],
      position: 'topleft',
      initOpen: !1,
      resize: !1,
      move: !0,
      close: !0,
      contentId: void 0,
    },
    initialize: function (t) {
      (this.options = JSON.parse(JSON.stringify(this.options))),
        L.setOptions(this, { ...this.optionsDefault, ...t }),
        (this._attributions = {});
    },
    onAdd: function (t) {
      return (
        this._initLayout(),
        (this._map = t),
        this.update(),
        this.options.initOpen || this.close(),
        this._container
      );
    },
    open: function () {
      if (this._map)
        return (
          (this._container.style.visibility = ''),
          this._map.fire('dialog:opened', this),
          this
        );
    },
    toggle: function () {
      return this._map
        ? (this._container.style.visibility === ''
            ? ((this._container.style.visibility = 'hidden'),
              this._map.fire('dialog:closed', this))
            : ((this._container.style.visibility = ''),
              this._map.fire('dialog:opened', this)),
          this)
        : void 0;
    },
    close: function () {
      return (
        (this._container.style.visibility = 'hidden'),
        this._map.fire('dialog:closed', this),
        this
      );
    },
    destroy: function () {
      return this._map
        ? (this._map?.fire('dialog:destroyed', this),
          this.remove(),
          this.onRemove && this.onRemove(this._map),
          this)
        : this;
    },
    isOpen: function () {
      return this._map ? this._container.style.visibility === '' : this;
    },
    setLocation: function (t) {
      return (
        (t = t || [250, 250]),
        (this.options.anchor[0] = 0),
        (this.options.anchor[1] = 0),
        (this._oldMousePos.x = 0),
        (this._oldMousePos.y = 0),
        this._move(t[1], t[0]),
        this
      );
    },
    setSize: function (t) {
      return (
        (t = t || [300, 300]),
        (this.options.size[0] = 0),
        (this.options.size[1] = 0),
        (this._oldMousePos.x = 0),
        (this._oldMousePos.y = 0),
        this._resize(t[0], t[1]),
        this
      );
    },
    lock: function () {
      return (
        (this._resizerNode.style.visibility = 'hidden'),
        (this._grabberNode.style.visibility = 'hidden'),
        (this._closeNode.style.visibility = 'hidden'),
        this._map.fire('dialog:locked', this),
        this
      );
    },
    unlock: function () {
      return (
        (this._resizerNode.style.visibility = ''),
        (this._grabberNode.style.visibility = ''),
        (this._closeNode.style.visibility = ''),
        this._map.fire('dialog:unlocked', this),
        this
      );
    },
    freeze: function () {
      return (
        (this._resizerNode.style.visibility = 'hidden'),
        (this._grabberNode.style.visibility = 'hidden'),
        this._map.fire('dialog:frozen', this),
        this
      );
    },
    unfreeze: function () {
      return (
        (this._resizerNode.style.visibility = ''),
        (this._grabberNode.style.visibility = ''),
        this._map.fire('dialog:unfrozen', this),
        this
      );
    },
    hideClose: function () {
      return (
        (this._closeNode.style.visibility = 'hidden'),
        this._map.fire('dialog:closehidden', this),
        this
      );
    },
    showClose: function () {
      return (
        (this._closeNode.style.visibility = ''),
        this._map.fire('dialog:closeshown', this),
        this
      );
    },
    hideResize: function () {
      return (
        (this._resizerNode.style.visibility = 'hidden'),
        this._map.fire('dialog:resizehidden', this),
        this
      );
    },
    showResize: function () {
      return (
        (this._resizerNode.style.visibility = ''),
        this._map.fire('dialog:resizeshown', this),
        this
      );
    },
    setContent: function (t) {
      return (this._content = t), this.update(), this;
    },
    getContent: function () {
      return this._content;
    },
    getElement: function () {
      return this._container;
    },
    update: function () {
      this._map &&
        ((this._container.style.visibility = 'hidden'),
        this._updateContent(),
        this._updateLayout(),
        (this._container.style.visibility = ''),
        this._map.fire('dialog:updated', this));
    },
    _initLayout: function () {
      var t = 'leaflet-control-dialog',
        i = (this._container = L.DomUtil.create('div', t));
      (i.style.width = this.options.size[0] + 'px'),
        (i.style.height = this.options.size[1] + 'px'),
        (i.style.top = this.options.anchor[0] + 'px'),
        (i.style.left = this.options.anchor[1] + 'px');
      var r = L.DomEvent.stopPropagation;
      L.DomEvent.on(i, 'click', r)
        .on(i, 'mousedown', r)
        .on(i, 'touchstart', r)
        .on(i, 'dblclick', r)
        .on(i, 'mousewheel', r)
        .on(i, 'contextmenu', r)
        .on(i, 'MozMousePixelScroll', r);
      var o = (this._innerContainer = L.DomUtil.create('div', t + '-inner')),
        a = (this._grabberNode = L.DomUtil.create('div', t + '-grabber'));
      this.options.move || (this._grabberNode.style.visibility = 'hidden');
      var l = L.DomUtil.create('span', 'grabber-icon');
      a.appendChild(l),
        L.DomEvent.on(a, 'mousedown', this._handleMoveStart, this);
      var u = (this._closeNode = L.DomUtil.create('div', t + '-close'));
      this.options.close || (this._closeNode.style.visibility = 'hidden');
      var c = L.DomUtil.create('span', 'grabber-close');
      u.appendChild(c), L.DomEvent.on(u, 'click', this._handleClose, this);
      var d = (this._resizerNode = L.DomUtil.create('div', t + '-resizer'));
      this.options.resize || (this._resizerNode.style.visibility = 'hidden');
      var p = L.DomUtil.create('span', 'grabber-resize');
      d.appendChild(p),
        L.DomEvent.on(d, 'mousedown', this._handleResizeStart, this);
      var y = (this._contentNode = L.DomUtil.create('div', t + '-contents'));
      this.options.contentId && (y.id = this.options.contentId),
        i.appendChild(o),
        o.appendChild(y),
        o.appendChild(a),
        o.appendChild(u),
        o.appendChild(d),
        (this._oldMousePos = { x: 0, y: 0 });
    },
    _handleClose: function () {
      this.close();
    },
    _handleResizeStart: function (t) {
      (this._oldMousePos.x = t.clientX),
        (this._oldMousePos.y = t.clientY),
        L.DomEvent.on(this._map, 'mousemove', this._handleMouseMove, this),
        L.DomEvent.on(this._map, 'mouseup', this._handleMouseUp, this),
        this._map.fire('dialog:resizestart', this),
        (this._resizing = !0);
    },
    _handleMoveStart: function (t) {
      (this._oldMousePos.x = t.clientX),
        (this._oldMousePos.y = t.clientY),
        L.DomEvent.on(this._map, 'mousemove', this._handleMouseMove, this),
        L.DomEvent.on(this._map, 'mouseup', this._handleMouseUp, this),
        this._map.fire('dialog:movestart', this),
        (this._moving = !0);
    },
    _handleMouseMove: function (t) {
      var i = t.originalEvent.clientX - this._oldMousePos.x,
        r = t.originalEvent.clientY - this._oldMousePos.y;
      t.originalEvent.stopPropagation && t.originalEvent.stopPropagation(),
        t.originalEvent.preventDefault && t.originalEvent.preventDefault(),
        this._resizing && this._resize(i, r),
        this._moving && this._move(i, r);
    },
    _handleMouseUp: function () {
      L.DomEvent.off(this._map, 'mousemove', this._handleMouseMove, this),
        L.DomEvent.off(this._map, 'mouseup', this._handleMouseUp, this),
        this._resizing &&
          ((this._resizing = !1), this._map.fire('dialog:resizeend', this)),
        this._moving &&
          ((this._moving = !1), this._map.fire('dialog:moveend', this));
    },
    _move: function (t, i) {
      var r = this.options.anchor[0] + i,
        o = this.options.anchor[1] + t;
      (this.options.anchor[0] = r),
        (this.options.anchor[1] = o),
        (this._container.style.top = this.options.anchor[0] + 'px'),
        (this._container.style.left = this.options.anchor[1] + 'px'),
        this._map.fire('dialog:moving', this),
        (this._oldMousePos.y += i),
        (this._oldMousePos.x += t);
    },
    _resize: function (t, i) {
      var r = this.options.size[0] + t,
        o = this.options.size[1] + i;
      r <= this.options.maxSize[0] &&
        r >= this.options.minSize[0] &&
        ((this.options.size[0] = r),
        (this._container.style.width = this.options.size[0] + 'px'),
        (this._oldMousePos.x += t)),
        o <= this.options.maxSize[1] &&
          o >= this.options.minSize[1] &&
          ((this.options.size[1] = o),
          (this._container.style.height = this.options.size[1] + 'px'),
          (this._oldMousePos.y += i)),
        this._map.fire('dialog:resizing', this);
    },
    _updateContent: function () {
      if (this._content) {
        var t = this._contentNode,
          i =
            typeof this._content == 'function'
              ? this._content(this)
              : this._content;
        if (typeof i == 'string') t.innerHTML = i;
        else {
          for (; t.hasChildNodes(); ) t.removeChild(t.firstChild);
          t.appendChild(i);
        }
      }
    },
    _updateLayout: function () {
      (this._container.style.width = this.options.size[0] + 'px'),
        (this._container.style.height = this.options.size[1] + 'px'),
        (this._container.style.top = this.options.anchor[0] + 'px'),
        (this._container.style.left = this.options.anchor[1] + 'px');
    },
  });
  L.control.dialog = function (t) {
    return new L.Control.Dialog(t);
  };
  ((t, i, r, o) => {
    let a = i.createElement('canvas').getContext('2d'),
      l = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 },
      u,
      c,
      d,
      p,
      y,
      b,
      D,
      O,
      q,
      $,
      w,
      B,
      M,
      K,
      W,
      Y,
      V = {},
      A = {
        el: '[data-coloris]',
        parent: 'body',
        theme: 'default',
        themeMode: 'light',
        rtl: !1,
        wrap: !0,
        margin: 2,
        format: 'hex',
        formatToggle: !1,
        swatches: [],
        swatchesOnly: !1,
        alpha: !0,
        forceAlpha: !1,
        focusInput: !0,
        selectInput: !1,
        inline: !1,
        defaultColor: '#000000',
        clearButton: !1,
        clearLabel: 'Clear',
        closeButton: !1,
        closeLabel: 'Close',
        onChange: () => o,
        a11y: {
          open: 'Open color picker',
          close: 'Close color picker',
          clear: 'Clear the selected color',
          marker: 'Saturation: {s}. Brightness: {v}.',
          hueSlider: 'Hue slider',
          alphaSlider: 'Opacity slider',
          input: 'Color value field',
          format: 'Color format',
          swatch: 'Color swatch',
          instruction:
            'Saturation and brightness selector. Use up, down, left and right arrow keys to select.',
        },
      },
      g = {},
      _ = '',
      v = {},
      T = !1;
    function P(C) {
      if (typeof C == 'object')
        for (let H in C)
          switch (H) {
            case 'el':
              N(C.el), C.wrap !== !1 && X(C.el);
              break;
            case 'parent':
              (u =
                C.parent instanceof HTMLElement
                  ? C.parent
                  : i.querySelector(C.parent)),
                u &&
                  (u.appendChild(c),
                  (A.parent = C.parent),
                  u === i.body && (u = o));
              break;
            case 'themeMode':
              (A.themeMode = C.themeMode),
                C.themeMode === 'auto' &&
                  t.matchMedia &&
                  t.matchMedia('(prefers-color-scheme: dark)').matches &&
                  (A.themeMode = 'dark');
            case 'theme':
              C.theme && (A.theme = C.theme),
                (c.className = `clr-picker clr-${A.theme} clr-${A.themeMode}`),
                A.inline && F();
              break;
            case 'rtl':
              (A.rtl = !!C.rtl),
                Array.from(i.getElementsByClassName('clr-field')).forEach(
                  (rt) => rt.classList.toggle('clr-rtl', A.rtl)
                );
              break;
            case 'margin':
              (C.margin *= 1),
                (A.margin = isNaN(C.margin) ? A.margin : C.margin);
              break;
            case 'wrap':
              C.el && C.wrap && X(C.el);
              break;
            case 'formatToggle':
              (A.formatToggle = !!C.formatToggle),
                (It('clr-format').style.display = A.formatToggle
                  ? 'block'
                  : 'none'),
                A.formatToggle && (A.format = 'auto');
              break;
            case 'swatches':
              if (Array.isArray(C.swatches)) {
                let rt = It('clr-swatches'),
                  pt = i.createElement('div');
                (rt.textContent = ''),
                  C.swatches.forEach((kt, At) => {
                    let vt = i.createElement('button');
                    vt.setAttribute('type', 'button'),
                      vt.setAttribute('id', `clr-swatch-${At}`),
                      vt.setAttribute(
                        'aria-labelledby',
                        `clr-swatch-label clr-swatch-${At}`
                      ),
                      (vt.style.color = kt),
                      (vt.textContent = kt),
                      pt.appendChild(vt);
                  }),
                  C.swatches.length && rt.appendChild(pt),
                  (A.swatches = C.swatches.slice());
              }
              break;
            case 'swatchesOnly':
              (A.swatchesOnly = !!C.swatchesOnly),
                c.setAttribute('data-minimal', A.swatchesOnly);
              break;
            case 'alpha':
              (A.alpha = !!C.alpha), c.setAttribute('data-alpha', A.alpha);
              break;
            case 'inline':
              if (
                ((A.inline = !!C.inline),
                c.setAttribute('data-inline', A.inline),
                A.inline)
              ) {
                let rt = C.defaultColor || A.defaultColor;
                (K = lt(rt)), F(), ot(rt);
              }
              break;
            case 'clearButton':
              typeof C.clearButton == 'object' &&
                (C.clearButton.label &&
                  ((A.clearLabel = C.clearButton.label),
                  (D.innerHTML = A.clearLabel)),
                (C.clearButton = C.clearButton.show)),
                (A.clearButton = !!C.clearButton),
                (D.style.display = A.clearButton ? 'block' : 'none');
              break;
            case 'clearLabel':
              (A.clearLabel = C.clearLabel), (D.innerHTML = A.clearLabel);
              break;
            case 'closeButton':
              (A.closeButton = !!C.closeButton),
                A.closeButton ? c.insertBefore(O, y) : y.appendChild(O);
              break;
            case 'closeLabel':
              (A.closeLabel = C.closeLabel), (O.innerHTML = A.closeLabel);
              break;
            case 'a11y':
              let U = C.a11y,
                tt = !1;
              if (typeof U == 'object')
                for (let rt in U)
                  U[rt] && A.a11y[rt] && ((A.a11y[rt] = U[rt]), (tt = !0));
              if (tt) {
                let rt = It('clr-open-label'),
                  pt = It('clr-swatch-label');
                (rt.innerHTML = A.a11y.open),
                  (pt.innerHTML = A.a11y.swatch),
                  O.setAttribute('aria-label', A.a11y.close),
                  D.setAttribute('aria-label', A.a11y.clear),
                  q.setAttribute('aria-label', A.a11y.hueSlider),
                  w.setAttribute('aria-label', A.a11y.alphaSlider),
                  b.setAttribute('aria-label', A.a11y.input),
                  d.setAttribute('aria-label', A.a11y.instruction);
              }
              break;
            default:
              A[H] = C[H];
          }
    }
    function R(C, H) {
      typeof C == 'string' && typeof H == 'object' && ((g[C] = H), (T = !0));
    }
    function I(C) {
      delete g[C], Object.keys(g).length === 0 && ((T = !1), C === _ && k());
    }
    function S(C) {
      if (T) {
        let H = ['el', 'wrap', 'rtl', 'inline', 'defaultColor', 'a11y'];
        for (let U in g) {
          let tt = g[U];
          if (C.matches(U)) {
            (_ = U), (v = {}), H.forEach((rt) => delete tt[rt]);
            for (let rt in tt)
              v[rt] = Array.isArray(A[rt]) ? A[rt].slice() : A[rt];
            P(tt);
            break;
          }
        }
      }
    }
    function k() {
      Object.keys(v).length > 0 && (P(v), (_ = ''), (v = {}));
    }
    function N(C) {
      C instanceof HTMLElement && (C = [C]),
        Array.isArray(C)
          ? C.forEach((H) => {
              yt(H, 'click', E), yt(H, 'input', it);
            })
          : (yt(i, 'click', C, E), yt(i, 'input', C, it));
    }
    function E(C) {
      A.inline ||
        (S(C.target),
        (M = C.target),
        (W = M.value),
        (K = lt(W)),
        c.classList.add('clr-open'),
        F(),
        ot(W),
        (A.focusInput || A.selectInput) &&
          (b.focus({ preventScroll: !0 }),
          b.setSelectionRange(M.selectionStart, M.selectionEnd)),
        A.selectInput && b.select(),
        (Y || A.swatchesOnly) && ni().shift().focus(),
        M.dispatchEvent(new Event('open', { bubbles: !0 })));
    }
    function F() {
      let C = u,
        H = t.scrollY,
        U = c.offsetWidth,
        tt = c.offsetHeight,
        rt = { left: !1, top: !1 },
        pt,
        kt,
        At,
        vt = { x: 0, y: 0 };
      if (
        (C &&
          ((pt = t.getComputedStyle(C)),
          (kt = parseFloat(pt.marginTop)),
          (At = parseFloat(pt.borderTopWidth)),
          (vt = C.getBoundingClientRect()),
          (vt.y += At + H)),
        !A.inline)
      ) {
        let Zt = M.getBoundingClientRect(),
          oe = Zt.x,
          de = H + Zt.y + Zt.height + A.margin;
        C
          ? ((oe -= vt.x),
            (de -= vt.y),
            oe + U > C.clientWidth && ((oe += Zt.width - U), (rt.left = !0)),
            de + tt > C.clientHeight - kt &&
              tt + A.margin <= Zt.top - (vt.y - H) &&
              ((de -= Zt.height + tt + A.margin * 2), (rt.top = !0)),
            (de += C.scrollTop))
          : (oe + U > i.documentElement.clientWidth &&
              ((oe += Zt.width - U), (rt.left = !0)),
            de + tt - H > i.documentElement.clientHeight &&
              tt + A.margin <= Zt.top &&
              ((de = H + Zt.y - tt - A.margin), (rt.top = !0))),
          c.classList.toggle('clr-left', rt.left),
          c.classList.toggle('clr-top', rt.top),
          (c.style.left = `${oe}px`),
          (c.style.top = `${de}px`),
          (vt.x += c.offsetLeft),
          (vt.y += c.offsetTop);
      }
      V = {
        width: d.offsetWidth,
        height: d.offsetHeight,
        x: d.offsetLeft + vt.x,
        y: d.offsetTop + vt.y,
      };
    }
    function X(C) {
      C instanceof HTMLElement
        ? J(C)
        : Array.isArray(C)
          ? C.forEach(J)
          : i.querySelectorAll(C).forEach(J);
    }
    function J(C) {
      let H = C.parentNode;
      if (!H.classList.contains('clr-field')) {
        let U = i.createElement('div'),
          tt = 'clr-field';
        (A.rtl || C.classList.contains('clr-rtl')) && (tt += ' clr-rtl'),
          (U.innerHTML =
            '<button type="button" aria-labelledby="clr-open-label"></button>'),
          H.insertBefore(U, C),
          (U.className = tt),
          (U.style.color = C.value),
          U.appendChild(C);
      }
    }
    function it(C) {
      let H = C.target.parentNode;
      H.classList.contains('clr-field') && (H.style.color = C.target.value);
    }
    function et(C) {
      if (M && !A.inline) {
        let H = M;
        C &&
          ((M = o),
          W !== H.value &&
            ((H.value = W),
            H.dispatchEvent(new Event('input', { bubbles: !0 })))),
          setTimeout(() => {
            W !== H.value &&
              H.dispatchEvent(new Event('change', { bubbles: !0 }));
          }),
          c.classList.remove('clr-open'),
          T && k(),
          H.dispatchEvent(new Event('close', { bubbles: !0 })),
          A.focusInput && H.focus({ preventScroll: !0 }),
          (M = o);
      }
    }
    function ot(C) {
      let H = Ai(C),
        U = mr(H);
      ne(U.s, U.v),
        Tt(H, U),
        (q.value = U.h),
        (c.style.color = `hsl(${U.h}, 100%, 50%)`),
        ($.style.left = `${(U.h / 360) * 100}%`),
        (p.style.left = `${(V.width * U.s) / 100}px`),
        (p.style.top = `${V.height - (V.height * U.v) / 100}px`),
        (w.value = U.a * 100),
        (B.style.left = `${U.a * 100}%`);
    }
    function lt(C) {
      let H = C.substring(0, 3).toLowerCase();
      return H === 'rgb' || H === 'hsl' ? H : 'hex';
    }
    function ut(C) {
      (C = C !== o ? C : b.value),
        M &&
          ((M.value = C), M.dispatchEvent(new Event('input', { bubbles: !0 }))),
        A.onChange && A.onChange.call(t, C, M),
        i.dispatchEvent(
          new CustomEvent('coloris:pick', {
            detail: { color: C, currentEl: M },
          })
        );
    }
    function Et(C, H) {
      let U = {
          h: q.value * 1,
          s: (C / V.width) * 100,
          v: 100 - (H / V.height) * 100,
          a: w.value / 100,
        },
        tt = ri(U);
      ne(U.s, U.v), Tt(tt, U), ut();
    }
    function ne(C, H) {
      let U = A.a11y.marker;
      (C = C.toFixed(1) * 1),
        (H = H.toFixed(1) * 1),
        (U = U.replace('{s}', C)),
        (U = U.replace('{v}', H)),
        p.setAttribute('aria-label', U);
    }
    function we(C) {
      return {
        pageX: C.changedTouches ? C.changedTouches[0].pageX : C.pageX,
        pageY: C.changedTouches ? C.changedTouches[0].pageY : C.pageY,
      };
    }
    function Nt(C) {
      let H = we(C),
        U = H.pageX - V.x,
        tt = H.pageY - V.y;
      u && (tt += u.scrollTop),
        fe(U, tt),
        C.preventDefault(),
        C.stopPropagation();
    }
    function qt(C, H) {
      let U = p.style.left.replace('px', '') * 1 + C,
        tt = p.style.top.replace('px', '') * 1 + H;
      fe(U, tt);
    }
    function fe(C, H) {
      (C = C < 0 ? 0 : C > V.width ? V.width : C),
        (H = H < 0 ? 0 : H > V.height ? V.height : H),
        (p.style.left = `${C}px`),
        (p.style.top = `${H}px`),
        Et(C, H),
        p.focus();
    }
    function Tt(C = {}, H = {}) {
      let U = A.format;
      for (let pt in C) l[pt] = C[pt];
      for (let pt in H) l[pt] = H[pt];
      let tt = gr(l),
        rt = tt.substring(0, 7);
      switch (
        ((p.style.color = rt),
        (B.parentNode.style.color = rt),
        (B.style.color = tt),
        (y.style.color = tt),
        (d.style.display = 'none'),
        d.offsetHeight,
        (d.style.display = ''),
        (B.nextElementSibling.style.display = 'none'),
        B.nextElementSibling.offsetHeight,
        (B.nextElementSibling.style.display = ''),
        U === 'mixed'
          ? (U = l.a === 1 ? 'hex' : 'rgb')
          : U === 'auto' && (U = K),
        U)
      ) {
        case 'hex':
          b.value = tt;
          break;
        case 'rgb':
          b.value = _r(l);
          break;
        case 'hsl':
          b.value = dn(fn(l));
          break;
      }
      i.querySelector(`.clr-format [value="${U}"]`).checked = !0;
    }
    function Bt() {
      let C = q.value * 1,
        H = p.style.left.replace('px', '') * 1,
        U = p.style.top.replace('px', '') * 1;
      (c.style.color = `hsl(${C}, 100%, 50%)`),
        ($.style.left = `${(C / 360) * 100}%`),
        Et(H, U);
    }
    function bt() {
      let C = w.value / 100;
      (B.style.left = `${C * 100}%`), Tt({ a: C }), ut();
    }
    function ri(C) {
      let H = C.s / 100,
        U = C.v / 100,
        tt = H * U,
        rt = C.h / 60,
        pt = tt * (1 - r.abs((rt % 2) - 1)),
        kt = U - tt;
      (tt = tt + kt), (pt = pt + kt);
      let At = r.floor(rt) % 6,
        vt = [tt, pt, kt, kt, pt, tt][At],
        Zt = [pt, tt, tt, pt, kt, kt][At],
        oe = [kt, kt, pt, tt, tt, pt][At];
      return {
        r: r.round(vt * 255),
        g: r.round(Zt * 255),
        b: r.round(oe * 255),
        a: C.a,
      };
    }
    function fn(C) {
      let H = C.v / 100,
        U = H * (1 - C.s / 100 / 2),
        tt;
      return (
        U > 0 && U < 1 && (tt = r.round(((H - U) / r.min(U, 1 - U)) * 100)),
        { h: C.h, s: tt || 0, l: r.round(U * 100), a: C.a }
      );
    }
    function mr(C) {
      let H = C.r / 255,
        U = C.g / 255,
        tt = C.b / 255,
        rt = r.max(H, U, tt),
        pt = r.min(H, U, tt),
        kt = rt - pt,
        At = rt,
        vt = 0,
        Zt = 0;
      return (
        kt &&
          (rt === H && (vt = (U - tt) / kt),
          rt === U && (vt = 2 + (tt - H) / kt),
          rt === tt && (vt = 4 + (H - U) / kt),
          rt && (Zt = kt / rt)),
        (vt = r.floor(vt * 60)),
        {
          h: vt < 0 ? vt + 360 : vt,
          s: r.round(Zt * 100),
          v: r.round(At * 100),
          a: C.a,
        }
      );
    }
    function Ai(C) {
      let H =
          /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
        U,
        tt;
      return (
        (a.fillStyle = '#000'),
        (a.fillStyle = C),
        (U = H.exec(a.fillStyle)),
        U
          ? (tt = { r: U[3] * 1, g: U[4] * 1, b: U[5] * 1, a: U[6] * 1 })
          : ((U = a.fillStyle
              .replace('#', '')
              .match(/.{2}/g)
              .map((rt) => parseInt(rt, 16))),
            (tt = { r: U[0], g: U[1], b: U[2], a: 1 })),
        tt
      );
    }
    function gr(C) {
      let H = C.r.toString(16),
        U = C.g.toString(16),
        tt = C.b.toString(16),
        rt = '';
      if (
        (C.r < 16 && (H = '0' + H),
        C.g < 16 && (U = '0' + U),
        C.b < 16 && (tt = '0' + tt),
        A.alpha && (C.a < 1 || A.forceAlpha))
      ) {
        let pt = (C.a * 255) | 0;
        (rt = pt.toString(16)), pt < 16 && (rt = '0' + rt);
      }
      return '#' + H + U + tt + rt;
    }
    function _r(C) {
      return !A.alpha || (C.a === 1 && !A.forceAlpha)
        ? `rgb(${C.r}, ${C.g}, ${C.b})`
        : `rgba(${C.r}, ${C.g}, ${C.b}, ${C.a})`;
    }
    function dn(C) {
      return !A.alpha || (C.a === 1 && !A.forceAlpha)
        ? `hsl(${C.h}, ${C.s}%, ${C.l}%)`
        : `hsla(${C.h}, ${C.s}%, ${C.l}%, ${C.a})`;
    }
    function pn() {
      (u = o),
        (c = i.createElement('div')),
        c.setAttribute('id', 'clr-picker'),
        (c.className = 'clr-picker'),
        (c.innerHTML = `<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="${A.a11y.input}"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="${A.a11y.instruction}"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="${A.a11y.hueSlider}"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="${A.a11y.alphaSlider}"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>${A.a11y.format}</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="${A.a11y.clear}">${A.clearLabel}</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="${A.a11y.close}">${A.closeLabel}</button></div><span id="clr-open-label" hidden>${A.a11y.open}</span><span id="clr-swatch-label" hidden>${A.a11y.swatch}</span>`),
        i.body.appendChild(c),
        (d = It('clr-color-area')),
        (p = It('clr-color-marker')),
        (D = It('clr-clear')),
        (O = It('clr-close')),
        (y = It('clr-color-preview')),
        (b = It('clr-color-value')),
        (q = It('clr-hue-slider')),
        ($ = It('clr-hue-marker')),
        (w = It('clr-alpha-slider')),
        (B = It('clr-alpha-marker')),
        N(A.el),
        X(A.el),
        yt(c, 'mousedown', (C) => {
          c.classList.remove('clr-keyboard-nav'), C.stopPropagation();
        }),
        yt(d, 'mousedown', (C) => {
          yt(i, 'mousemove', Nt);
        }),
        yt(d, 'contextmenu', (C) => {
          C.preventDefault();
        }),
        yt(d, 'touchstart', (C) => {
          i.addEventListener('touchmove', Nt, { passive: !1 });
        }),
        yt(p, 'mousedown', (C) => {
          yt(i, 'mousemove', Nt);
        }),
        yt(p, 'touchstart', (C) => {
          i.addEventListener('touchmove', Nt, { passive: !1 });
        }),
        yt(b, 'change', (C) => {
          let H = b.value;
          if (M || A.inline) {
            let U = H === '' ? H : ot(H);
            ut(U);
          }
        }),
        yt(D, 'click', (C) => {
          ut(''), et();
        }),
        yt(O, 'click', (C) => {
          ut(), et();
        }),
        yt(It('clr-format'), 'click', '.clr-format input', (C) => {
          (K = C.target.value), Tt(), ut();
        }),
        yt(c, 'click', '.clr-swatches button', (C) => {
          ot(C.target.textContent), ut(), A.swatchesOnly && et();
        }),
        yt(i, 'mouseup', (C) => {
          i.removeEventListener('mousemove', Nt);
        }),
        yt(i, 'touchend', (C) => {
          i.removeEventListener('touchmove', Nt);
        }),
        yt(i, 'mousedown', (C) => {
          (Y = !1), c.classList.remove('clr-keyboard-nav'), et();
        }),
        yt(i, 'keydown', (C) => {
          let H = C.key,
            U = C.target,
            tt = C.shiftKey;
          if (
            (H === 'Escape'
              ? et(!0)
              : [
                  'Tab',
                  'ArrowUp',
                  'ArrowDown',
                  'ArrowLeft',
                  'ArrowRight',
                ].includes(H) &&
                ((Y = !0), c.classList.add('clr-keyboard-nav')),
            H === 'Tab' && U.matches('.clr-picker *'))
          ) {
            let pt = ni(),
              kt = pt.shift(),
              At = pt.pop();
            tt && U === kt
              ? (At.focus(), C.preventDefault())
              : !tt && U === At && (kt.focus(), C.preventDefault());
          }
        }),
        yt(i, 'click', '.clr-field button', (C) => {
          T && k(),
            C.target.nextElementSibling.dispatchEvent(
              new Event('click', { bubbles: !0 })
            );
        }),
        yt(p, 'keydown', (C) => {
          let H = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
          };
          Object.keys(H).includes(C.key) &&
            (qt(...H[C.key]), C.preventDefault());
        }),
        yt(d, 'click', Nt),
        yt(q, 'input', Bt),
        yt(w, 'input', bt);
    }
    function ni() {
      return Array.from(c.querySelectorAll('input, button')).filter(
        (U) => !!U.offsetWidth
      );
    }
    function It(C) {
      return i.getElementById(C);
    }
    function yt(C, H, U, tt) {
      let rt = Element.prototype.matches || Element.prototype.msMatchesSelector;
      typeof U == 'string'
        ? C.addEventListener(H, (pt) => {
            rt.call(pt.target, U) && tt.call(pt.target, pt);
          })
        : ((tt = U), C.addEventListener(H, tt));
    }
    function oi(C, H) {
      (H = H !== o ? H : []),
        i.readyState !== 'loading'
          ? C(...H)
          : i.addEventListener('DOMContentLoaded', () => {
              C(...H);
            });
    }
    NodeList !== o &&
      NodeList.prototype &&
      !NodeList.prototype.forEach &&
      (NodeList.prototype.forEach = Array.prototype.forEach),
      (t.Coloris = (() => {
        let C = {
          set: P,
          wrap: X,
          close: et,
          setInstance: R,
          removeInstance: I,
          updatePosition: F,
          ready: oi,
        };
        function H(U) {
          oi(() => {
            U && (typeof U == 'string' ? N(U) : P(U));
          });
        }
        for (let U in C)
          H[U] = (...tt) => {
            oi(C[U], tt);
          };
        return H;
      })()),
      oi(pn);
  })(window, document, Math);
  L.Map.mergeOptions({
    almostOver: !0,
    almostDistance: 25,
    almostSamplingPeriod: 50,
    almostOnMouseMove: !0,
  });
  L.Handler.AlmostOver = L.Handler.extend({
    includes: L.Evented || L.Mixin.Events,
    initialize(t) {
      (this._map = t),
        (this._layers = []),
        (this._previous = null),
        (this._marker = null),
        (this._buffer = 0),
        (this.__mouseMoveSampling = (function () {
          let i = new Date();
          return function (r) {
            let o = new Date();
            o - i < this._map.options.almostSamplingPeriod ||
              this._layers.length === 0 ||
              ((i = o),
              this._map.fire('mousemovesample', { latlng: r.latlng }));
          };
        })());
    },
    addHooks() {
      this._map.options.almostOnMouseMove &&
        (this._map.on('mousemove', this.__mouseMoveSampling, this),
        this._map.on('mousemovesample', this._onMouseMove, this)),
        this._map.on('click dblclick', this._onMouseClick, this);
      function t() {
        this._buffer =
          this._map.layerPointToLatLng([0, 0]).lat -
          this._map.layerPointToLatLng([
            this._map.options.almostDistance,
            this._map.options.almostDistance,
          ]).lat;
      }
      this._map.on('viewreset zoomend', t, this), this._map.whenReady(t, this);
    },
    removeHooks() {
      this._map.off('mousemovesample'),
        this._map.off('mousemove', this.__mouseMoveSampling, this),
        this._map.off('click dblclick', this._onMouseClick, this);
    },
    addLayer(t) {
      typeof t.eachLayer == 'function'
        ? t.eachLayer(function (i) {
            this.addLayer(i);
          }, this)
        : (typeof this.indexLayer == 'function' && this.indexLayer(t),
          this._layers.push(t));
    },
    removeLayer(t) {
      if (typeof t.eachLayer == 'function')
        t.eachLayer(function (i) {
          this.removeLayer(i);
        }, this);
      else {
        typeof this.unindexLayer == 'function' && this.unindexLayer(t);
        let i = this._layers.indexOf(t);
        i >= 0 && this._layers.splice(i, 1);
      }
      this._previous = null;
    },
    getClosest(t) {
      let i = L.GeometryUtil.closestLayerSnap,
        r = this._map.options.almostDistance,
        o = [];
      return (
        typeof this.searchBuffer == 'function'
          ? (o = this.searchBuffer(t, this._buffer))
          : (o = this._layers),
        i(this._map, o, t, r, !1)
      );
    },
    _onMouseMove(t) {
      let i = this.getClosest(t.latlng);
      i
        ? (this._previous
            ? L.stamp(this._previous.layer) !== L.stamp(i.layer) &&
              (this._map.fire('almost:out', { layer: this._previous.layer }),
              this._map.fire('almost:over', {
                layer: i.layer,
                latlng: i.latlng,
              }))
            : this._map.fire('almost:over', {
                layer: i.layer,
                latlng: i.latlng,
              }),
          this._map.fire('almost:move', { layer: i.layer, latlng: i.latlng }))
        : this._previous &&
          this._map.fire('almost:out', { layer: this._previous.layer }),
        (this._previous = i);
    },
    _onMouseClick(t) {
      let i = this.getClosest(t.latlng);
      i &&
        this._map.fire(`almost:${t.type}`, {
          layer: i.layer,
          latlng: i.latlng,
        });
    },
  });
  L.LayerIndexMixin !== void 0 &&
    L.Handler.AlmostOver.include(L.LayerIndexMixin);
  L.Map.addInitHook('addHandler', 'almostOver', L.Handler.AlmostOver);
  Array.prototype.findIndex =
    Array.prototype.findIndex ||
    function (t) {
      if (this === null)
        throw new TypeError(
          'Array.prototype.findIndex called on null or undefined'
        );
      if (typeof t != 'function')
        throw new TypeError('callback must be a function');
      for (
        var i = Object(this), r = i.length >>> 0, o = arguments[1], a = 0;
        a < r;
        a++
      )
        if (t.call(o, i[a], a, i)) return a;
      return -1;
    };
  Array.prototype.find =
    Array.prototype.find ||
    function (t) {
      if (this === null)
        throw new TypeError('Array.prototype.find called on null or undefined');
      if (typeof t != 'function')
        throw new TypeError('callback must be a function');
      for (
        var i = Object(this), r = i.length >>> 0, o = arguments[1], a = 0;
        a < r;
        a++
      ) {
        var l = i[a];
        if (t.call(o, l, a, i)) return l;
      }
    };
  typeof Object.assign != 'function' &&
    (Object.assign = function (t) {
      'use strict';
      if (t == null)
        throw new TypeError('Cannot convert undefined or null to object');
      t = Object(t);
      for (var i = 1; i < arguments.length; i++) {
        var r = arguments[i];
        if (r != null)
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
      }
      return t;
    });
  (function (t) {
    t.forEach(function (i) {
      i.hasOwnProperty('remove') ||
        Object.defineProperty(i, 'remove', {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: function () {
            this.parentNode.removeChild(this);
          },
        });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
  Array.prototype.includes ||
    Object.defineProperty(Array.prototype, 'includes', {
      value: function (t, i) {
        if (this == null) throw new TypeError('"this" is null or not defined');
        var r = Object(this),
          o = r.length >>> 0;
        if (o === 0) return !1;
        var a = i | 0,
          l = Math.max(a >= 0 ? a : o - Math.abs(a), 0);
        function u(c, d) {
          return (
            c === d ||
            (typeof c == 'number' &&
              typeof d == 'number' &&
              isNaN(c) &&
              isNaN(d))
          );
        }
        for (; l < o; ) {
          if (u(r[l], t)) return !0;
          l++;
        }
        return !1;
      },
    });
  var $s = {
    name: '@geoman-io/leaflet-geoman-free',
    version: '2.17.0',
    description: 'A Leaflet Plugin For Editing Geometry Layers in Leaflet 1.0',
    keywords: [
      'leaflet',
      'geoman',
      'polygon management',
      'geometry editing',
      'map data',
      'map overlay',
      'polygon',
      'geojson',
      'leaflet-draw',
      'data-field-geojson',
      'ui-leaflet-draw',
    ],
    files: ['dist'],
    main: 'dist/leaflet-geoman.js',
    types: 'dist/leaflet-geoman.d.ts',
    dependencies: {
      '@turf/boolean-contains': '^6.5.0',
      '@turf/kinks': '^6.5.0',
      '@turf/line-intersect': '^6.5.0',
      '@turf/line-split': '^6.5.0',
      lodash: '4.17.21',
      'polyclip-ts': '^0.16.5',
    },
    devDependencies: {
      '@types/leaflet': '^1.7.9',
      'cross-env': '^7.0.3',
      cypress: '6.9.1',
      'cypress-wait-until': '1.7.1',
      esbuild: '^0.20.0',
      eslint: '8.56.0',
      'eslint-config-airbnb-base': '15.0.0',
      'eslint-config-prettier': '9.1.0',
      'eslint-plugin-cypress': '2.15.1',
      'eslint-plugin-import': '2.29.1',
      husky: '^9.0.7',
      leaflet: '1.9.3',
      'lint-staged': '^15.2.1',
      nodemon: '^3.1.0',
      prettier: '3.2.4',
      'prosthetic-hand': '1.3.1',
      'ts-node': '^10.9.2',
    },
    peerDependencies: { leaflet: '^1.2.0' },
    scripts: {
      start: 'pnpm run dev',
      dev: 'cross-env DEV=true ts-node bundle.mjs',
      build: 'ts-node bundle.mjs',
      test: 'cypress run',
      cypress: 'cypress open',
      prepare: 'pnpm run build && husky',
      'eslint-check': 'eslint --print-config . | eslint-config-prettier-check',
      eslint: 'eslint "{src,cypress,demo}/**/*.js" --fix ',
      prettier:
        'prettier --write "{src,cypress,demo}/**/*.{js,css}" --log-level=warn',
      lint: 'pnpm run eslint && pnpm run prettier',
      watch: "nodemon -e js,ts --watch src --exec 'npm run build'",
    },
    repository: {
      type: 'git',
      url: 'git://github.com/geoman-io/leaflet-geoman.git',
    },
    author: {
      name: 'Geoman.io',
      email: 'sales@geoman.io',
      url: 'http://geoman.io',
    },
    license: 'MIT',
    bugs: { url: 'https://github.com/geoman-io/leaflet-geoman/issues' },
    homepage: 'https://geoman.io',
    prettier: { trailingComma: 'es5', tabWidth: 2, semi: !0, singleQuote: !0 },
    'lint-staged': {
      '*.js': 'eslint "{src,cypress,demo}/**/*.js" --fix',
      '*.{js,css,md}': 'prettier --write "{src,cypress,demo}/**/*.{js,css}"',
    },
  };
  var po = le(Hr());
  var wu = {
    tooltips: {
      placeMarker: 'Click to place marker',
      firstVertex: 'Click to place first vertex',
      continueLine: 'Click to continue drawing',
      finishLine: 'Click any existing marker to finish',
      finishPoly: 'Click first marker to finish',
      finishRect: 'Click to finish',
      startCircle: 'Click to place circle center',
      finishCircle: 'Click to finish circle',
      placeCircleMarker: 'Click to place circle marker',
      placeText: 'Click to place text',
      selectFirstLayerFor: 'Select first layer for {action}',
      selectSecondLayerFor: 'Select second layer for {action}',
    },
    actions: {
      finish: 'Finish',
      cancel: 'Cancel',
      removeLastVertex: 'Remove Last Vertex',
      changeColor: 'Change Colors',
    },
    buttonTitles: {
      drawMarkerButton: 'Draw Marker',
      drawPolyButton: 'Draw Polygons',
      drawLineButton: 'Draw Polyline',
      drawArrowLineButton: 'Draw Polyline With Arrows',
      drawCircleButton: 'Draw Circle',
      drawRectButton: 'Draw Rectangle',
      editButton: 'Edit Layers',
      editArrowLineButton: 'Edit Arrow Lines',
      dragButton: 'Drag Layers',
      cutButton: 'Cut Layers',
      deleteButton: 'Remove Layers',
      drawCircleMarkerButton: 'Draw Circle Marker',
      snappingButton: 'Snap dragged marker to other layers and vertices',
      pinningButton: 'Pin shared vertices together',
      rotateButton: 'Rotate Layers',
      changeColorButton: 'Change Colors',
      drawTextButton: 'Draw Text',
      scaleButton: 'Scale Layers',
      autoTracingButton: 'Auto trace Line',
      snapGuidesButton: 'Show SnapGuides',
      unionButton: 'Union layers',
      differenceButton: 'Subtract layers',
    },
    measurements: {
      totalLength: 'Length',
      segmentLength: 'Segment length',
      area: 'Area',
      radius: 'Radius',
      perimeter: 'Perimeter',
      height: 'Height',
      width: 'Width',
      coordinates: 'Position',
      coordinatesMarker: 'Position Marker',
    },
  };
  var xu = {
    tooltips: {
      placeMarker: 'Platziere den Marker mit Klick',
      firstVertex: 'Platziere den ersten Marker mit Klick',
      continueLine: 'Klicke, um weiter zu zeichnen',
      finishLine: 'Beende mit Klick auf existierenden Marker',
      finishPoly: 'Beende mit Klick auf ersten Marker',
      finishRect: 'Beende mit Klick',
      startCircle: 'Platziere das Kreiszentrum mit Klick',
      finishCircle: 'Beende den Kreis mit Klick',
      placeCircleMarker: 'Platziere den Kreismarker mit Klick',
      placeText: 'Platziere den Text mit Klick',
    },
    actions: {
      finish: 'Beenden',
      cancel: 'Abbrechen',
      removeLastVertex: 'Letzten Vertex l\xF6schen',
    },
    buttonTitles: {
      drawMarkerButton: 'Marker zeichnen',
      drawPolyButton: 'Polygon zeichnen',
      drawLineButton: 'Polyline zeichnen',
      drawCircleButton: 'Kreis zeichnen',
      drawRectButton: 'Rechteck zeichnen',
      editButton: 'Layer editieren',
      dragButton: 'Layer bewegen',
      cutButton: 'Layer schneiden',
      deleteButton: 'Layer l\xF6schen',
      drawCircleMarkerButton: 'Kreismarker zeichnen',
      snappingButton: 'Bewegter Layer an andere Layer oder Vertexe einhacken',
      pinningButton: 'Vertexe an der gleichen Position verkn\xFCpfen',
      rotateButton: 'Layer drehen',
      drawTextButton: 'Text zeichnen',
      scaleButton: 'Layer skalieren',
      autoTracingButton: 'Linie automatisch nachzeichen',
    },
    measurements: {
      totalLength: 'L\xE4nge',
      segmentLength: 'Segment L\xE4nge',
      area: 'Fl\xE4che',
      radius: 'Radius',
      perimeter: 'Umfang',
      height: 'H\xF6he',
      width: 'Breite',
      coordinates: 'Position',
      coordinatesMarker: 'Position Marker',
    },
  };
  var ku = {
    tooltips: {
      placeMarker: 'Clicca per posizionare un Marker',
      firstVertex: 'Clicca per posizionare il primo vertice',
      continueLine: 'Clicca per continuare a disegnare',
      finishLine: 'Clicca qualsiasi marker esistente per terminare',
      finishPoly: 'Clicca il primo marker per terminare',
      finishRect: 'Clicca per terminare',
      startCircle: 'Clicca per posizionare il punto centrale del cerchio',
      finishCircle: 'Clicca per terminare il cerchio',
      placeCircleMarker: 'Clicca per posizionare un Marker del cherchio',
    },
    actions: {
      finish: 'Termina',
      cancel: 'Annulla',
      removeLastVertex: "Rimuovi l'ultimo vertice",
    },
    buttonTitles: {
      drawMarkerButton: 'Disegna Marker',
      drawPolyButton: 'Disegna Poligoni',
      drawLineButton: 'Disegna Polilinea',
      drawCircleButton: 'Disegna Cerchio',
      drawRectButton: 'Disegna Rettangolo',
      editButton: 'Modifica Livelli',
      dragButton: 'Sposta Livelli',
      cutButton: 'Ritaglia Livelli',
      deleteButton: 'Elimina Livelli',
      drawCircleMarkerButton: 'Disegna Marker del Cerchio',
      snappingButton:
        'Snap ha trascinato il pennarello su altri strati e vertici',
      pinningButton: 'Pin condiviso vertici insieme',
      rotateButton: 'Ruota livello',
    },
  };
  var Mu = {
    tooltips: {
      placeMarker: 'Klik untuk menempatkan marker',
      firstVertex: 'Klik untuk menempatkan vertex pertama',
      continueLine: 'Klik untuk meneruskan digitasi',
      finishLine: 'Klik pada sembarang marker yang ada untuk mengakhiri',
      finishPoly: 'Klik marker pertama untuk mengakhiri',
      finishRect: 'Klik untuk mengakhiri',
      startCircle: 'Klik untuk menempatkan titik pusat lingkaran',
      finishCircle: 'Klik untuk mengakhiri lingkaran',
      placeCircleMarker: 'Klik untuk menempatkan penanda lingkarann',
    },
    actions: {
      finish: 'Selesai',
      cancel: 'Batal',
      removeLastVertex: 'Hilangkan Vertex Terakhir',
    },
    buttonTitles: {
      drawMarkerButton: 'Digitasi Marker',
      drawPolyButton: 'Digitasi Polygon',
      drawLineButton: 'Digitasi Polyline',
      drawCircleButton: 'Digitasi Lingkaran',
      drawRectButton: 'Digitasi Segi Empat',
      editButton: 'Edit Layer',
      dragButton: 'Geser Layer',
      cutButton: 'Potong Layer',
      deleteButton: 'Hilangkan Layer',
      drawCircleMarkerButton: 'Digitasi Penanda Lingkaran',
      snappingButton:
        'Jepretkan penanda yang ditarik ke lapisan dan simpul lain',
      pinningButton: 'Sematkan simpul bersama bersama',
      rotateButton: 'Putar lapisan',
    },
  };
  var Cu = {
    tooltips: {
      placeMarker: 'Adaug\u0103 un punct',
      firstVertex: 'Apas\u0103 aici pentru a ad\u0103uga primul Vertex',
      continueLine: 'Apas\u0103 aici pentru a continua desenul',
      finishLine: 'Apas\u0103 pe orice obiect pentru a finisa desenul',
      finishPoly: 'Apas\u0103 pe primul obiect pentru a finisa',
      finishRect: 'Apas\u0103 pentru a finisa',
      startCircle: 'Apas\u0103 pentru a desena un cerc',
      finishCircle: 'Apas\u0103 pentru a finisa un cerc',
      placeCircleMarker: 'Adaug\u0103 un punct',
    },
    actions: {
      finish: 'Termin\u0103',
      cancel: 'Anuleaz\u0103',
      removeLastVertex: '\u0218terge ultimul Vertex',
    },
    buttonTitles: {
      drawMarkerButton: 'Adaug\u0103 o bulin\u0103',
      drawPolyButton: 'Deseneaz\u0103 un poligon',
      drawLineButton: 'Deseneaz\u0103 o linie',
      drawCircleButton: 'Deseneaz\u0103 un cerc',
      drawRectButton: 'Deseneaz\u0103 un dreptunghi',
      editButton: 'Editeaz\u0103 straturile',
      dragButton: 'Mut\u0103 straturile',
      cutButton: 'Taie straturile',
      deleteButton: '\u0218terge straturile',
      drawCircleMarkerButton: 'Deseneaz\u0103 marcatorul cercului',
      snappingButton:
        'Fixa\u021Bi marcatorul glisat pe alte straturi \u0219i v\xE2rfuri',
      pinningButton: 'Fixa\u021Bi v\xE2rfurile partajate \xEEmpreun\u0103',
      rotateButton: 'Roti\u021Bi stratul',
    },
  };
  var Pu = {
    tooltips: {
      placeMarker:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440',
      firstVertex:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0432\u044B\u0439 \u043E\u0431\u044A\u0435\u043A\u0442',
      continueLine:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0440\u0438\u0441\u043E\u0432\u0430\u043D\u0438\u0435',
      finishLine:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043B\u044E\u0431\u043E\u0439 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F',
      finishPoly:
        '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0442\u043E\u0447\u043A\u0443, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C',
      finishRect:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C',
      startCircle:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043D\u0442\u0440 \u043A\u0440\u0443\u0433\u0430',
      finishCircle:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441',
      placeCircleMarker:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440',
    },
    actions: {
      finish: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C',
      cancel: '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C',
      removeLastVertex:
        '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435',
    },
    buttonTitles: {
      drawMarkerButton:
        '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0440',
      drawPolyButton:
        '\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u043B\u0438\u0433\u043E\u043D',
      drawLineButton:
        '\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0438\u0432\u0443\u044E',
      drawCircleButton:
        '\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043A\u0440\u0443\u0433',
      drawRectButton:
        '\u0420\u0438\u0441\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A',
      editButton:
        '\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043B\u043E\u0439',
      dragButton:
        '\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0441\u043B\u043E\u0439',
      cutButton:
        '\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C \u0441\u043B\u043E\u0439',
      deleteButton:
        '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043B\u043E\u0439',
      drawCircleMarkerButton:
        '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u043C\u0430\u0440\u043A\u0435\u0440',
      snappingButton:
        '\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u043A \u0434\u0440\u0443\u0433\u0438\u043C \u0441\u043B\u043E\u044F\u043C \u0438 \u0432\u0435\u0440\u0448\u0438\u043D\u0430\u043C',
      pinningButton:
        '\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u043E\u0431\u0449\u0438\u0435 \u0442\u043E\u0447\u043A\u0438 \u0432\u043C\u0435\u0441\u0442\u0435',
      rotateButton:
        '\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u0441\u043B\u043E\u044F',
    },
  };
  var Eu = {
    tooltips: {
      placeMarker: 'Presiona para colocar un marcador',
      firstVertex: 'Presiona para colocar el primer v\xE9rtice',
      continueLine: 'Presiona para continuar dibujando',
      finishLine: 'Presiona cualquier marcador existente para finalizar',
      finishPoly: 'Presiona el primer marcador para finalizar',
      finishRect: 'Presiona para finalizar',
      startCircle: 'Presiona para colocar el centro del c\xEDrculo',
      finishCircle: 'Presiona para finalizar el c\xEDrculo',
      placeCircleMarker: 'Presiona para colocar un marcador de c\xEDrculo',
    },
    actions: {
      finish: 'Finalizar',
      cancel: 'Cancelar',
      removeLastVertex: 'Eliminar \xFAltimo v\xE9rtice',
    },
    buttonTitles: {
      drawMarkerButton: 'Dibujar Marcador',
      drawPolyButton: 'Dibujar Pol\xEDgono',
      drawLineButton: 'Dibujar L\xEDnea',
      drawCircleButton: 'Dibujar C\xEDrculo',
      drawRectButton: 'Dibujar Rect\xE1ngulo',
      editButton: 'Editar Capas',
      dragButton: 'Arrastrar Capas',
      cutButton: 'Cortar Capas',
      deleteButton: 'Eliminar Capas',
      drawCircleMarkerButton: 'Dibujar Marcador de C\xEDrculo',
      snappingButton:
        'El marcador de Snap arrastrado a otras capas y v\xE9rtices',
      pinningButton: 'Fijar juntos los v\xE9rtices compartidos',
      rotateButton: 'Rotar capa',
    },
  };
  var Su = {
    tooltips: {
      placeMarker: 'Klik om een marker te plaatsen',
      firstVertex: 'Klik om het eerste punt te plaatsen',
      continueLine: 'Klik om te blijven tekenen',
      finishLine: 'Klik op een bestaand punt om te be\xEBindigen',
      finishPoly: 'Klik op het eerst punt om te be\xEBindigen',
      finishRect: 'Klik om te be\xEBindigen',
      startCircle: 'Klik om het middelpunt te plaatsen',
      finishCircle: 'Klik om de cirkel te be\xEBindigen',
      placeCircleMarker: 'Klik om een marker te plaatsen',
    },
    actions: {
      finish: 'Bewaar',
      cancel: 'Annuleer',
      removeLastVertex: 'Verwijder laatste punt',
    },
    buttonTitles: {
      drawMarkerButton: 'Plaats Marker',
      drawPolyButton: 'Teken een vlak',
      drawLineButton: 'Teken een lijn',
      drawCircleButton: 'Teken een cirkel',
      drawRectButton: 'Teken een vierkant',
      editButton: 'Bewerk',
      dragButton: 'Verplaats',
      cutButton: 'Knip',
      deleteButton: 'Verwijder',
      drawCircleMarkerButton: 'Plaats Marker',
      snappingButton: 'Snap gesleepte marker naar andere lagen en hoekpunten',
      pinningButton: 'Speld gedeelde hoekpunten samen',
      rotateButton: 'Laag roteren',
    },
  };
  var Tu = {
    tooltips: {
      placeMarker: 'Cliquez pour placer un marqueur',
      firstVertex: 'Cliquez pour placer le premier sommet',
      continueLine: 'Cliquez pour continuer \xE0 dessiner',
      finishLine: "Cliquez sur n'importe quel marqueur pour terminer",
      finishPoly: 'Cliquez sur le premier marqueur pour terminer',
      finishRect: 'Cliquez pour terminer',
      startCircle: 'Cliquez pour placer le centre du cercle',
      finishCircle: 'Cliquez pour finir le cercle',
      placeCircleMarker: 'Cliquez pour placer le marqueur circulaire',
    },
    actions: {
      finish: 'Terminer',
      cancel: 'Annuler',
      removeLastVertex: 'Retirer le dernier sommet',
    },
    buttonTitles: {
      drawMarkerButton: 'Placer des marqueurs',
      drawPolyButton: 'Dessiner des polygones',
      drawLineButton: 'Dessiner des polylignes',
      drawCircleButton: 'Dessiner un cercle',
      drawRectButton: 'Dessiner un rectangle',
      editButton: '\xC9diter des calques',
      dragButton: 'D\xE9placer des calques',
      cutButton: 'Couper des calques',
      deleteButton: 'Supprimer des calques',
      drawCircleMarkerButton: 'Dessiner un marqueur circulaire',
      snappingButton: "Glisser le marqueur vers d'autres couches et sommets",
      pinningButton: '\xC9pingler ensemble les sommets partag\xE9s',
      rotateButton: 'Tourner des calques',
    },
  };
  var Bu = {
    tooltips: {
      placeMarker: '\u5355\u51FB\u653E\u7F6E\u6807\u8BB0',
      firstVertex: '\u5355\u51FB\u653E\u7F6E\u9996\u4E2A\u9876\u70B9',
      continueLine: '\u5355\u51FB\u7EE7\u7EED\u7ED8\u5236',
      finishLine:
        '\u5355\u51FB\u4EFB\u4F55\u5B58\u5728\u7684\u6807\u8BB0\u4EE5\u5B8C\u6210',
      finishPoly:
        '\u5355\u51FB\u7B2C\u4E00\u4E2A\u6807\u8BB0\u4EE5\u5B8C\u6210',
      finishRect: '\u5355\u51FB\u5B8C\u6210',
      startCircle: '\u5355\u51FB\u653E\u7F6E\u5706\u5FC3',
      finishCircle: '\u5355\u51FB\u5B8C\u6210\u5706\u5F62',
      placeCircleMarker: '\u70B9\u51FB\u653E\u7F6E\u5706\u5F62\u6807\u8BB0',
    },
    actions: {
      finish: '\u5B8C\u6210',
      cancel: '\u53D6\u6D88',
      removeLastVertex: '\u79FB\u9664\u6700\u540E\u7684\u9876\u70B9',
    },
    buttonTitles: {
      drawMarkerButton: '\u7ED8\u5236\u6807\u8BB0',
      drawPolyButton: '\u7ED8\u5236\u591A\u8FB9\u5F62',
      drawLineButton: '\u7ED8\u5236\u7EBF\u6BB5',
      drawCircleButton: '\u7ED8\u5236\u5706\u5F62',
      drawRectButton: '\u7ED8\u5236\u957F\u65B9\u5F62',
      editButton: '\u7F16\u8F91\u56FE\u5C42',
      dragButton: '\u62D6\u62FD\u56FE\u5C42',
      cutButton: '\u526A\u5207\u56FE\u5C42',
      deleteButton: '\u5220\u9664\u56FE\u5C42',
      drawCircleMarkerButton: '\u753B\u5706\u5708\u6807\u8BB0',
      snappingButton:
        '\u5C06\u62D6\u52A8\u7684\u6807\u8BB0\u6355\u6349\u5230\u5176\u4ED6\u56FE\u5C42\u548C\u9876\u70B9',
      pinningButton:
        '\u5C06\u5171\u4EAB\u9876\u70B9\u56FA\u5B9A\u5728\u4E00\u8D77',
      rotateButton: '\u65CB\u8F6C\u56FE\u5C42',
    },
  };
  var Au = {
    tooltips: {
      placeMarker: '\u55AE\u64CA\u653E\u7F6E\u6A19\u8A18',
      firstVertex: '\u55AE\u64CA\u653E\u7F6E\u7B2C\u4E00\u500B\u9802\u9EDE',
      continueLine: '\u55AE\u64CA\u7E7C\u7E8C\u7E6A\u88FD',
      finishLine:
        '\u55AE\u64CA\u4EFB\u4F55\u5B58\u5728\u7684\u6A19\u8A18\u4EE5\u5B8C\u6210',
      finishPoly:
        '\u55AE\u64CA\u7B2C\u4E00\u500B\u6A19\u8A18\u4EE5\u5B8C\u6210',
      finishRect: '\u55AE\u64CA\u5B8C\u6210',
      startCircle: '\u55AE\u64CA\u653E\u7F6E\u5713\u5FC3',
      finishCircle: '\u55AE\u64CA\u5B8C\u6210\u5713\u5F62',
      placeCircleMarker: '\u9EDE\u64CA\u653E\u7F6E\u5713\u5F62\u6A19\u8A18',
    },
    actions: {
      finish: '\u5B8C\u6210',
      cancel: '\u53D6\u6D88',
      removeLastVertex: '\u79FB\u9664\u6700\u5F8C\u4E00\u500B\u9802\u9EDE',
    },
    buttonTitles: {
      drawMarkerButton: '\u653E\u7F6E\u6A19\u8A18',
      drawPolyButton: '\u7E6A\u88FD\u591A\u908A\u5F62',
      drawLineButton: '\u7E6A\u88FD\u7DDA\u6BB5',
      drawCircleButton: '\u7E6A\u88FD\u5713\u5F62',
      drawRectButton: '\u7E6A\u88FD\u65B9\u5F62',
      editButton: '\u7DE8\u8F2F\u5716\u5F62',
      dragButton: '\u79FB\u52D5\u5716\u5F62',
      cutButton: '\u88C1\u5207\u5716\u5F62',
      deleteButton: '\u522A\u9664\u5716\u5F62',
      drawCircleMarkerButton: '\u756B\u5713\u5708\u6A19\u8A18',
      snappingButton:
        '\u5C07\u62D6\u52D5\u7684\u6A19\u8A18\u5C0D\u9F4A\u5230\u5176\u4ED6\u5716\u5C64\u548C\u9802\u9EDE',
      pinningButton:
        '\u5C07\u5171\u4EAB\u9802\u9EDE\u56FA\u5B9A\u5728\u4E00\u8D77',
      rotateButton: '\u65CB\u8F49\u5716\u5F62',
    },
  };
  var Du = {
    tooltips: {
      placeMarker: 'Clique para posicionar o marcador',
      firstVertex: 'Clique para posicionar o primeiro v\xE9rtice',
      continueLine: 'Clique para continuar desenhando',
      finishLine: 'Clique em qualquer marcador existente para finalizar',
      finishPoly: 'Clique no primeiro marcador para finalizar',
      finishRect: 'Clique para finalizar',
      startCircle: 'Clique para posicionar o centro do c\xEDrculo',
      finishCircle: 'Clique para finalizar o c\xEDrculo',
      placeCircleMarker: 'Clique para posicionar o marcador circular',
      placeText: 'Clique para inserir texto',
    },
    actions: {
      finish: 'Finalizar',
      cancel: 'Cancelar',
      removeLastVertex: 'Remover \xFAltimo v\xE9rtice',
    },
    buttonTitles: {
      drawMarkerButton: 'Desenhar Marcador',
      drawPolyButton: 'Desenhar Pol\xEDgonos',
      drawLineButton: 'Desenhar Linha Poligonal',
      drawCircleButton: 'Desenhar C\xEDrculo',
      drawRectButton: 'Desenhar Ret\xE2ngulo',
      editButton: 'Editar Camadas',
      dragButton: 'Arrastar Camadas',
      cutButton: 'Recortar Camadas',
      deleteButton: 'Remover Camadas',
      drawCircleMarkerButton: 'Desenhar Marcador de C\xEDrculo',
      snappingButton:
        'Ajustar marcador arrastado a outras camadas e v\xE9rtices',
      pinningButton: 'Unir v\xE9rtices compartilhados',
      rotateButton: 'Rotacionar Camadas',
      drawTextButton: 'Desenhar Texto',
      scaleButton: 'Redimensionar Camadas',
      autoTracingButton: 'Tra\xE7ado Autom\xE1tico de Linha',
    },
    measurements: {
      totalLength: 'Comprimento',
      segmentLength: 'Comprimento do Segmento',
      area: '\xC1rea',
      radius: 'Raio',
      perimeter: 'Per\xEDmetro',
      height: 'Altura',
      width: 'Largura',
      coordinates: 'Posi\xE7\xE3o',
      coordinatesMarker: 'Marcador de Posi\xE7\xE3o',
    },
  };
  var ao = {
    tooltips: {
      placeMarker: 'Clique para colocar marcador',
      firstVertex: 'Clique para colocar primeiro v\xE9rtice',
      continueLine: 'Clique para continuar a desenhar',
      finishLine: 'Clique num marcador existente para terminar',
      finishPoly: 'Clique no primeiro marcador para terminar',
      finishRect: 'Clique para terminar',
      startCircle: 'Clique para colocar o centro do c\xEDrculo',
      finishCircle: 'Clique para terminar o c\xEDrculo',
      placeCircleMarker: 'Clique para colocar marcador de c\xEDrculo',
      placeText: 'Clique para colocar texto',
    },
    actions: {
      finish: 'Terminar',
      cancel: 'Cancelar',
      removeLastVertex: 'Remover \xDAltimo V\xE9rtice',
    },
    buttonTitles: {
      drawMarkerButton: 'Desenhar Marcador',
      drawPolyButton: 'Desenhar Pol\xEDgonos',
      drawLineButton: 'Desenhar Polilinha',
      drawCircleButton: 'Desenhar C\xEDrculo',
      drawRectButton: 'Desenhar Ret\xE2ngulo',
      editButton: 'Editar Camadas',
      dragButton: 'Arrastar Camadas',
      cutButton: 'Cortar Camadas',
      deleteButton: 'Remover Camadas',
      drawCircleMarkerButton: 'Desenhar Marcador de C\xEDrculo',
      snappingButton:
        'Ajustar marcador arrastado a outras camadas e v\xE9rtices',
      pinningButton: 'Unir v\xE9rtices partilhados',
      rotateButton: 'Rodar Camadas',
      drawTextButton: 'Desenhar Texto',
      scaleButton: 'Escalar Camadas',
      autoTracingButton: 'Tra\xE7ado Autom\xE1tico de Linha',
    },
    measurements: {
      totalLength: 'Comprimento',
      segmentLength: 'Comprimento do Segmento',
      area: '\xC1rea',
      radius: 'Raio',
      perimeter: 'Per\xEDmetro',
      height: 'Altura',
      width: 'Largura',
      coordinates: 'Posi\xE7\xE3o',
      coordinatesMarker: 'Marcador de Posi\xE7\xE3o',
    },
  };
  var Ou = {
    tooltips: {
      placeMarker: 'Kliknij, aby umie\u015Bci\u0107 znacznik',
      firstVertex: 'Kliknij, aby umie\u015Bci\u0107 pierwszy wierzcho\u0142ek',
      continueLine: 'Kliknij, aby kontynuowa\u0107 rysowanie',
      finishLine:
        'Kliknij dowolny istniej\u0105cy znacznik, aby zako\u0144czy\u0107',
      finishPoly: 'Kliknij pierwszy znacznik, aby zako\u0144czy\u0107',
      finishRect: 'Kliknij, aby zako\u0144czy\u0107',
      startCircle: 'Kliknij, aby umie\u015Bci\u0107 \u015Brodek okr\u0119gu',
      finishCircle: 'Kliknij, aby zako\u0144czy\u0107 okr\u0105g',
      placeCircleMarker: 'Kliknij, aby umie\u015Bci\u0107 znacznik okr\u0119gu',
      placeText: 'Kliknij, aby umie\u015Bci\u0107 tekst',
    },
    actions: {
      finish: 'Zako\u0144cz',
      cancel: 'Anuluj',
      removeLastVertex: 'Usu\u0144 ostatni wierzcho\u0142ek',
    },
    buttonTitles: {
      drawMarkerButton: 'Rysuj znacznik',
      drawPolyButton: 'Rysuj wielok\u0105t',
      drawLineButton: 'Rysuj lini\u0119',
      drawCircleButton: 'Rysuj okr\u0105g',
      drawRectButton: 'Rysuj prostok\u0105t',
      editButton: 'Edytuj warstwy',
      dragButton: 'Przeci\u0105gnij warstwy',
      cutButton: 'Wytnij warstwy',
      deleteButton: 'Usu\u0144 warstwy',
      drawCircleMarkerButton: 'Rysuj znacznik okr\u0105g\u0142y',
      snappingButton:
        'Przyci\u0105gnij przenoszony znacznik do innych warstw i wierzcho\u0142k\xF3w',
      pinningButton: 'Przypnij wsp\xF3lne wierzcho\u0142ki razem',
      rotateButton: 'Obr\xF3\u0107 warstwy',
      drawTextButton: 'Rysuj tekst',
      scaleButton: 'Skaluj warstwy',
      autoTracingButton: 'Automatyczne \u015Bledzenie linii',
    },
    measurements: {
      totalLength: 'D\u0142ugo\u015B\u0107',
      segmentLength: 'D\u0142ugo\u015B\u0107 odcinka',
      area: 'Obszar',
      radius: 'Promie\u0144',
      perimeter: 'Obw\xF3d',
      height: 'Wysoko\u015B\u0107',
      width: 'Szeroko\u015B\u0107',
      coordinates: 'Pozycja',
      coordinatesMarker: 'Znacznik pozycji',
    },
  };
  var Ru = {
    tooltips: {
      placeMarker: 'Klicka f\xF6r att placera mark\xF6r',
      firstVertex: 'Klicka f\xF6r att placera f\xF6rsta h\xF6rnet',
      continueLine: 'Klicka f\xF6r att forts\xE4tta rita',
      finishLine: 'Klicka p\xE5 en existerande punkt f\xF6r att slutf\xF6ra',
      finishPoly: 'Klicka p\xE5 den f\xF6rsta punkten f\xF6r att slutf\xF6ra',
      finishRect: 'Klicka f\xF6r att slutf\xF6ra',
      startCircle: 'Klicka f\xF6r att placera cirkelns centrum',
      finishCircle: 'Klicka f\xF6r att slutf\xF6ra cirkeln',
      placeCircleMarker: 'Klicka f\xF6r att placera cirkelmark\xF6r',
    },
    actions: {
      finish: 'Slutf\xF6r',
      cancel: 'Avbryt',
      removeLastVertex: 'Ta bort sista h\xF6rnet',
    },
    buttonTitles: {
      drawMarkerButton: 'Rita Mark\xF6r',
      drawPolyButton: 'Rita Polygoner',
      drawLineButton: 'Rita Linje',
      drawCircleButton: 'Rita Cirkel',
      drawRectButton: 'Rita Rektangel',
      editButton: 'Redigera Lager',
      dragButton: 'Dra Lager',
      cutButton: 'Klipp i Lager',
      deleteButton: 'Ta bort Lager',
      drawCircleMarkerButton: 'Rita Cirkelmark\xF6r',
      snappingButton: 'Sn\xE4pp dra mark\xF6ren till andra lager och h\xF6rn',
      pinningButton: 'F\xE4st delade h\xF6rn tillsammans',
      rotateButton: 'Rotera lagret',
    },
  };
  var Iu = {
    tooltips: {
      placeMarker:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7',
      firstVertex:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF',
      continueLine:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03B5\u03C4\u03B5 \u03BD\u03B1 \u03C3\u03C7\u03B5\u03B4\u03B9\u03AC\u03B6\u03B5\u03C4\u03B5',
      finishLine:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03B5 \u03BF\u03C0\u03BF\u03B9\u03BF\u03BD\u03B4\u03AE\u03C0\u03BF\u03C4\u03B5 \u03C5\u03C0\u03AC\u03C1\u03C7\u03BF\u03BD \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03C9\u03B8\u03B5\u03AF',
      finishPoly:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03C3\u03C4\u03BF \u03C0\u03C1\u03CE\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5',
      finishRect:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03B5\u03BB\u03B5\u03B9\u03CE\u03C3\u03B5\u03C4\u03B5',
      startCircle:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u03BA\u03AD\u03BD\u03C4\u03C1\u03BF \u039A\u03CD\u03BA\u03BB\u03BF\u03C5',
      finishCircle:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03BF\u03BB\u03BF\u03BA\u03BB\u03B7\u03C1\u03CE\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF\u03BD \u039A\u03CD\u03BA\u03BB\u03BF',
      placeCircleMarker:
        '\u039A\u03AC\u03BD\u03C4\u03B5 \u03BA\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03BD\u03B1 \u03C4\u03BF\u03C0\u03BF\u03B8\u03B5\u03C4\u03AE\u03C3\u03B5\u03C4\u03B5 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03CC \u0394\u03B5\u03AF\u03BA\u03C4\u03B7',
    },
    actions: {
      finish: '\u03A4\u03AD\u03BB\u03BF\u03C2',
      cancel: '\u0391\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7',
      removeLastVertex:
        '\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u03C4\u03B5\u03BB\u03B5\u03C5\u03C4\u03B1\u03AF\u03BF\u03C5 \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF\u03C5',
    },
    buttonTitles: {
      drawMarkerButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7',
      drawPolyButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u03A0\u03BF\u03BB\u03C5\u03B3\u03CE\u03BD\u03BF\u03C5',
      drawLineButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u0393\u03C1\u03B1\u03BC\u03BC\u03AE\u03C2',
      drawCircleButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03CD\u03BA\u03BB\u03BF\u03C5',
      drawRectButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039F\u03C1\u03B8\u03BF\u03B3\u03C9\u03BD\u03AF\u03BF\u03C5',
      editButton:
        '\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD',
      dragButton:
        '\u039C\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD',
      cutButton:
        '\u0391\u03C0\u03BF\u03BA\u03BF\u03C0\u03AE \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD',
      deleteButton:
        '\u039A\u03B1\u03C4\u03AC\u03C1\u03B3\u03B7\u03C3\u03B7 \u0395\u03C0\u03B9\u03C0\u03AD\u03B4\u03C9\u03BD',
      drawCircleMarkerButton:
        '\u03A3\u03C7\u03B5\u03B4\u03AF\u03B1\u03C3\u03B7 \u039A\u03C5\u03BA\u03BB\u03B9\u03BA\u03BF\u03CD \u0394\u03B5\u03AF\u03BA\u03C4\u03B7',
      snappingButton:
        '\u03A0\u03C1\u03BF\u03C3\u03BA\u03CC\u03BB\u03BB\u03B7\u03C3\u03B7 \u03C4\u03BF\u03C5 \u0394\u03B5\u03AF\u03BA\u03C4\u03B7 \u03BC\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2 \u03C3\u03B5 \u03AC\u03BB\u03BB\u03B1 \u0395\u03C0\u03AF\u03C0\u03B5\u03B4\u03B1 \u03BA\u03B1\u03B9 \u039A\u03BF\u03C1\u03C5\u03C6\u03AD\u03C2',
      pinningButton:
        '\u03A0\u03B5\u03C1\u03B9\u03BA\u03BF\u03C0\u03AE \u03BA\u03BF\u03B9\u03BD\u03CE\u03BD \u03BA\u03BF\u03C1\u03C5\u03C6\u03CE\u03BD \u03BC\u03B1\u03B6\u03AF',
      rotateButton:
        '\u03A0\u03B5\u03C1\u03B9\u03C3\u03C4\u03C1\u03AD\u03C8\u03C4\u03B5 \u03C4\u03BF \u03C3\u03C4\u03C1\u03CE\u03BC\u03B1',
    },
  };
  var zu = {
    tooltips: {
      placeMarker: 'Kattintson a jel\xF6l\u0151 elhelyez\xE9s\xE9hez',
      firstVertex: 'Kattintson az els\u0151 pont elhelyez\xE9s\xE9hez',
      continueLine: 'Kattintson a k\xF6vetkez\u0151 pont elhelyez\xE9s\xE9hez',
      finishLine: 'A befejez\xE9shez kattintson egy megl\xE9v\u0151 pontra',
      finishPoly: 'A befejez\xE9shez kattintson az els\u0151 pontra',
      finishRect: 'Kattintson a befejez\xE9shez',
      startCircle:
        'Kattintson a k\xF6r k\xF6z\xE9ppontj\xE1nak elhelyez\xE9s\xE9hez',
      finishCircle: 'Kattintson a k\xF6r befejez\xE9s\xE9hez',
      placeCircleMarker:
        'Kattintson a k\xF6rjel\xF6l\u0151 elhelyez\xE9s\xE9hez',
    },
    actions: {
      finish: 'Befejez\xE9s',
      cancel: 'M\xE9gse',
      removeLastVertex: 'Utols\xF3 pont elt\xE1vol\xEDt\xE1sa',
    },
    buttonTitles: {
      drawMarkerButton: 'Jel\xF6l\u0151 rajzol\xE1sa',
      drawPolyButton: 'Poligon rajzol\xE1sa',
      drawLineButton: 'Vonal rajzol\xE1sa',
      drawCircleButton: 'K\xF6r rajzol\xE1sa',
      drawRectButton: 'N\xE9gyzet rajzol\xE1sa',
      editButton: 'Elemek szerkeszt\xE9se',
      dragButton: 'Elemek mozgat\xE1sa',
      cutButton: 'Elemek v\xE1g\xE1sa',
      deleteButton: 'Elemek t\xF6rl\xE9se',
      drawCircleMarkerButton: 'K\xF6r jel\xF6l\u0151 rajzol\xE1sa',
      snappingButton:
        'Kapcsolja a jel\xF6lt\u0151t m\xE1sik elemhez vagy ponthoz',
      pinningButton: 'K\xF6z\xF6s pontok \xF6sszek\xF6t\xE9se',
      rotateButton: 'F\xF3lia elforgat\xE1sa',
    },
  };
  var Nu = {
    tooltips: {
      placeMarker: 'Tryk for at placere en mark\xF8r',
      firstVertex: 'Tryk for at placere det f\xF8rste punkt',
      continueLine: 'Tryk for at forts\xE6tte linjen',
      finishLine: 'Tryk p\xE5 et eksisterende punkt for at afslutte',
      finishPoly: 'Tryk p\xE5 det f\xF8rste punkt for at afslutte',
      finishRect: 'Tryk for at afslutte',
      startCircle: 'Tryk for at placere cirklens center',
      finishCircle: 'Tryk for at afslutte cirklen',
      placeCircleMarker: 'Tryk for at placere en cirkelmark\xF8r',
    },
    actions: {
      finish: 'Afslut',
      cancel: 'Afbryd',
      removeLastVertex: 'Fjern sidste punkt',
    },
    buttonTitles: {
      drawMarkerButton: 'Placer mark\xF8r',
      drawPolyButton: 'Tegn polygon',
      drawLineButton: 'Tegn linje',
      drawCircleButton: 'Tegn cirkel',
      drawRectButton: 'Tegn firkant',
      editButton: 'Rediger',
      dragButton: 'Tr\xE6k',
      cutButton: 'Klip',
      deleteButton: 'Fjern',
      drawCircleMarkerButton: 'Tegn cirkelmark\xF8r',
      snappingButton: 'Fastg\xF8r trukket mark\xF8r til andre elementer',
      pinningButton: 'Sammenl\xE6g delte elementer',
      rotateButton: 'Roter laget',
    },
  };
  var Gu = {
    tooltips: {
      placeMarker: 'Klikk for \xE5 plassere punkt',
      firstVertex: 'Klikk for \xE5 plassere f\xF8rste punkt',
      continueLine: 'Klikk for \xE5 tegne videre',
      finishLine: 'Klikk p\xE5 et eksisterende punkt for \xE5 fullf\xF8re',
      finishPoly: 'Klikk f\xF8rste punkt for \xE5 fullf\xF8re',
      finishRect: 'Klikk for \xE5 fullf\xF8re',
      startCircle: 'Klikk for \xE5 sette sirkel midtpunkt',
      finishCircle: 'Klikk for \xE5 fullf\xF8re sirkel',
      placeCircleMarker: 'Klikk for \xE5 plassere sirkel',
      placeText: 'Klikk for \xE5 plassere tekst',
    },
    actions: {
      finish: 'Fullf\xF8r',
      cancel: 'Kanseller',
      removeLastVertex: 'Fjern forrige punkt',
    },
    buttonTitles: {
      drawMarkerButton: 'Tegn punkt',
      drawPolyButton: 'Tegn flate',
      drawLineButton: 'Tegn linje',
      drawCircleButton: 'Tegn sirkel',
      drawRectButton: 'Tegn rektangel',
      editButton: 'Rediger objekter',
      dragButton: 'Dra objekter',
      cutButton: 'Kutt objekter',
      deleteButton: 'Fjern objekter',
      drawCircleMarkerButton: 'Tegn sirkel-punkt',
      snappingButton: 'Fest dratt punkt til andre objekter og punkt',
      pinningButton: 'Pin delte punkter sammen',
      rotateButton: 'Rot\xE9r objekter',
      drawTextButton: 'Tegn tekst',
      scaleButton: 'Skal\xE9r objekter',
      autoTracingButton: 'Automatisk sporing av linje',
    },
    measurements: {
      totalLength: 'Lengde',
      segmentLength: 'Segmentlengde',
      area: 'Omr\xE5de',
      radius: 'Radius',
      perimeter: 'Omriss',
      height: 'H\xF8yde',
      width: 'Bredde',
      coordinates: 'Posisjon',
      coordinatesMarker: 'Posisjonsmark\xF8r',
    },
  };
  var Fu = {
    tooltips: {
      placeMarker:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u062C\u0627\u0646\u0645\u0627\u06CC\u06CC \u0646\u0634\u0627\u0646',
      firstVertex:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0627\u0648\u0644\u06CC\u0646 \u0631\u0623\u0633',
      continueLine:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0627\u062F\u0627\u0645\u0647 \u0631\u0633\u0645',
      finishLine:
        '\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0647\u0631 \u0646\u0634\u0627\u0646 \u0645\u0648\u062C\u0648\u062F \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646',
      finishPoly:
        '\u06A9\u0644\u06CC\u06A9 \u0631\u0648\u06CC \u0627\u0648\u0644\u06CC\u0646 \u0646\u0634\u0627\u0646 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646',
      finishRect:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646',
      startCircle:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0645\u0631\u06A9\u0632 \u062F\u0627\u06CC\u0631\u0647',
      finishCircle:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u067E\u0627\u06CC\u0627\u0646 \u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647',
      placeCircleMarker:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647',
      placeText:
        '\u06A9\u0644\u06CC\u06A9 \u0628\u0631\u0627\u06CC \u0646\u0648\u0634\u062A\u0646 \u0645\u062A\u0646',
    },
    actions: {
      finish: '\u067E\u0627\u06CC\u0627\u0646',
      cancel: '\u0644\u0641\u0648',
      removeLastVertex:
        '\u062D\u0630\u0641 \u0622\u062E\u0631\u06CC\u0646 \u0631\u0623\u0633',
    },
    buttonTitles: {
      drawMarkerButton: '\u062F\u0631\u062C \u0646\u0634\u0627\u0646',
      drawPolyButton:
        '\u0631\u0633\u0645 \u0686\u0646\u062F\u0636\u0644\u0639\u06CC',
      drawLineButton: '\u0631\u0633\u0645 \u062E\u0637',
      drawCircleButton: '\u0631\u0633\u0645 \u062F\u0627\u06CC\u0631\u0647',
      drawRectButton:
        '\u0631\u0633\u0645 \u0686\u0647\u0627\u0631\u0636\u0644\u0639\u06CC',
      editButton:
        '\u0648\u06CC\u0631\u0627\u06CC\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627',
      dragButton:
        '\u062C\u0627\u0628\u062C\u0627\u06CC\u06CC \u0644\u0627\u06CC\u0647\u200C\u0647\u0627',
      cutButton:
        '\u0628\u0631\u0634 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627',
      deleteButton:
        '\u062D\u0630\u0641 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627',
      drawCircleMarkerButton:
        '\u0631\u0633\u0645 \u0646\u0634\u0627\u0646 \u062F\u0627\u06CC\u0631\u0647',
      snappingButton:
        '\u0646\u0634\u0627\u0646\u06AF\u0631 \u0631\u0627 \u0628\u0647 \u0644\u0627\u06CC\u0647\u200C\u0647\u0627 \u0648 \u0631\u0626\u0648\u0633 \u062F\u06CC\u06AF\u0631 \u0628\u06A9\u0634\u06CC\u062F',
      pinningButton:
        '\u0631\u0626\u0648\u0633 \u0645\u0634\u062A\u0631\u06A9 \u0631\u0627 \u0628\u0627 \u0647\u0645 \u067E\u06CC\u0646 \u06A9\u0646\u06CC\u062F',
      rotateButton: '\u0686\u0631\u062E\u0634 \u0644\u0627\u06CC\u0647',
      drawTextButton: '\u0631\u0633\u0645 \u0645\u062A\u0646',
      scaleButton:
        '\u0645\u0642\u06CC\u0627\u0633\u200C\u06AF\u0630\u0627\u0631\u06CC',
      autoTracingButton:
        '\u0631\u062F\u06CC\u0627\u0628 \u062E\u0648\u062F\u06A9\u0627\u0631',
    },
    measurements: {
      totalLength: '\u0637\u0648\u0644',
      segmentLength: '\u0637\u0648\u0644 \u0628\u062E\u0634',
      area: '\u0646\u0627\u062D\u06CC\u0647',
      radius: '\u0634\u0639\u0627\u0639',
      perimeter: '\u0645\u062D\u06CC\u0637',
      height: '\u0627\u0631\u062A\u0641\u0627\u0639',
      width: '\u0639\u0631\u0636',
      coordinates: '\u0645\u0648\u0642\u0639\u06CC\u062A',
      coordinatesMarker:
        '\u0645\u0648\u0642\u0639\u06CC\u062A \u0646\u0634\u0627\u0646',
    },
  };
  var qu = {
    tooltips: {
      placeMarker:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440',
      firstVertex:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043F\u0435\u0440\u0448\u0443 \u0432\u0435\u0440\u0448\u0438\u043D\u0443',
      continueLine:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u043C\u0430\u043B\u044E\u0432\u0430\u0442\u0438',
      finishLine:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439 \u0456\u0441\u043D\u0443\u044E\u0447\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F',
      finishPoly:
        '\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0435\u0440\u0448\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438',
      finishRect:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438',
      startCircle:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0434\u043E\u0434\u0430\u0442\u0438 \u0446\u0435\u043D\u0442\u0440 \u043A\u043E\u043B\u0430',
      finishCircle:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438 \u043A\u043E\u043B\u043E',
      placeCircleMarker:
        '\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440',
    },
    actions: {
      finish: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438',
      cancel: '\u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438',
      removeLastVertex:
        '\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u0432\u0435\u0440\u0448\u0438\u043D\u0443',
    },
    buttonTitles: {
      drawMarkerButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043C\u0430\u0440\u043A\u0435\u0440',
      drawPolyButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u043E\u043B\u0456\u0433\u043E\u043D',
      drawLineButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0438\u0432\u0443',
      drawCircleButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u043E\u043B\u043E',
      drawRectButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043F\u0440\u044F\u043C\u043E\u043A\u0443\u0442\u043D\u0438\u043A',
      editButton:
        '\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0448\u0430\u0440\u0438',
      dragButton:
        '\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0448\u0430\u0440\u0438',
      cutButton:
        '\u0412\u0438\u0440\u0456\u0437\u0430\u0442\u0438 \u0448\u0430\u0440\u0438',
      deleteButton:
        '\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0448\u0430\u0440\u0438',
      drawCircleMarkerButton:
        '\u041C\u0430\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0440\u0443\u0433\u043E\u0432\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440',
      snappingButton:
        '\u041F\u0440\u0438\u0432\u2019\u044F\u0437\u0430\u0442\u0438 \u043F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0443\u0442\u0438\u0439 \u043C\u0430\u0440\u043A\u0435\u0440 \u0434\u043E \u0456\u043D\u0448\u0438\u0445 \u0448\u0430\u0440\u0456\u0432 \u0442\u0430 \u0432\u0435\u0440\u0448\u0438\u043D',
      pinningButton:
        "\u0417\u0432'\u044F\u0437\u0430\u0442\u0438 \u0441\u043F\u0456\u043B\u044C\u043D\u0456 \u0432\u0435\u0440\u0448\u0438\u043D\u0438 \u0440\u0430\u0437\u043E\u043C",
      rotateButton:
        '\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0448\u0430\u0440',
    },
  };
  var Zu = {
    tooltips: {
      placeMarker:
        '\u0130\u015Faret\xE7i yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n',
      firstVertex:
        '\u0130lk tepe noktas\u0131n\u0131 yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n',
      continueLine: '\xC7izime devam etmek i\xE7in t\u0131klay\u0131n',
      finishLine:
        'Bitirmek i\xE7in mevcut herhangi bir i\u015Faret\xE7iyi t\u0131klay\u0131n',
      finishPoly: 'Bitirmek i\xE7in ilk i\u015Faret\xE7iyi t\u0131klay\u0131n',
      finishRect: 'Bitirmek i\xE7in t\u0131klay\u0131n',
      startCircle:
        'Daire merkezine yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n',
      finishCircle: 'Daireyi bitirmek i\xE7in t\u0131klay\u0131n',
      placeCircleMarker:
        'Daire i\u015Faret\xE7isi yerle\u015Ftirmek i\xE7in t\u0131klay\u0131n',
    },
    actions: {
      finish: 'Bitir',
      cancel: '\u0130ptal',
      removeLastVertex: 'Son k\xF6\u015Feyi kald\u0131r',
    },
    buttonTitles: {
      drawMarkerButton: '\xC7izim \u0130\u015Faret\xE7isi',
      drawPolyButton: '\xC7okgenler \xE7iz',
      drawLineButton: '\xC7oklu \xE7izgi \xE7iz',
      drawCircleButton: '\xC7ember \xE7iz',
      drawRectButton: 'Dikd\xF6rtgen \xE7iz',
      editButton: 'Katmanlar\u0131 d\xFCzenle',
      dragButton: 'Katmanlar\u0131 s\xFCr\xFCkle',
      cutButton: 'Katmanlar\u0131 kes',
      deleteButton: 'Katmanlar\u0131 kald\u0131r',
      drawCircleMarkerButton: 'Daire i\u015Faret\xE7isi \xE7iz',
      snappingButton:
        'S\xFCr\xFCklenen i\u015Faret\xE7iyi di\u011Fer katmanlara ve k\xF6\u015Felere yap\u0131\u015Ft\u0131r',
      pinningButton: 'Payla\u015F\u0131lan k\xF6\u015Feleri birbirine sabitle',
      rotateButton: 'Katman\u0131 d\xF6nd\xFCr',
    },
  };
  var Uu = {
    tooltips: {
      placeMarker: 'Kliknut\xEDm vytvo\u0159\xEDte zna\u010Dku',
      firstVertex: 'Kliknut\xEDm vytvo\u0159\xEDte prvn\xED objekt',
      continueLine: 'Kliknut\xEDm pokra\u010Dujte v kreslen\xED',
      finishLine:
        'Kliknut\xED na libovolnou existuj\xEDc\xED zna\u010Dku pro dokon\u010Den\xED',
      finishPoly: 'Vyberte prvn\xED bod pro dokon\u010Den\xED',
      finishRect: 'Klikn\u011Bte pro dokon\u010Den\xED',
      startCircle: 'Kliknut\xEDm p\u0159idejte st\u0159ed kruhu',
      finishCircle:
        '\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0440\u0430\u0434\u0438\u0443\u0441',
      placeCircleMarker: 'Kliknut\xEDm nastavte polom\u011Br',
    },
    actions: {
      finish: 'Dokon\u010Dit',
      cancel: 'Zru\u0161it',
      removeLastVertex: 'Zru\u0161it posledn\xED akci',
    },
    buttonTitles: {
      drawMarkerButton: 'P\u0159idat zna\u010Dku',
      drawPolyButton: 'Nakreslit polygon',
      drawLineButton: 'Nakreslit k\u0159ivku',
      drawCircleButton: 'Nakreslit kruh',
      drawRectButton: 'Nakreslit obd\xE9ln\xEDk',
      editButton: 'Upravit vrstvu',
      dragButton: 'P\u0159eneste vrstvu',
      cutButton: 'Vyjmout vrstvu',
      deleteButton: 'Smazat vrstvu',
      drawCircleMarkerButton: 'P\u0159idat kruhovou zna\u010Dku',
      snappingButton:
        'Nav\xE1zat ta\u017Enou zna\u010Dku k dal\u0161\xEDm vrstv\xE1m a vrchol\u016Fm',
      pinningButton: 'Spojit spole\u010Dn\xE9 body dohromady',
      rotateButton: 'Oto\u010Dte vrstvu',
    },
  };
  var Vu = {
    tooltips: {
      placeMarker:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E',
      firstVertex:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u6700\u521D\u306E\u9802\u70B9\u3092\u914D\u7F6E',
      continueLine:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u63CF\u753B\u3092\u7D9A\u3051\u308B',
      finishLine:
        '\u4EFB\u610F\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86',
      finishPoly:
        '\u6700\u521D\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86',
      finishRect: '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u7D42\u4E86',
      startCircle:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u4E2D\u5FC3\u3092\u914D\u7F6E',
      finishCircle:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u306E\u63CF\u753B\u3092\u7D42\u4E86',
      placeCircleMarker:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u914D\u7F6E',
      placeText:
        '\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u30C6\u30AD\u30B9\u30C8\u3092\u914D\u7F6E',
    },
    actions: {
      finish: '\u7D42\u4E86',
      cancel: '\u30AD\u30E3\u30F3\u30BB\u30EB',
      removeLastVertex: '\u6700\u5F8C\u306E\u9802\u70B9\u3092\u524A\u9664',
    },
    buttonTitles: {
      drawMarkerButton: '\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B',
      drawPolyButton: '\u30DD\u30EA\u30B4\u30F3\u3092\u63CF\u753B',
      drawLineButton: '\u6298\u308C\u7DDA\u3092\u63CF\u753B',
      drawCircleButton: '\u5186\u3092\u63CF\u753B',
      drawRectButton: '\u77E9\u5F62\u3092\u63CF\u753B',
      editButton: '\u30EC\u30A4\u30E4\u30FC\u3092\u7DE8\u96C6',
      dragButton: '\u30EC\u30A4\u30E4\u30FC\u3092\u30C9\u30E9\u30C3\u30B0',
      cutButton: '\u30EC\u30A4\u30E4\u30FC\u3092\u5207\u308A\u53D6\u308A',
      deleteButton: '\u30EC\u30A4\u30E4\u30FC\u3092\u524A\u9664',
      drawCircleMarkerButton:
        '\u5186\u30DE\u30FC\u30AB\u30FC\u3092\u63CF\u753B',
      snappingButton:
        '\u30C9\u30E9\u30C3\u30B0\u3057\u305F\u30DE\u30FC\u30AB\u30FC\u3092\u4ED6\u306E\u30EC\u30A4\u30E4\u30FC\u3084\u9802\u70B9\u306B\u30B9\u30CA\u30C3\u30D7\u3059\u308B',
      pinningButton:
        '\u5171\u6709\u3059\u308B\u9802\u70B9\u3092\u540C\u6642\u306B\u52D5\u304B\u3059',
      rotateButton: '\u30EC\u30A4\u30E4\u30FC\u3092\u56DE\u8EE2',
      drawTextButton: '\u30C6\u30AD\u30B9\u30C8\u3092\u63CF\u753B',
    },
  };
  var Hu = {
    tooltips: {
      placeMarker: 'Klikkaa asettaaksesi merkin',
      firstVertex: 'Klikkaa asettaakseni ensimm\xE4isen osuuden',
      continueLine: 'Klikkaa jatkaaksesi piirt\xE4mist\xE4',
      finishLine: 'Klikkaa olemassa olevaa merkki\xE4 lopettaaksesi',
      finishPoly: 'Klikkaa ensimm\xE4ist\xE4 merkki\xE4 lopettaaksesi',
      finishRect: 'Klikkaa lopettaaksesi',
      startCircle: 'Klikkaa asettaaksesi ympyr\xE4n keskipisteen',
      finishCircle: 'Klikkaa lopettaaksesi ympyr\xE4n',
      placeCircleMarker: 'Klikkaa asettaaksesi ympyr\xE4merkin',
      placeText: 'Klikkaa asettaaksesi tekstin',
    },
    actions: {
      finish: 'Valmis',
      cancel: 'Peruuta',
      removeLastVertex: 'Poista viimeinen osuus',
    },
    buttonTitles: {
      drawMarkerButton: 'Piirr\xE4 merkkej\xE4',
      drawPolyButton: 'Piirr\xE4 monikulmioita',
      drawLineButton: 'Piirr\xE4 viivoja',
      drawCircleButton: 'Piirr\xE4 ympyr\xE4',
      drawRectButton: 'Piirr\xE4 neliskulmioita',
      editButton: 'Muokkaa',
      dragButton: 'Siirr\xE4',
      cutButton: 'Leikkaa',
      deleteButton: 'Poista',
      drawCircleMarkerButton: 'Piirr\xE4 ympyr\xE4merkki',
      snappingButton: 'Kiinnit\xE4 siirrett\xE4v\xE4 merkki toisiin muotoihin',
      pinningButton: 'Kiinnit\xE4 jaetut muodot yhteen',
      rotateButton: 'K\xE4\xE4nn\xE4',
      drawTextButton: 'Piirr\xE4 teksti\xE4',
    },
  };
  var ju = {
    tooltips: {
      placeMarker:
        '\uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694',
      firstVertex:
        '\uCCAB\uBC88\uC9F8 \uAF2D\uC9C0\uC810 \uC704\uCE58\uC744 \uD074\uB9AD\uD558\uC138\uC694',
      continueLine:
        '\uACC4\uC18D \uADF8\uB9AC\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694',
      finishLine:
        '\uB05D\uB0B4\uB824\uBA74 \uAE30\uC874 \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694',
      finishPoly:
        '\uB05D\uB0B4\uB824\uBA74 \uCC98\uC74C \uB9C8\uCEE4\uB97C \uD074\uB9AD\uD558\uC138\uC694',
      finishRect: '\uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694',
      startCircle:
        '\uC6D0\uC758 \uC911\uC2EC\uC774 \uB420 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694',
      finishCircle:
        '\uC6D0\uC744 \uB05D\uB0B4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694',
      placeCircleMarker:
        '\uC6D0 \uB9C8\uCEE4 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694',
      placeText:
        '\uD14D\uC2A4\uD2B8 \uC704\uCE58\uB97C \uD074\uB9AD\uD558\uC138\uC694',
    },
    actions: {
      finish: '\uB05D\uB0B4\uAE30',
      cancel: '\uCDE8\uC18C',
      removeLastVertex: '\uB9C8\uC9C0\uB9C9 \uAF2D\uC9C0\uC810 \uC81C\uAC70',
    },
    buttonTitles: {
      drawMarkerButton: '\uB9C8\uCEE4 \uADF8\uB9AC\uAE30',
      drawPolyButton: '\uB2E4\uAC01\uD615 \uADF8\uB9AC\uAE30',
      drawLineButton: '\uB2E4\uAC01\uC120 \uADF8\uB9AC\uAE30',
      drawCircleButton: '\uC6D0 \uADF8\uB9AC\uAE30',
      drawRectButton: '\uC9C1\uC0AC\uAC01\uD615 \uADF8\uB9AC\uAE30',
      editButton: '\uB808\uC774\uC5B4 \uD3B8\uC9D1\uD558\uAE30',
      dragButton: '\uB808\uC774\uC5B4 \uB04C\uAE30',
      cutButton: '\uB808\uC774\uC5B4 \uC790\uB974\uAE30',
      deleteButton: '\uB808\uC774\uC5B4 \uC81C\uAC70\uD558\uAE30',
      drawCircleMarkerButton: '\uC6D0 \uB9C8\uCEE4 \uADF8\uB9AC\uAE30',
      snappingButton:
        '\uC7A1\uC544\uB048 \uB9C8\uCEE4\uB97C \uB2E4\uB978 \uB808\uC774\uC5B4 \uBC0F \uAF2D\uC9C0\uC810\uC5D0 \uB4E4\uB7EC\uBD99\uAC8C \uD558\uAE30',
      pinningButton:
        '\uACF5\uC720 \uAF2D\uC9C0\uC810\uC744 \uD568\uAED8 \uCC0D\uAE30',
      rotateButton: '\uB808\uC774\uC5B4 \uD68C\uC804\uD558\uAE30',
      drawTextButton: '\uD14D\uC2A4\uD2B8 \uADF8\uB9AC\uAE30',
    },
  };
  var Ku = {
    tooltips: {
      placeMarker:
        '\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      firstVertex:
        '\u0411\u0438\u0440\u0438\u043D\u0447\u0438 \u0447\u043E\u043A\u0443\u043D\u0443 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      continueLine:
        '\u0421\u04AF\u0440\u04E9\u0442 \u0442\u0430\u0440\u0442\u0443\u0443\u043D\u0443 \u0443\u043B\u0430\u043D\u0442\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      finishLine:
        '\u0410\u044F\u043A\u0442\u043E\u043E \u04AF\u0447\u04AF\u043D \u0443\u0447\u0443\u0440\u0434\u0430\u0433\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      finishPoly:
        '\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0438\u0440\u0438\u043D\u0447\u0438 \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      finishRect:
        '\u0411\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      startCircle:
        '\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B\u043D \u0431\u043E\u0440\u0431\u043E\u0440\u0443\u043D \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443\u043D\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      finishCircle:
        '\u0410\u0439\u043B\u0430\u043D\u0430\u043D\u044B \u0431\u04AF\u0442\u04AF\u0440\u04AF\u04AF \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      placeCircleMarker:
        '\u0422\u0435\u0433\u0435\u0440\u0435\u043A \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
      placeText:
        '\u0422\u0435\u043A\u0441\u0442\u0442\u0438 \u0436\u0430\u0439\u0433\u0430\u0448\u0442\u044B\u0440\u0443\u0443 \u04AF\u0447\u04AF\u043D \u0431\u0430\u0441\u044B\u04A3\u044B\u0437',
    },
    actions: {
      finish: '\u0410\u044F\u0433\u044B',
      cancel: '\u0416\u043E\u043A \u043A\u044B\u043B\u0443\u0443',
      removeLastVertex:
        '\u0410\u043A\u044B\u0440\u043A\u044B \u0447\u043E\u043A\u0443\u043D\u0443 \u04E9\u0447\u04AF\u0440\u04AF\u04AF',
    },
    buttonTitles: {
      drawMarkerButton:
        '\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443',
      drawPolyButton:
        '\u041F\u043E\u043B\u0438\u0433\u043E\u043D \u0447\u0438\u0437\u0443\u0443',
      drawLineButton:
        '\u041F\u043E\u043B\u0438\u043B\u0438\u043D\u0438\u044F \u0447\u0438\u0437\u0443\u0443',
      drawCircleButton:
        '\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u0447\u0438\u0437\u0443\u0443',
      drawRectButton:
        '\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A \u0447\u0438\u0437\u0443\u0443',
      editButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u0442\u04AF\u0437\u04E9\u0442\u04AF\u04AF',
      dragButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443 \u043A\u0430\u0440\u0430\u043F \u0441\u04AF\u0439\u043B\u04E9\u04AF',
      cutButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u0431\u0430\u0448\u044B\u043D \u043A\u0435\u0441\u04AF\u04AF',
      deleteButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0447\u04AF\u0440\u04AF\u04AF',
      drawCircleMarkerButton:
        '\u0414\u0430\u0439\u044B\u043D\u0434\u044B \u043C\u0430\u0440\u043A\u0435\u0440\u0434\u0438 \u0447\u0438\u0437\u0443\u0443',
      snappingButton:
        '\u0411\u0430\u0448\u043A\u0430 \u0441\u043B\u043E\u043E\u043F\u0442\u043E\u0440\u0434\u0443\u043D \u0436\u0430\u043D\u0430 \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438\u043D \u0430\u0440\u0430\u0441\u044B\u043D\u0430 \u0447\u0435\u043A\u0438\u043B\u0434\u04E9\u04E9',
      pinningButton:
        '\u0411\u04E9\u043B\u04AF\u0448\u043A\u04E9\u043D \u0432\u0435\u0440\u0442\u0435\u043A\u0441\u0442\u0435\u0440\u0434\u0438 \u0431\u0438\u0440\u0433\u0435 \u0442\u0443\u0442\u0443\u0448\u0442\u0443\u0440\u0443\u0443',
      rotateButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF',
      drawTextButton:
        '\u0422\u0435\u043A\u0441\u0442 \u0447\u0438\u0437\u0443\u0443',
      scaleButton:
        '\u0421\u043B\u043E\u043E\u043F\u0442\u0443\u043D \u04E9\u043B\u0447\u04E9\u043C\u04AF\u043D \u04E9\u0437\u0433\u04E9\u0440\u0442\u04AF\u04AF',
      autoTracingButton:
        '\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0442\u044B\u043A \u0442\u0438\u0437\u043C\u0435\u0433\u0438 \u0447\u0438\u0437\u0443\u0443',
    },
    measurements: {
      totalLength: '\u0423\u0437\u0443\u043D\u0434\u0443\u043A',
      segmentLength:
        '\u0421\u0435\u0433\u043C\u0435\u043D\u0442 \u0443\u0437\u0443\u043D\u0434\u0443\u0433\u0443',
      area: '\u0410\u0439\u043C\u0430\u043A',
      radius: '\u0420\u0430\u0434\u0438\u0443\u0441',
      perimeter: '\u041F\u0435\u0440\u0438\u043C\u0435\u0442\u0440',
      height: '\u0414\u0438\u0430\u043C\u0435\u0442\u0440',
      width: '\u041A\u0435\u043D\u0447\u0438\u043B\u0438\u043A',
      coordinates:
        '\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440',
      coordinatesMarker:
        '\u041C\u0430\u0440\u043A\u0435\u0440\u0434\u0438\u043D \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0442\u0430\u0440\u044B',
    },
  };
  var LL = ao,
    Ie = {
      en: wu,
      de: xu,
      it: ku,
      id: Mu,
      ro: Cu,
      ru: Pu,
      es: Eu,
      nl: Su,
      fr: Tu,
      pt: LL,
      pt_br: Du,
      pt_pt: ao,
      zh: Bu,
      zh_tw: Au,
      pl: Ou,
      sv: Ru,
      el: Iu,
      hu: zu,
      da: Nu,
      no: Gu,
      fa: Fu,
      ua: qu,
      tr: Zu,
      cz: Uu,
      ja: Vu,
      fi: Hu,
      ko: ju,
      ky: Ku,
    };
  var bL = {
      _globalEditModeEnabled: !1,
      enableGlobalEditMode(t) {
        let i = { hideMiddleMarkers: !1, ...t };
        (this._globalEditModeEnabled = !0),
          this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled()),
          L.PM.Utils.findLayers(this.map).forEach((o) => {
            this._isRelevantForEdit(o) && o.pm.enable(i);
          }),
          this.throttledReInitEdit ||
            (this.throttledReInitEdit = L.Util.throttle(
              this.handleLayerAdditionInGlobalEditMode,
              100,
              this
            )),
          (this._addedLayersEdit = {}),
          this.map.on('layeradd', this._layerAddedEdit, this),
          this.map.on('layeradd', this.throttledReInitEdit, this),
          this._fireGlobalEditModeToggled(!0);
      },
      disableGlobalEditMode() {
        (this._globalEditModeEnabled = !1),
          L.PM.Utils.findLayers(this.map).forEach((i) => {
            i.pm.disable();
          }),
          this.map.off('layeradd', this._layerAddedEdit, this),
          this.map.off('layeradd', this.throttledReInitEdit, this),
          this.Toolbar.toggleButton('editMode', this.globalEditModeEnabled()),
          this._fireGlobalEditModeToggled(!1);
      },
      globalEditEnabled() {
        return this.globalEditModeEnabled();
      },
      globalEditModeEnabled() {
        return this._globalEditModeEnabled;
      },
      toggleGlobalEditMode(t = this.globalOptions) {
        this.globalEditModeEnabled()
          ? this.disableGlobalEditMode()
          : this.enableGlobalEditMode(t);
      },
      handleLayerAdditionInGlobalEditMode() {
        let t = this._addedLayersEdit;
        if (((this._addedLayersEdit = {}), this.globalEditModeEnabled()))
          for (let i in t) {
            let r = t[i];
            this._isRelevantForEdit(r) &&
              r.pm.enable({ ...this.globalOptions });
          }
      },
      _layerAddedEdit({ layer: t }) {
        this._addedLayersEdit[L.stamp(t)] = t;
      },
      _isRelevantForEdit(t) {
        return (
          t.pm &&
          !(t instanceof L.LayerGroup) &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.allowEditing
        );
      },
    },
    Wu = bL;
  var wL = {
      _globalArrowEditModeEnabled: !1,
      enableGlobalArrowEditMode(t) {
        (this._arrowheadOptions = {
          fill: !1,
          frequency: 'endonly',
          yawn: 30,
          size: '25px',
          weight: 3,
          showArrowToggle: !0,
        }),
          (this._globalArrowEditModeEnabled = !0);
        let i = {
          hideMiddleMarkers: !0,
          editArrows: this.globalArrowEditModeEnabled(),
          defaultArrowheadOptions: this._arrowheadOptions,
          ...t,
        };
        this.Toolbar.toggleButton(
          'arrowEditMode',
          this.globalArrowEditModeEnabled()
        ),
          L.PM.Utils.findLines(this.map).forEach((o) => {
            this._isRelevantForEdit(o) && o.pm.enable(i);
          }),
          this.throttledReInitEdit ||
            (this.throttledReInitEdit = L.Util.throttle(
              this.handleLayerAdditionInGlobalArrowEditMode,
              100,
              this
            )),
          (this._addedLayersEdit = {}),
          this.map.on('layeradd', this._layerAddedEdit, this),
          this.map.on('layeradd', this.throttledReInitEdit, this),
          this._fireGlobalArrowEditModeToggled(!0);
      },
      disableGlobalArrowEditMode() {
        (this._globalArrowEditModeEnabled = !1),
          L.PM.Utils.findLines(this.map).forEach((i) => {
            i.pm.disable();
          }),
          this.map.off('layeradd', this._layerAddedEdit, this),
          this.map.off('layeradd', this.throttledReInitEdit, this),
          this.Toolbar.toggleButton(
            'arrowEditMode',
            this.globalArrowEditModeEnabled()
          ),
          this._fireGlobalArrowEditModeToggled(!1);
      },
      globalArrowEditModeEnabled() {
        return this._globalArrowEditModeEnabled;
      },
      toggleGlobalArrowEditMode(t = this.globalOptions) {
        this.globalArrowEditModeEnabled()
          ? this.disableGlobalArrowEditMode()
          : this.enableGlobalArrowEditMode(t);
      },
      handleLayerAdditionInGlobalArrowEditMode() {
        let t = this._addedLayersEdit;
        if (((this._addedLayersEdit = {}), this.globalArrowEditModeEnabled()))
          for (let i in t) {
            let r = t[i];
            this._isRelevantForEdit(r) &&
              r.pm.enable({ ...this.globalOptions });
          }
      },
      _layerAddedEdit({ layer: t }) {
        this._addedLayersEdit[L.stamp(t)] = t;
      },
      _isRelevantForEdit(t) {
        return (
          t.pm &&
          !(t instanceof L.LayerGroup) &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.allowEditing
        );
      },
    },
    $u = wL;
  var xL = {
      _globalDragModeEnabled: !1,
      enableGlobalDragMode() {
        let t = L.PM.Utils.findLayers(this.map);
        (this._globalDragModeEnabled = !0),
          (this._addedLayersDrag = {}),
          t.forEach((i) => {
            this._isRelevantForDrag(i) && i.pm.enableLayerDrag();
          }),
          this.throttledReInitDrag ||
            (this.throttledReInitDrag = L.Util.throttle(
              this.reinitGlobalDragMode,
              100,
              this
            )),
          this.map.on('layeradd', this._layerAddedDrag, this),
          this.map.on('layeradd', this.throttledReInitDrag, this),
          this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled()),
          this._fireGlobalDragModeToggled(!0);
      },
      disableGlobalDragMode() {
        let t = L.PM.Utils.findLayers(this.map);
        (this._globalDragModeEnabled = !1),
          t.forEach((i) => {
            i.pm.disableLayerDrag();
          }),
          this.map.off('layeradd', this._layerAddedDrag, this),
          this.map.off('layeradd', this.throttledReInitDrag, this),
          this.Toolbar.toggleButton('dragMode', this.globalDragModeEnabled()),
          this._fireGlobalDragModeToggled(!1);
      },
      globalDragModeEnabled() {
        return !!this._globalDragModeEnabled;
      },
      toggleGlobalDragMode() {
        this.globalDragModeEnabled()
          ? this.disableGlobalDragMode()
          : this.enableGlobalDragMode();
      },
      reinitGlobalDragMode() {
        let t = this._addedLayersDrag;
        if (((this._addedLayersDrag = {}), this.globalDragModeEnabled()))
          for (let i in t) {
            let r = t[i];
            this._isRelevantForDrag(r) && r.pm.enableLayerDrag();
          }
      },
      _layerAddedDrag({ layer: t }) {
        this._addedLayersDrag[L.stamp(t)] = t;
      },
      _isRelevantForDrag(t) {
        return (
          t.pm &&
          !(t instanceof L.LayerGroup) &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.draggable
        );
      },
    },
    Yu = xL;
  var kL = {
      _globalRemovalModeEnabled: !1,
      enableGlobalRemovalMode() {
        (this._globalRemovalModeEnabled = !0),
          this.map.eachLayer((t) => {
            this._isRelevantForRemoval(t) &&
              (t.pm.enabled() && t.pm.disable(),
              t.on('click', this.removeLayer, this));
          }),
          this.throttledReInitRemoval ||
            (this.throttledReInitRemoval = L.Util.throttle(
              this.handleLayerAdditionInGlobalRemovalMode,
              100,
              this
            )),
          (this._addedLayersRemoval = {}),
          this.map.on('layeradd', this._layerAddedRemoval, this),
          this.map.on('layeradd', this.throttledReInitRemoval, this),
          this.Toolbar.toggleButton(
            'removalMode',
            this.globalRemovalModeEnabled()
          ),
          this._fireGlobalRemovalModeToggled(!0);
      },
      disableGlobalRemovalMode() {
        (this._globalRemovalModeEnabled = !1),
          this.map.eachLayer((t) => {
            t.off('click', this.removeLayer, this);
          }),
          this.map.off('layeradd', this._layerAddedRemoval, this),
          this.map.off('layeradd', this.throttledReInitRemoval, this),
          this.Toolbar.toggleButton(
            'removalMode',
            this.globalRemovalModeEnabled()
          ),
          this._fireGlobalRemovalModeToggled(!1);
      },
      globalRemovalEnabled() {
        return this.globalRemovalModeEnabled();
      },
      globalRemovalModeEnabled() {
        return !!this._globalRemovalModeEnabled;
      },
      toggleGlobalRemovalMode() {
        this.globalRemovalModeEnabled()
          ? this.disableGlobalRemovalMode()
          : this.enableGlobalRemovalMode();
      },
      removeLayer(t) {
        let i = t.target;
        this._isRelevantForRemoval(i) &&
          !i.pm.dragging() &&
          (i.removeFrom(this.map.pm._getContainingLayer()),
          i.remove(),
          i instanceof L.LayerGroup
            ? (this._fireRemoveLayerGroup(i),
              this._fireRemoveLayerGroup(this.map, i))
            : (i.pm._fireRemove(i), i.pm._fireRemove(this.map, i)));
      },
      _isRelevantForRemoval(t) {
        return (
          t.pm &&
          !(t instanceof L.LayerGroup) &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.allowRemoval
        );
      },
      handleLayerAdditionInGlobalRemovalMode() {
        let t = this._addedLayersRemoval;
        if (((this._addedLayersRemoval = {}), this.globalRemovalModeEnabled()))
          for (let i in t) {
            let r = t[i];
            this._isRelevantForRemoval(r) &&
              (r.pm.enabled() && r.pm.disable(),
              r.on('click', this.removeLayer, this));
          }
      },
      _layerAddedRemoval({ layer: t }) {
        this._addedLayersRemoval[L.stamp(t)] = t;
      },
    },
    Xu = kL;
  var ML = {
      _globalRotateModeEnabled: !1,
      enableGlobalRotateMode() {
        (this._globalRotateModeEnabled = !0),
          L.PM.Utils.findLayers(this.map)
            .filter((i) => i instanceof L.Polyline)
            .forEach((i) => {
              this._isRelevantForRotate(i) && i.pm.enableRotate();
            }),
          this.throttledReInitRotate ||
            (this.throttledReInitRotate = L.Util.throttle(
              this.handleLayerAdditionInGlobalRotateMode,
              100,
              this
            )),
          (this._addedLayersRotate = {}),
          this.map.on('layeradd', this._layerAddedRotate, this),
          this.map.on('layeradd', this.throttledReInitRotate, this),
          this.Toolbar.toggleButton(
            'rotateMode',
            this.globalRotateModeEnabled()
          ),
          this._fireGlobalRotateModeToggled();
      },
      disableGlobalRotateMode() {
        (this._globalRotateModeEnabled = !1),
          L.PM.Utils.findLayers(this.map)
            .filter((i) => i instanceof L.Polyline)
            .forEach((i) => {
              i.pm.disableRotate();
            }),
          this.map.off('layeradd', this._layerAddedRotate, this),
          this.map.off('layeradd', this.throttledReInitRotate, this),
          this.Toolbar.toggleButton(
            'rotateMode',
            this.globalRotateModeEnabled()
          ),
          this._fireGlobalRotateModeToggled();
      },
      globalRotateModeEnabled() {
        return !!this._globalRotateModeEnabled;
      },
      toggleGlobalRotateMode() {
        this.globalRotateModeEnabled()
          ? this.disableGlobalRotateMode()
          : this.enableGlobalRotateMode();
      },
      _isRelevantForRotate(t) {
        return (
          t.pm &&
          t instanceof L.Polyline &&
          !(t instanceof L.LayerGroup) &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.allowRotation
        );
      },
      handleLayerAdditionInGlobalRotateMode() {
        let t = this._addedLayersRotate;
        if (((this._addedLayersRotate = {}), this.globalRotateModeEnabled()))
          for (let i in t) {
            let r = t[i];
            this._isRelevantForRemoval(r) && r.pm.enableRotate();
          }
      },
      _layerAddedRotate({ layer: t }) {
        this._addedLayersRotate[L.stamp(t)] = t;
      },
    },
    Ju = ML;
  var CL = {
      _globalChangeColorModeEnabled: !1,
      enableGlobalChangeColorMode() {
        (this._globalChangeColorModeEnabled = !0),
          L.PM.Utils.findLayers(this.map).forEach((i) => {
            this._isRelevantForColorChange(i) && i.pm.enableColorChange();
          }),
          this.Toolbar.toggleButton(
            'colorChangeMode',
            this.globalColorChangeModeEnabled()
          ),
          this.Dialog.colorChangeDialog.hideClose(),
          this.Dialog.openColorChangeDialog(),
          this._fireGlobalColorChangeModeToggled();
      },
      disableGlobalColorChangeMode() {
        (this._globalChangeColorModeEnabled = !1),
          L.PM.Utils.findLayers(this.map).forEach((i) => {
            i.pm.disableColorChange();
          }),
          this.Toolbar.toggleButton(
            'colorChangeMode',
            this.globalColorChangeModeEnabled()
          ),
          this.map.off('dialog:moveend', this.updateColorisPosition),
          this.Dialog.closeColorChangeDialog(),
          this._fireGlobalColorChangeModeToggled();
      },
      globalColorChangeModeEnabled() {
        return !!this._globalChangeColorModeEnabled;
      },
      toggleGlobalColorChangeMode() {
        this.globalColorChangeModeEnabled()
          ? this.disableGlobalColorChangeMode()
          : this.enableGlobalChangeColorMode();
      },
      _isRelevantForColorChange(t) {
        return (
          t.pm &&
          ((!L.PM.optIn && !t.options.pmIgnore) ||
            (L.PM.optIn && t.options.pmIgnore === !1)) &&
          !t._pmTempLayer &&
          t.pm.options.allowColorChange &&
          t.pm.getShape() !== 'Text' &&
          t.pm.getShape() !== 'Marker'
        );
      },
    },
    Qu = CL;
  var tc = le(Hr()),
    PL = {
      _fireDrawStart(t = 'Draw', i = {}) {
        this.__fire(
          this._map,
          'pm:drawstart',
          { shape: this._shape, workingLayer: this._layer },
          t,
          i
        );
      },
      _fireDrawEnd(t = 'Draw', i = {}) {
        this.__fire(this._map, 'pm:drawend', { shape: this._shape }, t, i);
      },
      _fireCreate(t, i = 'Draw', r = {}) {
        this.__fire(
          this._map,
          'pm:create',
          { shape: this._shape, marker: t, layer: t },
          i,
          r
        );
      },
      _fireCenterPlaced(t = 'Draw', i = {}) {
        let r = t === 'Draw' ? this._layer : void 0,
          o = t !== 'Draw' ? this._layer : void 0;
        this.__fire(
          this._layer,
          'pm:centerplaced',
          {
            shape: this._shape,
            workingLayer: r,
            layer: o,
            latlng: this._layer.getLatLng(),
          },
          t,
          i
        );
      },
      _fireCut(t, i, r, o = 'Draw', a = {}) {
        this.__fire(
          t,
          'pm:cut',
          { shape: this._shape, layer: i, originalLayer: r },
          o,
          a
        );
      },
      _fireEdit(t = this._layer, i = 'Edit', r = {}) {
        this.__fire(
          t,
          'pm:edit',
          { layer: this._layer, shape: this.getShape() },
          i,
          r
        );
      },
      _fireEnable(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:enable',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireDisable(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:disable',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireUpdate(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:update',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireMarkerDragStart(t, i = void 0, r = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:markerdragstart',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
          },
          r,
          o
        );
      },
      _fireMarkerDrag(t, i = void 0, r = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:markerdrag',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
          },
          r,
          o
        );
      },
      _fireMarkerDragEnd(t, i = void 0, r = void 0, o = 'Edit', a = {}) {
        this.__fire(
          this._layer,
          'pm:markerdragend',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
            intersectionReset: r,
          },
          o,
          a
        );
      },
      _fireDragStart(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:dragstart',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireDrag(t, i = 'Edit', r = {}) {
        this.__fire(
          this._layer,
          'pm:drag',
          { ...t, shape: this.getShape() },
          i,
          r
        );
      },
      _fireDragEnd(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:dragend',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireDragEnable(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:dragenable',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireDragDisable(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:dragdisable',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireRemove(t, i = t, r = 'Edit', o = {}) {
        this.__fire(t, 'pm:remove', { layer: i, shape: this.getShape() }, r, o);
      },
      _fireVertexAdded(t, i, r, o = 'Edit', a = {}) {
        this.__fire(
          this._layer,
          'pm:vertexadded',
          {
            layer: this._layer,
            workingLayer: this._layer,
            marker: t,
            indexPath: i,
            latlng: r,
            shape: this.getShape(),
          },
          o,
          a
        );
      },
      _fireVertexRemoved(t, i, r = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:vertexremoved',
          {
            layer: this._layer,
            marker: t,
            indexPath: i,
            shape: this.getShape(),
          },
          r,
          o
        );
      },
      _fireVertexClick(t, i, r = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:vertexclick',
          {
            layer: this._layer,
            markerEvent: t,
            indexPath: i,
            shape: this.getShape(),
          },
          r,
          o
        );
      },
      _fireIntersect(t, i = this._layer, r = 'Edit', o = {}) {
        this.__fire(
          i,
          'pm:intersect',
          { layer: this._layer, intersection: t, shape: this.getShape() },
          r,
          o
        );
      },
      _fireLayerReset(t, i, r = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:layerreset',
          {
            layer: this._layer,
            markerEvent: t,
            indexPath: i,
            shape: this.getShape(),
          },
          r,
          o
        );
      },
      _fireChange(t, i = 'Edit', r = {}) {
        this.__fire(
          this._layer,
          'pm:change',
          { layer: this._layer, latlngs: t, shape: this.getShape() },
          i,
          r
        );
      },
      _fireTextChange(t, i = 'Edit', r = {}) {
        this.__fire(
          this._layer,
          'pm:textchange',
          { layer: this._layer, text: t, shape: this.getShape() },
          i,
          r
        );
      },
      _fireTextFocus(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:textfocus',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireTextBlur(t = 'Edit', i = {}) {
        this.__fire(
          this._layer,
          'pm:textblur',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      _fireSnapDrag(t, i, r = 'Snapping', o = {}) {
        this.__fire(t, 'pm:snapdrag', i, r, o);
      },
      _fireSnap(t, i, r = 'Snapping', o = {}) {
        this.__fire(t, 'pm:snap', i, r, o);
      },
      _fireUnsnap(t, i, r = 'Snapping', o = {}) {
        this.__fire(t, 'pm:unsnap', i, r, o);
      },
      _fireRotationEnable(t, i, r = 'Rotation', o = {}) {
        this.__fire(
          t,
          'pm:rotateenable',
          {
            layer: this._layer,
            helpLayer: this._rotatePoly,
            shape: this.getShape(),
          },
          r,
          o
        );
      },
      _fireRotationDisable(t, i = 'Rotation', r = {}) {
        this.__fire(
          t,
          'pm:rotatedisable',
          { layer: this._layer, shape: this.getShape() },
          i,
          r
        );
      },
      _fireRotationStart(t, i, r = 'Rotation', o = {}) {
        this.__fire(
          t,
          'pm:rotatestart',
          {
            layer: this._rotationLayer,
            helpLayer: this._layer,
            startAngle: this._startAngle,
            originLatLngs: i,
          },
          r,
          o
        );
      },
      _fireRotation(t, i, r, o = this._rotationLayer, a = 'Rotation', l = {}) {
        this.__fire(
          t,
          'pm:rotate',
          {
            layer: o,
            helpLayer: this._layer,
            startAngle: this._startAngle,
            angle: o.pm.getAngle(),
            angleDiff: i,
            oldLatLngs: r,
            newLatLngs: o.getLatLngs(),
          },
          a,
          l
        );
      },
      _fireRotationEnd(t, i, r, o = 'Rotation', a = {}) {
        this.__fire(
          t,
          'pm:rotateend',
          {
            layer: this._rotationLayer,
            helpLayer: this._layer,
            startAngle: i,
            angle: this._rotationLayer.pm.getAngle(),
            originLatLngs: r,
            newLatLngs: this._rotationLayer.getLatLngs(),
          },
          o,
          a
        );
      },
      _fireActionClick(t, i, r, o = 'Toolbar', a = {}) {
        this.__fire(
          this._map,
          'pm:actionclick',
          { text: t.text, action: t, btnName: i, button: r },
          o,
          a
        );
      },
      _fireButtonClick(t, i, r = 'Toolbar', o = {}) {
        this.__fire(
          this._map,
          'pm:buttonclick',
          { btnName: t, button: i },
          r,
          o
        );
      },
      _fireLangChange(t, i, r, o, a = 'Global', l = {}) {
        this.__fire(
          this.map,
          'pm:langchange',
          { oldLang: t, activeLang: i, fallback: r, translations: o },
          a,
          l
        );
      },
      _fireGlobalDragModeToggled(t, i = 'Global', r = {}) {
        this.__fire(
          this.map,
          'pm:globaldragmodetoggled',
          { enabled: t, map: this.map },
          i,
          r
        );
      },
      _fireGlobalEditModeToggled(t, i = 'Global', r = {}) {
        this.__fire(
          this.map,
          'pm:globaleditmodetoggled',
          { enabled: t, map: this.map },
          i,
          r
        );
      },
      _fireGlobalArrowEditModeToggled(t, i = 'Global', r = {}) {
        this.__fire(
          this.map,
          'pm:globalarroweditmodetoggled',
          { enabled: t, map: this.map },
          i,
          r
        );
      },
      _fireGlobalRemovalModeToggled(t, i = 'Global', r = {}) {
        this.__fire(
          this.map,
          'pm:globalremovalmodetoggled',
          { enabled: t, map: this.map },
          i,
          r
        );
      },
      _fireGlobalCutModeToggled(t = 'Global', i = {}) {
        this.__fire(
          this._map,
          'pm:globalcutmodetoggled',
          { enabled: !!this._enabled, map: this._map },
          t,
          i
        );
      },
      _fireGlobalDrawModeToggled(t = 'Global', i = {}) {
        this.__fire(
          this._map,
          'pm:globaldrawmodetoggled',
          { enabled: this._enabled, shape: this._shape, map: this._map },
          t,
          i
        );
      },
      _fireGlobalRotateModeToggled(t = 'Global', i = {}) {
        this.__fire(
          this.map,
          'pm:globalrotatemodetoggled',
          { enabled: this.globalRotateModeEnabled(), map: this.map },
          t,
          i
        );
      },
      _fireColorChangeEnable(t, i = 'ColorChange', r = {}) {
        this.__fire(
          t,
          'pm:colorchangeenable',
          { layer: this._layer, shape: this.getShape() },
          i,
          r
        );
      },
      _fireColorChangeDisable(t, i = 'ColorChange', r = {}) {
        this.__fire(
          t,
          'pm:colorchangedisable',
          { layer: this._layer, shape: this.getShape() },
          i,
          r
        );
      },
      _fireGlobalColorChangeModeToggled(t = 'Global', i = {}) {
        this.__fire(
          this.map,
          'pm:globalcolorchangemodetoggled',
          { enabled: this.globalColorChangeModeEnabled(), map: this.map },
          t,
          i
        );
      },
      _fireColorChanged(t, i = 'Draw', r = {}) {
        this.__fire(this.map, 'pm:colorchanged', { activeColor: t }, i, r);
      },
      _fireRemoveLayerGroup(t, i = t, r = 'Edit', o = {}) {
        this.__fire(t, 'pm:remove', { layer: i, shape: void 0 }, r, o);
      },
      _fireKeyeventEvent(t, i, r, o = 'Global', a = {}) {
        this.__fire(
          this.map,
          'pm:keyevent',
          { event: t, eventType: i, focusOn: r },
          o,
          a
        );
      },
      _fireArrowheadDrawChangeEvent(t, i = 'Draw', r = {}) {
        this.__fire(
          this._layer,
          'pm:arrowdrawchange',
          { layer: this._layer, arrowheadOptions: t, shape: this.getShape() },
          i,
          r
        );
      },
      _fireArrowheadEditChangeEvent(t, i = 'Edit', r = {}) {
        this.__fire(
          this._layer,
          'pm:arroweditchange',
          { layer: this._layer, arrowheadOptions: t, shape: this.getShape() },
          i,
          r
        );
      },
      _fireMapResetView(t = 'Edit', i = {}) {
        this.__fire(
          this._map,
          'viewreset',
          { layer: this._layer, shape: this.getShape() },
          t,
          i
        );
      },
      __fire(t, i, r, o, a = {}) {
        (r = (0, tc.default)(r, a, { source: o })),
          L.PM.Utils._fireEvent(t, i, r);
      },
    },
    ze = PL;
  var EL = {
      drawArrowLineDialogInit(t = {}) {
        let i = {
          size: [200, 288],
          anchor: [0, -210],
          position: 'topright',
          showArrowToggle: !0,
          ...t,
        };
        return L.control.dialog(i);
      },
      closeDrawArrowLineDialog() {
        this.drawArrowLineDialog?.close();
      },
      getDrawArrowLineDialogBody(t) {
        let i = t.size?.split('px')?.[0] || 25;
        return `
      <div style='padding: 0.5rem 1rem;'>
        <h5 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h5>
        <hr>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='draw-arrow-filled' ${t.fill ? 'checked' : ''}>
          <label class='form-check-label cursor-pointer' for='draw-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='draw-arrow-frequency' min='50' max='200' value='${this._setDrawArrowLineSelectorValue(t.frequency)}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-angle' class='form-label'>Arrow Angle</label>
          <input type='range' class='form-range' id='draw-arrow-angle' min='10' max='100' value='${t.yawn}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-size' class='form-label'>Arrow Size</label>
          <input type='range' class='form-range' id='draw-arrow-size' min='10' max='50' value='${i}'>
        </div>
      </div>`;
      },
      _getDrawArrowLineFrequency(t) {
        let o;
        return (
          t === 200
            ? (o = 'endonly')
            : t >= 120 && t <= 130
              ? (o = 'allvertices')
              : (o = `${250 - t}px`),
          o
        );
      },
      _setDrawArrowLineSelectorValue(t = '') {
        let o = t.replace('px', '') || 'endonly',
          a = !Number.isNaN(+o);
        return o === 'endonly'
          ? 50
          : o === 'allvertices' || (t >= 120 && t <= 130)
            ? 125
            : a
              ? 250 - o
              : o;
      },
      initDrawArrowLineFilledChangedListener(t, i) {
        (this._drawArrowLineDialogElements.arrowFilled =
          L.DomUtil.get('draw-arrow-filled')),
          L.DomEvent.on(
            this._drawArrowLineDialogElements.arrowFilled,
            'change',
            t,
            i
          );
      },
      initDrawArrowLineFrequencyChangedListener(t, i) {
        (this._drawArrowLineDialogElements.arrowFrequency = L.DomUtil.get(
          'draw-arrow-frequency'
        )),
          L.DomEvent.on(
            this._drawArrowLineDialogElements.arrowFrequency,
            'change',
            t,
            i
          );
      },
      initDrawArrowLineAngleChangedListener(t, i) {
        (this._drawArrowLineDialogElements.arrowAngle =
          L.DomUtil.get('draw-arrow-angle')),
          L.DomEvent.on(
            this._drawArrowLineDialogElements.arrowAngle,
            'change',
            t,
            i
          );
      },
      initDrawArrowLineSizeChangedListener(t, i) {
        (this._drawArrowLineDialogElements.arrowSize =
          L.DomUtil.get('draw-arrow-size')),
          L.DomEvent.on(
            this._drawArrowLineDialogElements.arrowSize,
            'change',
            t,
            i
          );
      },
      disableDrawArrowLineEnabledChangedListener(t, i) {
        L.DomEvent.off(
          this._drawArrowLineDialogElements.arrowEnabled,
          'change',
          t,
          i
        );
      },
      disableDrawArrowLineFilledChangedListener(t, i) {
        L.DomEvent.off(
          this._drawArrowLineDialogElements.arrowFilled,
          'change',
          t,
          i
        );
      },
      disableDrawArrowLineFrequencyChangedListener(t, i) {
        L.DomEvent.off(
          this._drawArrowLineDialogElements.arrowFrequency,
          'change',
          t,
          i
        );
      },
      disableDrawArrowLineAngleChangedListener(t, i) {
        L.DomEvent.off(
          this._drawArrowLineDialogElements.arrowAngle,
          'change',
          t,
          i
        );
      },
      disableDrawArrowLineSizeChangedListener(t, i) {
        L.DomEvent.off(
          this._drawArrowLineDialogElements.arrowSize,
          'change',
          t,
          i
        );
      },
      disableAllDrawArrowLineDialogEvents() {
        Object.values(this._drawArrowLineDialogElements).forEach((t) => {
          t && L.DomEvent.off(t, 'change');
        });
      },
      _drawArrowLineDialogElements: {
        arrowEnabled: void 0,
        arrowFilled: void 0,
        arrowFrequency: void 0,
        arrowAngle: void 0,
        arrowSize: void 0,
      },
    },
    Xe = EL;
  var SL = {
      editArrowLineDialogInit(t = {}) {
        let i = {
          size: [200, 288],
          anchor: [0, -210],
          position: 'topright',
          showArrowToggle: !0,
          ...t,
        };
        return L.control.dialog(i);
      },
      closeEditArrowLineDialog() {
        this.editArrowLineDialog?.close();
      },
      getEditArrowLineDialogBody(t) {
        let i = t.size?.split('px')?.[0] || 25,
          r = t.fill ? 'checked' : '';
        return `
      <div style='padding: 0 1rem;'>
        <h5 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h5>
        <hr>
        <div class='form-switch form-check cursor-pointer ${t.showArrowToggle ? '' : 'd-none'}'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-enabled' checked>
          <label class='form-check-label cursor-pointer' for='edit-arrow-enabled'>Enable Arrows</label>
        </div>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-filled' ${r}>
          <label class='form-check-label cursor-pointer' for='edit-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='edit-arrow-frequency' min='50' max='200' value='${this._setEditArrowLineSelectorValue(t.frequency)}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-angle' class='form-label'>Arrow Angle</label>
          <input type='range' class='form-range' id='edit-arrow-angle' min='10' max='100' value='${t.yawn}'>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-size' class='form-label'>Arrow Size</label>
          <input type='range' class='form-range' id='edit-arrow-size' min='10' max='50' value='${i}'>
        </div>
      </div>`;
      },
      _getEditArrowLineFrequency(t) {
        let o;
        return (
          t === 200
            ? (o = 'endonly')
            : t >= 120 && t <= 130
              ? (o = 'allvertices')
              : (o = `${250 - t}px`),
          o
        );
      },
      _setEditArrowLineSelectorValue(t = '') {
        let o = t.replace('px', '') || 'endonly',
          a = !Number.isNaN(+o);
        return o === 'endonly'
          ? 50
          : o === 'allvertices' || (t >= 120 && t <= 130)
            ? 125
            : a
              ? 250 - o
              : o;
      },
      toggleEditArrowLinePropVisibility(t) {
        Array.from(
          document.getElementsByClassName('arrow-visible-prop')
        ).forEach((i) => {
          i.style.display = t ? 'revert' : 'none';
        });
      },
      initEditArrowLineEnabledChangedListener(t, i) {
        (this._editArrowLineDialogElements.arrowEnabled =
          L.DomUtil.get('edit-arrow-enabled')),
          L.DomEvent.on(
            this._editArrowLineDialogElements.arrowEnabled,
            'change',
            t,
            i
          );
      },
      initEditArrowLineFilledChangedListener(t, i) {
        (this._editArrowLineDialogElements.arrowFilled =
          L.DomUtil.get('edit-arrow-filled')),
          L.DomEvent.on(
            this._editArrowLineDialogElements.arrowFilled,
            'change',
            t,
            i
          );
      },
      initEditArrowLineFrequencyChangedListener(t, i) {
        (this._editArrowLineDialogElements.arrowFrequency = L.DomUtil.get(
          'edit-arrow-frequency'
        )),
          L.DomEvent.on(
            this._editArrowLineDialogElements.arrowFrequency,
            'change',
            t,
            i
          );
      },
      initEditArrowLineAngleChangedListener(t, i) {
        (this._editArrowLineDialogElements.arrowAngle =
          L.DomUtil.get('edit-arrow-angle')),
          L.DomEvent.on(
            this._editArrowLineDialogElements.arrowAngle,
            'change',
            t,
            i
          );
      },
      initEditArrowLineSizeChangedListener(t, i) {
        (this._editArrowLineDialogElements.arrowSize =
          L.DomUtil.get('edit-arrow-size')),
          L.DomEvent.on(
            this._editArrowLineDialogElements.arrowSize,
            'change',
            t,
            i
          );
      },
      disableEditArrowLineEnabledChangedListener(t, i) {
        L.DomEvent.off(
          this._editArrowLineDialogElements.arrowEnabled,
          'change',
          t,
          i
        );
      },
      disableEditArrowLineFilledChangedListener(t, i) {
        L.DomEvent.off(
          this._editArrowLineDialogElements.arrowFilled,
          'change',
          t,
          i
        );
      },
      disableEditArrowLineFrequencyChangedListener(t, i) {
        L.DomEvent.off(
          this._editArrowLineDialogElements.arrowFrequency,
          'change',
          t,
          i
        );
      },
      disableEditArrowLineAngleChangedListener(t, i) {
        L.DomEvent.off(
          this._editArrowLineDialogElements.arrowAngle,
          'change',
          t,
          i
        );
      },
      disableEditArrowLineSizeChangedListener(t, i) {
        L.DomEvent.off(
          this._editArrowLineDialogElements.arrowSize,
          'change',
          t,
          i
        );
      },
      disableAllEditArrowLineDialogEvents() {
        Object.values(this._editArrowLineDialogElements).forEach((t) => {
          t && L.DomEvent.off(t, 'change');
        });
      },
      _editArrowLineDialogElements: {
        arrowEnabled: void 0,
        arrowFilled: void 0,
        arrowFrequency: void 0,
        arrowAngle: void 0,
        arrowSize: void 0,
      },
    },
    lo = SL;
  var TL = {
      colorChangeDialogInit(t = {}) {
        return (
          (this.colorChangeDialog = L.control.dialog({
            size: [200, 300],
            anchor: [0, -210],
            position: 'topright',
            contentId: 'color-change',
            ...t,
          })),
          this.colorChangeDialog
        );
      },
      openColorChangeDialog() {
        this.colorChangeDialog?.open();
      },
      closeColorChangeDialog() {
        this.colorChangeDialog?.close();
      },
      toggleColorChangeDialog() {
        this.colorChangeDialog?.isOpen()
          ? this.colorChangeDialog?.close()
          : (this.colorChangeDialog?.open(),
            this.drawArrowLineDialog?.isOpen()
              ? this.colorChangeDialog.setLocation([275, -210])
              : this.colorChangeDialog.setLocation([0, -210])),
          this.updateColorisPosition();
      },
      enableColorChange() {
        if (!this.options.allowColorChange) {
          this.disableColorChange();
          return;
        }
        (this._colorChangeEnabled = !0),
          L.DomUtil.addClass(
            this._layer.getElement(),
            'leaflet-pm-changecolor'
          ),
          this._layer.on('remove', this.disableColorChange, this),
          this._layer.on('click', this.updateShapeStyle, this),
          this._fireColorChangeEnable(this._layer);
      },
      disableColorChange() {
        (this._colorChangeEnabled = !1),
          L.DomUtil.removeClass(
            this._layer.getElement(),
            'leaflet-pm-changecolor'
          ),
          this._layer.off('remove', this.disableColorChange, this),
          this._layer.off('click', this.updateShapeStyle, this),
          this._fireColorChangeDisable(this._layer);
      },
      colorChangeEnabled() {
        return this._colorChangeEnabled;
      },
      updateColorisPosition() {
        window.Coloris?.updatePosition();
      },
      updateShapeStyle(t) {
        t.target.setStyle({ color: this.options.activeColor }),
          this._fireUpdate(),
          t.target._map.fire('viewreset', t);
      },
      colorChangeInit(t, i = {}) {
        Coloris({
          parent: '#color-change',
          theme: 'polaroid',
          themeMode: 'light',
          alpha: !1,
          closeButton: !1,
          inline: !0,
          defaultColor: i.activeColor || '#3388ff',
          onChange: (r) => {
            let o = { color: r };
            t.pm.setGlobalStyle({
              activeColor: r,
              templineStyle: o,
              hintlineStyle: { ...o, dashArray: '5,5' },
              pathOptions: o,
            }),
              t.pm._fireColorChanged(r, 'Global');
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
          ...i,
        });
      },
    },
    Je = TL;
  var BL = () => ({
      _lastEvents: { keydown: void 0, keyup: void 0, current: void 0 },
      _initKeyListener(t) {
        (this.map = t),
          L.DomEvent.on(document, 'keydown keyup', this._onKeyListener, this),
          L.DomEvent.on(window, 'blur', this._onBlur, this),
          t.once('unload', this._unbindKeyListenerEvents, this);
      },
      _unbindKeyListenerEvents() {
        L.DomEvent.off(document, 'keydown keyup', this._onKeyListener, this),
          L.DomEvent.off(window, 'blur', this._onBlur, this);
      },
      _onKeyListener(t) {
        let i = 'document';
        this.map.getContainer().contains(t.target) && (i = 'map');
        let r = { event: t, eventType: t.type, focusOn: i };
        (this._lastEvents[t.type] = r),
          (this._lastEvents.current = r),
          this.map.pm._fireKeyeventEvent(t, t.type, i);
      },
      _onBlur(t) {
        t.altKey = !1;
        let i = { event: t, eventType: t.type, focusOn: 'document' };
        (this._lastEvents[t.type] = i), (this._lastEvents.current = i);
      },
      getLastKeyEvent(t = 'current') {
        return this._lastEvents[t];
      },
      isShiftKeyPressed() {
        return this._lastEvents.current?.event.shiftKey;
      },
      isAltKeyPressed() {
        return this._lastEvents.current?.event.altKey;
      },
      isCtrlKeyPressed() {
        return this._lastEvents.current?.event.ctrlKey;
      },
      isMetaKeyPressed() {
        return this._lastEvents.current?.event.metaKey;
      },
      getPressedKey() {
        return this._lastEvents.current?.event.key;
      },
    }),
    ec = BL;
  var uo = le(er());
  function at(t) {
    let i = L.PM.activeLang;
    return (0, uo.default)(Ie[i], t) || (0, uo.default)(Ie.en, t) || t;
  }
  function ir(t) {
    for (let i = 0; i < t.length; i += 1) {
      let r = t[i];
      if (Array.isArray(r)) {
        if (ir(r)) return !0;
      } else if (r != null && r !== '') return !0;
    }
    return !1;
  }
  function rr(t) {
    return t.reduce((i, r) => {
      if (r.length !== 0) {
        let o = Array.isArray(r) ? rr(r) : r;
        Array.isArray(o) ? o.length !== 0 && i.push(o) : i.push(o);
      }
      return i;
    }, []);
  }
  function mb(t, i, r) {
    let o = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 },
      { a, b: l, f: u } = o,
      c = t.lng,
      d = t.lat,
      p = r,
      y = Math.PI,
      b = (i * y) / 180,
      D = Math.sin(b),
      O = Math.cos(b),
      q = (1 - u) * Math.tan((d * y) / 180),
      $ = 1 / Math.sqrt(1 + q * q),
      w = q * $,
      B = Math.atan2(q, O),
      M = $ * D,
      K = 1 - M * M,
      W = (K * (a * a - l * l)) / (l * l),
      Y = 1 + (W / 16384) * (4096 + W * (-768 + W * (320 - 175 * W))),
      V = (W / 1024) * (256 + W * (-128 + W * (74 - 47 * W))),
      A = p / (l * Y),
      g = 2 * Math.PI,
      _,
      v,
      T;
    for (; Math.abs(A - g) > 1e-12; ) {
      (_ = Math.cos(2 * B + A)), (v = Math.sin(A)), (T = Math.cos(A));
      let F =
        V *
        v *
        (_ +
          (V / 4) *
            (T * (-1 + 2 * _ * _) -
              (V / 6) * _ * (-3 + 4 * v * v) * (-3 + 4 * _ * _)));
      (g = A), (A = p / (l * Y) + F);
    }
    let P = w * v - $ * T * O,
      R = Math.atan2(w * T + $ * v * O, (1 - u) * Math.sqrt(M * M + P * P)),
      I = Math.atan2(v * D, $ * T - w * v * O),
      S = (u / 16) * K * (4 + u * (4 - 3 * K)),
      k = I - (1 - S) * u * M * (A + S * v * (_ + S * T * (-1 + 2 * _ * _))),
      N = c + (k * 180) / y,
      E = (R * 180) / y;
    return L.latLng(N, E);
  }
  function co(t, i, r, o, a = !0) {
    let l,
      u,
      c,
      d = [];
    for (let p = 0; p < r; p += 1) {
      if (a)
        (l = (p * 360) / r + o),
          (u = mb(t, l, i)),
          (c = L.latLng(u.lng, u.lat));
      else {
        let y = t.lat + Math.cos((2 * p * Math.PI) / r) * i,
          b = t.lng + Math.sin((2 * p * Math.PI) / r) * i;
        c = L.latLng(y, b);
      }
      d.push(c);
    }
    return d;
  }
  function gb(t, i, r) {
    i = (i + 360) % 360;
    let o = Math.PI / 180,
      a = 180 / Math.PI,
      { R: l } = L.CRS.Earth,
      u = t.lng * o,
      c = t.lat * o,
      d = i * o,
      p = Math.sin(c),
      y = Math.cos(c),
      b = Math.cos(r / l),
      D = Math.sin(r / l),
      O = Math.asin(p * b + y * D * Math.cos(d)),
      q = u + Math.atan2(Math.sin(d) * D * y, b - p * Math.sin(O));
    q *= a;
    let $ = q - 360,
      w = q < -180 ? q + 360 : q;
    return (q = q > 180 ? $ : w), L.latLng([O * a, q]);
  }
  function nr(t, i, r) {
    let o = t.latLngToContainerPoint(i),
      a = t.latLngToContainerPoint(r),
      l = (Math.atan2(a.y - o.y, a.x - o.x) * 180) / Math.PI + 90;
    return (l += l < 0 ? 360 : 0), l;
  }
  function xi(t, i, r, o) {
    let a = nr(t, i, r);
    return gb(i, a, o);
  }
  function Sc(t, i, r = 'asc') {
    if (!i || Object.keys(i).length === 0) return (d, p) => d - p;
    let o = Object.keys(i),
      a,
      l = o.length - 1,
      u = {};
    for (; l >= 0; ) (a = o[l]), (u[a.toLowerCase()] = i[a]), (l -= 1);
    function c(d) {
      if (d instanceof L.Marker) return 'Marker';
      if (d instanceof L.Circle) return 'Circle';
      if (d instanceof L.CircleMarker) return 'CircleMarker';
      if (d instanceof L.Rectangle) return 'Rectangle';
      if (d instanceof L.Polygon) return 'Polygon';
      if (d instanceof L.Polyline) return 'Line';
    }
    return (d, p) => {
      let y, b;
      if (t === 'instanceofShape') {
        if (
          ((y = c(d.layer).toLowerCase()),
          (b = c(p.layer).toLowerCase()),
          !y || !b)
        )
          return 0;
      } else {
        if (!d.hasOwnProperty(t) || !p.hasOwnProperty(t)) return 0;
        (y = d[t].toLowerCase()), (b = p[t].toLowerCase());
      }
      let D = y in u ? u[y] : Number.MAX_SAFE_INTEGER,
        O = b in u ? u[b] : Number.MAX_SAFE_INTEGER,
        q = 0;
      return D < O ? (q = -1) : D > O && (q = 1), r === 'desc' ? q * -1 : q;
    };
  }
  function ye(t, i = t.getLatLngs()) {
    return t instanceof L.Polygon
      ? L.polygon(i).getLatLngs()
      : L.polyline(i).getLatLngs();
  }
  function fo(t, i) {
    if (i.options.crs?.projection?.MAX_LATITUDE) {
      let r = i.options.crs?.projection?.MAX_LATITUDE;
      t.lat = Math.max(Math.min(r, t.lat), -r);
    }
    return t;
  }
  function Ne(t) {
    return (
      t.options.renderer ||
      (t._map &&
        (t._map._getPaneRenderer(t.options.pane) ||
          t._map.options.renderer ||
          t._map._renderer)) ||
      t._renderer
    );
  }
  var _b = L.Class.extend({
      includes: [Wu, $u, Yu, Xu, Ju, Qu, ze, Je, Xe, lo],
      initialize(t) {
        (this.map = t),
          (this.Draw = new L.PM.Draw(t)),
          (this.Toolbar = new L.PM.Toolbar(t)),
          (this.Keyboard = ec()),
          (this.Dialog = { ...Xe, ...Je, ...lo }),
          (this.globalOptions = {
            defaultColor: '#3388ff',
            activeColor: '#3388ff',
            snappable: !0,
            layerGroup: void 0,
            snappingOrder: [
              'Marker',
              'CircleMarker',
              'Circle',
              'Line',
              'ArrowLine',
              'Polygon',
              'Rectangle',
            ],
            panes: {
              vertexPane: 'markerPane',
              layerPane: 'overlayPane',
              markerPane: 'markerPane',
            },
            draggable: !0,
          }),
          this.Keyboard._initKeyListener(t),
          (this.Dialog.colorChangeDialog = this.colorChangeDialogInit({
            close: !1,
          }).addTo(this.map)),
          this.Dialog.colorChangeInit(this.map, {}),
          (this.Dialog.drawArrowLineDialog = this.drawArrowLineDialogInit({
            close: !1,
            showArrowToggle: !1,
          }).addTo(this.map)),
          (this.Dialog.editArrowLineDialog =
            this.editArrowLineDialogInit().addTo(this.map)),
          this._addDialogEvents();
      },
      setLang(t = 'en', i, r = 'en') {
        if (((t = t.trim().toLowerCase()), !/^[a-z]{2}$/.test(t))) {
          let l = t
            .replace(/[-_\s]/g, '-')
            .replace(/^(\w{2})$/, '$1-')
            .match(/([a-z]{2})-?([a-z]{2})?/);
          if (l) {
            let u = [`${l[1]}_${l[2]}`, `${l[1]}`];
            for (let c of u)
              if (Ie[c]) {
                t = c;
                break;
              }
          }
        }
        let o = L.PM.activeLang;
        i && (Ie[t] = (0, po.default)(Ie[r], i)),
          (L.PM.activeLang = t),
          this.map.pm.Toolbar.reinit(),
          this._fireLangChange(o, t, r, Ie[t]);
      },
      addControls(t) {
        this.Toolbar.addControls(t);
      },
      removeControls() {
        this.Toolbar.removeControls();
      },
      disableAllModes() {
        this.disableGlobalCutMode(),
          this.disableGlobalEditMode(),
          this.disableGlobalDragMode(),
          this.disableGlobalRotateMode(),
          this.disableGlobalRemovalMode(),
          this.disableGlobalArrowEditMode(),
          this.disableGlobalColorChangeMode();
      },
      toggleControls() {
        this.Toolbar.toggleControls();
      },
      controlsVisible() {
        return this.Toolbar.isVisible;
      },
      enableDraw(t = 'Polygon', i) {
        t === 'Poly' && (t = 'Polygon'), this.Draw.enable(t, i);
      },
      disableDraw(t = 'Polygon') {
        t === 'Poly' && (t = 'Polygon'), this.Draw.disable(t);
      },
      setPathOptions(t, i = {}) {
        let r = i.ignoreShapes || [],
          o = i.merge || !1;
        this.map.pm.Draw.shapes.forEach((a) => {
          r.indexOf(a) === -1 && this.map.pm.Draw[a].setPathOptions(t, o);
        });
      },
      getActiveColor() {
        return this.globalOptions.activeColor;
      },
      getGlobalOptions() {
        return this.globalOptions;
      },
      setGlobalStyle(t) {
        this.setGlobalOptions(t),
          this.setPathOptions(t.pathOptions, {
            ignoreShapes: ['Text'],
            merge: !0,
          });
      },
      setGlobalOptions(t) {
        let i = (0, po.default)(this.globalOptions, t);
        i.editable &&
          ((i.resizeableCircleMarker = i.editable), delete i.editable);
        let r = !1;
        this.map.pm.Draw.CircleMarker.enabled() &&
          !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker !=
            !!i.resizeableCircleMarker &&
          (this.map.pm.Draw.CircleMarker.disable(), (r = !0));
        let o = !1;
        this.map.pm.Draw.Circle.enabled() &&
          !!this.map.pm.Draw.Circle.options.resizableCircle !=
            !!i.resizableCircle &&
          (this.map.pm.Draw.Circle.disable(), (o = !0)),
          this.map.pm.Draw.shapes.forEach((l) => {
            this.map.pm.Draw[l].setOptions(i);
          }),
          r && this.map.pm.Draw.CircleMarker.enable(),
          o && this.map.pm.Draw.Circle.enable(),
          L.PM.Utils.findLayers(this.map).forEach((l) => {
            l.pm.setOptions(i);
          }),
          this.map.fire('pm:globaloptionschanged'),
          (this.globalOptions = i),
          this.applyGlobalOptions();
      },
      applyGlobalOptions() {
        L.PM.Utils.findLayers(this.map).forEach((i) => {
          i.pm.enabled() && i.pm.applyOptions();
        });
      },
      globalDrawModeEnabled() {
        return !!this.Draw.getActiveShape();
      },
      globalCutModeEnabled() {
        return !!this.Draw.Cut.enabled();
      },
      enableGlobalCutMode(t) {
        return this.Draw.Cut.enable(t);
      },
      toggleGlobalCutMode(t) {
        return this.Draw.Cut.toggle(t);
      },
      disableGlobalCutMode() {
        return this.Draw.Cut.disable();
      },
      getGeomanLayers(t = !1) {
        let i = L.PM.Utils.findLayers(this.map);
        if (!t) return i;
        let r = L.featureGroup();
        return (
          (r._pmTempLayer = !0),
          i.forEach((o) => {
            r.addLayer(o);
          }),
          r
        );
      },
      getActiveGeomanLayers(t) {
        return this.getGeomanLayers().filter((i) =>
          t ? i.getShape() === t && i.pm._active : i.pm._active
        );
      },
      getGeomanDrawLayers(t = !1) {
        let i = L.PM.Utils.findLayers(this.map).filter(
          (o) => o._drawnByGeoman === !0
        );
        if (!t) return i;
        let r = L.featureGroup();
        return (
          (r._pmTempLayer = !0),
          i.forEach((o) => {
            r.addLayer(o);
          }),
          r
        );
      },
      _addDialogEvents() {
        this.map.on('pm:drawend', () => {
          this.Dialog.closeColorChangeDialog(),
            this.Dialog.closeDrawArrowLineDialog(),
            this.Dialog.closeEditArrowLineDialog();
        }),
          this.map.on('dialog:moveend', this.updateColorisPosition),
          this.map.on('dialog:closed', () => {
            this.getActiveGeomanLayers().forEach((i) => {
              i.pm._markerGroup.eachLayer((r) => {
                let o = r.getIcon();
                (o.options.className = 'marker-icon'), r.setIcon(o);
              });
            });
          });
      },
      _getContainingLayer() {
        return this.globalOptions.layerGroup &&
          this.globalOptions.layerGroup instanceof L.LayerGroup
          ? this.globalOptions.layerGroup
          : this.map;
      },
      _isCRSSimple() {
        return this.map.options.crs === L.CRS.Simple;
      },
      _touchEventCounter: 0,
      _addTouchEvents(t) {
        this._touchEventCounter === 0 &&
          (L.DomEvent.on(t, 'touchmove', this._canvasTouchMove, this),
          L.DomEvent.on(
            t,
            'touchstart touchend touchcancel',
            this._canvasTouchClick,
            this
          )),
          (this._touchEventCounter += 1);
      },
      _removeTouchEvents(t) {
        this._touchEventCounter === 1 &&
          (L.DomEvent.off(t, 'touchmove', this._canvasTouchMove, this),
          L.DomEvent.off(
            t,
            'touchstart touchend touchcancel',
            this._canvasTouchClick,
            this
          )),
          (this._touchEventCounter =
            this._touchEventCounter <= 1 ? 0 : this._touchEventCounter - 1);
      },
      _canvasTouchMove(t) {
        Ne(this.map)._onMouseMove(this._createMouseEvent('mousemove', t));
      },
      _canvasTouchClick(t) {
        let i = '';
        t.type === 'touchstart' || t.type === 'pointerdown'
          ? (i = 'mousedown')
          : (t.type === 'touchend' ||
              t.type === 'pointerup' ||
              t.type === 'touchcancel' ||
              t.type === 'pointercancel') &&
            (i = 'mouseup'),
          i && Ne(this.map)._onClick(this._createMouseEvent(i, t));
      },
      _createMouseEvent(t, i) {
        let r,
          o = i.touches[0] || i.changedTouches[0];
        try {
          r = new MouseEvent(t, {
            bubbles: i.bubbles,
            cancelable: i.cancelable,
            view: i.view,
            detail: o.detail,
            screenX: o.screenX,
            screenY: o.screenY,
            clientX: o.clientX,
            clientY: o.clientY,
            ctrlKey: i.ctrlKey,
            altKey: i.altKey,
            shiftKey: i.shiftKey,
            metaKey: i.metaKey,
            button: i.button,
            relatedTarget: i.relatedTarget,
          });
        } catch {
          (r = document.createEvent('MouseEvents')),
            r.initMouseEvent(
              t,
              i.bubbles,
              i.cancelable,
              i.view,
              o.detail,
              o.screenX,
              o.screenY,
              o.clientX,
              o.clientY,
              i.ctrlKey,
              i.altKey,
              i.shiftKey,
              i.metaKey,
              i.button,
              i.relatedTarget
            );
        }
        return r;
      },
    }),
    Tc = _b;
  var Dc = le(Ac());
  var vb = L.Control.extend({
      includes: [ze, Je],
      options: { position: 'topleft', disableByOtherButtons: !0 },
      initialize(t) {
        this._button = L.Util.extend({}, this.options, t);
      },
      onAdd(t) {
        return (
          (this._map = t),
          this._map.pm.Toolbar.options.oneBlock
            ? (this._container = this._map.pm.Toolbar._createContainer(
                this.options.position
              ))
            : this._button.tool === 'edit'
              ? (this._container = this._map.pm.Toolbar.editContainer)
              : this._button.tool === 'options'
                ? (this._container = this._map.pm.Toolbar.optionsContainer)
                : this._button.tool === 'custom'
                  ? (this._container = this._map.pm.Toolbar.customContainer)
                  : (this._container = this._map.pm.Toolbar.drawContainer),
          this._renderButton(),
          this._container
        );
      },
      _renderButton() {
        let t = this.buttonsDomNode;
        (this.buttonsDomNode = this._makeButton(this._button)),
          t
            ? t.replaceWith(this.buttonsDomNode)
            : this._container.appendChild(this.buttonsDomNode);
      },
      onRemove() {
        return this.buttonsDomNode.remove(), this._container;
      },
      getText() {
        return this._button.text;
      },
      getIconUrl() {
        return this._button.iconUrl;
      },
      destroy() {
        (this._button = {}), this._update();
      },
      toggle(t) {
        return (
          typeof t == 'boolean'
            ? (this._button.toggleStatus = t)
            : (this._button.toggleStatus = !this._button.toggleStatus),
          this._applyStyleClasses(),
          this._button.toggleStatus
        );
      },
      toggled() {
        return this._button.toggleStatus;
      },
      onCreate() {
        this.toggle(!1);
      },
      disable() {
        this.toggle(!1), (this._button.disabled = !0), this._updateDisabled();
      },
      enable() {
        (this._button.disabled = !1), this._updateDisabled();
      },
      _triggerClick(t) {
        t && t.preventDefault(),
          !this._button.disabled &&
            (this._button.onClick(t, { button: this, event: t }),
            this._clicked(t),
            this._button.afterClick(t, { button: this, event: t }));
      },
      _makeButton(t) {
        let i = this.options.position.indexOf('right') > -1 ? 'pos-right' : '',
          r = L.DomUtil.create(
            'div',
            `button-container  ${i}`,
            this._container
          );
        t.title && r.setAttribute('title', t.title);
        let o = L.DomUtil.create('a', 'leaflet-buttons-control-button', r);
        o.setAttribute('role', 'button'),
          o.setAttribute('tabindex', '0'),
          (o.href = '#');
        let a = L.DomUtil.create('div', `leaflet-pm-actions-container ${i}`, r),
          l = t.actions,
          u = {
            cancel: {
              text: at('actions.cancel'),
              title: at('actions.cancel'),
              onClick() {
                this._triggerClick();
              },
            },
            finishMode: {
              text: at('actions.finish'),
              title: at('actions.finish'),
              onClick() {
                this._triggerClick();
              },
            },
            removeLastVertex: {
              text: at('actions.removeLastVertex'),
              title: at('actions.removeLastVertex'),
              onClick() {
                this._map.pm.Draw[t.jsClass]._removeLastVertex();
              },
            },
            finish: {
              text: at('actions.finish'),
              title: at('actions.finish'),
              onClick(d) {
                this._map.pm.Draw[t.jsClass]._finishShape(d);
              },
            },
            changeColor: {
              text: `
          <span class="color-control-background" style="border-radius: 3px; background-color: ${this._map.pm.getGlobalOptions().activeColor}">
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>`,
              onClick() {
                this._map.pm.Dialog.toggleColorChangeDialog(),
                  this._map.pm.Dialog.colorChangeDialog.showClose();
              },
              title: at('actions.changeColor'),
              events: [
                {
                  eventName: 'pm:colorchanged',
                  callback: (d, p) => {
                    let y = (0, Dc.default)(p.children);
                    y.style.backgroundColor = d.activeColor;
                  },
                },
              ],
            },
          };
        l.forEach((d) => {
          let p = typeof d == 'string' ? d : d.name,
            y;
          if (u[p]) y = u[p];
          else if (d.text) y = d;
          else return;
          let b = L.DomUtil.create(
            'a',
            `leaflet-pm-action ${i} action-${p}`,
            a
          );
          if (
            (b.setAttribute('role', 'button'),
            b.setAttribute('tabindex', '0'),
            y.title && b.setAttribute('title', y.title),
            (b.href = '#'),
            y.title && (b.title = y.title),
            (b.innerHTML = y.text),
            L.DomEvent.disableClickPropagation(b),
            L.DomEvent.on(b, 'click', L.DomEvent.stop),
            y.events &&
              y.events?.forEach((D) => {
                this._map.on(
                  D.eventName,
                  (O) => {
                    D.callback(O, b);
                  },
                  y
                );
              }),
            !t.disabled && y.onClick)
          ) {
            let D = (O) => {
              O.preventDefault();
              let q = '',
                { buttons: $ } = this._map.pm.Toolbar;
              for (let w in $)
                if ($[w]._button === t) {
                  q = w;
                  break;
                }
              this._fireActionClick(y, q, t);
            };
            L.DomEvent.addListener(b, 'click', D, this),
              L.DomEvent.addListener(b, 'click', y.onClick, this);
          }
        }),
          t.toggleStatus && L.DomUtil.addClass(r, 'active');
        let c = L.DomUtil.create('div', 'control-icon', o);
        return (
          t.iconUrl && c.setAttribute('src', t.iconUrl),
          t.className && L.DomUtil.addClass(c, t.className),
          L.DomEvent.disableClickPropagation(o),
          L.DomEvent.on(o, 'click', L.DomEvent.stop),
          t.disabled ||
            (L.DomEvent.addListener(o, 'click', this._onBtnClick, this),
            L.DomEvent.addListener(o, 'click', this._triggerClick, this)),
          t.disabled &&
            (L.DomUtil.addClass(o, 'pm-disabled'),
            o.setAttribute('aria-disabled', 'true')),
          r
        );
      },
      _applyStyleClasses() {
        this._container &&
          (!this._button.toggleStatus || this._button.cssToggle === !1
            ? (L.DomUtil.removeClass(this.buttonsDomNode, 'active'),
              L.DomUtil.removeClass(this._container, 'activeChild'))
            : (L.DomUtil.addClass(this.buttonsDomNode, 'active'),
              L.DomUtil.addClass(this._container, 'activeChild')));
      },
      _onBtnClick() {
        if (this._button.disabled) return;
        this._button.disableOtherButtons &&
          this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
        let t = '',
          { buttons: i } = this._map.pm.Toolbar;
        for (let r in i)
          if (i[r]._button === this._button) {
            t = r;
            break;
          }
        this._fireButtonClick(t, this._button);
      },
      _clicked() {
        this._button.doToggle && this.toggle();
      },
      _updateDisabled() {
        if (!this._container) return;
        let t = 'pm-disabled',
          i = this.buttonsDomNode.children[0];
        this._button.disabled
          ? (L.DomUtil.addClass(i, t), i.setAttribute('aria-disabled', 'true'))
          : (L.DomUtil.removeClass(i, t),
            i.setAttribute('aria-disabled', 'false'));
      },
    }),
    Oc = vb;
  L.Control.PMButton = Oc;
  var Lb = L.Class.extend({
      options: {
        drawMarker: !0,
        drawRectangle: !0,
        drawPolyline: !0,
        drawArrowLine: !0,
        drawPolygon: !0,
        drawCircle: !0,
        drawCircleMarker: !0,
        drawText: !0,
        editMode: !0,
        arrowEditMode: !0,
        dragMode: !0,
        cutPolygon: !0,
        removalMode: !0,
        rotateMode: !0,
        colorChangeMode: !0,
        snappingOption: !0,
        drawControls: !0,
        editControls: !0,
        optionsControls: !0,
        customControls: !0,
        oneBlock: !1,
        position: 'topleft',
        positions: { draw: '', edit: '', options: '', custom: '' },
      },
      customButtons: [],
      initialize(t) {
        (this.customButtons = []),
          (this.options.positions = {
            draw: '',
            edit: '',
            options: '',
            custom: '',
          }),
          this.init(t);
      },
      reinit() {
        let t = this.isVisible;
        this.removeControls(), this._defineButtons(), t && this.addControls();
      },
      init(t) {
        (this.map = t),
          (this.buttons = {}),
          (this.isVisible = !1),
          (this.drawContainer = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-pm-draw leaflet-bar leaflet-control'
          )),
          (this.editContainer = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-pm-edit leaflet-bar leaflet-control'
          )),
          (this.optionsContainer = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-pm-options leaflet-bar leaflet-control'
          )),
          (this.customContainer = L.DomUtil.create(
            'div',
            'leaflet-pm-toolbar leaflet-pm-custom leaflet-bar leaflet-control'
          )),
          this._defineButtons();
      },
      _createContainer(t) {
        let i = `${t}Container`;
        return (
          this[i] ||
            (this[i] = L.DomUtil.create(
              'div',
              `leaflet-pm-toolbar leaflet-pm-${t} leaflet-bar leaflet-control`
            )),
          this[i]
        );
      },
      getButtons() {
        return this.buttons;
      },
      addControls(t = this.options) {
        typeof t.editPolygon < 'u' && (t.editMode = t.editPolygon),
          typeof t.deleteLayer < 'u' && (t.removalMode = t.deleteLayer),
          L.Util.setOptions(this, t),
          this.applyIconStyle(),
          (this.isVisible = !0),
          this._showHideButtons();
      },
      applyIconStyle() {
        let t = this.getButtons(),
          i = {
            geomanIcons: {
              drawMarker: 'control-icon leaflet-pm-icon-marker',
              drawPolyline: 'control-icon leaflet-pm-icon-polyline',
              drawArrowLine: 'control-icon leaflet-pm-icon-arrowline',
              drawRectangle: 'control-icon leaflet-pm-icon-rectangle',
              drawPolygon: 'control-icon leaflet-pm-icon-polygon',
              drawCircle: 'control-icon leaflet-pm-icon-circle',
              drawCircleMarker: 'control-icon leaflet-pm-icon-circle-marker',
              editMode: 'control-icon leaflet-pm-icon-edit',
              arrowEditMode: 'control-icon leaflet-pm-icon-arrowline-edit',
              colorChangeMode: 'control-icon leaflet-pm-icon-change-color',
              dragMode: 'control-icon leaflet-pm-icon-drag',
              cutPolygon: 'control-icon leaflet-pm-icon-cut',
              removalMode: 'control-icon leaflet-pm-icon-delete',
              drawText: 'control-icon leaflet-pm-icon-text',
            },
          };
        for (let r in t) {
          let o = t[r];
          L.Util.setOptions(o, { className: i.geomanIcons[r] });
        }
      },
      removeControls() {
        let t = this.getButtons();
        for (let i in t) t[i].remove();
        this.isVisible = !1;
      },
      toggleControls(t = this.options) {
        this.isVisible ? this.removeControls() : this.addControls(t);
      },
      _addButton(t, i) {
        return (
          (this.buttons[t] = i),
          (this.options[t] = !!this.options[t] || !1),
          this.buttons[t]
        );
      },
      triggerClickOnToggledButtons(t) {
        for (let i in this.buttons) {
          let r = this.buttons[i];
          r._button.disableByOtherButtons &&
            r !== t &&
            r.toggled() &&
            r._triggerClick();
        }
      },
      toggleButton(t, i, r = !0) {
        return (
          t === 'editPolygon' && (t = 'editMode'),
          t === 'deleteLayer' && (t = 'removalMode'),
          r && this.triggerClickOnToggledButtons(this.buttons[t]),
          this.buttons[t] ? this.buttons[t].toggle(i) : !1
        );
      },
      _defineButtons() {
        let t = {
            className: 'control-icon leaflet-pm-icon-marker',
            title: at('buttonTitles.drawMarkerButton'),
            jsClass: 'Marker',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel'],
          },
          i = {
            title: at('buttonTitles.drawPolyButton'),
            className: 'control-icon leaflet-pm-icon-polygon',
            jsClass: 'Polygon',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          r = {
            className: 'control-icon leaflet-pm-icon-polyline',
            title: at('buttonTitles.drawLineButton'),
            jsClass: 'Line',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          o = {
            className: 'control-icon leaflet-pm-icon-arrowline',
            title: at('buttonTitles.drawArrowLineButton'),
            jsClass: 'ArrowLine',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          a = {
            title: at('buttonTitles.drawCircleButton'),
            className: 'control-icon leaflet-pm-icon-circle',
            jsClass: 'Circle',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          l = {
            title: at('buttonTitles.drawCircleMarkerButton'),
            className: 'control-icon leaflet-pm-icon-circle-marker',
            jsClass: 'CircleMarker',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          u = {
            title: at('buttonTitles.drawRectButton'),
            className: 'control-icon leaflet-pm-icon-rectangle',
            jsClass: 'Rectangle',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          c = {
            title: at('buttonTitles.editButton'),
            className: 'control-icon leaflet-pm-icon-edit',
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalEditMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          d = {
            className: 'control-icon leaflet-pm-icon-arrowline-edit',
            title: at('buttonTitles.editArrowLineButton'),
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalArrowEditMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          p = {
            className: 'control-icon leaflet-pm-icon-change-color',
            title: at('buttonTitles.changeColorButton'),
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalColorChangeMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          y = {
            title: at('buttonTitles.dragButton'),
            className: 'control-icon leaflet-pm-icon-drag',
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalDragMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          b = {
            title: at('buttonTitles.cutButton'),
            className: 'control-icon leaflet-pm-icon-cut',
            jsClass: 'Cut',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle({
                snappable: !0,
                cursorMarker: !0,
                allowSelfIntersection: !1,
              });
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finish', 'removeLastVertex', 'cancel'],
          },
          D = {
            title: at('buttonTitles.deleteButton'),
            className: 'control-icon leaflet-pm-icon-delete',
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalRemovalMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          O = {
            title: at('buttonTitles.rotateButton'),
            className: 'control-icon leaflet-pm-icon-rotate',
            onClick: () => {},
            afterClick: () => {
              this.map.pm.toggleGlobalRotateMode();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            tool: 'edit',
            actions: ['finishMode'],
          },
          q = {
            className: 'control-icon leaflet-pm-icon-text',
            title: at('buttonTitles.drawTextButton'),
            jsClass: 'Text',
            onClick: () => {},
            afterClick: ($, w) => {
              this.map.pm.Draw[w.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel'],
          };
        this._addButton('drawMarker', new L.Control.PMButton(t)),
          this._addButton('drawPolyline', new L.Control.PMButton(r)),
          this._addButton('drawArrowLine', new L.Control.PMButton(o)),
          this._addButton('drawRectangle', new L.Control.PMButton(u)),
          this._addButton('drawPolygon', new L.Control.PMButton(i)),
          this._addButton('drawCircle', new L.Control.PMButton(a)),
          this._addButton('drawCircleMarker', new L.Control.PMButton(l)),
          this._addButton('drawText', new L.Control.PMButton(q)),
          this._addButton('editMode', new L.Control.PMButton(c)),
          this._addButton('arrowEditMode', new L.Control.PMButton(d)),
          this._addButton('colorChangeMode', new L.Control.PMButton(p)),
          this._addButton('dragMode', new L.Control.PMButton(y)),
          this._addButton('cutPolygon', new L.Control.PMButton(b)),
          this._addButton('removalMode', new L.Control.PMButton(D)),
          this._addButton('rotateMode', new L.Control.PMButton(O));
      },
      _showHideButtons() {
        if (!this.isVisible) return;
        this.removeControls(), (this.isVisible = !0);
        let t = this.getButtons(),
          i = [];
        this.options.drawControls === !1 &&
          (i = i.concat(Object.keys(t).filter((r) => !t[r]._button.tool))),
          this.options.editControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((r) => t[r]._button.tool === 'edit')
            )),
          this.options.optionsControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((r) => t[r]._button.tool === 'options')
            )),
          this.options.customControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((r) => t[r]._button.tool === 'custom')
            ));
        for (let r in t)
          if (this.options[r] && i.indexOf(r) === -1) {
            let o = t[r]._button.tool;
            o || (o = 'draw'),
              t[r].setPosition(this._getBtnPosition(o)),
              t[r].addTo(this.map);
          }
      },
      _getBtnPosition(t) {
        return this.options.positions && this.options.positions[t]
          ? this.options.positions[t]
          : this.options.position;
      },
      setBlockPosition(t, i) {
        (this.options.positions[t] = i),
          this._showHideButtons(),
          this.changeControlOrder();
      },
      getBlockPositions() {
        return this.options.positions;
      },
      copyDrawControl(t, i) {
        if (i) typeof i != 'object' && (i = { name: i });
        else throw new TypeError('Button has no name');
        let r = this._btnNameMapping(t);
        if (!i.name) throw new TypeError('Button has no name');
        if (this.buttons[i.name])
          throw new TypeError('Button with this name already exists');
        let o = this.map.pm.Draw.createNewDrawInstance(i.name, r);
        i = { ...this.buttons[r]._button, ...i };
        let l = this.createCustomControl(i);
        return { drawInstance: o, control: l };
      },
      createCustomControl(t) {
        if (!t.name) throw new TypeError('Button has no name');
        if (this.buttons[t.name])
          throw new TypeError('Button with this name already exists');
        t.onClick || (t.onClick = () => {}),
          t.afterClick || (t.afterClick = () => {}),
          t.toggle !== !1 && (t.toggle = !0),
          t.block && (t.block = t.block.toLowerCase()),
          (!t.block || t.block === 'draw') && (t.block = ''),
          t.className
            ? t.className.indexOf('control-icon') === -1 &&
              (t.className = `control-icon ${t.className}`)
            : (t.className = 'control-icon');
        let i = {
          tool: t.block,
          className: t.className,
          title: t.title || '',
          jsClass: t.name,
          onClick: t.onClick,
          afterClick: t.afterClick,
          doToggle: t.toggle,
          toggleStatus: !1,
          disableOtherButtons: t.disableOtherButtons ?? !0,
          disableByOtherButtons: t.disableByOtherButtons ?? !0,
          cssToggle: t.toggle,
          position: this.options.position,
          actions: t.actions || [],
          disabled: !!t.disabled,
        };
        this.options[t.name] !== !1 && (this.options[t.name] = !0);
        let r = this._addButton(t.name, new L.Control.PMButton(i));
        return this.changeControlOrder(), r;
      },
      controlExists(t) {
        return !!this.getButton(t);
      },
      getButton(t) {
        return this.getButtons()[t];
      },
      getButtonsInBlock(t) {
        let i = {};
        if (t)
          for (let r in this.getButtons()) {
            let o = this.getButtons()[r];
            (o._button.tool === t || (t === 'draw' && !o._button.tool)) &&
              (i[r] = o);
          }
        return i;
      },
      changeControlOrder(t = []) {
        let i = this._shapeMapping(),
          r = [];
        t.forEach((p) => {
          i[p] ? r.push(i[p]) : r.push(p);
        });
        let o = this.getButtons(),
          a = {};
        r.forEach((p) => {
          o[p] && (a[p] = o[p]);
        }),
          Object.keys(o)
            .filter((p) => !o[p]._button.tool)
            .forEach((p) => {
              r.indexOf(p) === -1 && (a[p] = o[p]);
            }),
          Object.keys(o)
            .filter((p) => o[p]._button.tool === 'edit')
            .forEach((p) => {
              r.indexOf(p) === -1 && (a[p] = o[p]);
            }),
          Object.keys(o)
            .filter((p) => o[p]._button.tool === 'options')
            .forEach((p) => {
              r.indexOf(p) === -1 && (a[p] = o[p]);
            }),
          Object.keys(o)
            .filter((p) => o[p]._button.tool === 'custom')
            .forEach((p) => {
              r.indexOf(p) === -1 && (a[p] = o[p]);
            }),
          Object.keys(o).forEach((p) => {
            r.indexOf(p) === -1 && (a[p] = o[p]);
          }),
          (this.map.pm.Toolbar.buttons = a),
          this._showHideButtons();
      },
      getControlOrder() {
        let t = this.getButtons(),
          i = [];
        for (let r in t) i.push(r);
        return i;
      },
      changeActionsOfControl(t, i) {
        let r = this._btnNameMapping(t);
        if (!r) throw new TypeError('No name passed');
        if (!i) throw new TypeError('No actions passed');
        if (!this.buttons[r])
          throw new TypeError('Button with this name not exists');
        (this.buttons[r]._button.actions = i), this.changeControlOrder();
      },
      setButtonDisabled(t, i) {
        let r = this._btnNameMapping(t);
        i ? this.buttons[r].disable() : this.buttons[r].enable();
      },
      _shapeMapping() {
        return {
          Marker: 'drawMarker',
          Circle: 'drawCircle',
          Polygon: 'drawPolygon',
          Rectangle: 'drawRectangle',
          Polyline: 'drawPolyline',
          ArrowLine: 'drawArrowLine',
          Line: 'drawPolyline',
          CircleMarker: 'drawCircleMarker',
          Edit: 'editMode',
          EditArrowLine: 'arrowEditMode',
          ColorChange: 'colorChangeMode',
          Drag: 'dragMode',
          Cut: 'cutPolygon',
          Removal: 'removalMode',
          Rotate: 'rotateMode',
          Text: 'drawText',
        };
      },
      _btnNameMapping(t) {
        let i = this._shapeMapping();
        return i[t] ? i[t] : t;
      },
    }),
    Rc = Lb;
  var Ic = le(Hr());
  var bb = {
      _initSnappableMarkers() {
        (this.options.snapDistance = this.options.snapDistance || 30),
          (this.options.snapSegment =
            this.options.snapSegment === void 0
              ? !0
              : this.options.snapSegment),
          this._assignEvents(this._markers),
          this._layer.off('pm:dragstart', this._unsnap, this),
          this._layer.on('pm:dragstart', this._unsnap, this);
      },
      _disableSnapping() {
        this._layer.off('pm:dragstart', this._unsnap, this);
      },
      _assignEvents(t) {
        t.forEach((i) => {
          if (Array.isArray(i)) {
            this._assignEvents(i);
            return;
          }
          i.off('drag', this._handleSnapping, this),
            i.on('drag', this._handleSnapping, this),
            i.off('dragend', this._cleanupSnapping, this),
            i.on('dragend', this._cleanupSnapping, this);
        });
      },
      _cleanupSnapping(t) {
        if (t) {
          let i = t.target;
          i._snapped = !1;
        }
        delete this._snapList,
          this.throttledList &&
            (this._map.off('layeradd', this.throttledList, this),
            (this.throttledList = void 0)),
          this._map.off('layerremove', this._handleSnapLayerRemoval, this),
          this.debugIndicatorLines &&
            this.debugIndicatorLines.forEach((i) => {
              i.remove();
            });
      },
      _handleThrottleSnapping() {
        this.throttledList && this._createSnapList();
      },
      _handleSnapping(t) {
        let i = t.target;
        if (
          ((i._snapped = !1),
          this.throttledList ||
            (this.throttledList = L.Util.throttle(
              this._handleThrottleSnapping,
              100,
              this
            )),
          t?.originalEvent?.altKey ||
            this._map?.pm?.Keyboard.isAltKeyPressed() ||
            (this._snapList === void 0 &&
              (this._createSnapList(),
              this._map.off('layeradd', this.throttledList, this),
              this._map.on('layeradd', this.throttledList, this)),
            this._snapList.length <= 0))
        )
          return !1;
        let r = this._calcClosestLayer(i.getLatLng(), this._snapList);
        if (Object.keys(r).length === 0) return !1;
        let o =
            r.layer instanceof L.Marker ||
            r.layer instanceof L.CircleMarker ||
            !this.options.snapSegment,
          a;
        o ? (a = r.latlng) : (a = this._checkPrioritiySnapping(r));
        let l = this.options.snapDistance,
          u = {
            marker: i,
            shape: this._shape,
            snapLatLng: a,
            segment: r.segment,
            layer: this._layer,
            workingLayer: this._layer,
            layerInteractedWith: r.layer,
            distance: r.distance,
          };
        if (
          (this._fireSnapDrag(u.marker, u),
          this._fireSnapDrag(this._layer, u),
          r.distance < l)
        ) {
          (i._orgLatLng = i.getLatLng()),
            i.setLatLng(a),
            (i._snapped = !0),
            (i._snapInfo = u);
          let c = () => {
              (this._snapLatLng = a),
                this._fireSnap(i, u),
                this._fireSnap(this._layer, u);
            },
            d = this._snapLatLng || {},
            p = a || {};
          (d.lat !== p.lat || d.lng !== p.lng) && c();
        } else
          this._snapLatLng &&
            (this._unsnap(u),
            (i._snapped = !1),
            (i._snapInfo = void 0),
            this._fireUnsnap(u.marker, u),
            this._fireUnsnap(this._layer, u));
        return !0;
      },
      _createSnapList() {
        let t = [],
          i = [],
          r = this._map;
        r.off('layerremove', this._handleSnapLayerRemoval, this),
          r.on('layerremove', this._handleSnapLayerRemoval, this),
          r.eachLayer((o) => {
            if (
              (o instanceof L.Polyline ||
                o instanceof L.Marker ||
                o instanceof L.CircleMarker ||
                o instanceof L.ImageOverlay) &&
              o.options.snapIgnore !== !0
            ) {
              if (
                o.options.snapIgnore === void 0 &&
                ((!L.PM.optIn && o.options.pmIgnore === !0) ||
                  (L.PM.optIn && o.options.pmIgnore !== !1))
              )
                return;
              (o instanceof L.Circle || o instanceof L.CircleMarker) &&
              o.pm &&
              o.pm._hiddenPolyCircle
                ? t.push(o.pm._hiddenPolyCircle)
                : o instanceof L.ImageOverlay &&
                  (o = L.rectangle(o.getBounds())),
                t.push(o);
              let a = L.polyline([], { color: 'red', pmIgnore: !0 });
              (a._pmTempLayer = !0),
                i.push(a),
                (o instanceof L.Circle || o instanceof L.CircleMarker) &&
                  i.push(a);
            }
          }),
          (t = t.filter((o) => this._layer !== o)),
          (t = t.filter((o) => o._latlng || (o._latlngs && ir(o._latlngs)))),
          (t = t.filter((o) => !o._pmTempLayer)),
          this._otherSnapLayers
            ? (this._otherSnapLayers.forEach(() => {
                let o = L.polyline([], { color: 'red', pmIgnore: !0 });
                (o._pmTempLayer = !0), i.push(o);
              }),
              (this._snapList = t.concat(this._otherSnapLayers)))
            : (this._snapList = t),
          (this.debugIndicatorLines = i);
      },
      _handleSnapLayerRemoval({ layer: t }) {
        if (!t._leaflet_id) return;
        let i = this._snapList.findIndex(
          (r) => r._leaflet_id === t._leaflet_id
        );
        i > -1 && this._snapList.splice(i, 1);
      },
      _calcClosestLayer(t, i) {
        return this._calcClosestLayers(t, i, 1)[0];
      },
      _calcClosestLayers(t, i, r = 1) {
        let o = [],
          a = {};
        i.forEach((u, c) => {
          if (u._parentCopy && u._parentCopy === this._layer) return;
          let d = this._calcLayerDistances(t, u);
          if (
            ((d.distance = Math.floor(d.distance)), this.debugIndicatorLines)
          ) {
            if (!this.debugIndicatorLines[c]) {
              let p = L.polyline([], { color: 'red', pmIgnore: !0 });
              (p._pmTempLayer = !0), (this.debugIndicatorLines[c] = p);
            }
            this.debugIndicatorLines[c].setLatLngs([t, d.latlng]);
          }
          r === 1 && (a.distance === void 0 || d.distance - 5 <= a.distance)
            ? (d.distance + 5 < a.distance && (o = []),
              (a = d),
              (a.layer = u),
              o.push(a))
            : r !== 1 && ((a = {}), (a = d), (a.layer = u), o.push(a));
        }),
          r !== 1 && (o = o.sort((u, c) => u.distance - c.distance)),
          r === -1 && (r = o.length);
        let l = this._getClosestLayerByPriority(o, r);
        return L.Util.isArray(l) ? l : [l];
      },
      _calcLayerDistances(t, i) {
        let r = this._map,
          o = i instanceof L.Marker || i instanceof L.CircleMarker,
          a = i instanceof L.Polygon,
          l = t;
        if (o) {
          let u = i.getLatLng();
          return { latlng: { ...u }, distance: this._getDistance(r, u, l) };
        }
        return this._calcLatLngDistances(l, i.getLatLngs(), r, a);
      },
      _calcLatLngDistances(t, i, r, o = !1) {
        let a,
          l,
          u,
          c = (d) => {
            d.forEach((p, y) => {
              if (Array.isArray(p)) {
                c(p);
                return;
              }
              if (this.options.snapSegment) {
                let b = p,
                  D;
                o
                  ? (D = y + 1 === d.length ? 0 : y + 1)
                  : (D = y + 1 === d.length ? void 0 : y + 1);
                let O = d[D];
                if (O) {
                  let q = this._getDistanceToSegment(r, t, b, O);
                  (l === void 0 || q < l) && ((l = q), (u = [b, O]));
                }
              } else {
                let b = this._getDistance(r, t, p);
                (l === void 0 || b < l) && ((l = b), (a = p));
              }
            });
          };
        return (
          c(i),
          this.options.snapSegment
            ? {
                latlng: { ...this._getClosestPointOnSegment(r, t, u[0], u[1]) },
                segment: u,
                distance: l,
              }
            : { latlng: a, distance: l }
        );
      },
      _getClosestLayerByPriority(t, i = 1) {
        t = t.sort((u, c) => u._leaflet_id - c._leaflet_id);
        let r = [
            'Marker',
            'CircleMarker',
            'Circle',
            'Line',
            'Polygon',
            'Rectangle',
          ],
          o = this._map.pm.globalOptions.snappingOrder || [],
          a = 0,
          l = {};
        return (
          o.concat(r).forEach((u) => {
            l[u] || ((a += 1), (l[u] = a));
          }),
          t.sort(Sc('instanceofShape', l)),
          i === 1 ? t[0] || {} : t.slice(0, i)
        );
      },
      _checkPrioritiySnapping(t) {
        let i = this._map,
          r = t.segment[0],
          o = t.segment[1],
          a = t.latlng,
          l = this._getDistance(i, r, a),
          u = this._getDistance(i, o, a),
          c = l < u ? r : o,
          d = l < u ? l : u;
        if (this.options.snapMiddle) {
          let b = L.PM.Utils.calcMiddleLatLng(i, r, o),
            D = this._getDistance(i, b, a);
          D < l && D < u && ((c = b), (d = D));
        }
        let p = this.options.snapDistance,
          y;
        return d < p ? (y = c) : (y = a), { ...y };
      },
      _unsnap() {
        delete this._snapLatLng;
      },
      _getClosestPointOnSegment(t, i, r, o) {
        let a = t.getMaxZoom();
        a === 1 / 0 && (a = t.getZoom());
        let l = t.project(i, a),
          u = t.project(r, a),
          c = t.project(o, a),
          d = L.LineUtil.closestPointOnSegment(l, u, c);
        return t.unproject(d, a);
      },
      _getDistanceToSegment(t, i, r, o) {
        let a = t.latLngToLayerPoint(i),
          l = t.latLngToLayerPoint(r),
          u = t.latLngToLayerPoint(o);
        return L.LineUtil.pointToSegmentDistance(a, l, u);
      },
      _getDistance(t, i, r) {
        return t.latLngToLayerPoint(i).distanceTo(t.latLngToLayerPoint(r));
      },
    },
    Kr = bb;
  function wb(t, i, r, o) {
    return r.unproject(i.transform(r.project(t, o)), o);
  }
  function mo(t, i, r) {
    let o = r.getMaxZoom();
    if ((o === 1 / 0 && (o = r.getZoom()), L.Util.isArray(t))) {
      let a = [];
      return (
        t.forEach((l) => {
          a.push(mo(l, i, r));
        }),
        a
      );
    }
    return t instanceof L.LatLng ? wb(t, i, r, o) : null;
  }
  function Ge(t, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let r = t.getMaxZoom();
    return r === 1 / 0 && (r = t.getZoom()), t.project(i, r);
  }
  function or(t, i) {
    let r = t.getMaxZoom();
    return r === 1 / 0 && (r = t.getZoom()), t.unproject(i, r);
  }
  var xb = {
      calcMiddleLatLng(t, i, r) {
        let o = t.project(i),
          a = t.project(r);
        return t.unproject(o._add(a)._divideBy(2));
      },
      findLayers(t) {
        let i = [];
        return (
          t.eachLayer((r) => {
            (r instanceof L.Polyline ||
              r instanceof L.Marker ||
              r instanceof L.Circle ||
              r instanceof L.CircleMarker ||
              r instanceof L.ImageOverlay) &&
              i.push(r);
          }),
          (i = i.filter((r) => !!r.pm)),
          (i = i.filter((r) => !r._pmTempLayer)),
          (i = i.filter(
            (r) =>
              (!L.PM.optIn && !r.options.pmIgnore) ||
              (L.PM.optIn && r.options.pmIgnore === !1)
          )),
          i
        );
      },
      findLines(t) {
        let i = [];
        return (
          t.eachLayer((r) => {
            r instanceof L.Polyline &&
              r.pm.getShape().toLowerCase().includes('line') &&
              i.push(r);
          }),
          (i = i.filter((r) => !!r.pm)),
          (i = i.filter((r) => !r._pmTempLayer)),
          (i = i.filter(
            (r) =>
              (!L.PM.optIn && !r.options.pmIgnore) ||
              (L.PM.optIn && r.options.pmIgnore === !1)
          )),
          i
        );
      },
      reverseNumber(t, i, r) {
        return i + t - r;
      },
      findMarkers(t) {
        let i = [];
        return (
          t.eachLayer((r) => {
            r instanceof L.Marker && i.push(r);
          }),
          (i = i.filter((r) => !!r.pm)),
          (i = i.filter((r) => !r._pmTempLayer)),
          (i = i.filter(
            (r) =>
              (!L.PM.optIn && !r.options.pmIgnore) ||
              (L.PM.optIn && r.options.pmIgnore === !1)
          )),
          i
        );
      },
      circleToPolygon(t, i = 60, r = !0) {
        let o = t.getLatLng(),
          a = t.getRadius(),
          l = co(o, a, i, 0, r),
          u = [];
        for (let c = 0; c < l.length; c += 1) {
          let d = [l[c].lat, l[c].lng];
          u.push(d);
        }
        return L.polygon(u, t.options);
      },
      disablePopup(t) {
        t.getPopup() && ((t._tempPopupCopy = t.getPopup()), t.unbindPopup());
      },
      enablePopup(t) {
        t._tempPopupCopy &&
          (t.bindPopup(t._tempPopupCopy), delete t._tempPopupCopy);
      },
      _fireEvent(t, i, r, o = !1) {
        t.fire(i, r, o);
        let { groups: a } = this.getAllParentGroups(t);
        a.forEach((l) => {
          l.fire(i, r, o);
        });
      },
      getAllParentGroups(t) {
        let i = [],
          r = [],
          o = (a) => {
            for (let l in a._eventParents)
              if (i.indexOf(l) === -1) {
                i.push(l);
                let u = a._eventParents[l];
                r.push(u), o(u);
              }
          };
        return !t._pmLastGroupFetch ||
          !t._pmLastGroupFetch.time ||
          new Date().getTime() - t._pmLastGroupFetch.time > 1e3
          ? (o(t),
            (t._pmLastGroupFetch = {
              time: new Date().getTime(),
              groups: r,
              groupIds: i,
            }),
            { groupIds: i, groups: r })
          : {
              groups: t._pmLastGroupFetch.groups,
              groupIds: t._pmLastGroupFetch.groupIds,
            };
      },
      createGeodesicPolygon: co,
      getTranslation: at,
      findDeepCoordIndex(t, i, r = !0) {
        let o,
          a = (u) => (c, d) => {
            let p = u.concat(d);
            if (r) {
              if (c.lat && c.lat === i.lat && c.lng === i.lng)
                return (o = p), !0;
            } else if (c.lat && L.latLng(c).equals(i)) return (o = p), !0;
            return Array.isArray(c) && c.some(a(p));
          };
        t.some(a([]));
        let l = {};
        return (
          o &&
            (l = {
              indexPath: o,
              index: o[o.length - 1],
              parentPath: o.slice(0, o.length - 1),
            }),
          l
        );
      },
      rgbToHex(t) {
        let i = t.match(/\d+/g);
        if (!i || i.length !== 3) return this.options.defaultColor;
        let r = parseInt(i[0], 10).toString(16).padStart(2, '0'),
          o = parseInt(i[1], 10).toString(16).padStart(2, '0'),
          a = parseInt(i[2], 10).toString(16).padStart(2, '0');
        return `#${r}${o}${a}`;
      },
      findDeepMarkerIndex(t, i) {
        let r,
          o = (l) => (u, c) => {
            let d = l.concat(c);
            return u._leaflet_id === i._leaflet_id
              ? ((r = d), !0)
              : Array.isArray(u) && u.some(o(d));
          };
        t.some(o([]));
        let a = {};
        return (
          r &&
            (a = {
              indexPath: r,
              index: r[r.length - 1],
              parentPath: r.slice(0, r.length - 1),
            }),
          a
        );
      },
      _getIndexFromSegment(t, i) {
        if (i && i.length === 2) {
          let r = this.findDeepCoordIndex(t, i[0]),
            o = this.findDeepCoordIndex(t, i[1]),
            a = Math.max(r.index, o.index);
          return (
            (r.index === 0 || o.index === 0) && a !== 1 && (a += 1),
            {
              indexA: r,
              indexB: o,
              newIndex: a,
              indexPath: r.indexPath,
              parentPath: r.parentPath,
            }
          );
        }
        return null;
      },
      _getRotatedRectangle(t, i, r, o) {
        let a = Ge(o, t),
          l = Ge(o, i),
          u = (r * Math.PI) / 180,
          c = Math.cos(u),
          d = Math.sin(u),
          p = (l.x - a.x) * c + (l.y - a.y) * d,
          y = (l.y - a.y) * c - (l.x - a.x) * d,
          b = p * c + a.x,
          D = p * d + a.y,
          O = -y * d + a.x,
          q = y * c + a.y,
          $ = or(o, a),
          w = or(o, { x: b, y: D }),
          B = or(o, l),
          M = or(o, { x: O, y: q });
        return [$, w, B, M];
      },
      pxRadiusToMeterRadius(t, i, r) {
        let o = i.project(r),
          a = L.point(o.x + t, o.y);
        return i.distance(i.unproject(a), r);
      },
    },
    ki = xb;
  var kb = L.Class.extend({
      includes: [Kr, ze, Xe, ki],
      options: {
        snappable: !0,
        snapDistance: 20,
        snapMiddle: !1,
        allowSelfIntersection: !0,
        tooltips: !0,
        templineStyle: { color: '#3388ff' },
        hintlineStyle: { color: '#3388ff', dashArray: '5,5' },
        pathOptions: null,
        cursorMarker: !0,
        finishOn: null,
        markerStyle: { draggable: !0, icon: L.icon() },
        editArrows: !1,
        hideMiddleMarkers: !1,
        minRadiusCircle: null,
        maxRadiusCircle: null,
        minRadiusCircleMarker: null,
        maxRadiusCircleMarker: null,
        resizeableCircleMarker: !1,
        resizableCircle: !0,
        markerEditable: !0,
        continueDrawing: !1,
        snapSegment: !0,
        requireSnapToFinish: !1,
        rectangleAngle: 0,
      },
      setOptions(t) {
        L.Util.setOptions(this, t), this.setStyle(this.options);
      },
      setStyle() {},
      getOptions() {
        return this.options;
      },
      initialize(t) {
        let i = new L.Icon.Default();
        (i.options.tooltipAnchor = [0, 0]),
          (this.options.markerStyle.icon = i),
          (this._map = t),
          (this.shapes = [
            'Marker',
            'CircleMarker',
            'Line',
            'ArrowLine',
            'Polygon',
            'Rectangle',
            'Circle',
            'Cut',
            'Text',
          ]),
          this.shapes.forEach((r) => {
            this[r] = new L.PM.Draw[r](this._map);
          }),
          this.Marker.setOptions({ continueDrawing: !0 }),
          this.CircleMarker.setOptions({ continueDrawing: !0 });
      },
      setPathOptions(t, i = !1) {
        i
          ? (this.options.pathOptions = (0, Ic.default)(
              this.options.pathOptions,
              t
            ))
          : (this.options.pathOptions = t);
      },
      getShapes() {
        return this.shapes;
      },
      getShape() {
        return this._shape;
      },
      enable(t, i) {
        if (!t)
          throw new Error(
            `Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(',')}`
          );
        this.disable(), this[t].enable(i);
      },
      disable() {
        this.shapes.forEach((t) => {
          this[t].disable();
        });
      },
      addControls() {
        this.shapes.forEach((t) => {
          this[t].addButton();
        });
      },
      getActiveShape() {
        let t;
        return (
          this.shapes.forEach((i) => {
            this[i]._enabled && (t = i);
          }),
          t
        );
      },
      _setGlobalDrawMode() {
        this._shape === 'Cut'
          ? this._fireGlobalCutModeToggled()
          : this._fireGlobalDrawModeToggled();
        let t = [];
        this._map.eachLayer((i) => {
          (i instanceof L.Polyline ||
            i instanceof L.Marker ||
            i instanceof L.Circle ||
            i instanceof L.CircleMarker ||
            i instanceof L.ImageOverlay) &&
            (i._pmTempLayer || t.push(i));
        }),
          this._enabled
            ? t.forEach((i) => {
                L.PM.Utils.disablePopup(i);
              })
            : t.forEach((i) => {
                L.PM.Utils.enablePopup(i);
              });
      },
      createNewDrawInstance(t, i) {
        let r = this._getShapeFromBtnName(i);
        if (this[t]) throw new TypeError('Draw Type already exists');
        if (!L.PM.Draw[r])
          throw new TypeError(`There is no class L.PM.Draw.${r}`);
        return (
          (this[t] = new L.PM.Draw[r](this._map)),
          (this[t].toolbarButtonName = t),
          (this[t]._shape = t),
          this.shapes.push(t),
          this[i] && this[t].setOptions(this[i].options),
          this[t].setOptions(this[t].options),
          this[t]
        );
      },
      _getShapeFromBtnName(t) {
        let i = {
          drawMarker: 'Marker',
          drawCircle: 'Circle',
          drawPolygon: 'Polygon',
          drawArrowLine: 'ArrowLine',
          drawPolyline: 'Line',
          drawRectangle: 'Rectangle',
          drawCircleMarker: 'CircleMarker',
          editMode: 'Edit',
          editArrowLine: 'Edit Arrows',
          dragMode: 'Drag',
          cutPolygon: 'Cut',
          removalMode: 'Removal',
          rotateMode: 'Rotate',
          colorChangeMode: 'Color',
          drawText: 'Text',
        };
        return i[t] ? i[t] : this[t] ? this[t]._shape : t;
      },
      _finishLayer(t) {
        t.pm &&
          (t.pm.setOptions(this.options),
          (t.options.color = this.options.activeColor),
          (t.pm._shape = this._shape),
          (t.pm._map = this._map)),
          this._addDrawnLayerProp(t);
      },
      _addDrawnLayerProp(t) {
        t._drawnByGeoman = !0;
      },
      _setPane(t, i) {
        i === 'layerPane'
          ? (t.options.pane =
              (this._map.pm.globalOptions.panes &&
                this._map.pm.globalOptions.panes.layerPane) ||
              'overlayPane')
          : i === 'vertexPane'
            ? (t.options.pane =
                (this._map.pm.globalOptions.panes &&
                  this._map.pm.globalOptions.panes.vertexPane) ||
                'markerPane')
            : i === 'markerPane' &&
              (t.options.pane =
                (this._map.pm.globalOptions.panes &&
                  this._map.pm.globalOptions.panes.markerPane) ||
                'markerPane');
      },
      _isFirstLayer() {
        return (
          (this._map || this._layer._map).pm.getGeomanLayers().length === 0
        );
      },
    }),
    Lt = kb;
  Lt.Marker = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Marker'),
        (this.toolbarButtonName = 'drawMarker');
    },
    enable(t) {
      L.Util.setOptions(this, t),
        (this._enabled = !0),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this._map.on('click', this._createMarker, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        (this._hintMarker = L.marker(
          this._map.getCenter(),
          this.options.markerStyle
        )),
        this._setPane(this._hintMarker, 'markerPane'),
        (this._hintMarker._pmTempLayer = !0),
        this._hintMarker.addTo(this._map),
        this.options.tooltips &&
          this._hintMarker
            .bindTooltip(at('tooltips.placeMarker'), {
              permanent: !0,
              offset: L.point(0, 10),
              direction: 'bottom',
              opacity: 0.8,
            })
            .openTooltip(),
        (this._layer = this._hintMarker),
        this._map.on('mousemove', this._syncHintMarker, this),
        this.options.markerEditable &&
          this._map.eachLayer((i) => {
            this.isRelevantMarker(i) && i.pm.enable();
          }),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this._map.off('click', this._createMarker, this),
        this._hintMarker.remove(),
        this._map.off('mousemove', this._syncHintMarker, this),
        this._map.eachLayer((t) => {
          this.isRelevantMarker(t) && t.pm.disable();
        }),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode());
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    isRelevantMarker(t) {
      return (
        t instanceof L.Marker &&
        t.pm &&
        !t._pmTempLayer &&
        !t.pm._initTextMarker
      );
    },
    _syncHintMarker(t) {
      if ((this._hintMarker.setLatLng(t.latlng), this.options.snappable)) {
        let i = t;
        (i.target = this._hintMarker), this._handleSnapping(i);
      }
      this._fireChange(this._hintMarker.getLatLng(), 'Draw');
    },
    _createMarker(t) {
      if (
        !t.latlng ||
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer())
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng(),
        r = new L.Marker(i, this.options.markerStyle);
      this._setPane(r, 'markerPane'),
        this._finishLayer(r),
        r.pm || (r.options.draggable = !1),
        r.addTo(this._map.pm._getContainingLayer()),
        r.pm && this.options.markerEditable
          ? r.pm.enable()
          : r.dragging && r.dragging.disable(),
        this._fireCreate(r),
        this._cleanupSnapping(),
        this.options.continueDrawing || this.disable();
    },
    setStyle() {
      this.options.markerStyle?.icon &&
        this._hintMarker?.setIcon(this.options.markerStyle.icon);
    },
  });
  var Ht = 63710088e-1,
    zc = {
      centimeters: Ht * 100,
      centimetres: Ht * 100,
      degrees: Ht / 111325,
      feet: Ht * 3.28084,
      inches: Ht * 39.37,
      kilometers: Ht / 1e3,
      kilometres: Ht / 1e3,
      meters: Ht,
      metres: Ht,
      miles: Ht / 1609.344,
      millimeters: Ht * 1e3,
      millimetres: Ht * 1e3,
      nauticalmiles: Ht / 1852,
      radians: 1,
      yards: Ht * 1.0936,
    },
    TM = {
      centimeters: 100,
      centimetres: 100,
      degrees: 1 / 111325,
      feet: 3.28084,
      inches: 39.37,
      kilometers: 1 / 1e3,
      kilometres: 1 / 1e3,
      meters: 1,
      metres: 1,
      miles: 1 / 1609.344,
      millimeters: 1e3,
      millimetres: 1e3,
      nauticalmiles: 1 / 1852,
      radians: 1 / Ht,
      yards: 1.0936133,
    };
  function Fe(t, i, r) {
    r === void 0 && (r = {});
    var o = { type: 'Feature' };
    return (
      (r.id === 0 || r.id) && (o.id = r.id),
      r.bbox && (o.bbox = r.bbox),
      (o.properties = i || {}),
      (o.geometry = t),
      o
    );
  }
  function he(t, i, r) {
    if ((r === void 0 && (r = {}), !t))
      throw new Error('coordinates is required');
    if (!Array.isArray(t)) throw new Error('coordinates must be an Array');
    if (t.length < 2)
      throw new Error('coordinates must be at least 2 numbers long');
    if (!go(t[0]) || !go(t[1]))
      throw new Error('coordinates must contain numbers');
    var o = { type: 'Point', coordinates: t };
    return Fe(o, i, r);
  }
  function Pe(t, i, r) {
    if ((r === void 0 && (r = {}), t.length < 2))
      throw new Error('coordinates must be an array of two or more positions');
    var o = { type: 'LineString', coordinates: t };
    return Fe(o, i, r);
  }
  function ue(t, i) {
    i === void 0 && (i = {});
    var r = { type: 'FeatureCollection' };
    return (
      i.id && (r.id = i.id), i.bbox && (r.bbox = i.bbox), (r.features = t), r
    );
  }
  function Nc(t, i) {
    i === void 0 && (i = 'kilometers');
    var r = zc[i];
    if (!r) throw new Error(i + ' units is invalid');
    return t * r;
  }
  function Gc(t, i) {
    i === void 0 && (i = 'kilometers');
    var r = zc[i];
    if (!r) throw new Error(i + ' units is invalid');
    return t / r;
  }
  function sr(t) {
    var i = t % (2 * Math.PI);
    return (i * 180) / Math.PI;
  }
  function Kt(t) {
    var i = t % 360;
    return (i * Math.PI) / 180;
  }
  function go(t) {
    return !isNaN(t) && t !== null && !Array.isArray(t);
  }
  function ve(t) {
    var i,
      r,
      o = { type: 'FeatureCollection', features: [] };
    if (
      (t.type === 'Feature' ? (r = t.geometry) : (r = t),
      r.type === 'LineString')
    )
      i = [r.coordinates];
    else if (r.type === 'MultiLineString') i = r.coordinates;
    else if (r.type === 'MultiPolygon') i = [].concat.apply([], r.coordinates);
    else if (r.type === 'Polygon') i = r.coordinates;
    else
      throw new Error(
        'Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry'
      );
    return (
      i.forEach(function (a) {
        i.forEach(function (l) {
          for (var u = 0; u < a.length - 1; u++)
            for (var c = u; c < l.length - 1; c++)
              if (
                !(
                  a === l &&
                  (Math.abs(u - c) === 1 ||
                    (u === 0 &&
                      c === a.length - 2 &&
                      a[u][0] === a[a.length - 1][0] &&
                      a[u][1] === a[a.length - 1][1]))
                )
              ) {
                var d = Mb(
                  a[u][0],
                  a[u][1],
                  a[u + 1][0],
                  a[u + 1][1],
                  l[c][0],
                  l[c][1],
                  l[c + 1][0],
                  l[c + 1][1]
                );
                d && o.features.push(he([d[0], d[1]]));
              }
        });
      }),
      o
    );
  }
  function Mb(t, i, r, o, a, l, u, c) {
    var d,
      p,
      y,
      b,
      D,
      O = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return (
      (d = (c - l) * (r - t) - (u - a) * (o - i)),
      d === 0
        ? O.x !== null && O.y !== null
          ? O
          : !1
        : ((p = i - l),
          (y = t - a),
          (b = (u - a) * p - (c - l) * y),
          (D = (r - t) * p - (o - i) * y),
          (p = b / d),
          (y = D / d),
          (O.x = t + p * (r - t)),
          (O.y = i + p * (o - i)),
          p >= 0 && p <= 1 && (O.onLine1 = !0),
          y >= 0 && y <= 1 && (O.onLine2 = !0),
          O.onLine1 && O.onLine2 ? [O.x, O.y] : !1)
    );
  }
  Lt.Line = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Line'),
        (this.toolbarButtonName = 'drawPolyline'),
        (this._doesSelfIntersect = !1);
    },
    enable(t) {
      L.Util.setOptions(this, t),
        (this._enabled = !0),
        (this._markers = []),
        (this._layerGroup = new L.FeatureGroup()),
        (this._layerGroup._pmTempLayer = !0),
        this._layerGroup.addTo(this._map),
        (this._layer = L.polyline([], {
          ...this.options.templineStyle,
          pmIgnore: !1,
        })),
        this._setPane(this._layer, 'layerPane'),
        (this._layer._pmTempLayer = !0),
        this._layerGroup.addLayer(this._layer),
        (this._hintline = L.polyline([], this.options.hintlineStyle)),
        this._setPane(this._hintline, 'layerPane'),
        (this._hintline._pmTempLayer = !0),
        this._layerGroup.addLayer(this._hintline),
        (this._hintMarker = L.marker(this._map.getCenter(), {
          interactive: !1,
          zIndexOffset: 100,
          icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        })),
        this._setPane(this._hintMarker, 'vertexPane'),
        (this._hintMarker._pmTempLayer = !0),
        this._layerGroup.addLayer(this._hintMarker),
        this.options.cursorMarker &&
          L.DomUtil.addClass(this._hintMarker._icon, 'visible'),
        this.options.tooltips &&
          this._hintMarker
            .bindTooltip(at('tooltips.firstVertex'), {
              permanent: !0,
              offset: L.point(0, 10),
              direction: 'bottom',
              opacity: 0.8,
            })
            .openTooltip(),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this._map.on('click', this._createVertex, this),
        this.options.finishOn &&
          this.options.finishOn !== 'snap' &&
          this._map.on(this.options.finishOn, this._finishShape, this),
        this.options.finishOn === 'dblclick' &&
          ((this.tempMapDoubleClickZoomState =
            this._map.doubleClickZoom._enabled),
          this.tempMapDoubleClickZoomState &&
            this._map.doubleClickZoom.disable()),
        this._map.on('mousemove', this._syncHintMarker, this),
        this._hintMarker.on('move', this._syncHintLine, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        (this._otherSnapLayers = []),
        (this.isRed = !1),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this._map.off('click', this._createVertex, this),
        this._map.off('mousemove', this._syncHintMarker, this),
        this.options.finishOn &&
          this.options.finishOn !== 'snap' &&
          this._map.off(this.options.finishOn, this._finishShape, this),
        this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(),
        this._map.removeLayer(this._layerGroup),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode());
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    _syncHintLine() {
      let t = this._layer.getLatLngs();
      if (t.length > 0) {
        let i = t[t.length - 1];
        this._hintline.setLatLngs([i, this._hintMarker.getLatLng()]);
      }
    },
    _syncHintMarker(t) {
      if ((this._hintMarker.setLatLng(t.latlng), this.options.snappable)) {
        let r = t;
        (r.target = this._hintMarker), this._handleSnapping(r);
      }
      this.options.allowSelfIntersection ||
        this._handleSelfIntersection(!0, this._hintMarker.getLatLng());
      let i = this._layer._defaultShape().slice();
      i.push(this._hintMarker.getLatLng()), this._change(i);
    },
    hasSelfIntersection() {
      return ve(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersection(t, i) {
      let r = L.polyline(this._layer.getLatLngs());
      t && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
      let o = ve(r.toGeoJSON(15));
      (this._doesSelfIntersect = o.features.length > 0),
        this._doesSelfIntersect
          ? this.isRed ||
            ((this.isRed = !0),
            this._hintline.setStyle({ color: '#f00000ff' }),
            this._fireIntersect(o, this._map, 'Draw'))
          : this._hintline.isEmpty() ||
            ((this.isRed = !1),
            this._hintline.setStyle(this.options.hintlineStyle));
    },
    _createVertex(t) {
      if (
        !this.options.allowSelfIntersection &&
        (this._handleSelfIntersection(!0, t.latlng), this._doesSelfIntersect)
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng(),
        r = this._layer.getLatLngs(),
        o = r[r.length - 1];
      if (i.equals(r[0]) || (r.length > 0 && i.equals(o))) {
        this._finishShape();
        return;
      }
      (this._layer._latlngInfo = this._layer._latlngInfo || []),
        this._layer._latlngInfo.push({
          latlng: i,
          snapInfo: this._hintMarker._snapInfo,
        }),
        this._layer.addLatLng(i);
      let a = this._createMarker(i);
      this._setTooltipText(),
        this._setHintLineAfterNewVertex(i),
        this._fireVertexAdded(a, void 0, i, 'Draw'),
        this._change(this._layer.getLatLngs()),
        this.options.finishOn === 'snap' &&
          this._hintMarker._snapped &&
          this._finishShape(t);
    },
    _setHintLineAfterNewVertex(t) {
      this._hintline.setLatLngs([t, t]);
    },
    _removeLastVertex() {
      let t = this._markers;
      if (t.length <= 1) {
        this.disable();
        return;
      }
      let i = this._layer.getLatLngs(),
        r = t[t.length - 1],
        { indexPath: o } = L.PM.Utils.findDeepMarkerIndex(t, r);
      t.pop(), this._layerGroup.removeLayer(r);
      let a = t[t.length - 1],
        l = i.indexOf(a.getLatLng());
      (i = i.slice(0, l + 1)),
        this._layer.setLatLngs(i),
        this._layer._latlngInfo.pop(),
        this._syncHintLine(),
        this._setTooltipText(),
        this._fireVertexRemoved(r, o, 'Draw'),
        this._change(this._layer.getLatLngs());
    },
    _finishShape() {
      if (
        (!this.options.allowSelfIntersection &&
          (this._handleSelfIntersection(!1), this._doesSelfIntersect)) ||
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer())
      )
        return;
      let t = this._layer.getLatLngs();
      if (t.length <= 1) return;
      let i = L.polyline(t, this.options.pathOptions);
      this._setPane(i, 'layerPane'),
        this._finishLayer(i),
        i.addTo(this._map.pm._getContainingLayer()),
        this._fireCreate(i),
        this.options.snappable && this._cleanupSnapping(),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    _createMarker(t) {
      let i = new L.Marker(t, {
        draggable: !1,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(i, 'vertexPane'),
        (i._pmTempLayer = !0),
        this._layerGroup.addLayer(i),
        this._markers.push(i),
        i.on('click', this._finishShape, this),
        i
      );
    },
    _setTooltipText() {
      let { length: t } = this._layer.getLatLngs().flat(),
        i = '';
      t <= 1
        ? (i = at('tooltips.continueLine'))
        : (i = at('tooltips.finishLine')),
        this._hintMarker.setTooltipContent(i);
    },
    _change(t) {
      this._fireChange(t, 'Draw');
    },
    setStyle() {
      this._layer?.setStyle(this.options.templineStyle),
        this._hintline?.setStyle(this.options.hintlineStyle);
    },
  });
  Lt.ArrowLine = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'ArrowLine'),
        (this.toolbarButtonName = 'drawArrowLine'),
        (this._doesSelfIntersect = !1),
        (this._defaultArrowheadOptions = {
          fill: !1,
          frequency: 'endonly',
          yawn: 30,
          size: '25px',
          weight: 3,
          showArrowToggle: !1,
        });
    },
    enable(t) {
      L.Util.setOptions(this, t),
        (this._arrowheadOptions = { ...this._defaultArrowheadOptions }),
        this.openDialog(),
        (this._enabled = !0),
        (this._markers = []),
        (this._layerGroup = new L.FeatureGroup()),
        (this._layerGroup._pmTempLayer = !0),
        this._layerGroup.addTo(this._map),
        (this._layer = L.polyline([], {
          ...this.options.templineStyle,
          pmIgnore: !1,
        }).arrowheads(this._arrowheadOptions)),
        this._setPane(this._layer, 'layerPane'),
        (this._layer._pmTempLayer = !0),
        this._layerGroup.addLayer(this._layer),
        (this._hintline = L.polyline([], this.options.hintlineStyle).arrowheads(
          this._arrowheadOptions
        )),
        this._setPane(this._hintline, 'layerPane'),
        (this._hintline._pmTempLayer = !0),
        this._layerGroup.addLayer(this._hintline),
        (this._hintMarker = L.marker(this._map.getCenter(), {
          interactive: !1,
          zIndexOffset: 100,
          icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        })),
        this._setPane(this._hintMarker, 'vertexPane'),
        (this._hintMarker._pmTempLayer = !0),
        this._layerGroup.addLayer(this._hintMarker),
        this.options.cursorMarker &&
          L.DomUtil.addClass(this._hintMarker._icon, 'visible'),
        this.options.tooltips &&
          this._hintMarker
            .bindTooltip(at('tooltips.firstVertex'), {
              permanent: !0,
              offset: L.point(0, 10),
              direction: 'bottom',
              opacity: 0.8,
            })
            .openTooltip(),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this._map.on('click', this._createVertex, this),
        this.options.finishOn &&
          this.options.finishOn !== 'snap' &&
          this._map.on(this.options.finishOn, this._finishShape, this),
        this.options.finishOn === 'dblclick' &&
          ((this.tempMapDoubleClickZoomState =
            this._map.doubleClickZoom._enabled),
          this.tempMapDoubleClickZoomState &&
            this._map.doubleClickZoom.disable()),
        this._map.on('mousemove', this._syncHintMarker, this),
        this._hintMarker.on('move', this._syncHintLine, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        (this._otherSnapLayers = []),
        (this.isRed = !1),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this._map.off('click', this._createVertex, this),
        this._map.off('mousemove', this._syncHintMarker, this),
        this.options.finishOn &&
          this.options.finishOn !== 'snap' &&
          this._map.off(this.options.finishOn, this._finishShape, this),
        this.tempMapDoubleClickZoomState && this._map.doubleClickZoom.enable(),
        this._map.removeLayer(this._layerGroup),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode(),
        this.closeDrawArrowLineDialog(),
        this.disableAllDrawArrowLineDialogEvents());
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    openDialog() {
      let t = this.getDrawArrowLineDialogBody(this._arrowheadOptions);
      this._map.pm.Dialog.drawArrowLineDialog.setContent(
        this.options.dialogContent || t
      ),
        this._map.pm.Dialog.drawArrowLineDialog.open(),
        this.initDrawArrowLineFilledChangedListener(
          this._onArrowFilledChangedListener,
          this
        ),
        this.initDrawArrowLineFrequencyChangedListener(
          this._onArrowFrequencyChangedListener,
          this
        ),
        this.initDrawArrowLineAngleChangedListener(
          this._onArrowAngleChangedListener,
          this
        ),
        this.initDrawArrowLineSizeChangedListener(
          this._onArrowSizeChangedListener,
          this
        );
    },
    _onArrowFilledChangedListener(t) {
      (this._arrowheadOptions.fill = t.target.checked), this._updateLines(t);
    },
    _onArrowFrequencyChangedListener(t) {
      (this._arrowheadOptions.frequency = this._getDrawArrowLineFrequency(
        t.target.value
      )),
        this._updateLines(t);
    },
    _onArrowAngleChangedListener(t) {
      (this._arrowheadOptions.yawn = t.target.value), this._updateLines(t);
    },
    _onArrowSizeChangedListener(t) {
      (this._arrowheadOptions.size = `${t.target.value}px`),
        this._updateLines(t);
    },
    _updateLines() {
      this._layer.arrowheads(this._arrowheadOptions),
        this._hintline.arrowheads(this._arrowheadOptions),
        this._fireArrowheadDrawChangeEvent(this._arrowheadOptions),
        this._fireMapResetView();
    },
    _syncHintLine() {
      let t = this._layer.getLatLngs();
      if (t.length > 0) {
        let i = t[t.length - 1];
        this._hintline.setLatLngs([i, this._hintMarker.getLatLng()]);
      }
    },
    _syncHintMarker(t) {
      if ((this._hintMarker.setLatLng(t.latlng), this.options.snappable)) {
        let r = t;
        (r.target = this._hintMarker), this._handleSnapping(r);
      }
      this.options.allowSelfIntersection ||
        this._handleSelfIntersection(!0, this._hintMarker.getLatLng());
      let i = this._layer._defaultShape().slice();
      i.push(this._hintMarker.getLatLng()), this._change(i);
    },
    hasSelfIntersection() {
      return ve(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersection(t, i) {
      let r = L.polyline(this._layer.getLatLngs()).arrowheads(
        this._arrowheadOptions
      );
      t && (i || (i = this._hintMarker.getLatLng()), r.addLatLng(i));
      let o = ve(r.toGeoJSON(15));
      (this._doesSelfIntersect = o.features.length > 0),
        this._doesSelfIntersect
          ? this.isRed ||
            ((this.isRed = !0),
            this._hintline.setStyle({ color: '#f00000ff' }),
            this._fireIntersect(o, this._map, 'Draw'))
          : this._hintline.isEmpty() ||
            ((this.isRed = !1),
            this._hintline.setStyle(this.options.hintlineStyle));
    },
    _createVertex(t) {
      if (
        !this.options.allowSelfIntersection &&
        (this._handleSelfIntersection(!0, t.latlng), this._doesSelfIntersect)
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng(),
        r = this._layer.getLatLngs(),
        o = r[r.length - 1];
      if (i.equals(r[0]) || (r.length > 0 && i.equals(o))) {
        this._finishShape();
        return;
      }
      (this._layer._latlngInfo = this._layer._latlngInfo || []),
        this._layer._latlngInfo.push({
          latlng: i,
          snapInfo: this._hintMarker._snapInfo,
        }),
        this._layer.addLatLng(i);
      let a = this._createMarker(i);
      this._setTooltipText(),
        this._setHintLineAfterNewVertex(i),
        this._fireVertexAdded(a, void 0, i, 'Draw'),
        this._change(this._layer.getLatLngs()),
        this.options.finishOn === 'snap' &&
          this._hintMarker._snapped &&
          this._finishShape(t);
    },
    _setHintLineAfterNewVertex(t) {
      this._hintline.setLatLngs([t, t]);
    },
    _removeLastVertex() {
      let t = this._markers;
      if (t.length <= 1) {
        this.disable();
        return;
      }
      let i = this._layer.getLatLngs(),
        r = t[t.length - 1],
        { indexPath: o } = L.PM.Utils.findDeepMarkerIndex(t, r);
      t.pop(), this._layerGroup.removeLayer(r);
      let a = t[t.length - 1],
        l = i.indexOf(a.getLatLng());
      (i = i.slice(0, l + 1)),
        this._layer.setLatLngs(i),
        this._layer._latlngInfo.pop(),
        this._syncHintLine(),
        this._setTooltipText(),
        this._fireVertexRemoved(r, o, 'Draw'),
        this._change(this._layer.getLatLngs());
    },
    _finishShape() {
      if (
        (!this.options.allowSelfIntersection &&
          (this._handleSelfIntersection(!1), this._doesSelfIntersect)) ||
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer())
      )
        return;
      let t = this._layer.getLatLngs();
      if (t.length <= 1) return;
      let i = L.polyline(t, this.options.pathOptions).arrowheads(
        this._arrowheadOptions
      );
      this._setPane(i, 'layerPane'),
        this._finishLayer(i),
        i.addTo(this._map.pm._getContainingLayer()),
        this._fireCreate(i),
        this.options.snappable && this._cleanupSnapping(),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    _createMarker(t) {
      let i = new L.Marker(t, {
        draggable: !1,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(i, 'vertexPane'),
        (i._pmTempLayer = !0),
        this._layerGroup.addLayer(i),
        this._markers.push(i),
        i.on('click', this._finishShape, this),
        i
      );
    },
    _setTooltipText() {
      let { length: t } = this._layer.getLatLngs().flat(),
        i = '';
      t <= 1
        ? (i = at('tooltips.continueLine'))
        : (i = at('tooltips.finishLine')),
        this._hintMarker.setTooltipContent(i);
    },
    _change(t) {
      this._fireChange(t, 'Draw');
    },
    setStyle() {
      this._layer?.setStyle(this.options.templineStyle),
        this._hintline?.setStyle(this.options.hintlineStyle);
    },
  });
  Lt.Polygon = Lt.Line.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Polygon'),
        (this.toolbarButtonName = 'drawPolygon');
    },
    enable(t) {
      L.PM.Draw.Line.prototype.enable.call(this, t),
        (this._layer.pm._shape = 'Polygon');
    },
    _createMarker(t) {
      let i = new L.Marker(t, {
        draggable: !1,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(i, 'vertexPane'),
        (i._pmTempLayer = !0),
        this._layerGroup.addLayer(i),
        this._markers.push(i),
        this._layer.getLatLngs().flat().length === 1
          ? (i.on('click', this._finishShape, this),
            (this._tempSnapLayerIndex = this._otherSnapLayers.push(i) - 1),
            this.options.snappable && this._cleanupSnapping())
          : i.on('click', () => 1),
        i
      );
    },
    _setTooltipText() {
      let { length: t } = this._layer.getLatLngs().flat(),
        i = '';
      t <= 2
        ? (i = at('tooltips.continueLine'))
        : (i = at('tooltips.finishPoly')),
        this._hintMarker.setTooltipContent(i);
    },
    _finishShape() {
      if (
        (!this.options.allowSelfIntersection &&
          (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]),
          this._doesSelfIntersect)) ||
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer())
      )
        return;
      let t = this._layer.getLatLngs();
      if (t.length <= 2) return;
      let i = L.polygon(t, this.options.pathOptions);
      this._setPane(i, 'layerPane'),
        this._finishLayer(i),
        i.addTo(this._map.pm._getContainingLayer()),
        this._fireCreate(i),
        this._cleanupSnapping(),
        this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1),
        delete this._tempSnapLayerIndex,
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
  });
  Lt.Rectangle = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Rectangle'),
        (this.toolbarButtonName = 'drawRectangle');
    },
    enable(t) {
      if (
        (L.Util.setOptions(this, t),
        (this._enabled = !0),
        (this._layerGroup = new L.FeatureGroup()),
        (this._layerGroup._pmTempLayer = !0),
        this._layerGroup.addTo(this._map),
        (this._layer = L.rectangle(
          [
            [0, 0],
            [0, 0],
          ],
          this.options.pathOptions
        )),
        this._setPane(this._layer, 'layerPane'),
        (this._layer._pmTempLayer = !0),
        (this._startMarker = L.marker(this._map.getCenter(), {
          icon: L.divIcon({ className: 'marker-icon rect-start-marker' }),
          draggable: !1,
          zIndexOffset: -100,
          opacity: this.options.cursorMarker ? 1 : 0,
        })),
        this._setPane(this._startMarker, 'vertexPane'),
        (this._startMarker._pmTempLayer = !0),
        this._layerGroup.addLayer(this._startMarker),
        (this._hintMarker = L.marker(this._map.getCenter(), {
          zIndexOffset: 150,
          icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        })),
        this._setPane(this._hintMarker, 'vertexPane'),
        (this._hintMarker._pmTempLayer = !0),
        this._layerGroup.addLayer(this._hintMarker),
        this.options.cursorMarker &&
          L.DomUtil.addClass(this._hintMarker._icon, 'visible'),
        this.options.tooltips &&
          this._hintMarker
            .bindTooltip(at('tooltips.firstVertex'), {
              permanent: !0,
              offset: L.point(0, 10),
              direction: 'bottom',
              opacity: 0.8,
            })
            .openTooltip(),
        this.options.cursorMarker)
      ) {
        this._styleMarkers = [];
        for (let i = 0; i < 2; i += 1) {
          let r = L.marker(this._map.getCenter(), {
            icon: L.divIcon({ className: 'marker-icon rect-style-marker' }),
            draggable: !1,
            zIndexOffset: 100,
          });
          this._setPane(r, 'vertexPane'),
            (r._pmTempLayer = !0),
            this._layerGroup.addLayer(r),
            this._styleMarkers.push(r);
        }
      }
      this._map.getContainer().classList.add('geoman-draw-cursor'),
        this._map.on('click', this._placeStartingMarkers, this),
        this._map.on('mousemove', this._syncHintMarker, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        (this._otherSnapLayers = []),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this._map.off('click', this._finishShape, this),
        this._map.off('click', this._placeStartingMarkers, this),
        this._map.off('mousemove', this._syncHintMarker, this),
        this._map.removeLayer(this._layerGroup),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode());
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    _placeStartingMarkers(t) {
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng();
      L.DomUtil.addClass(this._startMarker._icon, 'visible'),
        this._startMarker.setLatLng(i),
        this.options.cursorMarker &&
          this._styleMarkers &&
          this._styleMarkers.forEach((r) => {
            L.DomUtil.addClass(r._icon, 'visible'), r.setLatLng(i);
          }),
        this._map.off('click', this._placeStartingMarkers, this),
        this._map.on('click', this._finishShape, this),
        this._hintMarker.setTooltipContent(at('tooltips.finishRect')),
        this._setRectangleOrigin();
    },
    _setRectangleOrigin() {
      let t = this._startMarker.getLatLng();
      t &&
        (this._layerGroup.addLayer(this._layer),
        this._layer.setLatLngs([t, t]),
        this._hintMarker.on('move', this._syncRectangleSize, this));
    },
    _syncHintMarker(t) {
      if ((this._hintMarker.setLatLng(t.latlng), this.options.snappable)) {
        let r = t;
        (r.target = this._hintMarker), this._handleSnapping(r);
      }
      let i =
        this._layerGroup && this._layerGroup.hasLayer(this._layer)
          ? this._layer.getLatLngs()
          : [this._hintMarker.getLatLng()];
      this._fireChange(i, 'Draw');
    },
    _syncRectangleSize() {
      let t = fo(this._startMarker.getLatLng(), this._map),
        i = fo(this._hintMarker.getLatLng(), this._map),
        r = L.PM.Utils._getRotatedRectangle(
          t,
          i,
          this.options.rectangleAngle || 0,
          this._map
        );
      if (
        (this._layer.setLatLngs(r),
        this.options.cursorMarker && this._styleMarkers)
      ) {
        let o = [];
        r.forEach((a) => {
          !a.equals(t, 1e-8) && !a.equals(i, 1e-8) && o.push(a);
        }),
          o.forEach((a, l) => {
            try {
              this._styleMarkers[l].setLatLng(a);
            } catch {}
          });
      }
    },
    _findCorners() {
      let t = this._layer.getLatLngs()[0];
      return L.PM.Utils._getRotatedRectangle(
        t[0],
        t[2],
        this.options.rectangleAngle || 0,
        this._map
      );
    },
    _finishShape(t) {
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng(),
        r = this._startMarker.getLatLng();
      if (
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer()) ||
        r.equals(i)
      )
        return;
      let o = L.rectangle([r, i], this.options.pathOptions);
      if (this.options.rectangleAngle) {
        let a = L.PM.Utils._getRotatedRectangle(
          r,
          i,
          this.options.rectangleAngle || 0,
          this._map
        );
        o.setLatLngs(a),
          o.pm && o.pm._setAngle(this.options.rectangleAngle || 0);
      }
      this._setPane(o, 'layerPane'),
        this._finishLayer(o),
        o.addTo(this._map.pm._getContainingLayer()),
        this._fireCreate(o),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    setStyle() {
      this._layer?.setStyle(this.options.pathOptions);
    },
  });
  Lt.CircleMarker = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'CircleMarker'),
        (this.toolbarButtonName = 'drawCircleMarker'),
        (this._layerIsDragging = !1),
        (this._BaseCircleClass = L.CircleMarker),
        (this._minRadiusOption = 'minRadiusCircleMarker'),
        (this._maxRadiusOption = 'maxRadiusCircleMarker'),
        (this._editableOption = 'resizeableCircleMarker'),
        (this._defaultRadius = 10);
    },
    enable(t) {
      let i = this.rgbToHex(
        L.DomUtil.getStyle(this._layer.getElement(), 'stroke')
      );
      if (
        (L.Util.setOptions(this, {
          ...t,
          color: i || this.options.defaultColor,
        }),
        this.options.editable &&
          ((this.options.resizeableCircleMarker = this.options.editable),
          delete this.options.editable),
        (this._enabled = !0),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this.options[this._editableOption])
      ) {
        let r = {};
        L.extend(r, this.options.templineStyle),
          (r.radius = 0),
          (this._layerGroup = new L.FeatureGroup()),
          (this._layerGroup._pmTempLayer = !0),
          this._layerGroup.addTo(this._map),
          (this._layer = new this._BaseCircleClass(this._map.getCenter(), r)),
          this._setPane(this._layer, 'layerPane'),
          (this._layer._pmTempLayer = !0),
          (this._centerMarker = L.marker(this._map.getCenter(), {
            icon: L.divIcon({ className: 'marker-icon' }),
            draggable: !1,
            zIndexOffset: 100,
          })),
          this._setPane(this._centerMarker, 'vertexPane'),
          (this._centerMarker._pmTempLayer = !0),
          (this._hintMarker = L.marker(this._map.getCenter(), {
            zIndexOffset: 110,
            icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
          })),
          this._setPane(this._hintMarker, 'vertexPane'),
          (this._hintMarker._pmTempLayer = !0),
          this._layerGroup.addLayer(this._hintMarker),
          this.options.cursorMarker &&
            L.DomUtil.addClass(this._hintMarker._icon, 'visible'),
          this.options.tooltips &&
            this._hintMarker
              .bindTooltip(at('tooltips.startCircle'), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: 'bottom',
                opacity: 0.8,
              })
              .openTooltip(),
          (this._hintline = L.polyline([], this.options.hintlineStyle)),
          this._setPane(this._hintline, 'layerPane'),
          (this._hintline._pmTempLayer = !0),
          this._layerGroup.addLayer(this._hintline),
          this._map.on('click', this._placeCenterMarker, this);
      } else
        this._map.on('click', this._createMarker, this),
          (this._hintMarker = new this._BaseCircleClass(this._map.getCenter(), {
            radius: this._defaultRadius,
            ...this.options.templineStyle,
          })),
          this._setPane(this._hintMarker, 'layerPane'),
          (this._hintMarker._pmTempLayer = !0),
          this._hintMarker.addTo(this._map),
          (this._layer = this._hintMarker),
          this.options.tooltips &&
            this._hintMarker
              .bindTooltip(at('tooltips.placeCircleMarker'), {
                permanent: !0,
                offset: L.point(0, 10),
                direction: 'bottom',
                opacity: 0.8,
              })
              .openTooltip();
      this._map.on('mousemove', this._syncHintMarker, this),
        this._extendingEnable(),
        (this._otherSnapLayers = []),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    _extendingEnable() {
      !this.options[this._editableOption] &&
        this.options.markerEditable &&
        this._map.eachLayer((t) => {
          this.isRelevantMarker(t) && t.pm.enable();
        }),
        this._layer.bringToBack();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this.options[this._editableOption]
          ? (this._map.off('click', this._finishShape, this),
            this._map.off('click', this._placeCenterMarker, this),
            this._map.removeLayer(this._layerGroup))
          : (this._map.off('click', this._createMarker, this),
            this._extendingDisable(),
            this._hintMarker.remove()),
        this._map.off('mousemove', this._syncHintMarker, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode());
    },
    _extendingDisable() {
      this._map.eachLayer((t) => {
        this.isRelevantMarker(t) && t.pm.disable();
      });
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    _placeCenterMarker(t) {
      this._layerGroup.addLayer(this._layer),
        this._layerGroup.addLayer(this._centerMarker),
        this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng();
      this._layerGroup.addLayer(this._layer),
        this._centerMarker.setLatLng(i),
        this._map.off('click', this._placeCenterMarker, this),
        this._map.on('click', this._finishShape, this),
        this._placeCircleCenter();
    },
    _placeCircleCenter() {
      let t = this._centerMarker.getLatLng();
      t &&
        (this._layer.setLatLng(t),
        this._hintMarker.on('move', this._syncHintLine, this),
        this._hintMarker.on('move', this._syncCircleRadius, this),
        this._hintMarker.setTooltipContent(at('tooltips.finishCircle')),
        this._fireCenterPlaced(),
        this._fireChange(this._layer.getLatLng(), 'Draw'));
    },
    _syncHintLine() {
      let t = this._centerMarker.getLatLng(),
        i = this._getNewDestinationOfHintMarker();
      this._hintline.setLatLngs([t, i]);
    },
    _syncCircleRadius() {
      let t = this._centerMarker.getLatLng(),
        i = this._hintMarker.getLatLng(),
        r = this._distanceCalculation(t, i);
      this.options[this._minRadiusOption] &&
      r < this.options[this._minRadiusOption]
        ? this._layer.setRadius(this.options[this._minRadiusOption])
        : this.options[this._maxRadiusOption] &&
            r > this.options[this._maxRadiusOption]
          ? this._layer.setRadius(this.options[this._maxRadiusOption])
          : this._layer.setRadius(r);
    },
    _syncHintMarker(t) {
      if (
        (this._hintMarker.setLatLng(t.latlng),
        this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker()),
        this.options.snappable)
      ) {
        let r = t;
        (r.target = this._hintMarker), this._handleSnapping(r);
      }
      this._handleHintMarkerSnapping();
      let i =
        this._layerGroup && this._layerGroup.hasLayer(this._centerMarker)
          ? this._centerMarker.getLatLng()
          : this._hintMarker.getLatLng();
      this._fireChange(i, 'Draw');
    },
    isRelevantMarker(t) {
      return (
        t instanceof L.CircleMarker &&
        !(t instanceof L.Circle) &&
        t.pm &&
        !t._pmTempLayer
      );
    },
    _createMarker(t) {
      if (
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer()) ||
        !t.latlng ||
        this._layerIsDragging
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng(),
        r = new this._BaseCircleClass(i, {
          radius: this._defaultRadius,
          ...this.options.pathOptions,
        });
      this._setPane(r, 'layerPane'),
        this._finishLayer(r),
        r.addTo(this._map.pm._getContainingLayer()),
        this._extendingCreateMarker(r),
        this._fireCreate(r),
        this._cleanupSnapping(),
        this.options.continueDrawing || this.disable();
    },
    _extendingCreateMarker(t) {
      t.pm && this.options.markerEditable && t.pm.enable();
    },
    _finishShape(t) {
      if (
        this.options.requireSnapToFinish &&
        !this._hintMarker._snapped &&
        !this._isFirstLayer()
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._centerMarker.getLatLng(),
        r = this._defaultRadius;
      if (this.options[this._editableOption]) {
        let l = this._hintMarker.getLatLng();
        (r = this._distanceCalculation(i, l)),
          this.options[this._minRadiusOption] &&
          r < this.options[this._minRadiusOption]
            ? (r = this.options[this._minRadiusOption])
            : this.options[this._maxRadiusOption] &&
              r > this.options[this._maxRadiusOption] &&
              (r = this.options[this._maxRadiusOption]);
      }
      let o = { ...this.options.pathOptions, radius: r },
        a = new this._BaseCircleClass(i, o);
      this._setPane(a, 'layerPane'),
        this._finishLayer(a),
        a.addTo(this._map.pm._getContainingLayer()),
        a.pm && a.pm._updateHiddenPolyCircle(),
        this._fireCreate(a),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    _getNewDestinationOfHintMarker() {
      let t = this._hintMarker.getLatLng();
      if (this.options[this._editableOption]) {
        if (!this._layerGroup.hasLayer(this._centerMarker)) return t;
        let i = this._centerMarker.getLatLng(),
          r = this._distanceCalculation(i, t);
        this.options[this._minRadiusOption] &&
        r < this.options[this._minRadiusOption]
          ? (t = xi(this._map, i, t, this._getMinDistanceInMeter()))
          : this.options[this._maxRadiusOption] &&
            r > this.options[this._maxRadiusOption] &&
            (t = xi(this._map, i, t, this._getMaxDistanceInMeter()));
      }
      return t;
    },
    _getMinDistanceInMeter() {
      return L.PM.Utils.pxRadiusToMeterRadius(
        this.options[this._minRadiusOption],
        this._map,
        this._centerMarker.getLatLng()
      );
    },
    _getMaxDistanceInMeter() {
      return L.PM.Utils.pxRadiusToMeterRadius(
        this.options[this._maxRadiusOption],
        this._map,
        this._centerMarker.getLatLng()
      );
    },
    _handleHintMarkerSnapping() {
      if (this.options[this._editableOption]) {
        if (this._hintMarker._snapped) {
          let t = this._centerMarker.getLatLng(),
            i = this._hintMarker.getLatLng(),
            r = this._distanceCalculation(t, i);
          this._layerGroup.hasLayer(this._centerMarker) &&
            (this.options[this._minRadiusOption] &&
            r < this.options[this._minRadiusOption]
              ? this._hintMarker.setLatLng(this._hintMarker._orgLatLng)
              : this.options[this._maxRadiusOption] &&
                r > this.options[this._maxRadiusOption] &&
                this._hintMarker.setLatLng(this._hintMarker._orgLatLng));
        }
        this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker());
      }
    },
    setStyle() {
      let t = {};
      L.extend(t, this.options.templineStyle),
        this.options[this._editableOption] && (t.radius = 0),
        this._layer?.setStyle(t),
        this._hintline?.setStyle(this.options.hintlineStyle);
    },
    _distanceCalculation(t, i) {
      return this._map.project(t).distanceTo(this._map.project(i));
    },
  });
  Lt.Circle = Lt.CircleMarker.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Circle'),
        (this.toolbarButtonName = 'drawCircle'),
        (this._BaseCircleClass = L.Circle),
        (this._minRadiusOption = 'minRadiusCircle'),
        (this._maxRadiusOption = 'maxRadiusCircle'),
        (this._editableOption = 'resizableCircle'),
        (this._defaultRadius = 100);
    },
    _extendingEnable() {},
    _extendingDisable() {},
    _extendingCreateMarker() {},
    isRelevantMarker() {},
    _getMinDistanceInMeter() {
      return this.options[this._minRadiusOption];
    },
    _getMaxDistanceInMeter() {
      return this.options[this._maxRadiusOption];
    },
    _distanceCalculation(t, i) {
      return this._map.distance(t, i);
    },
  });
  function Ut(t) {
    if (!t) throw new Error('coord is required');
    if (!Array.isArray(t)) {
      if (
        t.type === 'Feature' &&
        t.geometry !== null &&
        t.geometry.type === 'Point'
      )
        return t.geometry.coordinates;
      if (t.type === 'Point') return t.coordinates;
    }
    if (
      Array.isArray(t) &&
      t.length >= 2 &&
      !Array.isArray(t[0]) &&
      !Array.isArray(t[1])
    )
      return t;
    throw new Error('coord must be GeoJSON Point or an Array of numbers');
  }
  function jt(t) {
    if (Array.isArray(t)) return t;
    if (t.type === 'Feature') {
      if (t.geometry !== null) return t.geometry.coordinates;
    } else if (t.coordinates) return t.coordinates;
    throw new Error(
      'coords must be GeoJSON Feature, Geometry Object or an Array'
    );
  }
  function Mi(t) {
    return t.type === 'Feature' ? t.geometry : t;
  }
  function _o(t, i) {
    return t.type === 'FeatureCollection'
      ? 'FeatureCollection'
      : t.type === 'GeometryCollection'
        ? 'GeometryCollection'
        : t.type === 'Feature' && t.geometry !== null
          ? t.geometry.type
          : t.type;
  }
  function ar(t, i, r) {
    if (t !== null)
      for (
        var o,
          a,
          l,
          u,
          c,
          d,
          p,
          y = 0,
          b = 0,
          D,
          O = t.type,
          q = O === 'FeatureCollection',
          $ = O === 'Feature',
          w = q ? t.features.length : 1,
          B = 0;
        B < w;
        B++
      ) {
        (p = q ? t.features[B].geometry : $ ? t.geometry : t),
          (D = p ? p.type === 'GeometryCollection' : !1),
          (c = D ? p.geometries.length : 1);
        for (var M = 0; M < c; M++) {
          var K = 0,
            W = 0;
          if (((u = D ? p.geometries[M] : p), u !== null)) {
            d = u.coordinates;
            var Y = u.type;
            switch (
              ((y = r && (Y === 'Polygon' || Y === 'MultiPolygon') ? 1 : 0), Y)
            ) {
              case null:
                break;
              case 'Point':
                if (i(d, b, B, K, W) === !1) return !1;
                b++, K++;
                break;
              case 'LineString':
              case 'MultiPoint':
                for (o = 0; o < d.length; o++) {
                  if (i(d[o], b, B, K, W) === !1) return !1;
                  b++, Y === 'MultiPoint' && K++;
                }
                Y === 'LineString' && K++;
                break;
              case 'Polygon':
              case 'MultiLineString':
                for (o = 0; o < d.length; o++) {
                  for (a = 0; a < d[o].length - y; a++) {
                    if (i(d[o][a], b, B, K, W) === !1) return !1;
                    b++;
                  }
                  Y === 'MultiLineString' && K++, Y === 'Polygon' && W++;
                }
                Y === 'Polygon' && K++;
                break;
              case 'MultiPolygon':
                for (o = 0; o < d.length; o++) {
                  for (W = 0, a = 0; a < d[o].length; a++) {
                    for (l = 0; l < d[o][a].length - y; l++) {
                      if (i(d[o][a][l], b, B, K, W) === !1) return !1;
                      b++;
                    }
                    W++;
                  }
                  K++;
                }
                break;
              case 'GeometryCollection':
                for (o = 0; o < u.geometries.length; o++)
                  if (ar(u.geometries[o], i, r) === !1) return !1;
                break;
              default:
                throw new Error('Unknown Geometry Type');
            }
          }
        }
      }
  }
  function Qe(t, i) {
    if (t.type === 'Feature') i(t, 0);
    else if (t.type === 'FeatureCollection')
      for (var r = 0; r < t.features.length && i(t.features[r], r) !== !1; r++);
  }
  function Fc(t, i, r) {
    var o = r;
    return (
      Qe(t, function (a, l) {
        l === 0 && r === void 0 ? (o = a) : (o = i(o, a, l));
      }),
      o
    );
  }
  function Cb(t, i) {
    var r,
      o,
      a,
      l,
      u,
      c,
      d,
      p,
      y,
      b,
      D = 0,
      O = t.type === 'FeatureCollection',
      q = t.type === 'Feature',
      $ = O ? t.features.length : 1;
    for (r = 0; r < $; r++) {
      for (
        c = O ? t.features[r].geometry : q ? t.geometry : t,
          p = O ? t.features[r].properties : q ? t.properties : {},
          y = O ? t.features[r].bbox : q ? t.bbox : void 0,
          b = O ? t.features[r].id : q ? t.id : void 0,
          d = c ? c.type === 'GeometryCollection' : !1,
          u = d ? c.geometries.length : 1,
          a = 0;
        a < u;
        a++
      ) {
        if (((l = d ? c.geometries[a] : c), l === null)) {
          if (i(null, D, p, y, b) === !1) return !1;
          continue;
        }
        switch (l.type) {
          case 'Point':
          case 'LineString':
          case 'MultiPoint':
          case 'Polygon':
          case 'MultiLineString':
          case 'MultiPolygon': {
            if (i(l, D, p, y, b) === !1) return !1;
            break;
          }
          case 'GeometryCollection': {
            for (o = 0; o < l.geometries.length; o++)
              if (i(l.geometries[o], D, p, y, b) === !1) return !1;
            break;
          }
          default:
            throw new Error('Unknown Geometry Type');
        }
      }
      D++;
    }
  }
  function Ci(t, i) {
    Cb(t, function (r, o, a, l, u) {
      var c = r === null ? null : r.type;
      switch (c) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
          return i(Fe(r, a, { bbox: l, id: u }), o, 0) === !1 ? !1 : void 0;
      }
      var d;
      switch (c) {
        case 'MultiPoint':
          d = 'Point';
          break;
        case 'MultiLineString':
          d = 'LineString';
          break;
        case 'MultiPolygon':
          d = 'Polygon';
          break;
      }
      for (var p = 0; p < r.coordinates.length; p++) {
        var y = r.coordinates[p],
          b = { type: d, coordinates: y };
        if (i(Fe(b, a), o, p) === !1) return !1;
      }
    });
  }
  function Pb(t) {
    if (!t) throw new Error('geojson is required');
    var i = [];
    return (
      Ci(t, function (r) {
        Eb(r, i);
      }),
      ue(i)
    );
  }
  function Eb(t, i) {
    var r = [],
      o = t.geometry;
    if (o !== null) {
      switch (o.type) {
        case 'Polygon':
          r = jt(o);
          break;
        case 'LineString':
          r = [jt(o)];
      }
      r.forEach(function (a) {
        var l = Sb(a, t.properties);
        l.forEach(function (u) {
          (u.id = i.length), i.push(u);
        });
      });
    }
  }
  function Sb(t, i) {
    var r = [];
    return (
      t.reduce(function (o, a) {
        var l = Pe([o, a], i);
        return (l.bbox = Tb(o, a)), r.push(l), a;
      }),
      r
    );
  }
  function Tb(t, i) {
    var r = t[0],
      o = t[1],
      a = i[0],
      l = i[1],
      u = r < a ? r : a,
      c = o < l ? o : l,
      d = r > a ? r : a,
      p = o > l ? o : l;
    return [u, c, d, p];
  }
  var lr = Pb;
  var nf = le(To(), 1);
  function r0(t, i) {
    var r = {},
      o = [];
    if (
      (t.type === 'LineString' && (t = Fe(t)),
      i.type === 'LineString' && (i = Fe(i)),
      t.type === 'Feature' &&
        i.type === 'Feature' &&
        t.geometry !== null &&
        i.geometry !== null &&
        t.geometry.type === 'LineString' &&
        i.geometry.type === 'LineString' &&
        t.geometry.coordinates.length === 2 &&
        i.geometry.coordinates.length === 2)
    ) {
      var a = rf(t, i);
      return a && o.push(a), ue(o);
    }
    var l = (0, nf.default)();
    return (
      l.load(lr(i)),
      Qe(lr(t), function (u) {
        Qe(l.search(u), function (c) {
          var d = rf(u, c);
          if (d) {
            var p = jt(d).join(',');
            r[p] || ((r[p] = !0), o.push(d));
          }
        });
      }),
      ue(o)
    );
  }
  function rf(t, i) {
    var r = jt(t),
      o = jt(i);
    if (r.length !== 2)
      throw new Error('<intersects> line1 must only contain 2 coordinates');
    if (o.length !== 2)
      throw new Error('<intersects> line2 must only contain 2 coordinates');
    var a = r[0][0],
      l = r[0][1],
      u = r[1][0],
      c = r[1][1],
      d = o[0][0],
      p = o[0][1],
      y = o[1][0],
      b = o[1][1],
      D = (b - p) * (u - a) - (y - d) * (c - l),
      O = (y - d) * (l - p) - (b - p) * (a - d),
      q = (u - a) * (l - p) - (c - l) * (a - d);
    if (D === 0) return null;
    var $ = O / D,
      w = q / D;
    if ($ >= 0 && $ <= 1 && w >= 0 && w <= 1) {
      var B = a + $ * (u - a),
        M = l + $ * (c - l);
      return he([B, M]);
    }
    return null;
  }
  var Qt = r0;
  var Oo = le(To(), 1);
  function n0(t, i, r) {
    r === void 0 && (r = {});
    var o = Ut(t),
      a = Ut(i),
      l = Kt(a[1] - o[1]),
      u = Kt(a[0] - o[0]),
      c = Kt(o[1]),
      d = Kt(a[1]),
      p =
        Math.pow(Math.sin(l / 2), 2) +
        Math.pow(Math.sin(u / 2), 2) * Math.cos(c) * Math.cos(d);
    return Nc(2 * Math.atan2(Math.sqrt(p), Math.sqrt(1 - p)), r.units);
  }
  var Ee = n0;
  function o0(t) {
    var i = t[0],
      r = t[1],
      o = t[2],
      a = t[3],
      l = Ee(t.slice(0, 2), [o, r]),
      u = Ee(t.slice(0, 2), [i, a]);
    if (l >= u) {
      var c = (r + a) / 2;
      return [i, c - (o - i) / 2, o, c + (o - i) / 2];
    } else {
      var d = (i + o) / 2;
      return [d - (a - r) / 2, r, d + (a - r) / 2, a];
    }
  }
  var of = o0;
  function Bo(t) {
    var i = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return (
      ar(t, function (r) {
        i[0] > r[0] && (i[0] = r[0]),
          i[1] > r[1] && (i[1] = r[1]),
          i[2] < r[0] && (i[2] = r[0]),
          i[3] < r[1] && (i[3] = r[1]);
      }),
      i
    );
  }
  Bo.default = Bo;
  var ti = Bo;
  function s0(t, i) {
    i === void 0 && (i = {});
    var r = i.precision,
      o = i.coordinates,
      a = i.mutate;
    if (
      ((r = r == null || isNaN(r) ? 6 : r),
      (o = o == null || isNaN(o) ? 3 : o),
      !t)
    )
      throw new Error('<geojson> is required');
    if (typeof r != 'number') throw new Error('<precision> must be a number');
    if (typeof o != 'number') throw new Error('<coordinates> must be a number');
    (a === !1 || a === void 0) && (t = JSON.parse(JSON.stringify(t)));
    var l = Math.pow(10, r);
    return (
      ar(t, function (u) {
        a0(u, l, o);
      }),
      t
    );
  }
  function a0(t, i, r) {
    t.length > r && t.splice(r, t.length);
    for (var o = 0; o < t.length; o++) t[o] = Math.round(t[o] * i) / i;
    return t;
  }
  var sf = s0;
  function Xr(t, i, r) {
    if ((r === void 0 && (r = {}), r.final === !0)) return l0(t, i);
    var o = Ut(t),
      a = Ut(i),
      l = Kt(o[0]),
      u = Kt(a[0]),
      c = Kt(o[1]),
      d = Kt(a[1]),
      p = Math.sin(u - l) * Math.cos(d),
      y =
        Math.cos(c) * Math.sin(d) - Math.sin(c) * Math.cos(d) * Math.cos(u - l);
    return sr(Math.atan2(p, y));
  }
  function l0(t, i) {
    var r = Xr(i, t);
    return (r = (r + 180) % 360), r;
  }
  function Jr(t, i, r, o) {
    o === void 0 && (o = {});
    var a = Ut(t),
      l = Kt(a[0]),
      u = Kt(a[1]),
      c = Kt(r),
      d = Gc(i, o.units),
      p = Math.asin(
        Math.sin(u) * Math.cos(d) + Math.cos(u) * Math.sin(d) * Math.cos(c)
      ),
      y =
        l +
        Math.atan2(
          Math.sin(c) * Math.sin(d) * Math.cos(u),
          Math.cos(d) - Math.sin(u) * Math.sin(p)
        ),
      b = sr(y),
      D = sr(p);
    return he([b, D], o.properties);
  }
  function h0(t, i, r) {
    r === void 0 && (r = {});
    var o = he([1 / 0, 1 / 0], { dist: 1 / 0 }),
      a = 0;
    return (
      Ci(t, function (l) {
        for (var u = jt(l), c = 0; c < u.length - 1; c++) {
          var d = he(u[c]);
          d.properties.dist = Ee(i, d, r);
          var p = he(u[c + 1]);
          p.properties.dist = Ee(i, p, r);
          var y = Ee(d, p, r),
            b = Math.max(d.properties.dist, p.properties.dist),
            D = Xr(d, p),
            O = Jr(i, b, D + 90, r),
            q = Jr(i, b, D - 90, r),
            $ = Qt(
              Pe([O.geometry.coordinates, q.geometry.coordinates]),
              Pe([d.geometry.coordinates, p.geometry.coordinates])
            ),
            w = null;
          $.features.length > 0 &&
            ((w = $.features[0]),
            (w.properties.dist = Ee(i, w, r)),
            (w.properties.location = a + Ee(d, w, r))),
            d.properties.dist < o.properties.dist &&
              ((o = d), (o.properties.index = c), (o.properties.location = a)),
            p.properties.dist < o.properties.dist &&
              ((o = p),
              (o.properties.index = c + 1),
              (o.properties.location = a + y)),
            w &&
              w.properties.dist < o.properties.dist &&
              ((o = w), (o.properties.index = c)),
            (a += y);
        }
      }),
      o
    );
  }
  var af = h0;
  function u0(t, i) {
    if (!t) throw new Error('line is required');
    if (!i) throw new Error('splitter is required');
    var r = _o(t),
      o = _o(i);
    if (r !== 'LineString') throw new Error('line must be LineString');
    if (o === 'FeatureCollection')
      throw new Error('splitter cannot be a FeatureCollection');
    if (o === 'GeometryCollection')
      throw new Error('splitter cannot be a GeometryCollection');
    var a = sf(i, { precision: 7 });
    switch (o) {
      case 'Point':
        return Do(t, a);
      case 'MultiPoint':
        return lf(t, a);
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        return lf(t, Qt(t, a));
    }
  }
  function lf(t, i) {
    var r = [],
      o = (0, Oo.default)();
    return (
      Ci(i, function (a) {
        if (
          (r.forEach(function (c, d) {
            c.id = d;
          }),
          !r.length)
        )
          (r = Do(t, a).features),
            r.forEach(function (c) {
              c.bbox || (c.bbox = of(ti(c)));
            }),
            o.load(ue(r));
        else {
          var l = o.search(a);
          if (l.features.length) {
            var u = hf(a, l);
            (r = r.filter(function (c) {
              return c.id !== u.id;
            })),
              o.remove(u),
              Qe(Do(u, a), function (c) {
                r.push(c), o.insert(c);
              });
          }
        }
      }),
      ue(r)
    );
  }
  function Do(t, i) {
    var r = [],
      o = jt(t)[0],
      a = jt(t)[t.geometry.coordinates.length - 1];
    if (Ao(o, Ut(i)) || Ao(a, Ut(i))) return ue([t]);
    var l = (0, Oo.default)(),
      u = lr(t);
    l.load(u);
    var c = l.search(i);
    if (!c.features.length) return ue([t]);
    var d = hf(i, c),
      p = [o],
      y = Fc(
        u,
        function (b, D, O) {
          var q = jt(D)[1],
            $ = Ut(i);
          return O === d.id
            ? (b.push($), r.push(Pe(b)), Ao($, q) ? [$] : [$, q])
            : (b.push(q), b);
        },
        p
      );
    return y.length > 1 && r.push(Pe(y)), ue(r);
  }
  function hf(t, i) {
    if (!i.features.length) throw new Error('lines must contain features');
    if (i.features.length === 1) return i.features[0];
    var r,
      o = 1 / 0;
    return (
      Qe(i, function (a) {
        var l = af(a, t),
          u = l.properties.dist;
        u < o && ((r = a), (o = u));
      }),
      r
    );
  }
  function Ao(t, i) {
    return t[0] === i[0] && t[1] === i[1];
  }
  var uf = u0;
  function Ei(t, i, r) {
    if ((r === void 0 && (r = {}), !t)) throw new Error('point is required');
    if (!i) throw new Error('polygon is required');
    var o = Ut(t),
      a = Mi(i),
      l = a.type,
      u = i.bbox,
      c = a.coordinates;
    if (u && c0(o, u) === !1) return !1;
    l === 'Polygon' && (c = [c]);
    for (var d = !1, p = 0; p < c.length && !d; p++)
      if (cf(o, c[p][0], r.ignoreBoundary)) {
        for (var y = !1, b = 1; b < c[p].length && !y; )
          cf(o, c[p][b], !r.ignoreBoundary) && (y = !0), b++;
        y || (d = !0);
      }
    return d;
  }
  function cf(t, i, r) {
    var o = !1;
    i[0][0] === i[i.length - 1][0] &&
      i[0][1] === i[i.length - 1][1] &&
      (i = i.slice(0, i.length - 1));
    for (var a = 0, l = i.length - 1; a < i.length; l = a++) {
      var u = i[a][0],
        c = i[a][1],
        d = i[l][0],
        p = i[l][1],
        y =
          t[1] * (u - d) + c * (d - t[0]) + p * (t[0] - u) === 0 &&
          (u - t[0]) * (d - t[0]) <= 0 &&
          (c - t[1]) * (p - t[1]) <= 0;
      if (y) return !r;
      var b =
        c > t[1] != p > t[1] && t[0] < ((d - u) * (t[1] - c)) / (p - c) + u;
      b && (o = !o);
    }
    return o;
  }
  function c0(t, i) {
    return i[0] <= t[0] && i[1] <= t[1] && i[2] >= t[0] && i[3] >= t[1];
  }
  function f0(t, i, r) {
    r === void 0 && (r = {});
    for (var o = Ut(t), a = jt(i), l = 0; l < a.length - 1; l++) {
      var u = !1;
      if (
        (r.ignoreEndVertices &&
          (l === 0 && (u = 'start'),
          l === a.length - 2 && (u = 'end'),
          l === 0 && l + 1 === a.length - 1 && (u = 'both')),
        d0(a[l], a[l + 1], o, u, typeof r.epsilon > 'u' ? null : r.epsilon))
      )
        return !0;
    }
    return !1;
  }
  function d0(t, i, r, o, a) {
    var l = r[0],
      u = r[1],
      c = t[0],
      d = t[1],
      p = i[0],
      y = i[1],
      b = r[0] - c,
      D = r[1] - d,
      O = p - c,
      q = y - d,
      $ = b * q - D * O;
    if (a !== null) {
      if (Math.abs($) > a) return !1;
    } else if ($ !== 0) return !1;
    if (o) {
      if (o === 'start')
        return Math.abs(O) >= Math.abs(q)
          ? O > 0
            ? c < l && l <= p
            : p <= l && l < c
          : q > 0
            ? d < u && u <= y
            : y <= u && u < d;
      if (o === 'end')
        return Math.abs(O) >= Math.abs(q)
          ? O > 0
            ? c <= l && l < p
            : p < l && l <= c
          : q > 0
            ? d <= u && u < y
            : y < u && u <= d;
      if (o === 'both')
        return Math.abs(O) >= Math.abs(q)
          ? O > 0
            ? c < l && l < p
            : p < l && l < c
          : q > 0
            ? d < u && u < y
            : y < u && u < d;
    } else
      return Math.abs(O) >= Math.abs(q)
        ? O > 0
          ? c <= l && l <= p
          : p <= l && l <= c
        : q > 0
          ? d <= u && u <= y
          : y <= u && u <= d;
    return !1;
  }
  var Si = f0;
  function Ro(t, i) {
    var r = Mi(t),
      o = Mi(i),
      a = r.type,
      l = o.type,
      u = r.coordinates,
      c = o.coordinates;
    switch (a) {
      case 'Point':
        switch (l) {
          case 'Point':
            return Io(u, c);
          default:
            throw new Error('feature2 ' + l + ' geometry not supported');
        }
      case 'MultiPoint':
        switch (l) {
          case 'Point':
            return p0(r, o);
          case 'MultiPoint':
            return m0(r, o);
          default:
            throw new Error('feature2 ' + l + ' geometry not supported');
        }
      case 'LineString':
        switch (l) {
          case 'Point':
            return Si(o, r, { ignoreEndVertices: !0 });
          case 'LineString':
            return y0(r, o);
          case 'MultiPoint':
            return g0(r, o);
          default:
            throw new Error('feature2 ' + l + ' geometry not supported');
        }
      case 'Polygon':
        switch (l) {
          case 'Point':
            return Ei(o, r, { ignoreBoundary: !0 });
          case 'LineString':
            return v0(r, o);
          case 'Polygon':
            return L0(r, o);
          case 'MultiPoint':
            return _0(r, o);
          default:
            throw new Error('feature2 ' + l + ' geometry not supported');
        }
      default:
        throw new Error('feature1 ' + a + ' geometry not supported');
    }
  }
  function p0(t, i) {
    var r,
      o = !1;
    for (r = 0; r < t.coordinates.length; r++)
      if (Io(t.coordinates[r], i.coordinates)) {
        o = !0;
        break;
      }
    return o;
  }
  function m0(t, i) {
    for (var r = 0, o = i.coordinates; r < o.length; r++) {
      for (var a = o[r], l = !1, u = 0, c = t.coordinates; u < c.length; u++) {
        var d = c[u];
        if (Io(a, d)) {
          l = !0;
          break;
        }
      }
      if (!l) return !1;
    }
    return !0;
  }
  function g0(t, i) {
    for (var r = !1, o = 0, a = i.coordinates; o < a.length; o++) {
      var l = a[o];
      if ((Si(l, t, { ignoreEndVertices: !0 }) && (r = !0), !Si(l, t)))
        return !1;
    }
    return !!r;
  }
  function _0(t, i) {
    for (var r = 0, o = i.coordinates; r < o.length; r++) {
      var a = o[r];
      if (!Ei(a, t, { ignoreBoundary: !0 })) return !1;
    }
    return !0;
  }
  function y0(t, i) {
    for (var r = !1, o = 0, a = i.coordinates; o < a.length; o++) {
      var l = a[o];
      if (
        (Si({ type: 'Point', coordinates: l }, t, { ignoreEndVertices: !0 }) &&
          (r = !0),
        !Si({ type: 'Point', coordinates: l }, t, { ignoreEndVertices: !1 }))
      )
        return !1;
    }
    return r;
  }
  function v0(t, i) {
    var r = !1,
      o = 0,
      a = ti(t),
      l = ti(i);
    if (!ff(a, l)) return !1;
    for (o; o < i.coordinates.length - 1; o++) {
      var u = b0(i.coordinates[o], i.coordinates[o + 1]);
      if (Ei({ type: 'Point', coordinates: u }, t, { ignoreBoundary: !0 })) {
        r = !0;
        break;
      }
    }
    return r;
  }
  function L0(t, i) {
    if (
      (t.type === 'Feature' && t.geometry === null) ||
      (i.type === 'Feature' && i.geometry === null)
    )
      return !1;
    var r = ti(t),
      o = ti(i);
    if (!ff(r, o)) return !1;
    for (var a = Mi(i).coordinates, l = 0, u = a; l < u.length; l++)
      for (var c = u[l], d = 0, p = c; d < p.length; d++) {
        var y = p[d];
        if (!Ei(y, t)) return !1;
      }
    return !0;
  }
  function ff(t, i) {
    return !(t[0] > i[0] || t[2] < i[2] || t[1] > i[1] || t[3] < i[3]);
  }
  function Io(t, i) {
    return t[0] === i[0] && t[1] === i[1];
  }
  function b0(t, i) {
    return [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2];
  }
  var Of = le(er());
  var Qr = (t) => () => t;
  var ur = (t) => {
    let i = t ? (r, o) => o.minus(r).abs().isLessThanOrEqualTo(t) : Qr(!1);
    return (r, o) => (i(r, o) ? 0 : r.comparedTo(o));
  };
  function df(t) {
    let i = t
      ? (r, o, a, l, u) =>
          r
            .exponentiatedBy(2)
            .isLessThanOrEqualTo(
              l
                .minus(o)
                .exponentiatedBy(2)
                .plus(u.minus(a).exponentiatedBy(2))
                .times(t)
            )
      : Qr(!1);
    return (r, o, a) => {
      let l = r.x,
        u = r.y,
        c = a.x,
        d = a.y,
        p = u
          .minus(d)
          .times(o.x.minus(c))
          .minus(l.minus(c).times(o.y.minus(d)));
      return i(p, l, u, c, d) ? 0 : p.comparedTo(0);
    };
  }
  var w0 = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    zo = Math.ceil,
    ee = Math.floor,
    Wt = '[BigNumber Error] ',
    pf = Wt + 'Number primitive has more than 15 significant digits: ',
    ce = 1e14,
    ct = 14,
    No = 9007199254740991,
    Go = [
      1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
    ],
    Ze = 1e7,
    zt = 1e9;
  function mf(t) {
    var i,
      r,
      o,
      a = (M.prototype = { constructor: M, toString: null, valueOf: null }),
      l = new M(1),
      u = 20,
      c = 4,
      d = -7,
      p = 21,
      y = -1e7,
      b = 1e7,
      D = !1,
      O = 1,
      q = 0,
      $ = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',
        suffix: '',
      },
      w = '0123456789abcdefghijklmnopqrstuvwxyz',
      B = !0;
    function M(g, _) {
      var v,
        T,
        P,
        R,
        I,
        S,
        k,
        N,
        E = this;
      if (!(E instanceof M)) return new M(g, _);
      if (_ == null) {
        if (g && g._isBigNumber === !0) {
          (E.s = g.s),
            !g.c || g.e > b
              ? (E.c = E.e = null)
              : g.e < y
                ? (E.c = [(E.e = 0)])
                : ((E.e = g.e), (E.c = g.c.slice()));
          return;
        }
        if ((S = typeof g == 'number') && g * 0 == 0) {
          if (((E.s = 1 / g < 0 ? ((g = -g), -1) : 1), g === ~~g)) {
            for (R = 0, I = g; I >= 10; I /= 10, R++);
            R > b ? (E.c = E.e = null) : ((E.e = R), (E.c = [g]));
            return;
          }
          N = String(g);
        } else {
          if (!w0.test((N = String(g)))) return o(E, N, S);
          E.s = N.charCodeAt(0) == 45 ? ((N = N.slice(1)), -1) : 1;
        }
        (R = N.indexOf('.')) > -1 && (N = N.replace('.', '')),
          (I = N.search(/e/i)) > 0
            ? (R < 0 && (R = I),
              (R += +N.slice(I + 1)),
              (N = N.substring(0, I)))
            : R < 0 && (R = N.length);
      } else {
        if ((Pt(_, 2, w.length, 'Base'), _ == 10 && B))
          return (E = new M(g)), V(E, u + E.e + 1, c);
        if (((N = String(g)), (S = typeof g == 'number'))) {
          if (g * 0 != 0) return o(E, N, S, _);
          if (
            ((E.s = 1 / g < 0 ? ((N = N.slice(1)), -1) : 1),
            M.DEBUG && N.replace(/^0\.0*|\./, '').length > 15)
          )
            throw Error(pf + g);
        } else E.s = N.charCodeAt(0) === 45 ? ((N = N.slice(1)), -1) : 1;
        for (v = w.slice(0, _), R = I = 0, k = N.length; I < k; I++)
          if (v.indexOf((T = N.charAt(I))) < 0) {
            if (T == '.') {
              if (I > R) {
                R = k;
                continue;
              }
            } else if (
              !P &&
              ((N == N.toUpperCase() && (N = N.toLowerCase())) ||
                (N == N.toLowerCase() && (N = N.toUpperCase())))
            ) {
              (P = !0), (I = -1), (R = 0);
              continue;
            }
            return o(E, String(g), S, _);
          }
        (S = !1),
          (N = r(N, _, 10, E.s)),
          (R = N.indexOf('.')) > -1 ? (N = N.replace('.', '')) : (R = N.length);
      }
      for (I = 0; N.charCodeAt(I) === 48; I++);
      for (k = N.length; N.charCodeAt(--k) === 48; );
      if ((N = N.slice(I, ++k))) {
        if (((k -= I), S && M.DEBUG && k > 15 && (g > No || g !== ee(g))))
          throw Error(pf + E.s * g);
        if ((R = R - I - 1) > b) E.c = E.e = null;
        else if (R < y) E.c = [(E.e = 0)];
        else {
          if (
            ((E.e = R),
            (E.c = []),
            (I = (R + 1) % ct),
            R < 0 && (I += ct),
            I < k)
          ) {
            for (I && E.c.push(+N.slice(0, I)), k -= ct; I < k; )
              E.c.push(+N.slice(I, (I += ct)));
            I = ct - (N = N.slice(I)).length;
          } else I -= k;
          for (; I--; N += '0');
          E.c.push(+N);
        }
      } else E.c = [(E.e = 0)];
    }
    (M.clone = mf),
      (M.ROUND_UP = 0),
      (M.ROUND_DOWN = 1),
      (M.ROUND_CEIL = 2),
      (M.ROUND_FLOOR = 3),
      (M.ROUND_HALF_UP = 4),
      (M.ROUND_HALF_DOWN = 5),
      (M.ROUND_HALF_EVEN = 6),
      (M.ROUND_HALF_CEIL = 7),
      (M.ROUND_HALF_FLOOR = 8),
      (M.EUCLID = 9),
      (M.config = M.set =
        function (g) {
          var _, v;
          if (g != null)
            if (typeof g == 'object') {
              if (
                (g.hasOwnProperty((_ = 'DECIMAL_PLACES')) &&
                  ((v = g[_]), Pt(v, 0, zt, _), (u = v)),
                g.hasOwnProperty((_ = 'ROUNDING_MODE')) &&
                  ((v = g[_]), Pt(v, 0, 8, _), (c = v)),
                g.hasOwnProperty((_ = 'EXPONENTIAL_AT')) &&
                  ((v = g[_]),
                  v && v.pop
                    ? (Pt(v[0], -zt, 0, _),
                      Pt(v[1], 0, zt, _),
                      (d = v[0]),
                      (p = v[1]))
                    : (Pt(v, -zt, zt, _), (d = -(p = v < 0 ? -v : v)))),
                g.hasOwnProperty((_ = 'RANGE')))
              )
                if (((v = g[_]), v && v.pop))
                  Pt(v[0], -zt, -1, _),
                    Pt(v[1], 1, zt, _),
                    (y = v[0]),
                    (b = v[1]);
                else if ((Pt(v, -zt, zt, _), v)) y = -(b = v < 0 ? -v : v);
                else throw Error(Wt + _ + ' cannot be zero: ' + v);
              if (g.hasOwnProperty((_ = 'CRYPTO')))
                if (((v = g[_]), v === !!v))
                  if (v)
                    if (
                      typeof crypto < 'u' &&
                      crypto &&
                      (crypto.getRandomValues || crypto.randomBytes)
                    )
                      D = v;
                    else throw ((D = !v), Error(Wt + 'crypto unavailable'));
                  else D = v;
                else throw Error(Wt + _ + ' not true or false: ' + v);
              if (
                (g.hasOwnProperty((_ = 'MODULO_MODE')) &&
                  ((v = g[_]), Pt(v, 0, 9, _), (O = v)),
                g.hasOwnProperty((_ = 'POW_PRECISION')) &&
                  ((v = g[_]), Pt(v, 0, zt, _), (q = v)),
                g.hasOwnProperty((_ = 'FORMAT')))
              )
                if (((v = g[_]), typeof v == 'object')) $ = v;
                else throw Error(Wt + _ + ' not an object: ' + v);
              if (g.hasOwnProperty((_ = 'ALPHABET')))
                if (
                  ((v = g[_]),
                  typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v))
                )
                  (B = v.slice(0, 10) == '0123456789'), (w = v);
                else throw Error(Wt + _ + ' invalid: ' + v);
            } else throw Error(Wt + 'Object expected: ' + g);
          return {
            DECIMAL_PLACES: u,
            ROUNDING_MODE: c,
            EXPONENTIAL_AT: [d, p],
            RANGE: [y, b],
            CRYPTO: D,
            MODULO_MODE: O,
            POW_PRECISION: q,
            FORMAT: $,
            ALPHABET: w,
          };
        }),
      (M.isBigNumber = function (g) {
        if (!g || g._isBigNumber !== !0) return !1;
        if (!M.DEBUG) return !0;
        var _,
          v,
          T = g.c,
          P = g.e,
          R = g.s;
        t: if ({}.toString.call(T) == '[object Array]') {
          if ((R === 1 || R === -1) && P >= -zt && P <= zt && P === ee(P)) {
            if (T[0] === 0) {
              if (P === 0 && T.length === 1) return !0;
              break t;
            }
            if (
              ((_ = (P + 1) % ct), _ < 1 && (_ += ct), String(T[0]).length == _)
            ) {
              for (_ = 0; _ < T.length; _++)
                if (((v = T[_]), v < 0 || v >= ce || v !== ee(v))) break t;
              if (v !== 0) return !0;
            }
          }
        } else if (
          T === null &&
          P === null &&
          (R === null || R === 1 || R === -1)
        )
          return !0;
        throw Error(Wt + 'Invalid BigNumber: ' + g);
      }),
      (M.maximum = M.max =
        function () {
          return W(arguments, -1);
        }),
      (M.minimum = M.min =
        function () {
          return W(arguments, 1);
        }),
      (M.random = (function () {
        var g = 9007199254740992,
          _ =
            (Math.random() * g) & 2097151
              ? function () {
                  return ee(Math.random() * g);
                }
              : function () {
                  return (
                    ((Math.random() * 1073741824) | 0) * 8388608 +
                    ((Math.random() * 8388608) | 0)
                  );
                };
        return function (v) {
          var T,
            P,
            R,
            I,
            S,
            k = 0,
            N = [],
            E = new M(l);
          if ((v == null ? (v = u) : Pt(v, 0, zt), (I = zo(v / ct)), D))
            if (crypto.getRandomValues) {
              for (
                T = crypto.getRandomValues(new Uint32Array((I *= 2)));
                k < I;

              )
                (S = T[k] * 131072 + (T[k + 1] >>> 11)),
                  S >= 9e15
                    ? ((P = crypto.getRandomValues(new Uint32Array(2))),
                      (T[k] = P[0]),
                      (T[k + 1] = P[1]))
                    : (N.push(S % 1e14), (k += 2));
              k = I / 2;
            } else if (crypto.randomBytes) {
              for (T = crypto.randomBytes((I *= 7)); k < I; )
                (S =
                  (T[k] & 31) * 281474976710656 +
                  T[k + 1] * 1099511627776 +
                  T[k + 2] * 4294967296 +
                  T[k + 3] * 16777216 +
                  (T[k + 4] << 16) +
                  (T[k + 5] << 8) +
                  T[k + 6]),
                  S >= 9e15
                    ? crypto.randomBytes(7).copy(T, k)
                    : (N.push(S % 1e14), (k += 7));
              k = I / 7;
            } else throw ((D = !1), Error(Wt + 'crypto unavailable'));
          if (!D) for (; k < I; ) (S = _()), S < 9e15 && (N[k++] = S % 1e14);
          for (
            I = N[--k],
              v %= ct,
              I && v && ((S = Go[ct - v]), (N[k] = ee(I / S) * S));
            N[k] === 0;
            N.pop(), k--
          );
          if (k < 0) N = [(R = 0)];
          else {
            for (R = -1; N[0] === 0; N.splice(0, 1), R -= ct);
            for (k = 1, S = N[0]; S >= 10; S /= 10, k++);
            k < ct && (R -= ct - k);
          }
          return (E.e = R), (E.c = N), E;
        };
      })()),
      (M.sum = function () {
        for (var g = 1, _ = arguments, v = new M(_[0]); g < _.length; )
          v = v.plus(_[g++]);
        return v;
      }),
      (r = (function () {
        var g = '0123456789';
        function _(v, T, P, R) {
          for (var I, S = [0], k, N = 0, E = v.length; N < E; ) {
            for (k = S.length; k--; S[k] *= T);
            for (S[0] += R.indexOf(v.charAt(N++)), I = 0; I < S.length; I++)
              S[I] > P - 1 &&
                (S[I + 1] == null && (S[I + 1] = 0),
                (S[I + 1] += (S[I] / P) | 0),
                (S[I] %= P));
          }
          return S.reverse();
        }
        return function (v, T, P, R, I) {
          var S,
            k,
            N,
            E,
            F,
            X,
            J,
            it,
            et = v.indexOf('.'),
            ot = u,
            lt = c;
          for (
            et >= 0 &&
              ((E = q),
              (q = 0),
              (v = v.replace('.', '')),
              (it = new M(T)),
              (X = it.pow(v.length - et)),
              (q = E),
              (it.c = _(Se(te(X.c), X.e, '0'), 10, P, g)),
              (it.e = it.c.length)),
              J = _(v, T, P, I ? ((S = w), g) : ((S = g), w)),
              N = E = J.length;
            J[--E] == 0;
            J.pop()
          );
          if (!J[0]) return S.charAt(0);
          if (
            (et < 0
              ? --N
              : ((X.c = J),
                (X.e = N),
                (X.s = R),
                (X = i(X, it, ot, lt, P)),
                (J = X.c),
                (F = X.r),
                (N = X.e)),
            (k = N + ot + 1),
            (et = J[k]),
            (E = P / 2),
            (F = F || k < 0 || J[k + 1] != null),
            (F =
              lt < 4
                ? (et != null || F) && (lt == 0 || lt == (X.s < 0 ? 3 : 2))
                : et > E ||
                  (et == E &&
                    (lt == 4 ||
                      F ||
                      (lt == 6 && J[k - 1] & 1) ||
                      lt == (X.s < 0 ? 8 : 7)))),
            k < 1 || !J[0])
          )
            v = F ? Se(S.charAt(1), -ot, S.charAt(0)) : S.charAt(0);
          else {
            if (((J.length = k), F))
              for (--P; ++J[--k] > P; )
                (J[k] = 0), k || (++N, (J = [1].concat(J)));
            for (E = J.length; !J[--E]; );
            for (et = 0, v = ''; et <= E; v += S.charAt(J[et++]));
            v = Se(v, N, S.charAt(0));
          }
          return v;
        };
      })()),
      (i = (function () {
        function g(T, P, R) {
          var I,
            S,
            k,
            N,
            E = 0,
            F = T.length,
            X = P % Ze,
            J = (P / Ze) | 0;
          for (T = T.slice(); F--; )
            (k = T[F] % Ze),
              (N = (T[F] / Ze) | 0),
              (I = J * k + N * X),
              (S = X * k + (I % Ze) * Ze + E),
              (E = ((S / R) | 0) + ((I / Ze) | 0) + J * N),
              (T[F] = S % R);
          return E && (T = [E].concat(T)), T;
        }
        function _(T, P, R, I) {
          var S, k;
          if (R != I) k = R > I ? 1 : -1;
          else
            for (S = k = 0; S < R; S++)
              if (T[S] != P[S]) {
                k = T[S] > P[S] ? 1 : -1;
                break;
              }
          return k;
        }
        function v(T, P, R, I) {
          for (var S = 0; R--; )
            (T[R] -= S),
              (S = T[R] < P[R] ? 1 : 0),
              (T[R] = S * I + T[R] - P[R]);
          for (; !T[0] && T.length > 1; T.splice(0, 1));
        }
        return function (T, P, R, I, S) {
          var k,
            N,
            E,
            F,
            X,
            J,
            it,
            et,
            ot,
            lt,
            ut,
            Et,
            ne,
            we,
            Nt,
            qt,
            fe,
            Tt = T.s == P.s ? 1 : -1,
            Bt = T.c,
            bt = P.c;
          if (!Bt || !Bt[0] || !bt || !bt[0])
            return new M(
              !T.s || !P.s || (Bt ? bt && Bt[0] == bt[0] : !bt)
                ? NaN
                : (Bt && Bt[0] == 0) || !bt
                  ? Tt * 0
                  : Tt / 0
            );
          for (
            et = new M(Tt),
              ot = et.c = [],
              N = T.e - P.e,
              Tt = R + N + 1,
              S ||
                ((S = ce),
                (N = ie(T.e / ct) - ie(P.e / ct)),
                (Tt = (Tt / ct) | 0)),
              E = 0;
            bt[E] == (Bt[E] || 0);
            E++
          );
          if ((bt[E] > (Bt[E] || 0) && N--, Tt < 0)) ot.push(1), (F = !0);
          else {
            for (
              we = Bt.length,
                qt = bt.length,
                E = 0,
                Tt += 2,
                X = ee(S / (bt[0] + 1)),
                X > 1 &&
                  ((bt = g(bt, X, S)),
                  (Bt = g(Bt, X, S)),
                  (qt = bt.length),
                  (we = Bt.length)),
                ne = qt,
                lt = Bt.slice(0, qt),
                ut = lt.length;
              ut < qt;
              lt[ut++] = 0
            );
            (fe = bt.slice()),
              (fe = [0].concat(fe)),
              (Nt = bt[0]),
              bt[1] >= S / 2 && Nt++;
            do {
              if (((X = 0), (k = _(bt, lt, qt, ut)), k < 0)) {
                if (
                  ((Et = lt[0]),
                  qt != ut && (Et = Et * S + (lt[1] || 0)),
                  (X = ee(Et / Nt)),
                  X > 1)
                )
                  for (
                    X >= S && (X = S - 1),
                      J = g(bt, X, S),
                      it = J.length,
                      ut = lt.length;
                    _(J, lt, it, ut) == 1;

                  )
                    X--,
                      v(J, qt < it ? fe : bt, it, S),
                      (it = J.length),
                      (k = 1);
                else X == 0 && (k = X = 1), (J = bt.slice()), (it = J.length);
                if (
                  (it < ut && (J = [0].concat(J)),
                  v(lt, J, ut, S),
                  (ut = lt.length),
                  k == -1)
                )
                  for (; _(bt, lt, qt, ut) < 1; )
                    X++, v(lt, qt < ut ? fe : bt, ut, S), (ut = lt.length);
              } else k === 0 && (X++, (lt = [0]));
              (ot[E++] = X),
                lt[0] ? (lt[ut++] = Bt[ne] || 0) : ((lt = [Bt[ne]]), (ut = 1));
            } while ((ne++ < we || lt[0] != null) && Tt--);
            (F = lt[0] != null), ot[0] || ot.splice(0, 1);
          }
          if (S == ce) {
            for (E = 1, Tt = ot[0]; Tt >= 10; Tt /= 10, E++);
            V(et, R + (et.e = E + N * ct - 1) + 1, I, F);
          } else (et.e = N), (et.r = +F);
          return et;
        };
      })());
    function K(g, _, v, T) {
      var P, R, I, S, k;
      if ((v == null ? (v = c) : Pt(v, 0, 8), !g.c)) return g.toString();
      if (((P = g.c[0]), (I = g.e), _ == null))
        (k = te(g.c)),
          (k =
            T == 1 || (T == 2 && (I <= d || I >= p))
              ? en(k, I)
              : Se(k, I, '0'));
      else if (
        ((g = V(new M(g), _, v)),
        (R = g.e),
        (k = te(g.c)),
        (S = k.length),
        T == 1 || (T == 2 && (_ <= R || R <= d)))
      ) {
        for (; S < _; k += '0', S++);
        k = en(k, R);
      } else if (((_ -= I), (k = Se(k, R, '0')), R + 1 > S)) {
        if (--_ > 0) for (k += '.'; _--; k += '0');
      } else if (((_ += R - S), _ > 0))
        for (R + 1 == S && (k += '.'); _--; k += '0');
      return g.s < 0 && P ? '-' + k : k;
    }
    function W(g, _) {
      for (var v, T, P = 1, R = new M(g[0]); P < g.length; P++)
        (T = new M(g[P])),
          (!T.s || (v = ei(R, T)) === _ || (v === 0 && R.s === _)) && (R = T);
      return R;
    }
    function Y(g, _, v) {
      for (var T = 1, P = _.length; !_[--P]; _.pop());
      for (P = _[0]; P >= 10; P /= 10, T++);
      return (
        (v = T + v * ct - 1) > b
          ? (g.c = g.e = null)
          : v < y
            ? (g.c = [(g.e = 0)])
            : ((g.e = v), (g.c = _)),
        g
      );
    }
    o = (function () {
      var g = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        _ = /^([^.]+)\.$/,
        v = /^\.([^.]+)$/,
        T = /^-?(Infinity|NaN)$/,
        P = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
      return function (R, I, S, k) {
        var N,
          E = S ? I : I.replace(P, '');
        if (T.test(E)) R.s = isNaN(E) ? null : E < 0 ? -1 : 1;
        else {
          if (
            !S &&
            ((E = E.replace(g, function (F, X, J) {
              return (
                (N = (J = J.toLowerCase()) == 'x' ? 16 : J == 'b' ? 2 : 8),
                !k || k == N ? X : F
              );
            })),
            k && ((N = k), (E = E.replace(_, '$1').replace(v, '0.$1'))),
            I != E)
          )
            return new M(E, N);
          if (M.DEBUG)
            throw Error(
              Wt + 'Not a' + (k ? ' base ' + k : '') + ' number: ' + I
            );
          R.s = null;
        }
        R.c = R.e = null;
      };
    })();
    function V(g, _, v, T) {
      var P,
        R,
        I,
        S,
        k,
        N,
        E,
        F = g.c,
        X = Go;
      if (F) {
        t: {
          for (P = 1, S = F[0]; S >= 10; S /= 10, P++);
          if (((R = _ - P), R < 0))
            (R += ct),
              (I = _),
              (k = F[(N = 0)]),
              (E = ee((k / X[P - I - 1]) % 10));
          else if (((N = zo((R + 1) / ct)), N >= F.length))
            if (T) {
              for (; F.length <= N; F.push(0));
              (k = E = 0), (P = 1), (R %= ct), (I = R - ct + 1);
            } else break t;
          else {
            for (k = S = F[N], P = 1; S >= 10; S /= 10, P++);
            (R %= ct),
              (I = R - ct + P),
              (E = I < 0 ? 0 : ee((k / X[P - I - 1]) % 10));
          }
          if (
            ((T =
              T || _ < 0 || F[N + 1] != null || (I < 0 ? k : k % X[P - I - 1])),
            (T =
              v < 4
                ? (E || T) && (v == 0 || v == (g.s < 0 ? 3 : 2))
                : E > 5 ||
                  (E == 5 &&
                    (v == 4 ||
                      T ||
                      (v == 6 &&
                        (R > 0 ? (I > 0 ? k / X[P - I] : 0) : F[N - 1]) % 10 &
                          1) ||
                      v == (g.s < 0 ? 8 : 7)))),
            _ < 1 || !F[0])
          )
            return (
              (F.length = 0),
              T
                ? ((_ -= g.e + 1),
                  (F[0] = X[(ct - (_ % ct)) % ct]),
                  (g.e = -_ || 0))
                : (F[0] = g.e = 0),
              g
            );
          if (
            (R == 0
              ? ((F.length = N), (S = 1), N--)
              : ((F.length = N + 1),
                (S = X[ct - R]),
                (F[N] = I > 0 ? ee((k / X[P - I]) % X[I]) * S : 0)),
            T)
          )
            for (;;)
              if (N == 0) {
                for (R = 1, I = F[0]; I >= 10; I /= 10, R++);
                for (I = F[0] += S, S = 1; I >= 10; I /= 10, S++);
                R != S && (g.e++, F[0] == ce && (F[0] = 1));
                break;
              } else {
                if (((F[N] += S), F[N] != ce)) break;
                (F[N--] = 0), (S = 1);
              }
          for (R = F.length; F[--R] === 0; F.pop());
        }
        g.e > b ? (g.c = g.e = null) : g.e < y && (g.c = [(g.e = 0)]);
      }
      return g;
    }
    function A(g) {
      var _,
        v = g.e;
      return v === null
        ? g.toString()
        : ((_ = te(g.c)),
          (_ = v <= d || v >= p ? en(_, v) : Se(_, v, '0')),
          g.s < 0 ? '-' + _ : _);
    }
    return (
      (a.absoluteValue = a.abs =
        function () {
          var g = new M(this);
          return g.s < 0 && (g.s = 1), g;
        }),
      (a.comparedTo = function (g, _) {
        return ei(this, new M(g, _));
      }),
      (a.decimalPlaces = a.dp =
        function (g, _) {
          var v,
            T,
            P,
            R = this;
          if (g != null)
            return (
              Pt(g, 0, zt),
              _ == null ? (_ = c) : Pt(_, 0, 8),
              V(new M(R), g + R.e + 1, _)
            );
          if (!(v = R.c)) return null;
          if (((T = ((P = v.length - 1) - ie(this.e / ct)) * ct), (P = v[P])))
            for (; P % 10 == 0; P /= 10, T--);
          return T < 0 && (T = 0), T;
        }),
      (a.dividedBy = a.div =
        function (g, _) {
          return i(this, new M(g, _), u, c);
        }),
      (a.dividedToIntegerBy = a.idiv =
        function (g, _) {
          return i(this, new M(g, _), 0, 1);
        }),
      (a.exponentiatedBy = a.pow =
        function (g, _) {
          var v,
            T,
            P,
            R,
            I,
            S,
            k,
            N,
            E,
            F = this;
          if (((g = new M(g)), g.c && !g.isInteger()))
            throw Error(Wt + 'Exponent not an integer: ' + A(g));
          if (
            (_ != null && (_ = new M(_)),
            (S = g.e > 14),
            !F.c ||
              !F.c[0] ||
              (F.c[0] == 1 && !F.e && F.c.length == 1) ||
              !g.c ||
              !g.c[0])
          )
            return (
              (E = new M(Math.pow(+A(F), S ? g.s * (2 - tn(g)) : +A(g)))),
              _ ? E.mod(_) : E
            );
          if (((k = g.s < 0), _)) {
            if (_.c ? !_.c[0] : !_.s) return new M(NaN);
            (T = !k && F.isInteger() && _.isInteger()), T && (F = F.mod(_));
          } else {
            if (
              g.e > 9 &&
              (F.e > 0 ||
                F.e < -1 ||
                (F.e == 0
                  ? F.c[0] > 1 || (S && F.c[1] >= 24e7)
                  : F.c[0] < 8e13 || (S && F.c[0] <= 9999975e7)))
            )
              return (
                (R = F.s < 0 && tn(g) ? -0 : 0),
                F.e > -1 && (R = 1 / R),
                new M(k ? 1 / R : R)
              );
            q && (R = zo(q / ct + 2));
          }
          for (
            S
              ? ((v = new M(0.5)), k && (g.s = 1), (N = tn(g)))
              : ((P = Math.abs(+A(g))), (N = P % 2)),
              E = new M(l);
            ;

          ) {
            if (N) {
              if (((E = E.times(F)), !E.c)) break;
              R ? E.c.length > R && (E.c.length = R) : T && (E = E.mod(_));
            }
            if (P) {
              if (((P = ee(P / 2)), P === 0)) break;
              N = P % 2;
            } else if (((g = g.times(v)), V(g, g.e + 1, 1), g.e > 14))
              N = tn(g);
            else {
              if (((P = +A(g)), P === 0)) break;
              N = P % 2;
            }
            (F = F.times(F)),
              R
                ? F.c && F.c.length > R && (F.c.length = R)
                : T && (F = F.mod(_));
          }
          return T
            ? E
            : (k && (E = l.div(E)), _ ? E.mod(_) : R ? V(E, q, c, I) : E);
        }),
      (a.integerValue = function (g) {
        var _ = new M(this);
        return g == null ? (g = c) : Pt(g, 0, 8), V(_, _.e + 1, g);
      }),
      (a.isEqualTo = a.eq =
        function (g, _) {
          return ei(this, new M(g, _)) === 0;
        }),
      (a.isFinite = function () {
        return !!this.c;
      }),
      (a.isGreaterThan = a.gt =
        function (g, _) {
          return ei(this, new M(g, _)) > 0;
        }),
      (a.isGreaterThanOrEqualTo = a.gte =
        function (g, _) {
          return (_ = ei(this, new M(g, _))) === 1 || _ === 0;
        }),
      (a.isInteger = function () {
        return !!this.c && ie(this.e / ct) > this.c.length - 2;
      }),
      (a.isLessThan = a.lt =
        function (g, _) {
          return ei(this, new M(g, _)) < 0;
        }),
      (a.isLessThanOrEqualTo = a.lte =
        function (g, _) {
          return (_ = ei(this, new M(g, _))) === -1 || _ === 0;
        }),
      (a.isNaN = function () {
        return !this.s;
      }),
      (a.isNegative = function () {
        return this.s < 0;
      }),
      (a.isPositive = function () {
        return this.s > 0;
      }),
      (a.isZero = function () {
        return !!this.c && this.c[0] == 0;
      }),
      (a.minus = function (g, _) {
        var v,
          T,
          P,
          R,
          I = this,
          S = I.s;
        if (((g = new M(g, _)), (_ = g.s), !S || !_)) return new M(NaN);
        if (S != _) return (g.s = -_), I.plus(g);
        var k = I.e / ct,
          N = g.e / ct,
          E = I.c,
          F = g.c;
        if (!k || !N) {
          if (!E || !F) return E ? ((g.s = -_), g) : new M(F ? I : NaN);
          if (!E[0] || !F[0])
            return F[0] ? ((g.s = -_), g) : new M(E[0] ? I : c == 3 ? -0 : 0);
        }
        if (((k = ie(k)), (N = ie(N)), (E = E.slice()), (S = k - N))) {
          for (
            (R = S < 0) ? ((S = -S), (P = E)) : ((N = k), (P = F)),
              P.reverse(),
              _ = S;
            _--;
            P.push(0)
          );
          P.reverse();
        } else
          for (
            T = (R = (S = E.length) < (_ = F.length)) ? S : _, S = _ = 0;
            _ < T;
            _++
          )
            if (E[_] != F[_]) {
              R = E[_] < F[_];
              break;
            }
        if (
          (R && ((P = E), (E = F), (F = P), (g.s = -g.s)),
          (_ = (T = F.length) - (v = E.length)),
          _ > 0)
        )
          for (; _--; E[v++] = 0);
        for (_ = ce - 1; T > S; ) {
          if (E[--T] < F[T]) {
            for (v = T; v && !E[--v]; E[v] = _);
            --E[v], (E[T] += ce);
          }
          E[T] -= F[T];
        }
        for (; E[0] == 0; E.splice(0, 1), --N);
        return E[0]
          ? Y(g, E, N)
          : ((g.s = c == 3 ? -1 : 1), (g.c = [(g.e = 0)]), g);
      }),
      (a.modulo = a.mod =
        function (g, _) {
          var v,
            T,
            P = this;
          return (
            (g = new M(g, _)),
            !P.c || !g.s || (g.c && !g.c[0])
              ? new M(NaN)
              : !g.c || (P.c && !P.c[0])
                ? new M(P)
                : (O == 9
                    ? ((T = g.s),
                      (g.s = 1),
                      (v = i(P, g, 0, 3)),
                      (g.s = T),
                      (v.s *= T))
                    : (v = i(P, g, 0, O)),
                  (g = P.minus(v.times(g))),
                  !g.c[0] && O == 1 && (g.s = P.s),
                  g)
          );
        }),
      (a.multipliedBy = a.times =
        function (g, _) {
          var v,
            T,
            P,
            R,
            I,
            S,
            k,
            N,
            E,
            F,
            X,
            J,
            it,
            et,
            ot,
            lt = this,
            ut = lt.c,
            Et = (g = new M(g, _)).c;
          if (!ut || !Et || !ut[0] || !Et[0])
            return (
              !lt.s || !g.s || (ut && !ut[0] && !Et) || (Et && !Et[0] && !ut)
                ? (g.c = g.e = g.s = null)
                : ((g.s *= lt.s),
                  !ut || !Et ? (g.c = g.e = null) : ((g.c = [0]), (g.e = 0))),
              g
            );
          for (
            T = ie(lt.e / ct) + ie(g.e / ct),
              g.s *= lt.s,
              k = ut.length,
              F = Et.length,
              k < F &&
                ((it = ut), (ut = Et), (Et = it), (P = k), (k = F), (F = P)),
              P = k + F,
              it = [];
            P--;
            it.push(0)
          );
          for (et = ce, ot = Ze, P = F; --P >= 0; ) {
            for (
              v = 0, X = Et[P] % ot, J = (Et[P] / ot) | 0, I = k, R = P + I;
              R > P;

            )
              (N = ut[--I] % ot),
                (E = (ut[I] / ot) | 0),
                (S = J * N + E * X),
                (N = X * N + (S % ot) * ot + it[R] + v),
                (v = ((N / et) | 0) + ((S / ot) | 0) + J * E),
                (it[R--] = N % et);
            it[R] = v;
          }
          return v ? ++T : it.splice(0, 1), Y(g, it, T);
        }),
      (a.negated = function () {
        var g = new M(this);
        return (g.s = -g.s || null), g;
      }),
      (a.plus = function (g, _) {
        var v,
          T = this,
          P = T.s;
        if (((g = new M(g, _)), (_ = g.s), !P || !_)) return new M(NaN);
        if (P != _) return (g.s = -_), T.minus(g);
        var R = T.e / ct,
          I = g.e / ct,
          S = T.c,
          k = g.c;
        if (!R || !I) {
          if (!S || !k) return new M(P / 0);
          if (!S[0] || !k[0]) return k[0] ? g : new M(S[0] ? T : P * 0);
        }
        if (((R = ie(R)), (I = ie(I)), (S = S.slice()), (P = R - I))) {
          for (
            P > 0 ? ((I = R), (v = k)) : ((P = -P), (v = S)), v.reverse();
            P--;
            v.push(0)
          );
          v.reverse();
        }
        for (
          P = S.length,
            _ = k.length,
            P - _ < 0 && ((v = k), (k = S), (S = v), (_ = P)),
            P = 0;
          _;

        )
          (P = ((S[--_] = S[_] + k[_] + P) / ce) | 0),
            (S[_] = ce === S[_] ? 0 : S[_] % ce);
        return P && ((S = [P].concat(S)), ++I), Y(g, S, I);
      }),
      (a.precision = a.sd =
        function (g, _) {
          var v,
            T,
            P,
            R = this;
          if (g != null && g !== !!g)
            return (
              Pt(g, 1, zt), _ == null ? (_ = c) : Pt(_, 0, 8), V(new M(R), g, _)
            );
          if (!(v = R.c)) return null;
          if (((P = v.length - 1), (T = P * ct + 1), (P = v[P]))) {
            for (; P % 10 == 0; P /= 10, T--);
            for (P = v[0]; P >= 10; P /= 10, T++);
          }
          return g && R.e + 1 > T && (T = R.e + 1), T;
        }),
      (a.shiftedBy = function (g) {
        return Pt(g, -No, No), this.times('1e' + g);
      }),
      (a.squareRoot = a.sqrt =
        function () {
          var g,
            _,
            v,
            T,
            P,
            R = this,
            I = R.c,
            S = R.s,
            k = R.e,
            N = u + 4,
            E = new M('0.5');
          if (S !== 1 || !I || !I[0])
            return new M(!S || (S < 0 && (!I || I[0])) ? NaN : I ? R : 1 / 0);
          if (
            ((S = Math.sqrt(+A(R))),
            S == 0 || S == 1 / 0
              ? ((_ = te(I)),
                (_.length + k) % 2 == 0 && (_ += '0'),
                (S = Math.sqrt(+_)),
                (k = ie((k + 1) / 2) - (k < 0 || k % 2)),
                S == 1 / 0
                  ? (_ = '5e' + k)
                  : ((_ = S.toExponential()),
                    (_ = _.slice(0, _.indexOf('e') + 1) + k)),
                (v = new M(_)))
              : (v = new M(S + '')),
            v.c[0])
          ) {
            for (k = v.e, S = k + N, S < 3 && (S = 0); ; )
              if (
                ((P = v),
                (v = E.times(P.plus(i(R, P, N, 1)))),
                te(P.c).slice(0, S) === (_ = te(v.c)).slice(0, S))
              )
                if (
                  (v.e < k && --S,
                  (_ = _.slice(S - 3, S + 1)),
                  _ == '9999' || (!T && _ == '4999'))
                ) {
                  if (!T && (V(P, P.e + u + 2, 0), P.times(P).eq(R))) {
                    v = P;
                    break;
                  }
                  (N += 4), (S += 4), (T = 1);
                } else {
                  (!+_ || (!+_.slice(1) && _.charAt(0) == '5')) &&
                    (V(v, v.e + u + 2, 1), (g = !v.times(v).eq(R)));
                  break;
                }
          }
          return V(v, v.e + u + 1, c, g);
        }),
      (a.toExponential = function (g, _) {
        return g != null && (Pt(g, 0, zt), g++), K(this, g, _, 1);
      }),
      (a.toFixed = function (g, _) {
        return g != null && (Pt(g, 0, zt), (g = g + this.e + 1)), K(this, g, _);
      }),
      (a.toFormat = function (g, _, v) {
        var T,
          P = this;
        if (v == null)
          g != null && _ && typeof _ == 'object'
            ? ((v = _), (_ = null))
            : g && typeof g == 'object'
              ? ((v = g), (g = _ = null))
              : (v = $);
        else if (typeof v != 'object')
          throw Error(Wt + 'Argument not an object: ' + v);
        if (((T = P.toFixed(g, _)), P.c)) {
          var R,
            I = T.split('.'),
            S = +v.groupSize,
            k = +v.secondaryGroupSize,
            N = v.groupSeparator || '',
            E = I[0],
            F = I[1],
            X = P.s < 0,
            J = X ? E.slice(1) : E,
            it = J.length;
          if ((k && ((R = S), (S = k), (k = R), (it -= R)), S > 0 && it > 0)) {
            for (R = it % S || S, E = J.substr(0, R); R < it; R += S)
              E += N + J.substr(R, S);
            k > 0 && (E += N + J.slice(R)), X && (E = '-' + E);
          }
          T = F
            ? E +
              (v.decimalSeparator || '') +
              ((k = +v.fractionGroupSize)
                ? F.replace(
                    new RegExp('\\d{' + k + '}\\B', 'g'),
                    '$&' + (v.fractionGroupSeparator || '')
                  )
                : F)
            : E;
        }
        return (v.prefix || '') + T + (v.suffix || '');
      }),
      (a.toFraction = function (g) {
        var _,
          v,
          T,
          P,
          R,
          I,
          S,
          k,
          N,
          E,
          F,
          X,
          J = this,
          it = J.c;
        if (
          g != null &&
          ((S = new M(g)), (!S.isInteger() && (S.c || S.s !== 1)) || S.lt(l))
        )
          throw Error(
            Wt +
              'Argument ' +
              (S.isInteger() ? 'out of range: ' : 'not an integer: ') +
              A(S)
          );
        if (!it) return new M(J);
        for (
          _ = new M(l),
            N = v = new M(l),
            T = k = new M(l),
            X = te(it),
            R = _.e = X.length - J.e - 1,
            _.c[0] = Go[(I = R % ct) < 0 ? ct + I : I],
            g = !g || S.comparedTo(_) > 0 ? (R > 0 ? _ : N) : S,
            I = b,
            b = 1 / 0,
            S = new M(X),
            k.c[0] = 0;
          (E = i(S, _, 0, 1)), (P = v.plus(E.times(T))), P.comparedTo(g) != 1;

        )
          (v = T),
            (T = P),
            (N = k.plus(E.times((P = N)))),
            (k = P),
            (_ = S.minus(E.times((P = _)))),
            (S = P);
        return (
          (P = i(g.minus(v), T, 0, 1)),
          (k = k.plus(P.times(N))),
          (v = v.plus(P.times(T))),
          (k.s = N.s = J.s),
          (R = R * 2),
          (F =
            i(N, T, R, c)
              .minus(J)
              .abs()
              .comparedTo(i(k, v, R, c).minus(J).abs()) < 1
              ? [N, T]
              : [k, v]),
          (b = I),
          F
        );
      }),
      (a.toNumber = function () {
        return +A(this);
      }),
      (a.toPrecision = function (g, _) {
        return g != null && Pt(g, 1, zt), K(this, g, _, 2);
      }),
      (a.toString = function (g) {
        var _,
          v = this,
          T = v.s,
          P = v.e;
        return (
          P === null
            ? T
              ? ((_ = 'Infinity'), T < 0 && (_ = '-' + _))
              : (_ = 'NaN')
            : (g == null
                ? (_ = P <= d || P >= p ? en(te(v.c), P) : Se(te(v.c), P, '0'))
                : g === 10 && B
                  ? ((v = V(new M(v), u + P + 1, c)),
                    (_ = Se(te(v.c), v.e, '0')))
                  : (Pt(g, 2, w.length, 'Base'),
                    (_ = r(Se(te(v.c), P, '0'), 10, g, T, !0))),
              T < 0 && v.c[0] && (_ = '-' + _)),
          _
        );
      }),
      (a.valueOf = a.toJSON =
        function () {
          return A(this);
        }),
      (a._isBigNumber = !0),
      (a[Symbol.toStringTag] = 'BigNumber'),
      (a[Symbol.for('nodejs.util.inspect.custom')] = a.valueOf),
      t != null && M.set(t),
      M
    );
  }
  function ie(t) {
    var i = t | 0;
    return t > 0 || t === i ? i : i - 1;
  }
  function te(t) {
    for (var i, r, o = 1, a = t.length, l = t[0] + ''; o < a; ) {
      for (i = t[o++] + '', r = ct - i.length; r--; i = '0' + i);
      l += i;
    }
    for (a = l.length; l.charCodeAt(--a) === 48; );
    return l.slice(0, a + 1 || 1);
  }
  function ei(t, i) {
    var r,
      o,
      a = t.c,
      l = i.c,
      u = t.s,
      c = i.s,
      d = t.e,
      p = i.e;
    if (!u || !c) return null;
    if (((r = a && !a[0]), (o = l && !l[0]), r || o))
      return r ? (o ? 0 : -c) : u;
    if (u != c) return u;
    if (((r = u < 0), (o = d == p), !a || !l)) return o ? 0 : !a ^ r ? 1 : -1;
    if (!o) return (d > p) ^ r ? 1 : -1;
    for (c = (d = a.length) < (p = l.length) ? d : p, u = 0; u < c; u++)
      if (a[u] != l[u]) return (a[u] > l[u]) ^ r ? 1 : -1;
    return d == p ? 0 : (d > p) ^ r ? 1 : -1;
  }
  function Pt(t, i, r, o) {
    if (t < i || t > r || t !== ee(t))
      throw Error(
        Wt +
          (o || 'Argument') +
          (typeof t == 'number'
            ? t < i || t > r
              ? ' out of range: '
              : ' not an integer: '
            : ' not a primitive number: ') +
          String(t)
      );
  }
  function tn(t) {
    var i = t.c.length - 1;
    return ie(t.e / ct) == i && t.c[i] % 2 != 0;
  }
  function en(t, i) {
    return (
      (t.length > 1 ? t.charAt(0) + '.' + t.slice(1) : t) +
      (i < 0 ? 'e' : 'e+') +
      i
    );
  }
  function Se(t, i, r) {
    var o, a;
    if (i < 0) {
      for (a = r + '.'; ++i; a += r);
      t = a + t;
    } else if (((o = t.length), ++i > o)) {
      for (a = r, i -= o; --i; a += r);
      t += a;
    } else i < o && (t = t.slice(0, i) + '.' + t.slice(i));
    return t;
  }
  var x0 = mf(),
    re = x0;
  var Fo = class {
      key;
      left = null;
      right = null;
      constructor(i) {
        this.key = i;
      }
    },
    ii = class extends Fo {
      constructor(i) {
        super(i);
      }
    };
  var qo = class {
    size = 0;
    modificationCount = 0;
    splayCount = 0;
    splay(i) {
      let r = this.root;
      if (r == null) return this.compare(i, i), -1;
      let o = null,
        a = null,
        l = null,
        u = null,
        c = r,
        d = this.compare,
        p;
      for (;;)
        if (((p = d(c.key, i)), p > 0)) {
          let y = c.left;
          if (
            y == null ||
            ((p = d(y.key, i)),
            p > 0 &&
              ((c.left = y.right),
              (y.right = c),
              (c = y),
              (y = c.left),
              y == null))
          )
            break;
          o == null ? (a = c) : (o.left = c), (o = c), (c = y);
        } else if (p < 0) {
          let y = c.right;
          if (
            y == null ||
            ((p = d(y.key, i)),
            p < 0 &&
              ((c.right = y.left),
              (y.left = c),
              (c = y),
              (y = c.right),
              y == null))
          )
            break;
          l == null ? (u = c) : (l.right = c), (l = c), (c = y);
        } else break;
      return (
        l != null && ((l.right = c.left), (c.left = u)),
        o != null && ((o.left = c.right), (c.right = a)),
        this.root !== c && ((this.root = c), this.splayCount++),
        p
      );
    }
    splayMin(i) {
      let r = i,
        o = r.left;
      for (; o != null; ) {
        let a = o;
        (r.left = a.right), (a.right = r), (r = a), (o = r.left);
      }
      return r;
    }
    splayMax(i) {
      let r = i,
        o = r.right;
      for (; o != null; ) {
        let a = o;
        (r.right = a.left), (a.left = r), (r = a), (o = r.right);
      }
      return r;
    }
    _delete(i) {
      if (this.root == null || this.splay(i) != 0) return null;
      let o = this.root,
        a = o,
        l = o.left;
      if ((this.size--, l == null)) this.root = o.right;
      else {
        let u = o.right;
        (o = this.splayMax(l)), (o.right = u), (this.root = o);
      }
      return this.modificationCount++, a;
    }
    addNewRoot(i, r) {
      this.size++, this.modificationCount++;
      let o = this.root;
      if (o == null) {
        this.root = i;
        return;
      }
      r < 0
        ? ((i.left = o), (i.right = o.right), (o.right = null))
        : ((i.right = o), (i.left = o.left), (o.left = null)),
        (this.root = i);
    }
    _first() {
      let i = this.root;
      return i == null ? null : ((this.root = this.splayMin(i)), this.root);
    }
    _last() {
      let i = this.root;
      return i == null ? null : ((this.root = this.splayMax(i)), this.root);
    }
    clear() {
      (this.root = null), (this.size = 0), this.modificationCount++;
    }
    has(i) {
      return this.validKey(i) && this.splay(i) == 0;
    }
    defaultCompare() {
      return (i, r) => (i < r ? -1 : i > r ? 1 : 0);
    }
    wrap() {
      return {
        getRoot: () => this.root,
        setRoot: (i) => {
          this.root = i;
        },
        getSize: () => this.size,
        getModificationCount: () => this.modificationCount,
        getSplayCount: () => this.splayCount,
        setSplayCount: (i) => {
          this.splayCount = i;
        },
        splay: (i) => this.splay(i),
        has: (i) => this.has(i),
      };
    }
  };
  var Te = class t extends qo {
      root = null;
      compare;
      validKey;
      constructor(i, r) {
        super(),
          (this.compare = i ?? this.defaultCompare()),
          (this.validKey = r ?? ((o) => o != null && o != null));
      }
      delete(i) {
        return this.validKey(i) ? this._delete(i) != null : !1;
      }
      deleteAll(i) {
        for (let r of i) this.delete(r);
      }
      forEach(i) {
        let r = this[Symbol.iterator](),
          o;
        for (; (o = r.next()), !o.done; ) i(o.value, o.value, this);
      }
      add(i) {
        let r = this.splay(i);
        return r != 0 && this.addNewRoot(new ii(i), r), this;
      }
      addAndReturn(i) {
        let r = this.splay(i);
        return r != 0 && this.addNewRoot(new ii(i), r), this.root.key;
      }
      addAll(i) {
        for (let r of i) this.add(r);
      }
      isEmpty() {
        return this.root == null;
      }
      isNotEmpty() {
        return this.root != null;
      }
      single() {
        if (this.size == 0) throw 'Bad state: No element';
        if (this.size > 1) throw 'Bad state: Too many element';
        return this.root.key;
      }
      first() {
        if (this.size == 0) throw 'Bad state: No element';
        return this._first().key;
      }
      last() {
        if (this.size == 0) throw 'Bad state: No element';
        return this._last().key;
      }
      lastBefore(i) {
        if (i == null) throw 'Invalid arguments(s)';
        if (this.root == null) return null;
        if (this.splay(i) < 0) return this.root.key;
        let o = this.root.left;
        if (o == null) return null;
        let a = o.right;
        for (; a != null; ) (o = a), (a = o.right);
        return o.key;
      }
      firstAfter(i) {
        if (i == null) throw 'Invalid arguments(s)';
        if (this.root == null) return null;
        if (this.splay(i) > 0) return this.root.key;
        let o = this.root.right;
        if (o == null) return null;
        let a = o.left;
        for (; a != null; ) (o = a), (a = o.left);
        return o.key;
      }
      retainAll(i) {
        let r = new t(this.compare, this.validKey),
          o = this.modificationCount;
        for (let a of i) {
          if (o != this.modificationCount)
            throw 'Concurrent modification during iteration.';
          this.validKey(a) && this.splay(a) == 0 && r.add(this.root.key);
        }
        r.size != this.size &&
          ((this.root = r.root),
          (this.size = r.size),
          this.modificationCount++);
      }
      lookup(i) {
        return !this.validKey(i) || this.splay(i) != 0 ? null : this.root.key;
      }
      intersection(i) {
        let r = new t(this.compare, this.validKey);
        for (let o of this) i.has(o) && r.add(o);
        return r;
      }
      difference(i) {
        let r = new t(this.compare, this.validKey);
        for (let o of this) i.has(o) || r.add(o);
        return r;
      }
      union(i) {
        let r = this.clone();
        return r.addAll(i), r;
      }
      clone() {
        let i = new t(this.compare, this.validKey);
        return (i.size = this.size), (i.root = this.copyNode(this.root)), i;
      }
      copyNode(i) {
        if (i == null) return null;
        function r(a, l) {
          let u, c;
          do {
            if (((u = a.left), (c = a.right), u != null)) {
              let d = new ii(u.key);
              (l.left = d), r(u, d);
            }
            if (c != null) {
              let d = new ii(c.key);
              (l.right = d), (a = c), (l = d);
            }
          } while (c != null);
        }
        let o = new ii(i.key);
        return r(i, o), o;
      }
      toSet() {
        return this.clone();
      }
      entries() {
        return new Uo(this.wrap());
      }
      keys() {
        return this[Symbol.iterator]();
      }
      values() {
        return this[Symbol.iterator]();
      }
      [Symbol.iterator]() {
        return new Zo(this.wrap());
      }
      [Symbol.toStringTag] = '[object Set]';
    },
    rn = class {
      tree;
      path = new Array();
      modificationCount = null;
      splayCount;
      constructor(i) {
        (this.tree = i), (this.splayCount = i.getSplayCount());
      }
      [Symbol.iterator]() {
        return this;
      }
      next() {
        return this.moveNext()
          ? { done: !1, value: this.current() }
          : { done: !0, value: null };
      }
      current() {
        if (!this.path.length) return null;
        let i = this.path[this.path.length - 1];
        return this.getValue(i);
      }
      rebuildPath(i) {
        this.path.splice(0, this.path.length),
          this.tree.splay(i),
          this.path.push(this.tree.getRoot()),
          (this.splayCount = this.tree.getSplayCount());
      }
      findLeftMostDescendent(i) {
        for (; i != null; ) this.path.push(i), (i = i.left);
      }
      moveNext() {
        if (this.modificationCount != this.tree.getModificationCount()) {
          if (this.modificationCount == null) {
            this.modificationCount = this.tree.getModificationCount();
            let o = this.tree.getRoot();
            for (; o != null; ) this.path.push(o), (o = o.left);
            return this.path.length > 0;
          }
          throw 'Concurrent modification during iteration.';
        }
        if (!this.path.length) return !1;
        this.splayCount != this.tree.getSplayCount() &&
          this.rebuildPath(this.path[this.path.length - 1].key);
        let i = this.path[this.path.length - 1],
          r = i.right;
        if (r != null) {
          for (; r != null; ) this.path.push(r), (r = r.left);
          return !0;
        }
        for (
          this.path.pop();
          this.path.length && this.path[this.path.length - 1].right === i;

        )
          i = this.path.pop();
        return this.path.length > 0;
      }
    },
    Zo = class extends rn {
      getValue(i) {
        return i.key;
      }
    },
    Uo = class extends rn {
      getValue(i) {
        return [i.key, i.key];
      }
    };
  var gf = (t) => t;
  var _f = (t) => {
    if (t) {
      let i = new Te(ur(t)),
        r = new Te(ur(t)),
        o = (l, u) => u.addAndReturn(l),
        a = (l) => ({ x: o(l.x, i), y: o(l.y, r) });
      return a({ x: new re(0), y: new re(0) }), a;
    }
    return gf;
  };
  var Vo = (t) => ({
      set: (i) => {
        $t = Vo(i);
      },
      reset: () => Vo(t),
      compare: ur(t),
      snap: _f(t),
      orient: df(t),
    }),
    $t = Vo();
  var Ti = (t, i) =>
      t.ll.x.isLessThanOrEqualTo(i.x) &&
      i.x.isLessThanOrEqualTo(t.ur.x) &&
      t.ll.y.isLessThanOrEqualTo(i.y) &&
      i.y.isLessThanOrEqualTo(t.ur.y),
    cr = (t, i) => {
      if (
        i.ur.x.isLessThan(t.ll.x) ||
        t.ur.x.isLessThan(i.ll.x) ||
        i.ur.y.isLessThan(t.ll.y) ||
        t.ur.y.isLessThan(i.ll.y)
      )
        return null;
      let r = t.ll.x.isLessThan(i.ll.x) ? i.ll.x : t.ll.x,
        o = t.ur.x.isLessThan(i.ur.x) ? t.ur.x : i.ur.x,
        a = t.ll.y.isLessThan(i.ll.y) ? i.ll.y : t.ll.y,
        l = t.ur.y.isLessThan(i.ur.y) ? t.ur.y : i.ur.y;
      return { ll: { x: r, y: a }, ur: { x: o, y: l } };
    };
  var nn = (t, i) => t.x.times(i.y).minus(t.y.times(i.x)),
    Lf = (t, i) => t.x.times(i.x).plus(t.y.times(i.y)),
    on = (t) => Lf(t, t).sqrt(),
    bf = (t, i, r) => {
      let o = { x: i.x.minus(t.x), y: i.y.minus(t.y) },
        a = { x: r.x.minus(t.x), y: r.y.minus(t.y) };
      return nn(a, o).div(on(a)).div(on(o));
    },
    wf = (t, i, r) => {
      let o = { x: i.x.minus(t.x), y: i.y.minus(t.y) },
        a = { x: r.x.minus(t.x), y: r.y.minus(t.y) };
      return Lf(a, o).div(on(a)).div(on(o));
    },
    yf = (t, i, r) =>
      i.y.isZero()
        ? null
        : { x: t.x.plus(i.x.div(i.y).times(r.minus(t.y))), y: r },
    vf = (t, i, r) =>
      i.x.isZero()
        ? null
        : { x: r, y: t.y.plus(i.y.div(i.x).times(r.minus(t.x))) },
    xf = (t, i, r, o) => {
      if (i.x.isZero()) return vf(r, o, t.x);
      if (o.x.isZero()) return vf(t, i, r.x);
      if (i.y.isZero()) return yf(r, o, t.y);
      if (o.y.isZero()) return yf(t, i, r.y);
      let a = nn(i, o);
      if (a.isZero()) return null;
      let l = { x: r.x.minus(t.x), y: r.y.minus(t.y) },
        u = nn(l, i).div(a),
        c = nn(l, o).div(a),
        d = t.x.plus(c.times(i.x)),
        p = r.x.plus(u.times(o.x)),
        y = t.y.plus(c.times(i.y)),
        b = r.y.plus(u.times(o.y)),
        D = d.plus(p).div(2),
        O = y.plus(b).div(2);
      return { x: D, y: O };
    };
  var Ft = class t {
    point;
    isLeft;
    segment;
    otherSE;
    consumedBy;
    static compare(i, r) {
      let o = t.comparePoints(i.point, r.point);
      return o !== 0
        ? o
        : (i.point !== r.point && i.link(r),
          i.isLeft !== r.isLeft
            ? i.isLeft
              ? 1
              : -1
            : be.compare(i.segment, r.segment));
    }
    static comparePoints(i, r) {
      return i.x.isLessThan(r.x)
        ? -1
        : i.x.isGreaterThan(r.x)
          ? 1
          : i.y.isLessThan(r.y)
            ? -1
            : i.y.isGreaterThan(r.y)
              ? 1
              : 0;
    }
    constructor(i, r) {
      i.events === void 0 ? (i.events = [this]) : i.events.push(this),
        (this.point = i),
        (this.isLeft = r);
    }
    link(i) {
      if (i.point === this.point)
        throw new Error('Tried to link already linked events');
      let r = i.point.events;
      for (let o = 0, a = r.length; o < a; o++) {
        let l = r[o];
        this.point.events.push(l), (l.point = this.point);
      }
      this.checkForConsuming();
    }
    checkForConsuming() {
      let i = this.point.events.length;
      for (let r = 0; r < i; r++) {
        let o = this.point.events[r];
        if (o.segment.consumedBy === void 0)
          for (let a = r + 1; a < i; a++) {
            let l = this.point.events[a];
            l.consumedBy === void 0 &&
              o.otherSE.point.events === l.otherSE.point.events &&
              o.segment.consume(l.segment);
          }
      }
    }
    getAvailableLinkedEvents() {
      let i = [];
      for (let r = 0, o = this.point.events.length; r < o; r++) {
        let a = this.point.events[r];
        a !== this && !a.segment.ringOut && a.segment.isInResult() && i.push(a);
      }
      return i;
    }
    getLeftmostComparator(i) {
      let r = new Map(),
        o = (a) => {
          let l = a.otherSE;
          r.set(a, {
            sine: bf(this.point, i.point, l.point),
            cosine: wf(this.point, i.point, l.point),
          });
        };
      return (a, l) => {
        r.has(a) || o(a), r.has(l) || o(l);
        let { sine: u, cosine: c } = r.get(a),
          { sine: d, cosine: p } = r.get(l);
        return u.isGreaterThanOrEqualTo(0) && d.isGreaterThanOrEqualTo(0)
          ? c.isLessThan(p)
            ? 1
            : c.isGreaterThan(p)
              ? -1
              : 0
          : u.isLessThan(0) && d.isLessThan(0)
            ? c.isLessThan(p)
              ? -1
              : c.isGreaterThan(p)
                ? 1
                : 0
            : d.isLessThan(u)
              ? -1
              : d.isGreaterThan(u)
                ? 1
                : 0;
      };
    }
  };
  var k0 = 0,
    be = class t {
      id;
      leftSE;
      rightSE;
      rings;
      windings;
      ringOut;
      consumedBy;
      prev;
      _prevInResult;
      _beforeState;
      _afterState;
      _isInResult;
      static compare(i, r) {
        let o = i.leftSE.point.x,
          a = r.leftSE.point.x,
          l = i.rightSE.point.x,
          u = r.rightSE.point.x;
        if (u.isLessThan(o)) return 1;
        if (l.isLessThan(a)) return -1;
        let c = i.leftSE.point.y,
          d = r.leftSE.point.y,
          p = i.rightSE.point.y,
          y = r.rightSE.point.y;
        if (o.isLessThan(a)) {
          if (d.isLessThan(c) && d.isLessThan(p)) return 1;
          if (d.isGreaterThan(c) && d.isGreaterThan(p)) return -1;
          let b = i.comparePoint(r.leftSE.point);
          if (b < 0) return 1;
          if (b > 0) return -1;
          let D = r.comparePoint(i.rightSE.point);
          return D !== 0 ? D : -1;
        }
        if (o.isGreaterThan(a)) {
          if (c.isLessThan(d) && c.isLessThan(y)) return -1;
          if (c.isGreaterThan(d) && c.isGreaterThan(y)) return 1;
          let b = r.comparePoint(i.leftSE.point);
          if (b !== 0) return b;
          let D = i.comparePoint(r.rightSE.point);
          return D < 0 ? 1 : D > 0 ? -1 : 1;
        }
        if (c.isLessThan(d)) return -1;
        if (c.isGreaterThan(d)) return 1;
        if (l.isLessThan(u)) {
          let b = r.comparePoint(i.rightSE.point);
          if (b !== 0) return b;
        }
        if (l.isGreaterThan(u)) {
          let b = i.comparePoint(r.rightSE.point);
          if (b < 0) return 1;
          if (b > 0) return -1;
        }
        if (!l.eq(u)) {
          let b = p.minus(c),
            D = l.minus(o),
            O = y.minus(d),
            q = u.minus(a);
          if (b.isGreaterThan(D) && O.isLessThan(q)) return 1;
          if (b.isLessThan(D) && O.isGreaterThan(q)) return -1;
        }
        return l.isGreaterThan(u)
          ? 1
          : l.isLessThan(u) || p.isLessThan(y)
            ? -1
            : p.isGreaterThan(y)
              ? 1
              : i.id < r.id
                ? -1
                : i.id > r.id
                  ? 1
                  : 0;
      }
      constructor(i, r, o, a) {
        (this.id = ++k0),
          (this.leftSE = i),
          (i.segment = this),
          (i.otherSE = r),
          (this.rightSE = r),
          (r.segment = this),
          (r.otherSE = i),
          (this.rings = o),
          (this.windings = a);
      }
      static fromRing(i, r, o) {
        let a,
          l,
          u,
          c = Ft.comparePoints(i, r);
        if (c < 0) (a = i), (l = r), (u = 1);
        else if (c > 0) (a = r), (l = i), (u = -1);
        else
          throw new Error(
            `Tried to create degenerate segment at [${i.x}, ${i.y}]`
          );
        let d = new Ft(a, !0),
          p = new Ft(l, !1);
        return new t(d, p, [o], [u]);
      }
      replaceRightSE(i) {
        (this.rightSE = i),
          (this.rightSE.segment = this),
          (this.rightSE.otherSE = this.leftSE),
          (this.leftSE.otherSE = this.rightSE);
      }
      bbox() {
        let i = this.leftSE.point.y,
          r = this.rightSE.point.y;
        return {
          ll: { x: this.leftSE.point.x, y: i.isLessThan(r) ? i : r },
          ur: { x: this.rightSE.point.x, y: i.isGreaterThan(r) ? i : r },
        };
      }
      vector() {
        return {
          x: this.rightSE.point.x.minus(this.leftSE.point.x),
          y: this.rightSE.point.y.minus(this.leftSE.point.y),
        };
      }
      isAnEndpoint(i) {
        return (
          (i.x.eq(this.leftSE.point.x) && i.y.eq(this.leftSE.point.y)) ||
          (i.x.eq(this.rightSE.point.x) && i.y.eq(this.rightSE.point.y))
        );
      }
      comparePoint(i) {
        return $t.orient(this.leftSE.point, i, this.rightSE.point);
      }
      getIntersection(i) {
        let r = this.bbox(),
          o = i.bbox(),
          a = cr(r, o);
        if (a === null) return null;
        let l = this.leftSE.point,
          u = this.rightSE.point,
          c = i.leftSE.point,
          d = i.rightSE.point,
          p = Ti(r, c) && this.comparePoint(c) === 0,
          y = Ti(o, l) && i.comparePoint(l) === 0,
          b = Ti(r, d) && this.comparePoint(d) === 0,
          D = Ti(o, u) && i.comparePoint(u) === 0;
        if (y && p) return D && !b ? u : !D && b ? d : null;
        if (y) return b && l.x.eq(d.x) && l.y.eq(d.y) ? null : l;
        if (p) return D && u.x.eq(c.x) && u.y.eq(c.y) ? null : c;
        if (D && b) return null;
        if (D) return u;
        if (b) return d;
        let O = xf(l, this.vector(), c, i.vector());
        return O === null || !Ti(a, O) ? null : $t.snap(O);
      }
      split(i) {
        let r = [],
          o = i.events !== void 0,
          a = new Ft(i, !0),
          l = new Ft(i, !1),
          u = this.rightSE;
        this.replaceRightSE(l), r.push(l), r.push(a);
        let c = new t(a, u, this.rings.slice(), this.windings.slice());
        return (
          Ft.comparePoints(c.leftSE.point, c.rightSE.point) > 0 &&
            c.swapEvents(),
          Ft.comparePoints(this.leftSE.point, this.rightSE.point) > 0 &&
            this.swapEvents(),
          o && (a.checkForConsuming(), l.checkForConsuming()),
          r
        );
      }
      swapEvents() {
        let i = this.rightSE;
        (this.rightSE = this.leftSE),
          (this.leftSE = i),
          (this.leftSE.isLeft = !0),
          (this.rightSE.isLeft = !1);
        for (let r = 0, o = this.windings.length; r < o; r++)
          this.windings[r] *= -1;
      }
      consume(i) {
        let r = this,
          o = i;
        for (; r.consumedBy; ) r = r.consumedBy;
        for (; o.consumedBy; ) o = o.consumedBy;
        let a = t.compare(r, o);
        if (a !== 0) {
          if (a > 0) {
            let l = r;
            (r = o), (o = l);
          }
          if (r.prev === o) {
            let l = r;
            (r = o), (o = l);
          }
          for (let l = 0, u = o.rings.length; l < u; l++) {
            let c = o.rings[l],
              d = o.windings[l],
              p = r.rings.indexOf(c);
            p === -1
              ? (r.rings.push(c), r.windings.push(d))
              : (r.windings[p] += d);
          }
          (o.rings = null),
            (o.windings = null),
            (o.consumedBy = r),
            (o.leftSE.consumedBy = r.leftSE),
            (o.rightSE.consumedBy = r.rightSE);
        }
      }
      prevInResult() {
        return this._prevInResult !== void 0
          ? this._prevInResult
          : (this.prev
              ? this.prev.isInResult()
                ? (this._prevInResult = this.prev)
                : (this._prevInResult = this.prev.prevInResult())
              : (this._prevInResult = null),
            this._prevInResult);
      }
      beforeState() {
        if (this._beforeState !== void 0) return this._beforeState;
        if (!this.prev)
          this._beforeState = { rings: [], windings: [], multiPolys: [] };
        else {
          let i = this.prev.consumedBy || this.prev;
          this._beforeState = i.afterState();
        }
        return this._beforeState;
      }
      afterState() {
        if (this._afterState !== void 0) return this._afterState;
        let i = this.beforeState();
        this._afterState = {
          rings: i.rings.slice(0),
          windings: i.windings.slice(0),
          multiPolys: [],
        };
        let r = this._afterState.rings,
          o = this._afterState.windings,
          a = this._afterState.multiPolys;
        for (let c = 0, d = this.rings.length; c < d; c++) {
          let p = this.rings[c],
            y = this.windings[c],
            b = r.indexOf(p);
          b === -1 ? (r.push(p), o.push(y)) : (o[b] += y);
        }
        let l = [],
          u = [];
        for (let c = 0, d = r.length; c < d; c++) {
          if (o[c] === 0) continue;
          let p = r[c],
            y = p.poly;
          if (u.indexOf(y) === -1)
            if (p.isExterior) l.push(y);
            else {
              u.indexOf(y) === -1 && u.push(y);
              let b = l.indexOf(p.poly);
              b !== -1 && l.splice(b, 1);
            }
        }
        for (let c = 0, d = l.length; c < d; c++) {
          let p = l[c].multiPoly;
          a.indexOf(p) === -1 && a.push(p);
        }
        return this._afterState;
      }
      isInResult() {
        if (this.consumedBy) return !1;
        if (this._isInResult !== void 0) return this._isInResult;
        let i = this.beforeState().multiPolys,
          r = this.afterState().multiPolys;
        switch (Bi.type) {
          case 'union': {
            let o = i.length === 0,
              a = r.length === 0;
            this._isInResult = o !== a;
            break;
          }
          case 'intersection': {
            let o, a;
            i.length < r.length
              ? ((o = i.length), (a = r.length))
              : ((o = r.length), (a = i.length)),
              (this._isInResult = a === Bi.numMultiPolys && o < a);
            break;
          }
          case 'xor': {
            let o = Math.abs(i.length - r.length);
            this._isInResult = o % 2 === 1;
            break;
          }
          case 'difference': {
            let o = (a) => a.length === 1 && a[0].isSubject;
            this._isInResult = o(i) !== o(r);
            break;
          }
        }
        return this._isInResult;
      }
    };
  var sn = class {
      poly;
      isExterior;
      segments;
      bbox;
      constructor(i, r, o) {
        if (!Array.isArray(i) || i.length === 0)
          throw new Error(
            'Input geometry is not a valid Polygon or MultiPolygon'
          );
        if (
          ((this.poly = r),
          (this.isExterior = o),
          (this.segments = []),
          typeof i[0][0] != 'number' || typeof i[0][1] != 'number')
        )
          throw new Error(
            'Input geometry is not a valid Polygon or MultiPolygon'
          );
        let a = $t.snap({ x: new re(i[0][0]), y: new re(i[0][1]) });
        this.bbox = { ll: { x: a.x, y: a.y }, ur: { x: a.x, y: a.y } };
        let l = a;
        for (let u = 1, c = i.length; u < c; u++) {
          if (typeof i[u][0] != 'number' || typeof i[u][1] != 'number')
            throw new Error(
              'Input geometry is not a valid Polygon or MultiPolygon'
            );
          let d = $t.snap({ x: new re(i[u][0]), y: new re(i[u][1]) });
          (d.x.eq(l.x) && d.y.eq(l.y)) ||
            (this.segments.push(be.fromRing(l, d, this)),
            d.x.isLessThan(this.bbox.ll.x) && (this.bbox.ll.x = d.x),
            d.y.isLessThan(this.bbox.ll.y) && (this.bbox.ll.y = d.y),
            d.x.isGreaterThan(this.bbox.ur.x) && (this.bbox.ur.x = d.x),
            d.y.isGreaterThan(this.bbox.ur.y) && (this.bbox.ur.y = d.y),
            (l = d));
        }
        (!a.x.eq(l.x) || !a.y.eq(l.y)) &&
          this.segments.push(be.fromRing(l, a, this));
      }
      getSweepEvents() {
        let i = [];
        for (let r = 0, o = this.segments.length; r < o; r++) {
          let a = this.segments[r];
          i.push(a.leftSE), i.push(a.rightSE);
        }
        return i;
      }
    },
    Ho = class {
      multiPoly;
      exteriorRing;
      interiorRings;
      bbox;
      constructor(i, r) {
        if (!Array.isArray(i))
          throw new Error(
            'Input geometry is not a valid Polygon or MultiPolygon'
          );
        (this.exteriorRing = new sn(i[0], this, !0)),
          (this.bbox = {
            ll: {
              x: this.exteriorRing.bbox.ll.x,
              y: this.exteriorRing.bbox.ll.y,
            },
            ur: {
              x: this.exteriorRing.bbox.ur.x,
              y: this.exteriorRing.bbox.ur.y,
            },
          }),
          (this.interiorRings = []);
        for (let o = 1, a = i.length; o < a; o++) {
          let l = new sn(i[o], this, !1);
          l.bbox.ll.x.isLessThan(this.bbox.ll.x) &&
            (this.bbox.ll.x = l.bbox.ll.x),
            l.bbox.ll.y.isLessThan(this.bbox.ll.y) &&
              (this.bbox.ll.y = l.bbox.ll.y),
            l.bbox.ur.x.isGreaterThan(this.bbox.ur.x) &&
              (this.bbox.ur.x = l.bbox.ur.x),
            l.bbox.ur.y.isGreaterThan(this.bbox.ur.y) &&
              (this.bbox.ur.y = l.bbox.ur.y),
            this.interiorRings.push(l);
        }
        this.multiPoly = r;
      }
      getSweepEvents() {
        let i = this.exteriorRing.getSweepEvents();
        for (let r = 0, o = this.interiorRings.length; r < o; r++) {
          let a = this.interiorRings[r].getSweepEvents();
          for (let l = 0, u = a.length; l < u; l++) i.push(a[l]);
        }
        return i;
      }
    },
    fr = class {
      isSubject;
      polys;
      bbox;
      constructor(i, r) {
        if (!Array.isArray(i))
          throw new Error(
            'Input geometry is not a valid Polygon or MultiPolygon'
          );
        try {
          typeof i[0][0][0] == 'number' && (i = [i]);
        } catch {}
        (this.polys = []),
          (this.bbox = {
            ll: {
              x: new re(Number.POSITIVE_INFINITY),
              y: new re(Number.POSITIVE_INFINITY),
            },
            ur: {
              x: new re(Number.NEGATIVE_INFINITY),
              y: new re(Number.NEGATIVE_INFINITY),
            },
          });
        for (let o = 0, a = i.length; o < a; o++) {
          let l = new Ho(i[o], this);
          l.bbox.ll.x.isLessThan(this.bbox.ll.x) &&
            (this.bbox.ll.x = l.bbox.ll.x),
            l.bbox.ll.y.isLessThan(this.bbox.ll.y) &&
              (this.bbox.ll.y = l.bbox.ll.y),
            l.bbox.ur.x.isGreaterThan(this.bbox.ur.x) &&
              (this.bbox.ur.x = l.bbox.ur.x),
            l.bbox.ur.y.isGreaterThan(this.bbox.ur.y) &&
              (this.bbox.ur.y = l.bbox.ur.y),
            this.polys.push(l);
        }
        this.isSubject = r;
      }
      getSweepEvents() {
        let i = [];
        for (let r = 0, o = this.polys.length; r < o; r++) {
          let a = this.polys[r].getSweepEvents();
          for (let l = 0, u = a.length; l < u; l++) i.push(a[l]);
        }
        return i;
      }
    };
  var an = class t {
      events;
      poly;
      _isExteriorRing;
      _enclosingRing;
      static factory(i) {
        let r = [];
        for (let o = 0, a = i.length; o < a; o++) {
          let l = i[o];
          if (!l.isInResult() || l.ringOut) continue;
          let u = null,
            c = l.leftSE,
            d = l.rightSE,
            p = [c],
            y = c.point,
            b = [];
          for (; (u = c), (c = d), p.push(c), c.point !== y; )
            for (;;) {
              let D = c.getAvailableLinkedEvents();
              if (D.length === 0) {
                let $ = p[0].point,
                  w = p[p.length - 1].point;
                throw new Error(
                  `Unable to complete output ring starting at [${$.x}, ${$.y}]. Last matching segment found ends at [${w.x}, ${w.y}].`
                );
              }
              if (D.length === 1) {
                d = D[0].otherSE;
                break;
              }
              let O = null;
              for (let $ = 0, w = b.length; $ < w; $++)
                if (b[$].point === c.point) {
                  O = $;
                  break;
                }
              if (O !== null) {
                let $ = b.splice(O)[0],
                  w = p.splice($.index);
                w.unshift(w[0].otherSE), r.push(new t(w.reverse()));
                continue;
              }
              b.push({ index: p.length, point: c.point });
              let q = c.getLeftmostComparator(u);
              d = D.sort(q)[0].otherSE;
              break;
            }
          r.push(new t(p));
        }
        return r;
      }
      constructor(i) {
        this.events = i;
        for (let r = 0, o = i.length; r < o; r++) i[r].segment.ringOut = this;
        this.poly = null;
      }
      getGeom() {
        let i = this.events[0].point,
          r = [i];
        for (let p = 1, y = this.events.length - 1; p < y; p++) {
          let b = this.events[p].point,
            D = this.events[p + 1].point;
          $t.orient(b, i, D) !== 0 && (r.push(b), (i = b));
        }
        if (r.length === 1) return null;
        let o = r[0],
          a = r[1];
        $t.orient(o, i, a) === 0 && r.shift(), r.push(r[0]);
        let l = this.isExteriorRing() ? 1 : -1,
          u = this.isExteriorRing() ? 0 : r.length - 1,
          c = this.isExteriorRing() ? r.length : -1,
          d = [];
        for (let p = u; p != c; p += l)
          d.push([r[p].x.toNumber(), r[p].y.toNumber()]);
        return d;
      }
      isExteriorRing() {
        if (this._isExteriorRing === void 0) {
          let i = this.enclosingRing();
          this._isExteriorRing = i ? !i.isExteriorRing() : !0;
        }
        return this._isExteriorRing;
      }
      enclosingRing() {
        return (
          this._enclosingRing === void 0 &&
            (this._enclosingRing = this._calcEnclosingRing()),
          this._enclosingRing
        );
      }
      _calcEnclosingRing() {
        let i = this.events[0];
        for (let a = 1, l = this.events.length; a < l; a++) {
          let u = this.events[a];
          Ft.compare(i, u) > 0 && (i = u);
        }
        let r = i.segment.prevInResult(),
          o = r ? r.prevInResult() : null;
        for (;;) {
          if (!r) return null;
          if (!o) return r.ringOut;
          if (o.ringOut !== r.ringOut)
            return o.ringOut?.enclosingRing() !== r.ringOut
              ? r.ringOut
              : r.ringOut?.enclosingRing();
          (r = o.prevInResult()), (o = r ? r.prevInResult() : null);
        }
      }
    },
    ln = class {
      exteriorRing;
      interiorRings;
      constructor(i) {
        (this.exteriorRing = i), (i.poly = this), (this.interiorRings = []);
      }
      addInterior(i) {
        this.interiorRings.push(i), (i.poly = this);
      }
      getGeom() {
        let i = this.exteriorRing.getGeom();
        if (i === null) return null;
        let r = [i];
        for (let o = 0, a = this.interiorRings.length; o < a; o++) {
          let l = this.interiorRings[o].getGeom();
          l !== null && r.push(l);
        }
        return r;
      }
    },
    hn = class {
      rings;
      polys;
      constructor(i) {
        (this.rings = i), (this.polys = this._composePolys(i));
      }
      getGeom() {
        let i = [];
        for (let r = 0, o = this.polys.length; r < o; r++) {
          let a = this.polys[r].getGeom();
          a !== null && i.push(a);
        }
        return i;
      }
      _composePolys(i) {
        let r = [];
        for (let o = 0, a = i.length; o < a; o++) {
          let l = i[o];
          if (!l.poly)
            if (l.isExteriorRing()) r.push(new ln(l));
            else {
              let u = l.enclosingRing();
              u?.poly || r.push(new ln(u)), u?.poly?.addInterior(l);
            }
        }
        return r;
      }
    };
  var dr = class {
    queue;
    tree;
    segments;
    constructor(i, r = be.compare) {
      (this.queue = i), (this.tree = new Te(r)), (this.segments = []);
    }
    process(i) {
      let r = i.segment,
        o = [];
      if (i.consumedBy)
        return i.isLeft ? this.queue.delete(i.otherSE) : this.tree.delete(r), o;
      i.isLeft && this.tree.add(r);
      let a = r,
        l = r;
      do a = this.tree.lastBefore(a);
      while (a != null && a.consumedBy != null);
      do l = this.tree.firstAfter(l);
      while (l != null && l.consumedBy != null);
      if (i.isLeft) {
        let u = null;
        if (a) {
          let d = a.getIntersection(r);
          if (
            d !== null &&
            (r.isAnEndpoint(d) || (u = d), !a.isAnEndpoint(d))
          ) {
            let p = this._splitSafely(a, d);
            for (let y = 0, b = p.length; y < b; y++) o.push(p[y]);
          }
        }
        let c = null;
        if (l) {
          let d = l.getIntersection(r);
          if (
            d !== null &&
            (r.isAnEndpoint(d) || (c = d), !l.isAnEndpoint(d))
          ) {
            let p = this._splitSafely(l, d);
            for (let y = 0, b = p.length; y < b; y++) o.push(p[y]);
          }
        }
        if (u !== null || c !== null) {
          let d = null;
          u === null
            ? (d = c)
            : c === null
              ? (d = u)
              : (d = Ft.comparePoints(u, c) <= 0 ? u : c),
            this.queue.delete(r.rightSE),
            o.push(r.rightSE);
          let p = r.split(d);
          for (let y = 0, b = p.length; y < b; y++) o.push(p[y]);
        }
        o.length > 0
          ? (this.tree.delete(r), o.push(i))
          : (this.segments.push(r), (r.prev = a));
      } else {
        if (a && l) {
          let u = a.getIntersection(l);
          if (u !== null) {
            if (!a.isAnEndpoint(u)) {
              let c = this._splitSafely(a, u);
              for (let d = 0, p = c.length; d < p; d++) o.push(c[d]);
            }
            if (!l.isAnEndpoint(u)) {
              let c = this._splitSafely(l, u);
              for (let d = 0, p = c.length; d < p; d++) o.push(c[d]);
            }
          }
        }
        this.tree.delete(r);
      }
      return o;
    }
    _splitSafely(i, r) {
      this.tree.delete(i);
      let o = i.rightSE;
      this.queue.delete(o);
      let a = i.split(r);
      return a.push(o), i.consumedBy === void 0 && this.tree.add(i), a;
    }
  };
  var jo = class {
      type;
      numMultiPolys;
      run(i, r, o) {
        pr.type = i;
        let a = [new fr(r, !0)];
        for (let y = 0, b = o.length; y < b; y++) a.push(new fr(o[y], !1));
        if (((pr.numMultiPolys = a.length), pr.type === 'difference')) {
          let y = a[0],
            b = 1;
          for (; b < a.length; )
            cr(a[b].bbox, y.bbox) !== null ? b++ : a.splice(b, 1);
        }
        if (pr.type === 'intersection')
          for (let y = 0, b = a.length; y < b; y++) {
            let D = a[y];
            for (let O = y + 1, q = a.length; O < q; O++)
              if (cr(D.bbox, a[O].bbox) === null) return [];
          }
        let l = new Te(Ft.compare);
        for (let y = 0, b = a.length; y < b; y++) {
          let D = a[y].getSweepEvents();
          for (let O = 0, q = D.length; O < q; O++) l.add(D[O]);
        }
        let u = new dr(l),
          c = null;
        for (l.size != 0 && ((c = l.first()), l.delete(c)); c; ) {
          let y = u.process(c);
          for (let b = 0, D = y.length; b < D; b++) {
            let O = y[b];
            O.consumedBy === void 0 && l.add(O);
          }
          l.size != 0 ? ((c = l.first()), l.delete(c)) : (c = null);
        }
        $t.reset();
        let d = an.factory(u.segments);
        return new hn(d).getGeom();
      }
    },
    pr = new jo(),
    Bi = pr;
  var kf = (t, ...i) => Bi.run('intersection', t, i);
  var Mf = (t, ...i) => Bi.run('difference', t, i),
    jP = $t.set;
  function cn(t) {
    let i = { type: 'Feature' };
    return (i.geometry = t), i;
  }
  function un(t) {
    return t.type === 'Feature' ? t.geometry : t;
  }
  function Cf(t) {
    return t && t.geometry && t.geometry.coordinates
      ? t.geometry.coordinates
      : t;
  }
  function E0(t) {
    return cn({ type: 'LineString', coordinates: t });
  }
  function S0(t) {
    return cn({ type: 'MultiLineString', coordinates: t });
  }
  function Pf(t) {
    return cn({ type: 'Polygon', coordinates: t });
  }
  function Ef(t) {
    return cn({ type: 'MultiPolygon', coordinates: t });
  }
  function Sf(t, i) {
    let r = un(t),
      o = un(i),
      a = kf(r.coordinates, o.coordinates);
    return a.length === 0 ? null : a.length === 1 ? Pf(a[0]) : Ef(a);
  }
  function Tf(t, i) {
    let r = un(t),
      o = un(i),
      a = Mf(r.coordinates, o.coordinates);
    return a.length === 0 ? null : a.length === 1 ? Pf(a[0]) : Ef(a);
  }
  function Bf(t) {
    return Array.isArray(t) ? 1 + Bf(t[0]) : -1;
  }
  function Af(t) {
    t instanceof L.Polyline && (t = t.toGeoJSON(15));
    let i = Cf(t),
      r = Bf(i),
      o = [];
    return (
      r > 1
        ? i.forEach((a) => {
            o.push(E0(a));
          })
        : o.push(t),
      o
    );
  }
  function Df(t) {
    let i = [];
    return (
      t.eachLayer((r) => {
        i.push(Cf(r.toGeoJSON(15)));
      }),
      S0(i)
    );
  }
  Lt.Cut = Lt.Polygon.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Cut'),
        (this.toolbarButtonName = 'cutPolygon');
    },
    _finishShape() {
      if (
        ((this._editedLayers = []),
        (!this.options.allowSelfIntersection &&
          (this._handleSelfIntersection(!0, this._layer.getLatLngs()[0]),
          this._doesSelfIntersect)) ||
          (this.options.requireSnapToFinish &&
            !this._hintMarker._snapped &&
            !this._isFirstLayer()))
      )
        return;
      let t = this._layer.getLatLngs();
      if (t.length <= 2) return;
      let i = L.polygon(t, this.options.pathOptions);
      (i._latlngInfos = this._layer._latlngInfo),
        this.cut(i),
        this._cleanupSnapping(),
        this._otherSnapLayers.splice(this._tempSnapLayerIndex, 1),
        delete this._tempSnapLayerIndex,
        this._editedLayers.forEach(({ layer: r, originalLayer: o }) => {
          this._fireCut(o, r, o),
            this._fireCut(this._map, r, o),
            o.pm._fireEdit();
        }),
        (this._editedLayers = []),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    cut(t) {
      let i = this._map._layers,
        r = t._latlngInfos || [];
      Object.keys(i)
        .map((a) => i[a])
        .filter((a) => a.pm)
        .filter((a) => !a._pmTempLayer)
        .filter(
          (a) =>
            (!L.PM.optIn && !a.options.pmIgnore) ||
            (L.PM.optIn && a.options.pmIgnore === !1)
        )
        .filter((a) => a instanceof L.Polyline)
        .filter((a) => a !== t)
        .filter((a) => a.pm.options.allowCutting)
        .filter((a) =>
          this.options.layersToCut &&
          L.Util.isArray(this.options.layersToCut) &&
          this.options.layersToCut.length > 0
            ? this.options.layersToCut.indexOf(a) > -1
            : !0
        )
        .filter((a) => !this._layerGroup.hasLayer(a))
        .filter((a) => {
          try {
            let l = !!Qt(t.toGeoJSON(15), a.toGeoJSON(15)).features.length > 0;
            return l || (a instanceof L.Polyline && !(a instanceof L.Polygon))
              ? l
              : !!Sf(t.toGeoJSON(15), a.toGeoJSON(15));
          } catch {
            return (
              a instanceof L.Polygon &&
                console.error("You can't cut polygons with self-intersections"),
              !1
            );
          }
        })
        .forEach((a) => {
          let l;
          if (a instanceof L.Polygon) {
            l = L.polygon(a.getLatLngs());
            let p = l.getLatLngs();
            r.forEach((y) => {
              if (y && y.snapInfo) {
                let { latlng: b } = y,
                  D = this._calcClosestLayer(b, [l]);
                if (D && D.segment && D.distance < this.options.snapDistance) {
                  let { segment: O } = D;
                  if (O && O.length === 2) {
                    let {
                      indexPath: q,
                      parentPath: $,
                      newIndex: w,
                    } = L.PM.Utils._getIndexFromSegment(p, O);
                    (q.length > 1 ? (0, Of.default)(p, $) : p).splice(w, 0, b);
                  }
                }
              }
            });
          } else l = a;
          let u = this._cutLayer(t, l),
            c = L.geoJSON(u, a.options);
          c.getLayers().length === 1 && ([c] = c.getLayers()),
            this._setPane(c, 'layerPane');
          let d = c.addTo(this._map.pm._getContainingLayer());
          if (
            (d.pm.enable(a.pm.options),
            d.pm.disable(),
            (a._pmTempLayer = !0),
            (t._pmTempLayer = !0),
            a.remove(),
            a.removeFrom(this._map.pm._getContainingLayer()),
            t.remove(),
            t.removeFrom(this._map.pm._getContainingLayer()),
            d.getLayers &&
              d.getLayers().length === 0 &&
              this._map.pm.removeLayer({ target: d }),
            d instanceof L.LayerGroup
              ? (d.eachLayer((p) => {
                  this._addDrawnLayerProp(p);
                }),
                this._addDrawnLayerProp(d))
              : this._addDrawnLayerProp(d),
            this.options.layersToCut &&
              L.Util.isArray(this.options.layersToCut) &&
              this.options.layersToCut.length > 0)
          ) {
            let p = this.options.layersToCut.indexOf(a);
            p > -1 && this.options.layersToCut.splice(p, 1);
          }
          this._editedLayers.push({ layer: d, originalLayer: a });
        });
    },
    _cutLayer(t, i) {
      let r = L.geoJSON(),
        o;
      if (i instanceof L.Polygon) o = Tf(i.toGeoJSON(15), t.toGeoJSON(15));
      else {
        let a = Af(i);
        a.forEach((l) => {
          let u = uf(l, t.toGeoJSON(15)),
            c;
          u && u.features.length > 0 ? (c = L.geoJSON(u)) : (c = L.geoJSON(l)),
            c.getLayers().forEach((d) => {
              Ro(t.toGeoJSON(15), d.toGeoJSON(15)) || d.addTo(r);
            });
        }),
          a.length > 1 ? (o = Df(r)) : (o = r.toGeoJSON(15));
      }
      return o;
    },
    _change: L.Util.falseFn,
  });
  Lt.Text = Lt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'Text'),
        (this.toolbarButtonName = 'drawText');
    },
    enable(t) {
      L.Util.setOptions(this, t),
        (this._enabled = !0),
        this._map.on('click', this._createMarker, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        (this._hintMarker = L.marker(this._map.getCenter(), {
          interactive: !1,
          zIndexOffset: 100,
          icon: L.divIcon({ className: 'marker-icon cursor-marker' }),
        })),
        this._setPane(this._hintMarker, 'vertexPane'),
        (this._hintMarker._pmTempLayer = !0),
        this._hintMarker.addTo(this._map),
        this.options.cursorMarker &&
          L.DomUtil.addClass(this._hintMarker._icon, 'visible'),
        this.options.tooltips &&
          this._hintMarker
            .bindTooltip(at('tooltips.placeText'), {
              permanent: !0,
              offset: L.point(0, 10),
              direction: 'bottom',
              opacity: 0.8,
            })
            .openTooltip(),
        (this._layer = this._hintMarker),
        this._map.on('mousemove', this._syncHintMarker, this),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this._fireDrawStart(),
        this._setGlobalDrawMode();
    },
    disable() {
      this._enabled &&
        ((this._enabled = !1),
        this._map.off('click', this._createMarker, this),
        this._hintMarker?.remove(),
        this._map.getContainer().classList.remove('geoman-draw-cursor'),
        this._map.off('mousemove', this._syncHintMarker, this),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !1),
        this.options.snappable && this._cleanupSnapping(),
        this._fireDrawEnd(),
        this._setGlobalDrawMode());
    },
    enabled() {
      return this._enabled;
    },
    toggle(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    _syncHintMarker(t) {
      if ((this._hintMarker.setLatLng(t.latlng), this.options.snappable)) {
        let i = t;
        (i.target = this._hintMarker), this._handleSnapping(i);
      }
    },
    _createMarker(t) {
      if (
        !t.latlng ||
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer())
      )
        return;
      this._hintMarker._snapped || this._hintMarker.setLatLng(t.latlng);
      let i = this._hintMarker.getLatLng();
      if (
        ((this.textArea = this._createTextArea()),
        this.options.textOptions?.className)
      ) {
        let a = this.options.textOptions.className.split(' ');
        this.textArea.classList.add(...a);
      }
      let r = this._createTextIcon(this.textArea),
        o = new L.Marker(i, { textMarker: !0, _textMarkerOverPM: !0, icon: r });
      if (
        (this._setPane(o, 'markerPane'),
        this._finishLayer(o),
        o.pm || (o.options.draggable = !1),
        o.addTo(this._map.pm._getContainingLayer()),
        o.pm)
      ) {
        (o.pm.textArea = this.textArea),
          L.setOptions(o.pm, {
            removeIfEmpty: this.options.textOptions?.removeIfEmpty ?? !0,
          });
        let a = this.options.textOptions?.focusAfterDraw ?? !0;
        o.pm._createTextMarker(a),
          this.options.textOptions?.text &&
            o.pm.setText(this.options.textOptions.text);
      }
      this._fireCreate(o),
        this._cleanupSnapping(),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    _createTextArea() {
      let t = document.createElement('textarea');
      return (
        (t.readOnly = !0), t.classList.add('pm-textarea', 'pm-disabled'), t
      );
    },
    _createTextIcon(t) {
      return L.divIcon({ className: 'pm-text-marker', html: t });
    },
  });
  var T0 = {
      enableLayerDrag() {
        if (!this.options.draggable || !this._layer._map) return;
        this.disable(),
          (this._layerDragEnabled = !0),
          this._map || (this._map = this._layer._map),
          (this._layer instanceof L.Marker ||
            this._layer instanceof L.ImageOverlay) &&
            L.DomEvent.on(
              this._getDOMElem(),
              'dragstart',
              this._stopDOMImageDrag
            ),
          this._layer.dragging && this._layer.dragging.disable(),
          (this._tempDragCoord = null),
          Ne(this._layer) instanceof L.Canvas
            ? (this._layer.on('mouseout', this.removeDraggingClass, this),
              this._layer.on('mouseover', this.addDraggingClass, this))
            : this.addDraggingClass(),
          (this._originalMapDragState = this._layer._map.dragging._enabled),
          (this._safeToCacheDragState = !0);
        let t = this._getDOMElem();
        t &&
          (Ne(this._layer) instanceof L.Canvas
            ? (this._layer.on(
                'touchstart mousedown',
                this._dragMixinOnMouseDown,
                this
              ),
              this._map.pm._addTouchEvents(t))
            : L.DomEvent.on(
                t,
                'touchstart mousedown',
                this._simulateMouseDownEvent,
                this
              )),
          this._fireDragEnable();
      },
      disableLayerDrag() {
        (this._layerDragEnabled = !1),
          Ne(this._layer) instanceof L.Canvas
            ? (this._layer.off('mouseout', this.removeDraggingClass, this),
              this._layer.off('mouseover', this.addDraggingClass, this))
            : this.removeDraggingClass(),
          this._originalMapDragState &&
            this._dragging &&
            this._map.dragging.enable(),
          (this._safeToCacheDragState = !1),
          this._layer.dragging && this._layer.dragging.disable();
        let t = this._getDOMElem();
        t &&
          (Ne(this._layer) instanceof L.Canvas
            ? (this._layer.off(
                'touchstart mousedown',
                this._dragMixinOnMouseDown,
                this
              ),
              this._map.pm._removeTouchEvents(t))
            : L.DomEvent.off(
                t,
                'touchstart mousedown',
                this._simulateMouseDownEvent,
                this
              )),
          this._layerDragged && this._fireUpdate(),
          (this._layerDragged = !1),
          this._fireDragDisable();
      },
      dragging() {
        return this._dragging;
      },
      layerDragEnabled() {
        return !!this._layerDragEnabled;
      },
      _simulateMouseDownEvent(t) {
        let i = t.touches ? t.touches[0] : t,
          r = { originalEvent: i, target: this._layer };
        return (
          (r.containerPoint = this._map.mouseEventToContainerPoint(i)),
          (r.latlng = this._map.containerPointToLatLng(r.containerPoint)),
          this._dragMixinOnMouseDown(r),
          !1
        );
      },
      _simulateMouseMoveEvent(t) {
        let i = t.touches ? t.touches[0] : t,
          r = { originalEvent: i, target: this._layer };
        return (
          (r.containerPoint = this._map.mouseEventToContainerPoint(i)),
          (r.latlng = this._map.containerPointToLatLng(r.containerPoint)),
          this._dragMixinOnMouseMove(r),
          !1
        );
      },
      _simulateMouseUpEvent(t) {
        let r = {
          originalEvent: t.touches ? t.touches[0] : t,
          target: this._layer,
        };
        return (
          t.type.indexOf('touch') === -1 &&
            ((r.containerPoint = this._map.mouseEventToContainerPoint(t)),
            (r.latlng = this._map.containerPointToLatLng(r.containerPoint))),
          this._dragMixinOnMouseUp(r),
          !1
        );
      },
      _dragMixinOnMouseDown(t) {
        if (t.originalEvent.button > 0) return;
        this._overwriteEventIfItComesFromMarker(t);
        let i = t._fromLayerSync,
          r = this._syncLayers('_dragMixinOnMouseDown', t);
        if (
          (this._layer instanceof L.Marker &&
            (this.options.snappable && !i && !r
              ? this._initSnappableMarkers()
              : this._disableSnapping()),
          this._layer instanceof L.CircleMarker)
        ) {
          let o = 'resizeableCircleMarker';
          this._layer instanceof L.Circle && (o = 'resizableCircle'),
            this.options.snappable && !i && !r
              ? this._layer.pm.options[o] || this._initSnappableMarkersDrag()
              : this._layer.pm.options[o]
                ? this._layer.pm._disableSnapping()
                : this._layer.pm._disableSnappingDrag();
        }
        this._safeToCacheDragState &&
          ((this._originalMapDragState = this._layer._map.dragging._enabled),
          (this._safeToCacheDragState = !1)),
          (this._tempDragCoord = t.latlng),
          L.DomEvent.on(
            this._map.getContainer(),
            'touchend mouseup',
            this._simulateMouseUpEvent,
            this
          ),
          L.DomEvent.on(
            this._map.getContainer(),
            'touchmove mousemove',
            this._simulateMouseMoveEvent,
            this
          );
      },
      _dragMixinOnMouseMove(t) {
        this._overwriteEventIfItComesFromMarker(t);
        let i = this._getDOMElem();
        this._syncLayers('_dragMixinOnMouseMove', t),
          this._dragging ||
            ((this._dragging = !0),
            L.DomUtil.addClass(i, 'leaflet-pm-dragging'),
            this._layer instanceof L.Marker || this._layer.bringToFront(),
            this._originalMapDragState && this._map.dragging.disable(),
            this._fireDragStart()),
          this._tempDragCoord || (this._tempDragCoord = t.latlng),
          this._onLayerDrag(t),
          this._layer instanceof L.CircleMarker &&
            this._layer.pm._updateHiddenPolyCircle();
      },
      _dragMixinOnMouseUp(t) {
        let i = this._getDOMElem();
        return (
          this._syncLayers('_dragMixinOnMouseUp', t),
          this._originalMapDragState && this._map.dragging.enable(),
          (this._safeToCacheDragState = !0),
          L.DomEvent.off(
            this._map.getContainer(),
            'touchmove mousemove',
            this._simulateMouseMoveEvent,
            this
          ),
          L.DomEvent.off(
            this._map.getContainer(),
            'touchend mouseup',
            this._simulateMouseUpEvent,
            this
          ),
          this._dragging
            ? (this._layer instanceof L.CircleMarker &&
                this._layer.pm._updateHiddenPolyCircle(),
              (this._layerDragged = !0),
              window.setTimeout(() => {
                (this._dragging = !1),
                  i && L.DomUtil.removeClass(i, 'leaflet-pm-dragging'),
                  this._fireDragEnd(),
                  this._fireEdit(),
                  (this._layerEdited = !0);
              }, 10),
              !0)
            : !1
        );
      },
      _onLayerDrag(t) {
        let { latlng: i } = t,
          r = {
            lat: i.lat - this._tempDragCoord.lat,
            lng: i.lng - this._tempDragCoord.lng,
          },
          o = (a) =>
            a.map((l) => {
              if (Array.isArray(l)) return o(l);
              let u = { lat: l.lat + r.lat, lng: l.lng + r.lng };
              return (l.alt || l.alt === 0) && (u.alt = l.alt), u;
            });
        if (
          (this._layer instanceof L.Circle &&
            this._layer.options.resizableCircle) ||
          (this._layer instanceof L.CircleMarker &&
            this._layer.options.resizeableCircleMarker)
        ) {
          let a = o([this._layer.getLatLng()]);
          this._layer.setLatLng(a[0]),
            this._fireChange(this._layer.getLatLng(), 'Edit');
        } else if (
          this._layer instanceof L.CircleMarker ||
          this._layer instanceof L.Marker
        ) {
          let a = this._layer.getLatLng();
          this._layer._snapped && (a = this._layer._orgLatLng);
          let l = o([a]);
          this._layer.setLatLng(l[0]),
            this._fireChange(this._layer.getLatLng(), 'Edit');
        } else if (this._layer instanceof L.ImageOverlay) {
          let a = o([
            this._layer.getBounds().getNorthWest(),
            this._layer.getBounds().getSouthEast(),
          ]);
          this._layer.setBounds(a),
            this._fireChange(this._layer.getBounds(), 'Edit');
        } else {
          let a = o(this._layer.getLatLngs());
          this._layer.setLatLngs(a),
            this._fireChange(this._layer.getLatLngs(), 'Edit');
        }
        (this._tempDragCoord = i), (t.layer = this._layer), this._fireDrag(t);
      },
      addDraggingClass() {
        let t = this._getDOMElem();
        t && L.DomUtil.addClass(t, 'leaflet-pm-draggable');
      },
      removeDraggingClass() {
        let t = this._getDOMElem();
        t && L.DomUtil.removeClass(t, 'leaflet-pm-draggable');
      },
      _getDOMElem() {
        let t = null;
        return (
          this._layer._path
            ? (t = this._layer._path)
            : this._layer._renderer && this._layer._renderer._container
              ? (t = this._layer._renderer._container)
              : this._layer._image
                ? (t = this._layer._image)
                : this._layer._icon && (t = this._layer._icon),
          t
        );
      },
      _overwriteEventIfItComesFromMarker(t) {
        t.target.getLatLng &&
          (!t.target._radius || t.target._radius <= 10) &&
          ((t.containerPoint = this._map.mouseEventToContainerPoint(
            t.originalEvent
          )),
          (t.latlng = this._map.containerPointToLatLng(t.containerPoint)));
      },
      _syncLayers(t, i) {
        if (this.enabled()) return !1;
        if (
          !i._fromLayerSync &&
          this._layer === i.target &&
          this.options.syncLayersOnDrag
        ) {
          i._fromLayerSync = !0;
          let r = [];
          if (L.Util.isArray(this.options.syncLayersOnDrag))
            (r = this.options.syncLayersOnDrag),
              this.options.syncLayersOnDrag.forEach((o) => {
                o instanceof L.LayerGroup && (r = r.concat(o.pm.getLayers(!0)));
              });
          else if (
            this.options.syncLayersOnDrag === !0 &&
            this._parentLayerGroup
          )
            for (let o in this._parentLayerGroup) {
              let a = this._parentLayerGroup[o];
              a.pm && (r = a.pm.getLayers(!0));
            }
          return (
            L.Util.isArray(r) &&
              r.length > 0 &&
              ((r = r
                .filter((o) => !!o.pm)
                .filter((o) => !!o.pm.options.draggable)),
              r.forEach((o) => {
                o !== this._layer && o.pm[t] && ((o._snapped = !1), o.pm[t](i));
              })),
            r.length > 0
          );
        }
        return !1;
      },
      _stopDOMImageDrag(t) {
        return t.preventDefault(), !1;
      },
    },
    Rf = T0;
  var If = le(er());
  var B0 = {
      _onRotateStart(t) {
        this._preventRenderingMarkers(!0),
          (this._rotationOriginLatLng = this._getRotationCenter().clone()),
          (this._rotationOriginPoint = Ge(
            this._map,
            this._rotationOriginLatLng
          )),
          (this._rotationStartPoint = Ge(this._map, t.target.getLatLng())),
          (this._initialRotateLatLng = ye(this._layer)),
          (this._startAngle = this.getAngle());
        let i = ye(
          this._rotationLayer,
          this._rotationLayer.pm._rotateOrgLatLng
        );
        this._fireRotationStart(this._rotationLayer, i),
          this._fireRotationStart(this._map, i);
      },
      _onRotate(t) {
        let i = Ge(this._map, t.target.getLatLng()),
          r = this._rotationStartPoint,
          o = this._rotationOriginPoint,
          a =
            Math.atan2(i.y - o.y, i.x - o.x) - Math.atan2(r.y - o.y, r.x - o.x);
        this._layer.setLatLngs(
          this._rotateLayer(
            a,
            this._initialRotateLatLng,
            this._rotationOriginLatLng,
            L.PM.Matrix.init(),
            this._map
          )
        );
        let l = this;
        function u(y, b = [], D = -1) {
          if ((D > -1 && b.push(D), L.Util.isArray(y[0])))
            y.forEach((O, q) => u(O, b.slice(), q));
          else {
            let O = (0, If.default)(l._markers, b);
            y.forEach((q, $) => {
              O[$].setLatLng(q);
            });
          }
        }
        u(this._layer.getLatLngs());
        let c = ye(this._rotationLayer);
        this._rotationLayer.setLatLngs(
          this._rotateLayer(
            a,
            this._rotationLayer.pm._rotateOrgLatLng,
            this._rotationOriginLatLng,
            L.PM.Matrix.init(),
            this._map
          )
        );
        let d = (a * 180) / Math.PI;
        d = d < 0 ? d + 360 : d;
        let p = d + this._startAngle;
        this._setAngle(p),
          this._rotationLayer.pm._setAngle(p),
          this._fireRotation(this._rotationLayer, d, c),
          this._fireRotation(this._map, d, c),
          this._rotationLayer.pm._fireChange(
            this._rotationLayer.getLatLngs(),
            'Rotation'
          );
      },
      _onRotateEnd() {
        let t = this._startAngle;
        delete this._rotationOriginLatLng,
          delete this._rotationOriginPoint,
          delete this._rotationStartPoint,
          delete this._initialRotateLatLng,
          delete this._startAngle;
        let i = ye(
          this._rotationLayer,
          this._rotationLayer.pm._rotateOrgLatLng
        );
        (this._rotationLayer.pm._rotateOrgLatLng = ye(this._rotationLayer)),
          this._fireRotationEnd(this._rotationLayer, t, i),
          this._fireRotationEnd(this._map, t, i),
          this._rotationLayer.pm._fireEdit(this._rotationLayer, 'Rotation'),
          this._preventRenderingMarkers(!1),
          (this._layerRotated = !0);
      },
      _rotateLayer(t, i, r, o, a) {
        let l = Ge(a, r);
        return (
          (this._matrix = o.clone().rotate(t, l).flip()), mo(i, this._matrix, a)
        );
      },
      _setAngle(t) {
        (t = t < 0 ? t + 360 : t), (this._angle = t % 360);
      },
      _getRotationCenter() {
        if (this._rotationCenter) return this._rotationCenter;
        let t = L.polygon(this._layer.getLatLngs(), {
            stroke: !1,
            fill: !1,
            pmIgnore: !0,
          }).addTo(this._layer._map),
          i = t.getCenter();
        return t.removeFrom(this._layer._map), i;
      },
      enableRotate() {
        if (!this.options.allowRotation) {
          this.disableRotate();
          return;
        }
        this.rotateEnabled() && this.disableRotate(),
          this._layer instanceof L.Rectangle &&
            this._angle === void 0 &&
            this.setInitAngle(
              nr(
                this._layer._map,
                this._layer.getLatLngs()[0][0],
                this._layer.getLatLngs()[0][1]
              ) || 0
            );
        let t = { fill: !1, stroke: !1, pmIgnore: !1, snapIgnore: !0 };
        (this._rotatePoly = L.polygon(this._layer.getLatLngs(), t)),
          (this._rotatePoly._pmTempLayer = !0),
          this._rotatePoly.addTo(this._layer._map),
          this._rotatePoly.pm._setAngle(this.getAngle()),
          this._rotatePoly.pm.setRotationCenter(this.getRotationCenter()),
          this._rotatePoly.pm.setOptions(
            this._layer._map.pm.getGlobalOptions()
          ),
          this._rotatePoly.pm.setOptions({
            rotate: !0,
            snappable: !1,
            hideMiddleMarkers: !0,
          }),
          (this._rotatePoly.pm._rotationLayer = this._layer),
          this._rotatePoly.pm.enable(),
          (this._rotateOrgLatLng = ye(this._layer)),
          (this._rotateEnabled = !0),
          this._layer.on('remove', this.disableRotate, this),
          this._fireRotationEnable(this._layer),
          this._fireRotationEnable(this._layer._map);
      },
      disableRotate() {
        this.rotateEnabled() &&
          (this._rotatePoly.pm._layerRotated && this._fireUpdate(),
          (this._rotatePoly.pm._layerRotated = !1),
          this._rotatePoly.pm.disable(),
          this._rotatePoly.remove(),
          this._rotatePoly.pm.setOptions({ rotate: !1 }),
          (this._rotatePoly = void 0),
          (this._rotateOrgLatLng = void 0),
          this._layer.off('remove', this.disableRotate, this),
          (this._rotateEnabled = !1),
          this._fireRotationDisable(this._layer),
          this._fireRotationDisable(this._layer._map));
      },
      rotateEnabled() {
        return !!this._rotateEnabled;
      },
      rotateLayer(t) {
        let i = this.getAngle(),
          r = this._layer.getLatLngs(),
          o = t * (Math.PI / 180);
        this._layer.setLatLngs(
          this._rotateLayer(
            o,
            this._layer.getLatLngs(),
            this._getRotationCenter(),
            L.PM.Matrix.init(),
            this._layer._map
          )
        ),
          (this._rotateOrgLatLng = L.polygon(
            this._layer.getLatLngs()
          ).getLatLngs()),
          this._setAngle(this.getAngle() + t),
          this.rotateEnabled() &&
            this._rotatePoly &&
            this._rotatePoly.pm.enabled() &&
            (this._rotatePoly.setLatLngs(
              this._rotateLayer(
                o,
                this._rotatePoly.getLatLngs(),
                this._getRotationCenter(),
                L.PM.Matrix.init(),
                this._rotatePoly._map
              )
            ),
            this._rotatePoly.pm._initMarkers());
        let a = this.getAngle() - i;
        (a = a < 0 ? a + 360 : a),
          (this._startAngle = i),
          this._fireRotation(this._layer, a, r, this._layer),
          this._fireRotation(this._map || this._layer._map, a, r, this._layer),
          delete this._startAngle,
          this._fireChange(this._layer.getLatLngs(), 'Rotation');
      },
      rotateLayerToAngle(t) {
        let i = t - this.getAngle();
        this.rotateLayer(i);
      },
      getAngle() {
        return this._angle || 0;
      },
      setInitAngle(t) {
        this._setAngle(t);
      },
      getRotationCenter() {
        return this._getRotationCenter();
      },
      setRotationCenter(t) {
        (this._rotationCenter = t),
          this._rotatePoly && this._rotatePoly.pm.setRotationCenter(t);
      },
    },
    zf = B0;
  var A0 = L.Class.extend({
      includes: [Rf, Kr, zf, ze, ki, Xe, Je],
      options: {
        snappable: !0,
        snapDistance: 20,
        allowSelfIntersection: !0,
        allowSelfIntersectionEdit: !1,
        preventMarkerRemoval: !1,
        removeLayerBelowMinVertexCount: !0,
        limitMarkersToCount: -1,
        hideMiddleMarkers: !1,
        snapSegment: !0,
        syncLayersOnDrag: !1,
        draggable: !0,
        allowEditing: !0,
        allowRemoval: !0,
        allowCutting: !0,
        allowRotation: !0,
        allowColorChange: !0,
        addVertexOn: 'click',
        removeVertexOn: 'contextmenu',
        removeVertexValidation: void 0,
        addVertexValidation: void 0,
        moveVertexValidation: void 0,
        resizeableCircleMarker: !1,
        resizableCircle: !0,
      },
      setOptions(t) {
        L.Util.setOptions(this, t);
      },
      getOptions() {
        return this.options;
      },
      applyOptions() {},
      isPolygon() {
        return this._layer instanceof L.Polygon;
      },
      getShape() {
        return this._shape;
      },
      _setPane(t, i) {
        i === 'layerPane'
          ? (t.options.pane =
              (this._map.pm.globalOptions.panes &&
                this._map.pm.globalOptions.panes.layerPane) ||
              'overlayPane')
          : i === 'vertexPane'
            ? (t.options.pane =
                (this._map.pm.globalOptions.panes &&
                  this._map.pm.globalOptions.panes.vertexPane) ||
                'markerPane')
            : i === 'markerPane' &&
              (t.options.pane =
                (this._map.pm.globalOptions.panes &&
                  this._map.pm.globalOptions.panes.markerPane) ||
                'markerPane');
      },
      remove() {
        (this._map || this._layer._map).pm.removeLayer({ target: this._layer });
      },
      _vertexValidation(t, i) {
        let r = i.target,
          o = { layer: this._layer, marker: r, event: i },
          a = '';
        return (
          t === 'move'
            ? (a = 'moveVertexValidation')
            : t === 'add'
              ? (a = 'addVertexValidation')
              : t === 'remove' && (a = 'removeVertexValidation'),
          this.options[a] &&
          typeof this.options[a] == 'function' &&
          !this.options[a](o)
            ? (t === 'move' && (r._cancelDragEventChain = r.getLatLng()), !1)
            : ((r._cancelDragEventChain = null), !0)
        );
      },
      _vertexValidationDrag(t) {
        return t._cancelDragEventChain
          ? ((t._latlng = t._cancelDragEventChain), t.update(), !1)
          : !0;
      },
      _vertexValidationDragEnd(t) {
        return t._cancelDragEventChain
          ? ((t._cancelDragEventChain = null), !1)
          : !0;
      },
    }),
    wt = A0;
  wt.LayerGroup = L.Class.extend({
    initialize(t) {
      (this._layerGroup = t),
        (this._layers = this.getLayers()),
        this._getMap(),
        this._layers.forEach((o) => this._initLayer(o));
      let i = (o) => {
        if (o.layer._pmTempLayer) return;
        this._layers = this.getLayers();
        let a = this._layers.filter(
          (l) =>
            !l.pm._parentLayerGroup ||
            !(this._layerGroup._leaflet_id in l.pm._parentLayerGroup)
        );
        a.forEach((l) => {
          this._initLayer(l);
        }),
          a.length > 0 &&
            this._getMap() &&
            this._getMap().pm.globalEditModeEnabled() &&
            this.enabled() &&
            this.enable(this.getOptions());
      };
      this._layerGroup.on('layeradd', L.Util.throttle(i, 100, this), this),
        this._layerGroup.on(
          'layerremove',
          (o) => {
            this._removeLayerFromGroup(o.target);
          },
          this
        );
      let r = (o) => {
        o.target._pmTempLayer || (this._layers = this.getLayers());
      };
      this._layerGroup.on('layerremove', L.Util.throttle(r, 100, this), this);
    },
    enable(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this._options = t),
        this._layers.forEach((r) => {
          r instanceof L.LayerGroup
            ? i.indexOf(r._leaflet_id) === -1 &&
              (i.push(r._leaflet_id), r.pm.enable(t, i))
            : r.pm.enable(t);
        });
    },
    disable(t = []) {
      t.length === 0 && (this._layers = this.getLayers()),
        this._layers.forEach((i) => {
          i instanceof L.LayerGroup
            ? t.indexOf(i._leaflet_id) === -1 &&
              (t.push(i._leaflet_id), i.pm.disable(t))
            : i.pm.disable();
        });
    },
    enabled(t = []) {
      return (
        t.length === 0 && (this._layers = this.getLayers()),
        !!this._layers.find((r) =>
          r instanceof L.LayerGroup
            ? t.indexOf(r._leaflet_id) === -1
              ? (t.push(r._leaflet_id), r.pm.enabled(t))
              : !1
            : r.pm.enabled()
        )
      );
    },
    toggleEdit(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this._options = t),
        this._layers.forEach((r) => {
          r instanceof L.LayerGroup
            ? i.indexOf(r._leaflet_id) === -1 &&
              (i.push(r._leaflet_id), r.pm.toggleEdit(t, i))
            : r.pm.toggleEdit(t);
        });
    },
    _initLayer(t) {
      let i = L.Util.stamp(this._layerGroup);
      t.pm._parentLayerGroup || (t.pm._parentLayerGroup = {}),
        (t.pm._parentLayerGroup[i] = this._layerGroup);
    },
    _removeLayerFromGroup(t) {
      if (t.pm && t.pm._layerGroup) {
        let i = L.Util.stamp(this._layerGroup);
        delete t.pm._layerGroup[i];
      }
    },
    dragging() {
      return (
        (this._layers = this.getLayers()),
        this._layers ? !!this._layers.find((i) => i.pm.dragging()) : !1
      );
    },
    getOptions() {
      return this.options;
    },
    _getMap() {
      return this._map || this._layers.find((t) => !!t._map)?._map || null;
    },
    getLayers(t = !1, i = !0, r = !0, o = []) {
      let a = [];
      return (
        t
          ? this._layerGroup.getLayers().forEach((l) => {
              a.push(l),
                l instanceof L.LayerGroup &&
                  o.indexOf(l._leaflet_id) === -1 &&
                  (o.push(l._leaflet_id),
                  (a = a.concat(l.pm.getLayers(!0, !0, !0, o))));
            })
          : (a = this._layerGroup.getLayers()),
        r && (a = a.filter((l) => !(l instanceof L.LayerGroup))),
        i &&
          ((a = a.filter((l) => !!l.pm)),
          (a = a.filter((l) => !l._pmTempLayer)),
          (a = a.filter(
            (l) =>
              (!L.PM.optIn && !l.options.pmIgnore) ||
              (L.PM.optIn && l.options.pmIgnore === !1)
          ))),
        a
      );
    },
    setOptions(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this.options = t),
        this._layers.forEach((r) => {
          r.pm &&
            (r instanceof L.LayerGroup
              ? i.indexOf(r._leaflet_id) === -1 &&
                (i.push(r._leaflet_id), r.pm.setOptions(t, i))
              : r.pm.setOptions(t));
        });
    },
  });
  wt.Marker = wt.extend({
    _shape: 'Marker',
    initialize(t) {
      (this._layer = t),
        (this._enabled = !1),
        this._layer.on('dragend', this._onDragEnd, this);
    },
    enable(t = { draggable: !0 }) {
      if (
        (L.Util.setOptions(this, t),
        !this.options.allowEditing || !this._layer._map)
      ) {
        this.disable();
        return;
      }
      (this._map = this._layer._map),
        this.enabled() && this.disable(),
        this.applyOptions(),
        this._layer.on('remove', this.disable, this),
        (this._enabled = !0),
        this._fireEnable();
    },
    disable() {
      this.enabled() &&
        (this.disableLayerDrag(),
        this._layer.off('remove', this.disable, this),
        this._layer.off('contextmenu', this._removeMarker, this),
        this._layerEdited && this._fireUpdate(),
        (this._layerEdited = !1),
        this._fireDisable(),
        (this._enabled = !1));
    },
    enabled() {
      return this._enabled;
    },
    toggleEdit(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    applyOptions() {
      this.options.snappable
        ? this._initSnappableMarkers()
        : this._disableSnapping(),
        this.options.draggable
          ? this.enableLayerDrag()
          : this.disableLayerDrag(),
        this.options.preventMarkerRemoval ||
          this._layer.on('contextmenu', this._removeMarker, this);
    },
    _removeMarker(t) {
      let i = t.target;
      i.remove(), this._fireRemove(i), this._fireRemove(this._map, i);
    },
    _onDragEnd() {
      this._fireEdit(), (this._layerEdited = !0);
    },
    _initSnappableMarkers() {
      let t = this._layer;
      (this.options.snapDistance = this.options.snapDistance || 30),
        (this.options.snapSegment =
          this.options.snapSegment === void 0 ? !0 : this.options.snapSegment),
        t.off('pm:drag', this._handleSnapping, this),
        t.on('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.on('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this),
        t.on('pm:dragstart', this._unsnap, this);
    },
    _disableSnapping() {
      let t = this._layer;
      t.off('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this);
    },
  });
  var Be = le(er());
  var D0 = {
      filterMarkerGroup() {
        (this.markerCache = []),
          this.createCache(),
          this._layer.on('pm:edit', this.createCache, this),
          this.applyLimitFilters({}),
          this.throttledApplyLimitFilters ||
            (this.throttledApplyLimitFilters = L.Util.throttle(
              this.applyLimitFilters,
              100,
              this
            )),
          this._layer.on('pm:disable', this._removeMarkerLimitEvents, this),
          this._layer.on('remove', this._removeMarkerLimitEvents, this),
          this.options.limitMarkersToCount > -1 &&
            (this._layer.on('pm:vertexremoved', this._initMarkers, this),
            this._map.on('mousemove', this.throttledApplyLimitFilters, this));
      },
      _removeMarkerLimitEvents() {
        this._map.off('mousemove', this.throttledApplyLimitFilters, this),
          this._layer.off('pm:edit', this.createCache, this),
          this._layer.off('pm:disable', this._removeMarkerLimitEvents, this),
          this._layer.off('pm:vertexremoved', this._initMarkers, this);
      },
      createCache() {
        let t = [...this._markerGroup.getLayers(), ...this.markerCache];
        this.markerCache = t.filter((i, r, o) => o.indexOf(i) === r);
      },
      _removeFromCache(t) {
        let i = this.markerCache.indexOf(t);
        i > -1 && this.markerCache.splice(i, 1);
      },
      renderLimits(t) {
        this.markerCache.forEach((i) => {
          t.includes(i)
            ? this._markerGroup.addLayer(i)
            : this._markerGroup.removeLayer(i);
        });
      },
      applyLimitFilters({ latlng: t = { lat: 0, lng: 0 } }) {
        if (this._preventRenderMarkers) return;
        let r = [...this._filterClosestMarkers(t)];
        this.renderLimits(r);
      },
      _filterClosestMarkers(t) {
        let i = [...this.markerCache],
          r = this.options.limitMarkersToCount;
        return r === -1
          ? i
          : (i.sort((a, l) => {
              let u = a._latlng.distanceTo(t),
                c = l._latlng.distanceTo(t);
              return u - c;
            }),
            i.filter((a, l) => (r > -1 ? l < r : !0)));
      },
      _preventRenderMarkers: !1,
      _preventRenderingMarkers(t) {
        this._preventRenderMarkers = !!t;
      },
    },
    Nf = D0;
  wt.Line = wt.extend({
    includes: [Nf],
    _shape: 'Line',
    initialize(t) {
      (this._layer = t),
        (this._enabled = !1),
        (this._circleMarker = L.circleMarker([0, 0], {
          radius: 5,
          fillColor: 'white',
          fillOpacity: 1,
          className: 'pm-selectable',
        })),
        (this._proximityCursorMarker = L.marker([0, 0], {
          zIndexOffset: 110,
          icon: L.divIcon({ className: 'almost-over-marker pm-selectable' }),
          pane: 'markerPane',
        }));
    },
    enable(t) {
      let i = this.rgbToHex(
        L.DomUtil.getStyle(this._layer.getElement(), 'stroke')
      );
      if (
        (L.Util.setOptions(this, {
          ...t,
          color: i || this.options.defaultColor,
        }),
        (this._map = this._layer._map),
        !!this._map)
      ) {
        if (!this.options.allowEditing) {
          this.disable();
          return;
        }
        this.enabled() && this.disable(),
          (this._enabled = !0),
          this._initMarkers(),
          this.applyOptions(),
          this._layer.on('remove', this.disable, this),
          this.options.editArrows &&
            (this._layer.on('click', this._onLineClick, this),
            this._activateAlmostOver()),
          this.options.allowSelfIntersection ||
            this._layer.on(
              'pm:vertexremoved',
              this._handleSelfIntersectionOnVertexRemoval,
              this
            ),
          this.options.allowSelfIntersection
            ? (this.cachedColor = void 0)
            : (this._layer.options.color !== '#f00000ff'
                ? ((this.cachedColor = this._layer.options.color),
                  (this.isRed = !1))
                : (this.isRed = !0),
              this._handleLayerStyle()),
          this._fireEnable();
      }
    },
    disable() {
      if (
        !this.enabled() ||
        (this._map.pm.Dialog.editArrowLineDialog &&
          this._map.pm.Dialog.closeEditArrowLineDialog(),
        this._disableAlmostOver(),
        this._setLinesAsInactive(),
        this._dragging)
      )
        return;
      (this._shape = this._layer.hasArrowheads() ? 'ArrowLine' : 'Line'),
        (this._enabled = !1),
        this._markerGroup.clearLayers(),
        this._markerGroup.removeFrom(this._map),
        this._layer.off('remove', this.disable, this),
        this._layer.off('click', this._onLineClick, this),
        this._map.pm.Dialog.disableAllEditArrowLineDialogEvents(),
        L.Util.setOptions(this, { editArrows: !1 }),
        this.options.allowSelfIntersection ||
          this._layer.off(
            'pm:vertexremoved',
            this._handleSelfIntersectionOnVertexRemoval,
            this
          );
      let t = this._layer._path
        ? this._layer._path
        : this._layer._renderer._container;
      L.DomUtil.removeClass(t, 'leaflet-pm-draggable'),
        this._layerEdited && this._fireUpdate(),
        (this._layerEdited = !1),
        this._fireDisable();
    },
    enabled() {
      return this._enabled;
    },
    toggleEdit(t) {
      return this.enabled() ? this.disable() : this.enable(t), this.enabled();
    },
    applyOptions() {
      this.options.snappable
        ? this._initSnappableMarkers()
        : this._disableSnapping();
    },
    _activateAlmostOver() {
      this._map.almostOver.addLayer(this._layer),
        this._map.on('almost:over', (t) => {
          this._map.addLayer(this._circleMarker),
            this._map.addLayer(this._proximityCursorMarker),
            L.DomUtil.removeClass(
              this._circleMarker.getElement(),
              'leaflet-pm-draggable'
            ),
            L.DomUtil.removeClass(
              this._proximityCursorMarker.getElement(),
              'leaflet-pm-draggable'
            ),
            t.layer.setStyle({ weight: 6 }),
            t.layer.hasArrowheads() &&
              Object.values(t.layer.getArrowheads()._layers)?.forEach((i) =>
                i.setStyle({ weight: 5 })
              ),
            this._map.on('mousemove', this._syncProximityCursorMarker, this);
        }),
        this._map.on('almost:move', (t) => {
          this._circleMarker.setLatLng(t.latlng);
        }),
        this._map.on('almost:out', (t) => {
          this._map.removeLayer(this._circleMarker),
            this._map.removeLayer(this._proximityCursorMarker),
            t.layer.setStyle({ weight: 3 }),
            t.layer.hasArrowheads() && t.layer.setArrowStyle({ weight: 3 });
        }),
        this._map.on('almost:click', (t) => {
          t.layer.fire('click', this);
        });
    },
    _disableAlmostOver() {
      this._map.almostOver.removeLayer(this._layer),
        this._map.off('mousemove', this._syncProximityCursorMarker),
        this._map.off('almost:over'),
        this._map.off('almost:move'),
        this._map.off('almost:out'),
        this._map.off('almost:click');
    },
    _syncProximityCursorMarker(t) {
      this._proximityCursorMarker.setLatLng(t.latlng);
    },
    _onArrowEnabledChangedListener(t) {
      t.target.checked && !this._layer.hasArrowheads()
        ? this._layer.arrowheads(this.options.defaultArrowheadOptions)
        : !t.target.checked &&
          this._layer.hasArrowheads() &&
          this._layer.deleteArrowheads(),
        this._map.pm.Dialog.toggleEditArrowLinePropVisibility(t.target.checked),
        this._onArrowChange(t);
    },
    _onArrowFilledChangedListener(t) {
      (this._layer._arrowheadOptions.fill = t.target.checked),
        this._onArrowChange(t);
    },
    _onArrowFrequencyChangedListener(t) {
      (this._layer._arrowheadOptions.frequency =
        this._map.pm.Dialog._getEditArrowLineFrequency(t.target.value)),
        this._onArrowChange(t);
    },
    _onArrowAngleChangedListener(t) {
      (this._layer._arrowheadOptions.yawn = t.target.value),
        this._onArrowChange(t);
    },
    _onArrowSizeChangedListener(t) {
      (this._layer._arrowheadOptions.size = `${t.target.value}px`),
        this._onArrowChange(t);
    },
    _initMarkers() {
      let t = this._map,
        i = this._layer.getLatLngs();
      this._markerGroup && this._markerGroup.clearLayers(),
        (this._markerGroup = new L.FeatureGroup()),
        (this._markerGroup._pmTempLayer = !0);
      let r = (o) => {
        if (Array.isArray(o[0])) return o.map(r, this);
        let a = o.map(this._createMarker, this);
        return (
          this.options.hideMiddleMarkers !== !0 &&
            o.map((l, u) => {
              let c = this.isPolygon() ? (u + 1) % o.length : u + 1;
              return this._createMiddleMarker(a[u], a[c]);
            }),
          a
        );
      };
      (this._markers = r(i)),
        this.filterMarkerGroup(),
        t.addLayer(this._markerGroup);
    },
    _createMarker(t) {
      let i = new L.Marker(t, {
        draggable: !0,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(i, 'vertexPane'),
        (i._pmTempLayer = !0),
        this.options.rotate
          ? (i.on('dragstart', this._onRotateStart, this),
            i.on('drag', this._onRotate, this),
            i.on('dragend', this._onRotateEnd, this))
          : (i.on('click', this._onVertexClick, this),
            i.on('dragstart', this._onMarkerDragStart, this),
            i.on('move', this._onMarkerDrag, this),
            i.on('dragend', this._onMarkerDragEnd, this),
            this.options.preventMarkerRemoval ||
              i.on(this.options.removeVertexOn, this._removeMarker, this)),
        this._markerGroup.addLayer(i),
        i
      );
    },
    _createMiddleMarker(t, i) {
      if (!t || !i) return !1;
      let r = L.PM.Utils.calcMiddleLatLng(
          this._map,
          t.getLatLng(),
          i.getLatLng()
        ),
        o = this._createMarker(r),
        a = L.divIcon({ className: 'marker-icon marker-icon-middle' });
      return (
        o.setIcon(a),
        (o.leftM = t),
        (o.rightM = i),
        (t._middleMarkerNext = o),
        (i._middleMarkerPrev = o),
        o.on(this.options.addVertexOn, this._onMiddleMarkerClick, this),
        o.on('movestart', this._onMiddleMarkerMoveStart, this),
        o
      );
    },
    _onMiddleMarkerClick(t) {
      let i = t.target;
      if (!this._vertexValidation('add', t)) return;
      let r = L.divIcon({ className: 'marker-icon' });
      i.setIcon(r), this._addMarker(i, i.leftM, i.rightM);
    },
    _onMiddleMarkerMoveStart(t) {
      let i = t.target;
      if (
        (i.on('moveend', this._onMiddleMarkerMoveEnd, this),
        !this._vertexValidation('add', t))
      ) {
        i.on('move', this._onMiddleMarkerMovePrevent, this);
        return;
      }
      (i._dragging = !0), this._addMarker(i, i.leftM, i.rightM);
    },
    _onMiddleMarkerMovePrevent(t) {
      let i = t.target;
      this._vertexValidationDrag(i);
    },
    _onMiddleMarkerMoveEnd(t) {
      let i = t.target;
      if (
        (i.off('move', this._onMiddleMarkerMovePrevent, this),
        i.off('moveend', this._onMiddleMarkerMoveEnd, this),
        !this._vertexValidationDragEnd(i))
      )
        return;
      let r = L.divIcon({ className: 'marker-icon' });
      i.setIcon(r),
        setTimeout(() => {
          delete i._dragging;
        }, 100);
    },
    _onLineClick(t) {
      this._layer.hasArrowheads() ||
        (this._layer.arrowheads(this.options.defaultArrowheadOptions),
        this._onArrowChange(t));
      let i = this._map.pm.Dialog.getEditArrowLineDialogBody({
        ...this._layer._arrowheadOptions,
        showArrowToggle: !0,
      });
      this._map.pm.Dialog.editArrowLineDialog.setContent(
        this.options.dialogContent || i
      ),
        this._map.pm.Dialog.editArrowLineDialog.open(),
        this._map.pm.Dialog.initEditArrowLineEnabledChangedListener(
          this._onArrowEnabledChangedListener,
          this
        ),
        this._map.pm.Dialog.initEditArrowLineFilledChangedListener(
          this._onArrowFilledChangedListener,
          this
        ),
        this._map.pm.Dialog.initEditArrowLineFrequencyChangedListener(
          this._onArrowFrequencyChangedListener,
          this
        ),
        this._map.pm.Dialog.initEditArrowLineAngleChangedListener(
          this._onArrowAngleChangedListener,
          this
        ),
        this._map.pm.Dialog.initEditArrowLineSizeChangedListener(
          this._onArrowSizeChangedListener,
          this
        ),
        this._setLineAsActive();
    },
    _setLineAsActive() {
      this._setLinesAsInactive(),
        (this._active = !0),
        this._markerGroup.eachLayer((t) => {
          let i = t.getIcon();
          (i.options.className += ' active-shape'), t.setIcon(i);
        });
    },
    _setLinesAsInactive() {
      this._map.pm.getActiveGeomanLayers().forEach((i) => {
        (i.pm._active = !1),
          i.pm._markerGroup.eachLayer((r) => {
            let o = r.getIcon();
            (o.options.className = 'marker-icon'), r.setIcon(o);
          });
      });
    },
    _onArrowChange(t) {
      (this._layerEdited = !0),
        this._layer.hasArrowheads()
          ? (this._shape = 'ArrowLine')
          : (this._shape = 'Line'),
        this._fireArrowheadEditChangeEvent(this._layer._arrowheadOptions),
        this._fireEdit(),
        this._fireMapResetView('Edit', { event: t });
    },
    _addMarker(t, i, r) {
      t.off('movestart', this._onMiddleMarkerMoveStart, this),
        t.off(this.options.addVertexOn, this._onMiddleMarkerClick, this);
      let o = t.getLatLng(),
        a = this._layer._latlngs;
      delete t.leftM, delete t.rightM;
      let {
          indexPath: l,
          index: u,
          parentPath: c,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, i),
        d = l.length > 1 ? (0, Be.default)(a, c) : a,
        p = l.length > 1 ? (0, Be.default)(this._markers, c) : this._markers;
      d.splice(u + 1, 0, o),
        p.splice(u + 1, 0, t),
        this._layer.setLatLngs(a),
        this.options.hideMiddleMarkers !== !0 &&
          (this._createMiddleMarker(i, t), this._createMiddleMarker(t, r)),
        this._fireEdit(),
        (this._layerEdited = !0),
        this._fireChange(this._layer.getLatLngs(), 'Edit'),
        this._fireVertexAdded(
          t,
          L.PM.Utils.findDeepMarkerIndex(this._markers, t).indexPath,
          o
        ),
        this.options.snappable && this._initSnappableMarkers();
    },
    hasSelfIntersection() {
      return ve(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersectionOnVertexRemoval() {
      this._handleLayerStyle(!0) &&
        (this._layer.setLatLngs(this._coordsBeforeEdit),
        (this._coordsBeforeEdit = null),
        this._initMarkers());
    },
    _handleLayerStyle(t) {
      let i = this._layer,
        r,
        o;
      if (
        (this.options.allowSelfIntersection
          ? (r = !1)
          : ((o = ve(this._layer.toGeoJSON(15))), (r = o.features.length > 0)),
        r)
      ) {
        if (
          (!this.options.allowSelfIntersection &&
            this.options.allowSelfIntersectionEdit &&
            this._updateDisabledMarkerStyle(this._markers, !0),
          this.isRed)
        )
          return r;
        t
          ? this._flashLayer()
          : (i.setStyle({ color: '#f00000ff' }), (this.isRed = !0)),
          this._fireIntersect(o);
      } else
        i.setStyle({ color: this.cachedColor }),
          (this.isRed = !1),
          !this.options.allowSelfIntersection &&
            this.options.allowSelfIntersectionEdit &&
            this._updateDisabledMarkerStyle(this._markers, !1);
      return r;
    },
    _flashLayer() {
      this.cachedColor || (this.cachedColor = this._layer.options.color),
        this._layer.setStyle({ color: '#f00000ff' }),
        (this.isRed = !0),
        window.setTimeout(() => {
          this._layer.setStyle({ color: this.cachedColor }), (this.isRed = !1);
        }, 200);
    },
    _updateDisabledMarkerStyle(t, i) {
      t.forEach((r) => {
        Array.isArray(r)
          ? this._updateDisabledMarkerStyle(r, i)
          : r._icon &&
            (i && !this._checkMarkerAllowedToDrag(r)
              ? L.DomUtil.addClass(r._icon, 'vertexmarker-disabled')
              : L.DomUtil.removeClass(r._icon, 'vertexmarker-disabled'));
      });
    },
    _removeMarker(t) {
      let i = t.target;
      if (!this._vertexValidation('remove', t)) return;
      this.options.allowSelfIntersection ||
        (this._coordsBeforeEdit = ye(this._layer, this._layer.getLatLngs()));
      let r = this._layer.getLatLngs(),
        {
          indexPath: o,
          index: a,
          parentPath: l,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      if (!o) return;
      let u = o.length > 1 ? (0, Be.default)(r, l) : r,
        c = o.length > 1 ? (0, Be.default)(this._markers, l) : this._markers;
      if (
        !this.options.removeLayerBelowMinVertexCount &&
        (u.length <= 2 || (this.isPolygon() && u.length <= 3))
      ) {
        this._flashLayer();
        return;
      }
      u.splice(a, 1),
        this._layer.setLatLngs(r),
        this.isPolygon() && u.length <= 2 && u.splice(0, u.length);
      let d = !1;
      if (
        (u.length <= 1 &&
          (u.splice(0, u.length),
          l.length > 1 && o.length > 1 && (r = rr(r)),
          this._layer.setLatLngs(r),
          this._initMarkers(),
          (d = !0)),
        ir(r) || this._layer.remove(),
        (r = rr(r)),
        this._layer.setLatLngs(r),
        (this._markers = rr(this._markers)),
        !d &&
          ((c =
            o.length > 1 ? (0, Be.default)(this._markers, l) : this._markers),
          i._middleMarkerPrev &&
            (this._markerGroup.removeLayer(i._middleMarkerPrev),
            this._removeFromCache(i._middleMarkerPrev)),
          i._middleMarkerNext &&
            (this._markerGroup.removeLayer(i._middleMarkerNext),
            this._removeFromCache(i._middleMarkerNext)),
          this._markerGroup.removeLayer(i),
          this._removeFromCache(i),
          c))
      ) {
        let p, y;
        if (
          (this.isPolygon()
            ? ((p = (a + 1) % c.length), (y = (a + (c.length - 1)) % c.length))
            : ((y = a - 1 < 0 ? void 0 : a - 1),
              (p = a + 1 >= c.length ? void 0 : a + 1)),
          p !== y)
        ) {
          let b = c[y],
            D = c[p];
          this.options.hideMiddleMarkers !== !0 &&
            this._createMiddleMarker(b, D);
        }
        c.splice(a, 1);
      }
      this._fireEdit(),
        (this._layerEdited = !0),
        this._fireVertexRemoved(i, o),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    updatePolygonCoordsFromMarkerDrag(t) {
      let i = this._layer.getLatLngs(),
        r = t.getLatLng(),
        {
          indexPath: o,
          index: a,
          parentPath: l,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, t);
      (o.length > 1 ? (0, Be.default)(i, l) : i).splice(a, 1, r),
        this._layer.setLatLngs(i);
    },
    _getNeighborMarkers(t) {
      let {
          indexPath: i,
          index: r,
          parentPath: o,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, t),
        a = i.length > 1 ? (0, Be.default)(this._markers, o) : this._markers,
        l = (r + 1) % a.length,
        u = (r + (a.length - 1)) % a.length,
        c = a[u],
        d = a[l];
      return { prevMarker: c, nextMarker: d };
    },
    _checkMarkerAllowedToDrag(t) {
      let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(t),
        o = L.polyline([i.getLatLng(), t.getLatLng()]),
        a = L.polyline([t.getLatLng(), r.getLatLng()]),
        l = Qt(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.length,
        u = Qt(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.length;
      return (
        t.getLatLng() === this._markers[0][0].getLatLng()
          ? (u += 1)
          : t.getLatLng() ===
              this._markers[0][this._markers[0].length - 1].getLatLng() &&
            (l += 1),
        !(l <= 2 && u <= 2)
      );
    },
    _onMarkerDragStart(t) {
      let i = t.target;
      if (
        (this.cachedColor || (this.cachedColor = this._layer.options.color),
        !this._vertexValidation('move', t))
      )
        return;
      let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireMarkerDragStart(t, r),
        this.options.allowSelfIntersection ||
          (this._coordsBeforeEdit = ye(this._layer, this._layer.getLatLngs())),
        !this.options.allowSelfIntersection &&
        this.options.allowSelfIntersectionEdit &&
        this.hasSelfIntersection()
          ? (this._markerAllowedToDrag = this._checkMarkerAllowedToDrag(i))
          : (this._markerAllowedToDrag = null);
    },
    _onMarkerDrag(t) {
      let i = t.target;
      if (!this._vertexValidationDrag(i)) return;
      let {
        indexPath: r,
        index: o,
        parentPath: a,
      } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      if (!r) return;
      if (
        !this.options.allowSelfIntersection &&
        this.options.allowSelfIntersectionEdit &&
        this.hasSelfIntersection() &&
        this._markerAllowedToDrag === !1
      ) {
        this._layer.setLatLngs(this._coordsBeforeEdit),
          this._initMarkers(),
          this._handleLayerStyle();
        return;
      }
      this.updatePolygonCoordsFromMarkerDrag(i);
      let l = r.length > 1 ? (0, Be.default)(this._markers, a) : this._markers,
        u = (o + 1) % l.length,
        c = (o + (l.length - 1)) % l.length,
        d = i.getLatLng(),
        p = l[c].getLatLng(),
        y = l[u].getLatLng();
      if (i._middleMarkerNext) {
        let b = L.PM.Utils.calcMiddleLatLng(this._map, d, y);
        i._middleMarkerNext.setLatLng(b);
      }
      if (i._middleMarkerPrev) {
        let b = L.PM.Utils.calcMiddleLatLng(this._map, d, p);
        i._middleMarkerPrev.setLatLng(b);
      }
      this.options.allowSelfIntersection || this._handleLayerStyle(),
        this._fireMarkerDrag(t, r),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    _onMarkerDragEnd(t) {
      let i = t.target;
      if (!this._vertexValidationDragEnd(i)) return;
      let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i),
        o = this.hasSelfIntersection();
      o &&
        this.options.allowSelfIntersectionEdit &&
        this._markerAllowedToDrag &&
        (o = !1);
      let a = !this.options.allowSelfIntersection && o;
      if ((this._fireMarkerDragEnd(t, r, a), a)) {
        this._layer.setLatLngs(this._coordsBeforeEdit),
          (this._coordsBeforeEdit = null),
          this._initMarkers(),
          this.options.snappable && this._initSnappableMarkers(),
          this._handleLayerStyle(),
          this._fireLayerReset(t, r);
        return;
      }
      !this.options.allowSelfIntersection &&
        this.options.allowSelfIntersectionEdit &&
        this._handleLayerStyle(),
        this._fireEdit(),
        (this._layerEdited = !0),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    _onVertexClick(t) {
      let i = t.target;
      if (i._dragging) return;
      let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireVertexClick(t, r);
    },
  });
  wt.Polygon = wt.Line.extend({
    _shape: 'Polygon',
    _checkMarkerAllowedToDrag(t) {
      let { prevMarker: i, nextMarker: r } = this._getNeighborMarkers(t),
        o = L.polyline([i.getLatLng(), t.getLatLng()]),
        a = L.polyline([t.getLatLng(), r.getLatLng()]),
        l = Qt(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.length,
        u = Qt(this._layer.toGeoJSON(15), a.toGeoJSON(15)).features.length;
      return !(l <= 2 && u <= 2);
    },
  });
  wt.Rectangle = wt.Polygon.extend({
    _shape: 'Rectangle',
    _initMarkers() {
      let t = this._map,
        i = this._findCorners();
      this._markerGroup && this._markerGroup.clearLayers(),
        (this._markerGroup = new L.FeatureGroup()),
        (this._markerGroup._pmTempLayer = !0),
        t.addLayer(this._markerGroup),
        (this._markers = []),
        (this._markers[0] = i.map(this._createMarker, this)),
        ([this._cornerMarkers] = this._markers),
        this._layer.getLatLngs()[0].forEach((r, o) => {
          let a = this._cornerMarkers.find((l) => l._index === o);
          a && a.setLatLng(r);
        });
    },
    applyOptions() {
      this.options.snappable
        ? this._initSnappableMarkers()
        : this._disableSnapping(),
        this._addMarkerEvents();
    },
    _createMarker(t, i) {
      let r = new L.Marker(t, {
        draggable: !0,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(r, 'vertexPane'),
        (r._origLatLng = t),
        (r._index = i),
        (r._pmTempLayer = !0),
        r.on('click', this._onVertexClick, this),
        this._markerGroup.addLayer(r),
        r
      );
    },
    _addMarkerEvents() {
      this._markers[0].forEach((t) => {
        t.on('dragstart', this._onMarkerDragStart, this),
          t.on('drag', this._onMarkerDrag, this),
          t.on('dragend', this._onMarkerDragEnd, this),
          this.options.preventMarkerRemoval ||
            t.on('contextmenu', this._removeMarker, this);
      });
    },
    _removeMarker() {
      return null;
    },
    _onMarkerDragStart(t) {
      if (!this._vertexValidation('move', t)) return;
      let i = t.target,
        r = this._cornerMarkers;
      (i._oppositeCornerLatLng = r
        .find((a) => a._index === (i._index + 2) % 4)
        .getLatLng()),
        (i._snapped = !1);
      let { indexPath: o } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireMarkerDragStart(t, o);
    },
    _onMarkerDrag(t) {
      let i = t.target;
      if (!this._vertexValidationDrag(i) || i._index === void 0) return;
      this._adjustRectangleForMarkerMove(i);
      let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireMarkerDrag(t, r),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    _onMarkerDragEnd(t) {
      let i = t.target;
      if (!this._vertexValidationDragEnd(i)) return;
      this._cornerMarkers.forEach((o) => {
        delete o._oppositeCornerLatLng;
      });
      let { indexPath: r } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireMarkerDragEnd(t, r),
        this._fireEdit(),
        (this._layerEdited = !0),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    _adjustRectangleForMarkerMove(t) {
      L.extend(t._origLatLng, t._latlng);
      let i = L.PM.Utils._getRotatedRectangle(
        t.getLatLng(),
        t._oppositeCornerLatLng,
        this.getAngle(),
        this._map
      );
      this._layer.setLatLngs(i), this._adjustAllMarkers(), this._layer.redraw();
    },
    _adjustAllMarkers() {
      let t = this._layer.getLatLngs()[0];
      t && t.length !== 4 && t.length > 0
        ? (t.forEach((r, o) => {
            this._cornerMarkers[o].setLatLng(r);
          }),
          this._cornerMarkers.slice(t.length).forEach((r) => {
            r.setLatLng(t[0]);
          }))
        : !t || !t.length
          ? console.error('The layer has no LatLngs')
          : this._cornerMarkers.forEach((i) => {
              i.setLatLng(t[i._index]);
            });
    },
    _findCorners() {
      this._angle === void 0 &&
        this.setInitAngle(
          nr(
            this._map,
            this._layer.getLatLngs()[0][0],
            this._layer.getLatLngs()[0][1]
          ) || 0
        );
      let t = this._layer.getLatLngs()[0];
      return L.PM.Utils._getRotatedRectangle(
        t[0],
        t[2],
        this.getAngle(),
        this._map || this
      );
    },
  });
  wt.CircleMarker = wt.extend({
    _shape: 'CircleMarker',
    initialize(t) {
      (this._layer = t),
        (this._enabled = !1),
        (this._minRadiusOption = 'minRadiusCircleMarker'),
        (this._maxRadiusOption = 'maxRadiusCircleMarker'),
        (this._editableOption = 'resizeableCircleMarker'),
        this._updateHiddenPolyCircle();
    },
    enable(t = { draggable: !0, snappable: !0 }) {
      let i = this.rgbToHex(
        L.DomUtil.getStyle(this._layer.getElement(), 'stroke')
      );
      if (
        (L.Util.setOptions(this, {
          ...t,
          color: i || this.options.defaultColor,
        }),
        this.options.editable &&
          ((this.options.resizeableCircleMarker = this.options.editable),
          delete this.options.editable),
        !this.options.allowEditing || !this._layer._map)
      ) {
        this.disable();
        return;
      }
      (this._map = this._layer._map),
        this.enabled() && this.disable(),
        this.applyOptions(),
        this._layer.on('remove', this.disable, this),
        (this._enabled = !0),
        this._extendingEnable(),
        this._updateHiddenPolyCircle(),
        this._fireEnable();
    },
    _extendingEnable() {
      this._layer.on('pm:dragstart', this._onDragStart, this),
        this._layer.on('pm:drag', this._onMarkerDrag, this),
        this._layer.on('pm:dragend', this._onMarkerDragEnd, this);
    },
    disable() {
      this.dragging() ||
        (this._map || (this._map = this._layer._map),
        this._map &&
          this.enabled() &&
          (this.layerDragEnabled() && this.disableLayerDrag(),
          this.options[this._editableOption]
            ? (this._helperLayers && this._helperLayers.clearLayers(),
              this._map.off('move', this._syncMarkers, this),
              this._outerMarker.off(
                'drag',
                this._handleOuterMarkerSnapping,
                this
              ))
            : this._map.off('move', this._updateHiddenPolyCircle, this),
          this._extendingDisable(),
          this._layer.off('remove', this.disable, this),
          this._layerEdited && this._fireUpdate(),
          (this._layerEdited = !1),
          this._fireDisable(),
          (this._enabled = !1)));
    },
    _extendingDisable() {
      this._layer.off('contextmenu', this._removeMarker, this);
    },
    enabled() {
      return this._enabled;
    },
    toggleEdit(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    applyOptions() {
      this.options[this._editableOption]
        ? (this._initMarkers(),
          this._map.on('move', this._syncMarkers, this),
          this.options.snappable
            ? (this._initSnappableMarkers(),
              this._outerMarker.on(
                'drag',
                this._handleOuterMarkerSnapping,
                this
              ),
              this._outerMarker.on('move', this._syncHintLine, this),
              this._outerMarker.on('move', this._syncCircleRadius, this),
              this._centerMarker.on('move', this._moveCircle, this))
            : this._disableSnapping())
        : (this.options.draggable && this.enableLayerDrag(),
          this._map.on('move', this._updateHiddenPolyCircle, this),
          this.options.snappable
            ? this._initSnappableMarkersDrag()
            : this._disableSnappingDrag()),
        this._extendingApplyOptions();
    },
    _extendingApplyOptions() {
      this.options.preventMarkerRemoval ||
        this._layer.on('contextmenu', this._removeMarker, this);
    },
    _initMarkers() {
      let t = this._map;
      this._helperLayers && this._helperLayers.clearLayers(),
        (this._helperLayers = new L.FeatureGroup()),
        (this._helperLayers._pmTempLayer = !0),
        this._helperLayers.addTo(t);
      let i = this._layer.getLatLng(),
        r = this._layer._radius,
        o = this._getLatLngOnCircle(i, r);
      (this._centerMarker = this._createCenterMarker(i)),
        (this._outerMarker = this._createOuterMarker(o)),
        (this._markers = [this._centerMarker, this._outerMarker]),
        this._createHintLine(this._centerMarker, this._outerMarker);
    },
    _getLatLngOnCircle(t, i) {
      let r = this._map.project(t),
        o = L.point(r.x + i, r.y);
      return this._map.unproject(o);
    },
    _createHintLine(t, i) {
      let r = t.getLatLng(),
        o = i.getLatLng();
      (this._hintline = L.polyline([r, o], this.options.hintlineStyle)),
        this._setPane(this._hintline, 'layerPane'),
        (this._hintline._pmTempLayer = !0),
        this._helperLayers.addLayer(this._hintline);
    },
    _createCenterMarker(t) {
      let i = this._createMarker(t);
      return (
        this.options.draggable
          ? L.DomUtil.addClass(i._icon, 'leaflet-pm-draggable')
          : i.dragging.disable(),
        i
      );
    },
    _createOuterMarker(t) {
      let i = this._createMarker(t);
      return i.on('drag', this._resizeCircle, this), i;
    },
    _createMarker(t) {
      let i = new L.Marker(t, {
        draggable: !0,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(i, 'vertexPane'),
        (i._origLatLng = t),
        (i._pmTempLayer = !0),
        i.on('dragstart', this._onMarkerDragStart, this),
        i.on('drag', this._onMarkerDrag, this),
        i.on('dragend', this._onMarkerDragEnd, this),
        i.on('click', this._onVertexClick, this),
        this._helperLayers.addLayer(i),
        i
      );
    },
    _moveCircle(t) {
      if (t.target._cancelDragEventChain) return;
      let r = this._centerMarker.getLatLng();
      this._layer.setLatLng(r);
      let o = this._layer._radius,
        a = this._getLatLngOnCircle(r, o);
      (this._outerMarker._latlng = a),
        this._outerMarker.update(),
        this._syncHintLine(),
        this._updateHiddenPolyCircle(),
        this._fireCenterPlaced('Edit'),
        this._fireChange(this._layer.getLatLng(), 'Edit');
    },
    _syncMarkers() {
      let t = this._layer.getLatLng(),
        i = this._layer._radius,
        r = this._getLatLngOnCircle(t, i);
      this._outerMarker.setLatLng(r),
        this._centerMarker.setLatLng(t),
        this._syncHintLine(),
        this._updateHiddenPolyCircle();
    },
    _resizeCircle() {
      this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker()),
        this._syncHintLine(),
        this._syncCircleRadius();
    },
    _syncCircleRadius() {
      let t = this._centerMarker.getLatLng(),
        i = this._outerMarker.getLatLng(),
        r = this._distanceCalculation(t, i);
      this.options[this._minRadiusOption] &&
      r < this.options[this._minRadiusOption]
        ? this._layer.setRadius(this.options[this._minRadiusOption])
        : this.options[this._maxRadiusOption] &&
            r > this.options[this._maxRadiusOption]
          ? this._layer.setRadius(this.options[this._maxRadiusOption])
          : this._layer.setRadius(r),
        this._updateHiddenPolyCircle(),
        this._fireChange(this._layer.getLatLng(), 'Edit');
    },
    _syncHintLine() {
      let t = this._centerMarker.getLatLng(),
        i = this._outerMarker.getLatLng();
      this._hintline.setLatLngs([t, i]);
    },
    _removeMarker() {
      this.options[this._editableOption] && this.disable(),
        this._layer.remove(),
        this._fireRemove(this._layer),
        this._fireRemove(this._map, this._layer);
    },
    _onDragStart() {
      this._map.pm.Draw.CircleMarker._layerIsDragging = !0;
    },
    _onMarkerDragStart(t) {
      this._vertexValidation('move', t) && this._fireMarkerDragStart(t);
    },
    _onMarkerDrag(t) {
      let i = t.target;
      (i instanceof L.Marker && !this._vertexValidationDrag(i)) ||
        this._fireMarkerDrag(t);
    },
    _onMarkerDragEnd(t) {
      this._extedingMarkerDragEnd();
      let i = t.target;
      this._vertexValidationDragEnd(i) &&
        (this.options[this._editableOption] &&
          (this._fireEdit(), (this._layerEdited = !0)),
        this._fireMarkerDragEnd(t));
    },
    _extedingMarkerDragEnd() {
      this._map.pm.Draw.CircleMarker._layerIsDragging = !1;
    },
    _initSnappableMarkersDrag() {
      let t = this._layer;
      (this.options.snapDistance = this.options.snapDistance || 30),
        (this.options.snapSegment =
          this.options.snapSegment === void 0 ? !0 : this.options.snapSegment),
        t.off('pm:drag', this._handleSnapping, this),
        t.on('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.on('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this),
        t.on('pm:dragstart', this._unsnap, this);
    },
    _disableSnappingDrag() {
      let t = this._layer;
      t.off('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this);
    },
    _updateHiddenPolyCircle() {
      let t = this._layer._map || this._map;
      if (t) {
        let i = L.PM.Utils.pxRadiusToMeterRadius(
            this._layer.getRadius(),
            t,
            this._layer.getLatLng()
          ),
          r = L.circle(this._layer.getLatLng(), this._layer.options);
        r.setRadius(i);
        let o = t && t.pm._isCRSSimple();
        this._hiddenPolyCircle
          ? this._hiddenPolyCircle.setLatLngs(
              L.PM.Utils.circleToPolygon(r, 200, !o).getLatLngs()
            )
          : (this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(r, 200, !o)),
          this._hiddenPolyCircle._parentCopy ||
            (this._hiddenPolyCircle._parentCopy = this._layer);
      }
    },
    _getNewDestinationOfOuterMarker() {
      let t = this._centerMarker.getLatLng(),
        i = this._outerMarker.getLatLng(),
        r = this._distanceCalculation(t, i);
      return (
        this.options[this._minRadiusOption] &&
        r < this.options[this._minRadiusOption]
          ? (i = xi(this._map, t, i, this._getMinDistanceInMeter(t)))
          : this.options[this._maxRadiusOption] &&
            r > this.options[this._maxRadiusOption] &&
            (i = xi(this._map, t, i, this._getMaxDistanceInMeter(t))),
        i
      );
    },
    _handleOuterMarkerSnapping() {
      if (this._outerMarker._snapped) {
        let t = this._centerMarker.getLatLng(),
          i = this._outerMarker.getLatLng(),
          r = this._distanceCalculation(t, i);
        this.options[this._minRadiusOption] &&
        r < this.options[this._minRadiusOption]
          ? this._outerMarker.setLatLng(this._outerMarker._orgLatLng)
          : this.options[this._maxRadiusOption] &&
            r > this.options[this._maxRadiusOption] &&
            this._outerMarker.setLatLng(this._outerMarker._orgLatLng);
      }
      this._outerMarker.setLatLng(this._getNewDestinationOfOuterMarker());
    },
    _distanceCalculation(t, i) {
      return this._map.project(t).distanceTo(this._map.project(i));
    },
    _getMinDistanceInMeter(t) {
      return L.PM.Utils.pxRadiusToMeterRadius(
        this.options[this._minRadiusOption],
        this._map,
        t
      );
    },
    _getMaxDistanceInMeter(t) {
      return L.PM.Utils.pxRadiusToMeterRadius(
        this.options[this._maxRadiusOption],
        this._map,
        t
      );
    },
    _onVertexClick(t) {
      t.target._dragging || this._fireVertexClick(t, void 0);
    },
  });
  wt.Circle = wt.CircleMarker.extend({
    _shape: 'Circle',
    initialize(t) {
      (this._layer = t),
        (this._enabled = !1),
        (this._minRadiusOption = 'minRadiusCircle'),
        (this._maxRadiusOption = 'maxRadiusCircle'),
        (this._editableOption = 'resizableCircle'),
        this._updateHiddenPolyCircle();
    },
    enable(t) {
      L.PM.Edit.CircleMarker.prototype.enable.call(this, t || {});
    },
    _extendingEnable() {},
    _extendingDisable() {
      this._layer.off('remove', this.disable, this);
      let t = this._layer._path
        ? this._layer._path
        : this._layer._renderer._container;
      L.DomUtil.removeClass(t, 'leaflet-pm-draggable');
    },
    _extendingApplyOptions() {},
    _syncMarkers() {},
    _removeMarker() {},
    _onDragStart() {},
    _extedingMarkerDragEnd() {},
    _updateHiddenPolyCircle() {
      let t = this._map && this._map.pm._isCRSSimple();
      this._hiddenPolyCircle
        ? this._hiddenPolyCircle.setLatLngs(
            L.PM.Utils.circleToPolygon(this._layer, 200, !t).getLatLngs()
          )
        : (this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(
            this._layer,
            200,
            !t
          )),
        this._hiddenPolyCircle._parentCopy ||
          (this._hiddenPolyCircle._parentCopy = this._layer);
    },
    _distanceCalculation(t, i) {
      return this._map.distance(t, i);
    },
    _getMinDistanceInMeter() {
      return this.options[this._minRadiusOption];
    },
    _getMaxDistanceInMeter() {
      return this.options[this._maxRadiusOption];
    },
    _onVertexClick(t) {
      t.target._dragging || this._fireVertexClick(t, void 0);
    },
  });
  wt.ImageOverlay = wt.extend({
    _shape: 'ImageOverlay',
    initialize(t) {
      (this._layer = t), (this._enabled = !1);
    },
    toggleEdit(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    enabled() {
      return this._enabled;
    },
    enable(t = { draggable: !0, snappable: !0 }) {
      if (
        (L.Util.setOptions(this, t),
        (this._map = this._layer._map),
        !!this._map)
      ) {
        if (!this.options.allowEditing) {
          this.disable();
          return;
        }
        this.enabled() || this.disable(),
          this.enableLayerDrag(),
          this._layer.on('remove', this.disable, this),
          (this._enabled = !0),
          (this._otherSnapLayers = this._findCorners()),
          this._fireEnable();
      }
    },
    disable() {
      this._dragging ||
        (this._map || (this._map = this._layer._map),
        this.disableLayerDrag(),
        this._layer.off('remove', this.disable, this),
        this.enabled() ||
          (this._layerEdited && this._fireUpdate(),
          (this._layerEdited = !1),
          this._fireDisable()),
        (this._enabled = !1));
    },
    _findCorners() {
      let t = this._layer.getBounds(),
        i = t.getNorthWest(),
        r = t.getNorthEast(),
        o = t.getSouthEast(),
        a = t.getSouthWest();
      return [i, r, o, a];
    },
  });
  wt.Text = wt.extend({
    _shape: 'Text',
    initialize(t) {
      (this._layer = t), (this._enabled = !1);
    },
    enable(t) {
      if ((L.Util.setOptions(this, t), !!this.textArea)) {
        if (!this.options.allowEditing || !this._layer._map) {
          this.disable();
          return;
        }
        (this._map = this._layer._map),
          this.enabled() && this.disable(),
          this.applyOptions(),
          (this._safeToCacheDragState = !0),
          this._focusChange(),
          (this.textArea.readOnly = !1),
          this.textArea.classList.remove('pm-disabled'),
          this._layer.on('remove', this.disable, this),
          L.DomEvent.on(this.textArea, 'input', this._autoResize, this),
          L.DomEvent.on(this.textArea, 'focus', this._focusChange, this),
          L.DomEvent.on(this.textArea, 'blur', this._focusChange, this),
          this._layer.on('dblclick', L.DomEvent.stop),
          L.DomEvent.off(
            this.textArea,
            'mousedown',
            this._preventTextSelection
          ),
          (this._enabled = !0),
          this._fireEnable();
      }
    },
    disable() {
      if (!this.enabled()) return;
      this._layer.off('remove', this.disable, this),
        L.DomEvent.off(this.textArea, 'input', this._autoResize, this),
        L.DomEvent.off(this.textArea, 'focus', this._focusChange, this),
        L.DomEvent.off(this.textArea, 'blur', this._focusChange, this),
        L.DomEvent.off(document, 'click', this._documentClick, this),
        this._focusChange(),
        (this.textArea.readOnly = !0),
        this.textArea.classList.add('pm-disabled');
      let t = document.activeElement;
      this.textArea.focus(),
        (this.textArea.selectionStart = 0),
        (this.textArea.selectionEnd = 0),
        L.DomEvent.on(this.textArea, 'mousedown', this._preventTextSelection),
        t.focus(),
        (this._disableOnBlurActive = !1),
        this._layerEdited && this._fireUpdate(),
        (this._layerEdited = !1),
        this._fireDisable(),
        (this._enabled = !1);
    },
    enabled() {
      return this._enabled;
    },
    toggleEdit(t) {
      this.enabled() ? this.disable() : this.enable(t);
    },
    applyOptions() {
      this.options.snappable
        ? this._initSnappableMarkers()
        : this._disableSnapping();
    },
    _initSnappableMarkers() {
      let t = this._layer;
      (this.options.snapDistance = this.options.snapDistance || 30),
        (this.options.snapSegment =
          this.options.snapSegment === void 0 ? !0 : this.options.snapSegment),
        t.off('pm:drag', this._handleSnapping, this),
        t.on('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.on('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this),
        t.on('pm:dragstart', this._unsnap, this);
    },
    _disableSnapping() {
      let t = this._layer;
      t.off('pm:drag', this._handleSnapping, this),
        t.off('pm:dragend', this._cleanupSnapping, this),
        t.off('pm:dragstart', this._unsnap, this);
    },
    _autoResize() {
      (this.textArea.style.height = '1px'), (this.textArea.style.width = '3px');
      let t = this.textArea.scrollHeight > 21 ? this.textArea.scrollHeight : 21,
        i = this.textArea.scrollWidth > 16 ? this.textArea.scrollWidth + 6 : 22;
      (this.textArea.style.height = `${t}px`),
        (this.textArea.style.width = `${i}px`),
        (this._layer.options.text = this.getText()),
        this._fireTextChange(this.getText());
    },
    _disableOnBlur() {
      (this._disableOnBlurActive = !0),
        setTimeout(() => {
          this.enabled() &&
            L.DomEvent.on(document, 'click', this._documentClick, this);
        }, 100);
    },
    _documentClick(t) {
      t.target !== this.textArea &&
        (this.disable(),
        !this.getText() && this.options.removeIfEmpty && this.remove());
    },
    _focusChange(t = {}) {
      let i = this._hasFocus;
      (this._hasFocus = t.type === 'focus'),
        !i != !this._hasFocus &&
          (this._hasFocus
            ? (this._applyFocus(),
              (this._focusText = this.getText()),
              this._fireTextFocus())
            : (this._removeFocus(),
              this._fireTextBlur(),
              this._focusText !== this.getText() &&
                (this._fireEdit(), (this._layerEdited = !0))));
    },
    _applyFocus() {
      this.textArea.classList.add('pm-hasfocus'),
        this._map.dragging &&
          (this._safeToCacheDragState &&
            ((this._originalMapDragState = this._map.dragging._enabled),
            (this._safeToCacheDragState = !1)),
          this._map.dragging.disable());
    },
    _removeFocus() {
      this._map.dragging &&
        (this._originalMapDragState && this._map.dragging.enable(),
        (this._safeToCacheDragState = !0)),
        this.textArea.classList.remove('pm-hasfocus');
    },
    focus() {
      if (!this.enabled()) throw new TypeError('Layer is not enabled');
      this.textArea.focus();
    },
    blur() {
      if (!this.enabled()) throw new TypeError('Layer is not enabled');
      this.textArea.blur(), this._disableOnBlurActive && this.disable();
    },
    hasFocus() {
      return this._hasFocus;
    },
    getElement() {
      return this.textArea;
    },
    setText(t) {
      (this.textArea.value = t), this._autoResize();
    },
    getText() {
      return this.textArea.value;
    },
    _initTextMarker() {
      if (
        ((this.textArea = L.PM.Draw.Text.prototype._createTextArea.call(this)),
        this.options.className)
      ) {
        let i = this.options.className.split(' ');
        this.textArea.classList.add(...i);
      }
      let t = L.PM.Draw.Text.prototype._createTextIcon.call(
        this,
        this.textArea
      );
      this._layer.setIcon(t),
        this._layer.once('add', this._createTextMarker, this);
    },
    _createTextMarker(t = !1) {
      this._layer.off('add', this._createTextMarker, this),
        (this._layer.getElement().tabIndex = -1),
        (this.textArea.wrap = 'off'),
        (this.textArea.style.overflow = 'hidden'),
        (this.textArea.style.height = L.DomUtil.getStyle(
          this.textArea,
          'font-size'
        )),
        (this.textArea.style.width = '1px'),
        this._layer.options.text && this.setText(this._layer.options.text),
        this._autoResize(),
        t === !0 && (this.enable(), this.focus(), this._disableOnBlur());
    },
    _preventTextSelection(t) {
      t.preventDefault();
    },
  });
  var Ko = function (i, r, o, a, l, u) {
    this._matrix = [i, r, o, a, l, u];
  };
  Ko.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0);
  Ko.prototype = {
    transform(t) {
      return this._transform(t.clone());
    },
    _transform(t) {
      let i = this._matrix,
        { x: r, y: o } = t;
      return (
        (t.x = i[0] * r + i[1] * o + i[4]),
        (t.y = i[2] * r + i[3] * o + i[5]),
        t
      );
    },
    untransform(t) {
      let i = this._matrix;
      return new L.Point(
        (t.x / i[0] - i[4]) / i[0],
        (t.y / i[2] - i[5]) / i[2]
      );
    },
    clone() {
      let t = this._matrix;
      return new L.PM.Matrix(t[0], t[1], t[2], t[3], t[4], t[5]);
    },
    translate(t) {
      if (t === void 0) return new L.Point(this._matrix[4], this._matrix[5]);
      let i, r;
      return (
        typeof t == 'number' ? ((i = t), (r = t)) : ((i = t.x), (r = t.y)),
        this._add(1, 0, 0, 1, i, r)
      );
    },
    scale(t, i) {
      if (t === void 0) return new L.Point(this._matrix[0], this._matrix[3]);
      let r, o;
      return (
        (i = i || L.point(0, 0)),
        typeof t == 'number' ? ((r = t), (o = t)) : ((r = t.x), (o = t.y)),
        this._add(r, 0, 0, o, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y)
      );
    },
    rotate(t, i) {
      let r = Math.cos(t),
        o = Math.sin(t);
      return (
        (i = i || new L.Point(0, 0)),
        this._add(r, o, -o, r, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y)
      );
    },
    flip() {
      return (this._matrix[1] *= -1), (this._matrix[2] *= -1), this;
    },
    _add(t, i, r, o, a, l) {
      let u = [[], [], []],
        c = this._matrix,
        d = [
          [c[0], c[2], c[4]],
          [c[1], c[3], c[5]],
          [0, 0, 1],
        ],
        p = [
          [t, r, a],
          [i, o, l],
          [0, 0, 1],
        ],
        y;
      t &&
        t instanceof L.PM.Matrix &&
        ((c = t._matrix),
        (p = [
          [c[0], c[2], c[4]],
          [c[1], c[3], c[5]],
          [0, 0, 1],
        ]));
      for (let b = 0; b < 3; b += 1)
        for (let D = 0; D < 3; D += 1) {
          y = 0;
          for (let O = 0; O < 3; O += 1) y += d[b][O] * p[O][D];
          u[b][D] = y;
        }
      return (
        (this._matrix = [u[0][0], u[1][0], u[0][1], u[1][1], u[0][2], u[1][2]]),
        this
      );
    },
  };
  var Gf = Ko;
  L.PM = L.PM || {
    version: $s.version,
    Map: Tc,
    Toolbar: Rc,
    Draw: Lt,
    Edit: wt,
    Utils: ki,
    Matrix: Gf,
    activeLang: 'en',
    optIn: !1,
    initialize(t) {
      this.addInitHooks(t);
    },
    setOptIn(t) {
      this.optIn = !!t;
    },
    addInitHooks() {
      function t() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 && (this.pm = new L.PM.Map(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Map(this)),
          this.pm && this.pm.setGlobalOptions({});
      }
      L.Map.addInitHook(t);
      function i() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.LayerGroup(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.LayerGroup(this));
      }
      L.LayerGroup.addInitHook(i);
      function r() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.options.textMarker
                ? ((this.pm = new L.PM.Edit.Text(this)),
                  this.options._textMarkerOverPM || this.pm._initTextMarker(),
                  delete this.options._textMarkerOverPM)
                : (this.pm = new L.PM.Edit.Marker(this)))
            : this.options.pmIgnore ||
              (this.options.textMarker
                ? ((this.pm = new L.PM.Edit.Text(this)),
                  this.options._textMarkerOverPM || this.pm._initTextMarker(),
                  delete this.options._textMarkerOverPM)
                : (this.pm = new L.PM.Edit.Marker(this)));
      }
      L.Marker.addInitHook(r);
      function o() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.CircleMarker(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.CircleMarker(this));
      }
      L.CircleMarker.addInitHook(o);
      function a() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Line(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
      }
      L.Polyline.addInitHook(a);
      function l() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Polygon(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
      }
      L.Polygon.addInitHook(l);
      function u() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Rectangle(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.Rectangle(this));
      }
      L.Rectangle.addInitHook(u);
      function c() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Circle(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
      }
      L.Circle.addInitHook(c);
      function d() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.ImageOverlay(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.ImageOverlay(this));
      }
      L.ImageOverlay.addInitHook(d);
    },
    reInitLayer(t) {
      t instanceof L.LayerGroup &&
        t.eachLayer((i) => {
          this.reInitLayer(i);
        }),
        t.pm ||
          (L.PM.optIn && t.options.pmIgnore !== !1) ||
          t.options.pmIgnore ||
          (t instanceof L.Map
            ? (t.pm = new L.PM.Map(t))
            : t instanceof L.Marker
              ? t.options.textMarker
                ? ((t.pm = new L.PM.Edit.Text(t)),
                  t.pm._initTextMarker(),
                  t.pm._createTextMarker(!1))
                : (t.pm = new L.PM.Edit.Marker(t))
              : t instanceof L.Circle
                ? (t.pm = new L.PM.Edit.Circle(t))
                : t instanceof L.CircleMarker
                  ? (t.pm = new L.PM.Edit.CircleMarker(t))
                  : t instanceof L.Rectangle
                    ? (t.pm = new L.PM.Edit.Rectangle(t))
                    : t instanceof L.Polygon
                      ? (t.pm = new L.PM.Edit.Polygon(t))
                      : t instanceof L.Polyline
                        ? (t.pm = new L.PM.Edit.Line(t))
                        : t instanceof L.LayerGroup
                          ? (t.pm = new L.PM.Edit.LayerGroup(t))
                          : t instanceof L.ImageOverlay &&
                            (t.pm = new L.PM.Edit.ImageOverlay(t)));
    },
  };
  L.version === '1.7.1' &&
    L.Canvas.include({
      _onClick(t) {
        let i = this._map.mouseEventToLayerPoint(t),
          r,
          o;
        for (let a = this._drawFirst; a; a = a.next)
          (r = a.layer),
            r.options.interactive &&
              r._containsPoint(i) &&
              (!(t.type === 'click' || t.type === 'preclick') ||
                !this._map._draggableMoved(r)) &&
              (o = r);
        o && (L.DomEvent.fakeStop(t), this._fireEvent([o], t));
      },
    });
  L.PM.initialize();
})();
/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
/*! Bundled license information:

leaflet/dist/leaflet-src.js:
  (* @preserve
   * Leaflet 1.9.3, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2022 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)
*/
//# sourceMappingURL=leaflet-geoman.js.map
