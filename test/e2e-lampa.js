// Ручна перевірка в справжній Lampa (lampa.mx, потрібен інтернет і Playwright): node test/e2e-lampa.js
// Відповіді сайтів підмінено фікстурами; перевіряє автовибір якості, вкладки сезонів, гортання,
// джерело без фільму і кнопку «Назад». Виводить стан екрана після кожного кроку.
const { chromium } = require('playwright');
const fs = require('fs');
const plugin = fs.readFileSync(require('path').join(__dirname, '..', 'dist', 'uakino.js'), 'utf8');
const eps = (n, q) => Array.from({ length: n }, (_, i) => ({ title: 'Серія ' + (i + 1), file: '[' + q + ']https://cdn.test/s' + i + '.m3u8' }));
const ashdi = JSON.stringify([{ title: 'UAFlix Team', folder: [{ title: 'Сезон 1', folder: eps(14, '720p') }, { title: 'Сезон 2', folder: eps(10, '720p') }] }]);
const routes = [
  [/uakino\.best/, () => ({ status: 500, body: '500 code' })],
  [/uaserials\.my\/index\.php/, () => ({ body: '<div class="short-item"><a class="short-img" href="https://uaserials.my/1-matchbox.html"><img src="/poster.svg" alt="Matchbox: фільм"></a><div class="th-title-oname">Matchbox The Movie</div></div>' })],
  [/uaserials\.my\/1-matchbox\.html/, () => ({ body: '<h1>Matchbox: фільм</h1><iframe src="https://ashdi.vip/serial/1"></iframe>' })],
  [/ashdi\.vip\/serial\/1/, () => ({ body: "<script>new Playerjs({id:'p',file:'" + ashdi + "'})</script>" })],
  [/uafix\.net\/index\.php/, () => ({ body: '<a class="sres-wrap" href="https://uafix.net/films/matchbox/"><img src="/poster.svg" alt="x"><h2>Matchbox: фільм / Matchbox The Movie</h2></a>' })],
  [/uafix\.net\/films\/matchbox/, () => ({ body: '<h1>Matchbox</h1><script>new Playerjs({id:"p",file:"[480p]https://cdn.test/m480.m3u8,[1080p]https://cdn.test/m1080.m3u8"})</script>' })],
  [/eneyida\.tv\/index\.php/, () => ({ body: '<article class="short"><a class="short_img" href="https://eneyida.tv/5-matchbox.html" title="Matchbox: фільм онлайн в HD"><img alt="Matchbox: фільм"></a></article>' })],
  [/eneyida\.tv\/5-matchbox/, () => ({ body: '<h1>Matchbox</h1><p>немає плеєра</p>' })],
  [/uaserial\.tv\/search/, () => ({ body: '<div>нічого</div>' })],
  [/poster\.svg/, () => ({ png: true })],
  [/cdn\.test\/.*\.m3u8/, () => ({ body: '#EXTM3U\n#EXT-X-STREAM-INF:RESOLUTION=1280x720\nx.m3u8' })],
];
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.route(/uakino\.best|uaserials\.my|ashdi\.vip|uafix\.net|eneyida\.tv|uaserial\.tv|cdn\.test/, (route) => {
    const url = route.request().url();
    for (const [re, fn] of routes) if (re.test(url)) { const r = fn(); if (r.png) return route.fulfill({ status: 200, contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect width="200" height="300" fill="#c33"/><text x="20" y="160" font-size="40" fill="#fff">POSTER</text></svg>' }); return route.fulfill({ status: r.status || 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Content-Type': 'text/html; charset=utf-8' }, body: r.body }); }
    route.fulfill({ status: 404, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'nf' });
  });
  await p.addInitScript(() => { try { localStorage.setItem('language', 'uk'); localStorage.setItem('lang_choosed', 'true'); } catch (e) {} });
  await p.goto('http://lampa.mx/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForFunction(() => window.appready, null, { timeout: 60000 });
  await p.waitForTimeout(6000);
  await p.addScriptTag({ content: plugin });
  await p.evaluate(() => Lampa.Activity.push({ url: '', component: 'full', id: 550, method: 'movie', source: 'tmdb', card: { id: 550, source: 'tmdb' } }));
  await p.waitForTimeout(8000);
  // відкриваємо UAKino напряму з фільмом Matchbox
  await p.evaluate(() => Lampa.Activity.push({ url: '', title: 'UAKino', component: 'uakino_online', movie: { id: 999001, title: 'Matchbox: фільм', original_title: 'Matchbox The Movie', release_date: '2026-01-01' }, page: 1 }));
  await p.waitForFunction(() => document.querySelectorAll('.uakino-online__item').length > 0 || document.querySelector('.uakino-online__empty'), null, { timeout: 30000 });
  await p.waitForTimeout(800);
  const state = () => p.evaluate(() => ({
    filters: Array.from(document.querySelectorAll('.uakino-online__filters .uakino-online__filter')).map((e) => e.textContent),
    tabs: Array.from(document.querySelectorAll('.uakino-online__tabs .uakino-online__filter')).map((e) => e.textContent + (e.classList.contains('uakino-online__filter--active') ? '*' : '')),
    items: document.querySelectorAll('.uakino-online__item').length,
    empty: (document.querySelector('.uakino-online__empty') || {}).textContent,
    focus: (document.querySelector('.uakino-online .focus') || {}).textContent,
    transform: (document.querySelector('.uakino-online .scroll__body') || {}).style ? document.querySelector('.uakino-online .scroll__body').style.transform : '',
    activity: Lampa.Activity.active().component,
    controller: Lampa.Controller.enabled().name,
  }));
  console.log('START', JSON.stringify(await state()));
  console.log('HEAD', JSON.stringify(await p.evaluate(() => ({ title: (document.querySelector('.uakino-online__head-title') || {}).textContent, sub: (document.querySelector('.uakino-online__head-sub') || {}).textContent, poster: !!document.querySelector('.uakino-online__poster') }))));
  await p.screenshot({ path: require('path').join(process.env.E2E_SHOTS || require('os').tmpdir(), 'uakino-e2e-' + (++global.shot || (global.shot = 1)) + '.png') });
  const key = async (k, n = 1) => { for (let i = 0; i < n; i++) { await p.keyboard.press(k); await p.waitForTimeout(250); } };
  const selectItems = () => p.evaluate(() => Array.from(document.querySelectorAll('.selectbox-item')).map((e) => e.textContent.trim()));
  const pick = async (re) => {
    const info = await p.evaluate((src) => {
      const els = Array.from(document.querySelectorAll('.selectbox-item'));
      return { target: els.findIndex((e) => new RegExp(src).test(e.textContent)), focus: els.findIndex((e) => e.classList.contains('focus')) };
    }, re.source);
    await key(info.target > info.focus ? 'ArrowDown' : 'ArrowUp', Math.abs(info.target - info.focus));
    await key('Enter');
  };
  // Джерело → UASerials
  await key('Enter');
  console.log('SELECT', JSON.stringify(await selectItems()));
  await pick(/UASerials/);
  await p.waitForTimeout(1500);
  console.log('UASERIALS', JSON.stringify(await state()));
  await p.screenshot({ path: require('path').join(process.env.E2E_SHOTS || require('os').tmpdir(), 'uakino-e2e-' + (++global.shot || (global.shot = 1)) + '.png') });
  // гортаємо вниз до кінця списку
  await key('ArrowDown', 6);
  console.log('SCROLLED', JSON.stringify(await state()));
  await p.screenshot({ path: require('path').join(process.env.E2E_SHOTS || require('os').tmpdir(), 'uakino-e2e-' + (++global.shot || (global.shot = 1)) + '.png') });
  // вгору до вкладок і вправо на Сезон 2
  await key('ArrowUp', 5);
  console.log('TOP', JSON.stringify(await state()));
  await key('ArrowDown'); await key('ArrowRight'); await key('Enter');
  await p.waitForTimeout(800);
  console.log('SEASON2', JSON.stringify(await state()));
  await p.screenshot({ path: require('path').join(process.env.E2E_SHOTS || require('os').tmpdir(), 'uakino-e2e-' + (++global.shot || (global.shot = 1)) + '.png') });
  // Джерело → Eneyida (фільму немає)
  await key('ArrowUp', 1);
  console.log('BEFORE ENEYIDA', JSON.stringify(await state()));
  await key('Enter');
  await pick(/Eneyida/);
  await p.waitForTimeout(1500);
  console.log('ENEYIDA', JSON.stringify(await state()));
  await p.screenshot({ path: require('path').join(process.env.E2E_SHOTS || require('os').tmpdir(), 'uakino-e2e-' + (++global.shot || (global.shot = 1)) + '.png') });
  // назад
  await key('Backspace');
  await p.waitForTimeout(800);
  console.log('BACK', JSON.stringify(await p.evaluate(() => ({ activity: Lampa.Activity.active().component }))));
  console.log('ERRORS', JSON.stringify(errs));
  return b.close();
})().catch((e) => { console.error(e); process.exit(1); });
