!(function (t) {
  function e (r) {
    if (n[r]) return n[r].exports
    var o = (n[r] = { i: r, l: !1, exports: {} })
    return t[r].call(o.exports, o, o.exports, e), (o.l = !0), o.exports
  }
  var n = {}
  ;(e.m = t), (e.c = n), (e.i = function (t) {
    return t
  }), (e.d = function (t, n, r) {
    e.o(t, n) ||
      Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r })
  }), (e.n = function (t) {
    var n =
      t && t.__esModule
        ? function () {
          return t.default
        }
        : function () {
          return t
        }
    return e.d(n, 'a', n), n
  }), (e.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }), (e.p = '/'), e((e.s = 2))
})([
  function (t, e, n) {
    'use strict'
    var r = function (t) {
        return o.forEach(function (e, n) {
          return t === n
            ? e.classList.toggle('appear')
            : e.classList.toggle('disappear')
        })
      },
      o = document.querySelectorAll('[page]')
    o.forEach(function (t) {
      return t.addEventListener('click', function (t) {
        return r(t.target.attributes.page.value - 1)
      })
    })
  },
  function (t, e) {},
  function (t, e, n) {
    n(0), (t.exports = n(1))
  }
])
// # sourceMappingURL=bundle.js.map
