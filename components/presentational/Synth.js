import { memo, useEffect, useRef } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
div {
  flex-direction: column;
  display: flex;
  flex: 1 1 100%;
  width: 100%;
}
`;
export default memo(({ containerTabIndex, ...props }) => {
  const divRef = useRef(null);
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
