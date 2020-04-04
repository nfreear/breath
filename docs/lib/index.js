/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

import * as APP_ABOUT from './app-about.js';

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

urlSetAnimationDuration();

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
  const M_DUR = window.location.search.match(/duration=(\d{1,2}(\.\d)?s)/);
  const DURATION = M_DUR ? M_DUR[1] : '10s';

  console.warn('animation-duration:', DURATION);

  $BREATH.style.animationDuration = DURATION;
}

function togglePlayPause (ev) {
  ev.preventDefault();

  console.warn(`Breath App: ${isPlaying ? 'PAUSE' : 'PLAY'}`, ev, APP_ABOUT);

  $HTML.classList.remove(isPlaying ? 'is-playing' : 'is-paused');
  $HTML.classList.add(isPlaying ? 'is-paused' : 'is-playing');

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
