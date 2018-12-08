import { memo } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
div {
  flex-direction: column;
  display: flex;
  flex: 1 1 100%;
  width: 100%;
}
`;
export default memo(props => (
  <>
    {styles}
    <div {...{ ...props, className }} />
  </>
));
