import Head from "next/head";
import dynamic from "next/dynamic";

const Start = dynamic(() => import("../components/Start"), {
  ssr: false
});
const Synth = dynamic(() => import("../components/Synth"), {
  ssr: false
});

export default () => (
  <main>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <title>🍅</title>
    </Head>
    <style jsx global>{`
      :root {
        --black: #222;
      }
      html {
        box-sizing: border-box;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      body {
        background-color: var(--black);
        margin: 0;
      }
    `}</style>
    <style jsx>{`
      h1 {
        color: transparent;
        font-size: 50px;
        margin: 0;
        text-align: right;
        text-shadow: 1px 0 tomato, 0 1px tomato, -1px 0 tomato, 0 -1px tomato;
      }
      main {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 20px);
        padding: 10px;
      }
    `}</style>
    <h1>🍅</h1>
    <Start>
      <Synth />
    </Start>
  </main>
);
