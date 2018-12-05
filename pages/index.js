import dynamic from "next/dynamic";

const Synth = dynamic(() => import("../components/Synth"), {
  ssr: false
});

export default () => (
  <main>
    <h1>tomato 🍅</h1>
    <Synth />
  </main>
);
