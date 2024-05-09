(() => {
  var id = Object.create;
  var la = Object.defineProperty;
  var rd = Object.getOwnPropertyDescriptor;
  var nd = Object.getOwnPropertyNames;
  var od = Object.getPrototypeOf,
    ad = Object.prototype.hasOwnProperty;
  var G = (t, i) => () => (i || t((i = { exports: {} }).exports, i), i.exports);
  var sd = (t, i, n, o) => {
    if ((i && typeof i == 'object') || typeof i == 'function')
      for (let s of nd(i))
        !ad.call(t, s) &&
          s !== n &&
          la(t, s, {
            get: () => i[s],
            enumerable: !(o = rd(i, s)) || o.enumerable,
          });
    return t;
  };
  var ee = (t, i, n) => (
    (n = t != null ? id(od(t)) : {}),
    sd(
      i || !t || !t.__esModule
        ? la(n, 'default', { value: t, enumerable: !0 })
        : n,
      t
    )
  );
  var ua = G((kr, ha) => {
    (function (t, i) {
      typeof kr == 'object' && typeof ha < 'u'
        ? i(kr)
        : typeof define == 'function' && define.amd
          ? define(['exports'], i)
          : ((t = typeof globalThis < 'u' ? globalThis : t || self),
            i((t.leaflet = {})));
    })(kr, function (t) {
      'use strict';
      var i = '1.9.3';
      function n(e) {
        var r, a, l, u;
        for (a = 1, l = arguments.length; a < l; a++) {
          u = arguments[a];
          for (r in u) e[r] = u[r];
        }
        return e;
      }
      var o =
        Object.create ||
        (function () {
          function e() {}
          return function (r) {
            return (e.prototype = r), new e();
          };
        })();
      function s(e, r) {
        var a = Array.prototype.slice;
        if (e.bind) return e.bind.apply(e, a.call(arguments, 1));
        var l = a.call(arguments, 2);
        return function () {
          return e.apply(r, l.length ? l.concat(a.call(arguments)) : arguments);
        };
      }
      var h = 0;
      function c(e) {
        return '_leaflet_id' in e || (e._leaflet_id = ++h), e._leaflet_id;
      }
      function f(e, r, a) {
        var l, u, m, x;
        return (
          (x = function () {
            (l = !1), u && (m.apply(a, u), (u = !1));
          }),
          (m = function () {
            l
              ? (u = arguments)
              : (e.apply(a, arguments), setTimeout(x, r), (l = !0));
          }),
          m
        );
      }
      function d(e, r, a) {
        var l = r[1],
          u = r[0],
          m = l - u;
        return e === l && a ? e : ((((e - u) % m) + m) % m) + u;
      }
      function y() {
        return !1;
      }
      function w(e, r) {
        if (r === !1) return e;
        var a = Math.pow(10, r === void 0 ? 6 : r);
        return Math.round(e * a) / a;
      }
      function P(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
      }
      function R(e) {
        return P(e).split(/\s+/);
      }
      function D(e, r) {
        Object.prototype.hasOwnProperty.call(e, 'options') ||
          (e.options = e.options ? o(e.options) : {});
        for (var a in r) e.options[a] = r[a];
        return e.options;
      }
      function N(e, r, a) {
        var l = [];
        for (var u in e)
          l.push(
            encodeURIComponent(a ? u.toUpperCase() : u) +
              '=' +
              encodeURIComponent(e[u])
          );
        return (!r || r.indexOf('?') === -1 ? '?' : '&') + l.join('&');
      }
      var Y = /\{ *([\w_ -]+) *\}/g;
      function k(e, r) {
        return e.replace(Y, function (a, l) {
          var u = r[l];
          if (u === void 0)
            throw new Error('No value provided for variable ' + a);
          return typeof u == 'function' && (u = u(r)), u;
        });
      }
      var C =
        Array.isArray ||
        function (e) {
          return Object.prototype.toString.call(e) === '[object Array]';
        };
      function I(e, r) {
        for (var a = 0; a < e.length; a++) if (e[a] === r) return a;
        return -1;
      }
      var Z = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      function V(e) {
        return window['webkit' + e] || window['moz' + e] || window['ms' + e];
      }
      var j = 0;
      function H(e) {
        var r = +new Date(),
          a = Math.max(0, 16 - (r - j));
        return (j = r + a), window.setTimeout(e, a);
      }
      var E = window.requestAnimationFrame || V('RequestAnimationFrame') || H,
        tt =
          window.cancelAnimationFrame ||
          V('CancelAnimationFrame') ||
          V('CancelRequestAnimationFrame') ||
          function (e) {
            window.clearTimeout(e);
          };
      function X(e, r, a) {
        if (a && E === H) e.call(r);
        else return E.call(window, s(e, r));
      }
      function et(e) {
        e && tt.call(window, e);
      }
      var at = {
        __proto__: null,
        extend: n,
        create: o,
        bind: s,
        get lastId() {
          return h;
        },
        stamp: c,
        throttle: f,
        wrapNum: d,
        falseFn: y,
        formatNum: w,
        trim: P,
        splitWords: R,
        setOptions: D,
        getParamString: N,
        template: k,
        isArray: C,
        indexOf: I,
        emptyImageUrl: Z,
        requestFn: E,
        cancelFn: tt,
        requestAnimFrame: X,
        cancelAnimFrame: et,
      };
      function ht() {}
      (ht.extend = function (e) {
        var r = function () {
            D(this),
              this.initialize && this.initialize.apply(this, arguments),
              this.callInitHooks();
          },
          a = (r.__super__ = this.prototype),
          l = o(a);
        (l.constructor = r), (r.prototype = l);
        for (var u in this)
          Object.prototype.hasOwnProperty.call(this, u) &&
            u !== 'prototype' &&
            u !== '__super__' &&
            (r[u] = this[u]);
        return (
          e.statics && n(r, e.statics),
          e.includes && (qt(e.includes), n.apply(null, [l].concat(e.includes))),
          n(l, e),
          delete l.statics,
          delete l.includes,
          l.options &&
            ((l.options = a.options ? o(a.options) : {}),
            n(l.options, e.options)),
          (l._initHooks = []),
          (l.callInitHooks = function () {
            if (!this._initHooksCalled) {
              a.callInitHooks && a.callInitHooks.call(this),
                (this._initHooksCalled = !0);
              for (var m = 0, x = l._initHooks.length; m < x; m++)
                l._initHooks[m].call(this);
            }
          }),
          r
        );
      }),
        (ht.include = function (e) {
          var r = this.prototype.options;
          return (
            n(this.prototype, e),
            e.options &&
              ((this.prototype.options = r), this.mergeOptions(e.options)),
            this
          );
        }),
        (ht.mergeOptions = function (e) {
          return n(this.prototype.options, e), this;
        }),
        (ht.addInitHook = function (e) {
          var r = Array.prototype.slice.call(arguments, 1),
            a =
              typeof e == 'function'
                ? e
                : function () {
                    this[e].apply(this, r);
                  };
          return (
            (this.prototype._initHooks = this.prototype._initHooks || []),
            this.prototype._initHooks.push(a),
            this
          );
        });
      function qt(e) {
        if (!(typeof L > 'u' || !L || !L.Mixin)) {
          e = C(e) ? e : [e];
          for (var r = 0; r < e.length; r++)
            e[r] === L.Mixin.Events &&
              console.warn(
                'Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.',
                new Error().stack
              );
        }
      }
      var kt = {
        on: function (e, r, a) {
          if (typeof e == 'object') for (var l in e) this._on(l, e[l], r);
          else {
            e = R(e);
            for (var u = 0, m = e.length; u < m; u++) this._on(e[u], r, a);
          }
          return this;
        },
        off: function (e, r, a) {
          if (!arguments.length) delete this._events;
          else if (typeof e == 'object') for (var l in e) this._off(l, e[l], r);
          else {
            e = R(e);
            for (
              var u = arguments.length === 1, m = 0, x = e.length;
              m < x;
              m++
            )
              u ? this._off(e[m]) : this._off(e[m], r, a);
          }
          return this;
        },
        _on: function (e, r, a, l) {
          if (typeof r != 'function') {
            console.warn('wrong listener type: ' + typeof r);
            return;
          }
          if (this._listens(e, r, a) === !1) {
            a === this && (a = void 0);
            var u = { fn: r, ctx: a };
            l && (u.once = !0),
              (this._events = this._events || {}),
              (this._events[e] = this._events[e] || []),
              this._events[e].push(u);
          }
        },
        _off: function (e, r, a) {
          var l, u, m;
          if (this._events && ((l = this._events[e]), !!l)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (u = 0, m = l.length; u < m; u++) l[u].fn = y;
              delete this._events[e];
              return;
            }
            if (typeof r != 'function') {
              console.warn('wrong listener type: ' + typeof r);
              return;
            }
            var x = this._listens(e, r, a);
            if (x !== !1) {
              var T = l[x];
              this._firingCount &&
                ((T.fn = y), (this._events[e] = l = l.slice())),
                l.splice(x, 1);
            }
          }
        },
        fire: function (e, r, a) {
          if (!this.listens(e, a)) return this;
          var l = n({}, r, {
            type: e,
            target: this,
            sourceTarget: (r && r.sourceTarget) || this,
          });
          if (this._events) {
            var u = this._events[e];
            if (u) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var m = 0, x = u.length; m < x; m++) {
                var T = u[m],
                  O = T.fn;
                T.once && this.off(e, O, T.ctx), O.call(T.ctx || this, l);
              }
              this._firingCount--;
            }
          }
          return a && this._propagateEvent(l), this;
        },
        listens: function (e, r, a, l) {
          typeof e != 'string' &&
            console.warn('"string" type argument expected');
          var u = r;
          typeof r != 'function' && ((l = !!r), (u = void 0), (a = void 0));
          var m = this._events && this._events[e];
          if (m && m.length && this._listens(e, u, a) !== !1) return !0;
          if (l) {
            for (var x in this._eventParents)
              if (this._eventParents[x].listens(e, r, a, l)) return !0;
          }
          return !1;
        },
        _listens: function (e, r, a) {
          if (!this._events) return !1;
          var l = this._events[e] || [];
          if (!r) return !!l.length;
          a === this && (a = void 0);
          for (var u = 0, m = l.length; u < m; u++)
            if (l[u].fn === r && l[u].ctx === a) return u;
          return !1;
        },
        once: function (e, r, a) {
          if (typeof e == 'object') for (var l in e) this._on(l, e[l], r, !0);
          else {
            e = R(e);
            for (var u = 0, m = e.length; u < m; u++) this._on(e[u], r, a, !0);
          }
          return this;
        },
        addEventParent: function (e) {
          return (
            (this._eventParents = this._eventParents || {}),
            (this._eventParents[c(e)] = e),
            this
          );
        },
        removeEventParent: function (e) {
          return this._eventParents && delete this._eventParents[c(e)], this;
        },
        _propagateEvent: function (e) {
          for (var r in this._eventParents)
            this._eventParents[r].fire(
              e.type,
              n({ layer: e.target, propagatedFrom: e.target }, e),
              !0
            );
        },
      };
      (kt.addEventListener = kt.on),
        (kt.removeEventListener = kt.clearAllEventListeners = kt.off),
        (kt.addOneTimeEventListener = kt.once),
        (kt.fireEvent = kt.fire),
        (kt.hasEventListeners = kt.listens);
      var Dt = ht.extend(kt);
      function it(e, r, a) {
        (this.x = a ? Math.round(e) : e), (this.y = a ? Math.round(r) : r);
      }
      var Yt =
        Math.trunc ||
        function (e) {
          return e > 0 ? Math.floor(e) : Math.ceil(e);
        };
      it.prototype = {
        clone: function () {
          return new it(this.x, this.y);
        },
        add: function (e) {
          return this.clone()._add(Q(e));
        },
        _add: function (e) {
          return (this.x += e.x), (this.y += e.y), this;
        },
        subtract: function (e) {
          return this.clone()._subtract(Q(e));
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
          return new it(this.x * e.x, this.y * e.y);
        },
        unscaleBy: function (e) {
          return new it(this.x / e.x, this.y / e.y);
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
          return (this.x = Yt(this.x)), (this.y = Yt(this.y)), this;
        },
        distanceTo: function (e) {
          e = Q(e);
          var r = e.x - this.x,
            a = e.y - this.y;
          return Math.sqrt(r * r + a * a);
        },
        equals: function (e) {
          return (e = Q(e)), e.x === this.x && e.y === this.y;
        },
        contains: function (e) {
          return (
            (e = Q(e)),
            Math.abs(e.x) <= Math.abs(this.x) &&
              Math.abs(e.y) <= Math.abs(this.y)
          );
        },
        toString: function () {
          return 'Point(' + w(this.x) + ', ' + w(this.y) + ')';
        },
      };
      function Q(e, r, a) {
        return e instanceof it
          ? e
          : C(e)
            ? new it(e[0], e[1])
            : e == null
              ? e
              : typeof e == 'object' && 'x' in e && 'y' in e
                ? new it(e.x, e.y)
                : new it(e, r, a);
      }
      function pt(e, r) {
        if (e)
          for (var a = r ? [e, r] : e, l = 0, u = a.length; l < u; l++)
            this.extend(a[l]);
      }
      pt.prototype = {
        extend: function (e) {
          var r, a;
          if (!e) return this;
          if (e instanceof it || typeof e[0] == 'number' || 'x' in e)
            r = a = Q(e);
          else if (((e = _t(e)), (r = e.min), (a = e.max), !r || !a))
            return this;
          return (
            !this.min && !this.max
              ? ((this.min = r.clone()), (this.max = a.clone()))
              : ((this.min.x = Math.min(r.x, this.min.x)),
                (this.max.x = Math.max(a.x, this.max.x)),
                (this.min.y = Math.min(r.y, this.min.y)),
                (this.max.y = Math.max(a.y, this.max.y))),
            this
          );
        },
        getCenter: function (e) {
          return Q(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            e
          );
        },
        getBottomLeft: function () {
          return Q(this.min.x, this.max.y);
        },
        getTopRight: function () {
          return Q(this.max.x, this.min.y);
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
          var r, a;
          return (
            typeof e[0] == 'number' || e instanceof it
              ? (e = Q(e))
              : (e = _t(e)),
            e instanceof pt ? ((r = e.min), (a = e.max)) : (r = a = e),
            r.x >= this.min.x &&
              a.x <= this.max.x &&
              r.y >= this.min.y &&
              a.y <= this.max.y
          );
        },
        intersects: function (e) {
          e = _t(e);
          var r = this.min,
            a = this.max,
            l = e.min,
            u = e.max,
            m = u.x >= r.x && l.x <= a.x,
            x = u.y >= r.y && l.y <= a.y;
          return m && x;
        },
        overlaps: function (e) {
          e = _t(e);
          var r = this.min,
            a = this.max,
            l = e.min,
            u = e.max,
            m = u.x > r.x && l.x < a.x,
            x = u.y > r.y && l.y < a.y;
          return m && x;
        },
        isValid: function () {
          return !!(this.min && this.max);
        },
        pad: function (e) {
          var r = this.min,
            a = this.max,
            l = Math.abs(r.x - a.x) * e,
            u = Math.abs(r.y - a.y) * e;
          return _t(Q(r.x - l, r.y - u), Q(a.x + l, a.y + u));
        },
        equals: function (e) {
          return e
            ? ((e = _t(e)),
              this.min.equals(e.getTopLeft()) &&
                this.max.equals(e.getBottomRight()))
            : !1;
        },
      };
      function _t(e, r) {
        return !e || e instanceof pt ? e : new pt(e, r);
      }
      function Tt(e, r) {
        if (e)
          for (var a = r ? [e, r] : e, l = 0, u = a.length; l < u; l++)
            this.extend(a[l]);
      }
      Tt.prototype = {
        extend: function (e) {
          var r = this._southWest,
            a = this._northEast,
            l,
            u;
          if (e instanceof mt) (l = e), (u = e);
          else if (e instanceof Tt) {
            if (((l = e._southWest), (u = e._northEast), !l || !u)) return this;
          } else return e ? this.extend(bt(e) || Pt(e)) : this;
          return (
            !r && !a
              ? ((this._southWest = new mt(l.lat, l.lng)),
                (this._northEast = new mt(u.lat, u.lng)))
              : ((r.lat = Math.min(l.lat, r.lat)),
                (r.lng = Math.min(l.lng, r.lng)),
                (a.lat = Math.max(u.lat, a.lat)),
                (a.lng = Math.max(u.lng, a.lng))),
            this
          );
        },
        pad: function (e) {
          var r = this._southWest,
            a = this._northEast,
            l = Math.abs(r.lat - a.lat) * e,
            u = Math.abs(r.lng - a.lng) * e;
          return new Tt(
            new mt(r.lat - l, r.lng - u),
            new mt(a.lat + l, a.lng + u)
          );
        },
        getCenter: function () {
          return new mt(
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
          return new mt(this.getNorth(), this.getWest());
        },
        getSouthEast: function () {
          return new mt(this.getSouth(), this.getEast());
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
          typeof e[0] == 'number' || e instanceof mt || 'lat' in e
            ? (e = bt(e))
            : (e = Pt(e));
          var r = this._southWest,
            a = this._northEast,
            l,
            u;
          return (
            e instanceof Tt
              ? ((l = e.getSouthWest()), (u = e.getNorthEast()))
              : (l = u = e),
            l.lat >= r.lat && u.lat <= a.lat && l.lng >= r.lng && u.lng <= a.lng
          );
        },
        intersects: function (e) {
          e = Pt(e);
          var r = this._southWest,
            a = this._northEast,
            l = e.getSouthWest(),
            u = e.getNorthEast(),
            m = u.lat >= r.lat && l.lat <= a.lat,
            x = u.lng >= r.lng && l.lng <= a.lng;
          return m && x;
        },
        overlaps: function (e) {
          e = Pt(e);
          var r = this._southWest,
            a = this._northEast,
            l = e.getSouthWest(),
            u = e.getNorthEast(),
            m = u.lat > r.lat && l.lat < a.lat,
            x = u.lng > r.lng && l.lng < a.lng;
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
        equals: function (e, r) {
          return e
            ? ((e = Pt(e)),
              this._southWest.equals(e.getSouthWest(), r) &&
                this._northEast.equals(e.getNorthEast(), r))
            : !1;
        },
        isValid: function () {
          return !!(this._southWest && this._northEast);
        },
      };
      function Pt(e, r) {
        return e instanceof Tt ? e : new Tt(e, r);
      }
      function mt(e, r, a) {
        if (isNaN(e) || isNaN(r))
          throw new Error('Invalid LatLng object: (' + e + ', ' + r + ')');
        (this.lat = +e), (this.lng = +r), a !== void 0 && (this.alt = +a);
      }
      mt.prototype = {
        equals: function (e, r) {
          if (!e) return !1;
          e = bt(e);
          var a = Math.max(
            Math.abs(this.lat - e.lat),
            Math.abs(this.lng - e.lng)
          );
          return a <= (r === void 0 ? 1e-9 : r);
        },
        toString: function (e) {
          return 'LatLng(' + w(this.lat, e) + ', ' + w(this.lng, e) + ')';
        },
        distanceTo: function (e) {
          return Nt.distance(this, bt(e));
        },
        wrap: function () {
          return Nt.wrapLatLng(this);
        },
        toBounds: function (e) {
          var r = (180 * e) / 40075017,
            a = r / Math.cos((Math.PI / 180) * this.lat);
          return Pt([this.lat - r, this.lng - a], [this.lat + r, this.lng + a]);
        },
        clone: function () {
          return new mt(this.lat, this.lng, this.alt);
        },
      };
      function bt(e, r, a) {
        return e instanceof mt
          ? e
          : C(e) && typeof e[0] != 'object'
            ? e.length === 3
              ? new mt(e[0], e[1], e[2])
              : e.length === 2
                ? new mt(e[0], e[1])
                : null
            : e == null
              ? e
              : typeof e == 'object' && 'lat' in e
                ? new mt(e.lat, 'lng' in e ? e.lng : e.lon, e.alt)
                : r === void 0
                  ? null
                  : new mt(e, r, a);
      }
      var Ht = {
          latLngToPoint: function (e, r) {
            var a = this.projection.project(e),
              l = this.scale(r);
            return this.transformation._transform(a, l);
          },
          pointToLatLng: function (e, r) {
            var a = this.scale(r),
              l = this.transformation.untransform(e, a);
            return this.projection.unproject(l);
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
            var r = this.projection.bounds,
              a = this.scale(e),
              l = this.transformation.transform(r.min, a),
              u = this.transformation.transform(r.max, a);
            return new pt(l, u);
          },
          infinite: !1,
          wrapLatLng: function (e) {
            var r = this.wrapLng ? d(e.lng, this.wrapLng, !0) : e.lng,
              a = this.wrapLat ? d(e.lat, this.wrapLat, !0) : e.lat,
              l = e.alt;
            return new mt(a, r, l);
          },
          wrapLatLngBounds: function (e) {
            var r = e.getCenter(),
              a = this.wrapLatLng(r),
              l = r.lat - a.lat,
              u = r.lng - a.lng;
            if (l === 0 && u === 0) return e;
            var m = e.getSouthWest(),
              x = e.getNorthEast(),
              T = new mt(m.lat - l, m.lng - u),
              O = new mt(x.lat - l, x.lng - u);
            return new Tt(T, O);
          },
        },
        Nt = n({}, Ht, {
          wrapLng: [-180, 180],
          R: 6371e3,
          distance: function (e, r) {
            var a = Math.PI / 180,
              l = e.lat * a,
              u = r.lat * a,
              m = Math.sin(((r.lat - e.lat) * a) / 2),
              x = Math.sin(((r.lng - e.lng) * a) / 2),
              T = m * m + Math.cos(l) * Math.cos(u) * x * x,
              O = 2 * Math.atan2(Math.sqrt(T), Math.sqrt(1 - T));
            return this.R * O;
          },
        }),
        ze = 6378137,
        me = {
          R: ze,
          MAX_LATITUDE: 85.0511287798,
          project: function (e) {
            var r = Math.PI / 180,
              a = this.MAX_LATITUDE,
              l = Math.max(Math.min(a, e.lat), -a),
              u = Math.sin(l * r);
            return new it(
              this.R * e.lng * r,
              (this.R * Math.log((1 + u) / (1 - u))) / 2
            );
          },
          unproject: function (e) {
            var r = 180 / Math.PI;
            return new mt(
              (2 * Math.atan(Math.exp(e.y / this.R)) - Math.PI / 2) * r,
              (e.x * r) / this.R
            );
          },
          bounds: (function () {
            var e = ze * Math.PI;
            return new pt([-e, -e], [e, e]);
          })(),
        };
      function Ne(e, r, a, l) {
        if (C(e)) {
          (this._a = e[0]),
            (this._b = e[1]),
            (this._c = e[2]),
            (this._d = e[3]);
          return;
        }
        (this._a = e), (this._b = r), (this._c = a), (this._d = l);
      }
      Ne.prototype = {
        transform: function (e, r) {
          return this._transform(e.clone(), r);
        },
        _transform: function (e, r) {
          return (
            (r = r || 1),
            (e.x = r * (this._a * e.x + this._b)),
            (e.y = r * (this._c * e.y + this._d)),
            e
          );
        },
        untransform: function (e, r) {
          return (
            (r = r || 1),
            new it((e.x / r - this._b) / this._a, (e.y / r - this._d) / this._c)
          );
        },
      };
      function jt(e, r, a, l) {
        return new Ne(e, r, a, l);
      }
      var Gt = n({}, Nt, {
          code: 'EPSG:3857',
          projection: me,
          transformation: (function () {
            var e = 0.5 / (Math.PI * me.R);
            return jt(e, 0.5, -e, 0.5);
          })(),
        }),
        ei = n({}, Gt, { code: 'EPSG:900913' });
      function ge(e) {
        return document.createElementNS('http://www.w3.org/2000/svg', e);
      }
      function ii(e, r) {
        var a = '',
          l,
          u,
          m,
          x,
          T,
          O;
        for (l = 0, m = e.length; l < m; l++) {
          for (T = e[l], u = 0, x = T.length; u < x; u++)
            (O = T[u]), (a += (u ? 'L' : 'M') + O.x + ' ' + O.y);
          a += r ? (nt.svg ? 'z' : 'x') : '';
        }
        return a || 'M0 0';
      }
      var Ge = document.documentElement.style,
        Pe = 'ActiveXObject' in window,
        S = Pe && !document.addEventListener,
        g = 'msLaunchUri' in navigator && !('documentMode' in document),
        p = le('webkit'),
        _ = le('android'),
        b = le('android 2') || le('android 3'),
        M = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        B = _ && le('Google') && M < 537 && !('AudioNode' in window),
        q = !!window.opera,
        F = !g && le('chrome'),
        W = le('gecko') && !p && !q && !Pe,
        ot = !F && le('safari'),
        v = le('phantom'),
        z = 'OTransition' in Ge,
        A = navigator.platform.indexOf('Win') === 0,
        K = Pe && 'transition' in Ge,
        $ =
          'WebKitCSSMatrix' in window &&
          'm11' in new window.WebKitCSSMatrix() &&
          !b,
        rt = 'MozPerspective' in Ge,
        dt = !window.L_DISABLE_3D && (K || $ || rt) && !z && !v,
        yt = typeof orientation < 'u' || le('mobile'),
        ct = yt && p,
        wt = yt && $,
        At = !window.PointerEvent && window.MSPointerEvent,
        Zt = !!(window.PointerEvent || At),
        se = 'ontouchstart' in window || !!window.TouchEvent,
        _e = !window.L_NO_TOUCH && (se || Zt),
        Xt = yt && q,
        Fe = yt && W,
        ye =
          (window.devicePixelRatio ||
            window.screen.deviceXDPI / window.screen.logicalXDPI) > 1,
        Ci = (function () {
          var e = !1;
          try {
            var r = Object.defineProperty({}, 'passive', {
              get: function () {
                e = !0;
              },
            });
            window.addEventListener('testPassiveEventSupport', y, r),
              window.removeEventListener('testPassiveEventSupport', y, r);
          } catch {}
          return e;
        })(),
        qe = (function () {
          return !!document.createElement('canvas').getContext;
        })(),
        ve = !!(document.createElementNS && ge('svg').createSVGRect),
        Pi =
          !!ve &&
          (function () {
            var e = document.createElement('div');
            return (
              (e.innerHTML = '<svg/>'),
              (e.firstChild && e.firstChild.namespaceURI) ===
                'http://www.w3.org/2000/svg'
            );
          })(),
        Kc =
          !ve &&
          (function () {
            try {
              var e = document.createElement('div');
              e.innerHTML = '<v:shape adj="1"/>';
              var r = e.firstChild;
              return (
                (r.style.behavior = 'url(#default#VML)'),
                r && typeof r.adj == 'object'
              );
            } catch {
              return !1;
            }
          })(),
        Wc = navigator.platform.indexOf('Mac') === 0,
        Yc = navigator.platform.indexOf('Linux') === 0;
      function le(e) {
        return navigator.userAgent.toLowerCase().indexOf(e) >= 0;
      }
      var nt = {
          ie: Pe,
          ielt9: S,
          edge: g,
          webkit: p,
          android: _,
          android23: b,
          androidStock: B,
          opera: q,
          chrome: F,
          gecko: W,
          safari: ot,
          phantom: v,
          opera12: z,
          win: A,
          ie3d: K,
          webkit3d: $,
          gecko3d: rt,
          any3d: dt,
          mobile: yt,
          mobileWebkit: ct,
          mobileWebkit3d: wt,
          msPointer: At,
          pointer: Zt,
          touch: _e,
          touchNative: se,
          mobileOpera: Xt,
          mobileGecko: Fe,
          retina: ye,
          passiveEvents: Ci,
          canvas: qe,
          svg: ve,
          vml: Kc,
          inlineSvg: Pi,
          mac: Wc,
          linux: Yc,
        },
        fo = nt.msPointer ? 'MSPointerDown' : 'pointerdown',
        po = nt.msPointer ? 'MSPointerMove' : 'pointermove',
        mo = nt.msPointer ? 'MSPointerUp' : 'pointerup',
        go = nt.msPointer ? 'MSPointerCancel' : 'pointercancel',
        Zr = { touchstart: fo, touchmove: po, touchend: mo, touchcancel: go },
        _o = { touchstart: ef, touchmove: or, touchend: or, touchcancel: or },
        ri = {},
        yo = !1;
      function $c(e, r, a) {
        return (
          r === 'touchstart' && tf(),
          _o[r]
            ? ((a = _o[r].bind(this, a)), e.addEventListener(Zr[r], a, !1), a)
            : (console.warn('wrong event specified:', r), y)
        );
      }
      function Xc(e, r, a) {
        if (!Zr[r]) {
          console.warn('wrong event specified:', r);
          return;
        }
        e.removeEventListener(Zr[r], a, !1);
      }
      function Jc(e) {
        ri[e.pointerId] = e;
      }
      function Qc(e) {
        ri[e.pointerId] && (ri[e.pointerId] = e);
      }
      function vo(e) {
        delete ri[e.pointerId];
      }
      function tf() {
        yo ||
          (document.addEventListener(fo, Jc, !0),
          document.addEventListener(po, Qc, !0),
          document.addEventListener(mo, vo, !0),
          document.addEventListener(go, vo, !0),
          (yo = !0));
      }
      function or(e, r) {
        if (r.pointerType !== (r.MSPOINTER_TYPE_MOUSE || 'mouse')) {
          r.touches = [];
          for (var a in ri) r.touches.push(ri[a]);
          (r.changedTouches = [r]), e(r);
        }
      }
      function ef(e, r) {
        r.MSPOINTER_TYPE_TOUCH &&
          r.pointerType === r.MSPOINTER_TYPE_TOUCH &&
          Ft(r),
          or(e, r);
      }
      function rf(e) {
        var r = {},
          a,
          l;
        for (l in e) (a = e[l]), (r[l] = a && a.bind ? a.bind(e) : a);
        return (
          (e = r),
          (r.type = 'dblclick'),
          (r.detail = 2),
          (r.isTrusted = !1),
          (r._simulated = !0),
          r
        );
      }
      var nf = 200;
      function of(e, r) {
        e.addEventListener('dblclick', r);
        var a = 0,
          l;
        function u(m) {
          if (m.detail !== 1) {
            l = m.detail;
            return;
          }
          if (
            !(
              m.pointerType === 'mouse' ||
              (m.sourceCapabilities && !m.sourceCapabilities.firesTouchEvents)
            )
          ) {
            var x = ko(m);
            if (
              !(
                x.some(function (O) {
                  return O instanceof HTMLLabelElement && O.attributes.for;
                }) &&
                !x.some(function (O) {
                  return (
                    O instanceof HTMLInputElement ||
                    O instanceof HTMLSelectElement
                  );
                })
              )
            ) {
              var T = Date.now();
              T - a <= nf ? (l++, l === 2 && r(rf(m))) : (l = 1), (a = T);
            }
          }
        }
        return e.addEventListener('click', u), { dblclick: r, simDblclick: u };
      }
      function af(e, r) {
        e.removeEventListener('dblclick', r.dblclick),
          e.removeEventListener('click', r.simDblclick);
      }
      var Ur = lr([
          'transform',
          'webkitTransform',
          'OTransform',
          'MozTransform',
          'msTransform',
        ]),
        Ei = lr([
          'webkitTransition',
          'transition',
          'OTransition',
          'MozTransition',
          'msTransition',
        ]),
        Lo =
          Ei === 'webkitTransition' || Ei === 'OTransition'
            ? Ei + 'End'
            : 'transitionend';
      function bo(e) {
        return typeof e == 'string' ? document.getElementById(e) : e;
      }
      function Si(e, r) {
        var a = e.style[r] || (e.currentStyle && e.currentStyle[r]);
        if ((!a || a === 'auto') && document.defaultView) {
          var l = document.defaultView.getComputedStyle(e, null);
          a = l ? l[r] : null;
        }
        return a === 'auto' ? null : a;
      }
      function xt(e, r, a) {
        var l = document.createElement(e);
        return (l.className = r || ''), a && a.appendChild(l), l;
      }
      function Bt(e) {
        var r = e.parentNode;
        r && r.removeChild(e);
      }
      function ar(e) {
        for (; e.firstChild; ) e.removeChild(e.firstChild);
      }
      function ni(e) {
        var r = e.parentNode;
        r && r.lastChild !== e && r.appendChild(e);
      }
      function oi(e) {
        var r = e.parentNode;
        r && r.firstChild !== e && r.insertBefore(e, r.firstChild);
      }
      function Vr(e, r) {
        if (e.classList !== void 0) return e.classList.contains(r);
        var a = sr(e);
        return a.length > 0 && new RegExp('(^|\\s)' + r + '(\\s|$)').test(a);
      }
      function gt(e, r) {
        if (e.classList !== void 0)
          for (var a = R(r), l = 0, u = a.length; l < u; l++)
            e.classList.add(a[l]);
        else if (!Vr(e, r)) {
          var m = sr(e);
          Hr(e, (m ? m + ' ' : '') + r);
        }
      }
      function Ot(e, r) {
        e.classList !== void 0
          ? e.classList.remove(r)
          : Hr(e, P((' ' + sr(e) + ' ').replace(' ' + r + ' ', ' ')));
      }
      function Hr(e, r) {
        e.className.baseVal === void 0
          ? (e.className = r)
          : (e.className.baseVal = r);
      }
      function sr(e) {
        return (
          e.correspondingElement && (e = e.correspondingElement),
          e.className.baseVal === void 0 ? e.className : e.className.baseVal
        );
      }
      function Jt(e, r) {
        'opacity' in e.style
          ? (e.style.opacity = r)
          : 'filter' in e.style && sf(e, r);
      }
      function sf(e, r) {
        var a = !1,
          l = 'DXImageTransform.Microsoft.Alpha';
        try {
          a = e.filters.item(l);
        } catch {
          if (r === 1) return;
        }
        (r = Math.round(r * 100)),
          a
            ? ((a.Enabled = r !== 100), (a.Opacity = r))
            : (e.style.filter += ' progid:' + l + '(opacity=' + r + ')');
      }
      function lr(e) {
        for (var r = document.documentElement.style, a = 0; a < e.length; a++)
          if (e[a] in r) return e[a];
        return !1;
      }
      function Ze(e, r, a) {
        var l = r || new it(0, 0);
        e.style[Ur] =
          (nt.ie3d
            ? 'translate(' + l.x + 'px,' + l.y + 'px)'
            : 'translate3d(' + l.x + 'px,' + l.y + 'px,0)') +
          (a ? ' scale(' + a + ')' : '');
      }
      function Rt(e, r) {
        (e._leaflet_pos = r),
          nt.any3d
            ? Ze(e, r)
            : ((e.style.left = r.x + 'px'), (e.style.top = r.y + 'px'));
      }
      function Ue(e) {
        return e._leaflet_pos || new it(0, 0);
      }
      var Ti, Di, jr;
      if ('onselectstart' in document)
        (Ti = function () {
          ft(window, 'selectstart', Ft);
        }),
          (Di = function () {
            Et(window, 'selectstart', Ft);
          });
      else {
        var Bi = lr([
          'userSelect',
          'WebkitUserSelect',
          'OUserSelect',
          'MozUserSelect',
          'msUserSelect',
        ]);
        (Ti = function () {
          if (Bi) {
            var e = document.documentElement.style;
            (jr = e[Bi]), (e[Bi] = 'none');
          }
        }),
          (Di = function () {
            Bi && ((document.documentElement.style[Bi] = jr), (jr = void 0));
          });
      }
      function Kr() {
        ft(window, 'dragstart', Ft);
      }
      function Wr() {
        Et(window, 'dragstart', Ft);
      }
      var hr, Yr;
      function $r(e) {
        for (; e.tabIndex === -1; ) e = e.parentNode;
        e.style &&
          (ur(),
          (hr = e),
          (Yr = e.style.outline),
          (e.style.outline = 'none'),
          ft(window, 'keydown', ur));
      }
      function ur() {
        hr &&
          ((hr.style.outline = Yr),
          (hr = void 0),
          (Yr = void 0),
          Et(window, 'keydown', ur));
      }
      function wo(e) {
        do e = e.parentNode;
        while ((!e.offsetWidth || !e.offsetHeight) && e !== document.body);
        return e;
      }
      function Xr(e) {
        var r = e.getBoundingClientRect();
        return {
          x: r.width / e.offsetWidth || 1,
          y: r.height / e.offsetHeight || 1,
          boundingClientRect: r,
        };
      }
      var lf = {
        __proto__: null,
        TRANSFORM: Ur,
        TRANSITION: Ei,
        TRANSITION_END: Lo,
        get: bo,
        getStyle: Si,
        create: xt,
        remove: Bt,
        empty: ar,
        toFront: ni,
        toBack: oi,
        hasClass: Vr,
        addClass: gt,
        removeClass: Ot,
        setClass: Hr,
        getClass: sr,
        setOpacity: Jt,
        testProp: lr,
        setTransform: Ze,
        setPosition: Rt,
        getPosition: Ue,
        get disableTextSelection() {
          return Ti;
        },
        get enableTextSelection() {
          return Di;
        },
        disableImageDrag: Kr,
        enableImageDrag: Wr,
        preventOutline: $r,
        restoreOutline: ur,
        getSizedParentNode: wo,
        getScale: Xr,
      };
      function ft(e, r, a, l) {
        if (r && typeof r == 'object') for (var u in r) Qr(e, u, r[u], a);
        else {
          r = R(r);
          for (var m = 0, x = r.length; m < x; m++) Qr(e, r[m], a, l);
        }
        return this;
      }
      var he = '_leaflet_events';
      function Et(e, r, a, l) {
        if (arguments.length === 1) xo(e), delete e[he];
        else if (r && typeof r == 'object') for (var u in r) tn(e, u, r[u], a);
        else if (((r = R(r)), arguments.length === 2))
          xo(e, function (T) {
            return I(r, T) !== -1;
          });
        else for (var m = 0, x = r.length; m < x; m++) tn(e, r[m], a, l);
        return this;
      }
      function xo(e, r) {
        for (var a in e[he]) {
          var l = a.split(/\d/)[0];
          (!r || r(l)) && tn(e, l, null, null, a);
        }
      }
      var Jr = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        wheel: !('onwheel' in window) && 'mousewheel',
      };
      function Qr(e, r, a, l) {
        var u = r + c(a) + (l ? '_' + c(l) : '');
        if (e[he] && e[he][u]) return this;
        var m = function (T) {
            return a.call(l || e, T || window.event);
          },
          x = m;
        !nt.touchNative && nt.pointer && r.indexOf('touch') === 0
          ? (m = $c(e, r, m))
          : nt.touch && r === 'dblclick'
            ? (m = of(e, m))
            : 'addEventListener' in e
              ? r === 'touchstart' ||
                r === 'touchmove' ||
                r === 'wheel' ||
                r === 'mousewheel'
                ? e.addEventListener(
                    Jr[r] || r,
                    m,
                    nt.passiveEvents ? { passive: !1 } : !1
                  )
                : r === 'mouseenter' || r === 'mouseleave'
                  ? ((m = function (T) {
                      (T = T || window.event), rn(e, T) && x(T);
                    }),
                    e.addEventListener(Jr[r], m, !1))
                  : e.addEventListener(r, x, !1)
              : e.attachEvent('on' + r, m),
          (e[he] = e[he] || {}),
          (e[he][u] = m);
      }
      function tn(e, r, a, l, u) {
        u = u || r + c(a) + (l ? '_' + c(l) : '');
        var m = e[he] && e[he][u];
        if (!m) return this;
        !nt.touchNative && nt.pointer && r.indexOf('touch') === 0
          ? Xc(e, r, m)
          : nt.touch && r === 'dblclick'
            ? af(e, m)
            : 'removeEventListener' in e
              ? e.removeEventListener(Jr[r] || r, m, !1)
              : e.detachEvent('on' + r, m),
          (e[he][u] = null);
      }
      function Ve(e) {
        return (
          e.stopPropagation
            ? e.stopPropagation()
            : e.originalEvent
              ? (e.originalEvent._stopped = !0)
              : (e.cancelBubble = !0),
          this
        );
      }
      function en(e) {
        return Qr(e, 'wheel', Ve), this;
      }
      function Ai(e) {
        return (
          ft(e, 'mousedown touchstart dblclick contextmenu', Ve),
          (e._leaflet_disable_click = !0),
          this
        );
      }
      function Ft(e) {
        return (
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1), this
        );
      }
      function He(e) {
        return Ft(e), Ve(e), this;
      }
      function ko(e) {
        if (e.composedPath) return e.composedPath();
        for (var r = [], a = e.target; a; ) r.push(a), (a = a.parentNode);
        return r;
      }
      function Mo(e, r) {
        if (!r) return new it(e.clientX, e.clientY);
        var a = Xr(r),
          l = a.boundingClientRect;
        return new it(
          (e.clientX - l.left) / a.x - r.clientLeft,
          (e.clientY - l.top) / a.y - r.clientTop
        );
      }
      var hf =
        nt.linux && nt.chrome
          ? window.devicePixelRatio
          : nt.mac
            ? window.devicePixelRatio * 3
            : window.devicePixelRatio > 0
              ? 2 * window.devicePixelRatio
              : 1;
      function Co(e) {
        return nt.edge
          ? e.wheelDeltaY / 2
          : e.deltaY && e.deltaMode === 0
            ? -e.deltaY / hf
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
      function rn(e, r) {
        var a = r.relatedTarget;
        if (!a) return !0;
        try {
          for (; a && a !== e; ) a = a.parentNode;
        } catch {
          return !1;
        }
        return a !== e;
      }
      var uf = {
          __proto__: null,
          on: ft,
          off: Et,
          stopPropagation: Ve,
          disableScrollPropagation: en,
          disableClickPropagation: Ai,
          preventDefault: Ft,
          stop: He,
          getPropagationPath: ko,
          getMousePosition: Mo,
          getWheelDelta: Co,
          isExternalTarget: rn,
          addListener: ft,
          removeListener: Et,
        },
        Po = Dt.extend({
          run: function (e, r, a, l) {
            this.stop(),
              (this._el = e),
              (this._inProgress = !0),
              (this._duration = a || 0.25),
              (this._easeOutPower = 1 / Math.max(l || 0.5, 0.2)),
              (this._startPos = Ue(e)),
              (this._offset = r.subtract(this._startPos)),
              (this._startTime = +new Date()),
              this.fire('start'),
              this._animate();
          },
          stop: function () {
            this._inProgress && (this._step(!0), this._complete());
          },
          _animate: function () {
            (this._animId = X(this._animate, this)), this._step();
          },
          _step: function (e) {
            var r = +new Date() - this._startTime,
              a = this._duration * 1e3;
            r < a
              ? this._runFrame(this._easeOut(r / a), e)
              : (this._runFrame(1), this._complete());
          },
          _runFrame: function (e, r) {
            var a = this._startPos.add(this._offset.multiplyBy(e));
            r && a._round(), Rt(this._el, a), this.fire('step');
          },
          _complete: function () {
            et(this._animId), (this._inProgress = !1), this.fire('end');
          },
          _easeOut: function (e) {
            return 1 - Math.pow(1 - e, this._easeOutPower);
          },
        }),
        Lt = Dt.extend({
          options: {
            crs: Gt,
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
          initialize: function (e, r) {
            (r = D(this, r)),
              (this._handlers = []),
              (this._layers = {}),
              (this._zoomBoundLayers = {}),
              (this._sizeChanged = !0),
              this._initContainer(e),
              this._initLayout(),
              (this._onResize = s(this._onResize, this)),
              this._initEvents(),
              r.maxBounds && this.setMaxBounds(r.maxBounds),
              r.zoom !== void 0 && (this._zoom = this._limitZoom(r.zoom)),
              r.center &&
                r.zoom !== void 0 &&
                this.setView(bt(r.center), r.zoom, { reset: !0 }),
              this.callInitHooks(),
              (this._zoomAnimated =
                Ei &&
                nt.any3d &&
                !nt.mobileOpera &&
                this.options.zoomAnimation),
              this._zoomAnimated &&
                (this._createAnimProxy(),
                ft(this._proxy, Lo, this._catchTransitionEnd, this)),
              this._addLayers(this.options.layers);
          },
          setView: function (e, r, a) {
            if (
              ((r = r === void 0 ? this._zoom : this._limitZoom(r)),
              (e = this._limitCenter(bt(e), r, this.options.maxBounds)),
              (a = a || {}),
              this._stop(),
              this._loaded && !a.reset && a !== !0)
            ) {
              a.animate !== void 0 &&
                ((a.zoom = n({ animate: a.animate }, a.zoom)),
                (a.pan = n(
                  { animate: a.animate, duration: a.duration },
                  a.pan
                )));
              var l =
                this._zoom !== r
                  ? this._tryAnimatedZoom && this._tryAnimatedZoom(e, r, a.zoom)
                  : this._tryAnimatedPan(e, a.pan);
              if (l) return clearTimeout(this._sizeTimer), this;
            }
            return this._resetView(e, r, a.pan && a.pan.noMoveStart), this;
          },
          setZoom: function (e, r) {
            return this._loaded
              ? this.setView(this.getCenter(), e, { zoom: r })
              : ((this._zoom = e), this);
          },
          zoomIn: function (e, r) {
            return (
              (e = e || (nt.any3d ? this.options.zoomDelta : 1)),
              this.setZoom(this._zoom + e, r)
            );
          },
          zoomOut: function (e, r) {
            return (
              (e = e || (nt.any3d ? this.options.zoomDelta : 1)),
              this.setZoom(this._zoom - e, r)
            );
          },
          setZoomAround: function (e, r, a) {
            var l = this.getZoomScale(r),
              u = this.getSize().divideBy(2),
              m = e instanceof it ? e : this.latLngToContainerPoint(e),
              x = m.subtract(u).multiplyBy(1 - 1 / l),
              T = this.containerPointToLatLng(u.add(x));
            return this.setView(T, r, { zoom: a });
          },
          _getBoundsCenterZoom: function (e, r) {
            (r = r || {}), (e = e.getBounds ? e.getBounds() : Pt(e));
            var a = Q(r.paddingTopLeft || r.padding || [0, 0]),
              l = Q(r.paddingBottomRight || r.padding || [0, 0]),
              u = this.getBoundsZoom(e, !1, a.add(l));
            if (
              ((u = typeof r.maxZoom == 'number' ? Math.min(r.maxZoom, u) : u),
              u === 1 / 0)
            )
              return { center: e.getCenter(), zoom: u };
            var m = l.subtract(a).divideBy(2),
              x = this.project(e.getSouthWest(), u),
              T = this.project(e.getNorthEast(), u),
              O = this.unproject(x.add(T).divideBy(2).add(m), u);
            return { center: O, zoom: u };
          },
          fitBounds: function (e, r) {
            if (((e = Pt(e)), !e.isValid()))
              throw new Error('Bounds are not valid.');
            var a = this._getBoundsCenterZoom(e, r);
            return this.setView(a.center, a.zoom, r);
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
          panTo: function (e, r) {
            return this.setView(e, this._zoom, { pan: r });
          },
          panBy: function (e, r) {
            if (((e = Q(e).round()), (r = r || {}), !e.x && !e.y))
              return this.fire('moveend');
            if (r.animate !== !0 && !this.getSize().contains(e))
              return (
                this._resetView(
                  this.unproject(this.project(this.getCenter()).add(e)),
                  this.getZoom()
                ),
                this
              );
            if (
              (this._panAnim ||
                ((this._panAnim = new Po()),
                this._panAnim.on(
                  {
                    step: this._onPanTransitionStep,
                    end: this._onPanTransitionEnd,
                  },
                  this
                )),
              r.noMoveStart || this.fire('movestart'),
              r.animate !== !1)
            ) {
              gt(this._mapPane, 'leaflet-pan-anim');
              var a = this._getMapPanePos().subtract(e).round();
              this._panAnim.run(
                this._mapPane,
                a,
                r.duration || 0.25,
                r.easeLinearity
              );
            } else this._rawPanBy(e), this.fire('move').fire('moveend');
            return this;
          },
          flyTo: function (e, r, a) {
            if (((a = a || {}), a.animate === !1 || !nt.any3d))
              return this.setView(e, r, a);
            this._stop();
            var l = this.project(this.getCenter()),
              u = this.project(e),
              m = this.getSize(),
              x = this._zoom;
            (e = bt(e)), (r = r === void 0 ? x : r);
            var T = Math.max(m.x, m.y),
              O = T * this.getZoomScale(x, r),
              U = u.distanceTo(l) || 1,
              J = 1.42,
              ut = J * J;
            function vt(It) {
              var xr = It ? -1 : 1,
                Jf = It ? O : T,
                Qf = O * O - T * T + xr * ut * ut * U * U,
                td = 2 * Jf * ut * U,
                pn = Qf / td,
                sa = Math.sqrt(pn * pn + 1) - pn,
                ed = sa < 1e-9 ? -18 : Math.log(sa);
              return ed;
            }
            function te(It) {
              return (Math.exp(It) - Math.exp(-It)) / 2;
            }
            function Ke(It) {
              return (Math.exp(It) + Math.exp(-It)) / 2;
            }
            function wr(It) {
              return te(It) / Ke(It);
            }
            var Te = vt(0);
            function dn(It) {
              return T * (Ke(Te) / Ke(Te + J * It));
            }
            function Wf(It) {
              return (T * (Ke(Te) * wr(Te + J * It) - te(Te))) / ut;
            }
            function Yf(It) {
              return 1 - Math.pow(1 - It, 1.5);
            }
            var $f = Date.now(),
              oa = (vt(1) - Te) / J,
              Xf = a.duration ? 1e3 * a.duration : 1e3 * oa * 0.8;
            function aa() {
              var It = (Date.now() - $f) / Xf,
                xr = Yf(It) * oa;
              It <= 1
                ? ((this._flyToFrame = X(aa, this)),
                  this._move(
                    this.unproject(
                      l.add(u.subtract(l).multiplyBy(Wf(xr) / U)),
                      x
                    ),
                    this.getScaleZoom(T / dn(xr), x),
                    { flyTo: !0 }
                  ))
                : this._move(e, r)._moveEnd(!0);
            }
            return this._moveStart(!0, a.noMoveStart), aa.call(this), this;
          },
          flyToBounds: function (e, r) {
            var a = this._getBoundsCenterZoom(e, r);
            return this.flyTo(a.center, a.zoom, r);
          },
          setMaxBounds: function (e) {
            return (
              (e = Pt(e)),
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
            var r = this.options.minZoom;
            return (
              (this.options.minZoom = e),
              this._loaded &&
              r !== e &&
              (this.fire('zoomlevelschange'),
              this.getZoom() < this.options.minZoom)
                ? this.setZoom(e)
                : this
            );
          },
          setMaxZoom: function (e) {
            var r = this.options.maxZoom;
            return (
              (this.options.maxZoom = e),
              this._loaded &&
              r !== e &&
              (this.fire('zoomlevelschange'),
              this.getZoom() > this.options.maxZoom)
                ? this.setZoom(e)
                : this
            );
          },
          panInsideBounds: function (e, r) {
            this._enforcingBounds = !0;
            var a = this.getCenter(),
              l = this._limitCenter(a, this._zoom, Pt(e));
            return (
              a.equals(l) || this.panTo(l, r),
              (this._enforcingBounds = !1),
              this
            );
          },
          panInside: function (e, r) {
            r = r || {};
            var a = Q(r.paddingTopLeft || r.padding || [0, 0]),
              l = Q(r.paddingBottomRight || r.padding || [0, 0]),
              u = this.project(this.getCenter()),
              m = this.project(e),
              x = this.getPixelBounds(),
              T = _t([x.min.add(a), x.max.subtract(l)]),
              O = T.getSize();
            if (!T.contains(m)) {
              this._enforcingBounds = !0;
              var U = m.subtract(T.getCenter()),
                J = T.extend(m).getSize().subtract(O);
              (u.x += U.x < 0 ? -J.x : J.x),
                (u.y += U.y < 0 ? -J.y : J.y),
                this.panTo(this.unproject(u), r),
                (this._enforcingBounds = !1);
            }
            return this;
          },
          invalidateSize: function (e) {
            if (!this._loaded) return this;
            e = n({ animate: !1, pan: !0 }, e === !0 ? { animate: !0 } : e);
            var r = this.getSize();
            (this._sizeChanged = !0), (this._lastCenter = null);
            var a = this.getSize(),
              l = r.divideBy(2).round(),
              u = a.divideBy(2).round(),
              m = l.subtract(u);
            return !m.x && !m.y
              ? this
              : (e.animate && e.pan
                  ? this.panBy(m)
                  : (e.pan && this._rawPanBy(m),
                    this.fire('move'),
                    e.debounceMoveend
                      ? (clearTimeout(this._sizeTimer),
                        (this._sizeTimer = setTimeout(
                          s(this.fire, this, 'moveend'),
                          200
                        )))
                      : this.fire('moveend')),
                this.fire('resize', { oldSize: r, newSize: a }));
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
              ((e = this._locateOptions = n({ timeout: 1e4, watch: !1 }, e)),
              !('geolocation' in navigator))
            )
              return (
                this._handleGeolocationError({
                  code: 0,
                  message: 'Geolocation not supported.',
                }),
                this
              );
            var r = s(this._handleGeolocationResponse, this),
              a = s(this._handleGeolocationError, this);
            return (
              e.watch
                ? (this._locationWatchId = navigator.geolocation.watchPosition(
                    r,
                    a,
                    e
                  ))
                : navigator.geolocation.getCurrentPosition(r, a, e),
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
              var r = e.code,
                a =
                  e.message ||
                  (r === 1
                    ? 'permission denied'
                    : r === 2
                      ? 'position unavailable'
                      : 'timeout');
              this._locateOptions.setView && !this._loaded && this.fitWorld(),
                this.fire('locationerror', {
                  code: r,
                  message: 'Geolocation error: ' + a + '.',
                });
            }
          },
          _handleGeolocationResponse: function (e) {
            if (this._container._leaflet_id) {
              var r = e.coords.latitude,
                a = e.coords.longitude,
                l = new mt(r, a),
                u = l.toBounds(e.coords.accuracy * 2),
                m = this._locateOptions;
              if (m.setView) {
                var x = this.getBoundsZoom(u);
                this.setView(l, m.maxZoom ? Math.min(x, m.maxZoom) : x);
              }
              var T = { latlng: l, bounds: u, timestamp: e.timestamp };
              for (var O in e.coords)
                typeof e.coords[O] == 'number' && (T[O] = e.coords[O]);
              this.fire('locationfound', T);
            }
          },
          addHandler: function (e, r) {
            if (!r) return this;
            var a = (this[e] = new r(this));
            return this._handlers.push(a), this.options[e] && a.enable(), this;
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
              Bt(this._mapPane),
              this._clearControlPos && this._clearControlPos(),
              this._resizeRequest &&
                (et(this._resizeRequest), (this._resizeRequest = null)),
              this._clearHandlers(),
              this._loaded && this.fire('unload');
            var e;
            for (e in this._layers) this._layers[e].remove();
            for (e in this._panes) Bt(this._panes[e]);
            return (
              (this._layers = []),
              (this._panes = []),
              delete this._mapPane,
              delete this._renderer,
              this
            );
          },
          createPane: function (e, r) {
            var a =
                'leaflet-pane' +
                (e ? ' leaflet-' + e.replace('Pane', '') + '-pane' : ''),
              l = xt('div', a, r || this._mapPane);
            return e && (this._panes[e] = l), l;
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
              r = this.unproject(e.getBottomLeft()),
              a = this.unproject(e.getTopRight());
            return new Tt(r, a);
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
          getBoundsZoom: function (e, r, a) {
            (e = Pt(e)), (a = Q(a || [0, 0]));
            var l = this.getZoom() || 0,
              u = this.getMinZoom(),
              m = this.getMaxZoom(),
              x = e.getNorthWest(),
              T = e.getSouthEast(),
              O = this.getSize().subtract(a),
              U = _t(this.project(T, l), this.project(x, l)).getSize(),
              J = nt.any3d ? this.options.zoomSnap : 1,
              ut = O.x / U.x,
              vt = O.y / U.y,
              te = r ? Math.max(ut, vt) : Math.min(ut, vt);
            return (
              (l = this.getScaleZoom(te, l)),
              J &&
                ((l = Math.round(l / (J / 100)) * (J / 100)),
                (l = r ? Math.ceil(l / J) * J : Math.floor(l / J) * J)),
              Math.max(u, Math.min(m, l))
            );
          },
          getSize: function () {
            return (
              (!this._size || this._sizeChanged) &&
                ((this._size = new it(
                  this._container.clientWidth || 0,
                  this._container.clientHeight || 0
                )),
                (this._sizeChanged = !1)),
              this._size.clone()
            );
          },
          getPixelBounds: function (e, r) {
            var a = this._getTopLeftPoint(e, r);
            return new pt(a, a.add(this.getSize()));
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
          getZoomScale: function (e, r) {
            var a = this.options.crs;
            return (r = r === void 0 ? this._zoom : r), a.scale(e) / a.scale(r);
          },
          getScaleZoom: function (e, r) {
            var a = this.options.crs;
            r = r === void 0 ? this._zoom : r;
            var l = a.zoom(e * a.scale(r));
            return isNaN(l) ? 1 / 0 : l;
          },
          project: function (e, r) {
            return (
              (r = r === void 0 ? this._zoom : r),
              this.options.crs.latLngToPoint(bt(e), r)
            );
          },
          unproject: function (e, r) {
            return (
              (r = r === void 0 ? this._zoom : r),
              this.options.crs.pointToLatLng(Q(e), r)
            );
          },
          layerPointToLatLng: function (e) {
            var r = Q(e).add(this.getPixelOrigin());
            return this.unproject(r);
          },
          latLngToLayerPoint: function (e) {
            var r = this.project(bt(e))._round();
            return r._subtract(this.getPixelOrigin());
          },
          wrapLatLng: function (e) {
            return this.options.crs.wrapLatLng(bt(e));
          },
          wrapLatLngBounds: function (e) {
            return this.options.crs.wrapLatLngBounds(Pt(e));
          },
          distance: function (e, r) {
            return this.options.crs.distance(bt(e), bt(r));
          },
          containerPointToLayerPoint: function (e) {
            return Q(e).subtract(this._getMapPanePos());
          },
          layerPointToContainerPoint: function (e) {
            return Q(e).add(this._getMapPanePos());
          },
          containerPointToLatLng: function (e) {
            var r = this.containerPointToLayerPoint(Q(e));
            return this.layerPointToLatLng(r);
          },
          latLngToContainerPoint: function (e) {
            return this.layerPointToContainerPoint(
              this.latLngToLayerPoint(bt(e))
            );
          },
          mouseEventToContainerPoint: function (e) {
            return Mo(e, this._container);
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
            var r = (this._container = bo(e));
            if (r) {
              if (r._leaflet_id)
                throw new Error('Map container is already initialized.');
            } else throw new Error('Map container not found.');
            ft(r, 'scroll', this._onScroll, this), (this._containerId = c(r));
          },
          _initLayout: function () {
            var e = this._container;
            (this._fadeAnimated = this.options.fadeAnimation && nt.any3d),
              gt(
                e,
                'leaflet-container' +
                  (nt.touch ? ' leaflet-touch' : '') +
                  (nt.retina ? ' leaflet-retina' : '') +
                  (nt.ielt9 ? ' leaflet-oldie' : '') +
                  (nt.safari ? ' leaflet-safari' : '') +
                  (this._fadeAnimated ? ' leaflet-fade-anim' : '')
              );
            var r = Si(e, 'position');
            r !== 'absolute' &&
              r !== 'relative' &&
              r !== 'fixed' &&
              r !== 'sticky' &&
              (e.style.position = 'relative'),
              this._initPanes(),
              this._initControlPos && this._initControlPos();
          },
          _initPanes: function () {
            var e = (this._panes = {});
            (this._paneRenderers = {}),
              (this._mapPane = this.createPane('mapPane', this._container)),
              Rt(this._mapPane, new it(0, 0)),
              this.createPane('tilePane'),
              this.createPane('overlayPane'),
              this.createPane('shadowPane'),
              this.createPane('markerPane'),
              this.createPane('tooltipPane'),
              this.createPane('popupPane'),
              this.options.markerZoomAnimation ||
                (gt(e.markerPane, 'leaflet-zoom-hide'),
                gt(e.shadowPane, 'leaflet-zoom-hide'));
          },
          _resetView: function (e, r, a) {
            Rt(this._mapPane, new it(0, 0));
            var l = !this._loaded;
            (this._loaded = !0),
              (r = this._limitZoom(r)),
              this.fire('viewprereset');
            var u = this._zoom !== r;
            this._moveStart(u, a)._move(e, r)._moveEnd(u),
              this.fire('viewreset'),
              l && this.fire('load');
          },
          _moveStart: function (e, r) {
            return (
              e && this.fire('zoomstart'), r || this.fire('movestart'), this
            );
          },
          _move: function (e, r, a, l) {
            r === void 0 && (r = this._zoom);
            var u = this._zoom !== r;
            return (
              (this._zoom = r),
              (this._lastCenter = e),
              (this._pixelOrigin = this._getNewPixelOrigin(e)),
              l
                ? a && a.pinch && this.fire('zoom', a)
                : ((u || (a && a.pinch)) && this.fire('zoom', a),
                  this.fire('move', a)),
              this
            );
          },
          _moveEnd: function (e) {
            return e && this.fire('zoomend'), this.fire('moveend');
          },
          _stop: function () {
            return (
              et(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            );
          },
          _rawPanBy: function (e) {
            Rt(this._mapPane, this._getMapPanePos().subtract(e));
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
            (this._targets = {}), (this._targets[c(this._container)] = this);
            var r = e ? Et : ft;
            r(
              this._container,
              'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup',
              this._handleDOMEvent,
              this
            ),
              this.options.trackResize &&
                r(window, 'resize', this._onResize, this),
              nt.any3d &&
                this.options.transform3DLimit &&
                (e ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
          },
          _onResize: function () {
            et(this._resizeRequest),
              (this._resizeRequest = X(function () {
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
          _findEventTargets: function (e, r) {
            for (
              var a = [],
                l,
                u = r === 'mouseout' || r === 'mouseover',
                m = e.target || e.srcElement,
                x = !1;
              m;

            ) {
              if (
                ((l = this._targets[c(m)]),
                l &&
                  (r === 'click' || r === 'preclick') &&
                  this._draggableMoved(l))
              ) {
                x = !0;
                break;
              }
              if (
                (l &&
                  l.listens(r, !0) &&
                  ((u && !rn(m, e)) || (a.push(l), u))) ||
                m === this._container
              )
                break;
              m = m.parentNode;
            }
            return (
              !a.length && !x && !u && this.listens(r, !0) && (a = [this]), a
            );
          },
          _isClickDisabled: function (e) {
            for (; e && e !== this._container; ) {
              if (e._leaflet_disable_click) return !0;
              e = e.parentNode;
            }
          },
          _handleDOMEvent: function (e) {
            var r = e.target || e.srcElement;
            if (
              !(
                !this._loaded ||
                r._leaflet_disable_events ||
                (e.type === 'click' && this._isClickDisabled(r))
              )
            ) {
              var a = e.type;
              a === 'mousedown' && $r(r), this._fireDOMEvent(e, a);
            }
          },
          _mouseEvents: [
            'click',
            'dblclick',
            'mouseover',
            'mouseout',
            'contextmenu',
          ],
          _fireDOMEvent: function (e, r, a) {
            if (e.type === 'click') {
              var l = n({}, e);
              (l.type = 'preclick'), this._fireDOMEvent(l, l.type, a);
            }
            var u = this._findEventTargets(e, r);
            if (a) {
              for (var m = [], x = 0; x < a.length; x++)
                a[x].listens(r, !0) && m.push(a[x]);
              u = m.concat(u);
            }
            if (u.length) {
              r === 'contextmenu' && Ft(e);
              var T = u[0],
                O = { originalEvent: e };
              if (
                e.type !== 'keypress' &&
                e.type !== 'keydown' &&
                e.type !== 'keyup'
              ) {
                var U = T.getLatLng && (!T._radius || T._radius <= 10);
                (O.containerPoint = U
                  ? this.latLngToContainerPoint(T.getLatLng())
                  : this.mouseEventToContainerPoint(e)),
                  (O.layerPoint = this.containerPointToLayerPoint(
                    O.containerPoint
                  )),
                  (O.latlng = U
                    ? T.getLatLng()
                    : this.layerPointToLatLng(O.layerPoint));
              }
              for (x = 0; x < u.length; x++)
                if (
                  (u[x].fire(r, O, !0),
                  O.originalEvent._stopped ||
                    (u[x].options.bubblingMouseEvents === !1 &&
                      I(this._mouseEvents, r) !== -1))
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
            for (var e = 0, r = this._handlers.length; e < r; e++)
              this._handlers[e].disable();
          },
          whenReady: function (e, r) {
            return (
              this._loaded
                ? e.call(r || this, { target: this })
                : this.on('load', e, r),
              this
            );
          },
          _getMapPanePos: function () {
            return Ue(this._mapPane) || new it(0, 0);
          },
          _moved: function () {
            var e = this._getMapPanePos();
            return e && !e.equals([0, 0]);
          },
          _getTopLeftPoint: function (e, r) {
            var a =
              e && r !== void 0
                ? this._getNewPixelOrigin(e, r)
                : this.getPixelOrigin();
            return a.subtract(this._getMapPanePos());
          },
          _getNewPixelOrigin: function (e, r) {
            var a = this.getSize()._divideBy(2);
            return this.project(e, r)
              ._subtract(a)
              ._add(this._getMapPanePos())
              ._round();
          },
          _latLngToNewLayerPoint: function (e, r, a) {
            var l = this._getNewPixelOrigin(a, r);
            return this.project(e, r)._subtract(l);
          },
          _latLngBoundsToNewLayerBounds: function (e, r, a) {
            var l = this._getNewPixelOrigin(a, r);
            return _t([
              this.project(e.getSouthWest(), r)._subtract(l),
              this.project(e.getNorthWest(), r)._subtract(l),
              this.project(e.getSouthEast(), r)._subtract(l),
              this.project(e.getNorthEast(), r)._subtract(l),
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
          _limitCenter: function (e, r, a) {
            if (!a) return e;
            var l = this.project(e, r),
              u = this.getSize().divideBy(2),
              m = new pt(l.subtract(u), l.add(u)),
              x = this._getBoundsOffset(m, a, r);
            return Math.abs(x.x) <= 1 && Math.abs(x.y) <= 1
              ? e
              : this.unproject(l.add(x), r);
          },
          _limitOffset: function (e, r) {
            if (!r) return e;
            var a = this.getPixelBounds(),
              l = new pt(a.min.add(e), a.max.add(e));
            return e.add(this._getBoundsOffset(l, r));
          },
          _getBoundsOffset: function (e, r, a) {
            var l = _t(
                this.project(r.getNorthEast(), a),
                this.project(r.getSouthWest(), a)
              ),
              u = l.min.subtract(e.min),
              m = l.max.subtract(e.max),
              x = this._rebound(u.x, -m.x),
              T = this._rebound(u.y, -m.y);
            return new it(x, T);
          },
          _rebound: function (e, r) {
            return e + r > 0
              ? Math.round(e - r) / 2
              : Math.max(0, Math.ceil(e)) - Math.max(0, Math.floor(r));
          },
          _limitZoom: function (e) {
            var r = this.getMinZoom(),
              a = this.getMaxZoom(),
              l = nt.any3d ? this.options.zoomSnap : 1;
            return (
              l && (e = Math.round(e / l) * l), Math.max(r, Math.min(a, e))
            );
          },
          _onPanTransitionStep: function () {
            this.fire('move');
          },
          _onPanTransitionEnd: function () {
            Ot(this._mapPane, 'leaflet-pan-anim'), this.fire('moveend');
          },
          _tryAnimatedPan: function (e, r) {
            var a = this._getCenterOffset(e)._trunc();
            return (r && r.animate) !== !0 && !this.getSize().contains(a)
              ? !1
              : (this.panBy(a, r), !0);
          },
          _createAnimProxy: function () {
            var e = (this._proxy = xt(
              'div',
              'leaflet-proxy leaflet-zoom-animated'
            ));
            this._panes.mapPane.appendChild(e),
              this.on(
                'zoomanim',
                function (r) {
                  var a = Ur,
                    l = this._proxy.style[a];
                  Ze(
                    this._proxy,
                    this.project(r.center, r.zoom),
                    this.getZoomScale(r.zoom, 1)
                  ),
                    l === this._proxy.style[a] &&
                      this._animatingZoom &&
                      this._onZoomTransitionEnd();
                },
                this
              ),
              this.on('load moveend', this._animMoveEnd, this),
              this._on('unload', this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function () {
            Bt(this._proxy),
              this.off('load moveend', this._animMoveEnd, this),
              delete this._proxy;
          },
          _animMoveEnd: function () {
            var e = this.getCenter(),
              r = this.getZoom();
            Ze(this._proxy, this.project(e, r), this.getZoomScale(r, 1));
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
          _tryAnimatedZoom: function (e, r, a) {
            if (this._animatingZoom) return !0;
            if (
              ((a = a || {}),
              !this._zoomAnimated ||
                a.animate === !1 ||
                this._nothingToAnimate() ||
                Math.abs(r - this._zoom) > this.options.zoomAnimationThreshold)
            )
              return !1;
            var l = this.getZoomScale(r),
              u = this._getCenterOffset(e)._divideBy(1 - 1 / l);
            return a.animate !== !0 && !this.getSize().contains(u)
              ? !1
              : (X(function () {
                  this._moveStart(!0, !1)._animateZoom(e, r, !0);
                }, this),
                !0);
          },
          _animateZoom: function (e, r, a, l) {
            this._mapPane &&
              (a &&
                ((this._animatingZoom = !0),
                (this._animateToCenter = e),
                (this._animateToZoom = r),
                gt(this._mapPane, 'leaflet-zoom-anim')),
              this.fire('zoomanim', { center: e, zoom: r, noUpdate: l }),
              this._tempFireZoomEvent ||
                (this._tempFireZoomEvent = this._zoom !== this._animateToZoom),
              this._move(
                this._animateToCenter,
                this._animateToZoom,
                void 0,
                !0
              ),
              setTimeout(s(this._onZoomTransitionEnd, this), 250));
          },
          _onZoomTransitionEnd: function () {
            this._animatingZoom &&
              (this._mapPane && Ot(this._mapPane, 'leaflet-zoom-anim'),
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
      function cf(e, r) {
        return new Lt(e, r);
      }
      var re = ht.extend({
          options: { position: 'topright' },
          initialize: function (e) {
            D(this, e);
          },
          getPosition: function () {
            return this.options.position;
          },
          setPosition: function (e) {
            var r = this._map;
            return (
              r && r.removeControl(this),
              (this.options.position = e),
              r && r.addControl(this),
              this
            );
          },
          getContainer: function () {
            return this._container;
          },
          addTo: function (e) {
            this.remove(), (this._map = e);
            var r = (this._container = this.onAdd(e)),
              a = this.getPosition(),
              l = e._controlCorners[a];
            return (
              gt(r, 'leaflet-control'),
              a.indexOf('bottom') !== -1
                ? l.insertBefore(r, l.firstChild)
                : l.appendChild(r),
              this._map.on('unload', this.remove, this),
              this
            );
          },
          remove: function () {
            return this._map
              ? (Bt(this._container),
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
        Oi = function (e) {
          return new re(e);
        };
      Lt.include({
        addControl: function (e) {
          return e.addTo(this), this;
        },
        removeControl: function (e) {
          return e.remove(), this;
        },
        _initControlPos: function () {
          var e = (this._controlCorners = {}),
            r = 'leaflet-',
            a = (this._controlContainer = xt(
              'div',
              r + 'control-container',
              this._container
            ));
          function l(u, m) {
            var x = r + u + ' ' + r + m;
            e[u + m] = xt('div', x, a);
          }
          l('top', 'left'),
            l('top', 'right'),
            l('bottom', 'left'),
            l('bottom', 'right');
        },
        _clearControlPos: function () {
          for (var e in this._controlCorners) Bt(this._controlCorners[e]);
          Bt(this._controlContainer),
            delete this._controlCorners,
            delete this._controlContainer;
        },
      });
      var Eo = re.extend({
          options: {
            collapsed: !0,
            position: 'topright',
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function (e, r, a, l) {
              return a < l ? -1 : l < a ? 1 : 0;
            },
          },
          initialize: function (e, r, a) {
            D(this, a),
              (this._layerControlInputs = []),
              (this._layers = []),
              (this._lastZIndex = 0),
              (this._handlingClick = !1);
            for (var l in e) this._addLayer(e[l], l);
            for (l in r) this._addLayer(r[l], l, !0);
          },
          onAdd: function (e) {
            this._initLayout(),
              this._update(),
              (this._map = e),
              e.on('zoomend', this._checkDisabledLayers, this);
            for (var r = 0; r < this._layers.length; r++)
              this._layers[r].layer.on('add remove', this._onLayerChange, this);
            return this._container;
          },
          addTo: function (e) {
            return (
              re.prototype.addTo.call(this, e), this._expandIfNotCollapsed()
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
          addBaseLayer: function (e, r) {
            return this._addLayer(e, r), this._map ? this._update() : this;
          },
          addOverlay: function (e, r) {
            return this._addLayer(e, r, !0), this._map ? this._update() : this;
          },
          removeLayer: function (e) {
            e.off('add remove', this._onLayerChange, this);
            var r = this._getLayer(c(e));
            return (
              r && this._layers.splice(this._layers.indexOf(r), 1),
              this._map ? this._update() : this
            );
          },
          expand: function () {
            gt(this._container, 'leaflet-control-layers-expanded'),
              (this._section.style.height = null);
            var e = this._map.getSize().y - (this._container.offsetTop + 50);
            return (
              e < this._section.clientHeight
                ? (gt(this._section, 'leaflet-control-layers-scrollbar'),
                  (this._section.style.height = e + 'px'))
                : Ot(this._section, 'leaflet-control-layers-scrollbar'),
              this._checkDisabledLayers(),
              this
            );
          },
          collapse: function () {
            return Ot(this._container, 'leaflet-control-layers-expanded'), this;
          },
          _initLayout: function () {
            var e = 'leaflet-control-layers',
              r = (this._container = xt('div', e)),
              a = this.options.collapsed;
            r.setAttribute('aria-haspopup', !0), Ai(r), en(r);
            var l = (this._section = xt('section', e + '-list'));
            a &&
              (this._map.on('click', this.collapse, this),
              ft(
                r,
                { mouseenter: this._expandSafely, mouseleave: this.collapse },
                this
              ));
            var u = (this._layersLink = xt('a', e + '-toggle', r));
            (u.href = '#'),
              (u.title = 'Layers'),
              u.setAttribute('role', 'button'),
              ft(
                u,
                {
                  keydown: function (m) {
                    m.keyCode === 13 && this._expandSafely();
                  },
                  click: function (m) {
                    Ft(m), this._expandSafely();
                  },
                },
                this
              ),
              a || this.expand(),
              (this._baseLayersList = xt('div', e + '-base', l)),
              (this._separator = xt('div', e + '-separator', l)),
              (this._overlaysList = xt('div', e + '-overlays', l)),
              r.appendChild(l);
          },
          _getLayer: function (e) {
            for (var r = 0; r < this._layers.length; r++)
              if (this._layers[r] && c(this._layers[r].layer) === e)
                return this._layers[r];
          },
          _addLayer: function (e, r, a) {
            this._map && e.on('add remove', this._onLayerChange, this),
              this._layers.push({ layer: e, name: r, overlay: a }),
              this.options.sortLayers &&
                this._layers.sort(
                  s(function (l, u) {
                    return this.options.sortFunction(
                      l.layer,
                      u.layer,
                      l.name,
                      u.name
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
            ar(this._baseLayersList),
              ar(this._overlaysList),
              (this._layerControlInputs = []);
            var e,
              r,
              a,
              l,
              u = 0;
            for (a = 0; a < this._layers.length; a++)
              (l = this._layers[a]),
                this._addItem(l),
                (r = r || l.overlay),
                (e = e || !l.overlay),
                (u += l.overlay ? 0 : 1);
            return (
              this.options.hideSingleBase &&
                ((e = e && u > 1),
                (this._baseLayersList.style.display = e ? '' : 'none')),
              (this._separator.style.display = r && e ? '' : 'none'),
              this
            );
          },
          _onLayerChange: function (e) {
            this._handlingClick || this._update();
            var r = this._getLayer(c(e.target)),
              a = r.overlay
                ? e.type === 'add'
                  ? 'overlayadd'
                  : 'overlayremove'
                : e.type === 'add'
                  ? 'baselayerchange'
                  : null;
            a && this._map.fire(a, r);
          },
          _createRadioElement: function (e, r) {
            var a =
                '<input type="radio" class="leaflet-control-layers-selector" name="' +
                e +
                '"' +
                (r ? ' checked="checked"' : '') +
                '/>',
              l = document.createElement('div');
            return (l.innerHTML = a), l.firstChild;
          },
          _addItem: function (e) {
            var r = document.createElement('label'),
              a = this._map.hasLayer(e.layer),
              l;
            e.overlay
              ? ((l = document.createElement('input')),
                (l.type = 'checkbox'),
                (l.className = 'leaflet-control-layers-selector'),
                (l.defaultChecked = a))
              : (l = this._createRadioElement(
                  'leaflet-base-layers_' + c(this),
                  a
                )),
              this._layerControlInputs.push(l),
              (l.layerId = c(e.layer)),
              ft(l, 'click', this._onInputClick, this);
            var u = document.createElement('span');
            u.innerHTML = ' ' + e.name;
            var m = document.createElement('span');
            r.appendChild(m), m.appendChild(l), m.appendChild(u);
            var x = e.overlay ? this._overlaysList : this._baseLayersList;
            return x.appendChild(r), this._checkDisabledLayers(), r;
          },
          _onInputClick: function () {
            var e = this._layerControlInputs,
              r,
              a,
              l = [],
              u = [];
            this._handlingClick = !0;
            for (var m = e.length - 1; m >= 0; m--)
              (r = e[m]),
                (a = this._getLayer(r.layerId).layer),
                r.checked ? l.push(a) : r.checked || u.push(a);
            for (m = 0; m < u.length; m++)
              this._map.hasLayer(u[m]) && this._map.removeLayer(u[m]);
            for (m = 0; m < l.length; m++)
              this._map.hasLayer(l[m]) || this._map.addLayer(l[m]);
            (this._handlingClick = !1), this._refocusOnMap();
          },
          _checkDisabledLayers: function () {
            for (
              var e = this._layerControlInputs,
                r,
                a,
                l = this._map.getZoom(),
                u = e.length - 1;
              u >= 0;
              u--
            )
              (r = e[u]),
                (a = this._getLayer(r.layerId).layer),
                (r.disabled =
                  (a.options.minZoom !== void 0 && l < a.options.minZoom) ||
                  (a.options.maxZoom !== void 0 && l > a.options.maxZoom));
          },
          _expandIfNotCollapsed: function () {
            return this._map && !this.options.collapsed && this.expand(), this;
          },
          _expandSafely: function () {
            var e = this._section;
            ft(e, 'click', Ft),
              this.expand(),
              setTimeout(function () {
                Et(e, 'click', Ft);
              });
          },
        }),
        ff = function (e, r, a) {
          return new Eo(e, r, a);
        },
        nn = re.extend({
          options: {
            position: 'topleft',
            zoomInText: '<span aria-hidden="true">+</span>',
            zoomInTitle: 'Zoom in',
            zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
            zoomOutTitle: 'Zoom out',
          },
          onAdd: function (e) {
            var r = 'leaflet-control-zoom',
              a = xt('div', r + ' leaflet-bar'),
              l = this.options;
            return (
              (this._zoomInButton = this._createButton(
                l.zoomInText,
                l.zoomInTitle,
                r + '-in',
                a,
                this._zoomIn
              )),
              (this._zoomOutButton = this._createButton(
                l.zoomOutText,
                l.zoomOutTitle,
                r + '-out',
                a,
                this._zoomOut
              )),
              this._updateDisabled(),
              e.on('zoomend zoomlevelschange', this._updateDisabled, this),
              a
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
          _createButton: function (e, r, a, l, u) {
            var m = xt('a', a, l);
            return (
              (m.innerHTML = e),
              (m.href = '#'),
              (m.title = r),
              m.setAttribute('role', 'button'),
              m.setAttribute('aria-label', r),
              Ai(m),
              ft(m, 'click', He),
              ft(m, 'click', u, this),
              ft(m, 'click', this._refocusOnMap, this),
              m
            );
          },
          _updateDisabled: function () {
            var e = this._map,
              r = 'leaflet-disabled';
            Ot(this._zoomInButton, r),
              Ot(this._zoomOutButton, r),
              this._zoomInButton.setAttribute('aria-disabled', 'false'),
              this._zoomOutButton.setAttribute('aria-disabled', 'false'),
              (this._disabled || e._zoom === e.getMinZoom()) &&
                (gt(this._zoomOutButton, r),
                this._zoomOutButton.setAttribute('aria-disabled', 'true')),
              (this._disabled || e._zoom === e.getMaxZoom()) &&
                (gt(this._zoomInButton, r),
                this._zoomInButton.setAttribute('aria-disabled', 'true'));
          },
        });
      Lt.mergeOptions({ zoomControl: !0 }),
        Lt.addInitHook(function () {
          this.options.zoomControl &&
            ((this.zoomControl = new nn()), this.addControl(this.zoomControl));
        });
      var df = function (e) {
          return new nn(e);
        },
        So = re.extend({
          options: {
            position: 'bottomleft',
            maxWidth: 100,
            metric: !0,
            imperial: !0,
          },
          onAdd: function (e) {
            var r = 'leaflet-control-scale',
              a = xt('div', r),
              l = this.options;
            return (
              this._addScales(l, r + '-line', a),
              e.on(l.updateWhenIdle ? 'moveend' : 'move', this._update, this),
              e.whenReady(this._update, this),
              a
            );
          },
          onRemove: function (e) {
            e.off(
              this.options.updateWhenIdle ? 'moveend' : 'move',
              this._update,
              this
            );
          },
          _addScales: function (e, r, a) {
            e.metric && (this._mScale = xt('div', r, a)),
              e.imperial && (this._iScale = xt('div', r, a));
          },
          _update: function () {
            var e = this._map,
              r = e.getSize().y / 2,
              a = e.distance(
                e.containerPointToLatLng([0, r]),
                e.containerPointToLatLng([this.options.maxWidth, r])
              );
            this._updateScales(a);
          },
          _updateScales: function (e) {
            this.options.metric && e && this._updateMetric(e),
              this.options.imperial && e && this._updateImperial(e);
          },
          _updateMetric: function (e) {
            var r = this._getRoundNum(e),
              a = r < 1e3 ? r + ' m' : r / 1e3 + ' km';
            this._updateScale(this._mScale, a, r / e);
          },
          _updateImperial: function (e) {
            var r = e * 3.2808399,
              a,
              l,
              u;
            r > 5280
              ? ((a = r / 5280),
                (l = this._getRoundNum(a)),
                this._updateScale(this._iScale, l + ' mi', l / a))
              : ((u = this._getRoundNum(r)),
                this._updateScale(this._iScale, u + ' ft', u / r));
          },
          _updateScale: function (e, r, a) {
            (e.style.width = Math.round(this.options.maxWidth * a) + 'px'),
              (e.innerHTML = r);
          },
          _getRoundNum: function (e) {
            var r = Math.pow(10, (Math.floor(e) + '').length - 1),
              a = e / r;
            return (
              (a = a >= 10 ? 10 : a >= 5 ? 5 : a >= 3 ? 3 : a >= 2 ? 2 : 1),
              r * a
            );
          },
        }),
        pf = function (e) {
          return new So(e);
        },
        mf =
          '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',
        on = re.extend({
          options: {
            position: 'bottomright',
            prefix:
              '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' +
              (nt.inlineSvg ? mf + ' ' : '') +
              'Leaflet</a>',
          },
          initialize: function (e) {
            D(this, e), (this._attributions = {});
          },
          onAdd: function (e) {
            (e.attributionControl = this),
              (this._container = xt('div', 'leaflet-control-attribution')),
              Ai(this._container);
            for (var r in e._layers)
              e._layers[r].getAttribution &&
                this.addAttribution(e._layers[r].getAttribution());
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
              for (var r in this._attributions)
                this._attributions[r] && e.push(r);
              var a = [];
              this.options.prefix && a.push(this.options.prefix),
                e.length && a.push(e.join(', ')),
                (this._container.innerHTML = a.join(
                  ' <span aria-hidden="true">|</span> '
                ));
            }
          },
        });
      Lt.mergeOptions({ attributionControl: !0 }),
        Lt.addInitHook(function () {
          this.options.attributionControl && new on().addTo(this);
        });
      var gf = function (e) {
        return new on(e);
      };
      (re.Layers = Eo),
        (re.Zoom = nn),
        (re.Scale = So),
        (re.Attribution = on),
        (Oi.layers = ff),
        (Oi.zoom = df),
        (Oi.scale = pf),
        (Oi.attribution = gf);
      var ue = ht.extend({
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
      ue.addTo = function (e, r) {
        return e.addHandler(r, this), this;
      };
      var _f = { Events: kt },
        To = nt.touch ? 'touchstart mousedown' : 'mousedown',
        Ee = Dt.extend({
          options: { clickTolerance: 3 },
          initialize: function (e, r, a, l) {
            D(this, l),
              (this._element = e),
              (this._dragStartTarget = r || e),
              (this._preventOutline = a);
          },
          enable: function () {
            this._enabled ||
              (ft(this._dragStartTarget, To, this._onDown, this),
              (this._enabled = !0));
          },
          disable: function () {
            this._enabled &&
              (Ee._dragging === this && this.finishDrag(!0),
              Et(this._dragStartTarget, To, this._onDown, this),
              (this._enabled = !1),
              (this._moved = !1));
          },
          _onDown: function (e) {
            if (
              this._enabled &&
              ((this._moved = !1), !Vr(this._element, 'leaflet-zoom-anim'))
            ) {
              if (e.touches && e.touches.length !== 1) {
                Ee._dragging === this && this.finishDrag();
                return;
              }
              if (
                !(
                  Ee._dragging ||
                  e.shiftKey ||
                  (e.which !== 1 && e.button !== 1 && !e.touches)
                ) &&
                ((Ee._dragging = this),
                this._preventOutline && $r(this._element),
                Kr(),
                Ti(),
                !this._moving)
              ) {
                this.fire('down');
                var r = e.touches ? e.touches[0] : e,
                  a = wo(this._element);
                (this._startPoint = new it(r.clientX, r.clientY)),
                  (this._startPos = Ue(this._element)),
                  (this._parentScale = Xr(a));
                var l = e.type === 'mousedown';
                ft(document, l ? 'mousemove' : 'touchmove', this._onMove, this),
                  ft(
                    document,
                    l ? 'mouseup' : 'touchend touchcancel',
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
              var r = e.touches && e.touches.length === 1 ? e.touches[0] : e,
                a = new it(r.clientX, r.clientY)._subtract(this._startPoint);
              (!a.x && !a.y) ||
                Math.abs(a.x) + Math.abs(a.y) < this.options.clickTolerance ||
                ((a.x /= this._parentScale.x),
                (a.y /= this._parentScale.y),
                Ft(e),
                this._moved ||
                  (this.fire('dragstart'),
                  (this._moved = !0),
                  gt(document.body, 'leaflet-dragging'),
                  (this._lastTarget = e.target || e.srcElement),
                  window.SVGElementInstance &&
                    this._lastTarget instanceof window.SVGElementInstance &&
                    (this._lastTarget =
                      this._lastTarget.correspondingUseElement),
                  gt(this._lastTarget, 'leaflet-drag-target')),
                (this._newPos = this._startPos.add(a)),
                (this._moving = !0),
                (this._lastEvent = e),
                this._updatePosition());
            }
          },
          _updatePosition: function () {
            var e = { originalEvent: this._lastEvent };
            this.fire('predrag', e),
              Rt(this._element, this._newPos),
              this.fire('drag', e);
          },
          _onUp: function () {
            this._enabled && this.finishDrag();
          },
          finishDrag: function (e) {
            Ot(document.body, 'leaflet-dragging'),
              this._lastTarget &&
                (Ot(this._lastTarget, 'leaflet-drag-target'),
                (this._lastTarget = null)),
              Et(document, 'mousemove touchmove', this._onMove, this),
              Et(document, 'mouseup touchend touchcancel', this._onUp, this),
              Wr(),
              Di(),
              this._moved &&
                this._moving &&
                this.fire('dragend', {
                  noInertia: e,
                  distance: this._newPos.distanceTo(this._startPos),
                }),
              (this._moving = !1),
              (Ee._dragging = !1);
          },
        });
      function Do(e, r) {
        if (!r || !e.length) return e.slice();
        var a = r * r;
        return (e = Lf(e, a)), (e = vf(e, a)), e;
      }
      function Bo(e, r, a) {
        return Math.sqrt(Ri(e, r, a, !0));
      }
      function yf(e, r, a) {
        return Ri(e, r, a);
      }
      function vf(e, r) {
        var a = e.length,
          l = typeof Uint8Array < 'u' ? Uint8Array : Array,
          u = new l(a);
        (u[0] = u[a - 1] = 1), an(e, u, r, 0, a - 1);
        var m,
          x = [];
        for (m = 0; m < a; m++) u[m] && x.push(e[m]);
        return x;
      }
      function an(e, r, a, l, u) {
        var m = 0,
          x,
          T,
          O;
        for (T = l + 1; T <= u - 1; T++)
          (O = Ri(e[T], e[l], e[u], !0)), O > m && ((x = T), (m = O));
        m > a && ((r[x] = 1), an(e, r, a, l, x), an(e, r, a, x, u));
      }
      function Lf(e, r) {
        for (var a = [e[0]], l = 1, u = 0, m = e.length; l < m; l++)
          bf(e[l], e[u]) > r && (a.push(e[l]), (u = l));
        return u < m - 1 && a.push(e[m - 1]), a;
      }
      var Ao;
      function Oo(e, r, a, l, u) {
        var m = l ? Ao : je(e, a),
          x = je(r, a),
          T,
          O,
          U;
        for (Ao = x; ; ) {
          if (!(m | x)) return [e, r];
          if (m & x) return !1;
          (T = m || x),
            (O = cr(e, r, T, a, u)),
            (U = je(O, a)),
            T === m ? ((e = O), (m = U)) : ((r = O), (x = U));
        }
      }
      function cr(e, r, a, l, u) {
        var m = r.x - e.x,
          x = r.y - e.y,
          T = l.min,
          O = l.max,
          U,
          J;
        return (
          a & 8
            ? ((U = e.x + (m * (O.y - e.y)) / x), (J = O.y))
            : a & 4
              ? ((U = e.x + (m * (T.y - e.y)) / x), (J = T.y))
              : a & 2
                ? ((U = O.x), (J = e.y + (x * (O.x - e.x)) / m))
                : a & 1 && ((U = T.x), (J = e.y + (x * (T.x - e.x)) / m)),
          new it(U, J, u)
        );
      }
      function je(e, r) {
        var a = 0;
        return (
          e.x < r.min.x ? (a |= 1) : e.x > r.max.x && (a |= 2),
          e.y < r.min.y ? (a |= 4) : e.y > r.max.y && (a |= 8),
          a
        );
      }
      function bf(e, r) {
        var a = r.x - e.x,
          l = r.y - e.y;
        return a * a + l * l;
      }
      function Ri(e, r, a, l) {
        var u = r.x,
          m = r.y,
          x = a.x - u,
          T = a.y - m,
          O = x * x + T * T,
          U;
        return (
          O > 0 &&
            ((U = ((e.x - u) * x + (e.y - m) * T) / O),
            U > 1
              ? ((u = a.x), (m = a.y))
              : U > 0 && ((u += x * U), (m += T * U))),
          (x = e.x - u),
          (T = e.y - m),
          l ? x * x + T * T : new it(u, m)
        );
      }
      function Qt(e) {
        return !C(e[0]) || (typeof e[0][0] != 'object' && typeof e[0][0] < 'u');
      }
      function Ro(e) {
        return (
          console.warn(
            'Deprecated use of _flat, please use L.LineUtil.isFlat instead.'
          ),
          Qt(e)
        );
      }
      function Io(e, r) {
        var a, l, u, m, x, T, O, U;
        if (!e || e.length === 0) throw new Error('latlngs not passed');
        Qt(e) ||
          (console.warn(
            'latlngs are not flat! Only the first ring will be used'
          ),
          (e = e[0]));
        var J = [];
        for (var ut in e) J.push(r.project(bt(e[ut])));
        var vt = J.length;
        for (a = 0, l = 0; a < vt - 1; a++) l += J[a].distanceTo(J[a + 1]) / 2;
        if (l === 0) U = J[0];
        else
          for (a = 0, m = 0; a < vt - 1; a++)
            if (
              ((x = J[a]),
              (T = J[a + 1]),
              (u = x.distanceTo(T)),
              (m += u),
              m > l)
            ) {
              (O = (m - l) / u),
                (U = [T.x - O * (T.x - x.x), T.y - O * (T.y - x.y)]);
              break;
            }
        return r.unproject(Q(U));
      }
      var wf = {
        __proto__: null,
        simplify: Do,
        pointToSegmentDistance: Bo,
        closestPointOnSegment: yf,
        clipSegment: Oo,
        _getEdgeIntersection: cr,
        _getBitCode: je,
        _sqClosestPointOnSegment: Ri,
        isFlat: Qt,
        _flat: Ro,
        polylineCenter: Io,
      };
      function zo(e, r, a) {
        var l,
          u = [1, 4, 2, 8],
          m,
          x,
          T,
          O,
          U,
          J,
          ut,
          vt;
        for (m = 0, J = e.length; m < J; m++) e[m]._code = je(e[m], r);
        for (T = 0; T < 4; T++) {
          for (
            ut = u[T], l = [], m = 0, J = e.length, x = J - 1;
            m < J;
            x = m++
          )
            (O = e[m]),
              (U = e[x]),
              O._code & ut
                ? U._code & ut ||
                  ((vt = cr(U, O, ut, r, a)),
                  (vt._code = je(vt, r)),
                  l.push(vt))
                : (U._code & ut &&
                    ((vt = cr(U, O, ut, r, a)),
                    (vt._code = je(vt, r)),
                    l.push(vt)),
                  l.push(O));
          e = l;
        }
        return e;
      }
      function No(e, r) {
        var a, l, u, m, x, T, O, U, J;
        if (!e || e.length === 0) throw new Error('latlngs not passed');
        Qt(e) ||
          (console.warn(
            'latlngs are not flat! Only the first ring will be used'
          ),
          (e = e[0]));
        var ut = [];
        for (var vt in e) ut.push(r.project(bt(e[vt])));
        var te = ut.length;
        for (T = O = U = 0, a = 0, l = te - 1; a < te; l = a++)
          (u = ut[a]),
            (m = ut[l]),
            (x = u.y * m.x - m.y * u.x),
            (O += (u.x + m.x) * x),
            (U += (u.y + m.y) * x),
            (T += x * 3);
        return T === 0 ? (J = ut[0]) : (J = [O / T, U / T]), r.unproject(Q(J));
      }
      var xf = { __proto__: null, clipPolygon: zo, polygonCenter: No },
        sn = {
          project: function (e) {
            return new it(e.lng, e.lat);
          },
          unproject: function (e) {
            return new mt(e.y, e.x);
          },
          bounds: new pt([-180, -90], [180, 90]),
        },
        ln = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new pt(
            [-2003750834279e-5, -1549657073972e-5],
            [2003750834279e-5, 1876465623138e-5]
          ),
          project: function (e) {
            var r = Math.PI / 180,
              a = this.R,
              l = e.lat * r,
              u = this.R_MINOR / a,
              m = Math.sqrt(1 - u * u),
              x = m * Math.sin(l),
              T =
                Math.tan(Math.PI / 4 - l / 2) /
                Math.pow((1 - x) / (1 + x), m / 2);
            return (
              (l = -a * Math.log(Math.max(T, 1e-10))), new it(e.lng * r * a, l)
            );
          },
          unproject: function (e) {
            for (
              var r = 180 / Math.PI,
                a = this.R,
                l = this.R_MINOR / a,
                u = Math.sqrt(1 - l * l),
                m = Math.exp(-e.y / a),
                x = Math.PI / 2 - 2 * Math.atan(m),
                T = 0,
                O = 0.1,
                U;
              T < 15 && Math.abs(O) > 1e-7;
              T++
            )
              (U = u * Math.sin(x)),
                (U = Math.pow((1 - U) / (1 + U), u / 2)),
                (O = Math.PI / 2 - 2 * Math.atan(m * U) - x),
                (x += O);
            return new mt(x * r, (e.x * r) / a);
          },
        },
        kf = {
          __proto__: null,
          LonLat: sn,
          Mercator: ln,
          SphericalMercator: me,
        },
        Mf = n({}, Nt, {
          code: 'EPSG:3395',
          projection: ln,
          transformation: (function () {
            var e = 0.5 / (Math.PI * ln.R);
            return jt(e, 0.5, -e, 0.5);
          })(),
        }),
        Go = n({}, Nt, {
          code: 'EPSG:4326',
          projection: sn,
          transformation: jt(1 / 180, 1, -1 / 180, 0.5),
        }),
        Cf = n({}, Ht, {
          projection: sn,
          transformation: jt(1, 0, -1, 0),
          scale: function (e) {
            return Math.pow(2, e);
          },
          zoom: function (e) {
            return Math.log(e) / Math.LN2;
          },
          distance: function (e, r) {
            var a = r.lng - e.lng,
              l = r.lat - e.lat;
            return Math.sqrt(a * a + l * l);
          },
          infinite: !0,
        });
      (Ht.Earth = Nt),
        (Ht.EPSG3395 = Mf),
        (Ht.EPSG3857 = Gt),
        (Ht.EPSG900913 = ei),
        (Ht.EPSG4326 = Go),
        (Ht.Simple = Cf);
      var ne = Dt.extend({
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
          return (this._map._targets[c(e)] = this), this;
        },
        removeInteractiveTarget: function (e) {
          return delete this._map._targets[c(e)], this;
        },
        getAttribution: function () {
          return this.options.attribution;
        },
        _layerAdd: function (e) {
          var r = e.target;
          if (r.hasLayer(this)) {
            if (
              ((this._map = r),
              (this._zoomAnimated = r._zoomAnimated),
              this.getEvents)
            ) {
              var a = this.getEvents();
              r.on(a, this),
                this.once(
                  'remove',
                  function () {
                    r.off(a, this);
                  },
                  this
                );
            }
            this.onAdd(r),
              this.fire('add'),
              r.fire('layeradd', { layer: this });
          }
        },
      });
      Lt.include({
        addLayer: function (e) {
          if (!e._layerAdd)
            throw new Error('The provided object is not a Layer.');
          var r = c(e);
          return this._layers[r]
            ? this
            : ((this._layers[r] = e),
              (e._mapToAdd = this),
              e.beforeAdd && e.beforeAdd(this),
              this.whenReady(e._layerAdd, e),
              this);
        },
        removeLayer: function (e) {
          var r = c(e);
          return this._layers[r]
            ? (this._loaded && e.onRemove(this),
              delete this._layers[r],
              this._loaded &&
                (this.fire('layerremove', { layer: e }), e.fire('remove')),
              (e._map = e._mapToAdd = null),
              this)
            : this;
        },
        hasLayer: function (e) {
          return c(e) in this._layers;
        },
        eachLayer: function (e, r) {
          for (var a in this._layers) e.call(r, this._layers[a]);
          return this;
        },
        _addLayers: function (e) {
          e = e ? (C(e) ? e : [e]) : [];
          for (var r = 0, a = e.length; r < a; r++) this.addLayer(e[r]);
        },
        _addZoomLimit: function (e) {
          (!isNaN(e.options.maxZoom) || !isNaN(e.options.minZoom)) &&
            ((this._zoomBoundLayers[c(e)] = e), this._updateZoomLevels());
        },
        _removeZoomLimit: function (e) {
          var r = c(e);
          this._zoomBoundLayers[r] &&
            (delete this._zoomBoundLayers[r], this._updateZoomLevels());
        },
        _updateZoomLevels: function () {
          var e = 1 / 0,
            r = -1 / 0,
            a = this._getZoomSpan();
          for (var l in this._zoomBoundLayers) {
            var u = this._zoomBoundLayers[l].options;
            (e = u.minZoom === void 0 ? e : Math.min(e, u.minZoom)),
              (r = u.maxZoom === void 0 ? r : Math.max(r, u.maxZoom));
          }
          (this._layersMaxZoom = r === -1 / 0 ? void 0 : r),
            (this._layersMinZoom = e === 1 / 0 ? void 0 : e),
            a !== this._getZoomSpan() && this.fire('zoomlevelschange'),
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
      var ai = ne.extend({
          initialize: function (e, r) {
            D(this, r), (this._layers = {});
            var a, l;
            if (e) for (a = 0, l = e.length; a < l; a++) this.addLayer(e[a]);
          },
          addLayer: function (e) {
            var r = this.getLayerId(e);
            return (
              (this._layers[r] = e), this._map && this._map.addLayer(e), this
            );
          },
          removeLayer: function (e) {
            var r = e in this._layers ? e : this.getLayerId(e);
            return (
              this._map &&
                this._layers[r] &&
                this._map.removeLayer(this._layers[r]),
              delete this._layers[r],
              this
            );
          },
          hasLayer: function (e) {
            var r = typeof e == 'number' ? e : this.getLayerId(e);
            return r in this._layers;
          },
          clearLayers: function () {
            return this.eachLayer(this.removeLayer, this);
          },
          invoke: function (e) {
            var r = Array.prototype.slice.call(arguments, 1),
              a,
              l;
            for (a in this._layers)
              (l = this._layers[a]), l[e] && l[e].apply(l, r);
            return this;
          },
          onAdd: function (e) {
            this.eachLayer(e.addLayer, e);
          },
          onRemove: function (e) {
            this.eachLayer(e.removeLayer, e);
          },
          eachLayer: function (e, r) {
            for (var a in this._layers) e.call(r, this._layers[a]);
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
            return c(e);
          },
        }),
        Pf = function (e, r) {
          return new ai(e, r);
        },
        Le = ai.extend({
          addLayer: function (e) {
            return this.hasLayer(e)
              ? this
              : (e.addEventParent(this),
                ai.prototype.addLayer.call(this, e),
                this.fire('layeradd', { layer: e }));
          },
          removeLayer: function (e) {
            return this.hasLayer(e)
              ? (e in this._layers && (e = this._layers[e]),
                e.removeEventParent(this),
                ai.prototype.removeLayer.call(this, e),
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
            var e = new Tt();
            for (var r in this._layers) {
              var a = this._layers[r];
              e.extend(a.getBounds ? a.getBounds() : a.getLatLng());
            }
            return e;
          },
        }),
        Ef = function (e, r) {
          return new Le(e, r);
        },
        si = ht.extend({
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0],
            crossOrigin: !1,
          },
          initialize: function (e) {
            D(this, e);
          },
          createIcon: function (e) {
            return this._createIcon('icon', e);
          },
          createShadow: function (e) {
            return this._createIcon('shadow', e);
          },
          _createIcon: function (e, r) {
            var a = this._getIconUrl(e);
            if (!a) {
              if (e === 'icon')
                throw new Error(
                  'iconUrl not set in Icon options (see the docs).'
                );
              return null;
            }
            var l = this._createImg(a, r && r.tagName === 'IMG' ? r : null);
            return (
              this._setIconStyles(l, e),
              (this.options.crossOrigin || this.options.crossOrigin === '') &&
                (l.crossOrigin =
                  this.options.crossOrigin === !0
                    ? ''
                    : this.options.crossOrigin),
              l
            );
          },
          _setIconStyles: function (e, r) {
            var a = this.options,
              l = a[r + 'Size'];
            typeof l == 'number' && (l = [l, l]);
            var u = Q(l),
              m = Q(
                (r === 'shadow' && a.shadowAnchor) ||
                  a.iconAnchor ||
                  (u && u.divideBy(2, !0))
              );
            (e.className = 'leaflet-marker-' + r + ' ' + (a.className || '')),
              m &&
                ((e.style.marginLeft = -m.x + 'px'),
                (e.style.marginTop = -m.y + 'px')),
              u &&
                ((e.style.width = u.x + 'px'), (e.style.height = u.y + 'px'));
          },
          _createImg: function (e, r) {
            return (r = r || document.createElement('img')), (r.src = e), r;
          },
          _getIconUrl: function (e) {
            return (
              (nt.retina && this.options[e + 'RetinaUrl']) ||
              this.options[e + 'Url']
            );
          },
        });
      function Sf(e) {
        return new si(e);
      }
      var Ii = si.extend({
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
              typeof Ii.imagePath != 'string' &&
                (Ii.imagePath = this._detectIconPath()),
              (this.options.imagePath || Ii.imagePath) +
                si.prototype._getIconUrl.call(this, e)
            );
          },
          _stripUrl: function (e) {
            var r = function (a, l, u) {
              var m = l.exec(a);
              return m && m[u];
            };
            return (
              (e = r(e, /^url\((['"])?(.+)\1\)$/, 2)),
              e && r(e, /^(.*)marker-icon\.png$/, 1)
            );
          },
          _detectIconPath: function () {
            var e = xt('div', 'leaflet-default-icon-path', document.body),
              r = Si(e, 'background-image') || Si(e, 'backgroundImage');
            if ((document.body.removeChild(e), (r = this._stripUrl(r)), r))
              return r;
            var a = document.querySelector('link[href$="leaflet.css"]');
            return a ? a.href.substring(0, a.href.length - 11 - 1) : '';
          },
        }),
        Fo = ue.extend({
          initialize: function (e) {
            this._marker = e;
          },
          addHooks: function () {
            var e = this._marker._icon;
            this._draggable || (this._draggable = new Ee(e, e, !0)),
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
              gt(e, 'leaflet-marker-draggable');
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
                Ot(this._marker._icon, 'leaflet-marker-draggable');
          },
          moved: function () {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function (e) {
            var r = this._marker,
              a = r._map,
              l = this._marker.options.autoPanSpeed,
              u = this._marker.options.autoPanPadding,
              m = Ue(r._icon),
              x = a.getPixelBounds(),
              T = a.getPixelOrigin(),
              O = _t(x.min._subtract(T).add(u), x.max._subtract(T).subtract(u));
            if (!O.contains(m)) {
              var U = Q(
                (Math.max(O.max.x, m.x) - O.max.x) / (x.max.x - O.max.x) -
                  (Math.min(O.min.x, m.x) - O.min.x) / (x.min.x - O.min.x),
                (Math.max(O.max.y, m.y) - O.max.y) / (x.max.y - O.max.y) -
                  (Math.min(O.min.y, m.y) - O.min.y) / (x.min.y - O.min.y)
              ).multiplyBy(l);
              a.panBy(U, { animate: !1 }),
                this._draggable._newPos._add(U),
                this._draggable._startPos._add(U),
                Rt(r._icon, this._draggable._newPos),
                this._onDrag(e),
                (this._panRequest = X(this._adjustPan.bind(this, e)));
            }
          },
          _onDragStart: function () {
            (this._oldLatLng = this._marker.getLatLng()),
              this._marker.closePopup && this._marker.closePopup(),
              this._marker.fire('movestart').fire('dragstart');
          },
          _onPreDrag: function (e) {
            this._marker.options.autoPan &&
              (et(this._panRequest),
              (this._panRequest = X(this._adjustPan.bind(this, e))));
          },
          _onDrag: function (e) {
            var r = this._marker,
              a = r._shadow,
              l = Ue(r._icon),
              u = r._map.layerPointToLatLng(l);
            a && Rt(a, l),
              (r._latlng = u),
              (e.latlng = u),
              (e.oldLatLng = this._oldLatLng),
              r.fire('move', e).fire('drag', e);
          },
          _onDragEnd: function (e) {
            et(this._panRequest),
              delete this._oldLatLng,
              this._marker.fire('moveend').fire('dragend', e);
          },
        }),
        fr = ne.extend({
          options: {
            icon: new Ii(),
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
          initialize: function (e, r) {
            D(this, r), (this._latlng = bt(e));
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
            var r = this._latlng;
            return (
              (this._latlng = bt(e)),
              this.update(),
              this.fire('move', { oldLatLng: r, latlng: this._latlng })
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
              r = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'),
              a = e.icon.createIcon(this._icon),
              l = !1;
            a !== this._icon &&
              (this._icon && this._removeIcon(),
              (l = !0),
              e.title && (a.title = e.title),
              a.tagName === 'IMG' && (a.alt = e.alt || '')),
              gt(a, r),
              e.keyboard &&
                ((a.tabIndex = '0'), a.setAttribute('role', 'button')),
              (this._icon = a),
              e.riseOnHover &&
                this.on({
                  mouseover: this._bringToFront,
                  mouseout: this._resetZIndex,
                }),
              this.options.autoPanOnFocus &&
                ft(a, 'focus', this._panOnFocus, this);
            var u = e.icon.createShadow(this._shadow),
              m = !1;
            u !== this._shadow && (this._removeShadow(), (m = !0)),
              u && (gt(u, r), (u.alt = '')),
              (this._shadow = u),
              e.opacity < 1 && this._updateOpacity(),
              l && this.getPane().appendChild(this._icon),
              this._initInteraction(),
              u && m && this.getPane(e.shadowPane).appendChild(this._shadow);
          },
          _removeIcon: function () {
            this.options.riseOnHover &&
              this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex,
              }),
              this.options.autoPanOnFocus &&
                Et(this._icon, 'focus', this._panOnFocus, this),
              Bt(this._icon),
              this.removeInteractiveTarget(this._icon),
              (this._icon = null);
          },
          _removeShadow: function () {
            this._shadow && Bt(this._shadow), (this._shadow = null);
          },
          _setPos: function (e) {
            this._icon && Rt(this._icon, e),
              this._shadow && Rt(this._shadow, e),
              (this._zIndex = e.y + this.options.zIndexOffset),
              this._resetZIndex();
          },
          _updateZIndex: function (e) {
            this._icon && (this._icon.style.zIndex = this._zIndex + e);
          },
          _animateZoom: function (e) {
            var r = this._map
              ._latLngToNewLayerPoint(this._latlng, e.zoom, e.center)
              .round();
            this._setPos(r);
          },
          _initInteraction: function () {
            if (
              this.options.interactive &&
              (gt(this._icon, 'leaflet-interactive'),
              this.addInteractiveTarget(this._icon),
              Fo)
            ) {
              var e = this.options.draggable;
              this.dragging &&
                ((e = this.dragging.enabled()), this.dragging.disable()),
                (this.dragging = new Fo(this)),
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
            this._icon && Jt(this._icon, e),
              this._shadow && Jt(this._shadow, e);
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
              var r = this.options.icon.options,
                a = r.iconSize ? Q(r.iconSize) : Q(0, 0),
                l = r.iconAnchor ? Q(r.iconAnchor) : Q(0, 0);
              e.panInside(this._latlng, {
                paddingTopLeft: l,
                paddingBottomRight: a.subtract(l),
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
      function Tf(e, r) {
        return new fr(e, r);
      }
      var Se = ne.extend({
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
              D(this, e),
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
        dr = Se.extend({
          options: { fill: !0, radius: 10 },
          initialize: function (e, r) {
            D(this, r),
              (this._latlng = bt(e)),
              (this._radius = this.options.radius);
          },
          setLatLng: function (e) {
            var r = this._latlng;
            return (
              (this._latlng = bt(e)),
              this.redraw(),
              this.fire('move', { oldLatLng: r, latlng: this._latlng })
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
            var r = (e && e.radius) || this._radius;
            return Se.prototype.setStyle.call(this, e), this.setRadius(r), this;
          },
          _project: function () {
            (this._point = this._map.latLngToLayerPoint(this._latlng)),
              this._updateBounds();
          },
          _updateBounds: function () {
            var e = this._radius,
              r = this._radiusY || e,
              a = this._clickTolerance(),
              l = [e + a, r + a];
            this._pxBounds = new pt(
              this._point.subtract(l),
              this._point.add(l)
            );
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
      function Df(e, r) {
        return new dr(e, r);
      }
      var hn = dr.extend({
        initialize: function (e, r, a) {
          if (
            (typeof r == 'number' && (r = n({}, a, { radius: r })),
            D(this, r),
            (this._latlng = bt(e)),
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
          return new Tt(
            this._map.layerPointToLatLng(this._point.subtract(e)),
            this._map.layerPointToLatLng(this._point.add(e))
          );
        },
        setStyle: Se.prototype.setStyle,
        _project: function () {
          var e = this._latlng.lng,
            r = this._latlng.lat,
            a = this._map,
            l = a.options.crs;
          if (l.distance === Nt.distance) {
            var u = Math.PI / 180,
              m = this._mRadius / Nt.R / u,
              x = a.project([r + m, e]),
              T = a.project([r - m, e]),
              O = x.add(T).divideBy(2),
              U = a.unproject(O).lat,
              J =
                Math.acos(
                  (Math.cos(m * u) - Math.sin(r * u) * Math.sin(U * u)) /
                    (Math.cos(r * u) * Math.cos(U * u))
                ) / u;
            (isNaN(J) || J === 0) && (J = m / Math.cos((Math.PI / 180) * r)),
              (this._point = O.subtract(a.getPixelOrigin())),
              (this._radius = isNaN(J) ? 0 : O.x - a.project([U, e - J]).x),
              (this._radiusY = O.y - x.y);
          } else {
            var ut = l.unproject(
              l.project(this._latlng).subtract([this._mRadius, 0])
            );
            (this._point = a.latLngToLayerPoint(this._latlng)),
              (this._radius = this._point.x - a.latLngToLayerPoint(ut).x);
          }
          this._updateBounds();
        },
      });
      function Bf(e, r, a) {
        return new hn(e, r, a);
      }
      var be = Se.extend({
        options: { smoothFactor: 1, noClip: !1 },
        initialize: function (e, r) {
          D(this, r), this._setLatLngs(e);
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
            var r = 1 / 0,
              a = null,
              l = Ri,
              u,
              m,
              x = 0,
              T = this._parts.length;
            x < T;
            x++
          )
            for (var O = this._parts[x], U = 1, J = O.length; U < J; U++) {
              (u = O[U - 1]), (m = O[U]);
              var ut = l(e, u, m, !0);
              ut < r && ((r = ut), (a = l(e, u, m)));
            }
          return a && (a.distance = Math.sqrt(r)), a;
        },
        getCenter: function () {
          if (!this._map)
            throw new Error('Must add layer to map before using getCenter()');
          return Io(this._defaultShape(), this._map.options.crs);
        },
        getBounds: function () {
          return this._bounds;
        },
        addLatLng: function (e, r) {
          return (
            (r = r || this._defaultShape()),
            (e = bt(e)),
            r.push(e),
            this._bounds.extend(e),
            this.redraw()
          );
        },
        _setLatLngs: function (e) {
          (this._bounds = new Tt()), (this._latlngs = this._convertLatLngs(e));
        },
        _defaultShape: function () {
          return Qt(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        _convertLatLngs: function (e) {
          for (var r = [], a = Qt(e), l = 0, u = e.length; l < u; l++)
            a
              ? ((r[l] = bt(e[l])), this._bounds.extend(r[l]))
              : (r[l] = this._convertLatLngs(e[l]));
          return r;
        },
        _project: function () {
          var e = new pt();
          (this._rings = []),
            this._projectLatlngs(this._latlngs, this._rings, e),
            this._bounds.isValid() &&
              e.isValid() &&
              ((this._rawPxBounds = e), this._updateBounds());
        },
        _updateBounds: function () {
          var e = this._clickTolerance(),
            r = new it(e, e);
          this._rawPxBounds &&
            (this._pxBounds = new pt([
              this._rawPxBounds.min.subtract(r),
              this._rawPxBounds.max.add(r),
            ]));
        },
        _projectLatlngs: function (e, r, a) {
          var l = e[0] instanceof mt,
            u = e.length,
            m,
            x;
          if (l) {
            for (x = [], m = 0; m < u; m++)
              (x[m] = this._map.latLngToLayerPoint(e[m])), a.extend(x[m]);
            r.push(x);
          } else for (m = 0; m < u; m++) this._projectLatlngs(e[m], r, a);
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
            var r = this._parts,
              a,
              l,
              u,
              m,
              x,
              T,
              O;
            for (a = 0, u = 0, m = this._rings.length; a < m; a++)
              for (O = this._rings[a], l = 0, x = O.length; l < x - 1; l++)
                (T = Oo(O[l], O[l + 1], e, l, !0)),
                  T &&
                    ((r[u] = r[u] || []),
                    r[u].push(T[0]),
                    (T[1] !== O[l + 1] || l === x - 2) &&
                      (r[u].push(T[1]), u++));
          }
        },
        _simplifyPoints: function () {
          for (
            var e = this._parts,
              r = this.options.smoothFactor,
              a = 0,
              l = e.length;
            a < l;
            a++
          )
            e[a] = Do(e[a], r);
        },
        _update: function () {
          this._map &&
            (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function () {
          this._renderer._updatePoly(this);
        },
        _containsPoint: function (e, r) {
          var a,
            l,
            u,
            m,
            x,
            T,
            O = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (a = 0, m = this._parts.length; a < m; a++)
            for (
              T = this._parts[a], l = 0, x = T.length, u = x - 1;
              l < x;
              u = l++
            )
              if (!(!r && l === 0) && Bo(e, T[u], T[l]) <= O) return !0;
          return !1;
        },
      });
      function Af(e, r) {
        return new be(e, r);
      }
      be._flat = Ro;
      var li = be.extend({
        options: { fill: !0 },
        isEmpty: function () {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        getCenter: function () {
          if (!this._map)
            throw new Error('Must add layer to map before using getCenter()');
          return No(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function (e) {
          var r = be.prototype._convertLatLngs.call(this, e),
            a = r.length;
          return (
            a >= 2 && r[0] instanceof mt && r[0].equals(r[a - 1]) && r.pop(), r
          );
        },
        _setLatLngs: function (e) {
          be.prototype._setLatLngs.call(this, e),
            Qt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function () {
          return Qt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function () {
          var e = this._renderer._bounds,
            r = this.options.weight,
            a = new it(r, r);
          if (
            ((e = new pt(e.min.subtract(a), e.max.add(a))),
            (this._parts = []),
            !(!this._pxBounds || !this._pxBounds.intersects(e)))
          ) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var l = 0, u = this._rings.length, m; l < u; l++)
              (m = zo(this._rings[l], e, !0)), m.length && this._parts.push(m);
          }
        },
        _updatePath: function () {
          this._renderer._updatePoly(this, !0);
        },
        _containsPoint: function (e) {
          var r = !1,
            a,
            l,
            u,
            m,
            x,
            T,
            O,
            U;
          if (!this._pxBounds || !this._pxBounds.contains(e)) return !1;
          for (m = 0, O = this._parts.length; m < O; m++)
            for (
              a = this._parts[m], x = 0, U = a.length, T = U - 1;
              x < U;
              T = x++
            )
              (l = a[x]),
                (u = a[T]),
                l.y > e.y != u.y > e.y &&
                  e.x < ((u.x - l.x) * (e.y - l.y)) / (u.y - l.y) + l.x &&
                  (r = !r);
          return r || be.prototype._containsPoint.call(this, e, !0);
        },
      });
      function Of(e, r) {
        return new li(e, r);
      }
      var we = Le.extend({
        initialize: function (e, r) {
          D(this, r), (this._layers = {}), e && this.addData(e);
        },
        addData: function (e) {
          var r = C(e) ? e : e.features,
            a,
            l,
            u;
          if (r) {
            for (a = 0, l = r.length; a < l; a++)
              (u = r[a]),
                (u.geometries || u.geometry || u.features || u.coordinates) &&
                  this.addData(u);
            return this;
          }
          var m = this.options;
          if (m.filter && !m.filter(e)) return this;
          var x = pr(e, m);
          return x
            ? ((x.feature = _r(e)),
              (x.defaultOptions = x.options),
              this.resetStyle(x),
              m.onEachFeature && m.onEachFeature(e, x),
              this.addLayer(x))
            : this;
        },
        resetStyle: function (e) {
          return e === void 0
            ? this.eachLayer(this.resetStyle, this)
            : ((e.options = n({}, e.defaultOptions)),
              this._setLayerStyle(e, this.options.style),
              this);
        },
        setStyle: function (e) {
          return this.eachLayer(function (r) {
            this._setLayerStyle(r, e);
          }, this);
        },
        _setLayerStyle: function (e, r) {
          e.setStyle &&
            (typeof r == 'function' && (r = r(e.feature)), e.setStyle(r));
        },
      });
      function pr(e, r) {
        var a = e.type === 'Feature' ? e.geometry : e,
          l = a ? a.coordinates : null,
          u = [],
          m = r && r.pointToLayer,
          x = (r && r.coordsToLatLng) || un,
          T,
          O,
          U,
          J;
        if (!l && !a) return null;
        switch (a.type) {
          case 'Point':
            return (T = x(l)), qo(m, e, T, r);
          case 'MultiPoint':
            for (U = 0, J = l.length; U < J; U++)
              (T = x(l[U])), u.push(qo(m, e, T, r));
            return new Le(u);
          case 'LineString':
          case 'MultiLineString':
            return (
              (O = mr(l, a.type === 'LineString' ? 0 : 1, x)), new be(O, r)
            );
          case 'Polygon':
          case 'MultiPolygon':
            return (O = mr(l, a.type === 'Polygon' ? 1 : 2, x)), new li(O, r);
          case 'GeometryCollection':
            for (U = 0, J = a.geometries.length; U < J; U++) {
              var ut = pr(
                {
                  geometry: a.geometries[U],
                  type: 'Feature',
                  properties: e.properties,
                },
                r
              );
              ut && u.push(ut);
            }
            return new Le(u);
          case 'FeatureCollection':
            for (U = 0, J = a.features.length; U < J; U++) {
              var vt = pr(a.features[U], r);
              vt && u.push(vt);
            }
            return new Le(u);
          default:
            throw new Error('Invalid GeoJSON object.');
        }
      }
      function qo(e, r, a, l) {
        return e ? e(r, a) : new fr(a, l && l.markersInheritOptions && l);
      }
      function un(e) {
        return new mt(e[1], e[0], e[2]);
      }
      function mr(e, r, a) {
        for (var l = [], u = 0, m = e.length, x; u < m; u++)
          (x = r ? mr(e[u], r - 1, a) : (a || un)(e[u])), l.push(x);
        return l;
      }
      function cn(e, r) {
        return (
          (e = bt(e)),
          e.alt !== void 0
            ? [w(e.lng, r), w(e.lat, r), w(e.alt, r)]
            : [w(e.lng, r), w(e.lat, r)]
        );
      }
      function gr(e, r, a, l) {
        for (var u = [], m = 0, x = e.length; m < x; m++)
          u.push(r ? gr(e[m], Qt(e[m]) ? 0 : r - 1, a, l) : cn(e[m], l));
        return !r && a && u.push(u[0].slice()), u;
      }
      function hi(e, r) {
        return e.feature ? n({}, e.feature, { geometry: r }) : _r(r);
      }
      function _r(e) {
        return e.type === 'Feature' || e.type === 'FeatureCollection'
          ? e
          : { type: 'Feature', properties: {}, geometry: e };
      }
      var fn = {
        toGeoJSON: function (e) {
          return hi(this, {
            type: 'Point',
            coordinates: cn(this.getLatLng(), e),
          });
        },
      };
      fr.include(fn),
        hn.include(fn),
        dr.include(fn),
        be.include({
          toGeoJSON: function (e) {
            var r = !Qt(this._latlngs),
              a = gr(this._latlngs, r ? 1 : 0, !1, e);
            return hi(this, {
              type: (r ? 'Multi' : '') + 'LineString',
              coordinates: a,
            });
          },
        }),
        li.include({
          toGeoJSON: function (e) {
            var r = !Qt(this._latlngs),
              a = r && !Qt(this._latlngs[0]),
              l = gr(this._latlngs, a ? 2 : r ? 1 : 0, !0, e);
            return (
              r || (l = [l]),
              hi(this, { type: (a ? 'Multi' : '') + 'Polygon', coordinates: l })
            );
          },
        }),
        ai.include({
          toMultiPoint: function (e) {
            var r = [];
            return (
              this.eachLayer(function (a) {
                r.push(a.toGeoJSON(e).geometry.coordinates);
              }),
              hi(this, { type: 'MultiPoint', coordinates: r })
            );
          },
          toGeoJSON: function (e) {
            var r =
              this.feature &&
              this.feature.geometry &&
              this.feature.geometry.type;
            if (r === 'MultiPoint') return this.toMultiPoint(e);
            var a = r === 'GeometryCollection',
              l = [];
            return (
              this.eachLayer(function (u) {
                if (u.toGeoJSON) {
                  var m = u.toGeoJSON(e);
                  if (a) l.push(m.geometry);
                  else {
                    var x = _r(m);
                    x.type === 'FeatureCollection'
                      ? l.push.apply(l, x.features)
                      : l.push(x);
                  }
                }
              }),
              a
                ? hi(this, { geometries: l, type: 'GeometryCollection' })
                : { type: 'FeatureCollection', features: l }
            );
          },
        });
      function Zo(e, r) {
        return new we(e, r);
      }
      var Rf = Zo,
        yr = ne.extend({
          options: {
            opacity: 1,
            alt: '',
            interactive: !1,
            crossOrigin: !1,
            errorOverlayUrl: '',
            zIndex: 1,
            className: '',
          },
          initialize: function (e, r, a) {
            (this._url = e), (this._bounds = Pt(r)), D(this, a);
          },
          onAdd: function () {
            this._image ||
              (this._initImage(),
              this.options.opacity < 1 && this._updateOpacity()),
              this.options.interactive &&
                (gt(this._image, 'leaflet-interactive'),
                this.addInteractiveTarget(this._image)),
              this.getPane().appendChild(this._image),
              this._reset();
          },
          onRemove: function () {
            Bt(this._image),
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
            return this._map && ni(this._image), this;
          },
          bringToBack: function () {
            return this._map && oi(this._image), this;
          },
          setUrl: function (e) {
            return (this._url = e), this._image && (this._image.src = e), this;
          },
          setBounds: function (e) {
            return (this._bounds = Pt(e)), this._map && this._reset(), this;
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
              r = (this._image = e ? this._url : xt('img'));
            if (
              (gt(r, 'leaflet-image-layer'),
              this._zoomAnimated && gt(r, 'leaflet-zoom-animated'),
              this.options.className && gt(r, this.options.className),
              (r.onselectstart = y),
              (r.onmousemove = y),
              (r.onload = s(this.fire, this, 'load')),
              (r.onerror = s(this._overlayOnError, this, 'error')),
              (this.options.crossOrigin || this.options.crossOrigin === '') &&
                (r.crossOrigin =
                  this.options.crossOrigin === !0
                    ? ''
                    : this.options.crossOrigin),
              this.options.zIndex && this._updateZIndex(),
              e)
            ) {
              this._url = r.src;
              return;
            }
            (r.src = this._url), (r.alt = this.options.alt);
          },
          _animateZoom: function (e) {
            var r = this._map.getZoomScale(e.zoom),
              a = this._map._latLngBoundsToNewLayerBounds(
                this._bounds,
                e.zoom,
                e.center
              ).min;
            Ze(this._image, a, r);
          },
          _reset: function () {
            var e = this._image,
              r = new pt(
                this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                this._map.latLngToLayerPoint(this._bounds.getSouthEast())
              ),
              a = r.getSize();
            Rt(e, r.min),
              (e.style.width = a.x + 'px'),
              (e.style.height = a.y + 'px');
          },
          _updateOpacity: function () {
            Jt(this._image, this.options.opacity);
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
        If = function (e, r, a) {
          return new yr(e, r, a);
        },
        Uo = yr.extend({
          options: {
            autoplay: !0,
            loop: !0,
            keepAspectRatio: !0,
            muted: !1,
            playsInline: !0,
          },
          _initImage: function () {
            var e = this._url.tagName === 'VIDEO',
              r = (this._image = e ? this._url : xt('video'));
            if (
              (gt(r, 'leaflet-image-layer'),
              this._zoomAnimated && gt(r, 'leaflet-zoom-animated'),
              this.options.className && gt(r, this.options.className),
              (r.onselectstart = y),
              (r.onmousemove = y),
              (r.onloadeddata = s(this.fire, this, 'load')),
              e)
            ) {
              for (
                var a = r.getElementsByTagName('source'), l = [], u = 0;
                u < a.length;
                u++
              )
                l.push(a[u].src);
              this._url = a.length > 0 ? l : [r.src];
              return;
            }
            C(this._url) || (this._url = [this._url]),
              !this.options.keepAspectRatio &&
                Object.prototype.hasOwnProperty.call(r.style, 'objectFit') &&
                (r.style.objectFit = 'fill'),
              (r.autoplay = !!this.options.autoplay),
              (r.loop = !!this.options.loop),
              (r.muted = !!this.options.muted),
              (r.playsInline = !!this.options.playsInline);
            for (var m = 0; m < this._url.length; m++) {
              var x = xt('source');
              (x.src = this._url[m]), r.appendChild(x);
            }
          },
        });
      function zf(e, r, a) {
        return new Uo(e, r, a);
      }
      var Vo = yr.extend({
        _initImage: function () {
          var e = (this._image = this._url);
          gt(e, 'leaflet-image-layer'),
            this._zoomAnimated && gt(e, 'leaflet-zoom-animated'),
            this.options.className && gt(e, this.options.className),
            (e.onselectstart = y),
            (e.onmousemove = y);
        },
      });
      function Nf(e, r, a) {
        return new Vo(e, r, a);
      }
      var ce = ne.extend({
        options: {
          interactive: !1,
          offset: [0, 0],
          className: '',
          pane: void 0,
          content: '',
        },
        initialize: function (e, r) {
          e && (e instanceof mt || C(e))
            ? ((this._latlng = bt(e)), D(this, r))
            : (D(this, e), (this._source = r)),
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
            e._fadeAnimated && Jt(this._container, 0),
            clearTimeout(this._removeTimeout),
            this.getPane().appendChild(this._container),
            this.update(),
            e._fadeAnimated && Jt(this._container, 1),
            this.bringToFront(),
            this.options.interactive &&
              (gt(this._container, 'leaflet-interactive'),
              this.addInteractiveTarget(this._container));
        },
        onRemove: function (e) {
          e._fadeAnimated
            ? (Jt(this._container, 0),
              (this._removeTimeout = setTimeout(
                s(Bt, void 0, this._container),
                200
              )))
            : Bt(this._container),
            this.options.interactive &&
              (Ot(this._container, 'leaflet-interactive'),
              this.removeInteractiveTarget(this._container));
        },
        getLatLng: function () {
          return this._latlng;
        },
        setLatLng: function (e) {
          return (
            (this._latlng = bt(e)),
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
          return this._map && ni(this._container), this;
        },
        bringToBack: function () {
          return this._map && oi(this._container), this;
        },
        _prepareOpen: function (e) {
          var r = this._source;
          if (!r._map) return !1;
          if (r instanceof Le) {
            r = null;
            var a = this._source._layers;
            for (var l in a)
              if (a[l]._map) {
                r = a[l];
                break;
              }
            if (!r) return !1;
            this._source = r;
          }
          if (!e)
            if (r.getCenter) e = r.getCenter();
            else if (r.getLatLng) e = r.getLatLng();
            else if (r.getBounds) e = r.getBounds().getCenter();
            else throw new Error('Unable to get source layer LatLng.');
          return this.setLatLng(e), this._map && this.update(), !0;
        },
        _updateContent: function () {
          if (this._content) {
            var e = this._contentNode,
              r =
                typeof this._content == 'function'
                  ? this._content(this._source || this)
                  : this._content;
            if (typeof r == 'string') e.innerHTML = r;
            else {
              for (; e.hasChildNodes(); ) e.removeChild(e.firstChild);
              e.appendChild(r);
            }
            this.fire('contentupdate');
          }
        },
        _updatePosition: function () {
          if (this._map) {
            var e = this._map.latLngToLayerPoint(this._latlng),
              r = Q(this.options.offset),
              a = this._getAnchor();
            this._zoomAnimated
              ? Rt(this._container, e.add(a))
              : (r = r.add(e).add(a));
            var l = (this._containerBottom = -r.y),
              u = (this._containerLeft =
                -Math.round(this._containerWidth / 2) + r.x);
            (this._container.style.bottom = l + 'px'),
              (this._container.style.left = u + 'px');
          }
        },
        _getAnchor: function () {
          return [0, 0];
        },
      });
      Lt.include({
        _initOverlay: function (e, r, a, l) {
          var u = r;
          return (
            u instanceof e || (u = new e(l).setContent(r)),
            a && u.setLatLng(a),
            u
          );
        },
      }),
        ne.include({
          _initOverlay: function (e, r, a, l) {
            var u = a;
            return (
              u instanceof e
                ? (D(u, l), (u._source = this))
                : ((u = r && !l ? r : new e(l, this)), u.setContent(a)),
              u
            );
          },
        });
      var vr = ce.extend({
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
              ce.prototype.openOn.call(this, e)
            );
          },
          onAdd: function (e) {
            ce.prototype.onAdd.call(this, e),
              e.fire('popupopen', { popup: this }),
              this._source &&
                (this._source.fire('popupopen', { popup: this }, !0),
                this._source instanceof Se || this._source.on('preclick', Ve));
          },
          onRemove: function (e) {
            ce.prototype.onRemove.call(this, e),
              e.fire('popupclose', { popup: this }),
              this._source &&
                (this._source.fire('popupclose', { popup: this }, !0),
                this._source instanceof Se || this._source.off('preclick', Ve));
          },
          getEvents: function () {
            var e = ce.prototype.getEvents.call(this);
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
              r = (this._container = xt(
                'div',
                e +
                  ' ' +
                  (this.options.className || '') +
                  ' leaflet-zoom-animated'
              )),
              a = (this._wrapper = xt('div', e + '-content-wrapper', r));
            if (
              ((this._contentNode = xt('div', e + '-content', a)),
              Ai(r),
              en(this._contentNode),
              ft(r, 'contextmenu', Ve),
              (this._tipContainer = xt('div', e + '-tip-container', r)),
              (this._tip = xt('div', e + '-tip', this._tipContainer)),
              this.options.closeButton)
            ) {
              var l = (this._closeButton = xt('a', e + '-close-button', r));
              l.setAttribute('role', 'button'),
                l.setAttribute('aria-label', 'Close popup'),
                (l.href = '#close'),
                (l.innerHTML = '<span aria-hidden="true">&#215;</span>'),
                ft(
                  l,
                  'click',
                  function (u) {
                    Ft(u), this.close();
                  },
                  this
                );
            }
          },
          _updateLayout: function () {
            var e = this._contentNode,
              r = e.style;
            (r.width = ''), (r.whiteSpace = 'nowrap');
            var a = e.offsetWidth;
            (a = Math.min(a, this.options.maxWidth)),
              (a = Math.max(a, this.options.minWidth)),
              (r.width = a + 1 + 'px'),
              (r.whiteSpace = ''),
              (r.height = '');
            var l = e.offsetHeight,
              u = this.options.maxHeight,
              m = 'leaflet-popup-scrolled';
            u && l > u ? ((r.height = u + 'px'), gt(e, m)) : Ot(e, m),
              (this._containerWidth = this._container.offsetWidth);
          },
          _animateZoom: function (e) {
            var r = this._map._latLngToNewLayerPoint(
                this._latlng,
                e.zoom,
                e.center
              ),
              a = this._getAnchor();
            Rt(this._container, r.add(a));
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
                r = parseInt(Si(this._container, 'marginBottom'), 10) || 0,
                a = this._container.offsetHeight + r,
                l = this._containerWidth,
                u = new it(this._containerLeft, -a - this._containerBottom);
              u._add(Ue(this._container));
              var m = e.layerPointToContainerPoint(u),
                x = Q(this.options.autoPanPadding),
                T = Q(this.options.autoPanPaddingTopLeft || x),
                O = Q(this.options.autoPanPaddingBottomRight || x),
                U = e.getSize(),
                J = 0,
                ut = 0;
              m.x + l + O.x > U.x && (J = m.x + l - U.x + O.x),
                m.x - J - T.x < 0 && (J = m.x - T.x),
                m.y + a + O.y > U.y && (ut = m.y + a - U.y + O.y),
                m.y - ut - T.y < 0 && (ut = m.y - T.y),
                (J || ut) &&
                  (this.options.keepInView && (this._autopanning = !0),
                  e.fire('autopanstart').panBy([J, ut]));
            }
          },
          _getAnchor: function () {
            return Q(
              this._source && this._source._getPopupAnchor
                ? this._source._getPopupAnchor()
                : [0, 0]
            );
          },
        }),
        Gf = function (e, r) {
          return new vr(e, r);
        };
      Lt.mergeOptions({ closePopupOnClick: !0 }),
        Lt.include({
          openPopup: function (e, r, a) {
            return this._initOverlay(vr, e, r, a).openOn(this), this;
          },
          closePopup: function (e) {
            return (
              (e = arguments.length ? e : this._popup), e && e.close(), this
            );
          },
        }),
        ne.include({
          bindPopup: function (e, r) {
            return (
              (this._popup = this._initOverlay(vr, this._popup, e, r)),
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
                (this instanceof Le || (this._popup._source = this),
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
              He(e);
              var r = e.layer || e.target;
              if (this._popup._source === r && !(r instanceof Se)) {
                this._map.hasLayer(this._popup)
                  ? this.closePopup()
                  : this.openPopup(e.latlng);
                return;
              }
              (this._popup._source = r), this.openPopup(e.latlng);
            }
          },
          _movePopup: function (e) {
            this._popup.setLatLng(e.latlng);
          },
          _onKeyPress: function (e) {
            e.originalEvent.keyCode === 13 && this._openPopup(e);
          },
        });
      var Lr = ce.extend({
          options: {
            pane: 'tooltipPane',
            offset: [0, 0],
            direction: 'auto',
            permanent: !1,
            sticky: !1,
            opacity: 0.9,
          },
          onAdd: function (e) {
            ce.prototype.onAdd.call(this, e),
              this.setOpacity(this.options.opacity),
              e.fire('tooltipopen', { tooltip: this }),
              this._source &&
                (this.addEventParent(this._source),
                this._source.fire('tooltipopen', { tooltip: this }, !0));
          },
          onRemove: function (e) {
            ce.prototype.onRemove.call(this, e),
              e.fire('tooltipclose', { tooltip: this }),
              this._source &&
                (this.removeEventParent(this._source),
                this._source.fire('tooltipclose', { tooltip: this }, !0));
          },
          getEvents: function () {
            var e = ce.prototype.getEvents.call(this);
            return this.options.permanent || (e.preclick = this.close), e;
          },
          _initLayout: function () {
            var e = 'leaflet-tooltip',
              r =
                e +
                ' ' +
                (this.options.className || '') +
                ' leaflet-zoom-' +
                (this._zoomAnimated ? 'animated' : 'hide');
            (this._contentNode = this._container = xt('div', r)),
              this._container.setAttribute('role', 'tooltip'),
              this._container.setAttribute('id', 'leaflet-tooltip-' + c(this));
          },
          _updateLayout: function () {},
          _adjustPan: function () {},
          _setPosition: function (e) {
            var r,
              a,
              l = this._map,
              u = this._container,
              m = l.latLngToContainerPoint(l.getCenter()),
              x = l.layerPointToContainerPoint(e),
              T = this.options.direction,
              O = u.offsetWidth,
              U = u.offsetHeight,
              J = Q(this.options.offset),
              ut = this._getAnchor();
            T === 'top'
              ? ((r = O / 2), (a = U))
              : T === 'bottom'
                ? ((r = O / 2), (a = 0))
                : T === 'center'
                  ? ((r = O / 2), (a = U / 2))
                  : T === 'right'
                    ? ((r = 0), (a = U / 2))
                    : T === 'left'
                      ? ((r = O), (a = U / 2))
                      : x.x < m.x
                        ? ((T = 'right'), (r = 0), (a = U / 2))
                        : ((T = 'left'),
                          (r = O + (J.x + ut.x) * 2),
                          (a = U / 2)),
              (e = e
                .subtract(Q(r, a, !0))
                .add(J)
                .add(ut)),
              Ot(u, 'leaflet-tooltip-right'),
              Ot(u, 'leaflet-tooltip-left'),
              Ot(u, 'leaflet-tooltip-top'),
              Ot(u, 'leaflet-tooltip-bottom'),
              gt(u, 'leaflet-tooltip-' + T),
              Rt(u, e);
          },
          _updatePosition: function () {
            var e = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(e);
          },
          setOpacity: function (e) {
            (this.options.opacity = e),
              this._container && Jt(this._container, e);
          },
          _animateZoom: function (e) {
            var r = this._map._latLngToNewLayerPoint(
              this._latlng,
              e.zoom,
              e.center
            );
            this._setPosition(r);
          },
          _getAnchor: function () {
            return Q(
              this._source &&
                this._source._getTooltipAnchor &&
                !this.options.sticky
                ? this._source._getTooltipAnchor()
                : [0, 0]
            );
          },
        }),
        Ff = function (e, r) {
          return new Lr(e, r);
        };
      Lt.include({
        openTooltip: function (e, r, a) {
          return this._initOverlay(Lr, e, r, a).openOn(this), this;
        },
        closeTooltip: function (e) {
          return e.close(), this;
        },
      }),
        ne.include({
          bindTooltip: function (e, r) {
            return (
              this._tooltip && this.isTooltipOpen() && this.unbindTooltip(),
              (this._tooltip = this._initOverlay(Lr, this._tooltip, e, r)),
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
              var r = e ? 'off' : 'on',
                a = { remove: this.closeTooltip, move: this._moveTooltip };
              this._tooltip.options.permanent
                ? (a.add = this._openTooltip)
                : ((a.mouseover = this._openTooltip),
                  (a.mouseout = this.closeTooltip),
                  (a.click = this._openTooltip),
                  this._map
                    ? this._addFocusListeners()
                    : (a.add = this._addFocusListeners)),
                this._tooltip.options.sticky &&
                  (a.mousemove = this._moveTooltip),
                this[r](a),
                (this._tooltipHandlersAdded = !e);
            }
          },
          openTooltip: function (e) {
            return (
              this._tooltip &&
                (this instanceof Le || (this._tooltip._source = this),
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
            var r = e.getElement();
            r &&
              (ft(
                r,
                'focus',
                function () {
                  (this._tooltip._source = e), this.openTooltip();
                },
                this
              ),
              ft(r, 'blur', this.closeTooltip, this));
          },
          _setAriaDescribedByOnLayer: function (e) {
            var r = e.getElement();
            r &&
              r.setAttribute('aria-describedby', this._tooltip._container.id);
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
            var r = e.latlng,
              a,
              l;
            this._tooltip.options.sticky &&
              e.originalEvent &&
              ((a = this._map.mouseEventToContainerPoint(e.originalEvent)),
              (l = this._map.containerPointToLayerPoint(a)),
              (r = this._map.layerPointToLatLng(l))),
              this._tooltip.setLatLng(r);
          },
        });
      var Ho = si.extend({
        options: {
          iconSize: [12, 12],
          html: !1,
          bgPos: null,
          className: 'leaflet-div-icon',
        },
        createIcon: function (e) {
          var r = e && e.tagName === 'DIV' ? e : document.createElement('div'),
            a = this.options;
          if (
            (a.html instanceof Element
              ? (ar(r), r.appendChild(a.html))
              : (r.innerHTML = a.html !== !1 ? a.html : ''),
            a.bgPos)
          ) {
            var l = Q(a.bgPos);
            r.style.backgroundPosition = -l.x + 'px ' + -l.y + 'px';
          }
          return this._setIconStyles(r, 'icon'), r;
        },
        createShadow: function () {
          return null;
        },
      });
      function qf(e) {
        return new Ho(e);
      }
      si.Default = Ii;
      var zi = ne.extend({
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
          D(this, e);
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
            Bt(this._container),
            e._removeZoomLimit(this),
            (this._container = null),
            (this._tileZoom = void 0);
        },
        bringToFront: function () {
          return (
            this._map && (ni(this._container), this._setAutoZIndex(Math.max)),
            this
          );
        },
        bringToBack: function () {
          return (
            this._map && (oi(this._container), this._setAutoZIndex(Math.min)),
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
                (this._onMove = f(
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
          return e instanceof it ? e : new it(e, e);
        },
        _updateZIndex: function () {
          this._container &&
            this.options.zIndex !== void 0 &&
            this.options.zIndex !== null &&
            (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function (e) {
          for (
            var r = this.getPane().children,
              a = -e(-1 / 0, 1 / 0),
              l = 0,
              u = r.length,
              m;
            l < u;
            l++
          )
            (m = r[l].style.zIndex),
              r[l] !== this._container && m && (a = e(a, +m));
          isFinite(a) &&
            ((this.options.zIndex = a + e(-1, 1)), this._updateZIndex());
        },
        _updateOpacity: function () {
          if (this._map && !nt.ielt9) {
            Jt(this._container, this.options.opacity);
            var e = +new Date(),
              r = !1,
              a = !1;
            for (var l in this._tiles) {
              var u = this._tiles[l];
              if (!(!u.current || !u.loaded)) {
                var m = Math.min(1, (e - u.loaded) / 200);
                Jt(u.el, m),
                  m < 1
                    ? (r = !0)
                    : (u.active ? (a = !0) : this._onOpaqueTile(u),
                      (u.active = !0));
              }
            }
            a && !this._noPrune && this._pruneTiles(),
              r &&
                (et(this._fadeFrame),
                (this._fadeFrame = X(this._updateOpacity, this)));
          }
        },
        _onOpaqueTile: y,
        _initContainer: function () {
          this._container ||
            ((this._container = xt(
              'div',
              'leaflet-layer ' + (this.options.className || '')
            )),
            this._updateZIndex(),
            this.options.opacity < 1 && this._updateOpacity(),
            this.getPane().appendChild(this._container));
        },
        _updateLevels: function () {
          var e = this._tileZoom,
            r = this.options.maxZoom;
          if (e !== void 0) {
            for (var a in this._levels)
              (a = Number(a)),
                this._levels[a].el.children.length || a === e
                  ? ((this._levels[a].el.style.zIndex = r - Math.abs(e - a)),
                    this._onUpdateLevel(a))
                  : (Bt(this._levels[a].el),
                    this._removeTilesAtZoom(a),
                    this._onRemoveLevel(a),
                    delete this._levels[a]);
            var l = this._levels[e],
              u = this._map;
            return (
              l ||
                ((l = this._levels[e] = {}),
                (l.el = xt(
                  'div',
                  'leaflet-tile-container leaflet-zoom-animated',
                  this._container
                )),
                (l.el.style.zIndex = r),
                (l.origin = u
                  .project(u.unproject(u.getPixelOrigin()), e)
                  .round()),
                (l.zoom = e),
                this._setZoomTransform(l, u.getCenter(), u.getZoom()),
                y(l.el.offsetWidth),
                this._onCreateLevel(l)),
              (this._level = l),
              l
            );
          }
        },
        _onUpdateLevel: y,
        _onRemoveLevel: y,
        _onCreateLevel: y,
        _pruneTiles: function () {
          if (this._map) {
            var e,
              r,
              a = this._map.getZoom();
            if (a > this.options.maxZoom || a < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (e in this._tiles) (r = this._tiles[e]), (r.retain = r.current);
            for (e in this._tiles)
              if (((r = this._tiles[e]), r.current && !r.active)) {
                var l = r.coords;
                this._retainParent(l.x, l.y, l.z, l.z - 5) ||
                  this._retainChildren(l.x, l.y, l.z, l.z + 2);
              }
            for (e in this._tiles) this._tiles[e].retain || this._removeTile(e);
          }
        },
        _removeTilesAtZoom: function (e) {
          for (var r in this._tiles)
            this._tiles[r].coords.z === e && this._removeTile(r);
        },
        _removeAllTiles: function () {
          for (var e in this._tiles) this._removeTile(e);
        },
        _invalidateAll: function () {
          for (var e in this._levels)
            Bt(this._levels[e].el),
              this._onRemoveLevel(Number(e)),
              delete this._levels[e];
          this._removeAllTiles(), (this._tileZoom = void 0);
        },
        _retainParent: function (e, r, a, l) {
          var u = Math.floor(e / 2),
            m = Math.floor(r / 2),
            x = a - 1,
            T = new it(+u, +m);
          T.z = +x;
          var O = this._tileCoordsToKey(T),
            U = this._tiles[O];
          return U && U.active
            ? ((U.retain = !0), !0)
            : (U && U.loaded && (U.retain = !0),
              x > l ? this._retainParent(u, m, x, l) : !1);
        },
        _retainChildren: function (e, r, a, l) {
          for (var u = 2 * e; u < 2 * e + 2; u++)
            for (var m = 2 * r; m < 2 * r + 2; m++) {
              var x = new it(u, m);
              x.z = a + 1;
              var T = this._tileCoordsToKey(x),
                O = this._tiles[T];
              if (O && O.active) {
                O.retain = !0;
                continue;
              } else O && O.loaded && (O.retain = !0);
              a + 1 < l && this._retainChildren(u, m, a + 1, l);
            }
        },
        _resetView: function (e) {
          var r = e && (e.pinch || e.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), r, r);
        },
        _animateZoom: function (e) {
          this._setView(e.center, e.zoom, !0, e.noUpdate);
        },
        _clampZoom: function (e) {
          var r = this.options;
          return r.minNativeZoom !== void 0 && e < r.minNativeZoom
            ? r.minNativeZoom
            : r.maxNativeZoom !== void 0 && r.maxNativeZoom < e
              ? r.maxNativeZoom
              : e;
        },
        _setView: function (e, r, a, l) {
          var u = Math.round(r);
          (this.options.maxZoom !== void 0 && u > this.options.maxZoom) ||
          (this.options.minZoom !== void 0 && u < this.options.minZoom)
            ? (u = void 0)
            : (u = this._clampZoom(u));
          var m = this.options.updateWhenZooming && u !== this._tileZoom;
          (!l || m) &&
            ((this._tileZoom = u),
            this._abortLoading && this._abortLoading(),
            this._updateLevels(),
            this._resetGrid(),
            u !== void 0 && this._update(e),
            a || this._pruneTiles(),
            (this._noPrune = !!a)),
            this._setZoomTransforms(e, r);
        },
        _setZoomTransforms: function (e, r) {
          for (var a in this._levels)
            this._setZoomTransform(this._levels[a], e, r);
        },
        _setZoomTransform: function (e, r, a) {
          var l = this._map.getZoomScale(a, e.zoom),
            u = e.origin
              .multiplyBy(l)
              .subtract(this._map._getNewPixelOrigin(r, a))
              .round();
          nt.any3d ? Ze(e.el, u, l) : Rt(e.el, u);
        },
        _resetGrid: function () {
          var e = this._map,
            r = e.options.crs,
            a = (this._tileSize = this.getTileSize()),
            l = this._tileZoom,
            u = this._map.getPixelWorldBounds(this._tileZoom);
          u && (this._globalTileRange = this._pxBoundsToTileRange(u)),
            (this._wrapX = r.wrapLng &&
              !this.options.noWrap && [
                Math.floor(e.project([0, r.wrapLng[0]], l).x / a.x),
                Math.ceil(e.project([0, r.wrapLng[1]], l).x / a.y),
              ]),
            (this._wrapY = r.wrapLat &&
              !this.options.noWrap && [
                Math.floor(e.project([r.wrapLat[0], 0], l).y / a.x),
                Math.ceil(e.project([r.wrapLat[1], 0], l).y / a.y),
              ]);
        },
        _onMoveEnd: function () {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function (e) {
          var r = this._map,
            a = r._animatingZoom
              ? Math.max(r._animateToZoom, r.getZoom())
              : r.getZoom(),
            l = r.getZoomScale(a, this._tileZoom),
            u = r.project(e, this._tileZoom).floor(),
            m = r.getSize().divideBy(l * 2);
          return new pt(u.subtract(m), u.add(m));
        },
        _update: function (e) {
          var r = this._map;
          if (r) {
            var a = this._clampZoom(r.getZoom());
            if (
              (e === void 0 && (e = r.getCenter()), this._tileZoom !== void 0)
            ) {
              var l = this._getTiledPixelBounds(e),
                u = this._pxBoundsToTileRange(l),
                m = u.getCenter(),
                x = [],
                T = this.options.keepBuffer,
                O = new pt(
                  u.getBottomLeft().subtract([T, -T]),
                  u.getTopRight().add([T, -T])
                );
              if (
                !(
                  isFinite(u.min.x) &&
                  isFinite(u.min.y) &&
                  isFinite(u.max.x) &&
                  isFinite(u.max.y)
                )
              )
                throw new Error(
                  'Attempted to load an infinite number of tiles'
                );
              for (var U in this._tiles) {
                var J = this._tiles[U].coords;
                (J.z !== this._tileZoom || !O.contains(new it(J.x, J.y))) &&
                  (this._tiles[U].current = !1);
              }
              if (Math.abs(a - this._tileZoom) > 1) {
                this._setView(e, a);
                return;
              }
              for (var ut = u.min.y; ut <= u.max.y; ut++)
                for (var vt = u.min.x; vt <= u.max.x; vt++) {
                  var te = new it(vt, ut);
                  if (((te.z = this._tileZoom), !!this._isValidTile(te))) {
                    var Ke = this._tiles[this._tileCoordsToKey(te)];
                    Ke ? (Ke.current = !0) : x.push(te);
                  }
                }
              if (
                (x.sort(function (Te, dn) {
                  return Te.distanceTo(m) - dn.distanceTo(m);
                }),
                x.length !== 0)
              ) {
                this._loading || ((this._loading = !0), this.fire('loading'));
                var wr = document.createDocumentFragment();
                for (vt = 0; vt < x.length; vt++) this._addTile(x[vt], wr);
                this._level.el.appendChild(wr);
              }
            }
          }
        },
        _isValidTile: function (e) {
          var r = this._map.options.crs;
          if (!r.infinite) {
            var a = this._globalTileRange;
            if (
              (!r.wrapLng && (e.x < a.min.x || e.x > a.max.x)) ||
              (!r.wrapLat && (e.y < a.min.y || e.y > a.max.y))
            )
              return !1;
          }
          if (!this.options.bounds) return !0;
          var l = this._tileCoordsToBounds(e);
          return Pt(this.options.bounds).overlaps(l);
        },
        _keyToBounds: function (e) {
          return this._tileCoordsToBounds(this._keyToTileCoords(e));
        },
        _tileCoordsToNwSe: function (e) {
          var r = this._map,
            a = this.getTileSize(),
            l = e.scaleBy(a),
            u = l.add(a),
            m = r.unproject(l, e.z),
            x = r.unproject(u, e.z);
          return [m, x];
        },
        _tileCoordsToBounds: function (e) {
          var r = this._tileCoordsToNwSe(e),
            a = new Tt(r[0], r[1]);
          return this.options.noWrap || (a = this._map.wrapLatLngBounds(a)), a;
        },
        _tileCoordsToKey: function (e) {
          return e.x + ':' + e.y + ':' + e.z;
        },
        _keyToTileCoords: function (e) {
          var r = e.split(':'),
            a = new it(+r[0], +r[1]);
          return (a.z = +r[2]), a;
        },
        _removeTile: function (e) {
          var r = this._tiles[e];
          r &&
            (Bt(r.el),
            delete this._tiles[e],
            this.fire('tileunload', {
              tile: r.el,
              coords: this._keyToTileCoords(e),
            }));
        },
        _initTile: function (e) {
          gt(e, 'leaflet-tile');
          var r = this.getTileSize();
          (e.style.width = r.x + 'px'),
            (e.style.height = r.y + 'px'),
            (e.onselectstart = y),
            (e.onmousemove = y),
            nt.ielt9 && this.options.opacity < 1 && Jt(e, this.options.opacity);
        },
        _addTile: function (e, r) {
          var a = this._getTilePos(e),
            l = this._tileCoordsToKey(e),
            u = this.createTile(
              this._wrapCoords(e),
              s(this._tileReady, this, e)
            );
          this._initTile(u),
            this.createTile.length < 2 &&
              X(s(this._tileReady, this, e, null, u)),
            Rt(u, a),
            (this._tiles[l] = { el: u, coords: e, current: !0 }),
            r.appendChild(u),
            this.fire('tileloadstart', { tile: u, coords: e });
        },
        _tileReady: function (e, r, a) {
          r && this.fire('tileerror', { error: r, tile: a, coords: e });
          var l = this._tileCoordsToKey(e);
          (a = this._tiles[l]),
            a &&
              ((a.loaded = +new Date()),
              this._map._fadeAnimated
                ? (Jt(a.el, 0),
                  et(this._fadeFrame),
                  (this._fadeFrame = X(this._updateOpacity, this)))
                : ((a.active = !0), this._pruneTiles()),
              r ||
                (gt(a.el, 'leaflet-tile-loaded'),
                this.fire('tileload', { tile: a.el, coords: e })),
              this._noTilesToLoad() &&
                ((this._loading = !1),
                this.fire('load'),
                nt.ielt9 || !this._map._fadeAnimated
                  ? X(this._pruneTiles, this)
                  : setTimeout(s(this._pruneTiles, this), 250)));
        },
        _getTilePos: function (e) {
          return e.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function (e) {
          var r = new it(
            this._wrapX ? d(e.x, this._wrapX) : e.x,
            this._wrapY ? d(e.y, this._wrapY) : e.y
          );
          return (r.z = e.z), r;
        },
        _pxBoundsToTileRange: function (e) {
          var r = this.getTileSize();
          return new pt(
            e.min.unscaleBy(r).floor(),
            e.max.unscaleBy(r).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function () {
          for (var e in this._tiles) if (!this._tiles[e].loaded) return !1;
          return !0;
        },
      });
      function Zf(e) {
        return new zi(e);
      }
      var ui = zi.extend({
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
        initialize: function (e, r) {
          (this._url = e),
            (r = D(this, r)),
            r.detectRetina && nt.retina && r.maxZoom > 0
              ? ((r.tileSize = Math.floor(r.tileSize / 2)),
                r.zoomReverse
                  ? (r.zoomOffset--,
                    (r.minZoom = Math.min(r.maxZoom, r.minZoom + 1)))
                  : (r.zoomOffset++,
                    (r.maxZoom = Math.max(r.minZoom, r.maxZoom - 1))),
                (r.minZoom = Math.max(0, r.minZoom)))
              : r.zoomReverse
                ? (r.minZoom = Math.min(r.maxZoom, r.minZoom))
                : (r.maxZoom = Math.max(r.minZoom, r.maxZoom)),
            typeof r.subdomains == 'string' &&
              (r.subdomains = r.subdomains.split('')),
            this.on('tileunload', this._onTileRemove);
        },
        setUrl: function (e, r) {
          return (
            this._url === e && r === void 0 && (r = !0),
            (this._url = e),
            r || this.redraw(),
            this
          );
        },
        createTile: function (e, r) {
          var a = document.createElement('img');
          return (
            ft(a, 'load', s(this._tileOnLoad, this, r, a)),
            ft(a, 'error', s(this._tileOnError, this, r, a)),
            (this.options.crossOrigin || this.options.crossOrigin === '') &&
              (a.crossOrigin =
                this.options.crossOrigin === !0
                  ? ''
                  : this.options.crossOrigin),
            typeof this.options.referrerPolicy == 'string' &&
              (a.referrerPolicy = this.options.referrerPolicy),
            (a.alt = ''),
            (a.src = this.getTileUrl(e)),
            a
          );
        },
        getTileUrl: function (e) {
          var r = {
            r: nt.retina ? '@2x' : '',
            s: this._getSubdomain(e),
            x: e.x,
            y: e.y,
            z: this._getZoomForUrl(),
          };
          if (this._map && !this._map.options.crs.infinite) {
            var a = this._globalTileRange.max.y - e.y;
            this.options.tms && (r.y = a), (r['-y'] = a);
          }
          return k(this._url, n(r, this.options));
        },
        _tileOnLoad: function (e, r) {
          nt.ielt9 ? setTimeout(s(e, this, null, r), 0) : e(null, r);
        },
        _tileOnError: function (e, r, a) {
          var l = this.options.errorTileUrl;
          l && r.getAttribute('src') !== l && (r.src = l), e(a, r);
        },
        _onTileRemove: function (e) {
          e.tile.onload = null;
        },
        _getZoomForUrl: function () {
          var e = this._tileZoom,
            r = this.options.maxZoom,
            a = this.options.zoomReverse,
            l = this.options.zoomOffset;
          return a && (e = r - e), e + l;
        },
        _getSubdomain: function (e) {
          var r = Math.abs(e.x + e.y) % this.options.subdomains.length;
          return this.options.subdomains[r];
        },
        _abortLoading: function () {
          var e, r;
          for (e in this._tiles)
            if (
              this._tiles[e].coords.z !== this._tileZoom &&
              ((r = this._tiles[e].el),
              (r.onload = y),
              (r.onerror = y),
              !r.complete)
            ) {
              r.src = Z;
              var a = this._tiles[e].coords;
              Bt(r),
                delete this._tiles[e],
                this.fire('tileabort', { tile: r, coords: a });
            }
        },
        _removeTile: function (e) {
          var r = this._tiles[e];
          if (r)
            return (
              r.el.setAttribute('src', Z),
              zi.prototype._removeTile.call(this, e)
            );
        },
        _tileReady: function (e, r, a) {
          if (!(!this._map || (a && a.getAttribute('src') === Z)))
            return zi.prototype._tileReady.call(this, e, r, a);
        },
      });
      function jo(e, r) {
        return new ui(e, r);
      }
      var Ko = ui.extend({
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
        initialize: function (e, r) {
          this._url = e;
          var a = n({}, this.defaultWmsParams);
          for (var l in r) l in this.options || (a[l] = r[l]);
          r = D(this, r);
          var u = r.detectRetina && nt.retina ? 2 : 1,
            m = this.getTileSize();
          (a.width = m.x * u), (a.height = m.y * u), (this.wmsParams = a);
        },
        onAdd: function (e) {
          (this._crs = this.options.crs || e.options.crs),
            (this._wmsVersion = parseFloat(this.wmsParams.version));
          var r = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
          (this.wmsParams[r] = this._crs.code),
            ui.prototype.onAdd.call(this, e);
        },
        getTileUrl: function (e) {
          var r = this._tileCoordsToNwSe(e),
            a = this._crs,
            l = _t(a.project(r[0]), a.project(r[1])),
            u = l.min,
            m = l.max,
            x = (
              this._wmsVersion >= 1.3 && this._crs === Go
                ? [u.y, u.x, m.y, m.x]
                : [u.x, u.y, m.x, m.y]
            ).join(','),
            T = ui.prototype.getTileUrl.call(this, e);
          return (
            T +
            N(this.wmsParams, T, this.options.uppercase) +
            (this.options.uppercase ? '&BBOX=' : '&bbox=') +
            x
          );
        },
        setParams: function (e, r) {
          return n(this.wmsParams, e), r || this.redraw(), this;
        },
      });
      function Uf(e, r) {
        return new Ko(e, r);
      }
      (ui.WMS = Ko), (jo.wms = Uf);
      var xe = ne.extend({
          options: { padding: 0.1 },
          initialize: function (e) {
            D(this, e), c(this), (this._layers = this._layers || {});
          },
          onAdd: function () {
            this._container ||
              (this._initContainer(),
              this._zoomAnimated &&
                gt(this._container, 'leaflet-zoom-animated')),
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
          _updateTransform: function (e, r) {
            var a = this._map.getZoomScale(r, this._zoom),
              l = this._map.getSize().multiplyBy(0.5 + this.options.padding),
              u = this._map.project(this._center, r),
              m = l
                .multiplyBy(-a)
                .add(u)
                .subtract(this._map._getNewPixelOrigin(e, r));
            nt.any3d ? Ze(this._container, m, a) : Rt(this._container, m);
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
              r = this._map.getSize(),
              a = this._map
                .containerPointToLayerPoint(r.multiplyBy(-e))
                .round();
            (this._bounds = new pt(a, a.add(r.multiplyBy(1 + e * 2)).round())),
              (this._center = this._map.getCenter()),
              (this._zoom = this._map.getZoom());
          },
        }),
        Wo = xe.extend({
          options: { tolerance: 0 },
          getEvents: function () {
            var e = xe.prototype.getEvents.call(this);
            return (e.viewprereset = this._onViewPreReset), e;
          },
          _onViewPreReset: function () {
            this._postponeUpdatePaths = !0;
          },
          onAdd: function () {
            xe.prototype.onAdd.call(this), this._draw();
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
            et(this._redrawRequest),
              delete this._ctx,
              Bt(this._container),
              Et(this._container),
              delete this._container;
          },
          _updatePaths: function () {
            if (!this._postponeUpdatePaths) {
              var e;
              this._redrawBounds = null;
              for (var r in this._layers) (e = this._layers[r]), e._update();
              this._redraw();
            }
          },
          _update: function () {
            if (!(this._map._animatingZoom && this._bounds)) {
              xe.prototype._update.call(this);
              var e = this._bounds,
                r = this._container,
                a = e.getSize(),
                l = nt.retina ? 2 : 1;
              Rt(r, e.min),
                (r.width = l * a.x),
                (r.height = l * a.y),
                (r.style.width = a.x + 'px'),
                (r.style.height = a.y + 'px'),
                nt.retina && this._ctx.scale(2, 2),
                this._ctx.translate(-e.min.x, -e.min.y),
                this.fire('update');
            }
          },
          _reset: function () {
            xe.prototype._reset.call(this),
              this._postponeUpdatePaths &&
                ((this._postponeUpdatePaths = !1), this._updatePaths());
          },
          _initPath: function (e) {
            this._updateDashArray(e), (this._layers[c(e)] = e);
            var r = (e._order = { layer: e, prev: this._drawLast, next: null });
            this._drawLast && (this._drawLast.next = r),
              (this._drawLast = r),
              (this._drawFirst = this._drawFirst || this._drawLast);
          },
          _addPath: function (e) {
            this._requestRedraw(e);
          },
          _removePath: function (e) {
            var r = e._order,
              a = r.next,
              l = r.prev;
            a ? (a.prev = l) : (this._drawLast = l),
              l ? (l.next = a) : (this._drawFirst = a),
              delete e._order,
              delete this._layers[c(e)],
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
              var r = e.options.dashArray.split(/[, ]+/),
                a = [],
                l,
                u;
              for (u = 0; u < r.length; u++) {
                if (((l = Number(r[u])), isNaN(l))) return;
                a.push(l);
              }
              e.options._dashArray = a;
            } else e.options._dashArray = e.options.dashArray;
          },
          _requestRedraw: function (e) {
            this._map &&
              (this._extendRedrawBounds(e),
              (this._redrawRequest =
                this._redrawRequest || X(this._redraw, this)));
          },
          _extendRedrawBounds: function (e) {
            if (e._pxBounds) {
              var r = (e.options.weight || 0) + 1;
              (this._redrawBounds = this._redrawBounds || new pt()),
                this._redrawBounds.extend(e._pxBounds.min.subtract([r, r])),
                this._redrawBounds.extend(e._pxBounds.max.add([r, r]));
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
              var r = e.getSize();
              this._ctx.clearRect(e.min.x, e.min.y, r.x, r.y);
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
              r = this._redrawBounds;
            if ((this._ctx.save(), r)) {
              var a = r.getSize();
              this._ctx.beginPath(),
                this._ctx.rect(r.min.x, r.min.y, a.x, a.y),
                this._ctx.clip();
            }
            this._drawing = !0;
            for (var l = this._drawFirst; l; l = l.next)
              (e = l.layer),
                (!r || (e._pxBounds && e._pxBounds.intersects(r))) &&
                  e._updatePath();
            (this._drawing = !1), this._ctx.restore();
          },
          _updatePoly: function (e, r) {
            if (this._drawing) {
              var a,
                l,
                u,
                m,
                x = e._parts,
                T = x.length,
                O = this._ctx;
              if (T) {
                for (O.beginPath(), a = 0; a < T; a++) {
                  for (l = 0, u = x[a].length; l < u; l++)
                    (m = x[a][l]), O[l ? 'lineTo' : 'moveTo'](m.x, m.y);
                  r && O.closePath();
                }
                this._fillStroke(O, e);
              }
            }
          },
          _updateCircle: function (e) {
            if (!(!this._drawing || e._empty())) {
              var r = e._point,
                a = this._ctx,
                l = Math.max(Math.round(e._radius), 1),
                u = (Math.max(Math.round(e._radiusY), 1) || l) / l;
              u !== 1 && (a.save(), a.scale(1, u)),
                a.beginPath(),
                a.arc(r.x, r.y / u, l, 0, Math.PI * 2, !1),
                u !== 1 && a.restore(),
                this._fillStroke(a, e);
            }
          },
          _fillStroke: function (e, r) {
            var a = r.options;
            a.fill &&
              ((e.globalAlpha = a.fillOpacity),
              (e.fillStyle = a.fillColor || a.color),
              e.fill(a.fillRule || 'evenodd')),
              a.stroke &&
                a.weight !== 0 &&
                (e.setLineDash &&
                  e.setLineDash((r.options && r.options._dashArray) || []),
                (e.globalAlpha = a.opacity),
                (e.lineWidth = a.weight),
                (e.strokeStyle = a.color),
                (e.lineCap = a.lineCap),
                (e.lineJoin = a.lineJoin),
                e.stroke());
          },
          _onClick: function (e) {
            for (
              var r = this._map.mouseEventToLayerPoint(e),
                a,
                l,
                u = this._drawFirst;
              u;
              u = u.next
            )
              (a = u.layer),
                a.options.interactive &&
                  a._containsPoint(r) &&
                  (!(e.type === 'click' || e.type === 'preclick') ||
                    !this._map._draggableMoved(a)) &&
                  (l = a);
            this._fireEvent(l ? [l] : !1, e);
          },
          _onMouseMove: function (e) {
            if (
              !(
                !this._map ||
                this._map.dragging.moving() ||
                this._map._animatingZoom
              )
            ) {
              var r = this._map.mouseEventToLayerPoint(e);
              this._handleMouseHover(e, r);
            }
          },
          _handleMouseOut: function (e) {
            var r = this._hoveredLayer;
            r &&
              (Ot(this._container, 'leaflet-interactive'),
              this._fireEvent([r], e, 'mouseout'),
              (this._hoveredLayer = null),
              (this._mouseHoverThrottled = !1));
          },
          _handleMouseHover: function (e, r) {
            if (!this._mouseHoverThrottled) {
              for (var a, l, u = this._drawFirst; u; u = u.next)
                (a = u.layer),
                  a.options.interactive && a._containsPoint(r) && (l = a);
              l !== this._hoveredLayer &&
                (this._handleMouseOut(e),
                l &&
                  (gt(this._container, 'leaflet-interactive'),
                  this._fireEvent([l], e, 'mouseover'),
                  (this._hoveredLayer = l))),
                this._fireEvent(
                  this._hoveredLayer ? [this._hoveredLayer] : !1,
                  e
                ),
                (this._mouseHoverThrottled = !0),
                setTimeout(
                  s(function () {
                    this._mouseHoverThrottled = !1;
                  }, this),
                  32
                );
            }
          },
          _fireEvent: function (e, r, a) {
            this._map._fireDOMEvent(r, a || r.type, e);
          },
          _bringToFront: function (e) {
            var r = e._order;
            if (r) {
              var a = r.next,
                l = r.prev;
              if (a) a.prev = l;
              else return;
              l ? (l.next = a) : a && (this._drawFirst = a),
                (r.prev = this._drawLast),
                (this._drawLast.next = r),
                (r.next = null),
                (this._drawLast = r),
                this._requestRedraw(e);
            }
          },
          _bringToBack: function (e) {
            var r = e._order;
            if (r) {
              var a = r.next,
                l = r.prev;
              if (l) l.next = a;
              else return;
              a ? (a.prev = l) : l && (this._drawLast = l),
                (r.prev = null),
                (r.next = this._drawFirst),
                (this._drawFirst.prev = r),
                (this._drawFirst = r),
                this._requestRedraw(e);
            }
          },
        });
      function Yo(e) {
        return nt.canvas ? new Wo(e) : null;
      }
      var Ni = (function () {
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
        Vf = {
          _initContainer: function () {
            this._container = xt('div', 'leaflet-vml-container');
          },
          _update: function () {
            this._map._animatingZoom ||
              (xe.prototype._update.call(this), this.fire('update'));
          },
          _initPath: function (e) {
            var r = (e._container = Ni('shape'));
            gt(r, 'leaflet-vml-shape ' + (this.options.className || '')),
              (r.coordsize = '1 1'),
              (e._path = Ni('path')),
              r.appendChild(e._path),
              this._updateStyle(e),
              (this._layers[c(e)] = e);
          },
          _addPath: function (e) {
            var r = e._container;
            this._container.appendChild(r),
              e.options.interactive && e.addInteractiveTarget(r);
          },
          _removePath: function (e) {
            var r = e._container;
            Bt(r), e.removeInteractiveTarget(r), delete this._layers[c(e)];
          },
          _updateStyle: function (e) {
            var r = e._stroke,
              a = e._fill,
              l = e.options,
              u = e._container;
            (u.stroked = !!l.stroke),
              (u.filled = !!l.fill),
              l.stroke
                ? (r || (r = e._stroke = Ni('stroke')),
                  u.appendChild(r),
                  (r.weight = l.weight + 'px'),
                  (r.color = l.color),
                  (r.opacity = l.opacity),
                  l.dashArray
                    ? (r.dashStyle = C(l.dashArray)
                        ? l.dashArray.join(' ')
                        : l.dashArray.replace(/( *, *)/g, ' '))
                    : (r.dashStyle = ''),
                  (r.endcap = l.lineCap.replace('butt', 'flat')),
                  (r.joinstyle = l.lineJoin))
                : r && (u.removeChild(r), (e._stroke = null)),
              l.fill
                ? (a || (a = e._fill = Ni('fill')),
                  u.appendChild(a),
                  (a.color = l.fillColor || l.color),
                  (a.opacity = l.fillOpacity))
                : a && (u.removeChild(a), (e._fill = null));
          },
          _updateCircle: function (e) {
            var r = e._point.round(),
              a = Math.round(e._radius),
              l = Math.round(e._radiusY || a);
            this._setPath(
              e,
              e._empty()
                ? 'M0 0'
                : 'AL ' +
                    r.x +
                    ',' +
                    r.y +
                    ' ' +
                    a +
                    ',' +
                    l +
                    ' 0,' +
                    65535 * 360
            );
          },
          _setPath: function (e, r) {
            e._path.v = r;
          },
          _bringToFront: function (e) {
            ni(e._container);
          },
          _bringToBack: function (e) {
            oi(e._container);
          },
        },
        br = nt.vml ? Ni : ge,
        Gi = xe.extend({
          _initContainer: function () {
            (this._container = br('svg')),
              this._container.setAttribute('pointer-events', 'none'),
              (this._rootGroup = br('g')),
              this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function () {
            Bt(this._container),
              Et(this._container),
              delete this._container,
              delete this._rootGroup,
              delete this._svgSize;
          },
          _update: function () {
            if (!(this._map._animatingZoom && this._bounds)) {
              xe.prototype._update.call(this);
              var e = this._bounds,
                r = e.getSize(),
                a = this._container;
              (!this._svgSize || !this._svgSize.equals(r)) &&
                ((this._svgSize = r),
                a.setAttribute('width', r.x),
                a.setAttribute('height', r.y)),
                Rt(a, e.min),
                a.setAttribute(
                  'viewBox',
                  [e.min.x, e.min.y, r.x, r.y].join(' ')
                ),
                this.fire('update');
            }
          },
          _initPath: function (e) {
            var r = (e._path = br('path'));
            e.options.className && gt(r, e.options.className),
              e.options.interactive && gt(r, 'leaflet-interactive'),
              this._updateStyle(e),
              (this._layers[c(e)] = e);
          },
          _addPath: function (e) {
            this._rootGroup || this._initContainer(),
              this._rootGroup.appendChild(e._path),
              e.addInteractiveTarget(e._path);
          },
          _removePath: function (e) {
            Bt(e._path),
              e.removeInteractiveTarget(e._path),
              delete this._layers[c(e)];
          },
          _updatePath: function (e) {
            e._project(), e._update();
          },
          _updateStyle: function (e) {
            var r = e._path,
              a = e.options;
            r &&
              (a.stroke
                ? (r.setAttribute('stroke', a.color),
                  r.setAttribute('stroke-opacity', a.opacity),
                  r.setAttribute('stroke-width', a.weight),
                  r.setAttribute('stroke-linecap', a.lineCap),
                  r.setAttribute('stroke-linejoin', a.lineJoin),
                  a.dashArray
                    ? r.setAttribute('stroke-dasharray', a.dashArray)
                    : r.removeAttribute('stroke-dasharray'),
                  a.dashOffset
                    ? r.setAttribute('stroke-dashoffset', a.dashOffset)
                    : r.removeAttribute('stroke-dashoffset'))
                : r.setAttribute('stroke', 'none'),
              a.fill
                ? (r.setAttribute('fill', a.fillColor || a.color),
                  r.setAttribute('fill-opacity', a.fillOpacity),
                  r.setAttribute('fill-rule', a.fillRule || 'evenodd'))
                : r.setAttribute('fill', 'none'));
          },
          _updatePoly: function (e, r) {
            this._setPath(e, ii(e._parts, r));
          },
          _updateCircle: function (e) {
            var r = e._point,
              a = Math.max(Math.round(e._radius), 1),
              l = Math.max(Math.round(e._radiusY), 1) || a,
              u = 'a' + a + ',' + l + ' 0 1,0 ',
              m = e._empty()
                ? 'M0 0'
                : 'M' +
                  (r.x - a) +
                  ',' +
                  r.y +
                  u +
                  a * 2 +
                  ',0 ' +
                  u +
                  -a * 2 +
                  ',0 ';
            this._setPath(e, m);
          },
          _setPath: function (e, r) {
            e._path.setAttribute('d', r);
          },
          _bringToFront: function (e) {
            ni(e._path);
          },
          _bringToBack: function (e) {
            oi(e._path);
          },
        });
      nt.vml && Gi.include(Vf);
      function $o(e) {
        return nt.svg || nt.vml ? new Gi(e) : null;
      }
      Lt.include({
        getRenderer: function (e) {
          var r =
            e.options.renderer ||
            this._getPaneRenderer(e.options.pane) ||
            this.options.renderer ||
            this._renderer;
          return (
            r || (r = this._renderer = this._createRenderer()),
            this.hasLayer(r) || this.addLayer(r),
            r
          );
        },
        _getPaneRenderer: function (e) {
          if (e === 'overlayPane' || e === void 0) return !1;
          var r = this._paneRenderers[e];
          return (
            r === void 0 &&
              ((r = this._createRenderer({ pane: e })),
              (this._paneRenderers[e] = r)),
            r
          );
        },
        _createRenderer: function (e) {
          return (this.options.preferCanvas && Yo(e)) || $o(e);
        },
      });
      var Xo = li.extend({
        initialize: function (e, r) {
          li.prototype.initialize.call(this, this._boundsToLatLngs(e), r);
        },
        setBounds: function (e) {
          return this.setLatLngs(this._boundsToLatLngs(e));
        },
        _boundsToLatLngs: function (e) {
          return (
            (e = Pt(e)),
            [
              e.getSouthWest(),
              e.getNorthWest(),
              e.getNorthEast(),
              e.getSouthEast(),
            ]
          );
        },
      });
      function Hf(e, r) {
        return new Xo(e, r);
      }
      (Gi.create = br),
        (Gi.pointsToPath = ii),
        (we.geometryToLayer = pr),
        (we.coordsToLatLng = un),
        (we.coordsToLatLngs = mr),
        (we.latLngToCoords = cn),
        (we.latLngsToCoords = gr),
        (we.getFeature = hi),
        (we.asFeature = _r),
        Lt.mergeOptions({ boxZoom: !0 });
      var Jo = ue.extend({
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
          Et(this._container, 'mousedown', this._onMouseDown, this);
        },
        moved: function () {
          return this._moved;
        },
        _destroy: function () {
          Bt(this._pane), delete this._pane;
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
            Ti(),
            Kr(),
            (this._startPoint = this._map.mouseEventToContainerPoint(e)),
            ft(
              document,
              {
                contextmenu: He,
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
            (this._box = xt('div', 'leaflet-zoom-box', this._container)),
            gt(this._container, 'leaflet-crosshair'),
            this._map.fire('boxzoomstart')),
            (this._point = this._map.mouseEventToContainerPoint(e));
          var r = new pt(this._point, this._startPoint),
            a = r.getSize();
          Rt(this._box, r.min),
            (this._box.style.width = a.x + 'px'),
            (this._box.style.height = a.y + 'px');
        },
        _finish: function () {
          this._moved &&
            (Bt(this._box), Ot(this._container, 'leaflet-crosshair')),
            Di(),
            Wr(),
            Et(
              document,
              {
                contextmenu: He,
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
                s(this._resetState, this),
                0
              ));
            var r = new Tt(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(r).fire('boxzoomend', { boxZoomBounds: r });
          }
        },
        _onKeyDown: function (e) {
          e.keyCode === 27 &&
            (this._finish(),
            this._clearDeferredResetState(),
            this._resetState());
        },
      });
      Lt.addInitHook('addHandler', 'boxZoom', Jo),
        Lt.mergeOptions({ doubleClickZoom: !0 });
      var Qo = ue.extend({
        addHooks: function () {
          this._map.on('dblclick', this._onDoubleClick, this);
        },
        removeHooks: function () {
          this._map.off('dblclick', this._onDoubleClick, this);
        },
        _onDoubleClick: function (e) {
          var r = this._map,
            a = r.getZoom(),
            l = r.options.zoomDelta,
            u = e.originalEvent.shiftKey ? a - l : a + l;
          r.options.doubleClickZoom === 'center'
            ? r.setZoom(u)
            : r.setZoomAround(e.containerPoint, u);
        },
      });
      Lt.addInitHook('addHandler', 'doubleClickZoom', Qo),
        Lt.mergeOptions({
          dragging: !0,
          inertia: !0,
          inertiaDeceleration: 3400,
          inertiaMaxSpeed: 1 / 0,
          easeLinearity: 0.2,
          worldCopyJump: !1,
          maxBoundsViscosity: 0,
        });
      var ta = ue.extend({
        addHooks: function () {
          if (!this._draggable) {
            var e = this._map;
            (this._draggable = new Ee(e._mapPane, e._container)),
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
          gt(this._map._container, 'leaflet-grab leaflet-touch-drag'),
            this._draggable.enable(),
            (this._positions = []),
            (this._times = []);
        },
        removeHooks: function () {
          Ot(this._map._container, 'leaflet-grab'),
            Ot(this._map._container, 'leaflet-touch-drag'),
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
            var r = Pt(this._map.options.maxBounds);
            (this._offsetLimit = _t(
              this._map.latLngToContainerPoint(r.getNorthWest()).multiplyBy(-1),
              this._map
                .latLngToContainerPoint(r.getSouthEast())
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
            var r = (this._lastTime = +new Date()),
              a = (this._lastPos =
                this._draggable._absPos || this._draggable._newPos);
            this._positions.push(a),
              this._times.push(r),
              this._prunePositions(r);
          }
          this._map.fire('move', e).fire('drag', e);
        },
        _prunePositions: function (e) {
          for (; this._positions.length > 1 && e - this._times[0] > 50; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function () {
          var e = this._map.getSize().divideBy(2),
            r = this._map.latLngToLayerPoint([0, 0]);
          (this._initialWorldOffset = r.subtract(e).x),
            (this._worldWidth = this._map.getPixelWorldBounds().getSize().x);
        },
        _viscousLimit: function (e, r) {
          return e - (e - r) * this._viscosity;
        },
        _onPreDragLimit: function () {
          if (!(!this._viscosity || !this._offsetLimit)) {
            var e = this._draggable._newPos.subtract(this._draggable._startPos),
              r = this._offsetLimit;
            e.x < r.min.x && (e.x = this._viscousLimit(e.x, r.min.x)),
              e.y < r.min.y && (e.y = this._viscousLimit(e.y, r.min.y)),
              e.x > r.max.x && (e.x = this._viscousLimit(e.x, r.max.x)),
              e.y > r.max.y && (e.y = this._viscousLimit(e.y, r.max.y)),
              (this._draggable._newPos = this._draggable._startPos.add(e));
          }
        },
        _onPreDragWrap: function () {
          var e = this._worldWidth,
            r = Math.round(e / 2),
            a = this._initialWorldOffset,
            l = this._draggable._newPos.x,
            u = ((l - r + a) % e) + r - a,
            m = ((l + r + a) % e) - r - a,
            x = Math.abs(u + a) < Math.abs(m + a) ? u : m;
          (this._draggable._absPos = this._draggable._newPos.clone()),
            (this._draggable._newPos.x = x);
        },
        _onDragEnd: function (e) {
          var r = this._map,
            a = r.options,
            l = !a.inertia || e.noInertia || this._times.length < 2;
          if ((r.fire('dragend', e), l)) r.fire('moveend');
          else {
            this._prunePositions(+new Date());
            var u = this._lastPos.subtract(this._positions[0]),
              m = (this._lastTime - this._times[0]) / 1e3,
              x = a.easeLinearity,
              T = u.multiplyBy(x / m),
              O = T.distanceTo([0, 0]),
              U = Math.min(a.inertiaMaxSpeed, O),
              J = T.multiplyBy(U / O),
              ut = U / (a.inertiaDeceleration * x),
              vt = J.multiplyBy(-ut / 2).round();
            !vt.x && !vt.y
              ? r.fire('moveend')
              : ((vt = r._limitOffset(vt, r.options.maxBounds)),
                X(function () {
                  r.panBy(vt, {
                    duration: ut,
                    easeLinearity: x,
                    noMoveStart: !0,
                    animate: !0,
                  });
                }));
          }
        },
      });
      Lt.addInitHook('addHandler', 'dragging', ta),
        Lt.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 });
      var ea = ue.extend({
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
            Et(
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
              r = document.documentElement,
              a = e.scrollTop || r.scrollTop,
              l = e.scrollLeft || r.scrollLeft;
            this._map._container.focus(), window.scrollTo(l, a);
          }
        },
        _onFocus: function () {
          (this._focused = !0), this._map.fire('focus');
        },
        _onBlur: function () {
          (this._focused = !1), this._map.fire('blur');
        },
        _setPanDelta: function (e) {
          var r = (this._panKeys = {}),
            a = this.keyCodes,
            l,
            u;
          for (l = 0, u = a.left.length; l < u; l++) r[a.left[l]] = [-1 * e, 0];
          for (l = 0, u = a.right.length; l < u; l++) r[a.right[l]] = [e, 0];
          for (l = 0, u = a.down.length; l < u; l++) r[a.down[l]] = [0, e];
          for (l = 0, u = a.up.length; l < u; l++) r[a.up[l]] = [0, -1 * e];
        },
        _setZoomDelta: function (e) {
          var r = (this._zoomKeys = {}),
            a = this.keyCodes,
            l,
            u;
          for (l = 0, u = a.zoomIn.length; l < u; l++) r[a.zoomIn[l]] = e;
          for (l = 0, u = a.zoomOut.length; l < u; l++) r[a.zoomOut[l]] = -e;
        },
        _addHooks: function () {
          ft(document, 'keydown', this._onKeyDown, this);
        },
        _removeHooks: function () {
          Et(document, 'keydown', this._onKeyDown, this);
        },
        _onKeyDown: function (e) {
          if (!(e.altKey || e.ctrlKey || e.metaKey)) {
            var r = e.keyCode,
              a = this._map,
              l;
            if (r in this._panKeys) {
              if (!a._panAnim || !a._panAnim._inProgress)
                if (
                  ((l = this._panKeys[r]),
                  e.shiftKey && (l = Q(l).multiplyBy(3)),
                  a.options.maxBounds &&
                    (l = a._limitOffset(Q(l), a.options.maxBounds)),
                  a.options.worldCopyJump)
                ) {
                  var u = a.wrapLatLng(
                    a.unproject(a.project(a.getCenter()).add(l))
                  );
                  a.panTo(u);
                } else a.panBy(l);
            } else if (r in this._zoomKeys)
              a.setZoom(a.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[r]);
            else if (r === 27 && a._popup && a._popup.options.closeOnEscapeKey)
              a.closePopup();
            else return;
            He(e);
          }
        },
      });
      Lt.addInitHook('addHandler', 'keyboard', ea),
        Lt.mergeOptions({
          scrollWheelZoom: !0,
          wheelDebounceTime: 40,
          wheelPxPerZoomLevel: 60,
        });
      var ia = ue.extend({
        addHooks: function () {
          ft(this._map._container, 'wheel', this._onWheelScroll, this),
            (this._delta = 0);
        },
        removeHooks: function () {
          Et(this._map._container, 'wheel', this._onWheelScroll, this);
        },
        _onWheelScroll: function (e) {
          var r = Co(e),
            a = this._map.options.wheelDebounceTime;
          (this._delta += r),
            (this._lastMousePos = this._map.mouseEventToContainerPoint(e)),
            this._startTime || (this._startTime = +new Date());
          var l = Math.max(a - (+new Date() - this._startTime), 0);
          clearTimeout(this._timer),
            (this._timer = setTimeout(s(this._performZoom, this), l)),
            He(e);
        },
        _performZoom: function () {
          var e = this._map,
            r = e.getZoom(),
            a = this._map.options.zoomSnap || 0;
          e._stop();
          var l = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
            u = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(l))))) / Math.LN2,
            m = a ? Math.ceil(u / a) * a : u,
            x = e._limitZoom(r + (this._delta > 0 ? m : -m)) - r;
          (this._delta = 0),
            (this._startTime = null),
            x &&
              (e.options.scrollWheelZoom === 'center'
                ? e.setZoom(r + x)
                : e.setZoomAround(this._lastMousePos, r + x));
        },
      });
      Lt.addInitHook('addHandler', 'scrollWheelZoom', ia);
      var jf = 600;
      Lt.mergeOptions({
        tapHold: nt.touchNative && nt.safari && nt.mobile,
        tapTolerance: 15,
      });
      var ra = ue.extend({
        addHooks: function () {
          ft(this._map._container, 'touchstart', this._onDown, this);
        },
        removeHooks: function () {
          Et(this._map._container, 'touchstart', this._onDown, this);
        },
        _onDown: function (e) {
          if ((clearTimeout(this._holdTimeout), e.touches.length === 1)) {
            var r = e.touches[0];
            (this._startPos = this._newPos = new it(r.clientX, r.clientY)),
              (this._holdTimeout = setTimeout(
                s(function () {
                  this._cancel(),
                    this._isTapValid() &&
                      (ft(document, 'touchend', Ft),
                      ft(
                        document,
                        'touchend touchcancel',
                        this._cancelClickPrevent
                      ),
                      this._simulateEvent('contextmenu', r));
                }, this),
                jf
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
          Et(document, 'touchend', Ft), Et(document, 'touchend touchcancel', e);
        },
        _cancel: function () {
          clearTimeout(this._holdTimeout),
            Et(
              document,
              'touchend touchcancel contextmenu',
              this._cancel,
              this
            ),
            Et(document, 'touchmove', this._onMove, this);
        },
        _onMove: function (e) {
          var r = e.touches[0];
          this._newPos = new it(r.clientX, r.clientY);
        },
        _isTapValid: function () {
          return (
            this._newPos.distanceTo(this._startPos) <=
            this._map.options.tapTolerance
          );
        },
        _simulateEvent: function (e, r) {
          var a = new MouseEvent(e, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            screenX: r.screenX,
            screenY: r.screenY,
            clientX: r.clientX,
            clientY: r.clientY,
          });
          (a._simulated = !0), r.target.dispatchEvent(a);
        },
      });
      Lt.addInitHook('addHandler', 'tapHold', ra),
        Lt.mergeOptions({ touchZoom: nt.touch, bounceAtZoomLimits: !0 });
      var na = ue.extend({
        addHooks: function () {
          gt(this._map._container, 'leaflet-touch-zoom'),
            ft(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        removeHooks: function () {
          Ot(this._map._container, 'leaflet-touch-zoom'),
            Et(this._map._container, 'touchstart', this._onTouchStart, this);
        },
        _onTouchStart: function (e) {
          var r = this._map;
          if (
            !(
              !e.touches ||
              e.touches.length !== 2 ||
              r._animatingZoom ||
              this._zooming
            )
          ) {
            var a = r.mouseEventToContainerPoint(e.touches[0]),
              l = r.mouseEventToContainerPoint(e.touches[1]);
            (this._centerPoint = r.getSize()._divideBy(2)),
              (this._startLatLng = r.containerPointToLatLng(this._centerPoint)),
              r.options.touchZoom !== 'center' &&
                (this._pinchStartLatLng = r.containerPointToLatLng(
                  a.add(l)._divideBy(2)
                )),
              (this._startDist = a.distanceTo(l)),
              (this._startZoom = r.getZoom()),
              (this._moved = !1),
              (this._zooming = !0),
              r._stop(),
              ft(document, 'touchmove', this._onTouchMove, this),
              ft(document, 'touchend touchcancel', this._onTouchEnd, this),
              Ft(e);
          }
        },
        _onTouchMove: function (e) {
          if (!(!e.touches || e.touches.length !== 2 || !this._zooming)) {
            var r = this._map,
              a = r.mouseEventToContainerPoint(e.touches[0]),
              l = r.mouseEventToContainerPoint(e.touches[1]),
              u = a.distanceTo(l) / this._startDist;
            if (
              ((this._zoom = r.getScaleZoom(u, this._startZoom)),
              !r.options.bounceAtZoomLimits &&
                ((this._zoom < r.getMinZoom() && u < 1) ||
                  (this._zoom > r.getMaxZoom() && u > 1)) &&
                (this._zoom = r._limitZoom(this._zoom)),
              r.options.touchZoom === 'center')
            ) {
              if (((this._center = this._startLatLng), u === 1)) return;
            } else {
              var m = a._add(l)._divideBy(2)._subtract(this._centerPoint);
              if (u === 1 && m.x === 0 && m.y === 0) return;
              this._center = r.unproject(
                r.project(this._pinchStartLatLng, this._zoom).subtract(m),
                this._zoom
              );
            }
            this._moved || (r._moveStart(!0, !1), (this._moved = !0)),
              et(this._animRequest);
            var x = s(
              r._move,
              r,
              this._center,
              this._zoom,
              { pinch: !0, round: !1 },
              void 0
            );
            (this._animRequest = X(x, this, !0)), Ft(e);
          }
        },
        _onTouchEnd: function () {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          (this._zooming = !1),
            et(this._animRequest),
            Et(document, 'touchmove', this._onTouchMove, this),
            Et(document, 'touchend touchcancel', this._onTouchEnd, this),
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
      Lt.addInitHook('addHandler', 'touchZoom', na),
        (Lt.BoxZoom = Jo),
        (Lt.DoubleClickZoom = Qo),
        (Lt.Drag = ta),
        (Lt.Keyboard = ea),
        (Lt.ScrollWheelZoom = ia),
        (Lt.TapHold = ra),
        (Lt.TouchZoom = na),
        (t.Bounds = pt),
        (t.Browser = nt),
        (t.CRS = Ht),
        (t.Canvas = Wo),
        (t.Circle = hn),
        (t.CircleMarker = dr),
        (t.Class = ht),
        (t.Control = re),
        (t.DivIcon = Ho),
        (t.DivOverlay = ce),
        (t.DomEvent = uf),
        (t.DomUtil = lf),
        (t.Draggable = Ee),
        (t.Evented = Dt),
        (t.FeatureGroup = Le),
        (t.GeoJSON = we),
        (t.GridLayer = zi),
        (t.Handler = ue),
        (t.Icon = si),
        (t.ImageOverlay = yr),
        (t.LatLng = mt),
        (t.LatLngBounds = Tt),
        (t.Layer = ne),
        (t.LayerGroup = ai),
        (t.LineUtil = wf),
        (t.Map = Lt),
        (t.Marker = fr),
        (t.Mixin = _f),
        (t.Path = Se),
        (t.Point = it),
        (t.PolyUtil = xf),
        (t.Polygon = li),
        (t.Polyline = be),
        (t.Popup = vr),
        (t.PosAnimation = Po),
        (t.Projection = kf),
        (t.Rectangle = Xo),
        (t.Renderer = xe),
        (t.SVG = Gi),
        (t.SVGOverlay = Vo),
        (t.TileLayer = ui),
        (t.Tooltip = Lr),
        (t.Transformation = Ne),
        (t.Util = at),
        (t.VideoOverlay = Uo),
        (t.bind = s),
        (t.bounds = _t),
        (t.canvas = Yo),
        (t.circle = Bf),
        (t.circleMarker = Df),
        (t.control = Oi),
        (t.divIcon = qf),
        (t.extend = n),
        (t.featureGroup = Ef),
        (t.geoJSON = Zo),
        (t.geoJson = Rf),
        (t.gridLayer = Zf),
        (t.icon = Sf),
        (t.imageOverlay = If),
        (t.latLng = bt),
        (t.latLngBounds = Pt),
        (t.layerGroup = Pf),
        (t.map = cf),
        (t.marker = Tf),
        (t.point = Q),
        (t.polygon = Of),
        (t.polyline = Af),
        (t.popup = Gf),
        (t.rectangle = Hf),
        (t.setOptions = D),
        (t.stamp = c),
        (t.svg = $o),
        (t.svgOverlay = Nf),
        (t.tileLayer = jo),
        (t.tooltip = Ff),
        (t.transformation = jt),
        (t.version = i),
        (t.videoOverlay = zf);
      var Kf = window.L;
      (t.noConflict = function () {
        return (window.L = Kf), this;
      }),
        (window.L = t);
    });
  });
  var ca = G((Sb, mn) => {
    (function (t) {
      var i;
      if (typeof define == 'function' && define.amd) define(['leaflet'], t);
      else if (typeof mn < 'u') (i = ua()), (mn.exports = t(i));
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
          distance: function (i, n, o) {
            return i.latLngToLayerPoint(n).distanceTo(i.latLngToLayerPoint(o));
          },
          distanceSegment: function (i, n, o, s) {
            var h = i.latLngToLayerPoint(n),
              c = i.latLngToLayerPoint(o),
              f = i.latLngToLayerPoint(s);
            return t.LineUtil.pointToSegmentDistance(h, c, f);
          },
          readableDistance: function (i, n) {
            var o = n !== 'imperial',
              s;
            return (
              o
                ? i > 1e3
                  ? (s = (i / 1e3).toFixed(2) + ' km')
                  : (s = i.toFixed(1) + ' m')
                : ((i *= 1.09361),
                  i > 1760
                    ? (s = (i / 1760).toFixed(2) + ' miles')
                    : (s = i.toFixed(1) + ' yd')),
              s
            );
          },
          belongsSegment: function (i, n, o, s) {
            s = s === void 0 ? 0.2 : s;
            var h = n.distanceTo(o),
              c = n.distanceTo(i) + i.distanceTo(o) - h;
            return c / h < s;
          },
          length: function (i) {
            var n = t.GeometryUtil.accumulatedLengths(i);
            return n.length > 0 ? n[n.length - 1] : 0;
          },
          accumulatedLengths: function (i) {
            if (
              (typeof i.getLatLngs == 'function' && (i = i.getLatLngs()),
              i.length === 0)
            )
              return [];
            for (var n = 0, o = [0], s = 0, h = i.length - 1; s < h; s++)
              (n += i[s].distanceTo(i[s + 1])), o.push(n);
            return o;
          },
          closestOnSegment: function (i, n, o, s) {
            var h = i.getMaxZoom();
            h === 1 / 0 && (h = i.getZoom());
            var c = i.project(n, h),
              f = i.project(o, h),
              d = i.project(s, h),
              y = t.LineUtil.closestPointOnSegment(c, f, d);
            return i.unproject(y, h);
          },
          closestOnCircle: function (i, n) {
            let o = i.getLatLng(),
              s = i.getRadius(),
              h = typeof s == 'number' ? s : s.radius,
              c = n.lng,
              f = n.lat,
              d = o.lng,
              y = o.lat,
              w = c - d,
              P = f - y,
              R = Math.sqrt(w * w + P * P),
              D = d + (w / R) * h,
              N = y + (P / R) * h;
            return new t.LatLng(N, D);
          },
          closest: function (i, n, o, s) {
            var h,
              c = 1 / 0,
              f = null,
              d,
              y,
              w,
              P;
            if (n instanceof Array)
              if (n[0] instanceof Array && typeof n[0][0] != 'number') {
                for (d = 0; d < n.length; d++)
                  (P = t.GeometryUtil.closest(i, n[d], o, s)),
                    P && P.distance < c && ((c = P.distance), (f = P));
                return f;
              } else if (
                n[0] instanceof t.LatLng ||
                typeof n[0][0] == 'number' ||
                typeof n[0].lat == 'number'
              )
                n = t.polyline(n);
              else return f;
            if (!(n instanceof t.Polyline)) return f;
            if (
              ((h = JSON.parse(JSON.stringify(n.getLatLngs().slice(0)))),
              n instanceof t.Polygon)
            ) {
              var R = function (k) {
                if (t.Polyline._flat(k)) k.push(k[0]);
                else for (var C = 0; C < k.length; C++) R(k[C]);
              };
              R(h);
            }
            if (t.Polyline._flat(h)) {
              if (s) {
                for (d = 0, y = h.length; d < y; d++) {
                  var D = h[d];
                  (w = t.GeometryUtil.distance(i, o, D)),
                    w < c && ((c = w), (f = D), (f.distance = w));
                }
                return f;
              }
              for (d = 0, y = h.length; d < y - 1; d++) {
                var N = h[d],
                  Y = h[d + 1];
                (w = t.GeometryUtil.distanceSegment(i, o, N, Y)),
                  w <= c &&
                    ((c = w),
                    (f = t.GeometryUtil.closestOnSegment(i, o, N, Y)),
                    (f.distance = w));
              }
              return f;
            } else {
              for (d = 0; d < h.length; d++)
                (P = t.GeometryUtil.closest(i, h[d], o, s)),
                  P.distance < c && ((c = P.distance), (f = P));
              return f;
            }
          },
          closestLayer: function (i, n, o) {
            for (
              var s = 1 / 0, h = null, c = null, f = 1 / 0, d = 0, y = n.length;
              d < y;
              d++
            ) {
              var w = n[d];
              if (w instanceof t.LayerGroup) {
                var P = t.GeometryUtil.closestLayer(i, w.getLayers(), o);
                P.distance < s && ((s = P.distance), (h = P));
              } else
                w instanceof t.Circle
                  ? ((c = this.closestOnCircle(w, o)),
                    (f = t.GeometryUtil.distance(i, o, c)))
                  : typeof w.getLatLng == 'function'
                    ? ((c = w.getLatLng()),
                      (f = t.GeometryUtil.distance(i, o, c)))
                    : ((c = t.GeometryUtil.closest(i, w, o)),
                      c && (f = c.distance)),
                  f < s &&
                    ((s = f), (h = { layer: w, latlng: c, distance: f }));
            }
            return h;
          },
          nClosestLayers: function (i, n, o, s) {
            if (
              ((s = typeof s == 'number' ? s : n.length), s < 1 || n.length < 1)
            )
              return null;
            for (var h = [], c, f, d = 0, y = n.length; d < y; d++) {
              var w = n[d];
              if (w instanceof t.LayerGroup) {
                var P = t.GeometryUtil.closestLayer(i, w.getLayers(), o);
                h.push(P);
              } else
                w instanceof t.Circle
                  ? ((f = this.closestOnCircle(w, o)),
                    (c = t.GeometryUtil.distance(i, o, f)))
                  : typeof w.getLatLng == 'function'
                    ? ((f = w.getLatLng()),
                      (c = t.GeometryUtil.distance(i, o, f)))
                    : ((f = t.GeometryUtil.closest(i, w, o)),
                      f && (c = f.distance)),
                  h.push({ layer: w, latlng: f, distance: c });
            }
            return (
              h.sort(function (R, D) {
                return R.distance - D.distance;
              }),
              h.length > s ? h.slice(0, s) : h
            );
          },
          layersWithin: function (i, n, o, s) {
            s = typeof s == 'number' ? s : 1 / 0;
            for (var h = [], c = null, f = 0, d = 0, y = n.length; d < y; d++) {
              var w = n[d];
              typeof w.getLatLng == 'function'
                ? ((c = w.getLatLng()), (f = t.GeometryUtil.distance(i, o, c)))
                : ((c = t.GeometryUtil.closest(i, w, o)),
                  c && (f = c.distance)),
                c && f < s && h.push({ layer: w, latlng: c, distance: f });
            }
            var P = h.sort(function (R, D) {
              return R.distance - D.distance;
            });
            return P;
          },
          closestLayerSnap: function (i, n, o, s, h) {
            (s = typeof s == 'number' ? s : 1 / 0),
              (h = typeof h == 'boolean' ? h : !0);
            var c = t.GeometryUtil.closestLayer(i, n, o);
            if (!c || c.distance > s) return null;
            if (h && typeof c.layer.getLatLngs == 'function') {
              var f = t.GeometryUtil.closest(i, c.layer, c.latlng, !0);
              f.distance < s &&
                ((c.latlng = f),
                (c.distance = t.GeometryUtil.distance(i, f, o)));
            }
            return c;
          },
          interpolateOnPointSegment: function (i, n, o) {
            return t.point(i.x * (1 - o) + o * n.x, i.y * (1 - o) + o * n.y);
          },
          interpolateOnLine: function (i, n, o) {
            n = n instanceof t.Polyline ? n.getLatLngs() : n;
            var s = n.length;
            if (s < 2) return null;
            if (((o = Math.max(Math.min(o, 1), 0)), o === 0))
              return {
                latLng: n[0] instanceof t.LatLng ? n[0] : t.latLng(n[0]),
                predecessor: -1,
              };
            if (o == 1)
              return {
                latLng:
                  n[n.length - 1] instanceof t.LatLng
                    ? n[n.length - 1]
                    : t.latLng(n[n.length - 1]),
                predecessor: n.length - 2,
              };
            var h = i.getMaxZoom();
            h === 1 / 0 && (h = i.getZoom());
            for (var c = [], f = 0, d = 0; d < s; d++)
              (c[d] = i.project(n[d], h)),
                d > 0 && (f += c[d - 1].distanceTo(c[d]));
            for (var y = f * o, w = 0, P = 0, d = 0; P < y; d++) {
              var R = c[d],
                D = c[d + 1];
              (w = P), (P += R.distanceTo(D));
            }
            if (R == null && D == null)
              var R = c[0],
                D = c[1],
                d = 1;
            var N = P - w !== 0 ? (y - w) / (P - w) : 0,
              Y = t.GeometryUtil.interpolateOnPointSegment(R, D, N);
            return { latLng: i.unproject(Y, h), predecessor: d - 1 };
          },
          locateOnLine: function (i, n, o) {
            var s = n.getLatLngs();
            if (o.equals(s[0])) return 0;
            if (o.equals(s[s.length - 1])) return 1;
            for (
              var h = t.GeometryUtil.closest(i, n, o, !1),
                c = t.GeometryUtil.accumulatedLengths(s),
                f = c[c.length - 1],
                d = 0,
                y = !1,
                w = 0,
                P = s.length - 1;
              w < P;
              w++
            ) {
              var R = s[w],
                D = s[w + 1];
              if (((d = c[w]), t.GeometryUtil.belongsSegment(h, R, D, 0.001))) {
                (d += R.distanceTo(h)), (y = !0);
                break;
              }
            }
            if (!y)
              throw (
                'Could not interpolate ' +
                o.toString() +
                ' within ' +
                n.toString()
              );
            return d / f;
          },
          reverse: function (i) {
            return t.polyline(i.getLatLngs().slice(0).reverse());
          },
          extract: function (i, n, o, s) {
            if (o > s)
              return t.GeometryUtil.extract(
                i,
                t.GeometryUtil.reverse(n),
                1 - o,
                1 - s
              );
            (o = Math.max(Math.min(o, 1), 0)),
              (s = Math.max(Math.min(s, 1), 0));
            var h = n.getLatLngs(),
              c = t.GeometryUtil.interpolateOnLine(i, n, o),
              f = t.GeometryUtil.interpolateOnLine(i, n, s);
            if (o == s) {
              var d = t.GeometryUtil.interpolateOnLine(i, n, s);
              return [d.latLng];
            }
            c.predecessor == -1 && (c.predecessor = 0),
              f.predecessor == -1 && (f.predecessor = 0);
            var y = h.slice(c.predecessor + 1, f.predecessor + 1);
            return y.unshift(c.latLng), y.push(f.latLng), y;
          },
          isBefore: function (i, n) {
            if (!n) return !1;
            var o = i.getLatLngs(),
              s = n.getLatLngs();
            return o[o.length - 1].equals(s[0]);
          },
          isAfter: function (i, n) {
            if (!n) return !1;
            var o = i.getLatLngs(),
              s = n.getLatLngs();
            return o[0].equals(s[s.length - 1]);
          },
          startsAtExtremity: function (i, n) {
            if (!n) return !1;
            var o = i.getLatLngs(),
              s = n.getLatLngs(),
              h = o[0];
            return h.equals(s[0]) || h.equals(s[s.length - 1]);
          },
          computeAngle: function (i, n) {
            return (Math.atan2(n.y - i.y, n.x - i.x) * 180) / Math.PI;
          },
          computeSlope: function (i, n) {
            var o = (n.y - i.y) / (n.x - i.x),
              s = i.y - o * i.x;
            return { a: o, b: s };
          },
          rotatePoint: function (i, n, o, s) {
            var h = i.getMaxZoom();
            h === 1 / 0 && (h = i.getZoom());
            var c = (o * Math.PI) / 180,
              f = i.project(n, h),
              d = i.project(s, h),
              y = Math.cos(c) * (f.x - d.x) - Math.sin(c) * (f.y - d.y) + d.x,
              w = Math.sin(c) * (f.x - d.x) + Math.cos(c) * (f.y - d.y) + d.y;
            return i.unproject(new t.Point(y, w), h);
          },
          bearing: function (i, n) {
            var o = Math.PI / 180,
              s = i.lat * o,
              h = n.lat * o,
              c = i.lng * o,
              f = n.lng * o,
              d = Math.sin(f - c) * Math.cos(h),
              y =
                Math.cos(s) * Math.sin(h) -
                Math.sin(s) * Math.cos(h) * Math.cos(f - c),
              w = ((Math.atan2(d, y) * 180) / Math.PI + 360) % 360;
            return w >= 180 ? w - 360 : w;
          },
          destination: function (i, n, o) {
            n = (n + 360) % 360;
            var s = Math.PI / 180,
              h = 180 / Math.PI,
              c = t.CRS.Earth.R,
              f = i.lng * s,
              d = i.lat * s,
              y = n * s,
              w = Math.sin(d),
              P = Math.cos(d),
              R = Math.cos(o / c),
              D = Math.sin(o / c),
              N = Math.asin(w * R + P * D * Math.cos(y)),
              Y = f + Math.atan2(Math.sin(y) * D * P, R - w * Math.sin(N));
            return (
              (Y = Y * h),
              (Y = Y > 180 ? Y - 360 : Y < -180 ? Y + 360 : Y),
              t.latLng([N * h, Y])
            );
          },
          angle: function (i, n, o) {
            var s = i.latLngToContainerPoint(n),
              h = i.latLngToContainerPoint(o),
              c = (Math.atan2(h.y - s.y, h.x - s.x) * 180) / Math.PI + 90;
            return (c += c < 0 ? 360 : 0), c;
          },
          destinationOnSegment: function (i, n, o, s) {
            var h = t.GeometryUtil.angle(i, n, o),
              c = t.GeometryUtil.destination(n, h, s);
            return t.GeometryUtil.closestOnSegment(i, c, n, o);
          },
        })),
        t.GeometryUtil
      );
    });
  });
  var ma = G((Bb, pa) => {
    function cd() {
      (this.__data__ = []), (this.size = 0);
    }
    pa.exports = cd;
  });
  var Fi = G((Ab, ga) => {
    function fd(t, i) {
      return t === i || (t !== t && i !== i);
    }
    ga.exports = fd;
  });
  var qi = G((Ob, _a) => {
    var dd = Fi();
    function pd(t, i) {
      for (var n = t.length; n--; ) if (dd(t[n][0], i)) return n;
      return -1;
    }
    _a.exports = pd;
  });
  var va = G((Rb, ya) => {
    var md = qi(),
      gd = Array.prototype,
      _d = gd.splice;
    function yd(t) {
      var i = this.__data__,
        n = md(i, t);
      if (n < 0) return !1;
      var o = i.length - 1;
      return n == o ? i.pop() : _d.call(i, n, 1), --this.size, !0;
    }
    ya.exports = yd;
  });
  var ba = G((Ib, La) => {
    var vd = qi();
    function Ld(t) {
      var i = this.__data__,
        n = vd(i, t);
      return n < 0 ? void 0 : i[n][1];
    }
    La.exports = Ld;
  });
  var xa = G((zb, wa) => {
    var bd = qi();
    function wd(t) {
      return bd(this.__data__, t) > -1;
    }
    wa.exports = wd;
  });
  var Ma = G((Nb, ka) => {
    var xd = qi();
    function kd(t, i) {
      var n = this.__data__,
        o = xd(n, t);
      return o < 0 ? (++this.size, n.push([t, i])) : (n[o][1] = i), this;
    }
    ka.exports = kd;
  });
  var Zi = G((Gb, Ca) => {
    var Md = ma(),
      Cd = va(),
      Pd = ba(),
      Ed = xa(),
      Sd = Ma();
    function ci(t) {
      var i = -1,
        n = t == null ? 0 : t.length;
      for (this.clear(); ++i < n; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    ci.prototype.clear = Md;
    ci.prototype.delete = Cd;
    ci.prototype.get = Pd;
    ci.prototype.has = Ed;
    ci.prototype.set = Sd;
    Ca.exports = ci;
  });
  var Ea = G((Fb, Pa) => {
    var Td = Zi();
    function Dd() {
      (this.__data__ = new Td()), (this.size = 0);
    }
    Pa.exports = Dd;
  });
  var Ta = G((qb, Sa) => {
    function Bd(t) {
      var i = this.__data__,
        n = i.delete(t);
      return (this.size = i.size), n;
    }
    Sa.exports = Bd;
  });
  var Ba = G((Zb, Da) => {
    function Ad(t) {
      return this.__data__.get(t);
    }
    Da.exports = Ad;
  });
  var Oa = G((Ub, Aa) => {
    function Od(t) {
      return this.__data__.has(t);
    }
    Aa.exports = Od;
  });
  var _n = G((Vb, Ra) => {
    var Rd =
      typeof global == 'object' && global && global.Object === Object && global;
    Ra.exports = Rd;
  });
  var We = G((Hb, Ia) => {
    var Id = _n(),
      zd = typeof self == 'object' && self && self.Object === Object && self,
      Nd = Id || zd || Function('return this')();
    Ia.exports = Nd;
  });
  var Pr = G((jb, za) => {
    var Gd = We(),
      Fd = Gd.Symbol;
    za.exports = Fd;
  });
  var qa = G((Kb, Fa) => {
    var Na = Pr(),
      Ga = Object.prototype,
      qd = Ga.hasOwnProperty,
      Zd = Ga.toString,
      Ui = Na ? Na.toStringTag : void 0;
    function Ud(t) {
      var i = qd.call(t, Ui),
        n = t[Ui];
      try {
        t[Ui] = void 0;
        var o = !0;
      } catch {}
      var s = Zd.call(t);
      return o && (i ? (t[Ui] = n) : delete t[Ui]), s;
    }
    Fa.exports = Ud;
  });
  var Ua = G((Wb, Za) => {
    var Vd = Object.prototype,
      Hd = Vd.toString;
    function jd(t) {
      return Hd.call(t);
    }
    Za.exports = jd;
  });
  var fi = G((Yb, ja) => {
    var Va = Pr(),
      Kd = qa(),
      Wd = Ua(),
      Yd = '[object Null]',
      $d = '[object Undefined]',
      Ha = Va ? Va.toStringTag : void 0;
    function Xd(t) {
      return t == null
        ? t === void 0
          ? $d
          : Yd
        : Ha && Ha in Object(t)
          ? Kd(t)
          : Wd(t);
    }
    ja.exports = Xd;
  });
  var De = G(($b, Ka) => {
    function Jd(t) {
      var i = typeof t;
      return t != null && (i == 'object' || i == 'function');
    }
    Ka.exports = Jd;
  });
  var Er = G((Xb, Wa) => {
    var Qd = fi(),
      tp = De(),
      ep = '[object AsyncFunction]',
      ip = '[object Function]',
      rp = '[object GeneratorFunction]',
      np = '[object Proxy]';
    function op(t) {
      if (!tp(t)) return !1;
      var i = Qd(t);
      return i == ip || i == rp || i == ep || i == np;
    }
    Wa.exports = op;
  });
  var $a = G((Jb, Ya) => {
    var ap = We(),
      sp = ap['__core-js_shared__'];
    Ya.exports = sp;
  });
  var Qa = G((Qb, Ja) => {
    var yn = $a(),
      Xa = (function () {
        var t = /[^.]+$/.exec((yn && yn.keys && yn.keys.IE_PROTO) || '');
        return t ? 'Symbol(src)_1.' + t : '';
      })();
    function lp(t) {
      return !!Xa && Xa in t;
    }
    Ja.exports = lp;
  });
  var es = G((tw, ts) => {
    var hp = Function.prototype,
      up = hp.toString;
    function cp(t) {
      if (t != null) {
        try {
          return up.call(t);
        } catch {}
        try {
          return t + '';
        } catch {}
      }
      return '';
    }
    ts.exports = cp;
  });
  var rs = G((ew, is) => {
    var fp = Er(),
      dp = Qa(),
      pp = De(),
      mp = es(),
      gp = /[\\^$.*+?()[\]{}|]/g,
      _p = /^\[object .+?Constructor\]$/,
      yp = Function.prototype,
      vp = Object.prototype,
      Lp = yp.toString,
      bp = vp.hasOwnProperty,
      wp = RegExp(
        '^' +
          Lp.call(bp)
            .replace(gp, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      );
    function xp(t) {
      if (!pp(t) || dp(t)) return !1;
      var i = fp(t) ? wp : _p;
      return i.test(mp(t));
    }
    is.exports = xp;
  });
  var os = G((iw, ns) => {
    function kp(t, i) {
      return t?.[i];
    }
    ns.exports = kp;
  });
  var Sr = G((rw, as) => {
    var Mp = rs(),
      Cp = os();
    function Pp(t, i) {
      var n = Cp(t, i);
      return Mp(n) ? n : void 0;
    }
    as.exports = Pp;
  });
  var vn = G((nw, ss) => {
    var Ep = Sr(),
      Sp = We(),
      Tp = Ep(Sp, 'Map');
    ss.exports = Tp;
  });
  var Vi = G((ow, ls) => {
    var Dp = Sr(),
      Bp = Dp(Object, 'create');
    ls.exports = Bp;
  });
  var cs = G((aw, us) => {
    var hs = Vi();
    function Ap() {
      (this.__data__ = hs ? hs(null) : {}), (this.size = 0);
    }
    us.exports = Ap;
  });
  var ds = G((sw, fs) => {
    function Op(t) {
      var i = this.has(t) && delete this.__data__[t];
      return (this.size -= i ? 1 : 0), i;
    }
    fs.exports = Op;
  });
  var ms = G((lw, ps) => {
    var Rp = Vi(),
      Ip = '__lodash_hash_undefined__',
      zp = Object.prototype,
      Np = zp.hasOwnProperty;
    function Gp(t) {
      var i = this.__data__;
      if (Rp) {
        var n = i[t];
        return n === Ip ? void 0 : n;
      }
      return Np.call(i, t) ? i[t] : void 0;
    }
    ps.exports = Gp;
  });
  var _s = G((hw, gs) => {
    var Fp = Vi(),
      qp = Object.prototype,
      Zp = qp.hasOwnProperty;
    function Up(t) {
      var i = this.__data__;
      return Fp ? i[t] !== void 0 : Zp.call(i, t);
    }
    gs.exports = Up;
  });
  var vs = G((uw, ys) => {
    var Vp = Vi(),
      Hp = '__lodash_hash_undefined__';
    function jp(t, i) {
      var n = this.__data__;
      return (
        (this.size += this.has(t) ? 0 : 1),
        (n[t] = Vp && i === void 0 ? Hp : i),
        this
      );
    }
    ys.exports = jp;
  });
  var bs = G((cw, Ls) => {
    var Kp = cs(),
      Wp = ds(),
      Yp = ms(),
      $p = _s(),
      Xp = vs();
    function di(t) {
      var i = -1,
        n = t == null ? 0 : t.length;
      for (this.clear(); ++i < n; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    di.prototype.clear = Kp;
    di.prototype.delete = Wp;
    di.prototype.get = Yp;
    di.prototype.has = $p;
    di.prototype.set = Xp;
    Ls.exports = di;
  });
  var ks = G((fw, xs) => {
    var ws = bs(),
      Jp = Zi(),
      Qp = vn();
    function tm() {
      (this.size = 0),
        (this.__data__ = {
          hash: new ws(),
          map: new (Qp || Jp)(),
          string: new ws(),
        });
    }
    xs.exports = tm;
  });
  var Cs = G((dw, Ms) => {
    function em(t) {
      var i = typeof t;
      return i == 'string' || i == 'number' || i == 'symbol' || i == 'boolean'
        ? t !== '__proto__'
        : t === null;
    }
    Ms.exports = em;
  });
  var Hi = G((pw, Ps) => {
    var im = Cs();
    function rm(t, i) {
      var n = t.__data__;
      return im(i) ? n[typeof i == 'string' ? 'string' : 'hash'] : n.map;
    }
    Ps.exports = rm;
  });
  var Ss = G((mw, Es) => {
    var nm = Hi();
    function om(t) {
      var i = nm(this, t).delete(t);
      return (this.size -= i ? 1 : 0), i;
    }
    Es.exports = om;
  });
  var Ds = G((gw, Ts) => {
    var am = Hi();
    function sm(t) {
      return am(this, t).get(t);
    }
    Ts.exports = sm;
  });
  var As = G((_w, Bs) => {
    var lm = Hi();
    function hm(t) {
      return lm(this, t).has(t);
    }
    Bs.exports = hm;
  });
  var Rs = G((yw, Os) => {
    var um = Hi();
    function cm(t, i) {
      var n = um(this, t),
        o = n.size;
      return n.set(t, i), (this.size += n.size == o ? 0 : 1), this;
    }
    Os.exports = cm;
  });
  var Ln = G((vw, Is) => {
    var fm = ks(),
      dm = Ss(),
      pm = Ds(),
      mm = As(),
      gm = Rs();
    function pi(t) {
      var i = -1,
        n = t == null ? 0 : t.length;
      for (this.clear(); ++i < n; ) {
        var o = t[i];
        this.set(o[0], o[1]);
      }
    }
    pi.prototype.clear = fm;
    pi.prototype.delete = dm;
    pi.prototype.get = pm;
    pi.prototype.has = mm;
    pi.prototype.set = gm;
    Is.exports = pi;
  });
  var Ns = G((Lw, zs) => {
    var _m = Zi(),
      ym = vn(),
      vm = Ln(),
      Lm = 200;
    function bm(t, i) {
      var n = this.__data__;
      if (n instanceof _m) {
        var o = n.__data__;
        if (!ym || o.length < Lm - 1)
          return o.push([t, i]), (this.size = ++n.size), this;
        n = this.__data__ = new vm(o);
      }
      return n.set(t, i), (this.size = n.size), this;
    }
    zs.exports = bm;
  });
  var Fs = G((bw, Gs) => {
    var wm = Zi(),
      xm = Ea(),
      km = Ta(),
      Mm = Ba(),
      Cm = Oa(),
      Pm = Ns();
    function mi(t) {
      var i = (this.__data__ = new wm(t));
      this.size = i.size;
    }
    mi.prototype.clear = xm;
    mi.prototype.delete = km;
    mi.prototype.get = Mm;
    mi.prototype.has = Cm;
    mi.prototype.set = Pm;
    Gs.exports = mi;
  });
  var bn = G((ww, qs) => {
    var Em = Sr(),
      Sm = (function () {
        try {
          var t = Em(Object, 'defineProperty');
          return t({}, '', {}), t;
        } catch {}
      })();
    qs.exports = Sm;
  });
  var Tr = G((xw, Us) => {
    var Zs = bn();
    function Tm(t, i, n) {
      i == '__proto__' && Zs
        ? Zs(t, i, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (t[i] = n);
    }
    Us.exports = Tm;
  });
  var wn = G((kw, Vs) => {
    var Dm = Tr(),
      Bm = Fi();
    function Am(t, i, n) {
      ((n !== void 0 && !Bm(t[i], n)) || (n === void 0 && !(i in t))) &&
        Dm(t, i, n);
    }
    Vs.exports = Am;
  });
  var js = G((Mw, Hs) => {
    function Om(t) {
      return function (i, n, o) {
        for (var s = -1, h = Object(i), c = o(i), f = c.length; f--; ) {
          var d = c[t ? f : ++s];
          if (n(h[d], d, h) === !1) break;
        }
        return i;
      };
    }
    Hs.exports = Om;
  });
  var Ws = G((Cw, Ks) => {
    var Rm = js(),
      Im = Rm();
    Ks.exports = Im;
  });
  var Qs = G((ji, gi) => {
    var zm = We(),
      Js = typeof ji == 'object' && ji && !ji.nodeType && ji,
      Ys = Js && typeof gi == 'object' && gi && !gi.nodeType && gi,
      Nm = Ys && Ys.exports === Js,
      $s = Nm ? zm.Buffer : void 0,
      Xs = $s ? $s.allocUnsafe : void 0;
    function Gm(t, i) {
      if (i) return t.slice();
      var n = t.length,
        o = Xs ? Xs(n) : new t.constructor(n);
      return t.copy(o), o;
    }
    gi.exports = Gm;
  });
  var el = G((Pw, tl) => {
    var Fm = We(),
      qm = Fm.Uint8Array;
    tl.exports = qm;
  });
  var nl = G((Ew, rl) => {
    var il = el();
    function Zm(t) {
      var i = new t.constructor(t.byteLength);
      return new il(i).set(new il(t)), i;
    }
    rl.exports = Zm;
  });
  var al = G((Sw, ol) => {
    var Um = nl();
    function Vm(t, i) {
      var n = i ? Um(t.buffer) : t.buffer;
      return new t.constructor(n, t.byteOffset, t.length);
    }
    ol.exports = Vm;
  });
  var ll = G((Tw, sl) => {
    function Hm(t, i) {
      var n = -1,
        o = t.length;
      for (i || (i = Array(o)); ++n < o; ) i[n] = t[n];
      return i;
    }
    sl.exports = Hm;
  });
  var cl = G((Dw, ul) => {
    var jm = De(),
      hl = Object.create,
      Km = (function () {
        function t() {}
        return function (i) {
          if (!jm(i)) return {};
          if (hl) return hl(i);
          t.prototype = i;
          var n = new t();
          return (t.prototype = void 0), n;
        };
      })();
    ul.exports = Km;
  });
  var dl = G((Bw, fl) => {
    function Wm(t, i) {
      return function (n) {
        return t(i(n));
      };
    }
    fl.exports = Wm;
  });
  var xn = G((Aw, pl) => {
    var Ym = dl(),
      $m = Ym(Object.getPrototypeOf, Object);
    pl.exports = $m;
  });
  var kn = G((Ow, ml) => {
    var Xm = Object.prototype;
    function Jm(t) {
      var i = t && t.constructor,
        n = (typeof i == 'function' && i.prototype) || Xm;
      return t === n;
    }
    ml.exports = Jm;
  });
  var _l = G((Rw, gl) => {
    var Qm = cl(),
      tg = xn(),
      eg = kn();
    function ig(t) {
      return typeof t.constructor == 'function' && !eg(t) ? Qm(tg(t)) : {};
    }
    gl.exports = ig;
  });
  var Ye = G((Iw, yl) => {
    function rg(t) {
      return t != null && typeof t == 'object';
    }
    yl.exports = rg;
  });
  var Ll = G((zw, vl) => {
    var ng = fi(),
      og = Ye(),
      ag = '[object Arguments]';
    function sg(t) {
      return og(t) && ng(t) == ag;
    }
    vl.exports = sg;
  });
  var Mn = G((Nw, xl) => {
    var bl = Ll(),
      lg = Ye(),
      wl = Object.prototype,
      hg = wl.hasOwnProperty,
      ug = wl.propertyIsEnumerable,
      cg = bl(
        (function () {
          return arguments;
        })()
      )
        ? bl
        : function (t) {
            return lg(t) && hg.call(t, 'callee') && !ug.call(t, 'callee');
          };
    xl.exports = cg;
  });
  var _i = G((Gw, kl) => {
    var fg = Array.isArray;
    kl.exports = fg;
  });
  var Cn = G((Fw, Ml) => {
    var dg = 9007199254740991;
    function pg(t) {
      return typeof t == 'number' && t > -1 && t % 1 == 0 && t <= dg;
    }
    Ml.exports = pg;
  });
  var Dr = G((qw, Cl) => {
    var mg = Er(),
      gg = Cn();
    function _g(t) {
      return t != null && gg(t.length) && !mg(t);
    }
    Cl.exports = _g;
  });
  var El = G((Zw, Pl) => {
    var yg = Dr(),
      vg = Ye();
    function Lg(t) {
      return vg(t) && yg(t);
    }
    Pl.exports = Lg;
  });
  var Tl = G((Uw, Sl) => {
    function bg() {
      return !1;
    }
    Sl.exports = bg;
  });
  var Pn = G((Ki, yi) => {
    var wg = We(),
      xg = Tl(),
      Al = typeof Ki == 'object' && Ki && !Ki.nodeType && Ki,
      Dl = Al && typeof yi == 'object' && yi && !yi.nodeType && yi,
      kg = Dl && Dl.exports === Al,
      Bl = kg ? wg.Buffer : void 0,
      Mg = Bl ? Bl.isBuffer : void 0,
      Cg = Mg || xg;
    yi.exports = Cg;
  });
  var Il = G((Vw, Rl) => {
    var Pg = fi(),
      Eg = xn(),
      Sg = Ye(),
      Tg = '[object Object]',
      Dg = Function.prototype,
      Bg = Object.prototype,
      Ol = Dg.toString,
      Ag = Bg.hasOwnProperty,
      Og = Ol.call(Object);
    function Rg(t) {
      if (!Sg(t) || Pg(t) != Tg) return !1;
      var i = Eg(t);
      if (i === null) return !0;
      var n = Ag.call(i, 'constructor') && i.constructor;
      return typeof n == 'function' && n instanceof n && Ol.call(n) == Og;
    }
    Rl.exports = Rg;
  });
  var Nl = G((Hw, zl) => {
    var Ig = fi(),
      zg = Cn(),
      Ng = Ye(),
      Gg = '[object Arguments]',
      Fg = '[object Array]',
      qg = '[object Boolean]',
      Zg = '[object Date]',
      Ug = '[object Error]',
      Vg = '[object Function]',
      Hg = '[object Map]',
      jg = '[object Number]',
      Kg = '[object Object]',
      Wg = '[object RegExp]',
      Yg = '[object Set]',
      $g = '[object String]',
      Xg = '[object WeakMap]',
      Jg = '[object ArrayBuffer]',
      Qg = '[object DataView]',
      t_ = '[object Float32Array]',
      e_ = '[object Float64Array]',
      i_ = '[object Int8Array]',
      r_ = '[object Int16Array]',
      n_ = '[object Int32Array]',
      o_ = '[object Uint8Array]',
      a_ = '[object Uint8ClampedArray]',
      s_ = '[object Uint16Array]',
      l_ = '[object Uint32Array]',
      St = {};
    St[t_] =
      St[e_] =
      St[i_] =
      St[r_] =
      St[n_] =
      St[o_] =
      St[a_] =
      St[s_] =
      St[l_] =
        !0;
    St[Gg] =
      St[Fg] =
      St[Jg] =
      St[qg] =
      St[Qg] =
      St[Zg] =
      St[Ug] =
      St[Vg] =
      St[Hg] =
      St[jg] =
      St[Kg] =
      St[Wg] =
      St[Yg] =
      St[$g] =
      St[Xg] =
        !1;
    function h_(t) {
      return Ng(t) && zg(t.length) && !!St[Ig(t)];
    }
    zl.exports = h_;
  });
  var Fl = G((jw, Gl) => {
    function u_(t) {
      return function (i) {
        return t(i);
      };
    }
    Gl.exports = u_;
  });
  var Zl = G((Wi, vi) => {
    var c_ = _n(),
      ql = typeof Wi == 'object' && Wi && !Wi.nodeType && Wi,
      Yi = ql && typeof vi == 'object' && vi && !vi.nodeType && vi,
      f_ = Yi && Yi.exports === ql,
      En = f_ && c_.process,
      d_ = (function () {
        try {
          var t = Yi && Yi.require && Yi.require('util').types;
          return t || (En && En.binding && En.binding('util'));
        } catch {}
      })();
    vi.exports = d_;
  });
  var Sn = G((Kw, Hl) => {
    var p_ = Nl(),
      m_ = Fl(),
      Ul = Zl(),
      Vl = Ul && Ul.isTypedArray,
      g_ = Vl ? m_(Vl) : p_;
    Hl.exports = g_;
  });
  var Tn = G((Ww, jl) => {
    function __(t, i) {
      if (
        !(i === 'constructor' && typeof t[i] == 'function') &&
        i != '__proto__'
      )
        return t[i];
    }
    jl.exports = __;
  });
  var Wl = G((Yw, Kl) => {
    var y_ = Tr(),
      v_ = Fi(),
      L_ = Object.prototype,
      b_ = L_.hasOwnProperty;
    function w_(t, i, n) {
      var o = t[i];
      (!(b_.call(t, i) && v_(o, n)) || (n === void 0 && !(i in t))) &&
        y_(t, i, n);
    }
    Kl.exports = w_;
  });
  var $l = G(($w, Yl) => {
    var x_ = Wl(),
      k_ = Tr();
    function M_(t, i, n, o) {
      var s = !n;
      n || (n = {});
      for (var h = -1, c = i.length; ++h < c; ) {
        var f = i[h],
          d = o ? o(n[f], t[f], f, n, t) : void 0;
        d === void 0 && (d = t[f]), s ? k_(n, f, d) : x_(n, f, d);
      }
      return n;
    }
    Yl.exports = M_;
  });
  var Jl = G((Xw, Xl) => {
    function C_(t, i) {
      for (var n = -1, o = Array(t); ++n < t; ) o[n] = i(n);
      return o;
    }
    Xl.exports = C_;
  });
  var Dn = G((Jw, Ql) => {
    var P_ = 9007199254740991,
      E_ = /^(?:0|[1-9]\d*)$/;
    function S_(t, i) {
      var n = typeof t;
      return (
        (i = i ?? P_),
        !!i &&
          (n == 'number' || (n != 'symbol' && E_.test(t))) &&
          t > -1 &&
          t % 1 == 0 &&
          t < i
      );
    }
    Ql.exports = S_;
  });
  var eh = G((Qw, th) => {
    var T_ = Jl(),
      D_ = Mn(),
      B_ = _i(),
      A_ = Pn(),
      O_ = Dn(),
      R_ = Sn(),
      I_ = Object.prototype,
      z_ = I_.hasOwnProperty;
    function N_(t, i) {
      var n = B_(t),
        o = !n && D_(t),
        s = !n && !o && A_(t),
        h = !n && !o && !s && R_(t),
        c = n || o || s || h,
        f = c ? T_(t.length, String) : [],
        d = f.length;
      for (var y in t)
        (i || z_.call(t, y)) &&
          !(
            c &&
            (y == 'length' ||
              (s && (y == 'offset' || y == 'parent')) ||
              (h &&
                (y == 'buffer' || y == 'byteLength' || y == 'byteOffset')) ||
              O_(y, d))
          ) &&
          f.push(y);
      return f;
    }
    th.exports = N_;
  });
  var rh = G((tx, ih) => {
    function G_(t) {
      var i = [];
      if (t != null) for (var n in Object(t)) i.push(n);
      return i;
    }
    ih.exports = G_;
  });
  var oh = G((ex, nh) => {
    var F_ = De(),
      q_ = kn(),
      Z_ = rh(),
      U_ = Object.prototype,
      V_ = U_.hasOwnProperty;
    function H_(t) {
      if (!F_(t)) return Z_(t);
      var i = q_(t),
        n = [];
      for (var o in t)
        (o == 'constructor' && (i || !V_.call(t, o))) || n.push(o);
      return n;
    }
    nh.exports = H_;
  });
  var Bn = G((ix, ah) => {
    var j_ = eh(),
      K_ = oh(),
      W_ = Dr();
    function Y_(t) {
      return W_(t) ? j_(t, !0) : K_(t);
    }
    ah.exports = Y_;
  });
  var lh = G((rx, sh) => {
    var $_ = $l(),
      X_ = Bn();
    function J_(t) {
      return $_(t, X_(t));
    }
    sh.exports = J_;
  });
  var ph = G((nx, dh) => {
    var hh = wn(),
      Q_ = Qs(),
      ty = al(),
      ey = ll(),
      iy = _l(),
      uh = Mn(),
      ch = _i(),
      ry = El(),
      ny = Pn(),
      oy = Er(),
      ay = De(),
      sy = Il(),
      ly = Sn(),
      fh = Tn(),
      hy = lh();
    function uy(t, i, n, o, s, h, c) {
      var f = fh(t, n),
        d = fh(i, n),
        y = c.get(d);
      if (y) {
        hh(t, n, y);
        return;
      }
      var w = h ? h(f, d, n + '', t, i, c) : void 0,
        P = w === void 0;
      if (P) {
        var R = ch(d),
          D = !R && ny(d),
          N = !R && !D && ly(d);
        (w = d),
          R || D || N
            ? ch(f)
              ? (w = f)
              : ry(f)
                ? (w = ey(f))
                : D
                  ? ((P = !1), (w = Q_(d, !0)))
                  : N
                    ? ((P = !1), (w = ty(d, !0)))
                    : (w = [])
            : sy(d) || uh(d)
              ? ((w = f),
                uh(f) ? (w = hy(f)) : (!ay(f) || oy(f)) && (w = iy(d)))
              : (P = !1);
      }
      P && (c.set(d, w), s(w, d, o, h, c), c.delete(d)), hh(t, n, w);
    }
    dh.exports = uy;
  });
  var _h = G((ox, gh) => {
    var cy = Fs(),
      fy = wn(),
      dy = Ws(),
      py = ph(),
      my = De(),
      gy = Bn(),
      _y = Tn();
    function mh(t, i, n, o, s) {
      t !== i &&
        dy(
          i,
          function (h, c) {
            if ((s || (s = new cy()), my(h))) py(t, i, c, n, mh, o, s);
            else {
              var f = o ? o(_y(t, c), h, c + '', t, i, s) : void 0;
              f === void 0 && (f = h), fy(t, c, f);
            }
          },
          gy
        );
    }
    gh.exports = mh;
  });
  var An = G((ax, yh) => {
    function yy(t) {
      return t;
    }
    yh.exports = yy;
  });
  var Lh = G((sx, vh) => {
    function vy(t, i, n) {
      switch (n.length) {
        case 0:
          return t.call(i);
        case 1:
          return t.call(i, n[0]);
        case 2:
          return t.call(i, n[0], n[1]);
        case 3:
          return t.call(i, n[0], n[1], n[2]);
      }
      return t.apply(i, n);
    }
    vh.exports = vy;
  });
  var xh = G((lx, wh) => {
    var Ly = Lh(),
      bh = Math.max;
    function by(t, i, n) {
      return (
        (i = bh(i === void 0 ? t.length - 1 : i, 0)),
        function () {
          for (
            var o = arguments, s = -1, h = bh(o.length - i, 0), c = Array(h);
            ++s < h;

          )
            c[s] = o[i + s];
          s = -1;
          for (var f = Array(i + 1); ++s < i; ) f[s] = o[s];
          return (f[i] = n(c)), Ly(t, this, f);
        }
      );
    }
    wh.exports = by;
  });
  var Mh = G((hx, kh) => {
    function wy(t) {
      return function () {
        return t;
      };
    }
    kh.exports = wy;
  });
  var Eh = G((ux, Ph) => {
    var xy = Mh(),
      Ch = bn(),
      ky = An(),
      My = Ch
        ? function (t, i) {
            return Ch(t, 'toString', {
              configurable: !0,
              enumerable: !1,
              value: xy(i),
              writable: !0,
            });
          }
        : ky;
    Ph.exports = My;
  });
  var Th = G((cx, Sh) => {
    var Cy = 800,
      Py = 16,
      Ey = Date.now;
    function Sy(t) {
      var i = 0,
        n = 0;
      return function () {
        var o = Ey(),
          s = Py - (o - n);
        if (((n = o), s > 0)) {
          if (++i >= Cy) return arguments[0];
        } else i = 0;
        return t.apply(void 0, arguments);
      };
    }
    Sh.exports = Sy;
  });
  var Bh = G((fx, Dh) => {
    var Ty = Eh(),
      Dy = Th(),
      By = Dy(Ty);
    Dh.exports = By;
  });
  var Oh = G((dx, Ah) => {
    var Ay = An(),
      Oy = xh(),
      Ry = Bh();
    function Iy(t, i) {
      return Ry(Oy(t, i, Ay), t + '');
    }
    Ah.exports = Iy;
  });
  var Ih = G((px, Rh) => {
    var zy = Fi(),
      Ny = Dr(),
      Gy = Dn(),
      Fy = De();
    function qy(t, i, n) {
      if (!Fy(n)) return !1;
      var o = typeof i;
      return (
        o == 'number' ? Ny(n) && Gy(i, n.length) : o == 'string' && i in n
      )
        ? zy(n[i], t)
        : !1;
    }
    Rh.exports = qy;
  });
  var Nh = G((mx, zh) => {
    var Zy = Oh(),
      Uy = Ih();
    function Vy(t) {
      return Zy(function (i, n) {
        var o = -1,
          s = n.length,
          h = s > 1 ? n[s - 1] : void 0,
          c = s > 2 ? n[2] : void 0;
        for (
          h = t.length > 3 && typeof h == 'function' ? (s--, h) : void 0,
            c && Uy(n[0], n[1], c) && ((h = s < 3 ? void 0 : h), (s = 1)),
            i = Object(i);
          ++o < s;

        ) {
          var f = n[o];
          f && t(i, f, o, h);
        }
        return i;
      });
    }
    zh.exports = Vy;
  });
  var Br = G((gx, Gh) => {
    var Hy = _h(),
      jy = Nh(),
      Ky = jy(function (t, i, n) {
        Hy(t, i, n);
      });
    Gh.exports = Ky;
  });
  var Ar = G((S0, bu) => {
    var Bv = fi(),
      Av = Ye(),
      Ov = '[object Symbol]';
    function Rv(t) {
      return typeof t == 'symbol' || (Av(t) && Bv(t) == Ov);
    }
    bu.exports = Rv;
  });
  var xu = G((T0, wu) => {
    var Iv = _i(),
      zv = Ar(),
      Nv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Gv = /^\w*$/;
    function Fv(t, i) {
      if (Iv(t)) return !1;
      var n = typeof t;
      return n == 'number' ||
        n == 'symbol' ||
        n == 'boolean' ||
        t == null ||
        zv(t)
        ? !0
        : Gv.test(t) || !Nv.test(t) || (i != null && t in Object(i));
    }
    wu.exports = Fv;
  });
  var Cu = G((D0, Mu) => {
    var ku = Ln(),
      qv = 'Expected a function';
    function Rn(t, i) {
      if (typeof t != 'function' || (i != null && typeof i != 'function'))
        throw new TypeError(qv);
      var n = function () {
        var o = arguments,
          s = i ? i.apply(this, o) : o[0],
          h = n.cache;
        if (h.has(s)) return h.get(s);
        var c = t.apply(this, o);
        return (n.cache = h.set(s, c) || h), c;
      };
      return (n.cache = new (Rn.Cache || ku)()), n;
    }
    Rn.Cache = ku;
    Mu.exports = Rn;
  });
  var Eu = G((B0, Pu) => {
    var Zv = Cu(),
      Uv = 500;
    function Vv(t) {
      var i = Zv(t, function (o) {
          return n.size === Uv && n.clear(), o;
        }),
        n = i.cache;
      return i;
    }
    Pu.exports = Vv;
  });
  var Tu = G((A0, Su) => {
    var Hv = Eu(),
      jv =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      Kv = /\\(\\)?/g,
      Wv = Hv(function (t) {
        var i = [];
        return (
          t.charCodeAt(0) === 46 && i.push(''),
          t.replace(jv, function (n, o, s, h) {
            i.push(s ? h.replace(Kv, '$1') : o || n);
          }),
          i
        );
      });
    Su.exports = Wv;
  });
  var Bu = G((O0, Du) => {
    function Yv(t, i) {
      for (var n = -1, o = t == null ? 0 : t.length, s = Array(o); ++n < o; )
        s[n] = i(t[n], n, t);
      return s;
    }
    Du.exports = Yv;
  });
  var Nu = G((R0, zu) => {
    var Au = Pr(),
      $v = Bu(),
      Xv = _i(),
      Jv = Ar(),
      Qv = 1 / 0,
      Ou = Au ? Au.prototype : void 0,
      Ru = Ou ? Ou.toString : void 0;
    function Iu(t) {
      if (typeof t == 'string') return t;
      if (Xv(t)) return $v(t, Iu) + '';
      if (Jv(t)) return Ru ? Ru.call(t) : '';
      var i = t + '';
      return i == '0' && 1 / t == -Qv ? '-0' : i;
    }
    zu.exports = Iu;
  });
  var Fu = G((I0, Gu) => {
    var tL = Nu();
    function eL(t) {
      return t == null ? '' : tL(t);
    }
    Gu.exports = eL;
  });
  var Zu = G((z0, qu) => {
    var iL = _i(),
      rL = xu(),
      nL = Tu(),
      oL = Fu();
    function aL(t, i) {
      return iL(t) ? t : rL(t, i) ? [t] : nL(oL(t));
    }
    qu.exports = aL;
  });
  var Vu = G((N0, Uu) => {
    var sL = Ar(),
      lL = 1 / 0;
    function hL(t) {
      if (typeof t == 'string' || sL(t)) return t;
      var i = t + '';
      return i == '0' && 1 / t == -lL ? '-0' : i;
    }
    Uu.exports = hL;
  });
  var ju = G((G0, Hu) => {
    var uL = Zu(),
      cL = Vu();
    function fL(t, i) {
      i = uL(i, t);
      for (var n = 0, o = i.length; t != null && n < o; ) t = t[cL(i[n++])];
      return n && n == o ? t : void 0;
    }
    Hu.exports = fL;
  });
  var $i = G((F0, Ku) => {
    var dL = ju();
    function pL(t, i, n) {
      var o = t == null ? void 0 : dL(t, i);
      return o === void 0 ? n : o;
    }
    Ku.exports = pL;
  });
  var Xu = G((rk, $u) => {
    function yL(t) {
      return t && t.length ? t[0] : void 0;
    }
    $u.exports = yL;
  });
  var ac = G((Zn, Un) => {
    (function (t, i) {
      typeof Zn == 'object' && typeof Un < 'u'
        ? (Un.exports = i())
        : typeof define == 'function' && define.amd
          ? define(i)
          : ((t = t || self).RBush = i());
    })(Zn, function () {
      'use strict';
      function t(k, C, I, Z, V) {
        (function j(H, E, tt, X, et) {
          for (; X > tt; ) {
            if (X - tt > 600) {
              var at = X - tt + 1,
                ht = E - tt + 1,
                qt = Math.log(at),
                kt = 0.5 * Math.exp((2 * qt) / 3),
                Dt =
                  0.5 *
                  Math.sqrt((qt * kt * (at - kt)) / at) *
                  (ht - at / 2 < 0 ? -1 : 1),
                it = Math.max(tt, Math.floor(E - (ht * kt) / at + Dt)),
                Yt = Math.min(X, Math.floor(E + ((at - ht) * kt) / at + Dt));
              j(H, E, it, Yt, et);
            }
            var Q = H[E],
              pt = tt,
              _t = X;
            for (i(H, tt, E), et(H[X], Q) > 0 && i(H, tt, X); pt < _t; ) {
              for (i(H, pt, _t), pt++, _t--; et(H[pt], Q) < 0; ) pt++;
              for (; et(H[_t], Q) > 0; ) _t--;
            }
            et(H[tt], Q) === 0 ? i(H, tt, _t) : i(H, ++_t, X),
              _t <= E && (tt = _t + 1),
              E <= _t && (X = _t - 1);
          }
        })(k, C, I || 0, Z || k.length - 1, V || n);
      }
      function i(k, C, I) {
        var Z = k[C];
        (k[C] = k[I]), (k[I] = Z);
      }
      function n(k, C) {
        return k < C ? -1 : k > C ? 1 : 0;
      }
      var o = function (k) {
        k === void 0 && (k = 9),
          (this._maxEntries = Math.max(4, k)),
          (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
          this.clear();
      };
      function s(k, C, I) {
        if (!I) return C.indexOf(k);
        for (var Z = 0; Z < C.length; Z++) if (I(k, C[Z])) return Z;
        return -1;
      }
      function h(k, C) {
        c(k, 0, k.children.length, C, k);
      }
      function c(k, C, I, Z, V) {
        V || (V = N(null)),
          (V.minX = 1 / 0),
          (V.minY = 1 / 0),
          (V.maxX = -1 / 0),
          (V.maxY = -1 / 0);
        for (var j = C; j < I; j++) {
          var H = k.children[j];
          f(V, k.leaf ? Z(H) : H);
        }
        return V;
      }
      function f(k, C) {
        return (
          (k.minX = Math.min(k.minX, C.minX)),
          (k.minY = Math.min(k.minY, C.minY)),
          (k.maxX = Math.max(k.maxX, C.maxX)),
          (k.maxY = Math.max(k.maxY, C.maxY)),
          k
        );
      }
      function d(k, C) {
        return k.minX - C.minX;
      }
      function y(k, C) {
        return k.minY - C.minY;
      }
      function w(k) {
        return (k.maxX - k.minX) * (k.maxY - k.minY);
      }
      function P(k) {
        return k.maxX - k.minX + (k.maxY - k.minY);
      }
      function R(k, C) {
        return (
          k.minX <= C.minX &&
          k.minY <= C.minY &&
          C.maxX <= k.maxX &&
          C.maxY <= k.maxY
        );
      }
      function D(k, C) {
        return (
          C.minX <= k.maxX &&
          C.minY <= k.maxY &&
          C.maxX >= k.minX &&
          C.maxY >= k.minY
        );
      }
      function N(k) {
        return {
          children: k,
          height: 1,
          leaf: !0,
          minX: 1 / 0,
          minY: 1 / 0,
          maxX: -1 / 0,
          maxY: -1 / 0,
        };
      }
      function Y(k, C, I, Z, V) {
        for (var j = [C, I]; j.length; )
          if (!((I = j.pop()) - (C = j.pop()) <= Z)) {
            var H = C + Math.ceil((I - C) / Z / 2) * Z;
            t(k, H, C, I, V), j.push(C, H, H, I);
          }
      }
      return (
        (o.prototype.all = function () {
          return this._all(this.data, []);
        }),
        (o.prototype.search = function (k) {
          var C = this.data,
            I = [];
          if (!D(k, C)) return I;
          for (var Z = this.toBBox, V = []; C; ) {
            for (var j = 0; j < C.children.length; j++) {
              var H = C.children[j],
                E = C.leaf ? Z(H) : H;
              D(k, E) &&
                (C.leaf ? I.push(H) : R(k, E) ? this._all(H, I) : V.push(H));
            }
            C = V.pop();
          }
          return I;
        }),
        (o.prototype.collides = function (k) {
          var C = this.data;
          if (!D(k, C)) return !1;
          for (var I = []; C; ) {
            for (var Z = 0; Z < C.children.length; Z++) {
              var V = C.children[Z],
                j = C.leaf ? this.toBBox(V) : V;
              if (D(k, j)) {
                if (C.leaf || R(k, j)) return !0;
                I.push(V);
              }
            }
            C = I.pop();
          }
          return !1;
        }),
        (o.prototype.load = function (k) {
          if (!k || !k.length) return this;
          if (k.length < this._minEntries) {
            for (var C = 0; C < k.length; C++) this.insert(k[C]);
            return this;
          }
          var I = this._build(k.slice(), 0, k.length - 1, 0);
          if (this.data.children.length)
            if (this.data.height === I.height) this._splitRoot(this.data, I);
            else {
              if (this.data.height < I.height) {
                var Z = this.data;
                (this.data = I), (I = Z);
              }
              this._insert(I, this.data.height - I.height - 1, !0);
            }
          else this.data = I;
          return this;
        }),
        (o.prototype.insert = function (k) {
          return k && this._insert(k, this.data.height - 1), this;
        }),
        (o.prototype.clear = function () {
          return (this.data = N([])), this;
        }),
        (o.prototype.remove = function (k, C) {
          if (!k) return this;
          for (
            var I, Z, V, j = this.data, H = this.toBBox(k), E = [], tt = [];
            j || E.length;

          ) {
            if (
              (j ||
                ((j = E.pop()),
                (Z = E[E.length - 1]),
                (I = tt.pop()),
                (V = !0)),
              j.leaf)
            ) {
              var X = s(k, j.children, C);
              if (X !== -1)
                return (
                  j.children.splice(X, 1), E.push(j), this._condense(E), this
                );
            }
            V || j.leaf || !R(j, H)
              ? Z
                ? (I++, (j = Z.children[I]), (V = !1))
                : (j = null)
              : (E.push(j), tt.push(I), (I = 0), (Z = j), (j = j.children[0]));
          }
          return this;
        }),
        (o.prototype.toBBox = function (k) {
          return k;
        }),
        (o.prototype.compareMinX = function (k, C) {
          return k.minX - C.minX;
        }),
        (o.prototype.compareMinY = function (k, C) {
          return k.minY - C.minY;
        }),
        (o.prototype.toJSON = function () {
          return this.data;
        }),
        (o.prototype.fromJSON = function (k) {
          return (this.data = k), this;
        }),
        (o.prototype._all = function (k, C) {
          for (var I = []; k; )
            k.leaf ? C.push.apply(C, k.children) : I.push.apply(I, k.children),
              (k = I.pop());
          return C;
        }),
        (o.prototype._build = function (k, C, I, Z) {
          var V,
            j = I - C + 1,
            H = this._maxEntries;
          if (j <= H) return h((V = N(k.slice(C, I + 1))), this.toBBox), V;
          Z ||
            ((Z = Math.ceil(Math.log(j) / Math.log(H))),
            (H = Math.ceil(j / Math.pow(H, Z - 1)))),
            ((V = N([])).leaf = !1),
            (V.height = Z);
          var E = Math.ceil(j / H),
            tt = E * Math.ceil(Math.sqrt(H));
          Y(k, C, I, tt, this.compareMinX);
          for (var X = C; X <= I; X += tt) {
            var et = Math.min(X + tt - 1, I);
            Y(k, X, et, E, this.compareMinY);
            for (var at = X; at <= et; at += E) {
              var ht = Math.min(at + E - 1, et);
              V.children.push(this._build(k, at, ht, Z - 1));
            }
          }
          return h(V, this.toBBox), V;
        }),
        (o.prototype._chooseSubtree = function (k, C, I, Z) {
          for (; Z.push(C), !C.leaf && Z.length - 1 !== I; ) {
            for (
              var V = 1 / 0, j = 1 / 0, H = void 0, E = 0;
              E < C.children.length;
              E++
            ) {
              var tt = C.children[E],
                X = w(tt),
                et =
                  ((at = k),
                  (ht = tt),
                  (Math.max(ht.maxX, at.maxX) - Math.min(ht.minX, at.minX)) *
                    (Math.max(ht.maxY, at.maxY) - Math.min(ht.minY, at.minY)) -
                    X);
              et < j
                ? ((j = et), (V = X < V ? X : V), (H = tt))
                : et === j && X < V && ((V = X), (H = tt));
            }
            C = H || C.children[0];
          }
          var at, ht;
          return C;
        }),
        (o.prototype._insert = function (k, C, I) {
          var Z = I ? k : this.toBBox(k),
            V = [],
            j = this._chooseSubtree(Z, this.data, C, V);
          for (
            j.children.push(k), f(j, Z);
            C >= 0 && V[C].children.length > this._maxEntries;

          )
            this._split(V, C), C--;
          this._adjustParentBBoxes(Z, V, C);
        }),
        (o.prototype._split = function (k, C) {
          var I = k[C],
            Z = I.children.length,
            V = this._minEntries;
          this._chooseSplitAxis(I, V, Z);
          var j = this._chooseSplitIndex(I, V, Z),
            H = N(I.children.splice(j, I.children.length - j));
          (H.height = I.height),
            (H.leaf = I.leaf),
            h(I, this.toBBox),
            h(H, this.toBBox),
            C ? k[C - 1].children.push(H) : this._splitRoot(I, H);
        }),
        (o.prototype._splitRoot = function (k, C) {
          (this.data = N([k, C])),
            (this.data.height = k.height + 1),
            (this.data.leaf = !1),
            h(this.data, this.toBBox);
        }),
        (o.prototype._chooseSplitIndex = function (k, C, I) {
          for (
            var Z, V, j, H, E, tt, X, et = 1 / 0, at = 1 / 0, ht = C;
            ht <= I - C;
            ht++
          ) {
            var qt = c(k, 0, ht, this.toBBox),
              kt = c(k, ht, I, this.toBBox),
              Dt =
                ((V = qt),
                (j = kt),
                (H = void 0),
                (E = void 0),
                (tt = void 0),
                (X = void 0),
                (H = Math.max(V.minX, j.minX)),
                (E = Math.max(V.minY, j.minY)),
                (tt = Math.min(V.maxX, j.maxX)),
                (X = Math.min(V.maxY, j.maxY)),
                Math.max(0, tt - H) * Math.max(0, X - E)),
              it = w(qt) + w(kt);
            Dt < et
              ? ((et = Dt), (Z = ht), (at = it < at ? it : at))
              : Dt === et && it < at && ((at = it), (Z = ht));
          }
          return Z || I - C;
        }),
        (o.prototype._chooseSplitAxis = function (k, C, I) {
          var Z = k.leaf ? this.compareMinX : d,
            V = k.leaf ? this.compareMinY : y;
          this._allDistMargin(k, C, I, Z) < this._allDistMargin(k, C, I, V) &&
            k.children.sort(Z);
        }),
        (o.prototype._allDistMargin = function (k, C, I, Z) {
          k.children.sort(Z);
          for (
            var V = this.toBBox,
              j = c(k, 0, C, V),
              H = c(k, I - C, I, V),
              E = P(j) + P(H),
              tt = C;
            tt < I - C;
            tt++
          ) {
            var X = k.children[tt];
            f(j, k.leaf ? V(X) : X), (E += P(j));
          }
          for (var et = I - C - 1; et >= C; et--) {
            var at = k.children[et];
            f(H, k.leaf ? V(at) : at), (E += P(H));
          }
          return E;
        }),
        (o.prototype._adjustParentBBoxes = function (k, C, I) {
          for (var Z = I; Z >= 0; Z--) f(C[Z], k);
        }),
        (o.prototype._condense = function (k) {
          for (var C = k.length - 1, I = void 0; C >= 0; C--)
            k[C].children.length === 0
              ? C > 0
                ? (I = k[C - 1].children).splice(I.indexOf(k[C]), 1)
                : this.clear()
              : h(k[C], this.toBBox);
        }),
        o
      );
    });
  });
  var Wn = G((st) => {
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
    function Re(t, i, n) {
      n === void 0 && (n = {});
      var o = { type: 'Feature' };
      return (
        (n.id === 0 || n.id) && (o.id = n.id),
        n.bbox && (o.bbox = n.bbox),
        (o.properties = i || {}),
        (o.geometry = t),
        o
      );
    }
    st.feature = Re;
    function SL(t, i, n) {
      switch ((n === void 0 && (n = {}), t)) {
        case 'Point':
          return Vn(i).geometry;
        case 'LineString':
          return jn(i).geometry;
        case 'Polygon':
          return Hn(i).geometry;
        case 'MultiPoint':
          return lc(i).geometry;
        case 'MultiLineString':
          return sc(i).geometry;
        case 'MultiPolygon':
          return hc(i).geometry;
        default:
          throw new Error(t + ' is invalid');
      }
    }
    st.geometry = SL;
    function Vn(t, i, n) {
      if ((n === void 0 && (n = {}), !t))
        throw new Error('coordinates is required');
      if (!Array.isArray(t)) throw new Error('coordinates must be an Array');
      if (t.length < 2)
        throw new Error('coordinates must be at least 2 numbers long');
      if (!Rr(t[0]) || !Rr(t[1]))
        throw new Error('coordinates must contain numbers');
      var o = { type: 'Point', coordinates: t };
      return Re(o, i, n);
    }
    st.point = Vn;
    function TL(t, i, n) {
      return (
        n === void 0 && (n = {}),
        Ir(
          t.map(function (o) {
            return Vn(o, i);
          }),
          n
        )
      );
    }
    st.points = TL;
    function Hn(t, i, n) {
      n === void 0 && (n = {});
      for (var o = 0, s = t; o < s.length; o++) {
        var h = s[o];
        if (h.length < 4)
          throw new Error(
            'Each LinearRing of a Polygon must have 4 or more Positions.'
          );
        for (var c = 0; c < h[h.length - 1].length; c++)
          if (h[h.length - 1][c] !== h[0][c])
            throw new Error('First and last Position are not equivalent.');
      }
      var f = { type: 'Polygon', coordinates: t };
      return Re(f, i, n);
    }
    st.polygon = Hn;
    function DL(t, i, n) {
      return (
        n === void 0 && (n = {}),
        Ir(
          t.map(function (o) {
            return Hn(o, i);
          }),
          n
        )
      );
    }
    st.polygons = DL;
    function jn(t, i, n) {
      if ((n === void 0 && (n = {}), t.length < 2))
        throw new Error(
          'coordinates must be an array of two or more positions'
        );
      var o = { type: 'LineString', coordinates: t };
      return Re(o, i, n);
    }
    st.lineString = jn;
    function BL(t, i, n) {
      return (
        n === void 0 && (n = {}),
        Ir(
          t.map(function (o) {
            return jn(o, i);
          }),
          n
        )
      );
    }
    st.lineStrings = BL;
    function Ir(t, i) {
      i === void 0 && (i = {});
      var n = { type: 'FeatureCollection' };
      return (
        i.id && (n.id = i.id), i.bbox && (n.bbox = i.bbox), (n.features = t), n
      );
    }
    st.featureCollection = Ir;
    function sc(t, i, n) {
      n === void 0 && (n = {});
      var o = { type: 'MultiLineString', coordinates: t };
      return Re(o, i, n);
    }
    st.multiLineString = sc;
    function lc(t, i, n) {
      n === void 0 && (n = {});
      var o = { type: 'MultiPoint', coordinates: t };
      return Re(o, i, n);
    }
    st.multiPoint = lc;
    function hc(t, i, n) {
      n === void 0 && (n = {});
      var o = { type: 'MultiPolygon', coordinates: t };
      return Re(o, i, n);
    }
    st.multiPolygon = hc;
    function AL(t, i, n) {
      n === void 0 && (n = {});
      var o = { type: 'GeometryCollection', geometries: t };
      return Re(o, i, n);
    }
    st.geometryCollection = AL;
    function OL(t, i) {
      if ((i === void 0 && (i = 0), i && !(i >= 0)))
        throw new Error('precision must be a positive number');
      var n = Math.pow(10, i || 0);
      return Math.round(t * n) / n;
    }
    st.round = OL;
    function uc(t, i) {
      i === void 0 && (i = 'kilometers');
      var n = st.factors[i];
      if (!n) throw new Error(i + ' units is invalid');
      return t * n;
    }
    st.radiansToLength = uc;
    function Kn(t, i) {
      i === void 0 && (i = 'kilometers');
      var n = st.factors[i];
      if (!n) throw new Error(i + ' units is invalid');
      return t / n;
    }
    st.lengthToRadians = Kn;
    function RL(t, i) {
      return cc(Kn(t, i));
    }
    st.lengthToDegrees = RL;
    function IL(t) {
      var i = t % 360;
      return i < 0 && (i += 360), i;
    }
    st.bearingToAzimuth = IL;
    function cc(t) {
      var i = t % (2 * Math.PI);
      return (i * 180) / Math.PI;
    }
    st.radiansToDegrees = cc;
    function zL(t) {
      var i = t % 360;
      return (i * Math.PI) / 180;
    }
    st.degreesToRadians = zL;
    function NL(t, i, n) {
      if (
        (i === void 0 && (i = 'kilometers'),
        n === void 0 && (n = 'kilometers'),
        !(t >= 0))
      )
        throw new Error('length must be a positive number');
      return uc(Kn(t, i), n);
    }
    st.convertLength = NL;
    function GL(t, i, n) {
      if (
        (i === void 0 && (i = 'meters'),
        n === void 0 && (n = 'kilometers'),
        !(t >= 0))
      )
        throw new Error('area must be a positive number');
      var o = st.areaFactors[i];
      if (!o) throw new Error('invalid original units');
      var s = st.areaFactors[n];
      if (!s) throw new Error('invalid final units');
      return (t / o) * s;
    }
    st.convertArea = GL;
    function Rr(t) {
      return !isNaN(t) && t !== null && !Array.isArray(t);
    }
    st.isNumber = Rr;
    function FL(t) {
      return !!t && t.constructor === Object;
    }
    st.isObject = FL;
    function qL(t) {
      if (!t) throw new Error('bbox is required');
      if (!Array.isArray(t)) throw new Error('bbox must be an Array');
      if (t.length !== 4 && t.length !== 6)
        throw new Error('bbox must be an Array of 4 or 6 numbers');
      t.forEach(function (i) {
        if (!Rr(i)) throw new Error('bbox must only contain numbers');
      });
    }
    st.validateBBox = qL;
    function ZL(t) {
      if (!t) throw new Error('id is required');
      if (['string', 'number'].indexOf(typeof t) === -1)
        throw new Error('id must be a number or a string');
    }
    st.validateId = ZL;
  });
  var $n = G((zt) => {
    'use strict';
    Object.defineProperty(zt, '__esModule', { value: !0 });
    var Vt = Wn();
    function rr(t, i, n) {
      if (t !== null)
        for (
          var o,
            s,
            h,
            c,
            f,
            d,
            y,
            w = 0,
            P = 0,
            R,
            D = t.type,
            N = D === 'FeatureCollection',
            Y = D === 'Feature',
            k = N ? t.features.length : 1,
            C = 0;
          C < k;
          C++
        ) {
          (y = N ? t.features[C].geometry : Y ? t.geometry : t),
            (R = y ? y.type === 'GeometryCollection' : !1),
            (f = R ? y.geometries.length : 1);
          for (var I = 0; I < f; I++) {
            var Z = 0,
              V = 0;
            if (((c = R ? y.geometries[I] : y), c !== null)) {
              d = c.coordinates;
              var j = c.type;
              switch (
                ((w = n && (j === 'Polygon' || j === 'MultiPolygon') ? 1 : 0),
                j)
              ) {
                case null:
                  break;
                case 'Point':
                  if (i(d, P, C, Z, V) === !1) return !1;
                  P++, Z++;
                  break;
                case 'LineString':
                case 'MultiPoint':
                  for (o = 0; o < d.length; o++) {
                    if (i(d[o], P, C, Z, V) === !1) return !1;
                    P++, j === 'MultiPoint' && Z++;
                  }
                  j === 'LineString' && Z++;
                  break;
                case 'Polygon':
                case 'MultiLineString':
                  for (o = 0; o < d.length; o++) {
                    for (s = 0; s < d[o].length - w; s++) {
                      if (i(d[o][s], P, C, Z, V) === !1) return !1;
                      P++;
                    }
                    j === 'MultiLineString' && Z++, j === 'Polygon' && V++;
                  }
                  j === 'Polygon' && Z++;
                  break;
                case 'MultiPolygon':
                  for (o = 0; o < d.length; o++) {
                    for (V = 0, s = 0; s < d[o].length; s++) {
                      for (h = 0; h < d[o][s].length - w; h++) {
                        if (i(d[o][s][h], P, C, Z, V) === !1) return !1;
                        P++;
                      }
                      V++;
                    }
                    Z++;
                  }
                  break;
                case 'GeometryCollection':
                  for (o = 0; o < c.geometries.length; o++)
                    if (rr(c.geometries[o], i, n) === !1) return !1;
                  break;
                default:
                  throw new Error('Unknown Geometry Type');
              }
            }
          }
        }
    }
    function UL(t, i, n, o) {
      var s = n;
      return (
        rr(
          t,
          function (h, c, f, d, y) {
            c === 0 && n === void 0 ? (s = h) : (s = i(s, h, c, f, d, y));
          },
          o
        ),
        s
      );
    }
    function fc(t, i) {
      var n;
      switch (t.type) {
        case 'FeatureCollection':
          for (
            n = 0;
            n < t.features.length && i(t.features[n].properties, n) !== !1;
            n++
          );
          break;
        case 'Feature':
          i(t.properties, 0);
          break;
      }
    }
    function VL(t, i, n) {
      var o = n;
      return (
        fc(t, function (s, h) {
          h === 0 && n === void 0 ? (o = s) : (o = i(o, s, h));
        }),
        o
      );
    }
    function dc(t, i) {
      if (t.type === 'Feature') i(t, 0);
      else if (t.type === 'FeatureCollection')
        for (
          var n = 0;
          n < t.features.length && i(t.features[n], n) !== !1;
          n++
        );
    }
    function HL(t, i, n) {
      var o = n;
      return (
        dc(t, function (s, h) {
          h === 0 && n === void 0 ? (o = s) : (o = i(o, s, h));
        }),
        o
      );
    }
    function jL(t) {
      var i = [];
      return (
        rr(t, function (n) {
          i.push(n);
        }),
        i
      );
    }
    function Yn(t, i) {
      var n,
        o,
        s,
        h,
        c,
        f,
        d,
        y,
        w,
        P,
        R = 0,
        D = t.type === 'FeatureCollection',
        N = t.type === 'Feature',
        Y = D ? t.features.length : 1;
      for (n = 0; n < Y; n++) {
        for (
          f = D ? t.features[n].geometry : N ? t.geometry : t,
            y = D ? t.features[n].properties : N ? t.properties : {},
            w = D ? t.features[n].bbox : N ? t.bbox : void 0,
            P = D ? t.features[n].id : N ? t.id : void 0,
            d = f ? f.type === 'GeometryCollection' : !1,
            c = d ? f.geometries.length : 1,
            s = 0;
          s < c;
          s++
        ) {
          if (((h = d ? f.geometries[s] : f), h === null)) {
            if (i(null, R, y, w, P) === !1) return !1;
            continue;
          }
          switch (h.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
              if (i(h, R, y, w, P) === !1) return !1;
              break;
            }
            case 'GeometryCollection': {
              for (o = 0; o < h.geometries.length; o++)
                if (i(h.geometries[o], R, y, w, P) === !1) return !1;
              break;
            }
            default:
              throw new Error('Unknown Geometry Type');
          }
        }
        R++;
      }
    }
    function KL(t, i, n) {
      var o = n;
      return (
        Yn(t, function (s, h, c, f, d) {
          h === 0 && n === void 0 ? (o = s) : (o = i(o, s, h, c, f, d));
        }),
        o
      );
    }
    function zr(t, i) {
      Yn(t, function (n, o, s, h, c) {
        var f = n === null ? null : n.type;
        switch (f) {
          case null:
          case 'Point':
          case 'LineString':
          case 'Polygon':
            return i(Vt.feature(n, s, { bbox: h, id: c }), o, 0) === !1
              ? !1
              : void 0;
        }
        var d;
        switch (f) {
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
        for (var y = 0; y < n.coordinates.length; y++) {
          var w = n.coordinates[y],
            P = { type: d, coordinates: w };
          if (i(Vt.feature(P, s), o, y) === !1) return !1;
        }
      });
    }
    function WL(t, i, n) {
      var o = n;
      return (
        zr(t, function (s, h, c) {
          h === 0 && c === 0 && n === void 0 ? (o = s) : (o = i(o, s, h, c));
        }),
        o
      );
    }
    function pc(t, i) {
      zr(t, function (n, o, s) {
        var h = 0;
        if (n.geometry) {
          var c = n.geometry.type;
          if (!(c === 'Point' || c === 'MultiPoint')) {
            var f,
              d = 0,
              y = 0,
              w = 0;
            if (
              rr(n, function (P, R, D, N, Y) {
                if (f === void 0 || o > d || N > y || Y > w) {
                  (f = P), (d = o), (y = N), (w = Y), (h = 0);
                  return;
                }
                var k = Vt.lineString([f, P], n.properties);
                if (i(k, o, s, Y, h) === !1) return !1;
                h++, (f = P);
              }) === !1
            )
              return !1;
          }
        }
      });
    }
    function YL(t, i, n) {
      var o = n,
        s = !1;
      return (
        pc(t, function (h, c, f, d, y) {
          s === !1 && n === void 0 ? (o = h) : (o = i(o, h, c, f, d, y)),
            (s = !0);
        }),
        o
      );
    }
    function mc(t, i) {
      if (!t) throw new Error('geojson is required');
      zr(t, function (n, o, s) {
        if (n.geometry !== null) {
          var h = n.geometry.type,
            c = n.geometry.coordinates;
          switch (h) {
            case 'LineString':
              if (i(n, o, s, 0, 0) === !1) return !1;
              break;
            case 'Polygon':
              for (var f = 0; f < c.length; f++)
                if (i(Vt.lineString(c[f], n.properties), o, s, f) === !1)
                  return !1;
              break;
          }
        }
      });
    }
    function $L(t, i, n) {
      var o = n;
      return (
        mc(t, function (s, h, c, f) {
          h === 0 && n === void 0 ? (o = s) : (o = i(o, s, h, c, f));
        }),
        o
      );
    }
    function XL(t, i) {
      if (((i = i || {}), !Vt.isObject(i)))
        throw new Error('options is invalid');
      var n = i.featureIndex || 0,
        o = i.multiFeatureIndex || 0,
        s = i.geometryIndex || 0,
        h = i.segmentIndex || 0,
        c = i.properties,
        f;
      switch (t.type) {
        case 'FeatureCollection':
          n < 0 && (n = t.features.length + n),
            (c = c || t.features[n].properties),
            (f = t.features[n].geometry);
          break;
        case 'Feature':
          (c = c || t.properties), (f = t.geometry);
          break;
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon':
          f = t;
          break;
        default:
          throw new Error('geojson is invalid');
      }
      if (f === null) return null;
      var d = f.coordinates;
      switch (f.type) {
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
          return (
            h < 0 && (h = d.length + h - 1),
            Vt.lineString([d[h], d[h + 1]], c, i)
          );
        case 'Polygon':
          return (
            s < 0 && (s = d.length + s),
            h < 0 && (h = d[s].length + h - 1),
            Vt.lineString([d[s][h], d[s][h + 1]], c, i)
          );
        case 'MultiLineString':
          return (
            o < 0 && (o = d.length + o),
            h < 0 && (h = d[o].length + h - 1),
            Vt.lineString([d[o][h], d[o][h + 1]], c, i)
          );
        case 'MultiPolygon':
          return (
            o < 0 && (o = d.length + o),
            s < 0 && (s = d[o].length + s),
            h < 0 && (h = d[o][s].length - h - 1),
            Vt.lineString([d[o][s][h], d[o][s][h + 1]], c, i)
          );
      }
      throw new Error('geojson is invalid');
    }
    function JL(t, i) {
      if (((i = i || {}), !Vt.isObject(i)))
        throw new Error('options is invalid');
      var n = i.featureIndex || 0,
        o = i.multiFeatureIndex || 0,
        s = i.geometryIndex || 0,
        h = i.coordIndex || 0,
        c = i.properties,
        f;
      switch (t.type) {
        case 'FeatureCollection':
          n < 0 && (n = t.features.length + n),
            (c = c || t.features[n].properties),
            (f = t.features[n].geometry);
          break;
        case 'Feature':
          (c = c || t.properties), (f = t.geometry);
          break;
        case 'Point':
        case 'MultiPoint':
          return null;
        case 'LineString':
        case 'Polygon':
        case 'MultiLineString':
        case 'MultiPolygon':
          f = t;
          break;
        default:
          throw new Error('geojson is invalid');
      }
      if (f === null) return null;
      var d = f.coordinates;
      switch (f.type) {
        case 'Point':
          return Vt.point(d, c, i);
        case 'MultiPoint':
          return o < 0 && (o = d.length + o), Vt.point(d[o], c, i);
        case 'LineString':
          return h < 0 && (h = d.length + h), Vt.point(d[h], c, i);
        case 'Polygon':
          return (
            s < 0 && (s = d.length + s),
            h < 0 && (h = d[s].length + h),
            Vt.point(d[s][h], c, i)
          );
        case 'MultiLineString':
          return (
            o < 0 && (o = d.length + o),
            h < 0 && (h = d[o].length + h),
            Vt.point(d[o][h], c, i)
          );
        case 'MultiPolygon':
          return (
            o < 0 && (o = d.length + o),
            s < 0 && (s = d[o].length + s),
            h < 0 && (h = d[o][s].length - h),
            Vt.point(d[o][s][h], c, i)
          );
      }
      throw new Error('geojson is invalid');
    }
    zt.coordAll = jL;
    zt.coordEach = rr;
    zt.coordReduce = UL;
    zt.featureEach = dc;
    zt.featureReduce = HL;
    zt.findPoint = JL;
    zt.findSegment = XL;
    zt.flattenEach = zr;
    zt.flattenReduce = WL;
    zt.geomEach = Yn;
    zt.geomReduce = KL;
    zt.lineEach = mc;
    zt.lineReduce = $L;
    zt.propEach = fc;
    zt.propReduce = VL;
    zt.segmentEach = pc;
    zt.segmentReduce = YL;
  });
  var gc = G((Jn) => {
    'use strict';
    Object.defineProperty(Jn, '__esModule', { value: !0 });
    var QL = $n();
    function Xn(t) {
      var i = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
      return (
        QL.coordEach(t, function (n) {
          i[0] > n[0] && (i[0] = n[0]),
            i[1] > n[1] && (i[1] = n[1]),
            i[2] < n[0] && (i[2] = n[0]),
            i[3] < n[1] && (i[3] = n[1]);
        }),
        i
      );
    }
    Xn.default = Xn;
    Jn.default = Xn;
  });
  var to = G(($k, Qn) => {
    var pe = ac(),
      yc = Wn(),
      vc = $n(),
      xi = gc().default,
      tb = vc.featureEach,
      Wk = vc.coordEach,
      Yk = yc.polygon,
      _c = yc.featureCollection;
    function Lc(t) {
      var i = new pe(t);
      return (
        (i.insert = function (n) {
          if (n.type !== 'Feature') throw new Error('invalid feature');
          return (
            (n.bbox = n.bbox ? n.bbox : xi(n)),
            pe.prototype.insert.call(this, n)
          );
        }),
        (i.load = function (n) {
          var o = [];
          return (
            Array.isArray(n)
              ? n.forEach(function (s) {
                  if (s.type !== 'Feature') throw new Error('invalid features');
                  (s.bbox = s.bbox ? s.bbox : xi(s)), o.push(s);
                })
              : tb(n, function (s) {
                  if (s.type !== 'Feature') throw new Error('invalid features');
                  (s.bbox = s.bbox ? s.bbox : xi(s)), o.push(s);
                }),
            pe.prototype.load.call(this, o)
          );
        }),
        (i.remove = function (n, o) {
          if (n.type !== 'Feature') throw new Error('invalid feature');
          return (
            (n.bbox = n.bbox ? n.bbox : xi(n)),
            pe.prototype.remove.call(this, n, o)
          );
        }),
        (i.clear = function () {
          return pe.prototype.clear.call(this);
        }),
        (i.search = function (n) {
          var o = pe.prototype.search.call(this, this.toBBox(n));
          return _c(o);
        }),
        (i.collides = function (n) {
          return pe.prototype.collides.call(this, this.toBBox(n));
        }),
        (i.all = function () {
          var n = pe.prototype.all.call(this);
          return _c(n);
        }),
        (i.toJSON = function () {
          return pe.prototype.toJSON.call(this);
        }),
        (i.fromJSON = function (n) {
          return pe.prototype.fromJSON.call(this, n);
        }),
        (i.toBBox = function (n) {
          var o;
          if (n.bbox) o = n.bbox;
          else if (Array.isArray(n) && n.length === 4) o = n;
          else if (Array.isArray(n) && n.length === 6)
            o = [n[0], n[1], n[3], n[4]];
          else if (n.type === 'Feature') o = xi(n);
          else if (n.type === 'FeatureCollection') o = xi(n);
          else throw new Error('invalid geojson');
          return { minX: o[0], minY: o[1], maxX: o[2], maxY: o[3] };
        }),
        i
      );
    }
    Qn.exports = Lc;
    Qn.exports.default = Lc;
  });
  var Dc = G((so, lo) => {
    (function (t, i) {
      typeof so == 'object' && typeof lo < 'u'
        ? (lo.exports = i())
        : typeof define == 'function' && define.amd
          ? define(i)
          : ((t = typeof globalThis < 'u' ? globalThis : t || self),
            (t.polygonClipping = i()));
    })(so, function () {
      'use strict';
      function t(S, g) {
        if (!(S instanceof g))
          throw new TypeError('Cannot call a class as a function');
      }
      function i(S, g) {
        for (var p = 0; p < g.length; p++) {
          var _ = g[p];
          (_.enumerable = _.enumerable || !1),
            (_.configurable = !0),
            'value' in _ && (_.writable = !0),
            Object.defineProperty(S, _.key, _);
        }
      }
      function n(S, g, p) {
        return g && i(S.prototype, g), p && i(S, p), S;
      }
      var o = (function () {
        function S(g, p) {
          (this.next = null),
            (this.key = g),
            (this.data = p),
            (this.left = null),
            (this.right = null);
        }
        return S;
      })();
      function s(S, g) {
        return S > g ? 1 : S < g ? -1 : 0;
      }
      function h(S, g, p) {
        for (var _ = new o(null, null), b = _, M = _; ; ) {
          var B = p(S, g.key);
          if (B < 0) {
            if (g.left === null) break;
            if (p(S, g.left.key) < 0) {
              var q = g.left;
              if (((g.left = q.right), (q.right = g), (g = q), g.left === null))
                break;
            }
            (M.left = g), (M = g), (g = g.left);
          } else if (B > 0) {
            if (g.right === null) break;
            if (p(S, g.right.key) > 0) {
              var q = g.right;
              if (((g.right = q.left), (q.left = g), (g = q), g.right === null))
                break;
            }
            (b.right = g), (b = g), (g = g.right);
          } else break;
        }
        return (
          (b.right = g.left),
          (M.left = g.right),
          (g.left = _.right),
          (g.right = _.left),
          g
        );
      }
      function c(S, g, p, _) {
        var b = new o(S, g);
        if (p === null) return (b.left = b.right = null), b;
        p = h(S, p, _);
        var M = _(S, p.key);
        return (
          M < 0
            ? ((b.left = p.left), (b.right = p), (p.left = null))
            : M >= 0 && ((b.right = p.right), (b.left = p), (p.right = null)),
          b
        );
      }
      function f(S, g, p) {
        var _ = null,
          b = null;
        if (g) {
          g = h(S, g, p);
          var M = p(g.key, S);
          M === 0
            ? ((_ = g.left), (b = g.right))
            : M < 0
              ? ((b = g.right), (g.right = null), (_ = g))
              : ((_ = g.left), (g.left = null), (b = g));
        }
        return { left: _, right: b };
      }
      function d(S, g, p) {
        return g === null
          ? S
          : (S === null || ((g = h(S.key, g, p)), (g.left = S)), g);
      }
      function y(S, g, p, _, b) {
        if (S) {
          _(
            '' +
              g +
              (p ? '\u2514\u2500\u2500 ' : '\u251C\u2500\u2500 ') +
              b(S) +
              `
`
          );
          var M = g + (p ? '    ' : '\u2502   ');
          S.left && y(S.left, M, !1, _, b), S.right && y(S.right, M, !0, _, b);
        }
      }
      var w = (function () {
        function S(g) {
          g === void 0 && (g = s),
            (this._root = null),
            (this._size = 0),
            (this._comparator = g);
        }
        return (
          (S.prototype.insert = function (g, p) {
            return (
              this._size++, (this._root = c(g, p, this._root, this._comparator))
            );
          }),
          (S.prototype.add = function (g, p) {
            var _ = new o(g, p);
            this._root === null &&
              ((_.left = _.right = null), this._size++, (this._root = _));
            var b = this._comparator,
              M = h(g, this._root, b),
              B = b(g, M.key);
            return (
              B === 0
                ? (this._root = M)
                : (B < 0
                    ? ((_.left = M.left), (_.right = M), (M.left = null))
                    : B > 0 &&
                      ((_.right = M.right), (_.left = M), (M.right = null)),
                  this._size++,
                  (this._root = _)),
              this._root
            );
          }),
          (S.prototype.remove = function (g) {
            this._root = this._remove(g, this._root, this._comparator);
          }),
          (S.prototype._remove = function (g, p, _) {
            var b;
            if (p === null) return null;
            p = h(g, p, _);
            var M = _(g, p.key);
            return M === 0
              ? (p.left === null
                  ? (b = p.right)
                  : ((b = h(g, p.left, _)), (b.right = p.right)),
                this._size--,
                b)
              : p;
          }),
          (S.prototype.pop = function () {
            var g = this._root;
            if (g) {
              for (; g.left; ) g = g.left;
              return (
                (this._root = h(g.key, this._root, this._comparator)),
                (this._root = this._remove(
                  g.key,
                  this._root,
                  this._comparator
                )),
                { key: g.key, data: g.data }
              );
            }
            return null;
          }),
          (S.prototype.findStatic = function (g) {
            for (var p = this._root, _ = this._comparator; p; ) {
              var b = _(g, p.key);
              if (b === 0) return p;
              b < 0 ? (p = p.left) : (p = p.right);
            }
            return null;
          }),
          (S.prototype.find = function (g) {
            return this._root &&
              ((this._root = h(g, this._root, this._comparator)),
              this._comparator(g, this._root.key) !== 0)
              ? null
              : this._root;
          }),
          (S.prototype.contains = function (g) {
            for (var p = this._root, _ = this._comparator; p; ) {
              var b = _(g, p.key);
              if (b === 0) return !0;
              b < 0 ? (p = p.left) : (p = p.right);
            }
            return !1;
          }),
          (S.prototype.forEach = function (g, p) {
            for (var _ = this._root, b = [], M = !1; !M; )
              _ !== null
                ? (b.push(_), (_ = _.left))
                : b.length !== 0
                  ? ((_ = b.pop()), g.call(p, _), (_ = _.right))
                  : (M = !0);
            return this;
          }),
          (S.prototype.range = function (g, p, _, b) {
            for (
              var M = [], B = this._comparator, q = this._root, F;
              M.length !== 0 || q;

            )
              if (q) M.push(q), (q = q.left);
              else {
                if (((q = M.pop()), (F = B(q.key, p)), F > 0)) break;
                if (B(q.key, g) >= 0 && _.call(b, q)) return this;
                q = q.right;
              }
            return this;
          }),
          (S.prototype.keys = function () {
            var g = [];
            return (
              this.forEach(function (p) {
                var _ = p.key;
                return g.push(_);
              }),
              g
            );
          }),
          (S.prototype.values = function () {
            var g = [];
            return (
              this.forEach(function (p) {
                var _ = p.data;
                return g.push(_);
              }),
              g
            );
          }),
          (S.prototype.min = function () {
            return this._root ? this.minNode(this._root).key : null;
          }),
          (S.prototype.max = function () {
            return this._root ? this.maxNode(this._root).key : null;
          }),
          (S.prototype.minNode = function (g) {
            if ((g === void 0 && (g = this._root), g))
              for (; g.left; ) g = g.left;
            return g;
          }),
          (S.prototype.maxNode = function (g) {
            if ((g === void 0 && (g = this._root), g))
              for (; g.right; ) g = g.right;
            return g;
          }),
          (S.prototype.at = function (g) {
            for (var p = this._root, _ = !1, b = 0, M = []; !_; )
              if (p) M.push(p), (p = p.left);
              else if (M.length > 0) {
                if (((p = M.pop()), b === g)) return p;
                b++, (p = p.right);
              } else _ = !0;
            return null;
          }),
          (S.prototype.next = function (g) {
            var p = this._root,
              _ = null;
            if (g.right) {
              for (_ = g.right; _.left; ) _ = _.left;
              return _;
            }
            for (var b = this._comparator; p; ) {
              var M = b(g.key, p.key);
              if (M === 0) break;
              M < 0 ? ((_ = p), (p = p.left)) : (p = p.right);
            }
            return _;
          }),
          (S.prototype.prev = function (g) {
            var p = this._root,
              _ = null;
            if (g.left !== null) {
              for (_ = g.left; _.right; ) _ = _.right;
              return _;
            }
            for (var b = this._comparator; p; ) {
              var M = b(g.key, p.key);
              if (M === 0) break;
              M < 0 ? (p = p.left) : ((_ = p), (p = p.right));
            }
            return _;
          }),
          (S.prototype.clear = function () {
            return (this._root = null), (this._size = 0), this;
          }),
          (S.prototype.toList = function () {
            return D(this._root);
          }),
          (S.prototype.load = function (g, p, _) {
            p === void 0 && (p = []), _ === void 0 && (_ = !1);
            var b = g.length,
              M = this._comparator;
            if ((_ && k(g, p, 0, b - 1, M), this._root === null))
              (this._root = P(g, p, 0, b)), (this._size = b);
            else {
              var B = Y(this.toList(), R(g, p), M);
              (b = this._size + b), (this._root = N({ head: B }, 0, b));
            }
            return this;
          }),
          (S.prototype.isEmpty = function () {
            return this._root === null;
          }),
          Object.defineProperty(S.prototype, 'size', {
            get: function () {
              return this._size;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(S.prototype, 'root', {
            get: function () {
              return this._root;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (S.prototype.toString = function (g) {
            g === void 0 &&
              (g = function (b) {
                return String(b.key);
              });
            var p = [];
            return (
              y(
                this._root,
                '',
                !0,
                function (_) {
                  return p.push(_);
                },
                g
              ),
              p.join('')
            );
          }),
          (S.prototype.update = function (g, p, _) {
            var b = this._comparator,
              M = f(g, this._root, b),
              B = M.left,
              q = M.right;
            b(g, p) < 0 ? (q = c(p, _, q, b)) : (B = c(p, _, B, b)),
              (this._root = d(B, q, b));
          }),
          (S.prototype.split = function (g) {
            return f(g, this._root, this._comparator);
          }),
          S
        );
      })();
      function P(S, g, p, _) {
        var b = _ - p;
        if (b > 0) {
          var M = p + Math.floor(b / 2),
            B = S[M],
            q = g[M],
            F = new o(B, q);
          return (F.left = P(S, g, p, M)), (F.right = P(S, g, M + 1, _)), F;
        }
        return null;
      }
      function R(S, g) {
        for (var p = new o(null, null), _ = p, b = 0; b < S.length; b++)
          _ = _.next = new o(S[b], g[b]);
        return (_.next = null), p.next;
      }
      function D(S) {
        for (var g = S, p = [], _ = !1, b = new o(null, null), M = b; !_; )
          g
            ? (p.push(g), (g = g.left))
            : p.length > 0
              ? ((g = M = M.next = p.pop()), (g = g.right))
              : (_ = !0);
        return (M.next = null), b.next;
      }
      function N(S, g, p) {
        var _ = p - g;
        if (_ > 0) {
          var b = g + Math.floor(_ / 2),
            M = N(S, g, b),
            B = S.head;
          return (
            (B.left = M), (S.head = S.head.next), (B.right = N(S, b + 1, p)), B
          );
        }
        return null;
      }
      function Y(S, g, p) {
        for (
          var _ = new o(null, null), b = _, M = S, B = g;
          M !== null && B !== null;

        )
          p(M.key, B.key) < 0
            ? ((b.next = M), (M = M.next))
            : ((b.next = B), (B = B.next)),
            (b = b.next);
        return M !== null ? (b.next = M) : B !== null && (b.next = B), _.next;
      }
      function k(S, g, p, _, b) {
        if (!(p >= _)) {
          for (var M = S[(p + _) >> 1], B = p - 1, q = _ + 1; ; ) {
            do B++;
            while (b(S[B], M) < 0);
            do q--;
            while (b(S[q], M) > 0);
            if (B >= q) break;
            var F = S[B];
            (S[B] = S[q]), (S[q] = F), (F = g[B]), (g[B] = g[q]), (g[q] = F);
          }
          k(S, g, p, q, b), k(S, g, q + 1, _, b);
        }
      }
      var C = function (g, p) {
          return (
            g.ll.x <= p.x && p.x <= g.ur.x && g.ll.y <= p.y && p.y <= g.ur.y
          );
        },
        I = function (g, p) {
          if (
            p.ur.x < g.ll.x ||
            g.ur.x < p.ll.x ||
            p.ur.y < g.ll.y ||
            g.ur.y < p.ll.y
          )
            return null;
          var _ = g.ll.x < p.ll.x ? p.ll.x : g.ll.x,
            b = g.ur.x < p.ur.x ? g.ur.x : p.ur.x,
            M = g.ll.y < p.ll.y ? p.ll.y : g.ll.y,
            B = g.ur.y < p.ur.y ? g.ur.y : p.ur.y;
          return { ll: { x: _, y: M }, ur: { x: b, y: B } };
        },
        Z = Number.EPSILON;
      Z === void 0 && (Z = Math.pow(2, -52));
      var V = Z * Z,
        j = function (g, p) {
          if (-Z < g && g < Z && -Z < p && p < Z) return 0;
          var _ = g - p;
          return _ * _ < V * g * p ? 0 : g < p ? -1 : 1;
        },
        H = (function () {
          function S() {
            t(this, S), this.reset();
          }
          return (
            n(S, [
              {
                key: 'reset',
                value: function () {
                  (this.xRounder = new E()), (this.yRounder = new E());
                },
              },
              {
                key: 'round',
                value: function (p, _) {
                  return {
                    x: this.xRounder.round(p),
                    y: this.yRounder.round(_),
                  };
                },
              },
            ]),
            S
          );
        })(),
        E = (function () {
          function S() {
            t(this, S), (this.tree = new w()), this.round(0);
          }
          return (
            n(S, [
              {
                key: 'round',
                value: function (p) {
                  var _ = this.tree.add(p),
                    b = this.tree.prev(_);
                  if (b !== null && j(_.key, b.key) === 0)
                    return this.tree.remove(p), b.key;
                  var M = this.tree.next(_);
                  return M !== null && j(_.key, M.key) === 0
                    ? (this.tree.remove(p), M.key)
                    : p;
                },
              },
            ]),
            S
          );
        })(),
        tt = new H(),
        X = function (g, p) {
          return g.x * p.y - g.y * p.x;
        },
        et = function (g, p) {
          return g.x * p.x + g.y * p.y;
        },
        at = function (g, p, _) {
          var b = { x: p.x - g.x, y: p.y - g.y },
            M = { x: _.x - g.x, y: _.y - g.y },
            B = X(b, M);
          return j(B, 0);
        },
        ht = function (g) {
          return Math.sqrt(et(g, g));
        },
        qt = function (g, p, _) {
          var b = { x: p.x - g.x, y: p.y - g.y },
            M = { x: _.x - g.x, y: _.y - g.y };
          return X(M, b) / ht(M) / ht(b);
        },
        kt = function (g, p, _) {
          var b = { x: p.x - g.x, y: p.y - g.y },
            M = { x: _.x - g.x, y: _.y - g.y };
          return et(M, b) / ht(M) / ht(b);
        },
        Dt = function (g, p, _) {
          return p.y === 0 ? null : { x: g.x + (p.x / p.y) * (_ - g.y), y: _ };
        },
        it = function (g, p, _) {
          return p.x === 0 ? null : { x: _, y: g.y + (p.y / p.x) * (_ - g.x) };
        },
        Yt = function (g, p, _, b) {
          if (p.x === 0) return it(_, b, g.x);
          if (b.x === 0) return it(g, p, _.x);
          if (p.y === 0) return Dt(_, b, g.y);
          if (b.y === 0) return Dt(g, p, _.y);
          var M = X(p, b);
          if (M == 0) return null;
          var B = { x: _.x - g.x, y: _.y - g.y },
            q = X(B, p) / M,
            F = X(B, b) / M,
            W = g.x + F * p.x,
            ot = _.x + q * b.x,
            v = g.y + F * p.y,
            z = _.y + q * b.y,
            A = (W + ot) / 2,
            K = (v + z) / 2;
          return { x: A, y: K };
        },
        Q = (function () {
          n(S, null, [
            {
              key: 'compare',
              value: function (p, _) {
                var b = S.comparePoints(p.point, _.point);
                return b !== 0
                  ? b
                  : (p.point !== _.point && p.link(_),
                    p.isLeft !== _.isLeft
                      ? p.isLeft
                        ? 1
                        : -1
                      : _t.compare(p.segment, _.segment));
              },
            },
            {
              key: 'comparePoints',
              value: function (p, _) {
                return p.x < _.x
                  ? -1
                  : p.x > _.x
                    ? 1
                    : p.y < _.y
                      ? -1
                      : p.y > _.y
                        ? 1
                        : 0;
              },
            },
          ]);
          function S(g, p) {
            t(this, S),
              g.events === void 0 ? (g.events = [this]) : g.events.push(this),
              (this.point = g),
              (this.isLeft = p);
          }
          return (
            n(S, [
              {
                key: 'link',
                value: function (p) {
                  if (p.point === this.point)
                    throw new Error('Tried to link already linked events');
                  for (
                    var _ = p.point.events, b = 0, M = _.length;
                    b < M;
                    b++
                  ) {
                    var B = _[b];
                    this.point.events.push(B), (B.point = this.point);
                  }
                  this.checkForConsuming();
                },
              },
              {
                key: 'checkForConsuming',
                value: function () {
                  for (var p = this.point.events.length, _ = 0; _ < p; _++) {
                    var b = this.point.events[_];
                    if (b.segment.consumedBy === void 0)
                      for (var M = _ + 1; M < p; M++) {
                        var B = this.point.events[M];
                        B.consumedBy === void 0 &&
                          b.otherSE.point.events === B.otherSE.point.events &&
                          b.segment.consume(B.segment);
                      }
                  }
                },
              },
              {
                key: 'getAvailableLinkedEvents',
                value: function () {
                  for (
                    var p = [], _ = 0, b = this.point.events.length;
                    _ < b;
                    _++
                  ) {
                    var M = this.point.events[_];
                    M !== this &&
                      !M.segment.ringOut &&
                      M.segment.isInResult() &&
                      p.push(M);
                  }
                  return p;
                },
              },
              {
                key: 'getLeftmostComparator',
                value: function (p) {
                  var _ = this,
                    b = new Map(),
                    M = function (q) {
                      var F = q.otherSE;
                      b.set(q, {
                        sine: qt(_.point, p.point, F.point),
                        cosine: kt(_.point, p.point, F.point),
                      });
                    };
                  return function (B, q) {
                    b.has(B) || M(B), b.has(q) || M(q);
                    var F = b.get(B),
                      W = F.sine,
                      ot = F.cosine,
                      v = b.get(q),
                      z = v.sine,
                      A = v.cosine;
                    return W >= 0 && z >= 0
                      ? ot < A
                        ? 1
                        : ot > A
                          ? -1
                          : 0
                      : W < 0 && z < 0
                        ? ot < A
                          ? -1
                          : ot > A
                            ? 1
                            : 0
                        : z < W
                          ? -1
                          : z > W
                            ? 1
                            : 0;
                  };
                },
              },
            ]),
            S
          );
        })(),
        pt = 0,
        _t = (function () {
          n(S, null, [
            {
              key: 'compare',
              value: function (p, _) {
                var b = p.leftSE.point.x,
                  M = _.leftSE.point.x,
                  B = p.rightSE.point.x,
                  q = _.rightSE.point.x;
                if (q < b) return 1;
                if (B < M) return -1;
                var F = p.leftSE.point.y,
                  W = _.leftSE.point.y,
                  ot = p.rightSE.point.y,
                  v = _.rightSE.point.y;
                if (b < M) {
                  if (W < F && W < ot) return 1;
                  if (W > F && W > ot) return -1;
                  var z = p.comparePoint(_.leftSE.point);
                  if (z < 0) return 1;
                  if (z > 0) return -1;
                  var A = _.comparePoint(p.rightSE.point);
                  return A !== 0 ? A : -1;
                }
                if (b > M) {
                  if (F < W && F < v) return -1;
                  if (F > W && F > v) return 1;
                  var K = _.comparePoint(p.leftSE.point);
                  if (K !== 0) return K;
                  var $ = p.comparePoint(_.rightSE.point);
                  return $ < 0 ? 1 : $ > 0 ? -1 : 1;
                }
                if (F < W) return -1;
                if (F > W) return 1;
                if (B < q) {
                  var rt = _.comparePoint(p.rightSE.point);
                  if (rt !== 0) return rt;
                }
                if (B > q) {
                  var dt = p.comparePoint(_.rightSE.point);
                  if (dt < 0) return 1;
                  if (dt > 0) return -1;
                }
                if (B !== q) {
                  var yt = ot - F,
                    ct = B - b,
                    wt = v - W,
                    At = q - M;
                  if (yt > ct && wt < At) return 1;
                  if (yt < ct && wt > At) return -1;
                }
                return B > q
                  ? 1
                  : B < q || ot < v
                    ? -1
                    : ot > v
                      ? 1
                      : p.id < _.id
                        ? -1
                        : p.id > _.id
                          ? 1
                          : 0;
              },
            },
          ]);
          function S(g, p, _, b) {
            t(this, S),
              (this.id = ++pt),
              (this.leftSE = g),
              (g.segment = this),
              (g.otherSE = p),
              (this.rightSE = p),
              (p.segment = this),
              (p.otherSE = g),
              (this.rings = _),
              (this.windings = b);
          }
          return (
            n(
              S,
              [
                {
                  key: 'replaceRightSE',
                  value: function (p) {
                    (this.rightSE = p),
                      (this.rightSE.segment = this),
                      (this.rightSE.otherSE = this.leftSE),
                      (this.leftSE.otherSE = this.rightSE);
                  },
                },
                {
                  key: 'bbox',
                  value: function () {
                    var p = this.leftSE.point.y,
                      _ = this.rightSE.point.y;
                    return {
                      ll: { x: this.leftSE.point.x, y: p < _ ? p : _ },
                      ur: { x: this.rightSE.point.x, y: p > _ ? p : _ },
                    };
                  },
                },
                {
                  key: 'vector',
                  value: function () {
                    return {
                      x: this.rightSE.point.x - this.leftSE.point.x,
                      y: this.rightSE.point.y - this.leftSE.point.y,
                    };
                  },
                },
                {
                  key: 'isAnEndpoint',
                  value: function (p) {
                    return (
                      (p.x === this.leftSE.point.x &&
                        p.y === this.leftSE.point.y) ||
                      (p.x === this.rightSE.point.x &&
                        p.y === this.rightSE.point.y)
                    );
                  },
                },
                {
                  key: 'comparePoint',
                  value: function (p) {
                    if (this.isAnEndpoint(p)) return 0;
                    var _ = this.leftSE.point,
                      b = this.rightSE.point,
                      M = this.vector();
                    if (_.x === b.x)
                      return p.x === _.x ? 0 : p.x < _.x ? 1 : -1;
                    var B = (p.y - _.y) / M.y,
                      q = _.x + B * M.x;
                    if (p.x === q) return 0;
                    var F = (p.x - _.x) / M.x,
                      W = _.y + F * M.y;
                    return p.y === W ? 0 : p.y < W ? -1 : 1;
                  },
                },
                {
                  key: 'getIntersection',
                  value: function (p) {
                    var _ = this.bbox(),
                      b = p.bbox(),
                      M = I(_, b);
                    if (M === null) return null;
                    var B = this.leftSE.point,
                      q = this.rightSE.point,
                      F = p.leftSE.point,
                      W = p.rightSE.point,
                      ot = C(_, F) && this.comparePoint(F) === 0,
                      v = C(b, B) && p.comparePoint(B) === 0,
                      z = C(_, W) && this.comparePoint(W) === 0,
                      A = C(b, q) && p.comparePoint(q) === 0;
                    if (v && ot) return A && !z ? q : !A && z ? W : null;
                    if (v) return z && B.x === W.x && B.y === W.y ? null : B;
                    if (ot) return A && q.x === F.x && q.y === F.y ? null : F;
                    if (A && z) return null;
                    if (A) return q;
                    if (z) return W;
                    var K = Yt(B, this.vector(), F, p.vector());
                    return K === null || !C(M, K) ? null : tt.round(K.x, K.y);
                  },
                },
                {
                  key: 'split',
                  value: function (p) {
                    var _ = [],
                      b = p.events !== void 0,
                      M = new Q(p, !0),
                      B = new Q(p, !1),
                      q = this.rightSE;
                    this.replaceRightSE(B), _.push(B), _.push(M);
                    var F = new S(
                      M,
                      q,
                      this.rings.slice(),
                      this.windings.slice()
                    );
                    return (
                      Q.comparePoints(F.leftSE.point, F.rightSE.point) > 0 &&
                        F.swapEvents(),
                      Q.comparePoints(this.leftSE.point, this.rightSE.point) >
                        0 && this.swapEvents(),
                      b && (M.checkForConsuming(), B.checkForConsuming()),
                      _
                    );
                  },
                },
                {
                  key: 'swapEvents',
                  value: function () {
                    var p = this.rightSE;
                    (this.rightSE = this.leftSE),
                      (this.leftSE = p),
                      (this.leftSE.isLeft = !0),
                      (this.rightSE.isLeft = !1);
                    for (var _ = 0, b = this.windings.length; _ < b; _++)
                      this.windings[_] *= -1;
                  },
                },
                {
                  key: 'consume',
                  value: function (p) {
                    for (var _ = this, b = p; _.consumedBy; ) _ = _.consumedBy;
                    for (; b.consumedBy; ) b = b.consumedBy;
                    var M = S.compare(_, b);
                    if (M !== 0) {
                      if (M > 0) {
                        var B = _;
                        (_ = b), (b = B);
                      }
                      if (_.prev === b) {
                        var q = _;
                        (_ = b), (b = q);
                      }
                      for (var F = 0, W = b.rings.length; F < W; F++) {
                        var ot = b.rings[F],
                          v = b.windings[F],
                          z = _.rings.indexOf(ot);
                        z === -1
                          ? (_.rings.push(ot), _.windings.push(v))
                          : (_.windings[z] += v);
                      }
                      (b.rings = null),
                        (b.windings = null),
                        (b.consumedBy = _),
                        (b.leftSE.consumedBy = _.leftSE),
                        (b.rightSE.consumedBy = _.rightSE);
                    }
                  },
                },
                {
                  key: 'prevInResult',
                  value: function () {
                    return this._prevInResult !== void 0
                      ? this._prevInResult
                      : (this.prev
                          ? this.prev.isInResult()
                            ? (this._prevInResult = this.prev)
                            : (this._prevInResult = this.prev.prevInResult())
                          : (this._prevInResult = null),
                        this._prevInResult);
                  },
                },
                {
                  key: 'beforeState',
                  value: function () {
                    if (this._beforeState !== void 0) return this._beforeState;
                    if (!this.prev)
                      this._beforeState = {
                        rings: [],
                        windings: [],
                        multiPolys: [],
                      };
                    else {
                      var p = this.prev.consumedBy || this.prev;
                      this._beforeState = p.afterState();
                    }
                    return this._beforeState;
                  },
                },
                {
                  key: 'afterState',
                  value: function () {
                    if (this._afterState !== void 0) return this._afterState;
                    var p = this.beforeState();
                    this._afterState = {
                      rings: p.rings.slice(0),
                      windings: p.windings.slice(0),
                      multiPolys: [],
                    };
                    for (
                      var _ = this._afterState.rings,
                        b = this._afterState.windings,
                        M = this._afterState.multiPolys,
                        B = 0,
                        q = this.rings.length;
                      B < q;
                      B++
                    ) {
                      var F = this.rings[B],
                        W = this.windings[B],
                        ot = _.indexOf(F);
                      ot === -1 ? (_.push(F), b.push(W)) : (b[ot] += W);
                    }
                    for (var v = [], z = [], A = 0, K = _.length; A < K; A++)
                      if (b[A] !== 0) {
                        var $ = _[A],
                          rt = $.poly;
                        if (z.indexOf(rt) === -1)
                          if ($.isExterior) v.push(rt);
                          else {
                            z.indexOf(rt) === -1 && z.push(rt);
                            var dt = v.indexOf($.poly);
                            dt !== -1 && v.splice(dt, 1);
                          }
                      }
                    for (var yt = 0, ct = v.length; yt < ct; yt++) {
                      var wt = v[yt].multiPoly;
                      M.indexOf(wt) === -1 && M.push(wt);
                    }
                    return this._afterState;
                  },
                },
                {
                  key: 'isInResult',
                  value: function () {
                    if (this.consumedBy) return !1;
                    if (this._isInResult !== void 0) return this._isInResult;
                    var p = this.beforeState().multiPolys,
                      _ = this.afterState().multiPolys;
                    switch (Gt.type) {
                      case 'union': {
                        var b = p.length === 0,
                          M = _.length === 0;
                        this._isInResult = b !== M;
                        break;
                      }
                      case 'intersection': {
                        var B, q;
                        p.length < _.length
                          ? ((B = p.length), (q = _.length))
                          : ((B = _.length), (q = p.length)),
                          (this._isInResult = q === Gt.numMultiPolys && B < q);
                        break;
                      }
                      case 'xor': {
                        var F = Math.abs(p.length - _.length);
                        this._isInResult = F % 2 === 1;
                        break;
                      }
                      case 'difference': {
                        var W = function (v) {
                          return v.length === 1 && v[0].isSubject;
                        };
                        this._isInResult = W(p) !== W(_);
                        break;
                      }
                      default:
                        throw new Error(
                          'Unrecognized operation type found '.concat(Gt.type)
                        );
                    }
                    return this._isInResult;
                  },
                },
              ],
              [
                {
                  key: 'fromRing',
                  value: function (p, _, b) {
                    var M,
                      B,
                      q,
                      F = Q.comparePoints(p, _);
                    if (F < 0) (M = p), (B = _), (q = 1);
                    else if (F > 0) (M = _), (B = p), (q = -1);
                    else
                      throw new Error(
                        'Tried to create degenerate segment at ['
                          .concat(p.x, ', ')
                          .concat(p.y, ']')
                      );
                    var W = new Q(M, !0),
                      ot = new Q(B, !1);
                    return new S(W, ot, [b], [q]);
                  },
                },
              ]
            ),
            S
          );
        })(),
        Tt = (function () {
          function S(g, p, _) {
            if ((t(this, S), !Array.isArray(g) || g.length === 0))
              throw new Error(
                'Input geometry is not a valid Polygon or MultiPolygon'
              );
            if (
              ((this.poly = p),
              (this.isExterior = _),
              (this.segments = []),
              typeof g[0][0] != 'number' || typeof g[0][1] != 'number')
            )
              throw new Error(
                'Input geometry is not a valid Polygon or MultiPolygon'
              );
            var b = tt.round(g[0][0], g[0][1]);
            this.bbox = { ll: { x: b.x, y: b.y }, ur: { x: b.x, y: b.y } };
            for (var M = b, B = 1, q = g.length; B < q; B++) {
              if (typeof g[B][0] != 'number' || typeof g[B][1] != 'number')
                throw new Error(
                  'Input geometry is not a valid Polygon or MultiPolygon'
                );
              var F = tt.round(g[B][0], g[B][1]);
              (F.x === M.x && F.y === M.y) ||
                (this.segments.push(_t.fromRing(M, F, this)),
                F.x < this.bbox.ll.x && (this.bbox.ll.x = F.x),
                F.y < this.bbox.ll.y && (this.bbox.ll.y = F.y),
                F.x > this.bbox.ur.x && (this.bbox.ur.x = F.x),
                F.y > this.bbox.ur.y && (this.bbox.ur.y = F.y),
                (M = F));
            }
            (b.x !== M.x || b.y !== M.y) &&
              this.segments.push(_t.fromRing(M, b, this));
          }
          return (
            n(S, [
              {
                key: 'getSweepEvents',
                value: function () {
                  for (
                    var p = [], _ = 0, b = this.segments.length;
                    _ < b;
                    _++
                  ) {
                    var M = this.segments[_];
                    p.push(M.leftSE), p.push(M.rightSE);
                  }
                  return p;
                },
              },
            ]),
            S
          );
        })(),
        Pt = (function () {
          function S(g, p) {
            if ((t(this, S), !Array.isArray(g)))
              throw new Error(
                'Input geometry is not a valid Polygon or MultiPolygon'
              );
            (this.exteriorRing = new Tt(g[0], this, !0)),
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
            for (var _ = 1, b = g.length; _ < b; _++) {
              var M = new Tt(g[_], this, !1);
              M.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = M.bbox.ll.x),
                M.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = M.bbox.ll.y),
                M.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = M.bbox.ur.x),
                M.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = M.bbox.ur.y),
                this.interiorRings.push(M);
            }
            this.multiPoly = p;
          }
          return (
            n(S, [
              {
                key: 'getSweepEvents',
                value: function () {
                  for (
                    var p = this.exteriorRing.getSweepEvents(),
                      _ = 0,
                      b = this.interiorRings.length;
                    _ < b;
                    _++
                  )
                    for (
                      var M = this.interiorRings[_].getSweepEvents(),
                        B = 0,
                        q = M.length;
                      B < q;
                      B++
                    )
                      p.push(M[B]);
                  return p;
                },
              },
            ]),
            S
          );
        })(),
        mt = (function () {
          function S(g, p) {
            if ((t(this, S), !Array.isArray(g)))
              throw new Error(
                'Input geometry is not a valid Polygon or MultiPolygon'
              );
            try {
              typeof g[0][0][0] == 'number' && (g = [g]);
            } catch {}
            (this.polys = []),
              (this.bbox = {
                ll: {
                  x: Number.POSITIVE_INFINITY,
                  y: Number.POSITIVE_INFINITY,
                },
                ur: {
                  x: Number.NEGATIVE_INFINITY,
                  y: Number.NEGATIVE_INFINITY,
                },
              });
            for (var _ = 0, b = g.length; _ < b; _++) {
              var M = new Pt(g[_], this);
              M.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = M.bbox.ll.x),
                M.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = M.bbox.ll.y),
                M.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = M.bbox.ur.x),
                M.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = M.bbox.ur.y),
                this.polys.push(M);
            }
            this.isSubject = p;
          }
          return (
            n(S, [
              {
                key: 'getSweepEvents',
                value: function () {
                  for (var p = [], _ = 0, b = this.polys.length; _ < b; _++)
                    for (
                      var M = this.polys[_].getSweepEvents(),
                        B = 0,
                        q = M.length;
                      B < q;
                      B++
                    )
                      p.push(M[B]);
                  return p;
                },
              },
            ]),
            S
          );
        })(),
        bt = (function () {
          n(S, null, [
            {
              key: 'factory',
              value: function (p) {
                for (var _ = [], b = 0, M = p.length; b < M; b++) {
                  var B = p[b];
                  if (!(!B.isInResult() || B.ringOut)) {
                    for (
                      var q = null,
                        F = B.leftSE,
                        W = B.rightSE,
                        ot = [F],
                        v = F.point,
                        z = [];
                      (q = F), (F = W), ot.push(F), F.point !== v;

                    )
                      for (;;) {
                        var A = F.getAvailableLinkedEvents();
                        if (A.length === 0) {
                          var K = ot[0].point,
                            $ = ot[ot.length - 1].point;
                          throw new Error(
                            'Unable to complete output ring starting at ['.concat(
                              K.x,
                              ','
                            ) +
                              ' '.concat(
                                K.y,
                                ']. Last matching segment found ends at'
                              ) +
                              ' ['.concat($.x, ', ').concat($.y, '].')
                          );
                        }
                        if (A.length === 1) {
                          W = A[0].otherSE;
                          break;
                        }
                        for (
                          var rt = null, dt = 0, yt = z.length;
                          dt < yt;
                          dt++
                        )
                          if (z[dt].point === F.point) {
                            rt = dt;
                            break;
                          }
                        if (rt !== null) {
                          var ct = z.splice(rt)[0],
                            wt = ot.splice(ct.index);
                          wt.unshift(wt[0].otherSE),
                            _.push(new S(wt.reverse()));
                          continue;
                        }
                        z.push({ index: ot.length, point: F.point });
                        var At = F.getLeftmostComparator(q);
                        W = A.sort(At)[0].otherSE;
                        break;
                      }
                    _.push(new S(ot));
                  }
                }
                return _;
              },
            },
          ]);
          function S(g) {
            t(this, S), (this.events = g);
            for (var p = 0, _ = g.length; p < _; p++)
              g[p].segment.ringOut = this;
            this.poly = null;
          }
          return (
            n(S, [
              {
                key: 'getGeom',
                value: function () {
                  for (
                    var p = this.events[0].point,
                      _ = [p],
                      b = 1,
                      M = this.events.length - 1;
                    b < M;
                    b++
                  ) {
                    var B = this.events[b].point,
                      q = this.events[b + 1].point;
                    at(B, p, q) !== 0 && (_.push(B), (p = B));
                  }
                  if (_.length === 1) return null;
                  var F = _[0],
                    W = _[1];
                  at(F, p, W) === 0 && _.shift(), _.push(_[0]);
                  for (
                    var ot = this.isExteriorRing() ? 1 : -1,
                      v = this.isExteriorRing() ? 0 : _.length - 1,
                      z = this.isExteriorRing() ? _.length : -1,
                      A = [],
                      K = v;
                    K != z;
                    K += ot
                  )
                    A.push([_[K].x, _[K].y]);
                  return A;
                },
              },
              {
                key: 'isExteriorRing',
                value: function () {
                  if (this._isExteriorRing === void 0) {
                    var p = this.enclosingRing();
                    this._isExteriorRing = p ? !p.isExteriorRing() : !0;
                  }
                  return this._isExteriorRing;
                },
              },
              {
                key: 'enclosingRing',
                value: function () {
                  return (
                    this._enclosingRing === void 0 &&
                      (this._enclosingRing = this._calcEnclosingRing()),
                    this._enclosingRing
                  );
                },
              },
              {
                key: '_calcEnclosingRing',
                value: function () {
                  for (
                    var p = this.events[0], _ = 1, b = this.events.length;
                    _ < b;
                    _++
                  ) {
                    var M = this.events[_];
                    Q.compare(p, M) > 0 && (p = M);
                  }
                  for (
                    var B = p.segment.prevInResult(),
                      q = B ? B.prevInResult() : null;
                    ;

                  ) {
                    if (!B) return null;
                    if (!q) return B.ringOut;
                    if (q.ringOut !== B.ringOut)
                      return q.ringOut.enclosingRing() !== B.ringOut
                        ? B.ringOut
                        : B.ringOut.enclosingRing();
                    (B = q.prevInResult()), (q = B ? B.prevInResult() : null);
                  }
                },
              },
            ]),
            S
          );
        })(),
        Ht = (function () {
          function S(g) {
            t(this, S),
              (this.exteriorRing = g),
              (g.poly = this),
              (this.interiorRings = []);
          }
          return (
            n(S, [
              {
                key: 'addInterior',
                value: function (p) {
                  this.interiorRings.push(p), (p.poly = this);
                },
              },
              {
                key: 'getGeom',
                value: function () {
                  var p = [this.exteriorRing.getGeom()];
                  if (p[0] === null) return null;
                  for (var _ = 0, b = this.interiorRings.length; _ < b; _++) {
                    var M = this.interiorRings[_].getGeom();
                    M !== null && p.push(M);
                  }
                  return p;
                },
              },
            ]),
            S
          );
        })(),
        Nt = (function () {
          function S(g) {
            t(this, S), (this.rings = g), (this.polys = this._composePolys(g));
          }
          return (
            n(S, [
              {
                key: 'getGeom',
                value: function () {
                  for (var p = [], _ = 0, b = this.polys.length; _ < b; _++) {
                    var M = this.polys[_].getGeom();
                    M !== null && p.push(M);
                  }
                  return p;
                },
              },
              {
                key: '_composePolys',
                value: function (p) {
                  for (var _ = [], b = 0, M = p.length; b < M; b++) {
                    var B = p[b];
                    if (!B.poly)
                      if (B.isExteriorRing()) _.push(new Ht(B));
                      else {
                        var q = B.enclosingRing();
                        q.poly || _.push(new Ht(q)), q.poly.addInterior(B);
                      }
                  }
                  return _;
                },
              },
            ]),
            S
          );
        })(),
        ze = (function () {
          function S(g) {
            var p =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : _t.compare;
            t(this, S),
              (this.queue = g),
              (this.tree = new w(p)),
              (this.segments = []);
          }
          return (
            n(S, [
              {
                key: 'process',
                value: function (p) {
                  var _ = p.segment,
                    b = [];
                  if (p.consumedBy)
                    return (
                      p.isLeft
                        ? this.queue.remove(p.otherSE)
                        : this.tree.remove(_),
                      b
                    );
                  var M = p.isLeft ? this.tree.insert(_) : this.tree.find(_);
                  if (!M)
                    throw new Error(
                      'Unable to find segment #'.concat(_.id, ' ') +
                        '['
                          .concat(_.leftSE.point.x, ', ')
                          .concat(_.leftSE.point.y, '] -> ') +
                        '['
                          .concat(_.rightSE.point.x, ', ')
                          .concat(_.rightSE.point.y, '] ') +
                        'in SweepLine tree. Please submit a bug report.'
                    );
                  for (var B = M, q = M, F = void 0, W = void 0; F === void 0; )
                    (B = this.tree.prev(B)),
                      B === null
                        ? (F = null)
                        : B.key.consumedBy === void 0 && (F = B.key);
                  for (; W === void 0; )
                    (q = this.tree.next(q)),
                      q === null
                        ? (W = null)
                        : q.key.consumedBy === void 0 && (W = q.key);
                  if (p.isLeft) {
                    var ot = null;
                    if (F) {
                      var v = F.getIntersection(_);
                      if (
                        v !== null &&
                        (_.isAnEndpoint(v) || (ot = v), !F.isAnEndpoint(v))
                      )
                        for (
                          var z = this._splitSafely(F, v), A = 0, K = z.length;
                          A < K;
                          A++
                        )
                          b.push(z[A]);
                    }
                    var $ = null;
                    if (W) {
                      var rt = W.getIntersection(_);
                      if (
                        rt !== null &&
                        (_.isAnEndpoint(rt) || ($ = rt), !W.isAnEndpoint(rt))
                      )
                        for (
                          var dt = this._splitSafely(W, rt),
                            yt = 0,
                            ct = dt.length;
                          yt < ct;
                          yt++
                        )
                          b.push(dt[yt]);
                    }
                    if (ot !== null || $ !== null) {
                      var wt = null;
                      if (ot === null) wt = $;
                      else if ($ === null) wt = ot;
                      else {
                        var At = Q.comparePoints(ot, $);
                        wt = At <= 0 ? ot : $;
                      }
                      this.queue.remove(_.rightSE), b.push(_.rightSE);
                      for (
                        var Zt = _.split(wt), se = 0, _e = Zt.length;
                        se < _e;
                        se++
                      )
                        b.push(Zt[se]);
                    }
                    b.length > 0
                      ? (this.tree.remove(_), b.push(p))
                      : (this.segments.push(_), (_.prev = F));
                  } else {
                    if (F && W) {
                      var Xt = F.getIntersection(W);
                      if (Xt !== null) {
                        if (!F.isAnEndpoint(Xt))
                          for (
                            var Fe = this._splitSafely(F, Xt),
                              ye = 0,
                              Ci = Fe.length;
                            ye < Ci;
                            ye++
                          )
                            b.push(Fe[ye]);
                        if (!W.isAnEndpoint(Xt))
                          for (
                            var qe = this._splitSafely(W, Xt),
                              ve = 0,
                              Pi = qe.length;
                            ve < Pi;
                            ve++
                          )
                            b.push(qe[ve]);
                      }
                    }
                    this.tree.remove(_);
                  }
                  return b;
                },
              },
              {
                key: '_splitSafely',
                value: function (p, _) {
                  this.tree.remove(p);
                  var b = p.rightSE;
                  this.queue.remove(b);
                  var M = p.split(_);
                  return (
                    M.push(b), p.consumedBy === void 0 && this.tree.insert(p), M
                  );
                },
              },
            ]),
            S
          );
        })(),
        me =
          (typeof process < 'u' &&
            process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE) ||
          1e6,
        Ne =
          (typeof process < 'u' &&
            process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS) ||
          1e6,
        jt = (function () {
          function S() {
            t(this, S);
          }
          return (
            n(S, [
              {
                key: 'run',
                value: function (p, _, b) {
                  (Gt.type = p), tt.reset();
                  for (var M = [new mt(_, !0)], B = 0, q = b.length; B < q; B++)
                    M.push(new mt(b[B], !1));
                  if (((Gt.numMultiPolys = M.length), Gt.type === 'difference'))
                    for (var F = M[0], W = 1; W < M.length; )
                      I(M[W].bbox, F.bbox) !== null ? W++ : M.splice(W, 1);
                  if (Gt.type === 'intersection') {
                    for (var ot = 0, v = M.length; ot < v; ot++)
                      for (var z = M[ot], A = ot + 1, K = M.length; A < K; A++)
                        if (I(z.bbox, M[A].bbox) === null) return [];
                  }
                  for (
                    var $ = new w(Q.compare), rt = 0, dt = M.length;
                    rt < dt;
                    rt++
                  )
                    for (
                      var yt = M[rt].getSweepEvents(), ct = 0, wt = yt.length;
                      ct < wt;
                      ct++
                    )
                      if (($.insert(yt[ct]), $.size > me))
                        throw new Error(
                          'Infinite loop when putting segment endpoints in a priority queue (queue size too big). Please file a bug report.'
                        );
                  for (var At = new ze($), Zt = $.size, se = $.pop(); se; ) {
                    var _e = se.key;
                    if ($.size === Zt) {
                      var Xt = _e.segment;
                      throw new Error(
                        'Unable to pop() '.concat(
                          _e.isLeft ? 'left' : 'right',
                          ' SweepEvent '
                        ) +
                          '['
                            .concat(_e.point.x, ', ')
                            .concat(_e.point.y, '] from segment #')
                            .concat(Xt.id, ' ') +
                          '['
                            .concat(Xt.leftSE.point.x, ', ')
                            .concat(Xt.leftSE.point.y, '] -> ') +
                          '['
                            .concat(Xt.rightSE.point.x, ', ')
                            .concat(Xt.rightSE.point.y, '] from queue. ') +
                          'Please file a bug report.'
                      );
                    }
                    if ($.size > me)
                      throw new Error(
                        'Infinite loop when passing sweep line over endpoints (queue size too big). Please file a bug report.'
                      );
                    if (At.segments.length > Ne)
                      throw new Error(
                        'Infinite loop when passing sweep line over endpoints (too many sweep line segments). Please file a bug report.'
                      );
                    for (
                      var Fe = At.process(_e), ye = 0, Ci = Fe.length;
                      ye < Ci;
                      ye++
                    ) {
                      var qe = Fe[ye];
                      qe.consumedBy === void 0 && $.insert(qe);
                    }
                    (Zt = $.size), (se = $.pop());
                  }
                  tt.reset();
                  var ve = bt.factory(At.segments),
                    Pi = new Nt(ve);
                  return Pi.getGeom();
                },
              },
            ]),
            S
          );
        })(),
        Gt = new jt(),
        ei = function (g) {
          for (
            var p = arguments.length, _ = new Array(p > 1 ? p - 1 : 0), b = 1;
            b < p;
            b++
          )
            _[b - 1] = arguments[b];
          return Gt.run('union', g, _);
        },
        ge = function (g) {
          for (
            var p = arguments.length, _ = new Array(p > 1 ? p - 1 : 0), b = 1;
            b < p;
            b++
          )
            _[b - 1] = arguments[b];
          return Gt.run('intersection', g, _);
        },
        ii = function (g) {
          for (
            var p = arguments.length, _ = new Array(p > 1 ? p - 1 : 0), b = 1;
            b < p;
            b++
          )
            _[b - 1] = arguments[b];
          return Gt.run('xor', g, _);
        },
        Ge = function (g) {
          for (
            var p = arguments.length, _ = new Array(p > 1 ? p - 1 : 0), b = 1;
            b < p;
            b++
          )
            _[b - 1] = arguments[b];
          return Gt.run('difference', g, _);
        },
        Pe = { union: ei, intersection: ge, xor: ii, difference: Ge };
      return Pe;
    });
  });
  var FC = ee(ca());
  function ld(t, i) {
    return ((t % i) + i) % i;
  }
  function hd(t) {
    return Object.fromEntries(
      Object.entries(t).filter(([i, n]) => n !== void 0)
    );
  }
  function Mr(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 1, t.toString().length) === 'm'
    );
  }
  function fa(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 1, t.toString().length) === '%'
    );
  }
  function Cr(t) {
    return (
      t
        .toString()
        .trim()
        .slice(t.toString().length - 2, t.toString().length) === 'px'
    );
  }
  function gn(t, i) {
    let n = i.getCenter(),
      o = i.latLngToLayerPoint(n),
      s = { x: o.x + Number(t), y: o.y },
      h = i.layerPointToLatLng(s);
    return i.distance(n, h);
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
      let n = Object.assign({}, i, t);
      return (this._arrowheadOptions = n), (this._hatsApplied = !0), this;
    },
    buildVectorHats: function (t) {
      this._arrowheads && this._arrowheads.remove(),
        this._ghosts && this._ghosts.remove();
      let i = Object.getPrototypeOf(Object.getPrototypeOf(this.options)),
        n = Object.assign({}, i, this.options),
        o = Object.assign({}, n, t);
      (o.smoothFactor = 1),
        (o.fillOpacity = 1),
        (o.fill = !!t.fill),
        (o.interactive = !1);
      let s = t.size.toString(),
        h = [],
        { frequency: c, offsets: f } = t;
      (f?.start || f?.end) && this._buildGhosts({ start: f.start, end: f.end }),
        (this._ghosts || this)._parts.forEach((w, P) => {
          let R = w.map((H) => this._map.layerPointToLatLng(H)),
            D = (() => {
              let H = 0;
              for (var E = 0; E < w.length - 1; E++)
                H += this._map.distance(R[E], R[E + 1]);
              return H;
            })(),
            N,
            Y,
            k,
            C;
          if (
            (isNaN(c)
              ? fa(c)
                ? console.error(
                    'Error: arrowhead frequency option cannot be given in percent.  Try another unit.'
                  )
                : Mr(c)
                  ? ((k = c.slice(0, c.length - 1) / D),
                    (C = 1 / k),
                    (C = Math.floor(C)),
                    (k = 1 / C))
                  : Cr(c) &&
                    ((k = (() => {
                      let H = c.slice(0, c.length - 2);
                      return gn(H, this._map) / D;
                    })()),
                    (C = 1 / k),
                    (C = Math.floor(C)),
                    (k = 1 / C))
              : ((k = 1 / c), (C = c)),
            t.frequency === 'allvertices')
          )
            (Y = (() => {
              let H = [];
              for (var E = 1; E < R.length; E++) {
                let tt =
                  L.GeometryUtil.angle(
                    this._map,
                    R[ld(E - 1, R.length)],
                    R[E]
                  ) + 180;
                H.push(tt);
              }
              return H;
            })()),
              (N = R),
              N.shift();
          else if (t.frequency === 'endonly' && R.length >= 2)
            (N = [R[R.length - 1]]),
              (Y = [
                L.GeometryUtil.angle(
                  this._map,
                  R[R.length - 2],
                  R[R.length - 1]
                ) + 180,
              ]);
          else {
            N = [];
            let H = [];
            for (var I = 0; I < C; I++) {
              let E = L.GeometryUtil.interpolateOnLine(
                this._map,
                R,
                k * (I + 1)
              );
              E && (H.push(E), N.push(E.latLng));
            }
            Y = (() => {
              let E = [];
              for (var tt = 0; tt < H.length; tt++) {
                let X = L.GeometryUtil.angle(
                  this._map,
                  R[H[tt].predecessor + 1],
                  R[H[tt].predecessor]
                );
                E.push(X);
              }
              return E;
            })();
          }
          let Z = [],
            V = (H, E = {}) => {
              let tt = E.yawn ?? t.yawn,
                X = L.GeometryUtil.destination(N[I], Y[I] - tt / 2, H),
                et = L.GeometryUtil.destination(N[I], Y[I] + tt / 2, H),
                at = [
                  [X.lat, X.lng],
                  [N[I].lat, N[I].lng],
                  [et.lat, et.lng],
                ],
                ht = t.fill
                  ? L.polygon(at, { ...o, ...E })
                  : L.polyline(at, { ...o, ...E });
              Z.push(ht);
            },
            j = (H, E = {}) => {
              let tt = H.slice(0, H.length - 2),
                X = E.yawn ?? t.yawn,
                et = this._map.latLngToLayerPoint(N[I]),
                at = Y[I],
                ht = (180 - at - X / 2) * (Math.PI / 180),
                qt = (180 - at + X / 2) * (Math.PI / 180),
                kt = tt * Math.sin(ht),
                Dt = tt * Math.cos(ht),
                it = tt * Math.sin(qt),
                Yt = tt * Math.cos(qt),
                Q = { x: et.x + kt, y: et.y + Dt },
                pt = { x: et.x + it, y: et.y + Yt },
                _t = this._map.layerPointToLatLng(Q),
                Tt = this._map.layerPointToLatLng(pt),
                Pt = [
                  [_t.lat, _t.lng],
                  [N[I].lat, N[I].lng],
                  [Tt.lat, Tt.lng],
                ],
                mt = t.fill
                  ? L.polygon(Pt, { ...o, ...E })
                  : L.polyline(Pt, { ...o, ...E });
              Z.push(mt);
            };
          for (var I = 0; I < N.length; I++) {
            let { perArrowheadOptions: E, ...tt } = t;
            if (
              ((E = E ? E(I) : {}),
              (E = Object.assign(tt, hd(E))),
              (s = E.size ?? s),
              Mr(s))
            ) {
              let X = s.slice(0, s.length - 1);
              V(X, E);
            } else if (fa(s)) {
              let X = s.slice(0, s.length - 1),
                et =
                  t.frequency === 'endonly' && t.proportionalToTotal
                    ? (D * X) / 100
                    : ((D / (w.length - 1)) * X) / 100;
              V(et, E);
            } else
              Cr(s)
                ? j(t.size, E)
                : console.error(
                    'Error: Arrowhead size unit not defined.  Check your arrowhead options.'
                  );
          }
          h.push(...Z);
        }),
        h.forEach((w) => (w.options.pmIgnore = !0));
      let y = L.layerGroup(h);
      return (this._arrowheads = y), this;
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
        let n = this.getLatLngs();
        n = Array.isArray(n[0]) ? n : [n];
        let o = n.map((s) => {
          let h = (() => {
            let c = 0;
            for (var f = 0; f < s.length - 1; f++)
              c += this._map.distance(s[f], s[f + 1]);
            return c;
          })();
          if (t) {
            let c = (() => {
                if (Mr(t)) return Number(t.slice(0, t.length - 1));
                if (Cr(t)) {
                  let d = Number(t.slice(0, t.length - 2));
                  return gn(d, this._map);
                }
              })(),
              f = L.GeometryUtil.interpolateOnLine(this._map, s, c / h);
            (s = s.slice(
              f.predecessor === -1 ? 1 : f.predecessor + 1,
              s.length
            )),
              s.unshift(f.latLng);
          }
          if (i) {
            let c = (() => {
                if (Mr(i)) return Number(i.slice(0, i.length - 1));
                if (Cr(i)) {
                  let d = Number(i.slice(0, i.length - 2));
                  return gn(d, this._map);
                }
              })(),
              f = L.GeometryUtil.interpolateOnLine(this._map, s, (h - c) / h);
            (s = s.slice(0, f.predecessor + 1)), s.push(f.latLng);
          }
          return s;
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
      var n = t.type === 'Feature' ? t.geometry : t,
        o = n ? n.coordinates : null,
        s = [],
        h = i && i.pointToLayer,
        c = (i && i.coordsToLatLng) || L.GeoJSON.coordsToLatLng,
        f,
        d,
        y,
        w;
      if (!o && !n) return null;
      switch (n.type) {
        case 'Point':
          return (f = c(o)), this._pointToLayer(h, t, f, i);
        case 'MultiPoint':
          for (y = 0, w = o.length; y < w; y++)
            (f = c(o[y])), s.push(this._pointToLayer(h, t, f, i));
          return new L.FeatureGroup(s);
        case 'LineString':
        case 'MultiLineString':
          d = L.GeoJSON.coordsToLatLngs(o, n.type === 'LineString' ? 0 : 1, c);
          var P = new L.Polyline(d, i);
          return i.arrowheads && P.arrowheads(i.arrowheads), P;
        case 'Polygon':
        case 'MultiPolygon':
          return (
            (d = L.GeoJSON.coordsToLatLngs(o, n.type === 'Polygon' ? 1 : 2, c)),
            new L.Polygon(d, i)
          );
        case 'GeometryCollection':
          for (y = 0, w = n.geometries.length; y < w; y++) {
            var R = this.geometryToLayer(
              {
                geometry: n.geometries[y],
                type: 'Feature',
                properties: t.properties,
              },
              i
            );
            R && s.push(R);
          }
          return new L.FeatureGroup(s);
        default:
          throw new Error('Invalid GeoJSON object.');
      }
    },
    addData: function (t) {
      var i = L.Util.isArray(t) ? t : t.features,
        n,
        o,
        s;
      if (i) {
        for (n = 0, o = i.length; n < o; n++)
          (s = i[n]),
            (s.geometries || s.geometry || s.features || s.coordinates) &&
              this.addData(s);
        return this;
      }
      var h = this.options;
      if (h.filter && !h.filter(t)) return this;
      var c = this.geometryToLayer(t, h);
      return c
        ? ((c.feature = L.GeoJSON.asFeature(t)),
          (c.defaultOptions = c.options),
          this.resetStyle(c),
          h.onEachFeature && h.onEachFeature(t, c),
          this.addLayer(c))
        : this;
    },
    _pointToLayer: function (t, i, n, o) {
      return t ? t(i, n) : new L.Marker(n, o && o.markersInheritOptions && o);
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
        ? (this._map.fire('dialog:destroyed', this),
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
      var n = L.DomEvent.stopPropagation;
      L.DomEvent.on(i, 'click', n)
        .on(i, 'mousedown', n)
        .on(i, 'touchstart', n)
        .on(i, 'dblclick', n)
        .on(i, 'mousewheel', n)
        .on(i, 'contextmenu', n)
        .on(i, 'MozMousePixelScroll', n);
      var o = (this._innerContainer = L.DomUtil.create('div', t + '-inner')),
        s = (this._grabberNode = L.DomUtil.create('div', t + '-grabber'));
      this.options.move || (this._grabberNode.style.visibility = 'hidden');
      var h = L.DomUtil.create('span', 'grabber-icon');
      s.appendChild(h),
        L.DomEvent.on(s, 'mousedown', this._handleMoveStart, this);
      var c = (this._closeNode = L.DomUtil.create('div', t + '-close'));
      this.options.close || (this._closeNode.style.visibility = 'hidden');
      var f = L.DomUtil.create('span', 'grabber-close');
      c.appendChild(f), L.DomEvent.on(c, 'click', this._handleClose, this);
      var d = (this._resizerNode = L.DomUtil.create('div', t + '-resizer'));
      this.options.resize || (this._resizerNode.style.visibility = 'hidden');
      var y = L.DomUtil.create('span', 'grabber-resize');
      d.appendChild(y),
        L.DomEvent.on(d, 'mousedown', this._handleResizeStart, this);
      var w = (this._contentNode = L.DomUtil.create('div', t + '-contents'));
      this.options.contentId && (w.id = this.options.contentId),
        i.appendChild(o),
        o.appendChild(w),
        o.appendChild(s),
        o.appendChild(c),
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
        n = t.originalEvent.clientY - this._oldMousePos.y;
      t.originalEvent.stopPropagation && t.originalEvent.stopPropagation(),
        t.originalEvent.preventDefault && t.originalEvent.preventDefault(),
        this._resizing && this._resize(i, n),
        this._moving && this._move(i, n);
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
      var n = this.options.anchor[0] + i,
        o = this.options.anchor[1] + t;
      (this.options.anchor[0] = n),
        (this.options.anchor[1] = o),
        (this._container.style.top = this.options.anchor[0] + 'px'),
        (this._container.style.left = this.options.anchor[1] + 'px'),
        this._map.fire('dialog:moving', this),
        (this._oldMousePos.y += i),
        (this._oldMousePos.x += t);
    },
    _resize: function (t, i) {
      var n = this.options.size[0] + t,
        o = this.options.size[1] + i;
      n <= this.options.maxSize[0] &&
        n >= this.options.minSize[0] &&
        ((this.options.size[0] = n),
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
  ((t, i, n, o) => {
    let s = i.createElement('canvas').getContext('2d'),
      h = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 },
      c,
      f,
      d,
      y,
      w,
      P,
      R,
      D,
      N,
      Y,
      k,
      C,
      I,
      Z,
      V,
      j,
      H = {},
      E = {
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
      tt = {},
      X = '',
      et = {},
      at = !1;
    function ht(v) {
      if (typeof v == 'object')
        for (let z in v)
          switch (z) {
            case 'el':
              Yt(v.el), v.wrap !== !1 && _t(v.el);
              break;
            case 'parent':
              (c =
                v.parent instanceof HTMLElement
                  ? v.parent
                  : i.querySelector(v.parent)),
                c &&
                  (c.appendChild(f),
                  (E.parent = v.parent),
                  c === i.body && (c = o));
              break;
            case 'themeMode':
              (E.themeMode = v.themeMode),
                v.themeMode === 'auto' &&
                  t.matchMedia &&
                  t.matchMedia('(prefers-color-scheme: dark)').matches &&
                  (E.themeMode = 'dark');
            case 'theme':
              v.theme && (E.theme = v.theme),
                (f.className = `clr-picker clr-${E.theme} clr-${E.themeMode}`),
                E.inline && pt();
              break;
            case 'rtl':
              (E.rtl = !!v.rtl),
                Array.from(i.getElementsByClassName('clr-field')).forEach(($) =>
                  $.classList.toggle('clr-rtl', E.rtl)
                );
              break;
            case 'margin':
              (v.margin *= 1),
                (E.margin = isNaN(v.margin) ? E.margin : v.margin);
              break;
            case 'wrap':
              v.el && v.wrap && _t(v.el);
              break;
            case 'formatToggle':
              (E.formatToggle = !!v.formatToggle),
                (F('clr-format').style.display = E.formatToggle
                  ? 'block'
                  : 'none'),
                E.formatToggle && (E.format = 'auto');
              break;
            case 'swatches':
              if (Array.isArray(v.swatches)) {
                let $ = F('clr-swatches'),
                  rt = i.createElement('div');
                ($.textContent = ''),
                  v.swatches.forEach((dt, yt) => {
                    let ct = i.createElement('button');
                    ct.setAttribute('type', 'button'),
                      ct.setAttribute('id', `clr-swatch-${yt}`),
                      ct.setAttribute(
                        'aria-labelledby',
                        `clr-swatch-label clr-swatch-${yt}`
                      ),
                      (ct.style.color = dt),
                      (ct.textContent = dt),
                      rt.appendChild(ct);
                  }),
                  v.swatches.length && $.appendChild(rt),
                  (E.swatches = v.swatches.slice());
              }
              break;
            case 'swatchesOnly':
              (E.swatchesOnly = !!v.swatchesOnly),
                f.setAttribute('data-minimal', E.swatchesOnly);
              break;
            case 'alpha':
              (E.alpha = !!v.alpha), f.setAttribute('data-alpha', E.alpha);
              break;
            case 'inline':
              if (
                ((E.inline = !!v.inline),
                f.setAttribute('data-inline', E.inline),
                E.inline)
              ) {
                let $ = v.defaultColor || E.defaultColor;
                (Z = Ht($)), pt(), bt($);
              }
              break;
            case 'clearButton':
              typeof v.clearButton == 'object' &&
                (v.clearButton.label &&
                  ((E.clearLabel = v.clearButton.label),
                  (R.innerHTML = E.clearLabel)),
                (v.clearButton = v.clearButton.show)),
                (E.clearButton = !!v.clearButton),
                (R.style.display = E.clearButton ? 'block' : 'none');
              break;
            case 'clearLabel':
              (E.clearLabel = v.clearLabel), (R.innerHTML = E.clearLabel);
              break;
            case 'closeButton':
              (E.closeButton = !!v.closeButton),
                E.closeButton ? f.insertBefore(D, w) : w.appendChild(D);
              break;
            case 'closeLabel':
              (E.closeLabel = v.closeLabel), (D.innerHTML = E.closeLabel);
              break;
            case 'a11y':
              let A = v.a11y,
                K = !1;
              if (typeof A == 'object')
                for (let $ in A)
                  A[$] && E.a11y[$] && ((E.a11y[$] = A[$]), (K = !0));
              if (K) {
                let $ = F('clr-open-label'),
                  rt = F('clr-swatch-label');
                ($.innerHTML = E.a11y.open),
                  (rt.innerHTML = E.a11y.swatch),
                  D.setAttribute('aria-label', E.a11y.close),
                  R.setAttribute('aria-label', E.a11y.clear),
                  N.setAttribute('aria-label', E.a11y.hueSlider),
                  k.setAttribute('aria-label', E.a11y.alphaSlider),
                  P.setAttribute('aria-label', E.a11y.input),
                  d.setAttribute('aria-label', E.a11y.instruction);
              }
              break;
            default:
              E[z] = v[z];
          }
    }
    function qt(v, z) {
      typeof v == 'string' && typeof z == 'object' && ((tt[v] = z), (at = !0));
    }
    function kt(v) {
      delete tt[v],
        Object.keys(tt).length === 0 && ((at = !1), v === X && it());
    }
    function Dt(v) {
      if (at) {
        let z = ['el', 'wrap', 'rtl', 'inline', 'defaultColor', 'a11y'];
        for (let A in tt) {
          let K = tt[A];
          if (v.matches(A)) {
            (X = A), (et = {}), z.forEach(($) => delete K[$]);
            for (let $ in K) et[$] = Array.isArray(E[$]) ? E[$].slice() : E[$];
            ht(K);
            break;
          }
        }
      }
    }
    function it() {
      Object.keys(et).length > 0 && (ht(et), (X = ''), (et = {}));
    }
    function Yt(v) {
      v instanceof HTMLElement && (v = [v]),
        Array.isArray(v)
          ? v.forEach((z) => {
              W(z, 'click', Q), W(z, 'input', Pt);
            })
          : (W(i, 'click', v, Q), W(i, 'input', v, Pt));
    }
    function Q(v) {
      E.inline ||
        (Dt(v.target),
        (I = v.target),
        (V = I.value),
        (Z = Ht(V)),
        f.classList.add('clr-open'),
        pt(),
        bt(V),
        (E.focusInput || E.selectInput) &&
          (P.focus({ preventScroll: !0 }),
          P.setSelectionRange(I.selectionStart, I.selectionEnd)),
        E.selectInput && P.select(),
        (j || E.swatchesOnly) && q().shift().focus(),
        I.dispatchEvent(new Event('open', { bubbles: !0 })));
    }
    function pt() {
      let v = c,
        z = t.scrollY,
        A = f.offsetWidth,
        K = f.offsetHeight,
        $ = { left: !1, top: !1 },
        rt,
        dt,
        yt,
        ct = { x: 0, y: 0 };
      if (
        (v &&
          ((rt = t.getComputedStyle(v)),
          (dt = parseFloat(rt.marginTop)),
          (yt = parseFloat(rt.borderTopWidth)),
          (ct = v.getBoundingClientRect()),
          (ct.y += yt + z)),
        !E.inline)
      ) {
        let wt = I.getBoundingClientRect(),
          At = wt.x,
          Zt = z + wt.y + wt.height + E.margin;
        v
          ? ((At -= ct.x),
            (Zt -= ct.y),
            At + A > v.clientWidth && ((At += wt.width - A), ($.left = !0)),
            Zt + K > v.clientHeight - dt &&
              K + E.margin <= wt.top - (ct.y - z) &&
              ((Zt -= wt.height + K + E.margin * 2), ($.top = !0)),
            (Zt += v.scrollTop))
          : (At + A > i.documentElement.clientWidth &&
              ((At += wt.width - A), ($.left = !0)),
            Zt + K - z > i.documentElement.clientHeight &&
              K + E.margin <= wt.top &&
              ((Zt = z + wt.y - K - E.margin), ($.top = !0))),
          f.classList.toggle('clr-left', $.left),
          f.classList.toggle('clr-top', $.top),
          (f.style.left = `${At}px`),
          (f.style.top = `${Zt}px`),
          (ct.x += f.offsetLeft),
          (ct.y += f.offsetTop);
      }
      H = {
        width: d.offsetWidth,
        height: d.offsetHeight,
        x: d.offsetLeft + ct.x,
        y: d.offsetTop + ct.y,
      };
    }
    function _t(v) {
      v instanceof HTMLElement
        ? Tt(v)
        : Array.isArray(v)
          ? v.forEach(Tt)
          : i.querySelectorAll(v).forEach(Tt);
    }
    function Tt(v) {
      let z = v.parentNode;
      if (!z.classList.contains('clr-field')) {
        let A = i.createElement('div'),
          K = 'clr-field';
        (E.rtl || v.classList.contains('clr-rtl')) && (K += ' clr-rtl'),
          (A.innerHTML =
            '<button type="button" aria-labelledby="clr-open-label"></button>'),
          z.insertBefore(A, v),
          (A.className = K),
          (A.style.color = v.value),
          A.appendChild(v);
      }
    }
    function Pt(v) {
      let z = v.target.parentNode;
      z.classList.contains('clr-field') && (z.style.color = v.target.value);
    }
    function mt(v) {
      if (I && !E.inline) {
        let z = I;
        v &&
          ((I = o),
          V !== z.value &&
            ((z.value = V),
            z.dispatchEvent(new Event('input', { bubbles: !0 })))),
          setTimeout(() => {
            V !== z.value &&
              z.dispatchEvent(new Event('change', { bubbles: !0 }));
          }),
          f.classList.remove('clr-open'),
          at && it(),
          z.dispatchEvent(new Event('close', { bubbles: !0 })),
          E.focusInput && z.focus({ preventScroll: !0 }),
          (I = o);
      }
    }
    function bt(v) {
      let z = p(v),
        A = g(z);
      me(A.s, A.v),
        ge(z, A),
        (N.value = A.h),
        (f.style.color = `hsl(${A.h}, 100%, 50%)`),
        (Y.style.left = `${(A.h / 360) * 100}%`),
        (y.style.left = `${(H.width * A.s) / 100}px`),
        (y.style.top = `${H.height - (H.height * A.v) / 100}px`),
        (k.value = A.a * 100),
        (C.style.left = `${A.a * 100}%`);
    }
    function Ht(v) {
      let z = v.substring(0, 3).toLowerCase();
      return z === 'rgb' || z === 'hsl' ? z : 'hex';
    }
    function Nt(v) {
      (v = v !== o ? v : P.value),
        I &&
          ((I.value = v), I.dispatchEvent(new Event('input', { bubbles: !0 }))),
        E.onChange && E.onChange.call(t, v, I),
        i.dispatchEvent(
          new CustomEvent('coloris:pick', {
            detail: { color: v, currentEl: I },
          })
        );
    }
    function ze(v, z) {
      let A = {
          h: N.value * 1,
          s: (v / H.width) * 100,
          v: 100 - (z / H.height) * 100,
          a: k.value / 100,
        },
        K = Pe(A);
      me(A.s, A.v), ge(K, A), Nt();
    }
    function me(v, z) {
      let A = E.a11y.marker;
      (v = v.toFixed(1) * 1),
        (z = z.toFixed(1) * 1),
        (A = A.replace('{s}', v)),
        (A = A.replace('{v}', z)),
        y.setAttribute('aria-label', A);
    }
    function Ne(v) {
      return {
        pageX: v.changedTouches ? v.changedTouches[0].pageX : v.pageX,
        pageY: v.changedTouches ? v.changedTouches[0].pageY : v.pageY,
      };
    }
    function jt(v) {
      let z = Ne(v),
        A = z.pageX - H.x,
        K = z.pageY - H.y;
      c && (K += c.scrollTop),
        ei(A, K),
        v.preventDefault(),
        v.stopPropagation();
    }
    function Gt(v, z) {
      let A = y.style.left.replace('px', '') * 1 + v,
        K = y.style.top.replace('px', '') * 1 + z;
      ei(A, K);
    }
    function ei(v, z) {
      (v = v < 0 ? 0 : v > H.width ? H.width : v),
        (z = z < 0 ? 0 : z > H.height ? H.height : z),
        (y.style.left = `${v}px`),
        (y.style.top = `${z}px`),
        ze(v, z),
        y.focus();
    }
    function ge(v = {}, z = {}) {
      let A = E.format;
      for (let rt in v) h[rt] = v[rt];
      for (let rt in z) h[rt] = z[rt];
      let K = _(h),
        $ = K.substring(0, 7);
      switch (
        ((y.style.color = $),
        (C.parentNode.style.color = $),
        (C.style.color = K),
        (w.style.color = K),
        (d.style.display = 'none'),
        d.offsetHeight,
        (d.style.display = ''),
        (C.nextElementSibling.style.display = 'none'),
        C.nextElementSibling.offsetHeight,
        (C.nextElementSibling.style.display = ''),
        A === 'mixed'
          ? (A = h.a === 1 ? 'hex' : 'rgb')
          : A === 'auto' && (A = Z),
        A)
      ) {
        case 'hex':
          P.value = K;
          break;
        case 'rgb':
          P.value = b(h);
          break;
        case 'hsl':
          P.value = M(S(h));
          break;
      }
      i.querySelector(`.clr-format [value="${A}"]`).checked = !0;
    }
    function ii() {
      let v = N.value * 1,
        z = y.style.left.replace('px', '') * 1,
        A = y.style.top.replace('px', '') * 1;
      (f.style.color = `hsl(${v}, 100%, 50%)`),
        (Y.style.left = `${(v / 360) * 100}%`),
        ze(z, A);
    }
    function Ge() {
      let v = k.value / 100;
      (C.style.left = `${v * 100}%`), ge({ a: v }), Nt();
    }
    function Pe(v) {
      let z = v.s / 100,
        A = v.v / 100,
        K = z * A,
        $ = v.h / 60,
        rt = K * (1 - n.abs(($ % 2) - 1)),
        dt = A - K;
      (K = K + dt), (rt = rt + dt);
      let yt = n.floor($) % 6,
        ct = [K, rt, dt, dt, rt, K][yt],
        wt = [rt, K, K, rt, dt, dt][yt],
        At = [dt, dt, rt, K, K, rt][yt];
      return {
        r: n.round(ct * 255),
        g: n.round(wt * 255),
        b: n.round(At * 255),
        a: v.a,
      };
    }
    function S(v) {
      let z = v.v / 100,
        A = z * (1 - v.s / 100 / 2),
        K;
      return (
        A > 0 && A < 1 && (K = n.round(((z - A) / n.min(A, 1 - A)) * 100)),
        { h: v.h, s: K || 0, l: n.round(A * 100), a: v.a }
      );
    }
    function g(v) {
      let z = v.r / 255,
        A = v.g / 255,
        K = v.b / 255,
        $ = n.max(z, A, K),
        rt = n.min(z, A, K),
        dt = $ - rt,
        yt = $,
        ct = 0,
        wt = 0;
      return (
        dt &&
          ($ === z && (ct = (A - K) / dt),
          $ === A && (ct = 2 + (K - z) / dt),
          $ === K && (ct = 4 + (z - A) / dt),
          $ && (wt = dt / $)),
        (ct = n.floor(ct * 60)),
        {
          h: ct < 0 ? ct + 360 : ct,
          s: n.round(wt * 100),
          v: n.round(yt * 100),
          a: v.a,
        }
      );
    }
    function p(v) {
      let z =
          /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i,
        A,
        K;
      return (
        (s.fillStyle = '#000'),
        (s.fillStyle = v),
        (A = z.exec(s.fillStyle)),
        A
          ? (K = { r: A[3] * 1, g: A[4] * 1, b: A[5] * 1, a: A[6] * 1 })
          : ((A = s.fillStyle
              .replace('#', '')
              .match(/.{2}/g)
              .map(($) => parseInt($, 16))),
            (K = { r: A[0], g: A[1], b: A[2], a: 1 })),
        K
      );
    }
    function _(v) {
      let z = v.r.toString(16),
        A = v.g.toString(16),
        K = v.b.toString(16),
        $ = '';
      if (
        (v.r < 16 && (z = '0' + z),
        v.g < 16 && (A = '0' + A),
        v.b < 16 && (K = '0' + K),
        E.alpha && (v.a < 1 || E.forceAlpha))
      ) {
        let rt = (v.a * 255) | 0;
        ($ = rt.toString(16)), rt < 16 && ($ = '0' + $);
      }
      return '#' + z + A + K + $;
    }
    function b(v) {
      return !E.alpha || (v.a === 1 && !E.forceAlpha)
        ? `rgb(${v.r}, ${v.g}, ${v.b})`
        : `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`;
    }
    function M(v) {
      return !E.alpha || (v.a === 1 && !E.forceAlpha)
        ? `hsl(${v.h}, ${v.s}%, ${v.l}%)`
        : `hsla(${v.h}, ${v.s}%, ${v.l}%, ${v.a})`;
    }
    function B() {
      (c = o),
        (f = i.createElement('div')),
        f.setAttribute('id', 'clr-picker'),
        (f.className = 'clr-picker'),
        (f.innerHTML = `<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="${E.a11y.input}"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="${E.a11y.instruction}"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="${E.a11y.hueSlider}"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="${E.a11y.alphaSlider}"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>${E.a11y.format}</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="${E.a11y.clear}">${E.clearLabel}</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="${E.a11y.close}">${E.closeLabel}</button></div><span id="clr-open-label" hidden>${E.a11y.open}</span><span id="clr-swatch-label" hidden>${E.a11y.swatch}</span>`),
        i.body.appendChild(f),
        (d = F('clr-color-area')),
        (y = F('clr-color-marker')),
        (R = F('clr-clear')),
        (D = F('clr-close')),
        (w = F('clr-color-preview')),
        (P = F('clr-color-value')),
        (N = F('clr-hue-slider')),
        (Y = F('clr-hue-marker')),
        (k = F('clr-alpha-slider')),
        (C = F('clr-alpha-marker')),
        Yt(E.el),
        _t(E.el),
        W(f, 'mousedown', (v) => {
          f.classList.remove('clr-keyboard-nav'), v.stopPropagation();
        }),
        W(d, 'mousedown', (v) => {
          W(i, 'mousemove', jt);
        }),
        W(d, 'contextmenu', (v) => {
          v.preventDefault();
        }),
        W(d, 'touchstart', (v) => {
          i.addEventListener('touchmove', jt, { passive: !1 });
        }),
        W(y, 'mousedown', (v) => {
          W(i, 'mousemove', jt);
        }),
        W(y, 'touchstart', (v) => {
          i.addEventListener('touchmove', jt, { passive: !1 });
        }),
        W(P, 'change', (v) => {
          let z = P.value;
          if (I || E.inline) {
            let A = z === '' ? z : bt(z);
            Nt(A);
          }
        }),
        W(R, 'click', (v) => {
          Nt(''), mt();
        }),
        W(D, 'click', (v) => {
          Nt(), mt();
        }),
        W(F('clr-format'), 'click', '.clr-format input', (v) => {
          (Z = v.target.value), ge(), Nt();
        }),
        W(f, 'click', '.clr-swatches button', (v) => {
          bt(v.target.textContent), Nt(), E.swatchesOnly && mt();
        }),
        W(i, 'mouseup', (v) => {
          i.removeEventListener('mousemove', jt);
        }),
        W(i, 'touchend', (v) => {
          i.removeEventListener('touchmove', jt);
        }),
        W(i, 'mousedown', (v) => {
          (j = !1), f.classList.remove('clr-keyboard-nav'), mt();
        }),
        W(i, 'keydown', (v) => {
          let z = v.key,
            A = v.target,
            K = v.shiftKey;
          if (
            (z === 'Escape'
              ? mt(!0)
              : [
                  'Tab',
                  'ArrowUp',
                  'ArrowDown',
                  'ArrowLeft',
                  'ArrowRight',
                ].includes(z) &&
                ((j = !0), f.classList.add('clr-keyboard-nav')),
            z === 'Tab' && A.matches('.clr-picker *'))
          ) {
            let rt = q(),
              dt = rt.shift(),
              yt = rt.pop();
            K && A === dt
              ? (yt.focus(), v.preventDefault())
              : !K && A === yt && (dt.focus(), v.preventDefault());
          }
        }),
        W(i, 'click', '.clr-field button', (v) => {
          at && it(),
            v.target.nextElementSibling.dispatchEvent(
              new Event('click', { bubbles: !0 })
            );
        }),
        W(y, 'keydown', (v) => {
          let z = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
          };
          Object.keys(z).includes(v.key) &&
            (Gt(...z[v.key]), v.preventDefault());
        }),
        W(d, 'click', jt),
        W(N, 'input', ii),
        W(k, 'input', Ge);
    }
    function q() {
      return Array.from(f.querySelectorAll('input, button')).filter(
        (A) => !!A.offsetWidth
      );
    }
    function F(v) {
      return i.getElementById(v);
    }
    function W(v, z, A, K) {
      let $ = Element.prototype.matches || Element.prototype.msMatchesSelector;
      typeof A == 'string'
        ? v.addEventListener(z, (rt) => {
            $.call(rt.target, A) && K.call(rt.target, rt);
          })
        : ((K = A), v.addEventListener(z, K));
    }
    function ot(v, z) {
      (z = z !== o ? z : []),
        i.readyState !== 'loading'
          ? v(...z)
          : i.addEventListener('DOMContentLoaded', () => {
              v(...z);
            });
    }
    NodeList !== o &&
      NodeList.prototype &&
      !NodeList.prototype.forEach &&
      (NodeList.prototype.forEach = Array.prototype.forEach),
      (t.Coloris = (() => {
        let v = {
          set: ht,
          wrap: _t,
          close: mt,
          setInstance: qt,
          removeInstance: kt,
          updatePosition: pt,
          ready: ot,
        };
        function z(A) {
          ot(() => {
            A && (typeof A == 'string' ? Yt(A) : ht(A));
          });
        }
        for (let A in v)
          z[A] = (...K) => {
            ot(v[A], K);
          };
        return z;
      })()),
      ot(B);
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
          return function (n) {
            let o = new Date();
            o - i < this._map.options.almostSamplingPeriod ||
              this._layers.length === 0 ||
              ((i = o),
              this._map.fire('mousemovesample', { latlng: n.latlng }));
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
        n = this._map.options.almostDistance,
        o = [];
      return (
        typeof this.searchBuffer == 'function'
          ? (o = this.searchBuffer(t, this._buffer))
          : (o = this._layers),
        i(this._map, o, t, n, !1)
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
        var i = Object(this), n = i.length >>> 0, o = arguments[1], s = 0;
        s < n;
        s++
      )
        if (t.call(o, i[s], s, i)) return s;
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
        var i = Object(this), n = i.length >>> 0, o = arguments[1], s = 0;
        s < n;
        s++
      ) {
        var h = i[s];
        if (t.call(o, h, s, i)) return h;
      }
    };
  typeof Object.assign != 'function' &&
    (Object.assign = function (t) {
      'use strict';
      if (t == null)
        throw new TypeError('Cannot convert undefined or null to object');
      t = Object(t);
      for (var i = 1; i < arguments.length; i++) {
        var n = arguments[i];
        if (n != null)
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
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
        var n = Object(this),
          o = n.length >>> 0;
        if (o === 0) return !1;
        var s = i | 0,
          h = Math.max(s >= 0 ? s : o - Math.abs(s), 0);
        function c(f, d) {
          return (
            f === d ||
            (typeof f == 'number' &&
              typeof d == 'number' &&
              isNaN(f) &&
              isNaN(d))
          );
        }
        for (; h < o; ) {
          if (c(n[h], t)) return !0;
          h++;
        }
        return !1;
      },
    });
  var da = {
    name: '@geoman-io/leaflet-geoman-free',
    version: '2.16.0',
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
      'polygon-clipping': '0.15.3',
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
  var Gn = ee(Br());
  var Fh = {
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
  var qh = {
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
  var Zh = {
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
  var Uh = {
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
  var Vh = {
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
  var Hh = {
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
  var jh = {
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
  var Kh = {
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
  var Wh = {
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
  var Yh = {
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
  var $h = {
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
  var Xh = {
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
  var Jh = {
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
  var Qh = {
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
  var tu = {
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
  var eu = {
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
  var iu = {
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
  var ru = {
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
  var nu = {
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
  var ou = {
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
  var au = {
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
  var su = {
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
  var lu = {
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
  var hu = {
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
  var uu = {
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
  var cu = {
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
  var fu = {
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
  var $e = {
    en: Fh,
    de: qh,
    it: Zh,
    id: Uh,
    ro: Vh,
    ru: Hh,
    es: jh,
    nl: Kh,
    fr: Wh,
    pt_br: Xh,
    pt_pt: Jh,
    zh: Yh,
    zh_tw: $h,
    pl: Qh,
    sv: tu,
    el: eu,
    hu: iu,
    da: ru,
    no: nu,
    fa: ou,
    ua: au,
    tr: su,
    cz: lu,
    ja: hu,
    fi: uu,
    ko: cu,
    ky: fu,
  };
  var bv = {
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
            let n = t[i];
            this._isRelevantForEdit(n) &&
              n.pm.enable({ ...this.globalOptions });
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
    du = bv;
  var wv = {
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
            let n = t[i];
            this._isRelevantForEdit(n) &&
              n.pm.enable({ ...this.globalOptions });
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
    pu = wv;
  var xv = {
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
            let n = t[i];
            this._isRelevantForDrag(n) && n.pm.enableLayerDrag();
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
    mu = xv;
  var kv = {
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
            let n = t[i];
            this._isRelevantForRemoval(n) &&
              (n.pm.enabled() && n.pm.disable(),
              n.on('click', this.removeLayer, this));
          }
      },
      _layerAddedRemoval({ layer: t }) {
        this._addedLayersRemoval[L.stamp(t)] = t;
      },
    },
    gu = kv;
  var Mv = {
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
            let n = t[i];
            this._isRelevantForRemoval(n) && n.pm.enableRotate();
          }
      },
      _layerAddedRotate({ layer: t }) {
        this._addedLayersRotate[L.stamp(t)] = t;
      },
    },
    _u = Mv;
  var Cv = {
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
    yu = Cv;
  var vu = ee(Br()),
    Pv = {
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
      _fireCreate(t, i = 'Draw', n = {}) {
        this.__fire(
          this._map,
          'pm:create',
          { shape: this._shape, marker: t, layer: t },
          i,
          n
        );
      },
      _fireCenterPlaced(t = 'Draw', i = {}) {
        let n = t === 'Draw' ? this._layer : void 0,
          o = t !== 'Draw' ? this._layer : void 0;
        this.__fire(
          this._layer,
          'pm:centerplaced',
          {
            shape: this._shape,
            workingLayer: n,
            layer: o,
            latlng: this._layer.getLatLng(),
          },
          t,
          i
        );
      },
      _fireCut(t, i, n, o = 'Draw', s = {}) {
        this.__fire(
          t,
          'pm:cut',
          { shape: this._shape, layer: i, originalLayer: n },
          o,
          s
        );
      },
      _fireEdit(t = this._layer, i = 'Edit', n = {}) {
        this.__fire(
          t,
          'pm:edit',
          { layer: this._layer, shape: this.getShape() },
          i,
          n
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
      _fireMarkerDragStart(t, i = void 0, n = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:markerdragstart',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
          },
          n,
          o
        );
      },
      _fireMarkerDrag(t, i = void 0, n = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:markerdrag',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
          },
          n,
          o
        );
      },
      _fireMarkerDragEnd(t, i = void 0, n = void 0, o = 'Edit', s = {}) {
        this.__fire(
          this._layer,
          'pm:markerdragend',
          {
            layer: this._layer,
            markerEvent: t,
            shape: this.getShape(),
            indexPath: i,
            intersectionReset: n,
          },
          o,
          s
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
      _fireDrag(t, i = 'Edit', n = {}) {
        this.__fire(
          this._layer,
          'pm:drag',
          { ...t, shape: this.getShape() },
          i,
          n
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
      _fireRemove(t, i = t, n = 'Edit', o = {}) {
        this.__fire(t, 'pm:remove', { layer: i, shape: this.getShape() }, n, o);
      },
      _fireVertexAdded(t, i, n, o = 'Edit', s = {}) {
        this.__fire(
          this._layer,
          'pm:vertexadded',
          {
            layer: this._layer,
            workingLayer: this._layer,
            marker: t,
            indexPath: i,
            latlng: n,
            shape: this.getShape(),
          },
          o,
          s
        );
      },
      _fireVertexRemoved(t, i, n = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:vertexremoved',
          {
            layer: this._layer,
            marker: t,
            indexPath: i,
            shape: this.getShape(),
          },
          n,
          o
        );
      },
      _fireVertexClick(t, i, n = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:vertexclick',
          {
            layer: this._layer,
            markerEvent: t,
            indexPath: i,
            shape: this.getShape(),
          },
          n,
          o
        );
      },
      _fireIntersect(t, i = this._layer, n = 'Edit', o = {}) {
        this.__fire(
          i,
          'pm:intersect',
          { layer: this._layer, intersection: t, shape: this.getShape() },
          n,
          o
        );
      },
      _fireLayerReset(t, i, n = 'Edit', o = {}) {
        this.__fire(
          this._layer,
          'pm:layerreset',
          {
            layer: this._layer,
            markerEvent: t,
            indexPath: i,
            shape: this.getShape(),
          },
          n,
          o
        );
      },
      _fireChange(t, i = 'Edit', n = {}) {
        this.__fire(
          this._layer,
          'pm:change',
          { layer: this._layer, latlngs: t, shape: this.getShape() },
          i,
          n
        );
      },
      _fireTextChange(t, i = 'Edit', n = {}) {
        this.__fire(
          this._layer,
          'pm:textchange',
          { layer: this._layer, text: t, shape: this.getShape() },
          i,
          n
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
      _fireSnapDrag(t, i, n = 'Snapping', o = {}) {
        this.__fire(t, 'pm:snapdrag', i, n, o);
      },
      _fireSnap(t, i, n = 'Snapping', o = {}) {
        this.__fire(t, 'pm:snap', i, n, o);
      },
      _fireUnsnap(t, i, n = 'Snapping', o = {}) {
        this.__fire(t, 'pm:unsnap', i, n, o);
      },
      _fireRotationEnable(t, i, n = 'Rotation', o = {}) {
        this.__fire(
          t,
          'pm:rotateenable',
          {
            layer: this._layer,
            helpLayer: this._rotatePoly,
            shape: this.getShape(),
          },
          n,
          o
        );
      },
      _fireRotationDisable(t, i = 'Rotation', n = {}) {
        this.__fire(
          t,
          'pm:rotatedisable',
          { layer: this._layer, shape: this.getShape() },
          i,
          n
        );
      },
      _fireRotationStart(t, i, n = 'Rotation', o = {}) {
        this.__fire(
          t,
          'pm:rotatestart',
          {
            layer: this._rotationLayer,
            helpLayer: this._layer,
            startAngle: this._startAngle,
            originLatLngs: i,
          },
          n,
          o
        );
      },
      _fireRotation(t, i, n, o = this._rotationLayer, s = 'Rotation', h = {}) {
        this.__fire(
          t,
          'pm:rotate',
          {
            layer: o,
            helpLayer: this._layer,
            startAngle: this._startAngle,
            angle: o.pm.getAngle(),
            angleDiff: i,
            oldLatLngs: n,
            newLatLngs: o.getLatLngs(),
          },
          s,
          h
        );
      },
      _fireRotationEnd(t, i, n, o = 'Rotation', s = {}) {
        this.__fire(
          t,
          'pm:rotateend',
          {
            layer: this._rotationLayer,
            helpLayer: this._layer,
            startAngle: i,
            angle: this._rotationLayer.pm.getAngle(),
            originLatLngs: n,
            newLatLngs: this._rotationLayer.getLatLngs(),
          },
          o,
          s
        );
      },
      _fireActionClick(t, i, n, o = 'Toolbar', s = {}) {
        this.__fire(
          this._map,
          'pm:actionclick',
          { text: t.text, action: t, btnName: i, button: n },
          o,
          s
        );
      },
      _fireButtonClick(t, i, n = 'Toolbar', o = {}) {
        this.__fire(
          this._map,
          'pm:buttonclick',
          { btnName: t, button: i },
          n,
          o
        );
      },
      _fireLangChange(t, i, n, o, s = 'Global', h = {}) {
        this.__fire(
          this.map,
          'pm:langchange',
          { oldLang: t, activeLang: i, fallback: n, translations: o },
          s,
          h
        );
      },
      _fireGlobalDragModeToggled(t, i = 'Global', n = {}) {
        this.__fire(
          this.map,
          'pm:globaldragmodetoggled',
          { enabled: t, map: this.map },
          i,
          n
        );
      },
      _fireGlobalEditModeToggled(t, i = 'Global', n = {}) {
        this.__fire(
          this.map,
          'pm:globaleditmodetoggled',
          { enabled: t, map: this.map },
          i,
          n
        );
      },
      _fireGlobalArrowEditModeToggled(t, i = 'Global', n = {}) {
        this.__fire(
          this.map,
          'pm:globalarroweditmodetoggled',
          { enabled: t, map: this.map },
          i,
          n
        );
      },
      _fireGlobalRemovalModeToggled(t, i = 'Global', n = {}) {
        this.__fire(
          this.map,
          'pm:globalremovalmodetoggled',
          { enabled: t, map: this.map },
          i,
          n
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
      _fireColorChangeEnable(t, i = 'ColorChange', n = {}) {
        this.__fire(
          t,
          'pm:colorchangeenable',
          { layer: this._layer, shape: this.getShape() },
          i,
          n
        );
      },
      _fireColorChangeDisable(t, i = 'ColorChange', n = {}) {
        this.__fire(
          t,
          'pm:colorchangedisable',
          { layer: this._layer, shape: this.getShape() },
          i,
          n
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
      _fireColorChanged(t, i = 'Draw', n = {}) {
        this.__fire(this.map, 'pm:colorchanged', { activeColor: t }, i, n);
      },
      _fireRemoveLayerGroup(t, i = t, n = 'Edit', o = {}) {
        this.__fire(t, 'pm:remove', { layer: i, shape: void 0 }, n, o);
      },
      _fireKeyeventEvent(t, i, n, o = 'Global', s = {}) {
        this.__fire(
          this.map,
          'pm:keyevent',
          { event: t, eventType: i, focusOn: n },
          o,
          s
        );
      },
      _fireArrowheadDrawChangeEvent(t, i = 'Draw', n = {}) {
        this.__fire(
          this._layer,
          'pm:arrowdrawchange',
          { layer: this._layer, arrowheadOptions: t, shape: this.getShape() },
          i,
          n
        );
      },
      _fireArrowheadEditChangeEvent(t, i = 'Edit', n = {}) {
        this.__fire(
          this._layer,
          'pm:arroweditchange',
          { layer: this._layer, arrowheadOptions: t, shape: this.getShape() },
          i,
          n
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
      __fire(t, i, n, o, s = {}) {
        (n = (0, vu.default)(n, s, { source: o })),
          L.PM.Utils._fireEvent(t, i, n);
      },
    },
    Be = Pv;
  var Ev = {
      drawArrowLineDialogInit(t = {}) {
        let i = {
          size: [200, 268],
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
        <h3 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h3>
        <hr>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='draw-arrow-filled' ${t.fill ? 'checked' : ''}>
          <label class='form-check-label cursor-pointer' for='draw-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='draw-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='draw-arrow-frequency' min='50' max='200' value='${this._setDrawArrowLineSelectorValue(t.frequency)}' style='direction: rtl;'>
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
        let i;
        return (
          t === 200
            ? (i = 'endonly')
            : t >= 120 && t <= 130
              ? (i = 'allvertices')
              : (i = `${t}px`),
          i
        );
      },
      _setDrawArrowLineSelectorValue(t = '') {
        let i = t.replace('px', '') || 'endonly',
          n = Number.isNaN(+i);
        return i === 'endonly'
          ? 200
          : i === 'allvertices'
            ? 125
            : n
              ? i >= 120 && i <= 130
                ? 125
                : +i
              : i;
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
    Xe = Ev;
  var Sv = {
      editArrowLineDialogInit(t = {}) {
        let i = {
          size: [200, 268],
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
          n = t.fill ? 'checked' : '';
        return `
      <div style='padding: 0 1rem;'>
        <h3 style='margin-top: 0; margin-bottom: 0;'>Arrow Settings</h3>
        <hr>
        <div class='form-switch form-check cursor-pointer ${t.showArrowToggle ? '' : 'd-none'}'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-enabled' checked>
          <label class='form-check-label cursor-pointer' for='edit-arrow-enabled'>Enable Arrows</label>
        </div>
        <div class='form-switch form-check cursor-pointer arrow-visible-prop'>
          <input class='form-check-input my-auto me-2 cursor-pointer' type='checkbox' role='switch' id='edit-arrow-filled' ${n}>
          <label class='form-check-label cursor-pointer' for='edit-arrow-filled'>Line / Filled</label>
        </div>
        <div class='arrow-visible-prop' style='margin-bottom: 0.5rem;'>
          <label for='edit-arrow-frequency' class='form-label'>Arrow Spacing</label>
          <input type='range' class='form-range' id='edit-arrow-frequency' min='50' max='200' value='${this._setEditArrowLineSelectorValue(t.frequency)}' style='direction: rtl;'>
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
        let i;
        return (
          t === 200
            ? (i = 'endonly')
            : t >= 120 && t <= 130
              ? (i = 'allvertices')
              : (i = `${t}px`),
          i
        );
      },
      _setEditArrowLineSelectorValue(t = '') {
        let i = t.replace('px', '') || 'endonly',
          n = Number.isNaN(+i);
        return i === 'endonly'
          ? 200
          : i === 'allvertices'
            ? 125
            : n
              ? i >= 120 && i <= 130
                ? 125
                : +i
              : i;
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
    On = Sv;
  var Tv = {
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
          onChange: (n) => {
            let o = { color: n };
            t.pm.setGlobalStyle({
              activeColor: n,
              templineStyle: o,
              hintlineStyle: { ...o, dashArray: '5,5' },
              pathOptions: o,
            }),
              t.pm._fireColorChanged(i.activeColor, 'Global');
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
    Je = Tv;
  var Dv = () => ({
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
        let n = { event: t, eventType: t.type, focusOn: i };
        (this._lastEvents[t.type] = n),
          (this._lastEvents.current = n),
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
    Lu = Dv;
  var In = ee($i());
  function lt(t) {
    let i = L.PM.activeLang;
    return (0, In.default)($e[i], t) || (0, In.default)($e.en, t) || t;
  }
  function Xi(t) {
    for (let i = 0; i < t.length; i += 1) {
      let n = t[i];
      if (Array.isArray(n)) {
        if (Xi(n)) return !0;
      } else if (n != null && n !== '') return !0;
    }
    return !1;
  }
  function Ji(t) {
    return t.reduce((i, n) => {
      if (n.length !== 0) {
        let o = Array.isArray(n) ? Ji(n) : n;
        Array.isArray(o) ? o.length !== 0 && i.push(o) : i.push(o);
      }
      return i;
    }, []);
  }
  function mL(t, i, n) {
    let o = { a: L.CRS.Earth.R, b: 63567523142e-4, f: 0.0033528106647474805 },
      { a: s, b: h, f: c } = o,
      f = t.lng,
      d = t.lat,
      y = n,
      w = Math.PI,
      P = (i * w) / 180,
      R = Math.sin(P),
      D = Math.cos(P),
      N = (1 - c) * Math.tan((d * w) / 180),
      Y = 1 / Math.sqrt(1 + N * N),
      k = N * Y,
      C = Math.atan2(N, D),
      I = Y * R,
      Z = 1 - I * I,
      V = (Z * (s * s - h * h)) / (h * h),
      j = 1 + (V / 16384) * (4096 + V * (-768 + V * (320 - 175 * V))),
      H = (V / 1024) * (256 + V * (-128 + V * (74 - 47 * V))),
      E = y / (h * j),
      tt = 2 * Math.PI,
      X,
      et,
      at;
    for (; Math.abs(E - tt) > 1e-12; ) {
      (X = Math.cos(2 * C + E)), (et = Math.sin(E)), (at = Math.cos(E));
      let pt =
        H *
        et *
        (X +
          (H / 4) *
            (at * (-1 + 2 * X * X) -
              (H / 6) * X * (-3 + 4 * et * et) * (-3 + 4 * X * X)));
      (tt = E), (E = y / (h * j) + pt);
    }
    let ht = k * et - Y * at * D,
      qt = Math.atan2(
        k * at + Y * et * D,
        (1 - c) * Math.sqrt(I * I + ht * ht)
      ),
      kt = Math.atan2(et * R, Y * at - k * et * D),
      Dt = (c / 16) * Z * (4 + c * (4 - 3 * Z)),
      it =
        kt -
        (1 - Dt) * c * I * (E + Dt * et * (X + Dt * at * (-1 + 2 * X * X))),
      Yt = f + (it * 180) / w,
      Q = (qt * 180) / w;
    return L.latLng(Yt, Q);
  }
  function zn(t, i, n, o, s = !0) {
    let h,
      c,
      f,
      d = [];
    for (let y = 0; y < n; y += 1) {
      if (s)
        (h = (y * 360) / n + o),
          (c = mL(t, h, i)),
          (f = L.latLng(c.lng, c.lat));
      else {
        let w = t.lat + Math.cos((2 * y * Math.PI) / n) * i,
          P = t.lng + Math.sin((2 * y * Math.PI) / n) * i;
        f = L.latLng(w, P);
      }
      d.push(f);
    }
    return d;
  }
  function gL(t, i, n) {
    i = (i + 360) % 360;
    let o = Math.PI / 180,
      s = 180 / Math.PI,
      { R: h } = L.CRS.Earth,
      c = t.lng * o,
      f = t.lat * o,
      d = i * o,
      y = Math.sin(f),
      w = Math.cos(f),
      P = Math.cos(n / h),
      R = Math.sin(n / h),
      D = Math.asin(y * P + w * R * Math.cos(d)),
      N = c + Math.atan2(Math.sin(d) * R * w, P - y * Math.sin(D));
    N *= s;
    let Y = N - 360,
      k = N < -180 ? N + 360 : N;
    return (N = N > 180 ? Y : k), L.latLng([D * s, N]);
  }
  function Qi(t, i, n) {
    let o = t.latLngToContainerPoint(i),
      s = t.latLngToContainerPoint(n),
      h = (Math.atan2(s.y - o.y, s.x - o.x) * 180) / Math.PI + 90;
    return (h += h < 0 ? 360 : 0), h;
  }
  function Li(t, i, n, o) {
    let s = Qi(t, i, n);
    return gL(i, s, o);
  }
  function Wu(t, i, n = 'asc') {
    if (!i || Object.keys(i).length === 0) return (d, y) => d - y;
    let o = Object.keys(i),
      s,
      h = o.length - 1,
      c = {};
    for (; h >= 0; ) (s = o[h]), (c[s.toLowerCase()] = i[s]), (h -= 1);
    function f(d) {
      if (d instanceof L.Marker) return 'Marker';
      if (d instanceof L.Circle) return 'Circle';
      if (d instanceof L.CircleMarker) return 'CircleMarker';
      if (d instanceof L.Rectangle) return 'Rectangle';
      if (d instanceof L.Polygon) return 'Polygon';
      if (d instanceof L.Polyline) return 'Line';
    }
    return (d, y) => {
      let w, P;
      if (t === 'instanceofShape') {
        if (
          ((w = f(d.layer).toLowerCase()),
          (P = f(y.layer).toLowerCase()),
          !w || !P)
        )
          return 0;
      } else {
        if (!d.hasOwnProperty(t) || !y.hasOwnProperty(t)) return 0;
        (w = d[t].toLowerCase()), (P = y[t].toLowerCase());
      }
      let R = w in c ? c[w] : Number.MAX_SAFE_INTEGER,
        D = P in c ? c[P] : Number.MAX_SAFE_INTEGER,
        N = 0;
      return R < D ? (N = -1) : R > D && (N = 1), n === 'desc' ? N * -1 : N;
    };
  }
  function fe(t, i = t.getLatLngs()) {
    return t instanceof L.Polygon
      ? L.polygon(i).getLatLngs()
      : L.polyline(i).getLatLngs();
  }
  function Nn(t, i) {
    if (i.options.crs?.projection?.MAX_LATITUDE) {
      let n = i.options.crs?.projection?.MAX_LATITUDE;
      t.lat = Math.max(Math.min(n, t.lat), -n);
    }
    return t;
  }
  function Ae(t) {
    return (
      t.options.renderer ||
      (t._map &&
        (t._map._getPaneRenderer(t.options.pane) ||
          t._map.options.renderer ||
          t._map._renderer)) ||
      t._renderer
    );
  }
  var _L = L.Class.extend({
      includes: [du, pu, mu, gu, _u, yu, Be, Je, Xe, On],
      initialize(t) {
        (this.map = t),
          (this.Draw = new L.PM.Draw(t)),
          (this.Toolbar = new L.PM.Toolbar(t)),
          (this.Keyboard = Lu()),
          (this.Dialog = { ...Xe, ...Je, ...On }),
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
      setLang(t = 'en', i, n = 'en') {
        let o = L.PM.activeLang;
        i && ($e[t] = (0, Gn.default)($e[n], i)),
          (L.PM.activeLang = t),
          this.map.pm.Toolbar.reinit(),
          this._fireLangChange(o, t, n, $e[t]);
      },
      addControls(t) {
        this.Toolbar.addControls(t);
      },
      removeControls() {
        this.Toolbar.removeControls();
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
        let n = i.ignoreShapes || [],
          o = i.merge || !1;
        this.map.pm.Draw.shapes.forEach((s) => {
          n.indexOf(s) === -1 && this.map.pm.Draw[s].setPathOptions(t, o);
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
        let i = (0, Gn.default)(this.globalOptions, t);
        i.editable &&
          ((i.resizeableCircleMarker = i.editable), delete i.editable);
        let n = !1;
        this.map.pm.Draw.CircleMarker.enabled() &&
          !!this.map.pm.Draw.CircleMarker.options.resizeableCircleMarker !=
            !!i.resizeableCircleMarker &&
          (this.map.pm.Draw.CircleMarker.disable(), (n = !0));
        let o = !1;
        this.map.pm.Draw.Circle.enabled() &&
          !!this.map.pm.Draw.Circle.options.resizableCircle !=
            !!i.resizableCircle &&
          (this.map.pm.Draw.Circle.disable(), (o = !0)),
          this.map.pm.Draw.shapes.forEach((h) => {
            this.map.pm.Draw[h].setOptions(i);
          }),
          n && this.map.pm.Draw.CircleMarker.enable(),
          o && this.map.pm.Draw.Circle.enable(),
          L.PM.Utils.findLayers(this.map).forEach((h) => {
            h.pm.setOptions(i);
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
        let n = L.featureGroup();
        return (
          (n._pmTempLayer = !0),
          i.forEach((o) => {
            n.addLayer(o);
          }),
          n
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
        let n = L.featureGroup();
        return (
          (n._pmTempLayer = !0),
          i.forEach((o) => {
            n.addLayer(o);
          }),
          n
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
              i.pm._markerGroup.eachLayer((n) => {
                let o = n.getIcon();
                (o.options.className = 'marker-icon'), n.setIcon(o);
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
        Ae(this.map)._onMouseMove(this._createMouseEvent('mousemove', t));
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
          i && Ae(this.map)._onClick(this._createMouseEvent(i, t));
      },
      _createMouseEvent(t, i) {
        let n,
          o = i.touches[0] || i.changedTouches[0];
        try {
          n = new MouseEvent(t, {
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
          (n = document.createEvent('MouseEvents')),
            n.initMouseEvent(
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
        return n;
      },
    }),
    Yu = _L;
  var Ju = ee(Xu());
  var vL = L.Control.extend({
      includes: [Be, Je],
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
          (this.buttonsDomNode = this._makeButton(this._button)),
          this._container.appendChild(this.buttonsDomNode),
          this._container
        );
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
          n = L.DomUtil.create(
            'div',
            `button-container  ${i}`,
            this._container
          );
        t.title && n.setAttribute('title', t.title);
        let o = L.DomUtil.create('a', 'leaflet-buttons-control-button', n);
        o.setAttribute('role', 'button'),
          o.setAttribute('tabindex', '0'),
          (o.href = '#');
        let s = L.DomUtil.create('div', `leaflet-pm-actions-container ${i}`, n),
          h = t.actions,
          c = {
            cancel: {
              text: lt('actions.cancel'),
              onClick() {
                this._triggerClick();
              },
              title: lt('actions.cancel'),
            },
            finishMode: {
              text: lt('actions.finish'),
              onClick() {
                this._triggerClick();
              },
              title: lt('actions.finish'),
            },
            removeLastVertex: {
              text: lt('actions.removeLastVertex'),
              onClick() {
                this._map.pm.Draw[t.jsClass]._removeLastVertex();
              },
              title: lt('actions.removeLastVertex'),
            },
            finish: {
              text: lt('actions.finish'),
              onClick(d) {
                this._map.pm.Draw[t.jsClass]._finishShape(d);
              },
              title: lt('actions.finish'),
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
              title: lt('actions.changeColor'),
              events: [
                {
                  eventName: 'pm:colorchanged',
                  callback: (d, y) => {
                    let w = (0, Ju.default)(y.children);
                    w.style.backgroundColor = d.activeColor;
                  },
                },
              ],
            },
          };
        h.forEach((d) => {
          let y = typeof d == 'string' ? d : d.name,
            w;
          if (c[y]) w = c[y];
          else if (d.text) w = d;
          else return;
          let P = L.DomUtil.create(
            'a',
            `leaflet-pm-action ${i} action-${y}`,
            s
          );
          if (
            (P.setAttribute('role', 'button'),
            P.setAttribute('tabindex', '0'),
            w.title && P.setAttribute('title', w.title),
            (P.href = '#'),
            (P.innerHTML = w.text),
            L.DomEvent.disableClickPropagation(P),
            L.DomEvent.on(P, 'click', L.DomEvent.stop),
            w.events &&
              w.events?.forEach((R) => {
                this._map.on(
                  R.eventName,
                  (D) => {
                    R.callback(D, P);
                  },
                  w
                );
              }),
            !t.disabled && w.onClick)
          ) {
            let R = (D) => {
              D.preventDefault();
              let N = '',
                { buttons: Y } = this._map.pm.Toolbar;
              for (let k in Y)
                if (Y[k]._button === t) {
                  N = k;
                  break;
                }
              this._fireActionClick(w, N, t);
            };
            L.DomEvent.addListener(P, 'click', R, this),
              L.DomEvent.addListener(P, 'click', w.onClick, this);
          }
        }),
          t.toggleStatus && L.DomUtil.addClass(n, 'active');
        let f = L.DomUtil.create('div', 'control-icon', o);
        return (
          t.iconUrl && f.setAttribute('src', t.iconUrl),
          t.className && L.DomUtil.addClass(f, t.className),
          L.DomEvent.disableClickPropagation(o),
          L.DomEvent.on(o, 'click', L.DomEvent.stop),
          t.disabled ||
            (L.DomEvent.addListener(o, 'click', this._onBtnClick, this),
            L.DomEvent.addListener(o, 'click', this._triggerClick, this)),
          t.disabled &&
            (L.DomUtil.addClass(o, 'pm-disabled'),
            o.setAttribute('aria-disabled', 'true')),
          n
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
        for (let n in i)
          if (i[n]._button === this._button) {
            t = n;
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
    Qu = vL;
  L.Control.PMButton = Qu;
  var LL = L.Class.extend({
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
        for (let n in t) {
          let o = t[n];
          L.Util.setOptions(o, { className: i.geomanIcons[n] });
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
          (this.options[t] = this.options[t] || !1),
          this.buttons[t]
        );
      },
      triggerClickOnToggledButtons(t) {
        for (let i in this.buttons) {
          let n = this.buttons[i];
          n._button.disableByOtherButtons &&
            n !== t &&
            n.toggled() &&
            n._triggerClick();
        }
      },
      toggleButton(t, i, n = !0) {
        return (
          t === 'editPolygon' && (t = 'editMode'),
          t === 'deleteLayer' && (t = 'removalMode'),
          n && this.triggerClickOnToggledButtons(this.buttons[t]),
          this.buttons[t] ? this.buttons[t].toggle(i) : !1
        );
      },
      _defineButtons() {
        let t = {
            className: 'control-icon leaflet-pm-icon-marker',
            title: lt('buttonTitles.drawMarkerButton'),
            jsClass: 'Marker',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel'],
          },
          i = {
            title: lt('buttonTitles.drawPolyButton'),
            className: 'control-icon leaflet-pm-icon-polygon',
            jsClass: 'Polygon',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          n = {
            className: 'control-icon leaflet-pm-icon-polyline',
            title: lt('buttonTitles.drawLineButton'),
            jsClass: 'Line',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          o = {
            className: 'control-icon leaflet-pm-icon-arrowline',
            title: lt('buttonTitles.drawArrowLineButton'),
            jsClass: 'ArrowLine',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['finish', 'removeLastVertex', 'cancel', 'changeColor'],
          },
          s = {
            title: lt('buttonTitles.drawCircleButton'),
            className: 'control-icon leaflet-pm-icon-circle',
            jsClass: 'Circle',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          h = {
            title: lt('buttonTitles.drawCircleMarkerButton'),
            className: 'control-icon leaflet-pm-icon-circle-marker',
            jsClass: 'CircleMarker',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          c = {
            title: lt('buttonTitles.drawRectButton'),
            className: 'control-icon leaflet-pm-icon-rectangle',
            jsClass: 'Rectangle',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel', 'changeColor'],
          },
          f = {
            title: lt('buttonTitles.editButton'),
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
            title: lt('buttonTitles.editArrowLineButton'),
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
          y = {
            className: 'control-icon leaflet-pm-icon-change-color',
            title: lt('buttonTitles.changeColorButton'),
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
          w = {
            title: lt('buttonTitles.dragButton'),
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
          P = {
            title: lt('buttonTitles.cutButton'),
            className: 'control-icon leaflet-pm-icon-cut',
            jsClass: 'Cut',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle({
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
          R = {
            title: lt('buttonTitles.deleteButton'),
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
          D = {
            title: lt('buttonTitles.rotateButton'),
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
          N = {
            className: 'control-icon leaflet-pm-icon-text',
            title: lt('buttonTitles.drawTextButton'),
            jsClass: 'Text',
            onClick: () => {},
            afterClick: (Y, k) => {
              this.map.pm.Draw[k.button._button.jsClass].toggle();
            },
            doToggle: !0,
            toggleStatus: !1,
            disableOtherButtons: !0,
            position: this.options.position,
            actions: ['cancel'],
          };
        this._addButton('drawMarker', new L.Control.PMButton(t)),
          this._addButton('drawPolyline', new L.Control.PMButton(n)),
          this._addButton('drawArrowLine', new L.Control.PMButton(o)),
          this._addButton('drawRectangle', new L.Control.PMButton(c)),
          this._addButton('drawPolygon', new L.Control.PMButton(i)),
          this._addButton('drawCircle', new L.Control.PMButton(s)),
          this._addButton('drawCircleMarker', new L.Control.PMButton(h)),
          this._addButton('drawText', new L.Control.PMButton(N)),
          this._addButton('editMode', new L.Control.PMButton(f)),
          this._addButton('arrowEditMode', new L.Control.PMButton(d)),
          this._addButton('colorChangeMode', new L.Control.PMButton(y)),
          this._addButton('dragMode', new L.Control.PMButton(w)),
          this._addButton('cutPolygon', new L.Control.PMButton(P)),
          this._addButton('removalMode', new L.Control.PMButton(R)),
          this._addButton('rotateMode', new L.Control.PMButton(D));
      },
      _showHideButtons() {
        if (!this.isVisible) return;
        this.removeControls(), (this.isVisible = !0);
        let t = this.getButtons(),
          i = [];
        this.options.drawControls === !1 &&
          (i = i.concat(Object.keys(t).filter((n) => !t[n]._button.tool))),
          this.options.editControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((n) => t[n]._button.tool === 'edit')
            )),
          this.options.optionsControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((n) => t[n]._button.tool === 'options')
            )),
          this.options.customControls === !1 &&
            (i = i.concat(
              Object.keys(t).filter((n) => t[n]._button.tool === 'custom')
            ));
        for (let n in t)
          if (this.options[n] && i.indexOf(n) === -1) {
            let o = t[n]._button.tool;
            o || (o = 'draw'),
              t[n].setPosition(this._getBtnPosition(o)),
              t[n].addTo(this.map);
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
        let n = this._btnNameMapping(t);
        if (!i.name) throw new TypeError('Button has no name');
        if (this.buttons[i.name])
          throw new TypeError('Button with this name already exists');
        let o = this.map.pm.Draw.createNewDrawInstance(i.name, n);
        i = { ...this.buttons[n]._button, ...i };
        let h = this.createCustomControl(i);
        return { drawInstance: o, control: h };
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
        let n = this._addButton(t.name, new L.Control.PMButton(i));
        return this.changeControlOrder(), n;
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
          for (let n in this.getButtons()) {
            let o = this.getButtons()[n];
            (o._button.tool === t || (t === 'draw' && !o._button.tool)) &&
              (i[n] = o);
          }
        return i;
      },
      changeControlOrder(t = []) {
        let i = this._shapeMapping(),
          n = [];
        t.forEach((y) => {
          i[y] ? n.push(i[y]) : n.push(y);
        });
        let o = this.getButtons(),
          s = {};
        n.forEach((y) => {
          o[y] && (s[y] = o[y]);
        }),
          Object.keys(o)
            .filter((y) => !o[y]._button.tool)
            .forEach((y) => {
              n.indexOf(y) === -1 && (s[y] = o[y]);
            }),
          Object.keys(o)
            .filter((y) => o[y]._button.tool === 'edit')
            .forEach((y) => {
              n.indexOf(y) === -1 && (s[y] = o[y]);
            }),
          Object.keys(o)
            .filter((y) => o[y]._button.tool === 'options')
            .forEach((y) => {
              n.indexOf(y) === -1 && (s[y] = o[y]);
            }),
          Object.keys(o)
            .filter((y) => o[y]._button.tool === 'custom')
            .forEach((y) => {
              n.indexOf(y) === -1 && (s[y] = o[y]);
            }),
          Object.keys(o).forEach((y) => {
            n.indexOf(y) === -1 && (s[y] = o[y]);
          }),
          (this.map.pm.Toolbar.buttons = s),
          this._showHideButtons();
      },
      getControlOrder() {
        let t = this.getButtons(),
          i = [];
        for (let n in t) i.push(n);
        return i;
      },
      changeActionsOfControl(t, i) {
        let n = this._btnNameMapping(t);
        if (!n) throw new TypeError('No name passed');
        if (!i) throw new TypeError('No actions passed');
        if (!this.buttons[n])
          throw new TypeError('Button with this name not exists');
        (this.buttons[n]._button.actions = i), this.changeControlOrder();
      },
      setButtonDisabled(t, i) {
        let n = this._btnNameMapping(t);
        i ? this.buttons[n].disable() : this.buttons[n].enable();
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
          EditArrowLine: 'editArrowLine',
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
    tc = LL;
  var ec = ee(Br());
  var bL = {
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
        let n = this._calcClosestLayer(i.getLatLng(), this._snapList);
        if (Object.keys(n).length === 0) return !1;
        let o =
            n.layer instanceof L.Marker ||
            n.layer instanceof L.CircleMarker ||
            !this.options.snapSegment,
          s;
        o ? (s = n.latlng) : (s = this._checkPrioritiySnapping(n));
        let h = this.options.snapDistance,
          c = {
            marker: i,
            shape: this._shape,
            snapLatLng: s,
            segment: n.segment,
            layer: this._layer,
            workingLayer: this._layer,
            layerInteractedWith: n.layer,
            distance: n.distance,
          };
        if (
          (this._fireSnapDrag(c.marker, c),
          this._fireSnapDrag(this._layer, c),
          n.distance < h)
        ) {
          (i._orgLatLng = i.getLatLng()),
            i.setLatLng(s),
            (i._snapped = !0),
            (i._snapInfo = c);
          let f = () => {
              (this._snapLatLng = s),
                this._fireSnap(i, c),
                this._fireSnap(this._layer, c);
            },
            d = this._snapLatLng || {},
            y = s || {};
          (d.lat !== y.lat || d.lng !== y.lng) && f();
        } else
          this._snapLatLng &&
            (this._unsnap(c),
            (i._snapped = !1),
            (i._snapInfo = void 0),
            this._fireUnsnap(c.marker, c),
            this._fireUnsnap(this._layer, c));
        return !0;
      },
      _createSnapList() {
        let t = [],
          i = [],
          n = this._map;
        n.off('layerremove', this._handleSnapLayerRemoval, this),
          n.on('layerremove', this._handleSnapLayerRemoval, this),
          n.eachLayer((o) => {
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
              let s = L.polyline([], { color: 'red', pmIgnore: !0 });
              (s._pmTempLayer = !0),
                i.push(s),
                (o instanceof L.Circle || o instanceof L.CircleMarker) &&
                  i.push(s);
            }
          }),
          (t = t.filter((o) => this._layer !== o)),
          (t = t.filter((o) => o._latlng || (o._latlngs && Xi(o._latlngs)))),
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
          (n) => n._leaflet_id === t._leaflet_id
        );
        i > -1 && this._snapList.splice(i, 1);
      },
      _calcClosestLayer(t, i) {
        return this._calcClosestLayers(t, i, 1)[0];
      },
      _calcClosestLayers(t, i, n = 1) {
        let o = [],
          s = {};
        i.forEach((c, f) => {
          if (c._parentCopy && c._parentCopy === this._layer) return;
          let d = this._calcLayerDistances(t, c);
          if (
            ((d.distance = Math.floor(d.distance)), this.debugIndicatorLines)
          ) {
            if (!this.debugIndicatorLines[f]) {
              let y = L.polyline([], { color: 'red', pmIgnore: !0 });
              (y._pmTempLayer = !0), (this.debugIndicatorLines[f] = y);
            }
            this.debugIndicatorLines[f].setLatLngs([t, d.latlng]);
          }
          n === 1 && (s.distance === void 0 || d.distance - 5 <= s.distance)
            ? (d.distance + 5 < s.distance && (o = []),
              (s = d),
              (s.layer = c),
              o.push(s))
            : n !== 1 && ((s = {}), (s = d), (s.layer = c), o.push(s));
        }),
          n !== 1 && (o = o.sort((c, f) => c.distance - f.distance)),
          n === -1 && (n = o.length);
        let h = this._getClosestLayerByPriority(o, n);
        return L.Util.isArray(h) ? h : [h];
      },
      _calcLayerDistances(t, i) {
        let n = this._map,
          o = i instanceof L.Marker || i instanceof L.CircleMarker,
          s = i instanceof L.Polygon,
          h = t;
        if (o) {
          let c = i.getLatLng();
          return { latlng: { ...c }, distance: this._getDistance(n, c, h) };
        }
        return this._calcLatLngDistances(h, i.getLatLngs(), n, s);
      },
      _calcLatLngDistances(t, i, n, o = !1) {
        let s,
          h,
          c,
          f = (d) => {
            d.forEach((y, w) => {
              if (Array.isArray(y)) {
                f(y);
                return;
              }
              if (this.options.snapSegment) {
                let P = y,
                  R;
                o
                  ? (R = w + 1 === d.length ? 0 : w + 1)
                  : (R = w + 1 === d.length ? void 0 : w + 1);
                let D = d[R];
                if (D) {
                  let N = this._getDistanceToSegment(n, t, P, D);
                  (h === void 0 || N < h) && ((h = N), (c = [P, D]));
                }
              } else {
                let P = this._getDistance(n, t, y);
                (h === void 0 || P < h) && ((h = P), (s = y));
              }
            });
          };
        return (
          f(i),
          this.options.snapSegment
            ? {
                latlng: { ...this._getClosestPointOnSegment(n, t, c[0], c[1]) },
                segment: c,
                distance: h,
              }
            : { latlng: s, distance: h }
        );
      },
      _getClosestLayerByPriority(t, i = 1) {
        t = t.sort((c, f) => c._leaflet_id - f._leaflet_id);
        let n = [
            'Marker',
            'CircleMarker',
            'Circle',
            'Line',
            'Polygon',
            'Rectangle',
          ],
          o = this._map.pm.globalOptions.snappingOrder || [],
          s = 0,
          h = {};
        return (
          o.concat(n).forEach((c) => {
            h[c] || ((s += 1), (h[c] = s));
          }),
          t.sort(Wu('instanceofShape', h)),
          i === 1 ? t[0] || {} : t.slice(0, i)
        );
      },
      _checkPrioritiySnapping(t) {
        let i = this._map,
          n = t.segment[0],
          o = t.segment[1],
          s = t.latlng,
          h = this._getDistance(i, n, s),
          c = this._getDistance(i, o, s),
          f = h < c ? n : o,
          d = h < c ? h : c;
        if (this.options.snapMiddle) {
          let P = L.PM.Utils.calcMiddleLatLng(i, n, o),
            R = this._getDistance(i, P, s);
          R < h && R < c && ((f = P), (d = R));
        }
        let y = this.options.snapDistance,
          w;
        return d < y ? (w = f) : (w = s), { ...w };
      },
      _unsnap() {
        delete this._snapLatLng;
      },
      _getClosestPointOnSegment(t, i, n, o) {
        let s = t.getMaxZoom();
        s === 1 / 0 && (s = t.getZoom());
        let h = t.project(i, s),
          c = t.project(n, s),
          f = t.project(o, s),
          d = L.LineUtil.closestPointOnSegment(h, c, f);
        return t.unproject(d, s);
      },
      _getDistanceToSegment(t, i, n, o) {
        let s = t.latLngToLayerPoint(i),
          h = t.latLngToLayerPoint(n),
          c = t.latLngToLayerPoint(o);
        return L.LineUtil.pointToSegmentDistance(s, h, c);
      },
      _getDistance(t, i, n) {
        return t.latLngToLayerPoint(i).distanceTo(t.latLngToLayerPoint(n));
      },
    },
    Or = bL;
  var wL = L.Class.extend({
      includes: [Or, Be, Xe],
      options: {
        snappable: !0,
        snapDistance: 20,
        snapMiddle: !1,
        allowSelfIntersection: !0,
        tooltips: !0,
        templineStyle: {},
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
          this.shapes.forEach((n) => {
            this[n] = new L.PM.Draw[n](this._map);
          }),
          this.Marker.setOptions({ continueDrawing: !0 }),
          this.CircleMarker.setOptions({ continueDrawing: !0 });
      },
      setPathOptions(t, i = !1) {
        i
          ? (this.options.pathOptions = (0, ec.default)(
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
        let n = this._getShapeFromBtnName(i);
        if (this[t]) throw new TypeError('Draw Type already exists');
        if (!L.PM.Draw[n])
          throw new TypeError(`There is no class L.PM.Draw.${n}`);
        return (
          (this[t] = new L.PM.Draw[n](this._map)),
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
    Mt = wL;
  Mt.Marker = Mt.extend({
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
            .bindTooltip(lt('tooltips.placeMarker'), {
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
        n = new L.Marker(i, this.options.markerStyle);
      this._setPane(n, 'markerPane'),
        this._finishLayer(n),
        n.pm || (n.options.draggable = !1),
        n.addTo(this._map.pm._getContainingLayer()),
        n.pm && this.options.markerEditable
          ? n.pm.enable()
          : n.dragging && n.dragging.disable(),
        this._fireCreate(n),
        this._cleanupSnapping(),
        this.options.continueDrawing || this.disable();
    },
    setStyle() {
      this.options.markerStyle?.icon &&
        this._hintMarker?.setIcon(this.options.markerStyle.icon);
    },
  });
  var Kt = 63710088e-1,
    ic = {
      centimeters: Kt * 100,
      centimetres: Kt * 100,
      degrees: Kt / 111325,
      feet: Kt * 3.28084,
      inches: Kt * 39.37,
      kilometers: Kt / 1e3,
      kilometres: Kt / 1e3,
      meters: Kt,
      metres: Kt,
      miles: Kt / 1609.344,
      millimeters: Kt * 1e3,
      millimetres: Kt * 1e3,
      nauticalmiles: Kt / 1852,
      radians: 1,
      yards: Kt * 1.0936,
    },
    vk = {
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
      radians: 1 / Kt,
      yards: 1.0936133,
    };
  function Oe(t, i, n) {
    n === void 0 && (n = {});
    var o = { type: 'Feature' };
    return (
      (n.id === 0 || n.id) && (o.id = n.id),
      n.bbox && (o.bbox = n.bbox),
      (o.properties = i || {}),
      (o.geometry = t),
      o
    );
  }
  function oe(t, i, n) {
    if ((n === void 0 && (n = {}), !t))
      throw new Error('coordinates is required');
    if (!Array.isArray(t)) throw new Error('coordinates must be an Array');
    if (t.length < 2)
      throw new Error('coordinates must be at least 2 numbers long');
    if (!Fn(t[0]) || !Fn(t[1]))
      throw new Error('coordinates must contain numbers');
    var o = { type: 'Point', coordinates: t };
    return Oe(o, i, n);
  }
  function ke(t, i, n) {
    if ((n === void 0 && (n = {}), t.length < 2))
      throw new Error('coordinates must be an array of two or more positions');
    var o = { type: 'LineString', coordinates: t };
    return Oe(o, i, n);
  }
  function ae(t, i) {
    i === void 0 && (i = {});
    var n = { type: 'FeatureCollection' };
    return (
      i.id && (n.id = i.id), i.bbox && (n.bbox = i.bbox), (n.features = t), n
    );
  }
  function rc(t, i) {
    i === void 0 && (i = 'kilometers');
    var n = ic[i];
    if (!n) throw new Error(i + ' units is invalid');
    return t * n;
  }
  function nc(t, i) {
    i === void 0 && (i = 'kilometers');
    var n = ic[i];
    if (!n) throw new Error(i + ' units is invalid');
    return t / n;
  }
  function tr(t) {
    var i = t % (2 * Math.PI);
    return (i * 180) / Math.PI;
  }
  function $t(t) {
    var i = t % 360;
    return (i * Math.PI) / 180;
  }
  function Fn(t) {
    return !isNaN(t) && t !== null && !Array.isArray(t);
  }
  function de(t) {
    var i,
      n,
      o = { type: 'FeatureCollection', features: [] };
    if (
      (t.type === 'Feature' ? (n = t.geometry) : (n = t),
      n.type === 'LineString')
    )
      i = [n.coordinates];
    else if (n.type === 'MultiLineString') i = n.coordinates;
    else if (n.type === 'MultiPolygon') i = [].concat.apply([], n.coordinates);
    else if (n.type === 'Polygon') i = n.coordinates;
    else
      throw new Error(
        'Input must be a LineString, MultiLineString, Polygon, or MultiPolygon Feature or Geometry'
      );
    return (
      i.forEach(function (s) {
        i.forEach(function (h) {
          for (var c = 0; c < s.length - 1; c++)
            for (var f = c; f < h.length - 1; f++)
              if (
                !(
                  s === h &&
                  (Math.abs(c - f) === 1 ||
                    (c === 0 &&
                      f === s.length - 2 &&
                      s[c][0] === s[s.length - 1][0] &&
                      s[c][1] === s[s.length - 1][1]))
                )
              ) {
                var d = xL(
                  s[c][0],
                  s[c][1],
                  s[c + 1][0],
                  s[c + 1][1],
                  h[f][0],
                  h[f][1],
                  h[f + 1][0],
                  h[f + 1][1]
                );
                d && o.features.push(oe([d[0], d[1]]));
              }
        });
      }),
      o
    );
  }
  function xL(t, i, n, o, s, h, c, f) {
    var d,
      y,
      w,
      P,
      R,
      D = { x: null, y: null, onLine1: !1, onLine2: !1 };
    return (
      (d = (f - h) * (n - t) - (c - s) * (o - i)),
      d === 0
        ? D.x !== null && D.y !== null
          ? D
          : !1
        : ((y = i - h),
          (w = t - s),
          (P = (c - s) * y - (f - h) * w),
          (R = (n - t) * y - (o - i) * w),
          (y = P / d),
          (w = R / d),
          (D.x = t + y * (n - t)),
          (D.y = i + y * (o - i)),
          y >= 0 && y <= 1 && (D.onLine1 = !0),
          w >= 0 && w <= 1 && (D.onLine2 = !0),
          D.onLine1 && D.onLine2 ? [D.x, D.y] : !1)
    );
  }
  Mt.Line = Mt.extend({
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
            .bindTooltip(lt('tooltips.firstVertex'), {
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
        let n = t;
        (n.target = this._hintMarker), this._handleSnapping(n);
      }
      this.options.allowSelfIntersection ||
        this._handleSelfIntersection(!0, this._hintMarker.getLatLng());
      let i = this._layer._defaultShape().slice();
      i.push(this._hintMarker.getLatLng()), this._change(i);
    },
    hasSelfIntersection() {
      return de(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersection(t, i) {
      let n = L.polyline(this._layer.getLatLngs());
      t && (i || (i = this._hintMarker.getLatLng()), n.addLatLng(i));
      let o = de(n.toGeoJSON(15));
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
        n = this._layer.getLatLngs(),
        o = n[n.length - 1];
      if (i.equals(n[0]) || (n.length > 0 && i.equals(o))) {
        this._finishShape();
        return;
      }
      (this._layer._latlngInfo = this._layer._latlngInfo || []),
        this._layer._latlngInfo.push({
          latlng: i,
          snapInfo: this._hintMarker._snapInfo,
        }),
        this._layer.addLatLng(i);
      let s = this._createMarker(i);
      this._setTooltipText(),
        this._setHintLineAfterNewVertex(i),
        this._fireVertexAdded(s, void 0, i, 'Draw'),
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
        n = t[t.length - 1],
        { indexPath: o } = L.PM.Utils.findDeepMarkerIndex(t, n);
      t.pop(), this._layerGroup.removeLayer(n);
      let s = t[t.length - 1],
        h = i.indexOf(s.getLatLng());
      (i = i.slice(0, h + 1)),
        this._layer.setLatLngs(i),
        this._layer._latlngInfo.pop(),
        this._syncHintLine(),
        this._setTooltipText(),
        this._fireVertexRemoved(n, o, 'Draw'),
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
        ? (i = lt('tooltips.continueLine'))
        : (i = lt('tooltips.finishLine')),
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
  Mt.ArrowLine = Mt.extend({
    initialize(t) {
      (this._map = t),
        (this._shape = 'ArrowLine'),
        (this.toolbarButtonName = 'drawArrowLine'),
        (this._doesSelfIntersect = !1),
        (this._arrowheadOptions = {
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
            .bindTooltip(lt('tooltips.firstVertex'), {
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
        let n = t;
        (n.target = this._hintMarker), this._handleSnapping(n);
      }
      this.options.allowSelfIntersection ||
        this._handleSelfIntersection(!0, this._hintMarker.getLatLng());
      let i = this._layer._defaultShape().slice();
      i.push(this._hintMarker.getLatLng()), this._change(i);
    },
    hasSelfIntersection() {
      return de(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersection(t, i) {
      let n = L.polyline(this._layer.getLatLngs()).arrowheads(
        this._arrowheadOptions
      );
      t && (i || (i = this._hintMarker.getLatLng()), n.addLatLng(i));
      let o = de(n.toGeoJSON(15));
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
        n = this._layer.getLatLngs(),
        o = n[n.length - 1];
      if (i.equals(n[0]) || (n.length > 0 && i.equals(o))) {
        this._finishShape();
        return;
      }
      (this._layer._latlngInfo = this._layer._latlngInfo || []),
        this._layer._latlngInfo.push({
          latlng: i,
          snapInfo: this._hintMarker._snapInfo,
        }),
        this._layer.addLatLng(i);
      let s = this._createMarker(i);
      this._setTooltipText(),
        this._setHintLineAfterNewVertex(i),
        this._fireVertexAdded(s, void 0, i, 'Draw'),
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
        n = t[t.length - 1],
        { indexPath: o } = L.PM.Utils.findDeepMarkerIndex(t, n);
      t.pop(), this._layerGroup.removeLayer(n);
      let s = t[t.length - 1],
        h = i.indexOf(s.getLatLng());
      (i = i.slice(0, h + 1)),
        this._layer.setLatLngs(i),
        this._layer._latlngInfo.pop(),
        this._syncHintLine(),
        this._setTooltipText(),
        this._fireVertexRemoved(n, o, 'Draw'),
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
        ? (i = lt('tooltips.continueLine'))
        : (i = lt('tooltips.finishLine')),
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
  Mt.Polygon = Mt.Line.extend({
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
        ? (i = lt('tooltips.continueLine'))
        : (i = lt('tooltips.finishPoly')),
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
  Mt.Rectangle = Mt.extend({
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
            .bindTooltip(lt('tooltips.firstVertex'), {
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
          let n = L.marker(this._map.getCenter(), {
            icon: L.divIcon({ className: 'marker-icon rect-style-marker' }),
            draggable: !1,
            zIndexOffset: 100,
          });
          this._setPane(n, 'vertexPane'),
            (n._pmTempLayer = !0),
            this._layerGroup.addLayer(n),
            this._styleMarkers.push(n);
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
          this._styleMarkers.forEach((n) => {
            L.DomUtil.addClass(n._icon, 'visible'), n.setLatLng(i);
          }),
        this._map.off('click', this._placeStartingMarkers, this),
        this._map.on('click', this._finishShape, this),
        this._hintMarker.setTooltipContent(lt('tooltips.finishRect')),
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
        let n = t;
        (n.target = this._hintMarker), this._handleSnapping(n);
      }
      let i =
        this._layerGroup && this._layerGroup.hasLayer(this._layer)
          ? this._layer.getLatLngs()
          : [this._hintMarker.getLatLng()];
      this._fireChange(i, 'Draw');
    },
    _syncRectangleSize() {
      let t = Nn(this._startMarker.getLatLng(), this._map),
        i = Nn(this._hintMarker.getLatLng(), this._map),
        n = L.PM.Utils._getRotatedRectangle(
          t,
          i,
          this.options.rectangleAngle || 0,
          this._map
        );
      if (
        (this._layer.setLatLngs(n),
        this.options.cursorMarker && this._styleMarkers)
      ) {
        let o = [];
        n.forEach((s) => {
          !s.equals(t, 1e-8) && !s.equals(i, 1e-8) && o.push(s);
        }),
          o.forEach((s, h) => {
            try {
              this._styleMarkers[h].setLatLng(s);
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
        n = this._startMarker.getLatLng();
      if (
        (this.options.requireSnapToFinish &&
          !this._hintMarker._snapped &&
          !this._isFirstLayer()) ||
        n.equals(i)
      )
        return;
      let o = L.rectangle([n, i], this.options.pathOptions);
      if (this.options.rectangleAngle) {
        let s = L.PM.Utils._getRotatedRectangle(
          n,
          i,
          this.options.rectangleAngle || 0,
          this._map
        );
        o.setLatLngs(s),
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
  Mt.CircleMarker = Mt.extend({
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
      if (
        (L.Util.setOptions(this, t),
        this.options.editable &&
          ((this.options.resizeableCircleMarker = this.options.editable),
          delete this.options.editable),
        (this._enabled = !0),
        this._map.pm.Toolbar.toggleButton(this.toolbarButtonName, !0),
        this._map.getContainer().classList.add('geoman-draw-cursor'),
        this.options[this._editableOption])
      ) {
        let i = {};
        L.extend(i, this.options.templineStyle),
          (i.radius = 0),
          (this._layerGroup = new L.FeatureGroup()),
          (this._layerGroup._pmTempLayer = !0),
          this._layerGroup.addTo(this._map),
          (this._layer = new this._BaseCircleClass(this._map.getCenter(), i)),
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
              .bindTooltip(lt('tooltips.startCircle'), {
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
              .bindTooltip(lt('tooltips.placeCircleMarker'), {
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
        this._hintMarker.setTooltipContent(lt('tooltips.finishCircle')),
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
        n = this._distanceCalculation(t, i);
      this.options[this._minRadiusOption] &&
      n < this.options[this._minRadiusOption]
        ? this._layer.setRadius(this.options[this._minRadiusOption])
        : this.options[this._maxRadiusOption] &&
            n > this.options[this._maxRadiusOption]
          ? this._layer.setRadius(this.options[this._maxRadiusOption])
          : this._layer.setRadius(n);
    },
    _syncHintMarker(t) {
      if (
        (this._hintMarker.setLatLng(t.latlng),
        this._hintMarker.setLatLng(this._getNewDestinationOfHintMarker()),
        this.options.snappable)
      ) {
        let n = t;
        (n.target = this._hintMarker), this._handleSnapping(n);
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
        n = new this._BaseCircleClass(i, {
          radius: this._defaultRadius,
          ...this.options.pathOptions,
        });
      this._setPane(n, 'layerPane'),
        this._finishLayer(n),
        n.addTo(this._map.pm._getContainingLayer()),
        this._extendingCreateMarker(n),
        this._fireCreate(n),
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
        n = this._defaultRadius;
      if (this.options[this._editableOption]) {
        let h = this._hintMarker.getLatLng();
        (n = this._distanceCalculation(i, h)),
          this.options[this._minRadiusOption] &&
          n < this.options[this._minRadiusOption]
            ? (n = this.options[this._minRadiusOption])
            : this.options[this._maxRadiusOption] &&
              n > this.options[this._maxRadiusOption] &&
              (n = this.options[this._maxRadiusOption]);
      }
      let o = { ...this.options.pathOptions, radius: n },
        s = new this._BaseCircleClass(i, o);
      this._setPane(s, 'layerPane'),
        this._finishLayer(s),
        s.addTo(this._map.pm._getContainingLayer()),
        s.pm && s.pm._updateHiddenPolyCircle(),
        this._fireCreate(s),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    _getNewDestinationOfHintMarker() {
      let t = this._hintMarker.getLatLng();
      if (this.options[this._editableOption]) {
        if (!this._layerGroup.hasLayer(this._centerMarker)) return t;
        let i = this._centerMarker.getLatLng(),
          n = this._distanceCalculation(i, t);
        this.options[this._minRadiusOption] &&
        n < this.options[this._minRadiusOption]
          ? (t = Li(this._map, i, t, this._getMinDistanceInMeter()))
          : this.options[this._maxRadiusOption] &&
            n > this.options[this._maxRadiusOption] &&
            (t = Li(this._map, i, t, this._getMaxDistanceInMeter()));
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
            n = this._distanceCalculation(t, i);
          this._layerGroup.hasLayer(this._centerMarker) &&
            (this.options[this._minRadiusOption] &&
            n < this.options[this._minRadiusOption]
              ? this._hintMarker.setLatLng(this._hintMarker._orgLatLng)
              : this.options[this._maxRadiusOption] &&
                n > this.options[this._maxRadiusOption] &&
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
  Mt.Circle = Mt.CircleMarker.extend({
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
  function Wt(t) {
    if (Array.isArray(t)) return t;
    if (t.type === 'Feature') {
      if (t.geometry !== null) return t.geometry.coordinates;
    } else if (t.coordinates) return t.coordinates;
    throw new Error(
      'coords must be GeoJSON Feature, Geometry Object or an Array'
    );
  }
  function bi(t) {
    return t.type === 'Feature' ? t.geometry : t;
  }
  function qn(t, i) {
    return t.type === 'FeatureCollection'
      ? 'FeatureCollection'
      : t.type === 'GeometryCollection'
        ? 'GeometryCollection'
        : t.type === 'Feature' && t.geometry !== null
          ? t.geometry.type
          : t.type;
  }
  function er(t, i, n) {
    if (t !== null)
      for (
        var o,
          s,
          h,
          c,
          f,
          d,
          y,
          w = 0,
          P = 0,
          R,
          D = t.type,
          N = D === 'FeatureCollection',
          Y = D === 'Feature',
          k = N ? t.features.length : 1,
          C = 0;
        C < k;
        C++
      ) {
        (y = N ? t.features[C].geometry : Y ? t.geometry : t),
          (R = y ? y.type === 'GeometryCollection' : !1),
          (f = R ? y.geometries.length : 1);
        for (var I = 0; I < f; I++) {
          var Z = 0,
            V = 0;
          if (((c = R ? y.geometries[I] : y), c !== null)) {
            d = c.coordinates;
            var j = c.type;
            switch (
              ((w = n && (j === 'Polygon' || j === 'MultiPolygon') ? 1 : 0), j)
            ) {
              case null:
                break;
              case 'Point':
                if (i(d, P, C, Z, V) === !1) return !1;
                P++, Z++;
                break;
              case 'LineString':
              case 'MultiPoint':
                for (o = 0; o < d.length; o++) {
                  if (i(d[o], P, C, Z, V) === !1) return !1;
                  P++, j === 'MultiPoint' && Z++;
                }
                j === 'LineString' && Z++;
                break;
              case 'Polygon':
              case 'MultiLineString':
                for (o = 0; o < d.length; o++) {
                  for (s = 0; s < d[o].length - w; s++) {
                    if (i(d[o][s], P, C, Z, V) === !1) return !1;
                    P++;
                  }
                  j === 'MultiLineString' && Z++, j === 'Polygon' && V++;
                }
                j === 'Polygon' && Z++;
                break;
              case 'MultiPolygon':
                for (o = 0; o < d.length; o++) {
                  for (V = 0, s = 0; s < d[o].length; s++) {
                    for (h = 0; h < d[o][s].length - w; h++) {
                      if (i(d[o][s][h], P, C, Z, V) === !1) return !1;
                      P++;
                    }
                    V++;
                  }
                  Z++;
                }
                break;
              case 'GeometryCollection':
                for (o = 0; o < c.geometries.length; o++)
                  if (er(c.geometries[o], i, n) === !1) return !1;
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
      for (var n = 0; n < t.features.length && i(t.features[n], n) !== !1; n++);
  }
  function oc(t, i, n) {
    var o = n;
    return (
      Qe(t, function (s, h) {
        h === 0 && n === void 0 ? (o = s) : (o = i(o, s, h));
      }),
      o
    );
  }
  function kL(t, i) {
    var n,
      o,
      s,
      h,
      c,
      f,
      d,
      y,
      w,
      P,
      R = 0,
      D = t.type === 'FeatureCollection',
      N = t.type === 'Feature',
      Y = D ? t.features.length : 1;
    for (n = 0; n < Y; n++) {
      for (
        f = D ? t.features[n].geometry : N ? t.geometry : t,
          y = D ? t.features[n].properties : N ? t.properties : {},
          w = D ? t.features[n].bbox : N ? t.bbox : void 0,
          P = D ? t.features[n].id : N ? t.id : void 0,
          d = f ? f.type === 'GeometryCollection' : !1,
          c = d ? f.geometries.length : 1,
          s = 0;
        s < c;
        s++
      ) {
        if (((h = d ? f.geometries[s] : f), h === null)) {
          if (i(null, R, y, w, P) === !1) return !1;
          continue;
        }
        switch (h.type) {
          case 'Point':
          case 'LineString':
          case 'MultiPoint':
          case 'Polygon':
          case 'MultiLineString':
          case 'MultiPolygon': {
            if (i(h, R, y, w, P) === !1) return !1;
            break;
          }
          case 'GeometryCollection': {
            for (o = 0; o < h.geometries.length; o++)
              if (i(h.geometries[o], R, y, w, P) === !1) return !1;
            break;
          }
          default:
            throw new Error('Unknown Geometry Type');
        }
      }
      R++;
    }
  }
  function wi(t, i) {
    kL(t, function (n, o, s, h, c) {
      var f = n === null ? null : n.type;
      switch (f) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
          return i(Oe(n, s, { bbox: h, id: c }), o, 0) === !1 ? !1 : void 0;
      }
      var d;
      switch (f) {
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
      for (var y = 0; y < n.coordinates.length; y++) {
        var w = n.coordinates[y],
          P = { type: d, coordinates: w };
        if (i(Oe(P, s), o, y) === !1) return !1;
      }
    });
  }
  function ML(t) {
    if (!t) throw new Error('geojson is required');
    var i = [];
    return (
      wi(t, function (n) {
        CL(n, i);
      }),
      ae(i)
    );
  }
  function CL(t, i) {
    var n = [],
      o = t.geometry;
    if (o !== null) {
      switch (o.type) {
        case 'Polygon':
          n = Wt(o);
          break;
        case 'LineString':
          n = [Wt(o)];
      }
      n.forEach(function (s) {
        var h = PL(s, t.properties);
        h.forEach(function (c) {
          (c.id = i.length), i.push(c);
        });
      });
    }
  }
  function PL(t, i) {
    var n = [];
    return (
      t.reduce(function (o, s) {
        var h = ke([o, s], i);
        return (h.bbox = EL(o, s)), n.push(h), s;
      }),
      n
    );
  }
  function EL(t, i) {
    var n = t[0],
      o = t[1],
      s = i[0],
      h = i[1],
      c = n < s ? n : s,
      f = o < h ? o : h,
      d = n > s ? n : s,
      y = o > h ? o : h;
    return [c, f, d, y];
  }
  var ir = ML;
  var wc = ee(to(), 1);
  function eb(t, i) {
    var n = {},
      o = [];
    if (
      (t.type === 'LineString' && (t = Oe(t)),
      i.type === 'LineString' && (i = Oe(i)),
      t.type === 'Feature' &&
        i.type === 'Feature' &&
        t.geometry !== null &&
        i.geometry !== null &&
        t.geometry.type === 'LineString' &&
        i.geometry.type === 'LineString' &&
        t.geometry.coordinates.length === 2 &&
        i.geometry.coordinates.length === 2)
    ) {
      var s = bc(t, i);
      return s && o.push(s), ae(o);
    }
    var h = (0, wc.default)();
    return (
      h.load(ir(i)),
      Qe(ir(t), function (c) {
        Qe(h.search(c), function (f) {
          var d = bc(c, f);
          if (d) {
            var y = Wt(d).join(',');
            n[y] || ((n[y] = !0), o.push(d));
          }
        });
      }),
      ae(o)
    );
  }
  function bc(t, i) {
    var n = Wt(t),
      o = Wt(i);
    if (n.length !== 2)
      throw new Error('<intersects> line1 must only contain 2 coordinates');
    if (o.length !== 2)
      throw new Error('<intersects> line2 must only contain 2 coordinates');
    var s = n[0][0],
      h = n[0][1],
      c = n[1][0],
      f = n[1][1],
      d = o[0][0],
      y = o[0][1],
      w = o[1][0],
      P = o[1][1],
      R = (P - y) * (c - s) - (w - d) * (f - h),
      D = (w - d) * (h - y) - (P - y) * (s - d),
      N = (c - s) * (h - y) - (f - h) * (s - d);
    if (R === 0) return null;
    var Y = D / R,
      k = N / R;
    if (Y >= 0 && Y <= 1 && k >= 0 && k <= 1) {
      var C = s + Y * (c - s),
        I = h + Y * (f - h);
      return oe([C, I]);
    }
    return null;
  }
  var ie = eb;
  var no = ee(to(), 1);
  function ib(t, i, n) {
    n === void 0 && (n = {});
    var o = Ut(t),
      s = Ut(i),
      h = $t(s[1] - o[1]),
      c = $t(s[0] - o[0]),
      f = $t(o[1]),
      d = $t(s[1]),
      y =
        Math.pow(Math.sin(h / 2), 2) +
        Math.pow(Math.sin(c / 2), 2) * Math.cos(f) * Math.cos(d);
    return rc(2 * Math.atan2(Math.sqrt(y), Math.sqrt(1 - y)), n.units);
  }
  var Me = ib;
  function rb(t) {
    var i = t[0],
      n = t[1],
      o = t[2],
      s = t[3],
      h = Me(t.slice(0, 2), [o, n]),
      c = Me(t.slice(0, 2), [i, s]);
    if (h >= c) {
      var f = (n + s) / 2;
      return [i, f - (o - i) / 2, o, f + (o - i) / 2];
    } else {
      var d = (i + o) / 2;
      return [d - (s - n) / 2, n, d + (s - n) / 2, s];
    }
  }
  var xc = rb;
  function eo(t) {
    var i = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return (
      er(t, function (n) {
        i[0] > n[0] && (i[0] = n[0]),
          i[1] > n[1] && (i[1] = n[1]),
          i[2] < n[0] && (i[2] = n[0]),
          i[3] < n[1] && (i[3] = n[1]);
      }),
      i
    );
  }
  eo.default = eo;
  var ti = eo;
  function nb(t, i) {
    i === void 0 && (i = {});
    var n = i.precision,
      o = i.coordinates,
      s = i.mutate;
    if (
      ((n = n == null || isNaN(n) ? 6 : n),
      (o = o == null || isNaN(o) ? 3 : o),
      !t)
    )
      throw new Error('<geojson> is required');
    if (typeof n != 'number') throw new Error('<precision> must be a number');
    if (typeof o != 'number') throw new Error('<coordinates> must be a number');
    (s === !1 || s === void 0) && (t = JSON.parse(JSON.stringify(t)));
    var h = Math.pow(10, n);
    return (
      er(t, function (c) {
        ob(c, h, o);
      }),
      t
    );
  }
  function ob(t, i, n) {
    t.length > n && t.splice(n, t.length);
    for (var o = 0; o < t.length; o++) t[o] = Math.round(t[o] * i) / i;
    return t;
  }
  var kc = nb;
  function Nr(t, i, n) {
    if ((n === void 0 && (n = {}), n.final === !0)) return ab(t, i);
    var o = Ut(t),
      s = Ut(i),
      h = $t(o[0]),
      c = $t(s[0]),
      f = $t(o[1]),
      d = $t(s[1]),
      y = Math.sin(c - h) * Math.cos(d),
      w =
        Math.cos(f) * Math.sin(d) - Math.sin(f) * Math.cos(d) * Math.cos(c - h);
    return tr(Math.atan2(y, w));
  }
  function ab(t, i) {
    var n = Nr(i, t);
    return (n = (n + 180) % 360), n;
  }
  function Gr(t, i, n, o) {
    o === void 0 && (o = {});
    var s = Ut(t),
      h = $t(s[0]),
      c = $t(s[1]),
      f = $t(n),
      d = nc(i, o.units),
      y = Math.asin(
        Math.sin(c) * Math.cos(d) + Math.cos(c) * Math.sin(d) * Math.cos(f)
      ),
      w =
        h +
        Math.atan2(
          Math.sin(f) * Math.sin(d) * Math.cos(c),
          Math.cos(d) - Math.sin(c) * Math.sin(y)
        ),
      P = tr(w),
      R = tr(y);
    return oe([P, R], o.properties);
  }
  function sb(t, i, n) {
    n === void 0 && (n = {});
    var o = oe([1 / 0, 1 / 0], { dist: 1 / 0 }),
      s = 0;
    return (
      wi(t, function (h) {
        for (var c = Wt(h), f = 0; f < c.length - 1; f++) {
          var d = oe(c[f]);
          d.properties.dist = Me(i, d, n);
          var y = oe(c[f + 1]);
          y.properties.dist = Me(i, y, n);
          var w = Me(d, y, n),
            P = Math.max(d.properties.dist, y.properties.dist),
            R = Nr(d, y),
            D = Gr(i, P, R + 90, n),
            N = Gr(i, P, R - 90, n),
            Y = ie(
              ke([D.geometry.coordinates, N.geometry.coordinates]),
              ke([d.geometry.coordinates, y.geometry.coordinates])
            ),
            k = null;
          Y.features.length > 0 &&
            ((k = Y.features[0]),
            (k.properties.dist = Me(i, k, n)),
            (k.properties.location = s + Me(d, k, n))),
            d.properties.dist < o.properties.dist &&
              ((o = d), (o.properties.index = f), (o.properties.location = s)),
            y.properties.dist < o.properties.dist &&
              ((o = y),
              (o.properties.index = f + 1),
              (o.properties.location = s + w)),
            k &&
              k.properties.dist < o.properties.dist &&
              ((o = k), (o.properties.index = f)),
            (s += w);
        }
      }),
      o
    );
  }
  var Mc = sb;
  function lb(t, i) {
    if (!t) throw new Error('line is required');
    if (!i) throw new Error('splitter is required');
    var n = qn(t),
      o = qn(i);
    if (n !== 'LineString') throw new Error('line must be LineString');
    if (o === 'FeatureCollection')
      throw new Error('splitter cannot be a FeatureCollection');
    if (o === 'GeometryCollection')
      throw new Error('splitter cannot be a GeometryCollection');
    var s = kc(i, { precision: 7 });
    switch (o) {
      case 'Point':
        return ro(t, s);
      case 'MultiPoint':
        return Cc(t, s);
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        return Cc(t, ie(t, s));
    }
  }
  function Cc(t, i) {
    var n = [],
      o = (0, no.default)();
    return (
      wi(i, function (s) {
        if (
          (n.forEach(function (f, d) {
            f.id = d;
          }),
          !n.length)
        )
          (n = ro(t, s).features),
            n.forEach(function (f) {
              f.bbox || (f.bbox = xc(ti(f)));
            }),
            o.load(ae(n));
        else {
          var h = o.search(s);
          if (h.features.length) {
            var c = Pc(s, h);
            (n = n.filter(function (f) {
              return f.id !== c.id;
            })),
              o.remove(c),
              Qe(ro(c, s), function (f) {
                n.push(f), o.insert(f);
              });
          }
        }
      }),
      ae(n)
    );
  }
  function ro(t, i) {
    var n = [],
      o = Wt(t)[0],
      s = Wt(t)[t.geometry.coordinates.length - 1];
    if (io(o, Ut(i)) || io(s, Ut(i))) return ae([t]);
    var h = (0, no.default)(),
      c = ir(t);
    h.load(c);
    var f = h.search(i);
    if (!f.features.length) return ae([t]);
    var d = Pc(i, f),
      y = [o],
      w = oc(
        c,
        function (P, R, D) {
          var N = Wt(R)[1],
            Y = Ut(i);
          return D === d.id
            ? (P.push(Y), n.push(ke(P)), io(Y, N) ? [Y] : [Y, N])
            : (P.push(N), P);
        },
        y
      );
    return w.length > 1 && n.push(ke(w)), ae(n);
  }
  function Pc(t, i) {
    if (!i.features.length) throw new Error('lines must contain features');
    if (i.features.length === 1) return i.features[0];
    var n,
      o = 1 / 0;
    return (
      Qe(i, function (s) {
        var h = Mc(s, t),
          c = h.properties.dist;
        c < o && ((n = s), (o = c));
      }),
      n
    );
  }
  function io(t, i) {
    return t[0] === i[0] && t[1] === i[1];
  }
  var Ec = lb;
  function ki(t, i, n) {
    if ((n === void 0 && (n = {}), !t)) throw new Error('point is required');
    if (!i) throw new Error('polygon is required');
    var o = Ut(t),
      s = bi(i),
      h = s.type,
      c = i.bbox,
      f = s.coordinates;
    if (c && hb(o, c) === !1) return !1;
    h === 'Polygon' && (f = [f]);
    for (var d = !1, y = 0; y < f.length && !d; y++)
      if (Sc(o, f[y][0], n.ignoreBoundary)) {
        for (var w = !1, P = 1; P < f[y].length && !w; )
          Sc(o, f[y][P], !n.ignoreBoundary) && (w = !0), P++;
        w || (d = !0);
      }
    return d;
  }
  function Sc(t, i, n) {
    var o = !1;
    i[0][0] === i[i.length - 1][0] &&
      i[0][1] === i[i.length - 1][1] &&
      (i = i.slice(0, i.length - 1));
    for (var s = 0, h = i.length - 1; s < i.length; h = s++) {
      var c = i[s][0],
        f = i[s][1],
        d = i[h][0],
        y = i[h][1],
        w =
          t[1] * (c - d) + f * (d - t[0]) + y * (t[0] - c) === 0 &&
          (c - t[0]) * (d - t[0]) <= 0 &&
          (f - t[1]) * (y - t[1]) <= 0;
      if (w) return !n;
      var P =
        f > t[1] != y > t[1] && t[0] < ((d - c) * (t[1] - f)) / (y - f) + c;
      P && (o = !o);
    }
    return o;
  }
  function hb(t, i) {
    return i[0] <= t[0] && i[1] <= t[1] && i[2] >= t[0] && i[3] >= t[1];
  }
  function ub(t, i, n) {
    n === void 0 && (n = {});
    for (var o = Ut(t), s = Wt(i), h = 0; h < s.length - 1; h++) {
      var c = !1;
      if (
        (n.ignoreEndVertices &&
          (h === 0 && (c = 'start'),
          h === s.length - 2 && (c = 'end'),
          h === 0 && h + 1 === s.length - 1 && (c = 'both')),
        cb(s[h], s[h + 1], o, c, typeof n.epsilon > 'u' ? null : n.epsilon))
      )
        return !0;
    }
    return !1;
  }
  function cb(t, i, n, o, s) {
    var h = n[0],
      c = n[1],
      f = t[0],
      d = t[1],
      y = i[0],
      w = i[1],
      P = n[0] - f,
      R = n[1] - d,
      D = y - f,
      N = w - d,
      Y = P * N - R * D;
    if (s !== null) {
      if (Math.abs(Y) > s) return !1;
    } else if (Y !== 0) return !1;
    if (o) {
      if (o === 'start')
        return Math.abs(D) >= Math.abs(N)
          ? D > 0
            ? f < h && h <= y
            : y <= h && h < f
          : N > 0
            ? d < c && c <= w
            : w <= c && c < d;
      if (o === 'end')
        return Math.abs(D) >= Math.abs(N)
          ? D > 0
            ? f <= h && h < y
            : y < h && h <= f
          : N > 0
            ? d <= c && c < w
            : w < c && c <= d;
      if (o === 'both')
        return Math.abs(D) >= Math.abs(N)
          ? D > 0
            ? f < h && h < y
            : y < h && h < f
          : N > 0
            ? d < c && c < w
            : w < c && c < d;
    } else
      return Math.abs(D) >= Math.abs(N)
        ? D > 0
          ? f <= h && h <= y
          : y <= h && h <= f
        : N > 0
          ? d <= c && c <= w
          : w <= c && c <= d;
    return !1;
  }
  var Mi = ub;
  function oo(t, i) {
    var n = bi(t),
      o = bi(i),
      s = n.type,
      h = o.type,
      c = n.coordinates,
      f = o.coordinates;
    switch (s) {
      case 'Point':
        switch (h) {
          case 'Point':
            return ao(c, f);
          default:
            throw new Error('feature2 ' + h + ' geometry not supported');
        }
      case 'MultiPoint':
        switch (h) {
          case 'Point':
            return fb(n, o);
          case 'MultiPoint':
            return db(n, o);
          default:
            throw new Error('feature2 ' + h + ' geometry not supported');
        }
      case 'LineString':
        switch (h) {
          case 'Point':
            return Mi(o, n, { ignoreEndVertices: !0 });
          case 'LineString':
            return gb(n, o);
          case 'MultiPoint':
            return pb(n, o);
          default:
            throw new Error('feature2 ' + h + ' geometry not supported');
        }
      case 'Polygon':
        switch (h) {
          case 'Point':
            return ki(o, n, { ignoreBoundary: !0 });
          case 'LineString':
            return _b(n, o);
          case 'Polygon':
            return yb(n, o);
          case 'MultiPoint':
            return mb(n, o);
          default:
            throw new Error('feature2 ' + h + ' geometry not supported');
        }
      default:
        throw new Error('feature1 ' + s + ' geometry not supported');
    }
  }
  function fb(t, i) {
    var n,
      o = !1;
    for (n = 0; n < t.coordinates.length; n++)
      if (ao(t.coordinates[n], i.coordinates)) {
        o = !0;
        break;
      }
    return o;
  }
  function db(t, i) {
    for (var n = 0, o = i.coordinates; n < o.length; n++) {
      for (var s = o[n], h = !1, c = 0, f = t.coordinates; c < f.length; c++) {
        var d = f[c];
        if (ao(s, d)) {
          h = !0;
          break;
        }
      }
      if (!h) return !1;
    }
    return !0;
  }
  function pb(t, i) {
    for (var n = !1, o = 0, s = i.coordinates; o < s.length; o++) {
      var h = s[o];
      if ((Mi(h, t, { ignoreEndVertices: !0 }) && (n = !0), !Mi(h, t)))
        return !1;
    }
    return !!n;
  }
  function mb(t, i) {
    for (var n = 0, o = i.coordinates; n < o.length; n++) {
      var s = o[n];
      if (!ki(s, t, { ignoreBoundary: !0 })) return !1;
    }
    return !0;
  }
  function gb(t, i) {
    for (var n = !1, o = 0, s = i.coordinates; o < s.length; o++) {
      var h = s[o];
      if (
        (Mi({ type: 'Point', coordinates: h }, t, { ignoreEndVertices: !0 }) &&
          (n = !0),
        !Mi({ type: 'Point', coordinates: h }, t, { ignoreEndVertices: !1 }))
      )
        return !1;
    }
    return n;
  }
  function _b(t, i) {
    var n = !1,
      o = 0,
      s = ti(t),
      h = ti(i);
    if (!Tc(s, h)) return !1;
    for (o; o < i.coordinates.length - 1; o++) {
      var c = vb(i.coordinates[o], i.coordinates[o + 1]);
      if (ki({ type: 'Point', coordinates: c }, t, { ignoreBoundary: !0 })) {
        n = !0;
        break;
      }
    }
    return n;
  }
  function yb(t, i) {
    if (
      (t.type === 'Feature' && t.geometry === null) ||
      (i.type === 'Feature' && i.geometry === null)
    )
      return !1;
    var n = ti(t),
      o = ti(i);
    if (!Tc(n, o)) return !1;
    for (var s = bi(i).coordinates, h = 0, c = s; h < c.length; h++)
      for (var f = c[h], d = 0, y = f; d < y.length; d++) {
        var w = y[d];
        if (!ki(w, t)) return !1;
      }
    return !0;
  }
  function Tc(t, i) {
    return !(t[0] > i[0] || t[2] < i[2] || t[1] > i[1] || t[3] < i[3]);
  }
  function ao(t, i) {
    return t[0] === i[0] && t[1] === i[1];
  }
  function vb(t, i) {
    return [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2];
  }
  var Fc = ee($i());
  var ho = ee(Dc());
  function qr(t) {
    let i = { type: 'Feature' };
    return (i.geometry = t), i;
  }
  function Fr(t) {
    return t.type === 'Feature' ? t.geometry : t;
  }
  function Bc(t) {
    return t && t.geometry && t.geometry.coordinates
      ? t.geometry.coordinates
      : t;
  }
  function Lb(t) {
    return qr({ type: 'LineString', coordinates: t });
  }
  function bb(t) {
    return qr({ type: 'MultiLineString', coordinates: t });
  }
  function Ac(t) {
    return qr({ type: 'Polygon', coordinates: t });
  }
  function Oc(t) {
    return qr({ type: 'MultiPolygon', coordinates: t });
  }
  function Rc(t, i) {
    let n = Fr(t),
      o = Fr(i),
      s = ho.default.intersection(n.coordinates, o.coordinates);
    return s.length === 0 ? null : s.length === 1 ? Ac(s[0]) : Oc(s);
  }
  function Ic(t, i) {
    let n = Fr(t),
      o = Fr(i),
      s = ho.default.difference(n.coordinates, o.coordinates);
    return s.length === 0 ? null : s.length === 1 ? Ac(s[0]) : Oc(s);
  }
  function zc(t) {
    return Array.isArray(t) ? 1 + zc(t[0]) : -1;
  }
  function Nc(t) {
    t instanceof L.Polyline && (t = t.toGeoJSON(15));
    let i = Bc(t),
      n = zc(i),
      o = [];
    return (
      n > 1
        ? i.forEach((s) => {
            o.push(Lb(s));
          })
        : o.push(t),
      o
    );
  }
  function Gc(t) {
    let i = [];
    return (
      t.eachLayer((n) => {
        i.push(Bc(n.toGeoJSON(15)));
      }),
      bb(i)
    );
  }
  Mt.Cut = Mt.Polygon.extend({
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
        this._editedLayers.forEach(({ layer: n, originalLayer: o }) => {
          this._fireCut(o, n, o),
            this._fireCut(this._map, n, o),
            o.pm._fireEdit();
        }),
        (this._editedLayers = []),
        this.disable(),
        this.options.continueDrawing && this.enable();
    },
    cut(t) {
      let i = this._map._layers,
        n = t._latlngInfos || [];
      Object.keys(i)
        .map((s) => i[s])
        .filter((s) => s.pm)
        .filter((s) => !s._pmTempLayer)
        .filter(
          (s) =>
            (!L.PM.optIn && !s.options.pmIgnore) ||
            (L.PM.optIn && s.options.pmIgnore === !1)
        )
        .filter((s) => s instanceof L.Polyline)
        .filter((s) => s !== t)
        .filter((s) => s.pm.options.allowCutting)
        .filter((s) =>
          this.options.layersToCut &&
          L.Util.isArray(this.options.layersToCut) &&
          this.options.layersToCut.length > 0
            ? this.options.layersToCut.indexOf(s) > -1
            : !0
        )
        .filter((s) => !this._layerGroup.hasLayer(s))
        .filter((s) => {
          try {
            let h = !!ie(t.toGeoJSON(15), s.toGeoJSON(15)).features.length > 0;
            return h || (s instanceof L.Polyline && !(s instanceof L.Polygon))
              ? h
              : !!Rc(t.toGeoJSON(15), s.toGeoJSON(15));
          } catch {
            return (
              s instanceof L.Polygon &&
                console.error("You can't cut polygons with self-intersections"),
              !1
            );
          }
        })
        .forEach((s) => {
          let h;
          if (s instanceof L.Polygon) {
            h = L.polygon(s.getLatLngs());
            let y = h.getLatLngs();
            n.forEach((w) => {
              if (w && w.snapInfo) {
                let { latlng: P } = w,
                  R = this._calcClosestLayer(P, [h]);
                if (R && R.segment && R.distance < this.options.snapDistance) {
                  let { segment: D } = R;
                  if (D && D.length === 2) {
                    let {
                      indexPath: N,
                      parentPath: Y,
                      newIndex: k,
                    } = L.PM.Utils._getIndexFromSegment(y, D);
                    (N.length > 1 ? (0, Fc.default)(y, Y) : y).splice(k, 0, P);
                  }
                }
              }
            });
          } else h = s;
          let c = this._cutLayer(t, h),
            f = L.geoJSON(c, s.options);
          f.getLayers().length === 1 && ([f] = f.getLayers()),
            this._setPane(f, 'layerPane');
          let d = f.addTo(this._map.pm._getContainingLayer());
          if (
            (d.pm.enable(s.pm.options),
            d.pm.disable(),
            (s._pmTempLayer = !0),
            (t._pmTempLayer = !0),
            s.remove(),
            s.removeFrom(this._map.pm._getContainingLayer()),
            t.remove(),
            t.removeFrom(this._map.pm._getContainingLayer()),
            d.getLayers &&
              d.getLayers().length === 0 &&
              this._map.pm.removeLayer({ target: d }),
            d instanceof L.LayerGroup
              ? (d.eachLayer((y) => {
                  this._addDrawnLayerProp(y);
                }),
                this._addDrawnLayerProp(d))
              : this._addDrawnLayerProp(d),
            this.options.layersToCut &&
              L.Util.isArray(this.options.layersToCut) &&
              this.options.layersToCut.length > 0)
          ) {
            let y = this.options.layersToCut.indexOf(s);
            y > -1 && this.options.layersToCut.splice(y, 1);
          }
          this._editedLayers.push({ layer: d, originalLayer: s });
        });
    },
    _cutLayer(t, i) {
      let n = L.geoJSON(),
        o;
      if (i instanceof L.Polygon) o = Ic(i.toGeoJSON(15), t.toGeoJSON(15));
      else {
        let s = Nc(i);
        s.forEach((h) => {
          let c = Ec(h, t.toGeoJSON(15)),
            f;
          c && c.features.length > 0 ? (f = L.geoJSON(c)) : (f = L.geoJSON(h)),
            f.getLayers().forEach((d) => {
              oo(t.toGeoJSON(15), d.toGeoJSON(15)) || d.addTo(n);
            });
        }),
          s.length > 1 ? (o = Gc(n)) : (o = n.toGeoJSON(15));
      }
      return o;
    },
    _change: L.Util.falseFn,
  });
  Mt.Text = Mt.extend({
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
            .bindTooltip(lt('tooltips.placeText'), {
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
        let s = this.options.textOptions.className.split(' ');
        this.textArea.classList.add(...s);
      }
      let n = this._createTextIcon(this.textArea),
        o = new L.Marker(i, { textMarker: !0, _textMarkerOverPM: !0, icon: n });
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
        let s = this.options.textOptions?.focusAfterDraw ?? !0;
        o.pm._createTextMarker(s),
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
  var wb = {
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
          Ae(this._layer) instanceof L.Canvas
            ? (this._layer.on('mouseout', this.removeDraggingClass, this),
              this._layer.on('mouseover', this.addDraggingClass, this))
            : this.addDraggingClass(),
          (this._originalMapDragState = this._layer._map.dragging._enabled),
          (this._safeToCacheDragState = !0);
        let t = this._getDOMElem();
        t &&
          (Ae(this._layer) instanceof L.Canvas
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
          Ae(this._layer) instanceof L.Canvas
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
          (Ae(this._layer) instanceof L.Canvas
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
          n = { originalEvent: i, target: this._layer };
        return (
          (n.containerPoint = this._map.mouseEventToContainerPoint(i)),
          (n.latlng = this._map.containerPointToLatLng(n.containerPoint)),
          this._dragMixinOnMouseDown(n),
          !1
        );
      },
      _simulateMouseMoveEvent(t) {
        let i = t.touches ? t.touches[0] : t,
          n = { originalEvent: i, target: this._layer };
        return (
          (n.containerPoint = this._map.mouseEventToContainerPoint(i)),
          (n.latlng = this._map.containerPointToLatLng(n.containerPoint)),
          this._dragMixinOnMouseMove(n),
          !1
        );
      },
      _simulateMouseUpEvent(t) {
        let n = {
          originalEvent: t.touches ? t.touches[0] : t,
          target: this._layer,
        };
        return (
          t.type.indexOf('touch') === -1 &&
            ((n.containerPoint = this._map.mouseEventToContainerPoint(t)),
            (n.latlng = this._map.containerPointToLatLng(n.containerPoint))),
          this._dragMixinOnMouseUp(n),
          !1
        );
      },
      _dragMixinOnMouseDown(t) {
        if (t.originalEvent.button > 0) return;
        this._overwriteEventIfItComesFromMarker(t);
        let i = t._fromLayerSync,
          n = this._syncLayers('_dragMixinOnMouseDown', t);
        if (
          (this._layer instanceof L.Marker &&
            (this.options.snappable && !i && !n
              ? this._initSnappableMarkers()
              : this._disableSnapping()),
          this._layer instanceof L.CircleMarker)
        ) {
          let o = 'resizeableCircleMarker';
          this._layer instanceof L.Circle && (o = 'resizableCircle'),
            this.options.snappable && !i && !n
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
          n = {
            lat: i.lat - this._tempDragCoord.lat,
            lng: i.lng - this._tempDragCoord.lng,
          },
          o = (s) =>
            s.map((h) => {
              if (Array.isArray(h)) return o(h);
              let c = { lat: h.lat + n.lat, lng: h.lng + n.lng };
              return (h.alt || h.alt === 0) && (c.alt = h.alt), c;
            });
        if (
          (this._layer instanceof L.Circle &&
            this._layer.options.resizableCircle) ||
          (this._layer instanceof L.CircleMarker &&
            this._layer.options.resizeableCircleMarker)
        ) {
          let s = o([this._layer.getLatLng()]);
          this._layer.setLatLng(s[0]),
            this._fireChange(this._layer.getLatLng(), 'Edit');
        } else if (
          this._layer instanceof L.CircleMarker ||
          this._layer instanceof L.Marker
        ) {
          let s = this._layer.getLatLng();
          this._layer._snapped && (s = this._layer._orgLatLng);
          let h = o([s]);
          this._layer.setLatLng(h[0]),
            this._fireChange(this._layer.getLatLng(), 'Edit');
        } else if (this._layer instanceof L.ImageOverlay) {
          let s = o([
            this._layer.getBounds().getNorthWest(),
            this._layer.getBounds().getSouthEast(),
          ]);
          this._layer.setBounds(s),
            this._fireChange(this._layer.getBounds(), 'Edit');
        } else {
          let s = o(this._layer.getLatLngs());
          this._layer.setLatLngs(s),
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
          let n = [];
          if (L.Util.isArray(this.options.syncLayersOnDrag))
            (n = this.options.syncLayersOnDrag),
              this.options.syncLayersOnDrag.forEach((o) => {
                o instanceof L.LayerGroup && (n = n.concat(o.pm.getLayers(!0)));
              });
          else if (
            this.options.syncLayersOnDrag === !0 &&
            this._parentLayerGroup
          )
            for (let o in this._parentLayerGroup) {
              let s = this._parentLayerGroup[o];
              s.pm && (n = s.pm.getLayers(!0));
            }
          return (
            L.Util.isArray(n) &&
              n.length > 0 &&
              ((n = n
                .filter((o) => !!o.pm)
                .filter((o) => !!o.pm.options.draggable)),
              n.forEach((o) => {
                o !== this._layer && o.pm[t] && ((o._snapped = !1), o.pm[t](i));
              })),
            n.length > 0
          );
        }
        return !1;
      },
      _stopDOMImageDrag(t) {
        return t.preventDefault(), !1;
      },
    },
    qc = wb;
  var Zc = ee($i());
  function xb(t, i, n, o) {
    return n.unproject(i.transform(n.project(t, o)), o);
  }
  function uo(t, i, n) {
    let o = n.getMaxZoom();
    if ((o === 1 / 0 && (o = n.getZoom()), L.Util.isArray(t))) {
      let s = [];
      return (
        t.forEach((h) => {
          s.push(uo(h, i, n));
        }),
        s
      );
    }
    return t instanceof L.LatLng ? xb(t, i, n, o) : null;
  }
  function Ie(t, i) {
    i instanceof L.Layer && (i = i.getLatLng());
    let n = t.getMaxZoom();
    return n === 1 / 0 && (n = t.getZoom()), t.project(i, n);
  }
  function nr(t, i) {
    let n = t.getMaxZoom();
    return n === 1 / 0 && (n = t.getZoom()), t.unproject(i, n);
  }
  var kb = {
      _onRotateStart(t) {
        this._preventRenderingMarkers(!0),
          (this._rotationOriginLatLng = this._getRotationCenter().clone()),
          (this._rotationOriginPoint = Ie(
            this._map,
            this._rotationOriginLatLng
          )),
          (this._rotationStartPoint = Ie(this._map, t.target.getLatLng())),
          (this._initialRotateLatLng = fe(this._layer)),
          (this._startAngle = this.getAngle());
        let i = fe(
          this._rotationLayer,
          this._rotationLayer.pm._rotateOrgLatLng
        );
        this._fireRotationStart(this._rotationLayer, i),
          this._fireRotationStart(this._map, i);
      },
      _onRotate(t) {
        let i = Ie(this._map, t.target.getLatLng()),
          n = this._rotationStartPoint,
          o = this._rotationOriginPoint,
          s =
            Math.atan2(i.y - o.y, i.x - o.x) - Math.atan2(n.y - o.y, n.x - o.x);
        this._layer.setLatLngs(
          this._rotateLayer(
            s,
            this._initialRotateLatLng,
            this._rotationOriginLatLng,
            L.PM.Matrix.init(),
            this._map
          )
        );
        let h = this;
        function c(w, P = [], R = -1) {
          if ((R > -1 && P.push(R), L.Util.isArray(w[0])))
            w.forEach((D, N) => c(D, P.slice(), N));
          else {
            let D = (0, Zc.default)(h._markers, P);
            w.forEach((N, Y) => {
              D[Y].setLatLng(N);
            });
          }
        }
        c(this._layer.getLatLngs());
        let f = fe(this._rotationLayer);
        this._rotationLayer.setLatLngs(
          this._rotateLayer(
            s,
            this._rotationLayer.pm._rotateOrgLatLng,
            this._rotationOriginLatLng,
            L.PM.Matrix.init(),
            this._map
          )
        );
        let d = (s * 180) / Math.PI;
        d = d < 0 ? d + 360 : d;
        let y = d + this._startAngle;
        this._setAngle(y),
          this._rotationLayer.pm._setAngle(y),
          this._fireRotation(this._rotationLayer, d, f),
          this._fireRotation(this._map, d, f),
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
        let i = fe(
          this._rotationLayer,
          this._rotationLayer.pm._rotateOrgLatLng
        );
        (this._rotationLayer.pm._rotateOrgLatLng = fe(this._rotationLayer)),
          this._fireRotationEnd(this._rotationLayer, t, i),
          this._fireRotationEnd(this._map, t, i),
          this._rotationLayer.pm._fireEdit(this._rotationLayer, 'Rotation'),
          this._preventRenderingMarkers(!1),
          (this._layerRotated = !0);
      },
      _rotateLayer(t, i, n, o, s) {
        let h = Ie(s, n);
        return (
          (this._matrix = o.clone().rotate(t, h).flip()), uo(i, this._matrix, s)
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
              Qi(
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
          (this._rotateOrgLatLng = fe(this._layer)),
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
          n = this._layer.getLatLngs(),
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
        let s = this.getAngle() - i;
        (s = s < 0 ? s + 360 : s),
          (this._startAngle = i),
          this._fireRotation(this._layer, s, n, this._layer),
          this._fireRotation(this._map || this._layer._map, s, n, this._layer),
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
    Uc = kb;
  var Mb = L.Class.extend({
      includes: [qc, Or, Uc, Be, Xe, Je],
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
        let n = i.target,
          o = { layer: this._layer, marker: n, event: i },
          s = '';
        return (
          t === 'move'
            ? (s = 'moveVertexValidation')
            : t === 'add'
              ? (s = 'addVertexValidation')
              : t === 'remove' && (s = 'removeVertexValidation'),
          this.options[s] &&
          typeof this.options[s] == 'function' &&
          !this.options[s](o)
            ? (t === 'move' && (n._cancelDragEventChain = n.getLatLng()), !1)
            : ((n._cancelDragEventChain = null), !0)
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
    Ct = Mb;
  Ct.LayerGroup = L.Class.extend({
    initialize(t) {
      (this._layerGroup = t),
        (this._layers = this.getLayers()),
        this._getMap(),
        this._layers.forEach((o) => this._initLayer(o));
      let i = (o) => {
        if (o.layer._pmTempLayer) return;
        this._layers = this.getLayers();
        let s = this._layers.filter(
          (h) =>
            !h.pm._parentLayerGroup ||
            !(this._layerGroup._leaflet_id in h.pm._parentLayerGroup)
        );
        s.forEach((h) => {
          this._initLayer(h);
        }),
          s.length > 0 &&
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
      let n = (o) => {
        o.target._pmTempLayer || (this._layers = this.getLayers());
      };
      this._layerGroup.on('layerremove', L.Util.throttle(n, 100, this), this);
    },
    enable(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this._options = t),
        this._layers.forEach((n) => {
          n instanceof L.LayerGroup
            ? i.indexOf(n._leaflet_id) === -1 &&
              (i.push(n._leaflet_id), n.pm.enable(t, i))
            : n.pm.enable(t);
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
        !!this._layers.find((n) =>
          n instanceof L.LayerGroup
            ? t.indexOf(n._leaflet_id) === -1
              ? (t.push(n._leaflet_id), n.pm.enabled(t))
              : !1
            : n.pm.enabled()
        )
      );
    },
    toggleEdit(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this._options = t),
        this._layers.forEach((n) => {
          n instanceof L.LayerGroup
            ? i.indexOf(n._leaflet_id) === -1 &&
              (i.push(n._leaflet_id), n.pm.toggleEdit(t, i))
            : n.pm.toggleEdit(t);
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
    getLayers(t = !1, i = !0, n = !0, o = []) {
      let s = [];
      return (
        t
          ? this._layerGroup.getLayers().forEach((h) => {
              s.push(h),
                h instanceof L.LayerGroup &&
                  o.indexOf(h._leaflet_id) === -1 &&
                  (o.push(h._leaflet_id),
                  (s = s.concat(h.pm.getLayers(!0, !0, !0, o))));
            })
          : (s = this._layerGroup.getLayers()),
        n && (s = s.filter((h) => !(h instanceof L.LayerGroup))),
        i &&
          ((s = s.filter((h) => !!h.pm)),
          (s = s.filter((h) => !h._pmTempLayer)),
          (s = s.filter(
            (h) =>
              (!L.PM.optIn && !h.options.pmIgnore) ||
              (L.PM.optIn && h.options.pmIgnore === !1)
          ))),
        s
      );
    },
    setOptions(t, i = []) {
      i.length === 0 && (this._layers = this.getLayers()),
        (this.options = t),
        this._layers.forEach((n) => {
          n.pm &&
            (n instanceof L.LayerGroup
              ? i.indexOf(n._leaflet_id) === -1 &&
                (i.push(n._leaflet_id), n.pm.setOptions(t, i))
              : n.pm.setOptions(t));
        });
    },
  });
  Ct.Marker = Ct.extend({
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
  var Ce = ee($i());
  var Cb = {
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
        this.markerCache = t.filter((i, n, o) => o.indexOf(i) === n);
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
        let n = [...this._filterClosestMarkers(t)];
        this.renderLimits(n);
      },
      _filterClosestMarkers(t) {
        let i = [...this.markerCache],
          n = this.options.limitMarkersToCount;
        return n === -1
          ? i
          : (i.sort((s, h) => {
              let c = s._latlng.distanceTo(t),
                f = h._latlng.distanceTo(t);
              return c - f;
            }),
            i.filter((s, h) => (n > -1 ? h < n : !0)));
      },
      _preventRenderMarkers: !1,
      _preventRenderingMarkers(t) {
        this._preventRenderMarkers = !!t;
      },
    },
    Vc = Cb;
  Ct.Line = Ct.extend({
    includes: [Vc],
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
      if (
        (L.Util.setOptions(this, t),
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
      let n = (o) => {
        if (Array.isArray(o[0])) return o.map(n, this);
        let s = o.map(this._createMarker, this);
        return (
          this.options.hideMiddleMarkers !== !0 &&
            o.map((h, c) => {
              let f = this.isPolygon() ? (c + 1) % o.length : c + 1;
              return this._createMiddleMarker(s[c], s[f]);
            }),
          s
        );
      };
      (this._markers = n(i)),
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
      let n = L.PM.Utils.calcMiddleLatLng(
          this._map,
          t.getLatLng(),
          i.getLatLng()
        ),
        o = this._createMarker(n),
        s = L.divIcon({ className: 'marker-icon marker-icon-middle' });
      return (
        o.setIcon(s),
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
      let n = L.divIcon({ className: 'marker-icon' });
      i.setIcon(n), this._addMarker(i, i.leftM, i.rightM);
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
      let n = L.divIcon({ className: 'marker-icon' });
      i.setIcon(n),
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
          i.pm._markerGroup.eachLayer((n) => {
            let o = n.getIcon();
            (o.options.className = 'marker-icon'), n.setIcon(o);
          });
      });
    },
    _onArrowChange(t) {
      this._fireArrowheadEditChangeEvent(this._layer._arrowheadOptions),
        this._fireEdit(),
        (this._layerEdited = !0),
        this._fireMapResetView('Edit', { event: t });
    },
    _addMarker(t, i, n) {
      t.off('movestart', this._onMiddleMarkerMoveStart, this),
        t.off(this.options.addVertexOn, this._onMiddleMarkerClick, this);
      let o = t.getLatLng(),
        s = this._layer._latlngs;
      delete t.leftM, delete t.rightM;
      let {
          indexPath: h,
          index: c,
          parentPath: f,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, i),
        d = h.length > 1 ? (0, Ce.default)(s, f) : s,
        y = h.length > 1 ? (0, Ce.default)(this._markers, f) : this._markers;
      d.splice(c + 1, 0, o),
        y.splice(c + 1, 0, t),
        this._layer.setLatLngs(s),
        this.options.hideMiddleMarkers !== !0 &&
          (this._createMiddleMarker(i, t), this._createMiddleMarker(t, n)),
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
      return de(this._layer.toGeoJSON(15)).features.length > 0;
    },
    _handleSelfIntersectionOnVertexRemoval() {
      this._handleLayerStyle(!0) &&
        (this._layer.setLatLngs(this._coordsBeforeEdit),
        (this._coordsBeforeEdit = null),
        this._initMarkers());
    },
    _handleLayerStyle(t) {
      let i = this._layer,
        n,
        o;
      if (
        (this.options.allowSelfIntersection
          ? (n = !1)
          : ((o = de(this._layer.toGeoJSON(15))), (n = o.features.length > 0)),
        n)
      ) {
        if (
          (!this.options.allowSelfIntersection &&
            this.options.allowSelfIntersectionEdit &&
            this._updateDisabledMarkerStyle(this._markers, !0),
          this.isRed)
        )
          return n;
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
      return n;
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
      t.forEach((n) => {
        Array.isArray(n)
          ? this._updateDisabledMarkerStyle(n, i)
          : n._icon &&
            (i && !this._checkMarkerAllowedToDrag(n)
              ? L.DomUtil.addClass(n._icon, 'vertexmarker-disabled')
              : L.DomUtil.removeClass(n._icon, 'vertexmarker-disabled'));
      });
    },
    _removeMarker(t) {
      let i = t.target;
      if (!this._vertexValidation('remove', t)) return;
      this.options.allowSelfIntersection ||
        (this._coordsBeforeEdit = fe(this._layer, this._layer.getLatLngs()));
      let n = this._layer.getLatLngs(),
        {
          indexPath: o,
          index: s,
          parentPath: h,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      if (!o) return;
      let c = o.length > 1 ? (0, Ce.default)(n, h) : n,
        f = o.length > 1 ? (0, Ce.default)(this._markers, h) : this._markers;
      if (
        !this.options.removeLayerBelowMinVertexCount &&
        (c.length <= 2 || (this.isPolygon() && c.length <= 3))
      ) {
        this._flashLayer();
        return;
      }
      c.splice(s, 1),
        this._layer.setLatLngs(n),
        this.isPolygon() && c.length <= 2 && c.splice(0, c.length);
      let d = !1;
      if (
        (c.length <= 1 &&
          (c.splice(0, c.length),
          h.length > 1 && o.length > 1 && (n = Ji(n)),
          this._layer.setLatLngs(n),
          this._initMarkers(),
          (d = !0)),
        Xi(n) || this._layer.remove(),
        (n = Ji(n)),
        this._layer.setLatLngs(n),
        (this._markers = Ji(this._markers)),
        !d &&
          ((f =
            o.length > 1 ? (0, Ce.default)(this._markers, h) : this._markers),
          i._middleMarkerPrev &&
            this._markerGroup.removeLayer(i._middleMarkerPrev),
          i._middleMarkerNext &&
            this._markerGroup.removeLayer(i._middleMarkerNext),
          this._markerGroup.removeLayer(i),
          f))
      ) {
        let y, w;
        if (
          (this.isPolygon()
            ? ((y = (s + 1) % f.length), (w = (s + (f.length - 1)) % f.length))
            : ((w = s - 1 < 0 ? void 0 : s - 1),
              (y = s + 1 >= f.length ? void 0 : s + 1)),
          y !== w)
        ) {
          let P = f[w],
            R = f[y];
          this.options.hideMiddleMarkers !== !0 &&
            this._createMiddleMarker(P, R);
        }
        f.splice(s, 1);
      }
      this._fireEdit(),
        (this._layerEdited = !0),
        this._fireVertexRemoved(i, o),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    updatePolygonCoordsFromMarkerDrag(t) {
      let i = this._layer.getLatLngs(),
        n = t.getLatLng(),
        {
          indexPath: o,
          index: s,
          parentPath: h,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, t);
      (o.length > 1 ? (0, Ce.default)(i, h) : i).splice(s, 1, n),
        this._layer.setLatLngs(i);
    },
    _getNeighborMarkers(t) {
      let {
          indexPath: i,
          index: n,
          parentPath: o,
        } = L.PM.Utils.findDeepMarkerIndex(this._markers, t),
        s = i.length > 1 ? (0, Ce.default)(this._markers, o) : this._markers,
        h = (n + 1) % s.length,
        c = (n + (s.length - 1)) % s.length,
        f = s[c],
        d = s[h];
      return { prevMarker: f, nextMarker: d };
    },
    _checkMarkerAllowedToDrag(t) {
      let { prevMarker: i, nextMarker: n } = this._getNeighborMarkers(t),
        o = L.polyline([i.getLatLng(), t.getLatLng()]),
        s = L.polyline([t.getLatLng(), n.getLatLng()]),
        h = ie(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.length,
        c = ie(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.length;
      return (
        t.getLatLng() === this._markers[0][0].getLatLng()
          ? (c += 1)
          : t.getLatLng() ===
              this._markers[0][this._markers[0].length - 1].getLatLng() &&
            (h += 1),
        !(h <= 2 && c <= 2)
      );
    },
    _onMarkerDragStart(t) {
      let i = t.target;
      if (
        (this.cachedColor || (this.cachedColor = this._layer.options.color),
        !this._vertexValidation('move', t))
      )
        return;
      let { indexPath: n } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireMarkerDragStart(t, n),
        this.options.allowSelfIntersection ||
          (this._coordsBeforeEdit = fe(this._layer, this._layer.getLatLngs())),
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
        indexPath: n,
        index: o,
        parentPath: s,
      } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      if (!n) return;
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
      let h = n.length > 1 ? (0, Ce.default)(this._markers, s) : this._markers,
        c = (o + 1) % h.length,
        f = (o + (h.length - 1)) % h.length,
        d = i.getLatLng(),
        y = h[f].getLatLng(),
        w = h[c].getLatLng();
      if (i._middleMarkerNext) {
        let P = L.PM.Utils.calcMiddleLatLng(this._map, d, w);
        i._middleMarkerNext.setLatLng(P);
      }
      if (i._middleMarkerPrev) {
        let P = L.PM.Utils.calcMiddleLatLng(this._map, d, y);
        i._middleMarkerPrev.setLatLng(P);
      }
      this.options.allowSelfIntersection || this._handleLayerStyle(),
        this._fireMarkerDrag(t, n),
        this._fireChange(this._layer.getLatLngs(), 'Edit');
    },
    _onMarkerDragEnd(t) {
      let i = t.target;
      if (!this._vertexValidationDragEnd(i)) return;
      let { indexPath: n } = L.PM.Utils.findDeepMarkerIndex(this._markers, i),
        o = this.hasSelfIntersection();
      o &&
        this.options.allowSelfIntersectionEdit &&
        this._markerAllowedToDrag &&
        (o = !1);
      let s = !this.options.allowSelfIntersection && o;
      if ((this._fireMarkerDragEnd(t, n, s), s)) {
        this._layer.setLatLngs(this._coordsBeforeEdit),
          (this._coordsBeforeEdit = null),
          this._initMarkers(),
          this.options.snappable && this._initSnappableMarkers(),
          this._handleLayerStyle(),
          this._fireLayerReset(t, n);
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
      let { indexPath: n } = L.PM.Utils.findDeepMarkerIndex(this._markers, i);
      this._fireVertexClick(t, n);
    },
  });
  Ct.Polygon = Ct.Line.extend({
    _shape: 'Polygon',
    _checkMarkerAllowedToDrag(t) {
      let { prevMarker: i, nextMarker: n } = this._getNeighborMarkers(t),
        o = L.polyline([i.getLatLng(), t.getLatLng()]),
        s = L.polyline([t.getLatLng(), n.getLatLng()]),
        h = ie(this._layer.toGeoJSON(15), o.toGeoJSON(15)).features.length,
        c = ie(this._layer.toGeoJSON(15), s.toGeoJSON(15)).features.length;
      return !(h <= 2 && c <= 2);
    },
  });
  Ct.Rectangle = Ct.Polygon.extend({
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
        this._layer.getLatLngs()[0].forEach((n, o) => {
          let s = this._cornerMarkers.find((h) => h._index === o);
          s && s.setLatLng(n);
        });
    },
    applyOptions() {
      this.options.snappable
        ? this._initSnappableMarkers()
        : this._disableSnapping(),
        this._addMarkerEvents();
    },
    _createMarker(t, i) {
      let n = new L.Marker(t, {
        draggable: !0,
        icon: L.divIcon({ className: 'marker-icon' }),
      });
      return (
        this._setPane(n, 'vertexPane'),
        (n._origLatLng = t),
        (n._index = i),
        (n._pmTempLayer = !0),
        n.on('click', this._onVertexClick, this),
        this._markerGroup.addLayer(n),
        n
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
        n = this._cornerMarkers;
      (i._oppositeCornerLatLng = n
        .find((o) => o._index === (i._index + 2) % 4)
        .getLatLng()),
        (i._snapped = !1),
        this._fireMarkerDragStart(t);
    },
    _onMarkerDrag(t) {
      let i = t.target;
      this._vertexValidationDrag(i) &&
        i._index !== void 0 &&
        (this._adjustRectangleForMarkerMove(i),
        this._fireMarkerDrag(t),
        this._fireChange(this._layer.getLatLngs(), 'Edit'));
    },
    _onMarkerDragEnd(t) {
      let i = t.target;
      this._vertexValidationDragEnd(i) &&
        (this._cornerMarkers.forEach((n) => {
          delete n._oppositeCornerLatLng;
        }),
        this._fireMarkerDragEnd(t),
        this._fireEdit(),
        (this._layerEdited = !0),
        this._fireChange(this._layer.getLatLngs(), 'Edit'));
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
        ? (t.forEach((n, o) => {
            this._cornerMarkers[o].setLatLng(n);
          }),
          this._cornerMarkers.slice(t.length).forEach((n) => {
            n.setLatLng(t[0]);
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
          Qi(
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
  Ct.CircleMarker = Ct.extend({
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
      if (
        (L.Util.setOptions(this, t),
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
        n = this._layer._radius,
        o = this._getLatLngOnCircle(i, n);
      (this._centerMarker = this._createCenterMarker(i)),
        (this._outerMarker = this._createOuterMarker(o)),
        (this._markers = [this._centerMarker, this._outerMarker]),
        this._createHintLine(this._centerMarker, this._outerMarker);
    },
    _getLatLngOnCircle(t, i) {
      let n = this._map.project(t),
        o = L.point(n.x + i, n.y);
      return this._map.unproject(o);
    },
    _createHintLine(t, i) {
      let n = t.getLatLng(),
        o = i.getLatLng();
      (this._hintline = L.polyline([n, o], this.options.hintlineStyle)),
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
      let n = this._centerMarker.getLatLng();
      this._layer.setLatLng(n);
      let o = this._layer._radius,
        s = this._getLatLngOnCircle(n, o);
      (this._outerMarker._latlng = s),
        this._outerMarker.update(),
        this._syncHintLine(),
        this._updateHiddenPolyCircle(),
        this._fireCenterPlaced('Edit'),
        this._fireChange(this._layer.getLatLng(), 'Edit');
    },
    _syncMarkers() {
      let t = this._layer.getLatLng(),
        i = this._layer._radius,
        n = this._getLatLngOnCircle(t, i);
      this._outerMarker.setLatLng(n),
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
        n = this._distanceCalculation(t, i);
      this.options[this._minRadiusOption] &&
      n < this.options[this._minRadiusOption]
        ? this._layer.setRadius(this.options[this._minRadiusOption])
        : this.options[this._maxRadiusOption] &&
            n > this.options[this._maxRadiusOption]
          ? this._layer.setRadius(this.options[this._maxRadiusOption])
          : this._layer.setRadius(n),
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
          n = L.circle(this._layer.getLatLng(), this._layer.options);
        n.setRadius(i);
        let o = t && t.pm._isCRSSimple();
        this._hiddenPolyCircle
          ? this._hiddenPolyCircle.setLatLngs(
              L.PM.Utils.circleToPolygon(n, 200, !o).getLatLngs()
            )
          : (this._hiddenPolyCircle = L.PM.Utils.circleToPolygon(n, 200, !o)),
          this._hiddenPolyCircle._parentCopy ||
            (this._hiddenPolyCircle._parentCopy = this._layer);
      }
    },
    _getNewDestinationOfOuterMarker() {
      let t = this._centerMarker.getLatLng(),
        i = this._outerMarker.getLatLng(),
        n = this._distanceCalculation(t, i);
      return (
        this.options[this._minRadiusOption] &&
        n < this.options[this._minRadiusOption]
          ? (i = Li(this._map, t, i, this._getMinDistanceInMeter(t)))
          : this.options[this._maxRadiusOption] &&
            n > this.options[this._maxRadiusOption] &&
            (i = Li(this._map, t, i, this._getMaxDistanceInMeter(t))),
        i
      );
    },
    _handleOuterMarkerSnapping() {
      if (this._outerMarker._snapped) {
        let t = this._centerMarker.getLatLng(),
          i = this._outerMarker.getLatLng(),
          n = this._distanceCalculation(t, i);
        this.options[this._minRadiusOption] &&
        n < this.options[this._minRadiusOption]
          ? this._outerMarker.setLatLng(this._outerMarker._orgLatLng)
          : this.options[this._maxRadiusOption] &&
            n > this.options[this._maxRadiusOption] &&
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
  Ct.Circle = Ct.CircleMarker.extend({
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
  Ct.ImageOverlay = Ct.extend({
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
        n = t.getNorthEast(),
        o = t.getSouthEast(),
        s = t.getSouthWest();
      return [i, n, o, s];
    },
  });
  Ct.Text = Ct.extend({
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
  var co = function (i, n, o, s, h, c) {
    this._matrix = [i, n, o, s, h, c];
  };
  co.init = () => new L.PM.Matrix(1, 0, 0, 1, 0, 0);
  co.prototype = {
    transform(t) {
      return this._transform(t.clone());
    },
    _transform(t) {
      let i = this._matrix,
        { x: n, y: o } = t;
      return (
        (t.x = i[0] * n + i[1] * o + i[4]),
        (t.y = i[2] * n + i[3] * o + i[5]),
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
      let i, n;
      return (
        typeof t == 'number' ? ((i = t), (n = t)) : ((i = t.x), (n = t.y)),
        this._add(1, 0, 0, 1, i, n)
      );
    },
    scale(t, i) {
      if (t === void 0) return new L.Point(this._matrix[0], this._matrix[3]);
      let n, o;
      return (
        (i = i || L.point(0, 0)),
        typeof t == 'number' ? ((n = t), (o = t)) : ((n = t.x), (o = t.y)),
        this._add(n, 0, 0, o, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y)
      );
    },
    rotate(t, i) {
      let n = Math.cos(t),
        o = Math.sin(t);
      return (
        (i = i || new L.Point(0, 0)),
        this._add(n, o, -o, n, i.x, i.y)._add(1, 0, 0, 1, -i.x, -i.y)
      );
    },
    flip() {
      return (this._matrix[1] *= -1), (this._matrix[2] *= -1), this;
    },
    _add(t, i, n, o, s, h) {
      let c = [[], [], []],
        f = this._matrix,
        d = [
          [f[0], f[2], f[4]],
          [f[1], f[3], f[5]],
          [0, 0, 1],
        ],
        y = [
          [t, n, s],
          [i, o, h],
          [0, 0, 1],
        ],
        w;
      t &&
        t instanceof L.PM.Matrix &&
        ((f = t._matrix),
        (y = [
          [f[0], f[2], f[4]],
          [f[1], f[3], f[5]],
          [0, 0, 1],
        ]));
      for (let P = 0; P < 3; P += 1)
        for (let R = 0; R < 3; R += 1) {
          w = 0;
          for (let D = 0; D < 3; D += 1) w += d[P][D] * y[D][R];
          c[P][R] = w;
        }
      return (
        (this._matrix = [c[0][0], c[1][0], c[0][1], c[1][1], c[0][2], c[1][2]]),
        this
      );
    },
  };
  var Hc = co;
  var Pb = {
      calcMiddleLatLng(t, i, n) {
        let o = t.project(i),
          s = t.project(n);
        return t.unproject(o._add(s)._divideBy(2));
      },
      findLayers(t) {
        let i = [];
        return (
          t.eachLayer((n) => {
            (n instanceof L.Polyline ||
              n instanceof L.Marker ||
              n instanceof L.Circle ||
              n instanceof L.CircleMarker ||
              n instanceof L.ImageOverlay) &&
              i.push(n);
          }),
          (i = i.filter((n) => !!n.pm)),
          (i = i.filter((n) => !n._pmTempLayer)),
          (i = i.filter(
            (n) =>
              (!L.PM.optIn && !n.options.pmIgnore) ||
              (L.PM.optIn && n.options.pmIgnore === !1)
          )),
          i
        );
      },
      findLines(t) {
        let i = [];
        return (
          t.eachLayer((n) => {
            n instanceof L.Polyline &&
              n.pm.getShape().toLowerCase().includes('line') &&
              i.push(n);
          }),
          (i = i.filter((n) => !!n.pm)),
          (i = i.filter((n) => !n._pmTempLayer)),
          (i = i.filter(
            (n) =>
              (!L.PM.optIn && !n.options.pmIgnore) ||
              (L.PM.optIn && n.options.pmIgnore === !1)
          )),
          i
        );
      },
      findMarkers(t) {
        let i = [];
        return (
          t.eachLayer((n) => {
            n instanceof L.Marker && i.push(n);
          }),
          (i = i.filter((n) => !!n.pm)),
          (i = i.filter((n) => !n._pmTempLayer)),
          (i = i.filter(
            (n) =>
              (!L.PM.optIn && !n.options.pmIgnore) ||
              (L.PM.optIn && n.options.pmIgnore === !1)
          )),
          i
        );
      },
      circleToPolygon(t, i = 60, n = !0) {
        let o = t.getLatLng(),
          s = t.getRadius(),
          h = zn(o, s, i, 0, n),
          c = [];
        for (let f = 0; f < h.length; f += 1) {
          let d = [h[f].lat, h[f].lng];
          c.push(d);
        }
        return L.polygon(c, t.options);
      },
      disablePopup(t) {
        t.getPopup() && ((t._tempPopupCopy = t.getPopup()), t.unbindPopup());
      },
      enablePopup(t) {
        t._tempPopupCopy &&
          (t.bindPopup(t._tempPopupCopy), delete t._tempPopupCopy);
      },
      _fireEvent(t, i, n, o = !1) {
        t.fire(i, n, o);
        let { groups: s } = this.getAllParentGroups(t);
        s.forEach((h) => {
          h.fire(i, n, o);
        });
      },
      getAllParentGroups(t) {
        let i = [],
          n = [],
          o = (s) => {
            for (let h in s._eventParents)
              if (i.indexOf(h) === -1) {
                i.push(h);
                let c = s._eventParents[h];
                n.push(c), o(c);
              }
          };
        return !t._pmLastGroupFetch ||
          !t._pmLastGroupFetch.time ||
          new Date().getTime() - t._pmLastGroupFetch.time > 1e3
          ? (o(t),
            (t._pmLastGroupFetch = {
              time: new Date().getTime(),
              groups: n,
              groupIds: i,
            }),
            { groupIds: i, groups: n })
          : {
              groups: t._pmLastGroupFetch.groups,
              groupIds: t._pmLastGroupFetch.groupIds,
            };
      },
      createGeodesicPolygon: zn,
      getTranslation: lt,
      findDeepCoordIndex(t, i, n = !0) {
        let o,
          s = (c) => (f, d) => {
            let y = c.concat(d);
            if (n) {
              if (f.lat && f.lat === i.lat && f.lng === i.lng)
                return (o = y), !0;
            } else if (f.lat && L.latLng(f).equals(i)) return (o = y), !0;
            return Array.isArray(f) && f.some(s(y));
          };
        t.some(s([]));
        let h = {};
        return (
          o &&
            (h = {
              indexPath: o,
              index: o[o.length - 1],
              parentPath: o.slice(0, o.length - 1),
            }),
          h
        );
      },
      findDeepMarkerIndex(t, i) {
        let n,
          o = (h) => (c, f) => {
            let d = h.concat(f);
            return c._leaflet_id === i._leaflet_id
              ? ((n = d), !0)
              : Array.isArray(c) && c.some(o(d));
          };
        t.some(o([]));
        let s = {};
        return (
          n &&
            (s = {
              indexPath: n,
              index: n[n.length - 1],
              parentPath: n.slice(0, n.length - 1),
            }),
          s
        );
      },
      _getIndexFromSegment(t, i) {
        if (i && i.length === 2) {
          let n = this.findDeepCoordIndex(t, i[0]),
            o = this.findDeepCoordIndex(t, i[1]),
            s = Math.max(n.index, o.index);
          return (
            (n.index === 0 || o.index === 0) && s !== 1 && (s += 1),
            {
              indexA: n,
              indexB: o,
              newIndex: s,
              indexPath: n.indexPath,
              parentPath: n.parentPath,
            }
          );
        }
        return null;
      },
      _getRotatedRectangle(t, i, n, o) {
        let s = Ie(o, t),
          h = Ie(o, i),
          c = (n * Math.PI) / 180,
          f = Math.cos(c),
          d = Math.sin(c),
          y = (h.x - s.x) * f + (h.y - s.y) * d,
          w = (h.y - s.y) * f - (h.x - s.x) * d,
          P = y * f + s.x,
          R = y * d + s.y,
          D = -w * d + s.x,
          N = w * f + s.y,
          Y = nr(o, s),
          k = nr(o, { x: P, y: R }),
          C = nr(o, h),
          I = nr(o, { x: D, y: N });
        return [Y, k, C, I];
      },
      pxRadiusToMeterRadius(t, i, n) {
        let o = i.project(n),
          s = L.point(o.x + t, o.y);
        return i.distance(i.unproject(s), n);
      },
    },
    jc = Pb;
  L.PM = L.PM || {
    version: da.version,
    Map: Yu,
    Toolbar: tc,
    Draw: Mt,
    Edit: Ct,
    Utils: jc,
    Matrix: Hc,
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
      function n() {
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
      L.Marker.addInitHook(n);
      function o() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.CircleMarker(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.CircleMarker(this));
      }
      L.CircleMarker.addInitHook(o);
      function s() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Line(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Line(this));
      }
      L.Polyline.addInitHook(s);
      function h() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Polygon(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Polygon(this));
      }
      L.Polygon.addInitHook(h);
      function c() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Rectangle(this))
            : this.options.pmIgnore ||
              (this.pm = new L.PM.Edit.Rectangle(this));
      }
      L.Rectangle.addInitHook(c);
      function f() {
        (this.pm = void 0),
          L.PM.optIn
            ? this.options.pmIgnore === !1 &&
              (this.pm = new L.PM.Edit.Circle(this))
            : this.options.pmIgnore || (this.pm = new L.PM.Edit.Circle(this));
      }
      L.Circle.addInitHook(f);
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
          n,
          o;
        for (let s = this._drawFirst; s; s = s.next)
          (n = s.layer),
            n.options.interactive &&
              n._containsPoint(i) &&
              (!(t.type === 'click' || t.type === 'preclick') ||
                !this._map._draggableMoved(n)) &&
              (o = n);
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

polygon-clipping/dist/polygon-clipping.umd.js:
  (**
   * splaytree v3.1.0
   * Fast Splay tree for Node and browser
   *
   * @author Alexander Milevski <info@w8r.name>
   * @license MIT
   * @preserve
   *)
*/
//# sourceMappingURL=leaflet-geoman.js.map
