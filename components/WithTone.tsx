import * as Tone from "tone";

const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  Chorus: new Tone.Chorus(),
  Reverb: new Tone.Freeverb(),
  PingPongDelay: new Tone.PingPongDelay(),
};

const WithTone = ({ children }) => children({ synth, effects });

export default WithTone;
