// Згенеровано build.js — не редагуйте вручну.
// UAKino → Lampa: парсер uakino.best для Cloudflare Workers.

const __PLUGIN_SOURCE__ = "/* UAKino для Lampa — зібрано build.js з plugin/uakino.js та lib/. Не редагуйте вручну. */\n(function () {\nvar UAKinoLib = (function () {\nvar __modules = {\n  \"lib/client.js\": [{\"./parse\":\"lib/parse.js\",\"./online\":\"lib/online.js\",\"./jackett\":\"lib/jackett.js\"}, function (module, exports, require) {\n'use strict';\n\n// Клієнт uakino, що працює прямо на пристрої з Lampa (ТВ, приставка, телефон):\n// сайт бачить домашній IP, тому Cloudflare його пропускає. Вбудовується в плагін під час збирання.\n//\n// fetchText(url, { method, body, xhr, referer }) → Promise<string>\n\nconst parse = require('./parse');\nconst { createOnline } = require('./online');\nconst { toJackett } = require('./jackett');\n\nfunction createClient({ host, fetchText, maxPages = 5 }) {\n  host = String(host || 'https://uakino.best').replace(/\\/+$/, '');\n  const searches = new Map();\n  const pages = new Map();\n\n  async function searchSite(query) {\n    const q = String(query || '').trim();\n    if (q.length < 2) return [];\n    const key = q.toLowerCase();\n    if (searches.has(key)) return searches.get(key);\n    let list = parse.parseList(await fetchText(host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(q), {}), host);\n    if (!list.length) {\n      const body = 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(q);\n      try {\n        list = parse.parseList(await fetchText(host + '/index.php?do=search', { method: 'POST', body }), host);\n      } catch (e) { /* лишаємо порожній список */ }\n    }\n    searches.set(key, list);\n    return list;\n  }\n\n  async function page(url) {\n    if (!pages.has(url)) pages.set(url, parse.parsePage(await fetchText(url, {}), url, host));\n    return pages.get(url);\n  }\n\n  // Торенти у форматі Jackett. Link веде прямо на uakino — .torrent завантажує TorrServer.\n  async function torrents({ title = '', original = '', query = '', year = null }) {\n    const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);\n    if (!titles.length) return [];\n    const found = new Map();\n    let lastError = null;\n    for (const q of titles) {\n      try {\n        for (const item of await searchSite(q)) {\n          if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles) }));\n        }\n      } catch (e) { lastError = e; }\n    }\n    if (!found.size && lastError) throw lastError;\n\n    let list = Array.from(found.values()).sort((a, b) => b.score - a.score);\n    const relevant = list.filter((c) => c.score >= 40);\n    if (relevant.length) list = relevant;\n    list = list.slice(0, maxPages);\n\n    const loaded = await Promise.all(list.map((c) => page(c.url).catch(() => null)));\n    const out = [];\n    loaded.forEach((p) => {\n      if (!p) return;\n      p.torrents.forEach((t) => {\n        const r = toJackett({ page: p, torrent: t, meta: null, peers: null }, '');\n        r.Link = t.url;\n        out.push(r);\n      });\n    });\n    if (year) {\n      const y = Number(year);\n      const yearOf = (r) => { const m = r.Title.match(/\\((\\d{4})\\)/); return m ? Number(m[1]) : y; };\n      out.sort((a, b) => Math.abs(yearOf(a) - y) - Math.abs(yearOf(b) - y));\n    }\n    return out;\n  }\n\n  return { host, searchSite, torrents, online: createOnline({ host, fetchText, searchSite }) };\n}\n\nmodule.exports = { createClient };\n\n  }],\n  \"lib/parse.js\": [{}, function (module, exports, require) {\n'use strict';\n\n// Розбір HTML uakino.best (рушій DataLife Engine) регулярними виразами,\n// щоб сервер працював без сторонніх залежностей.\n\nconst ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '\"', apos: \"'\", nbsp: ' ', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…' };\n\nfunction decodeEntities(s) {\n  return String(s || '').replace(/&(#x[0-9a-f]+|#\\d+|[a-z]+);/gi, (m, e) => {\n    if (e[0] === '#') {\n      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);\n      return Number.isFinite(code) ? String.fromCodePoint(code) : m;\n    }\n    const v = ENTITIES[e.toLowerCase()];\n    return v === undefined ? m : v;\n  });\n}\n\nfunction stripTags(s) {\n  return decodeEntities(String(s || '').replace(/<script[\\s\\S]*?<\\/script>/gi, ' ').replace(/<[^>]*>/g, ' '))\n    .replace(/\\s+/g, ' ')\n    .trim();\n}\n\nfunction safeDecode(s) {\n  try { return decodeURIComponent(s); } catch (e) { return s; }\n}\n\n// Абсолютна адреса з коректно закодованими кирилицею та пробілами.\nfunction absoluteUrl(href, host) {\n  if (!href) return '';\n  let url = decodeEntities(href.trim());\n  if (url.indexOf('//') === 0) url = 'https:' + url;\n  else if (!/^https?:\\/\\//i.test(url)) url = host.replace(/\\/+$/, '') + '/' + url.replace(/^\\/+/, '');\n  try {\n    const u = new URL(url);\n    u.pathname = u.pathname.split('/').map((p) => encodeURIComponent(safeDecode(p))).join('/');\n    return u.toString();\n  } catch (e) {\n    return '';\n  }\n}\n\n// Посилання на інші дзеркала uakino (uakino.best, uakino.me, ...) переписуються\n// на адресу, з якою працює парсер. Чужі домени відкидаються (повертається '').\nfunction localize(url, host) {\n  try {\n    const u = new URL(url);\n    const h = new URL(host);\n    const a = u.hostname.replace(/^www\\./, '');\n    if (a === h.hostname.replace(/^www\\./, '')) return u.toString();\n    if (!/(^|\\.)uakino\\.[a-z]+$/i.test(a)) return '';\n    u.protocol = h.protocol;\n    u.host = h.host;\n    return u.toString();\n  } catch (e) {\n    return '';\n  }\n}\n\n// Сторінки матеріалів DLE мають вигляд /розділ/12345-slug.html\nconst NEWS_RE = /\\/(\\d+)-[^/]*\\.html$/;\n\nfunction newsId(url) {\n  try {\n    const m = new URL(url).pathname.match(NEWS_RE);\n    return m ? m[1] : null;\n  } catch (e) {\n    return null;\n  }\n}\n\nfunction attr(tag, name) {\n  const m = tag.match(new RegExp('\\\\s' + name + '\\\\s*=\\\\s*(\"([^\"]*)\"|\\'([^\\']*)\\'|([^\\\\s>]+))', 'i'));\n  return m ? (m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;\n}\n\n// Список матеріалів зі сторінки пошуку або розділу.\nfunction parseList(html, host) {\n  const found = new Map();\n  const re = /<a\\b([^>]*)>([\\s\\S]*?)<\\/a>/gi;\n  let m;\n  while ((m = re.exec(html))) {\n    const href = attr(m[0], 'href');\n    if (!href) continue;\n    const url = localize(absoluteUrl(href, host), host);\n    if (!url) continue;\n    const id = newsId(url);\n    if (!id) continue;\n\n    const cls = attr(m[0], 'class') || '';\n    let title = stripTags(m[2]);\n    if (!title) {\n      const img = m[2].match(/<img\\b[^>]*>/i);\n      if (img) title = decodeEntities(attr(img[0], 'alt') || attr(img[0], 'title') || '').trim();\n    }\n    const item = found.get(id) || { id, url, title: '', poster: '' };\n    // Пріоритет назві з посилання-заголовка картки (a.movie-title).\n    if (title && (!item.title || /movie-title|title/.test(cls))) item.title = title;\n    if (!item.poster) {\n      const img = m[2].match(/<img\\b[^>]*>/i);\n      if (img) {\n        const src = attr(img[0], 'data-src') || attr(img[0], 'src');\n        if (src) item.poster = absoluteUrl(src, host);\n      }\n    }\n    found.set(id, item);\n  }\n  return Array.from(found.values()).filter((i) => i.title);\n}\n\nfunction parseYear(html) {\n  const text = stripTags(html);\n  const m = text.match(/Р(?:ік|ок|од)(?: виходу| выхода)?\\s*:?\\s*((?:19|20)\\d{2})/i);\n  if (m) return Number(m[1]);\n  return null;\n}\n\n// Сторінка фільму/серіалу: назви, рік і всі посилання на .torrent\nfunction parsePage(html, url, host) {\n  const h1 = html.match(/<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/i);\n  const og = html.match(/<meta[^>]+property=[\"']og:title[\"'][^>]*>/i);\n  let title = h1 ? stripTags(h1[1]) : '';\n  if (!title && og) title = decodeEntities(attr(og[0], 'content') || '').trim();\n\n  const orig = html.match(/class=[\"'][^\"']*origintitle[^\"']*[\"'][^>]*>([\\s\\S]*?)<\\/(?:span|div|h2|p)>/i);\n  const original = orig ? stripTags(orig[1]) : '';\n\n  let year = parseYear(html);\n  if (!year) {\n    const t = (title + ' ' + original).match(/\\((19|20)\\d{2}\\)/);\n    if (t) year = Number(t[0].slice(1, 5));\n  }\n\n  const ogImg = html.match(/<meta[^>]+property=[\"']og:image[\"'][^>]*>/i);\n  const poster = ogImg ? absoluteUrl(attr(ogImg[0], 'content'), host) : '';\n\n  const torrents = new Map();\n  const re = /<a\\b([^>]*)>([\\s\\S]*?)<\\/a>/gi;\n  let m;\n  while ((m = re.exec(html))) {\n    const href = attr(m[0], 'href');\n    if (!href || !/\\/torrent\\/\\d+\\//i.test(href)) continue;\n    const link = localize(absoluteUrl(href, host), host);\n    if (!link || torrents.has(link)) continue;\n    const path = new URL(link).pathname;\n    const tid = path.match(/\\/torrent\\/(\\d+)\\//)[1];\n    const file = safeDecode(path.split('/').pop()).replace(/\\.torrent$/i, '').trim();\n    torrents.set(link, { id: tid, url: link, name: file || stripTags(m[2]), label: stripTags(m[2]) });\n  }\n  // Посилання можуть бути і не в <a> (наприклад, у data-атрибутах чи JS).\n  const loose = /([\"'])((?:https?:)?\\/\\/[^\"'<>\\s]*?\\/torrent\\/\\d+\\/[^\"'<>]*?\\.torrent|\\/torrent\\/\\d+\\/[^\"'<>]*?\\.torrent)\\1/gi;\n  while ((m = loose.exec(html))) {\n    const link = localize(absoluteUrl(m[2], host), host);\n    if (!link || torrents.has(link)) continue;\n    const path = new URL(link).pathname;\n    const tid = path.match(/\\/torrent\\/(\\d+)\\//)[1];\n    torrents.set(link, { id: tid, url: link, name: safeDecode(path.split('/').pop()).replace(/\\.torrent$/i, '').trim(), label: '' });\n  }\n\n  return { id: newsId(url), url, title, original, year, poster, torrents: Array.from(torrents.values()) };\n}\n\nfunction parseSitemap(xml) {\n  const out = [];\n  const re = /<loc>\\s*([\\s\\S]*?)\\s*<\\/loc>/gi;\n  let m;\n  while ((m = re.exec(xml))) out.push(decodeEntities(m[1].replace(/^<!\\[CDATA\\[|\\]\\]>$/g, '')));\n  return out;\n}\n\nfunction normalizeTitle(s) {\n  return String(s || '')\n    .toLowerCase()\n    .replace(/ё/g, 'е')\n    .replace(/[ʼ’'`]/g, '')\n    .replace(/[^0-9a-z\\u00c0-\\u024f\\u0400-\\u04ff]+/g, ' ')\n    .trim();\n}\n\n// Наскільки матеріал відповідає шуканим назвам: 100 — точно, 40+ — релевантно.\nfunction scoreTitle(item, titles) {\n  const t = normalizeTitle(item.title + ' ' + (item.original || ''));\n  let best = 0;\n  for (const raw of titles) {\n    const q = normalizeTitle(raw);\n    if (!q) continue;\n    let s = 0;\n    const base = normalizeTitle(item.title).replace(/\\s*(сезон|season)\\s*\\d+.*$/, '').trim();\n    if (base === q) s = 100;\n    else if (t.indexOf(q) >= 0) s = 60;\n    else if (q.indexOf(base) >= 0 && base.length > 3) s = 40;\n    else {\n      const words = q.split(' ').filter((w) => w.length > 2);\n      const hit = words.filter((w) => t.indexOf(w) >= 0).length;\n      if (words.length) s = Math.round((hit / words.length) * 30);\n    }\n    best = Math.max(best, s);\n  }\n  return best;\n}\n\nmodule.exports = { scoreTitle, decodeEntities, stripTags, absoluteUrl, localize, newsId, parseList, parsePage, parseSitemap, normalizeTitle };\n\n  }],\n  \"lib/online.js\": [{\"./parse\":\"lib/parse.js\"}, function (module, exports, require) {\n'use strict';\n\n// Онлайн-перегляд з uakino (як online_mod): плейлисти серій/озвучок і прямі посилання\n// на відео з плеєрів ashdi (Playerjs). Код не залежить від Node — працює і в Workers.\n\nconst parse = require('./parse');\n\n// Плеєри, які дозволено відкривати (захист від запитів на довільні адреси).\nconst PLAYER_HOSTS = /(^|\\.)(ashdi\\.vip|tortuga\\.(wtf|tw)|uakino\\.[a-z]+)$/i;\n\nfunction attr(tag, name) {\n  const m = tag.match(new RegExp('\\\\s' + name + '\\\\s*=\\\\s*(\"([^\"]*)\"|\\'([^\\']*)\\'|([^\\\\s>]+))', 'i'));\n  return m ? parse.decodeEntities(m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4]) : null;\n}\n\nfunction absolute(url, host) {\n  if (!url) return '';\n  url = url.trim();\n  if (url.indexOf('//') === 0) return 'https:' + url;\n  if (/^https?:\\/\\//i.test(url)) return url;\n  return host.replace(/\\/+$/, '') + '/' + url.replace(/^\\/+/, '');\n}\n\nfunction seasonOf(s) {\n  const m = String(s || '').match(/сезон\\s*(\\d+)|(\\d+)\\s*сезон|season\\s*(\\d+)/i);\n  return m ? Number(m[1] || m[2] || m[3]) : null;\n}\n\nfunction episodeOf(s) {\n  const m = String(s || '').match(/(\\d+)\\s*(?:сері|серия|епізод|episode)|(?:сері[яї]|серия|епізод|episode)\\s*(\\d+)|^\\s*(\\d+)\\b/i);\n  return m ? Number(m[1] || m[2] || m[3]) : null;\n}\n\n// Блок плейлиста (серіали) та iframe-плеєри (фільми) на сторінці матеріалу.\nfunction parsePlayers(html, host) {\n  let playlist = null;\n  const ajax = html.match(/<div\\b[^>]*class=[\"'][^\"']*playlists-ajax[^\"']*[\"'][^>]*>/i);\n  if (ajax) {\n    const newsId = attr(ajax[0], 'data-news_id');\n    if (newsId) playlist = { newsId, xfield: attr(ajax[0], 'data-xfname') || 'playlist' };\n  }\n  const iframes = [];\n  const re = /<iframe\\b[^>]*>/gi;\n  let m;\n  while ((m = re.exec(html))) {\n    const src = absolute(attr(m[0], 'src') || attr(m[0], 'data-src') || '', host);\n    if (!src || iframes.indexOf(src) >= 0) continue;\n    try {\n      const h = new URL(src).hostname;\n      if (!PLAYER_HOSTS.test(h) && h !== new URL(host).hostname) continue;\n    } catch (e) { continue; }\n    if (/youtube|trailer/i.test(src)) continue;\n    iframes.push(src);\n  }\n  return { playlist, iframes };\n}\n\n// Відповідь /engine/ajax/playlists.php: списки (озвучки/сезони) і серії з data-file.\nfunction parsePlaylist(html, host) {\n  const labels = {};\n  const episodes = [];\n  const re = /<li\\b([^>]*)>([\\s\\S]*?)<\\/li>/gi;\n  let m;\n  while ((m = re.exec(html))) {\n    const open = '<li' + m[1] + '>';\n    const file = attr(open, 'data-file');\n    const id = attr(open, 'data-id');\n    const text = parse.stripTags(m[2]);\n    if (file) episodes.push({ id: id || '', voice: attr(open, 'data-voice') || '', title: text, file: absolute(file, host) });\n    else if (id != null) labels[id] = text;\n  }\n  return episodes.map((ep) => {\n    const parts = ep.id ? ep.id.split('_') : [];\n    const names = [];\n    for (let i = 1; i <= parts.length; i++) {\n      const label = labels[parts.slice(0, i).join('_')];\n      if (label && names.indexOf(label) < 0) names.push(label);\n    }\n    if (ep.voice && names.indexOf(ep.voice) < 0) names.push(ep.voice);\n    return { group: names.join(' / ') || 'UAKino', title: ep.title, file: ep.file };\n  });\n}\n\nfunction jsString(html, key) {\n  const re = new RegExp('[\\\\s,{]' + key + '\\\\s*:\\\\s*([\\'\"])((?:\\\\\\\\.|(?!\\\\1)[\\\\s\\\\S])*)\\\\1');\n  const m = html.match(re);\n  if (!m) return null;\n  return m[2].replace(/\\\\(.)/g, (s, c) => (c === 'n' ? '\\n' : c));\n}\n\n// \"[720p]url1,[1080p]url2\" → { '720p': url1, '1080p': url2 }\nfunction parseQualities(str) {\n  const out = {};\n  String(str || '').split(/,(?=\\s*(?:\\[|https?:|\\/\\/))/).forEach((part) => {\n    const m = part.trim().match(/^\\[([^\\]]*)\\](.+)$/);\n    if (m) {\n      m[2].split(' or ').forEach((u) => { if (!out[m[1]]) out[m[1]] = absolute(u.trim(), 'https://x'); });\n    } else if (part.trim()) {\n      out.auto = absolute(part.trim().split(' or ')[0], 'https://x');\n    }\n  });\n  return out;\n}\n\nfunction parseSubtitles(str) {\n  if (!str) return [];\n  return String(str).split(/,(?=\\s*\\[)/).map((part) => {\n    const m = part.trim().match(/^\\[([^\\]]*)\\](.+)$/);\n    return m ? { label: m[1], url: absolute(m[2].trim(), 'https://x') } : { label: 'Субтитри', url: absolute(part.trim(), 'https://x') };\n  }).filter((s) => /^https?:/.test(s.url));\n}\n\nfunction toStream(file, subtitle) {\n  const q = parseQualities(file);\n  const keys = Object.keys(q);\n  if (!keys.length) return null;\n  const best = keys.slice().sort((a, b) => (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0))[0];\n  return { url: q[best], quality: keys.length > 1 ? q : null, subtitles: parseSubtitles(subtitle) };\n}\n\nfunction flatten(nodes, path, out) {\n  (nodes || []).forEach((n) => {\n    if (Array.isArray(n.folder)) flatten(n.folder, path.concat(n.title || ''), out);\n    else if (n.file) out.push({ path, title: n.title || '', file: n.file, subtitle: n.subtitle || '' });\n  });\n  return out;\n}\n\n// Сторінка плеєра (ashdi тощо): Playerjs({file: \"...m3u8\"}) або file: '[{\"title\":..,\"folder\":[..]}]'\nfunction parsePlayerjs(html) {\n  const file = jsString(html, 'file');\n  if (!file) return null;\n  const subtitle = jsString(html, 'subtitle') || '';\n  const trimmed = file.trim();\n  if (trimmed[0] === '[' && trimmed[1] !== ']' && /^\\[\\s*\\{/.test(trimmed)) {\n    let data;\n    try { data = JSON.parse(trimmed); } catch (e) { return null; }\n    return { folders: flatten(data, [], []) };\n  }\n  if (trimmed[0] === '#') return null; // зашифрований плеєр — не підтримується\n  return { file: trimmed, subtitle };\n}\n\nclass TinyCache {\n  constructor(ttl) { this.ttl = ttl; this.map = new Map(); }\n  async wrap(key, fn) {\n    const e = this.map.get(key);\n    if (e && Date.now() < e.exp) return e.v;\n    const v = await fn();\n    if (this.map.size > 500) this.map.delete(this.map.keys().next().value);\n    this.map.set(key, { v, exp: Date.now() + this.ttl });\n    return v;\n  }\n}\n\n// fetchText(url, { xhr, referer }) → Promise<string>; searchSite(query) → Promise<[{id,url,title}]>\nfunction createOnline({ host, fetchText, searchSite }) {\n  const cache = new TinyCache(20 * 60 * 1000);\n  host = host.replace(/\\/+$/, '');\n\n  function checkUrl(url, players) {\n    let u;\n    try { u = new URL(url); } catch (e) { throw Object.assign(new Error('bad url'), { status: 400 }); }\n    const own = u.hostname.replace(/^www\\./, '') === new URL(host).hostname.replace(/^www\\./, '');\n    const ok = own || (players && PLAYER_HOSTS.test(u.hostname));\n    if (!ok || !/^https?:$/.test(u.protocol)) throw Object.assign(new Error('url is not allowed'), { status: 403 });\n    return u.toString();\n  }\n\n  async function findPages({ title = '', original = '', query = '' }) {\n    const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);\n    const found = new Map();\n    let lastError = null;\n    for (const q of titles) {\n      try {\n        for (const item of await searchSite(q)) {\n          if (!found.has(item.id)) found.set(item.id, Object.assign({}, item, { score: parse.scoreTitle(item, titles), season: seasonOf(item.title) }));\n        }\n      } catch (e) { lastError = e; }\n    }\n    if (!found.size && lastError) throw lastError;\n    let list = Array.from(found.values()).filter((p) => p.score >= 40);\n    const best = list.reduce((m, p) => Math.max(m, p.score), 0);\n    // Лишаємо найкращі збіги (усі сезони одного серіалу мають однакову оцінку).\n    list = list.filter((p) => p.score >= best - 20);\n    list.sort((a, b) => b.score - a.score || (a.season || 0) - (b.season || 0));\n    if (list.some((p) => p.season)) list.sort((a, b) => (a.season || 0) - (b.season || 0));\n    return list.map(({ id, url, title: t, poster, season }) => ({ id, url, title: t, poster, season }));\n  }\n\n  async function stream(url, referer) {\n    url = checkUrl(url, true);\n    return cache.wrap('stream:' + url, async () => {\n      const html = await fetchText(url, { referer: referer || host + '/' });\n      const p = parsePlayerjs(html);\n      if (!p) throw Object.assign(new Error('не вдалося знайти відео в плеєрі'), { status: 404 });\n      if (p.folders) {\n        return {\n          items: p.folders.map((f) => ({\n            group: f.path.filter((x) => !seasonOf(x)).join(' / ') || 'UAKino',\n            season: seasonOf(f.path.join(' ')),\n            title: f.title,\n            episode: episodeOf(f.title),\n            stream: toStream(f.file, f.subtitle),\n          })).filter((i) => i.stream),\n        };\n      }\n      const s = toStream(p.file, p.subtitle);\n      if (!s) throw Object.assign(new Error('порожнє посилання на відео'), { status: 404 });\n      return s;\n    });\n  }\n\n  async function loadPage(url) {\n    url = checkUrl(url, false);\n    return cache.wrap('page:' + url, async () => {\n      const html = await fetchText(url, {});\n      const page = parse.parsePage(html, url, host);\n      const season = seasonOf(page.title);\n      const players = parsePlayers(html, host);\n      let items = [];\n\n      if (players.playlist) {\n        try {\n          const ajax = host + '/engine/ajax/playlists.php?news_id=' + encodeURIComponent(players.playlist.newsId) +\n            '&xfield=' + encodeURIComponent(players.playlist.xfield) + '&time=' + Date.now();\n          const text = await fetchText(ajax, { xhr: true, referer: url });\n          let body = text;\n          try {\n            const data = JSON.parse(text);\n            body = data && data.success !== false ? String(data.response || '') : '';\n          } catch (e) { /* відповідь — сирий HTML */ }\n          items = parsePlaylist(body, host)\n            .filter((ep) => !/трейлер|trailer/i.test(ep.group + ' ' + ep.title))\n            .map((ep) => ({ group: ep.group, season, title: ep.title, episode: episodeOf(ep.title), url: ep.file }));\n        } catch (e) {\n          if (!players.iframes.length) throw e;\n        }\n      }\n\n      if (!items.length) {\n        for (const src of players.iframes) {\n          try {\n            const s = await stream(src, url);\n            if (s.items) items = items.concat(s.items.map((i) => Object.assign({}, i, { season: i.season || season })));\n            else items.push({ group: 'UAKino', season, title: page.title, episode: null, stream: s });\n          } catch (e) { /* пробуємо наступний плеєр */ }\n        }\n      }\n\n      return { url, title: page.title, original: page.original, year: page.year, poster: page.poster, season, items };\n    });\n  }\n\n  // Спільний обробник для /online/* (Node-сервер і Worker) — повертає об'єкт для JSON.\n  async function route(pathname, params) {\n    if (pathname === '/online/search') {\n      return { pages: await findPages({ title: params.get('title') || '', original: params.get('original') || params.get('title_original') || '', query: params.get('query') || params.get('Query') || '' }) };\n    }\n    if (pathname === '/online/page') return loadPage(params.get('url') || '');\n    if (pathname === '/online/stream') return stream(params.get('url') || '', params.get('referer') ? checkUrl(params.get('referer'), false) : '');\n    return null;\n  }\n\n  return { findPages, loadPage, stream, route };\n}\n\nmodule.exports = { createOnline, parsePlayers, parsePlaylist, parsePlayerjs, parseQualities, parseSubtitles, toStream, seasonOf, episodeOf };\n\n  }],\n  \"lib/jackett.js\": [{}, function (module, exports, require) {\n'use strict';\n\n// Перетворює знайдений торент у запис формату Jackett (його розуміє Lampa).\nfunction toJackett(r, base) {\n  const { page, torrent, meta, peers } = r;\n  let title = torrent.name || page.title;\n  if (page.original && title.toLowerCase().indexOf(page.original.toLowerCase()) < 0) title += ' / ' + page.original;\n  if (page.year && title.indexOf(String(page.year)) < 0) title += ' (' + page.year + ')';\n  if (torrent.label && torrent.label !== torrent.name && title.indexOf(torrent.label) < 0) title += ' [' + torrent.label + ']';\n\n  const serial = /сезон|season|сері[яї]|серии/i.test(torrent.name + ' ' + page.title);\n  const created = meta && meta.created ? new Date(meta.created * 1000) : null;\n  return {\n    Tracker: 'UAKino',\n    TrackerId: 'uakino',\n    TrackerType: 'public',\n    CategoryDesc: serial ? 'TV' : 'Movies',\n    Category: serial ? [5000] : [2000],\n    Title: title,\n    Guid: torrent.url,\n    Link: base + '/download?url=' + encodeURIComponent(torrent.url),\n    Details: page.url,\n    Poster: page.poster || null,\n    PublishDate: (created && !isNaN(created) ? created : new Date()).toISOString(),\n    Size: meta ? meta.size : 0,\n    Files: meta ? meta.files : null,\n    Seeders: peers ? peers.seeders : 0,\n    Peers: peers ? peers.leechers : 0,\n    InfoHash: meta ? meta.infoHash : null,\n    MagnetUri: meta ? meta.magnet : null,\n    DownloadVolumeFactor: 0,\n    UploadVolumeFactor: 1,\n  };\n}\n\nmodule.exports = { toJackett };\n\n  }],\n};\nvar __cache = {};\nfunction __load(id) {\n  if (__cache[id]) return __cache[id].exports;\n  var mod = __modules[id];\n  var module = (__cache[id] = { exports: {} });\n  mod[1](module, module.exports, function (spec) {\n    if (!mod[0][spec]) throw new Error('module not bundled: ' + spec);\n    return __load(mod[0][spec]);\n  });\n  return module.exports;\n}\nreturn __load(\"lib/client.js\");\n})();\n/*\n * UAKino — плагін для Lampa.\n * Додає на картку фільму/серіалу дві кнопки:\n *   «UAKino»          — онлайн-перегляд з uakino.best (серії, озвучки, якість), як online_mod;\n *   «UAKino торенти»  — торенти з uakino.best, запуск через TorrServer.\n * uakino.best пускає лише домашні IP, тому за замовчуванням плагін ходить на сайт сам,\n * прямо з пристрою з Lampa. Режим «через парсер» (Cloudflare Worker або server.js) — запасний.\n *\n * Це вихідний код: робочий файл dist/uakino.js збирає build.js разом з lib/ (UAKinoLib).\n * Встановлення: Lampa → Налаштування → Розширення → Додати плагін → <адреса Worker>/uakino.js\n */\n(function () {\n  'use strict';\n\n  if (window.uakino_torrents_plugin) return;\n  window.uakino_torrents_plugin = true;\n\n  // Сервер замінює цей рядок своєю адресою, коли віддає плагін за /uakino.js\n  var BUILT_IN_SERVER = '__UAKINO_SERVER__';\n  if (BUILT_IN_SERVER.indexOf('__') === 0) BUILT_IN_SERVER = '';\n\n  var ICON = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"currentColor\" d=\"M12 2 3 6v6c0 5 3.8 9.7 9 10 5.2-.3 9-5 9-10V6l-9-4Zm0 4.2 2 4.3H10l2-4.3ZM8 12h8l-4 6-4-6Z\"/></svg>';\n  var ICON_PLAY = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"currentColor\" d=\"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14.5v-9l7 4.5-7 4.5Z\"/></svg>';\n\n  function serverUrl() {\n    var s = Lampa.Storage.get('uakino_server', '') || BUILT_IN_SERVER;\n    s = String(s).trim().replace(/\\/+$/, '');\n    if (s && !/^https?:\\/\\//i.test(s)) s = 'http://' + s;\n    return s;\n  }\n\n  function enc(v) {\n    return encodeURIComponent(v || '');\n  }\n\n  function movieInfo(movie) {\n    var date = movie.release_date || movie.first_air_date || '';\n    return {\n      title: movie.title || movie.name || '',\n      original: movie.original_title || movie.original_name || '',\n      year: String(date).slice(0, 4),\n      serial: !!(movie.name || movie.first_air_date)\n    };\n  }\n\n  var DEFAULT_HOST = 'https://uakino.best';\n\n  function errorText(network, a, c) {\n    if (a && a.responseJSON && a.responseJSON.error) return a.responseJSON.error;\n    if (a && a.responseText) {\n      try { return JSON.parse(a.responseText).error || 'помилка'; } catch (e) { /* не JSON */ }\n    }\n    return network.errorDecode ? network.errorDecode(a, c) : 'помилка запиту';\n  }\n\n  function bytes(size) {\n    if (!size) return '';\n    if (Lampa.Utils && Lampa.Utils.bytesToSize) return Lampa.Utils.bytesToSize(size);\n    var units = ['B', 'KB', 'MB', 'GB', 'TB'];\n    var i = Math.min(units.length - 1, Math.floor(Math.log(size) / Math.log(1024)));\n    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];\n  }\n\n  function stopLoading() {\n    if (Lampa.Loading && Lampa.Loading.stop) Lampa.Loading.stop();\n  }\n\n  // ======================= Джерело даних =======================\n  // direct — запити на uakino йдуть з пристрою (домашній IP, Cloudflare сайту пропускає);\n  // server — через парсер (Worker / server.js), напр. для веб-версії Lampa, де діє CORS.\n\n  function mode() {\n    return Lampa.Storage.get('uakino_mode', 'direct') === 'server' && serverUrl() ? 'server' : 'direct';\n  }\n\n  function siteHost() {\n    return String(Lampa.Storage.get('uakino_host', '') || DEFAULT_HOST).trim().replace(/\\/+$/, '');\n  }\n\n  function deviceError(net, a, c, url) {\n    var status = a && a.status;\n    if (status === 403 || status === 503) return 'uakino заблокував запит (' + status + '). Спробуйте пізніше або інше дзеркало в налаштуваннях';\n    if (!status) return 'немає доступу до uakino з цього пристрою. У браузерній версії Lampa увімкніть режим «Через парсер»';\n    return (net.errorDecode ? net.errorDecode(a, c) : 'помилка') + ' — ' + url;\n  }\n\n  function deviceFetch(url, o) {\n    o = o || {};\n    return new Promise(function (resolve, reject) {\n      var net = new Lampa.Reguest();\n      net.timeout(20000);\n      var headers = {};\n      if (o.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';\n      if (o.referer) headers.Referer = o.referer;\n      var params = { dataType: 'text', headers: headers };\n      var ok = function (text) {\n        resolve(typeof text === 'string' ? text : JSON.stringify(text));\n      };\n      var fail = function (a, c) {\n        var err = new Error(deviceError(net, a, c, url));\n        err.status = a && a.status;\n        reject(err);\n      };\n      var method = typeof net['native'] === 'function' ? 'native' : 'silent';\n      net[method](url, ok, fail, o.body || false, params);\n    });\n  }\n\n  var client = null;\n\n  function direct() {\n    var host = siteHost();\n    if (!client || client.host !== host) client = UAKinoLib.createClient({ host: host, fetchText: deviceFetch });\n    return client;\n  }\n\n  function promised(promise, ok, fail) {\n    promise.then(ok, function (e) {\n      fail((e && e.message) || String(e));\n    });\n  }\n\n  function serverGet(path, ok, fail) {\n    var net = new Lampa.Reguest();\n    net.timeout(120000);\n    net.silent(serverUrl() + path, ok, function (a, c) {\n      fail(errorText(net, a, c));\n    });\n  }\n\n  var Api = {\n    torrents: function (m, ok, fail) {\n      if (mode() === 'direct') return promised(direct().torrents({ title: m.title, original: m.original, year: m.year }), ok, fail);\n      serverGet('/api/v2.0/indexers/uakino/results' +\n        '?apikey=' + enc(Lampa.Storage.get('uakino_apikey', '')) +\n        '&Query=' + enc(m.title || m.original) +\n        '&title=' + enc(m.title) +\n        '&title_original=' + enc(m.original) +\n        '&year=' + enc(m.year) +\n        '&is_serial=' + (m.serial ? 2 : 1), function (json) {\n        ok((json && json.Results) || []);\n      }, fail);\n    },\n    search: function (m, ok, fail) {\n      if (mode() === 'direct') return promised(direct().online.findPages({ title: m.title, original: m.original }), ok, fail);\n      serverGet('/online/search?title=' + enc(m.title) + '&original=' + enc(m.original) + '&year=' + enc(m.year), function (json) {\n        ok((json && json.pages) || []);\n      }, fail);\n    },\n    page: function (url, ok, fail) {\n      if (mode() === 'direct') return promised(direct().online.loadPage(url), ok, fail);\n      serverGet('/online/page?url=' + enc(url), ok, fail);\n    },\n    stream: function (url, referer, ok, fail) {\n      if (mode() === 'direct') return promised(direct().online.stream(url, referer), ok, fail);\n      serverGet('/online/stream?url=' + enc(url) + '&referer=' + enc(referer), ok, fail);\n    }\n  };\n\n  // ======================= Торенти =======================\n\n  var torrentRequest = 0;\n\n  function prepareTorrent(element) {\n    element.size = bytes(element.Size);\n    if (Lampa.Utils && Lampa.Utils.hash) element.hash = Lampa.Utils.hash(element.Title);\n    if (Lampa.Utils && Lampa.Utils.strToTime && element.PublishDate) element.PublisTime = Lampa.Utils.strToTime(element.PublishDate);\n    return element;\n  }\n\n  function openTorrents(movie) {\n    var controller = Lampa.Controller.enabled().name;\n    var id = ++torrentRequest;\n\n    if (Lampa.Loading && Lampa.Loading.start) {\n      Lampa.Loading.start(function () {\n        torrentRequest++;\n        stopLoading();\n        Lampa.Controller.toggle(controller);\n      });\n    }\n\n    Api.torrents(movieInfo(movie), function (results) {\n      if (id !== torrentRequest) return;\n      stopLoading();\n      if (!results.length) {\n        Lampa.Noty.show('На UAKino торентів не знайдено');\n        Lampa.Controller.toggle(controller);\n        return;\n      }\n\n      var items = results.map(function (r) {\n        var info = [];\n        if (r.Size) info.push(bytes(r.Size));\n        if (r.Files) info.push(r.Files + ' файл.');\n        info.push('▲ ' + (r.Seeders || 0));\n        info.push('▼ ' + (r.Peers || 0));\n        return { title: r.Title, subtitle: info.join(' • '), torrent: prepareTorrent(r) };\n      });\n\n      Lampa.Select.show({\n        title: 'UAKino — торенти',\n        items: items,\n        onSelect: function (item) {\n          Lampa.Controller.toggle(controller);\n          if (Lampa.Torrent && typeof Lampa.Torrent.start === 'function') Lampa.Torrent.start(item.torrent, movie);\n          else Lampa.Noty.show('Ця версія Lampa не підтримує запуск торентів з плагіна');\n        },\n        onBack: function () {\n          Lampa.Controller.toggle(controller);\n        }\n      });\n    }, function (err) {\n      if (id !== torrentRequest) return;\n      stopLoading();\n      Lampa.Noty.show('UAKino: ' + err);\n      Lampa.Controller.toggle(controller);\n    });\n  }\n\n  // ======================= Онлайн =======================\n\n  function OnlineComponent(object) {\n    var scroll = new Lampa.Scroll({ mask: true, over: true });\n    var html = $('<div class=\"uakino-online\"></div>');\n    var movie = object.movie || {};\n    var info = movieInfo(movie);\n    var self = this;\n\n    var pages = [];\n    var pageIndex = 0;\n    var data = null;\n    var groups = [];\n    var groupIndex = 0;\n    var last = null;\n    var storeKey = 'uakino_choice_' + (movie.id || info.original || info.title);\n    var destroyed = false;\n\n    // Відповіді, що прийшли після закриття екрана, ігноруються.\n    function alive(fn) {\n      return function (v) {\n        if (!destroyed) fn(v);\n      };\n    }\n\n    function choice() {\n      var c = Lampa.Storage.get(storeKey, '{}');\n      if (typeof c === 'string') {\n        try { c = JSON.parse(c); } catch (e) { c = {}; }\n      }\n      return c || {};\n    }\n\n    function saveChoice() {\n      Lampa.Storage.set(storeKey, { page: pageIndex, group: groups[groupIndex] || '' });\n    }\n\n    function message(text) {\n      scroll.clear();\n      scroll.append($('<div class=\"uakino-online__empty\"></div>').text(text));\n      self.activity.loader(false);\n      self.activity.toggle();\n    }\n\n    this.create = function () {\n      html.append(scroll.render());\n      this.activity.loader(true);\n      Api.search(info, alive(function (list) {\n        pages = list || [];\n        if (!pages.length) return message('На UAKino нічого не знайдено');\n        var c = choice();\n        pageIndex = c.page < pages.length ? c.page || 0 : 0;\n        loadPage();\n      }), alive(function (err) {\n        message('UAKino: ' + err);\n      }));\n      return this.render();\n    };\n\n    function loadPage() {\n      self.activity.loader(true);\n      Api.page(pages[pageIndex].url, alive(function (json) {\n        data = json || { items: [] };\n        groups = [];\n        (data.items || []).forEach(function (item) {\n          if (groups.indexOf(item.group) < 0) groups.push(item.group);\n        });\n        var saved = groups.indexOf(choice().group);\n        groupIndex = saved >= 0 ? saved : 0;\n        build();\n      }), alive(function (err) {\n        message('UAKino: ' + err);\n      }));\n    }\n\n    function currentItems() {\n      var group = groups[groupIndex];\n      return (data && data.items || []).filter(function (item) {\n        return item.group === group;\n      });\n    }\n\n    function pageName(p) {\n      return p.season ? 'Сезон ' + p.season : p.title;\n    }\n\n    function filterButton(label, value, onEnter) {\n      var btn = $('<div class=\"uakino-online__filter selector\"><span></span> <b></b></div>');\n      btn.find('span').text(label);\n      btn.find('b').text(value);\n      btn.on('hover:enter', onEnter);\n      btn.on('hover:focus', function (e) {\n        last = e.target;\n        scroll.update($(e.target), true);\n      });\n      return btn;\n    }\n\n    function select(title, list, current, onSelect) {\n      Lampa.Select.show({\n        title: title,\n        items: list.map(function (name, i) {\n          return { title: name, selected: i === current, index: i };\n        }),\n        onSelect: function (a) {\n          onSelect(a.index);\n        },\n        onBack: function () {\n          Lampa.Controller.toggle('content');\n        }\n      });\n    }\n\n    function hashFor(item) {\n      if (!Lampa.Utils || !Lampa.Utils.hash) return '';\n      var base = info.original || info.title;\n      if (item.episode != null && (item.season || data.season || info.serial)) {\n        // Той самий формат хешу, що й у online_mod, — прогрес перегляду спільний.\n        var season = item.season || data.season || 1;\n        return Lampa.Utils.hash([season, season > 10 ? ':' : '', item.episode, base].join(''));\n      }\n      return Lampa.Utils.hash(base);\n    }\n\n    function timeline(item) {\n      try {\n        var hash = hashFor(item);\n        return hash && Lampa.Timeline ? Lampa.Timeline.view(hash) : null;\n      } catch (e) {\n        return null;\n      }\n    }\n\n    function build() {\n      scroll.clear();\n      last = null;\n\n      var filters = $('<div class=\"uakino-online__filters\"></div>');\n      if (pages.length > 1) {\n        filters.append(filterButton('Сторінка:', pageName(pages[pageIndex]), function () {\n          select('UAKino', pages.map(pageName), pageIndex, function (i) {\n            pageIndex = i;\n            saveChoice();\n            loadPage();\n          });\n        }));\n      }\n      if (groups.length > 1) {\n        filters.append(filterButton('Озвучка:', groups[groupIndex], function () {\n          select('Озвучка', groups, groupIndex, function (i) {\n            groupIndex = i;\n            saveChoice();\n            build();\n          });\n        }));\n      }\n      scroll.append(filters);\n\n      var items = currentItems();\n      if (!items.length) {\n        scroll.append($('<div class=\"uakino-online__empty\"></div>').text('На цій сторінці немає відео'));\n      }\n\n      items.forEach(function (item, index) {\n        var el = $('<div class=\"uakino-online__item selector\"><div class=\"uakino-online__title\"></div><div class=\"uakino-online__info\"></div><div class=\"uakino-online__timeline\"></div></div>');\n        el.find('.uakino-online__title').text(item.title || data.title);\n        var meta = [];\n        if (item.season || data.season) meta.push('Сезон ' + (item.season || data.season));\n        if (item.group) meta.push(item.group);\n        el.find('.uakino-online__info').text(meta.join(' • '));\n        var view = timeline(item);\n        if (view && Lampa.Timeline.render) el.find('.uakino-online__timeline').append(Lampa.Timeline.render(view));\n        el.on('hover:enter', function () {\n          play(items, index);\n        });\n        el.on('hover:focus', function (e) {\n          last = e.target;\n          scroll.update($(e.target), true);\n        });\n        scroll.append(el);\n      });\n\n      self.activity.loader(false);\n      self.activity.toggle();\n    }\n\n    function resolve(item, ok, fail) {\n      if (item.stream) return ok(item.stream);\n      Api.stream(item.url, data.url, function (json) {\n        var s = json && json.items && json.items.length ? json.items[0].stream : json;\n        if (!s || !s.url) return fail('посилання на відео не знайдено');\n        item.stream = s;\n        ok(s);\n      }, fail);\n    }\n\n    function playerItem(item, stream) {\n      var title = item.title || data.title;\n      var p = { title: title, url: stream.url };\n      if (stream.quality) p.quality = stream.quality;\n      if (stream.subtitles && stream.subtitles.length) p.subtitles = stream.subtitles;\n      var view = timeline(item);\n      if (view) p.timeline = view;\n      return p;\n    }\n\n    function play(items, index) {\n      var item = items[index];\n      Lampa.Loading && Lampa.Loading.start && Lampa.Loading.start(function () {\n        stopLoading();\n      });\n      resolve(item, function (stream) {\n        stopLoading();\n        var first = playerItem(item, stream);\n        var playlist = items.map(function (it, i) {\n          if (i === index) return first;\n          var cell = { title: it.title || data.title };\n          if (it.stream) return playerItem(it, it.stream);\n          // Посилання на інші серії отримуємо лише коли до них дійде плеєр.\n          cell.url = function (call) {\n            resolve(it, function (s) {\n              var p = playerItem(it, s);\n              cell.url = p.url;\n              cell.quality = p.quality;\n              cell.subtitles = p.subtitles;\n              cell.timeline = p.timeline;\n              call();\n            }, function (err) {\n              cell.url = '';\n              Lampa.Noty.show('UAKino: ' + err);\n              call();\n            });\n          };\n          return cell;\n        });\n        Lampa.Player.play(first);\n        Lampa.Player.playlist(playlist);\n      }, function (err) {\n        stopLoading();\n        Lampa.Noty.show('UAKino: ' + err);\n      });\n    }\n\n    this.start = function () {\n      if (Lampa.Activity.active && Lampa.Activity.active().activity !== this.activity) return;\n      Lampa.Controller.add('content', {\n        toggle: function () {\n          Lampa.Controller.collectionSet(scroll.render());\n          Lampa.Controller.collectionFocus(last || false, scroll.render());\n        },\n        up: function () {\n          if (Navigator.canmove('up')) Navigator.move('up');\n          else Lampa.Controller.toggle('head');\n        },\n        down: function () {\n          Navigator.move('down');\n        },\n        left: function () {\n          if (Navigator.canmove('left')) Navigator.move('left');\n          else Lampa.Controller.toggle('menu');\n        },\n        right: function () {\n          Navigator.move('right');\n        },\n        back: function () {\n          Lampa.Activity.backward();\n        }\n      });\n      Lampa.Controller.toggle('content');\n    };\n\n    this.render = function () {\n      return html;\n    };\n\n    this.pause = function () {};\n    this.stop = function () {};\n\n    this.destroy = function () {\n      destroyed = true;\n      scroll.destroy();\n      html.remove();\n    };\n  }\n\n  function openOnline(movie) {\n    Lampa.Activity.push({\n      url: '',\n      title: 'UAKino',\n      component: 'uakino_online',\n      movie: movie,\n      page: 1\n    });\n  }\n\n  // ======================= Інтеграція =======================\n\n  var CSS = '<style>' +\n    '.uakino-online{padding:0 1.5em 1.5em}' +\n    '.uakino-online__filters{display:flex;flex-wrap:wrap;margin-bottom:1em}' +\n    '.uakino-online__filter{padding:.6em 1.2em;margin:0 1em 1em 0;border-radius:1em;background:rgba(255,255,255,.1)}' +\n    '.uakino-online__item{padding:1em 1.2em;margin-bottom:.7em;border-radius:1em;background:rgba(0,0,0,.3)}' +\n    '.uakino-online__filter.focus,.uakino-online__item.focus{background:#fff;color:#000}' +\n    '.uakino-online__title{font-size:1.3em}' +\n    '.uakino-online__info{margin-top:.3em;opacity:.6}' +\n    '.uakino-online__empty{padding:2em 0;text-align:center;opacity:.7}' +\n    '</style>';\n\n  function addButtons(e) {\n    var render = e.object.activity.render();\n    if (render.find('.view--uakino').length) return;\n\n    var online = $('<div class=\"full-start__button selector view--uakino view--uakino-online\">' + ICON_PLAY + '<span>UAKino</span></div>');\n    online.on('hover:enter', function () {\n      openOnline(e.data.movie);\n    });\n\n    var torrents = $('<div class=\"full-start__button selector view--uakino view--uakino-torrent\">' + ICON + '<span>UAKino торенти</span></div>');\n    torrents.on('hover:enter', function () {\n      openTorrents(e.data.movie);\n    });\n\n    var torrent = render.find('.view--torrent');\n    if (torrent.length) {\n      torrent.before(online);\n      torrent.after(torrents);\n    } else {\n      var box = render.find('.full-start-new__buttons, .full-start__buttons').first();\n      box.append(online);\n      box.append(torrents);\n    }\n\n    // Оновлюємо навігацію, щоб кнопки стали доступними з пульта.\n    if (Lampa.Controller.enabled().name === 'full_start') Lampa.Controller.toggle('full_start');\n  }\n\n  function addSettings() {\n    if (!Lampa.SettingsApi) return;\n    Lampa.SettingsApi.addComponent({ component: 'uakino', name: 'UAKino', icon: ICON });\n    Lampa.SettingsApi.addParam({\n      component: 'uakino',\n      param: { name: 'uakino_mode', type: 'select', values: { direct: 'З пристрою (рекомендовано)', server: 'Через парсер' }, default: 'direct' },\n      field: { name: 'Звідки завантажувати', description: 'uakino пускає лише домашні IP, тому запити краще робити прямо з ТВ/приставки' }\n    });\n    Lampa.SettingsApi.addParam({\n      component: 'uakino',\n      param: { name: 'uakino_host', type: 'input', values: '', default: '', placeholder: DEFAULT_HOST },\n      field: { name: 'Адреса сайту', description: 'Дзеркало uakino. За замовчуванням: ' + DEFAULT_HOST }\n    });\n    Lampa.SettingsApi.addParam({\n      component: 'uakino',\n      param: { name: 'uakino_server', type: 'input', values: '', default: '', placeholder: BUILT_IN_SERVER || 'https://uakino-lampa.example.workers.dev' },\n      field: {\n        name: 'Адреса парсера',\n        description: 'Для режиму «Через парсер». ' + (BUILT_IN_SERVER ? 'За замовчуванням: ' + BUILT_IN_SERVER : 'Адреса Cloudflare Worker або server.js')\n      }\n    });\n    Lampa.SettingsApi.addParam({\n      component: 'uakino',\n      param: { name: 'uakino_apikey', type: 'input', values: '', default: '', placeholder: '' },\n      field: { name: 'API-ключ', description: 'Лише якщо на парсері задано UAKINO_APIKEY' }\n    });\n  }\n\n  function start() {\n    $('body').append($(CSS));\n    Lampa.Component.add('uakino_online', OnlineComponent);\n    addSettings();\n    Lampa.Listener.follow('full', function (e) {\n      if (e.type === 'complite') addButtons(e);\n    });\n  }\n\n  if (window.appready) start();\n  else {\n    Lampa.Listener.follow('app', function (e) {\n      if (e.type === 'ready') start();\n    });\n  }\n})();\n})();\n";

