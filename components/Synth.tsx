import {
  useEffect,
  useContext,
  useReducer,
  useState,
  createContext,
} from "react";
import { ToneContext } from "./Start";
import { chromaticKeyMap, keyboardKeys } from "../config";

const initialState = {
  activeNotes: [],
  addEffect: null,
  activeEffects: [],
  removeEffect: null,
  heldDisallowedKeys: [],
  isTouchEnabled: false,
  attack: null,
  release: null,
  notes: chromaticKeyMap(2),
  octave: 2,
  oscillator: "triangle",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "attack":
      return {
        ...state,
        activeNotes: state.activeNotes.concat(action.payload),
        attack: action.payload,
        release: null,
      };
    case "addEffect":
      return {
        ...state,
        addEffect: action.payload,
        activeEffects: state.activeEffects.concat(action.payload),
        removeEffect: null,
        release: null,
      };
    case "updateHeldDisallowedKeys":
      return {
        ...state,
        heldDisallowedKeys: action.payload,
      };
    case "toggleIsTouchEnabled":
      return {
        ...state,
        isTouchEnabled: action.payload,
      };
    case "removeEffect":
      return {
        ...state,
        addEffect: null,
        activeEffects: state.activeEffects.filter(
          (effect) => effect !== action.payload
        ),
        removeEffect: action.payload,
      };
    case "octave":
      return {
        ...state,
        octave: action.payload,
        notes: chromaticKeyMap(action.payload),
      };
    case "oscillator":
      return {
        ...state,
        oscillator: action.payload,
        heldDisallowedKeys: [],
      };
    case "release":
      return {
        ...state,
        activeNotes: state.activeNotes.filter(
          (note) => note !== action.payload
        ),
        release: action.payload,
        attack: null,
      };
    default:
      return state;
  }
};

export function useSynth() {
  const { synth, effects } = useContext(ToneContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    addEffect,
    attack,
    heldDisallowedKeys,
    isTouchEnabled,
    notes,
    oscillator,
    release,
    removeEffect,
  } = state;

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

  const eventedSynthKey = (e) => {
    const { key, target } = e;
    if (!key && (!target.value || target.value.indexOf("play:") !== 0)) {
      return "";
    }
    return key || target.value.slice(5);
  };
  const handleKeyDown = (e) => {
    const { key } = e;
    // Always prevent `/` from opening text search in firefox
    if (key === "/") {
      e.preventDefault();
    }
    if (!keyboardKeys.includes(key) && !heldDisallowedKeys.includes(key)) {
      dispatch({
        type: "updateHeldDisallowedKeys",
        payload: heldDisallowedKeys.concat(key),
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
  const handleTouchStart = (e) => {
    if (!isTouchEnabled) {
      dispatch({ type: "toggleIsTouchEnabled", payload: true });
    }
    const targetKey = eventedSynthKey(e);
    if (!keyboardKeys.includes(targetKey)) {
      return;
    }
    handleAttack(targetKey);
  };
  const handleMouseDown = (e) => {
    const targetKey = eventedSynthKey(e);
    if (isTouchEnabled || !keyboardKeys.includes(targetKey)) {
      return;
    }
    handleAttack(targetKey);
  };
  const handleAttack = (targetKey) => {
    dispatch({ type: "attack", payload: notes[targetKey] });
  };
  const handleRelease = (e) => {
    const targetKey = eventedSynthKey(e);
    if (!targetKey) {
      return;
    }
    if (!keyboardKeys.includes(targetKey)) {
      dispatch({
        type: "updateHeldDisallowedKeys",
        payload: heldDisallowedKeys.filter((key) => key !== targetKey),
      });
      return;
    }
    dispatch({ type: "release", payload: notes[targetKey] });
  };
  const handleEffectChange = ({ target: { value: payload } }) => {
    const type = addEffect === payload ? "removeEffect" : "addEffect";
    dispatch({ type, payload });
  };
  const handleOctaveChange = (e) => {
    const payload = parseInt(e.target.value, 10);
    if (Number.isNaN(payload)) {
      return;
    }
    dispatch({ type: "octave", payload: parseInt(e.target.value, 10) });
  };
  const handleOscillatorChange = ({ target: { value: payload } }) =>
    dispatch({ type: "oscillator", payload });

  return {
    state,
    handleKeyDown,
    handleTouchStart,
    handleMouseDown,
    handleRelease,
    handleEffectChange,
    handleOctaveChange,
    handleOscillatorChange,
  };
}

export const SynthContext = createContext(initialState);

export const Synth = ({ children }) => {
  const { state, ...synthFunctions } = useSynth();

  return (
    <SynthContext.Provider value={state}>
      {children({ ...synthFunctions })}
    </SynthContext.Provider>
  );
};
