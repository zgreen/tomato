import { useState } from "react";
import dynamic from "next/dynamic";
import Button, { BasicButton } from "./SynthButton";
import Controls from "./presentational/Controls";
import Label, { Labels } from "./presentational/Label";
import Keyboard from "./presentational/Keyboard";
import SynthKeyboard from "@/components/SynthKeyboard";
import { keyboardKeys } from "../config";
import Debug from "./Debug";
import { OctaveInput } from "./OctaveInput";
import { OscillatorSelect } from "./OscillatorSelect";
import { Effects } from "./Effects";
import { Output } from "@/hooks/synth";

const Synth = dynamic(() => import("./Synth"), { ssr: false });

const App = () => {
  const [displayControls, toggleDisplayControls] = useState(false);

  return (
    <Synth>
      <Output />
      <SynthKeyboard>
        <Debug />
        <Controls>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toggleDisplayControls((prev) => !prev);
            }}
          >
            <BasicButton type="submit">
              {displayControls ? "Hide" : "Show"} controls ⚡️
            </BasicButton>
          </form>
          {displayControls && (
            <Labels>
              <Label text="Octave">
                <OctaveInput />
              </Label>
              <Label text="Oscillator">
                <OscillatorSelect />
              </Label>
              <Effects />
            </Labels>
          )}
        </Controls>
        <Keyboard>
          {keyboardKeys.map((key, idx, arr) => (
            <Button
              {...{ idx, totalButtons: arr.length, keyboardKey: key }}
              key={key}
              value={`play:${key}`}
            ></Button>
          ))}
        </Keyboard>
      </SynthKeyboard>
    </Synth>
  );
};

export default App;
