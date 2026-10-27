'use strict';

// Тести без залежностей: node test/test.js
// Імітує uakino.best локальним HTTP-сервером із фікстурами.

const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');

const parse = require('../lib/parse');
const { parseTorrent } = require('../lib/bencode');

// bencode-кодувальник для генерації .torrent-фікстур.
function encode(v) {
  if (Buffer.isBuffer(v)) return Buffer.concat([Buffer.from(v.length + ':'), v]);
  if (typeof v === 'string') return encode(Buffer.from(v, 'utf8'));
  if (typeof v === 'number') return Buffer.from('i' + Math.trunc(v) + 'e');
  if (Array.isArray(v)) return Buffer.concat([Buffer.from('l'), ...v.map(encode), Buffer.from('e')]);
  const keys = Object.keys(v).sort();
  return Buffer.concat([Buffer.from('d'), ...keys.map((k) => Buffer.concat([encode(k), encode(v[k])])), Buffer.from('e')]);
}

const fixtures = path.join(__dirname, 'fixtures');
const read = (f) => fs.readFileSync(path.join(fixtures, f), 'utf8');

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

function makeTorrent(name, sizes) {
  const info = {
    name,
    'piece length': 262144,
    pieces: Buffer.alloc(20),
    files: sizes.map((length, i) => ({ length, path: ['Серія ' + (i + 1) + '.mkv'] })),
  };
  return {
    buf: encode({ announce: 'udp://tracker.example:80/announce', 'announce-list': [['udp://tracker.example:80/announce'], ['http://bt.example/announce']], 'creation date': 1730000000, info }),
    hash: crypto.createHash('sha1').update(encode(info)).digest('hex'),
  };
}

const torrents = {
  '703632': makeTorrent('Високий потенціал (Сезон 1)', [1000, 2000, 3000]),
  '703633': makeTorrent('High.Potential.S01.1080p', [5000000]),
  '703634': makeTorrent('High.Potential.S01.720p', [2500000]),
};

function playlistHtml(base) {
  return '<div class="playlists-player"><div class="playlists-lists"><div class="playlists-items"><ul>' +
    '<li data-id="0_0" class="active">ТакТребаПродакшн</li><li data-id="0_1">DniproFilm</li></ul></div></div>' +
    '<div class="playlists-videos"><div class="playlists-items"><ul>' +
    '<li data-file="' + base + '/vod/1001" data-id="0_0" data-voice="ТакТребаПродакшн">1 серія</li>' +
    '<li data-file="' + base + '/vod/1002" data-id="0_0" data-voice="ТакТребаПродакшн">2 серія</li>' +
    '<li data-file="' + base + '/vod/2001" data-id="0_1" data-voice="DniproFilm">1 серія</li>' +
    '<li data-file="https://www.youtube.com/embed/t" data-id="0_1" data-voice="Трейлер">Трейлер</li>' +
    '</ul></div></div></div>';
}

function startUpstream() {
  const requests = [];
  const server = http.createServer((req, res) => {
    requests.push(req.url);
    // Застосунки Lampa не мають CORS-обмежень; браузер у тесті — має, тож дозволяємо.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
    const u = new URL(req.url, 'http://x');
    const p = decodeURIComponent(u.pathname);
    if (p === '/index.php' && (u.searchParams.get('story') || req.method === 'POST')) {
      // Як справжній DLE: і GET, і POST-форма пошуку.
      let body = '';
      req.on('data', (c) => { body += c; });
      req.on('end', () => {
        const story = req.method === 'POST' ? new URLSearchParams(body).get('story') || '' : u.searchParams.get('story');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(story.indexOf('потенціал') >= 0 || story === 'High Potential' ? read('search.html') : '<html></html>');
      });
      return;
    }
    if (p === '/seriesss/drama_series/25998-vysokyy-potencial-1-sezon.html') return res.end(read('page.html'));
    if (p === '/seriesss/drama_series/27001-vysokyy-potencial-2-sezon.html') return res.end('<h1>Високий потенціал (Сезон 2)</h1><p>Торентів немає</p><iframe id="pre" src="' + base + '/serial/9" allowfullscreen></iframe><iframe src="https://www.youtube.com/embed/x"></iframe>');
    if (p === '/engine/ajax/playlists.php') {
      if (req.headers['x-requested-with'] !== 'XMLHttpRequest' || u.searchParams.get('news_id') !== '25998' || u.searchParams.get('xfield') !== 'playlist') return res.end(JSON.stringify({ success: false }));
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: true, response: playlistHtml(base) }));
    }
    if (p === '/vod/1001' || p === '/vod/1002' || p === '/vod/2001') {
      // Браузер не дає задати Referer, тож перевіряємо його лише для серверних запитів.
      if (!req.headers.origin && !/25998/.test(req.headers.referer || '')) { res.statusCode = 403; return res.end('bad referer'); }
      const id = p.split('/').pop();
      return res.end('<script>var player = new Playerjs({id:"player", file:"[480p]https://cdn.example/' + id + '/480.m3u8,[1080p]https://cdn.example/' + id + '/1080.m3u8", subtitle:"[Українські]https://cdn.example/' + id + '.vtt", poster:"x.jpg"});</script>');
    }
    if (p === '/serial/9') {
      const folders = [{ title: 'Сезон 2', folder: [
        { title: 'Серія 1', file: 'https://cdn.example/s2e1/index.m3u8', id: '1' },
        { title: 'Серія 2', file: 'https://cdn.example/s2e2/index.m3u8', id: '2' },
      ] }];
      return res.end("<script>new Playerjs({id:'p', file:'" + JSON.stringify(folders).replace(/\//g, '\\/') + "'});</script>");
    }
    if (p === '/filmy/genre_comedy/11111-insha-komediia.html') return res.end('<h1>Зовсім інша комедія</h1><a href="/torrent/1/Інша.torrent">t</a>');
    if (p === '/sitemap.xml') return res.end('<sitemapindex><sitemap><loc>' + base + '/sitemap-news.xml</loc></sitemap></sitemapindex>');
    if (p === '/sitemap-news.xml') return res.end('<urlset><url><loc>' + base + '/seriesss/drama_series/25998-vysokyy-potencial-1-sezon.html</loc></url><url><loc>' + base + '/filmy/genre_comedy/11111-insha-komediia.html</loc></url></urlset>');
    const t = p.match(/^\/torrent\/(\d+)\//);
    if (t && torrents[t[1]]) {
      res.setHeader('Content-Type', 'application/x-bittorrent');
      return res.end(torrents[t[1]].buf);
    }
    if (t) { res.statusCode = 404; return res.end('no'); }
    res.statusCode = 404;
    res.end('not found');
  });
  let base;
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    base = 'http://127.0.0.1:' + server.address().port;
    resolve({ server, base, requests });
  }));
}

function listen(server) {
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve('http://127.0.0.1:' + server.address().port)));
}

