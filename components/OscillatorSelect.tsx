import { useContext } from "react";
import { SynthContext } from "./Synth";

export const OscillatorSelect = ({ handleOscillatorChange }) => {
  const { oscillator } = useContext(SynthContext);
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