var __modules = {
  "worker/src.js": [{"../lib/parse":"lib/parse.js","../lib/bencode":"lib/bencode.js","../lib/jackett":"lib/jackett.js","../lib/online":"lib/online.js"}, function (module, exports, require) {
'use strict';

// Версія парсера для Cloudflare Workers: працює цілодобово без власного комп'ютера.
// Збирається в один файл командою `node build.js` → worker/dist/worker.mjs

const parse = require('../lib/parse');
const { parseTorrent } = require('../lib/bencode');
const { toJackett } = require('../lib/jackett');
const { createOnline } = require('../lib/online');

const DEFAULT_HOST = 'https://uakino.best';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
// Безкоштовний план Workers дозволяє 50 підзапитів на один запит.
const MAX_TORRENTS = 30;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS, ...extra } });
}

function settings(env) {
  return {
    host: String(env.UAKINO_HOST || DEFAULT_HOST).replace(/\/+$/, ''),
    cookie: env.UAKINO_COOKIE || '',
    ua: env.UAKINO_UA || UA,
    apikey: env.UAKINO_APIKEY || '',
    maxPages: Number(env.UAKINO_MAX_PAGES || 5),
  };
}

async function request(cfg, url, opts = {}) {
  const headers = {
    'User-Agent': cfg.ua,
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'uk-UA,uk;q=0.9,en;q=0.7',
    Referer: opts.referer || cfg.host + '/',
  };
  if (cfg.cookie) headers.Cookie = cfg.cookie;
  if (opts.xhr) headers['X-Requested-With'] = 'XMLHttpRequest';
  if (opts.body) headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  const res = await fetch(url, { method: opts.method || 'GET', headers, body: opts.body || null, redirect: 'follow' });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const cf = /cloudflare/i.test(res.headers.get('server') || '') || /cloudflare/i.test(text.slice(0, 3000));
    const err = new Error('HTTP ' + res.status + ' for ' + url + (cf ? ' (Cloudflare заблокував запит)' : ''));
    err.status = res.status;
    throw err;
  }
  return res;
}

