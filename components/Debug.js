import { useContext } from "react";
import { SynthContext } from "@/contexts/SynthContext";

export default () => {
  const { state } = useContext(SynthContext);
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "test"
  ) {
    console.log("state", state);
  }
  return null;
};
