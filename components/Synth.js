import { memo, Fragment, useEffect, useRef, useReducer } from "react";
import Tone from "tone";
import Button, { InnerButton } from "./presentational/SynthButton";
import Controls from "./presentational/Controls";
import Keyboard from "./presentational/Keyboard";
import Synth from "./presentational/Synth";
import { chromaticKeyMap, keyboardKeys } from "../config";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

const effects = {
  "Bit Crusher": new Tone.BitCrusher(),
  // @TODO breaks FF
  // chorus: new Tone.Chorus(),
  reverb: new Tone.Reverb()
};

const initialState = {
  activeNotes: [],
  addEffect: null,
  removeEffect: null,
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
    default:
      return state;
  }
};
export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    addEffect,
    activeNotes,
    attack,
    octave,
    oscillator,
    release,
    removeEffect
  } = state;
  const rangeEl = useRef(null);
  useEffect(() => {
    rangeEl.current.focus();
  }, []);
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
  const onKeyDown = ({ key, target }) => {
    const targetKey = key || target.value;
    if (notes[targetKey] === attack) {
      return;
    }
    dispatch({ type: "attack", payload: notes[targetKey] });
  };
  const onKeyUp = ({ key, target }) => {
    const targetKey = key || target.value;
    dispatch({ type: "release", payload: notes[targetKey] });
  };
  const handleEffectChange = ({ target: { value: payload } }) => {
    const type = addEffect === payload ? "removeEffect" : "addEffect";
    dispatch({ type, payload });
  };
  const handleOctaveChange = e => {
    dispatch({ type: "octave", payload: parseInt(e.target.value, 10) });
  };
  const handleOscillatorChange = ({ target: { value: payload } }) => {
    dispatch({ type: "oscillator", payload });
  };
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  console.log("state", state);
  return (
    <Synth onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
      <Controls>
        <label>
          Octave
          <input
            ref={rangeEl}
            onChange={handleOctaveChange}
            type="range"
            min="0"
            max="4"
            value={octave}
            step="1"
          />
        </label>
        <label>
          Oscillator
          <select onChange={handleOscillatorChange} value={oscillator}>
            {["sine", "square", "triangle", "sawtooth"].map(wave => (
              <option key={wave} value={wave}>
                {wave}
              </option>
            ))}
          </select>
        </label>

        {Object.keys(effects).map(key => (
          <label key={key}>
            {key}
            <input onChange={handleEffectChange} value={key} type="checkbox" />
          </label>
        ))}
      </Controls>
      <Keyboard>
        {keyboardKeys.map((key, idx, arr) => (
          <Button
            onTouchStart={onKeyDown}
            onTouchEnd={onKeyDown}
            onMouseDown={onKeyDown}
            onMouseUp={onKeyUp}
            key={key}
            value={key}
            style={{
              backgroundColor: activeNotes.includes(notes[key])
                ? "tomato"
                : "transparent",
              color: activeNotes.includes(notes[key])
                ? "var(--black)"
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
