import { memo } from "react";
import css from "styled-jsx/css";

const { className: innerClassName, styles: innerStyles } = css.resolve`
span {
  align-items: center;
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  pointer-events: none;
}
`;

export const InnerButton = memo(props => (
  <>
    {innerStyles}
    <span {...{ ...props, className: innerClassName }} />
  </>
));

const { className, styles } = css.resolve`
button {
  appearance: none;
  background-color: transparent;
  border: 1px solid tomato;
  flex: 0 0 10%;
  margin: 0;
  padding: 0;
  touch-action: none;
}
button * {
  touch-action: none;
}
`;
export default props => (
  <>
    {styles}
    <button {...{ ...props, className }} />
  </>
);
