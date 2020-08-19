import { useEffect, useContext, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { keyboardKeys } from "../config";
import { ToneContext } from "@/contexts/ToneContext";

export function useSynth() {
  const { synth, effects } = useContext(ToneContext);
  const { addEffect, attack, oscillator, release, removeEffect } = useSelector(
    (state) => state
  );

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
    effects[addEffect].toDestination();
    synth.connect(effects[addEffect]);
  }, [effects, addEffect, synth]);
  useEffect(() => {
    if (!removeEffect) {
      return;
    }
    effects[removeEffect].disconnect();
  }, [effects, removeEffect, synth]);
}

export const Output = () => {
  useSynth();
  return null;
};

export function useSynthHandlers() {
  const dispatch = useDispatch();
  const {
    addEffect,
    attack,
    heldDisallowedKeys,
    isTouchEnabled,
    notes,
  } = useSelector((state) => state);

  const eventedSynthKey = (e) => {
    const { key, target } = e;
    if (!key && (!target.id || target.id.indexOf("play:") !== 0)) {
      return "";
    }
    return key || target.id.slice(5);
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
    handleKeyDown,
    handleTouchStart,
    handleMouseDown,
    handleRelease,
    handleEffectChange,
    handleOctaveChange,
    handleOscillatorChange,
  };
}
