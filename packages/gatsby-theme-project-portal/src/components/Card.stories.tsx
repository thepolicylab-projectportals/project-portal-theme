import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardProps } from "./Card"

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    status: {
      options: ["open", "ongoing", "completed"],
      control: { type: "radio" },
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

export const Ongoing: Story = {
  args: {
    ...Open.args,
    status: "ongoing",
  },
}

export const Completed: Story = {
  args: {
    ...Open.args,
    status: "completed",
  },
}
