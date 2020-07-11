import { useContext } from "react";
import { useSynthHandlers } from "@/hooks/synth";
import { SynthContext } from "@/contexts/SynthContext";
import BoxInput from "./presentational/BoxInput";

export const OctaveInput = () => {
  const {
    state: { octave },
  } = useContext(SynthContext);
  const { handleOctaveChange } = useSynthHandlers();
  return (
    <BoxInput
      onChange={handleOctaveChange}
      type="number"
      min="0"
      max="4"
      value={octave}
      step="1"
    />
  );
};
