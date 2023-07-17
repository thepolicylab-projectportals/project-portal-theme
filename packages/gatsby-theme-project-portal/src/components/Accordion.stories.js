import { Accordion } from "./Accordion"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Theme/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {},
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: { title: "A title", text: "The text" },
}
