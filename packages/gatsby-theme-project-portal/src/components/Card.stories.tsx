import type { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"

const meta: Meta<typeof Card> = {
  component: Card,
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
  },
}
// opportunityCloses: Date("2022-03-04"),
// startDate: "2022-01-03",
// endDate: "2022-03-04",
// lastModified: "2022-05-27T16:34:04.000Z",
