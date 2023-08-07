import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Card } from "./Card"

import { argType as projectStatusArgType } from "./ProjectStatus.stories"

export const exampleTopics = [
  { slug: "topic", title: "Topic" },
  { slug: "short-topic", title: "Short Topic" },
  { slug: "medium-topic-name", title: "Medium Topic Name" },
  { slug: "extremely-long-topic-name", title: "Extremely Long Topic Name" },
]

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
  argTypes: {
    ...projectStatusArgType,
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

export const primaryData = {
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
}

export const Primary: Story = {
  args: primaryData,
}

export const openData = {
  ...primaryData,
  status: "open",
  question: "Is this project open?",
  opportunityCloses: null,
}

export const Open: Story = {
  args: openData,
}

export const openNoDateData = {
  ...primaryData,
  status: "open",
  question: "Should this project have a date?",
  opportunityCloses: null,
}
export const OpenNoDate: Story = {
  args: openNoDateData,
}

export const ongoingData = {
  ...primaryData,
  question: "Why are we still doing this project?",
  status: "ongoing",
}
export const Ongoing: Story = {
  args: ongoingData,
}
export const ongoingNoDateData = {
  ...primaryData,
  status: "ongoing",
  question: "Should this project finish sometime?",
  startDate: null,
}
export const OngoingNoDate: Story = {
  args: ongoingNoDateData,
}

export const completedData = {
  ...primaryData,
  question: "Why did we stop doing this?",
  status: "completed",
}
export const Completed: Story = {
  args: completedData,
}

export const completedNoDateData = {
  ...primaryData,
  status: "completed",
  question: "Is this actually finished?",
  endDate: null,
}
export const CompletedNoDate: Story = {
  args: completedNoDateData,
}

export const longTopicsListData = {
  ...primaryData,
  topics: [
    { slug: "short-topic", title: "Short Topic" },
    { slug: "medium-topic-name", title: "Medium Topic Name" },
    {
      slug: "extremely-long-topic-name",
      title: "Extremely Long Topic Name Which Goes Over The Edge",
    },
  ],
}
export const LongTopicsList: Story = {
  args: longTopicsListData,
}

export const LargeDivContainer: Story = {
  args: primaryData,
  decorators: [
    (Story) => (
      <div className="h-[32rem] w-[32rem]">
        <Story />
      </div>
    ),
  ],
}

export const SmallDivContainerLongTopicName: Story = {
  args: longTopicsListData,
  decorators: [
    (Story) => (
      <div className="w-[24rem]">
        <Story />
      </div>
    ),
  ],
}
