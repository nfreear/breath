
const WIN = window;
const ABOUT_HTML_PATH = 'lib/app-about.html';
const $HTML = document.querySelector('html');
const $ABOUT_BTN = document.querySelector('#fork-me');
const $ABOUT_DIV = document.querySelector('#about');

$ABOUT_BTN.addEventListener('click', ev => {
  ev.preventDefault();

  console.debug('app-about: click', ev);

  $HTML.classList.remove('app-about--end');

  WIN.fetch(ABOUT_HTML_PATH)
    .then(resp => resp.text())
    .then(html => {
      $ABOUT_DIV.innerHTML = html;

      WIN.setTimeout(() => {
        $HTML.classList.remove('app-about--close');

        console.debug('app-about: show');
      },
      100);
    });
});

WIN.appAboutClose = (ev) => {
  ev.preventDefault();
  console.debug('app-about-close:', ev);

  $HTML.classList.add('app-about--close');

  WIN.setTimeout(() => {
    $HTML.classList.add('app-about--end');
  },
  800);
};

export default ABOUT_HTML_PATH;
