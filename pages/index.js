import Head from "next/head";
import dynamic from "next/dynamic";
import App from "../components/presentational/App";
import Header from "../components/presentational/Header";

const Start = dynamic(() => import("../components/Start"), {
  ssr: false
});
const Synth = dynamic(() => import("../components/Synth"), {
  ssr: false
});

export default () => (
  <App>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <title>🍅</title>
    </Head>
    <Header />
    <Start>
      <Synth />
    </Start>
  </App>
);
