import { useEffect, useRef, memo } from "react";
import css from "styled-jsx/css";
import { useSynthHandlers } from "@/hooks/synth";

const { className, styles } = css.resolve`
  div {
    flex-direction: column;
    display: flex;
    flex: 1 0 auto;
    margin-bottom: 10px;
    width: 100%;
  }
`;
const SynthKeyboard = memo((props) => {
  const divRef = useRef(null);
  const {
    handleKeyDown,
    handleTouchStart,
    handleMouseDown,
    handleRelease,
  } = useSynthHandlers();
  useEffect(() => {
    divRef.current.focus();
  }, []);
  return (
    <>
      {styles}
      <div
        tabIndex="0"
        ref={divRef}
        id="playable-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleRelease}
        onKeyDown={handleKeyDown}
        onKeyUp={handleRelease}
        onMouseDown={handleMouseDown}
        onMouseUp={handleRelease}
        {...{ className, ...props }}
      />
    </>
  );
});

export default SynthKeyboard;
