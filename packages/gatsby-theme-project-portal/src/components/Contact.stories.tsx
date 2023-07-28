import type { Meta, StoryObj } from "@storybook/react"
import { Contact } from "./Contact"
import { emptyGatsbyImageData } from "./Story.utilities"

const meta: Meta<typeof Contact> = {
  component: Contact,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Contact>

export const Primary: Story = {
  args: {
    name: "Contact Name",
    title: "Title",
    employer: "Employer",
    email: "some-email@example.com",
    showEmail: true,
    image: emptyGatsbyImageData,
  },
}

export const NoEmail: Story = {
  args: { ...Primary.args, showEmail: false },
}