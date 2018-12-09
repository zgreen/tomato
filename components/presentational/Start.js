import { memo } from "react";
export default memo(({ children }) => (
  <div>
    <style jsx>{`
      div {
        margin-left: 10vw;
      }
    `}</style>
    {children}
  </div>
));
