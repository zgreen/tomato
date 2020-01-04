import dynamic from "next/dynamic";
import App from "../components/presentational/App";
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
    <Start>
      <Synth />
    </Start>
  </App>
);
