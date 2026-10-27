/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/. Не редагуйте вручну. */
(function () {
var UAKinoLib = (function () {
var __modules = {
  "lib/client.js": [{"./parse":"lib/parse.js","./online":"lib/online.js","./jackett":"lib/jackett.js"}, function (module, exports, require) {
'use strict';

// Клієнт uakino, що працює прямо на пристрої з Lampa (ТВ, приставка, телефон):
// сайт бачить домашній IP, тому Cloudflare його пропускає. Вбудовується в плагін під час збирання.
//
// fetchText(url, { method, body, xhr, referer }) → Promise<string>

const parse = require('./parse');
const { createOnline } = require('./online');
const { toJackett } = require('./jackett');

function createClient({ host, fetchText, maxPages = 5 }) {
  host = String(host || 'https://uakino.best').replace(/\/+$/, '');
  const searches = new Map();
  const pages = new Map();

  async function searchSite(query) {
    const q = String(query || '').trim();
    if (q.length < 2) return [];
    const key = q.toLowerCase();
    if (searches.has(key)) return searches.get(key);
    let list = parse.parseList(await fetchText(host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(q), {}), host);
    if (!list.length) {
      const body = 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(q);
      try {
        list = parse.parseList(await fetchText(host + '/index.php?do=search', { method: 'POST', body }), host);
      } catch (e) { /* лишаємо порожній список */ }
    }
    searches.set(key, list);
    return list;
  }

  async function page(url) {
    if (!pages.has(url)) pages.set(url, parse.parsePage(await fetchText(url, {}), url, host));
    return pages.get(url);
  }

  // Торенти у форматі Jackett. Link веде прямо на uakino — .torrent завантажує TorrServer.
  async function torrents({ title = '', original = '', query = '', year = null }) {
    const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    if (!titles.length) return [];
    const found = new Map();
    let lastError = null;
    for (const q of titles) {
      try {
        for (const item of await searchSite(q)) {
          if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles) }));
        }
      } catch (e) { lastError = e; }
    }
    if (!found.size && lastError) throw lastError;

    let list = Array.from(found.values()).sort((a, b) => b.score - a.score);
    const relevant = list.filter((c) => c.score >= 40);
    if (relevant.length) list = relevant;
    list = list.slice(0, maxPages);

    const loaded = await Promise.all(list.map((c) => page(c.url).catch(() => null)));
    const out = [];
    loaded.forEach((p) => {
      if (!p) return;
      p.torrents.forEach((t) => {
        const r = toJackett({ page: p, torrent: t, meta: null, peers: null }, '');
        r.Link = t.url;
        out.push(r);
      });
    });
    if (year) {
      const y = Number(year);
      const yearOf = (r) => { const m = r.Title.match(/\((\d{4})\)/); return m ? Number(m[1]) : y; };
      out.sort((a, b) => Math.abs(yearOf(a) - y) - Math.abs(yearOf(b) - y));
    }
    return out;
  }

  return { host, searchSite, torrents, online: createOnline({ host, fetchText, searchSite }) };
}

module.exports = { createClient };

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

// Список матеріалів зі сторінки пошуку або розділу.
function parseList(html, host) {
  const found = new Map();
  const re = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = attr(m[0], 'href');
    if (!href) continue;
    const url = localize(absoluteUrl(href, host), host);
    if (!url) continue;
    const id = newsId(url);
    if (!id) continue;

    const cls = attr(m[0], 'class') || '';
    let title = stripTags(m[2]);
    if (!title) {
      const img = m[2].match(/<img\b[^>]*>/i);
      if (img) title = decodeEntities(attr(img[0], 'alt') || attr(img[0], 'title') || '').trim();
    }
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
    found.set(id, item);
  }
  return Array.from(found.values()).filter((i) => i.title);
}

function parseYear(html) {
  const text = stripTags(html);
  const m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\s*:?\s*((?:19|20)\d{2})/i);
  if (m) return Number(m[1]);
  return null;
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

// Наскільки матеріал відповідає шуканим назвам: 100 — точно, 40+ — релевантно.
function scoreTitle(item, titles) {
  const t = normalizeTitle(item.title + ' ' + (item.original || ''));
  let best = 0;
  for (const raw of titles) {
    const q = normalizeTitle(raw);
    if (!q) continue;
    let s = 0;
    const base = normalizeTitle(item.title).replace(/\s*(сезон|season)\s*\d+.*$/, '').trim();
    if (base === q) s = 100;
    else if (t.indexOf(q) >= 0) s = 60;
    else if (q.indexOf(base) >= 0 && base.length > 3) s = 40;
    else {
      const words = q.split(' ').filter((w) => w.length > 2);
      const hit = words.filter((w) => t.indexOf(w) >= 0).length;
      if (words.length) s = Math.round((hit / words.length) * 30);
    }
    best = Math.max(best, s);
  }
  return best;
}

module.exports = { scoreTitle, decodeEntities, stripTags, absoluteUrl, localize, newsId, parseList, parsePage, parseSitemap, normalizeTitle };

  }],
  "lib/online.js": [{"./parse":"lib/parse.js"}, function (module, exports, require) {
'use strict';

// Онлайн-перегляд з uakino (як online_mod): плейлисти серій/озвучок і прямі посилання
// на відео з плеєрів ashdi (Playerjs). Код не залежить від Node — працює і в Workers.

const parse = require('./parse');

// Плеєри, які дозволено відкривати (захист від запитів на довільні адреси).
const PLAYER_HOSTS = /(^|\.)(ashdi\.vip|tortuga\.(wtf|tw)|uakino\.[a-z]+)$/i;

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
  const m = String(s || '').match(/сезон\s*(\d+)|(\d+)\s*сезон|season\s*(\d+)/i);
  return m ? Number(m[1] || m[2] || m[3]) : null;
}

function episodeOf(s) {
  const m = String(s || '').match(/(\d+)\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\s*(\d+)|^\s*(\d+)\b/i);
  return m ? Number(m[1] || m[2] || m[3]) : null;
}

// Блок плейлиста (серіали) та iframe-плеєри (фільми) на сторінці матеріалу.
function parsePlayers(html, host) {
  let playlist = null;
  const ajax = html.match(/<div\b[^>]*class=["'][^"']*playlists-ajax[^"']*["'][^>]*>/i);
  if (ajax) {
    const newsId = attr(ajax[0], 'data-news_id');
    if (newsId) playlist = { newsId, xfield: attr(ajax[0], 'data-xfname') || 'playlist' };
  }
  const iframes = [];
  const re = /<iframe\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);
    if (!src || iframes.indexOf(src) >= 0) continue;
    try {
      const h = new URL(src).hostname;
      if (!PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;
    } catch (e) { continue; }
    if (/youtube|trailer/i.test(src)) continue;
    iframes.push(src);
  }
  return { playlist, iframes };
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
    return { group: names.join(' / ') || 'UAKino', title: ep.title, file: ep.file };
  });
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
function createOnline({ host, fetchText, searchSite }) {
  const cache = new TinyCache(20 * 60 * 1000);
  host = host.replace(/\/+$/, '');

  function checkUrl(url, players) {
    let u;
    try { u = new URL(url); } catch (e) { throw Object.assign(new Error('bad url'), { status: 400 }); }
    const own = u.hostname.replace(/^www\./, '') === new URL(host).hostname.replace(/^www\./, '');
    const ok = own || (players && PLAYER_HOSTS.test(u.hostname));
    if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), { status: 403 });
    return u.toString();
  }

  async function findPages({ title = '', original = '', query = '' }) {
    const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
    const found = new Map();
    let lastError = null;
    for (const q of titles) {
      try {
        for (const item of await searchSite(q)) {
          if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles), season: seasonOf(item.title) }));
        }
      } catch (e) { lastError = e; }
    }
    if (!found.size && lastError) throw lastError;
    let list = Array.from(found.values()).filter((p) => p.score >= 40);
    const best = list.reduce((m, p) => Math.max(m, p.score), 0);
    // Лишаємо найкращі збіги (усі сезони одного серіалу мають однакову оцінку).
    list = list.filter((p) => p.score >= best - 20);
    list.sort((a, b) => b.score - a.score || (a.season || 0) - (b.season || 0));
    if (list.some((p) => p.season)) list.sort((a, b) => (a.season || 0) - (b.season || 0));
    return list.map(({ id, url, title: t, poster, season }) => ({ id, url, title: t, poster, season }));
  }

  async function stream(url, referer) {
    url = checkUrl(url, true);
    return cache.wrap('stream:' + url, async () => {
      const html = await fetchText(url, { referer: referer || host + '/' });
      const p = parsePlayerjs(html);
      if (!p) throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), { status: 404 });
      if (p.folders) {
        return {
          items: p.folders.map((f) => ({
            group: f.path.filter((x) => !seasonOf(x)).join(' / ') || 'UAKino',
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

  async function loadPage(url) {
    url = checkUrl(url, false);
    return cache.wrap('page:' + url, async () => {
      const html = await fetchText(url, {});
      const page = parse.parsePage(html, url, host);
      const season = seasonOf(page.title);
      const players = parsePlayers(html, host);
      let items = [];

      if (players.playlist) {
        try {
          const ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) +
            '&xfield=' + encodeURIComponent(players.playlist.xfield) + '&time=' + Date.now();
          const text = await fetchText(ajax, { xhr: true, referer: url });
          let body = text;
          try {
            const data = JSON.parse(text);
            body = data && data.success !== false ? String(data.response || '') : '';
          } catch (e) { /* відповідь — сирий HTML */ }
          items = parsePlaylist(body, host)
            .filter((ep) => !/трейлер|trailer/i.test(ep.group + ' ' + ep.title))
            .map((ep) => ({ group: ep.group, season, title: ep.title, episode: episodeOf(ep.title), url: ep.file }));
        } catch (e) {
          if (!players.iframes.length) throw e;
        }
      }

      if (!items.length) {
        for (const src of players.iframes) {
          try {
            const s = await stream(src, url);
            if (s.items) items = items.concat(s.items.map((i) => Object.assign({}, i, { season: i.season || season })));
            else items.push({ group: 'UAKino', season, title: page.title, episode: null, stream: s });
          } catch (e) { /* пробуємо наступний плеєр */ }
        }
      }

      return { url, title: page.title, original: page.original, year: page.year, poster: page.poster, season, items };
    });
  }

  // Спільний обробник для /online/* (Node-сервер і Worker) — повертає об'єкт для JSON.
  async function route(pathname, params) {
    if (pathname === '/online/search') {
      return { pages: await findPages({ title: params.get('title') || '', original: params.get('original') || params.get('title_original') || '', query: params.get('query') || params.get('Query') || '' }) };
    }
    if (pathname === '/online/page') return loadPage(params.get('url') || '');
    if (pathname === '/online/stream') return stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : '');
    return null;
  }

  return { findPages, loadPage, stream, route };
}

module.exports = { createOnline, parsePlayers, parsePlaylist, parsePlayerjs, parseQualities, parseSubtitles, toStream, seasonOf, episodeOf };

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
return __load("lib/client.js");
})();
/*
 * UAKino — плагін для Lampa.
 * Додає на картку фільму/серіалу дві кнопки:
 *   «UAKino»          — онлайн-перегляд з uakino.best (серії, озвучки, якість), як online_mod;
 *   «UAKino торенти»  — торенти з uakino.best, запуск через TorrServer.
 * uakino.best пускає лише домашні IP, тому за замовчуванням плагін ходить на сайт сам,
 * прямо з пристрою з Lampa. Режим «через парсер» (Cloudflare Worker або server.js) — запасний.
 *
 * Це вихідний код: робочий файл dist/uakino.js збирає build.js разом з lib/ (UAKinoLib).
 * Встановлення: Lampa → Налаштування → Розширення → Додати плагін → <адреса Worker>/uakino.js
 */
(function () {
  'use strict';

  if (window.uakino_torrents_plugin) return;
  window.uakino_torrents_plugin = true;

  // Сервер замінює цей рядок своєю адресою, коли віддає плагін за /uakino.js
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
      try { return JSON.parse(a.responseText).error || 'помилка'; } catch (e) { /* не JSON */ }
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

  // ======================= Джерело даних =======================
  // direct — запити на uakino йдуть з пристрою (домашній IP, Cloudflare сайту пропускає);
  // server — через парсер (Worker / server.js), напр. для веб-версії Lampa, де діє CORS.

  function mode() {
    return Lampa.Storage.get('uakino_mode', 'direct') === 'server' && serverUrl() ? 'server' : 'direct';
  }

  function siteHost() {
    return String(Lampa.Storage.get('uakino_host', '') || DEFAULT_HOST).trim().replace(/\/+$/, '');
  }

  function deviceError(net, a, c, url) {
    var status = a && a.status;
    if (status === 403 || status === 503) return 'uakino заблокував запит (' + status + '). Спробуйте пізніше або інше дзеркало в налаштуваннях';
    if (!status) return 'немає доступу до uakino з цього пристрою. У браузерній версії Lampa увімкніть режим «Через парсер»';
    return (net.errorDecode ? net.errorDecode(a, c) : 'помилка') + ' — ' + url;
  }

  function deviceFetch(url, o) {
    o = o || {};
    return new Promise(function (resolve, reject) {
      var net = new Lampa.Reguest();
      net.timeout(20000);
      var headers = {};
      if (o.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';
      if (o.referer) headers.Referer = o.referer;
      var params = { dataType: 'text', headers: headers };
      var ok = function (text) {
        resolve(typeof text === 'string' ? text : JSON.stringify(text));
      };
      var fail = function (a, c) {
        var err = new Error(deviceError(net, a, c, url));
        err.status = a && a.status;
        reject(err);
      };
      var method = typeof net['native'] === 'function' ? 'native' : 'silent';
      net[method](url, ok, fail, o.body || false, params);
    });
  }

  var client = null;

  function direct() {
    var host = siteHost();
    if (!client || client.host !== host) client = UAKinoLib.createClient({ host: host, fetchText: deviceFetch });
    return client;
  }

  function promised(promise, ok, fail) {
    promise.then(ok, function (e) {
      fail((e && e.message) || String(e));
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
    torrents: function (m, ok, fail) {
      if (mode() === 'direct') return promised(direct().torrents({ title: m.title, original: m.original, year: m.year }), ok, fail);
      serverGet('/api/v2.0/indexers/uakino/results' +
        '?apikey=' + enc(Lampa.Storage.get('uakino_apikey', '')) +
        '&Query=' + enc(m.title || m.original) +
        '&title=' + enc(m.title) +
        '&title_original=' + enc(m.original) +
        '&year=' + enc(m.year) +
        '&is_serial=' + (m.serial ? 2 : 1), function (json) {
        ok((json && json.Results) || []);
      }, fail);
    },
    search: function (m, ok, fail) {
      if (mode() === 'direct') return promised(direct().online.findPages({ title: m.title, original: m.original }), ok, fail);
      serverGet('/online/search?title=' + enc(m.title) + '&original=' + enc(m.original) + '&year=' + enc(m.year), function (json) {
        ok((json && json.pages) || []);
      }, fail);
    },
    page: function (url, ok, fail) {
      if (mode() === 'direct') return promised(direct().online.loadPage(url), ok, fail);
      serverGet('/online/page?url=' + enc(url), ok, fail);
    },
    stream: function (url, referer, ok, fail) {
      if (mode() === 'direct') return promised(direct().online.stream(url, referer), ok, fail);
      serverGet('/online/stream?url=' + enc(url) + '&referer=' + enc(referer), ok, fail);
    }
  };

  // ======================= Торенти =======================

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
        return { title: r.Title, subtitle: info.join(' • '), torrent: prepareTorrent(r) };
      });

      Lampa.Select.show({
        title: 'UAKino — торенти',
        items: items,
        onSelect: function (item) {
          Lampa.Controller.toggle(controller);
          if (Lampa.Torrent && typeof Lampa.Torrent.start === 'function') Lampa.Torrent.start(item.torrent, movie);
          else Lampa.Noty.show('Ця версія Lampa не підтримує запуск торентів з плагіна');
        },
        onBack: function () {
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

  // ======================= Онлайн =======================

  function OnlineComponent(object) {
    var scroll = new Lampa.Scroll({ mask: true, over: true });
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

    // Відповіді, що прийшли після закриття екрана, ігноруються.
    function alive(fn) {
      return function (v) {
        if (!destroyed) fn(v);
      };
    }

    function choice() {
      var c = Lampa.Storage.get(storeKey, '{}');
      if (typeof c === 'string') {
        try { c = JSON.parse(c); } catch (e) { c = {}; }
      }
      return c || {};
    }

    function saveChoice() {
      Lampa.Storage.set(storeKey, { page: pageIndex, group: groups[groupIndex] || '' });
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
        data = json || { items: [] };
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

    function select(title, list, current, onSelect) {
      Lampa.Select.show({
        title: title,
        items: list.map(function (name, i) {
          return { title: name, selected: i === current, index: i };
        }),
        onSelect: function (a) {
          onSelect(a.index);
        },
        onBack: function () {
          Lampa.Controller.toggle('content');
        }
      });
    }

    function hashFor(item) {
      if (!Lampa.Utils || !Lampa.Utils.hash) return '';
      var base = info.original || info.title;
      if (item.episode != null && (item.season || data.season || info.serial)) {
        // Той самий формат хешу, що й у online_mod, — прогрес перегляду спільний.
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
      var p = { title: title, url: stream.url };
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
          var cell = { title: it.title || data.title };
          if (it.stream) return playerItem(it, it.stream);
          // Посилання на інші серії отримуємо лише коли до них дійде плеєр.
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
        toggle: function () {
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        up: function () {
          if (Navigator.canmove('up')) Navigator.move('up');
          else Lampa.Controller.toggle('head');
        },
        down: function () {
          Navigator.move('down');
        },
        left: function () {
          if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        right: function () {
          Navigator.move('right');
        },
        back: function () {
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

  // ======================= Інтеграція =======================

  var CSS = '<style>' +
    '.uakino-online{padding:0 1.5em 1.5em}' +
    '.uakino-online__filters{display:flex;flex-wrap:wrap;margin-bottom:1em}' +
    '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' +
    '.uakino-online__item{padding:1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' +
    '.uakino-online__filter.focus,.uakino-online__item.focus{background:#fff;color:#000}' +
    '.uakino-online__title{font-size:1.3em}' +
    '.uakino-online__info{margin-top:.3em;opacity:.6}' +
    '.uakino-online__empty{padding:2em 0;text-align:center;opacity:.7}' +
    '</style>';

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

    // Оновлюємо навігацію, щоб кнопки стали доступними з пульта.
    if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');
  }

  function addSettings() {
    if (!Lampa.SettingsApi) return;
    Lampa.SettingsApi.addComponent({ component: 'uakino', name: 'UAKino', icon: ICON });
    Lampa.SettingsApi.addParam({
      component: 'uakino',
      param: { name: 'uakino_mode', type: 'select', values: { direct: 'З пристрою (рекомендовано)', server: 'Через парсер' }, default: 'direct' },
      field: { name: 'Звідки завантажувати', description: 'uakino пускає лише домашні IP, тому запити краще робити прямо з ТВ/приставки' }
    });
    Lampa.SettingsApi.addParam({
      component: 'uakino',
      param: { name: 'uakino_host', type: 'input', values: '', default: '', placeholder: DEFAULT_HOST },
      field: { name: 'Адреса сайту', description: 'Дзеркало uakino. За замовчуванням: ' + DEFAULT_HOST }
    });
    Lampa.SettingsApi.addParam({
      component: 'uakino',
      param: { name: 'uakino_server', type: 'input', values: '', default: '', placeholder: BUILT_IN_SERVER || 'https://uakino-lampa.example.workers.dev' },
      field: {
        name: 'Адреса парсера',
        description: 'Для режиму «Через парсер». ' + (BUILT_IN_SERVER ? 'За замовчуванням: ' + BUILT_IN_SERVER : 'Адреса Cloudflare Worker або server.js')
      }
    });
    Lampa.SettingsApi.addParam({
      component: 'uakino',
      param: { name: 'uakino_apikey', type: 'input', values: '', default: '', placeholder: '' },
      field: { name: 'API-ключ', description: 'Лише якщо на парсері задано UAKINO_APIKEY' }
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

  if (window.appready) start();
  else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') start();
    });
  }
})();
})();
