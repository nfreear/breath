/**
 * HTML5 <audio> playback with fade in and fade out, from Stackoverflow.
 *
 * @author  jedmao, 2012-2018.
 * @license CC-BY-SA-4.0 + MIT
 * @see https://stackoverflow.com/posts/13149848/revisions
 * @see https://stackoverflow.com/questions/7451508/html5-audio-playback-with-fade-in-and-fade-out
 */

export async function adjustVolume (
  element /* : HTMLMediaElement */,
  newVolume /* : number */,
  {
    duration = 1000,
    easing = swing,
    interval = 13
  } /* : {
        duration?: number,
        easing?: typeof swing,
        interval?: number,
  } */ = {}
) {
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;

  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }

  const ticks = Math.floor(duration / interval);
  let tick = 1;

  return new Promise/* <void> */((resolve) => {
    const timer = setInterval(() => {
      element.volume = originalVolume + (
        easing(tick / ticks) * delta
      );

      if (++tick === ticks) {
        clearInterval(timer);
        resolve();
      }
    }, interval);
  });
}

export function swing (p /* : number */) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}
