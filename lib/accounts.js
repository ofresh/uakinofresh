'use strict';

// Вхід на Толоку і пошук/завантаження .torrent з її cookie.
// Працює в Worker і Node: потрібні fetch з redirect: 'manual' і доступ до Set-Cookie,
// яких плагін на пристрої (Lampa на Android) не має — тому вхід іде через Worker.

const parse = require('./parse');
const { parseTorrent } = require('./bencode');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

const SITES = {
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
