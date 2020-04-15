
# Release notes #

## 0.9.6-beta

 * Stop phone sleeping ~ ?? [Bug #8]
 * 3-D highlight (`radialGradient`) [Bug #9]

## 0.9.5-beta

 * Release: _15-April-2020_ (0.9.0-beta-11-g01910f0),
 * Switch from _10%_ to _20%_ breath-hold (_inhale 3s, hold 2s, exhale 3, hold 2 …_) [Bug #5],
 * Fix “_no matching service worker detected_“ and “_Page does not work offline_” [Bug #6],
 * Fix intermittent bug with `@keyframes` animation CSS [Bug #7],
 * Add Web App to the _FindPWA_ directory [Bug #3].

## 0.9.0-beta

 * Released: _05-April-2020_,
 * Switch from SMIL to [SVG + CSS `@keyframes` animation][keyframe] ([Anim][cani-css-anim]) ~ browser compatibility [Bug #1],
 * Make App mobile responsive [Bug #2],
 * Reduce `animation-duration` from 12 to 10 seconds
 (_base the breathing animation timings on evidence/science_) [Bug #5],
 * Add `app-about` overlay / popup [Bug #4],
 * Add OpenGraph meta-data / PNG icon [Bug #3].

## 0.8.0-beta

 * Initial release: _01-April-2020_,
 * Legacy version animated using [SVG + SMIL][smil].

---

 * Gist: [original SVG][gist]

[gist]: https://gist.github.com/nfreear/c8666ec92360d09c4f6d559a4e4d55ec
  "Gist: nfreear / breathing-animation.web-app.svg"
[smil]: https://css-tricks.com/guide-svg-animations-smil/
  "A Guide to SVG Animations (SMIL), by Sara Soueidan, 29-Aug-2018."
[keyframe]: https://css-tricks.com/snippets/css/keyframe-animation-syntax/
  "Keyframe Animation Syntax, by Chris Coyier, 19-Sep-2016."
[cani-css-anim]:https://caniuse.com/#feat=css-animation
  "Can I use 'CSS Animation' (keyframe)?"
