import { createContext } from "react";
import { chromaticKeyMap } from "../config";

export const initialState = {
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

const context: {
  dispatch: Function;
  state: any; // @TODO
} = {
  state: initialState,
  dispatch: () => {},
};

export const SynthContext = createContext(context);
