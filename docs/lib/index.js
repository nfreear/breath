/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
/* eslint-enable */

const ga = window.ga;
const NAV = window.navigator;
const PATH = window.location.pathname;
const $HTML = document.querySelector('html');
const $PAUSE_BTN = document.querySelector('#pause-btn');
const $BREATH = document.querySelector('#breath');

ga('create', 'UA-8330079-9', 'auto');
ga('send', 'pageview');

let isPlaying = false;

['click', 'keypress'].map(evName => {
  $BREATH.addEventListener(evName, ev => togglePlayPause(ev));

  $PAUSE_BTN.addEventListener(evName, ev => togglePlayPause(ev));
});

function togglePlayPause (ev) {
  ev.preventDefault();

  console.warn(`Breath App: ${isPlaying ? 'PAUSE' : 'PLAY'}`, ev);

  $HTML.classList.remove(isPlaying ? 'playing' : 'paused');
  $HTML.classList.add(isPlaying ? 'paused' : 'playing');

  window.setTimeout(() => {
    $BREATH.innerHTML = `<title>&#10; ${isPlaying ? 'PLAY' : 'PAUSE'} &#10;</title>`;

    isPlaying = !isPlaying;
  }, 50);
}

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
*/

if ('serviceWorker' in NAV) {
  window.addEventListener('load', () => {
    NAV.serviceWorker.register(`${PATH}lib/service-worker.js`)
      .then(() => console.warn('Breath App: service-worker.js registered OK!'));
  });
}
