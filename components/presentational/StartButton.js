import { memo } from "react";
import css from "styled-jsx/css";
import styled from "./Styled";
const { Button } = styled;
const inputStyles = css.resolve`
button {
  border: 2px solid currentColor;
  font-size: 20px;
  padding: 10px 20px;
}
`;
export default memo(props => (
  <Button {...{ ...props, inputStyles }}>Get started 🍅</Button>
));
