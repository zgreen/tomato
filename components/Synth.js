import { memo, useEffect, useReducer, useContext } from "react";
import BoxInput from "./presentational/BoxInput";
import Button, { BasicButton, InnerButton } from "./presentational/SynthButton";
import Controls from "./presentational/Controls";
import Label, { Labels } from "./presentational/Label";
import Keyboard from "./presentational/Keyboard";
import Synth from "./presentational/Synth";
import { ToneContext } from "./Start";
import { chromaticKeyMap, keyboardKeys } from "../config";

const initialState = {
  activeNotes: [],
  addEffect: null,
  displayControls: false,
  removeEffect: null,
  isTouchEnabled: false,
  attack: null,
  release: null,
  octave: 2,
  oscillator: "triangle"
};
const reducer = (state, action) => {
  switch (action.type) {
    case "attack":
      return {
        ...state,
        activeNotes: state.activeNotes.concat(action.payload),
        attack: action.payload,
        release: null
      };
    case "addEffect":
      return {
        ...state,
        attack: null,
        release: null,
        addEffect: action.payload,
        removeEffect: null
      };
    case "toggleIsTouchEnabled":
      return {
        ...state,
        isTouchEnabled: action.payload,
        attack: null,
        release: null
      };
    case "removeEffect":
      return {
        ...state,
        attack: null,
        release: null,
        addEffect: null,
        removeEffect: action.payload
      };
    case "octave":
      return {
        ...state,
        attack: null,
        release: null,
        octave: action.payload
      };
    case "oscillator":
      return {
        ...state,
        attack: null,
        release: null,
        oscillator: action.payload
      };
    case "release":
      return {
        ...state,
        activeNotes: state.activeNotes.filter(note => note !== action.payload),
        release: action.payload,
        attack: null
      };
    case "toggleDisplayControls":
      return {
        ...state,
        displayControls: action.payload,
        attack: null,
        release: null
      };
    default:
      return state;
  }
};
export default memo(() => {
  const { synth, effects } = useContext(ToneContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    addEffect,
    activeNotes,
    attack,
    displayControls,
    isTouchEnabled,
    octave,
    oscillator,
    release,
    removeEffect
  } = state;
  const notes = chromaticKeyMap(octave);
  useEffect(
    () => {
      if (attack) {
        synth.triggerAttack(attack);
      }
      if (release) {
        synth.triggerRelease(release);
      }
      if (oscillator) {
        synth.set({ oscillator: { type: oscillator } });
      }
      if (addEffect) {
        effects[addEffect].toMaster();
        synth.connect(effects[addEffect]);
      }
      if (removeEffect) {
        effects[removeEffect].disconnect();
      }
    },
    [state]
  );
  const onKeyDown = e => {
    const { key, target, type } = e;
    if (isTouchEnabled && type === "mousedown") {
      return;
    }
    if (!isTouchEnabled && type === "touchstart") {
      dispatch({ type: "toggleIsTouchEnabled", payload: true });
    }
    const targetKey = key || target.value;
    if (!keyboardKeys.includes(targetKey) || notes[targetKey] === attack) {
      return;
    }
    dispatch({ type: "attack", payload: notes[targetKey] });
  };
  const onKeyUp = e => {
    const { key, target } = e;
    const targetKey = key || target.value;
    if (!keyboardKeys.includes(targetKey)) {
      return;
    }
    dispatch({ type: "release", payload: notes[targetKey] });
  };
  const handleEffectChange = ({ target: { value: payload } }) => {
    const type = addEffect === payload ? "removeEffect" : "addEffect";
    dispatch({ type, payload });
  };
  const handleOctaveChange = e => {
    const payload = parseInt(e.target.value, 10);
    if (Number.isNaN(payload)) {
      return;
    }
    dispatch({ type: "octave", payload: parseInt(e.target.value, 10) });
  };
  const handleOscillatorChange = ({ target: { value: payload } }) => {
    dispatch({ type: "oscillator", payload });
  };
  const toggleDisplayControls = e => {
    e.preventDefault();
    dispatch({ type: "toggleDisplayControls", payload: !displayControls });
  };
  // console.log("state", state);
  return (
    <Synth
      containerTabIndex="0"
      onTouchStart={onKeyDown}
      onTouchEnd={onKeyUp}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseDown={onKeyDown}
      onMouseUp={onKeyUp}
    >
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
                />
              </Label>
            ))}
          </Labels>
        )}
      </Controls>
      <Keyboard>
        {keyboardKeys.map((key, idx, arr) => (
          <Button
            key={key}
            value={key}
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
});
