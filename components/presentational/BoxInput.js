import css from "styled-jsx/css";
const { className, styles } = css.resolve`
input {
  background-color: transparent;
  border: 1px solid tomato;
  box-shadow: none;
  border-radius: 0;
  color: tomato;
  padding: 6px;
}
`;
export default props => (
  <>
    {styles}
    <input {...{ ...props, className }} />
  </>
);
