import type { Meta, StoryObj } from "@storybook/react"
import { Contact } from "./Contact"
import { IGatsbyImageData } from "gatsby-plugin-image"

const emptyGatsbyImageData: IGatsbyImageData = {
  // placeholder object for image whilst gatsby image
  layout: "fixed",
  width: 0,
  height: 0,
  images: { sources: [] },
}
const meta: Meta<typeof Contact> = {
  component: Contact,
  tags: ["autodocs"],
  args: {
    image: emptyGatsbyImageData,
  },
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
  },
}
