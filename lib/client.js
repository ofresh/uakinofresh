'use strict';

// Клієнт uakino, що працює прямо на пристрої з Lampa (ТВ, приставка, телефон):
// сайт бачить домашній IP, тому Cloudflare його пропускає. Вбудовується в плагін під час збирання.
//
// fetchText(url, { method, body, xhr, referer }) → Promise<string>

const parse = require('./parse');
const { createOnline } = require('./online');
const { toJackett } = require('./jackett');
const { searchDle } = require('./search');
const { SOURCES } = require('./sources');

// source — запис з lib/sources.js (за замовчуванням UAKino); host перекриває його адресу (дзеркало).
function createClient({ source, host, fetchText, maxPages = 5 }) {
  source = source || SOURCES[0];
  host = String(host || source.host).replace(/\/+$/, '');
  const searches = new Map();
  const pages = new Map();

  async function searchSite(query) {
    const q = String(query || '').trim();
    if (q.length < 2) return [];
    const key = q.toLowerCase();
    if (searches.has(key)) return searches.get(key);
    const list = await searchDle(host, q, fetchText, source);
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

  return { host, source, searchSite, torrents, online: createOnline({ host, fetchText, searchSite, name: source.name, anyPlayer: true }) };
}

module.exports = { createClient, SOURCES };
