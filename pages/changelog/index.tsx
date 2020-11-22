import Markdown from "markdown-to-jsx";
import { Page } from "../../components/Page";
import changelog from "../../CHANGELOG.md";
export default () => {
  return (
    <Page title="Changelog">
      <Markdown>{changelog}</Markdown>
    </Page>
  );
};
