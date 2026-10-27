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
  if (body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  const res = await fetchImpl(target.toString(), { method: body ? 'POST' : 'GET', headers, body: body || undefined, redirect: 'follow' });
  return { status: res.status, body: await res.text(), type: res.headers.get('content-type') || 'text/html; charset=utf-8' };
}

module.exports = { proxy, allowed, PLAYERS };
