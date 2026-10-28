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
  const m = String(s || '').match(/(?:сезон|season|sezon)[\s_-]*(\d+)|(\d+)(?:st|nd|rd|th)?[\s_-]*(?:сезон|sezon|season)/i);
  return m ? Number(m[1] || m[2]) : null;
}

// Сезон з адреси, коли в назві його немає. «gra-prestoliv-18-sezon» — це «1-8 сезон» без дефіса,
// тож двоцифрові номери з адреси не беремо.
function urlSeason(url) {
  const n = seasonOf(url);
  return n && n < 10 ? n : null;
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
  let trailer = false;
  const add = (src) => {
    if (!src || iframes.indexOf(src) >= 0) return;
    if (skip(src)) { if (/youtube|youtu\.be|trailer/i.test(src)) trailer = true; return; }
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
  return { playlist, iframes, seen, trailer };
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
  // titles — інші назви з TMDB (українська, англійська, ромадзі…), найкращі першими.
  async function findPages({ title = '', original = '', query = '', year = null, serial, titles: extra = [] }) {
    const variants = parse.titleVariants([title, original, query].concat(extra || []));
    const titles = variants.match;
    const found = new Map();
    let lastError = null;
    for (const q of variants.search) {
      // Точний збіг уже є — решту назв не шукаємо (менше запитів до сайту).
      const yq = Number(year) || 0;
      if (Array.from(found.values()).some((p) => p.score >= 100 && (!yq || !p.year || Math.abs(p.year - yq) <= 1))) break;
      try {
        for (const item of await searchSite(q)) {
          if (!found.has(item.id)) {
            found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles), season: seasonOf(item.title) || urlSeason(item.url), titleSeason: seasonOf(item.title), year: parse.yearOf(item), latin: !/[\u0400-\u04ff]/.test(q) }));
          }
        }
      } catch (e) { lastError = e; }
    }
    if (!found.size && lastError) throw lastError;

    // Сайт переклав назву інакше, ніж TMDB (AniTube: «Фрірен, що проводжає в останню путь» ≠
    // «Фрірен: після кінця пригоди»): читаємо оригінальну назву зі сторінок кандидатів і порівнюємо ще раз.
    if (!Array.from(found.values()).some((p) => p.score >= 100)) {
      const cand = Array.from(found.values()).filter((p) => p.latin || p.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);
      await Promise.all(cand.map(async (p) => {
        try {
          // «Наруто 2 сезон» на сторінці «Ураганних хронік» — це вже інший сезон, не той серіал.
          // Сезон з назви на сторінці рахується, лише якщо сайт і в картці вказав сезон (AniTube «(2 сезон)»).
          const names = parse.pageNames(await pageHtml(p.url)).filter((n) => !seasonOf(n) || seasonOf(n) === (p.titleSeason || 1));
          const s = names.reduce((m, n) => Math.max(m, parse.scoreTitle({ title: n }, titles)), 0);
          if (s > p.score) {
            p.score = s;
            if (!p.original) p.original = names.filter((n) => parse.altNames(p).indexOf(n) < 0)[0] || '';
          }
        } catch (e) { /* кандидат лишається з попередньою оцінкою */ }
      }));
    }

    // «Король Талси 2», «Фрірен: після кінця пригоди 2» — номер сезону цифрою в кінці назви
    // (UASerials, AnimeUA): це той самий серіал, тож збіг точний.
    if (serial) {
      // Плюс назви, якими сам сайт називає вже знайдений серіал («Шпигун та сім'я» → «Шпигун та сім'я 3»).
      const qs = titles.map(parse.baseTitle);
      found.forEach((p) => {
        if (p.score >= 100) parse.altNames(p).forEach((n) => { const b = parse.baseTitle(n); if (!/\s\d{1,2}$/.test(b) && qs.indexOf(b) < 0) qs.push(b); });
      });
      found.forEach((p) => {
        if (p.season) return;
        parse.altNames(p).some((n) => {
          const m = parse.baseTitle(n).match(/^(.*\S)\s+(\d{1,2})$/);
          if (m && Number(m[2]) > 0 && qs.indexOf(m[1]) >= 0) { p.season = Number(m[2]); p.score = Math.max(p.score, 100); return true; }
          return false;
        });
      });
    }

    let list = Array.from(found.values()).filter((p) => p.score >= 50);
    const best = list.reduce((m, p) => Math.max(m, p.score), 0);
    list = list.filter((p) => p.score === best);

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
        const onlyTrailer = !players.iframes.length && (players.trailer || players.seen.length > 0 && players.seen.every((h) => /youtube|youtu\.be/i.test(h)));
        // UAFlix та інші: замість плеєра — трейлер і прохання увійти/змінити країну.
        if (/пройдіть\s+авторизацію|змініть\s+країну|увійдіть,?\s+щоб\s+дивитис|доступн\w*\s+лише\s+(для\s+)?зареєстрован/i.test(parse.stripTags(html))) {
          throw Object.assign(new Error(name + ': сайт показує лише трейлер — відео доступне тільки з українського IP або після входу в акаунт'), { status: 403 });
        }
        if (onlyTrailer || /soon-tv|скоро\s+(на\s+сайті|вийде)|очікуєм/i.test(html)) {
          // UASerials (hdvbua.pro/trailer/…) так само показує лише трейлер гостям не з України.
          throw Object.assign(new Error(name + ': на сторінці лише трейлер — відео ще не вийшло або сайт не показує його з цього IP (лише з українського)'), { status: 404 });
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
        titles: params.getAll ? params.getAll('alt') : [],
      }) };
    }
    if (pathname === '/online/page') return loadPage(params.get('url') || '');
    if (pathname === '/online/stream') return stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : '');
    return null;
  }

  return { findPages, loadPage, stream, route };
}

module.exports = { parseEpisodeLinks, createOnline, parsePlayers, parsePlaylist, parsePlayerjs, parseQualities, parseSubtitles, toStream, seasonOf, episodeOf };
