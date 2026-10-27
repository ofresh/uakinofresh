// Згенеровано build.js — не редагуйте вручну.
// UAKino → Lampa: парсер uakino.best для Cloudflare Workers.

const __PLUGIN_SOURCE__ = "/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/ (ES5). Не редагуйте вручну. */\n(function () {\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\nfunction _regeneratorValues(e) { if (null != e) { var t = e[\"function\" == typeof Symbol && Symbol.iterator || \"@@iterator\"], r = 0; if (t) return t.call(e); if (\"function\" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + \" is not iterable\"); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, e) { if (\"object\" != _typeof(t) || !t) return t; var r; if (\"undefined\" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === e ? String : Number)(t); }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _regenerator() { var e, t, r = \"function\" == typeof Symbol ? Symbol : {}, n = r.iterator || \"@@iterator\", o = r.toStringTag || \"@@toStringTag\"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, \"_invoke\", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError(\"Generator is already running\"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = \"next\"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError(\"iterator result is not an object\"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError(\"The iterator does not provide a '\" + o + \"' method\"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, \"GeneratorFunction\")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, \"constructor\", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, \"constructor\", GeneratorFunction), GeneratorFunction.displayName = \"GeneratorFunction\", _regeneratorDefine2(GeneratorFunctionPrototype, o, \"GeneratorFunction\"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, \"Generator\"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, \"toString\", function () { return \"[object Generator]\"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }\nfunction _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, \"\", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o(\"next\", 0), o(\"throw\", 1), o(\"return\", 2)); }, _regeneratorDefine2(e, r, n, t); }\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }\nfunction _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n); } _next(void 0); }); }; }\n(function () {\n  if (!Array.from) Array.from = function (src, fn) {\n    var out = [];\n    if (src && typeof src.length !== 'number' && typeof Symbol !== 'undefined' && src[Symbol.iterator]) {\n      var it = src[Symbol.iterator](),\n        step;\n      while (!(step = it.next()).done) out.push(step.value);\n    } else {\n      for (var i = 0; src && i < src.length; i++) out.push(src[i]);\n    }\n    return fn ? out.map(fn) : out;\n  };\n  if (!String.fromCodePoint) String.fromCodePoint = function (code) {\n    if (code <= 0xffff) return String.fromCharCode(code);\n    code -= 0x10000;\n    return String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff));\n  };\n  var UAKinoLib = function () {\n    var __modules = {\n      \"lib/client.js\": [{\n        \"./parse\": \"lib/parse.js\",\n        \"./online\": \"lib/online.js\",\n        \"./jackett\": \"lib/jackett.js\",\n        \"./search\": \"lib/search.js\",\n        \"./sources\": \"lib/sources.js\"\n      }, function (module, exports, require) {\n        'use strict';\n        var parse = require('./parse');\n        var _require = require('./online'),\n          createOnline = _require.createOnline;\n        var _require2 = require('./jackett'),\n          toJackett = _require2.toJackett;\n        var _require3 = require('./search'),\n          searchDle = _require3.searchDle;\n        var _require4 = require('./sources'),\n          SOURCES = _require4.SOURCES;\n        function createClient(_ref) {\n          var source = _ref.source,\n            host = _ref.host,\n            fetchText = _ref.fetchText,\n            _ref$maxPages = _ref.maxPages,\n            maxPages = _ref$maxPages === void 0 ? 5 : _ref$maxPages;\n          source = source || SOURCES[0];\n          host = String(host || source.host).replace(/\\/+$/, '');\n          var searches = new Map();\n          var pages = new Map();\n          function searchSite(_x) {\n            return _searchSite.apply(this, arguments);\n          }\n          function _searchSite() {\n            _searchSite = _asyncToGenerator(_regenerator().m(function _callee(query) {\n              var q, key, list;\n              return _regenerator().w(function (_context) {\n                while (1) switch (_context.n) {\n                  case 0:\n                    q = String(query || '').trim();\n                    if (!(q.length < 2)) {\n                      _context.n = 1;\n                      break;\n                    }\n                    return _context.a(2, []);\n                  case 1:\n                    key = q.toLowerCase();\n                    if (!searches.has(key)) {\n                      _context.n = 2;\n                      break;\n                    }\n                    return _context.a(2, searches.get(key));\n                  case 2:\n                    _context.n = 3;\n                    return searchDle(host, q, fetchText, source);\n                  case 3:\n                    list = _context.v;\n                    searches.set(key, list);\n                    return _context.a(2, list);\n                }\n              }, _callee);\n            }));\n            return _searchSite.apply(this, arguments);\n          }\n          function page(_x2) {\n            return _page.apply(this, arguments);\n          }\n          function _page() {\n            _page = _asyncToGenerator(_regenerator().m(function _callee2(url) {\n              var _t, _t2, _t3;\n              return _regenerator().w(function (_context2) {\n                while (1) switch (_context2.n) {\n                  case 0:\n                    if (pages.has(url)) {\n                      _context2.n = 2;\n                      break;\n                    }\n                    _t = pages;\n                    _t2 = url;\n                    _t3 = parse;\n                    _context2.n = 1;\n                    return fetchText(url, {});\n                  case 1:\n                    _t.set.call(_t, _t2, _t3.parsePage.call(_t3, _context2.v, url, host));\n                  case 2:\n                    return _context2.a(2, pages.get(url));\n                }\n              }, _callee2);\n            }));\n            return _page.apply(this, arguments);\n          }\n          function torrents(_x3) {\n            return _torrents.apply(this, arguments);\n          }\n          function _torrents() {\n            _torrents = _asyncToGenerator(_regenerator().m(function _callee3(_ref2) {\n              var _ref2$title, title, _ref2$original, original, _ref2$query, query, _ref2$year, year, variants, titles, found, lastError, _iterator, _step, q, _iterator2, _step2, item, list, relevant, loaded, out, y, yearOf, _t4, _t5, _t6;\n              return _regenerator().w(function (_context3) {\n                while (1) switch (_context3.p = _context3.n) {\n                  case 0:\n                    _ref2$title = _ref2.title, title = _ref2$title === void 0 ? '' : _ref2$title, _ref2$original = _ref2.original, original = _ref2$original === void 0 ? '' : _ref2$original, _ref2$query = _ref2.query, query = _ref2$query === void 0 ? '' : _ref2$query, _ref2$year = _ref2.year, year = _ref2$year === void 0 ? null : _ref2$year;\n                    variants = parse.titleVariants([title, original, query]);\n                    titles = variants.match;\n                    if (titles.length) {\n                      _context3.n = 1;\n                      break;\n                    }\n                    return _context3.a(2, []);\n                  case 1:\n                    found = new Map();\n                    lastError = null;\n                    _iterator = _createForOfIteratorHelper(variants.search);\n                    _context3.p = 2;\n                    _iterator.s();\n                  case 3:\n                    if ((_step = _iterator.n()).done) {\n                      _context3.n = 8;\n                      break;\n                    }\n                    q = _step.value;\n                    _context3.p = 4;\n                    _t4 = _createForOfIteratorHelper;\n                    _context3.n = 5;\n                    return searchSite(q);\n                  case 5:\n                    _iterator2 = _t4(_context3.v);\n                    try {\n                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                        item = _step2.value;\n                        if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, {\n                          score: parse.scoreTitle(item, titles)\n                        }));\n                      }\n                    } catch (err) {\n                      _iterator2.e(err);\n                    } finally {\n                      _iterator2.f();\n                    }\n                    _context3.n = 7;\n                    break;\n                  case 6:\n                    _context3.p = 6;\n                    _t5 = _context3.v;\n                    lastError = _t5;\n                  case 7:\n                    _context3.n = 3;\n                    break;\n                  case 8:\n                    _context3.n = 10;\n                    break;\n                  case 9:\n                    _context3.p = 9;\n                    _t6 = _context3.v;\n                    _iterator.e(_t6);\n                  case 10:\n                    _context3.p = 10;\n                    _iterator.f();\n                    return _context3.f(10);\n                  case 11:\n                    if (!(!found.size && lastError)) {\n                      _context3.n = 12;\n                      break;\n                    }\n                    throw lastError;\n                  case 12:\n                    list = Array.from(found.values()).sort(function (a, b) {\n                      return b.score - a.score;\n                    });\n                    relevant = list.filter(function (c) {\n                      return c.score >= 40;\n                    });\n                    if (relevant.length) list = relevant;\n                    list = list.slice(0, maxPages);\n                    _context3.n = 13;\n                    return Promise.all(list.map(function (c) {\n                      return page(c.url).catch(function () {\n                        return null;\n                      });\n                    }));\n                  case 13:\n                    loaded = _context3.v;\n                    out = [];\n                    loaded.forEach(function (p) {\n                      if (!p) return;\n                      p.torrents.forEach(function (t) {\n                        var r = toJackett({\n                          page: p,\n                          torrent: t,\n                          meta: null,\n                          peers: null\n                        }, '');\n                        r.Link = t.url;\n                        out.push(r);\n                      });\n                    });\n                    if (year) {\n                      y = Number(year);\n                      yearOf = function yearOf(r) {\n                        var m = r.Title.match(/\\((\\d{4})\\)/);\n                        return m ? Number(m[1]) : y;\n                      };\n                      out.sort(function (a, b) {\n                        return Math.abs(yearOf(a) - y) - Math.abs(yearOf(b) - y);\n                      });\n                    }\n                    return _context3.a(2, out);\n                }\n              }, _callee3, null, [[4, 6], [2, 9, 10, 11]]);\n            }));\n            return _torrents.apply(this, arguments);\n          }\n          return {\n            host: host,\n            source: source,\n            searchSite: searchSite,\n            torrents: torrents,\n            online: createOnline({\n              host: host,\n              fetchText: fetchText,\n              searchSite: searchSite,\n              name: source.name,\n              anyPlayer: true\n            })\n          };\n        }\n        module.exports = {\n          createClient: createClient,\n          SOURCES: SOURCES\n        };\n      }],\n      \"lib/parse.js\": [{}, function (module, exports, require) {\n        'use strict';\n        var ENTITIES = {\n          amp: '&',\n          lt: '<',\n          gt: '>',\n          quot: '\"',\n          apos: \"'\",\n          nbsp: ' ',\n          laquo: '«',\n          raquo: '»',\n          ndash: '–',\n          mdash: '—',\n          hellip: '…'\n        };\n        function decodeEntities(s) {\n          return String(s || '').replace(/&(#x[0-9a-f]+|#\\d+|[a-z]+);/gi, function (m, e) {\n            if (e[0] === '#') {\n              var code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);\n              return Number.isFinite(code) ? String.fromCodePoint(code) : m;\n            }\n            var v = ENTITIES[e.toLowerCase()];\n            return v === undefined ? m : v;\n          });\n        }\n        function stripTags(s) {\n          return decodeEntities(String(s || '').replace(/<script[\\s\\S]*?<\\/script>/gi, ' ').replace(/<[^>]*>/g, ' ')).replace(/\\s+/g, ' ').trim();\n        }\n        function safeDecode(s) {\n          try {\n            return decodeURIComponent(s);\n          } catch (e) {\n            return s;\n          }\n        }\n        function absoluteUrl(href, host) {\n          if (!href) return '';\n          var url = decodeEntities(href.trim());\n          if (url.indexOf('//') === 0) url = 'https:' + url;else if (!/^https?:\\/\\//i.test(url)) url = host.replace(/\\/+$/, '') + '/' + url.replace(/^\\/+/, '');\n          try {\n            var u = new URL(url);\n            u.pathname = u.pathname.split('/').map(function (p) {\n              return encodeURIComponent(safeDecode(p));\n            }).join('/');\n            return u.toString();\n          } catch (e) {\n            return '';\n          }\n        }\n        function localize(url, host) {\n          try {\n            var u = new URL(url);\n            var h = new URL(host);\n            var a = u.hostname.replace(/^www\\./, '');\n            if (a === h.hostname.replace(/^www\\./, '')) return u.toString();\n            if (!/(^|\\.)uakino\\.[a-z]+$/i.test(a)) return '';\n            u.protocol = h.protocol;\n            u.host = h.host;\n            return u.toString();\n          } catch (e) {\n            return '';\n          }\n        }\n        var NEWS_RE = /\\/(\\d+)-[^/]*\\.html$/;\n        function newsId(url) {\n          try {\n            var m = new URL(url).pathname.match(NEWS_RE);\n            return m ? m[1] : null;\n          } catch (e) {\n            return null;\n          }\n        }\n        function attr(tag, name) {\n          var m = tag.match(new RegExp('\\\\s' + name + '\\\\s*=\\\\s*(\"([^\"]*)\"|\\'([^\\']*)\\'|([^\\\\s>]+))', 'i'));\n          return m ? m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] : null;\n        }\n        function cardTitle(tag, inner) {\n          var clean = function clean(t) {\n            return decodeEntities(t || '').replace(/\\s+(онлайн|дивитис[ья]|смотреть)(\\s.*)?$/i, '').replace(/\\s+/g, ' ').trim();\n          };\n          var heading = inner.match(/<h[1-6]\\b[^>]*>([\\s\\S]*?)<\\/h[1-6]>/i);\n          if (heading && stripTags(heading[1])) return clean(stripTags(heading[1]));\n          if (attr(tag, 'title')) return clean(attr(tag, 'title'));\n          var img = inner.match(/<img\\b[^>]*>/i);\n          var alt = img ? attr(img[0], 'alt') || attr(img[0], 'title') : '';\n          if (alt && !/постер|poster/i.test(alt)) return clean(alt);\n          return clean(stripTags(inner));\n        }\n        function parseList(html, host, linkRe) {\n          var found = new Map();\n          var re = /<a\\b([^>]*)>([\\s\\S]*?)<\\/a>/gi;\n          var m;\n          while (m = re.exec(html)) {\n            var href = attr(m[0], 'href');\n            if (!href) continue;\n            var url = localize(absoluteUrl(href, host), host);\n            if (!url) continue;\n            var id = void 0;\n            if (linkRe) {\n              var path = new URL(url).pathname;\n              id = linkRe.test(path) ? path : null;\n            } else {\n              id = newsId(url);\n            }\n            if (!id) continue;\n            var cls = attr(m[0], 'class') || '';\n            var title = cardTitle(m[0], m[2]);\n            var item = found.get(id) || {\n              id: id,\n              url: url,\n              title: '',\n              poster: ''\n            };\n            if (title && (!item.title || /movie-title|title/.test(cls))) item.title = title;\n            if (!item.poster) {\n              var img = m[2].match(/<img\\b[^>]*>/i);\n              if (img) {\n                var src = attr(img[0], 'data-src') || attr(img[0], 'src');\n                if (src) item.poster = absoluteUrl(src, host);\n              }\n            }\n            if (!item.original) {\n              var after = html.slice(re.lastIndex, re.lastIndex + 600).split(/<a\\b/i)[0];\n              var orig = after.match(/class=[\"'][^\"']*(oname|original|orig-title|origintitle)[^\"']*[\"'][^>]*>([\\s\\S]*?)<\\//i);\n              if (orig && stripTags(orig[2])) item.original = stripTags(orig[2]);\n            }\n            found.set(id, item);\n          }\n          return Array.from(found.values()).filter(function (i) {\n            return i.title;\n          });\n        }\n        function parseYear(html) {\n          var ld = html.match(/\"dateCreated\"\\s*:\\s*\"((?:19|20)\\d{2})/);\n          if (ld) return Number(ld[1]);\n          var text = stripTags(html);\n          var m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\\s*:\\s*((?:19|20)\\d{2})/i);\n          if (m) return Number(m[1]);\n          var title = (html.match(/<title[^>]*>([\\s\\S]*?)<\\/title>/i) || [])[1] || '';\n          var t = title.match(/(?:^|\\D)((?:19|20)\\d{2})(?!\\d)/);\n          return t ? Number(t[1]) : null;\n        }\n        function parsePage(html, url, host) {\n          var h1 = html.match(/<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/i);\n          var og = html.match(/<meta[^>]+property=[\"']og:title[\"'][^>]*>/i);\n          var title = h1 ? stripTags(h1[1]) : '';\n          if (!title && og) title = decodeEntities(attr(og[0], 'content') || '').trim();\n          var orig = html.match(/class=[\"'][^\"']*origintitle[^\"']*[\"'][^>]*>([\\s\\S]*?)<\\/(?:span|div|h2|p)>/i);\n          var original = orig ? stripTags(orig[1]) : '';\n          var year = parseYear(html);\n          if (!year) {\n            var t = (title + ' ' + original).match(/\\((19|20)\\d{2}\\)/);\n            if (t) year = Number(t[0].slice(1, 5));\n          }\n          var ogImg = html.match(/<meta[^>]+property=[\"']og:image[\"'][^>]*>/i);\n          var poster = ogImg ? absoluteUrl(attr(ogImg[0], 'content'), host) : '';\n          var torrents = new Map();\n          var re = /<a\\b([^>]*)>([\\s\\S]*?)<\\/a>/gi;\n          var m;\n          while (m = re.exec(html)) {\n            var href = attr(m[0], 'href');\n            if (!href || !/\\/torrent\\/\\d+\\//i.test(href)) continue;\n            var link = localize(absoluteUrl(href, host), host);\n            if (!link || torrents.has(link)) continue;\n            var path = new URL(link).pathname;\n            var tid = path.match(/\\/torrent\\/(\\d+)\\//)[1];\n            var file = safeDecode(path.split('/').pop()).replace(/\\.torrent$/i, '').trim();\n            torrents.set(link, {\n              id: tid,\n              url: link,\n              name: file || stripTags(m[2]),\n              label: stripTags(m[2])\n            });\n          }\n          var loose = /([\"'])((?:https?:)?\\/\\/[^\"'<>\\s]*?\\/torrent\\/\\d+\\/[^\"'<>]*?\\.torrent|\\/torrent\\/\\d+\\/[^\"'<>]*?\\.torrent)\\1/gi;\n          while (m = loose.exec(html)) {\n            var _link = localize(absoluteUrl(m[2], host), host);\n            if (!_link || torrents.has(_link)) continue;\n            var _path = new URL(_link).pathname;\n            var _tid = _path.match(/\\/torrent\\/(\\d+)\\//)[1];\n            torrents.set(_link, {\n              id: _tid,\n              url: _link,\n              name: safeDecode(_path.split('/').pop()).replace(/\\.torrent$/i, '').trim(),\n              label: ''\n            });\n          }\n          return {\n            id: newsId(url),\n            url: url,\n            title: title,\n            original: original,\n            year: year,\n            poster: poster,\n            torrents: Array.from(torrents.values())\n          };\n        }\n        function parseSitemap(xml) {\n          var out = [];\n          var re = /<loc>\\s*([\\s\\S]*?)\\s*<\\/loc>/gi;\n          var m;\n          while (m = re.exec(xml)) out.push(decodeEntities(m[1].replace(/^<!\\[CDATA\\[|\\]\\]>$/g, '')));\n          return out;\n        }\n        function normalizeTitle(s) {\n          return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[ʼ’'`]/g, '').replace(/[^0-9a-z\\u00c0-\\u024f\\u0400-\\u04ff]+/g, ' ').trim();\n        }\n        function baseTitle(s) {\n          var n = normalizeTitle(s);\n          var cut = n.replace(/\\s*((\\d+\\s*)+сезон|сезон\\s*\\d+|season\\s*\\d+|\\d+\\s*season).*$/, '').trim();\n          var noYear = cut.replace(/\\b(19|20)\\d{2}\\b/g, ' ').replace(/\\s+/g, ' ').trim();\n          return noYear || cut || n;\n        }\n        function altNames(item) {\n          var names = String(item.title || '').split(/\\s+\\/\\s+/);\n          if (item.original) names.push(item.original);\n          return names.filter(Boolean);\n        }\n        function scoreTitle(item, titles) {\n          var qs = titles.map(baseTitle).filter(Boolean);\n          var best = 0;\n          var _iterator3 = _createForOfIteratorHelper(altNames(item)),\n            _step3;\n          try {\n            var _loop = function _loop() {\n              var name = _step3.value;\n              var b = baseTitle(name);\n              if (!b) return 1;\n              var _iterator4 = _createForOfIteratorHelper(qs),\n                _step4;\n              try {\n                for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {\n                  var q = _step4.value;\n                  var s = 0;\n                  if (b === q) s = 100;else if ((' ' + b + ' ').indexOf(' ' + q + ' ') >= 0) s = 50;else if ((' ' + q + ' ').indexOf(' ' + b + ' ') >= 0 && b.length > 3) s = 40;else {\n                    var words = q.split(' ').filter(function (w) {\n                      return w.length > 2;\n                    });\n                    var hit = words.filter(function (w) {\n                      return (' ' + b + ' ').indexOf(' ' + w + ' ') >= 0;\n                    }).length;\n                    if (words.length) s = Math.round(hit / words.length * 30);\n                  }\n                  best = Math.max(best, s);\n                }\n              } catch (err) {\n                _iterator4.e(err);\n              } finally {\n                _iterator4.f();\n              }\n            };\n            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n              if (_loop()) continue;\n            }\n          } catch (err) {\n            _iterator3.e(err);\n          } finally {\n            _iterator3.f();\n          }\n          return best;\n        }\n        function yearOf(item) {\n          var m = String(item.title || '').match(/\\((19|20)\\d{2}\\)/) || String(item.url || '').match(/[-_/]((19|20)\\d{2})(?:[-_.][a-z]*)?\\.html$/);\n          return m ? Number(m[0].replace(/\\D/g, '').slice(0, 4)) : null;\n        }\n        function pageMeta(html, url) {\n          var type = null;\n          var genre = stripTags((html.match(/(Жанр|Тип)\\s*:?\\s*(<[^>]*>\\s*)*[^<]{0,40}/i) || [''])[0]);\n          var title = stripTags((html.match(/<title[^>]*>([\\s\\S]*?)<\\/title>/i) || [])[1] || '');\n          if (/\\/(serials?|seriesss?|series|tv)(\\/|-)|sezon|season/i.test(url || '')) type = 'serial';else if (/\\/(films?|filmy|filmss|movies?)(\\/|-)|\\/movie-/i.test(url || '')) type = 'film';else if (/:\\s*(мульт)?серіал|:\\s*аніме-серіал/i.test(genre)) type = 'serial';else if (/:\\s*(мульт)?фільм/i.test(genre)) type = 'film';else if (/^\\s*(мульт)?серіал/i.test(title)) type = 'serial';else if (/^\\s*(мульт)?фільм/i.test(title)) type = 'film';else if (/сезон|серії|серія|season/i.test(title)) type = 'serial';else if (/\"@type\"\\s*:\\s*\"TVSeries\"/.test(html)) type = 'serial';else if (/\"@type\"\\s*:\\s*\"Movie\"/.test(html)) type = 'film';\n          return {\n            type: type,\n            year: parseYear(html)\n          };\n        }\n        function titleVariants(list) {\n          var all = [];\n          var add = function add(t) {\n            t = String(t || '').trim();\n            if (t && all.indexOf(t) < 0) all.push(t);\n          };\n          list.forEach(function (t) {\n            var short = String(t || '').replace(/\\s*[([][^)\\]]*[)\\]]\\s*/g, ' ').replace(/\\s+/g, ' ').trim();\n            add(short);\n            add(t);\n          });\n          var cjk = /[\\u3040-\\u30ff\\u3400-\\u9fff\\uac00-\\ud7af]/;\n          return {\n            match: all,\n            search: all.filter(function (t) {\n              return !cjk.test(t);\n            }).slice(0, 3)\n          };\n        }\n        module.exports = {\n          titleVariants: titleVariants,\n          pageMeta: pageMeta,\n          scoreTitle: scoreTitle,\n          baseTitle: baseTitle,\n          altNames: altNames,\n          yearOf: yearOf,\n          decodeEntities: decodeEntities,\n          stripTags: stripTags,\n          absoluteUrl: absoluteUrl,\n          localize: localize,\n          newsId: newsId,\n          parseList: parseList,\n          parsePage: parsePage,\n          parseSitemap: parseSitemap,\n          normalizeTitle: normalizeTitle\n        };\n      }],\n      \"lib/online.js\": [{\n        \"./parse\": \"lib/parse.js\"\n      }, function (module, exports, require) {\n        'use strict';\n        var parse = require('./parse');\n        var PLAYER_HOSTS = /(^|\\.)(ashdi\\.vip|tortuga\\.[a-z]+|zetvideo\\.net|[a-z0-9-]*hdvb[a-z0-9-]*\\.[a-z]+|uakino\\.[a-z]+)$/i;\n        var PLAYER_URL = /(?:https?:)?\\/\\/(?:[a-z0-9-]+\\.)*(?:ashdi\\.vip|tortuga\\.[a-z]+|zetvideo\\.net|[a-z0-9-]*hdvb[a-z0-9-]*\\.[a-z]+)\\/[^\"'\\s<>\\\\]+/gi;\n        function attr(tag, name) {\n          var m = tag.match(new RegExp('\\\\s' + name + '\\\\s*=\\\\s*(\"([^\"]*)\"|\\'([^\\']*)\\'|([^\\\\s>]+))', 'i'));\n          return m ? parse.decodeEntities(m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;\n        }\n        function absolute(url, host) {\n          if (!url) return '';\n          url = url.trim();\n          if (url.indexOf('//') === 0) return 'https:' + url;\n          if (/^https?:\\/\\//i.test(url)) return url;\n          return host.replace(/\\/+$/, '') + '/' + url.replace(/^\\/+/, '');\n        }\n        function seasonOf(s) {\n          if (/\\d+\\s*[-–]\\s*\\d+[\\s_-]*(сезон|sezon)/i.test(String(s || ''))) return null;\n          var m = String(s || '').match(/(?:сезон|season|sezon)[\\s_-]*(\\d+)|(\\d+)[\\s_-]*(?:сезон|sezon)|season\\s*(\\d+)/i);\n          return m ? Number(m[1] || m[2] || m[3]) : null;\n        }\n        function episodeOf(s) {\n          var m = String(s || '').match(/(\\d+)\\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\\s*(\\d+)|^\\s*(\\d+)\\b/i);\n          return m ? Number(m[1] || m[2] || m[3]) : null;\n        }\n        function parsePlayers(html, host, anyHost) {\n          var playlist = null;\n          var ajax = html.match(/<div\\b[^>]*class=[\"'][^\"']*playlists-ajax[^\"']*[\"'][^>]*>/i);\n          if (ajax) {\n            var newsId = attr(ajax[0], 'data-news_id');\n            if (newsId) playlist = {\n              newsId: newsId,\n              xfield: attr(ajax[0], 'data-xfname') || 'playlist'\n            };\n          }\n          var iframes = [];\n          var seen = [];\n          var skip = function skip(src) {\n            return /youtube|trailer|\\.(js|css|png|jpe?g|webp|gif|svg|ico)(\\?|$)/i.test(src);\n          };\n          var add = function add(src) {\n            if (!src || iframes.indexOf(src) >= 0 || skip(src)) return;\n            iframes.push(src);\n          };\n          var re = /<iframe\\b[^>]*>/gi;\n          var m;\n          while (m = re.exec(html)) {\n            var src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);\n            if (!src) continue;\n            try {\n              var h = new URL(src).hostname;\n              if (seen.indexOf(h) < 0) seen.push(h);\n              if (!anyHost && !PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;\n            } catch (e) {\n              continue;\n            }\n            add(src);\n          }\n          var loose = html.match(PLAYER_URL) || [];\n          loose.forEach(function (u) {\n            var src = absolute(u.replace(/&amp;/g, '&'), host);\n            try {\n              var _h = new URL(src).hostname;\n              if (seen.indexOf(_h) < 0) seen.push(_h);\n            } catch (e) {\n              return;\n            }\n            add(src);\n          });\n          return {\n            playlist: playlist,\n            iframes: iframes,\n            seen: seen\n          };\n        }\n        function parsePlaylist(html, host) {\n          var labels = {};\n          var episodes = [];\n          var re = /<li\\b([^>]*)>([\\s\\S]*?)<\\/li>/gi;\n          var m;\n          while (m = re.exec(html)) {\n            var open = '<li' + m[1] + '>';\n            var file = attr(open, 'data-file');\n            var id = attr(open, 'data-id');\n            var text = parse.stripTags(m[2]);\n            if (file) episodes.push({\n              id: id || '',\n              voice: attr(open, 'data-voice') || '',\n              title: text,\n              file: absolute(file, host)\n            });else if (id != null) labels[id] = text;\n          }\n          return episodes.map(function (ep) {\n            var parts = ep.id ? ep.id.split('_') : [];\n            var names = [];\n            for (var i = 1; i <= parts.length; i++) {\n              var _label = labels[parts.slice(0, i).join('_')];\n              if (_label && names.indexOf(_label) < 0) names.push(_label);\n            }\n            if (ep.voice && names.indexOf(ep.voice) < 0) names.push(ep.voice);\n            var label = names.filter(function (n) {\n              return !/^(озвучування|озвучка|озвучення)$/i.test(n.trim());\n            }).map(function (n) {\n              return n.trim().replace(/^плеєр\\s+/i, '');\n            }).join(' · ');\n            return {\n              group: label || 'UAKino',\n              title: ep.title,\n              file: ep.file\n            };\n          });\n        }\n        function parseEpisodeLinks(html, host, pageUrl) {\n          var base = '';\n          try {\n            base = new URL(pageUrl).pathname.replace(/\\/+$/, '');\n          } catch (e) {}\n          var episodes = [];\n          var seasonPages = [];\n          var re = /<a\\b([^>]*)>([\\s\\S]*?)<\\/a>/gi;\n          var m;\n          while (m = re.exec(html)) {\n            var href = attr('<a' + m[1] + '>', 'href');\n            if (!href) continue;\n            var url = absolute(href, host);\n            var path = void 0;\n            try {\n              path = new URL(url).pathname;\n            } catch (e) {\n              continue;\n            }\n            if (base && path.indexOf(base + '/') !== 0) continue;\n            var ep = path.match(/season-(\\d+)-episode-(\\d+)\\/?$/i);\n            if (ep) {\n              var inner = m[2];\n              var title = parse.stripTags((inner.match(/class=[\"'][^\"']*vi-title[^\"']*[\"'][^>]*>([\\s\\S]*?)<\\/div>/i) || [])[1] || '');\n              var label = parse.stripTags((inner.match(/class=[\"'][^\"']*vi-rate[^\"']*[\"'][^>]*>([\\s\\S]*?)<\\/div>/i) || [])[1] || '');\n              episodes.push({\n                season: Number(ep[1]),\n                episode: Number(ep[2]),\n                url: url,\n                title: title,\n                label: label\n              });\n              continue;\n            }\n            if (/\\/(sezon|season)-\\d+\\/?$/i.test(path) && seasonPages.indexOf(url) < 0) seasonPages.push(url);\n          }\n          return {\n            episodes: episodes,\n            seasonPages: seasonPages\n          };\n        }\n        function jsString(html, key) {\n          var re = new RegExp('[\\\\s,{]' + key + '\\\\s*:\\\\s*([\\'\"])((?:\\\\\\\\.|(?!\\\\1)[\\\\s\\\\S])*)\\\\1');\n          var m = html.match(re);\n          if (!m) return null;\n          return m[2].replace(/\\\\(.)/g, function (s, c) {\n            return c === 'n' ? '\\n' : c;\n          });\n        }\n        function parseQualities(str) {\n          var out = {};\n          String(str || '').split(/,(?=\\s*(?:\\[|https?:|\\/\\/))/).forEach(function (part) {\n            var m = part.trim().match(/^\\[([^\\]]*)\\](.+)$/);\n            if (m) {\n              m[2].split(' or ').forEach(function (u) {\n                if (!out[m[1]]) out[m[1]] = absolute(u.trim(), 'https://x');\n              });\n            } else if (part.trim()) {\n              out.auto = absolute(part.trim().split(' or ')[0], 'https://x');\n            }\n          });\n          return out;\n        }\n        function parseSubtitles(str) {\n          if (!str) return [];\n          return String(str).split(/,(?=\\s*\\[)/).map(function (part) {\n            var m = part.trim().match(/^\\[([^\\]]*)\\](.+)$/);\n            return m ? {\n              label: m[1],\n              url: absolute(m[2].trim(), 'https://x')\n            } : {\n              label: 'Субтитри',\n              url: absolute(part.trim(), 'https://x')\n            };\n          }).filter(function (s) {\n            return /^https?:/.test(s.url);\n          });\n        }\n        function toStream(file, subtitle) {\n          var q = parseQualities(file);\n          var keys = Object.keys(q);\n          if (!keys.length) return null;\n          var best = keys.slice().sort(function (a, b) {\n            return (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0);\n          })[0];\n          return {\n            url: q[best],\n            quality: keys.length > 1 ? q : null,\n            subtitles: parseSubtitles(subtitle)\n          };\n        }\n        function flatten(nodes, path, out) {\n          (nodes || []).forEach(function (n) {\n            if (Array.isArray(n.folder)) flatten(n.folder, path.concat(n.title || ''), out);else if (n.file) out.push({\n              path: path,\n              title: n.title || '',\n              file: n.file,\n              subtitle: n.subtitle || ''\n            });\n          });\n          return out;\n        }\n        function parsePlayerjs(html) {\n          var file = jsString(html, 'file');\n          if (!file) return null;\n          var subtitle = jsString(html, 'subtitle') || '';\n          var trimmed = file.trim();\n          if (trimmed[0] === '[' && trimmed[1] !== ']' && /^\\[\\s*\\{/.test(trimmed)) {\n            var data;\n            try {\n              data = JSON.parse(trimmed);\n            } catch (e) {\n              return null;\n            }\n            return {\n              folders: flatten(data, [], [])\n            };\n          }\n          if (trimmed[0] === '#') return null;\n          return {\n            file: trimmed,\n            subtitle: subtitle\n          };\n        }\n        var TinyCache = function () {\n          function TinyCache(ttl) {\n            _classCallCheck(this, TinyCache);\n            this.ttl = ttl;\n            this.map = new Map();\n          }\n          return _createClass(TinyCache, [{\n            key: \"wrap\",\n            value: function () {\n              var _wrap = _asyncToGenerator(_regenerator().m(function _callee4(key, fn) {\n                var e, v;\n                return _regenerator().w(function (_context4) {\n                  while (1) switch (_context4.n) {\n                    case 0:\n                      e = this.map.get(key);\n                      if (!(e && Date.now() < e.exp)) {\n                        _context4.n = 1;\n                        break;\n                      }\n                      return _context4.a(2, e.v);\n                    case 1:\n                      _context4.n = 2;\n                      return fn();\n                    case 2:\n                      v = _context4.v;\n                      if (this.map.size > 500) this.map.delete(this.map.keys().next().value);\n                      this.map.set(key, {\n                        v: v,\n                        exp: Date.now() + this.ttl\n                      });\n                      return _context4.a(2, v);\n                  }\n                }, _callee4, this);\n              }));\n              function wrap(_x4, _x5) {\n                return _wrap.apply(this, arguments);\n              }\n              return wrap;\n            }()\n          }]);\n        }();\n        function createOnline(_ref3) {\n          var host = _ref3.host,\n            fetchText = _ref3.fetchText,\n            searchSite = _ref3.searchSite,\n            _ref3$name = _ref3.name,\n            name = _ref3$name === void 0 ? 'UAKino' : _ref3$name,\n            _ref3$anyPlayer = _ref3.anyPlayer,\n            anyPlayer = _ref3$anyPlayer === void 0 ? false : _ref3$anyPlayer;\n          var cache = new TinyCache(20 * 60 * 1000);\n          host = host.replace(/\\/+$/, '');\n          function checkUrl(url, players) {\n            var u;\n            try {\n              u = new URL(url);\n            } catch (e) {\n              throw Object.assign(new Error('bad url'), {\n                status: 400\n              });\n            }\n            var own = u.hostname.replace(/^www\\./, '') === new URL(host).hostname.replace(/^www\\./, '');\n            var ok = own || players && (anyPlayer || PLAYER_HOSTS.test(u.hostname));\n            if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), {\n              status: 403\n            });\n            return u.toString();\n          }\n          var htmlCache = new Map();\n          function pageHtml(_x6) {\n            return _pageHtml.apply(this, arguments);\n          }\n          function _pageHtml() {\n            _pageHtml = _asyncToGenerator(_regenerator().m(function _callee5(url) {\n              var html;\n              return _regenerator().w(function (_context5) {\n                while (1) switch (_context5.n) {\n                  case 0:\n                    if (!htmlCache.has(url)) {\n                      _context5.n = 1;\n                      break;\n                    }\n                    return _context5.a(2, htmlCache.get(url));\n                  case 1:\n                    _context5.n = 2;\n                    return fetchText(url, {});\n                  case 2:\n                    html = _context5.v;\n                    if (htmlCache.size > 50) htmlCache.delete(htmlCache.keys().next().value);\n                    htmlCache.set(url, html);\n                    return _context5.a(2, html);\n                }\n              }, _callee5);\n            }));\n            return _pageHtml.apply(this, arguments);\n          }\n          function findPages(_x7) {\n            return _findPages.apply(this, arguments);\n          }\n          function _findPages() {\n            _findPages = _asyncToGenerator(_regenerator().m(function _callee7(_ref4) {\n              var _ref4$title, title, _ref4$original, original, _ref4$query, query, _ref4$year, year, serial, variants, titles, found, lastError, _iterator5, _step5, q, _iterator6, _step6, item, list, best, qs, y, seen, _t9, _t0, _t1;\n              return _regenerator().w(function (_context7) {\n                while (1) switch (_context7.p = _context7.n) {\n                  case 0:\n                    _ref4$title = _ref4.title, title = _ref4$title === void 0 ? '' : _ref4$title, _ref4$original = _ref4.original, original = _ref4$original === void 0 ? '' : _ref4$original, _ref4$query = _ref4.query, query = _ref4$query === void 0 ? '' : _ref4$query, _ref4$year = _ref4.year, year = _ref4$year === void 0 ? null : _ref4$year, serial = _ref4.serial;\n                    variants = parse.titleVariants([title, original, query]);\n                    titles = variants.match;\n                    found = new Map();\n                    lastError = null;\n                    _iterator5 = _createForOfIteratorHelper(variants.search);\n                    _context7.p = 1;\n                    _iterator5.s();\n                  case 2:\n                    if ((_step5 = _iterator5.n()).done) {\n                      _context7.n = 7;\n                      break;\n                    }\n                    q = _step5.value;\n                    _context7.p = 3;\n                    _t9 = _createForOfIteratorHelper;\n                    _context7.n = 4;\n                    return searchSite(q);\n                  case 4:\n                    _iterator6 = _t9(_context7.v);\n                    try {\n                      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {\n                        item = _step6.value;\n                        if (!found.has(item.id)) {\n                          found.set(item.id, Object.assign({}, item, {\n                            score: parse.scoreTitle(item, titles),\n                            season: seasonOf(item.title) || seasonOf(item.url),\n                            year: parse.yearOf(item)\n                          }));\n                        }\n                      }\n                    } catch (err) {\n                      _iterator6.e(err);\n                    } finally {\n                      _iterator6.f();\n                    }\n                    _context7.n = 6;\n                    break;\n                  case 5:\n                    _context7.p = 5;\n                    _t0 = _context7.v;\n                    lastError = _t0;\n                  case 6:\n                    _context7.n = 2;\n                    break;\n                  case 7:\n                    _context7.n = 9;\n                    break;\n                  case 8:\n                    _context7.p = 8;\n                    _t1 = _context7.v;\n                    _iterator5.e(_t1);\n                  case 9:\n                    _context7.p = 9;\n                    _iterator5.f();\n                    return _context7.f(9);\n                  case 10:\n                    if (!(!found.size && lastError)) {\n                      _context7.n = 11;\n                      break;\n                    }\n                    throw lastError;\n                  case 11:\n                    list = Array.from(found.values()).filter(function (p) {\n                      return p.score >= 50;\n                    });\n                    best = list.reduce(function (m, p) {\n                      return Math.max(m, p.score);\n                    }, 0);\n                    list = list.filter(function (p) {\n                      return p.score === best;\n                    });\n                    if (serial) {\n                      qs = titles.map(parse.baseTitle);\n                      list.forEach(function (p) {\n                        if (p.season) return;\n                        parse.altNames(p).some(function (n) {\n                          var m = parse.baseTitle(n).match(/^(.*\\S)\\s+(\\d{1,2})$/);\n                          if (m && qs.indexOf(m[1]) >= 0) {\n                            p.season = Number(m[2]);\n                            return true;\n                          }\n                          return false;\n                        });\n                      });\n                    }\n                    y = Number(year) || 0;\n                    if (!(y || list.length > 1)) {\n                      _context7.n = 13;\n                      break;\n                    }\n                    _context7.n = 12;\n                    return Promise.all(list.slice(0, 8).map(function () {\n                      var _ref5 = _asyncToGenerator(_regenerator().m(function _callee6(p) {\n                        var meta, _t7, _t8;\n                        return _regenerator().w(function (_context6) {\n                          while (1) switch (_context6.p = _context6.n) {\n                            case 0:\n                              _context6.p = 0;\n                              _t7 = parse;\n                              _context6.n = 1;\n                              return pageHtml(p.url);\n                            case 1:\n                              meta = _t7.pageMeta.call(_t7, _context6.v, p.url);\n                              p.type = meta.type;\n                              if (meta.year) p.year = meta.year;\n                              _context6.n = 3;\n                              break;\n                            case 2:\n                              _context6.p = 2;\n                              _t8 = _context6.v;\n                              p.type = parse.pageMeta('', p.url).type;\n                            case 3:\n                              return _context6.a(2);\n                          }\n                        }, _callee6, null, [[0, 2]]);\n                      }));\n                      return function (_x13) {\n                        return _ref5.apply(this, arguments);\n                      };\n                    }()));\n                  case 12:\n                    list.slice(8).forEach(function (p) {\n                      p.type = parse.pageMeta('', p.url).type;\n                    });\n                    list = list.filter(function (p) {\n                      if (p.type && serial !== undefined && serial !== null && p.type !== (serial ? 'serial' : 'film')) return false;\n                      if (y && p.year) {\n                        var laterSeason = serial && p.season > 1;\n                        if (laterSeason ? p.year < y - 1 : Math.abs(p.year - y) > 1) return false;\n                      }\n                      return true;\n                    });\n                  case 13:\n                    seen = {};\n                    list = list.filter(function (p) {\n                      var key = parse.baseTitle(parse.altNames(p)[0]) + '|' + (p.season || 0) + '|' + (p.year || '');\n                      if (seen[key]) return false;\n                      seen[key] = true;\n                      return true;\n                    });\n                    list.sort(function (a, b) {\n                      return (a.season || 0) - (b.season || 0) || (a.year || 0) - (b.year || 0);\n                    });\n                    return _context7.a(2, list.map(function (_ref6) {\n                      var id = _ref6.id,\n                        url = _ref6.url,\n                        t = _ref6.title,\n                        o = _ref6.original,\n                        poster = _ref6.poster,\n                        season = _ref6.season,\n                        score = _ref6.score,\n                        py = _ref6.year;\n                      return {\n                        id: id,\n                        url: url,\n                        title: t,\n                        original: o || '',\n                        poster: poster,\n                        season: season,\n                        score: score,\n                        year: py\n                      };\n                    }));\n                }\n              }, _callee7, null, [[3, 5], [1, 8, 9, 10]]);\n            }));\n            return _findPages.apply(this, arguments);\n          }\n          function stream(_x8, _x9) {\n            return _stream.apply(this, arguments);\n          }\n          function _stream() {\n            _stream = _asyncToGenerator(_regenerator().m(function _callee9(url, referer) {\n              return _regenerator().w(function (_context9) {\n                while (1) switch (_context9.n) {\n                  case 0:\n                    url = checkUrl(url, true);\n                    return _context9.a(2, cache.wrap('stream:' + url, _asyncToGenerator(_regenerator().m(function _callee8() {\n                      var html, p, s;\n                      return _regenerator().w(function (_context8) {\n                        while (1) switch (_context8.n) {\n                          case 0:\n                            _context8.n = 1;\n                            return fetchText(url, {\n                              referer: referer || host + '/'\n                            });\n                          case 1:\n                            html = _context8.v;\n                            p = parsePlayerjs(html);\n                            if (!(!p && new URL(url).hostname === new URL(host).hostname)) {\n                              _context8.n = 2;\n                              break;\n                            }\n                            return _context8.a(2, streamFromPage(url, html));\n                          case 2:\n                            if (p) {\n                              _context8.n = 3;\n                              break;\n                            }\n                            throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), {\n                              status: 404\n                            });\n                          case 3:\n                            if (!p.folders) {\n                              _context8.n = 4;\n                              break;\n                            }\n                            return _context8.a(2, {\n                              items: p.folders.map(function (f) {\n                                return {\n                                  group: f.path.filter(function (x) {\n                                    return !seasonOf(x);\n                                  }).map(function (x) {\n                                    return x.trim();\n                                  }).join(' / ') || name,\n                                  season: seasonOf(f.path.join(' ')),\n                                  title: f.title,\n                                  episode: episodeOf(f.title),\n                                  stream: toStream(f.file, f.subtitle)\n                                };\n                              }).filter(function (i) {\n                                return i.stream;\n                              })\n                            });\n                          case 4:\n                            s = toStream(p.file, p.subtitle);\n                            if (s) {\n                              _context8.n = 5;\n                              break;\n                            }\n                            throw Object.assign(new Error('порожнє посилання на відео'), {\n                              status: 404\n                            });\n                          case 5:\n                            return _context8.a(2, s);\n                        }\n                      }, _callee8);\n                    }))));\n                }\n              }, _callee9);\n            }));\n            return _stream.apply(this, arguments);\n          }\n          function streamFromPage(_x0, _x1) {\n            return _streamFromPage.apply(this, arguments);\n          }\n          function _streamFromPage() {\n            _streamFromPage = _asyncToGenerator(_regenerator().m(function _callee0(url, html) {\n              var players, errors, _iterator7, _step7, src, s, _t10, _t11;\n              return _regenerator().w(function (_context0) {\n                while (1) switch (_context0.p = _context0.n) {\n                  case 0:\n                    players = parsePlayers(html, host, anyPlayer);\n                    errors = [];\n                    _iterator7 = _createForOfIteratorHelper(players.iframes.slice(0, 6));\n                    _context0.p = 1;\n                    _iterator7.s();\n                  case 2:\n                    if ((_step7 = _iterator7.n()).done) {\n                      _context0.n = 7;\n                      break;\n                    }\n                    src = _step7.value;\n                    if (!(new URL(src).hostname === new URL(host).hostname)) {\n                      _context0.n = 3;\n                      break;\n                    }\n                    return _context0.a(3, 6);\n                  case 3:\n                    _context0.p = 3;\n                    _context0.n = 4;\n                    return stream(src, url);\n                  case 4:\n                    s = _context0.v;\n                    return _context0.a(2, s.items && s.items.length ? s.items[0].stream : s);\n                  case 5:\n                    _context0.p = 5;\n                    _t10 = _context0.v;\n                    errors.push(new URL(src).hostname + ': ' + _t10.message);\n                  case 6:\n                    _context0.n = 2;\n                    break;\n                  case 7:\n                    _context0.n = 9;\n                    break;\n                  case 8:\n                    _context0.p = 8;\n                    _t11 = _context0.v;\n                    _iterator7.e(_t11);\n                  case 9:\n                    _context0.p = 9;\n                    _iterator7.f();\n                    return _context0.f(9);\n                  case 10:\n                    if (!/пройдіть\\s+авторизацію|змініть\\s+країну/i.test(parse.stripTags(html))) {\n                      _context0.n = 11;\n                      break;\n                    }\n                    throw Object.assign(new Error(name + ': для цієї серії сайт показує лише трейлер — серії він відкриває тільки з українського IP або після входу в акаунт'), {\n                      status: 403\n                    });\n                  case 11:\n                    throw Object.assign(new Error(name + ': плеєр на сторінці серії не знайдено (' + (errors.join('; ') || 'iframe/хости: ' + (players.seen.join(', ') || 'немає')) + ')'), {\n                      status: 404\n                    });\n                  case 12:\n                    return _context0.a(2);\n                }\n              }, _callee0, null, [[3, 5], [1, 8, 9, 10]]);\n            }));\n            return _streamFromPage.apply(this, arguments);\n          }\n          function loadPage(_x10) {\n            return _loadPage.apply(this, arguments);\n          }\n          function _loadPage() {\n            _loadPage = _asyncToGenerator(_regenerator().m(function _callee10(url) {\n              return _regenerator().w(function (_context11) {\n                while (1) switch (_context11.n) {\n                  case 0:\n                    url = checkUrl(url, false);\n                    return _context11.a(2, cache.wrap('page:' + url, _asyncToGenerator(_regenerator().m(function _callee1() {\n                      var html, page, season, players, items, playlistError, userHash, ajax, text, body, data, found, episodes, _iterator8, _step8, sp, seenEp, errors, inline, st, n, _iterator9, _step9, _loop2, onlyTrailer, diag, _t13, _t14, _t15, _t16, _t17, _t18;\n                      return _regenerator().w(function (_context10) {\n                        while (1) switch (_context10.p = _context10.n) {\n                          case 0:\n                            _context10.n = 1;\n                            return pageHtml(url);\n                          case 1:\n                            html = _context10.v;\n                            page = parse.parsePage(html, url, host);\n                            season = seasonOf(page.title);\n                            players = parsePlayers(html, host, anyPlayer);\n                            items = [];\n                            playlistError = '';\n                            if (!players.playlist) {\n                              _context10.n = 5;\n                              break;\n                            }\n                            _context10.p = 2;\n                            userHash = (html.match(/dle_login_hash\\s*=\\s*['\"]([^'\"]+)['\"]/) || [])[1];\n                            ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) + '&xfield=' + encodeURIComponent(players.playlist.xfield) + (userHash ? '&user_hash=' + userHash : '') + '&time=' + Date.now();\n                            _context10.n = 3;\n                            return fetchText(ajax, {\n                              xhr: true,\n                              referer: url\n                            });\n                          case 3:\n                            text = _context10.v;\n                            body = text;\n                            try {\n                              data = JSON.parse(text);\n                              body = data && data.success !== false ? String(data.response || '') : '';\n                              if (data && data.success === false) playlistError = 'плейлист: ' + (data.message || 'відмова сайту');\n                            } catch (e) {}\n                            items = parsePlaylist(body, host).filter(function (ep) {\n                              return !/трейлер|trailer/i.test(ep.group + ' ' + ep.title);\n                            }).map(function (ep) {\n                              return {\n                                group: ep.group,\n                                season: season,\n                                title: ep.title,\n                                episode: episodeOf(ep.title),\n                                url: ep.file\n                              };\n                            });\n                            _context10.n = 5;\n                            break;\n                          case 4:\n                            _context10.p = 4;\n                            _t13 = _context10.v;\n                            if (players.iframes.length) {\n                              _context10.n = 5;\n                              break;\n                            }\n                            throw _t13;\n                          case 5:\n                            if (items.length) {\n                              _context10.n = 16;\n                              break;\n                            }\n                            found = parseEpisodeLinks(html, host, url);\n                            episodes = found.episodes;\n                            _iterator8 = _createForOfIteratorHelper(found.seasonPages.slice(0, 20));\n                            _context10.p = 6;\n                            _iterator8.s();\n                          case 7:\n                            if ((_step8 = _iterator8.n()).done) {\n                              _context10.n = 12;\n                              break;\n                            }\n                            sp = _step8.value;\n                            if (!(sp === url)) {\n                              _context10.n = 8;\n                              break;\n                            }\n                            return _context10.a(3, 11);\n                          case 8:\n                            _context10.p = 8;\n                            _t14 = episodes;\n                            _t15 = parseEpisodeLinks;\n                            _context10.n = 9;\n                            return pageHtml(sp);\n                          case 9:\n                            episodes = _t14.concat.call(_t14, _t15(_context10.v, host, url).episodes);\n                            _context10.n = 11;\n                            break;\n                          case 10:\n                            _context10.p = 10;\n                            _t16 = _context10.v;\n                          case 11:\n                            _context10.n = 7;\n                            break;\n                          case 12:\n                            _context10.n = 14;\n                            break;\n                          case 13:\n                            _context10.p = 13;\n                            _t17 = _context10.v;\n                            _iterator8.e(_t17);\n                          case 14:\n                            _context10.p = 14;\n                            _iterator8.f();\n                            return _context10.f(14);\n                          case 15:\n                            seenEp = {};\n                            episodes = episodes.filter(function (e) {\n                              return seenEp[e.url] ? false : seenEp[e.url] = true;\n                            });\n                            episodes.sort(function (a, b) {\n                              return a.season - b.season || a.episode - b.episode;\n                            });\n                            items = episodes.map(function (e) {\n                              return {\n                                group: name,\n                                season: e.season,\n                                episode: e.episode,\n                                title: 'Серія ' + e.episode + (e.label ? ' · ' + e.label : ''),\n                                url: e.url\n                              };\n                            });\n                          case 16:\n                            errors = [];\n                            if (!items.length) {\n                              inline = parsePlayerjs(html);\n                              if (inline && inline.folders) {\n                                items = inline.folders.map(function (f) {\n                                  return {\n                                    group: f.path.filter(function (x) {\n                                      return !seasonOf(x);\n                                    }).map(function (x) {\n                                      return x.trim();\n                                    }).join(' / ') || name,\n                                    season: seasonOf(f.path.join(' ')) || season,\n                                    title: f.title,\n                                    episode: episodeOf(f.title),\n                                    stream: toStream(f.file, f.subtitle)\n                                  };\n                                }).filter(function (i) {\n                                  return i.stream;\n                                });\n                              } else if (inline) {\n                                st = toStream(inline.file, inline.subtitle);\n                                if (st) items.push({\n                                  group: name,\n                                  season: season,\n                                  title: page.title,\n                                  episode: null,\n                                  stream: st\n                                });\n                              }\n                            }\n                            if (items.length) {\n                              _context10.n = 23;\n                              break;\n                            }\n                            n = 0;\n                            _iterator9 = _createForOfIteratorHelper(players.iframes.slice(0, 6));\n                            _context10.p = 17;\n                            _loop2 = _regenerator().m(function _loop2() {\n                              var src, s, group, _t12;\n                              return _regenerator().w(function (_context1) {\n                                while (1) switch (_context1.p = _context1.n) {\n                                  case 0:\n                                    src = _step9.value;\n                                    n++;\n                                    _context1.p = 1;\n                                    _context1.n = 2;\n                                    return stream(src, url);\n                                  case 2:\n                                    s = _context1.v;\n                                    group = players.iframes.length > 1 ? name + ' · плеєр ' + n : name;\n                                    if (s.items) items = items.concat(s.items.map(function (i) {\n                                      return Object.assign({}, i, {\n                                        group: i.group === name ? group : i.group,\n                                        season: i.season || season\n                                      });\n                                    }));else items.push({\n                                      group: group,\n                                      season: season,\n                                      title: page.title,\n                                      episode: null,\n                                      stream: s\n                                    });\n                                    _context1.n = 4;\n                                    break;\n                                  case 3:\n                                    _context1.p = 3;\n                                    _t12 = _context1.v;\n                                    errors.push(new URL(src).hostname + ': ' + _t12.message);\n                                  case 4:\n                                    return _context1.a(2);\n                                }\n                              }, _loop2, null, [[1, 3]]);\n                            });\n                            _iterator9.s();\n                          case 18:\n                            if ((_step9 = _iterator9.n()).done) {\n                              _context10.n = 20;\n                              break;\n                            }\n                            return _context10.d(_regeneratorValues(_loop2()), 19);\n                          case 19:\n                            _context10.n = 18;\n                            break;\n                          case 20:\n                            _context10.n = 22;\n                            break;\n                          case 21:\n                            _context10.p = 21;\n                            _t18 = _context10.v;\n                            _iterator9.e(_t18);\n                          case 22:\n                            _context10.p = 22;\n                            _iterator9.f();\n                            return _context10.f(22);\n                          case 23:\n                            if (items.length) {\n                              _context10.n = 26;\n                              break;\n                            }\n                            onlyTrailer = players.seen.length > 0 && players.seen.every(function (h) {\n                              return /youtube|youtu\\.be/i.test(h);\n                            });\n                            if (!/пройдіть\\s+авторизацію|змініть\\s+країну|увійдіть,?\\s+щоб\\s+дивитис|доступн\\w*\\s+лише\\s+(для\\s+)?зареєстрован/i.test(parse.stripTags(html))) {\n                              _context10.n = 24;\n                              break;\n                            }\n                            throw Object.assign(new Error(name + ': сайт показує лише трейлер — відео доступне тільки з українського IP або після входу в акаунт'), {\n                              status: 403\n                            });\n                          case 24:\n                            if (!(onlyTrailer || /soon-tv|скоро\\s+(на\\s+сайті|вийде)|очікуєм/i.test(html))) {\n                              _context10.n = 25;\n                              break;\n                            }\n                            throw Object.assign(new Error(name + ': на сторінці поки лише трейлер — серії з озвучкою ще не вийшли'), {\n                              status: 404\n                            });\n                          case 25:\n                            diag = [];\n                            if (playlistError) diag.push(playlistError);\n                            if (errors.length) diag.push(errors.slice(0, 3).join('; '));else if (players.iframes.length) diag.push('плеєри: ' + players.iframes.length);\n                            diag.push('iframe/хости: ' + (players.seen.length ? players.seen.slice(0, 6).join(', ') : 'немає'));\n                            if (/Playerjs/i.test(html)) diag.push('є Playerjs');\n                            throw Object.assign(new Error(name + ': відео на сторінці не знайдено (' + diag.join('; ') + ')'), {\n                              status: 404\n                            });\n                          case 26:\n                            return _context10.a(2, {\n                              url: url,\n                              title: page.title,\n                              original: page.original,\n                              year: page.year,\n                              poster: page.poster,\n                              season: season,\n                              items: items\n                            });\n                        }\n                      }, _callee1, null, [[17, 21, 22, 23], [8, 10], [6, 13, 14, 15], [2, 4]]);\n                    }))));\n                }\n              }, _callee10);\n            }));\n            return _loadPage.apply(this, arguments);\n          }\n          function route(_x11, _x12) {\n            return _route.apply(this, arguments);\n          }\n          function _route() {\n            _route = _asyncToGenerator(_regenerator().m(function _callee11(pathname, params) {\n              var serial, _t19;\n              return _regenerator().w(function (_context12) {\n                while (1) switch (_context12.n) {\n                  case 0:\n                    if (!(pathname === '/online/search')) {\n                      _context12.n = 2;\n                      break;\n                    }\n                    serial = params.get('serial');\n                    _context12.n = 1;\n                    return findPages({\n                      title: params.get('title') || '',\n                      original: params.get('original') || params.get('title_original') || '',\n                      query: params.get('query') || params.get('Query') || '',\n                      year: params.get('year') || null,\n                      serial: serial === null || serial === '' ? undefined : serial === '1' || serial === 'true'\n                    });\n                  case 1:\n                    _t19 = _context12.v;\n                    return _context12.a(2, {\n                      pages: _t19\n                    });\n                  case 2:\n                    if (!(pathname === '/online/page')) {\n                      _context12.n = 3;\n                      break;\n                    }\n                    return _context12.a(2, loadPage(params.get('url') || ''));\n                  case 3:\n                    if (!(pathname === '/online/stream')) {\n                      _context12.n = 4;\n                      break;\n                    }\n                    return _context12.a(2, stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : ''));\n                  case 4:\n                    return _context12.a(2, null);\n                }\n              }, _callee11);\n            }));\n            return _route.apply(this, arguments);\n          }\n          return {\n            findPages: findPages,\n            loadPage: loadPage,\n            stream: stream,\n            route: route\n          };\n        }\n        module.exports = {\n          parseEpisodeLinks: parseEpisodeLinks,\n          createOnline: createOnline,\n          parsePlayers: parsePlayers,\n          parsePlaylist: parsePlaylist,\n          parsePlayerjs: parsePlayerjs,\n          parseQualities: parseQualities,\n          parseSubtitles: parseSubtitles,\n          toStream: toStream,\n          seasonOf: seasonOf,\n          episodeOf: episodeOf\n        };\n      }],\n      \"lib/jackett.js\": [{}, function (module, exports, require) {\n        'use strict';\n        function toJackett(r, base) {\n          var page = r.page,\n            torrent = r.torrent,\n            meta = r.meta,\n            peers = r.peers;\n          var title = torrent.name || page.title;\n          if (page.original && title.toLowerCase().indexOf(page.original.toLowerCase()) < 0) title += ' / ' + page.original;\n          if (page.year && title.indexOf(String(page.year)) < 0) title += ' (' + page.year + ')';\n          if (torrent.label && torrent.label !== torrent.name && title.indexOf(torrent.label) < 0) title += ' [' + torrent.label + ']';\n          var serial = /сезон|season|сері[яї]|серии/i.test(torrent.name + ' ' + page.title);\n          var created = meta && meta.created ? new Date(meta.created * 1000) : null;\n          return {\n            Tracker: 'UAKino',\n            TrackerId: 'uakino',\n            TrackerType: 'public',\n            CategoryDesc: serial ? 'TV' : 'Movies',\n            Category: serial ? [5000] : [2000],\n            Title: title,\n            Guid: torrent.url,\n            Link: base + '/download?url=' + encodeURIComponent(torrent.url),\n            Details: page.url,\n            Poster: page.poster || null,\n            PublishDate: (created && !isNaN(created) ? created : new Date()).toISOString(),\n            Size: meta ? meta.size : 0,\n            Files: meta ? meta.files : null,\n            Seeders: peers ? peers.seeders : 0,\n            Peers: peers ? peers.leechers : 0,\n            InfoHash: meta ? meta.infoHash : null,\n            MagnetUri: meta ? meta.magnet : null,\n            DownloadVolumeFactor: 0,\n            UploadVolumeFactor: 1\n          };\n        }\n        module.exports = {\n          toJackett: toJackett\n        };\n      }],\n      \"lib/search.js\": [{\n        \"./parse\": \"lib/parse.js\"\n      }, function (module, exports, require) {\n        'use strict';\n        var parse = require('./parse');\n        function simplify(q) {\n          return q.split(/[:–—(]/)[0].replace(/[^0-9a-zA-ZÀ-ɏЀ-ӿ ]+/g, ' ').replace(/\\s+/g, ' ').trim();\n        }\n        function searchDle(_x14, _x15, _x16, _x17) {\n          return _searchDle.apply(this, arguments);\n        }\n        function _searchDle() {\n          _searchDle = _asyncToGenerator(_regenerator().m(function _callee12(host, query, fetchText, source) {\n            var q, queries, short, errors, ok, _i, _queries, story, attempts, _i2, _attempts, _attempts$_i, method, url, body, list, err, _t20, _t21;\n            return _regenerator().w(function (_context13) {\n              while (1) switch (_context13.p = _context13.n) {\n                case 0:\n                  source = source || {};\n                  q = String(query || '').trim();\n                  if (!(q.length < 2)) {\n                    _context13.n = 1;\n                    break;\n                  }\n                  return _context13.a(2, []);\n                case 1:\n                  queries = [q];\n                  short = simplify(q);\n                  if (short.length >= 3 && short.toLowerCase() !== q.toLowerCase()) queries.push(short);\n                  errors = [];\n                  ok = false;\n                  _i = 0, _queries = queries;\n                case 2:\n                  if (!(_i < _queries.length)) {\n                    _context13.n = 10;\n                    break;\n                  }\n                  story = _queries[_i];\n                  attempts = source.searchPath ? [['GET', host + source.searchPath + encodeURIComponent(story), null]] : [['POST', host + '/index.php?do=search', 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(story)], ['GET', host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(story), null]];\n                  _i2 = 0, _attempts = attempts;\n                case 3:\n                  if (!(_i2 < _attempts.length)) {\n                    _context13.n = 9;\n                    break;\n                  }\n                  _attempts$_i = _slicedToArray(_attempts[_i2], 3), method = _attempts$_i[0], url = _attempts$_i[1], body = _attempts$_i[2];\n                  _context13.p = 4;\n                  _t20 = parse;\n                  _context13.n = 5;\n                  return fetchText(url, method === 'POST' ? {\n                    method: method,\n                    body: body\n                  } : {});\n                case 5:\n                  list = _t20.parseList.call(_t20, _context13.v, host, source.linkRe);\n                  ok = true;\n                  if (!list.length) {\n                    _context13.n = 6;\n                    break;\n                  }\n                  return _context13.a(2, list);\n                case 6:\n                  _context13.n = 8;\n                  break;\n                case 7:\n                  _context13.p = 7;\n                  _t21 = _context13.v;\n                  errors.push(method + ': ' + _t21.message);\n                case 8:\n                  _i2++;\n                  _context13.n = 3;\n                  break;\n                case 9:\n                  _i++;\n                  _context13.n = 2;\n                  break;\n                case 10:\n                  if (ok) {\n                    _context13.n = 11;\n                    break;\n                  }\n                  err = new Error('пошук не вдався (' + errors.join('; ') + ')');\n                  err.status = 502;\n                  throw err;\n                case 11:\n                  return _context13.a(2, []);\n              }\n            }, _callee12, null, [[4, 7]]);\n          }));\n          return _searchDle.apply(this, arguments);\n        }\n        module.exports = {\n          searchDle: searchDle,\n          simplify: simplify\n        };\n      }],\n      \"lib/sources.js\": [{}, function (module, exports, require) {\n        'use strict';\n        var SOURCES = [{\n          id: 'uakino',\n          name: 'UAKino',\n          host: 'https://uakino.best',\n          torrents: true\n        }, {\n          id: 'uaserials',\n          name: 'UASerials',\n          host: 'https://uaserials.my'\n        }, {\n          id: 'uaflix',\n          name: 'UAFlix',\n          host: 'https://uafix.net',\n          linkRe: /^\\/(?!page\\/|tags\\/|xfsearch\\/|user\\/|index)[a-z-]+\\/[a-z0-9-]+\\/$/\n        }, {\n          id: 'eneyida',\n          name: 'Eneyida',\n          host: 'https://eneyida.tv'\n        }, {\n          id: 'uaserial',\n          name: 'UASerial',\n          host: 'https://uaserial.tv',\n          searchPath: '/search?query=',\n          linkRe: /^\\/(movie|serial|series|cartoon|anime|show)-[^/]+$/\n        }, {\n          id: 'anitube',\n          name: 'AniTube',\n          host: 'https://anitube.in.ua',\n          anime: true\n        }, {\n          id: 'animeua',\n          name: 'AnimeUA',\n          host: 'https://animeua.club',\n          anime: true\n        }];\n        function getSource(id) {\n          return SOURCES.filter(function (s) {\n            return s.id === id;\n          })[0] || null;\n        }\n        module.exports = {\n          SOURCES: SOURCES,\n          getSource: getSource\n        };\n      }]\n    };\n    var __cache = {};\n    function __load(id) {\n      if (__cache[id]) return __cache[id].exports;\n      var mod = __modules[id];\n      var module = __cache[id] = {\n        exports: {}\n      };\n      mod[1](module, module.exports, function (spec) {\n        if (!mod[0][spec]) throw new Error('module not bundled: ' + spec);\n        return __load(mod[0][spec]);\n      });\n      return module.exports;\n    }\n    return __load(\"lib/client.js\");\n  }();\n  (function () {\n    'use strict';\n\n    if (window.uakino_torrents_plugin) return;\n    window.uakino_torrents_plugin = true;\n    var BUILT_IN_SERVER = '__UAKINO_SERVER__';\n    if (BUILT_IN_SERVER.indexOf('__') === 0) BUILT_IN_SERVER = '';\n    var ICON = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"currentColor\" d=\"M12 2 3 6v6c0 5 3.8 9.7 9 10 5.2-.3 9-5 9-10V6l-9-4Zm0 4.2 2 4.3H10l2-4.3ZM8 12h8l-4 6-4-6Z\"/></svg>';\n    var ICON_EYE = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\"><path fill=\"currentColor\" d=\"M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z\"/></svg>';\n    var ICON_PLAY = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"currentColor\" d=\"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14.5v-9l7 4.5-7 4.5Z\"/></svg>';\n    function enc(v) {\n      return encodeURIComponent(v || '');\n    }\n    function movieInfo(movie) {\n      var date = movie.release_date || movie.first_air_date || '';\n      return {\n        title: movie.title || movie.name || '',\n        original: movie.original_title || movie.original_name || '',\n        year: String(date).slice(0, 4),\n        serial: !!(movie.name || movie.first_air_date)\n      };\n    }\n    function viewedList() {\n      var v = Lampa.Storage.get('uakino_viewed', '[]');\n      if (typeof v === 'string') {\n        try {\n          v = JSON.parse(v);\n        } catch (e) {\n          v = [];\n        }\n      }\n      return Object.prototype.toString.call(v) === '[object Array]' ? v : [];\n    }\n    function isViewed(key) {\n      return viewedList().indexOf(key) >= 0;\n    }\n    function markViewed(key) {\n      var v = viewedList();\n      if (v.indexOf(key) >= 0) return;\n      v.push(key);\n      if (v.length > 3000) v = v.slice(-3000);\n      Lampa.Storage.set('uakino_viewed', v);\n    }\n    function stopLoading() {\n      if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();\n    }\n    function describe(a) {\n      var status = a && a.status;\n      var text = a && (a.responseText || a.message || a.error);\n      if (text && typeof text === 'string') {\n        var title = text.match(/<title[^>]*>([\\s\\S]*?)<\\/title>/i);\n        text = (title ? title[1] : text).replace(/<[^>]*>/g, ' ').replace(/\\s+/g, ' ').trim().slice(0, 120);\n      } else text = '';\n      var head = status ? 'HTTP ' + status : \"немає з'єднання\";\n      if (/just a moment|attention required|cloudflare|ddos/i.test(text)) head += ' (захист Cloudflare)';\n      return head + (text ? ' «' + text + '»' : '');\n    }\n    var preferred = null;\n    var BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';\n    function proxyRequest(net, url, o, ok, fail) {\n      var target = BUILT_IN_SERVER + '/proxy?url=' + encodeURIComponent(url) + (o.referer ? '&referer=' + encodeURIComponent(o.referer) : '') + (o.xhr ? '&xhr=1' : '') + (o.cookie ? '&cookie=' + encodeURIComponent(o.cookie) : '');\n      net.silent(target, ok, fail, o.body || false, {\n        dataType: 'text'\n      });\n    }\n    function deviceFetch(url, o) {\n      o = o || {};\n      var methods = [];\n      if (typeof new Lampa.Reguest()['native'] === 'function') methods.push('native');\n      methods.push('silent');\n      if (BUILT_IN_SERVER) methods.push('proxy');\n      if (preferred && methods.indexOf(preferred) > 0) methods = [preferred].concat(methods.filter(function (m) {\n        return m !== preferred;\n      }));\n      var errors = [];\n      var lastStatus = 0;\n      return new Promise(function (resolve, reject) {\n        function attempt(i) {\n          var method = methods[i];\n          var net = new Lampa.Reguest();\n          net.timeout(20000);\n          var headers = method === 'native' ? {\n            'User-Agent': BROWSER_UA,\n            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',\n            'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',\n            Referer: o.referer || url.replace(/^(https?:\\/\\/[^/]+).*$/, '$1/')\n          } : {};\n          if (o.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';\n          if (o.cookie && method === 'native') headers.Cookie = o.cookie;\n          if (o.body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';\n          var ok = function ok(text) {\n            preferred = method;\n            resolve(typeof text === 'string' ? text : JSON.stringify(text));\n          };\n          var fail = function fail(a) {\n            errors.push((method === 'native' ? 'застосунок' : method === 'proxy' ? 'Worker' : 'WebView') + ': ' + describe(a));\n            lastStatus = a && a.status || lastStatus;\n            var next = methods[i + 1];\n            if (next && !(next === 'proxy' && lastStatus)) return attempt(i + 1);\n            var err = new Error(errors.join(', '));\n            err.status = a && a.status;\n            reject(err);\n          };\n          if (method === 'proxy') proxyRequest(net, url, o, ok, fail);else net[method](url, ok, fail, o.body || false, {\n            dataType: 'text',\n            headers: headers\n          });\n        }\n        attempt(0);\n      });\n    }\n    var SOURCES = UAKinoLib.SOURCES.filter(function (s) {\n      return s.id !== 'uakino';\n    });\n    var clients = {};\n    function sourceById(id) {\n      return SOURCES.filter(function (s) {\n        return s.id === id;\n      })[0] || SOURCES[0];\n    }\n    function hostFor(source) {\n      var key = 'uakino_host_' + source.id;\n      return String(Lampa.Storage.get(key, '') || source.host).trim().replace(/\\/+$/, '');\n    }\n    function clientFor(id) {\n      var source = sourceById(id);\n      var host = hostFor(source);\n      if (!clients[id] || clients[id].host !== host) {\n        clients[id] = UAKinoLib.createClient({\n          source: source,\n          host: host,\n          fetchText: function fetchText(url, o) {\n            var cookie = sameSite(url, host) ? cookieFor(source.id) : '';\n            return deviceFetch(url, cookie ? Object.assign({}, o, {\n              cookie: cookie\n            }) : o);\n          }\n        });\n      }\n      return clients[id];\n    }\n    function sameSite(url, host) {\n      var a = String(url).replace(/^https?:\\/\\/(www\\.)?([^/:]+).*$/, '$2');\n      var b = String(host).replace(/^https?:\\/\\/(www\\.)?([^/:]+).*$/, '$2');\n      return a === b;\n    }\n    function enabledSources() {\n      return SOURCES.filter(function (s) {\n        var v = Lampa.Storage.get('uakino_src_' + s.id, true);\n        return v !== false && v !== 'false';\n      });\n    }\n    function promised(promise, ok, fail) {\n      promise.then(ok, function (e) {\n        fail(e && e.message || String(e));\n      });\n    }\n    var ACCOUNTS = [{\n      id: 'uaflix',\n      name: 'UAFlix',\n      descr: 'Потрібно, якщо серії UAFlix не відкриваються («лише трейлер») — напр., на LG через Media Station X'\n    }, {\n      id: 'toloka',\n      name: 'Толока',\n      descr: 'Роздачі Толоки в «Торенти (UA)»'\n    }];\n    function cookieFor(id) {\n      return String(Lampa.Storage.get('uakino_cookie_' + id, '') || '');\n    }\n    function withLoginHint(err, sourceId) {\n      err = String(err || '');\n      if (sourceId !== 'uaflix' || !/лише трейлер/.test(err)) return err;\n      if (!hasCredentials('uaflix')) return err + '. Через Media Station X (LG) сайт бачить не ваш IP — увійдіть в акаунт UAFlix: Налаштування → UAKino';\n      if (cookieFor('uaflix')) {\n        Lampa.Storage.set('uakino_cookie_uaflix', '');\n        return err + '. Вхід застарів — відкрийте ще раз, плагін увійде заново';\n      }\n      return err;\n    }\n    function hasCredentials(id) {\n      return !!(Lampa.Storage.get('uakino_login_' + id, '') && Lampa.Storage.get('uakino_pass_' + id, ''));\n    }\n    function doLogin(id, done) {\n      var login = Lampa.Storage.get('uakino_login_' + id, '');\n      var password = Lampa.Storage.get('uakino_pass_' + id, '');\n      if (!login || !password) return done(false, 'вкажіть логін і пароль');\n      if (!BUILT_IN_SERVER) return done(false, 'встановіть плагін з адреси Worker (…workers.dev/uakino.js)');\n      var net = new Lampa.Reguest();\n      net.timeout(30000);\n      net.silent(BUILT_IN_SERVER + '/login', function (json) {\n        if (json && json.ok) {\n          Lampa.Storage.set('uakino_cookie_' + id, json.cookie);\n          done(true);\n        } else {\n          Lampa.Storage.set('uakino_cookie_' + id, '');\n          done(false, json && json.error || 'помилка входу');\n        }\n      }, function (a, c) {\n        done(false, net.errorDecode ? net.errorDecode(a, c) : \"немає з'єднання з Worker\");\n      }, {\n        site: id,\n        login: login,\n        password: password\n      });\n    }\n    function accountStatus(account) {\n      var login = Lampa.Storage.get('uakino_login_' + account.id, '');\n      return cookieFor(account.id) ? 'Вхід виконано' + (login ? ' (' + login + ')' : '') : 'Вхід не виконано';\n    }\n    function refreshAccountUI(account) {\n      var logged = !!cookieFor(account.id);\n      var enter = $('.settings-param[data-name=\"uakino_enter_' + account.id + '\"]');\n      enter.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');\n      enter.find('.settings-param__descr').text(accountStatus(account));\n      $('.settings-param[data-name=\"uakino_pass_' + account.id + '\"]').toggleClass('hide', logged);\n    }\n    function loginWithNotice(account) {\n      Lampa.Noty.show(account.name + ': вхід…');\n      doLogin(account.id, function (ok, err) {\n        Lampa.Noty.show(account.name + ': ' + (ok ? 'вхід виконано' : err));\n        refreshAccountUI(account);\n      });\n    }\n    function logout(account) {\n      Lampa.Storage.set('uakino_cookie_' + account.id, '');\n      Lampa.Storage.set('uakino_pass_' + account.id, '');\n      $('.settings-param[data-name=\"uakino_pass_' + account.id + '\"] .settings-param__value').text('');\n      Lampa.Noty.show(account.name + ': вихід виконано');\n      refreshAccountUI(account);\n    }\n    function ensureLogins(done) {\n      var todo = ACCOUNTS.filter(function (a) {\n        return hasCredentials(a.id) && !cookieFor(a.id);\n      });\n      var left = todo.length;\n      if (!left) return done();\n      todo.forEach(function (a) {\n        doLogin(a.id, function () {\n          if (! --left) done();\n        });\n      });\n    }\n    var Api = {\n      search: function search(m, ok, fail) {\n        var self = this;\n        if (!m.loginChecked) {\n          m.loginChecked = true;\n          return ensureLogins(function () {\n            self.search(m, ok, fail);\n          });\n        }\n        var list = enabledSources();\n        if (!list.length) return fail('усі сайти вимкнено в налаштуваннях');\n        Promise.all(list.map(function (source) {\n          return clientFor(source.id).online.findPages({\n            title: m.title,\n            original: m.original,\n            year: m.year,\n            serial: m.serial\n          }).then(function (pages) {\n            return {\n              source: source,\n              pages: pages\n            };\n          }, function (e) {\n            return {\n              source: source,\n              pages: [],\n              error: e && e.message || String(e)\n            };\n          });\n        })).then(function (results) {\n          var pages = [];\n          var problems = [];\n          results.forEach(function (r) {\n            r.pages.forEach(function (p) {\n              p.source = r.source.id;\n              pages.push(p);\n            });\n            problems.push(r.source.name + ': ' + (r.error || (r.pages.length ? r.pages.length + ' знайдено' : 'нічого не знайдено')));\n          });\n          var exact = pages.some(function (p) {\n            return p.score >= 100;\n          });\n          if (exact) pages = pages.filter(function (p) {\n            return p.score >= 100;\n          });\n          if (pages.length) ok(pages);else fail('нічого не знайдено. ' + problems.join(' | '));\n        });\n      },\n      page: function page(p, ok, fail) {\n        promised(clientFor(p.source).online.loadPage(p.url), ok, fail);\n      },\n      stream: function stream(sourceId, url, referer, ok, fail) {\n        promised(clientFor(sourceId).online.stream(url, referer), ok, fail);\n      }\n    };\n    function tmdbImage(path, size) {\n      if (!path || !Lampa.TMDB || !Lampa.TMDB.image) return '';\n      return Lampa.TMDB.image('t/p/' + size + path);\n    }\n    var tmdbSeasons = {};\n    function tmdbSeasonFor(movieId, season, done) {\n      var key = movieId + ':' + season;\n      if (tmdbSeasons[key] !== undefined) return done(tmdbSeasons[key]);\n      var lang = Lampa.Storage.get('language', 'uk') || 'uk';\n      var net = new Lampa.Reguest();\n      net.timeout(10000);\n      net.silent(Lampa.TMDB.api('tv/' + movieId + '/season/' + season + '?api_key=' + Lampa.TMDB.key() + '&language=' + lang), function (json) {\n        var map = {};\n        (json && json.episodes || []).forEach(function (e) {\n          map[e.episode_number] = e;\n        });\n        tmdbSeasons[key] = map;\n        done(map);\n      }, function () {\n        tmdbSeasons[key] = null;\n        done(null);\n      });\n    }\n    function standardQuality(width, height) {\n      if (width) {\n        if (width >= 3200) return 2160;\n        if (width >= 2200) return 1440;\n        if (width >= 1700) return 1080;\n        if (width >= 1100) return 720;\n        if (width >= 800) return 480;\n        return 360;\n      }\n      if (!height) return 0;\n      if (height >= 1800) return 2160;\n      if (height >= 1300) return 1440;\n      if (height >= 900) return 1080;\n      if (height >= 650) return 720;\n      if (height >= 420) return 480;\n      return 360;\n    }\n    function streamQuality(stream, done) {\n      var best = 0;\n      if (stream && stream.quality) {\n        Object.keys(stream.quality).forEach(function (k) {\n          var q = /4k|uhd/i.test(k) ? 2160 : standardQuality(0, parseInt(k, 10) || 0);\n          best = Math.max(best, q);\n        });\n      }\n      if (best || !stream || !stream.url || !/\\.m3u8(\\?|$)/i.test(stream.url)) return done(best);\n      deviceFetch(stream.url, {}).then(function (text) {\n        var re = /RESOLUTION=(\\d+)x(\\d+)/gi;\n        var m;\n        while (m = re.exec(text)) best = Math.max(best, standardQuality(parseInt(m[1], 10) || 0, parseInt(m[2], 10) || 0));\n        done(best);\n      }, function () {\n        done(0);\n      });\n    }\n    function qualityName(q) {\n      return q >= 2160 ? '4K' : q + 'p';\n    }\n    function qualityBadge(q) {\n      return q >= 2160 ? '4K' : q >= 1080 ? 'HD ' + q + 'p' : q + 'p';\n    }\n    function OnlineComponent(object) {\n      var scroll = new Lampa.Scroll({\n        mask: true,\n        over: true,\n        step: 250\n      });\n      var html = $('<div class=\"uakino-online\"></div>');\n      var body = $('<div class=\"uakino-online__body\"></div>');\n      var movie = object.movie || {};\n      var info = movieInfo(movie);\n      var self = this;\n      var destroyed = false;\n      var last = null;\n      var storeKey = 'uakino_choice_' + (movie.id || info.original || info.title);\n      var sources = [];\n      var cur = {\n        source: 0,\n        tab: 0,\n        voice: 0\n      };\n      var data = null;\n      var pageError = '';\n      var keepFocus = '';\n      var voiceRestored = false;\n      var upTargets = {\n        tab: null,\n        filter: null,\n        range: null\n      };\n      var EPISODES_PAGE = 50;\n      var range = -1;\n      var jumpTo = null;\n      function alive(fn) {\n        return function (v) {\n          if (!destroyed) fn(v);\n        };\n      }\n      function choice() {\n        var c = Lampa.Storage.get(storeKey, '{}');\n        if (typeof c === 'string') {\n          try {\n            c = JSON.parse(c);\n          } catch (e) {\n            c = {};\n          }\n        }\n        return c || {};\n      }\n      function saveChoice(extra) {\n        var c = choice();\n        var src = sources[cur.source];\n        c.source = src ? src.id : c.source;\n        c.tab = cur.tab;\n        c.voice = currentVoices()[cur.voice] || c.voice || '';\n        if (extra) Object.keys(extra).forEach(function (k) {\n          c[k] = extra[k];\n        });\n        Lampa.Storage.set(storeKey, c);\n      }\n      function message(text) {\n        body.empty();\n        var row = $('<div class=\"uakino-online__filters\"></div>');\n        row.append(button(TORRENTS_LABEL, '', function () {\n          openTorrents(movie);\n        }));\n        body.append(row);\n        body.append($('<div class=\"uakino-online__empty\"></div>').text(text));\n        self.activity.loader(false);\n        self.activity.toggle();\n      }\n      this.create = function () {\n        scroll.minus();\n        scroll.append(body);\n        html.append(scroll.render());\n        scroll.onWheel = function (step) {\n          Navigator.move(step > 0 ? 'down' : 'up');\n        };\n        this.activity.loader(true);\n        Api.search(info, alive(function (pages) {\n          var byId = {};\n          (pages || []).forEach(function (p) {\n            if (!byId[p.source]) {\n              byId[p.source] = {\n                id: p.source,\n                name: sourceById(p.source).name,\n                pages: [],\n                loaded: {},\n                quality: null\n              };\n              sources.push(byId[p.source]);\n            }\n            byId[p.source].pages.push(p);\n          });\n          if (!sources.length) return message('Нічого не знайдено');\n          pickDefault();\n        }), alive(function (err) {\n          message('UAKino: ' + err);\n        }));\n        return this.render();\n      };\n      function pickDefault() {\n        var saved = choice();\n        var savedIndex = -1;\n        sources.forEach(function (s, i) {\n          if (s.id === saved.source && saved.manual) savedIndex = i;\n        });\n        if (savedIndex >= 0 || sources.length === 1) {\n          cur.source = Math.max(0, savedIndex);\n          cur.tab = savedIndex >= 0 && saved.tab < tabsOf(sources[cur.source]).length ? saved.tab : 0;\n          loadCurrent();\n          sources.forEach(function (s) {\n            probeSource(s, refreshQuality);\n          });\n          return;\n        }\n        var left = sources.length;\n        var finished = false;\n        var finish = function finish() {\n          if (finished || destroyed) return;\n          finished = true;\n          var best = 0;\n          sources.forEach(function (s, i) {\n            if ((s.quality || 0) > (sources[best].quality || 0)) best = i;\n          });\n          cur.source = best;\n          cur.tab = 0;\n          loadCurrent();\n        };\n        setTimeout(finish, 15000);\n        sources.forEach(function (s) {\n          probeSource(s, function () {\n            left--;\n            if (!left) finish();\n          });\n        });\n      }\n      function refreshQuality() {\n        if (destroyed || !sources[cur.source]) return;\n        var src = sources[cur.source];\n        if (upTargets.filter) $(upTargets.filter).text('Джерело: ' + sourceLabel(src));\n        if (src.quality > 0) {\n          var sub = body.find('.uakino-online__head-sub');\n          var badge = sub.find('.uakino-online__badge');\n          if (!badge.length) {\n            badge = $('<span class=\"uakino-online__badge\"></span>');\n            sub.append(badge);\n          }\n          badge.text(qualityBadge(src.quality));\n        }\n      }\n      function probeSource(source, done) {\n        if (source.quality !== null && source.quality !== undefined) return done();\n        var page = source.pages[0];\n        Api.page(page, function (json) {\n          source.loaded[page.url] = json;\n          var first = (json.items || [])[0];\n          if (!first) return done();\n          resolve(source.id, json, first, function (stream) {\n            streamQuality(stream, function (q) {\n              source.quality = q;\n              done();\n            });\n          }, function () {\n            done();\n          });\n        }, function () {\n          source.quality = -1;\n          done();\n        });\n      }\n      function tabsOf(source) {\n        var tabs = [];\n        var seen = {};\n        function add(season, page, label) {\n          var key = season ? 's' + season : 'p' + page;\n          if (seen[key]) return;\n          seen[key] = true;\n          tabs.push({\n            page: page,\n            season: season || null,\n            label: label\n          });\n        }\n        source.pages.forEach(function (p, pi) {\n          var d = source.loaded[p.url];\n          if (d) {\n            var seasons = [];\n            (d.items || []).forEach(function (it) {\n              var s = it.season || d.season || p.season || 0;\n              if (seasons.indexOf(s) < 0) seasons.push(s);\n            });\n            if (seasons.length && seasons.some(function (s) {\n              return s;\n            })) {\n              seasons.forEach(function (s) {\n                add(s, pi, s ? 'Сезон ' + s : 'Інше');\n              });\n            } else {\n              add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');\n            }\n          } else if (p.season) {\n            add(p.season, pi, 'Сезон ' + p.season);\n          } else {\n            add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');\n          }\n        });\n        tabs.sort(function (a, b) {\n          return (a.season || 0) - (b.season || 0) || a.page - b.page;\n        });\n        return tabs;\n      }\n      function preloadPages(source, done) {\n        if (source.pages.length < 2) return done();\n        var todo = source.pages.filter(function (p) {\n          return !p.season && !source.loaded[p.url];\n        });\n        var left = todo.length;\n        if (!left) return done();\n        todo.forEach(function (p) {\n          Api.page(p, alive(function (json) {\n            source.loaded[p.url] = json || {\n              items: []\n            };\n            if (! --left) done();\n          }), alive(function () {\n            source.loaded[p.url] = {\n              items: []\n            };\n            if (! --left) done();\n          }));\n        });\n      }\n      function loadCurrent() {\n        var source = sources[cur.source];\n        if (!source.preloaded) {\n          self.activity.loader(true);\n          return preloadPages(source, function () {\n            source.preloaded = true;\n            loadCurrent();\n          });\n        }\n        var tab = tabsOf(source)[cur.tab] || tabsOf(source)[0];\n        var page = source.pages[tab.page];\n        pageError = '';\n        if (source.loaded[page.url]) {\n          data = source.loaded[page.url];\n          return build();\n        }\n        self.activity.loader(true);\n        Api.page(page, alive(function (json) {\n          source.loaded[page.url] = json || {\n            items: []\n          };\n          data = source.loaded[page.url];\n          var tabs = tabsOf(source);\n          for (var i = 0; i < tabs.length; i++) {\n            if (tab.season && tabs[i].season === tab.season || !tab.season && tabs[i].page === tab.page) {\n              cur.tab = i;\n              break;\n            }\n          }\n          build();\n        }), alive(function (err) {\n          data = null;\n          pageError = withLoginHint(err, source.id);\n          build();\n        }));\n      }\n      function currentTab() {\n        var tabs = tabsOf(sources[cur.source]);\n        return tabs[cur.tab] || tabs[0];\n      }\n      function seasonOfItem(it, tab) {\n        var p = sources[cur.source].pages[tab.page] || {};\n        return it.season || data && data.season || p.season || 0;\n      }\n      function tabItems() {\n        var tab = currentTab();\n        return (data && data.items || []).filter(function (it) {\n          return tab.season === null || seasonOfItem(it, tab) === tab.season;\n        });\n      }\n      function currentVoices() {\n        var voices = [];\n        tabItems().forEach(function (it) {\n          if (voices.indexOf(it.group) < 0) voices.push(it.group);\n        });\n        return voices;\n      }\n      function currentItems() {\n        var voice = currentVoices()[cur.voice];\n        return tabItems().filter(function (it) {\n          return it.group === voice;\n        });\n      }\n      function sourceLabel(s) {\n        return s.name + (s.quality > 0 ? ' · ' + qualityName(s.quality) : '');\n      }\n      function focusable(el) {\n        el.on('hover:focus', function (e) {\n          last = e.target;\n          scroll.update($(e.target), true);\n        });\n        return el;\n      }\n      function button(label, value, onEnter, active) {\n        var btn = $('<div class=\"uakino-online__filter selector\"></div>');\n        btn.text(label + (value ? ' ' + value : ''));\n        if (active) btn.addClass('uakino-online__filter--active');\n        btn.on('hover:enter', onEnter);\n        return focusable(btn);\n      }\n      function select(title, list, current, _onSelect, subtitles) {\n        Lampa.Select.show({\n          title: title,\n          items: list.map(function (name, i) {\n            return {\n              title: name,\n              subtitle: subtitles ? subtitles[i] : '',\n              selected: i === current,\n              index: i\n            };\n          }),\n          onSelect: function onSelect(a) {\n            Lampa.Controller.toggle('content');\n            _onSelect(a.index);\n          },\n          onBack: function onBack() {\n            Lampa.Controller.toggle('content');\n          }\n        });\n      }\n      function hashFor(item) {\n        if (!Lampa.Utils || !Lampa.Utils.hash) return '';\n        var base = info.original || info.title;\n        if (item.episode != null && (item.season || data.season || info.serial)) {\n          var season = item.season || data.season || 1;\n          return Lampa.Utils.hash([season, season > 10 ? ':' : '', item.episode, base].join(''));\n        }\n        return Lampa.Utils.hash(base);\n      }\n      function tmdbSeason(season, done) {\n        tmdbSeasonFor(movie.id, season, done);\n      }\n      function viewKey(item) {\n        return String(hashFor(item) || [info.original || info.title, item.season || 0, item.episode || 0].join(':'));\n      }\n      function showViewed(el) {\n        if (el.find('.uakino-online__viewed').length) return;\n        el.addClass('uakino-online__item--viewed');\n        var box = el.find('.uakino-online__thumb');\n        (box.length ? box : el).append($('<div class=\"uakino-online__viewed\">' + ICON_EYE + '</div>'));\n      }\n      function decorateEpisodes(list) {\n        if (!info.serial || !movie.id || !Lampa.TMDB || !Lampa.TMDB.api || !Lampa.TMDB.key) return;\n        var cards = list.find('.uakino-online__item');\n        var seasons = {};\n        cards.each(function () {\n          var it = $(this).data('item');\n          var season = it && (it.season || data && data.season || 1);\n          if (it && it.episode) seasons[season] = true;\n        });\n        Object.keys(seasons).forEach(function (season) {\n          tmdbSeason(season, function (episodes) {\n            if (destroyed || !episodes) return;\n            cards.each(function () {\n              var el = $(this);\n              var it = el.data('item');\n              if (!it || !it.episode || String(it.season || data && data.season || 1) !== String(season)) return;\n              var ep = episodes[it.episode];\n              if (!ep) return;\n              var still = tmdbImage(ep.still_path, 'w300');\n              if (still) el.find('.uakino-online__thumb').css('background-image', 'url(\"' + still + '\")').removeClass('uakino-online__thumb--fallback');\n              if (ep.name && !/^(серія|епізод|episode)\\s*\\d+$/i.test(ep.name)) el.find('.uakino-online__title').text(it.episode + '. ' + ep.name);\n              if (ep.runtime) {\n                var infoEl = el.find('.uakino-online__info');\n                infoEl.text(infoEl.text() + ' • ' + ep.runtime + ' хв');\n              }\n            });\n          });\n        });\n      }\n      function timeline(item) {\n        try {\n          var hash = hashFor(item);\n          return hash && Lampa.Timeline ? Lampa.Timeline.view(hash) : null;\n        } catch (e) {\n          return null;\n        }\n      }\n      function build() {\n        body.empty();\n        last = null;\n        var voices = currentVoices();\n        if (!voiceRestored && voices.length) {\n          voiceRestored = true;\n          var savedVoice = voices.indexOf(choice().voice);\n          if (savedVoice >= 0) cur.voice = savedVoice;\n        }\n        if (cur.voice >= voices.length) cur.voice = 0;\n        var src = sources[cur.source];\n        var shown = src.pages[currentTab().page] || src.pages[0];\n        var head = $('<div class=\"uakino-online__head\"><div class=\"uakino-online__hero-bg\"></div><div class=\"uakino-online__hero-shade\"></div>' + '<div class=\"uakino-online__head-text\"><div class=\"uakino-online__head-title\"></div><div class=\"uakino-online__head-sub\"></div><div class=\"uakino-online__head-descr\"></div></div></div>');\n        var poster = data && data.poster || shown.poster || src.pages[0].poster;\n        var backdrop = tmdbImage(movie.backdrop_path, 'w1280') || tmdbImage(movie.poster_path, 'w780') || poster;\n        if (backdrop) head.find('.uakino-online__hero-bg').css('background-image', 'url(\"' + backdrop + '\")');\n        if (poster) head.find('.uakino-online__head-text').before($('<img class=\"uakino-online__poster\">').attr('src', poster));\n        var names = String(shown.title || data && data.title || '').split(/\\s+\\/\\s+/);\n        [shown.original, data && data.original].forEach(function (o) {\n          if (o && names.indexOf(o) < 0) names.push(o);\n        });\n        head.find('.uakino-online__head-title').text(names[0] || '');\n        var sub = names.slice(1, 3);\n        var year = data && data.year || shown.year;\n        if (year) sub.push(year);\n        sub.push(src.name);\n        head.find('.uakino-online__head-sub').text(sub.join(' · '));\n        if (src.quality > 0) head.find('.uakino-online__head-sub').append($('<span class=\"uakino-online__badge\"></span>').text(qualityBadge(src.quality)));\n        if (movie.overview) head.find('.uakino-online__head-descr').text(movie.overview);\n        body.append(head);\n        var filters = $('<div class=\"uakino-online__filters\"></div>');\n        var sourceBtn, voiceBtn, tabBtn;\n        filters.append(sourceBtn = button('Джерело:', sourceLabel(sources[cur.source]), function () {\n          select('Джерело', sources.map(sourceLabel).concat([TORRENTS_LABEL]), cur.source, function (i) {\n            if (i === sources.length) return openTorrents(movie);\n            cur.source = i;\n            cur.tab = 0;\n            cur.voice = 0;\n            range = -1;\n            keepFocus = 'source';\n            saveChoice({\n              manual: true\n            });\n            loadCurrent();\n          }, sources.map(function (s) {\n            return s.pages[0].title;\n          }).concat(['Ваш парсер і TorrServer, лише з українською доріжкою']));\n        }));\n        if (voices.length > 1) {\n          filters.append(voiceBtn = button('Озвучка:', voices[cur.voice], function () {\n            select('Озвучка', voices, cur.voice, function (i) {\n              cur.voice = i;\n              range = -1;\n              keepFocus = 'voice';\n              saveChoice();\n              build();\n            });\n          }));\n        }\n        body.append(filters);\n        var tabs = tabsOf(sources[cur.source]);\n        if (tabs.length > 1) {\n          var row = $('<div class=\"uakino-online__tabs\"></div>');\n          tabs.forEach(function (tab, i) {\n            var tb = button(tab.label, '', function () {\n              if (i === cur.tab) return;\n              cur.tab = i;\n              cur.voice = Math.max(0, currentVoicesFor(i).indexOf(voices[cur.voice]));\n              range = -1;\n              keepFocus = 'tab';\n              saveChoice();\n              loadCurrent();\n            }, i === cur.tab);\n            if (i === cur.tab) tabBtn = tb;\n            row.append(tb);\n          });\n          body.append(row);\n        }\n        var all = pageError ? [] : currentItems();\n        if (pageError) {\n          body.append($('<div class=\"uakino-online__empty\"></div>').text(pageError + '. Виберіть інше джерело.'));\n        } else if (!all.length) {\n          body.append($('<div class=\"uakino-online__empty\"></div>').text('На цій сторінці немає відео. Виберіть інше джерело.'));\n        }\n        var lastKey = choice().last;\n        var lastIndex = -1;\n        all.forEach(function (it, i) {\n          if (viewKey(it) === lastKey) lastIndex = i;\n        });\n        var rangesCount = Math.ceil(all.length / EPISODES_PAGE);\n        if (jumpTo !== null) range = Math.floor(jumpTo / EPISODES_PAGE);else if (range < 0) range = lastIndex >= 0 ? Math.floor(lastIndex / EPISODES_PAGE) : 0;\n        if (range >= rangesCount) range = 0;\n        var startIndex = range * EPISODES_PAGE;\n        var items = all.slice(startIndex, startIndex + EPISODES_PAGE);\n        var rangeBtn = null;\n        if (rangesCount > 1) {\n          var numberOf = function numberOf(it, i) {\n            return it.episode || i + 1;\n          };\n          var ranges = $('<div class=\"uakino-online__tabs uakino-online__ranges\"></div>');\n          for (var r = 0; r < rangesCount; r++) {\n            (function (r) {\n              var a = r * EPISODES_PAGE;\n              var b = Math.min(all.length, a + EPISODES_PAGE) - 1;\n              var rb = button(numberOf(all[a], a) + '–' + numberOf(all[b], b), '', function () {\n                if (r === range) return;\n                range = r;\n                keepFocus = 'range';\n                build();\n              }, r === range);\n              if (r === range) rangeBtn = rb;\n              ranges.append(rb);\n            })(r);\n          }\n          filters.append(button('Серія №', '', function () {\n            if (!Lampa.Input || !Lampa.Input.edit) return;\n            Lampa.Input.edit({\n              title: 'Номер серії',\n              value: '',\n              free: true,\n              nosave: true\n            }, function (value) {\n              var n = parseInt(value, 10);\n              if (!n) return;\n              var idx = -1;\n              for (var i = 0; i < all.length; i++) {\n                if (all[i].episode === n) {\n                  idx = i;\n                  break;\n                }\n              }\n              if (idx < 0 && n <= all.length) idx = n - 1;\n              if (idx < 0) return Lampa.Noty.show('Серії ' + n + ' тут немає');\n              jumpTo = idx;\n              build();\n            });\n          }));\n          body.append(ranges);\n        }\n        var list = $('<div class=\"uakino-online__list' + (items.length === 1 ? ' uakino-online__list--single' : '') + '\"></div>');\n        var lastWatched = null;\n        var jumpEl = null;\n        items.forEach(function (item, i) {\n          var index = startIndex + i;\n          var el = $('<div class=\"uakino-online__item selector\">' + '<div class=\"uakino-online__thumb\"><div class=\"uakino-online__thumb-shade\"></div><div class=\"uakino-online__num\"></div><div class=\"uakino-online__timeline\"></div></div>' + '<div class=\"uakino-online__title\"></div><div class=\"uakino-online__info\"></div></div>');\n          if (backdrop) el.find('.uakino-online__thumb').css('background-image', 'url(\"' + backdrop + '\")').addClass('uakino-online__thumb--fallback');\n          if (item.episode) el.find('.uakino-online__num').text(item.episode);\n          el.find('.uakino-online__title').text(item.title || data.title);\n          var meta = [];\n          if (item.season || data.season) meta.push('Сезон ' + (item.season || data.season));\n          if (item.group) meta.push(item.group);\n          el.find('.uakino-online__info').text(meta.join(' • '));\n          el.data('item', item);\n          var view = timeline(item);\n          if (view && Lampa.Timeline.render) el.find('.uakino-online__timeline').append(Lampa.Timeline.render(view));\n          var key = viewKey(item);\n          if (isViewed(key) || view && view.percent >= 85) showViewed(el);\n          if (key === lastKey) lastWatched = el[0];\n          if (jumpTo === index) jumpEl = el[0];\n          el.on('hover:enter', function () {\n            play(all, index, el);\n          });\n          list.append(focusable(el));\n        });\n        body.append(list);\n        decorateEpisodes(list);\n        if (lastWatched && !keepFocus) last = lastWatched;\n        if (jumpEl) last = jumpEl;\n        jumpTo = null;\n        upTargets.range = rangeBtn ? rangeBtn[0] : null;\n        upTargets.tab = tabBtn ? tabBtn[0] : null;\n        upTargets.filter = sourceBtn ? sourceBtn[0] : null;\n        var keep = keepFocus === 'tab' ? tabBtn : keepFocus === 'voice' ? voiceBtn : keepFocus === 'source' ? sourceBtn : keepFocus === 'range' ? rangeBtn : null;\n        if (keep) last = keep[0];\n        keepFocus = '';\n        self.activity.loader(false);\n        self.activity.toggle();\n      }\n      function currentVoicesFor(tabIndex) {\n        var tab = tabsOf(sources[cur.source])[tabIndex];\n        var voices = [];\n        (data && data.items || []).forEach(function (it) {\n          if (tab && tab.season !== null && seasonOfItem(it, tab) !== tab.season) return;\n          if (voices.indexOf(it.group) < 0) voices.push(it.group);\n        });\n        return voices;\n      }\n      function resolve(sourceId, page, item, ok, fail) {\n        if (item.stream) return ok(item.stream);\n        Api.stream(sourceId, item.url, page.url, function (json) {\n          var s = json && json.items && json.items.length ? json.items[0].stream : json;\n          if (!s || !s.url) return fail('посилання на відео не знайдено');\n          item.stream = s;\n          ok(s);\n        }, fail);\n      }\n      function playerItem(item, stream) {\n        var p = {\n          title: item.title || data.title,\n          url: stream.url\n        };\n        if (stream.quality) p.quality = stream.quality;\n        if (stream.subtitles && stream.subtitles.length) p.subtitles = stream.subtitles;\n        var view = timeline(item);\n        if (view) p.timeline = view;\n        return p;\n      }\n      function play(items, index, el) {\n        var item = items[index];\n        markViewed(viewKey(item));\n        saveChoice({\n          last: viewKey(item),\n          manual: true\n        });\n        if (el) showViewed(el);\n        var sourceId = sources[cur.source].id;\n        var page = data;\n        if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start(function () {\n          stopLoading();\n        });\n        resolve(sourceId, page, item, function (stream) {\n          stopLoading();\n          var first = playerItem(item, stream);\n          var playlist = items.map(function (it, i) {\n            if (i === index) return first;\n            if (it.stream) return playerItem(it, it.stream);\n            var cell = {\n              title: it.title || page.title\n            };\n            cell.url = function (call) {\n              resolve(sourceId, page, it, function (s) {\n                markViewed(viewKey(it));\n                saveChoice({\n                  last: viewKey(it)\n                });\n                var p = playerItem(it, s);\n                cell.url = p.url;\n                cell.quality = p.quality;\n                cell.subtitles = p.subtitles;\n                cell.timeline = p.timeline;\n                call();\n              }, function (err) {\n                cell.url = '';\n                Lampa.Noty.show('UAKino: ' + err);\n                call();\n              });\n            };\n            return cell;\n          });\n          Lampa.Player.play(first);\n          Lampa.Player.playlist(playlist);\n        }, function (err) {\n          stopLoading();\n          Lampa.Noty.show('UAKino: ' + withLoginHint(err, sourceId));\n        });\n      }\n      this.start = function () {\n        if (Lampa.Activity.active && Lampa.Activity.active().activity !== this.activity) return;\n        Lampa.Controller.add('content', {\n          link: this,\n          toggle: function toggle() {\n            Lampa.Controller.collectionSet(scroll.render());\n            Lampa.Controller.collectionFocus(last || false, scroll.render());\n          },\n          up: function up() {\n            if (Navigator.canmove('up')) return Navigator.move('up');\n            var inList = last && $(last).closest('.uakino-online__list').length;\n            var inRanges = last && $(last).closest('.uakino-online__ranges').length;\n            var inTabs = last && $(last).closest('.uakino-online__tabs').length;\n            var target = inList ? upTargets.range || upTargets.tab || upTargets.filter : inRanges ? upTargets.tab || upTargets.filter : inTabs ? upTargets.filter : null;\n            if (target) {\n              last = target;\n              Lampa.Controller.collectionFocus(target, scroll.render());\n            } else Lampa.Controller.toggle('head');\n          },\n          down: function down() {\n            if (Navigator.canmove('down')) Navigator.move('down');\n          },\n          left: function left() {\n            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');\n          },\n          right: function right() {\n            if (Navigator.canmove('right')) Navigator.move('right');\n          },\n          back: function back() {\n            Lampa.Activity.backward();\n          }\n        });\n        Lampa.Controller.toggle('content');\n      };\n      this.render = function () {\n        return html;\n      };\n      this.pause = function () {};\n      this.stop = function () {};\n      this.destroy = function () {\n        destroyed = true;\n        scroll.destroy();\n        html.remove();\n      };\n    }\n    var TORRENTS_LABEL = 'Торенти (UA)';\n    var UA_LATIN = /(^|[^a-z0-9])(ukr|ua|ukrainian)([^a-z0-9]|$)/i;\n    var UA_CYRILLIC = /укр|україн/i;\n    var UA_TRACKERS = /toloka|hurtom/i;\n    function isUkrainian(r) {\n      var text = String(r && r.Title || '');\n      return UA_LATIN.test(text) || UA_CYRILLIC.test(text) || UA_TRACKERS.test(String(r && r.Tracker || ''));\n    }\n    function prepareTorrent(r) {\n      if (Lampa.Utils) {\n        if (Lampa.Utils.bytesToSize && r.Size) r.size = Lampa.Utils.bytesToSize(r.Size);\n        if (Lampa.Utils.hash) r.hash = Lampa.Utils.hash(r.Title);\n        if (Lampa.Utils.strToTime && r.PublishDate) r.PublisTime = Lampa.Utils.strToTime(r.PublishDate);\n      }\n      return r;\n    }\n    function tolokaSearch(params, done) {\n      var cookie = cookieFor('toloka');\n      if (!cookie || !BUILT_IN_SERVER) return done([], '');\n      var net = new Lampa.Reguest();\n      net.timeout(30000);\n      net.silent(BUILT_IN_SERVER + '/toloka/search?q=' + enc(params.search_one || params.search) + '&q2=' + enc(params.search_two || '') + '&cookie=' + enc(cookie), function (json) {\n        done((json && json.Results || []).map(prepareTorrent), '');\n      }, function (a) {\n        var err = a && a.responseJSON && a.responseJSON.error || 'Толока недоступна';\n        if (a && a.status === 401) Lampa.Storage.set('uakino_cookie_toloka', '');\n        done([], err);\n      });\n    }\n    function patchParser() {\n      if (!Lampa.Parser || Lampa.Parser.uakino_ua_patched) return;\n      var original = Lampa.Parser.get;\n      Lampa.Parser.get = function (params, ok, fail) {\n        if (!params || !params.uakino_ua) return original.apply(this, arguments);\n        var pending = 2;\n        var main = null;\n        var mainError = '';\n        var extra = [];\n        var extraError = '';\n        function finish() {\n          if (--pending) return;\n          var results = (main && main.Results || []).filter(isUkrainian);\n          var titles = {};\n          results.forEach(function (r) {\n            titles[String(r.Title).toLowerCase()] = true;\n          });\n          extra.forEach(function (r) {\n            if (!titles[String(r.Title).toLowerCase()]) results.push(r);\n          });\n          if (!main && !extra.length) return fail(mainError || extraError || 'нічого не знайдено');\n          var data = main || {\n            Results: []\n          };\n          data.Results = results;\n          ok(data);\n        }\n        original.call(this, params, function (data) {\n          main = data;\n          finish();\n        }, function (err) {\n          mainError = err;\n          finish();\n        });\n        tolokaSearch(params, function (list, err) {\n          extra = list;\n          extraError = err;\n          finish();\n        });\n      };\n      Lampa.Parser.uakino_ua_patched = true;\n    }\n    var CJK = /[\\u3040-\\u30ff\\u3400-\\u9fff\\uac00-\\ud7af]/;\n    var englishTitles = {};\n    function withoutBrackets(t) {\n      return String(t || '').replace(/\\s*[([][^)\\]]*[)\\]]\\s*/g, ' ').replace(/\\s+/g, ' ').trim();\n    }\n    function englishTitle(movie, done) {\n      var original = movie.original_title || movie.original_name || '';\n      if (original && !CJK.test(original)) return done(original);\n      var id = movie.id;\n      var type = movie.name || movie.first_air_date || movie.original_name ? 'tv' : 'movie';\n      if (!id || !Lampa.TMDB || !Lampa.TMDB.api || !Lampa.TMDB.key) return done('');\n      if (englishTitles[type + id] !== undefined) return done(englishTitles[type + id]);\n      var net = new Lampa.Reguest();\n      net.timeout(8000);\n      net.silent(Lampa.TMDB.api(type + '/' + id + '?api_key=' + Lampa.TMDB.key() + '&language=en-US'), function (json) {\n        var name = json && (json.name || json.title) || '';\n        englishTitles[type + id] = CJK.test(name) ? '' : name;\n        done(englishTitles[type + id]);\n      }, function () {\n        done('');\n      });\n    }\n    function openTorrents(movie) {\n      patchParser();\n      if (hasCredentials('toloka') && !cookieFor('toloka')) {\n        return doLogin('toloka', function () {\n          openTorrents(movie);\n        });\n      }\n      var info = movieInfo(movie);\n      var local = withoutBrackets(info.title);\n      englishTitle(movie, function (english) {\n        Lampa.Activity.push({\n          url: '',\n          title: TORRENTS_LABEL,\n          component: 'torrents',\n          search: english || local,\n          search_one: local,\n          search_two: english,\n          movie: movie,\n          page: 1,\n          uakino_ua: true\n        });\n      });\n    }\n    function openOnline(movie) {\n      Lampa.Activity.push({\n        url: '',\n        title: 'UAKino',\n        component: 'uakino_online',\n        movie: movie,\n        page: 1\n      });\n    }\n    var CSS = '<style>' + '.uakino-online{background:#0b0d11}' + '.uakino-online__body{padding:0 2.2em 2em}' + '.uakino-online__head{position:relative;display:flex;align-items:flex-end;min-height:19em;margin:0 -2.2em 1.6em;padding:4em 2.2em 1.8em;overflow:hidden}' + '.uakino-online__hero-bg{position:absolute;left:0;top:0;right:0;bottom:0;background-size:cover;background-position:center 25%;opacity:.6}' + '.uakino-online__hero-shade{position:absolute;left:0;top:0;right:0;bottom:0;background:linear-gradient(to top,#0b0d11 0%,rgba(11,13,17,.75) 40%,rgba(11,13,17,.1) 100%),linear-gradient(to right,rgba(11,13,17,.9) 0%,rgba(11,13,17,0) 65%)}' + '.uakino-online__poster{position:relative;width:7.5em;height:11.25em;object-fit:cover;border-radius:.9em;margin-right:1.8em;box-shadow:0 1.2em 2.4em rgba(0,0,0,.55);flex-shrink:0}' + '.uakino-online__head-text{position:relative;max-width:62%}' + '.uakino-online__head-title{font-size:2.7em;font-weight:700;line-height:1.08;letter-spacing:-.01em}' + '.uakino-online__head-sub{margin-top:.7em;font-size:1.05em;color:rgba(255,255,255,.75)}' + '.uakino-online__badge{display:inline-block;margin-left:.6em;padding:.05em .45em;border:1px solid rgba(255,255,255,.7);border-radius:.3em;font-size:.8em;font-weight:700;color:#fff;vertical-align:.1em}' + '.uakino-online__head-descr{margin-top:.8em;line-height:1.45;color:rgba(255,255,255,.68);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}' + '.uakino-online__filters,.uakino-online__tabs{display:flex;flex-wrap:wrap;margin-bottom:.9em}' + '.uakino-online__filter{padding:.7em 1.5em;margin:0 .8em .8em 0;border-radius:2em;background:rgba(255,255,255,.13);font-weight:500;transition:transform .15s,background-color .15s}' + '.uakino-online__tabs .uakino-online__filter{padding:.55em 1.3em;background:rgba(255,255,255,.06)}' + '.uakino-online__ranges .uakino-online__filter{padding:.45em 1.1em;font-size:.9em}' + '.uakino-online__filter--active{background:rgba(255,255,255,.3) !important;font-weight:600}' + '.uakino-online__filter.focus{background:#fff !important;color:#0b0d11;transform:scale(1.06)}' + '.uakino-online__list{display:flex;flex-wrap:wrap;margin:.4em -.7em 0}' + '.uakino-online__item{position:relative;width:calc(25% - 1.4em);margin:0 .7em 1.8em;transition:transform .2s}' + '.uakino-online__list--single .uakino-online__item{width:calc(45% - 1.4em)}' + '.uakino-online__thumb{position:relative;padding-top:56.25%;border-radius:1em;background:#1b1f27 center/cover no-repeat;overflow:hidden;box-shadow:0 .6em 1.4em rgba(0,0,0,.4)}' + '.uakino-online__thumb--fallback{filter:brightness(.55)}' + '.uakino-online__thumb-shade{position:absolute;left:0;right:0;bottom:0;height:55%;background:linear-gradient(to top,rgba(0,0,0,.75),rgba(0,0,0,0))}' + '.uakino-online__num{position:absolute;left:.55em;bottom:.35em;font-size:1.9em;font-weight:800;color:#fff;text-shadow:0 .1em .4em rgba(0,0,0,.6)}' + '.uakino-online__timeline{position:absolute;left:.8em;right:.8em;bottom:.5em}' + '.uakino-online__viewed{position:absolute;right:.6em;top:.6em;width:1.6em;height:1.6em;padding:.25em;border-radius:50%;background:rgba(0,0,0,.6);color:#fff}' + '.uakino-online__title{margin-top:.75em;font-size:1.05em;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' + '.uakino-online__info{margin-top:.25em;font-size:.85em;color:rgba(255,255,255,.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' + '.uakino-online__item--viewed .uakino-online__title{color:rgba(255,255,255,.7)}' + '.uakino-online__item.focus{transform:scale(1.08);z-index:2}' + '.uakino-online__item.focus .uakino-online__thumb{box-shadow:0 0 0 .22em #fff,0 1.4em 2.8em rgba(0,0,0,.65)}' + '.uakino-online__item.focus .uakino-online__thumb--fallback{filter:brightness(.75)}' + '.uakino-online__empty{padding:2.5em 0;text-align:center;color:rgba(255,255,255,.6)}' + '</style>';\n    function addButtons(e) {\n      var render = e.object.activity.render();\n      if (render.find('.view--uakino').length) return;\n      var online = $('<div class=\"full-start__button selector view--uakino view--uakino-online\">' + ICON_PLAY + '<span>UAKino</span></div>');\n      online.on('hover:enter', function () {\n        openOnline(e.data.movie);\n      });\n      var torrent = render.find('.view--torrent');\n      if (torrent.length) torrent.before(online);else render.find('.full-start-new__buttons, .full-start__buttons').first().append(online);\n      if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');\n    }\n    function addSettings() {\n      if (!Lampa.SettingsApi) return;\n      Lampa.SettingsApi.addComponent({\n        component: 'uakino',\n        name: 'UAKino',\n        icon: ICON\n      });\n      SOURCES.forEach(function (source) {\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_src_' + source.id,\n            type: 'trigger',\n            default: true\n          },\n          field: {\n            name: source.name,\n            description: 'Шукати на ' + source.host.replace(/^https?:\\/\\//, '')\n          }\n        });\n      });\n      ACCOUNTS.forEach(function (account) {\n        var relogin = function relogin() {\n          if (hasCredentials(account.id)) loginWithNotice(account);\n        };\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_title_' + account.id,\n            type: 'title'\n          },\n          field: {\n            name: account.name + ' — акаунт'\n          }\n        });\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_login_' + account.id,\n            type: 'input',\n            values: '',\n            default: '',\n            placeholder: 'логін'\n          },\n          field: {\n            name: 'Логін',\n            description: account.descr\n          },\n          onChange: relogin\n        });\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_pass_' + account.id,\n            type: 'input',\n            values: '',\n            default: '',\n            placeholder: 'пароль'\n          },\n          field: {\n            name: 'Пароль'\n          },\n          onChange: relogin,\n          onRender: function onRender(item) {\n            item.toggleClass('hide', !!cookieFor(account.id));\n          }\n        });\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_enter_' + account.id,\n            type: 'button'\n          },\n          field: {\n            name: 'Увійти',\n            description: 'Вхід не виконано'\n          },\n          onRender: function onRender(item) {\n            var logged = !!cookieFor(account.id);\n            item.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');\n            item.find('.settings-param__descr').text(accountStatus(account));\n          },\n          onChange: function onChange() {\n            if (cookieFor(account.id)) logout(account);else loginWithNotice(account);\n          }\n        });\n      });\n      SOURCES.forEach(function (source) {\n        Lampa.SettingsApi.addParam({\n          component: 'uakino',\n          param: {\n            name: 'uakino_host_' + source.id,\n            type: 'input',\n            values: '',\n            default: '',\n            placeholder: source.host\n          },\n          field: {\n            name: 'Адреса ' + source.name,\n            description: 'Дзеркало, якщо основна адреса не відкривається. За замовчуванням: ' + source.host\n          }\n        });\n      });\n    }\n    function start() {\n      $('body').append($(CSS));\n      Lampa.Component.add('uakino_online', OnlineComponent);\n      addSettings();\n      Lampa.Listener.follow('full', function (e) {\n        if (e.type === 'complite') addButtons(e);\n      });\n    }\n    if (window.appready) start();else {\n      Lampa.Listener.follow('app', function (e) {\n        if (e.type === 'ready') start();\n      });\n    }\n  })();\n})();\n})();\n";

