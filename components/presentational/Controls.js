import { memo } from "react";
import Header from "./Header";
export default memo(({ children }) => (
  <div className="controls">
    <style jsx>{`
      .controls {
        display: flex;
        margin: 10px 0;
      }
    `}</style>
    {children}
    <Header />
  </div>
));
