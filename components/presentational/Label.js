export const Labels = ({ children }) => <div>{children}</div>;
export default ({ children, ...props }) => (
  <label {...props}>
    <style jsx>{`
      label {
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
      }
    `}</style>
    {children}
  </label>
);
