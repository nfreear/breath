const { location } = globalThis;

export default function urlsToCache () {
  const PATH = location.pathname.replace(/\/[^/]+$/, '') + '/lib'; // '/docs/service-worker.js'

  console.warn('sw.js ~ Location:', PATH, location, import.meta);
  return [
    '/',
    `${PATH}/../service-worker.js`,
    `${PATH}/adjust-volume.js`,
    `${PATH}/analytics.js`,
    `${PATH}/animate.css`,
    `${PATH}/app-about.html`,
    `${PATH}/app-about.js`,
    `${PATH}/icon.png`,
    `${PATH}/icon.svg`,
    `${PATH}/index.js`,
    `${PATH}/sound.js`, // Was: 'audio.js'
    `${PATH}/style.css`,
    `${PATH}/urlsToCache.js`,
    './sound/freesound-cactus2003-dark-103340-lq-clip.mp3', /// dur=44s;
    './sound/freesound-pulswelle-baltic-339517-lq-clip.mp3', // dur=30s;
    './sound/freesound-tec_studio-drone-353976-lq.mp3' // dur=34s; Was: `${PATH}/soundcloud-tec_studio-drone-353976-lq.mp3`,
    // '/offline.html'
  ];
}
