import { useRouter } from "next/router";
import * as Tone from "tone";
import Start from "./presentational/Start";
import StartButton from "./presentational/StartButton";
const synth = new Tone.PolySynth().toDestination();

export default () => {
  const router = useRouter();
  const handleClick = async (e) => {
    e.preventDefault();
    await Tone.start();
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
        devices. It is a work in progress. Your results may vary.
      </em>
    </Start>
  );
};
