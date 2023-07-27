import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"
import { statusArgType } from "./Story.utilities"

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
    ...statusArgType,
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

type Story = StoryObj<typeof Card>

export const Primary: Story = {
  args: {
    slug: "test-project",
    title: "Test Project",
    question: "Test Question?",
    status: "open",
    agency: "Sample Agency",
    topics: [{ slug: "topic", title: "Topic" }],
    opportunityCloses: new Date("2022-03-04"),
    startDate: new Date("2022-01-03"),
    endDate: new Date("2022-03-04"),
    lastModified: new Date("2022-05-27T16:34:04.000Z"),
    created: new Date("2022-03-04"),
  },
}

export const Open: Story = {
  args: {
    ...Primary.args,
    status: "open",
    question: "Is this project open?",
    opportunityCloses: null,
  },
}

export const OpenNoDate: Story = {
  args: {
    ...Primary.args,
    status: "open",
    question: "Should this project have a date?",
    opportunityCloses: null,
  },
}

export const Ongoing: Story = {
  args: {
    ...Primary.args,
    question: "Why are we still doing this project?",
    status: "ongoing",
  },
}
export const OngoingNoDate: Story = {
  args: {
    ...Primary.args,
    status: "ongoing",
    question: "Should this project finish sometime?",
    startDate: null,
  },
}

export const Completed: Story = {
  args: {
    ...Primary.args,
    question: "Why did we stop doing this?",
    status: "completed",
  },
}

export const CompletedNoDate: Story = {
  args: {
    ...Primary.args,
    status: "completed",
    question: "Is this actually finished?",
    endDate: null,
  },
}

export const LongTopicsList: Story = {
  args: {
    ...Primary.args,
    topics: [
      { slug: "short-topic", title: "Short Topic" },
      { slug: "medium-topic-name", title: "Medium Topic Name" },
      { slug: "extremely-long-topic-name", title: "Extremely Long Topic Name" },
    ],
  },
}
