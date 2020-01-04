import { useContext } from "react";
import BoxInput from "./presentational/BoxInput";
import Button, { BasicButton, InnerButton } from "./presentational/SynthButton";
import Controls from "./presentational/Controls";
import Label, { Labels } from "./presentational/Label";
import Keyboard from "./presentational/Keyboard";
import Synth from "./presentational/Synth";
import { ToneContext } from "./Start";
import { chromaticKeyMap, keyboardKeys } from "../config";
import Debug from "./Debug";
import useSynth from "./useSynth";

const App = () => {
  const { effects } = useContext(ToneContext);
  const {
    state,
    shouldFocusContainer,
    handleKeyDown,
    handleTouchStart,
    handleMouseDown,
    handleRelease,
    handleEffectChange,
    handleOctaveChange,
    handleOscillatorChange,
    toggleDisplayControls
  } = useSynth();
  const {
    activeNotes,
    displayControls,
    octave,
    oscillator,
    activeEffects
  } = state;
  const notes = chromaticKeyMap(octave);

  return (
    <Synth
      tabIndex="0"
      shouldFocus={shouldFocusContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleRelease}
      onKeyDown={handleKeyDown}
      onKeyUp={handleRelease}
      onMouseDown={handleMouseDown}
      onMouseUp={handleRelease}
    >
      <Debug {...{ state }} />
      <Controls>
        <form onSubmit={toggleDisplayControls}>
          <BasicButton type="submit">
            {displayControls ? "Hide" : "Show"} controls ⚡️
          </BasicButton>
        </form>
        {displayControls && (
          <Labels>
            <Label text="Octave">
              <BoxInput
                onChange={handleOctaveChange}
                type="number"
                min="0"
                max="4"
                value={octave}
                step="1"
              />
            </Label>
            <Label text="Oscillator">
              <select onChange={handleOscillatorChange} value={oscillator}>
                {["sine", "square", "triangle", "sawtooth"].map(wave => (
                  <option key={wave} value={wave}>
                    {wave}
                  </option>
                ))}
              </select>
            </Label>
            <h2>Effects</h2>
            {Object.keys(effects).map(key => (
              <Label text={key} key={key}>
                <input
                  onChange={handleEffectChange}
                  value={key}
                  type="checkbox"
                  checked={activeEffects.includes(key)}
                />
              </Label>
            ))}
          </Labels>
        )}
      </Controls>
      <Keyboard>
        {keyboardKeys.map((key, idx, arr) => (
          <Button
            shouldFocus={activeNotes[activeNotes.length - 1] === notes[key]}
            key={key}
            value={`play:${key}`}
            style={{
              backgroundColor: activeNotes.includes(notes[key])
                ? "tomato"
                : "transparent",
              color: activeNotes.includes(notes[key])
                ? "var(--brown)"
                : "tomato",
              order: arr.length - (10 * Math.ceil((idx + 1) / 10) - (idx % 10))
            }}
          >
            <InnerButton>
              {key}
              <h2>{notes[key]}</h2>
            </InnerButton>
          </Button>
        ))}
      </Keyboard>
    </Synth>
  );
};

export default App;
