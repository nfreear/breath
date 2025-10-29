import { adjustVolume } from './adjust-volume.js';

const { HTMLElement, location } = window;

/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

const IN_PLAY_OFFSET = 1000; // Milliseconds.
const IN_STOP_OFFSET = IN_PLAY_OFFSET + 3000;
const EX_PLAY_OFFSET = IN_STOP_OFFSET + 2000;
const EX_STOP_OFFSET = EX_PLAY_OFFSET + 3000;

const duration = 400; // Milliseconds.

export class SoundManagerElement extends HTMLElement {
  #iterCount = 0;
  #audioElem;
  #timers = {};

  get #eventPfx () { return 'breathapp:'; }
  get #soundRegex () { return /^(drone|dark|baltic|amb3)$/; }

  get #soundParam () {
    const url = new URL(location);
    const sound = url.searchParams.get('sound');
    return sound && this.#soundRegex.test(sound) ? sound : null;
  }

  get #volumes () {
    return {
      breathe: 0.25,
      hold: 0.03
    };
  }

  connectedCallback () {
    this.#audioElem = this.#getAudioElement();

    if (!this.#audioElem) {
      console.debug('SoundManager -', 'no sound');
      return;
    }

    window.addEventListener(`${this.#eventPfx}play`, (ev) => this.#onPlayEvent(ev));
    window.addEventListener(`${this.#eventPfx}pause`, (ev) => this.#onPauseEvent(ev));

    console.debug('SoundManager', [this]);
  }

  #getAudioElement () {
    const audioElems = this.querySelectorAll('audio[ data-id ]');
    console.assert(audioElems.length, 'Expecting at least one audio element.');
    const audioElem = this.#soundParam ? [...audioElems].find(aud => aud.dataset.id === this.#soundParam) : null;

    console.debug('SoundManager:', this.#soundParam, audioElems, audioElem);
    return audioElem;
  }

  #volumeHold () {
    adjustVolume(this.#audioElem, this.#volumes.hold, { duration })
      .then(el => console.debug('Hold ~ volume:', el.volume));
  }

  #volumeBreathe () {
    adjustVolume(this.#audioElem, this.#volumes.breathe, { duration })
      .then(el => console.debug('Breathe ~ volume:', el.volume));
  }

  #clearTimeouts () {
    for (const it in this.#timers) {
      if (this.#timers[it]) {
        clearTimeout(this.#timers[it]);
        this.#timers[it] = null;
      }
    }
  }

  #onPlayEvent (ev) {
    console.debug(`>> sound. ${ev.type}:`, this.#iterCount, ev);
    this.#iterCount++;

    this.#volumeHold();

    this.#audioElem.load(); // Reset.
    this.#audioElem.play();

    this.#clearTimeouts();

    // Inhale .. hold.
    this.#timers.playIn = setTimeout(() => this.#volumeBreathe(), IN_PLAY_OFFSET);
    this.#timers.stopIn = setTimeout(() => this.#volumeHold(), IN_STOP_OFFSET);

    // Exhale .. hold.
    this.#timers.playEx = setTimeout(() => this.#volumeBreathe(), EX_PLAY_OFFSET);
    this.#timers.stopEx = setTimeout(() => this.#volumeHold(), EX_STOP_OFFSET);
  }

  #onPauseEvent (ev) {
    console.debug('>> sound.', ev.type, ev);

    this.#audioElem.pause();

    this.#clearTimeouts();
  }
}

export default SoundManagerElement;
