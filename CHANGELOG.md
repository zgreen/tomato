# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2019-12-11

### Added

- Initial release
- Tomato is publicly accessible at [https://tomatosynth.now.sh](https://tomatosynth.now.sh).
- Displays a start screen, with a button to play a chord to initialize/authorize web audio for the user.
- Displays a footer with links to author, relevant technologies, GitHub repo link, license, and version number.
- The license is MIT. It is publically accessbile at [https://tomatosynth.now.sh/license](https://tomatosynth.now.sh/license), and also in the GitHub repo.
- Tomato renders its start screen on the server, and asynchronously loads most the the app code client side. This is because the app is entirely dependent on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
- Tomato displays a grid of 20 notes. These notes may be played via the `mousedown`, `touchstart`, or `keydown` events.
- Notes are mapped to keyboard keys in a linear fashion, according to an english language keyboard layout. `z` maps to the lowest note, then `x`, then `c`, and so on.
- Playing a note triggers an attack. The note will not be released until the corresponding event (`mouseup`, `touchend`, `keyup`) occurs.
- Includes a few minimal controls. The intial octave may be changed, the oscillator can be toggled between `triangle`, `sine`, `square`, and `sawtooth`, and three effects may be toggled on/off: `Bit Crusher`, `Chorus`, `Revereb`.
- The UI is responsive and should be playable on mobile/desktop.