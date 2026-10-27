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


  // Короткий опис відповіді: статус і заголовок/початок сторінки (видно, хто відповів — сайт чи Cloudflare).
  function describe(a) {
    var status = a && a.status;
    var text = a && (a.responseText || a.message || a.error);
    if (text && typeof text === 'string') {
      var title = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      text = (title ? title[1] : text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
    } else text = '';
    var head = status ? 'HTTP ' + status : "немає з'єднання";
    if (/just a moment|attention required|cloudflare|ddos/i.test(text)) head += ' (захист Cloudflare)';
    return head + (text ? ' «' + text + '»' : '');
  }

  // Lampa на Android має два способи запиту: через застосунок (native) і через WebView (XHR).
  // Пробуємо обидва; той, що спрацював, далі йде першим.
  var preferred = null;
  var BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

  function deviceFetch(url, o) {
    o = o || {};
    var methods = [];
    if (typeof new Lampa.Reguest()['native'] === 'function') methods.push('native');
    methods.push('silent');
    if (preferred && methods.indexOf(preferred) > 0) methods = [preferred].concat(methods.filter(function (m) { return m !== preferred; }));

    var errors = [];

    return new Promise(function (resolve, reject) {
      function attempt(i) {
        var method = methods[i];
        var net = new Lampa.Reguest();
        net.timeout(20000);
        // Застосунок Lampa сам підставляє заголовки (і сайт відсіює такі запити), тож для native
        // представляємося звичайним браузером; WebView заборонені заголовки однаково ігнорує.
        var headers = method === 'native' ? {
          'User-Agent': BROWSER_UA,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.8',
          Referer: o.referer || url.replace(/^(https?:\/\/[^/]+).*$/, '$1/')
        } : {};
        if (o.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';
        if (o.body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        net[method](url, function (text) {
          preferred = method;
          resolve(typeof text === 'string' ? text : JSON.stringify(text));
        }, function (a) {
          errors.push((method === 'native' ? 'застосунок' : 'WebView') + ': ' + describe(a));
          if (i + 1 < methods.length) return attempt(i + 1);
          var err = new Error(errors.join(', '));
          err.status = a && a.status;
          reject(err);
        }, o.body || false, { dataType: 'text', headers: headers });
      }
      attempt(0);
    });
  }

  // ======================= Сайти =======================

  var SOURCES = UAKinoLib.SOURCES;
  var clients = {};

  function sourceById(id) {
    return SOURCES.filter(function (s) { return s.id === id; })[0] || SOURCES[0];
  }

  // Адреса сайту: для UAKino — «Адреса сайту», для інших — власне поле в налаштуваннях.
  function hostFor(source) {
    var key = source.id === 'uakino' ? 'uakino_host' : 'uakino_host_' + source.id;
    return String(Lampa.Storage.get(key, '') || source.host).trim().replace(/\/+$/, '');
  }

  function clientFor(id) {
    var source = sourceById(id);
    var host = hostFor(source);
    if (!clients[id] || clients[id].host !== host) clients[id] = UAKinoLib.createClient({ source: source, host: host, fetchText: deviceFetch });
    return clients[id];
  }

  function enabledSources() {
    return SOURCES.filter(function (s) {
      var v = Lampa.Storage.get('uakino_src_' + s.id, true);
      return v !== false && v !== 'false';
    });
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
    // Торенти є лише на UAKino.
    torrents: function (m, ok, fail) {
      if (mode() === 'direct') return promised(clientFor('uakino').torrents({ title: m.title, original: m.original, year: m.year }), ok, fail);
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
    // Шукає одночасно на всіх увімкнених сайтах; помилка — лише якщо ніде нічого не знайдено.
    search: function (m, ok, fail) {
      if (mode() === 'server') {
        return serverGet('/online/search?title=' + enc(m.title) + '&original=' + enc(m.original) + '&year=' + enc(m.year), function (json) {
          ok(((json && json.pages) || []).map(function (p) { p.source = 'uakino'; return p; }));
        }, fail);
      }
      var list = enabledSources();
      if (!list.length) return fail('усі сайти вимкнено в налаштуваннях');
      Promise.all(list.map(function (source) {
        return clientFor(source.id).online.findPages({ title: m.title, original: m.original }).then(function (pages) {
          return { source: source, pages: pages };
        }, function (e) {
          return { source: source, pages: [], error: (e && e.message) || String(e) };
        });
      })).then(function (results) {
        var pages = [];
        var problems = [];
        results.forEach(function (r) {
          r.pages.forEach(function (p) {
            p.source = r.source.id;
            pages.push(p);
          });
          problems.push(r.source.name + ': ' + (r.error || (r.pages.length ? r.pages.length + ' знайдено' : 'нічого не знайдено')));
        });
        if (pages.length) ok(pages);
        else fail('нічого не знайдено. ' + problems.join(' | '));
      });
    },
    page: function (p, ok, fail) {
      if (mode() === 'direct') return promised(clientFor(p.source).online.loadPage(p.url), ok, fail);
      serverGet('/online/page?url=' + enc(p.url), ok, fail);
    },
    stream: function (sourceId, url, referer, ok, fail) {
      if (mode() === 'direct') return promised(clientFor(sourceId).online.stream(url, referer), ok, fail);
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

  // Висота відео (1080, 720…) з посилання: з міток якості або з master-плейлиста m3u8.
  function streamQuality(stream, done) {
    var best = 0;
    if (stream && stream.quality) {
      Object.keys(stream.quality).forEach(function (k) {
        best = Math.max(best, parseInt(k, 10) || 0);
      });
    }
    if (best || !stream || !stream.url || mode() !== 'direct' || !/\.m3u8(\?|$)/i.test(stream.url)) return done(best);
    deviceFetch(stream.url, {}).then(function (text) {
      var re = /RESOLUTION=\d+x(\d+)/gi;
      var m;
      while ((m = re.exec(text))) best = Math.max(best, parseInt(m[1], 10) || 0);
      done(best);
    }, function () {
      done(0);
    });
  }

  function OnlineComponent(object) {
    var scroll = new Lampa.Scroll({ mask: true, over: true, step: 250 });
    var html = $('<div class="uakino-online"></div>');
    var body = $('<div class="uakino-online__body"></div>');
    var movie = object.movie || {};
    var info = movieInfo(movie);
    var self = this;
    var destroyed = false;
    var last = null;
    var storeKey = 'uakino_choice_' + (movie.id || info.original || info.title);

    // Джерела: [{ id, name, pages: [...], loaded: { url: data }, quality }]
    var sources = [];
    var cur = { source: 0, tab: 0, voice: 0 };
    var data = null; // завантажена сторінка поточної вкладки
    var pageError = '';
    var keepFocus = ''; // що виділити після перебудови: 'source' | 'voice' | 'tab'

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

    function saveChoice(extra) {
      var c = choice();
      var src = sources[cur.source];
      c.source = src ? src.id : c.source;
      c.tab = cur.tab;
      c.voice = currentVoices()[cur.voice] || c.voice || '';
      if (extra) Object.keys(extra).forEach(function (k) { c[k] = extra[k]; });
      Lampa.Storage.set(storeKey, c);
    }

    function message(text) {
      body.empty();
      body.append($('<div class="uakino-online__empty"></div>').text(text));
      self.activity.loader(false);
      self.activity.toggle();
    }

    this.create = function () {
      scroll.minus();
      scroll.append(body);
      html.append(scroll.render());
      scroll.onWheel = function (step) {
        Navigator.move(step > 0 ? 'down' : 'up');
      };
      this.activity.loader(true);

      Api.search(info, alive(function (pages) {
        var byId = {};
        (pages || []).forEach(function (p) {
          if (!byId[p.source]) {
            byId[p.source] = { id: p.source, name: sourceById(p.source).name, pages: [], loaded: {}, quality: null };
            sources.push(byId[p.source]);
          }
          byId[p.source].pages.push(p);
        });
        if (!sources.length) return message('Нічого не знайдено');
        pickDefault();
      }), alive(function (err) {
        message('UAKino: ' + err);
      }));
      return this.render();
    };

    // За замовчуванням — джерело, вибране раніше для цього фільму, інакше — з найвищою якістю.
    function pickDefault() {
      var saved = choice();
      var savedIndex = -1;
      sources.forEach(function (s, i) {
        if (s.id === saved.source && saved.manual) savedIndex = i;
      });
      if (savedIndex >= 0 || sources.length === 1) {
        cur.source = Math.max(0, savedIndex);
        cur.tab = savedIndex >= 0 && saved.tab < tabsOf(sources[cur.source]).length ? saved.tab : 0;
        return loadCurrent();
      }

      var left = sources.length;
      var finished = false;
      var finish = function () {
        if (finished || destroyed) return;
        finished = true;
        var best = 0;
        sources.forEach(function (s, i) {
          if ((s.quality || 0) > (sources[best].quality || 0)) best = i;
        });
        cur.source = best;
        cur.tab = 0;
        loadCurrent();
      };
      // Не чекаємо повільні сайти довше 15 секунд.
      setTimeout(finish, 15000);
      sources.forEach(function (s) {
        probeSource(s, function () {
          left--;
          if (!left) finish();
        });
      });
    }

    function probeSource(source, done) {
      var page = source.pages[0];
      Api.page(page, function (json) {
        source.loaded[page.url] = json;
        var first = (json.items || [])[0];
        if (!first) return done();
        resolve(source.id, json, first, function (stream) {
          streamQuality(stream, function (q) {
            source.quality = q;
            done();
          });
        }, function () {
          done();
        });
      }, function () {
        source.quality = -1;
        done();
      });
    }

    // Вкладки сезонів: окремі сторінки сайту (UAKino) або сезони всередині однієї сторінки.
    function tabsOf(source) {
      var tabs = [];
      source.pages.forEach(function (p, pi) {
        var d = source.loaded[p.url];
        var seasons = [];
        if (d) {
          (d.items || []).forEach(function (it) {
            var s = it.season || d.season || 0;
            if (seasons.indexOf(s) < 0) seasons.push(s);
          });
          seasons.sort(function (a, b) { return a - b; });
        }
        if (seasons.length > 1) {
          seasons.forEach(function (s) {
            tabs.push({ page: pi, season: s, label: s ? 'Сезон ' + s : 'Інше' });
          });
        } else {
          var s0 = seasons[0] || p.season || 0;
          tabs.push({ page: pi, season: null, label: s0 ? 'Сезон ' + s0 : (source.pages.length > 1 ? p.title : 'Фільм') });
        }
      });
      return tabs;
    }

    function loadCurrent() {
      var source = sources[cur.source];
      var tab = tabsOf(source)[cur.tab] || tabsOf(source)[0];
      var page = source.pages[tab.page];
      pageError = '';
      if (source.loaded[page.url]) {
        data = source.loaded[page.url];
        return build();
      }
      self.activity.loader(true);
      Api.page(page, alive(function (json) {
        source.loaded[page.url] = json || { items: [] };
        data = source.loaded[page.url];
        // Після завантаження сторінка могла розпастися на кілька сезонів — тримаємо вкладку на ній.
        var tabs = tabsOf(source);
        for (var i = 0; i < tabs.length; i++) {
          if (tabs[i].page === tab.page) { cur.tab = i; break; }
        }
        build();
      }), alive(function (err) {
        data = null;
        pageError = err;
        build();
      }));
    }

    function currentTab() {
      var tabs = tabsOf(sources[cur.source]);
      return tabs[cur.tab] || tabs[0];
    }

    function tabItems() {
      var tab = currentTab();
      return ((data && data.items) || []).filter(function (it) {
        return tab.season === null || (it.season || data.season || 0) === tab.season;
      });
    }

    function currentVoices() {
      var voices = [];
      tabItems().forEach(function (it) {
        if (voices.indexOf(it.group) < 0) voices.push(it.group);
      });
      return voices;
    }

    function currentItems() {
      var voice = currentVoices()[cur.voice];
      return tabItems().filter(function (it) {
        return it.group === voice;
      });
    }

    function sourceLabel(s) {
      var q = s.quality > 0 ? ' · ' + s.quality + 'p' : '';
      return s.name + q;
    }

    function focusable(el) {
      el.on('hover:focus', function (e) {
        last = e.target;
        scroll.update($(e.target), true);
      });
      return el;
    }

    function button(label, value, onEnter, active) {
      var btn = $('<div class="uakino-online__filter selector"></div>');
      btn.text(label + (value ? ' ' + value : ''));
      if (active) btn.addClass('uakino-online__filter--active');
      btn.on('hover:enter', onEnter);
      return focusable(btn);
    }

    function select(title, list, current, onSelect) {
      Lampa.Select.show({
        title: title,
        items: list.map(function (name, i) {
          return { title: name, selected: i === current, index: i };
        }),
        onSelect: function (a) {
          Lampa.Controller.toggle('content');
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
      body.empty();
      last = null;
      var voices = currentVoices();
      if (cur.voice >= voices.length) cur.voice = 0;

      // Ряд 1: джерело й озвучка — доступні завжди, навіть якщо на сайті фільму немає.
      var filters = $('<div class="uakino-online__filters"></div>');
      var sourceBtn, voiceBtn, tabBtn;
      filters.append(sourceBtn = button('Джерело:', sourceLabel(sources[cur.source]), function () {
        select('Джерело', sources.map(sourceLabel), cur.source, function (i) {
          cur.source = i;
          cur.tab = 0;
          cur.voice = 0;
          keepFocus = 'source';
          saveChoice({ manual: true });
          loadCurrent();
        });
      }));
      if (voices.length > 1) {
        filters.append(voiceBtn = button('Озвучка:', voices[cur.voice], function () {
          select('Озвучка', voices, cur.voice, function (i) {
            cur.voice = i;
            keepFocus = 'voice';
            saveChoice();
            build();
          });
        }));
      }
      body.append(filters);

      // Ряд 2: вкладки сезонів.
      var tabs = tabsOf(sources[cur.source]);
      if (tabs.length > 1) {
        var row = $('<div class="uakino-online__tabs"></div>');
        tabs.forEach(function (tab, i) {
          var tb = button(tab.label, '', function () {
            if (i === cur.tab) return;
            cur.tab = i;
            cur.voice = Math.max(0, currentVoicesFor(i).indexOf(voices[cur.voice]));
            keepFocus = 'tab';
            saveChoice();
            loadCurrent();
          }, i === cur.tab);
          if (i === cur.tab) tabBtn = tb;
          row.append(tb);
        });
        body.append(row);
      }

      var items = pageError ? [] : currentItems();
      if (pageError) {
        body.append($('<div class="uakino-online__empty"></div>').text(pageError + '. Виберіть інше джерело.'));
      } else if (!items.length) {
        body.append($('<div class="uakino-online__empty"></div>').text('На цій сторінці немає відео. Виберіть інше джерело.'));
      }

      var list = $('<div class="uakino-online__list"></div>');
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
        list.append(focusable(el));
      });
      body.append(list);

      // Курсор лишається на кнопці, яку щойно натиснули.
      var keep = keepFocus === 'tab' ? tabBtn : keepFocus === 'voice' ? voiceBtn : keepFocus === 'source' ? sourceBtn : null;
      if (keep) last = keep[0];
      keepFocus = '';

      self.activity.loader(false);
      self.activity.toggle();
    }

    // Озвучки на іншій вкладці (щоб зберегти вибрану озвучку при перемиканні сезону).
    function currentVoicesFor(tabIndex) {
      var tab = tabsOf(sources[cur.source])[tabIndex];
      var voices = [];
      ((data && data.items) || []).forEach(function (it) {
        if (tab && tab.season !== null && (it.season || data.season || 0) !== tab.season) return;
        if (voices.indexOf(it.group) < 0) voices.push(it.group);
      });
      return voices;
    }

    function resolve(sourceId, page, item, ok, fail) {
      if (item.stream) return ok(item.stream);
      Api.stream(sourceId, item.url, page.url, function (json) {
        var s = json && json.items && json.items.length ? json.items[0].stream : json;
        if (!s || !s.url) return fail('посилання на відео не знайдено');
        item.stream = s;
        ok(s);
      }, fail);
    }

    function playerItem(item, stream) {
      var p = { title: item.title || data.title, url: stream.url };
      if (stream.quality) p.quality = stream.quality;
      if (stream.subtitles && stream.subtitles.length) p.subtitles = stream.subtitles;
      var view = timeline(item);
      if (view) p.timeline = view;
      return p;
    }

    function play(items, index) {
      var item = items[index];
      var sourceId = sources[cur.source].id;
      var page = data;
      if (Lampa.Loading && Lampa.Loading.start) Lampa.Loading.start(function () { stopLoading(); });
      resolve(sourceId, page, item, function (stream) {
        stopLoading();
        var first = playerItem(item, stream);
        var playlist = items.map(function (it, i) {
          if (i === index) return first;
          if (it.stream) return playerItem(it, it.stream);
          var cell = { title: it.title || page.title };
          // Посилання на інші серії отримуємо лише коли до них дійде плеєр.
          cell.url = function (call) {
            resolve(sourceId, page, it, function (s) {
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
        link: this,
        toggle: function () {
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        up: function () {
          if (Navigator.canmove('up')) Navigator.move('up');
          else Lampa.Controller.toggle('head');
        },
        down: function () {
          if (Navigator.canmove('down')) Navigator.move('down');
        },
        left: function () {
          if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        right: function () {
          if (Navigator.canmove('right')) Navigator.move('right');
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
    '.uakino-online__body{padding:0 1.5em 1.5em}' +
    '.uakino-online__filters,.uakino-online__tabs{display:flex;flex-wrap:wrap;margin-bottom:.5em}' +
    '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' +
    '.uakino-online__filter--active{background:rgba(255,255,255,.3)}' +
    '.uakino-online__list{display:block}' +
    '.uakino-online__item{display:block;padding:1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' +
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
    SOURCES.forEach(function (source) {
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_src_' + source.id, type: 'trigger', default: true },
        field: { name: source.name, description: 'Шукати на ' + source.host.replace(/^https?:\/\//, '') + (source.torrents ? ' (онлайн і торенти)' : '') }
      });
    });
    SOURCES.forEach(function (source) {
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: source.id === 'uakino' ? 'uakino_host' : 'uakino_host_' + source.id, type: 'input', values: '', default: '', placeholder: source.host },
        field: { name: 'Адреса ' + source.name, description: 'Дзеркало, якщо основна адреса не відкривається. За замовчуванням: ' + source.host }
      });
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
