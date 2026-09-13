import type { Preview } from "@storybook/react-vite";

import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