var __modules = {
  "worker/src.js": [{"../lib/parse":"lib/parse.js","../lib/bencode":"lib/bencode.js","../lib/jackett":"lib/jackett.js","../lib/online":"lib/online.js","../lib/search":"lib/search.js","../lib/accounts":"lib/accounts.js","../lib/proxy":"lib/proxy.js"}, function (module, exports, require) {
'use strict';

// Версія парсера для Cloudflare Workers: працює цілодобово без власного комп'ютера.
// Збирається в один файл командою `node build.js` → worker/dist/worker.mjs

const parse = require('../lib/parse');
const { parseTorrent } = require('../lib/bencode');
const { toJackett } = require('../lib/jackett');
const { createOnline } = require('../lib/online');
const { searchDle } = require('../lib/search');
const accounts = require('../lib/accounts');
const { proxy } = require('../lib/proxy');

const DEFAULT_HOST = 'https://uakino.best';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
// Безкоштовний план Workers дозволяє 50 підзапитів на один запит.
const MAX_TORRENTS = 30;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS, ...extra } });
}

function settings(env) {
  return {
    host: String(env.UAKINO_HOST || DEFAULT_HOST).replace(/\/+$/, ''),
    cookie: env.UAKINO_COOKIE || '',
    ua: env.UAKINO_UA || UA,
    apikey: env.UAKINO_APIKEY || '',
    maxPages: Number(env.UAKINO_MAX_PAGES || 5),
  };
}