async function getJson(url) {
  const res = await fetch(url);
  return { status: res.status, body: await res.json(), headers: res.headers };
}

// ---------------- parse ----------------

test('parseList: картки пошуку, відносні посилання, сутності, чужі домени', () => {
  const host = 'https://uakino.best';
  const list = parse.parseList(read('search.html'), host);
  assert.deepStrictEqual(list.map((i) => i.id), ['25998', '27001', '11111']);
  assert.strictEqual(list[0].title, 'Високий потенціал (Сезон 1)');
  assert.strictEqual(list[0].poster, 'https://uakino.best/uploads/posts/hp.jpg');
  assert.strictEqual(list[1].title, 'Високий потенціал & (Сезон 2)');
  assert.strictEqual(list[1].url, 'https://uakino.best/seriesss/drama_series/27001-vysokyy-potencial-2-sezon.html');
  assert.strictEqual(list[1].poster, 'https://uakino.best/uploads/posts/hp2.jpg');
});

test('parsePage: назва, оригінал, рік, усі торенти без дублів', () => {
  const host = 'https://uakino.best';
  const url = host + '/seriesss/drama_series/25998-vysokyy-potencial-1-sezon.html';
  const page = parse.parsePage(read('page.html'), url, host);
  assert.strictEqual(page.id, '25998');
  assert.strictEqual(page.title, 'Високий потенціал (Сезон 1)');
  assert.strictEqual(page.original, 'High Potential');
  assert.strictEqual(page.year, 2024);
  assert.strictEqual(page.poster, 'https://uakino.best/uploads/posts/hp-big.jpg');
  assert.deepStrictEqual(page.torrents.map((t) => t.id), ['703632', '703633', '703634']);
  assert.strictEqual(page.torrents[0].name, 'Високий потенціал (Сезон 1)');
  assert.strictEqual(page.torrents[0].url, 'https://uakino.best/torrent/703632/' + encodeURIComponent('Високий потенціал (Сезон 1) .torrent'));
  // Пробіли й кирилиця в сирому href теж кодуються.
  assert.strictEqual(page.torrents[1].url, 'https://uakino.best/torrent/703633/' + encodeURIComponent('Високий потенціал (Сезон 1) 1080p.torrent'));
  assert.strictEqual(page.torrents[1].name, 'Високий потенціал (Сезон 1) 1080p');
});

test('parsePage: посилання з прикладу користувача', () => {
  const href = 'https://uakino.best/torrent/703632/Високий%20потенціал%20(Сезон%201)%20.torrent';
  const page = parse.parsePage('<a href="' + href + '">Скачати</a>', 'https://uakino.best/x/1-a.html', 'https://uakino.best');
  assert.strictEqual(page.torrents.length, 1);
  assert.strictEqual(page.torrents[0].id, '703632');
  assert.strictEqual(decodeURIComponent(page.torrents[0].url), decodeURIComponent(href));
});

test('normalizeTitle', () => {
  assert.strictEqual(parse.normalizeTitle('Високий  Потенціал: (Сезон 1)'), 'високий потенціал сезон 1');
  assert.strictEqual(parse.normalizeTitle('Ёлки'), 'елки');
});

test('searchDle: POST, потім GET, потім коротший запит; помилка лише якщо все впало', async () => {
  const { searchDle, simplify } = require('../lib/search');
  const host = 'https://uakino.best';
  const html = read('search.html');
  assert.strictEqual(simplify('Fall 2: Deadpoint'), 'Fall 2');

  const calls = [];
  const res = await searchDle(host, 'Високий потенціал', async (url, o) => {
    calls.push((o.method || 'GET') + ' ' + url);
    if (o.method === 'POST') { const e = new Error('Внутрішня помилка сервера. [500]'); e.status = 500; throw e; }
    return html;
  });
  assert.strictEqual(res.length, 3);
  assert.deepStrictEqual(calls.map((c) => c.split(' ')[0]), ['POST', 'GET']);
  assert.ok(calls[0].endsWith('/index.php?do=search'));

  const tried = [];
  const short = await searchDle(host, 'Fall 2: Deadpoint', async (url, o) => {
    tried.push((o.body || url).match(/story=([^&]*)/)[1]);
    return /story=Fall%202(&|$)/.test(o.body || url) ? html : '<html></html>';
  });
  assert.strictEqual(short.length, 3);
  assert.deepStrictEqual(tried.map(decodeURIComponent), ['Fall 2: Deadpoint', 'Fall 2: Deadpoint', 'Fall 2']);

  await assert.rejects(searchDle(host, 'x y z', async () => { throw new Error('HTTP 500'); }), /POST: HTTP 500; GET: HTTP 500/);
  assert.deepStrictEqual(await searchDle(host, 'нема', async () => '<html></html>'), []);
});

// ---------------- bencode ----------------

test('parseTorrent: infohash, розмір, трекери, magnet', async () => {
  const t = torrents['703632'];
  const info = await parseTorrent(t.buf);
  assert.strictEqual(info.infoHash, t.hash);
  assert.strictEqual(info.name, 'Високий потенціал (Сезон 1)');
  assert.strictEqual(info.size, 6000);
  assert.strictEqual(info.files.length, 3);
  assert.deepStrictEqual(info.trackers, ['udp://tracker.example:80/announce', 'http://bt.example/announce']);
  assert.ok(info.magnet.startsWith('magnet:?xt=urn:btih:' + t.hash + '&dn='));
  await assert.rejects(parseTorrent(Buffer.from('<html>Cloudflare</html>')));
});

// ---------------- server ----------------

