import { memo } from "react";
import css from "styled-jsx/css";

const { className: basicClassName, styles: basicStyles } = css.resolve`
button {
  appearance: none;
  background-color: tomato;
  border: 0;
  color: var(--brown);
  font-size: 16px;
  margin-bottom: 10px;
  padding: 5px 10px;
}
`;

export const BasicButton = memo(({ children, type }) => (
  <>
    {basicStyles}
    <button {...{ className: basicClassName, type }}>{children}</button>
  </>
));

const { className: innerClassName, styles: innerStyles } = css.resolve`
span {
  align-items: center;
  display: flex;
  
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
