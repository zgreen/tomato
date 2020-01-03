import { useEffect, useReducer, useContext, useState } from "react";
import BoxInput from "./presentational/BoxInput";
import Button, { BasicButton, InnerButton } from "./presentational/SynthButton";
import Controls from "./presentational/Controls";
import Label, { Labels } from "./presentational/Label";
import Keyboard from "./presentational/Keyboard";
import Synth from "./presentational/Synth";
import { ToneContext } from "./Start";
import { chromaticKeyMap, keyboardKeys } from "../config";
import Debug from "./Debug";

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
        addEffect: action.payload,
        removeEffect: null,
        release: null
      };
    case "updateHeldDisallowedKeys":
      return {
        ...state,
        heldDisallowedKeys: action.payload
      };
    case "toggleIsTouchEnabled":
      return {
        ...state,
        isTouchEnabled: action.payload
      };
    case "removeEffect":
      return {
        ...state,
        addEffect: null,
        removeEffect: action.payload
      };
    case "octave":
      return {
        ...state,
        octave: action.payload
      };
    case "oscillator":
      return {
        ...state,
        oscillator: action.payload,
        heldDisallowedKeys: []
      };
    case "release":
      console.log("release");
      return {
        ...state,
        activeNotes: state.activeNotes.filter(note => note !== action.payload),
        release: action.payload,
        attack: null
      };
    case "toggleDisplayControls":
      return {
        ...state,
        displayControls: action.payload
      };
    default:
      return state;
  }
};
const App = () => {
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
    if (!attack) {
      return;
    }
    synth.triggerAttack(attack);
  }, [attack, synth]);
  useEffect(() => {
    if (!release) {
      return;
    }
    synth.triggerRelease(release);
  }, [release, synth]);
  useEffect(() => {
    if (!oscillator) {
      return;
    }
    synth.set({ oscillator: { type: oscillator } });
  }, [oscillator, synth]);
  useEffect(() => {
    if (!addEffect) {
      return;
    }
    effects[addEffect].toMaster();
    synth.connect(effects[addEffect]);
  }, [effects, addEffect, synth]);
  useEffect(() => {
    if (!removeEffect) {
      return;
    }
    effects[removeEffect].disconnect();
  }, [effects, removeEffect, synth]);
  useEffect(() => {
    if (activeNotes.length === 0 && release !== null) {
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
    const { key } = e;
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
  const handleOscillatorChange = ({ target: { value: payload } }) =>
    dispatch({ type: "oscillator", payload });
  const toggleDisplayControls = e => {
    e.preventDefault();
    dispatch({ type: "toggleDisplayControls", payload: !displayControls });
  };
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