test('сервер: Jackett API, magnet, /download, плагін, CORS', async () => {
  const up = await startUpstream();
  const indexFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'uakino-')), 'index.json');
  const { createServer, toJackett } = require('../server');
  const { UAKino } = require('../lib/uakino');
  const client = new UAKino({ host: up.base, indexFile, scrapePeers: false });
  const srv = createServer(client);
  const base = await listen(srv);
  try {
    const q = '/api/v2.0/indexers/all/results?apikey=&Query=' + encodeURIComponent('Високий потенціал') +
      '&title=' + encodeURIComponent('Високий потенціал') + '&title_original=' + encodeURIComponent('High Potential') + '&year=2024&is_serial=2';
    const { status, body, headers } = await getJson(base + q);
    assert.strictEqual(status, 200);
    assert.strictEqual(headers.get('access-control-allow-origin'), '*');
    const r = body.Results;
    assert.strictEqual(r.length, 3, JSON.stringify(r, null, 1));
    assert.ok(!r.some((x) => /комедія/.test(x.Title)), 'нерелевантні результати відфільтровано');
    assert.strictEqual(r[0].Title, 'Високий потенціал (Сезон 1) / High Potential (2024) [Скачати торент]');
    assert.strictEqual(r[0].Size, 6000);
    assert.strictEqual(r[0].InfoHash, torrents['703632'].hash);
    assert.strictEqual(r[0].Category[0], 5000);
    assert.strictEqual(r[0].Details, up.base + '/seriesss/drama_series/25998-vysokyy-potencial-1-sezon.html');
    assert.strictEqual(r[0].PublishDate, new Date(1730000000 * 1000).toISOString());
    assert.ok(r[0].MagnetUri.indexOf(torrents['703632'].hash) > 0);
    assert.strictEqual(r[1].InfoHash, torrents['703633'].hash);
    assert.strictEqual(r[2].InfoHash, torrents['703634'].hash);

    // Повторний запит іде з кешу.
    const before = up.requests.length;
    await getJson(base + q);
    assert.strictEqual(up.requests.length, before);

    // Індекс збережено на диск.
    const saved = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
    assert.ok(saved.pages['25998']);
    assert.ok(saved.torrents[r[0].Guid]);

    // .torrent через парсер
    const dl = await fetch(r[0].Link);
    assert.strictEqual(dl.status, 200);
    assert.strictEqual(dl.headers.get('content-type'), 'application/x-bittorrent');
    assert.ok(Buffer.from(await dl.arrayBuffer()).equals(torrents['703632'].buf));

    const bad = await fetch(base + '/download?url=' + encodeURIComponent('http://evil.example/torrent/1/x.torrent'));
    assert.strictEqual(bad.status, 403);
    const bad2 = await fetch(base + '/download?url=' + encodeURIComponent(up.base + '/index.php'));
    assert.strictEqual(bad2.status, 403);

    // Плагін з підставленою адресою сервера.
    const js = await (await fetch(base + '/uakino.js')).text();
    assert.ok(js.indexOf("Lampa.Component.add('uakino_online'") >= 0);

    const opt = await fetch(base + '/api/v2.0/indexers/all/results', { method: 'OPTIONS' });
    assert.strictEqual(opt.status, 204);

    // Нічого не знайдено → порожній список, а не помилка.
    const empty = await getJson(base + '/api/v2.0/indexers/all/results?Query=zzzz');
    assert.strictEqual(empty.status, 200);
    assert.deepStrictEqual(empty.body.Results, []);

    assert.ok(typeof toJackett === 'function');
  } finally {
    srv.close();
    up.server.close();
  }
});

test('сервер: apikey', async () => {
  const { createServer, config } = require('../server');
  const { UAKino } = require('../lib/uakino');
  config.apikey = 'secret';
  const srv = createServer(new UAKino({ host: 'http://127.0.0.1:1', scrapePeers: false }));
  const base = await listen(srv);
  try {
    assert.strictEqual((await fetch(base + '/api/v2.0/indexers/all/results?Query=x')).status, 401);
  } finally {
    config.apikey = '';
    srv.close();
  }
});

test('crawl: sitemap → індекс усіх торентів, потім пошук з індексу', async () => {
  const up = await startUpstream();
  const indexFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'uakino-')), 'index.json');
  const { UAKino } = require('../lib/uakino');
  try {
    const client = new UAKino({ host: up.base, indexFile, scrapePeers: false });
    const stat = await client.crawl({ delay: 0 });
    assert.deepStrictEqual(stat, { pages: 2, torrents: 4 });

    // Новий клієнт читає індекс; пошук на сайті нічого не дає, але індекс знаходить.
    const fresh = new UAKino({ host: up.base, indexFile, scrapePeers: false });
    const results = await fresh.find({ query: 'Зовсім інша комедія' });
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].page.id, '11111');
    assert.strictEqual(results[0].meta, null); // .torrent віддає 404 — запис лишається без magnet
  } finally {
    up.server.close();
  }
});

// ---------------- plugin (Playwright, якщо доступний) ----------------

