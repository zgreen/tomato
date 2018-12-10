import { createContext, memo, useContext, useState } from "react";
import Tone from "tone";
import Start from "./presentational/Start";
import StartButton from "./presentational/StartButton";
import styled from "./presentational/Styled";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
const { H1, H2 } = styled;

const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  // @TODO breaks FF
  //chorus: new Tone.Chorus(),
  reverb: new Tone.Reverb(),
  "Pitch Shift": new Tone.PitchShift()
};

export const ToneContext = createContext({ synth, effects });
export default ({ children }) => {
  const [didStart, setDidStart] = useState(false);
  const handleKeyUp = e => {
    e.preventDefault();
    synth.triggerAttackRelease("C4", "8n");
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
        thing.
      </em>
    </Start>
  );
};
