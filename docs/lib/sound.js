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
  let timerIn;
  let timerEx;

  $BREATH.addEventListener('animationstart', ev => onAnimation(ev));
  $BREATH.addEventListener('animationiteration', ev => onAnimation(ev));

  $BREATH.addEventListener('animationend', ev => {
    console.debug('Animation end');
    $SOUND.pause();

    if (timerIn) { clearTimeout(timerIn); }
    if (timerEx) { clearTimeout(timerEx); }
  });

  function onAnimation (ev) {
    console.debug(`Animation iteration count: ${iterCount}`, ev.type);
    iterCount++;

    $SOUND.load(); // Reset.

    timerIn = setTimeout(() => {
      console.debug('Audio play');
      $SOUND.play();
    },
    IN_PLAY_OFFSET);

    setTimeout(() => $SOUND.pause(), IN_STOP_OFFSET);

    timerEx = setTimeout(() => $SOUND.play(), EX_PLAY_OFFSET);
    setTimeout(() => $SOUND.pause(), EX_STOP_OFFSET);
  }
}
