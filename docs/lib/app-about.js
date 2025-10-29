const { HTMLElement } = window;

export class AboutDialogElement extends HTMLElement {
  get #htmlTemplate () {
    return `
  <template>
    <button id="launchButton" part="button launchButton" aria-haspopup="dialog">
      <slot>Breath</slot>
    </button>
    <dialog part="dialog" aria-labelledby="labelID">
      <form method="dialog">
        <button part="button closeButton" aria-label="Close">×</button>
      </form>
      <h1 part="h1" id="labelID"> Breath Web App<sup part="sup"> beta</sup> </h1>
      <p part="p">
        <a part="a" href="https://github.com/nfreear/breath#readme"
           target="_blank" rel="noopener"
           title="&#10; Opens in a new window &#10;">Find out more</a>
        |
        © Nick Freear
        |
        License:
        <a part="a" href="https://github.com/nfreear/breath#license"
           target="_blank" rel="noopener"
           title="&#10; Opens in a new window &#10;">GPL</a>
        |
      </p>
      <p part="p" class="about-sound">
        Sound:
        <a data-id="amb3" href="https://freesound.org/people/Erokia/sounds/432500/"
          target="_blank" rel="noopener" title="Opens in new window"
          >'Ambient Wave 3 - (Harmonics)' by Erokia | License: CC-by-nc</a>
        <a data-id="baltic" href="https://freesound.org/people/pulswelle/sounds/339517/"
          target="_blank" rel="noopener" title="Opens in new window"
          >'Waves at Baltic Sea shore.wav' by pulswelle | License: CC-0</a>
        <a data-id="dark" href="https://freesound.org/people/CaCtUs2003/sounds/103340/"
          target="_blank" rel="noopener" title="Opens in new window"
          >'Dark_Ambience.wav' by CaCtUs2003 | License: CC-0</a>
        <a data-id="drone" href="https://freesound.org/people/tec_studio/sounds/353976/"
          target="_blank" rel="noopener" title="Opens in new window"
          >'drone.wav' by TEC Studios on SoundCloud | License: CC-0</a>
      </p>
    </dialog>
  </template>
`;
  }

  connectedCallback () {
    attachTemplate(this.#htmlTemplate).to.shadowDOM(this);

    const launchButton = this.shadowRoot.querySelector('#launchButton');
    const dialog = this.shadowRoot.querySelector('dialog');

    launchButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      dialog.showModal();
    });
  }
}

export function attachTemplate (templateHtml) {
  console.assert(templateHtml, 'templateHtml - required');
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(templateHtml, 'text/html');

  const template = doc.querySelector('template');
  if (!template) {
    throw new Error('Missing <template> element. Can\'t clone node.');
  }
  const docFragment = template.content.cloneNode(true);

  return {
    to: {
      shadowDOM: (element) => {
        element.attachShadow({ mode: 'open' }).appendChild(docFragment);
      },
      element: (element) => {
        element.appendChild(docFragment);
      }
    }
  };
}

export default AboutDialogElement;

/*
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
*/
