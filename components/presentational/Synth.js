import { memo, useEffect, useRef } from "react";
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
export default memo(({ containerTabIndex, shouldFocus, ...props }) => {
  const divRef = useRef(null);
  if (shouldFocus) {
    console.log("should focus");
    divRef.current.focus();
  }
  useEffect(() => {
    divRef.current.focus();
  }, []);
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
});
