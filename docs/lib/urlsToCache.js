const { location } = globalThis;

export default function urlsToCache () {
  const PATH = location.pathname.replace(/\/[^/]+$/, ''); // '/docs/service-worker.js'

  console.warn('sw.js ~ Location:', PATH, location, import.meta);
  return [
    `${PATH}/`,
    `${PATH}/index.html`,
    `${PATH}/service-worker.js`,
    `${PATH}/lib/adjust-volume.js`,
    `${PATH}/lib/analytics.js`,
    `${PATH}/lib/animate.css`,
    `${PATH}/lib/app-about.html`,
    `${PATH}/lib/app-about.js`,
    `${PATH}/lib/icon.png`,
    `${PATH}/lib/icon.svg`,
    `${PATH}/lib/index.js`,
    `${PATH}/lib/sound.js`, // Was: 'audio.js'
    `${PATH}/lib/style.css`,
    `${PATH}/lib/urlsToCache.js`,
    `${PATH}/sound/freesound-cactus2003-dark-103340-lq-clip.mp3`, /// dur=44s;
    `${PATH}/sound/freesound-pulswelle-baltic-339517-lq-clip.mp3`, // dur=30s;
    `${PATH}/sound/freesound-tec_studio-drone-353976-lq.mp3` // dur=34s; Was: `${PATH}/soundcloud-tec_studio-drone-353976-lq.mp3`,
    // '/offline.html'
  ];
}
