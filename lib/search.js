'use strict';

// Пошук на DLE-сайті uakino. Спершу POST (так шле запит сама форма пошуку на сайті), потім GET;
// помилка одного способу не зупиняє інший. Якщо нічого не знайдено — пробує коротший запит
// («Fall 2: Deadpoint» → «Fall 2»).
//
// fetchText(url, { method, body }) → Promise<string>

const parse = require('./parse');

function simplify(q) {
  return q.split(/[:–—(]/)[0].replace(/[^0-9a-zA-ZÀ-ɏЀ-ӿ ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

async function searchDle(host, query, fetchText) {
  const q = String(query || '').trim();
  if (q.length < 2) return [];
  const queries = [q];
  const short = simplify(q);
  if (short.length >= 3 && short.toLowerCase() !== q.toLowerCase()) queries.push(short);

  const errors = [];
  let ok = false;
  for (const story of queries) {
    const attempts = [
      ['POST', host + '/index.php?do=search', 'do=search&subaction=search&search_start=0&full_search=0&result_from=1&story=' + encodeURIComponent(story)],
      ['GET', host + '/index.php?do=search&subaction=search&story=' + encodeURIComponent(story), null],
    ];
    for (const [method, url, body] of attempts) {
      try {
        const list = parse.parseList(await fetchText(url, method === 'POST' ? { method, body } : {}), host);
        ok = true;
        if (list.length) return list;
      } catch (e) {
        errors.push(method + ': ' + e.message);
      }
    }
  }
  if (!ok) {
    const err = new Error('пошук на uakino не вдався (' + errors.join('; ') + ')');
    err.status = 502;
    throw err;
  }
  return [];
}

module.exports = { searchDle, simplify };
