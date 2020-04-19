/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

import * as APP_ABOUT from './app-about.js';
import setupAnalytics from './analytics.js';
import setupAudio from './sound.js';

const PATH = window.location.pathname;
const QUERY = window.location.search;
const $HTML = document.querySelector('html');
const $PAUSE_BTN = document.querySelector('#pause-btn');
const $BREATH = document.querySelector('#breath');

setupAnalytics();
setupAudio($BREATH);
urlSetAnimationDuration();
urlSetHighlight();

let isPlaying = false;

['click', 'keypress'].map(evName => {
  $BREATH.addEventListener(evName, ev => togglePlayPause(ev));

  $PAUSE_BTN.addEventListener(evName, ev => togglePlayPause(ev));
});

/**
 * A duration of 10 seconds equates to 6 breaths per minute ;).
 *   12s ~~ 5 breaths/min.
 *   10s ~~ 6 bpm.
 *    8s ~~ 7.5 bpm.
 *
 *  @see [moss-2004] & [sutarto-2012] in the README.
 */
function urlSetAnimationDuration () {
  const DURATION = param(/duration=(\d{1,2}(\.\d)?s)/, '10s');
  const STYLES = filterComputedStyle($BREATH);

  console.warn('animation-duration:', DURATION, STYLES);

  $BREATH.style.animationDuration = DURATION;
}

function urlSetHighlight () {
  const IS_3D = param(/highlight=(\w+)/, '3d') === '3d';

  $HTML.classList.remove(IS_3D ? 'is-flat' : 'is-3d');
  $HTML.classList.add(IS_3D ? 'is-3d' : 'is-flat');
}

function param (regex, def = null) {
  const MATCHES = QUERY.match(regex);

  return MATCHES ? MATCHES[1] : def;
}

function filterComputedStyle ($elem, filterRegex = /^animation-/) {
  const cssStyleDecl = window.getComputedStyle($elem, null);
  const styleArray = cssStyleDecl.cssText.split('; ');

  return styleArray.filter(css => filterRegex.test(css));
}

function togglePlayPause (ev) {
  ev.preventDefault();

  dispatchAppEvent(isPlaying);

  console.warn(`Breath App: ${isPlaying ? 'PAUSE' : 'PLAY'}`, ev, APP_ABOUT);

  $HTML.classList.remove(isPlaying ? 'is-playing' : 'is-paused');
  $HTML.classList.add(isPlaying ? 'is-paused' : 'is-playing');

  window.setTimeout(() => {
    $BREATH.innerHTML = `<title>&#10; ${isPlaying ? 'PLAY' : 'PAUSE'} &#10;</title>`;

    isPlaying = !isPlaying;
  }, 50);
}

function dispatchAppEvent (isPlaying) {
  const event = new window.CustomEvent(`breathapp:${isPlaying ? 'pause' : 'play'}`);

  $BREATH.dispatchEvent(event);
}

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
* @see https://stackoverflow.com/questions/35780397/understanding-service-worker-scope/48068714#
*/
console.debug('Path:', PATH);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js') // , { scope: `${PATH}` }
      .then(() => console.warn('Breath App: service-worker.js registered OK!'));
  });
}
