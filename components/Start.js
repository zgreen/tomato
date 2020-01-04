import { createContext, useState } from "react";
import Tone from "tone";
import Start from "./presentational/Start";
import StartButton from "./presentational/StartButton";
import styled from "./presentational/Styled";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
const { H1 } = styled;

const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  Chorus: new Tone.Chorus(),
  //"Pitch Shift": new Tone.PitchShift(),
  Reverb: new Tone.Freeverb(),
  // Tremolo: new Tone.Tremolo()
  PingPongDelay: new Tone.PingPongDelay()
};

export const ToneContext = createContext({ synth, effects });
export default ({ children }) => {
  const [didStart, setDidStart] = useState(false);
  const handleKeyUp = e => {
    e.preventDefault();
    synth.triggerAttackRelease(["C3", "E3", "G3", "B3"], "6n");
    setDidStart(true);
  };
  return didStart ? (
    children
  ) : (
    <Start>
      <H1>Welcome to tomato synth.</H1>
      <StartButton
        onClick={handleKeyUp}
        onKeyUp={handleKeyUp}
        onTouchEnd={handleKeyUp}
      />
      <em>
        This makes music when you play with it. Bail out now if that's not your
        thing. Also, it's built for english language keyboards and touch
        devices. Your results may vary.
      </em>
    </Start>
  );
};
