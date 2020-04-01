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
const $PAUSE_BTN = document.querySelector('#pause-btn');
const $BREATH = document.querySelector('#breath');
const $BREATH_IN = document.querySelector('#breath-in-anim');
// const $BREATH_OUT = document.querySelector('#breath-out-anim');

ga('create', 'UA-8330079-9', 'auto');
ga('send', 'pageview');

['click'/*, 'keypress' */].map(evName => {
  $BREATH.addEventListener(evName, ev => {
    console.warn('Breath App: click to breath!', ev);

    if ($BREATH_IN.getAttribute('begin') === 'click') {
      $BREATH_IN.setAttribute('begin', 'breath-out-anim.end + 1s');
      // $BREATH_OUT.setAttribute('begin', 'breath-in-anim.end + 1s');
    } else {
      $BREATH_IN.setAttribute('begin', 'click');
      // $BREATH_OUT.setAttribute('begin', '');
    }
  });
});

$PAUSE_BTN.addEventListener('click', ev => {
  ev.preventDefault();
  console.warn('Breath App: pause / reload', ev);

  window.location.reload(false);
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
