import { memo } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
h1 {
  color: transparent;
  font-size: 50px;
  font-weight: 400;
  margin: 0;
  text-align: right;
  text-shadow: 1px 0 tomato, 0 1px tomato, -1px 0 tomato, 0 -1px tomato;
}
`;

export default memo(props => (
  <>
    {styles}
    <h1 {...{ ...props, className }}>🍅</h1>
  </>
));
