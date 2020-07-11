import dynamic from "next/dynamic";
import { Page } from "../components/Page";
import Loading from "../components/presentational/Loading";

const Start = dynamic(() => import("../components/Start"), {
  loading: Loading,
  ssr: false,
});

const Home = () => (
  <Page>
    <Start />
  </Page>
);

export default Home;