// Кеш Cloudflare (у Node-тестах його немає — тоді просто без кешу).
const edge = typeof caches !== 'undefined' ? caches.default : null;

async function cached(key, ttl, ctx, fn) {
  const req = new Request('https://uakino-cache.internal/' + encodeURIComponent(key));
  if (edge) {
    const hit = await edge.match(req);
    if (hit) return hit.json();
  }
  const value = await fn();
  if (edge && value !== undefined) {
    const put = edge.put(req, new Response(JSON.stringify(value), { headers: { 'Cache-Control': 'max-age=' + ttl } }));
    if (ctx && ctx.waitUntil) ctx.waitUntil(put); else await put;
  }
  return value;
}

async function searchSite(cfg, ctx, q) {
  return cached('search:' + cfg.host + ':' + q.toLowerCase(), 1800, ctx, async () => {
    const res = await request(cfg, cfg.host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(q));
    let list = parse.parseList(await res.text(), cfg.host);
    if (!list.length) {
      const body = new URLSearchParams({ do: 'search', subaction: 'search', search_start: '0', full_search: '0', result_from: '1', story: q }).toString();
      try {
        list = parse.parseList(await (await request(cfg, cfg.host + '/index.php?do=search', { method: 'POST', body })).text(), cfg.host);
      } catch (e) { /* лишаємо порожній список */ }
    }
    return list;
  });
}