async function request(cfg, url, opts = {}) {
  const headers = {
    'User-Agent': cfg.ua,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.7',
    Referer: opts.referer || cfg.host + '/',
  };
  if (cfg.cookie) headers.Cookie = cfg.cookie;
  if (opts.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';
  if (opts.body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  const res = await fetch(url, { method: opts.method || 'GET', headers, body: opts.body || null, redirect: 'follow' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const cf = /cloudflare/i.test(res.headers.get('server') || '') || /cloudflare/i.test(text.slice(0, 3000));
    const err = new Error('HTTP ' + res.status + ' for ' + url + (cf ? ' (Cloudflare заблокував запит)' : ''));
    err.status = res.status;
    throw err;
  }
  return res;
}

// Кеш Cloudflare (у Node-тестах його немає — тоді просто без кешу).
const edge = typeof caches !== 'undefined' ? caches.default : null;

async function cached(key, ttl, ctx, fn) {
  const req = new Request('https://uakino-cache.internal/' + encodeURIComponent(key));
  if (edge) {
    const hit = await edge.match(req);
    if (hit) return hit.json();
  }
  const value = await fn();
  if (edge && value !== undefined) {
    const put = edge.put(req, new Response(JSON.stringify(value), { headers: { 'Cache-Control': 'max-age=' + ttl } }));
    if (ctx && ctx.waitUntil) ctx.waitUntil(put); else await put;
  }
  return value;
}

async function searchSite(cfg, ctx, q) {
  return cached('search:' + cfg.host + ':' + q.toLowerCase(), 1800, ctx, async () => {
    const list = await searchDle(cfg.host, q, async (u, o) => (await request(cfg, u, o)).text());
    return list;
  });
}

async function page(cfg, ctx, url) {
  return cached('page:' + url, 1800, ctx, async () => parse.parsePage(await (await request(cfg, url)).text(), url, cfg.host));
}

async function torrentMeta(cfg, ctx, url) {
  return cached('torrent:' + url, 7 * 86400, ctx, async () => {
    const t = await parseTorrent(new Uint8Array(await (await request(cfg, url)).arrayBuffer()));
    return { infoHash: t.infoHash, name: t.name, size: t.size, files: t.files.length, trackers: t.trackers, magnet: t.magnet, created: t.created };
  });
}

async function find(cfg, ctx, { query, title, original, year }) {
  const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
  if (!titles.length) return [];

  const candidates = new Map();
  let lastError = null;
  for (const q of titles) {
    try {
      for (const item of await searchSite(cfg, ctx, q)) {
        if (!candidates.has(item.id)) candidates.set(item.id, { ...item, score: parse.scoreTitle(item, titles) });
      }
    } catch (e) {
      lastError = e;
    }
  }
  if (!candidates.size && lastError) throw lastError;

  let list = Array.from(candidates.values()).sort((a, b) => b.score - a.score);
  const relevant = list.filter((c) => c.score >= 40);
  if (relevant.length) list = relevant;
  list = list.slice(0, cfg.maxPages);

  const pages = await Promise.all(list.map((c) => page(cfg, ctx, c.url).catch(() => null)));
  const entries = [];
  for (const p of pages) if (p) for (const t of p.torrents) entries.push({ page: p, torrent: t });

  const results = await Promise.all(entries.slice(0, MAX_TORRENTS).map(async (e) => ({
    ...e,
    meta: await torrentMeta(cfg, ctx, e.torrent.url).catch(() => null),
    peers: null,
  })));

  if (year) {
    const y = Number(year);
    results.sort((a, b) => Math.abs((a.page.year || y) - y) - Math.abs((b.page.year || y) - y));
  }
  return results;
}

async function handle(req, env, ctx) {
  const cfg = settings(env || {});
  const url = new URL(req.url);
  const q = url.searchParams;
  const base = url.origin;

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'GET' && !(req.method === 'POST' && (url.pathname === '/login' || url.pathname === '/proxy'))) return json({ error: 'method not allowed' }, 405);

  try {
    if (url.pathname === '/' || url.pathname === '/health') {
      return json({ name: 'uakino-torrents', runtime: 'cloudflare-worker', host: cfg.host, plugin: base + '/uakino.js', jackett: base + '/api/v2.0/indexers/uakino/results?Query=...' });
    }

    if (url.pathname === '/uakino.js' || url.pathname === '/plugin.js') {
      const code = __PLUGIN_SOURCE__.replace("'__UAKINO_SERVER__'", JSON.stringify(base));
      return new Response(code, { headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'max-age=300', ...CORS } });
    }

    // Діагностика: з якої країни/IP Worker ходить на сайти (UAFlix показує плеєр гостям лише з UA).
    if (url.pathname === '/where') {
      const trace = await (await fetch('https://www.cloudflare.com/cdn-cgi/trace')).text();
      const get = (k) => ((trace.match(new RegExp('^' + k + '=(.*)$', 'm')) || [])[1] || '');
      const you = req.cf || {};
      return json({ worker: { ip: get('ip'), country: get('loc'), datacenter: get('colo') }, you: { country: you.country || '', datacenter: you.colo || '' } });
    }

    // Проксі для LG/браузера, де діє CORS (лише сайти-джерела й плеєри).
    if (url.pathname === '/proxy') {
      const r = await proxy(q, req.method === 'POST' ? await req.text() : '', fetch);
      return new Response(r.body, { status: r.status, headers: { 'Content-Type': r.type, 'Cache-Control': 'no-store', ...CORS } });
    }

    // Вхід (UAFlix, Толока) і пошук/завантаження на Толоці з cookie користувача.
    if (url.pathname === '/login' || url.pathname.indexOf('/toloka/') === 0) {
      let params = q;
      if (req.method === 'POST') {
        params = new URLSearchParams(await req.text());
        q.forEach((v, k) => { if (!params.has(k)) params.set(k, v); });
      }
      const r = await accounts.route(url.pathname, params, base, fetch);
      if (r && r.json) return json(r.json, 200, { 'Cache-Control': 'no-store' });
      if (r && r.torrent) {
        return new Response(r.torrent, {
          headers: { 'Content-Type': 'application/x-bittorrent', 'Content-Disposition': "attachment; filename*=UTF-8''" + encodeURIComponent(r.name), ...CORS },
        });
      }
    }

    if (url.pathname.indexOf('/online/') === 0) {
      const online = createOnline({
        host: cfg.host,
        fetchText: async (u, o) => (await request(cfg, u, o)).text(),
        searchSite: (s) => searchSite(cfg, ctx, s),
      });
      const data = await online.route(url.pathname, q);
      if (data) return json(data, 200, { 'Cache-Control': 'max-age=600' });
    }

    if (/^\/api\/v2\.0\/indexers\/[^/]+\/results\/?$/.test(url.pathname)) {
      if (cfg.apikey && q.get('apikey') !== cfg.apikey) return json({ error: 'bad apikey' }, 401);
      const params = {
        query: q.get('Query') || q.get('query') || '',
        title: q.get('title') || '',
        original: q.get('title_original') || '',
        year: q.get('year') || null,
      };
      const results = await find(cfg, ctx, params);
      return json({
        Results: results.map((r) => toJackett(r, base)),
        Indexers: [{ ID: 'uakino', Name: 'UAKino', Status: 2, Results: results.length, Error: null }],
      });
    }

    if (url.pathname === '/download') {
      let t;
      try { t = new URL(q.get('url') || ''); } catch (e) { return json({ error: 'bad url' }, 400); }
      const allowed = new URL(cfg.host);
      if (t.hostname.replace(/^www\./, '') !== allowed.hostname.replace(/^www\./, '') || !/^\/torrent\/\d+\//.test(t.pathname)) {
        return json({ error: 'only ' + allowed.hostname + '/torrent/* is allowed' }, 403);
      }
      const res = await request(cfg, t.toString());
      const name = decodeURIComponent(t.pathname.split('/').pop());
      return new Response(res.body, {
        headers: { 'Content-Type': 'application/x-bittorrent', 'Content-Disposition': "attachment; filename*=UTF-8''" + encodeURIComponent(name), ...CORS },
      });
    }

    return json({ error: 'not found' }, 404);
  } catch (e) {
    return json({ error: e.message }, e.status || 502);
  }
}

module.exports = { fetch: handle };

  }],
  "lib/parse.js": [{}, function (module, exports, require) {
'use strict';

// Розбір HTML uakino.best (рушій DataLife Engine) регулярними виразами,
// щоб сервер працював без сторонніх залежностей.

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…' };

function decodeEntities(s) {
  return String(s || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    const v = ENTITIES[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}

function stripTags(s) {
  return decodeEntities(String(s || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function safeDecode(s) {
  try { return decodeURIComponent(s); } catch (e) { return s; }
}

// Абсолютна адреса з коректно закодованими кирилицею та пробілами.
function absoluteUrl(href, host) {
  if (!href) return '';
  let url = decodeEntities(href.trim());
  if (url.indexOf('//') === 0) url = 'https:' + url;
  else if (!/^https?:\/\//i.test(url)) url = host.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '');
  try {
    const u = new URL(url);
    u.pathname = u.pathname.split('/').map((p) => encodeURIComponent(safeDecode(p))).join('/');
    return u.toString();
  } catch (e) {
    return '';
  }
}

// Посилання на інші дзеркала uakino (uakino.best, uakino.me, ...) переписуються
// на адресу, з якою працює парсер. Чужі домени відкидаються (повертається '').
function localize(url, host) {
  try {
    const u = new URL(url);
    const h = new URL(host);
    const a = u.hostname.replace(/^www\./, '');
    if (a === h.hostname.replace(/^www\./, '')) return u.toString();
    if (!/(^|\.)uakino\.[a-z]+$/i.test(a)) return '';
    u.protocol = h.protocol;
    u.host = h.host;
    return u.toString();
  } catch (e) {
    return '';
  }
}

// Сторінки матеріалів DLE мають вигляд /розділ/12345-slug.html
const NEWS_RE = /\/(\d+)-[^/]*\.html$/;

function newsId(url) {
  try {
    const m = new URL(url).pathname.match(NEWS_RE);
    return m ? m[1] : null;
  } catch (e) {
    return null;
  }
}

function attr(tag, name) {
  const m = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
  return m ? (m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;
}

// Назва з картки: заголовок усередині посилання, атрибут title, alt постера або текст.
function cardTitle(tag, inner) {
  const clean = (t) => decodeEntities(t || '').replace(/\s+(онлайн|дивитис[ья]|смотреть)(\s.*)?$/i, '').replace(/\s+/g, ' ').trim();
  const heading = inner.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
  if (heading && stripTags(heading[1])) return clean(stripTags(heading[1]));
  if (attr(tag, 'title')) return clean(attr(tag, 'title'));
  const img = inner.match(/<img\b[^>]*>/i);
  const alt = img ? attr(img[0], 'alt') || attr(img[0], 'title') : '';
  if (alt && !/постер|poster/i.test(alt)) return clean(alt);
  return clean(stripTags(inner));
}

// Список матеріалів зі сторінки пошуку або розділу.
// linkRe — шаблон шляху сторінки фільму для сайтів не на DLE (/serials/slug/, /movie-slug).
function parseList(html, host, linkRe) {
  const found = new Map();
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = attr(m[0], 'href');
    if (!href) continue;
    const url = localize(absoluteUrl(href, host), host);
    if (!url) continue;
    let id;
    if (linkRe) {
      const path = new URL(url).pathname;
      id = linkRe.test(path) ? path : null;
    } else {
      id = newsId(url);
    }
    if (!id) continue;

    const cls = attr(m[0], 'class') || '';
    const title = cardTitle(m[0], m[2]);
    const item = found.get(id) || { id, url, title: '', poster: '' };
    // Пріоритет назві з посилання-заголовка картки (a.movie-title).
    if (title && (!item.title || /movie-title|title/.test(cls))) item.title = title;
    if (!item.poster) {
      const img = m[2].match(/<img\b[^>]*>/i);
      if (img) {
        const src = attr(img[0], 'data-src') || attr(img[0], 'src');
        if (src) item.poster = absoluteUrl(src, host);
      }
    }
    // Оригінальна назва поруч з карткою (UASerials: .th-title-oname).
    if (!item.original) {
      const after = html.slice(re.lastIndex, re.lastIndex + 600).split(/<a\b/i)[0];
      const orig = after.match(/class=["'][^"']*(oname|original|orig-title|origintitle)[^"']*["'][^>]*>([\s\S]*?)<\//i);
      if (orig && stripTags(orig[2])) item.original = stripTags(orig[2]);
    }
    found.set(id, item);
  }
  return Array.from(found.values()).filter((i) => i.title);
}

// Рік матеріалу: з розмітки schema.org (dateCreated), з поля «Рік:»/«Рік виходу:» (з двокрапкою —
// так не плутається з меню фільтрів «Рік 2026 2025…») або з <title> («Аватар 2009 фільм…»).
function parseYear(html) {
  const ld = html.match(/"dateCreated"\s*:\s*"((?:19|20)\d{2})/);
  if (ld) return Number(ld[1]);
  const text = stripTags(html);
  const m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\s*:\s*((?:19|20)\d{2})/i);
  if (m) return Number(m[1]);
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const t = title.match(/(?:^|\D)((?:19|20)\d{2})(?!\d)/);
  return t ? Number(t[1]) : null;
}

// Сторінка фільму/серіалу: назви, рік і всі посилання на .torrent
function parsePage(html, url, host) {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const og = html.match(/<meta[^>]+property=["']og:title["'][^>]*>/i);
  let title = h1 ? stripTags(h1[1]) : '';
  if (!title && og) title = decodeEntities(attr(og[0], 'content') || '').trim();

  const orig = html.match(/class=["'][^"']*origintitle[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|div|h2|p)>/i);
  const original = orig ? stripTags(orig[1]) : '';

  let year = parseYear(html);
  if (!year) {
    const t = (title + ' ' + original).match(/\((19|20)\d{2}\)/);
    if (t) year = Number(t[0].slice(1, 5));
  }

  const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  const poster = ogImg ? absoluteUrl(attr(ogImg[0], 'content'), host) : '';

  const torrents = new Map();
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = attr(m[0], 'href');
    if (!href || !/\/torrent\/\d+\//i.test(href)) continue;
    const link = localize(absoluteUrl(href, host), host);
    if (!link || torrents.has(link)) continue;
    const path = new URL(link).pathname;
    const tid = path.match(/\/torrent\/(\d+)\//)[1];
    const file = safeDecode(path.split('/').pop()).replace(/\.torrent$/i, '').trim();
    torrents.set(link, { id: tid, url: link, name: file || stripTags(m[2]), label: stripTags(m[2]) });
  }
  // Посилання можуть бути і не в <a> (наприклад, у data-атрибутах чи JS).
  const loose = /(["'])((?:https?:)?\/\/[^"'<>\s]*?\/torrent\/\d+\/[^"'<>]*?\.torrent|\/torrent\/\d+\/[^"'<>]*?\.torrent)\1/gi;
  while ((m = loose.exec(html))) {
    const link = localize(absoluteUrl(m[2], host), host);
    if (!link || torrents.has(link)) continue;
    const path = new URL(link).pathname;
    const tid = path.match(/\/torrent\/(\d+)\//)[1];
    torrents.set(link, { id: tid, url: link, name: safeDecode(path.split('/').pop()).replace(/\.torrent$/i, '').trim(), label: '' });
  }

  return { id: newsId(url), url, title, original, year, poster, torrents: Array.from(torrents.values()) };
}

function parseSitemap(xml) {
  const out = [];
  const re = /<loc>\s*([\s\S]*?)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml))) out.push(decodeEntities(m[1].replace(/^<!\[CDATA\[|\]\]>$/g, '')));
  return out;
}

function normalizeTitle(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[ʼ’'`]/g, '')
    .replace(/[^0-9a-z\u00c0-\u024f\u0400-\u04ff]+/g, ' ')
    .trim();
}

// Назва без сезону («(Сезон 1)», «1-2 сезон», «Season 2») і року — для порівняння.
function baseTitle(s) {
  const n = normalizeTitle(s);
  const cut = n.replace(/\s*((\d+\s*)+сезон|сезон\s*\d+|season\s*\d+|\d+\s*season).*$/, '').trim();
  const noYear = cut.replace(/\b(19|20)\d{2}\b/g, ' ').replace(/\s+/g, ' ').trim();
  return noYear || cut || n;
}

// Усі назви матеріалу: «Укр / Альтернативна / Original» + окремо знайдена оригінальна.
function altNames(item) {
  const names = String(item.title || '').split(/\s+\/\s+/);
  if (item.original) names.push(item.original);
  return names.filter(Boolean);
}

// Наскільки матеріал відповідає фільму: 100 — точна назва (будь-яка з альтернативних чи
// оригінальна), 50 — назва фільму цілими словами всередині довшої («Ходячі мерці: Деріл Діксон»),
// менше — часткові збіги.
function scoreTitle(item, titles) {
  const qs = titles.map(baseTitle).filter(Boolean);
  let best = 0;
  for (const name of altNames(item)) {
    const b = baseTitle(name);
    if (!b) continue;
    for (const q of qs) {
      let s = 0;
      if (b === q) s = 100;
      else if ((' ' + b + ' ').indexOf(' ' + q + ' ') >= 0) s = 50;
      else if ((' ' + q + ' ').indexOf(' ' + b + ' ') >= 0 && b.length > 3) s = 40;
      else {
        const words = q.split(' ').filter((w) => w.length > 2);
        const hit = words.filter((w) => (' ' + b + ' ').indexOf(' ' + w + ' ') >= 0).length;
        if (words.length) s = Math.round((hit / words.length) * 30);
      }
      best = Math.max(best, s);
    }
  }
  return best;
}

// Рік з назви чи адреси картки («…-2009.html», «(2024)»), якщо є.
function yearOf(item) {
  const m = String(item.title || '').match(/\((19|20)\d{2}\)/) || String(item.url || '').match(/[-_/]((19|20)\d{2})(?:[-_.][a-z]*)?\.html$/);
  return m ? Number(m[0].replace(/\D/g, '').slice(0, 4)) : null;
}

// Тип і рік матеріалу зі сторінки: «Серіал Керрі 1 сезон…» / «Жанр: Фільм», «Рік: 2026».
function pageMeta(html, url) {
  let type = null;
  const genre = stripTags((html.match(/(Жанр|Тип)\s*:?\s*(<[^>]*>\s*)*[^<]{0,40}/i) || [''])[0]);
  const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  if (/\/(serials?|seriesss?|series|tv)(\/|-)|sezon|season/i.test(url || '')) type = 'serial';
  else if (/\/(films?|filmy|filmss|movies?)(\/|-)|\/movie-/i.test(url || '')) type = 'film';
  else if (/:\s*(мульт)?серіал|:\s*аніме-серіал/i.test(genre)) type = 'serial';
  else if (/:\s*(мульт)?фільм/i.test(genre)) type = 'film';
  // Заголовок сторінки на кшталт «Серіал Керрі 1 сезон…» / «Фільм «Керрі» 2013…» (лише перше слово —
  // назва сайту «…фільми та серіали українською» не рахується).
  else if (/^\s*(мульт)?серіал/i.test(title)) type = 'serial';
  else if (/^\s*(мульт)?фільм/i.test(title)) type = 'film';
  // «Атака титанів. 1-4 сезон / дивитися аніме…» — сезон у заголовку важливіший за schema.org
  // (AnimeUA позначає все як Movie).
  else if (/сезон|серії|серія|season/i.test(title)) type = 'serial';
  else if (/"@type"\s*:\s*"TVSeries"/.test(html)) type = 'serial';
  else if (/"@type"\s*:\s*"Movie"/.test(html)) type = 'film';
  return { type, year: parseYear(html) };
}

// Варіанти назв фільму з Lampa: «Ван Піс (Єдиний скарб)» → ще й «Ван Піс». Для пошуку на сайтах
// пропускаємо назви ієрогліфами (оригінальні назви аніме з TMDB: «ワンピース»).
function titleVariants(list) {
  const all = [];
  const add = (t) => { t = String(t || '').trim(); if (t && all.indexOf(t) < 0) all.push(t); };
  list.forEach((t) => {
    const short = String(t || '').replace(/\s*[([][^)\]]*[)\]]\s*/g, ' ').replace(/\s+/g, ' ').trim();
    add(short);
    add(t);
  });
  const cjk = /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/;
  return { match: all, search: all.filter((t) => !cjk.test(t)).slice(0, 3) };
}

module.exports = { titleVariants, pageMeta, scoreTitle, baseTitle, altNames, yearOf, decodeEntities, stripTags, absoluteUrl, localize, newsId, parseList, parsePage, parseSitemap, normalizeTitle };

  }],
  "lib/bencode.js": [{}, function (module, exports, require) {
'use strict';

// Мінімальний bencode-декодер без залежностей від Node: працює і в Node, і в Cloudflare Workers.
// Рядки повертаються як Uint8Array, для словника "info" запам'ятовуються межі в байтах,
// щоб порахувати infohash.

const utf8 = new TextDecoder('utf-8');

function ascii(buf, start, end) {
  let s = '';
  for (let i = start; i < end; i++) s += String.fromCharCode(buf[i]);
  return s;
}

function decode(buf) {
  let pos = 0;
  let infoRange = null;

  function readInt(end) {
    const n = Number(ascii(buf, pos, end));
    if (!Number.isFinite(n)) throw new Error('bencode: bad integer at ' + pos);
    return n;
  }

  function next(depth) {
    const c = buf[pos];
    if (c === 0x69) { // i
      const end = buf.indexOf(0x65, pos);
      if (end < 0) throw new Error('bencode: unterminated integer');
      pos++;
      const n = readInt(end);
      pos = end + 1;
      return n;
    }
    if (c === 0x6c) { // l
      pos++;
      const list = [];
      while (buf[pos] !== 0x65) {
        if (pos >= buf.length) throw new Error('bencode: unterminated list');
        list.push(next(depth + 1));
      }
      pos++;
      return list;
    }
    if (c === 0x64) { // d
      pos++;
      const dict = {};
      while (buf[pos] !== 0x65) {
        if (pos >= buf.length) throw new Error('bencode: unterminated dict');
        const key = utf8.decode(next(depth + 1));
        const start = pos;
        dict[key] = next(depth + 1);
        if (depth === 0 && key === 'info') infoRange = [start, pos];
      }
      pos++;
      return dict;
    }
    if (c >= 0x30 && c <= 0x39) {
      const colon = buf.indexOf(0x3a, pos);
      if (colon < 0) throw new Error('bencode: bad string');
      const len = readInt(colon);
      const start = colon + 1;
      if (start + len > buf.length) throw new Error('bencode: string out of range');
      pos = start + len;
      return buf.subarray(start, pos);
    }
    throw new Error('bencode: unexpected byte ' + c + ' at ' + pos);
  }

  const value = next(0);
  return { value, infoRange };
}

function str(v) {
  return v instanceof Uint8Array ? utf8.decode(v) : (v == null ? '' : String(v));
}

function hex(bytes) {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Розбирає .torrent і повертає назву, розмір, infohash, трекери та magnet.
async function parseTorrent(input) {
  const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (buf[0] !== 0x64) throw new Error('not a torrent file');
  const { value, infoRange } = decode(buf);
  if (!value.info || !infoRange) throw new Error('torrent has no info dictionary');

  const info = value.info;
  const infoHash = hex(await crypto.subtle.digest('SHA-1', buf.slice(infoRange[0], infoRange[1])));
  const name = str(info['name.utf-8'] || info.name);

  let files;
  if (Array.isArray(info.files)) {
    files = info.files.map((f) => ({
      path: (f['path.utf-8'] || f.path || []).map(str).join('/'),
      length: f.length || 0,
    }));
  } else {
    files = [{ path: name, length: info.length || 0 }];
  }
  const size = files.reduce((sum, f) => sum + f.length, 0);

  const trackers = [];
  const add = (t) => { const s = str(t); if (s && trackers.indexOf(s) < 0) trackers.push(s); };
  if (value.announce) add(value.announce);
  if (Array.isArray(value['announce-list'])) {
    value['announce-list'].forEach((tier) => (Array.isArray(tier) ? tier : [tier]).forEach(add));
  }

  const magnet = 'magnet:?xt=urn:btih:' + infoHash +
    '&dn=' + encodeURIComponent(name) +
    trackers.map((t) => '&tr=' + encodeURIComponent(t)).join('');

  return { name, infoHash, size, files, trackers, magnet, created: value['creation date'] || null };
}

module.exports = { decode, parseTorrent };

  }],
  "lib/jackett.js": [{}, function (module, exports, require) {
'use strict';

// Перетворює знайдений торент у запис формату Jackett (його розуміє Lampa).
function toJackett(r, base) {
  const { page, torrent, meta, peers } = r;
  let title = torrent.name || page.title;
  if (page.original && title.toLowerCase().indexOf(page.original.toLowerCase()) < 0) title += ' / ' + page.original;
  if (page.year && title.indexOf(String(page.year)) < 0) title += ' (' + page.year + ')';
  if (torrent.label && torrent.label !== torrent.name && title.indexOf(torrent.label) < 0) title += ' [' + torrent.label + ']';

  const serial = /сезон|season|сері[яї]|серии/i.test(torrent.name + ' ' + page.title);
  const created = meta && meta.created ? new Date(meta.created * 1000) : null;
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
    UploadVolumeFactor: 1,
  };
}

module.exports = { toJackett };

  }],
  "lib/online.js": [{"./parse":"lib/parse.js"}, function (module, exports, require) {
'use strict';

// Онлайн-перегляд (як online_mod) з uakino та інших сайтів з українською озвучкою: плейлисти
// серій/озвучок і прямі посилання на відео з плеєрів (ashdi, tortuga, zetvideo, hdvb — Playerjs).
// Код не залежить від Node — працює і в Workers, і на пристрої з Lampa.

const parse = require('./parse');

// Плеєри, які дозволено відкривати (захист від запитів на довільні адреси).
const PLAYER_HOSTS = /(^|\.)(ashdi\.vip|tortuga\.[a-z]+|zetvideo\.net|[a-z0-9-]*hdvb[a-z0-9-]*\.[a-z]+|uakino\.[a-z]+)$/i;
// Посилання на плеєри будь-де на сторінці (атрибути, JS), крім трейлерів і службових файлів.
const PLAYER_URL = /(?:https?:)?\/\/(?:[a-z0-9-]+\.)*(?:ashdi\.vip|tortuga\.[a-z]+|zetvideo\.net|[a-z0-9-]*hdvb[a-z0-9-]*\.[a-z]+)\/[^"'\s<>\\]+/gi;

function attr(tag, name) {
  const m = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\'|([^\\s>]+))', 'i'));
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
  // «1-2 сезон» — на сторінці кілька сезонів, номер визначиться з плейлиста.
  if (/\d+\s*[-–]\s*\d+[\s_-]*(сезон|sezon)/i.test(String(s || ''))) return null;
  const m = String(s || '').match(/(?:сезон|season|sezon)[\s_-]*(\d+)|(\d+)[\s_-]*(?:сезон|sezon)|season\s*(\d+)/i);
  return m ? Number(m[1] || m[2] || m[3]) : null;
}

function episodeOf(s) {
  const m = String(s || '').match(/(\d+)\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\s*(\d+)|^\s*(\d+)\b/i);
  return m ? Number(m[1] || m[2] || m[3]) : null;
}

// Блок плейлиста (uakino), iframe-плеєри та інші посилання на плеєри на сторінці матеріалу.
// seen — усі iframe/хости, що трапились (для діагностики, якщо відео не знайдено).
function parsePlayers(html, host, anyHost) {
  let playlist = null;
  const ajax = html.match(/<div\b[^>]*class=["'][^"']*playlists-ajax[^"']*["'][^>]*>/i);
  if (ajax) {
    const newsId = attr(ajax[0], 'data-news_id');
    if (newsId) playlist = { newsId, xfield: attr(ajax[0], 'data-xfname') || 'playlist' };
  }
  const iframes = [];
  const seen = [];
  const skip = (src) => /youtube|trailer|\.(js|css|png|jpe?g|webp|gif|svg|ico)(\?|$)/i.test(src);
  const add = (src) => {
    if (!src || iframes.indexOf(src) >= 0 || skip(src)) return;
    iframes.push(src);
  };
  const re = /<iframe\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);
    if (!src) continue;
    try {
      const h = new URL(src).hostname;
      if (seen.indexOf(h) < 0) seen.push(h);
      if (!anyHost && !PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;
    } catch (e) { continue; }
    add(src);
  }
  const loose = html.match(PLAYER_URL) || [];
  loose.forEach((u) => {
    const src = absolute(u.replace(/&amp;/g, '&'), host);
    try {
      const h = new URL(src).hostname;
      if (seen.indexOf(h) < 0) seen.push(h);
    } catch (e) { return; }
    add(src);
  });
  return { playlist, iframes, seen };
}

// Відповідь /engine/ajax/playlists.php: списки (озвучки/сезони) і серії з data-file.
function parsePlaylist(html, host) {
  const labels = {};
  const episodes = [];
  const re = /<li\b([^>]*)>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = re.exec(html))) {
    const open = '<li' + m[1] + '>';
    const file = attr(open, 'data-file');
    const id = attr(open, 'data-id');
    const text = parse.stripTags(m[2]);
    if (file) episodes.push({ id: id || '', voice: attr(open, 'data-voice') || '', title: text, file: absolute(file, host) });
    else if (id != null) labels[id] = text;
  }
  return episodes.map((ep) => {
    const parts = ep.id ? ep.id.split('_') : [];
    const names = [];
    for (let i = 1; i <= parts.length; i++) {
      const label = labels[parts.slice(0, i).join('_')];
      if (label && names.indexOf(label) < 0) names.push(label);
    }
    if (ep.voice && names.indexOf(ep.voice) < 0) names.push(ep.voice);
    // AniTube: «ОЗВУЧУВАННЯ / FANVOXUA / ПЛЕЄР ASHDI» → «FANVOXUA · ASHDI».
    const label = names
      .filter((n) => !/^(озвучування|озвучка|озвучення)$/i.test(n.trim()))
      .map((n) => n.trim().replace(/^плеєр\s+/i, ''))
      .join(' · ');
    return { group: label || 'UAKino', title: ep.title, file: ep.file };
  });
}

// Картки серій, що ведуть на окремі сторінки з плеєром (UAFlix: …/season-01-episode-02/),
// і посилання на сторінки сезонів (…/sezon-2/) того самого серіалу.
function parseEpisodeLinks(html, host, pageUrl) {
  let base = '';
  try { base = new URL(pageUrl).pathname.replace(/\/+$/, ''); } catch (e) { /* без фільтра за шляхом */ }
  const episodes = [];
  const seasonPages = [];
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = attr('<a' + m[1] + '>', 'href');
    if (!href) continue;
    const url = absolute(href, host);
    let path;
    try { path = new URL(url).pathname; } catch (e) { continue; }
    if (base && path.indexOf(base + '/') !== 0) continue;
    const ep = path.match(/season-(\d+)-episode-(\d+)\/?$/i);
    if (ep) {
      const inner = m[2];
      const title = parse.stripTags((inner.match(/class=["'][^"']*vi-title[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '');
      const label = parse.stripTags((inner.match(/class=["'][^"']*vi-rate[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1] || '');
      episodes.push({ season: Number(ep[1]), episode: Number(ep[2]), url, title, label });
      continue;
    }
    if (/\/(sezon|season)-\d+\/?$/i.test(path) && seasonPages.indexOf(url) < 0) seasonPages.push(url);
  }
  return { episodes, seasonPages };
}

function jsString(html, key) {
  const re = new RegExp('[\\s,{]' + key + '\\s*:\\s*([\'"])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1');
  const m = html.match(re);
  if (!m) return null;
  return m[2].replace(/\\(.)/g, (s, c) => (c === 'n' ? '\n' : c));
}

// "[720p]url1,[1080p]url2" → { '720p': url1, '1080p': url2 }
function parseQualities(str) {
  const out = {};
  String(str || '').split(/,(?=\s*(?:\[|https?:|\/\/))/).forEach((part) => {
    const m = part.trim().match(/^\[([^\]]*)\](.+)$/);
    if (m) {
      m[2].split(' or ').forEach((u) => { if (!out[m[1]]) out[m[1]] = absolute(u.trim(), 'https://x'); });
    } else if (part.trim()) {
      out.auto = absolute(part.trim().split(' or ')[0], 'https://x');
    }
  });
  return out;
}

function parseSubtitles(str) {
  if (!str) return [];
  return String(str).split(/,(?=\s*\[)/).map((part) => {
    const m = part.trim().match(/^\[([^\]]*)\](.+)$/);
    return m ? { label: m[1], url: absolute(m[2].trim(), 'https://x') } : { label: 'Субтитри', url: absolute(part.trim(), 'https://x') };
  }).filter((s) => /^https?:/.test(s.url));
}

function toStream(file, subtitle) {
  const q = parseQualities(file);
  const keys = Object.keys(q);
  if (!keys.length) return null;
  const best = keys.slice().sort((a, b) => (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0))[0];
  return { url: q[best], quality: keys.length > 1 ? q : null, subtitles: parseSubtitles(subtitle) };
}

function flatten(nodes, path, out) {
  (nodes || []).forEach((n) => {
    if (Array.isArray(n.folder)) flatten(n.folder, path.concat(n.title || ''), out);
    else if (n.file) out.push({ path, title: n.title || '', file: n.file, subtitle: n.subtitle || '' });
  });
  return out;
}

// Сторінка плеєра (ashdi тощо): Playerjs({file: "...m3u8"}) або file: '[{"title":..,"folder":[..]}]'
function parsePlayerjs(html) {
  const file = jsString(html, 'file');
  if (!file) return null;
  const subtitle = jsString(html, 'subtitle') || '';
  const trimmed = file.trim();
  if (trimmed[0] === '[' && trimmed[1] !== ']' && /^\[\s*\{/.test(trimmed)) {
    let data;
    try { data = JSON.parse(trimmed); } catch (e) { return null; }
    return { folders: flatten(data, [], []) };
  }
  if (trimmed[0] === '#') return null; // зашифрований плеєр — не підтримується
  return { file: trimmed, subtitle };
}

class TinyCache {
  constructor(ttl) { this.ttl = ttl; this.map = new Map(); }
  async wrap(key, fn) {
    const e = this.map.get(key);
    if (e && Date.now() < e.exp) return e.v;
    const v = await fn();
    if (this.map.size > 500) this.map.delete(this.map.keys().next().value);
    this.map.set(key, { v, exp: Date.now() + this.ttl });
    return v;
  }
}

// fetchText(url, { xhr, referer }) → Promise<string>; searchSite(query) → Promise<[{id,url,title}]>
// name — назва сайту (група за замовчуванням); anyPlayer — дозволити плеєри з будь-яких хостів
// (на пристрої з Lampa; сервер обмежується відомими плеєрами).
function createOnline({ host, fetchText, searchSite, name = 'UAKino', anyPlayer = false }) {
  const cache = new TinyCache(20 * 60 * 1000);
  host = host.replace(/\/+$/, '');

  function checkUrl(url, players) {
    let u;
    try { u = new URL(url); } catch (e) { throw Object.assign(new Error('bad url'), { status: 400 }); }
    const own = u.hostname.replace(/^www\./, '') === new URL(host).hostname.replace(/^www\./, '');
    const ok = own || (players && (anyPlayer || PLAYER_HOSTS.test(u.hostname)));
    if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), { status: 403 });
    return u.toString();
  }

  // HTML сторінок, відкритих під час пошуку (щоб не завантажувати вдруге).
  const htmlCache = new Map();

  async function pageHtml(url) {
    if (htmlCache.has(url)) return htmlCache.get(url);
    const html = await fetchText(url, {});
    if (htmlCache.size > 50) htmlCache.delete(htmlCache.keys().next().value);
    htmlCache.set(url, html);
    return html;
  }

  // Сторінки, що точно відповідають фільму. Неточні збіги («Ходячі мерці: Деріл Діксон» замість
  // «Ходячі мерці») лишаються лише якщо точних немає. Однакові назви («Керрі» 1976, 2013 і серіал
  // 2026) розрізняються за типом і роком зі сторінки.
  // serial: true/false — шукаємо серіал/фільм; не задано — тип не перевіряється.
  async function findPages({ title = '', original = '', query = '', year = null, serial }) {
    const variants = parse.titleVariants([title, original, query]);
    const titles = variants.match;
    const found = new Map();
    let lastError = null;
    for (const q of variants.search) {
      try {
        for (const item of await searchSite(q)) {
          if (!found.has(item.id)) {
            found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles), season: seasonOf(item.title) || seasonOf(item.url), year: parse.yearOf(item) }));
          }
        }
      } catch (e) { lastError = e; }
    }
    if (!found.size && lastError) throw lastError;

    let list = Array.from(found.values()).filter((p) => p.score >= 50);
    const best = list.reduce((m, p) => Math.max(m, p.score), 0);
    list = list.filter((p) => p.score === best);

    // «Король Талси 2», «Король Талси 4» — номер сезону цифрою в кінці назви (UASerials).
    if (serial) {
      const qs = titles.map(parse.baseTitle);
      list.forEach((p) => {
        if (p.season) return;
        parse.altNames(p).some((n) => {
          const m = parse.baseTitle(n).match(/^(.*\S)\s+(\d{1,2})$/);
          if (m && qs.indexOf(m[1]) >= 0) { p.season = Number(m[2]); return true; }
          return false;
        });
      });
    }

    // Тип і рік зі сторінок кандидатів (для однакових назв, або якщо рік у картці не вказано).
    const y = Number(year) || 0;
    if (y || list.length > 1) {
      await Promise.all(list.slice(0, 8).map(async (p) => {
        try {
          const meta = parse.pageMeta(await pageHtml(p.url), p.url);
          p.type = meta.type;
          if (meta.year) p.year = meta.year;
        } catch (e) {
          p.type = parse.pageMeta('', p.url).type; // хоча б з адреси (/movie-…, /serials/…)
        }
      }));
      // Решту кандидатів не відкриваємо — тип лише з адреси.
      list.slice(8).forEach((p) => { p.type = parse.pageMeta('', p.url).type; });
      list = list.filter((p) => {
        if (p.type && serial !== undefined && serial !== null && p.type !== (serial ? 'serial' : 'film')) return false;
        if (y && p.year) {
          // Сторінка пізнішого сезону («(Сезон 3)», «Король Талси 4») може мати пізніший рік, але не раніший
          // за прем'єру; сторінка всього серіалу чи 1-го сезону — рік прем'єри (Ван Піс 1999 ≠ Ван Піс 2023).
          const laterSeason = serial && p.season > 1;
          if (laterSeason ? p.year < y - 1 : Math.abs(p.year - y) > 1) return false;
        }
        return true;
      });
    }

    const seen = {};
    list = list.filter((p) => {
      const key = parse.baseTitle(parse.altNames(p)[0]) + '|' + (p.season || 0) + '|' + (p.year || '');
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
    list.sort((a, b) => (a.season || 0) - (b.season || 0) || (a.year || 0) - (b.year || 0));
    return list.map(({ id, url, title: t, original: o, poster, season, score, year: py }) => ({ id, url, title: t, original: o || '', poster, season, score, year: py }));
  }

  async function stream(url, referer) {
    url = checkUrl(url, true);
    return cache.wrap('stream:' + url, async () => {
      const html = await fetchText(url, { referer: referer || host + '/' });
      const p = parsePlayerjs(html);
      // Сторінка серії на самому сайті (UAFlix): шукаємо на ній плеєр.
      if (!p && new URL(url).hostname === new URL(host).hostname) return streamFromPage(url, html);
      if (!p) throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), { status: 404 });
      if (p.folders) {
        return {
          items: p.folders.map((f) => ({
            group: f.path.filter((x) => !seasonOf(x)).map((x) => x.trim()).join(' / ') || name,
            season: seasonOf(f.path.join(' ')),
            title: f.title,
            episode: episodeOf(f.title),
            stream: toStream(f.file, f.subtitle),
          })).filter((i) => i.stream),
        };
      }
      const s = toStream(p.file, p.subtitle);
      if (!s) throw Object.assign(new Error('порожнє посилання на відео'), { status: 404 });
      return s;
    });
  }

  async function streamFromPage(url, html) {
    const players = parsePlayers(html, host, anyPlayer);
    const errors = [];
    for (const src of players.iframes.slice(0, 6)) {
      if (new URL(src).hostname === new URL(host).hostname) continue;
      try {
        const s = await stream(src, url);
        return s.items && s.items.length ? s.items[0].stream : s;
      } catch (e) {
        errors.push(new URL(src).hostname + ': ' + e.message);
      }
    }
    if (/пройдіть\s+авторизацію|змініть\s+країну/i.test(parse.stripTags(html))) {
      // UAFlix віддає плеєр серії лише гостям з українських IP (або після входу). Фільми ж мають
      // посилання на плеєр ще й у og:video, тому вони працюють навіть через Worker (LG / Media Station X).
      throw Object.assign(new Error(name + ': для цієї серії сайт показує лише трейлер — серії він відкриває тільки з українського IP або після входу в акаунт'), { status: 403 });
    }
    throw Object.assign(new Error(name + ': плеєр на сторінці серії не знайдено (' + (errors.join('; ') || 'iframe/хости: ' + (players.seen.join(', ') || 'немає')) + ')'), { status: 404 });
  }

  async function loadPage(url) {
    url = checkUrl(url, false);
    return cache.wrap('page:' + url, async () => {
      const html = await pageHtml(url);
      const page = parse.parsePage(html, url, host);
      const season = seasonOf(page.title);
      const players = parsePlayers(html, host, anyPlayer);
      let items = [];
      let playlistError = '';

      if (players.playlist) {
        try {
          // Новіші DLE (AniTube) вимагають ключ сторінки user_hash = dle_login_hash.
          const userHash = (html.match(/dle_login_hash\s*=\s*['"]([^'"]+)['"]/) || [])[1];
          const ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) +
            '&xfield=' + encodeURIComponent(players.playlist.xfield) + (userHash ? '&user_hash=' + userHash : '') + '&time=' + Date.now();
          const text = await fetchText(ajax, { xhr: true, referer: url });
          let body = text;
          try {
            const data = JSON.parse(text);
            body = data && data.success !== false ? String(data.response || '') : '';
            if (data && data.success === false) playlistError = 'плейлист: ' + (data.message || 'відмова сайту');
          } catch (e) { /* відповідь — сирий HTML */ }
          items = parsePlaylist(body, host)
            .filter((ep) => !/трейлер|trailer/i.test(ep.group + ' ' + ep.title))
            .map((ep) => ({ group: ep.group, season, title: ep.title, episode: episodeOf(ep.title), url: ep.file }));
        } catch (e) {
          if (!players.iframes.length) throw e;
        }
      }

      // Серії на окремих сторінках (UAFlix): збираємо з усіх сезонів.
      if (!items.length) {
        const found = parseEpisodeLinks(html, host, url);
        let episodes = found.episodes;
        for (const sp of found.seasonPages.slice(0, 20)) {
          if (sp === url) continue;
          try { episodes = episodes.concat(parseEpisodeLinks(await pageHtml(sp), host, url).episodes); } catch (e) { /* сезон пропускаємо */ }
        }
        const seenEp = {};
        episodes = episodes.filter((e) => (seenEp[e.url] ? false : (seenEp[e.url] = true)));
        episodes.sort((a, b) => a.season - b.season || a.episode - b.episode);
        items = episodes.map((e) => ({
          group: name,
          season: e.season,
          episode: e.episode,
          title: 'Серія ' + e.episode + (e.label ? ' · ' + e.label : ''),
          url: e.url,
        }));
      }

      const errors = [];
      // Плеєр прямо на сторінці (Playerjs без iframe).
      if (!items.length) {
        const inline = parsePlayerjs(html);
        if (inline && inline.folders) {
          items = inline.folders.map((f) => ({ group: f.path.filter((x) => !seasonOf(x)).map((x) => x.trim()).join(' / ') || name, season: seasonOf(f.path.join(' ')) || season, title: f.title, episode: episodeOf(f.title), stream: toStream(f.file, f.subtitle) })).filter((i) => i.stream);
        } else if (inline) {
          const st = toStream(inline.file, inline.subtitle);
          if (st) items.push({ group: name, season, title: page.title, episode: null, stream: st });
        }
      }

      if (!items.length) {
        let n = 0;
        for (const src of players.iframes.slice(0, 6)) {
          n++;
          try {
            const s = await stream(src, url);
            const group = players.iframes.length > 1 ? name + ' · плеєр ' + n : name;
            if (s.items) items = items.concat(s.items.map((i) => Object.assign({}, i, { group: i.group === name ? group : i.group, season: i.season || season })));
            else items.push({ group, season, title: page.title, episode: null, stream: s });
          } catch (e) {
            errors.push(new URL(src).hostname + ': ' + e.message);
          }
        }
      }

      if (!items.length) {
        const onlyTrailer = players.seen.length > 0 && players.seen.every((h) => /youtube|youtu\.be/i.test(h));
        // UAFlix та інші: замість плеєра — трейлер і прохання увійти/змінити країну.
        if (/пройдіть\s+авторизацію|змініть\s+країну|увійдіть,?\s+щоб\s+дивитис|доступн\w*\s+лише\s+(для\s+)?зареєстрован/i.test(parse.stripTags(html))) {
          throw Object.assign(new Error(name + ': сайт показує лише трейлер — відео доступне тільки з українського IP або після входу в акаунт'), { status: 403 });
        }
        if (onlyTrailer || /soon-tv|скоро\s+(на\s+сайті|вийде)|очікуєм/i.test(html)) {
          throw Object.assign(new Error(name + ': на сторінці поки лише трейлер — серії з озвучкою ще не вийшли'), { status: 404 });
        }
        // Підказка для діагностики: що взагалі є на сторінці.
        const diag = [];
        if (playlistError) diag.push(playlistError);
        if (errors.length) diag.push(errors.slice(0, 3).join('; '));
        else if (players.iframes.length) diag.push('плеєри: ' + players.iframes.length);
        diag.push('iframe/хости: ' + (players.seen.length ? players.seen.slice(0, 6).join(', ') : 'немає'));
        if (/Playerjs/i.test(html)) diag.push('є Playerjs');
        throw Object.assign(new Error(name + ': відео на сторінці не знайдено (' + diag.join('; ') + ')'), { status: 404 });
      }

      return { url, title: page.title, original: page.original, year: page.year, poster: page.poster, season, items };
    });
  }

  // Спільний обробник для /online/* (Node-сервер і Worker) — повертає об'єкт для JSON.
  async function route(pathname, params) {
    if (pathname === '/online/search') {
      const serial = params.get('serial');
      return { pages: await findPages({
        title: params.get('title') || '',
        original: params.get('original') || params.get('title_original') || '',
        query: params.get('query') || params.get('Query') || '',
        year: params.get('year') || null,
        serial: serial === null || serial === '' ? undefined : serial === '1' || serial === 'true',
      }) };
    }
    if (pathname === '/online/page') return loadPage(params.get('url') || '');
    if (pathname === '/online/stream') return stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : '');
    return null;
  }

  return { findPages, loadPage, stream, route };
}

module.exports = { parseEpisodeLinks, createOnline, parsePlayers, parsePlaylist, parsePlayerjs, parseQualities, parseSubtitles, toStream, seasonOf, episodeOf };

  }],
  "lib/search.js": [{"./parse":"lib/parse.js"}, function (module, exports, require) {
'use strict';

// Пошук на DLE-сайті uakino. Спершу POST (так шле запит сама форма пошуку на сайті), потім GET;
// помилка одного способу не зупиняє інший. Якщо нічого не знайдено — пробує коротший запит
// («Fall 2: Deadpoint» → «Fall 2»).
//
// Для сайтів не на DLE (source.searchPath) — один GET-запит.
// fetchText(url, { method, body }) → Promise<string>

const parse = require('./parse');

function simplify(q) {
  return q.split(/[:–—(]/)[0].replace(/[^0-9a-zA-ZÀ-ɏЀ-ӿ ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

async function searchDle(host, query, fetchText, source) {
  source = source || {};
  const q = String(query || '').trim();
  if (q.length < 2) return [];
  const queries = [q];
  const short = simplify(q);
  if (short.length >= 3 && short.toLowerCase() !== q.toLowerCase()) queries.push(short);

  const errors = [];
  let ok = false;
  for (const story of queries) {
    const attempts = source.searchPath ? [['GET', host + source.searchPath + encodeURIComponent(story), null]] : [
      ['POST', host + '/index.php?do=search', 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(story)],
      ['GET', host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(story), null],
    ];
    for (const [method, url, body] of attempts) {
      try {
        const list = parse.parseList(await fetchText(url, method === 'POST' ? { method, body } : {}), host, source.linkRe);
        ok = true;
        if (list.length) return list;
      } catch (e) {
        errors.push(method + ': ' + e.message);
      }
    }
  }
  if (!ok) {
    const err = new Error('пошук не вдався (' + errors.join('; ') + ')');
    err.status = 502;
    throw err;
  }
  return [];
}

module.exports = { searchDle, simplify };

  }],
  "lib/accounts.js": [{"./parse":"lib/parse.js","./bencode":"lib/bencode.js"}, function (module, exports, require) {
'use strict';

// Вхід на сайти з акаунтом (UAFlix — для LG/Worker, Толока) і пошук/завантаження .torrent з Толоки.
// Працює в Worker і Node: потрібні fetch з redirect: 'manual' і доступ до Set-Cookie,
// яких плагін на пристрої (Lampa на Android) не має — тому вхід іде через Worker.

const parse = require('./parse');
const { parseTorrent } = require('./bencode');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

const SITES = {
  // UAFlix показує плеєр гостям лише з українських IP; через Worker (LG / Media Station X) потрібен вхід.
  uaflix: {
    name: 'UAFlix',
    host: 'https://uafix.net',
    loginUrl: (h) => h + '/',
    form: (login, password) => ({ login_name: login, login_password: password, login: 'submit' }),
    // DLE: успішний вхід ставить dle_user_id (не 0) і dle_password.
    ok: (c) => /dle_user_id=[1-9]/.test(c) && /dle_password=[^;]+/.test(c),
  },
  toloka: {
    name: 'Толока',
    host: 'https://toloka.to',
    loginUrl: (h) => h + '/login.php',
    form: (login, password) => ({ username: login, password, autologin: 'on', ssl: 'on', redirect: '', login: 'Вхід' }),
    // phpBB: cookie toloka_data — серіалізований масив з userid (у гостя -1); або переадресація не на login.php.
    ok: (c, res) => {
      const data = (c.match(/toloka_data=([^;]+)/) || [])[1];
      if (data) {
        let text = data;
        try { text = decodeURIComponent(data); } catch (e) { /* як є */ }
        const id = text.match(/userid";(?:s:\d+:"|i:)(-?\d+)/);
        if (id) return Number(id[1]) > 0;
      }
      const loc = res.headers.get('location') || '';
      return res.status >= 300 && res.status < 400 && !!loc && !/login\.php/.test(loc) && /toloka_(sid|data)=/.test(c);
    },
  },
};

function setCookies(res) {
  const h = res.headers;
  let list = [];
  if (typeof h.getSetCookie === 'function') list = h.getSetCookie();
  else if (typeof h.getAll === 'function') list = h.getAll('set-cookie');
  else if (h.get('set-cookie')) list = h.get('set-cookie').split(/,(?=\s*[A-Za-z0-9_-]+=)/);
  const jar = {};
  list.forEach((line) => {
    const pair = line.split(';')[0];
    const i = pair.indexOf('=');
    if (i <= 0) return;
    const name = pair.slice(0, i).trim();
    const value = pair.slice(i + 1).trim();
    if (!value || value === 'deleted') delete jar[name];
    else jar[name] = value;
  });
  return jar;
}

function cookieString(jar) {
  return Object.keys(jar).map((k) => k + '=' + jar[k]).join('; ');
}

// Повертає { ok, cookie, error }.
async function login(site, user, password, { host, fetchImpl = fetch } = {}) {
  const def = SITES[site];
  if (!def) return { ok: false, error: 'невідомий сайт: ' + site };
  if (!user || !password) return { ok: false, error: 'вкажіть логін і пароль' };
  const base = (host || def.host).replace(/\/+$/, '');
  const res = await fetchImpl(def.loginUrl(base), {
    method: 'POST',
    redirect: 'manual',
    headers: { 'User-Agent': UA, 'Content-Type': 'application/x-www-form-urlencoded', Referer: base + '/' },
    body: new URLSearchParams(def.form(user, password)).toString(),
  });
  const jar = setCookies(res);
  const cookie = cookieString(jar);
  if (def.ok(cookie, res)) return { ok: true, cookie };
  return { ok: false, error: def.name + ': невірний логін або пароль (сайт не підтвердив вхід)' };
}

// ---------- Толока ----------

function num(s) {
  const m = String(s || '').replace(/\s/g, '').match(/\d+/);
  return m ? Number(m[0]) : 0;
}

function sizeBytes(text) {
  const m = String(text || '').replace(',', '.').match(/(\d+(?:\.\d+)?)\s*(TB|GB|MB|KB|ТБ|ГБ|МБ|КБ|B)\b/i);
  if (!m) return 0;
  const unit = m[2].toUpperCase().replace('ТБ', 'TB').replace('ГБ', 'GB').replace('МБ', 'MB').replace('КБ', 'KB');
  const pow = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 }[unit] || 0;
  return Math.round(Number(m[1]) * Math.pow(1024, pow));
}

// Рядки результатів tracker.php: посилання на тему (viewtopic.php?t=) і на .torrent (download.php?id=).
function parseTolokaResults(html, host) {
  const out = [];
  const rows = html.split(/<tr\b/i).slice(1);
  for (const row of rows) {
    const topic = row.match(/<a\b[^>]*href=["'](?:\.\/)?(viewtopic\.php\?t=(\d+))["'][^>]*>([\s\S]*?)<\/a>/i);
    const dl = row.match(/href=["'](?:\.\/)?(download\.php\?id=(\d+))["'][^>]*>([\s\S]*?)<\/a>/i);
    if (!topic || !dl) continue;
    const cells = row.split(/<td\b/i).slice(1).map((c) => '<td' + c);
    const cellText = cells.map((c) => parse.stripTags(c));
    const seedCell = cells.find((c) => /class=["'][^"']*seed/i.test(c));
    const leechCell = cells.find((c) => /class=["'][^"']*leech/i.test(c));
    const sizeText = parse.stripTags(dl[3]) + ' ' + cellText.join(' ');
    const date = (row.match(/(\d{4}-\d{2}-\d{2})/) || [])[1] || null;
    out.push({
      id: dl[2],
      topic: topic[2],
      title: parse.stripTags(topic[3]),
      details: host + '/' + topic[1],
      download: host + '/' + dl[1],
      size: sizeBytes(sizeText),
      seeders: seedCell ? num(parse.stripTags(seedCell)) : 0,
      leechers: leechCell ? num(parse.stripTags(leechCell)) : 0,
      date,
    });
  }
  return out;
}

async function tolokaSearch(query, cookie, { host = SITES.toloka.host, fetchImpl = fetch } = {}) {
  const url = host + '/tracker.php?nm=' + encodeURIComponent(query);
  const res = await fetchImpl(url, { headers: { 'User-Agent': UA, Cookie: cookie || '', Referer: host + '/' } });
  if (!res.ok) throw Object.assign(new Error('Толока: HTTP ' + res.status), { status: 502 });
  const html = await res.text();
  const results = parseTolokaResults(html, host);
  // Гість: у меню посилання «Вхід» (login.php) і немає «Вихід»/logout.
  if (!results.length && /href=["'][^"']*login\.php["']/i.test(html) && !/logout|>\s*Вихід/i.test(html)) {
    throw Object.assign(new Error('Толока: вхід не виконано — перевірте логін і пароль у налаштуваннях UAKino'), { status: 401 });
  }
  return results;
}

async function tolokaTorrent(id, cookie, { host = SITES.toloka.host, fetchImpl = fetch } = {}) {
  const res = await fetchImpl(host + '/download.php?id=' + encodeURIComponent(id), {
    headers: { 'User-Agent': UA, Cookie: cookie || '', Referer: host + '/' },
  });
  const buf = new Uint8Array(await res.arrayBuffer());
  if (!res.ok || buf[0] !== 0x64) throw Object.assign(new Error('Толока: не вдалося завантажити .torrent (потрібен вхід?)'), { status: 502 });
  return buf;
}

// Результати у форматі Jackett (як у парсерів Lampa). Link — .torrent через Worker (з cookie).
function tolokaToJackett(r, base, cookie) {
  return {
    Tracker: 'Toloka',
    TrackerId: 'toloka',
    Title: r.title,
    Details: r.details,
    Link: base + '/toloka/torrent?id=' + encodeURIComponent(r.id) + '&cookie=' + encodeURIComponent(cookie || ''),
    Size: r.size,
    Seeders: r.seeders,
    Peers: r.leechers,
    PublishDate: r.date ? new Date(r.date + 'T00:00:00Z').toISOString() : new Date().toISOString(),
    CategoryDesc: /сезон|серії|серія|season/i.test(r.title) ? 'TV' : 'Movies',
  };
}

// Спільні маршрути для Worker і Node-сервера: /login, /toloka/search, /toloka/torrent.
// Повертає { json } або { torrent, name } або null (маршрут не наш).
async function route(pathname, params, base, fetchImpl) {
  if (pathname === '/login') {
    return { json: await login(params.get('site'), params.get('login'), params.get('password'), { fetchImpl }) };
  }
  if (pathname === '/toloka/search') {
    const cookie = params.get('cookie') || '';
    const queries = [params.get('q'), params.get('q2')].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
    const seen = {};
    const results = [];
    for (const q of queries) {
      for (const r of await tolokaSearch(q, cookie, { fetchImpl })) {
        if (seen[r.id]) continue;
        seen[r.id] = true;
        results.push(tolokaToJackett(r, base, cookie));
      }
    }
    return { json: { Results: results } };
  }
  if (pathname === '/toloka/torrent') {
    const buf = await tolokaTorrent(params.get('id'), params.get('cookie') || '', { fetchImpl });
    let name = 'toloka-' + params.get('id') + '.torrent';
    try { name = (await parseTorrent(buf)).name + '.torrent'; } catch (e) { /* лишаємо id */ }
    return { torrent: buf, name };
  }
  return null;
}

module.exports = { SITES, login, setCookies, parseTolokaResults, tolokaSearch, tolokaTorrent, tolokaToJackett, sizeBytes, route };

  }],
  "lib/proxy.js": [{"./sources":"lib/sources.js"}, function (module, exports, require) {
'use strict';

// Проксі для пристроїв, де Lampa працює як веб-сторінка (LG webOS / Media Station X, браузер):
// там діє CORS і плагін не може напряму читати сайти. Worker робить запит і повертає текст з CORS.
// Дозволені лише сайти-джерела та їхні плеєри — це не відкритий проксі.

const { SOURCES } = require('./sources');

const PLAYERS = ['ashdi.vip', 'tortuga.wtf', 'tortuga.tw', 'zetvideo.net', 'hdvbua.pro', 'uacdn.online', 'moonanime.art', 'csst.online'];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

function allowed(hostname) {
  const h = String(hostname || '').toLowerCase().replace(/^www\./, '');
  const sites = SOURCES.map((s) => new URL(s.host).hostname.replace(/^www\./, ''));
  return sites.concat(PLAYERS).some((d) => h === d || h.slice(-(d.length + 1)) === '.' + d);
}

// params: url, referer, xhr=1; body — для POST (форма пошуку DLE).
// Повертає { status, body, type }.
async function proxy(params, body, fetchImpl = fetch) {
  let target;
  try { target = new URL(params.get('url') || ''); } catch (e) { return { status: 400, body: 'bad url', type: 'text/plain' }; }
  if (!/^https?:$/.test(target.protocol) || !allowed(target.hostname)) return { status: 403, body: 'host is not allowed', type: 'text/plain' };
  const headers = {
    'User-Agent': UA,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
    Referer: params.get('referer') || target.origin + '/',
  };
  if (params.get('xhr')) headers['X-Requested-With'] = 'XMLHttpRequest';
  // Cookie входу користувача (UAFlix) — лише до того самого сайту, з якого його отримали.
  if (params.get('cookie')) headers.Cookie = params.get('cookie');
  if (body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  const res = await fetchImpl(target.toString(), { method: body ? 'POST' : 'GET', headers, body: body || undefined, redirect: 'follow' });
  return { status: res.status, body: await res.text(), type: res.headers.get('content-type') || 'text/html; charset=utf-8' };
}

module.exports = { proxy, allowed, PLAYERS };

  }],
  "lib/sources.js": [{}, function (module, exports, require) {
'use strict';

// Сайти з українською озвучкою. host можна змінити в налаштуваннях плагіна (дзеркала).
//   linkRe     — шлях сторінки фільму, якщо сайт не на DLE (там це /12345-slug.html)
//   searchPath — GET-пошук, якщо сайт не використовує стандартну форму DLE
//   torrents   — на сайті є .torrent
const SOURCES = [
  { id: 'uakino', name: 'UAKino', host: 'https://uakino.best', torrents: true },
  { id: 'uaserials', name: 'UASerials', host: 'https://uaserials.my' },
  { id: 'uaflix', name: 'UAFlix', host: 'https://uafix.net', linkRe: /^\/(?!page\/|tags\/|xfsearch\/|user\/|index)[a-z-]+\/[a-z0-9-]+\/$/ },
  { id: 'eneyida', name: 'Eneyida', host: 'https://eneyida.tv' },
  { id: 'uaserial', name: 'UASerial', host: 'https://uaserial.tv', searchPath: '/search?query=', linkRe: /^\/(movie|serial|series|cartoon|anime|show)-[^/]+$/ },
  // Аніме українською.
  { id: 'anitube', name: 'AniTube', host: 'https://anitube.in.ua', anime: true },
  { id: 'animeua', name: 'AnimeUA', host: 'https://animeua.club', anime: true },
];

function getSource(id) {
  return SOURCES.filter((s) => s.id === id)[0] || null;
}

module.exports = { SOURCES, getSource };

  }],
};
var __cache = {};
function __load(id) {
  if (__cache[id]) return __cache[id].exports;
  var mod = __modules[id];
  var module = (__cache[id] = { exports: {} });
  mod[1](module, module.exports, function (spec) {
    if (!mod[0][spec]) throw new Error('module not bundled: ' + spec);
    return __load(mod[0][spec]);
  });
  return module.exports;
}

export default __load("worker/src.js");
