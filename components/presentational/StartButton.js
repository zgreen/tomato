import css from "styled-jsx/css";
import styled from "./Styled";
const { Button } = styled;
const inputStyles = css.resolve`
  button {
    border: 2px solid currentColor;
    display: block;
    font-size: 20px;
    margin-bottom: 20px;
    padding: 10px 20px;
  }
`;
export default (props) => (
  <Button {...{ ...props, inputStyles }}>Get started 🍅</Button>
);
