export const Labels = ({ children }) => <div>{children}</div>;
export default ({ children, text, ...props }) => (
  <label {...props}>
    <style jsx>{`
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
      }
      label:focus-within {
        outline: 2px solid tomato;
      }
      span {
        display: inline-block;
        margin-right: 5px;
      }
    `}</style>
    <span>{text}</span>
    {children}
  </label>
);