async function page(cfg, ctx, url) {
  return cached('page:' + url, 1800, ctx, async () => parse.parsePage(await (await request(cfg, url)).text(), url, cfg.host));
}

async function torrentMeta(cfg, ctx, url) {
  return cached('torrent:' + url, 7 * 86400, ctx, async () => {
    const t = await parseTorrent(new Uint8Array(await (await request(cfg, url)).arrayBuffer()));
    return { infoHash: t.infoHash, name: t.name, size: t.size, files: t.files.length, trackers: t.trackers, magnet: t.magnet, created: t.created };
  });
}

async function find(cfg, ctx, { query, title, original, year }) {
  const titles = [title, original, query].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
  if (!titles.length) return [];

  const candidates = new Map();
  let lastError = null;
  for (const q of titles) {
    try {
      for (const item of await searchSite(cfg, ctx, q)) {
        if (!candidates.has(item.id)) candidates.set(item.id, { ...item, score: parse.scoreTitle(item, titles) });
      }
    } catch (e) {
      lastError = e;
    }
  }
  if (!candidates.size && lastError) throw lastError;

  let list = Array.from(candidates.values()).sort((a, b) => b.score - a.score);
  const relevant = list.filter((c) => c.score >= 40);
  if (relevant.length) list = relevant;
  list = list.slice(0, cfg.maxPages);

  const pages = await Promise.all(list.map((c) => page(cfg, ctx, c.url).catch(() => null)));
  const entries = [];
  for (const p of pages) if (p) for (const t of p.torrents) entries.push({ page: p, torrent: t });

  const results = await Promise.all(entries.slice(0, MAX_TORRENTS).map(async (e) => ({
    ...e,
    meta: await torrentMeta(cfg, ctx, e.torrent.url).catch(() => null),
    peers: null,
  })));

  if (year) {
    const y = Number(year);
    results.sort((a, b) => Math.abs((a.page.year || y) - y) - Math.abs((b.page.year || y) - y));
  }
  return results;
}