async function pluginFlow(mode) {
  let chromium;
  try { ({ chromium } = require('playwright')); } catch (e) { console.log('    (пропущено: немає playwright)'); return; }

  const up = await startUpstream();
  const { createServer } = require('../server');
  const { UAKino } = require('../lib/uakino');
  const srv = createServer(new UAKino({ host: up.base, scrapePeers: false, indexFile: '' }));
  const base = await listen(srv);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(base + '/health');
    await page.setContent('<div id="full"><div class="full-start-new__buttons"><div class="full-start__button selector view--torrent">Торренти</div></div></div>');
    // Тестовий сайт (розмітка DLE з плейлистом) підставляємо як дзеркало UASerials, решту вимикаємо.
    await page.evaluate(([preset, fail]) => { window.__preset = preset; window.__nativeFail = fail; }, [{ uakino_host_uaserials: up.base, uakino_src_uaflix: false, uakino_src_eneyida: false, uakino_src_uaserial: false }, mode === 'fallback']);
    // Worker: вхід і пошук Толоки підміняємо (без справжніх сайтів).
    const loginRequests = [];
    const tolokaRequests = [];
    await page.route(/\/login$/, async (route) => {
      loginRequests.push(Object.fromEntries(new URLSearchParams(route.request().postData())));
      await route.fulfill({ contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ ok: true, cookie: 'toloka_data=abc' }) });
    });
    await page.route(/\/toloka\/search/, async (route) => {
      tolokaRequests.push(route.request().url());
      await route.fulfill({ contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ Results: [
        { Title: 'Матчбокс (2026) WEB-DLRip', Tracker: 'Toloka', Size: 1, Link: 'x' },
        { Title: 'Високий потенціал (Сезон 1) 2160p', Tracker: 'Toloka', Size: 2, Link: 'y' },
      ] }) });
    });
    await page.addScriptTag({ path: path.join(__dirname, 'lampa-stub.js') });
    await page.addScriptTag({ url: base + '/uakino.js' });

    await page.evaluate(() => window.__fireFull({ title: 'Високий потенціал', original_name: 'High Potential', name: 'Високий потенціал', first_air_date: '2024-09-17' }));
    const btns = await page.$$eval('.full-start-new__buttons > *', (els) => els.map((e) => e.textContent));
    assert.deepStrictEqual(btns, ['UAKino', 'Торренти'], 'лише кнопка UAKino, без торентів');

    // ---- онлайн ----
    await page.evaluate(() => window.__enter('.view--uakino-online'));
    await page.waitForFunction(() => document.querySelectorAll('.uakino-online__item').length === 2, null, { timeout: 15000 });
    const list = await page.$$eval('.uakino-online__item', (els) => els.map((e) => e.querySelector('.uakino-online__title').textContent + ' | ' + e.querySelector('.uakino-online__info').textContent));
    assert.deepStrictEqual(list, ['1 серія | Сезон 1 • ТакТребаПродакшн', '2 серія | Сезон 1 • ТакТребаПродакшн']);
    const filters = await page.$$eval('.uakino-online__filters .uakino-online__filter', (els) => els.map((e) => e.textContent));
    assert.deepStrictEqual(filters, ['Джерело: UASerials', 'Озвучка: ТакТребаПродакшн']);
    // Сезони — окремі вкладки; активна — перша.
    const tabs = await page.$$eval('.uakino-online__tabs .uakino-online__filter', (els) => els.map((e) => e.textContent + (e.classList.contains('uakino-online__filter--active') ? '*' : '')));
    assert.deepStrictEqual(tabs, ['Сезон 1*', 'Сезон 2']);
    assert.strictEqual(await page.evaluate(() => window.__controller), 'content');
    assert.ok(await page.evaluate(() => window.__minus), 'список має висоту екрана (scroll.minus), інакше не гортається');

    // Вибір озвучки
    await page.evaluate(() => { window.__select = null; window.__enter('.uakino-online__filters .uakino-online__filter:nth-child(2)'); });
    await page.evaluate(() => window.__select.onSelect(window.__select.items[1]));
    assert.deepStrictEqual(await page.$$eval('.uakino-online__item .uakino-online__title', (els) => els.map((e) => e.textContent)), ['1 серія']);
    await page.evaluate(() => { window.__enter('.uakino-online__filters .uakino-online__filter:nth-child(2)'); window.__select.onSelect(window.__select.items[0]); });

    // Запуск другої серії: пряме посилання, якість, субтитри, плейлист з лінивим першим пунктом.
    await page.evaluate(() => window.__enter('.uakino-online__list .uakino-online__item:nth-child(2)'));
    await page.waitForFunction(() => window.__play, null, { timeout: 15000 });
    const played = await page.evaluate(() => ({ play: window.__play, types: window.__playlist.map((p) => typeof p.url) }));
    assert.strictEqual(played.play.url, 'https://cdn.example/1002/1080.m3u8');
    assert.strictEqual(played.play.quality['480p'], 'https://cdn.example/1002/480.m3u8');
    assert.strictEqual(played.play.subtitles[0].label, 'Українські');
    assert.strictEqual(played.play.timeline.hash, 'h:12High Potential');
    assert.deepStrictEqual(played.types, ['function', 'string']);
    const lazy = await page.evaluate(() => new Promise((resolve) => {
      const cell = window.__playlist[0];
      cell.url(() => resolve({ url: cell.url, q: cell.quality }));
    }));
    assert.strictEqual(lazy.url, 'https://cdn.example/1001/1080.m3u8');

    // Вкладка другого сезону (окрема сторінка з плеєром folders).
    await page.evaluate(() => window.__enter('.uakino-online__tabs .uakino-online__filter:nth-child(2)'));
    await page.waitForFunction(() => document.querySelector('.uakino-online__item .uakino-online__info') && /Сезон 2/.test(document.querySelector('.uakino-online__item .uakino-online__info').textContent), null, { timeout: 15000 });
    assert.deepStrictEqual(await page.$$eval('.uakino-online__item .uakino-online__title', (els) => els.map((e) => e.textContent)), ['Серія 1', 'Серія 2']);
    assert.deepStrictEqual(await page.$$eval('.uakino-online__tabs .uakino-online__filter--active', (els) => els.map((e) => e.textContent)), ['Сезон 2']);
    assert.deepStrictEqual(errors, []);

    // «Торенти (UA)» в «Джерело» — стандартний екран торентів, лише з українською озвучкою.
    await page.evaluate(() => { window.__enter('.uakino-online__filters .uakino-online__filter:nth-child(1)'); });
    const srcItems = await page.evaluate(() => window.__select.items.map((i) => i.title));
    assert.strictEqual(srcItems[srcItems.length - 1], 'Торенти (UA)');
    await page.evaluate(() => window.__select.onSelect(window.__select.items[window.__select.items.length - 1]));
    const pushed = await page.evaluate(() => ({ component: window.__pushed.component, ua: window.__pushed.uakino_ua, search: window.__pushed.search, one: window.__pushed.search_one }));
    assert.deepStrictEqual(pushed, { component: 'torrents', ua: true, search: 'High Potential', one: 'Високий потенціал' });
    const filtered = await page.evaluate(() => new Promise((resolve) => Lampa.Parser.get(window.__pushed, (d) => resolve(d.Results.map((r) => r.Title)))));
    assert.deepStrictEqual(filtered, ['Matchbox (2026) WEB-DL 2160p HDR | UKR, ENG', 'Matchbox 2026 1080p [Дубляж Укр]', 'Матчбокс (2026) WEB-DLRip']);
    // Звичайний пошук торентів (не з UAKino) — без фільтра.
    const all = await page.evaluate(() => new Promise((resolve) => Lampa.Parser.get({ search: 'x' }, (d) => resolve(d.Results.length))));
    assert.strictEqual(all, 5);

    // Settings зареєстровано
    const settings = await page.evaluate(() => window.__settings);
    assert.deepStrictEqual(settings, ['uakino',
      'uakino_src_uaserials', 'uakino_src_uaflix', 'uakino_src_eneyida', 'uakino_src_uaserial',
      'uakino_title_uaflix', 'uakino_login_uaflix', 'uakino_pass_uaflix', 'uakino_enter_uaflix',
      'uakino_title_toloka', 'uakino_login_toloka', 'uakino_pass_toloka', 'uakino_enter_toloka',
      'uakino_host_uaserials', 'uakino_host_uaflix', 'uakino_host_eneyida', 'uakino_host_uaserial']);

    // Акаунти: «Увійти» → Worker /login → cookie зберігається; Толока додає роздачі в «Торенти (UA)».
    await page.evaluate(() => { Lampa.Storage.set('uakino_login_toloka', 'me'); Lampa.Storage.set('uakino_pass_toloka', 'secret'); });
    await page.evaluate(() => window.__settingsData.filter((d) => d.param.name === 'uakino_enter_toloka')[0].onChange());
    await page.waitForFunction(() => Lampa.Storage.get('uakino_cookie_toloka', ''), null, { timeout: 10000 });
    assert.strictEqual(await page.evaluate(() => Lampa.Storage.get('uakino_cookie_toloka', '')), 'toloka_data=abc');
    assert.deepStrictEqual(loginRequests, [{ site: 'toloka', login: 'me', password: 'secret' }]);
    const merged = await page.evaluate(() => new Promise((resolve) => Lampa.Parser.get(window.__pushed, (d) => resolve(d.Results.map((r) => r.Title + ' | ' + r.Tracker)))));
    assert.deepStrictEqual(merged, [
      'Matchbox (2026) WEB-DL 2160p HDR | UKR, ENG | Rutor',
      'Matchbox 2026 1080p [Дубляж Укр] | Other',
      'Матчбокс (2026) WEB-DLRip | Toloka.to',
      'Високий потенціал (Сезон 1) 2160p | Toloka',
    ]);
    assert.ok(/toloka\/search\?q=%D0%92/.test(tolokaRequests[0]) && /cookie=toloka_data%3Dabc/.test(tolokaRequests[0]), tolokaRequests[0]);

    // Усі запити на сайти йдуть з пристрою.
    const natives = await page.evaluate(() => window.__native || 0);
    if (mode === 'direct') assert.ok(natives > 5, String(natives));
    else assert.strictEqual(natives, 1); // після першої невдачі — одразу WebView
  } finally {
    await browser.close();
    srv.close();
    up.server.close();
  }
}

