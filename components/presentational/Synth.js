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
const Synth = ({ containerTabIndex, shouldFocus, ...props }) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.focus();
  }, [shouldFocus]);
  return (
    <>
      {styles}
      <div
        ref={divRef}
        tabIndex={containerTabIndex}
        {...{ ...props, className }}
      />
    </>
  );
};

export default Synth;
