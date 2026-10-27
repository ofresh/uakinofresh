'use strict';

// Сайти з українською озвучкою. host можна змінити в налаштуваннях плагіна (дзеркала).
//   linkRe     — шлях сторінки фільму, якщо сайт не на DLE (там це /12345-slug.html)
//   searchPath — GET-пошук, якщо сайт не використовує стандартну форму DLE
//   torrents   — на сайті є .torrent
const SOURCES = [
  { id: 'uakino', name: 'UAKino', host: 'https://uakino.best', torrents: true },
  { id: 'uaserials', name: 'UASerials', host: 'https://uaserials.my' },
  { id: 'uaflix', name: 'UAFlix', host: 'https://uafix.net', linkRe: /^\/(?!page\/|tags\/|xfsearch\/|user\/|index)[a-z-]+\/[a-z0-9-]+\/$/ },
  { id: 'eneyida', name: 'Eneyida', host: 'https://eneyida.tv' },
  { id: 'uaserial', name: 'UASerial', host: 'https://uaserial.tv', searchPath: '/search?query=', linkRe: /^\/(movie|serial|series|cartoon|anime|show)-[^/]+$/ },
];

function getSource(id) {
  return SOURCES.filter((s) => s.id === id)[0] || null;
}

module.exports = { SOURCES, getSource };