test('плагін Lampa: кнопка UAKino, пошук, сезони, озвучки → Lampa.Player', () => pluginFlow('direct'));
test('плагін Lampa (native не працює): автоматично через WebView', () => pluginFlow('fallback'));

// ---------------- інші сайти ----------------

// Розмітка карток пошуку — як на справжніх сайтах (перевірено на живих сторінках).
const SITES = {
  'https://uaserials.my/index.php?do=search': '<div class="short-item"><a class="short-img img-fit" href="https://uaserials.my/9488-vysokyi-potencial-1-2-sezon.html"><img src="/posters/9488.webp" alt="Високий потенціал"><div class="short-label"><span>1-2 сезон</span></div></a><div class="th-title">Високий потенціал</div><div class="th-title-oname">High Potential</div></div>',
  'https://uaserials.my/9488-vysokyi-potencial-1-2-sezon.html': '<h1>Високий потенціал</h1><iframe class="lazyload" title="Трейлер" data-src="https://hdvbua.pro/trailer/9488"></iframe><div class="video_box"><iframe src="https://ashdi.vip/serial/777?season=1"></iframe></div>',
  'https://ashdi.vip/serial/777?season=1': "<script>new Playerjs({id:'p', file:'[{\"title\":\"UAFlix\",\"folder\":[{\"title\":\"Сезон 1\",\"folder\":[{\"title\":\"Серія 1\",\"file\":\"https://cdn.example/u1.m3u8\"},{\"title\":\"Серія 2\",\"file\":\"https://cdn.example/u2.m3u8\"}]}]}]'});</script>",
  'https://uafix.net/index.php?do=search': '<a class="sres-wrap clearfix" href="https://uafix.net/serials/visoki-potencial/"><div class="sres-img"><img src="/x.png" alt="Високий потенціал / High Potential"></div><div class="sres-text"><h2>Високий потенціал / Здібна / High Potential</h2><div class="sres-desc">Морган, матір-одиночка, вирощує трьох дітей.</div></div></a><a href="https://uafix.net/page/2/">2</a>',
  'https://uafix.net/serials/visoki-potencial/': '<h1>Високий потенціал</h1><script>var player = new Playerjs({id:"player", file:"[1080p]https://zetvideo.net/v/1080.m3u8,[720p]https://zetvideo.net/v/720.m3u8"});</script>',
  'https://uaserial.tv/search?query=': '<div class="item"><a href="/serial-high-potential" title="Високий потенціал"><img alt="Серіал \'Високий потенціал\' постер"></a></div><a href="/filters">Фільтри</a>',
  'https://uaserial.tv/serial-high-potential': '<h1 class="title">Високий потенціал</h1><iframe src="https://www.youtube.com/embed/x"></iframe><iframe src="https://example-player.net/embed/1"></iframe>',
  'https://example-player.net/embed/1': '<html>encrypted player</html>',
};

function fakeFetch(log) {
  return async (url, o = {}) => {
    log.push((o.method || 'GET') + ' ' + url);
    for (const key of Object.keys(SITES)) {
      if (url === key || (url.startsWith(key) && /search/.test(key))) return SITES[key];
    }
    const e = new Error('HTTP 404');
    e.status = 404;
    throw e;
  };
}

test('інші сайти: пошук, назви з карток, плеєри ashdi/Playerjs і діагностика', async () => {
  const { createClient, SOURCES } = require('../lib/client');
  assert.deepStrictEqual(SOURCES.map((s) => s.id), ['uakino', 'uaserials', 'uaflix', 'eneyida', 'uaserial']);
  const get = (id) => SOURCES.filter((s) => s.id === id)[0];
  const q = { title: 'Високий потенціал', original: 'High Potential' };

  const log = [];
  const uas = createClient({ source: get('uaserials'), fetchText: fakeFetch(log) });
  const p1 = await uas.online.findPages(q);
  assert.deepStrictEqual(p1.map((p) => [p.title, p.url]), [['Високий потенціал', 'https://uaserials.my/9488-vysokyi-potencial-1-2-sezon.html']]);
  const d1 = await uas.online.loadPage(p1[0].url);
  assert.deepStrictEqual(d1.items.map((i) => [i.group, i.season, i.episode, i.stream.url]), [
    ['UAFlix', 1, 1, 'https://cdn.example/u1.m3u8'],
    ['UAFlix', 1, 2, 'https://cdn.example/u2.m3u8'],
  ]);
  assert.ok(!log.some((l) => /trailer/.test(l)), 'трейлер не відкривається');

  const fix = createClient({ source: get('uaflix'), fetchText: fakeFetch([]) });
  const p2 = await fix.online.findPages(q);
  assert.deepStrictEqual(p2.map((p) => [p.title, p.url]), [['Високий потенціал / Здібна / High Potential', 'https://uafix.net/serials/visoki-potencial/']]);
  const d2 = await fix.online.loadPage(p2[0].url);
  assert.deepStrictEqual(d2.items.map((i) => [i.group, i.stream.url, Object.keys(i.stream.quality)]), [['UAFlix', 'https://zetvideo.net/v/1080.m3u8', ['1080p', '720p']]]);

  // UAFlix без доступу: трейлер замість плеєра і прохання авторизуватися.
  SITES['https://uafix.net/serials/locked/'] = '<div id="fplayer"><div class="video-box"><iframe src="https://www.youtube.com/embed/x"></iframe></div><div><span>Якщо Ви бачите тільки трейлер або плеєр не працює, тоді пройдіть авторизацію або змініть країну перегляду за допомогою ВПН!</span></div></div>';
  await assert.rejects(fix.online.loadPage('https://uafix.net/serials/locked/'), /UAFlix: сайт показує лише трейлер — серії доступні тільки після входу/);
  SITES['https://uafix.net/serials/soon/'] = '<iframe src="https://www.youtube.com/embed/y"></iframe>';
  await assert.rejects(fix.online.loadPage('https://uafix.net/serials/soon/'), /UAFlix: на сторінці поки лише трейлер — серії з озвучкою ще не вийшли/);

  const ser = createClient({ source: get('uaserial'), fetchText: fakeFetch([]) });
  const p3 = await ser.online.findPages(q);
  assert.deepStrictEqual(p3.map((p) => [p.title, p.url]), [['Високий потенціал', 'https://uaserial.tv/serial-high-potential']]);
  await assert.rejects(ser.online.loadPage(p3[0].url), (e) => {
    assert.ok(/UASerial: відео на сторінці не знайдено \(example-player\.net: не вдалося знайти відео в плеєрі; iframe\/хости: www\.youtube\.com, example-player\.net\)/.test(e.message), e.message);
    return true;
  });
});

