import * as React from "react"
import { Meta, StoryFn } from "@storybook/react"
import { Accordion } from "./Accordion"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  component: Accordion,
} as Meta

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: StoryFn = (args) => <Accordion {...args} />
Primary.args = { title: "A title", text: "The text" }
