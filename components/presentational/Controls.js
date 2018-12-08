import { memo } from "react";
export default memo(({ children }) => (
  <div className="controls">
    <style jsx>{`
      .controls {
        color: tomato;
      }
    `}</style>
    {children}
  </div>
));
