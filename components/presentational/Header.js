import { memo } from "react";
import css from "styled-jsx/css";
const { className, styles } = css.resolve`
h1 {
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 0 auto;
  text-align: right;
}
`;

export default memo(({ children, ...props }) => (
  <>
    {styles}
    <h1 {...{ ...props, className }}>{children}🍅</h1>
  </>
));
