/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

import { adjustVolume } from './adjust-volume.js';

const QUERY = window.location.search;

const VOLUME = {
  breathe: 0.25,
  hold: 0.03
};

const IN_PLAY_OFFSET = 1000; // Milliseconds.
const IN_STOP_OFFSET = IN_PLAY_OFFSET + 3000;
const EX_PLAY_OFFSET = IN_STOP_OFFSET + 2000;
const EX_STOP_OFFSET = EX_PLAY_OFFSET + 3000;

const duration = 500; // Millis.

export default function ($BREATH) {
  const SEL_SOUND = param(/sound=(drone|dark|baltic|amb3)/);

  const ALL_AUDIOS = document.querySelectorAll('audio[ data-id ]');
  const $SOUND = SEL_SOUND ? [...ALL_AUDIOS].find(snd => snd.dataset.id === SEL_SOUND) : null;

  console.debug('Breath App - sound:', SEL_SOUND, ALL_AUDIOS, $SOUND);

  if (!SEL_SOUND) {
    console.debug('Breath App -', 'no sound');
    return;
  }

  let iterCount = 0;
  const timers = {};

  $BREATH.addEventListener('breathapp:play', ev => onAnimation(ev));
  $BREATH.addEventListener('animationiteration', ev => onAnimation(ev));

  $BREATH.addEventListener('breathapp:pause', ev => {
    console.debug('>> sound.', ev.type);

    $SOUND.pause();

    clearTimeouts();
  });

  function onAnimation (ev) {
    console.debug(`>> sound. ${ev.type}:`, iterCount);
    iterCount++;

    volumeHold();

    $SOUND.load(); // Reset.
    $SOUND.play();

    clearTimeouts();

    // Inhale .. hold.
    timers.playIn = setTimeout(() => volumeBreathe(), IN_PLAY_OFFSET);
    timers.stopIn = setTimeout(() => volumeHold(), IN_STOP_OFFSET);

    // Exhale .. hold.
    timers.playEx = setTimeout(() => volumeBreathe(), EX_PLAY_OFFSET);
    timers.stopEx = setTimeout(() => volumeHold(), EX_STOP_OFFSET);
  }

  function volumeHold () {
    adjustVolume($SOUND, VOLUME.hold, { duration })
      .then(() => console.debug('Hold ~ volume:', $SOUND.volume));
  }

  function volumeBreathe () {
    adjustVolume($SOUND, VOLUME.breathe, { duration })
      .then(() => console.debug('Breathe ~ volume:', $SOUND.volume));
  }

  // function volumeHold () { $SOUND.volume = VOLUME_HOLD; console.debug('Hold ~ volume:', $SOUND.volume); }
  // function volumeBreathe () { $SOUND.volume = VOLUME_BREATHE; console.debug('Breathe ~ volume:', $SOUND.volume);  }

  function clearTimeouts () {
    for (const it in timers) {
      if (timers[it]) {
        clearTimeout(timers[it]);
        timers[it] = null;
      }
    }
  }
}

function param (regex, def = null) {
  const MATCHES = QUERY.match(regex);

  return MATCHES ? MATCHES[1] : def;
}
