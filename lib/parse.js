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

module.exports = { pageMeta, scoreTitle, baseTitle, altNames, yearOf, decodeEntities, stripTags, absoluteUrl, localize, newsId, parseList, parsePage, parseSitemap, normalizeTitle };
