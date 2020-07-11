import { useContext } from "react";
import { SynthContext } from "./Synth";

export const EffectInput = ({ handleEffectChange, effect }) => {
  const {
    state: { activeEffects },
  } = useContext(SynthContext);
  return (
    <input
      onChange={handleEffectChange}
      value={effect}
      type="checkbox"
      checked={activeEffects.includes(effect)}
    />
  );
};
