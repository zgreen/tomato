import { useContext } from "react";
import { useSynthHandlers } from "@/hooks/synth";
import { SynthContext } from "@/contexts/SynthContext";

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