async function handle(req, env, ctx) {
  const cfg = settings(env || {});
  const url = new URL(req.url);
  const q = url.searchParams;
  const base = url.origin;

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (req.method !== 'GET') return json({ error: 'method not allowed' }, 405);

  try {
    if (url.pathname === '/' || url.pathname === '/health') {
      return json({ name: 'uakino-torrents', runtime: 'cloudflare-worker', host: cfg.host, plugin: base + '/uakino.js', jackett: base + '/api/v2.0/indexers/uakino/results?Query=...' });
    }

    if (url.pathname === '/uakino.js' || url.pathname === '/plugin.js') {
      const code = __PLUGIN_SOURCE__.replace("'__UAKINO_SERVER__'", JSON.stringify(base));
      return new Response(code, { headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'max-age=300', ...CORS } });
    }

    if (url.pathname.indexOf('/online/') === 0) {
      const online = createOnline({
        host: cfg.host,
        fetchText: async (u, o) => (await request(cfg, u, o)).text(),
        searchSite: (s) => searchSite(cfg, ctx, s),
      });
      const data = await online.route(url.pathname, q);
      if (data) return json(data, 200, { 'Cache-Control': 'max-age=600' });
    }

    if (/^\/api\/v2\.0\/indexers\/[^/]+\/results\/?$/.test(url.pathname)) {
      if (cfg.apikey && q.get('apikey') !== cfg.apikey) return json({ error: 'bad apikey' }, 401);
      const params = {
        query: q.get('Query') || q.get('query') || '',
        title: q.get('title') || '',
        original: q.get('title_original') || '',
        year: q.get('year') || null,
      };
      const results = await find(cfg, ctx, params);
      return json({
        Results: results.map((r) => toJackett(r, base)),
        Indexers: [{ ID: 'uakino', Name: 'UAKino', Status: 2, Results: results.length, Error: null }],
      });
    }

    if (url.pathname === '/download') {
      let t;
      try { t = new URL(q.get('url') || ''); } catch (e) { return json({ error: 'bad url' }, 400); }
      const allowed = new URL(cfg.host);
      if (t.hostname.replace(/^www\./, '') !== allowed.hostname.replace(/^www\./, '') || !/^\/torrent\/\d+\//.test(t.pathname)) {
        return json({ error: 'only ' + allowed.hostname + '/torrent/* is allowed' }, 403);
      }
      const res = await request(cfg, t.toString());
      const name = decodeURIComponent(t.pathname.split('/').pop());
      return new Response(res.body, {
        headers: { 'Content-Type': 'application/x-bittorrent', 'Content-Disposition': "attachment; filename*=UTF-8''" + encodeURIComponent(name), ...CORS },
      });
    }

    return json({ error: 'not found' }, 404);
  } catch (e) {
    return json({ error: e.message }, e.status || 502);
  }
}