test('зіставлення: точна назва, без спін-офів, рік фільму, без повторів, сезони з адреси', async () => {
  const { createOnline } = require('../lib/online');
  const card = (url, title, extra = '') => '<a class="sres-wrap" href="' + url + '"><h2>' + title + '</h2></a>' + extra;
  const results = {
    'Ходячі мерці': [
      card('https://uafix.net/serials/daryl/', 'Ходячі мерці: Деріл Діксон / І мертві підуть / The Walking Dead: Daryl Dixon'),
      card('https://uafix.net/serials/fear/', 'Бійтесь ходячих мерців / Fear the Walking Dead'),
      card('https://uafix.net/serials/twd/', 'Ходячі мерці / І мертві підуть / The Walking Dead'),
      card('https://uafix.net/serials/twd-copy/', 'Ходячі мерці / The Walking Dead'),
    ].join(''),
    'Аватар': [
      card('https://uafix.net/films/avatar-3/', 'Аватар 3: Вогонь і Попіл / Avatar: Fire and Ash'),
      card('https://uafix.net/films/avatar-1/', 'Аватар 1 / Avatar'),
      card('https://uafix.net/films/avatar-2009.html', 'Аватар (2022)'),
    ].join(''),
    'Високий потенціал': [
      '<div class="short-item"><a class="short-img" href="https://uaserials.my/33-vp-sezon-2.html"><img alt="І мертві підуть (Сезон 2)"></a><div class="th-title-oname">High Potential</div></div>',
      '<div class="short-item"><a class="short-img" href="https://uaserials.my/32-vp-sezon-1.html"><img alt="І мертві підуть"></a><div class="th-title-oname">High Potential</div></div>',
    ].join(''),
  };
  const sources = require('../lib/sources');
  const mk = (source) => createOnline({
    host: source.host,
    name: source.name,
    fetchText: async () => '',
    searchSite: async (q) => require('../lib/parse').parseList(results[q] || '', source.host, source.linkRe),
  });
  const fix = mk(sources.getSource('uaflix'));

  const twd = await fix.findPages({ title: 'Ходячі мерці', original: 'The Walking Dead', serial: true });
  assert.deepStrictEqual(twd.map((p) => p.url), ['https://uafix.net/serials/twd/'], 'лише сам серіал, спін-офи і повтор відкинуто');
  assert.strictEqual(twd[0].score, 100);

  // «… онлайн в HD» з атрибута title (Eneyida) обрізається.
  assert.deepStrictEqual(require('../lib/parse').parseList('<a class="short_img" href="https://eneyida.tv/5-m.html" title="Matchbox: фільм онлайн в HD"></a>', 'https://eneyida.tv').map((i) => i.title), ['Matchbox: фільм']);

  const avatar = await fix.findPages({ title: 'Аватар', original: 'Avatar', year: '2009' });
  assert.deepStrictEqual(avatar.map((p) => p.url), ['https://uafix.net/films/avatar-1/'], 'Аватар 3 не збігається, «Аватар (2022)» — інший рік');

  // Оригінальна назва поруч з карткою (UASerials) + номер сезону з адреси; сезони по порядку.
  const ser = mk(sources.getSource('uaserials'));
  const hp = await ser.findPages({ title: 'Високий потенціал', original: 'High Potential', serial: true });
  assert.deepStrictEqual(hp.map((p) => [p.season, p.original]), [[1, 'High Potential'], [2, 'High Potential']]);
});

test('однакові назви: «Керрі» — серіал 2026 vs фільми 1976/2013 за типом і роком зі сторінки', async () => {
  const { createOnline } = require('../lib/online');
  const parse = require('../lib/parse');
  const { getSource } = require('../lib/sources');
  const filterMenu = '<div class="filter">Рік</div><a href="/year-2026">2026</a><a href="/year-2025">2025</a>';
  const pages = {
    'https://uaserials.my/5260-kerri.html': '<title>Фільм «Керрі» 1976 українською онлайн</title><div>Рік: 1976 Жанр: Фільм , Драма</div>',
    'https://uaserials.my/4415-kerri.html': '<title>Фільм «Керрі» 2013 українською онлайн</title><div>Рік: 2013 Жанр: Фільм , Жахи</div>',
    'https://uaserials.my/13350-kerri.html': '<title>Серіал Керрі 1 сезон дивитися українською онлайн</title><div>Рік: 2026 Жанр: Серіал , Жахи</div>',
    // UASerial: рік лише в schema.org і <title>; у меню фільтрів — «Рік 2026».
    'https://uaserial.tv/movie-avatar': '<title>Аватар 2009 фільм онлайн українською в HD</title>' + filterMenu + '<script type="application/ld+json">{"@type":"Movie","dateCreated":"2009-12-10"}</script>',
  };
  const search = {
    uaserials: ['5260', '4415', '13350'].map((id) => '<div class="short-item"><a class="short-img" href="https://uaserials.my/' + id + '-kerri.html"><img alt="Керрі"></a><div class="th-title-oname">Carrie</div></div>').join(''),
    uaserial: '<a href="/movie-avatar" title="Аватар"></a>',
  };
  const mk = (id) => {
    const source = getSource(id);
    return createOnline({
      host: source.host,
      name: source.name,
      fetchText: async (url) => { if (pages[url]) return pages[url]; throw new Error('404 ' + url); },
      searchSite: async () => parse.parseList(search[id], source.host, source.linkRe),
    });
  };
  const ser = mk('uaserials');
  const serial = await ser.findPages({ title: 'Керрі', original: 'Carrie', year: '2026', serial: true });
  assert.deepStrictEqual(serial.map((p) => [p.url, p.year]), [['https://uaserials.my/13350-kerri.html', 2026]]);
  const film = await ser.findPages({ title: 'Керрі', original: 'Carrie', year: '1976', serial: false });
  assert.deepStrictEqual(film.map((p) => p.url), ['https://uaserials.my/5260-kerri.html']);
  // Тип невідомий (серверний запит без serial) — фільтр лише за роком.
  const any = await ser.findPages({ title: 'Керрі', original: 'Carrie', year: '2013' });
  assert.deepStrictEqual(any.map((p) => p.url), ['https://uaserials.my/4415-kerri.html']);

  assert.deepStrictEqual(parse.pageMeta(pages['https://uaserial.tv/movie-avatar'], 'https://uaserial.tv/movie-avatar'), { type: 'film', year: 2009 });
  // «Король Талси 2/3/4» — окремі сторінки сезонів з номером цифрою в кінці назви.
  search.uaserials = ['6843-korol-talsy', '4-korol-talsy-2024', '13369-korol-talsy-4'].map((id, i) => '<div class="short-item"><a class="short-img" href="https://uaserials.my/' + id + '.html"><img alt="Король Талси' + ['', ' 2', ' 4'][i] + '"></a><div class="th-title-oname">Tulsa King</div></div>').join('');
  const tulsa = await mk('uaserials').findPages({ title: 'Король Талси', original: 'Tulsa King', serial: true });
  assert.deepStrictEqual(tulsa.map((p) => p.season || null), [null, 2, 4]);

  const av = await mk('uaserial').findPages({ title: 'Аватар', original: 'Avatar', year: '2009', serial: false });
  assert.deepStrictEqual(av.map((p) => p.url), ['https://uaserial.tv/movie-avatar']);
});

