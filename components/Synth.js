import { memo, Fragment, useEffect, useState, useReducer } from "react";
import Tone from "tone";
import { chromaticKeyMap } from "../config";
const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

const initialState = {
  activeNotes: [],
  attack: null,
  release: null,
  octave: 2
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
    case "octave":
      return {
        ...state,
        attack: null,
        release: null,
        octave: action.payload
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
export default memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeNotes, attack, octave, release } = state;
  const notes = chromaticKeyMap(octave);
  useEffect(
    () => {
      if (attack) {
        synth.triggerAttack(attack);
      }
      if (release) {
        synth.triggerRelease(release);
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

  const handleOctaveChange = e => {
    dispatch({ type: "octave", payload: parseInt(e.target.value, 10) });
  };
  console.log("state", state);
  return (
    <div className="container" onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
      <style jsx>{`
        button {
          appearance: none;
          background-color: transparent;
          border: 1px solid tomato;
          padding: 0;
        }
        span {
          display: flex;
          height: 100px;
          width: 100px;
        }
        .container {
          height: 100vh;
          top: 0;
          position: absolute;
          width: 100vw;
        }
      `}</style>
      <label>
        Octave
        <input
          onChange={handleOctaveChange}
          type="range"
          min="0"
          max="4"
          value={octave}
          step="1"
        />
      </label>

      <div>
        {Object.entries(notes).map(([key, val]) => (
          <button
            onTouchStart={onKeyDown}
            onTouchEnd={onKeyDown}
            onMouseDown={onKeyDown}
            onMouseUp={onKeyUp}
            key={key}
            value={key}
          >
            <span
              style={{
                backgroundColor: activeNotes.includes(val)
                  ? "tomato"
                  : "transparent"
              }}
            >
              {key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
});
