/*!
  Breath Web App | © Nick Freear | License: GPL-3.0+.
*/

export default function ($BREATH) {
  const WITH_SOUND = /sound=1/.test(window.location.href);

  // const $BREATH = document.querySelector('#breath');
  const $SOUND = document.querySelector('#sound');
  const IN_PLAY_OFFSET = 1000; // Milliseconds.
  const IN_STOP_OFFSET = IN_PLAY_OFFSET + 3000;
  const EX_PLAY_OFFSET = IN_STOP_OFFSET + 2000;
  const EX_STOP_OFFSET = EX_PLAY_OFFSET + 3000;

  if (!WITH_SOUND) {
    console.debug('Breath App:', 'no sound');
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

    $SOUND.load(); // Reset.

    clearTimeouts();

    timers.playIn = setTimeout(() => {
      console.debug('Audio play');
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
