/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

import BreathAppElement from './BreathAppElement.js';
import AboutDialogElement from './app-about.js';
import SoundManagerElement from './sound.js';
import setupAnalytics from './analytics.js';

const { customElements } = window;
// const breathAppElem = document.querySelector('breath-app');

// defineAboutDialogElement();
customElements.define('breath-app', BreathAppElement);
customElements.define('sound-manager', SoundManagerElement);
customElements.define('about-dialog', AboutDialogElement);

setupAnalytics();

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
* @see https://stackoverflow.com/questions/35780397/understanding-service-worker-scope/48068714#
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { type: 'module' }) // , { scope: `${PATH}` }
      .then(() => console.warn('Breath App: service-worker.js registered OK!'));
  });
}
