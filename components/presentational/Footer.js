import { memo } from "react";
import Link from "next/link";
import { version } from "../../config";
export default memo(() => (
  <footer>
    <style jsx>{`
      footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: auto;
      }
      h2 {
        font-weight: normal;
      }
      h2,
      p {
        margin: 0;
      }
      @media (max-width: 800px) {
        footer {
          font-size: 12px;
        }
      }
    `}</style>
    <p>
      By <a href="https://offbyone.tech">Zach Green</a>
    </p>
    <p>
      Built with <a href="https://tonejs.github.io/">Tone.js</a> and{" "}
      <a href="https://nextjs.org/">Next.js</a>
    </p>
    <p>
      <a href="https://github.com/zgreen/tomato">GitHub</a>/
      <Link href="/license">
        <a>License</a>
      </Link>
    </p>
    <p>{version}</p>
  </footer>
));
