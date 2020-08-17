import { useSelector } from "react-redux";
import { useSynthHandlers } from "@/hooks/synth";
import BoxInput from "./presentational/BoxInput";

export const OctaveInput = () => {
  const octave = useSelector((state) => state.octave);
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
