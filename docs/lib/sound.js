/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

const QUERY = window.location.search;

const VOLUME = 0.25;
const IN_PLAY_OFFSET = 1000; // Milliseconds.
const IN_STOP_OFFSET = IN_PLAY_OFFSET + 3000;
const EX_PLAY_OFFSET = IN_STOP_OFFSET + 2000;
const EX_STOP_OFFSET = EX_PLAY_OFFSET + 3000;

export default function ($BREATH) {
  const SEL_SOUND = param(/sound=(drone|dark|baltic)/); // /sound=(1|true)/.test(window.location.href);

  const ALL_AUDIO = document.querySelectorAll('audio[ data-sound ]');
  const $SOUND = SEL_SOUND ? [...ALL_AUDIO].find(snd => snd.dataset.sound === SEL_SOUND) : null;

  console.debug('Breath App - sound:', SEL_SOUND, ALL_AUDIO, $SOUND);

  if (!SEL_SOUND) {
    console.debug('Breath App -', 'no sound');
    return;
  }

  let iterCount = 0;
  const timers = {};

  $SOUND.volume = VOLUME;

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

    $SOUND.load(); // Reset.

    clearTimeouts();

    timers.playIn = setTimeout(() => {
      console.debug('Audio play. Volume:', $SOUND.volume);
      $SOUND.play();
    }, IN_PLAY_OFFSET);

    timers.stopIn = setTimeout(() => $SOUND.pause(), IN_STOP_OFFSET);

    timers.playEx = setTimeout(() => $SOUND.play(), EX_PLAY_OFFSET);
    timers.stopEx = setTimeout(() => $SOUND.pause(), EX_STOP_OFFSET);
  }

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
