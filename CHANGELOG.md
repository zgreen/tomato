# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.2.1 (2020-07-09)

## [1.2.0](https://github.com/zgreen/tomato/compare/v1.1.2...v1.2.0) (2020-07-09)


### Features

* /keyboard route ([c750edf](https://github.com/zgreen/tomato/commit/c750edfbf4fa89257c1c4c2bead8486390fa54d9))

### [1.1.2](https://github.com/zgreen/tomato/compare/v1.1.1...v1.1.2) (2020-07-09)

### [1.1.1](https://github.com/zgreen/tomato/compare/v1.1.0...v1.1.1) (2020-01-04)


### Bug Fixes

* add license year ([be61371](https://github.com/zgreen/tomato/commit/be613713e1d678cdf296d0a5ea13000717dbdc6d))
* firefox `/` key opens text search ([f4be3f2](https://github.com/zgreen/tomato/commit/f4be3f25c5a0715881d5f96aa8f3db3955631aa5))
* lost effect checked state ([8f69333](https://github.com/zgreen/tomato/commit/8f6933322bd3f3f1e88926bcdc6970e0d71ecb54))

## [1.1.0](https://github.com/zgreen/tomato/compare/v1.0.3...v1.1.0) (2020-01-04)


### Features

* add PingPongDelay ([f3688fa](https://github.com/zgreen/tomato/commit/f3688fa2580a56aacb18ee0d2d6b0e798685ae0b))
* Debug component ([931f203](https://github.com/zgreen/tomato/commit/931f2039cc3b3863aabbfc7d2a5f29f13f856bf0))


### Bug Fixes

* simpler should focus logic ([698ea20](https://github.com/zgreen/tomato/commit/698ea20a1acd254f7e09f2a870f2e6a4e29c08e9))

### [1.0.3](https://github.com/zgreen/tomato/compare/v1.0.2...v1.0.3) (2019-10-10)


### Bug Fixes

* read version from package.json ([40a3540](https://github.com/zgreen/tomato/commit/40a3540aeab7732cd67c359f54dda29aeb86adcd))

### 1.0.2 (2019-10-09)

## [1.0.1] - 2019-01-05

### Changed

- Calls `e.preventDefault()` for playable notes. This addresses https://github.com/zgreen/tomato/issues/1. Requires focussing the most recently played key.
- This changelog is publically accessible in the app at `/changelog`.

## [1.0.0] - 2018-12-11

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
- Uses a development version (`r13-dev`) of Tone.js, to address a Firefox bug.
