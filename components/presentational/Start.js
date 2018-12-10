import { memo } from "react";
export default memo(({ children }) => (
  <div>
    <style jsx>{`
      div {
        margin: 10vh 0 0 10vw;
      }
    `}</style>
    {children}
  </div>
));
