import type { Meta, StoryObj } from "@storybook/react"
import { Contact } from "./Contact"
import { loadImage } from "./Story.utilities"

const meta: Meta<typeof Contact> = {
  component: Contact,
  tags: ["autodocs"],
  includeStories: /^[A-Z]/,
}

export default meta

type Story = StoryObj<typeof Contact>

export const contactImage = loadImage("image/torso.png", 100, 100, "fixed")

export const contactImageYogi = loadImage("image/yogi.jpg", 100, 100, "fixed")

export const Primary: Story = {
  args: {
    name: "Contact Name",
    title: "Title",
    employer: "Employer",
    email: "some-email@example.com",
    showEmail: true,
    image: contactImage,
    defaultImage: contactImageYogi,
  },
}

export const NoEmail: Story = {
  args: { ...Primary.args, showEmail: false },
}

export const NoImage: Story = {
  args: { ...Primary.args, image: null },
}
