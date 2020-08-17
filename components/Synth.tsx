import { ToneContext, synth, effects } from "@/contexts/ToneContext";

const Synth = ({ children }) => {
  return (
    <ToneContext.Provider value={{ synth, effects }}>
      {children}
    </ToneContext.Provider>
  );
};

export default Synth;
