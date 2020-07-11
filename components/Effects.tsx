import { useContext } from "react";
import Label from "@/components/presentational/Label";
import { EffectInput } from "./EffectInput";
import { useSynthHandlers } from "@/hooks/synth";
import { ToneContext } from "@/contexts/ToneContext";

export const Effects = () => {
  const { effects } = useContext(ToneContext);
  const { handleEffectChange } = useSynthHandlers();
  return (
    <>
      <h2>Effects</h2>
      {Object.keys(effects).map((effect) => (
        <Label text={effect} key={effect}>
          <EffectInput {...{ effect, handleEffectChange }} />
        </Label>
      ))}
    </>
  );
};
