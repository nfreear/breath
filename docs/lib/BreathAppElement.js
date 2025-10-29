const { HTMLElement, location } = window;

/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/
export class BreathAppEvent extends Event {
  originalEvent;
  constructor (type, options) {
    super(type, options);
    this.originalEvent = options.originalEvent;
  }
}

export class BreathAppElement extends HTMLElement {
  #isPlaying = false;

  get #eventPfx () { return 'breathapp:'; } // '${this.isPlaying ? 'pause' : 'play'}`; }
  get isPlaying () { return this.#isPlaying; }

  get #breathButton () { return this.querySelector('#breath-button'); }
  get #pauseButton () { return this.querySelector('#pause-btn'); }
  get #titleElem () { return this.#breathButton.querySelector('title'); }

  connectedCallback () {
    console.assert(this.#breathButton, 'Expecting a breath button.');
    console.assert(this.#pauseButton, 'Expecting a pause button.');

    this.#urlSetAnimationDuration();
    this.#urlSetHighlight();

    this.#breathButton.addEventListener('click', (ev) => this.#togglePlayPause(ev));
    this.#pauseButton.addEventListener('click', (ev) => this.#togglePlayPause(ev));

    console.debug('breath-app', [this]);
  }

  #togglePlayPause (ev) {
    ev.preventDefault();

    const oldPlayState = this.isPlaying;

    const appEv = this.#dispatchAppEvent(oldPlayState, ev);

    console.warn(`Breath App: ${oldPlayState ? 'PAUSE' : 'PLAY'}`, appEv);

    this.classList.remove(oldPlayState ? 'is-playing' : 'is-paused');
    this.classList.add(oldPlayState ? 'is-paused' : 'is-playing');

    this.dataset.isPlaying = !oldPlayState;

    setTimeout(() => {
      this.#titleElem.textContent = `\n ${this.isPlaying ? 'PLAY' : 'PAUSE'} \n`;

      this.#isPlaying = !this.isPlaying;
    }, 50);
  }

  #dispatchAppEvent (oldPlayState, originalEvent) {
    const event = new BreathAppEvent(`${this.#eventPfx}${oldPlayState ? 'pause' : 'play'}`, {
      bubbles: true,
      originalEvent
    });
    // Was: this.dispatchEvent(event);
    window.dispatchEvent(event);
    return event;
  }

  get #durationParam () {
    const url = new URL(location);
    const duration = url.searchParams.get('duration');
    return duration ? parseInt(duration) : 10;
  }

  /**
   * A duration of 10 seconds equates to 6 breaths per minute ;).
   *   12s ~~ 5 breaths/min.
   *   10s ~~ 6 bpm.
   *    8s ~~ 7.5 bpm.
   *
   *  @see [moss-2004] & [sutarto-2012] in the README.
   */
  #urlSetAnimationDuration () {
    this.style.setProperty('--animation-duration', `${this.#durationParam}s`);
  }

  get #highlightParam () {
    const url = new URL(location);
    const highlight = url.searchParams.get('highlight');
    return highlight ?? '3d';
  }

  #urlSetHighlight () {
    const IS_3D = this.#highlightParam === '3d';

    this.classList.remove(IS_3D ? 'is-flat' : 'is-3d');
    this.classList.add(IS_3D ? 'is-3d' : 'is-flat');
  }
}

export default BreathAppElement;
