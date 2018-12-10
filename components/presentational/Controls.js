import { memo } from "react";
import Header from "./Header";
export default memo(({ children }) => (
  <div className="controls">
    <style jsx>{`
      div {
        margin-left: 10px;
      }
      .controls {
        display: flex;
        margin: 10px 0;
      }
    `}</style>
    <div>{children}</div>
    <Header />
  </div>
));