test('акаунти: вхід UAFlix/Толока (cookie), розбір пошуку Толоки, гість', async () => {
  const accounts = require('../lib/accounts');
  const fakeRes = (cookies, status = 302, location = 'index.php', body = '') => ({
    status,
    ok: status < 400,
    headers: { getSetCookie: () => cookies, get: (k) => (k === 'location' ? location : null) },
    text: async () => body,
  });
  const calls = [];
  const ok = await accounts.login('uaflix', 'me', 'pw', { fetchImpl: async (url, o) => { calls.push([url, o.method, o.body]); return fakeRes(['dle_user_id=77; path=/', 'dle_password=abcdef; path=/', 'PHPSESSID=s1; path=/']); } });
  assert.deepStrictEqual(ok, { ok: true, cookie: 'dle_user_id=77; dle_password=abcdef; PHPSESSID=s1' });
  assert.deepStrictEqual(calls[0], ['https://uafix.net/', 'POST', 'login_name=me&login_password=pw&login=submit']);
  const bad = await accounts.login('uaflix', 'me', 'pw', { fetchImpl: async () => fakeRes(['dle_user_id=0; path=/'], 200, '') });
  assert.strictEqual(bad.ok, false);

  const data = encodeURIComponent('a:2:{s:11:"autologinid";s:3:"key";s:6:"userid";s:4:"4242";}');
  const tl = await accounts.login('toloka', 'me', 'pw', { fetchImpl: async (url, o) => { calls.push([url, o.body]); return fakeRes(['toloka_data=' + data + '; expires=x', 'toloka_sid=abc']); } });
  assert.ok(tl.ok, JSON.stringify(tl));
  assert.ok(/username=me&password=pw&autologin=on/.test(calls[1][1]));
  const guest = encodeURIComponent('a:2:{s:11:"autologinid";s:0:"";s:6:"userid";i:-1;}');
  assert.strictEqual((await accounts.login('toloka', 'me', 'bad', { fetchImpl: async () => fakeRes(['toloka_data=' + guest], 200, '') })).ok, false);

  // Рядки tracker.php (розмітка TorrentPier/phpBB).
  const row = (id, title, size, s, l) => '<tr class="prow1"><td class="row1"><a href="tracker.php?f=1">Фільми HD</a></td>' +
    '<td class="row4"><a class="genmed" href="viewtopic.php?t=' + (id + 1000) + '"><b>' + title + '</b></a></td><td class="row1">автор</td>' +
    '<td class="row4 small"><a class="genmed" href="download.php?id=' + id + '">' + size + '</a></td>' +
    '<td class="row4 seedmed"><b>' + s + '</b></td><td class="row4 leechmed"><b>' + l + '</b></td><td class="row4 small">2026-01-05 12:00</td></tr>';
  const html = '<table class="forumline">' + row(11, 'Аватар / Avatar (2009) 2160p UHD BDRemux Ukr/Eng', '61.2 GB', 15, 2) + row(12, 'Аватар (2009) 1080p', '8,5 GB', 3, 0) + '</table><a href="/login.php?logout=true">Вихід</a>';
  const rows = accounts.parseTolokaResults(html, 'https://toloka.to');
  assert.deepStrictEqual(rows.map((r) => [r.id, r.title, r.size, r.seeders, r.leechers, r.date]), [
    ['11', 'Аватар / Avatar (2009) 2160p UHD BDRemux Ukr/Eng', Math.round(61.2 * 1024 ** 3), 15, 2, '2026-01-05'],
    ['12', 'Аватар (2009) 1080p', Math.round(8.5 * 1024 ** 3), 3, 0, '2026-01-05'],
  ]);
  const j = accounts.tolokaToJackett(rows[0], 'https://w.dev', 'toloka_data=x');
  assert.strictEqual(j.Link, 'https://w.dev/toloka/torrent?id=11&cookie=toloka_data%3Dx');
  assert.strictEqual(j.Details, 'https://toloka.to/viewtopic.php?t=1011');
  assert.strictEqual(j.Tracker, 'Toloka');

  const searched = [];
  const r = await accounts.route('/toloka/search', new URLSearchParams({ q: 'Аватар', q2: 'Avatar', cookie: 'toloka_data=x' }), 'https://w.dev', async (url, o) => {
    searched.push([decodeURIComponent(url), o.headers.Cookie]);
    return fakeRes([], 200, '', html);
  });
  assert.strictEqual(r.json.Results.length, 2, 'без повторів між двома запитами');
  assert.deepStrictEqual(searched.map((x) => x[1]), ['toloka_data=x', 'toloka_data=x']);

  // Гість: порожня таблиця і посилання «Вхід» — зрозуміла помилка.
  await assert.rejects(accounts.tolokaSearch('x', '', { fetchImpl: async () => fakeRes([], 200, '', '<a href="/login.php" rel="nofollow">Вхід</a>') }), /Толока: вхід не виконано/);
});

// ---------------- online ----------------

test('online: розбір плейлиста, Playerjs, якості, субтитри', () => {
  const online = require('../lib/online');
  const eps = online.parsePlaylist(playlistHtml('https://uakino.best'), 'https://uakino.best');
  assert.deepStrictEqual(eps.map((e) => e.group + '|' + e.title), ['ТакТребаПродакшн|1 серія', 'ТакТребаПродакшн|2 серія', 'DniproFilm|1 серія', 'DniproFilm / Трейлер|Трейлер']);
  // Багаторівневі списки (сезон → озвучка).
  const multi = online.parsePlaylist('<li data-id="0">Сезон 1</li><li data-id="0_0">Voice A</li><li data-file="//ashdi.vip/vod/1" data-id="0_0">Серія 3</li>', 'https://uakino.best');
  assert.deepStrictEqual(multi, [{ group: 'Сезон 1 / Voice A', title: 'Серія 3', file: 'https://ashdi.vip/vod/1' }]);

  const single = online.parsePlayerjs('new Playerjs({id:"p",file:"https://cdn/x/index.m3u8"})');
  assert.deepStrictEqual(online.toStream(single.file, single.subtitle), { url: 'https://cdn/x/index.m3u8', quality: null, subtitles: [] });
  const q = online.parsePlayerjs('Playerjs({file:"[720p]//cdn/720.m3u8,[1080p]//cdn/1080.m3u8",subtitle:"[UA]//cdn/ua.vtt,[EN]//cdn/en.vtt"})');
  assert.deepStrictEqual(online.toStream(q.file, q.subtitle), {
    url: 'https://cdn/1080.m3u8',
    quality: { '720p': 'https://cdn/720.m3u8', '1080p': 'https://cdn/1080.m3u8' },
    subtitles: [{ label: 'UA', url: 'https://cdn/ua.vtt' }, { label: 'EN', url: 'https://cdn/en.vtt' }],
  });
  const f = online.parsePlayerjs("Playerjs({file:'[{\"title\":\"Озвучка\",\"folder\":[{\"title\":\"Сезон 1\",\"folder\":[{\"title\":\"Серія 5\",\"file\":\"https:\\/\\/cdn\\/5.m3u8\"}]}]}]'})");
  assert.deepStrictEqual(f.folders, [{ path: ['Озвучка', 'Сезон 1'], title: 'Серія 5', file: 'https://cdn/5.m3u8', subtitle: '' }]);
  assert.strictEqual(online.parsePlayerjs('<html>no player</html>'), null);
  assert.strictEqual(online.episodeOf('12 серія'), 12);
  assert.strictEqual(online.episodeOf('Серія 7'), 7);
  assert.strictEqual(online.seasonOf('Високий потенціал (Сезон 2)'), 2);
});

