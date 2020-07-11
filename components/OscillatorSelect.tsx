import { useContext } from "react";
import { SynthContext, useSynthHandlers } from "./Synth";

export const OscillatorSelect = () => {
  const {
    state: { oscillator },
  } = useContext(SynthContext);
  const { handleOscillatorChange } = useSynthHandlers();
  return (
    <select onChange={handleOscillatorChange} value={oscillator}>
      {["sine", "square", "triangle", "sawtooth"].map((wave) => (
        <option key={wave} value={wave}>
          {wave}
        </option>
      ))}
    </select>
  );
};
