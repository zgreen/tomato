import { useSelector } from "react-redux";

export const EffectInput = ({ handleEffectChange, effect }) => {
  const activeEffects = useSelector((state) => state.activeEffects);
  return (
    <input
      onChange={handleEffectChange}
      value={effect}
      type="checkbox"
      checked={activeEffects.includes(effect)}
    />
  );
};
