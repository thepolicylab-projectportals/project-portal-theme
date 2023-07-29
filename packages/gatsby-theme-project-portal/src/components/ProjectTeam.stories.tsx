import type { Meta, StoryObj } from "@storybook/react"
import { ProjectTeam } from "./ProjectTeam"
import * as ContactStories from "./Contact.stories"

const meta: Meta<typeof ProjectTeam> = {
  component: ProjectTeam,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectTeam>

export const Primary: Story = {
  args: {
    title: "The Project Team",
    defaultContactImage: ContactStories.contactImageYogi,
    contacts: [
      ContactStories.Primary.args,
      ContactStories.NoEmail.args,
      ContactStories.NoImage.args,
    ],
  },
}
