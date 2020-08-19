import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { chromaticKeyMap } from "./config";

let store;

export const initialState = {
  activeNotes: {},
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
  globalStatus: "Uninitialized",
};

export enum Actions {
  Initialize = "Initialize",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "attack":
      return {
        ...state,
        activeNotes: { ...state.activeNotes, [action.payload]: true },
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
    case Actions.Initialize:
      return {
        ...state,
        globalStatus: "Initialized",
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
        activeNotes: { ...state.activeNotes, [action.payload]: false },
        release: action.payload,
        attack: null,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState?: Object) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
