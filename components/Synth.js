import { memo, useEffect, useReducer, useContext, useState } from "react";
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
  heldDisallowedKeys: [],
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
    case "updateHeldDisallowedKeys":
      return {
        ...state,
        attack: null,
        release: null,
        heldDisallowedKeys: action.payload
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
        oscillator: action.payload,
        heldDisallowedKeys: []
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
  const [shouldFocusContainer, setContainerFocus] = useState(false);
  const {
    addEffect,
    activeNotes,
    attack,
    displayControls,
    heldDisallowedKeys,
    isTouchEnabled,
    octave,
    oscillator,
    release,
    removeEffect
  } = state;
  const notes = chromaticKeyMap(octave);
  useEffect(() => {
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
  }, [addEffect, attack, effects, oscillator, release, removeEffect, state, synth]);
  useEffect(() => {
    if (activeNotes.length === 0 && release !== null) {
      console.log(activeNotes.length, release);
      setContainerFocus(true);
    } else {
      setContainerFocus(false);
    }
  }, [activeNotes, release]);
  const eventedSynthKey = e => {
    const { key, target } = e;
    if (!key && (!target.value || target.value.indexOf("play:") !== 0)) {
      return "";
    }
    return key || target.value.slice(5);
  };
  const handleKeyDown = e => {
    const { key, target } = e;
    if (!keyboardKeys.includes(key) && !heldDisallowedKeys.includes(key)) {
      dispatch({
        type: "updateHeldDisallowedKeys",
        payload: heldDisallowedKeys.concat(key)
      });
      return;
    } else if (
      heldDisallowedKeys.length > 0 ||
      !keyboardKeys.includes(key) ||
      notes[key] === attack
    ) {
      return;
    }
    console.log("e.preventDefault()");
    e.preventDefault();
    handleAttack(key);
  };
  const handleTouchStart = e => {
    if (!isTouchEnabled) {
      dispatch({ type: "toggleIsTouchEnabled", payload: true });
    }
    const targetKey = eventedSynthKey(e);
    if (!keyboardKeys.includes(targetKey)) {
      return;
    }
    handleAttack(targetKey);
  };
  const handleMouseDown = e => {
    const targetKey = eventedSynthKey(e);
    if (isTouchEnabled || !keyboardKeys.includes(targetKey)) {
      return;
    }
    handleAttack(targetKey);
  };
  const handleAttack = targetKey => {
    dispatch({ type: "attack", payload: notes[targetKey] });
  };
  const handleRelease = e => {
    const { key, target } = e;
    const targetKey = eventedSynthKey(e);
    if (!targetKey) {
      return;
    }
    if (!keyboardKeys.includes(targetKey)) {
      dispatch({
        type: "updateHeldDisallowedKeys",
        payload: heldDisallowedKeys.filter(key => key !== targetKey)
      });
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
  if (process.env.NODE_ENV !== "production") {
    console.log("state", state);
  }
  return (
    <Synth
      containerTabIndex="0"
      shouldFocus={shouldFocusContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleRelease}
      onKeyDown={handleKeyDown}
      onKeyUp={handleRelease}
      onMouseDown={handleMouseDown}
      onMouseUp={handleRelease}
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
});
