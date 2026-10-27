/*
 * UAKino — плагін для Lampa.
 * Кнопка «UAKino» на картці фільму/серіалу: онлайн-перегляд з українською озвучкою з UASerials,
 * UAFlix, Eneyida та UASerial (серії, сезони, озвучки, якість), як online_mod.
 * Плагін ходить на сайти сам, прямо з пристрою з Lampa (сайти показують відео лише для України).
 *
 * Це вихідний код: робочий файл dist/uakino.js збирає build.js разом з lib/ (UAKinoLib).
 * Встановлення: Lampa → Налаштування → Розширення → Додати плагін → <адреса Worker>/uakino.js
 */
(function () {
  'use strict';

  if (window.uakino_torrents_plugin) return;
  window.uakino_torrents_plugin = true;

  // Адреса Worker: сервер підставляє її сюди, коли віддає плагін за /uakino.js.
  // Через нього виконується вхід на Толоку (Lampa на Android не дає прочитати cookie).
  var BUILT_IN_SERVER = '__UAKINO_SERVER__';
  if (BUILT_IN_SERVER.indexOf('__') === 0) BUILT_IN_SERVER = '';

  var ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2 3 6v6c0 5 3.8 9.7 9 10 5.2-.3 9-5 9-10V6l-9-4Zm0 4.2 2 4.3H10l2-4.3ZM8 12h8l-4 6-4-6Z"/></svg>';
  var ICON_EYE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5Zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>';
  var ICON_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14.5v-9l7 4.5-7 4.5Z"/></svg>';

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


  // Переглянуті серії/фільми — спільні для всіх сайтів і озвучок (ключ — хеш сезону/серії/назви).
  function viewedList() {
    var v = Lampa.Storage.get('uakino_viewed', '[]');
    if (typeof v === 'string') {
      try { v = JSON.parse(v); } catch (e) { v = []; }
    }
    return Object.prototype.toString.call(v) === '[object Array]' ? v : [];
  }

  function isViewed(key) {
    return viewedList().indexOf(key) >= 0;
  }

  function markViewed(key) {
    var v = viewedList();
    if (v.indexOf(key) >= 0) return;
    v.push(key);
    if (v.length > 3000) v = v.slice(-3000);
    Lampa.Storage.set('uakino_viewed', v);
  }

  function stopLoading() {
    if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();
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

  // uakino.best не пускає навіть домашні запити з Lampa — у плагіні його немає.
  var SOURCES = UAKinoLib.SOURCES.filter(function (s) { return s.id !== 'uakino'; });
  var clients = {};

  function sourceById(id) {
    return SOURCES.filter(function (s) { return s.id === id; })[0] || SOURCES[0];
  }

  // Адреса сайту: для UAKino — «Адреса сайту», для інших — власне поле в налаштуваннях.
  function hostFor(source) {
    var key = 'uakino_host_' + source.id;
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

  // ======================= Акаунт Толоки =======================

  var ACCOUNTS = [
    { id: 'toloka', name: 'Толока', descr: 'Роздачі Толоки в «Торенти (UA)»' }
  ];

  function cookieFor(id) {
    return String(Lampa.Storage.get('uakino_cookie_' + id, '') || '');
  }

  function hasCredentials(id) {
    return !!(Lampa.Storage.get('uakino_login_' + id, '') && Lampa.Storage.get('uakino_pass_' + id, ''));
  }

  // Вхід через Worker: він надсилає форму на сайт і повертає cookie, які зберігаються на пристрої.
  function doLogin(id, done) {
    var login = Lampa.Storage.get('uakino_login_' + id, '');
    var password = Lampa.Storage.get('uakino_pass_' + id, '');
    if (!login || !password) return done(false, 'вкажіть логін і пароль');
    if (!BUILT_IN_SERVER) return done(false, 'встановіть плагін з адреси Worker (…workers.dev/uakino.js)');
    var net = new Lampa.Reguest();
    net.timeout(30000);
    net.silent(BUILT_IN_SERVER + '/login', function (json) {
      if (json && json.ok) {
        Lampa.Storage.set('uakino_cookie_' + id, json.cookie);
        done(true);
      } else {
        Lampa.Storage.set('uakino_cookie_' + id, '');
        done(false, (json && json.error) || 'помилка входу');
      }
    }, function (a, c) {
      done(false, net.errorDecode ? net.errorDecode(a, c) : "немає з'єднання з Worker");
    }, { site: id, login: login, password: password });
  }

  function accountStatus(account) {
    var login = Lampa.Storage.get('uakino_login_' + account.id, '');
    return cookieFor(account.id) ? 'Вхід виконано' + (login ? ' (' + login + ')' : '') : 'Вхід не виконано';
  }

  // Оновлює відкриті налаштування: стан, напис «Увійти/Вийти», поле пароля ховається після входу.
  function refreshAccountUI(account) {
    var logged = !!cookieFor(account.id);
    var enter = $('.settings-param[data-name="uakino_enter_' + account.id + '"]');
    enter.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');
    enter.find('.settings-param__descr').text(accountStatus(account));
    $('.settings-param[data-name="uakino_pass_' + account.id + '"]').toggleClass('hide', logged);
  }

  function loginWithNotice(account) {
    Lampa.Noty.show(account.name + ': вхід…');
    doLogin(account.id, function (ok, err) {
      Lampa.Noty.show(account.name + ': ' + (ok ? 'вхід виконано' : err));
      refreshAccountUI(account);
    });
  }

  function logout(account) {
    Lampa.Storage.set('uakino_cookie_' + account.id, '');
    Lampa.Storage.set('uakino_pass_' + account.id, '');
    $('.settings-param[data-name="uakino_pass_' + account.id + '"] .settings-param__value').text('');
    Lampa.Noty.show(account.name + ': вихід виконано');
    refreshAccountUI(account);
  }

  // Перед пошуком: якщо логін/пароль є, а входу ще не було — входимо тихо.
  function ensureLogins(done) {
    var todo = ACCOUNTS.filter(function (a) { return hasCredentials(a.id) && !cookieFor(a.id); });
    var left = todo.length;
    if (!left) return done();
    todo.forEach(function (a) {
      doLogin(a.id, function () {
        if (!--left) done();
      });
    });
  }

  var Api = {
    // Шукає одночасно на всіх увімкнених сайтах; помилка — лише якщо ніде нічого не знайдено.
    search: function (m, ok, fail) {
      var self = this;
      if (!m.loginChecked) {
        m.loginChecked = true;
        return ensureLogins(function () { self.search(m, ok, fail); });
      }
      var list = enabledSources();
      if (!list.length) return fail('усі сайти вимкнено в налаштуваннях');
      Promise.all(list.map(function (source) {
        return clientFor(source.id).online.findPages({ title: m.title, original: m.original, year: m.year, serial: m.serial }).then(function (pages) {
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
        // Якщо десь є точний збіг назви — неточні з інших сайтів не показуємо.
        var exact = pages.some(function (p) { return p.score >= 100; });
        if (exact) pages = pages.filter(function (p) { return p.score >= 100; });
        if (pages.length) ok(pages);
        else fail('нічого не знайдено. ' + problems.join(' | '));
      });
    },
    page: function (p, ok, fail) {
      promised(clientFor(p.source).online.loadPage(p.url), ok, fail);
    },
    stream: function (sourceId, url, referer, ok, fail) {
      promised(clientFor(sourceId).online.stream(url, referer), ok, fail);
    }
  };

  // ======================= Онлайн =======================

  // Висота відео (1080, 720…) з посилання: з міток якості або з master-плейлиста m3u8.
  function streamQuality(stream, done) {
    var best = 0;
    if (stream && stream.quality) {
      Object.keys(stream.quality).forEach(function (k) {
        best = Math.max(best, parseInt(k, 10) || 0);
      });
    }
    if (best || !stream || !stream.url || !/\.m3u8(\?|$)/i.test(stream.url)) return done(best);
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
    var voiceRestored = false; // озвучку з минулого перегляду відновлюємо один раз

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

    // Онлайн нічого — пояснення і кнопка торентів з українською озвучкою.
    function message(text) {
      body.empty();
      var row = $('<div class="uakino-online__filters"></div>');
      row.append(button(TORRENTS_LABEL, '', function () {
        openTorrents(movie);
      }));
      body.append(row);
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

    // Вкладки сезонів: окремі сторінки сайту (UAKino, UASerials) і/або сезони всередині плеєра.
    // Кожен сезон — одна вкладка, навіть якщо він є на кількох сторінках (плеєр зі всіма сезонами).
    function tabsOf(source) {
      var tabs = [];
      var seen = {};
      function add(season, page, label) {
        var key = season ? 's' + season : 'p' + page;
        if (seen[key]) return;
        seen[key] = true;
        tabs.push({ page: page, season: season || null, label: label });
      }
      source.pages.forEach(function (p, pi) {
        var d = source.loaded[p.url];
        if (d) {
          var seasons = [];
          (d.items || []).forEach(function (it) {
            var s = it.season || d.season || p.season || 0;
            if (seasons.indexOf(s) < 0) seasons.push(s);
          });
          if (seasons.length && seasons.some(function (s) { return s; })) {
            seasons.forEach(function (s) {
              add(s, pi, s ? 'Сезон ' + s : 'Інше');
            });
          } else {
            add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');
          }
        } else if (p.season) {
          add(p.season, pi, 'Сезон ' + p.season);
        } else {
          add(null, pi, source.pages.length > 1 ? p.title : 'Фільм');
        }
      });
      tabs.sort(function (a, b) {
        return (a.season || 0) - (b.season || 0) || a.page - b.page;
      });
      return tabs;
    }

    // Сторінки без номера сезону відкриваємо одразу — інакше незрозуміло, які сезони на них.
    function preloadPages(source, done) {
      if (source.pages.length < 2) return done();
      var todo = source.pages.filter(function (p) { return !p.season && !source.loaded[p.url]; });
      var left = todo.length;
      if (!left) return done();
      todo.forEach(function (p) {
        Api.page(p, alive(function (json) {
          source.loaded[p.url] = json || { items: [] };
          if (!--left) done();
        }), alive(function () {
          source.loaded[p.url] = { items: [] };
          if (!--left) done();
        }));
      });
    }

    function loadCurrent() {
      var source = sources[cur.source];
      if (!source.preloaded) {
        self.activity.loader(true);
        return preloadPages(source, function () {
          source.preloaded = true;
          loadCurrent();
        });
      }
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
        // Після завантаження вкладки перебудовуються — тримаємо ту саму (за сезоном або сторінкою).
        var tabs = tabsOf(source);
        for (var i = 0; i < tabs.length; i++) {
          if ((tab.season && tabs[i].season === tab.season) || (!tab.season && tabs[i].page === tab.page)) { cur.tab = i; break; }
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

    // Сезон серії: з плеєра, із заголовка сторінки або з номера сторінки («Король Талси 2»).
    function seasonOfItem(it, tab) {
      var p = sources[cur.source].pages[tab.page] || {};
      return it.season || (data && data.season) || p.season || 0;
    }

    function tabItems() {
      var tab = currentTab();
      return ((data && data.items) || []).filter(function (it) {
        return tab.season === null || seasonOfItem(it, tab) === tab.season;
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

    function select(title, list, current, onSelect, subtitles) {
      Lampa.Select.show({
        title: title,
        items: list.map(function (name, i) {
          return { title: name, subtitle: subtitles ? subtitles[i] : '', selected: i === current, index: i };
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

    function viewKey(item) {
      return String(hashFor(item) || [info.original || info.title, item.season || 0, item.episode || 0].join(':'));
    }

    function showViewed(el) {
      if (el.find('.uakino-online__viewed').length) return;
      el.addClass('uakino-online__item--viewed');
      el.append($('<div class="uakino-online__viewed">' + ICON_EYE + '</div>'));
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
      if (!voiceRestored && voices.length) {
        voiceRestored = true;
        var savedVoice = voices.indexOf(choice().voice);
        if (savedVoice >= 0) cur.voice = savedVoice;
      }
      if (cur.voice >= voices.length) cur.voice = 0;

      // Що знайдено: постер, назва, оригінальна назва й рік — видно, що це саме той фільм.
      var src = sources[cur.source];
      var shown = src.pages[currentTab().page] || src.pages[0];
      var head = $('<div class="uakino-online__head"><div class="uakino-online__head-text"><div class="uakino-online__head-title"></div><div class="uakino-online__head-sub"></div></div></div>');
      var poster = (data && data.poster) || shown.poster || src.pages[0].poster;
      if (poster) head.prepend($('<img class="uakino-online__poster">').attr('src', poster));
      // Назва з картки пошуку: «Укр / Альтернативна / Original» → заголовок + решта підписом.
      var names = String(shown.title || (data && data.title) || '').split(/\s+\/\s+/);
      [shown.original, data && data.original].forEach(function (o) {
        if (o && names.indexOf(o) < 0) names.push(o);
      });
      head.find('.uakino-online__head-title').text(names[0] || '');
      var sub = names.slice(1, 3);
      var year = (data && data.year) || shown.year;
      if (year) sub.push(year);
      sub.push(src.name);
      head.find('.uakino-online__head-sub').text(sub.join(' · '));
      body.append(head);

      // Ряд 1: джерело й озвучка — доступні завжди, навіть якщо на сайті фільму немає.
      var filters = $('<div class="uakino-online__filters"></div>');
      var sourceBtn, voiceBtn, tabBtn;
      filters.append(sourceBtn = button('Джерело:', sourceLabel(sources[cur.source]), function () {
        // Останній пункт — стандартний пошук торентів Lampa лише з українською озвучкою.
        select('Джерело', sources.map(sourceLabel).concat([TORRENTS_LABEL]), cur.source, function (i) {
          if (i === sources.length) return openTorrents(movie);
          cur.source = i;
          cur.tab = 0;
          cur.voice = 0;
          keepFocus = 'source';
          saveChoice({ manual: true });
          loadCurrent();
        }, sources.map(function (s) { return s.pages[0].title; }).concat(['Ваш парсер і TorrServer, лише з українською доріжкою']));
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
      var lastWatched = null;
      var lastKey = choice().last;
      items.forEach(function (item, index) {
        var el = $('<div class="uakino-online__item selector"><div class="uakino-online__title"></div><div class="uakino-online__info"></div><div class="uakino-online__timeline"></div></div>');
        el.find('.uakino-online__title').text(item.title || data.title);
        var meta = [];
        if (item.season || data.season) meta.push('Сезон ' + (item.season || data.season));
        if (item.group) meta.push(item.group);
        el.find('.uakino-online__info').text(meta.join(' • '));
        var view = timeline(item);
        if (view && Lampa.Timeline.render) el.find('.uakino-online__timeline').append(Lampa.Timeline.render(view));
        // Значок «переглянуто»: серію запускали або Lampa записала, що її додивилися.
        var key = viewKey(item);
        if (isViewed(key) || (view && view.percent >= 85)) showViewed(el);
        if (key === lastKey) lastWatched = el[0];
        el.on('hover:enter', function () {
          play(items, index, el);
        });
        list.append(focusable(el));
      });
      body.append(list);
      // Відкриваємо на останній переглянутій серії.
      if (lastWatched && !keepFocus) last = lastWatched;

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
        if (tab && tab.season !== null && seasonOfItem(it, tab) !== tab.season) return;
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

    function play(items, index, el) {
      var item = items[index];
      markViewed(viewKey(item));
      saveChoice({ last: viewKey(item), manual: true });
      if (el) showViewed(el);
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
              // Плеєр дійшов до наступної серії — вона теж переглянута.
              markViewed(viewKey(it));
              saveChoice({ last: viewKey(it) });
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

  // ======================= Торенти (UA) =======================
  // Стандартний екран торентів Lampa (ваш парсер, фільтри, запуск через TorrServer), але лише
  // роздачі з українською доріжкою: позначки UKR/UA/«Укр…»/«Україн…» у назві або трекер Толока.

  var TORRENTS_LABEL = 'Торенти (UA)';
  var UA_LATIN = /(^|[^a-z0-9])(ukr|ua|ukrainian)([^a-z0-9]|$)/i;
  var UA_CYRILLIC = /укр|україн/i;
  var UA_TRACKERS = /toloka|hurtom/i;

  function isUkrainian(r) {
    var text = String((r && r.Title) || '');
    return UA_LATIN.test(text) || UA_CYRILLIC.test(text) || UA_TRACKERS.test(String((r && r.Tracker) || ''));
  }

  function prepareTorrent(r) {
    if (Lampa.Utils) {
      if (Lampa.Utils.bytesToSize && r.Size) r.size = Lampa.Utils.bytesToSize(r.Size);
      if (Lampa.Utils.hash) r.hash = Lampa.Utils.hash(r.Title);
      if (Lampa.Utils.strToTime && r.PublishDate) r.PublisTime = Lampa.Utils.strToTime(r.PublishDate);
    }
    return r;
  }

  // Роздачі Толоки (через Worker з cookie користувача) для «Торенти (UA)».
  function tolokaSearch(params, done) {
    var cookie = cookieFor('toloka');
    if (!cookie || !BUILT_IN_SERVER) return done([], '');
    var net = new Lampa.Reguest();
    net.timeout(30000);
    net.silent(BUILT_IN_SERVER + '/toloka/search?q=' + enc(params.search_one || params.search) + '&q2=' + enc(params.search_two || '') + '&cookie=' + enc(cookie), function (json) {
      done(((json && json.Results) || []).map(prepareTorrent), '');
    }, function (a) {
      var err = (a && a.responseJSON && a.responseJSON.error) || 'Толока недоступна';
      // Вхід застарів — наступного разу увійдемо заново.
      if (a && a.status === 401) Lampa.Storage.set('uakino_cookie_toloka', '');
      done([], err);
    });
  }

  function patchParser() {
    if (!Lampa.Parser || Lampa.Parser.uakino_ua_patched) return;
    var original = Lampa.Parser.get;
    Lampa.Parser.get = function (params, ok, fail) {
      if (!params || !params.uakino_ua) return original.apply(this, arguments);
      var pending = 2;
      var main = null;
      var mainError = '';
      var extra = [];
      var extraError = '';
      function finish() {
        if (--pending) return;
        var results = ((main && main.Results) || []).filter(isUkrainian);
        var titles = {};
        results.forEach(function (r) { titles[String(r.Title).toLowerCase()] = true; });
        extra.forEach(function (r) {
          if (!titles[String(r.Title).toLowerCase()]) results.push(r);
        });
        if (!main && !extra.length) return fail(mainError || extraError || 'нічого не знайдено');
        var data = main || { Results: [] };
        data.Results = results;
        ok(data);
      }
      original.call(this, params, function (data) {
        main = data;
        finish();
      }, function (err) {
        mainError = err;
        finish();
      });
      tolokaSearch(params, function (list, err) {
        extra = list;
        extraError = err;
        finish();
      });
    };
    Lampa.Parser.uakino_ua_patched = true;
  }

  function openTorrents(movie) {
    patchParser();
    // Якщо вказано логін Толоки, а входу ще не було — спершу входимо.
    if (hasCredentials('toloka') && !cookieFor('toloka')) {
      return doLogin('toloka', function () { openTorrents(movie); });
    }
    var info = movieInfo(movie);
    Lampa.Activity.push({
      url: '',
      title: TORRENTS_LABEL,
      component: 'torrents',
      search: info.original || info.title,
      search_one: info.title,
      search_two: info.original,
      movie: movie,
      page: 1,
      uakino_ua: true
    });
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
    '.uakino-online__head{display:flex;align-items:center;margin-bottom:1.2em}' +
    '.uakino-online__poster{width:5em;height:7.5em;object-fit:cover;border-radius:.6em;margin-right:1.2em;background:rgba(255,255,255,.05);flex-shrink:0}' +
    '.uakino-online__head-title{font-size:1.6em;font-weight:600}' +
    '.uakino-online__head-sub{margin-top:.4em;opacity:.6}' +
    '.uakino-online__filters,.uakino-online__tabs{display:flex;flex-wrap:wrap;margin-bottom:.5em}' +
    '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' +
    '.uakino-online__filter--active{background:rgba(255,255,255,.3)}' +
    '.uakino-online__list{display:block}' +
    '.uakino-online__item{display:block;position:relative;padding:1em 3.5em 1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' +
    '.uakino-online__viewed{position:absolute;right:1.2em;top:50%;width:1.6em;height:1.6em;margin-top:-.8em;opacity:.85}' +
    '.uakino-online__item--viewed .uakino-online__title{opacity:.75}' +
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

    var torrent = render.find('.view--torrent');
    if (torrent.length) torrent.before(online);
    else render.find('.full-start-new__buttons, .full-start__buttons').first().append(online);

    // Оновлюємо навігацію, щоб кнопка стала доступною з пульта.
    if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');
  }

  function addSettings() {
    if (!Lampa.SettingsApi) return;
    Lampa.SettingsApi.addComponent({ component: 'uakino', name: 'UAKino', icon: ICON });
    SOURCES.forEach(function (source) {
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_src_' + source.id, type: 'trigger', default: true },
        field: { name: source.name, description: 'Шукати на ' + source.host.replace(/^https?:\/\//, '') }
      });
    });
    ACCOUNTS.forEach(function (account) {
      var relogin = function () {
        if (hasCredentials(account.id)) loginWithNotice(account);
      };
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_title_' + account.id, type: 'title' },
        field: { name: account.name + ' — акаунт' }
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_login_' + account.id, type: 'input', values: '', default: '', placeholder: 'логін' },
        field: { name: 'Логін', description: account.descr },
        onChange: relogin
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_pass_' + account.id, type: 'input', values: '', default: '', placeholder: 'пароль' },
        field: { name: 'Пароль' },
        onChange: relogin,
        // Після входу пароль не показуємо.
        onRender: function (item) {
          item.toggleClass('hide', !!cookieFor(account.id));
        }
      });
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_enter_' + account.id, type: 'button' },
        field: { name: 'Увійти', description: 'Вхід не виконано' },
        // Стан рахуємо щоразу при відкритті налаштувань, а не один раз при запуску.
        onRender: function (item) {
          var logged = !!cookieFor(account.id);
          item.find('.settings-param__name').text(logged ? 'Вийти' : 'Увійти');
          item.find('.settings-param__descr').text(accountStatus(account));
        },
        onChange: function () {
          if (cookieFor(account.id)) logout(account);
          else loginWithNotice(account);
        }
      });
    });
    SOURCES.forEach(function (source) {
      Lampa.SettingsApi.addParam({
        component: 'uakino',
        param: { name: 'uakino_host_' + source.id, type: 'input', values: '', default: '', placeholder: source.host },
        field: { name: 'Адреса ' + source.name, description: 'Дзеркало, якщо основна адреса не відкривається. За замовчуванням: ' + source.host }
      });
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