module.exports = { fetch: handle };

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
  "lib/bencode.js": [{}, function (module, exports, require) {
'use strict';

// Мінімальний bencode-декодер без залежностей від Node: працює і в Node, і в Cloudflare Workers.
// Рядки повертаються як Uint8Array, для словника "info" запам'ятовуються межі в байтах,
// щоб порахувати infohash.

const utf8 = new TextDecoder('utf-8');

function ascii(buf, start, end) {
  let s = '';
  for (let i = start; i < end; i++) s += String.fromCharCode(buf[i]);
  return s;
}

function decode(buf) {
  let pos = 0;
  let infoRange = null;

  function readInt(end) {
    const n = Number(ascii(buf, pos, end));
    if (!Number.isFinite(n)) throw new Error('bencode: bad integer at ' + pos);
    return n;
  }

  function next(depth) {
    const c = buf[pos];
    if (c === 0x69) { // i
      const end = buf.indexOf(0x65, pos);
      if (end < 0) throw new Error('bencode: unterminated integer');
      pos++;
      const n = readInt(end);
      pos = end + 1;
      return n;
    }
    if (c === 0x6c) { // l
      pos++;
      const list = [];
      while (buf[pos] !== 0x65) {
        if (pos >= buf.length) throw new Error('bencode: unterminated list');
        list.push(next(depth + 1));
      }
      pos++;
      return list;
    }
    if (c === 0x64) { // d
      pos++;
      const dict = {};
      while (buf[pos] !== 0x65) {
        if (pos >= buf.length) throw new Error('bencode: unterminated dict');
        const key = utf8.decode(next(depth + 1));
        const start = pos;
        dict[key] = next(depth + 1);
        if (depth === 0 && key === 'info') infoRange = [start, pos];
      }
      pos++;
      return dict;
    }
    if (c >= 0x30 && c <= 0x39) {
      const colon = buf.indexOf(0x3a, pos);
      if (colon < 0) throw new Error('bencode: bad string');
      const len = readInt(colon);
      const start = colon + 1;
      if (start + len > buf.length) throw new Error('bencode: string out of range');
      pos = start + len;
      return buf.subarray(start, pos);
    }
    throw new Error('bencode: unexpected byte ' + c + ' at ' + pos);
  }

  const value = next(0);
  return { value, infoRange };
}

function str(v) {
  return v instanceof Uint8Array ? utf8.decode(v) : (v == null ? '' : String(v));
}

function hex(bytes) {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Розбирає .torrent і повертає назву, розмір, infohash, трекери та magnet.
async function parseTorrent(input) {
  const buf = input instanceof Uint8Array ? input : new Uint8Array(input);
  if (buf[0] !== 0x64) throw new Error('not a torrent file');
  const { value, infoRange } = decode(buf);
  if (!value.info || !infoRange) throw new Error('torrent has no info dictionary');

  const info = value.info;
  const infoHash = hex(await crypto.subtle.digest('SHA-1', buf.slice(infoRange[0], infoRange[1])));
  const name = str(info['name.utf-8'] || info.name);

  let files;
  if (Array.isArray(info.files)) {
    files = info.files.map((f) => ({
      path: (f['path.utf-8'] || f.path || []).map(str).join('/'),
      length: f.length || 0,
    }));
  } else {
    files = [{ path: name, length: info.length || 0 }];
  }
  const size = files.reduce((sum, f) => sum + f.length, 0);

  const trackers = [];
  const add = (t) => { const s = str(t); if (s && trackers.indexOf(s) < 0) trackers.push(s); };
  if (value.announce) add(value.announce);
  if (Array.isArray(value['announce-list'])) {
    value['announce-list'].forEach((tier) => (Array.isArray(tier) ? tier : [tier]).forEach(add));
  }

  const magnet = 'magnet:?xt=urn:btih:' + infoHash +
    '&dn=' + encodeURIComponent(name) +
    trackers.map((t) => '&tr=' + encodeURIComponent(t)).join('');

  return { name, infoHash, size, files, trackers, magnet, created: value['creation date'] || null };
}

module.exports = { decode, parseTorrent };

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

export default __load("worker/src.js");
