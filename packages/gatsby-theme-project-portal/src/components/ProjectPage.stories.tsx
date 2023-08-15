import type { Meta, StoryObj } from "@storybook/react"
import { ProjectPage } from "./ProjectPage"
import * as CardsStories from "./Cards.stories"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof ProjectPage> = {
  component: ProjectPage,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectPage>

export const Primary: Story = {
  args: {
    title: "All Projects",
    lede: "Introduction to the all projects page.",
    allProjects: [
      ...CardsStories.Primary.args.nodes,
      ...CardsStories.Primary.args.nodes,
    ],
    sortOptions: ["created", "opportunityCloses", "startDate", "endDate"],
    image: loadImage("image/background.jpg"),
  },
}
