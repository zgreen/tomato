import Head from "next/head";
import Footer from "./Footer";
export default ({ children }) => (
  <main>
    <style jsx global>{`
      :root {
        --brown: #3d2d2d;
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
        background-color: var(--brown);
        color: tomato;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,
          Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        margin: 0;
      }
      a {
        color: tomato;
      }
      #__next {
        display: flex;
        flex-direction: column;
      }
    `}</style>
    <style jsx>{`
      main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        flex: 1 0 100vh;
        padding: 10px;
      }
    `}</style>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content="A tomato-powered web audio synth." />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>🍅 Synth</title>
    </Head>
    {children}
    <Footer />
  </main>
);
