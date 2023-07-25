import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardProps } from "./Card"

const exampleTopics = [
  { slug: "topic", title: "Topic" },
  { slug: "short-topic", title: "Short Topic" },
  { slug: "medium-topic-name", title: "Medium Topic Name" },
  { slug: "extremely-long-topic-name", title: "Extremely Long Topic Name" },
]

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["open", "ongoing", "completed"],
      control: { type: "radio" },
    },
    topics: {
      options: Object.keys(exampleTopics),
      control: {
        type: "multi-select",
        labels: exampleTopics.map((topic) => topic.title),
      },
      mapping: exampleTopics,
    },
  },
}

export default meta

type Story = StoryObj<typeof CardProps>

export const Open: Story = {
  args: {
    slug: "test-project",
    title: "Test Project",
    question: "Test Question?",
    status: "open",
    agency: "Sample Agency",
    topics: [{ slug: "topic", title: "Topic" }],
    created: "2022-03-04",
    opportunityCloses: "2022-03-04",
    startDate: "2022-01-03",
    endDate: "2022-03-04",
    lastModified: "2022-05-27T16:34:04.000Z",
  },
}

export const OpenNoDate: Story = {
  args: {
    ...Open.args,
    status: "open",
    opportunityCloses: null,
  },
}

export const Ongoing: Story = {
  args: {
    ...Open.args,
    status: "ongoing",
  },
}
export const OngoingNoDate: Story = {
  args: {
    ...Open.args,
    status: "ongoing",
    startDate: null,
  },
}

export const Completed: Story = {
  args: {
    ...Open.args,
    status: "completed",
  },
}

export const CompletedNoDate: Story = {
  args: {
    ...Open.args,
    status: "completed",
    endDate: null,
  },
}
