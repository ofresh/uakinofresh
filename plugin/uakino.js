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
          Referer: o.referer || siteHost() + '/'
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
      if (mode() === 'direct') {
        return promised(direct().online.findPages({ title: m.title, original: m.original }), ok, function (err) {
          // Діагностика: чи відкривається хоча б головна сторінка сайту.
          deviceFetch(siteHost() + '/', {}).then(function (html) {
            var t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            fail(err + '. Головна сторінка відкривається: «' + (t ? t[1].trim().slice(0, 60) : html.length + ' байт') + '»');
          }, function (e) {
            fail(err + '. Головна сторінка теж не відкривається: ' + e.message);
          });
        });
      }
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
