'use strict';

// Збирання: node build.js
//   dist/uakino.js         — плагін Lampa разом з lib/ (парсинг uakino прямо на пристрої), ES5
// Потрібно: npm install (Babel для компіляції плагіна в ES5).
//   worker/dist/worker.mjs — Cloudflare Worker одним файлом (можна вставити в редактор на dash.cloudflare.com)

const fs = require('fs');
const path = require('path');

const root = __dirname;

function resolve(from, spec) {
  let p = path.posix.normalize(path.posix.join(path.posix.dirname(from), spec));
  if (!p.endsWith('.js')) p += '.js';
  return p;
}

// Мінімальний збирач CommonJS-модулів: повертає код, що визначає __load(id).
function bundle(entry) {
  const modules = new Map();
  (function collect(id) {
    if (modules.has(id)) return;
    const code = fs.readFileSync(path.join(root, id), 'utf8');
    const deps = {};
    modules.set(id, { code, deps });
    const re = /require\((['"])(\.{1,2}\/[^'"]+)\1\)/g;
    let m;
    while ((m = re.exec(code))) {
      deps[m[2]] = resolve(id, m[2]);
      collect(deps[m[2]]);
    }
  })(entry);

  let out = 'var __modules = {\n';
  for (const [id, { code, deps }] of modules) {
    out += '  ' + JSON.stringify(id) + ': [' + JSON.stringify(deps) + ', function (module, exports, require) {\n' + code + '\n  }],\n';
  }
  out += '};\n';
  out += `var __cache = {};
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
`;
  return { code: out, count: modules.size };
}

function write(file, code) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), code);
  console.log(file + ': ' + Buffer.byteLength(code) + ' bytes');
}

// 1. Плагін
const lib = bundle('lib/client.js');
const pluginSource = fs.readFileSync(path.join(root, 'plugin', 'uakino.js'), 'utf8');
// Старі ТВ (Android WebView, Tizen, webOS) не розуміють сучасний JS — у Lampa це дає «Script error».
// Тому плагін компілюється в ES5 (як і сама Lampa) з кількома поліфілами.
const POLYFILLS = `
if (!Array.from) Array.from = function (src, fn) {
  var out = [];
  if (src && typeof src.length !== 'number' && typeof Symbol !== 'undefined' && src[Symbol.iterator]) {
    var it = src[Symbol.iterator](), step;
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
// Старий webOS (LG через Media Station X): Map без values()/keys() — «found.values() is not a function».
// Тоді плагін бере власний Map (лише для себе — глобальний Map Lampa не чіпаємо).
var Map = (function (Native) {
  try {
    var t = new Native();
    t.set('a', 1);
    if (typeof t.values === 'function' && typeof t.keys === 'function' && typeof t.forEach === 'function' && Array.from(t.values())[0] === 1) return Native;
  } catch (e) { /* свій */ }
  function list(arr) {
    var i = 0;
    arr.next = function () { return i < arr.length ? { value: arr[i++], done: false } : { value: undefined, done: true }; };
    return arr;
  }
  function M() { this._k = []; this._v = []; this.size = 0; }
  M.prototype.indexOf = function (k) { for (var i = 0; i < this._k.length; i++) if (this._k[i] === k) return i; return -1; };
  M.prototype.has = function (k) { return this.indexOf(k) >= 0; };
  M.prototype.get = function (k) { var i = this.indexOf(k); return i >= 0 ? this._v[i] : undefined; };
  M.prototype.set = function (k, v) { var i = this.indexOf(k); if (i >= 0) this._v[i] = v; else { this._k.push(k); this._v.push(v); this.size++; } return this; };
  M.prototype['delete'] = function (k) { var i = this.indexOf(k); if (i < 0) return false; this._k.splice(i, 1); this._v.splice(i, 1); this.size--; return true; };
  M.prototype.clear = function () { this._k = []; this._v = []; this.size = 0; };
  M.prototype.keys = function () { return list(this._k.slice()); };
  M.prototype.values = function () { return list(this._v.slice()); };
  M.prototype.entries = function () { var o = []; for (var i = 0; i < this._k.length; i++) o.push([this._k[i], this._v[i]]); return list(o); };
  M.prototype.forEach = function (fn, self) { var k = this._k.slice(), v = this._v.slice(); for (var i = 0; i < k.length; i++) fn.call(self, v[i], k[i], this); };
  return M;
})(typeof Map === 'function' ? Map : function () { throw new Error('no Map'); });
// Так само URL: старі WebKit його не мають. Плагіну потрібні лише абсолютні http(s)-адреси.
var URL = (function (Native) {
  try { if (new Native('https://a.b:81/c?d#e').hostname === 'a.b') return Native; } catch (e) { /* свій */ }
  function U(href) {
    var m = String(href).match(/^([a-z][a-z0-9+.-]*:)\\/\\/([^\\/?#]*)([^?#]*)(\\?[^#]*)?(#.*)?$/i);
    if (!m || !m[2]) throw new TypeError('Invalid URL: ' + href);
    this.protocol = m[1].toLowerCase();
    this.host = m[2];
    this.pathname = m[3] || '/';
    this.search = m[4] && m[4] !== '?' ? m[4] : '';
    this.hash = m[5] && m[5] !== '#' ? m[5] : '';
  }
  Object.defineProperty(U.prototype, 'host', {
    get: function () { return this.hostname + (this.port ? ':' + this.port : ''); },
    set: function (h) { var p = String(h).split(':'); this.hostname = p[0].toLowerCase(); this.port = p[1] || ''; }
  });
  Object.defineProperty(U.prototype, 'origin', { get: function () { return this.protocol + '//' + this.host; } });
  Object.defineProperty(U.prototype, 'href', { get: function () { return this.toString(); } });
  U.prototype.toString = function () { return this.protocol + '//' + this.host + (this.pathname || '/') + this.search + this.hash; };
  return U;
})(typeof URL === 'function' ? URL : function () { throw new Error('no URL'); });
`;

const modern = '(function () {\n' + POLYFILLS +
  'var UAKinoLib = (function () {\n' + lib.code + 'return __load("lib/client.js");\n})();\n' +
  pluginSource +
  '})();\n';

const babel = require('@babel/core');
const es5 = babel.transformSync(modern, {
  babelrc: false,
  configFile: false,
  sourceType: 'script',
  comments: false,
  presets: [[require.resolve('@babel/preset-env'), { targets: { chrome: '38' }, modules: false }]],
}).code;

// Хелпери Babel лишаються всередині власної функції, не засмічуючи window.
const plugin = '/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/ (ES5). Не редагуйте вручну. */\n' +
  '(function () {\n' + es5 + '\n})();\n';
write('dist/uakino.js', plugin);

// 2. Worker
const worker = bundle('worker/src.js');
write('worker/dist/worker.mjs',
  '// Згенеровано build.js — не редагуйте вручну.\n' +
  '// UAKino → Lampa: парсер uakino.best для Cloudflare Workers.\n\n' +
  'const __PLUGIN_SOURCE__ = ' + JSON.stringify(plugin) + ';\n\n' +
  worker.code + '\nexport default __load("worker/src.js");\n');
