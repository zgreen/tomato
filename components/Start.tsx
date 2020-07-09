import { useRouter } from "next/router";
import Tone from "tone";
import Start from "./presentational/Start";
import StartButton from "./presentational/StartButton";
import styled from "./presentational/Styled";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  Chorus: new Tone.Chorus(),
  Reverb: new Tone.Freeverb(),
  PingPongDelay: new Tone.PingPongDelay(),
};

export default () => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    synth.triggerAttackRelease(["C3", "E3", "G3", "B3"], "6n");
    router.push("/keyboard");
  };
  return (
    <Start>
      <h1>Welcome to tomato synth.</h1>
      <StartButton onClick={handleClick} />
      <em>
        This makes music when you play with it. Bail out now if that's not your
        thing. Also, it's built for english language keyboards and touch
        devices. Your results may vary.
      </em>
    </Start>
  );
};
