import { useEffect, useRef } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
  div {
    flex-direction: column;
    display: flex;
    flex: 1 0 auto;
    margin-bottom: 10px;
    width: 100%;
  }
`;
const Synth = (props) => {
  const divRef = useRef(null);
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
        {...{ className, ...props }}
      />
    </>
  );
};

export default Synth;
