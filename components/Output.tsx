import { useEffect } from "react";
import { useSelector } from "react-redux";
import { synth, effects } from "@/contexts/ToneContext";

const Output = () => {
  const { addEffect, attack, oscillator, release, removeEffect } = useSelector(
    (state) => state
  );

  useEffect(() => {
    if (!attack) {
      return;
    }
    synth.triggerAttack(attack);
  }, [attack]);
  useEffect(() => {
    if (!release) {
      return;
    }
    synth.triggerRelease(release);
  }, [release]);
  useEffect(() => {
    if (!oscillator) {
      return;
    }
    synth.set({ oscillator: { type: oscillator } });
  }, [oscillator]);
  useEffect(() => {
    if (!addEffect) {
      return;
    }
    effects[addEffect].toMaster();
    synth.connect(effects[addEffect]);
  }, [addEffect]);
  useEffect(() => {
    if (!removeEffect) {
      return;
    }
    effects[removeEffect].disconnect();
  }, [removeEffect]);
  return null;
};

export default Output;
