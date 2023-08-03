import type { Meta, StoryObj } from "@storybook/react"
import { ProjectTeam } from "./ProjectTeam"
import * as ContactStories from "./Contact.stories"
import { contactImage } from "./Story.utilities"

const meta: Meta<typeof ProjectTeam> = {
  component: ProjectTeam,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ProjectTeam>

export const Primary: Story = {
  args: {
    title: "The Project Team",
    contacts: [ContactStories.Primary.args, ContactStories.NoEmail.args],
    defaultImage: contactImage,
  },
}
