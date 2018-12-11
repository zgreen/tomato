import { memo } from "react";
import Link from "next/link";
export default memo(() => (
  <footer>
    <style jsx>{`
      footer {
        display: flex;
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
    <p>v1.0.0</p>
  </footer>
));
