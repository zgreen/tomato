module.exports = {
  BitCrusher: class {},
  Chorus: class {},
  PingPongDelay: class {},
  Freeverb: class {},
  PolySynth: class {
    toDestination() {
      return {
        triggerAttack: (payload) => {
          window.audio = {
            ...window.audio,
            activeNotes: [...window.audio.activeNotes, payload],
          };
        },
        triggerRelease: (payload) => {
          window.audio = {
            ...window.audio,
            activeNotes: window.audio.activeNotes.filter(
              (note) => note !== payload
            ),
          };
        },
        set: () => {},
      };
    }
  },
};
