// Ignore checks of unused exported defaults & constants as they are used implicitly by Storybook
// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react"
import { Topics } from "./Topics"

export const exampleTopics = [
  { slug: "topic", title: "Topic" },
  { slug: "short-topic", title: "Short Topic" },
  { slug: "medium-topic-name", title: "Medium Topic Name" },
  { slug: "extremely-long-topic-name", title: "Extremely Long Topic Name" },
]

export const topicsArgType = {
  topics: {
    options: Object.keys(exampleTopics),
    control: {
      type: "multi-select",
      labels: exampleTopics.map((topic) => topic.title),
    },
    mapping: exampleTopics,
  },
}

const meta: Meta<typeof Topics> = {
  component: Topics,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
  argTypes: { ...topicsArgType },
}

export default meta

type Story = StoryObj<typeof Topics>

export const Primary: Story = {
  args: { topics: exampleTopics },
}
