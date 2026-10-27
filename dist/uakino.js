/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/ (ES5). Не редагуйте вручну. */
(function () {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  if (!Array.from) Array.from = function (src, fn) {
    var out = [];
    if (src && typeof src.length !== 'number' && typeof Symbol !== 'undefined' && src[Symbol.iterator]) {
      var it = src[Symbol.iterator](),
        step;
      while (!(step = it.next()).done) out.push(step.value);
    } else {
      for (var i = 0; src && i < src.length; i++) out.push(src[i]);
    }
    return fn ? out.map(fn) : out;
  };
  if (!String.fromCodePoint) String.fromCodePoint = function (code) {
    if (code <= 0xffff) return String.fromCharCode(code);
    code -= 0x10000;
    return String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff));
  };
  var UAKinoLib = function () {
    var __modules = {
      "lib/client.js": [{
        "./parse": "lib/parse.js",
        "./online": "lib/online.js",
        "./jackett": "lib/jackett.js",
        "./search": "lib/search.js"
      }, function (module, exports, require) {
        'use strict';
        var parse = require('./parse');
        var _require = require('./online'),
          createOnline = _require.createOnline;
        var _require2 = require('./jackett'),
          toJackett = _require2.toJackett;
        var _require3 = require('./search'),
          searchDle = _require3.searchDle;
        function createClient(_ref) {
          var host = _ref.host,
            fetchText = _ref.fetchText,
            _ref$maxPages = _ref.maxPages,
            maxPages = _ref$maxPages === void 0 ? 5 : _ref$maxPages;
          host = String(host || 'https://uakino.best').replace(/\/+$/, '');
          var searches = new Map();
          var pages = new Map();
          function searchSite(_x) {
            return _searchSite.apply(this, arguments);
          }
          function _searchSite() {
            _searchSite = _asyncToGenerator(_regenerator().m(function _callee(query) {
              var q, key, list;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    q = String(query || '').trim();
                    if (!(q.length < 2)) {
                      _context.n = 1;
                      break;
                    }
                    return _context.a(2, []);
                  case 1:
                    key = q.toLowerCase();
                    if (!searches.has(key)) {
                      _context.n = 2;
                      break;
                    }
                    return _context.a(2, searches.get(key));
                  case 2:
                    _context.n = 3;
                    return searchDle(host, q, fetchText);
                  case 3:
                    list = _context.v;
                    searches.set(key, list);
                    return _context.a(2, list);
                }
              }, _callee);
            }));
            return _searchSite.apply(this, arguments);
          }
          function page(_x2) {
            return _page.apply(this, arguments);
          }
          function _page() {
            _page = _asyncToGenerator(_regenerator().m(function _callee2(url) {
              var _t, _t2, _t3;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    if (pages.has(url)) {
                      _context2.n = 2;
                      break;
                    }
                    _t = pages;
                    _t2 = url;
                    _t3 = parse;
                    _context2.n = 1;
                    return fetchText(url, {});
                  case 1:
                    _t.set.call(_t, _t2, _t3.parsePage.call(_t3, _context2.v, url, host));
                  case 2:
                    return _context2.a(2, pages.get(url));
                }
              }, _callee2);
            }));
            return _page.apply(this, arguments);
          }
          function torrents(_x3) {
            return _torrents.apply(this, arguments);
          }
          function _torrents() {
            _torrents = _asyncToGenerator(_regenerator().m(function _callee3(_ref2) {
              var _ref2$title, title, _ref2$original, original, _ref2$query, query, _ref2$year, year, titles, found, lastError, _iterator, _step, q, _iterator2, _step2, item, list, relevant, loaded, out, y, yearOf, _t4, _t5, _t6;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.p = _context3.n) {
                  case 0:
                    _ref2$title = _ref2.title, title = _ref2$title === void 0 ? '' : _ref2$title, _ref2$original = _ref2.original, original = _ref2$original === void 0 ? '' : _ref2$original, _ref2$query = _ref2.query, query = _ref2$query === void 0 ? '' : _ref2$query, _ref2$year = _ref2.year, year = _ref2$year === void 0 ? null : _ref2$year;
                    titles = [title, original, query].filter(Boolean).filter(function (v, i, a) {
                      return a.indexOf(v) === i;
                    }).slice(0, 3);
                    if (titles.length) {
                      _context3.n = 1;
                      break;
                    }
                    return _context3.a(2, []);
                  case 1:
                    found = new Map();
                    lastError = null;
                    _iterator = _createForOfIteratorHelper(titles);
                    _context3.p = 2;
                    _iterator.s();
                  case 3:
                    if ((_step = _iterator.n()).done) {
                      _context3.n = 8;
                      break;
                    }
                    q = _step.value;
                    _context3.p = 4;
                    _t4 = _createForOfIteratorHelper;
                    _context3.n = 5;
                    return searchSite(q);
                  case 5:
                    _iterator2 = _t4(_context3.v);
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        item = _step2.value;
                        if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, {
                          score: parse.scoreTitle(item, titles)
                        }));
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                    _context3.n = 7;
                    break;
                  case 6:
                    _context3.p = 6;
                    _t5 = _context3.v;
                    lastError = _t5;
                  case 7:
                    _context3.n = 3;
                    break;
                  case 8:
                    _context3.n = 10;
                    break;
                  case 9:
                    _context3.p = 9;
                    _t6 = _context3.v;
                    _iterator.e(_t6);
                  case 10:
                    _context3.p = 10;
                    _iterator.f();
                    return _context3.f(10);
                  case 11:
                    if (!(!found.size && lastError)) {
                      _context3.n = 12;
                      break;
                    }
                    throw lastError;
                  case 12:
                    list = Array.from(found.values()).sort(function (a, b) {
                      return b.score - a.score;
                    });
                    relevant = list.filter(function (c) {
                      return c.score >= 40;
                    });
                    if (relevant.length) list = relevant;
                    list = list.slice(0, maxPages);
                    _context3.n = 13;
                    return Promise.all(list.map(function (c) {
                      return page(c.url).catch(function () {
                        return null;
                      });
                    }));
                  case 13:
                    loaded = _context3.v;
                    out = [];
                    loaded.forEach(function (p) {
                      if (!p) return;
                      p.torrents.forEach(function (t) {
                        var r = toJackett({
                          page: p,
                          torrent: t,
                          meta: null,
                          peers: null
                        }, '');
                        r.Link = t.url;
                        out.push(r);
                      });
                    });
                    if (year) {
                      y = Number(year);
                      yearOf = function yearOf(r) {
                        var m = r.Title.match(/\((\d{4})\)/);
                        return m ? Number(m[1]) : y;
                      };
                      out.sort(function (a, b) {
                        return Math.abs(yearOf(a) - y) - Math.abs(yearOf(b) - y);
                      });
                    }
                    return _context3.a(2, out);
                }
              }, _callee3, null, [[4, 6], [2, 9, 10, 11]]);
            }));
            return _torrents.apply(this, arguments);
          }
          return {
            host: host,
            searchSite: searchSite,
            torrents: torrents,
            online: createOnline({
              host: host,
              fetchText: fetchText,
              searchSite: searchSite
            })
          };
        }
        module.exports = {
          createClient: createClient
        };
      }],
      "lib/parse.js": [{}, function (module, exports, require) {
        'use strict';
        var ENTITIES = {
          amp: '&',
          lt: '<',
          gt: '>',
          quot: '"',
          apos: "'",
          nbsp: ' ',
          laquo: '«',
          raquo: '»',
          ndash: '–',
          mdash: '—',
          hellip: '…'
        };
        function decodeEntities(s) {
          return String(s || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, function (m, e) {
            if (e[0] === '#') {
              var code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
              return Number.isFinite(code) ? String.fromCodePoint(code) : m;
            }
            var v = ENTITIES[e.toLowerCase()];
            return v === undefined ? m : v;
          });
        }
        function stripTags(s) {
          return decodeEntities(String(s || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
        }
        function safeDecode(s) {
          try {
            return decodeURIComponent(s);
          } catch (e) {
            return s;
          }
        }
        function absoluteUrl(href, host) {
          if (!href) return '';
          var url = decodeEntities(href.trim());
          if (url.indexOf('//') === 0) url = 'https:' + url;else if (!/^https?:\/\//i.test(url)) url = host.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
          try {
            var u = new URL(url);
            u.pathname = u.pathname.split('/').map(function (p) {
              return encodeURIComponent(safeDecode(p));
            }).join('/');
            return u.toString();
          } catch (e) {
            return '';
          }
        }
        function localize(url, host) {
          try {
            var u = new URL(url);
            var h = new URL(host);
            var a = u.hostname.replace(/^www\./, '');
            if (a === h.hostname.replace(/^www\./, '')) return u.toString();
            if (!/(^|\.)uakino\.[a-z]+$/i.test(a)) return '';
            u.protocol = h.protocol;
            u.host = h.host;
            return u.toString();
          } catch (e) {
            return '';
          }
        }
        var NEWS_RE = /\/(\d+)-[^/]*\.html$/;
        function newsId(url) {
          try {
            var m = new URL(url).pathname.match(NEWS_RE);
            return m ? m[1] : null;
          } catch (e) {
            return null;
          }
        }
        function attr(tag, name) {
          var m = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
          return m ? m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] : null;
        }
        function parseList(html, host) {
          var found = new Map();
          var re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
          var m;
          while (m = re.exec(html)) {
            var href = attr(m[0], 'href');
            if (!href) continue;
            var url = localize(absoluteUrl(href, host), host);
            if (!url) continue;
            var id = newsId(url);
            if (!id) continue;
            var cls = attr(m[0], 'class') || '';
            var title = stripTags(m[2]);
            if (!title) {
              var img = m[2].match(/<img\b[^>]*>/i);
              if (img) title = decodeEntities(attr(img[0], 'alt') || attr(img[0], 'title') || '').trim();
            }
            var item = found.get(id) || {
              id: id,
              url: url,
              title: '',
              poster: ''
            };
            if (title && (!item.title || /movie-title|title/.test(cls))) item.title = title;
            if (!item.poster) {
              var _img = m[2].match(/<img\b[^>]*>/i);
              if (_img) {
                var src = attr(_img[0], 'data-src') || attr(_img[0], 'src');
                if (src) item.poster = absoluteUrl(src, host);
              }
            }
            found.set(id, item);
          }
          return Array.from(found.values()).filter(function (i) {
            return i.title;
          });
        }
        function parseYear(html) {
          var text = stripTags(html);
          var m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\s*:?\s*((?:19|20)\d{2})/i);
          if (m) return Number(m[1]);
          return null;
        }
        function parsePage(html, url, host) {
          var h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
          var og = html.match(/<meta[^>]+property=["']og:title["'][^>]*>/i);
          var title = h1 ? stripTags(h1[1]) : '';
          if (!title && og) title = decodeEntities(attr(og[0], 'content') || '').trim();
          var orig = html.match(/class=["'][^"']*origintitle[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|div|h2|p)>/i);
          var original = orig ? stripTags(orig[1]) : '';
          var year = parseYear(html);
          if (!year) {
            var t = (title + ' ' + original).match(/\((19|20)\d{2}\)/);
            if (t) year = Number(t[0].slice(1, 5));
          }
          var ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
          var poster = ogImg ? absoluteUrl(attr(ogImg[0], 'content'), host) : '';
          var torrents = new Map();
          var re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
          var m;
          while (m = re.exec(html)) {
            var href = attr(m[0], 'href');
            if (!href || !/\/torrent\/\d+\//i.test(href)) continue;
            var link = localize(absoluteUrl(href, host), host);
            if (!link || torrents.has(link)) continue;
            var path = new URL(link).pathname;
            var tid = path.match(/\/torrent\/(\d+)\//)[1];
            var file = safeDecode(path.split('/').pop()).replace(/\.torrent$/i, '').trim();
            torrents.set(link, {
              id: tid,
              url: link,
              name: file || stripTags(m[2]),
              label: stripTags(m[2])
            });
          }
          var loose = /(["'])((?:https?:)?\/\/[^"'<>\s]*?\/torrent\/\d+\/[^"'<>]*?\.torrent|\/torrent\/\d+\/[^"'<>]*?\.torrent)\1/gi;
          while (m = loose.exec(html)) {
            var _link = localize(absoluteUrl(m[2], host), host);
            if (!_link || torrents.has(_link)) continue;
            var _path = new URL(_link).pathname;
            var _tid = _path.match(/\/torrent\/(\d+)\//)[1];
            torrents.set(_link, {
              id: _tid,
              url: _link,
              name: safeDecode(_path.split('/').pop()).replace(/\.torrent$/i, '').trim(),
              label: ''
            });
          }
          return {
            id: newsId(url),
            url: url,
            title: title,
            original: original,
            year: year,
            poster: poster,
            torrents: Array.from(torrents.values())
          };
        }
        function parseSitemap(xml) {
          var out = [];
          var re = /<loc>\s*([\s\S]*?)\s*<\/loc>/gi;
          var m;
          while (m = re.exec(xml)) out.push(decodeEntities(m[1].replace(/^<!\[CDATA\[|\]\]>$/g, '')));
          return out;
        }
        function normalizeTitle(s) {
          return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[ʼ’'`]/g, '').replace(/[^0-9a-z\u00c0-\u024f\u0400-\u04ff]+/g, ' ').trim();
        }
        function scoreTitle(item, titles) {
          var t = normalizeTitle(item.title + ' ' + (item.original || ''));
          var best = 0;
          var _iterator3 = _createForOfIteratorHelper(titles),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var raw = _step3.value;
              var q = normalizeTitle(raw);
              if (!q) continue;
              var s = 0;
              var base = normalizeTitle(item.title).replace(/\s*(сезон|season)\s*\d+.*$/, '').trim();
              if (base === q) s = 100;else if (t.indexOf(q) >= 0) s = 60;else if (q.indexOf(base) >= 0 && base.length > 3) s = 40;else {
                var words = q.split(' ').filter(function (w) {
                  return w.length > 2;
                });
                var hit = words.filter(function (w) {
                  return t.indexOf(w) >= 0;
                }).length;
                if (words.length) s = Math.round(hit / words.length * 30);
              }
              best = Math.max(best, s);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return best;
        }
        module.exports = {
          scoreTitle: scoreTitle,
          decodeEntities: decodeEntities,
          stripTags: stripTags,
          absoluteUrl: absoluteUrl,
          localize: localize,
          newsId: newsId,
          parseList: parseList,
          parsePage: parsePage,
          parseSitemap: parseSitemap,
          normalizeTitle: normalizeTitle
        };
      }],
      "lib/online.js": [{
        "./parse": "lib/parse.js"
      }, function (module, exports, require) {
        'use strict';
        var parse = require('./parse');
        var PLAYER_HOSTS = /(^|\.)(ashdi\.vip|tortuga\.(wtf|tw)|uakino\.[a-z]+)$/i;
        function attr(tag, name) {
          var m = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
          return m ? parse.decodeEntities(m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;
        }
        function absolute(url, host) {
          if (!url) return '';
          url = url.trim();
          if (url.indexOf('//') === 0) return 'https:' + url;
          if (/^https?:\/\//i.test(url)) return url;
          return host.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
        }
        function seasonOf(s) {
          var m = String(s || '').match(/сезон\s*(\d+)|(\d+)\s*сезон|season\s*(\d+)/i);
          return m ? Number(m[1] || m[2] || m[3]) : null;
        }
        function episodeOf(s) {
          var m = String(s || '').match(/(\d+)\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\s*(\d+)|^\s*(\d+)\b/i);
          return m ? Number(m[1] || m[2] || m[3]) : null;
        }
        function parsePlayers(html, host) {
          var playlist = null;
          var ajax = html.match(/<div\b[^>]*class=["'][^"']*playlists-ajax[^"']*["'][^>]*>/i);
          if (ajax) {
            var newsId = attr(ajax[0], 'data-news_id');
            if (newsId) playlist = {
              newsId: newsId,
              xfield: attr(ajax[0], 'data-xfname') || 'playlist'
            };
          }
          var iframes = [];
          var re = /<iframe\b[^>]*>/gi;
          var m;
          while (m = re.exec(html)) {
            var src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);
            if (!src || iframes.indexOf(src) >= 0) continue;
            try {
              var h = new URL(src).hostname;
              if (!PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;
            } catch (e) {
              continue;
            }
            if (/youtube|trailer/i.test(src)) continue;
            iframes.push(src);
          }
          return {
            playlist: playlist,
            iframes: iframes
          };
        }
        function parsePlaylist(html, host) {
          var labels = {};
          var episodes = [];
          var re = /<li\b([^>]*)>([\s\S]*?)<\/li>/gi;
          var m;
          while (m = re.exec(html)) {
            var open = '<li' + m[1] + '>';
            var file = attr(open, 'data-file');
            var id = attr(open, 'data-id');
            var text = parse.stripTags(m[2]);
            if (file) episodes.push({
              id: id || '',
              voice: attr(open, 'data-voice') || '',
              title: text,
              file: absolute(file, host)
            });else if (id != null) labels[id] = text;
          }
          return episodes.map(function (ep) {
            var parts = ep.id ? ep.id.split('_') : [];
            var names = [];
            for (var i = 1; i <= parts.length; i++) {
              var label = labels[parts.slice(0, i).join('_')];
              if (label && names.indexOf(label) < 0) names.push(label);
            }
            if (ep.voice && names.indexOf(ep.voice) < 0) names.push(ep.voice);
            return {
              group: names.join(' / ') || 'UAKino',
              title: ep.title,
              file: ep.file
            };
          });
        }
        function jsString(html, key) {
          var re = new RegExp('[\\s,{]' + key + '\\s*:\\s*([\'"])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1');
          var m = html.match(re);
          if (!m) return null;
          return m[2].replace(/\\(.)/g, function (s, c) {
            return c === 'n' ? '\n' : c;
          });
        }
        function parseQualities(str) {
          var out = {};
          String(str || '').split(/,(?=\s*(?:\[|https?:|\/\/))/).forEach(function (part) {
            var m = part.trim().match(/^\[([^\]]*)\](.+)$/);
            if (m) {
              m[2].split(' or ').forEach(function (u) {
                if (!out[m[1]]) out[m[1]] = absolute(u.trim(), 'https://x');
              });
            } else if (part.trim()) {
              out.auto = absolute(part.trim().split(' or ')[0], 'https://x');
            }
          });
          return out;
        }
        function parseSubtitles(str) {
          if (!str) return [];
          return String(str).split(/,(?=\s*\[)/).map(function (part) {
            var m = part.trim().match(/^\[([^\]]*)\](.+)$/);
            return m ? {
              label: m[1],
              url: absolute(m[2].trim(), 'https://x')
            } : {
              label: 'Субтитри',
              url: absolute(part.trim(), 'https://x')
            };
          }).filter(function (s) {
            return /^https?:/.test(s.url);
          });
        }
        function toStream(file, subtitle) {
          var q = parseQualities(file);
          var keys = Object.keys(q);
          if (!keys.length) return null;
          var best = keys.slice().sort(function (a, b) {
            return (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0);
          })[0];
          return {
            url: q[best],
            quality: keys.length > 1 ? q : null,
            subtitles: parseSubtitles(subtitle)
          };
        }
        function flatten(nodes, path, out) {
          (nodes || []).forEach(function (n) {
            if (Array.isArray(n.folder)) flatten(n.folder, path.concat(n.title || ''), out);else if (n.file) out.push({
              path: path,
              title: n.title || '',
              file: n.file,
              subtitle: n.subtitle || ''
            });
          });
          return out;
        }
        function parsePlayerjs(html) {
          var file = jsString(html, 'file');
          if (!file) return null;
          var subtitle = jsString(html, 'subtitle') || '';
          var trimmed = file.trim();
          if (trimmed[0] === '[' && trimmed[1] !== ']' && /^\[\s*\{/.test(trimmed)) {
            var data;
            try {
              data = JSON.parse(trimmed);
            } catch (e) {
              return null;
            }
            return {
              folders: flatten(data, [], [])
            };
          }
          if (trimmed[0] === '#') return null;
          return {
            file: trimmed,
            subtitle: subtitle
          };
        }
        var TinyCache = function () {
          function TinyCache(ttl) {
            _classCallCheck(this, TinyCache);
            this.ttl = ttl;
            this.map = new Map();
          }
          return _createClass(TinyCache, [{
            key: "wrap",
            value: function () {
              var _wrap = _asyncToGenerator(_regenerator().m(function _callee4(key, fn) {
                var e, v;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      e = this.map.get(key);
                      if (!(e && Date.now() < e.exp)) {
                        _context4.n = 1;
                        break;
                      }
                      return _context4.a(2, e.v);
                    case 1:
                      _context4.n = 2;
                      return fn();
                    case 2:
                      v = _context4.v;
                      if (this.map.size > 500) this.map.delete(this.map.keys().next().value);
                      this.map.set(key, {
                        v: v,
                        exp: Date.now() + this.ttl
                      });
                      return _context4.a(2, v);
                  }
                }, _callee4, this);
              }));
              function wrap(_x4, _x5) {
                return _wrap.apply(this, arguments);
              }
              return wrap;
            }()
          }]);
        }();
        function createOnline(_ref3) {
          var host = _ref3.host,
            fetchText = _ref3.fetchText,
            searchSite = _ref3.searchSite;
          var cache = new TinyCache(20 * 60 * 1000);
          host = host.replace(/\/+$/, '');
          function checkUrl(url, players) {
            var u;
            try {
              u = new URL(url);
            } catch (e) {
              throw Object.assign(new Error('bad url'), {
                status: 400
              });
            }
            var own = u.hostname.replace(/^www\./, '') === new URL(host).hostname.replace(/^www\./, '');
            var ok = own || players && PLAYER_HOSTS.test(u.hostname);
            if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), {
              status: 403
            });
            return u.toString();
          }
          function findPages(_x6) {
            return _findPages.apply(this, arguments);
          }
          function _findPages() {
            _findPages = _asyncToGenerator(_regenerator().m(function _callee5(_ref4) {
              var _ref4$title, title, _ref4$original, original, _ref4$query, query, titles, found, lastError, _iterator4, _step4, q, _iterator5, _step5, item, list, best, _t7, _t8, _t9;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.p = _context5.n) {
                  case 0:
                    _ref4$title = _ref4.title, title = _ref4$title === void 0 ? '' : _ref4$title, _ref4$original = _ref4.original, original = _ref4$original === void 0 ? '' : _ref4$original, _ref4$query = _ref4.query, query = _ref4$query === void 0 ? '' : _ref4$query;
                    titles = [title, original, query].filter(Boolean).filter(function (v, i, a) {
                      return a.indexOf(v) === i;
                    }).slice(0, 3);
                    found = new Map();
                    lastError = null;
                    _iterator4 = _createForOfIteratorHelper(titles);
                    _context5.p = 1;
                    _iterator4.s();
                  case 2:
                    if ((_step4 = _iterator4.n()).done) {
                      _context5.n = 7;
                      break;
                    }
                    q = _step4.value;
                    _context5.p = 3;
                    _t7 = _createForOfIteratorHelper;
                    _context5.n = 4;
                    return searchSite(q);
                  case 4:
                    _iterator5 = _t7(_context5.v);
                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        item = _step5.value;
                        if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, {
                          score: parse.scoreTitle(item, titles),
                          season: seasonOf(item.title)
                        }));
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }
                    _context5.n = 6;
                    break;
                  case 5:
                    _context5.p = 5;
                    _t8 = _context5.v;
                    lastError = _t8;
                  case 6:
                    _context5.n = 2;
                    break;
                  case 7:
                    _context5.n = 9;
                    break;
                  case 8:
                    _context5.p = 8;
                    _t9 = _context5.v;
                    _iterator4.e(_t9);
                  case 9:
                    _context5.p = 9;
                    _iterator4.f();
                    return _context5.f(9);
                  case 10:
                    if (!(!found.size && lastError)) {
                      _context5.n = 11;
                      break;
                    }
                    throw lastError;
                  case 11:
                    list = Array.from(found.values()).filter(function (p) {
                      return p.score >= 40;
                    });
                    best = list.reduce(function (m, p) {
                      return Math.max(m, p.score);
                    }, 0);
                    list = list.filter(function (p) {
                      return p.score >= best - 20;
                    });
                    list.sort(function (a, b) {
                      return b.score - a.score || (a.season || 0) - (b.season || 0);
                    });
                    if (list.some(function (p) {
                      return p.season;
                    })) list.sort(function (a, b) {
                      return (a.season || 0) - (b.season || 0);
                    });
                    return _context5.a(2, list.map(function (_ref5) {
                      var id = _ref5.id,
                        url = _ref5.url,
                        t = _ref5.title,
                        poster = _ref5.poster,
                        season = _ref5.season;
                      return {
                        id: id,
                        url: url,
                        title: t,
                        poster: poster,
                        season: season
                      };
                    }));
                }
              }, _callee5, null, [[3, 5], [1, 8, 9, 10]]);
            }));
            return _findPages.apply(this, arguments);
          }
          function stream(_x7, _x8) {
            return _stream.apply(this, arguments);
          }
          function _stream() {
            _stream = _asyncToGenerator(_regenerator().m(function _callee7(url, referer) {
              return _regenerator().w(function (_context7) {
                while (1) switch (_context7.n) {
                  case 0:
                    url = checkUrl(url, true);
                    return _context7.a(2, cache.wrap('stream:' + url, _asyncToGenerator(_regenerator().m(function _callee6() {
                      var html, p, s;
                      return _regenerator().w(function (_context6) {
                        while (1) switch (_context6.n) {
                          case 0:
                            _context6.n = 1;
                            return fetchText(url, {
                              referer: referer || host + '/'
                            });
                          case 1:
                            html = _context6.v;
                            p = parsePlayerjs(html);
                            if (p) {
                              _context6.n = 2;
                              break;
                            }
                            throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), {
                              status: 404
                            });
                          case 2:
                            if (!p.folders) {
                              _context6.n = 3;
                              break;
                            }
                            return _context6.a(2, {
                              items: p.folders.map(function (f) {
                                return {
                                  group: f.path.filter(function (x) {
                                    return !seasonOf(x);
                                  }).join(' / ') || 'UAKino',
                                  season: seasonOf(f.path.join(' ')),
                                  title: f.title,
                                  episode: episodeOf(f.title),
                                  stream: toStream(f.file, f.subtitle)
                                };
                              }).filter(function (i) {
                                return i.stream;
                              })
                            });
                          case 3:
                            s = toStream(p.file, p.subtitle);
                            if (s) {
                              _context6.n = 4;
                              break;
                            }
                            throw Object.assign(new Error('порожнє посилання на відео'), {
                              status: 404
                            });
                          case 4:
                            return _context6.a(2, s);
                        }
                      }, _callee6);
                    }))));
                }
              }, _callee7);
            }));
            return _stream.apply(this, arguments);
          }
          function loadPage(_x9) {
            return _loadPage.apply(this, arguments);
          }
          function _loadPage() {
            _loadPage = _asyncToGenerator(_regenerator().m(function _callee9(url) {
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.n) {
                  case 0:
                    url = checkUrl(url, false);
                    return _context9.a(2, cache.wrap('page:' + url, _asyncToGenerator(_regenerator().m(function _callee8() {
                      var html, page, season, players, items, ajax, text, body, data, _iterator6, _step6, src, s, _t0, _t1, _t10;
                      return _regenerator().w(function (_context8) {
                        while (1) switch (_context8.p = _context8.n) {
                          case 0:
                            _context8.n = 1;
                            return fetchText(url, {});
                          case 1:
                            html = _context8.v;
                            page = parse.parsePage(html, url, host);
                            season = seasonOf(page.title);
                            players = parsePlayers(html, host);
                            items = [];
                            if (!players.playlist) {
                              _context8.n = 5;
                              break;
                            }
                            _context8.p = 2;
                            ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) + '&xfield=' + encodeURIComponent(players.playlist.xfield) + '&time=' + Date.now();
                            _context8.n = 3;
                            return fetchText(ajax, {
                              xhr: true,
                              referer: url
                            });
                          case 3:
                            text = _context8.v;
                            body = text;
                            try {
                              data = JSON.parse(text);
                              body = data && data.success !== false ? String(data.response || '') : '';
                            } catch (e) {}
                            items = parsePlaylist(body, host).filter(function (ep) {
                              return !/трейлер|trailer/i.test(ep.group + ' ' + ep.title);
                            }).map(function (ep) {
                              return {
                                group: ep.group,
                                season: season,
                                title: ep.title,
                                episode: episodeOf(ep.title),
                                url: ep.file
                              };
                            });
                            _context8.n = 5;
                            break;
                          case 4:
                            _context8.p = 4;
                            _t0 = _context8.v;
                            if (players.iframes.length) {
                              _context8.n = 5;
                              break;
                            }
                            throw _t0;
                          case 5:
                            if (items.length) {
                              _context8.n = 15;
                              break;
                            }
                            _iterator6 = _createForOfIteratorHelper(players.iframes);
                            _context8.p = 6;
                            _iterator6.s();
                          case 7:
                            if ((_step6 = _iterator6.n()).done) {
                              _context8.n = 12;
                              break;
                            }
                            src = _step6.value;
                            _context8.p = 8;
                            _context8.n = 9;
                            return stream(src, url);
                          case 9:
                            s = _context8.v;
                            if (s.items) items = items.concat(s.items.map(function (i) {
                              return Object.assign({}, i, {
                                season: i.season || season
                              });
                            }));else items.push({
                              group: 'UAKino',
                              season: season,
                              title: page.title,
                              episode: null,
                              stream: s
                            });
                            _context8.n = 11;
                            break;
                          case 10:
                            _context8.p = 10;
                            _t1 = _context8.v;
                          case 11:
                            _context8.n = 7;
                            break;
                          case 12:
                            _context8.n = 14;
                            break;
                          case 13:
                            _context8.p = 13;
                            _t10 = _context8.v;
                            _iterator6.e(_t10);
                          case 14:
                            _context8.p = 14;
                            _iterator6.f();
                            return _context8.f(14);
                          case 15:
                            return _context8.a(2, {
                              url: url,
                              title: page.title,
                              original: page.original,
                              year: page.year,
                              poster: page.poster,
                              season: season,
                              items: items
                            });
                        }
                      }, _callee8, null, [[8, 10], [6, 13, 14, 15], [2, 4]]);
                    }))));
                }
              }, _callee9);
            }));
            return _loadPage.apply(this, arguments);
          }
          function route(_x0, _x1) {
            return _route.apply(this, arguments);
          }
          function _route() {
            _route = _asyncToGenerator(_regenerator().m(function _callee0(pathname, params) {
              var _t11;
              return _regenerator().w(function (_context0) {
                while (1) switch (_context0.n) {
                  case 0:
                    if (!(pathname === '/online/search')) {
                      _context0.n = 2;
                      break;
                    }
                    _context0.n = 1;
                    return findPages({
                      title: params.get('title') || '',
                      original: params.get('original') || params.get('title_original') || '',
                      query: params.get('query') || params.get('Query') || ''
                    });
                  case 1:
                    _t11 = _context0.v;
                    return _context0.a(2, {
                      pages: _t11
                    });
                  case 2:
                    if (!(pathname === '/online/page')) {
                      _context0.n = 3;
                      break;
                    }
                    return _context0.a(2, loadPage(params.get('url') || ''));
                  case 3:
                    if (!(pathname === '/online/stream')) {
                      _context0.n = 4;
                      break;
                    }
                    return _context0.a(2, stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : ''));
                  case 4:
                    return _context0.a(2, null);
                }
              }, _callee0);
            }));
            return _route.apply(this, arguments);
          }
          return {
            findPages: findPages,
            loadPage: loadPage,
            stream: stream,
            route: route
          };
        }
        module.exports = {
          createOnline: createOnline,
          parsePlayers: parsePlayers,
          parsePlaylist: parsePlaylist,
          parsePlayerjs: parsePlayerjs,
          parseQualities: parseQualities,
          parseSubtitles: parseSubtitles,
          toStream: toStream,
          seasonOf: seasonOf,
          episodeOf: episodeOf
        };
      }],
      "lib/jackett.js": [{}, function (module, exports, require) {
        'use strict';
        function toJackett(r, base) {
          var page = r.page,
            torrent = r.torrent,
            meta = r.meta,
            peers = r.peers;
          var title = torrent.name || page.title;
          if (page.original && title.toLowerCase().indexOf(page.original.toLowerCase()) < 0) title += ' / ' + page.original;
          if (page.year && title.indexOf(String(page.year)) < 0) title += ' (' + page.year + ')';
          if (torrent.label && torrent.label !== torrent.name && title.indexOf(torrent.label) < 0) title += ' [' + torrent.label + ']';
          var serial = /сезон|season|сері[яї]|серии/i.test(torrent.name + ' ' + page.title);
          var created = meta && meta.created ? new Date(meta.created * 1000) : null;
          return {
            Tracker: 'UAKino',
            TrackerId: 'uakino',
            TrackerType: 'public',
            CategoryDesc: serial ? 'TV' : 'Movies',
            Category: serial ? [5000] : [2000],
            Title: title,
            Guid: torrent.url,
            Link: base + '/download?url=' + encodeURIComponent(torrent.url),
            Details: page.url,
            Poster: page.poster || null,
            PublishDate: (created && !isNaN(created) ? created : new Date()).toISOString(),
            Size: meta ? meta.size : 0,
            Files: meta ? meta.files : null,
            Seeders: peers ? peers.seeders : 0,
            Peers: peers ? peers.leechers : 0,
            InfoHash: meta ? meta.infoHash : null,
            MagnetUri: meta ? meta.magnet : null,
            DownloadVolumeFactor: 0,
            UploadVolumeFactor: 1
          };
        }
        module.exports = {
          toJackett: toJackett
        };
      }],
      "lib/search.js": [{
        "./parse": "lib/parse.js"
      }, function (module, exports, require) {
        'use strict';
        var parse = require('./parse');
        function simplify(q) {
          return q.split(/[:–—(]/)[0].replace(/[^0-9a-zA-ZÀ-ɏЀ-ӿ ]+/g, ' ').replace(/\s+/g, ' ').trim();
        }
        function searchDle(_x10, _x11, _x12) {
          return _searchDle.apply(this, arguments);
        }
        function _searchDle() {
          _searchDle = _asyncToGenerator(_regenerator().m(function _callee1(host, query, fetchText) {
            var q, queries, short, errors, ok, _i, _queries, story, attempts, _i2, _attempts, _attempts$_i, method, url, body, list, err, _t12, _t13;
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.p = _context1.n) {
                case 0:
                  q = String(query || '').trim();
                  if (!(q.length < 2)) {
                    _context1.n = 1;
                    break;
                  }
                  return _context1.a(2, []);
                case 1:
                  queries = [q];
                  short = simplify(q);
                  if (short.length >= 3 && short.toLowerCase() !== q.toLowerCase()) queries.push(short);
                  errors = [];
                  ok = false;
                  _i = 0, _queries = queries;
                case 2:
                  if (!(_i < _queries.length)) {
                    _context1.n = 10;
                    break;
                  }
                  story = _queries[_i];
                  attempts = [['POST', host + '/index.php?do=search', 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(story)], ['GET', host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(story), null]];
                  _i2 = 0, _attempts = attempts;
                case 3:
                  if (!(_i2 < _attempts.length)) {
                    _context1.n = 9;
                    break;
                  }
                  _attempts$_i = _slicedToArray(_attempts[_i2], 3), method = _attempts$_i[0], url = _attempts$_i[1], body = _attempts$_i[2];
                  _context1.p = 4;
                  _t12 = parse;
                  _context1.n = 5;
                  return fetchText(url, method === 'POST' ? {
                    method: method,
                    body: body
                  } : {});
                case 5:
                  list = _t12.parseList.call(_t12, _context1.v, host);
                  ok = true;
                  if (!list.length) {
                    _context1.n = 6;
                    break;
                  }
                  return _context1.a(2, list);
                case 6:
                  _context1.n = 8;
                  break;
                case 7:
                  _context1.p = 7;
                  _t13 = _context1.v;
                  errors.push(method + ': ' + _t13.message);
                case 8:
                  _i2++;
                  _context1.n = 3;
                  break;
                case 9:
                  _i++;
                  _context1.n = 2;
                  break;
                case 10:
                  if (ok) {
                    _context1.n = 11;
                    break;
                  }
                  err = new Error('пошук на uakino не вдався (' + errors.join('; ') + ')');
                  err.status = 502;
                  throw err;
                case 11:
                  return _context1.a(2, []);
              }
            }, _callee1, null, [[4, 7]]);
          }));
          return _searchDle.apply(this, arguments);
        }
        module.exports = {
          searchDle: searchDle,
          simplify: simplify
        };
      }]
    };
    var __cache = {};
    function __load(id) {
      if (__cache[id]) return __cache[id].exports;
      var mod = __modules[id];
      var module = __cache[id] = {
        exports: {}
      };
      mod[1](module, module.exports, function (spec) {
        if (!mod[0][spec]) throw new Error('module not bundled: ' + spec);
        return __load(mod[0][spec]);
      });
      return module.exports;
    }
    return __load("lib/client.js");
  }();
  (function () {
    'use strict';

    if (window.uakino_torrents_plugin) return;
    window.uakino_torrents_plugin = true;
    var BUILT_IN_SERVER = '__UAKINO_SERVER__';
    if (BUILT_IN_SERVER.indexOf('__') === 0) BUILT_IN_SERVER = '';
    var ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2 3 6v6c0 5 3.8 9.7 9 10 5.2-.3 9-5 9-10V6l-9-4Zm0 4.2 2 4.3H10l2-4.3ZM8 12h8l-4 6-4-6Z"/></svg>';
    var ICON_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14.5v-9l7 4.5-7 4.5Z"/></svg>';
    function serverUrl() {
      var s = Lampa.Storage.get('uakino_server', '') || BUILT_IN_SERVER;
      s = String(s).trim().replace(/\/+$/, '');
      if (s && !/^https?:\/\//i.test(s)) s = 'http://' + s;
      return s;
    }
    function enc(v) {
      return encodeURIComponent(v || '');
    }
    function movieInfo(movie) {
      var date = movie.release_date || movie.first_air_date || '';
      return {
        title: movie.title || movie.name || '',
        original: movie.original_title || movie.original_name || '',
        year: String(date).slice(0, 4),
        serial: !!(movie.name || movie.first_air_date)
      };
    }
    var DEFAULT_HOST = 'https://uakino.best';
    function errorText(network, a, c) {
      if (a && a.responseJSON && a.responseJSON.error) return a.responseJSON.error;
      if (a && a.responseText) {
        try {
          return JSON.parse(a.responseText).error || 'помилка';
        } catch (e) {}
      }
      return network.errorDecode ? network.errorDecode(a, c) : 'помилка запиту';
    }
    function bytes(size) {
      if (!size) return '';
      if (Lampa.Utils && Lampa.Utils.bytesToSize) return Lampa.Utils.bytesToSize(size);
      var units = ['B', 'KB', 'MB', 'GB', 'TB'];
      var i = Math.min(units.length - 1, Math.floor(Math.log(size) / Math.log(1024)));
      return (size / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];
    }
    function stopLoading() {
      if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
    }
    function mode() {
      return Lampa.Storage.get('uakino_mode', 'direct') === 'server' && serverUrl() ? 'server' : 'direct';
    }
    function siteHost() {
      return String(Lampa.Storage.get('uakino_host', '') || DEFAULT_HOST).trim().replace(/\/+$/, '');
    }
    function describe(a) {
      var status = a && a.status;
      var text = a && (a.responseText || a.message || a.error);
      if (text && typeof text === 'string') {
        var title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        text = (title ? title[1] : text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
      } else text = '';
      var head = status ? 'HTTP ' + status : "немає з'єднання";
      if (/just a moment|attention required|cloudflare|ddos/i.test(text)) head += ' (захист Cloudflare)';
      return head + (text ? ' «' + text + '»' : '');
    }
    var preferred = null;
    var BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
    function deviceFetch(url, o) {
      o = o || {};
      var methods = [];
      if (typeof new Lampa.Reguest()['native'] === 'function') methods.push('native');
      methods.push('silent');
      if (preferred && methods.indexOf(preferred) > 0) methods = [preferred].concat(methods.filter(function (m) {
        return m !== preferred;
      }));
      var errors = [];
      return new Promise(function (resolve, reject) {
        function attempt(i) {
          var method = methods[i];
          var net = new Lampa.Reguest();
          net.timeout(20000);
          var headers = method === 'native' ? {
            'User-Agent': BROWSER_UA,
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
            Referer: o.referer || siteHost() + '/'
          } : {};
          if (o.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';
          if (o.body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
          net[method](url, function (text) {
            preferred = method;
            resolve(typeof text === 'string' ? text : JSON.stringify(text));
          }, function (a) {
            errors.push((method === 'native' ? 'застосунок' : 'WebView') + ': ' + describe(a));
            if (i + 1 < methods.length) return attempt(i + 1);
            var err = new Error(errors.join(', '));
            err.status = a && a.status;
            reject(err);
          }, o.body || false, {
            dataType: 'text',
            headers: headers
          });
        }
        attempt(0);
      });
    }
    var client = null;
    function direct() {
      var host = siteHost();
      if (!client || client.host !== host) client = UAKinoLib.createClient({
        host: host,
        fetchText: deviceFetch
      });
      return client;
    }
    function promised(promise, ok, fail) {
      promise.then(ok, function (e) {
        fail(e && e.message || String(e));
      });
    }
    function serverGet(path, ok, fail) {
      var net = new Lampa.Reguest();
      net.timeout(120000);
      net.silent(serverUrl() + path, ok, function (a, c) {
        fail(errorText(net, a, c));
      });
    }
    var Api = {
      torrents: function torrents(m, ok, fail) {
        if (mode() === 'direct') return promised(direct().torrents({
          title: m.title,
          original: m.original,
          year: m.year
        }), ok, fail);
        serverGet('/api/v2.0/indexers/uakino/results' + '?apikey=' + enc(Lampa.Storage.get('uakino_apikey', '')) + '&Query=' + enc(m.title || m.original) + '&title=' + enc(m.title) + '&title_original=' + enc(m.original) + '&year=' + enc(m.year) + '&is_serial=' + (m.serial ? 2 : 1), function (json) {
          ok(json && json.Results || []);
        }, fail);
      },
      search: function search(m, ok, fail) {
        if (mode() === 'direct') {
          return promised(direct().online.findPages({
            title: m.title,
            original: m.original
          }), ok, function (err) {
            deviceFetch(siteHost() + '/', {}).then(function (html) {
              var t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
              fail(err + '. Головна сторінка відкривається: «' + (t ? t[1].trim().slice(0, 60) : html.length + ' байт') + '»');
            }, function (e) {
              deviceFetch('https://example.com/', {}).then(function () {
                fail(err + '. Головна сторінка теж не відкривається: ' + e.message + '. Інші сайти з цього пристрою відкриваються — блокується саме uakino');
              }, function (e2) {
                fail(err + '. Головна сторінка теж не відкривається: ' + e.message + '. Інші сайти теж не відкриваються: ' + e2.message);
              });
            });
          });
        }
        serverGet('/online/search?title=' + enc(m.title) + '&original=' + enc(m.original) + '&year=' + enc(m.year), function (json) {
          ok(json && json.pages || []);
        }, fail);
      },
      page: function page(url, ok, fail) {
        if (mode() === 'direct') return promised(direct().online.loadPage(url), ok, fail);
        serverGet('/online/page?url=' + enc(url), ok, fail);
      },
      stream: function stream(url, referer, ok, fail) {
        if (mode() === 'direct') return promised(direct().online.stream(url, referer), ok, fail);
        serverGet('/online/stream?url=' + enc(url) + '&referer=' + enc(referer), ok, fail);
      }
    };
    var torrentRequest = 0;
    function prepareTorrent(element) {
      element.size = bytes(element.Size);
      if (Lampa.Utils && Lampa.Utils.hash) element.hash = Lampa.Utils.hash(element.Title);
      if (Lampa.Utils && Lampa.Utils.strToTime && element.PublishDate) element.PublisTime = Lampa.Utils.strToTime(element.PublishDate);
      return element;
    }
    function openTorrents(movie) {
      var controller = Lampa.Controller.enabled().name;
      var id = ++torrentRequest;
      if (Lampa.Loading && Lampa.Loading.start) {
        Lampa.Loading.start(function () {
          torrentRequest++;
          stopLoading();
          Lampa.Controller.toggle(controller);
        });
      }
      Api.torrents(movieInfo(movie), function (results) {
        if (id !== torrentRequest) return;
        stopLoading();
        if (!results.length) {
          Lampa.Noty.show('На UAKino торентів не знайдено');
          Lampa.Controller.toggle(controller);
          return;
        }
        var items = results.map(function (r) {
          var info = [];
          if (r.Size) info.push(bytes(r.Size));
          if (r.Files) info.push(r.Files + ' файл.');
          info.push('▲ ' + (r.Seeders || 0));
          info.push('▼ ' + (r.Peers || 0));
          return {
            title: r.Title,
            subtitle: info.join(' • '),
            torrent: prepareTorrent(r)
          };
        });
        Lampa.Select.show({
          title: 'UAKino — торенти',
          items: items,
          onSelect: function onSelect(item) {
            Lampa.Controller.toggle(controller);
            if (Lampa.Torrent && typeof Lampa.Torrent.start === 'function') Lampa.Torrent.start(item.torrent, movie);else Lampa.Noty.show('Ця версія Lampa не підтримує запуск торентів з плагіна');
          },
          onBack: function onBack() {
            Lampa.Controller.toggle(controller);
          }
        });
      }, function (err) {
        if (id !== torrentRequest) return;
        stopLoading();
        Lampa.Noty.show('UAKino: ' + err);
        Lampa.Controller.toggle(controller);
      });
    }
    function OnlineComponent(object) {
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var html = $('<div class="uakino-online"></div>');
      var movie = object.movie || {};
      var info = movieInfo(movie);
      var self = this;
      var pages = [];
      var pageIndex = 0;
      var data = null;
      var groups = [];
      var groupIndex = 0;
      var last = null;
      var storeKey = 'uakino_choice_' + (movie.id || info.original || info.title);
      var destroyed = false;
      function alive(fn) {
        return function (v) {
          if (!destroyed) fn(v);
        };
      }
      function choice() {
        var c = Lampa.Storage.get(storeKey, '{}');
        if (typeof c === 'string') {
          try {
            c = JSON.parse(c);
          } catch (e) {
            c = {};
          }
        }
        return c || {};
      }
      function saveChoice() {
        Lampa.Storage.set(storeKey, {
          page: pageIndex,
          group: groups[groupIndex] || ''
        });
      }
      function message(text) {
        scroll.clear();
        scroll.append($('<div class="uakino-online__empty"></div>').text(text));
        self.activity.loader(false);
        self.activity.toggle();
      }
      this.create = function () {
        html.append(scroll.render());
        this.activity.loader(true);
        Api.search(info, alive(function (list) {
          pages = list || [];
          if (!pages.length) return message('На UAKino нічого не знайдено');
          var c = choice();
          pageIndex = c.page < pages.length ? c.page || 0 : 0;
          loadPage();
        }), alive(function (err) {
          message('UAKino: ' + err);
        }));
        return this.render();
      };
      function loadPage() {
        self.activity.loader(true);
        Api.page(pages[pageIndex].url, alive(function (json) {
          data = json || {
            items: []
          };
          groups = [];
          (data.items || []).forEach(function (item) {
            if (groups.indexOf(item.group) < 0) groups.push(item.group);
          });
          var saved = groups.indexOf(choice().group);
          groupIndex = saved >= 0 ? saved : 0;
          build();
        }), alive(function (err) {
          message('UAKino: ' + err);
        }));
      }
      function currentItems() {
        var group = groups[groupIndex];
        return (data && data.items || []).filter(function (item) {
          return item.group === group;
        });
      }
      function pageName(p) {
        return p.season ? 'Сезон ' + p.season : p.title;
      }
      function filterButton(label, value, onEnter) {
        var btn = $('<div class="uakino-online__filter selector"><span></span> <b></b></div>');
        btn.find('span').text(label);
        btn.find('b').text(value);
        btn.on('hover:enter', onEnter);
        btn.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        return btn;
      }
      function select(title, list, current, _onSelect) {
        Lampa.Select.show({
          title: title,
          items: list.map(function (name, i) {
            return {
              title: name,
              selected: i === current,
              index: i
            };
          }),
          onSelect: function onSelect(a) {
            _onSelect(a.index);
          },
          onBack: function onBack() {
            Lampa.Controller.toggle('content');
          }
        });
      }
      function hashFor(item) {
        if (!Lampa.Utils || !Lampa.Utils.hash) return '';
        var base = info.original || info.title;
        if (item.episode != null && (item.season || data.season || info.serial)) {
          var season = item.season || data.season || 1;
          return Lampa.Utils.hash([season, season > 10 ? ':' : '', item.episode, base].join(''));
        }
        return Lampa.Utils.hash(base);
      }
      function timeline(item) {
        try {
          var hash = hashFor(item);
          return hash && Lampa.Timeline ? Lampa.Timeline.view(hash) : null;
        } catch (e) {
          return null;
        }
      }
      function build() {
        scroll.clear();
        last = null;
        var filters = $('<div class="uakino-online__filters"></div>');
        if (pages.length > 1) {
          filters.append(filterButton('Сторінка:', pageName(pages[pageIndex]), function () {
            select('UAKino', pages.map(pageName), pageIndex, function (i) {
              pageIndex = i;
              saveChoice();
              loadPage();
            });
          }));
        }
        if (groups.length > 1) {
          filters.append(filterButton('Озвучка:', groups[groupIndex], function () {
            select('Озвучка', groups, groupIndex, function (i) {
              groupIndex = i;
              saveChoice();
              build();
            });
          }));
        }
        scroll.append(filters);
        var items = currentItems();
        if (!items.length) {
          scroll.append($('<div class="uakino-online__empty"></div>').text('На цій сторінці немає відео'));
        }
        items.forEach(function (item, index) {
          var el = $('<div class="uakino-online__item selector"><div class="uakino-online__title"></div><div class="uakino-online__info"></div><div class="uakino-online__timeline"></div></div>');
          el.find('.uakino-online__title').text(item.title || data.title);
          var meta = [];
          if (item.season || data.season) meta.push('Сезон ' + (item.season || data.season));
          if (item.group) meta.push(item.group);
          el.find('.uakino-online__info').text(meta.join(' • '));
          var view = timeline(item);
          if (view && Lampa.Timeline.render) el.find('.uakino-online__timeline').append(Lampa.Timeline.render(view));
          el.on('hover:enter', function () {
            play(items, index);
          });
          el.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          });
          scroll.append(el);
        });
        self.activity.loader(false);
        self.activity.toggle();
      }
      function resolve(item, ok, fail) {
        if (item.stream) return ok(item.stream);
        Api.stream(item.url, data.url, function (json) {
          var s = json && json.items && json.items.length ? json.items[0].stream : json;
          if (!s || !s.url) return fail('посилання на відео не знайдено');
          item.stream = s;
          ok(s);
        }, fail);
      }
      function playerItem(item, stream) {
        var title = item.title || data.title;
        var p = {
          title: title,
          url: stream.url
        };
        if (stream.quality) p.quality = stream.quality;
        if (stream.subtitles && stream.subtitles.length) p.subtitles = stream.subtitles;
        var view = timeline(item);
        if (view) p.timeline = view;
        return p;
      }
      function play(items, index) {
        var item = items[index];
        Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start(function () {
          stopLoading();
        });
        resolve(item, function (stream) {
          stopLoading();
          var first = playerItem(item, stream);
          var playlist = items.map(function (it, i) {
            if (i === index) return first;
            var cell = {
              title: it.title || data.title
            };
            if (it.stream) return playerItem(it, it.stream);
            cell.url = function (call) {
              resolve(it, function (s) {
                var p = playerItem(it, s);
                cell.url = p.url;
                cell.quality = p.quality;
                cell.subtitles = p.subtitles;
                cell.timeline = p.timeline;
                call();
              }, function (err) {
                cell.url = '';
                Lampa.Noty.show('UAKino: ' + err);
                call();
              });
            };
            return cell;
          });
          Lampa.Player.play(first);
          Lampa.Player.playlist(playlist);
        }, function (err) {
          stopLoading();
          Lampa.Noty.show('UAKino: ' + err);
        });
      }
      this.start = function () {
        if (Lampa.Activity.active && Lampa.Activity.active().activity !== this.activity) return;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          back: function back() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle('content');
      };
      this.render = function () {
        return html;
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        destroyed = true;
        scroll.destroy();
        html.remove();
      };
    }
    function openOnline(movie) {
      Lampa.Activity.push({
        url: '',
        title: 'UAKino',
        component: 'uakino_online',
        movie: movie,
        page: 1
      });
    }
    var CSS = '<style>' + '.uakino-online{padding:0 1.5em 1.5em}' + '.uakino-online__filters{display:flex;flex-wrap:wrap;margin-bottom:1em}' + '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' + '.uakino-online__item{padding:1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' + '.uakino-online__filter.focus,.uakino-online__item.focus{background:#fff;color:#000}' + '.uakino-online__title{font-size:1.3em}' + '.uakino-online__info{margin-top:.3em;opacity:.6}' + '.uakino-online__empty{padding:2em 0;text-align:center;opacity:.7}' + '</style>';
    function addButtons(e) {
      var render = e.object.activity.render();
      if (render.find('.view--uakino').length) return;
      var online = $('<div class="full-start__button selector view--uakino view--uakino-online">' + ICON_PLAY + '<span>UAKino</span></div>');
      online.on('hover:enter', function () {
        openOnline(e.data.movie);
      });
      var torrents = $('<div class="full-start__button selector view--uakino view--uakino-torrent">' + ICON + '<span>UAKino торенти</span></div>');
      torrents.on('hover:enter', function () {
        openTorrents(e.data.movie);
      });
      var torrent = render.find('.view--torrent');
      if (torrent.length) {
        torrent.before(online);
        torrent.after(torrents);
      } else {
        var box = render.find('.full-start-new__buttons, .full-start__buttons').first();
        box.append(online);
        box.append(torrents);
      }
      if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');
    }
    function addSettings() {
      if (!Lampa.SettingsApi) return;
      Lampa.SettingsApi.addComponent({
        component: 'uakino',
        name: 'UAKino',
        icon: ICON
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: {
          name: 'uakino_mode',
          type: 'select',
          values: {
            direct: 'З пристрою (рекомендовано)',
            server: 'Через парсер'
          },
          default: 'direct'
        },
        field: {
          name: 'Звідки завантажувати',
          description: 'uakino пускає лише домашні IP, тому запити краще робити прямо з ТВ/приставки'
        }
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: {
          name: 'uakino_host',
          type: 'input',
          values: '',
          default: '',
          placeholder: DEFAULT_HOST
        },
        field: {
          name: 'Адреса сайту',
          description: 'Дзеркало uakino. За замовчуванням: ' + DEFAULT_HOST
        }
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: {
          name: 'uakino_server',
          type: 'input',
          values: '',
          default: '',
          placeholder: BUILT_IN_SERVER || 'https://uakino-lampa.example.workers.dev'
        },
        field: {
          name: 'Адреса парсера',
          description: 'Для режиму «Через парсер». ' + (BUILT_IN_SERVER ? 'За замовчуванням: ' + BUILT_IN_SERVER : 'Адреса Cloudflare Worker або server.js')
        }
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: {
          name: 'uakino_apikey',
          type: 'input',
          values: '',
          default: '',
          placeholder: ''
        },
        field: {
          name: 'API-ключ',
          description: 'Лише якщо на парсері задано UAKINO_APIKEY'
        }
      });
    }
    function start() {
      $('body').append($(CSS));
      Lampa.Component.add('uakino_online', OnlineComponent);
      addSettings();
      Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') addButtons(e);
      });
    }
    if (window.appready) start();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') start();
      });
    }
  })();
})();
})();
