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
