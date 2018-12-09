import Head from "next/head";
import dynamic from "next/dynamic";
import App from "../components/presentational/App";
import Header from "../components/presentational/Header";
import Loading from "../components/presentational/Loading";

const Start = dynamic(() => import("../components/Start"), {
  loading: Loading,
  ssr: false
});
const Synth = dynamic(() => import("../components/Synth"), {
  loading: Loading,
  ssr: false
});

export default () => (
  <App>
    <Head>
      <meta charSet="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content="A tomato-powered web audio synth." />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>🍅</title>
    </Head>
    <Start>
      <Synth />
    </Start>
  </App>
);
