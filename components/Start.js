import { createContext, memo, useContext, useState } from "react";
import Tone from "tone";
import startAudioContext from "startaudiocontext";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  // @TODO breaks FF
  //chorus: new Tone.Chorus(),
  reverb: new Tone.Reverb()
};

export const ToneContext = createContext({ synth, effects });
export default ({ children }) => {
  const [didStart, setDidStart] = useState(false);
  const handleKeyUp = e => {
    e.preventDefault();
    startAudioContext(Tone.context, "button").then(function() {
      synth.triggerAttackRelease("C4", "8n");
      setDidStart(true);
    });
  };
  console.log("didStart", didStart);
  return didStart ? (
    children
  ) : (
    <div>
      <h1>Welcome to tomato synth.</h1>
      <button
        onClick={handleKeyUp}
        onKeyUp={handleKeyUp}
        onTouchEnd={handleKeyUp}
      >
        Get started 🍅
      </button>
    </div>
  );
};
