import { memo } from "react";
export default memo(() => (
  <p>
    <style jsx>{`
      @keyframes loading {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      p {
        font-size: 20px;
        line-height: 1;
        margin: auto;
        text-align: center;
      }
      span {
        animation: loading 1s linear infinite;
        display: block;
        font-size: 50px;
        margin-bottom: 20px;
      }
    `}</style>
    <span>🍅</span>
    Loading...
  </p>
));
