import type { Meta, StoryObj } from "@storybook/react"
import { ProjectPage, ProjectPageProps } from "./ProjectPage"
import * as CardsStories from "./Cards.stories"

const meta: Meta<typeof ProjectPage> = {
  component: ProjectPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectPageProps>

export const Primary: Story = {
  args: {
    title: "All Projects",
    lede: "Introduction to the all projects page.",
    allProjects: [
      ...CardsStories.Primary.args.nodes,
      ...CardsStories.Primary.args.nodes,
    ],
    sortOptions: ["created", "opportunityCloses", "startDate", "endDate"],
    bgImage: null, // TODO: Add a background image for testing here
  },
}
