/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/ (ES5). Не редагуйте вручну. */
(function () {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
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
        "./search": "lib/search.js",
        "./sources": "lib/sources.js"
      }, function (module, exports, require) {
        'use strict';
        var parse = require('./parse');
        var _require = require('./online'),
          createOnline = _require.createOnline;
        var _require2 = require('./jackett'),
          toJackett = _require2.toJackett;
        var _require3 = require('./search'),
          searchDle = _require3.searchDle;
        var _require4 = require('./sources'),
          SOURCES = _require4.SOURCES;
        function createClient(_ref) {
          var source = _ref.source,
            host = _ref.host,
            fetchText = _ref.fetchText,
            _ref$maxPages = _ref.maxPages,
            maxPages = _ref$maxPages === void 0 ? 5 : _ref$maxPages;
          source = source || SOURCES[0];
          host = String(host || source.host).replace(/\/+$/, '');
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
                    return searchDle(host, q, fetchText, source);
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
            source: source,
            searchSite: searchSite,
            torrents: torrents,
            online: createOnline({
              host: host,
              fetchText: fetchText,
              searchSite: searchSite,
              name: source.name,
              anyPlayer: true
            })
          };
        }
        module.exports = {
          createClient: createClient,
          SOURCES: SOURCES
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
        function cardTitle(tag, inner) {
          var clean = function clean(t) {
            return decodeEntities(t || '').replace(/\s+(онлайн|дивитис[ья]|смотреть)(\s.*)?$/i, '').replace(/\s+/g, ' ').trim();
          };
          var heading = inner.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
          if (heading && stripTags(heading[1])) return clean(stripTags(heading[1]));
          if (attr(tag, 'title')) return clean(attr(tag, 'title'));
          var img = inner.match(/<img\b[^>]*>/i);
          var alt = img ? attr(img[0], 'alt') || attr(img[0], 'title') : '';
          if (alt && !/постер|poster/i.test(alt)) return clean(alt);
          return clean(stripTags(inner));
        }
        function parseList(html, host, linkRe) {
          var found = new Map();
          var re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
          var m;
          while (m = re.exec(html)) {
            var href = attr(m[0], 'href');
            if (!href) continue;
            var url = localize(absoluteUrl(href, host), host);
            if (!url) continue;
            var id = void 0;
            if (linkRe) {
              var path = new URL(url).pathname;
              id = linkRe.test(path) ? path : null;
            } else {
              id = newsId(url);
            }
            if (!id) continue;
            var cls = attr(m[0], 'class') || '';
            var title = cardTitle(m[0], m[2]);
            var item = found.get(id) || {
              id: id,
              url: url,
              title: '',
              poster: ''
            };
            if (title && (!item.title || /movie-title|title/.test(cls))) item.title = title;
            if (!item.poster) {
              var img = m[2].match(/<img\b[^>]*>/i);
              if (img) {
                var src = attr(img[0], 'data-src') || attr(img[0], 'src');
                if (src) item.poster = absoluteUrl(src, host);
              }
            }
            if (!item.original) {
              var after = html.slice(re.lastIndex, re.lastIndex + 600).split(/<a\b/i)[0];
              var orig = after.match(/class=["'][^"']*(oname|original|orig-title|origintitle)[^"']*["'][^>]*>([\s\S]*?)<\//i);
              if (orig && stripTags(orig[2])) item.original = stripTags(orig[2]);
            }
            found.set(id, item);
          }
          return Array.from(found.values()).filter(function (i) {
            return i.title;
          });
        }
        function parseYear(html) {
          var ld = html.match(/"dateCreated"\s*:\s*"((?:19|20)\d{2})/);
          if (ld) return Number(ld[1]);
          var text = stripTags(html);
          var m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\s*:\s*((?:19|20)\d{2})/i);
          if (m) return Number(m[1]);
          var title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
          var t = title.match(/(?:^|\D)((?:19|20)\d{2})(?!\d)/);
          return t ? Number(t[1]) : null;
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
        function baseTitle(s) {
          var n = normalizeTitle(s);
          var cut = n.replace(/\s*((\d+\s*)+сезон|сезон\s*\d+|season\s*\d+|\d+\s*season).*$/, '').trim();
          var noYear = cut.replace(/\b(19|20)\d{2}\b/g, ' ').replace(/\s+/g, ' ').trim();
          return noYear || cut || n;
        }
        function altNames(item) {
          var names = String(item.title || '').split(/\s+\/\s+/);
          if (item.original) names.push(item.original);
          return names.filter(Boolean);
        }
        function scoreTitle(item, titles) {
          var qs = titles.map(baseTitle).filter(Boolean);
          var best = 0;
          var _iterator3 = _createForOfIteratorHelper(altNames(item)),
            _step3;
          try {
            var _loop = function _loop() {
              var name = _step3.value;
              var b = baseTitle(name);
              if (!b) return 1;
              var _iterator4 = _createForOfIteratorHelper(qs),
                _step4;
              try {
                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                  var q = _step4.value;
                  var s = 0;
                  if (b === q) s = 100;else if ((' ' + b + ' ').indexOf(' ' + q + ' ') >= 0) s = 50;else if ((' ' + q + ' ').indexOf(' ' + b + ' ') >= 0 && b.length > 3) s = 40;else {
                    var words = q.split(' ').filter(function (w) {
                      return w.length > 2;
                    });
                    var hit = words.filter(function (w) {
                      return (' ' + b + ' ').indexOf(' ' + w + ' ') >= 0;
                    }).length;
                    if (words.length) s = Math.round(hit / words.length * 30);
                  }
                  best = Math.max(best, s);
                }
              } catch (err) {
                _iterator4.e(err);
              } finally {
                _iterator4.f();
              }
            };
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              if (_loop()) continue;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return best;
        }
        function yearOf(item) {
          var m = String(item.title || '').match(/\((19|20)\d{2}\)/) || String(item.url || '').match(/[-_/]((19|20)\d{2})(?:[-_.][a-z]*)?\.html$/);
          return m ? Number(m[0].replace(/\D/g, '').slice(0, 4)) : null;
        }
        function pageMeta(html, url) {
          var type = null;
          var genre = stripTags((html.match(/(Жанр|Тип)\s*:?\s*(<[^>]*>\s*)*[^<]{0,40}/i) || [''])[0]);
          var title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
          if (/\/(serials?|seriesss?|series|tv)(\/|-)|sezon|season/i.test(url || '')) type = 'serial';else if (/\/(films?|filmy|filmss|movies?)(\/|-)|\/movie-/i.test(url || '')) type = 'film';else if (/:\s*(мульт)?серіал|:\s*аніме-серіал/i.test(genre)) type = 'serial';else if (/:\s*(мульт)?фільм/i.test(genre)) type = 'film';else if (/^\s*(мульт)?серіал/i.test(title)) type = 'serial';else if (/^\s*(мульт)?фільм/i.test(title)) type = 'film';else if (/сезон|серії|серія|season/i.test(title)) type = 'serial';else if (/"@type"\s*:\s*"TVSeries"/.test(html)) type = 'serial';else if (/"@type"\s*:\s*"Movie"/.test(html)) type = 'film';
          return {
            type: type,
            year: parseYear(html)
          };
        }
        module.exports = {
          pageMeta: pageMeta,
          scoreTitle: scoreTitle,
          baseTitle: baseTitle,
          altNames: altNames,
          yearOf: yearOf,
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
        var PLAYER_HOSTS = /(^|\.)(ashdi\.vip|tortuga\.[a-z]+|zetvideo\.net|[a-z0-9-]*hdvb[a-z0-9-]*\.[a-z]+|uakino\.[a-z]+)$/i;
        var PLAYER_URL = /(?:https?:)?\/\/(?:[a-z0-9-]+\.)*(?:ashdi\.vip|tortuga\.[a-z]+|zetvideo\.net|[a-z0-9-]*hdvb[a-z0-9-]*\.[a-z]+)\/[^"'\s<>\\]+/gi;
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
          if (/\d+\s*[-–]\s*\d+[\s_-]*(сезон|sezon)/i.test(String(s || ''))) return null;
          var m = String(s || '').match(/(?:сезон|season|sezon)[\s_-]*(\d+)|(\d+)[\s_-]*(?:сезон|sezon)|season\s*(\d+)/i);
          return m ? Number(m[1] || m[2] || m[3]) : null;
        }
        function episodeOf(s) {
          var m = String(s || '').match(/(\d+)\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\s*(\d+)|^\s*(\d+)\b/i);
          return m ? Number(m[1] || m[2] || m[3]) : null;
        }
        function parsePlayers(html, host, anyHost) {
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
          var seen = [];
          var skip = function skip(src) {
            return /youtube|trailer|\.(js|css|png|jpe?g|webp|gif|svg|ico)(\?|$)/i.test(src);
          };
          var add = function add(src) {
            if (!src || iframes.indexOf(src) >= 0 || skip(src)) return;
            iframes.push(src);
          };
          var re = /<iframe\b[^>]*>/gi;
          var m;
          while (m = re.exec(html)) {
            var src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);
            if (!src) continue;
            try {
              var h = new URL(src).hostname;
              if (seen.indexOf(h) < 0) seen.push(h);
              if (!anyHost && !PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;
            } catch (e) {
              continue;
            }
            add(src);
          }
          var loose = html.match(PLAYER_URL) || [];
          loose.forEach(function (u) {
            var src = absolute(u.replace(/&amp;/g, '&'), host);
            try {
              var _h = new URL(src).hostname;
              if (seen.indexOf(_h) < 0) seen.push(_h);
            } catch (e) {
              return;
            }
            add(src);
          });
          return {
            playlist: playlist,
            iframes: iframes,
            seen: seen
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
              var _label = labels[parts.slice(0, i).join('_')];
              if (_label && names.indexOf(_label) < 0) names.push(_label);
            }
            if (ep.voice && names.indexOf(ep.voice) < 0) names.push(ep.voice);
            var label = names.filter(function (n) {
              return !/^(озвучування|озвучка|озвучення)$/i.test(n.trim());
            }).map(function (n) {
              return n.trim().replace(/^плеєр\s+/i, '');
            }).join(' · ');
            return {
              group: label || 'UAKino',
              title: ep.title,
              file: ep.file
            };
          });
        }
        function parseEpisodeLinks(html, host, pageUrl) {
          var base = '';
          try {
            base = new URL(pageUrl).pathname.replace(/\/+$/, '');
          } catch (e) {}
          var episodes = [];
          var seasonPages = [];
          var re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
          var m;
          while (m = re.exec(html)) {
            var href = attr('<a' + m[1] + '>', 'href');
            if (!href) continue;
            var url = absolute(href, host);
            var path = void 0;
            try {
              path = new URL(url).pathname;
            } catch (e) {
              continue;
            }
            if (base && path.indexOf(base + '/') !== 0) continue;
            var ep = path.match(/season-(\d+)-episode-(\d+)\/?$/i);
            if (ep) {
              var inner = m[2];
              var title = parse.stripTags((inner.match(/class=["'][^"']*vi-title[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '');
              var label = parse.stripTags((inner.match(/class=["'][^"']*vi-rate[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '');
              episodes.push({
                season: Number(ep[1]),
                episode: Number(ep[2]),
                url: url,
                title: title,
                label: label
              });
              continue;
            }
            if (/\/(sezon|season)-\d+\/?$/i.test(path) && seasonPages.indexOf(url) < 0) seasonPages.push(url);
          }
          return {
            episodes: episodes,
            seasonPages: seasonPages
          };
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
            searchSite = _ref3.searchSite,
            _ref3$name = _ref3.name,
            name = _ref3$name === void 0 ? 'UAKino' : _ref3$name,
            _ref3$anyPlayer = _ref3.anyPlayer,
            anyPlayer = _ref3$anyPlayer === void 0 ? false : _ref3$anyPlayer;
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
            var ok = own || players && (anyPlayer || PLAYER_HOSTS.test(u.hostname));
            if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), {
              status: 403
            });
            return u.toString();
          }
          var htmlCache = new Map();
          function pageHtml(_x6) {
            return _pageHtml.apply(this, arguments);
          }
          function _pageHtml() {
            _pageHtml = _asyncToGenerator(_regenerator().m(function _callee5(url) {
              var html;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.n) {
                  case 0:
                    if (!htmlCache.has(url)) {
                      _context5.n = 1;
                      break;
                    }
                    return _context5.a(2, htmlCache.get(url));
                  case 1:
                    _context5.n = 2;
                    return fetchText(url, {});
                  case 2:
                    html = _context5.v;
                    if (htmlCache.size > 50) htmlCache.delete(htmlCache.keys().next().value);
                    htmlCache.set(url, html);
                    return _context5.a(2, html);
                }
              }, _callee5);
            }));
            return _pageHtml.apply(this, arguments);
          }
          function findPages(_x7) {
            return _findPages.apply(this, arguments);
          }
          function _findPages() {
            _findPages = _asyncToGenerator(_regenerator().m(function _callee7(_ref4) {
              var _ref4$title, title, _ref4$original, original, _ref4$query, query, _ref4$year, year, serial, titles, found, lastError, _iterator5, _step5, q, _iterator6, _step6, item, list, best, qs, y, seen, _t9, _t0, _t1;
              return _regenerator().w(function (_context7) {
                while (1) switch (_context7.p = _context7.n) {
                  case 0:
                    _ref4$title = _ref4.title, title = _ref4$title === void 0 ? '' : _ref4$title, _ref4$original = _ref4.original, original = _ref4$original === void 0 ? '' : _ref4$original, _ref4$query = _ref4.query, query = _ref4$query === void 0 ? '' : _ref4$query, _ref4$year = _ref4.year, year = _ref4$year === void 0 ? null : _ref4$year, serial = _ref4.serial;
                    titles = [title, original, query].filter(Boolean).filter(function (v, i, a) {
                      return a.indexOf(v) === i;
                    }).slice(0, 3);
                    found = new Map();
                    lastError = null;
                    _iterator5 = _createForOfIteratorHelper(titles);
                    _context7.p = 1;
                    _iterator5.s();
                  case 2:
                    if ((_step5 = _iterator5.n()).done) {
                      _context7.n = 7;
                      break;
                    }
                    q = _step5.value;
                    _context7.p = 3;
                    _t9 = _createForOfIteratorHelper;
                    _context7.n = 4;
                    return searchSite(q);
                  case 4:
                    _iterator6 = _t9(_context7.v);
                    try {
                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                        item = _step6.value;
                        if (!found.has(item.id)) {
                          found.set(item.id, Object.assign({}, item, {
                            score: parse.scoreTitle(item, titles),
                            season: seasonOf(item.title) || seasonOf(item.url),
                            year: parse.yearOf(item)
                          }));
                        }
                      }
                    } catch (err) {
                      _iterator6.e(err);
                    } finally {
                      _iterator6.f();
                    }
                    _context7.n = 6;
                    break;
                  case 5:
                    _context7.p = 5;
                    _t0 = _context7.v;
                    lastError = _t0;
                  case 6:
                    _context7.n = 2;
                    break;
                  case 7:
                    _context7.n = 9;
                    break;
                  case 8:
                    _context7.p = 8;
                    _t1 = _context7.v;
                    _iterator5.e(_t1);
                  case 9:
                    _context7.p = 9;
                    _iterator5.f();
                    return _context7.f(9);
                  case 10:
                    if (!(!found.size && lastError)) {
                      _context7.n = 11;
                      break;
                    }
                    throw lastError;
                  case 11:
                    list = Array.from(found.values()).filter(function (p) {
                      return p.score >= 50;
                    });
                    best = list.reduce(function (m, p) {
                      return Math.max(m, p.score);
                    }, 0);
                    list = list.filter(function (p) {
                      return p.score === best;
                    });
                    if (serial) {
                      qs = titles.map(parse.baseTitle);
                      list.forEach(function (p) {
                        if (p.season) return;
                        parse.altNames(p).some(function (n) {
                          var m = parse.baseTitle(n).match(/^(.*\S)\s+(\d{1,2})$/);
                          if (m && qs.indexOf(m[1]) >= 0) {
                            p.season = Number(m[2]);
                            return true;
                          }
                          return false;
                        });
                      });
                    }
                    y = Number(year) || 0;
                    if (!(y || list.length > 1)) {
                      _context7.n = 13;
                      break;
                    }
                    _context7.n = 12;
                    return Promise.all(list.slice(0, 8).map(function () {
                      var _ref5 = _asyncToGenerator(_regenerator().m(function _callee6(p) {
                        var meta, _t7, _t8;
                        return _regenerator().w(function (_context6) {
                          while (1) switch (_context6.p = _context6.n) {
                            case 0:
                              _context6.p = 0;
                              _t7 = parse;
                              _context6.n = 1;
                              return pageHtml(p.url);
                            case 1:
                              meta = _t7.pageMeta.call(_t7, _context6.v, p.url);
                              p.type = meta.type;
                              if (meta.year) p.year = meta.year;
                              _context6.n = 3;
                              break;
                            case 2:
                              _context6.p = 2;
                              _t8 = _context6.v;
                              p.type = parse.pageMeta('', p.url).type;
                            case 3:
                              return _context6.a(2);
                          }
                        }, _callee6, null, [[0, 2]]);
                      }));
                      return function (_x13) {
                        return _ref5.apply(this, arguments);
                      };
                    }()));
                  case 12:
                    list.slice(8).forEach(function (p) {
                      p.type = parse.pageMeta('', p.url).type;
                    });
                    list = list.filter(function (p) {
                      if (p.type && serial !== undefined && serial !== null && p.type !== (serial ? 'serial' : 'film')) return false;
                      if (y && p.year) {
                        var laterSeason = serial && p.season > 1;
                        if (laterSeason ? p.year < y - 1 : Math.abs(p.year - y) > 1) return false;
                      }
                      return true;
                    });
                  case 13:
                    seen = {};
                    list = list.filter(function (p) {
                      var key = parse.baseTitle(parse.altNames(p)[0]) + '|' + (p.season || 0) + '|' + (p.year || '');
                      if (seen[key]) return false;
                      seen[key] = true;
                      return true;
                    });
                    list.sort(function (a, b) {
                      return (a.season || 0) - (b.season || 0) || (a.year || 0) - (b.year || 0);
                    });
                    return _context7.a(2, list.map(function (_ref6) {
                      var id = _ref6.id,
                        url = _ref6.url,
                        t = _ref6.title,
                        o = _ref6.original,
                        poster = _ref6.poster,
                        season = _ref6.season,
                        score = _ref6.score,
                        py = _ref6.year;
                      return {
                        id: id,
                        url: url,
                        title: t,
                        original: o || '',
                        poster: poster,
                        season: season,
                        score: score,
                        year: py
                      };
                    }));
                }
              }, _callee7, null, [[3, 5], [1, 8, 9, 10]]);
            }));
            return _findPages.apply(this, arguments);
          }
          function stream(_x8, _x9) {
            return _stream.apply(this, arguments);
          }
          function _stream() {
            _stream = _asyncToGenerator(_regenerator().m(function _callee9(url, referer) {
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.n) {
                  case 0:
                    url = checkUrl(url, true);
                    return _context9.a(2, cache.wrap('stream:' + url, _asyncToGenerator(_regenerator().m(function _callee8() {
                      var html, p, s;
                      return _regenerator().w(function (_context8) {
                        while (1) switch (_context8.n) {
                          case 0:
                            _context8.n = 1;
                            return fetchText(url, {
                              referer: referer || host + '/'
                            });
                          case 1:
                            html = _context8.v;
                            p = parsePlayerjs(html);
                            if (!(!p && new URL(url).hostname === new URL(host).hostname)) {
                              _context8.n = 2;
                              break;
                            }
                            return _context8.a(2, streamFromPage(url, html));
                          case 2:
                            if (p) {
                              _context8.n = 3;
                              break;
                            }
                            throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), {
                              status: 404
                            });
                          case 3:
                            if (!p.folders) {
                              _context8.n = 4;
                              break;
                            }
                            return _context8.a(2, {
                              items: p.folders.map(function (f) {
                                return {
                                  group: f.path.filter(function (x) {
                                    return !seasonOf(x);
                                  }).map(function (x) {
                                    return x.trim();
                                  }).join(' / ') || name,
                                  season: seasonOf(f.path.join(' ')),
                                  title: f.title,
                                  episode: episodeOf(f.title),
                                  stream: toStream(f.file, f.subtitle)
                                };
                              }).filter(function (i) {
                                return i.stream;
                              })
                            });
                          case 4:
                            s = toStream(p.file, p.subtitle);
                            if (s) {
                              _context8.n = 5;
                              break;
                            }
                            throw Object.assign(new Error('порожнє посилання на відео'), {
                              status: 404
                            });
                          case 5:
                            return _context8.a(2, s);
                        }
                      }, _callee8);
                    }))));
                }
              }, _callee9);
            }));
            return _stream.apply(this, arguments);
          }
          function streamFromPage(_x0, _x1) {
            return _streamFromPage.apply(this, arguments);
          }
          function _streamFromPage() {
            _streamFromPage = _asyncToGenerator(_regenerator().m(function _callee0(url, html) {
              var players, errors, _iterator7, _step7, src, s, _t10, _t11;
              return _regenerator().w(function (_context0) {
                while (1) switch (_context0.p = _context0.n) {
                  case 0:
                    players = parsePlayers(html, host, anyPlayer);
                    errors = [];
                    _iterator7 = _createForOfIteratorHelper(players.iframes.slice(0, 6));
                    _context0.p = 1;
                    _iterator7.s();
                  case 2:
                    if ((_step7 = _iterator7.n()).done) {
                      _context0.n = 7;
                      break;
                    }
                    src = _step7.value;
                    if (!(new URL(src).hostname === new URL(host).hostname)) {
                      _context0.n = 3;
                      break;
                    }
                    return _context0.a(3, 6);
                  case 3:
                    _context0.p = 3;
                    _context0.n = 4;
                    return stream(src, url);
                  case 4:
                    s = _context0.v;
                    return _context0.a(2, s.items && s.items.length ? s.items[0].stream : s);
                  case 5:
                    _context0.p = 5;
                    _t10 = _context0.v;
                    errors.push(new URL(src).hostname + ': ' + _t10.message);
                  case 6:
                    _context0.n = 2;
                    break;
                  case 7:
                    _context0.n = 9;
                    break;
                  case 8:
                    _context0.p = 8;
                    _t11 = _context0.v;
                    _iterator7.e(_t11);
                  case 9:
                    _context0.p = 9;
                    _iterator7.f();
                    return _context0.f(9);
                  case 10:
                    if (!/пройдіть\s+авторизацію|змініть\s+країну/i.test(parse.stripTags(html))) {
                      _context0.n = 11;
                      break;
                    }
                    throw Object.assign(new Error(name + ': для цієї серії сайт показує лише трейлер — потрібен вхід або серія ще не вийшла'), {
                      status: 403
                    });
                  case 11:
                    throw Object.assign(new Error(name + ': плеєр на сторінці серії не знайдено (' + (errors.join('; ') || 'iframe/хости: ' + (players.seen.join(', ') || 'немає')) + ')'), {
                      status: 404
                    });
                  case 12:
                    return _context0.a(2);
                }
              }, _callee0, null, [[3, 5], [1, 8, 9, 10]]);
            }));
            return _streamFromPage.apply(this, arguments);
          }
          function loadPage(_x10) {
            return _loadPage.apply(this, arguments);
          }
          function _loadPage() {
            _loadPage = _asyncToGenerator(_regenerator().m(function _callee10(url) {
              return _regenerator().w(function (_context11) {
                while (1) switch (_context11.n) {
                  case 0:
                    url = checkUrl(url, false);
                    return _context11.a(2, cache.wrap('page:' + url, _asyncToGenerator(_regenerator().m(function _callee1() {
                      var html, page, season, players, items, playlistError, userHash, ajax, text, body, data, found, episodes, _iterator8, _step8, sp, seenEp, errors, inline, st, n, _iterator9, _step9, _loop2, onlyTrailer, diag, _t13, _t14, _t15, _t16, _t17, _t18;
                      return _regenerator().w(function (_context10) {
                        while (1) switch (_context10.p = _context10.n) {
                          case 0:
                            _context10.n = 1;
                            return pageHtml(url);
                          case 1:
                            html = _context10.v;
                            page = parse.parsePage(html, url, host);
                            season = seasonOf(page.title);
                            players = parsePlayers(html, host, anyPlayer);
                            items = [];
                            playlistError = '';
                            if (!players.playlist) {
                              _context10.n = 5;
                              break;
                            }
                            _context10.p = 2;
                            userHash = (html.match(/dle_login_hash\s*=\s*['"]([^'"]+)['"]/) || [])[1];
                            ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) + '&xfield=' + encodeURIComponent(players.playlist.xfield) + (userHash ? '&user_hash=' + userHash : '') + '&time=' + Date.now();
                            _context10.n = 3;
                            return fetchText(ajax, {
                              xhr: true,
                              referer: url
                            });
                          case 3:
                            text = _context10.v;
                            body = text;
                            try {
                              data = JSON.parse(text);
                              body = data && data.success !== false ? String(data.response || '') : '';
                              if (data && data.success === false) playlistError = 'плейлист: ' + (data.message || 'відмова сайту');
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
                            _context10.n = 5;
                            break;
                          case 4:
                            _context10.p = 4;
                            _t13 = _context10.v;
                            if (players.iframes.length) {
                              _context10.n = 5;
                              break;
                            }
                            throw _t13;
                          case 5:
                            if (items.length) {
                              _context10.n = 16;
                              break;
                            }
                            found = parseEpisodeLinks(html, host, url);
                            episodes = found.episodes;
                            _iterator8 = _createForOfIteratorHelper(found.seasonPages.slice(0, 20));
                            _context10.p = 6;
                            _iterator8.s();
                          case 7:
                            if ((_step8 = _iterator8.n()).done) {
                              _context10.n = 12;
                              break;
                            }
                            sp = _step8.value;
                            if (!(sp === url)) {
                              _context10.n = 8;
                              break;
                            }
                            return _context10.a(3, 11);
                          case 8:
                            _context10.p = 8;
                            _t14 = episodes;
                            _t15 = parseEpisodeLinks;
                            _context10.n = 9;
                            return pageHtml(sp);
                          case 9:
                            episodes = _t14.concat.call(_t14, _t15(_context10.v, host, url).episodes);
                            _context10.n = 11;
                            break;
                          case 10:
                            _context10.p = 10;
                            _t16 = _context10.v;
                          case 11:
                            _context10.n = 7;
                            break;
                          case 12:
                            _context10.n = 14;
                            break;
                          case 13:
                            _context10.p = 13;
                            _t17 = _context10.v;
                            _iterator8.e(_t17);
                          case 14:
                            _context10.p = 14;
                            _iterator8.f();
                            return _context10.f(14);
                          case 15:
                            seenEp = {};
                            episodes = episodes.filter(function (e) {
                              return seenEp[e.url] ? false : seenEp[e.url] = true;
                            });
                            episodes.sort(function (a, b) {
                              return a.season - b.season || a.episode - b.episode;
                            });
                            items = episodes.map(function (e) {
                              return {
                                group: name,
                                season: e.season,
                                episode: e.episode,
                                title: 'Серія ' + e.episode + (e.label ? ' · ' + e.label : ''),
                                url: e.url
                              };
                            });
                          case 16:
                            errors = [];
                            if (!items.length) {
                              inline = parsePlayerjs(html);
                              if (inline && inline.folders) {
                                items = inline.folders.map(function (f) {
                                  return {
                                    group: f.path.filter(function (x) {
                                      return !seasonOf(x);
                                    }).map(function (x) {
                                      return x.trim();
                                    }).join(' / ') || name,
                                    season: seasonOf(f.path.join(' ')) || season,
                                    title: f.title,
                                    episode: episodeOf(f.title),
                                    stream: toStream(f.file, f.subtitle)
                                  };
                                }).filter(function (i) {
                                  return i.stream;
                                });
                              } else if (inline) {
                                st = toStream(inline.file, inline.subtitle);
                                if (st) items.push({
                                  group: name,
                                  season: season,
                                  title: page.title,
                                  episode: null,
                                  stream: st
                                });
                              }
                            }
                            if (items.length) {
                              _context10.n = 23;
                              break;
                            }
                            n = 0;
                            _iterator9 = _createForOfIteratorHelper(players.iframes.slice(0, 6));
                            _context10.p = 17;
                            _loop2 = _regenerator().m(function _loop2() {
                              var src, s, group, _t12;
                              return _regenerator().w(function (_context1) {
                                while (1) switch (_context1.p = _context1.n) {
                                  case 0:
                                    src = _step9.value;
                                    n++;
                                    _context1.p = 1;
                                    _context1.n = 2;
                                    return stream(src, url);
                                  case 2:
                                    s = _context1.v;
                                    group = players.iframes.length > 1 ? name + ' · плеєр ' + n : name;
                                    if (s.items) items = items.concat(s.items.map(function (i) {
                                      return Object.assign({}, i, {
                                        group: i.group === name ? group : i.group,
                                        season: i.season || season
                                      });
                                    }));else items.push({
                                      group: group,
                                      season: season,
                                      title: page.title,
                                      episode: null,
                                      stream: s
                                    });
                                    _context1.n = 4;
                                    break;
                                  case 3:
                                    _context1.p = 3;
                                    _t12 = _context1.v;
                                    errors.push(new URL(src).hostname + ': ' + _t12.message);
                                  case 4:
                                    return _context1.a(2);
                                }
                              }, _loop2, null, [[1, 3]]);
                            });
                            _iterator9.s();
                          case 18:
                            if ((_step9 = _iterator9.n()).done) {
                              _context10.n = 20;
                              break;
                            }
                            return _context10.d(_regeneratorValues(_loop2()), 19);
                          case 19:
                            _context10.n = 18;
                            break;
                          case 20:
                            _context10.n = 22;
                            break;
                          case 21:
                            _context10.p = 21;
                            _t18 = _context10.v;
                            _iterator9.e(_t18);
                          case 22:
                            _context10.p = 22;
                            _iterator9.f();
                            return _context10.f(22);
                          case 23:
                            if (items.length) {
                              _context10.n = 26;
                              break;
                            }
                            onlyTrailer = players.seen.length > 0 && players.seen.every(function (h) {
                              return /youtube|youtu\.be/i.test(h);
                            });
                            if (!/пройдіть\s+авторизацію|змініть\s+країну|увійдіть,?\s+щоб\s+дивитис|доступн\w*\s+лише\s+(для\s+)?зареєстрован/i.test(parse.stripTags(html))) {
                              _context10.n = 24;
                              break;
                            }
                            throw Object.assign(new Error(name + ': сайт показує лише трейлер — серії доступні тільки після входу в акаунт на сайті'), {
                              status: 403
                            });
                          case 24:
                            if (!(onlyTrailer || /soon-tv|скоро\s+(на\s+сайті|вийде)|очікуєм/i.test(html))) {
                              _context10.n = 25;
                              break;
                            }
                            throw Object.assign(new Error(name + ': на сторінці поки лише трейлер — серії з озвучкою ще не вийшли'), {
                              status: 404
                            });
                          case 25:
                            diag = [];
                            if (playlistError) diag.push(playlistError);
                            if (errors.length) diag.push(errors.slice(0, 3).join('; '));else if (players.iframes.length) diag.push('плеєри: ' + players.iframes.length);
                            diag.push('iframe/хости: ' + (players.seen.length ? players.seen.slice(0, 6).join(', ') : 'немає'));
                            if (/Playerjs/i.test(html)) diag.push('є Playerjs');
                            throw Object.assign(new Error(name + ': відео на сторінці не знайдено (' + diag.join('; ') + ')'), {
                              status: 404
                            });
                          case 26:
                            return _context10.a(2, {
                              url: url,
                              title: page.title,
                              original: page.original,
                              year: page.year,
                              poster: page.poster,
                              season: season,
                              items: items
                            });
                        }
                      }, _callee1, null, [[17, 21, 22, 23], [8, 10], [6, 13, 14, 15], [2, 4]]);
                    }))));
                }
              }, _callee10);
            }));
            return _loadPage.apply(this, arguments);
          }
          function route(_x11, _x12) {
            return _route.apply(this, arguments);
          }
          function _route() {
            _route = _asyncToGenerator(_regenerator().m(function _callee11(pathname, params) {
              var serial, _t19;
              return _regenerator().w(function (_context12) {
                while (1) switch (_context12.n) {
                  case 0:
                    if (!(pathname === '/online/search')) {
                      _context12.n = 2;
                      break;
                    }
                    serial = params.get('serial');
                    _context12.n = 1;
                    return findPages({
                      title: params.get('title') || '',
                      original: params.get('original') || params.get('title_original') || '',
                      query: params.get('query') || params.get('Query') || '',
                      year: params.get('year') || null,
                      serial: serial === null || serial === '' ? undefined : serial === '1' || serial === 'true'
                    });
                  case 1:
                    _t19 = _context12.v;
                    return _context12.a(2, {
                      pages: _t19
                    });
                  case 2:
                    if (!(pathname === '/online/page')) {
                      _context12.n = 3;
                      break;
                    }
                    return _context12.a(2, loadPage(params.get('url') || ''));
                  case 3:
                    if (!(pathname === '/online/stream')) {
                      _context12.n = 4;
                      break;
                    }
                    return _context12.a(2, stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : ''));
                  case 4:
                    return _context12.a(2, null);
                }
              }, _callee11);
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
          parseEpisodeLinks: parseEpisodeLinks,
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
        function searchDle(_x14, _x15, _x16, _x17) {
          return _searchDle.apply(this, arguments);
        }
        function _searchDle() {
          _searchDle = _asyncToGenerator(_regenerator().m(function _callee12(host, query, fetchText, source) {
            var q, queries, short, errors, ok, _i, _queries, story, attempts, _i2, _attempts, _attempts$_i, method, url, body, list, err, _t20, _t21;
            return _regenerator().w(function (_context13) {
              while (1) switch (_context13.p = _context13.n) {
                case 0:
                  source = source || {};
                  q = String(query || '').trim();
                  if (!(q.length < 2)) {
                    _context13.n = 1;
                    break;
                  }
                  return _context13.a(2, []);
                case 1:
                  queries = [q];
                  short = simplify(q);
                  if (short.length >= 3 && short.toLowerCase() !== q.toLowerCase()) queries.push(short);
                  errors = [];
                  ok = false;
                  _i = 0, _queries = queries;
                case 2:
                  if (!(_i < _queries.length)) {
                    _context13.n = 10;
                    break;
                  }
                  story = _queries[_i];
                  attempts = source.searchPath ? [['GET', host + source.searchPath + encodeURIComponent(story), null]] : [['POST', host + '/index.php?do=search', 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(story)], ['GET', host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(story), null]];
                  _i2 = 0, _attempts = attempts;
                case 3:
                  if (!(_i2 < _attempts.length)) {
                    _context13.n = 9;
                    break;
                  }
                  _attempts$_i = _slicedToArray(_attempts[_i2], 3), method = _attempts$_i[0], url = _attempts$_i[1], body = _attempts$_i[2];
                  _context13.p = 4;
                  _t20 = parse;
                  _context13.n = 5;
                  return fetchText(url, method === 'POST' ? {
                    method: method,
                    body: body
                  } : {});
                case 5:
                  list = _t20.parseList.call(_t20, _context13.v, host, source.linkRe);
                  ok = true;
                  if (!list.length) {
                    _context13.n = 6;
                    break;
                  }
                  return _context13.a(2, list);
                case 6:
                  _context13.n = 8;
                  break;
                case 7:
                  _context13.p = 7;
                  _t21 = _context13.v;
                  errors.push(method + ': ' + _t21.message);
                case 8:
                  _i2++;
                  _context13.n = 3;
                  break;
                case 9:
                  _i++;
                  _context13.n = 2;
                  break;
                case 10:
                  if (ok) {
                    _context13.n = 11;
                    break;
                  }
                  err = new Error('пошук не вдався (' + errors.join('; ') + ')');
                  err.status = 502;
                  throw err;
                case 11:
                  return _context13.a(2, []);
              }
            }, _callee12, null, [[4, 7]]);
          }));
          return _searchDle.apply(this, arguments);
        }
        module.exports = {
          searchDle: searchDle,
          simplify: simplify
        };
      }],
      "lib/sources.js": [{}, function (module, exports, require) {
        'use strict';
        var SOURCES = [{
          id: 'uakino',
          name: 'UAKino',
          host: 'https://uakino.best',
          torrents: true
        }, {
          id: 'uaserials',
          name: 'UASerials',
          host: 'https://uaserials.my'
        }, {
          id: 'uaflix',
          name: 'UAFlix',
          host: 'https://uafix.net',
          linkRe: /^\/(?!page\/|tags\/|xfsearch\/|user\/|index)[a-z-]+\/[a-z0-9-]+\/$/
        }, {
          id: 'eneyida',
          name: 'Eneyida',
          host: 'https://eneyida.tv'
        }, {
          id: 'uaserial',
          name: 'UASerial',
          host: 'https://uaserial.tv',
          searchPath: '/search?query=',
          linkRe: /^\/(movie|serial|series|cartoon|anime|show)-[^/]+$/
        }, {
          id: 'anitube',
          name: 'AniTube',
          host: 'https://anitube.in.ua',
          anime: true
        }, {
          id: 'animeua',
          name: 'AnimeUA',
          host: 'https://animeua.club',
          anime: true
        }];
        function getSource(id) {
          return SOURCES.filter(function (s) {
            return s.id === id;
          })[0] || null;
        }
        module.exports = {
          SOURCES: SOURCES,
          getSource: getSource
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
    var ICON_EYE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>';
    var ICON_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14.5v-9l7 4.5-7 4.5Z"/></svg>';
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
    function viewedList() {
      var v = Lampa.Storage.get('uakino_viewed', '[]');
      if (typeof v === 'string') {
        try {
          v = JSON.parse(v);
        } catch (e) {
          v = [];
        }
      }
      return Object.prototype.toString.call(v) === '[object Array]' ? v : [];
    }
    function isViewed(key) {
      return viewedList().indexOf(key) >= 0;
    }
    function markViewed(key) {
      var v = viewedList();
      if (v.indexOf(key) >= 0) return;
      v.push(key);
      if (v.length > 3000) v = v.slice(-3000);
      Lampa.Storage.set('uakino_viewed', v);
    }
    function stopLoading() {
      if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
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
            Referer: o.referer || url.replace(/^(https?:\/\/[^/]+).*$/, '$1/')
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
    var SOURCES = UAKinoLib.SOURCES.filter(function (s) {
      return s.id !== 'uakino';
    });
    var clients = {};
    function sourceById(id) {
      return SOURCES.filter(function (s) {
        return s.id === id;
      })[0] || SOURCES[0];
    }
    function hostFor(source) {
      var key = 'uakino_host_' + source.id;
      return String(Lampa.Storage.get(key, '') || source.host).trim().replace(/\/+$/, '');
    }
    function clientFor(id) {
      var source = sourceById(id);
      var host = hostFor(source);
      if (!clients[id] || clients[id].host !== host) clients[id] = UAKinoLib.createClient({
        source: source,
        host: host,
        fetchText: deviceFetch
      });
      return clients[id];
    }
    function enabledSources() {
      return SOURCES.filter(function (s) {
        var v = Lampa.Storage.get('uakino_src_' + s.id, true);
        return v !== false && v !== 'false';
      });
    }
    function promised(promise, ok, fail) {
      promise.then(ok, function (e) {
        fail(e && e.message || String(e));
      });
    }
    var ACCOUNTS = [{
      id: 'toloka',
      name: 'Толока',
      descr: 'Роздачі Толоки в «Торенти (UA)»'
    }];
    function cookieFor(id) {
      return String(Lampa.Storage.get('uakino_cookie_' + id, '') || '');
    }
    function hasCredentials(id) {
      return !!(Lampa.Storage.get('uakino_login_' + id, '') && Lampa.Storage.get('uakino_pass_' + id, ''));
    }
    function doLogin(id, done) {
      var login = Lampa.Storage.get('uakino_login_' + id, '');
      var password = Lampa.Storage.get('uakino_pass_' + id, '');
      if (!login || !password) return done(false, 'вкажіть логін і пароль');
      if (!BUILT_IN_SERVER) return done(false, 'встановіть плагін з адреси Worker (…workers.dev/uakino.js)');
      var net = new Lampa.Reguest();
      net.timeout(30000);
      net.silent(BUILT_IN_SERVER + '/login', function (json) {
        if (json && json.ok) {
          Lampa.Storage.set('uakino_cookie_' + id, json.cookie);
          done(true);
        } else {
          Lampa.Storage.set('uakino_cookie_' + id, '');
          done(false, json && json.error || 'помилка входу');
        }
      }, function (a, c) {
        done(false, net.errorDecode ? net.errorDecode(a, c) : "немає з'єднання з Worker");
      }, {
        site: id,
        login: login,
        password: password
      });
    }
    function accountStatus(account) {
      var login = Lampa.Storage.get('uakino_login_' + account.id, '');
      return cookieFor(account.id) ? 'Вхід виконано' + (login ? ' (' + login + ')' : '') : 'Вхід не виконано';
    }
    function refreshAccountUI(account) {
      var logged = !!cookieFor(account.id);
      var enter = $('.settings-param[data-name="uakino_enter_' + account.id + '"]');
      enter.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');
      enter.find('.settings-param__descr').text(accountStatus(account));
      $('.settings-param[data-name="uakino_pass_' + account.id + '"]').toggleClass('hide', logged);
    }
    function loginWithNotice(account) {
      Lampa.Noty.show(account.name + ': вхід…');
      doLogin(account.id, function (ok, err) {
        Lampa.Noty.show(account.name + ': ' + (ok ? 'вхід виконано' : err));
        refreshAccountUI(account);
      });
    }
    function logout(account) {
      Lampa.Storage.set('uakino_cookie_' + account.id, '');
      Lampa.Storage.set('uakino_pass_' + account.id, '');
      $('.settings-param[data-name="uakino_pass_' + account.id + '"] .settings-param__value').text('');
      Lampa.Noty.show(account.name + ': вихід виконано');
      refreshAccountUI(account);
    }
    function ensureLogins(done) {
      var todo = ACCOUNTS.filter(function (a) {
        return hasCredentials(a.id) && !cookieFor(a.id);
      });
      var left = todo.length;
      if (!left) return done();
      todo.forEach(function (a) {
        doLogin(a.id, function () {
          if (! --left) done();
        });
      });
    }
    var Api = {
      search: function search(m, ok, fail) {
        var self = this;
        if (!m.loginChecked) {
          m.loginChecked = true;
          return ensureLogins(function () {
            self.search(m, ok, fail);
          });
        }
        var list = enabledSources();
        if (!list.length) return fail('усі сайти вимкнено в налаштуваннях');
        Promise.all(list.map(function (source) {
          return clientFor(source.id).online.findPages({
            title: m.title,
            original: m.original,
            year: m.year,
            serial: m.serial
          }).then(function (pages) {
            return {
              source: source,
              pages: pages
            };
          }, function (e) {
            return {
              source: source,
              pages: [],
              error: e && e.message || String(e)
            };
          });
        })).then(function (results) {
          var pages = [];
          var problems = [];
          results.forEach(function (r) {
            r.pages.forEach(function (p) {
              p.source = r.source.id;
              pages.push(p);
            });
            problems.push(r.source.name + ': ' + (r.error || (r.pages.length ? r.pages.length + ' знайдено' : 'нічого не знайдено')));
          });
          var exact = pages.some(function (p) {
            return p.score >= 100;
          });
          if (exact) pages = pages.filter(function (p) {
            return p.score >= 100;
          });
          if (pages.length) ok(pages);else fail('нічого не знайдено. ' + problems.join(' | '));
        });
      },
      page: function page(p, ok, fail) {
        promised(clientFor(p.source).online.loadPage(p.url), ok, fail);
      },
      stream: function stream(sourceId, url, referer, ok, fail) {
        promised(clientFor(sourceId).online.stream(url, referer), ok, fail);
      }
    };
    function streamQuality(stream, done) {
      var best = 0;
      if (stream && stream.quality) {
        Object.keys(stream.quality).forEach(function (k) {
          best = Math.max(best, parseInt(k, 10) || 0);
        });
      }
      if (best || !stream || !stream.url || !/\.m3u8(\?|$)/i.test(stream.url)) return done(best);
      deviceFetch(stream.url, {}).then(function (text) {
        var re = /RESOLUTION=\d+x(\d+)/gi;
        var m;
        while (m = re.exec(text)) best = Math.max(best, parseInt(m[1], 10) || 0);
        done(best);
      }, function () {
        done(0);
      });
    }
    function OnlineComponent(object) {
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true,
        step: 250
      });
      var html = $('<div class="uakino-online"></div>');
      var body = $('<div class="uakino-online__body"></div>');
      var movie = object.movie || {};
      var info = movieInfo(movie);
      var self = this;
      var destroyed = false;
      var last = null;
      var storeKey = 'uakino_choice_' + (movie.id || info.original || info.title);
      var sources = [];
      var cur = {
        source: 0,
        tab: 0,
        voice: 0
      };
      var data = null;
      var pageError = '';
      var keepFocus = '';
      var voiceRestored = false;
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
      function saveChoice(extra) {
        var c = choice();
        var src = sources[cur.source];
        c.source = src ? src.id : c.source;
        c.tab = cur.tab;
        c.voice = currentVoices()[cur.voice] || c.voice || '';
        if (extra) Object.keys(extra).forEach(function (k) {
          c[k] = extra[k];
        });
        Lampa.Storage.set(storeKey, c);
      }
      function message(text) {
        body.empty();
        var row = $('<div class="uakino-online__filters"></div>');
        row.append(button(TORRENTS_LABEL, '', function () {
          openTorrents(movie);
        }));
        body.append(row);
        body.append($('<div class="uakino-online__empty"></div>').text(text));
        self.activity.loader(false);
        self.activity.toggle();
      }
      this.create = function () {
        scroll.minus();
        scroll.append(body);
        html.append(scroll.render());
        scroll.onWheel = function (step) {
          Navigator.move(step > 0 ? 'down' : 'up');
        };
        this.activity.loader(true);
        Api.search(info, alive(function (pages) {
          var byId = {};
          (pages || []).forEach(function (p) {
            if (!byId[p.source]) {
              byId[p.source] = {
                id: p.source,
                name: sourceById(p.source).name,
                pages: [],
                loaded: {},
                quality: null
              };
              sources.push(byId[p.source]);
            }
            byId[p.source].pages.push(p);
          });
          if (!sources.length) return message('Нічого не знайдено');
          pickDefault();
        }), alive(function (err) {
          message('UAKino: ' + err);
        }));
        return this.render();
      };
      function pickDefault() {
        var saved = choice();
        var savedIndex = -1;
        sources.forEach(function (s, i) {
          if (s.id === saved.source && saved.manual) savedIndex = i;
        });
        if (savedIndex >= 0 || sources.length === 1) {
          cur.source = Math.max(0, savedIndex);
          cur.tab = savedIndex >= 0 && saved.tab < tabsOf(sources[cur.source]).length ? saved.tab : 0;
          return loadCurrent();
        }
        var left = sources.length;
        var finished = false;
        var finish = function finish() {
          if (finished || destroyed) return;
          finished = true;
          var best = 0;
          sources.forEach(function (s, i) {
            if ((s.quality || 0) > (sources[best].quality || 0)) best = i;
          });
          cur.source = best;
          cur.tab = 0;
          loadCurrent();
        };
        setTimeout(finish, 15000);
        sources.forEach(function (s) {
          probeSource(s, function () {
            left--;
            if (!left) finish();
          });
        });
      }
      function probeSource(source, done) {
        var page = source.pages[0];
        Api.page(page, function (json) {
          source.loaded[page.url] = json;
          var first = (json.items || [])[0];
          if (!first) return done();
          resolve(source.id, json, first, function (stream) {
            streamQuality(stream, function (q) {
              source.quality = q;
              done();
            });
          }, function () {
            done();
          });
        }, function () {
          source.quality = -1;
          done();
        });
      }
      function tabsOf(source) {
        var tabs = [];
        var seen = {};
        function add(season, page, label) {
          var key = season ? 's' + season : 'p' + page;
          if (seen[key]) return;
          seen[key] = true;
          tabs.push({
            page: page,
            season: season || null,
            label: label
          });
        }
        source.pages.forEach(function (p, pi) {
          var d = source.loaded[p.url];
          if (d) {
            var seasons = [];
            (d.items || []).forEach(function (it) {
              var s = it.season || d.season || p.season || 0;
              if (seasons.indexOf(s) < 0) seasons.push(s);
            });
            if (seasons.length && seasons.some(function (s) {
              return s;
            })) {
              seasons.forEach(function (s) {
                add(s, pi, s ? 'Сезон ' + s : 'Інше');
              });
            } else {
              add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');
            }
          } else if (p.season) {
            add(p.season, pi, 'Сезон ' + p.season);
          } else {
            add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');
          }
        });
        tabs.sort(function (a, b) {
          return (a.season || 0) - (b.season || 0) || a.page - b.page;
        });
        return tabs;
      }
      function preloadPages(source, done) {
        if (source.pages.length < 2) return done();
        var todo = source.pages.filter(function (p) {
          return !p.season && !source.loaded[p.url];
        });
        var left = todo.length;
        if (!left) return done();
        todo.forEach(function (p) {
          Api.page(p, alive(function (json) {
            source.loaded[p.url] = json || {
              items: []
            };
            if (! --left) done();
          }), alive(function () {
            source.loaded[p.url] = {
              items: []
            };
            if (! --left) done();
          }));
        });
      }
      function loadCurrent() {
        var source = sources[cur.source];
        if (!source.preloaded) {
          self.activity.loader(true);
          return preloadPages(source, function () {
            source.preloaded = true;
            loadCurrent();
          });
        }
        var tab = tabsOf(source)[cur.tab] || tabsOf(source)[0];
        var page = source.pages[tab.page];
        pageError = '';
        if (source.loaded[page.url]) {
          data = source.loaded[page.url];
          return build();
        }
        self.activity.loader(true);
        Api.page(page, alive(function (json) {
          source.loaded[page.url] = json || {
            items: []
          };
          data = source.loaded[page.url];
          var tabs = tabsOf(source);
          for (var i = 0; i < tabs.length; i++) {
            if (tab.season && tabs[i].season === tab.season || !tab.season && tabs[i].page === tab.page) {
              cur.tab = i;
              break;
            }
          }
          build();
        }), alive(function (err) {
          data = null;
          pageError = err;
          build();
        }));
      }
      function currentTab() {
        var tabs = tabsOf(sources[cur.source]);
        return tabs[cur.tab] || tabs[0];
      }
      function seasonOfItem(it, tab) {
        var p = sources[cur.source].pages[tab.page] || {};
        return it.season || data && data.season || p.season || 0;
      }
      function tabItems() {
        var tab = currentTab();
        return (data && data.items || []).filter(function (it) {
          return tab.season === null || seasonOfItem(it, tab) === tab.season;
        });
      }
      function currentVoices() {
        var voices = [];
        tabItems().forEach(function (it) {
          if (voices.indexOf(it.group) < 0) voices.push(it.group);
        });
        return voices;
      }
      function currentItems() {
        var voice = currentVoices()[cur.voice];
        return tabItems().filter(function (it) {
          return it.group === voice;
        });
      }
      function sourceLabel(s) {
        var q = s.quality > 0 ? ' · ' + s.quality + 'p' : '';
        return s.name + q;
      }
      function focusable(el) {
        el.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        return el;
      }
      function button(label, value, onEnter, active) {
        var btn = $('<div class="uakino-online__filter selector"></div>');
        btn.text(label + (value ? ' ' + value : ''));
        if (active) btn.addClass('uakino-online__filter--active');
        btn.on('hover:enter', onEnter);
        return focusable(btn);
      }
      function select(title, list, current, _onSelect, subtitles) {
        Lampa.Select.show({
          title: title,
          items: list.map(function (name, i) {
            return {
              title: name,
              subtitle: subtitles ? subtitles[i] : '',
              selected: i === current,
              index: i
            };
          }),
          onSelect: function onSelect(a) {
            Lampa.Controller.toggle('content');
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
      function viewKey(item) {
        return String(hashFor(item) || [info.original || info.title, item.season || 0, item.episode || 0].join(':'));
      }
      function showViewed(el) {
        if (el.find('.uakino-online__viewed').length) return;
        el.addClass('uakino-online__item--viewed');
        el.append($('<div class="uakino-online__viewed">' + ICON_EYE + '</div>'));
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
        body.empty();
        last = null;
        var voices = currentVoices();
        if (!voiceRestored && voices.length) {
          voiceRestored = true;
          var savedVoice = voices.indexOf(choice().voice);
          if (savedVoice >= 0) cur.voice = savedVoice;
        }
        if (cur.voice >= voices.length) cur.voice = 0;
        var src = sources[cur.source];
        var shown = src.pages[currentTab().page] || src.pages[0];
        var head = $('<div class="uakino-online__head"><div class="uakino-online__head-text"><div class="uakino-online__head-title"></div><div class="uakino-online__head-sub"></div></div></div>');
        var poster = data && data.poster || shown.poster || src.pages[0].poster;
        if (poster) head.prepend($('<img class="uakino-online__poster">').attr('src', poster));
        var names = String(shown.title || data && data.title || '').split(/\s+\/\s+/);
        [shown.original, data && data.original].forEach(function (o) {
          if (o && names.indexOf(o) < 0) names.push(o);
        });
        head.find('.uakino-online__head-title').text(names[0] || '');
        var sub = names.slice(1, 3);
        var year = data && data.year || shown.year;
        if (year) sub.push(year);
        sub.push(src.name);
        head.find('.uakino-online__head-sub').text(sub.join(' · '));
        body.append(head);
        var filters = $('<div class="uakino-online__filters"></div>');
        var sourceBtn, voiceBtn, tabBtn;
        filters.append(sourceBtn = button('Джерело:', sourceLabel(sources[cur.source]), function () {
          select('Джерело', sources.map(sourceLabel).concat([TORRENTS_LABEL]), cur.source, function (i) {
            if (i === sources.length) return openTorrents(movie);
            cur.source = i;
            cur.tab = 0;
            cur.voice = 0;
            keepFocus = 'source';
            saveChoice({
              manual: true
            });
            loadCurrent();
          }, sources.map(function (s) {
            return s.pages[0].title;
          }).concat(['Ваш парсер і TorrServer, лише з українською доріжкою']));
        }));
        if (voices.length > 1) {
          filters.append(voiceBtn = button('Озвучка:', voices[cur.voice], function () {
            select('Озвучка', voices, cur.voice, function (i) {
              cur.voice = i;
              keepFocus = 'voice';
              saveChoice();
              build();
            });
          }));
        }
        body.append(filters);
        var tabs = tabsOf(sources[cur.source]);
        if (tabs.length > 1) {
          var row = $('<div class="uakino-online__tabs"></div>');
          tabs.forEach(function (tab, i) {
            var tb = button(tab.label, '', function () {
              if (i === cur.tab) return;
              cur.tab = i;
              cur.voice = Math.max(0, currentVoicesFor(i).indexOf(voices[cur.voice]));
              keepFocus = 'tab';
              saveChoice();
              loadCurrent();
            }, i === cur.tab);
            if (i === cur.tab) tabBtn = tb;
            row.append(tb);
          });
          body.append(row);
        }
        var items = pageError ? [] : currentItems();
        if (pageError) {
          body.append($('<div class="uakino-online__empty"></div>').text(pageError + '. Виберіть інше джерело.'));
        } else if (!items.length) {
          body.append($('<div class="uakino-online__empty"></div>').text('На цій сторінці немає відео. Виберіть інше джерело.'));
        }
        var list = $('<div class="uakino-online__list"></div>');
        var lastWatched = null;
        var lastKey = choice().last;
        items.forEach(function (item, index) {
          var el = $('<div class="uakino-online__item selector"><div class="uakino-online__title"></div><div class="uakino-online__info"></div><div class="uakino-online__timeline"></div></div>');
          el.find('.uakino-online__title').text(item.title || data.title);
          var meta = [];
          if (item.season || data.season) meta.push('Сезон ' + (item.season || data.season));
          if (item.group) meta.push(item.group);
          el.find('.uakino-online__info').text(meta.join(' • '));
          var view = timeline(item);
          if (view && Lampa.Timeline.render) el.find('.uakino-online__timeline').append(Lampa.Timeline.render(view));
          var key = viewKey(item);
          if (isViewed(key) || view && view.percent >= 85) showViewed(el);
          if (key === lastKey) lastWatched = el[0];
          el.on('hover:enter', function () {
            play(items, index, el);
          });
          list.append(focusable(el));
        });
        body.append(list);
        if (lastWatched && !keepFocus) last = lastWatched;
        var keep = keepFocus === 'tab' ? tabBtn : keepFocus === 'voice' ? voiceBtn : keepFocus === 'source' ? sourceBtn : null;
        if (keep) last = keep[0];
        keepFocus = '';
        self.activity.loader(false);
        self.activity.toggle();
      }
      function currentVoicesFor(tabIndex) {
        var tab = tabsOf(sources[cur.source])[tabIndex];
        var voices = [];
        (data && data.items || []).forEach(function (it) {
          if (tab && tab.season !== null && seasonOfItem(it, tab) !== tab.season) return;
          if (voices.indexOf(it.group) < 0) voices.push(it.group);
        });
        return voices;
      }
      function resolve(sourceId, page, item, ok, fail) {
        if (item.stream) return ok(item.stream);
        Api.stream(sourceId, item.url, page.url, function (json) {
          var s = json && json.items && json.items.length ? json.items[0].stream : json;
          if (!s || !s.url) return fail('посилання на відео не знайдено');
          item.stream = s;
          ok(s);
        }, fail);
      }
      function playerItem(item, stream) {
        var p = {
          title: item.title || data.title,
          url: stream.url
        };
        if (stream.quality) p.quality = stream.quality;
        if (stream.subtitles && stream.subtitles.length) p.subtitles = stream.subtitles;
        var view = timeline(item);
        if (view) p.timeline = view;
        return p;
      }
      function play(items, index, el) {
        var item = items[index];
        markViewed(viewKey(item));
        saveChoice({
          last: viewKey(item),
          manual: true
        });
        if (el) showViewed(el);
        var sourceId = sources[cur.source].id;
        var page = data;
        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start(function () {
          stopLoading();
        });
        resolve(sourceId, page, item, function (stream) {
          stopLoading();
          var first = playerItem(item, stream);
          var playlist = items.map(function (it, i) {
            if (i === index) return first;
            if (it.stream) return playerItem(it, it.stream);
            var cell = {
              title: it.title || page.title
            };
            cell.url = function (call) {
              resolve(sourceId, page, it, function (s) {
                markViewed(viewKey(it));
                saveChoice({
                  last: viewKey(it)
                });
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
          link: this,
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');
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
    var TORRENTS_LABEL = 'Торенти (UA)';
    var UA_LATIN = /(^|[^a-z0-9])(ukr|ua|ukrainian)([^a-z0-9]|$)/i;
    var UA_CYRILLIC = /укр|україн/i;
    var UA_TRACKERS = /toloka|hurtom/i;
    function isUkrainian(r) {
      var text = String(r && r.Title || '');
      return UA_LATIN.test(text) || UA_CYRILLIC.test(text) || UA_TRACKERS.test(String(r && r.Tracker || ''));
    }
    function prepareTorrent(r) {
      if (Lampa.Utils) {
        if (Lampa.Utils.bytesToSize && r.Size) r.size = Lampa.Utils.bytesToSize(r.Size);
        if (Lampa.Utils.hash) r.hash = Lampa.Utils.hash(r.Title);
        if (Lampa.Utils.strToTime && r.PublishDate) r.PublisTime = Lampa.Utils.strToTime(r.PublishDate);
      }
      return r;
    }
    function tolokaSearch(params, done) {
      var cookie = cookieFor('toloka');
      if (!cookie || !BUILT_IN_SERVER) return done([], '');
      var net = new Lampa.Reguest();
      net.timeout(30000);
      net.silent(BUILT_IN_SERVER + '/toloka/search?q=' + enc(params.search_one || params.search) + '&q2=' + enc(params.search_two || '') + '&cookie=' + enc(cookie), function (json) {
        done((json && json.Results || []).map(prepareTorrent), '');
      }, function (a) {
        var err = a && a.responseJSON && a.responseJSON.error || 'Толока недоступна';
        if (a && a.status === 401) Lampa.Storage.set('uakino_cookie_toloka', '');
        done([], err);
      });
    }
    function patchParser() {
      if (!Lampa.Parser || Lampa.Parser.uakino_ua_patched) return;
      var original = Lampa.Parser.get;
      Lampa.Parser.get = function (params, ok, fail) {
        if (!params || !params.uakino_ua) return original.apply(this, arguments);
        var pending = 2;
        var main = null;
        var mainError = '';
        var extra = [];
        var extraError = '';
        function finish() {
          if (--pending) return;
          var results = (main && main.Results || []).filter(isUkrainian);
          var titles = {};
          results.forEach(function (r) {
            titles[String(r.Title).toLowerCase()] = true;
          });
          extra.forEach(function (r) {
            if (!titles[String(r.Title).toLowerCase()]) results.push(r);
          });
          if (!main && !extra.length) return fail(mainError || extraError || 'нічого не знайдено');
          var data = main || {
            Results: []
          };
          data.Results = results;
          ok(data);
        }
        original.call(this, params, function (data) {
          main = data;
          finish();
        }, function (err) {
          mainError = err;
          finish();
        });
        tolokaSearch(params, function (list, err) {
          extra = list;
          extraError = err;
          finish();
        });
      };
      Lampa.Parser.uakino_ua_patched = true;
    }
    function openTorrents(movie) {
      patchParser();
      if (hasCredentials('toloka') && !cookieFor('toloka')) {
        return doLogin('toloka', function () {
          openTorrents(movie);
        });
      }
      var info = movieInfo(movie);
      Lampa.Activity.push({
        url: '',
        title: TORRENTS_LABEL,
        component: 'torrents',
        search: info.original || info.title,
        search_one: info.title,
        search_two: info.original,
        movie: movie,
        page: 1,
        uakino_ua: true
      });
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
    var CSS = '<style>' + '.uakino-online__body{padding:0 1.5em 1.5em}' + '.uakino-online__head{display:flex;align-items:center;margin-bottom:1.2em}' + '.uakino-online__poster{width:5em;height:7.5em;object-fit:cover;border-radius:.6em;margin-right:1.2em;background:rgba(255,255,255,.05);flex-shrink:0}' + '.uakino-online__head-title{font-size:1.6em;font-weight:600}' + '.uakino-online__head-sub{margin-top:.4em;opacity:.6}' + '.uakino-online__filters,.uakino-online__tabs{display:flex;flex-wrap:wrap;margin-bottom:.5em}' + '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' + '.uakino-online__filter--active{background:rgba(255,255,255,.3)}' + '.uakino-online__list{display:block}' + '.uakino-online__item{display:block;position:relative;padding:1em 3.5em 1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' + '.uakino-online__viewed{position:absolute;right:1.2em;top:50%;width:1.6em;height:1.6em;margin-top:-.8em;opacity:.85}' + '.uakino-online__item--viewed .uakino-online__title{opacity:.75}' + '.uakino-online__filter.focus,.uakino-online__item.focus{background:#fff;color:#000}' + '.uakino-online__title{font-size:1.3em}' + '.uakino-online__info{margin-top:.3em;opacity:.6}' + '.uakino-online__empty{padding:2em 0;text-align:center;opacity:.7}' + '</style>';
    function addButtons(e) {
      var render = e.object.activity.render();
      if (render.find('.view--uakino').length) return;
      var online = $('<div class="full-start__button selector view--uakino view--uakino-online">' + ICON_PLAY + '<span>UAKino</span></div>');
      online.on('hover:enter', function () {
        openOnline(e.data.movie);
      });
      var torrent = render.find('.view--torrent');
      if (torrent.length) torrent.before(online);else render.find('.full-start-new__buttons, .full-start__buttons').first().append(online);
      if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');
    }
    function addSettings() {
      if (!Lampa.SettingsApi) return;
      Lampa.SettingsApi.addComponent({
        component: 'uakino',
        name: 'UAKino',
        icon: ICON
      });
      SOURCES.forEach(function (source) {
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_src_' + source.id,
            type: 'trigger',
            default: true
          },
          field: {
            name: source.name,
            description: 'Шукати на ' + source.host.replace(/^https?:\/\//, '')
          }
        });
      });
      ACCOUNTS.forEach(function (account) {
        var relogin = function relogin() {
          if (hasCredentials(account.id)) loginWithNotice(account);
        };
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_title_' + account.id,
            type: 'title'
          },
          field: {
            name: account.name + ' — акаунт'
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_login_' + account.id,
            type: 'input',
            values: '',
            default: '',
            placeholder: 'логін'
          },
          field: {
            name: 'Логін',
            description: account.descr
          },
          onChange: relogin
        });
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_pass_' + account.id,
            type: 'input',
            values: '',
            default: '',
            placeholder: 'пароль'
          },
          field: {
            name: 'Пароль'
          },
          onChange: relogin,
          onRender: function onRender(item) {
            item.toggleClass('hide', !!cookieFor(account.id));
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_enter_' + account.id,
            type: 'button'
          },
          field: {
            name: 'Увійти',
            description: 'Вхід не виконано'
          },
          onRender: function onRender(item) {
            var logged = !!cookieFor(account.id);
            item.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');
            item.find('.settings-param__descr').text(accountStatus(account));
          },
          onChange: function onChange() {
            if (cookieFor(account.id)) logout(account);else loginWithNotice(account);
          }
        });
      });
      SOURCES.forEach(function (source) {
        Lampa.SettingsApi.addParam({
          component: 'uakino',
          param: {
            name: 'uakino_host_' + source.id,
            type: 'input',
            values: '',
            default: '',
            placeholder: source.host
          },
          field: {
            name: 'Адреса ' + source.name,
            description: 'Дзеркало, якщо основна адреса не відкривається. За замовчуванням: ' + source.host
          }
        });
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