async function checkOnline(call, base, upBase) {
  const search = await call('/online/search?title=' + encodeURIComponent('Високий потенціал') + '&original=' + encodeURIComponent('High Potential'));
  assert.strictEqual(search.status, 200);
  const pages = search.body.pages;
  assert.deepStrictEqual(pages.map((p) => p.season), [1, 2]);
  assert.ok(!pages.some((p) => /комедія/.test(p.title)));

  const s1 = await call('/online/page?url=' + encodeURIComponent(pages[0].url));
  assert.strictEqual(s1.status, 200, JSON.stringify(s1.body));
  assert.strictEqual(s1.body.season, 1);
  assert.deepStrictEqual(s1.body.items.map((i) => [i.group, i.episode, i.url]), [
    ['ТакТребаПродакшн', 1, upBase + '/vod/1001'],
    ['ТакТребаПродакшн', 2, upBase + '/vod/1002'],
    ['DniproFilm', 1, upBase + '/vod/2001'],
  ]);

  const st = await call('/online/stream?url=' + encodeURIComponent(upBase + '/vod/1002') + '&referer=' + encodeURIComponent(pages[0].url));
  assert.strictEqual(st.status, 200, JSON.stringify(st.body));
  assert.deepStrictEqual(st.body, {
    url: 'https://cdn.example/1002/1080.m3u8',
    quality: { '480p': 'https://cdn.example/1002/480.m3u8', '1080p': 'https://cdn.example/1002/1080.m3u8' },
    subtitles: [{ label: 'Українські', url: 'https://cdn.example/1002.vtt' }],
  });

  const s2 = await call('/online/page?url=' + encodeURIComponent(pages[1].url));
  assert.strictEqual(s2.status, 200, JSON.stringify(s2.body));
  assert.deepStrictEqual(s2.body.items.map((i) => [i.season, i.episode, i.stream.url]), [
    [2, 1, 'https://cdn.example/s2e1/index.m3u8'],
    [2, 2, 'https://cdn.example/s2e2/index.m3u8'],
  ]);

  assert.strictEqual((await call('/online/stream?url=' + encodeURIComponent('http://169.254.169.254/latest'))).status, 403);
  assert.strictEqual((await call('/online/page?url=' + encodeURIComponent('https://evil.example/1-a.html'))).status, 403);
}

test('online: сервер /online/search, /online/page, /online/stream', async () => {
  const up = await startUpstream();
  const { createServer } = require('../server');
  const { UAKino } = require('../lib/uakino');
  const srv = createServer(new UAKino({ host: up.base, scrapePeers: false, indexFile: '' }));
  const base = await listen(srv);
  try {
    await checkOnline((p) => getJson(base + p), base, up.base);
  } finally {
    srv.close();
    up.server.close();
  }
});

// ---------------- Cloudflare Worker ----------------

test('worker: зібраний файл актуальний і віддає ті самі результати', async () => {
  const { execFileSync } = require('child_process');
  const dist = path.join(__dirname, '..', 'worker', 'dist', 'worker.mjs');
  const before = fs.existsSync(dist) ? fs.readFileSync(dist, 'utf8') : '';
  execFileSync(process.execPath, [path.join(__dirname, '..', 'build.js')]);
  assert.strictEqual(fs.readFileSync(dist, 'utf8'), before, 'worker/dist/worker.mjs застарів — запустіть node build.js');

  const worker = (await import(require('url').pathToFileURL(dist).href)).default;
  const up = await startUpstream();
  const env = { UAKINO_HOST: up.base };
  const call = (p) => worker.fetch(new Request('https://uakino.example.workers.dev' + p), env, { waitUntil() {} });
  try {
    const res = await call('/api/v2.0/indexers/all/results?Query=' + encodeURIComponent('Високий потенціал') + '&title_original=' + encodeURIComponent('High Potential') + '&year=2024');
    const body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.strictEqual(res.headers.get('access-control-allow-origin'), '*');
    const r = body.Results;
    assert.deepStrictEqual(r.map((x) => x.InfoHash), [torrents['703632'].hash, torrents['703633'].hash, torrents['703634'].hash]);
    assert.strictEqual(r[0].Size, 6000);
    assert.ok(r[0].Link.startsWith('https://uakino.example.workers.dev/download?url='));

    const dl = await call(new URL(r[1].Link).pathname + new URL(r[1].Link).search);
    assert.strictEqual(dl.status, 200);
    assert.ok(Buffer.from(await dl.arrayBuffer()).equals(torrents['703633'].buf));
    assert.strictEqual((await call('/download?url=' + encodeURIComponent('https://evil.example/torrent/1/a.torrent'))).status, 403);

    const js = await (await call('/uakino.js')).text();
    assert.ok(js.indexOf("Lampa.Component.add('uakino_online'") >= 0);

    assert.deepStrictEqual((await (await call('/api/v2.0/indexers/all/results?Query=zzzz')).json()).Results, []);
    await checkOnline(async (p) => {
      const r = await call(p);
      return { status: r.status, body: await r.json() };
    }, 'https://uakino.example.workers.dev', up.base);

    const keyed = await worker.fetch(new Request('https://w.dev/api/v2.0/indexers/all/results?Query=x'), { ...env, UAKINO_APIKEY: 'k' }, {});
    assert.strictEqual(keyed.status, 401);
  } finally {
    up.server.close();
  }
});

(async () => {
  let failed = 0;
  for (const t of tests) {
    try {
      await t.fn();
      console.log('  ✓ ' + t.name);
    } catch (e) {
      failed++;
      console.log('  ✗ ' + t.name + '\n    ' + (e.stack || e).toString().split('\n').slice(0, 6).join('\n    '));
    }
  }
  console.log(failed ? '\n' + failed + ' failed' : '\nall ' + tests.length + ' passed');
  process.exit(failed ? 1 : 0);
})();
