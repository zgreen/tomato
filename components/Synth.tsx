import { ToneContext, synth, effects } from "@/contexts/ToneContext";
import { SynthContext } from "@/contexts/SynthContext";
import { useSynth } from "@/hooks/synth";

const Synth = ({ children }) => {
  const { state, dispatch } = useSynth();

  return (
    <ToneContext.Provider value={{ synth, effects }}>
      <SynthContext.Provider value={{ state, dispatch }}>
        {children}
      </SynthContext.Provider>
    </ToneContext.Provider>
  );
};

export default Synth;
