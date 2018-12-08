import { memo } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
div {
  border: 1px solid tomato;
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
}
`;
export default memo(props => (
  <>
    {styles}
    <div {...{ ...props, className }} />
  </>
));
