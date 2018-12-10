import { createElement } from "react";
import css from "styled-jsx/css";
import capitalize from "lodash.capitalize";
const styles = {
  button: css.resolve`button {
    appearance: none;
    background-color: transparent;
    border: 0;
    box-shadow: none;
    border-radius: 0;
    color: tomato;
  }`,
  h1: css.resolve`h1 {
    font-weight: normal
  }`,
  h2: css.resolve`h2 {
    font-weight: normal
  }`
};
export default Object.entries(styles).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [capitalize(key)]: ({
      children,
      inputStyles = { className: "", styles: "" },
      ...props
    }) => {
      const { className, styles: elementStyles } = val;
      const {
        className: resolvedClassName,
        styles: resolvedStyles
      } = inputStyles;
      return createElement(
        key,
        { ...props, className: `${className} ${resolvedClassName}` },
        <>
          {elementStyles}
          {resolvedStyles}
          {children}
        </>
      );
    }
  }),
  {}
);
