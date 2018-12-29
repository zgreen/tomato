import Markdown from "markdown-to-jsx";
import App from "../components/presentational/App";
import changelog from "../CHANGELOG.md";
export default () => {
  return (
    <App title="Changelog">
      <Markdown>{changelog}</Markdown>
    </App>
  );
};
