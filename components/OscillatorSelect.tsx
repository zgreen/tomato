import { useSelector } from "react-redux";
import { useSynthHandlers } from "@/hooks/synth";

export const OscillatorSelect = () => {
  const oscillator = useSelector((state) => state.osciallator);
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
