import { createContext } from "react";
import * as Tone from "tone";

export const synth =
  typeof window !== "undefined" && new Tone.PolySynth(6, Tone.Synth).toMaster();
export const effects = typeof window !== "undefined" && {
  "Bit Crusher": new Tone.BitCrusher(),
  Chorus: new Tone.Chorus(),
  Reverb: new Tone.Freeverb(),
  PingPongDelay: new Tone.PingPongDelay(),
};

const context: {
  synth: any; // @TODO
  effects: any; // @TODO
} = { synth, effects };

export const ToneContext = createContext(context);
