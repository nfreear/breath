
const NAV = window.navigator;
const PATH = window.location.pathname;
const $BREATH = document.querySelector('#breath');
const $BREATH_IN = document.querySelector('#breath-in-anim');
const $BREATH_OUT = document.querySelector('#breath-out-anim');

['click'/*, 'keypress' */].map(evName => {
  $BREATH.addEventListener(evName, ev => {
    console.warn('Breath App: click to breath!', ev);

    if ($BREATH_IN.getAttribute('begin') === 'click') {
      $BREATH_IN.setAttribute('begin', 'breath-out-anim.end + 1s');
      $BREATH_OUT.setAttribute('begin', 'breath-in-anim.end + 1s');
    } else {
      $BREATH_IN.setAttribute('begin', 'click');
      $BREATH_OUT.setAttribute('begin', '');
    }
  });
});

/**
* @see https://developers.google.com/web/fundamentals/primers/service-workers/registration
*/

if ('serviceWorker' in NAV) {
  window.addEventListener('load', () => {
    NAV.serviceWorker.register(`${PATH}lib/service-worker.js`)
      .then(() => console.warn('Breath App: service-worker.js registered OK!'));
  });
}
