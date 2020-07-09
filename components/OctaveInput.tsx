import BoxInput from "./presentational/BoxInput";
import { useContext } from "react";
import { SynthContext } from "./Synth";

export const OctaveInput = ({ handleOctaveChange }) => {
  const { octave } = useContext(SynthContext);
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
