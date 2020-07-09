import { useState } from "react";
import Button, { BasicButton } from "./presentational/SynthButton";
import Controls from "./presentational/Controls";
import Label, { Labels } from "./presentational/Label";
import Keyboard from "./presentational/Keyboard";
import StyledSynth from "./presentational/Synth";
import { keyboardKeys } from "../config";
import Debug from "./Debug";
import { SynthWithTone as Synth } from "./Synth";
import { OctaveInput } from "./OctaveInput";
import { OscillatorSelect } from "./OscillatorSelect";
import { EffectInput } from "./EffectInput";

// const Synth = dynamic(() => import("./Synth"), {
//   ssr: false,
// });

const App = () => {
  const [displayControls, toggleDisplayControls] = useState(false);

  return (
    <Synth>
      {({
        handleKeyDown,
        handleTouchStart,
        handleMouseDown,
        handleRelease,
        handleEffectChange,
        handleOctaveChange,
        handleOscillatorChange,
        effects,
      }) => (
        <StyledSynth
          onTouchStart={handleTouchStart}
          onTouchEnd={handleRelease}
          onKeyDown={handleKeyDown}
          onKeyUp={handleRelease}
          onMouseDown={handleMouseDown}
          onMouseUp={handleRelease}
        >
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
                  <OctaveInput {...{ handleOctaveChange }} />
                </Label>
                <Label text="Oscillator">
                  <OscillatorSelect {...{ handleOscillatorChange }} />
                </Label>
                <h2>Effects</h2>
                {Object.keys(effects).map((effect) => (
                  <Label text={effect} key={effect}>
                    <EffectInput {...{ effect, handleEffectChange }} />
                  </Label>
                ))}
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
        </StyledSynth>
      )}
    </Synth>
  );
};

export default App;
